var Yo = Object.defineProperty;
var Zo = (t, e, a) => e in t ? Yo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var vt = (t, e, a) => (Zo(t, typeof e != "symbol" ? e + "" : e, a), a);
import { B as ve } from "./index-12f4dad8.js";
function Ir(t, e) {
  if (!t || t === "0000-00-00 00:00:00")
    return null;
  const a = new Date(t);
  a.setMinutes(a.getMinutes() - a.getTimezoneOffset());
  const r = a.toISOString();
  return e ? r.substring(0, 10) + " " + r.substring(11, 19) : r.substring(0, 10);
}
function U9(t) {
  return t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/&/g, "&amp;");
}
function es(t) {
  return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}
function as(t) {
  return new Promise((e, a) => {
    const r = document.createElement("input");
    r.setAttribute("type", "file"), r.setAttribute("hidden", "true"), r.setAttribute("accept", "image/*"), t && r.setAttribute("multiple", "true"), r.onchange = () => {
      r.files ? e(t ? Array.from(r.files) : r.files[0]) : a();
    }, r.click();
  });
}
var ir = (t, e, a) => {
  if (!e.has(t))
    throw TypeError("Cannot " + a);
}, ue = (t, e, a) => (ir(t, e, "read from private field"), a ? a.call(t) : e.get(t)), _e = (t, e, a) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, a);
}, Rt = (t, e, a, r) => (ir(t, e, "write to private field"), r ? r.call(t, a) : e.set(t, a), a), ie = (t, e, a) => (ir(t, e, "access private method"), a);
const ts = "14.0";
function rs(t, e, a) {
  let r = `https://cdn.jsdelivr.net/npm/emojibase-data@${e}/${t}`;
  return typeof a == "function" ? r = a(t, e) : typeof a == "string" && (r = `${a}/${t}`), r;
}
async function nr(t, e = {}) {
  const {
    local: a = !1,
    version: r = "latest",
    cdnUrl: o,
    ...i
  } = e, l = rs(t, r, o), d = a ? localStorage : sessionStorage, n = `emojibase/${r}/${t}`, f = d.getItem(n);
  if (f)
    return Promise.resolve(JSON.parse(f));
  const h = await fetch(l, {
    credentials: "omit",
    mode: "cors",
    redirect: "error",
    ...i
  });
  if (!h.ok)
    throw new Error("Failed to load Emojibase dataset.");
  const p = await h.json();
  try {
    d.setItem(n, JSON.stringify(p));
  } catch {
  }
  return p;
}
const os = {
  discord: "joypixels",
  slack: "iamcal"
};
async function qr(t, e, a) {
  var r;
  return nr(`${t}/shortcodes/${(r = os[e]) !== null && r !== void 0 ? r : e}.json`, a);
}
function Ye(t, e) {
  if (e.length === 0)
    return t;
  const a = new Set(t.shortcodes);
  return e.forEach((r) => {
    const o = r[t.hexcode];
    Array.isArray(o) ? o.forEach((i) => a.add(i)) : o && a.add(o);
  }), t.shortcodes = [...a], t.skins && t.skins.forEach((r) => {
    Ye(r, e);
  }), t;
}
function ss(t, e = []) {
  const a = [];
  return t.forEach((r) => {
    if (r.skins) {
      const {
        skins: o,
        ...i
      } = r;
      a.push(Ye(i, e)), o.forEach((l) => {
        const d = {
          ...l
        };
        i.tags && (d.tags = [...i.tags]), a.push(Ye(d, e));
      });
    } else
      a.push(Ye(r, e));
  }), a;
}
function cs(t, e) {
  return e.length === 0 || t.forEach((a) => {
    Ye(a, e);
  }), t;
}
async function lo(t, e = {}) {
  const {
    compact: a = !1,
    flat: r = !1,
    shortcodes: o = [],
    ...i
  } = e, l = await nr(`${t}/${a ? "compact" : "data"}.json`, i);
  let d = [];
  return o.length > 0 && (d = await Promise.all(o.map((n) => {
    let f;
    if (n.includes("/")) {
      const [h, p] = n.split("/");
      f = qr(h, p, i);
    } else
      f = qr(t, n, i);
    return f.catch(() => ({}));
  }))), r ? ss(l, d) : cs(l, d);
}
async function po(t, e) {
  return nr(`${t}/messages.json`, e);
}
function zt(t, e) {
  const a = t.target.closest("[data-emoji]");
  if (a) {
    const r = e.find((o) => o.emoji === a.dataset.emoji);
    if (r)
      return r;
  }
  return null;
}
function fo(t) {
  var e;
  const a = (e = window.matchMedia) == null ? void 0 : e.call(window, "(prefers-reduced-motion: reduce)");
  return t.animate && !(a != null && a.matches);
}
function Or(t, e) {
  return t.toLowerCase().includes(e.toLowerCase());
}
function is(t, e) {
  let a = null;
  return () => {
    a || (a = window.setTimeout(() => {
      t(), a = null;
    }, e));
  };
}
function ns(t, e) {
  let a = null;
  return (...r) => {
    a && window.clearTimeout(a), a = window.setTimeout(() => {
      t(...r), a = null;
    }, e);
  };
}
function Ie(t, e, a, r) {
  if (fo(r) && t.animate)
    return t.animate(e, a).finished;
  const o = a.direction === "normal" ? 1 : 0, i = Object.entries(e).reduce((l, [d, n]) => ({
    ...l,
    [d]: n[o]
  }), {});
  return Object.assign(t.style, i), Promise.resolve();
}
function It(t) {
  var e;
  const a = document.createElement("template");
  return a.innerHTML = t, (e = a.content) == null ? void 0 : e.firstElementChild;
}
async function ls(t) {
  const e = new TextEncoder().encode(t), a = await crypto.subtle.digest("SHA-256", e);
  return Array.from(new Uint8Array(a)).map((r) => r.toString(16).padStart(2, "0")).join("");
}
function ee(...t) {
  return t.reduce((e, a) => ({
    ...e,
    [a]: lr(a)
  }), {});
}
function lr(t) {
  return `picmo__${t}`;
}
function ba(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
  return t;
}
function qe(t, ...e) {
  ba(t).append(...e);
}
function ho(t) {
  try {
    return window[t].length, !0;
  } catch {
    return !1;
  }
}
function ds() {
  return ho("sessionStorage");
}
function ps() {
  return ho("localStorage");
}
function ia(t) {
  var e;
  return {
    emoji: t.emoji,
    label: t.label,
    tags: t.tags,
    skins: (e = t.skins) == null ? void 0 : e.map((a) => ia(a)),
    order: t.order,
    custom: !1,
    hexcode: t.hexcode,
    version: t.version
  };
}
function Aa(t, e, a) {
  var r;
  return a && !a.some((o) => o.order === t.group) ? !1 : Or(t.label, e) || ((r = t.tags) == null ? void 0 : r.some((o) => Or(o, e)));
}
class yo {
  constructor(e = "en") {
    this.locale = e;
  }
}
const fs = [
  (t, e) => (t.hexcode === "1F91D" && e < 14 && (t.skins = []), t),
  (t, e) => (t.skins && (t.skins = t.skins.filter((a) => !a.version || a.version <= e)), t)
];
function hs(t, e) {
  return fs.some((a) => a(t, e) === null) ? null : t;
}
function La(t, e) {
  return t.filter((a) => hs(a, e) !== null);
}
const xt = {};
function go(t) {
  return xt[t] || (xt[t] = new ys(t)), xt[t];
}
go.deleteDatabase = (t) => {
};
class ys extends yo {
  open() {
    return Promise.resolve();
  }
  delete() {
    return Promise.resolve();
  }
  close() {
  }
  isPopulated() {
    return Promise.resolve(!1);
  }
  getEmojiCount() {
    return Promise.resolve(this.emojis.length);
  }
  getEtags() {
    return Promise.resolve({ foo: "bar" });
  }
  getHash() {
    return Promise.resolve("");
  }
  populate(e) {
    return this.categories = e.groups, this.emojis = e.emojis, Promise.resolve();
  }
  getCategories(e) {
    var a;
    let r = this.categories.filter((o) => o.key !== "component");
    if (e.showRecents && r.unshift({ key: "recents", order: -1 }), (a = e.custom) != null && a.length && r.push({ key: "custom", order: 10 }), e.categories) {
      const o = e.categories;
      r = r.filter((i) => o.includes(i.key)), r.sort((i, l) => o.indexOf(i.key) - o.indexOf(l.key));
    } else
      r.sort((o, i) => o.order - i.order);
    return Promise.resolve(r);
  }
  getEmojis(e, a) {
    const r = this.emojis.filter((o) => o.group === e.order).filter((o) => o.version <= a).sort((o, i) => o.order != null && i.order != null ? o.order - i.order : 0).map(ia);
    return Promise.resolve(La(r, a));
  }
  searchEmojis(e, a, r, o) {
    const i = this.emojis.filter((n) => Aa(n, e, o) && n.version <= r).map(ia), l = a.filter((n) => Aa(n, e, o)), d = [
      ...La(i, r),
      ...l
    ];
    return Promise.resolve(d);
  }
  setMeta(e) {
    this.meta = e;
  }
}
function gs(t, e) {
  const a = `https://cdn.jsdelivr.net/npm/emojibase-data@${t}/${e}`;
  return {
    emojisUrl: `${a}/data.json`,
    messagesUrl: `${a}/messages.json`
  };
}
async function Dr(t) {
  try {
    return (await fetch(t, { method: "HEAD" })).headers.get("etag");
  } catch {
    return null;
  }
}
function _s(t) {
  const { emojisUrl: e, messagesUrl: a } = gs("latest", t);
  try {
    return Promise.all([
      Dr(e),
      Dr(a)
    ]);
  } catch {
    return Promise.all([null, null]);
  }
}
async function us(t, e, a) {
  let r;
  try {
    r = await t.getEtags();
  } catch {
    r = {};
  }
  const { storedEmojisEtag: o, storedMessagesEtag: i } = r;
  if (a !== i || e !== o) {
    const [l, d] = await Promise.all([po(t.locale), lo(t.locale)]);
    await t.populate({
      groups: l.groups,
      emojis: d,
      emojisEtag: e,
      messagesEtag: a
    });
  }
}
async function ms(t, e) {
  const a = await t.getHash();
  return e !== a;
}
async function _o(t, e, a) {
  let r = a || e(t);
  try {
    await r.open();
  } catch {
    console.warn("[picmo] IndexedDB not available, falling back to InMemoryStoreFactory"), r = go(t);
  }
  return r;
}
async function ks(t, e, a) {
  if (!ds() && typeof window < "u")
    throw new Error("Session storage is required to use CDN emoji data.");
  const r = await _o(t, e, a), [o, i] = await _s(t);
  if (await r.isPopulated())
    o && i && await us(r, o, i);
  else {
    const [l, d] = await Promise.all([po(t), lo(t)]);
    await r.populate({ groups: l.groups, emojis: d, emojisEtag: o, messagesEtag: i });
  }
  return r;
}
async function ws(t, e, a, r, o) {
  const i = await _o(t, e, o), l = await ls(r);
  return (!await i.isPopulated() || await ms(i, l)) && await i.populate({ groups: a.groups, emojis: r, hash: l }), i;
}
async function uo(t, e, a, r, o) {
  return a && r ? ws(t, e, a, r, o) : ks(t, e, o);
}
let mo = class {
  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  activate(e) {
    this.rootElement = e, this.rootElement.addEventListener("keydown", this.handleKeyDown);
  }
  deactivate() {
    var e;
    (e = this.rootElement) == null || e.removeEventListener("keydown", this.handleKeyDown);
  }
  get focusableElements() {
    return this.rootElement.querySelectorAll('input, [tabindex="0"]');
  }
  get lastFocusableElement() {
    return this.focusableElements[this.focusableElements.length - 1];
  }
  get firstFocusableElement() {
    return this.focusableElements[0];
  }
  checkFocus(e, a, r) {
    e.target === a && (r.focus(), e.preventDefault());
  }
  handleKeyDown(e) {
    e.key === "Tab" && this.checkFocus(
      e,
      e.shiftKey ? this.firstFocusableElement : this.lastFocusableElement,
      e.shiftKey ? this.lastFocusableElement : this.firstFocusableElement
    );
  }
};
const {
  light: bs,
  dark: W9,
  auto: K9
} = ee("light", "dark", "auto");
class L {
  constructor({ template: e, classes: a, parent: r }) {
    this.isDestroyed = !1, this.appEvents = {}, this.uiEvents = [], this.uiElements = {}, this.ui = {}, this.template = e, this.classes = a, this.parent = r, this.keyBindingHandler = this.keyBindingHandler.bind(this);
  }
  initialize() {
    this.bindAppEvents();
  }
  setCustomEmojis(e) {
    this.customEmojis = e;
  }
  setEvents(e) {
    this.events = e;
  }
  setPickerId(e) {
    this.pickerId = e;
  }
  emit(e, ...a) {
    this.events.emit(e, ...a);
  }
  setI18n(e) {
    this.i18n = e;
  }
  setRenderer(e) {
    this.renderer = e;
  }
  setEmojiData(e) {
    this.emojiDataPromise = e, e.then((a) => {
      this.emojiData = a;
    });
  }
  updateEmojiData(e) {
    this.emojiData = e, this.emojiDataPromise = Promise.resolve(e);
  }
  setOptions(e) {
    this.options = e;
  }
  renderSync(e = {}) {
    return this.el = this.template.renderSync({
      classes: this.classes,
      i18n: this.i18n,
      pickerId: this.pickerId,
      ...e
    }), this.postRender(), this.el;
  }
  async render(e = {}) {
    return await this.emojiDataPromise, this.el = await this.template.renderAsync({
      classes: this.classes,
      i18n: this.i18n,
      pickerId: this.pickerId,
      ...e
    }), this.postRender(), this.el;
  }
  postRender() {
    this.bindUIElements(), this.bindKeyBindings(), this.bindUIEvents(), this.scheduleShowAnimation();
  }
  bindAppEvents() {
    Object.keys(this.appEvents).forEach((e) => {
      this.events.on(e, this.appEvents[e], this);
    }), this.events.on("data:ready", this.updateEmojiData, this);
  }
  unbindAppEvents() {
    Object.keys(this.appEvents).forEach((e) => {
      this.events.off(e, this.appEvents[e]);
    }), this.events.off("data:ready", this.updateEmojiData);
  }
  keyBindingHandler(e) {
    const a = this.keyBindings[e.key];
    a && a.call(this, e);
  }
  bindKeyBindings() {
    this.keyBindings && this.el.addEventListener("keydown", this.keyBindingHandler);
  }
  unbindKeyBindings() {
    this.keyBindings && this.el.removeEventListener("keydown", this.keyBindingHandler);
  }
  bindUIElements() {
    this.ui = Object.keys(this.uiElements).reduce((e, a) => ({
      ...e,
      [a]: this.el.querySelector(this.uiElements[a])
    }), {});
  }
  bindUIEvents() {
    this.uiEvents.forEach((e) => {
      e.handler = e.handler.bind(this), (e.target ? this.ui[e.target] : this.el).addEventListener(e.event, e.handler, e.options);
    });
  }
  unbindUIEvents() {
    this.uiEvents.forEach((e) => {
      (e.target ? this.ui[e.target] : this.el).removeEventListener(e.event, e.handler);
    });
  }
  destroy() {
    this.unbindAppEvents(), this.unbindUIEvents(), this.unbindKeyBindings(), this.el.remove(), this.isDestroyed = !0;
  }
  scheduleShowAnimation() {
    if (this.parent) {
      const e = new MutationObserver((a) => {
        const [r] = a;
        r.type === "childList" && r.addedNodes[0] === this.el && (fo(this.options) && this.animateShow && this.animateShow(), e.disconnect);
      });
      e.observe(this.parent, { childList: !0 });
    }
  }
  static childEvent(e, a, r, o = {}) {
    return { target: e, event: a, handler: r, options: o };
  }
  static uiEvent(e, a, r = {}) {
    return { event: e, handler: a, options: r };
  }
  static byClass(e) {
    return `.${e}`;
  }
}
const vs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"/></svg>', zs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"/></svg>', xs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240zM336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176zM259.9 369.4C288.8 369.4 316.2 375.2 340.6 385.5C352.9 390.7 366.7 381.3 361.4 369.1C344.8 330.9 305.6 303.1 259.9 303.1C214.3 303.1 175.1 330.8 158.4 369.1C153.1 381.3 166.1 390.6 179.3 385.4C203.7 375.1 231 369.4 259.9 369.4L259.9 369.4z"/></svg>', js = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z"/></svg>', Cs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"/></svg>', Es = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z"/></svg>', Ss = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M482.3 192C516.5 192 576 221 576 256C576 292 516.5 320 482.3 320H365.7L265.2 495.9C259.5 505.8 248.9 512 237.4 512H181.2C170.6 512 162.9 501.8 165.8 491.6L214.9 320H112L68.8 377.6C65.78 381.6 61.04 384 56 384H14.03C6.284 384 0 377.7 0 369.1C0 368.7 .1818 367.4 .5398 366.1L32 256L.5398 145.9C.1818 144.6 0 143.3 0 142C0 134.3 6.284 128 14.03 128H56C61.04 128 65.78 130.4 68.8 134.4L112 192H214.9L165.8 20.4C162.9 10.17 170.6 0 181.2 0H237.4C248.9 0 259.5 6.153 265.2 16.12L365.7 192H482.3z"/></svg>', As = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z"/></svg>', Ls = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient gradientUnits="userSpaceOnUse" cy="10%" id="gradient-0">
      <stop offset="0" stop-color="hsl(50, 100%, 50%)" />
      <stop offset="1" stop-color="hsl(50, 100%, 60%)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="172.586" cy="207.006" rx="39.974" ry="39.974"/>
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="334.523" cy="207.481" rx="39.974" ry="39.974"/>
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="313.325" cy="356.208" rx="91.497" ry="59.893"/>
  <path fill="#55a7ff" d="M 159.427 274.06 L 102.158 363.286 L 124.366 417.011 L 160.476 423.338 L 196.937 414.736 L 218.502 375.214"></path>
  <path fill="url(#gradient-0)" d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM256 352C290.9 352 323.2 367.8 348.3 394.9C354.3 401.4 364.4 401.7 370.9 395.7C377.4 389.7 377.7 379.6 371.7 373.1C341.6 340.5 301 320 256 320C247.2 320 240 327.2 240 336C240 344.8 247.2 352 256 352H256zM208 369C208 349 179.6 308.6 166.4 291.3C163.2 286.9 156.8 286.9 153.6 291.3C140.6 308.6 112 349 112 369C112 395 133.5 416 160 416C186.5 416 208 395 208 369H208zM303.6 208C303.6 225.7 317.1 240 335.6 240C353.3 240 367.6 225.7 367.6 208C367.6 190.3 353.3 176 335.6 176C317.1 176 303.6 190.3 303.6 208zM207.6 208C207.6 190.3 193.3 176 175.6 176C157.1 176 143.6 190.3 143.6 208C143.6 225.7 157.1 240 175.6 240C193.3 240 207.6 225.7 207.6 208z" />
</svg>`, $s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>', Ts = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"/></svg>', Fs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"/></svg>', Ps = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M413.8 447.1L256 448l0 31.99C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.32-32.1-31.99l0-31.99l-158.9-.0099c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.0033l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31h-10.77l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"/></svg>', Rs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></svg>', Is = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="radial" cy="85%">
      <stop offset="20%" stop-color="var(--color-secondary)" />
      <stop offset="100%" stop-color="var(--color-primary)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <path fill="url('#radial')" d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
</svg>`, qs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>';
function Os(t, e) {
  const a = It(e);
  return a.dataset.icon = t, a.classList.add(lr("icon")), a;
}
const Mr = {
  clock: vs,
  flag: zs,
  frown: xs,
  gamepad: js,
  lightbulb: Cs,
  mug: Es,
  plane: Ss,
  robot: As,
  sad: Ls,
  search: $s,
  smiley: Ts,
  symbols: Fs,
  tree: Ps,
  users: Rs,
  warning: Is,
  xmark: qs
}, lt = {
  recents: "clock",
  "smileys-emotion": "smiley",
  "people-body": "users",
  "animals-nature": "tree",
  "food-drink": "mug",
  activities: "gamepad",
  "travel-places": "plane",
  objects: "lightbulb",
  symbols: "symbols",
  flags: "flag",
  custom: "robot"
};
function ko(t, e) {
  if (!(t in Mr))
    return console.warn(`Unknown icon: "${t}"`), document.createElement("div");
  const a = Os(t, Mr[t]);
  return e && a.classList.add(lr(`icon-${e}`)), a;
}
const Ds = {
  mode: "sync"
};
var Qe, va, za, qt, xa, Ot, ja, Dt;
class Q {
  constructor(e, a = {}) {
    _e(this, za), _e(this, xa), _e(this, ja), _e(this, Qe, void 0), _e(this, va, void 0), Rt(this, Qe, e), Rt(this, va, a.mode || Ds.mode);
  }
  renderSync(e = {}) {
    const a = It(ue(this, Qe).call(this, e));
    return ie(this, ja, Dt).call(this, a, e), ie(this, xa, Ot).call(this, a), ie(this, za, qt).call(this, a, e), a;
  }
  async renderAsync(e = {}) {
    const a = It(ue(this, Qe).call(this, e));
    return ie(this, ja, Dt).call(this, a, e), ie(this, xa, Ot).call(this, a), await ie(this, za, qt).call(this, a, e), a;
  }
  render(e) {
    return ue(this, va) === "sync" ? this.renderSync(e) : this.renderAsync(e);
  }
}
Qe = /* @__PURE__ */ new WeakMap(), va = /* @__PURE__ */ new WeakMap(), za = /* @__PURE__ */ new WeakSet(), qt = async function(t, e) {
  const a = t.querySelectorAll("[data-view]"), r = [];
  for (const o of a) {
    const i = e[o.dataset.view];
    i ? o.dataset.render !== "sync" ? r.push(i.render().then((l) => (o.replaceWith(l), l))) : o.replaceWith(i.renderSync()) : o.remove();
  }
  return Promise.all(r);
}, xa = /* @__PURE__ */ new WeakSet(), Ot = function(t) {
  t.querySelectorAll("i[data-icon]").forEach((e) => {
    const { icon: a, size: r } = e.dataset;
    e.replaceWith(ko(a, r));
  });
}, ja = /* @__PURE__ */ new WeakSet(), Dt = function(t, e) {
  return t.querySelectorAll("[data-placeholder]").forEach((a) => {
    const r = a.dataset.placeholder;
    if (r && e[r]) {
      const o = e[r];
      a.replaceWith(...[o].flat());
    } else
      console.warn(`Missing placeholder element for key "${r}"`);
  }), t;
};
const Ms = ee(
  "imagePlaceholder",
  "placeholder"
), Bs = new Q(({ classes: t }) => `
  <div class="${t.placeholder} ${t.imagePlaceholder}"></div>
`);
let Ns = class extends L {
  constructor({ classNames: e } = {}) {
    super({ template: Bs, classes: Ms }), this.classNames = e;
  }
  load(e) {
    const a = document.createElement("img");
    this.classNames && (a.className = this.classNames), a.addEventListener("load", () => {
      this.el.replaceWith(a);
    }, { once: !0 }), Promise.resolve(e).then((r) => a.src = r);
  }
  renderSync() {
    return super.renderSync(), this.classNames && this.classNames.split(" ").forEach((e) => this.el.classList.add(e)), this.el;
  }
};
const Hs = ee("customEmoji");
class Us {
  renderElement(e) {
    return { content: e };
  }
  renderImage(e = "", a) {
    const r = new Ns({ classNames: e });
    return r.renderSync(), { content: r, resolver: () => (r.load(a()), r.el) };
  }
  doRender(e, a, r) {
    if (e.custom)
      return this.renderCustom(e, a, r);
    const { content: o, resolver: i } = this.render(e, r), l = o instanceof Element ? o : o.el;
    return i && i(), l;
  }
  doEmit(e) {
    return e.custom ? this.emitCustom(e) : this.emit(e);
  }
  emitCustom({ url: e, label: a, emoji: r, data: o }) {
    return { url: e, label: a, emoji: r, data: o };
  }
  renderCustom(e, a, r = "") {
    const o = [Hs.customEmoji, r].join(" ").trim(), { content: i, resolver: l } = this.renderImage(o, () => e.url), d = i instanceof Element ? i : i.el;
    return l && l(), d;
  }
}
const Vs = new Q(({ emoji: t }) => `<span>${t}</span>`);
let Ws = class extends Us {
  render(e) {
    return this.renderElement(Vs.renderSync({ emoji: e.emoji }));
  }
  emit({ emoji: e, hexcode: a, label: r }) {
    return { emoji: e, hexcode: a, label: r };
  }
};
const Ks = {
  "categories.activities": "Activities",
  "categories.animals-nature": "Animals & Nature",
  "categories.custom": "Custom",
  "categories.flags": "Flags",
  "categories.food-drink": "Food & Drink",
  "categories.objects": "Objects",
  "categories.people-body": "People & Body",
  "categories.recents": "Recently Used",
  "categories.smileys-emotion": "Smileys & Emotion",
  "categories.symbols": "Symbols",
  "categories.travel-places": "Travel & Places",
  "error.load": "Failed to load emojis",
  "recents.clear": "Clear recent emojis",
  "recents.none": "You haven't selected any emojis yet.",
  retry: "Try again",
  "search.clear": "Clear search",
  "search.error": "Failed to search emojis",
  "search.notFound": "No results found",
  search: "Search emojis..."
}, Mt = "PicMo";
function wo(t) {
  return new Gs(t);
}
wo.deleteDatabase = (t) => new Promise((e, a) => {
  const r = indexedDB.deleteDatabase(`${Mt}-${t}`);
  r.addEventListener("success", e), r.addEventListener("error", a);
});
class Gs extends yo {
  async open() {
    const e = indexedDB.open(`${Mt}-${this.locale}`);
    return new Promise((a, r) => {
      e.addEventListener("success", (o) => {
        var i;
        this.db = (i = o.target) == null ? void 0 : i.result, a();
      }), e.addEventListener("error", r), e.addEventListener("upgradeneeded", async (o) => {
        var i;
        this.db = (i = o.target) == null ? void 0 : i.result, this.db.createObjectStore("category", { keyPath: "order" });
        const l = this.db.createObjectStore("emoji", { keyPath: "emoji" });
        l.createIndex("category", "group"), l.createIndex("version", "version"), this.db.createObjectStore("meta");
      });
    });
  }
  async delete() {
    this.close();
    const e = indexedDB.deleteDatabase(`${Mt}-${this.locale}`);
    await this.waitForRequest(e);
  }
  close() {
    this.db.close();
  }
  async getEmojiCount() {
    const e = this.db.transaction("emoji", "readonly").objectStore("emoji");
    return (await this.waitForRequest(e.count())).target.result;
  }
  async getEtags() {
    const e = this.db.transaction("meta", "readonly").objectStore("meta"), [a, r] = await Promise.all([
      this.waitForRequest(e.get("emojisEtag")),
      this.waitForRequest(e.get("messagesEtag"))
    ]);
    return {
      storedEmojisEtag: a.target.result,
      storedMessagesEtag: r.target.result
    };
  }
  async setMeta(e) {
    const a = this.db.transaction("meta", "readwrite"), r = a.objectStore("meta");
    return new Promise((o) => {
      a.oncomplete = o, Object.keys(e).filter(Boolean).forEach((i) => {
        r.put(e[i], i);
      });
    });
  }
  async getHash() {
    const e = this.db.transaction("meta", "readonly").objectStore("meta");
    return (await this.waitForRequest(e.get("hash"))).target.result;
  }
  async isPopulated() {
    const e = this.db.transaction("category", "readonly").objectStore("category");
    return (await this.waitForRequest(e.count())).target.result > 0;
  }
  async populate({
    groups: e,
    emojis: a,
    emojisEtag: r,
    messagesEtag: o,
    hash: i
  }) {
    await this.removeAllObjects("category", "emoji");
    const l = [
      this.addObjects("category", e),
      this.addObjects("emoji", a),
      this.setMeta({ emojisEtag: r, messagesEtag: o, hash: i })
    ];
    await Promise.all(l);
  }
  async getCategories(e) {
    var a;
    const r = this.db.transaction("category", "readonly").objectStore("category");
    let o = (await this.waitForRequest(r.getAll())).target.result.filter((i) => i.key !== "component");
    if (e.showRecents && o.unshift({ key: "recents", order: -1 }), (a = e.custom) != null && a.length && o.push({ key: "custom", order: 10 }), e.categories) {
      const i = e.categories;
      o = o.filter((l) => i.includes(l.key)), o.sort((l, d) => i.indexOf(l.key) - i.indexOf(d.key));
    } else
      o.sort((i, l) => i.order - l.order);
    return o;
  }
  async getEmojis(e, a) {
    const r = this.db.transaction("emoji", "readonly").objectStore("emoji").index("category"), o = (await this.waitForRequest(r.getAll(e.order))).target.result.filter((i) => i.version <= a).sort((i, l) => i.order != null && l.order != null ? i.order - l.order : 0).map(ia);
    return La(o, a);
  }
  async searchEmojis(e, a, r, o) {
    const i = [];
    return new Promise((l, d) => {
      const n = this.db.transaction("emoji", "readonly").objectStore("emoji").openCursor();
      n.addEventListener("success", (f) => {
        var h;
        const p = (h = f.target) == null ? void 0 : h.result;
        if (!p)
          return l([
            ...La(i, r),
            ...a.filter((y) => Aa(y, e))
          ]);
        const c = p.value;
        Aa(c, e, o) && c.version <= r && i.push(ia(c)), p.continue();
      }), n.addEventListener("error", (f) => {
        d(f);
      });
    });
  }
  async waitForRequest(e) {
    return new Promise((a, r) => {
      e.onsuccess = a, e.onerror = r;
    });
  }
  withTransaction(e, a = "readwrite", r) {
    return new Promise((o, i) => {
      const l = this.db.transaction(e, a);
      l.oncomplete = o, l.onerror = i, r(l);
    });
  }
  async removeAllObjects(...e) {
    const a = this.db.transaction(e, "readwrite"), r = e.map((o) => a.objectStore(o));
    await Promise.all(r.map((o) => this.waitForRequest(o.clear())));
  }
  async addObjects(e, a) {
    return this.withTransaction(e, "readwrite", (r) => {
      const o = r.objectStore(e);
      a.forEach((i) => {
        o.add(i);
      });
    });
  }
}
function Xs() {
  let t = {};
  return {
    getItem: (e) => t[e],
    setItem: (e, a) => t[e] = a,
    length: Object.keys(t).length,
    clear: () => t = {},
    key: (e) => Object.keys(t)[e],
    removeItem: (e) => delete t[e]
  };
}
class Qs {
}
const jt = "PicMo:recents";
class Js extends Qs {
  constructor(e) {
    super(), this.storage = e;
  }
  clear() {
    this.storage.removeItem(jt);
  }
  getRecents(e) {
    var a;
    try {
      return JSON.parse((a = this.storage.getItem(jt)) != null ? a : "[]").slice(0, e);
    } catch {
      return [];
    }
  }
  addOrUpdateRecent(e, a) {
    const r = [
      e,
      ...this.getRecents(a).filter((o) => o.hexcode !== e.hexcode)
    ].slice(0, a);
    try {
      this.storage.setItem(jt, JSON.stringify(r));
    } catch {
      console.warn("storage is not available, recent emojis will not be saved");
    }
  }
}
let Ys = class extends Js {
  constructor() {
    super(ps() ? localStorage : Xs());
  }
};
const Zs = {
  dataStore: wo,
  theme: bs,
  animate: !0,
  showCategoryTabs: !0,
  showPreview: !0,
  showRecents: !0,
  showSearch: !0,
  showVariants: !0,
  emojisPerRow: 8,
  visibleRows: 6,
  emojiVersion: "auto",
  i18n: Ks,
  locale: "en",
  maxRecents: 50,
  custom: []
};
function bo(t = {}) {
  return {
    ...Zs,
    ...t,
    renderer: t.renderer || new Ws(),
    recentsProvider: t.recentsProvider || new Ys()
  };
}
var Le, Ze, $a, Ca, Bt;
let dt = class {
  constructor() {
    _e(this, Ze), _e(this, Ca), _e(this, Le, /* @__PURE__ */ new Map());
  }
  on(e, a, r) {
    ie(this, Ca, Bt).call(this, e, a, r);
  }
  once(e, a, r) {
    ie(this, Ca, Bt).call(this, e, a, r, !0);
  }
  off(e, a) {
    const r = ie(this, Ze, $a).call(this, e);
    ue(this, Le).set(e, r.filter((o) => o.handler !== a));
  }
  emit(e, ...a) {
    ie(this, Ze, $a).call(this, e).forEach((r) => {
      r.handler.apply(r.context, a), r.once && this.off(e, r.handler);
    });
  }
  removeAll() {
    ue(this, Le).clear();
  }
};
Le = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakSet(), $a = function(t) {
  return ue(this, Le).has(t) || ue(this, Le).set(t, []), ue(this, Le).get(t);
}, Ca = /* @__PURE__ */ new WeakSet(), Bt = function(t, e, a, r = !1) {
  ie(this, Ze, $a).call(this, t).push({ context: a, handler: e, once: r });
};
let ec = class extends dt {
}, ac = class extends dt {
};
const Nt = ee(
  "emojiCategory",
  "categoryName",
  "noRecents",
  "recentEmojis"
);
class dr extends L {
  constructor({ template: e, category: a, showVariants: r, lazyLoader: o }) {
    super({ template: e, classes: Nt }), this.baseUIElements = {
      categoryName: L.byClass(Nt.categoryName)
    }, this.category = a, this.showVariants = r, this.lazyLoader = o;
  }
  setActive(e, a, r) {
    this.emojiContainer.setActive(e, a, r);
  }
}
const tc = new Q(({ classes: t, emoji: e }) => `
  <button
    type="button"
    class="${t.emojiButton}"
    title="${e.label}"
    data-emoji="${e.emoji}"
    tabindex="-1">
    <div data-placeholder="emojiContent"></div>
  </button>
`), rc = ee("emojiButton");
class vo extends L {
  constructor({ emoji: e, lazyLoader: a, category: r }) {
    super({ template: tc, classes: rc }), this.emoji = e, this.lazyLoader = a, this.category = r;
  }
  initialize() {
    this.uiEvents = [
      L.uiEvent("focus", this.handleFocus)
    ], super.initialize();
  }
  handleFocus() {
    this.category && this.events.emit("focus:change", this.category);
  }
  activateFocus(e) {
    this.el.tabIndex = 0, e && this.el.focus();
  }
  deactivateFocus() {
    this.el.tabIndex = -1;
  }
  renderSync() {
    return super.renderSync({
      emoji: this.emoji,
      emojiContent: this.renderer.doRender(this.emoji, this.lazyLoader)
    });
  }
}
let oc = class {
  constructor(e, a, r = 0, o = 0, i = !1) {
    this.events = new dt(), this.keyHandlers = {
      ArrowLeft: this.focusPrevious.bind(this),
      ArrowRight: this.focusNext.bind(this),
      ArrowUp: this.focusUp.bind(this),
      ArrowDown: this.focusDown.bind(this)
    }, this.rowCount = Math.ceil(a / e), this.columnCount = e, this.focusedRow = r, this.focusedColumn = o, this.emojiCount = a, this.wrap = i, this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  destroy() {
    this.events.removeAll();
  }
  on(e, a) {
    this.events.on(e, a);
  }
  handleKeyDown(e) {
    e.key in this.keyHandlers && (e.preventDefault(), this.keyHandlers[e.key]());
  }
  setCell(e, a, r = !0) {
    const o = this.getIndex();
    this.focusedRow = e, a !== void 0 && (this.focusedColumn = Math.min(this.columnCount, a)), (this.focusedRow >= this.rowCount || this.getIndex() >= this.emojiCount) && (this.focusedRow = this.rowCount - 1, this.focusedColumn = this.emojiCount % this.columnCount - 1), this.events.emit("focus:change", { from: o, to: this.getIndex(), performFocus: r });
  }
  setFocusedIndex(e, a = !0) {
    const r = Math.floor(e / this.columnCount), o = e % this.columnCount;
    this.setCell(r, o, a);
  }
  focusNext() {
    this.focusedColumn < this.columnCount - 1 && this.getIndex() < this.emojiCount - 1 ? this.setCell(this.focusedRow, this.focusedColumn + 1) : this.focusedRow < this.rowCount - 1 ? this.setCell(this.focusedRow + 1, 0) : this.wrap ? this.setCell(0, 0) : this.events.emit("focus:overflow", 0);
  }
  focusPrevious() {
    this.focusedColumn > 0 ? this.setCell(this.focusedRow, this.focusedColumn - 1) : this.focusedRow > 0 ? this.setCell(this.focusedRow - 1, this.columnCount - 1) : this.wrap ? this.setCell(this.rowCount - 1, this.columnCount - 1) : this.events.emit("focus:underflow", this.columnCount - 1);
  }
  focusUp() {
    this.focusedRow > 0 ? this.setCell(this.focusedRow - 1, this.focusedColumn) : this.events.emit("focus:underflow", this.focusedColumn);
  }
  focusDown() {
    this.focusedRow < this.rowCount - 1 ? this.setCell(this.focusedRow + 1, this.focusedColumn) : this.events.emit("focus:overflow", this.focusedColumn);
  }
  focusToIndex(e) {
    this.setCell(Math.floor(e / this.columnCount), e % this.columnCount);
  }
  getIndex() {
    return this.focusedRow * this.columnCount + this.focusedColumn;
  }
  getCell() {
    return { row: this.focusedRow, column: this.focusedColumn };
  }
  getRowCount() {
    return this.rowCount;
  }
};
const sc = new Q(({ classes: t }) => `
  <div class="${t.emojiContainer}">
    <div data-placeholder="emojis"></div>
  </div>
`), cc = ee("emojiContainer");
class da extends L {
  constructor({ emojis: e, showVariants: a, preview: r = !0, lazyLoader: o, category: i, fullHeight: l = !1 }) {
    super({ template: sc, classes: cc }), this.fullHeight = !1, this.showVariants = a, this.lazyLoader = o, this.preview = r, this.emojis = e, this.category = i, this.fullHeight = l, this.setFocus = this.setFocus.bind(this), this.triggerNextCategory = this.triggerNextCategory.bind(this), this.triggerPreviousCategory = this.triggerPreviousCategory.bind(this);
  }
  initialize() {
    this.grid = new oc(this.options.emojisPerRow, this.emojiCount, 0, 0, !this.category), this.grid.on("focus:change", this.setFocus), this.grid.on("focus:overflow", this.triggerNextCategory), this.grid.on("focus:underflow", this.triggerPreviousCategory), this.uiEvents = [
      L.uiEvent("click", this.selectEmoji),
      L.uiEvent("keydown", this.grid.handleKeyDown)
    ], this.preview && this.uiEvents.push(
      L.uiEvent("mouseover", this.showPreview),
      L.uiEvent("mouseout", this.hidePreview),
      L.uiEvent("focus", this.showPreview, { capture: !0 }),
      L.uiEvent("blur", this.hidePreview, { capture: !0 })
    ), super.initialize();
  }
  setFocusedView(e, a) {
    if (e)
      if (typeof e == "string") {
        const r = this.emojis.findIndex((o) => o.emoji === e);
        this.grid.setFocusedIndex(r, !1), setTimeout(() => {
          var o, i, l, d;
          const n = this.emojiViews[r].el;
          n.scrollIntoView();
          const f = (o = n.parentElement) == null ? void 0 : o.previousElementSibling, h = (l = (i = n.parentElement) == null ? void 0 : i.parentElement) == null ? void 0 : l.parentElement;
          h.scrollTop -= (d = f == null ? void 0 : f.offsetHeight) != null ? d : 0;
        });
      } else
        e.row === "first" || e.row === 0 ? this.grid.setCell(0, e.offset, a) : e.row === "last" && this.grid.setCell(this.grid.getRowCount() - 1, e.offset, a);
  }
  setActive(e, a, r) {
    var o;
    e ? this.setFocusedView(a, r) : (o = this.emojiViews[this.grid.getIndex()]) == null || o.deactivateFocus();
  }
  renderSync() {
    return this.emojiViews = this.emojis.map(
      (e) => this.viewFactory.create(vo, {
        emoji: e,
        category: this.category,
        lazyLoader: this.lazyLoader,
        renderer: this.renderer
      })
    ), this.emojiElements = this.emojiViews.map((e) => e.renderSync()), super.renderSync({
      emojis: this.emojiElements,
      i18n: this.i18n
    });
  }
  destroy() {
    super.destroy(), this.emojiViews.forEach((e) => e.destroy()), this.grid.destroy();
  }
  triggerPreviousCategory(e) {
    this.events.emit("category:previous", e);
  }
  triggerNextCategory(e) {
    this.category && this.events.emit("category:next", e);
  }
  setFocus({ from: e, to: a, performFocus: r }) {
    var o, i;
    (o = this.emojiViews[e]) == null || o.deactivateFocus(), (i = this.emojiViews[a]) == null || i.activateFocus(r);
  }
  selectEmoji(e) {
    e.stopPropagation();
    const a = zt(e, this.emojis);
    a && this.events.emit("emoji:select", {
      emoji: a,
      showVariants: this.showVariants
    });
  }
  showPreview(e) {
    const a = e.target.closest("button"), r = a == null ? void 0 : a.firstElementChild, o = zt(e, this.emojis);
    o && this.events.emit("preview:show", o, r == null ? void 0 : r.cloneNode(!0));
  }
  hidePreview(e) {
    zt(e, this.emojis) && this.events.emit("preview:hide");
  }
  get emojiCount() {
    return this.emojis.length;
  }
}
const ic = new Q(({ classes: t, category: e, pickerId: a, icon: r, i18n: o }) => `
  <section class="${t.emojiCategory}" role="tabpanel" aria-labelledby="${a}-category-${e.key}">
    <h3 data-category="${e.key}" class="${t.categoryName}">
      <i data-icon="${r}"></i>
      ${o.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);
let nc = class extends dr {
  constructor({ category: e, showVariants: a, lazyLoader: r, emojiVersion: o }) {
    super({ category: e, showVariants: a, lazyLoader: r, template: ic }), this.showVariants = a, this.lazyLoader = r, this.emojiVersion = o;
  }
  initialize() {
    this.uiElements = { ...this.baseUIElements }, super.initialize();
  }
  async render() {
    await this.emojiDataPromise;
    const e = await this.emojiData.getEmojis(this.category, this.emojiVersion);
    return this.emojiContainer = this.viewFactory.create(da, {
      emojis: e,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: e.length,
      icon: lt[this.category.key]
    });
  }
}, lc = class extends da {
  constructor({ category: e, emojis: a, preview: r = !0, lazyLoader: o }) {
    super({ category: e, emojis: a, showVariants: !1, preview: r, lazyLoader: o });
  }
  async addOrUpdate(e) {
    const a = this.el.querySelector(`[data-emoji="${e.emoji}"]`);
    a && (this.el.removeChild(a), this.emojis = this.emojis.filter((o) => o !== e));
    const r = this.viewFactory.create(vo, { emoji: e });
    if (this.el.insertBefore(r.renderSync(), this.el.firstChild), this.emojis = [
      e,
      ...this.emojis.filter((o) => o !== e)
    ], this.emojis.length > this.options.maxRecents) {
      this.emojis = this.emojis.slice(0, this.options.maxRecents);
      const o = this.el.childElementCount - this.options.maxRecents;
      for (let i = 0; i < o; i++)
        this.el.lastElementChild && this.el.removeChild(this.el.lastElementChild);
    }
  }
};
const dc = new Q(({ emojiCount: t, classes: e, category: a, pickerId: r, icon: o, i18n: i }) => `
  <section class="${e.emojiCategory}" role="tabpanel" aria-labelledby="${r}-category-${a.key}">
    <h3 data-category="${a.key}" class="${e.categoryName}">
      <i data-icon="${o}"></i>
      ${i.get(`categories.${a.key}`, a.message || a.key)}
    </h3>
    <div data-empty="${t === 0}" class="${e.recentEmojis}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
    <div class="${e.noRecents}">
      ${i.get("recents.none")}
    </div>
  </section>
`, { mode: "async" });
let pc = class extends dr {
  constructor({ category: e, lazyLoader: a, provider: r }) {
    super({ category: e, showVariants: !1, lazyLoader: a, template: dc }), this.provider = r;
  }
  initialize() {
    this.uiElements = {
      ...this.baseUIElements,
      recents: L.byClass(Nt.recentEmojis)
    }, this.appEvents = {
      "recent:add": this.addRecent
    }, super.initialize();
  }
  async addRecent(e) {
    await this.emojiContainer.addOrUpdate(e), this.ui.recents.dataset.empty = "false";
  }
  async render() {
    var e;
    const a = (e = this.provider) == null ? void 0 : e.getRecents(this.options.maxRecents);
    return this.emojiContainer = this.viewFactory.create(lc, {
      emojis: a,
      showVariants: !1,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), await super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: a.length,
      icon: lt[this.category.key]
    }), this.el;
  }
};
const fc = new Q(({ classes: t, category: e, pickerId: a, icon: r, i18n: o }) => `
  <section class="${t.emojiCategory}" role="tabpanel" aria-labelledby="${a}-category-${e.key}">
    <h3 data-category="${e.key}" class="${t.categoryName}">
      <i data-icon="${r}"></i>
      ${o.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);
let hc = class extends dr {
  constructor({ category: e, lazyLoader: a }) {
    super({ template: fc, showVariants: !1, lazyLoader: a, category: e });
  }
  initialize() {
    this.uiElements = { ...this.baseUIElements }, super.initialize();
  }
  async render() {
    return this.emojiContainer = this.viewFactory.create(da, {
      emojis: this.customEmojis,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: this.customEmojis.length,
      icon: lt[this.category.key]
    });
  }
};
class zo {
  constructor() {
    this.elements = /* @__PURE__ */ new Map();
  }
  lazyLoad(e, a) {
    return this.elements.set(e, a), e;
  }
  observe(e) {
    if (window.IntersectionObserver) {
      const a = new IntersectionObserver(
        (r) => {
          r.filter((o) => o.intersectionRatio > 0).map((o) => o.target).forEach((o) => {
            const i = this.elements.get(o);
            i == null || i(), a.unobserve(o);
          });
        },
        {
          root: e
        }
      );
      this.elements.forEach((r, o) => {
        a.observe(o);
      });
    } else
      this.elements.forEach((a) => {
        a();
      });
  }
}
const Br = ee("emojiArea"), yc = new Q(({ classes: t }) => `
  <div class="${t.emojiArea}">
    <div data-placeholder="emojis"></div>
  </div>
`, { mode: "async" }), gc = {
  recents: pc,
  custom: hc
};
function _c(t) {
  return gc[t.key] || nc;
}
function uc(t) {
  return !t || t === "button" ? {
    row: "first",
    offset: 0
  } : t;
}
let mc = class extends L {
  constructor({ categoryTabs: e, categories: a, emojiVersion: r }) {
    super({ template: yc, classes: Br }), this.selectedCategory = 0, this.scrollListenerState = "active", this.lazyLoader = new zo(), this.categoryTabs = e, this.categories = a, this.emojiVersion = r, this.handleScroll = is(this.handleScroll.bind(this), 100);
  }
  initialize() {
    this.appEvents = {
      "category:select": this.handleCategorySelect,
      "category:previous": this.focusPreviousCategory,
      "category:next": this.focusNextCategory,
      "focus:change": this.updateFocusedCategory
    }, this.uiElements = { emojis: L.byClass(Br.emojiArea) }, this.uiEvents = [L.uiEvent("scroll", this.handleScroll)], super.initialize();
  }
  get focusableEmoji() {
    return this.el.querySelector('[tabindex="0"]');
  }
  async render() {
    this.emojiCategories = this.categories.map(this.createCategory, this);
    const e = {};
    return this.categories.forEach((a, r) => {
      e[`emojis-${a.key}`] = this.emojiCategories[r];
    }), await super.render({
      emojis: await Promise.all(this.emojiCategories.map((a) => a.render()))
    }), this.lazyLoader.observe(this.el), this.el;
  }
  destroy() {
    super.destroy(), this.emojiCategories.forEach((e) => {
      var a;
      (a = this.observer) == null || a.unobserve(e.el), e.destroy();
    });
  }
  handleCategorySelect(e, a) {
    this.el.style.overflow = "hidden", this.selectCategory(e, a), this.el.style.overflow = "auto";
  }
  createCategory(e) {
    const a = _c(e);
    return this.viewFactory.create(a, {
      category: e,
      showVariants: !0,
      lazyLoader: this.lazyLoader,
      emojiVersion: this.emojiVersion,
      provider: this.options.recentsProvider
    });
  }
  determineInitialCategory() {
    var e;
    return this.options.initialCategory && this.categories.find((a) => a.key === this.options.initialCategory) ? this.options.initialCategory : (e = this.categories.find((a) => a.key !== "recents")) == null ? void 0 : e.key;
  }
  determineFocusTarget(e) {
    const a = this.emojiCategories.find((r) => r.category.key === e);
    return this.options.initialEmoji && (a != null && a.el.querySelector(`[data-emoji="${this.options.initialEmoji}"]`)) ? this.options.initialEmoji : "button";
  }
  reset(e = !0) {
    this.events.emit("preview:hide");
    const a = this.determineInitialCategory();
    a && (this.selectCategory(a, {
      focus: this.determineFocusTarget(a),
      performFocus: e,
      scroll: "jump"
    }), this.selectedCategory = this.getCategoryIndex(a));
  }
  getCategoryIndex(e) {
    return this.categories.findIndex((a) => a.key === e);
  }
  focusPreviousCategory(e) {
    this.selectedCategory > 0 && this.focusCategory(this.selectedCategory - 1, { row: "last", offset: e ?? this.options.emojisPerRow });
  }
  focusNextCategory(e) {
    this.selectedCategory < this.categories.length - 1 && this.focusCategory(this.selectedCategory + 1, { row: "first", offset: e ?? 0 });
  }
  focusCategory(e, a) {
    this.selectCategory(e, {
      focus: a,
      performFocus: !0
    });
  }
  async selectCategory(e, a = {}) {
    var r;
    this.scrollListenerState = "suspend";
    const { focus: o, performFocus: i, scroll: l } = {
      performFocus: !1,
      ...a
    };
    this.emojiCategories[this.selectedCategory].setActive(!1);
    const d = this.selectedCategory = typeof e == "number" ? e : this.getCategoryIndex(e);
    (r = this.categoryTabs) == null || r.setActiveTab(this.selectedCategory, {
      performFocus: i,
      scroll: o === "button"
    });
    const n = this.emojiCategories[d].el.offsetTop;
    this.emojiCategories[d].setActive(!0, uc(o), o !== "button" && i), l && (this.el.scrollTop = n), this.scrollListenerState = "resume";
  }
  updateFocusedCategory(e) {
    var a;
    this.categories[this.selectedCategory].key !== e && (this.scrollListenerState = "suspend", this.selectedCategory = this.getCategoryIndex(e), (a = this.categoryTabs) == null || a.setActiveTab(this.selectedCategory, {
      changeFocusable: !1,
      performFocus: !1
    }), this.scrollListenerState = "resume");
  }
  handleScroll() {
    if (this.scrollListenerState === "suspend" || !this.categoryTabs)
      return;
    if (this.scrollListenerState === "resume") {
      this.scrollListenerState = "active";
      return;
    }
    const e = this.el.scrollTop, a = this.el.scrollHeight - this.el.offsetHeight, r = this.emojiCategories.findIndex((i, l) => {
      var d;
      return e < ((d = this.emojiCategories[l + 1]) == null ? void 0 : d.el.offsetTop);
    }), o = {
      changeFocusable: !1,
      performFocus: !1,
      scroll: !1
    };
    e === 0 ? this.categoryTabs.setActiveTab(0, o) : Math.floor(e) === Math.floor(a) || r < 0 ? this.categoryTabs.setActiveTab(this.categories.length - 1, o) : this.categoryTabs.setActiveTab(r, o);
  }
};
const kc = new Q(({ classList: t, classes: e, icon: a, message: r }) => `
<div class="${t}" role="alert">
  <div class="${e.iconContainer}"><i data-size="10x" data-icon="${a}"></i></div>
  <h3 class="${e.title}">${r}</h3>
</div>
`), Nr = ee("error", "iconContainer", "title");
let Ht = class extends L {
  constructor({ message: e, icon: a = "warning", template: r = kc, className: o }) {
    super({ template: r, classes: Nr }), this.message = e, this.icon = a, this.className = o;
  }
  renderSync() {
    const e = [Nr.error, this.className].join(" ").trim();
    return super.renderSync({ message: this.message, icon: this.icon, classList: e });
  }
};
const wc = new Q(({ classList: t, classes: e, icon: a, i18n: r, message: o }) => `
  <div class="${t}" role="alert">
    <div class="${e.icon}"><i data-size="10x" data-icon="${a}"></i></div>
    <h3 class="${e.title}">${o}</h3>
    <button type="button">${r.get("retry")}</button>
  </div>
`), bc = ee("dataError");
class vc extends Ht {
  constructor({ message: e }) {
    super({ message: e, template: wc, className: bc.dataError });
  }
  initialize() {
    this.uiElements = { retryButton: "button" }, this.uiEvents = [L.childEvent("retryButton", "click", this.onRetry)], super.initialize();
  }
  async onRetry() {
    this.emojiData ? await this.emojiData.delete() : await this.options.dataStore.deleteDatabase(this.options.locale), this.events.emit("reinitialize");
    const e = await uo(this.options.locale, this.options.dataStore, this.options.messages, this.options.emojiData, this.emojiData);
    this.viewFactory.setEmojiData(e), this.events.emit("data:ready", e);
  }
}
const We = ee(
  "preview",
  "previewEmoji",
  "previewName",
  "tagList",
  "tag"
), zc = new Q(({ classes: t, tag: e }) => `
  <li class="${t.tag}">${e}</li>
`), xc = new Q(({ classes: t }) => `
  <div class="${t.preview}">
    <div class="${t.previewEmoji}"></div>
    <div class="${t.previewName}"></div>
    <ul class="${t.tagList}"></ul>
  </div>
`);
class jc extends L {
  constructor() {
    super({ template: xc, classes: We });
  }
  initialize() {
    this.uiElements = {
      emoji: L.byClass(We.previewEmoji),
      name: L.byClass(We.previewName),
      tagList: L.byClass(We.tagList)
    }, this.appEvents = {
      "preview:show": this.showPreview,
      "preview:hide": this.hidePreview
    }, super.initialize();
  }
  showPreview(e, a) {
    if (qe(this.ui.emoji, a), this.ui.name.textContent = e.label, e.tags) {
      this.ui.tagList.style.display = "flex";
      const r = e.tags.map((o) => zc.renderSync({ tag: o, classes: We }));
      qe(this.ui.tagList, ...r);
    }
  }
  hidePreview() {
    ba(this.ui.emoji), ba(this.ui.name), ba(this.ui.tagList);
  }
}
const Cc = new Q(({ classes: t, i18n: e }) => `
  <button title="${e.get("search.clear")}" class="${t.clearSearchButton}">
    <i data-icon="xmark"></i>
  </button>
`), Ec = new Q(({ classes: t, i18n: e }) => `
<div class="${t.searchContainer}">
  <input class="${t.searchField}" placeholder="${e.get("search")}">
  <span class="${t.searchAccessory}"></span>
</div>
`, { mode: "async" }), Ke = ee(
  "searchContainer",
  "searchField",
  "clearButton",
  "searchAccessory",
  "clearSearchButton",
  "notFound"
);
class Sc extends L {
  constructor({ categories: e, emojiVersion: a }) {
    super({ template: Ec, classes: Ke }), this.categories = e.filter((r) => r.key !== "recents"), this.emojiVersion = a, this.search = ns(this.search.bind(this), 100);
  }
  initialize() {
    this.uiElements = {
      searchField: L.byClass(Ke.searchField),
      searchAccessory: L.byClass(Ke.searchAccessory)
    }, this.uiEvents = [
      L.childEvent("searchField", "keydown", this.onKeyDown),
      L.childEvent("searchField", "input", this.onSearchInput)
    ], super.initialize();
  }
  async render() {
    return await super.render(), this.searchIcon = ko("search"), this.notFoundMessage = this.viewFactory.create(Ht, {
      message: this.i18n.get("search.notFound"),
      className: Ke.notFound,
      icon: "sad"
    }), this.notFoundMessage.renderSync(), this.errorMessage = this.viewFactory.create(Ht, { message: this.i18n.get("search.error") }), this.errorMessage.renderSync(), this.clearSearchButton = Cc.render({
      classes: Ke,
      i18n: this.i18n
    }), this.clearSearchButton.addEventListener("click", (e) => this.onClearSearch(e)), this.searchField = this.ui.searchField, this.showSearchIcon(), this.el;
  }
  showSearchIcon() {
    this.showSearchAccessory(this.searchIcon);
  }
  showClearSearchButton() {
    this.showSearchAccessory(this.clearSearchButton);
  }
  showSearchAccessory(e) {
    qe(this.ui.searchAccessory, e);
  }
  clear() {
    this.searchField.value = "", this.showSearchIcon();
  }
  focus() {
    this.searchField.focus();
  }
  onClearSearch(e) {
    var a;
    e.stopPropagation(), this.searchField.value = "", (a = this.resultsContainer) == null || a.destroy(), this.resultsContainer = null, this.showSearchIcon(), this.events.emit("content:show"), this.searchField.focus();
  }
  handleResultsKeydown(e) {
    this.resultsContainer && e.key === "Escape" && this.onClearSearch(e);
  }
  onKeyDown(e) {
    var a;
    e.key === "Escape" && this.searchField.value ? this.onClearSearch(e) : (e.key === "Enter" || e.key === "ArrowDown") && this.resultsContainer && (e.preventDefault(), (a = this.resultsContainer.el.querySelector('[tabindex="0"]')) == null || a.focus());
  }
  onSearchInput(e) {
    this.searchField.value ? (this.showClearSearchButton(), this.search()) : this.onClearSearch(e);
  }
  async search() {
    var e;
    if (this.searchField.value)
      try {
        const a = await this.emojiData.searchEmojis(
          this.searchField.value,
          this.customEmojis,
          this.emojiVersion,
          this.categories
        );
        if (this.events.emit("preview:hide"), a.length) {
          const r = new zo();
          this.resultsContainer = this.viewFactory.create(da, {
            emojis: a,
            fullHeight: !0,
            showVariants: !0,
            lazyLoader: r
          }), this.resultsContainer.renderSync(), (e = this.resultsContainer) != null && e.el && (r.observe(this.resultsContainer.el), this.resultsContainer.setActive(!0, { row: 0, offset: 0 }, !1), this.resultsContainer.el.addEventListener("keydown", (o) => this.handleResultsKeydown(o)), this.events.emit("content:show", this.resultsContainer));
        } else
          this.events.emit("content:show", this.notFoundMessage);
      } catch {
        this.events.emit("content:show", this.errorMessage);
      }
  }
}
const Ac = new Q(({ classes: t }) => `
  <div class="${t.variantOverlay}">
    <div class="${t.variantPopup}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
  </div>
`), Hr = ee(
  "variantOverlay",
  "variantPopup"
), Ct = {
  easing: "ease-in-out",
  duration: 250,
  fill: "both"
}, Ur = {
  opacity: [0, 1]
}, Vr = {
  opacity: [0, 1],
  transform: ["scale3d(0.8, 0.8, 0.8)", "scale3d(1, 1, 1)"]
};
class Lc extends L {
  constructor({ emoji: e, parent: a }) {
    super({ template: Ac, classes: Hr, parent: a }), this.focusedEmojiIndex = 0, this.focusTrap = new mo(), this.animateShow = () => Promise.all([
      Ie(this.el, Ur, Ct, this.options),
      Ie(this.ui.popup, Vr, Ct, this.options)
    ]), this.emoji = e;
  }
  initialize() {
    this.uiElements = {
      popup: L.byClass(Hr.variantPopup)
    }, this.uiEvents = [
      L.uiEvent("click", this.handleClick),
      L.uiEvent("keydown", this.handleKeydown)
    ], super.initialize();
  }
  animateHide() {
    const e = { ...Ct, direction: "reverse" };
    return Promise.all([
      Ie(this.el, Ur, e, this.options),
      Ie(this.ui.popup, Vr, e, this.options)
    ]);
  }
  async hide() {
    await this.animateHide(), this.events.emit("variantPopup:hide");
  }
  handleKeydown(e) {
    e.key === "Escape" && (this.hide(), e.stopPropagation());
  }
  handleClick(e) {
    this.ui.popup.contains(e.target) || this.hide();
  }
  getEmoji(e) {
    return this.renderedEmojis[e];
  }
  setFocusedEmoji(e) {
    const a = this.getEmoji(this.focusedEmojiIndex);
    a.tabIndex = -1, this.focusedEmojiIndex = e;
    const r = this.getEmoji(this.focusedEmojiIndex);
    r.tabIndex = 0, r.focus();
  }
  destroy() {
    this.emojiContainer.destroy(), this.focusTrap.deactivate(), super.destroy();
  }
  renderSync() {
    const e = {
      ...this.emoji,
      skins: null
    }, a = (this.emoji.skins || []).map((o) => ({
      ...o,
      label: this.emoji.label,
      tags: this.emoji.tags
    })), r = [e, ...a];
    return this.emojiContainer = this.viewFactory.create(da, {
      emojis: r,
      preview: !1
    }), super.renderSync({ emojis: this.emojiContainer }), r.length < this.options.emojisPerRow && this.el.style.setProperty("--emojis-per-row", r.length.toString()), this.el;
  }
  activate() {
    this.emojiContainer.setActive(!0, { row: 0, offset: 0 }, !0), this.focusTrap.activate(this.el);
  }
}
const $c = new Q(({ classes: t, i18n: e, category: a, pickerId: r, icon: o }) => `
<li class="${t.categoryTab}">
  <button
    aria-selected="false"
    role="tab"
    class="${t.categoryButton}"
    tabindex="-1"
    title="${e.get(`categories.${a.key}`, a.message || a.key)}"
    type="button"
    data-category="${a.key}"
    id="${r}-category-${a.key}"
  >
    <i data-icon="${o}"></i>
</li>
`), Et = ee(
  "categoryTab",
  "categoryTabActive",
  "categoryButton"
);
class Tc extends L {
  constructor({ category: e, icon: a }) {
    super({ template: $c, classes: Et }), this.isActive = !1, this.category = e, this.icon = a;
  }
  initialize() {
    this.uiElements = {
      button: L.byClass(Et.categoryButton)
    }, this.uiEvents = [
      L.childEvent("button", "click", this.selectCategory),
      L.childEvent("button", "focus", this.selectCategory)
    ], super.initialize();
  }
  renderSync() {
    return super.renderSync({
      category: this.category,
      icon: this.icon
    }), this.ui.button.ariaSelected = "false", this.el;
  }
  setActive(e, a = {}) {
    const { changeFocusable: r, performFocus: o, scroll: i } = {
      changeFocusable: !0,
      performFocus: !0,
      scroll: !0,
      ...a
    };
    this.el.classList.toggle(Et.categoryTabActive, e), r && (this.ui.button.tabIndex = e ? 0 : -1, this.ui.button.ariaSelected = e.toString()), e && o && (this.ui.button.focus(), i && this.events.emit("category:select", this.category.key, { scroll: "animate", focus: "button", performFocus: !1 })), this.isActive = e;
  }
  selectCategory() {
    this.isActive || this.events.emit("category:select", this.category.key, { scroll: "animate", focus: "button", performFocus: !0 });
  }
}
const Fc = new Q(({ classes: t }) => `
  <div class="${t.categoryButtonsContainer}">
    <ul role="tablist" class="${t.categoryButtons}">
      <div data-placeholder="tabs"></div>
    </ul>
  </div>
`), Pc = ee("categoryButtons", "categoryButtonsContainer");
class Rc extends L {
  constructor({ categories: e }) {
    super({ template: Fc, classes: Pc }), this.activeCategoryIndex = 0, this.categories = e;
  }
  initialize() {
    this.keyBindings = {
      ArrowLeft: this.stepSelectedTab(-1),
      ArrowRight: this.stepSelectedTab(1)
    }, this.uiEvents = [
      L.uiEvent("scroll", this.checkOverflow)
    ], super.initialize();
  }
  checkOverflow() {
    const e = Math.abs(this.el.scrollLeft - (this.el.scrollWidth - this.el.offsetWidth)) > 1, a = this.el.scrollLeft > 0;
    this.el.className = "categoryButtonsContainer", a && e ? this.el.classList.add("has-overflow-both") : a ? this.el.classList.add("has-overflow-left") : e && this.el.classList.add("has-overflow-right");
  }
  renderSync() {
    return this.tabViews = this.categories.map((e) => this.viewFactory.create(Tc, { category: e, icon: lt[e.key] })), super.renderSync({
      tabs: this.tabViews.map((e) => e.renderSync())
    }), this.el;
  }
  get currentCategory() {
    return this.categories[this.activeCategoryIndex];
  }
  get currentTabView() {
    return this.tabViews[this.activeCategoryIndex];
  }
  setActiveTab(e, a = {}) {
    this.checkOverflow();
    const r = this.currentTabView, o = this.tabViews[e];
    r.setActive(!1, a), o.setActive(!0, a), this.activeCategoryIndex = e;
  }
  getTargetCategory(e) {
    return e < 0 ? this.categories.length - 1 : e >= this.categories.length ? 0 : e;
  }
  stepSelectedTab(e) {
    return () => {
      const a = this.activeCategoryIndex + e;
      this.setActiveTab(this.getTargetCategory(a), {
        changeFocusable: !0,
        performFocus: !0
      });
    };
  }
}
const Ic = [
  { version: 15, emoji: String.fromCodePoint(129768) },
  { version: 14, emoji: String.fromCodePoint(128733) },
  { version: 13, emoji: String.fromCodePoint(129729) },
  { version: 12, emoji: String.fromCodePoint(129449) },
  { version: 11, emoji: String.fromCodePoint(129463) },
  { version: 5, emoji: String.fromCodePoint(129322) },
  { version: 4, emoji: String.fromCodePoint(9877) },
  { version: 3, emoji: String.fromCodePoint(129314) },
  { version: 2, emoji: String.fromCodePoint(128488) },
  { version: 1, emoji: String.fromCodePoint(128512) }
];
function qc() {
  var t;
  const e = Ic.find((a) => Oc(a.emoji));
  return (t = e == null ? void 0 : e.version) != null ? t : 1;
}
function Oc(t) {
  const e = document.createElement("canvas").getContext("2d");
  if (e)
    return e.textBaseline = "top", e.font = "32px Arial", e.fillText(t, 0, 0), e.getImageData(16, 16, 1, 1).data[0] !== 0;
}
function St(t, e) {
  return Array.from({ length: t }, () => e).join("");
}
function Dc({ showHeader: t, classes: e }) {
  return t ? `
    <header class="${e.header}">
      <div data-view="search"></div>
      <div data-view="categoryTabs" data-render="sync"></div>
    </header>
  ` : "";
}
function Mc(t) {
  const { classes: e, theme: a, className: r = "" } = t;
  return `
    <div class="picmo__picker ${e.picker} ${a} ${r}">
      ${Dc(t)}
      <div class="${e.content}">
        <div data-view="emojiArea"></div>
      </div>
      <div data-view="preview"></div>
    </div>
  `;
}
function Bc(t) {
  const { emojiCount: e, classes: a, theme: r, className: o, categoryCount: i } = t, l = ({ showSearch: h, classes: p }) => h ? `
    <div class="${p.searchSkeleton}">
      <div class="${p.searchInput} ${p.placeholder}"></div>
    </div>
  ` : "", d = ({ showCategoryTabs: h, classes: p }) => h ? `
    <div class="${p.categoryTabsSkeleton}">
      ${St(i, `<div class="${p.placeholder} ${p.categoryTab}"></div>`)}
    </div>
  ` : "", n = ({ showHeader: h, classes: p }) => h ? `
    <header class="${p.headerSkeleton}">
      ${l(t)}
      ${d(t)}
    </header>
  ` : "", f = ({ showPreview: h, classes: p }) => h ? `
    <div class="${p.previewSkeleton}">
      <div class="${p.placeholder} ${p.previewEmoji}"></div>
      <div class="${p.placeholder} ${p.previewName}"></div>
      <ul class="${p.tagList}">
        ${St(3, `<li class="${p.placeholder} ${p.tag}"></li>`)}
      </ul>
    </div>
  ` : "";
  return `
    <div class="picmo__picker ${a.skeleton} ${a.picker} ${r} ${o}">
      ${n(t)}
      <div class="${a.contentSkeleton}">
        <div class="${a.placeholder} ${a.categoryName}"></div>
        <div class="${a.emojiGrid}">
          ${St(e, `<div class="${a.placeholder} ${a.emoji}"></div>`)}
        </div>
      </div>
      ${f(t)}
    </div>
  `;
}
const Nc = new Q((t) => t.isLoaded ? Mc(t) : Bc(t)), ga = ee(
  "picker",
  "skeleton",
  "placeholder",
  "searchSkeleton",
  "searchInput",
  "categoryTabsSkeleton",
  "headerSkeleton",
  "categoryTab",
  "contentSkeleton",
  "categoryName",
  "emojiGrid",
  "emoji",
  "previewSkeleton",
  "previewEmoji",
  "previewName",
  "tagList",
  "tag",
  "overlay",
  "content",
  "fullHeight",
  "pluginContainer",
  "header"
), _a = {
  emojisPerRow: "--emojis-per-row",
  visibleRows: "--row-count",
  emojiSize: "--emoji-size"
};
class Hc extends L {
  constructor() {
    super({ template: Nc, classes: ga }), this.pickerReady = !1, this.externalEvents = new ac(), this.updaters = {
      styleProperty: (e) => (a) => this.el.style.setProperty(_a[e], a.toString()),
      theme: (e) => {
        const a = this.options.theme, r = this.el.closest(`.${a}`);
        this.el.classList.remove(a), r == null || r.classList.remove(a), this.el.classList.add(e), r == null || r.classList.add(e);
      },
      className: (e) => {
        this.options.className && this.el.classList.remove(this.options.className), this.el.classList.add(e);
      },
      emojisPerRow: this.updateStyleProperty.bind(this, "emojisPerRow"),
      emojiSize: this.updateStyleProperty.bind(this, "emojiSize"),
      visibleRows: this.updateStyleProperty.bind(this, "visibleRows")
    };
  }
  initialize() {
    this.uiElements = {
      pickerContent: L.byClass(ga.content),
      header: L.byClass(ga.header)
    }, this.uiEvents = [
      L.uiEvent("keydown", this.handleKeyDown)
    ], this.appEvents = {
      error: this.onError,
      reinitialize: this.reinitialize,
      "data:ready": this.onDataReady,
      "content:show": this.showContent,
      "variantPopup:hide": this.hideVariantPopup,
      "emoji:select": this.selectEmoji
    }, super.initialize(), this.options.recentsProvider;
  }
  destroy() {
    var e, a;
    super.destroy(), (e = this.search) == null || e.destroy(), this.emojiArea.destroy(), (a = this.categoryTabs) == null || a.destroy(), this.events.removeAll(), this.externalEvents.removeAll();
  }
  clearRecents() {
    this.options.recentsProvider.clear();
  }
  addEventListener(e, a) {
    this.externalEvents.on(e, a);
  }
  removeEventListener(e, a) {
    this.externalEvents.off(e, a);
  }
  initializePickerView() {
    this.pickerReady && (this.showContent(), this.emojiArea.reset(!1));
  }
  handleKeyDown(e) {
    const a = e.ctrlKey || e.metaKey;
    e.key === "s" && a && this.search && (e.preventDefault(), this.search.focus());
  }
  buildChildViews() {
    return this.options.showPreview && (this.preview = this.viewFactory.create(jc)), this.options.showSearch && (this.search = this.viewFactory.create(Sc, {
      categories: this.categories,
      emojiVersion: this.emojiVersion
    })), this.options.showCategoryTabs && (this.categoryTabs = this.viewFactory.create(Rc, {
      categories: this.categories
    })), this.currentView = this.emojiArea = this.viewFactory.create(mc, {
      categoryTabs: this.categoryTabs,
      categories: this.categories,
      emojiVersion: this.emojiVersion
    }), [this.preview, this.search, this.emojiArea, this.categoryTabs];
  }
  setStyleProperties() {
    this.options.showSearch || this.el.style.setProperty("--search-height-full", "0px"), this.options.showCategoryTabs || (this.el.style.setProperty("--category-tabs-height", "0px"), this.el.style.setProperty("--category-tabs-offset", "0px")), this.options.showPreview || this.el.style.setProperty("--emoji-preview-height-full", "0px"), Object.keys(_a).forEach((e) => {
      this.options[e] && this.el.style.setProperty(_a[e], this.options[e].toString());
    });
  }
  updateStyleProperty(e, a) {
    this.el.style.setProperty(_a[e], a.toString());
  }
  reinitialize() {
    this.renderSync();
  }
  onError(e) {
    const a = this.viewFactory.createWithOptions({ data: !1 }, vc, { message: this.i18n.get("error.load") }), r = this.el.offsetHeight || 375;
    throw this.el.style.height = `${r}px`, qe(this.el, a.renderSync()), e;
  }
  async onDataReady(e) {
    const a = this.el;
    try {
      e ? this.emojiData = e : await this.emojiDataPromise, this.options.emojiVersion === "auto" ? this.emojiVersion = qc() || parseFloat(ts) : this.emojiVersion = this.options.emojiVersion, this.categories = await this.emojiData.getCategories(this.options);
      const [r, o, i, l] = this.buildChildViews();
      await super.render({
        isLoaded: !0,
        search: o,
        categoryTabs: l,
        emojiArea: i,
        preview: r,
        showHeader: !!(this.search || this.categoryTabs),
        theme: this.options.theme,
        className: this.options.className
      }), this.el.style.setProperty("--category-count", this.categories.length.toString()), this.pickerReady = !0, a.replaceWith(this.el), this.setStyleProperties(), this.initializePickerView(), this.setInitialFocus(), this.externalEvents.emit("data:ready");
    } catch (r) {
      this.events.emit("error", r);
    }
  }
  renderSync() {
    var e;
    let a = ((e = this.options.categories) == null ? void 0 : e.length) || 10;
    if (this.options.showRecents && (a += 1), super.renderSync({
      isLoaded: !1,
      theme: this.options.theme,
      className: this.options.className,
      showSearch: this.options.showSearch,
      showPreview: this.options.showPreview,
      showCategoryTabs: this.options.showCategoryTabs,
      showHeader: this.options.showSearch || this.options.showCategoryTabs,
      emojiCount: this.options.emojisPerRow * this.options.visibleRows,
      categoryCount: a
    }), this.el.style.setProperty("--category-count", a.toString()), !this.options.rootElement)
      throw new Error("Picker must be given a root element via the rootElement option");
    return qe(this.options.rootElement, this.el), this.setStyleProperties(), this.pickerReady && this.initializePickerView(), this.el;
  }
  getInitialFocusTarget() {
    if (typeof this.options.autoFocus < "u")
      switch (this.options.autoFocus) {
        case "emojis":
          return this.emojiArea.focusableEmoji;
        case "search":
          return this.search;
        case "auto":
          return this.search || this.emojiArea.focusableEmoji;
        default:
          return null;
      }
    if (this.options.autoFocusSearch === !0)
      return console.warn("options.autoFocusSearch is deprecated, please use options.focusTarget instead"), this.search;
  }
  setInitialFocus() {
    var e;
    !this.pickerReady || (e = this.getInitialFocusTarget()) == null || e.focus();
  }
  reset(e = !0) {
    var a;
    this.pickerReady && (this.emojiArea.reset(e), this.showContent(this.emojiArea)), (a = this.search) == null || a.clear(), this.hideVariantPopup();
  }
  showContent(e = this.emojiArea) {
    var a, r;
    e !== this.currentView && (this.currentView !== this.emojiArea && ((a = this.currentView) == null || a.destroy()), this.ui.pickerContent.classList.toggle(ga.fullHeight, e !== this.emojiArea), qe(this.ui.pickerContent, e.el), this.currentView = e, e === this.emojiArea ? (this.emojiArea.reset(), this.categoryTabs && this.ui.header.appendChild(this.categoryTabs.el)) : (r = this.categoryTabs) == null || r.el.remove());
  }
  hideVariantPopup() {
    var e;
    (e = this.variantPopup) == null || e.destroy();
  }
  isPickerClick(e) {
    var a, r;
    const o = e.target, i = this.el.contains(o), l = (r = (a = this.variantPopup) == null ? void 0 : a.el) == null ? void 0 : r.contains(o);
    return i || l;
  }
  async selectEmoji({ emoji: e }) {
    var a, r;
    (a = e.skins) != null && a.length && this.options.showVariants && !this.isVariantPopupOpen ? this.showVariantPopup(e) : (await ((r = this.variantPopup) == null ? void 0 : r.animateHide()), this.events.emit("variantPopup:hide"), await this.emitEmoji(e));
  }
  get isVariantPopupOpen() {
    return this.variantPopup && !this.variantPopup.isDestroyed;
  }
  async showVariantPopup(e) {
    const a = document.activeElement;
    this.events.once("variantPopup:hide", () => {
      a == null || a.focus();
    }), this.variantPopup = this.viewFactory.create(Lc, { emoji: e, parent: this.el }), this.el.appendChild(this.variantPopup.renderSync()), this.variantPopup.activate();
  }
  async emitEmoji(e) {
    this.externalEvents.emit("emoji:select", await this.renderer.doEmit(e)), this.options.recentsProvider.addOrUpdateRecent(e, this.options.maxRecents), this.events.emit("recent:add", e);
  }
  updateOptions(e) {
    Object.keys(e).forEach((a) => {
      this.updaters[a](e[a]);
    }), Object.assign(this.options, e);
  }
}
class Uc {
  constructor({ events: e, i18n: a, renderer: r, emojiData: o, options: i, customEmojis: l = [], pickerId: d }) {
    this.events = e, this.i18n = a, this.renderer = r, this.emojiData = o, this.options = i, this.customEmojis = l, this.pickerId = d;
  }
  setEmojiData(e) {
    this.emojiData = Promise.resolve(e);
  }
  createWithOptions(e = {}, a, ...r) {
    const o = new a(...r);
    return o.setPickerId(this.pickerId), o.setEvents(this.events), o.setI18n(this.i18n), o.setRenderer(this.renderer), e.data !== !1 && o.setEmojiData(this.emojiData), o.setOptions(this.options), o.setCustomEmojis(this.customEmojis), o.viewFactory = this, o.initialize(), o;
  }
  create(e, ...a) {
    return this.createWithOptions({}, e, ...a);
  }
}
var Ea;
class Vc {
  constructor(e = {}) {
    _e(this, Ea, void 0), Rt(this, Ea, new Map(Object.entries(e)));
  }
  get(e, a = e) {
    return ue(this, Ea).get(e) || a;
  }
}
Ea = /* @__PURE__ */ new WeakMap();
function Wc(t, e) {
  e === void 0 && (e = {});
  var a = e.insertAt;
  if (!(!t || typeof document > "u")) {
    var r = document.head || document.getElementsByTagName("head")[0], o = document.createElement("style");
    o.type = "text/css", a === "top" && r.firstChild ? r.insertBefore(o, r.firstChild) : r.appendChild(o), o.styleSheet ? o.styleSheet.cssText = t : o.appendChild(document.createTextNode(t));
  }
}
function xo() {
  let t = !1;
  return function(e) {
    !t && (Wc(e), t = !0);
  };
}
const Kc = `.picmo__picker .picmo__icon{width:1.25em;height:1em;fill:currentColor}.picmo__icon-small{font-size:.8em}.picmo__icon-medium{font-size:1em}.picmo__icon-large{font-size:1.25em}.picmo__icon-2x{font-size:2em}.picmo__icon-3x{font-size:3em}.picmo__icon-4x{font-size:4em}.picmo__icon-5x{font-size:5em}.picmo__icon-8x{font-size:8em}.picmo__icon-10x{font-size:10em}.picmo__light,.picmo__auto{color-scheme:light;--accent-color: #4f46e5;--background-color: #f9fafb;--border-color: #cccccc;--category-name-background-color: #f9fafb;--category-name-button-color: #999999;--category-name-text-color: hsl(214, 30%, 50%);--category-tab-active-background-color: rgba(255, 255, 255, .6);--category-tab-active-color: var(--accent-color);--category-tab-color: #666;--category-tab-highlight-background-color: rgba(0, 0, 0, .15);--error-color-dark: hsl(0, 100%, 45%);--error-color: hsl(0, 100%, 40%);--focus-indicator-background-color: hsl(198, 65%, 85%);--focus-indicator-color: #333333;--hover-background-color: #c7d2fe;--placeholder-background-color: #cccccc;--search-background-color: #f9fafb;--search-focus-background-color: #ffffff;--search-icon-color: #999999;--search-placeholder-color: #71717a;--secondary-background-color: #e2e8f0;--secondary-text-color: #666666;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #000000;--variant-popup-background-color: #ffffff}.picmo__dark{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}@media (prefers-color-scheme: dark){.picmo__auto{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}}.picmo__picker .picmo__categoryButtonsContainer{overflow:auto;padding:2px 0}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-right{mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-left{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-both{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%)}.picmo__picker .picmo__categoryButtons{display:flex;flex-direction:row;gap:var(--tab-gap);margin:0;padding:0 .5em;align-items:center;height:var(--category-tabs-height);box-sizing:border-box;width:100%;justify-content:space-between;position:relative;list-style-type:none;justify-self:center;max-width:min(23.55rem,calc(var(--category-count, 1) * 2.5rem))}.picmo__picker .picmo__categoryButtons .picmo__categoryTab{display:flex;align-items:center;transition:all .1s;width:2em}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton{color:var(--category-tab-active-color);background:linear-gradient(rgba(255,255,255,.75) 0%,rgba(255,255,255,.75) 100%),linear-gradient(var(--category-tab-active-color) 0%,var(--category-tab-active-color) 100%);border:2px solid var(--category-tab-active-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton:hover{background-color:var(--category-tab-active-background-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton{border-radius:5px;background:transparent;border:2px solid transparent;color:var(--category-tab-color);cursor:pointer;padding:2px;vertical-align:middle;display:flex;align-items:center;justify-content:center;font-size:1.2rem;width:1.6em;height:1.6em;transition:all .1s}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:is(img){width:var(--category-tab-size);height:var(--category-tab-size)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:hover{background:var(--category-tab-highlight-background-color)}.picmo__dataError [data-icon]{opacity:.8}@keyframes appear{0%{opacity:0}to{opacity:.8}}@keyframes appear-grow{0%{opacity:0;transform:scale(.8)}to{opacity:.8;transform:scale(1)}}.picmo__picker .picmo__error{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--secondary-text-color)}.picmo__picker .picmo__error .picmo__iconContainer{opacity:.8;animation:appear-grow .25s cubic-bezier(.175,.885,.32,1.275);--color-primary: var(--error-color);--color-secondary: var(--error-color-dark)}.picmo__picker .picmo__error .picmo__title{animation:appear .25s;animation-delay:50ms;animation-fill-mode:both}.picmo__picker .picmo__error button{padding:8px 16px;cursor:pointer;background:var(--background-color);border:1px solid var(--text-color);border-radius:5px;color:var(--text-color)}.picmo__picker .picmo__error button:hover{background:var(--text-color);color:var(--background-color)}.picmo__emojiButton{background:transparent;border:none;border-radius:15px;cursor:pointer;display:flex;font-family:var(--emoji-font);font-size:var(--emoji-size);height:100%;justify-content:center;align-items:center;margin:0;overflow:hidden;padding:0;width:100%}.picmo__emojiButton:hover{background:var(--hover-background-color)}.picmo__emojiButton:focus{border-radius:0;background:var(--focus-indicator-background-color);outline:1px solid var(--focus-indicator-color)}.picmo__picker .picmo__emojiArea{height:var(--emoji-area-height);overflow-y:auto;position:relative}.picmo__picker .picmo__emojiCategory{position:relative}.picmo__picker .picmo__emojiCategory .picmo__categoryName{font-size:.9em;padding:.5rem;margin:0;background:var(--category-name-background-color);color:var(--category-name-text-color);top:0;z-index:1;display:grid;gap:4px;grid-template-columns:auto 1fr auto;align-items:center;line-height:1;box-sizing:border-box;height:var(--category-name-height);justify-content:flex-start;text-transform:uppercase}.picmo__picker .picmo__emojiCategory .picmo__categoryName button{background:transparent;border:none;display:flex;align-items:center;cursor:pointer;color:var(--category-name-button-color)}.picmo__picker .picmo__emojiCategory .picmo__categoryName button:hover{opacity:1}.picmo__picker .picmo__emojiCategory .picmo__noRecents{color:var(--secondary-text-color);grid-column:1 / span var(--emojis-per-row);font-size:.9em;text-align:center;display:flex;align-items:center;justify-content:center;min-height:calc(var(--emoji-size) * var(--emoji-size-multiplier))}.picmo__picker .picmo__emojiCategory .picmo__recentEmojis[data-empty=true]{display:none}:is(.picmo__picker .picmo__emojiCategory) .picmo__recentEmojis[data-empty=false]+div{display:none}.picmo__picker .picmo__emojiContainer{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center}.picmo__picker.picmo__picker{--border-radius: 5px;--emoji-area-height: calc( (var(--row-count) * var(--emoji-size) * var(--emoji-size-multiplier)) + var(--category-name-height) );--content-height: var(--emoji-area-height);--emojis-per-row: 8;--row-count: 6;--emoji-preview-margin: 4px;--emoji-preview-height: calc(var(--emoji-preview-size) + 1em + 1px);--emoji-preview-height-full: calc(var(--emoji-preview-height) + var(--emoji-preview-margin));--emoji-preview-size: 2.75em;--emoji-size: 2rem;--emoji-size-multiplier: 1.3;--content-margin: 8px;--category-tabs-height:calc(1.5em + 9px);--category-tabs-offset: 8px;--category-tab-size: 1.2rem;--category-name-height: 2rem;--category-name-padding-y: 6px;--search-height: 2em;--search-margin: .5em;--search-margin-bottom: 4px;--search-height-full: calc(var(--search-height) + var(--search-margin) + var(--search-margin-bottom));--overlay-background-color: rgba(0, 0, 0, .8);--emoji-font: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";--ui-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;--ui-font-size: 16px;--picker-width: calc(var(--emojis-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 2.75rem);--preview-background-color: var(--secondary-background-color);background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);font-size:var(--ui-font-size);overflow:hidden;position:relative;width:var(--picker-width);display:grid;gap:8px}.picmo__picker.picmo__picker>*{font-family:var(--ui-font)}.picmo__picker.picmo__skeleton{background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);width:var(--picker-width);color:var(--secondary-text-color)}.picmo__picker.picmo__skeleton *{box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__picker.picmo__skeleton .picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}.picmo__picker.picmo__skeleton .picmo__headerSkeleton{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:flex;flex-direction:column;overflow:hidden;gap:8px;border-bottom:1px solid var(--border-color);width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton{padding:0 8px;height:var(--search-height)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton .picmo__searchInput{width:100%;height:28px;border-radius:3px}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton{height:var(--category-tabs-height);display:flex;flex-direction:row;align-items:center;justify-self:center;width:calc(2rem * var(--category-count, 1))}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton .picmo__categoryTab{width:25px;height:25px;padding:2px;border-radius:5px;margin:.25em}.picmo__picker.picmo__skeleton .picmo__contentSkeleton{height:var(--content-height);padding-right:8px;opacity:.7}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__categoryName{width:50%;height:1rem;margin:.5rem;box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center;width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid .picmo__emoji{width:var(--emoji-size);height:var(--emoji-size);border-radius:50%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton{height:var(--emoji-preview-height);border-top:1px solid var(--border-color);display:grid;align-items:center;padding:.5em;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags"}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewEmoji{grid-area:emoji;border-radius:50%;width:var(--emoji-preview-size);height:var(--emoji-preview-size)}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewName{grid-area:name;height:.8em;width:80%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList .picmo__tag{border-radius:3px;padding:2px 8px;margin-right:.25em;height:1em;width:20%}.picmo__overlay{background:rgba(0,0,0,.75);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1000}.picmo__content{position:relative;overflow:hidden;height:var(--content-height)}.picmo__content.picmo__fullHeight{height:calc(var(--content-height) + var(--category-tabs-height) + var(--category-tabs-offset));overflow-y:auto}.picmo__pluginContainer{margin:.5em;display:flex;flex-direction:row}.picmo__header{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:grid;gap:8px;border-bottom:1px solid var(--border-color)}@media (prefers-reduced-motion: reduce){.picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__placeholder:after{display:none}}.picmo__picker .picmo__preview{border-top:1px solid var(--border-color);display:grid;align-items:center;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags";height:var(--emoji-preview-height);box-sizing:border-box;padding:.5em;position:relative;background:var(--preview-background-color)}.picmo__picker .picmo__preview .picmo__previewEmoji{grid-area:emoji;font-size:var(--emoji-preview-size);font-family:var(--emoji-font);width:1.25em;display:flex;align-items:center;justify-content:center}.picmo__picker .picmo__preview .picmo__previewName{grid-area:name;color:var(--text-color);font-size:.8em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.picmo__picker .picmo__preview .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0;font-size:.75em;overflow:hidden}.picmo__picker .picmo__preview .picmo__tag{border-radius:3px;background:var(--tag-background-color);color:var(--text-color);padding:2px 8px;margin-right:.25em;white-space:nowrap}.picmo__picker .picmo__preview .picmo__tag:last-child{margin-right:0}.picmo__picker .picmo__searchContainer{display:flex;height:var(--search-height);box-sizing:border-box;padding:0 8px;position:relative}.picmo__picker .picmo__searchContainer .picmo__searchField{background:var(--search-background-color);border-radius:3px;border:none;box-sizing:border-box;color:var(--text-color);font-size:.9em;outline:none;padding:.5em 2.25em .5em .5em;width:100%}.picmo__picker .picmo__searchContainer .picmo__searchField:focus{background:var(--search-focus-background-color)}.picmo__picker .picmo__searchContainer .picmo__searchField::placeholder{color:var(--search-placeholder-color)}.picmo__picker .picmo__searchContainer .picmo__searchAccessory{color:var(--search-icon-color);height:100%;position:absolute;right:1em;top:0;width:1.25rem;display:flex;align-items:center}.picmo__picker .picmo__searchContainer .picmo__searchAccessory svg{fill:var(--search-icon-color)}.picmo__picker .picmo__searchContainer .picmo__clearButton{border:0;color:var(--search-icon-color);background:transparent;cursor:pointer}.picmo__picker .picmo__searchContainer .picmo__clearSearchButton{cursor:pointer;border:none;background:transparent;color:var(--search-icon-color);font-size:1em;width:100%;height:100%;display:flex;align-items:center;padding:0}.picmo__picker .picmo__searchContainer .picmo__notFound [data-icon]{fill:#f3e265}.picmo__picker .picmo__variantOverlay{background:var(--overlay-background-color);border-radius:5px;display:flex;flex-direction:column;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:1}.picmo__picker .picmo__variantOverlay .picmo__variantPopup{background:var(--variant-popup-background-color);border-radius:5px;margin:.5em;padding:.5em;text-align:center;user-select:none;display:flex;align-items:center;justify-content:center}.picmo__customEmoji{width:1em;height:1em}@keyframes shine{to{transform:translate(100%)}}.picmo__picker .picmo__imagePlaceholder{width:2rem;height:2rem;border-radius:50%}.picmo__placeholder{background:#DDDBDD;position:relative}.picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}
`;
function Gc(t) {
  return uo(t.locale, t.dataStore, t.messages, t.emojiData);
}
let Xc = 0, ua;
function Qc() {
  return `picmo-${Date.now()}-${Xc++}`;
}
const Jc = xo();
function Yc(t) {
  Jc(Kc);
  const e = bo(t), a = ((e == null ? void 0 : e.custom) || []).map((l) => ({
    ...l,
    custom: !0,
    tags: ["custom", ...l.tags || []]
  })), r = new ec();
  ua || (ua = Gc(e));
  const o = new Vc(e.i18n);
  ua.then((l) => {
    r.emit("data:ready", l);
  }).catch((l) => {
    r.emit("error", l);
  });
  const i = new Uc({
    events: r,
    i18n: o,
    customEmojis: a,
    renderer: e.renderer,
    options: e,
    emojiData: ua,
    pickerId: Qc()
  }).create(Hc);
  return i.renderSync(), i;
}
function Fe(t) {
  return t.split("-")[0];
}
function Oe(t) {
  return t.split("-")[1];
}
function pt(t) {
  return ["top", "bottom"].includes(Fe(t)) ? "x" : "y";
}
function jo(t) {
  return t === "y" ? "height" : "width";
}
function Wr(t, e, a) {
  let {
    reference: r,
    floating: o
  } = t;
  const i = r.x + r.width / 2 - o.width / 2, l = r.y + r.height / 2 - o.height / 2, d = pt(e), n = jo(d), f = r[n] / 2 - o[n] / 2, h = Fe(e), p = d === "x";
  let c;
  switch (h) {
    case "top":
      c = {
        x: i,
        y: r.y - o.height
      };
      break;
    case "bottom":
      c = {
        x: i,
        y: r.y + r.height
      };
      break;
    case "right":
      c = {
        x: r.x + r.width,
        y: l
      };
      break;
    case "left":
      c = {
        x: r.x - o.width,
        y: l
      };
      break;
    default:
      c = {
        x: r.x,
        y: r.y
      };
  }
  switch (Oe(e)) {
    case "start":
      c[d] -= f * (a && p ? -1 : 1);
      break;
    case "end":
      c[d] += f * (a && p ? -1 : 1);
      break;
  }
  return c;
}
const Zc = async (t, e, a) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: l
  } = a, d = await (l.isRTL == null ? void 0 : l.isRTL(e));
  let n = await l.getElementRects({
    reference: t,
    floating: e,
    strategy: o
  }), {
    x: f,
    y: h
  } = Wr(n, r, d), p = r, c = {}, y = 0;
  for (let u = 0; u < i.length; u++) {
    const {
      name: m,
      fn: x
    } = i[u], {
      x: j,
      y: b,
      data: E,
      reset: w
    } = await x({
      x: f,
      y: h,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: c,
      rects: n,
      platform: l,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (f = j ?? f, h = b ?? h, c = {
      ...c,
      [m]: {
        ...c[m],
        ...E
      }
    }, w && y <= 50) {
      y++, typeof w == "object" && (w.placement && (p = w.placement), w.rects && (n = w.rects === !0 ? await l.getElementRects({
        reference: t,
        floating: e,
        strategy: o
      }) : w.rects), {
        x: f,
        y: h
      } = Wr(n, p, d)), u = -1;
      continue;
    }
  }
  return {
    x: f,
    y: h,
    placement: p,
    strategy: o,
    middlewareData: c
  };
};
function ei(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ai(t) {
  return typeof t != "number" ? ei(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Ta(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function pr(t, e) {
  var a;
  e === void 0 && (e = {});
  const {
    x: r,
    y: o,
    platform: i,
    rects: l,
    elements: d,
    strategy: n
  } = t, {
    boundary: f = "clippingAncestors",
    rootBoundary: h = "viewport",
    elementContext: p = "floating",
    altBoundary: c = !1,
    padding: y = 0
  } = e, u = ai(y), m = d[c ? p === "floating" ? "reference" : "floating" : p], x = Ta(await i.getClippingRect({
    element: (a = await (i.isElement == null ? void 0 : i.isElement(m))) == null || a ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(d.floating)),
    boundary: f,
    rootBoundary: h,
    strategy: n
  })), j = Ta(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: p === "floating" ? {
      ...l.floating,
      x: r,
      y: o
    } : l.reference,
    offsetParent: await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d.floating)),
    strategy: n
  }) : l[p]);
  return {
    top: x.top - j.top + u.top,
    bottom: j.bottom - x.bottom + u.bottom,
    left: x.left - j.left + u.left,
    right: j.right - x.right + u.right
  };
}
const ti = Math.min, ri = Math.max;
function Kr(t, e, a) {
  return ri(t, ti(e, a));
}
const oi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Fa(t) {
  return t.replace(/left|right|bottom|top/g, (e) => oi[e]);
}
function Co(t, e, a) {
  a === void 0 && (a = !1);
  const r = Oe(t), o = pt(t), i = jo(o);
  let l = o === "x" ? r === (a ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[i] > e.floating[i] && (l = Fa(l)), {
    main: l,
    cross: Fa(l)
  };
}
const si = {
  start: "end",
  end: "start"
};
function Ut(t) {
  return t.replace(/start|end/g, (e) => si[e]);
}
const ci = ["top", "right", "bottom", "left"], ii = /* @__PURE__ */ ci.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []);
function ni(t, e, a) {
  return (t ? [...a.filter((r) => Oe(r) === t), ...a.filter((r) => Oe(r) !== t)] : a.filter((r) => Fe(r) === r)).filter((r) => t ? Oe(r) === t || (e ? Ut(r) !== r : !1) : !0);
}
const li = function(t) {
  return t === void 0 && (t = {}), {
    name: "autoPlacement",
    options: t,
    async fn(e) {
      var a, r, o, i, l;
      const {
        x: d,
        y: n,
        rects: f,
        middlewareData: h,
        placement: p,
        platform: c,
        elements: y
      } = e, {
        alignment: u = null,
        allowedPlacements: m = ii,
        autoAlignment: x = !0,
        ...j
      } = t, b = ni(u, x, m), E = await pr(e, j), w = (a = (r = h.autoPlacement) == null ? void 0 : r.index) != null ? a : 0, g = b[w];
      if (g == null)
        return {};
      const {
        main: s,
        cross: _
      } = Co(g, f, await (c.isRTL == null ? void 0 : c.isRTL(y.floating)));
      if (p !== g)
        return {
          x: d,
          y: n,
          reset: {
            placement: b[0]
          }
        };
      const v = [E[Fe(g)], E[s], E[_]], $ = [...(o = (i = h.autoPlacement) == null ? void 0 : i.overflows) != null ? o : [], {
        placement: g,
        overflows: v
      }], C = b[w + 1];
      if (C)
        return {
          data: {
            index: w + 1,
            overflows: $
          },
          reset: {
            placement: C
          }
        };
      const F = $.slice().sort((O, D) => O.overflows[0] - D.overflows[0]), q = (l = F.find((O) => {
        let {
          overflows: D
        } = O;
        return D.every((K) => K <= 0);
      })) == null ? void 0 : l.placement, A = q ?? F[0].placement;
      return A !== p ? {
        data: {
          index: w + 1,
          overflows: $
        },
        reset: {
          placement: A
        }
      } : {};
    }
  };
};
function di(t) {
  const e = Fa(t);
  return [Ut(t), e, Ut(e)];
}
const pi = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var a;
      const {
        placement: r,
        middlewareData: o,
        rects: i,
        initialPlacement: l,
        platform: d,
        elements: n
      } = e, {
        mainAxis: f = !0,
        crossAxis: h = !0,
        fallbackPlacements: p,
        fallbackStrategy: c = "bestFit",
        flipAlignment: y = !0,
        ...u
      } = t, m = Fe(r), x = p || (m === l || !y ? [Fa(l)] : di(l)), j = [l, ...x], b = await pr(e, u), E = [];
      let w = ((a = o.flip) == null ? void 0 : a.overflows) || [];
      if (f && E.push(b[m]), h) {
        const {
          main: v,
          cross: $
        } = Co(r, i, await (d.isRTL == null ? void 0 : d.isRTL(n.floating)));
        E.push(b[v], b[$]);
      }
      if (w = [...w, {
        placement: r,
        overflows: E
      }], !E.every((v) => v <= 0)) {
        var g, s;
        const v = ((g = (s = o.flip) == null ? void 0 : s.index) != null ? g : 0) + 1, $ = j[v];
        if ($)
          return {
            data: {
              index: v,
              overflows: w
            },
            reset: {
              placement: $
            }
          };
        let C = "bottom";
        switch (c) {
          case "bestFit": {
            var _;
            const F = (_ = w.map((q) => [q, q.overflows.filter((A) => A > 0).reduce((A, O) => A + O, 0)]).sort((q, A) => q[1] - A[1])[0]) == null ? void 0 : _[0].placement;
            F && (C = F);
            break;
          }
          case "initialPlacement":
            C = l;
            break;
        }
        if (r !== C)
          return {
            reset: {
              placement: C
            }
          };
      }
      return {};
    }
  };
};
async function fi(t, e) {
  const {
    placement: a,
    platform: r,
    elements: o
  } = t, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), l = Fe(a), d = Oe(a), n = pt(a) === "x", f = ["left", "top"].includes(l) ? -1 : 1, h = i && n ? -1 : 1, p = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: c,
    crossAxis: y,
    alignmentAxis: u
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...p
  };
  return d && typeof u == "number" && (y = d === "end" ? u * -1 : u), n ? {
    x: y * h,
    y: c * f
  } : {
    x: c * f,
    y: y * h
  };
}
const Gr = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: a,
        y: r
      } = e, o = await fi(e, t);
      return {
        x: a + o.x,
        y: r + o.y,
        data: o
      };
    }
  };
};
function hi(t) {
  return t === "x" ? "y" : "x";
}
const Xr = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: a,
        y: r,
        placement: o
      } = e, {
        mainAxis: i = !0,
        crossAxis: l = !1,
        limiter: d = {
          fn: (x) => {
            let {
              x: j,
              y: b
            } = x;
            return {
              x: j,
              y: b
            };
          }
        },
        ...n
      } = t, f = {
        x: a,
        y: r
      }, h = await pr(e, n), p = pt(Fe(o)), c = hi(p);
      let y = f[p], u = f[c];
      if (i) {
        const x = p === "y" ? "top" : "left", j = p === "y" ? "bottom" : "right", b = y + h[x], E = y - h[j];
        y = Kr(b, y, E);
      }
      if (l) {
        const x = c === "y" ? "top" : "left", j = c === "y" ? "bottom" : "right", b = u + h[x], E = u - h[j];
        u = Kr(b, u, E);
      }
      const m = d.fn({
        ...e,
        [p]: y,
        [c]: u
      });
      return {
        ...m,
        data: {
          x: m.x - a,
          y: m.y - r
        }
      };
    }
  };
};
function Eo(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function we(t) {
  if (t == null)
    return window;
  if (!Eo(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function pe(t) {
  return we(t).getComputedStyle(t);
}
function me(t) {
  return Eo(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function So() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function fe(t) {
  return t instanceof we(t).HTMLElement;
}
function je(t) {
  return t instanceof we(t).Element;
}
function yi(t) {
  return t instanceof we(t).Node;
}
function De(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = we(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function ft(t) {
  const {
    overflow: e,
    overflowX: a,
    overflowY: r
  } = pe(t);
  return /auto|scroll|overlay|hidden/.test(e + r + a);
}
function gi(t) {
  return ["table", "td", "th"].includes(me(t));
}
function Ao(t) {
  const e = /firefox/i.test(So()), a = pe(t);
  return a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].includes(a.willChange) || e && a.willChange === "filter" || e && (a.filter ? a.filter !== "none" : !1);
}
function Lo() {
  return !/^((?!chrome|android).)*safari/i.test(So());
}
const Qr = Math.min, ea = Math.max, Pa = Math.round;
function ke(t, e, a) {
  var r, o, i, l;
  e === void 0 && (e = !1), a === void 0 && (a = !1);
  const d = t.getBoundingClientRect();
  let n = 1, f = 1;
  e && fe(t) && (n = t.offsetWidth > 0 && Pa(d.width) / t.offsetWidth || 1, f = t.offsetHeight > 0 && Pa(d.height) / t.offsetHeight || 1);
  const h = je(t) ? we(t) : window, p = !Lo() && a, c = (d.left + (p && (r = (o = h.visualViewport) == null ? void 0 : o.offsetLeft) != null ? r : 0)) / n, y = (d.top + (p && (i = (l = h.visualViewport) == null ? void 0 : l.offsetTop) != null ? i : 0)) / f, u = d.width / n, m = d.height / f;
  return {
    width: u,
    height: m,
    top: y,
    right: c + u,
    bottom: y + m,
    left: c,
    x: c,
    y
  };
}
function Ce(t) {
  return ((yi(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function ht(t) {
  return je(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function $o(t) {
  return ke(Ce(t)).left + ht(t).scrollLeft;
}
function _i(t) {
  const e = ke(t);
  return Pa(e.width) !== t.offsetWidth || Pa(e.height) !== t.offsetHeight;
}
function ui(t, e, a) {
  const r = fe(e), o = Ce(e), i = ke(
    t,
    r && _i(e),
    a === "fixed"
  );
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = {
    x: 0,
    y: 0
  };
  if (r || !r && a !== "fixed")
    if ((me(e) !== "body" || ft(o)) && (l = ht(e)), fe(e)) {
      const n = ke(e, !0);
      d.x = n.x + e.clientLeft, d.y = n.y + e.clientTop;
    } else
      o && (d.x = $o(o));
  return {
    x: i.left + l.scrollLeft - d.x,
    y: i.top + l.scrollTop - d.y,
    width: i.width,
    height: i.height
  };
}
function To(t) {
  return me(t) === "html" ? t : t.assignedSlot || t.parentNode || (De(t) ? t.host : null) || Ce(t);
}
function Jr(t) {
  return !fe(t) || pe(t).position === "fixed" ? null : mi(t);
}
function mi(t) {
  let {
    offsetParent: e
  } = t, a = t, r = !1;
  for (; a && a !== e; ) {
    const {
      assignedSlot: o
    } = a;
    if (o) {
      let i = o.offsetParent;
      if (pe(o).display === "contents") {
        const l = o.hasAttribute("style"), d = o.style.display;
        o.style.display = pe(a).display, i = o.offsetParent, o.style.display = d, l || o.removeAttribute("style");
      }
      a = o, e !== i && (e = i, r = !0);
    } else if (De(a) && a.host && r)
      break;
    a = De(a) && a.host || a.parentNode;
  }
  return e;
}
function ki(t) {
  let e = To(t);
  for (De(e) && (e = e.host); fe(e) && !["html", "body"].includes(me(e)); ) {
    if (Ao(e))
      return e;
    {
      const a = e.parentNode;
      e = De(a) ? a.host : a;
    }
  }
  return null;
}
function Vt(t) {
  const e = we(t);
  let a = Jr(t);
  for (; a && gi(a) && pe(a).position === "static"; )
    a = Jr(a);
  return a && (me(a) === "html" || me(a) === "body" && pe(a).position === "static" && !Ao(a)) ? e : a || ki(t) || e;
}
function Yr(t) {
  if (fe(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = ke(t);
  return {
    width: e.width,
    height: e.height
  };
}
function wi(t) {
  let {
    rect: e,
    offsetParent: a,
    strategy: r
  } = t;
  const o = fe(a), i = Ce(a);
  if (a === i)
    return e;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = {
    x: 0,
    y: 0
  };
  if ((o || !o && r !== "fixed") && ((me(a) !== "body" || ft(i)) && (l = ht(a)), fe(a))) {
    const n = ke(a, !0);
    d.x = n.x + a.clientLeft, d.y = n.y + a.clientTop;
  }
  return {
    ...e,
    x: e.x - l.scrollLeft + d.x,
    y: e.y - l.scrollTop + d.y
  };
}
function bi(t, e) {
  const a = we(t), r = Ce(t), o = a.visualViewport;
  let i = r.clientWidth, l = r.clientHeight, d = 0, n = 0;
  if (o) {
    i = o.width, l = o.height;
    const f = Lo();
    (f || !f && e === "fixed") && (d = o.offsetLeft, n = o.offsetTop);
  }
  return {
    width: i,
    height: l,
    x: d,
    y: n
  };
}
function vi(t) {
  var e;
  const a = Ce(t), r = ht(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, i = ea(a.scrollWidth, a.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), l = ea(a.scrollHeight, a.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0);
  let d = -r.scrollLeft + $o(t);
  const n = -r.scrollTop;
  return pe(o || a).direction === "rtl" && (d += ea(a.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: l,
    x: d,
    y: n
  };
}
function Fo(t) {
  const e = To(t);
  return ["html", "body", "#document"].includes(me(e)) ? t.ownerDocument.body : fe(e) && ft(e) ? e : Fo(e);
}
function Ra(t, e) {
  var a;
  e === void 0 && (e = []);
  const r = Fo(t), o = r === ((a = t.ownerDocument) == null ? void 0 : a.body), i = we(r), l = o ? [i].concat(i.visualViewport || [], ft(r) ? r : []) : r, d = e.concat(l);
  return o ? d : d.concat(Ra(l));
}
function zi(t, e) {
  const a = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (a && De(a)) {
    let r = e;
    do {
      if (r && t === r)
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function xi(t, e) {
  const a = ke(t, !1, e === "fixed"), r = a.top + t.clientTop, o = a.left + t.clientLeft;
  return {
    top: r,
    left: o,
    x: o,
    y: r,
    right: o + t.clientWidth,
    bottom: r + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight
  };
}
function Zr(t, e, a) {
  return e === "viewport" ? Ta(bi(t, a)) : je(e) ? xi(e, a) : Ta(vi(Ce(t)));
}
function ji(t) {
  const e = Ra(t), a = ["absolute", "fixed"].includes(pe(t).position) && fe(t) ? Vt(t) : t;
  return je(a) ? e.filter((r) => je(r) && zi(r, a) && me(r) !== "body") : [];
}
function Ci(t) {
  let {
    element: e,
    boundary: a,
    rootBoundary: r,
    strategy: o
  } = t;
  const i = [...a === "clippingAncestors" ? ji(e) : [].concat(a), r], l = i[0], d = i.reduce((n, f) => {
    const h = Zr(e, f, o);
    return n.top = ea(h.top, n.top), n.right = Qr(h.right, n.right), n.bottom = Qr(h.bottom, n.bottom), n.left = ea(h.left, n.left), n;
  }, Zr(e, l, o));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
const Ei = {
  getClippingRect: Ci,
  convertOffsetParentRelativeRectToViewportRelativeRect: wi,
  isElement: je,
  getDimensions: Yr,
  getOffsetParent: Vt,
  getDocumentElement: Ce,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: a,
      strategy: r
    } = t;
    return {
      reference: ui(e, Vt(a), r),
      floating: {
        ...Yr(a),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => pe(t).direction === "rtl"
};
function Si(t, e, a, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: l = !0,
    animationFrame: d = !1
  } = r, n = o && !d, f = i && !d, h = n || f ? [...je(t) ? Ra(t) : [], ...Ra(e)] : [];
  h.forEach((m) => {
    n && m.addEventListener("scroll", a, {
      passive: !0
    }), f && m.addEventListener("resize", a);
  });
  let p = null;
  if (l) {
    let m = !0;
    p = new ResizeObserver(() => {
      m || a(), m = !1;
    }), je(t) && !d && p.observe(t), p.observe(e);
  }
  let c, y = d ? ke(t) : null;
  d && u();
  function u() {
    const m = ke(t);
    y && (m.x !== y.x || m.y !== y.y || m.width !== y.width || m.height !== y.height) && a(), y = m, c = requestAnimationFrame(u);
  }
  return a(), () => {
    var m;
    h.forEach((x) => {
      n && x.removeEventListener("scroll", a), f && x.removeEventListener("resize", a);
    }), (m = p) == null || m.disconnect(), p = null, d && cancelAnimationFrame(c);
  };
}
const Ai = (t, e, a) => Zc(t, e, {
  platform: Ei,
  ...a
});
async function Li(t, e, a, r) {
  if (!r)
    throw new Error("Must provide a positioning option");
  return await (typeof r == "string" ? $i(t, e, a, r) : Ti(e, r));
}
async function $i(t, e, a, r) {
  if (!a)
    throw new Error("Reference element is required for relative positioning");
  let o;
  return r === "auto" ? o = {
    middleware: [
      li(),
      Xr(),
      Gr({ mainAxis: 5, crossAxis: 12 })
    ]
  } : o = {
    placement: r,
    middleware: [
      pi(),
      Xr(),
      Gr(5)
    ]
  }, Si(a, e, async () => {
    if ((!a.isConnected || !a.offsetParent) && Fi(t))
      return;
    const { x: i, y: l } = await Ai(a, e, o);
    Object.assign(e.style, {
      position: "absolute",
      left: `${i}px`,
      top: `${l}px`
    });
  });
}
function Ti(t, e) {
  return t.style.position = "fixed", Object.entries(e).forEach(([a, r]) => {
    t.style[a] = r;
  }), () => {
  };
}
function Fi(t) {
  switch (t.options.onPositionLost) {
    case "close":
      return t.close(), !0;
    case "destroy":
      return t.destroy(), !0;
    case "hold":
      return !0;
  }
}
const Pi = {
  hideOnClickOutside: !0,
  hideOnEmojiSelect: !0,
  hideOnEscape: !0,
  position: "auto",
  showCloseButton: !0,
  onPositionLost: "none"
};
function Ri(t = {}) {
  return {
    ...Pi,
    rootElement: document.body,
    ...t
  };
}
const Ii = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>', eo = ee(
  "popupContainer",
  "closeButton"
);
class qi {
  constructor(e, a) {
    this.isOpen = !1, this.externalEvents = new dt(), this.options = { ...Ri(a), ...bo(e) }, this.popupEl = document.createElement("div"), this.popupEl.classList.add(eo.popupContainer), this.popupEl.classList.add(this.options.theme), a.className && this.popupEl.classList.add(a.className), this.options.showCloseButton && (this.closeButton = document.createElement("button"), this.closeButton.type = "button", this.closeButton.classList.add(eo.closeButton), this.closeButton.innerHTML = Ii, this.closeButton.addEventListener("click", () => {
      this.close();
    }), this.popupEl.appendChild(this.closeButton));
    const r = document.createElement("div");
    this.popupEl.appendChild(r), this.picker = Yc({ ...this.options, rootElement: r }), this.focusTrap = new mo(), this.picker.addEventListener("data:ready", () => {
      this.focusTrap.activate(this.picker.el), this.picker.setInitialFocus();
    }), this.options.hideOnEmojiSelect && this.picker.addEventListener("emoji:select", () => {
      var o;
      this.close(), (o = this.triggerElement) == null || o.focus();
    }), this.options.hideOnClickOutside && (this.onDocumentClick = this.onDocumentClick.bind(this), document.addEventListener("click", this.onDocumentClick)), this.options.hideOnEscape && (this.handleKeydown = this.handleKeydown.bind(this), this.popupEl.addEventListener("keydown", this.handleKeydown)), this.referenceElement = this.options.referenceElement, this.triggerElement = this.options.triggerElement;
  }
  addEventListener(e, a) {
    this.externalEvents.on(e, a), this.picker.addEventListener(e, a);
  }
  removeEventListener(e, a) {
    this.externalEvents.off(e, a), this.picker.removeEventListener(e, a);
  }
  handleKeydown(e) {
    var a;
    e.key === "Escape" && (this.close(), (a = this.triggerElement) == null || a.focus());
  }
  async destroy() {
    this.isOpen && await this.close(), document.removeEventListener("click", this.onDocumentClick), this.picker.destroy(), this.externalEvents.removeAll();
  }
  toggle(e) {
    return this.isOpen ? this.close() : this.open(e);
  }
  async open({ triggerElement: e, referenceElement: a } = {}) {
    this.isOpen || (e && (this.triggerElement = e), a && (this.referenceElement = a), await this.initiateOpenStateChange(!0), this.popupEl.style.opacity = "0", this.options.rootElement.appendChild(this.popupEl), await this.setPosition(), this.picker.reset(!1), await this.animatePopup(!0), await this.animateCloseButton(!0), this.picker.setInitialFocus(), this.externalEvents.emit("picker:open"));
  }
  async close() {
    var e;
    !this.isOpen || (await this.initiateOpenStateChange(!1), await this.animateCloseButton(!1), await this.animatePopup(!1), this.popupEl.remove(), this.picker.reset(), (e = this.positionCleanup) == null || e.call(this), this.focusTrap.deactivate(), this.externalEvents.emit("picker:close"));
  }
  getRunningAnimations() {
    return this.picker.el.getAnimations().filter((e) => e.playState === "running");
  }
  async setPosition() {
    var e;
    (e = this.positionCleanup) == null || e.call(this), this.positionCleanup = await Li(
      this,
      this.popupEl,
      this.referenceElement,
      this.options.position
    );
  }
  awaitPendingAnimations() {
    return Promise.all(this.getRunningAnimations().map((e) => e.finished));
  }
  onDocumentClick(e) {
    var a;
    const r = e.target, o = (a = this.triggerElement) == null ? void 0 : a.contains(r);
    this.isOpen && !this.picker.isPickerClick(e) && !o && this.close();
  }
  animatePopup(e) {
    return Ie(
      this.popupEl,
      {
        opacity: [0, 1],
        transform: ["scale(0.9)", "scale(1)"]
      },
      {
        duration: 150,
        id: e ? "show-picker" : "hide-picker",
        easing: "ease-in-out",
        direction: e ? "normal" : "reverse",
        fill: "both"
      },
      this.options
    );
  }
  animateCloseButton(e) {
    if (this.closeButton)
      return Ie(
        this.closeButton,
        {
          opacity: [0, 1]
        },
        {
          duration: 25,
          id: e ? "show-close" : "hide-close",
          easing: "ease-in-out",
          direction: e ? "normal" : "reverse",
          fill: "both"
        },
        this.options
      );
  }
  async initiateOpenStateChange(e) {
    this.isOpen = e, await this.awaitPendingAnimations();
  }
}
const Oi = `.picmo__popupContainer{display:flex;flex-direction:column;position:absolute}.picmo__popupContainer .picmo__closeButton{position:absolute;opacity:0;background:transparent;border:none;z-index:1;right:0;top:0;cursor:pointer;padding:4px;align-self:flex-end;transform:translate(50%,-50%);background:#999999;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%}.picmo__popupContainer .picmo__closeButton:hover{background:var(--accent-color)}.picmo__popupContainer .picmo__closeButton svg{fill:#fff;width:1.25rem;height:1.25rem}
`, Di = xo();
function Mi(t, e) {
  return Di(Oi), new qi({
    autoFocus: "auto",
    ...t
  }, e);
}
var Be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pa(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Bi(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var a = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    a.prototype = e.prototype;
  } else
    a = {};
  return Object.defineProperty(a, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(a, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), a;
}
var Wt = { exports: {} };
(function(t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  const a = [
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array"
  ];
  function r(s) {
    return a.includes(s);
  }
  const o = [
    "Function",
    "Generator",
    "AsyncGenerator",
    "GeneratorFunction",
    "AsyncGeneratorFunction",
    "AsyncFunction",
    "Observable",
    "Array",
    "Buffer",
    "Blob",
    "Object",
    "RegExp",
    "Date",
    "Error",
    "Map",
    "Set",
    "WeakMap",
    "WeakSet",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Promise",
    "URL",
    "FormData",
    "URLSearchParams",
    "HTMLElement",
    ...a
  ];
  function i(s) {
    return o.includes(s);
  }
  const l = [
    "null",
    "undefined",
    "string",
    "number",
    "bigint",
    "boolean",
    "symbol"
  ];
  function d(s) {
    return l.includes(s);
  }
  function n(s) {
    return (_) => typeof _ === s;
  }
  const { toString: f } = Object.prototype, h = (s) => {
    const _ = f.call(s).slice(8, -1);
    if (/HTML\w+Element/.test(_) && c.domElement(s))
      return "HTMLElement";
    if (i(_))
      return _;
  }, p = (s) => (_) => h(_) === s;
  function c(s) {
    if (s === null)
      return "null";
    switch (typeof s) {
      case "undefined":
        return "undefined";
      case "string":
        return "string";
      case "number":
        return "number";
      case "boolean":
        return "boolean";
      case "function":
        return "Function";
      case "bigint":
        return "bigint";
      case "symbol":
        return "symbol";
    }
    if (c.observable(s))
      return "Observable";
    if (c.array(s))
      return "Array";
    if (c.buffer(s))
      return "Buffer";
    const _ = h(s);
    if (_)
      return _;
    if (s instanceof String || s instanceof Boolean || s instanceof Number)
      throw new TypeError("Please don't use object wrappers for primitive types");
    return "Object";
  }
  c.undefined = n("undefined"), c.string = n("string");
  const y = n("number");
  c.number = (s) => y(s) && !c.nan(s), c.bigint = n("bigint"), c.function_ = n("function"), c.null_ = (s) => s === null, c.class_ = (s) => c.function_(s) && s.toString().startsWith("class "), c.boolean = (s) => s === !0 || s === !1, c.symbol = n("symbol"), c.numericString = (s) => c.string(s) && !c.emptyStringOrWhitespace(s) && !Number.isNaN(Number(s)), c.array = (s, _) => Array.isArray(s) ? c.function_(_) ? s.every(_) : !0 : !1, c.buffer = (s) => {
    var _, v, $, C;
    return (C = ($ = (v = (_ = s) === null || _ === void 0 ? void 0 : _.constructor) === null || v === void 0 ? void 0 : v.isBuffer) === null || $ === void 0 ? void 0 : $.call(v, s)) !== null && C !== void 0 ? C : !1;
  }, c.blob = (s) => p("Blob")(s), c.nullOrUndefined = (s) => c.null_(s) || c.undefined(s), c.object = (s) => !c.null_(s) && (typeof s == "object" || c.function_(s)), c.iterable = (s) => {
    var _;
    return c.function_((_ = s) === null || _ === void 0 ? void 0 : _[Symbol.iterator]);
  }, c.asyncIterable = (s) => {
    var _;
    return c.function_((_ = s) === null || _ === void 0 ? void 0 : _[Symbol.asyncIterator]);
  }, c.generator = (s) => {
    var _, v;
    return c.iterable(s) && c.function_((_ = s) === null || _ === void 0 ? void 0 : _.next) && c.function_((v = s) === null || v === void 0 ? void 0 : v.throw);
  }, c.asyncGenerator = (s) => c.asyncIterable(s) && c.function_(s.next) && c.function_(s.throw), c.nativePromise = (s) => p("Promise")(s);
  const u = (s) => {
    var _, v;
    return c.function_((_ = s) === null || _ === void 0 ? void 0 : _.then) && c.function_((v = s) === null || v === void 0 ? void 0 : v.catch);
  };
  c.promise = (s) => c.nativePromise(s) || u(s), c.generatorFunction = p("GeneratorFunction"), c.asyncGeneratorFunction = (s) => h(s) === "AsyncGeneratorFunction", c.asyncFunction = (s) => h(s) === "AsyncFunction", c.boundFunction = (s) => c.function_(s) && !s.hasOwnProperty("prototype"), c.regExp = p("RegExp"), c.date = p("Date"), c.error = p("Error"), c.map = (s) => p("Map")(s), c.set = (s) => p("Set")(s), c.weakMap = (s) => p("WeakMap")(s), c.weakSet = (s) => p("WeakSet")(s), c.int8Array = p("Int8Array"), c.uint8Array = p("Uint8Array"), c.uint8ClampedArray = p("Uint8ClampedArray"), c.int16Array = p("Int16Array"), c.uint16Array = p("Uint16Array"), c.int32Array = p("Int32Array"), c.uint32Array = p("Uint32Array"), c.float32Array = p("Float32Array"), c.float64Array = p("Float64Array"), c.bigInt64Array = p("BigInt64Array"), c.bigUint64Array = p("BigUint64Array"), c.arrayBuffer = p("ArrayBuffer"), c.sharedArrayBuffer = p("SharedArrayBuffer"), c.dataView = p("DataView"), c.enumCase = (s, _) => Object.values(_).includes(s), c.directInstanceOf = (s, _) => Object.getPrototypeOf(s) === _.prototype, c.urlInstance = (s) => p("URL")(s), c.urlString = (s) => {
    if (!c.string(s))
      return !1;
    try {
      return new URL(s), !0;
    } catch {
      return !1;
    }
  }, c.truthy = (s) => !!s, c.falsy = (s) => !s, c.nan = (s) => Number.isNaN(s), c.primitive = (s) => c.null_(s) || d(typeof s), c.integer = (s) => Number.isInteger(s), c.safeInteger = (s) => Number.isSafeInteger(s), c.plainObject = (s) => {
    if (f.call(s) !== "[object Object]")
      return !1;
    const _ = Object.getPrototypeOf(s);
    return _ === null || _ === Object.getPrototypeOf({});
  }, c.typedArray = (s) => r(h(s));
  const m = (s) => c.safeInteger(s) && s >= 0;
  c.arrayLike = (s) => !c.nullOrUndefined(s) && !c.function_(s) && m(s.length), c.inRange = (s, _) => {
    if (c.number(_))
      return s >= Math.min(0, _) && s <= Math.max(_, 0);
    if (c.array(_) && _.length === 2)
      return s >= Math.min(..._) && s <= Math.max(..._);
    throw new TypeError(`Invalid range: ${JSON.stringify(_)}`);
  };
  const x = 1, j = [
    "innerHTML",
    "ownerDocument",
    "style",
    "attributes",
    "nodeValue"
  ];
  c.domElement = (s) => c.object(s) && s.nodeType === x && c.string(s.nodeName) && !c.plainObject(s) && j.every((_) => _ in s), c.observable = (s) => {
    var _, v, $, C;
    return s ? s === ((v = (_ = s)[Symbol.observable]) === null || v === void 0 ? void 0 : v.call(_)) || s === ((C = ($ = s)["@@observable"]) === null || C === void 0 ? void 0 : C.call($)) : !1;
  }, c.nodeStream = (s) => c.object(s) && c.function_(s.pipe) && !c.observable(s), c.infinite = (s) => s === 1 / 0 || s === -1 / 0;
  const b = (s) => (_) => c.integer(_) && Math.abs(_ % 2) === s;
  c.evenInteger = b(0), c.oddInteger = b(1), c.emptyArray = (s) => c.array(s) && s.length === 0, c.nonEmptyArray = (s) => c.array(s) && s.length > 0, c.emptyString = (s) => c.string(s) && s.length === 0;
  const E = (s) => c.string(s) && !/\S/.test(s);
  c.emptyStringOrWhitespace = (s) => c.emptyString(s) || E(s), c.nonEmptyString = (s) => c.string(s) && s.length > 0, c.nonEmptyStringAndNotWhitespace = (s) => c.string(s) && !c.emptyStringOrWhitespace(s), c.emptyObject = (s) => c.object(s) && !c.map(s) && !c.set(s) && Object.keys(s).length === 0, c.nonEmptyObject = (s) => c.object(s) && !c.map(s) && !c.set(s) && Object.keys(s).length > 0, c.emptySet = (s) => c.set(s) && s.size === 0, c.nonEmptySet = (s) => c.set(s) && s.size > 0, c.emptyMap = (s) => c.map(s) && s.size === 0, c.nonEmptyMap = (s) => c.map(s) && s.size > 0, c.propertyKey = (s) => c.any([c.string, c.number, c.symbol], s), c.formData = (s) => p("FormData")(s), c.urlSearchParams = (s) => p("URLSearchParams")(s);
  const w = (s, _, v) => {
    if (!c.function_(_))
      throw new TypeError(`Invalid predicate: ${JSON.stringify(_)}`);
    if (v.length === 0)
      throw new TypeError("Invalid number of values");
    return s.call(v, _);
  };
  c.any = (s, ..._) => (c.array(s) ? s : [s]).some(($) => w(Array.prototype.some, $, _)), c.all = (s, ..._) => w(Array.prototype.every, s, _);
  const g = (s, _, v, $ = {}) => {
    if (!s) {
      const { multipleValues: C } = $, F = C ? `received values of types ${[
        ...new Set(v.map((q) => `\`${c(q)}\``))
      ].join(", ")}` : `received value of type \`${c(v)}\``;
      throw new TypeError(`Expected value which is \`${_}\`, ${F}.`);
    }
  };
  e.assert = {
    // Unknowns.
    undefined: (s) => g(c.undefined(s), "undefined", s),
    string: (s) => g(c.string(s), "string", s),
    number: (s) => g(c.number(s), "number", s),
    bigint: (s) => g(c.bigint(s), "bigint", s),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (s) => g(c.function_(s), "Function", s),
    null_: (s) => g(c.null_(s), "null", s),
    class_: (s) => g(c.class_(s), "Class", s),
    boolean: (s) => g(c.boolean(s), "boolean", s),
    symbol: (s) => g(c.symbol(s), "symbol", s),
    numericString: (s) => g(c.numericString(s), "string with a number", s),
    array: (s, _) => {
      g(c.array(s), "Array", s), _ && s.forEach(_);
    },
    buffer: (s) => g(c.buffer(s), "Buffer", s),
    blob: (s) => g(c.blob(s), "Blob", s),
    nullOrUndefined: (s) => g(c.nullOrUndefined(s), "null or undefined", s),
    object: (s) => g(c.object(s), "Object", s),
    iterable: (s) => g(c.iterable(s), "Iterable", s),
    asyncIterable: (s) => g(c.asyncIterable(s), "AsyncIterable", s),
    generator: (s) => g(c.generator(s), "Generator", s),
    asyncGenerator: (s) => g(c.asyncGenerator(s), "AsyncGenerator", s),
    nativePromise: (s) => g(c.nativePromise(s), "native Promise", s),
    promise: (s) => g(c.promise(s), "Promise", s),
    generatorFunction: (s) => g(c.generatorFunction(s), "GeneratorFunction", s),
    asyncGeneratorFunction: (s) => g(c.asyncGeneratorFunction(s), "AsyncGeneratorFunction", s),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (s) => g(c.asyncFunction(s), "AsyncFunction", s),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (s) => g(c.boundFunction(s), "Function", s),
    regExp: (s) => g(c.regExp(s), "RegExp", s),
    date: (s) => g(c.date(s), "Date", s),
    error: (s) => g(c.error(s), "Error", s),
    map: (s) => g(c.map(s), "Map", s),
    set: (s) => g(c.set(s), "Set", s),
    weakMap: (s) => g(c.weakMap(s), "WeakMap", s),
    weakSet: (s) => g(c.weakSet(s), "WeakSet", s),
    int8Array: (s) => g(c.int8Array(s), "Int8Array", s),
    uint8Array: (s) => g(c.uint8Array(s), "Uint8Array", s),
    uint8ClampedArray: (s) => g(c.uint8ClampedArray(s), "Uint8ClampedArray", s),
    int16Array: (s) => g(c.int16Array(s), "Int16Array", s),
    uint16Array: (s) => g(c.uint16Array(s), "Uint16Array", s),
    int32Array: (s) => g(c.int32Array(s), "Int32Array", s),
    uint32Array: (s) => g(c.uint32Array(s), "Uint32Array", s),
    float32Array: (s) => g(c.float32Array(s), "Float32Array", s),
    float64Array: (s) => g(c.float64Array(s), "Float64Array", s),
    bigInt64Array: (s) => g(c.bigInt64Array(s), "BigInt64Array", s),
    bigUint64Array: (s) => g(c.bigUint64Array(s), "BigUint64Array", s),
    arrayBuffer: (s) => g(c.arrayBuffer(s), "ArrayBuffer", s),
    sharedArrayBuffer: (s) => g(c.sharedArrayBuffer(s), "SharedArrayBuffer", s),
    dataView: (s) => g(c.dataView(s), "DataView", s),
    enumCase: (s, _) => g(c.enumCase(s, _), "EnumCase", s),
    urlInstance: (s) => g(c.urlInstance(s), "URL", s),
    urlString: (s) => g(c.urlString(s), "string with a URL", s),
    truthy: (s) => g(c.truthy(s), "truthy", s),
    falsy: (s) => g(c.falsy(s), "falsy", s),
    nan: (s) => g(c.nan(s), "NaN", s),
    primitive: (s) => g(c.primitive(s), "primitive", s),
    integer: (s) => g(c.integer(s), "integer", s),
    safeInteger: (s) => g(c.safeInteger(s), "integer", s),
    plainObject: (s) => g(c.plainObject(s), "plain object", s),
    typedArray: (s) => g(c.typedArray(s), "TypedArray", s),
    arrayLike: (s) => g(c.arrayLike(s), "array-like", s),
    domElement: (s) => g(c.domElement(s), "HTMLElement", s),
    observable: (s) => g(c.observable(s), "Observable", s),
    nodeStream: (s) => g(c.nodeStream(s), "Node.js Stream", s),
    infinite: (s) => g(c.infinite(s), "infinite number", s),
    emptyArray: (s) => g(c.emptyArray(s), "empty array", s),
    nonEmptyArray: (s) => g(c.nonEmptyArray(s), "non-empty array", s),
    emptyString: (s) => g(c.emptyString(s), "empty string", s),
    emptyStringOrWhitespace: (s) => g(c.emptyStringOrWhitespace(s), "empty string or whitespace", s),
    nonEmptyString: (s) => g(c.nonEmptyString(s), "non-empty string", s),
    nonEmptyStringAndNotWhitespace: (s) => g(c.nonEmptyStringAndNotWhitespace(s), "non-empty string and not whitespace", s),
    emptyObject: (s) => g(c.emptyObject(s), "empty object", s),
    nonEmptyObject: (s) => g(c.nonEmptyObject(s), "non-empty object", s),
    emptySet: (s) => g(c.emptySet(s), "empty set", s),
    nonEmptySet: (s) => g(c.nonEmptySet(s), "non-empty set", s),
    emptyMap: (s) => g(c.emptyMap(s), "empty map", s),
    nonEmptyMap: (s) => g(c.nonEmptyMap(s), "non-empty map", s),
    propertyKey: (s) => g(c.propertyKey(s), "PropertyKey", s),
    formData: (s) => g(c.formData(s), "FormData", s),
    urlSearchParams: (s) => g(c.urlSearchParams(s), "URLSearchParams", s),
    // Numbers.
    evenInteger: (s) => g(c.evenInteger(s), "even integer", s),
    oddInteger: (s) => g(c.oddInteger(s), "odd integer", s),
    // Two arguments.
    directInstanceOf: (s, _) => g(c.directInstanceOf(s, _), "T", s),
    inRange: (s, _) => g(c.inRange(s, _), "in range", s),
    // Variadic functions.
    any: (s, ..._) => g(c.any(s, ..._), "predicate returns truthy for any value", _, { multipleValues: !0 }),
    all: (s, ..._) => g(c.all(s, ..._), "predicate returns truthy for all values", _, { multipleValues: !0 })
  }, Object.defineProperties(c, {
    class: {
      value: c.class_
    },
    function: {
      value: c.function_
    },
    null: {
      value: c.null_
    }
  }), Object.defineProperties(e.assert, {
    class: {
      value: e.assert.class_
    },
    function: {
      value: e.assert.function_
    },
    null: {
      value: e.assert.null_
    }
  }), e.default = c, t.exports = c, t.exports.default = c, t.exports.assert = e.assert;
})(Wt, Wt.exports);
var Me = Wt.exports;
const Ge = /* @__PURE__ */ pa(Me), Ni = {
  keywords: [
    "face",
    "smile",
    "happy",
    "joy",
    ":D",
    "grin"
  ],
  char: "😀",
  fitzpatrick_scale: !1,
  category: "people"
}, Hi = {
  keywords: [
    "face",
    "grimace",
    "teeth"
  ],
  char: "😬",
  fitzpatrick_scale: !1,
  category: "people"
}, Ui = {
  keywords: [
    "face",
    "happy",
    "smile",
    "joy",
    "kawaii"
  ],
  char: "😁",
  fitzpatrick_scale: !1,
  category: "people"
}, Vi = {
  keywords: [
    "face",
    "cry",
    "tears",
    "weep",
    "happy",
    "happytears",
    "haha"
  ],
  char: "😂",
  fitzpatrick_scale: !1,
  category: "people"
}, Wi = {
  keywords: [
    "face",
    "rolling",
    "floor",
    "laughing",
    "lol",
    "haha"
  ],
  char: "🤣",
  fitzpatrick_scale: !1,
  category: "people"
}, Ki = {
  keywords: [
    "face",
    "celebration",
    "woohoo"
  ],
  char: "🥳",
  fitzpatrick_scale: !1,
  category: "people"
}, Gi = {
  keywords: [
    "face",
    "happy",
    "joy",
    "haha",
    ":D",
    ":)",
    "smile",
    "funny"
  ],
  char: "😃",
  fitzpatrick_scale: !1,
  category: "people"
}, Xi = {
  keywords: [
    "face",
    "happy",
    "joy",
    "funny",
    "haha",
    "laugh",
    "like",
    ":D",
    ":)"
  ],
  char: "😄",
  fitzpatrick_scale: !1,
  category: "people"
}, Qi = {
  keywords: [
    "face",
    "hot",
    "happy",
    "laugh",
    "sweat",
    "smile",
    "relief"
  ],
  char: "😅",
  fitzpatrick_scale: !1,
  category: "people"
}, Ji = {
  keywords: [
    "happy",
    "joy",
    "lol",
    "satisfied",
    "haha",
    "face",
    "glad",
    "XD",
    "laugh"
  ],
  char: "😆",
  fitzpatrick_scale: !1,
  category: "people"
}, Yi = {
  keywords: [
    "face",
    "angel",
    "heaven",
    "halo"
  ],
  char: "😇",
  fitzpatrick_scale: !1,
  category: "people"
}, Zi = {
  keywords: [
    "face",
    "happy",
    "mischievous",
    "secret",
    ";)",
    "smile",
    "eye"
  ],
  char: "😉",
  fitzpatrick_scale: !1,
  category: "people"
}, en = {
  keywords: [
    "face",
    "smile",
    "happy",
    "flushed",
    "crush",
    "embarrassed",
    "shy",
    "joy"
  ],
  char: "😊",
  fitzpatrick_scale: !1,
  category: "people"
}, an = {
  keywords: [
    "face",
    "smile"
  ],
  char: "🙂",
  fitzpatrick_scale: !1,
  category: "people"
}, tn = {
  keywords: [
    "face",
    "flipped",
    "silly",
    "smile"
  ],
  char: "🙃",
  fitzpatrick_scale: !1,
  category: "people"
}, rn = {
  keywords: [
    "face",
    "blush",
    "massage",
    "happiness"
  ],
  char: "☺️",
  fitzpatrick_scale: !1,
  category: "people"
}, on = {
  keywords: [
    "happy",
    "joy",
    "tongue",
    "smile",
    "face",
    "silly",
    "yummy",
    "nom",
    "delicious",
    "savouring"
  ],
  char: "😋",
  fitzpatrick_scale: !1,
  category: "people"
}, sn = {
  keywords: [
    "face",
    "relaxed",
    "phew",
    "massage",
    "happiness"
  ],
  char: "😌",
  fitzpatrick_scale: !1,
  category: "people"
}, cn = {
  keywords: [
    "face",
    "love",
    "like",
    "affection",
    "valentines",
    "infatuation",
    "crush",
    "heart"
  ],
  char: "😍",
  fitzpatrick_scale: !1,
  category: "people"
}, nn = {
  keywords: [
    "face",
    "love",
    "like",
    "affection",
    "valentines",
    "infatuation",
    "crush",
    "hearts",
    "adore"
  ],
  char: "🥰",
  fitzpatrick_scale: !1,
  category: "people"
}, ln = {
  keywords: [
    "face",
    "love",
    "like",
    "affection",
    "valentines",
    "infatuation",
    "kiss"
  ],
  char: "😘",
  fitzpatrick_scale: !1,
  category: "people"
}, dn = {
  keywords: [
    "love",
    "like",
    "face",
    "3",
    "valentines",
    "infatuation",
    "kiss"
  ],
  char: "😗",
  fitzpatrick_scale: !1,
  category: "people"
}, pn = {
  keywords: [
    "face",
    "affection",
    "valentines",
    "infatuation",
    "kiss"
  ],
  char: "😙",
  fitzpatrick_scale: !1,
  category: "people"
}, fn = {
  keywords: [
    "face",
    "love",
    "like",
    "affection",
    "valentines",
    "infatuation",
    "kiss"
  ],
  char: "😚",
  fitzpatrick_scale: !1,
  category: "people"
}, hn = {
  keywords: [
    "face",
    "prank",
    "childish",
    "playful",
    "mischievous",
    "smile",
    "wink",
    "tongue"
  ],
  char: "😜",
  fitzpatrick_scale: !1,
  category: "people"
}, yn = {
  keywords: [
    "face",
    "goofy",
    "crazy"
  ],
  char: "🤪",
  fitzpatrick_scale: !1,
  category: "people"
}, gn = {
  keywords: [
    "face",
    "distrust",
    "scepticism",
    "disapproval",
    "disbelief",
    "surprise"
  ],
  char: "🤨",
  fitzpatrick_scale: !1,
  category: "people"
}, _n = {
  keywords: [
    "face",
    "stuffy",
    "wealthy"
  ],
  char: "🧐",
  fitzpatrick_scale: !1,
  category: "people"
}, un = {
  keywords: [
    "face",
    "prank",
    "playful",
    "mischievous",
    "smile",
    "tongue"
  ],
  char: "😝",
  fitzpatrick_scale: !1,
  category: "people"
}, mn = {
  keywords: [
    "face",
    "prank",
    "childish",
    "playful",
    "mischievous",
    "smile",
    "tongue"
  ],
  char: "😛",
  fitzpatrick_scale: !1,
  category: "people"
}, kn = {
  keywords: [
    "face",
    "rich",
    "dollar",
    "money"
  ],
  char: "🤑",
  fitzpatrick_scale: !1,
  category: "people"
}, wn = {
  keywords: [
    "face",
    "nerdy",
    "geek",
    "dork"
  ],
  char: "🤓",
  fitzpatrick_scale: !1,
  category: "people"
}, bn = {
  keywords: [
    "face",
    "cool",
    "smile",
    "summer",
    "beach",
    "sunglass"
  ],
  char: "😎",
  fitzpatrick_scale: !1,
  category: "people"
}, vn = {
  keywords: [
    "face",
    "smile",
    "starry",
    "eyes",
    "grinning"
  ],
  char: "🤩",
  fitzpatrick_scale: !1,
  category: "people"
}, zn = {
  keywords: [
    "face"
  ],
  char: "🤡",
  fitzpatrick_scale: !1,
  category: "people"
}, xn = {
  keywords: [
    "face",
    "cowgirl",
    "hat"
  ],
  char: "🤠",
  fitzpatrick_scale: !1,
  category: "people"
}, jn = {
  keywords: [
    "face",
    "smile",
    "hug"
  ],
  char: "🤗",
  fitzpatrick_scale: !1,
  category: "people"
}, Cn = {
  keywords: [
    "face",
    "smile",
    "mean",
    "prank",
    "smug",
    "sarcasm"
  ],
  char: "😏",
  fitzpatrick_scale: !1,
  category: "people"
}, En = {
  keywords: [
    "face",
    "hellokitty"
  ],
  char: "😶",
  fitzpatrick_scale: !1,
  category: "people"
}, Sn = {
  keywords: [
    "indifference",
    "meh",
    ":|",
    "neutral"
  ],
  char: "😐",
  fitzpatrick_scale: !1,
  category: "people"
}, An = {
  keywords: [
    "face",
    "indifferent",
    "-_-",
    "meh",
    "deadpan"
  ],
  char: "😑",
  fitzpatrick_scale: !1,
  category: "people"
}, Ln = {
  keywords: [
    "indifference",
    "bored",
    "straight face",
    "serious",
    "sarcasm",
    "unimpressed",
    "skeptical",
    "dubious",
    "side_eye"
  ],
  char: "😒",
  fitzpatrick_scale: !1,
  category: "people"
}, $n = {
  keywords: [
    "face",
    "eyeroll",
    "frustrated"
  ],
  char: "🙄",
  fitzpatrick_scale: !1,
  category: "people"
}, Tn = {
  keywords: [
    "face",
    "hmmm",
    "think",
    "consider"
  ],
  char: "🤔",
  fitzpatrick_scale: !1,
  category: "people"
}, Fn = {
  keywords: [
    "face",
    "lie",
    "pinocchio"
  ],
  char: "🤥",
  fitzpatrick_scale: !1,
  category: "people"
}, Pn = {
  keywords: [
    "face",
    "whoops",
    "shock",
    "surprise"
  ],
  char: "🤭",
  fitzpatrick_scale: !1,
  category: "people"
}, Rn = {
  keywords: [
    "face",
    "quiet",
    "shhh"
  ],
  char: "🤫",
  fitzpatrick_scale: !1,
  category: "people"
}, In = {
  keywords: [
    "face",
    "swearing",
    "cursing",
    "cussing",
    "profanity",
    "expletive"
  ],
  char: "🤬",
  fitzpatrick_scale: !1,
  category: "people"
}, qn = {
  keywords: [
    "face",
    "shocked",
    "mind",
    "blown"
  ],
  char: "🤯",
  fitzpatrick_scale: !1,
  category: "people"
}, On = {
  keywords: [
    "face",
    "blush",
    "shy",
    "flattered"
  ],
  char: "😳",
  fitzpatrick_scale: !1,
  category: "people"
}, Dn = {
  keywords: [
    "face",
    "sad",
    "upset",
    "depressed",
    ":("
  ],
  char: "😞",
  fitzpatrick_scale: !1,
  category: "people"
}, Mn = {
  keywords: [
    "face",
    "concern",
    "nervous",
    ":("
  ],
  char: "😟",
  fitzpatrick_scale: !1,
  category: "people"
}, Bn = {
  keywords: [
    "mad",
    "face",
    "annoyed",
    "frustrated"
  ],
  char: "😠",
  fitzpatrick_scale: !1,
  category: "people"
}, Nn = {
  keywords: [
    "angry",
    "mad",
    "hate",
    "despise"
  ],
  char: "😡",
  fitzpatrick_scale: !1,
  category: "people"
}, Hn = {
  keywords: [
    "face",
    "sad",
    "depressed",
    "upset"
  ],
  char: "😔",
  fitzpatrick_scale: !1,
  category: "people"
}, Un = {
  keywords: [
    "face",
    "indifference",
    "huh",
    "weird",
    "hmmm",
    ":/"
  ],
  char: "😕",
  fitzpatrick_scale: !1,
  category: "people"
}, Vn = {
  keywords: [
    "face",
    "frowning",
    "disappointed",
    "sad",
    "upset"
  ],
  char: "🙁",
  fitzpatrick_scale: !1,
  category: "people"
}, Wn = {
  keywords: [
    "face",
    "sad",
    "upset",
    "frown"
  ],
  char: "☹",
  fitzpatrick_scale: !1,
  category: "people"
}, Kn = {
  keywords: [
    "face",
    "sick",
    "no",
    "upset",
    "oops"
  ],
  char: "😣",
  fitzpatrick_scale: !1,
  category: "people"
}, Gn = {
  keywords: [
    "face",
    "confused",
    "sick",
    "unwell",
    "oops",
    ":S"
  ],
  char: "😖",
  fitzpatrick_scale: !1,
  category: "people"
}, Xn = {
  keywords: [
    "sick",
    "whine",
    "upset",
    "frustrated"
  ],
  char: "😫",
  fitzpatrick_scale: !1,
  category: "people"
}, Qn = {
  keywords: [
    "face",
    "tired",
    "sleepy",
    "sad",
    "frustrated",
    "upset"
  ],
  char: "😩",
  fitzpatrick_scale: !1,
  category: "people"
}, Jn = {
  keywords: [
    "face",
    "begging",
    "mercy"
  ],
  char: "🥺",
  fitzpatrick_scale: !1,
  category: "people"
}, Yn = {
  keywords: [
    "face",
    "gas",
    "phew",
    "proud",
    "pride"
  ],
  char: "😤",
  fitzpatrick_scale: !1,
  category: "people"
}, Zn = {
  keywords: [
    "face",
    "surprise",
    "impressed",
    "wow",
    "whoa",
    ":O"
  ],
  char: "😮",
  fitzpatrick_scale: !1,
  category: "people"
}, el = {
  keywords: [
    "face",
    "munch",
    "scared",
    "omg"
  ],
  char: "😱",
  fitzpatrick_scale: !1,
  category: "people"
}, al = {
  keywords: [
    "face",
    "scared",
    "terrified",
    "nervous",
    "oops",
    "huh"
  ],
  char: "😨",
  fitzpatrick_scale: !1,
  category: "people"
}, tl = {
  keywords: [
    "face",
    "nervous",
    "sweat"
  ],
  char: "😰",
  fitzpatrick_scale: !1,
  category: "people"
}, rl = {
  keywords: [
    "face",
    "woo",
    "shh"
  ],
  char: "😯",
  fitzpatrick_scale: !1,
  category: "people"
}, ol = {
  keywords: [
    "face",
    "aw",
    "what"
  ],
  char: "😦",
  fitzpatrick_scale: !1,
  category: "people"
}, sl = {
  keywords: [
    "face",
    "stunned",
    "nervous"
  ],
  char: "😧",
  fitzpatrick_scale: !1,
  category: "people"
}, cl = {
  keywords: [
    "face",
    "tears",
    "sad",
    "depressed",
    "upset",
    ":'("
  ],
  char: "😢",
  fitzpatrick_scale: !1,
  category: "people"
}, il = {
  keywords: [
    "face",
    "phew",
    "sweat",
    "nervous"
  ],
  char: "😥",
  fitzpatrick_scale: !1,
  category: "people"
}, nl = {
  keywords: [
    "face"
  ],
  char: "🤤",
  fitzpatrick_scale: !1,
  category: "people"
}, ll = {
  keywords: [
    "face",
    "tired",
    "rest",
    "nap"
  ],
  char: "😪",
  fitzpatrick_scale: !1,
  category: "people"
}, dl = {
  keywords: [
    "face",
    "hot",
    "sad",
    "tired",
    "exercise"
  ],
  char: "😓",
  fitzpatrick_scale: !1,
  category: "people"
}, pl = {
  keywords: [
    "face",
    "feverish",
    "heat",
    "red",
    "sweating"
  ],
  char: "🥵",
  fitzpatrick_scale: !1,
  category: "people"
}, fl = {
  keywords: [
    "face",
    "blue",
    "freezing",
    "frozen",
    "frostbite",
    "icicles"
  ],
  char: "🥶",
  fitzpatrick_scale: !1,
  category: "people"
}, hl = {
  keywords: [
    "face",
    "cry",
    "tears",
    "sad",
    "upset",
    "depressed"
  ],
  char: "😭",
  fitzpatrick_scale: !1,
  category: "people"
}, yl = {
  keywords: [
    "spent",
    "unconscious",
    "xox",
    "dizzy"
  ],
  char: "😵",
  fitzpatrick_scale: !1,
  category: "people"
}, gl = {
  keywords: [
    "face",
    "xox",
    "surprised",
    "poisoned"
  ],
  char: "😲",
  fitzpatrick_scale: !1,
  category: "people"
}, _l = {
  keywords: [
    "face",
    "sealed",
    "zipper",
    "secret"
  ],
  char: "🤐",
  fitzpatrick_scale: !1,
  category: "people"
}, ul = {
  keywords: [
    "face",
    "vomit",
    "gross",
    "green",
    "sick",
    "throw up",
    "ill"
  ],
  char: "🤢",
  fitzpatrick_scale: !1,
  category: "people"
}, ml = {
  keywords: [
    "face",
    "gesundheit",
    "sneeze",
    "sick",
    "allergy"
  ],
  char: "🤧",
  fitzpatrick_scale: !1,
  category: "people"
}, kl = {
  keywords: [
    "face",
    "sick"
  ],
  char: "🤮",
  fitzpatrick_scale: !1,
  category: "people"
}, wl = {
  keywords: [
    "face",
    "sick",
    "ill",
    "disease"
  ],
  char: "😷",
  fitzpatrick_scale: !1,
  category: "people"
}, bl = {
  keywords: [
    "sick",
    "temperature",
    "thermometer",
    "cold",
    "fever"
  ],
  char: "🤒",
  fitzpatrick_scale: !1,
  category: "people"
}, vl = {
  keywords: [
    "injured",
    "clumsy",
    "bandage",
    "hurt"
  ],
  char: "🤕",
  fitzpatrick_scale: !1,
  category: "people"
}, zl = {
  keywords: [
    "face",
    "dizzy",
    "intoxicated",
    "tipsy",
    "wavy"
  ],
  char: "🥴",
  fitzpatrick_scale: !1,
  category: "people"
}, xl = {
  keywords: [
    "face",
    "tired",
    "sleepy",
    "night",
    "zzz"
  ],
  char: "😴",
  fitzpatrick_scale: !1,
  category: "people"
}, jl = {
  keywords: [
    "sleepy",
    "tired",
    "dream"
  ],
  char: "💤",
  fitzpatrick_scale: !1,
  category: "people"
}, Cl = {
  keywords: [
    "hankey",
    "shitface",
    "fail",
    "turd",
    "shit"
  ],
  char: "💩",
  fitzpatrick_scale: !1,
  category: "people"
}, El = {
  keywords: [
    "devil",
    "horns"
  ],
  char: "😈",
  fitzpatrick_scale: !1,
  category: "people"
}, Sl = {
  keywords: [
    "devil",
    "angry",
    "horns"
  ],
  char: "👿",
  fitzpatrick_scale: !1,
  category: "people"
}, Al = {
  keywords: [
    "monster",
    "red",
    "mask",
    "halloween",
    "scary",
    "creepy",
    "devil",
    "demon",
    "japanese",
    "ogre"
  ],
  char: "👹",
  fitzpatrick_scale: !1,
  category: "people"
}, Ll = {
  keywords: [
    "red",
    "evil",
    "mask",
    "monster",
    "scary",
    "creepy",
    "japanese",
    "goblin"
  ],
  char: "👺",
  fitzpatrick_scale: !1,
  category: "people"
}, $l = {
  keywords: [
    "dead",
    "skeleton",
    "creepy",
    "death"
  ],
  char: "💀",
  fitzpatrick_scale: !1,
  category: "people"
}, Tl = {
  keywords: [
    "halloween",
    "spooky",
    "scary"
  ],
  char: "👻",
  fitzpatrick_scale: !1,
  category: "people"
}, Fl = {
  keywords: [
    "UFO",
    "paul",
    "weird",
    "outer_space"
  ],
  char: "👽",
  fitzpatrick_scale: !1,
  category: "people"
}, Pl = {
  keywords: [
    "computer",
    "machine",
    "bot"
  ],
  char: "🤖",
  fitzpatrick_scale: !1,
  category: "people"
}, Rl = {
  keywords: [
    "animal",
    "cats",
    "happy",
    "smile"
  ],
  char: "😺",
  fitzpatrick_scale: !1,
  category: "people"
}, Il = {
  keywords: [
    "animal",
    "cats",
    "smile"
  ],
  char: "😸",
  fitzpatrick_scale: !1,
  category: "people"
}, ql = {
  keywords: [
    "animal",
    "cats",
    "haha",
    "happy",
    "tears"
  ],
  char: "😹",
  fitzpatrick_scale: !1,
  category: "people"
}, Ol = {
  keywords: [
    "animal",
    "love",
    "like",
    "affection",
    "cats",
    "valentines",
    "heart"
  ],
  char: "😻",
  fitzpatrick_scale: !1,
  category: "people"
}, Dl = {
  keywords: [
    "animal",
    "cats",
    "smirk"
  ],
  char: "😼",
  fitzpatrick_scale: !1,
  category: "people"
}, Ml = {
  keywords: [
    "animal",
    "cats",
    "kiss"
  ],
  char: "😽",
  fitzpatrick_scale: !1,
  category: "people"
}, Bl = {
  keywords: [
    "animal",
    "cats",
    "munch",
    "scared",
    "scream"
  ],
  char: "🙀",
  fitzpatrick_scale: !1,
  category: "people"
}, Nl = {
  keywords: [
    "animal",
    "tears",
    "weep",
    "sad",
    "cats",
    "upset",
    "cry"
  ],
  char: "😿",
  fitzpatrick_scale: !1,
  category: "people"
}, Hl = {
  keywords: [
    "animal",
    "cats"
  ],
  char: "😾",
  fitzpatrick_scale: !1,
  category: "people"
}, Ul = {
  keywords: [
    "hands",
    "gesture",
    "cupped",
    "prayer"
  ],
  char: "🤲",
  fitzpatrick_scale: !0,
  category: "people"
}, Vl = {
  keywords: [
    "gesture",
    "hooray",
    "yea",
    "celebration",
    "hands"
  ],
  char: "🙌",
  fitzpatrick_scale: !0,
  category: "people"
}, Wl = {
  keywords: [
    "hands",
    "praise",
    "applause",
    "congrats",
    "yay"
  ],
  char: "👏",
  fitzpatrick_scale: !0,
  category: "people"
}, Kl = {
  keywords: [
    "hands",
    "gesture",
    "goodbye",
    "solong",
    "farewell",
    "hello",
    "hi",
    "palm"
  ],
  char: "👋",
  fitzpatrick_scale: !0,
  category: "people"
}, Gl = {
  keywords: [
    "hands",
    "gesture"
  ],
  char: "🤙",
  fitzpatrick_scale: !0,
  category: "people"
}, Xl = {
  keywords: [
    "angry",
    "violence",
    "fist",
    "hit",
    "attack",
    "hand"
  ],
  char: "👊",
  fitzpatrick_scale: !0,
  category: "people"
}, Ql = {
  keywords: [
    "fingers",
    "hand",
    "grasp"
  ],
  char: "✊",
  fitzpatrick_scale: !0,
  category: "people"
}, Jl = {
  keywords: [
    "hand",
    "fistbump"
  ],
  char: "🤛",
  fitzpatrick_scale: !0,
  category: "people"
}, Yl = {
  keywords: [
    "hand",
    "fistbump"
  ],
  char: "🤜",
  fitzpatrick_scale: !0,
  category: "people"
}, Zl = {
  keywords: [
    "fingers",
    "ohyeah",
    "hand",
    "peace",
    "victory",
    "two"
  ],
  char: "✌",
  fitzpatrick_scale: !0,
  category: "people"
}, ed = {
  keywords: [
    "fingers",
    "limbs",
    "perfect",
    "ok",
    "okay"
  ],
  char: "👌",
  fitzpatrick_scale: !0,
  category: "people"
}, ad = {
  keywords: [
    "fingers",
    "stop",
    "highfive",
    "palm",
    "ban"
  ],
  char: "✋",
  fitzpatrick_scale: !0,
  category: "people"
}, td = {
  keywords: [
    "fingers",
    "raised",
    "backhand"
  ],
  char: "🤚",
  fitzpatrick_scale: !0,
  category: "people"
}, rd = {
  keywords: [
    "fingers",
    "butterfly",
    "hands",
    "open"
  ],
  char: "👐",
  fitzpatrick_scale: !0,
  category: "people"
}, od = {
  keywords: [
    "arm",
    "flex",
    "hand",
    "summer",
    "strong",
    "biceps"
  ],
  char: "💪",
  fitzpatrick_scale: !0,
  category: "people"
}, sd = {
  keywords: [
    "please",
    "hope",
    "wish",
    "namaste",
    "highfive"
  ],
  char: "🙏",
  fitzpatrick_scale: !0,
  category: "people"
}, cd = {
  keywords: [
    "kick",
    "stomp"
  ],
  char: "🦶",
  fitzpatrick_scale: !0,
  category: "people"
}, id = {
  keywords: [
    "kick",
    "limb"
  ],
  char: "🦵",
  fitzpatrick_scale: !0,
  category: "people"
}, nd = {
  keywords: [
    "agreement",
    "shake"
  ],
  char: "🤝",
  fitzpatrick_scale: !1,
  category: "people"
}, ld = {
  keywords: [
    "hand",
    "fingers",
    "direction",
    "up"
  ],
  char: "☝",
  fitzpatrick_scale: !0,
  category: "people"
}, dd = {
  keywords: [
    "fingers",
    "hand",
    "direction",
    "up"
  ],
  char: "👆",
  fitzpatrick_scale: !0,
  category: "people"
}, pd = {
  keywords: [
    "fingers",
    "hand",
    "direction",
    "down"
  ],
  char: "👇",
  fitzpatrick_scale: !0,
  category: "people"
}, fd = {
  keywords: [
    "direction",
    "fingers",
    "hand",
    "left"
  ],
  char: "👈",
  fitzpatrick_scale: !0,
  category: "people"
}, hd = {
  keywords: [
    "fingers",
    "hand",
    "direction",
    "right"
  ],
  char: "👉",
  fitzpatrick_scale: !0,
  category: "people"
}, yd = {
  keywords: [
    "hand",
    "fingers",
    "rude",
    "middle",
    "flipping"
  ],
  char: "🖕",
  fitzpatrick_scale: !0,
  category: "people"
}, gd = {
  keywords: [
    "hand",
    "fingers",
    "palm"
  ],
  char: "🖐",
  fitzpatrick_scale: !0,
  category: "people"
}, _d = {
  keywords: [
    "hand",
    "fingers",
    "gesture"
  ],
  char: "🤟",
  fitzpatrick_scale: !0,
  category: "people"
}, ud = {
  keywords: [
    "hand",
    "fingers",
    "evil_eye",
    "sign_of_horns",
    "rock_on"
  ],
  char: "🤘",
  fitzpatrick_scale: !0,
  category: "people"
}, md = {
  keywords: [
    "good",
    "lucky"
  ],
  char: "🤞",
  fitzpatrick_scale: !0,
  category: "people"
}, kd = {
  keywords: [
    "hand",
    "fingers",
    "spock",
    "star trek"
  ],
  char: "🖖",
  fitzpatrick_scale: !0,
  category: "people"
}, wd = {
  keywords: [
    "lower_left_ballpoint_pen",
    "stationery",
    "write",
    "compose"
  ],
  char: "✍",
  fitzpatrick_scale: !0,
  category: "people"
}, bd = {
  keywords: [
    "camera",
    "phone"
  ],
  char: "🤳",
  fitzpatrick_scale: !0,
  category: "people"
}, vd = {
  keywords: [
    "beauty",
    "manicure",
    "finger",
    "fashion",
    "nail"
  ],
  char: "💅",
  fitzpatrick_scale: !0,
  category: "people"
}, zd = {
  keywords: [
    "mouth",
    "kiss"
  ],
  char: "👄",
  fitzpatrick_scale: !1,
  category: "people"
}, xd = {
  keywords: [
    "teeth",
    "dentist"
  ],
  char: "🦷",
  fitzpatrick_scale: !1,
  category: "people"
}, jd = {
  keywords: [
    "mouth",
    "playful"
  ],
  char: "👅",
  fitzpatrick_scale: !1,
  category: "people"
}, Cd = {
  keywords: [
    "face",
    "hear",
    "sound",
    "listen"
  ],
  char: "👂",
  fitzpatrick_scale: !0,
  category: "people"
}, Ed = {
  keywords: [
    "smell",
    "sniff"
  ],
  char: "👃",
  fitzpatrick_scale: !0,
  category: "people"
}, Sd = {
  keywords: [
    "face",
    "look",
    "see",
    "watch",
    "stare"
  ],
  char: "👁",
  fitzpatrick_scale: !1,
  category: "people"
}, Ad = {
  keywords: [
    "look",
    "watch",
    "stalk",
    "peek",
    "see"
  ],
  char: "👀",
  fitzpatrick_scale: !1,
  category: "people"
}, Ld = {
  keywords: [
    "smart",
    "intelligent"
  ],
  char: "🧠",
  fitzpatrick_scale: !1,
  category: "people"
}, $d = {
  keywords: [
    "user",
    "person",
    "human"
  ],
  char: "👤",
  fitzpatrick_scale: !1,
  category: "people"
}, Td = {
  keywords: [
    "user",
    "person",
    "human",
    "group",
    "team"
  ],
  char: "👥",
  fitzpatrick_scale: !1,
  category: "people"
}, Fd = {
  keywords: [
    "user",
    "person",
    "human",
    "sing",
    "say",
    "talk"
  ],
  char: "🗣",
  fitzpatrick_scale: !1,
  category: "people"
}, Pd = {
  keywords: [
    "child",
    "boy",
    "girl",
    "toddler"
  ],
  char: "👶",
  fitzpatrick_scale: !0,
  category: "people"
}, Rd = {
  keywords: [
    "gender-neutral",
    "young"
  ],
  char: "🧒",
  fitzpatrick_scale: !0,
  category: "people"
}, Id = {
  keywords: [
    "man",
    "male",
    "guy",
    "teenager"
  ],
  char: "👦",
  fitzpatrick_scale: !0,
  category: "people"
}, qd = {
  keywords: [
    "female",
    "woman",
    "teenager"
  ],
  char: "👧",
  fitzpatrick_scale: !0,
  category: "people"
}, Od = {
  keywords: [
    "gender-neutral",
    "person"
  ],
  char: "🧑",
  fitzpatrick_scale: !0,
  category: "people"
}, Dd = {
  keywords: [
    "mustache",
    "father",
    "dad",
    "guy",
    "classy",
    "sir",
    "moustache"
  ],
  char: "👨",
  fitzpatrick_scale: !0,
  category: "people"
}, Md = {
  keywords: [
    "female",
    "girls",
    "lady"
  ],
  char: "👩",
  fitzpatrick_scale: !0,
  category: "people"
}, Bd = {
  keywords: [
    "woman",
    "female",
    "girl",
    "blonde",
    "person"
  ],
  char: "👱‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Nd = {
  keywords: [
    "man",
    "male",
    "boy",
    "blonde",
    "guy",
    "person"
  ],
  char: "👱",
  fitzpatrick_scale: !0,
  category: "people"
}, Hd = {
  keywords: [
    "person",
    "bewhiskered"
  ],
  char: "🧔",
  fitzpatrick_scale: !0,
  category: "people"
}, Ud = {
  keywords: [
    "human",
    "elder",
    "senior",
    "gender-neutral"
  ],
  char: "🧓",
  fitzpatrick_scale: !0,
  category: "people"
}, Vd = {
  keywords: [
    "human",
    "male",
    "men",
    "old",
    "elder",
    "senior"
  ],
  char: "👴",
  fitzpatrick_scale: !0,
  category: "people"
}, Wd = {
  keywords: [
    "human",
    "female",
    "women",
    "lady",
    "old",
    "elder",
    "senior"
  ],
  char: "👵",
  fitzpatrick_scale: !0,
  category: "people"
}, Kd = {
  keywords: [
    "male",
    "boy",
    "chinese"
  ],
  char: "👲",
  fitzpatrick_scale: !0,
  category: "people"
}, Gd = {
  keywords: [
    "female",
    "hijab",
    "mantilla",
    "tichel"
  ],
  char: "🧕",
  fitzpatrick_scale: !0,
  category: "people"
}, Xd = {
  keywords: [
    "female",
    "indian",
    "hinduism",
    "arabs",
    "woman"
  ],
  char: "👳‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Qd = {
  keywords: [
    "male",
    "indian",
    "hinduism",
    "arabs"
  ],
  char: "👳",
  fitzpatrick_scale: !0,
  category: "people"
}, Jd = {
  keywords: [
    "woman",
    "police",
    "law",
    "legal",
    "enforcement",
    "arrest",
    "911",
    "female"
  ],
  char: "👮‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Yd = {
  keywords: [
    "man",
    "police",
    "law",
    "legal",
    "enforcement",
    "arrest",
    "911"
  ],
  char: "👮",
  fitzpatrick_scale: !0,
  category: "people"
}, Zd = {
  keywords: [
    "female",
    "human",
    "wip",
    "build",
    "construction",
    "worker",
    "labor",
    "woman"
  ],
  char: "👷‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, ep = {
  keywords: [
    "male",
    "human",
    "wip",
    "guy",
    "build",
    "construction",
    "worker",
    "labor"
  ],
  char: "👷",
  fitzpatrick_scale: !0,
  category: "people"
}, ap = {
  keywords: [
    "uk",
    "gb",
    "british",
    "female",
    "royal",
    "woman"
  ],
  char: "💂‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, tp = {
  keywords: [
    "uk",
    "gb",
    "british",
    "male",
    "guy",
    "royal"
  ],
  char: "💂",
  fitzpatrick_scale: !0,
  category: "people"
}, rp = {
  keywords: [
    "human",
    "spy",
    "detective",
    "female",
    "woman"
  ],
  char: "🕵️‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, op = {
  keywords: [
    "human",
    "spy",
    "detective"
  ],
  char: "🕵",
  fitzpatrick_scale: !0,
  category: "people"
}, sp = {
  keywords: [
    "doctor",
    "nurse",
    "therapist",
    "healthcare",
    "woman",
    "human"
  ],
  char: "👩‍⚕️",
  fitzpatrick_scale: !0,
  category: "people"
}, cp = {
  keywords: [
    "doctor",
    "nurse",
    "therapist",
    "healthcare",
    "man",
    "human"
  ],
  char: "👨‍⚕️",
  fitzpatrick_scale: !0,
  category: "people"
}, ip = {
  keywords: [
    "rancher",
    "gardener",
    "woman",
    "human"
  ],
  char: "👩‍🌾",
  fitzpatrick_scale: !0,
  category: "people"
}, np = {
  keywords: [
    "rancher",
    "gardener",
    "man",
    "human"
  ],
  char: "👨‍🌾",
  fitzpatrick_scale: !0,
  category: "people"
}, lp = {
  keywords: [
    "chef",
    "woman",
    "human"
  ],
  char: "👩‍🍳",
  fitzpatrick_scale: !0,
  category: "people"
}, dp = {
  keywords: [
    "chef",
    "man",
    "human"
  ],
  char: "👨‍🍳",
  fitzpatrick_scale: !0,
  category: "people"
}, pp = {
  keywords: [
    "graduate",
    "woman",
    "human"
  ],
  char: "👩‍🎓",
  fitzpatrick_scale: !0,
  category: "people"
}, fp = {
  keywords: [
    "graduate",
    "man",
    "human"
  ],
  char: "👨‍🎓",
  fitzpatrick_scale: !0,
  category: "people"
}, hp = {
  keywords: [
    "rockstar",
    "entertainer",
    "woman",
    "human"
  ],
  char: "👩‍🎤",
  fitzpatrick_scale: !0,
  category: "people"
}, yp = {
  keywords: [
    "rockstar",
    "entertainer",
    "man",
    "human"
  ],
  char: "👨‍🎤",
  fitzpatrick_scale: !0,
  category: "people"
}, gp = {
  keywords: [
    "instructor",
    "professor",
    "woman",
    "human"
  ],
  char: "👩‍🏫",
  fitzpatrick_scale: !0,
  category: "people"
}, _p = {
  keywords: [
    "instructor",
    "professor",
    "man",
    "human"
  ],
  char: "👨‍🏫",
  fitzpatrick_scale: !0,
  category: "people"
}, up = {
  keywords: [
    "assembly",
    "industrial",
    "woman",
    "human"
  ],
  char: "👩‍🏭",
  fitzpatrick_scale: !0,
  category: "people"
}, mp = {
  keywords: [
    "assembly",
    "industrial",
    "man",
    "human"
  ],
  char: "👨‍🏭",
  fitzpatrick_scale: !0,
  category: "people"
}, kp = {
  keywords: [
    "coder",
    "developer",
    "engineer",
    "programmer",
    "software",
    "woman",
    "human",
    "laptop",
    "computer"
  ],
  char: "👩‍💻",
  fitzpatrick_scale: !0,
  category: "people"
}, wp = {
  keywords: [
    "coder",
    "developer",
    "engineer",
    "programmer",
    "software",
    "man",
    "human",
    "laptop",
    "computer"
  ],
  char: "👨‍💻",
  fitzpatrick_scale: !0,
  category: "people"
}, bp = {
  keywords: [
    "business",
    "manager",
    "woman",
    "human"
  ],
  char: "👩‍💼",
  fitzpatrick_scale: !0,
  category: "people"
}, vp = {
  keywords: [
    "business",
    "manager",
    "man",
    "human"
  ],
  char: "👨‍💼",
  fitzpatrick_scale: !0,
  category: "people"
}, zp = {
  keywords: [
    "plumber",
    "woman",
    "human",
    "wrench"
  ],
  char: "👩‍🔧",
  fitzpatrick_scale: !0,
  category: "people"
}, xp = {
  keywords: [
    "plumber",
    "man",
    "human",
    "wrench"
  ],
  char: "👨‍🔧",
  fitzpatrick_scale: !0,
  category: "people"
}, jp = {
  keywords: [
    "biologist",
    "chemist",
    "engineer",
    "physicist",
    "woman",
    "human"
  ],
  char: "👩‍🔬",
  fitzpatrick_scale: !0,
  category: "people"
}, Cp = {
  keywords: [
    "biologist",
    "chemist",
    "engineer",
    "physicist",
    "man",
    "human"
  ],
  char: "👨‍🔬",
  fitzpatrick_scale: !0,
  category: "people"
}, Ep = {
  keywords: [
    "painter",
    "woman",
    "human"
  ],
  char: "👩‍🎨",
  fitzpatrick_scale: !0,
  category: "people"
}, Sp = {
  keywords: [
    "painter",
    "man",
    "human"
  ],
  char: "👨‍🎨",
  fitzpatrick_scale: !0,
  category: "people"
}, Ap = {
  keywords: [
    "fireman",
    "woman",
    "human"
  ],
  char: "👩‍🚒",
  fitzpatrick_scale: !0,
  category: "people"
}, Lp = {
  keywords: [
    "fireman",
    "man",
    "human"
  ],
  char: "👨‍🚒",
  fitzpatrick_scale: !0,
  category: "people"
}, $p = {
  keywords: [
    "aviator",
    "plane",
    "woman",
    "human"
  ],
  char: "👩‍✈️",
  fitzpatrick_scale: !0,
  category: "people"
}, Tp = {
  keywords: [
    "aviator",
    "plane",
    "man",
    "human"
  ],
  char: "👨‍✈️",
  fitzpatrick_scale: !0,
  category: "people"
}, Fp = {
  keywords: [
    "space",
    "rocket",
    "woman",
    "human"
  ],
  char: "👩‍🚀",
  fitzpatrick_scale: !0,
  category: "people"
}, Pp = {
  keywords: [
    "space",
    "rocket",
    "man",
    "human"
  ],
  char: "👨‍🚀",
  fitzpatrick_scale: !0,
  category: "people"
}, Rp = {
  keywords: [
    "justice",
    "court",
    "woman",
    "human"
  ],
  char: "👩‍⚖️",
  fitzpatrick_scale: !0,
  category: "people"
}, Ip = {
  keywords: [
    "justice",
    "court",
    "man",
    "human"
  ],
  char: "👨‍⚖️",
  fitzpatrick_scale: !0,
  category: "people"
}, qp = {
  keywords: [
    "woman",
    "female",
    "good",
    "heroine",
    "superpowers"
  ],
  char: "🦸‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Op = {
  keywords: [
    "man",
    "male",
    "good",
    "hero",
    "superpowers"
  ],
  char: "🦸‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Dp = {
  keywords: [
    "woman",
    "female",
    "evil",
    "bad",
    "criminal",
    "heroine",
    "superpowers"
  ],
  char: "🦹‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Mp = {
  keywords: [
    "man",
    "male",
    "evil",
    "bad",
    "criminal",
    "hero",
    "superpowers"
  ],
  char: "🦹‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Bp = {
  keywords: [
    "woman",
    "female",
    "xmas",
    "mother christmas"
  ],
  char: "🤶",
  fitzpatrick_scale: !0,
  category: "people"
}, Np = {
  keywords: [
    "festival",
    "man",
    "male",
    "xmas",
    "father christmas"
  ],
  char: "🎅",
  fitzpatrick_scale: !0,
  category: "people"
}, Hp = {
  keywords: [
    "woman",
    "female",
    "mage",
    "witch"
  ],
  char: "🧙‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Up = {
  keywords: [
    "man",
    "male",
    "mage",
    "sorcerer"
  ],
  char: "🧙‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Vp = {
  keywords: [
    "woman",
    "female"
  ],
  char: "🧝‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Wp = {
  keywords: [
    "man",
    "male"
  ],
  char: "🧝‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Kp = {
  keywords: [
    "woman",
    "female"
  ],
  char: "🧛‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Gp = {
  keywords: [
    "man",
    "male",
    "dracula"
  ],
  char: "🧛‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Xp = {
  keywords: [
    "woman",
    "female",
    "undead",
    "walking dead"
  ],
  char: "🧟‍♀️",
  fitzpatrick_scale: !1,
  category: "people"
}, Qp = {
  keywords: [
    "man",
    "male",
    "dracula",
    "undead",
    "walking dead"
  ],
  char: "🧟‍♂️",
  fitzpatrick_scale: !1,
  category: "people"
}, Jp = {
  keywords: [
    "woman",
    "female"
  ],
  char: "🧞‍♀️",
  fitzpatrick_scale: !1,
  category: "people"
}, Yp = {
  keywords: [
    "man",
    "male"
  ],
  char: "🧞‍♂️",
  fitzpatrick_scale: !1,
  category: "people"
}, Zp = {
  keywords: [
    "woman",
    "female",
    "merwoman",
    "ariel"
  ],
  char: "🧜‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, ef = {
  keywords: [
    "man",
    "male",
    "triton"
  ],
  char: "🧜‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, af = {
  keywords: [
    "woman",
    "female"
  ],
  char: "🧚‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, tf = {
  keywords: [
    "man",
    "male"
  ],
  char: "🧚‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, rf = {
  keywords: [
    "heaven",
    "wings",
    "halo"
  ],
  char: "👼",
  fitzpatrick_scale: !0,
  category: "people"
}, of = {
  keywords: [
    "baby"
  ],
  char: "🤰",
  fitzpatrick_scale: !0,
  category: "people"
}, sf = {
  keywords: [
    "nursing",
    "baby"
  ],
  char: "🤱",
  fitzpatrick_scale: !0,
  category: "people"
}, cf = {
  keywords: [
    "girl",
    "woman",
    "female",
    "blond",
    "crown",
    "royal",
    "queen"
  ],
  char: "👸",
  fitzpatrick_scale: !0,
  category: "people"
}, nf = {
  keywords: [
    "boy",
    "man",
    "male",
    "crown",
    "royal",
    "king"
  ],
  char: "🤴",
  fitzpatrick_scale: !0,
  category: "people"
}, lf = {
  keywords: [
    "couple",
    "marriage",
    "wedding",
    "woman",
    "bride"
  ],
  char: "👰",
  fitzpatrick_scale: !0,
  category: "people"
}, df = {
  keywords: [
    "couple",
    "marriage",
    "wedding",
    "groom"
  ],
  char: "🤵",
  fitzpatrick_scale: !0,
  category: "people"
}, pf = {
  keywords: [
    "woman",
    "walking",
    "exercise",
    "race",
    "running",
    "female"
  ],
  char: "🏃‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, ff = {
  keywords: [
    "man",
    "walking",
    "exercise",
    "race",
    "running"
  ],
  char: "🏃",
  fitzpatrick_scale: !0,
  category: "people"
}, hf = {
  keywords: [
    "human",
    "feet",
    "steps",
    "woman",
    "female"
  ],
  char: "🚶‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, yf = {
  keywords: [
    "human",
    "feet",
    "steps"
  ],
  char: "🚶",
  fitzpatrick_scale: !0,
  category: "people"
}, gf = {
  keywords: [
    "female",
    "girl",
    "woman",
    "fun"
  ],
  char: "💃",
  fitzpatrick_scale: !0,
  category: "people"
}, _f = {
  keywords: [
    "male",
    "boy",
    "fun",
    "dancer"
  ],
  char: "🕺",
  fitzpatrick_scale: !0,
  category: "people"
}, uf = {
  keywords: [
    "female",
    "bunny",
    "women",
    "girls"
  ],
  char: "👯",
  fitzpatrick_scale: !1,
  category: "people"
}, mf = {
  keywords: [
    "male",
    "bunny",
    "men",
    "boys"
  ],
  char: "👯‍♂️",
  fitzpatrick_scale: !1,
  category: "people"
}, kf = {
  keywords: [
    "pair",
    "people",
    "human",
    "love",
    "date",
    "dating",
    "like",
    "affection",
    "valentines",
    "marriage"
  ],
  char: "👫",
  fitzpatrick_scale: !1,
  category: "people"
}, wf = {
  keywords: [
    "pair",
    "couple",
    "love",
    "like",
    "bromance",
    "friendship",
    "people",
    "human"
  ],
  char: "👬",
  fitzpatrick_scale: !1,
  category: "people"
}, bf = {
  keywords: [
    "pair",
    "friendship",
    "couple",
    "love",
    "like",
    "female",
    "people",
    "human"
  ],
  char: "👭",
  fitzpatrick_scale: !1,
  category: "people"
}, vf = {
  keywords: [
    "woman",
    "female",
    "girl"
  ],
  char: "🙇‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, zf = {
  keywords: [
    "man",
    "male",
    "boy"
  ],
  char: "🙇",
  fitzpatrick_scale: !0,
  category: "people"
}, xf = {
  keywords: [
    "man",
    "male",
    "boy",
    "disbelief"
  ],
  char: "🤦‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, jf = {
  keywords: [
    "woman",
    "female",
    "girl",
    "disbelief"
  ],
  char: "🤦‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Cf = {
  keywords: [
    "woman",
    "female",
    "girl",
    "confused",
    "indifferent",
    "doubt"
  ],
  char: "🤷",
  fitzpatrick_scale: !0,
  category: "people"
}, Ef = {
  keywords: [
    "man",
    "male",
    "boy",
    "confused",
    "indifferent",
    "doubt"
  ],
  char: "🤷‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Sf = {
  keywords: [
    "female",
    "girl",
    "woman",
    "human",
    "information"
  ],
  char: "💁",
  fitzpatrick_scale: !0,
  category: "people"
}, Af = {
  keywords: [
    "male",
    "boy",
    "man",
    "human",
    "information"
  ],
  char: "💁‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Lf = {
  keywords: [
    "female",
    "girl",
    "woman",
    "nope"
  ],
  char: "🙅",
  fitzpatrick_scale: !0,
  category: "people"
}, $f = {
  keywords: [
    "male",
    "boy",
    "man",
    "nope"
  ],
  char: "🙅‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Tf = {
  keywords: [
    "women",
    "girl",
    "female",
    "pink",
    "human",
    "woman"
  ],
  char: "🙆",
  fitzpatrick_scale: !0,
  category: "people"
}, Ff = {
  keywords: [
    "men",
    "boy",
    "male",
    "blue",
    "human",
    "man"
  ],
  char: "🙆‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Pf = {
  keywords: [
    "female",
    "girl",
    "woman"
  ],
  char: "🙋",
  fitzpatrick_scale: !0,
  category: "people"
}, Rf = {
  keywords: [
    "male",
    "boy",
    "man"
  ],
  char: "🙋‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, If = {
  keywords: [
    "female",
    "girl",
    "woman"
  ],
  char: "🙎",
  fitzpatrick_scale: !0,
  category: "people"
}, qf = {
  keywords: [
    "male",
    "boy",
    "man"
  ],
  char: "🙎‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Of = {
  keywords: [
    "female",
    "girl",
    "woman",
    "sad",
    "depressed",
    "discouraged",
    "unhappy"
  ],
  char: "🙍",
  fitzpatrick_scale: !0,
  category: "people"
}, Df = {
  keywords: [
    "male",
    "boy",
    "man",
    "sad",
    "depressed",
    "discouraged",
    "unhappy"
  ],
  char: "🙍‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Mf = {
  keywords: [
    "female",
    "girl",
    "woman"
  ],
  char: "💇",
  fitzpatrick_scale: !0,
  category: "people"
}, Bf = {
  keywords: [
    "male",
    "boy",
    "man"
  ],
  char: "💇‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Nf = {
  keywords: [
    "female",
    "girl",
    "woman",
    "head"
  ],
  char: "💆",
  fitzpatrick_scale: !0,
  category: "people"
}, Hf = {
  keywords: [
    "male",
    "boy",
    "man",
    "head"
  ],
  char: "💆‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Uf = {
  keywords: [
    "female",
    "woman",
    "spa",
    "steamroom",
    "sauna"
  ],
  char: "🧖‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Vf = {
  keywords: [
    "male",
    "man",
    "spa",
    "steamroom",
    "sauna"
  ],
  char: "🧖‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Wf = {
  keywords: [
    "pair",
    "love",
    "like",
    "affection",
    "human",
    "dating",
    "valentines",
    "marriage"
  ],
  char: "💑",
  fitzpatrick_scale: !1,
  category: "people"
}, Kf = {
  keywords: [
    "pair",
    "love",
    "like",
    "affection",
    "human",
    "dating",
    "valentines",
    "marriage"
  ],
  char: "👩‍❤️‍👩",
  fitzpatrick_scale: !1,
  category: "people"
}, Gf = {
  keywords: [
    "pair",
    "love",
    "like",
    "affection",
    "human",
    "dating",
    "valentines",
    "marriage"
  ],
  char: "👨‍❤️‍👨",
  fitzpatrick_scale: !1,
  category: "people"
}, Xf = {
  keywords: [
    "pair",
    "valentines",
    "love",
    "like",
    "dating",
    "marriage"
  ],
  char: "💏",
  fitzpatrick_scale: !1,
  category: "people"
}, Qf = {
  keywords: [
    "pair",
    "valentines",
    "love",
    "like",
    "dating",
    "marriage"
  ],
  char: "👩‍❤️‍💋‍👩",
  fitzpatrick_scale: !1,
  category: "people"
}, Jf = {
  keywords: [
    "pair",
    "valentines",
    "love",
    "like",
    "dating",
    "marriage"
  ],
  char: "👨‍❤️‍💋‍👨",
  fitzpatrick_scale: !1,
  category: "people"
}, Yf = {
  keywords: [
    "home",
    "parents",
    "child",
    "mom",
    "dad",
    "father",
    "mother",
    "people",
    "human"
  ],
  char: "👪",
  fitzpatrick_scale: !1,
  category: "people"
}, Zf = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "child"
  ],
  char: "👨‍👩‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, eh = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👩‍👧‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, ah = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👩‍👦‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, th = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👩‍👧‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, rh = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👩‍👩‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, oh = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👩‍👩‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, sh = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👩‍👩‍👧‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, ch = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👩‍👩‍👦‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, ih = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👩‍👩‍👧‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, nh = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👨‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, lh = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👨‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, dh = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👨‍👧‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, ph = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👨‍👦‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, fh = {
  keywords: [
    "home",
    "parents",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👨‍👧‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, hh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "child"
  ],
  char: "👩‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, yh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "child"
  ],
  char: "👩‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, gh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "children"
  ],
  char: "👩‍👧‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, _h = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "children"
  ],
  char: "👩‍👦‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, uh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "children"
  ],
  char: "👩‍👧‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, mh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "child"
  ],
  char: "👨‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, kh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "child"
  ],
  char: "👨‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, wh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👧‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, bh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👦‍👦",
  fitzpatrick_scale: !1,
  category: "people"
}, vh = {
  keywords: [
    "home",
    "parent",
    "people",
    "human",
    "children"
  ],
  char: "👨‍👧‍👧",
  fitzpatrick_scale: !1,
  category: "people"
}, zh = {
  keywords: [
    "ball",
    "crochet",
    "knit"
  ],
  char: "🧶",
  fitzpatrick_scale: !1,
  category: "people"
}, xh = {
  keywords: [
    "needle",
    "sewing",
    "spool",
    "string"
  ],
  char: "🧵",
  fitzpatrick_scale: !1,
  category: "people"
}, jh = {
  keywords: [
    "jacket"
  ],
  char: "🧥",
  fitzpatrick_scale: !1,
  category: "people"
}, Ch = {
  keywords: [
    "doctor",
    "experiment",
    "scientist",
    "chemist"
  ],
  char: "🥼",
  fitzpatrick_scale: !1,
  category: "people"
}, Eh = {
  keywords: [
    "fashion",
    "shopping_bags",
    "female"
  ],
  char: "👚",
  fitzpatrick_scale: !1,
  category: "people"
}, Sh = {
  keywords: [
    "fashion",
    "cloth",
    "casual",
    "shirt",
    "tee"
  ],
  char: "👕",
  fitzpatrick_scale: !1,
  category: "people"
}, Ah = {
  keywords: [
    "fashion",
    "shopping"
  ],
  char: "👖",
  fitzpatrick_scale: !1,
  category: "people"
}, Lh = {
  keywords: [
    "shirt",
    "suitup",
    "formal",
    "fashion",
    "cloth",
    "business"
  ],
  char: "👔",
  fitzpatrick_scale: !1,
  category: "people"
}, $h = {
  keywords: [
    "clothes",
    "fashion",
    "shopping"
  ],
  char: "👗",
  fitzpatrick_scale: !1,
  category: "people"
}, Th = {
  keywords: [
    "swimming",
    "female",
    "woman",
    "girl",
    "fashion",
    "beach",
    "summer"
  ],
  char: "👙",
  fitzpatrick_scale: !1,
  category: "people"
}, Fh = {
  keywords: [
    "dress",
    "fashion",
    "women",
    "female",
    "japanese"
  ],
  char: "👘",
  fitzpatrick_scale: !1,
  category: "people"
}, Ph = {
  keywords: [
    "female",
    "girl",
    "fashion",
    "woman"
  ],
  char: "💄",
  fitzpatrick_scale: !1,
  category: "people"
}, Rh = {
  keywords: [
    "face",
    "lips",
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💋",
  fitzpatrick_scale: !1,
  category: "people"
}, Ih = {
  keywords: [
    "feet",
    "tracking",
    "walking",
    "beach"
  ],
  char: "👣",
  fitzpatrick_scale: !1,
  category: "people"
}, qh = {
  keywords: [
    "ballet",
    "slip-on",
    "slipper"
  ],
  char: "🥿",
  fitzpatrick_scale: !1,
  category: "people"
}, Oh = {
  keywords: [
    "fashion",
    "shoes",
    "female",
    "pumps",
    "stiletto"
  ],
  char: "👠",
  fitzpatrick_scale: !1,
  category: "people"
}, Dh = {
  keywords: [
    "shoes",
    "fashion",
    "flip flops"
  ],
  char: "👡",
  fitzpatrick_scale: !1,
  category: "people"
}, Mh = {
  keywords: [
    "shoes",
    "fashion"
  ],
  char: "👢",
  fitzpatrick_scale: !1,
  category: "people"
}, Bh = {
  keywords: [
    "fashion",
    "male"
  ],
  char: "👞",
  fitzpatrick_scale: !1,
  category: "people"
}, Nh = {
  keywords: [
    "shoes",
    "sports",
    "sneakers"
  ],
  char: "👟",
  fitzpatrick_scale: !1,
  category: "people"
}, Hh = {
  keywords: [
    "backpacking",
    "camping",
    "hiking"
  ],
  char: "🥾",
  fitzpatrick_scale: !1,
  category: "people"
}, Uh = {
  keywords: [
    "stockings",
    "clothes"
  ],
  char: "🧦",
  fitzpatrick_scale: !1,
  category: "people"
}, Vh = {
  keywords: [
    "hands",
    "winter",
    "clothes"
  ],
  char: "🧤",
  fitzpatrick_scale: !1,
  category: "people"
}, Wh = {
  keywords: [
    "neck",
    "winter",
    "clothes"
  ],
  char: "🧣",
  fitzpatrick_scale: !1,
  category: "people"
}, Kh = {
  keywords: [
    "fashion",
    "accessories",
    "female",
    "lady",
    "spring"
  ],
  char: "👒",
  fitzpatrick_scale: !1,
  category: "people"
}, Gh = {
  keywords: [
    "magic",
    "gentleman",
    "classy",
    "circus"
  ],
  char: "🎩",
  fitzpatrick_scale: !1,
  category: "people"
}, Xh = {
  keywords: [
    "cap",
    "baseball"
  ],
  char: "🧢",
  fitzpatrick_scale: !1,
  category: "people"
}, Qh = {
  keywords: [
    "construction",
    "build"
  ],
  char: "⛑",
  fitzpatrick_scale: !1,
  category: "people"
}, Jh = {
  keywords: [
    "school",
    "college",
    "degree",
    "university",
    "graduation",
    "cap",
    "hat",
    "legal",
    "learn",
    "education"
  ],
  char: "🎓",
  fitzpatrick_scale: !1,
  category: "people"
}, Yh = {
  keywords: [
    "king",
    "kod",
    "leader",
    "royalty",
    "lord"
  ],
  char: "👑",
  fitzpatrick_scale: !1,
  category: "people"
}, Zh = {
  keywords: [
    "student",
    "education",
    "bag",
    "backpack"
  ],
  char: "🎒",
  fitzpatrick_scale: !1,
  category: "people"
}, ey = {
  keywords: [
    "packing",
    "travel"
  ],
  char: "🧳",
  fitzpatrick_scale: !1,
  category: "people"
}, ay = {
  keywords: [
    "bag",
    "accessories",
    "shopping"
  ],
  char: "👝",
  fitzpatrick_scale: !1,
  category: "people"
}, ty = {
  keywords: [
    "fashion",
    "accessories",
    "money",
    "sales",
    "shopping"
  ],
  char: "👛",
  fitzpatrick_scale: !1,
  category: "people"
}, ry = {
  keywords: [
    "fashion",
    "accessory",
    "accessories",
    "shopping"
  ],
  char: "👜",
  fitzpatrick_scale: !1,
  category: "people"
}, oy = {
  keywords: [
    "business",
    "documents",
    "work",
    "law",
    "legal",
    "job",
    "career"
  ],
  char: "💼",
  fitzpatrick_scale: !1,
  category: "people"
}, sy = {
  keywords: [
    "fashion",
    "accessories",
    "eyesight",
    "nerdy",
    "dork",
    "geek"
  ],
  char: "👓",
  fitzpatrick_scale: !1,
  category: "people"
}, cy = {
  keywords: [
    "face",
    "cool",
    "accessories"
  ],
  char: "🕶",
  fitzpatrick_scale: !1,
  category: "people"
}, iy = {
  keywords: [
    "eyes",
    "protection",
    "safety"
  ],
  char: "🥽",
  fitzpatrick_scale: !1,
  category: "people"
}, ny = {
  keywords: [
    "wedding",
    "propose",
    "marriage",
    "valentines",
    "diamond",
    "fashion",
    "jewelry",
    "gem",
    "engagement"
  ],
  char: "💍",
  fitzpatrick_scale: !1,
  category: "people"
}, ly = {
  keywords: [
    "weather",
    "rain",
    "drizzle"
  ],
  char: "🌂",
  fitzpatrick_scale: !1,
  category: "people"
}, dy = {
  keywords: [
    "animal",
    "friend",
    "nature",
    "woof",
    "puppy",
    "pet",
    "faithful"
  ],
  char: "🐶",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, py = {
  keywords: [
    "animal",
    "meow",
    "nature",
    "pet",
    "kitten"
  ],
  char: "🐱",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, fy = {
  keywords: [
    "animal",
    "nature",
    "cheese_wedge",
    "rodent"
  ],
  char: "🐭",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, hy = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐹",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, yy = {
  keywords: [
    "animal",
    "nature",
    "pet",
    "spring",
    "magic",
    "bunny"
  ],
  char: "🐰",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, gy = {
  keywords: [
    "animal",
    "nature",
    "face"
  ],
  char: "🦊",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, _y = {
  keywords: [
    "animal",
    "nature",
    "wild"
  ],
  char: "🐻",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, uy = {
  keywords: [
    "animal",
    "nature",
    "panda"
  ],
  char: "🐼",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, my = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐨",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ky = {
  keywords: [
    "animal",
    "cat",
    "danger",
    "wild",
    "nature",
    "roar"
  ],
  char: "🐯",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, wy = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🦁",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, by = {
  keywords: [
    "beef",
    "ox",
    "animal",
    "nature",
    "moo",
    "milk"
  ],
  char: "🐮",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, vy = {
  keywords: [
    "animal",
    "oink",
    "nature"
  ],
  char: "🐷",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, zy = {
  keywords: [
    "animal",
    "oink"
  ],
  char: "🐽",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, xy = {
  keywords: [
    "animal",
    "nature",
    "croak",
    "toad"
  ],
  char: "🐸",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, jy = {
  keywords: [
    "animal",
    "nature",
    "ocean",
    "sea"
  ],
  char: "🦑",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Cy = {
  keywords: [
    "animal",
    "creature",
    "ocean",
    "sea",
    "nature",
    "beach"
  ],
  char: "🐙",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ey = {
  keywords: [
    "animal",
    "ocean",
    "nature",
    "seafood"
  ],
  char: "🦐",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Sy = {
  keywords: [
    "animal",
    "nature",
    "circus"
  ],
  char: "🐵",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ay = {
  keywords: [
    "animal",
    "nature",
    "circus"
  ],
  char: "🦍",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ly = {
  keywords: [
    "monkey",
    "animal",
    "nature",
    "haha"
  ],
  char: "🙈",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, $y = {
  keywords: [
    "animal",
    "monkey",
    "nature"
  ],
  char: "🙉",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ty = {
  keywords: [
    "monkey",
    "animal",
    "nature",
    "omg"
  ],
  char: "🙊",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Fy = {
  keywords: [
    "animal",
    "nature",
    "banana",
    "circus"
  ],
  char: "🐒",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Py = {
  keywords: [
    "animal",
    "cluck",
    "nature",
    "bird"
  ],
  char: "🐔",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ry = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐧",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Iy = {
  keywords: [
    "animal",
    "nature",
    "fly",
    "tweet",
    "spring"
  ],
  char: "🐦",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, qy = {
  keywords: [
    "animal",
    "chicken",
    "bird"
  ],
  char: "🐤",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Oy = {
  keywords: [
    "animal",
    "chicken",
    "egg",
    "born",
    "baby",
    "bird"
  ],
  char: "🐣",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Dy = {
  keywords: [
    "animal",
    "chicken",
    "baby",
    "bird"
  ],
  char: "🐥",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, My = {
  keywords: [
    "animal",
    "nature",
    "bird",
    "mallard"
  ],
  char: "🦆",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, By = {
  keywords: [
    "animal",
    "nature",
    "bird"
  ],
  char: "🦅",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ny = {
  keywords: [
    "animal",
    "nature",
    "bird",
    "hoot"
  ],
  char: "🦉",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Hy = {
  keywords: [
    "animal",
    "nature",
    "blind",
    "vampire"
  ],
  char: "🦇",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Uy = {
  keywords: [
    "animal",
    "nature",
    "wild"
  ],
  char: "🐺",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Vy = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐗",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Wy = {
  keywords: [
    "animal",
    "brown",
    "nature"
  ],
  char: "🐴",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ky = {
  keywords: [
    "animal",
    "nature",
    "mystical"
  ],
  char: "🦄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Gy = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "bug",
    "spring",
    "honey"
  ],
  char: "🐝",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Xy = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "worm"
  ],
  char: "🐛",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Qy = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "caterpillar"
  ],
  char: "🦋",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Jy = {
  keywords: [
    "slow",
    "animal",
    "shell"
  ],
  char: "🐌",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Yy = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "ladybug"
  ],
  char: "🐞",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Zy = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "bug"
  ],
  char: "🐜",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, eg = {
  keywords: [
    "animal",
    "cricket",
    "chirp"
  ],
  char: "🦗",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ag = {
  keywords: [
    "animal",
    "arachnid"
  ],
  char: "🕷",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, tg = {
  keywords: [
    "animal",
    "arachnid"
  ],
  char: "🦂",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, rg = {
  keywords: [
    "animal",
    "crustacean"
  ],
  char: "🦀",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, og = {
  keywords: [
    "animal",
    "evil",
    "nature",
    "hiss",
    "python"
  ],
  char: "🐍",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, sg = {
  keywords: [
    "animal",
    "nature",
    "reptile"
  ],
  char: "🦎",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, cg = {
  keywords: [
    "animal",
    "nature",
    "dinosaur",
    "brachiosaurus",
    "brontosaurus",
    "diplodocus",
    "extinct"
  ],
  char: "🦕",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ig = {
  keywords: [
    "animal",
    "slow",
    "nature",
    "tortoise"
  ],
  char: "🐢",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ng = {
  keywords: [
    "animal",
    "swim",
    "ocean",
    "beach",
    "nemo"
  ],
  char: "🐠",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, lg = {
  keywords: [
    "animal",
    "food",
    "nature"
  ],
  char: "🐟",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, dg = {
  keywords: [
    "animal",
    "nature",
    "food",
    "sea",
    "ocean"
  ],
  char: "🐡",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, pg = {
  keywords: [
    "animal",
    "nature",
    "fish",
    "sea",
    "ocean",
    "flipper",
    "fins",
    "beach"
  ],
  char: "🐬",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, fg = {
  keywords: [
    "animal",
    "nature",
    "fish",
    "sea",
    "ocean",
    "jaws",
    "fins",
    "beach"
  ],
  char: "🦈",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, hg = {
  keywords: [
    "animal",
    "nature",
    "sea",
    "ocean"
  ],
  char: "🐳",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, yg = {
  keywords: [
    "animal",
    "nature",
    "sea",
    "ocean"
  ],
  char: "🐋",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, gg = {
  keywords: [
    "animal",
    "nature",
    "reptile",
    "lizard",
    "alligator"
  ],
  char: "🐊",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, _g = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐆",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ug = {
  keywords: [
    "animal",
    "nature",
    "stripes",
    "safari"
  ],
  char: "🦓",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, mg = {
  keywords: [
    "animal",
    "nature",
    "roar"
  ],
  char: "🐅",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, kg = {
  keywords: [
    "animal",
    "nature",
    "ox",
    "cow"
  ],
  char: "🐃",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, wg = {
  keywords: [
    "animal",
    "cow",
    "beef"
  ],
  char: "🐂",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, bg = {
  keywords: [
    "beef",
    "ox",
    "animal",
    "nature",
    "moo",
    "milk"
  ],
  char: "🐄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, vg = {
  keywords: [
    "animal",
    "nature",
    "horns",
    "venison"
  ],
  char: "🦌",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, zg = {
  keywords: [
    "animal",
    "hot",
    "desert",
    "hump"
  ],
  char: "🐪",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, xg = {
  keywords: [
    "animal",
    "nature",
    "hot",
    "desert",
    "hump"
  ],
  char: "🐫",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, jg = {
  keywords: [
    "animal",
    "nature",
    "spots",
    "safari"
  ],
  char: "🦒",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Cg = {
  keywords: [
    "animal",
    "nature",
    "nose",
    "th",
    "circus"
  ],
  char: "🐘",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Eg = {
  keywords: [
    "animal",
    "nature",
    "horn"
  ],
  char: "🦏",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Sg = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐐",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ag = {
  keywords: [
    "animal",
    "sheep",
    "nature"
  ],
  char: "🐏",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Lg = {
  keywords: [
    "animal",
    "nature",
    "wool",
    "shipit"
  ],
  char: "🐑",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, $g = {
  keywords: [
    "animal",
    "gamble",
    "luck"
  ],
  char: "🐎",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Tg = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐖",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Fg = {
  keywords: [
    "animal",
    "mouse",
    "rodent"
  ],
  char: "🐀",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Pg = {
  keywords: [
    "animal",
    "nature",
    "rodent"
  ],
  char: "🐁",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Rg = {
  keywords: [
    "animal",
    "nature",
    "chicken"
  ],
  char: "🐓",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ig = {
  keywords: [
    "animal",
    "bird"
  ],
  char: "🦃",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, qg = {
  keywords: [
    "animal",
    "bird"
  ],
  char: "🕊",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Og = {
  keywords: [
    "animal",
    "nature",
    "friend",
    "doge",
    "pet",
    "faithful"
  ],
  char: "🐕",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Dg = {
  keywords: [
    "dog",
    "animal",
    "101",
    "nature",
    "pet"
  ],
  char: "🐩",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Mg = {
  keywords: [
    "animal",
    "meow",
    "pet",
    "cats"
  ],
  char: "🐈",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Bg = {
  keywords: [
    "animal",
    "nature",
    "pet",
    "magic",
    "spring"
  ],
  char: "🐇",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ng = {
  keywords: [
    "animal",
    "nature",
    "rodent",
    "squirrel"
  ],
  char: "🐿",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Hg = {
  keywords: [
    "animal",
    "nature",
    "spiny"
  ],
  char: "🦔",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ug = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🦝",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Vg = {
  keywords: [
    "animal",
    "nature",
    "alpaca"
  ],
  char: "🦙",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Wg = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🦛",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Kg = {
  keywords: [
    "animal",
    "nature",
    "australia",
    "joey",
    "hop",
    "marsupial"
  ],
  char: "🦘",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Gg = {
  keywords: [
    "animal",
    "nature",
    "honey"
  ],
  char: "🦡",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Xg = {
  keywords: [
    "animal",
    "nature",
    "bird"
  ],
  char: "🦢",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Qg = {
  keywords: [
    "animal",
    "nature",
    "peahen",
    "bird"
  ],
  char: "🦚",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Jg = {
  keywords: [
    "animal",
    "nature",
    "bird",
    "pirate",
    "talk"
  ],
  char: "🦜",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Yg = {
  keywords: [
    "animal",
    "nature",
    "bisque",
    "claws",
    "seafood"
  ],
  char: "🦞",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Zg = {
  keywords: [
    "animal",
    "nature",
    "insect",
    "malaria"
  ],
  char: "🦟",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, e_ = {
  keywords: [
    "animal",
    "tracking",
    "footprints",
    "dog",
    "cat",
    "pet",
    "feet"
  ],
  char: "🐾",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, a_ = {
  keywords: [
    "animal",
    "myth",
    "nature",
    "chinese",
    "green"
  ],
  char: "🐉",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, t_ = {
  keywords: [
    "animal",
    "myth",
    "nature",
    "chinese",
    "green"
  ],
  char: "🐲",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, r_ = {
  keywords: [
    "vegetable",
    "plant",
    "nature"
  ],
  char: "🌵",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, o_ = {
  keywords: [
    "festival",
    "vacation",
    "december",
    "xmas",
    "celebration"
  ],
  char: "🎄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, s_ = {
  keywords: [
    "plant",
    "nature"
  ],
  char: "🌲",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, c_ = {
  keywords: [
    "plant",
    "nature"
  ],
  char: "🌳",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, i_ = {
  keywords: [
    "plant",
    "vegetable",
    "nature",
    "summer",
    "beach",
    "mojito",
    "tropical"
  ],
  char: "🌴",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, n_ = {
  keywords: [
    "plant",
    "nature",
    "grass",
    "lawn",
    "spring"
  ],
  char: "🌱",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, l_ = {
  keywords: [
    "vegetable",
    "plant",
    "medicine",
    "weed",
    "grass",
    "lawn"
  ],
  char: "🌿",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, d_ = {
  keywords: [
    "vegetable",
    "plant",
    "nature",
    "irish",
    "clover"
  ],
  char: "☘",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, p_ = {
  keywords: [
    "vegetable",
    "plant",
    "nature",
    "lucky",
    "irish"
  ],
  char: "🍀",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, f_ = {
  keywords: [
    "plant",
    "nature",
    "vegetable",
    "panda",
    "pine_decoration"
  ],
  char: "🎍",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, h_ = {
  keywords: [
    "plant",
    "nature",
    "branch",
    "summer"
  ],
  char: "🎋",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, y_ = {
  keywords: [
    "nature",
    "plant",
    "tree",
    "vegetable",
    "grass",
    "lawn",
    "spring"
  ],
  char: "🍃",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, g_ = {
  keywords: [
    "nature",
    "plant",
    "vegetable",
    "leaves"
  ],
  char: "🍂",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, __ = {
  keywords: [
    "nature",
    "plant",
    "vegetable",
    "ca",
    "fall"
  ],
  char: "🍁",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, u_ = {
  keywords: [
    "nature",
    "plant"
  ],
  char: "🌾",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, m_ = {
  keywords: [
    "plant",
    "vegetable",
    "flowers",
    "beach"
  ],
  char: "🌺",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, k_ = {
  keywords: [
    "nature",
    "plant",
    "fall"
  ],
  char: "🌻",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, w_ = {
  keywords: [
    "flowers",
    "valentines",
    "love",
    "spring"
  ],
  char: "🌹",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, b_ = {
  keywords: [
    "plant",
    "nature",
    "flower"
  ],
  char: "🥀",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, v_ = {
  keywords: [
    "flowers",
    "plant",
    "nature",
    "summer",
    "spring"
  ],
  char: "🌷",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, z_ = {
  keywords: [
    "nature",
    "flowers",
    "yellow"
  ],
  char: "🌼",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, x_ = {
  keywords: [
    "nature",
    "plant",
    "spring",
    "flower"
  ],
  char: "🌸",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, j_ = {
  keywords: [
    "flowers",
    "nature",
    "spring"
  ],
  char: "💐",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, C_ = {
  keywords: [
    "plant",
    "vegetable"
  ],
  char: "🍄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, E_ = {
  keywords: [
    "food",
    "squirrel"
  ],
  char: "🌰",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, S_ = {
  keywords: [
    "halloween",
    "light",
    "pumpkin",
    "creepy",
    "fall"
  ],
  char: "🎃",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, A_ = {
  keywords: [
    "nature",
    "sea",
    "beach"
  ],
  char: "🐚",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, L_ = {
  keywords: [
    "animal",
    "insect",
    "arachnid",
    "silk"
  ],
  char: "🕸",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, $_ = {
  keywords: [
    "globe",
    "world",
    "USA",
    "international"
  ],
  char: "🌎",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, T_ = {
  keywords: [
    "globe",
    "world",
    "international"
  ],
  char: "🌍",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, F_ = {
  keywords: [
    "globe",
    "world",
    "east",
    "international"
  ],
  char: "🌏",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, P_ = {
  keywords: [
    "nature",
    "yellow",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌕",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, R_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep",
    "waxing_gibbous_moon"
  ],
  char: "🌖",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, I_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌗",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, q_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌘",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, O_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌑",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, D_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌒",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, M_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌓",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, B_ = {
  keywords: [
    "nature",
    "night",
    "sky",
    "gray",
    "twilight",
    "planet",
    "space",
    "evening",
    "sleep"
  ],
  char: "🌔",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, N_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌚",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, H_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌝",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, U_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌛",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, V_ = {
  keywords: [
    "nature",
    "twilight",
    "planet",
    "space",
    "night",
    "evening",
    "sleep"
  ],
  char: "🌜",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, W_ = {
  keywords: [
    "nature",
    "morning",
    "sky"
  ],
  char: "🌞",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, K_ = {
  keywords: [
    "night",
    "sleep",
    "sky",
    "evening",
    "magic"
  ],
  char: "🌙",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, G_ = {
  keywords: [
    "night",
    "yellow"
  ],
  char: "⭐",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, X_ = {
  keywords: [
    "night",
    "sparkle",
    "awesome",
    "good",
    "magic"
  ],
  char: "🌟",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Q_ = {
  keywords: [
    "star",
    "sparkle",
    "shoot",
    "magic"
  ],
  char: "💫",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, J_ = {
  keywords: [
    "stars",
    "shine",
    "shiny",
    "cool",
    "awesome",
    "good",
    "magic"
  ],
  char: "✨",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Y_ = {
  keywords: [
    "space"
  ],
  char: "☄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Z_ = {
  keywords: [
    "weather",
    "nature",
    "brightness",
    "summer",
    "beach",
    "spring"
  ],
  char: "☀️",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, eu = {
  keywords: [
    "weather"
  ],
  char: "🌤",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, au = {
  keywords: [
    "weather",
    "nature",
    "cloudy",
    "morning",
    "fall",
    "spring"
  ],
  char: "⛅",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, tu = {
  keywords: [
    "weather"
  ],
  char: "🌥",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ru = {
  keywords: [
    "weather"
  ],
  char: "🌦",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ou = {
  keywords: [
    "weather",
    "sky"
  ],
  char: "☁️",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, su = {
  keywords: [
    "weather"
  ],
  char: "🌧",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, cu = {
  keywords: [
    "weather",
    "lightning"
  ],
  char: "⛈",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, iu = {
  keywords: [
    "weather",
    "thunder"
  ],
  char: "🌩",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, nu = {
  keywords: [
    "thunder",
    "weather",
    "lightning bolt",
    "fast"
  ],
  char: "⚡",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, lu = {
  keywords: [
    "hot",
    "cook",
    "flame"
  ],
  char: "🔥",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, du = {
  keywords: [
    "bomb",
    "explode",
    "explosion",
    "collision",
    "blown"
  ],
  char: "💥",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, pu = {
  keywords: [
    "winter",
    "season",
    "cold",
    "weather",
    "christmas",
    "xmas"
  ],
  char: "❄️",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, fu = {
  keywords: [
    "weather"
  ],
  char: "🌨",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, hu = {
  keywords: [
    "winter",
    "season",
    "cold",
    "weather",
    "christmas",
    "xmas",
    "frozen",
    "without_snow"
  ],
  char: "⛄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, yu = {
  keywords: [
    "winter",
    "season",
    "cold",
    "weather",
    "christmas",
    "xmas",
    "frozen"
  ],
  char: "☃",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, gu = {
  keywords: [
    "gust",
    "air"
  ],
  char: "🌬",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, _u = {
  keywords: [
    "wind",
    "air",
    "fast",
    "shoo",
    "fart",
    "smoke",
    "puff"
  ],
  char: "💨",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, uu = {
  keywords: [
    "weather",
    "cyclone",
    "twister"
  ],
  char: "🌪",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, mu = {
  keywords: [
    "weather"
  ],
  char: "🌫",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ku = {
  keywords: [
    "weather",
    "spring"
  ],
  char: "☂",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, wu = {
  keywords: [
    "rainy",
    "weather",
    "spring"
  ],
  char: "☔",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, bu = {
  keywords: [
    "water",
    "drip",
    "faucet",
    "spring"
  ],
  char: "💧",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, vu = {
  keywords: [
    "water",
    "drip",
    "oops"
  ],
  char: "💦",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, zu = {
  keywords: [
    "sea",
    "water",
    "wave",
    "nature",
    "tsunami",
    "disaster"
  ],
  char: "🌊",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, xu = {
  keywords: [
    "fruit",
    "nature"
  ],
  char: "🍏",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ju = {
  keywords: [
    "fruit",
    "mac",
    "school"
  ],
  char: "🍎",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Cu = {
  keywords: [
    "fruit",
    "nature",
    "food"
  ],
  char: "🍐",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Eu = {
  keywords: [
    "food",
    "fruit",
    "nature",
    "orange"
  ],
  char: "🍊",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Su = {
  keywords: [
    "fruit",
    "nature"
  ],
  char: "🍋",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Au = {
  keywords: [
    "fruit",
    "food",
    "monkey"
  ],
  char: "🍌",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Lu = {
  keywords: [
    "fruit",
    "food",
    "picnic",
    "summer"
  ],
  char: "🍉",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, $u = {
  keywords: [
    "fruit",
    "food",
    "wine"
  ],
  char: "🍇",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Tu = {
  keywords: [
    "fruit",
    "food",
    "nature"
  ],
  char: "🍓",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Fu = {
  keywords: [
    "fruit",
    "nature",
    "food"
  ],
  char: "🍈",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Pu = {
  keywords: [
    "food",
    "fruit"
  ],
  char: "🍒",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ru = {
  keywords: [
    "fruit",
    "nature",
    "food"
  ],
  char: "🍑",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Iu = {
  keywords: [
    "fruit",
    "nature",
    "food"
  ],
  char: "🍍",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, qu = {
  keywords: [
    "fruit",
    "nature",
    "food",
    "palm"
  ],
  char: "🥥",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ou = {
  keywords: [
    "fruit",
    "food"
  ],
  char: "🥝",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Du = {
  keywords: [
    "fruit",
    "food",
    "tropical"
  ],
  char: "🥭",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Mu = {
  keywords: [
    "fruit",
    "food"
  ],
  char: "🥑",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Bu = {
  keywords: [
    "fruit",
    "food",
    "vegetable"
  ],
  char: "🥦",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Nu = {
  keywords: [
    "fruit",
    "vegetable",
    "nature",
    "food"
  ],
  char: "🍅",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Hu = {
  keywords: [
    "vegetable",
    "nature",
    "food",
    "aubergine"
  ],
  char: "🍆",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Uu = {
  keywords: [
    "fruit",
    "food",
    "pickle"
  ],
  char: "🥒",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Vu = {
  keywords: [
    "vegetable",
    "food",
    "orange"
  ],
  char: "🥕",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Wu = {
  keywords: [
    "food",
    "spicy",
    "chilli",
    "chili"
  ],
  char: "🌶",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ku = {
  keywords: [
    "food",
    "tuber",
    "vegatable",
    "starch"
  ],
  char: "🥔",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Gu = {
  keywords: [
    "food",
    "vegetable",
    "plant"
  ],
  char: "🌽",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Xu = {
  keywords: [
    "food",
    "vegetable",
    "plant",
    "bok choy",
    "cabbage",
    "kale",
    "lettuce"
  ],
  char: "🥬",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Qu = {
  keywords: [
    "food",
    "nature"
  ],
  char: "🍠",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ju = {
  keywords: [
    "food",
    "nut"
  ],
  char: "🥜",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Yu = {
  keywords: [
    "bees",
    "sweet",
    "kitchen"
  ],
  char: "🍯",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Zu = {
  keywords: [
    "food",
    "bread",
    "french"
  ],
  char: "🥐",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, em = {
  keywords: [
    "food",
    "wheat",
    "breakfast",
    "toast"
  ],
  char: "🍞",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, am = {
  keywords: [
    "food",
    "bread",
    "french"
  ],
  char: "🥖",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, tm = {
  keywords: [
    "food",
    "bread",
    "bakery",
    "schmear"
  ],
  char: "🥯",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, rm = {
  keywords: [
    "food",
    "bread",
    "twisted"
  ],
  char: "🥨",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, om = {
  keywords: [
    "food",
    "chadder"
  ],
  char: "🧀",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, sm = {
  keywords: [
    "food",
    "chicken",
    "breakfast"
  ],
  char: "🥚",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, cm = {
  keywords: [
    "food",
    "breakfast",
    "pork",
    "pig",
    "meat"
  ],
  char: "🥓",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, im = {
  keywords: [
    "food",
    "cow",
    "meat",
    "cut",
    "chop",
    "lambchop",
    "porkchop"
  ],
  char: "🥩",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, nm = {
  keywords: [
    "food",
    "breakfast",
    "flapjacks",
    "hotcakes"
  ],
  char: "🥞",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, lm = {
  keywords: [
    "food",
    "meat",
    "drumstick",
    "bird",
    "chicken",
    "turkey"
  ],
  char: "🍗",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, dm = {
  keywords: [
    "good",
    "food",
    "drumstick"
  ],
  char: "🍖",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, pm = {
  keywords: [
    "skeleton"
  ],
  char: "🦴",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, fm = {
  keywords: [
    "food",
    "animal",
    "appetizer",
    "summer"
  ],
  char: "🍤",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, hm = {
  keywords: [
    "food",
    "breakfast",
    "kitchen",
    "egg"
  ],
  char: "🍳",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ym = {
  keywords: [
    "meat",
    "fast food",
    "beef",
    "cheeseburger",
    "mcdonalds",
    "burger king"
  ],
  char: "🍔",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, gm = {
  keywords: [
    "chips",
    "snack",
    "fast food"
  ],
  char: "🍟",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, _m = {
  keywords: [
    "food",
    "flatbread",
    "stuffed",
    "gyro"
  ],
  char: "🥙",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, um = {
  keywords: [
    "food",
    "frankfurter"
  ],
  char: "🌭",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, mm = {
  keywords: [
    "food",
    "party"
  ],
  char: "🍕",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, km = {
  keywords: [
    "food",
    "lunch",
    "bread"
  ],
  char: "🥪",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, wm = {
  keywords: [
    "food",
    "soup"
  ],
  char: "🥫",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, bm = {
  keywords: [
    "food",
    "italian",
    "noodle"
  ],
  char: "🍝",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, vm = {
  keywords: [
    "food",
    "mexican"
  ],
  char: "🌮",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, zm = {
  keywords: [
    "food",
    "mexican"
  ],
  char: "🌯",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, xm = {
  keywords: [
    "food",
    "healthy",
    "lettuce"
  ],
  char: "🥗",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, jm = {
  keywords: [
    "food",
    "cooking",
    "casserole",
    "paella"
  ],
  char: "🥘",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Cm = {
  keywords: [
    "food",
    "japanese",
    "noodle",
    "chopsticks"
  ],
  char: "🍜",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Em = {
  keywords: [
    "food",
    "meat",
    "soup"
  ],
  char: "🍲",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Sm = {
  keywords: [
    "food",
    "japan",
    "sea",
    "beach",
    "narutomaki",
    "pink",
    "swirl",
    "kamaboko",
    "surimi",
    "ramen"
  ],
  char: "🍥",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Am = {
  keywords: [
    "food",
    "prophecy"
  ],
  char: "🥠",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Lm = {
  keywords: [
    "food",
    "fish",
    "japanese",
    "rice"
  ],
  char: "🍣",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, $m = {
  keywords: [
    "food",
    "japanese",
    "box"
  ],
  char: "🍱",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Tm = {
  keywords: [
    "food",
    "spicy",
    "hot",
    "indian"
  ],
  char: "🍛",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Fm = {
  keywords: [
    "food",
    "japanese"
  ],
  char: "🍙",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Pm = {
  keywords: [
    "food",
    "china",
    "asian"
  ],
  char: "🍚",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Rm = {
  keywords: [
    "food",
    "japanese"
  ],
  char: "🍘",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Im = {
  keywords: [
    "food",
    "japanese"
  ],
  char: "🍢",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, qm = {
  keywords: [
    "food",
    "dessert",
    "sweet",
    "japanese",
    "barbecue",
    "meat"
  ],
  char: "🍡",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Om = {
  keywords: [
    "hot",
    "dessert",
    "summer"
  ],
  char: "🍧",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Dm = {
  keywords: [
    "food",
    "hot",
    "dessert"
  ],
  char: "🍨",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Mm = {
  keywords: [
    "food",
    "hot",
    "dessert",
    "summer"
  ],
  char: "🍦",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Bm = {
  keywords: [
    "food",
    "dessert",
    "pastry"
  ],
  char: "🥧",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Nm = {
  keywords: [
    "food",
    "dessert"
  ],
  char: "🍰",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Hm = {
  keywords: [
    "food",
    "dessert",
    "bakery",
    "sweet"
  ],
  char: "🧁",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Um = {
  keywords: [
    "food",
    "autumn"
  ],
  char: "🥮",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Vm = {
  keywords: [
    "food",
    "dessert",
    "cake"
  ],
  char: "🎂",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Wm = {
  keywords: [
    "dessert",
    "food"
  ],
  char: "🍮",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Km = {
  keywords: [
    "snack",
    "dessert",
    "sweet",
    "lolly"
  ],
  char: "🍬",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Gm = {
  keywords: [
    "food",
    "snack",
    "candy",
    "sweet"
  ],
  char: "🍭",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Xm = {
  keywords: [
    "food",
    "snack",
    "dessert",
    "sweet"
  ],
  char: "🍫",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Qm = {
  keywords: [
    "food",
    "movie theater",
    "films",
    "snack"
  ],
  char: "🍿",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Jm = {
  keywords: [
    "food",
    "empanada",
    "pierogi",
    "potsticker"
  ],
  char: "🥟",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ym = {
  keywords: [
    "food",
    "dessert",
    "snack",
    "sweet",
    "donut"
  ],
  char: "🍩",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Zm = {
  keywords: [
    "food",
    "snack",
    "oreo",
    "chocolate",
    "sweet",
    "dessert"
  ],
  char: "🍪",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ek = {
  keywords: [
    "beverage",
    "drink",
    "cow"
  ],
  char: "🥛",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ak = {
  keywords: [
    "relax",
    "beverage",
    "drink",
    "drunk",
    "party",
    "pub",
    "summer",
    "alcohol",
    "booze"
  ],
  char: "🍺",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, tk = {
  keywords: [
    "relax",
    "beverage",
    "drink",
    "drunk",
    "party",
    "pub",
    "summer",
    "alcohol",
    "booze"
  ],
  char: "🍻",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, rk = {
  keywords: [
    "beverage",
    "drink",
    "party",
    "alcohol",
    "celebrate",
    "cheers",
    "wine",
    "champagne",
    "toast"
  ],
  char: "🥂",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ok = {
  keywords: [
    "drink",
    "beverage",
    "drunk",
    "alcohol",
    "booze"
  ],
  char: "🍷",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, sk = {
  keywords: [
    "drink",
    "beverage",
    "drunk",
    "alcohol",
    "liquor",
    "booze",
    "bourbon",
    "scotch",
    "whisky",
    "glass",
    "shot"
  ],
  char: "🥃",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ck = {
  keywords: [
    "drink",
    "drunk",
    "alcohol",
    "beverage",
    "booze",
    "mojito"
  ],
  char: "🍸",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ik = {
  keywords: [
    "beverage",
    "cocktail",
    "summer",
    "beach",
    "alcohol",
    "booze",
    "mojito"
  ],
  char: "🍹",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, nk = {
  keywords: [
    "drink",
    "wine",
    "bottle",
    "celebration"
  ],
  char: "🍾",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, lk = {
  keywords: [
    "wine",
    "drink",
    "drunk",
    "beverage",
    "japanese",
    "alcohol",
    "booze"
  ],
  char: "🍶",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, dk = {
  keywords: [
    "drink",
    "bowl",
    "breakfast",
    "green",
    "british"
  ],
  char: "🍵",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, pk = {
  keywords: [
    "drink",
    "soda"
  ],
  char: "🥤",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, fk = {
  keywords: [
    "beverage",
    "caffeine",
    "latte",
    "espresso"
  ],
  char: "☕",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, hk = {
  keywords: [
    "food",
    "container",
    "milk"
  ],
  char: "🍼",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, yk = {
  keywords: [
    "condiment",
    "shaker"
  ],
  char: "🧂",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, gk = {
  keywords: [
    "cutlery",
    "kitchen",
    "tableware"
  ],
  char: "🥄",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, _k = {
  keywords: [
    "cutlery",
    "kitchen"
  ],
  char: "🍴",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, uk = {
  keywords: [
    "food",
    "eat",
    "meal",
    "lunch",
    "dinner",
    "restaurant"
  ],
  char: "🍽",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, mk = {
  keywords: [
    "food",
    "breakfast",
    "cereal",
    "oatmeal",
    "porridge"
  ],
  char: "🥣",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, kk = {
  keywords: [
    "food",
    "leftovers"
  ],
  char: "🥡",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, wk = {
  keywords: [
    "food"
  ],
  char: "🥢",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, bk = {
  keywords: [
    "sports",
    "football"
  ],
  char: "⚽",
  fitzpatrick_scale: !1,
  category: "activity"
}, vk = {
  keywords: [
    "sports",
    "balls",
    "NBA"
  ],
  char: "🏀",
  fitzpatrick_scale: !1,
  category: "activity"
}, zk = {
  keywords: [
    "sports",
    "balls",
    "NFL"
  ],
  char: "🏈",
  fitzpatrick_scale: !1,
  category: "activity"
}, xk = {
  keywords: [
    "sports",
    "balls"
  ],
  char: "⚾",
  fitzpatrick_scale: !1,
  category: "activity"
}, jk = {
  keywords: [
    "sports",
    "balls"
  ],
  char: "🥎",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ck = {
  keywords: [
    "sports",
    "balls",
    "green"
  ],
  char: "🎾",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ek = {
  keywords: [
    "sports",
    "balls"
  ],
  char: "🏐",
  fitzpatrick_scale: !1,
  category: "activity"
}, Sk = {
  keywords: [
    "sports",
    "team"
  ],
  char: "🏉",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ak = {
  keywords: [
    "sports",
    "frisbee",
    "ultimate"
  ],
  char: "🥏",
  fitzpatrick_scale: !1,
  category: "activity"
}, Lk = {
  keywords: [
    "sports",
    "business",
    "flag",
    "hole",
    "summer"
  ],
  char: "⛳",
  fitzpatrick_scale: !1,
  category: "activity"
}, $k = {
  keywords: [
    "sports",
    "business",
    "woman",
    "female"
  ],
  char: "🏌️‍♀️",
  fitzpatrick_scale: !1,
  category: "activity"
}, Tk = {
  keywords: [
    "sports",
    "business"
  ],
  char: "🏌",
  fitzpatrick_scale: !0,
  category: "activity"
}, Fk = {
  keywords: [
    "sports",
    "pingpong"
  ],
  char: "🏓",
  fitzpatrick_scale: !1,
  category: "activity"
}, Pk = {
  keywords: [
    "sports"
  ],
  char: "🏸",
  fitzpatrick_scale: !1,
  category: "activity"
}, Rk = {
  keywords: [
    "sports"
  ],
  char: "🥅",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ik = {
  keywords: [
    "sports"
  ],
  char: "🏒",
  fitzpatrick_scale: !1,
  category: "activity"
}, qk = {
  keywords: [
    "sports"
  ],
  char: "🏑",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ok = {
  keywords: [
    "sports",
    "ball",
    "stick"
  ],
  char: "🥍",
  fitzpatrick_scale: !1,
  category: "activity"
}, Dk = {
  keywords: [
    "sports"
  ],
  char: "🏏",
  fitzpatrick_scale: !1,
  category: "activity"
}, Mk = {
  keywords: [
    "sports",
    "winter",
    "cold",
    "snow"
  ],
  char: "🎿",
  fitzpatrick_scale: !1,
  category: "activity"
}, Bk = {
  keywords: [
    "sports",
    "winter",
    "snow"
  ],
  char: "⛷",
  fitzpatrick_scale: !1,
  category: "activity"
}, Nk = {
  keywords: [
    "sports",
    "winter"
  ],
  char: "🏂",
  fitzpatrick_scale: !0,
  category: "activity"
}, Hk = {
  keywords: [
    "sports",
    "fencing",
    "sword"
  ],
  char: "🤺",
  fitzpatrick_scale: !1,
  category: "activity"
}, Uk = {
  keywords: [
    "sports",
    "wrestlers"
  ],
  char: "🤼‍♀️",
  fitzpatrick_scale: !1,
  category: "activity"
}, Vk = {
  keywords: [
    "sports",
    "wrestlers"
  ],
  char: "🤼‍♂️",
  fitzpatrick_scale: !1,
  category: "activity"
}, Wk = {
  keywords: [
    "gymnastics"
  ],
  char: "🤸‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Kk = {
  keywords: [
    "gymnastics"
  ],
  char: "🤸‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Gk = {
  keywords: [
    "sports"
  ],
  char: "🤾‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Xk = {
  keywords: [
    "sports"
  ],
  char: "🤾‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Qk = {
  keywords: [
    "sports"
  ],
  char: "⛸",
  fitzpatrick_scale: !1,
  category: "activity"
}, Jk = {
  keywords: [
    "sports"
  ],
  char: "🥌",
  fitzpatrick_scale: !1,
  category: "activity"
}, Yk = {
  keywords: [
    "board"
  ],
  char: "🛹",
  fitzpatrick_scale: !1,
  category: "activity"
}, Zk = {
  keywords: [
    "sleigh",
    "luge",
    "toboggan"
  ],
  char: "🛷",
  fitzpatrick_scale: !1,
  category: "activity"
}, ew = {
  keywords: [
    "sports"
  ],
  char: "🏹",
  fitzpatrick_scale: !1,
  category: "activity"
}, aw = {
  keywords: [
    "food",
    "hobby",
    "summer"
  ],
  char: "🎣",
  fitzpatrick_scale: !1,
  category: "activity"
}, tw = {
  keywords: [
    "sports",
    "fighting"
  ],
  char: "🥊",
  fitzpatrick_scale: !1,
  category: "activity"
}, rw = {
  keywords: [
    "judo",
    "karate",
    "taekwondo"
  ],
  char: "🥋",
  fitzpatrick_scale: !1,
  category: "activity"
}, ow = {
  keywords: [
    "sports",
    "hobby",
    "water",
    "ship",
    "woman",
    "female"
  ],
  char: "🚣‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, sw = {
  keywords: [
    "sports",
    "hobby",
    "water",
    "ship"
  ],
  char: "🚣",
  fitzpatrick_scale: !0,
  category: "activity"
}, cw = {
  keywords: [
    "sports",
    "hobby",
    "woman",
    "female",
    "rock"
  ],
  char: "🧗‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, iw = {
  keywords: [
    "sports",
    "hobby",
    "man",
    "male",
    "rock"
  ],
  char: "🧗‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, nw = {
  keywords: [
    "sports",
    "exercise",
    "human",
    "athlete",
    "water",
    "summer",
    "woman",
    "female"
  ],
  char: "🏊‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, lw = {
  keywords: [
    "sports",
    "exercise",
    "human",
    "athlete",
    "water",
    "summer"
  ],
  char: "🏊",
  fitzpatrick_scale: !0,
  category: "activity"
}, dw = {
  keywords: [
    "sports",
    "pool"
  ],
  char: "🤽‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, pw = {
  keywords: [
    "sports",
    "pool"
  ],
  char: "🤽‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, fw = {
  keywords: [
    "woman",
    "female",
    "meditation",
    "yoga",
    "serenity",
    "zen",
    "mindfulness"
  ],
  char: "🧘‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, hw = {
  keywords: [
    "man",
    "male",
    "meditation",
    "yoga",
    "serenity",
    "zen",
    "mindfulness"
  ],
  char: "🧘‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, yw = {
  keywords: [
    "sports",
    "ocean",
    "sea",
    "summer",
    "beach",
    "woman",
    "female"
  ],
  char: "🏄‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, gw = {
  keywords: [
    "sports",
    "ocean",
    "sea",
    "summer",
    "beach"
  ],
  char: "🏄",
  fitzpatrick_scale: !0,
  category: "activity"
}, _w = {
  keywords: [
    "clean",
    "shower",
    "bathroom"
  ],
  char: "🛀",
  fitzpatrick_scale: !0,
  category: "activity"
}, uw = {
  keywords: [
    "sports",
    "human",
    "woman",
    "female"
  ],
  char: "⛹️‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, mw = {
  keywords: [
    "sports",
    "human"
  ],
  char: "⛹",
  fitzpatrick_scale: !0,
  category: "activity"
}, kw = {
  keywords: [
    "sports",
    "training",
    "exercise",
    "woman",
    "female"
  ],
  char: "🏋️‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, ww = {
  keywords: [
    "sports",
    "training",
    "exercise"
  ],
  char: "🏋",
  fitzpatrick_scale: !0,
  category: "activity"
}, bw = {
  keywords: [
    "sports",
    "bike",
    "exercise",
    "hipster",
    "woman",
    "female"
  ],
  char: "🚴‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, vw = {
  keywords: [
    "sports",
    "bike",
    "exercise",
    "hipster"
  ],
  char: "🚴",
  fitzpatrick_scale: !0,
  category: "activity"
}, zw = {
  keywords: [
    "transportation",
    "sports",
    "human",
    "race",
    "bike",
    "woman",
    "female"
  ],
  char: "🚵‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, xw = {
  keywords: [
    "transportation",
    "sports",
    "human",
    "race",
    "bike"
  ],
  char: "🚵",
  fitzpatrick_scale: !0,
  category: "activity"
}, jw = {
  keywords: [
    "animal",
    "betting",
    "competition",
    "gambling",
    "luck"
  ],
  char: "🏇",
  fitzpatrick_scale: !0,
  category: "activity"
}, Cw = {
  keywords: [
    "suit",
    "business",
    "levitate",
    "hover",
    "jump"
  ],
  char: "🕴",
  fitzpatrick_scale: !0,
  category: "activity"
}, Ew = {
  keywords: [
    "win",
    "award",
    "contest",
    "place",
    "ftw",
    "ceremony"
  ],
  char: "🏆",
  fitzpatrick_scale: !1,
  category: "activity"
}, Sw = {
  keywords: [
    "play",
    "pageant"
  ],
  char: "🎽",
  fitzpatrick_scale: !1,
  category: "activity"
}, Aw = {
  keywords: [
    "award",
    "winning"
  ],
  char: "🏅",
  fitzpatrick_scale: !1,
  category: "activity"
}, Lw = {
  keywords: [
    "award",
    "winning",
    "army"
  ],
  char: "🎖",
  fitzpatrick_scale: !1,
  category: "activity"
}, $w = {
  keywords: [
    "sports",
    "cause",
    "support",
    "awareness"
  ],
  char: "🎗",
  fitzpatrick_scale: !1,
  category: "activity"
}, Tw = {
  keywords: [
    "flower",
    "decoration",
    "military"
  ],
  char: "🏵",
  fitzpatrick_scale: !1,
  category: "activity"
}, Fw = {
  keywords: [
    "event",
    "concert",
    "pass"
  ],
  char: "🎫",
  fitzpatrick_scale: !1,
  category: "activity"
}, Pw = {
  keywords: [
    "sports",
    "concert",
    "entrance"
  ],
  char: "🎟",
  fitzpatrick_scale: !1,
  category: "activity"
}, Rw = {
  keywords: [
    "acting",
    "theater",
    "drama"
  ],
  char: "🎭",
  fitzpatrick_scale: !1,
  category: "activity"
}, Iw = {
  keywords: [
    "design",
    "paint",
    "draw",
    "colors"
  ],
  char: "🎨",
  fitzpatrick_scale: !1,
  category: "activity"
}, qw = {
  keywords: [
    "festival",
    "carnival",
    "party"
  ],
  char: "🎪",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ow = {
  keywords: [
    "juggle",
    "balance",
    "skill",
    "multitask"
  ],
  char: "🤹‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Dw = {
  keywords: [
    "juggle",
    "balance",
    "skill",
    "multitask"
  ],
  char: "🤹‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Mw = {
  keywords: [
    "sound",
    "music",
    "PA",
    "sing",
    "talkshow"
  ],
  char: "🎤",
  fitzpatrick_scale: !1,
  category: "activity"
}, Bw = {
  keywords: [
    "music",
    "score",
    "gadgets"
  ],
  char: "🎧",
  fitzpatrick_scale: !1,
  category: "activity"
}, Nw = {
  keywords: [
    "treble",
    "clef",
    "compose"
  ],
  char: "🎼",
  fitzpatrick_scale: !1,
  category: "activity"
}, Hw = {
  keywords: [
    "piano",
    "instrument",
    "compose"
  ],
  char: "🎹",
  fitzpatrick_scale: !1,
  category: "activity"
}, Uw = {
  keywords: [
    "music",
    "instrument",
    "drumsticks",
    "snare"
  ],
  char: "🥁",
  fitzpatrick_scale: !1,
  category: "activity"
}, Vw = {
  keywords: [
    "music",
    "instrument",
    "jazz",
    "blues"
  ],
  char: "🎷",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ww = {
  keywords: [
    "music",
    "brass"
  ],
  char: "🎺",
  fitzpatrick_scale: !1,
  category: "activity"
}, Kw = {
  keywords: [
    "music",
    "instrument"
  ],
  char: "🎸",
  fitzpatrick_scale: !1,
  category: "activity"
}, Gw = {
  keywords: [
    "music",
    "instrument",
    "orchestra",
    "symphony"
  ],
  char: "🎻",
  fitzpatrick_scale: !1,
  category: "activity"
}, Xw = {
  keywords: [
    "movie",
    "film",
    "record"
  ],
  char: "🎬",
  fitzpatrick_scale: !1,
  category: "activity"
}, Qw = {
  keywords: [
    "play",
    "console",
    "PS4",
    "controller"
  ],
  char: "🎮",
  fitzpatrick_scale: !1,
  category: "activity"
}, Jw = {
  keywords: [
    "game",
    "arcade",
    "play"
  ],
  char: "👾",
  fitzpatrick_scale: !1,
  category: "activity"
}, Yw = {
  keywords: [
    "game",
    "play",
    "bar",
    "target",
    "bullseye"
  ],
  char: "🎯",
  fitzpatrick_scale: !1,
  category: "activity"
}, Zw = {
  keywords: [
    "dice",
    "random",
    "tabletop",
    "play",
    "luck"
  ],
  char: "🎲",
  fitzpatrick_scale: !1,
  category: "activity"
}, eb = {
  keywords: [
    "expendable"
  ],
  char: "♟",
  fitzpatrick_scale: !1,
  category: "activity"
}, ab = {
  keywords: [
    "bet",
    "gamble",
    "vegas",
    "fruit machine",
    "luck",
    "casino"
  ],
  char: "🎰",
  fitzpatrick_scale: !1,
  category: "activity"
}, tb = {
  keywords: [
    "interlocking",
    "puzzle",
    "piece"
  ],
  char: "🧩",
  fitzpatrick_scale: !1,
  category: "activity"
}, rb = {
  keywords: [
    "sports",
    "fun",
    "play"
  ],
  char: "🎳",
  fitzpatrick_scale: !1,
  category: "activity"
}, ob = {
  keywords: [
    "red",
    "transportation",
    "vehicle"
  ],
  char: "🚗",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, sb = {
  keywords: [
    "uber",
    "vehicle",
    "cars",
    "transportation"
  ],
  char: "🚕",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, cb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚙",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, ib = {
  keywords: [
    "car",
    "vehicle",
    "transportation"
  ],
  char: "🚌",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, nb = {
  keywords: [
    "bart",
    "transportation",
    "vehicle"
  ],
  char: "🚎",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, lb = {
  keywords: [
    "sports",
    "race",
    "fast",
    "formula",
    "f1"
  ],
  char: "🏎",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, db = {
  keywords: [
    "vehicle",
    "cars",
    "transportation",
    "law",
    "legal",
    "enforcement"
  ],
  char: "🚓",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, pb = {
  keywords: [
    "health",
    "911",
    "hospital"
  ],
  char: "🚑",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, fb = {
  keywords: [
    "transportation",
    "cars",
    "vehicle"
  ],
  char: "🚒",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, hb = {
  keywords: [
    "vehicle",
    "car",
    "transportation"
  ],
  char: "🚐",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, yb = {
  keywords: [
    "cars",
    "transportation"
  ],
  char: "🚚",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, gb = {
  keywords: [
    "vehicle",
    "cars",
    "transportation",
    "express"
  ],
  char: "🚛",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, _b = {
  keywords: [
    "vehicle",
    "car",
    "farming",
    "agriculture"
  ],
  char: "🚜",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, ub = {
  keywords: [
    "vehicle",
    "kick",
    "razor"
  ],
  char: "🛴",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, mb = {
  keywords: [
    "race",
    "sports",
    "fast"
  ],
  char: "🏍",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, kb = {
  keywords: [
    "sports",
    "bicycle",
    "exercise",
    "hipster"
  ],
  char: "🚲",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, wb = {
  keywords: [
    "vehicle",
    "vespa",
    "sasha"
  ],
  char: "🛵",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, bb = {
  keywords: [
    "police",
    "ambulance",
    "911",
    "emergency",
    "alert",
    "error",
    "pinged",
    "law",
    "legal"
  ],
  char: "🚨",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, vb = {
  keywords: [
    "vehicle",
    "law",
    "legal",
    "enforcement",
    "911"
  ],
  char: "🚔",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, zb = {
  keywords: [
    "vehicle",
    "transportation"
  ],
  char: "🚍",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, xb = {
  keywords: [
    "car",
    "vehicle",
    "transportation"
  ],
  char: "🚘",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, jb = {
  keywords: [
    "vehicle",
    "cars",
    "uber"
  ],
  char: "🚖",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Cb = {
  keywords: [
    "transportation",
    "vehicle",
    "ski"
  ],
  char: "🚡",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Eb = {
  keywords: [
    "transportation",
    "vehicle",
    "ski"
  ],
  char: "🚠",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Sb = {
  keywords: [
    "vehicle",
    "transportation"
  ],
  char: "🚟",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Ab = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚃",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Lb = {
  keywords: [
    "transportation",
    "vehicle",
    "carriage",
    "public",
    "travel"
  ],
  char: "🚋",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, $b = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚝",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Tb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚄",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Fb = {
  keywords: [
    "transportation",
    "vehicle",
    "speed",
    "fast",
    "public",
    "travel"
  ],
  char: "🚅",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Pb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚈",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Rb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚞",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Ib = {
  keywords: [
    "transportation",
    "vehicle",
    "train"
  ],
  char: "🚂",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, qb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚆",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Ob = {
  keywords: [
    "transportation",
    "blue-square",
    "mrt",
    "underground",
    "tube"
  ],
  char: "🚇",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Db = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚊",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Mb = {
  keywords: [
    "transportation",
    "vehicle",
    "public"
  ],
  char: "🚉",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Bb = {
  keywords: [
    "transportation",
    "vehicle",
    "ufo"
  ],
  char: "🛸",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Nb = {
  keywords: [
    "transportation",
    "vehicle",
    "fly"
  ],
  char: "🚁",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Hb = {
  keywords: [
    "flight",
    "transportation",
    "fly",
    "vehicle"
  ],
  char: "🛩",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Ub = {
  keywords: [
    "vehicle",
    "transportation",
    "flight",
    "fly"
  ],
  char: "✈️",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Vb = {
  keywords: [
    "airport",
    "flight",
    "landing"
  ],
  char: "🛫",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Wb = {
  keywords: [
    "airport",
    "flight",
    "boarding"
  ],
  char: "🛬",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Kb = {
  keywords: [
    "ship",
    "summer",
    "transportation",
    "water",
    "sailing"
  ],
  char: "⛵",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Gb = {
  keywords: [
    "ship"
  ],
  char: "🛥",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Xb = {
  keywords: [
    "ship",
    "transportation",
    "vehicle",
    "summer"
  ],
  char: "🚤",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Qb = {
  keywords: [
    "boat",
    "ship",
    "yacht"
  ],
  char: "⛴",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Jb = {
  keywords: [
    "yacht",
    "cruise",
    "ferry"
  ],
  char: "🛳",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Yb = {
  keywords: [
    "launch",
    "ship",
    "staffmode",
    "NASA",
    "outer space",
    "outer_space",
    "fly"
  ],
  char: "🚀",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Zb = {
  keywords: [
    "communication",
    "gps",
    "orbit",
    "spaceflight",
    "NASA",
    "ISS"
  ],
  char: "🛰",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, e1 = {
  keywords: [
    "sit",
    "airplane",
    "transport",
    "bus",
    "flight",
    "fly"
  ],
  char: "💺",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, a1 = {
  keywords: [
    "boat",
    "paddle",
    "water",
    "ship"
  ],
  char: "🛶",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, t1 = {
  keywords: [
    "ship",
    "ferry",
    "sea",
    "boat"
  ],
  char: "⚓",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, r1 = {
  keywords: [
    "wip",
    "progress",
    "caution",
    "warning"
  ],
  char: "🚧",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, o1 = {
  keywords: [
    "gas station",
    "petroleum"
  ],
  char: "⛽",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, s1 = {
  keywords: [
    "transportation",
    "wait"
  ],
  char: "🚏",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, c1 = {
  keywords: [
    "transportation",
    "driving"
  ],
  char: "🚦",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, i1 = {
  keywords: [
    "transportation",
    "signal"
  ],
  char: "🚥",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, n1 = {
  keywords: [
    "contest",
    "finishline",
    "race",
    "gokart"
  ],
  char: "🏁",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, l1 = {
  keywords: [
    "transportation",
    "titanic",
    "deploy"
  ],
  char: "🚢",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, d1 = {
  keywords: [
    "photo",
    "carnival",
    "londoneye"
  ],
  char: "🎡",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, p1 = {
  keywords: [
    "carnival",
    "playground",
    "photo",
    "fun"
  ],
  char: "🎢",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, f1 = {
  keywords: [
    "photo",
    "carnival"
  ],
  char: "🎠",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, h1 = {
  keywords: [
    "wip",
    "working",
    "progress"
  ],
  char: "🏗",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, y1 = {
  keywords: [
    "photo",
    "mountain"
  ],
  char: "🌁",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, g1 = {
  keywords: [
    "photo",
    "japanese"
  ],
  char: "🗼",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, _1 = {
  keywords: [
    "building",
    "industry",
    "pollution",
    "smoke"
  ],
  char: "🏭",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, u1 = {
  keywords: [
    "photo",
    "summer",
    "water",
    "fresh"
  ],
  char: "⛲",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, m1 = {
  keywords: [
    "photo",
    "japan",
    "asia",
    "tsukimi"
  ],
  char: "🎑",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, k1 = {
  keywords: [
    "photo",
    "nature",
    "environment"
  ],
  char: "⛰",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, w1 = {
  keywords: [
    "photo",
    "nature",
    "environment",
    "winter",
    "cold"
  ],
  char: "🏔",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, b1 = {
  keywords: [
    "photo",
    "mountain",
    "nature",
    "japanese"
  ],
  char: "🗻",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, v1 = {
  keywords: [
    "photo",
    "nature",
    "disaster"
  ],
  char: "🌋",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, z1 = {
  keywords: [
    "nation",
    "country",
    "japanese",
    "asia"
  ],
  char: "🗾",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, x1 = {
  keywords: [
    "photo",
    "outdoors",
    "tent"
  ],
  char: "🏕",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, j1 = {
  keywords: [
    "photo",
    "camping",
    "outdoors"
  ],
  char: "⛺",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, C1 = {
  keywords: [
    "photo",
    "environment",
    "nature"
  ],
  char: "🏞",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, E1 = {
  keywords: [
    "road",
    "cupertino",
    "interstate",
    "highway"
  ],
  char: "🛣",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, S1 = {
  keywords: [
    "train",
    "transportation"
  ],
  char: "🛤",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, A1 = {
  keywords: [
    "morning",
    "view",
    "vacation",
    "photo"
  ],
  char: "🌅",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, L1 = {
  keywords: [
    "view",
    "vacation",
    "photo"
  ],
  char: "🌄",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, $1 = {
  keywords: [
    "photo",
    "warm",
    "saharah"
  ],
  char: "🏜",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, T1 = {
  keywords: [
    "weather",
    "summer",
    "sunny",
    "sand",
    "mojito"
  ],
  char: "🏖",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, F1 = {
  keywords: [
    "photo",
    "tropical",
    "mojito"
  ],
  char: "🏝",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, P1 = {
  keywords: [
    "photo",
    "good morning",
    "dawn"
  ],
  char: "🌇",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, R1 = {
  keywords: [
    "photo",
    "evening",
    "sky",
    "buildings"
  ],
  char: "🌆",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, I1 = {
  keywords: [
    "photo",
    "night life",
    "urban"
  ],
  char: "🏙",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, q1 = {
  keywords: [
    "evening",
    "city",
    "downtown"
  ],
  char: "🌃",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, O1 = {
  keywords: [
    "photo",
    "sanfrancisco"
  ],
  char: "🌉",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, D1 = {
  keywords: [
    "photo",
    "space",
    "stars"
  ],
  char: "🌌",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, M1 = {
  keywords: [
    "night",
    "photo"
  ],
  char: "🌠",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, B1 = {
  keywords: [
    "stars",
    "night",
    "shine"
  ],
  char: "🎇",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, N1 = {
  keywords: [
    "photo",
    "festival",
    "carnival",
    "congratulations"
  ],
  char: "🎆",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, H1 = {
  keywords: [
    "nature",
    "happy",
    "unicorn_face",
    "photo",
    "sky",
    "spring"
  ],
  char: "🌈",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, U1 = {
  keywords: [
    "buildings",
    "photo"
  ],
  char: "🏘",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, V1 = {
  keywords: [
    "building",
    "royalty",
    "history"
  ],
  char: "🏰",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, W1 = {
  keywords: [
    "photo",
    "building"
  ],
  char: "🏯",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, K1 = {
  keywords: [
    "photo",
    "place",
    "sports",
    "concert",
    "venue"
  ],
  char: "🏟",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, G1 = {
  keywords: [
    "american",
    "newyork"
  ],
  char: "🗽",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, X1 = {
  keywords: [
    "building",
    "home"
  ],
  char: "🏠",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Q1 = {
  keywords: [
    "home",
    "plant",
    "nature"
  ],
  char: "🏡",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, J1 = {
  keywords: [
    "abandon",
    "evict",
    "broken",
    "building"
  ],
  char: "🏚",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Y1 = {
  keywords: [
    "building",
    "bureau",
    "work"
  ],
  char: "🏢",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Z1 = {
  keywords: [
    "building",
    "shopping",
    "mall"
  ],
  char: "🏬",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, e0 = {
  keywords: [
    "building",
    "envelope",
    "communication"
  ],
  char: "🏣",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, a0 = {
  keywords: [
    "building",
    "email"
  ],
  char: "🏤",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, t0 = {
  keywords: [
    "building",
    "health",
    "surgery",
    "doctor"
  ],
  char: "🏥",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, r0 = {
  keywords: [
    "building",
    "money",
    "sales",
    "cash",
    "business",
    "enterprise"
  ],
  char: "🏦",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, o0 = {
  keywords: [
    "building",
    "accomodation",
    "checkin"
  ],
  char: "🏨",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, s0 = {
  keywords: [
    "building",
    "shopping",
    "groceries"
  ],
  char: "🏪",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, c0 = {
  keywords: [
    "building",
    "student",
    "education",
    "learn",
    "teach"
  ],
  char: "🏫",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, i0 = {
  keywords: [
    "like",
    "affection",
    "dating"
  ],
  char: "🏩",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, n0 = {
  keywords: [
    "love",
    "like",
    "affection",
    "couple",
    "marriage",
    "bride",
    "groom"
  ],
  char: "💒",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, l0 = {
  keywords: [
    "art",
    "culture",
    "history"
  ],
  char: "🏛",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, d0 = {
  keywords: [
    "building",
    "religion",
    "christ"
  ],
  char: "⛪",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, p0 = {
  keywords: [
    "islam",
    "worship",
    "minaret"
  ],
  char: "🕌",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, f0 = {
  keywords: [
    "judaism",
    "worship",
    "temple",
    "jewish"
  ],
  char: "🕍",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, h0 = {
  keywords: [
    "mecca",
    "mosque",
    "islam"
  ],
  char: "🕋",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, y0 = {
  keywords: [
    "temple",
    "japan",
    "kyoto"
  ],
  char: "⛩",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, g0 = {
  keywords: [
    "time",
    "accessories"
  ],
  char: "⌚",
  fitzpatrick_scale: !1,
  category: "objects"
}, _0 = {
  keywords: [
    "technology",
    "apple",
    "gadgets",
    "dial"
  ],
  char: "📱",
  fitzpatrick_scale: !1,
  category: "objects"
}, u0 = {
  keywords: [
    "iphone",
    "incoming"
  ],
  char: "📲",
  fitzpatrick_scale: !1,
  category: "objects"
}, m0 = {
  keywords: [
    "technology",
    "laptop",
    "screen",
    "display",
    "monitor"
  ],
  char: "💻",
  fitzpatrick_scale: !1,
  category: "objects"
}, k0 = {
  keywords: [
    "technology",
    "computer",
    "type",
    "input",
    "text"
  ],
  char: "⌨",
  fitzpatrick_scale: !1,
  category: "objects"
}, w0 = {
  keywords: [
    "technology",
    "computing",
    "screen"
  ],
  char: "🖥",
  fitzpatrick_scale: !1,
  category: "objects"
}, b0 = {
  keywords: [
    "paper",
    "ink"
  ],
  char: "🖨",
  fitzpatrick_scale: !1,
  category: "objects"
}, v0 = {
  keywords: [
    "click"
  ],
  char: "🖱",
  fitzpatrick_scale: !1,
  category: "objects"
}, z0 = {
  keywords: [
    "technology",
    "trackpad"
  ],
  char: "🖲",
  fitzpatrick_scale: !1,
  category: "objects"
}, x0 = {
  keywords: [
    "game",
    "play"
  ],
  char: "🕹",
  fitzpatrick_scale: !1,
  category: "objects"
}, j0 = {
  keywords: [
    "tool"
  ],
  char: "🗜",
  fitzpatrick_scale: !1,
  category: "objects"
}, C0 = {
  keywords: [
    "technology",
    "record",
    "data",
    "disk",
    "90s"
  ],
  char: "💽",
  fitzpatrick_scale: !1,
  category: "objects"
}, E0 = {
  keywords: [
    "oldschool",
    "technology",
    "save",
    "90s",
    "80s"
  ],
  char: "💾",
  fitzpatrick_scale: !1,
  category: "objects"
}, S0 = {
  keywords: [
    "technology",
    "dvd",
    "disk",
    "disc",
    "90s"
  ],
  char: "💿",
  fitzpatrick_scale: !1,
  category: "objects"
}, A0 = {
  keywords: [
    "cd",
    "disk",
    "disc"
  ],
  char: "📀",
  fitzpatrick_scale: !1,
  category: "objects"
}, L0 = {
  keywords: [
    "record",
    "video",
    "oldschool",
    "90s",
    "80s"
  ],
  char: "📼",
  fitzpatrick_scale: !1,
  category: "objects"
}, $0 = {
  keywords: [
    "gadgets",
    "photography"
  ],
  char: "📷",
  fitzpatrick_scale: !1,
  category: "objects"
}, T0 = {
  keywords: [
    "photography",
    "gadgets"
  ],
  char: "📸",
  fitzpatrick_scale: !1,
  category: "objects"
}, F0 = {
  keywords: [
    "film",
    "record"
  ],
  char: "📹",
  fitzpatrick_scale: !1,
  category: "objects"
}, P0 = {
  keywords: [
    "film",
    "record"
  ],
  char: "🎥",
  fitzpatrick_scale: !1,
  category: "objects"
}, R0 = {
  keywords: [
    "video",
    "tape",
    "record",
    "movie"
  ],
  char: "📽",
  fitzpatrick_scale: !1,
  category: "objects"
}, I0 = {
  keywords: [
    "movie"
  ],
  char: "🎞",
  fitzpatrick_scale: !1,
  category: "objects"
}, q0 = {
  keywords: [
    "technology",
    "communication",
    "dial"
  ],
  char: "📞",
  fitzpatrick_scale: !1,
  category: "objects"
}, O0 = {
  keywords: [
    "technology",
    "communication",
    "dial",
    "telephone"
  ],
  char: "☎️",
  fitzpatrick_scale: !1,
  category: "objects"
}, D0 = {
  keywords: [
    "bbcall",
    "oldschool",
    "90s"
  ],
  char: "📟",
  fitzpatrick_scale: !1,
  category: "objects"
}, M0 = {
  keywords: [
    "communication",
    "technology"
  ],
  char: "📠",
  fitzpatrick_scale: !1,
  category: "objects"
}, B0 = {
  keywords: [
    "technology",
    "program",
    "oldschool",
    "show",
    "television"
  ],
  char: "📺",
  fitzpatrick_scale: !1,
  category: "objects"
}, N0 = {
  keywords: [
    "communication",
    "music",
    "podcast",
    "program"
  ],
  char: "📻",
  fitzpatrick_scale: !1,
  category: "objects"
}, H0 = {
  keywords: [
    "sing",
    "recording",
    "artist",
    "talkshow"
  ],
  char: "🎙",
  fitzpatrick_scale: !1,
  category: "objects"
}, U0 = {
  keywords: [
    "scale"
  ],
  char: "🎚",
  fitzpatrick_scale: !1,
  category: "objects"
}, V0 = {
  keywords: [
    "dial"
  ],
  char: "🎛",
  fitzpatrick_scale: !1,
  category: "objects"
}, W0 = {
  keywords: [
    "magnetic",
    "navigation",
    "orienteering"
  ],
  char: "🧭",
  fitzpatrick_scale: !1,
  category: "objects"
}, K0 = {
  keywords: [
    "time",
    "deadline"
  ],
  char: "⏱",
  fitzpatrick_scale: !1,
  category: "objects"
}, G0 = {
  keywords: [
    "alarm"
  ],
  char: "⏲",
  fitzpatrick_scale: !1,
  category: "objects"
}, X0 = {
  keywords: [
    "time",
    "wake"
  ],
  char: "⏰",
  fitzpatrick_scale: !1,
  category: "objects"
}, Q0 = {
  keywords: [
    "time"
  ],
  char: "🕰",
  fitzpatrick_scale: !1,
  category: "objects"
}, J0 = {
  keywords: [
    "oldschool",
    "time",
    "countdown"
  ],
  char: "⏳",
  fitzpatrick_scale: !1,
  category: "objects"
}, Y0 = {
  keywords: [
    "time",
    "clock",
    "oldschool",
    "limit",
    "exam",
    "quiz",
    "test"
  ],
  char: "⌛",
  fitzpatrick_scale: !1,
  category: "objects"
}, Z0 = {
  keywords: [
    "communication",
    "future",
    "radio",
    "space"
  ],
  char: "📡",
  fitzpatrick_scale: !1,
  category: "objects"
}, ev = {
  keywords: [
    "power",
    "energy",
    "sustain"
  ],
  char: "🔋",
  fitzpatrick_scale: !1,
  category: "objects"
}, av = {
  keywords: [
    "charger",
    "power"
  ],
  char: "🔌",
  fitzpatrick_scale: !1,
  category: "objects"
}, tv = {
  keywords: [
    "light",
    "electricity",
    "idea"
  ],
  char: "💡",
  fitzpatrick_scale: !1,
  category: "objects"
}, rv = {
  keywords: [
    "dark",
    "camping",
    "sight",
    "night"
  ],
  char: "🔦",
  fitzpatrick_scale: !1,
  category: "objects"
}, ov = {
  keywords: [
    "fire",
    "wax"
  ],
  char: "🕯",
  fitzpatrick_scale: !1,
  category: "objects"
}, sv = {
  keywords: [
    "quench"
  ],
  char: "🧯",
  fitzpatrick_scale: !1,
  category: "objects"
}, cv = {
  keywords: [
    "bin",
    "trash",
    "rubbish",
    "garbage",
    "toss"
  ],
  char: "🗑",
  fitzpatrick_scale: !1,
  category: "objects"
}, iv = {
  keywords: [
    "barrell"
  ],
  char: "🛢",
  fitzpatrick_scale: !1,
  category: "objects"
}, nv = {
  keywords: [
    "dollar",
    "bills",
    "payment",
    "sale"
  ],
  char: "💸",
  fitzpatrick_scale: !1,
  category: "objects"
}, lv = {
  keywords: [
    "money",
    "sales",
    "bill",
    "currency"
  ],
  char: "💵",
  fitzpatrick_scale: !1,
  category: "objects"
}, dv = {
  keywords: [
    "money",
    "sales",
    "japanese",
    "dollar",
    "currency"
  ],
  char: "💴",
  fitzpatrick_scale: !1,
  category: "objects"
}, pv = {
  keywords: [
    "money",
    "sales",
    "dollar",
    "currency"
  ],
  char: "💶",
  fitzpatrick_scale: !1,
  category: "objects"
}, fv = {
  keywords: [
    "british",
    "sterling",
    "money",
    "sales",
    "bills",
    "uk",
    "england",
    "currency"
  ],
  char: "💷",
  fitzpatrick_scale: !1,
  category: "objects"
}, hv = {
  keywords: [
    "dollar",
    "payment",
    "coins",
    "sale"
  ],
  char: "💰",
  fitzpatrick_scale: !1,
  category: "objects"
}, yv = {
  keywords: [
    "money",
    "sales",
    "dollar",
    "bill",
    "payment",
    "shopping"
  ],
  char: "💳",
  fitzpatrick_scale: !1,
  category: "objects"
}, gv = {
  keywords: [
    "blue",
    "ruby",
    "diamond",
    "jewelry"
  ],
  char: "💎",
  fitzpatrick_scale: !1,
  category: "objects"
}, _v = {
  keywords: [
    "law",
    "fairness",
    "weight"
  ],
  char: "⚖",
  fitzpatrick_scale: !1,
  category: "objects"
}, uv = {
  keywords: [
    "tools",
    "diy",
    "fix",
    "maintainer",
    "mechanic"
  ],
  char: "🧰",
  fitzpatrick_scale: !1,
  category: "objects"
}, mv = {
  keywords: [
    "tools",
    "diy",
    "ikea",
    "fix",
    "maintainer"
  ],
  char: "🔧",
  fitzpatrick_scale: !1,
  category: "objects"
}, kv = {
  keywords: [
    "tools",
    "build",
    "create"
  ],
  char: "🔨",
  fitzpatrick_scale: !1,
  category: "objects"
}, wv = {
  keywords: [
    "tools",
    "build",
    "create"
  ],
  char: "⚒",
  fitzpatrick_scale: !1,
  category: "objects"
}, bv = {
  keywords: [
    "tools",
    "build",
    "create"
  ],
  char: "🛠",
  fitzpatrick_scale: !1,
  category: "objects"
}, vv = {
  keywords: [
    "tools",
    "dig"
  ],
  char: "⛏",
  fitzpatrick_scale: !1,
  category: "objects"
}, zv = {
  keywords: [
    "handy",
    "tools",
    "fix"
  ],
  char: "🔩",
  fitzpatrick_scale: !1,
  category: "objects"
}, xv = {
  keywords: [
    "cog"
  ],
  char: "⚙",
  fitzpatrick_scale: !1,
  category: "objects"
}, jv = {
  keywords: [
    "bricks"
  ],
  char: "🧱",
  fitzpatrick_scale: !1,
  category: "objects"
}, Cv = {
  keywords: [
    "lock",
    "arrest"
  ],
  char: "⛓",
  fitzpatrick_scale: !1,
  category: "objects"
}, Ev = {
  keywords: [
    "attraction",
    "magnetic"
  ],
  char: "🧲",
  fitzpatrick_scale: !1,
  category: "objects"
}, Sv = {
  keywords: [
    "violence",
    "weapon",
    "pistol",
    "revolver"
  ],
  char: "🔫",
  fitzpatrick_scale: !1,
  category: "objects"
}, Av = {
  keywords: [
    "boom",
    "explode",
    "explosion",
    "terrorism"
  ],
  char: "💣",
  fitzpatrick_scale: !1,
  category: "objects"
}, Lv = {
  keywords: [
    "dynamite",
    "boom",
    "explode",
    "explosion",
    "explosive"
  ],
  char: "🧨",
  fitzpatrick_scale: !1,
  category: "objects"
}, $v = {
  keywords: [
    "knife",
    "blade",
    "cutlery",
    "kitchen",
    "weapon"
  ],
  char: "🔪",
  fitzpatrick_scale: !1,
  category: "objects"
}, Tv = {
  keywords: [
    "weapon"
  ],
  char: "🗡",
  fitzpatrick_scale: !1,
  category: "objects"
}, Fv = {
  keywords: [
    "weapon"
  ],
  char: "⚔",
  fitzpatrick_scale: !1,
  category: "objects"
}, Pv = {
  keywords: [
    "protection",
    "security"
  ],
  char: "🛡",
  fitzpatrick_scale: !1,
  category: "objects"
}, Rv = {
  keywords: [
    "kills",
    "tobacco",
    "cigarette",
    "joint",
    "smoke"
  ],
  char: "🚬",
  fitzpatrick_scale: !1,
  category: "objects"
}, Iv = {
  keywords: [
    "poison",
    "danger",
    "deadly",
    "scary",
    "death",
    "pirate",
    "evil"
  ],
  char: "☠",
  fitzpatrick_scale: !1,
  category: "objects"
}, qv = {
  keywords: [
    "vampire",
    "dead",
    "die",
    "death",
    "rip",
    "graveyard",
    "cemetery",
    "casket",
    "funeral",
    "box"
  ],
  char: "⚰",
  fitzpatrick_scale: !1,
  category: "objects"
}, Ov = {
  keywords: [
    "dead",
    "die",
    "death",
    "rip",
    "ashes"
  ],
  char: "⚱",
  fitzpatrick_scale: !1,
  category: "objects"
}, Dv = {
  keywords: [
    "vase",
    "jar"
  ],
  char: "🏺",
  fitzpatrick_scale: !1,
  category: "objects"
}, Mv = {
  keywords: [
    "disco",
    "party",
    "magic",
    "circus",
    "fortune_teller"
  ],
  char: "🔮",
  fitzpatrick_scale: !1,
  category: "objects"
}, Bv = {
  keywords: [
    "dhikr",
    "religious"
  ],
  char: "📿",
  fitzpatrick_scale: !1,
  category: "objects"
}, Nv = {
  keywords: [
    "bead",
    "charm"
  ],
  char: "🧿",
  fitzpatrick_scale: !1,
  category: "objects"
}, Hv = {
  keywords: [
    "hair",
    "salon",
    "style"
  ],
  char: "💈",
  fitzpatrick_scale: !1,
  category: "objects"
}, Uv = {
  keywords: [
    "distilling",
    "science",
    "experiment",
    "chemistry"
  ],
  char: "⚗",
  fitzpatrick_scale: !1,
  category: "objects"
}, Vv = {
  keywords: [
    "stars",
    "space",
    "zoom",
    "science",
    "astronomy"
  ],
  char: "🔭",
  fitzpatrick_scale: !1,
  category: "objects"
}, Wv = {
  keywords: [
    "laboratory",
    "experiment",
    "zoomin",
    "science",
    "study"
  ],
  char: "🔬",
  fitzpatrick_scale: !1,
  category: "objects"
}, Kv = {
  keywords: [
    "embarrassing"
  ],
  char: "🕳",
  fitzpatrick_scale: !1,
  category: "objects"
}, Gv = {
  keywords: [
    "health",
    "medicine",
    "doctor",
    "pharmacy",
    "drug"
  ],
  char: "💊",
  fitzpatrick_scale: !1,
  category: "objects"
}, Xv = {
  keywords: [
    "health",
    "hospital",
    "drugs",
    "blood",
    "medicine",
    "needle",
    "doctor",
    "nurse"
  ],
  char: "💉",
  fitzpatrick_scale: !1,
  category: "objects"
}, Qv = {
  keywords: [
    "biologist",
    "genetics",
    "life"
  ],
  char: "🧬",
  fitzpatrick_scale: !1,
  category: "objects"
}, Jv = {
  keywords: [
    "amoeba",
    "bacteria",
    "germs"
  ],
  char: "🦠",
  fitzpatrick_scale: !1,
  category: "objects"
}, Yv = {
  keywords: [
    "bacteria",
    "biology",
    "culture",
    "lab"
  ],
  char: "🧫",
  fitzpatrick_scale: !1,
  category: "objects"
}, Zv = {
  keywords: [
    "chemistry",
    "experiment",
    "lab",
    "science"
  ],
  char: "🧪",
  fitzpatrick_scale: !1,
  category: "objects"
}, ez = {
  keywords: [
    "weather",
    "temperature",
    "hot",
    "cold"
  ],
  char: "🌡",
  fitzpatrick_scale: !1,
  category: "objects"
}, az = {
  keywords: [
    "cleaning",
    "sweeping",
    "witch"
  ],
  char: "🧹",
  fitzpatrick_scale: !1,
  category: "objects"
}, tz = {
  keywords: [
    "laundry"
  ],
  char: "🧺",
  fitzpatrick_scale: !1,
  category: "objects"
}, rz = {
  keywords: [
    "roll"
  ],
  char: "🧻",
  fitzpatrick_scale: !1,
  category: "objects"
}, oz = {
  keywords: [
    "sale",
    "tag"
  ],
  char: "🏷",
  fitzpatrick_scale: !1,
  category: "objects"
}, sz = {
  keywords: [
    "favorite",
    "label",
    "save"
  ],
  char: "🔖",
  fitzpatrick_scale: !1,
  category: "objects"
}, cz = {
  keywords: [
    "restroom",
    "wc",
    "washroom",
    "bathroom",
    "potty"
  ],
  char: "🚽",
  fitzpatrick_scale: !1,
  category: "objects"
}, iz = {
  keywords: [
    "clean",
    "water",
    "bathroom"
  ],
  char: "🚿",
  fitzpatrick_scale: !1,
  category: "objects"
}, nz = {
  keywords: [
    "clean",
    "shower",
    "bathroom"
  ],
  char: "🛁",
  fitzpatrick_scale: !1,
  category: "objects"
}, lz = {
  keywords: [
    "bar",
    "bathing",
    "cleaning",
    "lather"
  ],
  char: "🧼",
  fitzpatrick_scale: !1,
  category: "objects"
}, dz = {
  keywords: [
    "absorbing",
    "cleaning",
    "porous"
  ],
  char: "🧽",
  fitzpatrick_scale: !1,
  category: "objects"
}, pz = {
  keywords: [
    "moisturizer",
    "sunscreen"
  ],
  char: "🧴",
  fitzpatrick_scale: !1,
  category: "objects"
}, fz = {
  keywords: [
    "lock",
    "door",
    "password"
  ],
  char: "🔑",
  fitzpatrick_scale: !1,
  category: "objects"
}, hz = {
  keywords: [
    "lock",
    "door",
    "password"
  ],
  char: "🗝",
  fitzpatrick_scale: !1,
  category: "objects"
}, yz = {
  keywords: [
    "read",
    "chill"
  ],
  char: "🛋",
  fitzpatrick_scale: !1,
  category: "objects"
}, gz = {
  keywords: [
    "bed",
    "rest"
  ],
  char: "🛌",
  fitzpatrick_scale: !0,
  category: "objects"
}, _z = {
  keywords: [
    "sleep",
    "rest"
  ],
  char: "🛏",
  fitzpatrick_scale: !1,
  category: "objects"
}, uz = {
  keywords: [
    "house",
    "entry",
    "exit"
  ],
  char: "🚪",
  fitzpatrick_scale: !1,
  category: "objects"
}, mz = {
  keywords: [
    "service"
  ],
  char: "🛎",
  fitzpatrick_scale: !1,
  category: "objects"
}, kz = {
  keywords: [
    "plush",
    "stuffed"
  ],
  char: "🧸",
  fitzpatrick_scale: !1,
  category: "objects"
}, wz = {
  keywords: [
    "photography"
  ],
  char: "🖼",
  fitzpatrick_scale: !1,
  category: "objects"
}, bz = {
  keywords: [
    "location",
    "direction"
  ],
  char: "🗺",
  fitzpatrick_scale: !1,
  category: "objects"
}, vz = {
  keywords: [
    "weather",
    "summer"
  ],
  char: "⛱",
  fitzpatrick_scale: !1,
  category: "objects"
}, zz = {
  keywords: [
    "rock",
    "easter island",
    "moai"
  ],
  char: "🗿",
  fitzpatrick_scale: !1,
  category: "objects"
}, xz = {
  keywords: [
    "mall",
    "buy",
    "purchase"
  ],
  char: "🛍",
  fitzpatrick_scale: !1,
  category: "objects"
}, jz = {
  keywords: [
    "trolley"
  ],
  char: "🛒",
  fitzpatrick_scale: !1,
  category: "objects"
}, Cz = {
  keywords: [
    "party",
    "celebration",
    "birthday",
    "circus"
  ],
  char: "🎈",
  fitzpatrick_scale: !1,
  category: "objects"
}, Ez = {
  keywords: [
    "fish",
    "japanese",
    "koinobori",
    "carp",
    "banner"
  ],
  char: "🎏",
  fitzpatrick_scale: !1,
  category: "objects"
}, Sz = {
  keywords: [
    "decoration",
    "pink",
    "girl",
    "bowtie"
  ],
  char: "🎀",
  fitzpatrick_scale: !1,
  category: "objects"
}, Az = {
  keywords: [
    "present",
    "birthday",
    "christmas",
    "xmas"
  ],
  char: "🎁",
  fitzpatrick_scale: !1,
  category: "objects"
}, Lz = {
  keywords: [
    "festival",
    "party",
    "birthday",
    "circus"
  ],
  char: "🎊",
  fitzpatrick_scale: !1,
  category: "objects"
}, $z = {
  keywords: [
    "party",
    "congratulations",
    "birthday",
    "magic",
    "circus",
    "celebration"
  ],
  char: "🎉",
  fitzpatrick_scale: !1,
  category: "objects"
}, Tz = {
  keywords: [
    "japanese",
    "toy",
    "kimono"
  ],
  char: "🎎",
  fitzpatrick_scale: !1,
  category: "objects"
}, Fz = {
  keywords: [
    "nature",
    "ding",
    "spring",
    "bell"
  ],
  char: "🎐",
  fitzpatrick_scale: !1,
  category: "objects"
}, Pz = {
  keywords: [
    "japanese",
    "nation",
    "country",
    "border"
  ],
  char: "🎌",
  fitzpatrick_scale: !1,
  category: "objects"
}, Rz = {
  keywords: [
    "light",
    "paper",
    "halloween",
    "spooky"
  ],
  char: "🏮",
  fitzpatrick_scale: !1,
  category: "objects"
}, Iz = {
  keywords: [
    "gift"
  ],
  char: "🧧",
  fitzpatrick_scale: !1,
  category: "objects"
}, qz = {
  keywords: [
    "letter",
    "postal",
    "inbox",
    "communication"
  ],
  char: "✉️",
  fitzpatrick_scale: !1,
  category: "objects"
}, Oz = {
  keywords: [
    "email",
    "communication"
  ],
  char: "📩",
  fitzpatrick_scale: !1,
  category: "objects"
}, Dz = {
  keywords: [
    "email",
    "inbox"
  ],
  char: "📨",
  fitzpatrick_scale: !1,
  category: "objects"
}, Mz = {
  keywords: [
    "email",
    "like",
    "affection",
    "envelope",
    "valentines"
  ],
  char: "💌",
  fitzpatrick_scale: !1,
  category: "objects"
}, Bz = {
  keywords: [
    "email",
    "letter",
    "envelope"
  ],
  char: "📮",
  fitzpatrick_scale: !1,
  category: "objects"
}, Nz = {
  keywords: [
    "email",
    "communication",
    "inbox"
  ],
  char: "📪",
  fitzpatrick_scale: !1,
  category: "objects"
}, Hz = {
  keywords: [
    "email",
    "inbox",
    "communication"
  ],
  char: "📫",
  fitzpatrick_scale: !1,
  category: "objects"
}, Uz = {
  keywords: [
    "email",
    "inbox",
    "communication"
  ],
  char: "📬",
  fitzpatrick_scale: !1,
  category: "objects"
}, Vz = {
  keywords: [
    "email",
    "inbox"
  ],
  char: "📭",
  fitzpatrick_scale: !1,
  category: "objects"
}, Wz = {
  keywords: [
    "instrument",
    "music"
  ],
  char: "📯",
  fitzpatrick_scale: !1,
  category: "objects"
}, Kz = {
  keywords: [
    "email",
    "documents"
  ],
  char: "📥",
  fitzpatrick_scale: !1,
  category: "objects"
}, Gz = {
  keywords: [
    "inbox",
    "email"
  ],
  char: "📤",
  fitzpatrick_scale: !1,
  category: "objects"
}, Xz = {
  keywords: [
    "documents",
    "ancient",
    "history",
    "paper"
  ],
  char: "📜",
  fitzpatrick_scale: !1,
  category: "objects"
}, Qz = {
  keywords: [
    "documents",
    "office",
    "paper"
  ],
  char: "📃",
  fitzpatrick_scale: !1,
  category: "objects"
}, Jz = {
  keywords: [
    "favorite",
    "save",
    "order",
    "tidy"
  ],
  char: "📑",
  fitzpatrick_scale: !1,
  category: "objects"
}, Yz = {
  keywords: [
    "accounting",
    "expenses"
  ],
  char: "🧾",
  fitzpatrick_scale: !1,
  category: "objects"
}, Zz = {
  keywords: [
    "graph",
    "presentation",
    "stats"
  ],
  char: "📊",
  fitzpatrick_scale: !1,
  category: "objects"
}, e2 = {
  keywords: [
    "graph",
    "presentation",
    "stats",
    "recovery",
    "business",
    "economics",
    "money",
    "sales",
    "good",
    "success"
  ],
  char: "📈",
  fitzpatrick_scale: !1,
  category: "objects"
}, a2 = {
  keywords: [
    "graph",
    "presentation",
    "stats",
    "recession",
    "business",
    "economics",
    "money",
    "sales",
    "bad",
    "failure"
  ],
  char: "📉",
  fitzpatrick_scale: !1,
  category: "objects"
}, t2 = {
  keywords: [
    "documents",
    "office",
    "paper",
    "information"
  ],
  char: "📄",
  fitzpatrick_scale: !1,
  category: "objects"
}, r2 = {
  keywords: [
    "calendar",
    "schedule"
  ],
  char: "📅",
  fitzpatrick_scale: !1,
  category: "objects"
}, o2 = {
  keywords: [
    "schedule",
    "date",
    "planning"
  ],
  char: "📆",
  fitzpatrick_scale: !1,
  category: "objects"
}, s2 = {
  keywords: [
    "date",
    "schedule",
    "planning"
  ],
  char: "🗓",
  fitzpatrick_scale: !1,
  category: "objects"
}, c2 = {
  keywords: [
    "business",
    "stationery"
  ],
  char: "📇",
  fitzpatrick_scale: !1,
  category: "objects"
}, i2 = {
  keywords: [
    "business",
    "stationery"
  ],
  char: "🗃",
  fitzpatrick_scale: !1,
  category: "objects"
}, n2 = {
  keywords: [
    "election",
    "vote"
  ],
  char: "🗳",
  fitzpatrick_scale: !1,
  category: "objects"
}, l2 = {
  keywords: [
    "filing",
    "organizing"
  ],
  char: "🗄",
  fitzpatrick_scale: !1,
  category: "objects"
}, d2 = {
  keywords: [
    "stationery",
    "documents"
  ],
  char: "📋",
  fitzpatrick_scale: !1,
  category: "objects"
}, p2 = {
  keywords: [
    "memo",
    "stationery"
  ],
  char: "🗒",
  fitzpatrick_scale: !1,
  category: "objects"
}, f2 = {
  keywords: [
    "documents",
    "business",
    "office"
  ],
  char: "📁",
  fitzpatrick_scale: !1,
  category: "objects"
}, h2 = {
  keywords: [
    "documents",
    "load"
  ],
  char: "📂",
  fitzpatrick_scale: !1,
  category: "objects"
}, y2 = {
  keywords: [
    "organizing",
    "business",
    "stationery"
  ],
  char: "🗂",
  fitzpatrick_scale: !1,
  category: "objects"
}, g2 = {
  keywords: [
    "press",
    "headline"
  ],
  char: "🗞",
  fitzpatrick_scale: !1,
  category: "objects"
}, _2 = {
  keywords: [
    "press",
    "headline"
  ],
  char: "📰",
  fitzpatrick_scale: !1,
  category: "objects"
}, u2 = {
  keywords: [
    "stationery",
    "record",
    "notes",
    "paper",
    "study"
  ],
  char: "📓",
  fitzpatrick_scale: !1,
  category: "objects"
}, m2 = {
  keywords: [
    "read",
    "library",
    "knowledge",
    "textbook",
    "learn"
  ],
  char: "📕",
  fitzpatrick_scale: !1,
  category: "objects"
}, k2 = {
  keywords: [
    "read",
    "library",
    "knowledge",
    "study"
  ],
  char: "📗",
  fitzpatrick_scale: !1,
  category: "objects"
}, w2 = {
  keywords: [
    "read",
    "library",
    "knowledge",
    "learn",
    "study"
  ],
  char: "📘",
  fitzpatrick_scale: !1,
  category: "objects"
}, b2 = {
  keywords: [
    "read",
    "library",
    "knowledge",
    "textbook",
    "study"
  ],
  char: "📙",
  fitzpatrick_scale: !1,
  category: "objects"
}, v2 = {
  keywords: [
    "classroom",
    "notes",
    "record",
    "paper",
    "study"
  ],
  char: "📔",
  fitzpatrick_scale: !1,
  category: "objects"
}, z2 = {
  keywords: [
    "notes",
    "paper"
  ],
  char: "📒",
  fitzpatrick_scale: !1,
  category: "objects"
}, x2 = {
  keywords: [
    "literature",
    "library",
    "study"
  ],
  char: "📚",
  fitzpatrick_scale: !1,
  category: "objects"
}, j2 = {
  keywords: [
    "book",
    "read",
    "library",
    "knowledge",
    "literature",
    "learn",
    "study"
  ],
  char: "📖",
  fitzpatrick_scale: !1,
  category: "objects"
}, C2 = {
  keywords: [
    "diaper"
  ],
  char: "🧷",
  fitzpatrick_scale: !1,
  category: "objects"
}, E2 = {
  keywords: [
    "rings",
    "url"
  ],
  char: "🔗",
  fitzpatrick_scale: !1,
  category: "objects"
}, S2 = {
  keywords: [
    "documents",
    "stationery"
  ],
  char: "📎",
  fitzpatrick_scale: !1,
  category: "objects"
}, A2 = {
  keywords: [
    "documents",
    "stationery"
  ],
  char: "🖇",
  fitzpatrick_scale: !1,
  category: "objects"
}, L2 = {
  keywords: [
    "stationery",
    "cut"
  ],
  char: "✂️",
  fitzpatrick_scale: !1,
  category: "objects"
}, $2 = {
  keywords: [
    "stationery",
    "math",
    "architect",
    "sketch"
  ],
  char: "📐",
  fitzpatrick_scale: !1,
  category: "objects"
}, T2 = {
  keywords: [
    "stationery",
    "calculate",
    "length",
    "math",
    "school",
    "drawing",
    "architect",
    "sketch"
  ],
  char: "📏",
  fitzpatrick_scale: !1,
  category: "objects"
}, F2 = {
  keywords: [
    "calculation"
  ],
  char: "🧮",
  fitzpatrick_scale: !1,
  category: "objects"
}, P2 = {
  keywords: [
    "stationery",
    "mark",
    "here"
  ],
  char: "📌",
  fitzpatrick_scale: !1,
  category: "objects"
}, R2 = {
  keywords: [
    "stationery",
    "location",
    "map",
    "here"
  ],
  char: "📍",
  fitzpatrick_scale: !1,
  category: "objects"
}, I2 = {
  keywords: [
    "mark",
    "milestone",
    "place"
  ],
  char: "🚩",
  fitzpatrick_scale: !1,
  category: "objects"
}, q2 = {
  keywords: [
    "losing",
    "loser",
    "lost",
    "surrender",
    "give up",
    "fail"
  ],
  char: "🏳",
  fitzpatrick_scale: !1,
  category: "objects"
}, O2 = {
  keywords: [
    "pirate"
  ],
  char: "🏴",
  fitzpatrick_scale: !1,
  category: "objects"
}, D2 = {
  keywords: [
    "flag",
    "rainbow",
    "pride",
    "gay",
    "lgbt",
    "glbt",
    "queer",
    "homosexual",
    "lesbian",
    "bisexual",
    "transgender"
  ],
  char: "🏳️‍🌈",
  fitzpatrick_scale: !1,
  category: "objects"
}, M2 = {
  keywords: [
    "security",
    "privacy"
  ],
  char: "🔐",
  fitzpatrick_scale: !1,
  category: "objects"
}, B2 = {
  keywords: [
    "security",
    "password",
    "padlock"
  ],
  char: "🔒",
  fitzpatrick_scale: !1,
  category: "objects"
}, N2 = {
  keywords: [
    "privacy",
    "security"
  ],
  char: "🔓",
  fitzpatrick_scale: !1,
  category: "objects"
}, H2 = {
  keywords: [
    "security",
    "secret"
  ],
  char: "🔏",
  fitzpatrick_scale: !1,
  category: "objects"
}, U2 = {
  keywords: [
    "stationery",
    "writing",
    "write"
  ],
  char: "🖊",
  fitzpatrick_scale: !1,
  category: "objects"
}, V2 = {
  keywords: [
    "stationery",
    "writing",
    "write"
  ],
  char: "🖋",
  fitzpatrick_scale: !1,
  category: "objects"
}, W2 = {
  keywords: [
    "pen",
    "stationery",
    "writing",
    "write"
  ],
  char: "✒️",
  fitzpatrick_scale: !1,
  category: "objects"
}, K2 = {
  keywords: [
    "write",
    "documents",
    "stationery",
    "pencil",
    "paper",
    "writing",
    "legal",
    "exam",
    "quiz",
    "test",
    "study",
    "compose"
  ],
  char: "📝",
  fitzpatrick_scale: !1,
  category: "objects"
}, G2 = {
  keywords: [
    "stationery",
    "write",
    "paper",
    "writing",
    "school",
    "study"
  ],
  char: "✏️",
  fitzpatrick_scale: !1,
  category: "objects"
}, X2 = {
  keywords: [
    "drawing",
    "creativity"
  ],
  char: "🖍",
  fitzpatrick_scale: !1,
  category: "objects"
}, Q2 = {
  keywords: [
    "drawing",
    "creativity",
    "art"
  ],
  char: "🖌",
  fitzpatrick_scale: !1,
  category: "objects"
}, J2 = {
  keywords: [
    "search",
    "zoom",
    "find",
    "detective"
  ],
  char: "🔍",
  fitzpatrick_scale: !1,
  category: "objects"
}, Y2 = {
  keywords: [
    "search",
    "zoom",
    "find",
    "detective"
  ],
  char: "🔎",
  fitzpatrick_scale: !1,
  category: "objects"
}, Z2 = {
  keywords: [
    "love",
    "like",
    "valentines"
  ],
  char: "❤️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, e3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "🧡",
  fitzpatrick_scale: !1,
  category: "symbols"
}, a3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, t3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, r3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💙",
  fitzpatrick_scale: !1,
  category: "symbols"
}, o3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, s3 = {
  keywords: [
    "evil"
  ],
  char: "🖤",
  fitzpatrick_scale: !1,
  category: "symbols"
}, c3 = {
  keywords: [
    "sad",
    "sorry",
    "break",
    "heart",
    "heartbreak"
  ],
  char: "💔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, i3 = {
  keywords: [
    "decoration",
    "love"
  ],
  char: "❣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, n3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines",
    "heart"
  ],
  char: "💕",
  fitzpatrick_scale: !1,
  category: "symbols"
}, l3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💞",
  fitzpatrick_scale: !1,
  category: "symbols"
}, d3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines",
    "pink",
    "heart"
  ],
  char: "💓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, p3 = {
  keywords: [
    "like",
    "love",
    "affection",
    "valentines",
    "pink"
  ],
  char: "💗",
  fitzpatrick_scale: !1,
  category: "symbols"
}, f3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💖",
  fitzpatrick_scale: !1,
  category: "symbols"
}, h3 = {
  keywords: [
    "love",
    "like",
    "heart",
    "affection",
    "valentines"
  ],
  char: "💘",
  fitzpatrick_scale: !1,
  category: "symbols"
}, y3 = {
  keywords: [
    "love",
    "valentines"
  ],
  char: "💝",
  fitzpatrick_scale: !1,
  category: "symbols"
}, g3 = {
  keywords: [
    "purple-square",
    "love",
    "like"
  ],
  char: "💟",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _3 = {
  keywords: [
    "hippie"
  ],
  char: "☮",
  fitzpatrick_scale: !1,
  category: "symbols"
}, u3 = {
  keywords: [
    "christianity"
  ],
  char: "✝",
  fitzpatrick_scale: !1,
  category: "symbols"
}, m3 = {
  keywords: [
    "islam"
  ],
  char: "☪",
  fitzpatrick_scale: !1,
  category: "symbols"
}, k3 = {
  keywords: [
    "hinduism",
    "buddhism",
    "sikhism",
    "jainism"
  ],
  char: "🕉",
  fitzpatrick_scale: !1,
  category: "symbols"
}, w3 = {
  keywords: [
    "hinduism",
    "buddhism",
    "sikhism",
    "jainism"
  ],
  char: "☸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, b3 = {
  keywords: [
    "judaism"
  ],
  char: "✡",
  fitzpatrick_scale: !1,
  category: "symbols"
}, v3 = {
  keywords: [
    "purple-square",
    "religion",
    "jewish",
    "hexagram"
  ],
  char: "🔯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, z3 = {
  keywords: [
    "hanukkah",
    "candles",
    "jewish"
  ],
  char: "🕎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, x3 = {
  keywords: [
    "balance"
  ],
  char: "☯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, j3 = {
  keywords: [
    "suppedaneum",
    "religion"
  ],
  char: "☦",
  fitzpatrick_scale: !1,
  category: "symbols"
}, C3 = {
  keywords: [
    "religion",
    "church",
    "temple",
    "prayer"
  ],
  char: "🛐",
  fitzpatrick_scale: !1,
  category: "symbols"
}, E3 = {
  keywords: [
    "sign",
    "purple-square",
    "constellation",
    "astrology"
  ],
  char: "⛎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, S3 = {
  keywords: [
    "sign",
    "purple-square",
    "zodiac",
    "astrology"
  ],
  char: "♈",
  fitzpatrick_scale: !1,
  category: "symbols"
}, A3 = {
  keywords: [
    "purple-square",
    "sign",
    "zodiac",
    "astrology"
  ],
  char: "♉",
  fitzpatrick_scale: !1,
  category: "symbols"
}, L3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♊",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♋",
  fitzpatrick_scale: !1,
  category: "symbols"
}, T3 = {
  keywords: [
    "sign",
    "purple-square",
    "zodiac",
    "astrology"
  ],
  char: "♌",
  fitzpatrick_scale: !1,
  category: "symbols"
}, F3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♍",
  fitzpatrick_scale: !1,
  category: "symbols"
}, P3 = {
  keywords: [
    "sign",
    "purple-square",
    "zodiac",
    "astrology"
  ],
  char: "♎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, R3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology",
    "scorpio"
  ],
  char: "♏",
  fitzpatrick_scale: !1,
  category: "symbols"
}, I3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♐",
  fitzpatrick_scale: !1,
  category: "symbols"
}, q3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, O3 = {
  keywords: [
    "sign",
    "purple-square",
    "zodiac",
    "astrology"
  ],
  char: "♒",
  fitzpatrick_scale: !1,
  category: "symbols"
}, D3 = {
  keywords: [
    "purple-square",
    "sign",
    "zodiac",
    "astrology"
  ],
  char: "♓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, M3 = {
  keywords: [
    "purple-square",
    "words"
  ],
  char: "🆔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, B3 = {
  keywords: [
    "science",
    "physics",
    "chemistry"
  ],
  char: "⚛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, N3 = {
  keywords: [
    "kanji",
    "japanese",
    "chinese",
    "empty",
    "sky",
    "blue-square"
  ],
  char: "🈳",
  fitzpatrick_scale: !1,
  category: "symbols"
}, H3 = {
  keywords: [
    "cut",
    "divide",
    "chinese",
    "kanji",
    "pink-square"
  ],
  char: "🈹",
  fitzpatrick_scale: !1,
  category: "symbols"
}, U3 = {
  keywords: [
    "nuclear",
    "danger"
  ],
  char: "☢",
  fitzpatrick_scale: !1,
  category: "symbols"
}, V3 = {
  keywords: [
    "danger"
  ],
  char: "☣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, W3 = {
  keywords: [
    "mute",
    "orange-square",
    "silence",
    "quiet"
  ],
  char: "📴",
  fitzpatrick_scale: !1,
  category: "symbols"
}, K3 = {
  keywords: [
    "orange-square",
    "phone"
  ],
  char: "📳",
  fitzpatrick_scale: !1,
  category: "symbols"
}, G3 = {
  keywords: [
    "orange-square",
    "chinese",
    "have",
    "kanji"
  ],
  char: "🈶",
  fitzpatrick_scale: !1,
  category: "symbols"
}, X3 = {
  keywords: [
    "nothing",
    "chinese",
    "kanji",
    "japanese",
    "orange-square"
  ],
  char: "🈚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Q3 = {
  keywords: [
    "chinese",
    "japanese",
    "kanji",
    "orange-square"
  ],
  char: "🈸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, J3 = {
  keywords: [
    "japanese",
    "opening hours",
    "orange-square"
  ],
  char: "🈺",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Y3 = {
  keywords: [
    "chinese",
    "month",
    "moon",
    "japanese",
    "orange-square",
    "kanji"
  ],
  char: "🈷️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Z3 = {
  keywords: [
    "orange-square",
    "shape",
    "polygon"
  ],
  char: "✴️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, e5 = {
  keywords: [
    "words",
    "orange-square"
  ],
  char: "🆚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, a5 = {
  keywords: [
    "ok",
    "good",
    "chinese",
    "kanji",
    "agree",
    "yes",
    "orange-circle"
  ],
  char: "🉑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, t5 = {
  keywords: [
    "japanese",
    "spring"
  ],
  char: "💮",
  fitzpatrick_scale: !1,
  category: "symbols"
}, r5 = {
  keywords: [
    "chinese",
    "kanji",
    "obtain",
    "get",
    "circle"
  ],
  char: "🉐",
  fitzpatrick_scale: !1,
  category: "symbols"
}, o5 = {
  keywords: [
    "privacy",
    "chinese",
    "sshh",
    "kanji",
    "red-circle"
  ],
  char: "㊙️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, s5 = {
  keywords: [
    "chinese",
    "kanji",
    "japanese",
    "red-circle"
  ],
  char: "㊗️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, c5 = {
  keywords: [
    "japanese",
    "chinese",
    "join",
    "kanji",
    "red-square"
  ],
  char: "🈴",
  fitzpatrick_scale: !1,
  category: "symbols"
}, i5 = {
  keywords: [
    "full",
    "chinese",
    "japanese",
    "red-square",
    "kanji"
  ],
  char: "🈵",
  fitzpatrick_scale: !1,
  category: "symbols"
}, n5 = {
  keywords: [
    "kanji",
    "japanese",
    "chinese",
    "forbidden",
    "limit",
    "restricted",
    "red-square"
  ],
  char: "🈲",
  fitzpatrick_scale: !1,
  category: "symbols"
}, l5 = {
  keywords: [
    "red-square",
    "alphabet",
    "letter"
  ],
  char: "🅰️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, d5 = {
  keywords: [
    "red-square",
    "alphabet",
    "letter"
  ],
  char: "🅱️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, p5 = {
  keywords: [
    "red-square",
    "alphabet"
  ],
  char: "🆎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, f5 = {
  keywords: [
    "alphabet",
    "words",
    "red-square"
  ],
  char: "🆑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, h5 = {
  keywords: [
    "alphabet",
    "red-square",
    "letter"
  ],
  char: "🅾️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, y5 = {
  keywords: [
    "help",
    "red-square",
    "words",
    "emergency",
    "911"
  ],
  char: "🆘",
  fitzpatrick_scale: !1,
  category: "symbols"
}, g5 = {
  keywords: [
    "limit",
    "security",
    "privacy",
    "bad",
    "denied",
    "stop",
    "circle"
  ],
  char: "⛔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _5 = {
  keywords: [
    "fire",
    "forbid"
  ],
  char: "📛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, u5 = {
  keywords: [
    "forbid",
    "stop",
    "limit",
    "denied",
    "disallow",
    "circle"
  ],
  char: "🚫",
  fitzpatrick_scale: !1,
  category: "symbols"
}, m5 = {
  keywords: [
    "no",
    "delete",
    "remove",
    "cancel",
    "red"
  ],
  char: "❌",
  fitzpatrick_scale: !1,
  category: "symbols"
}, k5 = {
  keywords: [
    "circle",
    "round"
  ],
  char: "⭕",
  fitzpatrick_scale: !1,
  category: "symbols"
}, w5 = {
  keywords: [
    "stop"
  ],
  char: "🛑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, b5 = {
  keywords: [
    "angry",
    "mad"
  ],
  char: "💢",
  fitzpatrick_scale: !1,
  category: "symbols"
}, v5 = {
  keywords: [
    "bath",
    "warm",
    "relax"
  ],
  char: "♨️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, z5 = {
  keywords: [
    "rules",
    "crossing",
    "walking",
    "circle"
  ],
  char: "🚷",
  fitzpatrick_scale: !1,
  category: "symbols"
}, x5 = {
  keywords: [
    "trash",
    "bin",
    "garbage",
    "circle"
  ],
  char: "🚯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, j5 = {
  keywords: [
    "cyclist",
    "prohibited",
    "circle"
  ],
  char: "🚳",
  fitzpatrick_scale: !1,
  category: "symbols"
}, C5 = {
  keywords: [
    "18",
    "drink",
    "pub",
    "night",
    "minor",
    "circle"
  ],
  char: "🔞",
  fitzpatrick_scale: !1,
  category: "symbols"
}, E5 = {
  keywords: [
    "iphone",
    "mute",
    "circle"
  ],
  char: "📵",
  fitzpatrick_scale: !1,
  category: "symbols"
}, S5 = {
  keywords: [
    "heavy_exclamation_mark",
    "danger",
    "surprise",
    "punctuation",
    "wow",
    "warning"
  ],
  char: "❗",
  fitzpatrick_scale: !1,
  category: "symbols"
}, A5 = {
  keywords: [
    "surprise",
    "punctuation",
    "gray",
    "wow",
    "warning"
  ],
  char: "❕",
  fitzpatrick_scale: !1,
  category: "symbols"
}, L5 = {
  keywords: [
    "doubt",
    "confused"
  ],
  char: "❓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $5 = {
  keywords: [
    "doubts",
    "gray",
    "huh",
    "confused"
  ],
  char: "❔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, T5 = {
  keywords: [
    "exclamation",
    "surprise"
  ],
  char: "‼️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, F5 = {
  keywords: [
    "wat",
    "punctuation",
    "surprise"
  ],
  char: "⁉️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, P5 = {
  keywords: [
    "sun",
    "afternoon",
    "warm",
    "summer"
  ],
  char: "🔅",
  fitzpatrick_scale: !1,
  category: "symbols"
}, R5 = {
  keywords: [
    "sun",
    "light"
  ],
  char: "🔆",
  fitzpatrick_scale: !1,
  category: "symbols"
}, I5 = {
  keywords: [
    "weapon",
    "spear"
  ],
  char: "🔱",
  fitzpatrick_scale: !1,
  category: "symbols"
}, q5 = {
  keywords: [
    "decorative",
    "scout"
  ],
  char: "⚜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, O5 = {
  keywords: [
    "graph",
    "presentation",
    "stats",
    "business",
    "economics",
    "bad"
  ],
  char: "〽️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, D5 = {
  keywords: [
    "exclamation",
    "wip",
    "alert",
    "error",
    "problem",
    "issue"
  ],
  char: "⚠️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, M5 = {
  keywords: [
    "school",
    "warning",
    "danger",
    "sign",
    "driving",
    "yellow-diamond"
  ],
  char: "🚸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, B5 = {
  keywords: [
    "badge",
    "shield"
  ],
  char: "🔰",
  fitzpatrick_scale: !1,
  category: "symbols"
}, N5 = {
  keywords: [
    "arrow",
    "environment",
    "garbage",
    "trash"
  ],
  char: "♻️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, H5 = {
  keywords: [
    "chinese",
    "point",
    "green-square",
    "kanji"
  ],
  char: "🈯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, U5 = {
  keywords: [
    "green-square",
    "graph",
    "presentation",
    "stats"
  ],
  char: "💹",
  fitzpatrick_scale: !1,
  category: "symbols"
}, V5 = {
  keywords: [
    "stars",
    "green-square",
    "awesome",
    "good",
    "fireworks"
  ],
  char: "❇️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, W5 = {
  keywords: [
    "star",
    "sparkle",
    "green-square"
  ],
  char: "✳️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, K5 = {
  keywords: [
    "x",
    "green-square",
    "no",
    "deny"
  ],
  char: "❎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, G5 = {
  keywords: [
    "green-square",
    "ok",
    "agree",
    "vote",
    "election",
    "answer",
    "tick"
  ],
  char: "✅",
  fitzpatrick_scale: !1,
  category: "symbols"
}, X5 = {
  keywords: [
    "jewel",
    "blue",
    "gem",
    "crystal",
    "fancy"
  ],
  char: "💠",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Q5 = {
  keywords: [
    "weather",
    "swirl",
    "blue",
    "cloud",
    "vortex",
    "spiral",
    "whirlpool",
    "spin",
    "tornado",
    "hurricane",
    "typhoon"
  ],
  char: "🌀",
  fitzpatrick_scale: !1,
  category: "symbols"
}, J5 = {
  keywords: [
    "tape",
    "cassette"
  ],
  char: "➿",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Y5 = {
  keywords: [
    "earth",
    "international",
    "world",
    "internet",
    "interweb",
    "i18n"
  ],
  char: "🌐",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Z5 = {
  keywords: [
    "alphabet",
    "blue-circle",
    "letter"
  ],
  char: "Ⓜ️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, e4 = {
  keywords: [
    "money",
    "sales",
    "cash",
    "blue-square",
    "payment",
    "bank"
  ],
  char: "🏧",
  fitzpatrick_scale: !1,
  category: "symbols"
}, a4 = {
  keywords: [
    "japanese",
    "blue-square",
    "katakana"
  ],
  char: "🈂️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, t4 = {
  keywords: [
    "custom",
    "blue-square"
  ],
  char: "🛂",
  fitzpatrick_scale: !1,
  category: "symbols"
}, r4 = {
  keywords: [
    "passport",
    "border",
    "blue-square"
  ],
  char: "🛃",
  fitzpatrick_scale: !1,
  category: "symbols"
}, o4 = {
  keywords: [
    "blue-square",
    "airport",
    "transport"
  ],
  char: "🛄",
  fitzpatrick_scale: !1,
  category: "symbols"
}, s4 = {
  keywords: [
    "blue-square",
    "travel"
  ],
  char: "🛅",
  fitzpatrick_scale: !1,
  category: "symbols"
}, c4 = {
  keywords: [
    "blue-square",
    "disabled",
    "a11y",
    "accessibility"
  ],
  char: "♿",
  fitzpatrick_scale: !1,
  category: "symbols"
}, i4 = {
  keywords: [
    "cigarette",
    "blue-square",
    "smell",
    "smoke"
  ],
  char: "🚭",
  fitzpatrick_scale: !1,
  category: "symbols"
}, n4 = {
  keywords: [
    "toilet",
    "restroom",
    "blue-square"
  ],
  char: "🚾",
  fitzpatrick_scale: !1,
  category: "symbols"
}, l4 = {
  keywords: [
    "cars",
    "blue-square",
    "alphabet",
    "letter"
  ],
  char: "🅿️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, d4 = {
  keywords: [
    "blue-square",
    "liquid",
    "restroom",
    "cleaning",
    "faucet"
  ],
  char: "🚰",
  fitzpatrick_scale: !1,
  category: "symbols"
}, p4 = {
  keywords: [
    "toilet",
    "restroom",
    "wc",
    "blue-square",
    "gender",
    "male"
  ],
  char: "🚹",
  fitzpatrick_scale: !1,
  category: "symbols"
}, f4 = {
  keywords: [
    "purple-square",
    "woman",
    "female",
    "toilet",
    "loo",
    "restroom",
    "gender"
  ],
  char: "🚺",
  fitzpatrick_scale: !1,
  category: "symbols"
}, h4 = {
  keywords: [
    "orange-square",
    "child"
  ],
  char: "🚼",
  fitzpatrick_scale: !1,
  category: "symbols"
}, y4 = {
  keywords: [
    "blue-square",
    "toilet",
    "refresh",
    "wc",
    "gender"
  ],
  char: "🚻",
  fitzpatrick_scale: !1,
  category: "symbols"
}, g4 = {
  keywords: [
    "blue-square",
    "sign",
    "human",
    "info"
  ],
  char: "🚮",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _4 = {
  keywords: [
    "blue-square",
    "record",
    "film",
    "movie",
    "curtain",
    "stage",
    "theater"
  ],
  char: "🎦",
  fitzpatrick_scale: !1,
  category: "symbols"
}, u4 = {
  keywords: [
    "blue-square",
    "reception",
    "phone",
    "internet",
    "connection",
    "wifi",
    "bluetooth",
    "bars"
  ],
  char: "📶",
  fitzpatrick_scale: !1,
  category: "symbols"
}, m4 = {
  keywords: [
    "blue-square",
    "here",
    "katakana",
    "japanese",
    "destination"
  ],
  char: "🈁",
  fitzpatrick_scale: !1,
  category: "symbols"
}, k4 = {
  keywords: [
    "blue-square",
    "words",
    "shape",
    "icon"
  ],
  char: "🆖",
  fitzpatrick_scale: !1,
  category: "symbols"
}, w4 = {
  keywords: [
    "good",
    "agree",
    "yes",
    "blue-square"
  ],
  char: "🆗",
  fitzpatrick_scale: !1,
  category: "symbols"
}, b4 = {
  keywords: [
    "blue-square",
    "above",
    "high"
  ],
  char: "🆙",
  fitzpatrick_scale: !1,
  category: "symbols"
}, v4 = {
  keywords: [
    "words",
    "blue-square"
  ],
  char: "🆒",
  fitzpatrick_scale: !1,
  category: "symbols"
}, z4 = {
  keywords: [
    "blue-square",
    "words"
  ],
  char: "🆓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, x4 = {
  keywords: [
    "0",
    "numbers",
    "blue-square",
    "null"
  ],
  char: "0️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, j4 = {
  keywords: [
    "blue-square",
    "numbers",
    "1"
  ],
  char: "1️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, C4 = {
  keywords: [
    "numbers",
    "2",
    "prime",
    "blue-square"
  ],
  char: "2️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, E4 = {
  keywords: [
    "3",
    "numbers",
    "prime",
    "blue-square"
  ],
  char: "3️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, S4 = {
  keywords: [
    "4",
    "numbers",
    "blue-square"
  ],
  char: "4️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, A4 = {
  keywords: [
    "5",
    "numbers",
    "blue-square",
    "prime"
  ],
  char: "5️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, L4 = {
  keywords: [
    "6",
    "numbers",
    "blue-square"
  ],
  char: "6️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $4 = {
  keywords: [
    "7",
    "numbers",
    "blue-square",
    "prime"
  ],
  char: "7️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, T4 = {
  keywords: [
    "8",
    "blue-square",
    "numbers"
  ],
  char: "8️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, F4 = {
  keywords: [
    "blue-square",
    "numbers",
    "9"
  ],
  char: "9️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, P4 = {
  keywords: [
    "numbers",
    "10",
    "blue-square"
  ],
  char: "🔟",
  fitzpatrick_scale: !1,
  category: "symbols"
}, R4 = {
  keywords: [
    "star",
    "keycap"
  ],
  char: "*⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, I4 = {
  keywords: [
    "blue-square"
  ],
  char: "⏏️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, q4 = {
  keywords: [
    "blue-square",
    "right",
    "direction",
    "play"
  ],
  char: "▶️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, O4 = {
  keywords: [
    "pause",
    "blue-square"
  ],
  char: "⏸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, D4 = {
  keywords: [
    "forward",
    "next",
    "blue-square"
  ],
  char: "⏭",
  fitzpatrick_scale: !1,
  category: "symbols"
}, M4 = {
  keywords: [
    "blue-square"
  ],
  char: "⏹",
  fitzpatrick_scale: !1,
  category: "symbols"
}, B4 = {
  keywords: [
    "blue-square"
  ],
  char: "⏺",
  fitzpatrick_scale: !1,
  category: "symbols"
}, N4 = {
  keywords: [
    "blue-square",
    "play",
    "pause"
  ],
  char: "⏯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, H4 = {
  keywords: [
    "backward"
  ],
  char: "⏮",
  fitzpatrick_scale: !1,
  category: "symbols"
}, U4 = {
  keywords: [
    "blue-square",
    "play",
    "speed",
    "continue"
  ],
  char: "⏩",
  fitzpatrick_scale: !1,
  category: "symbols"
}, V4 = {
  keywords: [
    "play",
    "blue-square"
  ],
  char: "⏪",
  fitzpatrick_scale: !1,
  category: "symbols"
}, W4 = {
  keywords: [
    "blue-square",
    "shuffle",
    "music",
    "random"
  ],
  char: "🔀",
  fitzpatrick_scale: !1,
  category: "symbols"
}, K4 = {
  keywords: [
    "loop",
    "record"
  ],
  char: "🔁",
  fitzpatrick_scale: !1,
  category: "symbols"
}, G4 = {
  keywords: [
    "blue-square",
    "loop"
  ],
  char: "🔂",
  fitzpatrick_scale: !1,
  category: "symbols"
}, X4 = {
  keywords: [
    "blue-square",
    "left",
    "direction"
  ],
  char: "◀️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Q4 = {
  keywords: [
    "blue-square",
    "triangle",
    "direction",
    "point",
    "forward",
    "top"
  ],
  char: "🔼",
  fitzpatrick_scale: !1,
  category: "symbols"
}, J4 = {
  keywords: [
    "blue-square",
    "direction",
    "bottom"
  ],
  char: "🔽",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Y4 = {
  keywords: [
    "blue-square",
    "direction",
    "top"
  ],
  char: "⏫",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Z4 = {
  keywords: [
    "blue-square",
    "direction",
    "bottom"
  ],
  char: "⏬",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ex = {
  keywords: [
    "blue-square",
    "next"
  ],
  char: "➡️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ax = {
  keywords: [
    "blue-square",
    "previous",
    "back"
  ],
  char: "⬅️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, tx = {
  keywords: [
    "blue-square",
    "continue",
    "top",
    "direction"
  ],
  char: "⬆️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, rx = {
  keywords: [
    "blue-square",
    "direction",
    "bottom"
  ],
  char: "⬇️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ox = {
  keywords: [
    "blue-square",
    "point",
    "direction",
    "diagonal",
    "northeast"
  ],
  char: "↗️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, sx = {
  keywords: [
    "blue-square",
    "direction",
    "diagonal",
    "southeast"
  ],
  char: "↘️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, cx = {
  keywords: [
    "blue-square",
    "direction",
    "diagonal",
    "southwest"
  ],
  char: "↙️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ix = {
  keywords: [
    "blue-square",
    "point",
    "direction",
    "diagonal",
    "northwest"
  ],
  char: "↖️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, nx = {
  keywords: [
    "blue-square",
    "direction",
    "way",
    "vertical"
  ],
  char: "↕️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, lx = {
  keywords: [
    "shape",
    "direction",
    "horizontal",
    "sideways"
  ],
  char: "↔️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, dx = {
  keywords: [
    "blue-square",
    "sync",
    "cycle"
  ],
  char: "🔄",
  fitzpatrick_scale: !1,
  category: "symbols"
}, px = {
  keywords: [
    "blue-square",
    "return",
    "rotate",
    "direction"
  ],
  char: "↪️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, fx = {
  keywords: [
    "back",
    "return",
    "blue-square",
    "undo",
    "enter"
  ],
  char: "↩️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, hx = {
  keywords: [
    "blue-square",
    "direction",
    "top"
  ],
  char: "⤴️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, yx = {
  keywords: [
    "blue-square",
    "direction",
    "bottom"
  ],
  char: "⤵️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, gx = {
  keywords: [
    "symbol",
    "blue-square",
    "twitter"
  ],
  char: "#️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _x = {
  keywords: [
    "blue-square",
    "alphabet",
    "letter"
  ],
  char: "ℹ️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ux = {
  keywords: [
    "blue-square",
    "alphabet"
  ],
  char: "🔤",
  fitzpatrick_scale: !1,
  category: "symbols"
}, mx = {
  keywords: [
    "blue-square",
    "alphabet"
  ],
  char: "🔡",
  fitzpatrick_scale: !1,
  category: "symbols"
}, kx = {
  keywords: [
    "alphabet",
    "words",
    "blue-square"
  ],
  char: "🔠",
  fitzpatrick_scale: !1,
  category: "symbols"
}, wx = {
  keywords: [
    "blue-square",
    "music",
    "note",
    "ampersand",
    "percent",
    "glyphs",
    "characters"
  ],
  char: "🔣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, bx = {
  keywords: [
    "score",
    "tone",
    "sound"
  ],
  char: "🎵",
  fitzpatrick_scale: !1,
  category: "symbols"
}, vx = {
  keywords: [
    "music",
    "score"
  ],
  char: "🎶",
  fitzpatrick_scale: !1,
  category: "symbols"
}, zx = {
  keywords: [
    "draw",
    "line",
    "moustache",
    "mustache",
    "squiggle",
    "scribble"
  ],
  char: "〰️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, xx = {
  keywords: [
    "scribble",
    "draw",
    "shape",
    "squiggle"
  ],
  char: "➰",
  fitzpatrick_scale: !1,
  category: "symbols"
}, jx = {
  keywords: [
    "ok",
    "nike",
    "answer",
    "yes",
    "tick"
  ],
  char: "✔️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Cx = {
  keywords: [
    "sync",
    "cycle",
    "round",
    "repeat"
  ],
  char: "🔃",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ex = {
  keywords: [
    "math",
    "calculation",
    "addition",
    "more",
    "increase"
  ],
  char: "➕",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Sx = {
  keywords: [
    "math",
    "calculation",
    "subtract",
    "less"
  ],
  char: "➖",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ax = {
  keywords: [
    "divide",
    "math",
    "calculation"
  ],
  char: "➗",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Lx = {
  keywords: [
    "math",
    "calculation"
  ],
  char: "✖️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $x = {
  keywords: [
    "forever"
  ],
  char: "♾",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Tx = {
  keywords: [
    "money",
    "sales",
    "payment",
    "currency",
    "buck"
  ],
  char: "💲",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Fx = {
  keywords: [
    "money",
    "sales",
    "dollar",
    "travel"
  ],
  char: "💱",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Px = {
  keywords: [
    "ip",
    "license",
    "circle",
    "law",
    "legal"
  ],
  char: "©️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Rx = {
  keywords: [
    "alphabet",
    "circle"
  ],
  char: "®️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ix = {
  keywords: [
    "trademark",
    "brand",
    "law",
    "legal"
  ],
  char: "™️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, qx = {
  keywords: [
    "words",
    "arrow"
  ],
  char: "🔚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ox = {
  keywords: [
    "arrow",
    "words",
    "return"
  ],
  char: "🔙",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Dx = {
  keywords: [
    "arrow",
    "words"
  ],
  char: "🔛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Mx = {
  keywords: [
    "words",
    "blue-square"
  ],
  char: "🔝",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Bx = {
  keywords: [
    "arrow",
    "words"
  ],
  char: "🔜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Nx = {
  keywords: [
    "ok",
    "agree",
    "confirm",
    "black-square",
    "vote",
    "election",
    "yes",
    "tick"
  ],
  char: "☑️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Hx = {
  keywords: [
    "input",
    "old",
    "music",
    "circle"
  ],
  char: "🔘",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ux = {
  keywords: [
    "shape",
    "round"
  ],
  char: "⚪",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Vx = {
  keywords: [
    "shape",
    "button",
    "round"
  ],
  char: "⚫",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Wx = {
  keywords: [
    "shape",
    "error",
    "danger"
  ],
  char: "🔴",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Kx = {
  keywords: [
    "shape",
    "icon",
    "button"
  ],
  char: "🔵",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Gx = {
  keywords: [
    "shape",
    "jewel",
    "gem"
  ],
  char: "🔸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Xx = {
  keywords: [
    "shape",
    "jewel",
    "gem"
  ],
  char: "🔹",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Qx = {
  keywords: [
    "shape",
    "jewel",
    "gem"
  ],
  char: "🔶",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Jx = {
  keywords: [
    "shape",
    "jewel",
    "gem"
  ],
  char: "🔷",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Yx = {
  keywords: [
    "shape",
    "direction",
    "up",
    "top"
  ],
  char: "🔺",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Zx = {
  keywords: [
    "shape",
    "icon"
  ],
  char: "▪️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ej = {
  keywords: [
    "shape",
    "icon"
  ],
  char: "▫️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, aj = {
  keywords: [
    "shape",
    "icon",
    "button"
  ],
  char: "⬛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, tj = {
  keywords: [
    "shape",
    "icon",
    "stone",
    "button"
  ],
  char: "⬜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, rj = {
  keywords: [
    "shape",
    "direction",
    "bottom"
  ],
  char: "🔻",
  fitzpatrick_scale: !1,
  category: "symbols"
}, oj = {
  keywords: [
    "shape",
    "button",
    "icon"
  ],
  char: "◼️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, sj = {
  keywords: [
    "shape",
    "stone",
    "icon"
  ],
  char: "◻️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, cj = {
  keywords: [
    "icon",
    "shape",
    "button"
  ],
  char: "◾",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ij = {
  keywords: [
    "shape",
    "stone",
    "icon",
    "button"
  ],
  char: "◽",
  fitzpatrick_scale: !1,
  category: "symbols"
}, nj = {
  keywords: [
    "shape",
    "input",
    "frame"
  ],
  char: "🔲",
  fitzpatrick_scale: !1,
  category: "symbols"
}, lj = {
  keywords: [
    "shape",
    "input"
  ],
  char: "🔳",
  fitzpatrick_scale: !1,
  category: "symbols"
}, dj = {
  keywords: [
    "sound",
    "volume",
    "silence",
    "broadcast"
  ],
  char: "🔈",
  fitzpatrick_scale: !1,
  category: "symbols"
}, pj = {
  keywords: [
    "volume",
    "speaker",
    "broadcast"
  ],
  char: "🔉",
  fitzpatrick_scale: !1,
  category: "symbols"
}, fj = {
  keywords: [
    "volume",
    "noise",
    "noisy",
    "speaker",
    "broadcast"
  ],
  char: "🔊",
  fitzpatrick_scale: !1,
  category: "symbols"
}, hj = {
  keywords: [
    "sound",
    "volume",
    "silence",
    "quiet"
  ],
  char: "🔇",
  fitzpatrick_scale: !1,
  category: "symbols"
}, yj = {
  keywords: [
    "sound",
    "speaker",
    "volume"
  ],
  char: "📣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, gj = {
  keywords: [
    "volume",
    "sound"
  ],
  char: "📢",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _j = {
  keywords: [
    "sound",
    "notification",
    "christmas",
    "xmas",
    "chime"
  ],
  char: "🔔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, uj = {
  keywords: [
    "sound",
    "volume",
    "mute",
    "quiet",
    "silent"
  ],
  char: "🔕",
  fitzpatrick_scale: !1,
  category: "symbols"
}, mj = {
  keywords: [
    "poker",
    "cards",
    "game",
    "play",
    "magic"
  ],
  char: "🃏",
  fitzpatrick_scale: !1,
  category: "symbols"
}, kj = {
  keywords: [
    "game",
    "play",
    "chinese",
    "kanji"
  ],
  char: "🀄",
  fitzpatrick_scale: !1,
  category: "symbols"
}, wj = {
  keywords: [
    "poker",
    "cards",
    "suits",
    "magic"
  ],
  char: "♠️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, bj = {
  keywords: [
    "poker",
    "cards",
    "magic",
    "suits"
  ],
  char: "♣️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, vj = {
  keywords: [
    "poker",
    "cards",
    "magic",
    "suits"
  ],
  char: "♥️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, zj = {
  keywords: [
    "poker",
    "cards",
    "magic",
    "suits"
  ],
  char: "♦️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, xj = {
  keywords: [
    "game",
    "sunset",
    "red"
  ],
  char: "🎴",
  fitzpatrick_scale: !1,
  category: "symbols"
}, jj = {
  keywords: [
    "bubble",
    "cloud",
    "speech",
    "thinking",
    "dream"
  ],
  char: "💭",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Cj = {
  keywords: [
    "caption",
    "speech",
    "thinking",
    "mad"
  ],
  char: "🗯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ej = {
  keywords: [
    "bubble",
    "words",
    "message",
    "talk",
    "chatting"
  ],
  char: "💬",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Sj = {
  keywords: [
    "words",
    "message",
    "talk",
    "chatting"
  ],
  char: "🗨",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Aj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕐",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Lj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $j = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕒",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Tj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Fj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Pj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule",
    "dawn",
    "dusk"
  ],
  char: "🕕",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Rj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕖",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ij = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕗",
  fitzpatrick_scale: !1,
  category: "symbols"
}, qj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕘",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Oj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕙",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Dj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Mj = {
  keywords: [
    "time",
    "noon",
    "midnight",
    "midday",
    "late",
    "early",
    "schedule"
  ],
  char: "🕛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Bj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Nj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕝",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Hj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕞",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Uj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕟",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Vj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕠",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Wj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕡",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Kj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕢",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Gj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Xj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕤",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Qj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕥",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Jj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕦",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Yj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕧",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Zj = {
  keywords: [
    "af",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇫",
  fitzpatrick_scale: !1,
  category: "flags"
}, e6 = {
  keywords: [
    "Åland",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇽",
  fitzpatrick_scale: !1,
  category: "flags"
}, a6 = {
  keywords: [
    "al",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, t6 = {
  keywords: [
    "dz",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇩🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, r6 = {
  keywords: [
    "american",
    "ws",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, o6 = {
  keywords: [
    "ad",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, s6 = {
  keywords: [
    "ao",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, c6 = {
  keywords: [
    "ai",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, i6 = {
  keywords: [
    "aq",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇶",
  fitzpatrick_scale: !1,
  category: "flags"
}, n6 = {
  keywords: [
    "antigua",
    "barbuda",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, l6 = {
  keywords: [
    "ar",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, d6 = {
  keywords: [
    "am",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, p6 = {
  keywords: [
    "aw",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, f6 = {
  keywords: [
    "au",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, h6 = {
  keywords: [
    "at",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, y6 = {
  keywords: [
    "az",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, g6 = {
  keywords: [
    "bs",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, _6 = {
  keywords: [
    "bh",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, u6 = {
  keywords: [
    "bd",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, m6 = {
  keywords: [
    "bb",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇧",
  fitzpatrick_scale: !1,
  category: "flags"
}, k6 = {
  keywords: [
    "by",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, w6 = {
  keywords: [
    "be",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, b6 = {
  keywords: [
    "bz",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, v6 = {
  keywords: [
    "bj",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇯",
  fitzpatrick_scale: !1,
  category: "flags"
}, z6 = {
  keywords: [
    "bm",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, x6 = {
  keywords: [
    "bt",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, j6 = {
  keywords: [
    "bo",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, C6 = {
  keywords: [
    "bonaire",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇶",
  fitzpatrick_scale: !1,
  category: "flags"
}, E6 = {
  keywords: [
    "bosnia",
    "herzegovina",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, S6 = {
  keywords: [
    "bw",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, A6 = {
  keywords: [
    "br",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, L6 = {
  keywords: [
    "british",
    "indian",
    "ocean",
    "territory",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, $6 = {
  keywords: [
    "british",
    "virgin",
    "islands",
    "bvi",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇻🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, T6 = {
  keywords: [
    "bn",
    "darussalam",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, F6 = {
  keywords: [
    "bg",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, P6 = {
  keywords: [
    "burkina",
    "faso",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇫",
  fitzpatrick_scale: !1,
  category: "flags"
}, R6 = {
  keywords: [
    "bi",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, I6 = {
  keywords: [
    "cabo",
    "verde",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇻",
  fitzpatrick_scale: !1,
  category: "flags"
}, q6 = {
  keywords: [
    "kh",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, O6 = {
  keywords: [
    "cm",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, D6 = {
  keywords: [
    "ca",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, M6 = {
  keywords: [
    "canary",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, B6 = {
  keywords: [
    "cayman",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, N6 = {
  keywords: [
    "central",
    "african",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇫",
  fitzpatrick_scale: !1,
  category: "flags"
}, H6 = {
  keywords: [
    "td",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, U6 = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, V6 = {
  keywords: [
    "china",
    "chinese",
    "prc",
    "flag",
    "country",
    "nation",
    "banner"
  ],
  char: "🇨🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, W6 = {
  keywords: [
    "christmas",
    "island",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇽",
  fitzpatrick_scale: !1,
  category: "flags"
}, K6 = {
  keywords: [
    "cocos",
    "keeling",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, G6 = {
  keywords: [
    "co",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, X6 = {
  keywords: [
    "km",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, Q6 = {
  keywords: [
    "congo",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, J6 = {
  keywords: [
    "congo",
    "democratic",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, Y6 = {
  keywords: [
    "cook",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, Z6 = {
  keywords: [
    "costa",
    "rica",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, eC = {
  keywords: [
    "hr",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇭🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, aC = {
  keywords: [
    "cu",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, tC = {
  keywords: [
    "curaçao",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, rC = {
  keywords: [
    "cy",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, oC = {
  keywords: [
    "cz",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, sC = {
  keywords: [
    "dk",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇩🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, cC = {
  keywords: [
    "dj",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇩🇯",
  fitzpatrick_scale: !1,
  category: "flags"
}, iC = {
  keywords: [
    "dm",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇩🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, nC = {
  keywords: [
    "dominican",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇩🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, lC = {
  keywords: [
    "ec",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇪🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, dC = {
  keywords: [
    "eg",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇪🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, pC = {
  keywords: [
    "el",
    "salvador",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇻",
  fitzpatrick_scale: !1,
  category: "flags"
}, fC = {
  keywords: [
    "equatorial",
    "gn",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇶",
  fitzpatrick_scale: !1,
  category: "flags"
}, hC = {
  keywords: [
    "er",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇪🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, yC = {
  keywords: [
    "ee",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇪🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, gC = {
  keywords: [
    "et",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇪🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, _C = {
  keywords: [
    "european",
    "union",
    "flag",
    "banner"
  ],
  char: "🇪🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, uC = {
  keywords: [
    "falkland",
    "islands",
    "malvinas",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇫🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, mC = {
  keywords: [
    "faroe",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇫🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, kC = {
  keywords: [
    "fj",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇫🇯",
  fitzpatrick_scale: !1,
  category: "flags"
}, wC = {
  keywords: [
    "fi",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇫🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, bC = {
  keywords: [
    "banner",
    "flag",
    "nation",
    "france",
    "french",
    "country"
  ],
  char: "🇫🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, vC = {
  keywords: [
    "french",
    "guiana",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇫",
  fitzpatrick_scale: !1,
  category: "flags"
}, zC = {
  keywords: [
    "french",
    "polynesia",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇫",
  fitzpatrick_scale: !1,
  category: "flags"
}, xC = {
  keywords: [
    "french",
    "southern",
    "territories",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇫",
  fitzpatrick_scale: !1,
  category: "flags"
}, jC = {
  keywords: [
    "ga",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, CC = {
  keywords: [
    "gm",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, EC = {
  keywords: [
    "ge",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, SC = {
  keywords: [
    "german",
    "nation",
    "flag",
    "country",
    "banner"
  ],
  char: "🇩🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, AC = {
  keywords: [
    "gh",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, LC = {
  keywords: [
    "gi",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, $C = {
  keywords: [
    "gr",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, TC = {
  keywords: [
    "gl",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, FC = {
  keywords: [
    "gd",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, PC = {
  keywords: [
    "gp",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇵",
  fitzpatrick_scale: !1,
  category: "flags"
}, RC = {
  keywords: [
    "gu",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, IC = {
  keywords: [
    "gt",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, qC = {
  keywords: [
    "gg",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, OC = {
  keywords: [
    "gn",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, DC = {
  keywords: [
    "gw",
    "bissau",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, MC = {
  keywords: [
    "gy",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, BC = {
  keywords: [
    "ht",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇭🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, NC = {
  keywords: [
    "hn",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇭🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, HC = {
  keywords: [
    "hong",
    "kong",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇭🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, UC = {
  keywords: [
    "hu",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇭🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, VC = {
  keywords: [
    "is",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, WC = {
  keywords: [
    "in",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, KC = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, GC = {
  keywords: [
    "iran,",
    "islamic",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, XC = {
  keywords: [
    "iq",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇶",
  fitzpatrick_scale: !1,
  category: "flags"
}, QC = {
  keywords: [
    "ie",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, JC = {
  keywords: [
    "isle",
    "man",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, YC = {
  keywords: [
    "il",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, ZC = {
  keywords: [
    "italy",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, e8 = {
  keywords: [
    "ivory",
    "coast",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, a8 = {
  keywords: [
    "jm",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇯🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, t8 = {
  keywords: [
    "japanese",
    "nation",
    "flag",
    "country",
    "banner"
  ],
  char: "🇯🇵",
  fitzpatrick_scale: !1,
  category: "flags"
}, r8 = {
  keywords: [
    "je",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇯🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, o8 = {
  keywords: [
    "jo",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇯🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, s8 = {
  keywords: [
    "kz",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, c8 = {
  keywords: [
    "ke",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, i8 = {
  keywords: [
    "ki",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, n8 = {
  keywords: [
    "xk",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇽🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, l8 = {
  keywords: [
    "kw",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, d8 = {
  keywords: [
    "kg",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, p8 = {
  keywords: [
    "lao",
    "democratic",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, f8 = {
  keywords: [
    "lv",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇻",
  fitzpatrick_scale: !1,
  category: "flags"
}, h8 = {
  keywords: [
    "lb",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇧",
  fitzpatrick_scale: !1,
  category: "flags"
}, y8 = {
  keywords: [
    "ls",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, g8 = {
  keywords: [
    "lr",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, _8 = {
  keywords: [
    "ly",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, u8 = {
  keywords: [
    "li",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, m8 = {
  keywords: [
    "lt",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, k8 = {
  keywords: [
    "lu",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, w8 = {
  keywords: [
    "macao",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, b8 = {
  keywords: [
    "macedonia,",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, v8 = {
  keywords: [
    "mg",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, z8 = {
  keywords: [
    "mw",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, x8 = {
  keywords: [
    "my",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, j8 = {
  keywords: [
    "mv",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇻",
  fitzpatrick_scale: !1,
  category: "flags"
}, C8 = {
  keywords: [
    "ml",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, E8 = {
  keywords: [
    "mt",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, S8 = {
  keywords: [
    "marshall",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, A8 = {
  keywords: [
    "mq",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇶",
  fitzpatrick_scale: !1,
  category: "flags"
}, L8 = {
  keywords: [
    "mr",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, $8 = {
  keywords: [
    "mu",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, T8 = {
  keywords: [
    "yt",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇾🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, F8 = {
  keywords: [
    "mx",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇽",
  fitzpatrick_scale: !1,
  category: "flags"
}, P8 = {
  keywords: [
    "micronesia,",
    "federated",
    "states",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇫🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, R8 = {
  keywords: [
    "moldova,",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, I8 = {
  keywords: [
    "mc",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, q8 = {
  keywords: [
    "mn",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, O8 = {
  keywords: [
    "me",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, D8 = {
  keywords: [
    "ms",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, M8 = {
  keywords: [
    "ma",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, B8 = {
  keywords: [
    "mz",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, N8 = {
  keywords: [
    "mm",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, H8 = {
  keywords: [
    "na",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, U8 = {
  keywords: [
    "nr",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, V8 = {
  keywords: [
    "np",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇵",
  fitzpatrick_scale: !1,
  category: "flags"
}, W8 = {
  keywords: [
    "nl",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, K8 = {
  keywords: [
    "new",
    "caledonia",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, G8 = {
  keywords: [
    "new",
    "zealand",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, X8 = {
  keywords: [
    "ni",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, Q8 = {
  keywords: [
    "ne",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, J8 = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, Y8 = {
  keywords: [
    "nu",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, Z8 = {
  keywords: [
    "norfolk",
    "island",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇫",
  fitzpatrick_scale: !1,
  category: "flags"
}, e7 = {
  keywords: [
    "northern",
    "mariana",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇲🇵",
  fitzpatrick_scale: !1,
  category: "flags"
}, a7 = {
  keywords: [
    "north",
    "korea",
    "nation",
    "flag",
    "country",
    "banner"
  ],
  char: "🇰🇵",
  fitzpatrick_scale: !1,
  category: "flags"
}, t7 = {
  keywords: [
    "no",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, r7 = {
  keywords: [
    "om_symbol",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇴🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, o7 = {
  keywords: [
    "pk",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, s7 = {
  keywords: [
    "pw",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, c7 = {
  keywords: [
    "palestine",
    "palestinian",
    "territories",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, i7 = {
  keywords: [
    "pa",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, n7 = {
  keywords: [
    "papua",
    "new",
    "guinea",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, l7 = {
  keywords: [
    "py",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, d7 = {
  keywords: [
    "pe",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, p7 = {
  keywords: [
    "ph",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, f7 = {
  keywords: [
    "pitcairn",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, h7 = {
  keywords: [
    "pl",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, y7 = {
  keywords: [
    "pt",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, g7 = {
  keywords: [
    "puerto",
    "rico",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, _7 = {
  keywords: [
    "qa",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇶🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, u7 = {
  keywords: [
    "réunion",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇷🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, m7 = {
  keywords: [
    "ro",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇷🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, k7 = {
  keywords: [
    "russian",
    "federation",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇷🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, w7 = {
  keywords: [
    "rw",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇷🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, b7 = {
  keywords: [
    "saint",
    "barthélemy",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇧🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, v7 = {
  keywords: [
    "saint",
    "helena",
    "ascension",
    "tristan",
    "cunha",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, z7 = {
  keywords: [
    "saint",
    "kitts",
    "nevis",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇰🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, x7 = {
  keywords: [
    "saint",
    "lucia",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, j7 = {
  keywords: [
    "saint",
    "pierre",
    "miquelon",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇵🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, C7 = {
  keywords: [
    "saint",
    "vincent",
    "grenadines",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇻🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, E7 = {
  keywords: [
    "ws",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇼🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, S7 = {
  keywords: [
    "san",
    "marino",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, A7 = {
  keywords: [
    "sao",
    "tome",
    "principe",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, L7 = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, $7 = {
  keywords: [
    "sn",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, T7 = {
  keywords: [
    "rs",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇷🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, F7 = {
  keywords: [
    "sc",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, P7 = {
  keywords: [
    "sierra",
    "leone",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, R7 = {
  keywords: [
    "sg",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, I7 = {
  keywords: [
    "sint",
    "maarten",
    "dutch",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇽",
  fitzpatrick_scale: !1,
  category: "flags"
}, q7 = {
  keywords: [
    "sk",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, O7 = {
  keywords: [
    "si",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, D7 = {
  keywords: [
    "solomon",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇧",
  fitzpatrick_scale: !1,
  category: "flags"
}, M7 = {
  keywords: [
    "so",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, B7 = {
  keywords: [
    "south",
    "africa",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇿🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, N7 = {
  keywords: [
    "south",
    "georgia",
    "sandwich",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇬🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, H7 = {
  keywords: [
    "south",
    "korea",
    "nation",
    "flag",
    "country",
    "banner"
  ],
  char: "🇰🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, U7 = {
  keywords: [
    "south",
    "sd",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, V7 = {
  keywords: [
    "spain",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇪🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, W7 = {
  keywords: [
    "sri",
    "lanka",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇱🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, K7 = {
  keywords: [
    "sd",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, G7 = {
  keywords: [
    "sr",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, X7 = {
  keywords: [
    "sz",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, Q7 = {
  keywords: [
    "se",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, J7 = {
  keywords: [
    "ch",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, Y7 = {
  keywords: [
    "syrian",
    "arab",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, Z7 = {
  keywords: [
    "tw",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, eE = {
  keywords: [
    "tj",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇯",
  fitzpatrick_scale: !1,
  category: "flags"
}, aE = {
  keywords: [
    "tanzania,",
    "united",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, tE = {
  keywords: [
    "th",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, rE = {
  keywords: [
    "timor",
    "leste",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, oE = {
  keywords: [
    "tg",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, sE = {
  keywords: [
    "tk",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇰",
  fitzpatrick_scale: !1,
  category: "flags"
}, cE = {
  keywords: [
    "to",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇴",
  fitzpatrick_scale: !1,
  category: "flags"
}, iE = {
  keywords: [
    "trinidad",
    "tobago",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇹",
  fitzpatrick_scale: !1,
  category: "flags"
}, nE = {
  keywords: [
    "tn",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, lE = {
  keywords: [
    "turkey",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇷",
  fitzpatrick_scale: !1,
  category: "flags"
}, dE = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, pE = {
  keywords: [
    "turks",
    "caicos",
    "islands",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇨",
  fitzpatrick_scale: !1,
  category: "flags"
}, fE = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇻",
  fitzpatrick_scale: !1,
  category: "flags"
}, hE = {
  keywords: [
    "ug",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇺🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, yE = {
  keywords: [
    "ua",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇺🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, gE = {
  keywords: [
    "united",
    "arab",
    "emirates",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇦🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, _E = {
  keywords: [
    "united",
    "kingdom",
    "great",
    "britain",
    "northern",
    "ireland",
    "flag",
    "nation",
    "country",
    "banner",
    "british",
    "UK",
    "english",
    "england",
    "union jack"
  ],
  char: "🇬🇧",
  fitzpatrick_scale: !1,
  category: "flags"
}, uE = {
  keywords: [
    "flag",
    "english"
  ],
  char: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  fitzpatrick_scale: !1,
  category: "flags"
}, mE = {
  keywords: [
    "flag",
    "scottish"
  ],
  char: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  fitzpatrick_scale: !1,
  category: "flags"
}, kE = {
  keywords: [
    "flag",
    "welsh"
  ],
  char: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  fitzpatrick_scale: !1,
  category: "flags"
}, wE = {
  keywords: [
    "united",
    "states",
    "america",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇺🇸",
  fitzpatrick_scale: !1,
  category: "flags"
}, bE = {
  keywords: [
    "virgin",
    "islands",
    "us",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇻🇮",
  fitzpatrick_scale: !1,
  category: "flags"
}, vE = {
  keywords: [
    "uy",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇺🇾",
  fitzpatrick_scale: !1,
  category: "flags"
}, zE = {
  keywords: [
    "uz",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇺🇿",
  fitzpatrick_scale: !1,
  category: "flags"
}, xE = {
  keywords: [
    "vu",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇻🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, jE = {
  keywords: [
    "vatican",
    "city",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇻🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, CE = {
  keywords: [
    "ve",
    "bolivarian",
    "republic",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇻🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, EE = {
  keywords: [
    "viet",
    "nam",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇻🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, SE = {
  keywords: [
    "wallis",
    "futuna",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇼🇫",
  fitzpatrick_scale: !1,
  category: "flags"
}, AE = {
  keywords: [
    "western",
    "sahara",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇪🇭",
  fitzpatrick_scale: !1,
  category: "flags"
}, LE = {
  keywords: [
    "ye",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇾🇪",
  fitzpatrick_scale: !1,
  category: "flags"
}, $E = {
  keywords: [
    "zm",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇿🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, TE = {
  keywords: [
    "zw",
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇿🇼",
  fitzpatrick_scale: !1,
  category: "flags"
}, FE = {
  keywords: [
    "un",
    "flag",
    "banner"
  ],
  char: "🇺🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, PE = {
  keywords: [
    "skull",
    "crossbones",
    "flag",
    "banner"
  ],
  char: "🏴‍☠️",
  fitzpatrick_scale: !1,
  category: "flags"
}, RE = {
  100: {
    keywords: [
      "score",
      "perfect",
      "numbers",
      "century",
      "exam",
      "quiz",
      "test",
      "pass",
      "hundred"
    ],
    char: "💯",
    fitzpatrick_scale: !1,
    category: "symbols"
  },
  1234: {
    keywords: [
      "numbers",
      "blue-square"
    ],
    char: "🔢",
    fitzpatrick_scale: !1,
    category: "symbols"
  },
  grinning: Ni,
  grimacing: Hi,
  grin: Ui,
  joy: Vi,
  rofl: Wi,
  partying: Ki,
  smiley: Gi,
  smile: Xi,
  sweat_smile: Qi,
  laughing: Ji,
  innocent: Yi,
  wink: Zi,
  blush: en,
  slightly_smiling_face: an,
  upside_down_face: tn,
  relaxed: rn,
  yum: on,
  relieved: sn,
  heart_eyes: cn,
  smiling_face_with_three_hearts: nn,
  kissing_heart: ln,
  kissing: dn,
  kissing_smiling_eyes: pn,
  kissing_closed_eyes: fn,
  stuck_out_tongue_winking_eye: hn,
  zany: yn,
  raised_eyebrow: gn,
  monocle: _n,
  stuck_out_tongue_closed_eyes: un,
  stuck_out_tongue: mn,
  money_mouth_face: kn,
  nerd_face: wn,
  sunglasses: bn,
  star_struck: vn,
  clown_face: zn,
  cowboy_hat_face: xn,
  hugs: jn,
  smirk: Cn,
  no_mouth: En,
  neutral_face: Sn,
  expressionless: An,
  unamused: Ln,
  roll_eyes: $n,
  thinking: Tn,
  lying_face: Fn,
  hand_over_mouth: Pn,
  shushing: Rn,
  symbols_over_mouth: In,
  exploding_head: qn,
  flushed: On,
  disappointed: Dn,
  worried: Mn,
  angry: Bn,
  rage: Nn,
  pensive: Hn,
  confused: Un,
  slightly_frowning_face: Vn,
  frowning_face: Wn,
  persevere: Kn,
  confounded: Gn,
  tired_face: Xn,
  weary: Qn,
  pleading: Jn,
  triumph: Yn,
  open_mouth: Zn,
  scream: el,
  fearful: al,
  cold_sweat: tl,
  hushed: rl,
  frowning: ol,
  anguished: sl,
  cry: cl,
  disappointed_relieved: il,
  drooling_face: nl,
  sleepy: ll,
  sweat: dl,
  hot: pl,
  cold: fl,
  sob: hl,
  dizzy_face: yl,
  astonished: gl,
  zipper_mouth_face: _l,
  nauseated_face: ul,
  sneezing_face: ml,
  vomiting: kl,
  mask: wl,
  face_with_thermometer: bl,
  face_with_head_bandage: vl,
  woozy: zl,
  sleeping: xl,
  zzz: jl,
  poop: Cl,
  smiling_imp: El,
  imp: Sl,
  japanese_ogre: Al,
  japanese_goblin: Ll,
  skull: $l,
  ghost: Tl,
  alien: Fl,
  robot: Pl,
  smiley_cat: Rl,
  smile_cat: Il,
  joy_cat: ql,
  heart_eyes_cat: Ol,
  smirk_cat: Dl,
  kissing_cat: Ml,
  scream_cat: Bl,
  crying_cat_face: Nl,
  pouting_cat: Hl,
  palms_up: Ul,
  raised_hands: Vl,
  clap: Wl,
  wave: Kl,
  call_me_hand: Gl,
  "+1": {
    keywords: [
      "thumbsup",
      "yes",
      "awesome",
      "good",
      "agree",
      "accept",
      "cool",
      "hand",
      "like"
    ],
    char: "👍",
    fitzpatrick_scale: !0,
    category: "people"
  },
  "-1": {
    keywords: [
      "thumbsdown",
      "no",
      "dislike",
      "hand"
    ],
    char: "👎",
    fitzpatrick_scale: !0,
    category: "people"
  },
  facepunch: Xl,
  fist: Ql,
  fist_left: Jl,
  fist_right: Yl,
  v: Zl,
  ok_hand: ed,
  raised_hand: ad,
  raised_back_of_hand: td,
  open_hands: rd,
  muscle: od,
  pray: sd,
  foot: cd,
  leg: id,
  handshake: nd,
  point_up: ld,
  point_up_2: dd,
  point_down: pd,
  point_left: fd,
  point_right: hd,
  fu: yd,
  raised_hand_with_fingers_splayed: gd,
  love_you: _d,
  metal: ud,
  crossed_fingers: md,
  vulcan_salute: kd,
  writing_hand: wd,
  selfie: bd,
  nail_care: vd,
  lips: zd,
  tooth: xd,
  tongue: jd,
  ear: Cd,
  nose: Ed,
  eye: Sd,
  eyes: Ad,
  brain: Ld,
  bust_in_silhouette: $d,
  busts_in_silhouette: Td,
  speaking_head: Fd,
  baby: Pd,
  child: Rd,
  boy: Id,
  girl: qd,
  adult: Od,
  man: Dd,
  woman: Md,
  blonde_woman: Bd,
  blonde_man: Nd,
  bearded_person: Hd,
  older_adult: Ud,
  older_man: Vd,
  older_woman: Wd,
  man_with_gua_pi_mao: Kd,
  woman_with_headscarf: Gd,
  woman_with_turban: Xd,
  man_with_turban: Qd,
  policewoman: Jd,
  policeman: Yd,
  construction_worker_woman: Zd,
  construction_worker_man: ep,
  guardswoman: ap,
  guardsman: tp,
  female_detective: rp,
  male_detective: op,
  woman_health_worker: sp,
  man_health_worker: cp,
  woman_farmer: ip,
  man_farmer: np,
  woman_cook: lp,
  man_cook: dp,
  woman_student: pp,
  man_student: fp,
  woman_singer: hp,
  man_singer: yp,
  woman_teacher: gp,
  man_teacher: _p,
  woman_factory_worker: up,
  man_factory_worker: mp,
  woman_technologist: kp,
  man_technologist: wp,
  woman_office_worker: bp,
  man_office_worker: vp,
  woman_mechanic: zp,
  man_mechanic: xp,
  woman_scientist: jp,
  man_scientist: Cp,
  woman_artist: Ep,
  man_artist: Sp,
  woman_firefighter: Ap,
  man_firefighter: Lp,
  woman_pilot: $p,
  man_pilot: Tp,
  woman_astronaut: Fp,
  man_astronaut: Pp,
  woman_judge: Rp,
  man_judge: Ip,
  woman_superhero: qp,
  man_superhero: Op,
  woman_supervillain: Dp,
  man_supervillain: Mp,
  mrs_claus: Bp,
  santa: Np,
  sorceress: Hp,
  wizard: Up,
  woman_elf: Vp,
  man_elf: Wp,
  woman_vampire: Kp,
  man_vampire: Gp,
  woman_zombie: Xp,
  man_zombie: Qp,
  woman_genie: Jp,
  man_genie: Yp,
  mermaid: Zp,
  merman: ef,
  woman_fairy: af,
  man_fairy: tf,
  angel: rf,
  pregnant_woman: of,
  breastfeeding: sf,
  princess: cf,
  prince: nf,
  bride_with_veil: lf,
  man_in_tuxedo: df,
  running_woman: pf,
  running_man: ff,
  walking_woman: hf,
  walking_man: yf,
  dancer: gf,
  man_dancing: _f,
  dancing_women: uf,
  dancing_men: mf,
  couple: kf,
  two_men_holding_hands: wf,
  two_women_holding_hands: bf,
  bowing_woman: vf,
  bowing_man: zf,
  man_facepalming: xf,
  woman_facepalming: jf,
  woman_shrugging: Cf,
  man_shrugging: Ef,
  tipping_hand_woman: Sf,
  tipping_hand_man: Af,
  no_good_woman: Lf,
  no_good_man: $f,
  ok_woman: Tf,
  ok_man: Ff,
  raising_hand_woman: Pf,
  raising_hand_man: Rf,
  pouting_woman: If,
  pouting_man: qf,
  frowning_woman: Of,
  frowning_man: Df,
  haircut_woman: Mf,
  haircut_man: Bf,
  massage_woman: Nf,
  massage_man: Hf,
  woman_in_steamy_room: Uf,
  man_in_steamy_room: Vf,
  couple_with_heart_woman_man: Wf,
  couple_with_heart_woman_woman: Kf,
  couple_with_heart_man_man: Gf,
  couplekiss_man_woman: Xf,
  couplekiss_woman_woman: Qf,
  couplekiss_man_man: Jf,
  family_man_woman_boy: Yf,
  family_man_woman_girl: Zf,
  family_man_woman_girl_boy: eh,
  family_man_woman_boy_boy: ah,
  family_man_woman_girl_girl: th,
  family_woman_woman_boy: rh,
  family_woman_woman_girl: oh,
  family_woman_woman_girl_boy: sh,
  family_woman_woman_boy_boy: ch,
  family_woman_woman_girl_girl: ih,
  family_man_man_boy: nh,
  family_man_man_girl: lh,
  family_man_man_girl_boy: dh,
  family_man_man_boy_boy: ph,
  family_man_man_girl_girl: fh,
  family_woman_boy: hh,
  family_woman_girl: yh,
  family_woman_girl_boy: gh,
  family_woman_boy_boy: _h,
  family_woman_girl_girl: uh,
  family_man_boy: mh,
  family_man_girl: kh,
  family_man_girl_boy: wh,
  family_man_boy_boy: bh,
  family_man_girl_girl: vh,
  yarn: zh,
  thread: xh,
  coat: jh,
  labcoat: Ch,
  womans_clothes: Eh,
  tshirt: Sh,
  jeans: Ah,
  necktie: Lh,
  dress: $h,
  bikini: Th,
  kimono: Fh,
  lipstick: Ph,
  kiss: Rh,
  footprints: Ih,
  flat_shoe: qh,
  high_heel: Oh,
  sandal: Dh,
  boot: Mh,
  mans_shoe: Bh,
  athletic_shoe: Nh,
  hiking_boot: Hh,
  socks: Uh,
  gloves: Vh,
  scarf: Wh,
  womans_hat: Kh,
  tophat: Gh,
  billed_hat: Xh,
  rescue_worker_helmet: Qh,
  mortar_board: Jh,
  crown: Yh,
  school_satchel: Zh,
  luggage: ey,
  pouch: ay,
  purse: ty,
  handbag: ry,
  briefcase: oy,
  eyeglasses: sy,
  dark_sunglasses: cy,
  goggles: iy,
  ring: ny,
  closed_umbrella: ly,
  dog: dy,
  cat: py,
  mouse: fy,
  hamster: hy,
  rabbit: yy,
  fox_face: gy,
  bear: _y,
  panda_face: uy,
  koala: my,
  tiger: ky,
  lion: wy,
  cow: by,
  pig: vy,
  pig_nose: zy,
  frog: xy,
  squid: jy,
  octopus: Cy,
  shrimp: Ey,
  monkey_face: Sy,
  gorilla: Ay,
  see_no_evil: Ly,
  hear_no_evil: $y,
  speak_no_evil: Ty,
  monkey: Fy,
  chicken: Py,
  penguin: Ry,
  bird: Iy,
  baby_chick: qy,
  hatching_chick: Oy,
  hatched_chick: Dy,
  duck: My,
  eagle: By,
  owl: Ny,
  bat: Hy,
  wolf: Uy,
  boar: Vy,
  horse: Wy,
  unicorn: Ky,
  honeybee: Gy,
  bug: Xy,
  butterfly: Qy,
  snail: Jy,
  beetle: Yy,
  ant: Zy,
  grasshopper: eg,
  spider: ag,
  scorpion: tg,
  crab: rg,
  snake: og,
  lizard: sg,
  "t-rex": {
    keywords: [
      "animal",
      "nature",
      "dinosaur",
      "tyrannosaurus",
      "extinct"
    ],
    char: "🦖",
    fitzpatrick_scale: !1,
    category: "animals_and_nature"
  },
  sauropod: cg,
  turtle: ig,
  tropical_fish: ng,
  fish: lg,
  blowfish: dg,
  dolphin: pg,
  shark: fg,
  whale: hg,
  whale2: yg,
  crocodile: gg,
  leopard: _g,
  zebra: ug,
  tiger2: mg,
  water_buffalo: kg,
  ox: wg,
  cow2: bg,
  deer: vg,
  dromedary_camel: zg,
  camel: xg,
  giraffe: jg,
  elephant: Cg,
  rhinoceros: Eg,
  goat: Sg,
  ram: Ag,
  sheep: Lg,
  racehorse: $g,
  pig2: Tg,
  rat: Fg,
  mouse2: Pg,
  rooster: Rg,
  turkey: Ig,
  dove: qg,
  dog2: Og,
  poodle: Dg,
  cat2: Mg,
  rabbit2: Bg,
  chipmunk: Ng,
  hedgehog: Hg,
  raccoon: Ug,
  llama: Vg,
  hippopotamus: Wg,
  kangaroo: Kg,
  badger: Gg,
  swan: Xg,
  peacock: Qg,
  parrot: Jg,
  lobster: Yg,
  mosquito: Zg,
  paw_prints: e_,
  dragon: a_,
  dragon_face: t_,
  cactus: r_,
  christmas_tree: o_,
  evergreen_tree: s_,
  deciduous_tree: c_,
  palm_tree: i_,
  seedling: n_,
  herb: l_,
  shamrock: d_,
  four_leaf_clover: p_,
  bamboo: f_,
  tanabata_tree: h_,
  leaves: y_,
  fallen_leaf: g_,
  maple_leaf: __,
  ear_of_rice: u_,
  hibiscus: m_,
  sunflower: k_,
  rose: w_,
  wilted_flower: b_,
  tulip: v_,
  blossom: z_,
  cherry_blossom: x_,
  bouquet: j_,
  mushroom: C_,
  chestnut: E_,
  jack_o_lantern: S_,
  shell: A_,
  spider_web: L_,
  earth_americas: $_,
  earth_africa: T_,
  earth_asia: F_,
  full_moon: P_,
  waning_gibbous_moon: R_,
  last_quarter_moon: I_,
  waning_crescent_moon: q_,
  new_moon: O_,
  waxing_crescent_moon: D_,
  first_quarter_moon: M_,
  waxing_gibbous_moon: B_,
  new_moon_with_face: N_,
  full_moon_with_face: H_,
  first_quarter_moon_with_face: U_,
  last_quarter_moon_with_face: V_,
  sun_with_face: W_,
  crescent_moon: K_,
  star: G_,
  star2: X_,
  dizzy: Q_,
  sparkles: J_,
  comet: Y_,
  sunny: Z_,
  sun_behind_small_cloud: eu,
  partly_sunny: au,
  sun_behind_large_cloud: tu,
  sun_behind_rain_cloud: ru,
  cloud: ou,
  cloud_with_rain: su,
  cloud_with_lightning_and_rain: cu,
  cloud_with_lightning: iu,
  zap: nu,
  fire: lu,
  boom: du,
  snowflake: pu,
  cloud_with_snow: fu,
  snowman: hu,
  snowman_with_snow: yu,
  wind_face: gu,
  dash: _u,
  tornado: uu,
  fog: mu,
  open_umbrella: ku,
  umbrella: wu,
  droplet: bu,
  sweat_drops: vu,
  ocean: zu,
  green_apple: xu,
  apple: ju,
  pear: Cu,
  tangerine: Eu,
  lemon: Su,
  banana: Au,
  watermelon: Lu,
  grapes: $u,
  strawberry: Tu,
  melon: Fu,
  cherries: Pu,
  peach: Ru,
  pineapple: Iu,
  coconut: qu,
  kiwi_fruit: Ou,
  mango: Du,
  avocado: Mu,
  broccoli: Bu,
  tomato: Nu,
  eggplant: Hu,
  cucumber: Uu,
  carrot: Vu,
  hot_pepper: Wu,
  potato: Ku,
  corn: Gu,
  leafy_greens: Xu,
  sweet_potato: Qu,
  peanuts: Ju,
  honey_pot: Yu,
  croissant: Zu,
  bread: em,
  baguette_bread: am,
  bagel: tm,
  pretzel: rm,
  cheese: om,
  egg: sm,
  bacon: cm,
  steak: im,
  pancakes: nm,
  poultry_leg: lm,
  meat_on_bone: dm,
  bone: pm,
  fried_shrimp: fm,
  fried_egg: hm,
  hamburger: ym,
  fries: gm,
  stuffed_flatbread: _m,
  hotdog: um,
  pizza: mm,
  sandwich: km,
  canned_food: wm,
  spaghetti: bm,
  taco: vm,
  burrito: zm,
  green_salad: xm,
  shallow_pan_of_food: jm,
  ramen: Cm,
  stew: Em,
  fish_cake: Sm,
  fortune_cookie: Am,
  sushi: Lm,
  bento: $m,
  curry: Tm,
  rice_ball: Fm,
  rice: Pm,
  rice_cracker: Rm,
  oden: Im,
  dango: qm,
  shaved_ice: Om,
  ice_cream: Dm,
  icecream: Mm,
  pie: Bm,
  cake: Nm,
  cupcake: Hm,
  moon_cake: Um,
  birthday: Vm,
  custard: Wm,
  candy: Km,
  lollipop: Gm,
  chocolate_bar: Xm,
  popcorn: Qm,
  dumpling: Jm,
  doughnut: Ym,
  cookie: Zm,
  milk_glass: ek,
  beer: ak,
  beers: tk,
  clinking_glasses: rk,
  wine_glass: ok,
  tumbler_glass: sk,
  cocktail: ck,
  tropical_drink: ik,
  champagne: nk,
  sake: lk,
  tea: dk,
  cup_with_straw: pk,
  coffee: fk,
  baby_bottle: hk,
  salt: yk,
  spoon: gk,
  fork_and_knife: _k,
  plate_with_cutlery: uk,
  bowl_with_spoon: mk,
  takeout_box: kk,
  chopsticks: wk,
  soccer: bk,
  basketball: vk,
  football: zk,
  baseball: xk,
  softball: jk,
  tennis: Ck,
  volleyball: Ek,
  rugby_football: Sk,
  flying_disc: Ak,
  "8ball": {
    keywords: [
      "pool",
      "hobby",
      "game",
      "luck",
      "magic"
    ],
    char: "🎱",
    fitzpatrick_scale: !1,
    category: "activity"
  },
  golf: Lk,
  golfing_woman: $k,
  golfing_man: Tk,
  ping_pong: Fk,
  badminton: Pk,
  goal_net: Rk,
  ice_hockey: Ik,
  field_hockey: qk,
  lacrosse: Ok,
  cricket: Dk,
  ski: Mk,
  skier: Bk,
  snowboarder: Nk,
  person_fencing: Hk,
  women_wrestling: Uk,
  men_wrestling: Vk,
  woman_cartwheeling: Wk,
  man_cartwheeling: Kk,
  woman_playing_handball: Gk,
  man_playing_handball: Xk,
  ice_skate: Qk,
  curling_stone: Jk,
  skateboard: Yk,
  sled: Zk,
  bow_and_arrow: ew,
  fishing_pole_and_fish: aw,
  boxing_glove: tw,
  martial_arts_uniform: rw,
  rowing_woman: ow,
  rowing_man: sw,
  climbing_woman: cw,
  climbing_man: iw,
  swimming_woman: nw,
  swimming_man: lw,
  woman_playing_water_polo: dw,
  man_playing_water_polo: pw,
  woman_in_lotus_position: fw,
  man_in_lotus_position: hw,
  surfing_woman: yw,
  surfing_man: gw,
  bath: _w,
  basketball_woman: uw,
  basketball_man: mw,
  weight_lifting_woman: kw,
  weight_lifting_man: ww,
  biking_woman: bw,
  biking_man: vw,
  mountain_biking_woman: zw,
  mountain_biking_man: xw,
  horse_racing: jw,
  business_suit_levitating: Cw,
  trophy: Ew,
  running_shirt_with_sash: Sw,
  medal_sports: Aw,
  medal_military: Lw,
  "1st_place_medal": {
    keywords: [
      "award",
      "winning",
      "first"
    ],
    char: "🥇",
    fitzpatrick_scale: !1,
    category: "activity"
  },
  "2nd_place_medal": {
    keywords: [
      "award",
      "second"
    ],
    char: "🥈",
    fitzpatrick_scale: !1,
    category: "activity"
  },
  "3rd_place_medal": {
    keywords: [
      "award",
      "third"
    ],
    char: "🥉",
    fitzpatrick_scale: !1,
    category: "activity"
  },
  reminder_ribbon: $w,
  rosette: Tw,
  ticket: Fw,
  tickets: Pw,
  performing_arts: Rw,
  art: Iw,
  circus_tent: qw,
  woman_juggling: Ow,
  man_juggling: Dw,
  microphone: Mw,
  headphones: Bw,
  musical_score: Nw,
  musical_keyboard: Hw,
  drum: Uw,
  saxophone: Vw,
  trumpet: Ww,
  guitar: Kw,
  violin: Gw,
  clapper: Xw,
  video_game: Qw,
  space_invader: Jw,
  dart: Yw,
  game_die: Zw,
  chess_pawn: eb,
  slot_machine: ab,
  jigsaw: tb,
  bowling: rb,
  red_car: ob,
  taxi: sb,
  blue_car: cb,
  bus: ib,
  trolleybus: nb,
  racing_car: lb,
  police_car: db,
  ambulance: pb,
  fire_engine: fb,
  minibus: hb,
  truck: yb,
  articulated_lorry: gb,
  tractor: _b,
  kick_scooter: ub,
  motorcycle: mb,
  bike: kb,
  motor_scooter: wb,
  rotating_light: bb,
  oncoming_police_car: vb,
  oncoming_bus: zb,
  oncoming_automobile: xb,
  oncoming_taxi: jb,
  aerial_tramway: Cb,
  mountain_cableway: Eb,
  suspension_railway: Sb,
  railway_car: Ab,
  train: Lb,
  monorail: $b,
  bullettrain_side: Tb,
  bullettrain_front: Fb,
  light_rail: Pb,
  mountain_railway: Rb,
  steam_locomotive: Ib,
  train2: qb,
  metro: Ob,
  tram: Db,
  station: Mb,
  flying_saucer: Bb,
  helicopter: Nb,
  small_airplane: Hb,
  airplane: Ub,
  flight_departure: Vb,
  flight_arrival: Wb,
  sailboat: Kb,
  motor_boat: Gb,
  speedboat: Xb,
  ferry: Qb,
  passenger_ship: Jb,
  rocket: Yb,
  artificial_satellite: Zb,
  seat: e1,
  canoe: a1,
  anchor: t1,
  construction: r1,
  fuelpump: o1,
  busstop: s1,
  vertical_traffic_light: c1,
  traffic_light: i1,
  checkered_flag: n1,
  ship: l1,
  ferris_wheel: d1,
  roller_coaster: p1,
  carousel_horse: f1,
  building_construction: h1,
  foggy: y1,
  tokyo_tower: g1,
  factory: _1,
  fountain: u1,
  rice_scene: m1,
  mountain: k1,
  mountain_snow: w1,
  mount_fuji: b1,
  volcano: v1,
  japan: z1,
  camping: x1,
  tent: j1,
  national_park: C1,
  motorway: E1,
  railway_track: S1,
  sunrise: A1,
  sunrise_over_mountains: L1,
  desert: $1,
  beach_umbrella: T1,
  desert_island: F1,
  city_sunrise: P1,
  city_sunset: R1,
  cityscape: I1,
  night_with_stars: q1,
  bridge_at_night: O1,
  milky_way: D1,
  stars: M1,
  sparkler: B1,
  fireworks: N1,
  rainbow: H1,
  houses: U1,
  european_castle: V1,
  japanese_castle: W1,
  stadium: K1,
  statue_of_liberty: G1,
  house: X1,
  house_with_garden: Q1,
  derelict_house: J1,
  office: Y1,
  department_store: Z1,
  post_office: e0,
  european_post_office: a0,
  hospital: t0,
  bank: r0,
  hotel: o0,
  convenience_store: s0,
  school: c0,
  love_hotel: i0,
  wedding: n0,
  classical_building: l0,
  church: d0,
  mosque: p0,
  synagogue: f0,
  kaaba: h0,
  shinto_shrine: y0,
  watch: g0,
  iphone: _0,
  calling: u0,
  computer: m0,
  keyboard: k0,
  desktop_computer: w0,
  printer: b0,
  computer_mouse: v0,
  trackball: z0,
  joystick: x0,
  clamp: j0,
  minidisc: C0,
  floppy_disk: E0,
  cd: S0,
  dvd: A0,
  vhs: L0,
  camera: $0,
  camera_flash: T0,
  video_camera: F0,
  movie_camera: P0,
  film_projector: R0,
  film_strip: I0,
  telephone_receiver: q0,
  phone: O0,
  pager: D0,
  fax: M0,
  tv: B0,
  radio: N0,
  studio_microphone: H0,
  level_slider: U0,
  control_knobs: V0,
  compass: W0,
  stopwatch: K0,
  timer_clock: G0,
  alarm_clock: X0,
  mantelpiece_clock: Q0,
  hourglass_flowing_sand: J0,
  hourglass: Y0,
  satellite: Z0,
  battery: ev,
  electric_plug: av,
  bulb: tv,
  flashlight: rv,
  candle: ov,
  fire_extinguisher: sv,
  wastebasket: cv,
  oil_drum: iv,
  money_with_wings: nv,
  dollar: lv,
  yen: dv,
  euro: pv,
  pound: fv,
  moneybag: hv,
  credit_card: yv,
  gem: gv,
  balance_scale: _v,
  toolbox: uv,
  wrench: mv,
  hammer: kv,
  hammer_and_pick: wv,
  hammer_and_wrench: bv,
  pick: vv,
  nut_and_bolt: zv,
  gear: xv,
  brick: jv,
  chains: Cv,
  magnet: Ev,
  gun: Sv,
  bomb: Av,
  firecracker: Lv,
  hocho: $v,
  dagger: Tv,
  crossed_swords: Fv,
  shield: Pv,
  smoking: Rv,
  skull_and_crossbones: Iv,
  coffin: qv,
  funeral_urn: Ov,
  amphora: Dv,
  crystal_ball: Mv,
  prayer_beads: Bv,
  nazar_amulet: Nv,
  barber: Hv,
  alembic: Uv,
  telescope: Vv,
  microscope: Wv,
  hole: Kv,
  pill: Gv,
  syringe: Xv,
  dna: Qv,
  microbe: Jv,
  petri_dish: Yv,
  test_tube: Zv,
  thermometer: ez,
  broom: az,
  basket: tz,
  toilet_paper: rz,
  label: oz,
  bookmark: sz,
  toilet: cz,
  shower: iz,
  bathtub: nz,
  soap: lz,
  sponge: dz,
  lotion_bottle: pz,
  key: fz,
  old_key: hz,
  couch_and_lamp: yz,
  sleeping_bed: gz,
  bed: _z,
  door: uz,
  bellhop_bell: mz,
  teddy_bear: kz,
  framed_picture: wz,
  world_map: bz,
  parasol_on_ground: vz,
  moyai: zz,
  shopping: xz,
  shopping_cart: jz,
  balloon: Cz,
  flags: Ez,
  ribbon: Sz,
  gift: Az,
  confetti_ball: Lz,
  tada: $z,
  dolls: Tz,
  wind_chime: Fz,
  crossed_flags: Pz,
  izakaya_lantern: Rz,
  red_envelope: Iz,
  email: qz,
  envelope_with_arrow: Oz,
  incoming_envelope: Dz,
  "e-mail": {
    keywords: [
      "communication",
      "inbox"
    ],
    char: "📧",
    fitzpatrick_scale: !1,
    category: "objects"
  },
  love_letter: Mz,
  postbox: Bz,
  mailbox_closed: Nz,
  mailbox: Hz,
  mailbox_with_mail: Uz,
  mailbox_with_no_mail: Vz,
  package: {
    keywords: [
      "mail",
      "gift",
      "cardboard",
      "box",
      "moving"
    ],
    char: "📦",
    fitzpatrick_scale: !1,
    category: "objects"
  },
  postal_horn: Wz,
  inbox_tray: Kz,
  outbox_tray: Gz,
  scroll: Xz,
  page_with_curl: Qz,
  bookmark_tabs: Jz,
  receipt: Yz,
  bar_chart: Zz,
  chart_with_upwards_trend: e2,
  chart_with_downwards_trend: a2,
  page_facing_up: t2,
  date: r2,
  calendar: o2,
  spiral_calendar: s2,
  card_index: c2,
  card_file_box: i2,
  ballot_box: n2,
  file_cabinet: l2,
  clipboard: d2,
  spiral_notepad: p2,
  file_folder: f2,
  open_file_folder: h2,
  card_index_dividers: y2,
  newspaper_roll: g2,
  newspaper: _2,
  notebook: u2,
  closed_book: m2,
  green_book: k2,
  blue_book: w2,
  orange_book: b2,
  notebook_with_decorative_cover: v2,
  ledger: z2,
  books: x2,
  open_book: j2,
  safety_pin: C2,
  link: E2,
  paperclip: S2,
  paperclips: A2,
  scissors: L2,
  triangular_ruler: $2,
  straight_ruler: T2,
  abacus: F2,
  pushpin: P2,
  round_pushpin: R2,
  triangular_flag_on_post: I2,
  white_flag: q2,
  black_flag: O2,
  rainbow_flag: D2,
  closed_lock_with_key: M2,
  lock: B2,
  unlock: N2,
  lock_with_ink_pen: H2,
  pen: U2,
  fountain_pen: V2,
  black_nib: W2,
  memo: K2,
  pencil2: G2,
  crayon: X2,
  paintbrush: Q2,
  mag: J2,
  mag_right: Y2,
  heart: Z2,
  orange_heart: e3,
  yellow_heart: a3,
  green_heart: t3,
  blue_heart: r3,
  purple_heart: o3,
  black_heart: s3,
  broken_heart: c3,
  heavy_heart_exclamation: i3,
  two_hearts: n3,
  revolving_hearts: l3,
  heartbeat: d3,
  heartpulse: p3,
  sparkling_heart: f3,
  cupid: h3,
  gift_heart: y3,
  heart_decoration: g3,
  peace_symbol: _3,
  latin_cross: u3,
  star_and_crescent: m3,
  om: k3,
  wheel_of_dharma: w3,
  star_of_david: b3,
  six_pointed_star: v3,
  menorah: z3,
  yin_yang: x3,
  orthodox_cross: j3,
  place_of_worship: C3,
  ophiuchus: E3,
  aries: S3,
  taurus: A3,
  gemini: L3,
  cancer: $3,
  leo: T3,
  virgo: F3,
  libra: P3,
  scorpius: R3,
  sagittarius: I3,
  capricorn: q3,
  aquarius: O3,
  pisces: D3,
  id: M3,
  atom_symbol: B3,
  u7a7a: N3,
  u5272: H3,
  radioactive: U3,
  biohazard: V3,
  mobile_phone_off: W3,
  vibration_mode: K3,
  u6709: G3,
  u7121: X3,
  u7533: Q3,
  u55b6: J3,
  u6708: Y3,
  eight_pointed_black_star: Z3,
  vs: e5,
  accept: a5,
  white_flower: t5,
  ideograph_advantage: r5,
  secret: o5,
  congratulations: s5,
  u5408: c5,
  u6e80: i5,
  u7981: n5,
  a: l5,
  b: d5,
  ab: p5,
  cl: f5,
  o2: h5,
  sos: y5,
  no_entry: g5,
  name_badge: _5,
  no_entry_sign: u5,
  x: m5,
  o: k5,
  stop_sign: w5,
  anger: b5,
  hotsprings: v5,
  no_pedestrians: z5,
  do_not_litter: x5,
  no_bicycles: j5,
  "non-potable_water": {
    keywords: [
      "drink",
      "faucet",
      "tap",
      "circle"
    ],
    char: "🚱",
    fitzpatrick_scale: !1,
    category: "symbols"
  },
  underage: C5,
  no_mobile_phones: E5,
  exclamation: S5,
  grey_exclamation: A5,
  question: L5,
  grey_question: $5,
  bangbang: T5,
  interrobang: F5,
  low_brightness: P5,
  high_brightness: R5,
  trident: I5,
  fleur_de_lis: q5,
  part_alternation_mark: O5,
  warning: D5,
  children_crossing: M5,
  beginner: B5,
  recycle: N5,
  u6307: H5,
  chart: U5,
  sparkle: V5,
  eight_spoked_asterisk: W5,
  negative_squared_cross_mark: K5,
  white_check_mark: G5,
  diamond_shape_with_a_dot_inside: X5,
  cyclone: Q5,
  loop: J5,
  globe_with_meridians: Y5,
  m: Z5,
  atm: e4,
  sa: a4,
  passport_control: t4,
  customs: r4,
  baggage_claim: o4,
  left_luggage: s4,
  wheelchair: c4,
  no_smoking: i4,
  wc: n4,
  parking: l4,
  potable_water: d4,
  mens: p4,
  womens: f4,
  baby_symbol: h4,
  restroom: y4,
  put_litter_in_its_place: g4,
  cinema: _4,
  signal_strength: u4,
  koko: m4,
  ng: k4,
  ok: w4,
  up: b4,
  cool: v4,
  new: {
    keywords: [
      "blue-square",
      "words",
      "start"
    ],
    char: "🆕",
    fitzpatrick_scale: !1,
    category: "symbols"
  },
  free: z4,
  zero: x4,
  one: j4,
  two: C4,
  three: E4,
  four: S4,
  five: A4,
  six: L4,
  seven: $4,
  eight: T4,
  nine: F4,
  keycap_ten: P4,
  asterisk: R4,
  eject_button: I4,
  arrow_forward: q4,
  pause_button: O4,
  next_track_button: D4,
  stop_button: M4,
  record_button: B4,
  play_or_pause_button: N4,
  previous_track_button: H4,
  fast_forward: U4,
  rewind: V4,
  twisted_rightwards_arrows: W4,
  repeat: K4,
  repeat_one: G4,
  arrow_backward: X4,
  arrow_up_small: Q4,
  arrow_down_small: J4,
  arrow_double_up: Y4,
  arrow_double_down: Z4,
  arrow_right: ex,
  arrow_left: ax,
  arrow_up: tx,
  arrow_down: rx,
  arrow_upper_right: ox,
  arrow_lower_right: sx,
  arrow_lower_left: cx,
  arrow_upper_left: ix,
  arrow_up_down: nx,
  left_right_arrow: lx,
  arrows_counterclockwise: dx,
  arrow_right_hook: px,
  leftwards_arrow_with_hook: fx,
  arrow_heading_up: hx,
  arrow_heading_down: yx,
  hash: gx,
  information_source: _x,
  abc: ux,
  abcd: mx,
  capital_abcd: kx,
  symbols: wx,
  musical_note: bx,
  notes: vx,
  wavy_dash: zx,
  curly_loop: xx,
  heavy_check_mark: jx,
  arrows_clockwise: Cx,
  heavy_plus_sign: Ex,
  heavy_minus_sign: Sx,
  heavy_division_sign: Ax,
  heavy_multiplication_x: Lx,
  infinity: $x,
  heavy_dollar_sign: Tx,
  currency_exchange: Fx,
  copyright: Px,
  registered: Rx,
  tm: Ix,
  end: qx,
  back: Ox,
  on: Dx,
  top: Mx,
  soon: Bx,
  ballot_box_with_check: Nx,
  radio_button: Hx,
  white_circle: Ux,
  black_circle: Vx,
  red_circle: Wx,
  large_blue_circle: Kx,
  small_orange_diamond: Gx,
  small_blue_diamond: Xx,
  large_orange_diamond: Qx,
  large_blue_diamond: Jx,
  small_red_triangle: Yx,
  black_small_square: Zx,
  white_small_square: ej,
  black_large_square: aj,
  white_large_square: tj,
  small_red_triangle_down: rj,
  black_medium_square: oj,
  white_medium_square: sj,
  black_medium_small_square: cj,
  white_medium_small_square: ij,
  black_square_button: nj,
  white_square_button: lj,
  speaker: dj,
  sound: pj,
  loud_sound: fj,
  mute: hj,
  mega: yj,
  loudspeaker: gj,
  bell: _j,
  no_bell: uj,
  black_joker: mj,
  mahjong: kj,
  spades: wj,
  clubs: bj,
  hearts: vj,
  diamonds: zj,
  flower_playing_cards: xj,
  thought_balloon: jj,
  right_anger_bubble: Cj,
  speech_balloon: Ej,
  left_speech_bubble: Sj,
  clock1: Aj,
  clock2: Lj,
  clock3: $j,
  clock4: Tj,
  clock5: Fj,
  clock6: Pj,
  clock7: Rj,
  clock8: Ij,
  clock9: qj,
  clock10: Oj,
  clock11: Dj,
  clock12: Mj,
  clock130: Bj,
  clock230: Nj,
  clock330: Hj,
  clock430: Uj,
  clock530: Vj,
  clock630: Wj,
  clock730: Kj,
  clock830: Gj,
  clock930: Xj,
  clock1030: Qj,
  clock1130: Jj,
  clock1230: Yj,
  afghanistan: Zj,
  aland_islands: e6,
  albania: a6,
  algeria: t6,
  american_samoa: r6,
  andorra: o6,
  angola: s6,
  anguilla: c6,
  antarctica: i6,
  antigua_barbuda: n6,
  argentina: l6,
  armenia: d6,
  aruba: p6,
  australia: f6,
  austria: h6,
  azerbaijan: y6,
  bahamas: g6,
  bahrain: _6,
  bangladesh: u6,
  barbados: m6,
  belarus: k6,
  belgium: w6,
  belize: b6,
  benin: v6,
  bermuda: z6,
  bhutan: x6,
  bolivia: j6,
  caribbean_netherlands: C6,
  bosnia_herzegovina: E6,
  botswana: S6,
  brazil: A6,
  british_indian_ocean_territory: L6,
  british_virgin_islands: $6,
  brunei: T6,
  bulgaria: F6,
  burkina_faso: P6,
  burundi: R6,
  cape_verde: I6,
  cambodia: q6,
  cameroon: O6,
  canada: D6,
  canary_islands: M6,
  cayman_islands: B6,
  central_african_republic: N6,
  chad: H6,
  chile: U6,
  cn: V6,
  christmas_island: W6,
  cocos_islands: K6,
  colombia: G6,
  comoros: X6,
  congo_brazzaville: Q6,
  congo_kinshasa: J6,
  cook_islands: Y6,
  costa_rica: Z6,
  croatia: eC,
  cuba: aC,
  curacao: tC,
  cyprus: rC,
  czech_republic: oC,
  denmark: sC,
  djibouti: cC,
  dominica: iC,
  dominican_republic: nC,
  ecuador: lC,
  egypt: dC,
  el_salvador: pC,
  equatorial_guinea: fC,
  eritrea: hC,
  estonia: yC,
  ethiopia: gC,
  eu: _C,
  falkland_islands: uC,
  faroe_islands: mC,
  fiji: kC,
  finland: wC,
  fr: bC,
  french_guiana: vC,
  french_polynesia: zC,
  french_southern_territories: xC,
  gabon: jC,
  gambia: CC,
  georgia: EC,
  de: SC,
  ghana: AC,
  gibraltar: LC,
  greece: $C,
  greenland: TC,
  grenada: FC,
  guadeloupe: PC,
  guam: RC,
  guatemala: IC,
  guernsey: qC,
  guinea: OC,
  guinea_bissau: DC,
  guyana: MC,
  haiti: BC,
  honduras: NC,
  hong_kong: HC,
  hungary: UC,
  iceland: VC,
  india: WC,
  indonesia: KC,
  iran: GC,
  iraq: XC,
  ireland: QC,
  isle_of_man: JC,
  israel: YC,
  it: ZC,
  cote_divoire: e8,
  jamaica: a8,
  jp: t8,
  jersey: r8,
  jordan: o8,
  kazakhstan: s8,
  kenya: c8,
  kiribati: i8,
  kosovo: n8,
  kuwait: l8,
  kyrgyzstan: d8,
  laos: p8,
  latvia: f8,
  lebanon: h8,
  lesotho: y8,
  liberia: g8,
  libya: _8,
  liechtenstein: u8,
  lithuania: m8,
  luxembourg: k8,
  macau: w8,
  macedonia: b8,
  madagascar: v8,
  malawi: z8,
  malaysia: x8,
  maldives: j8,
  mali: C8,
  malta: E8,
  marshall_islands: S8,
  martinique: A8,
  mauritania: L8,
  mauritius: $8,
  mayotte: T8,
  mexico: F8,
  micronesia: P8,
  moldova: R8,
  monaco: I8,
  mongolia: q8,
  montenegro: O8,
  montserrat: D8,
  morocco: M8,
  mozambique: B8,
  myanmar: N8,
  namibia: H8,
  nauru: U8,
  nepal: V8,
  netherlands: W8,
  new_caledonia: K8,
  new_zealand: G8,
  nicaragua: X8,
  niger: Q8,
  nigeria: J8,
  niue: Y8,
  norfolk_island: Z8,
  northern_mariana_islands: e7,
  north_korea: a7,
  norway: t7,
  oman: r7,
  pakistan: o7,
  palau: s7,
  palestinian_territories: c7,
  panama: i7,
  papua_new_guinea: n7,
  paraguay: l7,
  peru: d7,
  philippines: p7,
  pitcairn_islands: f7,
  poland: h7,
  portugal: y7,
  puerto_rico: g7,
  qatar: _7,
  reunion: u7,
  romania: m7,
  ru: k7,
  rwanda: w7,
  st_barthelemy: b7,
  st_helena: v7,
  st_kitts_nevis: z7,
  st_lucia: x7,
  st_pierre_miquelon: j7,
  st_vincent_grenadines: C7,
  samoa: E7,
  san_marino: S7,
  sao_tome_principe: A7,
  saudi_arabia: L7,
  senegal: $7,
  serbia: T7,
  seychelles: F7,
  sierra_leone: P7,
  singapore: R7,
  sint_maarten: I7,
  slovakia: q7,
  slovenia: O7,
  solomon_islands: D7,
  somalia: M7,
  south_africa: B7,
  south_georgia_south_sandwich_islands: N7,
  kr: H7,
  south_sudan: U7,
  es: V7,
  sri_lanka: W7,
  sudan: K7,
  suriname: G7,
  swaziland: X7,
  sweden: Q7,
  switzerland: J7,
  syria: Y7,
  taiwan: Z7,
  tajikistan: eE,
  tanzania: aE,
  thailand: tE,
  timor_leste: rE,
  togo: oE,
  tokelau: sE,
  tonga: cE,
  trinidad_tobago: iE,
  tunisia: nE,
  tr: lE,
  turkmenistan: dE,
  turks_caicos_islands: pE,
  tuvalu: fE,
  uganda: hE,
  ukraine: yE,
  united_arab_emirates: gE,
  uk: _E,
  england: uE,
  scotland: mE,
  wales: kE,
  us: wE,
  us_virgin_islands: bE,
  uruguay: vE,
  uzbekistan: zE,
  vanuatu: xE,
  vatican_city: jE,
  venezuela: CE,
  vietnam: EE,
  wallis_futuna: SE,
  western_sahara: AE,
  yemen: LE,
  zambia: $E,
  zimbabwe: TE,
  united_nations: FE,
  pirate_flag: PE
}, IE = [
  "grinning",
  "smiley",
  "smile",
  "grin",
  "laughing",
  "sweat_smile",
  "joy",
  "rofl",
  "relaxed",
  "blush",
  "innocent",
  "slightly_smiling_face",
  "upside_down_face",
  "wink",
  "relieved",
  "heart_eyes",
  "smiling_face_with_three_hearts",
  "kissing_heart",
  "kissing",
  "kissing_smiling_eyes",
  "kissing_closed_eyes",
  "yum",
  "stuck_out_tongue",
  "stuck_out_tongue_closed_eyes",
  "stuck_out_tongue_winking_eye",
  "zany",
  "raised_eyebrow",
  "monocle",
  "nerd_face",
  "sunglasses",
  "star_struck",
  "partying",
  "smirk",
  "unamused",
  "disappointed",
  "pensive",
  "worried",
  "confused",
  "slightly_frowning_face",
  "frowning_face",
  "persevere",
  "confounded",
  "tired_face",
  "weary",
  "pleading",
  "cry",
  "sob",
  "triumph",
  "angry",
  "rage",
  "symbols_over_mouth",
  "exploding_head",
  "flushed",
  "hot",
  "cold",
  "scream",
  "fearful",
  "cold_sweat",
  "disappointed_relieved",
  "sweat",
  "hugs",
  "thinking",
  "hand_over_mouth",
  "shushing",
  "lying_face",
  "no_mouth",
  "neutral_face",
  "expressionless",
  "grimacing",
  "roll_eyes",
  "hushed",
  "frowning",
  "anguished",
  "open_mouth",
  "astonished",
  "sleeping",
  "drooling_face",
  "sleepy",
  "dizzy_face",
  "zipper_mouth_face",
  "woozy",
  "nauseated_face",
  "vomiting",
  "sneezing_face",
  "mask",
  "face_with_thermometer",
  "face_with_head_bandage",
  "money_mouth_face",
  "cowboy_hat_face",
  "smiling_imp",
  "imp",
  "japanese_ogre",
  "japanese_goblin",
  "clown_face",
  "poop",
  "ghost",
  "skull",
  "skull_and_crossbones",
  "alien",
  "space_invader",
  "robot",
  "jack_o_lantern",
  "smiley_cat",
  "smile_cat",
  "joy_cat",
  "heart_eyes_cat",
  "smirk_cat",
  "kissing_cat",
  "scream_cat",
  "crying_cat_face",
  "pouting_cat",
  "palms_up",
  "open_hands",
  "raised_hands",
  "clap",
  "handshake",
  "+1",
  "-1",
  "facepunch",
  "fist",
  "fist_left",
  "fist_right",
  "crossed_fingers",
  "v",
  "love_you",
  "metal",
  "ok_hand",
  "point_left",
  "point_right",
  "point_up",
  "point_down",
  "point_up_2",
  "raised_hand",
  "raised_back_of_hand",
  "raised_hand_with_fingers_splayed",
  "vulcan_salute",
  "wave",
  "call_me_hand",
  "muscle",
  "fu",
  "writing_hand",
  "pray",
  "foot",
  "leg",
  "ring",
  "lipstick",
  "kiss",
  "lips",
  "tooth",
  "tongue",
  "ear",
  "nose",
  "footprints",
  "eye",
  "eyes",
  "brain",
  "speaking_head",
  "bust_in_silhouette",
  "busts_in_silhouette",
  "baby",
  "girl",
  "child",
  "boy",
  "woman",
  "adult",
  "man",
  "blonde_woman",
  "blonde_man",
  "bearded_person",
  "older_woman",
  "older_adult",
  "older_man",
  "man_with_gua_pi_mao",
  "woman_with_headscarf",
  "woman_with_turban",
  "man_with_turban",
  "policewoman",
  "policeman",
  "construction_worker_woman",
  "construction_worker_man",
  "guardswoman",
  "guardsman",
  "female_detective",
  "male_detective",
  "woman_health_worker",
  "man_health_worker",
  "woman_farmer",
  "man_farmer",
  "woman_cook",
  "man_cook",
  "woman_student",
  "man_student",
  "woman_singer",
  "man_singer",
  "woman_teacher",
  "man_teacher",
  "woman_factory_worker",
  "man_factory_worker",
  "woman_technologist",
  "man_technologist",
  "woman_office_worker",
  "man_office_worker",
  "woman_mechanic",
  "man_mechanic",
  "woman_scientist",
  "man_scientist",
  "woman_artist",
  "man_artist",
  "woman_firefighter",
  "man_firefighter",
  "woman_pilot",
  "man_pilot",
  "woman_astronaut",
  "man_astronaut",
  "woman_judge",
  "man_judge",
  "bride_with_veil",
  "man_in_tuxedo",
  "princess",
  "prince",
  "woman_superhero",
  "man_superhero",
  "woman_supervillain",
  "man_supervillain",
  "mrs_claus",
  "santa",
  "sorceress",
  "wizard",
  "woman_elf",
  "man_elf",
  "woman_vampire",
  "man_vampire",
  "woman_zombie",
  "man_zombie",
  "woman_genie",
  "man_genie",
  "mermaid",
  "merman",
  "woman_fairy",
  "man_fairy",
  "angel",
  "pregnant_woman",
  "breastfeeding",
  "bowing_woman",
  "bowing_man",
  "tipping_hand_woman",
  "tipping_hand_man",
  "no_good_woman",
  "no_good_man",
  "ok_woman",
  "ok_man",
  "raising_hand_woman",
  "raising_hand_man",
  "woman_facepalming",
  "man_facepalming",
  "woman_shrugging",
  "man_shrugging",
  "pouting_woman",
  "pouting_man",
  "frowning_woman",
  "frowning_man",
  "haircut_woman",
  "haircut_man",
  "massage_woman",
  "massage_man",
  "woman_in_steamy_room",
  "man_in_steamy_room",
  "nail_care",
  "selfie",
  "dancer",
  "man_dancing",
  "dancing_women",
  "dancing_men",
  "business_suit_levitating",
  "walking_woman",
  "walking_man",
  "running_woman",
  "running_man",
  "couple",
  "two_women_holding_hands",
  "two_men_holding_hands",
  "couple_with_heart_woman_man",
  "couple_with_heart_woman_woman",
  "couple_with_heart_man_man",
  "couplekiss_man_woman",
  "couplekiss_woman_woman",
  "couplekiss_man_man",
  "family_man_woman_boy",
  "family_man_woman_girl",
  "family_man_woman_girl_boy",
  "family_man_woman_boy_boy",
  "family_man_woman_girl_girl",
  "family_woman_woman_boy",
  "family_woman_woman_girl",
  "family_woman_woman_girl_boy",
  "family_woman_woman_boy_boy",
  "family_woman_woman_girl_girl",
  "family_man_man_boy",
  "family_man_man_girl",
  "family_man_man_girl_boy",
  "family_man_man_boy_boy",
  "family_man_man_girl_girl",
  "family_woman_boy",
  "family_woman_girl",
  "family_woman_girl_boy",
  "family_woman_boy_boy",
  "family_woman_girl_girl",
  "family_man_boy",
  "family_man_girl",
  "family_man_girl_boy",
  "family_man_boy_boy",
  "family_man_girl_girl",
  "yarn",
  "thread",
  "coat",
  "labcoat",
  "womans_clothes",
  "tshirt",
  "jeans",
  "necktie",
  "dress",
  "bikini",
  "kimono",
  "flat_shoe",
  "high_heel",
  "sandal",
  "boot",
  "mans_shoe",
  "athletic_shoe",
  "hiking_boot",
  "socks",
  "gloves",
  "scarf",
  "tophat",
  "billed_hat",
  "womans_hat",
  "mortar_board",
  "rescue_worker_helmet",
  "crown",
  "pouch",
  "purse",
  "handbag",
  "briefcase",
  "school_satchel",
  "luggage",
  "eyeglasses",
  "dark_sunglasses",
  "goggles",
  "closed_umbrella",
  "dog",
  "cat",
  "mouse",
  "hamster",
  "rabbit",
  "fox_face",
  "bear",
  "panda_face",
  "koala",
  "tiger",
  "lion",
  "cow",
  "pig",
  "pig_nose",
  "frog",
  "monkey_face",
  "see_no_evil",
  "hear_no_evil",
  "speak_no_evil",
  "monkey",
  "chicken",
  "penguin",
  "bird",
  "baby_chick",
  "hatching_chick",
  "hatched_chick",
  "duck",
  "eagle",
  "owl",
  "bat",
  "wolf",
  "boar",
  "horse",
  "unicorn",
  "honeybee",
  "bug",
  "butterfly",
  "snail",
  "shell",
  "beetle",
  "ant",
  "mosquito",
  "grasshopper",
  "spider",
  "spider_web",
  "scorpion",
  "turtle",
  "snake",
  "lizard",
  "t-rex",
  "sauropod",
  "octopus",
  "squid",
  "shrimp",
  "lobster",
  "crab",
  "blowfish",
  "tropical_fish",
  "fish",
  "dolphin",
  "whale",
  "whale2",
  "shark",
  "crocodile",
  "tiger2",
  "leopard",
  "zebra",
  "gorilla",
  "elephant",
  "hippopotamus",
  "rhinoceros",
  "dromedary_camel",
  "giraffe",
  "kangaroo",
  "camel",
  "water_buffalo",
  "ox",
  "cow2",
  "racehorse",
  "pig2",
  "ram",
  "sheep",
  "llama",
  "goat",
  "deer",
  "dog2",
  "poodle",
  "cat2",
  "rooster",
  "turkey",
  "peacock",
  "parrot",
  "swan",
  "dove",
  "rabbit2",
  "raccoon",
  "badger",
  "rat",
  "mouse2",
  "chipmunk",
  "hedgehog",
  "paw_prints",
  "dragon",
  "dragon_face",
  "cactus",
  "christmas_tree",
  "evergreen_tree",
  "deciduous_tree",
  "palm_tree",
  "seedling",
  "herb",
  "shamrock",
  "four_leaf_clover",
  "bamboo",
  "tanabata_tree",
  "leaves",
  "fallen_leaf",
  "maple_leaf",
  "ear_of_rice",
  "hibiscus",
  "sunflower",
  "rose",
  "wilted_flower",
  "tulip",
  "blossom",
  "cherry_blossom",
  "bouquet",
  "mushroom",
  "earth_americas",
  "earth_africa",
  "earth_asia",
  "full_moon",
  "waning_gibbous_moon",
  "last_quarter_moon",
  "waning_crescent_moon",
  "new_moon",
  "waxing_crescent_moon",
  "first_quarter_moon",
  "waxing_gibbous_moon",
  "new_moon_with_face",
  "full_moon_with_face",
  "first_quarter_moon_with_face",
  "last_quarter_moon_with_face",
  "sun_with_face",
  "crescent_moon",
  "star",
  "star2",
  "dizzy",
  "sparkles",
  "comet",
  "sunny",
  "sun_behind_small_cloud",
  "partly_sunny",
  "sun_behind_large_cloud",
  "sun_behind_rain_cloud",
  "cloud",
  "cloud_with_rain",
  "cloud_with_lightning_and_rain",
  "cloud_with_lightning",
  "zap",
  "fire",
  "boom",
  "snowflake",
  "cloud_with_snow",
  "snowman",
  "snowman_with_snow",
  "wind_face",
  "dash",
  "tornado",
  "fog",
  "open_umbrella",
  "umbrella",
  "droplet",
  "sweat_drops",
  "ocean",
  "green_apple",
  "apple",
  "pear",
  "tangerine",
  "lemon",
  "banana",
  "watermelon",
  "grapes",
  "strawberry",
  "melon",
  "cherries",
  "peach",
  "mango",
  "pineapple",
  "coconut",
  "kiwi_fruit",
  "tomato",
  "eggplant",
  "avocado",
  "broccoli",
  "leafy_greens",
  "cucumber",
  "hot_pepper",
  "corn",
  "carrot",
  "potato",
  "sweet_potato",
  "croissant",
  "bagel",
  "bread",
  "baguette_bread",
  "pretzel",
  "cheese",
  "egg",
  "fried_egg",
  "pancakes",
  "bacon",
  "steak",
  "poultry_leg",
  "meat_on_bone",
  "bone",
  "hotdog",
  "hamburger",
  "fries",
  "pizza",
  "sandwich",
  "stuffed_flatbread",
  "taco",
  "burrito",
  "green_salad",
  "shallow_pan_of_food",
  "canned_food",
  "spaghetti",
  "ramen",
  "stew",
  "curry",
  "sushi",
  "bento",
  "fried_shrimp",
  "rice_ball",
  "rice",
  "rice_cracker",
  "fish_cake",
  "fortune_cookie",
  "moon_cake",
  "oden",
  "dango",
  "shaved_ice",
  "ice_cream",
  "icecream",
  "pie",
  "cupcake",
  "cake",
  "birthday",
  "custard",
  "lollipop",
  "candy",
  "chocolate_bar",
  "popcorn",
  "doughnut",
  "dumpling",
  "cookie",
  "chestnut",
  "peanuts",
  "honey_pot",
  "milk_glass",
  "baby_bottle",
  "coffee",
  "tea",
  "cup_with_straw",
  "sake",
  "beer",
  "beers",
  "clinking_glasses",
  "wine_glass",
  "tumbler_glass",
  "cocktail",
  "tropical_drink",
  "champagne",
  "spoon",
  "fork_and_knife",
  "plate_with_cutlery",
  "bowl_with_spoon",
  "takeout_box",
  "chopsticks",
  "salt",
  "soccer",
  "basketball",
  "football",
  "baseball",
  "softball",
  "tennis",
  "volleyball",
  "rugby_football",
  "flying_disc",
  "8ball",
  "golf",
  "golfing_woman",
  "golfing_man",
  "ping_pong",
  "badminton",
  "goal_net",
  "ice_hockey",
  "field_hockey",
  "lacrosse",
  "cricket",
  "ski",
  "skier",
  "snowboarder",
  "person_fencing",
  "women_wrestling",
  "men_wrestling",
  "woman_cartwheeling",
  "man_cartwheeling",
  "woman_playing_handball",
  "man_playing_handball",
  "ice_skate",
  "curling_stone",
  "skateboard",
  "sled",
  "bow_and_arrow",
  "fishing_pole_and_fish",
  "boxing_glove",
  "martial_arts_uniform",
  "rowing_woman",
  "rowing_man",
  "climbing_woman",
  "climbing_man",
  "swimming_woman",
  "swimming_man",
  "woman_playing_water_polo",
  "man_playing_water_polo",
  "woman_in_lotus_position",
  "man_in_lotus_position",
  "surfing_woman",
  "surfing_man",
  "basketball_woman",
  "basketball_man",
  "weight_lifting_woman",
  "weight_lifting_man",
  "biking_woman",
  "biking_man",
  "mountain_biking_woman",
  "mountain_biking_man",
  "horse_racing",
  "trophy",
  "running_shirt_with_sash",
  "medal_sports",
  "medal_military",
  "1st_place_medal",
  "2nd_place_medal",
  "3rd_place_medal",
  "reminder_ribbon",
  "rosette",
  "ticket",
  "tickets",
  "performing_arts",
  "art",
  "circus_tent",
  "woman_juggling",
  "man_juggling",
  "microphone",
  "headphones",
  "musical_score",
  "musical_keyboard",
  "drum",
  "saxophone",
  "trumpet",
  "guitar",
  "violin",
  "clapper",
  "video_game",
  "dart",
  "game_die",
  "chess_pawn",
  "slot_machine",
  "jigsaw",
  "bowling",
  "red_car",
  "taxi",
  "blue_car",
  "bus",
  "trolleybus",
  "racing_car",
  "police_car",
  "ambulance",
  "fire_engine",
  "minibus",
  "truck",
  "articulated_lorry",
  "tractor",
  "kick_scooter",
  "motorcycle",
  "bike",
  "motor_scooter",
  "rotating_light",
  "oncoming_police_car",
  "oncoming_bus",
  "oncoming_automobile",
  "oncoming_taxi",
  "aerial_tramway",
  "mountain_cableway",
  "suspension_railway",
  "railway_car",
  "train",
  "monorail",
  "bullettrain_side",
  "bullettrain_front",
  "light_rail",
  "mountain_railway",
  "steam_locomotive",
  "train2",
  "metro",
  "tram",
  "station",
  "flying_saucer",
  "helicopter",
  "small_airplane",
  "airplane",
  "flight_departure",
  "flight_arrival",
  "sailboat",
  "motor_boat",
  "speedboat",
  "ferry",
  "passenger_ship",
  "rocket",
  "artificial_satellite",
  "seat",
  "canoe",
  "anchor",
  "construction",
  "fuelpump",
  "busstop",
  "vertical_traffic_light",
  "traffic_light",
  "ship",
  "ferris_wheel",
  "roller_coaster",
  "carousel_horse",
  "building_construction",
  "foggy",
  "tokyo_tower",
  "factory",
  "fountain",
  "rice_scene",
  "mountain",
  "mountain_snow",
  "mount_fuji",
  "volcano",
  "japan",
  "camping",
  "tent",
  "national_park",
  "motorway",
  "railway_track",
  "sunrise",
  "sunrise_over_mountains",
  "desert",
  "beach_umbrella",
  "desert_island",
  "city_sunrise",
  "city_sunset",
  "cityscape",
  "night_with_stars",
  "bridge_at_night",
  "milky_way",
  "stars",
  "sparkler",
  "fireworks",
  "rainbow",
  "houses",
  "european_castle",
  "japanese_castle",
  "stadium",
  "statue_of_liberty",
  "house",
  "house_with_garden",
  "derelict_house",
  "office",
  "department_store",
  "post_office",
  "european_post_office",
  "hospital",
  "bank",
  "hotel",
  "convenience_store",
  "school",
  "love_hotel",
  "wedding",
  "classical_building",
  "church",
  "mosque",
  "synagogue",
  "kaaba",
  "shinto_shrine",
  "watch",
  "iphone",
  "calling",
  "computer",
  "keyboard",
  "desktop_computer",
  "printer",
  "computer_mouse",
  "trackball",
  "joystick",
  "clamp",
  "minidisc",
  "floppy_disk",
  "cd",
  "dvd",
  "vhs",
  "camera",
  "camera_flash",
  "video_camera",
  "movie_camera",
  "film_projector",
  "film_strip",
  "telephone_receiver",
  "phone",
  "pager",
  "fax",
  "tv",
  "radio",
  "studio_microphone",
  "level_slider",
  "control_knobs",
  "compass",
  "stopwatch",
  "timer_clock",
  "alarm_clock",
  "mantelpiece_clock",
  "hourglass_flowing_sand",
  "hourglass",
  "satellite",
  "battery",
  "electric_plug",
  "bulb",
  "flashlight",
  "candle",
  "fire_extinguisher",
  "wastebasket",
  "oil_drum",
  "money_with_wings",
  "dollar",
  "yen",
  "euro",
  "pound",
  "moneybag",
  "credit_card",
  "gem",
  "balance_scale",
  "toolbox",
  "wrench",
  "hammer",
  "hammer_and_pick",
  "hammer_and_wrench",
  "pick",
  "nut_and_bolt",
  "gear",
  "brick",
  "chains",
  "magnet",
  "gun",
  "bomb",
  "firecracker",
  "hocho",
  "dagger",
  "crossed_swords",
  "shield",
  "smoking",
  "coffin",
  "funeral_urn",
  "amphora",
  "crystal_ball",
  "prayer_beads",
  "nazar_amulet",
  "barber",
  "alembic",
  "telescope",
  "microscope",
  "hole",
  "pill",
  "syringe",
  "dna",
  "microbe",
  "petri_dish",
  "test_tube",
  "thermometer",
  "broom",
  "basket",
  "toilet_paper",
  "label",
  "bookmark",
  "toilet",
  "shower",
  "bathtub",
  "bath",
  "soap",
  "sponge",
  "lotion_bottle",
  "key",
  "old_key",
  "couch_and_lamp",
  "sleeping_bed",
  "bed",
  "door",
  "bellhop_bell",
  "teddy_bear",
  "framed_picture",
  "world_map",
  "parasol_on_ground",
  "moyai",
  "shopping",
  "shopping_cart",
  "balloon",
  "flags",
  "ribbon",
  "gift",
  "confetti_ball",
  "tada",
  "dolls",
  "wind_chime",
  "crossed_flags",
  "izakaya_lantern",
  "red_envelope",
  "email",
  "envelope_with_arrow",
  "incoming_envelope",
  "e-mail",
  "love_letter",
  "postbox",
  "mailbox_closed",
  "mailbox",
  "mailbox_with_mail",
  "mailbox_with_no_mail",
  "package",
  "postal_horn",
  "inbox_tray",
  "outbox_tray",
  "scroll",
  "page_with_curl",
  "bookmark_tabs",
  "receipt",
  "bar_chart",
  "chart_with_upwards_trend",
  "chart_with_downwards_trend",
  "page_facing_up",
  "date",
  "calendar",
  "spiral_calendar",
  "card_index",
  "card_file_box",
  "ballot_box",
  "file_cabinet",
  "clipboard",
  "spiral_notepad",
  "file_folder",
  "open_file_folder",
  "card_index_dividers",
  "newspaper_roll",
  "newspaper",
  "notebook",
  "closed_book",
  "green_book",
  "blue_book",
  "orange_book",
  "notebook_with_decorative_cover",
  "ledger",
  "books",
  "open_book",
  "safety_pin",
  "link",
  "paperclip",
  "paperclips",
  "scissors",
  "triangular_ruler",
  "straight_ruler",
  "abacus",
  "pushpin",
  "round_pushpin",
  "closed_lock_with_key",
  "lock",
  "unlock",
  "lock_with_ink_pen",
  "pen",
  "fountain_pen",
  "black_nib",
  "memo",
  "pencil2",
  "crayon",
  "paintbrush",
  "mag",
  "mag_right",
  "heart",
  "orange_heart",
  "yellow_heart",
  "green_heart",
  "blue_heart",
  "purple_heart",
  "black_heart",
  "broken_heart",
  "heavy_heart_exclamation",
  "two_hearts",
  "revolving_hearts",
  "heartbeat",
  "heartpulse",
  "sparkling_heart",
  "cupid",
  "gift_heart",
  "heart_decoration",
  "peace_symbol",
  "latin_cross",
  "star_and_crescent",
  "om",
  "wheel_of_dharma",
  "star_of_david",
  "six_pointed_star",
  "menorah",
  "yin_yang",
  "orthodox_cross",
  "place_of_worship",
  "ophiuchus",
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpius",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
  "id",
  "atom_symbol",
  "u7a7a",
  "u5272",
  "radioactive",
  "biohazard",
  "mobile_phone_off",
  "vibration_mode",
  "u6709",
  "u7121",
  "u7533",
  "u55b6",
  "u6708",
  "eight_pointed_black_star",
  "vs",
  "accept",
  "white_flower",
  "ideograph_advantage",
  "secret",
  "congratulations",
  "u5408",
  "u6e80",
  "u7981",
  "a",
  "b",
  "ab",
  "cl",
  "o2",
  "sos",
  "no_entry",
  "name_badge",
  "no_entry_sign",
  "x",
  "o",
  "stop_sign",
  "anger",
  "hotsprings",
  "no_pedestrians",
  "do_not_litter",
  "no_bicycles",
  "non-potable_water",
  "underage",
  "no_mobile_phones",
  "exclamation",
  "grey_exclamation",
  "question",
  "grey_question",
  "bangbang",
  "interrobang",
  "100",
  "low_brightness",
  "high_brightness",
  "trident",
  "fleur_de_lis",
  "part_alternation_mark",
  "warning",
  "children_crossing",
  "beginner",
  "recycle",
  "u6307",
  "chart",
  "sparkle",
  "eight_spoked_asterisk",
  "negative_squared_cross_mark",
  "white_check_mark",
  "diamond_shape_with_a_dot_inside",
  "cyclone",
  "loop",
  "globe_with_meridians",
  "m",
  "atm",
  "zzz",
  "sa",
  "passport_control",
  "customs",
  "baggage_claim",
  "left_luggage",
  "wheelchair",
  "no_smoking",
  "wc",
  "parking",
  "potable_water",
  "mens",
  "womens",
  "baby_symbol",
  "restroom",
  "put_litter_in_its_place",
  "cinema",
  "signal_strength",
  "koko",
  "ng",
  "ok",
  "up",
  "cool",
  "new",
  "free",
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "keycap_ten",
  "asterisk",
  "1234",
  "eject_button",
  "arrow_forward",
  "pause_button",
  "next_track_button",
  "stop_button",
  "record_button",
  "play_or_pause_button",
  "previous_track_button",
  "fast_forward",
  "rewind",
  "twisted_rightwards_arrows",
  "repeat",
  "repeat_one",
  "arrow_backward",
  "arrow_up_small",
  "arrow_down_small",
  "arrow_double_up",
  "arrow_double_down",
  "arrow_right",
  "arrow_left",
  "arrow_up",
  "arrow_down",
  "arrow_upper_right",
  "arrow_lower_right",
  "arrow_lower_left",
  "arrow_upper_left",
  "arrow_up_down",
  "left_right_arrow",
  "arrows_counterclockwise",
  "arrow_right_hook",
  "leftwards_arrow_with_hook",
  "arrow_heading_up",
  "arrow_heading_down",
  "hash",
  "information_source",
  "abc",
  "abcd",
  "capital_abcd",
  "symbols",
  "musical_note",
  "notes",
  "wavy_dash",
  "curly_loop",
  "heavy_check_mark",
  "arrows_clockwise",
  "heavy_plus_sign",
  "heavy_minus_sign",
  "heavy_division_sign",
  "heavy_multiplication_x",
  "infinity",
  "heavy_dollar_sign",
  "currency_exchange",
  "copyright",
  "registered",
  "tm",
  "end",
  "back",
  "on",
  "top",
  "soon",
  "ballot_box_with_check",
  "radio_button",
  "white_circle",
  "black_circle",
  "red_circle",
  "large_blue_circle",
  "small_orange_diamond",
  "small_blue_diamond",
  "large_orange_diamond",
  "large_blue_diamond",
  "small_red_triangle",
  "black_small_square",
  "white_small_square",
  "black_large_square",
  "white_large_square",
  "small_red_triangle_down",
  "black_medium_square",
  "white_medium_square",
  "black_medium_small_square",
  "white_medium_small_square",
  "black_square_button",
  "white_square_button",
  "speaker",
  "sound",
  "loud_sound",
  "mute",
  "mega",
  "loudspeaker",
  "bell",
  "no_bell",
  "black_joker",
  "mahjong",
  "spades",
  "clubs",
  "hearts",
  "diamonds",
  "flower_playing_cards",
  "thought_balloon",
  "right_anger_bubble",
  "speech_balloon",
  "left_speech_bubble",
  "clock1",
  "clock2",
  "clock3",
  "clock4",
  "clock5",
  "clock6",
  "clock7",
  "clock8",
  "clock9",
  "clock10",
  "clock11",
  "clock12",
  "clock130",
  "clock230",
  "clock330",
  "clock430",
  "clock530",
  "clock630",
  "clock730",
  "clock830",
  "clock930",
  "clock1030",
  "clock1130",
  "clock1230",
  "white_flag",
  "black_flag",
  "pirate_flag",
  "checkered_flag",
  "triangular_flag_on_post",
  "rainbow_flag",
  "united_nations",
  "afghanistan",
  "aland_islands",
  "albania",
  "algeria",
  "american_samoa",
  "andorra",
  "angola",
  "anguilla",
  "antarctica",
  "antigua_barbuda",
  "argentina",
  "armenia",
  "aruba",
  "australia",
  "austria",
  "azerbaijan",
  "bahamas",
  "bahrain",
  "bangladesh",
  "barbados",
  "belarus",
  "belgium",
  "belize",
  "benin",
  "bermuda",
  "bhutan",
  "bolivia",
  "caribbean_netherlands",
  "bosnia_herzegovina",
  "botswana",
  "brazil",
  "british_indian_ocean_territory",
  "british_virgin_islands",
  "brunei",
  "bulgaria",
  "burkina_faso",
  "burundi",
  "cape_verde",
  "cambodia",
  "cameroon",
  "canada",
  "canary_islands",
  "cayman_islands",
  "central_african_republic",
  "chad",
  "chile",
  "cn",
  "christmas_island",
  "cocos_islands",
  "colombia",
  "comoros",
  "congo_brazzaville",
  "congo_kinshasa",
  "cook_islands",
  "costa_rica",
  "croatia",
  "cuba",
  "curacao",
  "cyprus",
  "czech_republic",
  "denmark",
  "djibouti",
  "dominica",
  "dominican_republic",
  "ecuador",
  "egypt",
  "el_salvador",
  "equatorial_guinea",
  "eritrea",
  "estonia",
  "ethiopia",
  "eu",
  "falkland_islands",
  "faroe_islands",
  "fiji",
  "finland",
  "fr",
  "french_guiana",
  "french_polynesia",
  "french_southern_territories",
  "gabon",
  "gambia",
  "georgia",
  "de",
  "ghana",
  "gibraltar",
  "greece",
  "greenland",
  "grenada",
  "guadeloupe",
  "guam",
  "guatemala",
  "guernsey",
  "guinea",
  "guinea_bissau",
  "guyana",
  "haiti",
  "honduras",
  "hong_kong",
  "hungary",
  "iceland",
  "india",
  "indonesia",
  "iran",
  "iraq",
  "ireland",
  "isle_of_man",
  "israel",
  "it",
  "cote_divoire",
  "jamaica",
  "jp",
  "jersey",
  "jordan",
  "kazakhstan",
  "kenya",
  "kiribati",
  "kosovo",
  "kuwait",
  "kyrgyzstan",
  "laos",
  "latvia",
  "lebanon",
  "lesotho",
  "liberia",
  "libya",
  "liechtenstein",
  "lithuania",
  "luxembourg",
  "macau",
  "macedonia",
  "madagascar",
  "malawi",
  "malaysia",
  "maldives",
  "mali",
  "malta",
  "marshall_islands",
  "martinique",
  "mauritania",
  "mauritius",
  "mayotte",
  "mexico",
  "micronesia",
  "moldova",
  "monaco",
  "mongolia",
  "montenegro",
  "montserrat",
  "morocco",
  "mozambique",
  "myanmar",
  "namibia",
  "nauru",
  "nepal",
  "netherlands",
  "new_caledonia",
  "new_zealand",
  "nicaragua",
  "niger",
  "nigeria",
  "niue",
  "norfolk_island",
  "northern_mariana_islands",
  "north_korea",
  "norway",
  "oman",
  "pakistan",
  "palau",
  "palestinian_territories",
  "panama",
  "papua_new_guinea",
  "paraguay",
  "peru",
  "philippines",
  "pitcairn_islands",
  "poland",
  "portugal",
  "puerto_rico",
  "qatar",
  "reunion",
  "romania",
  "ru",
  "rwanda",
  "st_barthelemy",
  "st_helena",
  "st_kitts_nevis",
  "st_lucia",
  "st_pierre_miquelon",
  "st_vincent_grenadines",
  "samoa",
  "san_marino",
  "sao_tome_principe",
  "saudi_arabia",
  "senegal",
  "serbia",
  "seychelles",
  "sierra_leone",
  "singapore",
  "sint_maarten",
  "slovakia",
  "slovenia",
  "solomon_islands",
  "somalia",
  "south_africa",
  "south_georgia_south_sandwich_islands",
  "kr",
  "south_sudan",
  "es",
  "sri_lanka",
  "sudan",
  "suriname",
  "swaziland",
  "sweden",
  "switzerland",
  "syria",
  "taiwan",
  "tajikistan",
  "tanzania",
  "thailand",
  "timor_leste",
  "togo",
  "tokelau",
  "tonga",
  "trinidad_tobago",
  "tunisia",
  "tr",
  "turkmenistan",
  "turks_caicos_islands",
  "tuvalu",
  "uganda",
  "ukraine",
  "united_arab_emirates",
  "uk",
  "england",
  "scotland",
  "wales",
  "us",
  "us_virgin_islands",
  "uruguay",
  "uzbekistan",
  "vanuatu",
  "vatican_city",
  "venezuela",
  "vietnam",
  "wallis_futuna",
  "western_sahara",
  "yemen",
  "zambia",
  "zimbabwe"
];
var qE = {
  lib: RE,
  ordered: IE,
  fitzpatrick_scale_modifiers: ["🏻", "🏼", "🏽", "🏾", "🏿"]
};
const OE = /* @__PURE__ */ pa(qE);
var DE = () => {
  const t = "\\ud800-\\udfff", e = "\\u0300-\\u036f", a = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", o = "\\u1ab0-\\u1aff", i = "\\u1dc0-\\u1dff", l = e + a + r + o + i, d = "\\ufe0e\\ufe0f", n = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", f = `[${t}]`, h = `[${l}]`, p = "\\ud83c[\\udffb-\\udfff]", c = `(?:${h}|${p})`, y = `[^${t}]`, u = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", m = "[\\ud800-\\udbff][\\udc00-\\udfff]", x = "\\u200d", j = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", b = `[${n}]`, E = `${c}?`, w = `[${d}]?`, g = `(?:${x}(?:${[y, u, m].join("|")})${w + E})*`, s = w + E + g, v = `(?:${[`${y}${h}?`, h, u, m, f, b].join("|")})`;
  return new RegExp(`${j}|${p}(?=${p})|${v + s}`, "g");
};
const ME = /* @__PURE__ */ pa(DE);
var BE = /* @__PURE__ */ new Set([
  9757,
  9977,
  9994,
  9995,
  9996,
  9997,
  127877,
  127939,
  127940,
  127946,
  127947,
  128066,
  128067,
  128070,
  128071,
  128072,
  128073,
  128074,
  128075,
  128076,
  128077,
  128078,
  128079,
  128080,
  128102,
  128103,
  128104,
  128105,
  128110,
  128112,
  128113,
  128114,
  128115,
  128116,
  128117,
  128118,
  128119,
  128120,
  128124,
  128129,
  128130,
  128131,
  128133,
  128134,
  128135,
  128170,
  128373,
  128378,
  128400,
  128405,
  128406,
  128581,
  128582,
  128583,
  128587,
  128588,
  128589,
  128590,
  128591,
  128675,
  128692,
  128693,
  128694,
  128704,
  129304,
  129305,
  129306,
  129307,
  129308,
  129309,
  129310,
  129318,
  129328,
  129331,
  129332,
  129333,
  129334,
  129335,
  129336,
  129337,
  129340,
  129341,
  129342
]);
const NE = BE, ao = /* @__PURE__ */ new Map([
  ["none", ""],
  ["white", "🏻"],
  ["creamWhite", "🏼"],
  ["lightBrown", "🏽"],
  ["brown", "🏾"],
  ["darkBrown", "🏿"]
]);
var HE = (t, e) => {
  if (!ao.has(e))
    throw new TypeError(`Unexpected \`skinTone\` name: ${e}`);
  return t = t.replace(/[\u{1f3fb}-\u{1f3ff}]/u, ""), NE.has(t.codePointAt(0)) && e !== "none" && (t += ao.get(e)), t;
};
const UE = /* @__PURE__ */ pa(HE);
var VE = ME();
function WE(t) {
  return typeof t == "function" ? t : () => t;
}
var KE = String.fromCharCode(65039), GE = new RegExp(KE, "g");
function Po(t) {
  return t.replace(GE, "");
}
function Ro(t) {
  return /:.+:/.test(t) ? t.slice(1, -1) : t;
}
var Io = Object.entries(OE.lib).map(
  ([t, { char: e }]) => [t, e]
), XE = new Map(Io), QE = new Map(
  Io.map(([t, e]) => [Po(e), t])
), JE = (t) => {
  Me.assert.string(t);
  const e = Ro(t), a = XE.get(e);
  return a ? { emoji: a, key: e } : void 0;
}, to = (t, { fallback: e, format: a = (r) => r } = {}) => {
  const r = e === void 0 ? e : WE(e);
  return Ge.assert.string(t), Ge.assert.any([Ge.default.undefined, Ge.default.function_], r), Ge.assert.function_(a), t.replace(/:[\w\-+]+:/g, (o) => {
    const i = JE(o);
    return i ? a(i.emoji, o, t) : a(r ? r(Ro(o)) : o);
  });
}, YE = (t) => {
  Me.assert.string(t);
  const e = Po(t), a = QE.get(e);
  return a ? { emoji: e, key: a } : void 0;
}, ZE = (t, { markdown: e = !1 } = {}) => {
  Me.assert.string(t), Me.assert.boolean(e);
  const a = YE(UE(t, "none"));
  if (a !== void 0)
    return e ? `:${a.key}:` : a.key;
}, e9 = (t) => {
  Me.assert.string(t);
  const e = t.match(VE);
  return e === null ? t : e.map((a) => ZE(a, { markdown: !0 }) ?? a).join("");
}, Kt = { exports: {} }, fr = { exports: {} };
fr.exports;
(function(t) {
  (function(e, a, r) {
    function o(n) {
      var f = this, h = d();
      f.next = function() {
        var p = 2091639 * f.s0 + f.c * 23283064365386963e-26;
        return f.s0 = f.s1, f.s1 = f.s2, f.s2 = p - (f.c = p | 0);
      }, f.c = 1, f.s0 = h(" "), f.s1 = h(" "), f.s2 = h(" "), f.s0 -= h(n), f.s0 < 0 && (f.s0 += 1), f.s1 -= h(n), f.s1 < 0 && (f.s1 += 1), f.s2 -= h(n), f.s2 < 0 && (f.s2 += 1), h = null;
    }
    function i(n, f) {
      return f.c = n.c, f.s0 = n.s0, f.s1 = n.s1, f.s2 = n.s2, f;
    }
    function l(n, f) {
      var h = new o(n), p = f && f.state, c = h.next;
      return c.int32 = function() {
        return h.next() * 4294967296 | 0;
      }, c.double = function() {
        return c() + (c() * 2097152 | 0) * 11102230246251565e-32;
      }, c.quick = c, p && (typeof p == "object" && i(p, h), c.state = function() {
        return i(h, {});
      }), c;
    }
    function d() {
      var n = 4022871197, f = function(h) {
        h = h.toString();
        for (var p = 0; p < h.length; p++) {
          n += h.charCodeAt(p);
          var c = 0.02519603282416938 * n;
          n = c >>> 0, c -= n, c *= n, n = c >>> 0, c -= n, n += c * 4294967296;
        }
        return (n >>> 0) * 23283064365386963e-26;
      };
      return f;
    }
    a && a.exports ? a.exports = l : r && r.amd ? r(function() {
      return l;
    }) : this.alea = l;
  })(
    Be,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(fr);
var a9 = fr.exports, hr = { exports: {} };
hr.exports;
(function(t) {
  (function(e, a, r) {
    function o(d) {
      var n = this, f = "";
      n.x = 0, n.y = 0, n.z = 0, n.w = 0, n.next = function() {
        var p = n.x ^ n.x << 11;
        return n.x = n.y, n.y = n.z, n.z = n.w, n.w ^= n.w >>> 19 ^ p ^ p >>> 8;
      }, d === (d | 0) ? n.x = d : f += d;
      for (var h = 0; h < f.length + 64; h++)
        n.x ^= f.charCodeAt(h) | 0, n.next();
    }
    function i(d, n) {
      return n.x = d.x, n.y = d.y, n.z = d.z, n.w = d.w, n;
    }
    function l(d, n) {
      var f = new o(d), h = n && n.state, p = function() {
        return (f.next() >>> 0) / 4294967296;
      };
      return p.double = function() {
        do
          var c = f.next() >>> 11, y = (f.next() >>> 0) / 4294967296, u = (c + y) / (1 << 21);
        while (u === 0);
        return u;
      }, p.int32 = f.next, p.quick = p, h && (typeof h == "object" && i(h, f), p.state = function() {
        return i(f, {});
      }), p;
    }
    a && a.exports ? a.exports = l : r && r.amd ? r(function() {
      return l;
    }) : this.xor128 = l;
  })(
    Be,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(hr);
var t9 = hr.exports, yr = { exports: {} };
yr.exports;
(function(t) {
  (function(e, a, r) {
    function o(d) {
      var n = this, f = "";
      n.next = function() {
        var p = n.x ^ n.x >>> 2;
        return n.x = n.y, n.y = n.z, n.z = n.w, n.w = n.v, (n.d = n.d + 362437 | 0) + (n.v = n.v ^ n.v << 4 ^ (p ^ p << 1)) | 0;
      }, n.x = 0, n.y = 0, n.z = 0, n.w = 0, n.v = 0, d === (d | 0) ? n.x = d : f += d;
      for (var h = 0; h < f.length + 64; h++)
        n.x ^= f.charCodeAt(h) | 0, h == f.length && (n.d = n.x << 10 ^ n.x >>> 4), n.next();
    }
    function i(d, n) {
      return n.x = d.x, n.y = d.y, n.z = d.z, n.w = d.w, n.v = d.v, n.d = d.d, n;
    }
    function l(d, n) {
      var f = new o(d), h = n && n.state, p = function() {
        return (f.next() >>> 0) / 4294967296;
      };
      return p.double = function() {
        do
          var c = f.next() >>> 11, y = (f.next() >>> 0) / 4294967296, u = (c + y) / (1 << 21);
        while (u === 0);
        return u;
      }, p.int32 = f.next, p.quick = p, h && (typeof h == "object" && i(h, f), p.state = function() {
        return i(f, {});
      }), p;
    }
    a && a.exports ? a.exports = l : r && r.amd ? r(function() {
      return l;
    }) : this.xorwow = l;
  })(
    Be,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(yr);
var r9 = yr.exports, gr = { exports: {} };
gr.exports;
(function(t) {
  (function(e, a, r) {
    function o(d) {
      var n = this;
      n.next = function() {
        var h = n.x, p = n.i, c, y;
        return c = h[p], c ^= c >>> 7, y = c ^ c << 24, c = h[p + 1 & 7], y ^= c ^ c >>> 10, c = h[p + 3 & 7], y ^= c ^ c >>> 3, c = h[p + 4 & 7], y ^= c ^ c << 7, c = h[p + 7 & 7], c = c ^ c << 13, y ^= c ^ c << 9, h[p] = y, n.i = p + 1 & 7, y;
      };
      function f(h, p) {
        var c, y = [];
        if (p === (p | 0))
          y[0] = p;
        else
          for (p = "" + p, c = 0; c < p.length; ++c)
            y[c & 7] = y[c & 7] << 15 ^ p.charCodeAt(c) + y[c + 1 & 7] << 13;
        for (; y.length < 8; )
          y.push(0);
        for (c = 0; c < 8 && y[c] === 0; ++c)
          ;
        for (c == 8 ? y[7] = -1 : y[c], h.x = y, h.i = 0, c = 256; c > 0; --c)
          h.next();
      }
      f(n, d);
    }
    function i(d, n) {
      return n.x = d.x.slice(), n.i = d.i, n;
    }
    function l(d, n) {
      d == null && (d = +/* @__PURE__ */ new Date());
      var f = new o(d), h = n && n.state, p = function() {
        return (f.next() >>> 0) / 4294967296;
      };
      return p.double = function() {
        do
          var c = f.next() >>> 11, y = (f.next() >>> 0) / 4294967296, u = (c + y) / (1 << 21);
        while (u === 0);
        return u;
      }, p.int32 = f.next, p.quick = p, h && (h.x && i(h, f), p.state = function() {
        return i(f, {});
      }), p;
    }
    a && a.exports ? a.exports = l : r && r.amd ? r(function() {
      return l;
    }) : this.xorshift7 = l;
  })(
    Be,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(gr);
var o9 = gr.exports, _r = { exports: {} };
_r.exports;
(function(t) {
  (function(e, a, r) {
    function o(d) {
      var n = this;
      n.next = function() {
        var h = n.w, p = n.X, c = n.i, y, u;
        return n.w = h = h + 1640531527 | 0, u = p[c + 34 & 127], y = p[c = c + 1 & 127], u ^= u << 13, y ^= y << 17, u ^= u >>> 15, y ^= y >>> 12, u = p[c] = u ^ y, n.i = c, u + (h ^ h >>> 16) | 0;
      };
      function f(h, p) {
        var c, y, u, m, x, j = [], b = 128;
        for (p === (p | 0) ? (y = p, p = null) : (p = p + "\0", y = 0, b = Math.max(b, p.length)), u = 0, m = -32; m < b; ++m)
          p && (y ^= p.charCodeAt((m + 32) % p.length)), m === 0 && (x = y), y ^= y << 10, y ^= y >>> 15, y ^= y << 4, y ^= y >>> 13, m >= 0 && (x = x + 1640531527 | 0, c = j[m & 127] ^= y + x, u = c == 0 ? u + 1 : 0);
        for (u >= 128 && (j[(p && p.length || 0) & 127] = -1), u = 127, m = 4 * 128; m > 0; --m)
          y = j[u + 34 & 127], c = j[u = u + 1 & 127], y ^= y << 13, c ^= c << 17, y ^= y >>> 15, c ^= c >>> 12, j[u] = y ^ c;
        h.w = x, h.X = j, h.i = u;
      }
      f(n, d);
    }
    function i(d, n) {
      return n.i = d.i, n.w = d.w, n.X = d.X.slice(), n;
    }
    function l(d, n) {
      d == null && (d = +/* @__PURE__ */ new Date());
      var f = new o(d), h = n && n.state, p = function() {
        return (f.next() >>> 0) / 4294967296;
      };
      return p.double = function() {
        do
          var c = f.next() >>> 11, y = (f.next() >>> 0) / 4294967296, u = (c + y) / (1 << 21);
        while (u === 0);
        return u;
      }, p.int32 = f.next, p.quick = p, h && (h.X && i(h, f), p.state = function() {
        return i(f, {});
      }), p;
    }
    a && a.exports ? a.exports = l : r && r.amd ? r(function() {
      return l;
    }) : this.xor4096 = l;
  })(
    Be,
    // window object or global
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(_r);
var s9 = _r.exports, ur = { exports: {} };
ur.exports;
(function(t) {
  (function(e, a, r) {
    function o(d) {
      var n = this, f = "";
      n.next = function() {
        var p = n.b, c = n.c, y = n.d, u = n.a;
        return p = p << 25 ^ p >>> 7 ^ c, c = c - y | 0, y = y << 24 ^ y >>> 8 ^ u, u = u - p | 0, n.b = p = p << 20 ^ p >>> 12 ^ c, n.c = c = c - y | 0, n.d = y << 16 ^ c >>> 16 ^ u, n.a = u - p | 0;
      }, n.a = 0, n.b = 0, n.c = -1640531527, n.d = 1367130551, d === Math.floor(d) ? (n.a = d / 4294967296 | 0, n.b = d | 0) : f += d;
      for (var h = 0; h < f.length + 20; h++)
        n.b ^= f.charCodeAt(h) | 0, n.next();
    }
    function i(d, n) {
      return n.a = d.a, n.b = d.b, n.c = d.c, n.d = d.d, n;
    }
    function l(d, n) {
      var f = new o(d), h = n && n.state, p = function() {
        return (f.next() >>> 0) / 4294967296;
      };
      return p.double = function() {
        do
          var c = f.next() >>> 11, y = (f.next() >>> 0) / 4294967296, u = (c + y) / (1 << 21);
        while (u === 0);
        return u;
      }, p.int32 = f.next, p.quick = p, h && (typeof h == "object" && i(h, f), p.state = function() {
        return i(f, {});
      }), p;
    }
    a && a.exports ? a.exports = l : r && r.amd ? r(function() {
      return l;
    }) : this.tychei = l;
  })(
    Be,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(ur);
var c9 = ur.exports, qo = { exports: {} };
const i9 = {}, n9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: i9
}, Symbol.toStringTag, { value: "Module" })), l9 = /* @__PURE__ */ Bi(n9);
(function(t) {
  (function(e, a) {
    var r = this, o = 256, i = 6, l = 52, d = "random", n = a.pow(o, i), f = a.pow(2, l), h = f * 2, p = o - 1, c;
    function y(w, g, s) {
      var _ = [];
      g = g == !0 ? { entropy: !0 } : g || {};
      var v = j(x(
        g.entropy ? [w, E(e)] : w ?? b(),
        3
      ), _), $ = new u(_), C = function() {
        for (var F = $.g(i), q = n, A = 0; F < f; )
          F = (F + A) * o, q *= o, A = $.g(1);
        for (; F >= h; )
          F /= 2, q /= 2, A >>>= 1;
        return (F + A) / q;
      };
      return C.int32 = function() {
        return $.g(4) | 0;
      }, C.quick = function() {
        return $.g(4) / 4294967296;
      }, C.double = C, j(E($.S), e), (g.pass || s || function(F, q, A, O) {
        return O && (O.S && m(O, $), F.state = function() {
          return m($, {});
        }), A ? (a[d] = F, q) : F;
      })(
        C,
        v,
        "global" in g ? g.global : this == a,
        g.state
      );
    }
    a["seed" + d] = y;
    function u(w) {
      var g, s = w.length, _ = this, v = 0, $ = _.i = _.j = 0, C = _.S = [];
      for (s || (w = [s++]); v < o; )
        C[v] = v++;
      for (v = 0; v < o; v++)
        C[v] = C[$ = p & $ + w[v % s] + (g = C[v])], C[$] = g;
      (_.g = function(F) {
        for (var q, A = 0, O = _.i, D = _.j, K = _.S; F--; )
          q = K[O = p & O + 1], A = A * o + K[p & (K[O] = K[D = p & D + q]) + (K[D] = q)];
        return _.i = O, _.j = D, A;
      })(o);
    }
    function m(w, g) {
      return g.i = w.i, g.j = w.j, g.S = w.S.slice(), g;
    }
    function x(w, g) {
      var s = [], _ = typeof w, v;
      if (g && _ == "object")
        for (v in w)
          try {
            s.push(x(w[v], g - 1));
          } catch {
          }
      return s.length ? s : _ == "string" ? w : w + "\0";
    }
    function j(w, g) {
      for (var s = w + "", _, v = 0; v < s.length; )
        g[p & v] = p & (_ ^= g[p & v] * 19) + s.charCodeAt(v++);
      return E(g);
    }
    function b() {
      try {
        if (c)
          return E(c.randomBytes(o));
        var w = new Uint8Array(o);
        return (r.crypto || r.msCrypto).getRandomValues(w), E(w);
      } catch {
        var g = r.navigator, s = g && g.plugins;
        return [+/* @__PURE__ */ new Date(), r, s, r.screen, E(e)];
      }
    }
    function E(w) {
      return String.fromCharCode.apply(0, w);
    }
    if (j(a.random(), e), t.exports) {
      t.exports = y;
      try {
        c = l9;
      } catch {
      }
    }
  })(
    [],
    // pool: entropy pool starts empty
    Math
    // math: package containing random, pow, and seedrandom
  );
})(qo);
var d9 = qo.exports, p9 = a9, f9 = t9, h9 = r9, y9 = o9, g9 = s9, _9 = c9, Pe = d9;
Pe.alea = p9;
Pe.xor128 = f9;
Pe.xorwow = h9;
Pe.xorshift7 = y9;
Pe.xor4096 = g9;
Pe.tychei = _9;
var u9 = Pe, mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
class re {
  /**
   * RGB Array: [r, g, b]
   */
  get rgb() {
    return [this.r, this.g, this.b];
  }
  set rgb(e) {
    this.r = e[0], this.g = e[1], this.b = e[2];
  }
  /**
   * Hex to RGB
   */
  static parseHex(e) {
    switch (e[0] === "#" && (e = e.substr(1)), e.length) {
      case 6:
        return {
          r: parseInt(e.substr(0, 2), 16),
          g: parseInt(e.substr(2, 2), 16),
          b: parseInt(e.substr(4, 2), 16)
        };
      case 3:
        return {
          r: parseInt(e.substr(0, 1).repeat(2), 16),
          g: parseInt(e.substr(1, 1).repeat(2), 16),
          b: parseInt(e.substr(2, 1).repeat(2), 16)
        };
      default:
        throw "Invalid color code";
    }
  }
  /**
   * Analyze string
   */
  static parseString(e) {
    return e[0] === "#" ? re.parseHex(e) : null;
  }
  static rgbToHsv(e, a, r) {
    let o, i, l;
    if (e && a && r)
      o = e, i = a, l = r;
    else if (typeof e == "string") {
      const y = re.parseString(e);
      if (y !== null)
        o = y.r, i = y.g, l = y.b;
      else
        throw "unknown color string";
    } else if (Array.isArray(e))
      o = e[0], i = e[1], l = e[2];
    else if (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b"))
      o = e.r, i = e.g, l = e.b;
    else
      throw "invalid argument";
    const d = Math.max(o, i, l), n = Math.min(o, i, l), f = d - n;
    let h, p;
    const c = d;
    if (d === 0 ? p = 0 : p = f / d, d === n)
      h = 0;
    else {
      switch (d) {
        case o:
          h = (i - l) / f + (i < l ? 6 : 0);
          break;
        case i:
          h = (l - o) / f + 2;
          break;
        case l:
          h = (o - i) / f + 4;
          break;
      }
      h /= 6;
    }
    return { h, s: p, v: c };
  }
  static rgbToHsl(e, a, r) {
    let o, i, l;
    if (e && a && r)
      o = e, i = a, l = r;
    else if (typeof e == "string") {
      const y = re.parseString(e);
      if (y !== null)
        o = y.r, i = y.g, l = y.b;
      else
        throw "unknown color string";
    } else if (Array.isArray(e))
      o = e[0], i = e[1], l = e[2];
    else if (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b"))
      o = e.r, i = e.g, l = e.b;
    else
      throw "invalid argument";
    const d = Math.max(o, i, l), n = Math.min(o, i, l), f = d - n;
    let h;
    const p = (d + n) / 2;
    let c;
    if (d === n)
      h = 0, c = 0;
    else {
      switch (c = p > 0.5 ? f / (2 - d - n) : f / (d + n), d) {
        case o:
          h = (i - l) / f + (i < l ? 6 : 0);
          break;
        case i:
          h = (l - o) / f + 2;
          break;
        case l:
          h = (o - i) / f + 4;
          break;
      }
      h /= 6;
    }
    return { h, s: c, l: p };
  }
  static hsvToRgb(e, a, r) {
    let o, i, l, d, n, f;
    for (typeof e == "object" ? (d = e.h, n = e.s, f = e.v) : (d = e, n = a, f = r); d < 0; )
      d += 360;
    if (d = d % 360, n === 0)
      return f = Math.round(f), { r: f, g: f, b: f };
    n = n / 255;
    const h = Math.floor(d / 60) % 6, p = d / 60 - h, c = f * (1 - n), y = f * (1 - p * n), u = f * (1 - (1 - p) * n);
    switch (h) {
      case 0:
        o = f, i = u, l = c;
        break;
      case 1:
        o = y, i = f, l = c;
        break;
      case 2:
        o = c, i = f, l = u;
        break;
      case 3:
        o = c, i = y, l = f;
        break;
      case 4:
        o = u, i = c, l = f;
        break;
      case 5:
        o = f, i = c, l = y;
        break;
    }
    return {
      r: Math.round(o),
      g: Math.round(i),
      b: Math.round(l)
    };
  }
  static hslToRgb(e, a, r) {
    let o, i, l, d, n, f;
    if (typeof e == "object" ? (d = e.h, n = e.s, f = e.l) : (d = e, n = a, f = r), n === 0)
      o = i = l = f;
    else {
      const h = (y, u, m) => (m < 0 && (m += 1), m > 1 && (m -= 1), m < 0.16666666666666666 ? y + (u - y) * 6 * m : m < 0.5 ? u : m < 0.6666666666666666 ? y + (u - y) * (0.6666666666666666 - m) * 6 : y), p = f < 0.5 ? f * (1 + n) : f + n - f * n, c = 2 * f - p;
      o = h(c, p, d + 1 / 3), i = h(c, p, d), l = h(c, p, d - 1 / 3);
    }
    return {
      r: Math.round(o * 255),
      g: Math.round(i * 255),
      b: Math.round(l * 255)
    };
  }
  constructor(e, a, r) {
    if (e != null && a != null && r != null)
      this.r = e, this.g = a, this.b = r;
    else if (typeof e == "string") {
      const o = re.parseString(e);
      if (o !== null)
        this.setRGB(o);
      else
        throw "unknown color string";
    } else if (typeof e == "object")
      if (e.r != null && e.g != null && e.b != null)
        this.setRGB(e);
      else if (e.h != null && e.s != null && e.v != null)
        this.setHSV(e);
      else if (e.h != null && e.s != null && e.l != null)
        this.setHSL(e);
      else
        throw "Invalid color space";
    else
      throw "Invalid arugument";
  }
  /**
   * Get an RGB object that represent this color
   */
  toRGB() {
    return {
      r: this.r,
      g: this.g,
      b: this.b
    };
  }
  /**
   * Set the color using the RGB
   */
  setRGB(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  /**
   * Get HSV object
   */
  toHSV() {
    return re.rgbToHsv(this);
  }
  setHSV(e, a, r) {
    this.setRGB(re.hsvToRgb(e, a, r));
  }
  /**
   * Get HSL object
   */
  toHSL() {
    return re.rgbToHsl(this);
  }
  setHSL(e, a, r) {
    this.setRGB(re.hslToRgb(e, a, r));
  }
  /**
   * Get color code
   */
  toHex(e = !0) {
    const a = this.r.toString(16), r = this.g.toString(16), o = this.b.toString(16), i = `0${a}`.slice(-2), l = `0${r}`.slice(-2), d = `0${o}`.slice(-2);
    return e ? `#${i}${l}${d}` : i + l + d;
  }
  /**
   * Get luminance of this color
   */
  luminance(e = 0.2126, a = 0.7152, r = 0.0722) {
    return e * this.r / 255 + a * this.g / 255 + r * this.b / 255;
  }
  contrast(e = 0.43, a, r) {
    return this.luminance() > e ? a || new re(0, 0, 0) : r || new re(255, 255, 255);
  }
  /**
   * Invert this color
   */
  invert() {
    return this.r = 255 - this.r, this.g = 255 - this.g, this.b = 255 - this.b, this;
  }
  /**
   * Clone this instance
   */
  clone() {
    return new re(this);
  }
}
mr.default = re;
(function(t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  const a = u9, r = mr, o = (i) => {
    const l = a(i), d = Math.floor(l() * 255), n = Math.floor(l() * 255), f = Math.floor(l() * 255);
    return new r.default(d, n, f);
  };
  Object.defineProperty(o, "default", { value: o }), t.exports = o, e.default = o;
})(Kt, Kt.exports);
var m9 = Kt.exports;
const k9 = /* @__PURE__ */ pa(m9), Oo = Math.sqrt(1.05 * 0.05) - 0.05, w9 = /^(?:[0-9a-f]{3}){1,2}$/i, ro = {
  black: "#000000",
  white: "#ffffff",
  threshold: Oo
};
function b9(t, e = 2) {
  return (new Array(e).join("0") + t).slice(-e);
}
function Gt(t) {
  if (t.slice(0, 1) === "#" && (t = t.slice(1)), !w9.test(t))
    throw new Error(`Invalid HEX color: "${t}"`);
  return t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), [
    parseInt(t.slice(0, 2), 16),
    parseInt(t.slice(2, 4), 16),
    parseInt(t.slice(4, 6), 16)
    // b
  ];
}
function v9(t) {
  return { r: t[0], g: t[1], b: t[2] };
}
function Xt(t) {
  if (!t)
    throw new Error("Invalid color value");
  return Array.isArray(t) ? t : typeof t == "string" ? Gt(t) : [t.r, t.g, t.b];
}
function z9(t) {
  let e, a;
  const r = [];
  for (e = 0; e < t.length; e++)
    a = t[e] / 255, r[e] = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2];
}
function Qt(t, e, a) {
  const r = e === !0 ? ro : Object.assign({}, ro, e);
  return z9(t) > r.threshold ? a ? Gt(r.black) : r.black : a ? Gt(r.white) : r.white;
}
function Jt(t, e = !1) {
  return t = Xt(t), e ? Qt(t, e) : "#" + t.map((a) => b9((255 - a).toString(16))).join("");
}
(function(t) {
  function e(r, o) {
    r = Xt(r);
    const i = o ? Qt(r, o, !0) : r.map((l) => 255 - l);
    return v9(i);
  }
  t.asRGB = e;
  function a(r, o) {
    return r = Xt(r), o ? Qt(r, o, !0) : r.map((i) => 255 - i);
  }
  t.asRgbArray = a, t.defaultThreshold = Oo, t.asRgbObject = e;
})(Jt || (Jt = {}));
const x9 = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", j9 = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Yt = "numeric", Zt = "ascii", er = "alpha", aa = "asciinumeric", Je = "alphanumeric", ar = "domain", Do = "emoji", C9 = "scheme", E9 = "slashscheme", At = "whitespace";
function S9(t, e) {
  return t in e || (e[t] = []), e[t];
}
function $e(t, e, a) {
  e[Yt] && (e[aa] = !0, e[Je] = !0), e[Zt] && (e[aa] = !0, e[er] = !0), e[aa] && (e[Je] = !0), e[er] && (e[Je] = !0), e[Je] && (e[ar] = !0), e[Do] && (e[ar] = !0);
  for (const r in e) {
    const o = S9(r, a);
    o.indexOf(t) < 0 && o.push(t);
  }
}
function A9(t, e) {
  const a = {};
  for (const r in e)
    e[r].indexOf(t) >= 0 && (a[r] = !0);
  return a;
}
function oe(t = null) {
  this.j = {}, this.jr = [], this.jd = null, this.t = t;
}
oe.groups = {};
oe.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(t) {
    const e = this, a = e.j[t];
    if (a)
      return a;
    for (let r = 0; r < e.jr.length; r++) {
      const o = e.jr[r][0], i = e.jr[r][1];
      if (i && o.test(t))
        return i;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(t, e = !1) {
    return e ? t in this.j : !!this.go(t);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(t, e, a, r) {
    for (let o = 0; o < t.length; o++)
      this.tt(t[o], e, a, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(t, e, a, r) {
    r = r || oe.groups;
    let o;
    return e && e.j ? o = e : (o = new oe(e), a && r && $e(e, a, r)), this.jr.push([t, o]), o;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(t, e, a, r) {
    let o = this;
    const i = t.length;
    if (!i)
      return o;
    for (let l = 0; l < i - 1; l++)
      o = o.tt(t[l]);
    return o.tt(t[i - 1], e, a, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(t, e, a, r) {
    r = r || oe.groups;
    const o = this;
    if (e && e.j)
      return o.j[t] = e, e;
    const i = e;
    let l, d = o.go(t);
    if (d ? (l = new oe(), Object.assign(l.j, d.j), l.jr.push.apply(l.jr, d.jr), l.jd = d.jd, l.t = d.t) : l = new oe(), i) {
      if (r)
        if (l.t && typeof l.t == "string") {
          const n = Object.assign(A9(l.t, r), a);
          $e(i, n, r);
        } else
          a && $e(i, a, r);
      l.t = i;
    }
    return o.j[t] = l, l;
  }
};
const T = (t, e, a, r, o) => t.ta(e, a, r, o), H = (t, e, a, r, o) => t.tr(e, a, r, o), oo = (t, e, a, r, o) => t.ts(e, a, r, o), k = (t, e, a, r, o) => t.tt(e, a, r, o), ge = "WORD", tr = "UWORD", Mo = "ASCIINUMERICAL", Bo = "ALPHANUMERICAL", na = "LOCALHOST", rr = "TLD", or = "UTLD", Sa = "SCHEME", Re = "SLASH_SCHEME", kr = "NUM", sr = "WS", wr = "NL", ta = "OPENBRACE", ra = "CLOSEBRACE", Ia = "OPENBRACKET", qa = "CLOSEBRACKET", Oa = "OPENPAREN", Da = "CLOSEPAREN", Ma = "OPENANGLEBRACKET", Ba = "CLOSEANGLEBRACKET", Na = "FULLWIDTHLEFTPAREN", Ha = "FULLWIDTHRIGHTPAREN", Ua = "LEFTCORNERBRACKET", Va = "RIGHTCORNERBRACKET", Wa = "LEFTWHITECORNERBRACKET", Ka = "RIGHTWHITECORNERBRACKET", Ga = "FULLWIDTHLESSTHAN", Xa = "FULLWIDTHGREATERTHAN", Qa = "AMPERSAND", Ja = "APOSTROPHE", Ya = "ASTERISK", xe = "AT", Za = "BACKSLASH", et = "BACKTICK", at = "CARET", Te = "COLON", br = "COMMA", tt = "DOLLAR", le = "DOT", rt = "EQUALS", vr = "EXCLAMATION", ce = "HYPHEN", oa = "PERCENT", ot = "PIPE", st = "PLUS", ct = "POUND", sa = "QUERY", zr = "QUOTE", No = "FULLWIDTHMIDDLEDOT", xr = "SEMI", de = "SLASH", ca = "TILDE", it = "UNDERSCORE", Ho = "EMOJI", nt = "SYM";
var Uo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ALPHANUMERICAL: Bo,
  AMPERSAND: Qa,
  APOSTROPHE: Ja,
  ASCIINUMERICAL: Mo,
  ASTERISK: Ya,
  AT: xe,
  BACKSLASH: Za,
  BACKTICK: et,
  CARET: at,
  CLOSEANGLEBRACKET: Ba,
  CLOSEBRACE: ra,
  CLOSEBRACKET: qa,
  CLOSEPAREN: Da,
  COLON: Te,
  COMMA: br,
  DOLLAR: tt,
  DOT: le,
  EMOJI: Ho,
  EQUALS: rt,
  EXCLAMATION: vr,
  FULLWIDTHGREATERTHAN: Xa,
  FULLWIDTHLEFTPAREN: Na,
  FULLWIDTHLESSTHAN: Ga,
  FULLWIDTHMIDDLEDOT: No,
  FULLWIDTHRIGHTPAREN: Ha,
  HYPHEN: ce,
  LEFTCORNERBRACKET: Ua,
  LEFTWHITECORNERBRACKET: Wa,
  LOCALHOST: na,
  NL: wr,
  NUM: kr,
  OPENANGLEBRACKET: Ma,
  OPENBRACE: ta,
  OPENBRACKET: Ia,
  OPENPAREN: Oa,
  PERCENT: oa,
  PIPE: ot,
  PLUS: st,
  POUND: ct,
  QUERY: sa,
  QUOTE: zr,
  RIGHTCORNERBRACKET: Va,
  RIGHTWHITECORNERBRACKET: Ka,
  SCHEME: Sa,
  SEMI: xr,
  SLASH: de,
  SLASH_SCHEME: Re,
  SYM: nt,
  TILDE: ca,
  TLD: rr,
  UNDERSCORE: it,
  UTLD: or,
  UWORD: tr,
  WORD: ge,
  WS: sr
});
const he = /[a-z]/, Xe = /\p{L}/u, Lt = /\p{Emoji}/u, ye = /\d/, $t = /\s/, so = "\r", Tt = `
`, L9 = "️", $9 = "‍", Ft = "￼";
let ma = null, ka = null;
function T9(t = []) {
  const e = {};
  oe.groups = e;
  const a = new oe();
  ma == null && (ma = co(x9)), ka == null && (ka = co(j9)), k(a, "'", Ja), k(a, "{", ta), k(a, "}", ra), k(a, "[", Ia), k(a, "]", qa), k(a, "(", Oa), k(a, ")", Da), k(a, "<", Ma), k(a, ">", Ba), k(a, "（", Na), k(a, "）", Ha), k(a, "「", Ua), k(a, "」", Va), k(a, "『", Wa), k(a, "』", Ka), k(a, "＜", Ga), k(a, "＞", Xa), k(a, "&", Qa), k(a, "*", Ya), k(a, "@", xe), k(a, "`", et), k(a, "^", at), k(a, ":", Te), k(a, ",", br), k(a, "$", tt), k(a, ".", le), k(a, "=", rt), k(a, "!", vr), k(a, "-", ce), k(a, "%", oa), k(a, "|", ot), k(a, "+", st), k(a, "#", ct), k(a, "?", sa), k(a, '"', zr), k(a, "/", de), k(a, ";", xr), k(a, "~", ca), k(a, "_", it), k(a, "\\", Za), k(a, "・", No);
  const r = H(a, ye, kr, {
    [Yt]: !0
  });
  H(r, ye, r);
  const o = H(r, he, Mo, {
    [aa]: !0
  }), i = H(r, Xe, Bo, {
    [Je]: !0
  }), l = H(a, he, ge, {
    [Zt]: !0
  });
  H(l, ye, o), H(l, he, l), H(o, ye, o), H(o, he, o);
  const d = H(a, Xe, tr, {
    [er]: !0
  });
  H(d, he), H(d, ye, i), H(d, Xe, d), H(i, ye, i), H(i, he), H(i, Xe, i);
  const n = k(a, Tt, wr, {
    [At]: !0
  }), f = k(a, so, sr, {
    [At]: !0
  }), h = H(a, $t, sr, {
    [At]: !0
  });
  k(a, Ft, h), k(f, Tt, n), k(f, Ft, h), H(f, $t, h), k(h, so), k(h, Tt), H(h, $t, h), k(h, Ft, h);
  const p = H(a, Lt, Ho, {
    [Do]: !0
  });
  k(p, "#"), H(p, Lt, p), k(p, L9, p);
  const c = k(p, $9);
  k(c, "#"), H(c, Lt, p);
  const y = [[he, l], [ye, o]], u = [[he, null], [Xe, d], [ye, i]];
  for (let m = 0; m < ma.length; m++)
    ze(a, ma[m], rr, ge, y);
  for (let m = 0; m < ka.length; m++)
    ze(a, ka[m], or, tr, u);
  $e(rr, {
    tld: !0,
    ascii: !0
  }, e), $e(or, {
    utld: !0,
    alpha: !0
  }, e), ze(a, "file", Sa, ge, y), ze(a, "mailto", Sa, ge, y), ze(a, "http", Re, ge, y), ze(a, "https", Re, ge, y), ze(a, "ftp", Re, ge, y), ze(a, "ftps", Re, ge, y), $e(Sa, {
    scheme: !0,
    ascii: !0
  }, e), $e(Re, {
    slashscheme: !0,
    ascii: !0
  }, e), t = t.sort((m, x) => m[0] > x[0] ? 1 : -1);
  for (let m = 0; m < t.length; m++) {
    const x = t[m][0], b = t[m][1] ? {
      [C9]: !0
    } : {
      [E9]: !0
    };
    x.indexOf("-") >= 0 ? b[ar] = !0 : he.test(x) ? ye.test(x) ? b[aa] = !0 : b[Zt] = !0 : b[Yt] = !0, oo(a, x, x, b);
  }
  return oo(a, "localhost", na, {
    ascii: !0
  }), a.jd = new oe(nt), {
    start: a,
    tokens: Object.assign({
      groups: e
    }, Uo)
  };
}
function Vo(t, e) {
  const a = F9(e.replace(/[A-Z]/g, (d) => d.toLowerCase())), r = a.length, o = [];
  let i = 0, l = 0;
  for (; l < r; ) {
    let d = t, n = null, f = 0, h = null, p = -1, c = -1;
    for (; l < r && (n = d.go(a[l])); )
      d = n, d.accepts() ? (p = 0, c = 0, h = d) : p >= 0 && (p += a[l].length, c++), f += a[l].length, i += a[l].length, l++;
    i -= p, l -= c, f -= p, o.push({
      t: h.t,
      // token type/name
      v: e.slice(i - f, i),
      // string value
      s: i - f,
      // start index
      e: i
      // end index (excluding)
    });
  }
  return o;
}
function F9(t) {
  const e = [], a = t.length;
  let r = 0;
  for (; r < a; ) {
    let o = t.charCodeAt(r), i, l = o < 55296 || o > 56319 || r + 1 === a || (i = t.charCodeAt(r + 1)) < 56320 || i > 57343 ? t[r] : t.slice(r, r + 2);
    e.push(l), r += l.length;
  }
  return e;
}
function ze(t, e, a, r, o) {
  let i;
  const l = e.length;
  for (let d = 0; d < l - 1; d++) {
    const n = e[d];
    t.j[n] ? i = t.j[n] : (i = new oe(r), i.jr = o.slice(), t.j[n] = i), t = i;
  }
  return i = new oe(a), i.jr = o.slice(), t.j[e[l - 1]] = i, i;
}
function co(t) {
  const e = [], a = [];
  let r = 0, o = "0123456789";
  for (; r < t.length; ) {
    let i = 0;
    for (; o.indexOf(t[r + i]) >= 0; )
      i++;
    if (i > 0) {
      e.push(a.join(""));
      for (let l = parseInt(t.substring(r, r + i), 10); l > 0; l--)
        a.pop();
      r += i;
    } else
      a.push(t[r]), r++;
  }
  return e;
}
const la = {
  defaultProtocol: "http",
  events: null,
  format: io,
  formatHref: io,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function jr(t, e = null) {
  let a = Object.assign({}, la);
  t && (a = Object.assign(a, t instanceof jr ? t.o : t));
  const r = a.ignoreTags, o = [];
  for (let i = 0; i < r.length; i++)
    o.push(r[i].toUpperCase());
  this.o = a, e && (this.defaultRender = e), this.ignoreTags = o;
}
jr.prototype = {
  o: la,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(t) {
    return t;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(t) {
    return this.get("validate", t.toString(), t);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(t, e, a) {
    const r = e != null;
    let o = this.o[t];
    return o && (typeof o == "object" ? (o = a.t in o ? o[a.t] : la[t], typeof o == "function" && r && (o = o(e, a))) : typeof o == "function" && r && (o = o(e, a.t, a)), o);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(t, e, a) {
    let r = this.o[t];
    return typeof r == "function" && e != null && (r = r(e, a.t, a)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(t) {
    const e = t.render(this);
    return (this.get("render", null, t) || this.defaultRender)(e, t.t, t);
  }
};
function io(t) {
  return t;
}
function Wo(t, e) {
  this.t = "token", this.v = t, this.tk = e;
}
Wo.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(t) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(t) {
    const e = this.toString(), a = t.get("truncate", e, this), r = t.get("format", e, this);
    return a && r.length > a ? r.substring(0, a) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(t) {
    return t.get("formatHref", this.toHref(t.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(t = la.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(t),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(t) {
    return {
      type: this.t,
      value: this.toFormattedString(t),
      isLink: this.isLink,
      href: this.toFormattedHref(t),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(t) {
    return t.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(t) {
    const e = this, a = this.toHref(t.get("defaultProtocol")), r = t.get("formatHref", a, this), o = t.get("tagName", a, e), i = this.toFormattedString(t), l = {}, d = t.get("className", a, e), n = t.get("target", a, e), f = t.get("rel", a, e), h = t.getObj("attributes", a, e), p = t.getObj("events", a, e);
    return l.href = r, d && (l.class = d), n && (l.target = n), f && (l.rel = f), h && Object.assign(l, h), {
      tagName: o,
      attributes: l,
      content: i,
      eventListeners: p
    };
  }
};
function yt(t, e) {
  class a extends Wo {
    constructor(o, i) {
      super(o, i), this.t = t;
    }
  }
  for (const r in e)
    a.prototype[r] = e[r];
  return a.t = t, a;
}
const P9 = yt("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), no = yt("text"), R9 = yt("nl"), wa = yt("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(t = la.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${t}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const t = this.tk;
    return t.length >= 2 && t[0].t !== na && t[1].t === Te;
  }
}), se = (t) => new oe(t);
function I9({
  groups: t
}) {
  const e = t.domain.concat([Qa, Ya, xe, Za, et, at, tt, rt, ce, kr, oa, ot, st, ct, de, nt, ca, it]), a = [Ja, Te, br, le, vr, oa, sa, zr, xr, Ma, Ba, ta, ra, qa, Ia, Oa, Da, Na, Ha, Ua, Va, Wa, Ka, Ga, Xa], r = [Qa, Ja, Ya, Za, et, at, tt, rt, ce, ta, ra, oa, ot, st, ct, sa, de, nt, ca, it], o = se(), i = k(o, ca);
  T(i, r, i), T(i, t.domain, i);
  const l = se(), d = se(), n = se();
  T(o, t.domain, l), T(o, t.scheme, d), T(o, t.slashscheme, n), T(l, r, i), T(l, t.domain, l);
  const f = k(l, xe);
  k(i, xe, f), k(d, xe, f), k(n, xe, f);
  const h = k(i, le);
  T(h, r, i), T(h, t.domain, i);
  const p = se();
  T(f, t.domain, p), T(p, t.domain, p);
  const c = k(p, le);
  T(c, t.domain, p);
  const y = se(P9);
  T(c, t.tld, y), T(c, t.utld, y), k(f, na, y);
  const u = k(p, ce);
  k(u, ce, u), T(u, t.domain, p), T(y, t.domain, p), k(y, le, c), k(y, ce, u);
  const m = k(l, ce), x = k(l, le);
  k(m, ce, m), T(m, t.domain, l), T(x, r, i), T(x, t.domain, l);
  const j = se(wa);
  T(x, t.tld, j), T(x, t.utld, j), T(j, t.domain, l), T(j, r, i), k(j, le, x), k(j, ce, m), k(j, xe, f);
  const b = k(j, Te), E = se(wa);
  T(b, t.numeric, E);
  const w = se(wa), g = se();
  T(w, e, w), T(w, a, g), T(g, e, w), T(g, a, g), k(j, de, w), k(E, de, w);
  const s = k(d, Te), _ = k(n, Te), v = k(_, de), $ = k(v, de);
  T(d, t.domain, l), k(d, le, x), k(d, ce, m), T(n, t.domain, l), k(n, le, x), k(n, ce, m), T(s, t.domain, w), k(s, de, w), k(s, sa, w), T($, t.domain, w), T($, e, w), k($, de, w);
  const C = [
    [ta, ra],
    // {}
    [Ia, qa],
    // []
    [Oa, Da],
    // ()
    [Ma, Ba],
    // <>
    [Na, Ha],
    // （）
    [Ua, Va],
    // 「」
    [Wa, Ka],
    // 『』
    [Ga, Xa]
    // ＜＞
  ];
  for (let F = 0; F < C.length; F++) {
    const [q, A] = C[F], O = k(w, q);
    k(g, q, O);
    const D = se(wa);
    T(O, e, D);
    const K = se();
    T(O, a, K), k(O, A, w), T(D, e, D), T(D, a, K), T(K, e, D), T(K, a, K), k(D, A, w), k(K, A, w);
  }
  return k(o, na, j), k(o, wr, R9), {
    start: o,
    tokens: Uo
  };
}
function q9(t, e, a) {
  let r = a.length, o = 0, i = [], l = [];
  for (; o < r; ) {
    let d = t, n = null, f = null, h = 0, p = null, c = -1;
    for (; o < r && !(n = d.go(a[o].t)); )
      l.push(a[o++]);
    for (; o < r && (f = n || d.go(a[o].t)); )
      n = null, d = f, d.accepts() ? (c = 0, p = d) : c >= 0 && c++, o++, h++;
    if (c < 0)
      o -= h, o < r && (l.push(a[o]), o++);
    else {
      l.length > 0 && (i.push(Pt(no, e, l)), l = []), o -= c, h -= c;
      const y = p.t, u = a.slice(o - h, o);
      i.push(Pt(y, e, u));
    }
  }
  return l.length > 0 && i.push(Pt(no, e, l)), i;
}
function Pt(t, e, a) {
  const r = a[0].s, o = a[a.length - 1].e, i = e.slice(r, o);
  return new t(i, a);
}
const Z = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function O9() {
  Z.scanner = T9(Z.customSchemes);
  for (let t = 0; t < Z.tokenQueue.length; t++)
    Z.tokenQueue[t][1]({
      scanner: Z.scanner
    });
  Z.parser = I9(Z.scanner.tokens);
  for (let t = 0; t < Z.pluginQueue.length; t++)
    Z.pluginQueue[t][1]({
      scanner: Z.scanner,
      parser: Z.parser
    });
  return Z.initialized = !0, Z;
}
function Cr(t) {
  return Z.initialized || O9(), q9(Z.parser.start, t, Vo(Z.scanner.start, t));
}
Cr.scan = Vo;
function iS(t, e = null) {
  const a = Cr(t);
  return a.length === 1 && a[0].isLink && (!e || a[0].t === e);
}
function Ko(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function D9(t) {
  return t.replace(/"/g, "&quot;");
}
function M9(t) {
  const e = [];
  for (const a in t) {
    let r = t[a] + "";
    e.push(`${a}="${D9(r)}"`);
  }
  return e.join(" ");
}
function B9({
  tagName: t,
  attributes: e,
  content: a
}) {
  return `<${t} ${M9(e)}>${Ko(a)}</${t}>`;
}
function Go(t, e = {}) {
  e = new jr(e, B9);
  const a = Cr(t), r = [];
  for (let o = 0; o < a.length; o++) {
    const i = a[o];
    i.t === "nl" && e.get("nl2br") ? r.push(`<br>
`) : !i.isLink || !e.check(i) ? r.push(Ko(i.toString())) : r.push(e.render(i));
  }
  return r.join("");
}
String.prototype.linkify || Object.defineProperty(String.prototype, "linkify", {
  writable: !1,
  value: function(e) {
    return Go(this, e);
  }
});
const W = class W {
  /**
   * Fetch and group comments
   * 
   * @param params Query parameters
   * @returns Comments grouped by thread ID
   */
  static async getComments(e) {
    const { docmodel: a, docid: r, docattribute: o, threadid: i, project: l, skipCacheUpdateIfFound: d } = e;
    if (!a || !r || !o)
      return {};
    const n = await ve._Model.get(W.modelName), f = await (n == null ? void 0 : n.list({
      skipCacheUpdateIfFound: d,
      conditions: [
        ["docmodel_fk", "=", a],
        ["docid", "=", r],
        ["docattribute", "=", o],
        ...i ? [["threadid", "=", i]] : [],
        ...l ? [["project_fk", "=", l]] : []
      ]
    })) ?? [];
    return f.reverse(), Object.groupBy(f, (p) => p.threadid.value);
  }
  /**
   * Show comments modal
   * 
   * @param params Query parameters and options
   */
  static async showComments(e) {
    const {
      docmodel: a,
      docid: r,
      docattribute: o,
      threadid: i,
      project: l,
      defaultRecipient: d,
      docLink: n,
      techDocLink: f,
      basePath: h = "/",
      onOpen: p,
      onClose: c,
      getResourceLink: y
    } = e;
    if (!a || !r || !o)
      return;
    async function u(N) {
      try {
        const { threadid: ae, contentInput: Ne, recipientSelect: be, deadlineSelect: Y, deadlineTime: fa, images: Ee, onDone: Se } = N;
        if (!Ne.value && (!Ee || Ee.length === 0)) {
          alert("Missing comment!");
          return;
        }
        if (Array.isArray(F) && C && !F.find((I) => I.id === C.id))
          throw new Error("You don't have permissions!");
        var te = null;
        be && be.value !== "none" && (te = be.value);
        var S = null;
        if (Y && Y.value !== "none") {
          if (S = /* @__PURE__ */ new Date(), Y.value === "asap")
            S.setMinutes(S.getMinutes() + 10);
          else if (Y.value === "1h")
            S.setHours(S.getHours() + 1);
          else if (Y.value === "dayend")
            S.setHours(23, 59, 59);
          else if (Y.value === "24h")
            S.setDate(S.getDate() + 1);
          else if (Y.value === "weekend") {
            const I = S.getDay();
            I === 6 ? S.setDate(S.getDate() + 6) : S.setDate(S.getDate() - I + 5), S.setHours(23, 59, 59);
          } else if (Y.value === "monday-evening") {
            const I = S.getDay();
            I === 0 ? S.setDate(S.getDate() + 1) : I === 6 && S.setDate(S.getDate() + 2), S.setHours(23, 59, 59);
          } else if (Y.value === "1w")
            S.setDate(S.getDate() + 7);
          else if (Y.value === "monthend")
            S.setMonth(S.getMonth() + 1), S.setDate(0), S.setHours(23, 59, 59);
          else if (Y.value === "1m")
            S.setMonth(S.getMonth() + 1);
          else if (Y.value === "custom" && fa) {
            const I = new Date(fa.value);
            if (I < S) {
              alert("Wrong deadline!");
              return;
            }
            S = I;
          }
        }
        const He = Go(
          e9(Ne.value || ""),
          { defaultProtocol: "https" }
        ).replaceAll(`
`, "<br/>");
        let ha = "";
        if (Ee && Ee.length > 0)
          for (const I of Ee) {
            const ne = await ve.uploader(I);
            if (ne && ne.base && ne.sd && ne.hd) {
              const ya = ne.base + ne.sd.substring(1), Ue = ne.base + ne.hd.substring(1);
              ha += `<img src="${ya}" data-hd="${Ue}" />`;
            }
          }
        const M = await ve._Model.get(W.modelName).then((I) => I == null ? void 0 : I.add({
          docmodel_fk: a,
          docid: r,
          docattribute: o,
          threadid: ae,
          content: (He ? `<p>${He}</p>` : "") + ha,
          repliedto: !1,
          read: !1,
          _publishingdate: /* @__PURE__ */ new Date(),
          ...l ? { project_fk: l } : {},
          ...S ? { deadline: S } : {},
          ...te ? { recipient: te } : {}
        }));
        Se && M && await Se(M._blitzID.value), A && M && (A[ae] || (A[ae] = []), A[ae].push(M), j(), await W.placeComments({ ...q, skipCacheUpdateIfFound: !0 }));
      } catch (ae) {
        alert("Error: " + ae.message);
      }
    }
    async function m() {
      for (const N in A)
        if (Array.isArray(A[N]))
          for (const te of A[N])
            te.recipient.value === C.id && te.read.value !== !0 && await te.edit("read", !0);
    }
    function x(N, te) {
      let S = null;
      for (const ae of Sr.children)
        if ((ae == null ? void 0 : ae.getAttribute("id")) === N) {
          S = ae, S.style.display = "block", S.style.marginTop = "0", S.style.marginBottom = "0", S.tagName === "PRE" && (S.innerText = es(S.innerText));
          break;
        }
      return S ? `<div class="content ${te || ""}" style="border-radius: 4px; border: 2px dashed grey; user-select: none;">
                    <div style="padding: 8px; overflow: auto; max-height: 160px !important;">
                        ${S.outerHTML}
                    </div>
                </div>` : "";
    }
    function j(N) {
      var Tr, Fr;
      if (!A)
        throw new Error("Could not fetch comments!");
      let te = !1, S = [];
      const ae = document.getElementById("bdcomments-addform");
      ae && ae.remove();
      const Ne = document.getElementById("bdcomments-docs");
      Ne && Ne.remove();
      let be = null;
      if (d && (D || !A[i]))
        be = d;
      else if (!D && A[i]) {
        let z = null;
        if (C) {
          const R = [...A[i]];
          R.reverse(), z = R.find((B) => B._userID.value !== C.id && B.recipient.value === C.id && B.repliedto.value !== !0) ?? null, z || (z = R.find((B) => B._userID.value !== C.id) ?? null);
        }
        z ? be = z._userID.value : d && (be = d);
      }
      const Y = Object.keys(A);
      if (v.innerHTML = Y.length === 0 ? `
                <p style="color: grey; text-align: center;">No comments yet!</p>
            ` : Y.map((z) => {
        const R = A[z], B = D && gt ? x(z, "mb-3") : "", U = D && Array.isArray(F) ? R.filter((P) => !!P.deadline.value && P.recipient.value === C.id && P.repliedto.value !== !0).length > 0 : !1;
        return `<div class="box" thread-id="${z}">
                    ${B}
                    ${R.map((P) => {
          var Pr, Rr;
          const V = P.deadline.value, J = F && P._userID.value ? (Pr = F.find((bt) => bt.id === P._userID.value)) == null ? void 0 : Pr.username : null, G = F && P.recipient.value ? (Rr = F.find((bt) => bt.id === P.recipient.value)) == null ? void 0 : Rr.username : null, X = J ? k9(J).toHex() : null, kt = X ? Jt(X, !0) : null, Ae = to(P.content.value), wt = h + "user/:id";
          return `<div class="media" style="display: flex; overflow-y: auto;">
                            <div class="media-left" style="margin-inline-end: 10px; display: flex; flex-direction: column; align-items: center; gap: 6px;">
                                ${J ? `
                                    <a href="${wt.replace(":id", P._userID.value)}">
                                        <div style="background-color: ${X}; color: ${kt}; min-width: 36px; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                            ${J.substring(0, 2).toUpperCase()}
                                        </div>
                                    </a>
                                ` : ""}
                                <div id="delete-btn" comment-id="${P._blitzID.value}" style="cursor: pointer;">
                                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" />
                                    </svg>
                                </div>
                            </div>
                            <div class="media-content" style="flex-grow: 1;">
                                <p style="font-size: 12px;">
                                    <b>Published:</b> ${P._publishingdate.value || "/"}
                                </p>
                                ${V ? `<p style="font-size: 12px;">
                                    <b>Deadline:</b> ${V}
                                </p>` : ""}
                                ${J || G ? `<p style="font-size: 12px;">
                                    ${J ? `
                                        <b>User:</b>
                                        <a href="${wt.replace(":id", P._userID.value)}" style="color: inherit; text-decoration: underline;">
                                            ${J}
                                        </a>
                                    ` : ""}
                                    ${J && G ? "<span>&nbsp;→&nbsp;</span>" : ""}
                                    ${G ? `
                                        <b>Recipient:</b>
                                        <a href="${wt.replace(":id", P.recipient.value)}" style="color: inherit; text-decoration: underline;">
                                            ${G}
                                        </a>
                                    ` : ""}
                                </p>` : ""}
                                ${Ae}
                            </div>
                        </div>`;
        }).join("")}
                    ${D ? `
                        <div style="display: flex; gap: 8px; overflow-x: auto;">
                            <input id="content-input" class="input" type="text" placeholder="Enter reply..." style="min-width: 120px;" />
                            <button id="save-btn" class="button is-primary">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" />
                                </svg>
                            </button>
                        </div>
                        ${U ? `<label id="repliedto-input" class="checkbox" style="margin: 4px 0 0 4px;">
                            <input checked type="checkbox" />
                            <span>Reply complete</span>
                        </label>` : ""}
                    ` : ""}
                </div>`;
      }).join(""), Y.length > 0)
        for (const z of v.children) {
          const R = z.getAttribute("thread-id"), B = z.querySelectorAll("#delete-btn");
          for (const [U, P] of B.entries())
            P.addEventListener("click", async () => {
              if (confirm("Are you sure?")) {
                const V = await ve._Model.get(W.modelName);
                if (U === 0) {
                  for (const J of B) {
                    const G = J.getAttribute("comment-id"), X = await (V == null ? void 0 : V.get(G));
                    await (X == null ? void 0 : X.delete());
                  }
                  delete A[R];
                } else {
                  const J = P.getAttribute("comment-id"), G = await (V == null ? void 0 : V.get(J));
                  await (G == null ? void 0 : G.delete()), A[R] = A[R].filter((X) => X._blitzID.value !== J);
                }
                j(), await W.placeComments({ ...q, skipCacheUpdateIfFound: !0 });
              }
            });
          if (D) {
            let U = null;
            if (C) {
              const G = [...A[R]];
              G.reverse(), U = ((Tr = G.find((X) => X._userID.value !== C.id && X.recipient.value === C.id && X.repliedto.value !== !0)) == null ? void 0 : Tr._userID.value) ?? null, U || (U = ((Fr = G.find((X) => X._userID.value !== C.id)) == null ? void 0 : Fr._userID.value) ?? null);
            }
            const P = z.querySelector("#content-input"), V = z.querySelector("#repliedto-input"), J = z.querySelector("#save-btn");
            J.onclick = () => u({
              threadid: R,
              contentInput: P,
              recipientSelect: { value: U ?? "none" },
              onDone: async (G) => {
                var X;
                if (C && V && ((X = V.querySelector("input")) != null && X.checked)) {
                  const kt = A[R].filter((Ae) => Ae._blitzID.value !== G && Ae.recipient.value === C.id && Ae.repliedto.value !== !0);
                  for (const Ae of kt)
                    await Ae.edit("repliedto", !0);
                }
              }
            }), P.onkeyup = (G) => G.key === "Enter" && J.onclick ? J.onclick({}) : void 0;
          }
        }
      const fa = !D && Array.isArray(F) && (A[i] ?? []).filter((z) => !!z.deadline.value && z.recipient.value === C.id && z.repliedto.value !== !0).length > 0, Ee = Ir(/* @__PURE__ */ new Date(), !0), Se = /* @__PURE__ */ new Date(), He = Se.getDay();
      Se.setFullYear(Se.getFullYear() + 1);
      const ha = Ir(Se, !0), M = document.createElement("div");
      M.id = "bdcomments-addform", M.className = "box mt-5", M.style.display = "flex", M.style.flexDirection = "column", M.style.gap = "12px", (n || f) && (M.style.marginBottom = "18px"), M.innerHTML = `
                <div id="emoji-quick-btns" style="display: flex; gap: 8px; overflow-y: auto;">
                    <button class="button" style="flex: 1; padding: 8px 4px;">✔️</button>
                    <button class="button" style="flex: 1; padding: 8px 4px;">👍️</button>
                    <button class="button" style="flex: 1; padding: 8px 4px;">😃</button>
                    <button class="button" style="flex: 1; padding: 8px 4px;">🙃</button>
                    <button class="button" style="flex: 1; padding: 8px 4px;">😮</button>
                    <button class="button" style="flex: 1; padding: 8px 4px;">🤨</button>
                    <button class="button" style="flex: 1; padding: 8px 4px;">😅</button>
                    <button class="button" style="flex: 1; padding: 8px 4px;">😂</button>
                </div>
                <div style="display: flex; gap: 8px;">
                    <textarea id="content-input" class="input" placeholder="New comment..." rows="2"
                        style="resize: vertical; min-height: fit-content;">${N ? N.replace(/\"/g, "&quot;") : ""}</textarea>
                    <button id="emoji-btn" class="button" style="width: 40px;">🙂</button>
                </div>
                <div style="display: flex; gap: 0 8px; flex-wrap: wrap;">
                    <label for="deadline-select" style="line-height: 40px;">Deadline</label>
                    <div style="flex: 1; width: 100%; display: flex; flex-direction: column; gap: 8px;">
                        <div class="select">
                            <select id="deadline-select" style="width: 100%;">
                                <option value="none">No reply expected</option>
                                <option value="asap">Asap</option>
                                <option value="1h">1h</option>
                                <option value="dayend">End of the day</option>
                                <option value="24h">24h</option>
                                <option value="weekend">End of the week</option>
                                ${He === 0 || He === 6 ? '<option value="monday-evening">Monday evening</option>' : ""}
                                <option value="1w">1 week</option>
                                <option value="monthend">End of the month</option>
                                <option value="1m">1 month</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                        <input id="deadline-time" class="input" type="datetime-local" value="${ha}" min="${Ee}"
                            style="display: none;" />
                    </div>
                </div>
                ${Array.isArray(F) ? `<div style="display: flex; gap: 0 8px; flex-wrap: wrap;">
                    <label for="recipient-select" style="line-height: 40px;">Recipient</label>
                    <div class="select" style="flex: 1;">
                        <select id="recipient-select" style="width: 100%;">
                            <option value="none">None</option>
                            ${F.map((z) => `<option value="${z.id}" ${be == z.id ? 'selected="true"' : ""}>
                                ${z.username}
                            </option>`)}
                        </select>
                    </div>
                </div>` : ""}
                ${fa ? `<label id="repliedto-input" class="checkbox">
                    <input checked type="checkbox" />
                    <span>Reply complete</span>
                </label>` : ""}
                <div style="display: flex; justify-content: flex-end; align-items: flex-start; gap: 8px;">
                    <div id="images-preview" style="display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 4px;"></div>
                    <button id="images-upload-btn" class="button is-link">
                        <span class="blitzicon icon">&#xe80e;</span>
                        <span class="button-label">Images</span>
                    </button>
                    <button id="save-btn" class="button is-primary">
                        Send
                    </button>
                </div>
            `;
      const I = M.querySelector("#content-input"), ne = M.querySelector("#recipient-select"), ya = M.querySelector("#repliedto-input"), Ue = M.querySelector("#deadline-select"), _t = M.querySelector("#deadline-time"), ut = M.querySelector("#save-btn"), Xo = M.querySelector("#images-upload-btn"), Ar = M.querySelector("#images-preview"), Qo = M.querySelectorAll("#emoji-quick-btns button"), Lr = M.querySelector("#emoji-btn");
      let Ve = null;
      const Jo = () => {
        if (Ve)
          return Ve;
        try {
          Ve = Mi({ showPreview: !1 }, { referenceElement: Lr, position: "left", className: "emoji-picker" }), Ve.addEventListener("emoji:select", (z) => {
            if (!I)
              return;
            const R = I.selectionStart ?? 0, B = I.value.substring(0, R), U = I.value.substring(R, I.value.length);
            I.value = B + z.emoji + U, I.onchange && I.onchange({ target: I });
          });
        } catch (z) {
          console.warn("BDComments: emoji picker unavailable —", (z == null ? void 0 : z.message) ?? z);
        }
        return Ve;
      }, mt = () => {
        Ar.innerHTML = "", S.forEach((z, R) => {
          const B = document.createElement("div");
          B.style.position = "relative";
          const U = document.createElement("div");
          U.style.cssText = `width: 40px; height: 40px; background-image: url('${z.preview}'); background-size: cover; background-position: center; border-radius: 4px; border: 1px solid #dbdbdb;`;
          const P = document.createElement("div");
          P.className = "has-background-danger is-clickable", P.style.cssText = "position: absolute; top: -6px; right: -6px; border-radius: 50%; display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; z-index: 1;", P.innerHTML = '<span class="blitzicon icon" style="font-size: 0.8rem;">&#xe800;</span>', P.onclick = (V) => {
            V.stopPropagation(), S.splice(R, 1), mt();
          }, B.appendChild(U), B.appendChild(P), Ar.appendChild(B);
        });
      }, $r = async (z) => {
        if (te)
          return;
        te = !0, ut.classList.add("is-loading");
        const R = i || self.crypto.randomUUID();
        await u({
          threadid: R,
          contentInput: z ? { value: z } : I,
          recipientSelect: ne,
          deadlineSelect: Ue,
          deadlineTime: _t,
          images: S.map((B) => B.file),
          onDone: async (B) => {
            var U;
            if (C && ya && ((U = ya.querySelector("input")) != null && U.checked)) {
              const P = A[R].filter((V) => V._blitzID.value !== B && V.recipient.value === C.id && V.repliedto.value !== !0);
              for (const V of P)
                await V.edit("repliedto", !0);
            }
            localStorage.removeItem(K);
          }
        }), te = !1, ut.classList.remove("is-loading");
      };
      ut.onclick = () => $r(), I.onchange = (z) => {
        localStorage.setItem(K, z.target.value);
      }, I.onpaste = (z) => {
        var B;
        const R = ((B = z.clipboardData) == null ? void 0 : B.items) ?? [];
        for (const U of R)
          if (U.kind === "file" && U.type.startsWith("image/")) {
            const P = U.getAsFile();
            if (P) {
              z.preventDefault(), S.push({ file: P, preview: URL.createObjectURL(P) }), mt();
              break;
            }
          }
      }, Ue && _t && (Ue.onchange = (z) => _t.style.display = z.target.value === "custom" ? "block" : "none"), Lr.onclick = () => {
        var z;
        try {
          (z = Jo()) == null || z.toggle();
        } catch (R) {
          console.warn("BDComments: emoji picker unavailable —", (R == null ? void 0 : R.message) ?? R);
        }
      };
      for (const z of Qo)
        z.addEventListener("click", () => $r(z.innerHTML));
      if (Xo.onclick = async () => {
        const z = await as(!0);
        S.push(
          ...(z ?? []).map((R) => ({
            file: R,
            preview: URL.createObjectURL(R)
          }))
        ), mt();
      }, v.after(M), n || f) {
        const z = document.createElement("div");
        z.id = "bdcomments-docs", z.style.display = "flex", z.style.justifyContent = "center", z.style.gap = "8px", z.innerHTML = (n ? `<a target="_blank" href="${n}" class="has-text-link"><span class="blitzicon">&#xe90f;</span> User documentation</a>` : "") + (f ? `<a target="_blank" href="${f}" class="has-text-link"><span class="blitzicon">&#xe910;</span> Tech documentation</a>` : ""), M.after(z);
      }
    }
    const b = document.createElement("div");
    b.className = W.modalClass, b.style.position = "fixed", b.style.top = "0", b.style.left = "0", b.style.width = "100%", b.style.height = "100%", b.style.zIndex = "100", b.style.backgroundColor = "rgba(0, 0, 0, 0.7)", b.style.display = "flex", b.style.justifyContent = "center", b.style.alignItems = "center", b.style.padding = "16px", b.style.boxSizing = "border-box";
    const E = document.createElement("div");
    E.style.position = "relative", E.style.width = "500px", E.style.maxHeight = "100%", E.style.backgroundColor = "#ffffff", E.style.color = "#000000", E.style.borderRadius = "8px", E.style.padding = "24px", E.style.overflow = "auto", E.style.boxSizing = "inherit", E.style.display = "flex", E.style.flexDirection = "column", E.onclick = (N) => N.stopPropagation();
    const w = document.createElement("style");
    w.innerHTML = `
            body::-webkit-scrollbar {
                display: none;
            }
            .emoji-picker {
                z-index: 200;
            }
            .picmo__popupContainer .picmo__closeButton {
                z-index: 201;
            }
            .${W.modalClass} #comments-list .media-content img {
                max-width: 100%;
                height: auto;
            }
            @media screen and (max-width: 600px) {
                .${W.modalClass} {
                    padding: 0 !important;
                }
                .${W.modalClass} > div {
                    width: 100% !important;
                    height: 100% !important;
                    border-radius: 0 !important;
                }
                .${W.modalClass} #emoji-btn {
                    display: none;
                }
            }
            @media screen and (max-width: 400px) {
                .${W.modalClass} #bdcomments-docs {
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
            }
        `, E.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
                <h2 style="font-size: 24px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Comments</h2>
                <div id="close-btn" style="font-size: 28px; line-height: 1; cursor: pointer;">&times;</div>
            </div>
            <div id="resource-link"></div>
            <div id="block-preview"></div>
            <div id="comments-list" class="mt-4" style="flex: 1;">
                <style>@keyframes loading-spinner { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
                <div style="margin: auto; width: 60px; height: 60px; border-radius: 50%; border-width: 5px; border-style: double; border-color: #000000 transparent; animation: loading-spinner 1.2s linear infinite;"></div>
            </div>
        `;
    const g = E.querySelector("#close-btn"), s = E.querySelector("#resource-link"), _ = E.querySelector("#block-preview"), v = E.querySelector("#comments-list"), $ = () => {
      b.remove(), c && c();
    };
    b.onclick = $, g.onclick = $, b.append(w), b.append(E), document.body.append(b);
    const C = await ve.getCurrentUser(), F = l ? await ve.listProjectUsers(l) : null, q = { docmodel: a, docid: r, docattribute: o, project: l, defaultRecipient: d, onOpen: p }, A = await W.getComments({ ...q, threadid: i }), O = await ve._Model.get(a).then((N) => N == null ? void 0 : N.get(r)), D = !i, K = `BDCOMMENTS_LAST_${r}` + (i ? `_${i}` : ""), gt = O == null ? void 0 : O[o].value, Er = !D && i.length === 10 && !!gt, Sr = document.createElement("div");
    if (Sr.innerHTML = gt || "", Er && (_.innerHTML = x(i)), O && y) {
      const N = await y(O);
      N && (s.className = "has-text-centered" + (Er ? " mb-4" : ""), s.innerHTML = `<a target="_blank" href="${N.path}" class="has-text-link">
                    <span class="blitzicon">&#xe80b;</span> ${N.label}
                </a>`);
    }
    try {
      j(localStorage.getItem(K)), m();
    } catch (N) {
      N.stack && console.error(N.stack), v.innerHTML = `<p style="color: red; text-align: center;"><b>Error:</b> ${N.message}</p>`;
    }
  }
  /**
   * Hide comments modal
   */
  static hideComments() {
    const e = document.querySelector("." + W.modalClass);
    e && e.remove();
  }
  /**
   * Place comment buttons on each editor block
   * 
   * @param params Query parameters
   */
  static async placeComments(e) {
    try {
      const a = document.getElementById(`editor-${e.docid}-${e.docattribute}`);
      if (!a)
        return;
      const r = await W.getComments(e), o = await ve.getCurrentUser(), i = a.querySelectorAll(".bdcomments-button");
      for (const f of i)
        f.remove();
      const l = /^<p>:[a-z0-9_+-]+:<\/p>$/, d = a.getAttribute("data-readonly") === "true", n = a.querySelectorAll(".ce-block");
      for (const f of n) {
        const h = f.querySelector(".ce-block__content"), p = f.getAttribute("data-id");
        if (h && p) {
          const c = r[p] ?? [], y = c.length > 0, u = y && l.test(c[0].content.value), m = document.createElement("div");
          if (!y && d)
            f.addEventListener("mouseenter", () => m.style.display = "flex"), f.addEventListener("mouseleave", () => m.style.display = "none");
          else if (!y)
            continue;
          const x = c.every((b) => b.recipient.value !== o.id || b.read.value === !0 && (!b.deadline.value || b.repliedto.value === !0)), j = c.some((b) => b.recipient.value === o.id && b.read.value === !0 && !!b.deadline.value && b.repliedto.value !== !0);
          m.className = "bdcomments-button ce-toolbar__settings-btn", m.style.cssText = "position: absolute; top: 5px; right: -22px; margin-left: 0px; z-index: 100; cursor: pointer;", m.style.display = y ? "flex" : "none", m.innerHTML = `
                        ${u ? to(c[0].content.value) : `<svg width="24px" height="24px" fill="none" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M5.5 12C5.49988 14.613 6.95512 17.0085 9.2741 18.2127C11.5931 19.4169 14.3897 19.2292 16.527 17.726L19.5 18V12C19.5 8.13401 16.366 5 12.5 5C8.63401 5 5.5 8.13401 5.5 12Z" />
                            <path fill="#000000" d="M9.5 13.25C9.08579 13.25 8.75 13.5858 8.75 14C8.75 14.4142 9.08579 14.75 9.5 14.75V13.25ZM13.5 14.75C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25V14.75ZM9.5 10.25C9.08579 10.25 8.75 10.5858 8.75 11C8.75 11.4142 9.08579 11.75 9.5 11.75V10.25ZM15.5 11.75C15.9142 11.75 16.25 11.4142 16.25 11C16.25 10.5858 15.9142 10.25 15.5 10.25V11.75ZM9.5 14.75H13.5V13.25H9.5V14.75ZM9.5 11.75H15.5V10.25H9.5V11.75Z" />
                        </svg>`}
                        ${y && (!u || c.length > 1) ? `
                            <span style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; text-align: center; border-radius: 50%; font-size: 8px; color: white; background-color: ${x ? "black" : j ? "orange" : "red"};">
                                ${c.length}
                            </span>
                        ` : ""}
                    `, m.onclick = () => {
            e.onOpen ? e.onOpen({ ...e, threadid: p }) : W.showComments({ ...e, threadid: p });
          }, h.prepend(m);
        }
      }
    } catch (a) {
      console.error("BDComments plugin:", a.message);
    }
  }
};
/**
 * Properties
 */
vt(W, "modelName", "bdt23vuxw4b_blitzpmcomment2"), vt(W, "modalClass", "bdcomments-listmodal");
let cr = W;
const nS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cr
}, Symbol.toStringTag, { value: "Module" }));
export {
  cr as B,
  jr as O,
  iS as a,
  pa as b,
  to as c,
  es as d,
  U9 as e,
  nS as f,
  Bi as g,
  Cr as t,
  e9 as u
};
