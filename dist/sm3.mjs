const c = new Uint32Array(68), j = new Uint32Array(64);
function i(n, t) {
  const o = t & 31;
  return n << o | n >>> 32 - o;
}
function v(n, t) {
  const o = [];
  for (let l = n.length - 1; l >= 0; l--)
    o[l] = (n[l] ^ t[l]) & 255;
  return o;
}
function G(n) {
  return n ^ i(n, 9) ^ i(n, 17);
}
function M(n) {
  return n ^ i(n, 15) ^ i(n, 23);
}
function T(n) {
  let t = n.length * 8, o = t % 512;
  o = o >= 448 ? 512 - o % 448 - 1 : 448 - o - 1;
  const l = new Array((o - 7) / 8), r = new Array(8);
  for (let s = 0, h = l.length; s < h; s++)
    l[s] = 0;
  for (let s = 0, h = r.length; s < h; s++)
    r[s] = 0;
  t = t.toString(2);
  for (let s = 7; s >= 0; s--)
    if (t.length > 8) {
      const h = t.length - 8;
      r[s] = parseInt(t.substr(h), 2), t = t.substr(0, h);
    } else
      t.length > 0 && (r[s] = parseInt(t, 2), t = "");
  const b = new Uint8Array([...n, 128, ...l, ...r]), B = new DataView(b.buffer, 0), C = b.length / 64, f = new Uint32Array([1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214]);
  for (let s = 0; s < C; s++) {
    c.fill(0), j.fill(0);
    const h = 16 * s;
    for (let e = 0; e < 16; e++)
      c[e] = B.getUint32((h + e) * 4, !1);
    for (let e = 16; e < 68; e++)
      c[e] = M(c[e - 16] ^ c[e - 9] ^ i(c[e - 3], 15)) ^ i(c[e - 13], 7) ^ c[e - 6];
    for (let e = 0; e < 64; e++)
      j[e] = c[e] ^ c[e + 4];
    const g = 2043430169, F = 2055708042;
    let u = f[0], w = f[1], d = f[2], m = f[3], a = f[4], A = f[5], p = f[6], P = f[7], U, H, I, S, V;
    for (let e = 0; e < 64; e++)
      V = e >= 0 && e <= 15 ? g : F, U = i(i(u, 12) + a + i(V, e), 7), H = U ^ i(u, 12), I = (e >= 0 && e <= 15 ? u ^ w ^ d : u & w | u & d | w & d) + m + H + j[e], S = (e >= 0 && e <= 15 ? a ^ A ^ p : a & A | ~a & p) + P + U + c[e], m = d, d = i(w, 9), w = u, u = I, P = p, p = i(A, 19), A = a, a = G(S);
    f[0] ^= u, f[1] ^= w, f[2] ^= d, f[3] ^= m, f[4] ^= a, f[5] ^= A, f[6] ^= p, f[7] ^= P;
  }
  const E = [];
  for (let s = 0, h = f.length; s < h; s++) {
    const g = f[s];
    E.push((g & 4278190080) >>> 24, (g & 16711680) >>> 16, (g & 65280) >>> 8, g & 255);
  }
  return E;
}
const y = 64, K = new Uint8Array(y), L = new Uint8Array(y);
for (let n = 0; n < y; n++)
  K[n] = 54, L[n] = 92;
function W(n, t) {
  for (t.length > y && (t = T(t)); t.length < y; )
    t.push(0);
  const o = v(t, K), l = v(t, L), r = T([...o, ...n]);
  return T([...l, ...r]);
}
function k(n, t) {
  return n.length >= t ? n : new Array(t - n.length + 1).join("0") + n;
}
function D(n) {
  return n.map((t) => (t = t.toString(16), t.length === 1 ? "0" + t : t)).join("");
}
function q(n) {
  const t = [];
  let o = n.length;
  o % 2 !== 0 && (n = k(n, o + 1)), o = n.length;
  for (let l = 0; l < o; l += 2)
    t.push(parseInt(n.substr(l, 2), 16));
  return t;
}
function z(n) {
  const t = [];
  for (let o = 0, l = n.length; o < l; o++) {
    const r = n.codePointAt(o);
    if (r <= 127)
      t.push(r);
    else if (r <= 2047)
      t.push(192 | r >>> 6), t.push(128 | r & 63);
    else if (r <= 55295 || r >= 57344 && r <= 65535)
      t.push(224 | r >>> 12), t.push(128 | r >>> 6 & 63), t.push(128 | r & 63);
    else if (r >= 65536 && r <= 1114111)
      o++, t.push(240 | r >>> 18 & 28), t.push(128 | r >>> 12 & 63), t.push(128 | r >>> 6 & 63), t.push(128 | r & 63);
    else
      throw t.push(r), new Error("input is not supported");
  }
  return t;
}
function J(n, t) {
  if (n = typeof n == "string" ? z(n) : Array.from(n), t) {
    if ((t.mode || "hmac") !== "hmac")
      throw new Error("invalid mode");
    let l = t.key;
    if (!l)
      throw new Error("invalid key");
    return l = typeof l == "string" ? q(l) : Array.from(l), D(W(n, l));
  }
  return D(T(n));
}
export {
  J as default
};
