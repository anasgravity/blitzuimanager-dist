var ec = Object.defineProperty;
var tc = (n, e, t) => e in n ? ec(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var Re = (n, e, t) => (tc(n, typeof e != "symbol" ? e + "" : e, t), t);
import { b as It, B as Kr, c as oc } from "./index-33fa59fe.js";
import { d as nc, e as ic, B as Zr, O as rc, t as sc, a as hr, g as ac, b as lc, c as cc, u as dc } from "./BDComments-2c5df530.js";
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".ce-hint--align-start{text-align:left}.ce-hint--align-center{text-align:center}.ce-hint__description{opacity:.6;margin-top:3px}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
var jt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Eo(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function uc(n) {
  if (n.__esModule)
    return n;
  var e = n.default;
  if (typeof e == "function") {
    var t = function o() {
      return this instanceof o ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(n).forEach(function(o) {
    var i = Object.getOwnPropertyDescriptor(n, o);
    Object.defineProperty(t, o, i.get ? i : {
      enumerable: !0,
      get: function() {
        return n[o];
      }
    });
  }), t;
}
function Xo() {
}
Object.assign(Xo, {
  default: Xo,
  register: Xo,
  revert: function() {
  },
  __esModule: !0
});
Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(n) {
  const e = (this.document || this.ownerDocument).querySelectorAll(n);
  let t = e.length;
  for (; --t >= 0 && e.item(t) !== this; )
    ;
  return t > -1;
});
Element.prototype.closest || (Element.prototype.closest = function(n) {
  let e = this;
  if (!document.documentElement.contains(e))
    return null;
  do {
    if (e.matches(n))
      return e;
    e = e.parentElement || e.parentNode;
  } while (e !== null);
  return null;
});
Element.prototype.prepend || (Element.prototype.prepend = function(n) {
  const e = document.createDocumentFragment();
  Array.isArray(n) || (n = [n]), n.forEach((t) => {
    const o = t instanceof Node;
    e.appendChild(o ? t : document.createTextNode(t));
  }), this.insertBefore(e, this.firstChild);
});
Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function(n) {
  n = arguments.length === 0 ? !0 : !!n;
  const e = this.parentNode, t = window.getComputedStyle(e, null), o = parseInt(t.getPropertyValue("border-top-width")), i = parseInt(t.getPropertyValue("border-left-width")), r = this.offsetTop - e.offsetTop < e.scrollTop, s = this.offsetTop - e.offsetTop + this.clientHeight - o > e.scrollTop + e.clientHeight, a = this.offsetLeft - e.offsetLeft < e.scrollLeft, l = this.offsetLeft - e.offsetLeft + this.clientWidth - i > e.scrollLeft + e.clientWidth, c = r && !s;
  (r || s) && n && (e.scrollTop = this.offsetTop - e.offsetTop - e.clientHeight / 2 - o + this.clientHeight / 2), (a || l) && n && (e.scrollLeft = this.offsetLeft - e.offsetLeft - e.clientWidth / 2 - i + this.clientWidth / 2), (r || s || a || l) && !n && this.scrollIntoView(c);
});
window.requestIdleCallback = window.requestIdleCallback || function(n) {
  const e = Date.now();
  return setTimeout(function() {
    n({
      didTimeout: !1,
      timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - e));
      }
    });
  }, 1);
};
window.cancelIdleCallback = window.cancelIdleCallback || function(n) {
  clearTimeout(n);
};
let hc = (n = 21) => crypto.getRandomValues(new Uint8Array(n)).reduce((e, t) => (t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e), "");
var Gr = /* @__PURE__ */ ((n) => (n.VERBOSE = "VERBOSE", n.INFO = "INFO", n.WARN = "WARN", n.ERROR = "ERROR", n))(Gr || {});
const j = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91,
  SLASH: 191
}, pc = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
function Kt(n, e, t = "log", o, i = "color: inherit") {
  if (!("console" in window) || !window.console[t])
    return;
  const r = ["info", "log", "warn", "error"].includes(t), s = [];
  switch (Kt.logLevel) {
    case "ERROR":
      if (t !== "error")
        return;
      break;
    case "WARN":
      if (!["error", "warn"].includes(t))
        return;
      break;
    case "INFO":
      if (!r || n)
        return;
      break;
  }
  o && s.push(o);
  const a = "Editor.js 2.31.0", l = `line-height: 1em;
            color: #006FEA;
            display: inline-block;
            font-size: 11px;
            line-height: 1em;
            background-color: #fff;
            padding: 4px 9px;
            border-radius: 30px;
            border: 1px solid rgba(56, 138, 229, 0.16);
            margin: 4px 5px 4px 0;`;
  n && (r ? (s.unshift(l, i), e = `%c${a}%c ${e}`) : e = `( ${a} )${e}`);
  try {
    r ? o ? console[t](`${e} %o`, ...s) : console[t](e, ...s) : console[t](e);
  } catch {
  }
}
Kt.logLevel = "VERBOSE";
function fc(n) {
  Kt.logLevel = n;
}
const X = Kt.bind(window, !1), Ie = Kt.bind(window, !0);
function it(n) {
  return Object.prototype.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function oe(n) {
  return it(n) === "function" || it(n) === "asyncfunction";
}
function ce(n) {
  return it(n) === "object";
}
function ze(n) {
  return it(n) === "string";
}
function gc(n) {
  return it(n) === "boolean";
}
function pr(n) {
  return it(n) === "number";
}
function fr(n) {
  return it(n) === "undefined";
}
function Oe(n) {
  return n ? Object.keys(n).length === 0 && n.constructor === Object : !0;
}
function Jr(n) {
  return n > 47 && n < 58 || // number keys
  n === 32 || n === 13 || // Space bar & return key(s)
  n === 229 || // processing key input for certain languages — Chinese, Japanese, etc.
  n > 64 && n < 91 || // letter keys
  n > 95 && n < 112 || // Numpad keys
  n > 185 && n < 193 || // ;=,-./` (in order)
  n > 218 && n < 223;
}
async function mc(n, e = () => {
}, t = () => {
}) {
  async function o(i, r, s) {
    try {
      await i.function(i.data), await r(fr(i.data) ? {} : i.data);
    } catch {
      s(fr(i.data) ? {} : i.data);
    }
  }
  return n.reduce(async (i, r) => (await i, o(r, e, t)), Promise.resolve());
}
function Qr(n) {
  return Array.prototype.slice.call(n);
}
function co(n, e) {
  return function() {
    const t = this, o = arguments;
    window.setTimeout(() => n.apply(t, o), e);
  };
}
function vc(n) {
  return n.name.split(".").pop();
}
function bc(n) {
  return /^[-\w]+\/([-+\w]+|\*)$/.test(n);
}
function gr(n, e, t) {
  let o;
  return (...i) => {
    const r = this, s = () => {
      o = null, t || n.apply(r, i);
    }, a = t && !o;
    window.clearTimeout(o), o = window.setTimeout(s, e), a && n.apply(r, i);
  };
}
function rn(n, e, t = void 0) {
  let o, i, r, s = null, a = 0;
  t || (t = {});
  const l = function() {
    a = t.leading === !1 ? 0 : Date.now(), s = null, r = n.apply(o, i), s || (o = i = null);
  };
  return function() {
    const c = Date.now();
    !a && t.leading === !1 && (a = c);
    const d = e - (c - a);
    return o = this, i = arguments, d <= 0 || d > e ? (s && (clearTimeout(s), s = null), a = c, r = n.apply(o, i), s || (o = i = null)) : !s && t.trailing !== !1 && (s = setTimeout(l, d)), r;
  };
}
function yc() {
  const n = {
    win: !1,
    mac: !1,
    x11: !1,
    linux: !1
  }, e = Object.keys(n).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e && (n[e] = !0), n;
}
function uo(n) {
  return n[0].toUpperCase() + n.slice(1);
}
function sn(n, ...e) {
  if (!e.length)
    return n;
  const t = e.shift();
  if (ce(n) && ce(t))
    for (const o in t)
      ce(t[o]) ? (n[o] || Object.assign(n, { [o]: {} }), sn(n[o], t[o])) : Object.assign(n, { [o]: t[o] });
  return sn(n, ...e);
}
function bn(n) {
  const e = yc();
  return n = n.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, " + "), e.mac ? n = n.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : n = n.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), n;
}
function wc(n) {
  try {
    return new URL(n).href;
  } catch {
  }
  return n.substring(0, 2) === "//" ? window.location.protocol + n : window.location.origin + n;
}
function kc() {
  return hc(10);
}
function xc(n) {
  window.open(n, "_blank");
}
function Cc(n = "") {
  return `${n}${Math.floor(Math.random() * 1e8).toString(16)}`;
}
function an(n, e, t) {
  const o = `«${e}» is deprecated and will be removed in the next major release. Please use the «${t}» instead.`;
  n && Ie(o, "warn");
}
function Et(n, e, t) {
  const o = t.value ? "value" : "get", i = t[o], r = `#${e}Cache`;
  if (t[o] = function(...s) {
    return this[r] === void 0 && (this[r] = i.apply(this, ...s)), this[r];
  }, o === "get" && t.set) {
    const s = t.set;
    t.set = function(a) {
      delete n[r], s.apply(this, a);
    };
  }
  return t;
}
const es = 650;
function Tt() {
  return window.matchMedia(`(max-width: ${es}px)`).matches;
}
const ln = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function Ec(n, e) {
  const t = Array.isArray(n) || ce(n), o = Array.isArray(e) || ce(e);
  return t || o ? JSON.stringify(n) === JSON.stringify(e) : n === e;
}
let k = class me {
  /**
   * Check if passed tag has no closed tag
   *
   * @param {HTMLElement} tag - element to check
   * @returns {boolean}
   */
  static isSingleTag(e) {
    return e.tagName && [
      "AREA",
      "BASE",
      "BR",
      "COL",
      "COMMAND",
      "EMBED",
      "HR",
      "IMG",
      "INPUT",
      "KEYGEN",
      "LINK",
      "META",
      "PARAM",
      "SOURCE",
      "TRACK",
      "WBR"
    ].includes(e.tagName);
  }
  /**
   * Check if element is BR or WBR
   *
   * @param {HTMLElement} element - element to check
   * @returns {boolean}
   */
  static isLineBreakTag(e) {
    return e && e.tagName && [
      "BR",
      "WBR"
    ].includes(e.tagName);
  }
  /**
   * Helper for making Elements with class name and attributes
   *
   * @param  {string} tagName - new Element tag name
   * @param  {string[]|string} [classNames] - list or name of CSS class name(s)
   * @param  {object} [attributes] - any attributes
   * @returns {HTMLElement}
   */
  static make(e, t = null, o = {}) {
    const i = document.createElement(e);
    if (Array.isArray(t)) {
      const r = t.filter((s) => s !== void 0);
      i.classList.add(...r);
    } else
      t && i.classList.add(t);
    for (const r in o)
      Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o[r]);
    return i;
  }
  /**
   * Creates Text Node with the passed content
   *
   * @param {string} content - text content
   * @returns {Text}
   */
  static text(e) {
    return document.createTextNode(e);
  }
  /**
   * Append one or several elements to the parent
   *
   * @param  {Element|DocumentFragment} parent - where to append
   * @param  {Element|Element[]|DocumentFragment|Text|Text[]} elements - element or elements list
   */
  static append(e, t) {
    Array.isArray(t) ? t.forEach((o) => e.appendChild(o)) : e.appendChild(t);
  }
  /**
   * Append element or a couple to the beginning of the parent elements
   *
   * @param {Element} parent - where to append
   * @param {Element|Element[]} elements - element or elements list
   */
  static prepend(e, t) {
    Array.isArray(t) ? (t = t.reverse(), t.forEach((o) => e.prepend(o))) : e.prepend(t);
  }
  /**
   * Swap two elements in parent
   *
   * @param {HTMLElement} el1 - from
   * @param {HTMLElement} el2 - to
   * @deprecated
   */
  static swap(e, t) {
    const o = document.createElement("div"), i = e.parentNode;
    i.insertBefore(o, e), i.insertBefore(e, t), i.insertBefore(t, o), i.removeChild(o);
  }
  /**
   * Selector Decorator
   *
   * Returns first match
   *
   * @param {Element} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {Element}
   */
  static find(e = document, t) {
    return e.querySelector(t);
  }
  /**
   * Get Element by Id
   *
   * @param {string} id - id to find
   * @returns {HTMLElement | null}
   */
  static get(e) {
    return document.getElementById(e);
  }
  /**
   * Selector Decorator.
   *
   * Returns all matches
   *
   * @param {Element|Document} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {NodeList}
   */
  static findAll(e = document, t) {
    return e.querySelectorAll(t);
  }
  /**
   * Returns CSS selector for all text inputs
   */
  static get allInputsSelector() {
    return "[contenteditable=true], textarea, input:not([type]), " + ["text", "password", "email", "number", "search", "tel", "url"].map((e) => `input[type="${e}"]`).join(", ");
  }
  /**
   * Find all contenteditable, textarea and editable input elements passed holder contains
   *
   * @param holder - element where to find inputs
   */
  static findAllInputs(e) {
    return Qr(e.querySelectorAll(me.allInputsSelector)).reduce((t, o) => me.isNativeInput(o) || me.containsOnlyInlineElements(o) ? [...t, o] : [...t, ...me.getDeepestBlockElements(o)], []);
  }
  /**
   * Search for deepest node which is Leaf.
   * Leaf is the vertex that doesn't have any child nodes
   *
   * @description Method recursively goes throw the all Node until it finds the Leaf
   * @param {Node} node - root Node. From this vertex we start Deep-first search
   *                      {@link https://en.wikipedia.org/wiki/Depth-first_search}
   * @param {boolean} [atLast] - find last text node
   * @returns - it can be text Node or Element Node, so that caret will able to work with it
   *            Can return null if node is Document or DocumentFragment, or node is not attached to the DOM
   */
  static getDeepestNode(e, t = !1) {
    const o = t ? "lastChild" : "firstChild", i = t ? "previousSibling" : "nextSibling";
    if (e && e.nodeType === Node.ELEMENT_NODE && e[o]) {
      let r = e[o];
      if (me.isSingleTag(r) && !me.isNativeInput(r) && !me.isLineBreakTag(r))
        if (r[i])
          r = r[i];
        else if (r.parentNode[i])
          r = r.parentNode[i];
        else
          return r.parentNode;
      return this.getDeepestNode(r, t);
    }
    return e;
  }
  /**
   * Check if object is DOM node
   *
   * @param {*} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isElement(e) {
    return pr(e) ? !1 : e && e.nodeType && e.nodeType === Node.ELEMENT_NODE;
  }
  /**
   * Check if object is DocumentFragment node
   *
   * @param {object} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isFragment(e) {
    return pr(e) ? !1 : e && e.nodeType && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  /**
   * Check if passed element is contenteditable
   *
   * @param {HTMLElement} element - html element to check
   * @returns {boolean}
   */
  static isContentEditable(e) {
    return e.contentEditable === "true";
  }
  /**
   * Checks target if it is native input
   *
   * @param {*} target - HTML element or string
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isNativeInput(e) {
    const t = [
      "INPUT",
      "TEXTAREA"
    ];
    return e && e.tagName ? t.includes(e.tagName) : !1;
  }
  /**
   * Checks if we can set caret
   *
   * @param {HTMLElement} target - target to check
   * @returns {boolean}
   */
  static canSetCaret(e) {
    let t = !0;
    if (me.isNativeInput(e))
      switch (e.type) {
        case "file":
        case "checkbox":
        case "radio":
        case "hidden":
        case "submit":
        case "button":
        case "image":
        case "reset":
          t = !1;
          break;
      }
    else
      t = me.isContentEditable(e);
    return t;
  }
  /**
   * Checks node if it is empty
   *
   * @description Method checks simple Node without any childs for emptiness
   * If you have Node with 2 or more children id depth, you better use {@link Dom#isEmpty} method
   * @param {Node} node - node to check
   * @param {string} [ignoreChars] - char or substring to treat as empty
   * @returns {boolean} true if it is empty
   */
  static isNodeEmpty(e, t) {
    let o;
    return this.isSingleTag(e) && !this.isLineBreakTag(e) ? !1 : (this.isElement(e) && this.isNativeInput(e) ? o = e.value : o = e.textContent.replace("​", ""), t && (o = o.replace(new RegExp(t, "g"), "")), o.length === 0);
  }
  /**
   * checks node if it is doesn't have any child nodes
   *
   * @param {Node} node - node to check
   * @returns {boolean}
   */
  static isLeaf(e) {
    return e ? e.childNodes.length === 0 : !1;
  }
  /**
   * breadth-first search (BFS)
   * {@link https://en.wikipedia.org/wiki/Breadth-first_search}
   *
   * @description Pushes to stack all DOM leafs and checks for emptiness
   * @param {Node} node - node to check
   * @param {string} [ignoreChars] - char or substring to treat as empty
   * @returns {boolean}
   */
  static isEmpty(e, t) {
    const o = [e];
    for (; o.length > 0; )
      if (e = o.shift(), !!e) {
        if (this.isLeaf(e) && !this.isNodeEmpty(e, t))
          return !1;
        e.childNodes && o.push(...Array.from(e.childNodes));
      }
    return !0;
  }
  /**
   * Check if string contains html elements
   *
   * @param {string} str - string to check
   * @returns {boolean}
   */
  static isHTMLString(e) {
    const t = me.make("div");
    return t.innerHTML = e, t.childElementCount > 0;
  }
  /**
   * Return length of node`s text content
   *
   * @param {Node} node - node with content
   * @returns {number}
   */
  static getContentLength(e) {
    return me.isNativeInput(e) ? e.value.length : e.nodeType === Node.TEXT_NODE ? e.length : e.textContent.length;
  }
  /**
   * Return array of names of block html elements
   *
   * @returns {string[]}
   */
  static get blockElements() {
    return [
      "address",
      "article",
      "aside",
      "blockquote",
      "canvas",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "li",
      "main",
      "nav",
      "noscript",
      "ol",
      "output",
      "p",
      "pre",
      "ruby",
      "section",
      "table",
      "tbody",
      "thead",
      "tr",
      "tfoot",
      "ul",
      "video"
    ];
  }
  /**
   * Check if passed content includes only inline elements
   *
   * @param {string|HTMLElement} data - element or html string
   * @returns {boolean}
   */
  static containsOnlyInlineElements(e) {
    let t;
    ze(e) ? (t = document.createElement("div"), t.innerHTML = e) : t = e;
    const o = (i) => !me.blockElements.includes(i.tagName.toLowerCase()) && Array.from(i.children).every(o);
    return Array.from(t.children).every(o);
  }
  /**
   * Find and return all block elements in the passed parent (including subtree)
   *
   * @param {HTMLElement} parent - root element
   * @returns {HTMLElement[]}
   */
  static getDeepestBlockElements(e) {
    return me.containsOnlyInlineElements(e) ? [e] : Array.from(e.children).reduce((t, o) => [...t, ...me.getDeepestBlockElements(o)], []);
  }
  /**
   * Helper for get holder from {string} or return HTMLElement
   *
   * @param {string | HTMLElement} element - holder's id or holder's HTML Element
   * @returns {HTMLElement}
   */
  static getHolder(e) {
    return ze(e) ? document.getElementById(e) : e;
  }
  /**
   * Returns true if element is anchor (is A tag)
   *
   * @param {Element} element - element to check
   * @returns {boolean}
   */
  static isAnchor(e) {
    return e.tagName.toLowerCase() === "a";
  }
  /**
   * Return element's offset related to the document
   *
   * @todo handle case when editor initialized in scrollable popup
   * @param el - element to compute offset
   */
  static offset(e) {
    const t = e.getBoundingClientRect(), o = window.pageXOffset || document.documentElement.scrollLeft, i = window.pageYOffset || document.documentElement.scrollTop, r = t.top + i, s = t.left + o;
    return {
      top: r,
      left: s,
      bottom: r + t.height,
      right: s + t.width
    };
  }
  /**
   * Find text node and offset by total content offset
   *
   * @param {Node} root - root node to start search from
   * @param {number} totalOffset - offset relative to the root node content
   * @returns {{node: Node | null, offset: number}} - node and offset inside node
   */
  static getNodeByOffset(e, t) {
    let o = 0, i = null;
    const r = document.createTreeWalker(
      e,
      NodeFilter.SHOW_TEXT,
      null
    );
    let s = r.nextNode();
    for (; s; ) {
      const c = s.textContent, d = c === null ? 0 : c.length;
      if (i = s, o + d >= t)
        break;
      o += d, s = r.nextNode();
    }
    if (!i)
      return {
        node: null,
        offset: 0
      };
    const a = i.textContent;
    if (a === null || a.length === 0)
      return {
        node: null,
        offset: 0
      };
    const l = Math.min(t - o, a.length);
    return {
      node: i,
      offset: l
    };
  }
};
function Tc(n) {
  return !/[^\t\n\r ]/.test(n);
}
function Sc(n) {
  const e = window.getComputedStyle(n), t = parseFloat(e.fontSize), o = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), r = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, l = (o - t) / 2;
  return s + r + i + l + a;
}
function ts(n) {
  n.dataset.empty = k.isEmpty(n) ? "true" : "false";
}
const Bc = {
  blockTunes: {
    toggler: {
      "Click to tune": "",
      "or drag to move": ""
    }
  },
  inlineToolbar: {
    converter: {
      "Convert to": ""
    }
  },
  toolbar: {
    toolbox: {
      Add: ""
    }
  },
  popover: {
    Filter: "",
    "Nothing found": "",
    "Convert to": ""
  }
}, Ic = {
  Text: "",
  Link: "",
  Bold: "",
  Italic: ""
}, Lc = {
  link: {
    "Add a link": ""
  },
  stub: {
    "The block can not be displayed correctly.": ""
  }
}, Oc = {
  delete: {
    Delete: "",
    "Click to delete": ""
  },
  moveUp: {
    "Move up": ""
  },
  moveDown: {
    "Move down": ""
  }
}, os = {
  ui: Bc,
  toolNames: Ic,
  tools: Lc,
  blockTunes: Oc
}, ns = class mt {
  /**
   * Type-safe translation for internal UI texts:
   * Perform translation of the string by namespace and a key
   *
   * @example I18n.ui(I18nInternalNS.ui.blockTunes.toggler, 'Click to tune')
   * @param internalNamespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static ui(e, t) {
    return mt._t(e, t);
  }
  /**
   * Translate for external strings that is not presented in default dictionary.
   * For example, for user-specified tool names
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static t(e, t) {
    return mt._t(e, t);
  }
  /**
   * Adjust module for using external dictionary
   *
   * @param dictionary - new messages list to override default
   */
  static setDictionary(e) {
    mt.currentDictionary = e;
  }
  /**
   * Perform translation both for internal and external namespaces
   * If there is no translation found, returns passed key as a translated message
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static _t(e, t) {
    const o = mt.getNamespace(e);
    return !o || !o[t] ? t : o[t];
  }
  /**
   * Find messages section by namespace path
   *
   * @param namespace - path to section
   */
  static getNamespace(e) {
    return e.split(".").reduce((t, o) => !t || !Object.keys(t).length ? {} : t[o], mt.currentDictionary);
  }
};
ns.currentDictionary = os;
let ve = ns;
class is extends Error {
}
class Zt {
  constructor() {
    this.subscribers = {};
  }
  /**
   * Subscribe any event on callback
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  on(e, t) {
    e in this.subscribers || (this.subscribers[e] = []), this.subscribers[e].push(t);
  }
  /**
   * Subscribe any event on callback. Callback will be called once and be removed from subscribers array after call.
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  once(e, t) {
    e in this.subscribers || (this.subscribers[e] = []);
    const o = (i) => {
      const r = t(i), s = this.subscribers[e].indexOf(o);
      return s !== -1 && this.subscribers[e].splice(s, 1), r;
    };
    this.subscribers[e].push(o);
  }
  /**
   * Emit callbacks with passed data
   *
   * @param eventName - event name
   * @param data - subscribers get this data when they were fired
   */
  emit(e, t) {
    Oe(this.subscribers) || !this.subscribers[e] || this.subscribers[e].reduce((o, i) => {
      const r = i(o);
      return r !== void 0 ? r : o;
    }, t);
  }
  /**
   * Unsubscribe callback from event
   *
   * @param eventName - event name
   * @param callback - event handler
   */
  off(e, t) {
    if (this.subscribers[e] === void 0) {
      console.warn(`EventDispatcher .off(): there is no subscribers for event "${e.toString()}". Probably, .off() called before .on()`);
      return;
    }
    for (let o = 0; o < this.subscribers[e].length; o++)
      if (this.subscribers[e][o] === t) {
        delete this.subscribers[e][o];
        break;
      }
  }
  /**
   * Destroyer
   * clears subscribers list
   */
  destroy() {
    this.subscribers = {};
  }
}
function He(n) {
  Object.setPrototypeOf(this, {
    /**
     * Block id
     *
     * @returns {string}
     */
    get id() {
      return n.id;
    },
    /**
     * Tool name
     *
     * @returns {string}
     */
    get name() {
      return n.name;
    },
    /**
     * Tool config passed on Editor's initialization
     *
     * @returns {ToolConfig}
     */
    get config() {
      return n.config;
    },
    /**
     * .ce-block element, that wraps plugin contents
     *
     * @returns {HTMLElement}
     */
    get holder() {
      return n.holder;
    },
    /**
     * True if Block content is empty
     *
     * @returns {boolean}
     */
    get isEmpty() {
      return n.isEmpty;
    },
    /**
     * True if Block is selected with Cross-Block selection
     *
     * @returns {boolean}
     */
    get selected() {
      return n.selected;
    },
    /**
     * Set Block's stretch state
     *
     * @param {boolean} state — state to set
     */
    set stretched(e) {
      n.stretched = e;
    },
    /**
     * True if Block is stretched
     *
     * @returns {boolean}
     */
    get stretched() {
      return n.stretched;
    },
    /**
     * True if Block has inputs to be focused
     */
    get focusable() {
      return n.focusable;
    },
    /**
     * Call Tool method with errors handler under-the-hood
     *
     * @param {string} methodName - method to call
     * @param {object} param - object with parameters
     * @returns {unknown}
     */
    call(e, t) {
      return n.call(e, t);
    },
    /**
     * Save Block content
     *
     * @returns {Promise<void|SavedData>}
     */
    save() {
      return n.save();
    },
    /**
     * Validate Block data
     *
     * @param {BlockToolData} data - data to validate
     * @returns {Promise<boolean>}
     */
    validate(e) {
      return n.validate(e);
    },
    /**
     * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
     * Can be useful for block changes invisible for editor core.
     */
    dispatchChange() {
      n.dispatchChange();
    },
    /**
     * Tool could specify several entries to be displayed at the Toolbox (for example, "Heading 1", "Heading 2", "Heading 3")
     * This method returns the entry that is related to the Block (depended on the Block data)
     */
    getActiveToolboxEntry() {
      return n.getActiveToolboxEntry();
    }
  });
}
class Gt {
  constructor() {
    this.allListeners = [];
  }
  /**
   * Assigns event listener on element and returns unique identifier
   *
   * @param {EventTarget} element - DOM element that needs to be listened
   * @param {string} eventType - event type
   * @param {Function} handler - method that will be fired on event
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  on(e, t, o, i = !1) {
    const r = Cc("l"), s = {
      id: r,
      element: e,
      eventType: t,
      handler: o,
      options: i
    };
    if (!this.findOne(e, t, o))
      return this.allListeners.push(s), e.addEventListener(t, o, i), r;
  }
  /**
   * Removes event listener from element
   *
   * @param {EventTarget} element - DOM element that we removing listener
   * @param {string} eventType - event type
   * @param {Function} handler - remove handler, if element listens several handlers on the same event type
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  off(e, t, o, i) {
    const r = this.findAll(e, t, o);
    r.forEach((s, a) => {
      const l = this.allListeners.indexOf(r[a]);
      l > -1 && (this.allListeners.splice(l, 1), s.element.removeEventListener(s.eventType, s.handler, s.options));
    });
  }
  /**
   * Removes listener by id
   *
   * @param {string} id - listener identifier
   */
  offById(e) {
    const t = this.findById(e);
    t && t.element.removeEventListener(t.eventType, t.handler, t.options);
  }
  /**
   * Finds and returns first listener by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} [eventType] - event type
   * @param {Function} [handler] - event handler
   * @returns {ListenerData|null}
   */
  findOne(e, t, o) {
    const i = this.findAll(e, t, o);
    return i.length > 0 ? i[0] : null;
  }
  /**
   * Return all stored listeners by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} eventType - event type
   * @param {Function} handler - event handler
   * @returns {ListenerData[]}
   */
  findAll(e, t, o) {
    let i;
    const r = e ? this.findByEventTarget(e) : [];
    return e && t && o ? i = r.filter((s) => s.eventType === t && s.handler === o) : e && t ? i = r.filter((s) => s.eventType === t) : i = r, i;
  }
  /**
   * Removes all listeners
   */
  removeAll() {
    this.allListeners.map((e) => {
      e.element.removeEventListener(e.eventType, e.handler, e.options);
    }), this.allListeners = [];
  }
  /**
   * Module cleanup on destruction
   */
  destroy() {
    this.removeAll();
  }
  /**
   * Search method: looks for listener by passed element
   *
   * @param {EventTarget} element - searching element
   * @returns {Array} listeners that found on element
   */
  findByEventTarget(e) {
    return this.allListeners.filter((t) => {
      if (t.element === e)
        return t;
    });
  }
  /**
   * Search method: looks for listener by passed event type
   *
   * @param {string} eventType - event type
   * @returns {ListenerData[]} listeners that found on element
   */
  findByType(e) {
    return this.allListeners.filter((t) => {
      if (t.eventType === e)
        return t;
    });
  }
  /**
   * Search method: looks for listener by passed handler
   *
   * @param {Function} handler - event handler
   * @returns {ListenerData[]} listeners that found on element
   */
  findByHandler(e) {
    return this.allListeners.filter((t) => {
      if (t.handler === e)
        return t;
    });
  }
  /**
   * Returns listener data found by id
   *
   * @param {string} id - listener identifier
   * @returns {ListenerData}
   */
  findById(e) {
    return this.allListeners.find((t) => t.id === e);
  }
}
let W = class rs {
  /**
   * @class
   * @param options - Module options
   * @param options.config - Module config
   * @param options.eventsDispatcher - Common event bus
   */
  constructor({ config: e, eventsDispatcher: t }) {
    if (this.nodes = {}, this.listeners = new Gt(), this.readOnlyMutableListeners = {
      /**
       * Assigns event listener on DOM element and pushes into special array that might be removed
       *
       * @param {EventTarget} element - DOM Element
       * @param {string} eventType - Event name
       * @param {Function} handler - Event handler
       * @param {boolean|AddEventListenerOptions} options - Listening options
       */
      on: (o, i, r, s = !1) => {
        this.mutableListenerIds.push(
          this.listeners.on(o, i, r, s)
        );
      },
      /**
       * Clears all mutable listeners
       */
      clearAll: () => {
        for (const o of this.mutableListenerIds)
          this.listeners.offById(o);
        this.mutableListenerIds = [];
      }
    }, this.mutableListenerIds = [], new.target === rs)
      throw new TypeError("Constructors for abstract class Module are not allowed.");
    this.config = e, this.eventsDispatcher = t;
  }
  /**
   * Editor modules setter
   *
   * @param {EditorModules} Editor - Editor's Modules
   */
  set state(e) {
    this.Editor = e;
  }
  /**
   * Remove memorized nodes
   */
  removeAllNodes() {
    for (const e in this.nodes) {
      const t = this.nodes[e];
      t instanceof HTMLElement && t.remove();
    }
  }
  /**
   * Returns true if current direction is RTL (Right-To-Left)
   */
  get isRtl() {
    return this.config.i18n.direction === "rtl";
  }
}, F = class Ve {
  constructor() {
    this.instance = null, this.selection = null, this.savedSelectionRange = null, this.isFakeBackgroundEnabled = !1, this.commandBackground = "backColor", this.commandRemoveFormat = "removeFormat";
  }
  /**
   * Editor styles
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */
  static get CSS() {
    return {
      editorWrapper: "codex-editor",
      editorZone: "codex-editor__redactor"
    };
  }
  /**
   * Returns selected anchor
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorNode}
   *
   * @returns {Node|null}
   */
  static get anchorNode() {
    const e = window.getSelection();
    return e ? e.anchorNode : null;
  }
  /**
   * Returns selected anchor element
   *
   * @returns {Element|null}
   */
  static get anchorElement() {
    const e = window.getSelection();
    if (!e)
      return null;
    const t = e.anchorNode;
    return t ? k.isElement(t) ? t : t.parentElement : null;
  }
  /**
   * Returns selection offset according to the anchor node
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorOffset}
   *
   * @returns {number|null}
   */
  static get anchorOffset() {
    const e = window.getSelection();
    return e ? e.anchorOffset : null;
  }
  /**
   * Is current selection range collapsed
   *
   * @returns {boolean|null}
   */
  static get isCollapsed() {
    const e = window.getSelection();
    return e ? e.isCollapsed : null;
  }
  /**
   * Check current selection if it is at Editor's zone
   *
   * @returns {boolean}
   */
  static get isAtEditor() {
    return this.isSelectionAtEditor(Ve.get());
  }
  /**
   * Check if passed selection is at Editor's zone
   *
   * @param selection - Selection object to check
   */
  static isSelectionAtEditor(e) {
    if (!e)
      return !1;
    let t = e.anchorNode || e.focusNode;
    t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
    let o = null;
    return t && t instanceof Element && (o = t.closest(`.${Ve.CSS.editorZone}`)), o ? o.nodeType === Node.ELEMENT_NODE : !1;
  }
  /**
   * Check if passed range at Editor zone
   *
   * @param range - range to check
   */
  static isRangeAtEditor(e) {
    if (!e)
      return;
    let t = e.startContainer;
    t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
    let o = null;
    return t && t instanceof Element && (o = t.closest(`.${Ve.CSS.editorZone}`)), o ? o.nodeType === Node.ELEMENT_NODE : !1;
  }
  /**
   * Methods return boolean that true if selection exists on the page
   */
  static get isSelectionExists() {
    return !!Ve.get().anchorNode;
  }
  /**
   * Return first range
   *
   * @returns {Range|null}
   */
  static get range() {
    return this.getRangeFromSelection(this.get());
  }
  /**
   * Returns range from passed Selection object
   *
   * @param selection - Selection object to get Range from
   */
  static getRangeFromSelection(e) {
    return e && e.rangeCount ? e.getRangeAt(0) : null;
  }
  /**
   * Calculates position and size of selected text
   *
   * @returns {DOMRect | ClientRect}
   */
  static get rect() {
    let e = document.selection, t, o = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    if (e && e.type !== "Control")
      return e = e, t = e.createRange(), o.x = t.boundingLeft, o.y = t.boundingTop, o.width = t.boundingWidth, o.height = t.boundingHeight, o;
    if (!window.getSelection)
      return X("Method window.getSelection is not supported", "warn"), o;
    if (e = window.getSelection(), e.rangeCount === null || isNaN(e.rangeCount))
      return X("Method SelectionUtils.rangeCount is not supported", "warn"), o;
    if (e.rangeCount === 0)
      return o;
    if (t = e.getRangeAt(0).cloneRange(), t.getBoundingClientRect && (o = t.getBoundingClientRect()), o.x === 0 && o.y === 0) {
      const i = document.createElement("span");
      if (i.getBoundingClientRect) {
        i.appendChild(document.createTextNode("​")), t.insertNode(i), o = i.getBoundingClientRect();
        const r = i.parentNode;
        r.removeChild(i), r.normalize();
      }
    }
    return o;
  }
  /**
   * Returns selected text as String
   *
   * @returns {string}
   */
  static get text() {
    return window.getSelection ? window.getSelection().toString() : "";
  }
  /**
   * Returns window SelectionUtils
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Window/getSelection}
   *
   * @returns {Selection}
   */
  static get() {
    return window.getSelection();
  }
  /**
   * Set focus to contenteditable or native input element
   *
   * @param element - element where to set focus
   * @param offset - offset of cursor
   */
  static setCursor(e, t = 0) {
    const o = document.createRange(), i = window.getSelection();
    return k.isNativeInput(e) ? k.canSetCaret(e) ? (e.focus(), e.selectionStart = e.selectionEnd = t, e.getBoundingClientRect()) : void 0 : (o.setStart(e, t), o.setEnd(e, t), i.removeAllRanges(), i.addRange(o), o.getBoundingClientRect());
  }
  /**
   * Check if current range exists and belongs to container
   *
   * @param container - where range should be
   */
  static isRangeInsideContainer(e) {
    const t = Ve.range;
    return t === null ? !1 : e.contains(t.startContainer);
  }
  /**
   * Adds fake cursor to the current range
   */
  static addFakeCursor() {
    const e = Ve.range;
    if (e === null)
      return;
    const t = k.make("span", "codex-editor__fake-cursor");
    t.dataset.mutationFree = "true", e.collapse(), e.insertNode(t);
  }
  /**
   * Check if passed element contains a fake cursor
   *
   * @param el - where to check
   */
  static isFakeCursorInsideContainer(e) {
    return k.find(e, ".codex-editor__fake-cursor") !== null;
  }
  /**
   * Removes fake cursor from a container
   *
   * @param container - container to look for
   */
  static removeFakeCursor(e = document.body) {
    const t = k.find(e, ".codex-editor__fake-cursor");
    t && t.remove();
  }
  /**
   * Removes fake background
   */
  removeFakeBackground() {
    this.isFakeBackgroundEnabled && (this.isFakeBackgroundEnabled = !1, document.execCommand(this.commandRemoveFormat));
  }
  /**
   * Sets fake background
   */
  setFakeBackground() {
    document.execCommand(this.commandBackground, !1, "#a8d6ff"), this.isFakeBackgroundEnabled = !0;
  }
  /**
   * Save SelectionUtils's range
   */
  save() {
    this.savedSelectionRange = Ve.range;
  }
  /**
   * Restore saved SelectionUtils's range
   */
  restore() {
    if (!this.savedSelectionRange)
      return;
    const e = window.getSelection();
    e.removeAllRanges(), e.addRange(this.savedSelectionRange);
  }
  /**
   * Clears saved selection
   */
  clearSaved() {
    this.savedSelectionRange = null;
  }
  /**
   * Collapse current selection
   */
  collapseToEnd() {
    const e = window.getSelection(), t = document.createRange();
    t.selectNodeContents(e.focusNode), t.collapse(!1), e.removeAllRanges(), e.addRange(t);
  }
  /**
   * Looks ahead to find passed tag from current selection
   *
   * @param  {string} tagName       - tag to found
   * @param  {string} [className]   - tag's class name
   * @param  {number} [searchDepth] - count of tags that can be included. For better performance.
   * @returns {HTMLElement|null}
   */
  findParentTag(e, t, o = 10) {
    const i = window.getSelection();
    let r = null;
    return !i || !i.anchorNode || !i.focusNode ? null : ([
      /** the Node in which the selection begins */
      i.anchorNode,
      /** the Node in which the selection ends */
      i.focusNode
    ].forEach((s) => {
      let a = o;
      for (; a > 0 && s.parentNode && !(s.tagName === e && (r = s, t && s.classList && !s.classList.contains(t) && (r = null), r)); )
        s = s.parentNode, a--;
    }), r);
  }
  /**
   * Expands selection range to the passed parent node
   *
   * @param {HTMLElement} element - element which contents should be selected
   */
  expandToTag(e) {
    const t = window.getSelection();
    t.removeAllRanges();
    const o = document.createRange();
    o.selectNodeContents(e), t.addRange(o);
  }
};
function Mc(n, e) {
  const { type: t, target: o, addedNodes: i, removedNodes: r } = n;
  return n.type === "attributes" && n.attributeName === "data-empty" ? !1 : !!(e.contains(o) || t === "childList" && (Array.from(i).some((s) => s === e) || Array.from(r).some((s) => s === e)));
}
const cn = "redactor dom changed", ss = "block changed", as = "fake cursor is about to be toggled", ls = "fake cursor have been set", zt = "editor mobile layout toggled";
function dn(n, e) {
  if (!n.conversionConfig)
    return !1;
  const t = n.conversionConfig[e];
  return oe(t) || ze(t);
}
function ho(n, e) {
  return dn(n.tool, e);
}
function cs(n, e) {
  return Object.entries(n).some(([t, o]) => e[t] && Ec(e[t], o));
}
async function ds(n, e) {
  const t = (await n.save()).data, o = e.find((i) => i.name === n.name);
  return o !== void 0 && !dn(o, "export") ? [] : e.reduce((i, r) => {
    if (!dn(r, "import") || r.toolbox === void 0)
      return i;
    const s = r.toolbox.filter((a) => {
      if (Oe(a) || a.icon === void 0)
        return !1;
      if (a.data !== void 0) {
        if (cs(a.data, t))
          return !1;
      } else if (r.name === n.name)
        return !1;
      return !0;
    });
    return i.push({
      ...r,
      toolbox: s
    }), i;
  }, []);
}
function mr(n, e) {
  return n.mergeable ? n.name === e.name ? !0 : ho(e, "export") && ho(n, "import") : !1;
}
function Ac(n, e) {
  const t = e == null ? void 0 : e.export;
  return oe(t) ? t(n) : ze(t) ? n[t] : (t !== void 0 && X("Conversion «export» property must be a string or function. String means key of saved data object to export. Function should export processed string to export."), "");
}
function vr(n, e, t) {
  const o = e == null ? void 0 : e.import;
  return oe(o) ? o(n, t) : ze(o) ? {
    [o]: n
  } : (o !== void 0 && X("Conversion «import» property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data."), {});
}
var ee = /* @__PURE__ */ ((n) => (n.Default = "default", n.Separator = "separator", n.Html = "html", n))(ee || {}), Fe = /* @__PURE__ */ ((n) => (n.APPEND_CALLBACK = "appendCallback", n.RENDERED = "rendered", n.MOVED = "moved", n.UPDATED = "updated", n.REMOVED = "removed", n.ON_PASTE = "onPaste", n))(Fe || {});
let je = class qe extends Zt {
  /**
   * @param options - block constructor options
   * @param [options.id] - block's id. Will be generated if omitted.
   * @param options.data - Tool's initial data
   * @param options.tool — block's tool
   * @param options.api - Editor API module for pass it to the Block Tunes
   * @param options.readOnly - Read-Only flag
   * @param [eventBus] - Editor common event bus. Allows to subscribe on some Editor events. Could be omitted when "virtual" Block is created. See BlocksAPI@composeBlockData.
   */
  constructor({
    id: e = kc(),
    data: t,
    tool: o,
    readOnly: i,
    tunesData: r
  }, s) {
    super(), this.cachedInputs = [], this.toolRenderedElement = null, this.tunesInstances = /* @__PURE__ */ new Map(), this.defaultTunesInstances = /* @__PURE__ */ new Map(), this.unavailableTunesData = {}, this.inputIndex = 0, this.editorEventBus = null, this.handleFocus = () => {
      this.dropInputsCache(), this.updateCurrentInput();
    }, this.didMutated = (a = void 0) => {
      const l = a === void 0, c = a instanceof InputEvent;
      !l && !c && this.detectToolRootChange(a);
      let d;
      l || c ? d = !0 : d = !(a.length > 0 && a.every((u) => {
        const { addedNodes: p, removedNodes: y, target: v } = u;
        return [
          ...Array.from(p),
          ...Array.from(y),
          v
        ].some((g) => (k.isElement(g) || (g = g.parentElement), g && g.closest('[data-mutation-free="true"]') !== null));
      })), d && (this.dropInputsCache(), this.updateCurrentInput(), this.toggleInputsEmptyMark(), this.call(
        "updated"
        /* UPDATED */
      ), this.emit("didMutated", this));
    }, this.name = o.name, this.id = e, this.settings = o.settings, this.config = o.settings.config || {}, this.editorEventBus = s || null, this.blockAPI = new He(this), this.tool = o, this.toolInstance = o.create(t, this.blockAPI, i), this.tunes = o.tunes, this.composeTunes(r), this.holder = this.compose(), window.requestIdleCallback(() => {
      this.watchBlockMutations(), this.addInputEvents(), this.toggleInputsEmptyMark();
    });
  }
  /**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */
  static get CSS() {
    return {
      wrapper: "ce-block",
      wrapperStretched: "ce-block--stretched",
      content: "ce-block__content",
      selected: "ce-block--selected",
      dropTarget: "ce-block--drop-target"
    };
  }
  /**
   * Find and return all editable elements (contenteditable and native inputs) in the Tool HTML
   */
  get inputs() {
    if (this.cachedInputs.length !== 0)
      return this.cachedInputs;
    const e = k.findAllInputs(this.holder);
    return this.inputIndex > e.length - 1 && (this.inputIndex = e.length - 1), this.cachedInputs = e, e;
  }
  /**
   * Return current Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get currentInput() {
    return this.inputs[this.inputIndex];
  }
  /**
   * Set input index to the passed element
   *
   * @param element - HTML Element to set as current input
   */
  set currentInput(e) {
    const t = this.inputs.findIndex((o) => o === e || o.contains(e));
    t !== -1 && (this.inputIndex = t);
  }
  /**
   * Return first Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get firstInput() {
    return this.inputs[0];
  }
  /**
   * Return first Tool`s input
   * If Block doesn't contain inputs, return undefined
   */
  get lastInput() {
    const e = this.inputs;
    return e[e.length - 1];
  }
  /**
   * Return next Tool`s input or undefined if it doesn't exist
   * If Block doesn't contain inputs, return undefined
   */
  get nextInput() {
    return this.inputs[this.inputIndex + 1];
  }
  /**
   * Return previous Tool`s input or undefined if it doesn't exist
   * If Block doesn't contain inputs, return undefined
   */
  get previousInput() {
    return this.inputs[this.inputIndex - 1];
  }
  /**
   * Get Block's JSON data
   *
   * @returns {object}
   */
  get data() {
    return this.save().then((e) => e && !Oe(e.data) ? e.data : {});
  }
  /**
   * Returns tool's sanitizer config
   *
   * @returns {object}
   */
  get sanitize() {
    return this.tool.sanitizeConfig;
  }
  /**
   * is block mergeable
   * We plugin have merge function then we call it mergeable
   *
   * @returns {boolean}
   */
  get mergeable() {
    return oe(this.toolInstance.merge);
  }
  /**
   * If Block contains inputs, it is focusable
   */
  get focusable() {
    return this.inputs.length !== 0;
  }
  /**
   * Check block for emptiness
   *
   * @returns {boolean}
   */
  get isEmpty() {
    const e = k.isEmpty(this.pluginsContent, "/"), t = !this.hasMedia;
    return e && t;
  }
  /**
   * Check if block has a media content such as images, iframe and other
   *
   * @returns {boolean}
   */
  get hasMedia() {
    const e = [
      "img",
      "iframe",
      "video",
      "audio",
      "source",
      "input",
      "textarea",
      "twitterwidget"
    ];
    return !!this.holder.querySelector(e.join(","));
  }
  /**
   * Set selected state
   * We don't need to mark Block as Selected when it is empty
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */
  set selected(e) {
    var t, o;
    this.holder.classList.toggle(qe.CSS.selected, e);
    const i = e === !0 && F.isRangeInsideContainer(this.holder), r = e === !1 && F.isFakeCursorInsideContainer(this.holder);
    (i || r) && ((t = this.editorEventBus) == null || t.emit(as, { state: e }), i ? F.addFakeCursor() : F.removeFakeCursor(this.holder), (o = this.editorEventBus) == null || o.emit(ls, { state: e }));
  }
  /**
   * Returns True if it is Selected
   *
   * @returns {boolean}
   */
  get selected() {
    return this.holder.classList.contains(qe.CSS.selected);
  }
  /**
   * Set stretched state
   *
   * @param {boolean} state - 'true' to enable, 'false' to disable stretched state
   */
  set stretched(e) {
    this.holder.classList.toggle(qe.CSS.wrapperStretched, e);
  }
  /**
   * Return Block's stretched state
   *
   * @returns {boolean}
   */
  get stretched() {
    return this.holder.classList.contains(qe.CSS.wrapperStretched);
  }
  /**
   * Toggle drop target state
   *
   * @param {boolean} state - 'true' if block is drop target, false otherwise
   */
  set dropTarget(e) {
    this.holder.classList.toggle(qe.CSS.dropTarget, e);
  }
  /**
   * Returns Plugins content
   *
   * @returns {HTMLElement}
   */
  get pluginsContent() {
    return this.toolRenderedElement;
  }
  /**
   * Calls Tool's method
   *
   * Method checks tool property {MethodName}. Fires method with passes params If it is instance of Function
   *
   * @param {string} methodName - method to call
   * @param {object} params - method argument
   */
  call(e, t) {
    if (oe(this.toolInstance[e])) {
      e === "appendCallback" && X(
        "`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead",
        "warn"
      );
      try {
        this.toolInstance[e].call(this.toolInstance, t);
      } catch (o) {
        X(`Error during '${e}' call: ${o.message}`, "error");
      }
    }
  }
  /**
   * Call plugins merge method
   *
   * @param {BlockToolData} data - data to merge
   */
  async mergeWith(e) {
    await this.toolInstance.merge(e);
  }
  /**
   * Extracts data from Block
   * Groups Tool's save processing time
   *
   * @returns {object}
   */
  async save() {
    const e = await this.toolInstance.save(this.pluginsContent), t = this.unavailableTunesData;
    [
      ...this.tunesInstances.entries(),
      ...this.defaultTunesInstances.entries()
    ].forEach(([r, s]) => {
      if (oe(s.save))
        try {
          t[r] = s.save();
        } catch (a) {
          X(`Tune ${s.constructor.name} save method throws an Error %o`, "warn", a);
        }
    });
    const o = window.performance.now();
    let i;
    return Promise.resolve(e).then((r) => (i = window.performance.now(), {
      id: this.id,
      tool: this.name,
      data: r,
      tunes: t,
      time: i - o
    })).catch((r) => {
      X(`Saving process for ${this.name} tool failed due to the ${r}`, "log", "red");
    });
  }
  /**
   * Uses Tool's validation method to check the correctness of output data
   * Tool's validation method is optional
   *
   * @description Method returns true|false whether data passed the validation or not
   * @param {BlockToolData} data - data to validate
   * @returns {Promise<boolean>} valid
   */
  async validate(e) {
    let t = !0;
    return this.toolInstance.validate instanceof Function && (t = await this.toolInstance.validate(e)), t;
  }
  /**
   * Returns data to render in Block Tunes menu.
   * Splits block tunes into 2 groups: block specific tunes and common tunes
   */
  getTunes() {
    const e = [], t = [], o = typeof this.toolInstance.renderSettings == "function" ? this.toolInstance.renderSettings() : [];
    return k.isElement(o) ? e.push({
      type: ee.Html,
      element: o
    }) : Array.isArray(o) ? e.push(...o) : e.push(o), [
      ...this.tunesInstances.values(),
      ...this.defaultTunesInstances.values()
    ].map((i) => i.render()).forEach((i) => {
      k.isElement(i) ? t.push({
        type: ee.Html,
        element: i
      }) : Array.isArray(i) ? t.push(...i) : t.push(i);
    }), {
      toolTunes: e,
      commonTunes: t
    };
  }
  /**
   * Update current input index with selection anchor node
   */
  updateCurrentInput() {
    this.currentInput = k.isNativeInput(document.activeElement) || !F.anchorNode ? document.activeElement : F.anchorNode;
  }
  /**
   * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
   * Can be useful for block changes invisible for editor core.
   */
  dispatchChange() {
    this.didMutated();
  }
  /**
   * Call Tool instance destroy method
   */
  destroy() {
    this.unwatchBlockMutations(), this.removeInputEvents(), super.destroy(), oe(this.toolInstance.destroy) && this.toolInstance.destroy();
  }
  /**
   * Tool could specify several entries to be displayed at the Toolbox (for example, "Heading 1", "Heading 2", "Heading 3")
   * This method returns the entry that is related to the Block (depended on the Block data)
   */
  async getActiveToolboxEntry() {
    const e = this.tool.toolbox;
    if (e.length === 1)
      return Promise.resolve(this.tool.toolbox[0]);
    const t = await this.data, o = e;
    return o == null ? void 0 : o.find((i) => cs(i.data, t));
  }
  /**
   * Exports Block data as string using conversion config
   */
  async exportDataAsString() {
    const e = await this.data;
    return Ac(e, this.tool.conversionConfig);
  }
  /**
   * Make default Block wrappers and put Tool`s content there
   *
   * @returns {HTMLDivElement}
   */
  compose() {
    const e = k.make("div", qe.CSS.wrapper), t = k.make("div", qe.CSS.content), o = this.toolInstance.render();
    e.dataset.id = this.id, this.toolRenderedElement = o, t.appendChild(this.toolRenderedElement);
    let i = t;
    return [...this.tunesInstances.values(), ...this.defaultTunesInstances.values()].forEach((r) => {
      if (oe(r.wrap))
        try {
          i = r.wrap(i);
        } catch (s) {
          X(`Tune ${r.constructor.name} wrap method throws an Error %o`, "warn", s);
        }
    }), e.appendChild(i), e;
  }
  /**
   * Instantiate Block Tunes
   *
   * @param tunesData - current Block tunes data
   * @private
   */
  composeTunes(e) {
    Array.from(this.tunes.values()).forEach((t) => {
      (t.isInternal ? this.defaultTunesInstances : this.tunesInstances).set(t.name, t.create(e[t.name], this.blockAPI));
    }), Object.entries(e).forEach(([t, o]) => {
      this.tunesInstances.has(t) || (this.unavailableTunesData[t] = o);
    });
  }
  /**
   * Adds focus event listeners to all inputs and contenteditable
   */
  addInputEvents() {
    this.inputs.forEach((e) => {
      e.addEventListener("focus", this.handleFocus), k.isNativeInput(e) && e.addEventListener("input", this.didMutated);
    });
  }
  /**
   * removes focus event listeners from all inputs and contenteditable
   */
  removeInputEvents() {
    this.inputs.forEach((e) => {
      e.removeEventListener("focus", this.handleFocus), k.isNativeInput(e) && e.removeEventListener("input", this.didMutated);
    });
  }
  /**
   * Listen common editor Dom Changed event and detect mutations related to the  Block
   */
  watchBlockMutations() {
    var e;
    this.redactorDomChangedCallback = (t) => {
      const { mutations: o } = t;
      o.some((i) => Mc(i, this.toolRenderedElement)) && this.didMutated(o);
    }, (e = this.editorEventBus) == null || e.on(cn, this.redactorDomChangedCallback);
  }
  /**
   * Remove redactor dom change event listener
   */
  unwatchBlockMutations() {
    var e;
    (e = this.editorEventBus) == null || e.off(cn, this.redactorDomChangedCallback);
  }
  /**
   * Sometimes Tool can replace own main element, for example H2 -> H4 or UL -> OL
   * We need to detect such changes and update a link to tools main element with the new one
   *
   * @param mutations - records of block content mutations
   */
  detectToolRootChange(e) {
    e.forEach((t) => {
      if (Array.from(t.removedNodes).includes(this.toolRenderedElement)) {
        const o = t.addedNodes[t.addedNodes.length - 1];
        this.toolRenderedElement = o;
      }
    });
  }
  /**
   * Clears inputs cached value
   */
  dropInputsCache() {
    this.cachedInputs = [];
  }
  /**
   * Mark inputs with 'data-empty' attribute with the empty state
   */
  toggleInputsEmptyMark() {
    this.inputs.forEach(ts);
  }
};
class _c extends W {
  constructor() {
    super(...arguments), this.insert = (e = this.config.defaultBlock, t = {}, o = {}, i, r, s, a) => {
      const l = this.Editor.BlockManager.insert({
        id: a,
        tool: e,
        data: t,
        index: i,
        needToFocus: r,
        replace: s
      });
      return new He(l);
    }, this.composeBlockData = async (e) => {
      const t = this.Editor.Tools.blockTools.get(e);
      return new je({
        tool: t,
        api: this.Editor.API,
        readOnly: !0,
        data: {},
        tunesData: {}
      }).data;
    }, this.update = async (e, t, o) => {
      const { BlockManager: i } = this.Editor, r = i.getBlockById(e);
      if (r === void 0)
        throw new Error(`Block with id "${e}" not found`);
      const s = await i.update(r, t, o);
      return new He(s);
    }, this.convert = async (e, t, o) => {
      var i, r;
      const { BlockManager: s, Tools: a } = this.Editor, l = s.getBlockById(e);
      if (!l)
        throw new Error(`Block with id "${e}" not found`);
      const c = a.blockTools.get(l.name), d = a.blockTools.get(t);
      if (!d)
        throw new Error(`Block Tool with type "${t}" not found`);
      const u = ((i = c == null ? void 0 : c.conversionConfig) == null ? void 0 : i.export) !== void 0, p = ((r = d.conversionConfig) == null ? void 0 : r.import) !== void 0;
      if (u && p) {
        const y = await s.convert(l, t, o);
        return new He(y);
      } else {
        const y = [
          u ? !1 : uo(l.name),
          p ? !1 : uo(t)
        ].filter(Boolean).join(" and ");
        throw new Error(`Conversion from "${l.name}" to "${t}" is not possible. ${y} tool(s) should provide a "conversionConfig"`);
      }
    }, this.insertMany = (e, t = this.Editor.BlockManager.blocks.length - 1) => {
      this.validateIndex(t);
      const o = e.map(({ id: i, type: r, data: s }) => this.Editor.BlockManager.composeBlock({
        id: i,
        tool: r || this.config.defaultBlock,
        data: s
      }));
      return this.Editor.BlockManager.insertMany(o, t), o.map((i) => new He(i));
    };
  }
  /**
   * Available methods
   *
   * @returns {Blocks}
   */
  get methods() {
    return {
      clear: () => this.clear(),
      render: (e) => this.render(e),
      renderFromHTML: (e) => this.renderFromHTML(e),
      selectAll: () => this.selectAll(),
      unSelectAll: () => this.unSelectAll(),
      delete: (e) => this.delete(e),
      swap: (e, t) => this.swap(e, t),
      move: (e, t) => this.move(e, t),
      getBlockByIndex: (e) => this.getBlockByIndex(e),
      getById: (e) => this.getById(e),
      getCurrentBlockIndex: () => this.getCurrentBlockIndex(),
      getBlockIndex: (e) => this.getBlockIndex(e),
      getBlocksCount: () => this.getBlocksCount(),
      getBlockByElement: (e) => this.getBlockByElement(e),
      stretchBlock: (e, t = !0) => this.stretchBlock(e, t),
      insertNewBlock: () => this.insertNewBlock(),
      insert: this.insert,
      insertMany: this.insertMany,
      update: this.update,
      composeBlockData: this.composeBlockData,
      convert: this.convert
    };
  }
  /**
   * Returns Blocks count
   *
   * @returns {number}
   */
  getBlocksCount() {
    return this.Editor.BlockManager.blocks.length;
  }
  /**
   * Returns current block index
   *
   * @returns {number}
   */
  getCurrentBlockIndex() {
    return this.Editor.BlockManager.currentBlockIndex;
  }
  /**
   * Returns the index of Block by id;
   *
   * @param id - block id
   */
  getBlockIndex(e) {
    const t = this.Editor.BlockManager.getBlockById(e);
    if (!t) {
      Ie("There is no block with id `" + e + "`", "warn");
      return;
    }
    return this.Editor.BlockManager.getBlockIndex(t);
  }
  /**
   * Returns BlockAPI object by Block index
   *
   * @param {number} index - index to get
   */
  getBlockByIndex(e) {
    const t = this.Editor.BlockManager.getBlockByIndex(e);
    if (t === void 0) {
      Ie("There is no block at index `" + e + "`", "warn");
      return;
    }
    return new He(t);
  }
  /**
   * Returns BlockAPI object by Block id
   *
   * @param id - id of block to get
   */
  getById(e) {
    const t = this.Editor.BlockManager.getBlockById(e);
    return t === void 0 ? (Ie("There is no block with id `" + e + "`", "warn"), null) : new He(t);
  }
  /**
   * Get Block API object by any child html element
   *
   * @param element - html element to get Block by
   */
  getBlockByElement(e) {
    const t = this.Editor.BlockManager.getBlock(e);
    if (t === void 0) {
      Ie("There is no block corresponding to element `" + e + "`", "warn");
      return;
    }
    return new He(t);
  }
  /**
   * Call Block Manager method that swap Blocks
   *
   * @param {number} fromIndex - position of first Block
   * @param {number} toIndex - position of second Block
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    X(
      "`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead",
      "info"
    ), this.Editor.BlockManager.swap(e, t);
  }
  /**
   * Move block from one index to another
   *
   * @param {number} toIndex - index to move to
   * @param {number} fromIndex - index to move from
   */
  move(e, t) {
    this.Editor.BlockManager.move(e, t);
  }
  /**
   * Deletes Block
   *
   * @param {number} blockIndex - index of Block to delete
   */
  delete(e = this.Editor.BlockManager.currentBlockIndex) {
    try {
      const t = this.Editor.BlockManager.getBlockByIndex(e);
      this.Editor.BlockManager.removeBlock(t);
    } catch (t) {
      Ie(t, "warn");
      return;
    }
    this.Editor.BlockManager.blocks.length === 0 && this.Editor.BlockManager.insert(), this.Editor.BlockManager.currentBlock && this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END), this.Editor.Toolbar.close();
  }
  /**
   * Clear Editor's area
   */
  async clear() {
    await this.Editor.BlockManager.clear(!0), this.Editor.InlineToolbar.close();
  }
  /**
   * Fills Editor with Blocks data
   *
   * @param {OutputData} data — Saved Editor data
   */
  async render(e) {
    if (e === void 0 || e.blocks === void 0)
      throw new Error("Incorrect data passed to the render() method");
    this.Editor.ModificationsObserver.disable(), await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(e.blocks), this.Editor.ModificationsObserver.enable();
  }
  /**
   * Render passed HTML string
   *
   * @param {string} data - HTML string to render
   * @returns {Promise<void>}
   */
  async renderFromHTML(e) {
    return await this.Editor.BlockManager.clear(), this.Editor.Paste.processText(e, !0);
  }
  /**
   * Select all blocks of the editor
   */
  selectAll() {
    this.Editor.BlockSelection.selectAllBlocks();
  }
  /**
   * Unselect all blocks of the editor
   */
  unSelectAll() {
    this.Editor.BlockSelection.allBlocksSelected = !1;
  }
  /**
   * Stretch Block's content
   *
   * @param {number} index - index of Block to stretch
   * @param {boolean} status - true to enable, false to disable
   * @deprecated Use BlockAPI interface to stretch Blocks
   */
  stretchBlock(e, t = !0) {
    an(
      !0,
      "blocks.stretchBlock()",
      "BlockAPI"
    );
    const o = this.Editor.BlockManager.getBlockByIndex(e);
    o && (o.stretched = t);
  }
  /**
   * Insert new Block
   * After set caret to this Block
   *
   * @todo remove in 3.0.0
   * @deprecated with insert() method
   */
  insertNewBlock() {
    X("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.", "warn"), this.insert();
  }
  /**
   * Validated block index and throws an error if it's invalid
   *
   * @param index - index to validate
   */
  validateIndex(e) {
    if (typeof e != "number")
      throw new Error("Index should be a number");
    if (e < 0)
      throw new Error("Index should be greater than or equal to 0");
    if (e === null)
      throw new Error("Index should be greater than or equal to 0");
  }
}
function Nc(n, e) {
  return typeof n == "number" ? e.BlockManager.getBlockByIndex(n) : typeof n == "string" ? e.BlockManager.getBlockById(n) : e.BlockManager.getBlockById(n.id);
}
class Pc extends W {
  constructor() {
    super(...arguments), this.setToFirstBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.firstBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.firstBlock, e, t), !0) : !1, this.setToLastBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.lastBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.lastBlock, e, t), !0) : !1, this.setToPreviousBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.previousBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.previousBlock, e, t), !0) : !1, this.setToNextBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.nextBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.nextBlock, e, t), !0) : !1, this.setToBlock = (e, t = this.Editor.Caret.positions.DEFAULT, o = 0) => {
      const i = Nc(e, this.Editor);
      return i === void 0 ? !1 : (this.Editor.Caret.setToBlock(i, t, o), !0);
    }, this.focus = (e = !1) => e ? this.setToLastBlock(this.Editor.Caret.positions.END) : this.setToFirstBlock(this.Editor.Caret.positions.START);
  }
  /**
   * Available methods
   *
   * @returns {Caret}
   */
  get methods() {
    return {
      setToFirstBlock: this.setToFirstBlock,
      setToLastBlock: this.setToLastBlock,
      setToPreviousBlock: this.setToPreviousBlock,
      setToNextBlock: this.setToNextBlock,
      setToBlock: this.setToBlock,
      focus: this.focus
    };
  }
}
class Dc extends W {
  /**
   * Available methods
   *
   * @returns {Events}
   */
  get methods() {
    return {
      emit: (e, t) => this.emit(e, t),
      off: (e, t) => this.off(e, t),
      on: (e, t) => this.on(e, t)
    };
  }
  /**
   * Subscribe on Events
   *
   * @param {string} eventName - event name to subscribe
   * @param {Function} callback - event handler
   */
  on(e, t) {
    this.eventsDispatcher.on(e, t);
  }
  /**
   * Emit event with data
   *
   * @param {string} eventName - event to emit
   * @param {object} data - event's data
   */
  emit(e, t) {
    this.eventsDispatcher.emit(e, t);
  }
  /**
   * Unsubscribe from Event
   *
   * @param {string} eventName - event to unsubscribe
   * @param {Function} callback - event handler
   */
  off(e, t) {
    this.eventsDispatcher.off(e, t);
  }
}
class yn extends W {
  /**
   * Return namespace section for tool or block tune
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  static getNamespace(e, t) {
    return t ? `blockTunes.${e}` : `tools.${e}`;
  }
  /**
   * Return I18n API methods with global dictionary access
   */
  get methods() {
    return {
      t: () => {
        Ie("I18n.t() method can be accessed only from Tools", "warn");
      }
    };
  }
  /**
   * Return I18n API methods with tool namespaced dictionary
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  getMethodsForTool(e, t) {
    return Object.assign(
      this.methods,
      {
        t: (o) => ve.t(yn.getNamespace(e, t), o)
      }
    );
  }
}
class Rc extends W {
  /**
   * Editor.js Core API modules
   */
  get methods() {
    return {
      blocks: this.Editor.BlocksAPI.methods,
      caret: this.Editor.CaretAPI.methods,
      tools: this.Editor.ToolsAPI.methods,
      events: this.Editor.EventsAPI.methods,
      listeners: this.Editor.ListenersAPI.methods,
      notifier: this.Editor.NotifierAPI.methods,
      sanitizer: this.Editor.SanitizerAPI.methods,
      saver: this.Editor.SaverAPI.methods,
      selection: this.Editor.SelectionAPI.methods,
      styles: this.Editor.StylesAPI.classes,
      toolbar: this.Editor.ToolbarAPI.methods,
      inlineToolbar: this.Editor.InlineToolbarAPI.methods,
      tooltip: this.Editor.TooltipAPI.methods,
      i18n: this.Editor.I18nAPI.methods,
      readOnly: this.Editor.ReadOnlyAPI.methods,
      ui: this.Editor.UiAPI.methods
    };
  }
  /**
   * Returns Editor.js Core API methods for passed tool
   *
   * @param toolName - tool name
   * @param isTune - is tool a block tune
   */
  getMethodsForTool(e, t) {
    return Object.assign(
      this.methods,
      {
        i18n: this.Editor.I18nAPI.getMethodsForTool(e, t)
      }
    );
  }
}
class Hc extends W {
  /**
   * Available methods
   *
   * @returns {InlineToolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open()
    };
  }
  /**
   * Open Inline Toolbar
   */
  open() {
    this.Editor.InlineToolbar.tryToShow();
  }
  /**
   * Close Inline Toolbar
   */
  close() {
    this.Editor.InlineToolbar.close();
  }
}
class Fc extends W {
  /**
   * Available methods
   *
   * @returns {Listeners}
   */
  get methods() {
    return {
      on: (e, t, o, i) => this.on(e, t, o, i),
      off: (e, t, o, i) => this.off(e, t, o, i),
      offById: (e) => this.offById(e)
    };
  }
  /**
   * Ads a DOM event listener. Return it's id.
   *
   * @param {HTMLElement} element - Element to set handler to
   * @param {string} eventType - event type
   * @param {() => void} handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  on(e, t, o, i) {
    return this.listeners.on(e, t, o, i);
  }
  /**
   * Removes DOM listener from element
   *
   * @param {Element} element - Element to remove handler from
   * @param eventType - event type
   * @param handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  off(e, t, o, i) {
    this.listeners.off(e, t, o, i);
  }
  /**
   * Removes DOM listener by the listener id
   *
   * @param id - id of the listener to remove
   */
  offById(e) {
    this.listeners.offById(e);
  }
}
var us = { exports: {} };
(function(n, e) {
  (function(t, o) {
    n.exports = o();
  })(window, function() {
    return function(t) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = o, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, (function(c) {
              return r[c];
            }).bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "/", i(i.s = 0);
    }([function(t, o, i) {
      i(1), /*!
      * Codex JavaScript Notification module
      * https://github.com/codex-team/js-notifier
      */
      t.exports = function() {
        var r = i(6), s = "cdx-notify--bounce-in", a = null;
        return { show: function(l) {
          if (l.message) {
            (function() {
              if (a)
                return !0;
              a = r.getWrapper(), document.body.appendChild(a);
            })();
            var c = null, d = l.time || 8e3;
            switch (l.type) {
              case "confirm":
                c = r.confirm(l);
                break;
              case "prompt":
                c = r.prompt(l);
                break;
              default:
                c = r.alert(l), window.setTimeout(function() {
                  c.remove();
                }, d);
            }
            a.appendChild(c), c.classList.add(s);
          }
        } };
      }();
    }, function(t, o, i) {
      var r = i(2);
      typeof r == "string" && (r = [[t.i, r, ""]]);
      var s = { hmr: !0, transform: void 0, insertInto: void 0 };
      i(4)(r, s), r.locals && (t.exports = r.locals);
    }, function(t, o, i) {
      (t.exports = i(3)(!1)).push([t.i, `.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:'';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:'';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}`, ""]);
    }, function(t, o) {
      t.exports = function(i) {
        var r = [];
        return r.toString = function() {
          return this.map(function(s) {
            var a = function(l, c) {
              var d = l[1] || "", u = l[3];
              if (!u)
                return d;
              if (c && typeof btoa == "function") {
                var p = (v = u, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(v)))) + " */"), y = u.sources.map(function(g) {
                  return "/*# sourceURL=" + u.sourceRoot + g + " */";
                });
                return [d].concat(y).concat([p]).join(`
`);
              }
              var v;
              return [d].join(`
`);
            }(s, i);
            return s[2] ? "@media " + s[2] + "{" + a + "}" : a;
          }).join("");
        }, r.i = function(s, a) {
          typeof s == "string" && (s = [[null, s, ""]]);
          for (var l = {}, c = 0; c < this.length; c++) {
            var d = this[c][0];
            typeof d == "number" && (l[d] = !0);
          }
          for (c = 0; c < s.length; c++) {
            var u = s[c];
            typeof u[0] == "number" && l[u[0]] || (a && !u[2] ? u[2] = a : a && (u[2] = "(" + u[2] + ") and (" + a + ")"), r.push(u));
          }
        }, r;
      };
    }, function(t, o, i) {
      var r, s, a = {}, l = (r = function() {
        return window && document && document.all && !window.atob;
      }, function() {
        return s === void 0 && (s = r.apply(this, arguments)), s;
      }), c = function(M) {
        var O = {};
        return function(H) {
          if (typeof H == "function")
            return H();
          if (O[H] === void 0) {
            var V = (function(G) {
              return document.querySelector(G);
            }).call(this, H);
            if (window.HTMLIFrameElement && V instanceof window.HTMLIFrameElement)
              try {
                V = V.contentDocument.head;
              } catch {
                V = null;
              }
            O[H] = V;
          }
          return O[H];
        };
      }(), d = null, u = 0, p = [], y = i(5);
      function v(M, O) {
        for (var H = 0; H < M.length; H++) {
          var V = M[H], G = a[V.id];
          if (G) {
            G.refs++;
            for (var U = 0; U < G.parts.length; U++)
              G.parts[U](V.parts[U]);
            for (; U < V.parts.length; U++)
              G.parts.push(P(V.parts[U], O));
          } else {
            var ie = [];
            for (U = 0; U < V.parts.length; U++)
              ie.push(P(V.parts[U], O));
            a[V.id] = { id: V.id, refs: 1, parts: ie };
          }
        }
      }
      function g(M, O) {
        for (var H = [], V = {}, G = 0; G < M.length; G++) {
          var U = M[G], ie = O.base ? U[0] + O.base : U[0], q = { css: U[1], media: U[2], sourceMap: U[3] };
          V[ie] ? V[ie].parts.push(q) : H.push(V[ie] = { id: ie, parts: [q] });
        }
        return H;
      }
      function b(M, O) {
        var H = c(M.insertInto);
        if (!H)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var V = p[p.length - 1];
        if (M.insertAt === "top")
          V ? V.nextSibling ? H.insertBefore(O, V.nextSibling) : H.appendChild(O) : H.insertBefore(O, H.firstChild), p.push(O);
        else if (M.insertAt === "bottom")
          H.appendChild(O);
        else {
          if (typeof M.insertAt != "object" || !M.insertAt.before)
            throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
          var G = c(M.insertInto + " " + M.insertAt.before);
          H.insertBefore(O, G);
        }
      }
      function I(M) {
        if (M.parentNode === null)
          return !1;
        M.parentNode.removeChild(M);
        var O = p.indexOf(M);
        O >= 0 && p.splice(O, 1);
      }
      function B(M) {
        var O = document.createElement("style");
        return M.attrs.type === void 0 && (M.attrs.type = "text/css"), D(O, M.attrs), b(M, O), O;
      }
      function D(M, O) {
        Object.keys(O).forEach(function(H) {
          M.setAttribute(H, O[H]);
        });
      }
      function P(M, O) {
        var H, V, G, U;
        if (O.transform && M.css) {
          if (!(U = O.transform(M.css)))
            return function() {
            };
          M.css = U;
        }
        if (O.singleton) {
          var ie = u++;
          H = d || (d = B(O)), V = te.bind(null, H, ie, !1), G = te.bind(null, H, ie, !0);
        } else
          M.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (H = function(q) {
            var fe = document.createElement("link");
            return q.attrs.type === void 0 && (q.attrs.type = "text/css"), q.attrs.rel = "stylesheet", D(fe, q.attrs), b(q, fe), fe;
          }(O), V = (function(q, fe, et) {
            var De = et.css, Bt = et.sourceMap, Uo = fe.convertToAbsoluteUrls === void 0 && Bt;
            (fe.convertToAbsoluteUrls || Uo) && (De = y(De)), Bt && (De += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(Bt)))) + " */");
            var Vo = new Blob([De], { type: "text/css" }), to = q.href;
            q.href = URL.createObjectURL(Vo), to && URL.revokeObjectURL(to);
          }).bind(null, H, O), G = function() {
            I(H), H.href && URL.revokeObjectURL(H.href);
          }) : (H = B(O), V = (function(q, fe) {
            var et = fe.css, De = fe.media;
            if (De && q.setAttribute("media", De), q.styleSheet)
              q.styleSheet.cssText = et;
            else {
              for (; q.firstChild; )
                q.removeChild(q.firstChild);
              q.appendChild(document.createTextNode(et));
            }
          }).bind(null, H), G = function() {
            I(H);
          });
        return V(M), function(q) {
          if (q) {
            if (q.css === M.css && q.media === M.media && q.sourceMap === M.sourceMap)
              return;
            V(M = q);
          } else
            G();
        };
      }
      t.exports = function(M, O) {
        if (typeof DEBUG < "u" && DEBUG && typeof document != "object")
          throw new Error("The style-loader cannot be used in a non-browser environment");
        (O = O || {}).attrs = typeof O.attrs == "object" ? O.attrs : {}, O.singleton || typeof O.singleton == "boolean" || (O.singleton = l()), O.insertInto || (O.insertInto = "head"), O.insertAt || (O.insertAt = "bottom");
        var H = g(M, O);
        return v(H, O), function(V) {
          for (var G = [], U = 0; U < H.length; U++) {
            var ie = H[U];
            (q = a[ie.id]).refs--, G.push(q);
          }
          for (V && v(g(V, O), O), U = 0; U < G.length; U++) {
            var q;
            if ((q = G[U]).refs === 0) {
              for (var fe = 0; fe < q.parts.length; fe++)
                q.parts[fe]();
              delete a[q.id];
            }
          }
        };
      };
      var _, z = (_ = [], function(M, O) {
        return _[M] = O, _.filter(Boolean).join(`
`);
      });
      function te(M, O, H, V) {
        var G = H ? "" : V.css;
        if (M.styleSheet)
          M.styleSheet.cssText = z(O, G);
        else {
          var U = document.createTextNode(G), ie = M.childNodes;
          ie[O] && M.removeChild(ie[O]), ie.length ? M.insertBefore(U, ie[O]) : M.appendChild(U);
        }
      }
    }, function(t, o) {
      t.exports = function(i) {
        var r = typeof window < "u" && window.location;
        if (!r)
          throw new Error("fixUrls requires window.location");
        if (!i || typeof i != "string")
          return i;
        var s = r.protocol + "//" + r.host, a = s + r.pathname.replace(/\/[^\/]*$/, "/");
        return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(l, c) {
          var d, u = c.trim().replace(/^"(.*)"$/, function(p, y) {
            return y;
          }).replace(/^'(.*)'$/, function(p, y) {
            return y;
          });
          return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(u) ? l : (d = u.indexOf("//") === 0 ? u : u.indexOf("/") === 0 ? s + u : a + u.replace(/^\.\//, ""), "url(" + JSON.stringify(d) + ")");
        });
      };
    }, function(t, o, i) {
      var r, s, a, l, c, d, u, p, y;
      t.exports = (r = "cdx-notifies", s = "cdx-notify", a = "cdx-notify__cross", l = "cdx-notify__button--confirm", c = "cdx-notify__button--cancel", d = "cdx-notify__input", u = "cdx-notify__button", p = "cdx-notify__btns-wrapper", { alert: y = function(v) {
        var g = document.createElement("DIV"), b = document.createElement("DIV"), I = v.message, B = v.style;
        return g.classList.add(s), B && g.classList.add(s + "--" + B), g.innerHTML = I, b.classList.add(a), b.addEventListener("click", g.remove.bind(g)), g.appendChild(b), g;
      }, confirm: function(v) {
        var g = y(v), b = document.createElement("div"), I = document.createElement("button"), B = document.createElement("button"), D = g.querySelector("." + a), P = v.cancelHandler, _ = v.okHandler;
        return b.classList.add(p), I.innerHTML = v.okText || "Confirm", B.innerHTML = v.cancelText || "Cancel", I.classList.add(u), B.classList.add(u), I.classList.add(l), B.classList.add(c), P && typeof P == "function" && (B.addEventListener("click", P), D.addEventListener("click", P)), _ && typeof _ == "function" && I.addEventListener("click", _), I.addEventListener("click", g.remove.bind(g)), B.addEventListener("click", g.remove.bind(g)), b.appendChild(I), b.appendChild(B), g.appendChild(b), g;
      }, prompt: function(v) {
        var g = y(v), b = document.createElement("div"), I = document.createElement("button"), B = document.createElement("input"), D = g.querySelector("." + a), P = v.cancelHandler, _ = v.okHandler;
        return b.classList.add(p), I.innerHTML = v.okText || "Ok", I.classList.add(u), I.classList.add(l), B.classList.add(d), v.placeholder && B.setAttribute("placeholder", v.placeholder), v.default && (B.value = v.default), v.inputType && (B.type = v.inputType), P && typeof P == "function" && D.addEventListener("click", P), _ && typeof _ == "function" && I.addEventListener("click", function() {
          _(B.value);
        }), I.addEventListener("click", g.remove.bind(g)), b.appendChild(B), b.appendChild(I), g.appendChild(b), g;
      }, getWrapper: function() {
        var v = document.createElement("DIV");
        return v.classList.add(r), v;
      } });
    }]);
  });
})(us);
var jc = us.exports;
const zc = /* @__PURE__ */ Eo(jc);
class $c {
  /**
   * Show web notification
   *
   * @param {NotifierOptions | ConfirmNotifierOptions | PromptNotifierOptions} options - notification options
   */
  show(e) {
    zc.show(e);
  }
}
class Uc extends W {
  /**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.notifier = new $c();
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (e) => this.show(e)
    };
  }
  /**
   * Show notification
   *
   * @param {NotifierOptions} options - message option
   */
  show(e) {
    return this.notifier.show(e);
  }
}
class Vc extends W {
  /**
   * Available methods
   */
  get methods() {
    const e = () => this.isEnabled;
    return {
      toggle: (t) => this.toggle(t),
      get isEnabled() {
        return e();
      }
    };
  }
  /**
   * Set or toggle read-only state
   *
   * @param {boolean|undefined} state - set or toggle state
   * @returns {boolean} current value
   */
  toggle(e) {
    return this.Editor.ReadOnly.toggle(e);
  }
  /**
   * Returns current read-only state
   */
  get isEnabled() {
    return this.Editor.ReadOnly.isEnabled;
  }
}
var hs = { exports: {} };
(function(n, e) {
  (function(t, o) {
    n.exports = o();
  })(jt, function() {
    function t(u) {
      var p = u.tags, y = Object.keys(p), v = y.map(function(g) {
        return typeof p[g];
      }).every(function(g) {
        return g === "object" || g === "boolean" || g === "function";
      });
      if (!v)
        throw new Error("The configuration was invalid");
      this.config = u;
    }
    var o = ["P", "LI", "TD", "TH", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"];
    function i(u) {
      return o.indexOf(u.nodeName) !== -1;
    }
    var r = ["A", "B", "STRONG", "I", "EM", "SUB", "SUP", "U", "STRIKE"];
    function s(u) {
      return r.indexOf(u.nodeName) !== -1;
    }
    t.prototype.clean = function(u) {
      const p = document.implementation.createHTMLDocument(), y = p.createElement("div");
      return y.innerHTML = u, this._sanitize(p, y), y.innerHTML;
    }, t.prototype._sanitize = function(u, p) {
      var y = a(u, p), v = y.firstChild();
      if (v)
        do {
          if (v.nodeType === Node.TEXT_NODE)
            if (v.data.trim() === "" && (v.previousElementSibling && i(v.previousElementSibling) || v.nextElementSibling && i(v.nextElementSibling))) {
              p.removeChild(v), this._sanitize(u, p);
              break;
            } else
              continue;
          if (v.nodeType === Node.COMMENT_NODE) {
            p.removeChild(v), this._sanitize(u, p);
            break;
          }
          var g = s(v), b;
          g && (b = Array.prototype.some.call(v.childNodes, i));
          var I = !!p.parentNode, B = i(p) && i(v) && I, D = v.nodeName.toLowerCase(), P = l(this.config, D, v), _ = g && b;
          if (_ || c(v, P) || !this.config.keepNestedBlockElements && B) {
            if (!(v.nodeName === "SCRIPT" || v.nodeName === "STYLE"))
              for (; v.childNodes.length > 0; )
                p.insertBefore(v.childNodes[0], v);
            p.removeChild(v), this._sanitize(u, p);
            break;
          }
          for (var z = 0; z < v.attributes.length; z += 1) {
            var te = v.attributes[z];
            d(te, P, v) && (v.removeAttribute(te.name), z = z - 1);
          }
          this._sanitize(u, v);
        } while (v = y.nextSibling());
    };
    function a(u, p) {
      return u.createTreeWalker(
        p,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
        null,
        !1
      );
    }
    function l(u, p, y) {
      return typeof u.tags[p] == "function" ? u.tags[p](y) : u.tags[p];
    }
    function c(u, p) {
      return typeof p > "u" ? !0 : typeof p == "boolean" ? !p : !1;
    }
    function d(u, p, y) {
      var v = u.name.toLowerCase();
      return p === !0 ? !1 : typeof p[v] == "function" ? !p[v](u.value, y) : typeof p[v] > "u" || p[v] === !1 ? !0 : typeof p[v] == "string" ? p[v] !== u.value : !1;
    }
    return t;
  });
})(hs);
var qc = hs.exports;
const Wc = /* @__PURE__ */ Eo(qc);
function wn(n, e) {
  return n.map((t) => {
    const o = oe(e) ? e(t.tool) : e;
    return Oe(o) || (t.data = kn(t.data, o)), t;
  });
}
function Ne(n, e = {}) {
  const t = {
    tags: e
  };
  return new Wc(t).clean(n);
}
function kn(n, e) {
  return Array.isArray(n) ? Yc(n, e) : ce(n) ? Xc(n, e) : ze(n) ? Kc(n, e) : n;
}
function Yc(n, e) {
  return n.map((t) => kn(t, e));
}
function Xc(n, e) {
  const t = {};
  for (const o in n) {
    if (!Object.prototype.hasOwnProperty.call(n, o))
      continue;
    const i = n[o], r = Zc(e[o]) ? e[o] : e;
    t[o] = kn(i, r);
  }
  return t;
}
function Kc(n, e) {
  return ce(e) ? Ne(n, e) : e === !1 ? Ne(n, {}) : n;
}
function Zc(n) {
  return ce(n) || gc(n) || oe(n);
}
class Gc extends W {
  /**
   * Available methods
   *
   * @returns {SanitizerConfig}
   */
  get methods() {
    return {
      clean: (e, t) => this.clean(e, t)
    };
  }
  /**
   * Perform sanitizing of a string
   *
   * @param {string} taintString - what to sanitize
   * @param {SanitizerConfig} config - sanitizer config
   * @returns {string}
   */
  clean(e, t) {
    return Ne(e, t);
  }
}
class Jc extends W {
  /**
   * Available methods
   *
   * @returns {Saver}
   */
  get methods() {
    return {
      save: () => this.save()
    };
  }
  /**
   * Return Editor's data
   *
   * @returns {OutputData}
   */
  save() {
    const e = "Editor's content can not be saved in read-only mode";
    return this.Editor.ReadOnly.isEnabled ? (Ie(e, "warn"), Promise.reject(new Error(e))) : this.Editor.Saver.save();
  }
}
class Qc extends W {
  constructor() {
    super(...arguments), this.selectionUtils = new F();
  }
  /**
   * Available methods
   *
   * @returns {SelectionAPIInterface}
   */
  get methods() {
    return {
      findParentTag: (e, t) => this.findParentTag(e, t),
      expandToTag: (e) => this.expandToTag(e),
      save: () => this.selectionUtils.save(),
      restore: () => this.selectionUtils.restore(),
      setFakeBackground: () => this.selectionUtils.setFakeBackground(),
      removeFakeBackground: () => this.selectionUtils.removeFakeBackground()
    };
  }
  /**
   * Looks ahead from selection and find passed tag with class name
   *
   * @param {string} tagName - tag to find
   * @param {string} className - tag's class name
   * @returns {HTMLElement|null}
   */
  findParentTag(e, t) {
    return this.selectionUtils.findParentTag(e, t);
  }
  /**
   * Expand selection to passed tag
   *
   * @param {HTMLElement} node - tag that should contain selection
   */
  expandToTag(e) {
    this.selectionUtils.expandToTag(e);
  }
}
class ed extends W {
  /**
   * Available methods
   */
  get methods() {
    return {
      getBlockTools: () => Array.from(this.Editor.Tools.blockTools.values())
    };
  }
}
class td extends W {
  /**
   * Exported classes
   */
  get classes() {
    return {
      /**
       * Base Block styles
       */
      block: "cdx-block",
      /**
       * Inline Tools styles
       */
      inlineToolButton: "ce-inline-tool",
      inlineToolButtonActive: "ce-inline-tool--active",
      /**
       * UI elements
       */
      input: "cdx-input",
      loader: "cdx-loader",
      button: "cdx-button",
      /**
       * Settings styles
       */
      settingsButton: "cdx-settings-button",
      settingsButtonActive: "cdx-settings-button--active"
    };
  }
}
class od extends W {
  /**
   * Available methods
   *
   * @returns {Toolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open(),
      toggleBlockSettings: (e) => this.toggleBlockSettings(e),
      toggleToolbox: (e) => this.toggleToolbox(e)
    };
  }
  /**
   * Open toolbar
   */
  open() {
    this.Editor.Toolbar.moveAndOpen();
  }
  /**
   * Close toolbar and all included elements
   */
  close() {
    this.Editor.Toolbar.close();
  }
  /**
   * Toggles Block Setting of the current block
   *
   * @param {boolean} openingState —  opening state of Block Setting
   */
  toggleBlockSettings(e) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      Ie("Could't toggle the Toolbar because there is no block selected ", "warn");
      return;
    }
    e ?? !this.Editor.BlockSettings.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.open()) : this.Editor.BlockSettings.close();
  }
  /**
   * Open toolbox
   *
   * @param {boolean} openingState - Opening state of toolbox
   */
  toggleToolbox(e) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      Ie("Could't toggle the Toolbox because there is no block selected ", "warn");
      return;
    }
    e ?? !this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open()) : this.Editor.Toolbar.toolbox.close();
  }
}
var ps = { exports: {} };
/*!
 * CodeX.Tooltips
 * 
 * @version 1.0.5
 * 
 * @licence MIT
 * @author CodeX <https://codex.so>
 * 
 * 
 */
(function(n, e) {
  (function(t, o) {
    n.exports = o();
  })(window, function() {
    return function(t) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = o, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, (function(c) {
              return r[c];
            }).bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "", i(i.s = 0);
    }([function(t, o, i) {
      t.exports = i(1);
    }, function(t, o, i) {
      i.r(o), i.d(o, "default", function() {
        return r;
      });
      class r {
        constructor() {
          this.nodes = { wrapper: null, content: null }, this.showed = !1, this.offsetTop = 10, this.offsetLeft = 10, this.offsetRight = 10, this.hidingDelay = 0, this.handleWindowScroll = () => {
            this.showed && this.hide(!0);
          }, this.loadStyles(), this.prepare(), window.addEventListener("scroll", this.handleWindowScroll, { passive: !0 });
        }
        get CSS() {
          return { tooltip: "ct", tooltipContent: "ct__content", tooltipShown: "ct--shown", placement: { left: "ct--left", bottom: "ct--bottom", right: "ct--right", top: "ct--top" } };
        }
        show(a, l, c) {
          this.nodes.wrapper || this.prepare(), this.hidingTimeout && clearTimeout(this.hidingTimeout);
          const d = Object.assign({ placement: "bottom", marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, delay: 70, hidingDelay: 0 }, c);
          if (d.hidingDelay && (this.hidingDelay = d.hidingDelay), this.nodes.content.innerHTML = "", typeof l == "string")
            this.nodes.content.appendChild(document.createTextNode(l));
          else {
            if (!(l instanceof Node))
              throw Error("[CodeX Tooltip] Wrong type of «content» passed. It should be an instance of Node or String. But " + typeof l + " given.");
            this.nodes.content.appendChild(l);
          }
          switch (this.nodes.wrapper.classList.remove(...Object.values(this.CSS.placement)), d.placement) {
            case "top":
              this.placeTop(a, d);
              break;
            case "left":
              this.placeLeft(a, d);
              break;
            case "right":
              this.placeRight(a, d);
              break;
            case "bottom":
            default:
              this.placeBottom(a, d);
          }
          d && d.delay ? this.showingTimeout = setTimeout(() => {
            this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0;
          }, d.delay) : (this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0);
        }
        hide(a = !1) {
          if (this.hidingDelay && !a)
            return this.hidingTimeout && clearTimeout(this.hidingTimeout), void (this.hidingTimeout = setTimeout(() => {
              this.hide(!0);
            }, this.hidingDelay));
          this.nodes.wrapper.classList.remove(this.CSS.tooltipShown), this.showed = !1, this.showingTimeout && clearTimeout(this.showingTimeout);
        }
        onHover(a, l, c) {
          a.addEventListener("mouseenter", () => {
            this.show(a, l, c);
          }), a.addEventListener("mouseleave", () => {
            this.hide();
          });
        }
        destroy() {
          this.nodes.wrapper.remove(), window.removeEventListener("scroll", this.handleWindowScroll);
        }
        prepare() {
          this.nodes.wrapper = this.make("div", this.CSS.tooltip), this.nodes.content = this.make("div", this.CSS.tooltipContent), this.append(this.nodes.wrapper, this.nodes.content), this.append(document.body, this.nodes.wrapper);
        }
        loadStyles() {
          const a = "codex-tooltips-style";
          if (document.getElementById(a))
            return;
          const l = i(2), c = this.make("style", null, { textContent: l.toString(), id: a });
          this.prepend(document.head, c);
        }
        placeBottom(a, l) {
          const c = a.getBoundingClientRect(), d = c.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, u = c.bottom + window.pageYOffset + this.offsetTop + l.marginTop;
          this.applyPlacement("bottom", d, u);
        }
        placeTop(a, l) {
          const c = a.getBoundingClientRect(), d = c.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, u = c.top + window.pageYOffset - this.nodes.wrapper.clientHeight - this.offsetTop;
          this.applyPlacement("top", d, u);
        }
        placeLeft(a, l) {
          const c = a.getBoundingClientRect(), d = c.left - this.nodes.wrapper.offsetWidth - this.offsetLeft - l.marginLeft, u = c.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("left", d, u);
        }
        placeRight(a, l) {
          const c = a.getBoundingClientRect(), d = c.right + this.offsetRight + l.marginRight, u = c.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("right", d, u);
        }
        applyPlacement(a, l, c) {
          this.nodes.wrapper.classList.add(this.CSS.placement[a]), this.nodes.wrapper.style.left = l + "px", this.nodes.wrapper.style.top = c + "px";
        }
        make(a, l = null, c = {}) {
          const d = document.createElement(a);
          Array.isArray(l) ? d.classList.add(...l) : l && d.classList.add(l);
          for (const u in c)
            c.hasOwnProperty(u) && (d[u] = c[u]);
          return d;
        }
        append(a, l) {
          Array.isArray(l) ? l.forEach((c) => a.appendChild(c)) : a.appendChild(l);
        }
        prepend(a, l) {
          Array.isArray(l) ? (l = l.reverse()).forEach((c) => a.prepend(c)) : a.prepend(l);
        }
      }
    }, function(t, o) {
      t.exports = `.ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:"";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url("")){.ct:before{border-radius:0;-webkit-mask-box-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z"/></svg>') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:"";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}`;
    }]).default;
  });
})(ps);
var nd = ps.exports;
const id = /* @__PURE__ */ Eo(nd);
let Me = null;
function xn() {
  Me || (Me = new id());
}
function rd(n, e, t) {
  xn(), Me == null || Me.show(n, e, t);
}
function po(n = !1) {
  xn(), Me == null || Me.hide(n);
}
function fo(n, e, t) {
  xn(), Me == null || Me.onHover(n, e, t);
}
function sd() {
  Me == null || Me.destroy(), Me = null;
}
class ad extends W {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    });
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (e, t, o) => this.show(e, t, o),
      hide: () => this.hide(),
      onHover: (e, t, o) => this.onHover(e, t, o)
    };
  }
  /**
   * Method show tooltip on element with passed HTML content
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  show(e, t, o) {
    rd(e, t, o);
  }
  /**
   * Method hides tooltip on HTML page
   */
  hide() {
    po();
  }
  /**
   * Decorator for showing Tooltip by mouseenter/mouseleave
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  onHover(e, t, o) {
    fo(e, t, o);
  }
}
class ld extends W {
  /**
   * Available methods / getters
   */
  get methods() {
    return {
      nodes: this.editorNodes
      /**
       * There can be added some UI methods, like toggleThinMode() etc
       */
    };
  }
  /**
   * Exported classes
   */
  get editorNodes() {
    return {
      /**
       * Top-level editor instance wrapper
       */
      wrapper: this.Editor.UI.nodes.wrapper,
      /**
       * Element that holds all the Blocks
       */
      redactor: this.Editor.UI.nodes.redactor
    };
  }
}
function fs(n, e) {
  const t = {};
  return Object.entries(n).forEach(([o, i]) => {
    if (ce(i)) {
      const r = e ? `${e}.${o}` : o;
      Object.values(i).every((s) => ze(s)) ? t[o] = r : t[o] = fs(i, r);
      return;
    }
    t[o] = i;
  }), t;
}
const Se = fs(os);
function cd(n, e) {
  const t = {};
  return Object.keys(n).forEach((o) => {
    const i = e[o];
    i !== void 0 ? t[i] = n[o] : t[o] = n[o];
  }), t;
}
const gs = class At {
  /**
   * @param {HTMLElement[]} nodeList — the list of iterable HTML-items
   * @param {string} focusedCssClass - user-provided CSS-class that will be set in flipping process
   */
  constructor(e, t) {
    this.cursor = -1, this.items = [], this.items = e || [], this.focusedCssClass = t;
  }
  /**
   * Returns Focused button Node
   *
   * @returns {HTMLElement}
   */
  get currentItem() {
    return this.cursor === -1 ? null : this.items[this.cursor];
  }
  /**
   * Sets cursor to specified position
   *
   * @param cursorPosition - new cursor position
   */
  setCursor(e) {
    e < this.items.length && e >= -1 && (this.dropCursor(), this.cursor = e, this.items[this.cursor].classList.add(this.focusedCssClass));
  }
  /**
   * Sets items. Can be used when iterable items changed dynamically
   *
   * @param {HTMLElement[]} nodeList - nodes to iterate
   */
  setItems(e) {
    this.items = e;
  }
  /**
   * Sets cursor next to the current
   */
  next() {
    this.cursor = this.leafNodesAndReturnIndex(At.directions.RIGHT);
  }
  /**
   * Sets cursor before current
   */
  previous() {
    this.cursor = this.leafNodesAndReturnIndex(At.directions.LEFT);
  }
  /**
   * Sets cursor to the default position and removes CSS-class from previously focused item
   */
  dropCursor() {
    this.cursor !== -1 && (this.items[this.cursor].classList.remove(this.focusedCssClass), this.cursor = -1);
  }
  /**
   * Leafs nodes inside the target list from active element
   *
   * @param {string} direction - leaf direction. Can be 'left' or 'right'
   * @returns {number} index of focused node
   */
  leafNodesAndReturnIndex(e) {
    if (this.items.length === 0)
      return this.cursor;
    let t = this.cursor;
    return t === -1 ? t = e === At.directions.RIGHT ? -1 : 0 : this.items[t].classList.remove(this.focusedCssClass), e === At.directions.RIGHT ? t = (t + 1) % this.items.length : t = (this.items.length + t - 1) % this.items.length, k.canSetCaret(this.items[t]) && co(() => F.setCursor(this.items[t]), 50)(), this.items[t].classList.add(this.focusedCssClass), t;
  }
};
gs.directions = {
  RIGHT: "right",
  LEFT: "left"
};
let Lt = gs;
class rt {
  /**
   * @param options - different constructing settings
   */
  constructor(e) {
    this.iterator = null, this.activated = !1, this.flipCallbacks = [], this.onKeyDown = (t) => {
      if (!(!this.isEventReadyForHandling(t) || t.shiftKey === !0))
        switch (rt.usedKeys.includes(t.keyCode) && t.preventDefault(), t.keyCode) {
          case j.TAB:
            this.handleTabPress(t);
            break;
          case j.LEFT:
          case j.UP:
            this.flipLeft();
            break;
          case j.RIGHT:
          case j.DOWN:
            this.flipRight();
            break;
          case j.ENTER:
            this.handleEnterPress(t);
            break;
        }
    }, this.iterator = new Lt(e.items, e.focusedItemClass), this.activateCallback = e.activateCallback, this.allowedKeys = e.allowedKeys || rt.usedKeys;
  }
  /**
   * True if flipper is currently activated
   */
  get isActivated() {
    return this.activated;
  }
  /**
   * Array of keys (codes) that is handled by Flipper
   * Used to:
   *  - preventDefault only for this keys, not all keydowns (@see constructor)
   *  - to skip external behaviours only for these keys, when filler is activated (@see BlockEvents@arrowRightAndDown)
   */
  static get usedKeys() {
    return [
      j.TAB,
      j.LEFT,
      j.RIGHT,
      j.ENTER,
      j.UP,
      j.DOWN
    ];
  }
  /**
   * Active tab/arrows handling by flipper
   *
   * @param items - Some modules (like, InlineToolbar, BlockSettings) might refresh buttons dynamically
   * @param cursorPosition - index of the item that should be focused once flipper is activated
   */
  activate(e, t) {
    this.activated = !0, e && this.iterator.setItems(e), t !== void 0 && this.iterator.setCursor(t), document.addEventListener("keydown", this.onKeyDown, !0);
  }
  /**
   * Disable tab/arrows handling by flipper
   */
  deactivate() {
    this.activated = !1, this.dropCursor(), document.removeEventListener("keydown", this.onKeyDown);
  }
  /**
   * Focus first item
   */
  focusFirst() {
    this.dropCursor(), this.flipRight();
  }
  /**
   * Focuses previous flipper iterator item
   */
  flipLeft() {
    this.iterator.previous(), this.flipCallback();
  }
  /**
   * Focuses next flipper iterator item
   */
  flipRight() {
    this.iterator.next(), this.flipCallback();
  }
  /**
   * Return true if some button is focused
   */
  hasFocus() {
    return !!this.iterator.currentItem;
  }
  /**
   * Registeres function that should be executed on each navigation action
   *
   * @param cb - function to execute
   */
  onFlip(e) {
    this.flipCallbacks.push(e);
  }
  /**
   * Unregisteres function that is executed on each navigation action
   *
   * @param cb - function to stop executing
   */
  removeOnFlip(e) {
    this.flipCallbacks = this.flipCallbacks.filter((t) => t !== e);
  }
  /**
   * Drops flipper's iterator cursor
   *
   * @see DomIterator#dropCursor
   */
  dropCursor() {
    this.iterator.dropCursor();
  }
  /**
   * This function is fired before handling flipper keycodes
   * The result of this function defines if it is need to be handled or not
   *
   * @param {KeyboardEvent} event - keydown keyboard event
   * @returns {boolean}
   */
  isEventReadyForHandling(e) {
    return this.activated && this.allowedKeys.includes(e.keyCode);
  }
  /**
   * When flipper is activated tab press will leaf the items
   *
   * @param {KeyboardEvent} event - tab keydown event
   */
  handleTabPress(e) {
    switch (e.shiftKey ? Lt.directions.LEFT : Lt.directions.RIGHT) {
      case Lt.directions.RIGHT:
        this.flipRight();
        break;
      case Lt.directions.LEFT:
        this.flipLeft();
        break;
    }
  }
  /**
   * Enter press will click current item if flipper is activated
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  handleEnterPress(e) {
    this.activated && (this.iterator.currentItem && (e.stopPropagation(), e.preventDefault(), this.iterator.currentItem.click()), oe(this.activateCallback) && this.activateCallback(this.iterator.currentItem));
  }
  /**
   * Fired after flipping in any direction
   */
  flipCallback() {
    this.iterator.currentItem && this.iterator.currentItem.scrollIntoViewIfNeeded(), this.flipCallbacks.forEach((e) => e());
  }
}
const dd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>', ud = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>', hd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.5 17.5L9.64142 12.6414C9.56331 12.5633 9.56331 12.4367 9.64142 12.3586L14.5 7.5"/></svg>', pd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9.58284 17.5L14.4414 12.6414C14.5195 12.5633 14.5195 12.4367 14.4414 12.3586L9.58284 7.5"/></svg>', fd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>', gd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>', md = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>', vd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>', br = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>', bd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>', yd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>', ms = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M11.5 17.5L5 11M5 11V15.5M5 11H9.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12.5 6.5L19 13M19 13V8.5M19 13H14.5"/></svg>', wd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', kd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', xd = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><line x1="12" x2="12" y1="9" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 15.02V15.01"/></svg>', Cd = "__", Ed = "--";
function Ze(n) {
  return (e, t) => [[n, e].filter((o) => !!o).join(Cd), t].filter((o) => !!o).join(Ed);
}
const Ot = Ze("ce-hint"), Mt = {
  root: Ot(),
  alignedStart: Ot(null, "align-left"),
  alignedCenter: Ot(null, "align-center"),
  title: Ot("title"),
  description: Ot("description")
};
class Td {
  /**
   * Constructs the hint content instance
   *
   * @param params - hint content parameters
   */
  constructor(e) {
    this.nodes = {
      root: k.make("div", [Mt.root, e.alignment === "center" ? Mt.alignedCenter : Mt.alignedStart]),
      title: k.make("div", Mt.title, { textContent: e.title })
    }, this.nodes.root.appendChild(this.nodes.title), e.description !== void 0 && (this.nodes.description = k.make("div", Mt.description, { textContent: e.description }), this.nodes.root.appendChild(this.nodes.description));
  }
  /**
   * Returns the root element of the hint content
   */
  getElement() {
    return this.nodes.root;
  }
}
class Cn {
  /**
   * Constructs the instance
   *
   * @param params - instance parameters
   */
  constructor(e) {
    this.params = e;
  }
  /**
   * Item name if exists
   */
  get name() {
    if (this.params !== void 0 && "name" in this.params)
      return this.params.name;
  }
  /**
   * Destroys the instance
   */
  destroy() {
    po();
  }
  /**
   * Called when children popover is opened (if exists)
   */
  onChildrenOpen() {
    var e;
    this.params !== void 0 && "children" in this.params && typeof ((e = this.params.children) == null ? void 0 : e.onOpen) == "function" && this.params.children.onOpen();
  }
  /**
   * Called when children popover is closed (if exists)
   */
  onChildrenClose() {
    var e;
    this.params !== void 0 && "children" in this.params && typeof ((e = this.params.children) == null ? void 0 : e.onClose) == "function" && this.params.children.onClose();
  }
  /**
   * Called on popover item click
   */
  handleClick() {
    var e, t;
    this.params !== void 0 && "onActivate" in this.params && ((t = (e = this.params).onActivate) == null || t.call(e, this.params));
  }
  /**
   * Adds hint to the item element if hint data is provided
   *
   * @param itemElement - popover item root element to add hint to
   * @param hintData - hint data
   */
  addHint(e, t) {
    const o = new Td(t);
    fo(e, o.getElement(), {
      placement: t.position,
      hidingDelay: 100
    });
  }
  /**
   * Returns item children that are represented as popover items
   */
  get children() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.items) !== void 0 ? this.params.children.items : [];
  }
  /**
   * Returns true if item has any type of children
   */
  get hasChildren() {
    return this.children.length > 0;
  }
  /**
   * Returns true if item children should be open instantly after popover is opened and not on item click/hover
   */
  get isChildrenOpen() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.isOpen) === !0;
  }
  /**
   * True if item children items should be navigatable via keyboard
   */
  get isChildrenFlippable() {
    var e;
    return !(this.params === void 0 || !("children" in this.params) || ((e = this.params.children) == null ? void 0 : e.isFlippable) === !1);
  }
  /**
   * Returns true if item has children that should be searchable
   */
  get isChildrenSearchable() {
    var e;
    return this.params !== void 0 && "children" in this.params && ((e = this.params.children) == null ? void 0 : e.searchable) === !0;
  }
  /**
   * True if popover should close once item is activated
   */
  get closeOnActivate() {
    return this.params !== void 0 && "closeOnActivate" in this.params && this.params.closeOnActivate;
  }
  /**
   * True if item is active
   */
  get isActive() {
    return this.params === void 0 || !("isActive" in this.params) ? !1 : typeof this.params.isActive == "function" ? this.params.isActive() : this.params.isActive === !0;
  }
}
const Ce = Ze("ce-popover-item"), ne = {
  container: Ce(),
  active: Ce(null, "active"),
  disabled: Ce(null, "disabled"),
  focused: Ce(null, "focused"),
  hidden: Ce(null, "hidden"),
  confirmationState: Ce(null, "confirmation"),
  noHover: Ce(null, "no-hover"),
  noFocus: Ce(null, "no-focus"),
  title: Ce("title"),
  secondaryTitle: Ce("secondary-title"),
  icon: Ce("icon"),
  iconTool: Ce("icon", "tool"),
  iconChevronRight: Ce("icon", "chevron-right"),
  wobbleAnimation: Ze("wobble")()
};
class tt extends Cn {
  /**
   * Constructs popover item instance
   *
   * @param params - popover item construction params
   * @param renderParams - popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    super(e), this.params = e, this.nodes = {
      root: null,
      icon: null
    }, this.confirmationState = null, this.removeSpecialFocusBehavior = () => {
      var o;
      (o = this.nodes.root) == null || o.classList.remove(ne.noFocus);
    }, this.removeSpecialHoverBehavior = () => {
      var o;
      (o = this.nodes.root) == null || o.classList.remove(ne.noHover);
    }, this.onErrorAnimationEnd = () => {
      var o, i;
      (o = this.nodes.icon) == null || o.classList.remove(ne.wobbleAnimation), (i = this.nodes.icon) == null || i.removeEventListener("animationend", this.onErrorAnimationEnd);
    }, this.nodes.root = this.make(e, t);
  }
  /**
   * True if item is disabled and hence not clickable
   */
  get isDisabled() {
    return this.params.isDisabled === !0;
  }
  /**
   * Exposes popover item toggle parameter
   */
  get toggle() {
    return this.params.toggle;
  }
  /**
   * Item title
   */
  get title() {
    return this.params.title;
  }
  /**
   * True if confirmation state is enabled for popover item
   */
  get isConfirmationStateEnabled() {
    return this.confirmationState !== null;
  }
  /**
   * True if item is focused in keyboard navigation process
   */
  get isFocused() {
    return this.nodes.root === null ? !1 : this.nodes.root.classList.contains(ne.focused);
  }
  /**
   * Returns popover item root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Called on popover item click
   */
  handleClick() {
    if (this.isConfirmationStateEnabled && this.confirmationState !== null) {
      this.activateOrEnableConfirmationMode(this.confirmationState);
      return;
    }
    this.activateOrEnableConfirmationMode(this.params);
  }
  /**
   * Toggles item active state
   *
   * @param isActive - true if item should strictly should become active
   */
  toggleActive(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(ne.active, e);
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(ne.hidden, e);
  }
  /**
   * Resets popover item to its original state
   */
  reset() {
    this.isConfirmationStateEnabled && this.disableConfirmationMode();
  }
  /**
   * Method called once item becomes focused during keyboard navigation
   */
  onFocus() {
    this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Constructs HTML element corresponding to popover item params
   *
   * @param params - item construction params
   * @param renderParams - popover item render params
   */
  make(e, t) {
    var o, i;
    const r = (t == null ? void 0 : t.wrapperTag) || "div", s = k.make(r, ne.container, {
      type: r === "button" ? "button" : void 0
    });
    return e.name && (s.dataset.itemName = e.name), this.nodes.icon = k.make("div", [ne.icon, ne.iconTool], {
      innerHTML: e.icon || md
    }), s.appendChild(this.nodes.icon), e.title !== void 0 && s.appendChild(k.make("div", ne.title, {
      innerHTML: e.title || ""
    })), e.secondaryLabel && s.appendChild(k.make("div", ne.secondaryTitle, {
      textContent: e.secondaryLabel
    })), this.hasChildren && s.appendChild(k.make("div", [ne.icon, ne.iconChevronRight], {
      innerHTML: pd
    })), this.isActive && s.classList.add(ne.active), e.isDisabled && s.classList.add(ne.disabled), e.hint !== void 0 && ((o = t == null ? void 0 : t.hint) == null ? void 0 : o.enabled) !== !1 && this.addHint(s, {
      ...e.hint,
      position: ((i = t == null ? void 0 : t.hint) == null ? void 0 : i.position) || "right"
    }), s;
  }
  /**
   * Activates confirmation mode for the item.
   *
   * @param newState - new popover item params that should be applied
   */
  enableConfirmationMode(e) {
    if (this.nodes.root === null)
      return;
    const t = {
      ...this.params,
      ...e,
      confirmation: "confirmation" in e ? e.confirmation : void 0
    }, o = this.make(t);
    this.nodes.root.innerHTML = o.innerHTML, this.nodes.root.classList.add(ne.confirmationState), this.confirmationState = e, this.enableSpecialHoverAndFocusBehavior();
  }
  /**
   * Returns item to its original state
   */
  disableConfirmationMode() {
    if (this.nodes.root === null)
      return;
    const e = this.make(this.params);
    this.nodes.root.innerHTML = e.innerHTML, this.nodes.root.classList.remove(ne.confirmationState), this.confirmationState = null, this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Enables special focus and hover behavior for item in confirmation state.
   * This is needed to prevent item from being highlighted as hovered/focused just after click.
   */
  enableSpecialHoverAndFocusBehavior() {
    var e, t, o;
    (e = this.nodes.root) == null || e.classList.add(ne.noHover), (t = this.nodes.root) == null || t.classList.add(ne.noFocus), (o = this.nodes.root) == null || o.addEventListener("mouseleave", this.removeSpecialHoverBehavior, { once: !0 });
  }
  /**
   * Disables special focus and hover behavior
   */
  disableSpecialHoverAndFocusBehavior() {
    var e;
    this.removeSpecialFocusBehavior(), this.removeSpecialHoverBehavior(), (e = this.nodes.root) == null || e.removeEventListener("mouseleave", this.removeSpecialHoverBehavior);
  }
  /**
   * Executes item's onActivate callback if the item has no confirmation configured
   *
   * @param item - item to activate or bring to confirmation mode
   */
  activateOrEnableConfirmationMode(e) {
    var t;
    if (!("confirmation" in e) || e.confirmation === void 0)
      try {
        (t = e.onActivate) == null || t.call(e, e), this.disableConfirmationMode();
      } catch {
        this.animateError();
      }
    else
      this.enableConfirmationMode(e.confirmation);
  }
  /**
   * Animates item which symbolizes that error occured while executing 'onActivate()' callback
   */
  animateError() {
    var e, t, o;
    (e = this.nodes.icon) != null && e.classList.contains(ne.wobbleAnimation) || ((t = this.nodes.icon) == null || t.classList.add(ne.wobbleAnimation), (o = this.nodes.icon) == null || o.addEventListener("animationend", this.onErrorAnimationEnd));
  }
}
const Ko = Ze("ce-popover-item-separator"), Zo = {
  container: Ko(),
  line: Ko("line"),
  hidden: Ko(null, "hidden")
};
class vs extends Cn {
  /**
   * Constructs the instance
   */
  constructor() {
    super(), this.nodes = {
      root: k.make("div", Zo.container),
      line: k.make("div", Zo.line)
    }, this.nodes.root.appendChild(this.nodes.line);
  }
  /**
   * Returns popover separator root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(Zo.hidden, e);
  }
}
var Pe = /* @__PURE__ */ ((n) => (n.Closed = "closed", n.ClosedOnActivate = "closed-on-activate", n))(Pe || {});
const ge = Ze("ce-popover"), se = {
  popover: ge(),
  popoverContainer: ge("container"),
  popoverOpenTop: ge(null, "open-top"),
  popoverOpenLeft: ge(null, "open-left"),
  popoverOpened: ge(null, "opened"),
  search: ge("search"),
  nothingFoundMessage: ge("nothing-found-message"),
  nothingFoundMessageDisplayed: ge("nothing-found-message", "displayed"),
  items: ge("items"),
  overlay: ge("overlay"),
  overlayHidden: ge("overlay", "hidden"),
  popoverNested: ge(null, "nested"),
  getPopoverNestedClass: (n) => ge(null, `nested-level-${n.toString()}`),
  popoverInline: ge(null, "inline"),
  popoverHeader: ge("header")
};
var bt = /* @__PURE__ */ ((n) => (n.NestingLevel = "--nesting-level", n.PopoverHeight = "--popover-height", n.InlinePopoverWidth = "--inline-popover-width", n.TriggerItemLeft = "--trigger-item-left", n.TriggerItemTop = "--trigger-item-top", n))(bt || {});
const yr = Ze("ce-popover-item-html"), wr = {
  root: yr(),
  hidden: yr(null, "hidden")
};
class $t extends Cn {
  /**
   * Constructs the instance
   *
   * @param params – instance parameters
   * @param renderParams – popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    var o, i;
    super(e), this.nodes = {
      root: k.make("div", wr.root)
    }, this.nodes.root.appendChild(e.element), e.name && (this.nodes.root.dataset.itemName = e.name), e.hint !== void 0 && ((o = t == null ? void 0 : t.hint) == null ? void 0 : o.enabled) !== !1 && this.addHint(this.nodes.root, {
      ...e.hint,
      position: ((i = t == null ? void 0 : t.hint) == null ? void 0 : i.position) || "right"
    });
  }
  /**
   * Returns popover item root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    var t;
    (t = this.nodes.root) == null || t.classList.toggle(wr.hidden, e);
  }
  /**
   * Returns list of buttons and inputs inside custom content
   */
  getControls() {
    const e = this.nodes.root.querySelectorAll(
      `button, ${k.allInputsSelector}`
    );
    return Array.from(e);
  }
}
class bs extends Zt {
  /**
   * Constructs the instance
   *
   * @param params - popover construction params
   * @param itemsRenderParams - popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t = {}) {
    super(), this.params = e, this.itemsRenderParams = t, this.listeners = new Gt(), this.messages = {
      nothingFound: "Nothing found",
      search: "Search"
    }, this.items = this.buildItems(e.items), e.messages && (this.messages = {
      ...this.messages,
      ...e.messages
    }), this.nodes = {}, this.nodes.popoverContainer = k.make("div", [se.popoverContainer]), this.nodes.nothingFoundMessage = k.make("div", [se.nothingFoundMessage], {
      textContent: this.messages.nothingFound
    }), this.nodes.popoverContainer.appendChild(this.nodes.nothingFoundMessage), this.nodes.items = k.make("div", [se.items]), this.items.forEach((o) => {
      const i = o.getElement();
      i !== null && this.nodes.items.appendChild(i);
    }), this.nodes.popoverContainer.appendChild(this.nodes.items), this.listeners.on(this.nodes.popoverContainer, "click", (o) => this.handleClick(o)), this.nodes.popover = k.make("div", [
      se.popover,
      this.params.class
    ]), this.nodes.popover.appendChild(this.nodes.popoverContainer);
  }
  /**
   * List of default popover items that are searchable and may have confirmation state
   */
  get itemsDefault() {
    return this.items.filter((e) => e instanceof tt);
  }
  /**
   * Returns HTML element corresponding to the popover
   */
  getElement() {
    return this.nodes.popover;
  }
  /**
   * Open popover
   */
  show() {
    this.nodes.popover.classList.add(se.popoverOpened), this.search !== void 0 && this.search.focus();
  }
  /**
   * Closes popover
   */
  hide() {
    this.nodes.popover.classList.remove(se.popoverOpened), this.nodes.popover.classList.remove(se.popoverOpenTop), this.itemsDefault.forEach((e) => e.reset()), this.search !== void 0 && this.search.clear(), this.emit(Pe.Closed);
  }
  /**
   * Clears memory
   */
  destroy() {
    var e;
    this.items.forEach((t) => t.destroy()), this.nodes.popover.remove(), this.listeners.removeAll(), (e = this.search) == null || e.destroy();
  }
  /**
   * Looks for the item by name and imitates click on it
   *
   * @param name - name of the item to activate
   */
  activateItemByName(e) {
    const t = this.items.find((o) => o.name === e);
    this.handleItemClick(t);
  }
  /**
   * Factory method for creating popover items
   *
   * @param items - list of items params
   */
  buildItems(e) {
    return e.map((t) => {
      switch (t.type) {
        case ee.Separator:
          return new vs();
        case ee.Html:
          return new $t(t, this.itemsRenderParams[ee.Html]);
        default:
          return new tt(t, this.itemsRenderParams[ee.Default]);
      }
    });
  }
  /**
   * Retrieves popover item that is the target of the specified event
   *
   * @param event - event to retrieve popover item from
   */
  getTargetItem(e) {
    return this.items.filter((t) => t instanceof tt || t instanceof $t).find((t) => {
      const o = t.getElement();
      return o === null ? !1 : e.composedPath().includes(o);
    });
  }
  /**
   * Handles popover item click
   *
   * @param item - item to handle click of
   */
  handleItemClick(e) {
    if (!("isDisabled" in e && e.isDisabled)) {
      if (e.hasChildren) {
        this.showNestedItems(e), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick();
        return;
      }
      this.itemsDefault.filter((t) => t !== e).forEach((t) => t.reset()), "handleClick" in e && typeof e.handleClick == "function" && e.handleClick(), this.toggleItemActivenessIfNeeded(e), e.closeOnActivate && (this.hide(), this.emit(Pe.ClosedOnActivate));
    }
  }
  /**
   * Handles clicks inside popover
   *
   * @param event - item to handle click of
   */
  handleClick(e) {
    const t = this.getTargetItem(e);
    t !== void 0 && this.handleItemClick(t);
  }
  /**
   * - Toggles item active state, if clicked popover item has property 'toggle' set to true.
   *
   * - Performs radiobutton-like behavior if the item has property 'toggle' set to string key.
   * (All the other items with the same key get inactive, and the item gets active)
   *
   * @param clickedItem - popover item that was clicked
   */
  toggleItemActivenessIfNeeded(e) {
    if (e instanceof tt && (e.toggle === !0 && e.toggleActive(), typeof e.toggle == "string")) {
      const t = this.itemsDefault.filter((o) => o.toggle === e.toggle);
      if (t.length === 1) {
        e.toggleActive();
        return;
      }
      t.forEach((o) => {
        o.toggleActive(o === e);
      });
    }
  }
}
var go = /* @__PURE__ */ ((n) => (n.Search = "search", n))(go || {});
const Go = Ze("cdx-search-field"), Jo = {
  wrapper: Go(),
  icon: Go("icon"),
  input: Go("input")
};
class Sd extends Zt {
  /**
   * @param options - available config
   * @param options.items - searchable items list
   * @param options.placeholder - input placeholder
   */
  constructor({ items: e, placeholder: t }) {
    super(), this.listeners = new Gt(), this.items = e, this.wrapper = k.make("div", Jo.wrapper);
    const o = k.make("div", Jo.icon, {
      innerHTML: wd
    });
    this.input = k.make("input", Jo.input, {
      placeholder: t,
      /**
       * Used to prevent focusing on the input by Tab key
       * (Popover in the Toolbar lays below the blocks,
       * so Tab in the last block will focus this hidden input if this property is not set)
       */
      tabIndex: -1
    }), this.wrapper.appendChild(o), this.wrapper.appendChild(this.input), this.listeners.on(this.input, "input", () => {
      this.searchQuery = this.input.value, this.emit(go.Search, {
        query: this.searchQuery,
        items: this.foundItems
      });
    });
  }
  /**
   * Returns search field element
   */
  getElement() {
    return this.wrapper;
  }
  /**
   * Sets focus to the input
   */
  focus() {
    this.input.focus();
  }
  /**
   * Clears search query and results
   */
  clear() {
    this.input.value = "", this.searchQuery = "", this.emit(go.Search, {
      query: "",
      items: this.foundItems
    });
  }
  /**
   * Clears memory
   */
  destroy() {
    this.listeners.removeAll();
  }
  /**
   * Returns list of found items for the current search query
   */
  get foundItems() {
    return this.items.filter((e) => this.checkItem(e));
  }
  /**
   * Contains logic for checking whether passed item conforms the search query
   *
   * @param item - item to be checked
   */
  checkItem(e) {
    var t, o;
    const i = ((t = e.title) == null ? void 0 : t.toLowerCase()) || "", r = (o = this.searchQuery) == null ? void 0 : o.toLowerCase();
    return r !== void 0 ? i.includes(r) : !1;
  }
}
var Bd = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, Ld = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Id(e, t) : e, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && Bd(e, t, i), i;
};
const ys = class ws extends bs {
  /**
   * Construct the instance
   *
   * @param params - popover params
   * @param itemsRenderParams – popover item render params.
   * The parameters that are not set by user via popover api but rather depend on technical implementation
   */
  constructor(e, t) {
    super(e, t), this.nestingLevel = 0, this.nestedPopoverTriggerItem = null, this.previouslyHoveredItem = null, this.scopeElement = document.body, this.hide = () => {
      var o;
      super.hide(), this.destroyNestedPopoverIfExists(), (o = this.flipper) == null || o.deactivate(), this.previouslyHoveredItem = null;
    }, this.onFlip = () => {
      const o = this.itemsDefault.find((i) => i.isFocused);
      o == null || o.onFocus();
    }, this.onSearch = (o) => {
      var i;
      const r = o.query === "", s = o.items.length === 0;
      this.items.forEach((l) => {
        let c = !1;
        l instanceof tt ? c = !o.items.includes(l) : (l instanceof vs || l instanceof $t) && (c = s || !r), l.toggleHidden(c);
      }), this.toggleNothingFoundMessage(s);
      const a = o.query === "" ? this.flippableElements : o.items.map((l) => l.getElement());
      (i = this.flipper) != null && i.isActivated && (this.flipper.deactivate(), this.flipper.activate(a));
    }, e.nestingLevel !== void 0 && (this.nestingLevel = e.nestingLevel), this.nestingLevel > 0 && this.nodes.popover.classList.add(se.popoverNested), e.scopeElement !== void 0 && (this.scopeElement = e.scopeElement), this.nodes.popoverContainer !== null && this.listeners.on(this.nodes.popoverContainer, "mouseover", (o) => this.handleHover(o)), e.searchable && this.addSearch(), e.flippable !== !1 && (this.flipper = new rt({
      items: this.flippableElements,
      focusedItemClass: ne.focused,
      allowedKeys: [
        j.TAB,
        j.UP,
        j.DOWN,
        j.ENTER
      ]
    }), this.flipper.onFlip(this.onFlip));
  }
  /**
   * Returns true if some item inside popover is focused
   */
  hasFocus() {
    return this.flipper === void 0 ? !1 : this.flipper.hasFocus();
  }
  /**
   * Scroll position inside items container of the popover
   */
  get scrollTop() {
    return this.nodes.items === null ? 0 : this.nodes.items.scrollTop;
  }
  /**
   * Returns visible element offset top
   */
  get offsetTop() {
    return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetTop;
  }
  /**
   * Open popover
   */
  show() {
    var e;
    this.nodes.popover.style.setProperty(bt.PopoverHeight, this.size.height + "px"), this.shouldOpenBottom || this.nodes.popover.classList.add(se.popoverOpenTop), this.shouldOpenRight || this.nodes.popover.classList.add(se.popoverOpenLeft), super.show(), (e = this.flipper) == null || e.activate(this.flippableElements);
  }
  /**
   * Clears memory
   */
  destroy() {
    this.hide(), super.destroy();
  }
  /**
   * Handles displaying nested items for the item.
   *
   * @param item – item to show nested popover for
   */
  showNestedItems(e) {
    this.nestedPopover !== null && this.nestedPopover !== void 0 || (this.nestedPopoverTriggerItem = e, this.showNestedPopoverForItem(e));
  }
  /**
   * Handles hover events inside popover items container
   *
   * @param event - hover event data
   */
  handleHover(e) {
    const t = this.getTargetItem(e);
    t !== void 0 && this.previouslyHoveredItem !== t && (this.destroyNestedPopoverIfExists(), this.previouslyHoveredItem = t, t.hasChildren && this.showNestedPopoverForItem(t));
  }
  /**
   * Sets CSS variable with position of item near which nested popover should be displayed.
   * Is used for correct positioning of the nested popover
   *
   * @param nestedPopoverEl - nested popover element
   * @param item – item near which nested popover should be displayed
   */
  setTriggerItemPosition(e, t) {
    const o = t.getElement(), i = (o ? o.offsetTop : 0) - this.scrollTop, r = this.offsetTop + i;
    e.style.setProperty(bt.TriggerItemTop, r + "px");
  }
  /**
   * Destroys existing nested popover
   */
  destroyNestedPopoverIfExists() {
    var e, t;
    this.nestedPopover === void 0 || this.nestedPopover === null || (this.nestedPopover.off(Pe.ClosedOnActivate, this.hide), this.nestedPopover.hide(), this.nestedPopover.destroy(), this.nestedPopover.getElement().remove(), this.nestedPopover = null, (e = this.flipper) == null || e.activate(this.flippableElements), (t = this.nestedPopoverTriggerItem) == null || t.onChildrenClose());
  }
  /**
   * Creates and displays nested popover for specified item.
   * Is used only on desktop
   *
   * @param item - item to display nested popover by
   */
  showNestedPopoverForItem(e) {
    var t;
    this.nestedPopover = new ws({
      searchable: e.isChildrenSearchable,
      items: e.children,
      nestingLevel: this.nestingLevel + 1,
      flippable: e.isChildrenFlippable,
      messages: this.messages
    }), e.onChildrenOpen(), this.nestedPopover.on(Pe.ClosedOnActivate, this.hide);
    const o = this.nestedPopover.getElement();
    return this.nodes.popover.appendChild(o), this.setTriggerItemPosition(o, e), o.style.setProperty(bt.NestingLevel, this.nestedPopover.nestingLevel.toString()), this.nestedPopover.show(), (t = this.flipper) == null || t.deactivate(), this.nestedPopover;
  }
  /**
   * Checks if popover should be opened bottom.
   * It should happen when there is enough space below or not enough space above
   */
  get shouldOpenBottom() {
    if (this.nodes.popover === void 0 || this.nodes.popover === null)
      return !1;
    const e = this.nodes.popoverContainer.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), o = this.size.height, i = e.top + o, r = e.top - o, s = Math.min(window.innerHeight, t.bottom);
    return r < t.top || i <= s;
  }
  /**
   * Checks if popover should be opened left.
   * It should happen when there is enough space in the right or not enough space in the left
   */
  get shouldOpenRight() {
    if (this.nodes.popover === void 0 || this.nodes.popover === null)
      return !1;
    const e = this.nodes.popover.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), o = this.size.width, i = e.right + o, r = e.left - o, s = Math.min(window.innerWidth, t.right);
    return r < t.left || i <= s;
  }
  get size() {
    var e;
    const t = {
      height: 0,
      width: 0
    };
    if (this.nodes.popover === null)
      return t;
    const o = this.nodes.popover.cloneNode(!0);
    o.style.visibility = "hidden", o.style.position = "absolute", o.style.top = "-1000px", o.classList.add(se.popoverOpened), (e = o.querySelector("." + se.popoverNested)) == null || e.remove(), document.body.appendChild(o);
    const i = o.querySelector("." + se.popoverContainer);
    return t.height = i.offsetHeight, t.width = i.offsetWidth, o.remove(), t;
  }
  /**
   * Returns list of elements available for keyboard navigation.
   */
  get flippableElements() {
    return this.items.map((e) => {
      if (e instanceof tt)
        return e.getElement();
      if (e instanceof $t)
        return e.getControls();
    }).flat().filter((e) => e != null);
  }
  /**
   * Adds search to the popover
   */
  addSearch() {
    this.search = new Sd({
      items: this.itemsDefault,
      placeholder: this.messages.search
    }), this.search.on(go.Search, this.onSearch);
    const e = this.search.getElement();
    e.classList.add(se.search), this.nodes.popoverContainer.insertBefore(e, this.nodes.popoverContainer.firstChild);
  }
  /**
   * Toggles nothing found message visibility
   *
   * @param isDisplayed - true if the message should be displayed
   */
  toggleNothingFoundMessage(e) {
    this.nodes.nothingFoundMessage.classList.toggle(se.nothingFoundMessageDisplayed, e);
  }
};
Ld([
  Et
], ys.prototype, "size", 1);
let En = ys;
class Od extends En {
  /**
   * Constructs the instance
   *
   * @param params - instance parameters
   */
  constructor(e) {
    const t = !Tt();
    super(
      {
        ...e,
        class: se.popoverInline
      },
      {
        [ee.Default]: {
          /**
           * We use button instead of div here to fix bug associated with focus loss (which leads to selection change) on click in safari
           *
           * @todo figure out better way to solve the issue
           */
          wrapperTag: "button",
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        },
        [ee.Html]: {
          hint: {
            position: "top",
            alignment: "center",
            enabled: t
          }
        }
      }
    ), this.items.forEach((o) => {
      !(o instanceof tt) && !(o instanceof $t) || o.hasChildren && o.isChildrenOpen && this.showNestedItems(o);
    });
  }
  /**
   * Returns visible element offset top
   */
  get offsetLeft() {
    return this.nodes.popoverContainer === null ? 0 : this.nodes.popoverContainer.offsetLeft;
  }
  /**
   * Open popover
   */
  show() {
    this.nestingLevel === 0 && this.nodes.popover.style.setProperty(
      bt.InlinePopoverWidth,
      this.size.width + "px"
    ), super.show();
  }
  /**
   * Disable hover event handling.
   * Overrides parent's class behavior
   */
  handleHover() {
  }
  /**
   * Sets CSS variable with position of item near which nested popover should be displayed.
   * Is used to position nested popover right below clicked item
   *
   * @param nestedPopoverEl - nested popover element
   * @param item – item near which nested popover should be displayed
   */
  setTriggerItemPosition(e, t) {
    const o = t.getElement(), i = o ? o.offsetLeft : 0, r = this.offsetLeft + i;
    e.style.setProperty(
      bt.TriggerItemLeft,
      r + "px"
    );
  }
  /**
   * Handles displaying nested items for the item.
   * Overriding in order to add toggling behaviour
   *
   * @param item – item to toggle nested popover for
   */
  showNestedItems(e) {
    if (this.nestedPopoverTriggerItem === e) {
      this.destroyNestedPopoverIfExists(), this.nestedPopoverTriggerItem = null;
      return;
    }
    super.showNestedItems(e);
  }
  /**
   * Creates and displays nested popover for specified item.
   * Is used only on desktop
   *
   * @param item - item to display nested popover by
   */
  showNestedPopoverForItem(e) {
    const t = super.showNestedPopoverForItem(e);
    return t.getElement().classList.add(se.getPopoverNestedClass(t.nestingLevel)), t;
  }
  /**
   * Overrides default item click handling.
   * Helps to close nested popover once other item is clicked.
   *
   * @param item - clicked item
   */
  handleItemClick(e) {
    var t;
    e !== this.nestedPopoverTriggerItem && ((t = this.nestedPopoverTriggerItem) == null || t.handleClick(), super.destroyNestedPopoverIfExists()), super.handleItemClick(e);
  }
}
const ks = class _t {
  constructor() {
    this.scrollPosition = null;
  }
  /**
   * Locks body element scroll
   */
  lock() {
    ln ? this.lockHard() : document.body.classList.add(_t.CSS.scrollLocked);
  }
  /**
   * Unlocks body element scroll
   */
  unlock() {
    ln ? this.unlockHard() : document.body.classList.remove(_t.CSS.scrollLocked);
  }
  /**
   * Locks scroll in a hard way (via setting fixed position to body element)
   */
  lockHard() {
    this.scrollPosition = window.pageYOffset, document.documentElement.style.setProperty(
      "--window-scroll-offset",
      `${this.scrollPosition}px`
    ), document.body.classList.add(_t.CSS.scrollLockedHard);
  }
  /**
   * Unlocks hard scroll lock
   */
  unlockHard() {
    document.body.classList.remove(_t.CSS.scrollLockedHard), this.scrollPosition !== null && window.scrollTo(0, this.scrollPosition), this.scrollPosition = null;
  }
};
ks.CSS = {
  scrollLocked: "ce-scroll-locked",
  scrollLockedHard: "ce-scroll-locked--hard"
};
let Md = ks;
const Qo = Ze("ce-popover-header"), en = {
  root: Qo(),
  text: Qo("text"),
  backButton: Qo("back-button")
};
class Ad {
  /**
   * Constructs the instance
   *
   * @param params - popover header params
   */
  constructor({ text: e, onBackButtonClick: t }) {
    this.listeners = new Gt(), this.text = e, this.onBackButtonClick = t, this.nodes = {
      root: k.make("div", [en.root]),
      backButton: k.make("button", [en.backButton]),
      text: k.make("div", [en.text])
    }, this.nodes.backButton.innerHTML = hd, this.nodes.root.appendChild(this.nodes.backButton), this.listeners.on(this.nodes.backButton, "click", this.onBackButtonClick), this.nodes.text.innerText = this.text, this.nodes.root.appendChild(this.nodes.text);
  }
  /**
   * Returns popover header root html element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Destroys the instance
   */
  destroy() {
    this.nodes.root.remove(), this.listeners.destroy();
  }
}
class _d {
  constructor() {
    this.history = [];
  }
  /**
   * Push new popover state
   *
   * @param state - new state
   */
  push(e) {
    this.history.push(e);
  }
  /**
   * Pop last popover state
   */
  pop() {
    return this.history.pop();
  }
  /**
   * Title retrieved from the current state
   */
  get currentTitle() {
    return this.history.length === 0 ? "" : this.history[this.history.length - 1].title;
  }
  /**
   * Items list retrieved from the current state
   */
  get currentItems() {
    return this.history.length === 0 ? [] : this.history[this.history.length - 1].items;
  }
  /**
   * Returns history to initial popover state
   */
  reset() {
    for (; this.history.length > 1; )
      this.pop();
  }
}
class xs extends bs {
  /**
   * Construct the instance
   *
   * @param params - popover params
   */
  constructor(e) {
    super(e, {
      [ee.Default]: {
        hint: {
          enabled: !1
        }
      },
      [ee.Html]: {
        hint: {
          enabled: !1
        }
      }
    }), this.scrollLocker = new Md(), this.history = new _d(), this.isHidden = !0, this.nodes.overlay = k.make("div", [se.overlay, se.overlayHidden]), this.nodes.popover.insertBefore(this.nodes.overlay, this.nodes.popover.firstChild), this.listeners.on(this.nodes.overlay, "click", () => {
      this.hide();
    }), this.history.push({ items: e.items });
  }
  /**
   * Open popover
   */
  show() {
    this.nodes.overlay.classList.remove(se.overlayHidden), super.show(), this.scrollLocker.lock(), this.isHidden = !1;
  }
  /**
   * Closes popover
   */
  hide() {
    this.isHidden || (super.hide(), this.nodes.overlay.classList.add(se.overlayHidden), this.scrollLocker.unlock(), this.history.reset(), this.isHidden = !0);
  }
  /**
   * Clears memory
   */
  destroy() {
    super.destroy(), this.scrollLocker.unlock();
  }
  /**
   * Handles displaying nested items for the item
   *
   * @param item – item to show nested popover for
   */
  showNestedItems(e) {
    this.updateItemsAndHeader(e.children, e.title), this.history.push({
      title: e.title,
      items: e.children
    });
  }
  /**
   * Removes rendered popover items and header and displays new ones
   *
   * @param items - new popover items
   * @param title - new popover header text
   */
  updateItemsAndHeader(e, t) {
    if (this.header !== null && this.header !== void 0 && (this.header.destroy(), this.header = null), t !== void 0) {
      this.header = new Ad({
        text: t,
        onBackButtonClick: () => {
          this.history.pop(), this.updateItemsAndHeader(this.history.currentItems, this.history.currentTitle);
        }
      });
      const o = this.header.getElement();
      o !== null && this.nodes.popoverContainer.insertBefore(o, this.nodes.popoverContainer.firstChild);
    }
    this.items.forEach((o) => {
      var i;
      return (i = o.getElement()) == null ? void 0 : i.remove();
    }), this.items = this.buildItems(e), this.items.forEach((o) => {
      var i;
      const r = o.getElement();
      r !== null && ((i = this.nodes.items) == null || i.appendChild(r));
    });
  }
}
class Nd extends W {
  constructor() {
    super(...arguments), this.opened = !1, this.selection = new F(), this.popover = null, this.close = () => {
      this.opened && (this.opened = !1, F.isAtEditor || this.selection.restore(), this.selection.clearSaved(), !this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted && this.Editor.BlockManager.currentBlock && this.Editor.BlockSelection.unselectBlock(this.Editor.BlockManager.currentBlock), this.eventsDispatcher.emit(this.events.closed), this.popover && (this.popover.off(Pe.Closed, this.onPopoverClose), this.popover.destroy(), this.popover.getElement().remove(), this.popover = null));
    }, this.onPopoverClose = () => {
      this.close();
    };
  }
  /**
   * Module Events
   */
  get events() {
    return {
      opened: "block-settings-opened",
      closed: "block-settings-closed"
    };
  }
  /**
   * Block Settings CSS
   */
  get CSS() {
    return {
      settings: "ce-settings"
    };
  }
  /**
   * Getter for inner popover's flipper instance
   *
   * @todo remove once BlockSettings becomes standalone non-module class
   */
  get flipper() {
    var e;
    if (this.popover !== null)
      return "flipper" in this.popover ? (e = this.popover) == null ? void 0 : e.flipper : void 0;
  }
  /**
   * Panel with block settings with 2 sections:
   *  - Tool's Settings
   *  - Default Settings [Move, Remove, etc]
   */
  make() {
    this.nodes.wrapper = k.make("div", [this.CSS.settings]), this.eventsDispatcher.on(zt, this.close);
  }
  /**
   * Destroys module
   */
  destroy() {
    this.removeAllNodes(), this.listeners.destroy(), this.eventsDispatcher.off(zt, this.close);
  }
  /**
   * Open Block Settings pane
   *
   * @param targetBlock - near which Block we should open BlockSettings
   */
  async open(e = this.Editor.BlockManager.currentBlock) {
    var t;
    this.opened = !0, this.selection.save(), this.Editor.BlockSelection.selectBlock(e), this.Editor.BlockSelection.clearCache();
    const { toolTunes: o, commonTunes: i } = e.getTunes();
    this.eventsDispatcher.emit(this.events.opened);
    const r = Tt() ? xs : En;
    this.popover = new r({
      searchable: !0,
      items: await this.getTunesItems(e, i, o),
      scopeElement: this.Editor.API.methods.ui.nodes.redactor,
      messages: {
        nothingFound: ve.ui(Se.ui.popover, "Nothing found"),
        search: ve.ui(Se.ui.popover, "Filter")
      }
    }), this.popover.on(Pe.Closed, this.onPopoverClose), (t = this.nodes.wrapper) == null || t.append(this.popover.getElement()), this.popover.show();
  }
  /**
   * Returns root block settings element
   */
  getElement() {
    return this.nodes.wrapper;
  }
  /**
   * Returns list of items to be displayed in block tunes menu.
   * Merges tool specific tunes, conversion menu and common tunes in one list in predefined order
   *
   * @param currentBlock –  block we are about to open block tunes for
   * @param commonTunes – common tunes
   * @param toolTunes - tool specific tunes
   */
  async getTunesItems(e, t, o) {
    const i = [];
    o !== void 0 && o.length > 0 && (i.push(...o), i.push({
      type: ee.Separator
    }));
    const r = Array.from(this.Editor.Tools.blockTools.values()), s = (await ds(e, r)).reduce((a, l) => (l.toolbox.forEach((c) => {
      a.push({
        icon: c.icon,
        title: ve.t(Se.toolNames, c.title),
        name: l.name,
        closeOnActivate: !0,
        onActivate: async () => {
          const { BlockManager: d, Caret: u, Toolbar: p } = this.Editor, y = await d.convert(e, l.name, c.data);
          p.close(), u.setToBlock(y, u.positions.END);
        }
      });
    }), a), []);
    return s.length > 0 && (i.push({
      icon: ms,
      name: "convert-to",
      title: ve.ui(Se.ui.popover, "Convert to"),
      children: {
        searchable: !0,
        items: s
      }
    }), i.push({
      type: ee.Separator
    })), i.push(...t), i.map((a) => this.resolveTuneAliases(a));
  }
  /**
   * Resolves aliases in tunes menu items
   *
   * @param item - item with resolved aliases
   */
  resolveTuneAliases(e) {
    if (e.type === ee.Separator || e.type === ee.Html)
      return e;
    const t = cd(e, { label: "title" });
    return e.confirmation && (t.confirmation = this.resolveTuneAliases(e.confirmation)), t;
  }
}
var Cs = { exports: {} };
/*!
 * Library for handling keyboard shortcuts
 * @copyright CodeX (https://codex.so)
 * @license MIT
 * @author CodeX (https://codex.so)
 * @version 1.2.0
 */
(function(n, e) {
  (function(t, o) {
    n.exports = o();
  })(window, function() {
    return function(t) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = o, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, (function(c) {
              return r[c];
            }).bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "", i(i.s = 0);
    }([function(t, o, i) {
      function r(l, c) {
        for (var d = 0; d < c.length; d++) {
          var u = c[d];
          u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(l, u.key, u);
        }
      }
      function s(l, c, d) {
        return c && r(l.prototype, c), d && r(l, d), l;
      }
      i.r(o);
      var a = function() {
        function l(c) {
          var d = this;
          (function(u, p) {
            if (!(u instanceof p))
              throw new TypeError("Cannot call a class as a function");
          })(this, l), this.commands = {}, this.keys = {}, this.name = c.name, this.parseShortcutName(c.name), this.element = c.on, this.callback = c.callback, this.executeShortcut = function(u) {
            d.execute(u);
          }, this.element.addEventListener("keydown", this.executeShortcut, !1);
        }
        return s(l, null, [{ key: "supportedCommands", get: function() {
          return { SHIFT: ["SHIFT"], CMD: ["CMD", "CONTROL", "COMMAND", "WINDOWS", "CTRL"], ALT: ["ALT", "OPTION"] };
        } }, { key: "keyCodes", get: function() {
          return { 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, BACKSPACE: 8, ENTER: 13, ESCAPE: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INSERT: 45, DELETE: 46, ".": 190 };
        } }]), s(l, [{ key: "parseShortcutName", value: function(c) {
          c = c.split("+");
          for (var d = 0; d < c.length; d++) {
            c[d] = c[d].toUpperCase();
            var u = !1;
            for (var p in l.supportedCommands)
              if (l.supportedCommands[p].includes(c[d])) {
                u = this.commands[p] = !0;
                break;
              }
            u || (this.keys[c[d]] = !0);
          }
          for (var y in l.supportedCommands)
            this.commands[y] || (this.commands[y] = !1);
        } }, { key: "execute", value: function(c) {
          var d, u = { CMD: c.ctrlKey || c.metaKey, SHIFT: c.shiftKey, ALT: c.altKey }, p = !0;
          for (d in this.commands)
            this.commands[d] !== u[d] && (p = !1);
          var y, v = !0;
          for (y in this.keys)
            v = v && c.keyCode === l.keyCodes[y];
          p && v && this.callback(c);
        } }, { key: "remove", value: function() {
          this.element.removeEventListener("keydown", this.executeShortcut);
        } }]), l;
      }();
      o.default = a;
    }]).default;
  });
})(Cs);
var Pd = Cs.exports;
const Dd = /* @__PURE__ */ Eo(Pd);
class Rd {
  constructor() {
    this.registeredShortcuts = /* @__PURE__ */ new Map();
  }
  /**
   * Register shortcut
   *
   * @param shortcut - shortcut options
   */
  add(e) {
    if (this.findShortcut(e.on, e.name))
      throw Error(
        `Shortcut ${e.name} is already registered for ${e.on}. Please remove it before add a new handler.`
      );
    const t = new Dd({
      name: e.name,
      on: e.on,
      callback: e.handler
    }), o = this.registeredShortcuts.get(e.on) || [];
    this.registeredShortcuts.set(e.on, [...o, t]);
  }
  /**
   * Remove shortcut
   *
   * @param element - Element shortcut is set for
   * @param name - shortcut name
   */
  remove(e, t) {
    const o = this.findShortcut(e, t);
    if (!o)
      return;
    o.remove();
    const i = this.registeredShortcuts.get(e).filter((r) => r !== o);
    if (i.length === 0) {
      this.registeredShortcuts.delete(e);
      return;
    }
    this.registeredShortcuts.set(e, i);
  }
  /**
   * Get Shortcut instance if exist
   *
   * @param element - Element shorcut is set for
   * @param shortcut - shortcut name
   * @returns {number} index - shortcut index if exist
   */
  findShortcut(e, t) {
    return (this.registeredShortcuts.get(e) || []).find(({ name: o }) => o === t);
  }
}
const kt = new Rd();
var Hd = Object.defineProperty, Fd = Object.getOwnPropertyDescriptor, Es = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Fd(e, t) : e, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && Hd(e, t, i), i;
}, io = /* @__PURE__ */ ((n) => (n.Opened = "toolbox-opened", n.Closed = "toolbox-closed", n.BlockAdded = "toolbox-block-added", n))(io || {});
const Tn = class Ts extends Zt {
  /**
   * Toolbox constructor
   *
   * @param options - available parameters
   * @param options.api - Editor API methods
   * @param options.tools - Tools available to check whether some of them should be displayed at the Toolbox or not
   */
  constructor({ api: e, tools: t, i18nLabels: o }) {
    super(), this.opened = !1, this.listeners = new Gt(), this.popover = null, this.handleMobileLayoutToggle = () => {
      this.destroyPopover(), this.initPopover();
    }, this.onPopoverClose = () => {
      this.opened = !1, this.emit(
        "toolbox-closed"
        /* Closed */
      );
    }, this.api = e, this.tools = t, this.i18nLabels = o, this.enableShortcuts(), this.nodes = {
      toolbox: k.make("div", Ts.CSS.toolbox)
    }, this.initPopover(), this.api.events.on(zt, this.handleMobileLayoutToggle);
  }
  /**
   * Returns True if Toolbox is Empty and nothing to show
   *
   * @returns {boolean}
   */
  get isEmpty() {
    return this.toolsToBeDisplayed.length === 0;
  }
  /**
   * CSS styles
   */
  static get CSS() {
    return {
      toolbox: "ce-toolbox"
    };
  }
  /**
   * Returns root block settings element
   */
  getElement() {
    return this.nodes.toolbox;
  }
  /**
   * Returns true if the Toolbox has the Flipper activated and the Flipper has selected button
   */
  hasFocus() {
    if (this.popover !== null)
      return "hasFocus" in this.popover ? this.popover.hasFocus() : void 0;
  }
  /**
   * Destroy Module
   */
  destroy() {
    var e;
    super.destroy(), this.nodes && this.nodes.toolbox && this.nodes.toolbox.remove(), this.removeAllShortcuts(), (e = this.popover) == null || e.off(Pe.Closed, this.onPopoverClose), this.listeners.destroy(), this.api.events.off(zt, this.handleMobileLayoutToggle);
  }
  /**
   * Toolbox Tool's button click handler
   *
   * @param toolName - tool type to be activated
   * @param blockDataOverrides - Block data predefined by the activated Toolbox item
   */
  toolButtonActivated(e, t) {
    this.insertNewBlock(e, t);
  }
  /**
   * Open Toolbox with Tools
   */
  open() {
    var e;
    this.isEmpty || ((e = this.popover) == null || e.show(), this.opened = !0, this.emit(
      "toolbox-opened"
      /* Opened */
    ));
  }
  /**
   * Close Toolbox
   */
  close() {
    var e;
    (e = this.popover) == null || e.hide(), this.opened = !1, this.emit(
      "toolbox-closed"
      /* Closed */
    );
  }
  /**
   * Close Toolbox
   */
  toggle() {
    this.opened ? this.close() : this.open();
  }
  /**
   * Creates toolbox popover and appends it inside wrapper element
   */
  initPopover() {
    var e;
    const t = Tt() ? xs : En;
    this.popover = new t({
      scopeElement: this.api.ui.nodes.redactor,
      searchable: !0,
      messages: {
        nothingFound: this.i18nLabels.nothingFound,
        search: this.i18nLabels.filter
      },
      items: this.toolboxItemsToBeDisplayed
    }), this.popover.on(Pe.Closed, this.onPopoverClose), (e = this.nodes.toolbox) == null || e.append(this.popover.getElement());
  }
  /**
   * Destroys popover instance and removes it from DOM
   */
  destroyPopover() {
    this.popover !== null && (this.popover.hide(), this.popover.off(Pe.Closed, this.onPopoverClose), this.popover.destroy(), this.popover = null), this.nodes.toolbox !== null && (this.nodes.toolbox.innerHTML = "");
  }
  get toolsToBeDisplayed() {
    const e = [];
    return this.tools.forEach((t) => {
      t.toolbox && e.push(t);
    }), e;
  }
  get toolboxItemsToBeDisplayed() {
    const e = (t, o, i = !0) => ({
      icon: t.icon,
      title: ve.t(Se.toolNames, t.title || uo(o.name)),
      name: o.name,
      onActivate: () => {
        this.toolButtonActivated(o.name, t.data);
      },
      secondaryLabel: o.shortcut && i ? bn(o.shortcut) : ""
    });
    return this.toolsToBeDisplayed.reduce((t, o) => (Array.isArray(o.toolbox) ? o.toolbox.forEach((i, r) => {
      t.push(e(i, o, r === 0));
    }) : o.toolbox !== void 0 && t.push(e(o.toolbox, o)), t), []);
  }
  /**
   * Iterate all tools and enable theirs shortcuts if specified
   */
  enableShortcuts() {
    this.toolsToBeDisplayed.forEach((e) => {
      const t = e.shortcut;
      t && this.enableShortcutForTool(e.name, t);
    });
  }
  /**
   * Enable shortcut Block Tool implemented shortcut
   *
   * @param {string} toolName - Tool name
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcutForTool(e, t) {
    kt.add({
      name: t,
      on: this.api.ui.nodes.redactor,
      handler: async (o) => {
        o.preventDefault();
        const i = this.api.blocks.getCurrentBlockIndex(), r = this.api.blocks.getBlockByIndex(i);
        if (r)
          try {
            const s = await this.api.blocks.convert(r.id, e);
            this.api.caret.setToBlock(s, "end");
            return;
          } catch {
          }
        this.insertNewBlock(e);
      }
    });
  }
  /**
   * Removes all added shortcuts
   * Fired when the Read-Only mode is activated
   */
  removeAllShortcuts() {
    this.toolsToBeDisplayed.forEach((e) => {
      const t = e.shortcut;
      t && kt.remove(this.api.ui.nodes.redactor, t);
    });
  }
  /**
   * Inserts new block
   * Can be called when button clicked on Toolbox or by ShortcutData
   *
   * @param {string} toolName - Tool name
   * @param blockDataOverrides - predefined Block data
   */
  async insertNewBlock(e, t) {
    const o = this.api.blocks.getCurrentBlockIndex(), i = this.api.blocks.getBlockByIndex(o);
    if (!i)
      return;
    const r = i.isEmpty ? o : o + 1;
    let s;
    if (t) {
      const l = await this.api.blocks.composeBlockData(e);
      s = Object.assign(l, t);
    }
    const a = this.api.blocks.insert(
      e,
      s,
      void 0,
      r,
      void 0,
      i.isEmpty
    );
    a.call(Fe.APPEND_CALLBACK), this.api.caret.setToBlock(r), this.emit("toolbox-block-added", {
      block: a
    }), this.api.toolbar.close();
  }
};
Es([
  Et
], Tn.prototype, "toolsToBeDisplayed", 1);
Es([
  Et
], Tn.prototype, "toolboxItemsToBeDisplayed", 1);
let jd = Tn;
const Ss = "block hovered";
async function zd(n, e) {
  const t = navigator.keyboard;
  if (!t)
    return e;
  try {
    return (await t.getLayoutMap()).get(n) || e;
  } catch (o) {
    return console.error(o), e;
  }
}
class $d extends W {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.toolboxInstance = null;
  }
  /**
   * CSS styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      toolbar: "ce-toolbar",
      content: "ce-toolbar__content",
      actions: "ce-toolbar__actions",
      actionsOpened: "ce-toolbar__actions--opened",
      toolbarOpened: "ce-toolbar--opened",
      openedToolboxHolderModifier: "codex-editor--toolbox-opened",
      plusButton: "ce-toolbar__plus",
      plusButtonShortcut: "ce-toolbar__plus-shortcut",
      settingsToggler: "ce-toolbar__settings-btn",
      settingsTogglerHidden: "ce-toolbar__settings-btn--hidden"
    };
  }
  /**
   * Returns the Toolbar opening state
   *
   * @returns {boolean}
   */
  get opened() {
    return this.nodes.wrapper.classList.contains(this.CSS.toolbarOpened);
  }
  /**
   * Public interface for accessing the Toolbox
   */
  get toolbox() {
    var e;
    return {
      opened: (e = this.toolboxInstance) == null ? void 0 : e.opened,
      close: () => {
        var t;
        (t = this.toolboxInstance) == null || t.close();
      },
      open: () => {
        if (this.toolboxInstance === null) {
          X("toolbox.open() called before initialization is finished", "warn");
          return;
        }
        this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.toolboxInstance.open();
      },
      toggle: () => {
        if (this.toolboxInstance === null) {
          X("toolbox.toggle() called before initialization is finished", "warn");
          return;
        }
        this.toolboxInstance.toggle();
      },
      hasFocus: () => {
        var t;
        return (t = this.toolboxInstance) == null ? void 0 : t.hasFocus();
      }
    };
  }
  /**
   * Block actions appearance manipulations
   */
  get blockActions() {
    return {
      hide: () => {
        this.nodes.actions.classList.remove(this.CSS.actionsOpened);
      },
      show: () => {
        this.nodes.actions.classList.add(this.CSS.actionsOpened);
      }
    };
  }
  /**
   * Methods for working with Block Tunes toggler
   */
  get blockTunesToggler() {
    return {
      hide: () => this.nodes.settingsToggler.classList.add(this.CSS.settingsTogglerHidden),
      show: () => this.nodes.settingsToggler.classList.remove(this.CSS.settingsTogglerHidden)
    };
  }
  /**
   * Toggles read-only mode
   *
   * @param {boolean} readOnlyEnabled - read-only mode
   */
  toggleReadOnly(e) {
    e ? (this.destroy(), this.Editor.BlockSettings.destroy(), this.disableModuleBindings()) : window.requestIdleCallback(() => {
      this.drawUI(), this.enableModuleBindings();
    }, { timeout: 2e3 });
  }
  /**
   * Move Toolbar to the passed (or current) Block
   *
   * @param block - block to move Toolbar near it
   */
  moveAndOpen(e = this.Editor.BlockManager.currentBlock) {
    if (this.toolboxInstance === null) {
      X("Can't open Toolbar since Editor initialization is not finished yet", "warn");
      return;
    }
    if (this.toolboxInstance.opened && this.toolboxInstance.close(), this.Editor.BlockSettings.opened && this.Editor.BlockSettings.close(), !e)
      return;
    this.hoveredBlock = e;
    const t = e.holder, { isMobile: o } = this.Editor.UI;
    let i;
    const r = 20, s = e.firstInput, a = t.getBoundingClientRect(), l = s !== void 0 ? s.getBoundingClientRect() : null, c = l !== null ? l.top - a.top : null, d = c !== null ? c > r : void 0;
    if (o)
      i = t.offsetTop + t.offsetHeight;
    else if (s === void 0 || d) {
      const u = parseInt(window.getComputedStyle(e.pluginsContent).paddingTop);
      i = t.offsetTop + u;
    } else {
      const u = Sc(s), p = parseInt(window.getComputedStyle(this.nodes.plusButton).height, 10), y = 8;
      i = t.offsetTop + u - p + y + c;
    }
    this.nodes.wrapper.style.top = `${Math.floor(i)}px`, this.Editor.BlockManager.blocks.length === 1 && e.isEmpty ? this.blockTunesToggler.hide() : this.blockTunesToggler.show(), this.open();
  }
  /**
   * Close the Toolbar
   */
  close() {
    var e, t;
    this.Editor.ReadOnly.isEnabled || ((e = this.nodes.wrapper) == null || e.classList.remove(this.CSS.toolbarOpened), this.blockActions.hide(), (t = this.toolboxInstance) == null || t.close(), this.Editor.BlockSettings.close(), this.reset());
  }
  /**
   * Reset the Toolbar position to prevent DOM height growth, for example after blocks deletion
   */
  reset() {
    this.nodes.wrapper.style.top = "unset";
  }
  /**
   * Open Toolbar with Plus Button and Actions
   *
   * @param {boolean} withBlockActions - by default, Toolbar opens with Block Actions.
   *                                     This flag allows to open Toolbar without Actions.
   */
  open(e = !0) {
    this.nodes.wrapper.classList.add(this.CSS.toolbarOpened), e ? this.blockActions.show() : this.blockActions.hide();
  }
  /**
   * Draws Toolbar elements
   */
  async make() {
    this.nodes.wrapper = k.make("div", this.CSS.toolbar), ["content", "actions"].forEach((r) => {
      this.nodes[r] = k.make("div", this.CSS[r]);
    }), k.append(this.nodes.wrapper, this.nodes.content), k.append(this.nodes.content, this.nodes.actions), this.nodes.plusButton = k.make("div", this.CSS.plusButton, {
      innerHTML: yd
    }), k.append(this.nodes.actions, this.nodes.plusButton), this.readOnlyMutableListeners.on(this.nodes.plusButton, "click", () => {
      po(!0), this.plusButtonClicked();
    }, !1);
    const e = k.make("div");
    e.appendChild(document.createTextNode(ve.ui(Se.ui.toolbar.toolbox, "Add"))), e.appendChild(k.make("div", this.CSS.plusButtonShortcut, {
      textContent: "/"
    })), fo(this.nodes.plusButton, e, {
      hidingDelay: 400
    }), this.nodes.settingsToggler = k.make("span", this.CSS.settingsToggler, {
      innerHTML: bd
    }), k.append(this.nodes.actions, this.nodes.settingsToggler);
    const t = k.make("div"), o = k.text(ve.ui(Se.ui.blockTunes.toggler, "Click to tune")), i = await zd("Slash", "/");
    t.appendChild(o), t.appendChild(k.make("div", this.CSS.plusButtonShortcut, {
      textContent: bn(`CMD + ${i}`)
    })), fo(this.nodes.settingsToggler, t, {
      hidingDelay: 400
    }), k.append(this.nodes.actions, this.makeToolbox()), k.append(this.nodes.actions, this.Editor.BlockSettings.getElement()), k.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
  }
  /**
   * Creates the Toolbox instance and return it's rendered element
   */
  makeToolbox() {
    return this.toolboxInstance = new jd({
      api: this.Editor.API.methods,
      tools: this.Editor.Tools.blockTools,
      i18nLabels: {
        filter: ve.ui(Se.ui.popover, "Filter"),
        nothingFound: ve.ui(Se.ui.popover, "Nothing found")
      }
    }), this.toolboxInstance.on(io.Opened, () => {
      this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(io.Closed, () => {
      this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(io.BlockAdded, ({ block: e }) => {
      const { BlockManager: t, Caret: o } = this.Editor, i = t.getBlockById(e.id);
      i.inputs.length === 0 && (i === t.lastBlock ? (t.insertAtEnd(), o.setToBlock(t.lastBlock)) : o.setToBlock(t.nextBlock));
    }), this.toolboxInstance.getElement();
  }
  /**
   * Handler for Plus Button
   */
  plusButtonClicked() {
    var e;
    this.Editor.BlockManager.currentBlock = this.hoveredBlock, (e = this.toolboxInstance) == null || e.toggle();
  }
  /**
   * Enable bindings
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(this.nodes.settingsToggler, "mousedown", (e) => {
      var t;
      e.stopPropagation(), this.settingsTogglerClicked(), (t = this.toolboxInstance) != null && t.opened && this.toolboxInstance.close(), po(!0);
    }, !0), Tt() || this.eventsDispatcher.on(Ss, (e) => {
      var t;
      this.Editor.BlockSettings.opened || (t = this.toolboxInstance) != null && t.opened || this.moveAndOpen(e.block);
    });
  }
  /**
   * Disable bindings
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Clicks on the Block Settings toggler
   */
  settingsTogglerClicked() {
    this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.BlockSettings.open(this.hoveredBlock);
  }
  /**
   * Draws Toolbar UI
   *
   * Toolbar contains BlockSettings and Toolbox.
   * That's why at first we draw its components and then Toolbar itself
   *
   * Steps:
   *  - Make Toolbar dependent components like BlockSettings, Toolbox and so on
   *  - Make itself and append dependent nodes to itself
   *
   */
  drawUI() {
    this.Editor.BlockSettings.make(), this.make();
  }
  /**
   * Removes all created and saved HTMLElements
   * It is used in Read-Only mode
   */
  destroy() {
    this.removeAllNodes(), this.toolboxInstance && this.toolboxInstance.destroy();
  }
}
var ot = /* @__PURE__ */ ((n) => (n[n.Block = 0] = "Block", n[n.Inline = 1] = "Inline", n[n.Tune = 2] = "Tune", n))(ot || {}), ro = /* @__PURE__ */ ((n) => (n.Shortcut = "shortcut", n.Toolbox = "toolbox", n.EnabledInlineTools = "inlineToolbar", n.EnabledBlockTunes = "tunes", n.Config = "config", n))(ro || {}), Bs = /* @__PURE__ */ ((n) => (n.Shortcut = "shortcut", n.SanitizeConfig = "sanitize", n))(Bs || {}), vt = /* @__PURE__ */ ((n) => (n.IsEnabledLineBreaks = "enableLineBreaks", n.Toolbox = "toolbox", n.ConversionConfig = "conversionConfig", n.IsReadOnlySupported = "isReadOnlySupported", n.PasteConfig = "pasteConfig", n))(vt || {}), mo = /* @__PURE__ */ ((n) => (n.IsInline = "isInline", n.Title = "title", n.IsReadOnlySupported = "isReadOnlySupported", n))(mo || {}), un = /* @__PURE__ */ ((n) => (n.IsTune = "isTune", n))(un || {});
class Sn {
  /**
   * @class
   * @param {ConstructorOptions} options - Constructor options
   */
  constructor({
    name: e,
    constructable: t,
    config: o,
    api: i,
    isDefault: r,
    isInternal: s = !1,
    defaultPlaceholder: a
  }) {
    this.api = i, this.name = e, this.constructable = t, this.config = o, this.isDefault = r, this.isInternal = s, this.defaultPlaceholder = a;
  }
  /**
   * Returns Tool user configuration
   */
  get settings() {
    const e = this.config.config || {};
    return this.isDefault && !("placeholder" in e) && this.defaultPlaceholder && (e.placeholder = this.defaultPlaceholder), e;
  }
  /**
   * Calls Tool's reset method
   */
  reset() {
    if (oe(this.constructable.reset))
      return this.constructable.reset();
  }
  /**
   * Calls Tool's prepare method
   */
  prepare() {
    if (oe(this.constructable.prepare))
      return this.constructable.prepare({
        toolName: this.name,
        config: this.settings
      });
  }
  /**
   * Returns shortcut for Tool (internal or specified by user)
   */
  get shortcut() {
    const e = this.constructable.shortcut;
    return this.config.shortcut || e;
  }
  /**
   * Returns Tool's sanitizer configuration
   */
  get sanitizeConfig() {
    return this.constructable.sanitize || {};
  }
  /**
   * Returns true if Tools is inline
   */
  isInline() {
    return this.type === ot.Inline;
  }
  /**
   * Returns true if Tools is block
   */
  isBlock() {
    return this.type === ot.Block;
  }
  /**
   * Returns true if Tools is tune
   */
  isTune() {
    return this.type === ot.Tune;
  }
}
class Ud extends W {
  /**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.CSS = {
      inlineToolbar: "ce-inline-toolbar"
    }, this.opened = !1, this.popover = null, this.toolbarVerticalMargin = Tt() ? 20 : 6, this.tools = /* @__PURE__ */ new Map(), window.requestIdleCallback(() => {
      this.make();
    }, { timeout: 2e3 });
  }
  /**
   *  Moving / appearance
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Shows Inline Toolbar if something is selected
   *
   * @param [needToClose] - pass true to close toolbar if it is not allowed.
   *                                  Avoid to use it just for closing IT, better call .close() clearly.
   */
  async tryToShow(e = !1) {
    e && this.close(), this.allowedToShow() && (await this.open(), this.Editor.Toolbar.close());
  }
  /**
   * Hides Inline Toolbar
   */
  close() {
    var e, t;
    if (this.opened) {
      for (const [o, i] of this.tools) {
        const r = this.getToolShortcut(o.name);
        r !== void 0 && kt.remove(this.Editor.UI.nodes.redactor, r), oe(i.clear) && i.clear();
      }
      this.tools = /* @__PURE__ */ new Map(), this.reset(), this.opened = !1, (e = this.popover) == null || e.hide(), (t = this.popover) == null || t.destroy(), this.popover = null;
    }
  }
  /**
   * Check if node is contained by Inline Toolbar
   *
   * @param {Node} node — node to check
   */
  containsNode(e) {
    return this.nodes.wrapper === void 0 ? !1 : this.nodes.wrapper.contains(e);
  }
  /**
   * Removes UI and its components
   */
  destroy() {
    var e;
    this.removeAllNodes(), (e = this.popover) == null || e.destroy(), this.popover = null;
  }
  /**
   * Making DOM
   */
  make() {
    this.nodes.wrapper = k.make("div", [
      this.CSS.inlineToolbar,
      ...this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []
    ]), k.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
  }
  /**
   * Shows Inline Toolbar
   */
  async open() {
    var e;
    if (this.opened)
      return;
    this.opened = !0, this.popover !== null && this.popover.destroy(), this.createToolsInstances();
    const t = await this.getPopoverItems();
    this.popover = new Od({
      items: t,
      scopeElement: this.Editor.API.methods.ui.nodes.redactor,
      messages: {
        nothingFound: ve.ui(Se.ui.popover, "Nothing found"),
        search: ve.ui(Se.ui.popover, "Filter")
      }
    }), this.move(this.popover.size.width), (e = this.nodes.wrapper) == null || e.append(this.popover.getElement()), this.popover.show();
  }
  /**
   * Move Toolbar to the selected text
   *
   * @param popoverWidth - width of the toolbar popover
   */
  move(e) {
    const t = F.rect, o = this.Editor.UI.nodes.wrapper.getBoundingClientRect(), i = {
      x: t.x - o.x,
      y: t.y + t.height - // + window.scrollY
      o.top + this.toolbarVerticalMargin
    };
    i.x + e + o.x > this.Editor.UI.contentRect.right && (i.x = this.Editor.UI.contentRect.right - e - o.x), this.nodes.wrapper.style.left = Math.floor(i.x) + "px", this.nodes.wrapper.style.top = Math.floor(i.y) + "px";
  }
  /**
   * Clear orientation classes and reset position
   */
  reset() {
    this.nodes.wrapper.style.left = "0", this.nodes.wrapper.style.top = "0";
  }
  /**
   * Need to show Inline Toolbar or not
   */
  allowedToShow() {
    const e = ["IMG", "INPUT"], t = F.get(), o = F.text;
    if (!t || !t.anchorNode || t.isCollapsed || o.length < 1)
      return !1;
    const i = k.isElement(t.anchorNode) ? t.anchorNode : t.anchorNode.parentElement;
    if (i === null || t !== null && e.includes(i.tagName))
      return !1;
    const r = this.Editor.BlockManager.getBlock(t.anchorNode);
    return !r || this.getTools().some((s) => r.tool.inlineTools.has(s.name)) === !1 ? !1 : i.closest("[contenteditable]") !== null;
  }
  /**
   *  Working with Tools
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Returns tools that are available for current block
   *
   * Used to check if Inline Toolbar could be shown
   * and to render tools in the Inline Toolbar
   */
  getTools() {
    const e = this.Editor.BlockManager.currentBlock;
    return e ? Array.from(e.tool.inlineTools.values()).filter((t) => !(this.Editor.ReadOnly.isEnabled && t.isReadOnlySupported !== !0)) : [];
  }
  /**
   * Constructs tools instances and saves them to this.tools
   */
  createToolsInstances() {
    this.tools = /* @__PURE__ */ new Map(), this.getTools().forEach((e) => {
      const t = e.create();
      this.tools.set(e, t);
    });
  }
  /**
   * Returns Popover Items for tools segregated by their appearance type: regular items and custom html elements.
   */
  async getPopoverItems() {
    const e = [];
    let t = 0;
    for (const [o, i] of this.tools) {
      const r = await i.render(), s = this.getToolShortcut(o.name);
      if (s !== void 0)
        try {
          this.enableShortcuts(o.name, s);
        } catch {
        }
      const a = s !== void 0 ? bn(s) : void 0, l = ve.t(
        Se.toolNames,
        o.title || uo(o.name)
      );
      [r].flat().forEach((c) => {
        var d, u;
        const p = {
          name: o.name,
          onActivate: () => {
            this.toolClicked(i);
          },
          hint: {
            title: l,
            description: a
          }
        };
        if (k.isElement(c)) {
          const y = {
            ...p,
            element: c,
            type: ee.Html
          };
          if (oe(i.renderActions)) {
            const v = i.renderActions();
            y.children = {
              isOpen: (d = i.checkState) == null ? void 0 : d.call(i, F.get()),
              /** Disable keyboard navigation in actions, as it might conflict with enter press handling */
              isFlippable: !1,
              items: [
                {
                  type: ee.Html,
                  element: v
                }
              ]
            };
          } else
            (u = i.checkState) == null || u.call(i, F.get());
          e.push(y);
        } else if (c.type === ee.Html)
          e.push({
            ...p,
            ...c,
            type: ee.Html
          });
        else if (c.type === ee.Separator)
          e.push({
            type: ee.Separator
          });
        else {
          const y = {
            ...p,
            ...c,
            type: ee.Default
          };
          "children" in y && t !== 0 && e.push({
            type: ee.Separator
          }), e.push(y), "children" in y && t < this.tools.size - 1 && e.push({
            type: ee.Separator
          });
        }
      }), t++;
    }
    return e;
  }
  /**
   * Get shortcut name for tool
   *
   * @param toolName — Tool name
   */
  getToolShortcut(e) {
    const { Tools: t } = this.Editor, o = t.inlineTools.get(e), i = t.internal.inlineTools;
    return Array.from(i.keys()).includes(e) ? this.inlineTools[e][Bs.Shortcut] : o == null ? void 0 : o.shortcut;
  }
  /**
   * Enable Tool shortcut with Editor Shortcuts Module
   *
   * @param toolName - tool name
   * @param shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcuts(e, t) {
    kt.add({
      name: t,
      handler: (o) => {
        var i;
        const { currentBlock: r } = this.Editor.BlockManager;
        r && r.tool.enabledInlineTools && (o.preventDefault(), (i = this.popover) == null || i.activateItemByName(e));
      },
      /**
       * We need to bind shortcut to the document to make it work in read-only mode
       */
      on: document
    });
  }
  /**
   * Inline Tool button clicks
   *
   * @param tool - Tool's instance
   */
  toolClicked(e) {
    var t;
    const o = F.range;
    (t = e.surround) == null || t.call(e, o), this.checkToolsState();
  }
  /**
   * Check Tools` state by selection
   */
  checkToolsState() {
    var e;
    (e = this.tools) == null || e.forEach((t) => {
      var o;
      (o = t.checkState) == null || o.call(t, F.get());
    });
  }
  /**
   * Get inline tools tools
   * Tools that has isInline is true
   */
  get inlineTools() {
    const e = {};
    return Array.from(this.Editor.Tools.inlineTools.entries()).forEach(([t, o]) => {
      e[t] = o.create();
    }), e;
  }
}
function Is() {
  const n = window.getSelection();
  if (n === null)
    return [null, 0];
  let e = n.focusNode, t = n.focusOffset;
  return e === null ? [null, 0] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], t = e.textContent.length)), [e, t]);
}
function Ls(n, e, t, o) {
  const i = document.createRange();
  o === "left" ? (i.setStart(n, 0), i.setEnd(e, t)) : (i.setStart(e, t), i.setEnd(n, n.childNodes.length));
  const r = i.cloneContents(), s = document.createElement("div");
  s.appendChild(r);
  const a = s.textContent || "";
  return Tc(a);
}
function so(n) {
  const e = k.getDeepestNode(n);
  if (e === null || k.isEmpty(n))
    return !0;
  if (k.isNativeInput(e))
    return e.selectionEnd === 0;
  if (k.isEmpty(n))
    return !0;
  const [t, o] = Is();
  return t === null ? !1 : Ls(n, t, o, "left");
}
function ao(n) {
  const e = k.getDeepestNode(n, !0);
  if (e === null)
    return !0;
  if (k.isNativeInput(e))
    return e.selectionEnd === e.value.length;
  const [t, o] = Is();
  return t === null ? !1 : Ls(n, t, o, "right");
}
var Os = {}, Bn = {}, To = {}, at = {}, In = {}, Ln = {};
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.allInputsSelector = Vd;
function Vd() {
  var n = ["text", "password", "email", "number", "search", "tel", "url"];
  return "[contenteditable=true], textarea, input:not([type]), " + n.map(function(e) {
    return 'input[type="'.concat(e, '"]');
  }).join(", ");
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.allInputsSelector = void 0;
  var e = Ln;
  Object.defineProperty(n, "allInputsSelector", { enumerable: !0, get: function() {
    return e.allInputsSelector;
  } });
})(In);
var lt = {}, On = {};
Object.defineProperty(On, "__esModule", { value: !0 });
On.isNativeInput = qd;
function qd(n) {
  var e = [
    "INPUT",
    "TEXTAREA"
  ];
  return n && n.tagName ? e.includes(n.tagName) : !1;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isNativeInput = void 0;
  var e = On;
  Object.defineProperty(n, "isNativeInput", { enumerable: !0, get: function() {
    return e.isNativeInput;
  } });
})(lt);
var Ms = {}, Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.append = Wd;
function Wd(n, e) {
  Array.isArray(e) ? e.forEach(function(t) {
    n.appendChild(t);
  }) : n.appendChild(e);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.append = void 0;
  var e = Mn;
  Object.defineProperty(n, "append", { enumerable: !0, get: function() {
    return e.append;
  } });
})(Ms);
var An = {}, _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.blockElements = Yd;
function Yd() {
  return [
    "address",
    "article",
    "aside",
    "blockquote",
    "canvas",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "noscript",
    "ol",
    "output",
    "p",
    "pre",
    "ruby",
    "section",
    "table",
    "tbody",
    "thead",
    "tr",
    "tfoot",
    "ul",
    "video"
  ];
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.blockElements = void 0;
  var e = _n;
  Object.defineProperty(n, "blockElements", { enumerable: !0, get: function() {
    return e.blockElements;
  } });
})(An);
var As = {}, Nn = {};
Object.defineProperty(Nn, "__esModule", { value: !0 });
Nn.calculateBaseline = Xd;
function Xd(n) {
  var e = window.getComputedStyle(n), t = parseFloat(e.fontSize), o = parseFloat(e.lineHeight) || t * 1.2, i = parseFloat(e.paddingTop), r = parseFloat(e.borderTopWidth), s = parseFloat(e.marginTop), a = t * 0.8, l = (o - t) / 2, c = s + r + i + l + a;
  return c;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.calculateBaseline = void 0;
  var e = Nn;
  Object.defineProperty(n, "calculateBaseline", { enumerable: !0, get: function() {
    return e.calculateBaseline;
  } });
})(As);
var _s = {}, Pn = {}, Dn = {}, Rn = {};
Object.defineProperty(Rn, "__esModule", { value: !0 });
Rn.isContentEditable = Kd;
function Kd(n) {
  return n.contentEditable === "true";
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isContentEditable = void 0;
  var e = Rn;
  Object.defineProperty(n, "isContentEditable", { enumerable: !0, get: function() {
    return e.isContentEditable;
  } });
})(Dn);
Object.defineProperty(Pn, "__esModule", { value: !0 });
Pn.canSetCaret = Jd;
var Zd = lt, Gd = Dn;
function Jd(n) {
  var e = !0;
  if ((0, Zd.isNativeInput)(n))
    switch (n.type) {
      case "file":
      case "checkbox":
      case "radio":
      case "hidden":
      case "submit":
      case "button":
      case "image":
      case "reset":
        e = !1;
        break;
    }
  else
    e = (0, Gd.isContentEditable)(n);
  return e;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.canSetCaret = void 0;
  var e = Pn;
  Object.defineProperty(n, "canSetCaret", { enumerable: !0, get: function() {
    return e.canSetCaret;
  } });
})(_s);
var So = {}, Hn = {};
function Qd(n, e, t) {
  const o = t.value !== void 0 ? "value" : "get", i = t[o], r = `#${e}Cache`;
  if (t[o] = function(...s) {
    return this[r] === void 0 && (this[r] = i.apply(this, s)), this[r];
  }, o === "get" && t.set) {
    const s = t.set;
    t.set = function(a) {
      delete n[r], s.apply(this, a);
    };
  }
  return t;
}
function Ns() {
  const n = {
    win: !1,
    mac: !1,
    x11: !1,
    linux: !1
  }, e = Object.keys(n).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e !== void 0 && (n[e] = !0), n;
}
function Fn(n) {
  return n != null && n !== "" && (typeof n != "object" || Object.keys(n).length > 0);
}
function eu(n) {
  return !Fn(n);
}
const tu = () => typeof window < "u" && window.navigator !== null && Fn(window.navigator.platform) && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function ou(n) {
  const e = Ns();
  return n = n.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, "+"), e.mac ? n = n.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : n = n.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), n;
}
function nu(n) {
  return n[0].toUpperCase() + n.slice(1);
}
function iu(n) {
  const e = document.createElement("div");
  e.style.position = "absolute", e.style.left = "-999px", e.style.bottom = "-999px", e.innerHTML = n, document.body.appendChild(e);
  const t = window.getSelection(), o = document.createRange();
  if (o.selectNode(e), t === null)
    throw new Error("Cannot copy text to clipboard");
  t.removeAllRanges(), t.addRange(o), document.execCommand("copy"), document.body.removeChild(e);
}
function ru(n, e, t) {
  let o;
  return (...i) => {
    const r = this, s = () => {
      o = void 0, t !== !0 && n.apply(r, i);
    }, a = t === !0 && o !== void 0;
    window.clearTimeout(o), o = window.setTimeout(s, e), a && n.apply(r, i);
  };
}
function Xe(n) {
  return Object.prototype.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function su(n) {
  return Xe(n) === "boolean";
}
function Ps(n) {
  return Xe(n) === "function" || Xe(n) === "asyncfunction";
}
function au(n) {
  return Ps(n) && /^\s*class\s+/.test(n.toString());
}
function lu(n) {
  return Xe(n) === "number";
}
function lo(n) {
  return Xe(n) === "object";
}
function cu(n) {
  return Promise.resolve(n) === n;
}
function du(n) {
  return Xe(n) === "string";
}
function uu(n) {
  return Xe(n) === "undefined";
}
function hn(n, ...e) {
  if (!e.length)
    return n;
  const t = e.shift();
  if (lo(n) && lo(t))
    for (const o in t)
      lo(t[o]) ? (n[o] === void 0 && Object.assign(n, { [o]: {} }), hn(n[o], t[o])) : Object.assign(n, { [o]: t[o] });
  return hn(n, ...e);
}
function hu(n, e, t) {
  const o = `«${e}» is deprecated and will be removed in the next major release. Please use the «${t}» instead.`;
  n && console.warn(o);
}
function pu(n) {
  try {
    return new URL(n).href;
  } catch {
  }
  return n.substring(0, 2) === "//" ? window.location.protocol + n : window.location.origin + n;
}
function fu(n) {
  return n > 47 && n < 58 || n === 32 || n === 13 || n === 229 || n > 64 && n < 91 || n > 95 && n < 112 || n > 185 && n < 193 || n > 218 && n < 223;
}
const gu = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91,
  SLASH: 191
}, mu = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
let vu = class {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   * @param operation - promise should be added to queue
   */
  add(n) {
    return new Promise((e, t) => {
      this.completed = this.completed.then(n).then(e).catch(t);
    });
  }
};
function bu(n, e, t = void 0) {
  let o, i, r, s = null, a = 0;
  t || (t = {});
  const l = function() {
    a = t.leading === !1 ? 0 : Date.now(), s = null, r = n.apply(o, i), s === null && (o = i = null);
  };
  return function() {
    const c = Date.now();
    !a && t.leading === !1 && (a = c);
    const d = e - (c - a);
    return o = this, i = arguments, d <= 0 || d > e ? (s && (clearTimeout(s), s = null), a = c, r = n.apply(o, i), s === null && (o = i = null)) : !s && t.trailing !== !1 && (s = setTimeout(l, d)), r;
  };
}
const yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PromiseQueue: vu,
  beautifyShortcut: ou,
  cacheable: Qd,
  capitalize: nu,
  copyTextToClipboard: iu,
  debounce: ru,
  deepMerge: hn,
  deprecationAssert: hu,
  getUserOS: Ns,
  getValidUrl: pu,
  isBoolean: su,
  isClass: au,
  isEmpty: eu,
  isFunction: Ps,
  isIosDevice: tu,
  isNumber: lu,
  isObject: lo,
  isPrintableKey: fu,
  isPromise: cu,
  isString: du,
  isUndefined: uu,
  keyCodes: gu,
  mouseButtons: mu,
  notEmpty: Fn,
  throttle: bu,
  typeOf: Xe
}, Symbol.toStringTag, { value: "Module" })), jn = /* @__PURE__ */ uc(yu);
Object.defineProperty(Hn, "__esModule", { value: !0 });
Hn.containsOnlyInlineElements = xu;
var wu = jn, ku = An;
function xu(n) {
  var e;
  (0, wu.isString)(n) ? (e = document.createElement("div"), e.innerHTML = n) : e = n;
  var t = function(o) {
    return !(0, ku.blockElements)().includes(o.tagName.toLowerCase()) && Array.from(o.children).every(t);
  };
  return Array.from(e.children).every(t);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.containsOnlyInlineElements = void 0;
  var e = Hn;
  Object.defineProperty(n, "containsOnlyInlineElements", { enumerable: !0, get: function() {
    return e.containsOnlyInlineElements;
  } });
})(So);
var Ds = {}, zn = {}, Bo = {}, $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
$n.make = Cu;
function Cu(n, e, t) {
  var o;
  e === void 0 && (e = null), t === void 0 && (t = {});
  var i = document.createElement(n);
  if (Array.isArray(e)) {
    var r = e.filter(function(a) {
      return a !== void 0;
    });
    (o = i.classList).add.apply(o, r);
  } else
    e !== null && i.classList.add(e);
  for (var s in t)
    Object.prototype.hasOwnProperty.call(t, s) && (i[s] = t[s]);
  return i;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.make = void 0;
  var e = $n;
  Object.defineProperty(n, "make", { enumerable: !0, get: function() {
    return e.make;
  } });
})(Bo);
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.fragmentToString = Tu;
var Eu = Bo;
function Tu(n) {
  var e = (0, Eu.make)("div");
  return e.appendChild(n), e.innerHTML;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.fragmentToString = void 0;
  var e = zn;
  Object.defineProperty(n, "fragmentToString", { enumerable: !0, get: function() {
    return e.fragmentToString;
  } });
})(Ds);
var Rs = {}, Un = {};
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.getContentLength = Bu;
var Su = lt;
function Bu(n) {
  var e, t;
  return (0, Su.isNativeInput)(n) ? n.value.length : n.nodeType === Node.TEXT_NODE ? n.length : (t = (e = n.textContent) === null || e === void 0 ? void 0 : e.length) !== null && t !== void 0 ? t : 0;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.getContentLength = void 0;
  var e = Un;
  Object.defineProperty(n, "getContentLength", { enumerable: !0, get: function() {
    return e.getContentLength;
  } });
})(Rs);
var Vn = {}, qn = {}, kr = jt && jt.__spreadArray || function(n, e, t) {
  if (t || arguments.length === 2)
    for (var o = 0, i = e.length, r; o < i; o++)
      (r || !(o in e)) && (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
  return n.concat(r || Array.prototype.slice.call(e));
};
Object.defineProperty(qn, "__esModule", { value: !0 });
qn.getDeepestBlockElements = Hs;
var Iu = So;
function Hs(n) {
  return (0, Iu.containsOnlyInlineElements)(n) ? [n] : Array.from(n.children).reduce(function(e, t) {
    return kr(kr([], e, !0), Hs(t), !0);
  }, []);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.getDeepestBlockElements = void 0;
  var e = qn;
  Object.defineProperty(n, "getDeepestBlockElements", { enumerable: !0, get: function() {
    return e.getDeepestBlockElements;
  } });
})(Vn);
var Fs = {}, Wn = {}, Io = {}, Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.isLineBreakTag = Lu;
function Lu(n) {
  return [
    "BR",
    "WBR"
  ].includes(n.tagName);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isLineBreakTag = void 0;
  var e = Yn;
  Object.defineProperty(n, "isLineBreakTag", { enumerable: !0, get: function() {
    return e.isLineBreakTag;
  } });
})(Io);
var Lo = {}, Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.isSingleTag = Ou;
function Ou(n) {
  return [
    "AREA",
    "BASE",
    "BR",
    "COL",
    "COMMAND",
    "EMBED",
    "HR",
    "IMG",
    "INPUT",
    "KEYGEN",
    "LINK",
    "META",
    "PARAM",
    "SOURCE",
    "TRACK",
    "WBR"
  ].includes(n.tagName);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isSingleTag = void 0;
  var e = Xn;
  Object.defineProperty(n, "isSingleTag", { enumerable: !0, get: function() {
    return e.isSingleTag;
  } });
})(Lo);
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.getDeepestNode = js;
var Mu = lt, Au = Io, _u = Lo;
function js(n, e) {
  e === void 0 && (e = !1);
  var t = e ? "lastChild" : "firstChild", o = e ? "previousSibling" : "nextSibling";
  if (n.nodeType === Node.ELEMENT_NODE && n[t]) {
    var i = n[t];
    if ((0, _u.isSingleTag)(i) && !(0, Mu.isNativeInput)(i) && !(0, Au.isLineBreakTag)(i))
      if (i[o])
        i = i[o];
      else if (i.parentNode !== null && i.parentNode[o])
        i = i.parentNode[o];
      else
        return i.parentNode;
    return js(i, e);
  }
  return n;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.getDeepestNode = void 0;
  var e = Wn;
  Object.defineProperty(n, "getDeepestNode", { enumerable: !0, get: function() {
    return e.getDeepestNode;
  } });
})(Fs);
var zs = {}, Kn = {}, oo = jt && jt.__spreadArray || function(n, e, t) {
  if (t || arguments.length === 2)
    for (var o = 0, i = e.length, r; o < i; o++)
      (r || !(o in e)) && (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
  return n.concat(r || Array.prototype.slice.call(e));
};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.findAllInputs = Hu;
var Nu = So, Pu = Vn, Du = In, Ru = lt;
function Hu(n) {
  return Array.from(n.querySelectorAll((0, Du.allInputsSelector)())).reduce(function(e, t) {
    return (0, Ru.isNativeInput)(t) || (0, Nu.containsOnlyInlineElements)(t) ? oo(oo([], e, !0), [t], !1) : oo(oo([], e, !0), (0, Pu.getDeepestBlockElements)(t), !0);
  }, []);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.findAllInputs = void 0;
  var e = Kn;
  Object.defineProperty(n, "findAllInputs", { enumerable: !0, get: function() {
    return e.findAllInputs;
  } });
})(zs);
var $s = {}, Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.isCollapsedWhitespaces = Fu;
function Fu(n) {
  return !/[^\t\n\r ]/.test(n);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isCollapsedWhitespaces = void 0;
  var e = Zn;
  Object.defineProperty(n, "isCollapsedWhitespaces", { enumerable: !0, get: function() {
    return e.isCollapsedWhitespaces;
  } });
})($s);
var Gn = {}, Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.isElement = zu;
var ju = jn;
function zu(n) {
  return (0, ju.isNumber)(n) ? !1 : !!n && !!n.nodeType && n.nodeType === Node.ELEMENT_NODE;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isElement = void 0;
  var e = Jn;
  Object.defineProperty(n, "isElement", { enumerable: !0, get: function() {
    return e.isElement;
  } });
})(Gn);
var Us = {}, Qn = {}, ei = {}, ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.isLeaf = $u;
function $u(n) {
  return n === null ? !1 : n.childNodes.length === 0;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isLeaf = void 0;
  var e = ti;
  Object.defineProperty(n, "isLeaf", { enumerable: !0, get: function() {
    return e.isLeaf;
  } });
})(ei);
var oi = {}, ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
ni.isNodeEmpty = Yu;
var Uu = Io, Vu = Gn, qu = lt, Wu = Lo;
function Yu(n, e) {
  var t = "";
  return (0, Wu.isSingleTag)(n) && !(0, Uu.isLineBreakTag)(n) ? !1 : ((0, Vu.isElement)(n) && (0, qu.isNativeInput)(n) ? t = n.value : n.textContent !== null && (t = n.textContent.replace("​", "")), e !== void 0 && (t = t.replace(new RegExp(e, "g"), "")), t.trim().length === 0);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isNodeEmpty = void 0;
  var e = ni;
  Object.defineProperty(n, "isNodeEmpty", { enumerable: !0, get: function() {
    return e.isNodeEmpty;
  } });
})(oi);
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.isEmpty = Zu;
var Xu = ei, Ku = oi;
function Zu(n, e) {
  n.normalize();
  for (var t = [n]; t.length > 0; ) {
    var o = t.shift();
    if (o) {
      if (n = o, (0, Xu.isLeaf)(n) && !(0, Ku.isNodeEmpty)(n, e))
        return !1;
      t.push.apply(t, Array.from(n.childNodes));
    }
  }
  return !0;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isEmpty = void 0;
  var e = Qn;
  Object.defineProperty(n, "isEmpty", { enumerable: !0, get: function() {
    return e.isEmpty;
  } });
})(Us);
var Vs = {}, ii = {};
Object.defineProperty(ii, "__esModule", { value: !0 });
ii.isFragment = Ju;
var Gu = jn;
function Ju(n) {
  return (0, Gu.isNumber)(n) ? !1 : !!n && !!n.nodeType && n.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isFragment = void 0;
  var e = ii;
  Object.defineProperty(n, "isFragment", { enumerable: !0, get: function() {
    return e.isFragment;
  } });
})(Vs);
var qs = {}, ri = {};
Object.defineProperty(ri, "__esModule", { value: !0 });
ri.isHTMLString = eh;
var Qu = Bo;
function eh(n) {
  var e = (0, Qu.make)("div");
  return e.innerHTML = n, e.childElementCount > 0;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isHTMLString = void 0;
  var e = ri;
  Object.defineProperty(n, "isHTMLString", { enumerable: !0, get: function() {
    return e.isHTMLString;
  } });
})(qs);
var Ws = {}, si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
si.offset = th;
function th(n) {
  var e = n.getBoundingClientRect(), t = window.pageXOffset || document.documentElement.scrollLeft, o = window.pageYOffset || document.documentElement.scrollTop, i = e.top + o, r = e.left + t;
  return {
    top: i,
    left: r,
    bottom: i + e.height,
    right: r + e.width
  };
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.offset = void 0;
  var e = si;
  Object.defineProperty(n, "offset", { enumerable: !0, get: function() {
    return e.offset;
  } });
})(Ws);
var Ys = {}, ai = {};
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.prepend = oh;
function oh(n, e) {
  Array.isArray(e) ? (e = e.reverse(), e.forEach(function(t) {
    return n.prepend(t);
  })) : n.prepend(e);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.prepend = void 0;
  var e = ai;
  Object.defineProperty(n, "prepend", { enumerable: !0, get: function() {
    return e.prepend;
  } });
})(Ys);
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.prepend = n.offset = n.make = n.isLineBreakTag = n.isSingleTag = n.isNodeEmpty = n.isLeaf = n.isHTMLString = n.isFragment = n.isEmpty = n.isElement = n.isContentEditable = n.isCollapsedWhitespaces = n.findAllInputs = n.isNativeInput = n.allInputsSelector = n.getDeepestNode = n.getDeepestBlockElements = n.getContentLength = n.fragmentToString = n.containsOnlyInlineElements = n.canSetCaret = n.calculateBaseline = n.blockElements = n.append = void 0;
  var e = In;
  Object.defineProperty(n, "allInputsSelector", { enumerable: !0, get: function() {
    return e.allInputsSelector;
  } });
  var t = lt;
  Object.defineProperty(n, "isNativeInput", { enumerable: !0, get: function() {
    return t.isNativeInput;
  } });
  var o = Ms;
  Object.defineProperty(n, "append", { enumerable: !0, get: function() {
    return o.append;
  } });
  var i = An;
  Object.defineProperty(n, "blockElements", { enumerable: !0, get: function() {
    return i.blockElements;
  } });
  var r = As;
  Object.defineProperty(n, "calculateBaseline", { enumerable: !0, get: function() {
    return r.calculateBaseline;
  } });
  var s = _s;
  Object.defineProperty(n, "canSetCaret", { enumerable: !0, get: function() {
    return s.canSetCaret;
  } });
  var a = So;
  Object.defineProperty(n, "containsOnlyInlineElements", { enumerable: !0, get: function() {
    return a.containsOnlyInlineElements;
  } });
  var l = Ds;
  Object.defineProperty(n, "fragmentToString", { enumerable: !0, get: function() {
    return l.fragmentToString;
  } });
  var c = Rs;
  Object.defineProperty(n, "getContentLength", { enumerable: !0, get: function() {
    return c.getContentLength;
  } });
  var d = Vn;
  Object.defineProperty(n, "getDeepestBlockElements", { enumerable: !0, get: function() {
    return d.getDeepestBlockElements;
  } });
  var u = Fs;
  Object.defineProperty(n, "getDeepestNode", { enumerable: !0, get: function() {
    return u.getDeepestNode;
  } });
  var p = zs;
  Object.defineProperty(n, "findAllInputs", { enumerable: !0, get: function() {
    return p.findAllInputs;
  } });
  var y = $s;
  Object.defineProperty(n, "isCollapsedWhitespaces", { enumerable: !0, get: function() {
    return y.isCollapsedWhitespaces;
  } });
  var v = Dn;
  Object.defineProperty(n, "isContentEditable", { enumerable: !0, get: function() {
    return v.isContentEditable;
  } });
  var g = Gn;
  Object.defineProperty(n, "isElement", { enumerable: !0, get: function() {
    return g.isElement;
  } });
  var b = Us;
  Object.defineProperty(n, "isEmpty", { enumerable: !0, get: function() {
    return b.isEmpty;
  } });
  var I = Vs;
  Object.defineProperty(n, "isFragment", { enumerable: !0, get: function() {
    return I.isFragment;
  } });
  var B = qs;
  Object.defineProperty(n, "isHTMLString", { enumerable: !0, get: function() {
    return B.isHTMLString;
  } });
  var D = ei;
  Object.defineProperty(n, "isLeaf", { enumerable: !0, get: function() {
    return D.isLeaf;
  } });
  var P = oi;
  Object.defineProperty(n, "isNodeEmpty", { enumerable: !0, get: function() {
    return P.isNodeEmpty;
  } });
  var _ = Io;
  Object.defineProperty(n, "isLineBreakTag", { enumerable: !0, get: function() {
    return _.isLineBreakTag;
  } });
  var z = Lo;
  Object.defineProperty(n, "isSingleTag", { enumerable: !0, get: function() {
    return z.isSingleTag;
  } });
  var te = Bo;
  Object.defineProperty(n, "make", { enumerable: !0, get: function() {
    return te.make;
  } });
  var M = Ws;
  Object.defineProperty(n, "offset", { enumerable: !0, get: function() {
    return M.offset;
  } });
  var O = Ys;
  Object.defineProperty(n, "prepend", { enumerable: !0, get: function() {
    return O.prepend;
  } });
})(at);
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
Oo.getContenteditableSlice = ih;
var nh = at;
function ih(n, e, t, o, i) {
  var r;
  i === void 0 && (i = !1);
  var s = document.createRange();
  if (o === "left" ? (s.setStart(n, 0), s.setEnd(e, t)) : (s.setStart(e, t), s.setEnd(n, n.childNodes.length)), i === !0) {
    var a = s.extractContents();
    return (0, nh.fragmentToString)(a);
  }
  var l = s.cloneContents(), c = document.createElement("div");
  c.appendChild(l);
  var d = (r = c.textContent) !== null && r !== void 0 ? r : "";
  return d;
}
Object.defineProperty(To, "__esModule", { value: !0 });
To.checkContenteditableSliceForEmptiness = ah;
var rh = at, sh = Oo;
function ah(n, e, t, o) {
  var i = (0, sh.getContenteditableSlice)(n, e, t, o);
  return (0, rh.isCollapsedWhitespaces)(i);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.checkContenteditableSliceForEmptiness = void 0;
  var e = To;
  Object.defineProperty(n, "checkContenteditableSliceForEmptiness", { enumerable: !0, get: function() {
    return e.checkContenteditableSliceForEmptiness;
  } });
})(Bn);
var Xs = {};
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.getContenteditableSlice = void 0;
  var e = Oo;
  Object.defineProperty(n, "getContenteditableSlice", { enumerable: !0, get: function() {
    return e.getContenteditableSlice;
  } });
})(Xs);
var Ks = {}, li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.focus = ch;
var lh = at;
function ch(n, e) {
  var t, o;
  if (e === void 0 && (e = !0), (0, lh.isNativeInput)(n)) {
    n.focus();
    var i = e ? 0 : n.value.length;
    n.setSelectionRange(i, i);
  } else {
    var r = document.createRange(), s = window.getSelection();
    if (!s)
      return;
    var a = function(p) {
      var y = document.createTextNode("");
      p.appendChild(y), r.setStart(y, 0), r.setEnd(y, 0);
    }, l = function(p) {
      return p != null;
    }, c = n.childNodes, d = e ? c[0] : c[c.length - 1];
    if (l(d)) {
      for (; l(d) && d.nodeType !== Node.TEXT_NODE; )
        d = e ? d.firstChild : d.lastChild;
      if (l(d) && d.nodeType === Node.TEXT_NODE) {
        var u = (o = (t = d.textContent) === null || t === void 0 ? void 0 : t.length) !== null && o !== void 0 ? o : 0, i = e ? 0 : u;
        r.setStart(d, i), r.setEnd(d, i);
      } else
        a(n);
    } else
      a(n);
    s.removeAllRanges(), s.addRange(r);
  }
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.focus = void 0;
  var e = li;
  Object.defineProperty(n, "focus", { enumerable: !0, get: function() {
    return e.focus;
  } });
})(Ks);
var ci = {}, Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
Mo.getCaretNodeAndOffset = dh;
function dh() {
  var n = window.getSelection();
  if (n === null)
    return [null, 0];
  var e = n.focusNode, t = n.focusOffset;
  return e === null ? [null, 0] : (e.nodeType !== Node.TEXT_NODE && e.childNodes.length > 0 && (e.childNodes[t] !== void 0 ? (e = e.childNodes[t], t = 0) : (e = e.childNodes[t - 1], e.textContent !== null && (t = e.textContent.length))), [e, t]);
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.getCaretNodeAndOffset = void 0;
  var e = Mo;
  Object.defineProperty(n, "getCaretNodeAndOffset", { enumerable: !0, get: function() {
    return e.getCaretNodeAndOffset;
  } });
})(ci);
var Zs = {}, Ao = {};
Object.defineProperty(Ao, "__esModule", { value: !0 });
Ao.getRange = uh;
function uh() {
  var n = window.getSelection();
  return n && n.rangeCount ? n.getRangeAt(0) : null;
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.getRange = void 0;
  var e = Ao;
  Object.defineProperty(n, "getRange", { enumerable: !0, get: function() {
    return e.getRange;
  } });
})(Zs);
var Gs = {}, di = {};
Object.defineProperty(di, "__esModule", { value: !0 });
di.isCaretAtEndOfInput = fh;
var xr = at, hh = ci, ph = Bn;
function fh(n) {
  var e = (0, xr.getDeepestNode)(n, !0);
  if (e === null)
    return !0;
  if ((0, xr.isNativeInput)(e))
    return e.selectionEnd === e.value.length;
  var t = (0, hh.getCaretNodeAndOffset)(), o = t[0], i = t[1];
  return o === null ? !1 : (0, ph.checkContenteditableSliceForEmptiness)(n, o, i, "right");
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isCaretAtEndOfInput = void 0;
  var e = di;
  Object.defineProperty(n, "isCaretAtEndOfInput", { enumerable: !0, get: function() {
    return e.isCaretAtEndOfInput;
  } });
})(Gs);
var Js = {}, ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.isCaretAtStartOfInput = vh;
var no = at, gh = Mo, mh = To;
function vh(n) {
  var e = (0, no.getDeepestNode)(n);
  if (e === null || (0, no.isEmpty)(n))
    return !0;
  if ((0, no.isNativeInput)(e))
    return e.selectionEnd === 0;
  if ((0, no.isEmpty)(n))
    return !0;
  var t = (0, gh.getCaretNodeAndOffset)(), o = t[0], i = t[1];
  return o === null ? !1 : (0, mh.checkContenteditableSliceForEmptiness)(n, o, i, "left");
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.isCaretAtStartOfInput = void 0;
  var e = ui;
  Object.defineProperty(n, "isCaretAtStartOfInput", { enumerable: !0, get: function() {
    return e.isCaretAtStartOfInput;
  } });
})(Js);
var Qs = {}, hi = {};
Object.defineProperty(hi, "__esModule", { value: !0 });
hi.save = wh;
var bh = at, yh = Ao;
function wh() {
  var n = (0, yh.getRange)(), e = (0, bh.make)("span");
  if (e.id = "cursor", e.hidden = !0, !!n)
    return n.insertNode(e), function() {
      var t = window.getSelection();
      t && (n.setStartAfter(e), n.setEndAfter(e), t.removeAllRanges(), t.addRange(n), setTimeout(function() {
        e.remove();
      }, 150));
    };
}
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.save = void 0;
  var e = hi;
  Object.defineProperty(n, "save", { enumerable: !0, get: function() {
    return e.save;
  } });
})(Qs);
(function(n) {
  Object.defineProperty(n, "__esModule", { value: !0 }), n.save = n.isCaretAtStartOfInput = n.isCaretAtEndOfInput = n.getRange = n.getCaretNodeAndOffset = n.focus = n.getContenteditableSlice = n.checkContenteditableSliceForEmptiness = void 0;
  var e = Bn;
  Object.defineProperty(n, "checkContenteditableSliceForEmptiness", { enumerable: !0, get: function() {
    return e.checkContenteditableSliceForEmptiness;
  } });
  var t = Xs;
  Object.defineProperty(n, "getContenteditableSlice", { enumerable: !0, get: function() {
    return t.getContenteditableSlice;
  } });
  var o = Ks;
  Object.defineProperty(n, "focus", { enumerable: !0, get: function() {
    return o.focus;
  } });
  var i = ci;
  Object.defineProperty(n, "getCaretNodeAndOffset", { enumerable: !0, get: function() {
    return i.getCaretNodeAndOffset;
  } });
  var r = Zs;
  Object.defineProperty(n, "getRange", { enumerable: !0, get: function() {
    return r.getRange;
  } });
  var s = Gs;
  Object.defineProperty(n, "isCaretAtEndOfInput", { enumerable: !0, get: function() {
    return s.isCaretAtEndOfInput;
  } });
  var a = Js;
  Object.defineProperty(n, "isCaretAtStartOfInput", { enumerable: !0, get: function() {
    return a.isCaretAtStartOfInput;
  } });
  var l = Qs;
  Object.defineProperty(n, "save", { enumerable: !0, get: function() {
    return l.save;
  } });
})(Os);
class kh extends W {
  /**
   * All keydowns on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  keydown(e) {
    switch (this.beforeKeydownProcessing(e), e.keyCode) {
      case j.BACKSPACE:
        this.backspace(e);
        break;
      case j.DELETE:
        this.delete(e);
        break;
      case j.ENTER:
        this.enter(e);
        break;
      case j.DOWN:
      case j.RIGHT:
        this.arrowRightAndDown(e);
        break;
      case j.UP:
      case j.LEFT:
        this.arrowLeftAndUp(e);
        break;
      case j.TAB:
        this.tabPressed(e);
        break;
    }
    e.key === "/" && !e.ctrlKey && !e.metaKey && this.slashPressed(e), e.code === "Slash" && (e.ctrlKey || e.metaKey) && (e.preventDefault(), this.commandSlashPressed());
  }
  /**
   * Fires on keydown before event processing
   *
   * @param {KeyboardEvent} event - keydown
   */
  beforeKeydownProcessing(e) {
    this.needToolbarClosing(e) && Jr(e.keyCode) && (this.Editor.Toolbar.close(), e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || this.Editor.BlockSelection.clearSelection(e));
  }
  /**
   * Key up on Block:
   * - shows Inline Toolbar if something selected
   * - shows conversion toolbar with 85% of block selection
   *
   * @param {KeyboardEvent} event - keyup event
   */
  keyup(e) {
    e.shiftKey || this.Editor.UI.checkEmptiness();
  }
  /**
   * Add drop target styles
   *
   * @param {DragEvent} event - drag over event
   */
  dragOver(e) {
    const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
    t.dropTarget = !0;
  }
  /**
   * Remove drop target style
   *
   * @param {DragEvent} event - drag leave event
   */
  dragLeave(e) {
    const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
    t.dropTarget = !1;
  }
  /**
   * Copying selected blocks
   * Before putting to the clipboard we sanitize all blocks and then copy to the clipboard
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandC(e) {
    const { BlockSelection: t } = this.Editor;
    t.anyBlockSelected && t.copySelectedBlocks(e);
  }
  /**
   * Copy and Delete selected Blocks
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandX(e) {
    const { BlockSelection: t, BlockManager: o, Caret: i } = this.Editor;
    t.anyBlockSelected && t.copySelectedBlocks(e).then(() => {
      const r = o.removeSelectedBlocks(), s = o.insertDefaultBlockAtIndex(r, !0);
      i.setToBlock(s, i.positions.START), t.clearSelection(e);
    });
  }
  /**
   * Tab pressed inside a Block.
   *
   * @param {KeyboardEvent} event - keydown
   */
  tabPressed(e) {
    const { InlineToolbar: t, Caret: o } = this.Editor;
    t.opened || (e.shiftKey ? o.navigatePrevious(!0) : o.navigateNext(!0)) && e.preventDefault();
  }
  /**
   * '/' + 'command' keydown inside a Block
   */
  commandSlashPressed() {
    this.Editor.BlockSelection.selectedBlocks.length > 1 || this.activateBlockSettings();
  }
  /**
   * '/' keydown inside a Block
   *
   * @param event - keydown
   */
  slashPressed(e) {
    !this.Editor.UI.nodes.wrapper.contains(e.target) || !this.Editor.BlockManager.currentBlock.isEmpty || (e.preventDefault(), this.Editor.Caret.insertContentAtCaretPosition("/"), this.activateToolbox());
  }
  /**
   * ENTER pressed on block
   *
   * @param {KeyboardEvent} event - keydown
   */
  enter(e) {
    const { BlockManager: t, UI: o } = this.Editor, i = t.currentBlock;
    if (i === void 0 || i.tool.isLineBreaksEnabled || o.someToolbarOpened && o.someFlipperButtonFocused || e.shiftKey && !ln)
      return;
    let r = i;
    i.currentInput !== void 0 && so(i.currentInput) && !i.hasMedia ? this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex) : i.currentInput && ao(i.currentInput) ? r = this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex + 1) : r = this.Editor.BlockManager.split(), this.Editor.Caret.setToBlock(r), this.Editor.Toolbar.moveAndOpen(r), e.preventDefault();
  }
  /**
   * Handle backspace keydown on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  backspace(e) {
    const { BlockManager: t, Caret: o } = this.Editor, { currentBlock: i, previousBlock: r } = t;
    if (!(i === void 0 || !F.isCollapsed || !i.currentInput || !so(i.currentInput))) {
      if (e.preventDefault(), this.Editor.Toolbar.close(), i.currentInput !== i.firstInput) {
        o.navigatePrevious();
        return;
      }
      if (r !== null) {
        if (r.isEmpty) {
          t.removeBlock(r);
          return;
        }
        if (i.isEmpty) {
          t.removeBlock(i);
          const s = t.currentBlock;
          o.setToBlock(s, o.positions.END);
          return;
        }
        mr(r, i) ? this.mergeBlocks(r, i) : o.setToBlock(r, o.positions.END);
      }
    }
  }
  /**
   * Handles delete keydown on Block
   * Removes char after the caret.
   * If caret is at the end of the block, merge next block with current
   *
   * @param {KeyboardEvent} event - keydown
   */
  delete(e) {
    const { BlockManager: t, Caret: o } = this.Editor, { currentBlock: i, nextBlock: r } = t;
    if (!(!F.isCollapsed || !ao(i.currentInput))) {
      if (e.preventDefault(), this.Editor.Toolbar.close(), i.currentInput !== i.lastInput) {
        o.navigateNext();
        return;
      }
      if (r !== null) {
        if (r.isEmpty) {
          t.removeBlock(r);
          return;
        }
        if (i.isEmpty) {
          t.removeBlock(i), o.setToBlock(r, o.positions.START);
          return;
        }
        mr(i, r) ? this.mergeBlocks(i, r) : o.setToBlock(r, o.positions.START);
      }
    }
  }
  /**
   * Merge passed Blocks
   *
   * @param targetBlock - to which Block we want to merge
   * @param blockToMerge - what Block we want to merge
   */
  mergeBlocks(e, t) {
    const { BlockManager: o, Toolbar: i } = this.Editor;
    e.lastInput !== void 0 && (Os.focus(e.lastInput, !1), o.mergeBlocks(e, t).then(() => {
      i.close();
    }));
  }
  /**
   * Handle right and down keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowRightAndDown(e) {
    const t = rt.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === j.TAB);
    if (this.Editor.UI.someToolbarOpened && t)
      return;
    this.Editor.Toolbar.close();
    const { currentBlock: o } = this.Editor.BlockManager, i = ((o == null ? void 0 : o.currentInput) !== void 0 ? ao(o.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
    if (e.shiftKey && e.keyCode === j.DOWN && i) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState();
      return;
    }
    if (e.keyCode === j.DOWN || e.keyCode === j.RIGHT && !this.isRtl ? this.Editor.Caret.navigateNext() : this.Editor.Caret.navigatePrevious()) {
      e.preventDefault();
      return;
    }
    co(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Handle left and up keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowLeftAndUp(e) {
    if (this.Editor.UI.someToolbarOpened) {
      if (rt.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === j.TAB))
        return;
      this.Editor.UI.closeAllToolbars();
    }
    this.Editor.Toolbar.close();
    const { currentBlock: t } = this.Editor.BlockManager, o = ((t == null ? void 0 : t.currentInput) !== void 0 ? so(t.currentInput) : void 0) || this.Editor.BlockSelection.anyBlockSelected;
    if (e.shiftKey && e.keyCode === j.UP && o) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState(!1);
      return;
    }
    if (e.keyCode === j.UP || e.keyCode === j.LEFT && !this.isRtl ? this.Editor.Caret.navigatePrevious() : this.Editor.Caret.navigateNext()) {
      e.preventDefault();
      return;
    }
    co(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Cases when we need to close Toolbar
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  needToolbarClosing(e) {
    const t = e.keyCode === j.ENTER && this.Editor.Toolbar.toolbox.opened, o = e.keyCode === j.ENTER && this.Editor.BlockSettings.opened, i = e.keyCode === j.ENTER && this.Editor.InlineToolbar.opened, r = e.keyCode === j.TAB;
    return !(e.shiftKey || r || t || o || i);
  }
  /**
   * If Toolbox is not open, then just open it and show plus button
   */
  activateToolbox() {
    this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open();
  }
  /**
   * Open Toolbar and show BlockSettings before flipping Tools
   */
  activateBlockSettings() {
    this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.opened || this.Editor.BlockSettings.open();
  }
}
class tn {
  /**
   * @class
   * @param {HTMLElement} workingArea — editor`s working node
   */
  constructor(e) {
    this.blocks = [], this.workingArea = e;
  }
  /**
   * Get length of Block instances array
   *
   * @returns {number}
   */
  get length() {
    return this.blocks.length;
  }
  /**
   * Get Block instances array
   *
   * @returns {Block[]}
   */
  get array() {
    return this.blocks;
  }
  /**
   * Get blocks html elements array
   *
   * @returns {HTMLElement[]}
   */
  get nodes() {
    return Qr(this.workingArea.children);
  }
  /**
   * Proxy trap to implement array-like setter
   *
   * @example
   * blocks[0] = new Block(...)
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — block index or any Blocks class property key to set
   * @param {Block} value — value to set
   * @returns {boolean}
   */
  static set(e, t, o) {
    return isNaN(Number(t)) ? (Reflect.set(e, t, o), !0) : (e.insert(+t, o), !0);
  }
  /**
   * Proxy trap to implement array-like getter
   *
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — Blocks class property key
   * @returns {Block|*}
   */
  static get(e, t) {
    return isNaN(Number(t)) ? Reflect.get(e, t) : e.get(+t);
  }
  /**
   * Push new Block to the blocks array and append it to working area
   *
   * @param {Block} block - Block to add
   */
  push(e) {
    this.blocks.push(e), this.insertToDOM(e);
  }
  /**
   * Swaps blocks with indexes first and second
   *
   * @param {number} first - first block index
   * @param {number} second - second block index
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    const o = this.blocks[t];
    k.swap(this.blocks[e].holder, o.holder), this.blocks[t] = this.blocks[e], this.blocks[e] = o;
  }
  /**
   * Move a block from one to another index
   *
   * @param {number} toIndex - new index of the block
   * @param {number} fromIndex - block to move
   */
  move(e, t) {
    const o = this.blocks.splice(t, 1)[0], i = e - 1, r = Math.max(0, i), s = this.blocks[r];
    e > 0 ? this.insertToDOM(o, "afterend", s) : this.insertToDOM(o, "beforebegin", s), this.blocks.splice(e, 0, o);
    const a = this.composeBlockEvent("move", {
      fromIndex: t,
      toIndex: e
    });
    o.call(Fe.MOVED, a);
  }
  /**
   * Insert new Block at passed index
   *
   * @param {number} index — index to insert Block
   * @param {Block} block — Block to insert
   * @param {boolean} replace — it true, replace block on given index
   */
  insert(e, t, o = !1) {
    if (!this.length) {
      this.push(t);
      return;
    }
    e > this.length && (e = this.length), o && (this.blocks[e].holder.remove(), this.blocks[e].call(Fe.REMOVED));
    const i = o ? 1 : 0;
    if (this.blocks.splice(e, i, t), e > 0) {
      const r = this.blocks[e - 1];
      this.insertToDOM(t, "afterend", r);
    } else {
      const r = this.blocks[e + 1];
      r ? this.insertToDOM(t, "beforebegin", r) : this.insertToDOM(t);
    }
  }
  /**
   * Replaces block under passed index with passed block
   *
   * @param index - index of existed block
   * @param block - new block
   */
  replace(e, t) {
    if (this.blocks[e] === void 0)
      throw Error("Incorrect index");
    this.blocks[e].holder.replaceWith(t.holder), this.blocks[e] = t;
  }
  /**
   * Inserts several blocks at once
   *
   * @param blocks - blocks to insert
   * @param index - index to insert blocks at
   */
  insertMany(e, t) {
    const o = new DocumentFragment();
    for (const i of e)
      o.appendChild(i.holder);
    if (this.length > 0) {
      if (t > 0) {
        const i = Math.min(t - 1, this.length - 1);
        this.blocks[i].holder.after(o);
      } else
        t === 0 && this.workingArea.prepend(o);
      this.blocks.splice(t, 0, ...e);
    } else
      this.blocks.push(...e), this.workingArea.appendChild(o);
    e.forEach((i) => i.call(Fe.RENDERED));
  }
  /**
   * Remove block
   *
   * @param {number} index - index of Block to remove
   */
  remove(e) {
    isNaN(e) && (e = this.length - 1), this.blocks[e].holder.remove(), this.blocks[e].call(Fe.REMOVED), this.blocks.splice(e, 1);
  }
  /**
   * Remove all blocks
   */
  removeAll() {
    this.workingArea.innerHTML = "", this.blocks.forEach((e) => e.call(Fe.REMOVED)), this.blocks.length = 0;
  }
  /**
   * Insert Block after passed target
   *
   * @todo decide if this method is necessary
   * @param {Block} targetBlock — target after which Block should be inserted
   * @param {Block} newBlock — Block to insert
   */
  insertAfter(e, t) {
    const o = this.blocks.indexOf(e);
    this.insert(o + 1, t);
  }
  /**
   * Get Block by index
   *
   * @param {number} index — Block index
   * @returns {Block}
   */
  get(e) {
    return this.blocks[e];
  }
  /**
   * Return index of passed Block
   *
   * @param {Block} block - Block to find
   * @returns {number}
   */
  indexOf(e) {
    return this.blocks.indexOf(e);
  }
  /**
   * Insert new Block into DOM
   *
   * @param {Block} block - Block to insert
   * @param {InsertPosition} position — insert position (if set, will use insertAdjacentElement)
   * @param {Block} target — Block related to position
   */
  insertToDOM(e, t, o) {
    t ? o.holder.insertAdjacentElement(t, e.holder) : this.workingArea.appendChild(e.holder), e.call(Fe.RENDERED);
  }
  /**
   * Composes Block event with passed type and details
   *
   * @param {string} type - event type
   * @param {object} detail - event detail
   */
  composeBlockEvent(e, t) {
    return new CustomEvent(e, {
      detail: t
    });
  }
}
const Cr = "block-removed", Er = "block-added", xh = "block-moved", Tr = "block-changed";
class Ch {
  constructor() {
    this.completed = Promise.resolve();
  }
  /**
   * Add new promise to queue
   *
   * @param operation - promise should be added to queue
   */
  add(e) {
    return new Promise((t, o) => {
      this.completed = this.completed.then(e).then(t).catch(o);
    });
  }
}
class Eh extends W {
  constructor() {
    super(...arguments), this._currentBlockIndex = -1, this._blocks = null;
  }
  /**
   * Returns current Block index
   *
   * @returns {number}
   */
  get currentBlockIndex() {
    return this._currentBlockIndex;
  }
  /**
   * Set current Block index and fire Block lifecycle callbacks
   *
   * @param {number} newIndex - index of Block to set as current
   */
  set currentBlockIndex(e) {
    this._currentBlockIndex = e;
  }
  /**
   * returns first Block
   *
   * @returns {Block}
   */
  get firstBlock() {
    return this._blocks[0];
  }
  /**
   * returns last Block
   *
   * @returns {Block}
   */
  get lastBlock() {
    return this._blocks[this._blocks.length - 1];
  }
  /**
   * Get current Block instance
   *
   * @returns {Block}
   */
  get currentBlock() {
    return this._blocks[this.currentBlockIndex];
  }
  /**
   * Set passed Block as a current
   *
   * @param block - block to set as a current
   */
  set currentBlock(e) {
    this.currentBlockIndex = this.getBlockIndex(e);
  }
  /**
   * Returns next Block instance
   *
   * @returns {Block|null}
   */
  get nextBlock() {
    return this.currentBlockIndex === this._blocks.length - 1 ? null : this._blocks[this.currentBlockIndex + 1];
  }
  /**
   * Return first Block with inputs after current Block
   *
   * @returns {Block | undefined}
   */
  get nextContentfulBlock() {
    return this.blocks.slice(this.currentBlockIndex + 1).find((e) => !!e.inputs.length);
  }
  /**
   * Return first Block with inputs before current Block
   *
   * @returns {Block | undefined}
   */
  get previousContentfulBlock() {
    return this.blocks.slice(0, this.currentBlockIndex).reverse().find((e) => !!e.inputs.length);
  }
  /**
   * Returns previous Block instance
   *
   * @returns {Block|null}
   */
  get previousBlock() {
    return this.currentBlockIndex === 0 ? null : this._blocks[this.currentBlockIndex - 1];
  }
  /**
   * Get array of Block instances
   *
   * @returns {Block[]} {@link Blocks#array}
   */
  get blocks() {
    return this._blocks.array;
  }
  /**
   * Check if each Block is empty
   *
   * @returns {boolean}
   */
  get isEditorEmpty() {
    return this.blocks.every((e) => e.isEmpty);
  }
  /**
   * Should be called after Editor.UI preparation
   * Define this._blocks property
   */
  prepare() {
    const e = new tn(this.Editor.UI.nodes.redactor);
    this._blocks = new Proxy(e, {
      set: tn.set,
      get: tn.get
    }), this.listeners.on(
      document,
      "copy",
      (t) => this.Editor.BlockEvents.handleCommandC(t)
    );
  }
  /**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - Unbind event handlers from created Blocks
   *
   * if readOnly is false:
   *  - Bind event handlers to all existing Blocks
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Creates Block instance by tool name
   *
   * @param {object} options - block creation options
   * @param {string} options.tool - tools passed in editor config {@link EditorConfig#tools}
   * @param {string} [options.id] - unique id for this block
   * @param {BlockToolData} [options.data] - constructor params
   * @returns {Block}
   */
  composeBlock({
    tool: e,
    data: t = {},
    id: o = void 0,
    tunes: i = {}
  }) {
    const r = this.Editor.ReadOnly.isEnabled, s = this.Editor.Tools.blockTools.get(e), a = new je({
      id: o,
      data: t,
      tool: s,
      api: this.Editor.API,
      readOnly: r,
      tunesData: i
    }, this.eventsDispatcher);
    return r || window.requestIdleCallback(() => {
      this.bindBlockEvents(a);
    }, { timeout: 2e3 }), a;
  }
  /**
   * Insert new block into _blocks
   *
   * @param {object} options - insert options
   * @param {string} [options.id] - block's unique id
   * @param {string} [options.tool] - plugin name, by default method inserts the default block type
   * @param {object} [options.data] - plugin data
   * @param {number} [options.index] - index where to insert new Block
   * @param {boolean} [options.needToFocus] - flag shows if needed to update current Block index
   * @param {boolean} [options.replace] - flag shows if block by passed index should be replaced with inserted one
   * @returns {Block}
   */
  insert({
    id: e = void 0,
    tool: t = this.config.defaultBlock,
    data: o = {},
    index: i,
    needToFocus: r = !0,
    replace: s = !1,
    tunes: a = {}
  } = {}) {
    let l = i;
    l === void 0 && (l = this.currentBlockIndex + (s ? 0 : 1));
    const c = this.composeBlock({
      id: e,
      tool: t,
      data: o,
      tunes: a
    });
    return s && this.blockDidMutated(Cr, this.getBlockByIndex(l), {
      index: l
    }), this._blocks.insert(l, c, s), this.blockDidMutated(Er, c, {
      index: l
    }), r ? this.currentBlockIndex = l : l <= this.currentBlockIndex && this.currentBlockIndex++, c;
  }
  /**
   * Inserts several blocks at once
   *
   * @param blocks - blocks to insert
   * @param index - index where to insert
   */
  insertMany(e, t = 0) {
    this._blocks.insertMany(e, t);
  }
  /**
   * Update Block data.
   *
   * Currently we don't have an 'update' method in the Tools API, so we just create a new block with the same id and type
   * Should not trigger 'block-removed' or 'block-added' events.
   *
   * If neither data nor tunes is provided, return the provided block instead.
   *
   * @param block - block to update
   * @param data - (optional) new data
   * @param tunes - (optional) tune data
   */
  async update(e, t, o) {
    if (!t && !o)
      return e;
    const i = await e.data, r = this.composeBlock({
      id: e.id,
      tool: e.name,
      data: Object.assign({}, i, t ?? {}),
      tunes: o ?? e.tunes
    }), s = this.getBlockIndex(e);
    return this._blocks.replace(s, r), this.blockDidMutated(Tr, r, {
      index: s
    }), r;
  }
  /**
   * Replace passed Block with the new one with specified Tool and data
   *
   * @param block - block to replace
   * @param newTool - new Tool name
   * @param data - new Tool data
   */
  replace(e, t, o) {
    const i = this.getBlockIndex(e);
    return this.insert({
      tool: t,
      data: o,
      index: i,
      replace: !0
    });
  }
  /**
   * Insert pasted content. Call onPaste callback after insert.
   *
   * @param {string} toolName - name of Tool to insert
   * @param {PasteEvent} pasteEvent - pasted data
   * @param {boolean} replace - should replace current block
   */
  paste(e, t, o = !1) {
    const i = this.insert({
      tool: e,
      replace: o
    });
    try {
      window.requestIdleCallback(() => {
        i.call(Fe.ON_PASTE, t);
      });
    } catch (r) {
      X(`${e}: onPaste callback call is failed`, "error", r);
    }
    return i;
  }
  /**
   * Insert new default block at passed index
   *
   * @param {number} index - index where Block should be inserted
   * @param {boolean} needToFocus - if true, updates current Block index
   *
   * TODO: Remove method and use insert() with index instead (?)
   * @returns {Block} inserted Block
   */
  insertDefaultBlockAtIndex(e, t = !1) {
    const o = this.composeBlock({ tool: this.config.defaultBlock });
    return this._blocks[e] = o, this.blockDidMutated(Er, o, {
      index: e
    }), t ? this.currentBlockIndex = e : e <= this.currentBlockIndex && this.currentBlockIndex++, o;
  }
  /**
   * Always inserts at the end
   *
   * @returns {Block}
   */
  insertAtEnd() {
    return this.currentBlockIndex = this.blocks.length - 1, this.insert();
  }
  /**
   * Merge two blocks
   *
   * @param {Block} targetBlock - previous block will be append to this block
   * @param {Block} blockToMerge - block that will be merged with target block
   * @returns {Promise} - the sequence that can be continued
   */
  async mergeBlocks(e, t) {
    let o;
    if (e.name === t.name && e.mergeable) {
      const i = await t.data;
      if (Oe(i)) {
        console.error("Could not merge Block. Failed to extract original Block data.");
        return;
      }
      const [r] = wn([i], e.tool.sanitizeConfig);
      o = r;
    } else if (e.mergeable && ho(t, "export") && ho(e, "import")) {
      const i = await t.exportDataAsString(), r = Ne(i, e.tool.sanitizeConfig);
      o = vr(r, e.tool.conversionConfig);
    }
    o !== void 0 && (await e.mergeWith(o), this.removeBlock(t), this.currentBlockIndex = this._blocks.indexOf(e));
  }
  /**
   * Remove passed Block
   *
   * @param block - Block to remove
   * @param addLastBlock - if true, adds new default block at the end. @todo remove this logic and use event-bus instead
   */
  removeBlock(e, t = !0) {
    return new Promise((o) => {
      const i = this._blocks.indexOf(e);
      if (!this.validateIndex(i))
        throw new Error("Can't find a Block to remove");
      this._blocks.remove(i), e.destroy(), this.blockDidMutated(Cr, e, {
        index: i
      }), this.currentBlockIndex >= i && this.currentBlockIndex--, this.blocks.length ? i === 0 && (this.currentBlockIndex = 0) : (this.unsetCurrentBlock(), t && this.insert()), o();
    });
  }
  /**
   * Remove only selected Blocks
   * and returns first Block index where started removing...
   *
   * @returns {number|undefined}
   */
  removeSelectedBlocks() {
    let e;
    for (let t = this.blocks.length - 1; t >= 0; t--)
      this.blocks[t].selected && (this.removeBlock(this.blocks[t]), e = t);
    return e;
  }
  /**
   * Attention!
   * After removing insert the new default typed Block and focus on it
   * Removes all blocks
   */
  removeAllBlocks() {
    for (let e = this.blocks.length - 1; e >= 0; e--)
      this._blocks.remove(e);
    this.unsetCurrentBlock(), this.insert(), this.currentBlock.firstInput.focus();
  }
  /**
   * Split current Block
   * 1. Extract content from Caret position to the Block`s end
   * 2. Insert a new Block below current one with extracted content
   *
   * @returns {Block}
   */
  split() {
    const e = this.Editor.Caret.extractFragmentFromCaretPosition(), t = k.make("div");
    t.appendChild(e);
    const o = {
      text: k.isEmpty(t) ? "" : t.innerHTML
    };
    return this.insert({ data: o });
  }
  /**
   * Returns Block by passed index
   *
   * @param {number} index - index to get. -1 to get last
   * @returns {Block}
   */
  getBlockByIndex(e) {
    return e === -1 && (e = this._blocks.length - 1), this._blocks[e];
  }
  /**
   * Returns an index for passed Block
   *
   * @param block - block to find index
   */
  getBlockIndex(e) {
    return this._blocks.indexOf(e);
  }
  /**
   * Returns the Block by passed id
   *
   * @param id - id of block to get
   * @returns {Block}
   */
  getBlockById(e) {
    return this._blocks.array.find((t) => t.id === e);
  }
  /**
   * Get Block instance by html element
   *
   * @param {Node} element - html element to get Block by
   */
  getBlock(e) {
    k.isElement(e) || (e = e.parentNode);
    const t = this._blocks.nodes, o = e.closest(`.${je.CSS.wrapper}`), i = t.indexOf(o);
    if (i >= 0)
      return this._blocks[i];
  }
  /**
   * 1) Find first-level Block from passed child Node
   * 2) Mark it as current
   *
   * @param {Node} childNode - look ahead from this node.
   * @returns {Block | undefined} can return undefined in case when the passed child note is not a part of the current editor instance
   */
  setCurrentBlockByChildNode(e) {
    k.isElement(e) || (e = e.parentNode);
    const t = e.closest(`.${je.CSS.wrapper}`);
    if (!t)
      return;
    const o = t.closest(`.${this.Editor.UI.CSS.editorWrapper}`);
    if (o != null && o.isEqualNode(this.Editor.UI.nodes.wrapper))
      return this.currentBlockIndex = this._blocks.nodes.indexOf(t), this.currentBlock.updateCurrentInput(), this.currentBlock;
  }
  /**
   * Return block which contents passed node
   *
   * @param {Node} childNode - node to get Block by
   * @returns {Block}
   */
  getBlockByChildNode(e) {
    if (!e || !(e instanceof Node))
      return;
    k.isElement(e) || (e = e.parentNode);
    const t = e.closest(`.${je.CSS.wrapper}`);
    return this.blocks.find((o) => o.holder === t);
  }
  /**
   * Swap Blocks Position
   *
   * @param {number} fromIndex - index of first block
   * @param {number} toIndex - index of second block
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    this._blocks.swap(e, t), this.currentBlockIndex = t;
  }
  /**
   * Move a block to a new index
   *
   * @param {number} toIndex - index where to move Block
   * @param {number} fromIndex - index of Block to move
   */
  move(e, t = this.currentBlockIndex) {
    if (isNaN(e) || isNaN(t)) {
      X("Warning during 'move' call: incorrect indices provided.", "warn");
      return;
    }
    if (!this.validateIndex(e) || !this.validateIndex(t)) {
      X("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.", "warn");
      return;
    }
    this._blocks.move(e, t), this.currentBlockIndex = e, this.blockDidMutated(xh, this.currentBlock, {
      fromIndex: t,
      toIndex: e
    });
  }
  /**
   * Converts passed Block to the new Tool
   * Uses Conversion Config
   *
   * @param blockToConvert - Block that should be converted
   * @param targetToolName - name of the Tool to convert to
   * @param blockDataOverrides - optional new Block data overrides
   */
  async convert(e, t, o) {
    if (!await e.save())
      throw new Error("Could not convert Block. Failed to extract original Block data.");
    const i = this.Editor.Tools.blockTools.get(t);
    if (!i)
      throw new Error(`Could not convert Block. Tool «${t}» not found.`);
    const r = await e.exportDataAsString(), s = Ne(
      r,
      i.sanitizeConfig
    );
    let a = vr(s, i.conversionConfig, i.settings);
    return o && (a = Object.assign(a, o)), this.replace(e, i.name, a);
  }
  /**
   * Sets current Block Index -1 which means unknown
   * and clear highlights
   */
  unsetCurrentBlock() {
    this.currentBlockIndex = -1;
  }
  /**
   * Clears Editor
   *
   * @param {boolean} needToAddDefaultBlock - 1) in internal calls (for example, in api.blocks.render)
   *                                             we don't need to add an empty default block
   *                                        2) in api.blocks.clear we should add empty block
   */
  async clear(e = !1) {
    const t = new Ch();
    [...this.blocks].forEach((o) => {
      t.add(async () => {
        try {
          await this.removeBlock(o, !1);
        } catch {
        }
      });
    }), await t.completed, this.unsetCurrentBlock(), e && this.insert(), this.Editor.UI.checkEmptiness();
  }
  /**
   * Cleans up all the block tools' resources
   * This is called when editor is destroyed
   */
  async destroy() {
    await Promise.all(this.blocks.map((e) => e.destroy()));
  }
  /**
   * Bind Block events
   *
   * @param {Block} block - Block to which event should be bound
   */
  bindBlockEvents(e) {
    const { BlockEvents: t } = this.Editor;
    this.readOnlyMutableListeners.on(e.holder, "keydown", (o) => {
      t.keydown(o);
    }), this.readOnlyMutableListeners.on(e.holder, "keyup", (o) => {
      t.keyup(o);
    }), this.readOnlyMutableListeners.on(e.holder, "dragover", (o) => {
      t.dragOver(o);
    }), this.readOnlyMutableListeners.on(e.holder, "dragleave", (o) => {
      t.dragLeave(o);
    }), e.on("didMutated", (o) => this.blockDidMutated(Tr, o, {
      index: this.getBlockIndex(o)
    }));
  }
  /**
   * Disable mutable handlers and bindings
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Enables all module handlers and bindings for all Blocks
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(
      document,
      "cut",
      (e) => this.Editor.BlockEvents.handleCommandX(e)
    ), this.blocks.forEach((e) => {
      this.bindBlockEvents(e);
    });
  }
  /**
   * Validates that the given index is not lower than 0 or higher than the amount of blocks
   *
   * @param {number} index - index of blocks array to validate
   * @returns {boolean}
   */
  validateIndex(e) {
    return !(e < 0 || e >= this._blocks.length);
  }
  /**
   * Block mutation callback
   *
   * @param mutationType - what happened with block
   * @param block - mutated block
   * @param detailData - additional data to pass with change event
   */
  blockDidMutated(e, t, o) {
    const i = new CustomEvent(e, {
      detail: {
        target: new He(t),
        ...o
      }
    });
    return this.eventsDispatcher.emit(ss, {
      event: i
    }), t;
  }
}
class Th extends W {
  constructor() {
    super(...arguments), this.anyBlockSelectedCache = null, this.needToSelectAll = !1, this.nativeInputSelected = !1, this.readyToBlockSelection = !1;
  }
  /**
   * Sanitizer Config
   *
   * @returns {SanitizerConfig}
   */
  get sanitizerConfig() {
    return {
      p: {},
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      ol: {},
      ul: {},
      li: {},
      br: !0,
      img: {
        src: !0,
        width: !0,
        height: !0
      },
      a: {
        href: !0
      },
      b: {},
      i: {},
      u: {}
    };
  }
  /**
   * Flag that identifies all Blocks selection
   *
   * @returns {boolean}
   */
  get allBlocksSelected() {
    const { BlockManager: e } = this.Editor;
    return e.blocks.every((t) => t.selected === !0);
  }
  /**
   * Set selected all blocks
   *
   * @param {boolean} state - state to set
   */
  set allBlocksSelected(e) {
    const { BlockManager: t } = this.Editor;
    t.blocks.forEach((o) => {
      o.selected = e;
    }), this.clearCache();
  }
  /**
   * Flag that identifies any Block selection
   *
   * @returns {boolean}
   */
  get anyBlockSelected() {
    const { BlockManager: e } = this.Editor;
    return this.anyBlockSelectedCache === null && (this.anyBlockSelectedCache = e.blocks.some((t) => t.selected === !0)), this.anyBlockSelectedCache;
  }
  /**
   * Return selected Blocks array
   *
   * @returns {Block[]}
   */
  get selectedBlocks() {
    return this.Editor.BlockManager.blocks.filter((e) => e.selected);
  }
  /**
   * Module Preparation
   * Registers Shortcuts CMD+A and CMD+C
   * to select all and copy them
   */
  prepare() {
    this.selection = new F(), kt.add({
      name: "CMD+A",
      handler: (e) => {
        const { BlockManager: t, ReadOnly: o } = this.Editor;
        if (o.isEnabled) {
          e.preventDefault(), this.selectAllBlocks();
          return;
        }
        t.currentBlock && this.handleCommandA(e);
      },
      on: this.Editor.UI.nodes.redactor
    });
  }
  /**
   * Toggle read-only state
   *
   *  - Remove all ranges
   *  - Unselect all Blocks
   */
  toggleReadOnly() {
    F.get().removeAllRanges(), this.allBlocksSelected = !1;
  }
  /**
   * Remove selection of Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  unSelectBlockByIndex(e) {
    const { BlockManager: t } = this.Editor;
    let o;
    isNaN(e) ? o = t.currentBlock : o = t.getBlockByIndex(e), o.selected = !1, this.clearCache();
  }
  /**
   * Clear selection from Blocks
   *
   * @param {Event} reason - event caused clear of selection
   * @param {boolean} restoreSelection - if true, restore saved selection
   */
  clearSelection(e, t = !1) {
    const { BlockManager: o, Caret: i, RectangleSelection: r } = this.Editor;
    this.needToSelectAll = !1, this.nativeInputSelected = !1, this.readyToBlockSelection = !1;
    const s = e && e instanceof KeyboardEvent, a = s && Jr(e.keyCode);
    if (this.anyBlockSelected && s && a && !F.isSelectionExists) {
      const l = o.removeSelectedBlocks();
      o.insertDefaultBlockAtIndex(l, !0), i.setToBlock(o.currentBlock), co(() => {
        const c = e.key;
        i.insertContentAtCaretPosition(c.length > 1 ? "" : c);
      }, 20)();
    }
    if (this.Editor.CrossBlockSelection.clear(e), !this.anyBlockSelected || r.isRectActivated()) {
      this.Editor.RectangleSelection.clearSelection();
      return;
    }
    t && this.selection.restore(), this.allBlocksSelected = !1;
  }
  /**
   * Reduce each Block and copy its content
   *
   * @param {ClipboardEvent} e - copy/cut event
   * @returns {Promise<void>}
   */
  copySelectedBlocks(e) {
    e.preventDefault();
    const t = k.make("div");
    this.selectedBlocks.forEach((r) => {
      let s = r.holder.innerHTML;
      if (r.name === "code") {
        const c = r.holder.querySelector("textarea");
        c && (s = c.value);
      }
      const a = Ne(s, this.sanitizerConfig), l = k.make("p");
      l.innerHTML = a, t.appendChild(l);
    });
    const o = Array.from(t.childNodes).map((r) => r.textContent).join(`

`), i = t.innerHTML;
    return e.clipboardData.setData("text/plain", o), e.clipboardData.setData("text/html", i), Promise.all(this.selectedBlocks.map((r) => r.save())).then((r) => {
      try {
        e.clipboardData.setData(this.Editor.Paste.MIME_TYPE, JSON.stringify(r));
      } catch {
      }
    });
  }
  /**
   * Select Block by its index
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  selectBlockByIndex(e) {
    const { BlockManager: t } = this.Editor, o = t.getBlockByIndex(e);
    o !== void 0 && this.selectBlock(o);
  }
  /**
   * Select passed Block
   *
   * @param {Block} block - Block to select
   */
  selectBlock(e) {
    this.selection.save(), F.get().removeAllRanges(), e.selected = !0, this.clearCache(), this.Editor.InlineToolbar.close();
  }
  /**
   * Remove selection from passed Block
   *
   * @param {Block} block - Block to unselect
   */
  unselectBlock(e) {
    e.selected = !1, this.clearCache();
  }
  /**
   * Clear anyBlockSelected cache
   */
  clearCache() {
    this.anyBlockSelectedCache = null;
  }
  /**
   * Module destruction
   * De-registers Shortcut CMD+A
   */
  destroy() {
    kt.remove(this.Editor.UI.nodes.redactor, "CMD+A");
  }
  /**
   * First CMD+A selects all input content by native behaviour,
   * next CMD+A keypress selects all blocks
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  handleCommandA(e) {
    if (this.Editor.RectangleSelection.clearSelection(), k.isNativeInput(e.target) && !this.readyToBlockSelection) {
      this.readyToBlockSelection = !0;
      return;
    }
    const t = this.Editor.BlockManager.getBlock(e.target), o = t.inputs;
    if (o.length > 1 && !this.readyToBlockSelection) {
      this.readyToBlockSelection = !0;
      return;
    }
    if (o.length === 1 && !this.needToSelectAll) {
      this.needToSelectAll = !0;
      return;
    }
    this.needToSelectAll ? (e.preventDefault(), this.selectAllBlocks(), this.needToSelectAll = !1, this.readyToBlockSelection = !1) : this.readyToBlockSelection && (e.preventDefault(), this.selectBlock(t), this.needToSelectAll = !0);
  }
  /**
   * Select All Blocks
   * Each Block has selected setter that makes Block copyable
   */
  selectAllBlocks() {
    this.selection.save(), F.get().removeAllRanges(), this.allBlocksSelected = !0, this.Editor.InlineToolbar.close();
  }
}
class vo extends W {
  /**
   * Allowed caret positions in input
   *
   * @static
   * @returns {{START: string, END: string, DEFAULT: string}}
   */
  get positions() {
    return {
      START: "start",
      END: "end",
      DEFAULT: "default"
    };
  }
  /**
   * Elements styles that can be useful for Caret Module
   */
  static get CSS() {
    return {
      shadowCaret: "cdx-shadow-caret"
    };
  }
  /**
   * Method gets Block instance and puts caret to the text node with offset
   * There two ways that method applies caret position:
   *   - first found text node: sets at the beginning, but you can pass an offset
   *   - last found text node: sets at the end of the node. Also, you can customize the behaviour
   *
   * @param {Block} block - Block class
   * @param {string} position - position where to set caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the block content
   */
  setToBlock(e, t = this.positions.DEFAULT, o = 0) {
    var i;
    const { BlockManager: r, BlockSelection: s } = this.Editor;
    if (s.clearSelection(), !e.focusable) {
      (i = window.getSelection()) == null || i.removeAllRanges(), s.selectBlock(e), r.currentBlock = e;
      return;
    }
    let a;
    switch (t) {
      case this.positions.START:
        a = e.firstInput;
        break;
      case this.positions.END:
        a = e.lastInput;
        break;
      default:
        a = e.currentInput;
    }
    if (!a)
      return;
    let l, c = o;
    if (t === this.positions.START)
      l = k.getDeepestNode(a, !1), c = 0;
    else if (t === this.positions.END)
      l = k.getDeepestNode(a, !0), c = k.getContentLength(l);
    else {
      const { node: d, offset: u } = k.getNodeByOffset(a, o);
      d ? (l = d, c = u) : (l = k.getDeepestNode(a, !1), c = 0);
    }
    this.set(l, c), r.setCurrentBlockByChildNode(e.holder), r.currentBlock.currentInput = a;
  }
  /**
   * Set caret to the current input of current Block.
   *
   * @param {HTMLElement} input - input where caret should be set
   * @param {string} position - position of the caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the text node
   */
  setToInput(e, t = this.positions.DEFAULT, o = 0) {
    const { currentBlock: i } = this.Editor.BlockManager, r = k.getDeepestNode(e);
    switch (t) {
      case this.positions.START:
        this.set(r, 0);
        break;
      case this.positions.END:
        this.set(r, k.getContentLength(r));
        break;
      default:
        o && this.set(r, o);
    }
    i.currentInput = e;
  }
  /**
   * Creates Document Range and sets caret to the element with offset
   *
   * @param {HTMLElement} element - target node.
   * @param {number} offset - offset
   */
  set(e, t = 0) {
    const { top: o, bottom: i } = F.setCursor(e, t), { innerHeight: r } = window;
    o < 0 ? window.scrollBy(0, o - 30) : i > r && window.scrollBy(0, i - r + 30);
  }
  /**
   * Set Caret to the last Block
   * If last block is not empty, append another empty block
   */
  setToTheLastBlock() {
    const e = this.Editor.BlockManager.lastBlock;
    if (e)
      if (e.tool.isDefault && e.isEmpty)
        this.setToBlock(e);
      else {
        const t = this.Editor.BlockManager.insertAtEnd();
        this.setToBlock(t);
      }
  }
  /**
   * Extract content fragment of current Block from Caret position to the end of the Block
   */
  extractFragmentFromCaretPosition() {
    const e = F.get();
    if (e.rangeCount) {
      const t = e.getRangeAt(0), o = this.Editor.BlockManager.currentBlock.currentInput;
      if (t.deleteContents(), o)
        if (k.isNativeInput(o)) {
          const i = o, r = document.createDocumentFragment(), s = i.value.substring(0, i.selectionStart), a = i.value.substring(i.selectionStart);
          return r.textContent = a, i.value = s, r;
        } else {
          const i = t.cloneRange();
          return i.selectNodeContents(o), i.setStart(t.endContainer, t.endOffset), i.extractContents();
        }
    }
  }
  /**
   * Set's caret to the next Block or Tool`s input
   * Before moving caret, we should check if caret position is at the end of Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @param {boolean} force - pass true to skip check for caret position
   */
  navigateNext(e = !1) {
    const { BlockManager: t } = this.Editor, { currentBlock: o, nextBlock: i } = t;
    if (o === void 0)
      return !1;
    const { nextInput: r, currentInput: s } = o, a = s !== void 0 ? ao(s) : void 0;
    let l = i;
    const c = e || a || !o.focusable;
    if (r && c)
      return this.setToInput(r, this.positions.START), !0;
    if (l === null) {
      if (o.tool.isDefault || !c)
        return !1;
      l = t.insertAtEnd();
    }
    return c ? (this.setToBlock(l, this.positions.START), !0) : !1;
  }
  /**
   * Set's caret to the previous Tool`s input or Block
   * Before moving caret, we should check if caret position is start of the Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @param {boolean} force - pass true to skip check for caret position
   */
  navigatePrevious(e = !1) {
    const { currentBlock: t, previousBlock: o } = this.Editor.BlockManager;
    if (!t)
      return !1;
    const { previousInput: i, currentInput: r } = t, s = r !== void 0 ? so(r) : void 0, a = e || s || !t.focusable;
    return i && a ? (this.setToInput(i, this.positions.END), !0) : o !== null && a ? (this.setToBlock(o, this.positions.END), !0) : !1;
  }
  /**
   * Inserts shadow element after passed element where caret can be placed
   *
   * @param {Element} element - element after which shadow caret should be inserted
   */
  createShadow(e) {
    const t = document.createElement("span");
    t.classList.add(vo.CSS.shadowCaret), e.insertAdjacentElement("beforeend", t);
  }
  /**
   * Restores caret position
   *
   * @param {HTMLElement} element - element where caret should be restored
   */
  restoreCaret(e) {
    const t = e.querySelector(`.${vo.CSS.shadowCaret}`);
    if (!t)
      return;
    new F().expandToTag(t);
    const o = document.createRange();
    o.selectNode(t), o.extractContents();
  }
  /**
   * Inserts passed content at caret position
   *
   * @param {string} content - content to insert
   */
  insertContentAtCaretPosition(e) {
    const t = document.createDocumentFragment(), o = document.createElement("div"), i = F.get(), r = F.range;
    o.innerHTML = e, Array.from(o.childNodes).forEach((c) => t.appendChild(c)), t.childNodes.length === 0 && t.appendChild(new Text());
    const s = t.lastChild;
    r.deleteContents(), r.insertNode(t);
    const a = document.createRange(), l = s.nodeType === Node.TEXT_NODE ? s : s.firstChild;
    l !== null && l.textContent !== null && a.setStart(l, l.textContent.length), i.removeAllRanges(), i.addRange(a);
  }
}
class Sh extends W {
  constructor() {
    super(...arguments), this.onMouseUp = () => {
      this.listeners.off(document, "mouseover", this.onMouseOver), this.listeners.off(document, "mouseup", this.onMouseUp);
    }, this.onMouseOver = (e) => {
      const { BlockManager: t, BlockSelection: o } = this.Editor;
      if (e.relatedTarget === null && e.target === null)
        return;
      const i = t.getBlockByChildNode(e.relatedTarget) || this.lastSelectedBlock, r = t.getBlockByChildNode(e.target);
      if (!(!i || !r) && r !== i) {
        if (i === this.firstSelectedBlock) {
          F.get().removeAllRanges(), i.selected = !0, r.selected = !0, o.clearCache();
          return;
        }
        if (r === this.firstSelectedBlock) {
          i.selected = !1, r.selected = !1, o.clearCache();
          return;
        }
        this.Editor.InlineToolbar.close(), this.toggleBlocksSelectedState(i, r), this.lastSelectedBlock = r;
      }
    };
  }
  /**
   * Module preparation
   *
   * @returns {Promise}
   */
  async prepare() {
    this.listeners.on(document, "mousedown", (e) => {
      this.enableCrossBlockSelection(e);
    });
  }
  /**
   * Sets up listeners
   *
   * @param {MouseEvent} event - mouse down event
   */
  watchSelection(e) {
    if (e.button !== pc.LEFT)
      return;
    const { BlockManager: t } = this.Editor;
    this.firstSelectedBlock = t.getBlock(e.target), this.lastSelectedBlock = this.firstSelectedBlock, this.listeners.on(document, "mouseover", this.onMouseOver), this.listeners.on(document, "mouseup", this.onMouseUp);
  }
  /**
   * Return boolean is cross block selection started:
   * there should be at least 2 selected blocks
   */
  get isCrossBlockSelectionStarted() {
    return !!this.firstSelectedBlock && !!this.lastSelectedBlock && this.firstSelectedBlock !== this.lastSelectedBlock;
  }
  /**
   * Change selection state of the next Block
   * Used for CBS via Shift + arrow keys
   *
   * @param {boolean} next - if true, toggle next block. Previous otherwise
   */
  toggleBlockSelectedState(e = !0) {
    const { BlockManager: t, BlockSelection: o } = this.Editor;
    this.lastSelectedBlock || (this.lastSelectedBlock = this.firstSelectedBlock = t.currentBlock), this.firstSelectedBlock === this.lastSelectedBlock && (this.firstSelectedBlock.selected = !0, o.clearCache(), F.get().removeAllRanges());
    const i = t.blocks.indexOf(this.lastSelectedBlock) + (e ? 1 : -1), r = t.blocks[i];
    r && (this.lastSelectedBlock.selected !== r.selected ? (r.selected = !0, o.clearCache()) : (this.lastSelectedBlock.selected = !1, o.clearCache()), this.lastSelectedBlock = r, this.Editor.InlineToolbar.close(), r.holder.scrollIntoView({
      block: "nearest"
    }));
  }
  /**
   * Clear saved state
   *
   * @param {Event} reason - event caused clear of selection
   */
  clear(e) {
    const { BlockManager: t, BlockSelection: o, Caret: i } = this.Editor, r = t.blocks.indexOf(this.firstSelectedBlock), s = t.blocks.indexOf(this.lastSelectedBlock);
    if (o.anyBlockSelected && r > -1 && s > -1 && e && e instanceof KeyboardEvent)
      switch (e.keyCode) {
        case j.DOWN:
        case j.RIGHT:
          i.setToBlock(t.blocks[Math.max(r, s)], i.positions.END);
          break;
        case j.UP:
        case j.LEFT:
          i.setToBlock(t.blocks[Math.min(r, s)], i.positions.START);
          break;
        default:
          i.setToBlock(t.blocks[Math.max(r, s)], i.positions.END);
      }
    this.firstSelectedBlock = this.lastSelectedBlock = null;
  }
  /**
   * Enables Cross Block Selection
   *
   * @param {MouseEvent} event - mouse down event
   */
  enableCrossBlockSelection(e) {
    const { UI: t } = this.Editor;
    F.isCollapsed || this.Editor.BlockSelection.clearSelection(e), t.nodes.redactor.contains(e.target) ? this.watchSelection(e) : this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Change blocks selection state between passed two blocks.
   *
   * @param {Block} firstBlock - first block in range
   * @param {Block} lastBlock - last block in range
   */
  toggleBlocksSelectedState(e, t) {
    const { BlockManager: o, BlockSelection: i } = this.Editor, r = o.blocks.indexOf(e), s = o.blocks.indexOf(t), a = e.selected !== t.selected;
    for (let l = Math.min(r, s); l <= Math.max(r, s); l++) {
      const c = o.blocks[l];
      c !== this.firstSelectedBlock && c !== (a ? e : t) && (o.blocks[l].selected = !o.blocks[l].selected, i.clearCache());
    }
  }
}
class Bh extends W {
  constructor() {
    super(...arguments), this.isStartedAtEditor = !1;
  }
  /**
   * Toggle read-only state
   *
   * if state is true:
   *  - disable all drag-n-drop event handlers
   *
   * if state is false:
   *  - restore drag-n-drop event handlers
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Add drag events listeners to editor zone
   */
  enableModuleBindings() {
    const { UI: e } = this.Editor;
    this.readOnlyMutableListeners.on(e.nodes.holder, "drop", async (t) => {
      await this.processDrop(t);
    }, !0), this.readOnlyMutableListeners.on(e.nodes.holder, "dragstart", () => {
      this.processDragStart();
    }), this.readOnlyMutableListeners.on(e.nodes.holder, "dragover", (t) => {
      this.processDragOver(t);
    }, !0);
  }
  /**
   * Unbind drag-n-drop event handlers
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Handle drop event
   *
   * @param {DragEvent} dropEvent - drop event
   */
  async processDrop(e) {
    const {
      BlockManager: t,
      Paste: o,
      Caret: i
    } = this.Editor;
    e.preventDefault(), t.blocks.forEach((s) => {
      s.dropTarget = !1;
    }), F.isAtEditor && !F.isCollapsed && this.isStartedAtEditor && document.execCommand("delete"), this.isStartedAtEditor = !1;
    const r = t.setCurrentBlockByChildNode(e.target);
    if (r)
      this.Editor.Caret.setToBlock(r, i.positions.END);
    else {
      const s = t.setCurrentBlockByChildNode(t.lastBlock.holder);
      this.Editor.Caret.setToBlock(s, i.positions.END);
    }
    await o.processDataTransfer(e.dataTransfer, !0);
  }
  /**
   * Handle drag start event
   */
  processDragStart() {
    F.isAtEditor && !F.isCollapsed && (this.isStartedAtEditor = !0), this.Editor.InlineToolbar.close();
  }
  /**
   * @param {DragEvent} dragEvent - drag event
   */
  processDragOver(e) {
    e.preventDefault();
  }
}
const Ih = 180, Lh = 400;
class Oh extends W {
  /**
   * Prepare the module
   *
   * @param options - options used by the modification observer module
   * @param options.config - Editor configuration object
   * @param options.eventsDispatcher - common Editor event bus
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.disabled = !1, this.batchingTimeout = null, this.batchingOnChangeQueue = /* @__PURE__ */ new Map(), this.batchTime = Lh, this.mutationObserver = new MutationObserver((o) => {
      this.redactorChanged(o);
    }), this.eventsDispatcher.on(ss, (o) => {
      this.particularBlockChanged(o.event);
    }), this.eventsDispatcher.on(as, () => {
      this.disable();
    }), this.eventsDispatcher.on(ls, () => {
      this.enable();
    });
  }
  /**
   * Enables onChange event
   */
  enable() {
    this.mutationObserver.observe(
      this.Editor.UI.nodes.redactor,
      {
        childList: !0,
        subtree: !0,
        characterData: !0,
        attributes: !0
      }
    ), this.disabled = !1;
  }
  /**
   * Disables onChange event
   */
  disable() {
    this.mutationObserver.disconnect(), this.disabled = !0;
  }
  /**
   * Call onChange event passed to Editor.js configuration
   *
   * @param event - some of our custom change events
   */
  particularBlockChanged(e) {
    this.disabled || !oe(this.config.onChange) || (this.batchingOnChangeQueue.set(`block:${e.detail.target.id}:event:${e.type}`, e), this.batchingTimeout && clearTimeout(this.batchingTimeout), this.batchingTimeout = setTimeout(() => {
      let t;
      this.batchingOnChangeQueue.size === 1 ? t = this.batchingOnChangeQueue.values().next().value : t = Array.from(this.batchingOnChangeQueue.values()), this.config.onChange && this.config.onChange(this.Editor.API.methods, t), this.batchingOnChangeQueue.clear();
    }, this.batchTime));
  }
  /**
   * Fired on every blocks wrapper dom change
   *
   * @param mutations - mutations happened
   */
  redactorChanged(e) {
    this.eventsDispatcher.emit(cn, {
      mutations: e
    });
  }
}
const ea = class ta extends W {
  constructor() {
    super(...arguments), this.MIME_TYPE = "application/x-editor-js", this.toolsTags = {}, this.tagsByTool = {}, this.toolsPatterns = [], this.toolsFiles = {}, this.exceptionList = [], this.processTool = (e) => {
      try {
        const t = e.create({}, {}, !1);
        if (e.pasteConfig === !1) {
          this.exceptionList.push(e.name);
          return;
        }
        if (!oe(t.onPaste))
          return;
        this.getTagsConfig(e), this.getFilesConfig(e), this.getPatternsConfig(e);
      } catch (t) {
        X(
          `Paste handling for «${e.name}» Tool hasn't been set up because of the error`,
          "warn",
          t
        );
      }
    }, this.handlePasteEvent = async (e) => {
      const { BlockManager: t, Toolbar: o } = this.Editor, i = t.setCurrentBlockByChildNode(e.target);
      !i || this.isNativeBehaviour(e.target) && !e.clipboardData.types.includes("Files") || i && this.exceptionList.includes(i.name) || (e.preventDefault(), this.processDataTransfer(e.clipboardData), o.close());
    };
  }
  /**
   * Set onPaste callback and collect tools` paste configurations
   */
  async prepare() {
    this.processTools();
  }
  /**
   * Set read-only state
   *
   * @param {boolean} readOnlyEnabled - read only flag value
   */
  toggleReadOnly(e) {
    e ? this.unsetCallback() : this.setCallback();
  }
  /**
   * Handle pasted or dropped data transfer object
   *
   * @param {DataTransfer} dataTransfer - pasted or dropped data transfer object
   * @param {boolean} isDragNDrop - true if data transfer comes from drag'n'drop events
   */
  async processDataTransfer(e, t = !1) {
    const { Tools: o } = this.Editor, i = e.types;
    if ((i.includes ? i.includes("Files") : i.contains("Files")) && !Oe(this.toolsFiles)) {
      await this.processFiles(e.files);
      return;
    }
    const r = e.getData(this.MIME_TYPE), s = e.getData("text/plain");
    let a = e.getData("text/html");
    if (r)
      try {
        this.insertEditorJSData(JSON.parse(r));
        return;
      } catch {
      }
    t && s.trim() && a.trim() && (a = "<p>" + (a.trim() ? a : s) + "</p>");
    const l = Object.keys(this.toolsTags).reduce((u, p) => (u[p.toLowerCase()] = this.toolsTags[p].sanitizationConfig ?? {}, u), {}), c = Object.assign({}, l, o.getAllInlineToolsSanitizeConfig(), { br: {} }), d = Ne(a, c);
    !d.trim() || d.trim() === s || !k.isHTMLString(d) ? await this.processText(s) : await this.processText(d, !0);
  }
  /**
   * Process pasted text and divide them into Blocks
   *
   * @param {string} data - text to process. Can be HTML or plain.
   * @param {boolean} isHTML - if passed string is HTML, this parameter should be true
   */
  async processText(e, t = !1) {
    const { Caret: o, BlockManager: i } = this.Editor, r = t ? this.processHTML(e) : this.processPlain(e);
    if (!r.length)
      return;
    if (r.length === 1) {
      r[0].isBlock ? this.processSingleBlock(r.pop()) : this.processInlinePaste(r.pop());
      return;
    }
    const s = i.currentBlock && i.currentBlock.tool.isDefault && i.currentBlock.isEmpty;
    r.map(
      async (a, l) => this.insertBlock(a, l === 0 && s)
    ), i.currentBlock && o.setToBlock(i.currentBlock, o.positions.END);
  }
  /**
   * Set onPaste callback handler
   */
  setCallback() {
    this.listeners.on(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
  }
  /**
   * Unset onPaste callback handler
   */
  unsetCallback() {
    this.listeners.off(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
  }
  /**
   * Get and process tool`s paste configs
   */
  processTools() {
    const e = this.Editor.Tools.blockTools;
    Array.from(e.values()).forEach(this.processTool);
  }
  /**
   * Get tags name list from either tag name or sanitization config.
   *
   * @param {string | object} tagOrSanitizeConfig - tag name or sanitize config object.
   * @returns {string[]} array of tags.
   */
  collectTagNames(e) {
    return ze(e) ? [e] : ce(e) ? Object.keys(e) : [];
  }
  /**
   * Get tags to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getTagsConfig(e) {
    if (e.pasteConfig === !1)
      return;
    const t = e.pasteConfig.tags || [], o = [];
    t.forEach((i) => {
      const r = this.collectTagNames(i);
      o.push(...r), r.forEach((s) => {
        if (Object.prototype.hasOwnProperty.call(this.toolsTags, s)) {
          X(
            `Paste handler for «${e.name}» Tool on «${s}» tag is skipped because it is already used by «${this.toolsTags[s].tool.name}» Tool.`,
            "warn"
          );
          return;
        }
        const a = ce(i) ? i[s] : null;
        this.toolsTags[s.toUpperCase()] = {
          tool: e,
          sanitizationConfig: a
        };
      });
    }), this.tagsByTool[e.name] = o.map((i) => i.toUpperCase());
  }
  /**
   * Get files` types and extensions to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getFilesConfig(e) {
    if (e.pasteConfig === !1)
      return;
    const { files: t = {} } = e.pasteConfig;
    let { extensions: o, mimeTypes: i } = t;
    !o && !i || (o && !Array.isArray(o) && (X(`«extensions» property of the onDrop config for «${e.name}» Tool should be an array`), o = []), i && !Array.isArray(i) && (X(`«mimeTypes» property of the onDrop config for «${e.name}» Tool should be an array`), i = []), i && (i = i.filter((r) => bc(r) ? !0 : (X(`MIME type value «${r}» for the «${e.name}» Tool is not a valid MIME type`, "warn"), !1))), this.toolsFiles[e.name] = {
      extensions: o || [],
      mimeTypes: i || []
    });
  }
  /**
   * Get RegExp patterns to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getPatternsConfig(e) {
    e.pasteConfig === !1 || !e.pasteConfig.patterns || Oe(e.pasteConfig.patterns) || Object.entries(e.pasteConfig.patterns).forEach(([t, o]) => {
      o instanceof RegExp || X(
        `Pattern ${o} for «${e.name}» Tool is skipped because it should be a Regexp instance.`,
        "warn"
      ), this.toolsPatterns.push({
        key: t,
        pattern: o,
        tool: e
      });
    });
  }
  /**
   * Check if browser behavior suits better
   *
   * @param {EventTarget} element - element where content has been pasted
   * @returns {boolean}
   */
  isNativeBehaviour(e) {
    return k.isNativeInput(e);
  }
  /**
   * Get files from data transfer object and insert related Tools
   *
   * @param {FileList} items - pasted or dropped items
   */
  async processFiles(e) {
    const { BlockManager: t } = this.Editor;
    let o;
    o = await Promise.all(
      Array.from(e).map((r) => this.processFile(r))
    ), o = o.filter((r) => !!r);
    const i = t.currentBlock.tool.isDefault && t.currentBlock.isEmpty;
    o.forEach(
      (r, s) => {
        t.paste(r.type, r.event, s === 0 && i);
      }
    );
  }
  /**
   * Get information about file and find Tool to handle it
   *
   * @param {File} file - file to process
   */
  async processFile(e) {
    const t = vc(e), o = Object.entries(this.toolsFiles).find(([r, { mimeTypes: s, extensions: a }]) => {
      const [l, c] = e.type.split("/"), d = a.find((p) => p.toLowerCase() === t.toLowerCase()), u = s.find((p) => {
        const [y, v] = p.split("/");
        return y === l && (v === c || v === "*");
      });
      return !!d || !!u;
    });
    if (!o)
      return;
    const [i] = o;
    return {
      event: this.composePasteEvent("file", {
        file: e
      }),
      type: i
    };
  }
  /**
   * Split HTML string to blocks and return it as array of Block data
   *
   * @param {string} innerHTML - html string to process
   * @returns {PasteData[]}
   */
  processHTML(e) {
    const { Tools: t } = this.Editor, o = k.make("DIV");
    return o.innerHTML = e, this.getNodes(o).map((i) => {
      let r, s = t.defaultTool, a = !1;
      switch (i.nodeType) {
        case Node.DOCUMENT_FRAGMENT_NODE:
          r = k.make("div"), r.appendChild(i);
          break;
        case Node.ELEMENT_NODE:
          r = i, a = !0, this.toolsTags[r.tagName] && (s = this.toolsTags[r.tagName].tool);
          break;
      }
      const { tags: l } = s.pasteConfig || { tags: [] }, c = l.reduce((p, y) => (this.collectTagNames(y).forEach((v) => {
        const g = ce(y) ? y[v] : null;
        p[v.toLowerCase()] = g || {};
      }), p), {}), d = Object.assign({}, c, s.baseSanitizeConfig);
      if (r.tagName.toLowerCase() === "table") {
        const p = Ne(r.outerHTML, d);
        r = k.make("div", void 0, {
          innerHTML: p
        }).firstChild;
      } else
        r.innerHTML = Ne(r.innerHTML, d);
      const u = this.composePasteEvent("tag", {
        data: r
      });
      return {
        content: r,
        isBlock: a,
        tool: s.name,
        event: u
      };
    }).filter((i) => {
      const r = k.isEmpty(i.content), s = k.isSingleTag(i.content);
      return !r || s;
    });
  }
  /**
   * Split plain text by new line symbols and return it as array of Block data
   *
   * @param {string} plain - string to process
   * @returns {PasteData[]}
   */
  processPlain(e) {
    const { defaultBlock: t } = this.config;
    if (!e)
      return [];
    const o = t;
    return e.split(/\r?\n/).filter((i) => i.trim()).map((i) => {
      const r = k.make("div");
      r.textContent = i;
      const s = this.composePasteEvent("tag", {
        data: r
      });
      return {
        content: r,
        tool: o,
        isBlock: !1,
        event: s
      };
    });
  }
  /**
   * Process paste of single Block tool content
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processSingleBlock(e) {
    const { Caret: t, BlockManager: o } = this.Editor, { currentBlock: i } = o;
    if (!i || e.tool || !k.containsOnlyInlineElements(e.content.innerHTML)) {
      this.insertBlock(e, (i == null ? void 0 : i.tool.isDefault) && i.isEmpty);
      return;
    }
    t.insertContentAtCaretPosition(e.content.innerHTML);
  }
  /**
   * Process paste to single Block:
   * 1. Find patterns` matches
   * 2. Insert new block if it is not the same type as current one
   * 3. Just insert text if there is no substitutions
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processInlinePaste(e) {
    const { BlockManager: t, Caret: o } = this.Editor, { content: i } = e;
    if (t.currentBlock && t.currentBlock.tool.isDefault && i.textContent.length < ta.PATTERN_PROCESSING_MAX_LENGTH) {
      const r = await this.processPattern(i.textContent);
      if (r) {
        const s = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty, a = t.paste(r.tool, r.event, s);
        o.setToBlock(a, o.positions.END);
        return;
      }
    }
    if (t.currentBlock && t.currentBlock.currentInput) {
      const r = t.currentBlock.tool.baseSanitizeConfig;
      document.execCommand(
        "insertHTML",
        !1,
        Ne(i.innerHTML, r)
      );
    } else
      this.insertBlock(e);
  }
  /**
   * Get patterns` matches
   *
   * @param {string} text - text to process
   * @returns {Promise<{event: PasteEvent, tool: string}>}
   */
  async processPattern(e) {
    const t = this.toolsPatterns.find((o) => {
      const i = o.pattern.exec(e);
      return i ? e === i.shift() : !1;
    });
    return t ? {
      event: this.composePasteEvent("pattern", {
        key: t.key,
        data: e
      }),
      tool: t.tool.name
    } : void 0;
  }
  /**
   * Insert pasted Block content to Editor
   *
   * @param {PasteData} data - data to insert
   * @param {boolean} canReplaceCurrentBlock - if true and is current Block is empty, will replace current Block
   * @returns {void}
   */
  insertBlock(e, t = !1) {
    const { BlockManager: o, Caret: i } = this.Editor, { currentBlock: r } = o;
    let s;
    if (t && r && r.isEmpty) {
      s = o.paste(e.tool, e.event, !0), i.setToBlock(s, i.positions.END);
      return;
    }
    s = o.paste(e.tool, e.event), i.setToBlock(s, i.positions.END);
  }
  /**
   * Insert data passed as application/x-editor-js JSON
   *
   * @param {Array} blocks — Blocks' data to insert
   * @returns {void}
   */
  insertEditorJSData(e) {
    const { BlockManager: t, Caret: o, Tools: i } = this.Editor;
    wn(
      e,
      (r) => i.blockTools.get(r).sanitizeConfig
    ).forEach(({ tool: r, data: s }, a) => {
      let l = !1;
      a === 0 && (l = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty);
      const c = t.insert({
        tool: r,
        data: s,
        replace: l
      });
      o.setToBlock(c, o.positions.END);
    });
  }
  /**
   * Fetch nodes from Element node
   *
   * @param {Node} node - current node
   * @param {Node[]} nodes - processed nodes
   * @param {Node} destNode - destination node
   */
  processElementNode(e, t, o) {
    const i = Object.keys(this.toolsTags), r = e, { tool: s } = this.toolsTags[r.tagName] || {}, a = this.tagsByTool[s == null ? void 0 : s.name] || [], l = i.includes(r.tagName), c = k.blockElements.includes(r.tagName.toLowerCase()), d = Array.from(r.children).some(
      ({ tagName: p }) => i.includes(p) && !a.includes(p)
    ), u = Array.from(r.children).some(
      ({ tagName: p }) => k.blockElements.includes(p.toLowerCase())
    );
    if (!c && !l && !d)
      return o.appendChild(r), [...t, o];
    if (l && !d || c && !u && !d)
      return [...t, o, r];
  }
  /**
   * Recursively divide HTML string to two types of nodes:
   * 1. Block element
   * 2. Document Fragments contained text and markup tags like a, b, i etc.
   *
   * @param {Node} wrapper - wrapper of paster HTML content
   * @returns {Node[]}
   */
  getNodes(e) {
    const t = Array.from(e.childNodes);
    let o;
    const i = (r, s) => {
      if (k.isEmpty(s) && !k.isSingleTag(s))
        return r;
      const a = r[r.length - 1];
      let l = new DocumentFragment();
      switch (a && k.isFragment(a) && (l = r.pop()), s.nodeType) {
        case Node.ELEMENT_NODE:
          if (o = this.processElementNode(s, r, l), o)
            return o;
          break;
        case Node.TEXT_NODE:
          return l.appendChild(s), [...r, l];
        default:
          return [...r, l];
      }
      return [...r, ...Array.from(s.childNodes).reduce(i, [])];
    };
    return t.reduce(i, []);
  }
  /**
   * Compose paste event with passed type and detail
   *
   * @param {string} type - event type
   * @param {PasteEventDetail} detail - event detail
   */
  composePasteEvent(e, t) {
    return new CustomEvent(e, {
      detail: t
    });
  }
};
ea.PATTERN_PROCESSING_MAX_LENGTH = 450;
let Mh = ea;
class Ah extends W {
  constructor() {
    super(...arguments), this.toolsDontSupportReadOnly = [], this.readOnlyEnabled = !1;
  }
  /**
   * Returns state of read only mode
   */
  get isEnabled() {
    return this.readOnlyEnabled;
  }
  /**
   * Set initial state
   */
  async prepare() {
    const { Tools: e } = this.Editor, { blockTools: t } = e, o = [];
    Array.from(t.entries()).forEach(([i, r]) => {
      r.isReadOnlySupported || o.push(i);
    }), this.toolsDontSupportReadOnly = o, this.config.readOnly && o.length > 0 && this.throwCriticalError(), this.toggle(this.config.readOnly, !0);
  }
  /**
   * Set read-only mode or toggle current state
   * Call all Modules `toggleReadOnly` method and re-render Editor
   *
   * @param state - (optional) read-only state or toggle
   * @param isInitial - (optional) true when editor is initializing
   */
  async toggle(e = !this.readOnlyEnabled, t = !1) {
    e && this.toolsDontSupportReadOnly.length > 0 && this.throwCriticalError();
    const o = this.readOnlyEnabled;
    this.readOnlyEnabled = e;
    for (const r in this.Editor)
      this.Editor[r].toggleReadOnly && this.Editor[r].toggleReadOnly(e);
    if (o === e)
      return this.readOnlyEnabled;
    if (t)
      return this.readOnlyEnabled;
    this.Editor.ModificationsObserver.disable();
    const i = await this.Editor.Saver.save();
    return await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(i.blocks), this.Editor.ModificationsObserver.enable(), this.readOnlyEnabled;
  }
  /**
   * Throws an error about tools which don't support read-only mode
   */
  throwCriticalError() {
    throw new is(
      `To enable read-only mode all connected tools should support it. Tools ${this.toolsDontSupportReadOnly.join(", ")} don't support read-only mode.`
    );
  }
}
class Rt extends W {
  constructor() {
    super(...arguments), this.isRectSelectionActivated = !1, this.SCROLL_SPEED = 3, this.HEIGHT_OF_SCROLL_ZONE = 40, this.BOTTOM_SCROLL_ZONE = 1, this.TOP_SCROLL_ZONE = 2, this.MAIN_MOUSE_BUTTON = 0, this.mousedown = !1, this.isScrolling = !1, this.inScrollZone = null, this.startX = 0, this.startY = 0, this.mouseX = 0, this.mouseY = 0, this.stackOfSelected = [], this.listenerIds = [];
  }
  /**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */
  static get CSS() {
    return {
      overlay: "codex-editor-overlay",
      overlayContainer: "codex-editor-overlay__container",
      rect: "codex-editor-overlay__rectangle",
      topScrollZone: "codex-editor-overlay__scroll-zone--top",
      bottomScrollZone: "codex-editor-overlay__scroll-zone--bottom"
    };
  }
  /**
   * Module Preparation
   * Creating rect and hang handlers
   */
  prepare() {
    this.enableModuleBindings();
  }
  /**
   * Init rect params
   *
   * @param {number} pageX - X coord of mouse
   * @param {number} pageY - Y coord of mouse
   */
  startSelection(e, t) {
    const o = document.elementFromPoint(e - window.pageXOffset, t - window.pageYOffset);
    o.closest(`.${this.Editor.Toolbar.CSS.toolbar}`) || (this.Editor.BlockSelection.allBlocksSelected = !1, this.clearSelection(), this.stackOfSelected = []);
    const i = [
      `.${je.CSS.content}`,
      `.${this.Editor.Toolbar.CSS.toolbar}`,
      `.${this.Editor.InlineToolbar.CSS.inlineToolbar}`
    ], r = o.closest("." + this.Editor.UI.CSS.editorWrapper), s = i.some((a) => !!o.closest(a));
    !r || s || (this.mousedown = !0, this.startX = e, this.startY = t);
  }
  /**
   * Clear all params to end selection
   */
  endSelection() {
    this.mousedown = !1, this.startX = 0, this.startY = 0, this.overlayRectangle.style.display = "none";
  }
  /**
   * is RectSelection Activated
   */
  isRectActivated() {
    return this.isRectSelectionActivated;
  }
  /**
   * Mark that selection is end
   */
  clearSelection() {
    this.isRectSelectionActivated = !1;
  }
  /**
   * Sets Module necessary event handlers
   */
  enableModuleBindings() {
    const { container: e } = this.genHTML();
    this.listeners.on(e, "mousedown", (t) => {
      this.processMouseDown(t);
    }, !1), this.listeners.on(document.body, "mousemove", rn((t) => {
      this.processMouseMove(t);
    }, 10), {
      passive: !0
    }), this.listeners.on(document.body, "mouseleave", () => {
      this.processMouseLeave();
    }), this.listeners.on(window, "scroll", rn((t) => {
      this.processScroll(t);
    }, 10), {
      passive: !0
    }), this.listeners.on(document.body, "mouseup", () => {
      this.processMouseUp();
    }, !1);
  }
  /**
   * Handle mouse down events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseDown(e) {
    e.button === this.MAIN_MOUSE_BUTTON && (e.target.closest(k.allInputsSelector) !== null || this.startSelection(e.pageX, e.pageY));
  }
  /**
   * Handle mouse move events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseMove(e) {
    this.changingRectangle(e), this.scrollByZones(e.clientY);
  }
  /**
   * Handle mouse leave
   */
  processMouseLeave() {
    this.clearSelection(), this.endSelection();
  }
  /**
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processScroll(e) {
    this.changingRectangle(e);
  }
  /**
   * Handle mouse up
   */
  processMouseUp() {
    this.clearSelection(), this.endSelection();
  }
  /**
   * Scroll If mouse in scroll zone
   *
   * @param {number} clientY - Y coord of mouse
   */
  scrollByZones(e) {
    if (this.inScrollZone = null, e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.TOP_SCROLL_ZONE), document.documentElement.clientHeight - e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.BOTTOM_SCROLL_ZONE), !this.inScrollZone) {
      this.isScrolling = !1;
      return;
    }
    this.isScrolling || (this.scrollVertical(this.inScrollZone === this.TOP_SCROLL_ZONE ? -this.SCROLL_SPEED : this.SCROLL_SPEED), this.isScrolling = !0);
  }
  /**
   * Generates required HTML elements
   *
   * @returns {Object<string, Element>}
   */
  genHTML() {
    const { UI: e } = this.Editor, t = e.nodes.holder.querySelector("." + e.CSS.editorWrapper), o = k.make("div", Rt.CSS.overlay, {}), i = k.make("div", Rt.CSS.overlayContainer, {}), r = k.make("div", Rt.CSS.rect, {});
    return i.appendChild(r), o.appendChild(i), t.appendChild(o), this.overlayRectangle = r, {
      container: t,
      overlay: o
    };
  }
  /**
   * Activates scrolling if blockSelection is active and mouse is in scroll zone
   *
   * @param {number} speed - speed of scrolling
   */
  scrollVertical(e) {
    if (!(this.inScrollZone && this.mousedown))
      return;
    const t = window.pageYOffset;
    window.scrollBy(0, e), this.mouseY += window.pageYOffset - t, setTimeout(() => {
      this.scrollVertical(e);
    }, 0);
  }
  /**
   * Handles the change in the rectangle and its effect
   *
   * @param {MouseEvent} event - mouse event
   */
  changingRectangle(e) {
    if (!this.mousedown)
      return;
    e.pageY !== void 0 && (this.mouseX = e.pageX, this.mouseY = e.pageY);
    const { rightPos: t, leftPos: o, index: i } = this.genInfoForMouseSelection(), r = this.startX > t && this.mouseX > t, s = this.startX < o && this.mouseX < o;
    this.rectCrossesBlocks = !(r || s), this.isRectSelectionActivated || (this.rectCrossesBlocks = !1, this.isRectSelectionActivated = !0, this.shrinkRectangleToPoint(), this.overlayRectangle.style.display = "block"), this.updateRectangleSize(), this.Editor.Toolbar.close(), i !== void 0 && (this.trySelectNextBlock(i), this.inverseSelection(), F.get().removeAllRanges());
  }
  /**
   * Shrink rect to singular point
   */
  shrinkRectangleToPoint() {
    this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`;
  }
  /**
   * Select or unselect all of blocks in array if rect is out or in selectable area
   */
  inverseSelection() {
    const e = this.Editor.BlockManager.getBlockByIndex(this.stackOfSelected[0]).selected;
    if (this.rectCrossesBlocks && !e)
      for (const t of this.stackOfSelected)
        this.Editor.BlockSelection.selectBlockByIndex(t);
    if (!this.rectCrossesBlocks && e)
      for (const t of this.stackOfSelected)
        this.Editor.BlockSelection.unSelectBlockByIndex(t);
  }
  /**
   * Updates size of rectangle
   */
  updateRectangleSize() {
    this.mouseY >= this.startY ? (this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.mouseY - window.pageYOffset}px`) : (this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.top = `${this.mouseY - window.pageYOffset}px`), this.mouseX >= this.startX ? (this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.mouseX - window.pageXOffset}px`) : (this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.left = `${this.mouseX - window.pageXOffset}px`);
  }
  /**
   * Collects information needed to determine the behavior of the rectangle
   *
   * @returns {object} index - index next Block, leftPos - start of left border of Block, rightPos - right border
   */
  genInfoForMouseSelection() {
    const e = document.body.offsetWidth / 2, t = this.mouseY - window.pageYOffset, o = document.elementFromPoint(e, t), i = this.Editor.BlockManager.getBlockByChildNode(o);
    let r;
    i !== void 0 && (r = this.Editor.BlockManager.blocks.findIndex((d) => d.holder === i.holder));
    const s = this.Editor.BlockManager.lastBlock.holder.querySelector("." + je.CSS.content), a = Number.parseInt(window.getComputedStyle(s).width, 10) / 2, l = e - a, c = e + a;
    return {
      index: r,
      leftPos: l,
      rightPos: c
    };
  }
  /**
   * Select block with index index
   *
   * @param index - index of block in redactor
   */
  addBlockInSelection(e) {
    this.rectCrossesBlocks && this.Editor.BlockSelection.selectBlockByIndex(e), this.stackOfSelected.push(e);
  }
  /**
   * Adds a block to the selection and determines which blocks should be selected
   *
   * @param {object} index - index of new block in the reactor
   */
  trySelectNextBlock(e) {
    const t = this.stackOfSelected[this.stackOfSelected.length - 1] === e, o = this.stackOfSelected.length, i = 1, r = -1, s = 0;
    if (t)
      return;
    const a = this.stackOfSelected[o - 1] - this.stackOfSelected[o - 2] > 0;
    let l = s;
    o > 1 && (l = a ? i : r);
    const c = e > this.stackOfSelected[o - 1] && l === i, d = e < this.stackOfSelected[o - 1] && l === r, u = !(c || d || l === s);
    if (!u && (e > this.stackOfSelected[o - 1] || this.stackOfSelected[o - 1] === void 0)) {
      let v = this.stackOfSelected[o - 1] + 1 || e;
      for (v; v <= e; v++)
        this.addBlockInSelection(v);
      return;
    }
    if (!u && e < this.stackOfSelected[o - 1]) {
      for (let v = this.stackOfSelected[o - 1] - 1; v >= e; v--)
        this.addBlockInSelection(v);
      return;
    }
    if (!u)
      return;
    let p = o - 1, y;
    for (e > this.stackOfSelected[o - 1] ? y = () => e > this.stackOfSelected[p] : y = () => e < this.stackOfSelected[p]; y(); )
      this.rectCrossesBlocks && this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[p]), this.stackOfSelected.pop(), p--;
  }
}
class _h extends W {
  /**
   * Renders passed blocks as one batch
   *
   * @param blocksData - blocks to render
   */
  async render(e) {
    return new Promise((t) => {
      const { Tools: o, BlockManager: i } = this.Editor;
      if (e.length === 0)
        i.insert();
      else {
        const r = e.map(({ type: s, data: a, tunes: l, id: c }) => {
          o.available.has(s) === !1 && (Ie(`Tool «${s}» is not found. Check 'tools' property at the Editor.js config.`, "warn"), a = this.composeStubDataForTool(s, a, c), s = o.stubTool);
          let d;
          try {
            d = i.composeBlock({
              id: c,
              tool: s,
              data: a,
              tunes: l
            });
          } catch (u) {
            X(`Block «${s}» skipped because of plugins error`, "error", {
              data: a,
              error: u
            }), a = this.composeStubDataForTool(s, a, c), s = o.stubTool, d = i.composeBlock({
              id: c,
              tool: s,
              data: a,
              tunes: l
            });
          }
          return d;
        });
        i.insertMany(r);
      }
      window.requestIdleCallback(() => {
        t();
      }, { timeout: 2e3 });
    });
  }
  /**
   * Create data for the Stub Tool that will be used instead of unavailable tool
   *
   * @param tool - unavailable tool name to stub
   * @param data - data of unavailable block
   * @param [id] - id of unavailable block
   */
  composeStubDataForTool(e, t, o) {
    const { Tools: i } = this.Editor;
    let r = e;
    if (i.unavailable.has(e)) {
      const s = i.unavailable.get(e).toolbox;
      s !== void 0 && s[0].title !== void 0 && (r = s[0].title);
    }
    return {
      savedData: {
        id: o,
        type: e,
        data: t
      },
      title: r
    };
  }
}
class Nh extends W {
  /**
   * Composes new chain of Promises to fire them alternatelly
   *
   * @returns {OutputData}
   */
  async save() {
    const { BlockManager: e, Tools: t } = this.Editor, o = e.blocks, i = [];
    try {
      o.forEach((a) => {
        i.push(this.getSavedData(a));
      });
      const r = await Promise.all(i), s = await wn(r, (a) => t.blockTools.get(a).sanitizeConfig);
      return this.makeOutput(s);
    } catch (r) {
      Ie("Saving failed due to the Error %o", "error", r);
    }
  }
  /**
   * Saves and validates
   *
   * @param {Block} block - Editor's Tool
   * @returns {ValidatedData} - Tool's validated data
   */
  async getSavedData(e) {
    const t = await e.save(), o = t && await e.validate(t.data);
    return {
      ...t,
      isValid: o
    };
  }
  /**
   * Creates output object with saved data, time and version of editor
   *
   * @param {ValidatedData} allExtractedData - data extracted from Blocks
   * @returns {OutputData}
   */
  makeOutput(e) {
    const t = [];
    return e.forEach(({ id: o, tool: i, data: r, tunes: s, isValid: a }) => {
      if (!a) {
        X(`Block «${i}» skipped because saved data is invalid`);
        return;
      }
      if (i === this.Editor.Tools.stubTool) {
        t.push(r);
        return;
      }
      const l = {
        id: o,
        type: i,
        data: r,
        ...!Oe(s) && {
          tunes: s
        }
      };
      t.push(l);
    }), {
      time: +/* @__PURE__ */ new Date(),
      blocks: t,
      version: "2.31.0"
    };
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".ce-paragraph{line-height:1.6em;outline:none}.ce-block:only-of-type .ce-paragraph[data-placeholder-active]:empty:before,.ce-block:only-of-type .ce-paragraph[data-placeholder-active][data-empty=true]:before{content:attr(data-placeholder-active)}.ce-paragraph p:first-of-type{margin-top:0}.ce-paragraph p:last-of-type{margin-bottom:0}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const Ph = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>';
function Dh(n) {
  const e = document.createElement("div");
  e.innerHTML = n.trim();
  const t = document.createDocumentFragment();
  return t.append(...Array.from(e.childNodes)), t;
}
/**
 * Base Paragraph Block for the Editor.js.
 * Represents a regular text block
 *
 * @author CodeX (team@codex.so)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 */
class pi {
  /**
   * Default placeholder for Paragraph Tool
   *
   * @returns {string}
   * @class
   */
  static get DEFAULT_PLACEHOLDER() {
    return "";
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - constructor params
   * @param {ParagraphData} params.data - previously saved data
   * @param {ParagraphConfig} params.config - user config for Tool
   * @param {object} params.api - editor.js api
   * @param {boolean} readOnly - read only mode flag
   */
  constructor({ data: e, config: t, api: o, readOnly: i }) {
    this.api = o, this.readOnly = i, this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-paragraph"
    }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = t.placeholder ? t.placeholder : pi.DEFAULT_PLACEHOLDER, this._data = e ?? {}, this._element = null, this._preserveBlank = t.preserveBlank ?? !1;
  }
  /**
   * Check if text content is empty and set empty string to inner html.
   * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
   *
   * @param {KeyboardEvent} e - key up event
   */
  onKeyUp(e) {
    if (e.code !== "Backspace" && e.code !== "Delete" || !this._element)
      return;
    const { textContent: t } = this._element;
    t === "" && (this._element.innerHTML = "");
  }
  /**
   * Create Tool's view
   *
   * @returns {HTMLDivElement}
   * @private
   */
  drawView() {
    const e = document.createElement("DIV");
    return e.classList.add(this._CSS.wrapper, this._CSS.block), e.contentEditable = "false", e.dataset.placeholderActive = this.api.i18n.t(this._placeholder), this._data.text && (e.innerHTML = this._data.text), this.readOnly || (e.contentEditable = "true", e.addEventListener("keyup", this.onKeyUp)), e;
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this._element = this.drawView(), this._element;
  }
  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * @param {ParagraphData} data
   * @public
   */
  merge(e) {
    if (!this._element)
      return;
    this._data.text += e.text;
    const t = Dh(e.text);
    this._element.appendChild(t), this._element.normalize();
  }
  /**
   * Validate Paragraph block data:
   * - check for emptiness
   *
   * @param {ParagraphData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(e) {
    return !(e.text.trim() === "" && !this._preserveBlank);
  }
  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {ParagraphData} - saved data
   * @public
   */
  save(e) {
    return {
      text: e.innerHTML
    };
  }
  /**
   * On paste callback fired from Editor.
   *
   * @param {HTMLPasteEvent} event - event with pasted data
   */
  onPaste(e) {
    const t = {
      text: e.detail.data.innerHTML
    };
    this._data = t, window.requestAnimationFrame(() => {
      this._element && (this._element.innerHTML = this._data.text || "");
    });
  }
  /**
   * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
   * @returns {ConversionConfig}
   */
  static get conversionConfig() {
    return {
      export: "text",
      // to convert Paragraph to other block, use 'text' property of saved data
      import: "text"
      // to covert other block's exported string to Paragraph, fill 'text' property of tool data
    };
  }
  /**
   * Sanitizer rules
   * @returns {SanitizerConfig} - Edtior.js sanitizer config
   */
  static get sanitize() {
    return {
      text: {
        br: !0
      }
    };
  }
  /**
   * Returns true to notify the core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Used by Editor paste handling API.
   * Provides configuration to handle P tags.
   *
   * @returns {PasteConfig} - Paragraph Paste Setting
   */
  static get pasteConfig() {
    return {
      tags: ["P"]
    };
  }
  /**
   * Icon and title for displaying at the Toolbox
   *
   * @returns {ToolboxConfig} - Paragraph Toolbox Setting
   */
  static get toolbox() {
    return {
      icon: Ph,
      title: "Text"
    };
  }
}
class fi {
  constructor() {
    this.commandName = "bold";
  }
  /**
   * Sanitizer Rule
   * Leave <b> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      b: {}
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return {
      icon: dd,
      name: "bold",
      onActivate: () => {
        document.execCommand(this.commandName);
      },
      isActive: () => document.queryCommandState(this.commandName)
    };
  }
  /**
   * Set a shortcut
   *
   * @returns {boolean}
   */
  get shortcut() {
    return "CMD+B";
  }
}
fi.isInline = !0;
fi.title = "Bold";
class gi {
  constructor() {
    this.commandName = "italic", this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--italic"
    }, this.nodes = {
      button: null
    };
  }
  /**
   * Sanitizer Rule
   * Leave <i> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      i: {}
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = vd, this.nodes.button;
  }
  /**
   * Wrap range with <i> tag
   */
  surround() {
    document.execCommand(this.commandName);
  }
  /**
   * Check selection and set activated state to button if there are <i> tag
   */
  checkState() {
    const e = document.queryCommandState(this.commandName);
    return this.nodes.button.classList.toggle(this.CSS.buttonActive, e), e;
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+I";
  }
}
gi.isInline = !0;
gi.title = "Italic";
class mi {
  /**
   * @param api - Editor.js API
   */
  constructor({ api: e }) {
    this.commandLink = "createLink", this.commandUnlink = "unlink", this.ENTER_KEY = 13, this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--link",
      buttonUnlink: "ce-inline-tool--unlink",
      input: "ce-inline-tool-input",
      inputShowed: "ce-inline-tool-input--showed"
    }, this.nodes = {
      button: null,
      input: null
    }, this.inputOpened = !1, this.toolbar = e.toolbar, this.inlineToolbar = e.inlineToolbar, this.notifier = e.notifier, this.i18n = e.i18n, this.selection = new F();
  }
  /**
   * Sanitizer Rule
   * Leave <a> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      a: {
        href: !0,
        target: "_blank",
        rel: "nofollow"
      }
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = br, this.nodes.button;
  }
  /**
   * Input for the link
   */
  renderActions() {
    return this.nodes.input = document.createElement("input"), this.nodes.input.placeholder = this.i18n.t("Add a link"), this.nodes.input.enterKeyHint = "done", this.nodes.input.classList.add(this.CSS.input), this.nodes.input.addEventListener("keydown", (e) => {
      e.keyCode === this.ENTER_KEY && this.enterPressed(e);
    }), this.nodes.input;
  }
  /**
   * Handle clicks on the Inline Toolbar icon
   *
   * @param {Range} range - range to wrap with link
   */
  surround(e) {
    if (e) {
      this.inputOpened ? (this.selection.restore(), this.selection.removeFakeBackground()) : (this.selection.setFakeBackground(), this.selection.save());
      const t = this.selection.findParentTag("A");
      if (t) {
        this.selection.expandToTag(t), this.unlink(), this.closeActions(), this.checkState(), this.toolbar.close();
        return;
      }
    }
    this.toggleActions();
  }
  /**
   * Check selection and set activated state to button if there are <a> tag
   */
  checkState() {
    const e = this.selection.findParentTag("A");
    if (e) {
      this.nodes.button.innerHTML = kd, this.nodes.button.classList.add(this.CSS.buttonUnlink), this.nodes.button.classList.add(this.CSS.buttonActive), this.openActions();
      const t = e.getAttribute("href");
      this.nodes.input.value = t !== "null" ? t : "", this.selection.save();
    } else
      this.nodes.button.innerHTML = br, this.nodes.button.classList.remove(this.CSS.buttonUnlink), this.nodes.button.classList.remove(this.CSS.buttonActive);
    return !!e;
  }
  /**
   * Function called with Inline Toolbar closing
   */
  clear() {
    this.closeActions();
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+K";
  }
  /**
   * Show/close link input
   */
  toggleActions() {
    this.inputOpened ? this.closeActions(!1) : this.openActions(!0);
  }
  /**
   * @param {boolean} needFocus - on link creation we need to focus input. On editing - nope.
   */
  openActions(e = !1) {
    this.nodes.input.classList.add(this.CSS.inputShowed), e && this.nodes.input.focus(), this.inputOpened = !0;
  }
  /**
   * Close input
   *
   * @param {boolean} clearSavedSelection — we don't need to clear saved selection
   *                                        on toggle-clicks on the icon of opened Toolbar
   */
  closeActions(e = !0) {
    if (this.selection.isFakeBackgroundEnabled) {
      const t = new F();
      t.save(), this.selection.restore(), this.selection.removeFakeBackground(), t.restore();
    }
    this.nodes.input.classList.remove(this.CSS.inputShowed), this.nodes.input.value = "", e && this.selection.clearSaved(), this.inputOpened = !1;
  }
  /**
   * Enter pressed on input
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  enterPressed(e) {
    let t = this.nodes.input.value || "";
    if (!t.trim()) {
      this.selection.restore(), this.unlink(), e.preventDefault(), this.closeActions();
      return;
    }
    if (!this.validateURL(t)) {
      this.notifier.show({
        message: "Pasted link is not valid.",
        style: "error"
      }), X("Incorrect Link pasted", "warn", t);
      return;
    }
    t = this.prepareLink(t), this.selection.restore(), this.selection.removeFakeBackground(), this.insertLink(t), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this.selection.collapseToEnd(), this.inlineToolbar.close();
  }
  /**
   * Detects if passed string is URL
   *
   * @param {string} str - string to validate
   * @returns {boolean}
   */
  validateURL(e) {
    return !/\s/.test(e);
  }
  /**
   * Process link before injection
   * - sanitize
   * - add protocol for links like 'google.com'
   *
   * @param {string} link - raw user input
   */
  prepareLink(e) {
    return e = e.trim(), e = this.addProtocol(e), e;
  }
  /**
   * Add 'http' protocol to the links like 'vc.ru', 'google.com'
   *
   * @param {string} link - string to process
   */
  addProtocol(e) {
    if (/^(\w+):(\/\/)?/.test(e))
      return e;
    const t = /^\/[^/\s]/.test(e), o = e.substring(0, 1) === "#", i = /^\/\/[^/\s]/.test(e);
    return !t && !o && !i && (e = "http://" + e), e;
  }
  /**
   * Inserts <a> tag with "href"
   *
   * @param {string} link - "href" value
   */
  insertLink(e) {
    const t = this.selection.findParentTag("A");
    t && this.selection.expandToTag(t), document.execCommand(this.commandLink, !1, e);
  }
  /**
   * Removes <a> tag
   */
  unlink() {
    document.execCommand(this.commandUnlink);
  }
}
mi.isInline = !0;
mi.title = "Link";
class oa {
  /**
   * @param api - Editor.js API
   */
  constructor({ api: e }) {
    this.i18nAPI = e.i18n, this.blocksAPI = e.blocks, this.selectionAPI = e.selection, this.toolsAPI = e.tools, this.caretAPI = e.caret;
  }
  /**
   * Returns tool's UI config
   */
  async render() {
    const e = F.get(), t = this.blocksAPI.getBlockByElement(e.anchorNode);
    if (t === void 0)
      return [];
    const o = this.toolsAPI.getBlockTools(), i = await ds(t, o);
    if (i.length === 0)
      return [];
    const r = i.reduce((c, d) => {
      var u;
      return (u = d.toolbox) == null || u.forEach((p) => {
        c.push({
          icon: p.icon,
          title: ve.t(Se.toolNames, p.title),
          name: d.name,
          closeOnActivate: !0,
          onActivate: async () => {
            const y = await this.blocksAPI.convert(t.id, d.name, p.data);
            this.caretAPI.setToBlock(y, "end");
          }
        });
      }), c;
    }, []), s = await t.getActiveToolboxEntry(), a = s !== void 0 ? s.icon : ms, l = !Tt();
    return {
      icon: a,
      name: "convert-to",
      hint: {
        title: this.i18nAPI.t("Convert to")
      },
      children: {
        searchable: l,
        items: r,
        onOpen: () => {
          l && (this.selectionAPI.setFakeBackground(), this.selectionAPI.save());
        },
        onClose: () => {
          l && (this.selectionAPI.restore(), this.selectionAPI.removeFakeBackground());
        }
      }
    };
  }
}
oa.isInline = !0;
class na {
  /**
   * @param options - constructor options
   * @param options.data - stub tool data
   * @param options.api - Editor.js API
   */
  constructor({ data: e, api: t }) {
    this.CSS = {
      wrapper: "ce-stub",
      info: "ce-stub__info",
      title: "ce-stub__title",
      subtitle: "ce-stub__subtitle"
    }, this.api = t, this.title = e.title || this.api.i18n.t("Error"), this.subtitle = this.api.i18n.t("The block can not be displayed correctly."), this.savedData = e.savedData, this.wrapper = this.make();
  }
  /**
   * Returns stub holder
   *
   * @returns {HTMLElement}
   */
  render() {
    return this.wrapper;
  }
  /**
   * Return original Tool data
   *
   * @returns {BlockToolData}
   */
  save() {
    return this.savedData;
  }
  /**
   * Create Tool html markup
   *
   * @returns {HTMLElement}
   */
  make() {
    const e = k.make("div", this.CSS.wrapper), t = xd, o = k.make("div", this.CSS.info), i = k.make("div", this.CSS.title, {
      textContent: this.title
    }), r = k.make("div", this.CSS.subtitle, {
      textContent: this.subtitle
    });
    return e.innerHTML = t, o.appendChild(i), o.appendChild(r), e.appendChild(o), e;
  }
}
na.isReadOnlySupported = !0;
class Rh extends Sn {
  constructor() {
    super(...arguments), this.type = ot.Inline;
  }
  /**
   * Returns title for Inline Tool if specified by user
   */
  get title() {
    return this.constructable[mo.Title];
  }
  /**
   * Constructs new InlineTool instance from constructable
   */
  create() {
    return new this.constructable({
      api: this.api,
      config: this.settings
    });
  }
  /**
   * Allows inline tool to be available in read-only mode
   * Can be used, for example, by comments tool
   */
  get isReadOnlySupported() {
    return this.constructable[mo.IsReadOnlySupported] ?? !1;
  }
}
class Hh extends Sn {
  constructor() {
    super(...arguments), this.type = ot.Tune;
  }
  /**
   * Constructs new BlockTune instance from constructable
   *
   * @param data - Tune data
   * @param block - Block API object
   */
  create(e, t) {
    return new this.constructable({
      api: this.api,
      config: this.settings,
      block: t,
      data: e
    });
  }
}
class ue extends Map {
  /**
   * Returns Block Tools collection
   */
  get blockTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isBlock());
    return new ue(e);
  }
  /**
   * Returns Inline Tools collection
   */
  get inlineTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isInline());
    return new ue(e);
  }
  /**
   * Returns Block Tunes collection
   */
  get blockTunes() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isTune());
    return new ue(e);
  }
  /**
   * Returns internal Tools collection
   */
  get internalTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isInternal);
    return new ue(e);
  }
  /**
   * Returns Tools collection provided by user
   */
  get externalTools() {
    const e = Array.from(this.entries()).filter(([, t]) => !t.isInternal);
    return new ue(e);
  }
}
var Fh = Object.defineProperty, jh = Object.getOwnPropertyDescriptor, ia = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? jh(e, t) : e, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && Fh(e, t, i), i;
};
class vi extends Sn {
  constructor() {
    super(...arguments), this.type = ot.Block, this.inlineTools = new ue(), this.tunes = new ue();
  }
  /**
   * Creates new Tool instance
   *
   * @param data - Tool data
   * @param block - BlockAPI for current Block
   * @param readOnly - True if Editor is in read-only mode
   */
  create(e, t, o) {
    return new this.constructable({
      data: e,
      block: t,
      readOnly: o,
      api: this.api,
      config: this.settings
    });
  }
  /**
   * Returns true if read-only mode is supported by Tool
   */
  get isReadOnlySupported() {
    return this.constructable[vt.IsReadOnlySupported] === !0;
  }
  /**
   * Returns true if Tool supports linebreaks
   */
  get isLineBreaksEnabled() {
    return this.constructable[vt.IsEnabledLineBreaks];
  }
  /**
   * Returns Tool toolbox configuration (internal or user-specified).
   *
   * Merges internal and user-defined toolbox configs based on the following rules:
   *
   * - If both internal and user-defined toolbox configs are arrays their items are merged.
   * Length of the second one is kept.
   *
   * - If both are objects their properties are merged.
   *
   * - If one is an object and another is an array than internal config is replaced with user-defined
   * config. This is made to allow user to override default tool's toolbox representation (single/multiple entries)
   */
  get toolbox() {
    const e = this.constructable[vt.Toolbox], t = this.config[ro.Toolbox];
    if (!Oe(e) && t !== !1)
      return t ? Array.isArray(e) ? Array.isArray(t) ? t.map((o, i) => {
        const r = e[i];
        return r ? {
          ...r,
          ...o
        } : o;
      }) : [t] : Array.isArray(t) ? t : [
        {
          ...e,
          ...t
        }
      ] : Array.isArray(e) ? e : [e];
  }
  /**
   * Returns Tool conversion configuration
   */
  get conversionConfig() {
    return this.constructable[vt.ConversionConfig];
  }
  /**
   * Returns enabled inline tools for Tool
   */
  get enabledInlineTools() {
    return this.config[ro.EnabledInlineTools] || !1;
  }
  /**
   * Returns enabled tunes for Tool
   */
  get enabledBlockTunes() {
    return this.config[ro.EnabledBlockTunes];
  }
  /**
   * Returns Tool paste configuration
   */
  get pasteConfig() {
    return this.constructable[vt.PasteConfig] ?? {};
  }
  get sanitizeConfig() {
    const e = super.sanitizeConfig, t = this.baseSanitizeConfig;
    if (Oe(e))
      return t;
    const o = {};
    for (const i in e)
      if (Object.prototype.hasOwnProperty.call(e, i)) {
        const r = e[i];
        ce(r) ? o[i] = Object.assign({}, t, r) : o[i] = r;
      }
    return o;
  }
  get baseSanitizeConfig() {
    const e = {};
    return Array.from(this.inlineTools.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), Array.from(this.tunes.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), e;
  }
}
ia([
  Et
], vi.prototype, "sanitizeConfig", 1);
ia([
  Et
], vi.prototype, "baseSanitizeConfig", 1);
class zh {
  /**
   * @class
   * @param config - tools config
   * @param editorConfig - EditorJS config
   * @param api - EditorJS API module
   */
  constructor(e, t, o) {
    this.api = o, this.config = e, this.editorConfig = t;
  }
  /**
   * Returns Tool object based on it's type
   *
   * @param name - tool name
   */
  get(e) {
    const { class: t, isInternal: o = !1, ...i } = this.config[e], r = this.getConstructor(t), s = t[un.IsTune];
    return new r({
      name: e,
      constructable: t,
      config: i,
      api: this.api.getMethodsForTool(e, s),
      isDefault: e === this.editorConfig.defaultBlock,
      defaultPlaceholder: this.editorConfig.placeholder,
      isInternal: o
    });
  }
  /**
   * Find appropriate Tool object constructor for Tool constructable
   *
   * @param constructable - Tools constructable
   */
  getConstructor(e) {
    switch (!0) {
      case e[mo.IsInline]:
        return Rh;
      case e[un.IsTune]:
        return Hh;
      default:
        return vi;
    }
  }
}
class ra {
  /**
   * MoveDownTune constructor
   *
   * @param {API} api — Editor's API
   */
  constructor({ api: e }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: ud,
      title: this.api.i18n.t("Move down"),
      onActivate: () => this.handleClick(),
      name: "move-down"
    };
  }
  /**
   * Handle clicks on 'move down' button
   */
  handleClick() {
    const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e + 1);
    if (!t)
      throw new Error("Unable to move Block down since it is already the last");
    const o = t.holder, i = o.getBoundingClientRect();
    let r = Math.abs(window.innerHeight - o.offsetHeight);
    i.top < window.innerHeight && (r = window.scrollY + o.offsetHeight), window.scrollTo(0, r), this.api.blocks.move(e + 1), this.api.toolbar.toggleBlockSettings(!0);
  }
}
ra.isTune = !0;
class sa {
  /**
   * DeleteTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: e }) {
    this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: gd,
      title: this.api.i18n.t("Delete"),
      name: "delete",
      confirmation: {
        title: this.api.i18n.t("Click to delete"),
        onActivate: () => this.handleClick()
      }
    };
  }
  /**
   * Delete block conditions passed
   */
  handleClick() {
    this.api.blocks.delete();
  }
}
sa.isTune = !0;
class aa {
  /**
   * MoveUpTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: e }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: fd,
      title: this.api.i18n.t("Move up"),
      onActivate: () => this.handleClick(),
      name: "move-up"
    };
  }
  /**
   * Move current block up
   */
  handleClick() {
    const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e), o = this.api.blocks.getBlockByIndex(e - 1);
    if (e === 0 || !t || !o)
      throw new Error("Unable to move Block up since it is already the first");
    const i = t.holder, r = o.holder, s = i.getBoundingClientRect(), a = r.getBoundingClientRect();
    let l;
    a.top > 0 ? l = Math.abs(s.top) - Math.abs(a.top) : l = Math.abs(s.top) + a.height, window.scrollBy(0, -1 * l), this.api.blocks.move(e - 1), this.api.toolbar.toggleBlockSettings(!0);
  }
}
aa.isTune = !0;
var $h = Object.defineProperty, Uh = Object.getOwnPropertyDescriptor, Vh = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Uh(e, t) : e, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && $h(e, t, i), i;
};
class la extends W {
  constructor() {
    super(...arguments), this.stubTool = "stub", this.toolsAvailable = new ue(), this.toolsUnavailable = new ue();
  }
  /**
   * Returns available Tools
   */
  get available() {
    return this.toolsAvailable;
  }
  /**
   * Returns unavailable Tools
   */
  get unavailable() {
    return this.toolsUnavailable;
  }
  /**
   * Return Tools for the Inline Toolbar
   */
  get inlineTools() {
    return this.available.inlineTools;
  }
  /**
   * Return editor block tools
   */
  get blockTools() {
    return this.available.blockTools;
  }
  /**
   * Return available Block Tunes
   *
   * @returns {object} - object of Inline Tool's classes
   */
  get blockTunes() {
    return this.available.blockTunes;
  }
  /**
   * Returns default Tool object
   */
  get defaultTool() {
    return this.blockTools.get(this.config.defaultBlock);
  }
  /**
   * Returns internal tools
   */
  get internal() {
    return this.available.internalTools;
  }
  /**
   * Creates instances via passed or default configuration
   *
   * @returns {Promise<void>}
   */
  async prepare() {
    if (this.validateTools(), this.config.tools = sn({}, this.internalTools, this.config.tools), !Object.prototype.hasOwnProperty.call(this.config, "tools") || Object.keys(this.config.tools).length === 0)
      throw Error("Can't start without tools");
    const e = this.prepareConfig();
    this.factory = new zh(e, this.config, this.Editor.API);
    const t = this.getListOfPrepareFunctions(e);
    if (t.length === 0)
      return Promise.resolve();
    await mc(t, (o) => {
      this.toolPrepareMethodSuccess(o);
    }, (o) => {
      this.toolPrepareMethodFallback(o);
    }), this.prepareBlockTools();
  }
  getAllInlineToolsSanitizeConfig() {
    const e = {};
    return Array.from(this.inlineTools.values()).forEach((t) => {
      Object.assign(e, t.sanitizeConfig);
    }), e;
  }
  /**
   * Calls each Tool reset method to clean up anything set by Tool
   */
  destroy() {
    Object.values(this.available).forEach(async (e) => {
      oe(e.reset) && await e.reset();
    });
  }
  /**
   * Returns internal tools
   * Includes Bold, Italic, Link and Paragraph
   */
  get internalTools() {
    return {
      convertTo: {
        class: oa,
        isInternal: !0
      },
      link: {
        class: mi,
        isInternal: !0
      },
      bold: {
        class: fi,
        isInternal: !0
      },
      italic: {
        class: gi,
        isInternal: !0
      },
      paragraph: {
        class: pi,
        inlineToolbar: !0,
        isInternal: !0
      },
      stub: {
        class: na,
        isInternal: !0
      },
      moveUp: {
        class: aa,
        isInternal: !0
      },
      delete: {
        class: sa,
        isInternal: !0
      },
      moveDown: {
        class: ra,
        isInternal: !0
      }
    };
  }
  /**
   * Tool prepare method success callback
   *
   * @param {object} data - append tool to available list
   */
  toolPrepareMethodSuccess(e) {
    const t = this.factory.get(e.toolName);
    if (t.isInline()) {
      const o = ["render"].filter((i) => !t.create()[i]);
      if (o.length) {
        X(
          `Incorrect Inline Tool: ${t.name}. Some of required methods is not implemented %o`,
          "warn",
          o
        ), this.toolsUnavailable.set(t.name, t);
        return;
      }
    }
    this.toolsAvailable.set(t.name, t);
  }
  /**
   * Tool prepare method fail callback
   *
   * @param {object} data - append tool to unavailable list
   */
  toolPrepareMethodFallback(e) {
    this.toolsUnavailable.set(e.toolName, this.factory.get(e.toolName));
  }
  /**
   * Binds prepare function of plugins with user or default config
   *
   * @returns {Array} list of functions that needs to be fired sequentially
   * @param config - tools config
   */
  getListOfPrepareFunctions(e) {
    const t = [];
    return Object.entries(e).forEach(([o, i]) => {
      t.push({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function: oe(i.class.prepare) ? i.class.prepare : () => {
        },
        data: {
          toolName: o,
          config: i.config
        }
      });
    }), t;
  }
  /**
   * Assign enabled Inline Tools and Block Tunes for Block Tool
   */
  prepareBlockTools() {
    Array.from(this.blockTools.values()).forEach((e) => {
      this.assignInlineToolsToBlockTool(e), this.assignBlockTunesToBlockTool(e);
    });
  }
  /**
   * Assign enabled Inline Tools for Block Tool
   *
   * @param tool - Block Tool
   */
  assignInlineToolsToBlockTool(e) {
    if (this.config.inlineToolbar !== !1) {
      if (e.enabledInlineTools === !0) {
        e.inlineTools = new ue(
          Array.isArray(this.config.inlineToolbar) ? this.config.inlineToolbar.map((t) => [t, this.inlineTools.get(t)]) : Array.from(this.inlineTools.entries())
        );
        return;
      }
      Array.isArray(e.enabledInlineTools) && (e.inlineTools = new ue(
        /** Prepend ConvertTo Inline Tool */
        ["convertTo", ...e.enabledInlineTools].map((t) => [t, this.inlineTools.get(t)])
      ));
    }
  }
  /**
   * Assign enabled Block Tunes for Block Tool
   *
   * @param tool — Block Tool
   */
  assignBlockTunesToBlockTool(e) {
    if (e.enabledBlockTunes !== !1) {
      if (Array.isArray(e.enabledBlockTunes)) {
        const t = new ue(
          e.enabledBlockTunes.map((o) => [o, this.blockTunes.get(o)])
        );
        e.tunes = new ue([...t, ...this.blockTunes.internalTools]);
        return;
      }
      if (Array.isArray(this.config.tunes)) {
        const t = new ue(
          this.config.tunes.map((o) => [o, this.blockTunes.get(o)])
        );
        e.tunes = new ue([...t, ...this.blockTunes.internalTools]);
        return;
      }
      e.tunes = this.blockTunes.internalTools;
    }
  }
  /**
   * Validate Tools configuration objects and throw Error for user if it is invalid
   */
  validateTools() {
    for (const e in this.config.tools)
      if (Object.prototype.hasOwnProperty.call(this.config.tools, e)) {
        if (e in this.internalTools)
          return;
        const t = this.config.tools[e];
        if (!oe(t) && !oe(t.class))
          throw Error(
            `Tool «${e}» must be a constructor function or an object with function in the «class» property`
          );
      }
  }
  /**
   * Unify tools config
   */
  prepareConfig() {
    const e = {};
    for (const t in this.config.tools)
      ce(this.config.tools[t]) ? e[t] = this.config.tools[t] : e[t] = { class: this.config.tools[t] };
    return e;
  }
}
Vh([
  Et
], la.prototype, "getAllInlineToolsSanitizeConfig", 1);
const qh = `:root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:"\\feff"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}.codex-editor ::-moz-selection{background-color:#d4ecff}.codex-editor ::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;--color-background-icon-active: rgba(56, 138, 229, .1);--color-text-icon-active: #388AE5;--color-text-primary: black;position:absolute;visibility:hidden;-webkit-transition:opacity .25s ease;transition:opacity .25s ease;will-change:opacity,left,top;top:0;left:0;z-index:3;opacity:1;visibility:visible}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{color:var(--color-text-primary);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:0;border-radius:4px;line-height:normal;height:100%;padding:0;width:28px;background-color:transparent;cursor:pointer}@media (max-width: 650px){.ce-inline-tool{width:36px;height:36px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#f8f8f8}}.ce-inline-tool svg{display:block;width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:4px 8px;font-size:14px;line-height:22px;outline:none;margin:0;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-inline-tool--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:"";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:"";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:12px 18px;margin:10px 0;border-radius:10px;background:#eff2f5;border:1px solid #EFF0F1;color:#707684;font-size:14px}.ce-stub svg{width:20px;height:20px}.ce-stub__info{margin-left:14px}.ce-stub__title{font-weight:500;text-transform:capitalize}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:#F8F8F8;border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #EFF0F1;--color-shadow: rgba(13, 20, 33, .1);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #F8F8F8;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;--popover-top: calc(100% + var(--offset-from-target));--popover-left: 0;--nested-popover-overlap: 4px;--icon-size: 20px;--item-padding: 3px;--item-height: calc(var(--icon-size) + 2 * var(--item-padding))}.ce-popover__container{min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:var(--popover-left);top:var(--popover-top);background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened>.ce-popover__container{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened>.ce-popover__container{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover--open-top .ce-popover__container{--popover-top: calc(-1 * (var(--offset-from-target) + var(--popover-height)))}.ce-popover--open-left .ce-popover__container{--popover-left: calc(-1 * var(--width) + 100%)}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}@media (max-width: 650px){.ce-popover .ce-popover__container{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}}.ce-popover__search{margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover--nested .ce-popover__container{--popover-left: calc(var(--nesting-level) * (var(--width) - var(--nested-popover-overlap)));top:calc(var(--trigger-item-top) - var(--nested-popover-overlap));position:absolute}.ce-popover--open-top.ce-popover--nested .ce-popover__container{top:calc(var(--trigger-item-top) - var(--popover-height) + var(--item-height) + var(--offset-from-target) + var(--nested-popover-overlap))}.ce-popover--open-left .ce-popover--nested .ce-popover__container{--popover-left: calc(-1 * (var(--nesting-level) + 1) * var(--width) + 100%)}.ce-popover-item-separator{padding:4px 3px}.ce-popover-item-separator--hidden{display:none}.ce-popover-item-separator__line{height:1px;background:var(--color-border);width:100%}.ce-popover-item-html--hidden{display:none}.ce-popover-item{--border-radius: 6px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:var(--item-padding);color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:none;background:transparent}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover-item__icon--tool{margin-right:4px}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:auto}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title,.ce-popover-item--confirmation .ce-popover-item__icon{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}.ce-popover-header{margin-bottom:8px;margin-top:4px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover-header__text{font-size:18px;font-weight:600}.ce-popover-header__back-button{border:0;background:transparent;width:36px;height:36px;color:var(--color-text-primary)}.ce-popover-header__back-button svg{display:block;width:28px;height:28px}.ce-popover--inline{--height: 38px;--height-mobile: 46px;--container-padding: 4px;position:relative}.ce-popover--inline .ce-popover__custom-content{margin-bottom:0}.ce-popover--inline .ce-popover__items{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-popover--inline .ce-popover__container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;padding:var(--container-padding);height:var(--height);top:0;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;width:-webkit-max-content;width:-moz-max-content;width:max-content;-webkit-animation:none;animation:none}@media (max-width: 650px){.ce-popover--inline .ce-popover__container{height:var(--height-mobile);position:absolute}}.ce-popover--inline .ce-popover-item-separator{padding:0 4px}.ce-popover--inline .ce-popover-item-separator__line{height:100%;width:1px}.ce-popover--inline .ce-popover-item{border-radius:4px;padding:4px}.ce-popover--inline .ce-popover-item__icon--tool{-webkit-box-shadow:none;box-shadow:none;background:transparent;margin-right:0}.ce-popover--inline .ce-popover-item__icon{width:auto;width:initial;height:auto;height:initial}.ce-popover--inline .ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover--inline .ce-popover-item__icon svg{width:28px;height:28px}}.ce-popover--inline .ce-popover-item:not(:last-of-type){margin-bottom:0;margin-bottom:initial}.ce-popover--inline .ce-popover-item-html{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-popover--inline .ce-popover-item__icon--chevron-right{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{--offset: 3px;left:0;top:calc(var(--height) + var(--offset))}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested-level-1 .ce-popover__container{top:calc(var(--height-mobile) + var(--offset))}}.ce-popover--inline .ce-popover--nested .ce-popover__container{min-width:var(--width);width:var(--width);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;padding:6px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ce-popover--inline .ce-popover--nested .ce-popover__items{display:block;width:100%}.ce-popover--inline .ce-popover--nested .ce-popover-item{border-radius:6px;padding:3px}@media (max-width: 650px){.ce-popover--inline .ce-popover--nested .ce-popover-item{padding:4px}}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon--tool{margin-right:4px}.ce-popover--inline .ce-popover--nested .ce-popover-item__icon{width:26px;height:26px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator{padding:4px 3px}.ce-popover--inline .ce-popover--nested .ce-popover-item-separator__line{width:100%;height:1px}.codex-editor [data-placeholder]:empty:before,.codex-editor [data-placeholder][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text;content:attr(data-placeholder)}.codex-editor [data-placeholder-active]:empty:before,.codex-editor [data-placeholder-active][data-empty=true]:before{pointer-events:none;color:#707684;cursor:text}.codex-editor [data-placeholder-active]:empty:focus:before,.codex-editor [data-placeholder-active][data-empty=true]:focus:before{content:attr(data-placeholder-active)}
`;
class Wh extends W {
  constructor() {
    super(...arguments), this.isMobile = !1, this.contentRectCache = null, this.resizeDebouncer = gr(() => {
      this.windowResize();
    }, 200), this.selectionChangeDebounced = gr(() => {
      this.selectionChanged();
    }, Ih), this.documentTouchedListener = (e) => {
      this.documentTouched(e);
    };
  }
  /**
   * Editor.js UI CSS class names
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */
  get CSS() {
    return {
      editorWrapper: "codex-editor",
      editorWrapperNarrow: "codex-editor--narrow",
      editorZone: "codex-editor__redactor",
      editorZoneHidden: "codex-editor__redactor--hidden",
      editorEmpty: "codex-editor--empty",
      editorRtlFix: "codex-editor--rtl"
    };
  }
  /**
   * Return Width of center column of Editor
   *
   * @returns {DOMRect}
   */
  get contentRect() {
    if (this.contentRectCache !== null)
      return this.contentRectCache;
    const e = this.nodes.wrapper.querySelector(`.${je.CSS.content}`);
    return e ? (this.contentRectCache = e.getBoundingClientRect(), this.contentRectCache) : {
      width: 650,
      left: 0,
      right: 0
    };
  }
  /**
   * Making main interface
   */
  async prepare() {
    this.setIsMobile(), this.make(), this.loadStyles();
  }
  /**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - removes all listeners from main UI module elements
   *
   * if readOnly is false:
   *  - enables all listeners to UI module elements
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.unbindReadOnlySensitiveListeners() : window.requestIdleCallback(() => {
      this.bindReadOnlySensitiveListeners();
    }, {
      timeout: 2e3
    });
  }
  /**
   * Check if Editor is empty and set CSS class to wrapper
   */
  checkEmptiness() {
    const { BlockManager: e } = this.Editor;
    this.nodes.wrapper.classList.toggle(this.CSS.editorEmpty, e.isEditorEmpty);
  }
  /**
   * Check if one of Toolbar is opened
   * Used to prevent global keydowns (for example, Enter) conflicts with Enter-on-toolbar
   *
   * @returns {boolean}
   */
  get someToolbarOpened() {
    const { Toolbar: e, BlockSettings: t, InlineToolbar: o } = this.Editor;
    return !!(t.opened || o.opened || e.toolbox.opened);
  }
  /**
   * Check for some Flipper-buttons is under focus
   */
  get someFlipperButtonFocused() {
    return this.Editor.Toolbar.toolbox.hasFocus() ? !0 : Object.entries(this.Editor).filter(([e, t]) => t.flipper instanceof rt).some(([e, t]) => t.flipper.hasFocus());
  }
  /**
   * Clean editor`s UI
   */
  destroy() {
    this.nodes.holder.innerHTML = "", this.unbindReadOnlyInsensitiveListeners();
  }
  /**
   * Close all Editor's toolbars
   */
  closeAllToolbars() {
    const { Toolbar: e, BlockSettings: t, InlineToolbar: o } = this.Editor;
    t.close(), o.close(), e.toolbox.close();
  }
  /**
   * Check for mobile mode and save the result
   */
  setIsMobile() {
    const e = window.innerWidth < es;
    e !== this.isMobile && this.eventsDispatcher.emit(zt, {
      isEnabled: this.isMobile
    }), this.isMobile = e;
  }
  /**
   * Makes Editor.js interface
   */
  make() {
    this.nodes.holder = k.getHolder(this.config.holder), this.nodes.wrapper = k.make("div", [
      this.CSS.editorWrapper,
      ...this.isRtl ? [this.CSS.editorRtlFix] : []
    ]), this.nodes.redactor = k.make("div", this.CSS.editorZone), this.nodes.holder.offsetWidth < this.contentRect.width && this.nodes.wrapper.classList.add(this.CSS.editorWrapperNarrow), this.nodes.redactor.style.paddingBottom = this.config.minHeight + "px", this.nodes.wrapper.appendChild(this.nodes.redactor), this.nodes.holder.appendChild(this.nodes.wrapper), this.bindReadOnlyInsensitiveListeners();
  }
  /**
   * Appends CSS
   */
  loadStyles() {
    const e = "editor-js-styles";
    if (k.get(e))
      return;
    const t = k.make("style", null, {
      id: e,
      textContent: qh.toString()
    });
    this.config.style && !Oe(this.config.style) && this.config.style.nonce && t.setAttribute("nonce", this.config.style.nonce), k.prepend(document.head, t);
  }
  /**
   * Adds listeners that should work both in read-only and read-write modes
   */
  bindReadOnlyInsensitiveListeners() {
    this.listeners.on(document, "selectionchange", this.selectionChangeDebounced), this.listeners.on(window, "resize", this.resizeDebouncer, {
      passive: !0
    }), this.listeners.on(this.nodes.redactor, "mousedown", this.documentTouchedListener, {
      capture: !0,
      passive: !0
    }), this.listeners.on(this.nodes.redactor, "touchstart", this.documentTouchedListener, {
      capture: !0,
      passive: !0
    });
  }
  /**
   * Removes listeners that should work both in read-only and read-write modes
   */
  unbindReadOnlyInsensitiveListeners() {
    this.listeners.off(document, "selectionchange", this.selectionChangeDebounced), this.listeners.off(window, "resize", this.resizeDebouncer), this.listeners.off(this.nodes.redactor, "mousedown", this.documentTouchedListener), this.listeners.off(this.nodes.redactor, "touchstart", this.documentTouchedListener);
  }
  /**
   * Adds listeners that should work only in read-only mode
   */
  bindReadOnlySensitiveListeners() {
    this.readOnlyMutableListeners.on(this.nodes.redactor, "click", (e) => {
      this.redactorClicked(e);
    }, !1), this.readOnlyMutableListeners.on(document, "keydown", (e) => {
      this.documentKeydown(e);
    }, !0), this.readOnlyMutableListeners.on(document, "mousedown", (e) => {
      this.documentClicked(e);
    }, !0), this.watchBlockHoveredEvents(), this.enableInputsEmptyMark();
  }
  /**
   * Listen redactor mousemove to emit 'block-hovered' event
   */
  watchBlockHoveredEvents() {
    let e;
    this.readOnlyMutableListeners.on(this.nodes.redactor, "mousemove", rn((t) => {
      const o = t.target.closest(".ce-block");
      this.Editor.BlockSelection.anyBlockSelected || o && e !== o && (e = o, this.eventsDispatcher.emit(Ss, {
        block: this.Editor.BlockManager.getBlockByChildNode(o)
      }));
    }, 20), {
      passive: !0
    });
  }
  /**
   * Unbind events that should work only in read-only mode
   */
  unbindReadOnlySensitiveListeners() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Resize window handler
   */
  windowResize() {
    this.contentRectCache = null, this.setIsMobile();
  }
  /**
   * All keydowns on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  documentKeydown(e) {
    switch (e.keyCode) {
      case j.ENTER:
        this.enterPressed(e);
        break;
      case j.BACKSPACE:
      case j.DELETE:
        this.backspacePressed(e);
        break;
      case j.ESC:
        this.escapePressed(e);
        break;
      default:
        this.defaultBehaviour(e);
        break;
    }
  }
  /**
   * Ignore all other document's keydown events
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  defaultBehaviour(e) {
    const { currentBlock: t } = this.Editor.BlockManager, o = e.target.closest(`.${this.CSS.editorWrapper}`), i = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    if (t !== void 0 && o === null) {
      this.Editor.BlockEvents.keydown(e);
      return;
    }
    o || t && i || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
  }
  /**
   * @param {KeyboardEvent} event - keyboard event
   */
  backspacePressed(e) {
    const { BlockManager: t, BlockSelection: o, Caret: i } = this.Editor;
    if (o.anyBlockSelected && !F.isSelectionExists) {
      const r = t.removeSelectedBlocks(), s = t.insertDefaultBlockAtIndex(r, !0);
      i.setToBlock(s, i.positions.START), o.clearSelection(e), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
    }
  }
  /**
   * Escape pressed
   * If some of Toolbar components are opened, then close it otherwise close Toolbar
   *
   * @param {Event} event - escape keydown event
   */
  escapePressed(e) {
    this.Editor.BlockSelection.clearSelection(e), this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.toolbox.close(), this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END)) : this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.InlineToolbar.opened ? this.Editor.InlineToolbar.close() : this.Editor.Toolbar.close();
  }
  /**
   * Enter pressed on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  enterPressed(e) {
    const { BlockManager: t, BlockSelection: o } = this.Editor;
    if (this.someToolbarOpened)
      return;
    const i = t.currentBlockIndex >= 0;
    if (o.anyBlockSelected && !F.isSelectionExists) {
      o.clearSelection(e), e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
      return;
    }
    if (!this.someToolbarOpened && i && e.target.tagName === "BODY") {
      const r = this.Editor.BlockManager.insert();
      e.preventDefault(), this.Editor.Caret.setToBlock(r), this.Editor.Toolbar.moveAndOpen(r);
    }
    this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * All clicks on document
   *
   * @param {MouseEvent} event - Click event
   */
  documentClicked(e) {
    var t, o;
    if (!e.isTrusted)
      return;
    const i = e.target;
    this.nodes.holder.contains(i) || F.isAtEditor || (this.Editor.BlockManager.unsetCurrentBlock(), this.Editor.Toolbar.close());
    const r = (t = this.Editor.BlockSettings.nodes.wrapper) == null ? void 0 : t.contains(i), s = (o = this.Editor.Toolbar.nodes.settingsToggler) == null ? void 0 : o.contains(i), a = r || s;
    if (this.Editor.BlockSettings.opened && !a) {
      this.Editor.BlockSettings.close();
      const l = this.Editor.BlockManager.getBlockByChildNode(i);
      this.Editor.Toolbar.moveAndOpen(l);
    }
    this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * First touch on editor
   * Fired before click
   *
   * Used to change current block — we need to do it before 'selectionChange' event.
   * Also:
   * - Move and show the Toolbar
   * - Set a Caret
   *
   * @param event - touch or mouse event
   */
  documentTouched(e) {
    let t = e.target;
    if (t === this.nodes.redactor) {
      const o = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX, i = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      t = document.elementFromPoint(o, i);
    }
    try {
      this.Editor.BlockManager.setCurrentBlockByChildNode(t);
    } catch {
      this.Editor.RectangleSelection.isRectActivated() || this.Editor.Caret.setToTheLastBlock();
    }
    this.Editor.ReadOnly.isEnabled || this.Editor.Toolbar.moveAndOpen();
  }
  /**
   * All clicks on the redactor zone
   *
   * @param {MouseEvent} event - click event
   * @description
   * - By clicks on the Editor's bottom zone:
   *      - if last Block is empty, set a Caret to this
   *      - otherwise, add a new empty Block and set a Caret to that
   */
  redactorClicked(e) {
    if (!F.isCollapsed)
      return;
    const t = e.target, o = e.metaKey || e.ctrlKey;
    if (k.isAnchor(t) && o) {
      e.stopImmediatePropagation(), e.stopPropagation();
      const i = t.getAttribute("href"), r = wc(i);
      xc(r);
      return;
    }
    this.processBottomZoneClick(e);
  }
  /**
   * Check if user clicks on the Editor's bottom zone:
   *  - set caret to the last block
   *  - or add new empty block
   *
   * @param event - click event
   */
  processBottomZoneClick(e) {
    const t = this.Editor.BlockManager.getBlockByIndex(-1), o = k.offset(t.holder).bottom, i = e.pageY, { BlockSelection: r } = this.Editor;
    if (e.target instanceof Element && e.target.isEqualNode(this.nodes.redactor) && /**
    * If there is cross block selection started, target will be equal to redactor so we need additional check
    */
    !r.anyBlockSelected && /**
    * Prevent caret jumping (to last block) when clicking between blocks
    */
    o < i) {
      e.stopImmediatePropagation(), e.stopPropagation();
      const { BlockManager: s, Caret: a, Toolbar: l } = this.Editor;
      (!s.lastBlock.tool.isDefault || !s.lastBlock.isEmpty) && s.insertAtEnd(), a.setToTheLastBlock(), l.moveAndOpen(s.lastBlock);
    }
  }
  /**
   * Handle selection changes on mobile devices
   * Uses for showing the Inline Toolbar
   */
  selectionChanged() {
    const { CrossBlockSelection: e, BlockSelection: t } = this.Editor, o = F.anchorElement;
    if (e.isCrossBlockSelectionStarted && t.anyBlockSelected && F.get().removeAllRanges(), !o) {
      F.range || this.Editor.InlineToolbar.close();
      return;
    }
    const i = o.closest(`.${je.CSS.content}`);
    (i === null || i.closest(`.${F.CSS.editorWrapper}`) !== this.nodes.wrapper) && (this.Editor.InlineToolbar.containsNode(o) || this.Editor.InlineToolbar.close(), o.dataset.inlineToolbar !== "true") || (this.Editor.BlockManager.currentBlock || this.Editor.BlockManager.setCurrentBlockByChildNode(o), this.Editor.InlineToolbar.tryToShow(!0));
  }
  /**
   * Editor.js provides and ability to show placeholders for empty contenteditable elements
   *
   * This method watches for input and focus events and toggles 'data-empty' attribute
   * to workaroud the case, when inputs contains only <br>s and has no visible content
   * Then, CSS could rely on this attribute to show placeholders
   */
  enableInputsEmptyMark() {
    function e(t) {
      const o = t.target;
      ts(o);
    }
    this.readOnlyMutableListeners.on(this.nodes.wrapper, "input", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusin", e), this.readOnlyMutableListeners.on(this.nodes.wrapper, "focusout", e);
  }
}
const Yh = {
  // API Modules
  BlocksAPI: _c,
  CaretAPI: Pc,
  EventsAPI: Dc,
  I18nAPI: yn,
  API: Rc,
  InlineToolbarAPI: Hc,
  ListenersAPI: Fc,
  NotifierAPI: Uc,
  ReadOnlyAPI: Vc,
  SanitizerAPI: Gc,
  SaverAPI: Jc,
  SelectionAPI: Qc,
  ToolsAPI: ed,
  StylesAPI: td,
  ToolbarAPI: od,
  TooltipAPI: ad,
  UiAPI: ld,
  // Toolbar Modules
  BlockSettings: Nd,
  Toolbar: $d,
  InlineToolbar: Ud,
  // Modules
  BlockEvents: kh,
  BlockManager: Eh,
  BlockSelection: Th,
  Caret: vo,
  CrossBlockSelection: Sh,
  DragNDrop: Bh,
  ModificationsObserver: Oh,
  Paste: Mh,
  ReadOnly: Ah,
  RectangleSelection: Rt,
  Renderer: _h,
  Saver: Nh,
  Tools: la,
  UI: Wh
};
class Xh {
  /**
   * @param {EditorConfig} config - user configuration
   */
  constructor(e) {
    this.moduleInstances = {}, this.eventsDispatcher = new Zt();
    let t, o;
    this.isReady = new Promise((i, r) => {
      t = i, o = r;
    }), Promise.resolve().then(async () => {
      this.configuration = e, this.validate(), this.init(), await this.start(), await this.render();
      const { BlockManager: i, Caret: r, UI: s, ModificationsObserver: a } = this.moduleInstances;
      s.checkEmptiness(), a.enable(), this.configuration.autofocus === !0 && this.configuration.readOnly !== !0 && r.setToBlock(i.blocks[0], r.positions.START), t();
    }).catch((i) => {
      X(`Editor.js is not ready because of ${i}`, "error"), o(i);
    });
  }
  /**
   * Setting for configuration
   *
   * @param {EditorConfig|string} config - Editor's config to set
   */
  set configuration(e) {
    var t, o;
    ce(e) ? this.config = {
      ...e
    } : this.config = {
      holder: e
    }, an(!!this.config.holderId, "config.holderId", "config.holder"), this.config.holderId && !this.config.holder && (this.config.holder = this.config.holderId, this.config.holderId = null), this.config.holder == null && (this.config.holder = "editorjs"), this.config.logLevel || (this.config.logLevel = Gr.VERBOSE), fc(this.config.logLevel), an(!!this.config.initialBlock, "config.initialBlock", "config.defaultBlock"), this.config.defaultBlock = this.config.defaultBlock || this.config.initialBlock || "paragraph", this.config.minHeight = this.config.minHeight !== void 0 ? this.config.minHeight : 300;
    const i = {
      type: this.config.defaultBlock,
      data: {}
    };
    this.config.placeholder = this.config.placeholder || !1, this.config.sanitizer = this.config.sanitizer || {
      p: !0,
      b: !0,
      a: !0
    }, this.config.hideToolbar = this.config.hideToolbar ? this.config.hideToolbar : !1, this.config.tools = this.config.tools || {}, this.config.i18n = this.config.i18n || {}, this.config.data = this.config.data || { blocks: [] }, this.config.onReady = this.config.onReady || (() => {
    }), this.config.onChange = this.config.onChange || (() => {
    }), this.config.inlineToolbar = this.config.inlineToolbar !== void 0 ? this.config.inlineToolbar : !0, (Oe(this.config.data) || !this.config.data.blocks || this.config.data.blocks.length === 0) && (this.config.data = { blocks: [i] }), this.config.readOnly = this.config.readOnly || !1, (t = this.config.i18n) != null && t.messages && ve.setDictionary(this.config.i18n.messages), this.config.i18n.direction = ((o = this.config.i18n) == null ? void 0 : o.direction) || "ltr";
  }
  /**
   * Returns private property
   *
   * @returns {EditorConfig}
   */
  get configuration() {
    return this.config;
  }
  /**
   * Checks for required fields in Editor's config
   */
  validate() {
    const { holderId: e, holder: t } = this.config;
    if (e && t)
      throw Error("«holderId» and «holder» param can't assign at the same time.");
    if (ze(t) && !k.get(t))
      throw Error(`element with ID «${t}» is missing. Pass correct holder's ID.`);
    if (t && ce(t) && !k.isElement(t))
      throw Error("«holder» value must be an Element node");
  }
  /**
   * Initializes modules:
   *  - make and save instances
   *  - configure
   */
  init() {
    this.constructModules(), this.configureModules();
  }
  /**
   * Start Editor!
   *
   * Get list of modules that needs to be prepared and return a sequence (Promise)
   *
   * @returns {Promise<void>}
   */
  async start() {
    await [
      "Tools",
      "UI",
      "BlockManager",
      "Paste",
      "BlockSelection",
      "RectangleSelection",
      "CrossBlockSelection",
      "ReadOnly"
    ].reduce(
      (e, t) => e.then(async () => {
        try {
          await this.moduleInstances[t].prepare();
        } catch (o) {
          if (o instanceof is)
            throw new Error(o.message);
          X(`Module ${t} was skipped because of %o`, "warn", o);
        }
      }),
      Promise.resolve()
    );
  }
  /**
   * Render initial data
   */
  render() {
    return this.moduleInstances.Renderer.render(this.config.data.blocks);
  }
  /**
   * Make modules instances and save it to the @property this.moduleInstances
   */
  constructModules() {
    Object.entries(Yh).forEach(([e, t]) => {
      try {
        this.moduleInstances[e] = new t({
          config: this.configuration,
          eventsDispatcher: this.eventsDispatcher
        });
      } catch (o) {
        X("[constructModules]", `Module ${e} skipped because`, "error", o);
      }
    });
  }
  /**
   * Modules instances configuration:
   *  - pass other modules to the 'state' property
   *  - ...
   */
  configureModules() {
    for (const e in this.moduleInstances)
      Object.prototype.hasOwnProperty.call(this.moduleInstances, e) && (this.moduleInstances[e].state = this.getModulesDiff(e));
  }
  /**
   * Return modules without passed name
   *
   * @param {string} name - module for witch modules difference should be calculated
   */
  getModulesDiff(e) {
    const t = {};
    for (const o in this.moduleInstances)
      o !== e && (t[o] = this.moduleInstances[o]);
    return t;
  }
}
/**
 * Editor.js
 *
 * @license Apache-2.0
 * @see Editor.js <https://editorjs.io>
 * @author CodeX Team <https://codex.so>
 */
class Kh {
  /** Editor version */
  static get version() {
    return "2.31.0";
  }
  /**
   * @param {EditorConfig|string|undefined} [configuration] - user configuration
   */
  constructor(e) {
    let t = () => {
    };
    ce(e) && oe(e.onReady) && (t = e.onReady);
    const o = new Xh(e);
    this.isReady = o.isReady.then(() => {
      this.exportAPI(o), t();
    });
  }
  /**
   * Export external API methods
   *
   * @param {Core} editor — Editor's instance
   */
  exportAPI(e) {
    const t = ["configuration"], o = () => {
      Object.values(e.moduleInstances).forEach((i) => {
        oe(i.destroy) && i.destroy(), i.listeners.removeAll();
      }), sd(), e = null;
      for (const i in this)
        Object.prototype.hasOwnProperty.call(this, i) && delete this[i];
      Object.setPrototypeOf(this, null);
    };
    t.forEach((i) => {
      this[i] = e[i];
    }), this.destroy = o, Object.setPrototypeOf(this, e.moduleInstances.API.methods), delete this.exportAPI, Object.entries({
      blocks: {
        clear: "clear",
        render: "render"
      },
      caret: {
        focus: "focus"
      },
      events: {
        on: "on",
        off: "off",
        emit: "emit"
      },
      saver: {
        save: "save"
      }
    }).forEach(([i, r]) => {
      Object.entries(r).forEach(([s, a]) => {
        this[a] = e.moduleInstances.API.methods[i][s];
      });
    });
  }
}
function Zh(n) {
  var o, i;
  const e = [], t = document.createElement("div");
  t.innerHTML = n;
  for (const r of t.childNodes) {
    if (r.nodeType !== Node.ELEMENT_NODE)
      continue;
    const s = r, a = s.tagName.toLowerCase(), l = s.getAttribute("id") ?? void 0;
    if (a === "p")
      e.push({
        id: l,
        type: "paragraph",
        data: {
          text: s.innerHTML
        }
      });
    else if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(a)) {
      const c = parseInt(a.substring(1, 2));
      e.push({
        id: l,
        type: "header",
        data: {
          level: c,
          text: s.innerHTML
        }
      });
    } else if (["ul", "ol"].includes(a))
      e.push({
        id: l,
        type: "list",
        data: {
          style: a === "ol" ? "ordered" : "unordered",
          items: Array.from(s.childNodes).filter((c) => c.nodeType === Node.ELEMENT_NODE).map((c) => c.innerHTML)
        }
      });
    else if (a === "hr")
      e.push({
        id: l,
        type: "delimiter",
        data: {}
      });
    else if (a === "img")
      e.push({
        id: l,
        type: "image",
        data: {
          file: {
            url: s.src ?? void 0,
            hd: s.getAttribute("data-hd") ?? void 0
          }
        }
      });
    else if (a === "pre")
      e.push({
        id: l,
        type: "code",
        data: {
          height: s.getAttribute("height") ?? void 0,
          code: nc(s.innerText)
        }
      });
    else if (a === "table")
      e.push({
        id: l,
        type: "table",
        data: {
          withHeadings: !!s.querySelector("thead"),
          content: [
            ...Array.from(((o = s.querySelector("thead")) == null ? void 0 : o.childNodes) || []),
            ...Array.from(((i = s.querySelector("tbody")) == null ? void 0 : i.childNodes) || [])
          ].filter((c) => c.nodeType === Node.ELEMENT_NODE).map((c) => Array.from(c.childNodes).filter((d) => d.nodeType === Node.ELEMENT_NODE).map((d) => d.innerHTML))
        }
      });
    else {
      const c = document.createElement("div");
      c.append(s.cloneNode(!0)), c.childNodes[0] && c.childNodes[0].removeAttribute("id"), e.push({
        id: l,
        type: "fallback",
        data: {
          text: c.innerHTML
        }
      });
    }
  }
  return { blocks: e };
}
function Gh({ blocks: n }) {
  const e = {
    fallback: function(t, o) {
      const i = document.createElement("div");
      return i.innerHTML = o.text || "", i.childNodes[0] && i.childNodes[0].setAttribute("id", t), i.innerHTML;
    },
    paragraph: function(t, o) {
      return `<p id="${t}">${o.text}</p>`;
    },
    header: function(t, o) {
      return `<h${o.level} id="${t}">${o.text}</h${o.level}>`;
    },
    list: function(t, o) {
      const i = o.style === "ordered" ? "ol" : "ul", r = o.items.reduce((s, a) => s + `<li>${a}</li>`, "");
      return `<${i} id="${t}">${r}</${i}>`;
    },
    table: function(t, o) {
      let i = "", r = [...o.content];
      o.withHeadings && (i = `<thead>${r.splice(0, 1).map((l) => `<tr>${l.reduce((c, d) => c + `<th>${d}</th>`, "")}</tr>`).join("")}</thead>`);
      const s = `<tbody>${r.map((a) => `<tr>${a.reduce((l, c) => l + `<td>${c}</td>`, "")}</tr>`).join("")}</tbody>`;
      return `<table id="${t}">${i}${s}</table>`;
    },
    image: function(t, o) {
      return `<img alt="" id="${t}" src="${o.file.url}" ${o.file.hd ? `data-hd="${o.file.hd}"` : ""} />`;
    },
    code: function(t, o) {
      return `<pre id="${t}" ${o.height ? `height="${o.height}"` : ""}>${ic(o.code)}</pre>`;
    },
    delimiter: function(t) {
      return `<hr id="${t}" />`;
    }
  };
  return n.filter((t) => !!e[t.type]).map((t) => e[t.type](t.id, t.data)).join("");
}
class Jh {
  // Create and inject new block click detector
  constructor(e) {
    var t, o;
    try {
      if (!e || !((t = e.configuration) != null && t.holder) || (o = e.configuration) != null && o.readOnly)
        return;
      const i = typeof e.configuration.holder == "object" ? e.configuration.holder : document.getElementById(e.configuration.holder), r = document.createElement("div");
      r.style.minHeight = "20px", r.onclick = () => {
        e.blocks.insert(void 0, void 0, void 0, 0), e.caret.setToFirstBlock("start");
      }, i.prepend(r);
    } catch (i) {
      console.error("BDNewBlock plugin:", i.message);
    }
  }
}
class Qh {
  // Add shortcut features to editor
  constructor(e) {
    var t, o;
    try {
      if (!e || !((t = e.configuration) != null && t.holder) || (o = e.configuration) != null && o.readOnly)
        return;
      (typeof e.configuration.holder == "object" ? e.configuration.holder : document.getElementById(e.configuration.holder)).addEventListener("keydown", (r) => {
        r.ctrlKey && r.key === "s" && r.preventDefault();
      });
    } catch (i) {
      console.error("BDShortcuts plugin:", i.message);
    }
  }
}
class ep {
  // Create and inject action buttons
  constructor(e, t, o, i) {
    var r, s, a, l, c;
    try {
      if (!e || !((r = e.configuration) != null && r.holder) || !((s = e.blocks) != null && s.selectAll) && !((a = e.blocks) != null && a.unSelectAll) && !(t != null && t.onOpen) && !o && !i)
        return;
      const d = typeof e.configuration.holder == "object" ? e.configuration.holder : document.getElementById(e.configuration.holder), u = "font-size: 1.1rem; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center;", p = document.createElement("div");
      p.style.display = "flex", p.style.alignItems = "center", p.style.justifyContent = "flex-end", p.style.gap = "8px", p.style.width = "100%", p.style.maxWidth = "650px", p.style.margin = "0 auto", p.innerHTML = `
                ${o ? `<a target="_blank" href="${o}" class="button has-text-link">
                    <span class="blitzicon icon" style="${u}">&#xe90f;</span>
                </a>` : ""}
                ${i ? `<a target="_blank" href="${i}" class="button has-text-link">
                    <span class="blitzicon icon" style="${u}">&#xe910;</span>
                </a>` : ""}
                ${(l = e.blocks) != null && l.selectAll && ((c = e.blocks) != null && c.unSelectAll) ? `<button id="bd-copy" class="button has-text-link">
                    <span class="blitzicon icon" style="${u}">&#xe821;</span>
                    <span>Copy</span>
                </button>` : ""}
                ${t != null && t.onOpen ? `<button id="bd-show-comments" class="button">
                    <span class="blitzicon icon" style="${u}">&#xe001;</span>
                    <span>Comments</span>
                </button>` : ""}
            `;
      const y = p.querySelector("#bd-copy");
      y && y.addEventListener("click", () => {
        e.blocks.selectAll(), document.execCommand("copy"), e.blocks.unSelectAll(), alert("Content copied to clipboard!");
      });
      const v = p.querySelector("#bd-show-comments");
      v && v.addEventListener("click", () => {
        t != null && t.onOpen && t.onOpen(t);
      }), d.appendChild(p);
    } catch (d) {
      console.error("BDActionButtons plugin:", d.message);
    }
  }
}
const Ft = class Ft {
  /**
   * Initialization
   * @param editor Editor instance
   * @returns Clean up function
   */
  static init(e) {
    try {
      const t = typeof e.configuration.holder == "object" ? e.configuration.holder : document.getElementById(e.configuration.holder), o = () => {
        Ft.allowed || (Ft.allowed = !0, t.removeEventListener("keydown", o), t.removeEventListener("mousedown", o), t.removeEventListener("touchstart", o));
      };
      return t.addEventListener("keydown", o), t.addEventListener("mousedown", o), t.addEventListener("touchstart", o), o;
    } catch (t) {
      return console.error("BDWritePermission plugin:", t.message), () => {
      };
    }
  }
};
/**
 * Write allowed status
 */
Re(Ft, "allowed", !1);
let Ht = Ft;
function tp(n) {
  try {
    var e = null, t = -1;
    const o = document.createElement("div");
    return o.style.display = "none", o.style.alignItems = "center", o.style.justifyContent = "center", o.style.gap = "6px", o.style.position = "absolute", o.style.left = "0", o.style.right = "0", o.style.bottom = "64px", n.style.position = "relative", n.appendChild(o), (i) => {
      var r;
      if (i && !(i.status === It.Completed && !e))
        if (e = i.status, t > -1 && (clearTimeout(t), t = -1), o.style.display = "flex", i.status === It.Pending)
          o.style.color = "#d5d5d5", o.innerHTML = `
                    <p class="blitzicon" style="font-size: 1.1rem; margin: 0;">&#xe91e;</p>
                    <p style="margin: 0;">Syncing...</p>
                `;
        else if (i.status === It.Failed)
          o.style.color = "#a82e25", o.innerHTML = `
                    <p class="blitzicon" style="font-size: 1.1rem; margin: 0;">&#xe91a;</p>
                    <p style="margin: 0;"><b>Syncing failed:</b> ${((r = i.job) == null ? void 0 : r.message) ?? "Uknown error!"}</p>
                `;
        else if (i.status === It.Conflict) {
          if (o.style.color = "#a82e25", o.innerHTML = `
                    <p class="blitzicon" style="font-size: 1.1rem; margin: 0;">&#xe91d;</p>
                    <p style="margin: 0;">Syncing conflict</p>
                `, i.job && i.job.message !== void 0) {
            const s = o.querySelector("p:nth-of-type(2)");
            s && (s.style.cursor = "pointer", s.style.zIndex = "100", s.onclick = () => {
              var a;
              return (a = Kr.queue.conflictHandler) == null ? void 0 : a.prompt(i.job);
            });
          }
        } else
          i.status === It.Completed && (o.style.color = "#0ac96a", o.innerHTML = `
                    <p class="blitzicon" style="font-size: 1.1rem; margin: 0;">&#xe91c;</p>
                    <p style="margin: 0;">Syncing completed</p>
                `, t = window.setTimeout(() => {
            o.style.display = "none", t = -1;
          }, 1e3));
    };
  } catch (o) {
    return console.error("BDSyncStatus plugin:", o.message), () => {
    };
  }
}
function op(n) {
  return {
    async uploadByFile(e) {
      const t = await Kr.uploader(e);
      return n && await n(t), {
        success: t.sd ? 1 : 0,
        file: {
          url: t.base + t.sd.substring(1),
          hd: t.base + t.hd.substring(1)
        }
      };
    },
    async uploadByUrl(e) {
      return {
        success: 1,
        file: { url: e }
      };
    }
  };
}
class np {
  constructor({ api: e }) {
    Re(this, "api");
    this.api = e;
  }
  static get isTune() {
    return !0;
  }
  render() {
    return {
      icon: `<svg width="24px" height="24px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#000000" stroke-width="1.5" stroke-linecap="square" d="M14.5 10.5556L10.5 10.5556M12.5 12.5L12.5 8.50001M18.5 5.50001L6.5 5.50001M18.5 19.5L6.5 19.5L6.5 15.5L18.5 15.5L18.5 19.5Z" />
            </svg>`,
      label: "Insert before",
      closeOnActivate: !0,
      onActivate: () => {
        const e = this.api.blocks.getCurrentBlockIndex();
        this.api.blocks.insert(void 0, void 0, void 0, e), this.api.caret.setToBlock(e, "start");
      }
    };
  }
}
class ip {
  constructor({ block: e, config: t }) {
    Re(this, "block");
    Re(this, "query");
    this.block = e, this.query = t;
  }
  static get isTune() {
    return !0;
  }
  render() {
    return {
      icon: `<svg width="24px" height="24px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M5.5 12C5.49988 14.613 6.95512 17.0085 9.2741 18.2127C11.5931 19.4169 14.3897 19.2292 16.527 17.726L19.5 18V12C19.5 8.13401 16.366 5 12.5 5C8.63401 5 5.5 8.13401 5.5 12Z" />
                <path fill="#000000" d="M9.5 13.25C9.08579 13.25 8.75 13.5858 8.75 14C8.75 14.4142 9.08579 14.75 9.5 14.75V13.25ZM13.5 14.75C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25V14.75ZM9.5 10.25C9.08579 10.25 8.75 10.5858 8.75 11C8.75 11.4142 9.08579 11.75 9.5 11.75V10.25ZM15.5 11.75C15.9142 11.75 16.25 11.4142 16.25 11C16.25 10.5858 15.9142 10.25 15.5 10.25V11.75ZM9.5 14.75H13.5V13.25H9.5V14.75ZM9.5 11.75H15.5V10.25H9.5V11.75Z" />
            </svg>`,
      label: "Comment",
      closeOnActivate: !0,
      onActivate: () => {
        this.query.onOpen ? this.query.onOpen({ ...this.query, threadid: this.block.id }) : Zr.showComments({ ...this.query, threadid: this.block.id });
      }
    };
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".ce-paragraph{line-height:1.6em;outline:none}.ce-block:only-of-type .ce-paragraph[data-placeholder-active]:empty:before,.ce-block:only-of-type .ce-paragraph[data-placeholder-active][data-empty=true]:before{content:attr(data-placeholder-active)}.ce-paragraph p:first-of-type{margin-top:0}.ce-paragraph p:last-of-type{margin-bottom:0}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const rp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>';
function sp(n) {
  const e = document.createElement("div");
  e.innerHTML = n.trim();
  const t = document.createDocumentFragment();
  return t.append(...Array.from(e.childNodes)), t;
}
/**
 * Base Paragraph Block for the Editor.js.
 * Represents a regular text block
 *
 * @author CodeX (team@codex.so)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 */
class bi {
  /**
   * Default placeholder for Paragraph Tool
   *
   * @returns {string}
   * @class
   */
  static get DEFAULT_PLACEHOLDER() {
    return "";
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - constructor params
   * @param {ParagraphData} params.data - previously saved data
   * @param {ParagraphConfig} params.config - user config for Tool
   * @param {object} params.api - editor.js api
   * @param {boolean} readOnly - read only mode flag
   */
  constructor({ data: e, config: t, api: o, readOnly: i }) {
    this.api = o, this.readOnly = i, this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-paragraph"
    }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = t.placeholder ? t.placeholder : bi.DEFAULT_PLACEHOLDER, this._data = e ?? {}, this._element = null, this._preserveBlank = t.preserveBlank ?? !1;
  }
  /**
   * Check if text content is empty and set empty string to inner html.
   * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
   *
   * @param {KeyboardEvent} e - key up event
   */
  onKeyUp(e) {
    if (e.code !== "Backspace" && e.code !== "Delete" || !this._element)
      return;
    const { textContent: t } = this._element;
    t === "" && (this._element.innerHTML = "");
  }
  /**
   * Create Tool's view
   *
   * @returns {HTMLDivElement}
   * @private
   */
  drawView() {
    const e = document.createElement("DIV");
    return e.classList.add(this._CSS.wrapper, this._CSS.block), e.contentEditable = "false", e.dataset.placeholderActive = this.api.i18n.t(this._placeholder), this._data.text && (e.innerHTML = this._data.text), this.readOnly || (e.contentEditable = "true", e.addEventListener("keyup", this.onKeyUp)), e;
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this._element = this.drawView(), this._element;
  }
  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * @param {ParagraphData} data
   * @public
   */
  merge(e) {
    if (!this._element)
      return;
    this._data.text += e.text;
    const t = sp(e.text);
    this._element.appendChild(t), this._element.normalize();
  }
  /**
   * Validate Paragraph block data:
   * - check for emptiness
   *
   * @param {ParagraphData} savedData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(e) {
    return !(e.text.trim() === "" && !this._preserveBlank);
  }
  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {ParagraphData} - saved data
   * @public
   */
  save(e) {
    return {
      text: e.innerHTML
    };
  }
  /**
   * On paste callback fired from Editor.
   *
   * @param {HTMLPasteEvent} event - event with pasted data
   */
  onPaste(e) {
    const t = {
      text: e.detail.data.innerHTML
    };
    this._data = t, window.requestAnimationFrame(() => {
      this._element && (this._element.innerHTML = this._data.text || "");
    });
  }
  /**
   * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
   * @returns {ConversionConfig}
   */
  static get conversionConfig() {
    return {
      export: "text",
      // to convert Paragraph to other block, use 'text' property of saved data
      import: "text"
      // to covert other block's exported string to Paragraph, fill 'text' property of tool data
    };
  }
  /**
   * Sanitizer rules
   * @returns {SanitizerConfig} - Edtior.js sanitizer config
   */
  static get sanitize() {
    return {
      text: {
        br: !0
      }
    };
  }
  /**
   * Returns true to notify the core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Used by Editor paste handling API.
   * Provides configuration to handle P tags.
   *
   * @returns {PasteConfig} - Paragraph Paste Setting
   */
  static get pasteConfig() {
    return {
      tags: ["P"]
    };
  }
  /**
   * Icon and title for displaying at the Toolbox
   *
   * @returns {ToolboxConfig} - Paragraph Toolbox Setting
   */
  static get toolbox() {
    return {
      icon: rp,
      title: "Text"
    };
  }
}
var ap = {
  // We don't need the complete named character reference because linkifyHtml
  // does not modify the escape sequences. We do need &nbsp; so that
  // whitespace is parsed properly. Other types of whitespace should already
  // be accounted for. &gt; &lt; and &quot; are also frequently relevant ones
  amp: "&",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"'
}, lp = /^#[xX]([A-Fa-f0-9]+)$/, cp = /^#([0-9]+)$/, dp = /^([A-Za-z0-9]+)$/, up = (
  /** @class */
  function() {
    function n(e) {
      this.named = e;
    }
    return n.prototype.parse = function(e) {
      if (e) {
        var t = e.match(lp);
        if (t)
          return String.fromCharCode(parseInt(t[1], 16));
        if (t = e.match(cp), t)
          return String.fromCharCode(parseInt(t[1], 10));
        if (t = e.match(dp), t)
          return this.named[t[1]] || "&" + t[1] + ";";
      }
    }, n;
  }()
), hp = /[\t\n\f ]/, pp = /[A-Za-z]/, fp = /\r\n?/g;
function de(n) {
  return hp.test(n);
}
function Sr(n) {
  return pp.test(n);
}
function gp(n) {
  return n.replace(fp, `
`);
}
var mp = (
  /** @class */
  function() {
    function n(e, t, o) {
      o === void 0 && (o = "precompile"), this.delegate = e, this.entityParser = t, this.mode = o, this.state = "beforeData", this.line = -1, this.column = -1, this.input = "", this.index = -1, this.tagNameBuffer = "", this.states = {
        beforeData: function() {
          var i = this.peek();
          if (i === "<" && !this.isIgnoredEndTag())
            this.transitionTo(
              "tagOpen"
              /* tagOpen */
            ), this.markTagStart(), this.consume();
          else {
            if (this.mode === "precompile" && i === `
`) {
              var r = this.tagNameBuffer.toLowerCase();
              (r === "pre" || r === "textarea") && this.consume();
            }
            this.transitionTo(
              "data"
              /* data */
            ), this.delegate.beginData();
          }
        },
        data: function() {
          var i = this.peek(), r = this.tagNameBuffer;
          i === "<" && !this.isIgnoredEndTag() ? (this.delegate.finishData(), this.transitionTo(
            "tagOpen"
            /* tagOpen */
          ), this.markTagStart(), this.consume()) : i === "&" && r !== "script" && r !== "style" ? (this.consume(), this.delegate.appendToData(this.consumeCharRef() || "&")) : (this.consume(), this.delegate.appendToData(i));
        },
        tagOpen: function() {
          var i = this.consume();
          i === "!" ? this.transitionTo(
            "markupDeclarationOpen"
            /* markupDeclarationOpen */
          ) : i === "/" ? this.transitionTo(
            "endTagOpen"
            /* endTagOpen */
          ) : (i === "@" || i === ":" || Sr(i)) && (this.transitionTo(
            "tagName"
            /* tagName */
          ), this.tagNameBuffer = "", this.delegate.beginStartTag(), this.appendToTagName(i));
        },
        markupDeclarationOpen: function() {
          var i = this.consume();
          if (i === "-" && this.peek() === "-")
            this.consume(), this.transitionTo(
              "commentStart"
              /* commentStart */
            ), this.delegate.beginComment();
          else {
            var r = i.toUpperCase() + this.input.substring(this.index, this.index + 6).toUpperCase();
            r === "DOCTYPE" && (this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.transitionTo(
              "doctype"
              /* doctype */
            ), this.delegate.beginDoctype && this.delegate.beginDoctype());
          }
        },
        doctype: function() {
          var i = this.consume();
          de(i) && this.transitionTo(
            "beforeDoctypeName"
            /* beforeDoctypeName */
          );
        },
        beforeDoctypeName: function() {
          var i = this.consume();
          de(i) || (this.transitionTo(
            "doctypeName"
            /* doctypeName */
          ), this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(i.toLowerCase()));
        },
        doctypeName: function() {
          var i = this.consume();
          de(i) ? this.transitionTo(
            "afterDoctypeName"
            /* afterDoctypeName */
          ) : i === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeName && this.delegate.appendToDoctypeName(i.toLowerCase());
        },
        afterDoctypeName: function() {
          var i = this.consume();
          if (!de(i))
            if (i === ">")
              this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
                "beforeData"
                /* beforeData */
              );
            else {
              var r = i.toUpperCase() + this.input.substring(this.index, this.index + 5).toUpperCase(), s = r.toUpperCase() === "PUBLIC", a = r.toUpperCase() === "SYSTEM";
              (s || a) && (this.consume(), this.consume(), this.consume(), this.consume(), this.consume(), this.consume()), s ? this.transitionTo(
                "afterDoctypePublicKeyword"
                /* afterDoctypePublicKeyword */
              ) : a && this.transitionTo(
                "afterDoctypeSystemKeyword"
                /* afterDoctypeSystemKeyword */
              );
            }
        },
        afterDoctypePublicKeyword: function() {
          var i = this.peek();
          de(i) ? (this.transitionTo(
            "beforeDoctypePublicIdentifier"
            /* beforeDoctypePublicIdentifier */
          ), this.consume()) : i === '"' ? (this.transitionTo(
            "doctypePublicIdentifierDoubleQuoted"
            /* doctypePublicIdentifierDoubleQuoted */
          ), this.consume()) : i === "'" ? (this.transitionTo(
            "doctypePublicIdentifierSingleQuoted"
            /* doctypePublicIdentifierSingleQuoted */
          ), this.consume()) : i === ">" && (this.consume(), this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          ));
        },
        doctypePublicIdentifierDoubleQuoted: function() {
          var i = this.consume();
          i === '"' ? this.transitionTo(
            "afterDoctypePublicIdentifier"
            /* afterDoctypePublicIdentifier */
          ) : i === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypePublicIdentifier && this.delegate.appendToDoctypePublicIdentifier(i);
        },
        doctypePublicIdentifierSingleQuoted: function() {
          var i = this.consume();
          i === "'" ? this.transitionTo(
            "afterDoctypePublicIdentifier"
            /* afterDoctypePublicIdentifier */
          ) : i === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypePublicIdentifier && this.delegate.appendToDoctypePublicIdentifier(i);
        },
        afterDoctypePublicIdentifier: function() {
          var i = this.consume();
          de(i) ? this.transitionTo(
            "betweenDoctypePublicAndSystemIdentifiers"
            /* betweenDoctypePublicAndSystemIdentifiers */
          ) : i === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : i === '"' ? this.transitionTo(
            "doctypeSystemIdentifierDoubleQuoted"
            /* doctypeSystemIdentifierDoubleQuoted */
          ) : i === "'" && this.transitionTo(
            "doctypeSystemIdentifierSingleQuoted"
            /* doctypeSystemIdentifierSingleQuoted */
          );
        },
        betweenDoctypePublicAndSystemIdentifiers: function() {
          var i = this.consume();
          de(i) || (i === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : i === '"' ? this.transitionTo(
            "doctypeSystemIdentifierDoubleQuoted"
            /* doctypeSystemIdentifierDoubleQuoted */
          ) : i === "'" && this.transitionTo(
            "doctypeSystemIdentifierSingleQuoted"
            /* doctypeSystemIdentifierSingleQuoted */
          ));
        },
        doctypeSystemIdentifierDoubleQuoted: function() {
          var i = this.consume();
          i === '"' ? this.transitionTo(
            "afterDoctypeSystemIdentifier"
            /* afterDoctypeSystemIdentifier */
          ) : i === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeSystemIdentifier && this.delegate.appendToDoctypeSystemIdentifier(i);
        },
        doctypeSystemIdentifierSingleQuoted: function() {
          var i = this.consume();
          i === "'" ? this.transitionTo(
            "afterDoctypeSystemIdentifier"
            /* afterDoctypeSystemIdentifier */
          ) : i === ">" ? (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.delegate.appendToDoctypeSystemIdentifier && this.delegate.appendToDoctypeSystemIdentifier(i);
        },
        afterDoctypeSystemIdentifier: function() {
          var i = this.consume();
          de(i) || i === ">" && (this.delegate.endDoctype && this.delegate.endDoctype(), this.transitionTo(
            "beforeData"
            /* beforeData */
          ));
        },
        commentStart: function() {
          var i = this.consume();
          i === "-" ? this.transitionTo(
            "commentStartDash"
            /* commentStartDash */
          ) : i === ">" ? (this.delegate.finishComment(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.delegate.appendToCommentData(i), this.transitionTo(
            "comment"
            /* comment */
          ));
        },
        commentStartDash: function() {
          var i = this.consume();
          i === "-" ? this.transitionTo(
            "commentEnd"
            /* commentEnd */
          ) : i === ">" ? (this.delegate.finishComment(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.delegate.appendToCommentData("-"), this.transitionTo(
            "comment"
            /* comment */
          ));
        },
        comment: function() {
          var i = this.consume();
          i === "-" ? this.transitionTo(
            "commentEndDash"
            /* commentEndDash */
          ) : this.delegate.appendToCommentData(i);
        },
        commentEndDash: function() {
          var i = this.consume();
          i === "-" ? this.transitionTo(
            "commentEnd"
            /* commentEnd */
          ) : (this.delegate.appendToCommentData("-" + i), this.transitionTo(
            "comment"
            /* comment */
          ));
        },
        commentEnd: function() {
          var i = this.consume();
          i === ">" ? (this.delegate.finishComment(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.delegate.appendToCommentData("--" + i), this.transitionTo(
            "comment"
            /* comment */
          ));
        },
        tagName: function() {
          var i = this.consume();
          de(i) ? this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          ) : i === "/" ? this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          ) : i === ">" ? (this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.appendToTagName(i);
        },
        endTagName: function() {
          var i = this.consume();
          de(i) ? (this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          ), this.tagNameBuffer = "") : i === "/" ? (this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          ), this.tagNameBuffer = "") : i === ">" ? (this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          ), this.tagNameBuffer = "") : this.appendToTagName(i);
        },
        beforeAttributeName: function() {
          var i = this.peek();
          if (de(i)) {
            this.consume();
            return;
          } else
            i === "/" ? (this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            ), this.consume()) : i === ">" ? (this.consume(), this.delegate.finishTag(), this.transitionTo(
              "beforeData"
              /* beforeData */
            )) : i === "=" ? (this.delegate.reportSyntaxError("attribute name cannot start with equals sign"), this.transitionTo(
              "attributeName"
              /* attributeName */
            ), this.delegate.beginAttribute(), this.consume(), this.delegate.appendToAttributeName(i)) : (this.transitionTo(
              "attributeName"
              /* attributeName */
            ), this.delegate.beginAttribute());
        },
        attributeName: function() {
          var i = this.peek();
          de(i) ? (this.transitionTo(
            "afterAttributeName"
            /* afterAttributeName */
          ), this.consume()) : i === "/" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          )) : i === "=" ? (this.transitionTo(
            "beforeAttributeValue"
            /* beforeAttributeValue */
          ), this.consume()) : i === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : i === '"' || i === "'" || i === "<" ? (this.delegate.reportSyntaxError(i + " is not a valid character within attribute names"), this.consume(), this.delegate.appendToAttributeName(i)) : (this.consume(), this.delegate.appendToAttributeName(i));
        },
        afterAttributeName: function() {
          var i = this.peek();
          if (de(i)) {
            this.consume();
            return;
          } else
            i === "/" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
              "selfClosingStartTag"
              /* selfClosingStartTag */
            )) : i === "=" ? (this.consume(), this.transitionTo(
              "beforeAttributeValue"
              /* beforeAttributeValue */
            )) : i === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo(
              "beforeData"
              /* beforeData */
            )) : (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.transitionTo(
              "attributeName"
              /* attributeName */
            ), this.delegate.beginAttribute(), this.consume(), this.delegate.appendToAttributeName(i));
        },
        beforeAttributeValue: function() {
          var i = this.peek();
          de(i) ? this.consume() : i === '"' ? (this.transitionTo(
            "attributeValueDoubleQuoted"
            /* attributeValueDoubleQuoted */
          ), this.delegate.beginAttributeValue(!0), this.consume()) : i === "'" ? (this.transitionTo(
            "attributeValueSingleQuoted"
            /* attributeValueSingleQuoted */
          ), this.delegate.beginAttributeValue(!0), this.consume()) : i === ">" ? (this.delegate.beginAttributeValue(!1), this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.transitionTo(
            "attributeValueUnquoted"
            /* attributeValueUnquoted */
          ), this.delegate.beginAttributeValue(!1), this.consume(), this.delegate.appendToAttributeValue(i));
        },
        attributeValueDoubleQuoted: function() {
          var i = this.consume();
          i === '"' ? (this.delegate.finishAttributeValue(), this.transitionTo(
            "afterAttributeValueQuoted"
            /* afterAttributeValueQuoted */
          )) : i === "&" ? this.delegate.appendToAttributeValue(this.consumeCharRef() || "&") : this.delegate.appendToAttributeValue(i);
        },
        attributeValueSingleQuoted: function() {
          var i = this.consume();
          i === "'" ? (this.delegate.finishAttributeValue(), this.transitionTo(
            "afterAttributeValueQuoted"
            /* afterAttributeValueQuoted */
          )) : i === "&" ? this.delegate.appendToAttributeValue(this.consumeCharRef() || "&") : this.delegate.appendToAttributeValue(i);
        },
        attributeValueUnquoted: function() {
          var i = this.peek();
          de(i) ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          )) : i === "/" ? (this.delegate.finishAttributeValue(), this.consume(), this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          )) : i === "&" ? (this.consume(), this.delegate.appendToAttributeValue(this.consumeCharRef() || "&")) : i === ">" ? (this.delegate.finishAttributeValue(), this.consume(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : (this.consume(), this.delegate.appendToAttributeValue(i));
        },
        afterAttributeValueQuoted: function() {
          var i = this.peek();
          de(i) ? (this.consume(), this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          )) : i === "/" ? (this.consume(), this.transitionTo(
            "selfClosingStartTag"
            /* selfClosingStartTag */
          )) : i === ">" ? (this.consume(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          );
        },
        selfClosingStartTag: function() {
          var i = this.peek();
          i === ">" ? (this.consume(), this.delegate.markTagAsSelfClosing(), this.delegate.finishTag(), this.transitionTo(
            "beforeData"
            /* beforeData */
          )) : this.transitionTo(
            "beforeAttributeName"
            /* beforeAttributeName */
          );
        },
        endTagOpen: function() {
          var i = this.consume();
          (i === "@" || i === ":" || Sr(i)) && (this.transitionTo(
            "endTagName"
            /* endTagName */
          ), this.tagNameBuffer = "", this.delegate.beginEndTag(), this.appendToTagName(i));
        }
      }, this.reset();
    }
    return n.prototype.reset = function() {
      this.transitionTo(
        "beforeData"
        /* beforeData */
      ), this.input = "", this.tagNameBuffer = "", this.index = 0, this.line = 1, this.column = 0, this.delegate.reset();
    }, n.prototype.transitionTo = function(e) {
      this.state = e;
    }, n.prototype.tokenize = function(e) {
      this.reset(), this.tokenizePart(e), this.tokenizeEOF();
    }, n.prototype.tokenizePart = function(e) {
      for (this.input += gp(e); this.index < this.input.length; ) {
        var t = this.states[this.state];
        if (t !== void 0)
          t.call(this);
        else
          throw new Error("unhandled state " + this.state);
      }
    }, n.prototype.tokenizeEOF = function() {
      this.flushData();
    }, n.prototype.flushData = function() {
      this.state === "data" && (this.delegate.finishData(), this.transitionTo(
        "beforeData"
        /* beforeData */
      ));
    }, n.prototype.peek = function() {
      return this.input.charAt(this.index);
    }, n.prototype.consume = function() {
      var e = this.peek();
      return this.index++, e === `
` ? (this.line++, this.column = 0) : this.column++, e;
    }, n.prototype.consumeCharRef = function() {
      var e = this.input.indexOf(";", this.index);
      if (e !== -1) {
        var t = this.input.slice(this.index, e), o = this.entityParser.parse(t);
        if (o) {
          for (var i = t.length; i; )
            this.consume(), i--;
          return this.consume(), o;
        }
      }
    }, n.prototype.markTagStart = function() {
      this.delegate.tagOpen();
    }, n.prototype.appendToTagName = function(e) {
      this.tagNameBuffer += e, this.delegate.appendToTagName(e);
    }, n.prototype.isIgnoredEndTag = function() {
      var e = this.tagNameBuffer;
      return e === "title" && this.input.substring(this.index, this.index + 8) !== "</title>" || e === "style" && this.input.substring(this.index, this.index + 8) !== "</style>" || e === "script" && this.input.substring(this.index, this.index + 9) !== "<\/script>";
    }, n;
  }()
), vp = (
  /** @class */
  function() {
    function n(e, t) {
      t === void 0 && (t = {}), this.options = t, this.token = null, this.startLine = 1, this.startColumn = 0, this.tokens = [], this.tokenizer = new mp(this, e, t.mode), this._currentAttribute = void 0;
    }
    return n.prototype.tokenize = function(e) {
      return this.tokens = [], this.tokenizer.tokenize(e), this.tokens;
    }, n.prototype.tokenizePart = function(e) {
      return this.tokens = [], this.tokenizer.tokenizePart(e), this.tokens;
    }, n.prototype.tokenizeEOF = function() {
      return this.tokens = [], this.tokenizer.tokenizeEOF(), this.tokens[0];
    }, n.prototype.reset = function() {
      this.token = null, this.startLine = 1, this.startColumn = 0;
    }, n.prototype.current = function() {
      var e = this.token;
      if (e === null)
        throw new Error("token was unexpectedly null");
      if (arguments.length === 0)
        return e;
      for (var t = 0; t < arguments.length; t++)
        if (e.type === arguments[t])
          return e;
      throw new Error("token type was unexpectedly " + e.type);
    }, n.prototype.push = function(e) {
      this.token = e, this.tokens.push(e);
    }, n.prototype.currentAttribute = function() {
      return this._currentAttribute;
    }, n.prototype.addLocInfo = function() {
      this.options.loc && (this.current().loc = {
        start: {
          line: this.startLine,
          column: this.startColumn
        },
        end: {
          line: this.tokenizer.line,
          column: this.tokenizer.column
        }
      }), this.startLine = this.tokenizer.line, this.startColumn = this.tokenizer.column;
    }, n.prototype.beginDoctype = function() {
      this.push({
        type: "Doctype",
        name: ""
      });
    }, n.prototype.appendToDoctypeName = function(e) {
      this.current(
        "Doctype"
        /* Doctype */
      ).name += e;
    }, n.prototype.appendToDoctypePublicIdentifier = function(e) {
      var t = this.current(
        "Doctype"
        /* Doctype */
      );
      t.publicIdentifier === void 0 ? t.publicIdentifier = e : t.publicIdentifier += e;
    }, n.prototype.appendToDoctypeSystemIdentifier = function(e) {
      var t = this.current(
        "Doctype"
        /* Doctype */
      );
      t.systemIdentifier === void 0 ? t.systemIdentifier = e : t.systemIdentifier += e;
    }, n.prototype.endDoctype = function() {
      this.addLocInfo();
    }, n.prototype.beginData = function() {
      this.push({
        type: "Chars",
        chars: ""
      });
    }, n.prototype.appendToData = function(e) {
      this.current(
        "Chars"
        /* Chars */
      ).chars += e;
    }, n.prototype.finishData = function() {
      this.addLocInfo();
    }, n.prototype.beginComment = function() {
      this.push({
        type: "Comment",
        chars: ""
      });
    }, n.prototype.appendToCommentData = function(e) {
      this.current(
        "Comment"
        /* Comment */
      ).chars += e;
    }, n.prototype.finishComment = function() {
      this.addLocInfo();
    }, n.prototype.tagOpen = function() {
    }, n.prototype.beginStartTag = function() {
      this.push({
        type: "StartTag",
        tagName: "",
        attributes: [],
        selfClosing: !1
      });
    }, n.prototype.beginEndTag = function() {
      this.push({
        type: "EndTag",
        tagName: ""
      });
    }, n.prototype.finishTag = function() {
      this.addLocInfo();
    }, n.prototype.markTagAsSelfClosing = function() {
      this.current(
        "StartTag"
        /* StartTag */
      ).selfClosing = !0;
    }, n.prototype.appendToTagName = function(e) {
      this.current(
        "StartTag",
        "EndTag"
        /* EndTag */
      ).tagName += e;
    }, n.prototype.beginAttribute = function() {
      this._currentAttribute = ["", "", !1];
    }, n.prototype.appendToAttributeName = function(e) {
      this.currentAttribute()[0] += e;
    }, n.prototype.beginAttributeValue = function(e) {
      this.currentAttribute()[2] = e;
    }, n.prototype.appendToAttributeValue = function(e) {
      this.currentAttribute()[1] += e;
    }, n.prototype.finishAttributeValue = function() {
      this.current(
        "StartTag"
        /* StartTag */
      ).attributes.push(this._currentAttribute);
    }, n.prototype.reportSyntaxError = function(e) {
      this.current().syntaxError = e;
    }, n;
  }()
);
function bp(n, e) {
  var t = new vp(new up(ap), e);
  return t.tokenize(n);
}
const ca = "LinkifyResult", bo = "StartTag", da = "EndTag", pn = "Chars", yp = "Comment", wp = "Doctype";
function Br(n, e = {}) {
  const t = bp(n), o = [], i = [], r = new rc(e, Cp);
  for (let s = 0; s < t.length; s++) {
    const a = t[s];
    if (a.type === bo) {
      o.push(a);
      const l = a.tagName.toUpperCase();
      if (!(l === "A" || r.ignoreTags.indexOf(l) >= 0))
        continue;
      let d = o.length;
      xp(l, t, ++s, o), s += o.length - d - 1;
    } else if (a.type !== pn)
      o.push(a);
    else {
      const l = kp(a.chars, r);
      o.push.apply(o, l);
    }
  }
  for (let s = 0; s < o.length; s++) {
    const a = o[s];
    switch (a.type) {
      case ca:
        i.push(a.rendered);
        break;
      case bo: {
        let l = "<" + a.tagName;
        a.attributes.length > 0 && (l += " " + Tp(a.attributes).join(" ")), a.selfClosing && (l += " /"), l += ">", i.push(l);
        break;
      }
      case da:
        i.push(`</${a.tagName}>`);
        break;
      case pn:
        i.push(fn(a.chars));
        break;
      case yp:
        i.push(`<!--${fn(a.chars)}-->`);
        break;
      case wp: {
        let l = `<!DOCTYPE ${a.name}`;
        a.publicIdentifier && (l += ` PUBLIC "${a.publicIdentifier}"`), a.systemIdentifier && (l += ` "${a.systemIdentifier}"`), l += ">", i.push(l);
        break;
      }
    }
  }
  return i.join("");
}
function kp(n, e) {
  const t = sc(n), o = [];
  for (let i = 0; i < t.length; i++) {
    const r = t[i];
    r.t === "nl" && e.get("nl2br") ? o.push({
      type: bo,
      tagName: "br",
      attributes: [],
      selfClosing: !0
    }) : !r.isLink || !e.check(r) ? o.push({
      type: pn,
      chars: r.toString()
    }) : o.push({
      type: ca,
      rendered: e.render(r)
    });
  }
  return o;
}
function xp(n, e, t, o) {
  let i = 1;
  for (; t < e.length && i > 0; ) {
    let r = e[t];
    r.type === bo && r.tagName.toUpperCase() === n ? i++ : r.type === da && r.tagName.toUpperCase() === n && i--, o.push(r), t++;
  }
  return o;
}
function Cp({
  tagName: n,
  attributes: e,
  content: t
}) {
  return `<${n} ${Ep(e)}>${fn(t)}</${n}>`;
}
function fn(n) {
  return n.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ua(n) {
  return n.replace(/"/g, "&quot;");
}
function Ep(n) {
  const e = [];
  for (const t in n) {
    const o = n[t] + "";
    e.push(`${t}="${ua(o)}"`);
  }
  return e.join(" ");
}
function Tp(n) {
  const e = [];
  for (let t = 0; t < n.length; t++) {
    const o = n[t][0], i = n[t][1] + "";
    e.push(`${o}="${ua(i)}"`);
  }
  return e;
}
class Sp extends bi {
  render() {
    const e = super.render();
    return e && (e.addEventListener("paste", (t) => {
      var i;
      var o = (i = t.clipboardData) == null ? void 0 : i.getData("text/plain");
      if (o && hr(o)) {
        t.preventDefault(), t.stopPropagation();
        const r = Br(o, { defaultProtocol: "https" });
        document.execCommand("insertHTML", !1, r);
      }
    }), e.addEventListener("keydown", (t) => {
      if (t.code === "Space" || t.key === "Enter") {
        const o = window.getSelection();
        if (o) {
          const i = o.getRangeAt(0), r = i.cloneRange();
          r.selectNodeContents(e), r.setEnd(i.endContainer, i.endOffset);
          const s = r.toString().split(/\s/).pop();
          if (s && hr(s)) {
            i.setStart(i.startContainer, i.startOffset - s.length), o.removeAllRanges(), o.addRange(i);
            const a = Br(s, { defaultProtocol: "https" });
            document.execCommand("insertHTML", !1, a);
          }
        }
      }
    })), e;
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".ce-header{padding:.6em 0 3px;margin:0;line-height:1.25em;outline:none}.ce-header p,.ce-header div{padding:0!important;margin:0!important}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const Ir = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19 17V10.2135C19 10.1287 18.9011 10.0824 18.836 10.1367L16 12.5"/></svg>', Lr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10 19 9.5 19 12C19 13.9771 16.0684 13.9997 16.0012 16.8981C15.9999 16.9533 16.0448 17 16.1 17L19.3 17"/></svg>', Or = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10.5 16.8323 10 17.6 10C18.3677 10 19.5 10.311 19.5 11.5C19.5 12.5315 18.7474 12.9022 18.548 12.9823C18.5378 12.9864 18.5395 13.0047 18.5503 13.0063C18.8115 13.0456 20 13.3065 20 14.8C20 16 19.5 17 17.8 17C17.8 17 16 17 16 16.3"/></svg>', Bp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 10L15.2834 14.8511C15.246 14.9178 15.294 15 15.3704 15C16.8489 15 18.7561 15 20.2 15M19 17C19 15.7187 19 14.8813 19 13.6"/></svg>', Ip = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15.9C16 15.9 16.3768 17 17.8 17C19.5 17 20 15.6199 20 14.7C20 12.7323 17.6745 12.0486 16.1635 12.9894C16.094 13.0327 16 12.9846 16 12.9027V10.1C16 10.0448 16.0448 10 16.1 10H19.8"/></svg>', Lp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19.5 10C16.5 10.5 16 13.3285 16 15M16 15V15C16 16.1046 16.8954 17 18 17H18.3246C19.3251 17 20.3191 16.3492 20.2522 15.3509C20.0612 12.4958 16 12.6611 16 15Z"/></svg>';
/**
 * Header block for the Editor.js.
 *
 * @author CodeX (team@ifmo.su)
 * @copyright CodeX 2018
 * @license MIT
 * @version 2.0.0
 */
let Op = class {
  constructor({ data: e, config: t, api: o, readOnly: i }) {
    this.api = o, this.readOnly = i, this._settings = t, this._data = this.normalizeData(e), this._element = this.getTag();
  }
  /**
   * Styles
   */
  get _CSS() {
    return {
      block: this.api.styles.block,
      wrapper: "ce-header"
    };
  }
  /**
   * Check if data is valid
   * 
   * @param {any} data - data to check
   * @returns {data is HeaderData}
   * @private
   */
  isHeaderData(e) {
    return e.text !== void 0;
  }
  /**
   * Normalize input data
   *
   * @param {HeaderData} data - saved data to process
   *
   * @returns {HeaderData}
   * @private
   */
  normalizeData(e) {
    const t = { text: "", level: this.defaultLevel.number };
    return this.isHeaderData(e) && (t.text = e.text || "", e.level !== void 0 && !isNaN(parseInt(e.level.toString())) && (t.level = parseInt(e.level.toString()))), t;
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLHeadingElement}
   * @public
   */
  render() {
    return this._element;
  }
  /**
   * Returns header block tunes config
   *
   * @returns {Array}
   */
  renderSettings() {
    return this.levels.map((e) => ({
      icon: e.svg,
      label: this.api.i18n.t(`Heading ${e.number}`),
      onActivate: () => this.setLevel(e.number),
      closeOnActivate: !0,
      isActive: this.currentLevel.number === e.number,
      render: () => document.createElement("div")
    }));
  }
  /**
   * Callback for Block's settings buttons
   *
   * @param {number} level - level to set
   */
  setLevel(e) {
    this.data = {
      level: e,
      text: this.data.text
    };
  }
  /**
   * Method that specified how to merge two Text blocks.
   * Called by Editor.js by backspace at the beginning of the Block
   *
   * @param {HeaderData} data - saved data to merger with current block
   * @public
   */
  merge(e) {
    this._element.insertAdjacentHTML("beforeend", e.text);
  }
  /**
   * Validate Text block data:
   * - check for emptiness
   *
   * @param {HeaderData} blockData — data received after saving
   * @returns {boolean} false if saved data is not correct, otherwise true
   * @public
   */
  validate(e) {
    return e.text.trim() !== "";
  }
  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLHeadingElement} toolsContent - Text tools rendered view
   * @returns {HeaderData} - saved data
   * @public
   */
  save(e) {
    return {
      text: e.innerHTML,
      level: this.currentLevel.number
    };
  }
  /**
   * Allow Header to be converted to/from other blocks
   */
  static get conversionConfig() {
    return {
      export: "text",
      // use 'text' property for other blocks
      import: "text"
      // fill 'text' property from other block's export string
    };
  }
  /**
   * Sanitizer Rules
   */
  static get sanitize() {
    return {
      level: !1,
      text: {}
    };
  }
  /**
   * Returns true to notify core that read-only is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Get current Tools`s data
   *
   * @returns {HeaderData} Current data
   * @private
   */
  get data() {
    return this._data.text = this._element.innerHTML, this._data.level = this.currentLevel.number, this._data;
  }
  /**
   * Store data in plugin:
   * - at the this._data property
   * - at the HTML
   *
   * @param {HeaderData} data — data to set
   * @private
   */
  set data(e) {
    if (this._data = this.normalizeData(e), e.level !== void 0 && this._element.parentNode) {
      const t = this.getTag();
      t.innerHTML = this._element.innerHTML, this._element.parentNode.replaceChild(t, this._element), this._element = t;
    }
    e.text !== void 0 && (this._element.innerHTML = this._data.text || "");
  }
  /**
   * Get tag for target level
   * By default returns second-leveled header
   *
   * @returns {HTMLElement}
   */
  getTag() {
    const e = document.createElement(this.currentLevel.tag);
    return e.innerHTML = this._data.text || "", e.classList.add(this._CSS.wrapper), e.contentEditable = this.readOnly ? "false" : "true", e.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || ""), e;
  }
  /**
   * Get current level
   *
   * @returns {level}
   */
  get currentLevel() {
    let e = this.levels.find((t) => t.number === this._data.level);
    return e || (e = this.defaultLevel), e;
  }
  /**
   * Return default level
   *
   * @returns {level}
   */
  get defaultLevel() {
    if (this._settings.defaultLevel) {
      const e = this.levels.find((t) => t.number === this._settings.defaultLevel);
      if (e)
        return e;
      console.warn("(ง'̀-'́)ง Heading Tool: the default level specified was not found in available levels");
    }
    return this.levels[1];
  }
  /**
   * @typedef {object} level
   * @property {number} number - level number
   * @property {string} tag - tag corresponds with level number
   * @property {string} svg - icon
   */
  /**
   * Available header levels
   *
   * @returns {level[]}
   */
  get levels() {
    const e = [
      {
        number: 1,
        tag: "H1",
        svg: Ir
      },
      {
        number: 2,
        tag: "H2",
        svg: Lr
      },
      {
        number: 3,
        tag: "H3",
        svg: Or
      },
      {
        number: 4,
        tag: "H4",
        svg: Bp
      },
      {
        number: 5,
        tag: "H5",
        svg: Ip
      },
      {
        number: 6,
        tag: "H6",
        svg: Lp
      }
    ];
    return this._settings.levels ? e.filter(
      (t) => this._settings.levels.includes(t.number)
    ) : e;
  }
  /**
   * Handle H1-H6 tags on paste to substitute it with header Tool
   *
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(e) {
    const t = e.detail;
    if ("data" in t) {
      const o = t.data;
      let i = this.defaultLevel.number;
      switch (o.tagName) {
        case "H1":
          i = 1;
          break;
        case "H2":
          i = 2;
          break;
        case "H3":
          i = 3;
          break;
        case "H4":
          i = 4;
          break;
        case "H5":
          i = 5;
          break;
        case "H6":
          i = 6;
          break;
      }
      this._settings.levels && (i = this._settings.levels.reduce((r, s) => Math.abs(s - i) < Math.abs(r - i) ? s : r)), this.data = {
        level: i,
        text: o.innerHTML
      };
    }
  }
  /**
   * Used by Editor.js paste handling API.
   * Provides configuration to handle H1-H6 tags.
   *
   * @returns {{handler: (function(HTMLElement): {text: string}), tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ["H1", "H2", "H3", "H4", "H5", "H6"]
    };
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return [{
      icon: Ir,
      title: "Heading 1",
      data: { level: 1 }
    }, {
      icon: Lr,
      title: "Heading 2",
      data: { level: 2 }
    }, {
      icon: Or,
      title: "Heading 3",
      data: { level: 3 }
    }];
  }
};
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".cdx-list{margin:0;padding-left:40px;outline:none}.cdx-list__item{padding:5.5px 0 5.5px 3px;line-height:1.6em}.cdx-list--unordered{list-style:disc}.cdx-list--ordered{list-style:decimal}.cdx-list-settings{display:flex}.cdx-list-settings .cdx-settings-button{width:50%}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const Mr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="9" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="9" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 17H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 12H4.99002"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5.00001 7H4.99002"/></svg>', Ar = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><line x1="12" x2="19" y1="7" y2="7" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="12" x2="19" y1="12" y2="12" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><line x1="12" x2="19" y1="17" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.79999 14L7.79999 7.2135C7.79999 7.12872 7.7011 7.0824 7.63597 7.13668L4.79999 9.5"/></svg>';
let Mp = class {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Allow to use native Enter behaviour
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return [{
      icon: Mr,
      title: "Bulleted List",
      data: { style: "unordered" }
    }, {
      icon: Ar,
      title: "Numbered List",
      data: { style: "ordered" }
    }];
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - tool constructor options
   * @param {ListData} params.data - previously saved data
   * @param {object} params.config - user config for Tool
   * @param {object} params.api - Editor.js API
   * @param {boolean} params.readOnly - read-only mode flag
   */
  constructor({ data: e, config: t, api: o, readOnly: i }) {
    this._elements = {
      wrapper: null
    }, this.api = o, this.readOnly = i, this.settings = [
      {
        name: "unordered",
        label: this.api.i18n.t("Unordered"),
        icon: Mr,
        default: t.defaultStyle === "unordered" || !1
      },
      {
        name: "ordered",
        label: this.api.i18n.t("Ordered"),
        icon: Ar,
        default: t.defaultStyle === "ordered" || !0
      }
    ], this._data = {
      style: this.settings.find((r) => r.default === !0).name,
      items: []
    }, this.data = e;
  }
  /**
   * Returns list tag with items
   *
   * @returns {Element}
   * @public
   */
  render() {
    return this._elements.wrapper = this.makeMainTag(this._data.style), this._data.items.length ? this._data.items.forEach((e) => {
      this._elements.wrapper.appendChild(this._make("li", this.CSS.item, {
        innerHTML: e
      }));
    }) : this._elements.wrapper.appendChild(this._make("li", this.CSS.item)), this.readOnly || this._elements.wrapper.addEventListener("keydown", (e) => {
      const [t, o] = [13, 8];
      switch (e.keyCode) {
        case t:
          this.getOutofList(e);
          break;
        case o:
          this.backspace(e);
          break;
      }
    }, !1), this._elements.wrapper;
  }
  /**
   * @returns {ListData}
   * @public
   */
  save() {
    return this.data;
  }
  /**
   * Allow List Tool to be converted to/from other block
   *
   * @returns {{export: Function, import: Function}}
   */
  static get conversionConfig() {
    return {
      /**
       * To create exported string from list, concatenate items by dot-symbol.
       *
       * @param {ListData} data - list data to create a string from thats
       * @returns {string}
       */
      export: (e) => e.items.join(". "),
      /**
       * To create a list from other block's string, just put it at the first item
       *
       * @param {string} string - string to create list tool data from that
       * @returns {ListData}
       */
      import: (e) => ({
        items: [e],
        style: "unordered"
      })
    };
  }
  /**
   * Sanitizer rules
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      style: {},
      items: {
        br: !0
      }
    };
  }
  /**
   * Settings
   *
   * @public
   * @returns {Array}
   */
  renderSettings() {
    return this.settings.map((e) => ({
      ...e,
      isActive: this._data.style === e.name,
      closeOnActivate: !0,
      onActivate: () => this.toggleTune(e.name)
    }));
  }
  /**
   * On paste callback that is fired from Editor
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(e) {
    const t = e.detail.data;
    this.data = this.pasteHandler(t);
  }
  /**
   * List Tool on paste configuration
   *
   * @public
   */
  static get pasteConfig() {
    return {
      tags: ["OL", "UL", "LI"]
    };
  }
  /**
   * Creates main <ul> or <ol> tag depended on style
   *
   * @param {string} style - 'ordered' or 'unordered'
   * @returns {HTMLOListElement|HTMLUListElement}
   */
  makeMainTag(e) {
    const t = e === "ordered" ? this.CSS.wrapperOrdered : this.CSS.wrapperUnordered, o = e === "ordered" ? "ol" : "ul";
    return this._make(o, [this.CSS.baseBlock, this.CSS.wrapper, t], {
      contentEditable: !this.readOnly
    });
  }
  /**
   * Toggles List style
   *
   * @param {string} style - 'ordered'|'unordered'
   */
  toggleTune(e) {
    const t = this.makeMainTag(e);
    for (; this._elements.wrapper.hasChildNodes(); )
      t.appendChild(this._elements.wrapper.firstChild);
    this._elements.wrapper.replaceWith(t), this._elements.wrapper = t, this._elements.wrapper.addEventListener("keydown", (o) => {
      const [i, r] = [13, 8];
      switch (o.keyCode) {
        case i:
          this.getOutofList(o);
          break;
        case r:
          this.backspace(o);
          break;
      }
    }, !1), this._data.style = e;
  }
  /**
   * Styles
   *
   * @private
   */
  get CSS() {
    return {
      baseBlock: this.api.styles.block,
      wrapper: "cdx-list",
      wrapperOrdered: "cdx-list--ordered",
      wrapperUnordered: "cdx-list--unordered",
      item: "cdx-list__item"
    };
  }
  /**
   * List data setter
   *
   * @param {ListData} listData
   */
  set data(e) {
    e || (e = {}), this._data.style = e.style || this.settings.find((o) => o.default === !0).name, this._data.items = e.items || [];
    const t = this._elements.wrapper;
    t && t.parentNode.replaceChild(this.render(), t);
  }
  /**
   * Return List data
   *
   * @returns {ListData}
   */
  get data() {
    this._data.items = [];
    const e = this._elements.wrapper.querySelectorAll(`.${this.CSS.item}`);
    for (let t = 0; t < e.length; t++)
      e[t].innerHTML.replace("<br>", " ").trim() && this._data.items.push(e[t].innerHTML);
    return this._data;
  }
  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {Array|string} classNames  - list or name of CSS classname(s)
   * @param  {object} attributes        - any attributes
   * @returns {Element}
   */
  _make(e, t = null, o = {}) {
    const i = document.createElement(e);
    Array.isArray(t) ? i.classList.add(...t) : t && i.classList.add(t);
    for (const r in o)
      i[r] = o[r];
    return i;
  }
  /**
   * Returns current List item by the caret position
   *
   * @returns {Element}
   */
  get currentItem() {
    let e = window.getSelection().anchorNode;
    return e.nodeType !== Node.ELEMENT_NODE && (e = e.parentNode), e.closest(`.${this.CSS.item}`);
  }
  /**
   * Get out from List Tool
   * by Enter on the empty last item
   *
   * @param {KeyboardEvent} event
   */
  getOutofList(e) {
    const t = this._elements.wrapper.querySelectorAll("." + this.CSS.item);
    if (t.length < 2)
      return;
    const o = t[t.length - 1], i = this.currentItem;
    i === o && !o.textContent.trim().length && (i.parentElement.removeChild(i), this.api.blocks.insert(), this.api.caret.setToBlock(this.api.blocks.getCurrentBlockIndex()), e.preventDefault(), e.stopPropagation());
  }
  /**
   * Handle backspace
   *
   * @param {KeyboardEvent} event
   */
  backspace(e) {
    const t = this._elements.wrapper.querySelectorAll("." + this.CSS.item), o = t[0];
    o && t.length < 2 && !o.innerHTML.replace("<br>", " ").trim() && e.preventDefault();
  }
  /**
   * Select LI content by CMD+A
   *
   * @param {KeyboardEvent} event
   */
  selectItem(e) {
    e.preventDefault();
    const t = window.getSelection(), o = t.anchorNode.parentNode, i = o.closest("." + this.CSS.item), r = new Range();
    r.selectNodeContents(i), t.removeAllRanges(), t.addRange(r);
  }
  /**
   * Handle UL, OL and LI tags paste and returns List data
   *
   * @param {HTMLUListElement|HTMLOListElement|HTMLLIElement} element
   * @returns {ListData}
   */
  pasteHandler(e) {
    const { tagName: t } = e;
    let o;
    switch (t) {
      case "OL":
        o = "ordered";
        break;
      case "UL":
      case "LI":
        o = "unordered";
    }
    const i = {
      style: o,
      items: []
    };
    if (t === "LI")
      i.items = [e.innerHTML];
    else {
      const r = Array.from(e.querySelectorAll("LI"));
      i.items = r.map((s) => s.innerHTML).filter((s) => !!s.trim());
    }
    return i;
  }
};
(function() {
  var n;
  try {
    if (typeof document < "u") {
      var e = document.createElement("style");
      e.nonce = (n = document.head.querySelector("meta[property=csp-nonce]")) == null ? void 0 : n.content, e.appendChild(document.createTextNode('.tc-wrap{--color-background:#f9f9fb;--color-text-secondary:#7b7e89;--color-border:#e8e8eb;--cell-size:34px;--toolbox-icon-size:18px;--toolbox-padding:6px;--toolbox-aiming-field-size:calc(var(--toolbox-icon-size) + var(--toolbox-padding)*2);border-left:0;position:relative;height:100%;width:100%;margin-top:var(--toolbox-icon-size);box-sizing:border-box;display:grid;grid-template-columns:calc(100% - var(--cell-size)) var(--cell-size)}.tc-wrap--readonly{grid-template-columns:100% var(--cell-size)}.tc-wrap svg{vertical-align:top}@media print{.tc-wrap{border-left-color:var(--color-border);border-left-style:solid;border-left-width:1px;grid-template-columns:100% var(--cell-size)}}@media print{.tc-wrap .tc-row:after{display:none}}.tc-table{position:relative;width:100%;height:100%;display:grid;font-size:14px;border-top:1px solid var(--color-border);line-height:1.4}.tc-table:after{width:calc(var(--cell-size));height:100%;left:calc(var(--cell-size)*-1);top:0}.tc-table:after,.tc-table:before{position:absolute;content:""}.tc-table:before{width:100%;height:var(--toolbox-aiming-field-size);top:calc(var(--toolbox-aiming-field-size)*-1);left:0}.tc-table--heading .tc-row:first-child{font-weight:600;border-bottom:2px solid var(--color-border)}.tc-table--heading .tc-row:first-child [contenteditable]:empty:before{content:attr(heading);color:var(--color-text-secondary)}.tc-table--heading .tc-row:first-child:after{bottom:-2px;border-bottom:2px solid var(--color-border)}.tc-add-column,.tc-add-row{display:flex;color:var(--color-text-secondary)}@media print{.tc-add{display:none}}.tc-add-column{padding:4px 0;justify-content:center;border-top:1px solid var(--color-border)}.tc-add-column--disabled{visibility:hidden}@media print{.tc-add-column{display:none}}.tc-add-row{height:var(--cell-size);align-items:center;padding-left:4px;position:relative}.tc-add-row--disabled{display:none}.tc-add-row:before{content:"";position:absolute;right:calc(var(--cell-size)*-1);width:var(--cell-size);height:100%}@media print{.tc-add-row{display:none}}.tc-add-column,.tc-add-row{transition:0s;cursor:pointer;will-change:background-color}.tc-add-column:hover,.tc-add-row:hover{transition:background-color .1s ease;background-color:var(--color-background)}.tc-add-row{margin-top:1px}.tc-add-row:hover:before{transition:.1s;background-color:var(--color-background)}.tc-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(10px,1fr));position:relative;border-bottom:1px solid var(--color-border)}.tc-row:after{content:"";pointer-events:none;position:absolute;width:var(--cell-size);height:100%;bottom:-1px;right:calc(var(--cell-size)*-1);border-bottom:1px solid var(--color-border)}.tc-row--selected{background:var(--color-background)}.tc-row--selected:after{background:var(--color-background)}.tc-cell{border-right:1px solid var(--color-border);padding:6px 12px;overflow:hidden;outline:none;line-break:normal}.tc-cell--selected{background:var(--color-background)}.tc-wrap--readonly .tc-row:after{display:none}.tc-toolbox{--toolbox-padding:6px;--popover-margin:30px;--toggler-click-zone-size:30px;--toggler-dots-color:#7b7e89;--toggler-dots-color-hovered:#1d202b;position:absolute;cursor:pointer;z-index:1;opacity:0;transition:opacity .1s;will-change:left,opacity}.tc-toolbox--column{top:calc(var(--toggler-click-zone-size)*-1);transform:translate(calc(var(--toggler-click-zone-size)*-1/2));will-change:left,opacity}.tc-toolbox--row{left:calc(var(--popover-margin)*-1);transform:translateY(calc(var(--toggler-click-zone-size)*-1/2));margin-top:-1px;will-change:top,opacity}.tc-toolbox--showed{opacity:1}.tc-toolbox .tc-popover{position:absolute;top:0;left:var(--popover-margin)}.tc-toolbox__toggler{display:flex;align-items:center;justify-content:center;width:var(--toggler-click-zone-size);height:var(--toggler-click-zone-size);color:var(--toggler-dots-color);opacity:0;transition:opacity .15s ease;will-change:opacity}.tc-toolbox__toggler:hover{color:var(--toggler-dots-color-hovered)}.tc-toolbox__toggler svg{fill:currentColor}.tc-wrap:hover .tc-toolbox__toggler{opacity:1}.tc-settings .cdx-settings-button{width:50%;margin:0}.tc-popover{--color-border:#eaeaea;--color-background:#fff;--color-background-hover:rgba(232,232,235,.49);--color-background-confirm:#e24a4a;--color-background-confirm-hover:#d54040;--color-text-confirm:#fff;background:var(--color-background);border:1px solid var(--color-border);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;padding:6px;display:none;will-change:opacity,transform}.tc-popover--opened{display:block;animation:menuShowing .1s cubic-bezier(.215,.61,.355,1) forwards}.tc-popover__item{display:flex;align-items:center;padding:2px 14px 2px 2px;border-radius:5px;cursor:pointer;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;user-select:none}.tc-popover__item:hover{background:var(--color-background-hover)}.tc-popover__item:not(:last-of-type){margin-bottom:2px}.tc-popover__item-icon{display:inline-flex;width:26px;height:26px;align-items:center;justify-content:center;background:var(--color-background);border-radius:5px;border:1px solid var(--color-border);margin-right:8px}.tc-popover__item-label{line-height:22px;font-size:14px;font-weight:500}.tc-popover__item--confirm{background:var(--color-background-confirm);color:var(--color-text-confirm)}.tc-popover__item--confirm:hover{background-color:var(--color-background-confirm-hover)}.tc-popover__item--confirm .tc-popover__item-icon{background:var(--color-background-confirm);border-color:#0000001a}.tc-popover__item--confirm .tc-popover__item-icon svg{transition:transform .2s ease-in;transform:rotate(90deg) scale(1.2)}.tc-popover__item--hidden{display:none}@keyframes menuShowing{0%{opacity:0;transform:translateY(-8px) scale(.9)}70%{opacity:1;transform:translateY(2px)}to{transform:translateY(0)}}')), document.head.appendChild(e);
    }
  } catch (t) {
    console.error("vite-plugin-css-injected-by-js", t);
  }
})();
function Te(n, e, t = {}) {
  const o = document.createElement(n);
  Array.isArray(e) ? o.classList.add(...e) : e && o.classList.add(e);
  for (const i in t)
    Object.prototype.hasOwnProperty.call(t, i) && (o[i] = t[i]);
  return o;
}
function _r(n) {
  const e = n.getBoundingClientRect();
  return {
    y1: Math.floor(e.top + window.pageYOffset),
    x1: Math.floor(e.left + window.pageXOffset),
    x2: Math.floor(e.right + window.pageXOffset),
    y2: Math.floor(e.bottom + window.pageYOffset)
  };
}
function Nr(n, e) {
  const t = _r(n), o = _r(e);
  return {
    fromTopBorder: o.y1 - t.y1,
    fromLeftBorder: o.x1 - t.x1,
    fromRightBorder: t.x2 - o.x2,
    fromBottomBorder: t.y2 - o.y2
  };
}
function Ap(n, e) {
  const t = n.getBoundingClientRect(), { width: o, height: i, x: r, y: s } = t, { clientX: a, clientY: l } = e;
  return {
    width: o,
    height: i,
    x: a - r,
    y: l - s
  };
}
function Pr(n, e) {
  return e.parentNode.insertBefore(n, e);
}
function Dr(n, e = !0) {
  const t = document.createRange(), o = window.getSelection();
  t.selectNodeContents(n), t.collapse(e), o.removeAllRanges(), o.addRange(t);
}
let _p = class Ee {
  /**
   * @param {object} options - constructor options
   * @param {PopoverItem[]} options.items - constructor options
   */
  constructor({ items: e }) {
    this.items = e, this.wrapper = void 0, this.itemEls = [];
  }
  /**
   * Set of CSS classnames used in popover
   *
   * @returns {object}
   */
  static get CSS() {
    return {
      popover: "tc-popover",
      popoverOpened: "tc-popover--opened",
      item: "tc-popover__item",
      itemHidden: "tc-popover__item--hidden",
      itemConfirmState: "tc-popover__item--confirm",
      itemIcon: "tc-popover__item-icon",
      itemLabel: "tc-popover__item-label"
    };
  }
  /**
   * Returns the popover element
   *
   * @returns {Element}
   */
  render() {
    return this.wrapper = Te("div", Ee.CSS.popover), this.items.forEach((e, t) => {
      const o = Te("div", Ee.CSS.item), i = Te("div", Ee.CSS.itemIcon, {
        innerHTML: e.icon
      }), r = Te("div", Ee.CSS.itemLabel, {
        textContent: e.label
      });
      o.dataset.index = t, o.appendChild(i), o.appendChild(r), this.wrapper.appendChild(o), this.itemEls.push(o);
    }), this.wrapper.addEventListener("click", (e) => {
      this.popoverClicked(e);
    }), this.wrapper;
  }
  /**
   * Popover wrapper click listener
   * Used to delegate clicks in items
   *
   * @returns {void}
   */
  popoverClicked(e) {
    const t = e.target.closest(`.${Ee.CSS.item}`);
    if (!t)
      return;
    const o = t.dataset.index, i = this.items[o];
    if (i.confirmationRequired && !this.hasConfirmationState(t)) {
      this.setConfirmationState(t);
      return;
    }
    i.onClick();
  }
  /**
   * Enable the confirmation state on passed item
   *
   * @returns {void}
   */
  setConfirmationState(e) {
    e.classList.add(Ee.CSS.itemConfirmState);
  }
  /**
   * Disable the confirmation state on passed item
   *
   * @returns {void}
   */
  clearConfirmationState(e) {
    e.classList.remove(Ee.CSS.itemConfirmState);
  }
  /**
   * Check if passed item has the confirmation state
   *
   * @returns {boolean}
   */
  hasConfirmationState(e) {
    return e.classList.contains(Ee.CSS.itemConfirmState);
  }
  /**
   * Return an opening state
   *
   * @returns {boolean}
   */
  get opened() {
    return this.wrapper.classList.contains(Ee.CSS.popoverOpened);
  }
  /**
   * Opens the popover
   *
   * @returns {void}
   */
  open() {
    this.items.forEach((e, t) => {
      typeof e.hideIf == "function" && this.itemEls[t].classList.toggle(Ee.CSS.itemHidden, e.hideIf());
    }), this.wrapper.classList.add(Ee.CSS.popoverOpened);
  }
  /**
   * Closes the popover
   *
   * @returns {void}
   */
  close() {
    this.wrapper.classList.remove(Ee.CSS.popoverOpened), this.itemEls.forEach((e) => {
      this.clearConfirmationState(e);
    });
  }
};
const Np = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L10 12M10 12L7 15M10 12H4"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L14 12M14 12L17 15M14 12H20"/></svg>', Rr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>', Pp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.8833 9.16666L18.2167 12.5M18.2167 12.5L14.8833 15.8333M18.2167 12.5H10.05C9.16594 12.5 8.31809 12.1488 7.69297 11.5237C7.06785 10.8986 6.71666 10.0507 6.71666 9.16666"/></svg>', Dp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.9167 14.9167L11.5833 18.25M11.5833 18.25L8.25 14.9167M11.5833 18.25L11.5833 10.0833C11.5833 9.19928 11.9345 8.35143 12.5596 7.72631C13.1848 7.10119 14.0326 6.75 14.9167 6.75"/></svg>', Rp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.13333 14.9167L12.4667 18.25M12.4667 18.25L15.8 14.9167M12.4667 18.25L12.4667 10.0833C12.4667 9.19928 12.1155 8.35143 11.4904 7.72631C10.8652 7.10119 10.0174 6.75 9.13333 6.75"/></svg>', Hp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.8833 15.8333L18.2167 12.5M18.2167 12.5L14.8833 9.16667M18.2167 12.5L10.05 12.5C9.16595 12.5 8.31811 12.8512 7.69299 13.4763C7.06787 14.1014 6.71667 14.9493 6.71667 15.8333"/></svg>', Fp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.41 9.66H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 9.66H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.31 14.36H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 14.36H14.59"/></svg>', Hr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>', jp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L20 12L17 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12H20"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L4 12L7 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12H10"/></svg>', zp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M5 10H19"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>', $p = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M10 5V18.5"/><path stroke="currentColor" stroke-width="2" d="M14 5V18.5"/><path stroke="currentColor" stroke-width="2" d="M5 10H19"/><path stroke="currentColor" stroke-width="2" d="M5 14H19"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>', Up = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M10 5V18.5"/><path stroke="currentColor" stroke-width="2" d="M5 10H19"/><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/></svg>';
class Ye {
  /**
   * Creates toolbox buttons and toolbox menus
   *
   * @param {object} api - Editor.js api
   * @param {PopoverItem[]} items - Editor.js api
   * @param {function} onOpen - callback fired when the Popover is opening
   * @param {function} onClose - callback fired when the Popover is closing
   * @param {string} [cssModifier] - the modifier for the Toolbox. Allows to add some specific styles.
   */
  constructor({ api: e, items: t, onOpen: o, onClose: i, cssModifier: r = "" }) {
    this.api = e, this.items = t, this.onOpen = o, this.onClose = i, this.cssModifier = r, this.popover = null, this.wrapper = this.createToolbox();
  }
  /**
   * Style classes
   */
  static get CSS() {
    return {
      toolbox: "tc-toolbox",
      toolboxShowed: "tc-toolbox--showed",
      toggler: "tc-toolbox__toggler"
    };
  }
  /**
   * Returns rendered Toolbox element
   */
  get element() {
    return this.wrapper;
  }
  /**
   * Creating a toolbox to open menu for a manipulating columns
   *
   * @returns {Element}
   */
  createToolbox() {
    const e = Te("div", [
      Ye.CSS.toolbox,
      this.cssModifier ? `${Ye.CSS.toolbox}--${this.cssModifier}` : ""
    ]);
    e.dataset.mutationFree = "true";
    const t = this.createPopover(), o = this.createToggler();
    return e.appendChild(o), e.appendChild(t), e;
  }
  /**
   * Creates the Toggler
   *
   * @returns {Element}
   */
  createToggler() {
    const e = Te("div", Ye.CSS.toggler, {
      innerHTML: Fp
    });
    return e.addEventListener("click", () => {
      this.togglerClicked();
    }), e;
  }
  /**
   * Creates the Popover instance and render it
   *
   * @returns {Element}
   */
  createPopover() {
    return this.popover = new _p({
      items: this.items
    }), this.popover.render();
  }
  /**
   * Toggler click handler. Opens/Closes the popover
   *
   * @returns {void}
   */
  togglerClicked() {
    this.popover.opened ? (this.popover.close(), this.onClose()) : (this.popover.open(), this.onOpen());
  }
  /**
   * Shows the Toolbox
   *
   * @param {function} computePositionMethod - method that returns the position coordinate
   * @returns {void}
   */
  show(e) {
    const t = e();
    Object.entries(t).forEach(([o, i]) => {
      this.wrapper.style[o] = i;
    }), this.wrapper.classList.add(Ye.CSS.toolboxShowed);
  }
  /**
   * Hides the Toolbox
   *
   * @returns {void}
   */
  hide() {
    this.popover.close(), this.wrapper.classList.remove(Ye.CSS.toolboxShowed);
  }
}
function Vp(n, e) {
  let t = 0;
  return function(...o) {
    const i = (/* @__PURE__ */ new Date()).getTime();
    if (!(i - t < n))
      return t = i, e(...o);
  };
}
const $ = {
  wrapper: "tc-wrap",
  wrapperReadOnly: "tc-wrap--readonly",
  table: "tc-table",
  row: "tc-row",
  withHeadings: "tc-table--heading",
  rowSelected: "tc-row--selected",
  cell: "tc-cell",
  cellSelected: "tc-cell--selected",
  addRow: "tc-add-row",
  addRowDisabled: "tc-add-row--disabled",
  addColumn: "tc-add-column",
  addColumnDisabled: "tc-add-column--disabled"
};
class qp {
  /**
   * Creates
   *
   * @constructor
   * @param {boolean} readOnly - read-only mode flag
   * @param {object} api - Editor.js API
   * @param {TableData} data - Editor.js API
   * @param {TableConfig} config - Editor.js API
   */
  constructor(e, t, o, i) {
    this.readOnly = e, this.api = t, this.data = o, this.config = i, this.wrapper = null, this.table = null, this.toolboxColumn = this.createColumnToolbox(), this.toolboxRow = this.createRowToolbox(), this.createTableWrapper(), this.hoveredRow = 0, this.hoveredColumn = 0, this.selectedRow = 0, this.selectedColumn = 0, this.tunes = {
      withHeadings: !1
    }, this.resize(), this.fill(), this.focusedCell = {
      row: 0,
      column: 0
    }, this.documentClicked = (r) => {
      const s = r.target.closest(`.${$.table}`) !== null, a = r.target.closest(`.${$.wrapper}`) === null;
      (s || a) && this.hideToolboxes();
      const l = r.target.closest(`.${$.addRow}`), c = r.target.closest(`.${$.addColumn}`);
      l && l.parentNode === this.wrapper ? (this.addRow(void 0, !0), this.hideToolboxes()) : c && c.parentNode === this.wrapper && (this.addColumn(void 0, !0), this.hideToolboxes());
    }, this.readOnly || this.bindEvents();
  }
  /**
   * Returns the rendered table wrapper
   *
   * @returns {Element}
   */
  getWrapper() {
    return this.wrapper;
  }
  /**
   * Hangs the necessary handlers to events
   */
  bindEvents() {
    document.addEventListener("click", this.documentClicked), this.table.addEventListener("mousemove", Vp(150, (e) => this.onMouseMoveInTable(e)), { passive: !0 }), this.table.onkeypress = (e) => this.onKeyPressListener(e), this.table.addEventListener("keydown", (e) => this.onKeyDownListener(e)), this.table.addEventListener("focusin", (e) => this.focusInTableListener(e));
  }
  /**
   * Configures and creates the toolbox for manipulating with columns
   *
   * @returns {Toolbox}
   */
  createColumnToolbox() {
    return new Ye({
      api: this.api,
      cssModifier: "column",
      items: [
        {
          label: this.api.i18n.t("Add column to left"),
          icon: Dp,
          hideIf: () => this.numberOfColumns === this.config.maxcols,
          onClick: () => {
            this.addColumn(this.selectedColumn, !0), this.hideToolboxes();
          }
        },
        {
          label: this.api.i18n.t("Add column to right"),
          icon: Rp,
          hideIf: () => this.numberOfColumns === this.config.maxcols,
          onClick: () => {
            this.addColumn(this.selectedColumn + 1, !0), this.hideToolboxes();
          }
        },
        {
          label: this.api.i18n.t("Delete column"),
          icon: Rr,
          hideIf: () => this.numberOfColumns === 1,
          confirmationRequired: !0,
          onClick: () => {
            this.deleteColumn(this.selectedColumn), this.hideToolboxes();
          }
        }
      ],
      onOpen: () => {
        this.selectColumn(this.hoveredColumn), this.hideRowToolbox();
      },
      onClose: () => {
        this.unselectColumn();
      }
    });
  }
  /**
   * Configures and creates the toolbox for manipulating with rows
   *
   * @returns {Toolbox}
   */
  createRowToolbox() {
    return new Ye({
      api: this.api,
      cssModifier: "row",
      items: [
        {
          label: this.api.i18n.t("Add row above"),
          icon: Hp,
          hideIf: () => this.numberOfRows === this.config.maxrows,
          onClick: () => {
            this.addRow(this.selectedRow, !0), this.hideToolboxes();
          }
        },
        {
          label: this.api.i18n.t("Add row below"),
          icon: Pp,
          hideIf: () => this.numberOfRows === this.config.maxrows,
          onClick: () => {
            this.addRow(this.selectedRow + 1, !0), this.hideToolboxes();
          }
        },
        {
          label: this.api.i18n.t("Delete row"),
          icon: Rr,
          hideIf: () => this.numberOfRows === 1,
          confirmationRequired: !0,
          onClick: () => {
            this.deleteRow(this.selectedRow), this.hideToolboxes();
          }
        }
      ],
      onOpen: () => {
        this.selectRow(this.hoveredRow), this.hideColumnToolbox();
      },
      onClose: () => {
        this.unselectRow();
      }
    });
  }
  /**
   * When you press enter it moves the cursor down to the next row
   * or creates it if the click occurred on the last one
   */
  moveCursorToNextRow() {
    this.focusedCell.row !== this.numberOfRows ? (this.focusedCell.row += 1, this.focusCell(this.focusedCell)) : (this.addRow(), this.focusedCell.row += 1, this.focusCell(this.focusedCell), this.updateToolboxesPosition(0, 0));
  }
  /**
   * Get table cell by row and col index
   *
   * @param {number} row - cell row coordinate
   * @param {number} column - cell column coordinate
   * @returns {HTMLElement}
   */
  getCell(e, t) {
    return this.table.querySelectorAll(`.${$.row}:nth-child(${e}) .${$.cell}`)[t - 1];
  }
  /**
   * Get table row by index
   *
   * @param {number} row - row coordinate
   * @returns {HTMLElement}
   */
  getRow(e) {
    return this.table.querySelector(`.${$.row}:nth-child(${e})`);
  }
  /**
   * The parent of the cell which is the row
   *
   * @param {HTMLElement} cell - cell element
   * @returns {HTMLElement}
   */
  getRowByCell(e) {
    return e.parentElement;
  }
  /**
   * Ger row's first cell
   *
   * @param {Element} row - row to find its first cell
   * @returns {Element}
   */
  getRowFirstCell(e) {
    return e.querySelector(`.${$.cell}:first-child`);
  }
  /**
   * Set the sell's content by row and column numbers
   *
   * @param {number} row - cell row coordinate
   * @param {number} column - cell column coordinate
   * @param {string} content - cell HTML content
   */
  setCellContent(e, t, o) {
    const i = this.getCell(e, t);
    i.innerHTML = o;
  }
  /**
   * Add column in table on index place
   * Add cells in each row
   *
   * @param {number} columnIndex - number in the array of columns, where new column to insert, -1 if insert at the end
   * @param {boolean} [setFocus] - pass true to focus the first cell
   */
  addColumn(e = -1, t = !1) {
    var o;
    let i = this.numberOfColumns;
    if (this.config && this.config.maxcols && this.numberOfColumns >= this.config.maxcols)
      return;
    for (let s = 1; s <= this.numberOfRows; s++) {
      let a;
      const l = this.createCell();
      if (e > 0 && e <= i ? (a = this.getCell(s, e), Pr(l, a)) : a = this.getRow(s).appendChild(l), s === 1) {
        const c = this.getCell(s, e > 0 ? e : i + 1);
        c && t && Dr(c);
      }
    }
    const r = this.wrapper.querySelector(`.${$.addColumn}`);
    (o = this.config) != null && o.maxcols && this.numberOfColumns > this.config.maxcols - 1 && r && r.classList.add($.addColumnDisabled), this.addHeadingAttrToFirstRow();
  }
  /**
   * Add row in table on index place
   *
   * @param {number} index - number in the array of rows, where new column to insert, -1 if insert at the end
   * @param {boolean} [setFocus] - pass true to focus the inserted row
   * @returns {HTMLElement} row
   */
  addRow(e = -1, t = !1) {
    let o, i = Te("div", $.row);
    this.tunes.withHeadings && this.removeHeadingAttrFromFirstRow();
    let r = this.numberOfColumns;
    if (this.config && this.config.maxrows && this.numberOfRows >= this.config.maxrows && a)
      return;
    if (e > 0 && e <= this.numberOfRows) {
      let l = this.getRow(e);
      o = Pr(i, l);
    } else
      o = this.table.appendChild(i);
    this.fillRow(o, r), this.tunes.withHeadings && this.addHeadingAttrToFirstRow();
    const s = this.getRowFirstCell(o);
    s && t && Dr(s);
    const a = this.wrapper.querySelector(`.${$.addRow}`);
    return this.config && this.config.maxrows && this.numberOfRows >= this.config.maxrows && a && a.classList.add($.addRowDisabled), o;
  }
  /**
   * Delete a column by index
   *
   * @param {number} index
   */
  deleteColumn(e) {
    for (let o = 1; o <= this.numberOfRows; o++) {
      const i = this.getCell(o, e);
      if (!i)
        return;
      i.remove();
    }
    const t = this.wrapper.querySelector(`.${$.addColumn}`);
    t && t.classList.remove($.addColumnDisabled);
  }
  /**
   * Delete a row by index
   *
   * @param {number} index
   */
  deleteRow(e) {
    this.getRow(e).remove();
    const t = this.wrapper.querySelector(`.${$.addRow}`);
    t && t.classList.remove($.addRowDisabled), this.addHeadingAttrToFirstRow();
  }
  /**
   * Create a wrapper containing a table, toolboxes
   * and buttons for adding rows and columns
   *
   * @returns {HTMLElement} wrapper - where all buttons for a table and the table itself will be
   */
  createTableWrapper() {
    if (this.wrapper = Te("div", $.wrapper), this.table = Te("div", $.table), this.readOnly && this.wrapper.classList.add($.wrapperReadOnly), this.wrapper.appendChild(this.toolboxRow.element), this.wrapper.appendChild(this.toolboxColumn.element), this.wrapper.appendChild(this.table), !this.readOnly) {
      const e = Te("div", $.addColumn, {
        innerHTML: Hr
      }), t = Te("div", $.addRow, {
        innerHTML: Hr
      });
      this.wrapper.appendChild(e), this.wrapper.appendChild(t);
    }
  }
  /**
   * Returns the size of the table based on initial data or config "size" property
   *
   * @return {{rows: number, cols: number}} - number of cols and rows
   */
  computeInitialSize() {
    const e = this.data && this.data.content, t = Array.isArray(e), o = t ? e.length : !1, i = t ? e.length : void 0, r = o ? e[0].length : void 0, s = Number.parseInt(this.config && this.config.rows), a = Number.parseInt(this.config && this.config.cols), l = !isNaN(s) && s > 0 ? s : void 0, c = !isNaN(a) && a > 0 ? a : void 0;
    return {
      rows: i || l || 2,
      cols: r || c || 2
    };
  }
  /**
   * Resize table to match config size or transmitted data size
   *
   * @return {{rows: number, cols: number}} - number of cols and rows
   */
  resize() {
    const { rows: e, cols: t } = this.computeInitialSize();
    for (let o = 0; o < e; o++)
      this.addRow();
    for (let o = 0; o < t; o++)
      this.addColumn();
  }
  /**
   * Fills the table with data passed to the constructor
   *
   * @returns {void}
   */
  fill() {
    const e = this.data;
    if (e && e.content)
      for (let t = 0; t < e.content.length; t++)
        for (let o = 0; o < e.content[t].length; o++)
          this.setCellContent(t + 1, o + 1, e.content[t][o]);
  }
  /**
   * Fills a row with cells
   *
   * @param {HTMLElement} row - row to fill
   * @param {number} numberOfColumns - how many cells should be in a row
   */
  fillRow(e, t) {
    for (let o = 1; o <= t; o++) {
      const i = this.createCell();
      e.appendChild(i);
    }
  }
  /**
   * Creating a cell element
   *
   * @return {Element}
   */
  createCell() {
    return Te("div", $.cell, {
      contentEditable: !this.readOnly
    });
  }
  /**
   * Get number of rows in the table
   */
  get numberOfRows() {
    return this.table.childElementCount;
  }
  /**
   * Get number of columns in the table
   */
  get numberOfColumns() {
    return this.numberOfRows ? this.table.querySelectorAll(`.${$.row}:first-child .${$.cell}`).length : 0;
  }
  /**
   * Is the column toolbox menu displayed or not
   *
   * @returns {boolean}
   */
  get isColumnMenuShowing() {
    return this.selectedColumn !== 0;
  }
  /**
   * Is the row toolbox menu displayed or not
   *
   * @returns {boolean}
   */
  get isRowMenuShowing() {
    return this.selectedRow !== 0;
  }
  /**
   * Recalculate position of toolbox icons
   *
   * @param {Event} event - mouse move event
   */
  onMouseMoveInTable(e) {
    const { row: t, column: o } = this.getHoveredCell(e);
    this.hoveredColumn = o, this.hoveredRow = t, this.updateToolboxesPosition();
  }
  /**
   * Prevents default Enter behaviors
   * Adds Shift+Enter processing
   *
   * @param {KeyboardEvent} event - keypress event
   */
  onKeyPressListener(e) {
    if (e.key === "Enter") {
      if (e.shiftKey)
        return !0;
      this.moveCursorToNextRow();
    }
    return e.key !== "Enter";
  }
  /**
   * Prevents tab keydown event from bubbling
   * so that it only works inside the table
   *
   * @param {KeyboardEvent} event - keydown event
   */
  onKeyDownListener(e) {
    e.key === "Tab" && e.stopPropagation();
  }
  /**
   * Set the coordinates of the cell that the focus has moved to
   *
   * @param {FocusEvent} event - focusin event
   */
  focusInTableListener(e) {
    const t = e.target, o = this.getRowByCell(t);
    this.focusedCell = {
      row: Array.from(this.table.querySelectorAll(`.${$.row}`)).indexOf(o) + 1,
      column: Array.from(o.querySelectorAll(`.${$.cell}`)).indexOf(t) + 1
    };
  }
  /**
   * Unselect row/column
   * Close toolbox menu
   * Hide toolboxes
   *
   * @returns {void}
   */
  hideToolboxes() {
    this.hideRowToolbox(), this.hideColumnToolbox(), this.updateToolboxesPosition();
  }
  /**
   * Unselect row, close toolbox
   *
   * @returns {void}
   */
  hideRowToolbox() {
    this.unselectRow(), this.toolboxRow.hide();
  }
  /**
   * Unselect column, close toolbox
   *
   * @returns {void}
   */
  hideColumnToolbox() {
    this.unselectColumn(), this.toolboxColumn.hide();
  }
  /**
   * Set the cursor focus to the focused cell
   *
   * @returns {void}
   */
  focusCell() {
    this.focusedCellElem.focus();
  }
  /**
   * Get current focused element
   *
   * @returns {HTMLElement} - focused cell
   */
  get focusedCellElem() {
    const { row: e, column: t } = this.focusedCell;
    return this.getCell(e, t);
  }
  /**
   * Update toolboxes position
   *
   * @param {number} row - hovered row
   * @param {number} column - hovered column
   */
  updateToolboxesPosition(e = this.hoveredRow, t = this.hoveredColumn) {
    this.isColumnMenuShowing || t > 0 && t <= this.numberOfColumns && this.toolboxColumn.show(() => ({
      left: `calc((100% - var(--cell-size)) / (${this.numberOfColumns} * 2) * (1 + (${t} - 1) * 2))`
    })), this.isRowMenuShowing || e > 0 && e <= this.numberOfRows && this.toolboxRow.show(() => {
      const o = this.getRow(e), { fromTopBorder: i } = Nr(this.table, o), { height: r } = o.getBoundingClientRect();
      return {
        top: `${Math.ceil(i + r / 2)}px`
      };
    });
  }
  /**
   * Makes the first row headings
   *
   * @param {boolean} withHeadings - use headings row or not
   */
  setHeadingsSetting(e) {
    this.tunes.withHeadings = e, e ? (this.table.classList.add($.withHeadings), this.addHeadingAttrToFirstRow()) : (this.table.classList.remove($.withHeadings), this.removeHeadingAttrFromFirstRow());
  }
  /**
   * Adds an attribute for displaying the placeholder in the cell
   */
  addHeadingAttrToFirstRow() {
    for (let e = 1; e <= this.numberOfColumns; e++) {
      let t = this.getCell(1, e);
      t && t.setAttribute("heading", this.api.i18n.t("Heading"));
    }
  }
  /**
   * Removes an attribute for displaying the placeholder in the cell
   */
  removeHeadingAttrFromFirstRow() {
    for (let e = 1; e <= this.numberOfColumns; e++) {
      let t = this.getCell(1, e);
      t && t.removeAttribute("heading");
    }
  }
  /**
   * Add effect of a selected row
   *
   * @param {number} index
   */
  selectRow(e) {
    const t = this.getRow(e);
    t && (this.selectedRow = e, t.classList.add($.rowSelected));
  }
  /**
   * Remove effect of a selected row
   */
  unselectRow() {
    if (this.selectedRow <= 0)
      return;
    const e = this.table.querySelector(`.${$.rowSelected}`);
    e && e.classList.remove($.rowSelected), this.selectedRow = 0;
  }
  /**
   * Add effect of a selected column
   *
   * @param {number} index
   */
  selectColumn(e) {
    for (let t = 1; t <= this.numberOfRows; t++) {
      const o = this.getCell(t, e);
      o && o.classList.add($.cellSelected);
    }
    this.selectedColumn = e;
  }
  /**
   * Remove effect of a selected column
   */
  unselectColumn() {
    if (this.selectedColumn <= 0)
      return;
    let e = this.table.querySelectorAll(`.${$.cellSelected}`);
    Array.from(e).forEach((t) => {
      t.classList.remove($.cellSelected);
    }), this.selectedColumn = 0;
  }
  /**
   * Calculates the row and column that the cursor is currently hovering over
   * The search was optimized from O(n) to O (log n) via bin search to reduce the number of calculations
   *
   * @param {Event} event - mousemove event
   * @returns hovered cell coordinates as an integer row and column
   */
  getHoveredCell(e) {
    let t = this.hoveredRow, o = this.hoveredColumn;
    const { width: i, height: r, x: s, y: a } = Ap(this.table, e);
    return s >= 0 && (o = this.binSearch(
      this.numberOfColumns,
      (l) => this.getCell(1, l),
      ({ fromLeftBorder: l }) => s < l,
      ({ fromRightBorder: l }) => s > i - l
    )), a >= 0 && (t = this.binSearch(
      this.numberOfRows,
      (l) => this.getCell(l, 1),
      ({ fromTopBorder: l }) => a < l,
      ({ fromBottomBorder: l }) => a > r - l
    )), {
      row: t || this.hoveredRow,
      column: o || this.hoveredColumn
    };
  }
  /**
   * Looks for the index of the cell the mouse is hovering over.
   * Cells can be represented as ordered intervals with left and
   * right (upper and lower for rows) borders inside the table, if the mouse enters it, then this is our index
   *
   * @param {number} numberOfCells - upper bound of binary search
   * @param {function} getCell - function to take the currently viewed cell
   * @param {function} beforeTheLeftBorder - determines the cursor position, to the left of the cell or not
   * @param {function} afterTheRightBorder - determines the cursor position, to the right of the cell or not
   * @returns {number}
   */
  binSearch(e, t, o, i) {
    let r = 0, s = e + 1, a = 0, l;
    for (; r < s - 1 && a < 10; ) {
      l = Math.ceil((r + s) / 2);
      const c = t(l), d = Nr(this.table, c);
      if (o(d))
        s = l;
      else if (i(d))
        r = l;
      else
        break;
      a++;
    }
    return l;
  }
  /**
   * Collects data from cells into a two-dimensional array
   *
   * @returns {string[][]}
   */
  getData() {
    const e = [];
    for (let t = 1; t <= this.numberOfRows; t++) {
      const o = this.table.querySelector(`.${$.row}:nth-child(${t})`), i = Array.from(o.querySelectorAll(`.${$.cell}`));
      i.every((r) => !r.textContent.trim()) || e.push(i.map((r) => r.innerHTML));
    }
    return e;
  }
  /**
   * Remove listeners on the document
   */
  destroy() {
    document.removeEventListener("click", this.documentClicked);
  }
}
let Wp = class {
  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Allow to press Enter inside the CodeTool textarea
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {TableConstructor} init
   */
  constructor({ data: e, config: t, api: o, readOnly: i, block: r }) {
    this.api = o, this.readOnly = i, this.config = t, this.data = {
      withHeadings: this.getConfig("withHeadings", !1, e),
      stretched: this.getConfig("stretched", !1, e),
      content: e && e.content ? e.content : []
    }, this.table = null, this.block = r;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: Up,
      title: "Table"
    };
  }
  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this.table = new qp(this.readOnly, this.api, this.data, this.config), this.container = Te("div", this.api.styles.block), this.container.appendChild(this.table.getWrapper()), this.table.setHeadingsSetting(this.data.withHeadings), this.container;
  }
  /**
   * Returns plugin settings
   *
   * @returns {Array}
   */
  renderSettings() {
    return [
      {
        label: this.api.i18n.t("With headings"),
        icon: zp,
        isActive: this.data.withHeadings,
        closeOnActivate: !0,
        toggle: !0,
        onActivate: () => {
          this.data.withHeadings = !0, this.table.setHeadingsSetting(this.data.withHeadings);
        }
      },
      {
        label: this.api.i18n.t("Without headings"),
        icon: $p,
        isActive: !this.data.withHeadings,
        closeOnActivate: !0,
        toggle: !0,
        onActivate: () => {
          this.data.withHeadings = !1, this.table.setHeadingsSetting(this.data.withHeadings);
        }
      },
      {
        label: this.data.stretched ? this.api.i18n.t("Collapse") : this.api.i18n.t("Stretch"),
        icon: this.data.stretched ? Np : jp,
        closeOnActivate: !0,
        toggle: !0,
        onActivate: () => {
          this.data.stretched = !this.data.stretched, this.block.stretched = this.data.stretched;
        }
      }
    ];
  }
  /**
   * Extract table data from the view
   *
   * @returns {TableData} - saved data
   */
  save() {
    const e = this.table.getData();
    return {
      withHeadings: this.data.withHeadings,
      stretched: this.data.stretched,
      content: e
    };
  }
  /**
   * Plugin destroyer
   *
   * @returns {void}
   */
  destroy() {
    this.table.destroy();
  }
  /**
   * A helper to get config value.
   *
   * @param {string} configName - the key to get from the config.
   * @param {any} defaultValue - default value if config doesn't have passed key
   * @param {object} savedData - previously saved data. If passed, the key will be got from there, otherwise from the config
   * @returns {any} - config value.
   */
  getConfig(e, t = void 0, o = void 0) {
    const i = this.data || o;
    return i ? i[e] ? i[e] : t : this.config && this.config[e] ? this.config[e] : t;
  }
  /**
   * Table onPaste configuration
   *
   * @public
   */
  static get pasteConfig() {
    return { tags: ["TABLE", "TR", "TH", "TD"] };
  }
  /**
   * On paste callback that is fired from Editor
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(e) {
    const t = e.detail.data, o = t.querySelector(":scope > thead, tr:first-of-type th"), i = Array.from(t.querySelectorAll("tr")).map((r) => Array.from(r.querySelectorAll("th, td")).map((s) => s.innerHTML));
    this.data = {
      withHeadings: o !== null,
      content: i
    }, this.table.wrapper && this.table.wrapper.replaceWith(this.render());
  }
};
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode('.image-tool{--bg-color: #cdd1e0;--front-color: #388ae5;--border-color: #e8e8eb}.image-tool__image{border-radius:3px;overflow:hidden;margin-bottom:10px}.image-tool__image-picture{max-width:100%;vertical-align:bottom;display:block}.image-tool__image-preloader{width:50px;height:50px;border-radius:50%;background-size:cover;margin:auto;position:relative;background-color:var(--bg-color);background-position:center center}.image-tool__image-preloader:after{content:"";position:absolute;z-index:3;width:60px;height:60px;border-radius:50%;border:2px solid var(--bg-color);border-top-color:var(--front-color);left:50%;top:50%;margin-top:-30px;margin-left:-30px;animation:image-preloader-spin 2s infinite linear;box-sizing:border-box}.image-tool__caption[contentEditable=true][data-placeholder]:before{position:absolute!important;content:attr(data-placeholder);color:#707684;font-weight:400;display:none}.image-tool__caption[contentEditable=true][data-placeholder]:empty:before{display:block}.image-tool__caption[contentEditable=true][data-placeholder]:empty:focus:before{display:none}.image-tool--empty .image-tool__image,.image-tool--empty .image-tool__caption,.image-tool--loading .image-tool__caption{display:none}.image-tool .cdx-button{display:flex;align-items:center;justify-content:center}.image-tool .cdx-button svg{height:auto;margin:0 6px 0 0}.image-tool--filled .cdx-button,.image-tool--filled .image-tool__image-preloader{display:none}.image-tool--loading .image-tool__image{min-height:200px;display:flex;border:1px solid var(--border-color);background-color:#fff}.image-tool--loading .image-tool__image-picture,.image-tool--loading .cdx-button{display:none}.image-tool--withBorder .image-tool__image{border:1px solid var(--border-color)}.image-tool--withBackground .image-tool__image{padding:15px;background:var(--bg-color)}.image-tool--withBackground .image-tool__image-picture{max-width:60%;margin:0 auto}.image-tool--stretched .image-tool__image-picture{width:100%}@keyframes image-preloader-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}')), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const Yp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19V19C9.13623 19 8.20435 19 7.46927 18.6955C6.48915 18.2895 5.71046 17.5108 5.30448 16.5307C5 15.7956 5 14.8638 5 13V12C5 9.19108 5 7.78661 5.67412 6.77772C5.96596 6.34096 6.34096 5.96596 6.77772 5.67412C7.78661 5 9.19108 5 12 5H13.5C14.8956 5 15.5933 5 16.1611 5.17224C17.4395 5.56004 18.44 6.56046 18.8278 7.83886C19 8.40666 19 9.10444 19 10.5V10.5"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 13V16M16 19V16M19 16H16M16 16H13"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.5 17.5L17.5 6.5"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.9919 10.5H19.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.9919 19H11.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13L13 5"/></svg>', Xp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.9919 9.5H19.0015"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.5 5H14.5096"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.625 5H15C17.2091 5 19 6.79086 19 9V9.375"/><path stroke="currentColor" stroke-width="2" d="M9.375 5L9 5C6.79086 5 5 6.79086 5 9V9.375"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3725 5H9.38207"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9.5H5.00957"/><path stroke="currentColor" stroke-width="2" d="M9.375 19H9C6.79086 19 5 17.2091 5 15V14.625"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.3725 19H9.38207"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14.55H5.00957"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 13V16M16 19V16M19 16H16M16 16H13"/></svg>', ha = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"/></svg>', Kp = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9L20 12L17 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 12H20"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9L4 12L7 15"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12H10"/></svg>';
function ft(n, e = null, t = {}) {
  const o = document.createElement(n);
  Array.isArray(e) ? o.classList.add(...e) : e !== null && o.classList.add(e);
  for (const i in t)
    t.hasOwnProperty(i) && (o[i] = t[i]);
  return o;
}
var Nt = /* @__PURE__ */ ((n) => (n.Empty = "empty", n.Uploading = "uploading", n.Filled = "filled", n))(Nt || {});
class Zp {
  /**
   * @param ui - image tool Ui module
   * @param ui.api - Editor.js API
   * @param ui.config - user config
   * @param ui.onSelectFile - callback for clicks on Select file button
   * @param ui.readOnly - read-only mode flag
   */
  constructor({ api: e, config: t, onSelectFile: o, readOnly: i }) {
    this.api = e, this.config = t, this.onSelectFile = o, this.readOnly = i, this.nodes = {
      wrapper: ft("div", [this.CSS.baseClass, this.CSS.wrapper]),
      imageContainer: ft("div", [this.CSS.imageContainer]),
      fileButton: this.createFileButton(),
      imageEl: void 0,
      imagePreloader: ft("div", this.CSS.imagePreloader),
      caption: ft("div", [this.CSS.input, this.CSS.caption], {
        contentEditable: !this.readOnly
      })
    }, this.nodes.caption.dataset.placeholder = this.config.captionPlaceholder, this.nodes.imageContainer.appendChild(this.nodes.imagePreloader), this.nodes.wrapper.appendChild(this.nodes.imageContainer), this.nodes.wrapper.appendChild(this.nodes.fileButton);
  }
  /**
   * Apply visual representation of activated tune
   * @param tuneName - one of available tunes {@link Tunes.tunes}
   * @param status - true for enable, false for disable
   */
  applyTune(e, t) {
    this.nodes.wrapper.classList.toggle(`${this.CSS.wrapper}--${e}`, t);
  }
  /**
   * Renders tool UI
   * @param toolData - saved tool data
   */
  render(e) {
    return e.file === void 0 || Object.keys(e.file).length === 0 ? this.toggleStatus(
      "empty"
      /* Empty */
    ) : this.toggleStatus(
      "uploading"
      /* Uploading */
    ), this.nodes.wrapper;
  }
  /**
   * Shows uploading preloader
   * @param src - preview source
   */
  showPreloader(e) {
    this.nodes.imagePreloader.style.backgroundImage = `url(${e})`, this.toggleStatus(
      "uploading"
      /* Uploading */
    );
  }
  /**
   * Hide uploading preloader
   */
  hidePreloader() {
    this.nodes.imagePreloader.style.backgroundImage = "", this.toggleStatus(
      "empty"
      /* Empty */
    );
  }
  /**
   * Shows an image
   * @param url - image source
   */
  fillImage(e) {
    const t = /\.mp4$/.test(e) ? "VIDEO" : "IMG", o = {
      src: e
    };
    let i = "load";
    t === "VIDEO" && (o.autoplay = !0, o.loop = !0, o.muted = !0, o.playsinline = !0, i = "loadeddata"), this.nodes.imageEl = ft(t, this.CSS.imageEl, o), this.nodes.imageEl.addEventListener(i, () => {
      this.toggleStatus(
        "filled"
        /* Filled */
      ), this.nodes.imagePreloader !== void 0 && (this.nodes.imagePreloader.style.backgroundImage = "");
    }), this.nodes.imageContainer.appendChild(this.nodes.imageEl);
  }
  /**
   * Shows caption input
   * @param text - caption content text
   */
  fillCaption(e) {
    this.nodes.caption !== void 0 && (this.nodes.caption.innerHTML = e);
  }
  /**
   * CSS classes
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      button: this.api.styles.button,
      /**
       * Tool's classes
       */
      wrapper: "image-tool",
      imageContainer: "image-tool__image",
      imagePreloader: "image-tool__image-preloader",
      imageEl: "image-tool__image-picture",
      caption: "image-tool__caption"
    };
  }
  /**
   * Creates upload-file button
   */
  createFileButton() {
    const e = ft("div", [this.CSS.button]);
    return e.innerHTML = this.config.buttonContent ?? `${ha} ${this.api.i18n.t("Select an Image")}`, e.addEventListener("click", () => {
      this.onSelectFile();
    }), e;
  }
  /**
   * Changes UI status
   * @param status - see {@link Ui.status} constants
   */
  toggleStatus(e) {
    for (const t in Nt)
      Object.prototype.hasOwnProperty.call(Nt, t) && this.nodes.wrapper.classList.toggle(`${this.CSS.wrapper}--${Nt[t]}`, e === Nt[t]);
  }
}
function Gp(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var pa = { exports: {} };
(function(n, e) {
  (function(t, o) {
    n.exports = o();
  })(window, function() {
    return function(t) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = o, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, (function(c) {
              return r[c];
            }).bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "", i(i.s = 3);
    }([function(t, o) {
      var i;
      i = /* @__PURE__ */ function() {
        return this;
      }();
      try {
        i = i || new Function("return this")();
      } catch {
        typeof window == "object" && (i = window);
      }
      t.exports = i;
    }, function(t, o, i) {
      (function(r) {
        var s = i(2), a = setTimeout;
        function l() {
        }
        function c(b) {
          if (!(this instanceof c))
            throw new TypeError("Promises must be constructed via new");
          if (typeof b != "function")
            throw new TypeError("not a function");
          this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], g(b, this);
        }
        function d(b, I) {
          for (; b._state === 3; )
            b = b._value;
          b._state !== 0 ? (b._handled = !0, c._immediateFn(function() {
            var B = b._state === 1 ? I.onFulfilled : I.onRejected;
            if (B !== null) {
              var D;
              try {
                D = B(b._value);
              } catch (P) {
                return void p(I.promise, P);
              }
              u(I.promise, D);
            } else
              (b._state === 1 ? u : p)(I.promise, b._value);
          })) : b._deferreds.push(I);
        }
        function u(b, I) {
          try {
            if (I === b)
              throw new TypeError("A promise cannot be resolved with itself.");
            if (I && (typeof I == "object" || typeof I == "function")) {
              var B = I.then;
              if (I instanceof c)
                return b._state = 3, b._value = I, void y(b);
              if (typeof B == "function")
                return void g((D = B, P = I, function() {
                  D.apply(P, arguments);
                }), b);
            }
            b._state = 1, b._value = I, y(b);
          } catch (_) {
            p(b, _);
          }
          var D, P;
        }
        function p(b, I) {
          b._state = 2, b._value = I, y(b);
        }
        function y(b) {
          b._state === 2 && b._deferreds.length === 0 && c._immediateFn(function() {
            b._handled || c._unhandledRejectionFn(b._value);
          });
          for (var I = 0, B = b._deferreds.length; I < B; I++)
            d(b, b._deferreds[I]);
          b._deferreds = null;
        }
        function v(b, I, B) {
          this.onFulfilled = typeof b == "function" ? b : null, this.onRejected = typeof I == "function" ? I : null, this.promise = B;
        }
        function g(b, I) {
          var B = !1;
          try {
            b(function(D) {
              B || (B = !0, u(I, D));
            }, function(D) {
              B || (B = !0, p(I, D));
            });
          } catch (D) {
            if (B)
              return;
            B = !0, p(I, D);
          }
        }
        c.prototype.catch = function(b) {
          return this.then(null, b);
        }, c.prototype.then = function(b, I) {
          var B = new this.constructor(l);
          return d(this, new v(b, I, B)), B;
        }, c.prototype.finally = s.a, c.all = function(b) {
          return new c(function(I, B) {
            if (!b || b.length === void 0)
              throw new TypeError("Promise.all accepts an array");
            var D = Array.prototype.slice.call(b);
            if (D.length === 0)
              return I([]);
            var P = D.length;
            function _(te, M) {
              try {
                if (M && (typeof M == "object" || typeof M == "function")) {
                  var O = M.then;
                  if (typeof O == "function")
                    return void O.call(M, function(H) {
                      _(te, H);
                    }, B);
                }
                D[te] = M, --P == 0 && I(D);
              } catch (H) {
                B(H);
              }
            }
            for (var z = 0; z < D.length; z++)
              _(z, D[z]);
          });
        }, c.resolve = function(b) {
          return b && typeof b == "object" && b.constructor === c ? b : new c(function(I) {
            I(b);
          });
        }, c.reject = function(b) {
          return new c(function(I, B) {
            B(b);
          });
        }, c.race = function(b) {
          return new c(function(I, B) {
            for (var D = 0, P = b.length; D < P; D++)
              b[D].then(I, B);
          });
        }, c._immediateFn = typeof r == "function" && function(b) {
          r(b);
        } || function(b) {
          a(b, 0);
        }, c._unhandledRejectionFn = function(b) {
          typeof console < "u" && console && console.warn("Possible Unhandled Promise Rejection:", b);
        }, o.a = c;
      }).call(this, i(5).setImmediate);
    }, function(t, o, i) {
      o.a = function(r) {
        var s = this.constructor;
        return this.then(function(a) {
          return s.resolve(r()).then(function() {
            return a;
          });
        }, function(a) {
          return s.resolve(r()).then(function() {
            return s.reject(a);
          });
        });
      };
    }, function(t, o, i) {
      function r(g) {
        return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(b) {
          return typeof b;
        } : function(b) {
          return b && typeof Symbol == "function" && b.constructor === Symbol && b !== Symbol.prototype ? "symbol" : typeof b;
        })(g);
      }
      i(4);
      var s, a, l, c, d, u, p, y = i(8), v = (a = function(g) {
        return new Promise(function(b, I) {
          g = c(g), (g = d(g)).beforeSend && g.beforeSend();
          var B = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
          B.open(g.method, g.url), B.setRequestHeader("X-Requested-With", "XMLHttpRequest"), Object.keys(g.headers).forEach(function(P) {
            var _ = g.headers[P];
            B.setRequestHeader(P, _);
          });
          var D = g.ratio;
          B.upload.addEventListener("progress", function(P) {
            var _ = Math.round(P.loaded / P.total * 100), z = Math.ceil(_ * D / 100);
            g.progress(Math.min(z, 100));
          }, !1), B.addEventListener("progress", function(P) {
            var _ = Math.round(P.loaded / P.total * 100), z = Math.ceil(_ * (100 - D) / 100) + D;
            g.progress(Math.min(z, 100));
          }, !1), B.onreadystatechange = function() {
            if (B.readyState === 4) {
              var P = B.response;
              try {
                P = JSON.parse(P);
              } catch {
              }
              var _ = y.parseHeaders(B.getAllResponseHeaders()), z = { body: P, code: B.status, headers: _ };
              p(B.status) ? b(z) : I(z);
            }
          }, B.send(g.data);
        });
      }, l = function(g) {
        return g.method = "POST", a(g);
      }, c = function() {
        var g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        if (g.url && typeof g.url != "string")
          throw new Error("Url must be a string");
        if (g.url = g.url || "", g.method && typeof g.method != "string")
          throw new Error("`method` must be a string or null");
        if (g.method = g.method ? g.method.toUpperCase() : "GET", g.headers && r(g.headers) !== "object")
          throw new Error("`headers` must be an object or null");
        if (g.headers = g.headers || {}, g.type && (typeof g.type != "string" || !Object.values(s).includes(g.type)))
          throw new Error("`type` must be taken from module's «contentType» library");
        if (g.progress && typeof g.progress != "function")
          throw new Error("`progress` must be a function or null");
        if (g.progress = g.progress || function(b) {
        }, g.beforeSend = g.beforeSend || function(b) {
        }, g.ratio && typeof g.ratio != "number")
          throw new Error("`ratio` must be a number");
        if (g.ratio < 0 || g.ratio > 100)
          throw new Error("`ratio` must be in a 0-100 interval");
        if (g.ratio = g.ratio || 90, g.accept && typeof g.accept != "string")
          throw new Error("`accept` must be a string with a list of allowed mime-types");
        if (g.accept = g.accept || "*/*", g.multiple && typeof g.multiple != "boolean")
          throw new Error("`multiple` must be a true or false");
        if (g.multiple = g.multiple || !1, g.fieldName && typeof g.fieldName != "string")
          throw new Error("`fieldName` must be a string");
        return g.fieldName = g.fieldName || "files", g;
      }, d = function(g) {
        switch (g.method) {
          case "GET":
            var b = u(g.data, s.URLENCODED);
            delete g.data, g.url = /\?/.test(g.url) ? g.url + "&" + b : g.url + "?" + b;
            break;
          case "POST":
          case "PUT":
          case "DELETE":
          case "UPDATE":
            var I = function() {
              return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).type || s.JSON;
            }(g);
            (y.isFormData(g.data) || y.isFormElement(g.data)) && (I = s.FORM), g.data = u(g.data, I), I !== v.contentType.FORM && (g.headers["content-type"] = I);
        }
        return g;
      }, u = function() {
        var g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        switch (arguments.length > 1 ? arguments[1] : void 0) {
          case s.URLENCODED:
            return y.urlEncode(g);
          case s.JSON:
            return y.jsonEncode(g);
          case s.FORM:
            return y.formEncode(g);
          default:
            return g;
        }
      }, p = function(g) {
        return g >= 200 && g < 300;
      }, { contentType: s = { URLENCODED: "application/x-www-form-urlencoded; charset=utf-8", FORM: "multipart/form-data", JSON: "application/json; charset=utf-8" }, request: a, get: function(g) {
        return g.method = "GET", a(g);
      }, post: l, transport: function(g) {
        return g = c(g), y.selectFiles(g).then(function(b) {
          for (var I = new FormData(), B = 0; B < b.length; B++)
            I.append(g.fieldName, b[B], b[B].name);
          y.isObject(g.data) && Object.keys(g.data).forEach(function(P) {
            var _ = g.data[P];
            I.append(P, _);
          });
          var D = g.beforeSend;
          return g.beforeSend = function() {
            return D(b);
          }, g.data = I, l(g);
        });
      }, selectFiles: function(g) {
        return delete (g = c(g)).beforeSend, y.selectFiles(g);
      } });
      t.exports = v;
    }, function(t, o, i) {
      i.r(o);
      var r = i(1);
      window.Promise = window.Promise || r.a;
    }, function(t, o, i) {
      (function(r) {
        var s = r !== void 0 && r || typeof self < "u" && self || window, a = Function.prototype.apply;
        function l(c, d) {
          this._id = c, this._clearFn = d;
        }
        o.setTimeout = function() {
          return new l(a.call(setTimeout, s, arguments), clearTimeout);
        }, o.setInterval = function() {
          return new l(a.call(setInterval, s, arguments), clearInterval);
        }, o.clearTimeout = o.clearInterval = function(c) {
          c && c.close();
        }, l.prototype.unref = l.prototype.ref = function() {
        }, l.prototype.close = function() {
          this._clearFn.call(s, this._id);
        }, o.enroll = function(c, d) {
          clearTimeout(c._idleTimeoutId), c._idleTimeout = d;
        }, o.unenroll = function(c) {
          clearTimeout(c._idleTimeoutId), c._idleTimeout = -1;
        }, o._unrefActive = o.active = function(c) {
          clearTimeout(c._idleTimeoutId);
          var d = c._idleTimeout;
          d >= 0 && (c._idleTimeoutId = setTimeout(function() {
            c._onTimeout && c._onTimeout();
          }, d));
        }, i(6), o.setImmediate = typeof self < "u" && self.setImmediate || r !== void 0 && r.setImmediate || this && this.setImmediate, o.clearImmediate = typeof self < "u" && self.clearImmediate || r !== void 0 && r.clearImmediate || this && this.clearImmediate;
      }).call(this, i(0));
    }, function(t, o, i) {
      (function(r, s) {
        (function(a, l) {
          if (!a.setImmediate) {
            var c, d, u, p, y, v = 1, g = {}, b = !1, I = a.document, B = Object.getPrototypeOf && Object.getPrototypeOf(a);
            B = B && B.setTimeout ? B : a, {}.toString.call(a.process) === "[object process]" ? c = function(_) {
              s.nextTick(function() {
                P(_);
              });
            } : function() {
              if (a.postMessage && !a.importScripts) {
                var _ = !0, z = a.onmessage;
                return a.onmessage = function() {
                  _ = !1;
                }, a.postMessage("", "*"), a.onmessage = z, _;
              }
            }() ? (p = "setImmediate$" + Math.random() + "$", y = function(_) {
              _.source === a && typeof _.data == "string" && _.data.indexOf(p) === 0 && P(+_.data.slice(p.length));
            }, a.addEventListener ? a.addEventListener("message", y, !1) : a.attachEvent("onmessage", y), c = function(_) {
              a.postMessage(p + _, "*");
            }) : a.MessageChannel ? ((u = new MessageChannel()).port1.onmessage = function(_) {
              P(_.data);
            }, c = function(_) {
              u.port2.postMessage(_);
            }) : I && "onreadystatechange" in I.createElement("script") ? (d = I.documentElement, c = function(_) {
              var z = I.createElement("script");
              z.onreadystatechange = function() {
                P(_), z.onreadystatechange = null, d.removeChild(z), z = null;
              }, d.appendChild(z);
            }) : c = function(_) {
              setTimeout(P, 0, _);
            }, B.setImmediate = function(_) {
              typeof _ != "function" && (_ = new Function("" + _));
              for (var z = new Array(arguments.length - 1), te = 0; te < z.length; te++)
                z[te] = arguments[te + 1];
              var M = { callback: _, args: z };
              return g[v] = M, c(v), v++;
            }, B.clearImmediate = D;
          }
          function D(_) {
            delete g[_];
          }
          function P(_) {
            if (b)
              setTimeout(P, 0, _);
            else {
              var z = g[_];
              if (z) {
                b = !0;
                try {
                  (function(te) {
                    var M = te.callback, O = te.args;
                    switch (O.length) {
                      case 0:
                        M();
                        break;
                      case 1:
                        M(O[0]);
                        break;
                      case 2:
                        M(O[0], O[1]);
                        break;
                      case 3:
                        M(O[0], O[1], O[2]);
                        break;
                      default:
                        M.apply(l, O);
                    }
                  })(z);
                } finally {
                  D(_), b = !1;
                }
              }
            }
          }
        })(typeof self > "u" ? r === void 0 ? this : r : self);
      }).call(this, i(0), i(7));
    }, function(t, o) {
      var i, r, s = t.exports = {};
      function a() {
        throw new Error("setTimeout has not been defined");
      }
      function l() {
        throw new Error("clearTimeout has not been defined");
      }
      function c(B) {
        if (i === setTimeout)
          return setTimeout(B, 0);
        if ((i === a || !i) && setTimeout)
          return i = setTimeout, setTimeout(B, 0);
        try {
          return i(B, 0);
        } catch {
          try {
            return i.call(null, B, 0);
          } catch {
            return i.call(this, B, 0);
          }
        }
      }
      (function() {
        try {
          i = typeof setTimeout == "function" ? setTimeout : a;
        } catch {
          i = a;
        }
        try {
          r = typeof clearTimeout == "function" ? clearTimeout : l;
        } catch {
          r = l;
        }
      })();
      var d, u = [], p = !1, y = -1;
      function v() {
        p && d && (p = !1, d.length ? u = d.concat(u) : y = -1, u.length && g());
      }
      function g() {
        if (!p) {
          var B = c(v);
          p = !0;
          for (var D = u.length; D; ) {
            for (d = u, u = []; ++y < D; )
              d && d[y].run();
            y = -1, D = u.length;
          }
          d = null, p = !1, function(P) {
            if (r === clearTimeout)
              return clearTimeout(P);
            if ((r === l || !r) && clearTimeout)
              return r = clearTimeout, clearTimeout(P);
            try {
              r(P);
            } catch {
              try {
                return r.call(null, P);
              } catch {
                return r.call(this, P);
              }
            }
          }(B);
        }
      }
      function b(B, D) {
        this.fun = B, this.array = D;
      }
      function I() {
      }
      s.nextTick = function(B) {
        var D = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var P = 1; P < arguments.length; P++)
            D[P - 1] = arguments[P];
        u.push(new b(B, D)), u.length !== 1 || p || c(g);
      }, b.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = I, s.addListener = I, s.once = I, s.off = I, s.removeListener = I, s.removeAllListeners = I, s.emit = I, s.prependListener = I, s.prependOnceListener = I, s.listeners = function(B) {
        return [];
      }, s.binding = function(B) {
        throw new Error("process.binding is not supported");
      }, s.cwd = function() {
        return "/";
      }, s.chdir = function(B) {
        throw new Error("process.chdir is not supported");
      }, s.umask = function() {
        return 0;
      };
    }, function(t, o, i) {
      function r(a, l) {
        for (var c = 0; c < l.length; c++) {
          var d = l[c];
          d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
        }
      }
      var s = i(9);
      t.exports = function() {
        function a() {
          (function(u, p) {
            if (!(u instanceof p))
              throw new TypeError("Cannot call a class as a function");
          })(this, a);
        }
        var l, c, d;
        return l = a, d = [{ key: "urlEncode", value: function(u) {
          return s(u);
        } }, { key: "jsonEncode", value: function(u) {
          return JSON.stringify(u);
        } }, { key: "formEncode", value: function(u) {
          if (this.isFormData(u))
            return u;
          if (this.isFormElement(u))
            return new FormData(u);
          if (this.isObject(u)) {
            var p = new FormData();
            return Object.keys(u).forEach(function(y) {
              var v = u[y];
              p.append(y, v);
            }), p;
          }
          throw new Error("`data` must be an instance of Object, FormData or <FORM> HTMLElement");
        } }, { key: "isObject", value: function(u) {
          return Object.prototype.toString.call(u) === "[object Object]";
        } }, { key: "isFormData", value: function(u) {
          return u instanceof FormData;
        } }, { key: "isFormElement", value: function(u) {
          return u instanceof HTMLFormElement;
        } }, { key: "selectFiles", value: function() {
          var u = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          return new Promise(function(p, y) {
            var v = document.createElement("INPUT");
            v.type = "file", u.multiple && v.setAttribute("multiple", "multiple"), u.accept && v.setAttribute("accept", u.accept), v.style.display = "none", document.body.appendChild(v), v.addEventListener("change", function(g) {
              var b = g.target.files;
              p(b), document.body.removeChild(v);
            }, !1), v.click();
          });
        } }, { key: "parseHeaders", value: function(u) {
          var p = u.trim().split(/[\r\n]+/), y = {};
          return p.forEach(function(v) {
            var g = v.split(": "), b = g.shift(), I = g.join(": ");
            b && (y[b] = I);
          }), y;
        } }], (c = null) && r(l.prototype, c), d && r(l, d), a;
      }();
    }, function(t, o) {
      var i = function(s) {
        return encodeURIComponent(s).replace(/[!'()*]/g, escape).replace(/%20/g, "+");
      }, r = function(s, a, l, c) {
        return a = a || null, l = l || "&", c = c || null, s ? function(d) {
          for (var u = new Array(), p = 0; p < d.length; p++)
            d[p] && u.push(d[p]);
          return u;
        }(Object.keys(s).map(function(d) {
          var u, p, y = d;
          if (c && (y = c + "[" + y + "]"), typeof s[d] == "object" && s[d] !== null)
            u = r(s[d], null, l, y);
          else {
            a && (p = y, y = !isNaN(parseFloat(p)) && isFinite(p) ? a + Number(y) : y);
            var v = s[d];
            v = (v = (v = (v = v === !0 ? "1" : v) === !1 ? "0" : v) === 0 ? "0" : v) || "", u = i(y) + "=" + i(v);
          }
          return u;
        })).join(l).replace(/[!'()*]/g, "") : "";
      };
      t.exports = r;
    }]);
  });
})(pa);
var Jp = pa.exports;
const gt = /* @__PURE__ */ Gp(Jp);
function on(n) {
  return n !== void 0 && typeof n.then == "function";
}
class Qp {
  /**
   * @param params - uploader module params
   * @param params.config - image tool config
   * @param params.onUpload - one callback for all uploading (file, url, d-n-d, pasting)
   * @param params.onError - callback for uploading errors
   */
  constructor({ config: e, onUpload: t, onError: o }) {
    this.config = e, this.onUpload = t, this.onError = o;
  }
  /**
   * Handle clicks on the upload file button
   * Fires ajax.transport()
   * @param onPreview - callback fired when preview is ready
   */
  uploadSelectedFile({ onPreview: e }) {
    const t = function(i) {
      const r = new FileReader();
      r.readAsDataURL(i), r.onload = (s) => {
        e(s.target.result);
      };
    };
    let o;
    if (this.config.uploader && typeof this.config.uploader.uploadByFile == "function") {
      const i = this.config.uploader.uploadByFile;
      o = gt.selectFiles({ accept: this.config.types ?? "image/*" }).then((r) => {
        t(r[0]);
        const s = i(r[0]);
        return on(s) || console.warn("Custom uploader method uploadByFile should return a Promise"), s;
      });
    } else
      o = gt.transport({
        url: this.config.endpoints.byFile,
        data: this.config.additionalRequestData,
        accept: this.config.types ?? "image/*",
        headers: this.config.additionalRequestHeaders,
        beforeSend: (i) => {
          t(i[0]);
        },
        fieldName: this.config.field ?? "image"
      }).then((i) => i.body);
    o.then((i) => {
      this.onUpload(i);
    }).catch((i) => {
      this.onError(i);
    });
  }
  /**
   * Handle clicks on the upload file button
   * Fires ajax.post()
   * @param url - image source url
   */
  uploadByUrl(e) {
    let t;
    this.config.uploader && typeof this.config.uploader.uploadByUrl == "function" ? (t = this.config.uploader.uploadByUrl(e), on(t) || console.warn("Custom uploader method uploadByUrl should return a Promise")) : t = gt.post({
      url: this.config.endpoints.byUrl,
      data: Object.assign({
        url: e
      }, this.config.additionalRequestData),
      type: gt.contentType.JSON,
      headers: this.config.additionalRequestHeaders
    }).then((o) => o.body), t.then((o) => {
      this.onUpload(o);
    }).catch((o) => {
      this.onError(o);
    });
  }
  /**
   * Handle clicks on the upload file button
   * Fires ajax.post()
   * @param file - file pasted by drag-n-drop
   * @param onPreview - file pasted by drag-n-drop
   */
  uploadByFile(e, { onPreview: t }) {
    const o = new FileReader();
    o.readAsDataURL(e), o.onload = (r) => {
      t(r.target.result);
    };
    let i;
    if (this.config.uploader && typeof this.config.uploader.uploadByFile == "function")
      i = this.config.uploader.uploadByFile(e), on(i) || console.warn("Custom uploader method uploadByFile should return a Promise");
    else {
      const r = new FormData();
      r.append(this.config.field ?? "image", e), this.config.additionalRequestData && Object.keys(this.config.additionalRequestData).length && Object.entries(this.config.additionalRequestData).forEach(([s, a]) => {
        r.append(s, a);
      }), i = gt.post({
        url: this.config.endpoints.byFile,
        data: r,
        type: gt.contentType.JSON,
        headers: this.config.additionalRequestHeaders
      }).then((s) => s.body);
    }
    i.then((r) => {
      this.onUpload(r);
    }).catch((r) => {
      this.onError(r);
    });
  }
}
/**
 * Image Tool for the Editor.js
 * @author CodeX <team@codex.so>
 * @license MIT
 * @see {@link https://github.com/editor-js/image}
 *
 * To developers.
 * To simplify Tool structure, we split it to 4 parts:
 *  1) index.ts — main Tool's interface, public API and methods for working with data
 *  2) uploader.ts — module that has methods for sending files via AJAX: from device, by URL or File pasting
 *  3) ui.ts — module for UI manipulations: render, showing preloader, etc
 *  4) tunes.js — working with Block Tunes: render buttons, handle clicks
 *
 * For debug purposes there is a testing server
 * that can save uploaded files and return a Response {@link UploadResponseFormat}
 *
 *       $ node dev/server.js
 *
 * It will expose 8008 port, so you can pass http://localhost:8008 with the Tools config:
 *
 * image: {
 *   class: ImageTool,
 *   config: {
 *     endpoints: {
 *       byFile: 'http://localhost:8008/uploadFile',
 *       byUrl: 'http://localhost:8008/fetchUrl',
 *     }
 *   },
 * },
 */
class yi {
  /**
   * @param tool - tool properties got from editor.js
   * @param tool.data - previously saved data
   * @param tool.config - user config for Tool
   * @param tool.api - Editor.js API
   * @param tool.readOnly - read-only mode flag
   * @param tool.block - current Block API
   */
  constructor({ data: e, config: t, api: o, readOnly: i, block: r }) {
    this.api = o, this.readOnly = i, this.block = r, this.config = {
      endpoints: t.endpoints,
      additionalRequestData: t.additionalRequestData,
      additionalRequestHeaders: t.additionalRequestHeaders,
      field: t.field,
      types: t.types,
      captionPlaceholder: this.api.i18n.t(t.captionPlaceholder ?? "Caption"),
      buttonContent: t.buttonContent,
      uploader: t.uploader,
      actions: t.actions
    }, this.uploader = new Qp({
      config: this.config,
      onUpload: (s) => this.onUpload(s),
      onError: (s) => this.uploadingFailed(s)
    }), this.ui = new Zp({
      api: o,
      config: this.config,
      onSelectFile: () => {
        this.uploader.uploadSelectedFile({
          onPreview: (s) => {
            this.ui.showPreloader(s);
          }
        });
      },
      readOnly: i
    }), this._data = {
      caption: "",
      withBorder: !1,
      withBackground: !1,
      stretched: !1,
      file: {
        url: ""
      }
    }, this.data = e;
  }
  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   */
  static get toolbox() {
    return {
      icon: ha,
      title: "Image"
    };
  }
  /**
   * Available image tools
   */
  static get tunes() {
    return [
      {
        name: "withBorder",
        icon: Xp,
        title: "With border",
        toggle: !0
      },
      {
        name: "stretched",
        icon: Kp,
        title: "Stretch image",
        toggle: !0
      },
      {
        name: "withBackground",
        icon: Yp,
        title: "With background",
        toggle: !0
      }
    ];
  }
  /**
   * Renders Block content
   */
  render() {
    return this.ui.render(this.data);
  }
  /**
   * Validate data: check if Image exists
   * @param savedData — data received after saving
   * @returns false if saved data is not correct, otherwise true
   */
  validate(e) {
    return !!e.file.url;
  }
  /**
   * Return Block data
   */
  save() {
    const e = this.ui.nodes.caption;
    return this._data.caption = e.innerHTML, this.data;
  }
  /**
   * Fires after clicks on the Toolbox Image Icon
   * Initiates click on the Select File button
   */
  appendCallback() {
    this.ui.nodes.fileButton.click();
  }
  /**
   * Specify paste substitutes
   * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
   */
  static get pasteConfig() {
    return {
      /**
       * Paste HTML into Editor
       */
      tags: [
        {
          img: { src: !0 }
        }
      ],
      /**
       * Paste URL of image into the Editor
       */
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|svg|webp)(\?[a-z0-9=]*)?$/i
      },
      /**
       * Drag n drop file from into the Editor
       */
      files: {
        mimeTypes: ["image/*"]
      }
    };
  }
  /**
   * Specify paste handlers
   * @see {@link https://github.com/codex-team/editor.js/blob/master/docs/tools.md#paste-handling}
   * @param event - editor.js custom paste event
   *                              {@link https://github.com/codex-team/editor.js/blob/master/types/tools/paste-events.d.ts}
   */
  async onPaste(e) {
    switch (e.type) {
      case "tag": {
        const t = e.detail.data;
        if (/^blob:/.test(t.src)) {
          const o = await (await fetch(t.src)).blob();
          this.uploadFile(o);
          break;
        }
        this.uploadUrl(t.src);
        break;
      }
      case "pattern": {
        const t = e.detail.data;
        this.uploadUrl(t);
        break;
      }
      case "file": {
        const t = e.detail.file;
        this.uploadFile(t);
        break;
      }
    }
  }
  /**
   * Private methods
   * ̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿
   */
  /**
   * Stores all Tool's data
   * @param data - data in Image Tool format
   */
  set data(e) {
    this.image = e.file, this._data.caption = e.caption || "", this.ui.fillCaption(this._data.caption), yi.tunes.forEach(({ name: t }) => {
      const o = typeof e[t] < "u" ? e[t] === !0 || e[t] === "true" : !1;
      this.setTune(t, o);
    });
  }
  /**
   * Return Tool data
   */
  get data() {
    return this._data;
  }
  /**
   * Set new image file
   * @param file - uploaded file data
   */
  set image(e) {
    this._data.file = e || { url: "" }, e && e.url && this.ui.fillImage(e.url);
  }
  /**
   * File uploading callback
   * @param response - uploading server response
   */
  onUpload(e) {
    e.success && e.file ? this.image = e.file : this.uploadingFailed("incorrect response: " + JSON.stringify(e));
  }
  /**
   * Handle uploader errors
   * @param errorText - uploading error info
   */
  uploadingFailed(e) {
    console.log("Image Tool: uploading failed because of", e), this.api.notifier.show({
      message: this.api.i18n.t("Couldn’t upload image. Please try another."),
      style: "error"
    }), this.ui.hidePreloader();
  }
  /**
   * Callback fired when Block Tune is activated
   * @param tuneName - tune that has been clicked
   */
  tuneToggled(e) {
    this.setTune(e, !this._data[e]);
  }
  /**
   * Set one tune
   * @param tuneName - {@link Tunes.tunes}
   * @param value - tune state
   */
  setTune(e, t) {
    this._data[e] = t, this.ui.applyTune(e, t), e === "stretched" && Promise.resolve().then(() => {
      this.block.stretched = t;
    }).catch((o) => {
      console.error(o);
    });
  }
  /**
   * Show preloader and upload image file
   * @param file - file that is currently uploading (from paste)
   */
  uploadFile(e) {
    this.uploader.uploadByFile(e, {
      onPreview: (t) => {
        this.ui.showPreloader(t);
      }
    });
  }
  /**
   * Show preloader and upload image by target url
   * @param url - url pasted
   */
  uploadUrl(e) {
    this.ui.showPreloader(e), this.uploader.uploadByUrl(e);
  }
}
class ef extends yi {
  constructor(t) {
    var o, i;
    super(t);
    Re(this, "hd");
    (i = (o = t.data) == null ? void 0 : o.file) != null && i.hd && (this.hd = t.data.file.hd);
  }
  onUpload(t) {
    var o;
    super.onUpload(t), t.success && ((o = t.file) != null && o.hd) && (this.hd = t.file.hd, this.ui.nodes.imageEl.setAttribute("data-hd", this.hd));
  }
  save() {
    const t = super.save();
    return t.file && this.hd && (t.file.hd = this.hd), t;
  }
  render() {
    return this.hd && this.ui.nodes.imageEl.setAttribute("data-hd", this.hd), super.render();
  }
  set image(t) {
    super.image = t, this.ui.nodes.imageEl && !this.ui.nodes.imageEl.ondblclick && typeof FsLightbox < "u" && (this.ui.nodes.imageEl.ondblclick = (o) => {
      const i = o.target, r = i.getAttribute("data-hd") ?? i.src;
      var s = new FsLightbox();
      s.props.sources = [r], s.open();
    });
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".ce-code__textarea{min-height:200px;font-family:Menlo,Monaco,Consolas,Courier New,monospace;color:#41314e;line-height:1.6em;font-size:12px;background:#f8f7fa;border:1px solid #f1f1f4;box-shadow:none;white-space:pre;word-wrap:normal;overflow-x:auto;resize:vertical}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
function tf(n, e) {
  let t = "";
  for (; t !== `
` && e > 0; )
    e = e - 1, t = n.substr(e, 1);
  return t === `
` && (e += 1), e;
}
const of = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8L5 12L9 16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8L19 12L15 16"/></svg>';
/**
 * CodeTool for Editor.js
 * @version 2.0.0
 * @license MIT
 */
class wi {
  /**
   * Notify core that read-only mode is supported
   * @returns true if read-only mode is supported
   */
  static get isReadOnlySupported() {
    return !0;
  }
  /**
   * Allows pressing Enter key to create line breaks inside the CodeTool textarea
   * This enables multi-line input within the code editor.
   * @returns true if line breaks are allowed in the textarea
   */
  static get enableLineBreaks() {
    return !0;
  }
  /**
   * Render plugin`s main Element and fill it with saved data
   * @param options - tool constricting options
   * @param options.data — previously saved plugin code
   * @param options.config - user config for Tool
   * @param options.api - Editor.js API
   * @param options.readOnly - read only mode flag
   */
  constructor({ data: e, config: t, api: o, readOnly: i }) {
    this.api = o, this.readOnly = i, this.placeholder = this.api.i18n.t(t.placeholder || wi.DEFAULT_PLACEHOLDER), this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: "ce-code",
      textarea: "ce-code__textarea"
    }, this.nodes = {
      holder: null,
      textarea: null
    }, this.data = {
      code: e.code ?? ""
    }, this.nodes.holder = this.drawView();
  }
  /**
   * Return Tool's view
   * @returns this.nodes.holder - Code's wrapper
   */
  render() {
    return this.nodes.holder;
  }
  /**
   * Extract Tool's data from the view
   * @param codeWrapper - CodeTool's wrapper, containing textarea with code
   * @returns - saved plugin code
   */
  save(e) {
    return {
      code: e.querySelector("textarea").value
    };
  }
  /**
   * onPaste callback fired from Editor`s core
   * @param event - event with pasted content
   */
  onPaste(e) {
    const t = e.detail;
    if ("data" in t) {
      const o = t.data;
      this.data = {
        code: o || ""
      };
    }
  }
  /**
   * Returns Tool`s data from private property
   * @returns
   */
  get data() {
    return this._data;
  }
  /**
   * Set Tool`s data to private property and update view
   * @param data - saved tool data
   */
  set data(e) {
    this._data = e, this.nodes.textarea && (this.nodes.textarea.textContent = e.code);
  }
  /**
   * Get Tool toolbox settings.
   * Provides the icon and title to display in the toolbox for the CodeTool.
   * @returns An object containing:
   * - icon: SVG representation of the Tool's icon
   * - title: Title to show in the toolbox
   */
  static get toolbox() {
    return {
      icon: of,
      title: "Code"
    };
  }
  /**
   * Default placeholder for CodeTool's textarea
   * @returns
   */
  static get DEFAULT_PLACEHOLDER() {
    return "Enter a code";
  }
  /**
   *  Used by Editor.js paste handling API.
   *  Provides configuration to handle CODE tag.
   * @returns
   */
  static get pasteConfig() {
    return {
      tags: ["pre"]
    };
  }
  /**
   * Automatic sanitize config
   * @returns
   */
  static get sanitize() {
    return {
      code: !0
      // Allow HTML tags
    };
  }
  /**
   * Handles Tab key pressing (adds/removes indentations)
   * @param event - keydown
   */
  tabHandler(e) {
    e.stopPropagation(), e.preventDefault();
    const t = e.target, o = e.shiftKey, i = t.selectionStart, r = t.value, s = "  ";
    let a;
    if (!o)
      a = i + s.length, t.value = r.substring(0, i) + s + r.substring(i);
    else {
      const l = tf(r, i);
      if (r.substr(l, s.length) !== s)
        return;
      t.value = r.substring(0, l) + r.substring(l + s.length), a = i - s.length;
    }
    t.setSelectionRange(a, a);
  }
  /**
   * Create Tool's view
   * @returns
   */
  drawView() {
    const e = document.createElement("div"), t = document.createElement("textarea");
    return e.classList.add(this.CSS.baseClass, this.CSS.wrapper), t.classList.add(this.CSS.textarea, this.CSS.input), t.textContent = this.data.code, t.placeholder = this.placeholder, this.readOnly && (t.disabled = !0), e.appendChild(t), t.addEventListener("keydown", (o) => {
      switch (o.code) {
        case "Tab":
          this.tabHandler(o);
          break;
      }
    }), this.nodes.textarea = t, e;
  }
}
var ki = "1.13.7", Fr = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {}, _o = Array.prototype, xi = Object.prototype, jr = typeof Symbol < "u" ? Symbol.prototype : null, nf = _o.push, Jt = _o.slice, Ut = xi.toString, rf = xi.hasOwnProperty, fa = typeof ArrayBuffer < "u", sf = typeof DataView < "u", af = Array.isArray, zr = Object.keys, $r = Object.create, Ur = fa && ArrayBuffer.isView, lf = isNaN, cf = isFinite, ga = !{ toString: null }.propertyIsEnumerable("toString"), Vr = [
  "valueOf",
  "isPrototypeOf",
  "toString",
  "propertyIsEnumerable",
  "hasOwnProperty",
  "toLocaleString"
], df = Math.pow(2, 53) - 1;
function be(n, e) {
  return e = e == null ? n.length - 1 : +e, function() {
    for (var t = Math.max(arguments.length - e, 0), o = Array(t), i = 0; i < t; i++)
      o[i] = arguments[i + e];
    switch (e) {
      case 0:
        return n.call(this, o);
      case 1:
        return n.call(this, arguments[0], o);
      case 2:
        return n.call(this, arguments[0], arguments[1], o);
    }
    var r = Array(e + 1);
    for (i = 0; i < e; i++)
      r[i] = arguments[i];
    return r[e] = o, n.apply(this, r);
  };
}
function Ge(n) {
  var e = typeof n;
  return e === "function" || e === "object" && !!n;
}
function ma(n) {
  return n === null;
}
function Ci(n) {
  return n === void 0;
}
function Ei(n) {
  return n === !0 || n === !1 || Ut.call(n) === "[object Boolean]";
}
function va(n) {
  return !!(n && n.nodeType === 1);
}
function pe(n) {
  var e = "[object " + n + "]";
  return function(t) {
    return Ut.call(t) === e;
  };
}
const No = pe("String"), Ti = pe("Number"), ba = pe("Date"), ya = pe("RegExp"), wa = pe("Error"), Si = pe("Symbol"), Bi = pe("ArrayBuffer");
var ka = pe("Function"), uf = Fr.document && Fr.document.childNodes;
typeof /./ != "function" && typeof Int8Array != "object" && typeof uf != "function" && (ka = function(n) {
  return typeof n == "function" || !1;
});
const he = ka, xa = pe("Object");
var Ca = sf && (!/\[native code\]/.test(String(DataView)) || xa(new DataView(new ArrayBuffer(8)))), Ii = typeof Map < "u" && xa(/* @__PURE__ */ new Map()), hf = pe("DataView");
function pf(n) {
  return n != null && he(n.getInt8) && Bi(n.buffer);
}
const Vt = Ca ? pf : hf, Je = af || pe("Array");
function Qe(n, e) {
  return n != null && rf.call(n, e);
}
var gn = pe("Arguments");
(function() {
  gn(arguments) || (gn = function(n) {
    return Qe(n, "callee");
  });
})();
const Po = gn;
function Ea(n) {
  return !Si(n) && cf(n) && !isNaN(parseFloat(n));
}
function Li(n) {
  return Ti(n) && lf(n);
}
function Oi(n) {
  return function() {
    return n;
  };
}
function Ta(n) {
  return function(e) {
    var t = n(e);
    return typeof t == "number" && t >= 0 && t <= df;
  };
}
function Sa(n) {
  return function(e) {
    return e == null ? void 0 : e[n];
  };
}
const yo = Sa("byteLength"), ff = Ta(yo);
var gf = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
function mf(n) {
  return Ur ? Ur(n) && !Vt(n) : ff(n) && gf.test(Ut.call(n));
}
const Mi = fa ? mf : Oi(!1), ye = Sa("length");
function vf(n) {
  for (var e = {}, t = n.length, o = 0; o < t; ++o)
    e[n[o]] = !0;
  return {
    contains: function(i) {
      return e[i] === !0;
    },
    push: function(i) {
      return e[i] = !0, n.push(i);
    }
  };
}
function Ba(n, e) {
  e = vf(e);
  var t = Vr.length, o = n.constructor, i = he(o) && o.prototype || xi, r = "constructor";
  for (Qe(n, r) && !e.contains(r) && e.push(r); t--; )
    r = Vr[t], r in n && n[r] !== i[r] && !e.contains(r) && e.push(r);
}
function ae(n) {
  if (!Ge(n))
    return [];
  if (zr)
    return zr(n);
  var e = [];
  for (var t in n)
    Qe(n, t) && e.push(t);
  return ga && Ba(n, e), e;
}
function Ia(n) {
  if (n == null)
    return !0;
  var e = ye(n);
  return typeof e == "number" && (Je(n) || No(n) || Po(n)) ? e === 0 : ye(ae(n)) === 0;
}
function Ai(n, e) {
  var t = ae(e), o = t.length;
  if (n == null)
    return !o;
  for (var i = Object(n), r = 0; r < o; r++) {
    var s = t[r];
    if (e[s] !== i[s] || !(s in i))
      return !1;
  }
  return !0;
}
function K(n) {
  if (n instanceof K)
    return n;
  if (!(this instanceof K))
    return new K(n);
  this._wrapped = n;
}
K.VERSION = ki;
K.prototype.value = function() {
  return this._wrapped;
};
K.prototype.valueOf = K.prototype.toJSON = K.prototype.value;
K.prototype.toString = function() {
  return String(this._wrapped);
};
function qr(n) {
  return new Uint8Array(
    n.buffer || n,
    n.byteOffset || 0,
    yo(n)
  );
}
var Wr = "[object DataView]";
function mn(n, e, t, o) {
  if (n === e)
    return n !== 0 || 1 / n === 1 / e;
  if (n == null || e == null)
    return !1;
  if (n !== n)
    return e !== e;
  var i = typeof n;
  return i !== "function" && i !== "object" && typeof e != "object" ? !1 : La(n, e, t, o);
}
function La(n, e, t, o) {
  n instanceof K && (n = n._wrapped), e instanceof K && (e = e._wrapped);
  var i = Ut.call(n);
  if (i !== Ut.call(e))
    return !1;
  if (Ca && i == "[object Object]" && Vt(n)) {
    if (!Vt(e))
      return !1;
    i = Wr;
  }
  switch (i) {
    case "[object RegExp]":
    case "[object String]":
      return "" + n == "" + e;
    case "[object Number]":
      return +n != +n ? +e != +e : +n == 0 ? 1 / +n === 1 / e : +n == +e;
    case "[object Date]":
    case "[object Boolean]":
      return +n == +e;
    case "[object Symbol]":
      return jr.valueOf.call(n) === jr.valueOf.call(e);
    case "[object ArrayBuffer]":
    case Wr:
      return La(qr(n), qr(e), t, o);
  }
  var r = i === "[object Array]";
  if (!r && Mi(n)) {
    var s = yo(n);
    if (s !== yo(e))
      return !1;
    if (n.buffer === e.buffer && n.byteOffset === e.byteOffset)
      return !0;
    r = !0;
  }
  if (!r) {
    if (typeof n != "object" || typeof e != "object")
      return !1;
    var a = n.constructor, l = e.constructor;
    if (a !== l && !(he(a) && a instanceof a && he(l) && l instanceof l) && "constructor" in n && "constructor" in e)
      return !1;
  }
  t = t || [], o = o || [];
  for (var c = t.length; c--; )
    if (t[c] === n)
      return o[c] === e;
  if (t.push(n), o.push(e), r) {
    if (c = n.length, c !== e.length)
      return !1;
    for (; c--; )
      if (!mn(n[c], e[c], t, o))
        return !1;
  } else {
    var d = ae(n), u;
    if (c = d.length, ae(e).length !== c)
      return !1;
    for (; c--; )
      if (u = d[c], !(Qe(e, u) && mn(n[u], e[u], t, o)))
        return !1;
  }
  return t.pop(), o.pop(), !0;
}
function Oa(n, e) {
  return mn(n, e);
}
function St(n) {
  if (!Ge(n))
    return [];
  var e = [];
  for (var t in n)
    e.push(t);
  return ga && Ba(n, e), e;
}
function _i(n) {
  var e = ye(n);
  return function(t) {
    if (t == null)
      return !1;
    var o = St(t);
    if (ye(o))
      return !1;
    for (var i = 0; i < e; i++)
      if (!he(t[n[i]]))
        return !1;
    return n !== _a || !he(t[Ni]);
  };
}
var Ni = "forEach", Ma = "has", Pi = ["clear", "delete"], Aa = ["get", Ma, "set"], bf = Pi.concat(Ni, Aa), _a = Pi.concat(Aa), yf = ["add"].concat(Pi, Ni, Ma);
const Na = Ii ? _i(bf) : pe("Map"), Pa = Ii ? _i(_a) : pe("WeakMap"), Da = Ii ? _i(yf) : pe("Set"), Ra = pe("WeakSet");
function ct(n) {
  for (var e = ae(n), t = e.length, o = Array(t), i = 0; i < t; i++)
    o[i] = n[e[i]];
  return o;
}
function Ha(n) {
  for (var e = ae(n), t = e.length, o = Array(t), i = 0; i < t; i++)
    o[i] = [e[i], n[e[i]]];
  return o;
}
function Di(n) {
  for (var e = {}, t = ae(n), o = 0, i = t.length; o < i; o++)
    e[n[t[o]]] = t[o];
  return e;
}
function qt(n) {
  var e = [];
  for (var t in n)
    he(n[t]) && e.push(t);
  return e.sort();
}
function Ri(n, e) {
  return function(t) {
    var o = arguments.length;
    if (e && (t = Object(t)), o < 2 || t == null)
      return t;
    for (var i = 1; i < o; i++)
      for (var r = arguments[i], s = n(r), a = s.length, l = 0; l < a; l++) {
        var c = s[l];
        (!e || t[c] === void 0) && (t[c] = r[c]);
      }
    return t;
  };
}
const Hi = Ri(St), xt = Ri(ae), Fi = Ri(St, !0);
function wf() {
  return function() {
  };
}
function Fa(n) {
  if (!Ge(n))
    return {};
  if ($r)
    return $r(n);
  var e = wf();
  e.prototype = n;
  var t = new e();
  return e.prototype = null, t;
}
function ja(n, e) {
  var t = Fa(n);
  return e && xt(t, e), t;
}
function za(n) {
  return Ge(n) ? Je(n) ? n.slice() : Hi({}, n) : n;
}
function $a(n, e) {
  return e(n), n;
}
function ji(n) {
  return Je(n) ? n : [n];
}
K.toPath = ji;
function Qt(n) {
  return K.toPath(n);
}
function zi(n, e) {
  for (var t = e.length, o = 0; o < t; o++) {
    if (n == null)
      return;
    n = n[e[o]];
  }
  return t ? n : void 0;
}
function $i(n, e, t) {
  var o = zi(n, Qt(e));
  return Ci(o) ? t : o;
}
function Ua(n, e) {
  e = Qt(e);
  for (var t = e.length, o = 0; o < t; o++) {
    var i = e[o];
    if (!Qe(n, i))
      return !1;
    n = n[i];
  }
  return !!t;
}
function Do(n) {
  return n;
}
function st(n) {
  return n = xt({}, n), function(e) {
    return Ai(e, n);
  };
}
function Ro(n) {
  return n = Qt(n), function(e) {
    return zi(e, n);
  };
}
function eo(n, e, t) {
  if (e === void 0)
    return n;
  switch (t ?? 3) {
    case 1:
      return function(o) {
        return n.call(e, o);
      };
    case 3:
      return function(o, i, r) {
        return n.call(e, o, i, r);
      };
    case 4:
      return function(o, i, r, s) {
        return n.call(e, o, i, r, s);
      };
  }
  return function() {
    return n.apply(e, arguments);
  };
}
function Va(n, e, t) {
  return n == null ? Do : he(n) ? eo(n, e, t) : Ge(n) && !Je(n) ? st(n) : Ro(n);
}
function Ho(n, e) {
  return Va(n, e, 1 / 0);
}
K.iteratee = Ho;
function we(n, e, t) {
  return K.iteratee !== Ho ? K.iteratee(n, e) : Va(n, e, t);
}
function qa(n, e, t) {
  e = we(e, t);
  for (var o = ae(n), i = o.length, r = {}, s = 0; s < i; s++) {
    var a = o[s];
    r[a] = e(n[a], a, n);
  }
  return r;
}
function Ui() {
}
function Wa(n) {
  return n == null ? Ui : function(e) {
    return $i(n, e);
  };
}
function Ya(n, e, t) {
  var o = Array(Math.max(0, n));
  e = eo(e, t, 1);
  for (var i = 0; i < n; i++)
    o[i] = e(i);
  return o;
}
function wo(n, e) {
  return e == null && (e = n, n = 0), n + Math.floor(Math.random() * (e - n + 1));
}
const Ct = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
};
function Xa(n) {
  var e = function(r) {
    return n[r];
  }, t = "(?:" + ae(n).join("|") + ")", o = RegExp(t), i = RegExp(t, "g");
  return function(r) {
    return r = r == null ? "" : "" + r, o.test(r) ? r.replace(i, e) : r;
  };
}
const Ka = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
}, Za = Xa(Ka), kf = Di(Ka), Ga = Xa(kf), Ja = K.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};
var nn = /(.)^/, xf = {
  "'": "'",
  "\\": "\\",
  "\r": "r",
  "\n": "n",
  "\u2028": "u2028",
  "\u2029": "u2029"
}, Cf = /\\|'|\r|\n|\u2028|\u2029/g;
function Ef(n) {
  return "\\" + xf[n];
}
var Tf = /^\s*(\w|\$)+\s*$/;
function Qa(n, e, t) {
  !e && t && (e = t), e = Fi({}, e, K.templateSettings);
  var o = RegExp([
    (e.escape || nn).source,
    (e.interpolate || nn).source,
    (e.evaluate || nn).source
  ].join("|") + "|$", "g"), i = 0, r = "__p+='";
  n.replace(o, function(c, d, u, p, y) {
    return r += n.slice(i, y).replace(Cf, Ef), i = y + c.length, d ? r += `'+
((__t=(` + d + `))==null?'':_.escape(__t))+
'` : u ? r += `'+
((__t=(` + u + `))==null?'':__t)+
'` : p && (r += `';
` + p + `
__p+='`), c;
  }), r += `';
`;
  var s = e.variable;
  if (s) {
    if (!Tf.test(s))
      throw new Error(
        "variable is not a bare identifier: " + s
      );
  } else
    r = `with(obj||{}){
` + r + `}
`, s = "obj";
  r = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` + r + `return __p;
`;
  var a;
  try {
    a = new Function(s, "_", r);
  } catch (c) {
    throw c.source = r, c;
  }
  var l = function(c) {
    return a.call(this, c, K);
  };
  return l.source = "function(" + s + `){
` + r + "}", l;
}
function el(n, e, t) {
  e = Qt(e);
  var o = e.length;
  if (!o)
    return he(t) ? t.call(n) : t;
  for (var i = 0; i < o; i++) {
    var r = n == null ? void 0 : n[e[i]];
    r === void 0 && (r = t, i = o), n = he(r) ? r.call(n) : r;
  }
  return n;
}
var Sf = 0;
function tl(n) {
  var e = ++Sf + "";
  return n ? n + e : e;
}
function ol(n) {
  var e = K(n);
  return e._chain = !0, e;
}
function nl(n, e, t, o, i) {
  if (!(o instanceof e))
    return n.apply(t, i);
  var r = Fa(n.prototype), s = n.apply(r, i);
  return Ge(s) ? s : r;
}
var dt = be(function(n, e) {
  var t = dt.placeholder, o = function() {
    for (var i = 0, r = e.length, s = Array(r), a = 0; a < r; a++)
      s[a] = e[a] === t ? arguments[i++] : e[a];
    for (; i < arguments.length; )
      s.push(arguments[i++]);
    return nl(n, o, this, this, s);
  };
  return o;
});
dt.placeholder = K;
const Vi = be(function(n, e, t) {
  if (!he(n))
    throw new TypeError("Bind must be called on a function");
  var o = be(function(i) {
    return nl(n, o, e, this, t.concat(i));
  });
  return o;
}), Be = Ta(ye);
function ut(n, e, t, o) {
  if (o = o || [], !e && e !== 0)
    e = 1 / 0;
  else if (e <= 0)
    return o.concat(n);
  for (var i = o.length, r = 0, s = ye(n); r < s; r++) {
    var a = n[r];
    if (Be(a) && (Je(a) || Po(a)))
      if (e > 1)
        ut(a, e - 1, t, o), i = o.length;
      else
        for (var l = 0, c = a.length; l < c; )
          o[i++] = a[l++];
    else
      t || (o[i++] = a);
  }
  return o;
}
const il = be(function(n, e) {
  e = ut(e, !1, !1);
  var t = e.length;
  if (t < 1)
    throw new Error("bindAll must be passed function names");
  for (; t--; ) {
    var o = e[t];
    n[o] = Vi(n[o], n);
  }
  return n;
});
function rl(n, e) {
  var t = function(o) {
    var i = t.cache, r = "" + (e ? e.apply(this, arguments) : o);
    return Qe(i, r) || (i[r] = n.apply(this, arguments)), i[r];
  };
  return t.cache = {}, t;
}
const qi = be(function(n, e, t) {
  return setTimeout(function() {
    return n.apply(null, t);
  }, e);
}), sl = dt(qi, K, 1);
function al(n, e, t) {
  var o, i, r, s, a = 0;
  t || (t = {});
  var l = function() {
    a = t.leading === !1 ? 0 : Ct(), o = null, s = n.apply(i, r), o || (i = r = null);
  }, c = function() {
    var d = Ct();
    !a && t.leading === !1 && (a = d);
    var u = e - (d - a);
    return i = this, r = arguments, u <= 0 || u > e ? (o && (clearTimeout(o), o = null), a = d, s = n.apply(i, r), o || (i = r = null)) : !o && t.trailing !== !1 && (o = setTimeout(l, u)), s;
  };
  return c.cancel = function() {
    clearTimeout(o), a = 0, o = i = r = null;
  }, c;
}
function ll(n, e, t) {
  var o, i, r, s, a, l = function() {
    var d = Ct() - i;
    e > d ? o = setTimeout(l, e - d) : (o = null, t || (s = n.apply(a, r)), o || (r = a = null));
  }, c = be(function(d) {
    return a = this, r = d, i = Ct(), o || (o = setTimeout(l, e), t && (s = n.apply(a, r))), s;
  });
  return c.cancel = function() {
    clearTimeout(o), o = r = a = null;
  }, c;
}
function cl(n, e) {
  return dt(e, n);
}
function Fo(n) {
  return function() {
    return !n.apply(this, arguments);
  };
}
function dl() {
  var n = arguments, e = n.length - 1;
  return function() {
    for (var t = e, o = n[e].apply(this, arguments); t--; )
      o = n[t].call(this, o);
    return o;
  };
}
function ul(n, e) {
  return function() {
    if (--n < 1)
      return e.apply(this, arguments);
  };
}
function Wi(n, e) {
  var t;
  return function() {
    return --n > 0 && (t = e.apply(this, arguments)), n <= 1 && (e = null), t;
  };
}
const hl = dt(Wi, 2);
function Yi(n, e, t) {
  e = we(e, t);
  for (var o = ae(n), i, r = 0, s = o.length; r < s; r++)
    if (i = o[r], e(n[i], i, n))
      return i;
}
function pl(n) {
  return function(e, t, o) {
    t = we(t, o);
    for (var i = ye(e), r = n > 0 ? 0 : i - 1; r >= 0 && r < i; r += n)
      if (t(e[r], r, e))
        return r;
    return -1;
  };
}
const jo = pl(1), Xi = pl(-1);
function Ki(n, e, t, o) {
  t = we(t, o, 1);
  for (var i = t(e), r = 0, s = ye(n); r < s; ) {
    var a = Math.floor((r + s) / 2);
    t(n[a]) < i ? r = a + 1 : s = a;
  }
  return r;
}
function fl(n, e, t) {
  return function(o, i, r) {
    var s = 0, a = ye(o);
    if (typeof r == "number")
      n > 0 ? s = r >= 0 ? r : Math.max(r + a, s) : a = r >= 0 ? Math.min(r + 1, a) : r + a + 1;
    else if (t && r && a)
      return r = t(o, i), o[r] === i ? r : -1;
    if (i !== i)
      return r = e(Jt.call(o, s, a), Li), r >= 0 ? r + s : -1;
    for (r = n > 0 ? s : a - 1; r >= 0 && r < a; r += n)
      if (o[r] === i)
        return r;
    return -1;
  };
}
const Zi = fl(1, jo, Ki), gl = fl(-1, Xi);
function Wt(n, e, t) {
  var o = Be(n) ? jo : Yi, i = o(n, e, t);
  if (i !== void 0 && i !== -1)
    return n[i];
}
function ml(n, e) {
  return Wt(n, st(e));
}
function Ae(n, e, t) {
  e = eo(e, t);
  var o, i;
  if (Be(n))
    for (o = 0, i = n.length; o < i; o++)
      e(n[o], o, n);
  else {
    var r = ae(n);
    for (o = 0, i = r.length; o < i; o++)
      e(n[r[o]], r[o], n);
  }
  return n;
}
function $e(n, e, t) {
  e = we(e, t);
  for (var o = !Be(n) && ae(n), i = (o || n).length, r = Array(i), s = 0; s < i; s++) {
    var a = o ? o[s] : s;
    r[s] = e(n[a], a, n);
  }
  return r;
}
function vl(n) {
  var e = function(t, o, i, r) {
    var s = !Be(t) && ae(t), a = (s || t).length, l = n > 0 ? 0 : a - 1;
    for (r || (i = t[s ? s[l] : l], l += n); l >= 0 && l < a; l += n) {
      var c = s ? s[l] : l;
      i = o(i, t[c], c, t);
    }
    return i;
  };
  return function(t, o, i, r) {
    var s = arguments.length >= 3;
    return e(t, eo(o, r, 4), i, s);
  };
}
const yt = vl(1), ko = vl(-1);
function Ke(n, e, t) {
  var o = [];
  return e = we(e, t), Ae(n, function(i, r, s) {
    e(i, r, s) && o.push(i);
  }), o;
}
function bl(n, e, t) {
  return Ke(n, Fo(we(e)), t);
}
function xo(n, e, t) {
  e = we(e, t);
  for (var o = !Be(n) && ae(n), i = (o || n).length, r = 0; r < i; r++) {
    var s = o ? o[r] : r;
    if (!e(n[s], s, n))
      return !1;
  }
  return !0;
}
function Co(n, e, t) {
  e = we(e, t);
  for (var o = !Be(n) && ae(n), i = (o || n).length, r = 0; r < i; r++) {
    var s = o ? o[r] : r;
    if (e(n[s], s, n))
      return !0;
  }
  return !1;
}
function Le(n, e, t, o) {
  return Be(n) || (n = ct(n)), (typeof t != "number" || o) && (t = 0), Zi(n, e, t) >= 0;
}
const yl = be(function(n, e, t) {
  var o, i;
  return he(e) ? i = e : (e = Qt(e), o = e.slice(0, -1), e = e[e.length - 1]), $e(n, function(r) {
    var s = i;
    if (!s) {
      if (o && o.length && (r = zi(r, o)), r == null)
        return;
      s = r[e];
    }
    return s == null ? s : s.apply(r, t);
  });
});
function zo(n, e) {
  return $e(n, Ro(e));
}
function wl(n, e) {
  return Ke(n, st(e));
}
function Gi(n, e, t) {
  var o = -1 / 0, i = -1 / 0, r, s;
  if (e == null || typeof e == "number" && typeof n[0] != "object" && n != null) {
    n = Be(n) ? n : ct(n);
    for (var a = 0, l = n.length; a < l; a++)
      r = n[a], r != null && r > o && (o = r);
  } else
    e = we(e, t), Ae(n, function(c, d, u) {
      s = e(c, d, u), (s > i || s === -1 / 0 && o === -1 / 0) && (o = c, i = s);
    });
  return o;
}
function kl(n, e, t) {
  var o = 1 / 0, i = 1 / 0, r, s;
  if (e == null || typeof e == "number" && typeof n[0] != "object" && n != null) {
    n = Be(n) ? n : ct(n);
    for (var a = 0, l = n.length; a < l; a++)
      r = n[a], r != null && r < o && (o = r);
  } else
    e = we(e, t), Ae(n, function(c, d, u) {
      s = e(c, d, u), (s < i || s === 1 / 0 && o === 1 / 0) && (o = c, i = s);
    });
  return o;
}
var Bf = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
function Ji(n) {
  return n ? Je(n) ? Jt.call(n) : No(n) ? n.match(Bf) : Be(n) ? $e(n, Do) : ct(n) : [];
}
function Qi(n, e, t) {
  if (e == null || t)
    return Be(n) || (n = ct(n)), n[wo(n.length - 1)];
  var o = Ji(n), i = ye(o);
  e = Math.max(Math.min(e, i), 0);
  for (var r = i - 1, s = 0; s < e; s++) {
    var a = wo(s, r), l = o[s];
    o[s] = o[a], o[a] = l;
  }
  return o.slice(0, e);
}
function xl(n) {
  return Qi(n, 1 / 0);
}
function Cl(n, e, t) {
  var o = 0;
  return e = we(e, t), zo($e(n, function(i, r, s) {
    return {
      value: i,
      index: o++,
      criteria: e(i, r, s)
    };
  }).sort(function(i, r) {
    var s = i.criteria, a = r.criteria;
    if (s !== a) {
      if (s > a || s === void 0)
        return 1;
      if (s < a || a === void 0)
        return -1;
    }
    return i.index - r.index;
  }), "value");
}
function $o(n, e) {
  return function(t, o, i) {
    var r = e ? [[], []] : {};
    return o = we(o, i), Ae(t, function(s, a) {
      var l = o(s, a, t);
      n(r, s, l);
    }), r;
  };
}
const El = $o(function(n, e, t) {
  Qe(n, t) ? n[t].push(e) : n[t] = [e];
}), Tl = $o(function(n, e, t) {
  n[t] = e;
}), Sl = $o(function(n, e, t) {
  Qe(n, t) ? n[t]++ : n[t] = 1;
}), Bl = $o(function(n, e, t) {
  n[t ? 0 : 1].push(e);
}, !0);
function Il(n) {
  return n == null ? 0 : Be(n) ? n.length : ae(n).length;
}
function If(n, e, t) {
  return e in t;
}
const er = be(function(n, e) {
  var t = {}, o = e[0];
  if (n == null)
    return t;
  he(o) ? (e.length > 1 && (o = eo(o, e[1])), e = St(n)) : (o = If, e = ut(e, !1, !1), n = Object(n));
  for (var i = 0, r = e.length; i < r; i++) {
    var s = e[i], a = n[s];
    o(a, s, n) && (t[s] = a);
  }
  return t;
}), Ll = be(function(n, e) {
  var t = e[0], o;
  return he(t) ? (t = Fo(t), e.length > 1 && (o = e[1])) : (e = $e(ut(e, !1, !1), String), t = function(i, r) {
    return !Le(e, r);
  }), er(n, t, o);
});
function tr(n, e, t) {
  return Jt.call(n, 0, Math.max(0, n.length - (e == null || t ? 1 : e)));
}
function wt(n, e, t) {
  return n == null || n.length < 1 ? e == null || t ? void 0 : [] : e == null || t ? n[0] : tr(n, n.length - e);
}
function nt(n, e, t) {
  return Jt.call(n, e == null || t ? 1 : e);
}
function Ol(n, e, t) {
  return n == null || n.length < 1 ? e == null || t ? void 0 : [] : e == null || t ? n[n.length - 1] : nt(n, Math.max(0, n.length - e));
}
function Ml(n) {
  return Ke(n, Boolean);
}
function Al(n, e) {
  return ut(n, e, !1);
}
const or = be(function(n, e) {
  return e = ut(e, !0, !0), Ke(n, function(t) {
    return !Le(e, t);
  });
}), _l = be(function(n, e) {
  return or(n, e);
});
function Yt(n, e, t, o) {
  Ei(e) || (o = t, t = e, e = !1), t != null && (t = we(t, o));
  for (var i = [], r = [], s = 0, a = ye(n); s < a; s++) {
    var l = n[s], c = t ? t(l, s, n) : l;
    e && !t ? ((!s || r !== c) && i.push(l), r = c) : t ? Le(r, c) || (r.push(c), i.push(l)) : Le(i, l) || i.push(l);
  }
  return i;
}
const Nl = be(function(n) {
  return Yt(ut(n, !0, !0));
});
function Pl(n) {
  for (var e = [], t = arguments.length, o = 0, i = ye(n); o < i; o++) {
    var r = n[o];
    if (!Le(e, r)) {
      var s;
      for (s = 1; s < t && Le(arguments[s], r); s++)
        ;
      s === t && e.push(r);
    }
  }
  return e;
}
function Xt(n) {
  for (var e = n && Gi(n, ye).length || 0, t = Array(e), o = 0; o < e; o++)
    t[o] = zo(n, o);
  return t;
}
const Dl = be(Xt);
function Rl(n, e) {
  for (var t = {}, o = 0, i = ye(n); o < i; o++)
    e ? t[n[o]] = e[o] : t[n[o][0]] = n[o][1];
  return t;
}
function Hl(n, e, t) {
  e == null && (e = n || 0, n = 0), t || (t = e < n ? -1 : 1);
  for (var o = Math.max(Math.ceil((e - n) / t), 0), i = Array(o), r = 0; r < o; r++, n += t)
    i[r] = n;
  return i;
}
function Fl(n, e) {
  if (e == null || e < 1)
    return [];
  for (var t = [], o = 0, i = n.length; o < i; )
    t.push(Jt.call(n, o, o += e));
  return t;
}
function nr(n, e) {
  return n._chain ? K(e).chain() : e;
}
function ir(n) {
  return Ae(qt(n), function(e) {
    var t = K[e] = n[e];
    K.prototype[e] = function() {
      var o = [this._wrapped];
      return nf.apply(o, arguments), nr(this, t.apply(K, o));
    };
  }), K;
}
Ae(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
  var e = _o[n];
  K.prototype[n] = function() {
    var t = this._wrapped;
    return t != null && (e.apply(t, arguments), (n === "shift" || n === "splice") && t.length === 0 && delete t[0]), nr(this, t);
  };
});
Ae(["concat", "join", "slice"], function(n) {
  var e = _o[n];
  K.prototype[n] = function() {
    var t = this._wrapped;
    return t != null && (t = e.apply(t, arguments)), nr(this, t);
  };
});
const Lf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: ki,
  after: ul,
  all: xo,
  allKeys: St,
  any: Co,
  assign: xt,
  before: Wi,
  bind: Vi,
  bindAll: il,
  chain: ol,
  chunk: Fl,
  clone: za,
  collect: $e,
  compact: Ml,
  compose: dl,
  constant: Oi,
  contains: Le,
  countBy: Sl,
  create: ja,
  debounce: ll,
  default: K,
  defaults: Fi,
  defer: sl,
  delay: qi,
  detect: Wt,
  difference: or,
  drop: nt,
  each: Ae,
  escape: Za,
  every: xo,
  extend: Hi,
  extendOwn: xt,
  filter: Ke,
  find: Wt,
  findIndex: jo,
  findKey: Yi,
  findLastIndex: Xi,
  findWhere: ml,
  first: wt,
  flatten: Al,
  foldl: yt,
  foldr: ko,
  forEach: Ae,
  functions: qt,
  get: $i,
  groupBy: El,
  has: Ua,
  head: wt,
  identity: Do,
  include: Le,
  includes: Le,
  indexBy: Tl,
  indexOf: Zi,
  initial: tr,
  inject: yt,
  intersection: Pl,
  invert: Di,
  invoke: yl,
  isArguments: Po,
  isArray: Je,
  isArrayBuffer: Bi,
  isBoolean: Ei,
  isDataView: Vt,
  isDate: ba,
  isElement: va,
  isEmpty: Ia,
  isEqual: Oa,
  isError: wa,
  isFinite: Ea,
  isFunction: he,
  isMap: Na,
  isMatch: Ai,
  isNaN: Li,
  isNull: ma,
  isNumber: Ti,
  isObject: Ge,
  isRegExp: ya,
  isSet: Da,
  isString: No,
  isSymbol: Si,
  isTypedArray: Mi,
  isUndefined: Ci,
  isWeakMap: Pa,
  isWeakSet: Ra,
  iteratee: Ho,
  keys: ae,
  last: Ol,
  lastIndexOf: gl,
  map: $e,
  mapObject: qa,
  matcher: st,
  matches: st,
  max: Gi,
  memoize: rl,
  methods: qt,
  min: kl,
  mixin: ir,
  negate: Fo,
  noop: Ui,
  now: Ct,
  object: Rl,
  omit: Ll,
  once: hl,
  pairs: Ha,
  partial: dt,
  partition: Bl,
  pick: er,
  pluck: zo,
  property: Ro,
  propertyOf: Wa,
  random: wo,
  range: Hl,
  reduce: yt,
  reduceRight: ko,
  reject: bl,
  rest: nt,
  restArguments: be,
  result: el,
  sample: Qi,
  select: Ke,
  shuffle: xl,
  size: Il,
  some: Co,
  sortBy: Cl,
  sortedIndex: Ki,
  tail: nt,
  take: wt,
  tap: $a,
  template: Qa,
  templateSettings: Ja,
  throttle: al,
  times: Ya,
  toArray: Ji,
  toPath: ji,
  transpose: Xt,
  unescape: Ga,
  union: Nl,
  uniq: Yt,
  unique: Yt,
  uniqueId: tl,
  unzip: Xt,
  values: ct,
  where: wl,
  without: _l,
  wrap: cl,
  zip: Dl
}, Symbol.toStringTag, { value: "Module" }));
var vn = ir(Lf);
vn._ = vn;
const Of = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VERSION: ki,
  after: ul,
  all: xo,
  allKeys: St,
  any: Co,
  assign: xt,
  before: Wi,
  bind: Vi,
  bindAll: il,
  chain: ol,
  chunk: Fl,
  clone: za,
  collect: $e,
  compact: Ml,
  compose: dl,
  constant: Oi,
  contains: Le,
  countBy: Sl,
  create: ja,
  debounce: ll,
  default: vn,
  defaults: Fi,
  defer: sl,
  delay: qi,
  detect: Wt,
  difference: or,
  drop: nt,
  each: Ae,
  escape: Za,
  every: xo,
  extend: Hi,
  extendOwn: xt,
  filter: Ke,
  find: Wt,
  findIndex: jo,
  findKey: Yi,
  findLastIndex: Xi,
  findWhere: ml,
  first: wt,
  flatten: Al,
  foldl: yt,
  foldr: ko,
  forEach: Ae,
  functions: qt,
  get: $i,
  groupBy: El,
  has: Ua,
  head: wt,
  identity: Do,
  include: Le,
  includes: Le,
  indexBy: Tl,
  indexOf: Zi,
  initial: tr,
  inject: yt,
  intersection: Pl,
  invert: Di,
  invoke: yl,
  isArguments: Po,
  isArray: Je,
  isArrayBuffer: Bi,
  isBoolean: Ei,
  isDataView: Vt,
  isDate: ba,
  isElement: va,
  isEmpty: Ia,
  isEqual: Oa,
  isError: wa,
  isFinite: Ea,
  isFunction: he,
  isMap: Na,
  isMatch: Ai,
  isNaN: Li,
  isNull: ma,
  isNumber: Ti,
  isObject: Ge,
  isRegExp: ya,
  isSet: Da,
  isString: No,
  isSymbol: Si,
  isTypedArray: Mi,
  isUndefined: Ci,
  isWeakMap: Pa,
  isWeakSet: Ra,
  iteratee: Ho,
  keys: ae,
  last: Ol,
  lastIndexOf: gl,
  map: $e,
  mapObject: qa,
  matcher: st,
  matches: st,
  max: Gi,
  memoize: rl,
  methods: qt,
  min: kl,
  mixin: ir,
  negate: Fo,
  noop: Ui,
  now: Ct,
  object: Rl,
  omit: Ll,
  once: hl,
  pairs: Ha,
  partial: dt,
  partition: Bl,
  pick: er,
  pluck: zo,
  property: Ro,
  propertyOf: Wa,
  random: wo,
  range: Hl,
  reduce: yt,
  reduceRight: ko,
  reject: bl,
  rest: nt,
  restArguments: be,
  result: el,
  sample: Qi,
  select: Ke,
  shuffle: xl,
  size: Il,
  some: Co,
  sortBy: Cl,
  sortedIndex: Ki,
  tail: nt,
  take: wt,
  tap: $a,
  template: Qa,
  templateSettings: Ja,
  throttle: al,
  times: Ya,
  toArray: Ji,
  toPath: ji,
  transpose: Xt,
  unescape: Ga,
  union: Nl,
  uniq: Yt,
  unique: Yt,
  uniqueId: tl,
  unzip: Xt,
  values: ct,
  where: wl,
  without: _l,
  wrap: cl,
  zip: Dl
}, Symbol.toStringTag, { value: "Module" })), Mf = /* @__PURE__ */ ac(Of);
var We = Mf, Yr = {
  JavaScript: [
    // undefined keyword
    { pattern: /undefined/g, points: 2 },
    // console.log('ayy lmao')
    { pattern: /console\.log( )*\(/, points: 2 },
    // Variable declaration
    { pattern: /(var|const|let)( )+\w+( )*=?/, points: 2 },
    // Array/Object declaration
    { pattern: /(('|").+('|")( )*|\w+):( )*[{\[]/, points: 2 },
    // === operator
    { pattern: /===/g, points: 1 },
    // !== operator
    { pattern: /!==/g, points: 1 },
    // Function definition
    { pattern: /function\*?(( )+[\$\w]+( )*\(.*\)|( )*\(.*\))/g, points: 1 },
    // null keyword
    { pattern: /null/g, points: 1 },
    // lambda expression
    { pattern: /\(.*\)( )*=>( )*.+/, points: 1 },
    // (else )if statement
    { pattern: /(else )?if( )+\(.+\)/, points: 1 },
    // while loop
    { pattern: /while( )+\(.+\)/, points: 1 },
    // C style variable declaration.
    { pattern: /(^|\s)(char|long|int|float|double)( )+\w+( )*=?/, points: -1 },
    // pointer
    { pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
    // HTML <script> tag
    { pattern: /<(\/)?script( type=('|")text\/javascript('|"))?>/, points: -50 }
  ],
  C: [
    // Primitive variable declaration.
    { pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
    // malloc function call
    { pattern: /malloc\(.+\)/, points: 2 },
    // #include <whatever.h>
    { pattern: /#include (<|")\w+\.h(>|")/, points: 2, nearTop: !0 },
    // pointer
    { pattern: /(\w+)( )*\*( )*\w+/, points: 2 },
    // Variable declaration and/or initialisation.
    { pattern: /(\w+)( )+\w+(;|( )*=)/, points: 1 },
    // Array declaration.
    { pattern: /(\w+)( )+\w+\[.+\]/, points: 1 },
    // #define macro
    { pattern: /#define( )+.+/, points: 1 },
    // NULL constant
    { pattern: /NULL/, points: 1 },
    // void keyword
    { pattern: /void/g, points: 1 },
    // (else )if statement
    { pattern: /(else )?if( )*\(.+\)/, points: 1 },
    // while loop
    { pattern: /while( )+\(.+\)/, points: 1 },
    // printf function
    { pattern: /(printf|puts)( )*\(.+\)/, points: 1 },
    // new Keyword from C++
    { pattern: /new \w+/, points: -1 },
    // Single quote multicharacter string
    { pattern: /'.{2,}'/, points: -1 },
    // JS variable declaration
    { pattern: /var( )+\w+( )*=?/, points: -1 }
  ],
  "C++": [
    // Primitive variable declaration.
    { pattern: /(char|long|int|float|double)( )+\w+( )*=?/, points: 2 },
    // #include <whatever.h>
    { pattern: /#include( )*(<|")\w+(\.h)?(>|")/, points: 2, nearTop: !0 },
    // using namespace something
    { pattern: /using( )+namespace( )+.+( )*;/, points: 2 },
    // template declaration
    { pattern: /template( )*<.*>/, points: 2 },
    // std
    { pattern: /std::\w+/g, points: 2 },
    // cout/cin/endl
    { pattern: /(cout|cin|endl)/g, points: 2 },
    // Visibility specifiers
    { pattern: /(public|protected|private):/, points: 2 },
    // nullptr
    { pattern: /nullptr/, points: 2 },
    // new Keyword
    { pattern: /new \w+(\(.*\))?/, points: 1 },
    // #define macro
    { pattern: /#define( )+.+/, points: 1 },
    // template usage
    { pattern: /\w+<\w+>/, points: 1 },
    // class keyword
    { pattern: /class( )+\w+/, points: 1 },
    // void keyword
    { pattern: /void/g, points: 1 },
    // (else )if statement
    { pattern: /(else )?if( )*\(.+\)/, points: 1 },
    // while loop
    { pattern: /while( )+\(.+\)/, points: 1 },
    // Scope operator
    { pattern: /\w*::\w+/, points: 1 },
    // Single quote multicharacter string
    { pattern: /'.{2,}'/, points: -1 },
    // Java List/ArrayList
    { pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/, points: -1 }
  ],
  Python: [
    // Function definition
    { pattern: /def( )+\w+\(.*\)( )*:/, points: 2 },
    // while loop
    { pattern: /while (.+):/, points: 2 },
    // from library import something
    { pattern: /from [\w\.]+ import (\w+|\*)/, points: 2 },
    // class keyword
    { pattern: /class( )*\w+(\(( )*\w+( )*\))?( )*:/, points: 2 },
    // if keyword
    { pattern: /if( )+(.+)( )*:/, points: 2 },
    // elif keyword
    { pattern: /elif( )+(.+)( )*:/, points: 2 },
    // else keyword
    { pattern: /else:/, points: 2 },
    // for loop
    { pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+):/, points: 2 },
    // Python variable declaration.
    { pattern: /\w+( )*=( )*\w+(?!;)(\n|$)/, points: 1 },
    // import something
    { pattern: /import ([[^\.]\w])+/, points: 1, nearTop: !0 },
    // print statement/function
    { pattern: /print((( )*\(.+\))|( )+.+)/, points: 1 },
    // &&/|| operators
    { pattern: /(&{2}|\|{2})/, points: -1 }
  ],
  Java: [
    // System.out.println() etc.
    { pattern: /System\.(in|out)\.\w+/, points: 2 },
    // Class variable declarations
    { pattern: /(private|protected|public)( )*\w+( )*\w+(( )*=( )*[\w])?/, points: 2 },
    // Method
    { pattern: /(private|protected|public)( )*\w+( )*[\w]+\(.+\)/, points: 2 },
    // String class
    { pattern: /(^|\s)(String)( )+[\w]+( )*=?/, points: 2 },
    // List/ArrayList
    { pattern: /(List<\w+>|ArrayList<\w*>( )*\(.*\))(( )+[\w]+|;)/, points: 2 },
    // class keyword
    { pattern: /(public( )*)?class( )*\w+/, points: 2 },
    // Array declaration.
    { pattern: /(\w+)(\[( )*\])+( )+\w+/, points: 2 },
    // final keyword
    { pattern: /final( )*\w+/, points: 2 },
    // getter & setter
    { pattern: /\w+\.(get|set)\(.+\)/, points: 2 },
    // new Keyword (Java)
    { pattern: /new [A-Z]\w*( )*\(.+\)/, points: 2 },
    // C style variable declaration.
    { pattern: /(^|\s)(char|long|int|float|double)( )+[\w]+( )*=?/, points: 1 },
    // extends/implements keywords
    { pattern: /(extends|implements)/, points: 2, nearTop: !0 },
    // null keyword
    { pattern: /null/g, points: 1 },
    // (else )if statement
    { pattern: /(else )?if( )*\(.+\)/, points: 1 },
    // while loop
    { pattern: /while( )+\(.+\)/, points: 1 },
    // void keyword
    { pattern: /void/g, points: 1 },
    // const
    { pattern: /const( )*\w+/, points: -1 },
    // pointer
    { pattern: /(\w+)( )*\*( )*\w+/, points: -1 },
    // Single quote multicharacter string
    { pattern: /'.{2,}'/, points: -1 },
    // C style include
    { pattern: /#include( )*(<|")\w+(\.h)?(>|")/, points: -1, nearTop: !0 }
  ],
  HTML: [
    { pattern: /<!DOCTYPE (html|HTML PUBLIC .+)>/, points: 2, nearTop: !0 },
    // Tags
    { pattern: /<[a-z0-9]+(( )*[\w]+=('|").+('|")( )*)?>.*<\/[a-z0-9]+>/g, points: 2 },
    // Properties
    { pattern: /[a-z\-]+=("|').+("|')/g, points: 2 },
    // PHP tag
    { pattern: /<\?php/, points: -50 }
  ],
  CSS: [
    // Properties
    { pattern: /[a-z\-]+:(?!:).+;/, points: 2 },
    // <style> tag from HTML
    { pattern: /<(\/)?style>/, points: -50 }
  ],
  Ruby: [
    // require/include
    { pattern: /(require|include)( )+'\w+(\.rb)?'/, points: 2, nearTop: !0 },
    // Function definition
    { pattern: /def( )+\w+( )*(\(.+\))?( )*\n/, points: 2 },
    // Instance variables
    { pattern: /@\w+/, points: 2 },
    // Boolean property
    { pattern: /\.\w+\?/, points: 2 },
    // puts (Ruby print)
    { pattern: /puts( )+("|').+("|')/, points: 2 },
    // Inheriting class
    { pattern: /class [A-Z]\w*( )*<( )*([A-Z]\w*(::)?)+/, points: 2 },
    // attr_accessor
    { pattern: /attr_accessor( )+(:\w+(,( )*)?)+/, points: 2 },
    // new
    { pattern: /\w+\.new( )+/, points: 2 },
    // elsif keyword
    { pattern: /elsif/, points: 2 },
    // do
    { pattern: /do( )*\|(\w+(,( )*\w+)?)+\|/, points: 2 },
    // for loop
    { pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+)/, points: 1 },
    // nil keyword
    { pattern: /nil/, points: 1 },
    // Scope operator
    { pattern: /[A-Z]\w*::[A-Z]\w*/, points: 1 }
  ],
  Go: [
    // package something
    { pattern: /package( )+[a-z]+\n/, points: 2, nearTop: !0 },
    // import
    { pattern: /(import( )*\(( )*\n)|(import( )+"[a-z0-9\/\.]+")/, points: 2, nearTop: !0 },
    // error check
    { pattern: /if.+err( )*!=( )*nil.+{/, points: 2 },
    // Go print
    { pattern: /fmt\.Print(f|ln)?\(.*\)/, points: 2 },
    // function
    { pattern: /func(( )+\w+( )*)?\(.*\).*{/, points: 2 },
    // variable initialisation
    { pattern: /\w+( )*:=( )*.+[^;\n]/, points: 2 },
    // if/else if
    { pattern: /(}( )*else( )*)?if[^\(\)]+{/, points: 2 },
    // var/const declaration
    { pattern: /(var|const)( )+\w+( )+[\w\*]+(\n|( )*=|$)/, points: 2 },
    // public access on package
    { pattern: /[a-z]+\.[A-Z]\w*/, points: 1 },
    // nil keyword
    { pattern: /nil/, points: 1 },
    // Single quote multicharacter string
    { pattern: /'.{2,}'/, points: -1 }
  ],
  PHP: [
    // PHP tag
    { pattern: /<\?php/, points: 2 },
    // PHP style variables.
    { pattern: /\$\w+/, points: 2 },
    // use Something\Something;
    { pattern: /use( )+\w+(\\\w+)+( )*;/, points: 2, nearTop: !0 },
    // arrow
    { pattern: /\$\w+\->\w+/, points: 2 },
    // require/include
    { pattern: /(require|include)(_once)?( )*\(?( )*('|").+\.php('|")( )*\)?( )*;/, points: 2 },
    // echo 'something';
    { pattern: /echo( )+('|").+('|")( )*;/, points: 1 },
    // NULL constant
    { pattern: /NULL/, points: 1 },
    // new keyword
    { pattern: /new( )+((\\\w+)+|\w+)(\(.*\))?/, points: 1 },
    // Function definition
    { pattern: /function(( )+[\$\w]+\(.*\)|( )*\(.*\))/g, points: 1 },
    // (else)if statement
    { pattern: /(else)?if( )+\(.+\)/, points: 1 },
    // scope operator
    { pattern: /\w+::\w+/, points: 1 },
    // === operator
    { pattern: /===/g, points: 1 },
    // !== operator
    { pattern: /!==/g, points: 1 },
    // C/JS style variable declaration.
    { pattern: /(^|\s)(var|char|long|int|float|double)( )+\w+( )*=?/, points: -1 }
  ],
  Unknown: []
};
function Xr(n, e, t) {
  return We.reduce(We.map(t, function(o) {
    return o.pattern.test(e) ? o.points : 0;
  }), function(o, i) {
    return o + i;
  }, 0);
}
function Af(n, e) {
  var t = We.defaults(e || {}, {
    heuristic: !0,
    statistics: !1
  }), o = n.replace(/\r\n?/g, `
`).replace(/\n{2,}/g, `
`).split(`
`);
  function i(d) {
    return o.length <= 10 ? !0 : d < o.length / 10;
  }
  t.heuristic && o.length > 500 && (o = o.filter(function(d, u) {
    return i(u) ? !0 : u % Math.ceil(o.length / 500) === 0;
  }));
  var r = We.keys(Yr).map(function(d) {
    return { language: d, checkers: Yr[d] };
  }), s = We.map(r, function(d) {
    var u = d.language, p = d.checkers;
    if (u === "Unknown")
      return { language: "Unknown", points: 1 };
    var y = o.map(function(g, b) {
      return i(b) ? Xr(u, g, p) : Xr(u, g, We.reject(p, function(I) {
        return I.nearTop;
      }));
    }), v = We.reduce(y, function(g, b) {
      return g + b;
    });
    return { language: u, points: v };
  }), a = We.max(s, function(d) {
    return d.points;
  });
  if (t.statistics) {
    var l = {};
    for (var c of s)
      l[c.language] = c.points;
    return { detected: a.language, statistics: l };
  }
  return a.language;
}
var _f = Af;
const Nf = /* @__PURE__ */ lc(_f);
class Pf extends wi {
  /**
   * Handle UI
   */
  constructor(t) {
    var i;
    super(t);
    Re(this, "height");
    if (this.readOnly) {
      const r = this.nodes.holder;
      r.style.padding = "0", r.style.margin = "6px 0", r.style.position = "relative", r.innerHTML = "";
      const s = document.createElement("div");
      s.style.fontFamily = "monospace", s.style.whiteSpace = "pre", s.style.padding = "16px", s.style.borderRadius = "6px", s.style.overflow = "auto", s.style.backgroundColor = "#282c34", s.style.color = "#ffffff", s.textContent = this.data.code ?? "", r.appendChild(s), this.highlight(s);
      try {
        const a = Nf(this.data.code ?? "");
        if (a !== "Unknown") {
          const l = document.createElement("div");
          l.style.position = "absolute", l.style.top = "0", l.style.right = "0", l.style.backgroundColor = "rgba(0,0,0,0.3)", l.style.color = "white", l.style.padding = "6px 8px", l.style.borderRadius = "0 6px 0 6px", l.style.fontSize = "0.75rem", l.style.fontWeight = "700", l.style.lineHeight = "1", l.style.textTransform = "uppercase", l.innerText = a, r.appendChild(l);
        }
      } catch (a) {
        console.error("Error detecting language:", a.message);
      }
      return;
    }
    const o = this.nodes.textarea;
    o && (o.style.backgroundColor = "#282c34", o.style.color = "#ffffff", o.style.minHeight = "initial", (i = t.data) != null && i.height && (this.height = t.data.height, o.style.height = this.height), /Chrome/.test(window.navigator.userAgent) && typeof globalThis.chrome < "u" ? o.style.fieldSizing = "content" : this.height || (o.style.height = "215px"), new MutationObserver((a) => {
      a.forEach((l) => {
        var c;
        this.height = ((c = l == null ? void 0 : l.target) == null ? void 0 : c.style.height) || void 0;
      });
    }).observe(o, { attributes: !0, attributeFilter: ["style"] }), o.addEventListener("keydown", (a) => {
      a.key === "Backspace" && a.stopPropagation();
    }));
  }
  /**
   * Handle save
   */
  save(t) {
    let o = {};
    return this.readOnly ? o = { code: this.data.code } : o = super.save(t), this.height && (o.height = this.height), o;
  }
  /**
   * Handle paste
   */
  onPaste(t) {
    t.type === "tag" && t.detail.data instanceof HTMLElement && (t.detail.data = t.detail.data.innerText), super.onPaste(t);
  }
  /**
   * Highlight code syntax.
   * 
   * @param el HTMLElement to highlight
   */
  highlight(t) {
    for (var o = ";color:", i = "opacity:.", r = t.textContent ?? "", s = 0, a = r[0], l = 1, c, d, u = (
      // current token content
      t.innerHTML = ""
    ), p = 0, y, v, g; d = c, // escaping if needed (with except for comments)
    // pervious character will not be therefore
    // recognized as a token finalize condition
    c = p < 7 && c == "\\" ? 1 : l; ) {
      if (l = a, a = r[++s], v = u.length > 1, !l || // end of content
      // types 9-10 (single-line comments) end with a
      // newline
      p > 8 && l == `
` || [
        // finalize conditions for other token types
        // 0: whitespaces
        /\S/.test(l),
        // merged together
        // 1: operators
        1,
        // consist of a single character
        // 2: braces
        1,
        // consist of a single character
        // 3: (key)word
        !/[$\w]/.test(l),
        // 4: regex
        (c == "/" || c == `
`) && v,
        // 5: string with "
        c == '"' && v,
        // 6: string with '
        c == "'" && v,
        // 7: xml comment
        r[s - 4] + d + c == "-->",
        // 8: multiline comment
        d + c == "*/"
      ][p])
        for (u && (t.appendChild(
          g = document.createElement("span")
        ).setAttribute("style", [
          // 0: not formatted
          "",
          // 1: keywords
          o + "#74beefff",
          // 2: punctuation
          i + 6 + o + "#f3a5deff",
          // 3: strings and regexps
          i + 7 + o + "#d8b5a3ff",
          // 4: comments
          "font-style:italic;" + i + 5
        ][
          // not formatted
          p ? (
            // punctuation
            p < 3 ? 2 : (
              // comments
              p > 6 ? 4 : (
                // regex and strings
                p > 3 ? 3 : (
                  // otherwise tokenType == 3, (key)word
                  // (1 if regexp matches, 0 otherwise)
                  +/^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(icrolight|odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/.test(u)
                )
              )
            )
          ) : 0
        ]), g.appendChild(document.createTextNode(u))), y = p && p < 7 ? p : y, u = "", p = 11; ![
          1,
          //  0: whitespace
          //  1: operator or braces
          /[\/{}[(\-+*=<>:;|\\.,?!&@~]/.test(l),
          /[\])]/.test(l),
          //  2: closing brace
          /[$\w]/.test(l),
          //  3: (key)word
          l == "/" && //  4: regex
          // previous token was an
          // opening brace or an
          // operator (otherwise
          // division, not a regex)
          y < 2 && // workaround for xml
          // closing tags
          c != "<",
          l == '"',
          //  5: string with "
          l == "'",
          //  6: string with '
          //  7: xml comment
          l + a + r[s + 1] + r[s + 2] == "<!--",
          l + a == "/*",
          //  8: multiline comment
          l + a == "//",
          //  9: single-line comment
          l == "#"
          // 10: hash-style comment
        ][--p]; )
          ;
      u += l;
    }
  }
}
class Df {
  static get isReadOnlySupported() {
    return !0;
  }
  static get pasteConfig() {
    return {
      tags: ["hr"]
    };
  }
  render() {
    return document.createElement("hr");
  }
  save() {
    return {};
  }
  static get toolbox() {
    return {
      title: "Delimiter",
      icon: `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="6" y1="12" x2="10" y2="12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                <line x1="14" y1="12" x2="18" y2="12" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>`
    };
  }
}
class Rf {
  constructor({ data: e }) {
    Re(this, "data");
    Re(this, "root");
    this.data = e || {};
  }
  static get isReadOnlySupported() {
    return !0;
  }
  render() {
    return this.root = document.createElement("div"), this.root.style.cssText = "border-radius: 4px; border: 2px dashed grey; padding: 10px 20px; margin: 10px 0;", this.root.className = "cdx-block", this.root.contentEditable = "false", this.root.innerHTML = this.data.text || "", this.root.oninput = () => {
      var e;
      return this.data.text = ((e = this.root) == null ? void 0 : e.innerText) || "";
    }, this.root;
  }
  save() {
    return {
      text: this.data.text
    };
  }
  renderSettings() {
    return [{
      label: "Editable",
      icon: `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`,
      closeOnActivate: !0,
      isActive: () => {
        var e;
        return ((e = this.root) == null ? void 0 : e.contentEditable) === "true";
      },
      onActivate: () => {
        if (!this.root)
          return;
        this.root.contentEditable === "false" ? (this.root.contentEditable = "true", this.root.innerText = this.data.text || "") : (this.root.contentEditable = "false", this.root.innerHTML = this.data.text || "");
      }
    }];
  }
}
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".inline-code{background:rgba(250,239,240,.78);color:#b44437;padding:3px 4px;border-radius:5px;margin:0 1px;font-family:inherit;font-size:.86em;font-weight:500;letter-spacing:.3px}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const Hf = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8L5 12L9 16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 8L19 12L15 16"/></svg>';
let Ff = class Pt {
  constructor({ api: e }) {
    this.tag = "CODE", this.api = e, this.button = null, this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };
  }
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return "inline-code";
  }
  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @return {boolean}
   */
  static get isInline() {
    return !0;
  }
  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render() {
    return this.button = document.createElement("button"), this.button.type = "button", this.button.classList.add(this.iconClasses.base), this.button.innerHTML = this.toolboxIcon, this.button;
  }
  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(e) {
    if (!e)
      return;
    let t = this.api.selection.findParentTag(this.tag, Pt.CSS);
    t ? this.unwrap(t) : this.wrap(e);
  }
  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(e) {
    let t = document.createElement(this.tag);
    t.classList.add(Pt.CSS), t.appendChild(e.extractContents()), e.insertNode(t), this.api.selection.expandToTag(t);
  }
  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(e) {
    var t;
    this.api.selection.expandToTag(e);
    const o = window.getSelection();
    if (!o)
      return;
    const i = o.getRangeAt(0), r = i.extractContents();
    (t = e.parentNode) == null || t.removeChild(e), i.insertNode(r), o.removeAllRanges(), o.addRange(i);
  }
  /**
   * Check and change Term's state for current selection
   * 
   * @return {boolean}
   */
  checkState() {
    const e = this.api.selection.findParentTag(this.tag, Pt.CSS);
    return this.button && this.button.classList.toggle(this.iconClasses.active, !!e), !!e;
  }
  /**
   * Get Tool icon's SVG
   * @return {string}
   */
  get toolboxIcon() {
    return Hf;
  }
  /**
   * Sanitizer rule
   * @return {SanitizerConfig}
   */
  static get sanitize() {
    return {
      code: {
        class: Pt.CSS
      }
    };
  }
};
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".cdx-underline{text-decoration:underline}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
const jf = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7.5V11.5C9 12.2956 9.31607 13.0587 9.87868 13.6213C10.4413 14.1839 11.2044 14.5 12 14.5C12.7956 14.5 13.5587 14.1839 14.1213 13.6213C14.6839 13.0587 15 12.2956 15 11.5V7.5"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.71429 18H16.2857"/></svg>', jl = class Dt {
  /**
   * @param options InlineToolConstructorOptions
   */
  constructor(e) {
    this.tag = "U", this.api = e.api, this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };
  }
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return "cdx-underline";
  }
  /**
   * Create button element for Toolbar
   *
   * @returns {HTMLElement}
   */
  render() {
    return this.button = document.createElement("button"), this.button.type = "button", this.button.classList.add(this.iconClasses.base), this.button.innerHTML = this.toolboxIcon, this.button;
  }
  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(e) {
    if (!e)
      return;
    const t = this.api.selection.findParentTag(this.tag, Dt.CSS);
    t ? this.unwrap(t) : this.wrap(e);
  }
  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(e) {
    const t = document.createElement(this.tag);
    t.classList.add(Dt.CSS), t.appendChild(e.extractContents()), e.insertNode(t), this.api.selection.expandToTag(t);
  }
  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(e) {
    var t;
    this.api.selection.expandToTag(e);
    const o = window.getSelection();
    if (!o)
      return;
    const i = o.getRangeAt(0);
    if (!i)
      return;
    const r = i.extractContents();
    r && ((t = e.parentNode) == null || t.removeChild(e), i.insertNode(r), o.removeAllRanges(), o.addRange(i));
  }
  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    var e;
    const t = this.api.selection.findParentTag(this.tag, Dt.CSS);
    return (e = this.button) == null || e.classList.toggle(this.iconClasses.active, !!t), !!t;
  }
  /**
   * Get Tool icon's SVG
   *
   * @returns {string}
   */
  get toolboxIcon() {
    return jf;
  }
  /**
   * Sanitizer rule
   *
   * @returns {{u: {class: string}}}
   */
  static get sanitize() {
    return {
      u: {
        class: Dt.CSS
      }
    };
  }
};
jl.isInline = !0;
let zf = jl;
var $f = { exports: {} };
(function(n, e) {
  (function(t, o) {
    n.exports = o();
  })(window, function() {
    return function(t) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = o, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, (function(c) {
              return r[c];
            }).bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "", i(i.s = 0);
    }([function(t, o, i) {
      i.r(o);
      var r, s = "fslightbox-", a = "".concat(s, "styles"), l = "".concat(s, "cursor-grabbing"), c = "".concat(s, "full-dimension"), d = "".concat(s, "flex-centered"), u = "".concat(s, "open"), p = "".concat(s, "transform-transition"), y = "".concat(s, "absoluted"), v = "".concat(s, "slide-btn"), g = "".concat(v, "-container"), b = "".concat(s, "fade-in"), I = "".concat(s, "fade-out"), B = b + "-strong", D = I + "-strong", P = "".concat(s, "opacity-"), _ = "".concat(P, "1"), z = "".concat(s, "source");
      function te(f) {
        return (te = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(h) {
          return typeof h;
        } : function(h) {
          return h && typeof Symbol == "function" && h.constructor === Symbol && h !== Symbol.prototype ? "symbol" : typeof h;
        })(f);
      }
      function M(f) {
        var h = f.stageIndexes, x = f.core.stageManager, w = f.props.sources.length - 1;
        x.getPreviousSlideIndex = function() {
          return h.current === 0 ? w : h.current - 1;
        }, x.getNextSlideIndex = function() {
          return h.current === w ? 0 : h.current + 1;
        }, x.updateStageIndexes = w === 0 ? function() {
        } : w === 1 ? function() {
          h.current === 0 ? (h.next = 1, delete h.previous) : (h.previous = 0, delete h.next);
        } : function() {
          h.previous = x.getPreviousSlideIndex(), h.next = x.getNextSlideIndex();
        }, x.i = w <= 2 ? function() {
          return !0;
        } : function(m) {
          var S = h.current;
          if (S === 0 && m === w || S === w && m === 0)
            return !0;
          var T = S - m;
          return T === -1 || T === 0 || T === 1;
        };
      }
      (typeof document > "u" ? "undefined" : te(document)) === "object" && ((r = document.createElement("style")).className = a, r.appendChild(document.createTextNode(".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:pinch-zoom;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightboxl{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightboxl div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightboxl 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightboxl div:nth-child(1){animation-delay:-.45s}.fslightboxl div:nth-child(2){animation-delay:-.3s}.fslightboxl div:nth-child(3){animation-delay:-.15s}@keyframes fslightboxl{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}")), document.head.appendChild(r));
      function O(f) {
        var h, x = f.props, w = 0, m = {};
        this.getSourceTypeFromLocalStorageByUrl = function(T) {
          return h[T] ? h[T] : S(T);
        }, this.handleReceivedSourceTypeForUrl = function(T, E) {
          if (m[E] === !1 && (w--, T !== "invalid" ? m[E] = T : delete m[E], w === 0)) {
            (function(C, L) {
              for (var A in L)
                C[A] = L[A];
            })(h, m);
            try {
              localStorage.setItem("fslightbox-types", JSON.stringify(h));
            } catch {
            }
          }
        };
        var S = function(T) {
          w++, m[T] = !1;
        };
        if (x.disableLocalStorage)
          this.getSourceTypeFromLocalStorageByUrl = function() {
          }, this.handleReceivedSourceTypeForUrl = function() {
          };
        else {
          try {
            h = JSON.parse(localStorage.getItem("fslightbox-types"));
          } catch {
          }
          h || (h = {}, this.getSourceTypeFromLocalStorageByUrl = S);
        }
      }
      function H(f, h, x, w) {
        f.data;
        var m = f.elements.sources, S = x / w, T = 0;
        this.adjustSize = function() {
          if ((T = f.mw / S) < f.mh)
            return x < f.mw && (T = w), E();
          T = w > f.mh ? f.mh : w, E();
        };
        var E = function() {
          m[h].style.width = T * S + "px", m[h].style.height = T + "px";
        };
      }
      function V(f, h) {
        var x = this, w = f.collections.sourceSizers, m = f.elements, S = m.sourceAnimationWrappers, T = m.sources, E = f.isl, C = f.resolve;
        function L(A, N) {
          w[h] = C(H, [h, A, N]), w[h].adjustSize();
        }
        this.runActions = function(A, N) {
          E[h] = !0, T[h].classList.add(_), S[h].classList.add(B), S[h].removeChild(S[h].firstChild), L(A, N), x.runActions = L;
        };
      }
      function G(f, h) {
        var x, w = this, m = f.elements.sources, S = f.props, T = (0, f.resolve)(V, [h]);
        this.handleImageLoad = function(E) {
          var C = E.target, L = C.naturalWidth, A = C.naturalHeight;
          T.runActions(L, A);
        }, this.handleVideoLoad = function(E) {
          var C = E.target, L = C.videoWidth, A = C.videoHeight;
          x = !0, T.runActions(L, A);
        }, this.handleNotMetaDatedVideoLoad = function() {
          x || w.handleYoutubeLoad();
        }, this.handleYoutubeLoad = function() {
          var E = 1920, C = 1080;
          S.maxYoutubeDimensions && (E = S.maxYoutubeDimensions.width, C = S.maxYoutubeDimensions.height), T.runActions(E, C);
        }, this.handleCustomLoad = function() {
          var E = m[h], C = E.offsetWidth, L = E.offsetHeight;
          C && L ? T.runActions(C, L) : setTimeout(w.handleCustomLoad);
        };
      }
      function U(f, h, x) {
        var w = f.elements.sources, m = f.props.customClasses, S = m[h] ? m[h] : "";
        w[h].className = x + " " + S;
      }
      function ie(f, h) {
        var x = f.elements.sources, w = f.props.customAttributes;
        for (var m in w[h])
          x[h].setAttribute(m, w[h][m]);
      }
      function q(f, h) {
        var x = f.collections.sourceLoadHandlers, w = f.elements, m = w.sources, S = w.sourceAnimationWrappers, T = f.props.sources;
        m[h] = document.createElement("img"), U(f, h, z), m[h].src = T[h], m[h].onload = x[h].handleImageLoad, ie(f, h), S[h].appendChild(m[h]);
      }
      function fe(f, h) {
        var x = f.collections.sourceLoadHandlers, w = f.elements, m = w.sources, S = w.sourceAnimationWrappers, T = f.props, E = T.sources, C = T.videosPosters;
        m[h] = document.createElement("video"), U(f, h, z), m[h].src = E[h], m[h].onloadedmetadata = function(A) {
          x[h].handleVideoLoad(A);
        }, m[h].controls = !0, ie(f, h), C[h] && (m[h].poster = C[h]);
        var L = document.createElement("source");
        L.src = E[h], m[h].appendChild(L), setTimeout(x[h].handleNotMetaDatedVideoLoad, 3e3), S[h].appendChild(m[h]);
      }
      function et(f, h) {
        var x = f.collections.sourceLoadHandlers, w = f.elements, m = w.sources, S = w.sourceAnimationWrappers, T = f.props.sources;
        m[h] = document.createElement("iframe"), U(f, h, "".concat(z, " ").concat(s, "youtube-iframe"));
        var E = T[h], C = E.split("?")[1];
        m[h].src = "https://www.youtube.com/embed/".concat(E.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2], "?").concat(C || ""), m[h].allowFullscreen = !0, ie(f, h), S[h].appendChild(m[h]), x[h].handleYoutubeLoad();
      }
      function De(f, h) {
        var x = f.collections.sourceLoadHandlers, w = f.elements, m = w.sources, S = w.sourceAnimationWrappers, T = f.props.sources;
        m[h] = T[h], U(f, h, "".concat(m[h].className, " ").concat(z)), S[h].appendChild(m[h]), x[h].handleCustomLoad();
      }
      function Bt(f, h) {
        var x = f.elements, w = x.sources, m = x.sourceAnimationWrappers;
        f.props.sources, w[h] = document.createElement("div"), w[h].className = "".concat(s, "invalid-file-wrapper ").concat(d), w[h].innerHTML = "Invalid source", m[h].classList.add(B), m[h].removeChild(m[h].firstChild), m[h].appendChild(w[h]);
      }
      function Uo(f) {
        var h = f.collections, x = h.sourceLoadHandlers, w = h.sourcesRenderFunctions, m = f.core.sourceDisplayFacade, S = f.resolve;
        this.runActionsForSourceTypeAndIndex = function(T, E) {
          var C;
          switch (T !== "invalid" && (x[E] = S(G, [E])), T) {
            case "image":
              C = q;
              break;
            case "video":
              C = fe;
              break;
            case "youtube":
              C = et;
              break;
            case "custom":
              C = De;
              break;
            default:
              C = Bt;
          }
          w[E] = function() {
            return C(f, E);
          }, m.displaySourcesWhichShouldBeDisplayed();
        };
      }
      function Vo(f, h, x) {
        var w = f.props, m = w.types, S = w.type, T = w.sources;
        this.getTypeSetByClientForIndex = function(E) {
          var C;
          return m && m[E] ? C = m[E] : S && (C = S), C;
        }, this.retrieveTypeWithXhrForIndex = function(E) {
          (function(C, L) {
            var A = document.createElement("a");
            A.href = C;
            var N = A.hostname;
            if (N === "www.youtube.com" || N === "youtu.be")
              return L("youtube");
            var R = new XMLHttpRequest();
            R.onreadystatechange = function() {
              if (R.readyState !== 4) {
                if (R.readyState === 2) {
                  var Z, J = R.getResponseHeader("content-type");
                  switch (J.slice(0, J.indexOf("/"))) {
                    case "image":
                      Z = "image";
                      break;
                    case "video":
                      Z = "video";
                      break;
                    default:
                      Z = "invalid";
                  }
                  R.onreadystatechange = null, R.abort(), L(Z);
                }
              } else
                L("invalid");
            }, R.open("GET", C), R.send();
          })(T[E], function(C) {
            h.handleReceivedSourceTypeForUrl(C, T[E]), x.runActionsForSourceTypeAndIndex(C, E);
          });
        };
      }
      function to(f, h) {
        var x = f.core.stageManager, w = f.elements, m = w.smw, S = w.sourceWrappersContainer, T = f.props, E = 0, C = document.createElement("div");
        function L(N) {
          C.style.transform = "translateX(".concat(N + E, "px)"), E = 0;
        }
        function A() {
          return (1 + T.slideDistance) * innerWidth;
        }
        C.className = "".concat(y, " ").concat(c, " ").concat(d), C.s = function() {
          C.style.display = "flex";
        }, C.h = function() {
          C.style.display = "none";
        }, C.a = function() {
          C.classList.add(p);
        }, C.d = function() {
          C.classList.remove(p);
        }, C.n = function() {
          C.style.removeProperty("transform");
        }, C.v = function(N) {
          return E = N, C;
        }, C.ne = function() {
          L(-A());
        }, C.z = function() {
          L(0);
        }, C.p = function() {
          L(A());
        }, x.i(h) || C.h(), m[h] = C, S.appendChild(C), function(N, R) {
          var Z = N.elements, J = Z.smw, le = Z.sourceAnimationWrappers, Y = document.createElement("div"), re = document.createElement("div");
          re.className = "fslightboxl";
          for (var Q = 0; Q < 3; Q++) {
            var _e = document.createElement("div");
            re.appendChild(_e);
          }
          Y.appendChild(re), J[R].appendChild(Y), le[R] = Y;
        }(f, h);
      }
      function qo(f, h, x, w) {
        var m = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        m.setAttributeNS(null, "width", h), m.setAttributeNS(null, "height", h), m.setAttributeNS(null, "viewBox", x);
        var S = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return S.setAttributeNS(null, "class", "".concat(s, "svg-path")), S.setAttributeNS(null, "d", w), m.appendChild(S), f.appendChild(m), m;
      }
      function rr(f, h) {
        var x = document.createElement("div");
        return x.className = "".concat(s, "toolbar-button ").concat(d), x.title = h, f.appendChild(x), x;
      }
      function zl(f, h) {
        var x = document.createElement("div");
        x.className = "".concat(s, "toolbar"), h.appendChild(x), function(w, m) {
          var S = w.componentsServices, T = w.data, E = w.fs, C = "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z", L = rr(m);
          L.title = "Enter fullscreen";
          var A = qo(L, "20px", "0 0 18 18", C);
          S.ofs = function() {
            T.ifs = !0, L.title = "Exit fullscreen", A.setAttributeNS(null, "width", "24px"), A.setAttributeNS(null, "height", "24px"), A.setAttributeNS(null, "viewBox", "0 0 950 1024"), A.firstChild.setAttributeNS(null, "d", "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z");
          }, S.xfs = function() {
            T.ifs = !1, L.title = "Enter fullscreen", A.setAttributeNS(null, "width", "20px"), A.setAttributeNS(null, "height", "20px"), A.setAttributeNS(null, "viewBox", "0 0 18 18"), A.firstChild.setAttributeNS(null, "d", C);
          }, L.onclick = E.t;
        }(f, x), function(w, m) {
          var S = rr(m, "Close");
          S.onclick = w.core.lightboxCloser.closeLightbox, qo(S, "20px", "0 0 24 24", "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z");
        }(f, x);
      }
      function $l(f) {
        var h = f.props.sources, x = f.elements.container, w = document.createElement("div");
        w.className = "".concat(s, "nav"), x.appendChild(w), zl(f, w), h.length > 1 && function(m, S) {
          var T = m.componentsServices, E = m.props.sources, C = (m.stageIndexes, document.createElement("div"));
          C.className = "".concat(s, "slide-number-container");
          var L = document.createElement("div");
          L.className = d;
          var A = document.createElement("span");
          T.setSlideNumber = function(Z) {
            return A.innerHTML = Z;
          };
          var N = document.createElement("span");
          N.className = "".concat(s, "slash");
          var R = document.createElement("div");
          R.innerHTML = E.length, C.appendChild(L), L.appendChild(A), L.appendChild(N), L.appendChild(R), S.appendChild(C), setTimeout(function() {
            L.offsetWidth > 55 && (C.style.justifyContent = "flex-start");
          });
        }(f, w);
      }
      function sr(f, h, x, w) {
        var m = f.elements.container, S = x.charAt(0).toUpperCase() + x.slice(1), T = document.createElement("div");
        T.className = "".concat(g, " ").concat(g, "-").concat(x), T.title = "".concat(S, " slide"), T.onclick = h, function(E, C) {
          var L = document.createElement("div");
          L.className = "".concat(v, " ").concat(d), qo(L, "20px", "0 0 20 20", C), E.appendChild(L);
        }(T, w), m.appendChild(T);
      }
      function Ul(f) {
        var h = f.core, x = h.lightboxCloser, w = h.slideChangeFacade, m = f.fs;
        this.listener = function(S) {
          switch (S.key) {
            case "Escape":
              x.closeLightbox();
              break;
            case "ArrowLeft":
              w.changeToPrevious();
              break;
            case "ArrowRight":
              w.changeToNext();
              break;
            case "F11":
              S.preventDefault(), m.t();
          }
        };
      }
      function Vl(f) {
        var h = f.elements, x = f.sourcePointerProps, w = f.stageIndexes;
        function m(S, T) {
          h.smw[S].v(x.swipedX)[T]();
        }
        this.runActionsForEvent = function(S) {
          var T, E, C;
          h.container.contains(h.slideSwipingHoverer) || h.container.appendChild(h.slideSwipingHoverer), T = h.container, E = l, (C = T.classList).contains(E) || C.add(E), x.swipedX = S.screenX - x.downScreenX;
          var L = w.previous, A = w.next;
          m(w.current, "z"), L !== void 0 && x.swipedX > 0 ? m(L, "ne") : A !== void 0 && x.swipedX < 0 && m(A, "p");
        };
      }
      function ql(f) {
        var h = f.props.sources, x = f.resolve, w = f.sourcePointerProps, m = x(Vl);
        h.length === 1 ? this.listener = function() {
          w.swipedX = 1;
        } : this.listener = function(S) {
          w.isPointering && m.runActionsForEvent(S);
        };
      }
      function Wl(f) {
        var h = f.core.slideIndexChanger, x = f.elements.smw, w = f.stageIndexes, m = f.sws;
        function S(E) {
          var C = x[w.current];
          C.a(), C[E]();
        }
        function T(E, C) {
          E !== void 0 && (x[E].s(), x[E][C]());
        }
        this.runPositiveSwipedXActions = function() {
          var E = w.previous;
          if (E === void 0)
            S("z");
          else {
            S("p");
            var C = w.next;
            h.changeTo(E);
            var L = w.previous;
            m.d(L), m.b(C), S("z"), T(L, "ne");
          }
        }, this.runNegativeSwipedXActions = function() {
          var E = w.next;
          if (E === void 0)
            S("z");
          else {
            S("ne");
            var C = w.previous;
            h.changeTo(E);
            var L = w.next;
            m.d(L), m.b(C), S("z"), T(L, "p");
          }
        };
      }
      function ar(f, h) {
        f.contains(h) && f.removeChild(h);
      }
      function Yl(f) {
        var h = f.core.lightboxCloser, x = f.elements, w = f.resolve, m = f.sourcePointerProps, S = w(Wl);
        this.runNoSwipeActions = function() {
          ar(x.container, x.slideSwipingHoverer), m.isSourceDownEventTarget || h.closeLightbox(), m.isPointering = !1;
        }, this.runActions = function() {
          m.swipedX > 0 ? S.runPositiveSwipedXActions() : S.runNegativeSwipedXActions(), ar(x.container, x.slideSwipingHoverer), x.container.classList.remove(l), m.isPointering = !1;
        };
      }
      function Xl(f) {
        var h = f.resolve, x = f.sourcePointerProps, w = h(Yl);
        this.listener = function() {
          x.isPointering && (x.swipedX ? w.runActions() : w.runNoSwipeActions());
        };
      }
      function Kl(f) {
        var h = this, x = f.core, w = x.eventsDispatcher, m = x.globalEventsController, S = x.scrollbarRecompensor, T = f.data, E = f.elements, C = f.fs, L = f.props, A = f.sourcePointerProps;
        this.isLightboxFadingOut = !1, this.runActions = function() {
          h.isLightboxFadingOut = !0, E.container.classList.add(D), m.removeListeners(), L.exitFullscreenOnClose && T.ifs && C.x(), setTimeout(function() {
            h.isLightboxFadingOut = !1, A.isPointering = !1, E.container.classList.remove(D), document.documentElement.classList.remove(u), S.removeRecompense(), document.body.removeChild(E.container), w.dispatch("onClose");
          }, 270);
        };
      }
      function Wo(f, h) {
        var x = f.classList;
        x.contains(h) && x.remove(h);
      }
      function Zl(f) {
        var h, x, w;
        x = (h = f).core.eventsDispatcher, w = h.props, x.dispatch = function(m) {
          w[m] && w[m]();
        }, function(m) {
          var S = m.componentsServices, T = m.data, E = m.fs, C = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];
          function L(N) {
            for (var R = 0; R < C.length; R++)
              document[N](C[R], A);
          }
          function A() {
            document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement ? S.ofs() : S.xfs();
          }
          E.o = function() {
            S.ofs();
            var N = document.documentElement;
            N.requestFullscreen ? N.requestFullscreen() : N.mozRequestFullScreen ? N.mozRequestFullScreen() : N.webkitRequestFullscreen ? N.webkitRequestFullscreen() : N.msRequestFullscreen && N.msRequestFullscreen();
          }, E.x = function() {
            S.xfs(), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
          }, E.t = function() {
            T.ifs ? E.x() : E.o();
          }, E.l = function() {
            L("addEventListener");
          }, E.q = function() {
            L("removeEventListener");
          };
        }(f), function(m) {
          var S = m.core, T = S.globalEventsController, E = S.windowResizeActioner, C = m.fs, L = m.resolve, A = L(Ul), N = L(ql), R = L(Xl);
          T.attachListeners = function() {
            document.addEventListener("pointermove", N.listener), document.addEventListener("pointerup", R.listener), addEventListener("resize", E.runActions), document.addEventListener("keydown", A.listener), C.l();
          }, T.removeListeners = function() {
            document.removeEventListener("pointermove", N.listener), document.removeEventListener("pointerup", R.listener), removeEventListener("resize", E.runActions), document.removeEventListener("keydown", A.listener), C.q();
          };
        }(f), function(m) {
          var S = m.core.lightboxCloser, T = (0, m.resolve)(Kl);
          S.closeLightbox = function() {
            T.isLightboxFadingOut || T.runActions();
          };
        }(f), function(m) {
          var S = m.data, T = m.core.scrollbarRecompensor;
          function E() {
            document.body.offsetHeight > innerHeight && (document.body.style.marginRight = S.scrollbarWidth + "px");
          }
          T.addRecompense = function() {
            document.readyState === "complete" ? E() : addEventListener("load", function() {
              E(), T.addRecompense = E;
            });
          }, T.removeRecompense = function() {
            document.body.style.removeProperty("margin-right");
          };
        }(f), function(m) {
          var S = m.core, T = S.slideChangeFacade, E = S.slideIndexChanger, C = S.stageManager;
          m.props.sources.length > 1 ? (T.changeToPrevious = function() {
            E.jumpTo(C.getPreviousSlideIndex());
          }, T.changeToNext = function() {
            E.jumpTo(C.getNextSlideIndex());
          }) : (T.changeToPrevious = function() {
          }, T.changeToNext = function() {
          });
        }(f), function(m) {
          var S = m.componentsServices, T = m.core, E = T.slideIndexChanger, C = T.sourceDisplayFacade, L = T.stageManager, A = m.elements, N = A.smw, R = A.sourceAnimationWrappers, Z = m.isl, J = m.stageIndexes, le = m.sws;
          E.changeTo = function(Y) {
            J.current = Y, L.updateStageIndexes(), S.setSlideNumber(Y + 1), C.displaySourcesWhichShouldBeDisplayed();
          }, E.jumpTo = function(Y) {
            var re = J.previous, Q = J.current, _e = J.next, ke = Z[Q], Ue = Z[Y];
            E.changeTo(Y);
            for (var xe = 0; xe < N.length; xe++)
              N[xe].d();
            le.d(Q), le.c(), requestAnimationFrame(function() {
              requestAnimationFrame(function() {
                var ht = J.previous, pt = J.next;
                function ur() {
                  L.i(Q) ? Q === J.previous ? N[Q].ne() : Q === J.next && N[Q].p() : (N[Q].h(), N[Q].n());
                }
                ke && R[Q].classList.add(I), Ue && R[J.current].classList.add(b), le.a(), ht !== void 0 && ht !== Q && N[ht].ne(), N[J.current].n(), pt !== void 0 && pt !== Q && N[pt].p(), le.b(re), le.b(_e), Z[Q] ? setTimeout(ur, 260) : ur();
              });
            });
          };
        }(f), function(m) {
          var S = m.core.sourcesPointerDown, T = m.elements, E = T.smw, C = T.sources, L = m.sourcePointerProps, A = m.stageIndexes;
          S.listener = function(N) {
            N.target.tagName !== "VIDEO" && N.preventDefault(), L.isPointering = !0, L.downScreenX = N.screenX, L.swipedX = 0;
            var R = C[A.current];
            R && R.contains(N.target) ? L.isSourceDownEventTarget = !0 : L.isSourceDownEventTarget = !1;
            for (var Z = 0; Z < E.length; Z++)
              E[Z].d();
          };
        }(f), function(m) {
          var S = m.collections.sourcesRenderFunctions, T = m.core.sourceDisplayFacade, E = m.props, C = m.stageIndexes;
          function L(A) {
            S[A] && (S[A](), delete S[A]);
          }
          T.displaySourcesWhichShouldBeDisplayed = function() {
            if (E.loadOnlyCurrentSource)
              L(C.current);
            else
              for (var A in C)
                L(C[A]);
          };
        }(f), function(m) {
          var S = m.core.stageManager, T = m.elements, E = T.smw, C = T.sourceAnimationWrappers, L = m.isl, A = m.stageIndexes, N = m.sws;
          N.a = function() {
            for (var R in A)
              E[A[R]].s();
          }, N.b = function(R) {
            R === void 0 || S.i(R) || (E[R].h(), E[R].n());
          }, N.c = function() {
            for (var R in A)
              N.d(A[R]);
          }, N.d = function(R) {
            if (L[R]) {
              var Z = C[R];
              Wo(Z, B), Wo(Z, b), Wo(Z, I);
            }
          };
        }(f), function(m) {
          var S = m.collections.sourceSizers, T = m.core.windowResizeActioner, E = (m.data, m.elements.smw), C = m.props.sourceMargin, L = m.stageIndexes, A = 1 - 2 * C;
          T.runActions = function() {
            innerWidth > 992 ? m.mw = A * innerWidth : m.mw = innerWidth, m.mh = A * innerHeight;
            for (var N = 0; N < E.length; N++)
              E[N].d(), S[N] && S[N].adjustSize();
            var R = L.previous, Z = L.next;
            R !== void 0 && E[R].ne(), Z !== void 0 && E[Z].p();
          };
        }(f);
      }
      function Gl(f) {
        var h = f.componentsServices, x = f.core, w = x.eventsDispatcher, m = x.globalEventsController, S = x.scrollbarRecompensor, T = x.sourceDisplayFacade, E = x.stageManager, C = x.windowResizeActioner, L = f.data, A = f.elements, N = (f.props, f.stageIndexes), R = f.sws;
        function Z() {
          var J, le;
          L.i = !0, L.scrollbarWidth = function() {
            var Y = document.createElement("div"), re = Y.style, Q = document.createElement("div");
            re.visibility = "hidden", re.width = "100px", re.msOverflowStyle = "scrollbar", re.overflow = "scroll", Q.style.width = "100%", document.body.appendChild(Y);
            var _e = Y.offsetWidth;
            Y.appendChild(Q);
            var ke = Q.offsetWidth;
            return document.body.removeChild(Y), _e - ke;
          }(), Zl(f), A.container = document.createElement("div"), A.container.className = "".concat(s, "container ").concat(c, " ").concat(B), function(Y) {
            var re = Y.elements;
            re.slideSwipingHoverer = document.createElement("div"), re.slideSwipingHoverer.className = "".concat(s, "slide-swiping-hoverer ").concat(c, " ").concat(y);
          }(f), $l(f), function(Y) {
            var re = Y.core.sourcesPointerDown, Q = Y.elements, _e = Y.props.sources, ke = document.createElement("div");
            ke.className = "".concat(y, " ").concat(c), Q.container.appendChild(ke), ke.addEventListener("pointerdown", re.listener), Q.sourceWrappersContainer = ke;
            for (var Ue = 0; Ue < _e.length; Ue++)
              to(Y, Ue);
          }(f), f.props.sources.length > 1 && (le = (J = f).core.slideChangeFacade, sr(J, le.changeToPrevious, "previous", "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"), sr(J, le.changeToNext, "next", "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z")), function(Y) {
            for (var re = Y.props.sources, Q = Y.resolve, _e = Q(O), ke = Q(Uo), Ue = Q(Vo, [_e, ke]), xe = 0; xe < re.length; xe++)
              if (typeof re[xe] == "string") {
                var ht = Ue.getTypeSetByClientForIndex(xe);
                if (ht)
                  ke.runActionsForSourceTypeAndIndex(ht, xe);
                else {
                  var pt = _e.getSourceTypeFromLocalStorageByUrl(re[xe]);
                  pt ? ke.runActionsForSourceTypeAndIndex(pt, xe) : Ue.retrieveTypeWithXhrForIndex(xe);
                }
              } else
                ke.runActionsForSourceTypeAndIndex("custom", xe);
          }(f), w.dispatch("onInit");
        }
        f.open = function() {
          var J = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, le = N.previous, Y = N.current, re = N.next;
          N.current = J, L.i || M(f), E.updateStageIndexes(), L.i ? (R.c(), R.a(), R.b(le), R.b(Y), R.b(re), w.dispatch("onShow")) : Z(), T.displaySourcesWhichShouldBeDisplayed(), h.setSlideNumber(J + 1), document.body.appendChild(A.container), document.documentElement.classList.add(u), S.addRecompense(), m.attachListeners(), C.runActions(), A.smw[N.current].n(), w.dispatch("onOpen");
        };
      }
      function lr(f, h, x) {
        return (lr = Jl() ? Reflect.construct.bind() : function(w, m, S) {
          var T = [null];
          T.push.apply(T, m);
          var E = new (Function.bind.apply(w, T))();
          return S && cr(E, S.prototype), E;
        }).apply(null, arguments);
      }
      function Jl() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
          return !1;
        if (typeof Proxy == "function")
          return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function cr(f, h) {
        return (cr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(x, w) {
          return x.__proto__ = w, x;
        })(f, h);
      }
      function Ql(f) {
        return function(h) {
          if (Array.isArray(h))
            return Yo(h);
        }(f) || function(h) {
          if (typeof Symbol < "u" && h[Symbol.iterator] != null || h["@@iterator"] != null)
            return Array.from(h);
        }(f) || function(h, x) {
          if (h) {
            if (typeof h == "string")
              return Yo(h, x);
            var w = Object.prototype.toString.call(h).slice(8, -1);
            if (w === "Object" && h.constructor && (w = h.constructor.name), w === "Map" || w === "Set")
              return Array.from(h);
            if (w === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(w))
              return Yo(h, x);
          }
        }(f) || function() {
          throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }();
      }
      function Yo(f, h) {
        (h == null || h > f.length) && (h = f.length);
        for (var x = 0, w = new Array(h); x < h; x++)
          w[x] = f[x];
        return w;
      }
      function dr() {
        for (var f = document.getElementsByTagName("a"), h = function(m) {
          if (!f[m].hasAttribute("data-fslightbox"))
            return "continue";
          var S = f[m].hasAttribute("data-href") ? f[m].getAttribute("data-href") : f[m].getAttribute("href");
          if (!S)
            return console.warn('The "data-fslightbox" attribute was set without the "href" attribute.'), "continue";
          var T = f[m].getAttribute("data-fslightbox");
          fsLightboxInstances[T] || (fsLightboxInstances[T] = new FsLightbox());
          var E = null;
          S.charAt(0) === "#" ? (E = document.getElementById(S.substring(1)).cloneNode(!0)).removeAttribute("id") : E = S, fsLightboxInstances[T].props.sources.push(E), fsLightboxInstances[T].elements.a.push(f[m]);
          var C = fsLightboxInstances[T].props.sources.length - 1;
          f[m].onclick = function(le) {
            le.preventDefault(), fsLightboxInstances[T].open(C);
          }, J("types", "data-type"), J("videosPosters", "data-video-poster"), J("customClasses", "data-class"), J("customClasses", "data-custom-class");
          for (var L = ["href", "data-fslightbox", "data-href", "data-type", "data-video-poster", "data-class", "data-custom-class"], A = f[m].attributes, N = fsLightboxInstances[T].props.customAttributes, R = 0; R < A.length; R++)
            if (L.indexOf(A[R].name) === -1 && A[R].name.substr(0, 5) === "data-") {
              N[C] || (N[C] = {});
              var Z = A[R].name.substr(5);
              N[C][Z] = A[R].value;
            }
          function J(le, Y) {
            f[m].hasAttribute(Y) && (fsLightboxInstances[T].props[le][C] = f[m].getAttribute(Y));
          }
        }, x = 0; x < f.length; x++)
          h(x);
        var w = Object.keys(fsLightboxInstances);
        window.fsLightbox = fsLightboxInstances[w[w.length - 1]];
      }
      window.FsLightbox = function() {
        var f = this;
        this.props = { sources: [], customAttributes: [], customClasses: [], types: [], videosPosters: [], sourceMargin: 0.05, slideDistance: 0.3 }, this.data = { isFullscreenOpen: !1, scrollbarWidth: 0 }, this.isl = [], this.sourcePointerProps = { downScreenX: null, isPointering: !1, isSourceDownEventTarget: !1, swipedX: 0 }, this.stageIndexes = {}, this.elements = { a: [], container: null, slideSwipingHoverer: null, smw: [], sourceWrappersContainer: null, sources: [], sourceAnimationWrappers: [] }, this.componentsServices = { setSlideNumber: function() {
        } }, this.resolve = function(h) {
          var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
          return x.unshift(f), lr(h, Ql(x));
        }, this.collections = { sourceLoadHandlers: [], sourcesRenderFunctions: [], sourceSizers: [] }, this.core = { eventsDispatcher: {}, globalEventsController: {}, lightboxCloser: {}, lightboxUpdater: {}, scrollbarRecompensor: {}, slideChangeFacade: {}, slideIndexChanger: {}, sourcesPointerDown: {}, sourceDisplayFacade: {}, stageManager: {}, windowResizeActioner: {} }, this.fs = {}, this.sws = {}, Gl(this), this.close = function() {
          return f.core.lightboxCloser.closeLightbox();
        };
      }, window.fsLightboxInstances = {}, dr(), window.refreshFsLightbox = function() {
        for (var f in fsLightboxInstances) {
          var h = fsLightboxInstances[f].props;
          fsLightboxInstances[f] = new FsLightbox(), fsLightboxInstances[f].props = h, fsLightboxInstances[f].props.sources = [], fsLightboxInstances[f].elements.a = [];
        }
        dr();
      };
    }]);
  });
})($f);
function Kf(n, e) {
  const {
    readOnly: t,
    placeholder: o,
    initialValue: i,
    className: r,
    commentQuery: s,
    docLink: a,
    techDocLink: l,
    onChange: c,
    onImageUpload: d,
    onImageDelete: u
  } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const p = typeof n == "string" ? document.getElementById(n) : n;
  if (!(p instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  p.innerHTML = "";
  const y = oc(p, "bd-html-input", r);
  Ht.allowed = !1;
  var v = () => {
  }, g = t ? () => {
  } : tp(p);
  const b = new Kh({
    holder: p,
    readOnly: t,
    placeholder: o,
    autofocus: !t,
    minHeight: t ? 40 : 100,
    logLevel: "ERROR",
    data: i ? Zh(cc(i)) : void 0,
    onChange: async (I, B) => {
      var D, P, _;
      if (!t && c && Ht.allowed && (b != null && b.save)) {
        const z = await b.save(), te = Gh(z);
        if (c(dc(te)), u && B && B.type === "block-removed" && ((D = B.detail.target) == null ? void 0 : D.name) === "image") {
          const M = (_ = (P = B.detail.target) == null ? void 0 : P.holder) == null ? void 0 : _.querySelector("img");
          M && M.src && u(M.src);
        }
      }
    },
    onReady: () => {
      new Jh(b), new Qh(b), new ep(b, s, a, l), v = Ht.init(b), s && Zr.placeComments(s);
    },
    tunes: s ? ["comments", "insert"] : ["insert"],
    tools: {
      //Block tunes
      insert: np,
      ...s ? { comments: { class: ip, config: s } } : {},
      //Block tools
      paragraph: { class: Sp, inlineToolbar: !0 },
      header: { class: Op, inlineToolbar: !0 },
      list: { class: Mp, inlineToolbar: !0, config: { defaultStyle: "unordered" } },
      table: { class: Wp, inlineToolbar: !0 },
      image: { class: ef, config: { uploader: op(d) } },
      code: { class: Pf },
      delimiter: { class: Df },
      fallback: { class: Rf },
      //Inline tools
      underline: zf,
      inlineCode: Ff
    }
  });
  return {
    handleSyncStatus: g,
    destroy: () => {
      b != null && b.destroy && b.destroy(), v(), y();
    }
  };
}
export {
  Kf as default
};
