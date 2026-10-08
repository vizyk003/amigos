"""Generate new Amigos hand-drawn illustrations in the existing style:
one marker line (~13px on a 400px canvas, round caps/joins), a little hand
wobble, open shapes, small sparkle/dot accents. One SVG per motif, rendered
to PNG in the four set colours with rsvg-convert."""
import math, random, subprocess, os, sys

SW = 13            # stroke width on the 400px canvas
COLORS = {'green': '#00A74A', 'white': '#FFFFFF', 'yellow': '#F2B400', 'ink': '#171C12'}

def wobble(pts, amp=2.2, seed=0):
    """Offset a dense polyline along its normal by smooth low-frequency noise."""
    rnd = random.Random(seed)
    waves = [(rnd.uniform(0.6, 1.6), rnd.uniform(0, 6.28), rnd.uniform(0.5, 1.0)) for _ in range(3)]
    n = len(pts); out = []
    L = [0.0]
    for i in range(1, n):
        L.append(L[-1] + math.dist(pts[i - 1], pts[i]))
    tot = L[-1] or 1
    for i, (x, y) in enumerate(pts):
        a = pts[max(i - 1, 0)]; b = pts[min(i + 1, n - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]; d = math.hypot(dx, dy) or 1
        nx, ny = -dy / d, dx / d
        t = L[i] / tot
        o = amp * sum(w * math.sin(2 * math.pi * f * t * max(1, tot / 160) + p) for f, p, w in waves) / 1.6
        out.append((x + nx * o, y + ny * o))
    return out

def sample_bez(p0, p1, p2, p3, n=40):
    pts = []
    for i in range(n + 1):
        t = i / n; u = 1 - t
        pts.append((u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0],
                    u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1]))
    return pts

def line(p0, p1, n=24):
    return [(p0[0] + (p1[0]-p0[0])*i/n, p0[1] + (p1[1]-p0[1])*i/n) for i in range(n + 1)]

def arc(cx, cy, rx, ry, a0, a1, n=80, rot=0):
    pts = []
    for i in range(n + 1):
        a = math.radians(a0 + (a1 - a0) * i / n)
        x, y = rx * math.cos(a), ry * math.sin(a)
        r = math.radians(rot)
        pts.append((cx + x*math.cos(r) - y*math.sin(r), cy + x*math.sin(r) + y*math.cos(r)))
    return pts

def poly(*pts, n=18):
    out = []
    for a, b in zip(pts, pts[1:]):
        seg = line(a, b, n); out += seg if not out else seg[1:]
    return out

def path_d(pts):
    return 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts)

class D:
    def __init__(self, w=400, h=400):
        self.w, self.h, self.items, self.k = w, h, [], 0
    def s(self, pts, amp=2.2, sw=SW):
        self.k += 1; self.items.append(('s', wobble(pts, amp, self.k * 7 + 3), sw)); return self
    def dot(self, x, y, r):
        self.items.append(('c', (x, y, r), 0)); return self
    def sparkle(self, x, y, r):
        """Four-point filled star, like the ones in csillanás / nyíl."""
        k = 0.28
        pts = []
        for i in range(8):
            a = math.radians(-90 + i * 45); rr = r if i % 2 == 0 else r * k
            pts.append((x + rr*math.cos(a), y + rr*math.sin(a)))
        self.items.append(('f', pts, 0)); return self
    def svg(self, col):
        out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">']
        for kind, data, sw in self.items:
            if kind == 's':
                out.append(f'<path d="{path_d(data)}" fill="none" stroke="{col}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>')
            elif kind == 'c':
                x, y, r = data; out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{col}"/>')
            else:
                out.append(f'<path d="{path_d(data)} Z" fill="{col}" stroke="{col}" stroke-width="3" stroke-linejoin="round"/>')
        out.append('</svg>'); return '\n'.join(out)

M = {}

# csillag — a five-point star drawn in one go, ends overlapping a touch
d = D()
pts = []
for i in range(11):
    a = math.radians(-90 + i * 36); r = 160 if i % 2 == 0 else 68
    pts.append((200 + r*math.cos(a), 212 + r*math.sin(a)))
