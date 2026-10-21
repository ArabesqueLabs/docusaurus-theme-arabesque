// Pattern geometry: Hankin's polygons-in-contact on the 4.8.8 tiling.
// Ported from the Arabesque design system bundle (Arabesque.pattern); the
// maths is unchanged and the contact angle is a parameter (67.5° by default).

const SQ2 = Math.SQRT2;

export function poly(n, cx0, cy0, r, rot) {
  const v = [];
  for (let k = 0; k < n; k++) {
    const a = rot + (2 * Math.PI * k) / n;
    v.push([cx0 + r * Math.cos(a), cy0 + r * Math.sin(a)]);
  }
  return v;
}

export function star(V, angleDeg = 67.5) {
  const TH = (angleDeg * Math.PI) / 180;
  const n = V.length;
  let ccx = 0;
  let ccy = 0;
  V.forEach((p) => {
    ccx += p[0];
    ccy += p[1];
  });
  ccx /= n;
  ccy /= n;
  const alpha = ((n - 2) * Math.PI) / n;
  const hh = Math.hypot(V[1][0] - V[0][0], V[1][1] - V[0][1]) / 2;
  const vp = (hh * Math.sin(TH)) / Math.sin(TH + alpha / 2);
  const M = V.map((v, k) => {
    const w = V[(k + 1) % n];
    return [(v[0] + w[0]) / 2, (v[1] + w[1]) / 2];
  });
  const P = V.map((v) => {
    const dx = ccx - v[0];
    const dy = ccy - v[1];
    const l = Math.hypot(dx, dy);
    return [v[0] + (dx / l) * vp, v[1] + (dy / l) * vp];
  });
  const pts = [M[n - 1]];
  for (let k = 0; k < n; k++) pts.push(P[k], M[k]);
  return pts;
}

export function toPath(pts) {
  return `M${pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join('L')}Z`;
}

export function tiling(s, ox, oy, w, hgt) {
  const D = s * (1 + SQ2);
  const R8 = s / (2 * Math.sin(Math.PI / 8));
  const R4 = s / SQ2;
  const cells = [];
  const i0 = Math.floor(-ox / D) - 1;
  const i1 = Math.ceil((w - ox) / D) + 1;
  const j0 = Math.floor(-oy / D) - 1;
  const j1 = Math.ceil((hgt - oy) / D) + 1;
  for (let i = i0; i <= i1; i++) {
    for (let j = j0; j <= j1; j++) {
      const c0 = ox + i * D;
      const c1 = oy + j * D;
      cells.push({key: `o:${i}:${j}`, kind: 'octagon', cx: c0, cy: c1, V: poly(8, c0, c1, R8, Math.PI / 8)});
      cells.push({key: `s:${i}:${j}`, kind: 'square', cx: c0 + D / 2, cy: c1 + D / 2, V: poly(4, c0 + D / 2, c1 + D / 2, R4, 0)});
    }
  }
  return {cells, D};
}

// Cells with their star (strand) and polygon (scaffold) paths, the distance
// of each from the focal point, and the octagon nearest to it.
export function buildCells(side, angle, ox, oy, w, h, fx, fy) {
  const t = tiling(side, ox, oy, w, h);
  let maxD = 1;
  let focalKey = null;
  let best = Infinity;
  const cells = t.cells.map((c) => {
    const dist = Math.hypot(c.cx - fx, c.cy - fy);
    if (dist > maxD) maxD = dist;
    if (c.kind === 'octagon' && dist < best) {
      best = dist;
      focalKey = c.key;
    }
    return {key: c.key, dist, star: toPath(star(c.V, angle)), poly: toPath(c.V)};
  });
  return {cells, maxD, focalKey, D: t.D};
}

export const SQRT2 = SQ2;
