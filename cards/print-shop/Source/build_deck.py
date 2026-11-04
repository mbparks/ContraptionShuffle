from pathlib import Path
import math, json, csv, zipfile, shutil
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
import fitz
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'output'/'pdf'; OUT.mkdir(parents=True,exist_ok=True)
PACK=OUT/'Contraption-Shuffle-Print-Pack'; PACK.mkdir(exist_ok=True)
QA=ROOT/'tmp'/'pdfs'; QA.mkdir(parents=True,exist_ok=True)
for n,f in [('Body','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf'),('Title','DejaVuSerif-Bold.ttf'),('Mono','DejaVuSansMono.ttf')]:
    pdfmetrics.registerFont(TTFont(n,'/usr/share/fonts/truetype/dejavu/'+f))
INK=HexColor('#222D2B'); CREAM=HexColor('#FAF5E9'); LINE=HexColor('#D5CCB9')
COLORS={'M':HexColor('#236349'),'K':HexColor('#285D9A'),'G':HexColor('#B93F3D')}
NAMES={'M':'MATERIALS','K':'MECHANISM','G':'MISSION'}
PROMPTS={'M':'BUILD WITH...','K':'MAKE IT WORK WITH...','G':'MAKE IT...'}

# Printed edition has its own permanent M/K/G 01-18 identifiers.
RAW={
'M':[
('Corrugated cardboard','Use the ridged layers of a shipping box as your main building material. Cut, fold or laminate them.','FOLD / STACK / SLOT'),
('Paper','Make paper do the work. Fold, roll, pleat or layer ordinary sheets into a useful structure.','FOLD / ROLL / PLEAT'),
('Scrap wood','Give a wooden offcut another job. Make it a useful part of your contraption.','JOIN / STACK / SHAPE'),
('Discarded packaging','Turn a clean box, carton or packing insert into the main structure of your build.','RESCUE / REBUILD'),
('Paperboard tubes','Build around one or more paperboard tubes. Use their hollow shape, or cut and reshape them.','ROLL / NEST / JOIN'),
('Craft sticks','Use craft sticks as the main structural pieces. Connect them into something that works.','BRIDGE / LINK / LAYER'),
('Bottle caps','Make clean bottle caps an essential part of your build. Explore their rims, circles and small size.','ROLL / STACK / SORT'),
('Plastic bottles','Give a clean plastic bottle a new purpose. Use its body, neck or flexible walls in your build.','SQUEEZE / SHAPE / HOLD'),
('Fabric scraps','Make fabric an essential working part. Fold, stretch, tie or stitch your scraps into shape.','STITCH / STRETCH / FOLD'),
('String or yarn','Use string or yarn to carry a load, connect parts or transmit motion. Put tension to work.','TIE / WEAVE / PULL'),
('Thin craft wire','Bend thin craft wire into a useful structure or moving part. Give those lines a job to do.','BEND / LOOP / TWIST'),
('Rubber bands','Put rubber bands to work. Use their stretch, grip or stored energy as a key part of your build.','STRETCH / GRIP / RETURN'),
('Clothespins','Use wooden clothespins as working parts. Try their jaws, spring or wooden halves.','CLAMP / JOIN / RELEASE'),
('Egg cartons','Turn a clean egg carton into a useful structure. Explore its cups, ridges and folding lid.','CUP / CUT / CONNECT'),
('Corks','Use corks as key parts in your invention. Explore their grip, buoyancy or rounded shape.','FLOAT / ROLL / GRIP'),
('Aluminum foil','Make foil do useful work. Fold, crumple or layer it into a shape that helps your invention.','FOLD / PRESS / REFLECT'),
('Fallen twigs','Gather fallen twigs and build with their natural shapes. Join them into a useful structure.','LASH / BRANCH / BALANCE'),
('Three rescued objects','Choose three clean objects headed for the trash. Give all three a useful role in one contraption.','RESCUE / COMBINE / REUSE')],
'K':[
('Lever','Pivot a bar on a support. Use movement at one end to lift, push or move something at the other.','PIVOT / PUSH / LIFT'),
('Wheel and axle','Connect a wheel to a shaft so they turn together. Use their rotation to help accomplish the mission.','TURN TOGETHER'),
('Pulley','Run a cord over a turning wheel. Use it to redirect a pull or help move a load.','GUIDE THE PULL'),
('Counterweight','Use one weight to balance or move another part. The balancing weight must do useful work.','BALANCE / MOVE'),
('Ramp','Use a sloped surface to guide motion or raise an object gradually. Make the slope do useful work.','GUIDE ALONG A SLOPE'),
('Wedge','Push a tapered piece between surfaces. Use its shape to lift, separate or hold something.','PUSH / SEPARATE / HOLD'),
('Screw','Use a threaded connection to turn rotation into straight-line movement or a holding force.','TURN INTO TRAVEL'),
('Cam and follower','Turn a shaped wheel against a follower. Use its changing profile to lift or move the follower.','TURN INTO A REPEAT'),
('Crank and slider','Connect an off-center crank pin to a guided slider. Turn the crank to create back-and-forth travel.','TURN / PUSH / PULL'),
('Linkage','Join rigid pieces with pivots. Use the connected pieces to guide or transfer movement.','CONNECT THE MOTION'),
('Meshing gears','Make toothed wheels engage. Use one gear to turn another and help accomplish the mission.','TEETH TRANSFER MOTION'),
('Belt drive','Loop a belt around two wheels. Use the belt to carry rotation from one wheel to the other.','CONNECT TWO WHEELS'),
('Ratchet and pawl','Let a catch engage a toothed wheel or strip. Allow motion one way and resist it the other way.','ADVANCE / HOLD'),
('Spring return','Store energy in a spring or elastic part. Release it to bring a moving part back toward its start.','STRETCH / RELEASE'),
('Gravity feed','Arrange parts so gravity supplies the motion. Guide objects toward a useful destination.','LET GRAVITY WORK'),
('Pendulum','Hang a weight from a pivot and let it swing. Use the repeated motion to help with your mission.','SWING FROM A PIVOT'),
('Spool and cord','Wind or unwind a cord around a drum. Use the changing cord length to move another part.','WIND / LIFT / RELEASE'),
('Flexible hinge','Join two parts with a bendable strip. Make movement happen by bending the joint.','BEND AT THE JOINT')],
'G':[
('Lift a small object','Raise a small object from a lower level to a higher one. Let your mechanism do the lifting.','TEST: SHOW A CLEAR LIFT'),
('Cross a gap','Move a small object from one side of a gap to the other. Keep it out of the space below.','TEST: REACH THE FAR SIDE'),
('Deliver a message','Carry a written or drawn message from its starting point to a waiting recipient.','TEST: MESSAGE RECEIVED'),
('Reveal something hidden','Keep an object or message concealed. Operate your contraption to bring it into view.','TEST: HIDDEN TO VISIBLE'),
('Sort by size','Separate a mixed collection into at least two size groups. Make the contraption help decide.','TEST: TWO DISTINCT GROUPS'),
('Dispense one at a time','Hold several similar objects. Release just one during each operating cycle.','TEST: ONE PER CYCLE'),
('Hold it in position','Keep an object in a chosen position without holding it yourself. Show that it stays put.','TEST: LET GO; IT STAYS'),
('Protect something fragile','Build a way to protect a fragile object from a small bump. Use a harmless stand-in first.','TEST: SURVIVE A SMALL BUMP'),
('Draw a repeating pattern','Move a drawing tool or a surface to make a pattern repeat. Let the mechanism guide it.','TEST: REPEAT THREE TIMES'),
('Bring a creature to life','Give an imagined creature a convincing movement. Make it nod, flap, crawl or express a mood.','TEST: SHOW ITS MOVEMENT'),
('Give a visible signal','Make a clear visual change that someone can recognize from across a table.','TEST: SPOT THE CHANGE'),
('Make a sound','Create an intentional sound when your contraption operates. Make it happen again on demand.','TEST: SOUND ON DEMAND'),
('Compare two weights','Show which of two small objects is heavier, or whether they balance. Use the same test for both.','TEST: SWAP AND COMPARE'),
('Slow a moving object','Make an object move more slowly than it would without your contraption. Compare both runs.','TEST: COMPARE THE MOTION'),
('Catch and release','Catch a small moving object, hold it briefly, then release it through your mechanism.','TEST: CATCH / HOLD / LET GO'),
('Fold into less space','Make a useful structure that folds into a smaller form. Open it again and show it still works.','TEST: FOLD AND REOPEN'),
('Operate from a distance','Control an action from beyond arm\'s reach. Keep your hands away from the part doing the job.','TEST: WORK IT FROM AFAR'),
('Move two things together','Use one input to make two separate parts move at the same time. Give both parts a visible job.','TEST: ONE INPUT; TWO MOVES')]
}

