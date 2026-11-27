// Builds the compact geometry string embedded in WhMap.dc.html.
// Input: us-atlas states/counties (quantized TopoJSON) and the repo's cd119 TopoJSON.
// Output: geo.json { s, d, c } each { a: arcs string, r: rings string, ids: [...], names: [...] }
const fs = require('fs');
const [,, statesPath, countiesPath, districtsPath, outPath, worldPath] = process.argv;

const FIPS = { '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT','10':'DE','11':'DC','12':'FL','13':'GA','15':'HI','16':'ID','17':'IL','18':'IN','19':'IA','20':'KS','21':'KY','22':'LA','23':'ME','24':'MD','25':'MA','26':'MI','27':'MN','28':'MS','29':'MO','30':'MT','31':'NE','32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY','37':'NC','38':'ND','39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC','46':'SD','47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV','55':'WI','56':'WY' };

const Q = 0.002; // output grid, degrees
const A64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function decodeArcs(topo) {
  const t = topo.transform;
  return topo.arcs.map((arc) => {
    let x = 0, y = 0;
    return arc.map((p) => {
      if (t) { x += p[0]; y += p[1]; return [x * t.scale[0] + t.translate[0], y * t.scale[1] + t.translate[1]]; }
      return [p[0], p[1]];
    });
  });
}

// Douglas-Peucker on lon/lat with lon scaled by cos(lat)
function simplify(pts, tol) {
  if (pts.length <= 2) return pts;
  const k = Math.cos((pts[0][1] * Math.PI) / 180);
  const keep = new Uint8Array(pts.length); keep[0] = 1; keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const ax = pts[a][0] * k, ay = pts[a][1], bx = pts[b][0] * k, by = pts[b][1];
    const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy;
    let best = -1, bi = -1;
    for (let i = a + 1; i < b; i++) {
      const px = pts[i][0] * k, py = pts[i][1];
      let d;
      if (L === 0) d = (px - ax) ** 2 + (py - ay) ** 2;
      else { const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L)); d = (px - ax - t * dx) ** 2 + (py - ay - t * dy) ** 2; }
      if (d > best) { best = d; bi = i; }
    }
    if (best > tol * tol) { keep[bi] = 1; stack.push([a, bi], [bi, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}

function ringArea(ring, arcs) {
  const pts = [];
  ring.forEach((ref) => { const a = arcs[ref < 0 ? ~ref : ref]; const p = ref < 0 ? a.slice().reverse() : a; p.forEach((q, i) => { if (i || !pts.length) pts.push(q); }); });
  let s = 0;
  for (let i = 0; i < pts.length - 1; i++) s += pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1];
  return Math.abs(s / 2);
}

function varint(n, out) { // zigzag + 5-bit groups
  let z = n < 0 ? (-n * 2 - 1) : n * 2;
  do { let c = z & 31; z = Math.floor(z / 32); if (z > 0) c |= 32; out.push(A64[c]); } while (z > 0);
}

function build(topo, objName, tol, minArea, props) {
  const arcsLL = decodeArcs(topo);
  const geoms = topo.objects[objName].geometries;
  const feats = [];
  geoms.forEach((g) => {
    const p = props(g);
    if (!p) return;
    const polys = g.type === 'Polygon' ? [g.arcs] : g.type === 'MultiPolygon' ? g.arcs : [];
    let rings = [];
    polys.forEach((poly) => poly.forEach((ring) => rings.push(ring)));
    const areas = rings.map((r) => ringArea(r, arcsLL));
    const max = Math.max.apply(null, areas);
    rings = rings.filter((r, i) => areas[i] >= minArea || areas[i] === max);
    feats.push({ id: p.id, name: p.name, rings });
  });
  // collect used arcs, simplify, re-index
  const used = new Map();
  const outArcs = [];
  feats.forEach((f) => { f.rings = f.rings.map((ring) => ring.map((ref) => {
    const i = ref < 0 ? ~ref : ref;
    if (!used.has(i)) { used.set(i, outArcs.length); outArcs.push(simplify(arcsLL[i], tol)); }
    const j = used.get(i);
    return ref < 0 ? ~j : j;
  })); });
  // encode arcs
  const a = []; let points = 0;
  varint(outArcs.length, a);
  outArcs.forEach((arc) => {
    const q = arc.map((p) => [Math.round(p[0] / Q), Math.round(p[1] / Q)]);
    const d = [q[0]];
    for (let i = 1; i < q.length; i++) if (q[i][0] !== q[i - 1][0] || q[i][1] !== q[i - 1][1] || i === q.length - 1) d.push(q[i]);
    varint(d.length, a);
    let px = 0, py = 0;
    d.forEach((p) => { varint(p[0] - px, a); varint(p[1] - py, a); px = p[0]; py = p[1]; });
    points += d.length;
  });
  // encode rings
  const r = [];
  feats.forEach((f) => {
    varint(f.rings.length, r);
    f.rings.forEach((ring) => { varint(ring.length, r); ring.forEach((ref) => varint(ref, r)); });
  });
  const out = { a: a.join(''), r: r.join(''), ids: feats.map((f) => f.id).join(','), names: feats.map((f) => f.name).join('|') };
  console.error(objName, 'features', feats.length, 'arcs', outArcs.length, 'points', points, 'bytes', out.a.length + out.r.length + out.ids.length + out.names.length);
  return out;
}

const states = JSON.parse(fs.readFileSync(statesPath, 'utf8'));
const counties = JSON.parse(fs.readFileSync(countiesPath, 'utf8'));
const districts = JSON.parse(fs.readFileSync(districtsPath, 'utf8'));

const out = {
  q: Q,
  s: build(states, 'states', 0.02, 0.004, (g) => { const ab = FIPS[String(g.id).padStart(2, '0')]; return ab ? { id: ab, name: g.properties.name } : null; }),
  d: build(districts, 'districts', 0.012, 0.003, (g) => (g.properties && g.properties.state && FIPS && g.properties.code ? { id: g.properties.code, name: '' } : null)),
  c: build(counties, 'counties', 0.016, 0.002, (g) => { const f = String(g.id).padStart(5, '0'); return FIPS[f.slice(0, 2)] ? { id: f, name: g.properties.name } : null; })
};
if (worldPath) {
  const world = JSON.parse(fs.readFileSync(worldPath, 'utf8'));
  const keep = { '124': 'Canada', '484': 'Mexico', '192': 'Cuba', '044': 'Bahamas', '320': 'Guatemala', '084': 'Belize' };
  out.n = build(world, 'countries', 0.04, 0.03, (g) => (keep[String(g.id).padStart(3, '0')] ? { id: String(g.id).padStart(3, '0'), name: keep[String(g.id).padStart(3, '0')] } : null));
}
fs.writeFileSync(outPath, JSON.stringify(out));
console.error('total', fs.statSync(outPath).size);
