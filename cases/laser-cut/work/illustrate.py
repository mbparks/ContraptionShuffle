from design import *
from PIL import ImageFilter
def font(kind,size):
    n={'r':'DejaVuSans','b':'DejaVuSans-Bold','s':'DejaVuSerif-Bold','m':'DejaVuSansMono'}
    return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/'+n[kind]+'.ttf',size)
sheet=np.asarray(Image.open(TMP/'sheet-rgba.png').convert('RGBA'))
table={k:t for k,*t in layout}
pieces=assembled()
def norm(a):
    a=np.asarray(a,float);return a/np.linalg.norm(a)
def scene(mode):
    output=[]
    def addsolid(k,solid,axis,col,inktex=False):
        vert,idx=solid.tessellate(.05,.12);v=np.array([p.toTuple() for p in vert]);tr=v[np.asarray(idx)]
        for tri in tr:
            nv=norm(np.cross(tri[1]-tri[0],tri[2]-tri[0]));broad=abs(nv[axis])>.99
            rgb=col if broad else np.array(col)*[.48,.39,.29]
            output.append((tri,nv,rgb,k if inktex and broad else ''))
    for k,p in pieces.items():
        if mode!='closed' and k.startswith('C'):continue
        axis=2 if k in ['CTOP','TFLOOR'] else (0 if k in ['TR','TL','CR','CL'] else 1)
        addsolid(k,p,axis,np.array([218,186,132]),k in ('CTOP','TF','TR'))
    if mode=='open':
        for y,c in zip([5.5,19.5,33.5],[[45,104,81],[50,97,147],[164,60,54]]):
            for i in range(18):
                a=cq.Workplane().box(88.9,.40,63.5).val().translate((L/2,y+(i-8.5)*.44,3+63.5/2))
                v,idx=a.tessellate(.08,.1);tr=np.array([p.toTuple() for p in v])[np.array(idx)]
                for ti in tr:
                    n=norm(np.cross(ti[1]-ti[0],ti[2]-ti[0]))
                    rgb=c if abs(n[1])>.9 else [231,221,189]
                    output.append((ti,n,np.array(rgb),''))
    return output
def render(mode,direction,W,H):
    data=scene(mode);d=norm(direction);right=norm(np.cross([0,0,1],d));up=np.cross(d,right)
    light=norm([-.25,-.55,.85])
    proj=[np.stack([t@right,t@up,t@d],-1) for t,*_ in data];low=np.min(proj,(0,1));high=np.max(proj,(0,1));s=min((W-60)/(high[0]-low[0]),(H-55)/(high[1]-low[1]))
    depth=np.full((H,W),-1e8);pix=np.zeros((H,W,3),np.uint8)
    for ((t,n,col,k),p) in zip(data,proj):
        if n@d<-1e-8:continue
        p[:,0]=(p[:,0]-(low[0]+high[0])/2)*s+W/2
        p[:,1]=-(p[:,1]-(low[1]+high[1])/2)*s+H/2-3
        a,b,c=p;eu=b-a;ev=c-a;det=eu[0]*ev[1]-eu[1]*ev[0]
        if abs(det)<1e-7:continue
        x0,y0=np.floor(p.min(0)[:2]).astype(int);x1,y1=np.ceil(p.max(0)[:2]).astype(int)
        yy,xx=np.ogrid[y0:y1+1,x0:x1+1];xx=xx+.5-a[0];yy=yy+.5-a[1]
        u=(xx*ev[1]-yy*ev[0])/det;v=(eu[0]*yy-eu[1]*xx)/det;z=a[2]+u*eu[2]+v*ev[2]
        block=depth[y0:y1+1,x0:x1+1];mask=(u>=-1e-8)&(v>=-1e-8)&(u+v<=1+1e-8)&(z>block)
        if not mask.any():continue
        block[mask]=z[mask];xyz=t[0]+u[mask,None]*(t[1]-t[0])+v[mask,None]*(t[2]-t[0])
        tone=.68+.34*max(0,n@light)
        color=col[None,:]*tone*np.ones((len(xyz),1))
        if k:
            zc=xyz[:,2];xc=xyz[:,0];yc=xyz[:,1]
            if k=='CTOP': U,V=xc+floorx,yc+floory
            elif k=='TF':U,V=xc,zc-3
            else:U,V=yc+3,zc-3
            px,py=flat(k,(U,V),table[k]);sc=sheet.shape[1]/SX
            rgba=sheet[np.clip((py*sc).astype(int),0,sheet.shape[0]-1),np.clip((px*sc).astype(int),0,sheet.shape[1]-1)]
            engraved=(rgba[:,:3].max(1)<32)
            color*=1-(.67*rgba[:,3]/255*engraved)[:,None]
        pix[y0:y1+1,x0:x1+1][mask]=np.clip(color,0,255)
    visible=depth>-1e7;shade=np.zeros_like(depth)
    for dx,dy in [(6,0),(-6,0),(0,6),(0,-6)]:
        shade+=np.clip((np.roll(depth,(dy,dx),(0,1))-depth-1)/4,0,1)*visible
    pix=np.uint8(pix*(1-.045*shade[:,:,None]));im=Image.new('RGB',(W,H),'#F7F3E8');isvis=Image.fromarray(np.uint8(visible)*255);im.paste(Image.fromarray(pix),(0,0),isvis)
    return im
def preview():
    sheet=Image.new('RGB',(1480,770),'#F7F3E8');dr=ImageDraw.Draw(sheet);dark='#20382F';muted='#6A695A'
    dr.text((52,37),'M.B. PARKS   /   WORKSHOP EQUIPMENT',font=font('m',18),fill=muted)
    dr.text((50,69),'The Contraption Shuffle',font=font('s',49),fill=dark)
    dr.text((54,140),'Laser-cut card case   /   3 mm plywood',font=font('r',24),fill=dark)
    for mode,x,label,desc,direction in [('closed',30,'Slip-over cover','Thumb cutouts expose the tray at both ends.',[.96,-1.6,1.4]),('open',760,'Three deck bays','One pile per bay, stored on its long edge.',[1,-1.55,1.37])]:
        im=render(mode,direction,1000,700).resize((686,446),Image.Resampling.LANCZOS)
        sheet.paste(im,(x,185));dr.text((x+24,641),label,font=font('b',23),fill=dark);dr.text((x+24,677),desc,font=font('r',17),fill=muted)
    dr.line((52,718,1426,718),fill='#c6b99d');dr.text((54,733),'CLOSED   104 × 52 × 71.5 mm      /      DECK   3 × 18 cards      /      CUT SHEET   300 × 220 mm',font=font('m',15),fill=dark)
    sheet.save(OUT/'Contraption-Shuffle-Laser-Case-Preview.png')
    sheet.crop((0,180,1480,709)).save(TMP/'guide-views.png')
if __name__=='__main__':preview()