def line(c,x1,y1,x2,y2): c.line(x1,y1,x2,y2)
def poly(c,pts,close=False,fill=False):
    p=c.beginPath(); p.moveTo(*pts[0])
    for pt in pts[1:]: p.lineTo(*pt)
    if close:p.close()
    c.drawPath(p,stroke=1,fill=int(fill))
def arrow(c,x1,y1,x2,y2,head=4):
    c.line(x1,y1,x2,y2); a=math.atan2(y2-y1,x2-x1)
    poly(c,[(x2-head*math.cos(a-.55),y2-head*math.sin(a-.55)),(x2,y2),(x2-head*math.cos(a+.55),y2-head*math.sin(a+.55))])
def circle(c,x,y,r,fill=False):c.circle(x,y,r,stroke=1,fill=int(fill))
def rect(c,x,y,w,h,fill=False):c.rect(x,y,w,h,stroke=1,fill=int(fill))
def ground(c,x,y,w):
    line(c,x,y,x+w,y)
    c.saveState(); c.setLineWidth(.55)
    for a in range(0,int(w)+1,6):line(c,x+a,y,x+a-4,y-4)
    c.restoreState()
def pivot(c,x,y):
    c.saveState(); c.setFillColor(CREAM); circle(c,x,y,3,True); c.restoreState()
def gear(c,x,y,r,n=12):
    pts=[]
    for i in range(n):
        for j,rr in [(0,r*.79),(.15,r),(.6,r),(.75,r*.79)]:
            a=(i+j)*2*math.pi/n;pts.append((x+rr*math.cos(a),y+rr*math.sin(a)))
    poly(c,pts,True);circle(c,x,y,r*.23)
def sheets(c,x,y,s):
    for dy in [s*.22,s*.11,0]:poly(c,[(x,y+dy+s*.36),(x+s*.5,y+dy+s*.62),(x+s,y+dy+s*.36),(x+s*.5,y+dy+s*.1)],True)
def flag(c,x,y,s):
    line(c,x+s*.15,y,x+s*.15,y+s)
    poly(c,[(x+s*.15,y+s*.91),(x+s*.9,y+s*.91),(x+s*.7,y+s*.64),(x+s*.9,y+s*.4),(x+s*.15,y+s*.4)],True)
    line(c,x,y,x+s*.35,y)
def symbol(c,k,x,y,s):
    if k=='M':sheets(c,x,y,s)
    elif k=='K':gear(c,x+s/2,y+s/2,s/2,10)
    else:flag(c,x,y,s)
