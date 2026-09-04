var es = Object.defineProperty;
var as = (t, e, a) => e in t ? es(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var vt = (t, e, a) => (as(t, typeof e != "symbol" ? e + "" : e, a), a);
import { B as ze } from "./index-11343ee8.js";
function qr(t, e) {
  if (!t || t === "0000-00-00 00:00:00")
    return null;
  const a = new Date(t);
  a.setMinutes(a.getMinutes() - a.getTimezoneOffset());
  const r = a.toISOString();
  return e ? r.substring(0, 10) + " " + r.substring(11, 19) : r.substring(0, 10);
}
function V9(t) {
  return t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/&/g, "&amp;");
}
function ts(t) {
  return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}
function rs(t) {
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
}, me = (t, e, a) => (ir(t, e, "read from private field"), a ? a.call(t) : e.get(t)), ue = (t, e, a) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, a);
}, Rt = (t, e, a, r) => (ir(t, e, "write to private field"), r ? r.call(t, a) : e.set(t, a), a), ie = (t, e, a) => (ir(t, e, "access private method"), a);
const os = "14.0";
function ss(t, e, a) {
  let r = `https://cdn.jsdelivr.net/npm/emojibase-data@${e}/${t}`;
  return typeof a == "function" ? r = a(t, e) : typeof a == "string" && (r = `${a}/${t}`), r;
}
async function nr(t, e = {}) {
  const {
    local: a = !1,
    version: r = "latest",
    cdnUrl: s,
    ...i
  } = e, l = ss(t, r, s), d = a ? localStorage : sessionStorage, n = `emojibase/${r}/${t}`, f = d.getItem(n);
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
const cs = {
  discord: "joypixels",
  slack: "iamcal"
};
async function Or(t, e, a) {
  var r;
  return nr(`${t}/shortcodes/${(r = cs[e]) !== null && r !== void 0 ? r : e}.json`, a);
}
function ea(t, e) {
  if (e.length === 0)
    return t;
  const a = new Set(t.shortcodes);
  return e.forEach((r) => {
    const s = r[t.hexcode];
    Array.isArray(s) ? s.forEach((i) => a.add(i)) : s && a.add(s);
  }), t.shortcodes = [...a], t.skins && t.skins.forEach((r) => {
    ea(r, e);
  }), t;
}
function is(t, e = []) {
  const a = [];
  return t.forEach((r) => {
    if (r.skins) {
      const {
        skins: s,
        ...i
      } = r;
      a.push(ea(i, e)), s.forEach((l) => {
        const d = {
          ...l
        };
        i.tags && (d.tags = [...i.tags]), a.push(ea(d, e));
      });
    } else
      a.push(ea(r, e));
  }), a;
}
function ns(t, e) {
  return e.length === 0 || t.forEach((a) => {
    ea(a, e);
  }), t;
}
async function fo(t, e = {}) {
  const {
    compact: a = !1,
    flat: r = !1,
    shortcodes: s = [],
    ...i
  } = e, l = await nr(`${t}/${a ? "compact" : "data"}.json`, i);
  let d = [];
  return s.length > 0 && (d = await Promise.all(s.map((n) => {
    let f;
    if (n.includes("/")) {
      const [h, p] = n.split("/");
      f = Or(h, p, i);
    } else
      f = Or(t, n, i);
    return f.catch(() => ({}));
  }))), r ? is(l, d) : ns(l, d);
}
async function ho(t, e) {
  return nr(`${t}/messages.json`, e);
}
function zt(t, e) {
  const a = t.target.closest("[data-emoji]");
  if (a) {
    const r = e.find((s) => s.emoji === a.dataset.emoji);
    if (r)
      return r;
  }
  return null;
}
function yo(t) {
  var e;
  const a = (e = window.matchMedia) == null ? void 0 : e.call(window, "(prefers-reduced-motion: reduce)");
  return t.animate && !(a != null && a.matches);
}
function Dr(t, e) {
  return t.toLowerCase().includes(e.toLowerCase());
}
function ls(t, e) {
  let a = null;
  return () => {
    a || (a = window.setTimeout(() => {
      t(), a = null;
    }, e));
  };
}
function ds(t, e) {
  let a = null;
  return (...r) => {
    a && window.clearTimeout(a), a = window.setTimeout(() => {
      t(...r), a = null;
    }, e);
  };
}
function qe(t, e, a, r) {
  if (yo(r) && t.animate)
    return t.animate(e, a).finished;
  const s = a.direction === "normal" ? 1 : 0, i = Object.entries(e).reduce((l, [d, n]) => ({
    ...l,
    [d]: n[s]
  }), {});
  return Object.assign(t.style, i), Promise.resolve();
}
function It(t) {
  var e;
  const a = document.createElement("template");
  return a.innerHTML = t, (e = a.content) == null ? void 0 : e.firstElementChild;
}
async function ps(t) {
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
function za(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
  return t;
}
function Oe(t, ...e) {
  za(t).append(...e);
}
function go(t) {
  try {
    return window[t].length, !0;
  } catch {
    return !1;
  }
}
function fs() {
  return go("sessionStorage");
}
function hs() {
  return go("localStorage");
}
function la(t) {
  var e;
  return {
    emoji: t.emoji,
    label: t.label,
    tags: t.tags,
    skins: (e = t.skins) == null ? void 0 : e.map((a) => la(a)),
    order: t.order,
    custom: !1,
    hexcode: t.hexcode,
    version: t.version
  };
}
function $a(t, e, a) {
  var r;
  return a && !a.some((s) => s.order === t.group) ? !1 : Dr(t.label, e) || ((r = t.tags) == null ? void 0 : r.some((s) => Dr(s, e)));
}
class _o {
  constructor(e = "en") {
    this.locale = e;
  }
}
const ys = [
  (t, e) => (t.hexcode === "1F91D" && e < 14 && (t.skins = []), t),
  (t, e) => (t.skins && (t.skins = t.skins.filter((a) => !a.version || a.version <= e)), t)
];
function gs(t, e) {
  return ys.some((a) => a(t, e) === null) ? null : t;
}
function Ta(t, e) {
  return t.filter((a) => gs(a, e) !== null);
}
const xt = {};
function uo(t) {
  return xt[t] || (xt[t] = new _s(t)), xt[t];
}
uo.deleteDatabase = (t) => {
};
class _s extends _o {
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
    let r = this.categories.filter((s) => s.key !== "component");
    if (e.showRecents && r.unshift({ key: "recents", order: -1 }), (a = e.custom) != null && a.length && r.push({ key: "custom", order: 10 }), e.categories) {
      const s = e.categories;
      r = r.filter((i) => s.includes(i.key)), r.sort((i, l) => s.indexOf(i.key) - s.indexOf(l.key));
    } else
      r.sort((s, i) => s.order - i.order);
    return Promise.resolve(r);
  }
  getEmojis(e, a) {
    const r = this.emojis.filter((s) => s.group === e.order).filter((s) => s.version <= a).sort((s, i) => s.order != null && i.order != null ? s.order - i.order : 0).map(la);
    return Promise.resolve(Ta(r, a));
  }
  searchEmojis(e, a, r, s) {
    const i = this.emojis.filter((n) => $a(n, e, s) && n.version <= r).map(la), l = a.filter((n) => $a(n, e, s)), d = [
      ...Ta(i, r),
      ...l
    ];
    return Promise.resolve(d);
  }
  setMeta(e) {
    this.meta = e;
  }
}
function us(t, e) {
  const a = `https://cdn.jsdelivr.net/npm/emojibase-data@${t}/${e}`;
  return {
    emojisUrl: `${a}/data.json`,
    messagesUrl: `${a}/messages.json`
  };
}
async function Mr(t) {
  try {
    return (await fetch(t, { method: "HEAD" })).headers.get("etag");
  } catch {
    return null;
  }
}
function ms(t) {
  const { emojisUrl: e, messagesUrl: a } = us("latest", t);
  try {
    return Promise.all([
      Mr(e),
      Mr(a)
    ]);
  } catch {
    return Promise.all([null, null]);
  }
}
async function ks(t, e, a) {
  let r;
  try {
    r = await t.getEtags();
  } catch {
    r = {};
  }
  const { storedEmojisEtag: s, storedMessagesEtag: i } = r;
  if (a !== i || e !== s) {
    const [l, d] = await Promise.all([ho(t.locale), fo(t.locale)]);
    await t.populate({
      groups: l.groups,
      emojis: d,
      emojisEtag: e,
      messagesEtag: a
    });
  }
}
async function ws(t, e) {
  const a = await t.getHash();
  return e !== a;
}
async function mo(t, e, a) {
  let r = a || e(t);
  try {
    await r.open();
  } catch {
    console.warn("[picmo] IndexedDB not available, falling back to InMemoryStoreFactory"), r = uo(t);
  }
  return r;
}
async function bs(t, e, a) {
  if (!fs() && typeof window < "u")
    throw new Error("Session storage is required to use CDN emoji data.");
  const r = await mo(t, e, a), [s, i] = await ms(t);
  if (await r.isPopulated())
    s && i && await ks(r, s, i);
  else {
    const [l, d] = await Promise.all([ho(t), fo(t)]);
    await r.populate({ groups: l.groups, emojis: d, emojisEtag: s, messagesEtag: i });
  }
  return r;
}
async function vs(t, e, a, r, s) {
  const i = await mo(t, e, s), l = await ps(r);
  return (!await i.isPopulated() || await ws(i, l)) && await i.populate({ groups: a.groups, emojis: r, hash: l }), i;
}
async function ko(t, e, a, r, s) {
  return a && r ? vs(t, e, a, r, s) : bs(t, e, s);
}
let wo = class {
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
  light: zs,
  dark: K9,
  auto: G9
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
        r.type === "childList" && r.addedNodes[0] === this.el && (yo(this.options) && this.animateShow && this.animateShow(), e.disconnect);
      });
      e.observe(this.parent, { childList: !0 });
    }
  }
  static childEvent(e, a, r, s = {}) {
    return { target: e, event: a, handler: r, options: s };
  }
  static uiEvent(e, a, r = {}) {
    return { event: e, handler: a, options: r };
  }
  static byClass(e) {
    return `.${e}`;
  }
}
const xs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"/></svg>', js = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"/></svg>', Cs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240zM336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176zM259.9 369.4C288.8 369.4 316.2 375.2 340.6 385.5C352.9 390.7 366.7 381.3 361.4 369.1C344.8 330.9 305.6 303.1 259.9 303.1C214.3 303.1 175.1 330.8 158.4 369.1C153.1 381.3 166.1 390.6 179.3 385.4C203.7 375.1 231 369.4 259.9 369.4L259.9 369.4z"/></svg>', Es = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z"/></svg>', Ss = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"/></svg>', As = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z"/></svg>', Ls = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M482.3 192C516.5 192 576 221 576 256C576 292 516.5 320 482.3 320H365.7L265.2 495.9C259.5 505.8 248.9 512 237.4 512H181.2C170.6 512 162.9 501.8 165.8 491.6L214.9 320H112L68.8 377.6C65.78 381.6 61.04 384 56 384H14.03C6.284 384 0 377.7 0 369.1C0 368.7 .1818 367.4 .5398 366.1L32 256L.5398 145.9C.1818 144.6 0 143.3 0 142C0 134.3 6.284 128 14.03 128H56C61.04 128 65.78 130.4 68.8 134.4L112 192H214.9L165.8 20.4C162.9 10.17 170.6 0 181.2 0H237.4C248.9 0 259.5 6.153 265.2 16.12L365.7 192H482.3z"/></svg>', $s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z"/></svg>', Ts = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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
</svg>`, Fs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>', Ps = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"/></svg>', Rs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"/></svg>', Is = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M413.8 447.1L256 448l0 31.99C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.32-32.1-31.99l0-31.99l-158.9-.0099c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.0033l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31h-10.77l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"/></svg>', qs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></svg>', Os = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="radial" cy="85%">
      <stop offset="20%" stop-color="var(--color-secondary)" />
      <stop offset="100%" stop-color="var(--color-primary)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <path fill="url('#radial')" d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
</svg>`, Ds = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>';
function Ms(t, e) {
  const a = It(e);
  return a.dataset.icon = t, a.classList.add(lr("icon")), a;
}
const Br = {
  clock: xs,
  flag: js,
  frown: Cs,
  gamepad: Es,
  lightbulb: Ss,
  mug: As,
  plane: Ls,
  robot: $s,
  sad: Ts,
  search: Fs,
  smiley: Ps,
  symbols: Rs,
  tree: Is,
  users: qs,
  warning: Os,
  xmark: Ds
}, dt = {
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
function bo(t, e) {
  if (!(t in Br))
    return console.warn(`Unknown icon: "${t}"`), document.createElement("div");
  const a = Ms(t, Br[t]);
  return e && a.classList.add(lr(`icon-${e}`)), a;
}
const Bs = {
  mode: "sync"
};
var Ye, xa, ja, qt, Ca, Ot, Ea, Dt;
class Q {
  constructor(e, a = {}) {
    ue(this, ja), ue(this, Ca), ue(this, Ea), ue(this, Ye, void 0), ue(this, xa, void 0), Rt(this, Ye, e), Rt(this, xa, a.mode || Bs.mode);
  }
  renderSync(e = {}) {
    const a = It(me(this, Ye).call(this, e));
    return ie(this, Ea, Dt).call(this, a, e), ie(this, Ca, Ot).call(this, a), ie(this, ja, qt).call(this, a, e), a;
  }
  async renderAsync(e = {}) {
    const a = It(me(this, Ye).call(this, e));
    return ie(this, Ea, Dt).call(this, a, e), ie(this, Ca, Ot).call(this, a), await ie(this, ja, qt).call(this, a, e), a;
  }
  render(e) {
    return me(this, xa) === "sync" ? this.renderSync(e) : this.renderAsync(e);
  }
}
Ye = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap(), ja = /* @__PURE__ */ new WeakSet(), qt = async function(t, e) {
  const a = t.querySelectorAll("[data-view]"), r = [];
  for (const s of a) {
    const i = e[s.dataset.view];
    i ? s.dataset.render !== "sync" ? r.push(i.render().then((l) => (s.replaceWith(l), l))) : s.replaceWith(i.renderSync()) : s.remove();
  }
  return Promise.all(r);
}, Ca = /* @__PURE__ */ new WeakSet(), Ot = function(t) {
  t.querySelectorAll("i[data-icon]").forEach((e) => {
    const { icon: a, size: r } = e.dataset;
    e.replaceWith(bo(a, r));
  });
}, Ea = /* @__PURE__ */ new WeakSet(), Dt = function(t, e) {
  return t.querySelectorAll("[data-placeholder]").forEach((a) => {
    const r = a.dataset.placeholder;
    if (r && e[r]) {
      const s = e[r];
      a.replaceWith(...[s].flat());
    } else
      console.warn(`Missing placeholder element for key "${r}"`);
  }), t;
};
const Ns = ee(
  "imagePlaceholder",
  "placeholder"
), Hs = new Q(({ classes: t }) => `
  <div class="${t.placeholder} ${t.imagePlaceholder}"></div>
`);
let Us = class extends L {
  constructor({ classNames: e } = {}) {
    super({ template: Hs, classes: Ns }), this.classNames = e;
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
const Vs = ee("customEmoji");
class Ws {
  renderElement(e) {
    return { content: e };
  }
  renderImage(e = "", a) {
    const r = new Us({ classNames: e });
    return r.renderSync(), { content: r, resolver: () => (r.load(a()), r.el) };
  }
  doRender(e, a, r) {
    if (e.custom)
      return this.renderCustom(e, a, r);
    const { content: s, resolver: i } = this.render(e, r), l = s instanceof Element ? s : s.el;
    return i && i(), l;
  }
  doEmit(e) {
    return e.custom ? this.emitCustom(e) : this.emit(e);
  }
  emitCustom({ url: e, label: a, emoji: r, data: s }) {
    return { url: e, label: a, emoji: r, data: s };
  }
  renderCustom(e, a, r = "") {
    const s = [Vs.customEmoji, r].join(" ").trim(), { content: i, resolver: l } = this.renderImage(s, () => e.url), d = i instanceof Element ? i : i.el;
    return l && l(), d;
  }
}
const Ks = new Q(({ emoji: t }) => `<span>${t}</span>`);
let Gs = class extends Ws {
  render(e) {
    return this.renderElement(Ks.renderSync({ emoji: e.emoji }));
  }
  emit({ emoji: e, hexcode: a, label: r }) {
    return { emoji: e, hexcode: a, label: r };
  }
};
const Xs = {
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
function vo(t) {
  return new Qs(t);
}
vo.deleteDatabase = (t) => new Promise((e, a) => {
  const r = indexedDB.deleteDatabase(`${Mt}-${t}`);
  r.addEventListener("success", e), r.addEventListener("error", a);
});
class Qs extends _o {
  async open() {
    const e = indexedDB.open(`${Mt}-${this.locale}`);
    return new Promise((a, r) => {
      e.addEventListener("success", (s) => {
        var i;
        this.db = (i = s.target) == null ? void 0 : i.result, a();
      }), e.addEventListener("error", r), e.addEventListener("upgradeneeded", async (s) => {
        var i;
        this.db = (i = s.target) == null ? void 0 : i.result, this.db.createObjectStore("category", { keyPath: "order" });
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
    return new Promise((s) => {
      a.oncomplete = s, Object.keys(e).filter(Boolean).forEach((i) => {
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
    messagesEtag: s,
    hash: i
  }) {
    await this.removeAllObjects("category", "emoji");
    const l = [
      this.addObjects("category", e),
      this.addObjects("emoji", a),
      this.setMeta({ emojisEtag: r, messagesEtag: s, hash: i })
    ];
    await Promise.all(l);
  }
  async getCategories(e) {
    var a;
    const r = this.db.transaction("category", "readonly").objectStore("category");
    let s = (await this.waitForRequest(r.getAll())).target.result.filter((i) => i.key !== "component");
    if (e.showRecents && s.unshift({ key: "recents", order: -1 }), (a = e.custom) != null && a.length && s.push({ key: "custom", order: 10 }), e.categories) {
      const i = e.categories;
      s = s.filter((l) => i.includes(l.key)), s.sort((l, d) => i.indexOf(l.key) - i.indexOf(d.key));
    } else
      s.sort((i, l) => i.order - l.order);
    return s;
  }
  async getEmojis(e, a) {
    const r = this.db.transaction("emoji", "readonly").objectStore("emoji").index("category"), s = (await this.waitForRequest(r.getAll(e.order))).target.result.filter((i) => i.version <= a).sort((i, l) => i.order != null && l.order != null ? i.order - l.order : 0).map(la);
    return Ta(s, a);
  }
  async searchEmojis(e, a, r, s) {
    const i = [];
    return new Promise((l, d) => {
      const n = this.db.transaction("emoji", "readonly").objectStore("emoji").openCursor();
      n.addEventListener("success", (f) => {
        var h;
        const p = (h = f.target) == null ? void 0 : h.result;
        if (!p)
          return l([
            ...Ta(i, r),
            ...a.filter((y) => $a(y, e))
          ]);
        const c = p.value;
        $a(c, e, s) && c.version <= r && i.push(la(c)), p.continue();
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
    return new Promise((s, i) => {
      const l = this.db.transaction(e, a);
      l.oncomplete = s, l.onerror = i, r(l);
    });
  }
  async removeAllObjects(...e) {
    const a = this.db.transaction(e, "readwrite"), r = e.map((s) => a.objectStore(s));
    await Promise.all(r.map((s) => this.waitForRequest(s.clear())));
  }
  async addObjects(e, a) {
    return this.withTransaction(e, "readwrite", (r) => {
      const s = r.objectStore(e);
      a.forEach((i) => {
        s.add(i);
      });
    });
  }
}
function Js() {
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
class Ys {
}
const jt = "PicMo:recents";
class Zs extends Ys {
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
      ...this.getRecents(a).filter((s) => s.hexcode !== e.hexcode)
    ].slice(0, a);
    try {
      this.storage.setItem(jt, JSON.stringify(r));
    } catch {
      console.warn("storage is not available, recent emojis will not be saved");
    }
  }
}
let ec = class extends Zs {
  constructor() {
    super(hs() ? localStorage : Js());
  }
};
const ac = {
  dataStore: vo,
  theme: zs,
  animate: !0,
  showCategoryTabs: !0,
  showPreview: !0,
  showRecents: !0,
  showSearch: !0,
  showVariants: !0,
  emojisPerRow: 8,
  visibleRows: 6,
  emojiVersion: "auto",
  i18n: Xs,
  locale: "en",
  maxRecents: 50,
  custom: []
};
function zo(t = {}) {
  return {
    ...ac,
    ...t,
    renderer: t.renderer || new Gs(),
    recentsProvider: t.recentsProvider || new ec()
  };
}
var Te, aa, Fa, Sa, Bt;
let pt = class {
  constructor() {
    ue(this, aa), ue(this, Sa), ue(this, Te, /* @__PURE__ */ new Map());
  }
  on(e, a, r) {
    ie(this, Sa, Bt).call(this, e, a, r);
  }
  once(e, a, r) {
    ie(this, Sa, Bt).call(this, e, a, r, !0);
  }
  off(e, a) {
    const r = ie(this, aa, Fa).call(this, e);
    me(this, Te).set(e, r.filter((s) => s.handler !== a));
  }
  emit(e, ...a) {
    ie(this, aa, Fa).call(this, e).forEach((r) => {
      r.handler.apply(r.context, a), r.once && this.off(e, r.handler);
    });
  }
  removeAll() {
    me(this, Te).clear();
  }
};
Te = /* @__PURE__ */ new WeakMap(), aa = /* @__PURE__ */ new WeakSet(), Fa = function(t) {
  return me(this, Te).has(t) || me(this, Te).set(t, []), me(this, Te).get(t);
}, Sa = /* @__PURE__ */ new WeakSet(), Bt = function(t, e, a, r = !1) {
  ie(this, aa, Fa).call(this, t).push({ context: a, handler: e, once: r });
};
let tc = class extends pt {
}, rc = class extends pt {
};
const Nt = ee(
  "emojiCategory",
  "categoryName",
  "noRecents",
  "recentEmojis"
);
class dr extends L {
  constructor({ template: e, category: a, showVariants: r, lazyLoader: s }) {
    super({ template: e, classes: Nt }), this.baseUIElements = {
      categoryName: L.byClass(Nt.categoryName)
    }, this.category = a, this.showVariants = r, this.lazyLoader = s;
  }
  setActive(e, a, r) {
    this.emojiContainer.setActive(e, a, r);
  }
}
const oc = new Q(({ classes: t, emoji: e }) => `
  <button
    type="button"
    class="${t.emojiButton}"
    title="${e.label}"
    data-emoji="${e.emoji}"
    tabindex="-1">
    <div data-placeholder="emojiContent"></div>
  </button>
`), sc = ee("emojiButton");
class xo extends L {
  constructor({ emoji: e, lazyLoader: a, category: r }) {
    super({ template: oc, classes: sc }), this.emoji = e, this.lazyLoader = a, this.category = r;
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
let cc = class {
  constructor(e, a, r = 0, s = 0, i = !1) {
    this.events = new pt(), this.keyHandlers = {
      ArrowLeft: this.focusPrevious.bind(this),
      ArrowRight: this.focusNext.bind(this),
      ArrowUp: this.focusUp.bind(this),
      ArrowDown: this.focusDown.bind(this)
    }, this.rowCount = Math.ceil(a / e), this.columnCount = e, this.focusedRow = r, this.focusedColumn = s, this.emojiCount = a, this.wrap = i, this.handleKeyDown = this.handleKeyDown.bind(this);
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
    const s = this.getIndex();
    this.focusedRow = e, a !== void 0 && (this.focusedColumn = Math.min(this.columnCount, a)), (this.focusedRow >= this.rowCount || this.getIndex() >= this.emojiCount) && (this.focusedRow = this.rowCount - 1, this.focusedColumn = this.emojiCount % this.columnCount - 1), this.events.emit("focus:change", { from: s, to: this.getIndex(), performFocus: r });
  }
  setFocusedIndex(e, a = !0) {
    const r = Math.floor(e / this.columnCount), s = e % this.columnCount;
    this.setCell(r, s, a);
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
const ic = new Q(({ classes: t }) => `
  <div class="${t.emojiContainer}">
    <div data-placeholder="emojis"></div>
  </div>
`), nc = ee("emojiContainer");
class fa extends L {
  constructor({ emojis: e, showVariants: a, preview: r = !0, lazyLoader: s, category: i, fullHeight: l = !1 }) {
    super({ template: ic, classes: nc }), this.fullHeight = !1, this.showVariants = a, this.lazyLoader = s, this.preview = r, this.emojis = e, this.category = i, this.fullHeight = l, this.setFocus = this.setFocus.bind(this), this.triggerNextCategory = this.triggerNextCategory.bind(this), this.triggerPreviousCategory = this.triggerPreviousCategory.bind(this);
  }
  initialize() {
    this.grid = new cc(this.options.emojisPerRow, this.emojiCount, 0, 0, !this.category), this.grid.on("focus:change", this.setFocus), this.grid.on("focus:overflow", this.triggerNextCategory), this.grid.on("focus:underflow", this.triggerPreviousCategory), this.uiEvents = [
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
        const r = this.emojis.findIndex((s) => s.emoji === e);
        this.grid.setFocusedIndex(r, !1), setTimeout(() => {
          var s, i, l, d;
          const n = this.emojiViews[r].el;
          n.scrollIntoView();
          const f = (s = n.parentElement) == null ? void 0 : s.previousElementSibling, h = (l = (i = n.parentElement) == null ? void 0 : i.parentElement) == null ? void 0 : l.parentElement;
          h.scrollTop -= (d = f == null ? void 0 : f.offsetHeight) != null ? d : 0;
        });
      } else
        e.row === "first" || e.row === 0 ? this.grid.setCell(0, e.offset, a) : e.row === "last" && this.grid.setCell(this.grid.getRowCount() - 1, e.offset, a);
  }
  setActive(e, a, r) {
    var s;
    e ? this.setFocusedView(a, r) : (s = this.emojiViews[this.grid.getIndex()]) == null || s.deactivateFocus();
  }
  renderSync() {
    return this.emojiViews = this.emojis.map(
      (e) => this.viewFactory.create(xo, {
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
    var s, i;
    (s = this.emojiViews[e]) == null || s.deactivateFocus(), (i = this.emojiViews[a]) == null || i.activateFocus(r);
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
    const a = e.target.closest("button"), r = a == null ? void 0 : a.firstElementChild, s = zt(e, this.emojis);
    s && this.events.emit("preview:show", s, r == null ? void 0 : r.cloneNode(!0));
  }
  hidePreview(e) {
    zt(e, this.emojis) && this.events.emit("preview:hide");
  }
  get emojiCount() {
    return this.emojis.length;
  }
}
const lc = new Q(({ classes: t, category: e, pickerId: a, icon: r, i18n: s }) => `
  <section class="${t.emojiCategory}" role="tabpanel" aria-labelledby="${a}-category-${e.key}">
    <h3 data-category="${e.key}" class="${t.categoryName}">
      <i data-icon="${r}"></i>
      ${s.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);
let dc = class extends dr {
  constructor({ category: e, showVariants: a, lazyLoader: r, emojiVersion: s }) {
    super({ category: e, showVariants: a, lazyLoader: r, template: lc }), this.showVariants = a, this.lazyLoader = r, this.emojiVersion = s;
  }
  initialize() {
    this.uiElements = { ...this.baseUIElements }, super.initialize();
  }
  async render() {
    await this.emojiDataPromise;
    const e = await this.emojiData.getEmojis(this.category, this.emojiVersion);
    return this.emojiContainer = this.viewFactory.create(fa, {
      emojis: e,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: e.length,
      icon: dt[this.category.key]
    });
  }
}, pc = class extends fa {
  constructor({ category: e, emojis: a, preview: r = !0, lazyLoader: s }) {
    super({ category: e, emojis: a, showVariants: !1, preview: r, lazyLoader: s });
  }
  async addOrUpdate(e) {
    const a = this.el.querySelector(`[data-emoji="${e.emoji}"]`);
    a && (this.el.removeChild(a), this.emojis = this.emojis.filter((s) => s !== e));
    const r = this.viewFactory.create(xo, { emoji: e });
    if (this.el.insertBefore(r.renderSync(), this.el.firstChild), this.emojis = [
      e,
      ...this.emojis.filter((s) => s !== e)
    ], this.emojis.length > this.options.maxRecents) {
      this.emojis = this.emojis.slice(0, this.options.maxRecents);
      const s = this.el.childElementCount - this.options.maxRecents;
      for (let i = 0; i < s; i++)
        this.el.lastElementChild && this.el.removeChild(this.el.lastElementChild);
    }
  }
};
const fc = new Q(({ emojiCount: t, classes: e, category: a, pickerId: r, icon: s, i18n: i }) => `
  <section class="${e.emojiCategory}" role="tabpanel" aria-labelledby="${r}-category-${a.key}">
    <h3 data-category="${a.key}" class="${e.categoryName}">
      <i data-icon="${s}"></i>
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
let hc = class extends dr {
  constructor({ category: e, lazyLoader: a, provider: r }) {
    super({ category: e, showVariants: !1, lazyLoader: a, template: fc }), this.provider = r;
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
    return this.emojiContainer = this.viewFactory.create(pc, {
      emojis: a,
      showVariants: !1,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), await super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: a.length,
      icon: dt[this.category.key]
    }), this.el;
  }
};
const yc = new Q(({ classes: t, category: e, pickerId: a, icon: r, i18n: s }) => `
  <section class="${t.emojiCategory}" role="tabpanel" aria-labelledby="${a}-category-${e.key}">
    <h3 data-category="${e.key}" class="${t.categoryName}">
      <i data-icon="${r}"></i>
      ${s.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);
let gc = class extends dr {
  constructor({ category: e, lazyLoader: a }) {
    super({ template: yc, showVariants: !1, lazyLoader: a, category: e });
  }
  initialize() {
    this.uiElements = { ...this.baseUIElements }, super.initialize();
  }
  async render() {
    return this.emojiContainer = this.viewFactory.create(fa, {
      emojis: this.customEmojis,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: this.customEmojis.length,
      icon: dt[this.category.key]
    });
  }
};
class jo {
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
          r.filter((s) => s.intersectionRatio > 0).map((s) => s.target).forEach((s) => {
            const i = this.elements.get(s);
            i == null || i(), a.unobserve(s);
          });
        },
        {
          root: e
        }
      );
      this.elements.forEach((r, s) => {
        a.observe(s);
      });
    } else
      this.elements.forEach((a) => {
        a();
      });
  }
}
const Nr = ee("emojiArea"), _c = new Q(({ classes: t }) => `
  <div class="${t.emojiArea}">
    <div data-placeholder="emojis"></div>
  </div>
`, { mode: "async" }), uc = {
  recents: hc,
  custom: gc
};
function mc(t) {
  return uc[t.key] || dc;
}
function kc(t) {
  return !t || t === "button" ? {
    row: "first",
    offset: 0
  } : t;
}
let wc = class extends L {
  constructor({ categoryTabs: e, categories: a, emojiVersion: r }) {
    super({ template: _c, classes: Nr }), this.selectedCategory = 0, this.scrollListenerState = "active", this.lazyLoader = new jo(), this.categoryTabs = e, this.categories = a, this.emojiVersion = r, this.handleScroll = ls(this.handleScroll.bind(this), 100);
  }
  initialize() {
    this.appEvents = {
      "category:select": this.handleCategorySelect,
      "category:previous": this.focusPreviousCategory,
      "category:next": this.focusNextCategory,
      "focus:change": this.updateFocusedCategory
    }, this.uiElements = { emojis: L.byClass(Nr.emojiArea) }, this.uiEvents = [L.uiEvent("scroll", this.handleScroll)], super.initialize();
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
    const a = mc(e);
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
    const { focus: s, performFocus: i, scroll: l } = {
      performFocus: !1,
      ...a
    };
    this.emojiCategories[this.selectedCategory].setActive(!1);
    const d = this.selectedCategory = typeof e == "number" ? e : this.getCategoryIndex(e);
    (r = this.categoryTabs) == null || r.setActiveTab(this.selectedCategory, {
      performFocus: i,
      scroll: s === "button"
    });
    const n = this.emojiCategories[d].el.offsetTop;
    this.emojiCategories[d].setActive(!0, kc(s), s !== "button" && i), l && (this.el.scrollTop = n), this.scrollListenerState = "resume";
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
    }), s = {
      changeFocusable: !1,
      performFocus: !1,
      scroll: !1
    };
    e === 0 ? this.categoryTabs.setActiveTab(0, s) : Math.floor(e) === Math.floor(a) || r < 0 ? this.categoryTabs.setActiveTab(this.categories.length - 1, s) : this.categoryTabs.setActiveTab(r, s);
  }
};
const bc = new Q(({ classList: t, classes: e, icon: a, message: r }) => `
<div class="${t}" role="alert">
  <div class="${e.iconContainer}"><i data-size="10x" data-icon="${a}"></i></div>
  <h3 class="${e.title}">${r}</h3>
</div>
`), Hr = ee("error", "iconContainer", "title");
let Ht = class extends L {
  constructor({ message: e, icon: a = "warning", template: r = bc, className: s }) {
    super({ template: r, classes: Hr }), this.message = e, this.icon = a, this.className = s;
  }
  renderSync() {
    const e = [Hr.error, this.className].join(" ").trim();
    return super.renderSync({ message: this.message, icon: this.icon, classList: e });
  }
};
const vc = new Q(({ classList: t, classes: e, icon: a, i18n: r, message: s }) => `
  <div class="${t}" role="alert">
    <div class="${e.icon}"><i data-size="10x" data-icon="${a}"></i></div>
    <h3 class="${e.title}">${s}</h3>
    <button type="button">${r.get("retry")}</button>
  </div>
`), zc = ee("dataError");
class xc extends Ht {
  constructor({ message: e }) {
    super({ message: e, template: vc, className: zc.dataError });
  }
  initialize() {
    this.uiElements = { retryButton: "button" }, this.uiEvents = [L.childEvent("retryButton", "click", this.onRetry)], super.initialize();
  }
  async onRetry() {
    this.emojiData ? await this.emojiData.delete() : await this.options.dataStore.deleteDatabase(this.options.locale), this.events.emit("reinitialize");
    const e = await ko(this.options.locale, this.options.dataStore, this.options.messages, this.options.emojiData, this.emojiData);
    this.viewFactory.setEmojiData(e), this.events.emit("data:ready", e);
  }
}
const Ge = ee(
  "preview",
  "previewEmoji",
  "previewName",
  "tagList",
  "tag"
), jc = new Q(({ classes: t, tag: e }) => `
  <li class="${t.tag}">${e}</li>
`), Cc = new Q(({ classes: t }) => `
  <div class="${t.preview}">
    <div class="${t.previewEmoji}"></div>
    <div class="${t.previewName}"></div>
    <ul class="${t.tagList}"></ul>
  </div>
`);
class Ec extends L {
  constructor() {
    super({ template: Cc, classes: Ge });
  }
  initialize() {
    this.uiElements = {
      emoji: L.byClass(Ge.previewEmoji),
      name: L.byClass(Ge.previewName),
      tagList: L.byClass(Ge.tagList)
    }, this.appEvents = {
      "preview:show": this.showPreview,
      "preview:hide": this.hidePreview
    }, super.initialize();
  }
  showPreview(e, a) {
    if (Oe(this.ui.emoji, a), this.ui.name.textContent = e.label, e.tags) {
      this.ui.tagList.style.display = "flex";
      const r = e.tags.map((s) => jc.renderSync({ tag: s, classes: Ge }));
      Oe(this.ui.tagList, ...r);
    }
  }
  hidePreview() {
    za(this.ui.emoji), za(this.ui.name), za(this.ui.tagList);
  }
}
const Sc = new Q(({ classes: t, i18n: e }) => `
  <button title="${e.get("search.clear")}" class="${t.clearSearchButton}">
    <i data-icon="xmark"></i>
  </button>
`), Ac = new Q(({ classes: t, i18n: e }) => `
<div class="${t.searchContainer}">
  <input class="${t.searchField}" placeholder="${e.get("search")}">
  <span class="${t.searchAccessory}"></span>
</div>
`, { mode: "async" }), Xe = ee(
  "searchContainer",
  "searchField",
  "clearButton",
  "searchAccessory",
  "clearSearchButton",
  "notFound"
);
class Lc extends L {
  constructor({ categories: e, emojiVersion: a }) {
    super({ template: Ac, classes: Xe }), this.categories = e.filter((r) => r.key !== "recents"), this.emojiVersion = a, this.search = ds(this.search.bind(this), 100);
  }
  initialize() {
    this.uiElements = {
      searchField: L.byClass(Xe.searchField),
      searchAccessory: L.byClass(Xe.searchAccessory)
    }, this.uiEvents = [
      L.childEvent("searchField", "keydown", this.onKeyDown),
      L.childEvent("searchField", "input", this.onSearchInput)
    ], super.initialize();
  }
  async render() {
    return await super.render(), this.searchIcon = bo("search"), this.notFoundMessage = this.viewFactory.create(Ht, {
      message: this.i18n.get("search.notFound"),
      className: Xe.notFound,
      icon: "sad"
    }), this.notFoundMessage.renderSync(), this.errorMessage = this.viewFactory.create(Ht, { message: this.i18n.get("search.error") }), this.errorMessage.renderSync(), this.clearSearchButton = Sc.render({
      classes: Xe,
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
    Oe(this.ui.searchAccessory, e);
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
          const r = new jo();
          this.resultsContainer = this.viewFactory.create(fa, {
            emojis: a,
            fullHeight: !0,
            showVariants: !0,
            lazyLoader: r
          }), this.resultsContainer.renderSync(), (e = this.resultsContainer) != null && e.el && (r.observe(this.resultsContainer.el), this.resultsContainer.setActive(!0, { row: 0, offset: 0 }, !1), this.resultsContainer.el.addEventListener("keydown", (s) => this.handleResultsKeydown(s)), this.events.emit("content:show", this.resultsContainer));
        } else
          this.events.emit("content:show", this.notFoundMessage);
      } catch {
        this.events.emit("content:show", this.errorMessage);
      }
  }
}
const $c = new Q(({ classes: t }) => `
  <div class="${t.variantOverlay}">
    <div class="${t.variantPopup}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
  </div>
`), Ur = ee(
  "variantOverlay",
  "variantPopup"
), Ct = {
  easing: "ease-in-out",
  duration: 250,
  fill: "both"
}, Vr = {
  opacity: [0, 1]
}, Wr = {
  opacity: [0, 1],
  transform: ["scale3d(0.8, 0.8, 0.8)", "scale3d(1, 1, 1)"]
};
class Tc extends L {
  constructor({ emoji: e, parent: a }) {
    super({ template: $c, classes: Ur, parent: a }), this.focusedEmojiIndex = 0, this.focusTrap = new wo(), this.animateShow = () => Promise.all([
      qe(this.el, Vr, Ct, this.options),
      qe(this.ui.popup, Wr, Ct, this.options)
    ]), this.emoji = e;
  }
  initialize() {
    this.uiElements = {
      popup: L.byClass(Ur.variantPopup)
    }, this.uiEvents = [
      L.uiEvent("click", this.handleClick),
      L.uiEvent("keydown", this.handleKeydown)
    ], super.initialize();
  }
  animateHide() {
    const e = { ...Ct, direction: "reverse" };
    return Promise.all([
      qe(this.el, Vr, e, this.options),
      qe(this.ui.popup, Wr, e, this.options)
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
    }, a = (this.emoji.skins || []).map((s) => ({
      ...s,
      label: this.emoji.label,
      tags: this.emoji.tags
    })), r = [e, ...a];
    return this.emojiContainer = this.viewFactory.create(fa, {
      emojis: r,
      preview: !1
    }), super.renderSync({ emojis: this.emojiContainer }), r.length < this.options.emojisPerRow && this.el.style.setProperty("--emojis-per-row", r.length.toString()), this.el;
  }
  activate() {
    this.emojiContainer.setActive(!0, { row: 0, offset: 0 }, !0), this.focusTrap.activate(this.el);
  }
}
const Fc = new Q(({ classes: t, i18n: e, category: a, pickerId: r, icon: s }) => `
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
    <i data-icon="${s}"></i>
</li>
`), Et = ee(
  "categoryTab",
  "categoryTabActive",
  "categoryButton"
);
class Pc extends L {
  constructor({ category: e, icon: a }) {
    super({ template: Fc, classes: Et }), this.isActive = !1, this.category = e, this.icon = a;
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
    const { changeFocusable: r, performFocus: s, scroll: i } = {
      changeFocusable: !0,
      performFocus: !0,
      scroll: !0,
      ...a
    };
    this.el.classList.toggle(Et.categoryTabActive, e), r && (this.ui.button.tabIndex = e ? 0 : -1, this.ui.button.ariaSelected = e.toString()), e && s && (this.ui.button.focus(), i && this.events.emit("category:select", this.category.key, { scroll: "animate", focus: "button", performFocus: !1 })), this.isActive = e;
  }
  selectCategory() {
    this.isActive || this.events.emit("category:select", this.category.key, { scroll: "animate", focus: "button", performFocus: !0 });
  }
}
const Rc = new Q(({ classes: t }) => `
  <div class="${t.categoryButtonsContainer}">
    <ul role="tablist" class="${t.categoryButtons}">
      <div data-placeholder="tabs"></div>
    </ul>
  </div>
`), Ic = ee("categoryButtons", "categoryButtonsContainer");
class qc extends L {
  constructor({ categories: e }) {
    super({ template: Rc, classes: Ic }), this.activeCategoryIndex = 0, this.categories = e;
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
    return this.tabViews = this.categories.map((e) => this.viewFactory.create(Pc, { category: e, icon: dt[e.key] })), super.renderSync({
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
    const r = this.currentTabView, s = this.tabViews[e];
    r.setActive(!1, a), s.setActive(!0, a), this.activeCategoryIndex = e;
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
const Oc = [
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
function Dc() {
  var t;
  const e = Oc.find((a) => Mc(a.emoji));
  return (t = e == null ? void 0 : e.version) != null ? t : 1;
}
function Mc(t) {
  const e = document.createElement("canvas").getContext("2d");
  if (e)
    return e.textBaseline = "top", e.font = "32px Arial", e.fillText(t, 0, 0), e.getImageData(16, 16, 1, 1).data[0] !== 0;
}
function St(t, e) {
  return Array.from({ length: t }, () => e).join("");
}
function Bc({ showHeader: t, classes: e }) {
  return t ? `
    <header class="${e.header}">
      <div data-view="search"></div>
      <div data-view="categoryTabs" data-render="sync"></div>
    </header>
  ` : "";
}
function Nc(t) {
  const { classes: e, theme: a, className: r = "" } = t;
  return `
    <div class="picmo__picker ${e.picker} ${a} ${r}">
      ${Bc(t)}
      <div class="${e.content}">
        <div data-view="emojiArea"></div>
      </div>
      <div data-view="preview"></div>
    </div>
  `;
}
function Hc(t) {
  const { emojiCount: e, classes: a, theme: r, className: s, categoryCount: i } = t, l = ({ showSearch: h, classes: p }) => h ? `
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
    <div class="picmo__picker ${a.skeleton} ${a.picker} ${r} ${s}">
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
const Uc = new Q((t) => t.isLoaded ? Nc(t) : Hc(t)), ua = ee(
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
), ma = {
  emojisPerRow: "--emojis-per-row",
  visibleRows: "--row-count",
  emojiSize: "--emoji-size"
};
class Vc extends L {
  constructor() {
    super({ template: Uc, classes: ua }), this.pickerReady = !1, this.externalEvents = new rc(), this.updaters = {
      styleProperty: (e) => (a) => this.el.style.setProperty(ma[e], a.toString()),
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
      pickerContent: L.byClass(ua.content),
      header: L.byClass(ua.header)
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
    return this.options.showPreview && (this.preview = this.viewFactory.create(Ec)), this.options.showSearch && (this.search = this.viewFactory.create(Lc, {
      categories: this.categories,
      emojiVersion: this.emojiVersion
    })), this.options.showCategoryTabs && (this.categoryTabs = this.viewFactory.create(qc, {
      categories: this.categories
    })), this.currentView = this.emojiArea = this.viewFactory.create(wc, {
      categoryTabs: this.categoryTabs,
      categories: this.categories,
      emojiVersion: this.emojiVersion
    }), [this.preview, this.search, this.emojiArea, this.categoryTabs];
  }
  setStyleProperties() {
    this.options.showSearch || this.el.style.setProperty("--search-height-full", "0px"), this.options.showCategoryTabs || (this.el.style.setProperty("--category-tabs-height", "0px"), this.el.style.setProperty("--category-tabs-offset", "0px")), this.options.showPreview || this.el.style.setProperty("--emoji-preview-height-full", "0px"), Object.keys(ma).forEach((e) => {
      this.options[e] && this.el.style.setProperty(ma[e], this.options[e].toString());
    });
  }
  updateStyleProperty(e, a) {
    this.el.style.setProperty(ma[e], a.toString());
  }
  reinitialize() {
    this.renderSync();
  }
  onError(e) {
    const a = this.viewFactory.createWithOptions({ data: !1 }, xc, { message: this.i18n.get("error.load") }), r = this.el.offsetHeight || 375;
    throw this.el.style.height = `${r}px`, Oe(this.el, a.renderSync()), e;
  }
  async onDataReady(e) {
    const a = this.el;
    try {
      e ? this.emojiData = e : await this.emojiDataPromise, this.options.emojiVersion === "auto" ? this.emojiVersion = Dc() || parseFloat(os) : this.emojiVersion = this.options.emojiVersion, this.categories = await this.emojiData.getCategories(this.options);
      const [r, s, i, l] = this.buildChildViews();
      await super.render({
        isLoaded: !0,
        search: s,
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
    return Oe(this.options.rootElement, this.el), this.setStyleProperties(), this.pickerReady && this.initializePickerView(), this.el;
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
    e !== this.currentView && (this.currentView !== this.emojiArea && ((a = this.currentView) == null || a.destroy()), this.ui.pickerContent.classList.toggle(ua.fullHeight, e !== this.emojiArea), Oe(this.ui.pickerContent, e.el), this.currentView = e, e === this.emojiArea ? (this.emojiArea.reset(), this.categoryTabs && this.ui.header.appendChild(this.categoryTabs.el)) : (r = this.categoryTabs) == null || r.el.remove());
  }
  hideVariantPopup() {
    var e;
    (e = this.variantPopup) == null || e.destroy();
  }
  isPickerClick(e) {
    var a, r;
    const s = e.target, i = this.el.contains(s), l = (r = (a = this.variantPopup) == null ? void 0 : a.el) == null ? void 0 : r.contains(s);
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
    }), this.variantPopup = this.viewFactory.create(Tc, { emoji: e, parent: this.el }), this.el.appendChild(this.variantPopup.renderSync()), this.variantPopup.activate();
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
class Wc {
  constructor({ events: e, i18n: a, renderer: r, emojiData: s, options: i, customEmojis: l = [], pickerId: d }) {
    this.events = e, this.i18n = a, this.renderer = r, this.emojiData = s, this.options = i, this.customEmojis = l, this.pickerId = d;
  }
  setEmojiData(e) {
    this.emojiData = Promise.resolve(e);
  }
  createWithOptions(e = {}, a, ...r) {
    const s = new a(...r);
    return s.setPickerId(this.pickerId), s.setEvents(this.events), s.setI18n(this.i18n), s.setRenderer(this.renderer), e.data !== !1 && s.setEmojiData(this.emojiData), s.setOptions(this.options), s.setCustomEmojis(this.customEmojis), s.viewFactory = this, s.initialize(), s;
  }
  create(e, ...a) {
    return this.createWithOptions({}, e, ...a);
  }
}
var Aa;
class Kc {
  constructor(e = {}) {
    ue(this, Aa, void 0), Rt(this, Aa, new Map(Object.entries(e)));
  }
  get(e, a = e) {
    return me(this, Aa).get(e) || a;
  }
}
Aa = /* @__PURE__ */ new WeakMap();
function Gc(t, e) {
  e === void 0 && (e = {});
  var a = e.insertAt;
  if (!(!t || typeof document > "u")) {
    var r = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
    s.type = "text/css", a === "top" && r.firstChild ? r.insertBefore(s, r.firstChild) : r.appendChild(s), s.styleSheet ? s.styleSheet.cssText = t : s.appendChild(document.createTextNode(t));
  }
}
function Co() {
  let t = !1;
  return function(e) {
    !t && (Gc(e), t = !0);
  };
}
const Xc = `.picmo__picker .picmo__icon{width:1.25em;height:1em;fill:currentColor}.picmo__icon-small{font-size:.8em}.picmo__icon-medium{font-size:1em}.picmo__icon-large{font-size:1.25em}.picmo__icon-2x{font-size:2em}.picmo__icon-3x{font-size:3em}.picmo__icon-4x{font-size:4em}.picmo__icon-5x{font-size:5em}.picmo__icon-8x{font-size:8em}.picmo__icon-10x{font-size:10em}.picmo__light,.picmo__auto{color-scheme:light;--accent-color: #4f46e5;--background-color: #f9fafb;--border-color: #cccccc;--category-name-background-color: #f9fafb;--category-name-button-color: #999999;--category-name-text-color: hsl(214, 30%, 50%);--category-tab-active-background-color: rgba(255, 255, 255, .6);--category-tab-active-color: var(--accent-color);--category-tab-color: #666;--category-tab-highlight-background-color: rgba(0, 0, 0, .15);--error-color-dark: hsl(0, 100%, 45%);--error-color: hsl(0, 100%, 40%);--focus-indicator-background-color: hsl(198, 65%, 85%);--focus-indicator-color: #333333;--hover-background-color: #c7d2fe;--placeholder-background-color: #cccccc;--search-background-color: #f9fafb;--search-focus-background-color: #ffffff;--search-icon-color: #999999;--search-placeholder-color: #71717a;--secondary-background-color: #e2e8f0;--secondary-text-color: #666666;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #000000;--variant-popup-background-color: #ffffff}.picmo__dark{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}@media (prefers-color-scheme: dark){.picmo__auto{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}}.picmo__picker .picmo__categoryButtonsContainer{overflow:auto;padding:2px 0}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-right{mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-left{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-both{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%)}.picmo__picker .picmo__categoryButtons{display:flex;flex-direction:row;gap:var(--tab-gap);margin:0;padding:0 .5em;align-items:center;height:var(--category-tabs-height);box-sizing:border-box;width:100%;justify-content:space-between;position:relative;list-style-type:none;justify-self:center;max-width:min(23.55rem,calc(var(--category-count, 1) * 2.5rem))}.picmo__picker .picmo__categoryButtons .picmo__categoryTab{display:flex;align-items:center;transition:all .1s;width:2em}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton{color:var(--category-tab-active-color);background:linear-gradient(rgba(255,255,255,.75) 0%,rgba(255,255,255,.75) 100%),linear-gradient(var(--category-tab-active-color) 0%,var(--category-tab-active-color) 100%);border:2px solid var(--category-tab-active-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton:hover{background-color:var(--category-tab-active-background-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton{border-radius:5px;background:transparent;border:2px solid transparent;color:var(--category-tab-color);cursor:pointer;padding:2px;vertical-align:middle;display:flex;align-items:center;justify-content:center;font-size:1.2rem;width:1.6em;height:1.6em;transition:all .1s}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:is(img){width:var(--category-tab-size);height:var(--category-tab-size)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:hover{background:var(--category-tab-highlight-background-color)}.picmo__dataError [data-icon]{opacity:.8}@keyframes appear{0%{opacity:0}to{opacity:.8}}@keyframes appear-grow{0%{opacity:0;transform:scale(.8)}to{opacity:.8;transform:scale(1)}}.picmo__picker .picmo__error{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--secondary-text-color)}.picmo__picker .picmo__error .picmo__iconContainer{opacity:.8;animation:appear-grow .25s cubic-bezier(.175,.885,.32,1.275);--color-primary: var(--error-color);--color-secondary: var(--error-color-dark)}.picmo__picker .picmo__error .picmo__title{animation:appear .25s;animation-delay:50ms;animation-fill-mode:both}.picmo__picker .picmo__error button{padding:8px 16px;cursor:pointer;background:var(--background-color);border:1px solid var(--text-color);border-radius:5px;color:var(--text-color)}.picmo__picker .picmo__error button:hover{background:var(--text-color);color:var(--background-color)}.picmo__emojiButton{background:transparent;border:none;border-radius:15px;cursor:pointer;display:flex;font-family:var(--emoji-font);font-size:var(--emoji-size);height:100%;justify-content:center;align-items:center;margin:0;overflow:hidden;padding:0;width:100%}.picmo__emojiButton:hover{background:var(--hover-background-color)}.picmo__emojiButton:focus{border-radius:0;background:var(--focus-indicator-background-color);outline:1px solid var(--focus-indicator-color)}.picmo__picker .picmo__emojiArea{height:var(--emoji-area-height);overflow-y:auto;position:relative}.picmo__picker .picmo__emojiCategory{position:relative}.picmo__picker .picmo__emojiCategory .picmo__categoryName{font-size:.9em;padding:.5rem;margin:0;background:var(--category-name-background-color);color:var(--category-name-text-color);top:0;z-index:1;display:grid;gap:4px;grid-template-columns:auto 1fr auto;align-items:center;line-height:1;box-sizing:border-box;height:var(--category-name-height);justify-content:flex-start;text-transform:uppercase}.picmo__picker .picmo__emojiCategory .picmo__categoryName button{background:transparent;border:none;display:flex;align-items:center;cursor:pointer;color:var(--category-name-button-color)}.picmo__picker .picmo__emojiCategory .picmo__categoryName button:hover{opacity:1}.picmo__picker .picmo__emojiCategory .picmo__noRecents{color:var(--secondary-text-color);grid-column:1 / span var(--emojis-per-row);font-size:.9em;text-align:center;display:flex;align-items:center;justify-content:center;min-height:calc(var(--emoji-size) * var(--emoji-size-multiplier))}.picmo__picker .picmo__emojiCategory .picmo__recentEmojis[data-empty=true]{display:none}:is(.picmo__picker .picmo__emojiCategory) .picmo__recentEmojis[data-empty=false]+div{display:none}.picmo__picker .picmo__emojiContainer{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center}.picmo__picker.picmo__picker{--border-radius: 5px;--emoji-area-height: calc( (var(--row-count) * var(--emoji-size) * var(--emoji-size-multiplier)) + var(--category-name-height) );--content-height: var(--emoji-area-height);--emojis-per-row: 8;--row-count: 6;--emoji-preview-margin: 4px;--emoji-preview-height: calc(var(--emoji-preview-size) + 1em + 1px);--emoji-preview-height-full: calc(var(--emoji-preview-height) + var(--emoji-preview-margin));--emoji-preview-size: 2.75em;--emoji-size: 2rem;--emoji-size-multiplier: 1.3;--content-margin: 8px;--category-tabs-height:calc(1.5em + 9px);--category-tabs-offset: 8px;--category-tab-size: 1.2rem;--category-name-height: 2rem;--category-name-padding-y: 6px;--search-height: 2em;--search-margin: .5em;--search-margin-bottom: 4px;--search-height-full: calc(var(--search-height) + var(--search-margin) + var(--search-margin-bottom));--overlay-background-color: rgba(0, 0, 0, .8);--emoji-font: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";--ui-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;--ui-font-size: 16px;--picker-width: calc(var(--emojis-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 2.75rem);--preview-background-color: var(--secondary-background-color);background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);font-size:var(--ui-font-size);overflow:hidden;position:relative;width:var(--picker-width);display:grid;gap:8px}.picmo__picker.picmo__picker>*{font-family:var(--ui-font)}.picmo__picker.picmo__skeleton{background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);width:var(--picker-width);color:var(--secondary-text-color)}.picmo__picker.picmo__skeleton *{box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__picker.picmo__skeleton .picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}.picmo__picker.picmo__skeleton .picmo__headerSkeleton{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:flex;flex-direction:column;overflow:hidden;gap:8px;border-bottom:1px solid var(--border-color);width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton{padding:0 8px;height:var(--search-height)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton .picmo__searchInput{width:100%;height:28px;border-radius:3px}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton{height:var(--category-tabs-height);display:flex;flex-direction:row;align-items:center;justify-self:center;width:calc(2rem * var(--category-count, 1))}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton .picmo__categoryTab{width:25px;height:25px;padding:2px;border-radius:5px;margin:.25em}.picmo__picker.picmo__skeleton .picmo__contentSkeleton{height:var(--content-height);padding-right:8px;opacity:.7}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__categoryName{width:50%;height:1rem;margin:.5rem;box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center;width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid .picmo__emoji{width:var(--emoji-size);height:var(--emoji-size);border-radius:50%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton{height:var(--emoji-preview-height);border-top:1px solid var(--border-color);display:grid;align-items:center;padding:.5em;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags"}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewEmoji{grid-area:emoji;border-radius:50%;width:var(--emoji-preview-size);height:var(--emoji-preview-size)}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewName{grid-area:name;height:.8em;width:80%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList .picmo__tag{border-radius:3px;padding:2px 8px;margin-right:.25em;height:1em;width:20%}.picmo__overlay{background:rgba(0,0,0,.75);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1000}.picmo__content{position:relative;overflow:hidden;height:var(--content-height)}.picmo__content.picmo__fullHeight{height:calc(var(--content-height) + var(--category-tabs-height) + var(--category-tabs-offset));overflow-y:auto}.picmo__pluginContainer{margin:.5em;display:flex;flex-direction:row}.picmo__header{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:grid;gap:8px;border-bottom:1px solid var(--border-color)}@media (prefers-reduced-motion: reduce){.picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__placeholder:after{display:none}}.picmo__picker .picmo__preview{border-top:1px solid var(--border-color);display:grid;align-items:center;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags";height:var(--emoji-preview-height);box-sizing:border-box;padding:.5em;position:relative;background:var(--preview-background-color)}.picmo__picker .picmo__preview .picmo__previewEmoji{grid-area:emoji;font-size:var(--emoji-preview-size);font-family:var(--emoji-font);width:1.25em;display:flex;align-items:center;justify-content:center}.picmo__picker .picmo__preview .picmo__previewName{grid-area:name;color:var(--text-color);font-size:.8em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.picmo__picker .picmo__preview .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0;font-size:.75em;overflow:hidden}.picmo__picker .picmo__preview .picmo__tag{border-radius:3px;background:var(--tag-background-color);color:var(--text-color);padding:2px 8px;margin-right:.25em;white-space:nowrap}.picmo__picker .picmo__preview .picmo__tag:last-child{margin-right:0}.picmo__picker .picmo__searchContainer{display:flex;height:var(--search-height);box-sizing:border-box;padding:0 8px;position:relative}.picmo__picker .picmo__searchContainer .picmo__searchField{background:var(--search-background-color);border-radius:3px;border:none;box-sizing:border-box;color:var(--text-color);font-size:.9em;outline:none;padding:.5em 2.25em .5em .5em;width:100%}.picmo__picker .picmo__searchContainer .picmo__searchField:focus{background:var(--search-focus-background-color)}.picmo__picker .picmo__searchContainer .picmo__searchField::placeholder{color:var(--search-placeholder-color)}.picmo__picker .picmo__searchContainer .picmo__searchAccessory{color:var(--search-icon-color);height:100%;position:absolute;right:1em;top:0;width:1.25rem;display:flex;align-items:center}.picmo__picker .picmo__searchContainer .picmo__searchAccessory svg{fill:var(--search-icon-color)}.picmo__picker .picmo__searchContainer .picmo__clearButton{border:0;color:var(--search-icon-color);background:transparent;cursor:pointer}.picmo__picker .picmo__searchContainer .picmo__clearSearchButton{cursor:pointer;border:none;background:transparent;color:var(--search-icon-color);font-size:1em;width:100%;height:100%;display:flex;align-items:center;padding:0}.picmo__picker .picmo__searchContainer .picmo__notFound [data-icon]{fill:#f3e265}.picmo__picker .picmo__variantOverlay{background:var(--overlay-background-color);border-radius:5px;display:flex;flex-direction:column;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:1}.picmo__picker .picmo__variantOverlay .picmo__variantPopup{background:var(--variant-popup-background-color);border-radius:5px;margin:.5em;padding:.5em;text-align:center;user-select:none;display:flex;align-items:center;justify-content:center}.picmo__customEmoji{width:1em;height:1em}@keyframes shine{to{transform:translate(100%)}}.picmo__picker .picmo__imagePlaceholder{width:2rem;height:2rem;border-radius:50%}.picmo__placeholder{background:#DDDBDD;position:relative}.picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}
`;
function Qc(t) {
  return ko(t.locale, t.dataStore, t.messages, t.emojiData);
}
let Jc = 0, ka;
function Yc() {
  return `picmo-${Date.now()}-${Jc++}`;
}
const Zc = Co();
function ei(t) {
  Zc(Xc);
  const e = zo(t), a = ((e == null ? void 0 : e.custom) || []).map((l) => ({
    ...l,
    custom: !0,
    tags: ["custom", ...l.tags || []]
  })), r = new tc();
  ka || (ka = Qc(e));
  const s = new Kc(e.i18n);
  ka.then((l) => {
    r.emit("data:ready", l);
  }).catch((l) => {
    r.emit("error", l);
  });
  const i = new Wc({
    events: r,
    i18n: s,
    customEmojis: a,
    renderer: e.renderer,
    options: e,
    emojiData: ka,
    pickerId: Yc()
  }).create(Vc);
  return i.renderSync(), i;
}
function Pe(t) {
  return t.split("-")[0];
}
function De(t) {
  return t.split("-")[1];
}
function ft(t) {
  return ["top", "bottom"].includes(Pe(t)) ? "x" : "y";
}
function Eo(t) {
  return t === "y" ? "height" : "width";
}
function Kr(t, e, a) {
  let {
    reference: r,
    floating: s
  } = t;
  const i = r.x + r.width / 2 - s.width / 2, l = r.y + r.height / 2 - s.height / 2, d = ft(e), n = Eo(d), f = r[n] / 2 - s[n] / 2, h = Pe(e), p = d === "x";
  let c;
  switch (h) {
    case "top":
      c = {
        x: i,
        y: r.y - s.height
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
        x: r.x - s.width,
        y: l
      };
      break;
    default:
      c = {
        x: r.x,
        y: r.y
      };
  }
  switch (De(e)) {
    case "start":
      c[d] -= f * (a && p ? -1 : 1);
      break;
    case "end":
      c[d] += f * (a && p ? -1 : 1);
      break;
  }
  return c;
}
const ai = async (t, e, a) => {
  const {
    placement: r = "bottom",
    strategy: s = "absolute",
    middleware: i = [],
    platform: l
  } = a, d = await (l.isRTL == null ? void 0 : l.isRTL(e));
  let n = await l.getElementRects({
    reference: t,
    floating: e,
    strategy: s
  }), {
    x: f,
    y: h
  } = Kr(n, r, d), p = r, c = {}, y = 0;
  for (let u = 0; u < i.length; u++) {
    const {
      name: k,
      fn: x
    } = i[u], {
      x: E,
      y: w,
      data: S,
      reset: z
    } = await x({
      x: f,
      y: h,
      initialPlacement: r,
      placement: p,
      strategy: s,
      middlewareData: c,
      rects: n,
      platform: l,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (f = E ?? f, h = w ?? h, c = {
      ...c,
      [k]: {
        ...c[k],
        ...S
      }
    }, z && y <= 50) {
      y++, typeof z == "object" && (z.placement && (p = z.placement), z.rects && (n = z.rects === !0 ? await l.getElementRects({
        reference: t,
        floating: e,
        strategy: s
      }) : z.rects), {
        x: f,
        y: h
      } = Kr(n, p, d)), u = -1;
      continue;
    }
  }
  return {
    x: f,
    y: h,
    placement: p,
    strategy: s,
    middlewareData: c
  };
};
function ti(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function ri(t) {
  return typeof t != "number" ? ti(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Pa(t) {
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
    y: s,
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
  } = e, u = ri(y), k = d[c ? p === "floating" ? "reference" : "floating" : p], x = Pa(await i.getClippingRect({
    element: (a = await (i.isElement == null ? void 0 : i.isElement(k))) == null || a ? k : k.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(d.floating)),
    boundary: f,
    rootBoundary: h,
    strategy: n
  })), E = Pa(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: p === "floating" ? {
      ...l.floating,
      x: r,
      y: s
    } : l.reference,
    offsetParent: await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d.floating)),
    strategy: n
  }) : l[p]);
  return {
    top: x.top - E.top + u.top,
    bottom: E.bottom - x.bottom + u.bottom,
    left: x.left - E.left + u.left,
    right: E.right - x.right + u.right
  };
}
const oi = Math.min, si = Math.max;
function Gr(t, e, a) {
  return si(t, oi(e, a));
}
const ci = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ra(t) {
  return t.replace(/left|right|bottom|top/g, (e) => ci[e]);
}
function So(t, e, a) {
  a === void 0 && (a = !1);
  const r = De(t), s = ft(t), i = Eo(s);
  let l = s === "x" ? r === (a ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[i] > e.floating[i] && (l = Ra(l)), {
    main: l,
    cross: Ra(l)
  };
}
const ii = {
  start: "end",
  end: "start"
};
function Ut(t) {
  return t.replace(/start|end/g, (e) => ii[e]);
}
const ni = ["top", "right", "bottom", "left"], li = /* @__PURE__ */ ni.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []);
function di(t, e, a) {
  return (t ? [...a.filter((r) => De(r) === t), ...a.filter((r) => De(r) !== t)] : a.filter((r) => Pe(r) === r)).filter((r) => t ? De(r) === t || (e ? Ut(r) !== r : !1) : !0);
}
const pi = function(t) {
  return t === void 0 && (t = {}), {
    name: "autoPlacement",
    options: t,
    async fn(e) {
      var a, r, s, i, l;
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
        allowedPlacements: k = li,
        autoAlignment: x = !0,
        ...E
      } = t, w = di(u, x, k), S = await pr(e, E), z = (a = (r = h.autoPlacement) == null ? void 0 : r.index) != null ? a : 0, g = w[z];
      if (g == null)
        return {};
      const {
        main: o,
        cross: _
      } = So(g, f, await (c.isRTL == null ? void 0 : c.isRTL(y.floating)));
      if (p !== g)
        return {
          x: d,
          y: n,
          reset: {
            placement: w[0]
          }
        };
      const b = [S[Pe(g)], S[o], S[_]], T = [...(s = (i = h.autoPlacement) == null ? void 0 : i.overflows) != null ? s : [], {
        placement: g,
        overflows: b
      }], j = w[z + 1];
      if (j)
        return {
          data: {
            index: z + 1,
            overflows: T
          },
          reset: {
            placement: j
          }
        };
      const F = T.slice().sort((O, N) => O.overflows[0] - N.overflows[0]), q = (l = F.find((O) => {
        let {
          overflows: N
        } = O;
        return N.every((K) => K <= 0);
      })) == null ? void 0 : l.placement, A = q ?? F[0].placement;
      return A !== p ? {
        data: {
          index: z + 1,
          overflows: T
        },
        reset: {
          placement: A
        }
      } : {};
    }
  };
};
function fi(t) {
  const e = Ra(t);
  return [Ut(t), e, Ut(e)];
}
const hi = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var a;
      const {
        placement: r,
        middlewareData: s,
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
      } = t, k = Pe(r), x = p || (k === l || !y ? [Ra(l)] : fi(l)), E = [l, ...x], w = await pr(e, u), S = [];
      let z = ((a = s.flip) == null ? void 0 : a.overflows) || [];
      if (f && S.push(w[k]), h) {
        const {
          main: b,
          cross: T
        } = So(r, i, await (d.isRTL == null ? void 0 : d.isRTL(n.floating)));
        S.push(w[b], w[T]);
      }
      if (z = [...z, {
        placement: r,
        overflows: S
      }], !S.every((b) => b <= 0)) {
        var g, o;
        const b = ((g = (o = s.flip) == null ? void 0 : o.index) != null ? g : 0) + 1, T = E[b];
        if (T)
          return {
            data: {
              index: b,
              overflows: z
            },
            reset: {
              placement: T
            }
          };
        let j = "bottom";
        switch (c) {
          case "bestFit": {
            var _;
            const F = (_ = z.map((q) => [q, q.overflows.filter((A) => A > 0).reduce((A, O) => A + O, 0)]).sort((q, A) => q[1] - A[1])[0]) == null ? void 0 : _[0].placement;
            F && (j = F);
            break;
          }
          case "initialPlacement":
            j = l;
            break;
        }
        if (r !== j)
          return {
            reset: {
              placement: j
            }
          };
      }
      return {};
    }
  };
};
async function yi(t, e) {
  const {
    placement: a,
    platform: r,
    elements: s
  } = t, i = await (r.isRTL == null ? void 0 : r.isRTL(s.floating)), l = Pe(a), d = De(a), n = ft(a) === "x", f = ["left", "top"].includes(l) ? -1 : 1, h = i && n ? -1 : 1, p = typeof e == "function" ? e(t) : e;
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
const Xr = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: a,
        y: r
      } = e, s = await yi(e, t);
      return {
        x: a + s.x,
        y: r + s.y,
        data: s
      };
    }
  };
};
function gi(t) {
  return t === "x" ? "y" : "x";
}
const Qr = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: a,
        y: r,
        placement: s
      } = e, {
        mainAxis: i = !0,
        crossAxis: l = !1,
        limiter: d = {
          fn: (x) => {
            let {
              x: E,
              y: w
            } = x;
            return {
              x: E,
              y: w
            };
          }
        },
        ...n
      } = t, f = {
        x: a,
        y: r
      }, h = await pr(e, n), p = ft(Pe(s)), c = gi(p);
      let y = f[p], u = f[c];
      if (i) {
        const x = p === "y" ? "top" : "left", E = p === "y" ? "bottom" : "right", w = y + h[x], S = y - h[E];
        y = Gr(w, y, S);
      }
      if (l) {
        const x = c === "y" ? "top" : "left", E = c === "y" ? "bottom" : "right", w = u + h[x], S = u - h[E];
        u = Gr(w, u, S);
      }
      const k = d.fn({
        ...e,
        [p]: y,
        [c]: u
      });
      return {
        ...k,
        data: {
          x: k.x - a,
          y: k.y - r
        }
      };
    }
  };
};
function Ao(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function be(t) {
  if (t == null)
    return window;
  if (!Ao(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function pe(t) {
  return be(t).getComputedStyle(t);
}
function ke(t) {
  return Ao(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function Lo() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function fe(t) {
  return t instanceof be(t).HTMLElement;
}
function Ee(t) {
  return t instanceof be(t).Element;
}
function _i(t) {
  return t instanceof be(t).Node;
}
function Me(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = be(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function ht(t) {
  const {
    overflow: e,
    overflowX: a,
    overflowY: r
  } = pe(t);
  return /auto|scroll|overlay|hidden/.test(e + r + a);
}
function ui(t) {
  return ["table", "td", "th"].includes(ke(t));
}
function $o(t) {
  const e = /firefox/i.test(Lo()), a = pe(t);
  return a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].includes(a.willChange) || e && a.willChange === "filter" || e && (a.filter ? a.filter !== "none" : !1);
}
function To() {
  return !/^((?!chrome|android).)*safari/i.test(Lo());
}
const Jr = Math.min, ta = Math.max, Ia = Math.round;
function we(t, e, a) {
  var r, s, i, l;
  e === void 0 && (e = !1), a === void 0 && (a = !1);
  const d = t.getBoundingClientRect();
  let n = 1, f = 1;
  e && fe(t) && (n = t.offsetWidth > 0 && Ia(d.width) / t.offsetWidth || 1, f = t.offsetHeight > 0 && Ia(d.height) / t.offsetHeight || 1);
  const h = Ee(t) ? be(t) : window, p = !To() && a, c = (d.left + (p && (r = (s = h.visualViewport) == null ? void 0 : s.offsetLeft) != null ? r : 0)) / n, y = (d.top + (p && (i = (l = h.visualViewport) == null ? void 0 : l.offsetTop) != null ? i : 0)) / f, u = d.width / n, k = d.height / f;
  return {
    width: u,
    height: k,
    top: y,
    right: c + u,
    bottom: y + k,
    left: c,
    x: c,
    y
  };
}
function Se(t) {
  return ((_i(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function yt(t) {
  return Ee(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function Fo(t) {
  return we(Se(t)).left + yt(t).scrollLeft;
}
function mi(t) {
  const e = we(t);
  return Ia(e.width) !== t.offsetWidth || Ia(e.height) !== t.offsetHeight;
}
function ki(t, e, a) {
  const r = fe(e), s = Se(e), i = we(
    t,
    r && mi(e),
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
    if ((ke(e) !== "body" || ht(s)) && (l = yt(e)), fe(e)) {
      const n = we(e, !0);
      d.x = n.x + e.clientLeft, d.y = n.y + e.clientTop;
    } else
      s && (d.x = Fo(s));
  return {
    x: i.left + l.scrollLeft - d.x,
    y: i.top + l.scrollTop - d.y,
    width: i.width,
    height: i.height
  };
}
function Po(t) {
  return ke(t) === "html" ? t : t.assignedSlot || t.parentNode || (Me(t) ? t.host : null) || Se(t);
}
function Yr(t) {
  return !fe(t) || pe(t).position === "fixed" ? null : wi(t);
}
function wi(t) {
  let {
    offsetParent: e
  } = t, a = t, r = !1;
  for (; a && a !== e; ) {
    const {
      assignedSlot: s
    } = a;
    if (s) {
      let i = s.offsetParent;
      if (pe(s).display === "contents") {
        const l = s.hasAttribute("style"), d = s.style.display;
        s.style.display = pe(a).display, i = s.offsetParent, s.style.display = d, l || s.removeAttribute("style");
      }
      a = s, e !== i && (e = i, r = !0);
    } else if (Me(a) && a.host && r)
      break;
    a = Me(a) && a.host || a.parentNode;
  }
  return e;
}
function bi(t) {
  let e = Po(t);
  for (Me(e) && (e = e.host); fe(e) && !["html", "body"].includes(ke(e)); ) {
    if ($o(e))
      return e;
    {
      const a = e.parentNode;
      e = Me(a) ? a.host : a;
    }
  }
  return null;
}
function Vt(t) {
  const e = be(t);
  let a = Yr(t);
  for (; a && ui(a) && pe(a).position === "static"; )
    a = Yr(a);
  return a && (ke(a) === "html" || ke(a) === "body" && pe(a).position === "static" && !$o(a)) ? e : a || bi(t) || e;
}
function Zr(t) {
  if (fe(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = we(t);
  return {
    width: e.width,
    height: e.height
  };
}
function vi(t) {
  let {
    rect: e,
    offsetParent: a,
    strategy: r
  } = t;
  const s = fe(a), i = Se(a);
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
  if ((s || !s && r !== "fixed") && ((ke(a) !== "body" || ht(i)) && (l = yt(a)), fe(a))) {
    const n = we(a, !0);
    d.x = n.x + a.clientLeft, d.y = n.y + a.clientTop;
  }
  return {
    ...e,
    x: e.x - l.scrollLeft + d.x,
    y: e.y - l.scrollTop + d.y
  };
}
function zi(t, e) {
  const a = be(t), r = Se(t), s = a.visualViewport;
  let i = r.clientWidth, l = r.clientHeight, d = 0, n = 0;
  if (s) {
    i = s.width, l = s.height;
    const f = To();
    (f || !f && e === "fixed") && (d = s.offsetLeft, n = s.offsetTop);
  }
  return {
    width: i,
    height: l,
    x: d,
    y: n
  };
}
function xi(t) {
  var e;
  const a = Se(t), r = yt(t), s = (e = t.ownerDocument) == null ? void 0 : e.body, i = ta(a.scrollWidth, a.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), l = ta(a.scrollHeight, a.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0);
  let d = -r.scrollLeft + Fo(t);
  const n = -r.scrollTop;
  return pe(s || a).direction === "rtl" && (d += ta(a.clientWidth, s ? s.clientWidth : 0) - i), {
    width: i,
    height: l,
    x: d,
    y: n
  };
}
function Ro(t) {
  const e = Po(t);
  return ["html", "body", "#document"].includes(ke(e)) ? t.ownerDocument.body : fe(e) && ht(e) ? e : Ro(e);
}
function qa(t, e) {
  var a;
  e === void 0 && (e = []);
  const r = Ro(t), s = r === ((a = t.ownerDocument) == null ? void 0 : a.body), i = be(r), l = s ? [i].concat(i.visualViewport || [], ht(r) ? r : []) : r, d = e.concat(l);
  return s ? d : d.concat(qa(l));
}
function ji(t, e) {
  const a = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (a && Me(a)) {
    let r = e;
    do {
      if (r && t === r)
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ci(t, e) {
  const a = we(t, !1, e === "fixed"), r = a.top + t.clientTop, s = a.left + t.clientLeft;
  return {
    top: r,
    left: s,
    x: s,
    y: r,
    right: s + t.clientWidth,
    bottom: r + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight
  };
}
function eo(t, e, a) {
  return e === "viewport" ? Pa(zi(t, a)) : Ee(e) ? Ci(e, a) : Pa(xi(Se(t)));
}
function Ei(t) {
  const e = qa(t), a = ["absolute", "fixed"].includes(pe(t).position) && fe(t) ? Vt(t) : t;
  return Ee(a) ? e.filter((r) => Ee(r) && ji(r, a) && ke(r) !== "body") : [];
}
function Si(t) {
  let {
    element: e,
    boundary: a,
    rootBoundary: r,
    strategy: s
  } = t;
  const i = [...a === "clippingAncestors" ? Ei(e) : [].concat(a), r], l = i[0], d = i.reduce((n, f) => {
    const h = eo(e, f, s);
    return n.top = ta(h.top, n.top), n.right = Jr(h.right, n.right), n.bottom = Jr(h.bottom, n.bottom), n.left = ta(h.left, n.left), n;
  }, eo(e, l, s));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
const Ai = {
  getClippingRect: Si,
  convertOffsetParentRelativeRectToViewportRelativeRect: vi,
  isElement: Ee,
  getDimensions: Zr,
  getOffsetParent: Vt,
  getDocumentElement: Se,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: a,
      strategy: r
    } = t;
    return {
      reference: ki(e, Vt(a), r),
      floating: {
        ...Zr(a),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => pe(t).direction === "rtl"
};
function Li(t, e, a, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: i = !0,
    elementResize: l = !0,
    animationFrame: d = !1
  } = r, n = s && !d, f = i && !d, h = n || f ? [...Ee(t) ? qa(t) : [], ...qa(e)] : [];
  h.forEach((k) => {
    n && k.addEventListener("scroll", a, {
      passive: !0
    }), f && k.addEventListener("resize", a);
  });
  let p = null;
  if (l) {
    let k = !0;
    p = new ResizeObserver(() => {
      k || a(), k = !1;
    }), Ee(t) && !d && p.observe(t), p.observe(e);
  }
  let c, y = d ? we(t) : null;
  d && u();
  function u() {
    const k = we(t);
    y && (k.x !== y.x || k.y !== y.y || k.width !== y.width || k.height !== y.height) && a(), y = k, c = requestAnimationFrame(u);
  }
  return a(), () => {
    var k;
    h.forEach((x) => {
      n && x.removeEventListener("scroll", a), f && x.removeEventListener("resize", a);
    }), (k = p) == null || k.disconnect(), p = null, d && cancelAnimationFrame(c);
  };
}
const $i = (t, e, a) => ai(t, e, {
  platform: Ai,
  ...a
});
async function Ti(t, e, a, r) {
  if (!r)
    throw new Error("Must provide a positioning option");
  return await (typeof r == "string" ? Fi(t, e, a, r) : Pi(e, r));
}
async function Fi(t, e, a, r) {
  if (!a)
    throw new Error("Reference element is required for relative positioning");
  let s;
  return r === "auto" ? s = {
    middleware: [
      pi(),
      Qr(),
      Xr({ mainAxis: 5, crossAxis: 12 })
    ]
  } : s = {
    placement: r,
    middleware: [
      hi(),
      Qr(),
      Xr(5)
    ]
  }, Li(a, e, async () => {
    if ((!a.isConnected || !a.offsetParent) && Ri(t))
      return;
    const { x: i, y: l } = await $i(a, e, s);
    Object.assign(e.style, {
      position: "absolute",
      left: `${i}px`,
      top: `${l}px`
    });
  });
}
function Pi(t, e) {
  return t.style.position = "fixed", Object.entries(e).forEach(([a, r]) => {
    t.style[a] = r;
  }), () => {
  };
}
function Ri(t) {
  switch (t.options.onPositionLost) {
    case "close":
      return t.close(), !0;
    case "destroy":
      return t.destroy(), !0;
    case "hold":
      return !0;
  }
}
const Ii = {
  hideOnClickOutside: !0,
  hideOnEmojiSelect: !0,
  hideOnEscape: !0,
  position: "auto",
  showCloseButton: !0,
  onPositionLost: "none"
};
function qi(t = {}) {
  return {
    ...Ii,
    rootElement: document.body,
    ...t
  };
}
const Oi = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>', ao = ee(
  "popupContainer",
  "closeButton"
);
class Di {
  constructor(e, a) {
    this.isOpen = !1, this.externalEvents = new pt(), this.options = { ...qi(a), ...zo(e) }, this.popupEl = document.createElement("div"), this.popupEl.classList.add(ao.popupContainer), this.popupEl.classList.add(this.options.theme), a.className && this.popupEl.classList.add(a.className), this.options.showCloseButton && (this.closeButton = document.createElement("button"), this.closeButton.type = "button", this.closeButton.classList.add(ao.closeButton), this.closeButton.innerHTML = Oi, this.closeButton.addEventListener("click", () => {
      this.close();
    }), this.popupEl.appendChild(this.closeButton));
    const r = document.createElement("div");
    this.popupEl.appendChild(r), this.picker = ei({ ...this.options, rootElement: r }), this.focusTrap = new wo(), this.picker.addEventListener("data:ready", () => {
      this.focusTrap.activate(this.picker.el), this.picker.setInitialFocus();
    }), this.options.hideOnEmojiSelect && this.picker.addEventListener("emoji:select", () => {
      var s;
      this.close(), (s = this.triggerElement) == null || s.focus();
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
    (e = this.positionCleanup) == null || e.call(this), this.positionCleanup = await Ti(
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
    const r = e.target, s = (a = this.triggerElement) == null ? void 0 : a.contains(r);
    this.isOpen && !this.picker.isPickerClick(e) && !s && this.close();
  }
  animatePopup(e) {
    return qe(
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
      return qe(
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
const Mi = `.picmo__popupContainer{display:flex;flex-direction:column;position:absolute}.picmo__popupContainer .picmo__closeButton{position:absolute;opacity:0;background:transparent;border:none;z-index:1;right:0;top:0;cursor:pointer;padding:4px;align-self:flex-end;transform:translate(50%,-50%);background:#999999;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%}.picmo__popupContainer .picmo__closeButton:hover{background:var(--accent-color)}.picmo__popupContainer .picmo__closeButton svg{fill:#fff;width:1.25rem;height:1.25rem}
`, Bi = Co();
function Ni(t, e) {
  return Bi(Mi), new Di({
    autoFocus: "auto",
    ...t
  }, e);
}
var He = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ha(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Hi(t) {
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
    var s = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(a, r, s.get ? s : {
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
  function r(o) {
    return a.includes(o);
  }
  const s = [
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
  function i(o) {
    return s.includes(o);
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
  function d(o) {
    return l.includes(o);
  }
  function n(o) {
    return (_) => typeof _ === o;
  }
  const { toString: f } = Object.prototype, h = (o) => {
    const _ = f.call(o).slice(8, -1);
    if (/HTML\w+Element/.test(_) && c.domElement(o))
      return "HTMLElement";
    if (i(_))
      return _;
  }, p = (o) => (_) => h(_) === o;
  function c(o) {
    if (o === null)
      return "null";
    switch (typeof o) {
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
    if (c.observable(o))
      return "Observable";
    if (c.array(o))
      return "Array";
    if (c.buffer(o))
      return "Buffer";
    const _ = h(o);
    if (_)
      return _;
    if (o instanceof String || o instanceof Boolean || o instanceof Number)
      throw new TypeError("Please don't use object wrappers for primitive types");
    return "Object";
  }
  c.undefined = n("undefined"), c.string = n("string");
  const y = n("number");
  c.number = (o) => y(o) && !c.nan(o), c.bigint = n("bigint"), c.function_ = n("function"), c.null_ = (o) => o === null, c.class_ = (o) => c.function_(o) && o.toString().startsWith("class "), c.boolean = (o) => o === !0 || o === !1, c.symbol = n("symbol"), c.numericString = (o) => c.string(o) && !c.emptyStringOrWhitespace(o) && !Number.isNaN(Number(o)), c.array = (o, _) => Array.isArray(o) ? c.function_(_) ? o.every(_) : !0 : !1, c.buffer = (o) => {
    var _, b, T, j;
    return (j = (T = (b = (_ = o) === null || _ === void 0 ? void 0 : _.constructor) === null || b === void 0 ? void 0 : b.isBuffer) === null || T === void 0 ? void 0 : T.call(b, o)) !== null && j !== void 0 ? j : !1;
  }, c.blob = (o) => p("Blob")(o), c.nullOrUndefined = (o) => c.null_(o) || c.undefined(o), c.object = (o) => !c.null_(o) && (typeof o == "object" || c.function_(o)), c.iterable = (o) => {
    var _;
    return c.function_((_ = o) === null || _ === void 0 ? void 0 : _[Symbol.iterator]);
  }, c.asyncIterable = (o) => {
    var _;
    return c.function_((_ = o) === null || _ === void 0 ? void 0 : _[Symbol.asyncIterator]);
  }, c.generator = (o) => {
    var _, b;
    return c.iterable(o) && c.function_((_ = o) === null || _ === void 0 ? void 0 : _.next) && c.function_((b = o) === null || b === void 0 ? void 0 : b.throw);
  }, c.asyncGenerator = (o) => c.asyncIterable(o) && c.function_(o.next) && c.function_(o.throw), c.nativePromise = (o) => p("Promise")(o);
  const u = (o) => {
    var _, b;
    return c.function_((_ = o) === null || _ === void 0 ? void 0 : _.then) && c.function_((b = o) === null || b === void 0 ? void 0 : b.catch);
  };
  c.promise = (o) => c.nativePromise(o) || u(o), c.generatorFunction = p("GeneratorFunction"), c.asyncGeneratorFunction = (o) => h(o) === "AsyncGeneratorFunction", c.asyncFunction = (o) => h(o) === "AsyncFunction", c.boundFunction = (o) => c.function_(o) && !o.hasOwnProperty("prototype"), c.regExp = p("RegExp"), c.date = p("Date"), c.error = p("Error"), c.map = (o) => p("Map")(o), c.set = (o) => p("Set")(o), c.weakMap = (o) => p("WeakMap")(o), c.weakSet = (o) => p("WeakSet")(o), c.int8Array = p("Int8Array"), c.uint8Array = p("Uint8Array"), c.uint8ClampedArray = p("Uint8ClampedArray"), c.int16Array = p("Int16Array"), c.uint16Array = p("Uint16Array"), c.int32Array = p("Int32Array"), c.uint32Array = p("Uint32Array"), c.float32Array = p("Float32Array"), c.float64Array = p("Float64Array"), c.bigInt64Array = p("BigInt64Array"), c.bigUint64Array = p("BigUint64Array"), c.arrayBuffer = p("ArrayBuffer"), c.sharedArrayBuffer = p("SharedArrayBuffer"), c.dataView = p("DataView"), c.enumCase = (o, _) => Object.values(_).includes(o), c.directInstanceOf = (o, _) => Object.getPrototypeOf(o) === _.prototype, c.urlInstance = (o) => p("URL")(o), c.urlString = (o) => {
    if (!c.string(o))
      return !1;
    try {
      return new URL(o), !0;
    } catch {
      return !1;
    }
  }, c.truthy = (o) => !!o, c.falsy = (o) => !o, c.nan = (o) => Number.isNaN(o), c.primitive = (o) => c.null_(o) || d(typeof o), c.integer = (o) => Number.isInteger(o), c.safeInteger = (o) => Number.isSafeInteger(o), c.plainObject = (o) => {
    if (f.call(o) !== "[object Object]")
      return !1;
    const _ = Object.getPrototypeOf(o);
    return _ === null || _ === Object.getPrototypeOf({});
  }, c.typedArray = (o) => r(h(o));
  const k = (o) => c.safeInteger(o) && o >= 0;
  c.arrayLike = (o) => !c.nullOrUndefined(o) && !c.function_(o) && k(o.length), c.inRange = (o, _) => {
    if (c.number(_))
      return o >= Math.min(0, _) && o <= Math.max(_, 0);
    if (c.array(_) && _.length === 2)
      return o >= Math.min(..._) && o <= Math.max(..._);
    throw new TypeError(`Invalid range: ${JSON.stringify(_)}`);
  };
  const x = 1, E = [
    "innerHTML",
    "ownerDocument",
    "style",
    "attributes",
    "nodeValue"
  ];
  c.domElement = (o) => c.object(o) && o.nodeType === x && c.string(o.nodeName) && !c.plainObject(o) && E.every((_) => _ in o), c.observable = (o) => {
    var _, b, T, j;
    return o ? o === ((b = (_ = o)[Symbol.observable]) === null || b === void 0 ? void 0 : b.call(_)) || o === ((j = (T = o)["@@observable"]) === null || j === void 0 ? void 0 : j.call(T)) : !1;
  }, c.nodeStream = (o) => c.object(o) && c.function_(o.pipe) && !c.observable(o), c.infinite = (o) => o === 1 / 0 || o === -1 / 0;
  const w = (o) => (_) => c.integer(_) && Math.abs(_ % 2) === o;
  c.evenInteger = w(0), c.oddInteger = w(1), c.emptyArray = (o) => c.array(o) && o.length === 0, c.nonEmptyArray = (o) => c.array(o) && o.length > 0, c.emptyString = (o) => c.string(o) && o.length === 0;
  const S = (o) => c.string(o) && !/\S/.test(o);
  c.emptyStringOrWhitespace = (o) => c.emptyString(o) || S(o), c.nonEmptyString = (o) => c.string(o) && o.length > 0, c.nonEmptyStringAndNotWhitespace = (o) => c.string(o) && !c.emptyStringOrWhitespace(o), c.emptyObject = (o) => c.object(o) && !c.map(o) && !c.set(o) && Object.keys(o).length === 0, c.nonEmptyObject = (o) => c.object(o) && !c.map(o) && !c.set(o) && Object.keys(o).length > 0, c.emptySet = (o) => c.set(o) && o.size === 0, c.nonEmptySet = (o) => c.set(o) && o.size > 0, c.emptyMap = (o) => c.map(o) && o.size === 0, c.nonEmptyMap = (o) => c.map(o) && o.size > 0, c.propertyKey = (o) => c.any([c.string, c.number, c.symbol], o), c.formData = (o) => p("FormData")(o), c.urlSearchParams = (o) => p("URLSearchParams")(o);
  const z = (o, _, b) => {
    if (!c.function_(_))
      throw new TypeError(`Invalid predicate: ${JSON.stringify(_)}`);
    if (b.length === 0)
      throw new TypeError("Invalid number of values");
    return o.call(b, _);
  };
  c.any = (o, ..._) => (c.array(o) ? o : [o]).some((T) => z(Array.prototype.some, T, _)), c.all = (o, ..._) => z(Array.prototype.every, o, _);
  const g = (o, _, b, T = {}) => {
    if (!o) {
      const { multipleValues: j } = T, F = j ? `received values of types ${[
        ...new Set(b.map((q) => `\`${c(q)}\``))
      ].join(", ")}` : `received value of type \`${c(b)}\``;
      throw new TypeError(`Expected value which is \`${_}\`, ${F}.`);
    }
  };
  e.assert = {
    // Unknowns.
    undefined: (o) => g(c.undefined(o), "undefined", o),
    string: (o) => g(c.string(o), "string", o),
    number: (o) => g(c.number(o), "number", o),
    bigint: (o) => g(c.bigint(o), "bigint", o),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (o) => g(c.function_(o), "Function", o),
    null_: (o) => g(c.null_(o), "null", o),
    class_: (o) => g(c.class_(o), "Class", o),
    boolean: (o) => g(c.boolean(o), "boolean", o),
    symbol: (o) => g(c.symbol(o), "symbol", o),
    numericString: (o) => g(c.numericString(o), "string with a number", o),
    array: (o, _) => {
      g(c.array(o), "Array", o), _ && o.forEach(_);
    },
    buffer: (o) => g(c.buffer(o), "Buffer", o),
    blob: (o) => g(c.blob(o), "Blob", o),
    nullOrUndefined: (o) => g(c.nullOrUndefined(o), "null or undefined", o),
    object: (o) => g(c.object(o), "Object", o),
    iterable: (o) => g(c.iterable(o), "Iterable", o),
    asyncIterable: (o) => g(c.asyncIterable(o), "AsyncIterable", o),
    generator: (o) => g(c.generator(o), "Generator", o),
    asyncGenerator: (o) => g(c.asyncGenerator(o), "AsyncGenerator", o),
    nativePromise: (o) => g(c.nativePromise(o), "native Promise", o),
    promise: (o) => g(c.promise(o), "Promise", o),
    generatorFunction: (o) => g(c.generatorFunction(o), "GeneratorFunction", o),
    asyncGeneratorFunction: (o) => g(c.asyncGeneratorFunction(o), "AsyncGeneratorFunction", o),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (o) => g(c.asyncFunction(o), "AsyncFunction", o),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (o) => g(c.boundFunction(o), "Function", o),
    regExp: (o) => g(c.regExp(o), "RegExp", o),
    date: (o) => g(c.date(o), "Date", o),
    error: (o) => g(c.error(o), "Error", o),
    map: (o) => g(c.map(o), "Map", o),
    set: (o) => g(c.set(o), "Set", o),
    weakMap: (o) => g(c.weakMap(o), "WeakMap", o),
    weakSet: (o) => g(c.weakSet(o), "WeakSet", o),
    int8Array: (o) => g(c.int8Array(o), "Int8Array", o),
    uint8Array: (o) => g(c.uint8Array(o), "Uint8Array", o),
    uint8ClampedArray: (o) => g(c.uint8ClampedArray(o), "Uint8ClampedArray", o),
    int16Array: (o) => g(c.int16Array(o), "Int16Array", o),
    uint16Array: (o) => g(c.uint16Array(o), "Uint16Array", o),
    int32Array: (o) => g(c.int32Array(o), "Int32Array", o),
    uint32Array: (o) => g(c.uint32Array(o), "Uint32Array", o),
    float32Array: (o) => g(c.float32Array(o), "Float32Array", o),
    float64Array: (o) => g(c.float64Array(o), "Float64Array", o),
    bigInt64Array: (o) => g(c.bigInt64Array(o), "BigInt64Array", o),
    bigUint64Array: (o) => g(c.bigUint64Array(o), "BigUint64Array", o),
    arrayBuffer: (o) => g(c.arrayBuffer(o), "ArrayBuffer", o),
    sharedArrayBuffer: (o) => g(c.sharedArrayBuffer(o), "SharedArrayBuffer", o),
    dataView: (o) => g(c.dataView(o), "DataView", o),
    enumCase: (o, _) => g(c.enumCase(o, _), "EnumCase", o),
    urlInstance: (o) => g(c.urlInstance(o), "URL", o),
    urlString: (o) => g(c.urlString(o), "string with a URL", o),
    truthy: (o) => g(c.truthy(o), "truthy", o),
    falsy: (o) => g(c.falsy(o), "falsy", o),
    nan: (o) => g(c.nan(o), "NaN", o),
    primitive: (o) => g(c.primitive(o), "primitive", o),
    integer: (o) => g(c.integer(o), "integer", o),
    safeInteger: (o) => g(c.safeInteger(o), "integer", o),
    plainObject: (o) => g(c.plainObject(o), "plain object", o),
    typedArray: (o) => g(c.typedArray(o), "TypedArray", o),
    arrayLike: (o) => g(c.arrayLike(o), "array-like", o),
    domElement: (o) => g(c.domElement(o), "HTMLElement", o),
    observable: (o) => g(c.observable(o), "Observable", o),
    nodeStream: (o) => g(c.nodeStream(o), "Node.js Stream", o),
    infinite: (o) => g(c.infinite(o), "infinite number", o),
    emptyArray: (o) => g(c.emptyArray(o), "empty array", o),
    nonEmptyArray: (o) => g(c.nonEmptyArray(o), "non-empty array", o),
    emptyString: (o) => g(c.emptyString(o), "empty string", o),
    emptyStringOrWhitespace: (o) => g(c.emptyStringOrWhitespace(o), "empty string or whitespace", o),
    nonEmptyString: (o) => g(c.nonEmptyString(o), "non-empty string", o),
    nonEmptyStringAndNotWhitespace: (o) => g(c.nonEmptyStringAndNotWhitespace(o), "non-empty string and not whitespace", o),
    emptyObject: (o) => g(c.emptyObject(o), "empty object", o),
    nonEmptyObject: (o) => g(c.nonEmptyObject(o), "non-empty object", o),
    emptySet: (o) => g(c.emptySet(o), "empty set", o),
    nonEmptySet: (o) => g(c.nonEmptySet(o), "non-empty set", o),
    emptyMap: (o) => g(c.emptyMap(o), "empty map", o),
    nonEmptyMap: (o) => g(c.nonEmptyMap(o), "non-empty map", o),
    propertyKey: (o) => g(c.propertyKey(o), "PropertyKey", o),
    formData: (o) => g(c.formData(o), "FormData", o),
    urlSearchParams: (o) => g(c.urlSearchParams(o), "URLSearchParams", o),
    // Numbers.
    evenInteger: (o) => g(c.evenInteger(o), "even integer", o),
    oddInteger: (o) => g(c.oddInteger(o), "odd integer", o),
    // Two arguments.
    directInstanceOf: (o, _) => g(c.directInstanceOf(o, _), "T", o),
    inRange: (o, _) => g(c.inRange(o, _), "in range", o),
    // Variadic functions.
    any: (o, ..._) => g(c.any(o, ..._), "predicate returns truthy for any value", _, { multipleValues: !0 }),
    all: (o, ..._) => g(c.all(o, ..._), "predicate returns truthy for all values", _, { multipleValues: !0 })
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
var Be = Wt.exports;
const Qe = /* @__PURE__ */ ha(Be), Ui = {
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
}, Vi = {
  keywords: [
    "face",
    "grimace",
    "teeth"
  ],
  char: "😬",
  fitzpatrick_scale: !1,
  category: "people"
}, Wi = {
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
}, Ki = {
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
}, Gi = {
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
}, Xi = {
  keywords: [
    "face",
    "celebration",
    "woohoo"
  ],
  char: "🥳",
  fitzpatrick_scale: !1,
  category: "people"
}, Qi = {
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
}, Ji = {
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
}, Yi = {
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
}, Zi = {
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
}, en = {
  keywords: [
    "face",
    "angel",
    "heaven",
    "halo"
  ],
  char: "😇",
  fitzpatrick_scale: !1,
  category: "people"
}, an = {
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
}, tn = {
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
}, rn = {
  keywords: [
    "face",
    "smile"
  ],
  char: "🙂",
  fitzpatrick_scale: !1,
  category: "people"
}, on = {
  keywords: [
    "face",
    "flipped",
    "silly",
    "smile"
  ],
  char: "🙃",
  fitzpatrick_scale: !1,
  category: "people"
}, sn = {
  keywords: [
    "face",
    "blush",
    "massage",
    "happiness"
  ],
  char: "☺️",
  fitzpatrick_scale: !1,
  category: "people"
}, cn = {
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
}, nn = {
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
}, ln = {
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
}, dn = {
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
}, pn = {
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
}, fn = {
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
}, hn = {
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
}, yn = {
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
}, gn = {
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
}, _n = {
  keywords: [
    "face",
    "goofy",
    "crazy"
  ],
  char: "🤪",
  fitzpatrick_scale: !1,
  category: "people"
}, un = {
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
}, mn = {
  keywords: [
    "face",
    "stuffy",
    "wealthy"
  ],
  char: "🧐",
  fitzpatrick_scale: !1,
  category: "people"
}, kn = {
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
}, wn = {
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
}, bn = {
  keywords: [
    "face",
    "rich",
    "dollar",
    "money"
  ],
  char: "🤑",
  fitzpatrick_scale: !1,
  category: "people"
}, vn = {
  keywords: [
    "face",
    "nerdy",
    "geek",
    "dork"
  ],
  char: "🤓",
  fitzpatrick_scale: !1,
  category: "people"
}, zn = {
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
}, xn = {
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
}, jn = {
  keywords: [
    "face"
  ],
  char: "🤡",
  fitzpatrick_scale: !1,
  category: "people"
}, Cn = {
  keywords: [
    "face",
    "cowgirl",
    "hat"
  ],
  char: "🤠",
  fitzpatrick_scale: !1,
  category: "people"
}, En = {
  keywords: [
    "face",
    "smile",
    "hug"
  ],
  char: "🤗",
  fitzpatrick_scale: !1,
  category: "people"
}, Sn = {
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
}, An = {
  keywords: [
    "face",
    "hellokitty"
  ],
  char: "😶",
  fitzpatrick_scale: !1,
  category: "people"
}, Ln = {
  keywords: [
    "indifference",
    "meh",
    ":|",
    "neutral"
  ],
  char: "😐",
  fitzpatrick_scale: !1,
  category: "people"
}, $n = {
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
}, Tn = {
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
}, Fn = {
  keywords: [
    "face",
    "eyeroll",
    "frustrated"
  ],
  char: "🙄",
  fitzpatrick_scale: !1,
  category: "people"
}, Pn = {
  keywords: [
    "face",
    "hmmm",
    "think",
    "consider"
  ],
  char: "🤔",
  fitzpatrick_scale: !1,
  category: "people"
}, Rn = {
  keywords: [
    "face",
    "lie",
    "pinocchio"
  ],
  char: "🤥",
  fitzpatrick_scale: !1,
  category: "people"
}, In = {
  keywords: [
    "face",
    "whoops",
    "shock",
    "surprise"
  ],
  char: "🤭",
  fitzpatrick_scale: !1,
  category: "people"
}, qn = {
  keywords: [
    "face",
    "quiet",
    "shhh"
  ],
  char: "🤫",
  fitzpatrick_scale: !1,
  category: "people"
}, On = {
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
}, Dn = {
  keywords: [
    "face",
    "shocked",
    "mind",
    "blown"
  ],
  char: "🤯",
  fitzpatrick_scale: !1,
  category: "people"
}, Mn = {
  keywords: [
    "face",
    "blush",
    "shy",
    "flattered"
  ],
  char: "😳",
  fitzpatrick_scale: !1,
  category: "people"
}, Bn = {
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
}, Nn = {
  keywords: [
    "face",
    "concern",
    "nervous",
    ":("
  ],
  char: "😟",
  fitzpatrick_scale: !1,
  category: "people"
}, Hn = {
  keywords: [
    "mad",
    "face",
    "annoyed",
    "frustrated"
  ],
  char: "😠",
  fitzpatrick_scale: !1,
  category: "people"
}, Un = {
  keywords: [
    "angry",
    "mad",
    "hate",
    "despise"
  ],
  char: "😡",
  fitzpatrick_scale: !1,
  category: "people"
}, Vn = {
  keywords: [
    "face",
    "sad",
    "depressed",
    "upset"
  ],
  char: "😔",
  fitzpatrick_scale: !1,
  category: "people"
}, Wn = {
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
}, Kn = {
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
}, Gn = {
  keywords: [
    "face",
    "sad",
    "upset",
    "frown"
  ],
  char: "☹",
  fitzpatrick_scale: !1,
  category: "people"
}, Xn = {
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
}, Qn = {
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
}, Jn = {
  keywords: [
    "sick",
    "whine",
    "upset",
    "frustrated"
  ],
  char: "😫",
  fitzpatrick_scale: !1,
  category: "people"
}, Yn = {
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
}, Zn = {
  keywords: [
    "face",
    "begging",
    "mercy"
  ],
  char: "🥺",
  fitzpatrick_scale: !1,
  category: "people"
}, el = {
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
}, al = {
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
}, tl = {
  keywords: [
    "face",
    "munch",
    "scared",
    "omg"
  ],
  char: "😱",
  fitzpatrick_scale: !1,
  category: "people"
}, rl = {
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
}, ol = {
  keywords: [
    "face",
    "nervous",
    "sweat"
  ],
  char: "😰",
  fitzpatrick_scale: !1,
  category: "people"
}, sl = {
  keywords: [
    "face",
    "woo",
    "shh"
  ],
  char: "😯",
  fitzpatrick_scale: !1,
  category: "people"
}, cl = {
  keywords: [
    "face",
    "aw",
    "what"
  ],
  char: "😦",
  fitzpatrick_scale: !1,
  category: "people"
}, il = {
  keywords: [
    "face",
    "stunned",
    "nervous"
  ],
  char: "😧",
  fitzpatrick_scale: !1,
  category: "people"
}, nl = {
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
}, ll = {
  keywords: [
    "face",
    "phew",
    "sweat",
    "nervous"
  ],
  char: "😥",
  fitzpatrick_scale: !1,
  category: "people"
}, dl = {
  keywords: [
    "face"
  ],
  char: "🤤",
  fitzpatrick_scale: !1,
  category: "people"
}, pl = {
  keywords: [
    "face",
    "tired",
    "rest",
    "nap"
  ],
  char: "😪",
  fitzpatrick_scale: !1,
  category: "people"
}, fl = {
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
}, hl = {
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
}, yl = {
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
}, gl = {
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
}, _l = {
  keywords: [
    "spent",
    "unconscious",
    "xox",
    "dizzy"
  ],
  char: "😵",
  fitzpatrick_scale: !1,
  category: "people"
}, ul = {
  keywords: [
    "face",
    "xox",
    "surprised",
    "poisoned"
  ],
  char: "😲",
  fitzpatrick_scale: !1,
  category: "people"
}, ml = {
  keywords: [
    "face",
    "sealed",
    "zipper",
    "secret"
  ],
  char: "🤐",
  fitzpatrick_scale: !1,
  category: "people"
}, kl = {
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
}, wl = {
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
}, bl = {
  keywords: [
    "face",
    "sick"
  ],
  char: "🤮",
  fitzpatrick_scale: !1,
  category: "people"
}, vl = {
  keywords: [
    "face",
    "sick",
    "ill",
    "disease"
  ],
  char: "😷",
  fitzpatrick_scale: !1,
  category: "people"
}, zl = {
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
}, xl = {
  keywords: [
    "injured",
    "clumsy",
    "bandage",
    "hurt"
  ],
  char: "🤕",
  fitzpatrick_scale: !1,
  category: "people"
}, jl = {
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
}, Cl = {
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
}, El = {
  keywords: [
    "sleepy",
    "tired",
    "dream"
  ],
  char: "💤",
  fitzpatrick_scale: !1,
  category: "people"
}, Sl = {
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
}, Al = {
  keywords: [
    "devil",
    "horns"
  ],
  char: "😈",
  fitzpatrick_scale: !1,
  category: "people"
}, Ll = {
  keywords: [
    "devil",
    "angry",
    "horns"
  ],
  char: "👿",
  fitzpatrick_scale: !1,
  category: "people"
}, $l = {
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
}, Tl = {
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
}, Fl = {
  keywords: [
    "dead",
    "skeleton",
    "creepy",
    "death"
  ],
  char: "💀",
  fitzpatrick_scale: !1,
  category: "people"
}, Pl = {
  keywords: [
    "halloween",
    "spooky",
    "scary"
  ],
  char: "👻",
  fitzpatrick_scale: !1,
  category: "people"
}, Rl = {
  keywords: [
    "UFO",
    "paul",
    "weird",
    "outer_space"
  ],
  char: "👽",
  fitzpatrick_scale: !1,
  category: "people"
}, Il = {
  keywords: [
    "computer",
    "machine",
    "bot"
  ],
  char: "🤖",
  fitzpatrick_scale: !1,
  category: "people"
}, ql = {
  keywords: [
    "animal",
    "cats",
    "happy",
    "smile"
  ],
  char: "😺",
  fitzpatrick_scale: !1,
  category: "people"
}, Ol = {
  keywords: [
    "animal",
    "cats",
    "smile"
  ],
  char: "😸",
  fitzpatrick_scale: !1,
  category: "people"
}, Dl = {
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
}, Ml = {
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
}, Bl = {
  keywords: [
    "animal",
    "cats",
    "smirk"
  ],
  char: "😼",
  fitzpatrick_scale: !1,
  category: "people"
}, Nl = {
  keywords: [
    "animal",
    "cats",
    "kiss"
  ],
  char: "😽",
  fitzpatrick_scale: !1,
  category: "people"
}, Hl = {
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
}, Ul = {
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
}, Vl = {
  keywords: [
    "animal",
    "cats"
  ],
  char: "😾",
  fitzpatrick_scale: !1,
  category: "people"
}, Wl = {
  keywords: [
    "hands",
    "gesture",
    "cupped",
    "prayer"
  ],
  char: "🤲",
  fitzpatrick_scale: !0,
  category: "people"
}, Kl = {
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
}, Gl = {
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
}, Xl = {
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
}, Ql = {
  keywords: [
    "hands",
    "gesture"
  ],
  char: "🤙",
  fitzpatrick_scale: !0,
  category: "people"
}, Jl = {
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
}, Yl = {
  keywords: [
    "fingers",
    "hand",
    "grasp"
  ],
  char: "✊",
  fitzpatrick_scale: !0,
  category: "people"
}, Zl = {
  keywords: [
    "hand",
    "fistbump"
  ],
  char: "🤛",
  fitzpatrick_scale: !0,
  category: "people"
}, ed = {
  keywords: [
    "hand",
    "fistbump"
  ],
  char: "🤜",
  fitzpatrick_scale: !0,
  category: "people"
}, ad = {
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
}, td = {
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
}, rd = {
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
}, od = {
  keywords: [
    "fingers",
    "raised",
    "backhand"
  ],
  char: "🤚",
  fitzpatrick_scale: !0,
  category: "people"
}, sd = {
  keywords: [
    "fingers",
    "butterfly",
    "hands",
    "open"
  ],
  char: "👐",
  fitzpatrick_scale: !0,
  category: "people"
}, cd = {
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
}, id = {
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
}, nd = {
  keywords: [
    "kick",
    "stomp"
  ],
  char: "🦶",
  fitzpatrick_scale: !0,
  category: "people"
}, ld = {
  keywords: [
    "kick",
    "limb"
  ],
  char: "🦵",
  fitzpatrick_scale: !0,
  category: "people"
}, dd = {
  keywords: [
    "agreement",
    "shake"
  ],
  char: "🤝",
  fitzpatrick_scale: !1,
  category: "people"
}, pd = {
  keywords: [
    "hand",
    "fingers",
    "direction",
    "up"
  ],
  char: "☝",
  fitzpatrick_scale: !0,
  category: "people"
}, fd = {
  keywords: [
    "fingers",
    "hand",
    "direction",
    "up"
  ],
  char: "👆",
  fitzpatrick_scale: !0,
  category: "people"
}, hd = {
  keywords: [
    "fingers",
    "hand",
    "direction",
    "down"
  ],
  char: "👇",
  fitzpatrick_scale: !0,
  category: "people"
}, yd = {
  keywords: [
    "direction",
    "fingers",
    "hand",
    "left"
  ],
  char: "👈",
  fitzpatrick_scale: !0,
  category: "people"
}, gd = {
  keywords: [
    "fingers",
    "hand",
    "direction",
    "right"
  ],
  char: "👉",
  fitzpatrick_scale: !0,
  category: "people"
}, _d = {
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
}, ud = {
  keywords: [
    "hand",
    "fingers",
    "palm"
  ],
  char: "🖐",
  fitzpatrick_scale: !0,
  category: "people"
}, md = {
  keywords: [
    "hand",
    "fingers",
    "gesture"
  ],
  char: "🤟",
  fitzpatrick_scale: !0,
  category: "people"
}, kd = {
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
}, wd = {
  keywords: [
    "good",
    "lucky"
  ],
  char: "🤞",
  fitzpatrick_scale: !0,
  category: "people"
}, bd = {
  keywords: [
    "hand",
    "fingers",
    "spock",
    "star trek"
  ],
  char: "🖖",
  fitzpatrick_scale: !0,
  category: "people"
}, vd = {
  keywords: [
    "lower_left_ballpoint_pen",
    "stationery",
    "write",
    "compose"
  ],
  char: "✍",
  fitzpatrick_scale: !0,
  category: "people"
}, zd = {
  keywords: [
    "camera",
    "phone"
  ],
  char: "🤳",
  fitzpatrick_scale: !0,
  category: "people"
}, xd = {
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
}, jd = {
  keywords: [
    "mouth",
    "kiss"
  ],
  char: "👄",
  fitzpatrick_scale: !1,
  category: "people"
}, Cd = {
  keywords: [
    "teeth",
    "dentist"
  ],
  char: "🦷",
  fitzpatrick_scale: !1,
  category: "people"
}, Ed = {
  keywords: [
    "mouth",
    "playful"
  ],
  char: "👅",
  fitzpatrick_scale: !1,
  category: "people"
}, Sd = {
  keywords: [
    "face",
    "hear",
    "sound",
    "listen"
  ],
  char: "👂",
  fitzpatrick_scale: !0,
  category: "people"
}, Ad = {
  keywords: [
    "smell",
    "sniff"
  ],
  char: "👃",
  fitzpatrick_scale: !0,
  category: "people"
}, Ld = {
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
}, $d = {
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
}, Td = {
  keywords: [
    "smart",
    "intelligent"
  ],
  char: "🧠",
  fitzpatrick_scale: !1,
  category: "people"
}, Fd = {
  keywords: [
    "user",
    "person",
    "human"
  ],
  char: "👤",
  fitzpatrick_scale: !1,
  category: "people"
}, Pd = {
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
}, Rd = {
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
}, Id = {
  keywords: [
    "child",
    "boy",
    "girl",
    "toddler"
  ],
  char: "👶",
  fitzpatrick_scale: !0,
  category: "people"
}, qd = {
  keywords: [
    "gender-neutral",
    "young"
  ],
  char: "🧒",
  fitzpatrick_scale: !0,
  category: "people"
}, Od = {
  keywords: [
    "man",
    "male",
    "guy",
    "teenager"
  ],
  char: "👦",
  fitzpatrick_scale: !0,
  category: "people"
}, Dd = {
  keywords: [
    "female",
    "woman",
    "teenager"
  ],
  char: "👧",
  fitzpatrick_scale: !0,
  category: "people"
}, Md = {
  keywords: [
    "gender-neutral",
    "person"
  ],
  char: "🧑",
  fitzpatrick_scale: !0,
  category: "people"
}, Bd = {
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
}, Nd = {
  keywords: [
    "female",
    "girls",
    "lady"
  ],
  char: "👩",
  fitzpatrick_scale: !0,
  category: "people"
}, Hd = {
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
}, Ud = {
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
}, Vd = {
  keywords: [
    "person",
    "bewhiskered"
  ],
  char: "🧔",
  fitzpatrick_scale: !0,
  category: "people"
}, Wd = {
  keywords: [
    "human",
    "elder",
    "senior",
    "gender-neutral"
  ],
  char: "🧓",
  fitzpatrick_scale: !0,
  category: "people"
}, Kd = {
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
}, Gd = {
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
}, Xd = {
  keywords: [
    "male",
    "boy",
    "chinese"
  ],
  char: "👲",
  fitzpatrick_scale: !0,
  category: "people"
}, Qd = {
  keywords: [
    "female",
    "hijab",
    "mantilla",
    "tichel"
  ],
  char: "🧕",
  fitzpatrick_scale: !0,
  category: "people"
}, Jd = {
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
}, Yd = {
  keywords: [
    "male",
    "indian",
    "hinduism",
    "arabs"
  ],
  char: "👳",
  fitzpatrick_scale: !0,
  category: "people"
}, Zd = {
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
}, ep = {
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
}, ap = {
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
}, tp = {
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
}, rp = {
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
}, op = {
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
}, sp = {
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
}, cp = {
  keywords: [
    "human",
    "spy",
    "detective"
  ],
  char: "🕵",
  fitzpatrick_scale: !0,
  category: "people"
}, ip = {
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
}, np = {
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
}, lp = {
  keywords: [
    "rancher",
    "gardener",
    "woman",
    "human"
  ],
  char: "👩‍🌾",
  fitzpatrick_scale: !0,
  category: "people"
}, dp = {
  keywords: [
    "rancher",
    "gardener",
    "man",
    "human"
  ],
  char: "👨‍🌾",
  fitzpatrick_scale: !0,
  category: "people"
}, pp = {
  keywords: [
    "chef",
    "woman",
    "human"
  ],
  char: "👩‍🍳",
  fitzpatrick_scale: !0,
  category: "people"
}, fp = {
  keywords: [
    "chef",
    "man",
    "human"
  ],
  char: "👨‍🍳",
  fitzpatrick_scale: !0,
  category: "people"
}, hp = {
  keywords: [
    "graduate",
    "woman",
    "human"
  ],
  char: "👩‍🎓",
  fitzpatrick_scale: !0,
  category: "people"
}, yp = {
  keywords: [
    "graduate",
    "man",
    "human"
  ],
  char: "👨‍🎓",
  fitzpatrick_scale: !0,
  category: "people"
}, gp = {
  keywords: [
    "rockstar",
    "entertainer",
    "woman",
    "human"
  ],
  char: "👩‍🎤",
  fitzpatrick_scale: !0,
  category: "people"
}, _p = {
  keywords: [
    "rockstar",
    "entertainer",
    "man",
    "human"
  ],
  char: "👨‍🎤",
  fitzpatrick_scale: !0,
  category: "people"
}, up = {
  keywords: [
    "instructor",
    "professor",
    "woman",
    "human"
  ],
  char: "👩‍🏫",
  fitzpatrick_scale: !0,
  category: "people"
}, mp = {
  keywords: [
    "instructor",
    "professor",
    "man",
    "human"
  ],
  char: "👨‍🏫",
  fitzpatrick_scale: !0,
  category: "people"
}, kp = {
  keywords: [
    "assembly",
    "industrial",
    "woman",
    "human"
  ],
  char: "👩‍🏭",
  fitzpatrick_scale: !0,
  category: "people"
}, wp = {
  keywords: [
    "assembly",
    "industrial",
    "man",
    "human"
  ],
  char: "👨‍🏭",
  fitzpatrick_scale: !0,
  category: "people"
}, bp = {
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
}, vp = {
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
}, zp = {
  keywords: [
    "business",
    "manager",
    "woman",
    "human"
  ],
  char: "👩‍💼",
  fitzpatrick_scale: !0,
  category: "people"
}, xp = {
  keywords: [
    "business",
    "manager",
    "man",
    "human"
  ],
  char: "👨‍💼",
  fitzpatrick_scale: !0,
  category: "people"
}, jp = {
  keywords: [
    "plumber",
    "woman",
    "human",
    "wrench"
  ],
  char: "👩‍🔧",
  fitzpatrick_scale: !0,
  category: "people"
}, Cp = {
  keywords: [
    "plumber",
    "man",
    "human",
    "wrench"
  ],
  char: "👨‍🔧",
  fitzpatrick_scale: !0,
  category: "people"
}, Ep = {
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
}, Sp = {
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
}, Ap = {
  keywords: [
    "painter",
    "woman",
    "human"
  ],
  char: "👩‍🎨",
  fitzpatrick_scale: !0,
  category: "people"
}, Lp = {
  keywords: [
    "painter",
    "man",
    "human"
  ],
  char: "👨‍🎨",
  fitzpatrick_scale: !0,
  category: "people"
}, $p = {
  keywords: [
    "fireman",
    "woman",
    "human"
  ],
  char: "👩‍🚒",
  fitzpatrick_scale: !0,
  category: "people"
}, Tp = {
  keywords: [
    "fireman",
    "man",
    "human"
  ],
  char: "👨‍🚒",
  fitzpatrick_scale: !0,
  category: "people"
}, Fp = {
  keywords: [
    "aviator",
    "plane",
    "woman",
    "human"
  ],
  char: "👩‍✈️",
  fitzpatrick_scale: !0,
  category: "people"
}, Pp = {
  keywords: [
    "aviator",
    "plane",
    "man",
    "human"
  ],
  char: "👨‍✈️",
  fitzpatrick_scale: !0,
  category: "people"
}, Rp = {
  keywords: [
    "space",
    "rocket",
    "woman",
    "human"
  ],
  char: "👩‍🚀",
  fitzpatrick_scale: !0,
  category: "people"
}, Ip = {
  keywords: [
    "space",
    "rocket",
    "man",
    "human"
  ],
  char: "👨‍🚀",
  fitzpatrick_scale: !0,
  category: "people"
}, qp = {
  keywords: [
    "justice",
    "court",
    "woman",
    "human"
  ],
  char: "👩‍⚖️",
  fitzpatrick_scale: !0,
  category: "people"
}, Op = {
  keywords: [
    "justice",
    "court",
    "man",
    "human"
  ],
  char: "👨‍⚖️",
  fitzpatrick_scale: !0,
  category: "people"
}, Dp = {
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
}, Mp = {
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
}, Bp = {
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
}, Np = {
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
}, Hp = {
  keywords: [
    "woman",
    "female",
    "xmas",
    "mother christmas"
  ],
  char: "🤶",
  fitzpatrick_scale: !0,
  category: "people"
}, Up = {
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
}, Vp = {
  keywords: [
    "woman",
    "female",
    "mage",
    "witch"
  ],
  char: "🧙‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Wp = {
  keywords: [
    "man",
    "male",
    "mage",
    "sorcerer"
  ],
  char: "🧙‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Kp = {
  keywords: [
    "woman",
    "female"
  ],
  char: "🧝‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Gp = {
  keywords: [
    "man",
    "male"
  ],
  char: "🧝‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Xp = {
  keywords: [
    "woman",
    "female"
  ],
  char: "🧛‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Qp = {
  keywords: [
    "man",
    "male",
    "dracula"
  ],
  char: "🧛‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Jp = {
  keywords: [
    "woman",
    "female",
    "undead",
    "walking dead"
  ],
  char: "🧟‍♀️",
  fitzpatrick_scale: !1,
  category: "people"
}, Yp = {
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
}, Zp = {
  keywords: [
    "woman",
    "female"
  ],
  char: "🧞‍♀️",
  fitzpatrick_scale: !1,
  category: "people"
}, ef = {
  keywords: [
    "man",
    "male"
  ],
  char: "🧞‍♂️",
  fitzpatrick_scale: !1,
  category: "people"
}, af = {
  keywords: [
    "woman",
    "female",
    "merwoman",
    "ariel"
  ],
  char: "🧜‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, tf = {
  keywords: [
    "man",
    "male",
    "triton"
  ],
  char: "🧜‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, rf = {
  keywords: [
    "woman",
    "female"
  ],
  char: "🧚‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, of = {
  keywords: [
    "man",
    "male"
  ],
  char: "🧚‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, sf = {
  keywords: [
    "heaven",
    "wings",
    "halo"
  ],
  char: "👼",
  fitzpatrick_scale: !0,
  category: "people"
}, cf = {
  keywords: [
    "baby"
  ],
  char: "🤰",
  fitzpatrick_scale: !0,
  category: "people"
}, nf = {
  keywords: [
    "nursing",
    "baby"
  ],
  char: "🤱",
  fitzpatrick_scale: !0,
  category: "people"
}, lf = {
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
}, df = {
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
}, pf = {
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
}, ff = {
  keywords: [
    "couple",
    "marriage",
    "wedding",
    "groom"
  ],
  char: "🤵",
  fitzpatrick_scale: !0,
  category: "people"
}, hf = {
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
}, yf = {
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
}, gf = {
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
}, _f = {
  keywords: [
    "human",
    "feet",
    "steps"
  ],
  char: "🚶",
  fitzpatrick_scale: !0,
  category: "people"
}, uf = {
  keywords: [
    "female",
    "girl",
    "woman",
    "fun"
  ],
  char: "💃",
  fitzpatrick_scale: !0,
  category: "people"
}, mf = {
  keywords: [
    "male",
    "boy",
    "fun",
    "dancer"
  ],
  char: "🕺",
  fitzpatrick_scale: !0,
  category: "people"
}, kf = {
  keywords: [
    "female",
    "bunny",
    "women",
    "girls"
  ],
  char: "👯",
  fitzpatrick_scale: !1,
  category: "people"
}, wf = {
  keywords: [
    "male",
    "bunny",
    "men",
    "boys"
  ],
  char: "👯‍♂️",
  fitzpatrick_scale: !1,
  category: "people"
}, bf = {
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
}, vf = {
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
}, zf = {
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
}, xf = {
  keywords: [
    "woman",
    "female",
    "girl"
  ],
  char: "🙇‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, jf = {
  keywords: [
    "man",
    "male",
    "boy"
  ],
  char: "🙇",
  fitzpatrick_scale: !0,
  category: "people"
}, Cf = {
  keywords: [
    "man",
    "male",
    "boy",
    "disbelief"
  ],
  char: "🤦‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Ef = {
  keywords: [
    "woman",
    "female",
    "girl",
    "disbelief"
  ],
  char: "🤦‍♀️",
  fitzpatrick_scale: !0,
  category: "people"
}, Sf = {
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
}, Af = {
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
}, Lf = {
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
}, $f = {
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
}, Tf = {
  keywords: [
    "female",
    "girl",
    "woman",
    "nope"
  ],
  char: "🙅",
  fitzpatrick_scale: !0,
  category: "people"
}, Ff = {
  keywords: [
    "male",
    "boy",
    "man",
    "nope"
  ],
  char: "🙅‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Pf = {
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
}, Rf = {
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
}, If = {
  keywords: [
    "female",
    "girl",
    "woman"
  ],
  char: "🙋",
  fitzpatrick_scale: !0,
  category: "people"
}, qf = {
  keywords: [
    "male",
    "boy",
    "man"
  ],
  char: "🙋‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Of = {
  keywords: [
    "female",
    "girl",
    "woman"
  ],
  char: "🙎",
  fitzpatrick_scale: !0,
  category: "people"
}, Df = {
  keywords: [
    "male",
    "boy",
    "man"
  ],
  char: "🙎‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Mf = {
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
}, Bf = {
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
}, Nf = {
  keywords: [
    "female",
    "girl",
    "woman"
  ],
  char: "💇",
  fitzpatrick_scale: !0,
  category: "people"
}, Hf = {
  keywords: [
    "male",
    "boy",
    "man"
  ],
  char: "💇‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Uf = {
  keywords: [
    "female",
    "girl",
    "woman",
    "head"
  ],
  char: "💆",
  fitzpatrick_scale: !0,
  category: "people"
}, Vf = {
  keywords: [
    "male",
    "boy",
    "man",
    "head"
  ],
  char: "💆‍♂️",
  fitzpatrick_scale: !0,
  category: "people"
}, Wf = {
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
}, Kf = {
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
  char: "💑",
  fitzpatrick_scale: !1,
  category: "people"
}, Xf = {
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
}, Qf = {
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
}, Jf = {
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
}, Yf = {
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
}, Zf = {
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
}, eh = {
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
}, ah = {
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
}, th = {
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
}, rh = {
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
}, oh = {
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
}, sh = {
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
}, ch = {
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
}, ih = {
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
}, nh = {
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
}, lh = {
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
}, dh = {
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
}, ph = {
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
}, fh = {
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
}, hh = {
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
}, yh = {
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
}, gh = {
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
}, _h = {
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
}, uh = {
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
}, mh = {
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
}, kh = {
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
}, wh = {
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
}, bh = {
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
}, vh = {
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
}, zh = {
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
}, xh = {
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
}, jh = {
  keywords: [
    "ball",
    "crochet",
    "knit"
  ],
  char: "🧶",
  fitzpatrick_scale: !1,
  category: "people"
}, Ch = {
  keywords: [
    "needle",
    "sewing",
    "spool",
    "string"
  ],
  char: "🧵",
  fitzpatrick_scale: !1,
  category: "people"
}, Eh = {
  keywords: [
    "jacket"
  ],
  char: "🧥",
  fitzpatrick_scale: !1,
  category: "people"
}, Sh = {
  keywords: [
    "doctor",
    "experiment",
    "scientist",
    "chemist"
  ],
  char: "🥼",
  fitzpatrick_scale: !1,
  category: "people"
}, Ah = {
  keywords: [
    "fashion",
    "shopping_bags",
    "female"
  ],
  char: "👚",
  fitzpatrick_scale: !1,
  category: "people"
}, Lh = {
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
}, $h = {
  keywords: [
    "fashion",
    "shopping"
  ],
  char: "👖",
  fitzpatrick_scale: !1,
  category: "people"
}, Th = {
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
}, Fh = {
  keywords: [
    "clothes",
    "fashion",
    "shopping"
  ],
  char: "👗",
  fitzpatrick_scale: !1,
  category: "people"
}, Ph = {
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
}, Rh = {
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
}, Ih = {
  keywords: [
    "female",
    "girl",
    "fashion",
    "woman"
  ],
  char: "💄",
  fitzpatrick_scale: !1,
  category: "people"
}, qh = {
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
}, Oh = {
  keywords: [
    "feet",
    "tracking",
    "walking",
    "beach"
  ],
  char: "👣",
  fitzpatrick_scale: !1,
  category: "people"
}, Dh = {
  keywords: [
    "ballet",
    "slip-on",
    "slipper"
  ],
  char: "🥿",
  fitzpatrick_scale: !1,
  category: "people"
}, Mh = {
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
}, Bh = {
  keywords: [
    "shoes",
    "fashion",
    "flip flops"
  ],
  char: "👡",
  fitzpatrick_scale: !1,
  category: "people"
}, Nh = {
  keywords: [
    "shoes",
    "fashion"
  ],
  char: "👢",
  fitzpatrick_scale: !1,
  category: "people"
}, Hh = {
  keywords: [
    "fashion",
    "male"
  ],
  char: "👞",
  fitzpatrick_scale: !1,
  category: "people"
}, Uh = {
  keywords: [
    "shoes",
    "sports",
    "sneakers"
  ],
  char: "👟",
  fitzpatrick_scale: !1,
  category: "people"
}, Vh = {
  keywords: [
    "backpacking",
    "camping",
    "hiking"
  ],
  char: "🥾",
  fitzpatrick_scale: !1,
  category: "people"
}, Wh = {
  keywords: [
    "stockings",
    "clothes"
  ],
  char: "🧦",
  fitzpatrick_scale: !1,
  category: "people"
}, Kh = {
  keywords: [
    "hands",
    "winter",
    "clothes"
  ],
  char: "🧤",
  fitzpatrick_scale: !1,
  category: "people"
}, Gh = {
  keywords: [
    "neck",
    "winter",
    "clothes"
  ],
  char: "🧣",
  fitzpatrick_scale: !1,
  category: "people"
}, Xh = {
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
}, Qh = {
  keywords: [
    "magic",
    "gentleman",
    "classy",
    "circus"
  ],
  char: "🎩",
  fitzpatrick_scale: !1,
  category: "people"
}, Jh = {
  keywords: [
    "cap",
    "baseball"
  ],
  char: "🧢",
  fitzpatrick_scale: !1,
  category: "people"
}, Yh = {
  keywords: [
    "construction",
    "build"
  ],
  char: "⛑",
  fitzpatrick_scale: !1,
  category: "people"
}, Zh = {
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
}, ey = {
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
}, ay = {
  keywords: [
    "student",
    "education",
    "bag",
    "backpack"
  ],
  char: "🎒",
  fitzpatrick_scale: !1,
  category: "people"
}, ty = {
  keywords: [
    "packing",
    "travel"
  ],
  char: "🧳",
  fitzpatrick_scale: !1,
  category: "people"
}, ry = {
  keywords: [
    "bag",
    "accessories",
    "shopping"
  ],
  char: "👝",
  fitzpatrick_scale: !1,
  category: "people"
}, oy = {
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
}, sy = {
  keywords: [
    "fashion",
    "accessory",
    "accessories",
    "shopping"
  ],
  char: "👜",
  fitzpatrick_scale: !1,
  category: "people"
}, cy = {
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
}, iy = {
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
}, ny = {
  keywords: [
    "face",
    "cool",
    "accessories"
  ],
  char: "🕶",
  fitzpatrick_scale: !1,
  category: "people"
}, ly = {
  keywords: [
    "eyes",
    "protection",
    "safety"
  ],
  char: "🥽",
  fitzpatrick_scale: !1,
  category: "people"
}, dy = {
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
}, py = {
  keywords: [
    "weather",
    "rain",
    "drizzle"
  ],
  char: "🌂",
  fitzpatrick_scale: !1,
  category: "people"
}, fy = {
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
}, hy = {
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
}, yy = {
  keywords: [
    "animal",
    "nature",
    "cheese_wedge",
    "rodent"
  ],
  char: "🐭",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, gy = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐹",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, _y = {
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
}, uy = {
  keywords: [
    "animal",
    "nature",
    "face"
  ],
  char: "🦊",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, my = {
  keywords: [
    "animal",
    "nature",
    "wild"
  ],
  char: "🐻",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ky = {
  keywords: [
    "animal",
    "nature",
    "panda"
  ],
  char: "🐼",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, wy = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐨",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, by = {
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
}, vy = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🦁",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, zy = {
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
}, xy = {
  keywords: [
    "animal",
    "oink",
    "nature"
  ],
  char: "🐷",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, jy = {
  keywords: [
    "animal",
    "oink"
  ],
  char: "🐽",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Cy = {
  keywords: [
    "animal",
    "nature",
    "croak",
    "toad"
  ],
  char: "🐸",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ey = {
  keywords: [
    "animal",
    "nature",
    "ocean",
    "sea"
  ],
  char: "🦑",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Sy = {
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
}, Ay = {
  keywords: [
    "animal",
    "ocean",
    "nature",
    "seafood"
  ],
  char: "🦐",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ly = {
  keywords: [
    "animal",
    "nature",
    "circus"
  ],
  char: "🐵",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, $y = {
  keywords: [
    "animal",
    "nature",
    "circus"
  ],
  char: "🦍",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ty = {
  keywords: [
    "monkey",
    "animal",
    "nature",
    "haha"
  ],
  char: "🙈",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Fy = {
  keywords: [
    "animal",
    "monkey",
    "nature"
  ],
  char: "🙉",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Py = {
  keywords: [
    "monkey",
    "animal",
    "nature",
    "omg"
  ],
  char: "🙊",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ry = {
  keywords: [
    "animal",
    "nature",
    "banana",
    "circus"
  ],
  char: "🐒",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Iy = {
  keywords: [
    "animal",
    "cluck",
    "nature",
    "bird"
  ],
  char: "🐔",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, qy = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐧",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Oy = {
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
}, Dy = {
  keywords: [
    "animal",
    "chicken",
    "bird"
  ],
  char: "🐤",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, My = {
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
}, By = {
  keywords: [
    "animal",
    "chicken",
    "baby",
    "bird"
  ],
  char: "🐥",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ny = {
  keywords: [
    "animal",
    "nature",
    "bird",
    "mallard"
  ],
  char: "🦆",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Hy = {
  keywords: [
    "animal",
    "nature",
    "bird"
  ],
  char: "🦅",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Uy = {
  keywords: [
    "animal",
    "nature",
    "bird",
    "hoot"
  ],
  char: "🦉",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Vy = {
  keywords: [
    "animal",
    "nature",
    "blind",
    "vampire"
  ],
  char: "🦇",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Wy = {
  keywords: [
    "animal",
    "nature",
    "wild"
  ],
  char: "🐺",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ky = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐗",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Gy = {
  keywords: [
    "animal",
    "brown",
    "nature"
  ],
  char: "🐴",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Xy = {
  keywords: [
    "animal",
    "nature",
    "mystical"
  ],
  char: "🦄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Qy = {
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
}, Jy = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "worm"
  ],
  char: "🐛",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Yy = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "caterpillar"
  ],
  char: "🦋",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Zy = {
  keywords: [
    "slow",
    "animal",
    "shell"
  ],
  char: "🐌",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, eg = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "ladybug"
  ],
  char: "🐞",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ag = {
  keywords: [
    "animal",
    "insect",
    "nature",
    "bug"
  ],
  char: "🐜",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, tg = {
  keywords: [
    "animal",
    "cricket",
    "chirp"
  ],
  char: "🦗",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, rg = {
  keywords: [
    "animal",
    "arachnid"
  ],
  char: "🕷",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, og = {
  keywords: [
    "animal",
    "arachnid"
  ],
  char: "🦂",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, sg = {
  keywords: [
    "animal",
    "crustacean"
  ],
  char: "🦀",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, cg = {
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
}, ig = {
  keywords: [
    "animal",
    "nature",
    "reptile"
  ],
  char: "🦎",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ng = {
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
}, lg = {
  keywords: [
    "animal",
    "slow",
    "nature",
    "tortoise"
  ],
  char: "🐢",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, dg = {
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
}, pg = {
  keywords: [
    "animal",
    "food",
    "nature"
  ],
  char: "🐟",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, fg = {
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
}, hg = {
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
}, yg = {
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
}, gg = {
  keywords: [
    "animal",
    "nature",
    "sea",
    "ocean"
  ],
  char: "🐳",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, _g = {
  keywords: [
    "animal",
    "nature",
    "sea",
    "ocean"
  ],
  char: "🐋",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ug = {
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
}, mg = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐆",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, kg = {
  keywords: [
    "animal",
    "nature",
    "stripes",
    "safari"
  ],
  char: "🦓",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, wg = {
  keywords: [
    "animal",
    "nature",
    "roar"
  ],
  char: "🐅",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, bg = {
  keywords: [
    "animal",
    "nature",
    "ox",
    "cow"
  ],
  char: "🐃",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, vg = {
  keywords: [
    "animal",
    "cow",
    "beef"
  ],
  char: "🐂",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, zg = {
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
}, xg = {
  keywords: [
    "animal",
    "nature",
    "horns",
    "venison"
  ],
  char: "🦌",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, jg = {
  keywords: [
    "animal",
    "hot",
    "desert",
    "hump"
  ],
  char: "🐪",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Cg = {
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
}, Eg = {
  keywords: [
    "animal",
    "nature",
    "spots",
    "safari"
  ],
  char: "🦒",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Sg = {
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
}, Ag = {
  keywords: [
    "animal",
    "nature",
    "horn"
  ],
  char: "🦏",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Lg = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐐",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, $g = {
  keywords: [
    "animal",
    "sheep",
    "nature"
  ],
  char: "🐏",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Tg = {
  keywords: [
    "animal",
    "nature",
    "wool",
    "shipit"
  ],
  char: "🐑",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Fg = {
  keywords: [
    "animal",
    "gamble",
    "luck"
  ],
  char: "🐎",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Pg = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🐖",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Rg = {
  keywords: [
    "animal",
    "mouse",
    "rodent"
  ],
  char: "🐀",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Ig = {
  keywords: [
    "animal",
    "nature",
    "rodent"
  ],
  char: "🐁",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, qg = {
  keywords: [
    "animal",
    "nature",
    "chicken"
  ],
  char: "🐓",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Og = {
  keywords: [
    "animal",
    "bird"
  ],
  char: "🦃",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Dg = {
  keywords: [
    "animal",
    "bird"
  ],
  char: "🕊",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Mg = {
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
}, Bg = {
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
}, Ng = {
  keywords: [
    "animal",
    "meow",
    "pet",
    "cats"
  ],
  char: "🐈",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Hg = {
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
}, Ug = {
  keywords: [
    "animal",
    "nature",
    "rodent",
    "squirrel"
  ],
  char: "🐿",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Vg = {
  keywords: [
    "animal",
    "nature",
    "spiny"
  ],
  char: "🦔",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Wg = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🦝",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Kg = {
  keywords: [
    "animal",
    "nature",
    "alpaca"
  ],
  char: "🦙",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Gg = {
  keywords: [
    "animal",
    "nature"
  ],
  char: "🦛",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Xg = {
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
}, Qg = {
  keywords: [
    "animal",
    "nature",
    "honey"
  ],
  char: "🦡",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Jg = {
  keywords: [
    "animal",
    "nature",
    "bird"
  ],
  char: "🦢",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Yg = {
  keywords: [
    "animal",
    "nature",
    "peahen",
    "bird"
  ],
  char: "🦚",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Zg = {
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
}, e_ = {
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
}, a_ = {
  keywords: [
    "animal",
    "nature",
    "insect",
    "malaria"
  ],
  char: "🦟",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, t_ = {
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
}, r_ = {
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
}, o_ = {
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
}, s_ = {
  keywords: [
    "vegetable",
    "plant",
    "nature"
  ],
  char: "🌵",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, c_ = {
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
}, i_ = {
  keywords: [
    "plant",
    "nature"
  ],
  char: "🌲",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, n_ = {
  keywords: [
    "plant",
    "nature"
  ],
  char: "🌳",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, l_ = {
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
}, d_ = {
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
}, p_ = {
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
}, f_ = {
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
}, h_ = {
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
}, y_ = {
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
}, g_ = {
  keywords: [
    "plant",
    "nature",
    "branch",
    "summer"
  ],
  char: "🎋",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, __ = {
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
}, u_ = {
  keywords: [
    "nature",
    "plant",
    "vegetable",
    "leaves"
  ],
  char: "🍂",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, m_ = {
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
}, k_ = {
  keywords: [
    "nature",
    "plant"
  ],
  char: "🌾",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, w_ = {
  keywords: [
    "plant",
    "vegetable",
    "flowers",
    "beach"
  ],
  char: "🌺",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, b_ = {
  keywords: [
    "nature",
    "plant",
    "fall"
  ],
  char: "🌻",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, v_ = {
  keywords: [
    "flowers",
    "valentines",
    "love",
    "spring"
  ],
  char: "🌹",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, z_ = {
  keywords: [
    "plant",
    "nature",
    "flower"
  ],
  char: "🥀",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, x_ = {
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
}, j_ = {
  keywords: [
    "nature",
    "flowers",
    "yellow"
  ],
  char: "🌼",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, C_ = {
  keywords: [
    "nature",
    "plant",
    "spring",
    "flower"
  ],
  char: "🌸",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, E_ = {
  keywords: [
    "flowers",
    "nature",
    "spring"
  ],
  char: "💐",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, S_ = {
  keywords: [
    "plant",
    "vegetable"
  ],
  char: "🍄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, A_ = {
  keywords: [
    "food",
    "squirrel"
  ],
  char: "🌰",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, L_ = {
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
}, $_ = {
  keywords: [
    "nature",
    "sea",
    "beach"
  ],
  char: "🐚",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, T_ = {
  keywords: [
    "animal",
    "insect",
    "arachnid",
    "silk"
  ],
  char: "🕸",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, F_ = {
  keywords: [
    "globe",
    "world",
    "USA",
    "international"
  ],
  char: "🌎",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, P_ = {
  keywords: [
    "globe",
    "world",
    "international"
  ],
  char: "🌍",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, R_ = {
  keywords: [
    "globe",
    "world",
    "east",
    "international"
  ],
  char: "🌏",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, I_ = {
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
}, q_ = {
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
  char: "🌗",
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
  char: "🌘",
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
  char: "🌑",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, B_ = {
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
  char: "🌓",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, H_ = {
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
  char: "🌚",
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
  char: "🌝",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, W_ = {
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
}, K_ = {
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
}, G_ = {
  keywords: [
    "nature",
    "morning",
    "sky"
  ],
  char: "🌞",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, X_ = {
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
}, Q_ = {
  keywords: [
    "night",
    "yellow"
  ],
  char: "⭐",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, J_ = {
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
}, Y_ = {
  keywords: [
    "star",
    "sparkle",
    "shoot",
    "magic"
  ],
  char: "💫",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, Z_ = {
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
}, eu = {
  keywords: [
    "space"
  ],
  char: "☄",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, au = {
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
}, tu = {
  keywords: [
    "weather"
  ],
  char: "🌤",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ru = {
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
}, ou = {
  keywords: [
    "weather"
  ],
  char: "🌥",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, su = {
  keywords: [
    "weather"
  ],
  char: "🌦",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, cu = {
  keywords: [
    "weather",
    "sky"
  ],
  char: "☁️",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, iu = {
  keywords: [
    "weather"
  ],
  char: "🌧",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, nu = {
  keywords: [
    "weather",
    "lightning"
  ],
  char: "⛈",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, lu = {
  keywords: [
    "weather",
    "thunder"
  ],
  char: "🌩",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, du = {
  keywords: [
    "thunder",
    "weather",
    "lightning bolt",
    "fast"
  ],
  char: "⚡",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, pu = {
  keywords: [
    "hot",
    "cook",
    "flame"
  ],
  char: "🔥",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, fu = {
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
}, hu = {
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
}, yu = {
  keywords: [
    "weather"
  ],
  char: "🌨",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, gu = {
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
}, _u = {
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
}, uu = {
  keywords: [
    "gust",
    "air"
  ],
  char: "🌬",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, mu = {
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
}, ku = {
  keywords: [
    "weather",
    "cyclone",
    "twister"
  ],
  char: "🌪",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, wu = {
  keywords: [
    "weather"
  ],
  char: "🌫",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, bu = {
  keywords: [
    "weather",
    "spring"
  ],
  char: "☂",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, vu = {
  keywords: [
    "rainy",
    "weather",
    "spring"
  ],
  char: "☔",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, zu = {
  keywords: [
    "water",
    "drip",
    "faucet",
    "spring"
  ],
  char: "💧",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, xu = {
  keywords: [
    "water",
    "drip",
    "oops"
  ],
  char: "💦",
  fitzpatrick_scale: !1,
  category: "animals_and_nature"
}, ju = {
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
}, Cu = {
  keywords: [
    "fruit",
    "nature"
  ],
  char: "🍏",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Eu = {
  keywords: [
    "fruit",
    "mac",
    "school"
  ],
  char: "🍎",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Su = {
  keywords: [
    "fruit",
    "nature",
    "food"
  ],
  char: "🍐",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Au = {
  keywords: [
    "food",
    "fruit",
    "nature",
    "orange"
  ],
  char: "🍊",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Lu = {
  keywords: [
    "fruit",
    "nature"
  ],
  char: "🍋",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, $u = {
  keywords: [
    "fruit",
    "food",
    "monkey"
  ],
  char: "🍌",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Tu = {
  keywords: [
    "fruit",
    "food",
    "picnic",
    "summer"
  ],
  char: "🍉",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Fu = {
  keywords: [
    "fruit",
    "food",
    "wine"
  ],
  char: "🍇",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Pu = {
  keywords: [
    "fruit",
    "food",
    "nature"
  ],
  char: "🍓",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ru = {
  keywords: [
    "fruit",
    "nature",
    "food"
  ],
  char: "🍈",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Iu = {
  keywords: [
    "food",
    "fruit"
  ],
  char: "🍒",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, qu = {
  keywords: [
    "fruit",
    "nature",
    "food"
  ],
  char: "🍑",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ou = {
  keywords: [
    "fruit",
    "nature",
    "food"
  ],
  char: "🍍",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Du = {
  keywords: [
    "fruit",
    "nature",
    "food",
    "palm"
  ],
  char: "🥥",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Mu = {
  keywords: [
    "fruit",
    "food"
  ],
  char: "🥝",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Bu = {
  keywords: [
    "fruit",
    "food",
    "tropical"
  ],
  char: "🥭",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Nu = {
  keywords: [
    "fruit",
    "food"
  ],
  char: "🥑",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Hu = {
  keywords: [
    "fruit",
    "food",
    "vegetable"
  ],
  char: "🥦",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Uu = {
  keywords: [
    "fruit",
    "vegetable",
    "nature",
    "food"
  ],
  char: "🍅",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Vu = {
  keywords: [
    "vegetable",
    "nature",
    "food",
    "aubergine"
  ],
  char: "🍆",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Wu = {
  keywords: [
    "fruit",
    "food",
    "pickle"
  ],
  char: "🥒",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ku = {
  keywords: [
    "vegetable",
    "food",
    "orange"
  ],
  char: "🥕",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Gu = {
  keywords: [
    "food",
    "spicy",
    "chilli",
    "chili"
  ],
  char: "🌶",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Xu = {
  keywords: [
    "food",
    "tuber",
    "vegatable",
    "starch"
  ],
  char: "🥔",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Qu = {
  keywords: [
    "food",
    "vegetable",
    "plant"
  ],
  char: "🌽",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ju = {
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
}, Yu = {
  keywords: [
    "food",
    "nature"
  ],
  char: "🍠",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Zu = {
  keywords: [
    "food",
    "nut"
  ],
  char: "🥜",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, em = {
  keywords: [
    "bees",
    "sweet",
    "kitchen"
  ],
  char: "🍯",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, am = {
  keywords: [
    "food",
    "bread",
    "french"
  ],
  char: "🥐",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, tm = {
  keywords: [
    "food",
    "wheat",
    "breakfast",
    "toast"
  ],
  char: "🍞",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, rm = {
  keywords: [
    "food",
    "bread",
    "french"
  ],
  char: "🥖",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, om = {
  keywords: [
    "food",
    "bread",
    "bakery",
    "schmear"
  ],
  char: "🥯",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, sm = {
  keywords: [
    "food",
    "bread",
    "twisted"
  ],
  char: "🥨",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, cm = {
  keywords: [
    "food",
    "chadder"
  ],
  char: "🧀",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, im = {
  keywords: [
    "food",
    "chicken",
    "breakfast"
  ],
  char: "🥚",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, nm = {
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
}, lm = {
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
}, dm = {
  keywords: [
    "food",
    "breakfast",
    "flapjacks",
    "hotcakes"
  ],
  char: "🥞",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, pm = {
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
}, fm = {
  keywords: [
    "good",
    "food",
    "drumstick"
  ],
  char: "🍖",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, hm = {
  keywords: [
    "skeleton"
  ],
  char: "🦴",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ym = {
  keywords: [
    "food",
    "animal",
    "appetizer",
    "summer"
  ],
  char: "🍤",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, gm = {
  keywords: [
    "food",
    "breakfast",
    "kitchen",
    "egg"
  ],
  char: "🍳",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, _m = {
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
}, um = {
  keywords: [
    "chips",
    "snack",
    "fast food"
  ],
  char: "🍟",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, mm = {
  keywords: [
    "food",
    "flatbread",
    "stuffed",
    "gyro"
  ],
  char: "🥙",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, km = {
  keywords: [
    "food",
    "frankfurter"
  ],
  char: "🌭",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, wm = {
  keywords: [
    "food",
    "party"
  ],
  char: "🍕",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, bm = {
  keywords: [
    "food",
    "lunch",
    "bread"
  ],
  char: "🥪",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, vm = {
  keywords: [
    "food",
    "soup"
  ],
  char: "🥫",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, zm = {
  keywords: [
    "food",
    "italian",
    "noodle"
  ],
  char: "🍝",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, xm = {
  keywords: [
    "food",
    "mexican"
  ],
  char: "🌮",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, jm = {
  keywords: [
    "food",
    "mexican"
  ],
  char: "🌯",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Cm = {
  keywords: [
    "food",
    "healthy",
    "lettuce"
  ],
  char: "🥗",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Em = {
  keywords: [
    "food",
    "cooking",
    "casserole",
    "paella"
  ],
  char: "🥘",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Sm = {
  keywords: [
    "food",
    "japanese",
    "noodle",
    "chopsticks"
  ],
  char: "🍜",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Am = {
  keywords: [
    "food",
    "meat",
    "soup"
  ],
  char: "🍲",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Lm = {
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
}, $m = {
  keywords: [
    "food",
    "prophecy"
  ],
  char: "🥠",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Tm = {
  keywords: [
    "food",
    "fish",
    "japanese",
    "rice"
  ],
  char: "🍣",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Fm = {
  keywords: [
    "food",
    "japanese",
    "box"
  ],
  char: "🍱",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Pm = {
  keywords: [
    "food",
    "spicy",
    "hot",
    "indian"
  ],
  char: "🍛",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Rm = {
  keywords: [
    "food",
    "japanese"
  ],
  char: "🍙",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Im = {
  keywords: [
    "food",
    "china",
    "asian"
  ],
  char: "🍚",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, qm = {
  keywords: [
    "food",
    "japanese"
  ],
  char: "🍘",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Om = {
  keywords: [
    "food",
    "japanese"
  ],
  char: "🍢",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Dm = {
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
}, Mm = {
  keywords: [
    "hot",
    "dessert",
    "summer"
  ],
  char: "🍧",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Bm = {
  keywords: [
    "food",
    "hot",
    "dessert"
  ],
  char: "🍨",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Nm = {
  keywords: [
    "food",
    "hot",
    "dessert",
    "summer"
  ],
  char: "🍦",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Hm = {
  keywords: [
    "food",
    "dessert",
    "pastry"
  ],
  char: "🥧",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Um = {
  keywords: [
    "food",
    "dessert"
  ],
  char: "🍰",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Vm = {
  keywords: [
    "food",
    "dessert",
    "bakery",
    "sweet"
  ],
  char: "🧁",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Wm = {
  keywords: [
    "food",
    "autumn"
  ],
  char: "🥮",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Km = {
  keywords: [
    "food",
    "dessert",
    "cake"
  ],
  char: "🎂",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Gm = {
  keywords: [
    "dessert",
    "food"
  ],
  char: "🍮",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Xm = {
  keywords: [
    "snack",
    "dessert",
    "sweet",
    "lolly"
  ],
  char: "🍬",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Qm = {
  keywords: [
    "food",
    "snack",
    "candy",
    "sweet"
  ],
  char: "🍭",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Jm = {
  keywords: [
    "food",
    "snack",
    "dessert",
    "sweet"
  ],
  char: "🍫",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Ym = {
  keywords: [
    "food",
    "movie theater",
    "films",
    "snack"
  ],
  char: "🍿",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, Zm = {
  keywords: [
    "food",
    "empanada",
    "pierogi",
    "potsticker"
  ],
  char: "🥟",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, ek = {
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
}, ak = {
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
}, tk = {
  keywords: [
    "beverage",
    "drink",
    "cow"
  ],
  char: "🥛",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, rk = {
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
}, ok = {
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
}, sk = {
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
}, ck = {
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
}, ik = {
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
}, nk = {
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
}, lk = {
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
}, dk = {
  keywords: [
    "drink",
    "wine",
    "bottle",
    "celebration"
  ],
  char: "🍾",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, pk = {
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
}, fk = {
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
}, hk = {
  keywords: [
    "drink",
    "soda"
  ],
  char: "🥤",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, yk = {
  keywords: [
    "beverage",
    "caffeine",
    "latte",
    "espresso"
  ],
  char: "☕",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, gk = {
  keywords: [
    "food",
    "container",
    "milk"
  ],
  char: "🍼",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, _k = {
  keywords: [
    "condiment",
    "shaker"
  ],
  char: "🧂",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, uk = {
  keywords: [
    "cutlery",
    "kitchen",
    "tableware"
  ],
  char: "🥄",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, mk = {
  keywords: [
    "cutlery",
    "kitchen"
  ],
  char: "🍴",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, kk = {
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
}, wk = {
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
}, bk = {
  keywords: [
    "food",
    "leftovers"
  ],
  char: "🥡",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, vk = {
  keywords: [
    "food"
  ],
  char: "🥢",
  fitzpatrick_scale: !1,
  category: "food_and_drink"
}, zk = {
  keywords: [
    "sports",
    "football"
  ],
  char: "⚽",
  fitzpatrick_scale: !1,
  category: "activity"
}, xk = {
  keywords: [
    "sports",
    "balls",
    "NBA"
  ],
  char: "🏀",
  fitzpatrick_scale: !1,
  category: "activity"
}, jk = {
  keywords: [
    "sports",
    "balls",
    "NFL"
  ],
  char: "🏈",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ck = {
  keywords: [
    "sports",
    "balls"
  ],
  char: "⚾",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ek = {
  keywords: [
    "sports",
    "balls"
  ],
  char: "🥎",
  fitzpatrick_scale: !1,
  category: "activity"
}, Sk = {
  keywords: [
    "sports",
    "balls",
    "green"
  ],
  char: "🎾",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ak = {
  keywords: [
    "sports",
    "balls"
  ],
  char: "🏐",
  fitzpatrick_scale: !1,
  category: "activity"
}, Lk = {
  keywords: [
    "sports",
    "team"
  ],
  char: "🏉",
  fitzpatrick_scale: !1,
  category: "activity"
}, $k = {
  keywords: [
    "sports",
    "frisbee",
    "ultimate"
  ],
  char: "🥏",
  fitzpatrick_scale: !1,
  category: "activity"
}, Tk = {
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
}, Fk = {
  keywords: [
    "sports",
    "business",
    "woman",
    "female"
  ],
  char: "🏌️‍♀️",
  fitzpatrick_scale: !1,
  category: "activity"
}, Pk = {
  keywords: [
    "sports",
    "business"
  ],
  char: "🏌",
  fitzpatrick_scale: !0,
  category: "activity"
}, Rk = {
  keywords: [
    "sports",
    "pingpong"
  ],
  char: "🏓",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ik = {
  keywords: [
    "sports"
  ],
  char: "🏸",
  fitzpatrick_scale: !1,
  category: "activity"
}, qk = {
  keywords: [
    "sports"
  ],
  char: "🥅",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ok = {
  keywords: [
    "sports"
  ],
  char: "🏒",
  fitzpatrick_scale: !1,
  category: "activity"
}, Dk = {
  keywords: [
    "sports"
  ],
  char: "🏑",
  fitzpatrick_scale: !1,
  category: "activity"
}, Mk = {
  keywords: [
    "sports",
    "ball",
    "stick"
  ],
  char: "🥍",
  fitzpatrick_scale: !1,
  category: "activity"
}, Bk = {
  keywords: [
    "sports"
  ],
  char: "🏏",
  fitzpatrick_scale: !1,
  category: "activity"
}, Nk = {
  keywords: [
    "sports",
    "winter",
    "cold",
    "snow"
  ],
  char: "🎿",
  fitzpatrick_scale: !1,
  category: "activity"
}, Hk = {
  keywords: [
    "sports",
    "winter",
    "snow"
  ],
  char: "⛷",
  fitzpatrick_scale: !1,
  category: "activity"
}, Uk = {
  keywords: [
    "sports",
    "winter"
  ],
  char: "🏂",
  fitzpatrick_scale: !0,
  category: "activity"
}, Vk = {
  keywords: [
    "sports",
    "fencing",
    "sword"
  ],
  char: "🤺",
  fitzpatrick_scale: !1,
  category: "activity"
}, Wk = {
  keywords: [
    "sports",
    "wrestlers"
  ],
  char: "🤼‍♀️",
  fitzpatrick_scale: !1,
  category: "activity"
}, Kk = {
  keywords: [
    "sports",
    "wrestlers"
  ],
  char: "🤼‍♂️",
  fitzpatrick_scale: !1,
  category: "activity"
}, Gk = {
  keywords: [
    "gymnastics"
  ],
  char: "🤸‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Xk = {
  keywords: [
    "gymnastics"
  ],
  char: "🤸‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Qk = {
  keywords: [
    "sports"
  ],
  char: "🤾‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Jk = {
  keywords: [
    "sports"
  ],
  char: "🤾‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Yk = {
  keywords: [
    "sports"
  ],
  char: "⛸",
  fitzpatrick_scale: !1,
  category: "activity"
}, Zk = {
  keywords: [
    "sports"
  ],
  char: "🥌",
  fitzpatrick_scale: !1,
  category: "activity"
}, ew = {
  keywords: [
    "board"
  ],
  char: "🛹",
  fitzpatrick_scale: !1,
  category: "activity"
}, aw = {
  keywords: [
    "sleigh",
    "luge",
    "toboggan"
  ],
  char: "🛷",
  fitzpatrick_scale: !1,
  category: "activity"
}, tw = {
  keywords: [
    "sports"
  ],
  char: "🏹",
  fitzpatrick_scale: !1,
  category: "activity"
}, rw = {
  keywords: [
    "food",
    "hobby",
    "summer"
  ],
  char: "🎣",
  fitzpatrick_scale: !1,
  category: "activity"
}, ow = {
  keywords: [
    "sports",
    "fighting"
  ],
  char: "🥊",
  fitzpatrick_scale: !1,
  category: "activity"
}, sw = {
  keywords: [
    "judo",
    "karate",
    "taekwondo"
  ],
  char: "🥋",
  fitzpatrick_scale: !1,
  category: "activity"
}, cw = {
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
}, iw = {
  keywords: [
    "sports",
    "hobby",
    "water",
    "ship"
  ],
  char: "🚣",
  fitzpatrick_scale: !0,
  category: "activity"
}, nw = {
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
}, lw = {
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
}, dw = {
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
}, pw = {
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
}, fw = {
  keywords: [
    "sports",
    "pool"
  ],
  char: "🤽‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, hw = {
  keywords: [
    "sports",
    "pool"
  ],
  char: "🤽‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, yw = {
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
}, gw = {
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
}, _w = {
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
}, uw = {
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
}, mw = {
  keywords: [
    "clean",
    "shower",
    "bathroom"
  ],
  char: "🛀",
  fitzpatrick_scale: !0,
  category: "activity"
}, kw = {
  keywords: [
    "sports",
    "human",
    "woman",
    "female"
  ],
  char: "⛹️‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, ww = {
  keywords: [
    "sports",
    "human"
  ],
  char: "⛹",
  fitzpatrick_scale: !0,
  category: "activity"
}, bw = {
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
}, vw = {
  keywords: [
    "sports",
    "training",
    "exercise"
  ],
  char: "🏋",
  fitzpatrick_scale: !0,
  category: "activity"
}, zw = {
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
}, xw = {
  keywords: [
    "sports",
    "bike",
    "exercise",
    "hipster"
  ],
  char: "🚴",
  fitzpatrick_scale: !0,
  category: "activity"
}, jw = {
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
}, Cw = {
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
}, Ew = {
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
}, Sw = {
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
}, Aw = {
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
}, Lw = {
  keywords: [
    "play",
    "pageant"
  ],
  char: "🎽",
  fitzpatrick_scale: !1,
  category: "activity"
}, $w = {
  keywords: [
    "award",
    "winning"
  ],
  char: "🏅",
  fitzpatrick_scale: !1,
  category: "activity"
}, Tw = {
  keywords: [
    "award",
    "winning",
    "army"
  ],
  char: "🎖",
  fitzpatrick_scale: !1,
  category: "activity"
}, Fw = {
  keywords: [
    "sports",
    "cause",
    "support",
    "awareness"
  ],
  char: "🎗",
  fitzpatrick_scale: !1,
  category: "activity"
}, Pw = {
  keywords: [
    "flower",
    "decoration",
    "military"
  ],
  char: "🏵",
  fitzpatrick_scale: !1,
  category: "activity"
}, Rw = {
  keywords: [
    "event",
    "concert",
    "pass"
  ],
  char: "🎫",
  fitzpatrick_scale: !1,
  category: "activity"
}, Iw = {
  keywords: [
    "sports",
    "concert",
    "entrance"
  ],
  char: "🎟",
  fitzpatrick_scale: !1,
  category: "activity"
}, qw = {
  keywords: [
    "acting",
    "theater",
    "drama"
  ],
  char: "🎭",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ow = {
  keywords: [
    "design",
    "paint",
    "draw",
    "colors"
  ],
  char: "🎨",
  fitzpatrick_scale: !1,
  category: "activity"
}, Dw = {
  keywords: [
    "festival",
    "carnival",
    "party"
  ],
  char: "🎪",
  fitzpatrick_scale: !1,
  category: "activity"
}, Mw = {
  keywords: [
    "juggle",
    "balance",
    "skill",
    "multitask"
  ],
  char: "🤹‍♀️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Bw = {
  keywords: [
    "juggle",
    "balance",
    "skill",
    "multitask"
  ],
  char: "🤹‍♂️",
  fitzpatrick_scale: !0,
  category: "activity"
}, Nw = {
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
}, Hw = {
  keywords: [
    "music",
    "score",
    "gadgets"
  ],
  char: "🎧",
  fitzpatrick_scale: !1,
  category: "activity"
}, Uw = {
  keywords: [
    "treble",
    "clef",
    "compose"
  ],
  char: "🎼",
  fitzpatrick_scale: !1,
  category: "activity"
}, Vw = {
  keywords: [
    "piano",
    "instrument",
    "compose"
  ],
  char: "🎹",
  fitzpatrick_scale: !1,
  category: "activity"
}, Ww = {
  keywords: [
    "music",
    "instrument",
    "drumsticks",
    "snare"
  ],
  char: "🥁",
  fitzpatrick_scale: !1,
  category: "activity"
}, Kw = {
  keywords: [
    "music",
    "instrument",
    "jazz",
    "blues"
  ],
  char: "🎷",
  fitzpatrick_scale: !1,
  category: "activity"
}, Gw = {
  keywords: [
    "music",
    "brass"
  ],
  char: "🎺",
  fitzpatrick_scale: !1,
  category: "activity"
}, Xw = {
  keywords: [
    "music",
    "instrument"
  ],
  char: "🎸",
  fitzpatrick_scale: !1,
  category: "activity"
}, Qw = {
  keywords: [
    "music",
    "instrument",
    "orchestra",
    "symphony"
  ],
  char: "🎻",
  fitzpatrick_scale: !1,
  category: "activity"
}, Jw = {
  keywords: [
    "movie",
    "film",
    "record"
  ],
  char: "🎬",
  fitzpatrick_scale: !1,
  category: "activity"
}, Yw = {
  keywords: [
    "play",
    "console",
    "PS4",
    "controller"
  ],
  char: "🎮",
  fitzpatrick_scale: !1,
  category: "activity"
}, Zw = {
  keywords: [
    "game",
    "arcade",
    "play"
  ],
  char: "👾",
  fitzpatrick_scale: !1,
  category: "activity"
}, eb = {
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
}, ab = {
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
}, tb = {
  keywords: [
    "expendable"
  ],
  char: "♟",
  fitzpatrick_scale: !1,
  category: "activity"
}, rb = {
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
}, ob = {
  keywords: [
    "interlocking",
    "puzzle",
    "piece"
  ],
  char: "🧩",
  fitzpatrick_scale: !1,
  category: "activity"
}, sb = {
  keywords: [
    "sports",
    "fun",
    "play"
  ],
  char: "🎳",
  fitzpatrick_scale: !1,
  category: "activity"
}, cb = {
  keywords: [
    "red",
    "transportation",
    "vehicle"
  ],
  char: "🚗",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, ib = {
  keywords: [
    "uber",
    "vehicle",
    "cars",
    "transportation"
  ],
  char: "🚕",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, nb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚙",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, lb = {
  keywords: [
    "car",
    "vehicle",
    "transportation"
  ],
  char: "🚌",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, db = {
  keywords: [
    "bart",
    "transportation",
    "vehicle"
  ],
  char: "🚎",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, pb = {
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
}, fb = {
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
}, hb = {
  keywords: [
    "health",
    "911",
    "hospital"
  ],
  char: "🚑",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, yb = {
  keywords: [
    "transportation",
    "cars",
    "vehicle"
  ],
  char: "🚒",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, gb = {
  keywords: [
    "vehicle",
    "car",
    "transportation"
  ],
  char: "🚐",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, _b = {
  keywords: [
    "cars",
    "transportation"
  ],
  char: "🚚",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, ub = {
  keywords: [
    "vehicle",
    "cars",
    "transportation",
    "express"
  ],
  char: "🚛",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, mb = {
  keywords: [
    "vehicle",
    "car",
    "farming",
    "agriculture"
  ],
  char: "🚜",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, kb = {
  keywords: [
    "vehicle",
    "kick",
    "razor"
  ],
  char: "🛴",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, wb = {
  keywords: [
    "race",
    "sports",
    "fast"
  ],
  char: "🏍",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, bb = {
  keywords: [
    "sports",
    "bicycle",
    "exercise",
    "hipster"
  ],
  char: "🚲",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, vb = {
  keywords: [
    "vehicle",
    "vespa",
    "sasha"
  ],
  char: "🛵",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, zb = {
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
}, xb = {
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
}, jb = {
  keywords: [
    "vehicle",
    "transportation"
  ],
  char: "🚍",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Cb = {
  keywords: [
    "car",
    "vehicle",
    "transportation"
  ],
  char: "🚘",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Eb = {
  keywords: [
    "vehicle",
    "cars",
    "uber"
  ],
  char: "🚖",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Sb = {
  keywords: [
    "transportation",
    "vehicle",
    "ski"
  ],
  char: "🚡",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Ab = {
  keywords: [
    "transportation",
    "vehicle",
    "ski"
  ],
  char: "🚠",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Lb = {
  keywords: [
    "vehicle",
    "transportation"
  ],
  char: "🚟",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, $b = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚃",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Tb = {
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
}, Fb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚝",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Pb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚄",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Rb = {
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
}, Ib = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚈",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, qb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚞",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Ob = {
  keywords: [
    "transportation",
    "vehicle",
    "train"
  ],
  char: "🚂",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Db = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚆",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Mb = {
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
}, Bb = {
  keywords: [
    "transportation",
    "vehicle"
  ],
  char: "🚊",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Nb = {
  keywords: [
    "transportation",
    "vehicle",
    "public"
  ],
  char: "🚉",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Hb = {
  keywords: [
    "transportation",
    "vehicle",
    "ufo"
  ],
  char: "🛸",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Ub = {
  keywords: [
    "transportation",
    "vehicle",
    "fly"
  ],
  char: "🚁",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Vb = {
  keywords: [
    "flight",
    "transportation",
    "fly",
    "vehicle"
  ],
  char: "🛩",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Wb = {
  keywords: [
    "vehicle",
    "transportation",
    "flight",
    "fly"
  ],
  char: "✈️",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Kb = {
  keywords: [
    "airport",
    "flight",
    "landing"
  ],
  char: "🛫",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Gb = {
  keywords: [
    "airport",
    "flight",
    "boarding"
  ],
  char: "🛬",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Xb = {
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
}, Qb = {
  keywords: [
    "ship"
  ],
  char: "🛥",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Jb = {
  keywords: [
    "ship",
    "transportation",
    "vehicle",
    "summer"
  ],
  char: "🚤",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Yb = {
  keywords: [
    "boat",
    "ship",
    "yacht"
  ],
  char: "⛴",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Zb = {
  keywords: [
    "yacht",
    "cruise",
    "ferry"
  ],
  char: "🛳",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, e1 = {
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
}, a1 = {
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
}, t1 = {
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
}, r1 = {
  keywords: [
    "boat",
    "paddle",
    "water",
    "ship"
  ],
  char: "🛶",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, o1 = {
  keywords: [
    "ship",
    "ferry",
    "sea",
    "boat"
  ],
  char: "⚓",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, s1 = {
  keywords: [
    "wip",
    "progress",
    "caution",
    "warning"
  ],
  char: "🚧",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, c1 = {
  keywords: [
    "gas station",
    "petroleum"
  ],
  char: "⛽",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, i1 = {
  keywords: [
    "transportation",
    "wait"
  ],
  char: "🚏",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, n1 = {
  keywords: [
    "transportation",
    "driving"
  ],
  char: "🚦",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, l1 = {
  keywords: [
    "transportation",
    "signal"
  ],
  char: "🚥",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, d1 = {
  keywords: [
    "contest",
    "finishline",
    "race",
    "gokart"
  ],
  char: "🏁",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, p1 = {
  keywords: [
    "transportation",
    "titanic",
    "deploy"
  ],
  char: "🚢",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, f1 = {
  keywords: [
    "photo",
    "carnival",
    "londoneye"
  ],
  char: "🎡",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, h1 = {
  keywords: [
    "carnival",
    "playground",
    "photo",
    "fun"
  ],
  char: "🎢",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, y1 = {
  keywords: [
    "photo",
    "carnival"
  ],
  char: "🎠",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, g1 = {
  keywords: [
    "wip",
    "working",
    "progress"
  ],
  char: "🏗",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, _1 = {
  keywords: [
    "photo",
    "mountain"
  ],
  char: "🌁",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, u1 = {
  keywords: [
    "photo",
    "japanese"
  ],
  char: "🗼",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, m1 = {
  keywords: [
    "building",
    "industry",
    "pollution",
    "smoke"
  ],
  char: "🏭",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, k1 = {
  keywords: [
    "photo",
    "summer",
    "water",
    "fresh"
  ],
  char: "⛲",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, w1 = {
  keywords: [
    "photo",
    "japan",
    "asia",
    "tsukimi"
  ],
  char: "🎑",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, b1 = {
  keywords: [
    "photo",
    "nature",
    "environment"
  ],
  char: "⛰",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, v1 = {
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
}, z1 = {
  keywords: [
    "photo",
    "mountain",
    "nature",
    "japanese"
  ],
  char: "🗻",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, x1 = {
  keywords: [
    "photo",
    "nature",
    "disaster"
  ],
  char: "🌋",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, j1 = {
  keywords: [
    "nation",
    "country",
    "japanese",
    "asia"
  ],
  char: "🗾",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, C1 = {
  keywords: [
    "photo",
    "outdoors",
    "tent"
  ],
  char: "🏕",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, E1 = {
  keywords: [
    "photo",
    "camping",
    "outdoors"
  ],
  char: "⛺",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, S1 = {
  keywords: [
    "photo",
    "environment",
    "nature"
  ],
  char: "🏞",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, A1 = {
  keywords: [
    "road",
    "cupertino",
    "interstate",
    "highway"
  ],
  char: "🛣",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, L1 = {
  keywords: [
    "train",
    "transportation"
  ],
  char: "🛤",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, $1 = {
  keywords: [
    "morning",
    "view",
    "vacation",
    "photo"
  ],
  char: "🌅",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, T1 = {
  keywords: [
    "view",
    "vacation",
    "photo"
  ],
  char: "🌄",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, F1 = {
  keywords: [
    "photo",
    "warm",
    "saharah"
  ],
  char: "🏜",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, P1 = {
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
}, R1 = {
  keywords: [
    "photo",
    "tropical",
    "mojito"
  ],
  char: "🏝",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, I1 = {
  keywords: [
    "photo",
    "good morning",
    "dawn"
  ],
  char: "🌇",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, q1 = {
  keywords: [
    "photo",
    "evening",
    "sky",
    "buildings"
  ],
  char: "🌆",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, O1 = {
  keywords: [
    "photo",
    "night life",
    "urban"
  ],
  char: "🏙",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, D1 = {
  keywords: [
    "evening",
    "city",
    "downtown"
  ],
  char: "🌃",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, M1 = {
  keywords: [
    "photo",
    "sanfrancisco"
  ],
  char: "🌉",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, B1 = {
  keywords: [
    "photo",
    "space",
    "stars"
  ],
  char: "🌌",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, N1 = {
  keywords: [
    "night",
    "photo"
  ],
  char: "🌠",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, H1 = {
  keywords: [
    "stars",
    "night",
    "shine"
  ],
  char: "🎇",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, U1 = {
  keywords: [
    "photo",
    "festival",
    "carnival",
    "congratulations"
  ],
  char: "🎆",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, V1 = {
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
}, W1 = {
  keywords: [
    "buildings",
    "photo"
  ],
  char: "🏘",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, K1 = {
  keywords: [
    "building",
    "royalty",
    "history"
  ],
  char: "🏰",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, G1 = {
  keywords: [
    "photo",
    "building"
  ],
  char: "🏯",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, X1 = {
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
}, Q1 = {
  keywords: [
    "american",
    "newyork"
  ],
  char: "🗽",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, J1 = {
  keywords: [
    "building",
    "home"
  ],
  char: "🏠",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Y1 = {
  keywords: [
    "home",
    "plant",
    "nature"
  ],
  char: "🏡",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, Z1 = {
  keywords: [
    "abandon",
    "evict",
    "broken",
    "building"
  ],
  char: "🏚",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, e0 = {
  keywords: [
    "building",
    "bureau",
    "work"
  ],
  char: "🏢",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, a0 = {
  keywords: [
    "building",
    "shopping",
    "mall"
  ],
  char: "🏬",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, t0 = {
  keywords: [
    "building",
    "envelope",
    "communication"
  ],
  char: "🏣",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, r0 = {
  keywords: [
    "building",
    "email"
  ],
  char: "🏤",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, o0 = {
  keywords: [
    "building",
    "health",
    "surgery",
    "doctor"
  ],
  char: "🏥",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, s0 = {
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
}, c0 = {
  keywords: [
    "building",
    "accomodation",
    "checkin"
  ],
  char: "🏨",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, i0 = {
  keywords: [
    "building",
    "shopping",
    "groceries"
  ],
  char: "🏪",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, n0 = {
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
}, l0 = {
  keywords: [
    "like",
    "affection",
    "dating"
  ],
  char: "🏩",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, d0 = {
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
}, p0 = {
  keywords: [
    "art",
    "culture",
    "history"
  ],
  char: "🏛",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, f0 = {
  keywords: [
    "building",
    "religion",
    "christ"
  ],
  char: "⛪",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, h0 = {
  keywords: [
    "islam",
    "worship",
    "minaret"
  ],
  char: "🕌",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, y0 = {
  keywords: [
    "judaism",
    "worship",
    "temple",
    "jewish"
  ],
  char: "🕍",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, g0 = {
  keywords: [
    "mecca",
    "mosque",
    "islam"
  ],
  char: "🕋",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, _0 = {
  keywords: [
    "temple",
    "japan",
    "kyoto"
  ],
  char: "⛩",
  fitzpatrick_scale: !1,
  category: "travel_and_places"
}, u0 = {
  keywords: [
    "time",
    "accessories"
  ],
  char: "⌚",
  fitzpatrick_scale: !1,
  category: "objects"
}, m0 = {
  keywords: [
    "technology",
    "apple",
    "gadgets",
    "dial"
  ],
  char: "📱",
  fitzpatrick_scale: !1,
  category: "objects"
}, k0 = {
  keywords: [
    "iphone",
    "incoming"
  ],
  char: "📲",
  fitzpatrick_scale: !1,
  category: "objects"
}, w0 = {
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
}, b0 = {
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
}, v0 = {
  keywords: [
    "technology",
    "computing",
    "screen"
  ],
  char: "🖥",
  fitzpatrick_scale: !1,
  category: "objects"
}, z0 = {
  keywords: [
    "paper",
    "ink"
  ],
  char: "🖨",
  fitzpatrick_scale: !1,
  category: "objects"
}, x0 = {
  keywords: [
    "click"
  ],
  char: "🖱",
  fitzpatrick_scale: !1,
  category: "objects"
}, j0 = {
  keywords: [
    "technology",
    "trackpad"
  ],
  char: "🖲",
  fitzpatrick_scale: !1,
  category: "objects"
}, C0 = {
  keywords: [
    "game",
    "play"
  ],
  char: "🕹",
  fitzpatrick_scale: !1,
  category: "objects"
}, E0 = {
  keywords: [
    "tool"
  ],
  char: "🗜",
  fitzpatrick_scale: !1,
  category: "objects"
}, S0 = {
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
}, A0 = {
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
}, L0 = {
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
}, $0 = {
  keywords: [
    "cd",
    "disk",
    "disc"
  ],
  char: "📀",
  fitzpatrick_scale: !1,
  category: "objects"
}, T0 = {
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
}, F0 = {
  keywords: [
    "gadgets",
    "photography"
  ],
  char: "📷",
  fitzpatrick_scale: !1,
  category: "objects"
}, P0 = {
  keywords: [
    "photography",
    "gadgets"
  ],
  char: "📸",
  fitzpatrick_scale: !1,
  category: "objects"
}, R0 = {
  keywords: [
    "film",
    "record"
  ],
  char: "📹",
  fitzpatrick_scale: !1,
  category: "objects"
}, I0 = {
  keywords: [
    "film",
    "record"
  ],
  char: "🎥",
  fitzpatrick_scale: !1,
  category: "objects"
}, q0 = {
  keywords: [
    "video",
    "tape",
    "record",
    "movie"
  ],
  char: "📽",
  fitzpatrick_scale: !1,
  category: "objects"
}, O0 = {
  keywords: [
    "movie"
  ],
  char: "🎞",
  fitzpatrick_scale: !1,
  category: "objects"
}, D0 = {
  keywords: [
    "technology",
    "communication",
    "dial"
  ],
  char: "📞",
  fitzpatrick_scale: !1,
  category: "objects"
}, M0 = {
  keywords: [
    "technology",
    "communication",
    "dial",
    "telephone"
  ],
  char: "☎️",
  fitzpatrick_scale: !1,
  category: "objects"
}, B0 = {
  keywords: [
    "bbcall",
    "oldschool",
    "90s"
  ],
  char: "📟",
  fitzpatrick_scale: !1,
  category: "objects"
}, N0 = {
  keywords: [
    "communication",
    "technology"
  ],
  char: "📠",
  fitzpatrick_scale: !1,
  category: "objects"
}, H0 = {
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
}, U0 = {
  keywords: [
    "communication",
    "music",
    "podcast",
    "program"
  ],
  char: "📻",
  fitzpatrick_scale: !1,
  category: "objects"
}, V0 = {
  keywords: [
    "sing",
    "recording",
    "artist",
    "talkshow"
  ],
  char: "🎙",
  fitzpatrick_scale: !1,
  category: "objects"
}, W0 = {
  keywords: [
    "scale"
  ],
  char: "🎚",
  fitzpatrick_scale: !1,
  category: "objects"
}, K0 = {
  keywords: [
    "dial"
  ],
  char: "🎛",
  fitzpatrick_scale: !1,
  category: "objects"
}, G0 = {
  keywords: [
    "magnetic",
    "navigation",
    "orienteering"
  ],
  char: "🧭",
  fitzpatrick_scale: !1,
  category: "objects"
}, X0 = {
  keywords: [
    "time",
    "deadline"
  ],
  char: "⏱",
  fitzpatrick_scale: !1,
  category: "objects"
}, Q0 = {
  keywords: [
    "alarm"
  ],
  char: "⏲",
  fitzpatrick_scale: !1,
  category: "objects"
}, J0 = {
  keywords: [
    "time",
    "wake"
  ],
  char: "⏰",
  fitzpatrick_scale: !1,
  category: "objects"
}, Y0 = {
  keywords: [
    "time"
  ],
  char: "🕰",
  fitzpatrick_scale: !1,
  category: "objects"
}, Z0 = {
  keywords: [
    "oldschool",
    "time",
    "countdown"
  ],
  char: "⏳",
  fitzpatrick_scale: !1,
  category: "objects"
}, ev = {
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
}, av = {
  keywords: [
    "communication",
    "future",
    "radio",
    "space"
  ],
  char: "📡",
  fitzpatrick_scale: !1,
  category: "objects"
}, tv = {
  keywords: [
    "power",
    "energy",
    "sustain"
  ],
  char: "🔋",
  fitzpatrick_scale: !1,
  category: "objects"
}, rv = {
  keywords: [
    "charger",
    "power"
  ],
  char: "🔌",
  fitzpatrick_scale: !1,
  category: "objects"
}, ov = {
  keywords: [
    "light",
    "electricity",
    "idea"
  ],
  char: "💡",
  fitzpatrick_scale: !1,
  category: "objects"
}, sv = {
  keywords: [
    "dark",
    "camping",
    "sight",
    "night"
  ],
  char: "🔦",
  fitzpatrick_scale: !1,
  category: "objects"
}, cv = {
  keywords: [
    "fire",
    "wax"
  ],
  char: "🕯",
  fitzpatrick_scale: !1,
  category: "objects"
}, iv = {
  keywords: [
    "quench"
  ],
  char: "🧯",
  fitzpatrick_scale: !1,
  category: "objects"
}, nv = {
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
}, lv = {
  keywords: [
    "barrell"
  ],
  char: "🛢",
  fitzpatrick_scale: !1,
  category: "objects"
}, dv = {
  keywords: [
    "dollar",
    "bills",
    "payment",
    "sale"
  ],
  char: "💸",
  fitzpatrick_scale: !1,
  category: "objects"
}, pv = {
  keywords: [
    "money",
    "sales",
    "bill",
    "currency"
  ],
  char: "💵",
  fitzpatrick_scale: !1,
  category: "objects"
}, fv = {
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
}, hv = {
  keywords: [
    "money",
    "sales",
    "dollar",
    "currency"
  ],
  char: "💶",
  fitzpatrick_scale: !1,
  category: "objects"
}, yv = {
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
}, gv = {
  keywords: [
    "dollar",
    "payment",
    "coins",
    "sale"
  ],
  char: "💰",
  fitzpatrick_scale: !1,
  category: "objects"
}, _v = {
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
}, uv = {
  keywords: [
    "blue",
    "ruby",
    "diamond",
    "jewelry"
  ],
  char: "💎",
  fitzpatrick_scale: !1,
  category: "objects"
}, mv = {
  keywords: [
    "law",
    "fairness",
    "weight"
  ],
  char: "⚖",
  fitzpatrick_scale: !1,
  category: "objects"
}, kv = {
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
}, wv = {
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
}, bv = {
  keywords: [
    "tools",
    "build",
    "create"
  ],
  char: "🔨",
  fitzpatrick_scale: !1,
  category: "objects"
}, vv = {
  keywords: [
    "tools",
    "build",
    "create"
  ],
  char: "⚒",
  fitzpatrick_scale: !1,
  category: "objects"
}, zv = {
  keywords: [
    "tools",
    "build",
    "create"
  ],
  char: "🛠",
  fitzpatrick_scale: !1,
  category: "objects"
}, xv = {
  keywords: [
    "tools",
    "dig"
  ],
  char: "⛏",
  fitzpatrick_scale: !1,
  category: "objects"
}, jv = {
  keywords: [
    "handy",
    "tools",
    "fix"
  ],
  char: "🔩",
  fitzpatrick_scale: !1,
  category: "objects"
}, Cv = {
  keywords: [
    "cog"
  ],
  char: "⚙",
  fitzpatrick_scale: !1,
  category: "objects"
}, Ev = {
  keywords: [
    "bricks"
  ],
  char: "🧱",
  fitzpatrick_scale: !1,
  category: "objects"
}, Sv = {
  keywords: [
    "lock",
    "arrest"
  ],
  char: "⛓",
  fitzpatrick_scale: !1,
  category: "objects"
}, Av = {
  keywords: [
    "attraction",
    "magnetic"
  ],
  char: "🧲",
  fitzpatrick_scale: !1,
  category: "objects"
}, Lv = {
  keywords: [
    "violence",
    "weapon",
    "pistol",
    "revolver"
  ],
  char: "🔫",
  fitzpatrick_scale: !1,
  category: "objects"
}, $v = {
  keywords: [
    "boom",
    "explode",
    "explosion",
    "terrorism"
  ],
  char: "💣",
  fitzpatrick_scale: !1,
  category: "objects"
}, Tv = {
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
}, Fv = {
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
}, Pv = {
  keywords: [
    "weapon"
  ],
  char: "🗡",
  fitzpatrick_scale: !1,
  category: "objects"
}, Rv = {
  keywords: [
    "weapon"
  ],
  char: "⚔",
  fitzpatrick_scale: !1,
  category: "objects"
}, Iv = {
  keywords: [
    "protection",
    "security"
  ],
  char: "🛡",
  fitzpatrick_scale: !1,
  category: "objects"
}, qv = {
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
}, Ov = {
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
}, Dv = {
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
}, Mv = {
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
}, Bv = {
  keywords: [
    "vase",
    "jar"
  ],
  char: "🏺",
  fitzpatrick_scale: !1,
  category: "objects"
}, Nv = {
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
}, Hv = {
  keywords: [
    "dhikr",
    "religious"
  ],
  char: "📿",
  fitzpatrick_scale: !1,
  category: "objects"
}, Uv = {
  keywords: [
    "bead",
    "charm"
  ],
  char: "🧿",
  fitzpatrick_scale: !1,
  category: "objects"
}, Vv = {
  keywords: [
    "hair",
    "salon",
    "style"
  ],
  char: "💈",
  fitzpatrick_scale: !1,
  category: "objects"
}, Wv = {
  keywords: [
    "distilling",
    "science",
    "experiment",
    "chemistry"
  ],
  char: "⚗",
  fitzpatrick_scale: !1,
  category: "objects"
}, Kv = {
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
}, Gv = {
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
}, Xv = {
  keywords: [
    "embarrassing"
  ],
  char: "🕳",
  fitzpatrick_scale: !1,
  category: "objects"
}, Qv = {
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
}, Jv = {
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
}, Yv = {
  keywords: [
    "biologist",
    "genetics",
    "life"
  ],
  char: "🧬",
  fitzpatrick_scale: !1,
  category: "objects"
}, Zv = {
  keywords: [
    "amoeba",
    "bacteria",
    "germs"
  ],
  char: "🦠",
  fitzpatrick_scale: !1,
  category: "objects"
}, ez = {
  keywords: [
    "bacteria",
    "biology",
    "culture",
    "lab"
  ],
  char: "🧫",
  fitzpatrick_scale: !1,
  category: "objects"
}, az = {
  keywords: [
    "chemistry",
    "experiment",
    "lab",
    "science"
  ],
  char: "🧪",
  fitzpatrick_scale: !1,
  category: "objects"
}, tz = {
  keywords: [
    "weather",
    "temperature",
    "hot",
    "cold"
  ],
  char: "🌡",
  fitzpatrick_scale: !1,
  category: "objects"
}, rz = {
  keywords: [
    "cleaning",
    "sweeping",
    "witch"
  ],
  char: "🧹",
  fitzpatrick_scale: !1,
  category: "objects"
}, oz = {
  keywords: [
    "laundry"
  ],
  char: "🧺",
  fitzpatrick_scale: !1,
  category: "objects"
}, sz = {
  keywords: [
    "roll"
  ],
  char: "🧻",
  fitzpatrick_scale: !1,
  category: "objects"
}, cz = {
  keywords: [
    "sale",
    "tag"
  ],
  char: "🏷",
  fitzpatrick_scale: !1,
  category: "objects"
}, iz = {
  keywords: [
    "favorite",
    "label",
    "save"
  ],
  char: "🔖",
  fitzpatrick_scale: !1,
  category: "objects"
}, nz = {
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
}, lz = {
  keywords: [
    "clean",
    "water",
    "bathroom"
  ],
  char: "🚿",
  fitzpatrick_scale: !1,
  category: "objects"
}, dz = {
  keywords: [
    "clean",
    "shower",
    "bathroom"
  ],
  char: "🛁",
  fitzpatrick_scale: !1,
  category: "objects"
}, pz = {
  keywords: [
    "bar",
    "bathing",
    "cleaning",
    "lather"
  ],
  char: "🧼",
  fitzpatrick_scale: !1,
  category: "objects"
}, fz = {
  keywords: [
    "absorbing",
    "cleaning",
    "porous"
  ],
  char: "🧽",
  fitzpatrick_scale: !1,
  category: "objects"
}, hz = {
  keywords: [
    "moisturizer",
    "sunscreen"
  ],
  char: "🧴",
  fitzpatrick_scale: !1,
  category: "objects"
}, yz = {
  keywords: [
    "lock",
    "door",
    "password"
  ],
  char: "🔑",
  fitzpatrick_scale: !1,
  category: "objects"
}, gz = {
  keywords: [
    "lock",
    "door",
    "password"
  ],
  char: "🗝",
  fitzpatrick_scale: !1,
  category: "objects"
}, _z = {
  keywords: [
    "read",
    "chill"
  ],
  char: "🛋",
  fitzpatrick_scale: !1,
  category: "objects"
}, uz = {
  keywords: [
    "bed",
    "rest"
  ],
  char: "🛌",
  fitzpatrick_scale: !0,
  category: "objects"
}, mz = {
  keywords: [
    "sleep",
    "rest"
  ],
  char: "🛏",
  fitzpatrick_scale: !1,
  category: "objects"
}, kz = {
  keywords: [
    "house",
    "entry",
    "exit"
  ],
  char: "🚪",
  fitzpatrick_scale: !1,
  category: "objects"
}, wz = {
  keywords: [
    "service"
  ],
  char: "🛎",
  fitzpatrick_scale: !1,
  category: "objects"
}, bz = {
  keywords: [
    "plush",
    "stuffed"
  ],
  char: "🧸",
  fitzpatrick_scale: !1,
  category: "objects"
}, vz = {
  keywords: [
    "photography"
  ],
  char: "🖼",
  fitzpatrick_scale: !1,
  category: "objects"
}, zz = {
  keywords: [
    "location",
    "direction"
  ],
  char: "🗺",
  fitzpatrick_scale: !1,
  category: "objects"
}, xz = {
  keywords: [
    "weather",
    "summer"
  ],
  char: "⛱",
  fitzpatrick_scale: !1,
  category: "objects"
}, jz = {
  keywords: [
    "rock",
    "easter island",
    "moai"
  ],
  char: "🗿",
  fitzpatrick_scale: !1,
  category: "objects"
}, Cz = {
  keywords: [
    "mall",
    "buy",
    "purchase"
  ],
  char: "🛍",
  fitzpatrick_scale: !1,
  category: "objects"
}, Ez = {
  keywords: [
    "trolley"
  ],
  char: "🛒",
  fitzpatrick_scale: !1,
  category: "objects"
}, Sz = {
  keywords: [
    "party",
    "celebration",
    "birthday",
    "circus"
  ],
  char: "🎈",
  fitzpatrick_scale: !1,
  category: "objects"
}, Az = {
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
}, Lz = {
  keywords: [
    "decoration",
    "pink",
    "girl",
    "bowtie"
  ],
  char: "🎀",
  fitzpatrick_scale: !1,
  category: "objects"
}, $z = {
  keywords: [
    "present",
    "birthday",
    "christmas",
    "xmas"
  ],
  char: "🎁",
  fitzpatrick_scale: !1,
  category: "objects"
}, Tz = {
  keywords: [
    "festival",
    "party",
    "birthday",
    "circus"
  ],
  char: "🎊",
  fitzpatrick_scale: !1,
  category: "objects"
}, Fz = {
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
}, Pz = {
  keywords: [
    "japanese",
    "toy",
    "kimono"
  ],
  char: "🎎",
  fitzpatrick_scale: !1,
  category: "objects"
}, Rz = {
  keywords: [
    "nature",
    "ding",
    "spring",
    "bell"
  ],
  char: "🎐",
  fitzpatrick_scale: !1,
  category: "objects"
}, Iz = {
  keywords: [
    "japanese",
    "nation",
    "country",
    "border"
  ],
  char: "🎌",
  fitzpatrick_scale: !1,
  category: "objects"
}, qz = {
  keywords: [
    "light",
    "paper",
    "halloween",
    "spooky"
  ],
  char: "🏮",
  fitzpatrick_scale: !1,
  category: "objects"
}, Oz = {
  keywords: [
    "gift"
  ],
  char: "🧧",
  fitzpatrick_scale: !1,
  category: "objects"
}, Dz = {
  keywords: [
    "letter",
    "postal",
    "inbox",
    "communication"
  ],
  char: "✉️",
  fitzpatrick_scale: !1,
  category: "objects"
}, Mz = {
  keywords: [
    "email",
    "communication"
  ],
  char: "📩",
  fitzpatrick_scale: !1,
  category: "objects"
}, Bz = {
  keywords: [
    "email",
    "inbox"
  ],
  char: "📨",
  fitzpatrick_scale: !1,
  category: "objects"
}, Nz = {
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
}, Hz = {
  keywords: [
    "email",
    "letter",
    "envelope"
  ],
  char: "📮",
  fitzpatrick_scale: !1,
  category: "objects"
}, Uz = {
  keywords: [
    "email",
    "communication",
    "inbox"
  ],
  char: "📪",
  fitzpatrick_scale: !1,
  category: "objects"
}, Vz = {
  keywords: [
    "email",
    "inbox",
    "communication"
  ],
  char: "📫",
  fitzpatrick_scale: !1,
  category: "objects"
}, Wz = {
  keywords: [
    "email",
    "inbox",
    "communication"
  ],
  char: "📬",
  fitzpatrick_scale: !1,
  category: "objects"
}, Kz = {
  keywords: [
    "email",
    "inbox"
  ],
  char: "📭",
  fitzpatrick_scale: !1,
  category: "objects"
}, Gz = {
  keywords: [
    "instrument",
    "music"
  ],
  char: "📯",
  fitzpatrick_scale: !1,
  category: "objects"
}, Xz = {
  keywords: [
    "email",
    "documents"
  ],
  char: "📥",
  fitzpatrick_scale: !1,
  category: "objects"
}, Qz = {
  keywords: [
    "inbox",
    "email"
  ],
  char: "📤",
  fitzpatrick_scale: !1,
  category: "objects"
}, Jz = {
  keywords: [
    "documents",
    "ancient",
    "history",
    "paper"
  ],
  char: "📜",
  fitzpatrick_scale: !1,
  category: "objects"
}, Yz = {
  keywords: [
    "documents",
    "office",
    "paper"
  ],
  char: "📃",
  fitzpatrick_scale: !1,
  category: "objects"
}, Zz = {
  keywords: [
    "favorite",
    "save",
    "order",
    "tidy"
  ],
  char: "📑",
  fitzpatrick_scale: !1,
  category: "objects"
}, e2 = {
  keywords: [
    "accounting",
    "expenses"
  ],
  char: "🧾",
  fitzpatrick_scale: !1,
  category: "objects"
}, a2 = {
  keywords: [
    "graph",
    "presentation",
    "stats"
  ],
  char: "📊",
  fitzpatrick_scale: !1,
  category: "objects"
}, t2 = {
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
}, r2 = {
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
}, o2 = {
  keywords: [
    "documents",
    "office",
    "paper",
    "information"
  ],
  char: "📄",
  fitzpatrick_scale: !1,
  category: "objects"
}, s2 = {
  keywords: [
    "calendar",
    "schedule"
  ],
  char: "📅",
  fitzpatrick_scale: !1,
  category: "objects"
}, c2 = {
  keywords: [
    "schedule",
    "date",
    "planning"
  ],
  char: "📆",
  fitzpatrick_scale: !1,
  category: "objects"
}, i2 = {
  keywords: [
    "date",
    "schedule",
    "planning"
  ],
  char: "🗓",
  fitzpatrick_scale: !1,
  category: "objects"
}, n2 = {
  keywords: [
    "business",
    "stationery"
  ],
  char: "📇",
  fitzpatrick_scale: !1,
  category: "objects"
}, l2 = {
  keywords: [
    "business",
    "stationery"
  ],
  char: "🗃",
  fitzpatrick_scale: !1,
  category: "objects"
}, d2 = {
  keywords: [
    "election",
    "vote"
  ],
  char: "🗳",
  fitzpatrick_scale: !1,
  category: "objects"
}, p2 = {
  keywords: [
    "filing",
    "organizing"
  ],
  char: "🗄",
  fitzpatrick_scale: !1,
  category: "objects"
}, f2 = {
  keywords: [
    "stationery",
    "documents"
  ],
  char: "📋",
  fitzpatrick_scale: !1,
  category: "objects"
}, h2 = {
  keywords: [
    "memo",
    "stationery"
  ],
  char: "🗒",
  fitzpatrick_scale: !1,
  category: "objects"
}, y2 = {
  keywords: [
    "documents",
    "business",
    "office"
  ],
  char: "📁",
  fitzpatrick_scale: !1,
  category: "objects"
}, g2 = {
  keywords: [
    "documents",
    "load"
  ],
  char: "📂",
  fitzpatrick_scale: !1,
  category: "objects"
}, _2 = {
  keywords: [
    "organizing",
    "business",
    "stationery"
  ],
  char: "🗂",
  fitzpatrick_scale: !1,
  category: "objects"
}, u2 = {
  keywords: [
    "press",
    "headline"
  ],
  char: "🗞",
  fitzpatrick_scale: !1,
  category: "objects"
}, m2 = {
  keywords: [
    "press",
    "headline"
  ],
  char: "📰",
  fitzpatrick_scale: !1,
  category: "objects"
}, k2 = {
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
}, w2 = {
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
}, b2 = {
  keywords: [
    "read",
    "library",
    "knowledge",
    "study"
  ],
  char: "📗",
  fitzpatrick_scale: !1,
  category: "objects"
}, v2 = {
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
}, z2 = {
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
}, x2 = {
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
}, j2 = {
  keywords: [
    "notes",
    "paper"
  ],
  char: "📒",
  fitzpatrick_scale: !1,
  category: "objects"
}, C2 = {
  keywords: [
    "literature",
    "library",
    "study"
  ],
  char: "📚",
  fitzpatrick_scale: !1,
  category: "objects"
}, E2 = {
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
}, S2 = {
  keywords: [
    "diaper"
  ],
  char: "🧷",
  fitzpatrick_scale: !1,
  category: "objects"
}, A2 = {
  keywords: [
    "rings",
    "url"
  ],
  char: "🔗",
  fitzpatrick_scale: !1,
  category: "objects"
}, L2 = {
  keywords: [
    "documents",
    "stationery"
  ],
  char: "📎",
  fitzpatrick_scale: !1,
  category: "objects"
}, $2 = {
  keywords: [
    "documents",
    "stationery"
  ],
  char: "🖇",
  fitzpatrick_scale: !1,
  category: "objects"
}, T2 = {
  keywords: [
    "stationery",
    "cut"
  ],
  char: "✂️",
  fitzpatrick_scale: !1,
  category: "objects"
}, F2 = {
  keywords: [
    "stationery",
    "math",
    "architect",
    "sketch"
  ],
  char: "📐",
  fitzpatrick_scale: !1,
  category: "objects"
}, P2 = {
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
}, R2 = {
  keywords: [
    "calculation"
  ],
  char: "🧮",
  fitzpatrick_scale: !1,
  category: "objects"
}, I2 = {
  keywords: [
    "stationery",
    "mark",
    "here"
  ],
  char: "📌",
  fitzpatrick_scale: !1,
  category: "objects"
}, q2 = {
  keywords: [
    "stationery",
    "location",
    "map",
    "here"
  ],
  char: "📍",
  fitzpatrick_scale: !1,
  category: "objects"
}, O2 = {
  keywords: [
    "mark",
    "milestone",
    "place"
  ],
  char: "🚩",
  fitzpatrick_scale: !1,
  category: "objects"
}, D2 = {
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
}, M2 = {
  keywords: [
    "pirate"
  ],
  char: "🏴",
  fitzpatrick_scale: !1,
  category: "objects"
}, B2 = {
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
}, N2 = {
  keywords: [
    "security",
    "privacy"
  ],
  char: "🔐",
  fitzpatrick_scale: !1,
  category: "objects"
}, H2 = {
  keywords: [
    "security",
    "password",
    "padlock"
  ],
  char: "🔒",
  fitzpatrick_scale: !1,
  category: "objects"
}, U2 = {
  keywords: [
    "privacy",
    "security"
  ],
  char: "🔓",
  fitzpatrick_scale: !1,
  category: "objects"
}, V2 = {
  keywords: [
    "security",
    "secret"
  ],
  char: "🔏",
  fitzpatrick_scale: !1,
  category: "objects"
}, W2 = {
  keywords: [
    "stationery",
    "writing",
    "write"
  ],
  char: "🖊",
  fitzpatrick_scale: !1,
  category: "objects"
}, K2 = {
  keywords: [
    "stationery",
    "writing",
    "write"
  ],
  char: "🖋",
  fitzpatrick_scale: !1,
  category: "objects"
}, G2 = {
  keywords: [
    "pen",
    "stationery",
    "writing",
    "write"
  ],
  char: "✒️",
  fitzpatrick_scale: !1,
  category: "objects"
}, X2 = {
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
}, Q2 = {
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
}, J2 = {
  keywords: [
    "drawing",
    "creativity"
  ],
  char: "🖍",
  fitzpatrick_scale: !1,
  category: "objects"
}, Y2 = {
  keywords: [
    "drawing",
    "creativity",
    "art"
  ],
  char: "🖌",
  fitzpatrick_scale: !1,
  category: "objects"
}, Z2 = {
  keywords: [
    "search",
    "zoom",
    "find",
    "detective"
  ],
  char: "🔍",
  fitzpatrick_scale: !1,
  category: "objects"
}, e3 = {
  keywords: [
    "search",
    "zoom",
    "find",
    "detective"
  ],
  char: "🔎",
  fitzpatrick_scale: !1,
  category: "objects"
}, a3 = {
  keywords: [
    "love",
    "like",
    "valentines"
  ],
  char: "❤️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, t3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "🧡",
  fitzpatrick_scale: !1,
  category: "symbols"
}, r3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, o3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, s3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💙",
  fitzpatrick_scale: !1,
  category: "symbols"
}, c3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, i3 = {
  keywords: [
    "evil"
  ],
  char: "🖤",
  fitzpatrick_scale: !1,
  category: "symbols"
}, n3 = {
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
}, l3 = {
  keywords: [
    "decoration",
    "love"
  ],
  char: "❣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, d3 = {
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
}, p3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💞",
  fitzpatrick_scale: !1,
  category: "symbols"
}, f3 = {
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
}, h3 = {
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
}, y3 = {
  keywords: [
    "love",
    "like",
    "affection",
    "valentines"
  ],
  char: "💖",
  fitzpatrick_scale: !1,
  category: "symbols"
}, g3 = {
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
}, _3 = {
  keywords: [
    "love",
    "valentines"
  ],
  char: "💝",
  fitzpatrick_scale: !1,
  category: "symbols"
}, u3 = {
  keywords: [
    "purple-square",
    "love",
    "like"
  ],
  char: "💟",
  fitzpatrick_scale: !1,
  category: "symbols"
}, m3 = {
  keywords: [
    "hippie"
  ],
  char: "☮",
  fitzpatrick_scale: !1,
  category: "symbols"
}, k3 = {
  keywords: [
    "christianity"
  ],
  char: "✝",
  fitzpatrick_scale: !1,
  category: "symbols"
}, w3 = {
  keywords: [
    "islam"
  ],
  char: "☪",
  fitzpatrick_scale: !1,
  category: "symbols"
}, b3 = {
  keywords: [
    "hinduism",
    "buddhism",
    "sikhism",
    "jainism"
  ],
  char: "🕉",
  fitzpatrick_scale: !1,
  category: "symbols"
}, v3 = {
  keywords: [
    "hinduism",
    "buddhism",
    "sikhism",
    "jainism"
  ],
  char: "☸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, z3 = {
  keywords: [
    "judaism"
  ],
  char: "✡",
  fitzpatrick_scale: !1,
  category: "symbols"
}, x3 = {
  keywords: [
    "purple-square",
    "religion",
    "jewish",
    "hexagram"
  ],
  char: "🔯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, j3 = {
  keywords: [
    "hanukkah",
    "candles",
    "jewish"
  ],
  char: "🕎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, C3 = {
  keywords: [
    "balance"
  ],
  char: "☯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, E3 = {
  keywords: [
    "suppedaneum",
    "religion"
  ],
  char: "☦",
  fitzpatrick_scale: !1,
  category: "symbols"
}, S3 = {
  keywords: [
    "religion",
    "church",
    "temple",
    "prayer"
  ],
  char: "🛐",
  fitzpatrick_scale: !1,
  category: "symbols"
}, A3 = {
  keywords: [
    "sign",
    "purple-square",
    "constellation",
    "astrology"
  ],
  char: "⛎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, L3 = {
  keywords: [
    "sign",
    "purple-square",
    "zodiac",
    "astrology"
  ],
  char: "♈",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $3 = {
  keywords: [
    "purple-square",
    "sign",
    "zodiac",
    "astrology"
  ],
  char: "♉",
  fitzpatrick_scale: !1,
  category: "symbols"
}, T3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♊",
  fitzpatrick_scale: !1,
  category: "symbols"
}, F3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♋",
  fitzpatrick_scale: !1,
  category: "symbols"
}, P3 = {
  keywords: [
    "sign",
    "purple-square",
    "zodiac",
    "astrology"
  ],
  char: "♌",
  fitzpatrick_scale: !1,
  category: "symbols"
}, R3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♍",
  fitzpatrick_scale: !1,
  category: "symbols"
}, I3 = {
  keywords: [
    "sign",
    "purple-square",
    "zodiac",
    "astrology"
  ],
  char: "♎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, q3 = {
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
}, O3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♐",
  fitzpatrick_scale: !1,
  category: "symbols"
}, D3 = {
  keywords: [
    "sign",
    "zodiac",
    "purple-square",
    "astrology"
  ],
  char: "♑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, M3 = {
  keywords: [
    "sign",
    "purple-square",
    "zodiac",
    "astrology"
  ],
  char: "♒",
  fitzpatrick_scale: !1,
  category: "symbols"
}, B3 = {
  keywords: [
    "purple-square",
    "sign",
    "zodiac",
    "astrology"
  ],
  char: "♓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, N3 = {
  keywords: [
    "purple-square",
    "words"
  ],
  char: "🆔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, H3 = {
  keywords: [
    "science",
    "physics",
    "chemistry"
  ],
  char: "⚛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, U3 = {
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
}, V3 = {
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
}, W3 = {
  keywords: [
    "nuclear",
    "danger"
  ],
  char: "☢",
  fitzpatrick_scale: !1,
  category: "symbols"
}, K3 = {
  keywords: [
    "danger"
  ],
  char: "☣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, G3 = {
  keywords: [
    "mute",
    "orange-square",
    "silence",
    "quiet"
  ],
  char: "📴",
  fitzpatrick_scale: !1,
  category: "symbols"
}, X3 = {
  keywords: [
    "orange-square",
    "phone"
  ],
  char: "📳",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Q3 = {
  keywords: [
    "orange-square",
    "chinese",
    "have",
    "kanji"
  ],
  char: "🈶",
  fitzpatrick_scale: !1,
  category: "symbols"
}, J3 = {
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
}, Y3 = {
  keywords: [
    "chinese",
    "japanese",
    "kanji",
    "orange-square"
  ],
  char: "🈸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Z3 = {
  keywords: [
    "japanese",
    "opening hours",
    "orange-square"
  ],
  char: "🈺",
  fitzpatrick_scale: !1,
  category: "symbols"
}, e5 = {
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
}, a5 = {
  keywords: [
    "orange-square",
    "shape",
    "polygon"
  ],
  char: "✴️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, t5 = {
  keywords: [
    "words",
    "orange-square"
  ],
  char: "🆚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, r5 = {
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
}, o5 = {
  keywords: [
    "japanese",
    "spring"
  ],
  char: "💮",
  fitzpatrick_scale: !1,
  category: "symbols"
}, s5 = {
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
}, c5 = {
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
}, i5 = {
  keywords: [
    "chinese",
    "kanji",
    "japanese",
    "red-circle"
  ],
  char: "㊗️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, n5 = {
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
}, l5 = {
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
}, d5 = {
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
}, p5 = {
  keywords: [
    "red-square",
    "alphabet",
    "letter"
  ],
  char: "🅰️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, f5 = {
  keywords: [
    "red-square",
    "alphabet",
    "letter"
  ],
  char: "🅱️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, h5 = {
  keywords: [
    "red-square",
    "alphabet"
  ],
  char: "🆎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, y5 = {
  keywords: [
    "alphabet",
    "words",
    "red-square"
  ],
  char: "🆑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, g5 = {
  keywords: [
    "alphabet",
    "red-square",
    "letter"
  ],
  char: "🅾️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _5 = {
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
}, u5 = {
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
}, m5 = {
  keywords: [
    "fire",
    "forbid"
  ],
  char: "📛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, k5 = {
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
}, w5 = {
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
}, b5 = {
  keywords: [
    "circle",
    "round"
  ],
  char: "⭕",
  fitzpatrick_scale: !1,
  category: "symbols"
}, v5 = {
  keywords: [
    "stop"
  ],
  char: "🛑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, z5 = {
  keywords: [
    "angry",
    "mad"
  ],
  char: "💢",
  fitzpatrick_scale: !1,
  category: "symbols"
}, x5 = {
  keywords: [
    "bath",
    "warm",
    "relax"
  ],
  char: "♨️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, j5 = {
  keywords: [
    "rules",
    "crossing",
    "walking",
    "circle"
  ],
  char: "🚷",
  fitzpatrick_scale: !1,
  category: "symbols"
}, C5 = {
  keywords: [
    "trash",
    "bin",
    "garbage",
    "circle"
  ],
  char: "🚯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, E5 = {
  keywords: [
    "cyclist",
    "prohibited",
    "circle"
  ],
  char: "🚳",
  fitzpatrick_scale: !1,
  category: "symbols"
}, S5 = {
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
}, A5 = {
  keywords: [
    "iphone",
    "mute",
    "circle"
  ],
  char: "📵",
  fitzpatrick_scale: !1,
  category: "symbols"
}, L5 = {
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
}, $5 = {
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
}, T5 = {
  keywords: [
    "doubt",
    "confused"
  ],
  char: "❓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, F5 = {
  keywords: [
    "doubts",
    "gray",
    "huh",
    "confused"
  ],
  char: "❔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, P5 = {
  keywords: [
    "exclamation",
    "surprise"
  ],
  char: "‼️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, R5 = {
  keywords: [
    "wat",
    "punctuation",
    "surprise"
  ],
  char: "⁉️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, I5 = {
  keywords: [
    "sun",
    "afternoon",
    "warm",
    "summer"
  ],
  char: "🔅",
  fitzpatrick_scale: !1,
  category: "symbols"
}, q5 = {
  keywords: [
    "sun",
    "light"
  ],
  char: "🔆",
  fitzpatrick_scale: !1,
  category: "symbols"
}, O5 = {
  keywords: [
    "weapon",
    "spear"
  ],
  char: "🔱",
  fitzpatrick_scale: !1,
  category: "symbols"
}, D5 = {
  keywords: [
    "decorative",
    "scout"
  ],
  char: "⚜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, M5 = {
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
}, B5 = {
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
}, N5 = {
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
}, H5 = {
  keywords: [
    "badge",
    "shield"
  ],
  char: "🔰",
  fitzpatrick_scale: !1,
  category: "symbols"
}, U5 = {
  keywords: [
    "arrow",
    "environment",
    "garbage",
    "trash"
  ],
  char: "♻️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, V5 = {
  keywords: [
    "chinese",
    "point",
    "green-square",
    "kanji"
  ],
  char: "🈯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, W5 = {
  keywords: [
    "green-square",
    "graph",
    "presentation",
    "stats"
  ],
  char: "💹",
  fitzpatrick_scale: !1,
  category: "symbols"
}, K5 = {
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
}, G5 = {
  keywords: [
    "star",
    "sparkle",
    "green-square"
  ],
  char: "✳️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, X5 = {
  keywords: [
    "x",
    "green-square",
    "no",
    "deny"
  ],
  char: "❎",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Q5 = {
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
}, J5 = {
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
}, Y5 = {
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
}, Z5 = {
  keywords: [
    "tape",
    "cassette"
  ],
  char: "➿",
  fitzpatrick_scale: !1,
  category: "symbols"
}, e4 = {
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
}, a4 = {
  keywords: [
    "alphabet",
    "blue-circle",
    "letter"
  ],
  char: "Ⓜ️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, t4 = {
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
}, r4 = {
  keywords: [
    "japanese",
    "blue-square",
    "katakana"
  ],
  char: "🈂️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, o4 = {
  keywords: [
    "custom",
    "blue-square"
  ],
  char: "🛂",
  fitzpatrick_scale: !1,
  category: "symbols"
}, s4 = {
  keywords: [
    "passport",
    "border",
    "blue-square"
  ],
  char: "🛃",
  fitzpatrick_scale: !1,
  category: "symbols"
}, c4 = {
  keywords: [
    "blue-square",
    "airport",
    "transport"
  ],
  char: "🛄",
  fitzpatrick_scale: !1,
  category: "symbols"
}, i4 = {
  keywords: [
    "blue-square",
    "travel"
  ],
  char: "🛅",
  fitzpatrick_scale: !1,
  category: "symbols"
}, n4 = {
  keywords: [
    "blue-square",
    "disabled",
    "a11y",
    "accessibility"
  ],
  char: "♿",
  fitzpatrick_scale: !1,
  category: "symbols"
}, l4 = {
  keywords: [
    "cigarette",
    "blue-square",
    "smell",
    "smoke"
  ],
  char: "🚭",
  fitzpatrick_scale: !1,
  category: "symbols"
}, d4 = {
  keywords: [
    "toilet",
    "restroom",
    "blue-square"
  ],
  char: "🚾",
  fitzpatrick_scale: !1,
  category: "symbols"
}, p4 = {
  keywords: [
    "cars",
    "blue-square",
    "alphabet",
    "letter"
  ],
  char: "🅿️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, f4 = {
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
}, h4 = {
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
}, y4 = {
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
}, g4 = {
  keywords: [
    "orange-square",
    "child"
  ],
  char: "🚼",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _4 = {
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
}, u4 = {
  keywords: [
    "blue-square",
    "sign",
    "human",
    "info"
  ],
  char: "🚮",
  fitzpatrick_scale: !1,
  category: "symbols"
}, m4 = {
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
}, k4 = {
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
}, w4 = {
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
}, b4 = {
  keywords: [
    "blue-square",
    "words",
    "shape",
    "icon"
  ],
  char: "🆖",
  fitzpatrick_scale: !1,
  category: "symbols"
}, v4 = {
  keywords: [
    "good",
    "agree",
    "yes",
    "blue-square"
  ],
  char: "🆗",
  fitzpatrick_scale: !1,
  category: "symbols"
}, z4 = {
  keywords: [
    "blue-square",
    "above",
    "high"
  ],
  char: "🆙",
  fitzpatrick_scale: !1,
  category: "symbols"
}, x4 = {
  keywords: [
    "words",
    "blue-square"
  ],
  char: "🆒",
  fitzpatrick_scale: !1,
  category: "symbols"
}, j4 = {
  keywords: [
    "blue-square",
    "words"
  ],
  char: "🆓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, C4 = {
  keywords: [
    "0",
    "numbers",
    "blue-square",
    "null"
  ],
  char: "0️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, E4 = {
  keywords: [
    "blue-square",
    "numbers",
    "1"
  ],
  char: "1️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, S4 = {
  keywords: [
    "numbers",
    "2",
    "prime",
    "blue-square"
  ],
  char: "2️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, A4 = {
  keywords: [
    "3",
    "numbers",
    "prime",
    "blue-square"
  ],
  char: "3️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, L4 = {
  keywords: [
    "4",
    "numbers",
    "blue-square"
  ],
  char: "4️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $4 = {
  keywords: [
    "5",
    "numbers",
    "blue-square",
    "prime"
  ],
  char: "5️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, T4 = {
  keywords: [
    "6",
    "numbers",
    "blue-square"
  ],
  char: "6️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, F4 = {
  keywords: [
    "7",
    "numbers",
    "blue-square",
    "prime"
  ],
  char: "7️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, P4 = {
  keywords: [
    "8",
    "blue-square",
    "numbers"
  ],
  char: "8️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, R4 = {
  keywords: [
    "blue-square",
    "numbers",
    "9"
  ],
  char: "9️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, I4 = {
  keywords: [
    "numbers",
    "10",
    "blue-square"
  ],
  char: "🔟",
  fitzpatrick_scale: !1,
  category: "symbols"
}, q4 = {
  keywords: [
    "star",
    "keycap"
  ],
  char: "*⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, O4 = {
  keywords: [
    "blue-square"
  ],
  char: "⏏️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, D4 = {
  keywords: [
    "blue-square",
    "right",
    "direction",
    "play"
  ],
  char: "▶️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, M4 = {
  keywords: [
    "pause",
    "blue-square"
  ],
  char: "⏸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, B4 = {
  keywords: [
    "forward",
    "next",
    "blue-square"
  ],
  char: "⏭",
  fitzpatrick_scale: !1,
  category: "symbols"
}, N4 = {
  keywords: [
    "blue-square"
  ],
  char: "⏹",
  fitzpatrick_scale: !1,
  category: "symbols"
}, H4 = {
  keywords: [
    "blue-square"
  ],
  char: "⏺",
  fitzpatrick_scale: !1,
  category: "symbols"
}, U4 = {
  keywords: [
    "blue-square",
    "play",
    "pause"
  ],
  char: "⏯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, V4 = {
  keywords: [
    "backward"
  ],
  char: "⏮",
  fitzpatrick_scale: !1,
  category: "symbols"
}, W4 = {
  keywords: [
    "blue-square",
    "play",
    "speed",
    "continue"
  ],
  char: "⏩",
  fitzpatrick_scale: !1,
  category: "symbols"
}, K4 = {
  keywords: [
    "play",
    "blue-square"
  ],
  char: "⏪",
  fitzpatrick_scale: !1,
  category: "symbols"
}, G4 = {
  keywords: [
    "blue-square",
    "shuffle",
    "music",
    "random"
  ],
  char: "🔀",
  fitzpatrick_scale: !1,
  category: "symbols"
}, X4 = {
  keywords: [
    "loop",
    "record"
  ],
  char: "🔁",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Q4 = {
  keywords: [
    "blue-square",
    "loop"
  ],
  char: "🔂",
  fitzpatrick_scale: !1,
  category: "symbols"
}, J4 = {
  keywords: [
    "blue-square",
    "left",
    "direction"
  ],
  char: "◀️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Y4 = {
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
}, Z4 = {
  keywords: [
    "blue-square",
    "direction",
    "bottom"
  ],
  char: "🔽",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ex = {
  keywords: [
    "blue-square",
    "direction",
    "top"
  ],
  char: "⏫",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ax = {
  keywords: [
    "blue-square",
    "direction",
    "bottom"
  ],
  char: "⏬",
  fitzpatrick_scale: !1,
  category: "symbols"
}, tx = {
  keywords: [
    "blue-square",
    "next"
  ],
  char: "➡️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, rx = {
  keywords: [
    "blue-square",
    "previous",
    "back"
  ],
  char: "⬅️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ox = {
  keywords: [
    "blue-square",
    "continue",
    "top",
    "direction"
  ],
  char: "⬆️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, sx = {
  keywords: [
    "blue-square",
    "direction",
    "bottom"
  ],
  char: "⬇️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, cx = {
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
}, ix = {
  keywords: [
    "blue-square",
    "direction",
    "diagonal",
    "southeast"
  ],
  char: "↘️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, nx = {
  keywords: [
    "blue-square",
    "direction",
    "diagonal",
    "southwest"
  ],
  char: "↙️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, lx = {
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
}, dx = {
  keywords: [
    "blue-square",
    "direction",
    "way",
    "vertical"
  ],
  char: "↕️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, px = {
  keywords: [
    "shape",
    "direction",
    "horizontal",
    "sideways"
  ],
  char: "↔️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, fx = {
  keywords: [
    "blue-square",
    "sync",
    "cycle"
  ],
  char: "🔄",
  fitzpatrick_scale: !1,
  category: "symbols"
}, hx = {
  keywords: [
    "blue-square",
    "return",
    "rotate",
    "direction"
  ],
  char: "↪️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, yx = {
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
}, gx = {
  keywords: [
    "blue-square",
    "direction",
    "top"
  ],
  char: "⤴️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _x = {
  keywords: [
    "blue-square",
    "direction",
    "bottom"
  ],
  char: "⤵️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ux = {
  keywords: [
    "symbol",
    "blue-square",
    "twitter"
  ],
  char: "#️⃣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, mx = {
  keywords: [
    "blue-square",
    "alphabet",
    "letter"
  ],
  char: "ℹ️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, kx = {
  keywords: [
    "blue-square",
    "alphabet"
  ],
  char: "🔤",
  fitzpatrick_scale: !1,
  category: "symbols"
}, wx = {
  keywords: [
    "blue-square",
    "alphabet"
  ],
  char: "🔡",
  fitzpatrick_scale: !1,
  category: "symbols"
}, bx = {
  keywords: [
    "alphabet",
    "words",
    "blue-square"
  ],
  char: "🔠",
  fitzpatrick_scale: !1,
  category: "symbols"
}, vx = {
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
}, zx = {
  keywords: [
    "score",
    "tone",
    "sound"
  ],
  char: "🎵",
  fitzpatrick_scale: !1,
  category: "symbols"
}, xx = {
  keywords: [
    "music",
    "score"
  ],
  char: "🎶",
  fitzpatrick_scale: !1,
  category: "symbols"
}, jx = {
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
}, Cx = {
  keywords: [
    "scribble",
    "draw",
    "shape",
    "squiggle"
  ],
  char: "➰",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ex = {
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
}, Sx = {
  keywords: [
    "sync",
    "cycle",
    "round",
    "repeat"
  ],
  char: "🔃",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ax = {
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
}, Lx = {
  keywords: [
    "math",
    "calculation",
    "subtract",
    "less"
  ],
  char: "➖",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $x = {
  keywords: [
    "divide",
    "math",
    "calculation"
  ],
  char: "➗",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Tx = {
  keywords: [
    "math",
    "calculation"
  ],
  char: "✖️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Fx = {
  keywords: [
    "forever"
  ],
  char: "♾",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Px = {
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
}, Rx = {
  keywords: [
    "money",
    "sales",
    "dollar",
    "travel"
  ],
  char: "💱",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ix = {
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
}, qx = {
  keywords: [
    "alphabet",
    "circle"
  ],
  char: "®️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ox = {
  keywords: [
    "trademark",
    "brand",
    "law",
    "legal"
  ],
  char: "™️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Dx = {
  keywords: [
    "words",
    "arrow"
  ],
  char: "🔚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Mx = {
  keywords: [
    "arrow",
    "words",
    "return"
  ],
  char: "🔙",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Bx = {
  keywords: [
    "arrow",
    "words"
  ],
  char: "🔛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Nx = {
  keywords: [
    "words",
    "blue-square"
  ],
  char: "🔝",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Hx = {
  keywords: [
    "arrow",
    "words"
  ],
  char: "🔜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ux = {
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
}, Vx = {
  keywords: [
    "input",
    "old",
    "music",
    "circle"
  ],
  char: "🔘",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Wx = {
  keywords: [
    "shape",
    "round"
  ],
  char: "⚪",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Kx = {
  keywords: [
    "shape",
    "button",
    "round"
  ],
  char: "⚫",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Gx = {
  keywords: [
    "shape",
    "error",
    "danger"
  ],
  char: "🔴",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Xx = {
  keywords: [
    "shape",
    "icon",
    "button"
  ],
  char: "🔵",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Qx = {
  keywords: [
    "shape",
    "jewel",
    "gem"
  ],
  char: "🔸",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Jx = {
  keywords: [
    "shape",
    "jewel",
    "gem"
  ],
  char: "🔹",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Yx = {
  keywords: [
    "shape",
    "jewel",
    "gem"
  ],
  char: "🔶",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Zx = {
  keywords: [
    "shape",
    "jewel",
    "gem"
  ],
  char: "🔷",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ej = {
  keywords: [
    "shape",
    "direction",
    "up",
    "top"
  ],
  char: "🔺",
  fitzpatrick_scale: !1,
  category: "symbols"
}, aj = {
  keywords: [
    "shape",
    "icon"
  ],
  char: "▪️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, tj = {
  keywords: [
    "shape",
    "icon"
  ],
  char: "▫️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, rj = {
  keywords: [
    "shape",
    "icon",
    "button"
  ],
  char: "⬛",
  fitzpatrick_scale: !1,
  category: "symbols"
}, oj = {
  keywords: [
    "shape",
    "icon",
    "stone",
    "button"
  ],
  char: "⬜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, sj = {
  keywords: [
    "shape",
    "direction",
    "bottom"
  ],
  char: "🔻",
  fitzpatrick_scale: !1,
  category: "symbols"
}, cj = {
  keywords: [
    "shape",
    "button",
    "icon"
  ],
  char: "◼️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, ij = {
  keywords: [
    "shape",
    "stone",
    "icon"
  ],
  char: "◻️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, nj = {
  keywords: [
    "icon",
    "shape",
    "button"
  ],
  char: "◾",
  fitzpatrick_scale: !1,
  category: "symbols"
}, lj = {
  keywords: [
    "shape",
    "stone",
    "icon",
    "button"
  ],
  char: "◽",
  fitzpatrick_scale: !1,
  category: "symbols"
}, dj = {
  keywords: [
    "shape",
    "input",
    "frame"
  ],
  char: "🔲",
  fitzpatrick_scale: !1,
  category: "symbols"
}, pj = {
  keywords: [
    "shape",
    "input"
  ],
  char: "🔳",
  fitzpatrick_scale: !1,
  category: "symbols"
}, fj = {
  keywords: [
    "sound",
    "volume",
    "silence",
    "broadcast"
  ],
  char: "🔈",
  fitzpatrick_scale: !1,
  category: "symbols"
}, hj = {
  keywords: [
    "volume",
    "speaker",
    "broadcast"
  ],
  char: "🔉",
  fitzpatrick_scale: !1,
  category: "symbols"
}, yj = {
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
}, gj = {
  keywords: [
    "sound",
    "volume",
    "silence",
    "quiet"
  ],
  char: "🔇",
  fitzpatrick_scale: !1,
  category: "symbols"
}, _j = {
  keywords: [
    "sound",
    "speaker",
    "volume"
  ],
  char: "📣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, uj = {
  keywords: [
    "volume",
    "sound"
  ],
  char: "📢",
  fitzpatrick_scale: !1,
  category: "symbols"
}, mj = {
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
}, kj = {
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
}, wj = {
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
}, bj = {
  keywords: [
    "game",
    "play",
    "chinese",
    "kanji"
  ],
  char: "🀄",
  fitzpatrick_scale: !1,
  category: "symbols"
}, vj = {
  keywords: [
    "poker",
    "cards",
    "suits",
    "magic"
  ],
  char: "♠️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, zj = {
  keywords: [
    "poker",
    "cards",
    "magic",
    "suits"
  ],
  char: "♣️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, xj = {
  keywords: [
    "poker",
    "cards",
    "magic",
    "suits"
  ],
  char: "♥️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, jj = {
  keywords: [
    "poker",
    "cards",
    "magic",
    "suits"
  ],
  char: "♦️",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Cj = {
  keywords: [
    "game",
    "sunset",
    "red"
  ],
  char: "🎴",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ej = {
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
}, Sj = {
  keywords: [
    "caption",
    "speech",
    "thinking",
    "mad"
  ],
  char: "🗯",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Aj = {
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
}, Lj = {
  keywords: [
    "words",
    "message",
    "talk",
    "chatting"
  ],
  char: "🗨",
  fitzpatrick_scale: !1,
  category: "symbols"
}, $j = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕐",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Tj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕑",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Fj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕒",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Pj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕓",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Rj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕔",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Ij = {
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
}, qj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕖",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Oj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕗",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Dj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕘",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Mj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕙",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Bj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕚",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Nj = {
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
}, Hj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕜",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Uj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕝",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Vj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕞",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Wj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕟",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Kj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕠",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Gj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕡",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Xj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕢",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Qj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕣",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Jj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕤",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Yj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕥",
  fitzpatrick_scale: !1,
  category: "symbols"
}, Zj = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕦",
  fitzpatrick_scale: !1,
  category: "symbols"
}, e6 = {
  keywords: [
    "time",
    "late",
    "early",
    "schedule"
  ],
  char: "🕧",
  fitzpatrick_scale: !1,
  category: "symbols"
}, a6 = {
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
}, t6 = {
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
}, r6 = {
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
}, o6 = {
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
}, s6 = {
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
}, c6 = {
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
}, i6 = {
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
}, n6 = {
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
}, l6 = {
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
}, d6 = {
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
}, p6 = {
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
}, f6 = {
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
}, h6 = {
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
}, y6 = {
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
}, g6 = {
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
}, _6 = {
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
}, u6 = {
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
}, m6 = {
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
}, k6 = {
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
}, w6 = {
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
}, b6 = {
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
}, v6 = {
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
}, z6 = {
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
}, x6 = {
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
}, j6 = {
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
}, C6 = {
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
}, E6 = {
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
}, S6 = {
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
}, A6 = {
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
}, L6 = {
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
}, $6 = {
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
}, T6 = {
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
}, F6 = {
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
}, P6 = {
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
}, R6 = {
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
}, I6 = {
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
}, q6 = {
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
}, O6 = {
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
}, D6 = {
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
}, M6 = {
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
}, B6 = {
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
}, N6 = {
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
}, H6 = {
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
}, U6 = {
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
}, V6 = {
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
}, W6 = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇨🇱",
  fitzpatrick_scale: !1,
  category: "flags"
}, K6 = {
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
}, G6 = {
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
}, X6 = {
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
}, Q6 = {
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
}, J6 = {
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
}, Y6 = {
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
}, Z6 = {
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
}, eC = {
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
}, aC = {
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
}, tC = {
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
}, rC = {
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
}, oC = {
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
}, sC = {
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
}, cC = {
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
}, iC = {
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
}, nC = {
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
}, lC = {
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
}, dC = {
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
}, pC = {
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
}, fC = {
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
}, hC = {
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
}, yC = {
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
}, gC = {
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
}, _C = {
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
}, uC = {
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
}, mC = {
  keywords: [
    "european",
    "union",
    "flag",
    "banner"
  ],
  char: "🇪🇺",
  fitzpatrick_scale: !1,
  category: "flags"
}, kC = {
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
}, wC = {
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
}, bC = {
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
}, vC = {
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
}, zC = {
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
}, xC = {
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
}, jC = {
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
}, CC = {
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
}, EC = {
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
}, SC = {
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
}, AC = {
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
}, LC = {
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
}, $C = {
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
}, TC = {
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
}, FC = {
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
}, PC = {
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
}, RC = {
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
}, IC = {
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
}, qC = {
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
}, OC = {
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
}, DC = {
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
}, MC = {
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
}, BC = {
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
}, NC = {
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
}, HC = {
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
}, UC = {
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
}, VC = {
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
}, WC = {
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
}, KC = {
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
}, GC = {
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
}, XC = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇮🇩",
  fitzpatrick_scale: !1,
  category: "flags"
}, QC = {
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
}, JC = {
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
}, YC = {
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
}, ZC = {
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
}, e8 = {
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
}, a8 = {
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
}, t8 = {
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
}, r8 = {
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
}, o8 = {
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
}, s8 = {
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
}, c8 = {
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
}, i8 = {
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
}, n8 = {
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
}, l8 = {
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
}, d8 = {
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
}, p8 = {
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
}, f8 = {
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
}, h8 = {
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
}, y8 = {
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
}, g8 = {
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
}, _8 = {
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
}, u8 = {
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
}, m8 = {
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
}, k8 = {
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
}, w8 = {
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
}, b8 = {
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
}, v8 = {
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
}, z8 = {
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
}, x8 = {
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
}, j8 = {
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
}, C8 = {
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
}, E8 = {
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
}, S8 = {
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
}, A8 = {
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
}, L8 = {
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
}, $8 = {
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
}, T8 = {
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
}, F8 = {
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
}, P8 = {
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
}, R8 = {
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
}, I8 = {
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
}, q8 = {
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
}, O8 = {
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
}, D8 = {
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
}, M8 = {
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
}, B8 = {
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
}, N8 = {
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
}, H8 = {
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
}, U8 = {
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
}, V8 = {
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
}, W8 = {
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
}, K8 = {
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
}, G8 = {
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
}, X8 = {
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
}, Q8 = {
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
}, J8 = {
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
}, Y8 = {
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
}, Z8 = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇳🇬",
  fitzpatrick_scale: !1,
  category: "flags"
}, e7 = {
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
}, a7 = {
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
}, t7 = {
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
}, r7 = {
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
}, o7 = {
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
}, s7 = {
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
}, c7 = {
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
}, i7 = {
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
}, n7 = {
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
}, l7 = {
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
}, d7 = {
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
}, p7 = {
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
}, f7 = {
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
}, h7 = {
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
}, y7 = {
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
}, g7 = {
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
}, _7 = {
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
}, u7 = {
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
}, m7 = {
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
}, k7 = {
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
}, w7 = {
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
}, b7 = {
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
}, v7 = {
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
}, z7 = {
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
}, x7 = {
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
}, j7 = {
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
}, C7 = {
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
}, E7 = {
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
}, S7 = {
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
}, A7 = {
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
}, L7 = {
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
}, $7 = {
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
}, T7 = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇸🇦",
  fitzpatrick_scale: !1,
  category: "flags"
}, F7 = {
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
}, P7 = {
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
}, R7 = {
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
}, I7 = {
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
}, q7 = {
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
}, O7 = {
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
}, D7 = {
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
}, M7 = {
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
}, B7 = {
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
}, N7 = {
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
}, H7 = {
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
}, U7 = {
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
}, V7 = {
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
}, W7 = {
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
}, K7 = {
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
}, G7 = {
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
}, X7 = {
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
}, Q7 = {
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
}, J7 = {
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
}, Y7 = {
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
}, Z7 = {
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
}, eE = {
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
}, aE = {
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
}, tE = {
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
}, rE = {
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
}, oE = {
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
}, sE = {
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
}, cE = {
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
}, iE = {
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
}, nE = {
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
}, lE = {
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
}, dE = {
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
}, pE = {
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
}, fE = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇲",
  fitzpatrick_scale: !1,
  category: "flags"
}, hE = {
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
}, yE = {
  keywords: [
    "flag",
    "nation",
    "country",
    "banner"
  ],
  char: "🇹🇻",
  fitzpatrick_scale: !1,
  category: "flags"
}, gE = {
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
}, _E = {
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
}, uE = {
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
}, mE = {
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
}, kE = {
  keywords: [
    "flag",
    "english"
  ],
  char: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  fitzpatrick_scale: !1,
  category: "flags"
}, wE = {
  keywords: [
    "flag",
    "scottish"
  ],
  char: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  fitzpatrick_scale: !1,
  category: "flags"
}, bE = {
  keywords: [
    "flag",
    "welsh"
  ],
  char: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  fitzpatrick_scale: !1,
  category: "flags"
}, vE = {
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
}, zE = {
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
}, xE = {
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
}, jE = {
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
}, CE = {
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
}, EE = {
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
}, SE = {
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
}, AE = {
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
}, LE = {
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
}, $E = {
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
}, TE = {
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
}, FE = {
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
}, PE = {
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
}, RE = {
  keywords: [
    "un",
    "flag",
    "banner"
  ],
  char: "🇺🇳",
  fitzpatrick_scale: !1,
  category: "flags"
}, IE = {
  keywords: [
    "skull",
    "crossbones",
    "flag",
    "banner"
  ],
  char: "🏴‍☠️",
  fitzpatrick_scale: !1,
  category: "flags"
}, qE = {
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
  grinning: Ui,
  grimacing: Vi,
  grin: Wi,
  joy: Ki,
  rofl: Gi,
  partying: Xi,
  smiley: Qi,
  smile: Ji,
  sweat_smile: Yi,
  laughing: Zi,
  innocent: en,
  wink: an,
  blush: tn,
  slightly_smiling_face: rn,
  upside_down_face: on,
  relaxed: sn,
  yum: cn,
  relieved: nn,
  heart_eyes: ln,
  smiling_face_with_three_hearts: dn,
  kissing_heart: pn,
  kissing: fn,
  kissing_smiling_eyes: hn,
  kissing_closed_eyes: yn,
  stuck_out_tongue_winking_eye: gn,
  zany: _n,
  raised_eyebrow: un,
  monocle: mn,
  stuck_out_tongue_closed_eyes: kn,
  stuck_out_tongue: wn,
  money_mouth_face: bn,
  nerd_face: vn,
  sunglasses: zn,
  star_struck: xn,
  clown_face: jn,
  cowboy_hat_face: Cn,
  hugs: En,
  smirk: Sn,
  no_mouth: An,
  neutral_face: Ln,
  expressionless: $n,
  unamused: Tn,
  roll_eyes: Fn,
  thinking: Pn,
  lying_face: Rn,
  hand_over_mouth: In,
  shushing: qn,
  symbols_over_mouth: On,
  exploding_head: Dn,
  flushed: Mn,
  disappointed: Bn,
  worried: Nn,
  angry: Hn,
  rage: Un,
  pensive: Vn,
  confused: Wn,
  slightly_frowning_face: Kn,
  frowning_face: Gn,
  persevere: Xn,
  confounded: Qn,
  tired_face: Jn,
  weary: Yn,
  pleading: Zn,
  triumph: el,
  open_mouth: al,
  scream: tl,
  fearful: rl,
  cold_sweat: ol,
  hushed: sl,
  frowning: cl,
  anguished: il,
  cry: nl,
  disappointed_relieved: ll,
  drooling_face: dl,
  sleepy: pl,
  sweat: fl,
  hot: hl,
  cold: yl,
  sob: gl,
  dizzy_face: _l,
  astonished: ul,
  zipper_mouth_face: ml,
  nauseated_face: kl,
  sneezing_face: wl,
  vomiting: bl,
  mask: vl,
  face_with_thermometer: zl,
  face_with_head_bandage: xl,
  woozy: jl,
  sleeping: Cl,
  zzz: El,
  poop: Sl,
  smiling_imp: Al,
  imp: Ll,
  japanese_ogre: $l,
  japanese_goblin: Tl,
  skull: Fl,
  ghost: Pl,
  alien: Rl,
  robot: Il,
  smiley_cat: ql,
  smile_cat: Ol,
  joy_cat: Dl,
  heart_eyes_cat: Ml,
  smirk_cat: Bl,
  kissing_cat: Nl,
  scream_cat: Hl,
  crying_cat_face: Ul,
  pouting_cat: Vl,
  palms_up: Wl,
  raised_hands: Kl,
  clap: Gl,
  wave: Xl,
  call_me_hand: Ql,
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
  facepunch: Jl,
  fist: Yl,
  fist_left: Zl,
  fist_right: ed,
  v: ad,
  ok_hand: td,
  raised_hand: rd,
  raised_back_of_hand: od,
  open_hands: sd,
  muscle: cd,
  pray: id,
  foot: nd,
  leg: ld,
  handshake: dd,
  point_up: pd,
  point_up_2: fd,
  point_down: hd,
  point_left: yd,
  point_right: gd,
  fu: _d,
  raised_hand_with_fingers_splayed: ud,
  love_you: md,
  metal: kd,
  crossed_fingers: wd,
  vulcan_salute: bd,
  writing_hand: vd,
  selfie: zd,
  nail_care: xd,
  lips: jd,
  tooth: Cd,
  tongue: Ed,
  ear: Sd,
  nose: Ad,
  eye: Ld,
  eyes: $d,
  brain: Td,
  bust_in_silhouette: Fd,
  busts_in_silhouette: Pd,
  speaking_head: Rd,
  baby: Id,
  child: qd,
  boy: Od,
  girl: Dd,
  adult: Md,
  man: Bd,
  woman: Nd,
  blonde_woman: Hd,
  blonde_man: Ud,
  bearded_person: Vd,
  older_adult: Wd,
  older_man: Kd,
  older_woman: Gd,
  man_with_gua_pi_mao: Xd,
  woman_with_headscarf: Qd,
  woman_with_turban: Jd,
  man_with_turban: Yd,
  policewoman: Zd,
  policeman: ep,
  construction_worker_woman: ap,
  construction_worker_man: tp,
  guardswoman: rp,
  guardsman: op,
  female_detective: sp,
  male_detective: cp,
  woman_health_worker: ip,
  man_health_worker: np,
  woman_farmer: lp,
  man_farmer: dp,
  woman_cook: pp,
  man_cook: fp,
  woman_student: hp,
  man_student: yp,
  woman_singer: gp,
  man_singer: _p,
  woman_teacher: up,
  man_teacher: mp,
  woman_factory_worker: kp,
  man_factory_worker: wp,
  woman_technologist: bp,
  man_technologist: vp,
  woman_office_worker: zp,
  man_office_worker: xp,
  woman_mechanic: jp,
  man_mechanic: Cp,
  woman_scientist: Ep,
  man_scientist: Sp,
  woman_artist: Ap,
  man_artist: Lp,
  woman_firefighter: $p,
  man_firefighter: Tp,
  woman_pilot: Fp,
  man_pilot: Pp,
  woman_astronaut: Rp,
  man_astronaut: Ip,
  woman_judge: qp,
  man_judge: Op,
  woman_superhero: Dp,
  man_superhero: Mp,
  woman_supervillain: Bp,
  man_supervillain: Np,
  mrs_claus: Hp,
  santa: Up,
  sorceress: Vp,
  wizard: Wp,
  woman_elf: Kp,
  man_elf: Gp,
  woman_vampire: Xp,
  man_vampire: Qp,
  woman_zombie: Jp,
  man_zombie: Yp,
  woman_genie: Zp,
  man_genie: ef,
  mermaid: af,
  merman: tf,
  woman_fairy: rf,
  man_fairy: of,
  angel: sf,
  pregnant_woman: cf,
  breastfeeding: nf,
  princess: lf,
  prince: df,
  bride_with_veil: pf,
  man_in_tuxedo: ff,
  running_woman: hf,
  running_man: yf,
  walking_woman: gf,
  walking_man: _f,
  dancer: uf,
  man_dancing: mf,
  dancing_women: kf,
  dancing_men: wf,
  couple: bf,
  two_men_holding_hands: vf,
  two_women_holding_hands: zf,
  bowing_woman: xf,
  bowing_man: jf,
  man_facepalming: Cf,
  woman_facepalming: Ef,
  woman_shrugging: Sf,
  man_shrugging: Af,
  tipping_hand_woman: Lf,
  tipping_hand_man: $f,
  no_good_woman: Tf,
  no_good_man: Ff,
  ok_woman: Pf,
  ok_man: Rf,
  raising_hand_woman: If,
  raising_hand_man: qf,
  pouting_woman: Of,
  pouting_man: Df,
  frowning_woman: Mf,
  frowning_man: Bf,
  haircut_woman: Nf,
  haircut_man: Hf,
  massage_woman: Uf,
  massage_man: Vf,
  woman_in_steamy_room: Wf,
  man_in_steamy_room: Kf,
  couple_with_heart_woman_man: Gf,
  couple_with_heart_woman_woman: Xf,
  couple_with_heart_man_man: Qf,
  couplekiss_man_woman: Jf,
  couplekiss_woman_woman: Yf,
  couplekiss_man_man: Zf,
  family_man_woman_boy: eh,
  family_man_woman_girl: ah,
  family_man_woman_girl_boy: th,
  family_man_woman_boy_boy: rh,
  family_man_woman_girl_girl: oh,
  family_woman_woman_boy: sh,
  family_woman_woman_girl: ch,
  family_woman_woman_girl_boy: ih,
  family_woman_woman_boy_boy: nh,
  family_woman_woman_girl_girl: lh,
  family_man_man_boy: dh,
  family_man_man_girl: ph,
  family_man_man_girl_boy: fh,
  family_man_man_boy_boy: hh,
  family_man_man_girl_girl: yh,
  family_woman_boy: gh,
  family_woman_girl: _h,
  family_woman_girl_boy: uh,
  family_woman_boy_boy: mh,
  family_woman_girl_girl: kh,
  family_man_boy: wh,
  family_man_girl: bh,
  family_man_girl_boy: vh,
  family_man_boy_boy: zh,
  family_man_girl_girl: xh,
  yarn: jh,
  thread: Ch,
  coat: Eh,
  labcoat: Sh,
  womans_clothes: Ah,
  tshirt: Lh,
  jeans: $h,
  necktie: Th,
  dress: Fh,
  bikini: Ph,
  kimono: Rh,
  lipstick: Ih,
  kiss: qh,
  footprints: Oh,
  flat_shoe: Dh,
  high_heel: Mh,
  sandal: Bh,
  boot: Nh,
  mans_shoe: Hh,
  athletic_shoe: Uh,
  hiking_boot: Vh,
  socks: Wh,
  gloves: Kh,
  scarf: Gh,
  womans_hat: Xh,
  tophat: Qh,
  billed_hat: Jh,
  rescue_worker_helmet: Yh,
  mortar_board: Zh,
  crown: ey,
  school_satchel: ay,
  luggage: ty,
  pouch: ry,
  purse: oy,
  handbag: sy,
  briefcase: cy,
  eyeglasses: iy,
  dark_sunglasses: ny,
  goggles: ly,
  ring: dy,
  closed_umbrella: py,
  dog: fy,
  cat: hy,
  mouse: yy,
  hamster: gy,
  rabbit: _y,
  fox_face: uy,
  bear: my,
  panda_face: ky,
  koala: wy,
  tiger: by,
  lion: vy,
  cow: zy,
  pig: xy,
  pig_nose: jy,
  frog: Cy,
  squid: Ey,
  octopus: Sy,
  shrimp: Ay,
  monkey_face: Ly,
  gorilla: $y,
  see_no_evil: Ty,
  hear_no_evil: Fy,
  speak_no_evil: Py,
  monkey: Ry,
  chicken: Iy,
  penguin: qy,
  bird: Oy,
  baby_chick: Dy,
  hatching_chick: My,
  hatched_chick: By,
  duck: Ny,
  eagle: Hy,
  owl: Uy,
  bat: Vy,
  wolf: Wy,
  boar: Ky,
  horse: Gy,
  unicorn: Xy,
  honeybee: Qy,
  bug: Jy,
  butterfly: Yy,
  snail: Zy,
  beetle: eg,
  ant: ag,
  grasshopper: tg,
  spider: rg,
  scorpion: og,
  crab: sg,
  snake: cg,
  lizard: ig,
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
  sauropod: ng,
  turtle: lg,
  tropical_fish: dg,
  fish: pg,
  blowfish: fg,
  dolphin: hg,
  shark: yg,
  whale: gg,
  whale2: _g,
  crocodile: ug,
  leopard: mg,
  zebra: kg,
  tiger2: wg,
  water_buffalo: bg,
  ox: vg,
  cow2: zg,
  deer: xg,
  dromedary_camel: jg,
  camel: Cg,
  giraffe: Eg,
  elephant: Sg,
  rhinoceros: Ag,
  goat: Lg,
  ram: $g,
  sheep: Tg,
  racehorse: Fg,
  pig2: Pg,
  rat: Rg,
  mouse2: Ig,
  rooster: qg,
  turkey: Og,
  dove: Dg,
  dog2: Mg,
  poodle: Bg,
  cat2: Ng,
  rabbit2: Hg,
  chipmunk: Ug,
  hedgehog: Vg,
  raccoon: Wg,
  llama: Kg,
  hippopotamus: Gg,
  kangaroo: Xg,
  badger: Qg,
  swan: Jg,
  peacock: Yg,
  parrot: Zg,
  lobster: e_,
  mosquito: a_,
  paw_prints: t_,
  dragon: r_,
  dragon_face: o_,
  cactus: s_,
  christmas_tree: c_,
  evergreen_tree: i_,
  deciduous_tree: n_,
  palm_tree: l_,
  seedling: d_,
  herb: p_,
  shamrock: f_,
  four_leaf_clover: h_,
  bamboo: y_,
  tanabata_tree: g_,
  leaves: __,
  fallen_leaf: u_,
  maple_leaf: m_,
  ear_of_rice: k_,
  hibiscus: w_,
  sunflower: b_,
  rose: v_,
  wilted_flower: z_,
  tulip: x_,
  blossom: j_,
  cherry_blossom: C_,
  bouquet: E_,
  mushroom: S_,
  chestnut: A_,
  jack_o_lantern: L_,
  shell: $_,
  spider_web: T_,
  earth_americas: F_,
  earth_africa: P_,
  earth_asia: R_,
  full_moon: I_,
  waning_gibbous_moon: q_,
  last_quarter_moon: O_,
  waning_crescent_moon: D_,
  new_moon: M_,
  waxing_crescent_moon: B_,
  first_quarter_moon: N_,
  waxing_gibbous_moon: H_,
  new_moon_with_face: U_,
  full_moon_with_face: V_,
  first_quarter_moon_with_face: W_,
  last_quarter_moon_with_face: K_,
  sun_with_face: G_,
  crescent_moon: X_,
  star: Q_,
  star2: J_,
  dizzy: Y_,
  sparkles: Z_,
  comet: eu,
  sunny: au,
  sun_behind_small_cloud: tu,
  partly_sunny: ru,
  sun_behind_large_cloud: ou,
  sun_behind_rain_cloud: su,
  cloud: cu,
  cloud_with_rain: iu,
  cloud_with_lightning_and_rain: nu,
  cloud_with_lightning: lu,
  zap: du,
  fire: pu,
  boom: fu,
  snowflake: hu,
  cloud_with_snow: yu,
  snowman: gu,
  snowman_with_snow: _u,
  wind_face: uu,
  dash: mu,
  tornado: ku,
  fog: wu,
  open_umbrella: bu,
  umbrella: vu,
  droplet: zu,
  sweat_drops: xu,
  ocean: ju,
  green_apple: Cu,
  apple: Eu,
  pear: Su,
  tangerine: Au,
  lemon: Lu,
  banana: $u,
  watermelon: Tu,
  grapes: Fu,
  strawberry: Pu,
  melon: Ru,
  cherries: Iu,
  peach: qu,
  pineapple: Ou,
  coconut: Du,
  kiwi_fruit: Mu,
  mango: Bu,
  avocado: Nu,
  broccoli: Hu,
  tomato: Uu,
  eggplant: Vu,
  cucumber: Wu,
  carrot: Ku,
  hot_pepper: Gu,
  potato: Xu,
  corn: Qu,
  leafy_greens: Ju,
  sweet_potato: Yu,
  peanuts: Zu,
  honey_pot: em,
  croissant: am,
  bread: tm,
  baguette_bread: rm,
  bagel: om,
  pretzel: sm,
  cheese: cm,
  egg: im,
  bacon: nm,
  steak: lm,
  pancakes: dm,
  poultry_leg: pm,
  meat_on_bone: fm,
  bone: hm,
  fried_shrimp: ym,
  fried_egg: gm,
  hamburger: _m,
  fries: um,
  stuffed_flatbread: mm,
  hotdog: km,
  pizza: wm,
  sandwich: bm,
  canned_food: vm,
  spaghetti: zm,
  taco: xm,
  burrito: jm,
  green_salad: Cm,
  shallow_pan_of_food: Em,
  ramen: Sm,
  stew: Am,
  fish_cake: Lm,
  fortune_cookie: $m,
  sushi: Tm,
  bento: Fm,
  curry: Pm,
  rice_ball: Rm,
  rice: Im,
  rice_cracker: qm,
  oden: Om,
  dango: Dm,
  shaved_ice: Mm,
  ice_cream: Bm,
  icecream: Nm,
  pie: Hm,
  cake: Um,
  cupcake: Vm,
  moon_cake: Wm,
  birthday: Km,
  custard: Gm,
  candy: Xm,
  lollipop: Qm,
  chocolate_bar: Jm,
  popcorn: Ym,
  dumpling: Zm,
  doughnut: ek,
  cookie: ak,
  milk_glass: tk,
  beer: rk,
  beers: ok,
  clinking_glasses: sk,
  wine_glass: ck,
  tumbler_glass: ik,
  cocktail: nk,
  tropical_drink: lk,
  champagne: dk,
  sake: pk,
  tea: fk,
  cup_with_straw: hk,
  coffee: yk,
  baby_bottle: gk,
  salt: _k,
  spoon: uk,
  fork_and_knife: mk,
  plate_with_cutlery: kk,
  bowl_with_spoon: wk,
  takeout_box: bk,
  chopsticks: vk,
  soccer: zk,
  basketball: xk,
  football: jk,
  baseball: Ck,
  softball: Ek,
  tennis: Sk,
  volleyball: Ak,
  rugby_football: Lk,
  flying_disc: $k,
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
  golf: Tk,
  golfing_woman: Fk,
  golfing_man: Pk,
  ping_pong: Rk,
  badminton: Ik,
  goal_net: qk,
  ice_hockey: Ok,
  field_hockey: Dk,
  lacrosse: Mk,
  cricket: Bk,
  ski: Nk,
  skier: Hk,
  snowboarder: Uk,
  person_fencing: Vk,
  women_wrestling: Wk,
  men_wrestling: Kk,
  woman_cartwheeling: Gk,
  man_cartwheeling: Xk,
  woman_playing_handball: Qk,
  man_playing_handball: Jk,
  ice_skate: Yk,
  curling_stone: Zk,
  skateboard: ew,
  sled: aw,
  bow_and_arrow: tw,
  fishing_pole_and_fish: rw,
  boxing_glove: ow,
  martial_arts_uniform: sw,
  rowing_woman: cw,
  rowing_man: iw,
  climbing_woman: nw,
  climbing_man: lw,
  swimming_woman: dw,
  swimming_man: pw,
  woman_playing_water_polo: fw,
  man_playing_water_polo: hw,
  woman_in_lotus_position: yw,
  man_in_lotus_position: gw,
  surfing_woman: _w,
  surfing_man: uw,
  bath: mw,
  basketball_woman: kw,
  basketball_man: ww,
  weight_lifting_woman: bw,
  weight_lifting_man: vw,
  biking_woman: zw,
  biking_man: xw,
  mountain_biking_woman: jw,
  mountain_biking_man: Cw,
  horse_racing: Ew,
  business_suit_levitating: Sw,
  trophy: Aw,
  running_shirt_with_sash: Lw,
  medal_sports: $w,
  medal_military: Tw,
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
  reminder_ribbon: Fw,
  rosette: Pw,
  ticket: Rw,
  tickets: Iw,
  performing_arts: qw,
  art: Ow,
  circus_tent: Dw,
  woman_juggling: Mw,
  man_juggling: Bw,
  microphone: Nw,
  headphones: Hw,
  musical_score: Uw,
  musical_keyboard: Vw,
  drum: Ww,
  saxophone: Kw,
  trumpet: Gw,
  guitar: Xw,
  violin: Qw,
  clapper: Jw,
  video_game: Yw,
  space_invader: Zw,
  dart: eb,
  game_die: ab,
  chess_pawn: tb,
  slot_machine: rb,
  jigsaw: ob,
  bowling: sb,
  red_car: cb,
  taxi: ib,
  blue_car: nb,
  bus: lb,
  trolleybus: db,
  racing_car: pb,
  police_car: fb,
  ambulance: hb,
  fire_engine: yb,
  minibus: gb,
  truck: _b,
  articulated_lorry: ub,
  tractor: mb,
  kick_scooter: kb,
  motorcycle: wb,
  bike: bb,
  motor_scooter: vb,
  rotating_light: zb,
  oncoming_police_car: xb,
  oncoming_bus: jb,
  oncoming_automobile: Cb,
  oncoming_taxi: Eb,
  aerial_tramway: Sb,
  mountain_cableway: Ab,
  suspension_railway: Lb,
  railway_car: $b,
  train: Tb,
  monorail: Fb,
  bullettrain_side: Pb,
  bullettrain_front: Rb,
  light_rail: Ib,
  mountain_railway: qb,
  steam_locomotive: Ob,
  train2: Db,
  metro: Mb,
  tram: Bb,
  station: Nb,
  flying_saucer: Hb,
  helicopter: Ub,
  small_airplane: Vb,
  airplane: Wb,
  flight_departure: Kb,
  flight_arrival: Gb,
  sailboat: Xb,
  motor_boat: Qb,
  speedboat: Jb,
  ferry: Yb,
  passenger_ship: Zb,
  rocket: e1,
  artificial_satellite: a1,
  seat: t1,
  canoe: r1,
  anchor: o1,
  construction: s1,
  fuelpump: c1,
  busstop: i1,
  vertical_traffic_light: n1,
  traffic_light: l1,
  checkered_flag: d1,
  ship: p1,
  ferris_wheel: f1,
  roller_coaster: h1,
  carousel_horse: y1,
  building_construction: g1,
  foggy: _1,
  tokyo_tower: u1,
  factory: m1,
  fountain: k1,
  rice_scene: w1,
  mountain: b1,
  mountain_snow: v1,
  mount_fuji: z1,
  volcano: x1,
  japan: j1,
  camping: C1,
  tent: E1,
  national_park: S1,
  motorway: A1,
  railway_track: L1,
  sunrise: $1,
  sunrise_over_mountains: T1,
  desert: F1,
  beach_umbrella: P1,
  desert_island: R1,
  city_sunrise: I1,
  city_sunset: q1,
  cityscape: O1,
  night_with_stars: D1,
  bridge_at_night: M1,
  milky_way: B1,
  stars: N1,
  sparkler: H1,
  fireworks: U1,
  rainbow: V1,
  houses: W1,
  european_castle: K1,
  japanese_castle: G1,
  stadium: X1,
  statue_of_liberty: Q1,
  house: J1,
  house_with_garden: Y1,
  derelict_house: Z1,
  office: e0,
  department_store: a0,
  post_office: t0,
  european_post_office: r0,
  hospital: o0,
  bank: s0,
  hotel: c0,
  convenience_store: i0,
  school: n0,
  love_hotel: l0,
  wedding: d0,
  classical_building: p0,
  church: f0,
  mosque: h0,
  synagogue: y0,
  kaaba: g0,
  shinto_shrine: _0,
  watch: u0,
  iphone: m0,
  calling: k0,
  computer: w0,
  keyboard: b0,
  desktop_computer: v0,
  printer: z0,
  computer_mouse: x0,
  trackball: j0,
  joystick: C0,
  clamp: E0,
  minidisc: S0,
  floppy_disk: A0,
  cd: L0,
  dvd: $0,
  vhs: T0,
  camera: F0,
  camera_flash: P0,
  video_camera: R0,
  movie_camera: I0,
  film_projector: q0,
  film_strip: O0,
  telephone_receiver: D0,
  phone: M0,
  pager: B0,
  fax: N0,
  tv: H0,
  radio: U0,
  studio_microphone: V0,
  level_slider: W0,
  control_knobs: K0,
  compass: G0,
  stopwatch: X0,
  timer_clock: Q0,
  alarm_clock: J0,
  mantelpiece_clock: Y0,
  hourglass_flowing_sand: Z0,
  hourglass: ev,
  satellite: av,
  battery: tv,
  electric_plug: rv,
  bulb: ov,
  flashlight: sv,
  candle: cv,
  fire_extinguisher: iv,
  wastebasket: nv,
  oil_drum: lv,
  money_with_wings: dv,
  dollar: pv,
  yen: fv,
  euro: hv,
  pound: yv,
  moneybag: gv,
  credit_card: _v,
  gem: uv,
  balance_scale: mv,
  toolbox: kv,
  wrench: wv,
  hammer: bv,
  hammer_and_pick: vv,
  hammer_and_wrench: zv,
  pick: xv,
  nut_and_bolt: jv,
  gear: Cv,
  brick: Ev,
  chains: Sv,
  magnet: Av,
  gun: Lv,
  bomb: $v,
  firecracker: Tv,
  hocho: Fv,
  dagger: Pv,
  crossed_swords: Rv,
  shield: Iv,
  smoking: qv,
  skull_and_crossbones: Ov,
  coffin: Dv,
  funeral_urn: Mv,
  amphora: Bv,
  crystal_ball: Nv,
  prayer_beads: Hv,
  nazar_amulet: Uv,
  barber: Vv,
  alembic: Wv,
  telescope: Kv,
  microscope: Gv,
  hole: Xv,
  pill: Qv,
  syringe: Jv,
  dna: Yv,
  microbe: Zv,
  petri_dish: ez,
  test_tube: az,
  thermometer: tz,
  broom: rz,
  basket: oz,
  toilet_paper: sz,
  label: cz,
  bookmark: iz,
  toilet: nz,
  shower: lz,
  bathtub: dz,
  soap: pz,
  sponge: fz,
  lotion_bottle: hz,
  key: yz,
  old_key: gz,
  couch_and_lamp: _z,
  sleeping_bed: uz,
  bed: mz,
  door: kz,
  bellhop_bell: wz,
  teddy_bear: bz,
  framed_picture: vz,
  world_map: zz,
  parasol_on_ground: xz,
  moyai: jz,
  shopping: Cz,
  shopping_cart: Ez,
  balloon: Sz,
  flags: Az,
  ribbon: Lz,
  gift: $z,
  confetti_ball: Tz,
  tada: Fz,
  dolls: Pz,
  wind_chime: Rz,
  crossed_flags: Iz,
  izakaya_lantern: qz,
  red_envelope: Oz,
  email: Dz,
  envelope_with_arrow: Mz,
  incoming_envelope: Bz,
  "e-mail": {
    keywords: [
      "communication",
      "inbox"
    ],
    char: "📧",
    fitzpatrick_scale: !1,
    category: "objects"
  },
  love_letter: Nz,
  postbox: Hz,
  mailbox_closed: Uz,
  mailbox: Vz,
  mailbox_with_mail: Wz,
  mailbox_with_no_mail: Kz,
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
  postal_horn: Gz,
  inbox_tray: Xz,
  outbox_tray: Qz,
  scroll: Jz,
  page_with_curl: Yz,
  bookmark_tabs: Zz,
  receipt: e2,
  bar_chart: a2,
  chart_with_upwards_trend: t2,
  chart_with_downwards_trend: r2,
  page_facing_up: o2,
  date: s2,
  calendar: c2,
  spiral_calendar: i2,
  card_index: n2,
  card_file_box: l2,
  ballot_box: d2,
  file_cabinet: p2,
  clipboard: f2,
  spiral_notepad: h2,
  file_folder: y2,
  open_file_folder: g2,
  card_index_dividers: _2,
  newspaper_roll: u2,
  newspaper: m2,
  notebook: k2,
  closed_book: w2,
  green_book: b2,
  blue_book: v2,
  orange_book: z2,
  notebook_with_decorative_cover: x2,
  ledger: j2,
  books: C2,
  open_book: E2,
  safety_pin: S2,
  link: A2,
  paperclip: L2,
  paperclips: $2,
  scissors: T2,
  triangular_ruler: F2,
  straight_ruler: P2,
  abacus: R2,
  pushpin: I2,
  round_pushpin: q2,
  triangular_flag_on_post: O2,
  white_flag: D2,
  black_flag: M2,
  rainbow_flag: B2,
  closed_lock_with_key: N2,
  lock: H2,
  unlock: U2,
  lock_with_ink_pen: V2,
  pen: W2,
  fountain_pen: K2,
  black_nib: G2,
  memo: X2,
  pencil2: Q2,
  crayon: J2,
  paintbrush: Y2,
  mag: Z2,
  mag_right: e3,
  heart: a3,
  orange_heart: t3,
  yellow_heart: r3,
  green_heart: o3,
  blue_heart: s3,
  purple_heart: c3,
  black_heart: i3,
  broken_heart: n3,
  heavy_heart_exclamation: l3,
  two_hearts: d3,
  revolving_hearts: p3,
  heartbeat: f3,
  heartpulse: h3,
  sparkling_heart: y3,
  cupid: g3,
  gift_heart: _3,
  heart_decoration: u3,
  peace_symbol: m3,
  latin_cross: k3,
  star_and_crescent: w3,
  om: b3,
  wheel_of_dharma: v3,
  star_of_david: z3,
  six_pointed_star: x3,
  menorah: j3,
  yin_yang: C3,
  orthodox_cross: E3,
  place_of_worship: S3,
  ophiuchus: A3,
  aries: L3,
  taurus: $3,
  gemini: T3,
  cancer: F3,
  leo: P3,
  virgo: R3,
  libra: I3,
  scorpius: q3,
  sagittarius: O3,
  capricorn: D3,
  aquarius: M3,
  pisces: B3,
  id: N3,
  atom_symbol: H3,
  u7a7a: U3,
  u5272: V3,
  radioactive: W3,
  biohazard: K3,
  mobile_phone_off: G3,
  vibration_mode: X3,
  u6709: Q3,
  u7121: J3,
  u7533: Y3,
  u55b6: Z3,
  u6708: e5,
  eight_pointed_black_star: a5,
  vs: t5,
  accept: r5,
  white_flower: o5,
  ideograph_advantage: s5,
  secret: c5,
  congratulations: i5,
  u5408: n5,
  u6e80: l5,
  u7981: d5,
  a: p5,
  b: f5,
  ab: h5,
  cl: y5,
  o2: g5,
  sos: _5,
  no_entry: u5,
  name_badge: m5,
  no_entry_sign: k5,
  x: w5,
  o: b5,
  stop_sign: v5,
  anger: z5,
  hotsprings: x5,
  no_pedestrians: j5,
  do_not_litter: C5,
  no_bicycles: E5,
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
  underage: S5,
  no_mobile_phones: A5,
  exclamation: L5,
  grey_exclamation: $5,
  question: T5,
  grey_question: F5,
  bangbang: P5,
  interrobang: R5,
  low_brightness: I5,
  high_brightness: q5,
  trident: O5,
  fleur_de_lis: D5,
  part_alternation_mark: M5,
  warning: B5,
  children_crossing: N5,
  beginner: H5,
  recycle: U5,
  u6307: V5,
  chart: W5,
  sparkle: K5,
  eight_spoked_asterisk: G5,
  negative_squared_cross_mark: X5,
  white_check_mark: Q5,
  diamond_shape_with_a_dot_inside: J5,
  cyclone: Y5,
  loop: Z5,
  globe_with_meridians: e4,
  m: a4,
  atm: t4,
  sa: r4,
  passport_control: o4,
  customs: s4,
  baggage_claim: c4,
  left_luggage: i4,
  wheelchair: n4,
  no_smoking: l4,
  wc: d4,
  parking: p4,
  potable_water: f4,
  mens: h4,
  womens: y4,
  baby_symbol: g4,
  restroom: _4,
  put_litter_in_its_place: u4,
  cinema: m4,
  signal_strength: k4,
  koko: w4,
  ng: b4,
  ok: v4,
  up: z4,
  cool: x4,
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
  free: j4,
  zero: C4,
  one: E4,
  two: S4,
  three: A4,
  four: L4,
  five: $4,
  six: T4,
  seven: F4,
  eight: P4,
  nine: R4,
  keycap_ten: I4,
  asterisk: q4,
  eject_button: O4,
  arrow_forward: D4,
  pause_button: M4,
  next_track_button: B4,
  stop_button: N4,
  record_button: H4,
  play_or_pause_button: U4,
  previous_track_button: V4,
  fast_forward: W4,
  rewind: K4,
  twisted_rightwards_arrows: G4,
  repeat: X4,
  repeat_one: Q4,
  arrow_backward: J4,
  arrow_up_small: Y4,
  arrow_down_small: Z4,
  arrow_double_up: ex,
  arrow_double_down: ax,
  arrow_right: tx,
  arrow_left: rx,
  arrow_up: ox,
  arrow_down: sx,
  arrow_upper_right: cx,
  arrow_lower_right: ix,
  arrow_lower_left: nx,
  arrow_upper_left: lx,
  arrow_up_down: dx,
  left_right_arrow: px,
  arrows_counterclockwise: fx,
  arrow_right_hook: hx,
  leftwards_arrow_with_hook: yx,
  arrow_heading_up: gx,
  arrow_heading_down: _x,
  hash: ux,
  information_source: mx,
  abc: kx,
  abcd: wx,
  capital_abcd: bx,
  symbols: vx,
  musical_note: zx,
  notes: xx,
  wavy_dash: jx,
  curly_loop: Cx,
  heavy_check_mark: Ex,
  arrows_clockwise: Sx,
  heavy_plus_sign: Ax,
  heavy_minus_sign: Lx,
  heavy_division_sign: $x,
  heavy_multiplication_x: Tx,
  infinity: Fx,
  heavy_dollar_sign: Px,
  currency_exchange: Rx,
  copyright: Ix,
  registered: qx,
  tm: Ox,
  end: Dx,
  back: Mx,
  on: Bx,
  top: Nx,
  soon: Hx,
  ballot_box_with_check: Ux,
  radio_button: Vx,
  white_circle: Wx,
  black_circle: Kx,
  red_circle: Gx,
  large_blue_circle: Xx,
  small_orange_diamond: Qx,
  small_blue_diamond: Jx,
  large_orange_diamond: Yx,
  large_blue_diamond: Zx,
  small_red_triangle: ej,
  black_small_square: aj,
  white_small_square: tj,
  black_large_square: rj,
  white_large_square: oj,
  small_red_triangle_down: sj,
  black_medium_square: cj,
  white_medium_square: ij,
  black_medium_small_square: nj,
  white_medium_small_square: lj,
  black_square_button: dj,
  white_square_button: pj,
  speaker: fj,
  sound: hj,
  loud_sound: yj,
  mute: gj,
  mega: _j,
  loudspeaker: uj,
  bell: mj,
  no_bell: kj,
  black_joker: wj,
  mahjong: bj,
  spades: vj,
  clubs: zj,
  hearts: xj,
  diamonds: jj,
  flower_playing_cards: Cj,
  thought_balloon: Ej,
  right_anger_bubble: Sj,
  speech_balloon: Aj,
  left_speech_bubble: Lj,
  clock1: $j,
  clock2: Tj,
  clock3: Fj,
  clock4: Pj,
  clock5: Rj,
  clock6: Ij,
  clock7: qj,
  clock8: Oj,
  clock9: Dj,
  clock10: Mj,
  clock11: Bj,
  clock12: Nj,
  clock130: Hj,
  clock230: Uj,
  clock330: Vj,
  clock430: Wj,
  clock530: Kj,
  clock630: Gj,
  clock730: Xj,
  clock830: Qj,
  clock930: Jj,
  clock1030: Yj,
  clock1130: Zj,
  clock1230: e6,
  afghanistan: a6,
  aland_islands: t6,
  albania: r6,
  algeria: o6,
  american_samoa: s6,
  andorra: c6,
  angola: i6,
  anguilla: n6,
  antarctica: l6,
  antigua_barbuda: d6,
  argentina: p6,
  armenia: f6,
  aruba: h6,
  australia: y6,
  austria: g6,
  azerbaijan: _6,
  bahamas: u6,
  bahrain: m6,
  bangladesh: k6,
  barbados: w6,
  belarus: b6,
  belgium: v6,
  belize: z6,
  benin: x6,
  bermuda: j6,
  bhutan: C6,
  bolivia: E6,
  caribbean_netherlands: S6,
  bosnia_herzegovina: A6,
  botswana: L6,
  brazil: $6,
  british_indian_ocean_territory: T6,
  british_virgin_islands: F6,
  brunei: P6,
  bulgaria: R6,
  burkina_faso: I6,
  burundi: q6,
  cape_verde: O6,
  cambodia: D6,
  cameroon: M6,
  canada: B6,
  canary_islands: N6,
  cayman_islands: H6,
  central_african_republic: U6,
  chad: V6,
  chile: W6,
  cn: K6,
  christmas_island: G6,
  cocos_islands: X6,
  colombia: Q6,
  comoros: J6,
  congo_brazzaville: Y6,
  congo_kinshasa: Z6,
  cook_islands: eC,
  costa_rica: aC,
  croatia: tC,
  cuba: rC,
  curacao: oC,
  cyprus: sC,
  czech_republic: cC,
  denmark: iC,
  djibouti: nC,
  dominica: lC,
  dominican_republic: dC,
  ecuador: pC,
  egypt: fC,
  el_salvador: hC,
  equatorial_guinea: yC,
  eritrea: gC,
  estonia: _C,
  ethiopia: uC,
  eu: mC,
  falkland_islands: kC,
  faroe_islands: wC,
  fiji: bC,
  finland: vC,
  fr: zC,
  french_guiana: xC,
  french_polynesia: jC,
  french_southern_territories: CC,
  gabon: EC,
  gambia: SC,
  georgia: AC,
  de: LC,
  ghana: $C,
  gibraltar: TC,
  greece: FC,
  greenland: PC,
  grenada: RC,
  guadeloupe: IC,
  guam: qC,
  guatemala: OC,
  guernsey: DC,
  guinea: MC,
  guinea_bissau: BC,
  guyana: NC,
  haiti: HC,
  honduras: UC,
  hong_kong: VC,
  hungary: WC,
  iceland: KC,
  india: GC,
  indonesia: XC,
  iran: QC,
  iraq: JC,
  ireland: YC,
  isle_of_man: ZC,
  israel: e8,
  it: a8,
  cote_divoire: t8,
  jamaica: r8,
  jp: o8,
  jersey: s8,
  jordan: c8,
  kazakhstan: i8,
  kenya: n8,
  kiribati: l8,
  kosovo: d8,
  kuwait: p8,
  kyrgyzstan: f8,
  laos: h8,
  latvia: y8,
  lebanon: g8,
  lesotho: _8,
  liberia: u8,
  libya: m8,
  liechtenstein: k8,
  lithuania: w8,
  luxembourg: b8,
  macau: v8,
  macedonia: z8,
  madagascar: x8,
  malawi: j8,
  malaysia: C8,
  maldives: E8,
  mali: S8,
  malta: A8,
  marshall_islands: L8,
  martinique: $8,
  mauritania: T8,
  mauritius: F8,
  mayotte: P8,
  mexico: R8,
  micronesia: I8,
  moldova: q8,
  monaco: O8,
  mongolia: D8,
  montenegro: M8,
  montserrat: B8,
  morocco: N8,
  mozambique: H8,
  myanmar: U8,
  namibia: V8,
  nauru: W8,
  nepal: K8,
  netherlands: G8,
  new_caledonia: X8,
  new_zealand: Q8,
  nicaragua: J8,
  niger: Y8,
  nigeria: Z8,
  niue: e7,
  norfolk_island: a7,
  northern_mariana_islands: t7,
  north_korea: r7,
  norway: o7,
  oman: s7,
  pakistan: c7,
  palau: i7,
  palestinian_territories: n7,
  panama: l7,
  papua_new_guinea: d7,
  paraguay: p7,
  peru: f7,
  philippines: h7,
  pitcairn_islands: y7,
  poland: g7,
  portugal: _7,
  puerto_rico: u7,
  qatar: m7,
  reunion: k7,
  romania: w7,
  ru: b7,
  rwanda: v7,
  st_barthelemy: z7,
  st_helena: x7,
  st_kitts_nevis: j7,
  st_lucia: C7,
  st_pierre_miquelon: E7,
  st_vincent_grenadines: S7,
  samoa: A7,
  san_marino: L7,
  sao_tome_principe: $7,
  saudi_arabia: T7,
  senegal: F7,
  serbia: P7,
  seychelles: R7,
  sierra_leone: I7,
  singapore: q7,
  sint_maarten: O7,
  slovakia: D7,
  slovenia: M7,
  solomon_islands: B7,
  somalia: N7,
  south_africa: H7,
  south_georgia_south_sandwich_islands: U7,
  kr: V7,
  south_sudan: W7,
  es: K7,
  sri_lanka: G7,
  sudan: X7,
  suriname: Q7,
  swaziland: J7,
  sweden: Y7,
  switzerland: Z7,
  syria: eE,
  taiwan: aE,
  tajikistan: tE,
  tanzania: rE,
  thailand: oE,
  timor_leste: sE,
  togo: cE,
  tokelau: iE,
  tonga: nE,
  trinidad_tobago: lE,
  tunisia: dE,
  tr: pE,
  turkmenistan: fE,
  turks_caicos_islands: hE,
  tuvalu: yE,
  uganda: gE,
  ukraine: _E,
  united_arab_emirates: uE,
  uk: mE,
  england: kE,
  scotland: wE,
  wales: bE,
  us: vE,
  us_virgin_islands: zE,
  uruguay: xE,
  uzbekistan: jE,
  vanuatu: CE,
  vatican_city: EE,
  venezuela: SE,
  vietnam: AE,
  wallis_futuna: LE,
  western_sahara: $E,
  yemen: TE,
  zambia: FE,
  zimbabwe: PE,
  united_nations: RE,
  pirate_flag: IE
}, OE = [
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
var DE = {
  lib: qE,
  ordered: OE,
  fitzpatrick_scale_modifiers: ["🏻", "🏼", "🏽", "🏾", "🏿"]
};
const ME = /* @__PURE__ */ ha(DE);
var BE = () => {
  const t = "\\ud800-\\udfff", e = "\\u0300-\\u036f", a = "\\ufe20-\\ufe2f", r = "\\u20d0-\\u20ff", s = "\\u1ab0-\\u1aff", i = "\\u1dc0-\\u1dff", l = e + a + r + s + i, d = "\\ufe0e\\ufe0f", n = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", f = `[${t}]`, h = `[${l}]`, p = "\\ud83c[\\udffb-\\udfff]", c = `(?:${h}|${p})`, y = `[^${t}]`, u = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", k = "[\\ud800-\\udbff][\\udc00-\\udfff]", x = "\\u200d", E = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", w = `[${n}]`, S = `${c}?`, z = `[${d}]?`, g = `(?:${x}(?:${[y, u, k].join("|")})${z + S})*`, o = z + S + g, b = `(?:${[`${y}${h}?`, h, u, k, f, w].join("|")})`;
  return new RegExp(`${E}|${p}(?=${p})|${b + o}`, "g");
};
const NE = /* @__PURE__ */ ha(BE);
var HE = /* @__PURE__ */ new Set([
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
const UE = HE, to = /* @__PURE__ */ new Map([
  ["none", ""],
  ["white", "🏻"],
  ["creamWhite", "🏼"],
  ["lightBrown", "🏽"],
  ["brown", "🏾"],
  ["darkBrown", "🏿"]
]);
var VE = (t, e) => {
  if (!to.has(e))
    throw new TypeError(`Unexpected \`skinTone\` name: ${e}`);
  return t = t.replace(/[\u{1f3fb}-\u{1f3ff}]/u, ""), UE.has(t.codePointAt(0)) && e !== "none" && (t += to.get(e)), t;
};
const WE = /* @__PURE__ */ ha(VE);
var KE = NE();
function GE(t) {
  return typeof t == "function" ? t : () => t;
}
var XE = String.fromCharCode(65039), QE = new RegExp(XE, "g");
function Io(t) {
  return t.replace(QE, "");
}
function qo(t) {
  return /:.+:/.test(t) ? t.slice(1, -1) : t;
}
var Oo = Object.entries(ME.lib).map(
  ([t, { char: e }]) => [t, e]
), JE = new Map(Oo), YE = new Map(
  Oo.map(([t, e]) => [Io(e), t])
), ZE = (t) => {
  Be.assert.string(t);
  const e = qo(t), a = JE.get(e);
  return a ? { emoji: a, key: e } : void 0;
}, ro = (t, { fallback: e, format: a = (r) => r } = {}) => {
  const r = e === void 0 ? e : GE(e);
  return Qe.assert.string(t), Qe.assert.any([Qe.default.undefined, Qe.default.function_], r), Qe.assert.function_(a), t.replace(/:[\w\-+]+:/g, (s) => {
    const i = ZE(s);
    return i ? a(i.emoji, s, t) : a(r ? r(qo(s)) : s);
  });
}, e9 = (t) => {
  Be.assert.string(t);
  const e = Io(t), a = YE.get(e);
  return a ? { emoji: e, key: a } : void 0;
}, a9 = (t, { markdown: e = !1 } = {}) => {
  Be.assert.string(t), Be.assert.boolean(e);
  const a = e9(WE(t, "none"));
  if (a !== void 0)
    return e ? `:${a.key}:` : a.key;
}, t9 = (t) => {
  Be.assert.string(t);
  const e = t.match(KE);
  return e === null ? t : e.map((a) => a9(a, { markdown: !0 }) ?? a).join("");
}, Kt = { exports: {} }, fr = { exports: {} };
fr.exports;
(function(t) {
  (function(e, a, r) {
    function s(n) {
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
      var h = new s(n), p = f && f.state, c = h.next;
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
    He,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(fr);
var r9 = fr.exports, hr = { exports: {} };
hr.exports;
(function(t) {
  (function(e, a, r) {
    function s(d) {
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
      var f = new s(d), h = n && n.state, p = function() {
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
    He,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(hr);
var o9 = hr.exports, yr = { exports: {} };
yr.exports;
(function(t) {
  (function(e, a, r) {
    function s(d) {
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
      var f = new s(d), h = n && n.state, p = function() {
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
    He,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(yr);
var s9 = yr.exports, gr = { exports: {} };
gr.exports;
(function(t) {
  (function(e, a, r) {
    function s(d) {
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
      var f = new s(d), h = n && n.state, p = function() {
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
    He,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(gr);
var c9 = gr.exports, _r = { exports: {} };
_r.exports;
(function(t) {
  (function(e, a, r) {
    function s(d) {
      var n = this;
      n.next = function() {
        var h = n.w, p = n.X, c = n.i, y, u;
        return n.w = h = h + 1640531527 | 0, u = p[c + 34 & 127], y = p[c = c + 1 & 127], u ^= u << 13, y ^= y << 17, u ^= u >>> 15, y ^= y >>> 12, u = p[c] = u ^ y, n.i = c, u + (h ^ h >>> 16) | 0;
      };
      function f(h, p) {
        var c, y, u, k, x, E = [], w = 128;
        for (p === (p | 0) ? (y = p, p = null) : (p = p + "\0", y = 0, w = Math.max(w, p.length)), u = 0, k = -32; k < w; ++k)
          p && (y ^= p.charCodeAt((k + 32) % p.length)), k === 0 && (x = y), y ^= y << 10, y ^= y >>> 15, y ^= y << 4, y ^= y >>> 13, k >= 0 && (x = x + 1640531527 | 0, c = E[k & 127] ^= y + x, u = c == 0 ? u + 1 : 0);
        for (u >= 128 && (E[(p && p.length || 0) & 127] = -1), u = 127, k = 4 * 128; k > 0; --k)
          y = E[u + 34 & 127], c = E[u = u + 1 & 127], y ^= y << 13, c ^= c << 17, y ^= y >>> 15, c ^= c >>> 12, E[u] = y ^ c;
        h.w = x, h.X = E, h.i = u;
      }
      f(n, d);
    }
    function i(d, n) {
      return n.i = d.i, n.w = d.w, n.X = d.X.slice(), n;
    }
    function l(d, n) {
      d == null && (d = +/* @__PURE__ */ new Date());
      var f = new s(d), h = n && n.state, p = function() {
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
    He,
    // window object or global
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(_r);
var i9 = _r.exports, ur = { exports: {} };
ur.exports;
(function(t) {
  (function(e, a, r) {
    function s(d) {
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
      var f = new s(d), h = n && n.state, p = function() {
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
    He,
    t,
    // present in node.js
    !1
    // present with an AMD loader
  );
})(ur);
var n9 = ur.exports, Do = { exports: {} };
const l9 = {}, d9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: l9
}, Symbol.toStringTag, { value: "Module" })), p9 = /* @__PURE__ */ Hi(d9);
(function(t) {
  (function(e, a) {
    var r = this, s = 256, i = 6, l = 52, d = "random", n = a.pow(s, i), f = a.pow(2, l), h = f * 2, p = s - 1, c;
    function y(z, g, o) {
      var _ = [];
      g = g == !0 ? { entropy: !0 } : g || {};
      var b = E(x(
        g.entropy ? [z, S(e)] : z ?? w(),
        3
      ), _), T = new u(_), j = function() {
        for (var F = T.g(i), q = n, A = 0; F < f; )
          F = (F + A) * s, q *= s, A = T.g(1);
        for (; F >= h; )
          F /= 2, q /= 2, A >>>= 1;
        return (F + A) / q;
      };
      return j.int32 = function() {
        return T.g(4) | 0;
      }, j.quick = function() {
        return T.g(4) / 4294967296;
      }, j.double = j, E(S(T.S), e), (g.pass || o || function(F, q, A, O) {
        return O && (O.S && k(O, T), F.state = function() {
          return k(T, {});
        }), A ? (a[d] = F, q) : F;
      })(
        j,
        b,
        "global" in g ? g.global : this == a,
        g.state
      );
    }
    a["seed" + d] = y;
    function u(z) {
      var g, o = z.length, _ = this, b = 0, T = _.i = _.j = 0, j = _.S = [];
      for (o || (z = [o++]); b < s; )
        j[b] = b++;
      for (b = 0; b < s; b++)
        j[b] = j[T = p & T + z[b % o] + (g = j[b])], j[T] = g;
      (_.g = function(F) {
        for (var q, A = 0, O = _.i, N = _.j, K = _.S; F--; )
          q = K[O = p & O + 1], A = A * s + K[p & (K[O] = K[N = p & N + q]) + (K[N] = q)];
        return _.i = O, _.j = N, A;
      })(s);
    }
    function k(z, g) {
      return g.i = z.i, g.j = z.j, g.S = z.S.slice(), g;
    }
    function x(z, g) {
      var o = [], _ = typeof z, b;
      if (g && _ == "object")
        for (b in z)
          try {
            o.push(x(z[b], g - 1));
          } catch {
          }
      return o.length ? o : _ == "string" ? z : z + "\0";
    }
    function E(z, g) {
      for (var o = z + "", _, b = 0; b < o.length; )
        g[p & b] = p & (_ ^= g[p & b] * 19) + o.charCodeAt(b++);
      return S(g);
    }
    function w() {
      try {
        if (c)
          return S(c.randomBytes(s));
        var z = new Uint8Array(s);
        return (r.crypto || r.msCrypto).getRandomValues(z), S(z);
      } catch {
        var g = r.navigator, o = g && g.plugins;
        return [+/* @__PURE__ */ new Date(), r, o, r.screen, S(e)];
      }
    }
    function S(z) {
      return String.fromCharCode.apply(0, z);
    }
    if (E(a.random(), e), t.exports) {
      t.exports = y;
      try {
        c = p9;
      } catch {
      }
    }
  })(
    [],
    // pool: entropy pool starts empty
    Math
    // math: package containing random, pow, and seedrandom
  );
})(Do);
var f9 = Do.exports, h9 = r9, y9 = o9, g9 = s9, _9 = c9, u9 = i9, m9 = n9, Re = f9;
Re.alea = h9;
Re.xor128 = y9;
Re.xorwow = g9;
Re.xorshift7 = _9;
Re.xor4096 = u9;
Re.tychei = m9;
var k9 = Re, mr = {};
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
    let s, i, l;
    if (e && a && r)
      s = e, i = a, l = r;
    else if (typeof e == "string") {
      const y = re.parseString(e);
      if (y !== null)
        s = y.r, i = y.g, l = y.b;
      else
        throw "unknown color string";
    } else if (Array.isArray(e))
      s = e[0], i = e[1], l = e[2];
    else if (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b"))
      s = e.r, i = e.g, l = e.b;
    else
      throw "invalid argument";
    const d = Math.max(s, i, l), n = Math.min(s, i, l), f = d - n;
    let h, p;
    const c = d;
    if (d === 0 ? p = 0 : p = f / d, d === n)
      h = 0;
    else {
      switch (d) {
        case s:
          h = (i - l) / f + (i < l ? 6 : 0);
          break;
        case i:
          h = (l - s) / f + 2;
          break;
        case l:
          h = (s - i) / f + 4;
          break;
      }
      h /= 6;
    }
    return { h, s: p, v: c };
  }
  static rgbToHsl(e, a, r) {
    let s, i, l;
    if (e && a && r)
      s = e, i = a, l = r;
    else if (typeof e == "string") {
      const y = re.parseString(e);
      if (y !== null)
        s = y.r, i = y.g, l = y.b;
      else
        throw "unknown color string";
    } else if (Array.isArray(e))
      s = e[0], i = e[1], l = e[2];
    else if (e.hasOwnProperty("r") && e.hasOwnProperty("g") && e.hasOwnProperty("b"))
      s = e.r, i = e.g, l = e.b;
    else
      throw "invalid argument";
    const d = Math.max(s, i, l), n = Math.min(s, i, l), f = d - n;
    let h;
    const p = (d + n) / 2;
    let c;
    if (d === n)
      h = 0, c = 0;
    else {
      switch (c = p > 0.5 ? f / (2 - d - n) : f / (d + n), d) {
        case s:
          h = (i - l) / f + (i < l ? 6 : 0);
          break;
        case i:
          h = (l - s) / f + 2;
          break;
        case l:
          h = (s - i) / f + 4;
          break;
      }
      h /= 6;
    }
    return { h, s: c, l: p };
  }
  static hsvToRgb(e, a, r) {
    let s, i, l, d, n, f;
    for (typeof e == "object" ? (d = e.h, n = e.s, f = e.v) : (d = e, n = a, f = r); d < 0; )
      d += 360;
    if (d = d % 360, n === 0)
      return f = Math.round(f), { r: f, g: f, b: f };
    n = n / 255;
    const h = Math.floor(d / 60) % 6, p = d / 60 - h, c = f * (1 - n), y = f * (1 - p * n), u = f * (1 - (1 - p) * n);
    switch (h) {
      case 0:
        s = f, i = u, l = c;
        break;
      case 1:
        s = y, i = f, l = c;
        break;
      case 2:
        s = c, i = f, l = u;
        break;
      case 3:
        s = c, i = y, l = f;
        break;
      case 4:
        s = u, i = c, l = f;
        break;
      case 5:
        s = f, i = c, l = y;
        break;
    }
    return {
      r: Math.round(s),
      g: Math.round(i),
      b: Math.round(l)
    };
  }
  static hslToRgb(e, a, r) {
    let s, i, l, d, n, f;
    if (typeof e == "object" ? (d = e.h, n = e.s, f = e.l) : (d = e, n = a, f = r), n === 0)
      s = i = l = f;
    else {
      const h = (y, u, k) => (k < 0 && (k += 1), k > 1 && (k -= 1), k < 0.16666666666666666 ? y + (u - y) * 6 * k : k < 0.5 ? u : k < 0.6666666666666666 ? y + (u - y) * (0.6666666666666666 - k) * 6 : y), p = f < 0.5 ? f * (1 + n) : f + n - f * n, c = 2 * f - p;
      s = h(c, p, d + 1 / 3), i = h(c, p, d), l = h(c, p, d - 1 / 3);
    }
    return {
      r: Math.round(s * 255),
      g: Math.round(i * 255),
      b: Math.round(l * 255)
    };
  }
  constructor(e, a, r) {
    if (e != null && a != null && r != null)
      this.r = e, this.g = a, this.b = r;
    else if (typeof e == "string") {
      const s = re.parseString(e);
      if (s !== null)
        this.setRGB(s);
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
    const a = this.r.toString(16), r = this.g.toString(16), s = this.b.toString(16), i = `0${a}`.slice(-2), l = `0${r}`.slice(-2), d = `0${s}`.slice(-2);
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
  const a = k9, r = mr, s = (i) => {
    const l = a(i), d = Math.floor(l() * 255), n = Math.floor(l() * 255), f = Math.floor(l() * 255);
    return new r.default(d, n, f);
  };
  Object.defineProperty(s, "default", { value: s }), t.exports = s, e.default = s;
})(Kt, Kt.exports);
var w9 = Kt.exports;
const b9 = /* @__PURE__ */ ha(w9), Mo = Math.sqrt(1.05 * 0.05) - 0.05, v9 = /^(?:[0-9a-f]{3}){1,2}$/i, oo = {
  black: "#000000",
  white: "#ffffff",
  threshold: Mo
};
function z9(t, e = 2) {
  return (new Array(e).join("0") + t).slice(-e);
}
function Gt(t) {
  if (t.slice(0, 1) === "#" && (t = t.slice(1)), !v9.test(t))
    throw new Error(`Invalid HEX color: "${t}"`);
  return t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), [
    parseInt(t.slice(0, 2), 16),
    parseInt(t.slice(2, 4), 16),
    parseInt(t.slice(4, 6), 16)
    // b
  ];
}
function x9(t) {
  return { r: t[0], g: t[1], b: t[2] };
}
function Xt(t) {
  if (!t)
    throw new Error("Invalid color value");
  return Array.isArray(t) ? t : typeof t == "string" ? Gt(t) : [t.r, t.g, t.b];
}
function j9(t) {
  let e, a;
  const r = [];
  for (e = 0; e < t.length; e++)
    a = t[e] / 255, r[e] = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
  return 0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2];
}
function Qt(t, e, a) {
  const r = e === !0 ? oo : Object.assign({}, oo, e);
  return j9(t) > r.threshold ? a ? Gt(r.black) : r.black : a ? Gt(r.white) : r.white;
}
function Jt(t, e = !1) {
  return t = Xt(t), e ? Qt(t, e) : "#" + t.map((a) => z9((255 - a).toString(16))).join("");
}
(function(t) {
  function e(r, s) {
    r = Xt(r);
    const i = s ? Qt(r, s, !0) : r.map((l) => 255 - l);
    return x9(i);
  }
  t.asRGB = e;
  function a(r, s) {
    return r = Xt(r), s ? Qt(r, s, !0) : r.map((i) => 255 - i);
  }
  t.asRgbArray = a, t.defaultThreshold = Mo, t.asRgbObject = e;
})(Jt || (Jt = {}));
const C9 = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", E9 = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Ne = (t, e) => {
  for (const a in e)
    t[a] = e[a];
  return t;
}, Yt = "numeric", Zt = "ascii", er = "alpha", ra = "asciinumeric", Ze = "alphanumeric", ar = "domain", Bo = "emoji", S9 = "scheme", A9 = "slashscheme", At = "whitespace";
function L9(t, e) {
  return t in e || (e[t] = []), e[t];
}
function Fe(t, e, a) {
  e[Yt] && (e[ra] = !0, e[Ze] = !0), e[Zt] && (e[ra] = !0, e[er] = !0), e[ra] && (e[Ze] = !0), e[er] && (e[Ze] = !0), e[Ze] && (e[ar] = !0), e[Bo] && (e[ar] = !0);
  for (const r in e) {
    const s = L9(r, a);
    s.indexOf(t) < 0 && s.push(t);
  }
}
function $9(t, e) {
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
      const s = e.jr[r][0], i = e.jr[r][1];
      if (i && s.test(t))
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
    for (let s = 0; s < t.length; s++)
      this.tt(t[s], e, a, r);
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
    let s;
    return e && e.j ? s = e : (s = new oe(e), a && r && Fe(e, a, r)), this.jr.push([t, s]), s;
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
    let s = this;
    const i = t.length;
    if (!i)
      return s;
    for (let l = 0; l < i - 1; l++)
      s = s.tt(t[l]);
    return s.tt(t[i - 1], e, a, r);
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
    const s = this;
    if (e && e.j)
      return s.j[t] = e, e;
    const i = e;
    let l, d = s.go(t);
    if (d ? (l = new oe(), Ne(l.j, d.j), l.jr.push.apply(l.jr, d.jr), l.jd = d.jd, l.t = d.t) : l = new oe(), i) {
      if (r)
        if (l.t && typeof l.t == "string") {
          const n = Ne($9(l.t, r), a);
          Fe(i, n, r);
        } else
          a && Fe(i, a, r);
      l.t = i;
    }
    return s.j[t] = l, l;
  }
};
const $ = (t, e, a, r, s) => t.ta(e, a, r, s), H = (t, e, a, r, s) => t.tr(e, a, r, s), so = (t, e, a, r, s) => t.ts(e, a, r, s), m = (t, e, a, r, s) => t.tt(e, a, r, s), _e = "WORD", tr = "UWORD", No = "ASCIINUMERICAL", Ho = "ALPHANUMERICAL", da = "LOCALHOST", rr = "TLD", or = "UTLD", La = "SCHEME", Ie = "SLASH_SCHEME", kr = "NUM", sr = "WS", wr = "NL", oa = "OPENBRACE", sa = "CLOSEBRACE", Oa = "OPENBRACKET", Da = "CLOSEBRACKET", Ma = "OPENPAREN", Ba = "CLOSEPAREN", Na = "OPENANGLEBRACKET", Ha = "CLOSEANGLEBRACKET", Ua = "FULLWIDTHLEFTPAREN", Va = "FULLWIDTHRIGHTPAREN", Wa = "LEFTCORNERBRACKET", Ka = "RIGHTCORNERBRACKET", Ga = "LEFTWHITECORNERBRACKET", Xa = "RIGHTWHITECORNERBRACKET", Qa = "FULLWIDTHLESSTHAN", Ja = "FULLWIDTHGREATERTHAN", Ya = "AMPERSAND", br = "APOSTROPHE", Za = "ASTERISK", je = "AT", et = "BACKSLASH", at = "BACKTICK", tt = "CARET", Ce = "COLON", vr = "COMMA", rt = "DOLLAR", le = "DOT", ot = "EQUALS", zr = "EXCLAMATION", ce = "HYPHEN", ca = "PERCENT", st = "PIPE", ct = "PLUS", it = "POUND", ia = "QUERY", xr = "QUOTE", Uo = "FULLWIDTHMIDDLEDOT", jr = "SEMI", de = "SLASH", na = "TILDE", nt = "UNDERSCORE", Vo = "EMOJI", lt = "SYM";
var Wo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: _e,
  UWORD: tr,
  ASCIINUMERICAL: No,
  ALPHANUMERICAL: Ho,
  LOCALHOST: da,
  TLD: rr,
  UTLD: or,
  SCHEME: La,
  SLASH_SCHEME: Ie,
  NUM: kr,
  WS: sr,
  NL: wr,
  OPENBRACE: oa,
  CLOSEBRACE: sa,
  OPENBRACKET: Oa,
  CLOSEBRACKET: Da,
  OPENPAREN: Ma,
  CLOSEPAREN: Ba,
  OPENANGLEBRACKET: Na,
  CLOSEANGLEBRACKET: Ha,
  FULLWIDTHLEFTPAREN: Ua,
  FULLWIDTHRIGHTPAREN: Va,
  LEFTCORNERBRACKET: Wa,
  RIGHTCORNERBRACKET: Ka,
  LEFTWHITECORNERBRACKET: Ga,
  RIGHTWHITECORNERBRACKET: Xa,
  FULLWIDTHLESSTHAN: Qa,
  FULLWIDTHGREATERTHAN: Ja,
  AMPERSAND: Ya,
  APOSTROPHE: br,
  ASTERISK: Za,
  AT: je,
  BACKSLASH: et,
  BACKTICK: at,
  CARET: tt,
  COLON: Ce,
  COMMA: vr,
  DOLLAR: rt,
  DOT: le,
  EQUALS: ot,
  EXCLAMATION: zr,
  HYPHEN: ce,
  PERCENT: ca,
  PIPE: st,
  PLUS: ct,
  POUND: it,
  QUERY: ia,
  QUOTE: xr,
  FULLWIDTHMIDDLEDOT: Uo,
  SEMI: jr,
  SLASH: de,
  TILDE: na,
  UNDERSCORE: nt,
  EMOJI: Vo,
  SYM: lt
});
const ye = /[a-z]/, Je = /\p{L}/u, Lt = /\p{Emoji}/u, ge = /\d/, $t = /\s/, co = "\r", Tt = `
`, T9 = "️", F9 = "‍", Ft = "￼";
let wa = null, ba = null;
function P9(t = []) {
  const e = {};
  oe.groups = e;
  const a = new oe();
  wa == null && (wa = io(C9)), ba == null && (ba = io(E9)), m(a, "'", br), m(a, "{", oa), m(a, "}", sa), m(a, "[", Oa), m(a, "]", Da), m(a, "(", Ma), m(a, ")", Ba), m(a, "<", Na), m(a, ">", Ha), m(a, "（", Ua), m(a, "）", Va), m(a, "「", Wa), m(a, "」", Ka), m(a, "『", Ga), m(a, "』", Xa), m(a, "＜", Qa), m(a, "＞", Ja), m(a, "&", Ya), m(a, "*", Za), m(a, "@", je), m(a, "`", at), m(a, "^", tt), m(a, ":", Ce), m(a, ",", vr), m(a, "$", rt), m(a, ".", le), m(a, "=", ot), m(a, "!", zr), m(a, "-", ce), m(a, "%", ca), m(a, "|", st), m(a, "+", ct), m(a, "#", it), m(a, "?", ia), m(a, '"', xr), m(a, "/", de), m(a, ";", jr), m(a, "~", na), m(a, "_", nt), m(a, "\\", et), m(a, "・", Uo);
  const r = H(a, ge, kr, {
    [Yt]: !0
  });
  H(r, ge, r);
  const s = H(r, ye, No, {
    [ra]: !0
  }), i = H(r, Je, Ho, {
    [Ze]: !0
  }), l = H(a, ye, _e, {
    [Zt]: !0
  });
  H(l, ge, s), H(l, ye, l), H(s, ge, s), H(s, ye, s);
  const d = H(a, Je, tr, {
    [er]: !0
  });
  H(d, ye), H(d, ge, i), H(d, Je, d), H(i, ge, i), H(i, ye), H(i, Je, i);
  const n = m(a, Tt, wr, {
    [At]: !0
  }), f = m(a, co, sr, {
    [At]: !0
  }), h = H(a, $t, sr, {
    [At]: !0
  });
  m(a, Ft, h), m(f, Tt, n), m(f, Ft, h), H(f, $t, h), m(h, co), m(h, Tt), H(h, $t, h), m(h, Ft, h);
  const p = H(a, Lt, Vo, {
    [Bo]: !0
  });
  m(p, "#"), H(p, Lt, p), m(p, T9, p);
  const c = m(p, F9);
  m(c, "#"), H(c, Lt, p);
  const y = [[ye, l], [ge, s]], u = [[ye, null], [Je, d], [ge, i]];
  for (let k = 0; k < wa.length; k++)
    xe(a, wa[k], rr, _e, y);
  for (let k = 0; k < ba.length; k++)
    xe(a, ba[k], or, tr, u);
  Fe(rr, {
    tld: !0,
    ascii: !0
  }, e), Fe(or, {
    utld: !0,
    alpha: !0
  }, e), xe(a, "file", La, _e, y), xe(a, "mailto", La, _e, y), xe(a, "http", Ie, _e, y), xe(a, "https", Ie, _e, y), xe(a, "ftp", Ie, _e, y), xe(a, "ftps", Ie, _e, y), Fe(La, {
    scheme: !0,
    ascii: !0
  }, e), Fe(Ie, {
    slashscheme: !0,
    ascii: !0
  }, e), t = t.sort((k, x) => k[0] > x[0] ? 1 : -1);
  for (let k = 0; k < t.length; k++) {
    const x = t[k][0], w = t[k][1] ? {
      [S9]: !0
    } : {
      [A9]: !0
    };
    x.indexOf("-") >= 0 ? w[ar] = !0 : ye.test(x) ? ge.test(x) ? w[ra] = !0 : w[Zt] = !0 : w[Yt] = !0, so(a, x, x, w);
  }
  return so(a, "localhost", da, {
    ascii: !0
  }), a.jd = new oe(lt), {
    start: a,
    tokens: Ne({
      groups: e
    }, Wo)
  };
}
function Ko(t, e) {
  const a = R9(e.replace(/[A-Z]/g, (d) => d.toLowerCase())), r = a.length, s = [];
  let i = 0, l = 0;
  for (; l < r; ) {
    let d = t, n = null, f = 0, h = null, p = -1, c = -1;
    for (; l < r && (n = d.go(a[l])); )
      d = n, d.accepts() ? (p = 0, c = 0, h = d) : p >= 0 && (p += a[l].length, c++), f += a[l].length, i += a[l].length, l++;
    i -= p, l -= c, f -= p, s.push({
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
  return s;
}
function R9(t) {
  const e = [], a = t.length;
  let r = 0;
  for (; r < a; ) {
    let s = t.charCodeAt(r), i, l = s < 55296 || s > 56319 || r + 1 === a || (i = t.charCodeAt(r + 1)) < 56320 || i > 57343 ? t[r] : t.slice(r, r + 2);
    e.push(l), r += l.length;
  }
  return e;
}
function xe(t, e, a, r, s) {
  let i;
  const l = e.length;
  for (let d = 0; d < l - 1; d++) {
    const n = e[d];
    t.j[n] ? i = t.j[n] : (i = new oe(r), i.jr = s.slice(), t.j[n] = i), t = i;
  }
  return i = new oe(a), i.jr = s.slice(), t.j[e[l - 1]] = i, i;
}
function io(t) {
  const e = [], a = [];
  let r = 0, s = "0123456789";
  for (; r < t.length; ) {
    let i = 0;
    for (; s.indexOf(t[r + i]) >= 0; )
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
const pa = {
  defaultProtocol: "http",
  events: null,
  format: no,
  formatHref: no,
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
function Cr(t, e = null) {
  let a = Ne({}, pa);
  t && (a = Ne(a, t instanceof Cr ? t.o : t));
  const r = a.ignoreTags, s = [];
  for (let i = 0; i < r.length; i++)
    s.push(r[i].toUpperCase());
  this.o = a, e && (this.defaultRender = e), this.ignoreTags = s;
}
Cr.prototype = {
  o: pa,
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
    let s = this.o[t];
    return s && (typeof s == "object" ? (s = a.t in s ? s[a.t] : pa[t], typeof s == "function" && r && (s = s(e, a))) : typeof s == "function" && r && (s = s(e, a.t, a)), s);
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
function no(t) {
  return t;
}
function Go(t, e) {
  this.t = "token", this.v = t, this.tk = e;
}
Go.prototype = {
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
  toObject(t = pa.defaultProtocol) {
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
    const e = this, a = this.toHref(t.get("defaultProtocol")), r = t.get("formatHref", a, this), s = t.get("tagName", a, e), i = this.toFormattedString(t), l = {}, d = t.get("className", a, e), n = t.get("target", a, e), f = t.get("rel", a, e), h = t.getObj("attributes", a, e), p = t.getObj("events", a, e);
    return l.href = r, d && (l.class = d), n && (l.target = n), f && (l.rel = f), h && Ne(l, h), {
      tagName: s,
      attributes: l,
      content: i,
      eventListeners: p
    };
  }
};
function gt(t, e) {
  class a extends Go {
    constructor(s, i) {
      super(s, i), this.t = t;
    }
  }
  for (const r in e)
    a.prototype[r] = e[r];
  return a.t = t, a;
}
const lo = gt("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), po = gt("text"), I9 = gt("nl"), va = gt("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(t = pa.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${t}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const t = this.tk;
    return t.length >= 2 && t[0].t !== da && t[1].t === Ce;
  }
}), se = (t) => new oe(t);
function q9({
  groups: t
}) {
  const e = t.domain.concat([Ya, Za, je, et, at, tt, rt, ot, ce, kr, ca, st, ct, it, de, lt, na, nt]), a = [Ce, vr, le, zr, ca, ia, xr, jr, Na, Ha, oa, sa, Da, Oa, Ma, Ba, Ua, Va, Wa, Ka, Ga, Xa, Qa, Ja], r = [Ya, br, Za, et, at, tt, rt, ot, ce, oa, sa, ca, st, ct, it, ia, de, lt, na, nt], s = se(), i = m(s, na);
  $(i, r, i), $(i, t.domain, i);
  const l = se(), d = se(), n = se();
  $(s, t.domain, l), $(s, t.scheme, d), $(s, t.slashscheme, n), $(l, r, i), $(l, t.domain, l);
  const f = m(l, je);
  m(i, je, f), m(d, je, f), m(n, je, f);
  const h = m(i, le);
  $(h, r, i), $(h, t.domain, i);
  const p = se();
  $(f, t.domain, p), $(p, t.domain, p);
  const c = m(p, le);
  $(c, t.domain, p);
  const y = se(lo);
  $(c, t.tld, y), $(c, t.utld, y), m(f, da, y);
  const u = m(p, ce);
  m(u, ce, u), $(u, t.domain, p), $(y, t.domain, p), m(y, le, c), m(y, ce, u);
  const k = m(y, Ce);
  $(k, t.numeric, lo);
  const x = m(l, ce), E = m(l, le);
  m(x, ce, x), $(x, t.domain, l), $(E, r, i), $(E, t.domain, l);
  const w = se(va);
  $(E, t.tld, w), $(E, t.utld, w), $(w, t.domain, l), $(w, r, i), m(w, le, E), m(w, ce, x), m(w, je, f);
  const S = m(w, Ce), z = se(va);
  $(S, t.numeric, z);
  const g = se(va), o = se();
  $(g, e, g), $(g, a, o), $(o, e, g), $(o, a, o), m(w, de, g), m(z, de, g);
  const _ = m(d, Ce), b = m(n, Ce), T = m(b, de), j = m(T, de);
  $(d, t.domain, l), m(d, le, E), m(d, ce, x), $(n, t.domain, l), m(n, le, E), m(n, ce, x), $(_, t.domain, g), m(_, de, g), m(_, ia, g), $(j, t.domain, g), $(j, e, g), m(j, de, g);
  const F = [
    [oa, sa],
    // {}
    [Oa, Da],
    // []
    [Ma, Ba],
    // ()
    [Na, Ha],
    // <>
    [Ua, Va],
    // （）
    [Wa, Ka],
    // 「」
    [Ga, Xa],
    // 『』
    [Qa, Ja]
    // ＜＞
  ];
  for (let q = 0; q < F.length; q++) {
    const [A, O] = F[q], N = m(g, A);
    m(o, A, N), m(N, O, g);
    const K = se(va);
    $(N, e, K);
    const he = se();
    $(N, a), $(K, e, K), $(K, a, he), $(he, e, K), $(he, a, he), m(K, O, g), m(he, O, g);
  }
  return m(s, da, w), m(s, wr, I9), {
    start: s,
    tokens: Wo
  };
}
function O9(t, e, a) {
  let r = a.length, s = 0, i = [], l = [];
  for (; s < r; ) {
    let d = t, n = null, f = null, h = 0, p = null, c = -1;
    for (; s < r && !(n = d.go(a[s].t)); )
      l.push(a[s++]);
    for (; s < r && (f = n || d.go(a[s].t)); )
      n = null, d = f, d.accepts() ? (c = 0, p = d) : c >= 0 && c++, s++, h++;
    if (c < 0)
      s -= h, s < r && (l.push(a[s]), s++);
    else {
      l.length > 0 && (i.push(Pt(po, e, l)), l = []), s -= c, h -= c;
      const y = p.t, u = a.slice(s - h, s);
      i.push(Pt(y, e, u));
    }
  }
  return l.length > 0 && i.push(Pt(po, e, l)), i;
}
function Pt(t, e, a) {
  const r = a[0].s, s = a[a.length - 1].e, i = e.slice(r, s);
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
function D9() {
  Z.scanner = P9(Z.customSchemes);
  for (let t = 0; t < Z.tokenQueue.length; t++)
    Z.tokenQueue[t][1]({
      scanner: Z.scanner
    });
  Z.parser = q9(Z.scanner.tokens);
  for (let t = 0; t < Z.pluginQueue.length; t++)
    Z.pluginQueue[t][1]({
      scanner: Z.scanner,
      parser: Z.parser
    });
  return Z.initialized = !0, Z;
}
function Er(t) {
  return Z.initialized || D9(), O9(Z.parser.start, t, Ko(Z.scanner.start, t));
}
Er.scan = Ko;
function nS(t, e = null) {
  const a = Er(t);
  return a.length === 1 && a[0].isLink && (!e || a[0].t === e);
}
function Xo(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function M9(t) {
  return t.replace(/"/g, "&quot;");
}
function B9(t) {
  const e = [];
  for (const a in t) {
    let r = t[a] + "";
    e.push(`${a}="${M9(r)}"`);
  }
  return e.join(" ");
}
function N9({
  tagName: t,
  attributes: e,
  content: a
}) {
  return `<${t} ${B9(e)}>${Xo(a)}</${t}>`;
}
function Qo(t, e = {}) {
  e = new Cr(e, N9);
  const a = Er(t), r = [];
  for (let s = 0; s < a.length; s++) {
    const i = a[s];
    i.t === "nl" && e.get("nl2br") ? r.push(`<br>
`) : !i.isLink || !e.check(i) ? r.push(Xo(i.toString())) : r.push(e.render(i));
  }
  return r.join("");
}
String.prototype.linkify || Object.defineProperty(String.prototype, "linkify", {
  writable: !1,
  value: function(e) {
    return Qo(this, e);
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
    const { docmodel: a, docid: r, docattribute: s, threadid: i, project: l, skipCacheUpdateIfFound: d } = e;
    if (!a || !r || !s)
      return {};
    const n = await ze._Model.get(W.modelName), f = await (n == null ? void 0 : n.list({
      skipCacheUpdateIfFound: d,
      conditions: [
        ["docmodel_fk", "=", a],
        ["docid", "=", r],
        ["docattribute", "=", s],
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
      docattribute: s,
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
    if (!a || !r || !s)
      return;
    async function u(B) {
      try {
        const { threadid: ae, contentInput: Ue, recipientSelect: ve, deadlineSelect: Y, deadlineTime: ya, images: Ae, onDone: Le } = B;
        if (!Ue.value && (!Ae || Ae.length === 0)) {
          alert("Missing comment!");
          return;
        }
        if (Array.isArray(F) && j && !F.find((I) => I.id === j.id))
          throw new Error("You don't have permissions!");
        var te = null;
        ve && ve.value !== "none" && (te = ve.value);
        var C = null;
        if (Y && Y.value !== "none") {
          if (C = /* @__PURE__ */ new Date(), Y.value === "asap")
            C.setMinutes(C.getMinutes() + 10);
          else if (Y.value === "1h")
            C.setHours(C.getHours() + 1);
          else if (Y.value === "dayend")
            C.setHours(23, 59, 59);
          else if (Y.value === "24h")
            C.setDate(C.getDate() + 1);
          else if (Y.value === "weekend") {
            const I = C.getDay();
            I === 6 ? C.setDate(C.getDate() + 6) : C.setDate(C.getDate() - I + 5), C.setHours(23, 59, 59);
          } else if (Y.value === "monday-evening") {
            const I = C.getDay();
            I === 0 ? C.setDate(C.getDate() + 1) : I === 6 && C.setDate(C.getDate() + 2), C.setHours(23, 59, 59);
          } else if (Y.value === "1w")
            C.setDate(C.getDate() + 7);
          else if (Y.value === "monthend")
            C.setMonth(C.getMonth() + 1), C.setDate(0), C.setHours(23, 59, 59);
          else if (Y.value === "1m")
            C.setMonth(C.getMonth() + 1);
          else if (Y.value === "custom" && ya) {
            const I = new Date(ya.value);
            if (I < C) {
              alert("Wrong deadline!");
              return;
            }
            C = I;
          }
        }
        const Ve = Qo(
          t9(Ue.value || ""),
          { defaultProtocol: "https" }
        ).replaceAll(`
`, "<br/>");
        let ga = "";
        if (Ae && Ae.length > 0)
          for (const I of Ae) {
            const ne = await ze.uploader(I);
            if (ne && ne.base && ne.sd && ne.hd) {
              const _a = ne.base + ne.sd.substring(1), We = ne.base + ne.hd.substring(1);
              ga += `<img src="${_a}" data-hd="${We}" />`;
            }
          }
        const D = await ze._Model.get(W.modelName).then((I) => I == null ? void 0 : I.add({
          docmodel_fk: a,
          docid: r,
          docattribute: s,
          threadid: ae,
          content: (Ve ? `<p>${Ve}</p>` : "") + ga,
          repliedto: !1,
          read: !1,
          _publishingdate: /* @__PURE__ */ new Date(),
          ...l ? { project_fk: l } : {},
          ...C ? { deadline: C } : {},
          ...te ? { recipient: te } : {}
        }));
        Le && D && await Le(D._blitzID.value), A && D && (A[ae] || (A[ae] = []), A[ae].push(D), E(), await W.placeComments({ ...q, skipCacheUpdateIfFound: !0 }));
      } catch (ae) {
        alert("Error: " + ae.message);
      }
    }
    async function k() {
      for (const B in A)
        if (Array.isArray(A[B]))
          for (const te of A[B])
            te.recipient.value === j.id && te.read.value !== !0 && await te.edit("read", !0);
    }
    function x(B, te) {
      let C = null;
      for (const ae of Ar.children)
        if ((ae == null ? void 0 : ae.getAttribute("id")) === B) {
          C = ae, C.style.display = "block", C.style.marginTop = "0", C.style.marginBottom = "0", C.tagName === "PRE" && (C.innerText = ts(C.innerText));
          break;
        }
      return C ? `<div class="content ${te || ""}" style="border-radius: 4px; border: 2px dashed grey; user-select: none;">
                    <div style="padding: 8px; overflow: auto; max-height: 160px !important;">
                        ${C.outerHTML}
                    </div>
                </div>` : "";
    }
    function E(B) {
      var Fr, Pr;
      if (!A)
        throw new Error("Could not fetch comments!");
      let te = !1, C = [];
      const ae = document.getElementById("bdcomments-addform");
      ae && ae.remove();
      const Ue = document.getElementById("bdcomments-docs");
      Ue && Ue.remove();
      let ve = null;
      if (d && (N || !A[i]))
        ve = d;
      else if (!N && A[i]) {
        let v = null;
        if (j) {
          const R = [...A[i]];
          R.reverse(), v = R.find((M) => M._userID.value !== j.id && M.recipient.value === j.id && M.repliedto.value !== !0) ?? null, v || (v = R.find((M) => M._userID.value !== j.id) ?? null);
        }
        v ? ve = v._userID.value : d && (ve = d);
      }
      const Y = Object.keys(A);
      if (b.innerHTML = Y.length === 0 ? `
                <p style="color: grey; text-align: center;">No comments yet!</p>
            ` : Y.map((v) => {
        const R = A[v], M = N && he ? x(v, "mb-3") : "", U = N && Array.isArray(F) ? R.filter((P) => !!P.deadline.value && P.recipient.value === j.id && P.repliedto.value !== !0).length > 0 : !1;
        return `<div class="box" thread-id="${v}">
                    ${M}
                    ${R.map((P) => {
          var Rr, Ir;
          const V = P.deadline.value, J = F && P._userID.value ? (Rr = F.find((bt) => bt.id === P._userID.value)) == null ? void 0 : Rr.username : null, G = F && P.recipient.value ? (Ir = F.find((bt) => bt.id === P.recipient.value)) == null ? void 0 : Ir.username : null, X = J ? b9(J).toHex() : null, kt = X ? Jt(X, !0) : null, $e = ro(P.content.value), wt = h + "user/:id";
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
                                ${$e}
                            </div>
                        </div>`;
        }).join("")}
                    ${N ? `
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
        for (const v of b.children) {
          const R = v.getAttribute("thread-id"), M = v.querySelectorAll("#delete-btn");
          for (const [U, P] of M.entries())
            P.addEventListener("click", async () => {
              if (confirm("Are you sure?")) {
                const V = await ze._Model.get(W.modelName);
                if (U === 0) {
                  for (const J of M) {
                    const G = J.getAttribute("comment-id"), X = await (V == null ? void 0 : V.get(G));
                    await (X == null ? void 0 : X.delete());
                  }
                  delete A[R];
                } else {
                  const J = P.getAttribute("comment-id"), G = await (V == null ? void 0 : V.get(J));
                  await (G == null ? void 0 : G.delete()), A[R] = A[R].filter((X) => X._blitzID.value !== J);
                }
                E(), await W.placeComments({ ...q, skipCacheUpdateIfFound: !0 });
              }
            });
          if (N) {
            let U = null;
            if (j) {
              const G = [...A[R]];
              G.reverse(), U = ((Fr = G.find((X) => X._userID.value !== j.id && X.recipient.value === j.id && X.repliedto.value !== !0)) == null ? void 0 : Fr._userID.value) ?? null, U || (U = ((Pr = G.find((X) => X._userID.value !== j.id)) == null ? void 0 : Pr._userID.value) ?? null);
            }
            const P = v.querySelector("#content-input"), V = v.querySelector("#repliedto-input"), J = v.querySelector("#save-btn");
            J.onclick = () => u({
              threadid: R,
              contentInput: P,
              recipientSelect: { value: U ?? "none" },
              onDone: async (G) => {
                var X;
                if (j && V && ((X = V.querySelector("input")) != null && X.checked)) {
                  const kt = A[R].filter(($e) => $e._blitzID.value !== G && $e.recipient.value === j.id && $e.repliedto.value !== !0);
                  for (const $e of kt)
                    await $e.edit("repliedto", !0);
                }
              }
            }), P.onkeyup = (G) => G.key === "Enter" && J.onclick ? J.onclick({}) : void 0;
          }
        }
      const ya = !N && Array.isArray(F) && (A[i] ?? []).filter((v) => !!v.deadline.value && v.recipient.value === j.id && v.repliedto.value !== !0).length > 0, Ae = qr(/* @__PURE__ */ new Date(), !0), Le = /* @__PURE__ */ new Date(), Ve = Le.getDay();
      Le.setFullYear(Le.getFullYear() + 1);
      const ga = qr(Le, !0), D = document.createElement("div");
      D.id = "bdcomments-addform", D.className = "box mt-5", D.style.display = "flex", D.style.flexDirection = "column", D.style.gap = "12px", (n || f) && (D.style.marginBottom = "18px"), D.innerHTML = `
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
                        style="resize: vertical; min-height: fit-content;">${B ? B.replace(/\"/g, "&quot;") : ""}</textarea>
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
                                ${Ve === 0 || Ve === 6 ? '<option value="monday-evening">Monday evening</option>' : ""}
                                <option value="1w">1 week</option>
                                <option value="monthend">End of the month</option>
                                <option value="1m">1 month</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                        <input id="deadline-time" class="input" type="datetime-local" value="${ga}" min="${Ae}"
                            style="display: none;" />
                    </div>
                </div>
                ${Array.isArray(F) ? `<div style="display: flex; gap: 0 8px; flex-wrap: wrap;">
                    <label for="recipient-select" style="line-height: 40px;">Recipient</label>
                    <div class="select" style="flex: 1;">
                        <select id="recipient-select" style="width: 100%;">
                            <option value="none">None</option>
                            ${F.map((v) => `<option value="${v.id}" ${ve == v.id ? 'selected="true"' : ""}>
                                ${v.username}
                            </option>`)}
                        </select>
                    </div>
                </div>` : ""}
                ${ya ? `<label id="repliedto-input" class="checkbox">
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
      const I = D.querySelector("#content-input"), ne = D.querySelector("#recipient-select"), _a = D.querySelector("#repliedto-input"), We = D.querySelector("#deadline-select"), _t = D.querySelector("#deadline-time"), ut = D.querySelector("#save-btn"), Jo = D.querySelector("#images-upload-btn"), Lr = D.querySelector("#images-preview"), Yo = D.querySelectorAll("#emoji-quick-btns button"), $r = D.querySelector("#emoji-btn");
      let Ke = null;
      const Zo = () => {
        if (Ke)
          return Ke;
        try {
          Ke = Ni({ showPreview: !1 }, { referenceElement: $r, position: "left", className: "emoji-picker" }), Ke.addEventListener("emoji:select", (v) => {
            if (!I)
              return;
            const R = I.selectionStart ?? 0, M = I.value.substring(0, R), U = I.value.substring(R, I.value.length);
            I.value = M + v.emoji + U, I.onchange && I.onchange({ target: I });
          });
        } catch (v) {
          console.warn("BDComments: emoji picker unavailable —", (v == null ? void 0 : v.message) ?? v);
        }
        return Ke;
      }, mt = () => {
        Lr.innerHTML = "", C.forEach((v, R) => {
          const M = document.createElement("div");
          M.style.position = "relative";
          const U = document.createElement("div");
          U.style.cssText = `width: 40px; height: 40px; background-image: url('${v.preview}'); background-size: cover; background-position: center; border-radius: 4px; border: 1px solid #dbdbdb;`;
          const P = document.createElement("div");
          P.className = "has-background-danger is-clickable", P.style.cssText = "position: absolute; top: -6px; right: -6px; border-radius: 50%; display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; z-index: 1;", P.innerHTML = '<span class="blitzicon icon" style="font-size: 0.8rem;">&#xe800;</span>', P.onclick = (V) => {
            V.stopPropagation(), C.splice(R, 1), mt();
          }, M.appendChild(U), M.appendChild(P), Lr.appendChild(M);
        });
      }, Tr = async (v) => {
        if (te)
          return;
        te = !0, ut.classList.add("is-loading");
        const R = i || self.crypto.randomUUID();
        await u({
          threadid: R,
          contentInput: v ? { value: v } : I,
          recipientSelect: ne,
          deadlineSelect: We,
          deadlineTime: _t,
          images: C.map((M) => M.file),
          onDone: async (M) => {
            var U;
            if (j && _a && ((U = _a.querySelector("input")) != null && U.checked)) {
              const P = A[R].filter((V) => V._blitzID.value !== M && V.recipient.value === j.id && V.repliedto.value !== !0);
              for (const V of P)
                await V.edit("repliedto", !0);
            }
            localStorage.removeItem(K);
          }
        }), te = !1, ut.classList.remove("is-loading");
      };
      ut.onclick = () => Tr(), I.onchange = (v) => {
        localStorage.setItem(K, v.target.value);
      }, I.onpaste = (v) => {
        var M;
        const R = ((M = v.clipboardData) == null ? void 0 : M.items) ?? [];
        for (const U of R)
          if (U.kind === "file" && U.type.startsWith("image/")) {
            const P = U.getAsFile();
            if (P) {
              v.preventDefault(), C.push({ file: P, preview: URL.createObjectURL(P) }), mt();
              break;
            }
          }
      }, We && _t && (We.onchange = (v) => _t.style.display = v.target.value === "custom" ? "block" : "none"), $r.onclick = () => {
        var v;
        try {
          (v = Zo()) == null || v.toggle();
        } catch (R) {
          console.warn("BDComments: emoji picker unavailable —", (R == null ? void 0 : R.message) ?? R);
        }
      };
      for (const v of Yo)
        v.addEventListener("click", () => Tr(v.innerHTML));
      if (Jo.onclick = async () => {
        const v = await rs(!0);
        C.push(
          ...(v ?? []).map((R) => ({
            file: R,
            preview: URL.createObjectURL(R)
          }))
        ), mt();
      }, b.after(D), n || f) {
        const v = document.createElement("div");
        v.id = "bdcomments-docs", v.style.display = "flex", v.style.justifyContent = "center", v.style.gap = "8px", v.innerHTML = (n ? `<a target="_blank" href="${n}" class="has-text-link"><span class="blitzicon">&#xe90f;</span> User documentation</a>` : "") + (f ? `<a target="_blank" href="${f}" class="has-text-link"><span class="blitzicon">&#xe910;</span> Tech documentation</a>` : ""), D.after(v);
      }
    }
    const w = document.createElement("div");
    w.className = W.modalClass, w.style.position = "fixed", w.style.top = "0", w.style.left = "0", w.style.width = "100%", w.style.height = "100%", w.style.zIndex = "100", w.style.backgroundColor = "rgba(0, 0, 0, 0.7)", w.style.display = "flex", w.style.justifyContent = "center", w.style.alignItems = "center", w.style.padding = "16px", w.style.boxSizing = "border-box";
    const S = document.createElement("div");
    S.style.position = "relative", S.style.width = "500px", S.style.maxHeight = "100%", S.style.backgroundColor = "#ffffff", S.style.color = "#000000", S.style.borderRadius = "8px", S.style.padding = "24px", S.style.overflow = "auto", S.style.boxSizing = "inherit", S.style.display = "flex", S.style.flexDirection = "column", S.onclick = (B) => B.stopPropagation();
    const z = document.createElement("style");
    z.innerHTML = `
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
        `, S.innerHTML = `
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
    const g = S.querySelector("#close-btn"), o = S.querySelector("#resource-link"), _ = S.querySelector("#block-preview"), b = S.querySelector("#comments-list"), T = () => {
      w.remove(), c && c();
    };
    w.onclick = T, g.onclick = T, w.append(z), w.append(S), document.body.append(w);
    const j = await ze.getCurrentUser(), F = l ? await ze.listProjectUsers(l) : null, q = { docmodel: a, docid: r, docattribute: s, project: l, defaultRecipient: d, onOpen: p }, A = await W.getComments({ ...q, threadid: i }), O = await ze._Model.get(a).then((B) => B == null ? void 0 : B.get(r)), N = !i, K = `BDCOMMENTS_LAST_${r}` + (i ? `_${i}` : ""), he = O == null ? void 0 : O[s].value, Sr = !N && i.length === 10 && !!he, Ar = document.createElement("div");
    if (Ar.innerHTML = he || "", Sr && (_.innerHTML = x(i)), O && y) {
      const B = await y(O);
      B && (o.className = "has-text-centered" + (Sr ? " mb-4" : ""), o.innerHTML = `<a target="_blank" href="${B.path}" class="has-text-link">
                    <span class="blitzicon">&#xe80b;</span> ${B.label}
                </a>`);
    }
    try {
      E(localStorage.getItem(K)), k();
    } catch (B) {
      B.stack && console.error(B.stack), b.innerHTML = `<p style="color: red; text-align: center;"><b>Error:</b> ${B.message}</p>`;
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
      const r = await W.getComments(e), s = await ze.getCurrentUser(), i = a.querySelectorAll(".bdcomments-button");
      for (const f of i)
        f.remove();
      const l = /^<p>:[a-z0-9_+-]+:<\/p>$/, d = a.getAttribute("data-readonly") === "true", n = a.querySelectorAll(".ce-block");
      for (const f of n) {
        const h = f.querySelector(".ce-block__content"), p = f.getAttribute("data-id");
        if (h && p) {
          const c = r[p] ?? [], y = c.length > 0, u = y && l.test(c[0].content.value), k = document.createElement("div");
          if (!y && d)
            f.addEventListener("mouseenter", () => k.style.display = "flex"), f.addEventListener("mouseleave", () => k.style.display = "none");
          else if (!y)
            continue;
          const x = c.every((w) => w.recipient.value !== s.id || w.read.value === !0 && (!w.deadline.value || w.repliedto.value === !0)), E = c.some((w) => w.recipient.value === s.id && w.read.value === !0 && !!w.deadline.value && w.repliedto.value !== !0);
          k.className = "bdcomments-button ce-toolbar__settings-btn", k.style.cssText = "position: absolute; top: 5px; right: -22px; margin-left: 0px; z-index: 100; cursor: pointer;", k.style.display = y ? "flex" : "none", k.innerHTML = `
                        ${u ? ro(c[0].content.value) : `<svg width="24px" height="24px" fill="none" viewBox="0 -0.5 25 25" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M5.5 12C5.49988 14.613 6.95512 17.0085 9.2741 18.2127C11.5931 19.4169 14.3897 19.2292 16.527 17.726L19.5 18V12C19.5 8.13401 16.366 5 12.5 5C8.63401 5 5.5 8.13401 5.5 12Z" />
                            <path fill="#000000" d="M9.5 13.25C9.08579 13.25 8.75 13.5858 8.75 14C8.75 14.4142 9.08579 14.75 9.5 14.75V13.25ZM13.5 14.75C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25V14.75ZM9.5 10.25C9.08579 10.25 8.75 10.5858 8.75 11C8.75 11.4142 9.08579 11.75 9.5 11.75V10.25ZM15.5 11.75C15.9142 11.75 16.25 11.4142 16.25 11C16.25 10.5858 15.9142 10.25 15.5 10.25V11.75ZM9.5 14.75H13.5V13.25H9.5V14.75ZM9.5 11.75H15.5V10.25H9.5V11.75Z" />
                        </svg>`}
                        ${y && (!u || c.length > 1) ? `
                            <span style="position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; text-align: center; border-radius: 50%; font-size: 8px; color: white; background-color: ${x ? "black" : E ? "orange" : "red"};">
                                ${c.length}
                            </span>
                        ` : ""}
                    `, k.onclick = () => {
            e.onOpen ? e.onOpen({ ...e, threadid: p }) : W.showComments({ ...e, threadid: p });
          }, h.prepend(k);
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
const lS = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cr
}, Symbol.toStringTag, { value: "Module" }));
export {
  cr as B,
  Cr as O,
  nS as a,
  ha as b,
  ro as c,
  ts as d,
  V9 as e,
  lS as f,
  Hi as g,
  Er as t,
  t9 as u
};