pts.append((pts[1][0] * 0.3 + pts[0][0] * 0.7, pts[1][1] * 0.3 + pts[0][1] * 0.7))
d.s(poly(*pts)).sparkle(340, 70, 18).dot(66, 96, 7)
M['csillag'] = d

# felhő — puffy outline on a flat base
d = D(420, 300)
d.s(arc(130, 175, 62, 58, 100, 265) + arc(205, 120, 80, 76, 195, 335) + arc(298, 160, 64, 60, 245, 395)[:] )
d.s(sample_bez((352, 196), (336, 226), (220, 236), (122, 232)))
M['felho'] = d

# virág — five loop petals around a centre, a stem and a leaf
d = D(360, 440)
for i in range(5):
    a = -90 + i * 72
    d.s(arc(180 + 62*math.cos(math.radians(a)), 150 + 62*math.sin(math.radians(a)), 50, 30, 0, 350, rot=a))
d.dot(180, 150, 22)
d.s(sample_bez((180, 240), (176, 300), (190, 360), (182, 420)))
d.s(sample_bez((184, 350), (220, 320), (270, 318), (290, 330)) + sample_bez((290, 330), (262, 360), (220, 362), (186, 352))[1:])
M['virag'] = d

# labda — a ball with two seams
d = D()
d.s(arc(200, 205, 150, 148, -80, 275))
d.s(sample_bez((70, 150), (150, 200), (250, 200), (338, 150)))
d.s(sample_bez((160, 60), (120, 160), (130, 270), (182, 352)))
d.sparkle(352, 60, 16)
M['labda'] = d

# papírrepülő — the plane and a looping dashed flight path
d = D(440, 320)
d.s(poly((250, 150), (420, 60), (330, 220), (300, 170), (250, 150)))
d.s(poly((300, 170), (420, 60)))
d.s(poly((300, 170), (296, 222), (330, 220)))
trail = sample_bez((236, 162), (170, 200), (120, 300), (70, 240), 80) + sample_bez((70, 240), (30, 190), (90, 150), (130, 190), 60)[1:]
for k in range(0, len(trail) - 8, 16):
    d.s(trail[k:k + 9], amp=0.8)
M['papirrepulo'] = d

# ceruza — a tilted pencil with a scribble
d = D(440, 390)
d.s(poly((70, 280), (300, 50), (360, 110), (130, 340), (70, 280)), amp=0.7)
d.s(poly((70, 280), (56, 354), (130, 340)), amp=0.4)   # sharpened tip
d.s(line((63, 318), (93, 347)), amp=0.3, sw=10)        # where the wood meets the lead
d.s(poly((260, 90), (320, 150)), amp=1.2)
d.s(sample_bez((176, 334), (240, 300), (268, 342), (330, 306)) + sample_bez((330, 306), (380, 278), (392, 322), (420, 294))[1:])
M['ceruza'] = d

# mosoly — a smiley with cheek ticks
d = D()
d.s(arc(200, 200, 160, 156, -95, 262), amp=1.2)
d.dot(145, 160, 16).dot(255, 160, 16)
d.s(arc(200, 196, 92, 84, 22, 158), amp=0.5)
M['mosoly'] = d

# szivárvány — three arcs and a little cloud foot
d = D(440, 280)
for r in (180, 132, 84):
    d.s(arc(220, 250, r, r * 0.95, 185, 355))
d.sparkle(400, 50, 16)
M['szivarvany'] = d

# lufi — a balloon with a knot and a wavy string
d = D(300, 460)
d.s(arc(150, 150, 108, 128, -90, 268))
d.s(poly((140, 278), (150, 296), (162, 278), (140, 278)), amp=0.8)
d.s(sample_bez((150, 300), (110, 350), (190, 390), (140, 450)))
d.s(arc(150, 150, 64, 84, 200, 240), amp=0.6, sw=10)
M['lufi'] = d