def label(c,s,x,y,size=5):c.setFont('Mono',size);c.drawCentredString(x,y,s)
def spring(c,x1,y,x2):
    pts=[(x1,y),(x1+7,y)]
    for i in range(12):pts.append((x1+10+i*(x2-x1-20)/11,y+(5 if i%2 else -5)))
    pts.extend([(x2-5,y),(x2,y)]);poly(c,pts)
def book(c,x,y,w=35,h=26):
    poly(c,[(x,y),(x+w/2,y-3),(x+w,y),(x+w,y+h),(x+w/2,y+h-3),(x,y+h)],True);line(c,x+w/2,y-3,x+w/2,y+h-3)
def envelope(c,x,y,w=32,h=22):
    rect(c,x,y,w,h);poly(c,[(x,y+h),(x+w/2,y+7),(x+w,y+h)])
def block(c,x,y,w=25,h=20):
    rect(c,x,y,w,h);poly(c,[(x,y+h),(x+7,y+h+7),(x+w+7,y+h+7),(x+w,y+h)]);poly(c,[(x+w,y),(x+w+7,y+7),(x+w+7,y+h+7)])

def material_art(c,i):
    if i==1:
        for y in [20,30,40]:
            poly(c,[(23,y),(102,y),(127,y+17),(49,y+17)],True)
            for x in range(25,100,8):poly(c,[(x,y),(x+3,y+4),(x+7,y)])
    elif i==2:
        sheets(c,32,11,81);poly(c,[(46,40),(72,50),(101,35)]);arrow(c,97,60,114,65)
    elif i==3:
        for x,y,a in [(23,16,0),(47,37,5)]:
            block(c,x,y,68,13)
            for dy in [3,7,10]:poly(c,[(x+5,y+dy),(x+27,y+dy+1),(x+52,y+dy-1),(x+63,y+dy)])
    elif i==4:
        poly(c,[(48,18),(83,8),(111,24),(111,52),(77,42),(48,49)],True)
        poly(c,[(48,49),(35,61),(67,68),(77,56),(111,52),(123,64),(88,72),(77,56),(77,42)])
        poly(c,[(48,49),(77,56),(111,52)]);line(c,83,8,83,39)
    elif i==5:
        for x,y,h in [(33,17,40),(79,11,55)]:
            c.ellipse(x,y,x+25,y+10);line(c,x,y+5,x,y+h);line(c,x+25,y+5,x+25,y+h)
            c.ellipse(x,y+h-5,x+25,y+h+5);c.ellipse(x+4,y+h-3,x+21,y+h+2)
    elif i==6:
        for x,y,a in [(25,18,12),(44,26,-8),(59,39,20)]:
            c.saveState();c.translate(x,y);c.rotate(a);c.roundRect(0,0,72,10,5,stroke=1,fill=0);line(c,12,5,60,5);c.restoreState()
    elif i==7:
        for x,y,r in [(47,30,19),(94,44,22),(107,17,11)]:
            gear(c,x,y,r,16);circle(c,x,y,r*.65)
    elif i==8:
        poly(c,[(56,11),(50,16),(50,45),(59,59),(59,68),(83,68),(83,59),(93,45),(93,16),(87,11)],True)
        rect(c,57,69,28,6);line(c,52,28,91,28);line(c,52,42,91,42);line(c,57,49,62,57)
    elif i==9:
        poly(c,[(26,17),(39,65),(122,57),(107,10)],True)
        c.saveState();c.setDash(2,2);poly(c,[(33,22),(44,58),(113,52),(103,17)],True);c.restoreState()
        for x in [48,60,72,84,96]:line(c,x,25,x+8,50)
        for y in [28,36,44]:line(c,45,y,101,y-4)
    elif i==10:
        c.ellipse(45,17,102,66)
        for x in [48,55,63,71]:c.bezier(x,22,x+38,15,x-12,64,x+24,62)
        c.bezier(87,20,120,-2,122,28,138,20)
    elif i==11:
        for k in range(4):c.ellipse(26+k*5,20+k*4,88+k*5,54+k*4)
        c.bezier(107,42,118,46,119,19,131,22);poly(c,[(26,36),(18,32),(20,16)])
    elif i==12:
        for x,y,a in [(25,26,-15),(72,19,17)]:
            c.saveState();c.translate(x,y);c.rotate(a);c.ellipse(0,0,48,25);c.ellipse(3,3,45,22);c.restoreState()
        arrow(c,18,57,8,63);arrow(c,127,54,139,61)
    elif i==13:
        poly(c,[(26,22),(117,45),(122,40),(35,13)],True);poly(c,[(26,53),(117,31),(121,36),(35,62)],True)
        circle(c,76,38,8);circle(c,76,38,4);line(c,69,41,61,49);line(c,83,35,93,28)
    elif i==14:
        poly(c,[(24,22),(41,57),(127,57),(110,22)],True)
        for row in range(2):
            for col in range(3):c.ellipse(36+col*25+row*6,26+row*14,55+col*25+row*6,38+row*14)
        poly(c,[(24,22),(26,13),(111,13),(110,22)]);poly(c,[(111,13),(128,48),(127,57)])
    elif i==15:
        for x,y in [(33,17),(82,28)]:
            c.ellipse(x,y,x+25,y+10);line(c,x,y+5,x,y+33);line(c,x+25,y+5,x+25,y+33);c.ellipse(x,y+28,x+25,y+38)
            for dx,dy in [(5,13),(17,17),(9,24),(20,10)]:line(c,x+dx,y+dy,x+dx+2,y+dy+1)
    elif i==16:
        poly(c,[(24,18),(41,63),(119,57),(112,17),(87,23),(62,12)],True)
        for pts in [[(41,63),(65,37),(24,18)],[(65,37),(87,23),(119,57)],[(65,37),(112,17)],[(65,37),(89,58)]]:poly(c,pts)
    elif i==17:
        poly(c,[(35,11),(61,38),(70,69)]);poly(c,[(61,38),(93,52),(112,54)]);poly(c,[(47,24),(29,42),(24,59)])
        poly(c,[(83,13),(100,37),(123,67)]);line(c,100,37,88,58);line(c,110,52,133,49)
    else:
        block(c,16,15,27,29);c.ellipse(65,20,98,47);c.ellipse(69,24,94,43);c.roundRect(111,15,10,45,5,stroke=1,fill=0)
        for x,s in [(30,'1'),(81,'2'),(116,'3')]:label(c,s,x,65,8)

