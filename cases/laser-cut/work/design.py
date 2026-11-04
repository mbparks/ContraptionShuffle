from pathlib import Path
import math,random,collections,html
import numpy as np
import cadquery as cq
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'files';TMP=ROOT/'work'
T=3.; KERF=.15; SLACK=.12; L=91.; D=39.; H=38.; DH=33.; CL=.5
CAP_L=L+2*T+2*CL; CAP_D=D+2*T+2*CL; CAP_H=65.5
W=CAP_L+2*T; DEP=CAP_D+2*T
SX=300; SY=220
suits=['MATERIALS','MECHANISM','MISSION']
R=lambda x,y,X,Y:(round(x,5),round(y,5),round(X,5),round(Y,5))
def rect_ctr(x,y,w,h):return R(x-w/2,y-h/2,x+w/2,y+h/2)
def signed(p): return sum(x*Y-X*y for (x,y),(X,Y) in zip(p,p[1:]+p[:1]))/2

def contours(pos,neg):
    xs=sorted(set(n for r in pos+neg for n in (r[0],r[2])));ys=sorted(set(n for r in pos+neg for n in (r[1],r[3])))
    occupied=set()
    def inside(x,y,r):return r[0]<x<r[2] and r[1]<y<r[3]
    for i,(x,X) in enumerate(zip(xs,xs[1:])):
        for j,(y,Y) in enumerate(zip(ys,ys[1:])):
            u,v=(x+X)/2,(y+Y)/2
            if any(inside(u,v,r) for r in pos) and not any(inside(u,v,r) for r in neg):occupied.add((i,j))
    edges={}
    for i,j in occupied:
        a=(xs[i],ys[j]);b=(xs[i+1],ys[j]);c=(xs[i+1],ys[j+1]);d=(xs[i],ys[j+1])
        for delta,p,q in [((0,-1),a,b),((1,0),b,c),((0,1),c,d),((-1,0),d,a)]:
            if (i+delta[0],j+delta[1]) not in occupied:
                assert p not in edges
                edges[p]=q
    rings=[]
    while edges:
        start=min(edges);p=start;ring=[]
        while True:
            ring.append(p);p=edges.pop(p)
            if p==start:break
        clean=[]
        for a,b,c in zip(ring[-1:]+ring[:-1],ring,ring[1:]+ring[:1]):
            if (b[0]-a[0])*(c[1]-b[1])!=(b[1]-a[1])*(c[0]-b[0]):clean.append(b)
        rings.append(clean)
    return sorted(rings,key=lambda r:-abs(signed(r)))
def off(r,d):
    # Offset into the waste, with all finished boundaries oriented material-left.
    result=[]
    for a,b,c in zip(r[-1:]+r[:-1],r,r[1:]+r[:1]):
        a,b,c=map(np.asarray,(a,b,c));v=b-a;v=v/np.linalg.norm(v);w=c-b;w=w/np.linalg.norm(w)
        n=np.array([v[1],-v[0]]);m=np.array([w[1],-w[0]])
        s=(n+m)*d/(1+n@m);result.append(tuple(b+s))
    return result
def thumb(r,mid,radius=9):
    out=[]
    for a,b in zip(r,r[1:]+r[:1]):
        out.append(a)
        if a[1]==b[1]==0 and a[0]<mid-radius<mid+radius<b[0]:
            out.extend([(mid+radius*math.cos(t),radius*math.sin(t)) for t in np.linspace(math.pi,0,49)])
    assert len(out)==len(r)+49
    return out
def add(name,caption,pos,neg=(),marks=(),scoop=None):
    rings=contours(list(pos),list(neg))
    if scoop:rings[0]=thumb(rings[0],scoop)
    parts[name]={'name':name,'caption':caption,'rings':rings,'paths':[off(r,KERF/2) for r in rings],'marks':list(marks)}
def base_long_tabs(length):return [(length*.5-31,12),(length*.5+31,12)]
def end_tabs(depth):return [(6.,7.),(depth-6,7.)]
def attach(pos,items,y0,y1):
    for u,w in items:pos.append(R(u-w/2,y0,u+w/2,y1))
