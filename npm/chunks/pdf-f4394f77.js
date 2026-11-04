var $v = Object.defineProperty;
var zv = (g, t, e) => t in g ? $v(g, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : g[t] = e;
var T = (g, t, e) => (zv(g, typeof t != "symbol" ? t + "" : t, e), e), pb = (g, t, e) => {
  if (!t.has(g))
    throw TypeError("Cannot " + e);
};
var n = (g, t, e) => (pb(g, t, "read from private field"), e ? e.call(g) : t.get(g)), u = (g, t, e) => {
  if (t.has(g))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(g) : t.set(g, e);
}, f = (g, t, e, s) => (pb(g, t, "write to private field"), s ? s.call(g, e) : t.set(g, e), e);
var At = (g, t, e, s) => ({
  set _(i) {
    f(g, t, i, e);
  },
  get _() {
    return n(g, t, s);
  }
}), b = (g, t, e) => (pb(g, t, "access private method"), e);
const es = typeof process == "object" && process + "" == "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser"), fn = [1 / 0, 1 / 0, -1 / 0, -1 / 0], Rr = new Float32Array(fn), Sb = [1e-3, 0, 0, 1e-3, 0, 0], Ce = "http://www.w3.org/2000/svg", ts = {
  ANY: 1,
  DISPLAY: 2,
  PRINT: 4,
  SAVE: 8,
  ANNOTATIONS_FORMS: 16,
  ANNOTATIONS_STORAGE: 32,
  ANNOTATIONS_DISABLE: 64,
  IS_EDITING: 128,
  OPLIST: 256
}, gn = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_FORMS: 2,
  ENABLE_STORAGE: 3
}, Ho = "pdfjs_internal_id_", Jh = "pdfjs_internal_editor_", G = {
  DISABLE: -1,
  NONE: 0,
  FREETEXT: 3,
  HIGHLIGHT: 9,
  STAMP: 13,
  INK: 15,
  POPUP: 16,
  SIGNATURE: 101,
  COMMENT: 102
}, Y = {
  RESIZE: 1,
  CREATE: 2,
  FREETEXT_SIZE: 11,
  FREETEXT_COLOR: 12,
  FREETEXT_OPACITY: 13,
  INK_COLOR: 21,
  INK_THICKNESS: 22,
  INK_OPACITY: 23,
  INK_COLOR_AND_OPACITY: 24,
  HIGHLIGHT_COLOR: 31,
  HIGHLIGHT_THICKNESS: 32,
  HIGHLIGHT_FREE: 33,
  HIGHLIGHT_SHOW_ALL: 34,
  DRAW_STEP: 41
}, Vv = {
  PRINT: 4,
  MODIFY_CONTENTS: 8,
  COPY: 16,
  MODIFY_ANNOTATIONS: 32,
  FILL_INTERACTIVE_FORMS: 256,
  COPY_FOR_ACCESSIBILITY: 512,
  ASSEMBLE: 1024,
  PRINT_HIGH_QUALITY: 2048
}, Gt = {
  FILL: 0,
  STROKE: 1,
  FILL_STROKE: 2,
  INVISIBLE: 3,
  FILL_ADD_TO_PATH: 4,
  STROKE_ADD_TO_PATH: 5,
  FILL_STROKE_ADD_TO_PATH: 6,
  ADD_TO_PATH: 7,
  FILL_STROKE_MASK: 3,
  ADD_TO_PATH_FLAG: 4
}, Wf = {
  GRAYSCALE_1BPP: 1,
  RGB_24BPP: 2,
  RGBA_32BPP: 3
}, wt = {
  TEXT: 1,
  LINK: 2,
  FREETEXT: 3,
  LINE: 4,
  SQUARE: 5,
  CIRCLE: 6,
  POLYGON: 7,
  POLYLINE: 8,
  HIGHLIGHT: 9,
  UNDERLINE: 10,
  SQUIGGLY: 11,
  STRIKEOUT: 12,
  STAMP: 13,
  CARET: 14,
  INK: 15,
  POPUP: 16,
  FILEATTACHMENT: 17,
  SOUND: 18,
  MOVIE: 19,
  WIDGET: 20,
  SCREEN: 21,
  PRINTERMARK: 22,
  TRAPNET: 23,
  WATERMARK: 24,
  THREED: 25,
  REDACT: 26,
  RICHMEDIA: 27
}, Fo = {
  SOLID: 1,
  DASHED: 2,
  BEVELED: 3,
  INSET: 4,
  UNDERLINE: 5
}, Qm = {
  ERRORS: 0,
  WARNINGS: 1,
  INFOS: 5
}, Xs = {
  dependency: 1,
  setLineWidth: 2,
  setLineCap: 3,
  setLineJoin: 4,
  setMiterLimit: 5,
  setDash: 6,
  setRenderingIntent: 7,
  setFlatness: 8,
  setGState: 9,
  save: 10,
  restore: 11,
  transform: 12,
  moveTo: 13,
  lineTo: 14,
  curveTo: 15,
  curveTo2: 16,
  curveTo3: 17,
  closePath: 18,
  rectangle: 19,
  stroke: 20,
  closeStroke: 21,
  fill: 22,
  eoFill: 23,
  fillStroke: 24,
  eoFillStroke: 25,
  closeFillStroke: 26,
  closeEOFillStroke: 27,
  endPath: 28,
  clip: 29,
  eoClip: 30,
  beginText: 31,
  endText: 32,
  setCharSpacing: 33,
  setWordSpacing: 34,
  setHScale: 35,
  setLeading: 36,
  setFont: 37,
  setTextRenderingMode: 38,
  setTextRise: 39,
  moveText: 40,
  setLeadingMoveText: 41,
  setTextMatrix: 42,
  nextLine: 43,
  showText: 44,
  showSpacedText: 45,
  nextLineShowText: 46,
  nextLineSetSpacingShowText: 47,
  setCharWidth: 48,
  setCharWidthAndBounds: 49,
  setStrokeColorSpace: 50,
  setFillColorSpace: 51,
  setStrokeColor: 52,
  setStrokeColorN: 53,
  setFillColor: 54,
  setFillColorN: 55,
  setStrokeGray: 56,
  setFillGray: 57,
  setStrokeRGBColor: 58,
  setFillRGBColor: 59,
  setStrokeCMYKColor: 60,
  setFillCMYKColor: 61,
  shadingFill: 62,
  beginInlineImage: 63,
  beginImageData: 64,
  endInlineImage: 65,
  paintXObject: 66,
  markPoint: 67,
  markPointProps: 68,
  beginMarkedContent: 69,
  beginMarkedContentProps: 70,
  endMarkedContent: 71,
  beginCompat: 72,
  endCompat: 73,
  paintFormXObjectBegin: 74,
  paintFormXObjectEnd: 75,
  beginGroup: 76,
  endGroup: 77,
  beginAnnotation: 80,
  endAnnotation: 81,
  paintImageMaskXObject: 83,
  paintImageMaskXObjectGroup: 84,
  paintImageXObject: 85,
  paintInlineImageXObject: 86,
  paintInlineImageXObjectGroup: 87,
  paintImageXObjectRepeat: 88,
  paintImageMaskXObjectRepeat: 89,
  paintSolidColorImageMask: 90,
  constructPath: 91,
  setStrokeTransparent: 92,
  setFillTransparent: 93,
  rawFillPath: 94
}, ec = {
  moveTo: 0,
  lineTo: 1,
  curveTo: 2,
  quadraticCurveTo: 3,
  closePath: 4
}, jv = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
let Jm = Qm.WARNINGS;
function Wv(g) {
  Number.isInteger(g) && (Jm = g);
}
function Xv() {
  return Jm;
}
function Zm(g) {
  Jm >= Qm.INFOS && console.info(`Info: ${g}`);
}
function $(g) {
  Jm >= Qm.WARNINGS && console.warn(`Warning: ${g}`);
}
function K(g) {
  throw new Error(g);
}
function Ct(g, t) {
  g || K(t);
}
function Yv(g) {
  switch (g == null ? void 0 : g.protocol) {
    case "http:":
    case "https:":
    case "ftp:":
    case "mailto:":
    case "tel:":
      return !0;
    default:
      return !1;
  }
}
function y0(g, t = null, e = null) {
  if (!g)
    return null;
  if (e && typeof g == "string") {
    if (e.addDefaultProtocol && g.startsWith("www.")) {
      const i = g.match(/\./g);
      (i == null ? void 0 : i.length) >= 2 && (g = `http://${g}`);
    }
    if (e.tryConvertEncoding)
      try {
        g = Qv(g);
      } catch {
      }
  }
  const s = t ? URL.parse(g, t) : URL.parse(g);
  return Yv(s) ? s : null;
}
function A0(g, t, e = !1) {
  const s = URL.parse(g);
  return s ? (s.hash = t, s.href) : e && y0(g, "http://example.com") ? g.split("#", 1)[0] + `${t ? `#${t}` : ""}` : "";
}
function Eb(g) {
  return g.substring(g.lastIndexOf("/") + 1);
}
function H(g, t, e, s = !1) {
  return Object.defineProperty(g, t, {
    value: e,
    enumerable: !s,
    configurable: !0,
    writable: !1
  }), e;
}
const Do = function() {
  function t(e, s) {
    this.message = e, this.name = s;
  }
  return t.prototype = new Error(), t.constructor = t, t;
}();
class xb extends Do {
  constructor(t, e) {
    super(t, "PasswordException"), this.code = e;
  }
}
class gb extends Do {
  constructor(t, e) {
    super(t, "UnknownErrorException"), this.details = e;
  }
}
class Cb extends Do {
  constructor(t) {
    super(t, "InvalidPDFException");
  }
}
class Lp extends Do {
  constructor(t, e, s) {
    super(t, "ResponseException"), this.status = e, this.missing = s;
  }
}
class Kv extends Do {
  constructor(t) {
    super(t, "FormatError");
  }
}
class Er extends Do {
  constructor(t) {
    super(t, "AbortException");
  }
}
function qv(g) {
  (typeof g != "object" || (g == null ? void 0 : g.length) === void 0) && K("Invalid argument for bytesToString");
  const t = g.length, e = 8192;
  if (t < e)
    return String.fromCharCode.apply(null, g);
  const s = [];
  for (let i = 0; i < t; i += e) {
    const r = Math.min(i + e, t), a = g.subarray(i, r);
    s.push(String.fromCharCode.apply(null, a));
  }
  return s.join("");
}
function tb(g) {
  typeof g != "string" && K("Invalid argument for stringToBytes");
  const t = g.length, e = new Uint8Array(t);
  for (let s = 0; s < t; ++s)
    e[s] = g.charCodeAt(s) & 255;
  return e;
}
class rt {
  static get isLittleEndian() {
    const t = new Uint8Array(4);
    t[0] = 1;
    const e = new Uint32Array(t.buffer, 0, 1);
    return H(this, "isLittleEndian", e[0] === 1);
  }
  static get isOffscreenCanvasSupported() {
    return H(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas < "u");
  }
  static get isImageDecoderSupported() {
    return H(this, "isImageDecoderSupported", typeof ImageDecoder < "u");
  }
  static get isFloat16ArraySupported() {
    return H(this, "isFloat16ArraySupported", typeof Float16Array < "u");
  }
  static get isSanitizerSupported() {
    return H(this, "isSanitizerSupported", typeof Sanitizer < "u");
  }
  static get platform() {
    const {
      platform: t,
      userAgent: e
    } = navigator;
    return H(this, "platform", {
      isAndroid: e.includes("Android"),
      isLinux: t.includes("Linux"),
      isMac: t.includes("Mac"),
      isWindows: t.includes("Win"),
      isFirefox: e.includes("Firefox")
    });
  }
  static get isCanvasFilterSupported() {
    let t;
    return this.isOffscreenCanvasSupported ? t = new OffscreenCanvas(1, 1).getContext("2d") : typeof document < "u" && (t = document.createElement("canvas").getContext("2d")), H(this, "isCanvasFilterSupported", (t == null ? void 0 : t.filter) !== void 0);
  }
  static get isAlphaColorInputSupported() {
    if (typeof document > "u")
      return H(this, "isAlphaColorInputSupported", !1);
    const t = document.createElement("input");
    return t.type = "color", t.setAttribute("alpha", ""), t.value = "#ff000080", H(this, "isAlphaColorInputSupported", t.value !== "#ff0000");
  }
  static get isBackdropFilterSupported() {
    return H(this, "isBackdropFilterSupported", typeof CSS < "u" && CSS.supports("backdrop-filter", "blur(1px)"));
  }
}
var zo, Xf, Rc, _b;
class D {
  static get hexNums() {
    return H(this, "hexNums", Array.from({
      length: 256
    }, (t, e) => e.toString(16).padStart(2, "0")));
  }
  static makeHexColor(t, e, s) {
    return `#${this.hexNums[t]}${this.hexNums[e]}${this.hexNums[s]}`;
  }
  static transform(t, e) {
    return [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]];
  }
  static multiplyByDOMMatrix(t, e) {
    return [t[0] * e.a + t[2] * e.b, t[1] * e.a + t[3] * e.b, t[0] * e.c + t[2] * e.d, t[1] * e.c + t[3] * e.d, t[0] * e.e + t[2] * e.f + t[4], t[1] * e.e + t[3] * e.f + t[5]];
  }
  static applyTransform(t, e, s = 0) {
    const i = t[s], r = t[s + 1];
    t[s] = i * e[0] + r * e[2] + e[4], t[s + 1] = i * e[1] + r * e[3] + e[5];
  }
  static applyTransformToBezier(t, e, s = 0) {
    const i = e[0], r = e[1], a = e[2], o = e[3], l = e[4], h = e[5];
    for (let c = 0; c < 6; c += 2) {
      const d = t[s + c], p = t[s + c + 1];
      t[s + c] = d * i + p * a + l, t[s + c + 1] = d * r + p * o + h;
    }
  }
  static applyInverseTransform(t, e) {
    const s = t[0], i = t[1], r = e[0] * e[3] - e[1] * e[2];
    t[0] = (s * e[3] - i * e[2] + e[2] * e[5] - e[4] * e[3]) / r, t[1] = (-s * e[1] + i * e[0] + e[4] * e[1] - e[5] * e[0]) / r;
  }
  static axialAlignedBoundingBox(t, e, s) {
    const i = e[0], r = e[1], a = e[2], o = e[3], l = e[4], h = e[5], c = t[0], d = t[1], p = t[2], m = t[3];
    let y = i * c + l, A = y, v = i * p + l, w = v, S = o * d + h, E = S, x = o * m + h, C = x;
    if (r !== 0 || a !== 0) {
      const _ = r * c, k = r * p, P = a * d, M = a * m;
      y += P, w += P, v += M, A += M, S += _, C += _, x += k, E += k;
    }
    s[0] = Math.min(s[0], y, v, A, w), s[1] = Math.min(s[1], S, x, E, C), s[2] = Math.max(s[2], y, v, A, w), s[3] = Math.max(s[3], S, x, E, C);
  }
  static inverseTransform(t) {
    const e = t[0] * t[3] - t[1] * t[2];
    return [t[3] / e, -t[1] / e, -t[2] / e, t[0] / e, (t[2] * t[5] - t[4] * t[3]) / e, (t[4] * t[1] - t[5] * t[0]) / e];
  }
  static singularValueDecompose2dScale(t, e) {
    const s = t[0], i = t[1], r = t[2], a = t[3], o = s ** 2 + i ** 2, l = s * r + i * a, h = r ** 2 + a ** 2, c = (o + h) / 2, d = Math.sqrt(c ** 2 - (o * h - l ** 2));
    e[0] = Math.sqrt(c + d || 1), e[1] = Math.sqrt(c - d || 1);
  }
  static normalizeRect(t) {
    const e = t.slice(0);
    return t[0] > t[2] && (e[0] = t[2], e[2] = t[0]), t[1] > t[3] && (e[1] = t[3], e[3] = t[1]), e;
  }
  static intersect(t, e) {
    const s = Math.max(Math.min(t[0], t[2]), Math.min(e[0], e[2])), i = Math.min(Math.max(t[0], t[2]), Math.max(e[0], e[2]));
    if (s > i)
      return null;
    const r = Math.max(Math.min(t[1], t[3]), Math.min(e[1], e[3])), a = Math.min(Math.max(t[1], t[3]), Math.max(e[1], e[3]));
    return r > a ? null : [s, r, i, a];
  }
  static pointBoundingBox(t, e, s) {
    s[0] = Math.min(s[0], t), s[1] = Math.min(s[1], e), s[2] = Math.max(s[2], t), s[3] = Math.max(s[3], e);
  }
  static rectBoundingBox(t, e, s, i, r) {
    r[0] = Math.min(r[0], t, s), r[1] = Math.min(r[1], e, i), r[2] = Math.max(r[2], t, s), r[3] = Math.max(r[3], e, i);
  }
  static bezierBoundingBox(t, e, s, i, r, a, o, l, h) {
    h[0] = Math.min(h[0], t, o), h[1] = Math.min(h[1], e, l), h[2] = Math.max(h[2], t, o), h[3] = Math.max(h[3], e, l), b(this, Rc, _b).call(this, t, s, r, o, e, i, a, l, 3 * (-t + 3 * (s - r) + o), 6 * (t - 2 * s + r), 3 * (s - t), h), b(this, Rc, _b).call(this, t, s, r, o, e, i, a, l, 3 * (-e + 3 * (i - a) + l), 6 * (e - 2 * i + a), 3 * (i - e), h);
  }
}
zo = new WeakSet(), Xf = function(t, e, s, i, r, a, o, l, h, c) {
  if (h <= 0 || h >= 1)
    return;
  const d = 1 - h, p = h * h, m = p * h, y = d * (d * (d * t + 3 * h * e) + 3 * p * s) + m * i, A = d * (d * (d * r + 3 * h * a) + 3 * p * o) + m * l;
  c[0] = Math.min(c[0], y), c[1] = Math.min(c[1], A), c[2] = Math.max(c[2], y), c[3] = Math.max(c[3], A);
}, Rc = new WeakSet(), _b = function(t, e, s, i, r, a, o, l, h, c, d, p) {
  if (Math.abs(h) < 1e-12) {
    Math.abs(c) >= 1e-12 && b(this, zo, Xf).call(this, t, e, s, i, r, a, o, l, -d / c, p);
    return;
  }
  const m = c ** 2 - 4 * d * h;
  if (m < 0)
    return;
  const y = Math.sqrt(m), A = 2 * h;
  b(this, zo, Xf).call(this, t, e, s, i, r, a, o, l, (-c + y) / A, p), b(this, zo, Xf).call(this, t, e, s, i, r, a, o, l, (-c - y) / A, p);
}, u(D, zo), u(D, Rc);
function Qv(g) {
  return decodeURIComponent(escape(g));
}
let mb = null, UA = null;
function Jv(g) {
  return mb || (mb = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+)|(\ufb05+)/gu, UA = /* @__PURE__ */ new Map([["ﬅ", "ſt"]])), g.replaceAll(mb, (t, e, s) => e ? e.normalize("NFKC") : UA.get(s));
}
function w0() {
  if (typeof crypto.randomUUID == "function")
    return crypto.randomUUID();
  const g = new Uint8Array(32);
  return crypto.getRandomValues(g), qv(g);
}
function Zv(g, t, e) {
  if (!Array.isArray(e) || e.length < 2)
    return !1;
  const [s, i, ...r] = e;
  if (!g(s) && !Number.isInteger(s) || !t(i))
    return !1;
  const a = r.length;
  let o = !0;
  switch (i.name) {
    case "XYZ":
      if (a < 2 || a > 3)
        return !1;
      break;
    case "Fit":
    case "FitB":
      return a === 0;
    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (a > 1)
        return !1;
      break;
    case "FitR":
      if (a !== 4)
        return !1;
      o = !1;
      break;
    default:
      return !1;
  }
  for (const l of r)
    if (!(typeof l == "number" || o && l === null))
      return !1;
  return !0;
}
const Zh = () => [], AA = () => /* @__PURE__ */ new Map(), Tb = () => /* @__PURE__ */ Object.create(null), tS = () => /* @__PURE__ */ new Set();
typeof Iterator.prototype.join != "function" && (Iterator.prototype.join = function(g) {
  return [...this].join(g);
});
function ut(g, t, e) {
  return Math.min(Math.max(g, t), e);
}
class Lf {
  constructor({
    viewBox: t,
    userUnit: e,
    scale: s,
    rotation: i,
    offsetX: r = 0,
    offsetY: a = 0,
    dontFlip: o = !1
  }) {
    this.viewBox = t, this.userUnit = e, this.scale = s, this.rotation = i, this.offsetX = r, this.offsetY = a, s *= e;
    const l = (t[2] + t[0]) / 2, h = (t[3] + t[1]) / 2;
    let c, d, p, m;
    switch (i %= 360, i < 0 && (i += 360), i) {
      case 180:
        c = -1, d = 0, p = 0, m = 1;
        break;
      case 90:
        c = 0, d = 1, p = 1, m = 0;
        break;
      case 270:
        c = 0, d = -1, p = -1, m = 0;
        break;
      case 0:
        c = 1, d = 0, p = 0, m = -1;
        break;
      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
    }
    o && (p = -p, m = -m);
    let y, A, v, w;
    c === 0 ? (y = Math.abs(h - t[1]) * s + r, A = Math.abs(l - t[0]) * s + a, v = (t[3] - t[1]) * s, w = (t[2] - t[0]) * s) : (y = Math.abs(l - t[0]) * s + r, A = Math.abs(h - t[1]) * s + a, v = (t[2] - t[0]) * s, w = (t[3] - t[1]) * s), this.transform = [c * s, d * s, p * s, m * s, y - c * s * l - p * s * h, A - d * s * l - m * s * h], this.width = v, this.height = w;
  }
  get rawDims() {
    const t = this.viewBox;
    return H(this, "rawDims", {
      pageWidth: t[2] - t[0],
      pageHeight: t[3] - t[1],
      pageX: t[0],
      pageY: t[1]
    });
  }
  clone({
    scale: t = this.scale,
    rotation: e = this.rotation,
    offsetX: s = this.offsetX,
    offsetY: i = this.offsetY,
    dontFlip: r = !1
  } = {}) {
    return new Lf({
      viewBox: this.viewBox.slice(),
      userUnit: this.userUnit,
      scale: t,
      rotation: e,
      offsetX: s,
      offsetY: i,
      dontFlip: r
    });
  }
  convertToViewportPoint(t, e) {
    const s = [t, e];
    return D.applyTransform(s, this.transform), s;
  }
  convertToPdfPoint(t, e) {
    const s = [t, e];
    return D.applyInverseTransform(s, this.transform), s;
  }
}
class Pc {
  static textContent(t) {
    const e = [], s = {
      items: e,
      styles: /* @__PURE__ */ Object.create(null)
    };
    function i(r) {
      var l;
      if (!r)
        return;
      let a = null;
      const o = r.name;
      if (o === "#text")
        a = r.value;
      else if (Pc.shouldBuildText(o))
        (l = r == null ? void 0 : r.attributes) != null && l.textContent ? a = r.attributes.textContent : r.value && (a = r.value);
      else
        return;
      if (a !== null && e.push({
        str: a
      }), !!r.children)
        for (const h of r.children)
          i(h);
    }
    return i(t), s;
  }
  static shouldBuildText(t) {
    return !(t === "textarea" || t === "input" || t === "option" || t === "select");
  }
}
const eS = /url\(|image-set\(/i, sS = /^on/i;
var Oc, kb;
class wA {
  static get _allowedHtmlElements() {
    return H(this, "_allowedHtmlElements", /* @__PURE__ */ new Set(["a", "b", "br", "button", "div", "i", "img", "input", "label", "li", "ol", "option", "p", "select", "span", "sub", "sup", "textarea", "ul"]));
  }
  static get _allowedSvgElements() {
    return H(this, "_allowedSvgElements", /* @__PURE__ */ new Set(["ellipse", "line", "path", "rect", "svg"]));
  }
  static get _allowedRichTextElements() {
    return H(this, "_allowedRichTextElements", /* @__PURE__ */ new Set(["a", "b", "br", "div", "i", "li", "ol", "p", "span", "sub", "sup", "ul"]));
  }
  static get _allowedRichTextAttributes() {
    return H(this, "_allowedRichTextAttributes", /* @__PURE__ */ new Set(["class", "dir", "style"]));
  }
  static get _allowedRichTextStyles() {
    return H(this, "_allowedRichTextStyles", /* @__PURE__ */ new Set(["color", "font", "fontFamily", "fontSize", "fontStretch", "fontStyle", "fontWeight", "kerningMode", "letterSpacing", "lineHeight", "margin", "marginBottom", "marginLeft", "marginRight", "marginTop", "orphans", "paddingLeft", "paddingRight", "breakAfter", "breakBefore", "breakInside", "tabInterval", "tabStop", "textAlign", "textDecoration", "textIndent", "transform", "verticalAlign", "widows"]));
  }
  static setupStorage(t, e, s, i, r) {
    const a = i.getValue(e, {
      value: null
    });
    switch (s.name) {
      case "textarea":
        if (a.value !== null && (t.textContent = a.value), r === "print")
          break;
        t.addEventListener("input", (o) => {
          i.setValue(e, {
            value: o.target.value
          });
        });
        break;
      case "input":
        if (s.attributes.type === "radio" || s.attributes.type === "checkbox") {
          if (a.value === s.attributes.xfaOn ? t.setAttribute("checked", !0) : a.value === s.attributes.xfaOff && t.removeAttribute("checked"), r === "print")
            break;
          t.addEventListener("change", (o) => {
            i.setValue(e, {
              value: o.target.checked ? o.target.getAttribute("xfaOn") : o.target.getAttribute("xfaOff")
            });
          });
        } else {
          if (a.value !== null && t.setAttribute("value", a.value), r === "print")
            break;
          t.addEventListener("input", (o) => {
            i.setValue(e, {
              value: o.target.value
            });
          });
        }
        break;
      case "select":
        if (a.value !== null) {
          t.setAttribute("value", a.value);
          for (const o of s.children)
            o.attributes.value === a.value ? o.attributes.selected = !0 : Object.hasOwn(o.attributes, "selected") && delete o.attributes.selected;
        }
        t.addEventListener("input", (o) => {
          const l = o.target.options, h = l.selectedIndex === -1 ? "" : l[l.selectedIndex].value;
          i.setValue(e, {
            value: h
          });
        });
        break;
    }
  }
  static setAttributes({
    html: t,
    element: e,
    storage: s = null,
    intent: i,
    linkService: r
  }) {
    const {
      attributes: a
    } = e, o = t instanceof HTMLAnchorElement;
    a.type === "radio" && (a.name = `${a.name}-${i}`);
    for (const [l, h] of Object.entries(a))
      if (h != null && !sS.test(l) && !(i === "richText" && !this._allowedRichTextAttributes.has(l)))
        switch (l) {
          case "class":
            h.length && t.setAttribute(l, h.join(" "));
            break;
          case "dataId":
            break;
          case "id":
            t.setAttribute("data-element-id", h);
            break;
          case "style":
            if (i === "richText") {
              const c = this._allowedRichTextStyles;
              for (const [d, p] of Object.entries(h))
                c.has(d) && !eS.test(p) && (t.style[d] = p);
            } else
              Object.assign(t.style, h);
            break;
          case "textContent":
            t.textContent = h;
            break;
          default:
            (!o || l !== "href" && l !== "newWindow") && t.setAttribute(l, h);
        }
    o && (r == null || r.addLinkAttributes(t, a.href, a.newWindow)), s && a.dataId && this.setupStorage(t, a.dataId, e, s);
  }
  static render(t) {
    var d, p, m;
    const e = t.annotationStorage, s = t.linkService, i = t.xfaHtml, r = t.intent || "display", a = b(this, Oc, kb).call(this, i.name, (d = i.attributes) == null ? void 0 : d.xmlns, r) ?? document.createElement("div");
    i.attributes && this.setAttributes({
      html: a,
      element: i,
      intent: r,
      linkService: s
    });
    const o = r !== "richText", l = t.div;
    if (l.append(a), t.viewport) {
      const y = `matrix(${t.viewport.transform.join(",")})`;
      l.style.transform = y;
    }
    o && l.setAttribute("class", "xfaLayer xfaFont");
    const h = [];
    if (i.children.length === 0) {
      if (i.value) {
        const y = document.createTextNode(i.value);
        a.append(y), o && Pc.shouldBuildText(i.name) && h.push(y);
      }
      return {
        textDivs: h
      };
    }
    const c = [[i, -1, a]];
    for (; c.length > 0; ) {
      const [y, A, v] = c.at(-1);
      if (A + 1 === y.children.length) {
        c.pop();
        continue;
      }
      const w = y.children[++c.at(-1)[1]];
      if (w === null)
        continue;
      const {
        name: S
      } = w;
      if (S === "#text") {
        const x = document.createTextNode(w.value);
        h.push(x), v.append(x);
        continue;
      }
      const E = b(this, Oc, kb).call(this, S, (p = w.attributes) == null ? void 0 : p.xmlns, r);
      if (E) {
        if (v.append(E), w.attributes && this.setAttributes({
          html: E,
          element: w,
          storage: e,
          intent: r,
          linkService: s
        }), ((m = w.children) == null ? void 0 : m.length) > 0)
          c.push([w, -1, E]);
        else if (w.value) {
          const x = document.createTextNode(w.value);
          o && Pc.shouldBuildText(S) && h.push(x), E.append(x);
        }
      }
    }
    for (const y of l.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"))
      y.setAttribute("readOnly", !0);
    return {
      textDivs: h
    };
  }
  static update(t) {
    const e = `matrix(${t.viewport.transform.join(",")})`;
    t.div.style.transform = e, t.div.hidden = !1;
  }
  static getPageViewport(t, {
    scale: e = 1,
    rotation: s = 0
  }) {
    const {
      width: i,
      height: r
    } = t.attributes.style;
    return new Lf({
      viewBox: [0, 0, parseInt(i, 10), parseInt(r, 10)],
      userUnit: 1,
      scale: e,
      rotation: s
    });
  }
}
Oc = new WeakSet(), kb = function(t, e, s) {
  return s === "richText" ? !e && this._allowedRichTextElements.has(t) ? document.createElement(t) : null : e ? e === Ce && this._allowedSvgElements.has(t) ? document.createElementNS(Ce, t) : null : this._allowedHtmlElements.has(t) ? document.createElement(t) : null;
}, u(wA, Oc);
const Dr = class Dr {
};
T(Dr, "CSS", 96), T(Dr, "PDF", 72), T(Dr, "PDF_TO_CSS_UNITS", Dr.CSS / Dr.PDF);
let xr = Dr;
async function vA(g, t = "text") {
  if (Cc(g, document.baseURI)) {
    const e = await fetch(g);
    if (!e.ok)
      throw new Error(e.statusText);
    switch (t) {
      case "blob":
        return e.blob();
      case "bytes":
        return e.bytes();
      case "json":
        return e.json();
    }
    return e.text();
  }
  return new Promise((e, s) => {
    const i = new XMLHttpRequest();
    i.open("GET", g, !0), i.responseType = t === "bytes" ? "arraybuffer" : t, i.onreadystatechange = () => {
      if (i.readyState === XMLHttpRequest.DONE) {
        if (i.status === 200 || i.status === 0) {
          switch (t) {
            case "bytes":
              e(new Uint8Array(i.response));
              return;
            case "blob":
            case "json":
              e(i.response);
              return;
          }
          e(i.responseText);
          return;
        }
        s(new Error(i.statusText));
      }
    }, i.send(null);
  });
}
class SA extends Do {
  constructor(t, e = 0) {
    super(t, "RenderingCancelledException"), this.extraDelay = e;
  }
}
function eb(g) {
  const t = g.length;
  let e = 0;
  for (; e < t && g[e].trim() === ""; )
    e++;
  return g.substring(e, e + 5).toLowerCase() === "data:";
}
function EA(g) {
  return typeof g == "string" && /\.pdf$/i.test(g);
}
function iS(g) {
  return [g] = g.split(/[#?]/, 1), Eb(g);
}
function nS(g, t = "document.pdf") {
  if (typeof g != "string")
    return t;
  if (eb(g))
    return $('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'), t;
  const s = ((o) => {
    try {
      return new URL(o);
    } catch {
    }
    try {
      return new URL(decodeURIComponent(o));
    } catch {
    }
    try {
      return new URL(o, "https://foo.bar");
    } catch {
    }
    try {
      return new URL(decodeURIComponent(o), "https://foo.bar");
    } catch {
    }
    return null;
  })(g);
  if (!s)
    return t;
  const i = (o) => {
    try {
      let l = decodeURIComponent(o);
      return l.includes("/") && (l = Eb(l), l.length === 4 && r.test(l)) ? o : l;
    } catch {
      return o;
    }
  }, r = /\.pdf$/i, a = Eb(s.pathname);
  if (r.test(a))
    return i(a);
  if (s.searchParams.size > 0) {
    const o = (h) => [...h].findLast((c) => r.test(c)), l = o(s.searchParams.values()) ?? o(s.searchParams.keys());
    if (l)
      return i(l);
  }
  if (s.hash) {
    const {
      hash: o
    } = s;
    let l = -1;
    for (const {
      index: h
    } of o.matchAll(/\.pdf\b/gi))
      l = h;
    if (l > 0) {
      let h = l;
      for (; h > 0 && !"/?#=".includes(o[h - 1]); )
        h--;
      if (h < l)
        return i(o.slice(h, l + 4));
    }
  }
  return t;
}
var mn;
class GA {
  constructor() {
    u(this, mn, /* @__PURE__ */ new Map());
    T(this, "times", []);
  }
  time(t) {
    n(this, mn).has(t) && $(`Timer is already running for ${t}`), n(this, mn).set(t, Date.now());
  }
  timeEnd(t) {
    n(this, mn).has(t) || $(`Timer has not been started for ${t}`), this.times.push({
      name: t,
      start: n(this, mn).get(t),
      end: Date.now()
    }), n(this, mn).delete(t);
  }
  toString() {
    const t = Math.max(...this.times.map((e) => e.name.length));
    return this.times.map((e) => `${e.name.padEnd(t)} ${e.end - e.start}ms
`).join("");
  }
}
mn = new WeakMap();
function Cc(g, t) {
  const e = t ? URL.parse(g, t) : URL.parse(g);
  return /https?:/.test((e == null ? void 0 : e.protocol) ?? "");
}
function Us(g) {
  g.preventDefault();
}
function jt(g) {
  g.preventDefault(), g.stopPropagation();
}
var Nc;
class Fp {
  static toDateObject(t) {
    if (t instanceof Date)
      return t;
    if (!t || typeof t != "string")
      return null;
    n(this, Nc) || f(this, Nc, new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+\\-])?(\\d{2})?'?(\\d{2})?'?"));
    const e = n(this, Nc).exec(t);
    if (!e)
      return null;
    const s = parseInt(e[1], 10);
    let i = parseInt(e[2], 10);
    i = i >= 1 && i <= 12 ? i - 1 : 0;
    let r = parseInt(e[3], 10);
    r = r >= 1 && r <= 31 ? r : 1;
    let a = parseInt(e[4], 10);
    a = a >= 0 && a <= 23 ? a : 0;
    let o = parseInt(e[5], 10);
    o = o >= 0 && o <= 59 ? o : 0;
    let l = parseInt(e[6], 10);
    l = l >= 0 && l <= 59 ? l : 0;
    const h = e[7] || "Z";
    let c = parseInt(e[8], 10);
    c = c >= 0 && c <= 23 ? c : 0;
    let d = parseInt(e[9], 10) || 0;
    return d = d >= 0 && d <= 59 ? d : 0, h === "-" ? (a += c, o += d) : h === "+" && (a -= c, o -= d), new Date(Date.UTC(s, i, r, a, o, l));
  }
}
Nc = new WeakMap(), u(Fp, Nc, void 0);
function Ff(g) {
  if (g.startsWith("#")) {
    const e = g.slice(1);
    return [parseInt(e.slice(0, 2), 16), parseInt(e.slice(2, 4), 16), parseInt(e.slice(4, 6), 16), e.length >= 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1];
  }
  if (g.startsWith("rgb(")) {
    const [e, s, i] = g.slice(4, -1).split(",").map((r) => parseInt(r, 10));
    return [e, s, i, 1];
  }
  if (g.startsWith("rgba(")) {
    const e = g.slice(5, -1).split(",");
    return [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10), parseFloat(e[3])];
  }
  const t = g.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+|none))?\)$/);
  return t ? [Math.round(parseFloat(t[1]) * 255), Math.round(parseFloat(t[2]) * 255), Math.round(parseFloat(t[3]) * 255), t[4] !== void 0 && t[4] !== "none" ? parseFloat(t[4]) : 1] : null;
}
function Rf(g) {
  const t = Ff(g);
  return t ? t.slice(0, 3) : ($(`Not a valid color format: "${g}"`), [0, 0, 0]);
}
function rS(g) {
  const t = document.createElement("span");
  t.style.visibility = "hidden", t.style.colorScheme = "only light", document.body.append(t);
  for (const e of g.keys()) {
    t.style.color = e;
    const s = window.getComputedStyle(t).color;
    g.set(e, Rf(s));
  }
  t.remove();
}
function ct(g) {
  const {
    a: t,
    b: e,
    c: s,
    d: i,
    e: r,
    f: a
  } = g.getTransform();
  return [t, e, s, i, r, a];
}
function zs(g) {
  const {
    a: t,
    b: e,
    c: s,
    d: i,
    e: r,
    f: a
  } = g.getTransform().invertSelf();
  return [t, e, s, i, r, a];
}
function To(g, t, e = !1, s = !0) {
  if (t instanceof Lf) {
    const {
      pageWidth: i,
      pageHeight: r
    } = t.rawDims, {
      style: a
    } = g, o = `round(down, var(--total-scale-factor) * ${i}px, var(--scale-round-x))`, l = `round(down, var(--total-scale-factor) * ${r}px, var(--scale-round-y))`;
    !e || t.rotation % 180 === 0 ? (a.width = o, a.height = l) : (a.width = l, a.height = o);
  }
  s && g.setAttribute("data-main-rotation", t.rotation);
}
class Gs {
  constructor() {
    const {
      pixelRatio: t
    } = Gs;
    this.sx = t, this.sy = t;
  }
  get scaled() {
    return this.sx !== 1 || this.sy !== 1;
  }
  get symmetric() {
    return this.sx === this.sy;
  }
  limitCanvas(t, e, s, i, r = -1) {
    let a = 1 / 0, o = 1 / 0, l = 1 / 0;
    s = Gs.capPixels(s, r), s > 0 && (a = Math.sqrt(s / (t * e))), i !== -1 && (o = i / t, l = i / e);
    const h = Math.min(a, o, l);
    return this.sx > h || this.sy > h ? (this.sx = h, this.sy = h, !0) : !1;
  }
  static get pixelRatio() {
    return globalThis.devicePixelRatio || 1;
  }
  static capPixels(t, e) {
    if (e >= 0) {
      const s = Math.ceil(window.screen.availWidth * window.screen.availHeight * this.pixelRatio ** 2 * (1 + e / 100));
      return t > 0 ? Math.min(t, s) : s;
    }
    return t;
  }
}
const Pb = ["image/apng", "image/avif", "image/bmp", "image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp", "image/x-icon"];
class aS {
  static get isDarkMode() {
    var t;
    return H(this, "isDarkMode", !!((t = window == null ? void 0 : window.matchMedia) != null && t.call(window, "(prefers-color-scheme: dark)").matches));
  }
}
class oS {
  static get commentForegroundColor() {
    const t = document.createElement("span");
    t.classList.add("comment", "sidebar");
    const {
      style: e
    } = t;
    e.width = e.height = "0", e.display = "none", e.color = "var(--comment-fg-color)", document.body.append(t);
    const {
      color: s
    } = window.getComputedStyle(t);
    return t.remove(), H(this, "commentForegroundColor", Rf(s));
  }
}
function lS(g, t) {
  t = ut(t ?? 1, 0, 1);
  const e = 255 * (1 - t);
  return g.map((s) => Math.round(s * t + e));
}
function $A(g, t) {
  const e = g[0] / 255, s = g[1] / 255, i = g[2] / 255, r = Math.max(e, s, i), a = Math.min(e, s, i), o = (r + a) / 2;
  if (r === a)
    t[0] = t[1] = 0;
  else {
    const l = r - a;
    switch (t[1] = o < 0.5 ? l / (r + a) : l / (2 - r - a), r) {
      case e:
        t[0] = ((s - i) / l + (s < i ? 6 : 0)) * 60;
        break;
      case s:
        t[0] = ((i - e) / l + 2) * 60;
        break;
      case i:
        t[0] = ((e - s) / l + 4) * 60;
        break;
    }
  }
  t[2] = o;
}
function Mb(g, t) {
  const e = g[0], s = g[1], i = g[2], r = (1 - Math.abs(2 * i - 1)) * s, a = r * (1 - Math.abs(e / 60 % 2 - 1)), o = i - r / 2;
  switch (Math.floor(e / 60)) {
    case 0:
      t[0] = r + o, t[1] = a + o, t[2] = o;
      break;
    case 1:
      t[0] = a + o, t[1] = r + o, t[2] = o;
      break;
    case 2:
      t[0] = o, t[1] = r + o, t[2] = a + o;
      break;
    case 3:
      t[0] = o, t[1] = a + o, t[2] = r + o;
      break;
    case 4:
      t[0] = a + o, t[1] = o, t[2] = r + o;
      break;
    case 5:
    case 6:
      t[0] = r + o, t[1] = o, t[2] = a + o;
      break;
  }
}
function Db(g) {
  return g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
}
function zA(g, t, e) {
  Mb(g, e), e.map(Db);
  const s = 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
  Mb(t, e), e.map(Db);
  const i = 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
  return s > i ? (s + 0.05) / (i + 0.05) : (i + 0.05) / (s + 0.05);
}
const VA = /* @__PURE__ */ new Map();
function hS(g, t) {
  const e = g[0] + g[1] * 256 + g[2] * 65536 + t[0] * 16777216 + t[1] * 4294967296 + t[2] * 1099511627776;
  let s = VA.get(e);
  if (s)
    return s;
  const i = new Float32Array(9), r = i.subarray(0, 3), a = i.subarray(3, 6);
  $A(g, a);
  const o = i.subarray(6, 9);
  $A(t, o);
  const l = o[2] < 0.5, h = l ? 12 : 4.5;
  if (a[2] = l ? Math.sqrt(a[2]) : 1 - Math.sqrt(1 - a[2]), zA(a, o, r) < h) {
    let c, d;
    l ? (c = a[2], d = 1) : (c = 0, d = a[2]);
    const p = 5e-3;
    for (; d - c > p; ) {
      const m = a[2] = (c + d) / 2;
      l === zA(a, o, r) < h ? c = m : d = m;
    }
    a[2] = l ? d : c;
  }
  return Mb(a, r), s = D.makeHexColor(Math.round(r[0] * 255), Math.round(r[1] * 255), Math.round(r[2] * 255)), VA.set(e, s), s;
}
function v0({
  html: g,
  dir: t,
  className: e
}, s) {
  const i = document.createDocumentFragment();
  if (typeof g == "string") {
    const r = document.createElement("p");
    r.dir = t || "auto";
    const a = g.split(/\r\n?|\n/);
    for (let o = 0, l = a.length; o < l; ++o) {
      const h = a[o];
      r.append(document.createTextNode(h)), o < l - 1 && r.append(document.createElement("br"));
    }
    i.append(r);
  } else
    wA.render({
      xfaHtml: g,
      div: i,
      intent: "richText"
    });
  i.firstElementChild.classList.add("richText", e), s.append(i);
}
function S0(g) {
  const t = new Path2D();
  if (!g)
    return t;
  for (let e = 0, s = g.length; e < s; )
    switch (g[e++]) {
      case ec.moveTo:
        t.moveTo(g[e++], g[e++]);
        break;
      case ec.lineTo:
        t.lineTo(g[e++], g[e++]);
        break;
      case ec.curveTo:
        t.bezierCurveTo(g[e++], g[e++], g[e++], g[e++], g[e++], g[e++]);
        break;
      case ec.quadraticCurveTo:
        t.quadraticCurveTo(g[e++], g[e++], g[e++], g[e++]);
        break;
      case ec.closePath:
        t.closePath();
        break;
      default:
        $(`Unrecognized drawing path operator: ${g[e - 1]}`);
        break;
    }
  return t;
}
var bn, yn, rs, as, Bc, An, Vo, jo, Hc, $p, E0, zp, x0, Vp, C0, wn, Ro, Or, nc;
const xi = class xi {
  constructor(t) {
    u(this, zp);
    u(this, Vp);
    u(this, wn);
    u(this, Or);
    u(this, bn, null);
    u(this, yn, null);
    u(this, rs, void 0);
    u(this, as, null);
    u(this, Bc, null);
    u(this, An, null);
    u(this, Vo, null);
    u(this, jo, null);
    f(this, rs, t), n(xi, Hc) || f(xi, Hc, Object.freeze({
      freetext: "pdfjs-editor-remove-freetext-button",
      highlight: "pdfjs-editor-remove-highlight-button",
      ink: "pdfjs-editor-remove-ink-button",
      stamp: "pdfjs-editor-remove-stamp-button",
      signature: "pdfjs-editor-remove-signature-button"
    }));
  }
  render() {
    const t = f(this, bn, document.createElement("div"));
    t.classList.add("editToolbar", "hidden"), t.setAttribute("role", "toolbar");
    const e = n(this, rs)._uiManager._signal;
    e instanceof AbortSignal && !e.aborted && (t.addEventListener("contextmenu", Us, {
      signal: e
    }), t.addEventListener("pointerdown", b(xi, $p, E0), {
      signal: e
    }));
    const s = f(this, as, document.createElement("div"));
    s.className = "buttons", t.append(s);
    const i = n(this, rs).toolbarPosition;
    if (i) {
      const {
        style: r
      } = t, a = n(this, rs)._uiManager.direction === "ltr" ? 1 - i[0] : i[0];
      r.insetInlineEnd = `${100 * a}%`, r.top = `calc(${100 * i[1]}% + var(--editor-toolbar-vert-offset))`;
    }
    return t;
  }
  get div() {
    return n(this, bn);
  }
  hide() {
    var t;
    n(this, bn).classList.add("hidden"), (t = n(this, yn)) == null || t.hideDropdown();
  }
  show() {
    var t, e;
    n(this, bn).classList.remove("hidden"), (t = n(this, Bc)) == null || t.shown(), (e = n(this, An)) == null || e.shown();
  }
  addDeleteButton() {
    const {
      editorType: t,
      _uiManager: e
    } = n(this, rs), s = document.createElement("button");
    s.classList.add("basic", "deleteButton"), s.tabIndex = 0, s.setAttribute("data-l10n-id", n(xi, Hc)[t]), b(this, wn, Ro).call(this, s) && s.addEventListener("click", (i) => {
      e.delete();
    }, {
      signal: e._signal
    }), n(this, as).append(s);
  }
  async addAltText(t) {
    const e = await t.render();
    b(this, wn, Ro).call(this, e), n(this, as).append(e, n(this, Or, nc)), f(this, Bc, t);
  }
  addComment(t, e = null) {
    if (n(this, An))
      return;
    const s = t.renderForToolbar();
    if (!s)
      return;
    b(this, wn, Ro).call(this, s);
    const i = f(this, Vo, n(this, Or, nc));
    e ? (n(this, as).insertBefore(s, e), n(this, as).insertBefore(i, e)) : n(this, as).append(s, i), f(this, An, t), t.toolbar = this;
  }
  addColorPicker(t) {
    if (n(this, yn))
      return;
    f(this, yn, t);
    const e = t.renderButton();
    b(this, wn, Ro).call(this, e), n(this, as).append(e, n(this, Or, nc));
  }
  async addEditSignatureButton(t) {
    const e = f(this, jo, await t.renderEditButton(n(this, rs)));
    b(this, wn, Ro).call(this, e), n(this, as).append(e, n(this, Or, nc));
  }
  removeButton(t) {
    var e, s;
    switch (t) {
      case "comment":
        (e = n(this, An)) == null || e.removeToolbarCommentButton(), f(this, An, null), (s = n(this, Vo)) == null || s.remove(), f(this, Vo, null);
        break;
    }
  }
  async addButton(t, e) {
    switch (t) {
      case "colorPicker":
        e && this.addColorPicker(e);
        break;
      case "altText":
        e && await this.addAltText(e);
        break;
      case "editSignature":
        e && await this.addEditSignatureButton(e);
        break;
      case "delete":
        this.addDeleteButton();
        break;
      case "comment":
        e && this.addComment(e);
        break;
    }
  }
  async addButtonBefore(t, e, s) {
    if (!e && t === "comment")
      return;
    const i = n(this, as).querySelector(s);
    i && t === "comment" && this.addComment(e, i);
  }
  updateEditSignatureButton(t) {
    n(this, jo) && (n(this, jo).title = t);
  }
  remove() {
    var t;
    n(this, bn).remove(), (t = n(this, yn)) == null || t.destroy(), f(this, yn, null);
  }
};
bn = new WeakMap(), yn = new WeakMap(), rs = new WeakMap(), as = new WeakMap(), Bc = new WeakMap(), An = new WeakMap(), Vo = new WeakMap(), jo = new WeakMap(), Hc = new WeakMap(), $p = new WeakSet(), E0 = function(t) {
  t.stopPropagation();
}, zp = new WeakSet(), x0 = function(t) {
  n(this, rs)._focusEventsAllowed = !1, jt(t);
}, Vp = new WeakSet(), C0 = function(t) {
  n(this, rs)._focusEventsAllowed = !0, jt(t);
}, wn = new WeakSet(), Ro = function(t) {
  const e = n(this, rs)._uiManager._signal;
  return !(e instanceof AbortSignal) || e.aborted ? !1 : (t.addEventListener("focusin", b(this, zp, x0).bind(this), {
    capture: !0,
    signal: e
  }), t.addEventListener("focusout", b(this, Vp, C0).bind(this), {
    capture: !0,
    signal: e
  }), t.addEventListener("contextmenu", Us, {
    signal: e
  }), !0);
}, Or = new WeakSet(), nc = function() {
  const t = document.createElement("div");
  return t.className = "divider", t;
}, u(xi, $p), u(xi, Hc, null);
let Ib = xi;
var Uc, Nr, Ys, jp, _0, Wp, T0, Gc, Lb;
class cS {
  constructor(t) {
    u(this, jp);
    u(this, Wp);
    u(this, Gc);
    u(this, Uc, null);
    u(this, Nr, null);
    u(this, Ys, void 0);
    f(this, Ys, t);
  }
  show(t, e, s) {
    const [i, r] = b(this, Wp, T0).call(this, e, s), {
      style: a
    } = n(this, Nr) || f(this, Nr, b(this, jp, _0).call(this));
    t.append(n(this, Nr)), a.insetInlineEnd = `${100 * i}%`, a.top = `calc(${100 * r}% + var(--editor-toolbar-vert-offset))`;
  }
  hide() {
    n(this, Nr).remove();
  }
}
Uc = new WeakMap(), Nr = new WeakMap(), Ys = new WeakMap(), jp = new WeakSet(), _0 = function() {
  const t = f(this, Nr, document.createElement("div"));
  t.className = "editToolbar", t.setAttribute("role", "toolbar"), t.dir = n(this, Ys).direction;
  const e = n(this, Ys)._signal;
  e instanceof AbortSignal && !e.aborted && t.addEventListener("contextmenu", Us, {
    signal: e
  });
  const s = f(this, Uc, document.createElement("div"));
  return s.className = "buttons", t.append(s), n(this, Ys).hasCommentManager() && b(this, Gc, Lb).call(this, "commentButton", "pdfjs-comment-floating-button", "pdfjs-comment-floating-button-label", () => {
    n(this, Ys).commentSelection("floating_button");
  }), b(this, Gc, Lb).call(this, "highlightButton", "pdfjs-highlight-floating-button1", "pdfjs-highlight-floating-button-label", () => {
    n(this, Ys).highlightSelection("floating_button");
  }), t;
}, Wp = new WeakSet(), T0 = function(t, e) {
  let s = 0, i = 0;
  for (const r of t) {
    const a = r.y + r.height;
    if (a < s)
      continue;
    const o = r.x + (e ? r.width : 0);
    if (a > s) {
      i = o, s = a;
      continue;
    }
    e ? o > i && (i = o) : o < i && (i = o);
  }
  return [e ? 1 - i : i, s];
}, Gc = new WeakSet(), Lb = function(t, e, s, i) {
  const r = document.createElement("button");
  r.classList.add("basic", t), r.tabIndex = 0, r.setAttribute("data-l10n-id", e);
  const a = document.createElement("span");
  r.append(a), a.className = "visuallyHidden", a.setAttribute("data-l10n-id", s);
  const o = n(this, Ys)._signal;
  o instanceof AbortSignal && !o.aborted && (r.addEventListener("contextmenu", Us, {
    signal: o
  }), r.addEventListener("click", i, {
    signal: o
  })), n(this, Uc).append(r);
};
const dS = "59968104-cc61-4cf9-b570-014b35b3709c", bb = Object.freeze({
  internal: dS
});
function k0(g, t, e) {
  for (const s of e)
    t.addEventListener(s, g[s].bind(g));
}
var Br, Hr, Wo, Ur;
const tt = class tt {
  static initializeAndAddPointerId(t) {
    (n(tt, Hr) || f(tt, Hr, /* @__PURE__ */ new Set())).add(t);
  }
  static setPointer(t, e) {
    n(tt, Br) || f(tt, Br, e), n(tt, Ur) ?? f(tt, Ur, t);
  }
  static setTimeStamp(t) {
    f(tt, Wo, t);
  }
  static isSamePointerId(t) {
    return n(tt, Br) === t;
  }
  static isSamePointerIdOrRemove(t) {
    var e;
    return n(tt, Br) === t ? !0 : ((e = n(tt, Hr)) == null || e.delete(t), !1);
  }
  static isSamePointerType(t) {
    return n(tt, Ur) === t;
  }
  static isInitializedAndDifferentPointerType(t) {
    return n(tt, Ur) !== null && !tt.isSamePointerType(t);
  }
  static isSameTimeStamp(t) {
    return n(tt, Wo) === t;
  }
  static isUsingMultiplePointers() {
    var t;
    return ((t = n(tt, Hr)) == null ? void 0 : t.size) >= 1;
  }
  static clearPointerType() {
    f(tt, Ur, null);
  }
  static clearPointerIds() {
    f(tt, Br, NaN), f(tt, Hr, null);
  }
  static clearTimeStamp() {
    f(tt, Wo, NaN);
  }
};
Br = new WeakMap(), Hr = new WeakMap(), Wo = new WeakMap(), Ur = new WeakMap(), u(tt, Br, NaN), u(tt, Hr, null), u(tt, Wo, NaN), u(tt, Ur, null);
let ce = tt;
var Xp;
class uS {
  constructor() {
    u(this, Xp, 0);
  }
  get id() {
    return `${Jh}${At(this, Xp)._++}`;
  }
}
Xp = new WeakMap();
var Xo, $c, de, Yo, Yf;
const LA = class LA {
  constructor() {
    u(this, Yo);
    u(this, Xo, w0());
    u(this, $c, 0);
    u(this, de, null);
  }
  static get _isSVGFittingCanvas() {
    const t = `data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="${Ce}"><rect width="1" height="1" style="fill:red;"/></svg>`, s = new OffscreenCanvas(1, 3).getContext("2d", {
      willReadFrequently: !0
    }), i = new Image();
    i.src = t;
    const r = i.decode().then(() => (s.drawImage(i, 0, 0, 1, 1, 0, 0, 1, 3), new Uint32Array(s.getImageData(0, 0, 1, 1).data.buffer)[0] === 0));
    return H(this, "_isSVGFittingCanvas", r);
  }
  async getFromFile(t) {
    const {
      lastModified: e,
      name: s,
      size: i,
      type: r
    } = t;
    return b(this, Yo, Yf).call(this, `${e}_${s}_${i}_${r}`, t);
  }
  async getFromUrl(t) {
    return b(this, Yo, Yf).call(this, t, t);
  }
  async getFromBlob(t, e) {
    const s = await e;
    return b(this, Yo, Yf).call(this, t, s);
  }
  async getFromId(t) {
    n(this, de) || f(this, de, /* @__PURE__ */ new Map());
    const e = n(this, de).get(t);
    if (!e)
      return null;
    if (e.bitmap)
      return e.refCounter += 1, e;
    if (e.file)
      return this.getFromFile(e.file);
    if (e.blobPromise) {
      const {
        blobPromise: s
      } = e;
      return delete e.blobPromise, this.getFromBlob(e.id, s);
    }
    return this.getFromUrl(e.url);
  }
  getFromCanvas(t, e) {
    n(this, de) || f(this, de, /* @__PURE__ */ new Map());
    let s = n(this, de).get(t);
    if (s != null && s.bitmap)
      return s.refCounter += 1, s;
    const i = new OffscreenCanvas(e.width, e.height);
    return i.getContext("2d").drawImage(e, 0, 0), s = {
      bitmap: i.transferToImageBitmap(),
      id: `image_${n(this, Xo)}_${At(this, $c)._++}`,
      refCounter: 1,
      isSvg: !1
    }, n(this, de).set(t, s), n(this, de).set(s.id, s), s;
  }
  getSvgUrl(t) {
    const e = n(this, de).get(t);
    return e != null && e.isSvg ? e.svgUrl : null;
  }
  deleteId(t) {
    var i;
    n(this, de) || f(this, de, /* @__PURE__ */ new Map());
    const e = n(this, de).get(t);
    if (!e || (e.refCounter -= 1, e.refCounter !== 0))
      return;
    const {
      bitmap: s
    } = e;
    if (!e.url && !e.file) {
      const r = new OffscreenCanvas(s.width, s.height);
      r.getContext("bitmaprenderer").transferFromImageBitmap(s), e.blobPromise = r.convertToBlob();
    }
    (i = s.close) == null || i.call(s), e.bitmap = null;
  }
  isValidId(t) {
    return t.startsWith(`image_${n(this, Xo)}_`);
  }
};
Xo = new WeakMap(), $c = new WeakMap(), de = new WeakMap(), Yo = new WeakSet(), Yf = async function(t, e) {
  n(this, de) || f(this, de, /* @__PURE__ */ new Map());
  let s = n(this, de).get(t);
  if (s === null)
    return null;
  if (s != null && s.bitmap)
    return s.refCounter += 1, s;
  try {
    s || (s = {
      bitmap: null,
      id: `image_${n(this, Xo)}_${At(this, $c)._++}`,
      refCounter: 0,
      isSvg: !1
    });
    let i;
    if (typeof e == "string" ? (s.url = e, i = await vA(e, "blob")) : e instanceof File ? i = s.file = e : e instanceof Blob && (i = e), i.type === "image/svg+xml") {
      const r = LA._isSVGFittingCanvas, a = new FileReader(), o = new Image(), l = new Promise((h, c) => {
        o.onload = () => {
          s.bitmap = o, s.isSvg = !0, h();
        }, a.onload = async () => {
          const d = s.svgUrl = a.result;
          o.src = await r ? `${d}#svgView(preserveAspectRatio(none))` : d;
        }, o.onerror = a.onerror = c;
      });
      a.readAsDataURL(i), await l;
    } else
      s.bitmap = await createImageBitmap(i);
    s.refCounter = 1;
  } catch (i) {
    $(i), s = null;
  }
  return n(this, de).set(t, s), s && n(this, de).set(s.id, s), s;
};
let Fb = LA;
var Dt, vn, zc, vt;
class fS {
  constructor(t = 128) {
    u(this, Dt, []);
    u(this, vn, !1);
    u(this, zc, void 0);
    u(this, vt, -1);
    f(this, zc, t);
  }
  add({
    cmd: t,
    undo: e,
    post: s,
    mustExec: i,
    type: r = NaN,
    overwriteIfSameType: a = !1,
    keepUndo: o = !1
  }) {
    if (i && t(), n(this, vn))
      return;
    const l = {
      cmd: t,
      undo: e,
      post: s,
      type: r
    };
    if (n(this, vt) === -1) {
      n(this, Dt).length > 0 && (n(this, Dt).length = 0), f(this, vt, 0), n(this, Dt).push(l);
      return;
    }
    if (a && n(this, Dt)[n(this, vt)].type === r) {
      o && (l.undo = n(this, Dt)[n(this, vt)].undo), n(this, Dt)[n(this, vt)] = l;
      return;
    }
    const h = n(this, vt) + 1;
    h === n(this, zc) ? n(this, Dt).splice(0, 1) : (f(this, vt, h), h < n(this, Dt).length && n(this, Dt).splice(h)), n(this, Dt).push(l);
  }
  undo() {
    if (n(this, vt) === -1)
      return;
    f(this, vn, !0);
    const {
      undo: t,
      post: e
    } = n(this, Dt)[n(this, vt)];
    t(), e == null || e(), f(this, vn, !1), f(this, vt, n(this, vt) - 1);
  }
  redo() {
    if (n(this, vt) < n(this, Dt).length - 1) {
      f(this, vt, n(this, vt) + 1), f(this, vn, !0);
      const {
        cmd: t,
        post: e
      } = n(this, Dt)[n(this, vt)];
      t(), e == null || e(), f(this, vn, !1);
    }
  }
  hasSomethingToUndo() {
    return n(this, vt) !== -1;
  }
  hasSomethingToRedo() {
    return n(this, vt) < n(this, Dt).length - 1;
  }
  cleanType(t) {
    if (n(this, vt) !== -1) {
      for (let e = n(this, vt); e >= 0; e--)
        if (n(this, Dt)[e].type !== t) {
          n(this, Dt).splice(e + 1, n(this, vt) - e), f(this, vt, e);
          return;
        }
      n(this, Dt).length = 0, f(this, vt, -1);
    }
  }
  destroy() {
    f(this, Dt, null);
  }
}
Dt = new WeakMap(), vn = new WeakMap(), zc = new WeakMap(), vt = new WeakMap();
var Yp, P0, Kp, M0;
const ye = class ye {
  constructor(t) {
    var s;
    this.callbacks = /* @__PURE__ */ new Map();
    const {
      isMac: e
    } = rt.platform;
    for (const [i, r, a = {}] of t) {
      const o = i.some((l) => l.startsWith("mac+"));
      for (const l of i) {
        let h = l;
        if (o) {
          const p = l.startsWith("mac+");
          if (e !== p)
            continue;
          p && (h = l.slice(4));
        }
        const [c, d] = b(s = ye, Yp, P0).call(s, h);
        c !== null && this.callbacks.getOrInsertComputed(c, Zh).push({
          callback: r,
          options: a,
          modifiers: d
        });
      }
    }
  }
  exec(t, e) {
    var c;
    let s = this.callbacks.get(e.key);
    if (!s) {
      if (/^[a-z]$/i.test(e.key))
        return;
      const d = b(c = ye, Kp, M0).call(c, e.code);
      if (d === null || d === e.key || (s = this.callbacks.get(d), !s))
        return;
    }
    const i = (e.altKey ? ye.ALT : 0) | (e.ctrlKey ? ye.CTRL : 0) | (e.metaKey ? ye.META : 0) | (e.shiftKey ? ye.SHIFT : 0), r = s.find((d) => d.modifiers === i);
    if (!r)
      return;
    const {
      callback: a,
      options: {
        bubbles: o = !1,
        args: l = [],
        checker: h = null
      }
    } = r;
    h && !h(t, e) || (a.bind(t, ...l, e)(), o || jt(e));
  }
};
Yp = new WeakSet(), P0 = function(t) {
  let e = null, s = 0;
  for (let i of t.split("+")) {
    if (i = i.trim(), !i)
      continue;
    const r = i.toUpperCase(), a = ye[r];
    if (a) {
      s |= a;
      continue;
    }
    if (e !== null) {
      $(`KeyboardManager: multiple keys in shortcut "${t}"`);
      break;
    }
    e = r === "SPACE" ? " " : i;
  }
  return e === null && $(`KeyboardManager: no key found in shortcut "${t}"`), [e, s];
}, Kp = new WeakSet(), M0 = function(t) {
  var s;
  const e = /^(?:Key([A-Z])|(?:Digit|Numpad)(\d))$/.exec(t);
  return e ? ((s = e[1]) == null ? void 0 : s.toLowerCase()) ?? e[2] : null;
}, u(ye, Yp), u(ye, Kp), T(ye, "ALT", 1), T(ye, "CTRL", 2), T(ye, "META", 4), T(ye, "SHIFT", 8);
let ko = ye;
const qp = class qp {
  get _colors() {
    const t = /* @__PURE__ */ new Map([["CanvasText", null], ["Canvas", null]]);
    return rS(t), H(this, "_colors", t);
  }
  convert(t) {
    const e = Rf(t);
    if (!window.matchMedia("(forced-colors: active)").matches)
      return e;
    for (const [s, i] of this._colors)
      if (i.every((r, a) => r === e[a]))
        return qp._colorsMapping.get(s);
    return e;
  }
  getHexCode(t) {
    const e = this._colors.get(t);
    return e ? D.makeHexColor(...e) : t;
  }
};
T(qp, "_colorsMapping", /* @__PURE__ */ new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]));
let Rb = qp;
var Ko, Be, qo, gt, St, Qo, Jo, Zo, ue, tl, os, Yt, Sn, En, xn, Cn, Ks, ls, Gr, Vc, jc, el, Wc, qs, _n, sl, Tn, Qs, Qp, _i, il, Xc, kn, $r, nl, Pn, Yc, Ot, et, Ti, Mn, Dn, Kc, rl, qc, In, Js, ki, Qc, Jc, hs, al, Kf, Zc, Ob, Jp, D0, Zp, I0, zr, rc, tg, L0, eg, F0, sg, R0, td, Nb, ig, O0, ng, N0, rg, B0, ag, H0, ee, be, xs, Si, og, U0, lg, G0, ed, Bb, hg, $0, Vr, ac, sd, Hb;
const Uo = class Uo {
  constructor(t, e, s, i, r, a, o, l, h, c, d, p, m, y, A, v) {
    u(this, al);
    u(this, Zc);
    u(this, Jp);
    u(this, Zp);
    u(this, zr);
    u(this, tg);
    u(this, eg);
    u(this, sg);
    u(this, td);
    u(this, ig);
    u(this, ng);
    u(this, rg);
    u(this, ag);
    u(this, ee);
    u(this, xs);
    u(this, og);
    u(this, lg);
    u(this, ed);
    u(this, hg);
    u(this, Vr);
    u(this, sd);
    u(this, Ko, new AbortController());
    u(this, Be, null);
    u(this, qo, null);
    u(this, gt, /* @__PURE__ */ new Map());
    u(this, St, /* @__PURE__ */ new Map());
    u(this, Qo, null);
    u(this, Jo, null);
    u(this, Zo, null);
    u(this, ue, null);
    u(this, tl, null);
    u(this, os, new fS());
    u(this, Yt, null);
    u(this, Sn, null);
    u(this, En, null);
    u(this, xn, 0);
    u(this, Cn, /* @__PURE__ */ new Set());
    u(this, Ks, null);
    u(this, ls, null);
    u(this, Gr, /* @__PURE__ */ new Set());
    T(this, "_editorUndoBar", null);
    u(this, Vc, !1);
    u(this, jc, !1);
    u(this, el, !1);
    u(this, Wc, null);
    u(this, qs, null);
    u(this, _n, null);
    u(this, sl, null);
    u(this, Tn, !1);
    u(this, Qs, null);
    u(this, Qp, new uS());
    u(this, _i, !1);
    u(this, il, !1);
    u(this, Xc, !1);
    u(this, kn, null);
    u(this, $r, null);
    u(this, nl, null);
    u(this, Pn, null);
    u(this, Yc, null);
    u(this, Ot, G.NONE);
    u(this, et, /* @__PURE__ */ new Set());
    u(this, Ti, null);
    u(this, Mn, null);
    u(this, Dn, null);
    u(this, Kc, null);
    u(this, rl, null);
    u(this, qc, {
      isEditing: !1,
      isEmpty: !0,
      hasSomethingToUndo: !1,
      hasSomethingToRedo: !1,
      hasSelectedEditor: !1,
      hasSelectedText: !1
    });
    u(this, In, [0, 0]);
    u(this, Js, null);
    u(this, ki, null);
    u(this, Qc, null);
    u(this, Jc, null);
    u(this, hs, null);
    const w = this._signal = n(this, Ko).signal;
    f(this, ki, t), f(this, Qc, e), f(this, Jc, s), f(this, Zo, i), f(this, Yt, r), f(this, Mn, a), f(this, rl, l), this._eventBus = o;
    const S = {
      signal: w,
      ...bb
    };
    o.on("editingaction", this.onEditingAction.bind(this), S), o.on("pagechanging", this.onPageChanging.bind(this), S), o.on("scalechanging", this.onScaleChanging.bind(this), S), o.on("rotationchanging", this.onRotationChanging.bind(this), S), o.on("setpreference", this.onSetPreference.bind(this), S), o.on("switchannotationeditorparams", (E) => this.updateParams(E.type, E.value), S), window.addEventListener("pointerdown", () => {
      f(this, il, !0);
    }, {
      capture: !0,
      signal: w
    }), window.addEventListener("pointerup", () => {
      f(this, il, !1);
    }, {
      capture: !0,
      signal: w
    }), window.addEventListener("beforeunload", this.endCurrentEditing.bind(this), {
      capture: !0,
      signal: w
    }), b(this, tg, L0).call(this), b(this, ag, H0).call(this), b(this, td, Nb).call(this), f(this, ue, l.annotationStorage), f(this, Wc, l.filterFactory), f(this, Dn, h), f(this, sl, c || null), f(this, Vc, d), f(this, jc, p), f(this, el, m), f(this, Yc, y || null), this.viewParameters = {
      realScale: xr.PDF_TO_CSS_UNITS,
      rotation: 0
    }, this.isShiftKeyDown = !1, this._editorUndoBar = A || null, this._supportsPinchToZoom = v !== !1, r == null || r.setSidebarUiManager(this);
  }
  static get _keyboardManager() {
    const t = Uo.prototype, e = (a) => n(a, ki).contains(document.activeElement) && document.activeElement.tagName !== "BUTTON" && a.hasSomethingToControl(), s = (a, {
      target: o
    }) => {
      if (o instanceof HTMLInputElement) {
        const {
          type: l
        } = o;
        return l !== "text" && l !== "number";
      }
      return !0;
    }, i = this.TRANSLATE_SMALL, r = this.TRANSLATE_BIG;
    return H(this, "_keyboardManager", new ko([[["ctrl+a", "mac+meta+a"], t.selectAll, {
      checker: s
    }], [["ctrl+z", "mac+meta+z"], t.undo, {
      checker: s
    }], [["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"], t.redo, {
      checker: s
    }], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete", "mac+Delete"], t.delete, {
      checker: s
    }], [["Enter"], t.addNewEditorFromKeyboard, {
      checker: (a, {
        target: o
      }) => !(o instanceof HTMLButtonElement) && n(a, ki).contains(o) && !a.isEnterHandled
    }], [["Space"], t.addNewEditorFromKeyboard, {
      checker: (a, {
        target: o
      }) => !(o instanceof HTMLButtonElement) && n(a, ki).contains(document.activeElement)
    }], [["Escape"], t.unselectAll], [["ArrowLeft"], t.translateSelectedEditors, {
      args: [-i, 0],
      checker: e
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t.translateSelectedEditors, {
      args: [-r, 0],
      checker: e
    }], [["ArrowRight"], t.translateSelectedEditors, {
      args: [i, 0],
      checker: e
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t.translateSelectedEditors, {
      args: [r, 0],
      checker: e
    }], [["ArrowUp"], t.translateSelectedEditors, {
      args: [0, -i],
      checker: e
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t.translateSelectedEditors, {
      args: [0, -r],
      checker: e
    }], [["ArrowDown"], t.translateSelectedEditors, {
      args: [0, i],
      checker: e
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t.translateSelectedEditors, {
      args: [0, r],
      checker: e
    }]]));
  }
  destroy() {
    var t, e, s, i, r, a, o, l, h;
    (t = n(this, hs)) == null || t.resolve(), f(this, hs, null), (e = n(this, Ko)) == null || e.abort(), f(this, Ko, null), this._signal = null;
    for (const c of n(this, St).values())
      c.destroy();
    n(this, St).clear(), n(this, gt).clear(), n(this, Gr).clear(), (s = n(this, Pn)) == null || s.clear(), f(this, Be, null), n(this, et).clear(), n(this, os).destroy(), (i = n(this, Zo)) == null || i.destroy(), (r = n(this, Yt)) == null || r.destroy(), (a = n(this, Mn)) == null || a.destroy(), (o = n(this, Qs)) == null || o.hide(), f(this, Qs, null), (l = n(this, nl)) == null || l.destroy(), f(this, nl, null), f(this, qo, null), n(this, qs) && (clearTimeout(n(this, qs)), f(this, qs, null)), n(this, Js) && (clearTimeout(n(this, Js)), f(this, Js, null)), (h = this._editorUndoBar) == null || h.destroy(), f(this, rl, null);
  }
  combinedSignal(t) {
    return AbortSignal.any([this._signal, t.signal]);
  }
  get mlManager() {
    return n(this, Yc);
  }
  get useNewAltTextFlow() {
    return n(this, jc);
  }
  get useNewAltTextWhenAddingImage() {
    return n(this, el);
  }
  get hcmFilter() {
    return H(this, "hcmFilter", n(this, Dn) ? n(this, Wc).addHCMFilter(n(this, Dn).foreground, n(this, Dn).background) : "none");
  }
  get direction() {
    return H(this, "direction", getComputedStyle(n(this, ki)).direction);
  }
  get _highlightColors() {
    return H(this, "_highlightColors", n(this, sl) ? new Map(n(this, sl).split(",").map((t) => (t = t.split("=").map((e) => e.trim()), t[1] = t[1].toUpperCase(), t))) : null);
  }
  get highlightColors() {
    const {
      _highlightColors: t
    } = this;
    if (!t)
      return H(this, "highlightColors", null);
    const e = /* @__PURE__ */ new Map(), s = !!n(this, Dn);
    for (const [i, r] of t) {
      const a = i.endsWith("_HCM");
      if (s && a) {
        e.set(i.replace("_HCM", ""), r);
        continue;
      }
      !s && !a && e.set(i, r);
    }
    return H(this, "highlightColors", e);
  }
  get highlightColorNames() {
    return H(this, "highlightColorNames", this.highlightColors ? new Map(Array.from(this.highlightColors, (t) => t.reverse())) : null);
  }
  getNonHCMColor(t) {
    if (!this._highlightColors)
      return t;
    const e = this.highlightColorNames.get(t);
    return this._highlightColors.get(e) || t;
  }
  getNonHCMColorName(t) {
    return this.highlightColorNames.get(t) || t;
  }
  setCurrentDrawingSession(t) {
    t ? (this.unselectAll(), this.disableUserSelect(!0)) : this.disableUserSelect(!1), f(this, En, t);
  }
  setMainHighlightColorPicker(t) {
    f(this, nl, t);
  }
  editAltText(t, e = !1) {
    var s;
    (s = n(this, Zo)) == null || s.editAltText(this, t, e);
  }
  hasCommentManager() {
    return !!n(this, Yt);
  }
  editComment(t, e, s, i) {
    var r;
    (r = n(this, Yt)) == null || r.showDialog(this, t, e, s, i);
  }
  selectComment(t, e) {
    const s = n(this, St).get(t), i = s == null ? void 0 : s.getEditorByUID(e);
    i == null || i.toggleComment(!0, !0);
  }
  updateComment(t) {
    var e;
    (e = n(this, Yt)) == null || e.updateComment(t.getData());
  }
  updatePopupColor(t) {
    var e;
    (e = n(this, Yt)) == null || e.updatePopupColor(t);
  }
  removeComment(t) {
    var e;
    (e = n(this, Yt)) == null || e.removeComments([t.uid]);
  }
  deleteComment(t, e) {
    const s = () => {
      t.comment = e;
    }, i = () => {
      var r;
      (r = this._editorUndoBar) == null || r.show(s, "comment"), this.toggleComment(null), t.comment = null;
    };
    this.addCommands({
      cmd: i,
      undo: s,
      mustExec: !0
    });
  }
  toggleComment(t, e, s = void 0) {
    var i;
    (i = n(this, Yt)) == null || i.toggleCommentPopup(t, e, s);
  }
  makeCommentColor(t, e) {
    var s;
    return t && ((s = n(this, Yt)) == null ? void 0 : s.makeCommentColor(t, e)) || null;
  }
  getCommentDialogElement() {
    var t;
    return ((t = n(this, Yt)) == null ? void 0 : t.dialogElement) || null;
  }
  async waitForEditorsRendered(t) {
    if (n(this, St).has(t - 1))
      return;
    const {
      resolve: e,
      promise: s
    } = Promise.withResolvers(), i = (r) => {
      r.pageNumber === t && (this._eventBus.off("editorsrendered", i), e());
    };
    this._eventBus.on("editorsrendered", i, bb), await s;
  }
  getSignature(t) {
    var e;
    (e = n(this, Mn)) == null || e.getSignature({
      uiManager: this,
      editor: t
    });
  }
  get signatureManager() {
    return n(this, Mn);
  }
  switchToMode(t, e) {
    this._eventBus.on("annotationeditormodechanged", e, {
      once: !0,
      signal: this._signal,
      ...bb
    }), this._eventBus.dispatch("showannotationeditorui", {
      source: this,
      mode: t
    });
  }
  setPreference(t, e) {
    this._eventBus.dispatch("setpreference", {
      source: this,
      name: t,
      value: e
    });
  }
  onSetPreference({
    name: t,
    value: e
  }) {
    switch (t) {
      case "enableNewAltTextWhenAddingImage":
        f(this, el, e);
        break;
    }
  }
  onPageChanging({
    pageNumber: t
  }) {
    f(this, xn, t - 1);
  }
  deletePage(t) {
    for (const e of this.getEditors(t))
      e.remove();
    n(this, St).delete(t), n(this, xn) === t && f(this, xn, 0);
  }
  focusMainContainer() {
    n(this, ki).focus();
  }
  findParent(t, e) {
    for (const s of n(this, St).values()) {
      const {
        x: i,
        y: r,
        width: a,
        height: o
      } = s.div.getBoundingClientRect();
      if (t >= i && t <= i + a && e >= r && e <= r + o)
        return s;
    }
    return null;
  }
  disableUserSelect(t = !1) {
    n(this, Qc).classList.toggle("noUserSelect", t);
  }
  addShouldRescale(t) {
    n(this, Gr).add(t);
  }
  removeShouldRescale(t) {
    n(this, Gr).delete(t);
  }
  onScaleChanging({
    scale: t
  }) {
    var e;
    this.commitOrRemove(), this.viewParameters.realScale = t * xr.PDF_TO_CSS_UNITS;
    for (const s of n(this, Gr))
      s.onScaleChanging();
    (e = n(this, En)) == null || e.onScaleChanging();
  }
  onRotationChanging({
    pagesRotation: t
  }) {
    this.commitOrRemove(), this.viewParameters.rotation = t;
  }
  highlightSelection(t = "", e = !1) {
    const s = document.getSelection();
    if (!s || s.isCollapsed)
      return;
    const {
      anchorNode: i,
      anchorOffset: r,
      focusNode: a,
      focusOffset: o
    } = s, l = s.toString(), c = b(this, al, Kf).call(this, s).closest(".textLayer"), d = this.getSelectionBoxes(c);
    if (!d)
      return;
    s.empty();
    const p = b(this, Zc, Ob).call(this, c), m = n(this, Ot) === G.NONE, y = () => {
      const A = p == null ? void 0 : p.createAndAddNewEditor({
        x: 0,
        y: 0
      }, !1, {
        methodOfCreation: t,
        boxes: d,
        anchorNode: i,
        anchorOffset: r,
        focusNode: a,
        focusOffset: o,
        text: l
      });
      m && this.showAllEditors("highlight", !0, !0), e && (A == null || A.editComment());
    };
    if (m) {
      this.switchToMode(G.HIGHLIGHT, y);
      return;
    }
    y();
  }
  commentSelection(t = "") {
    this.highlightSelection(t, !0);
  }
  endCurrentEditing() {
    var t;
    this.commitOrRemove(), (t = this.currentLayer) == null || t.endDrawingSession(!1);
  }
  getAndRemoveDataFromAnnotationStorage(t) {
    if (!n(this, ue))
      return null;
    const e = `${Jh}${t}`, s = n(this, ue).getRawValue(e);
    return s && n(this, ue).remove(e), s;
  }
  addToAnnotationStorage(t) {
    !t.isEmpty() && n(this, ue) && !n(this, ue).has(t.id) && n(this, ue).setValue(t.id, t);
  }
  a11yAlert(t, e = null) {
    const s = n(this, Jc);
    s && (s.setAttribute("data-l10n-id", t), e ? s.setAttribute("data-l10n-args", JSON.stringify(e)) : s.removeAttribute("data-l10n-args"));
  }
  blur() {
    if (this.isShiftKeyDown = !1, n(this, Tn) && (f(this, Tn, !1), b(this, zr, rc).call(this, "main_toolbar")), !this.hasSelection)
      return;
    const {
      activeElement: t
    } = document;
    for (const e of n(this, et))
      if (e.div.contains(t)) {
        f(this, $r, [e, t]), e._focusEventsAllowed = !1;
        break;
      }
  }
  focus() {
    if (!n(this, $r))
      return;
    const [t, e] = n(this, $r);
    f(this, $r, null), e.addEventListener("focusin", () => {
      t._focusEventsAllowed = !0;
    }, {
      once: !0,
      signal: this._signal
    }), e.focus();
  }
  addEditListeners() {
    b(this, td, Nb).call(this), this.setEditingState(!0);
  }
  removeEditListeners() {
    b(this, ig, O0).call(this), this.setEditingState(!1);
  }
  dragOver(t) {
    for (const {
      type: e
    } of t.dataTransfer.items)
      for (const s of n(this, ls))
        if (s.isHandlingMimeForPasting(e)) {
          t.dataTransfer.dropEffect = "copy", t.preventDefault();
          return;
        }
  }
  drop(t) {
    for (const e of t.dataTransfer.items)
      for (const s of n(this, ls))
        if (s.isHandlingMimeForPasting(e.type)) {
          s.paste(e, this.currentLayer), t.preventDefault();
          return;
        }
  }
  copy(t) {
    var s;
    if (t.preventDefault(), (s = n(this, Be)) == null || s.commitOrRemove(), !this.hasSelection)
      return;
    const e = [];
    for (const i of n(this, et)) {
      const r = i.serialize(!0);
      r && e.push(r);
    }
    e.length !== 0 && t.clipboardData.setData("application/pdfjs", JSON.stringify(e));
  }
  cut(t) {
    this.copy(t), this.delete();
  }
  async paste(t) {
    t.preventDefault();
    const {
      clipboardData: e
    } = t;
    for (const r of e.items)
      for (const a of n(this, ls))
        if (a.isHandlingMimeForPasting(r.type)) {
          a.paste(r, this.currentLayer);
          return;
        }
    let s = e.getData("application/pdfjs");
    if (!s)
      return;
    try {
      s = JSON.parse(s);
    } catch (r) {
      $(`paste: "${r.message}".`);
      return;
    }
    if (!Array.isArray(s))
      return;
    this.unselectAll();
    const i = this.currentLayer;
    try {
      const r = [];
      for (const l of s) {
        const h = await i.deserialize(l);
        if (!h)
          return;
        r.push(h);
      }
      const a = () => {
        for (const l of r)
          b(this, ed, Bb).call(this, l);
        b(this, sd, Hb).call(this, r);
      }, o = () => {
        for (const l of r)
          l.remove();
      };
      this.addCommands({
        cmd: a,
        undo: o,
        mustExec: !0
      });
    } catch (r) {
      $(`paste: "${r.message}".`);
    }
  }
  keydown(t) {
    !this.isShiftKeyDown && t.key === "Shift" && (this.isShiftKeyDown = !0), n(this, Ot) !== G.NONE && !this.isEditorHandlingKeyboard && Uo._keyboardManager.exec(this, t);
  }
  keyup(t) {
    this.isShiftKeyDown && t.key === "Shift" && (this.isShiftKeyDown = !1, n(this, Tn) && (f(this, Tn, !1), b(this, zr, rc).call(this, "main_toolbar")));
  }
  onEditingAction({
    name: t
  }) {
    switch (t) {
      case "undo":
      case "redo":
      case "delete":
      case "selectAll":
        this[t]();
        break;
      case "highlightSelection":
        this.highlightSelection("context_menu");
        break;
      case "commentSelection":
        this.commentSelection("context_menu");
        break;
    }
  }
  updatePageIndex(t, e) {
    for (const i of n(this, Jo).get(t) || [])
      i.pageIndex = e;
    const s = n(this, Qo).get(t);
    s && (s.pageIndex = e, n(this, St).set(e, s), n(this, _i) ? s.enable() : s.disable());
  }
  startUpdatePages() {
    f(this, Qo, new Map(n(this, St))), n(this, St).clear();
    const t = f(this, Jo, /* @__PURE__ */ new Map()), e = (s) => {
      t.getOrInsertComputed(s.pageIndex, Zh).push(s);
    };
    for (const s of n(this, gt).values())
      e(s);
    for (const [s, i] of n(this, ue))
      s.startsWith(Jh) && !n(this, gt).has(s) && Number.isInteger(i == null ? void 0 : i.pageIndex) && e(i);
  }
  endUpdatePages() {
    f(this, Qo, null), f(this, Jo, null);
  }
  clonePage(t, e) {
    for (const s of this.getEditors(t)) {
      const i = s.serialize(s.mode !== G.HIGHLIGHT);
      i && (i.pageIndex = e, i.id = this.getId(), i.isClone = !0, delete i.popupRef, n(this, ue).setValue(i.id, i));
    }
  }
  findClonesForPage(t) {
    const e = [], {
      pageIndex: s
    } = t;
    for (const [i, r] of n(this, ue))
      r.pageIndex === s && r.isClone && (n(this, ue).remove(i), e.push(t.deserialize(r).then((a) => {
        a && (a.isClone = !0, t.addOrRebuild(a));
      })));
    return Promise.all(e);
  }
  setEditingState(t) {
    t ? (b(this, eg, F0).call(this), b(this, ng, N0).call(this), b(this, ee, be).call(this, {
      isEditing: n(this, Ot) !== G.NONE,
      isEmpty: b(this, Vr, ac).call(this),
      hasSomethingToUndo: n(this, os).hasSomethingToUndo(),
      hasSomethingToRedo: n(this, os).hasSomethingToRedo(),
      hasSelectedEditor: !1
    })) : (b(this, sg, R0).call(this), b(this, rg, B0).call(this), b(this, ee, be).call(this, {
      isEditing: !1
    }), this.disableUserSelect(!1));
  }
  registerEditorTypes(t) {
    if (!n(this, ls)) {
      f(this, ls, t);
      for (const e of n(this, ls))
        b(this, xs, Si).call(this, e.defaultPropertiesToUpdate);
    }
  }
  getId() {
    return n(this, Qp).id;
  }
  get currentLayer() {
    return n(this, St).get(n(this, xn));
  }
  getLayer(t) {
    return n(this, St).get(t);
  }
  get currentPageIndex() {
    return n(this, xn);
  }
  addLayer(t) {
    n(this, St).set(t.pageIndex, t), n(this, _i) ? t.enable() : t.disable();
  }
  removeLayer(t) {
    n(this, St).delete(t.pageIndex);
  }
  async updateMode(t, e = null, s = !1, i = !1, r = !1, a = !1) {
    var o, l, h, c, d, p;
    if (n(this, Ot) !== t && !(n(this, hs) && (await n(this, hs).promise, !n(this, hs)))) {
      if (f(this, hs, Promise.withResolvers()), (o = n(this, En)) == null || o.commitOrRemove(), n(this, Ot) === G.POPUP && ((l = n(this, Yt)) == null || l.hideSidebar()), (h = n(this, Yt)) == null || h.destroyPopup(), f(this, Ot, t), t === G.NONE) {
        this.setEditingState(!1), b(this, lg, G0).call(this);
        for (const m of n(this, gt).values())
          m.hideStandaloneCommentButton();
        (c = this._editorUndoBar) == null || c.hide(), this.toggleComment(null), n(this, hs).resolve();
        return;
      }
      for (const m of n(this, gt).values())
        m.addStandaloneCommentButton();
      t === G.SIGNATURE && await ((d = n(this, Mn)) == null ? void 0 : d.loadSignatures()), s && ce.clearPointerType(), this.setEditingState(!0), await b(this, og, U0).call(this), this.unselectAll();
      for (const m of n(this, St).values())
        m.updateMode(t);
      if (t === G.POPUP) {
        n(this, qo) || f(this, qo, await n(this, rl).getAnnotationsByType(new Set(n(this, ls).map((A) => A._editorType))));
        const m = /* @__PURE__ */ new Set(), y = [];
        for (const A of n(this, gt).values()) {
          const {
            annotationElementId: v,
            hasComment: w,
            deleted: S
          } = A;
          v && m.add(v), w && !S && y.push(A.getData());
        }
        for (const A of n(this, qo)) {
          const {
            id: v,
            popupRef: w,
            contentsObj: S
          } = A;
          w && (S != null && S.str) && !m.has(v) && !n(this, Cn).has(v) && y.push(A);
        }
        (p = n(this, Yt)) == null || p.showSidebar(y);
      }
      if (!e) {
        i && this.addNewEditorFromKeyboard(), n(this, hs).resolve();
        return;
      }
      for (const m of n(this, gt).values())
        m.uid === e ? (this.setSelected(m), a ? m.editComment() : r ? m.enterInEditMode() : m.focus()) : m.unselect();
      n(this, hs).resolve();
    }
  }
  addNewEditorFromKeyboard() {
    this.currentLayer.canCreateNewEmptyEditor() && this.currentLayer.addNewEditor();
  }
  updateToolbar(t) {
    t.mode !== n(this, Ot) && this._eventBus.dispatch("switchannotationeditormode", {
      source: this,
      ...t
    });
  }
  updateParams(t, e) {
    if (n(this, ls)) {
      switch (t) {
        case Y.CREATE:
          this.currentLayer.addNewEditor(e);
          return;
        case Y.HIGHLIGHT_SHOW_ALL:
          this._eventBus.dispatch("reporttelemetry", {
            source: this,
            details: {
              type: "editing",
              data: {
                type: "highlight",
                action: "toggle_visibility"
              }
            }
          }), (n(this, Kc) || f(this, Kc, /* @__PURE__ */ new Map())).set(t, e), this.showAllEditors("highlight", e);
          break;
      }
      if (this.hasSelection)
        for (const s of n(this, et))
          s.updateParams(t, e);
      else
        for (const s of n(this, ls))
          s.updateDefaultParams(t, e);
    }
  }
  showAllEditors(t, e, s = !1) {
    var r;
    for (const a of n(this, gt).values())
      a.editorType === t && a.show(e);
    (((r = n(this, Kc)) == null ? void 0 : r.get(Y.HIGHLIGHT_SHOW_ALL)) ?? !0) !== e && b(this, xs, Si).call(this, [[Y.HIGHLIGHT_SHOW_ALL, e]]);
  }
  enableWaiting(t = !1) {
    if (n(this, Xc) !== t) {
      f(this, Xc, t);
      for (const e of n(this, St).values())
        t ? e.disableClick() : e.enableClick(), e.div.classList.toggle("waiting", t);
    }
  }
  *getEditors(t) {
    for (const e of n(this, gt).values())
      e.pageIndex === t && (yield e);
  }
  getEditor(t) {
    return n(this, gt).get(t);
  }
  addEditor(t) {
    n(this, gt).set(t.id, t);
  }
  removeEditor(t) {
    var e, s;
    t.div.contains(document.activeElement) && (n(this, qs) && clearTimeout(n(this, qs)), f(this, qs, setTimeout(() => {
      this.focusMainContainer(), f(this, qs, null);
    }, 0))), n(this, gt).delete(t.id), t.annotationElementId && ((e = n(this, Pn)) == null || e.delete(t.annotationElementId)), this.unselect(t), (!t.annotationElementId || !n(this, Cn).has(t.annotationElementId)) && ((s = n(this, ue)) == null || s.remove(t.id));
  }
  addDeletedAnnotationElement(t) {
    n(this, Cn).add(t.annotationElementId), this.addChangedExistingAnnotation(t), t.deleted = !0;
  }
  isDeletedAnnotationElement(t) {
    return n(this, Cn).has(t);
  }
  removeDeletedAnnotationElement(t) {
    n(this, Cn).delete(t.annotationElementId), this.removeChangedExistingAnnotation(t), t.deleted = !1;
  }
  setActiveEditor(t) {
    n(this, Be) !== t && (f(this, Be, t), t && b(this, xs, Si).call(this, t.propertiesToUpdate));
  }
  updateUI(t) {
    n(this, hg, $0) === t && b(this, xs, Si).call(this, t.propertiesToUpdate);
  }
  updateUIForDefaultProperties(t) {
    b(this, xs, Si).call(this, t.defaultPropertiesToUpdate);
  }
  toggleSelected(t) {
    if (n(this, et).has(t)) {
      n(this, et).delete(t), t.unselect(), b(this, ee, be).call(this, {
        hasSelectedEditor: this.hasSelection
      });
      return;
    }
    n(this, et).add(t), t.select(), b(this, xs, Si).call(this, t.propertiesToUpdate), b(this, ee, be).call(this, {
      hasSelectedEditor: !0
    });
  }
  setSelected(t) {
    var e, s;
    this.updateToolbar({
      mode: t.mode,
      editId: t.uid
    }), (e = n(this, En)) == null || e.commitOrRemove();
    for (const i of n(this, et))
      i !== t && i.unselect();
    (s = n(this, Yt)) == null || s.destroyPopup(), n(this, et).clear(), n(this, et).add(t), t.select(), b(this, xs, Si).call(this, t.propertiesToUpdate), b(this, ee, be).call(this, {
      hasSelectedEditor: !0
    });
  }
  get firstSelectedEditor() {
    return n(this, et).values().next().value;
  }
  unselect(t) {
    t.unselect(), n(this, et).delete(t), b(this, ee, be).call(this, {
      hasSelectedEditor: this.hasSelection
    });
  }
  get hasSelection() {
    return n(this, et).size !== 0;
  }
  get isEnterHandled() {
    return n(this, et).size === 1 && this.firstSelectedEditor.isEnterHandled;
  }
  undo() {
    var t;
    n(this, os).undo(), b(this, ee, be).call(this, {
      hasSomethingToUndo: n(this, os).hasSomethingToUndo(),
      hasSomethingToRedo: !0,
      isEmpty: b(this, Vr, ac).call(this)
    }), (t = this._editorUndoBar) == null || t.hide();
  }
  redo() {
    n(this, os).redo(), b(this, ee, be).call(this, {
      hasSomethingToUndo: !0,
      hasSomethingToRedo: n(this, os).hasSomethingToRedo(),
      isEmpty: b(this, Vr, ac).call(this)
    });
  }
  addCommands(t) {
    n(this, os).add(t), b(this, ee, be).call(this, {
      hasSomethingToUndo: !0,
      hasSomethingToRedo: !1,
      isEmpty: b(this, Vr, ac).call(this)
    });
  }
  cleanUndoStack(t) {
    n(this, os).cleanType(t);
  }
  delete() {
    var r;
    this.commitOrRemove();
    const t = (r = this.currentLayer) == null ? void 0 : r.endDrawingSession(!0);
    if (!this.hasSelection && !t)
      return;
    const e = t ? [t] : [...n(this, et)], s = () => {
      var a;
      (a = this._editorUndoBar) == null || a.show(i, e.length === 1 ? e[0].editorType : e.length);
      for (const o of e)
        o.remove();
    }, i = () => {
      for (const a of e)
        b(this, ed, Bb).call(this, a);
    };
    this.addCommands({
      cmd: s,
      undo: i,
      mustExec: !0
    });
  }
  commitOrRemove() {
    var t;
    (t = n(this, Be)) == null || t.commitOrRemove();
  }
  hasSomethingToControl() {
    return n(this, Be) || this.hasSelection;
  }
  selectAll() {
    for (const t of n(this, et))
      t.commit();
    b(this, sd, Hb).call(this, n(this, gt).values());
  }
  unselectAll() {
    var t, e;
    if (!(n(this, Be) && (n(this, Be).commitOrRemove(), n(this, Ot) !== G.NONE)) && !((t = n(this, En)) != null && t.commitOrRemove()) && ((e = n(this, Yt)) == null || e.destroyPopup(), !!this.hasSelection)) {
      for (const s of n(this, et))
        s.unselect();
      n(this, et).clear(), b(this, ee, be).call(this, {
        hasSelectedEditor: !1
      });
    }
  }
  translateSelectedEditors(t, e, s = !1) {
    if (s || this.commitOrRemove(), !this.hasSelection)
      return;
    n(this, In)[0] += t, n(this, In)[1] += e;
    const [i, r] = n(this, In), a = [...n(this, et)], o = 1e3;
    n(this, Js) && clearTimeout(n(this, Js)), f(this, Js, setTimeout(() => {
      f(this, Js, null), n(this, In)[0] = n(this, In)[1] = 0, this.addCommands({
        cmd: () => {
          for (const l of a)
            n(this, gt).has(l.id) && (l.translateInPage(i, r), l.translationDone());
        },
        undo: () => {
          for (const l of a)
            n(this, gt).has(l.id) && (l.translateInPage(-i, -r), l.translationDone());
        },
        mustExec: !1
      });
    }, o));
    for (const l of a)
      l.translateInPage(t, e), l.translationDone();
  }
  setUpDragSession() {
    if (this.hasSelection) {
      this.disableUserSelect(!0), f(this, Ks, /* @__PURE__ */ new Map());
      for (const t of n(this, et))
        n(this, Ks).set(t, {
          savedX: t.x,
          savedY: t.y,
          savedPageIndex: t.pageIndex,
          newX: 0,
          newY: 0,
          newPageIndex: -1
        });
    }
  }
  endDragSession() {
    if (!n(this, Ks))
      return !1;
    this.disableUserSelect(!1);
    const t = n(this, Ks);
    f(this, Ks, null);
    let e = !1;
    for (const [{
      x: i,
      y: r,
      pageIndex: a
    }, o] of t)
      o.newX = i, o.newY = r, o.newPageIndex = a, e || (e = i !== o.savedX || r !== o.savedY || a !== o.savedPageIndex);
    if (!e)
      return !1;
    const s = (i, r, a, o) => {
      if (n(this, gt).has(i.id)) {
        const l = n(this, St).get(o);
        l ? i._setParentAndPosition(l, r, a) : (i.pageIndex = o, i.x = r, i.y = a);
      }
    };
    return this.addCommands({
      cmd: () => {
        for (const [i, {
          newX: r,
          newY: a,
          newPageIndex: o
        }] of t)
          s(i, r, a, o);
      },
      undo: () => {
        for (const [i, {
          savedX: r,
          savedY: a,
          savedPageIndex: o
        }] of t)
          s(i, r, a, o);
      },
      mustExec: !0
    }), !0;
  }
  dragSelectedEditors(t, e) {
    if (n(this, Ks))
      for (const s of n(this, Ks).keys())
        s.drag(t, e);
  }
  rebuild(t) {
    if (t.parent === null) {
      const e = this.getLayer(t.pageIndex);
      e ? (e.changeParent(t), e.addOrRebuild(t)) : (this.addEditor(t), this.addToAnnotationStorage(t), t.rebuild());
    } else
      t.parent.addOrRebuild(t);
  }
  get isEditorHandlingKeyboard() {
    var t;
    return ((t = this.getActive()) == null ? void 0 : t.shouldGetKeyboardEvents()) || n(this, et).size === 1 && this.firstSelectedEditor.shouldGetKeyboardEvents();
  }
  isActive(t) {
    return n(this, Be) === t;
  }
  getActive() {
    return n(this, Be);
  }
  getMode() {
    return n(this, Ot);
  }
  isEditingMode() {
    return n(this, Ot) !== G.NONE;
  }
  get imageManager() {
    return H(this, "imageManager", new Fb());
  }
  getSelectionBoxes(t) {
    if (!t)
      return null;
    const e = document.getSelection();
    for (let h = 0, c = e.rangeCount; h < c; h++)
      if (!t.contains(e.getRangeAt(h).commonAncestorContainer))
        return null;
    const {
      x: s,
      y: i,
      width: r,
      height: a
    } = t.getBoundingClientRect();
    let o;
    switch (t.getAttribute("data-main-rotation")) {
      case "90":
        o = (h, c, d, p) => ({
          x: (c - i) / a,
          y: 1 - (h + d - s) / r,
          width: p / a,
          height: d / r
        });
        break;
      case "180":
        o = (h, c, d, p) => ({
          x: 1 - (h + d - s) / r,
          y: 1 - (c + p - i) / a,
          width: d / r,
          height: p / a
        });
        break;
      case "270":
        o = (h, c, d, p) => ({
          x: 1 - (c + p - i) / a,
          y: (h - s) / r,
          width: p / a,
          height: d / r
        });
        break;
      default:
        o = (h, c, d, p) => ({
          x: (h - s) / r,
          y: (c - i) / a,
          width: d / r,
          height: p / a
        });
        break;
    }
    const l = [];
    for (let h = 0, c = e.rangeCount; h < c; h++) {
      const d = e.getRangeAt(h);
      if (!d.collapsed)
        for (const {
          x: p,
          y: m,
          width: y,
          height: A
        } of d.getClientRects())
          y === 0 || A === 0 || l.push(o(p, m, y, A));
    }
    return l.length === 0 ? null : l;
  }
  addChangedExistingAnnotation({
    annotationElementId: t,
    id: e
  }) {
    (n(this, tl) || f(this, tl, /* @__PURE__ */ new Map())).set(t, e);
  }
  removeChangedExistingAnnotation({
    annotationElementId: t
  }) {
    var e;
    (e = n(this, tl)) == null || e.delete(t);
  }
  renderAnnotationElement(t) {
    var i;
    const e = (i = n(this, tl)) == null ? void 0 : i.get(t.data.id);
    if (!e)
      return;
    const s = n(this, ue).getRawValue(e);
    s && (n(this, Ot) === G.NONE && !s.hasBeenModified || s.renderAnnotationElement(t));
  }
  setMissingCanvas(t, e, s) {
    var r;
    const i = (r = n(this, Pn)) == null ? void 0 : r.get(t);
    i && (i.setCanvas(e, s), n(this, Pn).delete(t));
  }
  addMissingCanvas(t, e) {
    (n(this, Pn) || f(this, Pn, /* @__PURE__ */ new Map())).set(t, e);
  }
};
Ko = new WeakMap(), Be = new WeakMap(), qo = new WeakMap(), gt = new WeakMap(), St = new WeakMap(), Qo = new WeakMap(), Jo = new WeakMap(), Zo = new WeakMap(), ue = new WeakMap(), tl = new WeakMap(), os = new WeakMap(), Yt = new WeakMap(), Sn = new WeakMap(), En = new WeakMap(), xn = new WeakMap(), Cn = new WeakMap(), Ks = new WeakMap(), ls = new WeakMap(), Gr = new WeakMap(), Vc = new WeakMap(), jc = new WeakMap(), el = new WeakMap(), Wc = new WeakMap(), qs = new WeakMap(), _n = new WeakMap(), sl = new WeakMap(), Tn = new WeakMap(), Qs = new WeakMap(), Qp = new WeakMap(), _i = new WeakMap(), il = new WeakMap(), Xc = new WeakMap(), kn = new WeakMap(), $r = new WeakMap(), nl = new WeakMap(), Pn = new WeakMap(), Yc = new WeakMap(), Ot = new WeakMap(), et = new WeakMap(), Ti = new WeakMap(), Mn = new WeakMap(), Dn = new WeakMap(), Kc = new WeakMap(), rl = new WeakMap(), qc = new WeakMap(), In = new WeakMap(), Js = new WeakMap(), ki = new WeakMap(), Qc = new WeakMap(), Jc = new WeakMap(), hs = new WeakMap(), al = new WeakSet(), Kf = function({
  anchorNode: t
}) {
  return t.nodeType === Node.TEXT_NODE ? t.parentElement : t;
}, Zc = new WeakSet(), Ob = function(t) {
  const {
    currentLayer: e
  } = this;
  if (e.hasTextLayer(t))
    return e;
  for (const s of n(this, St).values())
    if (s.hasTextLayer(t))
      return s;
  return null;
}, Jp = new WeakSet(), D0 = function() {
  const t = document.getSelection();
  if (!t || t.isCollapsed)
    return;
  const s = b(this, al, Kf).call(this, t).closest(".textLayer"), i = this.getSelectionBoxes(s);
  i && (n(this, Qs) || f(this, Qs, new cS(this)), n(this, Qs).show(s, i, this.direction === "ltr"));
}, Zp = new WeakSet(), I0 = function() {
  var r, a, o;
  const t = document.getSelection();
  if (!t || t.isCollapsed) {
    n(this, Ti) && ((r = n(this, Qs)) == null || r.hide(), f(this, Ti, null), b(this, ee, be).call(this, {
      hasSelectedText: !1
    }));
    return;
  }
  const {
    anchorNode: e
  } = t;
  if (e === n(this, Ti))
    return;
  const i = b(this, al, Kf).call(this, t).closest(".textLayer");
  if (!i) {
    n(this, Ti) && ((a = n(this, Qs)) == null || a.hide(), f(this, Ti, null), b(this, ee, be).call(this, {
      hasSelectedText: !1
    }));
    return;
  }
  if ((o = n(this, Qs)) == null || o.hide(), f(this, Ti, e), b(this, ee, be).call(this, {
    hasSelectedText: !0
  }), !(n(this, Ot) !== G.HIGHLIGHT && n(this, Ot) !== G.NONE) && (n(this, Ot) === G.HIGHLIGHT && this.showAllEditors("highlight", !0, !0), f(this, Tn, this.isShiftKeyDown), !this.isShiftKeyDown)) {
    const l = n(this, Ot) === G.HIGHLIGHT ? b(this, Zc, Ob).call(this, i) : null;
    if (l == null || l.toggleDrawing(), n(this, il)) {
      const h = new AbortController(), c = this.combinedSignal(h), d = (p) => {
        p.type === "pointerup" && p.button !== 0 || (h.abort(), l == null || l.toggleDrawing(!0), p.type === "pointerup" && b(this, zr, rc).call(this, "main_toolbar"));
      };
      window.addEventListener("pointerup", d, {
        signal: c
      }), window.addEventListener("blur", d, {
        signal: c
      });
    } else
      l == null || l.toggleDrawing(!0), b(this, zr, rc).call(this, "main_toolbar");
  }
}, zr = new WeakSet(), rc = function(t = "") {
  n(this, Ot) === G.HIGHLIGHT ? this.highlightSelection(t) : n(this, Vc) && b(this, Jp, D0).call(this);
}, tg = new WeakSet(), L0 = function() {
  document.addEventListener("selectionchange", b(this, Zp, I0).bind(this), {
    signal: this._signal
  });
}, eg = new WeakSet(), F0 = function() {
  if (n(this, _n))
    return;
  f(this, _n, new AbortController());
  const t = this.combinedSignal(n(this, _n));
  window.addEventListener("focus", this.focus.bind(this), {
    signal: t
  }), window.addEventListener("blur", this.blur.bind(this), {
    signal: t
  });
}, sg = new WeakSet(), R0 = function() {
  var t;
  (t = n(this, _n)) == null || t.abort(), f(this, _n, null);
}, td = new WeakSet(), Nb = function() {
  if (n(this, kn))
    return;
  f(this, kn, new AbortController());
  const t = this.combinedSignal(n(this, kn));
  window.addEventListener("keydown", this.keydown.bind(this), {
    signal: t
  }), window.addEventListener("keyup", this.keyup.bind(this), {
    signal: t
  });
}, ig = new WeakSet(), O0 = function() {
  var t;
  (t = n(this, kn)) == null || t.abort(), f(this, kn, null);
}, ng = new WeakSet(), N0 = function() {
  if (n(this, Sn))
    return;
  f(this, Sn, new AbortController());
  const t = this.combinedSignal(n(this, Sn));
  document.addEventListener("copy", this.copy.bind(this), {
    signal: t
  }), document.addEventListener("cut", this.cut.bind(this), {
    signal: t
  }), document.addEventListener("paste", this.paste.bind(this), {
    signal: t
  });
}, rg = new WeakSet(), B0 = function() {
  var t;
  (t = n(this, Sn)) == null || t.abort(), f(this, Sn, null);
}, ag = new WeakSet(), H0 = function() {
  const t = this._signal;
  document.addEventListener("dragover", this.dragOver.bind(this), {
    signal: t
  }), document.addEventListener("drop", this.drop.bind(this), {
    signal: t
  });
}, ee = new WeakSet(), be = function(t) {
  Object.entries(t).some(([s, i]) => n(this, qc)[s] !== i) && (this._eventBus.dispatch("editingstateschanged", {
    source: this,
    details: Object.assign(n(this, qc), t)
  }), n(this, Ot) === G.HIGHLIGHT && t.hasSelectedEditor === !1 && b(this, xs, Si).call(this, [[Y.HIGHLIGHT_FREE, !0]]));
}, xs = new WeakSet(), Si = function(t) {
  this._eventBus.dispatch("annotationeditorparamschanged", {
    source: this,
    details: t
  });
}, og = new WeakSet(), U0 = async function() {
  if (!n(this, _i)) {
    f(this, _i, !0);
    const t = [];
    for (const e of n(this, St).values())
      t.push(e.enable());
    await Promise.all(t);
    for (const e of n(this, gt).values())
      e.enable();
  }
}, lg = new WeakSet(), G0 = function() {
  if (this.unselectAll(), n(this, _i)) {
    f(this, _i, !1);
    for (const t of n(this, St).values())
      t.disable();
    for (const t of n(this, gt).values())
      t.disable();
  }
}, ed = new WeakSet(), Bb = function(t) {
  const e = n(this, St).get(t.pageIndex);
  e ? e.addOrRebuild(t) : (this.addEditor(t), this.addToAnnotationStorage(t));
}, hg = new WeakSet(), $0 = function() {
  let t = null;
  for (t of n(this, et))
    ;
  return t;
}, Vr = new WeakSet(), ac = function() {
  if (n(this, gt).size === 0)
    return !0;
  if (n(this, gt).size === 1)
    for (const t of n(this, gt).values())
      return t.isEmpty();
  return !1;
}, sd = new WeakSet(), Hb = function(t) {
  for (const e of n(this, et))
    e.unselect();
  n(this, et).clear();
  for (const e of t)
    e.isEmpty() || (n(this, et).add(e), e.select());
  b(this, ee, be).call(this, {
    hasSelectedEditor: this.hasSelection
  });
}, T(Uo, "TRANSLATE_SMALL", 1), T(Uo, "TRANSLATE_BIG", 10);
let Po = Uo;
var Kt, Zs, Cs, ol, ti, He, ll, ei, Me, Pi, jr, si, Ln, Wr, oc, hl, qf;
const Ae = class Ae {
  constructor(t) {
    u(this, Wr);
    u(this, hl);
    u(this, Kt, null);
    u(this, Zs, !1);
    u(this, Cs, null);
    u(this, ol, null);
    u(this, ti, null);
    u(this, He, null);
    u(this, ll, !1);
    u(this, ei, null);
    u(this, Me, null);
    u(this, Pi, null);
    u(this, jr, null);
    u(this, si, !1);
    f(this, Me, t), f(this, si, t._uiManager.useNewAltTextFlow), n(Ae, Ln) || f(Ae, Ln, Object.freeze({
      added: "pdfjs-editor-new-alt-text-added-button",
      "added-label": "pdfjs-editor-new-alt-text-added-button-label",
      missing: "pdfjs-editor-new-alt-text-missing-button",
      "missing-label": "pdfjs-editor-new-alt-text-missing-button-label",
      review: "pdfjs-editor-new-alt-text-to-review-button",
      "review-label": "pdfjs-editor-new-alt-text-to-review-button-label"
    }));
  }
  static initialize(t) {
    Ae._l10n ?? (Ae._l10n = t);
  }
  async render() {
    const t = f(this, Cs, document.createElement("button"));
    t.className = "altText", t.tabIndex = "0";
    const e = f(this, ol, document.createElement("span"));
    t.append(e), n(this, si) ? (t.classList.add("new"), t.setAttribute("data-l10n-id", n(Ae, Ln).missing), e.setAttribute("data-l10n-id", n(Ae, Ln)["missing-label"])) : (t.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-button"), e.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-button-label"));
    const s = n(this, Me)._uiManager._signal;
    t.addEventListener("contextmenu", Us, {
      signal: s
    }), t.addEventListener("pointerdown", (r) => r.stopPropagation(), {
      signal: s
    });
    const i = (r) => {
      r.preventDefault(), n(this, Me)._uiManager.editAltText(n(this, Me)), n(this, si) && n(this, Me)._reportTelemetry({
        action: "pdfjs.image.alt_text.image_status_label_clicked",
        data: {
          label: n(this, Wr, oc)
        }
      });
    };
    return t.addEventListener("click", i, {
      capture: !0,
      signal: s
    }), t.addEventListener("keydown", (r) => {
      r.target === t && r.key === "Enter" && (f(this, ll, !0), i(r));
    }, {
      signal: s
    }), await b(this, hl, qf).call(this), t;
  }
  finish() {
    n(this, Cs) && (n(this, Cs).focus({
      focusVisible: n(this, ll)
    }), f(this, ll, !1));
  }
  isEmpty() {
    return n(this, si) ? n(this, Kt) === null : !n(this, Kt) && !n(this, Zs);
  }
  hasData() {
    return n(this, si) ? n(this, Kt) !== null || !!n(this, Pi) : this.isEmpty();
  }
  get guessedText() {
    return n(this, Pi);
  }
  async setGuessedText(t) {
    n(this, Kt) === null && (f(this, Pi, t), f(this, jr, await Ae._l10n.get("pdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer", {
      generatedAltText: t
    })), b(this, hl, qf).call(this));
  }
  toggleAltTextBadge(t = !1) {
    var e;
    if (!n(this, si) || n(this, Kt)) {
      (e = n(this, ei)) == null || e.remove(), f(this, ei, null);
      return;
    }
    if (!n(this, ei)) {
      const s = f(this, ei, document.createElement("div"));
      s.className = "noAltTextBadge", n(this, Me).div.append(s);
    }
    n(this, ei).classList.toggle("hidden", !t);
  }
  serialize(t) {
    let e = n(this, Kt);
    return !t && n(this, Pi) === e && (e = n(this, jr)), {
      altText: e,
      decorative: n(this, Zs),
      guessedText: n(this, Pi),
      textWithDisclaimer: n(this, jr)
    };
  }
  get data() {
    return {
      altText: n(this, Kt),
      decorative: n(this, Zs)
    };
  }
  set data({
    altText: t,
    decorative: e,
    guessedText: s,
    textWithDisclaimer: i,
    cancel: r = !1
  }) {
    s && (f(this, Pi, s), f(this, jr, i)), !(n(this, Kt) === t && n(this, Zs) === e) && (r || (f(this, Kt, t), f(this, Zs, e)), b(this, hl, qf).call(this));
  }
  toggle(t = !1) {
    n(this, Cs) && (!t && n(this, He) && (clearTimeout(n(this, He)), f(this, He, null)), n(this, Cs).disabled = !t);
  }
  shown() {
    n(this, Me)._reportTelemetry({
      action: "pdfjs.image.alt_text.image_status_label_displayed",
      data: {
        label: n(this, Wr, oc)
      }
    });
  }
  destroy() {
    var t, e;
    (t = n(this, Cs)) == null || t.remove(), f(this, Cs, null), f(this, ol, null), f(this, ti, null), (e = n(this, ei)) == null || e.remove(), f(this, ei, null);
  }
};
Kt = new WeakMap(), Zs = new WeakMap(), Cs = new WeakMap(), ol = new WeakMap(), ti = new WeakMap(), He = new WeakMap(), ll = new WeakMap(), ei = new WeakMap(), Me = new WeakMap(), Pi = new WeakMap(), jr = new WeakMap(), si = new WeakMap(), Ln = new WeakMap(), Wr = new WeakSet(), oc = function() {
  return n(this, Kt) && "added" || n(this, Kt) === null && this.guessedText && "review" || "missing";
}, hl = new WeakSet(), qf = async function() {
  var i, r, a;
  const t = n(this, Cs);
  if (!t)
    return;
  if (n(this, si)) {
    if (t.classList.toggle("done", !!n(this, Kt)), t.setAttribute("data-l10n-id", n(Ae, Ln)[n(this, Wr, oc)]), (i = n(this, ol)) == null || i.setAttribute("data-l10n-id", n(Ae, Ln)[`${n(this, Wr, oc)}-label`]), !n(this, Kt)) {
      (r = n(this, ti)) == null || r.remove();
      return;
    }
  } else {
    if (!n(this, Kt) && !n(this, Zs)) {
      t.classList.remove("done"), (a = n(this, ti)) == null || a.remove();
      return;
    }
    t.classList.add("done"), t.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-edit-button");
  }
  let e = n(this, ti);
  if (!e) {
    f(this, ti, e = document.createElement("span")), e.className = "tooltip", e.setAttribute("role", "tooltip"), e.id = `alt-text-tooltip-${n(this, Me).id}`;
    const o = 100, l = n(this, Me)._uiManager._signal;
    l.addEventListener("abort", () => {
      clearTimeout(n(this, He)), f(this, He, null);
    }, {
      once: !0
    }), t.addEventListener("mouseenter", () => {
      f(this, He, setTimeout(() => {
        f(this, He, null), n(this, ti).classList.add("show"), n(this, Me)._reportTelemetry({
          action: "alt_text_tooltip"
        });
      }, o));
    }, {
      signal: l
    }), t.addEventListener("mouseleave", () => {
      var h;
      n(this, He) && (clearTimeout(n(this, He)), f(this, He, null)), (h = n(this, ti)) == null || h.classList.remove("show");
    }, {
      signal: l
    });
  }
  n(this, Zs) ? e.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-decorative-tooltip") : (e.removeAttribute("data-l10n-id"), e.textContent = n(this, Kt)), e.parentNode || t.append(e);
  const s = n(this, Me).getElementForAltText();
  s == null || s.setAttribute("aria-describedby", e.id);
}, u(Ae, Ln, null), T(Ae, "_l10n", null);
let Rp = Ae;
var se, cs, Xr, ht, id, Fn, ds, Rn, On, Yr, nd, Ub;
class Nf {
  constructor(t) {
    u(this, nd);
    u(this, se, null);
    u(this, cs, null);
    u(this, Xr, !1);
    u(this, ht, null);
    u(this, id, null);
    u(this, Fn, null);
    u(this, ds, null);
    u(this, Rn, null);
    u(this, On, !1);
    u(this, Yr, null);
    f(this, ht, t);
  }
  renderForToolbar() {
    const t = f(this, cs, document.createElement("button"));
    return t.className = "comment", b(this, nd, Ub).call(this, t, !1);
  }
  renderForStandalone() {
    const t = f(this, se, document.createElement("button"));
    t.className = "annotationCommentButton";
    const e = n(this, ht).commentButtonPosition;
    if (e) {
      const {
        style: s
      } = t;
      s.insetInlineEnd = `calc(${100 * (n(this, ht)._uiManager.direction === "ltr" ? 1 - e[0] : e[0])}% - var(--comment-button-dim))`, s.top = `calc(${100 * e[1]}% - var(--comment-button-dim))`;
      const i = n(this, ht).commentButtonColor;
      i && (s.backgroundColor = i);
    }
    return b(this, nd, Ub).call(this, t, !0);
  }
  focusButton() {
    setTimeout(() => {
      var t;
      (t = n(this, se) ?? n(this, cs)) == null || t.focus();
    }, 0);
  }
  onUpdatedColor() {
    if (!n(this, se))
      return;
    const t = n(this, ht).commentButtonColor;
    t && (n(this, se).style.backgroundColor = t), n(this, ht)._uiManager.updatePopupColor(n(this, ht));
  }
  get commentButtonWidth() {
    var t;
    return (((t = n(this, se)) == null ? void 0 : t.getBoundingClientRect().width) ?? 0) / n(this, ht).parent.boundingClientRect.width;
  }
  get commentPopupPositionInLayer() {
    if (n(this, Yr))
      return n(this, Yr);
    if (!n(this, se))
      return null;
    const {
      x: t,
      y: e,
      height: s
    } = n(this, se).getBoundingClientRect(), {
      x: i,
      y: r,
      width: a,
      height: o
    } = n(this, ht).parent.boundingClientRect;
    return [(t - i) / a, (e + s - r) / o];
  }
  set commentPopupPositionInLayer(t) {
    f(this, Yr, t);
  }
  hasDefaultPopupPosition() {
    return n(this, Yr) === null;
  }
  removeStandaloneCommentButton() {
    var t;
    (t = n(this, se)) == null || t.remove(), f(this, se, null);
  }
  removeToolbarCommentButton() {
    var t;
    (t = n(this, cs)) == null || t.remove(), f(this, cs, null);
  }
  setCommentButtonStates({
    selected: t,
    hasPopup: e
  }) {
    n(this, se) && (n(this, se).classList.toggle("selected", t), n(this, se).ariaExpanded = e);
  }
  edit(t) {
    const e = this.commentPopupPositionInLayer;
    let s, i;
    if (e)
      [s, i] = e;
    else {
      [s, i] = n(this, ht).commentButtonPosition;
      const {
        width: c,
        height: d,
        x: p,
        y: m
      } = n(this, ht);
      s = p + s * c, i = m + i * d;
    }
    const r = n(this, ht).parent.boundingClientRect, {
      x: a,
      y: o,
      width: l,
      height: h
    } = r;
    n(this, ht)._uiManager.editComment(n(this, ht), a + s * l, o + i * h, {
      ...t,
      parentDimensions: r
    });
  }
  finish() {
    n(this, cs) && (n(this, cs).focus({
      focusVisible: n(this, Xr)
    }), f(this, Xr, !1));
  }
  isDeleted() {
    return n(this, On) || n(this, ds) === "";
  }
  isEmpty() {
    return n(this, ds) === null;
  }
  hasBeenEdited() {
    return this.isDeleted() || n(this, ds) !== n(this, id);
  }
  serialize() {
    return this.data;
  }
  get data() {
    return {
      text: n(this, ds),
      richText: n(this, Fn),
      date: n(this, Rn),
      deleted: this.isDeleted()
    };
  }
  set data(t) {
    if (t !== n(this, ds) && f(this, Fn, null), t === null) {
      f(this, ds, ""), f(this, On, !0);
      return;
    }
    f(this, ds, t), f(this, Rn, /* @__PURE__ */ new Date()), f(this, On, !1);
  }
  restoreData({
    text: t,
    richText: e,
    date: s
  }) {
    f(this, ds, t), f(this, Fn, e), f(this, Rn, s), f(this, On, !1);
  }
  setInitialText(t, e = null) {
    f(this, id, t), this.data = t, f(this, Rn, null), f(this, Fn, e);
  }
  shown() {
  }
  destroy() {
    var t, e;
    (t = n(this, cs)) == null || t.remove(), f(this, cs, null), (e = n(this, se)) == null || e.remove(), f(this, se, null), f(this, ds, ""), f(this, Fn, null), f(this, Rn, null), f(this, ht, null), f(this, Xr, !1), f(this, On, !1);
  }
}
se = new WeakMap(), cs = new WeakMap(), Xr = new WeakMap(), ht = new WeakMap(), id = new WeakMap(), Fn = new WeakMap(), ds = new WeakMap(), Rn = new WeakMap(), On = new WeakMap(), Yr = new WeakMap(), nd = new WeakSet(), Ub = function(t, e) {
  if (!n(this, ht)._uiManager.hasCommentManager())
    return null;
  t.tabIndex = "0", t.ariaHasPopup = "dialog", e ? (t.ariaControls = "commentPopup", t.setAttribute("data-l10n-id", "pdfjs-show-comment-button")) : (t.ariaControlsElements = [n(this, ht)._uiManager.getCommentDialogElement()], t.setAttribute("data-l10n-id", "pdfjs-editor-add-comment-button"));
  const s = n(this, ht)._uiManager._signal;
  if (!(s instanceof AbortSignal) || s.aborted)
    return t;
  t.addEventListener("contextmenu", Us, {
    signal: s
  }), e && (t.addEventListener("focusin", (r) => {
    n(this, ht)._focusEventsAllowed = !1, jt(r);
  }, {
    capture: !0,
    signal: s
  }), t.addEventListener("focusout", (r) => {
    n(this, ht)._focusEventsAllowed = !0, jt(r);
  }, {
    capture: !0,
    signal: s
  })), t.addEventListener("pointerdown", (r) => r.stopPropagation(), {
    signal: s
  });
  const i = (r) => {
    r.preventDefault(), t === n(this, cs) ? this.edit() : n(this, ht).toggleComment(!0);
  };
  return t.addEventListener("click", i, {
    capture: !0,
    signal: s
  }), t.addEventListener("keydown", (r) => {
    r.target === t && r.key === "Enter" && (f(this, Xr, !0), i(r));
  }, {
    signal: s
  }), t.addEventListener("pointerenter", () => {
    n(this, ht).toggleComment(!1, !0);
  }, {
    signal: s
  }), t.addEventListener("pointerleave", () => {
    n(this, ht).toggleComment(!1, !1);
  }, {
    signal: s
  }), t;
};
function jA(g) {
  g.preventDefault();
}
const WA = 1e-4;
function yb(g) {
  return g.cancelable ? (jt(g), !0) : (g.stopPropagation(), !1);
}
var cl, Nn, rd, ad, od, ld, hd, Kr, Bn, Mi, qr, ii, Di, Qr, Ii, Hn, cg, V0, cd, Gb, dd, $b, ud, zb, dl, Qf, dg, j0, ug, W0, fd, Vb;
class z0 {
  constructor({
    container: t,
    isPinchingDisabled: e = null,
    isPinchingStopped: s = null,
    onPinchStart: i = null,
    onPinching: r = null,
    onPinchEnd: a = null,
    onPanning: o = null,
    signal: l
  }) {
    u(this, cg);
    u(this, cd);
    u(this, dd);
    u(this, ud);
    u(this, dl);
    u(this, dg);
    u(this, ug);
    u(this, fd);
    u(this, cl, void 0);
    u(this, Nn, !1);
    u(this, rd, null);
    u(this, ad, void 0);
    u(this, od, void 0);
    u(this, ld, void 0);
    u(this, hd, void 0);
    u(this, Kr, void 0);
    u(this, Bn, !1);
    u(this, Mi, null);
    u(this, qr, void 0);
    u(this, ii, /* @__PURE__ */ new Set());
    u(this, Di, null);
    u(this, Qr, void 0);
    u(this, Ii, null);
    u(this, Hn, 0);
    f(this, cl, t), f(this, rd, s), f(this, ad, e), f(this, od, i), f(this, ld, r), f(this, hd, a), f(this, Kr, o), f(this, Qr, new AbortController()), f(this, qr, AbortSignal.any([l, n(this, Qr).signal])), t.addEventListener("touchstart", b(this, cg, V0).bind(this), {
      passive: !1,
      signal: n(this, qr)
    });
  }
  get MIN_TOUCH_DISTANCE_TO_PINCH() {
    return 35 / Gs.pixelRatio;
  }
  get MIN_TOUCH_DISTANCE_TO_SCALE() {
    return 4 / Gs.pixelRatio;
  }
  destroy() {
    var t, e;
    b(this, fd, Vb).call(this), n(this, ii).clear(), (t = n(this, Qr)) == null || t.abort(), f(this, Qr, null), (e = n(this, Mi)) == null || e.abort(), f(this, Mi, null);
  }
}
cl = new WeakMap(), Nn = new WeakMap(), rd = new WeakMap(), ad = new WeakMap(), od = new WeakMap(), ld = new WeakMap(), hd = new WeakMap(), Kr = new WeakMap(), Bn = new WeakMap(), Mi = new WeakMap(), qr = new WeakMap(), ii = new WeakMap(), Di = new WeakMap(), Qr = new WeakMap(), Ii = new WeakMap(), Hn = new WeakMap(), cg = new WeakSet(), V0 = function(t) {
  var s, i;
  if ((s = n(this, ad)) != null && s.call(this))
    return;
  b(this, dd, $b).call(this, t);
  const e = n(this, ii);
  for (const {
    identifier: r
  } of t.changedTouches)
    e.add(r);
  if (e.size === 1) {
    b(this, cd, Gb).call(this);
    return;
  }
  if (!n(this, Ii)) {
    f(this, Ii, new AbortController());
    const r = AbortSignal.any([n(this, qr), n(this, Ii).signal]), a = n(this, cl), o = {
      signal: r,
      capture: !1,
      passive: !1
    };
    a.addEventListener("touchmove", b(this, dg, j0).bind(this), o);
    const l = b(this, ug, W0).bind(this);
    a.addEventListener("touchend", l, o), a.addEventListener("touchcancel", l, o), o.capture = !0, a.addEventListener("pointerdown", jt, o), a.addEventListener("pointermove", jt, o), a.addEventListener("pointercancel", jA, o), a.addEventListener("pointerup", jA, o), (i = n(this, od)) == null || i.call(this);
  }
  f(this, Bn, yb(t)), b(this, dl, Qf).call(this, t);
}, cd = new WeakSet(), Gb = function() {
  if (n(this, Mi))
    return;
  const t = f(this, Mi, new AbortController()), e = AbortSignal.any([n(this, qr), t.signal]), s = n(this, cl), i = {
    capture: !0,
    signal: e,
    passive: !1
  }, r = (a) => {
    var o;
    a.pointerType === "touch" && ((o = n(this, Mi)) == null || o.abort(), f(this, Mi, null));
  };
  s.addEventListener("pointerdown", (a) => {
    a.pointerType === "touch" && (jt(a), r(a));
  }, i), s.addEventListener("pointerup", r, i), s.addEventListener("pointercancel", r, i);
}, dd = new WeakSet(), $b = function(t) {
  const e = n(this, ii);
  if (e.size === 0)
    return;
  const s = f(this, ii, /* @__PURE__ */ new Set());
  for (const {
    identifier: i
  } of t.touches)
    e.has(i) && s.add(i);
}, ud = new WeakSet(), zb = function(t) {
  const e = n(this, ii), s = [];
  for (const i of t.touches)
    e.has(i.identifier) && s.push(i);
  return s;
}, dl = new WeakSet(), Qf = function(t) {
  var r;
  const e = b(this, ud, zb).call(this, t);
  if (e.length !== 2 || (r = n(this, rd)) != null && r.call(this)) {
    f(this, Di, null);
    return;
  }
  const [s, i] = e;
  f(this, Di, {
    touch0X: s.screenX,
    touch0Y: s.screenY,
    touch1X: i.screenX,
    touch1Y: i.screenY,
    panX: (s.clientX + i.clientX) / 2,
    panY: (s.clientY + i.clientY) / 2,
    screenPanX: (s.screenX + i.screenX) / 2,
    screenPanY: (s.screenY + i.screenY) / 2
  });
}, dg = new WeakSet(), j0 = function(t) {
  var L, B, ft, pt;
  if (!n(this, Di))
    return;
  const e = b(this, ud, zb).call(this, t);
  if (e.length !== 2)
    return;
  const s = n(this, Bn);
  if (f(this, Bn, yb(t)), !n(this, Bn))
    return;
  if (!s) {
    b(this, dl, Qf).call(this, t);
    return;
  }
  const [i, r] = e, {
    screenX: a,
    screenY: o
  } = i, {
    screenX: l,
    screenY: h
  } = r, c = n(this, Di), {
    touch0X: d,
    touch0Y: p,
    touch1X: m,
    touch1Y: y,
    panX: A,
    panY: v
  } = c, w = m - d, S = y - p, E = l - a, x = h - o, C = (i.clientX + r.clientX) / 2, _ = (i.clientY + r.clientY) / 2;
  c.panX = C, c.panY = _;
  const k = C - A, P = _ - v, M = (a + l) / 2, I = (o + h) / 2, R = Math.hypot(M - c.screenPanX, I - c.screenPanY);
  c.screenPanX = M, c.screenPanY = I;
  const X = Math.hypot(E, x), V = Math.hypot(w, S), W = n(this, Nn) ? this.MIN_TOUCH_DISTANCE_TO_SCALE : this.MIN_TOUCH_DISTANCE_TO_PINCH + 2 * R;
  if (X < WA || V < WA || Math.abs(V - X) <= W) {
    (k || P) && ((L = n(this, Kr)) == null || L.call(this, k, P));
    return;
  }
  c.touch0X = a, c.touch0Y = o, c.touch1X = l, c.touch1Y = h;
  const Mt = Math.sign(X - V);
  if (!n(this, Nn)) {
    f(this, Nn, !0), f(this, Hn, Mt), (k || P) && ((B = n(this, Kr)) == null || B.call(this, k, P));
    return;
  }
  if (n(this, Hn)) {
    const me = n(this, Hn);
    if (f(this, Hn, 0), Mt !== me && Math.abs(X - V) <= 2 * R) {
      f(this, Nn, !1), (k || P) && ((ft = n(this, Kr)) == null || ft.call(this, k, P));
      return;
    }
  }
  (pt = n(this, ld)) == null || pt.call(this, [A, v], V, X, k, P);
}, ug = new WeakSet(), W0 = function(t) {
  if (b(this, dd, $b).call(this, t), n(this, ii).size >= 2) {
    b(this, dl, Qf).call(this, t);
    return;
  }
  const e = !!n(this, Di);
  b(this, fd, Vb).call(this), n(this, ii).size === 1 && b(this, cd, Gb).call(this), e && yb(t);
}, fd = new WeakSet(), Vb = function() {
  var t;
  f(this, Di, null), f(this, Nn, !1), f(this, Hn, 0), f(this, Bn, !1), n(this, Ii) && (n(this, Ii).abort(), f(this, Ii, null), (t = n(this, hd)) == null || t.call(this));
};
var Jr, _s, mt, J, Li, ul, Un, pd, ie, Zr, Fi, us, Gn, gd, ta, Ue, md, ea, Ri, ni, fl, pl, fs, $n, bd, fg, yd, jb, Ad, Wb, gl, Jf, pg, X0, gg, Y0, wd, Xb, ml, Zf, vd, Yb, mg, K0, bg, q0, yg, Q0, Sd, Kb, Ag, J0, Ed, qb, xd, Qb, wg, Z0, vg, tw, Sg, ew, Cd, Jb, sa, lc;
const U = class U {
  constructor(t) {
    u(this, yd);
    u(this, gl);
    u(this, pg);
    u(this, gg);
    u(this, wd);
    u(this, ml);
    u(this, vd);
    u(this, mg);
    u(this, bg);
    u(this, yg);
    u(this, Sd);
    u(this, Ag);
    u(this, Ed);
    u(this, xd);
    u(this, wg);
    u(this, vg);
    u(this, Sg);
    u(this, Cd);
    u(this, sa);
    u(this, Jr, null);
    u(this, _s, null);
    u(this, mt, null);
    u(this, J, null);
    u(this, Li, null);
    u(this, ul, !1);
    u(this, Un, null);
    u(this, pd, "");
    u(this, ie, null);
    u(this, Zr, null);
    u(this, Fi, null);
    u(this, us, null);
    u(this, Gn, null);
    u(this, gd, "");
    u(this, ta, !1);
    u(this, Ue, null);
    u(this, md, !1);
    u(this, ea, !1);
    u(this, Ri, !1);
    u(this, ni, null);
    u(this, fl, 0);
    u(this, pl, 0);
    u(this, fs, null);
    u(this, $n, null);
    T(this, "isSelected", !1);
    T(this, "_isCopy", !1);
    T(this, "_editToolbar", null);
    T(this, "_initialOptions", /* @__PURE__ */ Object.create(null));
    T(this, "_initialData", null);
    T(this, "_isVisible", !0);
    T(this, "_uiManager", null);
    T(this, "_focusEventsAllowed", !0);
    u(this, bd, !1);
    u(this, fg, U._zIndex++);
    this.parent = t.parent, this.id = t.id, this.width = this.height = null, this.pageIndex = t.parent.pageIndex, this.name = t.name, this.div = null, this._uiManager = t.uiManager, this.annotationElementId = null, this._willKeepAspectRatio = !1, this._initialOptions.isCentered = t.isCentered, this._structTreeParentId = null, this.annotationElementId = t.annotationElementId || null, this.creationDate = t.creationDate || /* @__PURE__ */ new Date(), this.modificationDate = t.modificationDate || null, this.canAddComment = !0;
    const {
      rotation: e,
      rawDims: {
        pageWidth: s,
        pageHeight: i,
        pageX: r,
        pageY: a
      }
    } = this.parent.viewport;
    this.rotation = e, this.pageRotation = (360 + e - this._uiManager.viewParameters.rotation) % 360, this.pageDimensions = [s, i], this.pageTranslation = [r, a];
    const [o, l] = this.parentDimensions;
    this.x = t.x / o, this.y = t.y / l, this.isAttachedToDOM = !1, this.deleted = !1;
  }
  static get _resizerKeyboardManager() {
    const t = U.prototype._resizeWithKeyboard, e = Po.TRANSLATE_SMALL, s = Po.TRANSLATE_BIG;
    return H(this, "_resizerKeyboardManager", new ko([[["ArrowLeft"], t, {
      args: [-e, 0]
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t, {
      args: [-s, 0]
    }], [["ArrowRight"], t, {
      args: [e, 0]
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t, {
      args: [s, 0]
    }], [["ArrowUp"], t, {
      args: [0, -e]
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t, {
      args: [0, -s]
    }], [["ArrowDown"], t, {
      args: [0, e]
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t, {
      args: [0, s]
    }], [["Escape"], U.prototype._stopResizingWithKeyboard]]));
  }
  updatePageIndex(t) {
    this.pageIndex = t;
  }
  get editorType() {
    return Object.getPrototypeOf(this).constructor._type;
  }
  get mode() {
    return Object.getPrototypeOf(this).constructor._editorType;
  }
  static get isDrawer() {
    return !1;
  }
  static get _defaultLineColor() {
    return H(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
  }
  static deleteAnnotationElement(t) {
    const e = new pS({
      id: t._uiManager.getId(),
      parent: t.parent,
      uiManager: t._uiManager
    });
    e.annotationElementId = t.annotationElementId, e.deleted = !0, e._uiManager.addToAnnotationStorage(e);
  }
  static initialize(t, e) {
    if (U._l10n ?? (U._l10n = t), U._l10nAlert ?? (U._l10nAlert = Object.freeze({
      highlight: "pdfjs-editor-highlight-added-alert",
      freetext: "pdfjs-editor-freetext-added-alert",
      ink: "pdfjs-editor-ink-added-alert",
      stamp: "pdfjs-editor-stamp-added-alert",
      signature: "pdfjs-editor-signature-added-alert"
    })), U._l10nResizer ?? (U._l10nResizer = Object.freeze({
      topLeft: "pdfjs-editor-resizer-top-left",
      topMiddle: "pdfjs-editor-resizer-top-middle",
      topRight: "pdfjs-editor-resizer-top-right",
      middleRight: "pdfjs-editor-resizer-middle-right",
      bottomRight: "pdfjs-editor-resizer-bottom-right",
      bottomMiddle: "pdfjs-editor-resizer-bottom-middle",
      bottomLeft: "pdfjs-editor-resizer-bottom-left",
      middleLeft: "pdfjs-editor-resizer-middle-left"
    })), U._borderLineWidth !== -1)
      return;
    const s = getComputedStyle(document.documentElement);
    U._borderLineWidth = parseFloat(s.getPropertyValue("--outline-width")) || 0;
  }
  static updateDefaultParams(t, e) {
  }
  static get defaultPropertiesToUpdate() {
    return [];
  }
  static isHandlingMimeForPasting(t) {
    return !1;
  }
  static paste(t, e) {
    K("Not implemented");
  }
  get propertiesToUpdate() {
    return [];
  }
  get _isDraggable() {
    return n(this, bd);
  }
  set _isDraggable(t) {
    var e;
    f(this, bd, t), (e = this.div) == null || e.classList.toggle("draggable", t);
  }
  get uid() {
    return this.annotationElementId || this.id;
  }
  get isEnterHandled() {
    return !0;
  }
  center() {
    const [t, e] = this.pageDimensions;
    switch (this.parentRotation) {
      case 90:
        this.x -= this.height * e / (t * 2), this.y += this.width * t / (e * 2);
        break;
      case 180:
        this.x += this.width / 2, this.y += this.height / 2;
        break;
      case 270:
        this.x += this.height * e / (t * 2), this.y -= this.width * t / (e * 2);
        break;
      default:
        this.x -= this.width / 2, this.y -= this.height / 2;
        break;
    }
    this.fixAndSetPosition();
  }
  addCommands(t) {
    this._uiManager.addCommands(t);
  }
  get currentLayer() {
    return this._uiManager.currentLayer;
  }
  setInBackground() {
    this.div.style.zIndex = 0;
  }
  setInForeground() {
    this.div.style.zIndex = n(this, fg);
  }
  setParent(t) {
    var e;
    t !== null ? (this.pageIndex = t.pageIndex, this.pageDimensions = t.pageDimensions) : (b(this, sa, lc).call(this), (e = n(this, us)) == null || e.remove(), f(this, us, null)), this.parent = t;
  }
  focusin(t) {
    this._focusEventsAllowed && (n(this, ta) ? f(this, ta, !1) : this.parent.setSelected(this));
  }
  focusout(t) {
    var s;
    if (!this._focusEventsAllowed || !this.isAttachedToDOM)
      return;
    const e = t.relatedTarget;
    e != null && e.closest(`#${this.id}`) || (t.preventDefault(), (s = this.parent) != null && s.isMultipleSelection || this.commitOrRemove());
  }
  commitOrRemove() {
    this.isEmpty() ? this.remove() : this.commit();
  }
  commit() {
    this.isInEditMode() && this.addToAnnotationStorage();
  }
  addToAnnotationStorage() {
    this._uiManager.addToAnnotationStorage(this);
  }
  setAt(t, e, s, i) {
    const [r, a] = this.parentDimensions;
    [s, i] = this.screenToPageTranslation(s, i), this.x = (t + s) / r, this.y = (e + i) / a, this.fixAndSetPosition();
  }
  _moveAfterPaste(t, e) {
    if (this.isClone) {
      delete this.isClone;
      return;
    }
    const [s, i] = this.parentDimensions;
    this.setAt(t * s, e * i, this.width * s, this.height * i), this._onTranslated();
  }
  translate(t, e) {
    b(this, yd, jb).call(this, this.parentDimensions, t, e);
  }
  translateInPage(t, e) {
    n(this, Ue) || f(this, Ue, [this.x, this.y, this.width, this.height]), b(this, yd, jb).call(this, this.pageDimensions, t, e), this.div.scrollIntoView({
      block: "nearest"
    });
  }
  translationDone() {
    this._onTranslated(this.x, this.y);
  }
  drag(t, e) {
    n(this, Ue) || f(this, Ue, [this.x, this.y, this.width, this.height]);
    const {
      div: s,
      parentDimensions: [i, r]
    } = this;
    if (this.x += t / i, this.y += e / r, this.parent && (this.x < 0 || this.x > 1 || this.y < 0 || this.y > 1)) {
      const {
        x: d,
        y: p
      } = this.div.getBoundingClientRect();
      this.parent.findNewParent(this, d, p) && (this.x -= Math.floor(this.x), this.y -= Math.floor(this.y));
    }
    let {
      x: a,
      y: o
    } = this;
    const [l, h] = this.getBaseTranslation();
    a += l, o += h;
    const {
      style: c
    } = s;
    c.left = `${(100 * a).toFixed(2)}%`, c.top = `${(100 * o).toFixed(2)}%`, this._onTranslating(a, o);
  }
  _onTranslating(t, e) {
  }
  _onTranslated(t, e) {
  }
  get _hasBeenMoved() {
    return !!n(this, Ue) && (n(this, Ue)[0] !== this.x || n(this, Ue)[1] !== this.y);
  }
  get _hasBeenResized() {
    return !!n(this, Ue) && (n(this, Ue)[2] !== this.width || n(this, Ue)[3] !== this.height);
  }
  getBaseTranslation() {
    const [t, e] = this.parentDimensions, {
      _borderLineWidth: s
    } = U, i = s / t, r = s / e;
    switch (this.rotation) {
      case 90:
        return [-i, r];
      case 180:
        return [i, r];
      case 270:
        return [i, -r];
      default:
        return [-i, -r];
    }
  }
  get _mustFixPosition() {
    return !0;
  }
  fixAndSetPosition(t = this.rotation) {
    const {
      div: {
        style: e
      },
      pageDimensions: [s, i]
    } = this;
    let {
      x: r,
      y: a,
      width: o,
      height: l
    } = this;
    if (o *= s, l *= i, r *= s, a *= i, this._mustFixPosition)
      switch (t) {
        case 0:
          r = ut(r, 0, s - o), a = ut(a, 0, i - l);
          break;
        case 90:
          r = ut(r, 0, s - l), a = ut(a, o, i);
          break;
        case 180:
          r = ut(r, o, s), a = ut(a, l, i);
          break;
        case 270:
          r = ut(r, l, s), a = ut(a, 0, i - o);
          break;
      }
    this.x = r /= s, this.y = a /= i;
    const [h, c] = this.getBaseTranslation();
    r += h, a += c, e.left = `${(100 * r).toFixed(2)}%`, e.top = `${(100 * a).toFixed(2)}%`, this.moveInDOM();
  }
  screenToPageTranslation(t, e) {
    var s;
    return b(s = U, Ad, Wb).call(s, t, e, this.parentRotation);
  }
  pageTranslationToScreen(t, e) {
    var s;
    return b(s = U, Ad, Wb).call(s, t, e, 360 - this.parentRotation);
  }
  get parentScale() {
    return this._uiManager.viewParameters.realScale;
  }
  get parentRotation() {
    return (this._uiManager.viewParameters.rotation + this.pageRotation) % 360;
  }
  get parentDimensions() {
    const {
      parentScale: t,
      pageDimensions: [e, s]
    } = this;
    return [e * t, s * t];
  }
  setDims() {
    const {
      div: {
        style: t
      },
      width: e,
      height: s
    } = this;
    t.width = `${(100 * e).toFixed(2)}%`, t.height = `${(100 * s).toFixed(2)}%`;
  }
  getInitialTranslation() {
    return [0, 0];
  }
  _onResized() {
  }
  static _round(t) {
    return Math.round(t * 1e4) / 1e4;
  }
  _onResizing() {
  }
  altTextFinish() {
    var t;
    (t = n(this, mt)) == null || t.finish();
  }
  get toolbarButtons() {
    return null;
  }
  async addEditToolbar() {
    if (this._editToolbar || n(this, ea))
      return this._editToolbar;
    this._editToolbar = new Ib(this), this.div.append(this._editToolbar.render());
    const {
      toolbarButtons: t
    } = this;
    if (t)
      for (const [e, s] of t)
        await this._editToolbar.addButton(e, s);
    return this.hasComment || this._editToolbar.addButton("comment", this.addCommentButton()), this._editToolbar.addButton("delete"), this._editToolbar;
  }
  addCommentButtonInToolbar() {
    var t;
    (t = this._editToolbar) == null || t.addButtonBefore("comment", this.addCommentButton(), ".deleteButton");
  }
  removeCommentButtonFromToolbar() {
    var t;
    (t = this._editToolbar) == null || t.removeButton("comment");
  }
  removeEditToolbar() {
    var t, e;
    (t = this._editToolbar) == null || t.remove(), this._editToolbar = null, (e = n(this, mt)) == null || e.destroy();
  }
  addContainer(t) {
    var s;
    const e = (s = this._editToolbar) == null ? void 0 : s.div;
    e ? e.before(t) : this.div.append(t);
  }
  getClientDimensions() {
    return this.div.getBoundingClientRect();
  }
  createAltText() {
    return n(this, mt) || (Rp.initialize(U._l10n), f(this, mt, new Rp(this)), n(this, Jr) && (n(this, mt).data = n(this, Jr), f(this, Jr, null))), n(this, mt);
  }
  get altTextData() {
    var t;
    return (t = n(this, mt)) == null ? void 0 : t.data;
  }
  set altTextData(t) {
    n(this, mt) && (n(this, mt).data = t);
  }
  get guessedAltText() {
    var t;
    return (t = n(this, mt)) == null ? void 0 : t.guessedText;
  }
  async setGuessedAltText(t) {
    var e;
    await ((e = n(this, mt)) == null ? void 0 : e.setGuessedText(t));
  }
  serializeAltText(t) {
    var e;
    return (e = n(this, mt)) == null ? void 0 : e.serialize(t);
  }
  hasAltText() {
    return !!n(this, mt) && !n(this, mt).isEmpty();
  }
  hasAltTextData() {
    var t;
    return ((t = n(this, mt)) == null ? void 0 : t.hasData()) ?? !1;
  }
  focusCommentButton() {
    var t;
    (t = n(this, J)) == null || t.focusButton();
  }
  addCommentButton() {
    return this.canAddComment ? n(this, J) || f(this, J, new Nf(this)) : null;
  }
  addStandaloneCommentButton() {
    if (this._uiManager.hasCommentManager()) {
      if (n(this, Li)) {
        this._uiManager.isEditingMode() && n(this, Li).classList.remove("hidden");
        return;
      }
      this.hasComment && (f(this, Li, n(this, J).renderForStandalone()), this.div.append(n(this, Li)));
    }
  }
  removeStandaloneCommentButton() {
    n(this, J).removeStandaloneCommentButton(), f(this, Li, null);
  }
  hideStandaloneCommentButton() {
    var t;
    (t = n(this, Li)) == null || t.classList.add("hidden");
  }
  get comment() {
    if (!n(this, J))
      return null;
    const {
      data: {
        richText: t,
        text: e,
        date: s,
        deleted: i
      }
    } = n(this, J);
    return {
      text: e,
      richText: t,
      date: s,
      deleted: i,
      color: this.getNonHCMColor(),
      opacity: this.opacity ?? 1
    };
  }
  set comment(t) {
    n(this, J) || f(this, J, new Nf(this)), typeof t == "object" && t !== null ? n(this, J).restoreData(t) : n(this, J).data = t, this.hasComment ? (this.removeCommentButtonFromToolbar(), this.addStandaloneCommentButton(), this._uiManager.updateComment(this)) : (this.addCommentButtonInToolbar(), this.removeStandaloneCommentButton(), this._uiManager.removeComment(this));
  }
  setCommentData({
    comment: t,
    popupRef: e,
    richText: s
  }) {
    if (!e || (n(this, J) || f(this, J, new Nf(this)), n(this, J).setInitialText(t, s), !this.annotationElementId))
      return;
    const i = this._uiManager.getAndRemoveDataFromAnnotationStorage(this.annotationElementId);
    i && this.updateFromAnnotationLayer(i);
  }
  get hasEditedComment() {
    var t;
    return (t = n(this, J)) == null ? void 0 : t.hasBeenEdited();
  }
  get hasDeletedComment() {
    var t;
    return (t = n(this, J)) == null ? void 0 : t.isDeleted();
  }
  get hasComment() {
    return !!n(this, J) && !n(this, J).isEmpty() && !n(this, J).isDeleted();
  }
  async editComment(t) {
    n(this, J) || f(this, J, new Nf(this)), n(this, J).edit(t);
  }
  toggleComment(t, e = void 0) {
    this.hasComment && this._uiManager.toggleComment(this, t, e);
  }
  setSelectedCommentButton(t) {
    n(this, J).setSelectedButton(t);
  }
  addComment(t) {
    if (this.hasEditedComment) {
      const [, , , i] = t.rect, [r] = this.pageDimensions, [a] = this.pageTranslation, o = a + r + 1, l = i - 100, h = o + 180;
      t.popup = {
        contents: this.comment.text,
        deleted: this.comment.deleted,
        rect: [o, l, h, i]
      };
    }
  }
  updateFromAnnotationLayer({
    popup: {
      contents: t,
      deleted: e
    }
  }) {
    n(this, J).data = e ? null : t;
  }
  get parentBoundingClientRect() {
    return this.parent.boundingClientRect;
  }
  render() {
    var a;
    const t = this.div = document.createElement("div");
    t.setAttribute("data-editor-rotation", (360 - this.rotation) % 360), t.className = this.name, t.setAttribute("id", this.id), t.tabIndex = n(this, ul) ? -1 : 0, t.setAttribute("role", "application"), this.defaultL10nId && t.setAttribute("data-l10n-id", this.defaultL10nId), this._isVisible || t.classList.add("hidden"), this.setInForeground(), b(this, Ed, qb).call(this);
    const [e, s] = this.parentDimensions;
    this.parentRotation % 180 !== 0 && (t.style.maxWidth = `${(100 * s / e).toFixed(2)}%`, t.style.maxHeight = `${(100 * e / s).toFixed(2)}%`);
    const [i, r] = this.getInitialTranslation();
    return this.translate(i, r), k0(this, t, ["keydown", "pointerdown", "dblclick"]), b(this, xd, Qb).call(this), this.addStandaloneCommentButton(), (a = this._uiManager._editorUndoBar) == null || a.hide(), t;
  }
  pointerdown(t) {
    const {
      isMac: e
    } = rt.platform;
    if (t.button !== 0 || t.ctrlKey && e) {
      t.preventDefault();
      return;
    }
    if (f(this, ta, !0), this._isDraggable) {
      b(this, Ag, J0).call(this, t);
      return;
    }
    b(this, Sd, Kb).call(this, t);
  }
  _onStartDragging() {
  }
  _onStopDragging() {
  }
  moveInDOM() {
    n(this, ni) && clearTimeout(n(this, ni)), f(this, ni, setTimeout(() => {
      var t;
      f(this, ni, null), (t = this.parent) == null || t.moveEditorInDOM(this);
    }, 0));
  }
  _setParentAndPosition(t, e, s) {
    t.changeParent(this), this.x = e, this.y = s, this.fixAndSetPosition(), this._onTranslated();
  }
  getRect(t, e, s = this.rotation) {
    const i = this.parentScale, [r, a] = this.pageDimensions, [o, l] = this.pageTranslation, h = t / i, c = e / i, d = this.x * r, p = this.y * a, m = this.width * r, y = this.height * a;
    switch (s) {
      case 0:
        return [d + h + o, a - p - c - y + l, d + h + m + o, a - p - c + l];
      case 90:
        return [d + c + o, a - p + h + l, d + c + y + o, a - p + h + m + l];
      case 180:
        return [d - h - m + o, a - p + c + l, d - h + o, a - p + c + y + l];
      case 270:
        return [d - c - y + o, a - p - h - m + l, d - c + o, a - p - h + l];
      default:
        throw new Error("Invalid rotation");
    }
  }
  getRectInCurrentCoords(t, e) {
    const [s, i, r, a] = t, o = r - s, l = a - i;
    switch (this.rotation) {
      case 0:
        return [s, e - a, o, l];
      case 90:
        return [s, e - i, l, o];
      case 180:
        return [r, e - i, o, l];
      case 270:
        return [r, e - a, l, o];
      default:
        throw new Error("Invalid rotation");
    }
  }
  getPDFRect() {
    return this.getRect(0, 0);
  }
  getNonHCMColor() {
    return this.color && U._colorManager.convert(this._uiManager.getNonHCMColor(this.color));
  }
  onUpdatedColor() {
    var t;
    (t = n(this, J)) == null || t.onUpdatedColor();
  }
  getData() {
    const {
      comment: {
        text: t,
        color: e,
        date: s,
        opacity: i,
        deleted: r,
        richText: a
      },
      uid: o,
      pageIndex: l,
      creationDate: h,
      modificationDate: c
    } = this;
    return {
      id: o,
      pageIndex: l,
      rect: this.getPDFRect(),
      richText: a,
      contentsObj: {
        str: t
      },
      creationDate: h,
      modificationDate: s || c,
      popupRef: !r,
      color: e,
      opacity: i
    };
  }
  onceAdded(t) {
  }
  isEmpty() {
    return !1;
  }
  enableEditMode() {
    return this.isInEditMode() ? !1 : (this.parent.setEditingState(!1), f(this, ea, !0), !0);
  }
  disableEditMode() {
    return this.isInEditMode() ? (this.parent.setEditingState(!0), f(this, ea, !1), !0) : !1;
  }
  isInEditMode() {
    return n(this, ea);
  }
  shouldGetKeyboardEvents() {
    return n(this, Ri);
  }
  needsToBeRebuilt() {
    return this.div && !this.isAttachedToDOM;
  }
  get isOnScreen() {
    const {
      top: t,
      left: e,
      bottom: s,
      right: i
    } = this.getClientDimensions(), {
      innerHeight: r,
      innerWidth: a
    } = window;
    return e < a && i > 0 && t < r && s > 0;
  }
  rebuild() {
    b(this, Ed, qb).call(this), b(this, xd, Qb).call(this);
  }
  rotate(t) {
  }
  resize() {
  }
  serializeDeleted() {
    var t;
    return {
      id: this.annotationElementId,
      deleted: !0,
      pageIndex: this.pageIndex,
      popupRef: ((t = this._initialData) == null ? void 0 : t.popupRef) || ""
    };
  }
  serialize(t = !1, e = null) {
    var s;
    return {
      annotationType: this.mode,
      pageIndex: this.pageIndex,
      rect: this.getPDFRect(),
      rotation: this.rotation,
      structTreeParentId: this._structTreeParentId,
      popupRef: ((s = this._initialData) == null ? void 0 : s.popupRef) || ""
    };
  }
  static async deserialize(t, e, s) {
    const i = new this.prototype.constructor({
      parent: e,
      id: s.getId(),
      uiManager: s,
      annotationElementId: t.annotationElementId,
      creationDate: t.creationDate,
      modificationDate: t.modificationDate
    });
    i.rotation = t.rotation, f(i, Jr, t.accessibilityData), i._isCopy = t.isCopy || !1;
    const [r, a] = i.pageDimensions, [o, l, h, c] = i.getRectInCurrentCoords(t.rect, a);
    return i.x = o / r, i.y = l / a, i.width = h / r, i.height = c / a, i;
  }
  get hasBeenModified() {
    return !!this.annotationElementId && (this.deleted || this.serialize() !== null);
  }
  remove() {
    var t, e, s;
    if ((t = n(this, Gn)) == null || t.abort(), f(this, Gn, null), this.isEmpty() || this.commit(), (e = n(this, $n)) == null || e.destroy(), f(this, $n, null), this.parent ? this.parent.remove(this) : this._uiManager.removeEditor(this), this.hideCommentPopup(), n(this, ni) && (clearTimeout(n(this, ni)), f(this, ni, null)), b(this, sa, lc).call(this), this.removeEditToolbar(), n(this, fs)) {
      for (const i of n(this, fs).values())
        clearTimeout(i);
      f(this, fs, null);
    }
    this.parent = null, (s = n(this, us)) == null || s.remove(), f(this, us, null);
  }
  get isResizable() {
    return !1;
  }
  makeResizable() {
    this.isResizable && (b(this, pg, X0).call(this), n(this, ie).classList.remove("hidden"));
  }
  get toolbarPosition() {
    return null;
  }
  get commentButtonPosition() {
    return this._uiManager.direction === "ltr" ? [1, 0] : [0, 0];
  }
  get commentButtonPositionInPage() {
    const {
      commentButtonPosition: [t, e]
    } = this, [s, i, r, a] = this.getPDFRect();
    return [U._round(s + (r - s) * t), U._round(i + (a - i) * (1 - e))];
  }
  get commentButtonColor() {
    return this._uiManager.makeCommentColor(this.getNonHCMColor(), this.opacity);
  }
  get commentPopupPosition() {
    return n(this, J).commentPopupPositionInLayer;
  }
  set commentPopupPosition(t) {
    n(this, J).commentPopupPositionInLayer = t;
  }
  hasDefaultPopupPosition() {
    return n(this, J).hasDefaultPopupPosition();
  }
  get commentButtonWidth() {
    return n(this, J).commentButtonWidth;
  }
  get elementBeforePopup() {
    return this.div;
  }
  setCommentButtonStates(t) {
    var e;
    (e = n(this, J)) == null || e.setCommentButtonStates(t);
  }
  keydown(t) {
    if (!this.isResizable || t.target !== this.div || t.key !== "Enter")
      return;
    this._uiManager.setSelected(this), f(this, Fi, {
      savedX: this.x,
      savedY: this.y,
      savedWidth: this.width,
      savedHeight: this.height
    });
    const e = n(this, ie).children;
    if (!n(this, _s)) {
      f(this, _s, Array.from(e));
      const a = b(this, wg, Z0).bind(this), o = b(this, vg, tw).bind(this), l = this._uiManager._signal;
      for (const h of n(this, _s)) {
        const c = h.getAttribute("data-resizer-name");
        h.setAttribute("role", "spinbutton"), h.addEventListener("keydown", a, {
          signal: l
        }), h.addEventListener("blur", o, {
          signal: l
        }), h.addEventListener("focus", b(this, Sg, ew).bind(this, c), {
          signal: l
        }), h.setAttribute("data-l10n-id", U._l10nResizer[c]);
      }
    }
    const s = n(this, _s)[0];
    let i = 0;
    for (const a of e) {
      if (a === s)
        break;
      i++;
    }
    const r = (360 - this.rotation + this.parentRotation) % 360 / 90 * (n(this, _s).length / 4);
    if (r !== i) {
      if (r < i)
        for (let o = 0; o < i - r; o++)
          n(this, ie).append(n(this, ie).firstElementChild);
      else if (r > i)
        for (let o = 0; o < r - i; o++)
          n(this, ie).firstElementChild.before(n(this, ie).lastElementChild);
      let a = 0;
      for (const o of e) {
        const h = n(this, _s)[a++].getAttribute("data-resizer-name");
        o.setAttribute("data-l10n-id", U._l10nResizer[h]);
      }
    }
    b(this, Cd, Jb).call(this, 0), f(this, Ri, !0), n(this, ie).firstElementChild.focus({
      focusVisible: !0
    }), t.preventDefault(), t.stopImmediatePropagation();
  }
  _resizeWithKeyboard(t, e) {
    n(this, Ri) && b(this, vd, Yb).call(this, n(this, gd), {
      deltaX: t,
      deltaY: e,
      fromKeyboard: !0
    });
  }
  _stopResizingWithKeyboard() {
    b(this, sa, lc).call(this), this.div.focus();
  }
  select() {
    var t, e, s;
    if (this.isSelected && this._editToolbar) {
      this._editToolbar.show();
      return;
    }
    if (this.isSelected = !0, this.makeResizable(), (t = this.div) == null || t.classList.add("selectedEditor"), !this._editToolbar) {
      this.addEditToolbar().then(() => {
        var i, r;
        (i = this.div) != null && i.classList.contains("selectedEditor") && ((r = this._editToolbar) == null || r.show());
      });
      return;
    }
    (e = this._editToolbar) == null || e.show(), (s = n(this, mt)) == null || s.toggleAltTextBadge(!1);
  }
  focus() {
    this.div && !this.div.contains(document.activeElement) && setTimeout(() => {
      var t;
      return (t = this.div) == null ? void 0 : t.focus({
        preventScroll: !0
      });
    }, 0);
  }
  unselect() {
    var t, e, s, i, r;
    this.isSelected && (this.isSelected = !1, (t = n(this, ie)) == null || t.classList.add("hidden"), (e = this.div) == null || e.classList.remove("selectedEditor"), (s = this.div) != null && s.contains(document.activeElement) && this._uiManager.currentLayer.div.focus({
      preventScroll: !0
    }), (i = this._editToolbar) == null || i.hide(), (r = n(this, mt)) == null || r.toggleAltTextBadge(!0), this.hideCommentPopup());
  }
  hideCommentPopup() {
    this.hasComment && this._uiManager.toggleComment(null);
  }
  updateParams(t, e) {
  }
  disableEditing() {
  }
  enableEditing() {
  }
  get canChangeContent() {
    return !1;
  }
  enterInEditMode() {
    this.canChangeContent && (this.enableEditMode(), this.div.focus());
  }
  dblclick(t) {
    t.target.nodeName !== "BUTTON" && (this.enterInEditMode(), this.parent.updateToolbar({
      mode: this.constructor._editorType,
      editId: this.uid
    }));
  }
  getElementForAltText() {
    return this.div;
  }
  get contentDiv() {
    return this.div;
  }
  get isEditing() {
    return n(this, md);
  }
  set isEditing(t) {
    f(this, md, t), this.parent && (t ? (this.parent.setSelected(this), this.parent.setActiveEditor(this)) : this.parent.setActiveEditor(null));
  }
  static get MIN_SIZE() {
    return 16;
  }
  static canCreateNewEmptyEditor() {
    return !0;
  }
  get telemetryInitialData() {
    return {
      action: "added"
    };
  }
  get telemetryFinalData() {
    return null;
  }
  _reportTelemetry(t, e = !1) {
    if (e) {
      n(this, fs) || f(this, fs, /* @__PURE__ */ new Map());
      const {
        action: s
      } = t;
      let i = n(this, fs).get(s);
      i && clearTimeout(i), i = setTimeout(() => {
        this._reportTelemetry(t), n(this, fs).delete(s), n(this, fs).size === 0 && f(this, fs, null);
      }, U._telemetryTimeout), n(this, fs).set(s, i);
      return;
    }
    t.type || (t.type = this.editorType), this._uiManager._eventBus.dispatch("reporttelemetry", {
      source: this,
      details: {
        type: "editing",
        data: t
      }
    });
  }
  show(t = this._isVisible) {
    this.div.classList.toggle("hidden", !t), this._isVisible = t;
  }
  enable() {
    this.div && (this.div.tabIndex = 0), f(this, ul, !1);
  }
  disable() {
    this.div && (this.div.tabIndex = -1), f(this, ul, !0);
  }
  updateFakeAnnotationElement(t) {
    if (!n(this, us) && !this.deleted) {
      f(this, us, t.addFakeAnnotation(this));
      return;
    }
    if (this.deleted) {
      n(this, us).remove(), f(this, us, null);
      return;
    }
    (this.hasEditedComment || this._hasBeenMoved || this._hasBeenResized) && n(this, us).updateEdited({
      rect: this.getPDFRect(),
      popup: this.comment
    });
  }
  renderAnnotationElement(t) {
    if (this.deleted)
      return t.hide(), null;
    let e = t.container.querySelector(".annotationContent");
    if (!e)
      e = document.createElement("div"), e.classList.add("annotationContent", this.editorType), t.container.prepend(e);
    else if (e.nodeName === "CANVAS") {
      const s = e;
      e = document.createElement("div"), e.classList.add("annotationContent", this.editorType), s.before(e);
    }
    return e;
  }
  resetAnnotationElement(t) {
    const {
      firstElementChild: e
    } = t.container;
    (e == null ? void 0 : e.nodeName) === "DIV" && e.classList.contains("annotationContent") && e.remove();
  }
};
Jr = new WeakMap(), _s = new WeakMap(), mt = new WeakMap(), J = new WeakMap(), Li = new WeakMap(), ul = new WeakMap(), Un = new WeakMap(), pd = new WeakMap(), ie = new WeakMap(), Zr = new WeakMap(), Fi = new WeakMap(), us = new WeakMap(), Gn = new WeakMap(), gd = new WeakMap(), ta = new WeakMap(), Ue = new WeakMap(), md = new WeakMap(), ea = new WeakMap(), Ri = new WeakMap(), ni = new WeakMap(), fl = new WeakMap(), pl = new WeakMap(), fs = new WeakMap(), $n = new WeakMap(), bd = new WeakMap(), fg = new WeakMap(), yd = new WeakSet(), jb = function([t, e], s, i) {
  [s, i] = this.screenToPageTranslation(s, i), this.x += s / t, this.y += i / e, this._onTranslating(this.x, this.y), this.fixAndSetPosition();
}, Ad = new WeakSet(), Wb = function(t, e, s) {
  switch (s) {
    case 90:
      return [e, -t];
    case 180:
      return [-t, -e];
    case 270:
      return [-e, t];
    default:
      return [t, e];
  }
}, gl = new WeakSet(), Jf = function(t) {
  switch (t) {
    case 90: {
      const [e, s] = this.pageDimensions;
      return [0, -e / s, s / e, 0];
    }
    case 180:
      return [-1, 0, 0, -1];
    case 270: {
      const [e, s] = this.pageDimensions;
      return [0, e / s, -s / e, 0];
    }
    default:
      return [1, 0, 0, 1];
  }
}, pg = new WeakSet(), X0 = function() {
  if (n(this, ie))
    return;
  f(this, ie, document.createElement("div")), n(this, ie).classList.add("resizers");
  const t = this._willKeepAspectRatio ? ["topLeft", "topRight", "bottomRight", "bottomLeft"] : ["topLeft", "topMiddle", "topRight", "middleRight", "bottomRight", "bottomMiddle", "bottomLeft", "middleLeft"], e = this._uiManager._signal;
  for (const s of t) {
    const i = document.createElement("div");
    n(this, ie).append(i), i.classList.add("resizer", s), i.setAttribute("data-resizer-name", s), i.addEventListener("pointerdown", b(this, gg, Y0).bind(this, s), {
      signal: e
    }), i.addEventListener("contextmenu", Us, {
      signal: e
    }), i.tabIndex = -1;
  }
  this.div.prepend(n(this, ie));
}, gg = new WeakSet(), Y0 = function(t, e) {
  var c;
  e.preventDefault();
  const {
    isMac: s
  } = rt.platform;
  if (e.button !== 0 || e.ctrlKey && s)
    return;
  (c = n(this, mt)) == null || c.toggle(!1);
  const i = this._isDraggable;
  this._isDraggable = !1, f(this, Zr, [e.screenX, e.screenY]);
  const r = new AbortController(), a = this._uiManager.combinedSignal(r);
  this.parent.togglePointerEvents(!1), window.addEventListener("pointermove", b(this, vd, Yb).bind(this, t), {
    passive: !0,
    capture: !0,
    signal: a
  }), window.addEventListener("touchmove", jt, {
    passive: !1,
    signal: a
  }), window.addEventListener("contextmenu", Us, {
    signal: a
  }), f(this, Fi, {
    savedX: this.x,
    savedY: this.y,
    savedWidth: this.width,
    savedHeight: this.height
  });
  const o = this.parent.div.style.cursor, l = this.div.style.cursor;
  this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(e.target).cursor;
  const h = () => {
    var d;
    r.abort(), this.parent.togglePointerEvents(!0), (d = n(this, mt)) == null || d.toggle(!0), this._isDraggable = i, this.parent.div.style.cursor = o, this.div.style.cursor = l, b(this, ml, Zf).call(this);
  };
  window.addEventListener("pointerup", h, {
    signal: a
  }), window.addEventListener("blur", h, {
    signal: a
  });
}, wd = new WeakSet(), Xb = function(t, e, s, i) {
  this.width = s, this.height = i, this.x = t, this.y = e, this.setDims(), this.fixAndSetPosition(), this._onResized();
}, ml = new WeakSet(), Zf = function() {
  if (!n(this, Fi))
    return;
  const {
    savedX: t,
    savedY: e,
    savedWidth: s,
    savedHeight: i
  } = n(this, Fi);
  f(this, Fi, null);
  const r = this.x, a = this.y, o = this.width, l = this.height;
  r === t && a === e && o === s && l === i || this.addCommands({
    cmd: b(this, wd, Xb).bind(this, r, a, o, l),
    undo: b(this, wd, Xb).bind(this, t, e, s, i),
    mustExec: !0
  });
}, vd = new WeakSet(), Yb = function(t, e) {
  const [s, i] = this.parentDimensions, r = this.x, a = this.y, o = this.width, l = this.height, h = U.MIN_SIZE / s, c = U.MIN_SIZE / i, d = b(this, gl, Jf).call(this, this.rotation), p = (L, B) => [d[0] * L + d[2] * B, d[1] * L + d[3] * B], m = b(this, gl, Jf).call(this, 360 - this.rotation), y = (L, B) => [m[0] * L + m[2] * B, m[1] * L + m[3] * B];
  let A, v, w = !1, S = !1;
  switch (t) {
    case "topLeft":
      w = !0, A = (L, B) => [0, 0], v = (L, B) => [L, B];
      break;
    case "topMiddle":
      A = (L, B) => [L / 2, 0], v = (L, B) => [L / 2, B];
      break;
    case "topRight":
      w = !0, A = (L, B) => [L, 0], v = (L, B) => [0, B];
      break;
    case "middleRight":
      S = !0, A = (L, B) => [L, B / 2], v = (L, B) => [0, B / 2];
      break;
    case "bottomRight":
      w = !0, A = (L, B) => [L, B], v = (L, B) => [0, 0];
      break;
    case "bottomMiddle":
      A = (L, B) => [L / 2, B], v = (L, B) => [L / 2, 0];
      break;
    case "bottomLeft":
      w = !0, A = (L, B) => [0, B], v = (L, B) => [L, 0];
      break;
    case "middleLeft":
      S = !0, A = (L, B) => [0, B / 2], v = (L, B) => [L, B / 2];
      break;
  }
  const E = A(o, l), x = v(o, l);
  let C = p(...x);
  const _ = U._round(r + C[0]), k = U._round(a + C[1]);
  let P = 1, M = 1, I, R;
  if (e.fromKeyboard)
    ({
      deltaX: I,
      deltaY: R
    } = e);
  else {
    const {
      screenX: L,
      screenY: B
    } = e, [ft, pt] = n(this, Zr);
    [I, R] = this.screenToPageTranslation(L - ft, B - pt), n(this, Zr)[0] = L, n(this, Zr)[1] = B;
  }
  if ([I, R] = y(I / s, R / i), w) {
    const L = Math.hypot(o, l);
    P = M = Math.max(Math.min(Math.hypot(x[0] - E[0] - I, x[1] - E[1] - R) / L, 1 / o, 1 / l), h / o, c / l);
  } else
    S ? P = ut(Math.abs(x[0] - E[0] - I), h, 1) / o : M = ut(Math.abs(x[1] - E[1] - R), c, 1) / l;
  const X = U._round(o * P), V = U._round(l * M);
  C = p(...v(X, V));
  const W = _ - C[0], Mt = k - C[1];
  n(this, Ue) || f(this, Ue, [this.x, this.y, this.width, this.height]), this.width = X, this.height = V, this.x = W, this.y = Mt, this.setDims(), this.fixAndSetPosition(), this._onResizing();
}, mg = new WeakSet(), K0 = function() {
  var t;
  f(this, Fi, {
    savedX: this.x,
    savedY: this.y,
    savedWidth: this.width,
    savedHeight: this.height
  }), (t = n(this, mt)) == null || t.toggle(!1), this.parent.togglePointerEvents(!1);
}, bg = new WeakSet(), q0 = function(t, e, s) {
  let r = 0.7 * (s / e) + 1 - 0.7;
  if (r === 1)
    return;
  const a = b(this, gl, Jf).call(this, this.rotation), o = (_, k) => [a[0] * _ + a[2] * k, a[1] * _ + a[3] * k], [l, h] = this.parentDimensions, c = this.x, d = this.y, p = this.width, m = this.height, y = U.MIN_SIZE / l, A = U.MIN_SIZE / h;
  r = Math.max(Math.min(r, 1 / p, 1 / m), y / p, A / m);
  const v = U._round(p * r), w = U._round(m * r);
  if (v === p && w === m)
    return;
  n(this, Ue) || f(this, Ue, [c, d, p, m]);
  const S = o(p / 2, m / 2), E = U._round(c + S[0]), x = U._round(d + S[1]), C = o(v / 2, w / 2);
  this.x = E - C[0], this.y = x - C[1], this.width = v, this.height = w, this.setDims(), this.fixAndSetPosition(), this._onResizing();
}, yg = new WeakSet(), Q0 = function() {
  var t;
  (t = n(this, mt)) == null || t.toggle(!0), this.parent.togglePointerEvents(!0), b(this, ml, Zf).call(this);
}, Sd = new WeakSet(), Kb = function(t) {
  const {
    isMac: e
  } = rt.platform;
  t.ctrlKey && !e || t.shiftKey || t.metaKey && e ? this.parent.toggleSelected(this) : this.parent.setSelected(this);
}, Ag = new WeakSet(), J0 = function(t) {
  const {
    isSelected: e
  } = this;
  this._uiManager.setUpDragSession();
  let s = !1;
  const i = new AbortController(), r = this._uiManager.combinedSignal(i), a = {
    capture: !0,
    passive: !1,
    signal: r
  }, o = (h) => {
    i.abort(), f(this, Un, null), f(this, ta, !1), this._uiManager.endDragSession() || b(this, Sd, Kb).call(this, h), s && this._onStopDragging();
  };
  e && (f(this, fl, t.clientX), f(this, pl, t.clientY), f(this, Un, t.pointerId), f(this, pd, t.pointerType), window.addEventListener("pointermove", (h) => {
    s || (s = !0, this._uiManager.toggleComment(this, !0, !1), this._onStartDragging());
    const {
      clientX: c,
      clientY: d,
      pointerId: p
    } = h;
    if (p !== n(this, Un)) {
      jt(h);
      return;
    }
    const [m, y] = this.screenToPageTranslation(c - n(this, fl), d - n(this, pl));
    f(this, fl, c), f(this, pl, d), this._uiManager.dragSelectedEditors(m, y), this.div.scrollIntoView({
      block: "nearest"
    });
  }, a), window.addEventListener("touchmove", jt, a), window.addEventListener("pointerdown", (h) => {
    h.pointerType === n(this, pd) && (n(this, $n) || h.isPrimary) && o(h), jt(h);
  }, a));
  const l = (h) => {
    if (!n(this, Un) || n(this, Un) === h.pointerId) {
      o(h);
      return;
    }
    jt(h);
  };
  window.addEventListener("pointerup", l, {
    signal: r
  }), window.addEventListener("blur", l, {
    signal: r
  });
}, Ed = new WeakSet(), qb = function() {
  if (n(this, Gn) || !this.div)
    return;
  f(this, Gn, new AbortController());
  const t = this._uiManager.combinedSignal(n(this, Gn));
  this.div.addEventListener("focusin", this.focusin.bind(this), {
    signal: t
  }), this.div.addEventListener("focusout", this.focusout.bind(this), {
    signal: t
  });
}, xd = new WeakSet(), Qb = function() {
  n(this, $n) || !this.div || !this.isResizable || !this._uiManager._supportsPinchToZoom || f(this, $n, new z0({
    container: this.div,
    isPinchingDisabled: () => !this.isSelected,
    onPinchStart: b(this, mg, K0).bind(this),
    onPinching: b(this, bg, q0).bind(this),
    onPinchEnd: b(this, yg, Q0).bind(this),
    signal: this._uiManager._signal
  }));
}, wg = new WeakSet(), Z0 = function(t) {
  U._resizerKeyboardManager.exec(this, t);
}, vg = new WeakSet(), tw = function(t) {
  var e;
  n(this, Ri) && ((e = t.relatedTarget) == null ? void 0 : e.parentNode) !== n(this, ie) && b(this, sa, lc).call(this);
}, Sg = new WeakSet(), ew = function(t) {
  f(this, gd, n(this, Ri) ? t : "");
}, Cd = new WeakSet(), Jb = function(t) {
  if (n(this, _s))
    for (const e of n(this, _s))
      e.tabIndex = t;
}, sa = new WeakSet(), lc = function() {
  f(this, Ri, !1), b(this, Cd, Jb).call(this, -1), b(this, ml, Zf).call(this);
}, u(U, Ad), T(U, "_l10n", null), T(U, "_l10nAlert", null), T(U, "_l10nResizer", null), T(U, "_borderLineWidth", -1), T(U, "_colorManager", new Rb()), T(U, "_zIndex", 1), T(U, "_telemetryTimeout", 1e3);
let at = U;
class pS extends at {
  constructor(t) {
    super(t), this.annotationElementId = t.annotationElementId, this.deleted = !0;
  }
  serialize() {
    return this.serializeDeleted();
  }
}
const XA = 3285377520, is = 4294901760, Vs = 65535;
class Zb {
  constructor(t) {
    this.h1 = t ? t & 4294967295 : XA, this.h2 = t ? t & 4294967295 : XA;
  }
  update(t) {
    let e, s;
    if (typeof t == "string") {
      e = new Uint8Array(t.length * 2), s = 0;
      for (let A = 0, v = t.length; A < v; A++) {
        const w = t.charCodeAt(A);
        w <= 255 ? e[s++] = w : (e[s++] = w >>> 8, e[s++] = w & 255);
      }
    } else if (ArrayBuffer.isView(t))
      e = t.slice(), s = e.byteLength;
    else
      throw new Error("Invalid data format, must be a string or TypedArray.");
    const i = s >> 2, r = s - i * 4, a = new Uint32Array(e.buffer, 0, i);
    let o = 0, l = 0, h = this.h1, c = this.h2;
    const d = 3432918353, p = 461845907, m = d & Vs, y = p & Vs;
    for (let A = 0; A < i; A++)
      A & 1 ? (o = a[A], o = o * d & is | o * m & Vs, o = o << 15 | o >>> 17, o = o * p & is | o * y & Vs, h ^= o, h = h << 13 | h >>> 19, h = h * 5 + 3864292196) : (l = a[A], l = l * d & is | l * m & Vs, l = l << 15 | l >>> 17, l = l * p & is | l * y & Vs, c ^= l, c = c << 13 | c >>> 19, c = c * 5 + 3864292196);
    switch (o = 0, r) {
      case 3:
        o ^= e[i * 4 + 2] << 16;
      case 2:
        o ^= e[i * 4 + 1] << 8;
      case 1:
        o ^= e[i * 4], o = o * d & is | o * m & Vs, o = o << 15 | o >>> 17, o = o * p & is | o * y & Vs, i & 1 ? h ^= o : c ^= o;
    }
    this.h1 = h, this.h2 = c;
  }
  hexdigest() {
    let t = this.h1, e = this.h2;
    return t ^= e >>> 1, t = t * 3981806797 & is | t * 36045 & Vs, e = e * 4283543511 & is | ((e << 16 | t >>> 16) * 2950163797 & is) >>> 16, t ^= e >>> 1, t = t * 444984403 & is | t * 60499 & Vs, e = e * 3301882366 & is | ((e << 16 | t >>> 16) * 3120437893 & is) >>> 16, t ^= e >>> 1, (t >>> 0).toString(16).padStart(8, "0") + (e >>> 0).toString(16).padStart(8, "0");
  }
}
const Mc = Object.freeze({
  map: null,
  hash: "",
  transfer: void 0
});
var ia, na, Oi, ne, Eg, sw;
class xA {
  constructor() {
    u(this, Eg);
    u(this, ia, !1);
    u(this, na, null);
    u(this, Oi, null);
    u(this, ne, /* @__PURE__ */ new Map());
    T(this, "onSetModified", null);
    T(this, "onResetModified", null);
    T(this, "onAnnotationEditor", null);
  }
  getValue(t, e) {
    const s = n(this, ne).get(t);
    return s === void 0 ? e : Object.assign(e, s);
  }
  getRawValue(t) {
    return n(this, ne).get(t);
  }
  remove(t) {
    var s;
    const e = n(this, ne).get(t);
    e !== void 0 && (e instanceof at && n(this, Oi).delete(e.annotationElementId), n(this, ne).delete(t), n(this, ne).size === 0 && this.resetModified(), !n(this, ne).values().some((i) => i instanceof at) && ((s = this.onAnnotationEditor) == null || s.call(this, null)));
  }
  setValue(t, e) {
    var r;
    const s = n(this, ne).get(t);
    let i = !1;
    if (s !== void 0)
      for (const [a, o] of Object.entries(e))
        s[a] !== o && (i = !0, s[a] = o);
    else
      i = !0, n(this, ne).set(t, e);
    i && b(this, Eg, sw).call(this), e instanceof at && ((n(this, Oi) || f(this, Oi, /* @__PURE__ */ new Map())).set(e.annotationElementId, e), (r = this.onAnnotationEditor) == null || r.call(this, e.constructor._type));
  }
  has(t) {
    return n(this, ne).has(t);
  }
  get size() {
    return n(this, ne).size;
  }
  resetModified() {
    var t;
    n(this, ia) && (f(this, ia, !1), (t = this.onResetModified) == null || t.call(this));
  }
  get print() {
    return new iw(this);
  }
  get serializable() {
    if (n(this, ne).size === 0)
      return Mc;
    const t = /* @__PURE__ */ new Map(), e = new Zb(), s = [], i = /* @__PURE__ */ Object.create(null);
    let r = !1;
    for (const [a, o] of n(this, ne)) {
      const l = o instanceof at ? o.serialize(!1, i) : o;
      o.page && (o.pageIndex = o.page._pageIndex, delete o.page), l && (t.set(a, l), e.update(`${a}:${JSON.stringify(l)}`), r || (r = !!l.bitmap));
    }
    if (r)
      for (const a of t.values())
        a.bitmap && s.push(a.bitmap);
    return t.size > 0 ? {
      map: t,
      hash: e.hexdigest(),
      transfer: s
    } : Mc;
  }
  get editorStats() {
    let t = null;
    const e = /* @__PURE__ */ new Map();
    let s = 0, i = 0;
    for (const r of n(this, ne).values()) {
      if (!(r instanceof at)) {
        r.popup && (r.popup.deleted ? i += 1 : s += 1);
        continue;
      }
      r.isCommentDeleted ? i += 1 : r.hasEditedComment && (s += 1);
      const a = r.telemetryFinalData;
      if (!a)
        continue;
      const {
        type: o
      } = a;
      e.getOrInsertComputed(o, () => Object.getPrototypeOf(r).constructor), t || (t = /* @__PURE__ */ Object.create(null));
      const l = t[o] || (t[o] = /* @__PURE__ */ new Map());
      for (const [h, c] of Object.entries(a)) {
        if (h === "type")
          continue;
        const d = l.getOrInsertComputed(h, AA);
        d.set(c, (d.get(c) ?? 0) + 1);
      }
    }
    if ((i > 0 || s > 0) && (t || (t = /* @__PURE__ */ Object.create(null)), t.comments = {
      deleted: i,
      edited: s
    }), !t)
      return null;
    for (const [r, a] of e)
      t[r] = a.computeTelemetryFinalData(t[r]);
    return t;
  }
  resetModifiedIds() {
    f(this, na, null);
  }
  updateEditor(t, e) {
    var i;
    const s = (i = n(this, Oi)) == null ? void 0 : i.get(t);
    return s ? (s.updateFromAnnotationLayer(e), !0) : !1;
  }
  getEditor(t) {
    var e;
    return ((e = n(this, Oi)) == null ? void 0 : e.get(t)) || null;
  }
  get modifiedIds() {
    if (n(this, na))
      return n(this, na);
    const t = [];
    if (n(this, Oi))
      for (const s of n(this, Oi).values())
        s.serialize() && t.push(s.annotationElementId);
    let e = "";
    if (t.length) {
      const s = new Zb();
      s.update(t.join(",")), e = s.hexdigest();
    }
    return f(this, na, {
      ids: new Set(t),
      hash: e
    });
  }
  [Symbol.iterator]() {
    return n(this, ne).entries();
  }
}
ia = new WeakMap(), na = new WeakMap(), Oi = new WeakMap(), ne = new WeakMap(), Eg = new WeakSet(), sw = function() {
  var t;
  n(this, ia) || (f(this, ia, !0), (t = this.onSetModified) == null || t.call(this));
};
var _d;
class iw extends xA {
  constructor(e) {
    super();
    u(this, _d, Mc);
    const {
      serializable: s
    } = e;
    if (s === Mc)
      return;
    const {
      map: i,
      hash: r,
      transfer: a
    } = s, o = structuredClone(i, a ? {
      transfer: a
    } : null);
    f(this, _d, {
      map: o,
      hash: r,
      transfer: []
    });
  }
  get print() {
    K("Should not call PrintAnnotationStorage.print");
  }
  get serializable() {
    return n(this, _d);
  }
  get modifiedIds() {
    return H(this, "modifiedIds", {
      ids: /* @__PURE__ */ new Set(),
      hash: ""
    });
  }
}
_d = new WeakMap();
const Lo = "__forcedDependency", {
  floor: YA,
  ceil: KA
} = Math;
function qA(g, t, e, s, i, r) {
  g[t * 4 + 0] = Math.min(g[t * 4 + 0], e), g[t * 4 + 1] = Math.min(g[t * 4 + 1], s), g[t * 4 + 2] = Math.max(g[t * 4 + 2], i), g[t * 4 + 3] = Math.max(g[t * 4 + 3], r);
}
function gS(g, t, e, s, i) {
  let r;
  g ? (g < 0 && (r = i[0], i[0] = i[2], i[2] = r), i[0] *= g, i[2] *= g, t < 0 && (r = i[1], i[1] = i[3], i[3] = r), i[1] *= t, i[3] *= t) : i.fill(0), i[0] += e, i[1] += s, i[2] += e, i[3] += s;
}
const ty = new Uint32Array(new Uint8Array([255, 255, 0, 0]).buffer)[0];
var bl, zn;
class mS {
  constructor(t, e) {
    u(this, bl, void 0);
    u(this, zn, void 0);
    f(this, bl, t), f(this, zn, e);
  }
  get length() {
    return n(this, bl).length;
  }
  isEmpty(t) {
    return n(this, bl)[t] === ty;
  }
  minX(t) {
    return n(this, zn)[t * 4 + 0] / 256;
  }
  minY(t) {
    return n(this, zn)[t * 4 + 1] / 256;
  }
  maxX(t) {
    return (n(this, zn)[t * 4 + 2] + 1) / 256;
  }
  maxY(t) {
    return (n(this, zn)[t * 4 + 3] + 1) / 256;
  }
}
bl = new WeakMap(), zn = new WeakMap();
const QA = (g, t) => g == null ? void 0 : g.getOrInsertComputed(t, () => ({
  dependencies: /* @__PURE__ */ new Set(),
  isRenderingOperation: !1
}));
var Ni, Q, dt, ra, aa, oa, fe, Td, ey;
class bS {
  constructor(t, e) {
    u(this, Td);
    u(this, Ni, [[1, 0, 0, 1, 0, 0]]);
    u(this, Q, [-1 / 0, -1 / 0, 1 / 0, 1 / 0]);
    u(this, dt, new Float64Array(fn));
    T(this, "_pendingBBoxIdx", -1);
    u(this, ra, void 0);
    u(this, aa, void 0);
    u(this, oa, void 0);
    u(this, fe, void 0);
    T(this, "_savesStack", []);
    T(this, "_markedContentStack", []);
    f(this, ra, t.width), f(this, aa, t.height), b(this, Td, ey).call(this, e);
  }
  growOperationsCount(t) {
    t >= n(this, fe).length && b(this, Td, ey).call(this, t, n(this, fe));
  }
  get clipBox() {
    return n(this, Q);
  }
  save(t) {
    return f(this, Q, {
      __proto__: n(this, Q)
    }), this._savesStack.push(t), this;
  }
  restore(t, e) {
    const s = Object.getPrototypeOf(n(this, Q));
    if (s === null)
      return this;
    f(this, Q, s);
    const i = this._savesStack.pop();
    return i !== void 0 && (e == null || e(i, t), n(this, fe)[t] = n(this, fe)[i]), this;
  }
  recordOpenMarker(t) {
    return this._savesStack.push(t), this;
  }
  getOpenMarker() {
    return this._savesStack.length === 0 ? null : this._savesStack.at(-1);
  }
  recordCloseMarker(t, e) {
    const s = this._savesStack.pop();
    return s !== void 0 && (e == null || e(s, t), n(this, fe)[t] = n(this, fe)[s]), this;
  }
  beginMarkedContent(t) {
    return this._markedContentStack.push(t), this;
  }
  endMarkedContent(t, e) {
    const s = this._markedContentStack.pop();
    return s !== void 0 && (e == null || e(s, t), n(this, fe)[t] = n(this, fe)[s]), this;
  }
  pushBaseTransform(t) {
    return n(this, Ni).push(D.multiplyByDOMMatrix(n(this, Ni).at(-1), t.getTransform())), this;
  }
  popBaseTransform() {
    return n(this, Ni).length > 1 && n(this, Ni).pop(), this;
  }
  resetBBox(t) {
    return this._pendingBBoxIdx !== t && (this._pendingBBoxIdx = t, n(this, dt).set(fn, 0)), this;
  }
  recordClipBox(t, e, s, i, r, a) {
    const o = D.multiplyByDOMMatrix(n(this, Ni).at(-1), e.getTransform()), l = fn.slice();
    D.axialAlignedBoundingBox([s, r, i, a], o, l);
    const h = D.intersect(n(this, Q), l);
    return h ? (n(this, Q)[0] = h[0], n(this, Q)[1] = h[1], n(this, Q)[2] = h[2], n(this, Q)[3] = h[3]) : (n(this, Q)[0] = n(this, Q)[1] = 1 / 0, n(this, Q)[2] = n(this, Q)[3] = -1 / 0), this;
  }
  recordBBox(t, e, s, i, r, a) {
    const o = n(this, Q);
    if (o[0] === 1 / 0)
      return this;
    const l = D.multiplyByDOMMatrix(n(this, Ni).at(-1), e.getTransform());
    if (o[0] === -1 / 0)
      return D.axialAlignedBoundingBox([s, r, i, a], l, n(this, dt)), this;
    const h = fn.slice();
    return D.axialAlignedBoundingBox([s, r, i, a], l, h), n(this, dt)[0] = ut(h[0], o[0], n(this, dt)[0]), n(this, dt)[1] = ut(h[1], o[1], n(this, dt)[1]), n(this, dt)[2] = ut(h[2], n(this, dt)[2], o[2]), n(this, dt)[3] = ut(h[3], n(this, dt)[3], o[3]), this;
  }
  recordFullPageBBox(t) {
    return n(this, dt)[0] = Math.max(0, n(this, Q)[0]), n(this, dt)[1] = Math.max(0, n(this, Q)[1]), n(this, dt)[2] = Math.min(n(this, ra), n(this, Q)[2]), n(this, dt)[3] = Math.min(n(this, aa), n(this, Q)[3]), this;
  }
  recordOperation(t, e = !1, s) {
    if (this._pendingBBoxIdx !== t)
      return this;
    const i = YA(n(this, dt)[0] * 256 / n(this, ra)), r = YA(n(this, dt)[1] * 256 / n(this, aa)), a = KA(n(this, dt)[2] * 256 / n(this, ra)), o = KA(n(this, dt)[3] * 256 / n(this, aa));
    if (qA(n(this, oa), t, i, r, a, o), s)
      for (const l of s)
        for (const h of l)
          h !== t && qA(n(this, oa), h, i, r, a, o);
    return e || (this._pendingBBoxIdx = -1), this;
  }
  bboxToClipBoxDropOperation(t) {
    return this._pendingBBoxIdx === t && (this._pendingBBoxIdx = -1, n(this, Q)[0] = Math.max(n(this, Q)[0], n(this, dt)[0]), n(this, Q)[1] = Math.max(n(this, Q)[1], n(this, dt)[1]), n(this, Q)[2] = Math.min(n(this, Q)[2], n(this, dt)[2]), n(this, Q)[3] = Math.min(n(this, Q)[3], n(this, dt)[3])), this;
  }
  take() {
    return new mS(n(this, fe), n(this, oa));
  }
  takeDebugMetadata() {
    throw new Error("Unreachable");
  }
  recordSimpleData(t, e) {
    return this;
  }
  recordIncrementalData(t, e) {
    return this;
  }
  resetIncrementalData(t, e) {
    return this;
  }
  recordNamedData(t, e) {
    return this;
  }
  recordSimpleDataFromNamed(t, e, s) {
    return this;
  }
  recordFutureForcedDependency(t, e) {
    return this;
  }
  inheritSimpleDataAsFutureForcedDependencies(t) {
    return this;
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    return this;
  }
  recordCharacterBBox(t, e, s, i = 1, r = 0, a = 0, o) {
    return this;
  }
  getSimpleIndex(t) {
  }
  recordDependencies(t, e) {
    return this;
  }
  recordNamedDependency(t, e) {
    return this;
  }
  recordShowTextOperation(t, e = !1) {
    return this;
  }
}
Ni = new WeakMap(), Q = new WeakMap(), dt = new WeakMap(), ra = new WeakMap(), aa = new WeakMap(), oa = new WeakMap(), fe = new WeakMap(), Td = new WeakSet(), ey = function(t, e) {
  const s = new ArrayBuffer(t * 4);
  f(this, oa, new Uint8ClampedArray(s)), f(this, fe, new Uint32Array(s)), e && e.length > 0 ? (n(this, fe).set(e), n(this, fe).fill(ty, e.length)) : n(this, fe).fill(ty);
};
var De, Ie, la, Ts, yl, Vn, jn, st;
class yS {
  constructor(t, e = !1) {
    u(this, De, {
      __proto__: null
    });
    u(this, Ie, {
      __proto__: null,
      transform: [],
      moveText: [],
      sameLineText: [],
      [Lo]: []
    });
    u(this, la, /* @__PURE__ */ new Map());
    u(this, Ts, /* @__PURE__ */ new Set());
    u(this, yl, /* @__PURE__ */ new Map());
    u(this, Vn, void 0);
    u(this, jn, void 0);
    u(this, st, void 0);
    f(this, st, t), e && (f(this, Vn, /* @__PURE__ */ new Map()), f(this, jn, (s, i) => {
      QA(n(this, Vn), i).dependencies.add(s);
    }));
  }
  get clipBox() {
    return n(this, st).clipBox;
  }
  growOperationsCount(t) {
    n(this, st).growOperationsCount(t);
  }
  save(t) {
    return f(this, De, {
      __proto__: n(this, De)
    }), f(this, Ie, {
      __proto__: n(this, Ie),
      transform: {
        __proto__: n(this, Ie).transform
      },
      moveText: {
        __proto__: n(this, Ie).moveText
      },
      sameLineText: {
        __proto__: n(this, Ie).sameLineText
      },
      [Lo]: {
        __proto__: n(this, Ie)[Lo]
      }
    }), n(this, st).save(t), this;
  }
  restore(t) {
    n(this, st).restore(t, n(this, jn));
    const e = Object.getPrototypeOf(n(this, De));
    return e === null ? this : (f(this, De, e), f(this, Ie, Object.getPrototypeOf(n(this, Ie))), this);
  }
  recordOpenMarker(t) {
    return n(this, st).recordOpenMarker(t, n(this, jn)), this;
  }
  getOpenMarker() {
    return n(this, st).getOpenMarker();
  }
  recordCloseMarker(t) {
    return n(this, st).recordCloseMarker(t, n(this, jn)), this;
  }
  beginMarkedContent(t) {
    return n(this, st).beginMarkedContent(t), this;
  }
  endMarkedContent(t) {
    return n(this, st).endMarkedContent(t, n(this, jn)), this;
  }
  pushBaseTransform(t) {
    return n(this, st).pushBaseTransform(t), this;
  }
  popBaseTransform() {
    return n(this, st).popBaseTransform(), this;
  }
  recordSimpleData(t, e) {
    return n(this, De)[t] = e, this;
  }
  recordIncrementalData(t, e) {
    return n(this, Ie)[t].push(e), this;
  }
  resetIncrementalData(t, e) {
    return n(this, Ie)[t].length = 0, this;
  }
  recordNamedData(t, e) {
    return n(this, la).set(t, e), this;
  }
  recordSimpleDataFromNamed(t, e, s) {
    n(this, De)[t] = n(this, la).get(e) ?? s;
  }
  recordFutureForcedDependency(t, e) {
    return this.recordIncrementalData(Lo, e), this;
  }
  inheritSimpleDataAsFutureForcedDependencies(t) {
    for (const e of t)
      e in n(this, De) && this.recordFutureForcedDependency(e, n(this, De)[e]);
    return this;
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    for (const t of n(this, Ts))
      this.recordFutureForcedDependency(Lo, t);
    return this;
  }
  resetBBox(t) {
    return n(this, st).resetBBox(t), this;
  }
  recordClipBox(t, e, s, i, r, a) {
    return n(this, st).recordClipBox(t, e, s, i, r, a), this;
  }
  recordBBox(t, e, s, i, r, a) {
    return n(this, st).recordBBox(t, e, s, i, r, a), this;
  }
  recordCharacterBBox(t, e, s, i = 1, r = 0, a = 0, o) {
    const l = s.bbox;
    let h, c;
    if (l && (h = l[2] !== l[0] && l[3] !== l[1] && n(this, yl).get(s), h !== !1 && (c = [0, 0, 0, 0], D.axialAlignedBoundingBox(l, s.fontMatrix, c), (i !== 1 || r !== 0 || a !== 0) && gS(i, -i, r, a, c), h)))
      return this.recordBBox(t, e, c[0], c[2], c[1], c[3]);
    if (!o)
      return this.recordFullPageBBox(t);
    const d = o();
    return l && c && h === void 0 && (h = c[0] <= r - d.actualBoundingBoxLeft && c[2] >= r + d.actualBoundingBoxRight && c[1] <= a - d.actualBoundingBoxAscent && c[3] >= a + d.actualBoundingBoxDescent, n(this, yl).set(s, h), h) ? this.recordBBox(t, e, c[0], c[2], c[1], c[3]) : this.recordBBox(t, e, r - d.actualBoundingBoxLeft, r + d.actualBoundingBoxRight, a - d.actualBoundingBoxAscent, a + d.actualBoundingBoxDescent);
  }
  recordFullPageBBox(t) {
    return n(this, st).recordFullPageBBox(t), this;
  }
  getSimpleIndex(t) {
    return n(this, De)[t];
  }
  recordDependencies(t, e) {
    const s = n(this, Ts), i = n(this, De), r = n(this, Ie);
    for (const a of e)
      a in n(this, De) ? s.add(i[a]) : a in r && r[a].forEach(s.add, s);
    return this;
  }
  recordNamedDependency(t, e) {
    return n(this, la).has(e) && n(this, Ts).add(n(this, la).get(e)), this;
  }
  recordOperation(t, e = !1) {
    if (this.recordDependencies(t, [Lo]), n(this, Vn)) {
      const i = QA(n(this, Vn), t), {
        dependencies: r
      } = i;
      n(this, Ts).forEach(r.add, r), n(this, st)._savesStack.forEach(r.add, r), n(this, st)._markedContentStack.forEach(r.add, r), r.delete(t), i.isRenderingOperation = !0;
    }
    const s = !e && t === n(this, st)._pendingBBoxIdx;
    return n(this, st).recordOperation(t, e, [n(this, Ts), n(this, st)._savesStack, n(this, st)._markedContentStack]), s && n(this, Ts).clear(), this;
  }
  recordShowTextOperation(t, e = !1) {
    const s = Array.from(n(this, Ts));
    this.recordOperation(t, e), this.recordIncrementalData("sameLineText", t);
    for (const i of s)
      this.recordIncrementalData("sameLineText", i);
    return this;
  }
  bboxToClipBoxDropOperation(t, e = !1) {
    const s = !e && t === n(this, st)._pendingBBoxIdx;
    return n(this, st).bboxToClipBoxDropOperation(t), s && n(this, Ts).clear(), this;
  }
  take() {
    return n(this, yl).clear(), n(this, st).take();
  }
  takeDebugMetadata() {
    return n(this, Vn);
  }
}
De = new WeakMap(), Ie = new WeakMap(), la = new WeakMap(), Ts = new WeakMap(), yl = new WeakMap(), Vn = new WeakMap(), jn = new WeakMap(), st = new WeakMap();
var it, Tt, ks, Al, wl;
const FA = class FA {
  constructor(t, e, s) {
    u(this, it, void 0);
    u(this, Tt, void 0);
    u(this, ks, void 0);
    u(this, Al, 0);
    u(this, wl, 0);
    if (t instanceof FA && n(t, ks) === !!s)
      return t;
    f(this, it, t), f(this, Tt, e), f(this, ks, !!s);
  }
  get clipBox() {
    return n(this, it).clipBox;
  }
  growOperationsCount() {
    throw new Error("Unreachable");
  }
  save(t) {
    return At(this, wl)._++, n(this, it).save(n(this, Tt)), this;
  }
  restore(t) {
    return n(this, wl) > 0 && (n(this, it).restore(n(this, Tt)), At(this, wl)._--), this;
  }
  recordOpenMarker(t) {
    return At(this, Al)._++, this;
  }
  getOpenMarker() {
    return n(this, Al) > 0 ? n(this, Tt) : n(this, it).getOpenMarker();
  }
  recordCloseMarker(t) {
    return At(this, Al)._--, this;
  }
  beginMarkedContent(t) {
    return this;
  }
  endMarkedContent(t) {
    return this;
  }
  pushBaseTransform(t) {
    return n(this, it).pushBaseTransform(t), this;
  }
  popBaseTransform() {
    return n(this, it).popBaseTransform(), this;
  }
  recordSimpleData(t, e) {
    return n(this, it).recordSimpleData(t, n(this, Tt)), this;
  }
  recordIncrementalData(t, e) {
    return n(this, it).recordIncrementalData(t, n(this, Tt)), this;
  }
  resetIncrementalData(t, e) {
    return n(this, it).resetIncrementalData(t, n(this, Tt)), this;
  }
  recordNamedData(t, e) {
    return this;
  }
  recordSimpleDataFromNamed(t, e, s) {
    return n(this, it).recordSimpleDataFromNamed(t, e, n(this, Tt)), this;
  }
  recordFutureForcedDependency(t, e) {
    return n(this, it).recordFutureForcedDependency(t, n(this, Tt)), this;
  }
  inheritSimpleDataAsFutureForcedDependencies(t) {
    return n(this, it).inheritSimpleDataAsFutureForcedDependencies(t), this;
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    return n(this, it).inheritPendingDependenciesAsFutureForcedDependencies(), this;
  }
  resetBBox(t) {
    return n(this, ks) || n(this, it).resetBBox(n(this, Tt)), this;
  }
  recordClipBox(t, e, s, i, r, a) {
    return n(this, ks) || n(this, it).recordClipBox(n(this, Tt), e, s, i, r, a), this;
  }
  recordBBox(t, e, s, i, r, a) {
    return n(this, ks) || n(this, it).recordBBox(n(this, Tt), e, s, i, r, a), this;
  }
  recordCharacterBBox(t, e, s, i, r, a, o) {
    return n(this, ks) || n(this, it).recordCharacterBBox(n(this, Tt), e, s, i, r, a, o), this;
  }
  recordFullPageBBox(t) {
    return n(this, ks) || n(this, it).recordFullPageBBox(n(this, Tt)), this;
  }
  getSimpleIndex(t) {
    return n(this, it).getSimpleIndex(t);
  }
  recordDependencies(t, e) {
    return n(this, it).recordDependencies(n(this, Tt), e), this;
  }
  recordNamedDependency(t, e) {
    return n(this, it).recordNamedDependency(n(this, Tt), e), this;
  }
  recordOperation(t) {
    return n(this, it).recordOperation(n(this, Tt), !0), this;
  }
  recordShowTextOperation(t) {
    return n(this, it).recordShowTextOperation(n(this, Tt), !0), this;
  }
  bboxToClipBoxDropOperation(t) {
    return n(this, ks) || n(this, it).bboxToClipBoxDropOperation(n(this, Tt), !0), this;
  }
  take() {
    throw new Error("Unreachable");
  }
  takeDebugMetadata() {
    throw new Error("Unreachable");
  }
};
it = new WeakMap(), Tt = new WeakMap(), ks = new WeakMap(), Al = new WeakMap(), wl = new WeakMap();
let Dc = FA;
const ns = {
  stroke: ["path", "transform", "filter", "strokeColor", "strokeAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "dash"],
  fill: ["path", "transform", "filter", "fillColor", "fillAlpha", "globalCompositeOperation", "SMask"],
  imageXObject: ["transform", "SMask", "filter", "fillAlpha", "strokeAlpha", "globalCompositeOperation"],
  rawFillPath: ["filter", "fillColor", "fillAlpha"],
  showText: ["transform", "leading", "charSpacing", "wordSpacing", "hScale", "textRise", "moveText", "textMatrix", "font", "fontObj", "filter", "fillColor", "textRenderingMode", "SMask", "fillAlpha", "strokeAlpha", "globalCompositeOperation", "sameLineText"],
  transform: ["transform"],
  transformAndFill: ["transform", "fillColor"]
};
var ha, ca, da, ua, fa, kd;
const Tc = class Tc {
  constructor(t) {
    u(this, ha, void 0);
    u(this, ca, void 0);
    u(this, da, 4);
    u(this, ua, 0);
    u(this, fa, new (n(Tc, kd))(n(this, da) * 6));
    f(this, ha, t.width), f(this, ca, t.height);
  }
  record(t, e, s, i) {
    if (n(this, ua) === n(this, da)) {
      f(this, da, n(this, da) * 2);
      const o = new (n(Tc, kd))(n(this, da) * 6);
      o.set(n(this, fa)), f(this, fa, o);
    }
    const r = ct(t);
    let a;
    if (i[0] !== 1 / 0) {
      const o = fn.slice();
      D.axialAlignedBoundingBox([0, -s, e, 0], r, o);
      const l = D.intersect(i, o);
      if (!l)
        return;
      const [h, c, d, p] = l;
      if (h !== o[0] || c !== o[1] || d !== o[2] || p !== o[3]) {
        const m = Math.atan2(r[1], r[0]), y = Math.abs(Math.sin(m)), A = Math.abs(Math.cos(m));
        if (y < 1e-6 || A < 1e-6 || Math.abs(y - A) < 1e-6)
          a = [h, c, h, p, d, c];
        else {
          const v = d - h, w = p - c, S = y * y, E = A * A, x = A * y, C = E - S, _ = (w * E - v * x) / C, k = (w * x - v * S) / C;
          a = [h + k, c, h, c + _, d, p - _];
        }
      }
    }
    a || (a = [0, -s, 0, 0, e, -s], D.applyTransform(a, r, 0), D.applyTransform(a, r, 2), D.applyTransform(a, r, 4)), a[0] /= n(this, ha), a[1] /= n(this, ca), a[2] /= n(this, ha), a[3] /= n(this, ca), a[4] /= n(this, ha), a[5] /= n(this, ca), n(this, fa).set(a, n(this, ua) * 6), At(this, ua)._++;
  }
  take() {
    return n(this, fa).subarray(0, n(this, ua) * 6);
  }
};
ha = new WeakMap(), ca = new WeakMap(), da = new WeakMap(), ua = new WeakMap(), fa = new WeakMap(), kd = new WeakMap(), u(Tc, kd, rt.isFloat16ArraySupported ? Float16Array : Float32Array);
let sy = Tc;
const JA = /\p{Cc}/u;
function AS(g) {
  const t = g[0];
  if (g.length < 2 || t !== '"' && t !== "'" || g.at(-1) !== t)
    return !1;
  const e = g.length - 1;
  for (let s = 1; s < e; s++) {
    const i = g[s];
    if (i === t || JA.test(i) || i === "\\" && (++s >= e || JA.test(g[s])))
      return !1;
  }
  return !0;
}
function ZA(g) {
  return AS(g) ? g : `"${g.replaceAll(/["\\\p{Cc}]/gu, (e) => e === '"' || e === "\\" ? `\\${e}` : `\\${e.codePointAt(0).toString(16)} `)}"`;
}
var vl, Ps, xg, nw;
class wS {
  constructor({
    ownerDocument: t = globalThis.document,
    styleElement: e = null
  }) {
    u(this, xg);
    u(this, vl, /* @__PURE__ */ new Set());
    u(this, Ps, null);
    this._document = t, this.nativeFontFaces = /* @__PURE__ */ new Set(), this.styleElement = null, this.loadingRequests = [], this.loadTestFontId = 0;
  }
  addNativeFontFace(t) {
    this.nativeFontFaces.add(t), this._document.fonts.add(t);
  }
  removeNativeFontFace(t) {
    this.nativeFontFaces.delete(t), this._document.fonts.delete(t);
  }
  insertRule(t) {
    const e = b(this, xg, nw).call(this);
    e.insertRule(t, e.cssRules.length);
  }
  clear() {
    for (const t of this.nativeFontFaces)
      this._document.fonts.delete(t);
    if (this.nativeFontFaces.clear(), n(this, vl).clear(), n(this, Ps)) {
      const {
        adoptedStyleSheets: t
      } = this._document;
      t != null && t.includes(n(this, Ps)) && (this._document.adoptedStyleSheets = t.filter((e) => e !== n(this, Ps))), f(this, Ps, null);
    }
    this.styleElement && (this.styleElement.remove(), this.styleElement = null);
  }
  async loadSystemFont({
    systemFontInfo: t,
    disableFontFace: e,
    _inspectFont: s
  }) {
    if (!(!t || n(this, vl).has(t.loadedName))) {
      if (Ct(!e, "loadSystemFont shouldn't be called when `disableFontFace` is set."), this.isFontLoadingAPISupported) {
        const {
          loadedName: i,
          src: r,
          style: a
        } = t, o = new FontFace(i, r, a);
        this.addNativeFontFace(o);
        try {
          await o.load(), n(this, vl).add(i), s == null || s(t);
        } catch {
          $(`Cannot load system font: ${t.baseFontName}, installing it could help to improve PDF rendering.`), this.removeNativeFontFace(o);
        }
        return;
      }
      K("Not implemented: loadSystemFont without the Font Loading API.");
    }
  }
  async bind(t) {
    if (t.attached || t.missingFile && !t.systemFontInfo)
      return;
    if (t.attached = !0, t.systemFontInfo) {
      await this.loadSystemFont(t);
      return;
    }
    if (this.isFontLoadingAPISupported) {
      const s = t.createNativeFontFace();
      if (s) {
        this.addNativeFontFace(s);
        try {
          await s.loaded;
        } catch (i) {
          throw $(`Failed to load font '${s.family}': '${i}'.`), t.disableFontFace = !0, i;
        }
      }
      return;
    }
    const e = t.createFontFaceRule();
    if (e) {
      if (this.insertRule(e), this.isSyncFontLoadingSupported)
        return;
      await new Promise((s) => {
        const i = this._queueLoadingCallback(s);
        this._prepareFontLoadEvent(t, i);
      });
    }
  }
  get isFontLoadingAPISupported() {
    var e;
    const t = !!((e = this._document) != null && e.fonts);
    return H(this, "isFontLoadingAPISupported", t);
  }
  get isSyncFontLoadingSupported() {
    return H(this, "isSyncFontLoadingSupported", es || rt.platform.isFirefox);
  }
  _queueLoadingCallback(t) {
    function e() {
      for (Ct(!i.done, "completeRequest() cannot be called twice."), i.done = !0; s.length > 0 && s[0].done; ) {
        const r = s.shift();
        setTimeout(r.callback, 0);
      }
    }
    const {
      loadingRequests: s
    } = this, i = {
      done: !1,
      complete: e,
      callback: t
    };
    return s.push(i), i;
  }
  get _loadTestFont() {
    const t = atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
    return H(this, "_loadTestFont", t);
  }
  _prepareFontLoadEvent(t, e) {
    function s(C, _) {
      return C.charCodeAt(_) << 24 | C.charCodeAt(_ + 1) << 16 | C.charCodeAt(_ + 2) << 8 | C.charCodeAt(_ + 3) & 255;
    }
    function i(C) {
      return String.fromCharCode(C >> 24 & 255, C >> 16 & 255, C >> 8 & 255, C & 255);
    }
    function r(C, _, k, P) {
      const M = C.substring(0, _), I = C.substring(_ + k);
      return M + P + I;
    }
    let a, o;
    const l = this._document.createElement("canvas");
    l.width = 1, l.height = 1;
    const h = l.getContext("2d");
    let c = 0;
    function d(C, _) {
      if (++c > 30) {
        $("Load test font never loaded."), _();
        return;
      }
      if (h.font = "30px " + C, h.fillText(".", 0, 20), h.getImageData(0, 0, 1, 1).data[3] > 0) {
        _();
        return;
      }
      setTimeout(d.bind(null, C, _));
    }
    const p = `lt${Date.now()}${this.loadTestFontId++}`;
    let m = this._loadTestFont;
    m = r(m, 976, p.length, p);
    const A = 16, v = 1482184792;
    let w = s(m, A);
    for (a = 0, o = p.length - 3; a < o; a += 4)
      w = w - v + s(p, a) | 0;
    a < p.length && (w = w - v + s(p + "XXX", a) | 0), m = r(m, A, 4, i(w));
    const S = `url(data:font/opentype;base64,${btoa(m)});`, E = `@font-face {font-family:"${p}";src:${S}}`;
    this.insertRule(E);
    const x = this._document.createElement("div");
    x.style.visibility = "hidden", x.style.width = x.style.height = "10px", x.style.position = "absolute", x.style.top = x.style.left = "0px";
    for (const C of [t.loadedName, p]) {
      const _ = this._document.createElement("span");
      _.textContent = "Hi", _.style.fontFamily = C, x.append(_);
    }
    this._document.body.append(x), d(p, () => {
      x.remove(), e.complete();
    });
  }
}
vl = new WeakMap(), Ps = new WeakMap(), xg = new WeakSet(), nw = function() {
  var e;
  if (n(this, Ps))
    return n(this, Ps);
  const t = ((e = this._document.defaultView) == null ? void 0 : e.CSSStyleSheet) || globalThis.CSSStyleSheet;
  if (!this.styleElement && t) {
    const {
      adoptedStyleSheets: s
    } = this._document;
    if (s) {
      const i = new t();
      return s.push(i), f(this, Ps, i);
    }
  }
  return this.styleElement || (this.styleElement = this._document.createElement("style"), this._document.documentElement.getElementsByTagName("head")[0].append(this.styleElement)), f(this, Ps, this.styleElement.sheet);
};
var nt;
class vS {
  constructor(t, e = null, s, i) {
    T(this, "compiledGlyphs", /* @__PURE__ */ Object.create(null));
    u(this, nt, void 0);
    f(this, nt, t), this._inspectFont = e, s && (this.charProcOperatorList = s), i && Object.assign(this, i);
  }
  createNativeFontFace() {
    var e;
    if (!this.data || this.disableFontFace)
      return null;
    let t;
    if (!this.cssFontInfo)
      t = new FontFace(this.loadedName, this.data, {});
    else {
      const s = {
        weight: this.cssFontInfo.fontWeight
      };
      this.cssFontInfo.italicAngle && (s.style = `oblique ${this.cssFontInfo.italicAngle}deg`), t = new FontFace(ZA(this.cssFontInfo.fontFamily), this.data, s);
    }
    return (e = this._inspectFont) == null || e.call(this, this), t;
  }
  createFontFaceRule() {
    var s;
    if (!this.data || this.disableFontFace)
      return null;
    const t = `url(data:${this.mimetype};base64,${this.data.toBase64()});`;
    let e;
    if (!this.cssFontInfo)
      e = `@font-face {font-family:"${this.loadedName}";src:${t}}`;
    else {
      let i = `font-weight: ${this.cssFontInfo.fontWeight};`;
      this.cssFontInfo.italicAngle && (i += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`), e = `@font-face {font-family:${ZA(this.cssFontInfo.fontFamily)};${i}src:${t}}`;
    }
    return (s = this._inspectFont) == null || s.call(this, this, t), e;
  }
  getPathGenerator(t, e) {
    if (this.compiledGlyphs[e] !== void 0)
      return this.compiledGlyphs[e];
    const s = this.loadedName + "_path_" + e;
    let i;
    try {
      i = t.get(s);
    } catch (a) {
      $(`getPathGenerator - ignoring character: "${a}".`);
    }
    const r = S0(i == null ? void 0 : i.path);
    return this.fontExtraProperties || t.delete(s), this.compiledGlyphs[e] = r;
  }
  get black() {
    return n(this, nt).black;
  }
  get bold() {
    return n(this, nt).bold;
  }
  get disableFontFace() {
    return n(this, nt).disableFontFace;
  }
  set disableFontFace(t) {
    H(this, "disableFontFace", !!t);
  }
  get fontExtraProperties() {
    return n(this, nt).fontExtraProperties;
  }
  get isInvalidPDFjsFont() {
    return n(this, nt).isInvalidPDFjsFont;
  }
  get isType3Font() {
    return n(this, nt).isType3Font;
  }
  get italic() {
    return n(this, nt).italic;
  }
  get missingFile() {
    return n(this, nt).missingFile;
  }
  get remeasure() {
    return n(this, nt).remeasure;
  }
  get vertical() {
    return n(this, nt).vertical;
  }
  get ascent() {
    return n(this, nt).ascent;
  }
  get defaultWidth() {
    return n(this, nt).defaultWidth;
  }
  get descent() {
    return n(this, nt).descent;
  }
  get bbox() {
    return n(this, nt).bbox;
  }
  get fontMatrix() {
    return n(this, nt).fontMatrix;
  }
  get fallbackName() {
    return n(this, nt).fallbackName;
  }
  get loadedName() {
    return n(this, nt).loadedName;
  }
  get mimetype() {
    return n(this, nt).mimetype;
  }
  get name() {
    return n(this, nt).name;
  }
  get data() {
    return n(this, nt).data;
  }
  clearData() {
    n(this, nt).clearData();
  }
  get cssFontInfo() {
    return n(this, nt).cssFontInfo;
  }
  get systemFontInfo() {
    return n(this, nt).systemFontInfo;
  }
  get defaultVMetrics() {
    return n(this, nt).defaultVMetrics;
  }
}
nt = new WeakMap();
class rw {
}
T(rw, "strings", ["fontFamily", "fontWeight", "italicAngle"]);
class aw {
}
T(aw, "strings", ["css", "loadedName", "baseFontName", "src"]);
const he = class he {
};
T(he, "bools", ["black", "bold", "disableFontFace", "fontExtraProperties", "isInvalidPDFjsFont", "isType3Font", "italic", "missingFile", "remeasure", "vertical"]), T(he, "numbers", ["ascent", "defaultWidth", "descent"]), T(he, "strings", ["fallbackName", "loadedName", "mimetype", "name"]), T(he, "OFFSET_NUMBERS", Math.ceil(he.bools.length * 2 / 8)), T(he, "OFFSET_BBOX", he.OFFSET_NUMBERS + he.numbers.length * 8), T(he, "OFFSET_FONT_MATRIX", he.OFFSET_BBOX + 1 + 2 * 4), T(he, "OFFSET_DEFAULT_VMETRICS", he.OFFSET_FONT_MATRIX + 1 + 8 * 6), T(he, "OFFSET_STRINGS", he.OFFSET_DEFAULT_VMETRICS + 1 + 2 * 3);
let Oe = he;
class _e {
}
T(_e, "KIND", 0), T(_e, "HAS_BBOX", 1), T(_e, "HAS_BACKGROUND", 2), T(_e, "SHADING_TYPE", 3), T(_e, "N_COORD", 4), T(_e, "N_COLOR", 8), T(_e, "N_STOP", 12), T(_e, "N_FIGURES", 16);
class Op {
  static get decoder() {
    return H(this, "decoder", new TextDecoder());
  }
  static get encoder() {
    return H(this, "encoder", new TextEncoder());
  }
}
var Pd, Sl, El, tp;
class SS {
  constructor(t) {
    u(this, El);
    u(this, Pd, void 0);
    u(this, Sl, void 0);
    f(this, Pd, t), f(this, Sl, new DataView(t));
  }
  get fontFamily() {
    return b(this, El, tp).call(this, 0);
  }
  get fontWeight() {
    return b(this, El, tp).call(this, 1);
  }
  get italicAngle() {
    return b(this, El, tp).call(this, 2);
  }
}
Pd = new WeakMap(), Sl = new WeakMap(), El = new WeakSet(), tp = function(t) {
  Ct(t < rw.strings.length, "Invalid string index");
  const {
    decoder: e
  } = Op;
  let s = 0;
  for (let r = 0; r < t; r++)
    s += n(this, Sl).getUint32(s) + 4;
  const i = n(this, Sl).getUint32(s);
  return e.decode(new Uint8Array(n(this, Pd), s + 4, i));
};
var pa, ri, ga, hc;
class ES {
  constructor(t) {
    u(this, ga);
    u(this, pa, void 0);
    u(this, ri, void 0);
    f(this, pa, t), f(this, ri, new DataView(t));
  }
  get guessFallback() {
    return n(this, ri).getUint8(0) !== 0;
  }
  get css() {
    return b(this, ga, hc).call(this, 0);
  }
  get loadedName() {
    return b(this, ga, hc).call(this, 1);
  }
  get baseFontName() {
    return b(this, ga, hc).call(this, 2);
  }
  get src() {
    return b(this, ga, hc).call(this, 3);
  }
  get style() {
    const {
      decoder: t
    } = Op;
    let e = 1;
    e += 4 + n(this, ri).getUint32(e);
    const s = n(this, ri).getUint32(e), i = t.decode(new Uint8Array(n(this, pa), e + 4, s));
    e += 4 + s;
    const r = n(this, ri).getUint32(e), a = t.decode(new Uint8Array(n(this, pa), e + 4, r));
    return {
      style: i,
      weight: a
    };
  }
}
pa = new WeakMap(), ri = new WeakMap(), ga = new WeakSet(), hc = function(t) {
  Ct(t < aw.strings.length, "Invalid string index");
  const {
    decoder: e
  } = Op;
  let s = 5;
  for (let r = 0; r < t; r++)
    s += n(this, ri).getUint32(s) + 4;
  const i = n(this, ri).getUint32(s);
  return e.decode(new Uint8Array(n(this, pa), s + 4, i));
};
var Ms, It, Ge, Ss, xl, ep, Cl, sp, ma, cc, Md, iy;
class xS {
  constructor({
    buffer: t,
    extra: e
  }) {
    u(this, Ge);
    u(this, xl);
    u(this, Cl);
    u(this, ma);
    u(this, Md);
    u(this, Ms, void 0);
    u(this, It, void 0);
    f(this, Ms, t), f(this, It, new DataView(t)), e && Object.assign(this, e);
  }
  get black() {
    return b(this, Ge, Ss).call(this, 0);
  }
  get bold() {
    return b(this, Ge, Ss).call(this, 1);
  }
  get disableFontFace() {
    return b(this, Ge, Ss).call(this, 2);
  }
  get fontExtraProperties() {
    return b(this, Ge, Ss).call(this, 3);
  }
  get isInvalidPDFjsFont() {
    return b(this, Ge, Ss).call(this, 4);
  }
  get isType3Font() {
    return b(this, Ge, Ss).call(this, 5);
  }
  get italic() {
    return b(this, Ge, Ss).call(this, 6);
  }
  get missingFile() {
    return b(this, Ge, Ss).call(this, 7);
  }
  get remeasure() {
    return b(this, Ge, Ss).call(this, 8);
  }
  get vertical() {
    return b(this, Ge, Ss).call(this, 9);
  }
  get ascent() {
    return b(this, xl, ep).call(this, 0);
  }
  get defaultWidth() {
    return b(this, xl, ep).call(this, 1);
  }
  get descent() {
    return b(this, xl, ep).call(this, 2);
  }
  get bbox() {
    return b(this, Cl, sp).call(this, Oe.OFFSET_BBOX, 4, "getInt16", 2);
  }
  get fontMatrix() {
    return b(this, Cl, sp).call(this, Oe.OFFSET_FONT_MATRIX, 6, "getFloat64", 8);
  }
  get defaultVMetrics() {
    return b(this, Cl, sp).call(this, Oe.OFFSET_DEFAULT_VMETRICS, 3, "getInt16", 2);
  }
  get fallbackName() {
    return b(this, ma, cc).call(this, 0);
  }
  get loadedName() {
    return b(this, ma, cc).call(this, 1);
  }
  get mimetype() {
    return b(this, ma, cc).call(this, 2);
  }
  get name() {
    return b(this, ma, cc).call(this, 3);
  }
  get data() {
    const {
      offset: t,
      length: e
    } = b(this, Md, iy).call(this);
    return e === 0 ? void 0 : new Uint8Array(n(this, Ms), t + 4, e);
  }
  clearData() {
    const {
      offset: t,
      length: e
    } = b(this, Md, iy).call(this);
    e !== 0 && (n(this, It).setUint32(t, 0), f(this, Ms, new Uint8Array(n(this, Ms), 0, t + 4).slice().buffer), f(this, It, new DataView(n(this, Ms))));
  }
  get cssFontInfo() {
    let t = Oe.OFFSET_STRINGS;
    const e = n(this, It).getUint32(t);
    t += 4 + e;
    const s = n(this, It).getUint32(t);
    t += 4 + s;
    const i = n(this, It).getUint32(t);
    if (i === 0)
      return null;
    const r = new Uint8Array(i);
    return r.set(new Uint8Array(n(this, Ms), t + 4, i)), new SS(r.buffer);
  }
  get systemFontInfo() {
    let t = Oe.OFFSET_STRINGS;
    const e = n(this, It).getUint32(t);
    t += 4 + e;
    const s = n(this, It).getUint32(t);
    if (s === 0)
      return null;
    const i = new Uint8Array(s);
    return i.set(new Uint8Array(n(this, Ms), t + 4, s)), new ES(i.buffer);
  }
}
Ms = new WeakMap(), It = new WeakMap(), Ge = new WeakSet(), Ss = function(t) {
  Ct(t < Oe.bools.length, "Invalid boolean index");
  const e = Math.floor(t / 4), s = t * 2 % 8, i = n(this, It).getUint8(e) >> s & 3;
  return i === 0 ? void 0 : i === 2;
}, xl = new WeakSet(), ep = function(t) {
  return Ct(t < Oe.numbers.length, "Invalid number index"), n(this, It).getFloat64(Oe.OFFSET_NUMBERS + t * 8);
}, Cl = new WeakSet(), sp = function(t, e, s, i) {
  const r = n(this, It).getUint8(t);
  if (r === 0)
    return;
  Ct(r === e, "Invalid array length."), t += 1;
  const a = new Array(r);
  for (let o = 0; o < r; o++)
    a[o] = n(this, It)[s](t, !0), t += i;
  return a;
}, ma = new WeakSet(), cc = function(t) {
  Ct(t < Oe.strings.length, "Invalid string index");
  const {
    decoder: e
  } = Op;
  let s = Oe.OFFSET_STRINGS + 4;
  for (let r = 0; r < t; r++)
    s += n(this, It).getUint32(s) + 4;
  const i = n(this, It).getUint32(s);
  return e.decode(new Uint8Array(n(this, Ms), s + 4, i));
}, Md = new WeakSet(), iy = function() {
  let t = Oe.OFFSET_STRINGS;
  const e = n(this, It).getUint32(t);
  t += 4 + e;
  const s = n(this, It).getUint32(t);
  t += 4 + s;
  const i = n(this, It).getUint32(t);
  t += 4 + i;
  const r = n(this, It).getUint32(t);
  return {
    offset: t,
    length: r
  };
};
class CS {
  constructor(t) {
    this.buffer = t, this.view = new DataView(t), this.data = new Uint8Array(t);
  }
  getIR() {
    const t = this.view, e = this.data[_e.KIND], s = !!this.data[_e.HAS_BBOX], i = !!this.data[_e.HAS_BACKGROUND], r = t.getUint32(_e.N_COORD, !0), a = t.getUint32(_e.N_COLOR, !0), o = t.getUint32(_e.N_STOP, !0);
    let l = 20;
    const h = new Float32Array(this.buffer, l, r * 2);
    l += r * 8;
    const c = new Uint8Array(this.buffer, l, a * 4);
    l += a * 4;
    const d = [];
    for (let y = 0; y < o; ++y) {
      const A = t.getFloat32(l, !0);
      l += 4;
      const v = t.getUint32(l, !0);
      l += 4, d.push([A, `#${v.toString(16).padStart(6, "0")}`]);
    }
    let p = null;
    if (s) {
      p = [];
      for (let y = 0; y < 4; ++y)
        p.push(t.getFloat32(l, !0)), l += 4;
    }
    let m = null;
    if (i && (m = new Uint8Array(this.buffer, l, 3), l += 3), e === 1)
      return ["RadialAxial", "axial", p, d, Array.from(h.slice(0, 2)), Array.from(h.slice(2, 4)), null, null];
    if (e === 2)
      return ["RadialAxial", "radial", p, d, [h[0], h[1]], [h[3], h[4]], h[2], h[5]];
    if (e === 3) {
      const y = this.data[_e.SHADING_TYPE];
      let A = null;
      if (h.length > 0) {
        A = fn.slice();
        for (let v = 0, w = h.length; v < w; v += 2)
          D.pointBoundingBox(h[v], h[v + 1], A);
      }
      return ["Mesh", y, h, c, r, A, p, m];
    }
    throw new Error(`Unsupported pattern kind: ${e}`);
  }
}
var _l;
class _S {
  constructor(t) {
    u(this, _l, void 0);
    f(this, _l, t);
  }
  get path() {
    return rt.isFloat16ArraySupported ? new Float16Array(n(this, _l)) : new Float32Array(n(this, _l));
  }
}
_l = new WeakMap();
function TS(g) {
  if (g instanceof URL)
    return g;
  if (typeof g == "string") {
    if (es) {
      if (/^[a-z][a-z0-9\-+.]+:/i.test(g))
        return new URL(g);
      const e = process.getBuiltinModule("url");
      return new URL(e.pathToFileURL(g));
    }
    const t = URL.parse(g, window.location);
    if (t)
      return t;
  }
  throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
}
function kS(g) {
  if (es && typeof Buffer < "u" && g instanceof Buffer)
    throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`.");
  if (g instanceof Uint8Array && g.byteLength === g.buffer.byteLength)
    return g;
  if (typeof g == "string")
    return tb(g);
  if (g instanceof ArrayBuffer || ArrayBuffer.isView(g) || typeof g == "object" && !isNaN(g == null ? void 0 : g.length))
    return new Uint8Array(g);
  throw new Error("Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.");
}
function Bf(g) {
  if (typeof g != "string")
    return null;
  if (g.endsWith("/"))
    return g;
  throw new Error(`Invalid factory url: "${g}" must include trailing slash.`);
}
const ny = (g) => typeof g == "object" && Number.isInteger(g == null ? void 0 : g.num) && g.num >= 0 && Number.isInteger(g == null ? void 0 : g.gen) && g.gen >= 0, PS = (g) => typeof g == "object" && typeof (g == null ? void 0 : g.name) == "string", MS = Zv.bind(null, ny, PS);
var Bi, Cg;
class DS {
  constructor() {
    u(this, Bi, /* @__PURE__ */ new Map());
    u(this, Cg, Promise.resolve());
  }
  postMessage(t, e) {
    const s = {
      data: structuredClone(t, e ? {
        transfer: e
      } : null)
    };
    n(this, Cg).then(() => {
      for (const [i] of n(this, Bi))
        i.call(this, s);
    });
  }
  addEventListener(t, e, s = null) {
    let i = null;
    if ((s == null ? void 0 : s.signal) instanceof AbortSignal) {
      const {
        signal: r
      } = s;
      if (r.aborted) {
        $("LoopbackPort - cannot use an `aborted` signal.");
        return;
      }
      const a = () => this.removeEventListener(t, e);
      i = () => r.removeEventListener("abort", a), r.addEventListener("abort", a);
    }
    n(this, Bi).set(e, i);
  }
  removeEventListener(t, e) {
    const s = n(this, Bi).get(e);
    s == null || s(), n(this, Bi).delete(e);
  }
  terminate() {
    for (const [, t] of n(this, Bi))
      t == null || t();
    n(this, Bi).clear();
  }
}
Bi = new WeakMap(), Cg = new WeakMap();
const Hf = {
  DATA: 1,
  ERROR: 2
}, Ft = {
  CANCEL: 1,
  CANCEL_COMPLETE: 2,
  CLOSE: 3,
  ENQUEUE: 4,
  ERROR: 5,
  PULL: 6,
  PULL_COMPLETE: 7,
  START_COMPLETE: 8
};
function t0() {
}
function ke(g) {
  if (g instanceof Er || g instanceof Cb || g instanceof xb || g instanceof Lp || g instanceof gb)
    return g;
  switch (g instanceof Error || typeof g == "object" && g !== null || K('wrapReason: Expected "reason" to be a (possibly cloned) Error.'), g.name) {
    case "AbortException":
      return new Er(g.message);
    case "InvalidPDFException":
      return new Cb(g.message);
    case "PasswordException":
      return new xb(g.message, g.code);
    case "ResponseException":
      return new Lp(g.message, g.status, g.missing);
    case "UnknownErrorException":
      return new gb(g.message, g.details);
  }
  return new gb(g.message, g.toString());
}
var Tl, _g, ow, Tg, lw, kg, hw, kl, ip;
class dc {
  constructor(t, e, s) {
    u(this, _g);
    u(this, Tg);
    u(this, kg);
    u(this, kl);
    u(this, Tl, new AbortController());
    this.sourceName = t, this.targetName = e, this.comObj = s, this.callbackId = 1, this.streamId = 1, this.streamSinks = /* @__PURE__ */ Object.create(null), this.streamControllers = /* @__PURE__ */ Object.create(null), this.callbackCapabilities = /* @__PURE__ */ Object.create(null), this.actionHandler = /* @__PURE__ */ Object.create(null), s.addEventListener("message", b(this, _g, ow).bind(this), {
      signal: n(this, Tl).signal
    });
  }
  on(t, e) {
    const s = this.actionHandler;
    if (s[t])
      throw new Error(`There is already an actionName called "${t}"`);
    s[t] = e;
  }
  send(t, e, s) {
    this.comObj.postMessage({
      sourceName: this.sourceName,
      targetName: this.targetName,
      action: t,
      data: e
    }, s);
  }
  sendWithPromise(t, e, s) {
    const i = this.callbackId++, r = Promise.withResolvers();
    this.callbackCapabilities[i] = r;
    try {
      this.comObj.postMessage({
        sourceName: this.sourceName,
        targetName: this.targetName,
        action: t,
        callbackId: i,
        data: e
      }, s);
    } catch (a) {
      r.reject(a);
    }
    return r.promise;
  }
  sendWithStream(t, e, s, i) {
    const r = this.streamId++, a = this.sourceName, o = this.targetName, l = this.comObj;
    return new ReadableStream({
      start: (h) => {
        const c = Promise.withResolvers();
        return this.streamControllers[r] = {
          controller: h,
          startCall: c,
          pullCall: null,
          cancelCall: null,
          isClosed: !1
        }, l.postMessage({
          sourceName: a,
          targetName: o,
          action: t,
          streamId: r,
          data: e,
          desiredSize: h.desiredSize
        }, i), c.promise;
      },
      pull: (h) => {
        const c = Promise.withResolvers();
        return this.streamControllers[r].pullCall = c, l.postMessage({
          sourceName: a,
          targetName: o,
          stream: Ft.PULL,
          streamId: r,
          desiredSize: h.desiredSize
        }), c.promise;
      },
      cancel: (h) => {
        Ct(h instanceof Error, "cancel must have a valid reason");
        const c = Promise.withResolvers();
        return this.streamControllers[r].cancelCall = c, this.streamControllers[r].isClosed = !0, l.postMessage({
          sourceName: a,
          targetName: o,
          stream: Ft.CANCEL,
          streamId: r,
          reason: ke(h)
        }), c.promise;
      }
    }, s);
  }
  destroy() {
    var t;
    (t = n(this, Tl)) == null || t.abort(), f(this, Tl, null);
  }
}
Tl = new WeakMap(), _g = new WeakSet(), ow = function({
  data: t
}) {
  if (t.targetName !== this.sourceName)
    return;
  if (t.stream) {
    b(this, kg, hw).call(this, t);
    return;
  }
  if (t.callback) {
    const s = t.callbackId, i = this.callbackCapabilities[s];
    if (!i)
      throw new Error(`Cannot resolve callback ${s}`);
    if (delete this.callbackCapabilities[s], t.callback === Hf.DATA)
      i.resolve(t.data);
    else if (t.callback === Hf.ERROR)
      i.reject(ke(t.reason));
    else
      throw new Error("Unexpected callback case");
    return;
  }
  const e = this.actionHandler[t.action];
  if (!e)
    throw new Error(`Unknown action from worker: ${t.action}`);
  if (t.callbackId) {
    const s = this.sourceName, i = t.sourceName, r = this.comObj;
    Promise.try(e, t.data).then(function(a) {
      r.postMessage({
        sourceName: s,
        targetName: i,
        callback: Hf.DATA,
        callbackId: t.callbackId,
        data: a
      });
    }, function(a) {
      r.postMessage({
        sourceName: s,
        targetName: i,
        callback: Hf.ERROR,
        callbackId: t.callbackId,
        reason: ke(a)
      });
    });
    return;
  }
  if (t.streamId) {
    b(this, Tg, lw).call(this, t);
    return;
  }
  e(t.data);
}, Tg = new WeakSet(), lw = function(t) {
  const e = t.streamId, s = this.sourceName, i = t.sourceName, r = this.comObj, a = this, o = this.actionHandler[t.action], l = {
    enqueue(h, c = 1, d) {
      if (this.isCancelled)
        return;
      const p = this.desiredSize;
      this.desiredSize -= c, p > 0 && this.desiredSize <= 0 && (this.sinkCapability = Promise.withResolvers(), this.ready = this.sinkCapability.promise), r.postMessage({
        sourceName: s,
        targetName: i,
        stream: Ft.ENQUEUE,
        streamId: e,
        chunk: h
      }, d);
    },
    close() {
      this.isCancelled || (this.isCancelled = !0, r.postMessage({
        sourceName: s,
        targetName: i,
        stream: Ft.CLOSE,
        streamId: e
      }), delete a.streamSinks[e]);
    },
    error(h) {
      Ct(h instanceof Error, "error must have a valid reason"), !this.isCancelled && (this.isCancelled = !0, r.postMessage({
        sourceName: s,
        targetName: i,
        stream: Ft.ERROR,
        streamId: e,
        reason: ke(h)
      }));
    },
    sinkCapability: Promise.withResolvers(),
    onPull: null,
    onCancel: null,
    isCancelled: !1,
    desiredSize: t.desiredSize,
    ready: null
  };
  l.sinkCapability.resolve(), l.ready = l.sinkCapability.promise, this.streamSinks[e] = l, Promise.try(o, t.data, l).then(function() {
    r.postMessage({
      sourceName: s,
      targetName: i,
      stream: Ft.START_COMPLETE,
      streamId: e,
      success: !0
    });
  }, function(h) {
    r.postMessage({
      sourceName: s,
      targetName: i,
      stream: Ft.START_COMPLETE,
      streamId: e,
      reason: ke(h)
    });
  });
}, kg = new WeakSet(), hw = function(t) {
  const e = t.streamId, s = this.sourceName, i = t.sourceName, r = this.comObj, a = this.streamControllers[e], o = this.streamSinks[e];
  switch (t.stream) {
    case Ft.START_COMPLETE:
      t.success ? a.startCall.resolve() : a.startCall.reject(ke(t.reason));
      break;
    case Ft.PULL_COMPLETE:
      t.success ? a.pullCall.resolve() : a.pullCall.reject(ke(t.reason));
      break;
    case Ft.PULL:
      if (!o) {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: Ft.PULL_COMPLETE,
          streamId: e,
          success: !0
        });
        break;
      }
      o.desiredSize <= 0 && t.desiredSize > 0 && o.sinkCapability.resolve(), o.desiredSize = t.desiredSize, Promise.try(o.onPull || t0).then(function() {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: Ft.PULL_COMPLETE,
          streamId: e,
          success: !0
        });
      }, function(h) {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: Ft.PULL_COMPLETE,
          streamId: e,
          reason: ke(h)
        });
      });
      break;
    case Ft.ENQUEUE:
      if (Ct(a, "enqueue should have stream controller"), a.isClosed)
        break;
      a.controller.enqueue(t.chunk);
      break;
    case Ft.CLOSE:
      if (Ct(a, "close should have stream controller"), a.isClosed)
        break;
      a.isClosed = !0, a.controller.close(), b(this, kl, ip).call(this, a, e);
      break;
    case Ft.ERROR:
      Ct(a, "error should have stream controller"), a.controller.error(ke(t.reason)), b(this, kl, ip).call(this, a, e);
      break;
    case Ft.CANCEL_COMPLETE:
      t.success ? a.cancelCall.resolve() : a.cancelCall.reject(ke(t.reason)), b(this, kl, ip).call(this, a, e);
      break;
    case Ft.CANCEL:
      if (!o)
        break;
      const l = ke(t.reason);
      Promise.try(o.onCancel || t0, l).then(function() {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: Ft.CANCEL_COMPLETE,
          streamId: e,
          success: !0
        });
      }, function(h) {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: Ft.CANCEL_COMPLETE,
          streamId: e,
          reason: ke(h)
        });
      }), o.sinkCapability.reject(l), o.isCancelled = !0, delete this.streamSinks[e];
      break;
    default:
      throw new Error("Unexpected stream case");
  }
}, kl = new WeakSet(), ip = async function(t, e) {
  var s, i, r;
  await Promise.allSettled([(s = t.startCall) == null ? void 0 : s.promise, (i = t.pullCall) == null ? void 0 : i.promise, (r = t.cancelCall) == null ? void 0 : r.promise]), delete this.streamControllers[e];
};
var Pg;
class cw {
  constructor({
    cMapUrl: t = null,
    standardFontDataUrl: e = null,
    wasmUrl: s = null
  }) {
    u(this, Pg, Object.freeze({
      cMapUrl: "CMap",
      standardFontDataUrl: "font",
      wasmUrl: "wasm"
    }));
    this.cMapUrl = t, this.standardFontDataUrl = e, this.wasmUrl = s;
  }
  async fetch({
    kind: t,
    filename: e
  }) {
    switch (t) {
      case "cMapUrl":
      case "standardFontDataUrl":
      case "wasmUrl":
        break;
      default:
        K(`Not implemented: ${t}`);
    }
    const s = this[t];
    if (!s)
      throw new Error(`Ensure that the \`${t}\` API parameter is provided.`);
    const i = `${s}${e}`;
    return this._fetch(i, t).catch((r) => {
      throw new Error(`Unable to load ${n(this, Pg)[t]} data at: ${i}`);
    });
  }
  async _fetch(t, e) {
    K("Abstract method `_fetch` called.");
  }
}
Pg = new WeakMap();
class e0 extends cw {
  async _fetch(t, e) {
    const s = e === "cMapUrl" && !t.endsWith(".bcmap") ? "text" : "bytes", i = await vA(t, s);
    return i instanceof Uint8Array ? i : tb(i);
  }
}
var Dd;
class dw {
  constructor({
    enableHWA: t = !1
  }) {
    u(this, Dd, !1);
    f(this, Dd, t);
  }
  create(t, e) {
    if (t <= 0 || e <= 0)
      throw new Error("Invalid canvas size");
    const s = this._createCanvas(t, e);
    return {
      canvas: s,
      context: s.getContext("2d", {
        willReadFrequently: !n(this, Dd)
      })
    };
  }
  reset({
    canvas: t
  }, e, s) {
    if (!t)
      throw new Error("Canvas is not specified");
    if (e <= 0 || s <= 0)
      throw new Error("Invalid canvas size");
    t.width = e, t.height = s;
  }
  destroy(t) {
    const {
      canvas: e
    } = t;
    if (!e)
      throw new Error("Canvas is not specified");
    e.width = e.height = 0, t.canvas = null, t.context = null;
  }
  _createCanvas(t, e) {
    K("Abstract method `_createCanvas` called.");
  }
}
Dd = new WeakMap();
class IS extends dw {
  constructor({
    ownerDocument: t = globalThis.document,
    enableHWA: e = !1
  }) {
    super({
      enableHWA: e
    }), this._document = t;
  }
  _createCanvas(t, e) {
    const s = this._document.createElement("canvas");
    return s.width = t, s.height = e, s;
  }
}
class uw {
  addFilter(t) {
    return "none";
  }
  addHCMFilter(t, e) {
    return "none";
  }
  addAlphaFilter(t) {
    return "none";
  }
  addLuminosityFilter(t) {
    return "none";
  }
  addKnockoutFilter(t = 0) {
    return "none";
  }
  addHighlightHCMFilter(t, e, s, i, r) {
    return "none";
  }
  addSelectionHCMFilter(t, e) {
    return "none";
  }
  addSelectionFilter() {
    return "none";
  }
  createSelectionStyle(t = null) {
    return null;
  }
  destroy(t = !1) {
  }
}
var ba, Pl, Hi, ai, qt, ya, Wn, Nt, Xt, Aa, uc, ps, js, Ml, np, Ui, _r, Mg, fw, Id, ry, Gi, Tr, wa, fc, va, pc, Ld, ay, Sa, gc, Dg, pw, Fd, oy, Ig, gw;
class LS extends uw {
  constructor({
    docId: e,
    ownerDocument: s = globalThis.document
  }) {
    super();
    u(this, Nt);
    u(this, Aa);
    u(this, ps);
    u(this, Ml);
    u(this, Ui);
    u(this, Mg);
    u(this, Id);
    u(this, Gi);
    u(this, wa);
    u(this, va);
    u(this, Ld);
    u(this, Sa);
    u(this, Dg);
    u(this, Fd);
    u(this, Ig);
    u(this, ba, void 0);
    u(this, Pl, void 0);
    u(this, Hi, void 0);
    u(this, ai, void 0);
    u(this, qt, void 0);
    u(this, ya, void 0);
    u(this, Wn, 0);
    f(this, ai, e), f(this, qt, s);
  }
  addFilter(e) {
    if (!e)
      return "none";
    let s = n(this, Nt, Xt).get(e);
    if (s)
      return s;
    const [i, r, a] = b(this, Ml, np).call(this, e), o = e.length === 1 ? i : `${i}${r}${a}`;
    if (s = n(this, Nt, Xt).get(o), s)
      return n(this, Nt, Xt).set(e, s), s;
    const l = `g_${n(this, ai)}_transfer_map_${At(this, Wn)._++}`, h = b(this, Ui, _r).call(this, l);
    n(this, Nt, Xt).set(e, h), n(this, Nt, Xt).set(o, h);
    const c = b(this, Gi, Tr).call(this, l);
    return b(this, va, pc).call(this, i, r, a, c), h;
  }
  addHCMFilter(e, s) {
    var y;
    const i = `${e}-${s}`, r = "base";
    let a = n(this, Aa, uc).get(r);
    if ((a == null ? void 0 : a.key) === i || (a ? ((y = a.filter) == null || y.remove(), a.key = i, a.url = "none", a.filter = null) : (a = {
      key: i,
      url: "none",
      filter: null
    }, n(this, Aa, uc).set(r, a)), !e || !s))
      return a.url;
    const o = b(this, Sa, gc).call(this, e);
    e = D.makeHexColor(...o);
    const l = b(this, Sa, gc).call(this, s);
    if (s = D.makeHexColor(...l), b(this, Fd, oy).call(this), e === "#000000" && s === "#ffffff" || e === s)
      return a.url;
    const c = Array.from({
      length: 256
    }, (A, v) => Db(v / 255)).join(","), d = `g_${n(this, ai)}_hcm_filter`, p = a.filter = b(this, Gi, Tr).call(this, d);
    b(this, va, pc).call(this, c, c, c, p), b(this, Id, ry).call(this, p);
    const m = (A, v) => {
      const w = o[A] / 255, S = l[A] / 255, E = new Array(v + 1);
      for (let x = 0; x <= v; x++)
        E[x] = w + x / v * (S - w);
      return E.join(",");
    };
    return b(this, va, pc).call(this, m(0, 5), m(1, 5), m(2, 5), p), a.url = b(this, Ui, _r).call(this, d), a.url;
  }
  addSelectionHCMFilter(e, s) {
    return this.addHighlightHCMFilter("selection", e, s, "HighlightText", "Highlight");
  }
  addSelectionFilter() {
    return this.addHighlightHCMFilter("selection_default", "black", "white", "HighlightText", "Highlight");
  }
  createSelectionStyle(e = null) {
    const s = e ? this.addSelectionHCMFilter(e.foreground, e.background) : this.addSelectionFilter();
    return s === "none" || !rt.platform.isFirefox ? null : {
      "backdrop-filter": s,
      "background-color": "transparent"
    };
  }
  addAlphaFilter(e) {
    let s = n(this, Nt, Xt).get(e);
    if (s)
      return s;
    const [i] = b(this, Ml, np).call(this, [e]), r = `alpha_${i}`;
    if (s = n(this, Nt, Xt).get(r), s)
      return n(this, Nt, Xt).set(e, s), s;
    const a = `g_${n(this, ai)}_alpha_map_${At(this, Wn)._++}`, o = b(this, Ui, _r).call(this, a);
    n(this, Nt, Xt).set(e, o), n(this, Nt, Xt).set(r, o);
    const l = b(this, Gi, Tr).call(this, a);
    return b(this, Ld, ay).call(this, i, l), o;
  }
  addLuminosityFilter(e) {
    let s = n(this, Nt, Xt).get(e || "luminosity");
    if (s)
      return s;
    let i, r;
    if (e ? ([i] = b(this, Ml, np).call(this, [e]), r = `luminosity_${i}`) : r = "luminosity", s = n(this, Nt, Xt).get(r), s)
      return n(this, Nt, Xt).set(e, s), s;
    const a = `g_${n(this, ai)}_luminosity_map_${At(this, Wn)._++}`, o = b(this, Ui, _r).call(this, a);
    n(this, Nt, Xt).set(e, o), n(this, Nt, Xt).set(r, o);
    const l = b(this, Gi, Tr).call(this, a);
    return b(this, Mg, fw).call(this, l), e && b(this, Ld, ay).call(this, i, l), o;
  }
  addKnockoutFilter(e = 0) {
    const s = e > 0 ? Math.min(1 / e, 1e6) : 1e6, i = `knockout_${s}`, r = n(this, Nt, Xt).get(i);
    if (r)
      return r;
    const a = `g_${n(this, ai)}_knockout_filter_${At(this, Wn)._++}`, o = b(this, Ui, _r).call(this, a);
    n(this, Nt, Xt).set(i, o);
    const l = b(this, Gi, Tr).call(this, a), h = n(this, qt).createElementNS(Ce, "feComponentTransfer");
    l.append(h);
    const c = n(this, qt).createElementNS(Ce, "feFuncA");
    return c.setAttribute("type", "linear"), c.setAttribute("slope", `${s}`), c.setAttribute("intercept", "0"), h.append(c), o;
  }
  addHighlightHCMFilter(e, s, i, r, a) {
    var S;
    const o = `${s}-${i}-${r}-${a}`;
    let l = n(this, Aa, uc).get(e);
    if ((l == null ? void 0 : l.key) === o || (l ? ((S = l.filter) == null || S.remove(), l.key = o, l.url = "none", l.filter = null) : (l = {
      key: o,
      url: "none",
      filter: null
    }, n(this, Aa, uc).set(e, l)), !s || !i))
      return l.url;
    const [h, c] = [s, i].map(b(this, Sa, gc).bind(this));
    let d = Math.round(0.2126 * h[0] + 0.7152 * h[1] + 0.0722 * h[2]), p = Math.round(0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]), [m, y] = [r, a].map(b(this, Ig, gw).bind(this));
    p < d && ([d, p, m, y] = [p, d, y, m]), b(this, Fd, oy).call(this);
    const A = (E, x, C) => {
      const _ = new Array(256), k = (p - d) / C, P = E / 255, M = (x - E) / (255 * C);
      let I = 0;
      for (let R = 0; R <= C; R++) {
        const X = Math.round(d + R * k), V = P + R * M;
        for (let W = I; W <= X; W++)
          _[W] = V;
        I = X + 1;
      }
      for (let R = I; R < 256; R++)
        _[R] = _[I - 1];
      return _.join(",");
    }, v = `g_${n(this, ai)}_hcm_${e}_filter`, w = l.filter = b(this, Gi, Tr).call(this, v);
    return b(this, Id, ry).call(this, w), b(this, va, pc).call(this, A(m[0], y[0], 5), A(m[1], y[1], 5), A(m[2], y[2], 5), w), l.url = b(this, Ui, _r).call(this, v), l.url;
  }
  destroy(e = !1) {
    var s, i, r, a;
    e && ((s = n(this, ya)) != null && s.size) || ((i = n(this, Hi)) == null || i.parentNode.parentNode.remove(), f(this, Hi, null), (r = n(this, Pl)) == null || r.clear(), f(this, Pl, null), (a = n(this, ya)) == null || a.clear(), f(this, ya, null), f(this, Wn, 0));
  }
}
ba = new WeakMap(), Pl = new WeakMap(), Hi = new WeakMap(), ai = new WeakMap(), qt = new WeakMap(), ya = new WeakMap(), Wn = new WeakMap(), Nt = new WeakSet(), Xt = function() {
  return n(this, Pl) || f(this, Pl, /* @__PURE__ */ new Map());
}, Aa = new WeakSet(), uc = function() {
  return n(this, ya) || f(this, ya, /* @__PURE__ */ new Map());
}, ps = new WeakSet(), js = function() {
  if (!n(this, Hi)) {
    const e = n(this, qt).createElement("div"), {
      style: s
    } = e;
    s.colorScheme = "only light", s.visibility = "hidden", s.contain = "strict", s.width = s.height = 0, s.position = "absolute", s.top = s.left = 0, s.zIndex = -1;
    const i = n(this, qt).createElementNS(Ce, "svg");
    i.setAttribute("width", 0), i.setAttribute("height", 0), f(this, Hi, n(this, qt).createElementNS(Ce, "defs")), e.append(i), i.append(n(this, Hi)), n(this, qt).body.append(e);
  }
  return n(this, Hi);
}, Ml = new WeakSet(), np = function(e) {
  if (e.length === 1) {
    const h = e[0], c = new Array(256);
    for (let p = 0; p < 256; p++)
      c[p] = h[p] / 255;
    const d = c.join(",");
    return [d, d, d];
  }
  const [s, i, r] = e, a = new Array(256), o = new Array(256), l = new Array(256);
  for (let h = 0; h < 256; h++)
    a[h] = s[h] / 255, o[h] = i[h] / 255, l[h] = r[h] / 255;
  return [a.join(","), o.join(","), l.join(",")];
}, Ui = new WeakSet(), _r = function(e) {
  if (n(this, ba) === void 0) {
    f(this, ba, "");
    const s = n(this, qt).URL;
    s !== n(this, qt).baseURI && (eb(s) ? $('#createUrl: ignore "data:"-URL for performance reasons.') : f(this, ba, A0(s, "")));
  }
  return `url(${n(this, ba)}#${e})`;
}, Mg = new WeakSet(), fw = function(e) {
  const s = n(this, qt).createElementNS(Ce, "feColorMatrix");
  s.setAttribute("type", "matrix"), s.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0.59 0.11 0 0"), e.append(s);
}, Id = new WeakSet(), ry = function(e) {
  const s = n(this, qt).createElementNS(Ce, "feColorMatrix");
  s.setAttribute("type", "matrix"), s.setAttribute("values", "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"), e.append(s);
}, Gi = new WeakSet(), Tr = function(e) {
  const s = n(this, qt).createElementNS(Ce, "filter");
  return s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("id", e), n(this, ps, js).append(s), s;
}, wa = new WeakSet(), fc = function(e, s, i) {
  const r = n(this, qt).createElementNS(Ce, s);
  r.setAttribute("type", "discrete"), r.setAttribute("tableValues", i), e.append(r);
}, va = new WeakSet(), pc = function(e, s, i, r) {
  const a = n(this, qt).createElementNS(Ce, "feComponentTransfer");
  r.append(a), b(this, wa, fc).call(this, a, "feFuncR", e), b(this, wa, fc).call(this, a, "feFuncG", s), b(this, wa, fc).call(this, a, "feFuncB", i);
}, Ld = new WeakSet(), ay = function(e, s) {
  const i = n(this, qt).createElementNS(Ce, "feComponentTransfer");
  s.append(i), b(this, wa, fc).call(this, i, "feFuncA", e);
}, Sa = new WeakSet(), gc = function(e) {
  return n(this, ps, js).style.color = "CanvasText", n(this, ps, js).style.backgroundColor = e, Rf(getComputedStyle(n(this, ps, js)).getPropertyValue("background-color"));
}, Dg = new WeakSet(), pw = function(e) {
  return n(this, ps, js).style.color = "CanvasText", n(this, ps, js).style.backgroundColor = e, Ff(getComputedStyle(n(this, ps, js)).getPropertyValue("background-color"));
}, Fd = new WeakSet(), oy = function() {
  n(this, ps, js).style.color = "", n(this, ps, js).style.backgroundColor = "";
}, Ig = new WeakSet(), gw = function(e) {
  const [s, i, r, a] = b(this, Dg, pw).call(this, e);
  if (a === 1)
    return [s, i, r];
  const [o, l, h] = b(this, Sa, gc).call(this, "Canvas");
  return [Ab(s, o, a), Ab(i, l, a), Ab(r, h, a)];
};
function Ab(g, t, e) {
  return Math.round(e * g + (1 - e) * t);
}
es && $("Please use the `legacy` build in Node.js environments.");
async function FS(g) {
  const e = await process.getBuiltinModule("fs/promises").readFile(g);
  return new Uint8Array(e);
}
class RS extends uw {
}
class OS extends dw {
  _createCanvas(t, e) {
    return process.getBuiltinModule("module").createRequire(import.meta.url)("@napi-rs/canvas").createCanvas(t, e);
  }
}
class NS extends cw {
  async _fetch(t, e) {
    return FS(t);
  }
}
function mw({
  src: g,
  srcPos: t = 0,
  dest: e,
  width: s,
  height: i,
  nonBlackColor: r = 4294967295,
  inverseDecode: a = !1
}) {
  const o = rt.isLittleEndian ? 4278190080 : 255, [l, h] = a ? [r, o] : [o, r], c = s >> 3, d = s & 7, p = l ^ h, m = g.length;
  e = new Uint32Array(e.buffer);
  let y = 0;
  for (let A = 0; A < i; ++A) {
    for (const w = t + c; t < w; ++t, y += 8) {
      const S = g[t];
      e[y] = l ^ -(S >> 7 & 1) & p, e[y + 1] = l ^ -(S >> 6 & 1) & p, e[y + 2] = l ^ -(S >> 5 & 1) & p, e[y + 3] = l ^ -(S >> 4 & 1) & p, e[y + 4] = l ^ -(S >> 3 & 1) & p, e[y + 5] = l ^ -(S >> 2 & 1) & p, e[y + 6] = l ^ -(S >> 1 & 1) & p, e[y + 7] = l ^ -(S & 1) & p;
    }
    if (d === 0)
      continue;
    const v = t < m ? g[t++] : 255;
    for (let w = 0; w < d; ++w, ++y)
      e[y] = l ^ -(v >> 7 - w & 1) & p;
  }
  return {
    srcPos: t,
    destPos: y
  };
}
function BS({
  src: g,
  srcPos: t = 0,
  dest: e,
  destPos: s = 0,
  width: i,
  height: r
}) {
  let a = 0;
  const o = i * r * 3, l = o >> 2, h = new Uint32Array(g.buffer, t, l), c = rt.isLittleEndian ? 4278190080 : 255;
  if (rt.isLittleEndian) {
    for (; a < l - 2; a += 3, s += 4) {
      const d = h[a], p = h[a + 1], m = h[a + 2];
      e[s] = d | c, e[s + 1] = d >>> 24 | p << 8 | c, e[s + 2] = p >>> 16 | m << 16 | c, e[s + 3] = m >>> 8 | c;
    }
    for (let d = a * 4, p = t + o; d < p; d += 3)
      e[s++] = g[d] | g[d + 1] << 8 | g[d + 2] << 16 | c;
  } else {
    for (; a < l - 2; a += 3, s += 4) {
      const d = h[a], p = h[a + 1], m = h[a + 2];
      e[s] = d | c, e[s + 1] = d << 24 | p >>> 8 | c, e[s + 2] = p << 16 | m >>> 16 | c, e[s + 3] = m << 8 | c;
    }
    for (let d = a * 4, p = t + o; d < p; d += 3)
      e[s++] = g[d] << 24 | g[d + 1] << 16 | g[d + 2] << 8 | c;
  }
  return {
    srcPos: t + o,
    destPos: s
  };
}
const HS = `
struct Uniforms {
  offsetX      : f32,
  offsetY      : f32,
  scaleX       : f32,
  scaleY       : f32,
  paddedWidth  : f32,
  paddedHeight : f32,
  borderSize   : f32,
  _pad         : f32,
};

@group(0) @binding(0) var<uniform> u : Uniforms;

struct VertexInput {
  @location(0) position : vec2<f32>,
  @location(1) color    : vec4<f32>,
};

struct VertexOutput {
  @builtin(position) position : vec4<f32>,
  @location(0)       color    : vec3<f32>,
};

@vertex
fn vs_main(in : VertexInput) -> VertexOutput {
  var out : VertexOutput;
  let cx = (in.position.x + u.offsetX) * u.scaleX;
  let cy = (in.position.y + u.offsetY) * u.scaleY;
  out.position = vec4<f32>(
    ((cx + u.borderSize) / u.paddedWidth) * 2.0 - 1.0,
    1.0 - ((cy + u.borderSize) / u.paddedHeight) * 2.0,
    0.0,
    1.0
  );
  out.color = in.color.rgb;
  return out;
}

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4<f32> {
  return vec4<f32>(in.color, 1.0);
}
`;
var Lg, $i, Ea, Dl, Fg, bw;
class US {
  constructor() {
    u(this, Fg);
    u(this, Lg, null);
    u(this, $i, null);
    u(this, Ea, null);
    u(this, Dl, null);
  }
  init() {
    return n(this, Lg) || f(this, Lg, b(this, Fg, bw).call(this));
  }
  get isReady() {
    return n(this, $i) !== null;
  }
  loadMeshShader() {
    if (!n(this, $i) || n(this, Ea))
      return;
    const t = n(this, $i).createShaderModule({
      code: HS
    });
    f(this, Ea, n(this, $i).createRenderPipeline({
      layout: "auto",
      vertex: {
        module: t,
        entryPoint: "vs_main",
        buffers: [{
          arrayStride: 2 * 4,
          attributes: [{
            shaderLocation: 0,
            offset: 0,
            format: "float32x2"
          }]
        }, {
          arrayStride: 4,
          attributes: [{
            shaderLocation: 1,
            offset: 0,
            format: "unorm8x4"
          }]
        }]
      },
      fragment: {
        module: t,
        entryPoint: "fs_main",
        targets: [{
          format: n(this, Dl)
        }]
      },
      primitive: {
        topology: "triangle-list"
      }
    }));
  }
  draw(t, e, s, i, r, a, o, l) {
    this.loadMeshShader();
    const h = n(this, $i), {
      offsetX: c,
      offsetY: d,
      scaleX: p,
      scaleY: m
    } = i, y = h.createBuffer({
      size: Math.max(t.byteLength, 4),
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    t.byteLength > 0 && h.queue.writeBuffer(y, 0, t);
    const A = h.createBuffer({
      size: Math.max(e.byteLength, 4),
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    e.byteLength > 0 && h.queue.writeBuffer(A, 0, e);
    const v = h.createBuffer({
      size: 8 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    h.queue.writeBuffer(v, 0, new Float32Array([c, d, p, m, a, o, l, 0]));
    const w = h.createBindGroup({
      layout: n(this, Ea).getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: v
        }
      }]
    }), S = new OffscreenCanvas(a, o), E = S.getContext("webgpu");
    E.configure({
      device: h,
      format: n(this, Dl),
      alphaMode: r ? "opaque" : "premultiplied"
    });
    const x = r ? {
      r: r[0] / 255,
      g: r[1] / 255,
      b: r[2] / 255,
      a: 1
    } : {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    }, C = h.createCommandEncoder(), _ = C.beginRenderPass({
      colorAttachments: [{
        view: E.getCurrentTexture().createView(),
        clearValue: x,
        loadOp: "clear",
        storeOp: "store"
      }]
    });
    return s > 0 && (_.setPipeline(n(this, Ea)), _.setBindGroup(0, w), _.setVertexBuffer(0, y), _.setVertexBuffer(1, A), _.draw(s)), _.end(), h.queue.submit([C.finish()]), y.destroy(), A.destroy(), v.destroy(), S.transferToImageBitmap();
  }
}
Lg = new WeakMap(), $i = new WeakMap(), Ea = new WeakMap(), Dl = new WeakMap(), Fg = new WeakSet(), bw = async function() {
  var t;
  if (!((t = globalThis.navigator) != null && t.gpu))
    return !1;
  try {
    const e = await navigator.gpu.requestAdapter();
    return e ? (f(this, Dl, navigator.gpu.getPreferredCanvasFormat()), f(this, $i, await e.requestDevice()), !0) : !1;
  } catch {
    return !1;
  }
};
const sb = new US();
function GS() {
  return sb.init();
}
function $S() {
  return sb.isReady;
}
function zS() {
  sb.loadMeshShader();
}
function VS(g, t, e, s, i, r, a, o) {
  return sb.draw(g, t, e, s, i, r, a, o);
}
const oe = {
  FILL: "Fill",
  STROKE: "Stroke",
  SHADING: "Shading"
};
function rp(g, t) {
  if (!t)
    return;
  const e = t[2] - t[0], s = t[3] - t[1], i = new Path2D();
  i.rect(t[0], t[1], e, s), g.clip(i);
}
class CA {
  constructor() {
    T(this, "matrix", null);
  }
  isModifyingCurrentTransform() {
    return !1;
  }
  getPattern() {
    K("Abstract method `getPattern` called.");
  }
}
class jS extends CA {
  constructor(t) {
    super(), this._type = t[1], this._bbox = t[2], this._colorStops = t[3], this._p0 = t[4], this._p1 = t[5], this._r0 = t[6], this._r1 = t[7];
  }
  isOriginBased() {
    return this._p0[0] === 0 && this._p0[1] === 0 && (!this.isRadial() || this._p1[0] === 0 && this._p1[1] === 0);
  }
  isRadial() {
    return this._type === "radial";
  }
  areConic() {
    if (!this.isRadial())
      return !1;
    const t = Math.hypot(this._p0[0] - this._p1[0], this._p0[1] - this._p1[1]);
    return t + this._r1 > this._r0 && t + this._r0 > this._r1;
  }
  _createGradient(t, e = null) {
    let s, i = this._p0, r = this._p1;
    if (e && (i = i.slice(), r = r.slice(), D.applyTransform(i, e), D.applyTransform(r, e)), this._type === "axial")
      s = t.createLinearGradient(i[0], i[1], r[0], r[1]);
    else if (this._type === "radial") {
      let a = this._r0, o = this._r1;
      if (e) {
        const l = new Float32Array(2);
        D.singularValueDecompose2dScale(e, l), a *= l[0], o *= l[0];
      }
      s = t.createRadialGradient(i[0], i[1], a, r[0], r[1], o);
    }
    for (const a of this._colorStops)
      s.addColorStop(a[0], a[1]);
    return s;
  }
  _createReversedGradient(t, e = null) {
    let s = this._p1, i = this._p0;
    e && (s = s.slice(), i = i.slice(), D.applyTransform(s, e), D.applyTransform(i, e));
    let r = this._r1, a = this._r0;
    if (e) {
      const h = new Float32Array(2);
      D.singularValueDecompose2dScale(e, h), r *= h[0], a *= h[0];
    }
    const o = t.createRadialGradient(s[0], s[1], r, i[0], i[1], a), l = this._colorStops.map(([h, c]) => [1 - h, c]).reverse();
    for (const [h, c] of l)
      o.addColorStop(h, c);
    return o;
  }
  getPattern(t, e, s, i) {
    let r;
    if (i === oe.STROKE || i === oe.FILL) {
      if (this.isOriginBased()) {
        let p = D.transform(s, e.baseTransform);
        this.matrix && (p = D.transform(p, this.matrix));
        const m = 1e-3, y = Math.hypot(p[0], p[1]), A = Math.hypot(p[2], p[3]), v = (p[0] * p[2] + p[1] * p[3]) / (y * A);
        if (Math.abs(v) < m)
          if (this.isRadial()) {
            if (Math.abs(y - A) < m)
              return this._createGradient(t, p);
          } else
            return this._createGradient(t, p);
      }
      const a = e.current.getClippedPathBoundingBox(i, ct(t)) || [0, 0, 0, 0], o = Math.ceil(a[2] - a[0]) || 1, l = Math.ceil(a[3] - a[1]) || 1, h = e.canvasFactory.create(o, l), c = h.context;
      c.clearRect(0, 0, c.canvas.width, c.canvas.height), c.beginPath(), c.rect(0, 0, c.canvas.width, c.canvas.height), c.translate(-a[0], -a[1]), s = D.transform(s, [1, 0, 0, 1, a[0], a[1]]), c.transform(...e.baseTransform), this.matrix && c.transform(...this.matrix), rp(c, this._bbox), this.areConic() && (c.fillStyle = this._createReversedGradient(c), c.fill()), c.fillStyle = this._createGradient(c), c.fill(), r = t.createPattern(h.canvas, "no-repeat"), e.canvasFactory.destroy(h);
      const d = new DOMMatrix(s);
      r.setTransform(d);
    } else
      this.areConic() && (t.save(), rp(t, this._bbox), t.fillStyle = this._createReversedGradient(t), t.fillRect(-1e10, -1e10, 2e10, 2e10), t.restore()), rp(t, this._bbox), r = this._createGradient(t);
    return r;
  }
}
function WS(g, t, e, s, i, r, a, o) {
  const l = t.coords, h = t.colors, c = g.data, d = g.width * 4;
  let p;
  l[e * 2 + 1] > l[s * 2 + 1] && (p = e, e = s, s = p, p = r, r = a, a = p), l[s * 2 + 1] > l[i * 2 + 1] && (p = s, s = i, i = p, p = a, a = o, o = p), l[e * 2 + 1] > l[s * 2 + 1] && (p = e, e = s, s = p, p = r, r = a, a = p);
  const m = (l[e * 2] + t.offsetX) * t.scaleX, y = (l[e * 2 + 1] + t.offsetY) * t.scaleY, A = (l[s * 2] + t.offsetX) * t.scaleX, v = (l[s * 2 + 1] + t.offsetY) * t.scaleY, w = (l[i * 2] + t.offsetX) * t.scaleX, S = (l[i * 2 + 1] + t.offsetY) * t.scaleY;
  if (y >= S)
    return;
  const E = h[r * 4], x = h[r * 4 + 1], C = h[r * 4 + 2], _ = h[a * 4], k = h[a * 4 + 1], P = h[a * 4 + 2], M = h[o * 4], I = h[o * 4 + 1], R = h[o * 4 + 2], X = Math.round(y), V = Math.round(S);
  let W, Mt, L, B, ft, pt, me, te;
  for (let Lt = X; Lt <= V; Lt++) {
    if (Lt < v) {
      const ot = Lt < y ? 0 : (y - Lt) / (y - v);
      W = m - (m - A) * ot, Mt = E - (E - _) * ot, L = x - (x - k) * ot, B = C - (C - P) * ot;
    } else {
      let ot;
      Lt > S ? ot = 1 : v === S ? ot = 0 : ot = (v - Lt) / (v - S), W = A - (A - w) * ot, Mt = _ - (_ - M) * ot, L = k - (k - I) * ot, B = P - (P - R) * ot;
    }
    let Z;
    Lt < y ? Z = 0 : Lt > S ? Z = 1 : Z = (y - Lt) / (y - S), ft = m - (m - w) * Z, pt = E - (E - M) * Z, me = x - (x - I) * Z, te = C - (C - R) * Z;
    const $s = Math.round(Math.min(W, ft)), tc = Math.round(Math.max(W, ft));
    let Wt = d * Lt + $s * 4;
    for (let ot = $s; ot <= tc; ot++)
      Z = (W - ot) / (W - ft), Z < 0 ? Z = 0 : Z > 1 && (Z = 1), c[Wt++] = Mt - (Mt - pt) * Z | 0, c[Wt++] = L - (L - me) * Z | 0, c[Wt++] = B - (B - te) * Z | 0, c[Wt++] = 255;
  }
}
class XS extends CA {
  constructor(t) {
    super(), this._posData = t[2], this._colData = t[3], this._vertexCount = t[4], this._bounds = t[5], this._bbox = t[6], this._background = t[7], zS();
  }
  _createMeshCanvas(t, e, s) {
    const o = Math.floor(this._bounds[0]), l = Math.floor(this._bounds[1]), h = Math.ceil(this._bounds[2]) - o, c = Math.ceil(this._bounds[3]) - l, d = Math.min(Math.ceil(Math.abs(h * t[0] * 1.1)), 3e3) || 1, p = Math.min(Math.ceil(Math.abs(c * t[1] * 1.1)), 3e3) || 1, m = h ? h / d : 1, y = c ? c / p : 1, A = {
      coords: this._posData,
      colors: this._colData,
      offsetX: -o,
      offsetY: -l,
      scaleX: 1 / m,
      scaleY: 1 / y
    }, v = d + 2 * 2, w = p + 2 * 2, S = s.create(v, w);
    if ($S() && this._vertexCount > 48)
      S.context.drawImage(VS(this._posData, this._colData, this._vertexCount, A, e, v, w, 2), 0, 0);
    else {
      const E = S.context.createImageData(d, p);
      if (e) {
        const x = E.data;
        for (let C = 0, _ = x.length; C < _; C += 4)
          x[C] = e[0], x[C + 1] = e[1], x[C + 2] = e[2], x[C + 3] = 255;
      }
      for (let x = 0, C = this._vertexCount; x < C; x += 3)
        WS(E, A, x, x + 1, x + 2, x, x + 1, x + 2);
      S.context.putImageData(E, 2, 2);
    }
    return {
      canvas: S.canvas,
      offsetX: o - 2 * m,
      offsetY: l - 2 * y,
      scaleX: m,
      scaleY: y
    };
  }
  isModifyingCurrentTransform() {
    return !0;
  }
  getPattern(t, e, s, i) {
    rp(t, this._bbox);
    const r = new Float32Array(2);
    if (i === oe.SHADING)
      D.singularValueDecompose2dScale(ct(t), r);
    else if (this.matrix) {
      D.singularValueDecompose2dScale(this.matrix, r);
      const [l, h] = r;
      D.singularValueDecompose2dScale(e.baseTransform, r), r[0] *= l, r[1] *= h;
    } else
      D.singularValueDecompose2dScale(e.baseTransform, r);
    const a = this._createMeshCanvas(r, i === oe.SHADING ? null : this._background, e.canvasFactory);
    i !== oe.SHADING && (t.setTransform(...e.baseTransform), this.matrix && t.transform(...this.matrix)), t.translate(a.offsetX, a.offsetY), t.scale(a.scaleX, a.scaleY);
    const o = t.createPattern(a.canvas, "no-repeat");
    return e.canvasFactory.destroy(a), o;
  }
}
class YS extends CA {
  getPattern() {
    return "hotpink";
  }
}
function KS(g) {
  switch (g[0]) {
    case "RadialAxial":
      return new jS(g);
    case "Mesh":
      return new XS(g);
    case "Dummy":
      return new YS();
  }
  throw new Error(`Unknown IR type: ${g[0]}`);
}
const s0 = {
  COLORED: 1,
  UNCOLORED: 2
}, Rg = class Rg {
  constructor(t, e, s, i) {
    this.color = t[1], this.operatorList = t[2], this.matrix = t[3], this.bbox = t[4], this.xstep = t[5], this.ystep = t[6], this.paintType = t[7], this.tilingType = t[8], this.needsIsolation = t[9] ?? !0, this.ctx = e, this.canvasGraphicsFactory = s, this.baseTransform = i, this.patternBaseMatrix = this.matrix ? D.transform(i, this.matrix) : i;
  }
  canSkipPatternCanvas([t, e, s, i]) {
    const [r, a, o, l] = this.bbox, h = Math.abs(this.xstep), c = Math.abs(this.ystep);
    if (t > h + 1e-6 || e > c + 1e-6)
      return null;
    const d = Math.floor((s - o) / h) + 1, p = Math.ceil((s + t - r) / h) - 1, m = Math.floor((i - l) / c) + 1, y = Math.ceil((i + e - a) / c) - 1;
    return p <= d && y <= m ? [d, m] : null;
  }
  updatePatternDims(t, e) {
    const s = D.inverseTransform(this.patternBaseMatrix), i = [t[0], t[1]], r = [t[2], t[3]];
    D.applyTransform(i, s), D.applyTransform(r, s), e[0] = Math.abs(r[0] - i[0]), e[1] = Math.abs(r[1] - i[1]), e[2] = Math.min(i[0], r[0]), e[3] = Math.min(i[1], r[1]);
  }
  _renderTileCanvas(t, e, s, i) {
    var p, m;
    const [r, a, o, l] = this.bbox, h = t.canvasFactory.create(s.size, i.size), c = h.context, d = this.canvasGraphicsFactory.createCanvasGraphics(c, e);
    return d.groupLevel = t.groupLevel, this.setFillAndStrokeStyleToContext(d, this.paintType, this.color), c.translate(-s.scale * r, -i.scale * a), d.transform(0, s.scale, 0, 0, i.scale, 0, 0), c.save(), (p = d.dependencyTracker) == null || p.save(), this.clipBbox(d, r, a, o, l), d.baseTransform = ct(d.ctx), d.executeOperatorList(this.operatorList), d.endDrawing(), (m = d.dependencyTracker) == null || m.restore(), c.restore(), h;
  }
  _getCombinedScales() {
    const t = new Float32Array(2);
    D.singularValueDecompose2dScale(this.matrix, t);
    const [e, s] = t;
    return D.singularValueDecompose2dScale(this.baseTransform, t), [e * t[0], s * t[1]];
  }
  drawPattern(t, e, s = !1, [i, r], a) {
    const [o, l, h, c] = this.bbox, d = t.dependencyTracker;
    if (d && (t.dependencyTracker = new Dc(d, a)), t.save(), s ? t.ctx.clip(e, "evenodd") : t.ctx.clip(e), t.ctx.setTransform(...this.patternBaseMatrix), t.ctx.translate(i * this.xstep, r * this.ystep), this.needsIsolation || t.ctx.globalAlpha !== 1 || t.ctx.globalCompositeOperation !== "source-over" || t.inSMaskMode) {
      const p = h - o, m = c - l, [y, A] = this._getCombinedScales(), v = this.getSizeAndScale(p, this.ctx.canvas.width, y), w = this.getSizeAndScale(m, this.ctx.canvas.height, A), S = this._renderTileCanvas(t, a, v, w);
      t.ctx.drawImage(S.canvas, o, l, p, m), t.canvasFactory.destroy(S);
    } else
      this.setFillAndStrokeStyleToContext(t, this.paintType, this.color), this.clipBbox(t, o, l, h, c), t.baseTransformStack.push(t.baseTransform), t.baseTransform = ct(t.ctx), t.executeOperatorList(this.operatorList), t.baseTransform = t.baseTransformStack.pop();
    t.restore(), d && (t.dependencyTracker = d);
  }
  createPatternCanvas(t, e) {
    const [s, i, r, a] = this.bbox, o = r - s, l = a - i;
    let {
      xstep: h,
      ystep: c
    } = this;
    h = Math.abs(h), c = Math.abs(c), Zm("TilingType: " + this.tilingType);
    const [d, p] = this._getCombinedScales();
    let m = o, y = l, A = !1, v = !1;
    Math.ceil(h * d) >= Math.ceil(o * d) ? m = h : A = !0, Math.ceil(c * p) >= Math.ceil(l * p) ? y = c : v = !0;
    const w = this.getSizeAndScale(m, this.ctx.canvas.width, d), S = this.getSizeAndScale(y, this.ctx.canvas.height, p), E = this._renderTileCanvas(t, e, w, S);
    if (A || v) {
      const x = E.canvas;
      A && (m = h), v && (y = c);
      const C = this.getSizeAndScale(m, this.ctx.canvas.width, d), _ = this.getSizeAndScale(y, this.ctx.canvas.height, p), k = C.size, P = _.size, M = t.canvasFactory.create(k, P), I = M.context, R = A ? Math.floor(o / h) : 0, X = v ? Math.floor(l / c) : 0;
      for (let V = 0; V <= R; V++)
        for (let W = 0; W <= X; W++)
          I.drawImage(x, k * V, P * W, k, P, 0, 0, k, P);
      return t.canvasFactory.destroy(E), {
        canvas: M.canvas,
        canvasEntry: M,
        scaleX: C.scale,
        scaleY: _.scale,
        offsetX: s,
        offsetY: i
      };
    }
    return {
      canvas: E.canvas,
      canvasEntry: E,
      scaleX: w.scale,
      scaleY: S.scale,
      offsetX: s,
      offsetY: i
    };
  }
  getSizeAndScale(t, e, s) {
    const i = Math.max(Rg.MAX_PATTERN_SIZE, e);
    let r = Math.ceil(t * s);
    return r >= i ? r = i : s = r / t, {
      scale: s,
      size: r
    };
  }
  clipBbox(t, e, s, i, r) {
    const a = i - e, o = r - s, l = new Path2D();
    l.rect(e, s, a, o), D.axialAlignedBoundingBox([e, s, i, r], ct(t.ctx), t.current.minMax), t.ctx.clip(l), t.current.updateClipFromPath();
  }
  setFillAndStrokeStyleToContext(t, e, s) {
    const i = t.ctx, r = t.current;
    switch (r.patternFill = r.patternStroke = !1, e) {
      case s0.COLORED:
        const {
          fillStyle: a,
          strokeStyle: o
        } = this.ctx;
        i.fillStyle = r.fillColor = a, i.strokeStyle = r.strokeColor = o;
        break;
      case s0.UNCOLORED:
        i.fillStyle = i.strokeStyle = s, r.fillColor = r.strokeColor = s;
        break;
      default:
        throw new Kv(`Unsupported paint type: ${e}`);
    }
  }
  isModifyingCurrentTransform() {
    return !1;
  }
  getPattern(t, e, s, i, r) {
    const a = i !== oe.SHADING ? D.transform(s, this.patternBaseMatrix) : s, o = this.createPatternCanvas(e, r);
    let l = new DOMMatrix(a);
    l = l.translate(o.offsetX, o.offsetY), l = l.scale(1 / o.scaleX, 1 / o.scaleY);
    const h = t.createPattern(o.canvas, "repeat");
    return e.canvasFactory.destroy(o.canvasEntry), h.setTransform(l), h;
  }
};
T(Rg, "MAX_PATTERN_SIZE", 3e3);
let _c = Rg;
const qS = 16, QS = 100, JS = 15, i0 = 10, Re = 16, ss = new Float32Array(2);
function n0(g, t) {
  if (g._removeMirroring)
    throw new Error("Context is already forwarding operations.");
  const e = /* @__PURE__ */ new Map();
  for (const s of ["save", "restore", "rotate", "scale", "translate", "transform", "setTransform", "resetTransform", "clip", "moveTo", "lineTo", "bezierCurveTo", "quadraticCurveTo", "arc", "arcTo", "ellipse", "rect", "roundRect", "closePath", "beginPath"]) {
    const i = g[s];
    typeof i != "function" || typeof t[s] != "function" || (e.set(s, i), g[s] = function(...r) {
      return t[s](...r), i.apply(this, r);
    });
  }
  g._removeMirroring = () => {
    for (const [s, i] of e)
      g[s] = i;
    delete g._removeMirroring;
  };
}
function Uf(g, t, e, s, i, r, a, o, l, h) {
  const [c, d, p, m, y, A] = ct(g);
  if (d === 0 && p === 0) {
    const S = a * c + y, E = Math.round(S), x = o * m + A, C = Math.round(x), _ = (a + l) * c + y, k = Math.abs(Math.round(_) - E) || 1, P = (o + h) * m + A, M = Math.abs(Math.round(P) - C) || 1;
    return g.setTransform(Math.sign(c), 0, 0, Math.sign(m), E, C), g.drawImage(t, e, s, i, r, 0, 0, k, M), g.setTransform(c, d, p, m, y, A), [k, M];
  }
  if (c === 0 && m === 0) {
    const S = o * p + y, E = Math.round(S), x = a * d + A, C = Math.round(x), _ = (o + h) * p + y, k = Math.abs(Math.round(_) - E) || 1, P = (a + l) * d + A, M = Math.abs(Math.round(P) - C) || 1;
    return g.setTransform(0, Math.sign(d), Math.sign(p), 0, E, C), g.drawImage(t, e, s, i, r, 0, 0, M, k), g.setTransform(c, d, p, m, y, A), [M, k];
  }
  g.drawImage(t, e, s, i, r, a, o, l, h);
  const v = Math.hypot(c, d), w = Math.hypot(p, m);
  return [v * l, w * h];
}
class r0 {
  constructor(t, e) {
    T(this, "alphaIsShape", !1);
    T(this, "fontSize", 0);
    T(this, "fontSizeScale", 1);
    T(this, "textMatrix", null);
    T(this, "textMatrixScale", 1);
    T(this, "fontMatrix", Sb);
    T(this, "leading", 0);
    T(this, "x", 0);
    T(this, "y", 0);
    T(this, "lineX", 0);
    T(this, "lineY", 0);
    T(this, "charSpacing", 0);
    T(this, "wordSpacing", 0);
    T(this, "textHScale", 1);
    T(this, "textRenderingMode", Gt.FILL);
    T(this, "textRise", 0);
    T(this, "fillColor", "#000000");
    T(this, "strokeColor", "#000000");
    T(this, "tilingPatternDims", null);
    T(this, "patternFill", !1);
    T(this, "patternStroke", !1);
    T(this, "fillAlpha", 1);
    T(this, "strokeAlpha", 1);
    T(this, "lineWidth", 1);
    T(this, "activeSMask", null);
    T(this, "transferMaps", "none");
    T(this, "minMax", Rr.slice());
    this.clipBox = new Float32Array([0, 0, t, e]);
  }
  clone() {
    var e;
    const t = Object.create(this);
    return t.clipBox = this.clipBox.slice(), t.minMax = this.minMax.slice(), t.tilingPatternDims = (e = this.tilingPatternDims) == null ? void 0 : e.slice(), t;
  }
  getPathBoundingBox(t = oe.FILL, e = null) {
    const s = this.minMax.slice();
    if (t === oe.STROKE) {
      e || K("Stroke bounding box must include transform."), D.singularValueDecompose2dScale(e, ss);
      const i = ss[0] * this.lineWidth / 2, r = ss[1] * this.lineWidth / 2;
      s[0] -= i, s[1] -= r, s[2] += i, s[3] += r;
    }
    return s;
  }
  updateClipFromPath() {
    const t = D.intersect(this.clipBox, this.getPathBoundingBox());
    this.startNewPathAndClipBox(t || [0, 0, 0, 0]);
  }
  isEmptyClip() {
    return this.minMax[0] === 1 / 0;
  }
  startNewPathAndClipBox(t) {
    this.clipBox.set(t, 0), this.minMax.set(Rr, 0);
  }
  getClippedPathBoundingBox(t = oe.FILL, e = null) {
    return D.intersect(this.clipBox, this.getPathBoundingBox(t, e));
  }
}
function a0(g, t) {
  const {
    width: e,
    height: s,
    kind: i
  } = t, r = s % Re, a = (s - r) / Re, o = r === 0 ? a : a + 1, l = g.createImageData(e, Re);
  let h = 0;
  const c = t.data, d = l.data;
  let p;
  if (i === Wf.GRAYSCALE_1BPP)
    for (p = 0; p < o; p++)
      ({
        srcPos: h
      } = mw({
        src: c,
        srcPos: h,
        dest: d,
        width: e,
        height: p < a ? Re : r
      })), g.putImageData(l, 0, p * Re);
  else if (i === Wf.RGBA_32BPP) {
    let m = 0, y = e * Re * 4;
    for (p = 0; p < a; p++)
      d.set(c.subarray(h, h + y)), h += y, g.putImageData(l, 0, m), m += Re;
    p < o && (y = e * r * 4, d.set(c.subarray(h, h + y)), g.putImageData(l, 0, m));
  } else if (i === Wf.RGB_24BPP)
    for (p = 0; p < o; p++)
      ({
        srcPos: h
      } = BS({
        src: c,
        srcPos: h,
        dest: new Uint32Array(d.buffer),
        width: e,
        height: p < a ? Re : r
      })), g.putImageData(l, 0, p * Re);
  else
    throw new Error(`bad image kind: ${i}`);
}
function o0(g, t) {
  if (t.bitmap) {
    g.drawImage(t.bitmap, 0, 0);
    return;
  }
  const {
    width: e,
    height: s
  } = t, i = s % Re, r = (s - i) / Re, a = i === 0 ? r : r + 1, o = g.createImageData(e, Re);
  let l = 0;
  const h = t.data, c = o.data;
  for (let d = 0; d < a; d++)
    ({
      srcPos: l
    } = mw({
      src: h,
      srcPos: l,
      dest: c,
      width: e,
      height: d < r ? Re : i,
      nonBlackColor: 0
    })), g.putImageData(o, 0, d * Re);
}
function Cr(g, t) {
  const e = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font", "filter"];
  for (const s of e)
    g[s] !== void 0 && (t[s] = g[s]);
  g.setLineDash !== void 0 && (t.setLineDash(g.getLineDash()), t.lineDashOffset = g.lineDashOffset);
}
function Gf(g) {
  g.strokeStyle = g.fillStyle = "#000000", g.fillRule = "nonzero", g.globalAlpha = 1, g.lineWidth = 1, g.lineCap = "butt", g.lineJoin = "miter", g.miterLimit = 10, g.globalCompositeOperation = "source-over", g.font = "10px sans-serif", g.setLineDash !== void 0 && (g.setLineDash([]), g.lineDashOffset = 0);
  const {
    filter: t
  } = g;
  t !== "none" && t !== "" && (g.filter = "none");
}
function l0(g, t) {
  if (t)
    return !0;
  D.singularValueDecompose2dScale(g, ss);
  const e = Math.fround(Gs.pixelRatio * xr.PDF_TO_CSS_UNITS);
  return ss[0] <= e && ss[1] <= e;
}
const ZS = ["butt", "round", "square"], tE = ["miter", "round", "bevel"], eE = {}, h0 = {};
var Og, $e, Xn, xa, Ca, _a, Ta, ka, Pa, Ma, oi, Rd, ly, Od, hy, Nd, cy, Bd, dy, Hd, uy, pe, Te, Qt, le, Ud, fy, Ng, yw, Il, ap;
const Ir = class Ir {
  constructor(t, e, s, i, r, {
    optionalContentConfig: a,
    markedContentStack: o = null
  }, l, h, c, d) {
    u(this, Rd);
    u(this, Od);
    u(this, Nd);
    u(this, Bd);
    u(this, Hd);
    u(this, pe);
    u(this, Qt);
    u(this, Ud);
    u(this, Ng);
    u(this, Il);
    u(this, $e, 0);
    u(this, Xn, 0);
    u(this, xa, null);
    u(this, Ca, null);
    u(this, _a, null);
    u(this, Ta, null);
    u(this, ka, 1);
    u(this, Pa, void 0);
    u(this, Ma, null);
    u(this, oi, []);
    this.ctx = t, this.current = new r0(this.ctx.canvas.width, this.ctx.canvas.height), this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.commonObjs = e, this.objs = s, this.canvasFactory = i, this.filterFactory = r, this.groupStack = [], this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.tempSMask = null, this.smaskGroupCanvases = [], this.smaskPreparedEntry = null, this.smaskPreparedFor = null, this.smaskPreparedOffsetX = 0, this.smaskPreparedOffsetY = 0, this.smaskPreparedOOBAlpha = null, this.suspendedCtx = null, this.contentVisible = !0, this.markedContentStack = o || [], this.optionalContentConfig = a, this.cachedPatterns = /* @__PURE__ */ new Map(), this.annotationCanvasMap = l, this.viewportScale = 1, this.outputScaleX = 1, this.outputScaleY = 1, this.pageColors = h, this._cachedScaleForStroking = [-1, 0], this._cachedGetSinglePixelWidth = null, this._cachedBitmapsMap = /* @__PURE__ */ new Map(), this.dependencyTracker = c ?? null, this.imagesTracker = d ?? null;
  }
  getObject(t, e, s = null) {
    var i;
    return typeof e == "string" ? ((i = this.dependencyTracker) == null || i.recordNamedDependency(t, e), e.startsWith("g_") ? this.commonObjs.get(e) : this.objs.get(e)) : s;
  }
  beginDrawing({
    transform: t,
    viewport: e,
    transparency: s = !1,
    background: i = null
  }) {
    const r = this.ctx.canvas.width, a = this.ctx.canvas.height, o = this.ctx.fillStyle;
    if (this.ctx.fillStyle = i || "#ffffff", this.ctx.fillRect(0, 0, r, a), this.ctx.fillStyle = o, s) {
      const l = this.transparentCanvasEntry = this.canvasFactory.create(r, a);
      this.compositeCtx = this.ctx, {
        canvas: this.transparentCanvas,
        context: this.ctx
      } = l, this.ctx.save(), this.ctx.transform(...ct(this.compositeCtx));
    }
    this.ctx.save(), Gf(this.ctx), t && (this.ctx.transform(...t), this.outputScaleX = t[0], this.outputScaleY = t[3]), this.ctx.transform(...e.transform), this.viewportScale = e.scale, this.baseTransform = ct(this.ctx);
  }
  executeOperatorList(t, e, s, i, r) {
    var w;
    const a = t.argsArray, o = t.fnArray;
    let l = e || 0;
    const h = a.length;
    if (h === l)
      return l;
    const c = h - l > i0 && typeof s == "function", d = c ? Date.now() + JS : 0;
    let p = 0;
    const m = this.commonObjs, y = this.objs;
    let A, v;
    for (; ; ) {
      if (i !== void 0) {
        if (l === i.nextBreakPoint)
          return i.breakIt(l, s), l;
        if (i.shouldSkip(l)) {
          if (++l === h)
            return l;
          continue;
        }
      }
      if (!r || r(l))
        if (A = o[l], v = a[l] ?? null, A !== Xs.dependency)
          v === null ? this[A](l) : this[A](l, ...v);
        else
          for (const S of v) {
            (w = this.dependencyTracker) == null || w.recordNamedData(S, l);
            const E = S.startsWith("g_") ? m : y;
            if (!E.has(S))
              return E.get(S, s), l;
          }
      if (l++, l === h)
        return l;
      if (c && ++p > i0) {
        if (Date.now() > d)
          return s(), l;
        p = 0;
      }
    }
  }
  endDrawing() {
    b(this, Rd, ly).call(this);
    for (const t of this.smaskGroupCanvases)
      this.canvasFactory.destroy(t);
    this.smaskGroupCanvases.length = 0, this._clearPreparedSMask(), this.tempSMask = null, this.smaskStack.length = 0;
    for (const t of n(this, oi))
      b(this, Il, ap).call(this, t);
    n(this, oi).length = 0, f(this, xa, null), f(this, Ca, null), f(this, _a, null), f(this, Ta, null), f(this, ka, 1), f(this, Ma, null), f(this, Xn, 0), f(this, $e, 0), this.cachedPatterns.clear();
    for (const t of this._cachedBitmapsMap.values()) {
      for (const e of t.values())
        typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement && (e.width = e.height = 0);
      t.clear();
    }
    this._cachedBitmapsMap.clear(), b(this, Od, hy).call(this);
  }
  _scaleImage(t, e) {
    const s = t.width ?? t.displayWidth, i = t.height ?? t.displayHeight, r = Math.max(Math.hypot(e[0], e[1]), 1), a = Math.max(Math.hypot(e[2], e[3]), 1), o = [];
    let l = r, h = a, c = s, d = i;
    for (; l > 2 && c > 1 || h > 2 && d > 1; ) {
      let w = c, S = d;
      l > 2 && c > 1 && (w = Math.ceil(c / 2), l /= c / w), h > 2 && d > 1 && (S = Math.ceil(d / 2), h /= d / S), o.push({
        newWidth: w,
        newHeight: S
      }), c = w, d = S;
    }
    if (o.length === 0)
      return {
        img: t,
        paintWidth: s,
        paintHeight: i,
        tmpCanvas: null
      };
    if (o.length === 1) {
      const {
        newWidth: w,
        newHeight: S
      } = o[0], E = this.canvasFactory.create(w, S);
      return E.context.drawImage(t, 0, 0, s, i, 0, 0, w, S), {
        img: E.canvas,
        paintWidth: w,
        paintHeight: S,
        tmpCanvas: E
      };
    }
    let p = this.canvasFactory.create(1, 1), m = this.canvasFactory.create(1, 1), y = s, A = i, v = t;
    for (const {
      newWidth: w,
      newHeight: S
    } of o)
      this.canvasFactory.reset(m, w, S), m.context.drawImage(v, 0, 0, y, A, 0, 0, w, S), [p, m] = [m, p], v = p.canvas, y = w, A = S;
    return this.canvasFactory.destroy(m), {
      img: p.canvas,
      paintWidth: y,
      paintHeight: A,
      tmpCanvas: p
    };
  }
  _createMaskCanvas(t, e) {
    var R, X;
    const s = this.ctx, {
      width: i,
      height: r
    } = e, a = this.current.fillColor, o = this.current.patternFill, l = ct(s);
    let h, c, d, p;
    if ((e.bitmap || e.data) && e.count > 1) {
      const V = e.bitmap || e.data.buffer;
      c = JSON.stringify(o ? l : [l.slice(0, 4), a]), h = this._cachedBitmapsMap.getOrInsertComputed(V, AA);
      const W = h.get(c);
      if (W && !o) {
        const Mt = Math.round(Math.min(l[0], l[2]) + l[4]), L = Math.round(Math.min(l[1], l[3]) + l[5]);
        return (R = this.dependencyTracker) == null || R.recordDependencies(t, ns.transformAndFill), {
          canvas: W,
          offsetX: Mt,
          offsetY: L
        };
      }
      d = W;
    }
    d || (p = this.canvasFactory.create(i, r), o0(p.context, e));
    let m = D.transform(l, [1 / i, 0, 0, -1 / r, 0, 0]);
    m = D.transform(m, [1, 0, 0, 1, 0, -r]);
    const y = Rr.slice();
    D.axialAlignedBoundingBox([0, 0, i, r], m, y);
    const [A, v, w, S] = y, E = Math.round(w - A) || 1, x = Math.round(S - v) || 1, C = this.canvasFactory.create(E, x), _ = C.context, k = A, P = v;
    _.translate(-k, -P), _.transform(...m);
    let M = null;
    if (!d) {
      const V = this._scaleImage(p.canvas, zs(_));
      d = V.img, M = V.tmpCanvas, d !== p.canvas && (this.canvasFactory.destroy(p), p = null), h && o && (h.set(c, d), M = null, p = null);
    }
    _.imageSmoothingEnabled = l0(ct(_), e.interpolate), Uf(_, d, 0, 0, d.width, d.height, 0, 0, i, r), M && this.canvasFactory.destroy(M), p && this.canvasFactory.destroy(p), _.globalCompositeOperation = "source-in";
    const I = D.transform(zs(_), [1, 0, 0, 1, -k, -P]);
    return _.fillStyle = o ? a.getPattern(s, this, I, oe.FILL, t) : a, _.fillRect(0, 0, i, r), h && !o && h.set(c, C.canvas), (X = this.dependencyTracker) == null || X.recordDependencies(t, ns.transformAndFill), {
      canvas: C.canvas,
      canvasEntry: h && !o ? null : C,
      offsetX: Math.round(k),
      offsetY: Math.round(P)
    };
  }
  setLineWidth(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("lineWidth", t), e !== this.current.lineWidth && (this._cachedScaleForStroking[0] = -1), this.current.lineWidth = e, this.ctx.lineWidth = e;
  }
  setLineCap(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("lineCap", t), this.ctx.lineCap = ZS[e];
  }
  setLineJoin(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("lineJoin", t), this.ctx.lineJoin = tE[e];
  }
  setMiterLimit(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("miterLimit", t), this.ctx.miterLimit = e;
  }
  setDash(t, e, s) {
    var r;
    (r = this.dependencyTracker) == null || r.recordSimpleData("dash", t);
    const i = this.ctx;
    i.setLineDash !== void 0 && (i.setLineDash(e), i.lineDashOffset = s);
  }
  setRenderingIntent(t, e) {
  }
  setFlatness(t, e) {
  }
  setGState(t, e) {
    var s, i, r, a, o;
    for (const [l, h] of e)
      switch (l) {
        case "LW":
          this.setLineWidth(t, h);
          break;
        case "LC":
          this.setLineCap(t, h);
          break;
        case "LJ":
          this.setLineJoin(t, h);
          break;
        case "ML":
          this.setMiterLimit(t, h);
          break;
        case "D":
          this.setDash(t, h[0], h[1]);
          break;
        case "RI":
          this.setRenderingIntent(t, h);
          break;
        case "FL":
          this.setFlatness(t, h);
          break;
        case "Font":
          this.setFont(t, h[0], h[1]);
          break;
        case "CA":
          (s = this.dependencyTracker) == null || s.recordSimpleData("strokeAlpha", t), this.current.strokeAlpha = h;
          break;
        case "ca":
          (i = this.dependencyTracker) == null || i.recordSimpleData("fillAlpha", t), this.ctx.globalAlpha = this.current.fillAlpha = h;
          break;
        case "BM":
          (r = this.dependencyTracker) == null || r.recordSimpleData("globalCompositeOperation", t), this.ctx.globalCompositeOperation = h;
          break;
        case "SMask":
          (a = this.dependencyTracker) == null || a.recordSimpleData("SMask", t), this.current.activeSMask = h ? this.tempSMask : null, this.current.activeSMask && (this.current.activeSMask.blendMode = this.ctx.globalCompositeOperation), this.tempSMask = null, this.checkSMaskState(t);
          break;
        case "TR":
          (o = this.dependencyTracker) == null || o.recordSimpleData("filter", t), this.ctx.filter = this.current.transferMaps = this.filterFactory.addFilter(h);
          break;
      }
  }
  get inSMaskMode() {
    return !!this.suspendedCtx;
  }
  _clearPreparedSMask() {
    this.smaskPreparedEntry && (this.canvasFactory.destroy(this.smaskPreparedEntry), this.smaskPreparedEntry = null), this.smaskPreparedFor = null, this.smaskPreparedOffsetX = 0, this.smaskPreparedOffsetY = 0, this.smaskPreparedOOBAlpha = null;
  }
  _ensurePreparedSMask(t) {
    t !== this.smaskPreparedFor && (this._clearPreparedSMask(), this._prepareSMaskCanvas(t));
  }
  checkSMaskState(t) {
    const e = this.inSMaskMode;
    this.current.activeSMask && !e ? this.beginSMaskMode(t) : !this.current.activeSMask && e ? this.endSMaskMode() : this.current.activeSMask && e && this._ensurePreparedSMask(this.current.activeSMask);
  }
  _prepareSMaskCanvas(t) {
    const {
      canvas: e,
      subtype: s,
      backdrop: i,
      transferMap: r
    } = t, a = s === "Luminosity" || s === "Alpha" && r;
    if (!a && !(s === "Luminosity" && i)) {
      this.smaskPreparedFor = t;
      return;
    }
    let o;
    if (s === "Luminosity" && i) {
      const [S, E, x] = Ff(i), C = Math.round(0.3 * S + 0.59 * E + 0.11 * x);
      o = (r == null ? void 0 : r[C]) ?? C;
    } else
      o = (r == null ? void 0 : r[0]) ?? 0;
    const l = 4, {
      width: h,
      height: c
    } = this.ctx.canvas, d = e.width * e.height, p = h * c < l * d, m = a ? {
      url: s === "Alpha" ? this.filterFactory.addAlphaFilter(r) : this.filterFactory.addLuminosityFilter(r),
      subtype: s,
      transferMap: r
    } : null, y = s === "Luminosity" ? i : null;
    let A, v, w;
    p ? (A = this._bakeSMaskCanvas(e, t.offsetX, t.offsetY, h, c, y, m), v = 0, w = 0) : (A = this._bakeSMaskCanvas(e, 0, 0, e.width, e.height, y, m), v = t.offsetX, w = t.offsetY), this.smaskPreparedEntry = A, this.smaskPreparedFor = t, this.smaskPreparedOffsetX = v, this.smaskPreparedOffsetY = w, this.smaskPreparedOOBAlpha = !p && o !== 0 ? o : null;
  }
  _bakeSMaskCanvas(t, e, s, i, r, a, o) {
    !a && !o && K("_bakeSMaskCanvas with neither backdrop nor filter");
    const l = this.canvasFactory.create(i, r), h = l.context;
    if (h.drawImage(t, e, s), a && (h.globalCompositeOperation = "destination-atop", h.fillStyle = a, h.fillRect(0, 0, i, r)), !o)
      return l;
    const c = this.canvasFactory.create(i, r), d = c.context;
    d.filter = o.url;
    const p = rt.isCanvasFilterSupported && d.filter !== "none" && d.filter !== "";
    if (d.drawImage(l.canvas, 0, 0), rt.isCanvasFilterSupported && (d.filter = "none"), !p) {
      const m = d.getImageData(0, 0, i, r), {
        data: y
      } = m, {
        transferMap: A
      } = o;
      if (o.subtype === "Luminosity")
        for (let v = 0, w = y.length; v < w; v += 4) {
          const S = 0.3 * y[v] + 0.59 * y[v + 1] + 0.11 * y[v + 2] + 0.5 | 0;
          y[v] = y[v + 1] = y[v + 2] = 0, y[v + 3] = (A == null ? void 0 : A[S]) ?? S;
        }
      else
        for (let v = 3, w = y.length; v < w; v += 4)
          y[v] = A[y[v]];
      d.putImageData(m, 0, 0);
    }
    return this.canvasFactory.destroy(l), c;
  }
  beginSMaskMode(t) {
    if (this.inSMaskMode)
      throw new Error("beginSMaskMode called while already in smask mode");
    const {
      width: e,
      height: s
    } = this.ctx.canvas, i = this.canvasFactory.create(e, s);
    this.smaskScratchCanvas = i, this.suspendedCtx = this.ctx;
    const r = this.ctx = i.context;
    r.setTransform(this.suspendedCtx.getTransform()), Cr(this.suspendedCtx, r), n0(r, this.suspendedCtx), this._ensurePreparedSMask(this.current.activeSMask), this.setGState(t, [["BM", "source-over"]]);
  }
  endSMaskMode() {
    if (!this.inSMaskMode)
      throw new Error("endSMaskMode called while not in smask mode");
    this.ctx._removeMirroring(), Cr(this.ctx, this.suspendedCtx), this.ctx = this.suspendedCtx, this.suspendedCtx = null, this.canvasFactory.destroy(this.smaskScratchCanvas), this.smaskScratchCanvas = null, this._clearPreparedSMask();
  }
  compose(t) {
    if (!this.current.activeSMask)
      return;
    t = t ? [Math.floor(t[0]), Math.floor(t[1]), Math.ceil(t[2]), Math.ceil(t[3])] : [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
    const e = this.current.activeSMask, s = this.suspendedCtx, i = n(this, Xn) > 0 && s === this.ctx;
    this.composeSMask(i ? null : s, e, this.ctx, t), !i && (this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.restore());
  }
  composeSMask(t, e, s, i) {
    const r = i[0], a = i[1], o = i[2] - r, l = i[3] - a;
    if (o === 0 || l === 0)
      return;
    const h = this.smaskPreparedEntry;
    if (h) {
      let c = r, d = a, p = o, m = l;
      const y = this.smaskPreparedOOBAlpha, A = y !== null;
      if (A) {
        c = Math.max(r, e.offsetX), d = Math.max(a, e.offsetY);
        const v = Math.min(r + o, e.offsetX + e.canvas.width), w = Math.min(a + l, e.offsetY + e.canvas.height);
        p = v - c, m = w - d;
      }
      if (p > 0 && m > 0) {
        const v = c - this.smaskPreparedOffsetX, w = d - this.smaskPreparedOffsetY;
        s.save(), s.globalAlpha = 1, s.setTransform(1, 0, 0, 1, 0, 0);
        const S = new Path2D();
        S.rect(c, d, p, m), s.clip(S), s.globalCompositeOperation = "destination-in", s.drawImage(h.canvas, v, w, p, m, c, d, p, m), s.restore();
      }
      A && y < 255 && this._applySMaskOOBAlpha(s, r, a, o, l, c, d, c + p, d + m, y);
    } else
      this.genericComposeSMask(e, s, o, l, r, a);
    t && (t.save(), t.globalAlpha = 1, t.globalCompositeOperation = e.blendMode || "source-over", t.setTransform(1, 0, 0, 1, 0, 0), t.drawImage(s.canvas, r, a, o, l, r, a, o, l), t.restore());
  }
  _applySMaskOOBAlpha(t, e, s, i, r, a, o, l, h, c) {
    const d = a < l && o < h;
    if (d && a === e && o === s && l === e + i && h === s + r)
      return;
    const p = new Path2D();
    p.rect(e, s, i, r), d && p.rect(a, o, l - a, h - o), t.save(), t.globalAlpha = c / 255, t.setTransform(1, 0, 0, 1, 0, 0), t.clip(p, "evenodd"), t.globalCompositeOperation = "destination-in", t.fillStyle = "#000000", t.fillRect(e, s, i, r), t.restore();
  }
  genericComposeSMask(t, e, s, i, r, a) {
    const {
      context: o,
      offsetX: l,
      offsetY: h
    } = t;
    e.save(), e.globalAlpha = 1, e.setTransform(1, 0, 0, 1, 0, 0);
    const c = new Path2D();
    c.rect(r, a, s, i), e.clip(c), e.globalCompositeOperation = "destination-in", e.drawImage(o.canvas, r - l, a - h, s, i, r, a, s, i), e.restore();
  }
  save(t) {
    var s;
    this.inSMaskMode && Cr(this.ctx, this.suspendedCtx), this.ctx.save();
    const e = this.current;
    this.stateStack.push(e), this.current = e.clone(), (s = this.dependencyTracker) == null || s.save(t);
  }
  restore(t) {
    var e;
    if ((e = this.dependencyTracker) == null || e.restore(t), this.stateStack.length === 0) {
      this.inSMaskMode && this.endSMaskMode();
      return;
    }
    this.current = this.stateStack.pop(), this.ctx.restore(), this.inSMaskMode && (Cr(this.suspendedCtx, this.ctx), this.ctx.setTransform(this.suspendedCtx.getTransform())), this.checkSMaskState(t), this.pendingClip = null, this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
  }
  transform(t, e, s, i, r, a, o) {
    var l;
    (l = this.dependencyTracker) == null || l.recordIncrementalData("transform", t), this.ctx.transform(e, s, i, r, a, o), this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
  }
  constructPath(t, e, s, i) {
    let [r] = s;
    if (!i) {
      r || (r = s[0] = new Path2D()), e !== Xs.stroke && e !== Xs.closeStroke && (this.current.tilingPatternDims = null), this[e](t, r);
      return;
    }
    if (this.dependencyTracker !== null) {
      const o = e === Xs.stroke ? this.current.lineWidth / 2 : 0;
      this.dependencyTracker.resetBBox(t).recordBBox(t, this.ctx, i[0] - o, i[2] + o, i[1] - o, i[3] + o).recordDependencies(t, ["transform"]);
    }
    r instanceof Path2D || (r = s[0] = S0(r)), D.axialAlignedBoundingBox(i, ct(this.ctx), this.current.minMax);
    const a = this.current.tilingPatternDims;
    if (a && e !== Xs.stroke && e !== Xs.closeStroke && this.current.fillColor instanceof _c) {
      const o = D.intersect(this.current.clipBox, this.current.minMax);
      o ? this.current.fillColor.updatePatternDims(o, a) : this.current.tilingPatternDims = null;
    }
    this[e](t, r), this._pathStartIdx = t;
  }
  closePath(t) {
    this.ctx.closePath();
  }
  stroke(t, e, s = !0) {
    var o;
    const i = s && b(this, pe, Te).call(this, this.current.strokeAlpha), r = this.ctx, a = this.current.strokeColor;
    if (r.globalAlpha = this.current.strokeAlpha, this.contentVisible)
      if (typeof a == "object" && (a != null && a.getPattern)) {
        const l = a.isModifyingCurrentTransform() ? r.getTransform() : null;
        if (r.save(), r.strokeStyle = a.getPattern(r, this, zs(r), oe.STROKE, t), l) {
          const h = new Path2D();
          h.addPath(e, r.getTransform().invertSelf().multiplySelf(l)), e = h;
        }
        this.rescaleAndStroke(e, !1), r.restore();
      } else
        this.rescaleAndStroke(e, !0);
    (o = this.dependencyTracker) == null || o.recordDependencies(t, ns.stroke), s && this.consumePath(t, e, this.current.getClippedPathBoundingBox(oe.STROKE, ct(this.ctx))), r.globalAlpha = this.current.fillAlpha, b(this, Qt, le).call(this, i);
  }
  closeStroke(t, e) {
    this.stroke(t, e);
  }
  fill(t, e, s = !0) {
    var c, d, p;
    const i = s && b(this, pe, Te).call(this, this.current.fillAlpha), r = this.ctx, a = this.current.fillColor, o = this.current.patternFill;
    let l = !1;
    const h = this.current.getClippedPathBoundingBox();
    if ((c = this.dependencyTracker) == null || c.recordDependencies(t, ns.fill), o) {
      const m = this.current.tilingPatternDims, y = m && a.canSkipPatternCanvas(m);
      if (y) {
        a.drawPattern(this, e, this.pendingEOFill, y, t), this.pendingEOFill = !1, s && this.consumePath(t, e, h), this.current.tilingPatternDims = null, b(this, Qt, le).call(this, i);
        return;
      }
      const A = a.isModifyingCurrentTransform() ? r.getTransform() : null;
      if ((d = this.dependencyTracker) == null || d.save(t), r.save(), r.fillStyle = a.getPattern(r, this, zs(r), oe.FILL, t), A) {
        const v = new Path2D();
        v.addPath(e, r.getTransform().invertSelf().multiplySelf(A)), e = v;
      }
      l = !0;
    }
    this.contentVisible && h !== null && (this.pendingEOFill ? (r.fill(e, "evenodd"), this.pendingEOFill = !1) : r.fill(e)), l && (r.restore(), (p = this.dependencyTracker) == null || p.restore(t)), s && this.consumePath(t, e, h), b(this, Qt, le).call(this, i);
  }
  eoFill(t, e) {
    this.pendingEOFill = !0, this.fill(t, e);
  }
  fillStroke(t, e) {
    const s = b(this, pe, Te).call(this, Math.min(this.current.fillAlpha, this.current.strokeAlpha));
    this.fill(t, e, !1), this.stroke(t, e, !1), this.consumePath(t, e), b(this, Qt, le).call(this, s);
  }
  eoFillStroke(t, e) {
    this.pendingEOFill = !0, this.fillStroke(t, e);
  }
  closeFillStroke(t, e) {
    this.fillStroke(t, e);
  }
  closeEOFillStroke(t, e) {
    this.pendingEOFill = !0, this.fillStroke(t, e);
  }
  endPath(t, e) {
    this.consumePath(t, e);
  }
  rawFillPath(t, e) {
    var i;
    const s = b(this, pe, Te).call(this, this.current.fillAlpha);
    this.ctx.fill(e), (i = this.dependencyTracker) == null || i.recordDependencies(t, ns.rawFillPath).recordOperation(t), b(this, Qt, le).call(this, s);
  }
  clip(t) {
    var e;
    (e = this.dependencyTracker) == null || e.recordFutureForcedDependency("clipMode", t), this.pendingClip = eE;
  }
  eoClip(t) {
    var e;
    (e = this.dependencyTracker) == null || e.recordFutureForcedDependency("clipMode", t), this.pendingClip = h0;
  }
  beginText(t) {
    var e;
    this.current.textMatrix = null, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0, (e = this.dependencyTracker) == null || e.recordOpenMarker(t).resetIncrementalData("sameLineText").resetIncrementalData("moveText", t);
  }
  endText(t) {
    const e = this.pendingTextPaths, s = this.ctx;
    if (this.dependencyTracker) {
      const {
        dependencyTracker: i
      } = this;
      e !== void 0 && i.recordFutureForcedDependency("textClip", i.getOpenMarker()).recordFutureForcedDependency("textClip", t), i.recordCloseMarker(t);
    }
    if (e !== void 0) {
      const i = new Path2D(), r = s.getTransform().invertSelf();
      for (const {
        transform: a,
        x: o,
        y: l,
        fontSize: h,
        path: c
      } of e)
        c && i.addPath(c, new DOMMatrix(a).preMultiplySelf(r).translate(o, l).scale(h, -h));
      s.clip(i);
    }
    delete this.pendingTextPaths;
  }
  setCharSpacing(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("charSpacing", t), this.current.charSpacing = e;
  }
  setWordSpacing(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("wordSpacing", t), this.current.wordSpacing = e;
  }
  setHScale(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("hScale", t), this.current.textHScale = e / 100;
  }
  setLeading(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("leading", t), this.current.leading = -e;
  }
  setFont(t, e, s) {
    var d, p;
    (d = this.dependencyTracker) == null || d.recordSimpleData("font", t).recordSimpleDataFromNamed("fontObj", e, t);
    const i = this.commonObjs.get(e), r = this.current;
    if (!i)
      throw new Error(`Can't find font for ${e}`);
    if (r.fontMatrix = i.fontMatrix || Sb, (r.fontMatrix[0] === 0 || r.fontMatrix[3] === 0) && $("Invalid font matrix for font " + e), s < 0 ? (s = -s, r.fontDirection = -1) : r.fontDirection = 1, this.current.font = i, this.current.fontSize = s, i.isType3Font)
      return;
    const a = i.loadedName || "sans-serif", o = ((p = i.systemFontInfo) == null ? void 0 : p.css) || `"${a}", ${i.fallbackName}`;
    let l = "normal";
    i.black ? l = "900" : i.bold && (l = "bold");
    const h = i.italic ? "italic" : "normal", c = ut(s, qS, QS);
    this.current.fontSizeScale = s / c, this.ctx.font = `${h} ${l} ${c}px ${o}`;
  }
  setTextRenderingMode(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("textRenderingMode", t), this.current.textRenderingMode = e;
  }
  setTextRise(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("textRise", t), this.current.textRise = e;
  }
  moveText(t, e, s) {
    var i;
    (i = this.dependencyTracker) == null || i.resetIncrementalData("sameLineText").recordIncrementalData("moveText", t), this.current.x = this.current.lineX += e, this.current.y = this.current.lineY += s;
  }
  setLeadingMoveText(t, e, s) {
    this.setLeading(t, -s), this.moveText(t, e, s);
  }
  setTextMatrix(t, e) {
    var i;
    (i = this.dependencyTracker) == null || i.resetIncrementalData("sameLineText").recordSimpleData("textMatrix", t);
    const {
      current: s
    } = this;
    s.textMatrix = e, s.textMatrixScale = Math.hypot(e[0], e[1]), s.x = s.lineX = 0, s.y = s.lineY = 0;
  }
  nextLine(t) {
    var e;
    this.moveText(t, 0, this.current.leading), (e = this.dependencyTracker) == null || e.recordIncrementalData("moveText", this.dependencyTracker.getSimpleIndex("leading") ?? t);
  }
  paintChar(t, e, s, i, r, a) {
    var w, S, E, x;
    const o = this.ctx, l = this.current, h = l.font, c = l.textRenderingMode, d = l.fontSize / l.fontSizeScale, p = c & Gt.FILL_STROKE_MASK, m = !!(c & Gt.ADD_TO_PATH_FLAG), y = l.patternFill && !h.missingFile, A = l.patternStroke && !h.missingFile;
    let v;
    if ((h.disableFontFace || m || y || A) && !h.missingFile && (v = h.getPathGenerator(this.commonObjs, e)), v && (h.disableFontFace || y || A)) {
      o.save(), o.translate(s, i), o.scale(d, -d), (w = this.dependencyTracker) == null || w.recordCharacterBBox(t, o, h);
      let C;
      if (p === Gt.FILL || p === Gt.FILL_STROKE)
        if (r) {
          C = o.getTransform(), o.setTransform(...r);
          const _ = b(this, Ud, fy).call(this, v, C, r);
          o.fill(_);
        } else
          o.fill(v);
      if (p === Gt.STROKE || p === Gt.FILL_STROKE)
        if (a) {
          C || (C = o.getTransform()), o.setTransform(...a);
          const {
            a: _,
            b: k,
            c: P,
            d: M
          } = C, I = D.inverseTransform(a), R = D.transform([_, k, P, M, 0, 0], I);
          D.singularValueDecompose2dScale(R, ss), o.lineWidth *= Math.max(ss[0], ss[1]) / d, o.stroke(b(this, Ud, fy).call(this, v, C, a));
        } else
          o.lineWidth /= d, o.stroke(v);
      o.restore();
    } else
      (p === Gt.FILL || p === Gt.FILL_STROKE) && (o.fillText(e, s, i), (S = this.dependencyTracker) == null || S.recordCharacterBBox(t, o, h, d, s, i, () => o.measureText(e))), (p === Gt.STROKE || p === Gt.FILL_STROKE) && (this.dependencyTracker && ((E = this.dependencyTracker) == null || E.recordCharacterBBox(t, o, h, d, s, i, () => o.measureText(e)).recordDependencies(t, ns.stroke)), o.strokeText(e, s, i));
    m && ((this.pendingTextPaths || (this.pendingTextPaths = [])).push({
      transform: ct(o),
      x: s,
      y: i,
      fontSize: d,
      path: v
    }), (x = this.dependencyTracker) == null || x.recordCharacterBBox(t, o, h, d, s, i));
  }
  get isFontSubpixelAAEnabled() {
    const t = this.canvasFactory.create(10, 10), e = t.context;
    e.scale(1.5, 1), e.fillText("I", 0, 10);
    const s = e.getImageData(0, 0, 10, 10).data;
    this.canvasFactory.destroy(t);
    let i = !1;
    for (let r = 3; r < s.length; r += 4)
      if (s[r] > 0 && s[r] < 255) {
        i = !0;
        break;
      }
    return H(this, "isFontSubpixelAAEnabled", i);
  }
  showText(t, e) {
    var X, V, W, Mt;
    this.dependencyTracker && (this.dependencyTracker.recordDependencies(t, ns.showText).resetBBox(t), this.current.textRenderingMode & Gt.ADD_TO_PATH_FLAG && this.dependencyTracker.recordFutureForcedDependency("textClip", t).inheritPendingDependenciesAsFutureForcedDependencies());
    const s = this.current, i = s.font;
    if (i.isType3Font) {
      const L = b(this, pe, Te).call(this, s.fillAlpha);
      this.showType3Text(t, e), (X = this.dependencyTracker) == null || X.recordShowTextOperation(t), b(this, Qt, le).call(this, L);
      return;
    }
    const r = s.fontSize;
    if (r === 0) {
      (V = this.dependencyTracker) == null || V.recordOperation(t);
      return;
    }
    const a = b(this, pe, Te).call(this, s.fillAlpha), o = this.ctx, l = s.fontSizeScale, h = s.charSpacing, c = s.wordSpacing, d = s.fontDirection, p = s.textHScale * d, m = e.length, y = i.vertical, A = y ? 1 : -1, v = i.defaultVMetrics, w = r * s.fontMatrix[0], S = s.textRenderingMode === Gt.FILL && !i.disableFontFace && !s.patternFill;
    o.save(), s.textMatrix && o.transform(...s.textMatrix), o.translate(s.x, s.y + s.textRise), d > 0 ? o.scale(p, -1) : o.scale(p, 1);
    let E, x;
    const C = s.textRenderingMode & Gt.FILL_STROKE_MASK, _ = C === Gt.FILL || C === Gt.FILL_STROKE, k = C === Gt.STROKE || C === Gt.FILL_STROKE;
    let P = s.lineWidth;
    const M = s.textMatrixScale;
    if (M === 0 || P === 0 ? k && (P = this.getSinglePixelWidth()) : P /= M, l !== 1 && (o.scale(l, l), P /= l), o.lineWidth = P, _ && s.patternFill) {
      o.save();
      const L = s.fillColor.getPattern(o, this, zs(o), oe.FILL, t);
      E = ct(o), o.restore(), o.fillStyle = L;
    }
    if (k && s.patternStroke) {
      o.save();
      const L = s.strokeColor.getPattern(o, this, zs(o), oe.STROKE, t);
      x = ct(o), o.restore(), o.strokeStyle = L;
    }
    if (i.isInvalidPDFjsFont) {
      const L = [];
      let B = 0;
      for (const pt of e)
        L.push(pt.unicode), B += pt.width;
      const ft = L.join("");
      if (o.fillText(ft, 0, 0), this.dependencyTracker !== null) {
        const pt = o.measureText(ft);
        this.dependencyTracker.recordBBox(t, this.ctx, -pt.actualBoundingBoxLeft, pt.actualBoundingBoxRight, -pt.actualBoundingBoxAscent, pt.actualBoundingBoxDescent).recordShowTextOperation(t);
      }
      s.x += B * w * p, o.restore(), this.compose(), b(this, Qt, le).call(this, a);
      return;
    }
    let I = 0, R;
    for (R = 0; R < m; ++R) {
      const L = e[R];
      if (typeof L == "number") {
        I += A * L * r / 1e3;
        continue;
      }
      let B = !1;
      const ft = (L.isSpace ? c : 0) + h, pt = L.fontChar, me = L.accent;
      let te, Lt, Z = L.width;
      if (y) {
        const Wt = L.vmetric || v, ot = -(L.vmetric ? Wt[1] : Z * 0.5) * w, db = Wt[2] * w;
        Z = Wt ? -Wt[0] : Z, te = ot / l, Lt = (I + db) / l;
      } else
        te = I / l, Lt = 0;
      let $s;
      if (i.remeasure && Z > 0) {
        $s = o.measureText(pt);
        const Wt = $s.width * 1e3 / r * l;
        if (Z < Wt && this.isFontSubpixelAAEnabled) {
          const ot = Z / Wt;
          B = !0, o.save(), o.scale(ot, 1), te /= ot;
        } else
          Z !== Wt && (te += (Z - Wt) / 2e3 * r / l);
      }
      if (this.contentVisible && (L.isInFont || i.missingFile)) {
        if (S && !me)
          o.fillText(pt, te, Lt), (W = this.dependencyTracker) == null || W.recordCharacterBBox(t, o, $s ? {
            bbox: null
          } : i, r / l, te, Lt, () => $s ?? o.measureText(pt));
        else if (this.paintChar(t, pt, te, Lt, E, x), me) {
          const Wt = te + r * me.offset.x / l, ot = Lt - r * me.offset.y / l;
          this.paintChar(t, me.fontChar, Wt, ot, E, x);
        }
      }
      const tc = y ? Z * w - ft * d : Z * w + ft * d;
      I += tc, B && o.restore();
    }
    y ? s.y -= I : s.x += I * p, o.restore(), this.compose(), (Mt = this.dependencyTracker) == null || Mt.recordShowTextOperation(t), b(this, Qt, le).call(this, a);
  }
  showType3Text(t, e) {
    const s = this.ctx, i = this.current, r = i.font, a = i.fontSize, o = i.fontDirection, l = r.vertical ? 1 : -1, h = i.charSpacing, c = i.wordSpacing, d = i.textHScale * o, p = i.fontMatrix || Sb, m = e.length, y = i.textRenderingMode === Gt.INVISIBLE;
    let A, v, w, S;
    if (y || a === 0)
      return;
    this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null, s.save(), i.textMatrix && s.transform(...i.textMatrix), s.translate(i.x, i.y + i.textRise), s.scale(d, o);
    const E = this.dependencyTracker;
    for (this.dependencyTracker = E ? new Dc(E, t) : null, A = 0; A < m; ++A) {
      if (v = e[A], typeof v == "number") {
        S = l * v * a / 1e3, this.ctx.translate(S, 0), i.x += S * d;
        continue;
      }
      const x = (v.isSpace ? c : 0) + h, C = r.charProcOperatorList.get(v.operatorListId);
      C ? this.contentVisible && (this.save(), C.fnArray[0] === Xs.setCharWidth && (i.fillAlpha = i.strokeAlpha = 1, s.globalAlpha = 1), s.scale(a, a), s.transform(...p), this.executeOperatorList(C), this.restore()) : $(`Type3 character "${v.operatorListId}" is not available.`);
      const _ = [v.width, 0];
      D.applyTransform(_, p), w = _[0] * a + x, s.translate(w, 0), i.x += w * d;
    }
    s.restore(), E && (this.dependencyTracker = E);
  }
  setCharWidth(t, e, s) {
  }
  setCharWidthAndBounds(t, e, s, i, r, a, o) {
    var h;
    const l = new Path2D();
    l.rect(i, r, a - i, o - r), this.ctx.clip(l), (h = this.dependencyTracker) == null || h.recordBBox(t, this.ctx, i, a, r, o).recordClipBox(t, this.ctx, i, a, r, o), this.endPath(t);
  }
  getColorN_Pattern(t, e) {
    let s;
    if (e[0] === "TilingPattern") {
      const i = this.baseTransform || ct(this.ctx), r = {
        createCanvasGraphics: (a, o) => new Ir(a, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
          optionalContentConfig: this.optionalContentConfig,
          markedContentStack: this.markedContentStack
        }, void 0, void 0, this.dependencyTracker ? new Dc(this.dependencyTracker, o, !0) : null)
      };
      s = new _c(e, this.ctx, r, i);
    } else
      s = this._getPattern(t, e[1], e[2]);
    return s;
  }
  setStrokeColorN(t, ...e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("strokeColor", t), this.current.strokeColor = this.getColorN_Pattern(t, e), this.current.patternStroke = !0;
  }
  setFillColorN(t, ...e) {
    var i;
    (i = this.dependencyTracker) == null || i.recordSimpleData("fillColor", t);
    const s = this.current.fillColor = this.getColorN_Pattern(t, e);
    this.current.patternFill = !0, this.current.tilingPatternDims = s instanceof _c ? [0, 0, 0, 0] : null;
  }
  setStrokeRGBColor(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("strokeColor", t), this.ctx.strokeStyle = this.current.strokeColor = e, this.current.patternStroke = !1;
  }
  setStrokeTransparent(t) {
    var e;
    (e = this.dependencyTracker) == null || e.recordSimpleData("strokeColor", t), this.ctx.strokeStyle = this.current.strokeColor = "transparent", this.current.patternStroke = !1;
  }
  setFillRGBColor(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.recordSimpleData("fillColor", t), this.ctx.fillStyle = this.current.fillColor = e, this.current.patternFill = !1, this.current.tilingPatternDims = null;
  }
  setFillTransparent(t) {
    var e;
    (e = this.dependencyTracker) == null || e.recordSimpleData("fillColor", t), this.ctx.fillStyle = this.current.fillColor = "transparent", this.current.patternFill = !1, this.current.tilingPatternDims = null;
  }
  _getPattern(t, e, s = null) {
    const i = this.cachedPatterns.getOrInsertComputed(e, () => KS(this.getObject(t, e)));
    return s && (i.matrix = s), i;
  }
  shadingFill(t, e) {
    var o;
    if (!this.contentVisible)
      return;
    const s = b(this, pe, Te).call(this, this.current.fillAlpha), i = this.ctx;
    this.save(t);
    const r = this._getPattern(t, e);
    i.fillStyle = r.getPattern(i, this, zs(i), oe.SHADING, t);
    const a = zs(i);
    if (a) {
      const {
        width: l,
        height: h
      } = i.canvas, c = Rr.slice();
      D.axialAlignedBoundingBox([0, 0, l, h], a, c);
      const [d, p, m, y] = c;
      this.ctx.fillRect(d, p, m - d, y - p);
    } else
      this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
    (o = this.dependencyTracker) == null || o.resetBBox(t).recordFullPageBBox(t).recordDependencies(t, ns.transform).recordDependencies(t, ns.fill).recordOperation(t), this.compose(this.current.getClippedPathBoundingBox()), this.restore(t), b(this, Qt, le).call(this, s);
  }
  beginInlineImage() {
    K("Should not call beginInlineImage");
  }
  beginImageData() {
    K("Should not call beginImageData");
  }
  paintFormXObjectBegin(t, e, s) {
    var i;
    if (this.contentVisible && (this.save(t), this.baseTransformStack.push(this.baseTransform), e && this.transform(t, ...e), this.baseTransform = ct(this.ctx), s)) {
      D.axialAlignedBoundingBox(s, this.baseTransform, this.current.minMax);
      const [r, a, o, l] = s, h = new Path2D();
      h.rect(r, a, o - r, l - a), this.ctx.clip(h), (i = this.dependencyTracker) == null || i.recordClipBox(t, this.ctx, r, o, a, l), this.endPath(t);
    }
  }
  paintFormXObjectEnd(t) {
    this.contentVisible && (this.restore(t), this.baseTransform = this.baseTransformStack.pop());
  }
  beginGroup(t, e) {
    var x;
    if (!this.contentVisible)
      return;
    this.save(t);
    const {
      inSMaskMode: s
    } = this;
    s && (this.endSMaskMode(), this.current.activeSMask = null);
    const i = this.ctx;
    if ((!e.needsIsolation || !e.isolated && !e.hasSoftMask) && !e.knockout && !e.isGray && n(this, $e) === 0 && i.globalAlpha === 1 && i.globalCompositeOperation === "source-over" && !s) {
      if (e.bbox) {
        let C = new Path2D();
        const [_, k, P, M] = e.bbox;
        if (C.rect(_, k, P - _, M - k), e.matrix) {
          const I = new Path2D();
          I.addPath(C, new DOMMatrix(e.matrix)), C = I;
        }
        i.clip(C);
      }
      this.groupStack.push(null), n(this, oi).push(null), this.groupLevel++;
      return;
    }
    !e.isolated && !e.knockout && n(this, $e) === 0 && Zm("TODO: Fully support non-isolated non-knockout groups.");
    const r = ct(i);
    e.matrix && i.transform(...e.matrix);
    const a = [0, 0, i.canvas.width, i.canvas.height];
    let o;
    e.bbox ? (o = Rr.slice(), D.axialAlignedBoundingBox(e.bbox, ct(i), o), o = D.intersect(o, a) || [0, 0, 0, 0]) : o = a;
    const l = Math.floor(o[0]), h = Math.floor(o[1]), c = Math.max(Math.ceil(o[2]) - l, 1), d = Math.max(Math.ceil(o[3]) - h, 1);
    this.current.startNewPathAndClipBox([0, 0, c, d]);
    const p = this.canvasFactory.create(c, d);
    e.smask && this.smaskGroupCanvases.push(p);
    const m = p.context, y = e.knockout && !e.isolated ? i : null, A = !e.isolated && !e.knockout && !e.smask && e.needsIsolation && n(this, $e) > 0, v = e.knockout ? this.canvasFactory.create(c, d) : null, w = n(this, $e);
    e.knockout ? At(this, $e)._++ : f(this, $e, 0), m.translate(-l, -h), m.transform(...r);
    const S = !e.isolated && !e.smask && e.needsIsolation, E = S && !s && w === 0 && !e.knockout && !e.isGray && e.hasSoftMask && i.globalAlpha === 1 && i.globalCompositeOperation === "source-over" && this.current.transferMaps === "none";
    if (S && (s || E) && (m.save(), m.setTransform(1, 0, 0, 1, 0, 0), m.drawImage(i.canvas, -l, -h), m.restore()), e.bbox) {
      let C = new Path2D();
      const [_, k, P, M] = e.bbox;
      if (C.rect(_, k, P - _, M - k), e.matrix) {
        const I = new Path2D();
        I.addPath(C, new DOMMatrix(e.matrix)), C = I;
      }
      m.clip(C);
    }
    e.smask && this.smaskStack.push({
      canvas: p.canvas,
      context: m,
      offsetX: l,
      offsetY: h,
      subtype: e.smask.subtype,
      backdrop: e.smask.backdrop,
      transferMap: e.smask.transferMap || null
    }), (!e.smask || this.dependencyTracker) && (i.setTransform(1, 0, 0, 1, 0, 0), i.translate(l, h), i.save()), Cr(i, m), this.ctx = m, (x = this.dependencyTracker) == null || x.inheritSimpleDataAsFutureForcedDependencies(["fillAlpha", "strokeAlpha", "globalCompositeOperation"]).pushBaseTransform(i), this.setGState(t, [["BM", "source-over"], ["ca", 1], ["CA", 1], ["TR", null]]), this.groupStack.push(i), n(this, oi).push({
      backdropCtx: y,
      savedKnockoutLevel: w,
      offsetX: l,
      offsetY: h,
      hasInnerBackdrop: A,
      replaceBackdrop: E,
      knockoutMaskEntry: v,
      knockoutTempEntry: null,
      knockoutBackdropEntry: null
    }), this.groupLevel++;
  }
  endGroup(t, e) {
    var a;
    if (!this.contentVisible)
      return;
    this.groupLevel--;
    const s = this.ctx, i = this.groupStack.pop(), r = n(this, oi).pop();
    if (r && f(this, $e, r.savedKnockoutLevel), i === null) {
      this.restore(t);
      return;
    }
    if (e.isGray && b(this, Ng, yw).call(this, s), this.ctx = i, this.ctx.imageSmoothingEnabled = !1, (a = this.dependencyTracker) == null || a.popBaseTransform(), e.smask)
      this.tempSMask = this.smaskStack.pop(), this.restore(t), this.dependencyTracker && (this.ctx.restore(), this.inSMaskMode && this.ctx.setTransform(this.suspendedCtx.getTransform())), b(this, Il, ap).call(this, r);
    else {
      this.ctx.restore();
      const o = ct(this.ctx);
      this.restore(t), this.ctx.save(), this.ctx.setTransform(...o);
      const l = Rr.slice();
      D.axialAlignedBoundingBox([0, 0, s.canvas.width, s.canvas.height], o, l);
      const h = n(this, oi).at(-1);
      if (n(this, $e) > 0)
        if (r.hasInnerBackdrop) {
          const {
            width: c,
            height: d
          } = s.canvas, p = this.canvasFactory.create(c, d), m = p.context;
          m.drawImage(i.canvas, r.offsetX, r.offsetY, c, d, 0, 0, c, d), m.globalCompositeOperation = "source-over", m.drawImage(s.canvas, 0, 0);
          const y = b(this, Nd, cy).call(this, s.canvas);
          m.globalCompositeOperation = "destination-in", m.drawImage(y.canvas, 0, 0);
          const A = this.ctx.globalCompositeOperation, v = this.ctx.globalAlpha, w = this.ctx.filter;
          this.ctx.save(), this.ctx.setTransform(...o), this.ctx.globalAlpha = 1, rt.isCanvasFilterSupported && (this.ctx.filter = "none"), this.ctx.globalCompositeOperation = "destination-out", this.ctx.drawImage(y.canvas, 0, 0), this.ctx.globalCompositeOperation = A, this.ctx.globalAlpha = v, rt.isCanvasFilterSupported && (this.ctx.filter = w ?? "none"), this.ctx.drawImage(p.canvas, 0, 0), this.ctx.restore(), this.canvasFactory.destroy(y), this.canvasFactory.destroy(p);
        } else {
          const c = (h == null ? void 0 : h.backdropCtx) ?? null;
          b(this, Hd, uy).call(this, this.ctx, s.canvas, {
            backdropCanvas: (c == null ? void 0 : c.canvas) ?? null,
            destTransform: o,
            backdropOffset: c ? [h.offsetX + r.offsetX, h.offsetY + r.offsetY] : [0, 0],
            sourceAlpha: this.ctx.globalAlpha,
            sourceFilter: this.ctx.filter
          });
        }
      else {
        if (r.replaceBackdrop) {
          const c = new Path2D();
          c.rect(0, 0, s.canvas.width, s.canvas.height), this.ctx.clip(c), this.ctx.globalCompositeOperation = "copy";
        }
        this.ctx.drawImage(s.canvas, 0, 0);
      }
      this.ctx.restore(), this.canvasFactory.destroy({
        canvas: s.canvas,
        context: s
      }), b(this, Il, ap).call(this, r), this.compose(l);
    }
  }
  beginAnnotation(t, e, s, i, r, a, o) {
    if (b(this, Rd, ly).call(this), Gf(this.ctx), this.ctx.save(), this.save(t), this.baseTransform && this.ctx.setTransform(...this.baseTransform), s) {
      const l = s[2] - s[0], h = s[3] - s[1];
      if (a && this.annotationCanvasMap) {
        i = i.slice(), i[4] -= s[0], i[5] -= s[1], D.singularValueDecompose2dScale(ct(this.ctx), ss);
        const {
          viewportScale: c
        } = this, d = Math.ceil(l * this.outputScaleX * c), p = Math.ceil(h * this.outputScaleY * c);
        this.annotationCanvas = this.canvasFactory.create(d, p);
        const {
          canvas: m,
          context: y
        } = this.annotationCanvas;
        if (o) {
          const A = this.annotationCanvasMap.getOrInsertComputed(e, Zh);
          m.setAttribute("data-canvas-name", o);
          const v = A.findIndex((w) => w.getAttribute("data-canvas-name") === o);
          v === -1 ? A.push(m) : A[v] = m;
        } else
          this.annotationCanvasMap.set(e, m);
        this.annotationCanvas.savedCtx = this.ctx, this.ctx = y, this.ctx.save(), this.ctx.setTransform(ss[0], 0, 0, -ss[1], 0, h * ss[1]), Gf(this.ctx);
      } else {
        Gf(this.ctx), this.endPath(t);
        const c = new Path2D();
        c.rect(s[0], s[1], l, h), this.ctx.clip(c);
      }
    }
    this.current = new r0(this.ctx.canvas.width, this.ctx.canvas.height), this.baseTransformStack.push(this.baseTransform), this.transform(t, ...i), this.transform(t, ...r), this.baseTransform = ct(this.ctx);
  }
  endAnnotation(t) {
    this.annotationCanvas && (this.ctx.restore(), b(this, Od, hy).call(this), this.ctx = this.annotationCanvas.savedCtx, delete this.annotationCanvas.savedCtx, delete this.annotationCanvas), this.baseTransform = this.baseTransformStack.pop();
  }
  paintImageMaskXObject(t, e) {
    var l;
    if (!this.contentVisible)
      return;
    const s = e.count;
    e = this.getObject(t, e.data, e), e.count = s;
    const i = b(this, pe, Te).call(this, this.current.fillAlpha), r = this.ctx, a = this._createMaskCanvas(t, e), o = a.canvas;
    r.save(), r.setTransform(1, 0, 0, 1, 0, 0), r.drawImage(o, a.offsetX, a.offsetY), (l = this.dependencyTracker) == null || l.resetBBox(t).recordBBox(t, this.ctx, a.offsetX, a.offsetX + o.width, a.offsetY, a.offsetY + o.height).recordOperation(t), r.restore(), a.canvasEntry && this.canvasFactory.destroy(a.canvasEntry), this.compose(), b(this, Qt, le).call(this, i);
  }
  paintImageMaskXObjectRepeat(t, e, s, i = 0, r = 0, a, o) {
    var p, m, y;
    if (!this.contentVisible)
      return;
    e = this.getObject(t, e.data, e);
    const l = b(this, pe, Te).call(this, this.current.fillAlpha), h = this.ctx;
    h.save();
    const c = ct(h);
    h.transform(s, i, r, a, 0, 0);
    const d = this._createMaskCanvas(t, e);
    h.setTransform(1, 0, 0, 1, d.offsetX - c[4], d.offsetY - c[5]), (p = this.dependencyTracker) == null || p.resetBBox(t);
    for (let A = 0, v = o.length; A < v; A += 2) {
      const w = D.transform(c, [s, i, r, a, o[A], o[A + 1]]);
      h.drawImage(d.canvas, w[4], w[5]), (m = this.dependencyTracker) == null || m.recordBBox(t, this.ctx, w[4], w[4] + d.canvas.width, w[5], w[5] + d.canvas.height);
    }
    h.restore(), d.canvasEntry && this.canvasFactory.destroy(d.canvasEntry), this.compose(), (y = this.dependencyTracker) == null || y.recordOperation(t), b(this, Qt, le).call(this, l);
  }
  paintImageMaskXObjectGroup(t, e) {
    var o, l, h;
    if (!this.contentVisible)
      return;
    const s = b(this, pe, Te).call(this, this.current.fillAlpha), i = this.ctx, r = this.current.fillColor, a = this.current.patternFill;
    (o = this.dependencyTracker) == null || o.resetBBox(t).recordDependencies(t, ns.transformAndFill);
    for (const c of e) {
      const {
        data: d,
        width: p,
        height: m,
        transform: y
      } = c, A = this.canvasFactory.create(p, m), v = A.context;
      v.save();
      const w = this.getObject(t, d, c);
      o0(v, w), v.globalCompositeOperation = "source-in", v.fillStyle = a ? r.getPattern(v, this, zs(i), oe.FILL, t) : r, v.fillRect(0, 0, p, m), v.restore(), i.save(), i.transform(...y), i.scale(1, -1), Uf(i, A.canvas, 0, 0, p, m, 0, -1, 1, 1), this.canvasFactory.destroy(A), (l = this.dependencyTracker) == null || l.recordBBox(t, i, 0, p, 0, m), i.restore();
    }
    this.compose(), (h = this.dependencyTracker) == null || h.recordOperation(t), b(this, Qt, le).call(this, s);
  }
  paintImageXObject(t, e) {
    if (!this.contentVisible)
      return;
    const s = this.getObject(t, e);
    if (!s) {
      $("Dependent image isn't ready yet");
      return;
    }
    this.paintInlineImageXObject(t, s);
  }
  paintImageXObjectRepeat(t, e, s, i, r) {
    if (!this.contentVisible)
      return;
    const a = this.getObject(t, e);
    if (!a) {
      $("Dependent image isn't ready yet");
      return;
    }
    const o = a.width, l = a.height, h = [];
    for (let c = 0, d = r.length; c < d; c += 2)
      h.push({
        transform: [s, 0, 0, i, r[c], r[c + 1]],
        x: 0,
        y: 0,
        w: o,
        h: l
      });
    this.paintInlineImageXObjectGroup(t, a, h);
  }
  applyTransferMapsToCanvas(t) {
    return this.current.transferMaps !== "none" && (t.filter = this.current.transferMaps, t.drawImage(t.canvas, 0, 0), t.filter = "none"), t.canvas;
  }
  applyTransferMapsToBitmap(t) {
    if (this.current.transferMaps === "none")
      return {
        img: t.bitmap,
        canvasEntry: null
      };
    const {
      bitmap: e,
      width: s,
      height: i
    } = t, r = this.canvasFactory.create(s, i), a = r.context;
    return a.filter = this.current.transferMaps, a.drawImage(e, 0, 0), a.filter = "none", {
      img: r.canvas,
      canvasEntry: r
    };
  }
  paintInlineImageXObject(t, e) {
    var d;
    if (!this.contentVisible)
      return;
    const s = e.width, i = e.height, r = b(this, pe, Te).call(this, this.current.fillAlpha), a = this.ctx;
    this.save(t);
    const {
      filter: o
    } = a;
    o !== "none" && o !== "" && (a.filter = "none"), a.scale(1 / s, -1 / i);
    let l, h = null;
    if (e.bitmap) {
      const p = this.applyTransferMapsToBitmap(e);
      l = p.img, h = p.canvasEntry;
    } else {
      const p = this.canvasFactory.create(s, i);
      a0(p.context, e), l = this.applyTransferMapsToCanvas(p.context), h = p;
    }
    const c = this._scaleImage(l, zs(a));
    a.imageSmoothingEnabled = l0(ct(a), e.interpolate), this.dependencyTracker && (this.dependencyTracker.resetBBox(t).recordBBox(t, a, 0, s, -i, 0).recordDependencies(t, ns.imageXObject).recordOperation(t), (d = this.imagesTracker) == null || d.record(a, s, i, this.dependencyTracker.clipBox)), Uf(a, c.img, 0, 0, c.paintWidth, c.paintHeight, 0, -i, s, i), c.tmpCanvas && this.canvasFactory.destroy(c.tmpCanvas), h && this.canvasFactory.destroy(h), this.compose(), this.restore(t), b(this, Qt, le).call(this, r);
  }
  paintInlineImageXObjectGroup(t, e, s) {
    var l, h, c;
    if (!this.contentVisible)
      return;
    const i = b(this, pe, Te).call(this, this.current.fillAlpha), r = this.ctx;
    let a, o = null;
    if (e.bitmap)
      a = e.bitmap;
    else {
      const d = e.width, p = e.height, m = this.canvasFactory.create(d, p);
      a0(m.context, e), a = this.applyTransferMapsToCanvas(m.context), o = m;
    }
    (l = this.dependencyTracker) == null || l.resetBBox(t);
    for (const d of s)
      r.save(), r.transform(...d.transform), r.scale(1, -1), Uf(r, a, d.x, d.y, d.w, d.h, 0, -1, 1, 1), (h = this.dependencyTracker) == null || h.recordBBox(t, r, 0, 1, -1, 0), r.restore();
    o && this.canvasFactory.destroy(o), (c = this.dependencyTracker) == null || c.recordOperation(t), this.compose(), b(this, Qt, le).call(this, i);
  }
  paintSolidColorImageMask(t) {
    var s;
    if (!this.contentVisible)
      return;
    const e = b(this, pe, Te).call(this, this.current.fillAlpha);
    (s = this.dependencyTracker) == null || s.resetBBox(t).recordBBox(t, this.ctx, 0, 1, 0, 1).recordDependencies(t, ns.fill).recordOperation(t), this.ctx.fillRect(0, 0, 1, 1), this.compose(), b(this, Qt, le).call(this, e);
  }
  markPoint(t, e) {
  }
  markPointProps(t, e, s) {
  }
  beginMarkedContent(t, e) {
    var s;
    (s = this.dependencyTracker) == null || s.beginMarkedContent(t), this.markedContentStack.push({
      visible: !0
    });
  }
  beginMarkedContentProps(t, e, s) {
    var i;
    (i = this.dependencyTracker) == null || i.beginMarkedContent(t), e === "OC" ? this.markedContentStack.push({
      visible: this.optionalContentConfig.isVisible(s)
    }) : this.markedContentStack.push({
      visible: !0
    }), this.contentVisible = this.isContentVisible();
  }
  endMarkedContent(t) {
    var e;
    (e = this.dependencyTracker) == null || e.endMarkedContent(t), this.markedContentStack.pop(), this.contentVisible = this.isContentVisible();
  }
  beginCompat(t) {
  }
  endCompat(t) {
  }
  consumePath(t, e, s) {
    var a, o;
    const i = this.current.isEmptyClip();
    this.pendingClip && this.current.updateClipFromPath(), this.pendingClip || this.compose(s);
    const r = this.ctx;
    this.pendingClip ? (i || (this.pendingClip === h0 ? r.clip(e, "evenodd") : r.clip(e)), this.pendingClip = null, (a = this.dependencyTracker) == null || a.bboxToClipBoxDropOperation(t).recordFutureForcedDependency("clipPath", t)) : (o = this.dependencyTracker) == null || o.recordOperation(t), this.current.startNewPathAndClipBox(this.current.clipBox);
  }
  getSinglePixelWidth() {
    if (!this._cachedGetSinglePixelWidth) {
      const t = ct(this.ctx);
      if (t[1] === 0 && t[2] === 0)
        this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(t[0]), Math.abs(t[3]));
      else {
        const e = Math.abs(t[0] * t[3] - t[2] * t[1]), s = Math.hypot(t[0], t[2]), i = Math.hypot(t[1], t[3]);
        this._cachedGetSinglePixelWidth = Math.max(s, i) / e;
      }
    }
    return this._cachedGetSinglePixelWidth;
  }
  getScaleForStroking() {
    if (this._cachedScaleForStroking[0] === -1) {
      const {
        lineWidth: t
      } = this.current, {
        a: e,
        b: s,
        c: i,
        d: r
      } = this.ctx.getTransform();
      let a, o;
      if (s === 0 && i === 0) {
        const l = Math.abs(e), h = Math.abs(r);
        if (l === h)
          if (t === 0)
            a = o = 1 / l;
          else {
            const c = l * t;
            a = o = c < 1 ? 1 / c : 1;
          }
        else if (t === 0)
          a = 1 / l, o = 1 / h;
        else {
          const c = l * t, d = h * t;
          a = c < 1 ? 1 / c : 1, o = d < 1 ? 1 / d : 1;
        }
      } else {
        const l = Math.abs(e * r - s * i), h = Math.hypot(e, s), c = Math.hypot(i, r);
        if (t === 0)
          a = c / l, o = h / l;
        else {
          const d = t * l;
          a = c > d ? c / d : 1, o = h > d ? h / d : 1;
        }
      }
      this._cachedScaleForStroking[0] = a, this._cachedScaleForStroking[1] = o;
    }
    return this._cachedScaleForStroking;
  }
  rescaleAndStroke(t, e) {
    const {
      ctx: s,
      current: {
        lineWidth: i
      }
    } = this, [r, a] = this.getScaleForStroking();
    if (r === a) {
      s.lineWidth = (i || 1) * r, s.stroke(t);
      return;
    }
    const o = n(Ir, Og) ?? f(Ir, Og, new DOMMatrix()), l = s.getLineDash();
    e && s.save(), s.scale(r, a), o.a = 1 / r, o.d = 1 / a;
    const h = new Path2D();
    if (h.addPath(t, o), l.length > 0) {
      const c = Math.max(r, a);
      s.setLineDash(l.map((d) => d / c)), s.lineDashOffset /= c;
    }
    s.lineWidth = i || 1, s.stroke(h), e && s.restore();
  }
  isContentVisible() {
    for (let t = this.markedContentStack.length - 1; t >= 0; t--)
      if (!this.markedContentStack[t].visible)
        return !1;
    return !0;
  }
};
Og = new WeakMap(), $e = new WeakMap(), Xn = new WeakMap(), xa = new WeakMap(), Ca = new WeakMap(), _a = new WeakMap(), Ta = new WeakMap(), ka = new WeakMap(), Pa = new WeakMap(), Ma = new WeakMap(), oi = new WeakMap(), Rd = new WeakSet(), ly = function() {
  for (; this.stateStack.length || this.inSMaskMode; )
    this.restore();
  this.current.activeSMask = null, this.ctx.restore(), this.transparentCanvas && (this.ctx = this.compositeCtx, this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.drawImage(this.transparentCanvas, 0, 0), this.ctx.restore(), this.canvasFactory.destroy(this.transparentCanvasEntry), this.transparentCanvas = null, this.transparentCanvasEntry = null);
}, Od = new WeakSet(), hy = function() {
  if (this.pageColors) {
    const t = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background);
    if (t !== "none") {
      const e = this.ctx.filter;
      this.ctx.filter = t, this.ctx.drawImage(this.ctx.canvas, 0, 0), this.ctx.filter = e;
    }
  }
}, Nd = new WeakSet(), cy = function(t, e = null, s = 1) {
  const {
    width: i,
    height: r
  } = t, a = e ?? this.canvasFactory.create(i, r), o = a.context;
  s = Math.round(s * 255) / 255;
  const l = s < 1;
  l && n(this, Pa) === void 0 && f(this, Pa, rt.isCanvasFilterSupported ? /* @__PURE__ */ new Map() : "none");
  let h = "none";
  if (l && n(this, Pa) instanceof Map && (h = n(this, Pa).getOrInsertComputed(s, () => this.filterFactory.addKnockoutFilter(s))), !l || h !== "none")
    return e && (o.save(), o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, i, r), o.restore()), o.filter = h, o.drawImage(t, 0, 0), o.filter = "none", a;
  const c = t.getContext("2d", {
    willReadFrequently: !0
  }).getImageData(0, 0, i, r), d = o.createImageData(i, r), p = c.data, m = d.data, y = s > 0 ? 1 / s : 1e6;
  for (let A = 3, v = p.length; A < v; A += 4)
    m[A] = Math.min(Math.round(p[A] * y), 255);
  return o.putImageData(d, 0, 0), a;
}, Bd = new WeakSet(), dy = function(t, e, s, i) {
  let r = (t == null ? void 0 : t[e]) ?? null;
  if (r && (r.canvas.width !== s || r.canvas.height !== i) && (this.canvasFactory.destroy(r), r = null), !r)
    return r = this.canvasFactory.create(s, i), t && (t[e] = r), r;
  const a = r.context;
  return a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, s, i), a.restore(), r;
}, Hd = new WeakSet(), uy = function(t, e, s = {}) {
  const {
    backdropCanvas: i = null,
    destTransform: r = [1, 0, 0, 1, 0, 0],
    backdropOffset: a = [0, 0],
    reuseMaskEntry: o = null,
    poolMeta: l = null,
    sourceAlpha: h = 1,
    sourceFilter: c = "none",
    knockoutAlpha: d = 1
  } = s, {
    width: p,
    height: m
  } = e, y = b(this, Nd, cy).call(this, e, o, d), A = t.globalCompositeOperation;
  if (t.save(), t.setTransform(...r), t.globalAlpha = 1, rt.isCanvasFilterSupported && (t.filter = "none"), t.globalCompositeOperation = "destination-out", t.drawImage(y.canvas, 0, 0), i) {
    const [v, w] = a, S = b(this, Bd, dy).call(this, l, "knockoutBackdropEntry", p, m), E = S.context;
    E.drawImage(i, v, w, p, m, 0, 0, p, m), E.globalCompositeOperation = "destination-in", E.drawImage(y.canvas, 0, 0), E.globalCompositeOperation = "source-over", t.globalCompositeOperation = "destination-over", t.drawImage(S.canvas, 0, 0), l || this.canvasFactory.destroy(S);
  }
  t.globalCompositeOperation = A, t.globalAlpha = h, rt.isCanvasFilterSupported && (t.filter = c ?? "none"), t.drawImage(e, 0, 0), t.restore(), o || this.canvasFactory.destroy(y);
}, pe = new WeakSet(), Te = function(t = 1) {
  if (n(this, $e) === 0 || n(this, Xn) > 0 || !this.contentVisible)
    return !1;
  At(this, Xn)._++, f(this, ka, t);
  const e = n(this, oi).at(-1), {
    canvas: s
  } = this.ctx, i = b(this, Bd, dy).call(this, e, "knockoutTempEntry", s.width, s.height);
  f(this, xa, i);
  const r = i.context;
  return r.save(), r.setTransform(this.ctx.getTransform()), Cr(this.ctx, r), f(this, Ta, r.globalCompositeOperation), r.globalCompositeOperation = "source-over", n0(r, this.ctx), f(this, Ma, e), f(this, Ca, this.ctx), f(this, _a, this.suspendedCtx), this.ctx = r, this.inSMaskMode && (this.suspendedCtx = r), !0;
}, Qt = new WeakSet(), le = function(t) {
  var l;
  if (!t)
    return;
  const e = n(this, xa), s = n(this, Ca), i = n(this, _a), r = e.context;
  f(this, xa, null), f(this, Ca, null), f(this, _a, null), this.inSMaskMode && this.suspendedCtx === r && this.ctx !== r && this.endSMaskMode(), this.inSMaskMode && (this.suspendedCtx = i), this.ctx._removeMirroring(), this.ctx.globalCompositeOperation = n(this, Ta), f(this, Ta, null), Cr(this.ctx, s), this.ctx = s;
  const a = n(this, Ma);
  f(this, Ma, null);
  const o = n(this, ka);
  f(this, ka, 1);
  try {
    b(this, Hd, uy).call(this, i ?? s, e.canvas, {
      backdropCanvas: ((l = a == null ? void 0 : a.backdropCtx) == null ? void 0 : l.canvas) ?? null,
      backdropOffset: a != null && a.backdropCtx ? [a.offsetX, a.offsetY] : [0, 0],
      reuseMaskEntry: (a == null ? void 0 : a.knockoutMaskEntry) ?? null,
      poolMeta: a,
      knockoutAlpha: o
    });
  } finally {
    r.restore(), At(this, Xn)._--, a || this.canvasFactory.destroy(e);
  }
}, Ud = new WeakSet(), fy = function(t, e, s) {
  const i = new Path2D();
  return i.addPath(t, new DOMMatrix(s).invertSelf().multiplySelf(e)), i;
}, Ng = new WeakSet(), yw = function(t) {
  const {
    canvas: e
  } = t, {
    width: s,
    height: i
  } = e;
  if (rt.isCanvasFilterSupported) {
    t.save(), t.setTransform(1, 0, 0, 1, 0, 0), t.filter = "grayscale(1)", t.globalAlpha = 1, t.globalCompositeOperation = "copy", t.drawImage(e, 0, 0), t.restore();
    return;
  }
  const r = t.getImageData(0, 0, s, i), {
    data: a
  } = r;
  for (let o = 0, l = a.length; o < l; o += 4) {
    const h = a[o] * 0.2126 + a[o + 1] * 0.7152 + a[o + 2] * 0.0722 + 0.5 | 0;
    a[o] = a[o + 1] = a[o + 2] = h;
  }
  t.putImageData(r, 0, 0);
}, Il = new WeakSet(), ap = function(t) {
  t && (t.knockoutMaskEntry && (this.canvasFactory.destroy(t.knockoutMaskEntry), t.knockoutMaskEntry = null), t.knockoutTempEntry && (this.canvasFactory.destroy(t.knockoutTempEntry), t.knockoutTempEntry = null), t.knockoutBackdropEntry && (this.canvasFactory.destroy(t.knockoutBackdropEntry), t.knockoutBackdropEntry = null));
}, u(Ir, Og, null);
let $o = Ir;
for (const g in Xs)
  $o.prototype[g] !== void 0 && ($o.prototype[Xs[g]] = $o.prototype[g]);
var Gd, $d;
class ib {
  constructor(t, e, s) {
    u(this, Gd, null);
    u(this, $d, null);
    T(this, "_fullReader", null);
    T(this, "_rangeReaders", /* @__PURE__ */ new Set());
    T(this, "_source", null);
    this._source = t, f(this, Gd, e), f(this, $d, s);
  }
  get _progressiveDataLength() {
    var t;
    return ((t = this._fullReader) == null ? void 0 : t._loaded) ?? 0;
  }
  getFullReader() {
    return Ct(!this._fullReader, "BasePDFStream.getFullReader can only be called once."), this._fullReader = new (n(this, Gd))(this);
  }
  getRangeReader(t, e) {
    if (e <= this._progressiveDataLength)
      return null;
    const s = new (n(this, $d))(this, t, e);
    return this._rangeReaders.add(s), s;
  }
  cancelAllRequests(t) {
    var e;
    (e = this._fullReader) == null || e.cancel(t);
    for (const s of new Set(this._rangeReaders))
      s.cancel(t);
  }
}
Gd = new WeakMap(), $d = new WeakMap();
class nb {
  constructor(t) {
    T(this, "onProgress", null);
    T(this, "_contentLength", 0);
    T(this, "_filename", null);
    T(this, "_headersCapability", Promise.withResolvers());
    T(this, "_isRangeSupported", !1);
    T(this, "_isStreamingSupported", !1);
    T(this, "_loaded", 0);
    T(this, "_stream", null);
    this._stream = t;
  }
  _callOnProgress() {
    var t;
    (t = this.onProgress) == null || t.call(this, {
      loaded: this._loaded,
      total: this._contentLength
    });
  }
  get headersReady() {
    return this._headersCapability.promise;
  }
  get filename() {
    return this._filename;
  }
  get contentLength() {
    return this._contentLength;
  }
  get isRangeSupported() {
    return this._isRangeSupported;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  async read() {
    K("Abstract method `read` called");
  }
  cancel(t) {
    K("Abstract method `cancel` called");
  }
}
class rb {
  constructor(t, e, s) {
    T(this, "_stream", null);
    this._stream = t;
  }
  async read() {
    K("Abstract method `read` called");
  }
  cancel(t) {
    K("Abstract method `cancel` called");
  }
}
function sE(g) {
  let t = !0, e = s("filename\\*", "i").exec(g);
  if (e) {
    e = e[1];
    let c = o(e);
    return c = unescape(c), c = l(c), c = h(c), r(c);
  }
  if (e = a(g), e) {
    const c = h(e);
    return r(c);
  }
  if (e = s("filename", "i").exec(g), e) {
    e = e[1];
    let c = o(e);
    return c = h(c), r(c);
  }
  function s(c, d) {
    return new RegExp("(?:^|;)\\s*" + c + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', d);
  }
  function i(c, d) {
    if (c) {
      if (!/^[\x00-\xFF]+$/.test(d))
        return d;
      try {
        const p = new TextDecoder(c, {
          fatal: !0
        }), m = tb(d);
        d = p.decode(m), t = !1;
      } catch {
      }
    }
    return d;
  }
  function r(c) {
    return t && /[\x80-\xff]/.test(c) && (c = i("utf-8", c), t && (c = i("iso-8859-1", c))), c;
  }
  function a(c) {
    const d = [];
    let p;
    const m = s("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
    for (; (p = m.exec(c)) !== null; ) {
      let [, A, v, w] = p;
      if (A = parseInt(A, 10), A in d) {
        if (A === 0)
          break;
        continue;
      }
      d[A] = [v, w];
    }
    const y = [];
    for (let A = 0; A < d.length && A in d; ++A) {
      let [v, w] = d[A];
      w = o(w), v && (w = unescape(w), A === 0 && (w = l(w))), y.push(w);
    }
    return y.join("");
  }
  function o(c) {
    if (c.startsWith('"')) {
      const d = c.slice(1).split('\\"');
      for (let p = 0; p < d.length; ++p) {
        const m = d[p].indexOf('"');
        m !== -1 && (d[p] = d[p].slice(0, m), d.length = p + 1), d[p] = d[p].replaceAll(/\\(.)/g, "$1");
      }
      c = d.join('"');
    }
    return c;
  }
  function l(c) {
    const d = c.indexOf("'");
    if (d === -1)
      return c;
    const p = c.slice(0, d), y = c.slice(d + 1).replace(/^[^']*'/, "");
    return i(p, y);
  }
  function h(c) {
    return !c.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(c) ? c : c.replaceAll(/=\?([\w-]*)\?([QB])\?((?:[^?]|\?(?!=))*)\?=/gi, function(d, p, m, y) {
      if (m === "q" || m === "Q")
        return y = y.replaceAll("_", " "), y = y.replaceAll(/=([0-9a-f]{2})/gi, function(A, v) {
          return String.fromCharCode(parseInt(v, 16));
        }), i(p, y);
      try {
        y = atob(y);
      } catch {
      }
      return i(p, y);
    });
  }
  return "";
}
function Aw(g, t) {
  const e = new Headers();
  if (!g || !t || typeof t != "object")
    return e;
  for (const s in t) {
    const i = t[s];
    i !== void 0 && e.append(s, i);
  }
  return e;
}
function iE(g) {
  let t = g.length;
  for (; t > 0 && g[t - 1] !== " " && /\s/.test(g[t - 1]); )
    t--;
  return g.slice(0, t);
}
function ab(g) {
  var t;
  return ((t = URL.parse(g)) == null ? void 0 : t.origin) ?? null;
}
function ww({
  responseHeaders: g,
  isHttp: t,
  rangeChunkSize: e,
  disableRange: s
}) {
  const i = {
    contentLength: 0,
    isRangeSupported: !1
  }, r = parseInt(g.get("Content-Length"), 10);
  return !Number.isInteger(r) || (i.contentLength = r, r <= 2 * e) || s || !t || g.get("Accept-Ranges") !== "bytes" || (g.get("Content-Encoding") || "identity") === "identity" && (i.isRangeSupported = !0), i;
}
function vw(g) {
  const t = g.get("Content-Disposition");
  if (t) {
    let e = sE(t);
    if (e.includes("%"))
      try {
        e = decodeURIComponent(e);
      } catch {
      }
    if (EA(e))
      return e;
  }
  return null;
}
function ob(g, t) {
  return new Lp(`Unexpected server response (${g}) while retrieving PDF "${t.href}".`, g, g === 404 || g === 0 && t.protocol === "file:");
}
function Sw(g, t) {
  if (g !== t)
    throw new Error(`Expected range response-origin "${g}" to match "${t}".`);
}
function Ew(g, t, e, s) {
  return fetch(g, {
    method: "GET",
    headers: t,
    signal: s.signal,
    mode: "cors",
    credentials: e ? "include" : "same-origin",
    redirect: "follow"
  });
}
function xw(g, t) {
  if (g !== 200 && g !== 206)
    throw ob(g, t);
}
function lb(g) {
  if (g instanceof Uint8Array)
    return g.buffer;
  if (g instanceof ArrayBuffer)
    return g;
  throw new Error(`getArrayBuffer - unexpected data: ${g}`);
}
class nE extends ib {
  constructor(e) {
    super(e, rE, aE);
    T(this, "_responseOrigin", null);
    const {
      httpHeaders: s,
      url: i
    } = e;
    Ct(/https?:/.test(i.protocol), "PDFFetchStream only supports http(s):// URLs."), this.headers = Aw(!0, s);
  }
}
class rE extends nb {
  constructor(e) {
    super(e);
    T(this, "_abortController", new AbortController());
    T(this, "_reader", null);
    const {
      disableRange: s,
      disableStream: i,
      rangeChunkSize: r,
      url: a,
      withCredentials: o
    } = e._source;
    this._isStreamingSupported = !i;
    const l = new Headers(e.headers);
    Ew(a, l, o, this._abortController).then((h) => {
      e._responseOrigin = ab(h.url), xw(h.status, a), this._reader = h.body.getReader();
      const c = h.headers, {
        contentLength: d,
        isRangeSupported: p
      } = ww({
        responseHeaders: c,
        isHttp: !0,
        rangeChunkSize: r,
        disableRange: s
      });
      this._contentLength = d, this._isRangeSupported = p, this._filename = vw(c), !this._isStreamingSupported && this._isRangeSupported && this.cancel(new Er("Streaming is disabled.")), this._headersCapability.resolve();
    }).catch(this._headersCapability.reject);
  }
  async read() {
    await this._headersCapability.promise;
    const {
      value: e,
      done: s
    } = await this._reader.read();
    return s ? {
      value: e,
      done: s
    } : (this._loaded += e.byteLength, this._callOnProgress(), {
      value: lb(e),
      done: !1
    });
  }
  cancel(e) {
    var s;
    (s = this._reader) == null || s.cancel(e), this._abortController.abort();
  }
}
class aE extends rb {
  constructor(e, s, i) {
    super(e, s, i);
    T(this, "_abortController", new AbortController());
    T(this, "_readCapability", Promise.withResolvers());
    T(this, "_reader", null);
    const {
      url: r,
      withCredentials: a
    } = e._source, o = new Headers(e.headers);
    o.append("Range", `bytes=${s}-${i - 1}`), Ew(r, o, a, this._abortController).then((l) => {
      const h = ab(l.url);
      Sw(h, e._responseOrigin), xw(l.status, r), this._reader = l.body.getReader(), this._readCapability.resolve();
    }).catch(this._readCapability.reject);
  }
  async read() {
    await this._readCapability.promise;
    const {
      value: e,
      done: s
    } = await this._reader.read();
    return s ? {
      value: e,
      done: s
    } : {
      value: lb(e),
      done: !1
    };
  }
  cancel(e) {
    var s;
    (s = this._reader) == null || s.cancel(e), this._abortController.abort();
  }
}
function c0(g) {
  return g instanceof Uint8Array && g.byteLength === g.buffer.byteLength ? g.buffer : new Uint8Array(g).buffer;
}
function hb() {
  for (const g of this._requests)
    g.resolve({
      value: void 0,
      done: !0
    });
  this._requests.length = 0;
}
var Bg, Cw;
class oE extends ib {
  constructor(e) {
    super(e, lE, hE);
    u(this, Bg);
    T(this, "_progressiveDone", !1);
    T(this, "_queuedChunks", []);
    const {
      pdfDataRangeTransport: s
    } = e, {
      initialData: i,
      progressiveDone: r
    } = s;
    if ((i == null ? void 0 : i.length) > 0) {
      const o = c0(i);
      this._queuedChunks.push(o);
    }
    this._progressiveDone = r;
    const a = (o) => {
      var l;
      switch (o.type) {
        case "range":
        case "progressiveRead":
          b(this, Bg, Cw).call(this, o.begin, o.chunk);
          break;
        case "progressiveDone":
          (l = this._fullReader) == null || l.progressiveDone(), this._progressiveDone = !0;
          break;
      }
    };
    s.transportReady(a);
  }
  getFullReader() {
    const e = super.getFullReader();
    return this._queuedChunks = null, e;
  }
  getRangeReader(e, s) {
    const i = super.getRangeReader(e, s);
    return i && (i.onDone = () => this._rangeReaders.delete(i), this._source.pdfDataRangeTransport.requestDataRange(e, s)), i;
  }
  cancelAllRequests(e) {
    super.cancelAllRequests(e), this._source.pdfDataRangeTransport.abort();
  }
}
Bg = new WeakSet(), Cw = function(e, s) {
  const i = c0(s);
  if (e === void 0)
    this._fullReader ? this._fullReader._enqueue(i) : this._queuedChunks.push(i);
  else {
    const r = this._rangeReaders.keys().find((a) => a._begin === e);
    Ct(r, "#onReceiveData - no `PDFDataTransportStreamRangeReader` instance found."), r._enqueue(i);
  }
};
var zd;
class lE extends nb {
  constructor(e) {
    super(e);
    u(this, zd, hb.bind(this));
    T(this, "_done", !1);
    T(this, "_queuedChunks", null);
    T(this, "_requests", []);
    const {
      pdfDataRangeTransport: s,
      disableRange: i,
      disableStream: r
    } = e._source, {
      length: a,
      contentDispositionFilename: o
    } = s;
    this._queuedChunks = e._queuedChunks || [];
    for (const h of this._queuedChunks)
      this._loaded += h.byteLength;
    this._done = e._progressiveDone, this._contentLength = a, this._isStreamingSupported = !r, this._isRangeSupported = !i, EA(o) && (this._filename = o), this._headersCapability.resolve();
    const l = this._loaded;
    Promise.resolve().then(() => {
      l > 0 && this._loaded === l && this._callOnProgress();
    });
  }
  _enqueue(e) {
    this._done || (this._requests.length > 0 ? this._requests.shift().resolve({
      value: e,
      done: !1
    }) : this._queuedChunks.push(e), this._loaded += e.byteLength, this._callOnProgress());
  }
  async read() {
    if (this._queuedChunks.length > 0)
      return {
        value: this._queuedChunks.shift(),
        done: !1
      };
    if (this._done)
      return {
        value: void 0,
        done: !0
      };
    const e = Promise.withResolvers();
    return this._requests.push(e), e.promise;
  }
  cancel(e) {
    this._done = !0, n(this, zd).call(this);
  }
  progressiveDone() {
    this._done || (this._done = !0), this._queuedChunks.length === 0 && n(this, zd).call(this);
  }
}
zd = new WeakMap();
var Vd;
class hE extends rb {
  constructor(e, s, i) {
    super(e, s, i);
    u(this, Vd, hb.bind(this));
    T(this, "onDone", null);
    T(this, "_begin", -1);
    T(this, "_done", !1);
    T(this, "_queuedChunk", null);
    T(this, "_requests", []);
    this._begin = s;
  }
  _enqueue(e) {
    var s;
    this._done || (this._requests.length === 0 ? this._queuedChunk = e : (this._requests.shift().resolve({
      value: e,
      done: !1
    }), n(this, Vd).call(this)), this._done = !0, (s = this.onDone) == null || s.call(this));
  }
  async read() {
    if (this._queuedChunk) {
      const s = this._queuedChunk;
      return this._queuedChunk = null, {
        value: s,
        done: !1
      };
    }
    if (this._done)
      return {
        value: void 0,
        done: !0
      };
    const e = Promise.withResolvers();
    return this._requests.push(e), e.promise;
  }
  cancel(e) {
    var s;
    this._done = !0, n(this, Vd).call(this), (s = this.onDone) == null || s.call(this);
  }
}
Vd = new WeakMap();
const wb = 200, d0 = 206;
function cE(g) {
  return typeof g != "string" ? g : tb(g).buffer;
}
var li, Hg, _w, Ug, Tw;
class dE extends ib {
  constructor(e) {
    super(e, uE, fE);
    u(this, Hg);
    u(this, Ug);
    u(this, li, /* @__PURE__ */ new WeakMap());
    T(this, "_responseOrigin", null);
    const {
      httpHeaders: s,
      url: i
    } = e;
    this.url = i, this.isHttp = /https?:/.test(i.protocol), this.headers = Aw(this.isHttp, s);
  }
  _request(e) {
    const s = new XMLHttpRequest(), i = {
      validateStatus: null,
      onHeadersReceived: e.onHeadersReceived,
      onDone: e.onDone,
      onError: e.onError,
      onProgress: e.onProgress
    };
    n(this, li).set(s, i), s.open("GET", this.url), s.withCredentials = this._source.withCredentials;
    for (const [r, a] of this.headers)
      s.setRequestHeader(r, a);
    return this.isHttp && "begin" in e && "end" in e ? (s.setRequestHeader("Range", `bytes=${e.begin}-${e.end - 1}`), i.validateStatus = (r) => r === d0 || r === wb) : i.validateStatus = (r) => r === wb, s.responseType = "arraybuffer", Ct(e.onError, "Expected `onError` callback to be provided."), s.onerror = () => e.onError(s.status), s.onreadystatechange = b(this, Ug, Tw).bind(this, s), s.onprogress = b(this, Hg, _w).bind(this, s), s.send(null), s;
  }
  _abortRequest(e) {
    n(this, li).has(e) && (n(this, li).delete(e), e.abort());
  }
  getRangeReader(e, s) {
    const i = super.getRangeReader(e, s);
    return i && (i.onClosed = () => this._rangeReaders.delete(i)), i;
  }
}
li = new WeakMap(), Hg = new WeakSet(), _w = function(e, s) {
  var r;
  const i = n(this, li).get(e);
  (r = i == null ? void 0 : i.onProgress) == null || r.call(i, s);
}, Ug = new WeakSet(), Tw = function(e, s) {
  const i = n(this, li).get(e);
  if (!i || (e.readyState >= 2 && i.onHeadersReceived && (i.onHeadersReceived(), delete i.onHeadersReceived), e.readyState !== 4) || !n(this, li).has(e))
    return;
  if (n(this, li).delete(e), e.status === 0 && this.isHttp) {
    i.onError(e.status);
    return;
  }
  const r = e.status || wb;
  if (!i.validateStatus(r)) {
    i.onError(e.status);
    return;
  }
  const a = cE(e.response);
  if (r === d0) {
    const o = e.getResponseHeader("Content-Range");
    /bytes \d+-\d+\/\d+/.test(o) ? i.onDone(a) : ($('Missing or invalid "Content-Range" header.'), i.onError(0));
  } else
    a ? i.onDone(a) : i.onError(e.status);
};
var jd, Gg, kw, $g, Pw, zg, Mw, Vg, Dw;
class uE extends nb {
  constructor(e) {
    super(e);
    u(this, Gg);
    u(this, $g);
    u(this, zg);
    u(this, Vg);
    u(this, jd, hb.bind(this));
    T(this, "_cachedChunks", []);
    T(this, "_done", !1);
    T(this, "_requests", []);
    T(this, "_storedError", null);
    this._fullRequestXhr = e._request({
      onHeadersReceived: b(this, Gg, kw).bind(this),
      onDone: b(this, $g, Pw).bind(this),
      onError: b(this, zg, Mw).bind(this),
      onProgress: b(this, Vg, Dw).bind(this)
    });
  }
  async read() {
    if (await this._headersCapability.promise, this._storedError)
      throw this._storedError;
    if (this._cachedChunks.length > 0)
      return {
        value: this._cachedChunks.shift(),
        done: !1
      };
    if (this._done)
      return {
        value: void 0,
        done: !0
      };
    const e = Promise.withResolvers();
    return this._requests.push(e), e.promise;
  }
  cancel(e) {
    this._done = !0, this._headersCapability.reject(e), n(this, jd).call(this), this._stream._abortRequest(this._fullRequestXhr), this._fullRequestXhr = null;
  }
}
jd = new WeakMap(), Gg = new WeakSet(), kw = function() {
  const e = this._stream, {
    disableRange: s,
    rangeChunkSize: i
  } = e._source, r = this._fullRequestXhr;
  e._responseOrigin = ab(r.responseURL);
  const a = r.getAllResponseHeaders(), o = new Headers(a ? iE(a.trimStart()).split(/[\r\n]+/).map((c) => {
    const [d, ...p] = c.split(": ");
    return [d, p.join(": ")];
  }) : []), {
    contentLength: l,
    isRangeSupported: h
  } = ww({
    responseHeaders: o,
    isHttp: e.isHttp,
    rangeChunkSize: i,
    disableRange: s
  });
  this._contentLength = l, this._isRangeSupported = h, this._filename = vw(o), this._isRangeSupported && e._abortRequest(r), this._headersCapability.resolve();
}, $g = new WeakSet(), Pw = function(e) {
  this._requests.length > 0 ? this._requests.shift().resolve({
    value: e,
    done: !1
  }) : this._cachedChunks.push(e), this._done = !0, this._cachedChunks.length === 0 && n(this, jd).call(this);
}, zg = new WeakSet(), Mw = function(e) {
  this._storedError = ob(e, this._stream.url), this._headersCapability.reject(this._storedError);
  for (const s of this._requests)
    s.reject(this._storedError);
  this._requests.length = 0, this._cachedChunks.length = 0;
}, Vg = new WeakSet(), Dw = function(e) {
  var s;
  (s = this.onProgress) == null || s.call(this, {
    loaded: e.loaded,
    total: e.lengthComputable ? e.total : this._contentLength
  });
};
var Wd, jg, Iw, Wg, Lw, Xd, py;
class fE extends rb {
  constructor(e, s, i) {
    super(e, s, i);
    u(this, jg);
    u(this, Wg);
    u(this, Xd);
    u(this, Wd, hb.bind(this));
    T(this, "onClosed", null);
    T(this, "_done", !1);
    T(this, "_queuedChunk", null);
    T(this, "_requests", []);
    T(this, "_storedError", null);
    this._requestXhr = e._request({
      begin: s,
      end: i,
      onHeadersReceived: b(this, jg, Iw).bind(this),
      onDone: b(this, Wg, Lw).bind(this),
      onError: b(this, Xd, py).bind(this),
      onProgress: null
    });
  }
  async read() {
    if (this._storedError)
      throw this._storedError;
    if (this._queuedChunk !== null) {
      const s = this._queuedChunk;
      return this._queuedChunk = null, {
        value: s,
        done: !1
      };
    }
    if (this._done)
      return {
        value: void 0,
        done: !0
      };
    const e = Promise.withResolvers();
    return this._requests.push(e), e.promise;
  }
  cancel(e) {
    var s;
    this._done = !0, n(this, Wd).call(this), this._stream._abortRequest(this._requestXhr), (s = this.onClosed) == null || s.call(this);
  }
}
Wd = new WeakMap(), jg = new WeakSet(), Iw = function() {
  var s;
  const e = ab((s = this._requestXhr) == null ? void 0 : s.responseURL);
  try {
    Sw(e, this._stream._responseOrigin);
  } catch (i) {
    this._storedError = i, b(this, Xd, py).call(this, 0);
  }
}, Wg = new WeakSet(), Lw = function(e) {
  var s;
  this._requests.length > 0 ? this._requests.shift().resolve({
    value: e,
    done: !1
  }) : this._queuedChunk = e, this._done = !0, n(this, Wd).call(this), (s = this.onClosed) == null || s.call(this);
}, Xd = new WeakSet(), py = function(e) {
  this._storedError ?? (this._storedError = ob(e, this._stream.url));
  for (const s of this._requests)
    s.reject(this._storedError);
  this._requests.length = 0, this._queuedChunk = null;
};
function Fw(g, t = null) {
  const e = process.getBuiltinModule("fs"), {
    Readable: s
  } = process.getBuiltinModule("stream"), i = e.createReadStream(g, t);
  return s.toWeb(i);
}
class pE extends ib {
  constructor(t) {
    super(t, gE, mE);
    const {
      url: e
    } = t;
    Ct(e.protocol === "file:", "PDFNodeStream only supports file:// URLs.");
  }
}
class gE extends nb {
  constructor(e) {
    super(e);
    T(this, "_reader", null);
    const {
      disableRange: s,
      disableStream: i,
      rangeChunkSize: r,
      url: a
    } = e._source;
    this._isStreamingSupported = !i, process.getBuiltinModule("fs/promises").lstat(a).then((l) => {
      const h = Fw(a);
      this._reader = h.getReader();
      const {
        size: c
      } = l;
      this._contentLength = c, this._isRangeSupported = !s && c > 2 * r, !this._isStreamingSupported && this._isRangeSupported && this.cancel(new Er("Streaming is disabled.")), this._headersCapability.resolve();
    }).catch((l) => {
      l.code === "ENOENT" && (l = ob(0, a)), this._headersCapability.reject(l);
    });
  }
  async read() {
    await this._headersCapability.promise;
    const {
      value: e,
      done: s
    } = await this._reader.read();
    return s ? {
      value: e,
      done: s
    } : (this._loaded += e.byteLength, this._callOnProgress(), {
      value: lb(e),
      done: !1
    });
  }
  cancel(e) {
    var s;
    (s = this._reader) == null || s.cancel(e);
  }
}
class mE extends rb {
  constructor(e, s, i) {
    super(e, s, i);
    T(this, "_readCapability", Promise.withResolvers());
    T(this, "_reader", null);
    const {
      url: r
    } = e._source;
    try {
      const a = Fw(r, {
        start: s,
        end: i - 1
      });
      this._reader = a.getReader(), this._readCapability.resolve();
    } catch (a) {
      this._readCapability.reject(a);
    }
  }
  async read() {
    await this._readCapability.promise;
    const {
      value: e,
      done: s
    } = await this._reader.read();
    return s ? {
      value: e,
      done: s
    } : {
      value: lb(e),
      done: !1
    };
  }
  cancel(e) {
    var s;
    (s = this._reader) == null || s.cancel(e);
  }
}
function bE(g) {
  return Cc(g) ? nE : es ? pE : dE;
}
var Yd, Kd;
class un {
  static get workerPort() {
    return n(this, Yd);
  }
  static set workerPort(t) {
    if (!(typeof Worker < "u" && t instanceof Worker) && t !== null)
      throw new Error("Invalid `workerPort` type.");
    f(this, Yd, t);
  }
  static get workerSrc() {
    return n(this, Kd);
  }
  static set workerSrc(t) {
    if (typeof t != "string")
      throw new Error("Invalid `workerSrc` type.");
    f(this, Kd, t);
  }
}
Yd = new WeakMap(), Kd = new WeakMap(), u(un, Yd, null), u(un, Kd, "");
var Ll, qd;
class yE {
  constructor({
    parsedData: t,
    rawData: e
  }) {
    u(this, Ll, void 0);
    u(this, qd, void 0);
    f(this, Ll, t), f(this, qd, e);
  }
  getRaw() {
    return n(this, qd);
  }
  get(t) {
    return n(this, Ll).get(t) ?? null;
  }
  [Symbol.iterator]() {
    return n(this, Ll).entries();
  }
}
Ll = new WeakMap(), qd = new WeakMap();
const kr = Symbol("INTERNAL");
var Qd, Jd, Fl, Da;
class AE {
  constructor(t, {
    name: e,
    intent: s,
    usage: i,
    rbGroups: r
  }) {
    u(this, Qd, !1);
    u(this, Jd, !1);
    u(this, Fl, !1);
    u(this, Da, !0);
    f(this, Qd, !!(t & ts.DISPLAY)), f(this, Jd, !!(t & ts.PRINT)), this.name = e, this.intent = s, this.usage = i, this.rbGroups = r;
  }
  get visible() {
    if (n(this, Fl))
      return n(this, Da);
    if (!n(this, Da))
      return !1;
    const {
      print: t,
      view: e
    } = this.usage;
    return n(this, Qd) ? (e == null ? void 0 : e.viewState) !== "OFF" : n(this, Jd) ? (t == null ? void 0 : t.printState) !== "OFF" : !0;
  }
  _setVisible(t, e, s = !1) {
    t !== kr && K("Internal method `_setVisible` called."), f(this, Fl, s), f(this, Da, e);
  }
  get serializable() {
    return {
      userSet: n(this, Fl),
      visible: n(this, Da)
    };
  }
}
Qd = new WeakMap(), Jd = new WeakMap(), Fl = new WeakMap(), Da = new WeakMap();
var Yn, q, Rl, Ol, Zd, tu, my;
const RA = class RA {
  constructor(t, e = ts.DISPLAY, s = null) {
    u(this, tu);
    u(this, Yn, null);
    u(this, q, /* @__PURE__ */ new Map());
    u(this, Rl, null);
    u(this, Ol, null);
    u(this, Zd, void 0);
    T(this, "creator", null);
    T(this, "name", null);
    if (f(this, Zd, t), this.renderingIntent = e, t !== null) {
      this.name = t.name, this.creator = t.creator, f(this, Ol, t.order);
      for (const i of t.groups)
        n(this, q).set(i.id, new AE(e, i));
      if (s) {
        s.size !== n(this, q).size && K("Incorrect serialized groupState.");
        for (const [i, r] of s)
          n(this, q).get(i)._setVisible(kr, r.visible, r.userSet);
      } else {
        if (t.baseState === "OFF")
          for (const i of n(this, q).values())
            i._setVisible(kr, !1);
        for (const i of t.on)
          n(this, q).get(i)._setVisible(kr, !0);
        for (const i of t.off)
          n(this, q).get(i)._setVisible(kr, !1);
      }
      f(this, Rl, this.getHash());
    }
  }
  isVisible(t) {
    if (n(this, q).size === 0)
      return !0;
    if (!t)
      return Zm("Optional content group not defined."), !0;
    if (t.type === "OCG")
      return n(this, q).has(t.id) ? n(this, q).get(t.id).visible : ($(`Optional content group not found: ${t.id}`), !0);
    if (t.type === "OCMD") {
      if (t.expression)
        return b(this, tu, my).call(this, t.expression);
      if (!t.policy || t.policy === "AnyOn") {
        for (const e of t.ids) {
          if (!n(this, q).has(e))
            return $(`Optional content group not found: ${e}`), !0;
          if (n(this, q).get(e).visible)
            return !0;
        }
        return !1;
      } else if (t.policy === "AllOn") {
        for (const e of t.ids) {
          if (!n(this, q).has(e))
            return $(`Optional content group not found: ${e}`), !0;
          if (!n(this, q).get(e).visible)
            return !1;
        }
        return !0;
      } else if (t.policy === "AnyOff") {
        for (const e of t.ids) {
          if (!n(this, q).has(e))
            return $(`Optional content group not found: ${e}`), !0;
          if (!n(this, q).get(e).visible)
            return !0;
        }
        return !1;
      } else if (t.policy === "AllOff") {
        for (const e of t.ids) {
          if (!n(this, q).has(e))
            return $(`Optional content group not found: ${e}`), !0;
          if (n(this, q).get(e).visible)
            return !1;
        }
        return !0;
      }
      return $(`Unknown optional content policy ${t.policy}.`), !0;
    }
    return $(`Unknown group type ${t.type}.`), !0;
  }
  setVisibility(t, e = !0, s = !0) {
    var r;
    const i = n(this, q).get(t);
    if (!i) {
      $(`Optional content group not found: ${t}`);
      return;
    }
    if (s && e && i.rbGroups.length)
      for (const a of i.rbGroups)
        for (const o of a)
          o !== t && ((r = n(this, q).get(o)) == null || r._setVisible(kr, !1, !0));
    i._setVisible(kr, !!e, !0), f(this, Yn, null);
  }
  setOCGState({
    state: t,
    preserveRB: e
  }) {
    let s;
    for (const i of t) {
      switch (i) {
        case "ON":
        case "OFF":
        case "Toggle":
          s = i;
          continue;
      }
      const r = n(this, q).get(i);
      if (r)
        switch (s) {
          case "ON":
            this.setVisibility(i, !0, e);
            break;
          case "OFF":
            this.setVisibility(i, !1, e);
            break;
          case "Toggle":
            this.setVisibility(i, !r.visible, e);
            break;
        }
    }
    f(this, Yn, null);
  }
  get hasInitialVisibility() {
    return n(this, Rl) === null || this.getHash() === n(this, Rl);
  }
  getOrder() {
    return n(this, q).size ? n(this, Ol) ? n(this, Ol).slice() : [...n(this, q).keys()] : null;
  }
  getGroup(t) {
    return n(this, q).get(t) || null;
  }
  getHash() {
    if (n(this, Yn) !== null)
      return n(this, Yn);
    const t = new Zb();
    for (const [e, s] of n(this, q))
      t.update(`${e}:${s.visible}`);
    return f(this, Yn, t.hexdigest());
  }
  [Symbol.iterator]() {
    return n(this, q).entries();
  }
  get serializable() {
    const t = /* @__PURE__ */ new Map();
    for (const [e, s] of n(this, q))
      t.set(e, s.serializable);
    return {
      data: n(this, Zd),
      renderingIntent: this.renderingIntent,
      groupState: t
    };
  }
  static fromSerializable({
    data: t,
    renderingIntent: e,
    groupState: s
  }) {
    return new RA(t, e, s);
  }
};
Yn = new WeakMap(), q = new WeakMap(), Rl = new WeakMap(), Ol = new WeakMap(), Zd = new WeakMap(), tu = new WeakSet(), my = function(t) {
  const e = t.length;
  if (e < 2)
    return !0;
  const s = t[0];
  for (let i = 1; i < e; i++) {
    const r = t[i];
    let a;
    if (Array.isArray(r))
      a = b(this, tu, my).call(this, r);
    else if (n(this, q).has(r))
      a = n(this, q).get(r).visible;
    else
      return $(`Optional content group not found: ${r}`), !0;
    switch (s) {
      case "And":
        if (!a)
          return !1;
        break;
      case "Or":
        if (a)
          return !0;
        break;
      case "Not":
        return !a;
      default:
        return !0;
    }
  }
  return s === "And";
};
let gy = RA;
var Et, gs, $t, Ia, hi, La, mc, Nl, op, eu, by, su, yy;
class wE {
  constructor() {
    u(this, La);
    u(this, Nl);
    u(this, eu);
    u(this, su);
    u(this, Et, null);
    u(this, gs, null);
    u(this, $t, 0);
    u(this, Ia, null);
    u(this, hi, null);
  }
  get pagesNumber() {
    return n(this, $t);
  }
  set pagesNumber(t) {
    n(this, $t) !== t && (f(this, $t, t), f(this, Et, null), f(this, gs, null));
  }
  movePages(t, e, s) {
    b(this, La, mc).call(this);
    const i = n(this, Et), r = e.length, a = new Uint32Array(r);
    let o = 0;
    for (let p = 0; p < r; p++) {
      const m = e[p] - 1;
      a[p] = i[m], m < s && o++;
    }
    const l = n(this, $t), h = l - r, c = new Int32Array(l), d = ut(s - o, 0, h);
    for (let p = 0, m = 0; p < l; p++)
      t.has(p + 1) || (i[m] = i[p], c[m++] = p + 1);
    i.copyWithin(d + r, d, h), i.set(a, d), c.copyWithin(d + r, d, h), c.set(e, d), f(this, gs, c), i.every((p, m) => p === m + 1) && f(this, Et, null);
  }
  deletePages(t) {
    b(this, La, mc).call(this);
    const e = n(this, Et), s = b(this, Nl, op).call(this);
    f(this, hi, {
      pageNumberToId: e.slice(),
      pagesNumber: n(this, $t),
      prevPageNumbers: n(this, gs).slice()
    });
    const i = n(this, $t) - t.length;
    f(this, $t, i);
    const r = f(this, Et, new Uint32Array(i));
    f(this, gs, new Int32Array(i));
    let a = 0, o = 0;
    for (const l of t) {
      const h = l - 1;
      h !== a && (r.set(e.subarray(a, h), o), o += h - a), a = h + 1;
    }
    a < e.length && r.set(e.subarray(a), o), b(this, eu, by).call(this, s, new Set(t));
  }
  cancelDelete() {
    n(this, hi) && (f(this, Et, n(this, hi).pageNumberToId), f(this, $t, n(this, hi).pagesNumber), f(this, gs, n(this, hi).prevPageNumbers), f(this, hi, null));
  }
  cleanSavedData() {
    f(this, hi, null);
  }
  copyPages(t) {
    b(this, La, mc).call(this), f(this, Ia, {
      pageNumbers: t,
      pageIds: t.map((e) => n(this, Et)[e - 1])
    });
  }
  cancelCopy() {
    f(this, Ia, null);
  }
  pastePages(t) {
    b(this, La, mc).call(this);
    const e = n(this, Et), s = b(this, Nl, op).call(this), {
      pageNumbers: i,
      pageIds: r
    } = n(this, Ia), a = n(this, $t) + i.length;
    f(this, $t, a);
    const o = f(this, Et, new Uint32Array(a));
    f(this, gs, new Int32Array(a)), o.set(e.subarray(0, t), 0), o.set(r, t), o.set(e.subarray(t), t + i.length), b(this, eu, by).call(this, s, null, t, i), f(this, Ia, null);
  }
  hasBeenAltered() {
    return n(this, Et) !== null;
  }
  getPageMappingForSaving(t = null, e = b(this, su, yy).call(this)) {
    t ?? (t = b(this, Nl, op).call(this));
    let s = 0;
    for (const r of t.values())
      s = Math.max(s, r.length);
    const i = new Array(s);
    for (let r = 0; r < s; r++)
      i[r] = {
        document: null,
        pageIndices: [],
        includePages: []
      };
    for (const [r, a] of t)
      for (let o = 0, l = a.length; o < l; o++)
        i[o].includePages.push([r - 1, a[o] - 1]);
    for (const {
      includePages: r,
      pageIndices: a
    } of i) {
      r.sort((o, l) => o[0] - l[0]);
      for (let o = 0, l = r.length; o < l; o++)
        a.push(r[o][1]), r[o] = r[o][0];
    }
    return {
      pageInfos: i,
      copyLevels: e
    };
  }
  extractPages(t) {
    t = Array.from(t).sort((s, i) => s - i);
    const e = /* @__PURE__ */ new Map();
    for (let s = 0, i = t.length; s < i; s++) {
      const r = this.getPageId(t[s]);
      e.getOrInsertComputed(r, Zh).push(s + 1);
    }
    return this.getPageMappingForSaving(e, b(this, su, yy).call(this, t));
  }
  getPrevPageNumber(t) {
    var e;
    return ((e = n(this, gs)) == null ? void 0 : e[t - 1]) ?? 0;
  }
  getPageNumber(t) {
    if (!n(this, Et))
      return t;
    const e = n(this, Et);
    for (let s = 0, i = n(this, $t); s < i; s++)
      if (e[s] === t)
        return s + 1;
    return 0;
  }
  getPageId(t) {
    var e;
    return ((e = n(this, Et)) == null ? void 0 : e[t - 1]) ?? t;
  }
  getMapping() {
    var t;
    return (t = n(this, Et)) == null ? void 0 : t.subarray(0, this.pagesNumber);
  }
}
Et = new WeakMap(), gs = new WeakMap(), $t = new WeakMap(), Ia = new WeakMap(), hi = new WeakMap(), La = new WeakSet(), mc = function() {
  if (n(this, Et))
    return;
  const t = n(this, $t), e = f(this, Et, new Uint32Array(t));
  for (let s = 0; s < t; s++)
    e[s] = s + 1;
  f(this, gs, new Int32Array(e));
}, Nl = new WeakSet(), op = function() {
  const t = /* @__PURE__ */ new Map(), e = n(this, Et);
  for (let s = 0, i = n(this, $t); s < i; s++) {
    const r = e[s], a = t.get(r);
    a ? a.push(s + 1) : t.set(r, [s + 1]);
  }
  return t;
}, eu = new WeakSet(), by = function(t, e = null, s = -1, i = null) {
  const r = n(this, gs), a = n(this, Et), o = s + ((i == null ? void 0 : i.length) ?? 0), l = /* @__PURE__ */ new Map();
  for (let h = 0, c = n(this, $t); h < c; h++) {
    if (h >= s && h < o) {
      r[h] = -i[h - s];
      continue;
    }
    const d = a[h], p = t.get(d);
    let m = l.get(d) || 0;
    if (e && p)
      for (; m < p.length && e.has(p[m]); )
        m++;
    r[h] = p == null ? void 0 : p[m], l.set(d, m + 1);
  }
}, su = new WeakSet(), yy = function(t = null) {
  if (!n(this, Et))
    return null;
  const e = new Int32Array(n(this, $t)).fill(-1), s = /* @__PURE__ */ new Map();
  if (t)
    for (const i of t) {
      const r = this.getPageId(i), a = s.get(r) ?? 0;
      s.set(r, a + 1), e[i - 1] = a;
    }
  else
    for (let i = 0, r = n(this, $t); i < r; i++) {
      const a = n(this, Et)[i], o = s.get(a) ?? 0;
      s.set(a, o + 1), e[i] = o;
    }
  return e;
};
const Oo = Symbol("INITIAL_DATA"), u0 = () => ({
  ...Promise.withResolvers(),
  data: Oo
});
var ms;
class Rw {
  constructor() {
    u(this, ms, /* @__PURE__ */ new Map());
  }
  get(t, e = null) {
    if (e) {
      const i = n(this, ms).getOrInsertComputed(t, u0);
      return i.promise.then(() => e(i.data)), null;
    }
    const s = n(this, ms).get(t);
    if (!s || s.data === Oo)
      throw new Error(`Requesting object that isn't resolved yet ${t}.`);
    return s.data;
  }
  has(t) {
    const e = n(this, ms).get(t);
    return !!e && e.data !== Oo;
  }
  delete(t) {
    const e = n(this, ms).get(t);
    return !e || e.data === Oo ? !1 : (n(this, ms).delete(t), !0);
  }
  resolve(t, e = null) {
    const s = n(this, ms).getOrInsertComputed(t, u0);
    if (s.data !== Oo)
      throw new Error(`Object already resolved ${t}.`);
    s.data = e, s.resolve();
  }
  clear() {
    var t;
    for (const {
      data: e
    } of n(this, ms).values())
      (t = e == null ? void 0 : e.bitmap) == null || t.close();
    n(this, ms).clear();
  }
  *[Symbol.iterator]() {
    for (const [t, {
      data: e
    }] of n(this, ms))
      e !== Oo && (yield [t, e]);
  }
}
ms = new WeakMap();
const vE = 1e5, f0 = 30;
var b0, Kn, ve, iu, nu, Bl, Fa, zi, ru, au, Ra, ou, Hl, qn, Ul, lu, Gl, Oa, hu, cu, $l, Na, du, zl, Vl, Xg, Ow, Yg, Nw, uu, Ay, jl, lp, fu, wy, Kg, Bw, qg, Hw;
const Rt = class Rt {
  constructor({
    textContentSource: t,
    images: e,
    container: s,
    viewport: i
  }) {
    u(this, Xg);
    u(this, Yg);
    u(this, uu);
    u(this, Kn, Promise.withResolvers());
    u(this, ve, null);
    u(this, iu, !1);
    u(this, nu, !!((b0 = globalThis.FontInspector) != null && b0.enabled));
    u(this, Bl, null);
    u(this, Fa, null);
    u(this, zi, null);
    u(this, ru, 0);
    u(this, au, 0);
    u(this, Ra, null);
    u(this, ou, null);
    u(this, Hl, 0);
    u(this, qn, 0);
    u(this, Ul, /* @__PURE__ */ Object.create(null));
    u(this, lu, []);
    u(this, Gl, null);
    u(this, Oa, []);
    u(this, hu, /* @__PURE__ */ new WeakMap());
    u(this, cu, null);
    var h;
    if (t instanceof ReadableStream)
      f(this, Gl, t);
    else if (typeof t == "object")
      f(this, Gl, new ReadableStream({
        start(c) {
          c.enqueue(t), c.close();
        }
      }));
    else
      throw new Error('No "textContentSource" parameter specified.');
    f(this, ve, f(this, ou, s)), f(this, Bl, e), f(this, qn, i.scale * Gs.pixelRatio), f(this, Hl, i.rotation), f(this, zi, {
      div: null,
      properties: null,
      ctx: null
    });
    const {
      pageWidth: r,
      pageHeight: a,
      pageX: o,
      pageY: l
    } = i.rawDims;
    f(this, cu, [1, 0, 0, -1, -o, l + a]), f(this, au, r), f(this, ru, a), b(h = Rt, Kg, Bw).call(h), s.style.setProperty("--min-font-size", n(Rt, zl)), To(s, i), n(this, Kn).promise.finally(() => {
      n(Rt, Vl).delete(this), f(this, zi, null), f(this, Ul, null);
    }).catch(() => {
    });
  }
  static get fontFamilyMap() {
    const {
      isWindows: t,
      isFirefox: e
    } = rt.platform;
    return H(this, "fontFamilyMap", /* @__PURE__ */ new Map([["sans-serif", `${t && e ? "Calibri, " : ""}sans-serif`], ["monospace", `${t && e ? "Lucida Console, " : ""}monospace`]]));
  }
  render() {
    n(this, Bl) && n(this, ve).append(n(this, Bl).render());
    const t = () => {
      n(this, Ra).read().then(({
        value: e,
        done: s
      }) => {
        if (s) {
          n(this, Kn).resolve();
          return;
        }
        n(this, Fa) ?? f(this, Fa, e.lang), Object.assign(n(this, Ul), e.styles), b(this, Xg, Ow).call(this, e.items), t();
      }, n(this, Kn).reject);
    };
    return f(this, Ra, n(this, Gl).getReader()), n(Rt, Vl).add(this), t(), n(this, Kn).promise;
  }
  update({
    viewport: t,
    onBefore: e = null
  }) {
    var r;
    const s = t.scale * Gs.pixelRatio, i = t.rotation;
    if (i !== n(this, Hl) && (e == null || e(), f(this, Hl, i), To(n(this, ou), {
      rotation: i
    })), s !== n(this, qn)) {
      e == null || e(), f(this, qn, s);
      const a = {
        div: null,
        properties: null,
        ctx: b(r = Rt, jl, lp).call(r, n(this, Fa))
      };
      for (const o of n(this, Oa))
        a.properties = n(this, hu).get(o), a.div = o, b(this, uu, Ay).call(this, a);
    }
  }
  cancel() {
    var e;
    const t = new Er("TextLayer task cancelled.");
    (e = n(this, Ra)) == null || e.cancel(t).catch(() => {
    }), f(this, Ra, null), n(this, Kn).reject(t);
  }
  get textDivs() {
    return n(this, Oa);
  }
  get textContentItemsStr() {
    return n(this, lu);
  }
  static cleanup() {
    if (!(n(this, Vl).size > 0)) {
      n(this, $l).clear();
      for (const {
        canvas: t
      } of n(this, Na).values())
        t.remove();
      n(this, Na).clear();
    }
  }
};
Kn = new WeakMap(), ve = new WeakMap(), iu = new WeakMap(), nu = new WeakMap(), Bl = new WeakMap(), Fa = new WeakMap(), zi = new WeakMap(), ru = new WeakMap(), au = new WeakMap(), Ra = new WeakMap(), ou = new WeakMap(), Hl = new WeakMap(), qn = new WeakMap(), Ul = new WeakMap(), lu = new WeakMap(), Gl = new WeakMap(), Oa = new WeakMap(), hu = new WeakMap(), cu = new WeakMap(), $l = new WeakMap(), Na = new WeakMap(), du = new WeakMap(), zl = new WeakMap(), Vl = new WeakMap(), Xg = new WeakSet(), Ow = function(t) {
  var i, r;
  if (n(this, iu))
    return;
  (r = n(this, zi)).ctx ?? (r.ctx = b(i = Rt, jl, lp).call(i, n(this, Fa)));
  const e = n(this, Oa), s = n(this, lu);
  for (const a of t) {
    if (e.length > vE) {
      $("Ignoring additional textDivs for performance reasons."), f(this, iu, !0);
      return;
    }
    if (a.str === void 0) {
      if (a.type === "beginMarkedContentProps" || a.type === "beginMarkedContent") {
        const o = n(this, ve);
        f(this, ve, document.createElement("span")), n(this, ve).classList.add("markedContent"), a.id && n(this, ve).setAttribute("id", a.id), a.tag === "Artifact" && (n(this, ve).ariaHidden = !0), o.append(n(this, ve));
      } else
        a.type === "endMarkedContent" && f(this, ve, n(this, ve).parentNode);
      continue;
    }
    s.push(a.str), b(this, Yg, Nw).call(this, a);
  }
}, Yg = new WeakSet(), Nw = function(t) {
  var y;
  const e = document.createElement("span"), s = {
    angle: 0,
    canvasWidth: 0,
    hasText: t.str !== "",
    hasEOL: t.hasEOL,
    fontSize: 0
  };
  n(this, Oa).push(e);
  const i = D.transform(n(this, cu), t.transform);
  let r = Math.atan2(i[1], i[0]);
  const a = n(this, Ul)[t.fontName];
  a.vertical && (r += Math.PI / 2);
  let o = n(this, nu) && a.fontSubstitution || a.fontFamily;
  o = Rt.fontFamilyMap.get(o) || o;
  const l = Math.hypot(i[2], i[3]), h = l * b(y = Rt, qg, Hw).call(y, o, a, n(this, Fa));
  let c, d;
  r === 0 ? (c = i[4], d = i[5] - h) : (c = i[4] + h * Math.sin(r), d = i[5] - h * Math.cos(r));
  const p = e.style;
  p.left = `${(100 * c / n(this, au)).toFixed(2)}%`, p.top = `${(100 * d / n(this, ru)).toFixed(2)}%`, p.setProperty("--font-height", `${l.toFixed(2)}px`), p.fontFamily = o, s.fontSize = l, e.setAttribute("role", "presentation"), e.textContent = t.str, e.dir = t.dir, n(this, nu) && (e.dataset.fontName = a.fontSubstitutionLoadedName || t.fontName), r !== 0 && (s.angle = r * (180 / Math.PI));
  let m = !1;
  if (t.str.length > 1)
    m = !0;
  else if (t.str !== " " && t.transform[0] !== t.transform[3]) {
    const A = Math.abs(t.transform[0]), v = Math.abs(t.transform[3]);
    A !== v && Math.max(A, v) / Math.min(A, v) > 1.5 && (m = !0);
  }
  if (m && (s.canvasWidth = a.vertical ? t.height : t.width), n(this, hu).set(e, s), n(this, zi).div = e, n(this, zi).properties = s, b(this, uu, Ay).call(this, n(this, zi)), s.hasText && n(this, ve).append(e), s.hasEOL) {
    const A = document.createElement("br");
    A.setAttribute("role", "presentation"), n(this, ve).append(A);
  }
}, uu = new WeakSet(), Ay = function(t) {
  var a;
  const {
    div: e,
    properties: s,
    ctx: i
  } = t, {
    style: r
  } = e;
  if (s.canvasWidth !== 0 && s.hasText) {
    const {
      fontFamily: o
    } = r, {
      canvasWidth: l,
      fontSize: h
    } = s;
    b(a = Rt, fu, wy).call(a, i, h * n(this, qn), o);
    const {
      width: c
    } = i.measureText(e.textContent);
    c > 0 && r.setProperty("--scale-x", l * n(this, qn) / c);
  }
  s.angle !== 0 && r.setProperty("--rotate", `${s.angle}deg`);
}, jl = new WeakSet(), lp = function(t = null) {
  let e = n(this, Na).get(t || (t = ""));
  if (!e) {
    const s = document.createElement("canvas");
    s.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;display:none;letter-spacing:normal;word-spacing:normal", s.lang = t, document.body.append(s), e = s.getContext("2d", {
      alpha: !1,
      willReadFrequently: !0
    }), n(this, Na).set(t, e), n(this, du).set(e, {
      size: 0,
      family: ""
    });
  }
  return e;
}, fu = new WeakSet(), wy = function(t, e, s) {
  const i = n(this, du).get(t);
  e === i.size && s === i.family || (t.font = `${e}px ${s}`, i.size = e, i.family = s);
}, Kg = new WeakSet(), Bw = function() {
  if (n(this, zl) !== null)
    return;
  const t = document.createElement("div");
  t.style.opacity = 0, t.style.lineHeight = 1, t.style.fontSize = "1px", t.style.position = "absolute", t.textContent = "X", document.body.append(t), f(this, zl, t.getBoundingClientRect().height), t.remove();
}, qg = new WeakSet(), Hw = function(t, e, s) {
  const i = n(this, $l).get(t);
  if (i)
    return i;
  const r = b(this, jl, lp).call(this, s);
  r.canvas.width = r.canvas.height = f0, b(this, fu, wy).call(this, r, f0, t);
  const a = r.measureText(""), o = a.fontBoundingBoxAscent, l = Math.abs(a.fontBoundingBoxDescent);
  r.canvas.width = r.canvas.height = 0;
  let h = 0.8;
  return o ? h = o / (o + l) : (rt.platform.isFirefox && $("Enable the `dom.textMetrics.fontBoundingBox.enabled` preference in `about:config` to improve TextLayer rendering."), e.ascent ? h = e.ascent : e.descent && (h = 1 + e.descent)), n(this, $l).set(t, h), h;
}, u(Rt, jl), u(Rt, fu), u(Rt, Kg), u(Rt, qg), u(Rt, $l, /* @__PURE__ */ new Map()), u(Rt, Na, /* @__PURE__ */ new Map()), u(Rt, du, /* @__PURE__ */ new WeakMap()), u(Rt, zl, null), u(Rt, Vl, /* @__PURE__ */ new Set());
let Ic = Rt;
const SE = 100;
function EE(g = {}) {
  const t = new vy(), {
    docId: e
  } = t, s = g.url ? TS(g.url) : null, i = g.data ? kS(g.data) : null, r = g.httpHeaders || null, a = g.withCredentials === !0, o = g.password ?? null, l = g.range instanceof Uw ? g.range : null, h = Number.isInteger(g.rangeChunkSize) && g.rangeChunkSize > 0 ? g.rangeChunkSize : 2 ** 16;
  let c = g.worker instanceof Lc ? g.worker : null;
  const d = g.verbosity, p = typeof g.docBaseUrl == "string" && !eb(g.docBaseUrl) ? g.docBaseUrl : null, m = Bf(g.cMapUrl), y = g.cMapPacked !== !1, A = Bf(g.iccUrl), v = Bf(g.standardFontDataUrl), w = Bf(g.wasmUrl), S = g.stopAtErrors !== !0, E = Number.isInteger(g.maxImageSize) && g.maxImageSize > -1 ? g.maxImageSize : -1, x = typeof g.isOffscreenCanvasSupported == "boolean" ? g.isOffscreenCanvasSupported : !es, C = typeof g.isImageDecoderSupported == "boolean" ? g.isImageDecoderSupported : !es, _ = Number.isInteger(g.canvasMaxAreaInBytes) ? g.canvasMaxAreaInBytes : -1, k = typeof g.disableFontFace == "boolean" ? g.disableFontFace : es, P = g.fontExtraProperties === !0, M = g.enableXfa === !0, I = g.ownerDocument || globalThis.document, R = g.disableRange === !0, X = g.disableStream === !0, V = g.disableAutoFetch === !0, W = g.pdfBug === !0, Mt = g.CanvasFactory || (es ? OS : IS), L = g.FilterFactory || (es ? RS : LS), B = g.BinaryDataFactory || (es ? NS : e0), ft = g.enableHWA === !0, me = g.enableWebGPU === !0 ? GS() : Promise.resolve(!1), te = g.useWasm !== !1, Lt = g.pagesMapper || new wE(), Z = typeof g.useSystemFonts == "boolean" ? g.useSystemFonts : !es && !k, $s = typeof g.useWorkerFetch == "boolean" ? g.useWorkerFetch : !!(B === e0 && m && y && v && w && Cc(m, document.baseURI) && Cc(v, document.baseURI) && Cc(w, document.baseURI)), tc = null;
  Wv(d);
  const Wt = {
    canvasFactory: new Mt({
      ownerDocument: I,
      enableHWA: ft
    }),
    filterFactory: new L({
      docId: e,
      ownerDocument: I
    }),
    binaryDataFactory: $s ? null : new B({
      cMapUrl: m,
      standardFontDataUrl: v,
      wasmUrl: w
    })
  };
  c || (c = Lc.create({
    verbosity: d,
    port: un.workerPort
  }), t._worker = c);
  const ot = {
    docId: e,
    apiVersion: "6.3.289",
    data: i,
    password: o,
    disableAutoFetch: V,
    rangeChunkSize: h,
    docBaseUrl: p,
    enableXfa: M,
    evaluatorOptions: {
      maxImageSize: E,
      disableFontFace: k,
      ignoreErrors: S,
      isOffscreenCanvasSupported: x,
      isImageDecoderSupported: C,
      canvasMaxAreaInBytes: _,
      fontExtraProperties: P,
      useSystemFonts: Z,
      useWasm: te,
      useWorkerFetch: $s,
      cMapUrl: m,
      cMapPacked: y,
      iccUrl: A,
      standardFontDataUrl: v,
      wasmUrl: w,
      hasGPU: !1
    }
  }, db = {
    ownerDocument: I,
    pdfBug: W,
    styleElement: tc,
    enableHWA: ft,
    loadingParams: {
      disableAutoFetch: V,
      enableXfa: M
    }
  };
  return Promise.all([c.promise, me]).then(function([, Hv]) {
    if (c.destroyed)
      throw new Error("Worker was destroyed");
    ot.evaluatorOptions.hasGPU = Hv;
    const Uv = c.messageHandler.sendWithPromise("GetDocRequest", ot, i ? [i.buffer] : null);
    let ub;
    if (!i)
      if (l)
        ub = new oE({
          pdfDataRangeTransport: l,
          disableRange: R,
          disableStream: X
        });
      else if (s) {
        const fb = bE(s);
        ub = new fb({
          url: s,
          httpHeaders: r,
          withCredentials: a,
          rangeChunkSize: h,
          disableRange: R,
          disableStream: X
        });
      } else
        throw new Error("getDocument - expected either `data`, `range`, or `url` parameter.");
    return Uv.then((fb) => {
      if (c.destroyed)
        throw new Error("Worker was destroyed");
      const HA = new dc(e, fb, c.port), Gv = new CE(HA, t, ub, db, Wt, Lt);
      if (t._transport = Gv, t.destroyed)
        throw new Error("Loading aborted");
      HA.send("Ready", null);
    });
  }).catch(t._capability.reject).finally(t._setupCapability.resolve), t;
}
var Qg;
const Jg = class Jg {
  constructor() {
    T(this, "_capability", Promise.withResolvers());
    T(this, "_setupCapability", Promise.withResolvers());
    T(this, "_transport", null);
    T(this, "_worker", null);
    T(this, "docId", `d${At(Jg, Qg)._++}`);
    T(this, "destroyed", !1);
    T(this, "onPassword", null);
    T(this, "onProgress", null);
  }
  get promise() {
    return this._capability.promise;
  }
  async destroy() {
    var t, e, s, i;
    this.destroyed = !0, this._capability.promise.catch(() => {
    });
    try {
      (t = this._worker) != null && t.port && (this._worker._pendingDestroy = !0), await this._setupCapability.promise, await ((e = this._transport) == null ? void 0 : e.destroy());
    } catch (r) {
      throw (s = this._worker) != null && s.port && delete this._worker._pendingDestroy, r;
    }
    this._transport = null, (i = this._worker) == null || i.destroy(), this._worker = null;
  }
  async getData() {
    return this._transport.getData();
  }
};
Qg = new WeakMap(), u(Jg, Qg, 0);
let vy = Jg;
var Wl, Ba;
class Uw {
  constructor(t, e, s = !1, i = null) {
    u(this, Wl, Promise.withResolvers());
    u(this, Ba, null);
    this.length = t, this.initialData = e, this.progressiveDone = s, this.contentDispositionFilename = i;
  }
  onDataRange(t, e) {
    n(this, Ba).call(this, {
      type: "range",
      begin: t,
      chunk: e
    });
  }
  onDataProgressiveRead(t) {
    n(this, Wl).promise.then(() => {
      n(this, Ba).call(this, {
        type: "progressiveRead",
        chunk: t
      });
    });
  }
  onDataProgressiveDone() {
    n(this, Wl).promise.then(() => {
      n(this, Ba).call(this, {
        type: "progressiveDone"
      });
    });
  }
  transportReady(t) {
    f(this, Ba, t), n(this, Wl).resolve();
  }
  requestDataRange(t, e) {
    K("Abstract method PDFDataRangeTransport.requestDataRange");
  }
  abort() {
  }
}
Wl = new WeakMap(), Ba = new WeakMap();
class xE {
  constructor(t, e) {
    this._pdfInfo = t, this._transport = e;
  }
  get pagesMapper() {
    return this._transport.pagesMapper;
  }
  get annotationStorage() {
    return this._transport.annotationStorage;
  }
  get canvasFactory() {
    return this._transport.canvasFactory;
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get numPages() {
    return this._pdfInfo.numPages;
  }
  get fingerprints() {
    return this._pdfInfo.fingerprints;
  }
  get isPureXfa() {
    return H(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  get allXfaHtml() {
    return this._transport._htmlForXfa;
  }
  getPage(t) {
    return this._transport.getPage(t);
  }
  getPageIndex(t) {
    return this._transport.getPageIndex(t);
  }
  getDestinations() {
    return this._transport.getDestinations();
  }
  getDestination(t) {
    return this._transport.getDestination(t);
  }
  getPageLabels() {
    return this._transport.getPageLabels();
  }
  getPageLayout() {
    return this._transport.getPageLayout();
  }
  getPageMode() {
    return this._transport.getPageMode();
  }
  getViewerPreferences() {
    return this._transport.getViewerPreferences();
  }
  getOpenAction() {
    return this._transport.getOpenAction();
  }
  getAttachments() {
    return this._transport.getAttachments();
  }
  getAttachmentContent(t) {
    return this._transport.getAttachmentContent(t);
  }
  getAnnotationsByType(t, e) {
    return this._transport.getAnnotationsByType(t, e);
  }
  getJSActions() {
    return this._transport.getDocJSActions();
  }
  getOutline() {
    return this._transport.getOutline();
  }
  getOptionalContentConfig({
    intent: t = "display"
  } = {}) {
    const {
      renderingIntent: e
    } = this._transport.getRenderingIntent(t);
    return this._transport.getOptionalContentConfig(e);
  }
  getPermissions() {
    return this._transport.getPermissions();
  }
  getMetadata() {
    return this._transport.getMetadata();
  }
  getMarkInfo() {
    return this._transport.getMarkInfo();
  }
  getData() {
    return this._transport.getData();
  }
  saveDocument() {
    return this._transport.saveDocument();
  }
  extractPages(t, e = null) {
    return this._transport.extractPages(t, e);
  }
  getDownloadInfo() {
    return this._transport.downloadInfoCapability.promise;
  }
  cleanup(t = !1) {
    return this._transport.startCleanup(t || this.isPureXfa);
  }
  cachedPageNumber(t) {
    return this._transport.cachedPageNumber(t);
  }
  get loadingParams() {
    return this._transport.loadingParams;
  }
  get loadingTask() {
    return this._transport.loadingTask;
  }
  getFieldObjects() {
    return this._transport.getFieldObjects();
  }
  getSignatures() {
    return this._transport.getSignatures();
  }
  getSignatureData(t) {
    return this._transport.getSignatureData(t);
  }
  hasJSActions() {
    return this._transport.hasJSActions();
  }
  getCalculationOrderIds() {
    return this._transport.getCalculationOrderIds();
  }
}
var Vi, Ha, Ua, bc;
const OA = class OA {
  constructor(t, e, s, i, r = !1) {
    u(this, Ua);
    u(this, Vi, !1);
    u(this, Ha, null);
    this._pageIndex = t, this._pageInfo = e, this._transport = s, this._stats = r ? new GA() : null, this._pdfBug = r, this.commonObjs = s.commonObjs, this.objs = new Rw(), this._intentStates = /* @__PURE__ */ new Map(), this.destroyed = !1, this.recordedBBoxes = null, f(this, Ha, i), this.imageCoordinates = null;
  }
  clone(t) {
    const e = new OA(t, this._pageInfo, this._transport, n(this, Ha), this._pdfBug);
    return e.clonedFromIndex = this.clonedFromIndex ?? this._pageIndex, this._transport.updatePage(e), e;
  }
  get pageNumber() {
    return this._pageIndex + 1;
  }
  set pageNumber(t) {
    this._pageIndex = t - 1, this._transport.updatePage(this);
  }
  get rotate() {
    return this._pageInfo.rotate;
  }
  get ref() {
    return this._pageInfo.ref;
  }
  get userUnit() {
    return this._pageInfo.userUnit;
  }
  get view() {
    return this._pageInfo.view;
  }
  getViewport({
    scale: t,
    rotation: e = this.rotate,
    offsetX: s = 0,
    offsetY: i = 0,
    dontFlip: r = !1
  } = {}) {
    return new Lf({
      viewBox: this.view,
      userUnit: this.userUnit,
      scale: t,
      rotation: e,
      offsetX: s,
      offsetY: i,
      dontFlip: r
    });
  }
  getAnnotations({
    intent: t = "display"
  } = {}) {
    const {
      renderingIntent: e
    } = this._transport.getRenderingIntent(t);
    return this._transport.getAnnotations(this._pageIndex, e);
  }
  getJSActions() {
    return this._transport.getPageJSActions(this._pageIndex);
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get isPureXfa() {
    return H(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  async getXfa() {
    var t;
    return ((t = this._transport._htmlForXfa) == null ? void 0 : t.children[this._pageIndex]) || null;
  }
  render({
    canvasContext: t,
    canvas: e = t.canvas,
    viewport: s,
    intent: i = "display",
    annotationMode: r = gn.ENABLE,
    transform: a = null,
    background: o = null,
    optionalContentConfigPromise: l = null,
    annotationCanvasMap: h = null,
    pageColors: c = null,
    printAnnotationStorage: d = null,
    isEditing: p = !1,
    recordImages: m = !1,
    recordOperations: y = !1,
    operationsFilter: A = null
  }) {
    var V, W, Mt;
    (V = this._stats) == null || V.time("Overall");
    const v = this._transport.getRenderingIntent(i, r, d, p), {
      renderingIntent: w,
      cacheKey: S
    } = v;
    f(this, Vi, !1), l || (l = this._transport.getOptionalContentConfig(w));
    const E = this._intentStates.getOrInsertComputed(S, Tb);
    E.streamReaderCancelTimeout && (clearTimeout(E.streamReaderCancelTimeout), E.streamReaderCancelTimeout = null);
    const x = !!(w & ts.PRINT);
    E.displayReadyCapability || (E.displayReadyCapability = Promise.withResolvers(), E.operatorList = {
      fnArray: [],
      argsArray: [],
      lastChunk: !1,
      separateAnnots: null
    }, (W = this._stats) == null || W.time("Page Request"), this._pumpOperatorList(v));
    const C = !!(this._pdfBug && ((Mt = globalThis.StepperManager) != null && Mt.enabled)), _ = !!e && !this.recordedBBoxes && (y || C), k = !!e && !this.imageCoordinates && m, P = (L) => {
      var B, ft, pt, me;
      if (E.renderTasks.delete(R), _) {
        const te = (B = R.gfx) == null ? void 0 : B.dependencyTracker.take();
        te && ((ft = R.stepper) == null || ft.setOperatorBBoxes(te, R.gfx.dependencyTracker.takeDebugMetadata()), y && (this.recordedBBoxes = te));
      }
      k && !L && (this.imageCoordinates = (pt = R.gfx) == null ? void 0 : pt.imagesTracker.take()), x && f(this, Vi, !0), b(this, Ua, bc).call(this), L ? (R.capability.reject(L), this._abortOperatorList({
        intentState: E,
        reason: L instanceof Error ? L : new Error(L)
      })) : R.capability.resolve(), this._stats && (this._stats.timeEnd("Rendering"), this._stats.timeEnd("Overall"), (me = globalThis.Stats) != null && me.enabled && globalThis.Stats.add(this.pageNumber, this._stats));
    };
    let M = null, I = null;
    (_ || k) && (I = new bS(e, E.operatorList.length)), _ && (M = new yS(I, C));
    const R = new Ey({
      callback: P,
      params: {
        canvas: e,
        canvasContext: t,
        dependencyTracker: M ?? I,
        imagesTracker: k ? new sy(e) : null,
        viewport: s,
        transform: a,
        background: o
      },
      objs: this.objs,
      commonObjs: this.commonObjs,
      annotationCanvasMap: h,
      operatorList: E.operatorList,
      pageIndex: this._pageIndex,
      canvasFactory: this._transport.canvasFactory,
      filterFactory: this._transport.filterFactory,
      useRequestAnimationFrame: !x,
      pdfBug: this._pdfBug,
      pageColors: c,
      enableHWA: this._transport.enableHWA,
      operationsFilter: A
    });
    (E.renderTasks || (E.renderTasks = /* @__PURE__ */ new Set())).add(R);
    const X = R.task;
    return Promise.all([E.displayReadyCapability.promise, l]).then(([L, B]) => {
      var ft;
      if (this.destroyed) {
        P();
        return;
      }
      if ((ft = this._stats) == null || ft.time("Rendering"), !(B.renderingIntent & w))
        throw new Error("Must use the same `intent`-argument when calling the `PDFPageProxy.render` and `PDFDocumentProxy.getOptionalContentConfig` methods.");
      R.initializeGraphics({
        transparency: L,
        optionalContentConfig: B
      }), R.operatorListChanged();
    }).catch(P), X;
  }
  getOperatorList({
    intent: t = "display",
    annotationMode: e = gn.ENABLE,
    printAnnotationStorage: s = null,
    isEditing: i = !1
  } = {}) {
    var h;
    function r() {
      o.operatorList.lastChunk && (o.opListReadCapability.resolve(o.operatorList), o.renderTasks.delete(l));
    }
    const a = this._transport.getRenderingIntent(t, e, s, i, !0), o = this._intentStates.getOrInsertComputed(a.cacheKey, Tb);
    let l;
    return o.opListReadCapability || (l = /* @__PURE__ */ Object.create(null), l.operatorListChanged = r, o.opListReadCapability = Promise.withResolvers(), (o.renderTasks || (o.renderTasks = /* @__PURE__ */ new Set())).add(l), o.operatorList = {
      fnArray: [],
      argsArray: [],
      lastChunk: !1,
      separateAnnots: null
    }, (h = this._stats) == null || h.time("Page Request"), this._pumpOperatorList(a)), o.opListReadCapability.promise;
  }
  streamTextContent({
    includeMarkedContent: t = !1,
    disableNormalization: e = !1
  } = {}) {
    return this._transport.messageHandler.sendWithStream("GetTextContent", {
      pageId: n(this, Ha).getPageId(this._pageIndex + 1) - 1,
      pageIndex: this._pageIndex,
      includeMarkedContent: t === !0,
      disableNormalization: e === !0
    }, {
      highWaterMark: 100,
      size(i) {
        return i.items.length;
      }
    });
  }
  async getTextContent(t = {}) {
    if (this._transport._htmlForXfa)
      return this.getXfa().then((i) => Pc.textContent(i));
    const e = this.streamTextContent(t), s = {
      items: [],
      styles: /* @__PURE__ */ Object.create(null),
      lang: null
    };
    for await (const i of e)
      s.lang ?? (s.lang = i.lang), Object.assign(s.styles, i.styles), s.items.push(...i.items);
    return s;
  }
  getStructTree() {
    return this._transport.getStructTree(this._pageIndex);
  }
  _destroy() {
    this.destroyed = !0;
    const t = [];
    for (const e of this._intentStates.values())
      if (this._abortOperatorList({
        intentState: e,
        reason: new Error("Page was destroyed."),
        force: !0
      }), !e.opListReadCapability)
        for (const s of e.renderTasks)
          t.push(s.completed), s.cancel();
    return this.objs.clear(), f(this, Vi, !1), Promise.all(t);
  }
  cleanup(t = !1) {
    f(this, Vi, !0);
    const e = b(this, Ua, bc).call(this);
    return t && e && this._stats && (this._stats = new GA()), e;
  }
  _startRenderPage(t, e) {
    var i, r;
    const s = this._intentStates.get(e);
    s && ((i = this._stats) == null || i.timeEnd("Page Request"), (r = s.displayReadyCapability) == null || r.resolve(t));
  }
  _renderPageChunk(t, e) {
    for (let s = 0, i = t.length; s < i; s++)
      e.operatorList.fnArray.push(t.fnArray[s]), e.operatorList.argsArray.push(t.argsArray[s]);
    e.operatorList.lastChunk = t.lastChunk, e.operatorList.separateAnnots = t.separateAnnots;
    for (const s of e.renderTasks)
      s.operatorListChanged();
    t.lastChunk && b(this, Ua, bc).call(this);
  }
  _pumpOperatorList({
    renderingIntent: t,
    cacheKey: e,
    annotationStorageSerializable: s,
    modifiedIds: i
  }) {
    const {
      map: r,
      transfer: a
    } = s, l = this._transport.messageHandler.sendWithStream("GetOperatorList", {
      pageId: n(this, Ha).getPageId(this._pageIndex + 1) - 1,
      pageIndex: this._pageIndex,
      intent: t,
      cacheKey: e,
      annotationStorage: r,
      modifiedIds: i
    }, void 0, a).getReader(), h = this._intentStates.get(e);
    h.streamReader = l;
    const c = () => {
      l.read().then(({
        value: d,
        done: p
      }) => {
        if (p) {
          h.streamReader = null;
          return;
        }
        this._transport.destroyed || (this._renderPageChunk(d, h), c());
      }, (d) => {
        if (h.streamReader = null, !this._transport.destroyed) {
          if (h.operatorList) {
            h.operatorList.lastChunk = !0;
            for (const p of h.renderTasks)
              p.operatorListChanged();
            b(this, Ua, bc).call(this);
          }
          if (h.displayReadyCapability)
            h.displayReadyCapability.reject(d);
          else if (h.opListReadCapability)
            h.opListReadCapability.reject(d);
          else
            throw d;
        }
      });
    };
    c();
  }
  _abortOperatorList({
    intentState: t,
    reason: e,
    force: s = !1
  }) {
    if (t.streamReader) {
      if (t.streamReaderCancelTimeout && (clearTimeout(t.streamReaderCancelTimeout), t.streamReaderCancelTimeout = null), !s) {
        if (t.renderTasks.size > 0)
          return;
        if (e instanceof SA) {
          let i = SE;
          e.extraDelay > 0 && e.extraDelay < 1e3 && (i += e.extraDelay), t.streamReaderCancelTimeout = setTimeout(() => {
            t.streamReaderCancelTimeout = null, this._abortOperatorList({
              intentState: t,
              reason: e,
              force: !0
            });
          }, i);
          return;
        }
      }
      if (t.streamReader.cancel(new Er(e.message)).catch(() => {
      }), t.streamReader = null, !this._transport.destroyed) {
        for (const [i, r] of this._intentStates)
          if (r === t) {
            this._intentStates.delete(i);
            break;
          }
        this.cleanup();
      }
    }
  }
  get stats() {
    return this._stats;
  }
};
Vi = new WeakMap(), Ha = new WeakMap(), Ua = new WeakSet(), bc = function() {
  if (!n(this, Vi) || this.destroyed)
    return !1;
  for (const {
    renderTasks: t,
    operatorList: e
  } of this._intentStates.values())
    if (t.size > 0 || !e.lastChunk)
      return !1;
  return this._intentStates.clear(), this.objs.clear(), f(this, Vi, !1), !0;
};
let Sy = OA;
var Qn, Ds, ji, Ga, Zg, $a, za, Xl, hp, tm, Gw, em, $w, Va, yc, Yl, cp;
const _t = class _t {
  constructor({
    name: t = null,
    port: e = null,
    verbosity: s = Xv()
  } = {}) {
    u(this, Xl);
    u(this, tm);
    u(this, em);
    u(this, Va);
    u(this, Qn, Promise.withResolvers());
    u(this, Ds, null);
    u(this, ji, null);
    u(this, Ga, null);
    if (this.name = t, this.destroyed = !1, this.verbosity = s, e) {
      if (n(_t, za).has(e))
        throw new Error("Cannot use more than one PDFWorker per port.");
      n(_t, za).set(e, this), b(this, tm, Gw).call(this, e);
    } else
      b(this, em, $w).call(this);
  }
  get promise() {
    return n(this, Qn).promise;
  }
  get port() {
    return n(this, ji);
  }
  get messageHandler() {
    return n(this, Ds);
  }
  destroy() {
    var t, e;
    this.destroyed = !0, (t = n(this, Ga)) == null || t.terminate(), f(this, Ga, null), n(_t, za).delete(n(this, ji)), f(this, ji, null), (e = n(this, Ds)) == null || e.destroy(), f(this, Ds, null);
  }
  static create(t) {
    const e = n(this, za).get(t == null ? void 0 : t.port);
    if (e) {
      if (e._pendingDestroy)
        throw new Error("PDFWorker.create - the worker is being destroyed.\nPlease remember to await `PDFDocumentLoadingTask.destroy()`-calls.");
      return e;
    }
    return new _t(t);
  }
  static get workerSrc() {
    if (un.workerSrc)
      return un.workerSrc;
    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }
  static get _setupFakeWorkerGlobal() {
    return H(this, "_setupFakeWorkerGlobal", (async () => n(this, Yl, cp) ? n(this, Yl, cp) : (await import(
      /*webpackIgnore: true*/
      /*@vite-ignore*/
      this.workerSrc
    )).WorkerMessageHandler)());
  }
};
Qn = new WeakMap(), Ds = new WeakMap(), ji = new WeakMap(), Ga = new WeakMap(), Zg = new WeakMap(), $a = new WeakMap(), za = new WeakMap(), Xl = new WeakSet(), hp = function() {
  n(this, Qn).resolve(), n(this, Ds).send("configure", {
    verbosity: this.verbosity
  });
}, tm = new WeakSet(), Gw = function(t) {
  f(this, ji, t), f(this, Ds, new dc("main", "worker", t)), n(this, Ds).on("ready", () => {
  }), b(this, Xl, hp).call(this);
}, em = new WeakSet(), $w = function() {
  if (n(_t, $a) || n(_t, Yl, cp)) {
    b(this, Va, yc).call(this);
    return;
  }
  let {
    workerSrc: t
  } = _t;
  try {
    _t._isSameOrigin(window.location, t) || (t = _t._createCDNWrapper(new URL(t, window.location).href));
    const e = new Worker(t, {
      type: "module"
    }), s = new dc("main", "worker", e), i = () => {
      r.abort(), s.destroy(), e.terminate(), this.destroyed ? n(this, Qn).reject(new Error("Worker was destroyed")) : b(this, Va, yc).call(this);
    }, r = new AbortController();
    e.addEventListener("error", () => {
      n(this, Ga) || i();
    }, {
      signal: r.signal
    }), s.on("test", (o) => {
      if (r.abort(), this.destroyed || !o) {
        i();
        return;
      }
      f(this, Ds, s), f(this, ji, e), f(this, Ga, e), b(this, Xl, hp).call(this);
    }), s.on("ready", (o) => {
      if (r.abort(), this.destroyed) {
        i();
        return;
      }
      try {
        a();
      } catch {
        b(this, Va, yc).call(this);
      }
    });
    const a = () => {
      const o = new Uint8Array();
      s.send("test", o, [o.buffer]);
    };
    a();
    return;
  } catch {
    Zm("The worker has been disabled.");
  }
  b(this, Va, yc).call(this);
}, Va = new WeakSet(), yc = function() {
  n(_t, $a) || ($("Setting up fake worker."), f(_t, $a, !0)), _t._setupFakeWorkerGlobal.then((t) => {
    if (this.destroyed) {
      n(this, Qn).reject(new Error("Worker was destroyed"));
      return;
    }
    const e = new DS();
    f(this, ji, e);
    const s = `fake${At(_t, Zg)._++}`, i = new dc(s + "_worker", s, e);
    t.setup(i, e), f(this, Ds, new dc(s, s + "_worker", e)), b(this, Xl, hp).call(this);
  }).catch((t) => {
    n(this, Qn).reject(new Error(`Setting up fake worker failed: "${t.message}".`));
  });
}, Yl = new WeakSet(), cp = function() {
  var t;
  try {
    return ((t = globalThis.pdfjsWorker) == null ? void 0 : t.WorkerMessageHandler) || null;
  } catch {
    return null;
  }
}, u(_t, Yl), u(_t, Zg, 0), u(_t, $a, !1), u(_t, za, /* @__PURE__ */ new WeakMap()), es && (f(_t, $a, !0), un.workerSrc || (un.workerSrc = "./pdf.worker.mjs")), _t._isSameOrigin = (t, e) => {
  const s = URL.parse(t);
  if (!(s != null && s.origin) || s.origin === "null")
    return !1;
  const i = new URL(e, s);
  return s.origin === i.origin;
}, _t._createCDNWrapper = (t) => {
  const e = `await import("${t}");`;
  return URL.createObjectURL(new Blob([e], {
    type: "text/javascript"
  }));
};
let Lc = _t;
var ze, ja, Wi, Is, Wa, Kl, Xi, Jn, No, ql, dp;
class CE {
  constructor(t, e, s, i, r, a) {
    u(this, Jn);
    u(this, ql);
    T(this, "downloadInfoCapability", Promise.withResolvers());
    u(this, ze, null);
    u(this, ja, /* @__PURE__ */ new Map());
    u(this, Wi, null);
    u(this, Is, /* @__PURE__ */ new Map());
    u(this, Wa, /* @__PURE__ */ new Map());
    u(this, Kl, /* @__PURE__ */ new Map());
    u(this, Xi, null);
    this.messageHandler = t, this.loadingTask = e, f(this, Wi, s), this.commonObjs = new Rw(), this.fontLoader = new wS({
      ownerDocument: i.ownerDocument,
      styleElement: i.styleElement
    }), this.enableHWA = i.enableHWA, this.loadingParams = i.loadingParams, this._params = i, this.canvasFactory = r.canvasFactory, this.filterFactory = r.filterFactory, this.binaryDataFactory = r.binaryDataFactory, this.pagesMapper = a, this.destroyed = !1, this.destroyCapability = null, this.setupMessageHandler();
  }
  updatePage(t) {
    const {
      _pageIndex: e
    } = t;
    n(this, Is).set(e, t), n(this, Wa).set(e, Promise.resolve(t));
  }
  get annotationStorage() {
    return H(this, "annotationStorage", new xA());
  }
  getRenderingIntent(t, e = gn.ENABLE, s = null, i = !1, r = !1) {
    let a = ts.DISPLAY, o = Mc;
    switch (t) {
      case "any":
        a = ts.ANY;
        break;
      case "display":
        break;
      case "print":
        a = ts.PRINT;
        break;
      default:
        $(`getRenderingIntent - invalid intent: ${t}`);
    }
    const l = a & ts.PRINT && s instanceof iw ? s : this.annotationStorage;
    switch (e) {
      case gn.DISABLE:
        a += ts.ANNOTATIONS_DISABLE;
        break;
      case gn.ENABLE:
        break;
      case gn.ENABLE_FORMS:
        a += ts.ANNOTATIONS_FORMS;
        break;
      case gn.ENABLE_STORAGE:
        a += ts.ANNOTATIONS_STORAGE, o = l.serializable;
        break;
      default:
        $(`getRenderingIntent - invalid annotationMode: ${e}`);
    }
    i && (a += ts.IS_EDITING), r && (a += ts.OPLIST);
    const {
      ids: h,
      hash: c
    } = l.modifiedIds, d = [a, o.hash, c];
    return {
      renderingIntent: a,
      cacheKey: d.join("_"),
      annotationStorageSerializable: o,
      modifiedIds: h
    };
  }
  destroy() {
    var s;
    if (this.destroyCapability)
      return this.destroyCapability.promise;
    this.destroyed = !0, this.destroyCapability = Promise.withResolvers(), (s = n(this, Xi)) == null || s.reject(new Error("Worker was destroyed during onPassword callback"));
    const t = [];
    for (const i of n(this, Is).values())
      t.push(i._destroy());
    n(this, Is).clear(), n(this, Wa).clear(), n(this, Kl).clear(), Object.hasOwn(this, "annotationStorage") && this.annotationStorage.resetModified();
    const e = this.messageHandler.sendWithPromise("Terminate", null);
    return t.push(e), Promise.all(t).then(() => {
      var i, r;
      this.commonObjs.clear(), this.fontLoader.clear(), n(this, ja).clear(), this.filterFactory.destroy(), Ic.cleanup(), (i = n(this, Wi)) == null || i.cancelAllRequests(new Er("Worker was terminated.")), (r = this.messageHandler) == null || r.destroy(), this.messageHandler = null, this.destroyCapability.resolve();
    }, this.destroyCapability.reject), this.destroyCapability.promise;
  }
  setupMessageHandler() {
    const {
      messageHandler: t,
      loadingTask: e
    } = this;
    t.on("GetReader", (s, i) => {
      Ct(n(this, Wi), "GetReader - no `BasePDFStream` instance available."), f(this, ze, n(this, Wi).getFullReader()), n(this, ze).onProgress = (r) => b(this, ql, dp).call(this, r), i.onPull = () => {
        n(this, ze).read().then(function({
          value: r,
          done: a
        }) {
          if (a) {
            i.close();
            return;
          }
          Ct(r instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer."), i.enqueue(new Uint8Array(r), 1, [r]);
        }).catch((r) => {
          i.error(r);
        });
      }, i.onCancel = (r) => {
        n(this, ze).cancel(r), i.ready.catch((a) => {
          if (!this.destroyed)
            throw a;
        });
      };
    }), t.on("ReaderHeadersReady", async (s) => {
      await n(this, ze).headersReady;
      const {
        isStreamingSupported: i,
        isRangeSupported: r,
        contentLength: a
      } = n(this, ze);
      return i && r && (n(this, ze).onProgress = null), {
        isStreamingSupported: i,
        isRangeSupported: r,
        contentLength: a
      };
    }), t.on("GetRangeReader", (s, i) => {
      Ct(n(this, Wi), "GetRangeReader - no `BasePDFStream` instance available.");
      const r = n(this, Wi).getRangeReader(s.begin, s.end);
      if (!r) {
        i.close();
        return;
      }
      i.onPull = () => {
        r.read().then(function({
          value: a,
          done: o
        }) {
          if (o) {
            i.close();
            return;
          }
          Ct(a instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer."), i.enqueue(new Uint8Array(a), 1, [a]);
        }).catch((a) => {
          i.error(a);
        });
      }, i.onCancel = (a) => {
        r.cancel(a), i.ready.catch((o) => {
          if (!this.destroyed)
            throw o;
        });
      };
    }), t.on("GetDoc", ({
      pdfInfo: s
    }) => {
      this.pagesMapper.pagesNumber = s.numPages, this._numPages = s.numPages, this._htmlForXfa = s.htmlForXfa, delete s.htmlForXfa, e._capability.resolve(new xE(s, this));
    }), t.on("DocException", (s) => {
      e._capability.reject(ke(s));
    }), t.on("PasswordRequest", (s) => {
      f(this, Xi, Promise.withResolvers());
      try {
        if (!e.onPassword)
          throw ke(s);
        const i = (r) => {
          r instanceof Error ? n(this, Xi).reject(r) : n(this, Xi).resolve({
            password: r
          });
        };
        e.onPassword(i, s.code);
      } catch (i) {
        n(this, Xi).reject(i);
      }
      return n(this, Xi).promise;
    }), t.on("DataLoaded", (s) => {
      b(this, ql, dp).call(this, {
        loaded: s.length,
        total: s.length
      }), this.downloadInfoCapability.resolve(s);
    }), t.on("StartRenderPage", (s) => {
      if (this.destroyed)
        return;
      n(this, Is).get(s.pageIndex)._startRenderPage(s.transparency, s.cacheKey);
    }), t.on("commonobj", ([s, i, r]) => {
      var a;
      if (this.destroyed || this.commonObjs.has(s))
        return null;
      switch (i) {
        case "Font":
          if ("error" in r) {
            const p = r.error;
            $(`Error during font loading: ${p}`), this.commonObjs.resolve(s, p);
            break;
          }
          const o = new xS(r), l = this._params.pdfBug && ((a = globalThis.FontInspector) != null && a.enabled) ? (p, m) => globalThis.FontInspector.fontAdded(p, m) : null, h = new vS(o, l, r.charProcOperatorList, r.extra);
          this.fontLoader.bind(h).catch(() => t.sendWithPromise("FontFallback", {
            id: s
          })).finally(() => {
            h.fontExtraProperties || h.clearData(), this.commonObjs.resolve(s, h);
          });
          break;
        case "CopyLocalImage":
          const {
            imageRef: c
          } = r;
          Ct(c, "The imageRef must be defined.");
          for (const p of n(this, Is).values())
            for (const [, m] of p.objs) {
              if ((m == null ? void 0 : m.ref) !== c)
                continue;
              if (!m.dataLen)
                return null;
              const y = structuredClone(m);
              return this.commonObjs.resolve(s, y), m.dataLen;
            }
          break;
        case "FontPath":
          this.commonObjs.resolve(s, new _S(r));
          break;
        case "Image":
          this.commonObjs.resolve(s, r);
          break;
        case "Pattern":
          const d = new CS(r);
          this.commonObjs.resolve(s, d.getIR());
          break;
        default:
          throw new Error(`Got unknown common object type ${i}`);
      }
      return null;
    }), t.on("obj", ([s, i, r, a]) => {
      var l;
      if (this.destroyed)
        return;
      const o = n(this, Is).get(i);
      if (!o.objs.has(s)) {
        if (o._intentStates.size === 0) {
          (l = a == null ? void 0 : a.bitmap) == null || l.close();
          return;
        }
        switch (r) {
          case "Image":
          case "Pattern":
            o.objs.resolve(s, a);
            break;
          default:
            throw new Error(`Got unknown object type ${r}`);
        }
      }
    }), t.on("DocProgress", (s) => {
      this.destroyed || b(this, ql, dp).call(this, s);
    }), t.on("FetchBinaryData", async (s) => {
      if (this.destroyed)
        throw new Error("Worker was destroyed.");
      if (!this.binaryDataFactory)
        throw new Error("`BinaryDataFactory` not initialized, see the `useWorkerFetch` parameter.");
      return this.binaryDataFactory.fetch(s);
    });
  }
  getData() {
    return this.messageHandler.sendWithPromise("GetData", null);
  }
  saveDocument() {
    var s;
    this.annotationStorage.size <= 0 && $("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
    const {
      map: t,
      transfer: e
    } = this.annotationStorage.serializable;
    return this.messageHandler.sendWithPromise("SaveDocument", {
      isPureXfa: !!this._htmlForXfa,
      numPages: this._numPages,
      annotationStorage: t,
      filename: ((s = n(this, ze)) == null ? void 0 : s.filename) ?? null
    }, e).finally(() => {
      this.annotationStorage.resetModified();
    });
  }
  extractPages(t, e = null) {
    var a;
    const s = {
      pageInfos: t
    };
    let i;
    const r = globalThis.ImageBitmap;
    if (typeof r == "function") {
      const o = Array.isArray(t) ? t : [t];
      for (const l of o)
        (l == null ? void 0 : l.image) instanceof r && (i || (i = [])).push(l.image);
    }
    if (this.annotationStorage.size > 0) {
      const o = this.annotationStorage.serializable;
      let {
        map: l
      } = o;
      (a = o.transfer) != null && a.length && (i ? i.push(...o.transfer) : i = o.transfer);
      const h = this.pagesMapper.getMapping();
      if (h) {
        const c = /* @__PURE__ */ new Map();
        for (const [d, p] of l) {
          if ((p == null ? void 0 : p.pageIndex) !== void 0 && p.pageIndex >= 0 && p.pageIndex < h.length) {
            const m = (e == null ? void 0 : e[p.pageIndex]) ?? 0, y = h[p.pageIndex] - 1;
            if (y !== p.pageIndex || m !== 0) {
              c.set(d, {
                ...p,
                pageIndex: y,
                copyLevel: m
              });
              continue;
            }
          }
          c.set(d, p);
        }
        l = c;
      }
      s.annotationStorage = l;
    }
    return this.messageHandler.sendWithPromise("ExtractPages", s, i).finally(() => {
      this.annotationStorage.resetModified();
    });
  }
  getPage(t) {
    if (!Number.isInteger(t) || t <= 0 || t > this.pagesMapper.pagesNumber)
      return Promise.reject(new Error("Invalid page request."));
    const e = t - 1, s = this.pagesMapper.getPageId(t) - 1, i = n(this, Wa).get(e);
    if (i)
      return i;
    const r = this.messageHandler.sendWithPromise("GetPage", {
      pageIndex: s
    }).then((a) => {
      if (this.destroyed)
        throw new Error("Transport destroyed");
      a.refStr && n(this, Kl).set(a.refStr, s);
      const o = new Sy(e, a, this, this.pagesMapper, this._params.pdfBug);
      return n(this, Is).set(e, o), o;
    });
    return n(this, Wa).set(e, r), r;
  }
  async getPageIndex(t) {
    if (!ny(t))
      throw new Error("Invalid pageIndex request.");
    const e = await this.messageHandler.sendWithPromise("GetPageIndex", {
      num: t.num,
      gen: t.gen
    }), s = this.pagesMapper.getPageNumber(e + 1);
    if (s === 0)
      throw new Error("GetPageIndex: page has been removed.");
    return s - 1;
  }
  getAnnotations(t, e) {
    return this.messageHandler.sendWithPromise("GetAnnotations", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1,
      intent: e
    });
  }
  getFieldObjects() {
    return b(this, Jn, No).call(this, "GetFieldObjects");
  }
  getSignatures() {
    return b(this, Jn, No).call(this, "GetSignatures");
  }
  getSignatureData(t) {
    return this.messageHandler.sendWithPromise("GetSignatureData", t);
  }
  hasJSActions() {
    return b(this, Jn, No).call(this, "HasJSActions");
  }
  getCalculationOrderIds() {
    return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
  }
  getDestinations() {
    return this.messageHandler.sendWithPromise("GetDestinations", null);
  }
  getDestination(t) {
    return typeof t != "string" ? Promise.reject(new Error("Invalid destination request.")) : this.messageHandler.sendWithPromise("GetDestination", {
      id: t
    });
  }
  getPageLabels() {
    return this.messageHandler.sendWithPromise("GetPageLabels", null);
  }
  getPageLayout() {
    return this.messageHandler.sendWithPromise("GetPageLayout", null);
  }
  getPageMode() {
    return this.messageHandler.sendWithPromise("GetPageMode", null);
  }
  getViewerPreferences() {
    return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
  }
  getOpenAction() {
    return this.messageHandler.sendWithPromise("GetOpenAction", null);
  }
  getAttachments() {
    return this.messageHandler.sendWithPromise("GetAttachments", null);
  }
  getAttachmentContent(t) {
    return this.messageHandler.sendWithPromise("GetAttachmentContent", t);
  }
  getAnnotationsByType(t, e) {
    return this.messageHandler.sendWithPromise("GetAnnotationsByType", {
      types: t,
      pageIndexesToSkip: e
    });
  }
  getDocJSActions() {
    return b(this, Jn, No).call(this, "GetDocJSActions");
  }
  getPageJSActions(t) {
    return this.messageHandler.sendWithPromise("GetPageJSActions", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1
    });
  }
  getStructTree(t) {
    return this.messageHandler.sendWithPromise("GetStructTree", {
      pageIndex: this.pagesMapper.getPageId(t + 1) - 1
    });
  }
  getOutline() {
    return this.messageHandler.sendWithPromise("GetOutline", null);
  }
  getOptionalContentConfig(t) {
    return b(this, Jn, No).call(this, "GetOptionalContentConfig").then((e) => new gy(e, t));
  }
  getPermissions() {
    return this.messageHandler.sendWithPromise("GetPermissions", null);
  }
  getMetadata() {
    const t = "GetMetadata";
    return n(this, ja).getOrInsertComputed(t, () => this.messageHandler.sendWithPromise(t, null).then((e) => {
      var s, i;
      return {
        info: e[0],
        metadata: e[1] ? new yE(e[1]) : null,
        contentDispositionFilename: ((s = n(this, ze)) == null ? void 0 : s.filename) ?? null,
        contentLength: ((i = n(this, ze)) == null ? void 0 : i.contentLength) ?? null,
        hasStructTree: e[2]
      };
    }));
  }
  getMarkInfo() {
    return this.messageHandler.sendWithPromise("GetMarkInfo", null);
  }
  async startCleanup(t = !1) {
    if (!this.destroyed) {
      await this.messageHandler.sendWithPromise("Cleanup", null);
      for (const e of n(this, Is).values())
        if (!e.cleanup())
          throw new Error(`startCleanup: Page ${e.pageNumber} is currently rendering.`);
      this.commonObjs.clear(), t || this.fontLoader.clear(), n(this, ja).clear(), this.filterFactory.destroy(!0), Ic.cleanup();
    }
  }
  cachedPageNumber(t) {
    if (!ny(t))
      return null;
    const e = t.gen === 0 ? `${t.num}R` : `${t.num}R${t.gen}`, s = n(this, Kl).get(e);
    if (s >= 0) {
      const i = this.pagesMapper.getPageNumber(s + 1);
      if (i !== 0)
        return i;
    }
    return null;
  }
}
ze = new WeakMap(), ja = new WeakMap(), Wi = new WeakMap(), Is = new WeakMap(), Wa = new WeakMap(), Kl = new WeakMap(), Xi = new WeakMap(), Jn = new WeakSet(), No = function(t, e = null) {
  return n(this, ja).getOrInsertComputed(t, () => this.messageHandler.sendWithPromise(t, e));
}, ql = new WeakSet(), dp = function({
  loaded: t,
  total: e
}) {
  var s, i;
  (i = (s = this.loadingTask).onProgress) == null || i.call(s, {
    loaded: t,
    total: e,
    percent: e ? ut(Math.round(t / e * 100), 0, 100) : NaN
  });
};
class _E {
  constructor(t) {
    T(this, "_internalRenderTask", null);
    T(this, "onContinue", null);
    T(this, "onError", null);
    this._internalRenderTask = t;
  }
  get promise() {
    return this._internalRenderTask.capability.promise;
  }
  cancel(t = 0) {
    this._internalRenderTask.cancel(null, t);
  }
  get separateAnnots() {
    const {
      separateAnnots: t
    } = this._internalRenderTask.operatorList;
    if (!t)
      return !1;
    const {
      annotationCanvasMap: e
    } = this._internalRenderTask;
    return t.form || t.canvas && (e == null ? void 0 : e.size) > 0;
  }
  get imageCoordinates() {
    return this._internalRenderTask.imageCoordinates || null;
  }
}
var Zn, Xa;
const Lr = class Lr {
  constructor({
    callback: t,
    params: e,
    objs: s,
    commonObjs: i,
    annotationCanvasMap: r,
    operatorList: a,
    pageIndex: o,
    canvasFactory: l,
    filterFactory: h,
    useRequestAnimationFrame: c = !1,
    pdfBug: d = !1,
    pageColors: p = null,
    enableHWA: m = !1,
    operationsFilter: y = null
  }) {
    u(this, Zn, null);
    this.callback = t, this.params = e, this.objs = s, this.commonObjs = i, this.annotationCanvasMap = r, this.operatorListIdx = null, this.operatorList = a, this._pageIndex = o, this.canvasFactory = l, this.filterFactory = h, this._pdfBug = d, this.pageColors = p, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this._useRequestAnimationFrame = c === !0 && typeof window < "u", this.cancelled = !1, this.capability = Promise.withResolvers(), this.task = new _E(this), this._cancelBound = this.cancel.bind(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = e.canvas, this._canvasContext = e.canvas ? null : e.canvasContext, this._enableHWA = m, this._dependencyTracker = e.dependencyTracker, this._imagesTracker = e.imagesTracker, this._operationsFilter = y;
  }
  get completed() {
    return this.capability.promise.catch(function() {
    });
  }
  initializeGraphics({
    transparency: t = !1,
    optionalContentConfig: e
  }) {
    var h, c;
    if (this.cancelled)
      return;
    if (this._canvas) {
      if (n(Lr, Xa).has(this._canvas))
        throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
      n(Lr, Xa).add(this._canvas);
    }
    this._pdfBug && ((h = globalThis.StepperManager) != null && h.enabled) && (this.stepper = globalThis.StepperManager.create(this._pageIndex), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
    const {
      viewport: s,
      transform: i,
      background: r,
      dependencyTracker: a,
      imagesTracker: o
    } = this.params, l = this._canvasContext || this._canvas.getContext("2d", {
      alpha: !1,
      willReadFrequently: !this._enableHWA
    });
    this.gfx = new $o(l, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
      optionalContentConfig: e
    }, this.annotationCanvasMap, this.pageColors, a, o), this.gfx.beginDrawing({
      transform: i,
      viewport: s,
      transparency: t,
      background: r
    }), this.operatorListIdx = 0, this.graphicsReady = !0, (c = this.graphicsReadyCallback) == null || c.call(this);
  }
  cancel(t = null, e = 0) {
    var s, i, r;
    this.running = !1, this.cancelled = !0, (s = this.gfx) == null || s.endDrawing(), n(this, Zn) && (window.cancelAnimationFrame(n(this, Zn)), f(this, Zn, null)), n(Lr, Xa).delete(this._canvas), t || (t = new SA(`Rendering cancelled, page ${this._pageIndex + 1}`, e)), this.callback(t), (r = (i = this.task).onError) == null || r.call(i, t);
  }
  operatorListChanged() {
    var t, e;
    if (!this.graphicsReady) {
      this.graphicsReadyCallback || (this.graphicsReadyCallback = this._continueBound);
      return;
    }
    (t = this.gfx.dependencyTracker) == null || t.growOperationsCount(this.operatorList.fnArray.length), (e = this.stepper) == null || e.updateOperatorList(this.operatorList), !this.running && this._continue();
  }
  _continue() {
    this.running = !0, !this.cancelled && (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext());
  }
  _scheduleNext() {
    this._useRequestAnimationFrame ? f(this, Zn, window.requestAnimationFrame(() => {
      f(this, Zn, null), this._nextBound().catch(this._cancelBound);
    })) : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
  }
  async _next() {
    this.cancelled || (this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper, this._operationsFilter), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), n(Lr, Xa).delete(this._canvas), this.callback())));
  }
};
Zn = new WeakMap(), Xa = new WeakMap(), u(Lr, Xa, /* @__PURE__ */ new WeakSet());
let Ey = Lr;
const TE = "6.3.289", kE = "1c8020a7d";
var Ve, Ya, Ql, zt, pu, Jl, Yi, gu, tr, Ls, mu, bu, xy, yu, Cy, Au, _y, Ki, Pr, sm, zw, ci, pn;
const Pe = class Pe {
  constructor({
    editor: t = null,
    uiManager: e = null
  }) {
    u(this, bu);
    u(this, yu);
    u(this, Au);
    u(this, Ki);
    u(this, sm);
    u(this, ci);
    u(this, Ve, null);
    u(this, Ya, null);
    u(this, Ql, void 0);
    u(this, zt, null);
    u(this, pu, !1);
    u(this, Jl, !1);
    u(this, Yi, null);
    u(this, gu, void 0);
    u(this, tr, null);
    u(this, Ls, null);
    var s, i;
    t ? (f(this, Jl, !1), f(this, Yi, t)) : f(this, Jl, !0), f(this, Ls, (t == null ? void 0 : t._uiManager) || e), f(this, gu, n(this, Ls)._eventBus), f(this, Ql, ((s = t == null ? void 0 : t.color) == null ? void 0 : s.toUpperCase()) || ((i = n(this, Ls)) == null ? void 0 : i.highlightColors.values().next().value) || "#FFFF98"), n(Pe, mu) || f(Pe, mu, Object.freeze({
      blue: "pdfjs-editor-colorpicker-blue",
      green: "pdfjs-editor-colorpicker-green",
      pink: "pdfjs-editor-colorpicker-pink",
      red: "pdfjs-editor-colorpicker-red",
      yellow: "pdfjs-editor-colorpicker-yellow"
    }));
  }
  static get _keyboardManager() {
    return H(this, "_keyboardManager", new ko([[["Escape"], Pe.prototype._hideDropdownFromKeyboard], [["Space"], Pe.prototype._colorSelectFromKeyboard], [["ArrowDown", "ArrowRight"], Pe.prototype._moveToNext], [["ArrowUp", "ArrowLeft"], Pe.prototype._moveToPrevious], [["Home"], Pe.prototype._moveToBeginning], [["End"], Pe.prototype._moveToEnd]]));
  }
  renderButton() {
    const t = f(this, Ve, document.createElement("button"));
    t.className = "colorPicker", t.tabIndex = "0", t.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button"), t.ariaHasPopup = "true", n(this, Yi) && (t.ariaControls = `${n(this, Yi).id}_colorpicker_dropdown`);
    const e = n(this, Ls)._signal;
    t.addEventListener("click", b(this, Ki, Pr).bind(this), {
      signal: e
    }), t.addEventListener("keydown", b(this, Au, _y).bind(this), {
      signal: e
    });
    const s = f(this, Ya, document.createElement("span"));
    return s.className = "swatch", s.ariaHidden = "true", s.style.backgroundColor = n(this, Ql), t.append(s), t;
  }
  renderMainDropdown() {
    const t = f(this, zt, b(this, bu, xy).call(this));
    return t.ariaOrientation = "horizontal", t.ariaLabelledBy = "highlightColorPickerLabel", t;
  }
  _colorSelectFromKeyboard(t) {
    if (t.target === n(this, Ve)) {
      b(this, Ki, Pr).call(this, t);
      return;
    }
    const e = t.target.getAttribute("data-color");
    e && b(this, yu, Cy).call(this, e, t);
  }
  _moveToNext(t) {
    var e, s;
    if (!n(this, ci, pn)) {
      b(this, Ki, Pr).call(this, t);
      return;
    }
    if (t.target === n(this, Ve)) {
      (e = n(this, zt).firstElementChild) == null || e.focus();
      return;
    }
    (s = t.target.nextSibling) == null || s.focus();
  }
  _moveToPrevious(t) {
    var e, s;
    if (t.target === ((e = n(this, zt)) == null ? void 0 : e.firstElementChild) || t.target === n(this, Ve)) {
      n(this, ci, pn) && this._hideDropdownFromKeyboard();
      return;
    }
    n(this, ci, pn) || b(this, Ki, Pr).call(this, t), (s = t.target.previousSibling) == null || s.focus();
  }
  _moveToBeginning(t) {
    var e;
    if (!n(this, ci, pn)) {
      b(this, Ki, Pr).call(this, t);
      return;
    }
    (e = n(this, zt).firstElementChild) == null || e.focus();
  }
  _moveToEnd(t) {
    var e;
    if (!n(this, ci, pn)) {
      b(this, Ki, Pr).call(this, t);
      return;
    }
    (e = n(this, zt).lastElementChild) == null || e.focus();
  }
  hideDropdown() {
    var t, e;
    (t = n(this, zt)) == null || t.classList.add("hidden"), n(this, Ve).ariaExpanded = "false", (e = n(this, tr)) == null || e.abort(), f(this, tr, null);
  }
  _hideDropdownFromKeyboard() {
    var t;
    if (!n(this, Jl)) {
      if (!n(this, ci, pn)) {
        (t = n(this, Yi)) == null || t.unselect();
        return;
      }
      this.hideDropdown(), n(this, Ve).focus({
        preventScroll: !0,
        focusVisible: n(this, pu)
      });
    }
  }
  update(t) {
    if (n(this, Ya) && (n(this, Ya).style.backgroundColor = t), !n(this, zt))
      return;
    const e = n(this, Ls).highlightColors.values();
    for (const s of n(this, zt).children)
      s.ariaSelected = e.next().value === t.toUpperCase();
  }
  destroy() {
    var t, e;
    (t = n(this, Ve)) == null || t.remove(), f(this, Ve, null), f(this, Ya, null), (e = n(this, zt)) == null || e.remove(), f(this, zt, null);
  }
};
Ve = new WeakMap(), Ya = new WeakMap(), Ql = new WeakMap(), zt = new WeakMap(), pu = new WeakMap(), Jl = new WeakMap(), Yi = new WeakMap(), gu = new WeakMap(), tr = new WeakMap(), Ls = new WeakMap(), mu = new WeakMap(), bu = new WeakSet(), xy = function() {
  const t = document.createElement("div"), e = n(this, Ls)._signal;
  t.addEventListener("contextmenu", Us, {
    signal: e
  }), t.className = "dropdown", t.role = "listbox", t.ariaMultiSelectable = "false", t.ariaOrientation = "vertical", t.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown"), n(this, Yi) && (t.id = `${n(this, Yi).id}_colorpicker_dropdown`);
  for (const [s, i] of n(this, Ls).highlightColors) {
    const r = document.createElement("button");
    r.tabIndex = "0", r.role = "option", r.setAttribute("data-color", i), r.title = s, r.setAttribute("data-l10n-id", n(Pe, mu)[s]);
    const a = document.createElement("span");
    r.append(a), a.className = "swatch", a.style.backgroundColor = i, r.ariaSelected = i === n(this, Ql), r.addEventListener("click", b(this, yu, Cy).bind(this, i), {
      signal: e
    }), t.append(r);
  }
  return t.addEventListener("keydown", b(this, Au, _y).bind(this), {
    signal: e
  }), t;
}, yu = new WeakSet(), Cy = function(t, e) {
  e.stopPropagation(), n(this, gu).dispatch("switchannotationeditorparams", {
    source: this,
    type: Y.HIGHLIGHT_COLOR,
    value: t
  }), this.update(t);
}, Au = new WeakSet(), _y = function(t) {
  Pe._keyboardManager.exec(this, t);
}, Ki = new WeakSet(), Pr = function(t) {
  if (n(this, ci, pn)) {
    this.hideDropdown();
    return;
  }
  if (f(this, pu, t.detail === 0), n(this, tr) || (f(this, tr, new AbortController()), window.addEventListener("pointerdown", b(this, sm, zw).bind(this), {
    signal: n(this, Ls).combinedSignal(n(this, tr))
  })), n(this, Ve).ariaExpanded = "true", n(this, zt)) {
    n(this, zt).classList.remove("hidden");
    return;
  }
  const e = f(this, zt, b(this, bu, xy).call(this));
  n(this, Ve).append(e);
}, sm = new WeakSet(), zw = function(t) {
  var e;
  (e = n(this, zt)) != null && e.contains(t.target) || this.hideDropdown();
}, ci = new WeakSet(), pn = function() {
  return n(this, zt) && !n(this, zt).classList.contains("hidden");
}, u(Pe, mu, null);
let Np = Pe;
var je, Zl, Ka, qi, wu;
const Fr = class Fr {
  constructor(t) {
    u(this, je, null);
    u(this, Zl, !1);
    u(this, Ka, null);
    u(this, qi, null);
    f(this, Ka, t), f(this, qi, t._uiManager), n(Fr, wu) || f(Fr, wu, Object.freeze({
      freetext: "pdfjs-editor-color-picker-free-text-input",
      ink: "pdfjs-editor-color-picker-ink-input"
    }));
  }
  renderButton() {
    if (n(this, je))
      return n(this, je);
    const {
      editorType: t,
      colorType: e,
      colorAndOpacityType: s,
      opacityType: i,
      color: r,
      opacity: a
    } = n(this, Ka), o = f(this, Zl, rt.isAlphaColorInputSupported && i !== void 0), l = f(this, je, document.createElement("input"));
    if (l.type = "color", o) {
      l.setAttribute("alpha", "");
      const h = D.hexNums[Math.round((a ?? 1) * 255)];
      l.value = (r || "#000000") + h;
    } else
      l.value = r || "#000000";
    return l.className = "basicColorPicker", l.tabIndex = 0, l.setAttribute("data-l10n-id", n(Fr, wu)[t]), l.addEventListener("input", () => {
      if (o) {
        const h = Ff(l.value);
        if (!h)
          return;
        const [c, d, p, m] = h, y = D.makeHexColor(c, d, p);
        s !== void 0 ? n(this, qi).updateParams(s, {
          color: y,
          opacity: m
        }) : (n(this, qi).updateParams(e, y), n(this, qi).updateParams(i, m));
      } else
        n(this, qi).updateParams(e, l.value);
    }, {
      signal: n(this, qi)._signal
    }), l;
  }
  update(t) {
    if (n(this, je))
      if (n(this, Zl)) {
        const e = D.hexNums[Math.round(n(this, Ka).opacity * 255)];
        n(this, je).value = t + e;
      } else
        n(this, je).value = t;
  }
  updateOpacity(t) {
    if (!n(this, je) || !n(this, Zl))
      return;
    const e = D.hexNums[Math.round(t * 255)];
    n(this, je).value = n(this, Ka).color + e;
  }
  destroy() {
    var t;
    (t = n(this, je)) == null || t.remove(), f(this, je, null);
  }
  hideDropdown() {
  }
};
je = new WeakMap(), Zl = new WeakMap(), Ka = new WeakMap(), qi = new WeakMap(), wu = new WeakMap(), u(Fr, wu, null);
let Bp = Fr;
function p0(g) {
  return Math.floor(ut(g, 0, 1) * 255).toString(16).padStart(2, "0");
}
function sc(g) {
  return ut(g, 0, 1) * 255;
}
class g0 {
  static CMYK_G([t, e, s, i]) {
    return ["G", 1 - Math.min(1, 0.3 * t + 0.59 * s + 0.11 * e + i)];
  }
  static G_CMYK([t]) {
    return ["CMYK", 0, 0, 0, 1 - t];
  }
  static G_RGB([t]) {
    return ["RGB", t, t, t];
  }
  static G_rgb([t]) {
    return t = sc(t), [t, t, t];
  }
  static G_HTML([t]) {
    const e = p0(t);
    return `#${e}${e}${e}`;
  }
  static RGB_G([t, e, s]) {
    return ["G", 0.3 * t + 0.59 * e + 0.11 * s];
  }
  static RGB_rgb(t) {
    return t.map(sc);
  }
  static RGB_HTML(t) {
    return `#${t.map(p0).join("")}`;
  }
  static T_HTML() {
    return "#00000000";
  }
  static T_rgb() {
    return [null];
  }
  static CMYK_RGB([t, e, s, i]) {
    return ["RGB", 1 - Math.min(1, t + i), 1 - Math.min(1, s + i), 1 - Math.min(1, e + i)];
  }
  static CMYK_rgb([t, e, s, i]) {
    return [sc(1 - Math.min(1, t + i)), sc(1 - Math.min(1, s + i)), sc(1 - Math.min(1, e + i))];
  }
  static CMYK_HTML(t) {
    const e = this.CMYK_RGB(t).slice(1);
    return this.RGB_HTML(e);
  }
  static RGB_CMYK([t, e, s]) {
    const i = 1 - t, r = 1 - e, a = 1 - s, o = Math.min(i, r, a);
    return ["CMYK", i, r, a, o];
  }
}
class PE {
  create(t, e, s = !1) {
    if (t <= 0 || e <= 0)
      throw new Error("Invalid SVG dimensions");
    const i = this._createSVG("svg:svg");
    return i.setAttribute("version", "1.1"), s || (i.setAttribute("width", `${t}px`), i.setAttribute("height", `${e}px`)), i.setAttribute("preserveAspectRatio", "none"), i.setAttribute("viewBox", `0 0 ${t} ${e}`), i;
  }
  createElement(t) {
    if (typeof t != "string")
      throw new Error("Invalid SVG element type");
    return this._createSVG(t);
  }
  _createSVG(t) {
    K("Abstract method `_createSVG` called.");
  }
}
class Hp extends PE {
  _createSVG(t) {
    return document.createElementNS(Ce, t);
  }
}
const ME = 9, Mo = /* @__PURE__ */ new WeakSet(), DE = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3;
class vb {
  static create(t) {
    switch (t.data.annotationType) {
      case wt.LINK:
        return new _A(t);
      case wt.TEXT:
        return new LE(t);
      case wt.WIDGET:
        switch (t.data.fieldType) {
          case "Tx":
            return new FE(t);
          case "Btn":
            return t.data.radioButton ? new NE(t) : t.data.checkBox ? new OE(t) : new BE(t);
          case "Ch":
            return new HE(t);
          case "Sig":
            return new RE(t);
        }
        return new Io(t);
      case wt.POPUP:
        return new ky(t);
      case wt.FREETEXT:
        return new qw(t);
      case wt.LINE:
        return new GE(t);
      case wt.SQUARE:
        return new $E(t);
      case wt.CIRCLE:
        return new zE(t);
      case wt.POLYLINE:
        return new Qw(t);
      case wt.CARET:
        return new jE(t);
      case wt.INK:
        return new TA(t);
      case wt.POLYGON:
        return new VE(t);
      case wt.HIGHLIGHT:
        return new Jw(t);
      case wt.UNDERLINE:
        return new WE(t);
      case wt.SQUIGGLY:
        return new XE(t);
      case wt.STRIKEOUT:
        return new YE(t);
      case wt.STAMP:
        return new Zw(t);
      case wt.FILEATTACHMENT:
        return new KE(t);
      case wt.RICHMEDIA:
      case wt.SCREEN:
      case wt.SOUND:
        return new tv(t);
      default:
        return new yt(t);
    }
  }
}
var qa, th, bs, vu, Ty;
const NA = class NA {
  constructor(t, {
    isRenderable: e = !1,
    ignoreBorder: s = !1,
    createQuadrilaterals: i = !1
  } = {}) {
    u(this, vu);
    u(this, qa, null);
    u(this, th, !1);
    u(this, bs, null);
    this.isRenderable = e, this.data = t.data, this.layer = t.layer, this.linkService = t.linkService, this.downloadManager = t.downloadManager, this.imageResourcesPath = t.imageResourcesPath, this.renderForms = t.renderForms, this.svgFactory = t.svgFactory, this.annotationStorage = t.annotationStorage, this.enableComment = t.enableComment, this.enableScripting = t.enableScripting, this.hasJSActions = t.hasJSActions, this._fieldObjects = t.fieldObjects, this.parent = t.parent, this.hasOwnCommentButton = !1, e && (this.contentElement = this.container = this._createContainer(s)), i && this._createQuadrilaterals();
  }
  static _hasPopupData({
    contentsObj: t,
    richText: e
  }) {
    return !!(t != null && t.str || e != null && e.str);
  }
  get _isEditable() {
    return this.data.isEditable;
  }
  get hasPopupData() {
    return NA._hasPopupData(this.data) || this.enableComment && !!this.commentText;
  }
  get commentData() {
    var s;
    const {
      data: t
    } = this, e = (s = this.annotationStorage) == null ? void 0 : s.getEditor(t.id);
    return e ? e.getData() : t;
  }
  get hasCommentButton() {
    return this.enableComment && this.hasPopupElement;
  }
  get commentButtonPosition() {
    var o;
    const t = (o = this.annotationStorage) == null ? void 0 : o.getEditor(this.data.id);
    if (t)
      return t.commentButtonPositionInPage;
    const {
      quadPoints: e,
      inkLists: s,
      rect: i
    } = this.data;
    let r = -1 / 0, a = -1 / 0;
    if ((e == null ? void 0 : e.length) >= 8) {
      for (let l = 0; l < e.length; l += 8)
        e[l + 1] > a ? (a = e[l + 1], r = e[l + 2]) : e[l + 1] === a && (r = Math.max(r, e[l + 2]));
      return [r, a];
    }
    if ((s == null ? void 0 : s.length) >= 1) {
      for (const l of s)
        for (let h = 0, c = l.length; h < c; h += 2)
          l[h + 1] > a ? (a = l[h + 1], r = l[h]) : l[h + 1] === a && (r = Math.max(r, l[h]));
      if (r !== 1 / 0)
        return [r, a];
    }
    return i ? [i[2], i[3]] : null;
  }
  _normalizePoint(t) {
    const {
      page: {
        view: e
      },
      viewport: {
        rawDims: {
          pageWidth: s,
          pageHeight: i,
          pageX: r,
          pageY: a
        }
      }
    } = this.parent;
    return t[1] = e[3] - t[1] + e[1], t[0] = 100 * (t[0] - r) / s, t[1] = 100 * (t[1] - a) / i, t;
  }
  get commentText() {
    var e, s, i;
    const {
      data: t
    } = this;
    return ((s = (e = this.annotationStorage.getRawValue(`${Jh}${t.id}`)) == null ? void 0 : e.popup) == null ? void 0 : s.contents) || ((i = t.contentsObj) == null ? void 0 : i.str) || "";
  }
  set commentText(t) {
    const {
      data: e
    } = this, s = {
      deleted: !t,
      contents: t || ""
    };
    this.annotationStorage.updateEditor(e.id, {
      popup: s
    }) || this.annotationStorage.setValue(`${Jh}${e.id}`, {
      id: e.id,
      annotationType: e.annotationType,
      page: this.parent.page,
      popup: s,
      popupRef: e.popupRef,
      modificationDate: /* @__PURE__ */ new Date()
    }), t || this.removePopup();
  }
  removePopup() {
    var t, e;
    (e = ((t = n(this, bs)) == null ? void 0 : t.popup) || this.popup) == null || e.remove(), f(this, bs, this.popup = null);
  }
  updateEdited(t) {
    var r;
    if (!this.container)
      return;
    t.rect && (n(this, qa) || f(this, qa, {
      rect: this.data.rect.slice(0)
    }));
    const {
      rect: e,
      popup: s
    } = t;
    e && b(this, vu, Ty).call(this, e);
    let i = ((r = n(this, bs)) == null ? void 0 : r.popup) || this.popup;
    !i && (s != null && s.text) && (this._createPopup(s), i = n(this, bs).popup), i && (i.updateEdited(t), s != null && s.deleted && (i.remove(), f(this, bs, null), this.popup = null));
  }
  resetEdited() {
    var t;
    n(this, qa) && (b(this, vu, Ty).call(this, n(this, qa).rect), (t = n(this, bs)) == null || t.popup.resetEdited(), f(this, qa, null));
  }
  _createContainer(t) {
    const {
      data: e,
      parent: {
        page: s,
        viewport: i
      }
    } = this, r = document.createElement("section");
    r.setAttribute("data-annotation-id", e.id), !(this instanceof Io) && !(this instanceof _A) && !(this instanceof tv) && (r.tabIndex = 0);
    const {
      style: a
    } = r;
    if (a.zIndex = this.parent.zIndex, this.parent.zIndex += 2, e.alternativeText && (r.title = e.alternativeText), e.noRotate && r.classList.add("norotate"), !e.rect || this instanceof ky) {
      const {
        rotation: A
      } = e;
      return !e.hasOwnCanvas && A !== 0 && this.setRotation(A, r), r;
    }
    const {
      width: o,
      height: l
    } = this;
    if (!t && e.borderStyle.width > 0) {
      a.borderWidth = `${e.borderStyle.width}px`;
      const A = e.borderStyle.horizontalCornerRadius, v = e.borderStyle.verticalCornerRadius;
      if (A > 0 || v > 0) {
        const S = `calc(${A}px * var(--total-scale-factor)) / calc(${v}px * var(--total-scale-factor))`;
        a.borderRadius = S;
      }
      switch (e.borderStyle.style) {
        case Fo.SOLID:
          a.borderStyle = "solid";
          break;
        case Fo.DASHED:
          a.borderStyle = "dashed";
          break;
        case Fo.BEVELED:
          $("Unimplemented border style: beveled");
          break;
        case Fo.INSET:
          $("Unimplemented border style: inset");
          break;
        case Fo.UNDERLINE:
          a.borderBottomStyle = "solid";
          break;
      }
      const w = e.borderColor || null;
      w ? (f(this, th, !0), a.borderColor = D.makeHexColor(...w)) : a.borderWidth = 0;
    }
    const h = D.normalizeRect([e.rect[0], s.view[3] - e.rect[1] + s.view[1], e.rect[2], s.view[3] - e.rect[3] + s.view[1]]), {
      pageWidth: c,
      pageHeight: d,
      pageX: p,
      pageY: m
    } = i.rawDims;
    a.left = `${100 * (h[0] - p) / c}%`, a.top = `${100 * (h[1] - m) / d}%`;
    const {
      rotation: y
    } = e;
    return e.hasOwnCanvas || y === 0 ? (a.width = `${100 * o / c}%`, a.height = `${100 * l / d}%`) : this.setRotation(y, r), r;
  }
  setRotation(t, e = this.container) {
    if (!this.data.rect)
      return;
    const {
      pageWidth: s,
      pageHeight: i
    } = this.parent.viewport.rawDims;
    let {
      width: r,
      height: a
    } = this;
    t % 180 !== 0 && ([r, a] = [a, r]), e.style.width = `${100 * r / s}%`, e.style.height = `${100 * a / i}%`, e.setAttribute("data-main-rotation", (360 - t) % 360);
  }
  get _commonActions() {
    const t = (e, s, i) => {
      const r = i.detail[e], a = r[0], o = r.slice(1);
      i.target.style[s] = g0[`${a}_HTML`](o), this.annotationStorage.setValue(this.data.id, {
        [s]: g0[`${a}_rgb`](o)
      });
    };
    return H(this, "_commonActions", {
      display: (e) => {
        const {
          display: s
        } = e.detail, i = s % 2 === 1;
        this.container.style.visibility = i ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
          noView: i,
          noPrint: s === 1 || s === 2
        });
      },
      print: (e) => {
        this.annotationStorage.setValue(this.data.id, {
          noPrint: !e.detail.print
        });
      },
      hidden: (e) => {
        const {
          hidden: s
        } = e.detail;
        this.container.style.visibility = s ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
          noPrint: s,
          noView: s
        });
      },
      focus: (e) => {
        setTimeout(() => e.target.focus({
          preventScroll: !1
        }), 0);
      },
      userName: (e) => {
        e.target.title = e.detail.userName;
      },
      readonly: (e) => {
        e.target.disabled = e.detail.readonly;
      },
      required: (e) => {
        this._setRequired(e.target, e.detail.required);
      },
      bgColor: (e) => {
        t("bgColor", "backgroundColor", e);
      },
      fillColor: (e) => {
        t("fillColor", "backgroundColor", e);
      },
      fgColor: (e) => {
        t("fgColor", "color", e);
      },
      textColor: (e) => {
        t("textColor", "color", e);
      },
      borderColor: (e) => {
        t("borderColor", "borderColor", e);
      },
      strokeColor: (e) => {
        t("strokeColor", "borderColor", e);
      },
      rotation: (e) => {
        const s = e.detail.rotation;
        this.setRotation(s), this.annotationStorage.setValue(this.data.id, {
          rotation: s
        });
      }
    });
  }
  _dispatchEventFromSandbox(t, e) {
    const s = this._commonActions;
    for (const i of Object.keys(e.detail)) {
      const r = t[i] || s[i];
      r == null || r(e);
    }
  }
  _setDefaultPropertiesFromJS(t) {
    if (!this.enableScripting)
      return;
    const e = this.annotationStorage.getRawValue(this.data.id);
    if (!e)
      return;
    const s = this._commonActions;
    for (const [i, r] of Object.entries(e)) {
      const a = s[i];
      if (a) {
        const o = {
          detail: {
            [i]: r
          },
          target: t
        };
        a(o), delete e[i];
      }
    }
  }
  _createQuadrilaterals() {
    if (!this.container)
      return;
    const {
      quadPoints: t
    } = this.data;
    if (!t)
      return;
    const [e, s, i, r] = this.data.rect.map(Math.fround);
    if (t.length === 8) {
      const [A, v, w, S] = t.subarray(2, 6);
      if (i === A && r === v && e === w && s === S)
        return;
    }
    const {
      style: a
    } = this.container;
    let o;
    if (n(this, th)) {
      const {
        borderColor: A,
        borderWidth: v
      } = a;
      a.borderWidth = 0, o = ["url('data:image/svg+xml;utf8,", `<svg xmlns="${Ce}" preserveAspectRatio="none" viewBox="0 0 1 1">`, `<g fill="transparent" stroke="${A}" stroke-width="${v}">`], this.container.classList.add("hasBorder");
    }
    const l = i - e, h = r - s, {
      svgFactory: c
    } = this, d = c.createElement("svg");
    d.classList.add("quadrilateralsContainer"), d.setAttribute("width", 0), d.setAttribute("height", 0), d.role = "none";
    const p = c.createElement("defs");
    d.append(p);
    const m = c.createElement("clipPath"), y = `clippath_${this.data.id}`;
    m.setAttribute("id", y), m.setAttribute("clipPathUnits", "objectBoundingBox"), p.append(m);
    for (let A = 2, v = t.length; A < v; A += 8) {
      const w = t[A], S = t[A + 1], E = t[A + 2], x = t[A + 3], C = c.createElement("rect"), _ = (E - e) / l, k = (r - S) / h, P = (w - E) / l, M = (S - x) / h;
      C.setAttribute("x", _), C.setAttribute("y", k), C.setAttribute("width", P), C.setAttribute("height", M), m.append(C), o == null || o.push(`<rect vector-effect="non-scaling-stroke" x="${_}" y="${k}" width="${P}" height="${M}"/>`);
    }
    n(this, th) && (o.push("</g></svg>')"), a.backgroundImage = o.join("")), this.container.append(d), this.container.style.clipPath = `url(#${y})`;
  }
  _createPopup(t = null) {
    const {
      data: e
    } = this;
    let s, i;
    t ? (s = {
      str: t.text
    }, i = t.date) : (s = e.contentsObj, i = e.modificationDate), f(this, bs, new ky({
      data: {
        color: e.color,
        titleObj: e.titleObj,
        modificationDate: i,
        contentsObj: s,
        richText: e.richText,
        parentRect: e.rect,
        borderStyle: 0,
        id: `popup_${e.id}`,
        rotation: e.rotation,
        noRotate: !0
      },
      linkService: this.linkService,
      parent: this.parent,
      elements: [this]
    }));
  }
  get hasPopupElement() {
    return !!(n(this, bs) || this.popup || this.data.popupRef);
  }
  get extraPopupElement() {
    return n(this, bs);
  }
  render() {
    K("Abstract method `AnnotationElement.render` called");
  }
  _getElementsByName(t, e = null) {
    const s = [];
    if (this._fieldObjects) {
      const i = this._fieldObjects.get(t) || [];
      for (const {
        page: r,
        id: a,
        exportValues: o
      } of i) {
        if (r === -1 || a === e)
          continue;
        const l = typeof o == "string" ? o : null, h = document.querySelector(`[data-element-id="${a}"]`);
        if (h && !Mo.has(h)) {
          $(`_getElementsByName - element not allowed: ${a}`);
          continue;
        }
        s.push({
          id: a,
          exportValue: l,
          domElement: h
        });
      }
      return s;
    }
    for (const i of document.getElementsByName(t)) {
      const {
        exportValue: r
      } = i, a = i.getAttribute("data-element-id");
      a !== e && Mo.has(i) && s.push({
        id: a,
        exportValue: r,
        domElement: i
      });
    }
    return s;
  }
  show() {
    var t;
    this.container && (this.container.hidden = !1), (t = this.popup) == null || t.maybeShow();
  }
  hide() {
    var t;
    this.container && (this.container.hidden = !0), (t = this.popup) == null || t.forceHide();
  }
  getElementsToTriggerPopup() {
    return this.container;
  }
  addHighlightArea() {
    const t = this.getElementsToTriggerPopup();
    if (Array.isArray(t))
      for (const e of t)
        e.classList.add("highlightArea");
    else
      t.classList.add("highlightArea");
  }
  _editOnDoubleClick() {
    if (!this._isEditable)
      return;
    const {
      annotationEditorType: t,
      data: {
        id: e
      }
    } = this;
    this.container.addEventListener("dblclick", () => {
      var s;
      (s = this.linkService.eventBus) == null || s.dispatch("switchannotationeditormode", {
        source: this,
        mode: t,
        editId: e,
        mustEnterInEditMode: !0
      });
    });
  }
  updateOC(t) {
    if (!this.data.oc || !t)
      return;
    t.isVisible(this.data.oc) ? this.show() : this.hide();
  }
  get width() {
    return this.data.rect[2] - this.data.rect[0];
  }
  get height() {
    return this.data.rect[3] - this.data.rect[1];
  }
  _setBackgroundColor(t) {
    const e = this.data.backgroundColor || null;
    t.style.backgroundColor = e === null ? "transparent" : D.makeHexColor(...e);
  }
};
qa = new WeakMap(), th = new WeakMap(), bs = new WeakMap(), vu = new WeakSet(), Ty = function(t) {
  const {
    container: {
      style: e
    },
    data: {
      rect: s,
      rotation: i
    },
    parent: {
      viewport: {
        rawDims: {
          pageWidth: r,
          pageHeight: a,
          pageX: o,
          pageY: l
        }
      }
    }
  } = this;
  s == null || s.splice(0, 4, ...t), e.left = `${100 * (t[0] - o) / r}%`, e.top = `${100 * (a - t[3] + l) / a}%`, i === 0 ? (e.width = `${100 * (t[2] - t[0]) / r}%`, e.height = `${100 * (t[3] - t[1]) / a}%`) : this.setRotation(i);
};
let yt = NA;
class IE extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.editor = t.editor;
  }
  render() {
    return this.container.className = "editorAnnotation", this.container;
  }
  createOrUpdatePopup() {
    const {
      editor: t
    } = this;
    t.hasComment && this._createPopup(t.comment);
  }
  get hasCommentButton() {
    return this.enableComment && this.editor.hasComment;
  }
  get commentButtonPosition() {
    return this.editor.commentButtonPositionInPage;
  }
  get commentText() {
    return this.editor.comment.text;
  }
  set commentText(t) {
    this.editor.comment = t, t || this.removePopup();
  }
  get commentData() {
    return this.editor.getData();
  }
  remove() {
    this.parent.removeAnnotation(this.data.id), this.container.remove(), this.container = null, this.removePopup();
  }
}
var Qi, Mr, im, Vw, nm, jw;
class _A extends yt {
  constructor(e, s = null) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !!(s != null && s.ignoreBorder),
      createQuadrilaterals: !0
    });
    u(this, Qi);
    u(this, im);
    u(this, nm);
    this.isTooltipOnly = e.data.isTooltipOnly;
  }
  render() {
    const {
      data: e,
      linkService: s
    } = this, i = document.createElement("a");
    i.setAttribute("data-element-id", e.id);
    let r = !1;
    return e.url ? (s.addLinkAttributes(i, e.url, e.newWindow), r = !0) : e.action ? (this._bindNamedAction(i, e.action, e.overlaidText), r = !0) : e.attachment ? (b(this, im, Vw).call(this, i, e.attachmentId, e.attachment, e.overlaidText, e.attachmentDest), r = !0) : e.setOCGState ? (b(this, nm, jw).call(this, i, e.setOCGState, e.overlaidText), r = !0) : e.dest ? (this._bindLink(i, e.dest, e.overlaidText), r = !0) : (e.actions && (e.actions.has("Action") || e.actions.has("Mouse Up") || e.actions.has("Mouse Down")) && this.enableScripting && this.hasJSActions && (this._bindJSAction(i, e), r = !0), e.resetForm ? (this._bindResetFormAction(i, e.resetForm), r = !0) : this.isTooltipOnly && !r && (this._bindLink(i, ""), r = !0)), this.container.classList.add("linkAnnotation"), r && (this.contentElement = i, this.container.append(i)), this.container;
  }
  _bindLink(e, s, i = "") {
    e.href = this.linkService.getDestinationHash(s), e.onclick = () => (s && this.linkService.goToDestination(s), !1), (s || s === "") && b(this, Qi, Mr).call(this), i && (e.title = i);
  }
  _bindNamedAction(e, s, i = "") {
    e.href = this.linkService.getAnchorUrl(""), e.onclick = () => (this.linkService.executeNamedAction(s), !1), i && (e.title = i), b(this, Qi, Mr).call(this);
  }
  _bindJSAction(e, {
    actions: s,
    id: i,
    overlaidText: r
  }) {
    e.href = this.linkService.getAnchorUrl("");
    const a = /* @__PURE__ */ new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);
    for (const o of s.keys()) {
      const l = a.get(o);
      l && (e[l] = () => {
        var h;
        return (h = this.linkService.eventBus) == null || h.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: i,
            name: o
          }
        }), !1;
      });
    }
    r && (e.title = r), e.onclick || (e.onclick = () => !1), b(this, Qi, Mr).call(this);
  }
  _bindResetFormAction(e, s) {
    const i = e.onclick;
    if (i || (e.href = this.linkService.getAnchorUrl("")), b(this, Qi, Mr).call(this), !this._fieldObjects) {
      $('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.'), i || (e.onclick = () => !1);
      return;
    }
    e.onclick = () => {
      var d;
      i == null || i();
      const {
        fields: r,
        refs: a,
        include: o
      } = s, l = [];
      if (r.length !== 0 || a.length !== 0) {
        const p = new Set(a);
        for (const m of r) {
          const y = this._fieldObjects.get(m) || [];
          for (const {
            id: A
          } of y)
            p.add(A);
        }
        for (const m of this._fieldObjects.values())
          for (const y of m)
            p.has(y.id) === o && l.push(y);
      } else
        for (const p of this._fieldObjects.values())
          l.push(...p);
      const h = this.annotationStorage, c = [];
      for (const p of l) {
        const {
          id: m
        } = p;
        switch (c.push(m), p.type) {
          case "text": {
            const A = p.defaultValue || "";
            h.setValue(m, {
              value: A
            });
            break;
          }
          case "checkbox":
          case "radiobutton": {
            const A = p.defaultValue === p.exportValues;
            h.setValue(m, {
              value: A
            });
            break;
          }
          case "combobox":
          case "listbox": {
            const A = p.defaultValue || "";
            h.setValue(m, {
              value: A
            });
            break;
          }
          default:
            continue;
        }
        const y = document.querySelector(`[data-element-id="${m}"]`);
        if (y) {
          if (!Mo.has(y)) {
            $(`_bindResetFormAction - element not allowed: ${m}`);
            continue;
          }
        } else
          continue;
        y.dispatchEvent(new Event("resetform"));
      }
      return this.enableScripting && ((d = this.linkService.eventBus) == null || d.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: "app",
          ids: c,
          name: "ResetForm"
        }
      })), !1;
    };
  }
}
Qi = new WeakSet(), Mr = function() {
  this.container.setAttribute("data-internal-link", "");
}, im = new WeakSet(), Vw = function(e, s, i, r = "", a = null) {
  e.href = this.linkService.getAnchorUrl(""), i.description ? e.title = i.description : r && (e.title = r);
  const o = async () => {
    var h;
    const l = await this.linkService.getAttachmentContent(s);
    l && ((h = this.downloadManager) == null || h.openOrDownloadData(l, i.filename, a));
  };
  e.onclick = () => (o(), !1), b(this, Qi, Mr).call(this);
}, nm = new WeakSet(), jw = function(e, s, i = "") {
  e.href = this.linkService.getAnchorUrl(""), e.onclick = () => (this.linkService.executeSetOCGState(s), !1), i && (e.title = i), b(this, Qi, Mr).call(this);
};
class LE extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0
    });
  }
  render() {
    this.container.classList.add("textAnnotation");
    const t = document.createElement("img");
    return t.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg", t.setAttribute("data-l10n-id", "pdfjs-text-annotation-type"), t.setAttribute("data-l10n-args", JSON.stringify({
      type: this.data.name
    })), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.append(t), this.container;
  }
}
class Io extends yt {
  render() {
    return this.container;
  }
  _getKeyModifier(t) {
    return rt.platform.isMac ? t.metaKey : t.ctrlKey;
  }
  _setEventListener(t, e, s, i, r) {
    s.includes("mouse") ? t.addEventListener(s, (a) => {
      var o;
      (o = this.linkService.eventBus) == null || o.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: this.data.id,
          name: i,
          value: r(a),
          shift: a.shiftKey,
          modifier: this._getKeyModifier(a)
        }
      });
    }) : t.addEventListener(s, (a) => {
      var o;
      if (s === "blur") {
        if (!e.focused || !a.relatedTarget)
          return;
        e.focused = !1;
      } else if (s === "focus") {
        if (e.focused)
          return;
        e.focused = !0;
      }
      r && ((o = this.linkService.eventBus) == null || o.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: this.data.id,
          name: i,
          value: r(a)
        }
      }));
    });
  }
  _setEventListeners(t, e, s, i) {
    const {
      actions: r
    } = this.data;
    for (const [a, o] of s)
      (o === "Action" || r != null && r.has(o)) && ((o === "Focus" || o === "Blur") && (e || (e = {
        focused: !1
      })), this._setEventListener(t, e, a, o, i), o === "Focus" && !(r != null && r.has("Blur")) ? this._setEventListener(t, e, "blur", "Blur", null) : o === "Blur" && !(r != null && r.has("Focus")) && this._setEventListener(t, e, "focus", "Focus", null));
  }
  _setTextStyle(t) {
    const e = ["left", "center", "right"], {
      fontColor: s
    } = this.data.defaultAppearanceData, i = this.data.defaultAppearanceData.fontSize || ME, r = t.style;
    let a;
    const o = 2, l = (h) => Math.round(10 * h) / 10;
    if (this.data.multiLine) {
      const h = Math.abs(this.data.rect[3] - this.data.rect[1] - o), c = Math.round(h / /* inlined export .LINE_FACTOR */
      (1.35 * i)) || 1, d = h / c;
      a = Math.min(i, l(d / /* inlined export .LINE_FACTOR */
      1.35));
    } else {
      const h = Math.abs(this.data.rect[3] - this.data.rect[1] - o);
      a = Math.min(i, l(h / /* inlined export .LINE_FACTOR */
      1.35));
    }
    r.fontSize = `calc(${a}px * var(--total-scale-factor))`, r.color = D.makeHexColor(...s), this.data.textAlignment !== null && !this.data.comb && (r.textAlign = e[this.data.textAlignment]);
  }
  _setRequired(t, e) {
    e ? t.setAttribute("required", !0) : t.removeAttribute("required"), t.setAttribute("aria-required", e);
  }
}
class FE extends Io {
  constructor(t) {
    const e = t.renderForms || t.data.hasOwnCanvas || !t.data.hasAppearance && !!t.data.fieldValue;
    super(t, {
      isRenderable: e
    });
  }
  setPropertyOnSiblings(t, e, s, i) {
    const r = this.annotationStorage;
    for (const a of this._getElementsByName(t.name, t.id))
      a.domElement && (a.domElement[e] = s), r.setValue(a.id, {
        [i]: s
      });
  }
  render() {
    var i, r;
    const t = this.annotationStorage, e = this.data.id;
    this.container.classList.add("textWidgetAnnotation");
    let s = null;
    if (this.renderForms) {
      const a = t.getValue(e, {
        value: this.data.fieldValue
      });
      let o = a.value || "";
      const l = t.getValue(e, {
        charLimit: this.data.maxLen
      }).charLimit;
      l && o.length > l && (o = o.slice(0, l));
      let h = a.formattedValue || ((i = this.data.textContent) == null ? void 0 : i.join(`
`)) || null;
      h && this.data.comb && (h = h.replaceAll(/\s+/g, ""));
      const c = {
        userValue: o,
        formattedValue: h,
        lastCommittedValue: null,
        commitKey: 1,
        focused: !1
      };
      this.data.multiLine ? (s = document.createElement("textarea"), s.textContent = h ?? o, this.data.doNotScroll && (s.style.overflowY = "hidden")) : (s = document.createElement("input"), s.type = this.data.password ? "password" : "text", s.setAttribute("value", h ?? o), this.data.doNotScroll && (s.style.overflowX = "hidden")), this.data.hasOwnCanvas && (this.container.classList.add("hasOwnCanvas"), t.has(e) && this.container.classList.add("sandboxModified")), Mo.add(s), this.contentElement = s, s.setAttribute("data-element-id", e), s.disabled = this.data.readOnly, s.name = this.data.fieldName, s.tabIndex = 0;
      const {
        datetimeFormat: d,
        datetimeType: p,
        timeStep: m
      } = this.data, y = !!p && this.enableScripting;
      d && (s.title = d), this._setRequired(s, this.data.required), l && (s.maxLength = l), s.addEventListener("input", (v) => {
        t.setValue(e, {
          value: v.target.value
        }), this.setPropertyOnSiblings(s, "value", v.target.value, "value"), c.formattedValue = null;
      }), s.addEventListener("resetform", (v) => {
        const w = this.data.defaultFieldValue ?? "";
        s.value = c.userValue = w, c.formattedValue = null;
      });
      let A = (v) => {
        const {
          formattedValue: w
        } = c;
        w != null && (v.target.value = w), v.target.scrollLeft = 0;
      };
      if (this.enableScripting && this.hasJSActions) {
        s.addEventListener("focus", (w) => {
          var E;
          if (c.focused)
            return;
          const {
            target: S
          } = w;
          if (y && (S.type = p, m && (S.step = m)), c.userValue) {
            const x = c.userValue;
            if (y)
              if (p === "time") {
                const C = new Date(x), _ = [C.getHours(), C.getMinutes(), C.getSeconds()];
                S.value = _.map((k) => k.toString().padStart(2, "0")).join(":");
              } else
                S.value = new Date(x - DE).toISOString().split(p === "date" ? "T" : ".", 1)[0];
            else
              S.value = x;
          }
          c.lastCommittedValue = S.value, c.commitKey = 1, (E = this.data.actions) != null && E.has("Focus") || (c.focused = !0);
        }), s.addEventListener("updatefromsandbox", (w) => {
          this.container.classList.add("sandboxModified");
          const S = {
            value(E) {
              c.userValue = E.detail.value ?? "", y || t.setValue(e, {
                value: c.userValue.toString()
              }), E.target.value = c.userValue;
            },
            formattedValue(E) {
              const {
                formattedValue: x
              } = E.detail;
              c.formattedValue = x, x != null && E.target !== document.activeElement && (E.target.value = x);
              const C = {
                formattedValue: x
              };
              y && (C.value = x), t.setValue(e, C);
            },
            selRange(E) {
              E.target.setSelectionRange(...E.detail.selRange);
            },
            charLimit: (E) => {
              var k;
              const {
                charLimit: x
              } = E.detail, {
                target: C
              } = E;
              if (x === 0) {
                C.removeAttribute("maxLength");
                return;
              }
              C.setAttribute("maxLength", x);
              let _ = c.userValue;
              !_ || _.length <= x || (_ = _.slice(0, x), C.value = c.userValue = _, t.setValue(e, {
                value: _
              }), (k = this.linkService.eventBus) == null || k.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: e,
                  name: "Keystroke",
                  value: _,
                  willCommit: !0,
                  commitKey: 1,
                  selStart: C.selectionStart,
                  selEnd: C.selectionEnd
                }
              }));
            }
          };
          this._dispatchEventFromSandbox(S, w);
        }), s.addEventListener("keydown", (w) => {
          var x;
          c.commitKey = 1;
          let S = -1;
          if (w.key === "Escape" ? S = 0 : w.key === "Enter" && !this.data.multiLine ? S = 2 : w.key === "Tab" && (c.commitKey = 3), S === -1)
            return;
          const {
            value: E
          } = w.target;
          c.lastCommittedValue !== E && (c.lastCommittedValue = E, c.userValue = E, (x = this.linkService.eventBus) == null || x.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: e,
              name: "Keystroke",
              value: E,
              willCommit: !0,
              commitKey: S,
              selStart: w.target.selectionStart,
              selEnd: w.target.selectionEnd
            }
          }));
        });
        const v = A;
        A = null, s.addEventListener("blur", (w) => {
          var x, C;
          if (!c.focused || !w.relatedTarget)
            return;
          (x = this.data.actions) != null && x.has("Blur") || (c.focused = !1);
          const {
            target: S
          } = w;
          let {
            value: E
          } = S;
          if (y) {
            if (E && p === "time") {
              const _ = E.split(":").map((k) => parseInt(k, 10));
              E = new Date(2e3, 0, 1, _[0], _[1], _[2] || 0).valueOf(), S.step = "";
            } else
              E.includes("T") || (E = `${E}T00:00`), E = new Date(E).valueOf();
            S.type = "text";
          }
          c.userValue = E, c.lastCommittedValue !== E && ((C = this.linkService.eventBus) == null || C.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: e,
              name: "Keystroke",
              value: E,
              willCommit: !0,
              commitKey: c.commitKey,
              selStart: w.target.selectionStart,
              selEnd: w.target.selectionEnd
            }
          })), v(w);
        }), (r = this.data.actions) != null && r.has("Keystroke") && s.addEventListener("beforeinput", (w) => {
          var M;
          c.lastCommittedValue = null;
          const {
            data: S,
            target: E
          } = w, {
            value: x,
            selectionStart: C,
            selectionEnd: _
          } = E;
          let k = C, P = _;
          switch (w.inputType) {
            case "deleteWordBackward": {
              const I = /\w/;
              for (; k > 0 && !I.test(x[k - 1]); )
                k--;
              for (; k > 0 && I.test(x[k - 1]); )
                k--;
              break;
            }
            case "deleteWordForward": {
              const I = x.substring(C).match(/^\W*\w*/);
              I && (P += I[0].length);
              break;
            }
            case "deleteContentBackward":
              C === _ && (k -= 1);
              break;
            case "deleteContentForward":
              C === _ && (P += 1);
              break;
          }
          w.preventDefault(), (M = this.linkService.eventBus) == null || M.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: e,
              name: "Keystroke",
              value: x,
              change: S || "",
              willCommit: !1,
              selStart: k,
              selEnd: P
            }
          });
        }), this._setEventListeners(s, c, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (w) => w.target.value);
      }
      if (A && s.addEventListener("blur", A), this.data.comb) {
        const w = (this.data.rect[2] - this.data.rect[0]) / l;
        s.classList.add("comb"), s.style.setProperty("--comb-width", `calc(${w}px * var(--total-scale-factor))`);
        const S = this.data.textAlignment;
        if (S === 1 || S === 2) {
          const E = () => {
            const x = l - s.value.length;
            s.style.setProperty("--comb-offset", `${S === 1 ? x >> 1 : x}`);
          };
          E();
          for (const x of ["input", "blur", "resetform", "updatefromsandbox"])
            s.addEventListener(x, E);
        }
      }
    } else
      s = document.createElement("div"), s.textContent = this.data.fieldValue, s.style.verticalAlign = "middle", s.style.display = "table-cell", this.data.hasOwnCanvas && (s.hidden = !0);
    return this._setTextStyle(s), this._setBackgroundColor(s), this._setDefaultPropertiesFromJS(s), this.container.append(s), this.container;
  }
}
class RE extends Io {
  constructor(t) {
    super(t, {
      isRenderable: !!t.data.hasOwnCanvas
    });
  }
}
class OE extends Io {
  constructor(t) {
    super(t, {
      isRenderable: t.renderForms
    });
  }
  render() {
    const t = this.annotationStorage, e = this.data, s = e.id;
    let i = t.getValue(s, {
      value: e.exportValue === e.fieldValue
    }).value;
    typeof i == "string" && (i = i !== "Off", t.setValue(s, {
      value: i
    })), this.container.classList.add("buttonWidgetAnnotation", "checkBox");
    const r = document.createElement("input");
    return Mo.add(r), r.setAttribute("data-element-id", s), r.disabled = e.readOnly, this._setRequired(r, this.data.required), r.type = "checkbox", r.name = e.fieldName, i && r.setAttribute("checked", !0), r.setAttribute("exportValue", e.exportValue), r.tabIndex = 0, r.addEventListener("change", (a) => {
      const {
        name: o,
        checked: l
      } = a.target;
      for (const h of this._getElementsByName(o, s)) {
        const c = l && h.exportValue === e.exportValue;
        h.domElement && (h.domElement.checked = c), t.setValue(h.id, {
          value: c
        });
      }
      t.setValue(s, {
        value: l
      });
    }), r.addEventListener("resetform", (a) => {
      const o = e.defaultFieldValue || "Off";
      a.target.checked = o === e.exportValue;
    }), this.enableScripting && this.hasJSActions && (r.addEventListener("updatefromsandbox", (a) => {
      const o = {
        value(l) {
          l.target.checked = l.detail.value !== "Off", t.setValue(s, {
            value: l.target.checked
          });
        }
      };
      this._dispatchEventFromSandbox(o, a);
    }), this._setEventListeners(r, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (a) => a.target.checked)), this._setDefaultPropertiesFromJS(r), this.container.append(r), this.container;
  }
}
class NE extends Io {
  constructor(t) {
    super(t, {
      isRenderable: t.renderForms
    });
  }
  render() {
    this.container.classList.add("buttonWidgetAnnotation", "radioButton");
    const t = this.annotationStorage, e = this.data, s = e.id;
    let i = t.getValue(s, {
      value: e.buttonValue !== null && e.fieldValue === e.buttonValue
    }).value;
    if (typeof i == "string" && (i = i !== e.buttonValue, t.setValue(s, {
      value: i
    })), i)
      for (const a of this._getElementsByName(e.fieldName, s))
        t.setValue(a.id, {
          value: !1
        });
    const r = document.createElement("input");
    if (Mo.add(r), r.setAttribute("data-element-id", s), r.disabled = e.readOnly, this._setRequired(r, this.data.required), r.type = "radio", r.name = e.fieldName, i && r.setAttribute("checked", !0), r.tabIndex = 0, r.addEventListener("change", (a) => {
      const {
        name: o,
        checked: l
      } = a.target;
      for (const h of this._getElementsByName(o, s))
        t.setValue(h.id, {
          value: !1
        });
      t.setValue(s, {
        value: l
      });
    }), r.addEventListener("resetform", (a) => {
      const o = e.defaultFieldValue;
      a.target.checked = o != null && o === e.buttonValue;
    }), this.enableScripting && this.hasJSActions) {
      const a = e.buttonValue;
      r.addEventListener("updatefromsandbox", (o) => {
        const l = {
          value: (h) => {
            const c = a === h.detail.value;
            for (const d of this._getElementsByName(h.target.name)) {
              const p = c && d.id === s;
              d.domElement && (d.domElement.checked = p), t.setValue(d.id, {
                value: p
              });
            }
          }
        };
        this._dispatchEventFromSandbox(l, o);
      }), this._setEventListeners(r, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (o) => o.target.checked);
    }
    return this._setDefaultPropertiesFromJS(r), this.container.append(r), this.container;
  }
}
class BE extends _A {
  constructor(t) {
    super(t, {
      ignoreBorder: t.data.hasAppearance
    });
  }
  render() {
    const t = super.render();
    t.classList.add("buttonWidgetAnnotation", "pushButton");
    const e = t.lastChild;
    return this.enableScripting && this.hasJSActions && e && (this._setDefaultPropertiesFromJS(e), e.addEventListener("updatefromsandbox", (s) => {
      this._dispatchEventFromSandbox({}, s);
    })), t;
  }
}
class HE extends Io {
  constructor(t) {
    super(t, {
      isRenderable: t.renderForms
    });
  }
  render() {
    this.container.classList.add("choiceWidgetAnnotation");
    const t = this.annotationStorage, e = this.data.id, s = t.getValue(e, {
      value: this.data.fieldValue
    }), i = document.createElement("select");
    Mo.add(i), i.setAttribute("data-element-id", e), i.disabled = this.data.readOnly, this._setRequired(i, this.data.required), i.name = this.data.fieldName, i.tabIndex = 0;
    let r = this.data.combo && this.data.options.length > 0;
    this.data.combo || (i.size = this.data.options.length, this.data.multiSelect && (i.multiple = !0)), i.addEventListener("resetform", (d) => {
      const p = this.data.defaultFieldValue;
      for (const m of i.options)
        m.selected = m.value === p;
    });
    const a = (d, p) => {
      const m = p.replaceAll(" ", " ");
      d.textContent = m, m !== p && d.setAttribute("display-value", p);
    };
    for (const d of this.data.options) {
      const p = document.createElement("option");
      a(p, d.displayValue), p.value = d.exportValue, s.value.includes(d.exportValue) && (p.setAttribute("selected", !0), r = !1), i.append(p);
    }
    let o = null;
    if (r) {
      const d = document.createElement("option");
      d.value = " ", d.setAttribute("hidden", !0), d.setAttribute("selected", !0), i.prepend(d), o = () => {
        d.remove(), i.removeEventListener("input", o), o = null;
      }, i.addEventListener("input", o);
    }
    const l = (d) => {
      const p = d ? "value" : "textContent", {
        options: m,
        multiple: y
      } = i;
      return y ? Array.prototype.filter.call(m, (A) => A.selected).map((A) => A[p]) : m.selectedIndex === -1 ? null : m[m.selectedIndex][p];
    };
    let h = l(!1);
    const c = (d) => {
      const p = d.target.options;
      return Array.prototype.map.call(p, (m) => ({
        displayValue: m.getAttribute("display-value") || m.textContent,
        exportValue: m.value
      }));
    };
    return this.enableScripting && this.hasJSActions ? (i.addEventListener("updatefromsandbox", (d) => {
      const p = {
        value(m) {
          o == null || o();
          const y = m.detail.value, A = new Set(Array.isArray(y) ? y : [y]);
          for (const v of i.options)
            v.selected = A.has(v.value);
          t.setValue(e, {
            value: l(!0)
          }), h = l(!1);
        },
        multipleSelection(m) {
          i.multiple = !0;
        },
        remove(m) {
          const y = i.options, A = m.detail.remove;
          y[A].selected = !1, i.remove(A), y.length > 0 && Array.prototype.findIndex.call(y, (w) => w.selected) === -1 && (y[0].selected = !0), t.setValue(e, {
            value: l(!0),
            items: c(m)
          }), h = l(!1);
        },
        clear(m) {
          for (; i.length !== 0; )
            i.remove(0);
          t.setValue(e, {
            value: null,
            items: []
          }), h = l(!1);
        },
        insert(m) {
          const {
            index: y,
            displayValue: A,
            exportValue: v
          } = m.detail.insert, w = i.children[y], S = document.createElement("option");
          a(S, A), S.value = v, w ? w.before(S) : i.append(S), t.setValue(e, {
            value: l(!0),
            items: c(m)
          }), h = l(!1);
        },
        items(m) {
          const {
            items: y
          } = m.detail;
          for (; i.length !== 0; )
            i.remove(0);
          for (const A of y) {
            const {
              displayValue: v,
              exportValue: w
            } = A, S = document.createElement("option");
            a(S, v), S.value = w, i.append(S);
          }
          i.options.length > 0 && (i.options[0].selected = !0), t.setValue(e, {
            value: l(!0),
            items: c(m)
          }), h = l(!1);
        },
        indices(m) {
          const y = new Set(m.detail.indices);
          for (const A of m.target.options)
            A.selected = y.has(A.index);
          t.setValue(e, {
            value: l(!0)
          }), h = l(!1);
        },
        editable(m) {
          m.target.disabled = !m.detail.editable;
        }
      };
      this._dispatchEventFromSandbox(p, d);
    }), i.addEventListener("input", (d) => {
      var y;
      const p = l(!0), m = l(!1);
      t.setValue(e, {
        value: p
      }), d.preventDefault(), (y = this.linkService.eventBus) == null || y.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: e,
          name: "Keystroke",
          value: h,
          change: m,
          changeEx: p,
          willCommit: !1,
          commitKey: 1,
          keyDown: !1
        }
      });
    }), this._setEventListeners(i, null, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"], ["input", "Validate"]], (d) => d.target.value)) : i.addEventListener("input", function(d) {
      t.setValue(e, {
        value: l(!0)
      });
    }), this.data.combo && this._setTextStyle(i), this._setBackgroundColor(i), this._setDefaultPropertiesFromJS(i), this.container.append(i), this.container;
  }
}
var Su, Py;
class ky extends yt {
  constructor(e) {
    const {
      data: s,
      elements: i,
      parent: r
    } = e, a = !!r._commentManager;
    super(e, {
      isRenderable: !a && yt._hasPopupData(s)
    });
    u(this, Su);
    if (this.elements = i, a && yt._hasPopupData(s)) {
      const o = this.popup = b(this, Su, Py).call(this);
      for (const l of i)
        l.popup = o;
    } else
      this.popup = null;
  }
  render() {
    const {
      container: e
    } = this;
    e.classList.add("popupAnnotation"), e.role = "comment";
    const s = this.popup = b(this, Su, Py).call(this), i = [];
    for (const r of this.elements)
      r.popup = s, r.container.ariaHasPopup = "dialog", i.push(r.data.id), r.addHighlightArea();
    return this.container.setAttribute("aria-controls", i.map((r) => `${Ho}${r}`).join(",")), this.container;
  }
}
Su = new WeakSet(), Py = function() {
  return new UE({
    container: this.container,
    color: this.data.color,
    titleObj: this.data.titleObj,
    modificationDate: this.data.modificationDate || this.data.creationDate,
    contentsObj: this.data.contentsObj,
    richText: this.data.richText,
    rect: this.data.rect,
    parentRect: this.data.parentRect || null,
    parent: this.parent,
    elements: this.elements,
    open: this.data.open,
    commentManager: this.parent._commentManager
  });
};
var We, er, rm, am, eh, sh, kt, di, sr, Qa, ih, nh, ui, Xe, Ji, Zi, Pt, tn, ir, Eu, en, rh, Ja, nr, Jt, rr, ah, up, xu, My, Cu, Dy, _u, Iy, oh, fp, Tu, Ly, om, Ww, lm, Xw, hm, Yw, cm, Kw, lh, pp, hh, gp, ku, Fy;
class UE {
  constructor({
    container: t,
    color: e,
    elements: s,
    titleObj: i,
    modificationDate: r,
    contentsObj: a,
    richText: o,
    parent: l,
    rect: h,
    parentRect: c,
    open: d,
    commentManager: p = null
  }) {
    u(this, ah);
    u(this, xu);
    u(this, Cu);
    u(this, _u);
    u(this, oh);
    u(this, Tu);
    u(this, om);
    u(this, lm);
    u(this, hm);
    u(this, cm);
    u(this, lh);
    u(this, hh);
    u(this, ku);
    u(this, We, null);
    u(this, er, b(this, hm, Yw).bind(this));
    u(this, rm, b(this, ku, Fy).bind(this));
    u(this, am, b(this, hh, gp).bind(this));
    u(this, eh, b(this, lh, pp).bind(this));
    u(this, sh, null);
    u(this, kt, null);
    u(this, di, null);
    u(this, sr, null);
    u(this, Qa, null);
    u(this, ih, null);
    u(this, nh, null);
    u(this, ui, !1);
    u(this, Xe, null);
    u(this, Ji, null);
    u(this, Zi, null);
    u(this, Pt, null);
    u(this, tn, null);
    u(this, ir, null);
    u(this, Eu, null);
    u(this, en, null);
    u(this, rh, null);
    u(this, Ja, null);
    u(this, nr, !1);
    u(this, Jt, null);
    u(this, rr, null);
    f(this, kt, t), f(this, rh, i), f(this, di, a), f(this, en, o), f(this, ih, l), f(this, sh, e), f(this, Eu, h), f(this, nh, c), f(this, Qa, s), f(this, We, p), f(this, Jt, s[0]), f(this, sr, Fp.toDateObject(r)), this.trigger = s.flatMap((m) => m.getElementsToTriggerPopup()), p || (b(this, ah, up).call(this), n(this, kt).hidden = !0, d && b(this, lh, pp).call(this));
  }
  renderCommentButton() {
    if (n(this, Pt)) {
      n(this, Pt).parentNode || n(this, Jt).container.after(n(this, Pt));
      return;
    }
    if (n(this, tn) || b(this, xu, My).call(this), !n(this, tn))
      return;
    const {
      signal: t
    } = f(this, Ji, new AbortController()), e = n(this, Jt).hasOwnCommentButton, s = () => {
      n(this, We).toggleCommentPopup(this, !0, void 0, !e);
    }, i = () => {
      n(this, We).toggleCommentPopup(this, !1, !0, !e);
    }, r = () => {
      n(this, We).toggleCommentPopup(this, !1, !1);
    };
    if (e) {
      f(this, Pt, n(this, Jt).container);
      for (const a of this.trigger)
        a.ariaHasPopup = "dialog", a.ariaControls = "commentPopup", a.addEventListener("keydown", n(this, er), {
          signal: t
        }), a.addEventListener("click", s, {
          signal: t
        }), a.addEventListener("pointerenter", i, {
          signal: t
        }), a.addEventListener("pointerleave", r, {
          signal: t
        }), a.classList.add("popupTriggerArea");
    } else {
      const a = f(this, Pt, document.createElement("button"));
      a.className = "annotationCommentButton";
      const o = n(this, Jt).container;
      a.style.zIndex = parseInt(o.style.zIndex, 10) + 1, a.tabIndex = 0, a.ariaHasPopup = "dialog", a.ariaControls = "commentPopup", a.setAttribute("data-l10n-id", "pdfjs-show-comment-button"), b(this, _u, Iy).call(this), b(this, Cu, Dy).call(this), a.addEventListener("keydown", n(this, er), {
        signal: t
      }), a.addEventListener("click", s, {
        signal: t
      }), a.addEventListener("pointerenter", i, {
        signal: t
      }), a.addEventListener("pointerleave", r, {
        signal: t
      }), o.after(a);
    }
  }
  get commentButtonColor() {
    const {
      color: t,
      opacity: e
    } = n(this, Jt).commentData;
    return t ? n(this, ih)._commentManager.makeCommentColor(t, e) : null;
  }
  focusCommentButton() {
    setTimeout(() => {
      var t;
      (t = n(this, Pt)) == null || t.focus();
    }, 0);
  }
  getData() {
    const {
      richText: t,
      color: e,
      opacity: s,
      creationDate: i,
      modificationDate: r
    } = n(this, Jt).commentData;
    return {
      contentsObj: {
        str: this.comment
      },
      richText: t,
      color: e,
      opacity: s,
      creationDate: i,
      modificationDate: r
    };
  }
  get elementBeforePopup() {
    return n(this, Pt);
  }
  get comment() {
    return n(this, rr) || f(this, rr, n(this, Jt).commentText), n(this, rr);
  }
  set comment(t) {
    t !== this.comment && (n(this, Jt).commentText = f(this, rr, t));
  }
  focus() {
    var t;
    (t = n(this, Jt).container) == null || t.focus();
  }
  get parentBoundingClientRect() {
    return n(this, Jt).layer.getBoundingClientRect();
  }
  setCommentButtonStates({
    selected: t,
    hasPopup: e
  }) {
    n(this, Pt) && (n(this, Pt).classList.toggle("selected", t), n(this, Pt).ariaExpanded = e);
  }
  setSelectedCommentButton(t) {
    n(this, Pt).classList.toggle("selected", t);
  }
  get commentPopupPosition() {
    if (n(this, ir))
      return n(this, ir);
    const {
      x: t,
      y: e,
      height: s
    } = n(this, Pt).getBoundingClientRect(), {
      x: i,
      y: r,
      width: a,
      height: o
    } = n(this, Jt).layer.getBoundingClientRect();
    return [(t - i) / a, (e + s - r) / o];
  }
  set commentPopupPosition(t) {
    f(this, ir, t);
  }
  hasDefaultPopupPosition() {
    return n(this, ir) === null;
  }
  get commentButtonPosition() {
    return n(this, tn);
  }
  get commentButtonWidth() {
    return n(this, Pt).getBoundingClientRect().width / this.parentBoundingClientRect.width;
  }
  editComment(t) {
    const [e, s] = n(this, ir) || this.commentButtonPosition.map((h) => h / 100), i = this.parentBoundingClientRect, {
      x: r,
      y: a,
      width: o,
      height: l
    } = i;
    n(this, We).showDialog(null, this, r + e * o, a + s * l, {
      ...t,
      parentDimensions: i
    });
  }
  render() {
    var s, i;
    if (n(this, Xe))
      return;
    const t = f(this, Xe, document.createElement("div"));
    if (t.className = "popup", n(this, sh)) {
      const r = t.style.outlineColor = D.makeHexColor(...n(this, sh));
      t.style.backgroundColor = `color-mix(in srgb, ${r} 30%, white)`;
    }
    const e = document.createElement("span");
    if (e.className = "header", (s = n(this, rh)) != null && s.str) {
      const r = document.createElement("span");
      r.className = "title", e.append(r), {
        dir: r.dir,
        str: r.textContent
      } = n(this, rh);
    }
    if (t.append(e), n(this, sr)) {
      const r = document.createElement("time");
      r.className = "popupDate", r.setAttribute("data-l10n-id", "pdfjs-annotation-date-time-string"), r.setAttribute("data-l10n-args", JSON.stringify({
        dateObj: n(this, sr).valueOf()
      })), r.dateTime = n(this, sr).toISOString(), e.append(r);
    }
    v0({
      html: n(this, oh, fp) || n(this, di).str,
      dir: (i = n(this, di)) == null ? void 0 : i.dir,
      className: "popupContent"
    }, t), n(this, kt).append(t);
  }
  updateEdited({
    rect: t,
    popup: e,
    deleted: s
  }) {
    var i;
    if (n(this, We)) {
      s ? (this.remove(), f(this, rr, null)) : e && (e.deleted ? this.remove() : (b(this, _u, Iy).call(this), f(this, rr, e.text))), t && (f(this, tn, null), b(this, xu, My).call(this), b(this, Cu, Dy).call(this));
      return;
    }
    if (s || e != null && e.deleted) {
      this.remove();
      return;
    }
    b(this, ah, up).call(this), n(this, Ja) || f(this, Ja, {
      contentsObj: n(this, di),
      richText: n(this, en)
    }), t && f(this, Zi, null), e && e.text && (f(this, en, b(this, lm, Xw).call(this, e.text)), f(this, sr, Fp.toDateObject(e.date)), f(this, di, null)), (i = n(this, Xe)) == null || i.remove(), f(this, Xe, null);
  }
  resetEdited() {
    var t;
    n(this, Ja) && ({
      contentsObj: At(this, di)._,
      richText: At(this, en)._
    } = n(this, Ja), f(this, Ja, null), (t = n(this, Xe)) == null || t.remove(), f(this, Xe, null), f(this, Zi, null));
  }
  remove() {
    var t, e, s;
    if ((t = n(this, Ji)) == null || t.abort(), f(this, Ji, null), (e = n(this, Xe)) == null || e.remove(), f(this, Xe, null), f(this, nr, !1), f(this, ui, !1), (s = n(this, Pt)) == null || s.remove(), f(this, Pt, null), this.trigger)
      for (const i of this.trigger)
        i.classList.remove("popupTriggerArea");
  }
  forceHide() {
    f(this, nr, this.isVisible), n(this, nr) && (n(this, kt).hidden = !0);
  }
  maybeShow() {
    n(this, We) || (b(this, ah, up).call(this), n(this, nr) && (n(this, Xe) || b(this, hh, gp).call(this), f(this, nr, !1), n(this, kt).hidden = !1));
  }
  get isVisible() {
    return !n(this, We) && n(this, kt).hidden === !1;
  }
}
We = new WeakMap(), er = new WeakMap(), rm = new WeakMap(), am = new WeakMap(), eh = new WeakMap(), sh = new WeakMap(), kt = new WeakMap(), di = new WeakMap(), sr = new WeakMap(), Qa = new WeakMap(), ih = new WeakMap(), nh = new WeakMap(), ui = new WeakMap(), Xe = new WeakMap(), Ji = new WeakMap(), Zi = new WeakMap(), Pt = new WeakMap(), tn = new WeakMap(), ir = new WeakMap(), Eu = new WeakMap(), en = new WeakMap(), rh = new WeakMap(), Ja = new WeakMap(), nr = new WeakMap(), Jt = new WeakMap(), rr = new WeakMap(), ah = new WeakSet(), up = function() {
  var e;
  if (n(this, Ji))
    return;
  f(this, Ji, new AbortController());
  const {
    signal: t
  } = n(this, Ji);
  for (const s of this.trigger)
    s.addEventListener("click", n(this, eh), {
      signal: t
    }), s.addEventListener("pointerenter", n(this, am), {
      signal: t
    }), s.addEventListener("pointerleave", n(this, rm), {
      signal: t
    }), s.classList.add("popupTriggerArea");
  for (const s of n(this, Qa))
    (e = s.container) == null || e.addEventListener("keydown", n(this, er), {
      signal: t
    });
}, xu = new WeakSet(), My = function() {
  const t = n(this, Qa).find((e) => e.hasCommentButton);
  t && f(this, tn, t._normalizePoint(t.commentButtonPosition));
}, Cu = new WeakSet(), Dy = function() {
  if (n(this, Jt).extraPopupElement && !n(this, Jt).editor)
    return;
  n(this, Pt) || this.renderCommentButton();
  const [t, e] = n(this, tn), {
    style: s
  } = n(this, Pt);
  s.left = `calc(${t}%)`, s.top = `calc(${e}% - var(--comment-button-dim))`;
}, _u = new WeakSet(), Iy = function() {
  n(this, Jt).extraPopupElement || (n(this, Pt) || this.renderCommentButton(), n(this, Pt).style.backgroundColor = this.commentButtonColor || "");
}, oh = new WeakSet(), fp = function() {
  const t = n(this, en), e = n(this, di);
  return t != null && t.str && (!(e != null && e.str) || e.str === t.str) && n(this, en).html || null;
}, Tu = new WeakSet(), Ly = function() {
  var t, e, s;
  return ((s = (e = (t = n(this, oh, fp)) == null ? void 0 : t.attributes) == null ? void 0 : e.style) == null ? void 0 : s.fontSize) || 0;
}, om = new WeakSet(), Ww = function() {
  var t, e, s;
  return ((s = (e = (t = n(this, oh, fp)) == null ? void 0 : t.attributes) == null ? void 0 : e.style) == null ? void 0 : s.color) || null;
}, lm = new WeakSet(), Xw = function(t) {
  const e = [], s = {
    str: t,
    html: {
      name: "div",
      attributes: {
        dir: "auto"
      },
      children: [{
        name: "p",
        children: e
      }]
    }
  }, i = {
    style: {
      color: n(this, om, Ww),
      fontSize: n(this, Tu, Ly) ? `calc(${n(this, Tu, Ly)}px * var(--total-scale-factor))` : ""
    }
  };
  for (const r of t.split(`
`))
    e.push({
      name: "span",
      value: r,
      attributes: i
    });
  return s;
}, hm = new WeakSet(), Yw = function(t) {
  t.altKey || t.shiftKey || t.ctrlKey || t.metaKey || (t.key === "Enter" || t.key === "Escape" && n(this, ui)) && b(this, lh, pp).call(this);
}, cm = new WeakSet(), Kw = function() {
  if (n(this, Zi) !== null)
    return;
  const {
    page: {
      view: t
    },
    viewport: {
      rawDims: {
        pageWidth: e,
        pageHeight: s,
        pageX: i,
        pageY: r
      }
    }
  } = n(this, ih);
  let a = !!n(this, nh), o = a ? n(this, nh) : n(this, Eu);
  for (const y of n(this, Qa))
    if (!o || D.intersect(y.data.rect, o) !== null) {
      o = y.data.rect, a = !0;
      break;
    }
  const l = D.normalizeRect([o[0], t[3] - o[1] + t[1], o[2], t[3] - o[3] + t[1]]), h = 5, c = a ? o[2] - o[0] + h : 0, d = l[0] + c, p = l[1];
  f(this, Zi, [100 * (d - i) / e, 100 * (p - r) / s]);
  const {
    style: m
  } = n(this, kt);
  m.left = `${n(this, Zi)[0]}%`, m.top = `${n(this, Zi)[1]}%`;
}, lh = new WeakSet(), pp = function() {
  if (n(this, We)) {
    n(this, We).toggleCommentPopup(this, !1);
    return;
  }
  f(this, ui, !n(this, ui)), n(this, ui) ? (b(this, hh, gp).call(this), n(this, kt).addEventListener("click", n(this, eh)), n(this, kt).addEventListener("keydown", n(this, er))) : (b(this, ku, Fy).call(this), n(this, kt).removeEventListener("click", n(this, eh)), n(this, kt).removeEventListener("keydown", n(this, er)));
}, hh = new WeakSet(), gp = function() {
  n(this, Xe) || this.render(), this.isVisible ? n(this, ui) && n(this, kt).classList.add("focused") : (b(this, cm, Kw).call(this), n(this, kt).hidden = !1, n(this, kt).style.zIndex = parseInt(n(this, kt).style.zIndex, 10) + 1e3);
}, ku = new WeakSet(), Fy = function() {
  n(this, kt).classList.remove("focused"), !(n(this, ui) || !this.isVisible) && (n(this, kt).hidden = !0, n(this, kt).style.zIndex = parseInt(n(this, kt).style.zIndex, 10) - 1e3);
};
class qw extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.textContent = t.data.textContent, this.textPosition = t.data.textPosition, this.annotationEditorType = G.FREETEXT;
  }
  render() {
    if (this.container.classList.add("freeTextAnnotation"), this.textContent) {
      const t = this.contentElement = document.createElement("div");
      t.classList.add("annotationTextContent"), t.setAttribute("role", "comment");
      for (const e of this.textContent) {
        const s = document.createElement("span");
        s.textContent = e, t.append(s);
      }
      this.container.append(t);
    }
    return !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this._editOnDoubleClick(), this.container;
  }
}
var Pu;
class GE extends yt {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    u(this, Pu, null);
  }
  render() {
    this.container.classList.add("lineAnnotation");
    const {
      data: e,
      width: s,
      height: i
    } = this, r = this.svgFactory.create(s, i, !0), a = f(this, Pu, this.svgFactory.createElement("svg:line"));
    return a.setAttribute("x1", e.rect[2] - e.lineCoordinates[0]), a.setAttribute("y1", e.rect[3] - e.lineCoordinates[1]), a.setAttribute("x2", e.rect[2] - e.lineCoordinates[2]), a.setAttribute("y2", e.rect[3] - e.lineCoordinates[3]), a.setAttribute("stroke-width", e.borderStyle.width || 1), a.setAttribute("stroke", "transparent"), a.setAttribute("fill", "transparent"), r.append(a), this.container.append(r), !e.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return n(this, Pu);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
Pu = new WeakMap();
var Mu;
class $E extends yt {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    u(this, Mu, null);
  }
  render() {
    this.container.classList.add("squareAnnotation");
    const {
      data: e,
      width: s,
      height: i
    } = this, r = this.svgFactory.create(s, i, !0), a = e.borderStyle.width, o = f(this, Mu, this.svgFactory.createElement("svg:rect"));
    return o.setAttribute("x", a / 2), o.setAttribute("y", a / 2), o.setAttribute("width", s - a), o.setAttribute("height", i - a), o.setAttribute("stroke-width", a || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), r.append(o), this.container.append(r), !e.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return n(this, Mu);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
Mu = new WeakMap();
var Du;
class zE extends yt {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    u(this, Du, null);
  }
  render() {
    this.container.classList.add("circleAnnotation");
    const {
      data: e,
      width: s,
      height: i
    } = this, r = this.svgFactory.create(s, i, !0), a = e.borderStyle.width, o = f(this, Du, this.svgFactory.createElement("svg:ellipse"));
    return o.setAttribute("cx", s / 2), o.setAttribute("cy", i / 2), o.setAttribute("rx", s / 2 - a / 2), o.setAttribute("ry", i / 2 - a / 2), o.setAttribute("stroke-width", a || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), r.append(o), this.container.append(r), !e.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return n(this, Du);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
Du = new WeakMap();
var Iu;
class Qw extends yt {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    u(this, Iu, null);
    this.containerClassName = "polylineAnnotation", this.svgElementName = "svg:polyline";
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const {
      data: {
        rect: e,
        vertices: s,
        borderStyle: i,
        popupRef: r
      },
      width: a,
      height: o
    } = this;
    if (!s)
      return this.container;
    const l = this.svgFactory.create(a, o, !0);
    let h = [];
    for (let d = 0, p = s.length; d < p; d += 2) {
      const m = s[d] - e[0], y = e[3] - s[d + 1];
      h.push(`${m},${y}`);
    }
    h = h.join(" ");
    const c = f(this, Iu, this.svgFactory.createElement(this.svgElementName));
    return c.setAttribute("points", h), c.setAttribute("stroke-width", i.width || 1), c.setAttribute("stroke", "transparent"), c.setAttribute("fill", "transparent"), l.append(c), this.container.append(l), !r && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return n(this, Iu);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
Iu = new WeakMap();
class VE extends Qw {
  constructor(t) {
    super(t), this.containerClassName = "polygonAnnotation", this.svgElementName = "svg:polygon";
  }
}
class jE extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    });
  }
  render() {
    return this.container.classList.add("caretAnnotation"), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
}
var Lu, Za, Fu, Ry;
class TA extends yt {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    u(this, Fu);
    u(this, Lu, null);
    u(this, Za, []);
    this.containerClassName = "inkAnnotation", this.svgElementName = "svg:polyline", this.annotationEditorType = this.data.it === "InkHighlight" ? G.HIGHLIGHT : G.INK;
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const {
      data: {
        rect: e,
        rotation: s,
        inkLists: i,
        borderStyle: r,
        popupRef: a
      }
    } = this, {
      transform: o,
      width: l,
      height: h
    } = b(this, Fu, Ry).call(this, s, e), c = this.svgFactory.create(l, h, !0), d = f(this, Lu, this.svgFactory.createElement("svg:g"));
    c.append(d), d.setAttribute("stroke-width", r.width || 1), d.setAttribute("stroke-linecap", "round"), d.setAttribute("stroke-linejoin", "round"), d.setAttribute("stroke-miterlimit", 10), d.setAttribute("stroke", "transparent"), d.setAttribute("fill", "transparent"), d.setAttribute("transform", o);
    for (const p of i) {
      const m = this.svgFactory.createElement(this.svgElementName);
      n(this, Za).push(m), m.setAttribute("points", p.join(",")), d.append(m);
    }
    return !a && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.append(c), this._editOnDoubleClick(), this.container;
  }
  updateEdited(e) {
    super.updateEdited(e);
    const {
      thickness: s,
      points: i,
      rect: r
    } = e, a = n(this, Lu);
    if (s >= 0 && a.setAttribute("stroke-width", s || 1), i)
      for (let o = 0, l = n(this, Za).length; o < l; o++)
        n(this, Za)[o].setAttribute("points", i[o].join(","));
    if (r) {
      const {
        transform: o,
        width: l,
        height: h
      } = b(this, Fu, Ry).call(this, this.data.rotation, r);
      a.parentElement.setAttribute("viewBox", `0 0 ${l} ${h}`), a.setAttribute("transform", o);
    }
  }
  getElementsToTriggerPopup() {
    return n(this, Za);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
Lu = new WeakMap(), Za = new WeakMap(), Fu = new WeakSet(), Ry = function(e, s) {
  switch (e) {
    case 90:
      return {
        transform: `rotate(90) translate(${-s[0]},${s[1]}) scale(1,-1)`,
        width: s[3] - s[1],
        height: s[2] - s[0]
      };
    case 180:
      return {
        transform: `rotate(180) translate(${-s[2]},${s[1]}) scale(1,-1)`,
        width: s[2] - s[0],
        height: s[3] - s[1]
      };
    case 270:
      return {
        transform: `rotate(270) translate(${-s[2]},${s[3]}) scale(1,-1)`,
        width: s[3] - s[1],
        height: s[2] - s[0]
      };
    default:
      return {
        transform: `translate(${-s[0]},${s[3]}) scale(1,-1)`,
        width: s[2] - s[0],
        height: s[3] - s[1]
      };
  }
};
class Jw extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    }), this.annotationEditorType = G.HIGHLIGHT;
  }
  render() {
    const {
      data: {
        overlaidText: t,
        popupRef: e
      }
    } = this;
    if (!e && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("highlightAnnotation"), this._editOnDoubleClick(), t) {
      const s = document.createElement("mark");
      s.classList.add("overlaidText"), s.textContent = t, this.container.append(s);
    }
    return this.container;
  }
}
class WE extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: t,
        popupRef: e
      }
    } = this;
    if (!e && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("underlineAnnotation"), t) {
      const s = document.createElement("u");
      s.classList.add("overlaidText"), s.textContent = t, this.container.append(s);
    }
    return this.container;
  }
}
class XE extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: t,
        popupRef: e
      }
    } = this;
    if (!e && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("squigglyAnnotation"), t) {
      const s = document.createElement("u");
      s.classList.add("overlaidText"), s.textContent = t, this.container.append(s);
    }
    return this.container;
  }
}
class YE extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: t,
        popupRef: e
      }
    } = this;
    if (!e && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("strikeoutAnnotation"), t) {
      const s = document.createElement("s");
      s.classList.add("overlaidText"), s.textContent = t, this.container.append(s);
    }
    return this.container;
  }
}
class Zw extends yt {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.annotationEditorType = G.STAMP;
  }
  render() {
    return this.container.classList.add("stampAnnotation"), this.container.setAttribute("role", "img"), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this._editOnDoubleClick(), this.container;
  }
}
var Ru, Ou, Oy;
class KE extends yt {
  constructor(e) {
    var r;
    super(e, {
      isRenderable: !0
    });
    u(this, Ou);
    u(this, Ru, null);
    const {
      fileId: s,
      file: i
    } = this.data;
    this.filename = i.filename, this.content = i.content, this.fileId = s, (r = this.linkService.eventBus) == null || r.dispatch("fileattachmentannotation", {
      source: this,
      attachmentId: this.fileId,
      ...i
    });
  }
  render() {
    this.container.classList.add("fileAttachmentAnnotation");
    const {
      container: e,
      data: s
    } = this;
    let i;
    s.hasAppearance || s.fillAlpha === 0 ? i = document.createElement("div") : (i = document.createElement("img"), i.src = `${this.imageResourcesPath}annotation-${/paperclip/i.test(s.name) ? "paperclip" : "pushpin"}.svg`, s.fillAlpha && s.fillAlpha < 1 && (i.style = `filter: opacity(${Math.round(s.fillAlpha * 100)}%);`)), i.addEventListener("dblclick", b(this, Ou, Oy).bind(this)), f(this, Ru, i);
    const {
      isMac: r
    } = rt.platform;
    return e.addEventListener("keydown", (a) => {
      a.key === "Enter" && (r ? a.metaKey : a.ctrlKey) && b(this, Ou, Oy).call(this);
    }), !s.popupRef && this.hasPopupData ? (this.hasOwnCommentButton = !0, this._createPopup()) : i.classList.add("popupTriggerArea"), e.append(i), e;
  }
  getElementsToTriggerPopup() {
    return n(this, Ru);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
Ru = new WeakMap(), Ou = new WeakSet(), Oy = async function() {
  var a;
  const {
    fileId: e,
    filename: s,
    content: i
  } = this, r = await this.linkService.getAttachmentContent(e) || i;
  r && ((a = this.downloadManager) == null || a.openOrDownloadData(r, s));
};
var ch, to, sn, dm, ev, Nu, Ny;
class tv extends yt {
  constructor(e) {
    super(e, {
      isRenderable: !!e.data.richMedia
    });
    u(this, dm);
    u(this, Nu);
    u(this, ch, new AbortController());
    u(this, to, null);
    u(this, sn, null);
  }
  render() {
    this.container.classList.add("mediaAnnotation");
    const {
      filename: e
    } = this.data.richMedia, s = document.createElement("button");
    return s.className = "mediaPlayButton", s.type = "button", s.title = s.ariaLabel = e, s.addEventListener("click", () => b(this, dm, ev).call(this, s), {
      signal: n(this, ch).signal
    }), this.container.append(s), this.container;
  }
  destroy() {
    n(this, ch).abort(), n(this, sn) && (n(this, sn).pause(), n(this, sn).removeAttribute("src"), n(this, sn).load(), f(this, sn, null)), b(this, Nu, Ny).call(this);
  }
}
ch = new WeakMap(), to = new WeakMap(), sn = new WeakMap(), dm = new WeakSet(), ev = async function(e) {
  const {
    fileId: s,
    filename: i,
    contentType: r
  } = this.data.richMedia;
  e.disabled = !0;
  let a;
  try {
    a = await this.linkService.getAttachmentContent(s);
  } catch {
    return;
  } finally {
    e.disabled = !1;
  }
  if (!a || !e.isConnected)
    return;
  const {
    signal: o
  } = n(this, ch), l = URL.createObjectURL(new Blob([a], {
    type: r
  }));
  f(this, to, l);
  const h = r.startsWith("audio/"), c = document.createElement(h ? "audio" : "video");
  if (f(this, sn, c), c.className = "mediaContent", this._setBackgroundColor(c), c.src = l, c.title = i, c.controls = !0, c.autoplay = !0, c.tabIndex = 0, h) {
    let d = !1, p = !1;
    const m = () => {
      c.controls = d || p;
    };
    this.container.addEventListener("pointerenter", () => {
      d = !0, m();
    }, {
      signal: o
    }), this.container.addEventListener("pointerleave", () => {
      d = !1, m();
    }, {
      signal: o
    }), this.container.addEventListener("focusin", () => {
      p = !0, m();
    }, {
      signal: o
    }), this.container.addEventListener("focusout", () => {
      p = !1, m();
    }, {
      signal: o
    });
  }
  c.addEventListener("emptied", () => b(this, Nu, Ny).call(this, l), {
    once: !0,
    signal: o
  }), e.replaceWith(c), c.play().catch(() => {
  });
}, Nu = new WeakSet(), Ny = function(e = n(this, to)) {
  e && e === n(this, to) && (URL.revokeObjectURL(e), f(this, to, null));
};
var ar, eo, dh, nn, uh, so, ge, Bu, fh, mp, ph, bp;
const BA = class BA {
  constructor({
    div: t,
    accessibilityManager: e,
    annotationCanvasMap: s,
    annotationEditorUIManager: i,
    page: r,
    viewport: a,
    structTreeLayer: o,
    commentManager: l,
    linkService: h,
    annotationStorage: c
  }) {
    u(this, fh);
    u(this, ph);
    u(this, ar, null);
    u(this, eo, null);
    u(this, dh, null);
    u(this, nn, /* @__PURE__ */ new Map());
    u(this, uh, null);
    u(this, so, null);
    u(this, ge, []);
    u(this, Bu, !1);
    T(this, "zIndex", 0);
    this.div = t, f(this, ar, e), f(this, eo, s), f(this, uh, o || null), f(this, so, h || null), f(this, dh, c || new xA()), this.page = r, this.viewport = a, this._annotationEditorUIManager = i, this._commentManager = l || null;
  }
  hasEditableAnnotations() {
    return n(this, nn).size > 0;
  }
  async render(t) {
    var l;
    const {
      annotations: e,
      optionalContentConfig: s
    } = t, i = this.div;
    To(i, this.viewport);
    const r = /* @__PURE__ */ new Map(), a = [], o = {
      data: null,
      layer: i,
      linkService: n(this, so),
      downloadManager: t.downloadManager,
      imageResourcesPath: t.imageResourcesPath || "",
      renderForms: t.renderForms !== !1,
      svgFactory: new Hp(),
      annotationStorage: n(this, dh),
      enableComment: t.enableComment === !0,
      enableScripting: t.enableScripting === !0,
      hasJSActions: t.hasJSActions,
      fieldObjects: t.fieldObjects,
      parent: this,
      elements: null
    };
    for (const h of e) {
      if (h.noHTML)
        continue;
      const c = h.annotationType === wt.POPUP;
      if (c) {
        const m = r.get(h.id);
        if (!m)
          continue;
        if (!this._commentManager) {
          a.push(h);
          continue;
        }
        o.elements = m;
      } else if (h.rect[2] === h.rect[0] || h.rect[3] === h.rect[1])
        continue;
      o.data = h;
      const d = vb.create(o);
      if (!d.isRenderable)
        continue;
      c || (n(this, ge).push(d), h.popupRef && r.getOrInsertComputed(h.popupRef, Zh).push(d));
      const p = d.render();
      h.hidden && (p.style.visibility = "hidden"), d.updateOC(s), d._isEditable && (n(this, nn).set(d.data.id, d), (l = this._annotationEditorUIManager) == null || l.renderAnnotationElement(d));
    }
    await b(this, fh, mp).call(this);
    for (const h of a) {
      const c = o.elements = r.get(h.id);
      o.data = h;
      const d = vb.create(o);
      if (!d.isRenderable)
        continue;
      const p = d.render();
      d.contentElement.id = `${Ho}${h.id}`, h.hidden && (p.style.visibility = "hidden"), c.at(-1).container.after(p);
    }
    b(this, ph, bp).call(this);
  }
  async addLinkAnnotations(t) {
    const e = {
      data: null,
      layer: this.div,
      linkService: n(this, so),
      svgFactory: new Hp(),
      parent: this
    };
    for (const s of t) {
      s.borderStyle || (s.borderStyle = BA._defaultBorderStyle), e.data = s;
      const i = vb.create(e);
      i.isRenderable && (i.render(), i.contentElement.id = `${Ho}${s.id}`, n(this, ge).push(i));
    }
    await b(this, fh, mp).call(this);
  }
  update({
    viewport: t,
    optionalContentConfig: e
  }) {
    const s = this.div;
    this.viewport = t, To(s, {
      rotation: t.rotation
    });
    for (const i of n(this, ge))
      i.updateOC(e);
    b(this, ph, bp).call(this), s.hidden = !1;
  }
  destroy() {
    var t, e;
    for (const s of n(this, ge))
      (t = s.destroy) == null || t.call(s), (e = n(this, ar)) == null || e.removePointerInTextLayer(s.contentElement);
    n(this, ge).length = 0, n(this, nn).clear(), this.div.replaceChildren();
  }
  refreshCanvases() {
    b(this, ph, bp).call(this);
  }
  getEditableAnnotations() {
    return n(this, nn).values();
  }
  getEditableAnnotation(t) {
    return n(this, nn).get(t);
  }
  addFakeAnnotation(t) {
    const {
      div: e
    } = this, {
      id: s,
      rotation: i
    } = t, r = new IE({
      data: {
        id: s,
        rect: t.getPDFRect(),
        rotation: i
      },
      editor: t,
      layer: e,
      parent: this,
      enableComment: !!this._commentManager,
      linkService: n(this, so),
      annotationStorage: n(this, dh)
    });
    return r.render(), r.contentElement.id = `${Ho}${s}`, r.createOrUpdatePopup(), n(this, ge).push(r), r;
  }
  removeAnnotation(t) {
    var i;
    const e = n(this, ge).findIndex((r) => r.data.id === t);
    if (e < 0)
      return;
    const [s] = n(this, ge).splice(e, 1);
    (i = n(this, ar)) == null || i.removePointerInTextLayer(s.contentElement);
  }
  updateFakeAnnotations(t) {
    if (t.length !== 0) {
      for (const e of t)
        e.updateFakeAnnotationElement(this);
      b(this, fh, mp).call(this);
    }
  }
  togglePointerEvents(t = !1) {
    this.div.classList.toggle("disabled", !t);
  }
  static get _defaultBorderStyle() {
    return H(this, "_defaultBorderStyle", Object.freeze({
      width: 1,
      rawWidth: 1,
      style: Fo.SOLID,
      dashArray: [3],
      horizontalCornerRadius: 0,
      verticalCornerRadius: 0
    }));
  }
};
ar = new WeakMap(), eo = new WeakMap(), dh = new WeakMap(), nn = new WeakMap(), uh = new WeakMap(), so = new WeakMap(), ge = new WeakMap(), Bu = new WeakMap(), fh = new WeakSet(), mp = async function() {
  var s, i, r, a;
  if (n(this, ge).length === 0)
    return;
  this.div.replaceChildren();
  const t = [];
  if (!n(this, Bu)) {
    f(this, Bu, !0);
    for (const {
      contentElement: o,
      data: {
        hidden: l,
        id: h,
        oc: c
      }
    } of n(this, ge)) {
      const d = o.id = `${Ho}${h}`, p = o.localName === "a" && !l && !c;
      t.push((s = n(this, uh)) == null ? void 0 : s.getAriaAttributes(d, {
        enableLinkOwnership: p
      }).then((m) => {
        if (m)
          for (const [y, A] of m)
            o.setAttribute(y, A);
      }));
    }
  }
  n(this, ge).sort(({
    data: {
      rect: [o, l, h, c]
    }
  }, {
    data: {
      rect: [d, p, m, y]
    }
  }) => {
    if (o === h && l === c)
      return 1;
    if (d === m && p === y)
      return -1;
    const A = c, v = l, w = (l + c) / 2, S = y, E = p, x = (p + y) / 2;
    if (w >= S && x <= v)
      return -1;
    if (x >= A && w <= E)
      return 1;
    const C = (o + h) / 2, _ = (d + m) / 2;
    return C - _;
  });
  const e = document.createDocumentFragment();
  for (const o of n(this, ge))
    e.append(o.container), this._commentManager ? (r = ((i = o.extraPopupElement) == null ? void 0 : i.popup) || o.popup) == null || r.renderCommentButton() : o.extraPopupElement && e.append(o.extraPopupElement.render());
  if (this.div.append(e), await Promise.all(t), n(this, ar)) {
    const o = await ((a = n(this, uh)) == null ? void 0 : a.getAnnotationIds());
    for (const {
      contentElement: l
    } of n(this, ge))
      o != null && o.has(l.id) || n(this, ar).addPointerInTextLayer(l, !1);
  }
}, ph = new WeakSet(), bp = function() {
  var e;
  if (!n(this, eo))
    return;
  const t = this.div;
  for (const [s, i] of n(this, eo)) {
    const r = t.querySelector(`[data-annotation-id="${s}"]`);
    if (!r)
      continue;
    if (Array.isArray(i))
      for (const c of i)
        c.className = "annotationContent", c.ariaHidden = !0;
    else
      i.className = "annotationContent", i.ariaHidden = !0;
    const a = [];
    for (const c of r.children)
      c.nodeName === "CANVAS" && a.push(c);
    for (const c of a)
      c.remove();
    const o = Array.isArray(i) ? i[0] : i, {
      firstChild: l
    } = r;
    if (l ? l.classList.contains("annotationContent") ? l.after(o) : l.before(o) : r.append(o), Array.isArray(i)) {
      let c = o;
      for (let d = 1, p = i.length; d < p; d++)
        c.after(i[d]), c = i[d];
    }
    n(this, eo).delete(s);
    const h = n(this, nn).get(s);
    h && (h._hasNoCanvas ? ((e = this._annotationEditorUIManager) == null || e.setMissingCanvas(s, r.id, i), h._hasNoCanvas = !1) : h.canvas = i);
  }
};
let By = BA;
const $f = /\r\n?|\n/g;
var Ye, Hu, io, Ke, um, sv, fm, iv, pm, nv, gh, yp, mh, Ap, bh, wp, gm, rv, Uu, Uy, mm, av;
const lt = class lt extends at {
  constructor(e) {
    super({
      ...e,
      name: "freeTextEditor"
    });
    u(this, um);
    u(this, fm);
    u(this, pm);
    u(this, gh);
    u(this, bh);
    u(this, gm);
    u(this, mm);
    u(this, Ye, "");
    u(this, Hu, `${this.id}-editor`);
    u(this, io, null);
    u(this, Ke, void 0);
    T(this, "_colorPicker", null);
    this.color = e.color || lt._defaultColor || at._defaultLineColor, f(this, Ke, e.fontSize || lt._defaultFontSize), this.annotationElementId || this._uiManager.a11yAlert(at._l10nAlert.freetext), this.canAddComment = !1;
  }
  static get _keyboardManager() {
    const e = lt.prototype, s = (a) => a.isEmpty(), i = Po.TRANSLATE_SMALL, r = Po.TRANSLATE_BIG;
    return H(this, "_keyboardManager", new ko([[["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], e.commitOrRemove, {
      bubbles: !0
    }], [["ctrl+Enter", "mac+meta+Enter"], e.commitOrRemove], [["Escape"], e.commitOrRemove], [["ArrowLeft"], e._translateEmpty, {
      args: [-i, 0],
      checker: s
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], e._translateEmpty, {
      args: [-r, 0],
      checker: s
    }], [["ArrowRight"], e._translateEmpty, {
      args: [i, 0],
      checker: s
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], e._translateEmpty, {
      args: [r, 0],
      checker: s
    }], [["ArrowUp"], e._translateEmpty, {
      args: [0, -i],
      checker: s
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], e._translateEmpty, {
      args: [0, -r],
      checker: s
    }], [["ArrowDown"], e._translateEmpty, {
      args: [0, i],
      checker: s
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], e._translateEmpty, {
      args: [0, r],
      checker: s
    }]]));
  }
  static initialize(e, s) {
    at.initialize(e, s);
    const i = getComputedStyle(document.documentElement);
    this._internalPadding = parseFloat(i.getPropertyValue("--freetext-padding"));
  }
  static updateDefaultParams(e, s) {
    switch (e) {
      case Y.FREETEXT_SIZE:
        lt._defaultFontSize = s;
        break;
      case Y.FREETEXT_COLOR:
        lt._defaultColor = s;
        break;
    }
  }
  updateParams(e, s) {
    switch (e) {
      case Y.FREETEXT_SIZE:
        b(this, um, sv).call(this, s);
        break;
      case Y.FREETEXT_COLOR:
        b(this, fm, iv).call(this, s);
        break;
    }
  }
  static get defaultPropertiesToUpdate() {
    return [[Y.FREETEXT_SIZE, lt._defaultFontSize], [Y.FREETEXT_COLOR, lt._defaultColor || at._defaultLineColor]];
  }
  get propertiesToUpdate() {
    return [[Y.FREETEXT_SIZE, n(this, Ke)], [Y.FREETEXT_COLOR, this.color]];
  }
  get toolbarButtons() {
    return this._colorPicker || (this._colorPicker = new Bp(this)), [["colorPicker", this._colorPicker]];
  }
  get colorType() {
    return Y.FREETEXT_COLOR;
  }
  onUpdatedColor() {
    var e;
    this.editorDiv.style.color = this.color, (e = this._colorPicker) == null || e.update(this.color), super.onUpdatedColor();
  }
  _translateEmpty(e, s) {
    this._uiManager.translateSelectedEditors(e, s, !0);
  }
  getInitialTranslation() {
    const e = this.parentScale;
    return [-lt._internalPadding * e, -(lt._internalPadding + n(this, Ke)) * e];
  }
  rebuild() {
    this.parent && (super.rebuild(), this.div !== null && (this.isAttachedToDOM || this.parent.add(this)));
  }
  enableEditMode() {
    if (!super.enableEditMode())
      return !1;
    this.overlayDiv.classList.remove("enabled"), this.editorDiv.contentEditable = !0, this._isDraggable = !1, this.div.removeAttribute("aria-activedescendant"), f(this, io, new AbortController());
    const e = this._uiManager.combinedSignal(n(this, io));
    return this.editorDiv.addEventListener("keydown", this.editorDivKeydown.bind(this), {
      signal: e
    }), this.editorDiv.addEventListener("focus", this.editorDivFocus.bind(this), {
      signal: e
    }), this.editorDiv.addEventListener("blur", this.editorDivBlur.bind(this), {
      signal: e
    }), this.editorDiv.addEventListener("input", this.editorDivInput.bind(this), {
      signal: e
    }), this.editorDiv.addEventListener("paste", this.editorDivPaste.bind(this), {
      signal: e
    }), !0;
  }
  disableEditMode() {
    var e;
    return super.disableEditMode() ? (this.overlayDiv.classList.add("enabled"), this.editorDiv.contentEditable = !1, this.div.setAttribute("aria-activedescendant", n(this, Hu)), this._isDraggable = !0, (e = n(this, io)) == null || e.abort(), f(this, io, null), this.div.focus({
      preventScroll: !0
    }), this.isEditing = !1, this.parent.div.classList.add("freetextEditing"), !0) : !1;
  }
  focusin(e) {
    this._focusEventsAllowed && (super.focusin(e), e.target !== this.editorDiv && this.editorDiv.focus());
  }
  onceAdded(e) {
    var s;
    this.width || (this.enableEditMode(), e && this.editorDiv.focus(), (s = this._initialOptions) != null && s.isCentered && this.center(), this._initialOptions = null);
  }
  isEmpty() {
    return !this.editorDiv || this.editorDiv.innerText.trim() === "";
  }
  remove() {
    this.isEditing = !1, this.parent && (this.parent.setEditingState(!0), this.parent.div.classList.add("freetextEditing")), super.remove();
  }
  commit() {
    if (!this.isInEditMode())
      return;
    super.commit(), this.disableEditMode();
    const e = n(this, Ye), s = f(this, Ye, b(this, pm, nv).call(this).trimEnd());
    if (e === s)
      return;
    const i = (r) => {
      if (f(this, Ye, r), !r) {
        this.remove();
        return;
      }
      b(this, bh, wp).call(this), this._uiManager.rebuild(this), b(this, gh, yp).call(this);
    };
    this.addCommands({
      cmd: () => {
        i(s);
      },
      undo: () => {
        i(e);
      },
      mustExec: !1
    }), b(this, gh, yp).call(this);
  }
  shouldGetKeyboardEvents() {
    return this.isInEditMode();
  }
  enterInEditMode() {
    this.enableEditMode(), this.editorDiv.focus();
  }
  keydown(e) {
    e.target === this.div && e.key === "Enter" && (this.enterInEditMode(), e.preventDefault());
  }
  editorDivKeydown(e) {
    lt._keyboardManager.exec(this, e);
  }
  editorDivFocus(e) {
    this.isEditing = !0;
  }
  editorDivBlur(e) {
    this.isEditing = !1;
  }
  editorDivInput(e) {
    this.parent.div.classList.toggle("freetextEditing", this.isEmpty());
  }
  disableEditing() {
    this.editorDiv.setAttribute("role", "comment"), this.editorDiv.removeAttribute("aria-multiline");
  }
  enableEditing() {
    this.editorDiv.setAttribute("role", "textbox"), this.editorDiv.setAttribute("aria-multiline", !0);
  }
  get canChangeContent() {
    return !0;
  }
  render() {
    if (this.div)
      return this.div;
    let e, s;
    (this._isCopy || this.annotationElementId) && (e = this.x, s = this.y), super.render(), this.editorDiv = document.createElement("div"), this.editorDiv.className = "internal", this.editorDiv.setAttribute("id", n(this, Hu)), this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text2"), this.editorDiv.setAttribute("data-l10n-attrs", "default-content"), this.enableEditing(), this.editorDiv.contentEditable = !0;
    const {
      style: i
    } = this.editorDiv;
    if (i.fontSize = `calc(${n(this, Ke)}px * var(--total-scale-factor))`, i.color = this.color, this.div.append(this.editorDiv), this.overlayDiv = document.createElement("div"), this.overlayDiv.classList.add("overlay", "enabled"), this.div.append(this.overlayDiv), this._isCopy || this.annotationElementId) {
      const [r, a] = this.parentDimensions;
      if (this.annotationElementId) {
        const {
          position: o
        } = this._initialData;
        let [l, h] = this.getInitialTranslation();
        [l, h] = this.pageTranslationToScreen(l, h);
        const [c, d] = this.pageDimensions, [p, m] = this.pageTranslation;
        let y, A;
        switch (this.rotation) {
          case 0:
            y = e + (o[0] - p) / c, A = s + this.height - (o[1] - m) / d;
            break;
          case 90:
            y = e + (o[0] - p) / c, A = s - (o[1] - m) / d, [l, h] = [h, -l];
            break;
          case 180:
            y = e - this.width + (o[0] - p) / c, A = s - (o[1] - m) / d, [l, h] = [-l, -h];
            break;
          case 270:
            y = e + (o[0] - p - this.height * d) / c, A = s + (o[1] - m - this.width * c) / d, [l, h] = [-h, l];
            break;
        }
        this.setAt(y * r, A * a, l, h);
      } else
        this._moveAfterPaste(e, s);
      b(this, bh, wp).call(this), this._isDraggable = !0, this.editorDiv.contentEditable = !1;
    } else
      this._isDraggable = !1, this.editorDiv.contentEditable = !0;
    return this.div;
  }
  editorDivPaste(e) {
    var y, A, v;
    const s = e.clipboardData || window.clipboardData, {
      types: i
    } = s;
    if (i.length === 1 && i[0] === "text/plain")
      return;
    e.preventDefault();
    const r = b(y = lt, Uu, Uy).call(y, s.getData("text") || "").replaceAll($f, `
`);
    if (!r)
      return;
    const a = window.getSelection();
    if (!a.rangeCount)
      return;
    this.editorDiv.normalize(), a.deleteFromDocument();
    const o = a.getRangeAt(0);
    if (!r.includes(`
`)) {
      o.insertNode(document.createTextNode(r)), this.editorDiv.normalize(), a.collapseToStart();
      return;
    }
    const {
      startContainer: l,
      startOffset: h
    } = o, c = [], d = [];
    if (l.nodeType === Node.TEXT_NODE) {
      const w = l.parentElement;
      if (d.push(l.nodeValue.slice(h).replaceAll($f, "")), w !== this.editorDiv) {
        let S = c;
        for (const E of this.editorDiv.childNodes) {
          if (E === w) {
            S = d;
            continue;
          }
          S.push(b(A = lt, mh, Ap).call(A, E));
        }
      }
      c.push(l.nodeValue.slice(0, h).replaceAll($f, ""));
    } else if (l === this.editorDiv) {
      let w = c, S = 0;
      for (const E of this.editorDiv.childNodes)
        S++ === h && (w = d), w.push(b(v = lt, mh, Ap).call(v, E));
    }
    f(this, Ye, `${c.join(`
`)}${r}${d.join(`
`)}`), b(this, bh, wp).call(this);
    const p = new Range();
    let m = Math.sumPrecise(c.map((w) => w.length));
    for (const {
      firstChild: w
    } of this.editorDiv.childNodes)
      if (w.nodeType === Node.TEXT_NODE) {
        const S = w.nodeValue.length;
        if (m <= S) {
          p.setStart(w, m), p.setEnd(w, m);
          break;
        }
        m -= S;
      }
    a.removeAllRanges(), a.addRange(p);
  }
  get contentDiv() {
    return this.editorDiv;
  }
  getPDFRect() {
    const e = lt._internalPadding * this.parentScale;
    return this.getRect(e, e);
  }
  static async deserialize(e, s, i) {
    var o;
    let r = null;
    if (e instanceof qw) {
      const {
        data: {
          defaultAppearanceData: {
            fontSize: l,
            fontColor: h
          },
          rect: c,
          rotation: d,
          id: p,
          popupRef: m,
          richText: y,
          contentsObj: A,
          creationDate: v,
          modificationDate: w
        },
        textContent: S,
        textPosition: E,
        parent: {
          page: {
            pageNumber: x
          }
        }
      } = e;
      if (!(S != null && S.length))
        return null;
      r = e = {
        annotationType: G.FREETEXT,
        color: Array.from(h),
        fontSize: l,
        value: S.join(`
`),
        position: E,
        pageIndex: x - 1,
        rect: c.slice(0),
        rotation: d,
        annotationElementId: p,
        id: p,
        deleted: !1,
        popupRef: m,
        comment: (A == null ? void 0 : A.str) || null,
        richText: y,
        creationDate: v,
        modificationDate: w
      };
    }
    const a = await super.deserialize(e, s, i);
    return f(a, Ke, e.fontSize), a.color = D.makeHexColor(...e.color), f(a, Ye, b(o = lt, Uu, Uy).call(o, e.value)), a._initialData = r, e.comment && a.setCommentData(e), a;
  }
  serialize(e = !1) {
    if (this.isEmpty())
      return null;
    if (this.deleted)
      return this.serializeDeleted();
    const s = at._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : this.color), i = Object.assign(super.serialize(e), {
      color: s,
      fontSize: n(this, Ke),
      value: b(this, gm, rv).call(this)
    });
    return this.addComment(i), e ? (i.isCopy = !0, i) : this.annotationElementId && !b(this, mm, av).call(this, i) ? null : (i.id = this.annotationElementId, i);
  }
  renderAnnotationElement(e) {
    const s = super.renderAnnotationElement(e);
    if (!s)
      return null;
    const {
      style: i
    } = s;
    i.fontSize = `calc(${n(this, Ke)}px * var(--total-scale-factor))`, i.color = this.color, s.replaceChildren();
    for (const r of n(this, Ye).split(`
`)) {
      const a = document.createElement("div");
      a.append(r ? document.createTextNode(r) : document.createElement("br")), s.append(a);
    }
    return e.updateEdited({
      rect: this.getPDFRect(),
      popup: this._uiManager.hasCommentManager() || this.hasEditedComment ? this.comment : {
        text: n(this, Ye)
      }
    }), s;
  }
  resetAnnotationElement(e) {
    super.resetAnnotationElement(e), e.resetEdited();
  }
};
Ye = new WeakMap(), Hu = new WeakMap(), io = new WeakMap(), Ke = new WeakMap(), um = new WeakSet(), sv = function(e) {
  const s = (r) => {
    this.editorDiv.style.fontSize = `calc(${r}px * var(--total-scale-factor))`, this.translate(0, -(r - n(this, Ke)) * this.parentScale), f(this, Ke, r), b(this, gh, yp).call(this);
  }, i = n(this, Ke);
  this.addCommands({
    cmd: s.bind(this, e),
    undo: s.bind(this, i),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: !0,
    type: Y.FREETEXT_SIZE,
    overwriteIfSameType: !0,
    keepUndo: !0
  });
}, fm = new WeakSet(), iv = function(e) {
  const s = (r) => {
    this.color = r, this.onUpdatedColor();
  }, i = this.color;
  this.addCommands({
    cmd: s.bind(this, e),
    undo: s.bind(this, i),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: !0,
    type: Y.FREETEXT_COLOR,
    overwriteIfSameType: !0,
    keepUndo: !0
  });
}, pm = new WeakSet(), nv = function() {
  var i;
  const e = [];
  this.editorDiv.normalize();
  let s = null;
  for (const r of this.editorDiv.childNodes)
    (s == null ? void 0 : s.nodeType) === Node.TEXT_NODE && r.nodeName === "BR" || (e.push(b(i = lt, mh, Ap).call(i, r)), s = r);
  return e.join(`
`);
}, gh = new WeakSet(), yp = function() {
  const [e, s] = this.parentDimensions;
  let i;
  if (this.isAttachedToDOM)
    i = this.div.getBoundingClientRect();
  else {
    const {
      currentLayer: r,
      div: a
    } = this, o = a.style.display, l = a.classList.contains("hidden");
    a.classList.remove("hidden"), a.style.display = "hidden", r.div.append(this.div), i = a.getBoundingClientRect(), a.remove(), a.style.display = o, a.classList.toggle("hidden", l);
  }
  this.rotation % 180 === this.parentRotation % 180 ? (this.width = i.width / e, this.height = i.height / s) : (this.width = i.height / e, this.height = i.width / s), this.fixAndSetPosition();
}, mh = new WeakSet(), Ap = function(e) {
  return (e.nodeType === Node.TEXT_NODE ? e.nodeValue : e.innerText).replaceAll($f, "");
}, bh = new WeakSet(), wp = function() {
  if (this.editorDiv.replaceChildren(), !!n(this, Ye))
    for (const e of n(this, Ye).split(`
`)) {
      const s = document.createElement("div");
      s.append(e ? document.createTextNode(e) : document.createElement("br")), this.editorDiv.append(s);
    }
}, gm = new WeakSet(), rv = function() {
  return n(this, Ye).replaceAll(" ", " ");
}, Uu = new WeakSet(), Uy = function(e) {
  return e.replaceAll(" ", " ");
}, mm = new WeakSet(), av = function(e) {
  const {
    value: s,
    fontSize: i,
    color: r,
    pageIndex: a
  } = this._initialData;
  return this.hasEditedComment || this._hasBeenMoved || e.value !== s || e.fontSize !== i || e.color.some((o, l) => o !== r[l]) || e.pageIndex !== a;
}, u(lt, mh), u(lt, Uu), T(lt, "_freeTextDefaultContent", ""), T(lt, "_internalPadding", 0), T(lt, "_defaultColor", null), T(lt, "_defaultFontSize", 10), T(lt, "_type", "freetext"), T(lt, "_editorType", G.FREETEXT);
let Hy = lt;
var no;
class kA {
  constructor() {
    u(this, no, /* @__PURE__ */ Object.create(null));
  }
  updateProperty(t, e) {
    this[t] = e, this.updateSVGProperty(t, e);
  }
  updateProperties(t) {
    if (t)
      for (const [e, s] of Object.entries(t))
        e.startsWith("_") || this.updateProperty(e, s);
  }
  updateSVGProperty(t, e) {
    n(this, no)[t] = e;
  }
  toSVGProperties() {
    const t = n(this, no);
    return f(this, no, /* @__PURE__ */ Object.create(null)), {
      root: t
    };
  }
  reset() {
    f(this, no, /* @__PURE__ */ Object.create(null));
  }
  updateAll(t = this) {
    this.updateProperties(t);
  }
  clone() {
    K("Not implemented");
  }
}
no = new WeakMap();
var yh, Ah, Bt, ro, ao, wh, Gu, Gy, $u, $y, zu, zy, Vu, Vy, oo, Ac, ju, jy, Wu, Wy, Xu, Xy, lo, wc, bm, ov, vh, vp, ho, vc, or, Bo;
const z = class z extends at {
  constructor(e) {
    super(e);
    u(this, Gu);
    u(this, $u);
    u(this, zu);
    u(this, Vu);
    u(this, oo);
    u(this, ju);
    u(this, Wu);
    u(this, Xu);
    u(this, lo);
    u(this, bm);
    u(this, vh);
    u(this, ho);
    u(this, or);
    u(this, yh, null);
    u(this, Ah, void 0);
    T(this, "_clipPathId", null);
    T(this, "_colorPicker", null);
    T(this, "_drawId", null);
    T(this, "_drawOutlines", null);
    T(this, "_focusDrawId", null);
    f(this, Ah, e.mustBeCommitted || !1), this._addOutlines(e);
  }
  onUpdatedColor() {
    var e;
    (e = this._colorPicker) == null || e.update(this.color), super.onUpdatedColor();
  }
  onUpdatedOpacity() {
    var e, s;
    (s = (e = this._colorPicker) == null ? void 0 : e.updateOpacity) == null || s.call(e, this.opacity);
  }
  _addOutlines(e) {
    e.drawOutlines && (b(this, Gu, Gy).call(this, e), b(this, lo, wc).call(this));
  }
  static _mergeSVGProperties(e, s) {
    const i = new Set(Object.keys(e));
    for (const [r, a] of Object.entries(s))
      i.has(r) ? Object.assign(e[r], a) : e[r] = a;
    return e;
  }
  static getDefaultDrawingOptions(e) {
    K("Not implemented");
  }
  static get typesMap() {
    K("Not implemented");
  }
  static get isDrawer() {
    return !0;
  }
  static get _hasClipPath() {
    return !1;
  }
  static get _hasDrawClass() {
    return !0;
  }
  static get supportMultipleDrawings() {
    return !1;
  }
  get _drawRotation() {
    return this.rotation;
  }
  get _opacityName() {
    return this.constructor.typesMap.get(this.opacityType);
  }
  static updateDefaultParams(e, s) {
    const i = this.typesMap.get(e);
    i && this._defaultDrawingOptions.updateProperty(i, s), this._currentParent && (n(z, Bt).updateProperty(i, s), this._currentParent.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties()));
  }
  updateParams(e, s) {
    const i = this.constructor.typesMap.get(e);
    i && this._updateProperty(e, i, s);
  }
  static get defaultPropertiesToUpdate() {
    const e = [], s = this._defaultDrawingOptions;
    for (const [i, r] of this.typesMap)
      e.push([i, s[r]]);
    return e;
  }
  get propertiesToUpdate() {
    const e = [], {
      _drawingOptions: s
    } = this;
    for (const [i, r] of this.constructor.typesMap)
      e.push([i, s[r]]);
    return e;
  }
  _updateProperty(e, s, i) {
    const r = this._drawingOptions, a = r[s], o = (l) => {
      var c;
      r.updateProperty(s, l);
      const h = this._drawOutlines.updateProperty(s, l);
      h && b(this, ho, vc).call(this, h), (c = this.parent) == null || c.drawLayer.updateProperties(this._drawId, r.toSVGProperties()), e === this.colorType ? this.onUpdatedColor() : e === this.opacityType && this.onUpdatedOpacity();
    };
    this.addCommands({
      cmd: o.bind(this, i),
      undo: o.bind(this, a),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: e,
      overwriteIfSameType: !0,
      keepUndo: !0
    });
  }
  _updateColorAndOpacity(e, s, i = this.colorAndOpacityType) {
    const r = this.constructor.typesMap.get(this.colorType), a = this._opacityName, o = this._drawingOptions, l = o[r], h = o[a], c = (d, p) => {
      var m;
      o.updateProperty(r, d), o.updateProperty(a, p), this._drawOutlines.updateProperty(r, d), this._drawOutlines.updateProperty(a, p), (m = this.parent) == null || m.drawLayer.updateProperties(this._drawId, o.toSVGProperties()), this.onUpdatedColor(), this.onUpdatedOpacity();
    };
    this.addCommands({
      cmd: c.bind(this, e, s),
      undo: c.bind(this, l, h),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: i,
      overwriteIfSameType: !0,
      keepUndo: !0
    });
  }
  _onResizing() {
    var e;
    (e = this.parent) == null || e.drawLayer.updateProperties(this._drawId, z._mergeSVGProperties(this._drawOutlines.getPathResizingSVGProperties(b(this, vh, vp).call(this)), {
      bbox: b(this, or, Bo).call(this)
    }));
  }
  _onResized() {
    var e;
    (e = this.parent) == null || e.drawLayer.updateProperties(this._drawId, z._mergeSVGProperties(this._drawOutlines.getPathResizedSVGProperties(b(this, vh, vp).call(this)), {
      bbox: b(this, or, Bo).call(this)
    })), b(this, Vu, Vy).call(this);
  }
  _onTranslating(e, s) {
    var i;
    (i = this.parent) == null || i.drawLayer.updateProperties(this._drawId, {
      bbox: b(this, or, Bo).call(this)
    });
  }
  _onTranslated() {
    var e;
    (e = this.parent) == null || e.drawLayer.updateProperties(this._drawId, z._mergeSVGProperties(this._drawOutlines.getPathTranslatedSVGProperties(b(this, vh, vp).call(this), this.parentDimensions), {
      bbox: b(this, or, Bo).call(this)
    }));
  }
  _onStartDragging() {
    var e;
    (e = this.parent) == null || e.drawLayer.updateProperties(this._drawId, {
      rootClass: {
        moving: !0
      }
    });
  }
  _onStopDragging() {
    var e;
    (e = this.parent) == null || e.drawLayer.updateProperties(this._drawId, {
      rootClass: {
        moving: !1
      }
    });
  }
  get _mustBeDisabledOnCommit() {
    return !0;
  }
  commit() {
    super.commit(), this._mustBeDisabledOnCommit && (this.disableEditMode(), this.disableEditing());
  }
  disableEditing() {
    super.disableEditing(), this.div.classList.toggle("disabled", !0);
  }
  enableEditing() {
    super.enableEditing(), this.div.classList.toggle("disabled", !1);
  }
  getBaseTranslation() {
    return [0, 0];
  }
  get isResizable() {
    return !0;
  }
  onceAdded(e) {
    this.annotationElementId || this.parent.addUndoableEditor(this), this._isDraggable = !0, n(this, Ah) && (f(this, Ah, !1), this.commit(), this.parent.setSelected(this), e && this.isOnScreen && this.div.focus());
  }
  remove() {
    this._uiManager.removeShouldRescale(this), b(this, Xu, Xy).call(this), super.remove();
  }
  rebuild() {
    this.parent && (super.rebuild(), this.div !== null && (b(this, lo, wc).call(this), b(this, ho, vc).call(this, this._drawOutlines.box), this.isAttachedToDOM || this.parent.add(this)));
  }
  setParent(e) {
    var i;
    let s = !1;
    this.parent && !e ? (this._uiManager.removeShouldRescale(this), b(this, Xu, Xy).call(this)) : e && (this._uiManager.addShouldRescale(this), b(this, lo, wc).call(this, e), s = !this.parent && ((i = this.div) == null ? void 0 : i.classList.contains("selectedEditor"))), super.setParent(e), b(this, ju, jy).call(this), s && this.select();
  }
  rotate(e = this.parentRotation) {
    if (!this.parent || this._drawId === null)
      return;
    const s = (e - this._drawRotation + 360) % 360;
    this.parent.drawLayer.updateProperties(this._drawId, z._mergeSVGProperties({
      bbox: b(this, or, Bo).call(this, e)
    }, this._drawOutlines.updateRotation(s))), b(this, Vu, Vy).call(this, s);
  }
  show(e = this._isVisible) {
    super.show(e), b(this, ju, jy).call(this);
  }
  select() {
    super.select(), b(this, oo, Ac).call(this, {
      hovered: !1,
      selected: !0
    });
  }
  unselect() {
    super.unselect(), b(this, oo, Ac).call(this, {
      selected: !1
    });
  }
  pointerover() {
    this.isSelected || b(this, oo, Ac).call(this, {
      hovered: !0
    });
  }
  pointerleave() {
    this.isSelected || b(this, oo, Ac).call(this, {
      hovered: !1
    });
  }
  onScaleChanging() {
    if (!this.parent)
      return;
    const e = this._drawOutlines.updateParentDimensions(this.parentDimensions, this.parent.scale);
    e && b(this, ho, vc).call(this, e);
  }
  static onScaleChangingWhenDrawing() {
  }
  render() {
    if (this.div)
      return this.div;
    let e, s;
    this._isCopy && (e = this.x, s = this.y);
    const i = super.render();
    this.constructor._hasDrawClass && i.classList.add("draw");
    const r = f(this, yh, document.createElement("div"));
    return i.append(r), r.setAttribute("aria-hidden", "true"), r.className = "internal", this._clipPathId && (r.style.clipPath = this._clipPathId), k0(this, r, ["pointerover", "pointerleave"]), this.setDims(), this._uiManager.addShouldRescale(this), this.disableEditing(), this._isCopy && this._moveAfterPaste(e, s), i;
  }
  static createDrawerInstance(e) {
    K("Not implemented");
  }
  static _getDrawingTarget(e, {
    target: s
  }) {
    return s;
  }
  static _getPointerCoords({
    offsetX: e,
    offsetY: s,
    clientX: i,
    clientY: r
  }, a = null) {
    if (!a)
      return [e, s];
    let o = i - a.clientX, l = r - a.clientY;
    switch (this._currentParent.viewport.rotation) {
      case 90:
        [o, l] = [l, -o];
        break;
      case 180:
        [o, l] = [-o, -l];
        break;
      case 270:
        [o, l] = [-l, o];
        break;
    }
    return [a.offsetX + o, a.offsetY + l];
  }
  static _addDrawingListeners(e, s) {
  }
  static _endDrawingSession(e = !1) {
    return this._currentParent.endDrawingSession(e);
  }
  static startDrawing(e, s, i, r) {
    var x;
    const {
      pointerId: a,
      pointerType: o
    } = r;
    if (ce.isInitializedAndDifferentPointerType(o))
      return;
    const l = this._getDrawingTarget(e, r), [h, c] = this._getPointerCoords(r), {
      viewport: {
        rotation: d
      }
    } = e, {
      x: p,
      y: m,
      width: y,
      height: A
    } = l.getBoundingClientRect(), v = f(z, ro, new AbortController()), w = e.combinedSignal(v);
    if (ce.setPointer(o, a), window.addEventListener("pointerup", (C) => {
      ce.isSamePointerIdOrRemove(C.pointerId) && this._endDraw(C);
    }, {
      signal: w
    }), window.addEventListener("pointercancel", (C) => {
      ce.isSamePointerIdOrRemove(C.pointerId) && this._endDrawingSession();
    }, {
      signal: w
    }), window.addEventListener("pointerdown", (C) => {
      ce.isSamePointerType(C.pointerType) && (ce.initializeAndAddPointerId(C.pointerId), n(z, Bt).isCancellable() && (n(z, Bt).removeLastElement(), n(z, Bt).isEmpty() ? this._endDrawingSession(!0) : this._endDraw(null)));
    }, {
      capture: !0,
      passive: !1,
      signal: w
    }), window.addEventListener("contextmenu", Us, {
      signal: w
    }), l.addEventListener("pointermove", this._drawMove.bind(this), {
      signal: w
    }), l.addEventListener("touchmove", (C) => {
      ce.isSameTimeStamp(C.timeStamp) && jt(C);
    }, {
      signal: w
    }), this._addDrawingListeners(l, w), e.toggleDrawing(), (x = s._editorUndoBar) == null || x.hide(), n(z, Bt)) {
      e.drawLayer.updateProperties(this._currentDrawId, n(z, Bt).startNew(h, c, y, A, d));
      return;
    }
    s.updateUIForDefaultProperties(this), f(z, Bt, this.createDrawerInstance({
      x: h,
      y: c,
      box: [p, m, y, A],
      rotation: d,
      parent: e,
      isLTR: i
    })), f(z, ao, this.getDefaultDrawingOptions()), this._currentParent = e;
    const {
      id: S,
      clipPathId: E
    } = e.drawLayer.draw(this._mergeSVGProperties(n(z, ao).toSVGProperties(), n(z, Bt).defaultSVGProperties), !0, this._hasClipPath);
    this._currentDrawId = S, f(z, wh, this._hasClipPath ? E : null);
  }
  static _drawMove(e) {
    var r;
    if (ce.isSameTimeStamp(e.timeStamp), !n(z, Bt) || !ce.isSamePointerId(e.pointerId))
      return;
    if (ce.isUsingMultiplePointers()) {
      this._endDraw(e);
      return;
    }
    let s;
    const i = (r = e.getCoalescedEvents) == null ? void 0 : r.call(e);
    if (i != null && i.length) {
      const a = [];
      for (const o of i)
        a.push(...this._getPointerCoords(o, e));
      s = n(z, Bt).addPoints(a);
    } else
      s = n(z, Bt).add(...this._getPointerCoords(e));
    this._currentParent.drawLayer.updateProperties(this._currentDrawId, s), ce.setTimeStamp(e.timeStamp), jt(e);
  }
  static _cleanup(e) {
    e && (this._currentDrawId = -1, this._currentParent = null, f(z, Bt, null), f(z, ao, null), f(z, wh, null), ce.clearTimeStamp()), n(z, ro) && (n(z, ro).abort(), f(z, ro, null), ce.clearPointerIds());
  }
  static _endDraw(e) {
    const s = this._currentParent;
    if (s) {
      if (s.toggleDrawing(!0), this._cleanup(!1), s.drawLayer.updateProperties(this._currentDrawId, (e == null ? void 0 : e.target) === s.div ? n(z, Bt).end(...this._getPointerCoords(e)) : n(z, Bt).end()), this.supportMultipleDrawings) {
        const i = n(z, Bt), r = this._currentDrawId, a = i.getLastElement();
        s.addCommands({
          cmd: () => {
            s.drawLayer.updateProperties(r, i.setLastElement(a));
          },
          undo: () => {
            s.drawLayer.updateProperties(r, i.removeLastElement());
          },
          mustExec: !1,
          type: Y.DRAW_STEP
        });
        return;
      }
      this.endDrawing(!1);
    }
  }
  static endDrawing(e) {
    const s = this._currentParent;
    if (!s)
      return null;
    if (s.toggleDrawing(!0), s.cleanUndoStack(Y.DRAW_STEP), !n(z, Bt).isEmpty()) {
      const {
        pageDimensions: [i, r],
        scale: a
      } = s, o = s.createAndAddNewEditor({
        offsetX: 0,
        offsetY: 0
      }, !1, {
        drawId: this._currentDrawId,
        clipPathId: n(z, wh),
        drawOutlines: n(z, Bt).getOutlines(i * a, r * a, a, this._INNER_MARGIN),
        drawingOptions: n(z, ao),
        mustBeCommitted: !e
      });
      return this._cleanup(!0), o;
    }
    return s.drawLayer.remove(this._currentDrawId), this._cleanup(!0), null;
  }
  createDrawingOptions(e) {
  }
  static deserializeDraw(e, s, i, r, a, o, l) {
    K("Not implemented");
  }
  static async deserialize(e, s, i) {
    var d, p;
    const {
      rawDims: {
        pageWidth: r,
        pageHeight: a,
        pageX: o,
        pageY: l
      }
    } = s.viewport, h = this.deserializeDraw(o, l, r, a, this._INNER_MARGIN, e, i), c = await super.deserialize(e, s, i);
    return c.createDrawingOptions(e), b(d = c, Gu, Gy).call(d, {
      drawOutlines: h
    }), b(p = c, lo, wc).call(p), c.onScaleChanging(), c.rotate(), c;
  }
  serializeDraw(e) {
    const [s, i] = this.pageTranslation, [r, a] = this.pageDimensions;
    return this._drawOutlines.serialize([s, i, r, a], e);
  }
  renderAnnotationElement(e) {
    return e.updateEdited({
      rect: this.getPDFRect()
    }), null;
  }
  static canCreateNewEmptyEditor() {
    return !1;
  }
};
yh = new WeakMap(), Ah = new WeakMap(), Bt = new WeakMap(), ro = new WeakMap(), ao = new WeakMap(), wh = new WeakMap(), Gu = new WeakSet(), Gy = function({
  drawOutlines: e,
  drawId: s,
  drawingOptions: i,
  clipPathId: r
}) {
  this._drawOutlines = e, this._drawingOptions || (this._drawingOptions = i), this.annotationElementId || this._uiManager.a11yAlert(at._l10nAlert[this.editorType]), s >= 0 ? (this._drawId = s, this._clipPathId = r ?? null, this.parent.drawLayer.finalizeDraw(s, e.defaultProperties), b(this, zu, zy).call(this, this.parent)) : this._drawId = b(this, $u, $y).call(this, e, this.parent), b(this, ho, vc).call(this, e.box);
}, $u = new WeakSet(), $y = function(e, s) {
  const {
    id: i,
    clipPathId: r
  } = s.drawLayer.draw(z._mergeSVGProperties(this._drawingOptions.toSVGProperties(), e.defaultSVGProperties), !1, this.constructor._hasClipPath);
  return this.constructor._hasClipPath && (this._clipPathId = r), b(this, zu, zy).call(this, s), i;
}, zu = new WeakSet(), zy = function(e) {
  const s = this._drawOutlines.getFocusSVGProperties(n(this, Wu, Wy));
  s && (this._focusDrawId = e.drawLayer.drawOutline(s, this._drawOutlines.focusMustRemoveSelfIntersections));
}, Vu = new WeakSet(), Vy = function(e = n(this, Wu, Wy)) {
  var s;
  this._focusDrawId !== null && ((s = this.parent) == null || s.drawLayer.updateProperties(this._focusDrawId, this._drawOutlines.getFocusSVGProperties(e)));
}, oo = new WeakSet(), Ac = function(e) {
  var s;
  this._focusDrawId !== null && ((s = this.parent) == null || s.drawLayer.updateProperties(this._focusDrawId, {
    rootClass: e
  }));
}, ju = new WeakSet(), jy = function() {
  const {
    parent: e,
    _drawId: s,
    _focusDrawId: i,
    _isVisible: r
  } = this;
  if (!e || s === null)
    return;
  const a = {
    hidden: !r
  };
  e.drawLayer.updateProperties(s, {
    rootClass: a
  }), i !== null && e.drawLayer.updateProperties(i, {
    rootClass: a
  });
}, Wu = new WeakSet(), Wy = function() {
  return (this.parentRotation - this._drawRotation + 360) % 360;
}, Xu = new WeakSet(), Xy = function() {
  if (this._drawId === null || !this.parent)
    return;
  const {
    drawLayer: e
  } = this.parent;
  e.remove(this._drawId), this._drawId = null, this._focusDrawId !== null && (e.remove(this._focusDrawId), this._focusDrawId = null), this._drawingOptions.reset();
}, lo = new WeakSet(), wc = function(e = this.parent) {
  if (!(this._drawId !== null && this.parent === e)) {
    if (this._drawId !== null) {
      const {
        drawLayer: s
      } = this.parent;
      s.updateParent(this._drawId, e.drawLayer), this._focusDrawId !== null && s.updateParent(this._focusDrawId, e.drawLayer);
      return;
    }
    this._drawingOptions.updateAll(), this._drawId = b(this, $u, $y).call(this, this._drawOutlines, e), this._clipPathId && n(this, yh) && (n(this, yh).style.clipPath = this._clipPathId);
  }
}, bm = new WeakSet(), ov = function([e, s, i, r]) {
  const {
    parentDimensions: [a, o],
    _drawRotation: l
  } = this;
  switch (l) {
    case 90:
      return [s, 1 - e, i * (o / a), r * (a / o)];
    case 180:
      return [1 - e, 1 - s, i, r];
    case 270:
      return [1 - s, e, i * (o / a), r * (a / o)];
    default:
      return [e, s, i, r];
  }
}, vh = new WeakSet(), vp = function() {
  const {
    x: e,
    y: s,
    width: i,
    height: r,
    parentDimensions: [a, o],
    _drawRotation: l
  } = this;
  switch (l) {
    case 90:
      return [1 - s, e, i * (a / o), r * (o / a)];
    case 180:
      return [1 - e, 1 - s, i, r];
    case 270:
      return [s, 1 - e, i * (a / o), r * (o / a)];
    default:
      return [e, s, i, r];
  }
}, ho = new WeakSet(), vc = function(e) {
  [this.x, this.y, this.width, this.height] = b(this, bm, ov).call(this, e), this.div && (this.fixAndSetPosition(), this.setDims()), this._onResized();
}, or = new WeakSet(), Bo = function(e = this.parentRotation) {
  const {
    x: s,
    y: i,
    width: r,
    height: a,
    _drawRotation: o,
    parentDimensions: [l, h]
  } = this;
  switch ((o * 4 + e) / 90) {
    case 1:
      return [1 - i - a, s, a, r];
    case 2:
      return [1 - s - r, 1 - i - a, r, a];
    case 3:
      return [i, 1 - s - r, a, r];
    case 4:
      return [s, i - r * (l / h), a * (h / l), r * (l / h)];
    case 5:
      return [1 - i, s, r * (l / h), a * (h / l)];
    case 6:
      return [1 - s - a * (h / l), 1 - i, a * (h / l), r * (l / h)];
    case 7:
      return [i - r * (l / h), 1 - s - a * (h / l), r * (l / h), a * (h / l)];
    case 8:
      return [s - r, i - a, r, a];
    case 9:
      return [1 - i, s - r, a, r];
    case 10:
      return [1 - s, 1 - i, r, a];
    case 11:
      return [i - a, 1 - s, a, r];
    case 12:
      return [s - a * (h / l), i, a * (h / l), r * (l / h)];
    case 13:
      return [1 - i - r * (l / h), s - a * (h / l), r * (l / h), a * (h / l)];
    case 14:
      return [1 - s, 1 - i - r * (l / h), a * (h / l), r * (l / h)];
    case 15:
      return [i, 1 - s, r * (l / h), a * (h / l)];
    default:
      return [s, i, r, a];
  }
}, T(z, "_currentDrawId", -1), T(z, "_currentParent", null), u(z, Bt, null), u(z, ro, null), u(z, ao, null), u(z, wh, null), T(z, "_INNER_MARGIN", 3);
let Fc = z;
class F {
  constructor() {
    T(this, "focusOutline", null);
  }
  toSVGPath() {
    K("Abstract method `toSVGPath` must be implemented.");
  }
  get box() {
    K("Abstract getter `box` must be implemented.");
  }
  serialize(t, e) {
    K("Abstract method `serialize` must be implemented.");
  }
  get defaultSVGProperties() {
    K("Abstract getter `defaultSVGProperties` must be implemented.");
  }
  get defaultProperties() {
    return this.defaultSVGProperties;
  }
  getFocusSVGProperties(t) {
    return null;
  }
  get focusMustRemoveSelfIntersections() {
    return !1;
  }
  updateProperty(t, e) {
    return null;
  }
  updateParentDimensions(t, e) {
    return null;
  }
  serializeQuadPoints(t, e) {
    return null;
  }
  updateRotation(t) {
    return {};
  }
  getPathResizingSVGProperties(t) {
    return {};
  }
  getPathResizedSVGProperties(t) {
    return {};
  }
  getPathTranslatedSVGProperties(t, e) {
    return {};
  }
  static _rotateBox([t, e, s, i], r) {
    switch (r) {
      case 90:
        return [1 - e - i, t, i, s];
      case 180:
        return [1 - t - s, 1 - e - i, s, i];
      case 270:
        return [e, 1 - t - s, i, s];
    }
    return [t, e, s, i];
  }
  static _rescale(t, e, s, i, r, a) {
    a || (a = new Float32Array(t.length));
    for (let o = 0, l = t.length; o < l; o += 2)
      a[o] = e + t[o] * i, a[o + 1] = s + t[o + 1] * r;
    return a;
  }
  static _rescaleAndSwap(t, e, s, i, r, a) {
    a || (a = new Float32Array(t.length));
    for (let o = 0, l = t.length; o < l; o += 2)
      a[o] = e + t[o + 1] * i, a[o + 1] = s + t[o] * r;
    return a;
  }
  static _translate(t, e, s, i) {
    i || (i = new Float32Array(t.length));
    for (let r = 0, a = t.length; r < a; r += 2)
      i[r] = e + t[r], i[r + 1] = s + t[r + 1];
    return i;
  }
  static svgRound(t) {
    return Math.round(t * 1e4);
  }
  static _normalizePoint(t, e, s, i, r) {
    switch (r) {
      case 90:
        return [1 - e / s, t / i];
      case 180:
        return [1 - t / s, 1 - e / i];
      case 270:
        return [e / s, 1 - t / i];
      default:
        return [t / s, e / i];
    }
  }
  static createBezierPoints(t, e, s, i, r, a) {
    return [(t + 5 * s) / 6, (e + 5 * i) / 6, (5 * s + r) / 6, (5 * i + a) / 6, (s + r) / 2, (i + a) / 2];
  }
}
T(F, "PRECISION", 1e-4);
var qe, ys, Sh, Eh, Fs, j, co, uo, Yu, Ku, xh, Ch, fi, qu, ym, Am, fo, Sc, wm, lv, vm, hv, Sm, cv, Em, dv, xm, uv, Cm, fv;
const Ci = class Ci {
  constructor(t, e, s, i, r, a, o = 0) {
    u(this, fo);
    u(this, wm);
    u(this, vm);
    u(this, Sm);
    u(this, Em);
    u(this, xm);
    u(this, Cm);
    u(this, qe, void 0);
    u(this, ys, []);
    u(this, Sh, void 0);
    u(this, Eh, void 0);
    u(this, Fs, []);
    u(this, j, new Float32Array(18));
    u(this, co, void 0);
    u(this, uo, void 0);
    u(this, Yu, void 0);
    u(this, Ku, void 0);
    u(this, xh, void 0);
    u(this, Ch, void 0);
    u(this, fi, []);
    f(this, qe, s), f(this, Ch, r * i), f(this, Eh, a), n(this, j).set([NaN, NaN, NaN, NaN, t, e], 6), f(this, Sh, o), f(this, Ku, n(Ci, qu) * i), f(this, Yu, n(Ci, Am) * i), f(this, xh, i), n(this, fi).push(t, e);
  }
  isEmpty() {
    return isNaN(n(this, j)[8]);
  }
  isCancellable() {
    return n(this, fi).length <= 10;
  }
  removeLastElement() {
    return n(this, j).fill(NaN), n(this, Fs).length = n(this, ys).length = n(this, fi).length = 0, {
      path: {
        d: ""
      }
    };
  }
  add(t, e) {
    var M;
    f(this, co, t), f(this, uo, e);
    const [s, i, r, a] = n(this, qe);
    let [o, l, h, c] = n(this, j).subarray(8, 12);
    const d = t - h, p = e - c, m = Math.hypot(d, p);
    if (m < n(this, Yu))
      return !1;
    const y = m - n(this, Ku), A = y / m, v = A * d, w = A * p;
    let S = o, E = l;
    o = h, l = c, h += v, c += w, (M = n(this, fi)) == null || M.push(t, e);
    const x = -w / y, C = v / y, _ = x * n(this, Ch), k = C * n(this, Ch);
    return n(this, j).set(n(this, j).subarray(2, 8), 0), n(this, j).set([h + _, c + k], 4), n(this, j).set(n(this, j).subarray(14, 18), 12), n(this, j).set([h - _, c - k], 16), isNaN(n(this, j)[6]) ? (n(this, Fs).length === 0 && (n(this, j).set([o + _, l + k], 2), n(this, Fs).push(NaN, NaN, NaN, NaN, (o + _ - s) / r, (l + k - i) / a), n(this, j).set([o - _, l - k], 14), n(this, ys).push(NaN, NaN, NaN, NaN, (o - _ - s) / r, (l - k - i) / a)), n(this, j).set([S, E, o, l, h, c], 6), !this.isEmpty()) : (n(this, j).set([S, E, o, l, h, c], 6), Math.abs(Math.atan2(E - l, S - o) - Math.atan2(w, v)) < Math.PI / 2 ? ([o, l, h, c] = n(this, j).subarray(2, 6), n(this, Fs).push(NaN, NaN, NaN, NaN, ((o + h) / 2 - s) / r, ((l + c) / 2 - i) / a), [o, l, S, E] = n(this, j).subarray(14, 18), n(this, ys).push(NaN, NaN, NaN, NaN, ((S + o) / 2 - s) / r, ((E + l) / 2 - i) / a), !0) : ([S, E, o, l, h, c] = n(this, j).subarray(0, 6), n(this, Fs).push(((S + 5 * o) / 6 - s) / r, ((E + 5 * l) / 6 - i) / a, ((5 * o + h) / 6 - s) / r, ((5 * l + c) / 6 - i) / a, ((o + h) / 2 - s) / r, ((l + c) / 2 - i) / a), [h, c, o, l, S, E] = n(this, j).subarray(12, 18), n(this, ys).push(((S + 5 * o) / 6 - s) / r, ((E + 5 * l) / 6 - i) / a, ((5 * o + h) / 6 - s) / r, ((5 * l + c) / 6 - i) / a, ((o + h) / 2 - s) / r, ((l + c) / 2 - i) / a), !0));
  }
  toSVGPath() {
    if (this.isEmpty())
      return "";
    const t = n(this, Fs), e = n(this, ys);
    if (isNaN(n(this, j)[6]) && !this.isEmpty())
      return b(this, wm, lv).call(this);
    const s = [];
    s.push(`M${t[4]} ${t[5]}`);
    for (let i = 6; i < t.length; i += 6)
      isNaN(t[i]) ? s.push(`L${t[i + 4]} ${t[i + 5]}`) : s.push(`C${t[i]} ${t[i + 1]} ${t[i + 2]} ${t[i + 3]} ${t[i + 4]} ${t[i + 5]}`);
    b(this, Sm, cv).call(this, s);
    for (let i = e.length - 6; i >= 6; i -= 6)
      isNaN(e[i]) ? s.push(`L${e[i + 4]} ${e[i + 5]}`) : s.push(`C${e[i]} ${e[i + 1]} ${e[i + 2]} ${e[i + 3]} ${e[i + 4]} ${e[i + 5]}`);
    return b(this, vm, hv).call(this, s), s.join(" ");
  }
  newFreeDrawOutline(t, e, s, i, r, a) {
    return new pv(t, e, s, i, r, a);
  }
  getOutlines() {
    var d;
    const t = n(this, Fs), e = n(this, ys), s = n(this, j), [i, r, a, o] = n(this, qe), l = new Float32Array((((d = n(this, fi)) == null ? void 0 : d.length) ?? 0) + 2);
    for (let p = 0, m = l.length - 2; p < m; p += 2)
      l[p] = (n(this, fi)[p] - i) / a, l[p + 1] = (n(this, fi)[p + 1] - r) / o;
    if (l[l.length - 2] = (n(this, co) - i) / a, l[l.length - 1] = (n(this, uo) - r) / o, isNaN(s[6]) && !this.isEmpty())
      return b(this, Em, dv).call(this, l);
    const h = new Float32Array(n(this, Fs).length + 24 + n(this, ys).length);
    let c = t.length;
    for (let p = 0; p < c; p += 2) {
      if (isNaN(t[p])) {
        h[p] = h[p + 1] = NaN;
        continue;
      }
      h[p] = t[p], h[p + 1] = t[p + 1];
    }
    c = b(this, Cm, fv).call(this, h, c);
    for (let p = e.length - 6; p >= 6; p -= 6)
      for (let m = 0; m < 6; m += 2) {
        if (isNaN(e[p + m])) {
          h[c] = h[c + 1] = NaN, c += 2;
          continue;
        }
        h[c] = e[p + m], h[c + 1] = e[p + m + 1], c += 2;
      }
    return b(this, xm, uv).call(this, h, c), this.newFreeDrawOutline(h, l, n(this, qe), n(this, xh), n(this, Sh), n(this, Eh));
  }
};
qe = new WeakMap(), ys = new WeakMap(), Sh = new WeakMap(), Eh = new WeakMap(), Fs = new WeakMap(), j = new WeakMap(), co = new WeakMap(), uo = new WeakMap(), Yu = new WeakMap(), Ku = new WeakMap(), xh = new WeakMap(), Ch = new WeakMap(), fi = new WeakMap(), qu = new WeakMap(), ym = new WeakMap(), Am = new WeakMap(), fo = new WeakSet(), Sc = function() {
  const t = n(this, j).subarray(4, 6), e = n(this, j).subarray(16, 18), [s, i, r, a] = n(this, qe);
  return [(n(this, co) + (t[0] - e[0]) / 2 - s) / r, (n(this, uo) + (t[1] - e[1]) / 2 - i) / a, (n(this, co) + (e[0] - t[0]) / 2 - s) / r, (n(this, uo) + (e[1] - t[1]) / 2 - i) / a];
}, wm = new WeakSet(), lv = function() {
  const [t, e, s, i] = n(this, qe), [r, a, o, l] = b(this, fo, Sc).call(this);
  return `M${(n(this, j)[2] - t) / s} ${(n(this, j)[3] - e) / i} L${(n(this, j)[4] - t) / s} ${(n(this, j)[5] - e) / i} L${r} ${a} L${o} ${l} L${(n(this, j)[16] - t) / s} ${(n(this, j)[17] - e) / i} L${(n(this, j)[14] - t) / s} ${(n(this, j)[15] - e) / i} Z`;
}, vm = new WeakSet(), hv = function(t) {
  const e = n(this, ys);
  t.push(`L${e[4]} ${e[5]} Z`);
}, Sm = new WeakSet(), cv = function(t) {
  const [e, s, i, r] = n(this, qe), a = n(this, j).subarray(4, 6), o = n(this, j).subarray(16, 18), [l, h, c, d] = b(this, fo, Sc).call(this);
  t.push(`L${(a[0] - e) / i} ${(a[1] - s) / r} L${l} ${h} L${c} ${d} L${(o[0] - e) / i} ${(o[1] - s) / r}`);
}, Em = new WeakSet(), dv = function(t) {
  const e = n(this, j), [s, i, r, a] = n(this, qe), [o, l, h, c] = b(this, fo, Sc).call(this), d = new Float32Array(36);
  return d.set([NaN, NaN, NaN, NaN, (e[2] - s) / r, (e[3] - i) / a, NaN, NaN, NaN, NaN, (e[4] - s) / r, (e[5] - i) / a, NaN, NaN, NaN, NaN, o, l, NaN, NaN, NaN, NaN, h, c, NaN, NaN, NaN, NaN, (e[16] - s) / r, (e[17] - i) / a, NaN, NaN, NaN, NaN, (e[14] - s) / r, (e[15] - i) / a], 0), this.newFreeDrawOutline(d, t, n(this, qe), n(this, xh), n(this, Sh), n(this, Eh));
}, xm = new WeakSet(), uv = function(t, e) {
  const s = n(this, ys);
  return t.set([NaN, NaN, NaN, NaN, s[4], s[5]], e), e += 6;
}, Cm = new WeakSet(), fv = function(t, e) {
  const s = n(this, j).subarray(4, 6), i = n(this, j).subarray(16, 18), [r, a, o, l] = n(this, qe), [h, c, d, p] = b(this, fo, Sc).call(this);
  return t.set([NaN, NaN, NaN, NaN, (s[0] - r) / o, (s[1] - a) / l, NaN, NaN, NaN, NaN, h, c, NaN, NaN, NaN, NaN, d, p, NaN, NaN, NaN, NaN, (i[0] - r) / o, (i[1] - a) / l], e), e += 24;
}, u(Ci, qu, 8), u(Ci, ym, 2), u(Ci, Am, n(Ci, qu) + n(Ci, ym));
let Up = Ci;
var _h, pi, rn, Qu, Rs, Ju, xt, _m, gv;
class pv extends F {
  constructor(e, s, i, r, a, o) {
    super();
    u(this, _m);
    u(this, _h, void 0);
    u(this, pi, new Float32Array(4));
    u(this, rn, void 0);
    u(this, Qu, void 0);
    u(this, Rs, void 0);
    u(this, Ju, void 0);
    u(this, xt, void 0);
    f(this, xt, e), f(this, Rs, s), f(this, _h, i), f(this, Ju, r), f(this, rn, a), f(this, Qu, o), this.firstPoint = [NaN, NaN], this.lastPoint = [NaN, NaN], b(this, _m, gv).call(this, o);
    const [l, h, c, d] = n(this, pi);
    for (let p = 0, m = e.length; p < m; p += 2)
      e[p] = (e[p] - l) / c, e[p + 1] = (e[p + 1] - h) / d;
    for (let p = 0, m = s.length; p < m; p += 2)
      s[p] = (s[p] - l) / c, s[p + 1] = (s[p + 1] - h) / d;
  }
  toSVGPath() {
    const e = [`M${n(this, xt)[4]} ${n(this, xt)[5]}`];
    for (let s = 6, i = n(this, xt).length; s < i; s += 6) {
      if (isNaN(n(this, xt)[s])) {
        e.push(`L${n(this, xt)[s + 4]} ${n(this, xt)[s + 5]}`);
        continue;
      }
      e.push(`C${n(this, xt)[s]} ${n(this, xt)[s + 1]} ${n(this, xt)[s + 2]} ${n(this, xt)[s + 3]} ${n(this, xt)[s + 4]} ${n(this, xt)[s + 5]}`);
    }
    return e.push("Z"), e.join(" ");
  }
  serialize([e, s, i, r], a) {
    const o = i - e, l = r - s;
    let h, c;
    switch (a) {
      case 0:
        h = F._rescale(n(this, xt), e, r, o, -l), c = F._rescale(n(this, Rs), e, r, o, -l);
        break;
      case 90:
        h = F._rescaleAndSwap(n(this, xt), e, s, o, l), c = F._rescaleAndSwap(n(this, Rs), e, s, o, l);
        break;
      case 180:
        h = F._rescale(n(this, xt), i, s, -o, l), c = F._rescale(n(this, Rs), i, s, -o, l);
        break;
      case 270:
        h = F._rescaleAndSwap(n(this, xt), i, r, -o, -l), c = F._rescaleAndSwap(n(this, Rs), i, r, -o, -l);
        break;
    }
    return {
      outline: Array.from(h),
      points: [Array.from(c)]
    };
  }
  get box() {
    return n(this, pi);
  }
  newOutliner(e, s, i, r, a, o, l = 0) {
    return new Up(e, s, i, r, a, o, l);
  }
  updateThickness(e) {
    const s = this.getNewOutline(e);
    return f(this, xt, n(s, xt)), f(this, Rs, n(s, Rs)), n(this, pi).set(n(s, pi)), this.firstPoint = s.firstPoint, this.lastPoint = s.lastPoint, n(this, pi);
  }
  getNewOutline(e, s) {
    const [i, r, a, o] = n(this, pi), [l, h, c, d] = n(this, _h), p = a * c, m = o * d, y = i * c + l, A = r * d + h, v = n(this, Rs), w = this.newOutliner(v[0] * p + y, v[1] * m + A, n(this, _h), n(this, Ju), e, n(this, Qu), s ?? n(this, rn));
    for (let S = 2, E = v.length; S < E; S += 2)
      w.add(v[S] * p + y, v[S + 1] * m + A);
    return w.getOutlines();
  }
}
_h = new WeakMap(), pi = new WeakMap(), rn = new WeakMap(), Qu = new WeakMap(), Rs = new WeakMap(), Ju = new WeakMap(), xt = new WeakMap(), _m = new WeakSet(), gv = function(e) {
  const s = n(this, xt);
  let i = s[4], r = s[5];
  const a = [i, r, i, r];
  let o = i, l = r, h = i, c = r;
  const d = e ? Math.max : Math.min, p = new Float32Array(4);
  for (let y = 6, A = s.length; y < A; y += 6) {
    const v = s[y + 4], w = s[y + 5];
    isNaN(s[y]) ? (D.pointBoundingBox(v, w, a), l > w ? (o = v, l = w) : l === w && (o = d(o, v)), c < w ? (h = v, c = w) : c === w && (h = d(h, v))) : (p.set(fn, 0), D.bezierBoundingBox(i, r, ...s.slice(y, y + 6), p), D.rectBoundingBox(...p, a), l > p[1] ? (o = p[0], l = p[1]) : l === p[1] && (o = d(o, p[0])), c < p[3] ? (h = p[2], c = p[3]) : c === p[3] && (h = d(h, p[2]))), i = v, r = w;
  }
  const m = n(this, pi);
  m[0] = a[0] - n(this, rn), m[1] = a[1] - n(this, rn), m[2] = a[2] - a[0] + 2 * n(this, rn), m[3] = a[3] - a[1] + 2 * n(this, rn), this.firstPoint = [o, l], this.lastPoint = [h, c];
};
function mv(g) {
  return {
    bbox: g.box,
    root: {
      viewBox: "0 0 1 1"
    },
    rootClass: {
      highlight: !0,
      free: g.isFree
    },
    path: {
      d: g.toSVGPath()
    }
  };
}
function bv(g, t) {
  const {
    focusOutline: e
  } = g;
  return {
    bbox: F._rotateBox(e.box, t),
    root: {
      "data-main-rotation": t
    },
    rootClass: {
      highlightOutline: !0,
      free: g.isFree
    },
    path: {
      d: e.toSVGPath()
    }
  };
}
var Zu, tf, ef, lr, Os, Tm, yv, Th, Sp, km, Av, Pm, wv, sf, Ky;
class Yy {
  constructor(t, e = 0, s = 0, i = !0) {
    u(this, Tm);
    u(this, Th);
    u(this, km);
    u(this, Pm);
    u(this, sf);
    u(this, Zu, void 0);
    u(this, tf, void 0);
    u(this, ef, void 0);
    u(this, lr, []);
    u(this, Os, []);
    const r = fn.slice(), o = 10 ** -4;
    for (const {
      x: v,
      y: w,
      width: S,
      height: E
    } of t) {
      const x = Math.floor((v - e) / o) * o, C = Math.ceil((v + S + e) / o) * o, _ = Math.floor((w - e) / o) * o, k = Math.ceil((w + E + e) / o) * o, P = [x, _, k, !0], M = [C, _, k, !1];
      n(this, lr).push(P, M), D.rectBoundingBox(x, _, C, k, r);
    }
    const l = r[2] - r[0] + 2 * s, h = r[3] - r[1] + 2 * s, c = r[0] - s, d = r[1] - s;
    let p = i ? -1 / 0 : 1 / 0, m = 1 / 0;
    const y = n(this, lr).at(i ? -1 : -2), A = [y[0], y[2]];
    for (const v of n(this, lr)) {
      const [w, S, E, x] = v;
      !x && i ? S < m ? (m = S, p = w) : S === m && (p = Math.max(p, w)) : x && !i && (S < m ? (m = S, p = w) : S === m && (p = Math.min(p, w))), v[0] = (w - c) / l, v[1] = (S - d) / h, v[2] = (E - d) / h;
    }
    f(this, Zu, new Float32Array([c, d, l, h])), f(this, tf, [p, m]), f(this, ef, A);
  }
  getOutlines() {
    n(this, lr).sort((e, s) => e[0] - s[0] || e[1] - s[1] || e[2] - s[2]);
    const t = [];
    for (const e of n(this, lr))
      e[3] ? (t.push(...b(this, sf, Ky).call(this, e)), b(this, km, Av).call(this, e)) : (b(this, Pm, wv).call(this, e), t.push(...b(this, sf, Ky).call(this, e)));
    return b(this, Tm, yv).call(this, t);
  }
}
Zu = new WeakMap(), tf = new WeakMap(), ef = new WeakMap(), lr = new WeakMap(), Os = new WeakMap(), Tm = new WeakSet(), yv = function(t) {
  const e = [], s = /* @__PURE__ */ new Set();
  for (const a of t) {
    const [o, l, h] = a;
    e.push([o, l, a], [o, h, a]);
  }
  e.sort((a, o) => a[1] - o[1] || a[0] - o[0]);
  for (let a = 0, o = e.length; a < o; a += 2) {
    const l = e[a][2], h = e[a + 1][2];
    l.push(h), h.push(l), s.add(l), s.add(h);
  }
  const i = [];
  let r;
  for (; s.size > 0; ) {
    const a = s.values().next().value;
    let [o, l, h, c, d] = a;
    s.delete(a);
    let p = o, m = l;
    for (r = [o, h], i.push(r); ; ) {
      let y;
      if (s.has(c))
        y = c;
      else if (s.has(d))
        y = d;
      else
        break;
      s.delete(y), [o, l, h, c, d] = y, p !== o && (r.push(p, m, o, m === l ? l : h), p = o), m = m === l ? h : l;
    }
    r.push(p, m);
  }
  return new qy(i, n(this, Zu), n(this, tf), n(this, ef));
}, Th = new WeakSet(), Sp = function(t) {
  const e = n(this, Os);
  let s = 0, i = e.length - 1;
  for (; s <= i; ) {
    const r = s + i >> 1, a = e[r][0];
    if (a === t)
      return r;
    a < t ? s = r + 1 : i = r - 1;
  }
  return i + 1;
}, km = new WeakSet(), Av = function([, t, e]) {
  const s = b(this, Th, Sp).call(this, t);
  n(this, Os).splice(s, 0, [t, e]);
}, Pm = new WeakSet(), wv = function([, t, e]) {
  const s = b(this, Th, Sp).call(this, t);
  for (let i = s; i < n(this, Os).length; i++) {
    const [r, a] = n(this, Os)[i];
    if (r !== t)
      break;
    if (r === t && a === e) {
      n(this, Os).splice(i, 1);
      return;
    }
  }
  for (let i = s - 1; i >= 0; i--) {
    const [r, a] = n(this, Os)[i];
    if (r !== t)
      break;
    if (r === t && a === e) {
      n(this, Os).splice(i, 1);
      return;
    }
  }
}, sf = new WeakSet(), Ky = function(t) {
  const [e, s, i] = t, r = [[e, s, i]], a = b(this, Th, Sp).call(this, i);
  for (let o = 0; o < a; o++) {
    const [l, h] = n(this, Os)[o];
    for (let c = 0, d = r.length; c < d; c++) {
      const [, p, m] = r[c];
      if (!(h <= p || m <= l)) {
        if (p >= l) {
          if (m > h)
            r[c][1] = h;
          else {
            if (d === 1)
              return [];
            r.splice(c, 1), c--, d--;
          }
          continue;
        }
        r[c][2] = l, m > h && r.push([e, h, m]);
      }
    }
  }
  return r;
};
var nf, rf, kh;
class qy extends F {
  constructor(e, s, i, r) {
    super();
    u(this, nf, void 0);
    u(this, rf, null);
    u(this, kh, void 0);
    f(this, kh, e), f(this, nf, s), this.firstPoint = i, this.lastPoint = r;
  }
  static build(e, s) {
    const i = new Yy(e, 1e-3).getOutlines();
    return f(i, rf, e), i.focusOutline = new Yy(e, 25e-4, 1e-3, s).getOutlines(), i;
  }
  get isFree() {
    return !1;
  }
  get defaultSVGProperties() {
    return mv(this);
  }
  getFocusSVGProperties(e) {
    return bv(this, e);
  }
  updateRotation(e) {
    return {
      root: {
        "data-main-rotation": e
      }
    };
  }
  serializeQuadPoints([e, s], [i, r]) {
    const a = n(this, rf), o = new Float32Array(a.length * 8);
    let l = 0;
    for (const {
      x: h,
      y: c,
      width: d,
      height: p
    } of a) {
      const m = h * i + e, y = (1 - c) * r + s;
      o[l] = o[l + 4] = m, o[l + 1] = o[l + 3] = y, o[l + 2] = o[l + 6] = m + d * i, o[l + 5] = o[l + 7] = y - p * r, l += 8;
    }
    return o;
  }
  toSVGPath() {
    const e = [];
    for (const s of n(this, kh)) {
      let [i, r] = s;
      e.push(`M${i} ${r}`);
      for (let a = 2; a < s.length; a += 2) {
        const o = s[a], l = s[a + 1];
        o === i ? (e.push(`V${l}`), r = l) : l === r && (e.push(`H${o}`), i = o);
      }
      e.push("Z");
    }
    return e.join(" ");
  }
  serialize([e, s, i, r], a) {
    const o = [], l = i - e, h = r - s;
    for (const c of n(this, kh)) {
      const d = new Array(c.length);
      for (let p = 0; p < c.length; p += 2)
        d[p] = e + c[p] * l, d[p + 1] = r - c[p + 1] * h;
      o.push(d);
    }
    return o;
  }
  get box() {
    return n(this, nf);
  }
}
nf = new WeakMap(), rf = new WeakMap(), kh = new WeakMap();
class PA extends Up {
  newFreeDrawOutline(t, e, s, i, r, a) {
    return new Qy(t, e, s, i, r, a);
  }
}
var Qe, af;
class qE {
  constructor(t, e, s, i, r, a, o) {
    u(this, Qe, void 0);
    u(this, af, void 0);
    f(this, Qe, new PA(t, e, s, i, r, a, o)), f(this, af, r);
  }
  add(t, e) {
    return n(this, Qe).add(t, e) ? {
      path: {
        d: n(this, Qe).toSVGPath()
      }
    } : null;
  }
  addPoints(t) {
    let e = !1;
    for (let s = 0, i = t.length; s < i; s += 2)
      e = n(this, Qe).add(t[s], t[s + 1]) || e;
    return e ? {
      path: {
        d: n(this, Qe).toSVGPath()
      }
    } : null;
  }
  end(t, e) {
    return t === void 0 ? null : this.add(t, e);
  }
  isEmpty() {
    return n(this, Qe).isEmpty();
  }
  isCancellable() {
    return n(this, Qe).isCancellable();
  }
  removeLastElement() {
    return n(this, Qe).removeLastElement();
  }
  updateProperty(t, e) {
    return null;
  }
  getOutlines() {
    const t = n(this, Qe).getOutlines();
    return t.buildFocusOutline(2 * n(this, af)), t;
  }
  get defaultSVGProperties() {
    return {
      bbox: [0, 0, 1, 1],
      root: {
        viewBox: "0 0 1 1"
      },
      rootClass: {
        highlight: !0,
        free: !0
      },
      path: {
        d: n(this, Qe).toSVGPath()
      }
    };
  }
}
Qe = new WeakMap(), af = new WeakMap();
var Mm;
const Dm = class Dm extends pv {
  newOutliner(t, e, s, i, r, a, o = 0) {
    return new PA(t, e, s, i, r, a, o);
  }
  get isFree() {
    return !0;
  }
  buildFocusOutline(t) {
    this.focusOutline = this.getNewOutline(t / 2 + n(Dm, Mm), 25e-4);
  }
  get defaultSVGProperties() {
    return mv(this);
  }
  getFocusSVGProperties(t) {
    return bv(this, t);
  }
  get focusMustRemoveSelfIntersections() {
    return !0;
  }
  updateRotation(t) {
    return {
      root: {
        "data-main-rotation": t
      }
    };
  }
  updateProperty(t, e) {
    if (t !== "thickness")
      return null;
    const s = this.updateThickness(e / 2);
    return this.buildFocusOutline(e), s;
  }
  getPathResizedSVGProperties() {
    return {
      path: {
        d: this.toSVGPath()
      }
    };
  }
};
Mm = new WeakMap(), u(Dm, Mm, 1.5);
let Qy = Dm;
class MA extends kA {
  constructor(t = null) {
    super(), super.updateProperties(t);
  }
  updateSVGProperty(t, e) {
    t !== "thickness" && super.updateSVGProperty(t, e);
  }
  clone() {
    const t = new MA();
    return t.updateAll(this), t;
  }
}
var Ph, of, lf, hf, cf, Mh, df, Jy, Im, vv, Dh, Ep, Lm, Sv;
const we = class we extends Fc {
  constructor(e) {
    var s;
    super({
      ...e,
      name: "highlightEditor"
    });
    u(this, df);
    u(this, Im);
    u(this, Dh);
    u(this, Lm);
    u(this, Ph, null);
    u(this, of, 0);
    u(this, lf, null);
    u(this, hf, 0);
    u(this, cf, "");
    u(this, Mh, "");
    f(this, Ph, e.anchorNode || null), f(this, of, e.anchorOffset || 0), f(this, lf, e.focusNode || null), f(this, hf, e.focusOffset || 0), f(this, cf, e.methodOfCreation || ((s = this._drawOutlines) != null && s.isFree ? "main_toolbar" : "")), f(this, Mh, e.text || ""), this._isDraggable = !1, this.defaultL10nId = "pdfjs-editor-highlight-editor", this.rotate();
  }
  static get _keyboardManager() {
    const e = we.prototype;
    return H(this, "_keyboardManager", new ko([[["ArrowLeft"], e._moveCaret, {
      args: [0]
    }], [["ArrowRight"], e._moveCaret, {
      args: [1]
    }], [["ArrowUp"], e._moveCaret, {
      args: [2]
    }], [["ArrowDown"], e._moveCaret, {
      args: [3]
    }]]));
  }
  static initialize(e, s) {
    var i;
    at.initialize(e, s), this._defaultDrawingOptions || (this._defaultDrawingOptions = new MA({
      fill: ((i = s.highlightColors) == null ? void 0 : i.values().next().value) || "#fff066",
      "fill-opacity": we._DEFAULT_OPACITY,
      thickness: we._DEFAULT_THICKNESS
    }));
  }
  static getDefaultDrawingOptions(e) {
    const s = this._defaultDrawingOptions.clone();
    return s.updateProperties(e), s;
  }
  static get typesMap() {
    return H(this, "typesMap", /* @__PURE__ */ new Map([[Y.HIGHLIGHT_COLOR, "fill"], [Y.HIGHLIGHT_THICKNESS, "thickness"]]));
  }
  static get isDrawer() {
    return !1;
  }
  static get _hasClipPath() {
    return !0;
  }
  static get _hasDrawClass() {
    return !1;
  }
  _addOutlines(e) {
    const {
      boxes: s,
      drawOutlines: i
    } = e;
    !s && !i || (this._drawingOptions || (this._drawingOptions = e.drawingOptions || we.getDefaultDrawingOptions()), s && (e = {
      ...e,
      drawOutlines: qy.build(s, this._uiManager.direction === "ltr")
    }), super._addOutlines(e));
  }
  get colorType() {
    return Y.HIGHLIGHT_COLOR;
  }
  get color() {
    return this._drawingOptions.fill;
  }
  get opacity() {
    return this._drawingOptions["fill-opacity"];
  }
  get _opacityName() {
    return "fill-opacity";
  }
  get _drawRotation() {
    var e;
    return (e = this._drawOutlines) != null && e.isFree ? this.rotation : 0;
  }
  get isResizable() {
    return !1;
  }
  get _mustBeDisabledOnCommit() {
    return !1;
  }
  get _mustFixPosition() {
    var e;
    return !((e = this._drawOutlines) != null && e.isFree);
  }
  get telemetryInitialData() {
    return {
      action: "added",
      type: this._drawOutlines.isFree ? "free_highlight" : "highlight",
      color: this._uiManager.getNonHCMColorName(this.color),
      thickness: this._drawingOptions.thickness,
      methodOfCreation: n(this, cf)
    };
  }
  get telemetryFinalData() {
    return {
      type: "highlight",
      color: this._uiManager.getNonHCMColorName(this.color)
    };
  }
  static computeTelemetryFinalData(e) {
    return {
      numberOfColors: e.get("color").size
    };
  }
  translateInPage(e, s) {
  }
  get toolbarPosition() {
    return b(this, df, Jy).call(this, this._drawOutlines.focusOutline.lastPoint);
  }
  get commentButtonPosition() {
    return b(this, df, Jy).call(this, this._drawOutlines.firstPoint);
  }
  updateParams(e, s) {
    switch (e) {
      case Y.HIGHLIGHT_COLOR:
        this._updateColorAndOpacity(s, we._DEFAULT_OPACITY, e), this._reportTelemetry({
          action: "color_changed",
          color: this._uiManager.getNonHCMColorName(s)
        }, !0);
        break;
      case Y.HIGHLIGHT_THICKNESS:
        super.updateParams(e, s), this._reportTelemetry({
          action: "thickness_changed",
          thickness: s
        }, !0);
        break;
    }
  }
  get propertiesToUpdate() {
    const e = super.propertiesToUpdate;
    return e.push([Y.HIGHLIGHT_FREE, this._drawOutlines.isFree]), e;
  }
  get toolbarButtons() {
    return this._uiManager.highlightColors ? (this._colorPicker = new Np({
      editor: this
    }), [["colorPicker", this._colorPicker]]) : super.toolbarButtons;
  }
  fixAndSetPosition() {
    return super.fixAndSetPosition(this._drawRotation);
  }
  getRect(e, s) {
    return super.getRect(e, s, this._drawRotation);
  }
  onceAdded(e) {
    this.annotationElementId || this.parent.addUndoableEditor(this), e && this.div.focus();
  }
  remove() {
    this._reportTelemetry({
      action: "deleted"
    }), super.remove();
  }
  render() {
    if (this.div)
      return this.div;
    const e = super.render();
    return n(this, Mh) && (e.setAttribute("aria-label", n(this, Mh)), e.setAttribute("role", "mark")), this._drawOutlines.isFree ? e.classList.add("free") : e.addEventListener("keydown", b(this, Im, vv).bind(this), {
      signal: this._uiManager._signal
    }), this.enableEditing(), e;
  }
  _moveCaret(e) {
    switch (this.parent.unselect(this), e) {
      case 0:
      case 2:
        b(this, Dh, Ep).call(this, !0);
        break;
      case 1:
      case 3:
        b(this, Dh, Ep).call(this, !1);
        break;
    }
  }
  unselect() {
    super.unselect(), this._drawOutlines.isFree || b(this, Dh, Ep).call(this, !1);
  }
  static createDrawerInstance({
    x: e,
    y: s,
    box: i,
    parent: r,
    isLTR: a
  }) {
    return new qE(e, s, i, r.scale, this._defaultDrawingOptions.thickness / 2, a, 1e-3);
  }
  static _getDrawingTarget(e, {
    target: s
  }) {
    return s.closest(".textLayer");
  }
  static _getPointerCoords({
    x: e,
    y: s
  }) {
    return [e, s];
  }
  static _addDrawingListeners(e, s) {
    e.classList.add("free"), s.addEventListener("abort", () => e.classList.remove("free"), {
      once: !0
    }), window.addEventListener("blur", () => this._endDraw(null), {
      signal: s
    }), window.addEventListener("pointerdown", jt, {
      capture: !0,
      passive: !1,
      signal: s
    });
  }
  static _endDrawingSession(e = !1) {
    return this.endDrawing(e);
  }
  createDrawingOptions({
    color: e,
    opacity: s,
    thickness: i
  }) {
    const {
      _defaultDrawingOptions: r,
      _DEFAULT_OPACITY: a
    } = we;
    this._drawingOptions = we.getDefaultDrawingOptions({
      fill: D.makeHexColor(...e),
      "fill-opacity": s || a,
      thickness: i || r.thickness
    });
  }
  static deserializeDraw(e, s, i, r, a, o, l) {
    const {
      quadPoints: h
    } = o;
    if (h) {
      const y = [];
      for (let A = 0, v = h.length; A < v; A += 8)
        y.push({
          x: (h[A] - e) / i,
          y: 1 - (h[A + 1] - s) / r,
          width: (h[A + 2] - h[A]) / i,
          height: (h[A + 1] - h[A + 5]) / r
        });
      return qy.build(y, l.direction === "ltr");
    }
    const c = o.thickness || this._defaultDrawingOptions.thickness, d = (o.inkLists || o.outlines.points)[0], p = new PA(d[0] - e, r - (d[1] - s), [0, 0, i, r], 1, c / 2, !0, 1e-3);
    for (let y = 0, A = d.length; y < A; y += 2)
      p.add(d[y] - e, r - (d[y + 1] - s));
    const m = p.getOutlines();
    return m.buildFocusOutline(c), m;
  }
  static async deserialize(e, s, i) {
    let r = null;
    if (e instanceof Jw) {
      const {
        data: {
          quadPoints: o,
          rect: l,
          rotation: h,
          id: c,
          color: d,
          opacity: p,
          popupRef: m,
          richText: y,
          contentsObj: A,
          creationDate: v,
          modificationDate: w
        },
        parent: {
          page: {
            pageNumber: S
          }
        }
      } = e;
      r = e = {
        annotationType: G.HIGHLIGHT,
        color: Array.from(d),
        opacity: p,
        quadPoints: o,
        pageIndex: S - 1,
        rect: l.slice(0),
        rotation: h,
        annotationElementId: c,
        id: c,
        deleted: !1,
        popupRef: m,
        richText: y,
        comment: (A == null ? void 0 : A.str) || null,
        creationDate: v,
        modificationDate: w
      };
    } else if (e instanceof TA) {
      const {
        data: {
          inkLists: o,
          rect: l,
          rotation: h,
          id: c,
          color: d,
          borderStyle: {
            rawWidth: p
          },
          popupRef: m,
          richText: y,
          contentsObj: A,
          creationDate: v,
          modificationDate: w
        },
        parent: {
          page: {
            pageNumber: S
          }
        }
      } = e;
      r = e = {
        annotationType: G.HIGHLIGHT,
        color: Array.from(d),
        thickness: p,
        inkLists: o,
        pageIndex: S - 1,
        rect: l.slice(0),
        rotation: h,
        annotationElementId: c,
        id: c,
        deleted: !1,
        popupRef: m,
        richText: y,
        comment: (A == null ? void 0 : A.str) || null,
        creationDate: v,
        modificationDate: w
      };
    }
    const a = await super.deserialize(e, s, i);
    return a._initialData = r, e.comment && a.setCommentData(e), a;
  }
  serialize(e = !1) {
    if (this.isEmpty() || e)
      return null;
    if (this.deleted)
      return this.serializeDeleted();
    const s = super.serialize(e);
    return Object.assign(s, {
      color: at._colorManager.convert(this._uiManager.getNonHCMColor(this.color)),
      opacity: this.opacity,
      thickness: this._drawingOptions.thickness,
      quadPoints: this._drawOutlines.serializeQuadPoints(this.pageTranslation, this.pageDimensions),
      outlines: this._drawOutlines.serialize(s.rect, this._drawRotation)
    }), this.addComment(s), this.annotationElementId && !b(this, Lm, Sv).call(this, s) ? null : (s.id = this.annotationElementId, s);
  }
  renderAnnotationElement(e) {
    return this.deleted ? (e.hide(), null) : (e.updateEdited({
      rect: this.getPDFRect(),
      popup: this.comment
    }), null);
  }
};
Ph = new WeakMap(), of = new WeakMap(), lf = new WeakMap(), hf = new WeakMap(), cf = new WeakMap(), Mh = new WeakMap(), df = new WeakSet(), Jy = function([e, s]) {
  const [i, r, a, o] = this._drawOutlines.box;
  return [(e - i) / a, (s - r) / o];
}, Im = new WeakSet(), vv = function(e) {
  we._keyboardManager.exec(this, e);
}, Dh = new WeakSet(), Ep = function(e) {
  if (!n(this, Ph))
    return;
  const s = window.getSelection();
  e ? s.setPosition(n(this, Ph), n(this, of)) : s.setPosition(n(this, lf), n(this, hf));
}, Lm = new WeakSet(), Sv = function(e) {
  const {
    color: s
  } = this._initialData;
  return this.hasEditedComment || e.color.some((i, r) => i !== s[r]);
}, T(we, "_DEFAULT_OPACITY", 1), T(we, "_DEFAULT_THICKNESS", 12), T(we, "_defaultDrawingOptions", null), T(we, "_type", "highlight"), T(we, "_editorType", G.HIGHLIGHT);
let Gp = we;
var gi, hr, Ht, re, po, Ih, ae, Ut, As, go, mo, bo, Lh, xp, Fh, Cp, uf, Zy;
class QE {
  constructor(t, e, s, i, r, a) {
    u(this, Lh);
    u(this, Fh);
    u(this, uf);
    u(this, gi, new Float64Array(6));
    u(this, hr, new Float64Array(2));
    u(this, Ht, void 0);
    u(this, re, void 0);
    u(this, po, void 0);
    u(this, Ih, void 0);
    u(this, ae, void 0);
    u(this, Ut, "");
    u(this, As, 0);
    u(this, go, new Of());
    u(this, mo, void 0);
    u(this, bo, void 0);
    f(this, mo, s), f(this, bo, i), f(this, po, r), f(this, Ih, a), [t, e] = b(this, Lh, xp).call(this, t, e);
    const o = f(this, Ht, [NaN, NaN, NaN, NaN, t, e]);
    f(this, ae, [t, e]), f(this, re, [{
      line: o,
      points: n(this, ae)
    }]), n(this, gi).set(o, 0), n(this, hr).set([t, e], 0);
  }
  updateProperty(t, e) {
    t === "stroke-width" && f(this, Ih, e);
  }
  isEmpty() {
    var t;
    return !((t = n(this, re)) != null && t.length);
  }
  isCancellable() {
    return n(this, ae).length <= 10;
  }
  add(t, e) {
    return b(this, Fh, Cp).call(this, t, e) && this.toSVGPath(), {
      path: {
        d: b(this, uf, Zy).call(this)
      }
    };
  }
  addPoints(t) {
    let e = !1;
    for (let s = 0, i = t.length; s < i; s += 2)
      b(this, Fh, Cp).call(this, t[s], t[s + 1]) && (e = !0, n(this, ae).length <= 6 && (this.toSVGPath(), e = !1));
    return e && this.toSVGPath(), {
      path: {
        d: b(this, uf, Zy).call(this)
      }
    };
  }
  end(t, e) {
    return t !== void 0 && b(this, Fh, Cp).call(this, t, e) ? {
      path: {
        d: this.toSVGPath()
      }
    } : n(this, ae).length === 2 ? {
      path: {
        d: this.toSVGPath()
      }
    } : {
      path: {
        d: n(this, Ut)
      }
    };
  }
  startNew(t, e, s, i, r) {
    f(this, mo, s), f(this, bo, i), f(this, po, r), [t, e] = b(this, Lh, xp).call(this, t, e);
    const a = f(this, Ht, [NaN, NaN, NaN, NaN, t, e]);
    f(this, ae, [t, e]), n(this, hr).set([t, e], 0);
    const o = n(this, re).at(-1);
    return o && (o.line = new Float32Array(o.line), o.points = new Float32Array(o.points)), n(this, re).push({
      line: a,
      points: n(this, ae)
    }), n(this, gi).set(a, 0), f(this, As, 0), this.toSVGPath(), null;
  }
  getLastElement() {
    return n(this, re).at(-1);
  }
  setLastElement(t) {
    return n(this, re) ? (n(this, re).push(t), f(this, Ht, t.line), f(this, ae, t.points), f(this, As, 0), {
      path: {
        d: this.toSVGPath()
      }
    }) : n(this, go).setLastElement(t);
  }
  removeLastElement() {
    if (!n(this, re))
      return n(this, go).removeLastElement();
    n(this, re).pop(), f(this, Ut, "");
    for (let t = 0, e = n(this, re).length; t < e; t++) {
      const {
        line: s,
        points: i
      } = n(this, re)[t];
      f(this, Ht, s), f(this, ae, i), f(this, As, 0), this.toSVGPath();
    }
    return {
      path: {
        d: n(this, Ut)
      }
    };
  }
  toSVGPath() {
    const t = F.svgRound(n(this, Ht)[4]), e = F.svgRound(n(this, Ht)[5]);
    if (n(this, ae).length === 2)
      return f(this, Ut, `${n(this, Ut)} M ${t} ${e} Z`), n(this, Ut);
    if (n(this, ae).length <= 6) {
      const i = n(this, Ut).lastIndexOf("M");
      f(this, Ut, `${n(this, Ut).slice(0, i)} M ${t} ${e}`), f(this, As, 6);
    }
    if (n(this, ae).length === 4) {
      const i = F.svgRound(n(this, Ht)[10]), r = F.svgRound(n(this, Ht)[11]);
      return f(this, Ut, `${n(this, Ut)} L ${i} ${r}`), f(this, As, 12), n(this, Ut);
    }
    const s = [];
    n(this, As) === 0 && (s.push(`M ${t} ${e}`), f(this, As, 6));
    for (let i = n(this, As), r = n(this, Ht).length; i < r; i += 6) {
      const [a, o, l, h, c, d] = n(this, Ht).slice(i, i + 6).map(F.svgRound);
      s.push(`C${a} ${o} ${l} ${h} ${c} ${d}`);
    }
    return f(this, Ut, n(this, Ut) + s.join(" ")), f(this, As, n(this, Ht).length), n(this, Ut);
  }
  getOutlines(t, e, s, i) {
    const r = n(this, re).at(-1);
    return r.line = new Float32Array(r.line), r.points = new Float32Array(r.points), n(this, go).build(n(this, re), t, e, s, n(this, po), n(this, Ih), i), f(this, gi, null), f(this, Ht, null), f(this, re, null), f(this, Ut, null), n(this, go);
  }
  get defaultSVGProperties() {
    return {
      root: {
        viewBox: "0 0 10000 10000"
      },
      rootClass: {
        draw: !0
      },
      bbox: [0, 0, 1, 1]
    };
  }
}
gi = new WeakMap(), hr = new WeakMap(), Ht = new WeakMap(), re = new WeakMap(), po = new WeakMap(), Ih = new WeakMap(), ae = new WeakMap(), Ut = new WeakMap(), As = new WeakMap(), go = new WeakMap(), mo = new WeakMap(), bo = new WeakMap(), Lh = new WeakSet(), xp = function(t, e) {
  return F._normalizePoint(t, e, n(this, mo), n(this, bo), n(this, po));
}, Fh = new WeakSet(), Cp = function(t, e) {
  [t, e] = b(this, Lh, xp).call(this, t, e), n(this, hr).set([t, e], 0);
  const [s, i, r, a] = n(this, gi).subarray(2, 6), o = t - r, l = e - a;
  return Math.hypot(n(this, mo) * o, n(this, bo) * l) <= 2 ? !1 : (n(this, ae).push(t, e), isNaN(s) ? (n(this, gi).set([r, a, t, e], 2), n(this, Ht).push(NaN, NaN, NaN, NaN, t, e), !0) : (isNaN(n(this, gi)[0]) && n(this, Ht).splice(6, 6), n(this, gi).set([s, i, r, a, t, e], 0), n(this, Ht).push(...F.createBezierPoints(s, i, r, a, t, e)), !0));
}, uf = new WeakSet(), Zy = function() {
  const t = F.svgRound(n(this, hr)[0]), e = F.svgRound(n(this, hr)[1]);
  if (n(this, ae).length === 2) {
    const s = F.svgRound(n(this, Ht)[4]), i = F.svgRound(n(this, Ht)[5]);
    return `${n(this, Ut)} M ${s} ${i} L ${t} ${e}`;
  }
  return `${n(this, Ut)} L ${t} ${e}`;
};
var Se, ff, pf, Je, mi, bi, Rh, Oh, yo, Ns, Ei, Fm, Ev, Rm, xv, Om, Cv;
class Of extends F {
  constructor() {
    super(...arguments);
    u(this, Ns);
    u(this, Fm);
    u(this, Rm);
    u(this, Om);
    u(this, Se, void 0);
    u(this, ff, 0);
    u(this, pf, void 0);
    u(this, Je, void 0);
    u(this, mi, void 0);
    u(this, bi, void 0);
    u(this, Rh, void 0);
    u(this, Oh, void 0);
    u(this, yo, void 0);
  }
  build(e, s, i, r, a, o, l) {
    f(this, mi, s), f(this, bi, i), f(this, Rh, r), f(this, Oh, a), f(this, yo, o), f(this, pf, l ?? 0), f(this, Je, e), b(this, Rm, xv).call(this);
  }
  get thickness() {
    return n(this, yo);
  }
  setLastElement(e) {
    return n(this, Je).push(e), {
      path: {
        d: this.toSVGPath()
      }
    };
  }
  removeLastElement() {
    return n(this, Je).pop(), {
      path: {
        d: this.toSVGPath()
      }
    };
  }
  toSVGPath() {
    const e = [];
    for (const {
      line: s
    } of n(this, Je)) {
      if (e.push(`M${F.svgRound(s[4])} ${F.svgRound(s[5])}`), s.length === 6) {
        e.push("Z");
        continue;
      }
      if (s.length === 12 && isNaN(s[6])) {
        e.push(`L${F.svgRound(s[10])} ${F.svgRound(s[11])}`);
        continue;
      }
      for (let i = 6, r = s.length; i < r; i += 6) {
        const [a, o, l, h, c, d] = s.subarray(i, i + 6).map(F.svgRound);
        e.push(`C${a} ${o} ${l} ${h} ${c} ${d}`);
      }
    }
    return e.join("");
  }
  serialize([e, s, i, r], a) {
    const o = [], l = [], [h, c, d, p] = b(this, Fm, Ev).call(this);
    let m, y, A, v, w, S, E, x, C;
    switch (n(this, Oh)) {
      case 0:
        C = F._rescale, m = e, y = s + r, A = i, v = -r, w = e + h * i, S = s + (1 - c - p) * r, E = e + (h + d) * i, x = s + (1 - c) * r;
        break;
      case 90:
        C = F._rescaleAndSwap, m = e, y = s, A = i, v = r, w = e + c * i, S = s + h * r, E = e + (c + p) * i, x = s + (h + d) * r;
        break;
      case 180:
        C = F._rescale, m = e + i, y = s, A = -i, v = r, w = e + (1 - h - d) * i, S = s + c * r, E = e + (1 - h) * i, x = s + (c + p) * r;
        break;
      case 270:
        C = F._rescaleAndSwap, m = e + i, y = s + r, A = -i, v = -r, w = e + (1 - c - p) * i, S = s + (1 - h - d) * r, E = e + (1 - c) * i, x = s + (1 - h) * r;
        break;
    }
    for (const {
      line: _,
      points: k
    } of n(this, Je))
      o.push(C(_, m, y, A, v, a ? new Array(_.length) : null)), l.push(C(k, m, y, A, v, a ? new Array(k.length) : null));
    return {
      lines: o,
      points: l,
      rect: [w, S, E, x]
    };
  }
  static deserialize(e, s, i, r, a, {
    paths: {
      lines: o,
      points: l
    },
    rotation: h,
    thickness: c
  }) {
    const d = [];
    let p, m, y, A, v;
    switch (h) {
      case 0:
        v = F._rescale, p = -e / i, m = s / r + 1, y = 1 / i, A = -1 / r;
        break;
      case 90:
        v = F._rescaleAndSwap, p = -s / r, m = -e / i, y = 1 / r, A = 1 / i;
        break;
      case 180:
        v = F._rescale, p = e / i + 1, m = -s / r, y = -1 / i, A = 1 / r;
        break;
      case 270:
        v = F._rescaleAndSwap, p = s / r + 1, m = e / i + 1, y = -1 / r, A = -1 / i;
        break;
    }
    if (!o) {
      o = [];
      for (const S of l) {
        const E = S.length;
        if (E === 2) {
          o.push(new Float32Array([NaN, NaN, NaN, NaN, S[0], S[1]]));
          continue;
        }
        if (E === 4) {
          o.push(new Float32Array([NaN, NaN, NaN, NaN, S[0], S[1], NaN, NaN, NaN, NaN, S[2], S[3]]));
          continue;
        }
        const x = new Float32Array(3 * (E - 2));
        o.push(x);
        let [C, _, k, P] = S.subarray(0, 4);
        x.set([NaN, NaN, NaN, NaN, C, _], 0);
        for (let M = 4; M < E; M += 2) {
          const I = S[M], R = S[M + 1];
          x.set(F.createBezierPoints(C, _, k, P, I, R), (M - 2) * 3), [C, _, k, P] = [k, P, I, R];
        }
      }
    }
    for (let S = 0, E = o.length; S < E; S++)
      d.push({
        line: v(o[S].map((x) => x ?? NaN), p, m, y, A),
        points: v(l[S].map((x) => x ?? NaN), p, m, y, A)
      });
    const w = new this.prototype.constructor();
    return w.build(d, i, r, 1, h, c, a), w;
  }
  get box() {
    return n(this, Se);
  }
  updateProperty(e, s) {
    return e === "stroke-width" ? b(this, Om, Cv).call(this, s) : null;
  }
  updateParentDimensions([e, s], i) {
    const [r, a] = b(this, Ns, Ei).call(this);
    f(this, mi, e), f(this, bi, s), f(this, Rh, i);
    const [o, l] = b(this, Ns, Ei).call(this), h = o - r, c = l - a, d = n(this, Se);
    return d[0] -= h, d[1] -= c, d[2] += 2 * h, d[3] += 2 * c, d;
  }
  updateRotation(e) {
    return f(this, ff, e), {
      path: {
        transform: this.rotationTransform
      }
    };
  }
  get viewBox() {
    return n(this, Se).map(F.svgRound).join(" ");
  }
  get defaultProperties() {
    const [e, s] = n(this, Se);
    return {
      root: {
        viewBox: this.viewBox
      },
      path: {
        "transform-origin": `${F.svgRound(e)} ${F.svgRound(s)}`
      }
    };
  }
  get rotationTransform() {
    const [, , e, s] = n(this, Se);
    let i = 0, r = 0, a = 0, o = 0, l = 0, h = 0;
    switch (n(this, ff)) {
      case 90:
        r = s / e, a = -e / s, l = e;
        break;
      case 180:
        i = -1, o = -1, l = e, h = s;
        break;
      case 270:
        r = -s / e, a = e / s, h = s;
        break;
      default:
        return "";
    }
    return `matrix(${i} ${r} ${a} ${o} ${F.svgRound(l)} ${F.svgRound(h)})`;
  }
  getPathResizingSVGProperties([e, s, i, r]) {
    const [a, o] = b(this, Ns, Ei).call(this), [l, h, c, d] = n(this, Se);
    if (Math.abs(c - a) <= F.PRECISION || Math.abs(d - o) <= F.PRECISION) {
      const v = e + i / 2 - (l + c / 2), w = s + r / 2 - (h + d / 2);
      return {
        path: {
          "transform-origin": `${F.svgRound(e)} ${F.svgRound(s)}`,
          transform: `${this.rotationTransform} translate(${v} ${w})`
        }
      };
    }
    const p = (i - 2 * a) / (c - 2 * a), m = (r - 2 * o) / (d - 2 * o), y = c / i, A = d / r;
    return {
      path: {
        "transform-origin": `${F.svgRound(l)} ${F.svgRound(h)}`,
        transform: `${this.rotationTransform} scale(${y} ${A}) translate(${F.svgRound(a)} ${F.svgRound(o)}) scale(${p} ${m}) translate(${F.svgRound(-a)} ${F.svgRound(-o)})`
      }
    };
  }
  getPathResizedSVGProperties([e, s, i, r]) {
    const [a, o] = b(this, Ns, Ei).call(this), l = n(this, Se), [h, c, d, p] = l;
    if (l[0] = e, l[1] = s, l[2] = i, l[3] = r, Math.abs(d - a) <= F.PRECISION || Math.abs(p - o) <= F.PRECISION) {
      const w = e + i / 2 - (h + d / 2), S = s + r / 2 - (c + p / 2);
      for (const {
        line: E,
        points: x
      } of n(this, Je))
        F._translate(E, w, S, E), F._translate(x, w, S, x);
      return {
        root: {
          viewBox: this.viewBox
        },
        path: {
          "transform-origin": `${F.svgRound(e)} ${F.svgRound(s)}`,
          transform: this.rotationTransform || null,
          d: this.toSVGPath()
        }
      };
    }
    const m = (i - 2 * a) / (d - 2 * a), y = (r - 2 * o) / (p - 2 * o), A = -m * (h + a) + e + a, v = -y * (c + o) + s + o;
    if (m !== 1 || y !== 1 || A !== 0 || v !== 0)
      for (const {
        line: w,
        points: S
      } of n(this, Je))
        F._rescale(w, A, v, m, y, w), F._rescale(S, A, v, m, y, S);
    return {
      root: {
        viewBox: this.viewBox
      },
      path: {
        "transform-origin": `${F.svgRound(e)} ${F.svgRound(s)}`,
        transform: this.rotationTransform || null,
        d: this.toSVGPath()
      }
    };
  }
  getPathTranslatedSVGProperties([e, s], i) {
    const [r, a] = i, o = n(this, Se), l = e - o[0], h = s - o[1];
    if (n(this, mi) === r && n(this, bi) === a)
      for (const {
        line: c,
        points: d
      } of n(this, Je))
        F._translate(c, l, h, c), F._translate(d, l, h, d);
    else {
      const c = n(this, mi) / r, d = n(this, bi) / a;
      f(this, mi, r), f(this, bi, a);
      for (const {
        line: p,
        points: m
      } of n(this, Je))
        F._rescale(p, l, h, c, d, p), F._rescale(m, l, h, c, d, m);
      o[2] *= c, o[3] *= d;
    }
    return o[0] = e, o[1] = s, {
      root: {
        viewBox: this.viewBox
      },
      path: {
        d: this.toSVGPath(),
        "transform-origin": `${F.svgRound(e)} ${F.svgRound(s)}`
      }
    };
  }
  get defaultSVGProperties() {
    const e = n(this, Se);
    return {
      root: {
        viewBox: this.viewBox
      },
      rootClass: {
        draw: !0
      },
      path: {
        d: this.toSVGPath(),
        "transform-origin": `${F.svgRound(e[0])} ${F.svgRound(e[1])}`,
        transform: this.rotationTransform || null
      },
      bbox: e
    };
  }
}
Se = new WeakMap(), ff = new WeakMap(), pf = new WeakMap(), Je = new WeakMap(), mi = new WeakMap(), bi = new WeakMap(), Rh = new WeakMap(), Oh = new WeakMap(), yo = new WeakMap(), Ns = new WeakSet(), Ei = function(e = n(this, yo)) {
  const s = n(this, pf) + e / 2 * n(this, Rh);
  return n(this, Oh) % 180 === 0 ? [s / n(this, mi), s / n(this, bi)] : [s / n(this, bi), s / n(this, mi)];
}, Fm = new WeakSet(), Ev = function() {
  const [e, s, i, r] = n(this, Se), [a, o] = b(this, Ns, Ei).call(this, 0);
  return [e + a, s + o, i - 2 * a, r - 2 * o];
}, Rm = new WeakSet(), xv = function() {
  const e = f(this, Se, Rr.slice());
  for (const {
    line: r
  } of n(this, Je)) {
    if (r.length <= 12) {
      for (let l = 4, h = r.length; l < h; l += 6)
        D.pointBoundingBox(r[l], r[l + 1], e);
      continue;
    }
    let a = r[4], o = r[5];
    for (let l = 6, h = r.length; l < h; l += 6) {
      const [c, d, p, m, y, A] = r.subarray(l, l + 6);
      D.bezierBoundingBox(a, o, c, d, p, m, y, A, e), a = y, o = A;
    }
  }
  const [s, i] = b(this, Ns, Ei).call(this);
  e[0] = ut(e[0] - s, 0, 1), e[1] = ut(e[1] - i, 0, 1), e[2] = ut(e[2] + s, 0, 1), e[3] = ut(e[3] + i, 0, 1), e[2] -= e[0], e[3] -= e[1];
}, Om = new WeakSet(), Cv = function(e) {
  const [s, i] = b(this, Ns, Ei).call(this);
  f(this, yo, e);
  const [r, a] = b(this, Ns, Ei).call(this), [o, l] = [r - s, a - i], h = n(this, Se);
  return h[0] -= o, h[1] -= l, h[2] += 2 * o, h[3] += 2 * l, h;
};
class cb extends kA {
  constructor(t) {
    super(), this._viewParameters = t, super.updateProperties({
      fill: "none",
      stroke: at._defaultLineColor,
      "stroke-opacity": 1,
      "stroke-width": 1,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-miterlimit": 10
    });
  }
  updateSVGProperty(t, e) {
    t === "stroke-width" && (e ?? (e = this["stroke-width"]), e *= this._viewParameters.realScale), super.updateSVGProperty(t, e);
  }
  clone() {
    const t = new cb(this._viewParameters);
    return t.updateAll(this), t;
  }
}
var Nm, _v;
const Go = class Go extends Fc {
  constructor(e) {
    super({
      ...e,
      name: "inkEditor"
    });
    u(this, Nm);
    this._willKeepAspectRatio = !0, this.defaultL10nId = "pdfjs-editor-ink-editor";
  }
  static initialize(e, s) {
    at.initialize(e, s), this._defaultDrawingOptions = new cb(s.viewParameters);
  }
  static getDefaultDrawingOptions(e) {
    const s = this._defaultDrawingOptions.clone();
    return s.updateProperties(e), s;
  }
  static get supportMultipleDrawings() {
    return !0;
  }
  static get typesMap() {
    return H(this, "typesMap", /* @__PURE__ */ new Map([[Y.INK_THICKNESS, "stroke-width"], [Y.INK_COLOR, "stroke"], [Y.INK_OPACITY, "stroke-opacity"]]));
  }
  static createDrawerInstance({
    x: e,
    y: s,
    box: [, , i, r],
    rotation: a
  }) {
    return new QE(e, s, i, r, a, this._defaultDrawingOptions["stroke-width"]);
  }
  static deserializeDraw(e, s, i, r, a, o) {
    return Of.deserialize(e, s, i, r, a, o);
  }
  static async deserialize(e, s, i) {
    let r = null;
    if (e instanceof TA) {
      const {
        data: {
          inkLists: o,
          rect: l,
          rotation: h,
          id: c,
          color: d,
          opacity: p,
          borderStyle: {
            rawWidth: m
          },
          popupRef: y,
          richText: A,
          contentsObj: v,
          creationDate: w,
          modificationDate: S
        },
        parent: {
          page: {
            pageNumber: E
          }
        }
      } = e;
      r = e = {
        annotationType: G.INK,
        color: Array.from(d),
        thickness: m,
        opacity: p,
        paths: {
          points: o
        },
        boxes: null,
        pageIndex: E - 1,
        rect: l.slice(0),
        rotation: h,
        annotationElementId: c,
        id: c,
        deleted: !1,
        popupRef: y,
        richText: A,
        comment: (v == null ? void 0 : v.str) || null,
        creationDate: w,
        modificationDate: S
      };
    }
    const a = await super.deserialize(e, s, i);
    return a._initialData = r, e.comment && a.setCommentData(e), a;
  }
  get toolbarButtons() {
    return this._colorPicker || (this._colorPicker = new Bp(this)), [["colorPicker", this._colorPicker]];
  }
  get colorType() {
    return Y.INK_COLOR;
  }
  get colorAndOpacityType() {
    return Y.INK_COLOR_AND_OPACITY;
  }
  get opacityType() {
    return Y.INK_OPACITY;
  }
  updateParams(e, s) {
    if (e === Y.INK_COLOR_AND_OPACITY) {
      this._updateColorAndOpacity(s.color, s.opacity);
      return;
    }
    super.updateParams(e, s);
  }
  static updateDefaultParams(e, s) {
    if (e === Y.INK_COLOR_AND_OPACITY) {
      super.updateDefaultParams(Y.INK_COLOR, s.color), super.updateDefaultParams(Y.INK_OPACITY, s.opacity);
      return;
    }
    super.updateDefaultParams(e, s);
  }
  get color() {
    return this._drawingOptions.stroke;
  }
  get opacity() {
    return this._drawingOptions["stroke-opacity"];
  }
  onScaleChanging() {
    if (!this.parent)
      return;
    super.onScaleChanging();
    const {
      _drawId: e,
      _drawingOptions: s,
      parent: i
    } = this;
    s.updateSVGProperty("stroke-width"), i.drawLayer.updateProperties(e, s.toSVGProperties());
  }
  static onScaleChangingWhenDrawing() {
    const e = this._currentParent;
    e && (super.onScaleChangingWhenDrawing(), this._defaultDrawingOptions.updateSVGProperty("stroke-width"), e.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties()));
  }
  createDrawingOptions({
    color: e,
    thickness: s,
    opacity: i
  }) {
    this._drawingOptions = Go.getDefaultDrawingOptions({
      stroke: D.makeHexColor(...e),
      "stroke-width": s,
      "stroke-opacity": i
    });
  }
  serialize(e = !1) {
    if (this.isEmpty())
      return null;
    if (this.deleted)
      return this.serializeDeleted();
    const {
      lines: s,
      points: i
    } = this.serializeDraw(e), {
      _drawingOptions: {
        stroke: r,
        "stroke-opacity": a,
        "stroke-width": o
      }
    } = this, l = Object.assign(super.serialize(e), {
      color: at._colorManager.convert(r),
      opacity: a,
      thickness: o,
      paths: {
        lines: s,
        points: i
      }
    });
    return this.addComment(l), e ? (l.isCopy = !0, l) : this.annotationElementId && !b(this, Nm, _v).call(this, l) ? null : (l.id = this.annotationElementId, l);
  }
  renderAnnotationElement(e) {
    if (this.deleted)
      return e.hide(), null;
    const {
      points: s,
      rect: i
    } = this.serializeDraw(!1);
    return e.updateEdited({
      rect: i,
      thickness: this._drawingOptions["stroke-width"],
      points: s,
      popup: this.comment
    }), null;
  }
};
Nm = new WeakSet(), _v = function(e) {
  const {
    color: s,
    thickness: i,
    opacity: r,
    pageIndex: a
  } = this._initialData;
  return this.hasEditedComment || this._hasBeenMoved || this._hasBeenResized || e.color.some((o, l) => o !== s[l]) || e.thickness !== i || e.opacity !== r || e.pageIndex !== a;
}, T(Go, "_type", "ink"), T(Go, "_editorType", G.INK), T(Go, "_defaultDrawingOptions", null);
let tA = Go;
class eA extends Of {
  toSVGPath() {
    let t = super.toSVGPath();
    return t.endsWith("Z") || (t += "Z"), t;
  }
}
const zf = 8, ic = 3;
var Ao, gf, sA, Bs, Bm, Tv, Hm, kv, mf, iA, Nh, _p, Um, Pv, Gm, Mv, $m, Dv, bf, nA, yf, rA, zm, Iv;
class Vt {
  static extractContoursFromText(t, {
    fontFamily: e,
    fontStyle: s,
    fontWeight: i
  }, r, a, o, l) {
    let h = new OffscreenCanvas(1, 1), c = h.getContext("2d", {
      alpha: !1
    });
    const d = 200, p = c.font = `${s} ${i} ${d}px ${e}`, {
      actualBoundingBoxLeft: m,
      actualBoundingBoxRight: y,
      actualBoundingBoxAscent: A,
      actualBoundingBoxDescent: v,
      fontBoundingBoxAscent: w,
      fontBoundingBoxDescent: S,
      width: E
    } = c.measureText(t), x = 1.5, C = Math.ceil(Math.max(Math.abs(m) + Math.abs(y) || 0, E) * x), _ = Math.ceil(Math.max(Math.abs(A) + Math.abs(v) || d, Math.abs(w) + Math.abs(S) || d) * x);
    h = new OffscreenCanvas(C, _), c = h.getContext("2d", {
      alpha: !0,
      willReadFrequently: !0
    }), c.font = p, c.filter = "grayscale(1)", c.fillStyle = "white", c.fillRect(0, 0, C, _), c.fillStyle = "black", c.fillText(t, C * (x - 1) / 2, _ * (3 - x) / 2);
    const k = b(this, bf, nA).call(this, c.getImageData(0, 0, C, _).data), P = b(this, $m, Dv).call(this, k), M = b(this, yf, rA).call(this, P), I = b(this, mf, iA).call(this, k, C, _, M);
    return this.processDrawnLines({
      lines: {
        curves: I,
        width: C,
        height: _
      },
      pageWidth: r,
      pageHeight: a,
      rotation: o,
      innerMargin: l,
      mustSmooth: !0,
      areContours: !0
    });
  }
  static process(t, e, s, i, r) {
    const [a, o, l] = b(this, zm, Iv).call(this, t), [h, c] = b(this, Gm, Mv).call(this, a, o, l, Math.hypot(o, l) * n(this, Ao).sigmaSFactor, n(this, Ao).sigmaR, n(this, Ao).kernelSize), d = b(this, yf, rA).call(this, c), p = b(this, mf, iA).call(this, h, o, l, d);
    return this.processDrawnLines({
      lines: {
        curves: p,
        width: o,
        height: l
      },
      pageWidth: e,
      pageHeight: s,
      rotation: i,
      innerMargin: r,
      mustSmooth: !0,
      areContours: !0
    });
  }
  static processDrawnLines({
    lines: t,
    pageWidth: e,
    pageHeight: s,
    rotation: i,
    innerMargin: r,
    mustSmooth: a,
    areContours: o
  }) {
    i % 180 !== 0 && ([e, s] = [s, e]);
    const {
      curves: l,
      width: h,
      height: c
    } = t, d = t.thickness ?? 0, p = [], m = Math.min(e / h, s / c), y = m / e, A = m / s, v = [];
    for (const {
      points: S
    } of l) {
      const E = a ? b(this, Um, Pv).call(this, S) : S;
      if (!E)
        continue;
      v.push(E);
      const x = E.length, C = new Float32Array(x), _ = new Float32Array(3 * (x === 2 ? 2 : x - 2));
      if (p.push({
        line: _,
        points: C
      }), x === 2) {
        C[0] = E[0] * y, C[1] = E[1] * A, _.set([NaN, NaN, NaN, NaN, C[0], C[1]], 0);
        continue;
      }
      let [k, P, M, I] = E;
      k *= y, P *= A, M *= y, I *= A, C.set([k, P, M, I], 0), _.set([NaN, NaN, NaN, NaN, k, P], 0);
      for (let R = 4; R < x; R += 2) {
        const X = C[R] = E[R] * y, V = C[R + 1] = E[R + 1] * A;
        _.set(F.createBezierPoints(k, P, M, I, X, V), (R - 2) * 3), [k, P, M, I] = [M, I, X, V];
      }
    }
    if (p.length === 0)
      return null;
    const w = o ? new eA() : new Of();
    return w.build(p, e, s, 1, i, o ? 0 : d, r), {
      outline: w,
      newCurves: v,
      areContours: o,
      thickness: d,
      width: h,
      height: c
    };
  }
  static async compressSignature({
    outlines: t,
    areContours: e,
    thickness: s,
    width: i,
    height: r
  }) {
    let a = 1 / 0, o = -1 / 0, l = 0;
    for (const S of t) {
      l += S.length;
      for (let E = 2, x = S.length; E < x; E++) {
        const C = S[E] - S[E - 2];
        a = Math.min(a, C), o = Math.max(o, C);
      }
    }
    let h;
    a >= -128 && o <= 127 ? h = Int8Array : a >= -32768 && o <= 32767 ? h = Int16Array : h = Int32Array;
    const c = t.length, d = zf + ic * c, p = new Uint32Array(d);
    let m = 0;
    p[m++] = d * Uint32Array.BYTES_PER_ELEMENT + (l - 2 * c) * h.BYTES_PER_ELEMENT, p[m++] = 0, p[m++] = i, p[m++] = r, p[m++] = e ? 0 : 1, p[m++] = Math.max(0, Math.floor(s ?? 0)), p[m++] = c, p[m++] = h.BYTES_PER_ELEMENT;
    for (const S of t)
      p[m++] = S.length - 2, p[m++] = S[0], p[m++] = S[1];
    const y = new CompressionStream("deflate-raw"), A = y.writable.getWriter();
    await A.ready, A.write(p);
    const v = h.prototype.constructor;
    for (const S of t) {
      const E = new v(S.length - 2);
      for (let x = 2, C = S.length; x < C; x++)
        E[x - 2] = S[x] - S[x - 2];
      A.write(E);
    }
    return A.close(), (await new Response(y.readable).bytes()).toBase64();
  }
  static async decompressSignature(t) {
    try {
      const e = Uint8Array.fromBase64(t), {
        readable: s,
        writable: i
      } = new DecompressionStream("deflate-raw"), r = i.getWriter();
      await r.ready, r.write(e).then(async () => {
        await r.ready, await r.close();
      }).catch(() => {
      });
      let a = null, o = 0;
      for await (const E of s)
        a || (a = new Uint8Array(new Uint32Array(E.buffer, 0, 4)[0])), a.set(E, o), o += E.length;
      const l = new Uint32Array(a.buffer, 0, a.length >> 2), h = l[1];
      if (h !== 0)
        throw new Error(`Invalid version: ${h}`);
      const c = l[2], d = l[3], p = l[4] === 0, m = l[5], y = l[6], A = l[7], v = [], w = (zf + ic * y) * Uint32Array.BYTES_PER_ELEMENT;
      let S;
      switch (A) {
        case Int8Array.BYTES_PER_ELEMENT:
          S = new Int8Array(a.buffer, w);
          break;
        case Int16Array.BYTES_PER_ELEMENT:
          S = new Int16Array(a.buffer, w);
          break;
        case Int32Array.BYTES_PER_ELEMENT:
          S = new Int32Array(a.buffer, w);
          break;
      }
      o = 0;
      for (let E = 0; E < y; E++) {
        const x = l[ic * E + zf], C = new Float32Array(x + 2);
        v.push(C);
        for (let _ = 0; _ < ic - 1; _++)
          C[_] = l[ic * E + zf + _ + 1];
        for (let _ = 0; _ < x; _++)
          C[_ + 2] = C[_] + S[o++];
      }
      return {
        areContours: p,
        thickness: m,
        outlines: v,
        width: c,
        height: d
      };
    } catch (e) {
      return $(`decompressSignature: ${e}`), null;
    }
  }
}
Ao = new WeakMap(), gf = new WeakSet(), sA = function(t, e, s, i) {
  return s -= t, i -= e, s === 0 ? i > 0 ? 0 : 4 : s === 1 ? i + 6 : 2 - i;
}, Bs = new WeakMap(), Bm = new WeakSet(), Tv = function(t, e, s, i, r, a, o) {
  const l = b(this, gf, sA).call(this, s, i, r, a);
  for (let h = 0; h < 8; h++) {
    const c = (-h + l - o + 16) % 8, d = n(this, Bs)[2 * c], p = n(this, Bs)[2 * c + 1];
    if (t[(s + d) * e + (i + p)] !== 0)
      return c;
  }
  return -1;
}, Hm = new WeakSet(), kv = function(t, e, s, i, r, a, o) {
  const l = b(this, gf, sA).call(this, s, i, r, a);
  for (let h = 0; h < 8; h++) {
    const c = (h + l + o + 16) % 8, d = n(this, Bs)[2 * c], p = n(this, Bs)[2 * c + 1];
    if (t[(s + d) * e + (i + p)] !== 0)
      return c;
  }
  return -1;
}, mf = new WeakSet(), iA = function(t, e, s, i) {
  const r = t.length, a = new Int32Array(r);
  for (let c = 0; c < r; c++)
    a[c] = t[c] <= i ? 1 : 0;
  for (let c = 1; c < s - 1; c++)
    a[c * e] = a[c * e + e - 1] = 0;
  for (let c = 0; c < e; c++)
    a[c] = a[e * s - 1 - c] = 0;
  let o = 1, l;
  const h = [];
  for (let c = 1; c < s - 1; c++) {
    l = 1;
    for (let d = 1; d < e - 1; d++) {
      const p = c * e + d, m = a[p];
      if (m === 0)
        continue;
      let y = c, A = d;
      if (m === 1 && a[p - 1] === 0)
        o += 1, A -= 1;
      else if (m >= 1 && a[p + 1] === 0)
        o += 1, A += 1, m > 1 && (l = m);
      else {
        m !== 1 && (l = Math.abs(m));
        continue;
      }
      const v = [d, c], w = A === d + 1, S = {
        isHole: w,
        points: v,
        id: o,
        parent: 0
      };
      h.push(S);
      let E;
      for (const R of h)
        if (R.id === l) {
          E = R;
          break;
        }
      E ? E.isHole ? S.parent = w ? E.parent : l : S.parent = w ? l : E.parent : S.parent = w ? l : 0;
      const x = b(this, Bm, Tv).call(this, a, e, c, d, y, A, 0);
      if (x === -1) {
        a[p] = -o, a[p] !== 1 && (l = Math.abs(a[p]));
        continue;
      }
      let C = n(this, Bs)[2 * x], _ = n(this, Bs)[2 * x + 1];
      const k = c + C, P = d + _;
      y = k, A = P;
      let M = c, I = d;
      for (; ; ) {
        const R = b(this, Hm, kv).call(this, a, e, M, I, y, A, 1);
        C = n(this, Bs)[2 * R], _ = n(this, Bs)[2 * R + 1];
        const X = M + C, V = I + _;
        v.push(V, X);
        const W = M * e + I;
        if (a[W + 1] === 0 ? a[W] = -o : a[W] === 1 && (a[W] = o), X === c && V === d && M === k && I === P) {
          a[p] !== 1 && (l = Math.abs(a[p]));
          break;
        } else
          y = M, A = I, M = X, I = V;
      }
    }
  }
  return h;
}, Nh = new WeakSet(), _p = function(t, e, s, i) {
  if (s - e <= 4) {
    for (let k = e; k < s - 2; k += 2)
      i.push(t[k], t[k + 1]);
    return;
  }
  const r = t[e], a = t[e + 1], o = t[s - 4] - r, l = t[s - 3] - a, h = Math.hypot(o, l), c = o / h, d = l / h, p = c * a - d * r, m = l / o, y = 1 / h, A = Math.atan(m), v = Math.cos(A), w = Math.sin(A), S = y * (Math.abs(v) + Math.abs(w)), E = y * (1 - S + S ** 2), x = Math.max(Math.atan(Math.abs(w + v) * E), Math.atan(Math.abs(w - v) * E));
  let C = 0, _ = e;
  for (let k = e + 2; k < s - 2; k += 2) {
    const P = Math.abs(p - c * t[k + 1] + d * t[k]);
    P > C && (_ = k, C = P);
  }
  C > (h * x) ** 2 ? (b(this, Nh, _p).call(this, t, e, _ + 2, i), b(this, Nh, _p).call(this, t, _, s, i)) : i.push(r, a);
}, Um = new WeakSet(), Pv = function(t) {
  const e = [], s = t.length;
  return b(this, Nh, _p).call(this, t, 0, s, e), e.push(t[s - 2], t[s - 1]), e.length <= 4 ? null : e;
}, Gm = new WeakSet(), Mv = function(t, e, s, i, r, a) {
  const o = new Float32Array(a ** 2), l = -2 * i ** 2, h = a >> 1;
  for (let A = 0; A < a; A++) {
    const v = (A - h) ** 2;
    for (let w = 0; w < a; w++)
      o[A * a + w] = Math.exp((v + (w - h) ** 2) / l);
  }
  const c = new Float32Array(256), d = -2 * r ** 2;
  for (let A = 0; A < 256; A++)
    c[A] = Math.exp(A ** 2 / d);
  const p = t.length, m = new Uint8Array(p), y = new Uint32Array(256);
  for (let A = 0; A < s; A++)
    for (let v = 0; v < e; v++) {
      const w = A * e + v, S = t[w];
      let E = 0, x = 0;
      for (let _ = 0; _ < a; _++) {
        const k = A + _ - h;
        if (!(k < 0 || k >= s))
          for (let P = 0; P < a; P++) {
            const M = v + P - h;
            if (M < 0 || M >= e)
              continue;
            const I = t[k * e + M], R = o[_ * a + P] * c[Math.abs(I - S)];
            E += I * R, x += R;
          }
      }
      const C = m[w] = Math.round(E / x);
      y[C]++;
    }
  return [m, y];
}, $m = new WeakSet(), Dv = function(t) {
  const e = new Uint32Array(256);
  for (const s of t)
    e[s]++;
  return e;
}, bf = new WeakSet(), nA = function(t) {
  const e = t.length, s = new Uint8ClampedArray(e >> 2);
  let i = -1 / 0, r = 1 / 0;
  for (let o = 0, l = s.length; o < l; o++) {
    const h = s[o] = t[o << 2];
    i = Math.max(i, h), r = Math.min(r, h);
  }
  const a = 255 / (i - r);
  for (let o = 0, l = s.length; o < l; o++)
    s[o] = (s[o] - r) * a;
  return s;
}, yf = new WeakSet(), rA = function(t) {
  let e, s = -1 / 0, i = -1 / 0;
  const r = t.findIndex((l) => l !== 0);
  let a = r, o = r;
  for (e = r; e < 256; e++) {
    const l = t[e];
    l > s && (e - a > i && (i = e - a, o = e - 1), s = l, a = e);
  }
  for (e = o - 1; e >= 0 && !(t[e] > t[e + 1]); e--)
    ;
  return e;
}, zm = new WeakSet(), Iv = function(t) {
  const e = t, {
    width: s,
    height: i
  } = t, {
    maxDim: r
  } = n(this, Ao);
  let a = s, o = i;
  if (s > r || i > r) {
    let p = s, m = i, y = Math.log2(Math.max(s, i) / r);
    const A = Math.floor(y);
    y = y === A ? A - 1 : A;
    for (let w = 0; w < y; w++) {
      a = Math.ceil(p / 2), o = Math.ceil(m / 2);
      const S = new OffscreenCanvas(a, o);
      S.getContext("2d").drawImage(t, 0, 0, p, m, 0, 0, a, o), p = a, m = o, t !== e && t.close(), t = S.transferToImageBitmap();
    }
    const v = Math.min(r / a, r / o);
    a = Math.round(a * v), o = Math.round(o * v);
  }
  const h = new OffscreenCanvas(a, o).getContext("2d", {
    willReadFrequently: !0
  });
  h.fillStyle = "white", h.fillRect(0, 0, a, o), h.filter = "grayscale(1)", h.drawImage(t, 0, 0, t.width, t.height, 0, 0, a, o);
  const c = h.getImageData(0, 0, a, o).data;
  return [b(this, bf, nA).call(this, c), a, o];
}, u(Vt, gf), u(Vt, Bm), u(Vt, Hm), u(Vt, mf), u(Vt, Nh), u(Vt, Um), u(Vt, Gm), u(Vt, $m), u(Vt, bf), u(Vt, yf), u(Vt, zm), u(Vt, Ao, {
  maxDim: 512,
  sigmaSFactor: 0.02,
  sigmaR: 25,
  kernelSize: 16
}), u(Vt, Bs, new Int32Array([0, 1, -1, 1, -1, 0, -1, -1, 0, -1, 1, -1, 1, 0, 1, 1]));
class DA extends kA {
  constructor() {
    super(), super.updateProperties({
      fill: at._defaultLineColor,
      "stroke-width": 0
    });
  }
  clone() {
    const t = new DA();
    return t.updateAll(this), t;
  }
}
class IA extends cb {
  constructor(t) {
    super(t), super.updateProperties({
      stroke: at._defaultLineColor,
      "stroke-width": 1
    });
  }
  clone() {
    const t = new IA(this._viewParameters);
    return t.updateAll(this), t;
  }
}
var cr, yi, dr, wo;
const Ne = class Ne extends Fc {
  constructor(e) {
    super({
      ...e,
      mustBeCommitted: !0,
      name: "signatureEditor"
    });
    u(this, cr, !1);
    u(this, yi, null);
    u(this, dr, null);
    u(this, wo, null);
    this._willKeepAspectRatio = !0, f(this, dr, e.signatureData || null), f(this, yi, null), this.defaultL10nId = "pdfjs-editor-signature-editor1";
  }
  static initialize(e, s) {
    at.initialize(e, s), this._defaultDrawingOptions = new DA(), this._defaultDrawnSignatureOptions = new IA(s.viewParameters);
  }
  static getDefaultDrawingOptions(e) {
    const s = this._defaultDrawingOptions.clone();
    return s.updateProperties(e), s;
  }
  static get supportMultipleDrawings() {
    return !1;
  }
  static get typesMap() {
    return H(this, "typesMap", /* @__PURE__ */ new Map());
  }
  static get isDrawer() {
    return !1;
  }
  get telemetryFinalData() {
    return {
      type: "signature",
      hasDescription: !!n(this, yi)
    };
  }
  static computeTelemetryFinalData(e) {
    const s = e.get("hasDescription");
    return {
      hasAltText: s.get(!0) ?? 0,
      hasNoAltText: s.get(!1) ?? 0
    };
  }
  get isResizable() {
    return !0;
  }
  onScaleChanging() {
    this._drawId !== null && super.onScaleChanging();
  }
  render() {
    if (this.div)
      return this.div;
    let e, s;
    const {
      _isCopy: i
    } = this;
    if (i && (this._isCopy = !1, e = this.x, s = this.y), super.render(), this._drawId === null)
      if (n(this, dr)) {
        const {
          lines: r,
          mustSmooth: a,
          areContours: o,
          description: l,
          uuid: h,
          heightInPage: c
        } = n(this, dr), {
          rawDims: {
            pageWidth: d,
            pageHeight: p
          },
          rotation: m
        } = this.parent.viewport, y = Vt.processDrawnLines({
          lines: r,
          pageWidth: d,
          pageHeight: p,
          rotation: m,
          innerMargin: Ne._INNER_MARGIN,
          mustSmooth: a,
          areContours: o
        });
        this.addSignature(y, c, l, h);
      } else
        this.div.setAttribute("data-l10n-args", JSON.stringify({
          description: ""
        })), this.div.hidden = !0, this._uiManager.getSignature(this);
    else
      this.div.setAttribute("data-l10n-args", JSON.stringify({
        description: n(this, yi) || ""
      }));
    return i && (this._isCopy = !0, this._moveAfterPaste(e, s)), this.div;
  }
  setUuid(e) {
    f(this, wo, e), this.addEditToolbar();
  }
  getUuid() {
    return n(this, wo);
  }
  get description() {
    return n(this, yi);
  }
  set description(e) {
    f(this, yi, e), this.div && (this.div.setAttribute("data-l10n-args", JSON.stringify({
      description: e
    })), super.addEditToolbar().then((s) => {
      s == null || s.updateEditSignatureButton(e);
    }));
  }
  getSignaturePreview() {
    const {
      newCurves: e,
      areContours: s,
      thickness: i,
      width: r,
      height: a
    } = n(this, dr), o = Math.max(r, a), l = Vt.processDrawnLines({
      lines: {
        curves: e.map((h) => ({
          points: h
        })),
        thickness: i,
        width: r,
        height: a
      },
      pageWidth: o,
      pageHeight: o,
      rotation: 0,
      innerMargin: 0,
      mustSmooth: !1,
      areContours: s
    });
    return {
      areContours: s,
      outline: l.outline
    };
  }
  get toolbarButtons() {
    return this._uiManager.signatureManager ? [["editSignature", this._uiManager.signatureManager]] : super.toolbarButtons;
  }
  addSignature(e, s, i, r) {
    const {
      x: a,
      y: o
    } = this, {
      outline: l
    } = f(this, dr, e);
    f(this, cr, l instanceof eA), this.description = i;
    let h;
    n(this, cr) ? h = Ne.getDefaultDrawingOptions() : (h = Ne._defaultDrawnSignatureOptions.clone(), h.updateProperties({
      "stroke-width": l.thickness
    })), this._addOutlines({
      drawOutlines: l,
      drawingOptions: h
    });
    const [, c] = this.pageDimensions;
    let d = s / c;
    d = d >= 1 ? 0.5 : d, this.width *= d / this.height, this.width >= 1 && (d *= 0.9 / this.width, this.width = 0.9), this.height = d, this.setDims(), this.x = a, this.y = o, this.center(), this._onResized(), this.onScaleChanging(), this.rotate(), this._uiManager.addToAnnotationStorage(this), this.setUuid(r), this._reportTelemetry({
      action: "pdfjs.signature.inserted",
      data: {
        hasBeenSaved: !!r,
        hasDescription: !!i
      }
    }), this.div.hidden = !1;
  }
  getFromImage(e) {
    const {
      rawDims: {
        pageWidth: s,
        pageHeight: i
      },
      rotation: r
    } = this.parent.viewport;
    return Vt.process(e, s, i, r, Ne._INNER_MARGIN);
  }
  getFromText(e, s) {
    const {
      rawDims: {
        pageWidth: i,
        pageHeight: r
      },
      rotation: a
    } = this.parent.viewport;
    return Vt.extractContoursFromText(e, s, i, r, a, Ne._INNER_MARGIN);
  }
  getDrawnSignature(e) {
    const {
      rawDims: {
        pageWidth: s,
        pageHeight: i
      },
      rotation: r
    } = this.parent.viewport;
    return Vt.processDrawnLines({
      lines: e,
      pageWidth: s,
      pageHeight: i,
      rotation: r,
      innerMargin: Ne._INNER_MARGIN,
      mustSmooth: !1,
      areContours: !1
    });
  }
  createDrawingOptions({
    areContours: e,
    thickness: s
  }) {
    e ? this._drawingOptions = Ne.getDefaultDrawingOptions() : (this._drawingOptions = Ne._defaultDrawnSignatureOptions.clone(), this._drawingOptions.updateProperties({
      "stroke-width": s
    }));
  }
  serialize(e = !1) {
    if (this.isEmpty())
      return null;
    const {
      lines: s,
      points: i
    } = this.serializeDraw(e), {
      _drawingOptions: {
        "stroke-width": r
      }
    } = this, a = Object.assign(super.serialize(e), {
      isSignature: !0,
      areContours: n(this, cr),
      color: [0, 0, 0],
      thickness: n(this, cr) ? 0 : r
    });
    return this.addComment(a), e ? (a.paths = {
      lines: s,
      points: i
    }, a.uuid = n(this, wo), a.isCopy = !0) : a.lines = s, n(this, yi) && (a.accessibilityData = {
      type: "Figure",
      alt: n(this, yi)
    }), a;
  }
  static deserializeDraw(e, s, i, r, a, o) {
    return o.areContours ? eA.deserialize(e, s, i, r, a, o) : Of.deserialize(e, s, i, r, a, o);
  }
  static async deserialize(e, s, i) {
    var a;
    const r = await super.deserialize(e, s, i);
    return f(r, cr, e.areContours), r.description = ((a = e.accessibilityData) == null ? void 0 : a.alt) || "", f(r, wo, e.uuid), r;
  }
};
cr = new WeakMap(), yi = new WeakMap(), dr = new WeakMap(), wo = new WeakMap(), T(Ne, "_type", "signature"), T(Ne, "_editorType", G.SIGNATURE), T(Ne, "_defaultDrawingOptions", null);
let aA = Ne;
var bt, Zt, ur, an, fr, Bh, on, vo, Ai, Ze, Hh, So, Ec, Eo, xc, Uh, Tp, Gh, kp, $h, Pp, Af, lA, zh, Mp, Vm, Lv;
class oA extends at {
  constructor(e) {
    super({
      ...e,
      name: "stampEditor"
    });
    u(this, So);
    u(this, Eo);
    u(this, Uh);
    u(this, Gh);
    u(this, $h);
    u(this, Af);
    u(this, zh);
    u(this, Vm);
    u(this, bt, null);
    u(this, Zt, null);
    u(this, ur, null);
    u(this, an, null);
    u(this, fr, null);
    u(this, Bh, "");
    u(this, on, null);
    u(this, vo, !1);
    u(this, Ai, null);
    u(this, Ze, !1);
    u(this, Hh, !1);
    f(this, an, e.bitmapUrl), f(this, fr, e.bitmapFile), this.defaultL10nId = "pdfjs-editor-stamp-editor";
  }
  static initialize(e, s) {
    at.initialize(e, s);
  }
  static isHandlingMimeForPasting(e) {
    return Pb.includes(e);
  }
  static paste(e, s) {
    s.pasteEditor({
      mode: G.STAMP
    }, {
      bitmapFile: e.getAsFile()
    });
  }
  altTextFinish() {
    this._uiManager.useNewAltTextFlow && (this.div.hidden = !1), super.altTextFinish();
  }
  get telemetryFinalData() {
    var e;
    return {
      type: "stamp",
      hasAltText: !!((e = this.altTextData) != null && e.altText)
    };
  }
  static computeTelemetryFinalData(e) {
    const s = e.get("hasAltText");
    return {
      hasAltText: s.get(!0) ?? 0,
      hasNoAltText: s.get(!1) ?? 0
    };
  }
  async mlGuessAltText(e = null, s = !0) {
    if (this.hasAltTextData())
      return null;
    const {
      mlManager: i
    } = this._uiManager;
    if (!i)
      throw new Error("No ML.");
    if (!await i.isEnabledFor("altText"))
      throw new Error("ML isn't enabled for alt text.");
    const {
      data: r,
      width: a,
      height: o
    } = e || this.copyCanvas(null, null, !0).imageData, l = await i.guess({
      name: "altText",
      request: {
        data: r,
        width: a,
        height: o,
        channels: r.length / (a * o)
      }
    });
    if (!l)
      throw new Error("No response from the AI service.");
    if (l.error)
      throw new Error("Error from the AI service.");
    if (l.cancel)
      return null;
    if (!l.output)
      throw new Error("No valid response from the AI service.");
    const h = l.output;
    return await this.setGuessedAltText(h), s && !this.hasAltTextData() && (this.altTextData = {
      alt: h,
      decorative: !1
    }), h;
  }
  remove() {
    var e;
    n(this, Zt) && (f(this, bt, null), this._uiManager.imageManager.deleteId(n(this, Zt)), (e = n(this, on)) == null || e.remove(), f(this, on, null), n(this, Ai) && (clearTimeout(n(this, Ai)), f(this, Ai, null))), super.remove();
  }
  rebuild() {
    if (!this.parent) {
      n(this, Zt) && b(this, Uh, Tp).call(this);
      return;
    }
    super.rebuild(), this.div !== null && (n(this, Zt) && n(this, on) === null && b(this, Uh, Tp).call(this), this.isAttachedToDOM || this.parent.add(this));
  }
  onceAdded(e) {
    this._isDraggable = !0, e && this.div.focus();
  }
  isEmpty() {
    return !(n(this, ur) || n(this, bt) || n(this, an) || n(this, fr) || n(this, Zt) || n(this, vo));
  }
  get toolbarButtons() {
    return [["altText", this.createAltText()]];
  }
  get isResizable() {
    return !0;
  }
  render() {
    if (this.div)
      return this.div;
    let e, s;
    return this._isCopy && (e = this.x, s = this.y), super.render(), this.div.hidden = !0, this.createAltText(), n(this, vo) || (n(this, bt) ? b(this, Gh, kp).call(this) : b(this, Uh, Tp).call(this)), this._isCopy && this._moveAfterPaste(e, s), this._uiManager.addShouldRescale(this), this.div;
  }
  setCanvas(e, s) {
    const {
      id: i,
      bitmap: r
    } = this._uiManager.imageManager.getFromCanvas(e, s);
    s.remove(), i && this._uiManager.imageManager.isValidId(i) && (f(this, Zt, i), r && f(this, bt, r), f(this, vo, !1), b(this, Gh, kp).call(this));
  }
  _onResized() {
    this.onScaleChanging();
  }
  onScaleChanging() {
    if (!this.parent)
      return;
    n(this, Ai) !== null && clearTimeout(n(this, Ai)), f(this, Ai, setTimeout(() => {
      f(this, Ai, null), b(this, Af, lA).call(this);
    }, 200));
  }
  copyCanvas(e, s, i = !1) {
    e || (e = 224);
    const {
      width: r,
      height: a
    } = n(this, bt), o = new Gs();
    let l = n(this, bt), h = r, c = a, d = null;
    if (s) {
      if (r > s || a > s) {
        const k = Math.min(s / r, s / a);
        h = Math.floor(r * k), c = Math.floor(a * k);
      }
      d = document.createElement("canvas");
      const m = d.width = Math.ceil(h * o.sx), y = d.height = Math.ceil(c * o.sy);
      n(this, Ze) || (l = b(this, $h, Pp).call(this, m, y));
      const A = d.getContext("2d");
      A.filter = this._uiManager.hcmFilter;
      let v = "white", w = "#cfcfd8";
      this._uiManager.hcmFilter !== "none" ? w = "black" : aS.isDarkMode && (v = "#8f8f9d", w = "#42414d");
      const S = 15, E = S * o.sx, x = S * o.sy, C = new OffscreenCanvas(E * 2, x * 2), _ = C.getContext("2d");
      _.fillStyle = v, _.fillRect(0, 0, E * 2, x * 2), _.fillStyle = w, _.fillRect(0, 0, E, x), _.fillRect(E, x, E, x), A.fillStyle = A.createPattern(C, "repeat"), A.fillRect(0, 0, m, y), A.drawImage(l, 0, 0, l.width, l.height, 0, 0, m, y);
    }
    let p = null;
    if (i) {
      let m, y;
      if (o.symmetric && l.width < e && l.height < e)
        m = l.width, y = l.height;
      else if (l = n(this, bt), r > e || a > e) {
        const w = Math.min(e / r, e / a);
        m = Math.floor(r * w), y = Math.floor(a * w), n(this, Ze) || (l = b(this, $h, Pp).call(this, m, y));
      }
      const v = new OffscreenCanvas(m, y).getContext("2d", {
        willReadFrequently: !0
      });
      v.drawImage(l, 0, 0, l.width, l.height, 0, 0, m, y), p = {
        width: m,
        height: y,
        data: v.getImageData(0, 0, m, y).data
      };
    }
    return {
      canvas: d,
      width: h,
      height: c,
      imageData: p
    };
  }
  static async deserialize(e, s, i) {
    var v;
    let r = null, a = !1;
    if (e instanceof Zw) {
      const {
        data: {
          rect: w,
          rotation: S,
          id: E,
          structParent: x,
          popupRef: C,
          richText: _,
          contentsObj: k,
          creationDate: P,
          modificationDate: M
        },
        container: I,
        parent: {
          page: {
            pageNumber: R
          }
        },
        canvas: X
      } = e;
      let V, W;
      X ? (delete e.canvas, {
        id: V,
        bitmap: W
      } = i.imageManager.getFromCanvas(I.id, X), X.remove()) : (a = !0, e._hasNoCanvas = !0);
      const Mt = ((v = await s._structTree.getAriaAttributes(`${Ho}${E}`)) == null ? void 0 : v.get("aria-label")) || "";
      r = e = {
        annotationType: G.STAMP,
        bitmapId: V,
        bitmap: W,
        pageIndex: R - 1,
        rect: w.slice(0),
        rotation: S,
        annotationElementId: E,
        id: E,
        deleted: !1,
        accessibilityData: {
          decorative: !1,
          altText: Mt
        },
        isSvg: !1,
        structParent: x,
        popupRef: C,
        richText: _,
        comment: (k == null ? void 0 : k.str) || null,
        creationDate: P,
        modificationDate: M
      };
    }
    const o = await super.deserialize(e, s, i), {
      rect: l,
      bitmap: h,
      bitmapUrl: c,
      bitmapId: d,
      isSvg: p,
      accessibilityData: m
    } = e;
    a ? (i.addMissingCanvas(e.id, o), f(o, vo, !0)) : d && i.imageManager.isValidId(d) ? (f(o, Zt, d), h && f(o, bt, h)) : f(o, an, c), f(o, Ze, p);
    const [y, A] = o.pageDimensions;
    return o.width = (l[2] - l[0]) / y, o.height = (l[3] - l[1]) / A, m && (o.altTextData = m), o._initialData = r, e.comment && o.setCommentData(e), f(o, Hh, !!r), o;
  }
  serialize(e = !1, s = null) {
    if (this.isEmpty())
      return null;
    if (this.deleted)
      return this.serializeDeleted();
    const i = Object.assign(super.serialize(e), {
      bitmapId: n(this, Zt),
      isSvg: n(this, Ze)
    });
    if (this.addComment(i), e)
      return i.bitmapUrl = b(this, zh, Mp).call(this, !0), i.accessibilityData = this.serializeAltText(!0), i.isCopy = !0, i;
    const {
      decorative: r,
      altText: a
    } = this.serializeAltText(!1);
    if (!r && a && (i.accessibilityData = {
      type: "Figure",
      alt: a
    }), this.annotationElementId) {
      const l = b(this, Vm, Lv).call(this, i);
      return l.isSame ? null : (l.isSameAltText ? delete i.accessibilityData : i.accessibilityData.structParent = this._initialData.structParent ?? -1, i.id = this.annotationElementId, delete i.bitmapId, i);
    }
    if (s === null)
      return i;
    s.stamps || (s.stamps = /* @__PURE__ */ new Map());
    const o = n(this, Ze) ? (i.rect[2] - i.rect[0]) * (i.rect[3] - i.rect[1]) : null;
    if (!s.stamps.has(n(this, Zt)))
      s.stamps.set(n(this, Zt), {
        area: o,
        serialized: i
      }), i.bitmap = b(this, zh, Mp).call(this, !1);
    else if (n(this, Ze)) {
      const l = s.stamps.get(n(this, Zt));
      o > l.area && (l.area = o, l.serialized.bitmap.close(), l.serialized.bitmap = b(this, zh, Mp).call(this, !1));
    }
    return i;
  }
  renderAnnotationElement(e) {
    return this.deleted ? (e.hide(), null) : (e.updateEdited({
      rect: this.getPDFRect(),
      popup: this.comment
    }), null);
  }
}
bt = new WeakMap(), Zt = new WeakMap(), ur = new WeakMap(), an = new WeakMap(), fr = new WeakMap(), Bh = new WeakMap(), on = new WeakMap(), vo = new WeakMap(), Ai = new WeakMap(), Ze = new WeakMap(), Hh = new WeakMap(), So = new WeakSet(), Ec = function(e, s = !1) {
  if (!e) {
    this.remove();
    return;
  }
  f(this, bt, e.bitmap), s || (f(this, Zt, e.id), f(this, Ze, e.isSvg)), e.file && f(this, Bh, e.file.name), b(this, Gh, kp).call(this);
}, Eo = new WeakSet(), xc = function() {
  if (f(this, ur, null), this._uiManager.enableWaiting(!1), !!n(this, on)) {
    if (this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && n(this, bt)) {
      this.addEditToolbar().then(() => {
        this._editToolbar.hide(), this._uiManager.editAltText(this, !0);
      });
      return;
    }
    if (!this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && n(this, bt)) {
      this._reportTelemetry({
        action: "pdfjs.image.image_added",
        data: {
          alt_text_modal: !1,
          alt_text_type: "empty"
        }
      });
      try {
        this.mlGuessAltText();
      } catch {
      }
    }
    this.div.focus();
  }
}, Uh = new WeakSet(), Tp = function() {
  if (n(this, Zt)) {
    this._uiManager.enableWaiting(!0), this._uiManager.imageManager.getFromId(n(this, Zt)).then((i) => b(this, So, Ec).call(this, i, !0)).finally(() => b(this, Eo, xc).call(this));
    return;
  }
  if (n(this, an)) {
    const i = n(this, an);
    f(this, an, null), this._uiManager.enableWaiting(!0), f(this, ur, this._uiManager.imageManager.getFromUrl(i).then((r) => b(this, So, Ec).call(this, r)).finally(() => b(this, Eo, xc).call(this)));
    return;
  }
  if (n(this, fr)) {
    const i = n(this, fr);
    f(this, fr, null), this._uiManager.enableWaiting(!0), f(this, ur, this._uiManager.imageManager.getFromFile(i).then((r) => b(this, So, Ec).call(this, r)).finally(() => b(this, Eo, xc).call(this)));
    return;
  }
  const e = document.createElement("input");
  e.type = "file", e.accept = Pb.join(",");
  const s = this._uiManager._signal;
  f(this, ur, new Promise((i) => {
    e.addEventListener("change", async () => {
      if (!e.files || e.files.length === 0)
        this.remove();
      else {
        this._uiManager.enableWaiting(!0);
        const r = await this._uiManager.imageManager.getFromFile(e.files[0]);
        this._reportTelemetry({
          action: "pdfjs.image.image_selected",
          data: {
            alt_text_modal: this._uiManager.useNewAltTextFlow
          }
        }), b(this, So, Ec).call(this, r);
      }
      i();
    }, {
      signal: s
    }), e.addEventListener("cancel", () => {
      this.remove(), i();
    }, {
      signal: s
    });
  }).finally(() => b(this, Eo, xc).call(this))), e.click();
}, Gh = new WeakSet(), kp = function() {
  var h;
  const {
    div: e
  } = this;
  let {
    width: s,
    height: i
  } = n(this, bt);
  const [r, a] = this.pageDimensions, o = 0.75;
  if (this.width)
    s = this.width * r, i = this.height * a;
  else if (s > o * r || i > o * a) {
    const c = Math.min(o * r / s, o * a / i);
    s *= c, i *= c;
  }
  this._uiManager.enableWaiting(!1);
  const l = f(this, on, document.createElement("canvas"));
  l.setAttribute("role", "img"), this.addContainer(l), this.width = s / r, this.height = i / a, this.setDims(), (h = this._initialOptions) != null && h.isCentered ? this.center() : this.fixAndSetPosition(), this._initialOptions = null, (!this._uiManager.useNewAltTextWhenAddingImage || !this._uiManager.useNewAltTextFlow || this.annotationElementId) && (e.hidden = !1), b(this, Af, lA).call(this), n(this, Hh) || (this.parent.addUndoableEditor(this), f(this, Hh, !0)), this._reportTelemetry({
    action: "inserted_image"
  }), n(this, Bh) && this.div.setAttribute("aria-description", n(this, Bh)), this.annotationElementId || this._uiManager.a11yAlert(at._l10nAlert.stamp);
}, $h = new WeakSet(), Pp = function(e, s) {
  const {
    width: i,
    height: r
  } = n(this, bt);
  let a = i, o = r, l = n(this, bt);
  for (; a > 2 * e || o > 2 * s; ) {
    const h = a, c = o;
    a > 2 * e && (a = Math.ceil(a / 2)), o > 2 * s && (o = Math.ceil(o / 2));
    const d = new OffscreenCanvas(a, o);
    d.getContext("2d").drawImage(l, 0, 0, h, c, 0, 0, a, o), l = d.transferToImageBitmap();
  }
  return l;
}, Af = new WeakSet(), lA = function() {
  const [e, s] = this.parentDimensions, {
    width: i,
    height: r
  } = this, a = new Gs(), o = Math.ceil(i * e * a.sx), l = Math.ceil(r * s * a.sy), h = n(this, on);
  if (!h || h.width === o && h.height === l)
    return;
  h.width = o, h.height = l;
  const c = n(this, Ze) ? n(this, bt) : b(this, $h, Pp).call(this, o, l), d = h.getContext("2d");
  d.filter = this._uiManager.hcmFilter, d.drawImage(c, 0, 0, c.width, c.height, 0, 0, o, l);
}, zh = new WeakSet(), Mp = function(e) {
  if (e) {
    if (n(this, Ze)) {
      const r = this._uiManager.imageManager.getSvgUrl(n(this, Zt));
      if (r)
        return r;
    }
    const s = document.createElement("canvas");
    return {
      width: s.width,
      height: s.height
    } = n(this, bt), s.getContext("2d").drawImage(n(this, bt), 0, 0), s.toDataURL();
  }
  if (n(this, Ze)) {
    const [s, i] = this.pageDimensions, r = Math.round(this.width * s * xr.PDF_TO_CSS_UNITS), a = Math.round(this.height * i * xr.PDF_TO_CSS_UNITS), o = new OffscreenCanvas(r, a);
    return o.getContext("2d").drawImage(n(this, bt), 0, 0, n(this, bt).width, n(this, bt).height, 0, 0, r, a), o.transferToImageBitmap();
  }
  return structuredClone(n(this, bt));
}, Vm = new WeakSet(), Lv = function(e) {
  var o;
  const {
    pageIndex: s,
    accessibilityData: {
      altText: i
    }
  } = this._initialData, r = e.pageIndex === s, a = (((o = e.accessibilityData) == null ? void 0 : o.alt) || "") === i;
  return {
    isSame: !this.hasEditedComment && !this._hasBeenMoved && !this._hasBeenResized && r && a,
    isSameAltText: a
  };
}, T(oA, "_type", "stamp"), T(oA, "_editorType", G.STAMP);
var xo, Vh, pr, gr, ln, Le, mr, jh, Wh, Hs, hn, Fe, cn, br, Xh, O, yr, wf, cA, jm, Fv, ws, Ws, vf, dA, Sf, uA, Yh, Dp;
const Es = class Es {
  constructor({
    uiManager: t,
    pageIndex: e,
    div: s,
    structTreeLayer: i,
    accessibilityManager: r,
    annotationLayer: a,
    drawLayer: o,
    textLayer: l,
    viewport: h,
    l10n: c
  }) {
    u(this, wf);
    u(this, jm);
    u(this, ws);
    u(this, vf);
    u(this, Sf);
    u(this, Yh);
    u(this, xo, void 0);
    u(this, Vh, !1);
    u(this, pr, null);
    u(this, gr, null);
    u(this, ln, null);
    u(this, Le, /* @__PURE__ */ new Map());
    u(this, mr, !1);
    u(this, jh, !1);
    u(this, Wh, !1);
    u(this, Hs, null);
    u(this, hn, null);
    u(this, Fe, null);
    u(this, cn, null);
    u(this, br, null);
    u(this, Xh, -1);
    u(this, O, void 0);
    const d = [...n(Es, yr).values()];
    if (!Es._initialized) {
      Es._initialized = !0;
      for (const p of d)
        p.initialize(c, t);
    }
    t.registerEditorTypes(d), f(this, O, t), this.pageIndex = e, this.div = s, f(this, xo, r), f(this, pr, a), this.viewport = h, f(this, Fe, l), this.drawLayer = o, this._structTree = i, n(this, O).addLayer(this);
  }
  get isEmpty() {
    return n(this, Le).size === 0;
  }
  get isInvisible() {
    return this.isEmpty && n(this, O).getMode() === G.NONE;
  }
  updateToolbar(t) {
    n(this, O).updateToolbar(t);
  }
  updateMode(t = n(this, O).getMode()) {
    switch (b(this, Yh, Dp).call(this), t) {
      case G.NONE:
        this.div.classList.toggle("nonEditing", !0), this.disableTextSelection(), this.togglePointerEvents(!1), this.toggleAnnotationLayerPointerEvents(!0), this.disableClick();
        return;
      case G.INK:
        this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick();
        break;
      case G.HIGHLIGHT:
        this.enableTextSelection(), this.togglePointerEvents(!1), this.disableClick();
        break;
      default:
        this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick();
    }
    this.toggleAnnotationLayerPointerEvents(!1);
    const {
      classList: e
    } = this.div;
    if (e.toggle("nonEditing", !1), t === G.POPUP)
      e.toggle("commentEditing", !0);
    else {
      e.toggle("commentEditing", !1);
      for (const s of n(Es, yr).values())
        e.toggle(`${s._type}Editing`, t === s._editorType);
    }
    this.div.hidden = !1;
  }
  hasTextLayer(t) {
    var e;
    return t === ((e = n(this, Fe)) == null ? void 0 : e.div);
  }
  setEditingState(t) {
    n(this, O).setEditingState(t);
  }
  addCommands(t) {
    n(this, O).addCommands(t);
  }
  cleanUndoStack(t) {
    n(this, O).cleanUndoStack(t);
  }
  toggleDrawing(t = !1) {
    this.div.classList.toggle("drawing", !t);
  }
  togglePointerEvents(t = !1) {
    this.div.classList.toggle("disabled", !t);
  }
  toggleAnnotationLayerPointerEvents(t = !1) {
    var e;
    (e = n(this, pr)) == null || e.togglePointerEvents(t);
  }
  async enable() {
    var s;
    f(this, Wh, !0), this.div.tabIndex = 0, this.togglePointerEvents(!0), this.div.classList.toggle("nonEditing", !1), (s = n(this, br)) == null || s.abort(), f(this, br, null);
    const t = /* @__PURE__ */ new Set();
    for (const i of n(this, wf, cA))
      i.enableEditing(), i.show(!0), i.annotationElementId && (n(this, O).removeChangedExistingAnnotation(i), t.add(i.annotationElementId));
    const e = n(this, pr);
    if (e)
      for (const i of e.getEditableAnnotations()) {
        if (i.hide(), n(this, O).isDeletedAnnotationElement(i.data.id) || t.has(i.data.id))
          continue;
        const r = await this.deserialize(i);
        r && (this.addOrRebuild(r), r.enableEditing());
      }
    f(this, Wh, !1), n(this, O)._eventBus.dispatch("editorsrendered", {
      source: this,
      pageNumber: this.pageIndex + 1
    });
  }
  disable() {
    var i;
    if (f(this, jh, !0), this.div.tabIndex = -1, this.togglePointerEvents(!1), this.div.classList.toggle("nonEditing", !0), n(this, Fe) && !n(this, br)) {
      f(this, br, new AbortController());
      const r = n(this, O).combinedSignal(n(this, br));
      n(this, Fe).div.addEventListener("pointerdown", (a) => {
        const {
          clientX: l,
          clientY: h,
          timeStamp: c
        } = a, d = n(this, Xh);
        if (c - d > 500) {
          f(this, Xh, c);
          return;
        }
        f(this, Xh, -1);
        const {
          classList: p
        } = this.div;
        p.toggle("getElements", !0);
        const m = document.elementsFromPoint(l, h);
        if (p.toggle("getElements", !1), !this.div.contains(m[0]))
          return;
        let y;
        const A = new RegExp(`^${Jh}[0-9]+$`);
        for (const w of m)
          if (A.test(w.id)) {
            y = w.id;
            break;
          }
        if (!y)
          return;
        const v = n(this, Le).get(y);
        (v == null ? void 0 : v.annotationElementId) === null && (jt(a), v.dblclick(a));
      }, {
        signal: r,
        capture: !0
      });
    }
    const t = n(this, pr), e = [];
    if (t) {
      const r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
      for (const o of n(this, wf, cA)) {
        if (o.disableEditing(), !o.annotationElementId) {
          e.push(o);
          continue;
        }
        if (o.serialize() !== null) {
          r.set(o.annotationElementId, o);
          continue;
        } else
          a.set(o.annotationElementId, o);
        (i = this.getEditableAnnotation(o.annotationElementId)) == null || i.show(), o.remove();
      }
      for (const o of t.getEditableAnnotations()) {
        const {
          id: l
        } = o.data;
        if (n(this, O).isDeletedAnnotationElement(l)) {
          o.updateEdited({
            deleted: !0
          });
          continue;
        }
        let h = a.get(l);
        if (h) {
          h.resetAnnotationElement(o), h.show(!1), o.show();
          continue;
        }
        h = r.get(l), h && (n(this, O).addChangedExistingAnnotation(h), h.renderAnnotationElement(o) && h.show(!1)), o.show();
      }
    }
    b(this, Yh, Dp).call(this), this.isEmpty && (this.div.hidden = !0);
    const {
      classList: s
    } = this.div;
    for (const r of n(Es, yr).values())
      s.remove(`${r._type}Editing`);
    this.disableTextSelection(), this.toggleAnnotationLayerPointerEvents(!0), t == null || t.updateFakeAnnotations(e), f(this, jh, !1);
  }
  getEditableAnnotation(t) {
    var e;
    return ((e = n(this, pr)) == null ? void 0 : e.getEditableAnnotation(t)) || null;
  }
  setActiveEditor(t) {
    n(this, O).getActive() !== t && n(this, O).setActiveEditor(t);
  }
  enableTextSelection() {
    var t;
    if (this.div.tabIndex = -1, (t = n(this, Fe)) != null && t.div && !n(this, cn)) {
      f(this, cn, new AbortController());
      const e = n(this, O).combinedSignal(n(this, cn));
      n(this, Fe).div.addEventListener("pointerdown", b(this, jm, Fv).bind(this), {
        signal: e
      }), n(this, Fe).div.classList.add("highlighting");
    }
  }
  disableTextSelection() {
    var t;
    this.div.tabIndex = 0, (t = n(this, Fe)) != null && t.div && n(this, cn) && (n(this, cn).abort(), f(this, cn, null), n(this, Fe).div.classList.remove("highlighting"));
  }
  enableClick() {
    if (n(this, gr))
      return;
    f(this, gr, new AbortController());
    const t = n(this, O).combinedSignal(n(this, gr));
    this.div.addEventListener("pointerdown", this.pointerdown.bind(this), {
      signal: t
    });
    const e = this.pointerup.bind(this);
    this.div.addEventListener("pointerup", e, {
      signal: t
    }), this.div.addEventListener("pointercancel", e, {
      signal: t
    });
  }
  disableClick() {
    var t;
    (t = n(this, gr)) == null || t.abort(), f(this, gr, null);
  }
  attach(t) {
    n(this, Le).set(t.id, t);
    const {
      annotationElementId: e
    } = t;
    e && n(this, O).isDeletedAnnotationElement(e) && n(this, O).removeDeletedAnnotationElement(t);
  }
  detach(t) {
    var e;
    n(this, Le).delete(t.id), (e = n(this, xo)) == null || e.removePointerInTextLayer(t.contentDiv), !n(this, jh) && t.annotationElementId && n(this, O).addDeletedAnnotationElement(t);
  }
  remove(t) {
    this.detach(t), n(this, O).removeEditor(t), t.div.remove(), t.isAttachedToDOM = !1;
  }
  changeParent(t) {
    var e;
    t.parent !== this && (t.parent && t.annotationElementId && (n(this, O).addDeletedAnnotationElement(t), at.deleteAnnotationElement(t), t.annotationElementId = null), this.attach(t), (e = t.parent) == null || e.detach(t), t.setParent(this), t.div && t.isAttachedToDOM && (t.div.remove(), this.div.append(t.div)));
  }
  add(t) {
    if (!(t.parent === this && t.isAttachedToDOM)) {
      if (this.changeParent(t), n(this, O).addEditor(t), this.attach(t), !t.isAttachedToDOM) {
        const e = t.render();
        this.div.append(e), t.isAttachedToDOM = !0;
      }
      t.fixAndSetPosition(), t.onceAdded(!n(this, Wh)), n(this, O).addToAnnotationStorage(t), t._reportTelemetry(t.telemetryInitialData);
    }
  }
  moveEditorInDOM(t) {
    var s;
    if (!t.isAttachedToDOM)
      return;
    const {
      activeElement: e
    } = document;
    t.div.contains(e) && !n(this, ln) && (t._focusEventsAllowed = !1, f(this, ln, setTimeout(() => {
      f(this, ln, null), t.div.contains(document.activeElement) ? t._focusEventsAllowed = !0 : (t.div.addEventListener("focusin", () => {
        t._focusEventsAllowed = !0;
      }, {
        once: !0,
        signal: n(this, O)._signal
      }), e.focus());
    }, 0))), t._structTreeParentId = (s = n(this, xo)) == null ? void 0 : s.moveElementInDOM(this.div, t.div, t.contentDiv, !0);
  }
  addOrRebuild(t) {
    t.needsToBeRebuilt() ? (t.parent || (t.parent = this), t.rebuild(), t.show()) : this.add(t);
  }
  addUndoableEditor(t) {
    const e = () => t._uiManager.rebuild(t), s = () => {
      t.remove();
    };
    this.addCommands({
      cmd: e,
      undo: s,
      mustExec: !1
    });
  }
  getEditorByUID(t) {
    for (const e of n(this, Le).values())
      if (e.uid === t)
        return e;
    return null;
  }
  combinedSignal(t) {
    return n(this, O).combinedSignal(t);
  }
  canCreateNewEmptyEditor() {
    var t;
    return (t = n(this, ws, Ws)) == null ? void 0 : t.canCreateNewEmptyEditor();
  }
  async pasteEditor(t, e) {
    this.updateToolbar(t), await n(this, O).updateMode(t.mode);
    const {
      offsetX: s,
      offsetY: i
    } = b(this, Sf, uA).call(this), r = n(this, O).getId(), a = b(this, vf, dA).call(this, {
      parent: this,
      id: r,
      x: s,
      y: i,
      uiManager: n(this, O),
      isCentered: !0,
      ...e
    });
    a && this.add(a);
  }
  async deserialize(t) {
    var e;
    return await ((e = n(Es, yr).get(t.annotationType ?? t.annotationEditorType)) == null ? void 0 : e.deserialize(t, this, n(this, O))) || null;
  }
  createAndAddNewEditor(t, e, s = {}) {
    const i = n(this, O).getId(), r = b(this, vf, dA).call(this, {
      parent: this,
      id: i,
      x: t.offsetX,
      y: t.offsetY,
      uiManager: n(this, O),
      isCentered: e,
      ...s
    });
    return r && this.add(r), r;
  }
  get boundingClientRect() {
    return this.div.getBoundingClientRect();
  }
  addNewEditor(t = {}) {
    this.createAndAddNewEditor(b(this, Sf, uA).call(this), !0, t);
  }
  setSelected(t) {
    n(this, O).setSelected(t);
  }
  toggleSelected(t) {
    n(this, O).toggleSelected(t);
  }
  unselect(t) {
    n(this, O).unselect(t);
  }
  pointerup(t) {
    var i;
    const {
      isMac: e
    } = rt.platform;
    if (t.button !== 0 || t.ctrlKey && e || t.target !== this.div || !n(this, mr) || (f(this, mr, !1), (i = n(this, ws, Ws)) != null && i.isDrawer && n(this, ws, Ws).supportMultipleDrawings))
      return;
    if (!n(this, Vh)) {
      f(this, Vh, !0);
      return;
    }
    const s = n(this, O).getMode();
    if (s === G.STAMP || s === G.POPUP || s === G.SIGNATURE) {
      n(this, O).unselectAll();
      return;
    }
    this.createAndAddNewEditor(t, !1);
  }
  pointerdown(t) {
    var i;
    if (n(this, O).getMode() === G.HIGHLIGHT && this.enableTextSelection(), n(this, mr)) {
      f(this, mr, !1);
      return;
    }
    const {
      isMac: e
    } = rt.platform;
    if (t.button !== 0 || t.ctrlKey && e || t.target !== this.div)
      return;
    if (f(this, mr, !0), (i = n(this, ws, Ws)) != null && i.isDrawer) {
      this.startDrawingSession(t);
      return;
    }
    const s = n(this, O).getActive();
    f(this, Vh, !s || s.isEmpty());
  }
  startDrawingSession(t) {
    if (this.div.focus({
      preventScroll: !0
    }), n(this, Hs)) {
      n(this, ws, Ws).startDrawing(this, n(this, O), !1, t);
      return;
    }
    n(this, O).setCurrentDrawingSession(this), f(this, Hs, new AbortController());
    const e = n(this, O).combinedSignal(n(this, Hs));
    this.div.addEventListener("blur", ({
      relatedTarget: s
    }) => {
      s && !this.div.contains(s) && (f(this, hn, null), this.commitOrRemove());
    }, {
      signal: e
    }), n(this, ws, Ws).startDrawing(this, n(this, O), !1, t);
  }
  pause(t) {
    if (t) {
      const {
        activeElement: e
      } = document;
      this.div.contains(e) && f(this, hn, e);
      return;
    }
    n(this, hn) && setTimeout(() => {
      var e;
      (e = n(this, hn)) == null || e.focus(), f(this, hn, null);
    }, 0);
  }
  endDrawingSession(t = !1) {
    return n(this, Hs) ? (n(this, O).setCurrentDrawingSession(null), n(this, Hs).abort(), f(this, Hs, null), f(this, hn, null), n(this, ws, Ws).endDrawing(t)) : null;
  }
  findNewParent(t, e, s) {
    const i = n(this, O).findParent(e, s);
    return i === null || i === this ? !1 : (i.changeParent(t), !0);
  }
  commitOrRemove() {
    return n(this, Hs) ? (this.endDrawingSession(), !0) : !1;
  }
  onScaleChanging() {
    n(this, Hs) && n(this, ws, Ws).onScaleChangingWhenDrawing(this);
  }
  destroy() {
    var t, e;
    this.commitOrRemove(), ((t = n(this, O).getActive()) == null ? void 0 : t.parent) === this && (n(this, O).commitOrRemove(), n(this, O).setActiveEditor(null)), n(this, ln) && (clearTimeout(n(this, ln)), f(this, ln, null));
    for (const s of n(this, Le).values())
      (e = n(this, xo)) == null || e.removePointerInTextLayer(s.contentDiv), s.setParent(null), s.isAttachedToDOM = !1, s.div.remove();
    this.div = null, n(this, Le).clear(), n(this, O).removeLayer(this);
  }
  async render({
    viewport: t
  }) {
    this.viewport = t, To(this.div, t);
    for (const e of n(this, O).getEditors(this.pageIndex))
      this.add(e), e.rebuild();
    await n(this, O).findClonesForPage(this), this.div.hidden = this.isEmpty, this.updateMode();
  }
  update({
    viewport: t
  }) {
    n(this, O).commitOrRemove(), b(this, Yh, Dp).call(this);
    const e = this.viewport.rotation, s = t.rotation;
    if (this.viewport = t, To(this.div, {
      rotation: s
    }), e !== s)
      for (const i of n(this, Le).values())
        i.rotate(s);
  }
  get pageDimensions() {
    const {
      pageWidth: t,
      pageHeight: e
    } = this.viewport.rawDims;
    return [t, e];
  }
  get scale() {
    return n(this, O).viewParameters.realScale;
  }
};
xo = new WeakMap(), Vh = new WeakMap(), pr = new WeakMap(), gr = new WeakMap(), ln = new WeakMap(), Le = new WeakMap(), mr = new WeakMap(), jh = new WeakMap(), Wh = new WeakMap(), Hs = new WeakMap(), hn = new WeakMap(), Fe = new WeakMap(), cn = new WeakMap(), br = new WeakMap(), Xh = new WeakMap(), O = new WeakMap(), yr = new WeakMap(), wf = new WeakSet(), cA = function() {
  return n(this, Le).size !== 0 ? n(this, Le).values() : n(this, O).getEditors(this.pageIndex);
}, jm = new WeakSet(), Fv = function(t) {
  n(this, O).unselectAll();
  const {
    target: e
  } = t;
  if (e === n(this, Fe).div || (e.getAttribute("role") === "img" || e.classList.contains("endOfContent") || e.classList.contains("textLayerImages") || e.classList.contains("textLayerImagePlaceholder")) && n(this, Fe).div.contains(e)) {
    const {
      isMac: s
    } = rt.platform;
    if (t.button !== 0 || t.ctrlKey && s)
      return;
    n(this, O).showAllEditors("highlight", !0, !0), Gp.startDrawing(this, n(this, O), n(this, O).direction === "ltr", t), t.preventDefault();
  }
}, ws = new WeakSet(), Ws = function() {
  return n(Es, yr).get(n(this, O).getMode());
}, vf = new WeakSet(), dA = function(t) {
  const e = n(this, ws, Ws);
  return e ? new e.prototype.constructor(t) : null;
}, Sf = new WeakSet(), uA = function() {
  const {
    x: t,
    y: e,
    width: s,
    height: i
  } = this.boundingClientRect, r = Math.max(0, t), a = Math.max(0, e), o = Math.min(window.innerWidth, t + s), l = Math.min(window.innerHeight, e + i), h = (r + o) / 2 - t, c = (a + l) / 2 - e, [d, p] = this.viewport.rotation % 180 === 0 ? [h, c] : [c, h];
  return {
    offsetX: d,
    offsetY: p
  };
}, Yh = new WeakSet(), Dp = function() {
  for (const t of n(this, Le).values())
    t.isEmpty() && t.remove();
}, T(Es, "_initialized", !1), u(Es, yr, new Map([Hy, tA, oA, Gp, aA].map((t) => [t._editorType, t])));
let hA = Es;
function JE(g, t) {
  return g === t ? 0 : g.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function Vf(g) {
  var t;
  return g ? g.nodeType === Node.ELEMENT_NODE ? g.closest(".textLayer") : ((t = g.parentElement) == null ? void 0 : t.closest(".textLayer")) || null : null;
}
function ZE(g, t, e, s) {
  if (g === e)
    return t <= s;
  const i = g.compareDocumentPosition(e);
  return i & Node.DOCUMENT_POSITION_FOLLOWING ? !0 : i & Node.DOCUMENT_POSITION_PRECEDING ? !1 : null;
}
function m0(g, t, e) {
  if (g.nodeType !== Node.ELEMENT_NODE || !g.classList.contains("textLayer") || t !== g.childNodes.length)
    return {
      container: g,
      offset: t
    };
  let s = g.lastChild;
  return (s == null ? void 0 : s.nodeType) === Node.ELEMENT_NODE && s.classList.contains("endOfContent") && (s = s.previousSibling), !s || !e.contains(s) ? null : s.nodeType === Node.TEXT_NODE ? {
    container: s,
    offset: s.textContent.length
  } : {
    container: s,
    offset: s.childNodes.length
  };
}
var Ee, xe, vs, Ef, xf, Co, _o, Cf, Wm, Ar, wr, vr, Sr, dn, _f, pA, Tf, gA, Xm, Rv, Kh, Ip, Ym, Ov, kf, mA, Km, Nv, Pf, bA;
const N = class N {
  constructor({
    filterFactory: t = null,
    pageColors: e = null,
    pageIndex: s,
    textLayer: i = null
  }) {
    u(this, kf);
    u(this, Km);
    u(this, Pf);
    u(this, Ee, null);
    u(this, xe, /* @__PURE__ */ new Map());
    u(this, vs, null);
    u(this, Ef, null);
    u(this, xf, null);
    u(this, Co, null);
    u(this, _o, /* @__PURE__ */ new Map());
    if (this.pageIndex = s, f(this, Ef, t), f(this, xf, e), i) {
      const r = n(N, dn).get(i);
      if (r != null && r.selectionDiv && (r.selectionDiv.remove(), n(N, wr).delete(r.selectionDiv)), n(N, dn).set(i, {
        drawLayer: this
      }), n(N, Sr).add(i), f(this, vs, i), f(this, Co, new MutationObserver((a) => {
        var o, l, h;
        if (!(!n(this, Ee) || !((o = n(this, vs)) != null && o.isConnected) || !b(l = N, Tf, gA).call(l))) {
          for (const {
            addedNodes: c
          } of a)
            for (const d of c)
              if (d.nodeType === Node.ELEMENT_NODE && d.classList.contains("endOfContent")) {
                b(h = N, Kh, Ip).call(h);
                return;
              }
        }
      })), n(this, Co).observe(i, {
        childList: !0
      }), n(N, Ar) === null) {
        f(N, Ar, new AbortController());
        const {
          signal: a
        } = n(N, Ar);
        document.addEventListener("selectionchange", b(N, Kh, Ip).bind(N), {
          signal: a
        }), document.addEventListener("pointerdown", () => {
          f(N, vr, !0);
        }, {
          signal: a
        }), document.addEventListener("pointerup", () => {
          f(N, vr, !1);
        }, {
          signal: a
        }), window.addEventListener("blur", () => {
          f(N, vr, !1);
        }, {
          signal: a
        });
      }
    }
  }
  setParent(t) {
    var e, s, i;
    if (!n(this, Ee)) {
      f(this, Ee, t), (e = n(this, vs)) != null && e.isConnected && b(s = N, Tf, gA).call(s) && b(i = N, Kh, Ip).call(i);
      return;
    }
    if (n(this, Ee) !== t) {
      if (n(this, xe).size > 0)
        for (const r of n(this, xe).values())
          r.remove(), t.append(r);
      f(this, Ee, t);
    }
  }
  static get _svgFactory() {
    return H(this, "_svgFactory", new Hp());
  }
  draw(t, e = !1, s = !1) {
    const i = At(N, Cf)._++, r = b(this, kf, mA).call(this), a = N._svgFactory.createElement("defs");
    r.append(a);
    const o = N._svgFactory.createElement("path");
    a.append(o);
    const l = `path_${i}`;
    o.setAttribute("id", l), o.setAttribute("vector-effect", "non-scaling-stroke"), e && n(this, _o).set(i, o);
    const h = s ? b(this, Km, Nv).call(this, a, l) : null, c = N._svgFactory.createElement("use");
    return r.append(c), c.setAttribute("href", `#${l}`), this.updateProperties(r, t), n(this, xe).set(i, r), {
      id: i,
      clipPathId: `url(#${h})`
    };
  }
  drawOutline(t, e) {
    const s = At(N, Cf)._++, i = b(this, kf, mA).call(this), r = N._svgFactory.createElement("defs");
    i.append(r);
    const a = N._svgFactory.createElement("path");
    r.append(a);
    const o = `path_${s}`;
    a.setAttribute("id", o), a.setAttribute("vector-effect", "non-scaling-stroke");
    let l;
    if (e) {
      const d = N._svgFactory.createElement("mask");
      r.append(d), l = `mask_${s}`, d.setAttribute("id", l), d.setAttribute("maskUnits", "objectBoundingBox");
      const p = N._svgFactory.createElement("rect");
      d.append(p), p.setAttribute("width", "1"), p.setAttribute("height", "1"), p.setAttribute("fill", "white");
      const m = N._svgFactory.createElement("use");
      d.append(m), m.setAttribute("href", `#${o}`), m.setAttribute("stroke", "none"), m.setAttribute("fill", "black"), m.setAttribute("fill-rule", "nonzero"), m.classList.add("mask");
    }
    const h = N._svgFactory.createElement("use");
    i.append(h), h.setAttribute("href", `#${o}`), l && h.setAttribute("mask", `url(#${l})`);
    const c = h.cloneNode();
    return i.append(c), h.classList.add("mainOutline"), c.classList.add("secondaryOutline"), this.updateProperties(i, t), n(this, xe).set(s, i), s;
  }
  finalizeDraw(t, e) {
    n(this, _o).delete(t), this.updateProperties(t, e);
  }
  updateProperties(t, e) {
    var l;
    if (!e)
      return;
    const {
      root: s,
      bbox: i,
      rootClass: r,
      path: a
    } = e, o = typeof t == "number" ? n(this, xe).get(t) : t;
    if (o) {
      if (s && b(this, Pf, bA).call(this, o, s), i && b(l = N, Ym, Ov).call(l, o, i), r) {
        const {
          classList: h
        } = o;
        for (const [c, d] of Object.entries(r))
          h.toggle(c, d);
      }
      if (a) {
        const c = o.firstElementChild.firstElementChild;
        b(this, Pf, bA).call(this, c, a);
      }
    }
  }
  updateParent(t, e) {
    if (e === this)
      return;
    const s = n(this, xe).get(t);
    s && (n(e, Ee).append(s), n(this, xe).delete(t), n(e, xe).set(t, s));
  }
  remove(t) {
    n(this, _o).delete(t), n(this, Ee) !== null && (n(this, xe).get(t).remove(), n(this, xe).delete(t));
  }
  destroy() {
    var t, e, s;
    f(this, Ee, null);
    for (const i of n(this, xe).values())
      i.remove();
    if (n(this, xe).clear(), n(this, _o).clear(), (t = n(this, Co)) == null || t.disconnect(), f(this, Co, null), n(this, vs)) {
      const i = n(N, dn).get(n(this, vs));
      (i == null ? void 0 : i.drawLayer) === this && (b(e = N, _f, pA).call(e, n(this, vs)), n(N, dn).delete(n(this, vs)), n(N, Sr).delete(n(this, vs)), n(N, Sr).size === 0 && ((s = n(N, Ar)) == null || s.abort(), f(N, Ar, null), f(N, vr, !1))), f(this, vs, null);
    }
  }
};
Ee = new WeakMap(), xe = new WeakMap(), vs = new WeakMap(), Ef = new WeakMap(), xf = new WeakMap(), Co = new WeakMap(), _o = new WeakMap(), Cf = new WeakMap(), Wm = new WeakMap(), Ar = new WeakMap(), wr = new WeakMap(), vr = new WeakMap(), Sr = new WeakMap(), dn = new WeakMap(), _f = new WeakSet(), pA = function(t) {
  const e = n(this, dn).get(t);
  e != null && e.selectionDiv && (e.selectionDiv.remove(), n(this, wr).delete(e.selectionDiv), e.selectionDiv = null, e.path = null);
}, Tf = new WeakSet(), gA = function() {
  const t = document.getSelection();
  return !!t && !t.isCollapsed;
}, Xm = new WeakSet(), Rv = function() {
  return n(this, Sr).keys().filter((t) => t.isConnected).toArray().sort(JE);
}, Kh = new WeakSet(), Ip = function() {
  var a;
  const t = document.getSelection();
  if (!t || t.isCollapsed) {
    for (const o of n(this, wr))
      o.remove();
    n(this, wr).clear();
    return;
  }
  const e = /* @__PURE__ */ new WeakMap(), s = b(this, Xm, Rv).call(this), i = [];
  for (let o = 0, l = t.rangeCount; o < l; o++) {
    const h = t.getRangeAt(o);
    if (h.collapsed)
      continue;
    let {
      startContainer: c,
      startOffset: d,
      endContainer: p,
      endOffset: m
    } = h, y = Vf(c), A = Vf(p);
    const v = y === null, w = A === null;
    if (n(this, vr) && v !== w)
      return;
    if (t.rangeCount === 1) {
      const {
        anchorNode: x,
        anchorOffset: C,
        focusNode: _,
        focusOffset: k
      } = t, P = Vf(x), M = Vf(_), I = ZE(x, C, _, k);
      P && M && I !== null && (I ? (c = x, d = C, y = P, p = _, m = k, A = M) : (c = _, d = k, y = M, p = x, m = C, A = P));
    }
    const S = s.filter((x) => h.intersectsNode(x));
    if (S.length === 0)
      continue;
    let E = !1;
    if (y || (y = S[0], c = y, d = 0, E = !0), A || (A = S.at(-1), p = A, m = A.childNodes.length, E = !0), p.nodeType === Node.ELEMENT_NODE) {
      if (p.classList.contains("endOfContent")) {
        const x = p.previousSibling;
        if (!x)
          continue;
        p = x, m = x.nodeType === Node.TEXT_NODE ? x.textContent.length : x.childNodes.length;
      } else if (p.classList.contains("textLayer") && p.childNodes.length === m) {
        const x = m0(p, m, A);
        if (!x)
          continue;
        p = x.container, m = x.offset;
      }
    }
    if (c.nodeType === Node.ELEMENT_NODE) {
      const x = m0(c, d, y);
      if (!x)
        continue;
      c = x.container, d = x.offset;
    }
    if (y === A && !E && S.includes(y)) {
      i.push([h, y]);
      continue;
    }
    for (const x of S) {
      const C = x.firstChild;
      if (!C)
        continue;
      const _ = document.createRange();
      if (x === y ? _.setStart(c, d) : _.setStartBefore(C), x === A)
        _.setEnd(p, m);
      else {
        const k = x.lastChild;
        if (!k)
          continue;
        if (k.nodeType === Node.ELEMENT_NODE && k.classList.contains("endOfContent")) {
          const P = k.previousSibling;
          if (!P)
            continue;
          _.setEndAfter(P);
        } else
          _.setEndAfter(k);
      }
      _.collapsed || i.push([_, x]);
    }
  }
  const r = new Set(i.map((o) => o[1]));
  for (const o of n(this, Sr))
    r.has(o) || b(this, _f, pA).call(this, o);
  for (const [o, l] of i) {
    const h = n(N, dn).get(l);
    if (!h)
      continue;
    let c = e.get(l);
    if (!c) {
      const A = l.getBoundingClientRect();
      c = (v, w, S, E) => ({
        x: (v - A.x) / A.width,
        y: (w - A.y) / A.height,
        width: S / A.width,
        height: E / A.height
      }), e.set(l, c);
    }
    const d = [];
    for (let {
      x: A,
      y: v,
      width: w,
      height: S
    } of o.getClientRects())
      w === 0 || S === 0 || ({
        x: A,
        y: v,
        width: w,
        height: S
      } = c(A, v, w, S), !(w === 1 && S === 1) && d.push(`M${A} ${v} h${w} v${S} h-${w} Z`));
    if (d.length === 0)
      continue;
    const p = h.drawLayer;
    let m = h.selectionDiv, y = h.path;
    if (!m) {
      const A = `clip_selection_${At(N, Wm)._++}`;
      m = document.createElement("div"), m.className = "selection", m.style.clipPath = `url(#${A})`;
      const v = (a = n(p, Ef)) == null ? void 0 : a.createSelectionStyle(n(p, xf));
      if (v)
        for (const [E, x] of Object.entries(v))
          m.style.setProperty(E, x);
      const w = N._svgFactory.create(1, 1, !0);
      w.setAttribute("aria-hidden", "true"), w.setAttribute("width", "100%"), w.setAttribute("height", "100%");
      const S = N._svgFactory.createElement("clipPath");
      S.setAttribute("id", A), S.setAttribute("clipPathUnits", "objectBoundingBox"), y = N._svgFactory.createElement("path"), S.append(y), w.append(S), m.append(w), h.path = y, h.selectionDiv = m;
    }
    n(p, Ee) && m.parentNode !== n(p, Ee) && (n(p, Ee).append(m), n(this, wr).add(m)), y.setAttribute("d", d.join(" "));
  }
}, Ym = new WeakSet(), Ov = function(t, [e, s, i, r]) {
  const {
    style: a
  } = t;
  a.top = `${100 * s}%`, a.left = `${100 * e}%`, a.width = `${100 * i}%`, a.height = `${100 * r}%`;
}, kf = new WeakSet(), mA = function() {
  const t = N._svgFactory.create(1, 1, !0);
  return n(this, Ee).append(t), t.setAttribute("aria-hidden", "true"), t;
}, Km = new WeakSet(), Nv = function(t, e) {
  const s = N._svgFactory.createElement("clipPath");
  t.append(s);
  const i = `clip_${e}`;
  s.setAttribute("id", i), s.setAttribute("clipPathUnits", "objectBoundingBox");
  const r = N._svgFactory.createElement("use");
  return s.append(r), r.setAttribute("href", `#${e}`), r.classList.add("clip"), i;
}, Pf = new WeakSet(), bA = function(t, e) {
  for (const [s, i] of Object.entries(e))
    i === null ? t.removeAttribute(s) : t.setAttribute(s, i);
}, u(N, _f), u(N, Tf), u(N, Xm), u(N, Kh), u(N, Ym), u(N, Cf, 0), u(N, Wm, 0), u(N, Ar, null), u(N, wr, /* @__PURE__ */ new Set()), u(N, vr, !1), u(N, Sr, /* @__PURE__ */ new Set()), u(N, dn, /* @__PURE__ */ new WeakMap());
let fA = N;
function jf(g) {
  return `${(g * 100).toFixed(2)}%`;
}
var qh, Mf, Df, Qh, wi, vi, If, qm, Bv;
const kc = class kc {
  constructor(t, e, s, i) {
    u(this, qm);
    u(this, qh, []);
    u(this, Mf, /* @__PURE__ */ new Map());
    u(this, Df, null);
    u(this, Qh, 0);
    u(this, wi, 0);
    u(this, vi, 0);
    f(this, Qh, t), f(this, qh, e), f(this, wi, s.rawDims.pageWidth), f(this, vi, s.rawDims.pageHeight), f(this, Df, i);
  }
  render() {
    const t = document.createElement("div");
    t.className = "textLayerImages";
    for (let e = 0; e < n(this, qh).length; e += 6) {
      const s = b(this, qm, Bv).call(this, n(this, qh).subarray(e, e + 6));
      s && t.append(s);
    }
    return t.addEventListener("contextmenu", (e) => {
      var w;
      if (!(e.target instanceof HTMLCanvasElement))
        return;
      const s = e.target, i = n(this, Mf).get(s);
      if (!i)
        return;
      const r = (w = n(kc, If)) == null ? void 0 : w.deref();
      if (r === s)
        return;
      r && (r.width = 0, r.height = 0), f(kc, If, new WeakRef(s));
      const {
        inverseTransform: a,
        x1: o,
        y1: l,
        width: h,
        height: c
      } = i, d = n(this, Df).call(this), p = Math.ceil(o * d.width), m = Math.ceil(l * d.height), y = Math.floor((o + h / n(this, wi)) * d.width), A = Math.floor((l + c / n(this, vi)) * d.height);
      s.width = y - p, s.height = A - m;
      const v = s.getContext("2d");
      v.setTransform(...a), v.translate(-p, -m), v.drawImage(d, 0, 0);
    }), t;
  }
};
qh = new WeakMap(), Mf = new WeakMap(), Df = new WeakMap(), Qh = new WeakMap(), wi = new WeakMap(), vi = new WeakMap(), If = new WeakMap(), qm = new WeakSet(), Bv = function([t, e, s, i, r, a]) {
  const o = Math.hypot((r - t) * n(this, wi), (a - e) * n(this, vi)), l = Math.hypot((s - t) * n(this, wi), (i - e) * n(this, vi));
  if (o < n(this, Qh) || l < n(this, Qh))
    return null;
  const h = [(r - t) * n(this, wi) / o, (a - e) * n(this, vi) / o, (s - t) * n(this, wi) / l, (i - e) * n(this, vi) / l, 0, 0], c = D.inverseTransform(h), d = document.createElement("canvas");
  return d.className = "textLayerImagePlaceholder", d.width = 0, d.height = 0, Object.assign(d.style, {
    opacity: 0,
    position: "absolute",
    left: jf(t),
    top: jf(e),
    width: jf(o / n(this, wi)),
    height: jf(l / n(this, vi)),
    transformOrigin: "0% 0%",
    transform: `matrix(${h.join(",")})`
  }), n(this, Mf).set(d, {
    inverseTransform: c,
    width: o,
    height: l,
    x1: t,
    y1: e
  }), d;
}, u(kc, If, null);
let yA = kc;
globalThis._pdfjsTestingUtils = {
  HighlightOutliner: Yy
};
globalThis.pdfjsLib = {
  AbortException: Er,
  AnnotationEditorLayer: hA,
  AnnotationEditorParamsType: Y,
  AnnotationEditorType: G,
  AnnotationEditorUIManager: Po,
  AnnotationLayer: By,
  AnnotationMode: gn,
  AnnotationType: wt,
  applyOpacity: lS,
  build: kE,
  ColorPicker: Np,
  createValidAbsoluteUrl: y0,
  CSSConstants: oS,
  DOMSVGFactory: Hp,
  DrawLayer: fA,
  FeatureTest: rt,
  fetchData: vA,
  findContrastColor: hS,
  getDocument: EE,
  getFilenameFromUrl: iS,
  getPdfFilenameFromUrl: nS,
  getRGB: Rf,
  getRGBA: Ff,
  getUuid: w0,
  GlobalWorkerOptions: un,
  ImageKind: Wf,
  InvalidPDFException: Cb,
  isDataScheme: eb,
  isPdfFile: EA,
  isValidExplicitDest: MS,
  makeArr: Zh,
  makeMap: AA,
  makeObj: Tb,
  makeSet: tS,
  MathClamp: ut,
  noContextMenu: Us,
  normalizeUnicode: Jv,
  OPS: Xs,
  OutputScale: Gs,
  PasswordException: xb,
  PasswordResponses: jv,
  PDFDataRangeTransport: Uw,
  PDFDateString: Fp,
  PDFWorker: Lc,
  PermissionFlag: Vv,
  PixelsPerInch: xr,
  RenderingCancelledException: SA,
  renderRichText: v0,
  ResponseException: Lp,
  setLayerDimensions: To,
  shadow: H,
  SignatureExtractor: Vt,
  stopEvent: jt,
  SupportedImageMimeTypes: Pb,
  TextLayer: Ic,
  TextLayerImages: yA,
  TouchManager: z0,
  updateUrlHash: A0,
  Util: D,
  VerbosityLevel: Qm,
  version: TE,
  XfaLayer: wA
};
export {
  Er as AbortException,
  hA as AnnotationEditorLayer,
  Y as AnnotationEditorParamsType,
  G as AnnotationEditorType,
  Po as AnnotationEditorUIManager,
  By as AnnotationLayer,
  gn as AnnotationMode,
  wt as AnnotationType,
  oS as CSSConstants,
  Np as ColorPicker,
  Hp as DOMSVGFactory,
  fA as DrawLayer,
  rt as FeatureTest,
  un as GlobalWorkerOptions,
  Wf as ImageKind,
  Cb as InvalidPDFException,
  ut as MathClamp,
  Xs as OPS,
  Gs as OutputScale,
  Uw as PDFDataRangeTransport,
  Fp as PDFDateString,
  Lc as PDFWorker,
  xb as PasswordException,
  jv as PasswordResponses,
  Vv as PermissionFlag,
  xr as PixelsPerInch,
  SA as RenderingCancelledException,
  Lp as ResponseException,
  Vt as SignatureExtractor,
  Pb as SupportedImageMimeTypes,
  Ic as TextLayer,
  yA as TextLayerImages,
  z0 as TouchManager,
  D as Util,
  Qm as VerbosityLevel,
  wA as XfaLayer,
  lS as applyOpacity,
  kE as build,
  y0 as createValidAbsoluteUrl,
  vA as fetchData,
  hS as findContrastColor,
  EE as getDocument,
  iS as getFilenameFromUrl,
  nS as getPdfFilenameFromUrl,
  Rf as getRGB,
  Ff as getRGBA,
  w0 as getUuid,
  eb as isDataScheme,
  EA as isPdfFile,
  MS as isValidExplicitDest,
  Zh as makeArr,
  AA as makeMap,
  Tb as makeObj,
  tS as makeSet,
  Us as noContextMenu,
  Jv as normalizeUnicode,
  v0 as renderRichText,
  To as setLayerDimensions,
  H as shadow,
  jt as stopEvent,
  A0 as updateUrlHash,
  TE as version
};