def mechanism_art(c,i):
    if i==1:
        poly(c,[(67,15),(80,36),(93,15)],True);poly(c,[(22,47),(128,26)]);circle(c,80,35,3);rect(c,104,31,16,15);arrow(c,31,69,31,51);ground(c,50,12,59)
    elif i==2:
        c.ellipse(32,10,64,70);circle(c,48,40,4);c.ellipse(102,19,125,61);line(c,48,40,114,40);line(c,49,45,114,45);arrow(c,78,61,94,61);label(c,'AXLE',83,25)
    elif i==3:
        ground(c,44,73,62);line(c,75,73,75,53);circle(c,75,45,18);circle(c,75,45,4);line(c,57,45,57,16);line(c,93,45,93,8);rect(c,45,4,24,12);arrow(c,107,44,107,18)
    elif i==4:
        poly(c,[(66,12),(77,42),(88,12)],True);line(c,25,46,127,46);pivot(c,77,46);line(c,36,46,36,23);rect(c,25,10,22,13);line(c,115,46,115,24);rect(c,106,14,18,10);arrow(c,115,53,115,68)
    elif i==5:
        poly(c,[(23,14),(124,14),(124,64)],True);circle(c,84,56,10);arrow(c,107,69,63,48);ground(c,20,11,111)
    elif i==6:
        poly(c,[(26,14),(115,14),(26,40)],True);rect(c,64,29,51,21);arrow(c,8,27,25,27);arrow(c,129,42,129,62);ground(c,20,11,105)
    elif i==7:
        rect(c,37,29,73,17);rect(c,27,23,10,29);rect(c,79,16,15,43)
        for x in range(39,106,6):line(c,x,30,x+5,45)
        arrow(c,73,67,101,67);label(c,'TRAVEL',86,73);c.arc(9,24,37,55,70,250)
    elif i==8:
        c.ellipse(48,7,94,45);pivot(c,71,19);line(c,71,45,71,73);rect(c,60,58,22,9);line(c,64,45,79,45);arrow(c,102,52,102,71);c.arc(35,5,103,55,170,90)
    elif i==9:
        circle(c,39,38,23);pivot(c,39,38);line(c,39,38,55,53);line(c,55,53,109,38);rect(c,101,29,21,18);pivot(c,55,53);pivot(c,110,38);line(c,87,25,136,25);line(c,87,51,136,51);arrow(c,101,64,128,64)
    elif i==10:
        pts=[(28,18),(48,58),(108,58),(88,18)]
        poly(c,pts,True)
        for x,y in pts:pivot(c,x,y)
        ground(c,20,12,78);arrow(c,52,71,97,71)
    elif i==11:
        gear(c,51,34,27,12);gear(c,98,44,23,10);c.arc(17,0,85,68,90,90);arrow(c,18,35,19,26);c.arc(68,14,128,74,0,85);arrow(c,98,74,89,72)
    elif i==12:
        circle(c,40,39,22);circle(c,111,39,15);pivot(c,40,39);pivot(c,111,39);line(c,40,61,111,54);line(c,40,17,111,24);arrow(c,69,63,89,61)
    elif i==13:
        pts=[]
        for k in range(12):
            for off,r in [(0,25),(.7,25),(.72,18)]:
                a=(k+off)*math.tau/12;pts.append((62+r*math.cos(a),32+r*math.sin(a)))
        poly(c,pts,True);pivot(c,62,32);poly(c,[(79,51),(110,64),(114,59),(83,47)],True);pivot(c,111,61);ground(c,102,73,23);line(c,111,73,111,65);c.arc(29,0,95,65,120,75)
    elif i==14:
        ground(c,21,13,108);rect(c,99,15,24,29);spring(c,26,31,99);line(c,25,15,25,49);arrow(c,110,59,63,59)
    elif i==15:
        poly(c,[(25,70),(47,43),(47,13)]);poly(c,[(121,70),(96,43),(96,13)]);line(c,47,16,66,16);line(c,79,16,96,16)
        for x,y in [(56,60),(77,60),(97,60),(66,43),(86,43),(72,25)]:circle(c,x,y,7)
        arrow(c,113,39,113,15)
    elif i==16:
        ground(c,39,73,72);pivot(c,75,67);line(c,75,67,103,18);circle(c,103,18,10);c.saveState();c.setDash(2,3);line(c,75,67,47,18);circle(c,47,18,10);c.restoreState();c.arc(35,2,113,44,195,145)
    elif i==17:
        c.ellipse(40,24,61,66);c.ellipse(83,24,104,66);line(c,50,66,94,66);line(c,50,24,94,24)
        for x in range(59,85,5):c.arc(x,25,x+10,64,90,180)
        poly(c,[(100,44),(119,44),(119,58),(132,58)]);line(c,65,24,65,7);rect(c,54,0,22,10);arrow(c,36,7,36,22)
    else:
        poly(c,[(23,20),(66,20),(69,25),(23,25)],True);poly(c,[(80,29),(108,65),(112,62),(84,24)],True)
        c.bezier(66,25,75,15,78,15,84,24);c.bezier(66,20,75,10,81,13,87,22);arrow(c,115,32,124,49);label(c,'FLEX',73,3)