# hangjegy — a pair of quavers and a single one
d = D(420, 360)
d.s(arc(110, 290, 38, 28, 0, 360, rot=-20)); d.s(arc(270, 250, 38, 28, 0, 360, rot=-20))
d.s(line((146, 280), (150, 70))); d.s(line((306, 240), (310, 40)))
d.s(sample_bez((150, 70), (200, 52), (260, 44), (310, 40)))
d.s(sample_bez((150, 110), (200, 92), (260, 84), (310, 80)))
d.sparkle(370, 160, 16).dot(60, 120, 8)
M['hangjegy'] = d

# könyv — an open book with lines on the pages
d = D(440, 320)
d.s(sample_bez((220, 80), (160, 40), (80, 50), (30, 70)) + poly((30, 70), (30, 260))[1:] + sample_bez((30, 260), (90, 240), (170, 250), (220, 290))[1:])
d.s(sample_bez((220, 80), (280, 40), (360, 50), (410, 70)) + poly((410, 70), (410, 260))[1:] + sample_bez((410, 260), (350, 240), (270, 250), (220, 290))[1:])
d.s(line((220, 80), (220, 290)))
for y in (120, 160, 200):
    d.s(line((70, y), (180, y + 6)), amp=0.8, sw=9); d.s(line((260, y + 6), (370, y)), amp=0.8, sw=9)
M['konyv'] = d

# puzzle — one piece with two knobs and two sockets
d = D()
P = []
P += line((80, 80), (165, 80))[:-1]
P += arc(200, 70, 34, 34, 160, 380)[:-1]
P += line((235, 80), (320, 80))[:-1]
P += line((320, 80), (320, 165))[:-1]
P += arc(330, 200, 34, 34, 250, 470)[:-1]
P += line((320, 235), (320, 320))[:-1]
P += line((320, 320), (235, 320))[:-1]
P += arc(200, 310, 34, 34, 20, -200)[:-1]
P += line((165, 320), (80, 320))[:-1]
P += line((80, 320), (80, 235))[:-1]
P += arc(90, 200, 34, 34, 110, -110)[:-1]
P += line((80, 165), (80, 80))
d.s(P)
M['puzzle'] = d

# kocka — a die in slight perspective with pips
d = D()
d.s(poly((80, 140), (230, 110), (330, 170), (180, 205), (80, 140)), amp=1.6)
d.s(poly((80, 140), (82, 300), (180, 360), (180, 205)), amp=1.6)
d.s(poly((180, 360), (322, 320), (330, 170)), amp=1.6)
d.dot(205, 158, 12)
d.dot(120, 210, 11).dot(140, 290, 11)
d.dot(220, 260, 11).dot(255, 250, 11).dot(290, 240, 11)
M['kocka'] = d

# konfetti — dots, ticks and tiny squiggles to scatter around a headline
d = D(440, 300)
d.dot(40, 60, 9).dot(390, 250, 10).dot(220, 40, 7).dot(120, 240, 8)
d.s(line((90, 120), (120, 96)), amp=0.6); d.s(line((300, 70), (330, 94)), amp=0.6)
d.s(line((350, 150), (390, 150)), amp=0.6)
d.s(sample_bez((150, 160), (170, 130), (190, 190), (210, 160)) + sample_bez((210, 160), (230, 130), (250, 190), (270, 160))[1:], amp=0.8)
d.s(arc(60, 190, 18, 18, 0, 300), amp=0.4, sw=10)
d.sparkle(260, 250, 18).sparkle(400, 40, 14)
M['konfetti'] = d

if __name__ == '__main__':
    outdir = sys.argv[1]; tmp = sys.argv[2]
    os.makedirs(tmp, exist_ok=True)
    for name, dr in M.items():
        for cname, col in COLORS.items():
            sv = os.path.join(tmp, f'{name}-{cname}.svg')
            open(sv, 'w').write(dr.svg(col))
            subprocess.run(['rsvg-convert', '-o', os.path.join(outdir, f'amigos-ill-{name}-{cname}.png'), sv], check=True)
    print('made', len(M), 'motifs x', len(COLORS))