def tangs(pos,l,h,intervals):
    for lo,hi in intervals:
        pos.extend([R(-T,lo,0,hi),R(l,lo,l+T,hi)])
def marks(x,y,t,size,font='bold'):return (x,y,t,size,font)
parts={}
def walls(prefix,l,d,h,cap=False):
    intervals=[(8,16),(23,31)] if not cap else [(8,18),(27,37),(46,56)]
    p=[R(0,0,l,h)];tangs(p,l,h,intervals)
    z0,z1=(h,h+T) if cap else (-T,0)
    attach(p,base_long_tabs(l),z0,z1)
    for name,kind in [(prefix+'F','front'),(prefix+'B','back')]:
        printing=[marks(l/2,16,'M.B. PARKS',5.3,'serif'),marks(l/2,10.8,'MOUNTAIN MARYLAND',2.0,'mono')] if name=='TF' else []
        add(name,('Cover' if cap else 'Tray')+' '+kind,p,marks=printing)
    p=[R(0,0,d+2*T,h)];attach(p,[(u+T,w) for u,w in end_tabs(d)],z0,z1)
    cut=[]
    for lo,hi in intervals:
        cut.extend([R(-1,lo-SLACK/2,T+SLACK/2,hi+SLACK/2),R(T+d-SLACK/2,lo-SLACK/2,d+2*T+1,hi+SLACK/2)])
    if not cap:
        for cy in [12.5,26.5]:cut.append(rect_ctr(T+cy,16,3+SLACK,8+SLACK))
    for key in ['L','R']:
        add(prefix+key,('Cover' if cap else 'Tray')+' end',p,cut,scoop=(d+2*T)/2 if cap else None)
        if key=='R' and not cap:
            parts['TR']['symbols']=[(T+cy,29,i) for i,cy in enumerate([5.5,19.5,33.5])]
walls('T',L,D,H);walls('C',CAP_L,CAP_D,CAP_H,True)
for key in ['D1','D2']:
    p=[R(0,0,L,DH)];tangs(p,L,DH,[(12,20)]);attach(p,[(30,10),(61,10)],-T,0)
    add(key,'Deck divider',p)
# Tray floor is wider than tray walls. Its protruding rim stops the cover.
floorx=(W-L)/2;floory=(DEP-D)/2
holes=[]
for y in [-1.5,D+1.5]:
    for u,w in base_long_tabs(L):holes.append(rect_ctr(floorx+u,floory+y,w+SLACK,T+SLACK))
for x in [-1.5,L+1.5]:
    for u,w in end_tabs(D):holes.append(rect_ctr(floorx+x,floory+u,T+SLACK,w+SLACK))
for y in [12.5,26.5]:
    for u in [30,61]:holes.append(rect_ctr(floorx+u,floory+y,10+SLACK,T+SLACK))
add('TFLOOR','Tray floor',[R(0,0,W,DEP)],holes)
# Cover roof mates to tabs with open-edge sockets.
notches=[]
for u,w in base_long_tabs(CAP_L):
    for y in [1.5,DEP-1.5]:
        notches.append(rect_ctr(T+u,y,w+SLACK,T+SLACK))
for u,w in end_tabs(CAP_D):
    for x in [1.5,W-1.5]:notches.append(rect_ctr(x,T+u,T+SLACK,w+SLACK))
add('CTOP','Cover roof',[R(0,0,W,DEP)],notches,[marks(W/2,42.2,'M.B. PARKS   /   MAKER SERIES',2,'mono'),marks(W/2,30.1,'CONTRAPTION',7.1,'serif'),marks(W/2,21,'SHUFFLE',8.6,'serif'),marks(W/2,9.5,'THREE CARDS. ONE IMPROBABLE INVENTION.',2,'mono')])
# Coupon duplicates a real divider joint in a piece that can be handled easily.
add('QF','Fit coupon / slot',[R(0,0,26,14)],[rect_ctr(13,5.2,10+SLACK,3+SLACK)], [marks(13,10.5,'FIT CHECK',2,'mono')])
add('QT','Fit coupon / tongue',[R(0,0,17,10),R(3.5,-3,13.5,0,)],marks=[marks(8.5,5,'TEST',2,'mono')])
# Sheet nesting uses unrotated parts where possible, and preserves sheet grain orientation.
def bbox(p):
    a=np.concatenate(p['paths']);return (*a.min(0),*a.max(0))