def mission_art(c,i):
    if i==1:
        block(c,37,7,30,18);c.saveState();c.setDash(2,2);rect(c,37,54,30,18);c.restoreState();arrow(c,94,14,94,65)
    elif i==2:
        rect(c,17,6,34,32);rect(c,99,6,34,32);line(c,48,41,103,41);circle(c,73,51,8);arrow(c,55,68,100,68)
    elif i==3:
        envelope(c,23,27,38,26);arrow(c,68,40,111,40);flag(c,115,18,36)
    elif i==4:
        rect(c,29,13,80,51);poly(c,[(29,13),(43,26),(43,75),(29,64)],True);flag(c,56,24,30);arrow(c,118,47,135,47)
    elif i==5:
        circle(c,47,58,6);circle(c,77,58,10);circle(c,108,58,14);poly(c,[(20,34),(20,11),(69,11),(69,34)]);poly(c,[(83,34),(83,11),(133,11),(133,34)]);circle(c,43,22,6);circle(c,109,26,12);arrow(c,48,45,43,33);arrow(c,105,42,109,35)
    elif i==6:
        poly(c,[(49,75),(49,26),(92,26),(92,75)]);line(c,42,26,100,26)
        for y in [37,53,69]:circle(c,71,y,7)
        circle(c,71,7,7);arrow(c,111,44,111,11)
    elif i==7:
        book(c,52,24,42,32);poly(c,[(46,18),(46,62),(38,18)],True);poly(c,[(104,18),(104,62),(112,18)],True);ground(c,27,12,101)
    elif i==8:
        poly(c,[(75,72),(110,59),(107,29),(95,15),(75,5),(55,15),(43,29),(40,59)],True);c.ellipse(63,24,87,54);poly(c,[(20,61),(33,51),(25,44)]);arrow(c,14,70,31,55)
    elif i==9:
        rect(c,23,10,105,54)
        for x in [34,61,88]:poly(c,[(x,27),(x+11,49),(x+22,27),(x,27)])
        poly(c,[(117,65),(126,72),(130,67),(121,60),(117,59),(117,65)])
    elif i==10:
        c.ellipse(46,20,101,50);circle(c,101,55,15);circle(c,105,59,2);poly(c,[(116,58),(130,51),(115,49)],True);poly(c,[(51,41),(29,64),(35,36),(46,30)]);poly(c,[(70,35),(83,66),(92,39)],True);line(c,62,20,58,9);line(c,81,20,88,9);arrow(c,80,69,64,69)
    elif i==11:
        flag(c,52,13,57);ground(c,43,10,45)
        for x1,y1,x2,y2 in [(117,57,130,61),(112,71,122,80),(120,41,135,41)]:line(c,x1,y1,x2,y2)
    elif i==12:
        poly(c,[(55,27),(53,45),(60,57),(72,62),(83,57),(91,45),(89,27)],True);line(c,48,26,96,26);circle(c,72,20,5);circle(c,72,68,5)
        c.arc(30,18,62,67,100,155);c.arc(87,18,119,67,285,155)
    elif i==13:
        poly(c,[(62,9),(75,29),(88,9)],True);line(c,75,29,75,60);line(c,32,55,118,65);line(c,38,55,38,31);line(c,111,64,111,40);poly(c,[(22,31),(38,21),(54,31)],True);poly(c,[(95,40),(111,30),(127,40)],True);circle(c,38,39,8);circle(c,111,45,5)
    elif i==14:
        circle(c,45,43,14);line(c,9,51,25,51);line(c,4,42,24,42);line(c,10,33,25,33);arrow(c,66,43,89,43);circle(c,111,43,14);ground(c,17,23,119);label(c,'SLOW',113,8,7)
    elif i==15:
        circle(c,76,63,9);arrow(c,76,48,76,34);poly(c,[(38,44),(43,20),(105,20),(111,44)]);line(c,56,20,56,9);line(c,94,20,94,9);poly(c,[(43,20),(65,20),(65,14),(85,14),(85,20),(105,20)])
    elif i==16:
        poly(c,[(18,14),(35,62),(52,14),(69,62),(86,14)]);arrow(c,94,38,108,38);poly(c,[(119,14),(123,62),(127,14),(131,62),(135,14)])
    elif i==17:
        rect(c,18,17,28,25);circle(c,32,29,6);line(c,46,29,105,29);flag(c,108,15,45);arrow(c,57,48,95,48);label(c,'REMOTE',32,6);label(c,'ACTION',120,6)
    else:
        circle(c,74,15,8);poly(c,[(74,23),(74,39),(36,39),(36,56)]);poly(c,[(74,39),(112,39),(112,56)]);arrow(c,36,45,36,56);arrow(c,112,45,112,56);rect(c,24,58,24,15);circle(c,112,65,10)

def wrap(txt,font,size,width):
    lines=[];cur=''
    for word in txt.split():
        new=(cur+' '+word).strip()
        if pdfmetrics.stringWidth(new,font,size)>width and cur:lines.append(cur);cur=word
        else:cur=new
    if cur:lines.append(cur)
    return lines

