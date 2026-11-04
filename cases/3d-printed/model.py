"""Contraption Shuffle case, revision 1.0. Run with Python and CadQuery 2.7.
All dimensions are millimetres. STEP files use closed-assembly coordinates.
STLs are oriented for FDM printing. Run from any directory.
"""
from pathlib import Path
import math
import cadquery as cq

CARD_LENGTH = 88.9        # horizontal dimension, cards rest on one long edge
CARD_HEIGHT = 63.5        # vertical dimension
PACK_THICKNESS = 9.0      # measured thickness of your thickest 18-card pile
PACK_PLAY = 1.8           # spare space for easy withdrawal
END_PLAY = 1.0            # clearance at each short end
LID_PLAY = 0.30           # sliding clearance per side
HEADROOM = 1.8
FLOOR = 2.4
ROOF = 2.4
NECK_WALL = 2.0
LID_WALL = 2.0
DIVIDER = 1.6
ENGAGEMENT = 9.6
EXPOSED_CARD = 24.7
NECK_RADIUS = 3.3
BAND_WIDTH = 6.6
BAND_DEPTH = 0.5

INNER_X = CARD_LENGTH + 2 * END_PLAY
BAY = PACK_THICKNESS + PACK_PLAY
INNER_Y = 3 * BAY + 2 * DIVIDER
NECK_X = INNER_X + 2 * NECK_WALL
NECK_Y = INNER_Y + 2 * NECK_WALL
RIM = LID_WALL + LID_PLAY
OUT_X = NECK_X + 2 * RIM
OUT_Y = NECK_Y + 2 * RIM
OUT_RADIUS = NECK_RADIUS + RIM
CARD_TOP = FLOOR + CARD_HEIGHT
BASE_TOP = CARD_TOP - EXPOSED_CARD
SHOULDER = BASE_TOP - ENGAGEMENT
TOTAL_H = CARD_TOP + HEADROOM + ROOF
BAY_CENTERS = [i * (BAY + DIVIDER) for i in (-1, 0, 1)]
FONT = 'DejaVu Sans'

def rounded_box(width, depth, height, radius, bottom=0):
    return (cq.Workplane('XY').box(width, depth, height, centered=(True, True, False))
            .edges('|Z').fillet(radius).translate((0, 0, bottom)))

def block(width, depth, height, center):
    return cq.Workplane('XY').box(width, depth, height).translate(center)

def remove_band_tracks(solid, z):
    for side in (-1, 1):
        x = side * (OUT_X / 2 - 9)
        solid = solid.cut(block(BAND_WIDTH, OUT_Y + 2, BAND_DEPTH + .02, (x, 0, z)))
    return solid

def lettering(plane, text, height, depth):
    return cq.Workplane(plane).text(text, height, depth, font=FONT, kind='bold',
                                    halign='center', valign='center', combine=False)

def side_marks(base):
    # Three recessed symbols along the right-hand end, aligned with the bays.
    for index, y in enumerate(BAY_CENTERS):
        plane = cq.Plane(origin=(OUT_X/2+.02, y, SHOULDER-7.0), xDir=(0,1,0), normal=(1,0,0))
        if index == 0:
            for offset in (-2.0, 0, 2.0):
                p = [(-4,offset), (0,offset-1.7), (4,offset), (4,offset+.8),
                     (0,offset-.9), (-4,offset+.8)]
                base = base.cut(cq.Workplane(plane).polyline(p).close().extrude(-.52))
        elif index == 1:
            points=[]
            for tooth in range(8):
                for fraction,r in [(0,3.2),(.15,4.1),(.60,4.1),(.75,3.2)]:
                    angle=(tooth+fraction)*math.tau/8
                    points.append((r*math.cos(angle),r*math.sin(angle)))
            shape=cq.Workplane(plane).polyline(points).close().extrude(-.52)
            hub=cq.Workplane(plane).circle(1.45).extrude(-.55)
            base=base.cut(shape.cut(hub))
        else:
            p=[(-2.8,-4),(-1.8,-4),(-1.8,-.3),(3.5,-.3),(2,1.7),(3.5,3.6),(-2.8,3.6)]
            base=base.cut(cq.Workplane(plane).polyline(p).close().extrude(-.52))
    return base

def make_base():
    lower = rounded_box(OUT_X, OUT_Y, SHOULDER, OUT_RADIUS)
    lower = lower.faces('<Z').edges().chamfer(.35)
    neck = rounded_box(NECK_X, NECK_Y, ENGAGEMENT+.1, NECK_RADIUS, SHOULDER-.1)
    neck = neck.faces('>Z').edges().chamfer(.65)
    base = lower.union(neck)
    for y in BAY_CENTERS:
        bay = rounded_box(INNER_X, BAY, BASE_TOP-FLOOR+1, .45, FLOOR)
        base = base.cut(bay.translate((0,y,0)))
    base = side_marks(base)
    front = cq.Plane(origin=(0,-OUT_Y/2-.02,15),xDir=(1,0,0),normal=(0,-1,0))
    base = base.cut(lettering(front,'M.B. PARKS',5.7,-.50))
    base = remove_band_tracks(base, BAND_DEPTH/2-.01)
    return base.clean()

def make_lid():
    cap = rounded_box(OUT_X, OUT_Y, TOTAL_H-SHOULDER, OUT_RADIUS, SHOULDER)
    cap = cap.faces('>Z').edges().chamfer(.45)
    cavity = rounded_box(NECK_X+2*LID_PLAY, NECK_Y+2*LID_PLAY,
                         TOTAL_H-ROOF-SHOULDER+1, NECK_RADIUS+LID_PLAY, SHOULDER-1)
    cap = cap.cut(cavity)
    top = cq.Plane(origin=(0,0,TOTAL_H+.02), xDir=(1,0,0), normal=(0,0,1))
    for word, size, y in [('CONTRAPTION',6.5,6.4),('SHUFFLE',8.2,-4.0)]:
        plane=cq.Plane(origin=(0,y,TOTAL_H+.02),xDir=top.xDir,normal=top.zDir)
        cap=cap.cut(lettering(plane,word,size,-.50))
    cap = remove_band_tracks(cap, TOTAL_H-BAND_DEPTH/2+.01)
    return cap.clean()

def make_print_lid(lid):
    return lid.rotate((0,0,0),(1,0,0),180).translate((0,0,TOTAL_H))

def export():
    out=Path(__file__).resolve().parent
    base,lid=make_base(),make_lid()
    assert base.val().isValid() and lid.val().isValid()
    for name,part,print_part in [('Base',base,base),('Lid',lid,make_print_lid(lid))]:
        cq.exporters.export(part,str(out/(name+'.step')))
        cq.exporters.export(print_part,str(out/(name+'.stl')),tolerance=.04,angularTolerance=.09)
    print('Finished closed dimensions (mm):',OUT_X,OUT_Y,TOTAL_H)
    print('Each well, length x thickness (mm):',INNER_X,BAY)

if __name__=='__main__':
    export()