for p in parts.values():p['bbox']=bbox(p)
def nest(order):
    placed=[]
    for k in order:
        p=parts[k];x0,y0,x1,y1=p['bbox'];width=x1-x0;height=y1-y0;possible=[]
        for rot in [False,True]:
            w,h=(height,width) if rot else (width,height)
            for y in [4]+[Y+H+2.8 for _,X,Y,W_,H,_ in placed]:
                for x in [4]+[X+W_+2.8 for _,X,Y,W_,H,_ in placed]:
                    if x+w>SX-4 or y+h>SY-4:continue
                    if any(x<X+W_+2.799 and x+w+2.799>X and y<Y+H+2.799 and y+h+2.799>Y for _,X,Y,W_,H,_ in placed):continue
                    possible.append((y+h,x,rot,y,w,h))
        if not possible:return None
        _,x,rot,y,w,h=min(possible);placed.append((k,x,y,w,h,rot))
    return placed
initial=['CF','CB','CL','CR','CTOP','TFLOOR','TF','TB','TL','TR','D1','D2','QT','QF']
layout=nest(initial)
if not layout:
    rand=random.Random(407)
    for _ in range(1500):
        rand.shuffle(initial);layout=nest(initial)
        if layout:break
assert layout
def flat(k,pt,transform):
    x,y,w,h,rot=transform;a,b,c,d=parts[k]['bbox'];u,v=pt
    if rot:return (x+v-b,y+u-a)
    return (x+u-a,y+d-v)
def affine(k,t):
    z=np.array(flat(k,(0,0),t));u=np.array(flat(k,(1,0),t))-z;v=np.array(flat(k,(0,1),t))-z
    return f'matrix({u[0]:.5f} {u[1]:.5f} {v[0]:.5f} {v[1]:.5f} {z[0]:.5f} {z[1]:.5f})'
FONTS={}
for alias,filename in [('bold','DejaVuSans-Bold'),('mono','DejaVuSansMono-Bold'),('serif','DejaVuSerif-Bold')]:
    f=TTFont('/usr/share/fonts/truetype/dejavu/'+filename+'.ttf');FONTS[alias]=(f.getBestCmap(),f.getGlyphSet(),f['head'].unitsPerEm,f['hmtx'].metrics)
def lettering(mark):
    x,y,text,size,alias=mark;cmap,gs,em,mt=FONTS[alias];s=size/em
    names=[cmap[ord(ch)] for ch in text];advance=sum(mt[name][0] for name in names)
    result=[f'<g transform="translate({x:.3f} {y-size*.36:.3f}) scale({s:.8f}) translate({-advance/2:.3f} 0)">'];penx=0
    for name in names:
        pen=SVGPathPen(gs);gs[name].draw(pen);path=pen.getCommands()
        if path:result.append(f'<path transform="translate({penx} 0)" d="{path}"/>')
        penx+=mt[name][0]
    return ''.join(result)+'</g>'
def pathd(r):return 'M '+' L '.join(f'{x:.5f},{y:.5f}' for x,y in r)+' Z'
def symbol(x,y,i):
    if i==0:
        pts=[(-3.3,.4),(0,-1),(3.3,.4),(3.3,-.25),(0,-1.7),(-3.3,-.25)]
        return ''.join('<path d="'+pathd([(x+a,y+b+j) for a,b in pts])+'"/>' for j in [-1.7,0,1.7])
    if i==1:
        pts=[]
        for j in range(8):
            for t,r in [(0,2.5),(.16,3.2),(.6,3.2),(.8,2.5)]:pts.append((x+r*math.cos((j+t)*math.tau/8),y+r*math.sin((j+t)*math.tau/8)))
        return '<path fill-rule="evenodd" d="'+pathd(pts)+f' M {x+1},{y} a 1 1 0 1 0 -2 0 a 1 1 0 1 0 2 0 Z"/>'
    return '<path d="'+pathd([(x+a,y+b) for a,b in [(-2.5,-3),(-1.7,-3),(-1.7,-.4),(3,-.4),(1.5,1),(3,2.8),(-2.5,2.8)]])+'"/>'
