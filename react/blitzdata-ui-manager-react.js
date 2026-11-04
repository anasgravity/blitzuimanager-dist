var kt = Object.defineProperty;
var Ot = (e, t, l) => t in e ? kt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[t] = l;
var V = (e, t, l) => (Ot(e, typeof t != "symbol" ? t + "" : t, l), l);
import { BDModel as Mt } from "@blitzdata.ts/core";
import { jsx as r, jsxs as A, Fragment as Ke } from "react/jsx-runtime";
import { useState as w, useRef as _, useEffect as L, useCallback as Z, useMemo as R, createContext as Et, useContext as Tt, Component as Lt } from "react";
const Ft = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0, It = (e) => Array.isArray(e) ? e[0] : e, Ae = (e, t) => e.endsWith("_fk") ? "fk" : e.endsWith("_mtm") ? "mtm" : It(t), Ge = ["view", "control", "filter", "editor", "default", "empty"];
class Dt {
  constructor(t) {
    V(this, "builtins", /* @__PURE__ */ new Map());
    V(this, "typeOverlays", /* @__PURE__ */ new Map());
    V(this, "attrOverlays", /* @__PURE__ */ new Map());
    V(this, "presets", /* @__PURE__ */ new Map());
    V(this, "bindings", /* @__PURE__ */ new Map());
    this.warn = t;
  }
  /** Register a built-in datatype module (the floor layer). */
  register(t) {
    const { type: l, ...n } = t;
    for (const i of [l].flat())
      Object.assign(this.mapEntry(this.builtins, i), n);
  }
  /** Merge extra surfaces into a built-in (used to seed edit-mode editors). */
  mergeBuiltin(t, l) {
    Object.assign(this.mapEntry(this.builtins, t), l);
  }
  hasBuiltin(t) {
    return this.builtins.has(t);
  }
  removeBuiltinSurface(t, l) {
    var n;
    (n = this.builtins.get(t)) == null || delete n[l];
  }
  defineUI(t, l) {
    Object.assign(this.mapEntry(this.typeOverlays, t), l);
  }
  defineUIFor(t, l, n) {
    Object.assign(this.mapEntry(this.attrOverlays, `${t}.${l}`), n);
  }
  definePreset(t, l) {
    this.presets.set(t, l);
  }
  getPreset(t) {
    return this.presets.get(t);
  }
  /** Bind a preset to a type — one replaceable slot. null clears it. */
  bindType(t, l, n) {
    l === null ? this.bindings.delete(t) : this.bindings.set(t, { preset: l, label: n });
  }
  getBinding(t) {
    return this.bindings.get(t);
  }
  /** Drop write-surface overlays (control/editor/filter). Built-ins stay intact. */
  resetWrite() {
    for (const t of [this.typeOverlays, this.attrOverlays])
      for (const l of t.values())
        delete l.control, delete l.editor, delete l.filter;
  }
  /** Drop read-surface overlays (view). Built-ins stay intact. */
  resetRead() {
    for (const t of [this.typeOverlays, this.attrOverlays])
      for (const l of t.values())
        delete l.view;
  }
  resolve(t, l) {
    const { type: n, many: i, model: s, name: a, hint: o, use: d, maxLayer: u = 8 } = t, f = { defaultConfig: {}, sources: {} }, c = (h, v, N) => {
      if (!(!h || v > u)) {
        for (const O of Ge) {
          const S = h[O];
          S !== void 0 && (f[O] = S, f.sources[O] = { layer: v, label: N });
        }
        h.defaultConfig && Object.assign(f.defaultConfig, h.defaultConfig);
      }
    }, b = (h, v, N) => {
      const O = this.presets.get(h);
      if (O) {
        const { extends: $, ...T } = O;
        return $ && c({ ...this.builtins.get($), ...this.typeOverlays.get($) }, v, `${N} (extends '${$}')`), c(T, v + 1, N), !0;
      }
      const S = { ...this.builtins.get(h), ...this.typeOverlays.get(h) };
      return Object.keys(S).length ? (c(S, v + 1, N), !0) : !1;
    };
    c(this.builtins.get(n), 0, "built-in"), i && c(this.builtins.get(`${n}[]`), 0, "built-in (many)"), c(this.typeOverlays.get(n), 1, "defineUI"), i && c(this.typeOverlays.get(`${n}[]`), 1, "defineUI (many)");
    const m = i ? void 0 : this.bindings.get(n);
    if (m && !b(m.preset, 2, m.label ?? `binding '${m.preset}'`) && this.warn(`type '${n}' is bound to '${m.preset}' — not registered, using '${n}' default`), o && !b(o, 4, `preset '${o}'`) && this.warn(`${s ?? "?"}.${a ?? "?"} requests ui '${o}' — not registered, using '${n}' default`), s && a && c(this.attrOverlays.get(`${s}.${a}`), 6, "defineUIFor"), d && (typeof d == "string" ? b(d, 7, `use '${d}'`) || this.warn(`mount requests ui '${d}' — not registered, using '${n}' default`) : typeof d == "function" ? c({ control: d }, 8, "use (control)") : c(d, 8, "use (module)")), l) {
      const h = Ge.filter((v) => f.sources[v]).map((v) => `${v} from ${f.sources[v].label}`);
      l(`${s ?? "?"}.${a ?? n} → ${h.join("; ") || "nothing registered"}`);
    }
    return f;
  }
  mapEntry(t, l) {
    let n = t.get(l);
    return n || (n = {}, t.set(l, n)), n;
  }
}
class xt {
  constructor() {
    V(this, "typeConfig", {});
    V(this, "attributeConfig", {});
    V(this, "settings", {});
    V(this, "services", {});
  }
  setConfig(t, l) {
    var n;
    Object.assign((n = this.typeConfig)[t] ?? (n[t] = {}), l);
  }
  setConfigFor(t, l, n) {
    var i, s;
    Object.assign((i = this.attributeConfig)[s = `${t}.${l}`] ?? (i[s] = {}), n);
  }
  resolve(t, l, n, i, s) {
    return {
      ...i,
      ...this.typeConfig[t],
      ...l && n ? this.attributeConfig[`${l}.${n}`] : void 0,
      ...s
    };
  }
}
function q(e, t, l, n) {
  if (typeof (e == null ? void 0 : e[l]) == "string")
    return e[l];
  if (typeof t == "string")
    return t;
  if (t && typeof t == "object") {
    const i = t;
    if (typeof i[l] == "string")
      return i[l];
    if (typeof i.default == "string")
      return i.default;
    const s = Object.values(i).find((a) => typeof a == "string");
    if (s)
      return s;
  }
  return n;
}
function jt(e, t, l, n) {
  const i = e, s = i && typeof i == "object" ? i[t] : void 0;
  return s == null ? n : q(void 0, s, l, n);
}
function _t(e, t) {
  var l, n, i;
  return ((n = (l = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : l.call(e)) == null ? void 0 : n[t]) ?? ((i = e == null ? void 0 : e.getUserAttributeDetails) == null ? void 0 : i.call(e, t)) ?? {};
}
function Ut(e) {
  return e !== null && typeof e == "object" && Object.hasOwn(e, "_value") ? e.value : e;
}
function Se(e) {
  return Array.isArray(e) ? e.map((t) => Ut(t)) : [];
}
function $e(e) {
  return e.replace(/(\^|\$|\\|\/|\||\*|\+|\-|\.|\?|\(|\)|\[|\]|\{|\})/g, "\\$&");
}
function Vt(e) {
  return new Promise((t, l) => {
    if (window.google && window.google.maps) {
      t();
      return;
    }
    const n = document.createElement("script");
    n.src = `https://maps.googleapis.com/maps/api/js?key=${e}&libraries=places`, n.async = !0, n.defer = !0, n.onload = () => t(), n.onerror = () => l(new Error("Failed to load Google Maps API")), document.head.appendChild(n);
  });
}
async function Bt(e, t, l) {
  if (await Vt(l), !window.google || !window.google.maps)
    return null;
  const n = { lat: parseFloat(e), lng: parseFloat(t) };
  if (!Number.isFinite(n.lat) || !Number.isFinite(n.lng))
    return null;
  const i = document.createElement("div");
  i.className = "map-container";
  const s = new google.maps.Map(i, { center: n, zoom: 13 });
  return new google.maps.Marker({ map: s, position: n }), i;
}
new Function("url", "return import(url)");
function Rt(e, t) {
  var i, s, a, o;
  const l = _t((i = e._object) == null ? void 0 : i.model, e._name), n = l.type ?? e._type;
  return {
    kind: "live",
    type: Ae(e._name, n),
    many: Array.isArray(l.type) && !e._name.endsWith("_mtm"),
    model: (o = (a = (s = e._object) == null ? void 0 : s.model) == null ? void 0 : a.getName) == null ? void 0 : o.call(a),
    name: e._name,
    attribute: e,
    value: e.value,
    set: (d) => e.edit(d),
    add: (d) => {
      var u;
      return (u = e.add) == null ? void 0 : u.call(e, d);
    },
    remove: (d) => {
      var u;
      return (u = e.remove) == null ? void 0 : u.call(e, d);
    },
    // VALUE stream: the object's remoteChange event — patch in place
    subscribe: (d) => {
      const u = e._object;
      if (typeof (u == null ? void 0 : u.addEventListener) != "function")
        return () => {
        };
      const f = (c) => {
        c && !Object.hasOwn(c, e._name) || d(e.value);
      };
      return u.addEventListener("remoteChange", f), () => u.removeEventListener("remoteChange", f);
    },
    // SAVE-STATE stream: pending | saved | failed — distinct from value
    status: (d) => {
      var u;
      return ((u = e.syncStatus) == null ? void 0 : u.call(e, d)) ?? (() => {
      });
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: t
  };
}
function Pt(e, t, l, n, i) {
  var s;
  return {
    kind: "draft",
    type: Ae(t, l.type),
    many: Array.isArray(l.type) && !t.endsWith("_mtm"),
    model: (s = n == null ? void 0 : n.getName) == null ? void 0 : s.call(n),
    name: t,
    value: e[t],
    set: (a) => {
      e[t] = a;
    },
    add: (a) => {
      (e[t] ?? (e[t] = [])).push(a);
    },
    remove: (a) => {
      e[t] = (e[t] ?? []).filter((o) => o !== a);
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: i
  };
}
function it(e, t, l, n, i, s) {
  var a;
  return {
    kind: "query",
    type: Ae(t, l.type),
    many: Array.isArray(l.type) && !t.endsWith("_mtm"),
    model: (a = n == null ? void 0 : n.getName) == null ? void 0 : a.call(n),
    name: t,
    value: e[t],
    set: (o) => {
      o ? e[t] = o : delete e[t], i == null || i();
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: s
  };
}
function st(e) {
  const t = Object.keys(e);
  return t.length === 0 ? null : (l) => t.every((n) => {
    var i;
    return zt((i = l[n]) == null ? void 0 : i.value, e[n]);
  });
}
const We = (e) => e.map(
  (t) => t && Object.hasOwn(t, "_value") ? t.value : t && Object.hasOwn(t, "_blitzID") ? t._blitzID : t
);
function zt(e, t) {
  switch (t.op) {
    case "contains":
      return typeof e == "string" && !!e.match(new RegExp($e(String(t.value)), "i"));
    case "eq":
      return Array.isArray(e) ? We(e).includes(t.value) : e == t.value;
    case "between": {
      const l = typeof e == "string" && Number.isNaN(Number(e)) ? new Date(e).getTime() : Number(e);
      if (e == null || Number.isNaN(l))
        return !1;
      const { min: n, max: i } = t;
      return (n == null || l >= n) && (i == null || l <= i);
    }
    case "in": {
      const l = t.values ?? t.value;
      if (!Array.isArray(l) || l.length === 0)
        return !0;
      if (Array.isArray(e)) {
        const n = We(e);
        return l.some((i) => n.includes(i));
      }
      return l.includes(e);
    }
    default:
      return !0;
  }
}
const at = /* @__PURE__ */ new Set(["varchar", "text", "markdown", "email", "url", "tag", "hex", "formula", "youtube"]), ae = (e) => {
  const t = {};
  return e.View !== void 0 && (t.view = e.View), e.Control !== void 0 && (t.control = e.Control), e.Filter !== void 0 && (t.filter = e.Filter), e.default !== void 0 && (t.default = e.default), e.empty !== void 0 && (t.empty = e.empty), e.defaultConfig !== void 0 && (t.defaultConfig = e.defaultConfig), t;
};
class Kt {
  constructor() {
    V(this, "registry", new Dt((t) => this.warn(t)));
    V(this, "config", new xt());
    V(this, "debug", !1);
    V(this, "resolveModel", (t) => Mt.get(t));
  }
  /** Register a built-in datatype module (the floor layer). */
  register(t) {
    const { type: l, ...n } = t;
    this.registry.register({ type: l, ...ae(n) });
  }
  defineUI(t, l) {
    this.registry.defineUI(t, ae(l));
  }
  defineUIFor(t, l, n) {
    this.registry.defineUIFor(t, l, ae(n));
  }
  definePreset(t, l) {
    const { extends: n, ...i } = l;
    this.registry.definePreset(t, { extends: n, ...ae(i) });
  }
  setConfig(t, l) {
    this.config.setConfig(t, l);
  }
  setConfigFor(t, l, n) {
    this.config.setConfigFor(t, l, n);
  }
  get settings() {
    return this.config.settings;
  }
  set settings(t) {
    this.config.settings = t;
  }
  get services() {
    return this.config.services;
  }
  set services(t) {
    this.config.services = t;
  }
  warn(t) {
    console.warn(`[BlitzUIManagerReact] ${t}`);
  }
}
const rt = new Kt();
function U(e) {
  const [t, l] = w(e.value), n = _(e.value);
  e.value !== n.current && (n.current = e.value, l(e.value)), L(() => {
    var s;
    return (s = e.subscribe) == null ? void 0 : s.call(e, (a) => {
      n.current = a, l(a);
    });
  }, [e.subscribe]);
  const i = Z((s) => {
    l(s), e.onChange(s);
  }, [e.onChange]);
  return [t, i];
}
function Gt(e) {
  const [t, l] = w(null);
  return L(() => {
    var n;
    return (n = e.status) == null ? void 0 : n.call(e, l);
  }, [e.status]), t;
}
function ee(e) {
  const { value: t, commit: l, validate: n, delay: i = 500, flushOnUnmount: s = !0 } = e, [a, o] = w(t), d = _(t), u = _(null), f = _(a);
  f.current = a;
  const c = _(t);
  t !== c.current && (c.current = t, d.current = t, u.current === null && o(t));
  const b = () => {
    u.current !== null && (clearTimeout(u.current), u.current = null);
  }, m = Z((S) => {
    b(), !(n && !n(S)) && S !== d.current && (d.current = S, l(S));
  }, [l, n]), h = Z((S) => {
    o(S), f.current = S, b(), u.current = setTimeout(() => {
      u.current = null, m(S);
    }, i);
  }, [m, i]), v = Z(() => m(f.current), [m]), N = Z(() => {
    b(), o(d.current), f.current = d.current;
  }, []), O = _(v);
  return O.current = s ? v : () => {
  }, L(() => () => O.current(), []), { draft: a, setDraft: h, flush: v, cancel: N };
}
const P = ({ status: e }) => {
  var o;
  const t = Gt({ status: e }), l = _(!1), [n, i] = w(!1), s = t == null ? void 0 : t.status;
  if (L(() => {
    if (s && !(s === "completed" && !l.current) && (l.current = !0, i(!0), s === "completed")) {
      const d = setTimeout(() => i(!1), 1e3);
      return () => clearTimeout(d);
    }
  }, [t]), !n || !s || s === "completed" && !l.current)
    return null;
  const a = (o = t == null ? void 0 : t.job) == null ? void 0 : o.message;
  return /* @__PURE__ */ r(
    "span",
    {
      className: `bd-savestate bd-savestate-${s}`,
      title: s === "conflict" ? "Conflict" : s,
      onClick: a ? (d) => {
        d.stopPropagation(), alert(a);
      } : void 0,
      children: s === "pending" ? "…" : s === "completed" ? "✓" : "✗"
    }
  );
}, Wt = (e) => {
  const t = e.value, [l, n] = w(t == null ? "" : String(t.value));
  return /* @__PURE__ */ A(
    "select",
    {
      className: "bd-filter bd-filter-boolean",
      value: l,
      onChange: (i) => {
        const s = i.target.value;
        n(s), e.onChange(s === "" ? null : { op: "eq", value: s === "true" });
      },
      children: [
        /* @__PURE__ */ r("option", { value: "", children: "Any" }),
        /* @__PURE__ */ r("option", { value: "true", children: "Yes" }),
        /* @__PURE__ */ r("option", { value: "false", children: "No" })
      ]
    }
  );
}, ce = (e) => {
  const t = e.value, [l, n] = w((t == null ? void 0 : t.min) == null ? "" : String(t.min)), [i, s] = w((t == null ? void 0 : t.max) == null ? "" : String(t.max)), a = _(null), o = (d, u) => {
    a.current && clearTimeout(a.current), a.current = setTimeout(() => {
      if (d === "" && u === "") {
        e.onChange(null);
        return;
      }
      e.onChange({
        op: "between",
        min: d === "" ? null : Number(d),
        max: u === "" ? null : Number(u)
      });
    }, 500);
  };
  return /* @__PURE__ */ A("span", { className: "bd-filter bd-filter-range", children: [
    /* @__PURE__ */ r(
      "input",
      {
        type: "number",
        placeholder: "min",
        value: l,
        onChange: (d) => {
          n(d.target.value), o(d.target.value, i);
        }
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        type: "number",
        placeholder: "max",
        value: i,
        onChange: (d) => {
          s(d.target.value), o(l, d.target.value);
        }
      }
    )
  ] });
}, Ne = (e) => e === !0 || e === 1 || e === "1", Zt = (e) => {
  const [t, l] = U(e), n = Ne(t);
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-boolean", children: [
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": n,
        className: `bd-boolean ${n ? "icon-true" : "icon-false"}`,
        onClick: () => l(!n),
        onKeyDown: (i) => {
          (i.key === "Enter" || i.key === " ") && (i.preventDefault(), l(!n));
        },
        children: n ? "✓" : "✗"
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, Ht = {
  type: "boolean",
  default: () => !1,
  empty: (e) => e == null,
  Control: Zt,
  Filter: Wt,
  View: ({ value: e }) => /* @__PURE__ */ r("span", { className: `bd-boolean ${Ne(e) ? "icon-true" : "icon-false"}`, children: Ne(e) ? "✓" : "✗" })
};
function oe(e = {}) {
  const { type: t = "text", pattern: l, serialize: n = (s) => s } = e;
  return (s) => {
    const [a, o] = U(s), [d, u] = w(!1), f = s.config.errorMsg ?? e.errorMsg, c = s.config.pattern ?? l, { draft: b, setDraft: m, flush: h, cancel: v } = ee({
      value: a == null ? "" : String(a),
      commit: (N) => o(n(N)),
      validate: (N) => {
        const O = N === "" || !c || c.test(N);
        return u(!O), O;
      }
    });
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-text", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: t,
          value: b,
          placeholder: s.config.placeholder,
          onChange: (N) => m(N.target.value),
          onBlur: h,
          onKeyDown: (N) => {
            N.key === "Enter" && h(), N.key === "Escape" && (v(), N.target.blur());
          }
        }
      ),
      /* @__PURE__ */ r(P, { status: s.status }),
      d && f ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: f }) : null
    ] });
  };
}
const K = (e) => (Array.isArray(e) ? e.length > 0 : e !== "" && e != null) ? e : null, ct = (e) => Array.isArray(e) ? Se(e).map(String).join(", ") : String(e ?? ""), de = ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-text", children: ct(e) });
function ot(e, t, l) {
  if (e.add && e.remove) {
    for (const n of l.filter((i) => !t.includes(i)))
      e.add(n);
    for (const n of t.filter((i) => !l.includes(i)))
      e.remove(n);
  } else
    e.onChange(K(l));
}
function ke(e) {
  return Array.isArray(e) ? e.map((t) => String(Ze(t))) : e == null || e === "" ? [] : [String(Ze(e))];
}
const Ze = (e) => {
  var t;
  if (e !== null && typeof e == "object") {
    if (Object.hasOwn(e, "_blitzID"))
      return ((t = e._blitzID) == null ? void 0 : t.value) ?? e._blitzID;
    if (Object.hasOwn(e, "_value"))
      return e.value;
  }
  return e;
}, Jt = {
  type: ["varchar", "tag", "formula"],
  empty: (e) => !e,
  Control: oe({ serialize: K }),
  View: de
}, qt = {
  type: "hex",
  empty: (e) => !e,
  defaultConfig: { pattern: /^[0-9a-fA-F]*$/, errorMsg: "Hex digits only (0-9, a-f)!" },
  Control: oe({ serialize: K }),
  View: de
}, Yt = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function dt(e) {
  return String(e ?? "").replace(/[&<>"']/g, (t) => Yt[t]);
}
const Xt = /^\s*(javascript|data|vbscript):/i;
function ue(e) {
  const t = String(e ?? "");
  return Xt.test(t) ? "#" : dt(t);
}
const Qt = /^\s*(javascript|data|vbscript):/i, en = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?$/, He = (e) => {
  let t = e.trim();
  return t.startsWith("|") && (t = t.slice(1)), t.endsWith("|") && (t = t.slice(0, -1)), t.split("|").map((l) => l.trim());
}, Je = (e) => Qt.test(e) ? "#" : e;
function X(e) {
  return e.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (t, l, n) => `<img alt="${l}" src="${Je(n)}" />`).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (t, l, n) => `<a href="${Je(n)}">${l}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
function tn(e) {
  const t = dt(e.replace(/\r\n?/g, `
`)).split(`
`), l = [];
  let n = [], i = null, s = [], a = null, o = null;
  const d = () => {
    n.length && l.push(`<p>${n.map(X).join("<br />")}</p>`), n = [];
  }, u = () => {
    i && l.push(`<${i.tag}>${i.items.map((m) => `<li>${X(m)}</li>`).join("")}</${i.tag}>`), i = null;
  }, f = () => {
    s.length && l.push(`<blockquote>${s.map(X).join("<br />")}</blockquote>`), s = [];
  }, c = () => {
    if (o) {
      const m = `<tr>${o.header.map((v) => `<th>${X(v)}</th>`).join("")}</tr>`, h = o.rows.map((v) => `<tr>${v.map((N) => `<td>${X(N)}</td>`).join("")}</tr>`).join("");
      l.push(`<table><thead>${m}</thead><tbody>${h}</tbody></table>`);
    }
    o = null;
  }, b = () => {
    d(), u(), f(), c();
  };
  for (let m = 0; m < t.length; m++) {
    const h = t[m];
    if (a) {
      /^```/.test(h) ? (l.push(`<pre><code>${a.join(`
`)}</code></pre>`), a = null) : a.push(h);
      continue;
    }
    if (/^```/.test(h)) {
      b(), a = [];
      continue;
    }
    if (o) {
      if (h.trim() !== "" && h.includes("|")) {
        o.rows.push(He(h));
        continue;
      }
      c();
    }
    const v = h.match(/^(#{1,6})\s+(.*)$/);
    if (v) {
      b(), l.push(`<h${v[1].length}>${X(v[2])}</h${v[1].length}>`);
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(h)) {
      b(), l.push("<hr />");
      continue;
    }
    const N = h.match(/^&gt;\s?(.*)$/);
    if (N) {
      d(), u(), s.push(N[1]);
      continue;
    }
    const O = h.match(/^\s*[-*]\s+(.*)$/), S = h.match(/^\s*\d+\.\s+(.*)$/);
    if (O || S) {
      d(), f();
      const $ = O ? "ul" : "ol";
      (!i || i.tag !== $) && (u(), i = { tag: $, items: [] }), i.items.push((O ?? S)[1]);
      continue;
    }
    if (h.includes("|") && m + 1 < t.length && en.test(t[m + 1])) {
      b(), o = { header: He(h), rows: [] }, m++;
      continue;
    }
    if (h.trim() === "") {
      b();
      continue;
    }
    u(), f(), n.push(h);
  }
  return a && l.push(`<pre><code>${a.join(`
`)}</code></pre>`), b(), l.join(`
`);
}
function fe(e, t) {
  return (n) => {
    const [i, s] = U(n), { draft: a, setDraft: o, flush: d, cancel: u } = ee({
      value: t ? t(i) : i == null ? "" : String(i),
      commit: (f) => s(e(f, n))
    });
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-textarea", children: [
      /* @__PURE__ */ r(
        "textarea",
        {
          rows: n.config.rows ?? 10,
          value: a,
          placeholder: n.config.placeholder,
          onChange: (f) => o(f.target.value),
          onBlur: d,
          onKeyDown: (f) => {
            f.key === "Escape" && (u(), f.target.blur());
          }
        }
      ),
      /* @__PURE__ */ r(P, { status: n.status })
    ] });
  };
}
const nn = (e) => {
  const [t, l] = U(e), [n, i] = w(""), s = Se(t).map(String), a = (d, u, f) => {
    if (e.add && e.remove)
      u !== void 0 && e.add(u), f !== void 0 && e.remove(f);
    else {
      l(d.length ? d : null);
      return;
    }
    l(d);
  }, o = () => {
    const d = n.trim();
    if (!d || s.includes(d)) {
      i("");
      return;
    }
    a([...s, d], d), i("");
  };
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-chips", children: [
    /* @__PURE__ */ r("span", { className: "bd-chips", children: s.map((d) => /* @__PURE__ */ A("span", { className: "bd-chip", children: [
      d,
      /* @__PURE__ */ r("button", { type: "button", className: "bd-chip-remove", onClick: () => a(s.filter((u) => u !== d), void 0, d), children: "×" })
    ] }, d)) }),
    /* @__PURE__ */ r(
      "input",
      {
        value: n,
        placeholder: e.config.placeholder ?? "add a value",
        onChange: (d) => i(d.target.value),
        onKeyDown: (d) => {
          d.key === "Enter" && (d.preventDefault(), o()), d.key === "Escape" && i("");
        },
        onBlur: o
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, ln = {
  type: "text",
  empty: (e) => !e,
  Control: fe((e) => K(e)),
  View: de
}, sn = {
  type: "markdown",
  empty: (e) => !e,
  Control: fe((e) => K(e)),
  // renderMarkdown escapes first — the markup below is library-built, never raw input
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-markdown", dangerouslySetInnerHTML: { __html: tn(String(e ?? "")) } })
}, an = {
  type: ["varchar[]", "text[]", "tag[]"],
  default: () => [],
  Control: nn,
  View: de
};
function qe(e, t = !0) {
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: t }).format(e).replace(/\./g, "'").replace(/,/g, ".");
}
function rn(e, t) {
  if (!t)
    return qe(e);
  try {
    return new Intl.NumberFormat("de-DE", { currency: t, style: "currency" }).format(e).replace(/\./g, "'").replace(/,/g, ".");
  } catch {
    return `${qe(e)} ${t}`;
  }
}
function cn(e) {
  if (e === "" || e === null || e === void 0)
    return "";
  const t = parseFloat(e);
  return isNaN(t) ? String(e) : String(Math.round(t * 1e4) / 1e4);
}
function on(e) {
  const t = Math.max(0, Math.floor(e));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor(t % 86400 / 3600),
    m: Math.floor(t % 3600 / 60),
    s: t % 60
  };
}
function dn(e, t) {
  const l = Object.keys(e);
  if (l.length === 0)
    return "";
  if (t) {
    if (typeof e[t] == "string")
      return e[t];
    const i = t.split("_")[0], s = l.find((a) => a === i || a.startsWith(`${i}_`));
    if (s && typeof e[s] == "string")
      return e[s];
  }
  if (typeof e.default == "string")
    return e.default;
  const n = l.find((i) => typeof e[i] == "string");
  return n ? e[n] : "";
}
const un = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
function ut(e) {
  const t = e.match(un);
  return t ? t[1] : null;
}
function fn(e) {
  if (e.thumbnail)
    return e.thumbnail;
  if (e["tn-oq"])
    return e["tn-oq"];
  const t = e.url ? ut(e.url) : null;
  return t ? `https://img.youtube.com/vi/${t}/hqdefault.jpg` : null;
}
const gn = (e) => {
  const [t, l] = U(e), n = e.config.baseLocale ?? e.settings.language ?? "en", i = t && typeof t == "object" ? t : {}, s = Object.keys(i).filter((c) => c !== n), [a, o] = w(""), d = (c) => {
    const b = Object.fromEntries(Object.entries(c).filter(([m]) => m.trim() !== ""));
    l(Object.keys(b).length > 0 ? b : null);
  }, u = (c, b) => d({ ...i, [c]: b }), f = (c) => {
    const b = { ...i };
    delete b[c], d(b);
  };
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-i18n", children: [
    /* @__PURE__ */ A("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ r("span", { className: "bd-i18n-locale", children: n }),
      /* @__PURE__ */ r("input", { value: i[n] ?? "", onChange: (c) => u(n, c.target.value) }),
      /* @__PURE__ */ r(P, { status: e.status })
    ] }),
    s.map((c) => /* @__PURE__ */ A("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ r("span", { className: "bd-i18n-locale", children: c }),
      /* @__PURE__ */ r("input", { value: i[c] ?? "", onChange: (b) => u(c, b.target.value) }),
      /* @__PURE__ */ r("button", { type: "button", onClick: () => f(c), children: "×" })
    ] }, c)),
    /* @__PURE__ */ A("div", { className: "bd-i18n-row bd-i18n-add", children: [
      /* @__PURE__ */ r(
        "input",
        {
          placeholder: "locale (fr, de…)",
          value: a,
          onChange: (c) => o(c.target.value),
          onKeyDown: (c) => {
            c.key === "Enter" && a.trim() && (u(a.trim(), ""), o(""));
          }
        }
      ),
      /* @__PURE__ */ r("button", { type: "button", onClick: () => {
        a.trim() && (u(a.trim(), ""), o(""));
      }, children: "+ locale" })
    ] })
  ] });
}, mn = {
  type: "texti18n",
  empty: (e) => !e || Object.keys(e).length === 0,
  Control: gn,
  View: ({ value: e, settings: t }) => /* @__PURE__ */ r("p", { className: "bd-texti18n bd-text", children: dn(e ?? {}, t == null ? void 0 : t.language) })
};
function ft(e) {
  const t = (n) => n === "" ? null : e ? parseFloat(n) || 0 : parseInt(n) || 0;
  return (n) => {
    const [i, s] = U(n), { draft: a, setDraft: o, flush: d, cancel: u } = ee({
      value: i == null ? "" : String(i),
      commit: (c) => s(t(c))
    }), f = n.config.unit ?? (Array.isArray(n.attributeDetails.unit) ? n.attributeDetails.unit[0] : n.attributeDetails.unit);
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-number", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "number",
          value: a,
          min: n.config.min,
          max: n.config.max,
          step: e ? "any" : 1,
          placeholder: n.config.placeholder,
          onChange: (c) => o(c.target.value),
          onBlur: d,
          onKeyDown: (c) => {
            c.key === "Enter" && d(), c.key === "Escape" && (u(), c.target.blur());
          }
        }
      ),
      f ? /* @__PURE__ */ r("span", { className: "bd-input-unit", children: f }) : null,
      /* @__PURE__ */ r(P, { status: n.status })
    ] });
  };
}
const gt = ft(!1), Oe = ft(!0), hn = {
  type: ["int", "tinyint"],
  empty: (e) => e == null,
  Control: gt,
  Filter: ce,
  View: ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-number", children: String(e) })
}, bn = {
  type: ["double", "float"],
  empty: (e) => e == null,
  Control: Oe,
  Filter: ce,
  View: ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-number", children: String(e) })
}, yn = {
  type: "percentage",
  empty: (e) => e == null,
  Control: Oe,
  Filter: ce,
  View: ({ value: e }) => /* @__PURE__ */ A("p", { className: "bd-number bd-percentage", children: [
    cn(e),
    " ",
    /* @__PURE__ */ r("span", { className: "bd-percentage-sign", children: "%" })
  ] })
}, vn = {
  type: "currency",
  empty: (e) => e == null,
  Control: Oe,
  Filter: ce,
  View: ({ value: e, attributeDetails: t, config: l }) => {
    const n = (l == null ? void 0 : l.unit) ?? (Array.isArray(t == null ? void 0 : t.unit) ? t == null ? void 0 : t.unit[0] : t == null ? void 0 : t.unit);
    return /* @__PURE__ */ r("p", { className: "bd-number bd-currency", children: rn(Number(e), n) });
  }
}, pn = {
  type: "duration",
  empty: (e) => e == null,
  defaultConfig: { min: 0, placeholder: "seconds" },
  Control: gt,
  Filter: ce,
  View: ({ value: e }) => {
    const t = on(Number(e) || 0), l = ["d", "h", "m", "s"].filter((n) => t[n] > 0);
    return /* @__PURE__ */ r("p", { className: "bd-duration", children: l.length === 0 ? "0s" : l.map((n) => `${t[n]}${n}`).join(" ") });
  }
}, Cn = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, mt = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, Nn = {
  type: "email",
  empty: (e) => !e,
  Control: oe({ type: "email", pattern: Cn, errorMsg: "Wrong email address!", serialize: K }),
  View: ({ value: e }) => /* @__PURE__ */ r("a", { className: "bd-email", href: `mailto:${e}`, children: String(e) })
}, wn = {
  type: "url",
  empty: (e) => !e,
  Control: oe({ type: "url", pattern: mt, errorMsg: "Wrong URL!", serialize: K }),
  View: ({ value: e }) => /* @__PURE__ */ r("a", { className: "bd-url", href: ue(e), target: "_blank", rel: "noopener noreferrer", children: String(e) })
}, An = (e) => {
  const [t, l] = U(e), n = typeof t == "object" && t !== null ? t : {}, i = typeof t == "object" ? (t == null ? void 0 : t.url) ?? "" : t ?? "", { draft: s, setDraft: a, flush: o, cancel: d } = ee({
    value: String(i),
    commit: (u) => {
      if (!u) {
        l(null);
        return;
      }
      if (!mt.test(u))
        return;
      const f = ut(u), c = n.thumbnail ?? (f ? `https://img.youtube.com/vi/${f}/hqdefault.jpg` : void 0);
      l({ ...n, url: u, ...c ? { thumbnail: c } : {} });
    }
  });
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-text bd-input-youtube", children: [
    /* @__PURE__ */ r(
      "input",
      {
        type: "url",
        value: s,
        placeholder: e.config.placeholder ?? "https://www.youtube.com/watch?v=…",
        onChange: (u) => a(u.target.value),
        onBlur: o,
        onKeyDown: (u) => {
          u.key === "Enter" && o(), u.key === "Escape" && (d(), u.target.blur());
        }
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, Sn = {
  type: "youtube",
  empty: (e) => !e || typeof e == "object" && !e.url,
  Control: An,
  View: ({ value: e }) => {
    const t = typeof e == "object" && e !== null ? e : { url: String(e ?? "") }, l = fn(t);
    return t.url ? /* @__PURE__ */ r("a", { className: "bd-youtube", href: ue(t.url), target: "_blank", rel: "noopener noreferrer", children: l ? /* @__PURE__ */ r("img", { src: l, alt: "video" }) : String(t.url) }) : null;
  }
}, $n = {
  type: "json",
  Control: fe(
    // same bytes as the vanilla control: parse or null, with the invalid flag raised
    (e, t) => {
      var l, n, i;
      if (!e)
        return (l = t.invalid) == null || l.call(t, null), null;
      try {
        return (n = t.invalid) == null || n.call(t, null), JSON.parse(e) ?? null;
      } catch {
        return (i = t.invalid) == null || i.call(t, "Invalid JSON"), null;
      }
    },
    (e) => e == null ? "" : JSON.stringify(e, null, 2)
  ),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-json", children: /* @__PURE__ */ r("pre", { children: JSON.stringify(e, null, 2) }) })
}, pe = ["plain", "javascript", "typescript", "python", "php", "ruby", "go", "rust", "java", "c", "cpp", "csharp", "html", "css", "sql", "shell", "json", "yaml", "markdown"], kn = (e) => {
  const [t, l] = U(e), n = (t == null ? void 0 : t.language) ?? null, [i] = w(!1), { draft: s, setDraft: a, flush: o, cancel: d } = ee({
    value: (t == null ? void 0 : t.content) ?? "",
    commit: (f) => l(f ? { content: f, language: n } : null)
  }), u = n && !pe.includes(n) ? [...pe, n] : pe;
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-code", children: [
    /* @__PURE__ */ r(
      "select",
      {
        value: n ?? "plain",
        onChange: (f) => {
          const c = f.target.value === "plain" ? null : f.target.value;
          s && l({ content: s, language: c });
        },
        children: u.map((f) => /* @__PURE__ */ r("option", { value: f, children: f }, f))
      }
    ),
    /* @__PURE__ */ r(
      "textarea",
      {
        rows: e.config.rows ?? 10,
        spellCheck: !1,
        value: s,
        onChange: (f) => a(f.target.value),
        onBlur: o,
        onKeyDown: (f) => {
          f.key === "Escape" && (d(), f.target.blur());
        }
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status }),
    i ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: "Invalid" }) : null
  ] });
}, On = {
  type: "code",
  empty: (e) => !(e != null && e.content),
  Control: kn,
  View: ({ value: e, config: t }) => e != null && e.content ? /* @__PURE__ */ A("div", { className: `bd-code${e.language ? ` bd-code-${e.language}` : ""}`, children: [
    t != null && t.showLanguage && e.language ? /* @__PURE__ */ r("span", { className: "bd-code-language", children: e.language }) : null,
    /* @__PURE__ */ r("pre", { children: /* @__PURE__ */ r("code", { children: e.content }) })
  ] }) : null
};
function ht(e) {
  const t = (i) => i ? e ? i.replace(" ", "T").slice(0, 16) : i.slice(0, 10) : "", l = (i) => {
    if (!i)
      return null;
    if (!e)
      return i;
    const s = i.replace("T", " ");
    return s.length === 16 ? `${s}:00` : s;
  };
  return (i) => {
    const [s, a] = U(i);
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-date", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: e ? "datetime-local" : "date",
          value: t(s),
          onChange: (o) => a(l(o.target.value))
        }
      ),
      /* @__PURE__ */ r(P, { status: i.status })
    ] });
  };
}
const Mn = {
  type: "date",
  empty: (e) => !e,
  Control: ht(!1),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-date", children: String(e) })
}, En = {
  type: "datetime",
  empty: (e) => !e,
  defaultConfig: { time: !0 },
  Control: ht(!0),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-datetime", children: String(e) })
}, te = ({ items: e, search: t, multiple: l, value: n, onChange: i, placeholder: s, selectedLabels: a, required: o, status: d }) => {
  const [u, f] = w(!1), [c, b] = w(""), [m, h] = w(e ?? []), [v, N] = w(!1), O = _(null), [S, $] = w({ ...a });
  L(() => {
    e && h(e);
  }, [e]), L(() => {
    a && $((C) => ({ ...C, ...a }));
  }, [a]), L(() => {
    if (!t || !u)
      return;
    let C = !1;
    N(!0);
    const y = setTimeout(() => {
      t(c).then((E) => {
        C || h(E);
      }).catch((E) => console.error("[BlitzUIManagerReact] picker search failed:", (E == null ? void 0 : E.message) ?? E)).finally(() => {
        C || N(!1);
      });
    }, c ? 500 : 0);
    return () => {
      C = !0, clearTimeout(y);
    };
  }, [t, c, u]), L(() => {
    if (!u)
      return;
    const C = (y) => {
      var E;
      (E = O.current) != null && E.contains(y.target) || f(!1);
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [u]), L(() => {
    m.length && $((C) => ({ ...C, ...Object.fromEntries(m.map((y) => [y.value, y.label])) }));
  }, [m]);
  const T = (C) => C.map((y) => m.find((E) => E.value === y) ?? { value: y, label: S[y] ?? y }), M = (C) => {
    if (l) {
      const y = n.includes(C.value) ? n.filter((E) => E !== C.value) : [...n, C.value];
      i(T(y));
    } else
      i([C]), f(!1);
  }, D = () => {
    i([]), f(!1);
  }, x = n.length ? n.map((C) => S[C] ?? C).join(", ") : s ?? "Select…", F = t ? m : m.filter((C) => !c || typeof C.label == "string" && C.label.toLowerCase().includes(c.toLowerCase()));
  return /* @__PURE__ */ A("div", { className: "bd-picker", ref: O, children: [
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        className: `bd-picker-display${n.length ? "" : " bd-picker-placeholder"}`,
        onClick: () => f((C) => !C),
        onKeyDown: (C) => {
          C.key === "Escape" && f(!1);
        },
        children: x
      }
    ),
    /* @__PURE__ */ r(P, { status: d }),
    u ? /* @__PURE__ */ A("div", { className: "bd-picker-menu", children: [
      t || m.length > 7 ? /* @__PURE__ */ r(
        "input",
        {
          className: "bd-picker-search",
          autoFocus: !0,
          value: c,
          placeholder: "Search…",
          onChange: (C) => b(C.target.value),
          onKeyDown: (C) => {
            C.key === "Escape" && f(!1);
          }
        }
      ) : null,
      /* @__PURE__ */ A("ul", { className: "bd-picker-options", role: "listbox", children: [
        !o && !l && n.length ? /* @__PURE__ */ r("li", { className: "bd-picker-clear", onClick: D, children: "Clear" }) : null,
        v ? /* @__PURE__ */ r("li", { className: "bd-picker-loading", children: "Loading…" }) : null,
        !v && F.length === 0 ? /* @__PURE__ */ r("li", { className: "bd-picker-loading", children: "No results" }) : null,
        F.map((C) => /* @__PURE__ */ A(
          "li",
          {
            role: "option",
            "aria-selected": n.includes(C.value),
            className: n.includes(C.value) ? "selected" : "",
            onClick: () => M(C),
            children: [
              l ? /* @__PURE__ */ r("input", { type: "checkbox", readOnly: !0, checked: n.includes(C.value) }) : null,
              C.label
            ]
          },
          C.value
        ))
      ] })
    ] }) : null
  ] });
}, Tn = (e) => e.charAt(0).toUpperCase() + e.slice(1), bt = (e) => {
  var s, a;
  const t = e.attributeDetails.options ?? e.config.options ?? [], l = e.config.excludeOptions ?? [], n = (s = e.attributeDetails) == null ? void 0 : s.options_labels, i = ((a = e.settings) == null ? void 0 : a.language) ?? "en";
  return t.filter((o) => !l.includes(o)).map((o) => ({ value: o, label: jt(n, o, i, Tn(o)) }));
}, Ln = (e) => {
  const [t, l] = U(e), n = !!e.config.multiple, i = ke(t);
  return /* @__PURE__ */ r(
    te,
    {
      items: bt(e),
      multiple: n,
      value: i,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (s) => {
        const a = s.map((o) => o.value);
        n ? ot(e, i, a) : l(a[0] ?? null);
      }
    }
  );
}, Fn = (e) => {
  const t = e.value, [l, n] = w((t == null ? void 0 : t.values) ?? []);
  return /* @__PURE__ */ r(
    te,
    {
      items: bt(e),
      multiple: !0,
      value: l,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (i) => {
        const s = i.map((a) => a.value);
        n(s), e.onChange(s.length ? { op: "in", values: s } : null);
      }
    }
  );
}, In = {
  type: ["enum", "enum[]"],
  Control: Ln,
  Filter: Fn,
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-enum", children: /* @__PURE__ */ r("p", { children: ct(e) }) })
}, Dn = [
  {
    code: "AF",
    dial: "+93"
  },
  {
    code: "AX",
    dial: "+358"
  },
  {
    code: "AL",
    dial: "+355"
  },
  {
    code: "DZ",
    dial: "+213"
  },
  {
    code: "AS",
    dial: "+1684"
  },
  {
    code: "AD",
    dial: "+376"
  },
  {
    code: "AO",
    dial: "+244"
  },
  {
    code: "AI",
    dial: "+1264"
  },
  {
    code: "AQ",
    dial: "+672"
  },
  {
    code: "AG",
    dial: "+1268"
  },
  {
    code: "AR",
    dial: "+54"
  },
  {
    code: "AM",
    dial: "+374"
  },
  {
    code: "AW",
    dial: "+297"
  },
  {
    code: "AU",
    dial: "+61"
  },
  {
    code: "AT",
    dial: "+43"
  },
  {
    code: "AZ",
    dial: "+994"
  },
  {
    code: "BS",
    dial: "+1242"
  },
  {
    code: "BH",
    dial: "+973"
  },
  {
    code: "BD",
    dial: "+880"
  },
  {
    code: "BB",
    dial: "+1246"
  },
  {
    code: "BY",
    dial: "+375"
  },
  {
    code: "BE",
    dial: "+32"
  },
  {
    code: "BZ",
    dial: "+501"
  },
  {
    code: "BJ",
    dial: "+229"
  },
  {
    code: "BM",
    dial: "+1441"
  },
  {
    code: "BT",
    dial: "+975"
  },
  {
    code: "BO",
    dial: "+591"
  },
  {
    code: "BA",
    dial: "+387"
  },
  {
    code: "BW",
    dial: "+267"
  },
  {
    code: "BR",
    dial: "+55"
  },
  {
    code: "IO",
    dial: "+246"
  },
  {
    code: "BN",
    dial: "+673"
  },
  {
    code: "BG",
    dial: "+359"
  },
  {
    code: "BF",
    dial: "+226"
  },
  {
    code: "BI",
    dial: "+257"
  },
  {
    code: "KH",
    dial: "+855"
  },
  {
    code: "CM",
    dial: "+237"
  },
  {
    code: "CA",
    dial: "+1"
  },
  {
    code: "CV",
    dial: "+238"
  },
  {
    code: "KY",
    dial: "+ 345"
  },
  {
    code: "CF",
    dial: "+236"
  },
  {
    code: "TD",
    dial: "+235"
  },
  {
    code: "CL",
    dial: "+56"
  },
  {
    code: "CN",
    dial: "+86"
  },
  {
    code: "CX",
    dial: "+61"
  },
  {
    code: "CC",
    dial: "+61"
  },
  {
    code: "CO",
    dial: "+57"
  },
  {
    code: "KM",
    dial: "+269"
  },
  {
    code: "CG",
    dial: "+242"
  },
  {
    code: "CD",
    dial: "+243"
  },
  {
    code: "CK",
    dial: "+682"
  },
  {
    code: "CR",
    dial: "+506"
  },
  {
    code: "CI",
    dial: "+225"
  },
  {
    code: "HR",
    dial: "+385"
  },
  {
    code: "CU",
    dial: "+53"
  },
  {
    code: "CY",
    dial: "+357"
  },
  {
    code: "CZ",
    dial: "+420"
  },
  {
    code: "DK",
    dial: "+45"
  },
  {
    code: "DJ",
    dial: "+253"
  },
  {
    code: "DM",
    dial: "+1767"
  },
  {
    code: "DO",
    dial: "+1849"
  },
  {
    code: "EC",
    dial: "+593"
  },
  {
    code: "EG",
    dial: "+20"
  },
  {
    code: "SV",
    dial: "+503"
  },
  {
    code: "GQ",
    dial: "+240"
  },
  {
    code: "ER",
    dial: "+291"
  },
  {
    code: "EE",
    dial: "+372"
  },
  {
    code: "ET",
    dial: "+251"
  },
  {
    code: "FK",
    dial: "+500"
  },
  {
    code: "FO",
    dial: "+298"
  },
  {
    code: "FJ",
    dial: "+679"
  },
  {
    code: "FI",
    dial: "+358"
  },
  {
    code: "FR",
    dial: "+33"
  },
  {
    code: "GF",
    dial: "+594"
  },
  {
    code: "PF",
    dial: "+689"
  },
  {
    code: "GA",
    dial: "+241"
  },
  {
    code: "GM",
    dial: "+220"
  },
  {
    code: "GE",
    dial: "+995"
  },
  {
    code: "DE",
    dial: "+49"
  },
  {
    code: "GH",
    dial: "+233"
  },
  {
    code: "GI",
    dial: "+350"
  },
  {
    code: "GR",
    dial: "+30"
  },
  {
    code: "GL",
    dial: "+299"
  },
  {
    code: "GD",
    dial: "+1473"
  },
  {
    code: "GP",
    dial: "+590"
  },
  {
    code: "GU",
    dial: "+1671"
  },
  {
    code: "GT",
    dial: "+502"
  },
  {
    code: "GG",
    dial: "+44"
  },
  {
    code: "GN",
    dial: "+224"
  },
  {
    code: "GW",
    dial: "+245"
  },
  {
    code: "GY",
    dial: "+595"
  },
  {
    code: "HT",
    dial: "+509"
  },
  {
    code: "VA",
    dial: "+379"
  },
  {
    code: "HN",
    dial: "+504"
  },
  {
    code: "HK",
    dial: "+852"
  },
  {
    code: "HU",
    dial: "+36"
  },
  {
    code: "IS",
    dial: "+354"
  },
  {
    code: "IN",
    dial: "+91"
  },
  {
    code: "ID",
    dial: "+62"
  },
  {
    code: "IR",
    dial: "+98"
  },
  {
    code: "IQ",
    dial: "+964"
  },
  {
    code: "IE",
    dial: "+353"
  },
  {
    code: "IM",
    dial: "+44"
  },
  {
    code: "IL",
    dial: "+972"
  },
  {
    code: "IT",
    dial: "+39"
  },
  {
    code: "JM",
    dial: "+1876"
  },
  {
    code: "JP",
    dial: "+81"
  },
  {
    code: "JE",
    dial: "+44"
  },
  {
    code: "JO",
    dial: "+962"
  },
  {
    code: "KZ",
    dial: "+77"
  },
  {
    code: "KE",
    dial: "+254"
  },
  {
    code: "KI",
    dial: "+686"
  },
  {
    code: "KP",
    dial: "+850"
  },
  {
    code: "KR",
    dial: "+82"
  },
  {
    code: "KW",
    dial: "+965"
  },
  {
    code: "KG",
    dial: "+996"
  },
  {
    code: "LA",
    dial: "+856"
  },
  {
    code: "LV",
    dial: "+371"
  },
  {
    code: "LB",
    dial: "+961"
  },
  {
    code: "LS",
    dial: "+266"
  },
  {
    code: "LR",
    dial: "+231"
  },
  {
    code: "LY",
    dial: "+218"
  },
  {
    code: "LI",
    dial: "+423"
  },
  {
    code: "LT",
    dial: "+370"
  },
  {
    code: "LU",
    dial: "+352"
  },
  {
    code: "MO",
    dial: "+853"
  },
  {
    code: "MK",
    dial: "+389"
  },
  {
    code: "MG",
    dial: "+261"
  },
  {
    code: "MW",
    dial: "+265"
  },
  {
    code: "MY",
    dial: "+60"
  },
  {
    code: "MV",
    dial: "+960"
  },
  {
    code: "ML",
    dial: "+223"
  },
  {
    code: "MT",
    dial: "+356"
  },
  {
    code: "MH",
    dial: "+692"
  },
  {
    code: "MQ",
    dial: "+596"
  },
  {
    code: "MR",
    dial: "+222"
  },
  {
    code: "MU",
    dial: "+230"
  },
  {
    code: "YT",
    dial: "+262"
  },
  {
    code: "MX",
    dial: "+52"
  },
  {
    code: "FM",
    dial: "+691"
  },
  {
    code: "MD",
    dial: "+373"
  },
  {
    code: "MC",
    dial: "+377"
  },
  {
    code: "MN",
    dial: "+976"
  },
  {
    code: "ME",
    dial: "+382"
  },
  {
    code: "MS",
    dial: "+1664"
  },
  {
    code: "MA",
    dial: "+212"
  },
  {
    code: "MZ",
    dial: "+258"
  },
  {
    code: "MM",
    dial: "+95"
  },
  {
    code: "NA",
    dial: "+264"
  },
  {
    code: "NR",
    dial: "+674"
  },
  {
    code: "NP",
    dial: "+977"
  },
  {
    code: "NL",
    dial: "+31"
  },
  {
    code: "AN",
    dial: "+599"
  },
  {
    code: "NC",
    dial: "+687"
  },
  {
    code: "NZ",
    dial: "+64"
  },
  {
    code: "NI",
    dial: "+505"
  },
  {
    code: "NE",
    dial: "+227"
  },
  {
    code: "NG",
    dial: "+234"
  },
  {
    code: "NU",
    dial: "+683"
  },
  {
    code: "NF",
    dial: "+672"
  },
  {
    code: "MP",
    dial: "+1670"
  },
  {
    code: "NO",
    dial: "+47"
  },
  {
    code: "OM",
    dial: "+968"
  },
  {
    code: "PK",
    dial: "+92"
  },
  {
    code: "PW",
    dial: "+680"
  },
  {
    code: "PS",
    dial: "+970"
  },
  {
    code: "PA",
    dial: "+507"
  },
  {
    code: "PG",
    dial: "+675"
  },
  {
    code: "PY",
    dial: "+595"
  },
  {
    code: "PE",
    dial: "+51"
  },
  {
    code: "PH",
    dial: "+63"
  },
  {
    code: "PN",
    dial: "+872"
  },
  {
    code: "PL",
    dial: "+48"
  },
  {
    code: "PT",
    dial: "+351"
  },
  {
    code: "PR",
    dial: "+1939"
  },
  {
    code: "QA",
    dial: "+974"
  },
  {
    code: "RO",
    dial: "+40"
  },
  {
    code: "RU",
    dial: "+7"
  },
  {
    code: "RW",
    dial: "+250"
  },
  {
    code: "RE",
    dial: "+262"
  },
  {
    code: "BL",
    dial: "+590"
  },
  {
    code: "SH",
    dial: "+290"
  },
  {
    code: "KN",
    dial: "+1869"
  },
  {
    code: "LC",
    dial: "+1758"
  },
  {
    code: "MF",
    dial: "+590"
  },
  {
    code: "PM",
    dial: "+508"
  },
  {
    code: "VC",
    dial: "+1784"
  },
  {
    code: "WS",
    dial: "+685"
  },
  {
    code: "SM",
    dial: "+378"
  },
  {
    code: "ST",
    dial: "+239"
  },
  {
    code: "SA",
    dial: "+966"
  },
  {
    code: "SN",
    dial: "+221"
  },
  {
    code: "RS",
    dial: "+381"
  },
  {
    code: "SC",
    dial: "+248"
  },
  {
    code: "SL",
    dial: "+232"
  },
  {
    code: "SG",
    dial: "+65"
  },
  {
    code: "SK",
    dial: "+421"
  },
  {
    code: "SI",
    dial: "+386"
  },
  {
    code: "SB",
    dial: "+677"
  },
  {
    code: "SO",
    dial: "+252"
  },
  {
    code: "ZA",
    dial: "+27"
  },
  {
    code: "SS",
    dial: "+211"
  },
  {
    code: "GS",
    dial: "+500"
  },
  {
    code: "ES",
    dial: "+34"
  },
  {
    code: "LK",
    dial: "+94"
  },
  {
    code: "SD",
    dial: "+249"
  },
  {
    code: "SR",
    dial: "+597"
  },
  {
    code: "SJ",
    dial: "+47"
  },
  {
    code: "SZ",
    dial: "+268"
  },
  {
    code: "SE",
    dial: "+46"
  },
  {
    code: "CH",
    dial: "+41"
  },
  {
    code: "SY",
    dial: "+963"
  },
  {
    code: "TW",
    dial: "+886"
  },
  {
    code: "TJ",
    dial: "+992"
  },
  {
    code: "TZ",
    dial: "+255"
  },
  {
    code: "TH",
    dial: "+66"
  },
  {
    code: "TL",
    dial: "+670"
  },
  {
    code: "TG",
    dial: "+228"
  },
  {
    code: "TK",
    dial: "+690"
  },
  {
    code: "TO",
    dial: "+676"
  },
  {
    code: "TT",
    dial: "+1868"
  },
  {
    code: "TN",
    dial: "+216"
  },
  {
    code: "TR",
    dial: "+90"
  },
  {
    code: "TM",
    dial: "+993"
  },
  {
    code: "TC",
    dial: "+1649"
  },
  {
    code: "TV",
    dial: "+688"
  },
  {
    code: "UG",
    dial: "+256"
  },
  {
    code: "UA",
    dial: "+380"
  },
  {
    code: "AE",
    dial: "+971"
  },
  {
    code: "GB",
    dial: "+44"
  },
  {
    code: "US",
    dial: "+1"
  },
  {
    code: "UY",
    dial: "+598"
  },
  {
    code: "UZ",
    dial: "+998"
  },
  {
    code: "VU",
    dial: "+678"
  },
  {
    code: "VE",
    dial: "+58"
  },
  {
    code: "VN",
    dial: "+84"
  },
  {
    code: "VG",
    dial: "+1284"
  },
  {
    code: "VI",
    dial: "+1340"
  },
  {
    code: "WF",
    dial: "+681"
  },
  {
    code: "YE",
    dial: "+967"
  },
  {
    code: "ZM",
    dial: "+260"
  },
  {
    code: "ZW",
    dial: "+263"
  }
];
function xn(e, t, l = !1) {
  const n = e.replace(/[^\d+]/g, ""), i = [];
  if (n.length === 10)
    i.push(n.slice(0, 3)), i.push(n.slice(3, 6)), i.push(n.slice(6, 8)), i.push(n.slice(8, 10));
  else if (n.length === 9)
    i.push(n.slice(0, 3)), i.push(n.slice(3, 6)), i.push(n.slice(6, 9));
  else if (n.length === 11)
    i.push(n.slice(0, 3)), i.push(n.slice(3, 7)), i.push(n.slice(7, 11));
  else
    for (let a = 0; a < n.length; a += 3)
      i.push(n.slice(a, a + 3));
  const s = i.filter(Boolean).join(" ");
  return t && l ? `${t} ${s}` : s;
}
const jn = /^[0-9]{7,14}$/, yt = (e, t) => {
  if (!e)
    return { dial: t, digits: "" };
  const l = e.indexOf("-");
  return l === -1 ? { dial: t, digits: e } : { dial: e.slice(0, l), digits: e.slice(l + 1) };
}, _n = (e) => {
  const [t, l] = U(e), n = e.config.defaultDialCode ?? "+1", { dial: i, digits: s } = yt(t, n), a = R(() => {
    const c = /* @__PURE__ */ new Set();
    return Dn.filter((b) => c.has(b.dial) ? !1 : (c.add(b.dial), !0));
  }, []), { draft: o, setDraft: d, flush: u, cancel: f } = ee({
    value: s,
    commit: (c) => l(c ? `${i}-${c}` : null),
    validate: (c) => c === "" || jn.test(c)
  });
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-phone", children: [
    /* @__PURE__ */ r(
      "select",
      {
        value: i,
        onChange: (c) => {
          s && l(`${c.target.value}-${s}`);
        },
        children: a.map((c) => /* @__PURE__ */ A("option", { value: c.dial, children: [
          c.code,
          " ",
          c.dial
        ] }, c.dial))
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        type: "tel",
        value: o,
        placeholder: e.config.placeholder ?? "phone number",
        onChange: (c) => d(c.target.value.replace(/[^0-9]/g, "")),
        onBlur: u,
        onKeyDown: (c) => {
          c.key === "Enter" && u(), c.key === "Escape" && (f(), c.target.blur());
        }
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, Un = {
  type: "phone",
  empty: (e) => !e,
  Control: _n,
  View: ({ value: e }) => {
    const { dial: t, digits: l } = yt(String(e ?? ""), "");
    return /* @__PURE__ */ A("p", { className: "bd-phone", children: [
      t ? `${t} ` : "",
      xn(l)
    ] });
  }
}, vt = Et(rt), Sl = vt.Provider;
function H() {
  return Tt(vt);
}
const re = (e) => {
  var l;
  const t = ((l = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : l.call(e)) ?? {};
  for (const [n, i] of Object.entries(t)) {
    if (n.startsWith("_") || n.startsWith("@"))
      continue;
    const s = Array.isArray(i == null ? void 0 : i.type) ? i.type[0] : i == null ? void 0 : i.type;
    if (s === "varchar" || s === "text")
      return n;
  }
  return null;
}, Ye = (e, t) => {
  var i, s;
  const l = ((i = e == null ? void 0 : e._blitzID) == null ? void 0 : i.value) ?? "", n = (t ? (s = e == null ? void 0 : e[t]) == null ? void 0 : s.value : null) ?? l;
  return { value: String(l), label: String(n), obj: e };
};
function Me(e, t) {
  const l = Array.isArray(e.attributeDetails.type) ? e.attributeDetails.type[0] : e.attributeDetails.type, [n, i] = w(null), [s, a] = w({});
  L(() => {
    let u = !1;
    if (l)
      return e.resolveModel(String(l)).then((f) => {
        u || i(f);
      }).catch((f) => console.error("[BlitzUIManagerReact] fk model resolve failed:", (f == null ? void 0 : f.message) ?? f)), () => {
        u = !0;
      };
  }, [l]);
  const o = t.join(",");
  return L(() => {
    if (!n || !t.length)
      return;
    let u = !1;
    const f = re(n);
    return Promise.all(t.map((c) => n.get(c).catch(() => null))).then((c) => {
      if (u)
        return;
      const b = {};
      for (const m of c) {
        if (!m)
          continue;
        const h = Ye(m, f);
        b[h.value] = h.label;
      }
      a(b);
    }), () => {
      u = !0;
    };
  }, [n, o]), { search: R(() => {
    if (n)
      return async (u) => {
        const f = re(n), c = u && f ? [[f, "LIKE", `%${u}%`]] : void 0;
        return (await n.list({ conditions: c, limit: e.config.limit ?? 100 })).map((m) => Ye(m, f));
      };
  }, [n, e.config.limit]), labels: s, ready: !!n };
}
const Vn = (e) => {
  var a;
  const [t, l] = U(e), n = t == null || t === "" ? [] : [String(((a = t == null ? void 0 : t._blitzID) == null ? void 0 : a.value) ?? t)], { search: i, labels: s } = Me(e, n);
  return /* @__PURE__ */ r(
    te,
    {
      search: i,
      value: n,
      selectedLabels: s,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (o) => {
        var d;
        return l(((d = o[0]) == null ? void 0 : d.value) ?? null);
      }
    }
  );
}, Bn = (e) => {
  const [t] = U(e), l = ke(t), { search: n, labels: i } = Me(e, l);
  return /* @__PURE__ */ r(
    te,
    {
      search: n,
      multiple: !0,
      value: l,
      selectedLabels: i,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (s) => ot(e, l, s.map((a) => a.value))
    }
  );
}, pt = (e) => {
  const t = e.value, [l, n] = w((t == null ? void 0 : t.values) ?? []), { search: i, labels: s } = Me(e, l);
  return /* @__PURE__ */ r(
    te,
    {
      search: i,
      multiple: !0,
      value: l,
      selectedLabels: s,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (a) => {
        const o = a.map((d) => d.value);
        n(o), e.onChange(o.length ? { op: "in", values: o } : null);
      }
    }
  );
}, Ct = ({ value: e, attributeDetails: t }) => {
  const l = H(), n = ke(e), [i, s] = w({}), a = Array.isArray(t == null ? void 0 : t.type) ? t == null ? void 0 : t.type[0] : t == null ? void 0 : t.type, o = n.join(",");
  return L(() => {
    if (!a || !n.length)
      return;
    let d = !1;
    return (async () => {
      var u;
      try {
        const f = await l.resolveModel(String(a)), c = re(f);
        if (!c)
          return;
        const b = {};
        for (const m of n) {
          const h = await f.get(m).catch(() => null), v = (u = h == null ? void 0 : h[c]) == null ? void 0 : u.value;
          v != null && (b[m] = String(v));
        }
        !d && Object.keys(b).length && s(b);
      } catch {
      }
    })(), () => {
      d = !0;
    };
  }, [o, a]), /* @__PURE__ */ r("p", { className: "bd-fk", children: n.map((d) => i[d] ?? d).join(", ") });
}, Rn = {
  type: "fk",
  Control: Vn,
  Filter: pt,
  View: Ct
}, Pn = {
  type: "mtm",
  default: () => null,
  Control: Bn,
  Filter: pt,
  View: Ct
}, Xe = (e, t) => {
  var i, s;
  const l = ((i = e == null ? void 0 : e._blitzID) == null ? void 0 : i.value) ?? "", n = (t ? (s = e == null ? void 0 : e[t]) == null ? void 0 : s.value : null) ?? l;
  return { value: String(l), label: String(n), obj: e };
}, zn = (e) => e.filter((t, l, n) => n.findIndex((i) => i.value === t.value) === l);
function Kn(e, t) {
  const l = e.config.usersModel, [n, i] = w(null), [s, a] = w({});
  L(() => {
    let f = !1;
    if (l)
      return e.resolveModel(String(l)).then((c) => {
        f || i(c);
      }).catch((c) => console.error("[BlitzUIManagerReact] user model resolve failed:", (c == null ? void 0 : c.message) ?? c)), () => {
        f = !0;
      };
  }, [l]);
  const o = n ? e.config.labelAttribute ?? re(n) : null, d = t.join(",");
  return L(() => {
    if (!n || !t.length)
      return;
    let f = !1;
    return Promise.all(t.map((c) => n.get(c).catch(() => null))).then((c) => {
      if (f)
        return;
      const b = {};
      for (const m of c) {
        if (!m)
          continue;
        const h = Xe(m, o);
        b[h.value] = h.label;
      }
      a(b);
    }), () => {
      f = !0;
    };
  }, [n, d, o]), { search: R(() => {
    if (n)
      return async (f) => {
        const c = f && o ? [[o, "LIKE", `%${f}%`]] : void 0, b = await n.list({ conditions: c, limit: e.config.limit ?? 100 });
        return zn(b.map((m) => Xe(m, o)));
      };
  }, [n, o, e.config.limit]), labels: s };
}
const Gn = (e) => {
  const t = e.value, [l, n] = w((t == null ? void 0 : t.values) ?? []), { search: i, labels: s } = Kn(e, l);
  return /* @__PURE__ */ r(
    te,
    {
      search: i,
      multiple: !0,
      value: l,
      selectedLabels: s,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (a) => {
        const o = a.map((d) => d.value);
        n(o), e.onChange(o.length ? { op: "in", values: o } : null);
      }
    }
  );
}, Wn = {
  type: "user",
  defaultConfig: { usersModel: "0BAUsers", labelAttribute: "username" },
  Filter: Gn
};
function Ee(e) {
  const { accept: t, multiple: l, service: n, commit: i, preview: s } = e;
  return (o) => {
    const [d, u] = U(o), [f, c] = w(!1), [b, m] = w(null), h = _(null), v = o.services[n], N = async (O) => {
      if (O != null && O.length) {
        if (!v) {
          m(`No '${n}' service configured`);
          return;
        }
        c(!0), m(null);
        try {
          const S = [];
          for (const $ of Array.from(O))
            S.push(await v($));
          u(i(S));
        } catch (S) {
          m((S == null ? void 0 : S.message) ?? "Upload failed");
        } finally {
          c(!1), h.current && (h.current.value = "");
        }
      }
    };
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-upload", children: [
      s && d != null ? /* @__PURE__ */ r(s, { value: d }) : null,
      /* @__PURE__ */ r(
        "input",
        {
          ref: h,
          type: "file",
          accept: t,
          multiple: l,
          disabled: f,
          onChange: (O) => void N(O.target.files)
        }
      ),
      f ? /* @__PURE__ */ r("span", { className: "bd-uploading", children: "Uploading…" }) : null,
      b ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: b }) : null,
      /* @__PURE__ */ r(P, { status: o.status })
    ] });
  };
}
const Zn = (e) => e != null && e.base && typeof e.sd == "string" ? `${e.base}${e.sd.substring(1)}` : null, Qe = ({ value: e }) => {
  const t = Se(Array.isArray(e) ? e : [e]);
  return /* @__PURE__ */ r("span", { className: "bd-image-previews", children: t.map((l, n) => {
    const i = Zn(l);
    return i ? /* @__PURE__ */ r("img", { src: i, alt: "" }, n) : null;
  }) });
}, Hn = {
  type: ["image", "image[]"],
  default: () => [],
  // the service returns ImageRawType; a single image is still stored as an array
  Control: Ee({ accept: "image/*", multiple: !0, service: "upload", commit: (e) => e, preview: Qe }),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-image", children: /* @__PURE__ */ r(Qe, { value: e }) })
}, Jn = {
  type: "file",
  Control: Ee({ service: "uploadFile", commit: (e) => e[0] }),
  View: ({ value: e }) => {
    const t = typeof e == "string" ? e : e == null ? void 0 : e.url;
    return t ? /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("a", { className: "bd-file", href: ue(t), target: "_blank", rel: "noopener noreferrer", children: "Link" }) }) : null;
  }
}, qn = {
  type: "video",
  Control: Ee({ accept: ".mp4,.m4v,.mov", service: "uploadVideo", commit: (e) => e[0] }),
  View: ({ value: e }) => {
    const t = e == null ? void 0 : e.url;
    return t ? /* @__PURE__ */ r("video", { className: "bd-video", controls: !0, children: /* @__PURE__ */ r("source", { src: ue(t) }) }) : null;
  }
}, et = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/", we = {
  geocoderUrl: "https://nominatim.openstreetmap.org",
  tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  leafletUrl: `${et}leaflet.js`,
  leafletCssUrl: `${et}leaflet.css`
}, tt = {
  [we.leafletUrl]: "sha384-cxOPjt7s7Iz04uaHJceBmS+qpjv2JkIHNVcuOrM+YHwZOmJGBXI00mdUXEq65HTH",
  [we.leafletCssUrl]: "sha384-sHL9NAb7lN7rfvG5lfHpm643Xkcjzp4jFvuavGOndn6pjVqS6ny56CAt3nsEVT4H"
};
function ge(e) {
  return { ...we, ...e && typeof e == "object" ? e : {} };
}
let Ce = null;
const nt = (e, t) => new Promise((l, n) => {
  const i = document.createElement(e);
  e === "script" ? i.src = t : (i.rel = "stylesheet", i.href = t), tt[t] && (i.integrity = tt[t], i.crossOrigin = "anonymous"), i.onload = () => l(), i.onerror = () => n(new Error(`Failed to load ${t}`)), document.head.appendChild(i);
});
function Yn(e = ge()) {
  var t;
  return (t = window.L) != null && t.map ? Promise.resolve(window.L) : (Ce ?? (Ce = Promise.all([nt("link", e.leafletCssUrl), nt("script", e.leafletUrl)]).then(() => window.L).catch((l) => {
    throw Ce = null, l;
  })), Ce);
}
const Xn = (e) => e.divIcon({ className: "bd-osm-pin", html: "<span></span>", iconSize: [22, 30], iconAnchor: [11, 30] });
async function Qn(e, t, l, { draggable: n = !1, interactive: i = !0, config: s = ge() } = {}) {
  const a = await Yn(s), o = a.map(e, { trackResize: !1, scrollWheelZoom: !1, dragging: i, zoomControl: i, touchZoom: i, doubleClickZoom: i, boxZoom: i, keyboard: i }).setView([t, l], 13);
  a.tileLayer(s.tileUrl, { attribution: s.attribution, maxZoom: 19 }).addTo(o);
  const d = a.marker([t, l], { icon: Xn(a), draggable: n }).addTo(o), u = typeof ResizeObserver == "function" ? new ResizeObserver(() => {
    o.invalidateSize(), !i && e.clientWidth && (u == null || u.disconnect());
  }) : null;
  return u == null || u.observe(e), setTimeout(() => o.invalidateSize(), 0), {
    map: o,
    marker: d,
    moveTo: (f, c) => {
      d.setLatLng([f, c]), o.setView([f, c], Math.max(o.getZoom(), 13));
    },
    destroy: () => {
      u == null || u.disconnect(), o.remove();
    }
  };
}
async function el(e, t, l = ge()) {
  const n = { lat: parseFloat(e), lng: parseFloat(t) };
  if (!Number.isFinite(n.lat) || !Number.isFinite(n.lng))
    return null;
  const i = document.createElement("div");
  return i.className = "map-container bd-osm-map", await Qn(i, n.lat, n.lng, { interactive: !1, config: l }), i;
}
Promise.resolve();
const tl = [
  { key: "address", label: "Address" },
  { key: "street", label: "Street" },
  { key: "street_number", label: "Nr." },
  { key: "postal_code", label: "ZIP" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "lat", label: "Lat" },
  { key: "lng", label: "Lng" }
], nl = (e) => {
  const [t, l] = U(e), n = t !== null && typeof t == "object" ? t : {}, i = (s, a) => {
    const o = { ...n, [s]: a }, d = Object.values(o).some((u) => u !== "" && u != null);
    l(d ? o : null);
  };
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-location", children: [
    tl.map(({ key: s, label: a }) => /* @__PURE__ */ A("label", { className: "bd-location-field", children: [
      /* @__PURE__ */ r("span", { children: a }),
      /* @__PURE__ */ r("input", { value: String(n[s] ?? ""), onChange: (o) => i(s, o.target.value) })
    ] }, s)),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, ll = oe({ serialize: K }), il = ({ value: e, config: t }) => {
  const l = _(null), n = e == null ? void 0 : e.lat, i = e == null ? void 0 : e.lng, s = (t == null ? void 0 : t.apiKey) ?? (t == null ? void 0 : t.googleMapsApiKey);
  return L(() => {
    const a = t == null ? void 0 : t.openStreetMap;
    if (!s && !a || !n || !i || !l.current)
      return;
    let o = !1;
    const d = l.current;
    return (s ? Bt(String(n), String(i), s) : el(String(n), String(i), ge(a))).then((u) => {
      !o && u && d.replaceChildren(u);
    }).catch(() => {
    }), () => {
      o = !0, d.replaceChildren();
    };
  }, [n, i, s, t == null ? void 0 : t.openStreetMap]), typeof e == "string" ? /* @__PURE__ */ r("p", { className: "bd-location", children: e }) : /* @__PURE__ */ A("div", { className: "bd-location", "data-lat": n, "data-lng": i, children: [
    e != null && e.address ? /* @__PURE__ */ r("p", { className: "bd-location-address", children: e.address }) : null,
    /* @__PURE__ */ r("div", { ref: l, className: "bd-location-map" })
  ] });
}, sl = {
  type: "location",
  empty: (e) => !e,
  Control: (e) => e.config.apiKey || e.value === null || typeof e.value == "object" ? /* @__PURE__ */ r(nl, { ...e }) : /* @__PURE__ */ r(ll, { ...e }),
  View: ({ value: e, config: t }) => /* @__PURE__ */ r(il, { value: e, config: t })
}, al = /^<p id="[^"]*"><br><\/p>$/, rl = {
  type: "htmlText",
  empty: (e) => !e,
  Control: fe((e) => K(al.test(e) ? "" : e)),
  // stored HTML is trusted app content, same rule as the vanilla read path
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-html", dangerouslySetInnerHTML: { __html: String(e ?? "") } })
}, cl = [
  Ht,
  Jt,
  qt,
  ln,
  sn,
  an,
  mn,
  hn,
  bn,
  yn,
  vn,
  pn,
  Nn,
  wn,
  Sn,
  $n,
  On,
  Mn,
  En,
  In,
  Un,
  Rn,
  Pn,
  Wn,
  Hn,
  Jn,
  qn,
  sl,
  rl
];
const ol = ({ value: e }) => /* @__PURE__ */ r("span", { className: "bd-fallback", children: typeof e == "object" ? JSON.stringify(e) : String(e) });
class dl extends Lt {
  constructor() {
    super(...arguments);
    V(this, "state", { failed: !1 });
  }
  static getDerivedStateFromError() {
    return { failed: !0 };
  }
  componentDidCatch(l) {
    console.error("[BlitzUIManagerReact] surface error:", (l == null ? void 0 : l.stack) ?? (l == null ? void 0 : l.message) ?? l), this.props.onError(l);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
const ul = (e) => (l) => {
  const n = l.value;
  return /* @__PURE__ */ r(
    e,
    {
      ...l,
      value: (n == null ? void 0 : n.value) ?? null,
      onChange: (i) => l.onChange(i == null || i === "" ? null : { op: "contains", value: i })
    }
  );
}, fl = (e) => e.value !== null && e.value !== void 0 && typeof e.value == "object" ? "json" : e.kind === "draft" ? "varchar" : "text";
function gl(e, t, l, n) {
  const i = t.config.resolve(e.type, e.model, e.name, l.defaultConfig, e.mountConfig);
  return i.multiple === void 0 && e.many && (i.multiple = !0), {
    value: e.value,
    onChange: (s) => e.set(s),
    add: e.add,
    remove: e.remove,
    subscribe: i.live === !1 ? void 0 : e.subscribe,
    status: e.status,
    invalid: n,
    resolveModel: t.resolveModel,
    attributeDetails: e.attributeDetails ?? {},
    config: i,
    settings: t.settings,
    services: e.services ?? t.services
  };
}
const ml = ({ View: e, props: t, empty: l }) => {
  var i;
  const [n] = U(t);
  return l(n) ? (i = t.config) != null && i.emptyMsg ? /* @__PURE__ */ r("span", { className: "bd-empty", children: t.config.emptyMsg }) : null : /* @__PURE__ */ r(e, { value: n, attributeDetails: t.attributeDetails, config: t.config, settings: t.settings });
}, Q = ({ attribute: e, port: t, mode: l = "write", use: n, config: i, label: s, className: a }) => {
  const o = H(), [d, u] = w(null), [f, c] = w(8), b = i ? JSON.stringify(i) : "", m = R(() => t ? i ? { ...t, mountConfig: { ...t.mountConfig, ...i } } : t : Rt(e, i), [e, t, b]), h = R(() => n && typeof n == "object" ? ae(n) : n, [n]), v = R(() => o.registry.resolve(
    { type: m.type, many: m.many, model: m.model, name: m.name, hint: m.hint, use: h, maxLayer: f },
    o.debug ? (T) => console.info(`[BlitzUIManagerReact] ${T}`) : void 0
  ), [o, m, h, f]), N = R(() => gl(m, o, v, u), [m, o, v]), O = () => {
    var D;
    const T = l === "read" ? "view" : l === "filter" ? "filter" : "control", M = ((D = v.sources[T]) == null ? void 0 : D.layer) ?? 0;
    c(M - 1);
  };
  let S = null;
  if (l === "read") {
    const T = v.view ?? ol, M = v.empty ?? Ft;
    S = /* @__PURE__ */ r(ml, { View: T, props: N, empty: M });
  } else if (l === "filter") {
    let T = v.filter;
    if (!T && v.control && at.has(m.type) && (T = ul(v.control)), !T)
      return null;
    S = /* @__PURE__ */ r(T, { ...N });
  } else {
    let T = v.control;
    if (!T) {
      const M = fl(m);
      M !== m.type && (o.warn(`No usable UI for type '${m.type}' — falling back to '${M}'`), T = o.registry.resolve({ type: M, model: m.model, name: m.name, maxLayer: 0 }).control);
    }
    if (!T)
      return o.warn(`Editor for type '${m.type}' not supported`), null;
    S = /* @__PURE__ */ r(T, { ...N });
  }
  const $ = s === !0 ? q(N.attributeDetails["label-int"], N.attributeDetails.label, o.settings.language ?? "en", m.name) : s;
  return /* @__PURE__ */ A("div", { className: `bd-field bd-field-${m.type}${a ? ` ${a}` : ""}`, children: [
    $ ? /* @__PURE__ */ r("label", { className: "bd-field-label", children: $ }) : null,
    /* @__PURE__ */ r(dl, { onError: O, children: S }, `${l}-${f}`),
    d ? /* @__PURE__ */ r("p", { className: "bd-invalid-msg", children: d }) : null
  ] });
};
function me(e) {
  const t = H(), l = typeof e == "string", [n, i] = w(l ? null : e);
  return L(() => {
    if (!l) {
      i(e);
      return;
    }
    let s = !1;
    return t.resolveModel(e).then((a) => {
      s || i(a);
    }).catch((a) => t.warn(`model '${e}' failed to resolve: ${(a == null ? void 0 : a.message) ?? a}`)), () => {
      s = !0;
    };
  }, [e, l, t]), n;
}
function hl(e, t) {
  var n;
  if (t)
    return t;
  const l = ((n = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : n.call(e)) ?? {};
  return Object.keys(l).filter((i) => !i.startsWith("_") && !i.startsWith("@"));
}
const $l = (e) => {
  var N, O, S;
  const t = H(), l = me(e.model), n = _({}), [i, s] = w(null), [a, o] = w(!1), [d, u] = w(!1), f = R(() => hl(l, e.attributes), [l, e.attributes]), c = R(() => {
    var T;
    if (!l)
      return [];
    const $ = ((T = l.getAttributesDetails) == null ? void 0 : T.call(l)) ?? {};
    return f.map((M) => {
      var y, E;
      const D = $[M] ?? {}, x = Pt(n.current, M, D, l, e.config), F = t.registry.resolve({ type: x.type, many: x.many, model: x.model, name: M, hint: x.hint }), C = ((y = e.presetValues) == null ? void 0 : y[M]) ?? D.default ?? ((E = F.default) == null ? void 0 : E.call(F));
      return C !== void 0 && n.current[M] === void 0 && (n.current[M] = C), { ...x, value: n.current[M] };
    });
  }, [l, f]);
  if (L(() => () => {
    n.current = {};
  }, [l]), !l)
    return /* @__PURE__ */ r("div", { className: "bd-addform bd-loading", children: "Loading…" });
  const b = ((N = l.getAttributesDetails) == null ? void 0 : N.call(l)) ?? {}, m = t.settings.language ?? "en", h = ($) => {
    var T, M;
    return q((T = b[$]) == null ? void 0 : T["label-int"], (M = b[$]) == null ? void 0 : M.label, m, $);
  }, v = async () => {
    var M, D, x;
    s(null);
    const T = (e.requireAll ? f : e.requiredAttributes ?? []).filter((F) => n.current[F] == null);
    if (T.length) {
      s(`Missing required fields: ${T.map(h).join(", ")}`);
      return;
    }
    o(!0);
    try {
      const F = await ((M = e.beforeSubmit) == null ? void 0 : M.call(e, { ...n.current }));
      if (F) {
        s(F);
        return;
      }
      const C = await l.add({ ...n.current });
      if (!C) {
        s("An unexpected error occurred!");
        return;
      }
      (D = e.onSuccess) == null || D.call(e, C), e.onServerSuccess && ((x = C.addEventListener) == null || x.call(C, "syncStatusChange", (y) => {
        var E, j;
        (y == null ? void 0 : y.status) === "completed" ? (E = e.onServerSuccess) == null || E.call(e, C) : (y == null ? void 0 : y.status) === "failed" && s(((j = y == null ? void 0 : y.job) == null ? void 0 : j.message) ?? "Saving failed");
      })), u(!0);
    } catch (F) {
      s((F == null ? void 0 : F.message) ?? "An unexpected error occurred!");
    } finally {
      o(!1);
    }
  };
  return d ? /* @__PURE__ */ r("div", { className: `bd-addform ${((O = l.getName) == null ? void 0 : O.call(l)) ?? ""}`, children: /* @__PURE__ */ r("p", { className: "success-msg", children: e.successMessage ?? "Added successfully." }) }) : /* @__PURE__ */ A("div", { className: `bd-addform ${((S = l.getName) == null ? void 0 : S.call(l)) ?? ""}`, children: [
    c.map(($) => /* @__PURE__ */ r(
      Q,
      {
        port: $,
        mode: "write",
        label: e.withLabels ? h($.name) : void 0
      },
      $.name
    )),
    i ? /* @__PURE__ */ r("p", { className: "bd-invalid-msg", children: i }) : null,
    /* @__PURE__ */ r("button", { type: "button", className: "add-btn", disabled: a, onClick: () => void v(), children: a ? "…" : e.addButtonLabel ?? "Add" })
  ] });
}, lt = (e) => e != null && typeof e == "object" && "_attributes" in e, kl = ({ src: e, attributes: t, withLabels: l, use: n, config: i }) => {
  var d;
  const s = H(), a = R(() => Array.isArray(e) ? e : lt(e) ? (t ?? Object.keys(e._attributes ?? {}).filter((f) => !f.startsWith("_") && !f.startsWith("@")).filter((f) => {
    var c;
    return ((c = e[f]) == null ? void 0 : c.value) !== void 0;
  })).map((f) => e[f]).filter(Boolean) : e == null ? [] : [e], [e, t]), o = s.settings.language ?? "en";
  return /* @__PURE__ */ r("div", { className: `bd-object-editor${lt(e) ? ` ${((d = e._blitzID) == null ? void 0 : d.value) ?? ""}` : ""}`, children: a.map((u) => {
    var c, b, m, h;
    const f = ((h = (m = (b = (c = u._object) == null ? void 0 : c.model) == null ? void 0 : b.getAttributesDetails) == null ? void 0 : m.call(b)) == null ? void 0 : h[u._name]) ?? {};
    return /* @__PURE__ */ r(
      Q,
      {
        attribute: u,
        mode: "write",
        use: n,
        config: i,
        label: l ? q(f["label-int"], f.label, o, u._name) : void 0
      },
      u._name
    );
  }) });
}, bl = ({ object: e, attributes: t, withLabels: l, config: n }) => {
  var d, u, f, c, b, m;
  const i = H(), s = R(() => (t ?? Object.keys((e == null ? void 0 : e._attributes) ?? {})).filter((v) => !v.startsWith("_") && !v.startsWith("@")).filter((v) => {
    var N;
    return ((N = e == null ? void 0 : e[v]) == null ? void 0 : N.value) !== void 0;
  }), [e, t]);
  if (!e)
    return null;
  const a = ((f = (u = (d = e._object) == null ? void 0 : d.model) == null ? void 0 : u.getAttributesDetails) == null ? void 0 : f.call(u)) ?? ((b = (c = e.model) == null ? void 0 : c.getAttributesDetails) == null ? void 0 : b.call(c)) ?? {}, o = i.settings.language ?? "en";
  return /* @__PURE__ */ r("div", { className: `bd-objectview ${((m = e._blitzID) == null ? void 0 : m.value) ?? ""}`, children: s.map((h) => {
    var v, N;
    return /* @__PURE__ */ r(
      Q,
      {
        attribute: e[h],
        mode: "read",
        config: n,
        label: l ? q((v = a[h]) == null ? void 0 : v["label-int"], (N = a[h]) == null ? void 0 : N.label, o, h) : void 0
      },
      h
    );
  }) });
};
function yl(e, t) {
  const [l, n] = w([]), [i, s] = w(!1), a = t ? JSON.stringify(t) : "";
  return L(() => {
    if (!e)
      return;
    s(!1);
    const o = e.subscribeToList(t, (d) => {
      n([...d.items ?? []]), d.nextSource || s(!0);
    }, !0);
    return () => {
      o == null || o();
    };
  }, [e, a]), { items: l, settled: i };
}
const Ol = (e) => {
  var f;
  const t = me(e.model), { items: l, settled: n } = yl(t, e.options), [i, s] = w(1), a = e.objectsPerPage ?? 10, o = R(() => {
    let c = e.filter ? l.filter(e.filter) : [...l];
    return e.sort && c.sort(e.sort), c;
  }, [l, e.filter, e.sort]);
  L(() => {
    s(1);
  }, [e.filter]);
  const d = e.pagination ? Math.max(1, Math.ceil(o.length / a)) : 1, u = e.pagination ? o.slice((i - 1) * a, i * a) : o;
  return !n && l.length === 0 ? /* @__PURE__ */ r("div", { className: "bd-list bd-loading", children: e.loading ?? /* @__PURE__ */ r("span", { className: "spinner", children: "Loading…" }) }) : /* @__PURE__ */ A("div", { className: `bd-list ${((f = t == null ? void 0 : t.getName) == null ? void 0 : f.call(t)) ?? ""}`, children: [
    o.length === 0 && n ? /* @__PURE__ */ r("p", { className: "bd-list-empty", children: e.noResultsMessage ?? "No results." }) : u.map((c) => {
      var b, m;
      return /* @__PURE__ */ r(
        "div",
        {
          className: `card ${((b = c._blitzID) == null ? void 0 : b.value) ?? ""}`,
          onClick: e.onObjectClick ? () => e.onObjectClick(c) : void 0,
          children: e.renderRow ? e.renderRow(c) : /* @__PURE__ */ r(bl, { object: c, attributes: e.attributes, withLabels: e.withLabels })
        },
        (m = c._blitzID) == null ? void 0 : m.value
      );
    }),
    e.pagination && d > 1 ? /* @__PURE__ */ r("div", { className: "bd-list-pagination", children: Array.from({ length: d }, (c, b) => b + 1).map((c) => /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        className: c === i ? "active" : "",
        onClick: () => s(c),
        children: c
      },
      c
    )) }) : null
  ] });
}, vl = [
  { attribute: "_blitzstamp", label: "Newest", order: "desc" },
  { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
], pl = (e, t) => {
  const l = t === "desc" ? -1 : 1;
  return (n, i) => {
    var d, u;
    const s = (d = n[e]) == null ? void 0 : d.value, a = (u = i[e]) == null ? void 0 : u.value;
    return s == null || a == null ? s == null && a == null ? 0 : s == null ? l : -l : (typeof s == "number" && typeof a == "number" ? s - a : String(s).localeCompare(String(a))) * l;
  };
}, Ml = (e) => {
  var x, F, C;
  const t = H(), l = me(e.model), [n, i] = w(""), [s, a] = w(!1), o = _({}), d = _(""), { onFilterChange: u } = e, f = Z(() => {
    const y = st(o.current), E = d.current.trim(), j = e.searchAttributes ?? [], z = E && j.length ? (J) => {
      const ne = new RegExp($e(E), "i");
      return j.some((Y) => {
        var le;
        return typeof ((le = J[Y]) == null ? void 0 : le.value) == "string" && ne.test(J[Y].value);
      });
    } : null;
    u(!y && !z ? null : (J) => (!z || z(J)) && (!y || y(J)));
  }, [u, (x = e.searchAttributes) == null ? void 0 : x.join(",")]);
  L(() => {
    d.current = n;
    const y = setTimeout(f, n ? 300 : 0);
    return () => clearTimeout(y);
  }, [n, f]);
  const c = e.sortAttributes ?? vl, [b, m] = w(0), { onSortChange: h } = e;
  L(() => {
    if (!h)
      return;
    const y = c[b];
    h(b === 0 ? null : pl(y.attribute, y.order));
  }, [b, h]);
  const v = Z((y) => {
    var j;
    if (!l)
      return [];
    const E = ((j = l.getAttributesDetails) == null ? void 0 : j.call(l)) ?? {};
    return y.map((z) => it(o.current, z, E[z] ?? {}, l, f));
  }, [l, f]), N = R(() => v(e.filterAttributes ?? []), [v, e.filterAttributes]), O = R(() => v(e.dialogFilterAttributes ?? []), [v, e.dialogFilterAttributes]), S = () => {
    for (const y of Object.keys(o.current))
      delete o.current[y];
    i(""), a(!1), f();
  }, $ = ((F = l == null ? void 0 : l.getAttributesDetails) == null ? void 0 : F.call(l)) ?? {}, T = t.settings.language ?? "en", M = (y) => {
    var E, j;
    return q((E = $[y]) == null ? void 0 : E["label-int"], (j = $[y]) == null ? void 0 : j.label, T, y);
  }, D = n.trim() !== "" || Object.keys(o.current).length > 0;
  return /* @__PURE__ */ A("div", { className: "bd-searchbox", children: [
    (C = e.searchAttributes) != null && C.length ? /* @__PURE__ */ r(
      "input",
      {
        className: "bd-searchbox-input",
        type: "search",
        value: n,
        placeholder: e.searchPlaceholder ?? "Search…",
        onChange: (y) => i(y.target.value)
      }
    ) : null,
    N.length ? /* @__PURE__ */ r("div", { className: "bd-searchbox-filters", children: N.map((y) => /* @__PURE__ */ r(Q, { port: y, mode: "filter", label: e.withLabels ? M(y.name) : void 0 }, y.name)) }) : null,
    /* @__PURE__ */ A("div", { className: "bd-searchbox-actions", children: [
      e.onSortChange && c.length ? /* @__PURE__ */ r(
        "select",
        {
          className: "bd-searchbox-sort",
          value: b,
          onChange: (y) => m(Number(y.target.value)),
          children: c.map((y, E) => /* @__PURE__ */ r("option", { value: E, children: y.label }, E))
        }
      ) : null,
      O.length ? /* @__PURE__ */ r("button", { type: "button", className: "bd-searchbox-filters-btn", onClick: () => a(!0), children: e.filtersButtonLabel ?? "Filters" }) : null,
      D ? /* @__PURE__ */ r("button", { type: "button", className: "bd-searchbox-clear", onClick: S, children: e.clearFiltersLabel ?? "Clear" }) : null
    ] }),
    s ? /* @__PURE__ */ r("div", { className: "bd-filters-dialog", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ A("div", { className: "bd-filters-dialog-box", children: [
      /* @__PURE__ */ A("header", { children: [
        /* @__PURE__ */ r("h3", { children: e.dialogTitle ?? "Filters" }),
        /* @__PURE__ */ r("button", { type: "button", className: "close-btn", onClick: () => a(!1), children: "×" })
      ] }),
      O.map((y) => /* @__PURE__ */ r(Q, { port: y, mode: "filter", label: e.withLabels ? M(y.name) : void 0 }, y.name)),
      /* @__PURE__ */ r("footer", { children: /* @__PURE__ */ r("button", { type: "button", onClick: () => a(!1), children: "Done" }) })
    ] }) }) : null
  ] });
}, El = (e) => {
  var Te, Le, Fe, Ie, De, xe, je, _e, Ue, Ve;
  const t = H(), l = me(e.model), n = _({}), [i, s] = w(""), a = _(""), [o, d] = w(null), u = ((Le = (Te = e.sort) == null ? void 0 : Te.options[0]) == null ? void 0 : Le.value) ?? null, [f, c] = w(((Fe = e.sort) == null ? void 0 : Fe.value) ?? u), [b, m] = w(0), [h, v] = w({}), N = _(!1);
  if (!N.current) {
    N.current = !0;
    for (const [g, p] of Object.entries(e.defaults ?? {}))
      n.current[g] = JSON.parse(JSON.stringify(p));
  }
  const O = ((Ie = l == null ? void 0 : l.getAttributesDetails) == null ? void 0 : Ie.call(l)) ?? {}, S = ((De = l == null ? void 0 : l.getSystemAttributesDetails) == null ? void 0 : De.call(l)) ?? {}, $ = (g) => {
    var p;
    return O[g] ?? ((p = e.filterAttributes) != null && p.includes(g) ? S[g] : void 0);
  }, T = t.settings.language ?? "en", M = (g) => {
    var p, k, I;
    return ((p = e.labels) == null ? void 0 : p[g]) ?? q((k = $(g)) == null ? void 0 : k["label-int"], (I = $(g)) == null ? void 0 : I.label, T, g);
  }, { onFilterChange: D, onActiveChange: x } = e, F = Z(() => {
    const g = st(n.current), p = a.current.trim(), k = e.searchAttributes ?? [], I = p && k.length ? (B) => {
      const G = new RegExp($e(p), "i");
      return k.some((W) => {
        var se;
        return typeof ((se = B[W]) == null ? void 0 : se.value) == "string" && G.test(B[W].value);
      });
    } : null;
    D(!g && !I ? null : (B) => (!I || I(B)) && (!g || g(B))), m((B) => B + 1);
  }, [D, (xe = e.searchAttributes) == null ? void 0 : xe.join(",")]);
  L(() => {
    a.current = i;
    const g = setTimeout(F, i ? 300 : 0);
    return () => clearTimeout(g);
  }, [i, F]);
  const C = (g, p) => {
    if (!g || !p)
      return !g && !p;
    if (g.op !== p.op)
      return !1;
    const k = (G) => Array.isArray(G.values) ? G.values.map(String).sort() : null, I = k(g), B = k(p);
    return I || B ? !!I && !!B && I.length === B.length && I.every((G, W) => G === B[W]) : g.value === p.value && g.min === p.min && g.max === p.max;
  }, y = e.defaults ?? {}, E = i.trim() !== "" || [.../* @__PURE__ */ new Set([...Object.keys(n.current), ...Object.keys(y)])].some((g) => !C(n.current[g], y[g])) || f !== u;
  L(() => {
    x == null || x(E);
  }, [E, x]);
  const j = (e.searchAttributes ?? []).filter((g) => {
    var p;
    return typeof ((p = $(g)) == null ? void 0 : p.type) == "string" && ["varchar", "text"].includes($(g).type);
  }), z = (g) => it(n.current, g, $(g) ?? {}, l, F, { placeholder: `${M(g)}...` }), J = (g) => {
    const p = t.registry.resolve({ type: g.type, many: g.many, model: g.model, name: g.name, hint: g.hint });
    return !!(p.filter || p.control && at.has(g.type));
  }, ne = (e.filterAttributes ?? []).filter((g) => $(g) && !j.includes(g) && J(z(g))), Y = ne.map((g) => {
    const p = n.current[g], k = (p == null ? void 0 : p.values) ?? [];
    return k.length === 1 ? `${g}:${k[0]}` : null;
  }).filter(Boolean).join(",");
  L(() => {
    var k;
    let g = !1;
    const p = Y ? Y.split(",") : [];
    for (const I of p) {
      if (h[I] !== void 0)
        continue;
      const [B, G] = I.split(":"), W = (k = $(B)) == null ? void 0 : k.type, se = Array.isArray(W) ? W[0] : W;
      typeof se == "string" && (async () => {
        var Be;
        try {
          const Re = await t.resolveModel(se), Pe = re(Re), ve = Pe ? await Re.get(G) : null, ze = (Be = ve == null ? void 0 : ve[Pe]) == null ? void 0 : Be.value;
          !g && ze != null && v(($t) => ({ ...$t, [I]: String(ze) }));
        } catch {
        }
      })();
    }
    return () => {
      g = !0;
    };
  }, [Y]);
  const le = (g) => {
    const p = n.current[g];
    if (!p)
      return "All";
    if (p.op === "contains")
      return `"${p.value}"`;
    const k = p.values ?? (p.value != null ? [p.value] : []);
    return k.length === 0 ? "Set" : k.length === 1 ? h[`${g}:${k[0]}`] ?? "1 selected" : `${k.length} selected`;
  }, Nt = (g) => d((p) => p === g ? null : g), wt = () => {
    var g, p;
    d(null);
    for (const k of Object.keys(n.current))
      delete n.current[k];
    s(""), D(null), e.sort && f !== u && (c(u), (p = (g = e.sort).onChange) == null || p.call(g, u)), m((k) => k + 1);
  }, he = (g, p) => {
    d(null), p ? n.current[g] = JSON.parse(JSON.stringify(p)) : delete n.current[g], F();
  }, At = () => {
    var g, p;
    d(null);
    for (const k of Object.keys(n.current))
      delete n.current[k];
    for (const [k, I] of Object.entries(y))
      n.current[k] = JSON.parse(JSON.stringify(I));
    s(""), F(), e.sort && f !== u && (c(u), (p = (g = e.sort).onChange) == null || p.call(g, u));
  }, ie = [], St = [...Object.keys(y), ...ne.filter((g) => !y[g])];
  for (const g of St) {
    const p = n.current[g], k = y[g];
    k && C(p, k) ? ie.push({ key: g, label: ((je = e.defaultLabels) == null ? void 0 : je[g]) ?? M(g), active: !0, toggle: () => he(g, null) }) : k && !p ? ie.push({ key: g, label: ((_e = e.defaultLabels) == null ? void 0 : _e[g]) ?? M(g), active: !1, toggle: () => he(g, k) }) : p && ie.push({ key: g, label: `${M(g)}: ${le(g)}`, active: !0, toggle: () => he(g, null) });
  }
  i.trim() && j.length && ie.push({
    key: "~search",
    label: `${j.map(M).join(", ")}: "${i.trim()}"`,
    active: !0,
    toggle: () => s("")
  });
  const { onPillsChange: be } = e;
  if (L(() => {
    !be || !l || be({ pills: ie, differs: E, reset: At });
  }, [be, l, b, h, i, f, E]), !l)
    return null;
  const ye = (g, p, k, I) => /* @__PURE__ */ A("div", { className: `bd-fmenu-row${o === g ? " open" : ""}`, children: [
    /* @__PURE__ */ A("button", { type: "button", className: "bd-fmenu-head", "aria-expanded": o === g, onClick: () => Nt(g), children: [
      /* @__PURE__ */ r("span", { className: "bd-fmenu-label", children: p }),
      /* @__PURE__ */ r("span", { className: "bd-fmenu-value", children: k }),
      /* @__PURE__ */ r("span", { className: "bd-fmenu-chevron", children: "›" })
    ] }),
    o === g ? /* @__PURE__ */ r("div", { className: "bd-fmenu-panel", children: I() }) : null
  ] }, g);
  return /* @__PURE__ */ A("div", { className: "bd-fmenu", children: [
    j.length > 0 ? ye(
      "search",
      j.map(M).join(", "),
      i.trim() ? `"${i.trim()}"` : "All",
      () => /* @__PURE__ */ r(
        "input",
        {
          className: "bd-fmenu-search",
          type: "text",
          autoFocus: !0,
          value: i,
          placeholder: e.searchPlaceholder ?? `Search ${j.map(M).join(", ")}...`,
          onChange: (g) => s(g.target.value)
        }
      )
    ) : null,
    ne.map((g) => ye(
      g,
      M(g),
      le(g),
      () => /* @__PURE__ */ r(Q, { port: z(g), mode: "filter" })
    )),
    (Ue = e.sort) != null && Ue.options.length ? /* @__PURE__ */ A(Ke, { children: [
      /* @__PURE__ */ r("div", { className: "bd-fmenu-divider" }),
      ye(
        "sort",
        e.sort.label ?? "Sort",
        ((Ve = e.sort.options.find((g) => g.value === f)) == null ? void 0 : Ve.label) ?? String(f),
        () => /* @__PURE__ */ r(Ke, { children: e.sort.options.map((g) => /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            className: `bd-fmenu-option${g.value === f ? " checked" : ""}`,
            onClick: () => {
              var p, k;
              c(g.value), (k = (p = e.sort).onChange) == null || k.call(p, g.value), d(null);
            },
            children: [
              /* @__PURE__ */ r("span", { children: g.label }),
              /* @__PURE__ */ r("span", { className: "bd-fmenu-check", children: "✓" })
            ]
          },
          g.value
        )) })
      )
    ] }) : null,
    /* @__PURE__ */ r("div", { className: "bd-fmenu-divider" }),
    /* @__PURE__ */ r("button", { type: "button", className: "bd-fmenu-head", onClick: wt, children: /* @__PURE__ */ r("span", { className: "bd-fmenu-label", children: e.clearLabel ?? "Clear filters" }) })
  ] });
};
for (const e of cl)
  rt.register(e);
