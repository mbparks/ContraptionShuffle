from design import *
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as ReportFont
from reportlab.lib.colors import HexColor
for key,fn in [('body','DejaVuSans'),('bold','DejaVuSans-Bold'),('title','DejaVuSerif-Bold'),('mono','DejaVuSansMono')]:
    pdfmetrics.registerFont(ReportFont(key,'/usr/share/fonts/truetype/dejavu/'+fn+'.ttf'))
paper=HexColor('#F7F3E8');ink=HexColor('#233D34');dim=HexColor('#625F52');brass=HexColor('#8C6741')
c=canvas.Canvas(str(OUT/'Contraption-Shuffle-Laser-Case-Assembly.pdf'),pagesize=(612,792));c.setTitle('The Contraption Shuffle | Laser case assembly');c.setAuthor('Michael B. Parks')
def text(s,x,y,font='body',size=10,color=ink):
    c.setFillColor(color);c.setFont(font,size);c.drawString(x,y,s)
def para(s,x,y,w,size=9.8,lead=14):
    line=''
    for word in s.split():
        new=(line+' '+word).strip()
        if line and pdfmetrics.stringWidth(new,'body',size)>w:
            text(line,x,y,size=size);y-=lead;line=word
        else:line=new
    if line:text(line,x,y,size=size);y-=lead
    return y
def page(n,title,sub):
    c.setFillColor(paper);c.rect(0,0,612,792,fill=1,stroke=0)
    text('M.B. PARKS  /  WORKSHOP EQUIPMENT',36,755,'mono',8,dim)
    text('LASER CASE   /   01.0',450,755,'mono',8,dim)
    text(title,36,709,'title',25);text(sub,37,685,'body',11)
    c.setStrokeColor(HexColor('#C3B59F'));c.line(36,39,576,39)
    text('THE CONTRAPTION SHUFFLE  /  3 MM PLYWOOD',36,24,'mono',7,dim);text(f'{n} / 2',551,24,'mono',7,dim)
def step(num,title,body,y):
    c.setFillColor(ink);c.roundRect(36,y-5,24,18,3,fill=1,stroke=0)
    text(num,42,y,'mono',8.3,paper);text(title,72,y,'bold',10.7)
    return para(body,72,y-17,501,9.4,13.6)-17
page(1,'Cut and assemble','A two-piece case for three 18-card decks.')
c.drawImage(str(TMP/'guide-views.png'),36,475,width=540,height=193,mask='auto')
y=456
y=step('01','Check the joint on your stock.','Measure the sheet and cut the QF slot and QT tongue shown on page 2. The tongue should slide fully into the slot with light finger pressure, with just enough room for wood glue. If it binds or rattles, adjust the fit before cutting the panels.',y)
y=step('02','Run the full sheet at actual size.','Use either cutting file at 100% scale. Engrave the black fills first, cut the blue interior slots second, then cut the red outer profiles. The sheet is 300 × 220 mm. The toolpaths already allow for a 0.15 mm full kerf. Set additional kerf offset to zero.',y)
y=step('03','Assemble the lower tray first.','Dry-fit the long walls and both dividers into one short end, with all floor tabs down. Bring the other end onto all four pieces together. Place the engraved long wall at the front and the symbols on the right end, facing out. Lower this assembly into the slotted floor. Apply wood glue to the joints and hold it square while it cures.',y)
y=step('04','Build the removable cover separately.','Fit the four tall walls together with the roof tabs up and thumb cutouts down. Seat the engraved roof over the tabs, lettering out. Glue the five cover panels and check both diagonals for square. Remove excess glue from the inside corners.',y)
y=step('05','Load the case.','When the glue is dry, place the three piles on their long edges. From the engraved front to the back, load Materials, Mechanism and Mission. Lower the cover until it seats on the floor rim. To open, grip the tray through the two thumb cutouts and lift off the cover.',y)
assert y>32,y
c.showPage()
page(2,'Parts and fit','Use this map to identify panels on the cut sheet.')
sc=1.55;ox=73;top=653
c.setStrokeColor(HexColor('#D7CBB4'));c.setLineWidth(.6);c.rect(ox,top-SY*sc,SX*sc,SY*sc)
for k,*tr in layout:
    p=parts[k];c.setFillColor(HexColor('#E7EEDE') if k.startswith('T') or k.startswith('D') else HexColor('#EEE1C9') if k.startswith('C') else HexColor('#DDE4EC'));c.setStrokeColor(ink)
    for j,ring in enumerate(p['rings']):
        pts=[flat(k,pt,tr) for pt in ring];pa=c.beginPath();pa.moveTo(ox+pts[0][0]*sc,top-pts[0][1]*sc)
        for x,y in pts[1:]:pa.lineTo(ox+x*sc,top-y*sc)
        pa.close()
        if j:c.setFillColor(paper)
        c.drawPath(pa,stroke=1,fill=1)
    x,y,w,h,_=tr;c.setFillColor(ink);c.setFont('bold',8 if k.startswith('Q') else 9.5)
    c.drawCentredString(ox+(x+w/2)*sc,top-(y+h*.46)*sc-2,k)
y=284
for label,tx in [('TRAY','TFLOOR / base plate with 12 slots. TF and TB / long walls. TL and TR / short ends. TR carries the three engraved symbols. D1 and D2 / identical dividers.'),('COVER','CTOP / engraved roof with edge sockets. CF and CB / long walls. CL and CR / identical short ends with thumb cutouts.'),('COUPON','QF / test slot. QT / matching tongue. Test both the sheet thickness and tab width. The nominal finished slot is 3.12 × 10.12 mm for a 3.00 × 10.00 mm tongue.'),('FIT','Closed case, 104 × 52 × 71.5 mm. Each bay is 91 × 11 mm for an unsleeved 88.9 × 63.5 mm card. Design stack thickness is 9 mm per pile. The cover has 0.5 mm clearance on each side and 2 mm above the cards.')]:
    text(label,36,y,'mono',8.8,brass);y=para(tx,108,y,465,9.7,14)-17
assert y>45,y
text('CAD fit verified. Confirm the physical joint with your material and laser.',37,53,'body',8.5,dim)
c.showPage();c.save()
