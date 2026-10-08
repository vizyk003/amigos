"""Generate extra Amigos underline strokes in the brandbook's brush style:
a filled stroke that swells in the middle and tapers at both ends, with a
couple of dry-brush streaks cut out of it. Short strokes are 320 x 100
(like hullám / lendület / ugrálás), long ones 1000 x 140 (like kunkor).

    python3 tools/amigos-underlines.py assets/underlines /tmp/ul-svg

needs rsvg-convert. Add a shape by appending to SHAPES; brand.css then
needs one .am-underline--<shape>-<colour> rule per colour (and the long
shapes their width/aspect-ratio override)."""
import math, os, subprocess, sys

COLORS = {'green': '#00A649', 'purple': '#9C3268', 'white': '#FFFFFF', 'yellow': '#F6B700'}

def bez(p0, p1, p2, p3, n=60):
    out = []
    for i in range(n + 1):
        t = i / n; u = 1 - t
        out.append((u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0],
                    u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1]))
    return out

def chain(*segs):
    out = []
    for s in segs:
        out += s if not out else s[1:]
    return out

def brush(pts, wmax, taper=(0.12, 0.18), wmin=0.25):
    """Outline polygon of a stroke along pts, width swelling to wmax."""
    L = [0.0]
    for a, b in zip(pts, pts[1:]):
        L.append(L[-1] + math.dist(a, b))
    tot = L[-1]
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        a = pts[max(i - 1, 0)]; b = pts[min(i + 1, len(pts) - 1)]
        dx, dy = b[0] - a[0], b[1] - a[1]; d = math.hypot(dx, dy) or 1
        nx, ny = -dy / d, dx / d
        t = L[i] / tot
        k = 1.0
        if t < taper[0]: k = wmin + (1 - wmin) * math.sin(t / taper[0] * math.pi / 2)
        elif t > 1 - taper[1]: k = wmin + (1 - wmin) * math.sin((1 - t) / taper[1] * math.pi / 2)
        w = wmax * k * (0.92 + 0.08 * math.sin(t * 9.0)) / 2
        left.append((x + nx * w, y + ny * w)); right.append((x - nx * w, y - ny * w))
    return left + right[::-1]

def streaks(pts, wmax, at=(0.55, 0.8)):
    """Two thin dry-brush scratches along the top half of the stroke."""
    out = []
    n = len(pts)
    for off, (s, e) in ((-0.18, at), (0.05, (at[0] + 0.05, at[1] - 0.04))):
        seg = pts[int(n * s):int(n * e)]
        line = []
        for i, (x, y) in enumerate(seg):
            a = seg[max(i - 1, 0)]; b = seg[min(i + 1, len(seg) - 1)]
            dx, dy = b[0] - a[0], b[1] - a[1]; d = math.hypot(dx, dy) or 1
            line.append((x - dy / d * wmax * off, y + dx / d * wmax * off))
        out.append(line)
    return out

def d_of(pts, close=False):
    return 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + (' Z' if close else '')

SHAPES = {}

# cikcakk — three sharp-ish peaks (short)
SHAPES['cikcakk'] = ((320, 100), 15, [chain(
    bez((12, 70), (30, 60), (40, 40), (52, 30), 20), bez((52, 30), (70, 55), (85, 70), (100, 72), 20),
    bez((100, 72), (120, 55), (135, 35), (150, 28), 20), bez((150, 28), (170, 52), (185, 68), (202, 70), 20),
    bez((202, 70), (222, 52), (238, 36), (252, 30), 20), bez((252, 30), (272, 50), (292, 62), (308, 64), 20))])

# dupla — two stacked swooshes, the lower one shorter (short)
SHAPES['dupla'] = ((320, 100), 13, [
    bez((14, 42), (90, 58), (200, 52), (306, 26)),
    bez((40, 76), (110, 86), (200, 82), (270, 62))])

# rugo — a little coil spring (short)
def coil():
    pts = []
    for i in range(241):
        t = i / 240
        a = t * 3.5 * 2 * math.pi
        pts.append((30 + t * 262 + 26 * math.sin(a), 56 - 26 * math.cos(a) * (0.7 + 0.3 * math.sin(t * math.pi))))
    return pts
SHAPES['rugo'] = ((320, 100), 8, [coil()])

# hurok — a long line with two loops along it (long)
def loop(cx, cy, r, n=50):
    return [(cx + r * math.sin(2 * math.pi * i / n), cy - r + r * math.cos(2 * math.pi * i / n))
            for i in range(n + 1)]
SHAPES['hurok'] = ((1000, 140), 12, [chain(
    bez((20, 118), (150, 112), (280, 108), (360, 106), 40), loop(360, 106, 44, 70),
    bez((360, 106), (480, 104), (600, 108), (680, 108), 40), loop(680, 108, 44, 70),
    bez((680, 108), (790, 108), (900, 112), (982, 106), 40))])

# szaggatott — four brushy dashes with a tick at the end (long)
SHAPES['szaggatott'] = ((1000, 140), 15, [
    bez((24, 100), (90, 96), (150, 94), (210, 94)), bez((262, 92), (330, 90), (390, 90), (450, 90)),
    bez((502, 90), (570, 90), (630, 92), (690, 94)), bez((742, 96), (800, 98), (850, 100), (900, 96)),
    bez((930, 84), (950, 70), (960, 56), (972, 42))])

def svg(size, wmax, strokes, col):
    w, h = size
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">',
           '<defs><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="%d" height="%d">' % (w, h),
           f'<rect width="{w}" height="{h}" fill="#fff"/>']
    for pts in strokes:
        if len(pts) > 30:
            for st in streaks(pts, wmax):
                out.append(f'<path d="{d_of(st)}" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round"/>')
    out.append('</mask></defs><g mask="url(#m)">')
    for pts in strokes:
        out.append(f'<path d="{d_of(brush(pts, wmax), True)}" fill="{col}"/>')
    out.append('</g></svg>')
    return '\n'.join(out)

if __name__ == '__main__':
    outdir, tmp = sys.argv[1], sys.argv[2]
    os.makedirs(tmp, exist_ok=True)
    for name, (size, wmax, strokes) in SHAPES.items():
        for cname, col in COLORS.items():
            sv = os.path.join(tmp, f'{name}-{cname}.svg')
            open(sv, 'w').write(svg(size, wmax, strokes, col))
            subprocess.run(['rsvg-convert', '-o', os.path.join(outdir, f'amigos-alahuzas-{name}-{cname}.png'), sv], check=True)
    print('made', len(SHAPES), 'shapes x', len(COLORS))
