from design import *
import fitz,re,xml.etree.ElementTree as ET,itertools
from collections import Counter
svgdoc=ET.parse(OUT/'Contraption-Shuffle-Laser-Case.svg').getroot();by={e.get('id'):e for e in svgdoc.iter() if e.get('id')}
assert len(by['profiles'])==14 and len(by['slots'])==17
assert svgdoc.get('width')=='300mm' and svgdoc.get('height')=='220mm'
pdf=fitz.open(OUT/'Contraption-Shuffle-Laser-Case.pdf')
assert len(pdf)==1 and np.allclose([pdf[0].rect.width,pdf[0].rect.height],np.array([300,220])*72/25.4,atol=.002)
scale=72/25.4
for layer,color in [('slots',(0,0,1)),('profiles',(1,0,0))]:
    vec=[d for d in pdf[0].get_drawings() if d['color']==color and d['type']=='s']
    assert len(vec)==len(by[layer]),(layer,len(vec))
    boxes=[]
    for el in by[layer]:
        coords=np.array(list(map(float,re.findall(r'[-0-9.]+',el.get('d'))))).reshape((-1,2))
        boxes.append(tuple(np.r_[coords.min(0),coords.max(0)]))
    vecboxes=[tuple(np.array(d['rect'])/scale) for d in vec]
    for b in boxes:assert np.min(np.max(np.abs(np.array(vecboxes)-b),axis=1))<.01,(layer,b)
for k,x,y,w,h,rot in layout:assert min(x,y)>=4-1e-6 and x+w<=SX-4+1e-6 and y+h<=SY-4+1e-6
p=check()
for key in ('TF','TB','TL','TR','D1','D2'):
 assert p[key].distance(p['TFLOOR'])<.00001
for key in ('CF','CB','CL','CR'):
 assert p[key].distance(p['CTOP'])<.00001
 assert p[key].distance(p['TFLOOR'])<.00001
for cover in [p[k] for k in ['CF','CB','CL','CR','CTOP']]:
 for lo in [p[k] for k in ['TF','TB','TL','TR','TFLOOR','D1','D2']]:
  assert cover.translate((0,0,20)).intersect(lo).Volume()<1e-6
print('Scale verified, 31 closed cut contours agree in both formats. Lid seats on floor; wall and divider joints seat.')