const Tl = "0.1.0";
export {
  $l as BDAddForm,
  kl as BDEditor,
  Q as BDField,
  El as BDFiltersMenu,
  Ol as BDList,
  bl as BDObjectView,
  Ml as BDSearchBox,
  cl as BUILTIN_TYPES,
  Sl as BlitzUIProvider,
  nn as ChipsControl,
  te as Picker,
  Kt as ReactUIManager,
  P as SaveState,
  Tl as VERSION,
  Ht as boolean,
  On as code,
  st as compileConditions,
  vn as currency,
  Mn as date,
  En as datetime,
  Pt as draftPort,
  pn as duration,
  Nn as email,
  In as enumType,
  Jn as file,
  Rn as fk,
  bn as float,
  qt as hex,
  rl as htmlText,
  Hn as image,
  hn as integer,
  Ft as isEmptyValue,
  $n as json,
  Rt as livePort,
  sl as location,
  ht as makeDateControl,
  ft as makeNumberControl,
  fe as makeTextAreaControl,
  oe as makeTextControl,
  Ee as makeUploadControl,
  sn as markdown,
  Pn as mtm,
  yn as percentage,
  Un as phone,
  it as queryPort,
  ln as text,
  mn as texti18n,
  rt as ui,
  wn as url,
  Gt as useBDStatus,
  U as useBDValue,
  ee as useDraftCommit,
  yl as useSettledList,
  H as useUIManager,
  Wn as user,
  Jt as varchar,
  an as varcharMany,
  qn as video,
  Sn as youtube
};