def svg():
    head=f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="{SX}mm" height="{SY}mm" viewBox="0 0 {SX} {SY}">'.replace('http://www.inkscape.org/namespaces/inkscape','http://www.inkscape.org/namespaces/inkscape')
    # Inkscape's official namespace uses www.inkscape.org/namespaces/inkscape.
    out=[head,'<title>The Contraption Shuffle | Laser case | 3 mm | v1.0</title>','<desc>All paths in millimetres. Cut centreline with no added offset. Included full kerf allowance: 0.15 mm. Cut internal shapes before outlines. Engraving is optional.</desc>']
    out+=['<g id="engrave" inkscape:groupmode="layer" inkscape:label="01 ENGRAVE • black fill" fill="#000000" stroke="none">']
    for k,*t in layout:
        p=parts[k]
        if p['marks'] or 'symbols' in p:out.append(f'<g id="engrave-{k}" transform="{affine(k,t)}">'+''.join(map(lettering,p['marks']))+''.join(symbol(*v) for v in p.get('symbols',[]))+'</g>')
    out.append('</g>')
    for inner,id,color in [(True,'slots','#0000ff'),(False,'profiles','#ff0000')]:
        label='02 CUT • blue interior slots' if inner else '03 CUT • red outer profiles'
        out.append(f'<g id="{id}" inkscape:groupmode="layer" inkscape:label="{label}" fill="none" stroke="{color}" stroke-width="0.06" stroke-linejoin="miter">')
        for k,*t in layout:
            rr=parts[k]['paths'][1:] if inner else parts[k]['paths'][:1]
            for j,r in enumerate(rr):out.append(f'<path id="{id}-{k}-{j}" d="'+pathd([flat(k,pt,t) for pt in r])+'"/>')
        out.append('</g>')
    (OUT/'Contraption-Shuffle-Laser-Case.svg').write_text('\n'.join(out+['</svg>']))
def shape(k):
    def wire(r):
        return cq.Wire.makePolygon([cq.Vector(x,y,0) for x,y in r],close=True)
    a=parts[k]['rings'];return cq.Solid.extrudeLinear(wire(a[0]),[wire(r) for r in a[1:]],cq.Vector(0,0,T))
def assembled():
    pieces={}
    def wall(k,x,y,z,end=False):
        p=shape(k).rotate((0,0,0),(1,0,0),90)
        if end:p=p.rotate((0,0,0),(0,0,1),90)
        pieces[k]=p.translate((x,y,z))
    pieces['TFLOOR']=shape('TFLOOR').translate((-floorx,-floory,0))
    pieces['CTOP']=shape('CTOP').translate((-floorx,-floory,3+CAP_H))
    for prefix,x,y,l,d in [('T',0,0,L,D),('C',-T-CL,-T-CL,CAP_L,CAP_D)]:
        wall(prefix+'F',x,y,3);wall(prefix+'B',x,y+d+T,3)
        wall(prefix+'L',x-T,y-T,3,True);wall(prefix+'R',x+l,y-T,3,True)
    wall('D1',0,14,3);wall('D2',0,28,3)
    return pieces
def check():
    pieces=assembled();keys=list(pieces)
    for j,k in enumerate(keys):
        p=pieces[k];assert p.isValid() and len(p.Solids())==1
        for u in keys[:j]:
            assert p.intersect(pieces[u]).Volume()<1e-6,(k,u)
    for y in [5.5,19.5,33.5]:
        cards=cq.Workplane().box(88.9,9.,63.5).val().translate((L/2,y,3+63.5/2))
        assert all(cards.intersect(p).Volume()<1e-6 for p in pieces.values())
    for k in keys:
        # Offset back by half the projected kerf to recover the finished contours.
        for net,tool in zip(parts[k]['rings'],parts[k]['paths']):
            assert np.max(np.abs(np.asarray(off(tool,-KERF/2))-np.asarray(net)))<1e-7
    print('CAD: 12 valid panels, no positive-volume collisions; all 3 stacks fit. Layout:', [(k, round(x,1),round(y,1),rot) for k,x,y,w,h,rot in layout],flush=True)
    return pieces
if __name__=='__main__':
    svg();check()