def card(c,k,i,back=False,bleed=0):
    col=COLORS[k];c.saveState()
    clip=c.beginPath();clip.rect(-bleed,-bleed,180+2*bleed,252+2*bleed);c.clipPath(clip,stroke=0,fill=0)
    c.setFillColor(CREAM);c.rect(-bleed,-bleed,180+2*bleed,252+2*bleed,fill=1,stroke=0)
    if back:
        c.setFillColor(col);c.rect(-bleed,-bleed,180+2*bleed,252+2*bleed,fill=1,stroke=0)
        c.setStrokeColor(Color(1,1,1,alpha=.15));c.setLineWidth(.4)
        for x in range(-180,400,12):line(c,x,-12,x+280,268)
        c.setStrokeColor(CREAM);c.setLineWidth(.8);c.roundRect(8,8,164,236,9,stroke=1,fill=0);c.roundRect(12,12,156,228,7,stroke=1,fill=0)
        for rot in [0,180]:
            c.saveState();c.translate(90,126);c.rotate(rot)
            c.setFillColor(CREAM);c.setStrokeColor(CREAM);c.setLineWidth(1)
            symbol(c,k,-10,88,20);c.setFont('Bold',9);c.drawCentredString(0,76,NAMES[k]);c.setFont('Mono',5.6);c.drawCentredString(0,64,'18 CARDS / DRAW ONE')
            c.setFont('Title',12);c.drawCentredString(0,41,'CONTRAPTION');c.setFont('Title',18);c.drawCentredString(0,19,'SHUFFLE')
            line(c,-55,9,55,9);c.restoreState()
        c.setFillColor(CREAM);c.circle(90,126,8,stroke=0,fill=1);c.setStrokeColor(col);c.setLineWidth(1);symbol(c,k,85,121,10)
    else:
        title,body,cue=RAW[k][i-1]
        c.setStrokeColor(col);c.setLineWidth(1.1);c.roundRect(7,7,166,238,8,stroke=1,fill=0)
        c.setFillColor(col);c.roundRect(13,219,154,20,4,stroke=0,fill=1)
        c.setStrokeColor(CREAM);c.setLineWidth(.8);symbol(c,k,20,223,11)
        c.setFillColor(CREAM);c.setFont('Bold',7.2);c.drawString(37,226,NAMES[k]);c.setFont('Mono',7);c.drawRightString(159,226,f'{k}{i:02}')
        c.setFillColor(col);c.setFont('Mono',6.2);c.drawCentredString(90,205,PROMPTS[k])
        c.setFillColor(INK);ts=13.1;ls=wrap(title,'Title',ts,146)
        while len(ls)>2:ts-=.2;ls=wrap(title,'Title',ts,146)
        assert ts>=10
        c.setFont('Title',ts)
        for j,s in enumerate(ls):c.drawCentredString(90,184-j*16,s)
        c.saveState();c.translate(15,87);c.setStrokeColor(col);c.setFillColor(col);c.setLineWidth(1.25);c.setLineJoin(1);c.setLineCap(1)
        {'M':material_art,'K':mechanism_art,'G':mission_art}[k](c,i);c.restoreState()
        c.setStrokeColor(LINE);c.setLineWidth(.5);line(c,18,83,162,83)
        c.setFillColor(INK);bs=7.5;bodylines=wrap(body,'Body',bs,143)
        assert len(bodylines)<=5,(k,i,bodylines)
        c.setFont('Body',bs)
        for j,s in enumerate(bodylines):c.drawString(18,70-j*10.3,s)
        c.setFillColor(col);c.setFont('Mono',5.4);assert pdfmetrics.stringWidth(cue,'Mono',5.4)<=144;c.drawCentredString(90,15,cue)
    c.restoreState()

def metadata(c,title):c.setTitle(title);c.setAuthor('Michael B. Parks');c.setSubject('The Contraption Shuffle | Physical edition 1.1 | 54 maker challenge cards')
def add_boxes(path):
    r=PdfReader(path);w=PdfWriter();w.clone_document_from_reader(r)
    for p in w.pages:
        p.trimbox=RectangleObject([9,9,189,261]);p.bleedbox=RectangleObject([0,0,198,270])
    with open(path,'wb') as f:w.write(f)

def make_pdfs():
    for name,isback in [('Card-Fronts-Bleed.pdf',False),('Card-Backs-Bleed.pdf',True)]:
        p=PACK/name;c=canvas.Canvas(str(p),pagesize=(198,270),pageCompression=1);metadata(c,name)
        for k in RAW:
            for i in (range(1,2) if isback else range(1,19)):
                c.saveState();c.translate(9,9);card(c,k,i,isback,9);c.restoreState();c.showPage()
        c.save();add_boxes(p)
    faces = PdfReader(PACK / 'Card-Fronts-Bleed.pdf')
    backs = PdfReader(PACK / 'Card-Backs-Bleed.pdf')
    paired = PdfWriter()
    for index, face in enumerate(faces.pages):
        paired.add_page(backs.pages[index // 18])
        paired.add_page(face)
    paired.add_metadata({'/Title': 'The Contraption Shuffle - back first, one card per pair'})
    with (PACK / 'Cards-Back-Then-Face-Bleed.pdf').open('wb') as destination:
        paired.write(destination)
    p=OUT/'Contraption-Shuffle-Home-Print.pdf';c=canvas.Canvas(str(p),pagesize=(612,792),pageCompression=1);metadata(c,'The Contraption Shuffle - 54 cards, duplex home print')
    for k in RAW:
        for start in [1,10]:
            for back in [True,False]:
                for idx in range(9):
                    row,col=divmod(idx,3);x=36+col*180;y=522-row*252
                    c.saveState();c.translate(x,y);card(c,k,start+idx,back);c.restoreState()
                c.setStrokeColor(LINE);c.setLineWidth(.25)
                for x in [36,216,396,576]:line(c,x,18,x,774)
                for y in [18,270,522,774]:line(c,36,y,576,y)
                c.setFont('Mono',5.5);c.setFillColor(INK);c.drawCentredString(306,6,f'{NAMES[k]} {start:02}-{start+8:02} / '+('BACKS' if back else 'FRONTS')+' / 100% ACTUAL SIZE / LONG-EDGE DUPLEX')
                c.showPage()
    c.save()
    shutil.copy(p,PACK/p.name)

def para(c,s,x,y,width,size=10,leading=14,font='Body',color=INK):
    c.setFillColor(color);c.setFont(font,size)
    for t in wrap(s,font,size,width):c.drawString(x,y,t);y-=leading
    return y

def make_rules():
    p=OUT/'Contraption-Shuffle-Rules.pdf';c=canvas.Canvas(str(p),pagesize=(612,792));metadata(c,'The Contraption Shuffle - rules and printing guide')
    c.setFillColor(CREAM);c.rect(0,0,612,792,fill=1,stroke=0)
    c.setFillColor(INK);c.setFont('Mono',9);c.drawString(42,746,'M.B. PARKS / MAKER\'S EDITION / 1.1')
    c.setFont('Title',28);c.drawString(42,704,'The Contraption Shuffle')
    c.setFont('Body',13);c.drawString(42,680,'Three cards. One improbable invention.')
    for k,x in zip(RAW,[42,220,398]):
        c.setFillColor(COLORS[k]);c.roundRect(x,592,164,63,5,fill=1,stroke=0);c.setStrokeColor(CREAM);c.setLineWidth(1.2);symbol(c,k,x+13,611,21);c.setFillColor(CREAM);c.setFont('Bold',10);c.drawString(x+43,627,NAMES[k]);c.setFont('Body',8.5);c.drawString(x+43,611,'18 cards / draw one')
    y=563
    for title,txt in [
        ('01 / SEPARATE, SHUFFLE, DRAW','Shuffle the three piles separately and place them category-back up. Draw one green Materials card, one blue Mechanism card and one red Mission card. Turn them over to reveal your challenge.'),
        ('02 / READ YOUR CHALLENGE','Use [MATERIAL] to build something that uses [MECHANISM] to accomplish [MISSION]. With 18 choices in each pile, there are 5,832 possible draws.'),
        ('03 / MAKE IT WORK','The material must be a main ingredient. The mechanism must do useful work. Demonstrate the mission. Small working models and strange interpretations count.'),
        ('04 / MAKE IT YOURS','Use supporting supplies, glue, tape, string and ordinary fasteners as needed. Stuck? Keep two cards and redraw the third. Compare different builds from the same draw.')]:
        y=para(c,title,42,y,528,10,14,'Bold');y-=3;y=para(c,txt,42,y,528,9.5,13);y-=16
    c.setStrokeColor(LINE);line(c,42,y+3,570,y+3);y-=19
    y=para(c,'PRINT, CUT, PLAY',42,y,528,10,14,'Bold');y-=3
    for s in [
        'Print the card PDF on US Letter at 100% / Actual size, double-sided with a long-edge flip. Each odd page shows the category backs. The next even page shows the nine challenge faces.',
        'Print pages 1-2 first and check alignment and size. Each cut card must measure 2.5 x 3.5 inches. Cut on the fine grid lines; round corners if desired. Nine cards fit each sheet.',
        'If your printer cannot duplex cardstock, print fronts and backs separately and mount them together. Use stock your printer supports.',
        'Print shop: use the bleed PDFs or 300 dpi PNGs in the print pack. Trim is 2.5 x 3.5 inches, with 0.125-inch bleed on every side. Confirm the shop\'s own template before ordering.'
    ]:y=para(c,s,42,y,528,8.5,12);y-=9
    assert y>42,y
    c.setFont('Mono',7);c.setFillColor(INK);c.drawString(42,28,'michaelbparks.com');c.drawRightString(570,28,'SAME CARDS. DIFFERENT CONTRAPTIONS.')
    c.showPage();c.save();shutil.copy(p,PACK/p.name)

def export_assets():
    imgs=PACK/'300dpi';imgs.mkdir(exist_ok=True)
    for filename,prefix in [('Card-Fronts-Bleed.pdf','front'),('Card-Backs-Bleed.pdf','back')]:
        doc=fitz.open(PACK/filename)
        for n,p in enumerate(doc):
            k=list(RAW)[n//18] if prefix=='front' else list(RAW)[n]
            name=f'{k}{n%18+1:02}' if prefix=='front' else NAMES[k].lower()
            pix=p.get_pixmap(matrix=fitz.Matrix(300/72,300/72),alpha=False)
            pix.set_dpi(300,300)
            assert (pix.width,pix.height)==(825,1125)
            pix.save(imgs/f'{prefix}-{name}.png')
    data=[]
    for k in RAW:
        for i,(title,body,cue) in enumerate(RAW[k],1):data.append({'id':f'{k}{i:02}','type':NAMES[k],'title':title,'instruction':body,'cue':cue,'back_file':f'back-{NAMES[k].lower()}.png'})
    (PACK/'Card-Manifest.json').write_text(json.dumps(data,indent=2))
    with open(PACK/'Card-Manifest.csv','w') as f:
        w=csv.DictWriter(f,fieldnames=list(data[0]));w.writeheader();w.writerows(data)
    (PACK/'README.txt').write_text('''THE CONTRAPTION SHUFFLE - PHYSICAL EDITION 1.1
54 challenge cards: 18 Materials (green / stacked sheets), 18 Mechanism
(blue / gear), 18 Mission (red / flag). No jokers. Rules are a separate sheet.

HOME PRINT
Contraption-Shuffle-Home-Print.pdf: 12 US Letter pages; 9 cards per page.
Print at 100% / Actual size, double-sided, flip on LONG edge.
Each odd page shows the category backs. The next even page shows the matching challenge faces.
Test pages 1-2 for registration before printing the whole set.
Cards trim to 2.5 x 3.5 inches. Cut on fine grid lines.
Printer registration varies. Separate fronts/backs can also be mounted together.
Each sheet contains only one category, so backs match every slot on that sheet.

PRINT SHOP FILES
Cards-Back-Then-Face-Bleed.pdf: 108 pages, one back followed by its matching
face for each of the 54 cards. Use this for a paired artwork workflow.
For printers with separate front and back upload fields, use these files:
Card-Fronts-Bleed.pdf: 54 pages, M01-M18, K01-K18, G01-G18.
Card-Backs-Bleed.pdf: 3 pages, Materials, Mechanism, Mission, in that order.
Repeat each category back 18 times, behind its matching fronts.
Trim size: 2.5 x 3.5 inches (180 x 252 pt).
Bleed: 0.125 inch on every side (9 pt).
Media/Bleed size: 2.75 x 3.75 inches (198 x 270 pt).
PDF TrimBox: [9, 9, 189, 261]. Fonts are embedded; illustrations are vectors.
300dpi/: 54 front PNGs + 3 category back PNGs, 825 x 1125 pixels each.
Card-Manifest.csv / .json: exact front-to-back mapping and card text.
Files use RGB color. Have the printer confirm its template, color workflow,
corner radius, bleed, stock and proof before production. These are general
artwork files, not a dieline or a vendor-specific manufacturing template.

CONTENTS AND RULES
Contraption-Shuffle-Rules.pdf is a separate one-page rules and print guide.
Draw one card per category. The material is a main ingredient, not the only
permitted supply. Mechanism must help achieve the mission. Models count.
Keep two cards and redraw one when a combination does not inspire a build.

Edition-specific card IDs are stable and independent of any website deck IDs.
Source/build_deck.py contains editable content and vector artwork.
Made for Michael B. Parks / michaelbparks.com.
''')
    src=PACK/'Source';src.mkdir(exist_ok=True);shutil.copy(__file__,src/'build_deck.py')

def preview():
    # Flat artwork preview, full-size faces and matching backs.
    p=QA/'Preview.pdf';c=canvas.Canvas(str(p),pagesize=(648,660));c.setFillColor(HexColor('#E4DDCF'));c.rect(0,0,648,660,fill=1,stroke=0)
    c.setFillColor(INK);c.setFont('Title',22);c.drawString(30,625,'The Contraption Shuffle');c.setFont('Body',10);c.drawString(30,605,'54 cards. Three decks. 5,832 possible challenges.')
    for k,x in zip(RAW,[30,234,438]):
        for y,back in [(329,True),(49,False)]:
            c.saveState();c.translate(x,y);card(c,k,4,back);c.restoreState()
    c.setFont('Mono',6.8);c.drawString(30,588,'01 / DRAW ONE FROM EACH PILE');c.drawString(30,310,'02 / TURN THE CARDS OVER TO REVEAL YOUR CHALLENGE');c.setFont('Mono',7);c.drawString(30,20,'GREEN / MATERIALS     BLUE / MECHANISM     RED / MISSION');c.save()
    doc=fitz.open(p);doc[0].get_pixmap(matrix=fitz.Matrix(2,2),alpha=False).save(OUT/'Contraption-Shuffle-Preview.png')
    # All 54 fronts at review scale.
    doc=fitz.open(PACK/'Card-Fronts-Bleed.pdf')
    for deck,k in enumerate(RAW):
        board=Image.new('RGB',(1188,810),'#E4DDCF')
        for j in range(18):
            pix=doc[deck*18+j].get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
            im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples);board.paste(im,((j%6)*198,(j//6)*270))
        board.save(QA/f'Contact-{k}.png')
    for name in ['Contraption-Shuffle-Home-Print.pdf','Contraption-Shuffle-Rules.pdf']:
        doc=fitz.open(OUT/name)
        for j in range(min(2,len(doc))):doc[j].get_pixmap(matrix=fitz.Matrix(1.3,1.3),alpha=False).save(QA/f'{Path(name).stem}-{j+1}.png')

def validate():
    assert all(len(v)==18 for v in RAW.values())
    doc=fitz.open(PACK/'Card-Fronts-Bleed.pdf');assert len(doc)==54
    for p,(k,i) in zip(doc,[(k,i) for k in RAW for i in range(1,19)]):
        t=p.get_text();assert f'{k}{i:02}' in t
        assert len(t)>120
        for b in p.get_text('dict')['blocks']:
            for line_ in b.get('lines',[]):
                for s in line_['spans']:
                    x0,y0,x1,y1=s['bbox'];assert x0>=18 and x1<=180 and y0>=18 and y1<=252,(k,i,s)
    assert len(PdfReader(PACK/'Card-Backs-Bleed.pdf').pages)==3
    assert len(PdfReader(OUT/'Contraption-Shuffle-Home-Print.pdf').pages)==12
    assert len(PdfReader(OUT/'Contraption-Shuffle-Rules.pdf').pages)==1
    print('Validated: 54 unique card fronts, 3 backs, 12 duplex pages, 1 rules page, 57 print PNGs.')

if __name__=='__main__':
    make_pdfs();make_rules();export_assets();preview();validate()
    print('Outputs:',OUT)
