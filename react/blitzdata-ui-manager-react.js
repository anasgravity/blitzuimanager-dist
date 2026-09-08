var pt = Object.defineProperty;
var Ct = (e, t, n) => t in e ? pt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var B = (e, t, n) => (Ct(e, typeof t != "symbol" ? t + "" : t, n), n);
import { BDModel as Nt } from "@blitzdata.ts/core";
import { jsx as a, jsxs as w, Fragment as Pe } from "react/jsx-runtime";
import { useState as A, useRef as _, useEffect as F, useCallback as Z, useMemo as P, createContext as wt, useContext as At, Component as St } from "react";
const $t = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0, kt = (e) => Array.isArray(e) ? e[0] : e, Ce = (e, t) => e.endsWith("_fk") ? "fk" : e.endsWith("_mtm") ? "mtm" : kt(t), Ue = ["view", "control", "filter", "editor", "default", "empty"];
class Ot {
  constructor(t) {
    B(this, "builtins", /* @__PURE__ */ new Map());
    B(this, "typeOverlays", /* @__PURE__ */ new Map());
    B(this, "attrOverlays", /* @__PURE__ */ new Map());
    B(this, "presets", /* @__PURE__ */ new Map());
    B(this, "bindings", /* @__PURE__ */ new Map());
    this.warn = t;
  }
  /** Register a built-in datatype module (the floor layer). */
  register(t) {
    const { type: n, ...l } = t;
    for (const i of [n].flat())
      Object.assign(this.mapEntry(this.builtins, i), l);
  }
  /** Merge extra surfaces into a built-in (used to seed edit-mode editors). */
  mergeBuiltin(t, n) {
    Object.assign(this.mapEntry(this.builtins, t), n);
  }
  hasBuiltin(t) {
    return this.builtins.has(t);
  }
  removeBuiltinSurface(t, n) {
    var l;
    (l = this.builtins.get(t)) == null || delete l[n];
  }
  defineUI(t, n) {
    Object.assign(this.mapEntry(this.typeOverlays, t), n);
  }
  defineUIFor(t, n, l) {
    Object.assign(this.mapEntry(this.attrOverlays, `${t}.${n}`), l);
  }
  definePreset(t, n) {
    this.presets.set(t, n);
  }
  getPreset(t) {
    return this.presets.get(t);
  }
  /** Bind a preset to a type — one replaceable slot. null clears it. */
  bindType(t, n, l) {
    n === null ? this.bindings.delete(t) : this.bindings.set(t, { preset: n, label: l });
  }
  getBinding(t) {
    return this.bindings.get(t);
  }
  /** Drop write-surface overlays (control/editor/filter). Built-ins stay intact. */
  resetWrite() {
    for (const t of [this.typeOverlays, this.attrOverlays])
      for (const n of t.values())
        delete n.control, delete n.editor, delete n.filter;
  }
  /** Drop read-surface overlays (view). Built-ins stay intact. */
  resetRead() {
    for (const t of [this.typeOverlays, this.attrOverlays])
      for (const n of t.values())
        delete n.view;
  }
  resolve(t, n) {
    const { type: l, many: i, model: s, name: r, hint: u, use: o, maxLayer: f = 8 } = t, d = { defaultConfig: {}, sources: {} }, c = (b, v, N) => {
      if (!(!b || v > f)) {
        for (const O of Ue) {
          const S = b[O];
          S !== void 0 && (d[O] = S, d.sources[O] = { layer: v, label: N });
        }
        b.defaultConfig && Object.assign(d.defaultConfig, b.defaultConfig);
      }
    }, h = (b, v, N) => {
      const O = this.presets.get(b);
      if (O) {
        const { extends: $, ...T } = O;
        return $ && c({ ...this.builtins.get($), ...this.typeOverlays.get($) }, v, `${N} (extends '${$}')`), c(T, v + 1, N), !0;
      }
      const S = { ...this.builtins.get(b), ...this.typeOverlays.get(b) };
      return Object.keys(S).length ? (c(S, v + 1, N), !0) : !1;
    };
    c(this.builtins.get(l), 0, "built-in"), i && c(this.builtins.get(`${l}[]`), 0, "built-in (many)"), c(this.typeOverlays.get(l), 1, "defineUI"), i && c(this.typeOverlays.get(`${l}[]`), 1, "defineUI (many)");
    const m = i ? void 0 : this.bindings.get(l);
    if (m && !h(m.preset, 2, m.label ?? `binding '${m.preset}'`) && this.warn(`type '${l}' is bound to '${m.preset}' — not registered, using '${l}' default`), u && !h(u, 4, `preset '${u}'`) && this.warn(`${s ?? "?"}.${r ?? "?"} requests ui '${u}' — not registered, using '${l}' default`), s && r && c(this.attrOverlays.get(`${s}.${r}`), 6, "defineUIFor"), o && (typeof o == "string" ? h(o, 7, `use '${o}'`) || this.warn(`mount requests ui '${o}' — not registered, using '${l}' default`) : typeof o == "function" ? c({ control: o }, 8, "use (control)") : c(o, 8, "use (module)")), n) {
      const b = Ue.filter((v) => d.sources[v]).map((v) => `${v} from ${d.sources[v].label}`);
      n(`${s ?? "?"}.${r ?? l} → ${b.join("; ") || "nothing registered"}`);
    }
    return d;
  }
  mapEntry(t, n) {
    let l = t.get(n);
    return l || (l = {}, t.set(n, l)), l;
  }
}
class Mt {
  constructor() {
    B(this, "typeConfig", {});
    B(this, "attributeConfig", {});
    B(this, "settings", {});
    B(this, "services", {});
  }
  setConfig(t, n) {
    var l;
    Object.assign((l = this.typeConfig)[t] ?? (l[t] = {}), n);
  }
  setConfigFor(t, n, l) {
    var i, s;
    Object.assign((i = this.attributeConfig)[s = `${t}.${n}`] ?? (i[s] = {}), l);
  }
  resolve(t, n, l, i, s) {
    return {
      ...i,
      ...this.typeConfig[t],
      ...n && l ? this.attributeConfig[`${n}.${l}`] : void 0,
      ...s
    };
  }
}
function Et(e, t) {
  var i, s, r, u, o, f, d;
  const n = ((u = (r = (s = (i = e._object) == null ? void 0 : i.model) == null ? void 0 : s.getAttributesDetails) == null ? void 0 : r.call(s)) == null ? void 0 : u[e._name]) ?? {}, l = n.type ?? e._type;
  return {
    kind: "live",
    type: Ce(e._name, l),
    many: Array.isArray(n.type) && !e._name.endsWith("_mtm"),
    model: (d = (f = (o = e._object) == null ? void 0 : o.model) == null ? void 0 : f.getName) == null ? void 0 : d.call(f),
    name: e._name,
    attribute: e,
    value: e.value,
    set: (c) => e.edit(c),
    add: (c) => {
      var h;
      return (h = e.add) == null ? void 0 : h.call(e, c);
    },
    remove: (c) => {
      var h;
      return (h = e.remove) == null ? void 0 : h.call(e, c);
    },
    // VALUE stream: the object's remoteChange event — patch in place
    subscribe: (c) => {
      const h = e._object;
      if (typeof (h == null ? void 0 : h.addEventListener) != "function")
        return () => {
        };
      const m = (b) => {
        b && !Object.hasOwn(b, e._name) || c(e.value);
      };
      return h.addEventListener("remoteChange", m), () => h.removeEventListener("remoteChange", m);
    },
    // SAVE-STATE stream: pending | saved | failed — distinct from value
    status: (c) => {
      var h;
      return ((h = e.syncStatus) == null ? void 0 : h.call(e, c)) ?? (() => {
      });
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: t
  };
}
function Tt(e, t, n, l, i) {
  var s;
  return {
    kind: "draft",
    type: Ce(t, n.type),
    many: Array.isArray(n.type) && !t.endsWith("_mtm"),
    model: (s = l == null ? void 0 : l.getName) == null ? void 0 : s.call(l),
    name: t,
    value: e[t],
    set: (r) => {
      e[t] = r;
    },
    add: (r) => {
      (e[t] ?? (e[t] = [])).push(r);
    },
    remove: (r) => {
      e[t] = (e[t] ?? []).filter((u) => u !== r);
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: i
  };
}
function Ye(e, t, n, l, i, s) {
  var r;
  return {
    kind: "query",
    type: Ce(t, n.type),
    many: Array.isArray(n.type) && !t.endsWith("_mtm"),
    model: (r = l == null ? void 0 : l.getName) == null ? void 0 : r.call(l),
    name: t,
    value: e[t],
    set: (u) => {
      u ? e[t] = u : delete e[t], i == null || i();
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: s
  };
}
function X(e, t, n, l) {
  if (typeof (e == null ? void 0 : e[n]) == "string")
    return e[n];
  if (typeof t == "string")
    return t;
  if (t && typeof t == "object") {
    const i = t;
    if (typeof i[n] == "string")
      return i[n];
    if (typeof i.default == "string")
      return i.default;
    const s = Object.values(i).find((r) => typeof r == "string");
    if (s)
      return s;
  }
  return l;
}
function Lt(e) {
  return e !== null && typeof e == "object" && Object.hasOwn(e, "_value") ? e.value : e;
}
function Ne(e) {
  return Array.isArray(e) ? e.map((t) => Lt(t)) : [];
}
function we(e) {
  return e.replace(/(\^|\$|\\|\/|\||\*|\+|\-|\.|\?|\(|\)|\[|\]|\{|\})/g, "\\$&");
}
function Ft(e) {
  return new Promise((t, n) => {
    if (window.google && window.google.maps) {
      t();
      return;
    }
    const l = document.createElement("script");
    l.src = `https://maps.googleapis.com/maps/api/js?key=${e}&libraries=places`, l.async = !0, l.defer = !0, l.onload = () => t(), l.onerror = () => n(new Error("Failed to load Google Maps API")), document.head.appendChild(l);
  });
}
async function Dt(e, t, n) {
  if (await Ft(n), !window.google || !window.google.maps)
    return null;
  const l = { lat: parseFloat(e), lng: parseFloat(t) };
  if (!Number.isFinite(l.lat) || !Number.isFinite(l.lng))
    return null;
  const i = document.createElement("div");
  i.className = "map-container";
  const s = new google.maps.Map(i, { center: l, zoom: 13 });
  return new google.maps.Marker({ map: s, position: l }), i;
}
new Function("url", "return import(url)");
function Qe(e) {
  const t = Object.keys(e);
  return t.length === 0 ? null : (n) => t.every((l) => {
    var i;
    return It((i = n[l]) == null ? void 0 : i.value, e[l]);
  });
}
const Ke = (e) => e.map(
  (t) => t && Object.hasOwn(t, "_value") ? t.value : t && Object.hasOwn(t, "_blitzID") ? t._blitzID : t
);
function It(e, t) {
  switch (t.op) {
    case "contains":
      return typeof e == "string" && !!e.match(new RegExp(we(String(t.value)), "i"));
    case "eq":
      return Array.isArray(e) ? Ke(e).includes(t.value) : e == t.value;
    case "between": {
      const n = typeof e == "string" && Number.isNaN(Number(e)) ? new Date(e).getTime() : Number(e);
      if (e == null || Number.isNaN(n))
        return !1;
      const { min: l, max: i } = t;
      return (l == null || n >= l) && (i == null || n <= i);
    }
    case "in": {
      const n = t.values ?? t.value;
      if (!Array.isArray(n) || n.length === 0)
        return !0;
      if (Array.isArray(e)) {
        const l = Ke(e);
        return n.some((i) => l.includes(i));
      }
      return n.includes(e);
    }
    default:
      return !0;
  }
}
const Xe = /* @__PURE__ */ new Set(["varchar", "text", "markdown", "email", "url", "tag", "hex", "formula", "youtube"]), se = (e) => {
  const t = {};
  return e.View !== void 0 && (t.view = e.View), e.Control !== void 0 && (t.control = e.Control), e.Filter !== void 0 && (t.filter = e.Filter), e.default !== void 0 && (t.default = e.default), e.empty !== void 0 && (t.empty = e.empty), e.defaultConfig !== void 0 && (t.defaultConfig = e.defaultConfig), t;
};
class jt {
  constructor() {
    B(this, "registry", new Ot((t) => this.warn(t)));
    B(this, "config", new Mt());
    B(this, "debug", !1);
    B(this, "resolveModel", (t) => Nt.get(t));
  }
  /** Register a built-in datatype module (the floor layer). */
  register(t) {
    const { type: n, ...l } = t;
    this.registry.register({ type: n, ...se(l) });
  }
  defineUI(t, n) {
    this.registry.defineUI(t, se(n));
  }
  defineUIFor(t, n, l) {
    this.registry.defineUIFor(t, n, se(l));
  }
  definePreset(t, n) {
    const { extends: l, ...i } = n;
    this.registry.definePreset(t, { extends: l, ...se(i) });
  }
  setConfig(t, n) {
    this.config.setConfig(t, n);
  }
  setConfigFor(t, n, l) {
    this.config.setConfigFor(t, n, l);
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
const et = new jt();
function V(e) {
  const [t, n] = A(e.value), l = _(e.value);
  e.value !== l.current && (l.current = e.value, n(e.value)), F(() => {
    var s;
    return (s = e.subscribe) == null ? void 0 : s.call(e, (r) => {
      l.current = r, n(r);
    });
  }, [e.subscribe]);
  const i = Z((s) => {
    n(s), e.onChange(s);
  }, [e.onChange]);
  return [t, i];
}
function xt(e) {
  const [t, n] = A(null);
  return F(() => {
    var l;
    return (l = e.status) == null ? void 0 : l.call(e, n);
  }, [e.status]), t;
}
function ee(e) {
  const { value: t, commit: n, validate: l, delay: i = 500, flushOnUnmount: s = !0 } = e, [r, u] = A(t), o = _(t), f = _(null), d = _(r);
  d.current = r;
  const c = _(t);
  t !== c.current && (c.current = t, o.current = t, f.current === null && u(t));
  const h = () => {
    f.current !== null && (clearTimeout(f.current), f.current = null);
  }, m = Z((S) => {
    h(), !(l && !l(S)) && S !== o.current && (o.current = S, n(S));
  }, [n, l]), b = Z((S) => {
    u(S), d.current = S, h(), f.current = setTimeout(() => {
      f.current = null, m(S);
    }, i);
  }, [m, i]), v = Z(() => m(d.current), [m]), N = Z(() => {
    h(), u(o.current), d.current = o.current;
  }, []), O = _(v);
  return O.current = s ? v : () => {
  }, F(() => () => O.current(), []), { draft: r, setDraft: b, flush: v, cancel: N };
}
const U = ({ status: e }) => {
  var u;
  const t = xt({ status: e }), n = _(!1), [l, i] = A(!1), s = t == null ? void 0 : t.status;
  if (F(() => {
    if (s && !(s === "completed" && !n.current) && (n.current = !0, i(!0), s === "completed")) {
      const o = setTimeout(() => i(!1), 1e3);
      return () => clearTimeout(o);
    }
  }, [t]), !l || !s || s === "completed" && !n.current)
    return null;
  const r = (u = t == null ? void 0 : t.job) == null ? void 0 : u.message;
  return /* @__PURE__ */ a(
    "span",
    {
      className: `bd-savestate bd-savestate-${s}`,
      title: s === "conflict" ? "Conflict" : s,
      onClick: r ? (o) => {
        o.stopPropagation(), alert(r);
      } : void 0,
      children: s === "pending" ? "…" : s === "completed" ? "✓" : "✗"
    }
  );
}, _t = (e) => {
  const t = e.value, [n, l] = A(t == null ? "" : String(t.value));
  return /* @__PURE__ */ w(
    "select",
    {
      className: "bd-filter bd-filter-boolean",
      value: n,
      onChange: (i) => {
        const s = i.target.value;
        l(s), e.onChange(s === "" ? null : { op: "eq", value: s === "true" });
      },
      children: [
        /* @__PURE__ */ a("option", { value: "", children: "Any" }),
        /* @__PURE__ */ a("option", { value: "true", children: "Yes" }),
        /* @__PURE__ */ a("option", { value: "false", children: "No" })
      ]
    }
  );
}, ae = (e) => {
  const t = e.value, [n, l] = A((t == null ? void 0 : t.min) == null ? "" : String(t.min)), [i, s] = A((t == null ? void 0 : t.max) == null ? "" : String(t.max)), r = _(null), u = (o, f) => {
    r.current && clearTimeout(r.current), r.current = setTimeout(() => {
      if (o === "" && f === "") {
        e.onChange(null);
        return;
      }
      e.onChange({
        op: "between",
        min: o === "" ? null : Number(o),
        max: f === "" ? null : Number(f)
      });
    }, 500);
  };
  return /* @__PURE__ */ w("span", { className: "bd-filter bd-filter-range", children: [
    /* @__PURE__ */ a(
      "input",
      {
        type: "number",
        placeholder: "min",
        value: n,
        onChange: (o) => {
          l(o.target.value), u(o.target.value, i);
        }
      }
    ),
    /* @__PURE__ */ a(
      "input",
      {
        type: "number",
        placeholder: "max",
        value: i,
        onChange: (o) => {
          s(o.target.value), u(n, o.target.value);
        }
      }
    )
  ] });
}, pe = (e) => e === !0 || e === 1 || e === "1", Vt = (e) => {
  const [t, n] = V(e), l = pe(t);
  return /* @__PURE__ */ w("span", { className: "bd-input bd-input-boolean", children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": l,
        className: `bd-boolean ${l ? "icon-true" : "icon-false"}`,
        onClick: () => n(!l),
        onKeyDown: (i) => {
          (i.key === "Enter" || i.key === " ") && (i.preventDefault(), n(!l));
        },
        children: l ? "✓" : "✗"
      }
    ),
    /* @__PURE__ */ a(U, { status: e.status })
  ] });
}, Bt = {
  type: "boolean",
  default: () => !1,
  empty: (e) => e == null,
  Control: Vt,
  Filter: _t,
  View: ({ value: e }) => /* @__PURE__ */ a("span", { className: `bd-boolean ${pe(e) ? "icon-true" : "icon-false"}`, children: pe(e) ? "✓" : "✗" })
};
function re(e = {}) {
  const { type: t = "text", pattern: n, serialize: l = (s) => s } = e;
  return (s) => {
    const [r, u] = V(s), [o, f] = A(!1), d = s.config.errorMsg ?? e.errorMsg, c = s.config.pattern ?? n, { draft: h, setDraft: m, flush: b, cancel: v } = ee({
      value: r == null ? "" : String(r),
      commit: (N) => u(l(N)),
      validate: (N) => {
        const O = N === "" || !c || c.test(N);
        return f(!O), O;
      }
    });
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-text", children: [
      /* @__PURE__ */ a(
        "input",
        {
          type: t,
          value: h,
          placeholder: s.config.placeholder,
          onChange: (N) => m(N.target.value),
          onBlur: b,
          onKeyDown: (N) => {
            N.key === "Enter" && b(), N.key === "Escape" && (v(), N.target.blur());
          }
        }
      ),
      /* @__PURE__ */ a(U, { status: s.status }),
      o && d ? /* @__PURE__ */ a("span", { className: "bd-input-error", children: d }) : null
    ] });
  };
}
const z = (e) => (Array.isArray(e) ? e.length > 0 : e !== "" && e != null) ? e : null, tt = (e) => Array.isArray(e) ? Ne(e).map(String).join(", ") : String(e ?? ""), de = ({ value: e }) => /* @__PURE__ */ a("p", { className: "bd-text", children: tt(e) });
function nt(e, t, n) {
  if (e.add && e.remove) {
    for (const l of n.filter((i) => !t.includes(i)))
      e.add(l);
    for (const l of t.filter((i) => !n.includes(i)))
      e.remove(l);
  } else
    e.onChange(z(n));
}
function Ae(e) {
  return Array.isArray(e) ? e.map((t) => String(ze(t))) : e == null || e === "" ? [] : [String(ze(e))];
}
const ze = (e) => {
  var t;
  if (e !== null && typeof e == "object") {
    if (Object.hasOwn(e, "_blitzID"))
      return ((t = e._blitzID) == null ? void 0 : t.value) ?? e._blitzID;
    if (Object.hasOwn(e, "_value"))
      return e.value;
  }
  return e;
}, Rt = {
  type: ["varchar", "tag", "formula"],
  empty: (e) => !e,
  Control: re({ serialize: z }),
  View: de
}, Pt = {
  type: "hex",
  empty: (e) => !e,
  defaultConfig: { pattern: /^[0-9a-fA-F]*$/, errorMsg: "Hex digits only (0-9, a-f)!" },
  Control: re({ serialize: z }),
  View: de
}, Ut = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function lt(e) {
  return String(e ?? "").replace(/[&<>"']/g, (t) => Ut[t]);
}
const Kt = /^\s*(javascript|data|vbscript):/i;
function ue(e) {
  const t = String(e ?? "");
  return Kt.test(t) ? "#" : lt(t);
}
const zt = /^\s*(javascript|data|vbscript):/i, Gt = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?$/, Ge = (e) => {
  let t = e.trim();
  return t.startsWith("|") && (t = t.slice(1)), t.endsWith("|") && (t = t.slice(0, -1)), t.split("|").map((n) => n.trim());
}, We = (e) => zt.test(e) ? "#" : e;
function Y(e) {
  return e.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (t, n, l) => `<img alt="${n}" src="${We(l)}" />`).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (t, n, l) => `<a href="${We(l)}">${n}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
function Wt(e) {
  const t = lt(e.replace(/\r\n?/g, `
`)).split(`
`), n = [];
  let l = [], i = null, s = [], r = null, u = null;
  const o = () => {
    l.length && n.push(`<p>${l.map(Y).join("<br />")}</p>`), l = [];
  }, f = () => {
    i && n.push(`<${i.tag}>${i.items.map((m) => `<li>${Y(m)}</li>`).join("")}</${i.tag}>`), i = null;
  }, d = () => {
    s.length && n.push(`<blockquote>${s.map(Y).join("<br />")}</blockquote>`), s = [];
  }, c = () => {
    if (u) {
      const m = `<tr>${u.header.map((v) => `<th>${Y(v)}</th>`).join("")}</tr>`, b = u.rows.map((v) => `<tr>${v.map((N) => `<td>${Y(N)}</td>`).join("")}</tr>`).join("");
      n.push(`<table><thead>${m}</thead><tbody>${b}</tbody></table>`);
    }
    u = null;
  }, h = () => {
    o(), f(), d(), c();
  };
  for (let m = 0; m < t.length; m++) {
    const b = t[m];
    if (r) {
      /^```/.test(b) ? (n.push(`<pre><code>${r.join(`
`)}</code></pre>`), r = null) : r.push(b);
      continue;
    }
    if (/^```/.test(b)) {
      h(), r = [];
      continue;
    }
    if (u) {
      if (b.trim() !== "" && b.includes("|")) {
        u.rows.push(Ge(b));
        continue;
      }
      c();
    }
    const v = b.match(/^(#{1,6})\s+(.*)$/);
    if (v) {
      h(), n.push(`<h${v[1].length}>${Y(v[2])}</h${v[1].length}>`);
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(b)) {
      h(), n.push("<hr />");
      continue;
    }
    const N = b.match(/^&gt;\s?(.*)$/);
    if (N) {
      o(), f(), s.push(N[1]);
      continue;
    }
    const O = b.match(/^\s*[-*]\s+(.*)$/), S = b.match(/^\s*\d+\.\s+(.*)$/);
    if (O || S) {
      o(), d();
      const $ = O ? "ul" : "ol";
      (!i || i.tag !== $) && (f(), i = { tag: $, items: [] }), i.items.push((O ?? S)[1]);
      continue;
    }
    if (b.includes("|") && m + 1 < t.length && Gt.test(t[m + 1])) {
      h(), u = { header: Ge(b), rows: [] }, m++;
      continue;
    }
    if (b.trim() === "") {
      h();
      continue;
    }
    f(), d(), l.push(b);
  }
  return r && n.push(`<pre><code>${r.join(`
`)}</code></pre>`), h(), n.join(`
`);
}
function fe(e, t) {
  return (l) => {
    const [i, s] = V(l), { draft: r, setDraft: u, flush: o, cancel: f } = ee({
      value: t ? t(i) : i == null ? "" : String(i),
      commit: (d) => s(e(d, l))
    });
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-textarea", children: [
      /* @__PURE__ */ a(
        "textarea",
        {
          rows: l.config.rows ?? 10,
          value: r,
          placeholder: l.config.placeholder,
          onChange: (d) => u(d.target.value),
          onBlur: o,
          onKeyDown: (d) => {
            d.key === "Escape" && (f(), d.target.blur());
          }
        }
      ),
      /* @__PURE__ */ a(U, { status: l.status })
    ] });
  };
}
const Zt = (e) => {
  const [t, n] = V(e), [l, i] = A(""), s = Ne(t).map(String), r = (o, f, d) => {
    if (e.add && e.remove)
      f !== void 0 && e.add(f), d !== void 0 && e.remove(d);
    else {
      n(o.length ? o : null);
      return;
    }
    n(o);
  }, u = () => {
    const o = l.trim();
    if (!o || s.includes(o)) {
      i("");
      return;
    }
    r([...s, o], o), i("");
  };
  return /* @__PURE__ */ w("span", { className: "bd-input bd-input-chips", children: [
    /* @__PURE__ */ a("span", { className: "bd-chips", children: s.map((o) => /* @__PURE__ */ w("span", { className: "bd-chip", children: [
      o,
      /* @__PURE__ */ a("button", { type: "button", className: "bd-chip-remove", onClick: () => r(s.filter((f) => f !== o), void 0, o), children: "×" })
    ] }, o)) }),
    /* @__PURE__ */ a(
      "input",
      {
        value: l,
        placeholder: e.config.placeholder ?? "add a value",
        onChange: (o) => i(o.target.value),
        onKeyDown: (o) => {
          o.key === "Enter" && (o.preventDefault(), u()), o.key === "Escape" && i("");
        },
        onBlur: u
      }
    ),
    /* @__PURE__ */ a(U, { status: e.status })
  ] });
}, Jt = {
  type: "text",
  empty: (e) => !e,
  Control: fe((e) => z(e)),
  View: de
}, qt = {
  type: "markdown",
  empty: (e) => !e,
  Control: fe((e) => z(e)),
  // renderMarkdown escapes first — the markup below is library-built, never raw input
  View: ({ value: e }) => /* @__PURE__ */ a("div", { className: "bd-markdown", dangerouslySetInnerHTML: { __html: Wt(String(e ?? "")) } })
}, Ht = {
  type: ["varchar[]", "text[]", "tag[]"],
  default: () => [],
  Control: Zt,
  View: de
};
function Ze(e, t = !0) {
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: t }).format(e).replace(/\./g, "'").replace(/,/g, ".");
}
function Yt(e, t) {
  if (!t)
    return Ze(e);
  try {
    return new Intl.NumberFormat("de-DE", { currency: t, style: "currency" }).format(e).replace(/\./g, "'").replace(/,/g, ".");
  } catch {
    return `${Ze(e)} ${t}`;
  }
}
function Qt(e) {
  if (e === "" || e === null || e === void 0)
    return "";
  const t = parseFloat(e);
  return isNaN(t) ? String(e) : String(Math.round(t * 1e4) / 1e4);
}
function Xt(e) {
  const t = Math.max(0, Math.floor(e));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor(t % 86400 / 3600),
    m: Math.floor(t % 3600 / 60),
    s: t % 60
  };
}
function en(e, t) {
  const n = Object.keys(e);
  if (n.length === 0)
    return "";
  if (t) {
    if (typeof e[t] == "string")
      return e[t];
    const i = t.split("_")[0], s = n.find((r) => r === i || r.startsWith(`${i}_`));
    if (s && typeof e[s] == "string")
      return e[s];
  }
  if (typeof e.default == "string")
    return e.default;
  const l = n.find((i) => typeof e[i] == "string");
  return l ? e[l] : "";
}
const tn = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
function it(e) {
  const t = e.match(tn);
  return t ? t[1] : null;
}
function nn(e) {
  if (e.thumbnail)
    return e.thumbnail;
  if (e["tn-oq"])
    return e["tn-oq"];
  const t = e.url ? it(e.url) : null;
  return t ? `https://img.youtube.com/vi/${t}/hqdefault.jpg` : null;
}
const ln = (e) => {
  const [t, n] = V(e), l = e.config.baseLocale ?? e.settings.language ?? "en", i = t && typeof t == "object" ? t : {}, s = Object.keys(i).filter((c) => c !== l), [r, u] = A(""), o = (c) => {
    const h = Object.fromEntries(Object.entries(c).filter(([m]) => m.trim() !== ""));
    n(Object.keys(h).length > 0 ? h : null);
  }, f = (c, h) => o({ ...i, [c]: h }), d = (c) => {
    const h = { ...i };
    delete h[c], o(h);
  };
  return /* @__PURE__ */ w("div", { className: "bd-input bd-input-i18n", children: [
    /* @__PURE__ */ w("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ a("span", { className: "bd-i18n-locale", children: l }),
      /* @__PURE__ */ a("input", { value: i[l] ?? "", onChange: (c) => f(l, c.target.value) }),
      /* @__PURE__ */ a(U, { status: e.status })
    ] }),
    s.map((c) => /* @__PURE__ */ w("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ a("span", { className: "bd-i18n-locale", children: c }),
      /* @__PURE__ */ a("input", { value: i[c] ?? "", onChange: (h) => f(c, h.target.value) }),
      /* @__PURE__ */ a("button", { type: "button", onClick: () => d(c), children: "×" })
    ] }, c)),
    /* @__PURE__ */ w("div", { className: "bd-i18n-row bd-i18n-add", children: [
      /* @__PURE__ */ a(
        "input",
        {
          placeholder: "locale (fr, de…)",
          value: r,
          onChange: (c) => u(c.target.value),
          onKeyDown: (c) => {
            c.key === "Enter" && r.trim() && (f(r.trim(), ""), u(""));
          }
        }
      ),
      /* @__PURE__ */ a("button", { type: "button", onClick: () => {
        r.trim() && (f(r.trim(), ""), u(""));
      }, children: "+ locale" })
    ] })
  ] });
}, sn = {
  type: "texti18n",
  empty: (e) => !e || Object.keys(e).length === 0,
  Control: ln,
  View: ({ value: e, settings: t }) => /* @__PURE__ */ a("p", { className: "bd-texti18n bd-text", children: en(e ?? {}, t == null ? void 0 : t.language) })
};
function st(e) {
  const t = (l) => l === "" ? null : e ? parseFloat(l) || 0 : parseInt(l) || 0;
  return (l) => {
    const [i, s] = V(l), { draft: r, setDraft: u, flush: o, cancel: f } = ee({
      value: i == null ? "" : String(i),
      commit: (c) => s(t(c))
    }), d = l.config.unit ?? (Array.isArray(l.attributeDetails.unit) ? l.attributeDetails.unit[0] : l.attributeDetails.unit);
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-number", children: [
      /* @__PURE__ */ a(
        "input",
        {
          type: "number",
          value: r,
          min: l.config.min,
          max: l.config.max,
          step: e ? "any" : 1,
          placeholder: l.config.placeholder,
          onChange: (c) => u(c.target.value),
          onBlur: o,
          onKeyDown: (c) => {
            c.key === "Enter" && o(), c.key === "Escape" && (f(), c.target.blur());
          }
        }
      ),
      d ? /* @__PURE__ */ a("span", { className: "bd-input-unit", children: d }) : null,
      /* @__PURE__ */ a(U, { status: l.status })
    ] });
  };
}
const at = st(!1), Se = st(!0), an = {
  type: ["int", "tinyint"],
  empty: (e) => e == null,
  Control: at,
  Filter: ae,
  View: ({ value: e }) => /* @__PURE__ */ a("p", { className: "bd-number", children: String(e) })
}, rn = {
  type: ["double", "float"],
  empty: (e) => e == null,
  Control: Se,
  Filter: ae,
  View: ({ value: e }) => /* @__PURE__ */ a("p", { className: "bd-number", children: String(e) })
}, cn = {
  type: "percentage",
  empty: (e) => e == null,
  Control: Se,
  Filter: ae,
  View: ({ value: e }) => /* @__PURE__ */ w("p", { className: "bd-number bd-percentage", children: [
    Qt(e),
    " ",
    /* @__PURE__ */ a("span", { className: "bd-percentage-sign", children: "%" })
  ] })
}, on = {
  type: "currency",
  empty: (e) => e == null,
  Control: Se,
  Filter: ae,
  View: ({ value: e, attributeDetails: t, config: n }) => {
    const l = (n == null ? void 0 : n.unit) ?? (Array.isArray(t == null ? void 0 : t.unit) ? t == null ? void 0 : t.unit[0] : t == null ? void 0 : t.unit);
    return /* @__PURE__ */ a("p", { className: "bd-number bd-currency", children: Yt(Number(e), l) });
  }
}, dn = {
  type: "duration",
  empty: (e) => e == null,
  defaultConfig: { min: 0, placeholder: "seconds" },
  Control: at,
  Filter: ae,
  View: ({ value: e }) => {
    const t = Xt(Number(e) || 0), n = ["d", "h", "m", "s"].filter((l) => t[l] > 0);
    return /* @__PURE__ */ a("p", { className: "bd-duration", children: n.length === 0 ? "0s" : n.map((l) => `${t[l]}${l}`).join(" ") });
  }
}, un = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, rt = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, fn = {
  type: "email",
  empty: (e) => !e,
  Control: re({ type: "email", pattern: un, errorMsg: "Wrong email address!", serialize: z }),
  View: ({ value: e }) => /* @__PURE__ */ a("a", { className: "bd-email", href: `mailto:${e}`, children: String(e) })
}, gn = {
  type: "url",
  empty: (e) => !e,
  Control: re({ type: "url", pattern: rt, errorMsg: "Wrong URL!", serialize: z }),
  View: ({ value: e }) => /* @__PURE__ */ a("a", { className: "bd-url", href: ue(e), target: "_blank", rel: "noopener noreferrer", children: String(e) })
}, hn = (e) => {
  const [t, n] = V(e), l = typeof t == "object" && t !== null ? t : {}, i = typeof t == "object" ? (t == null ? void 0 : t.url) ?? "" : t ?? "", { draft: s, setDraft: r, flush: u, cancel: o } = ee({
    value: String(i),
    commit: (f) => {
      if (!f) {
        n(null);
        return;
      }
      if (!rt.test(f))
        return;
      const d = it(f), c = l.thumbnail ?? (d ? `https://img.youtube.com/vi/${d}/hqdefault.jpg` : void 0);
      n({ ...l, url: f, ...c ? { thumbnail: c } : {} });
    }
  });
  return /* @__PURE__ */ w("span", { className: "bd-input bd-input-text bd-input-youtube", children: [
    /* @__PURE__ */ a(
      "input",
      {
        type: "url",
        value: s,
        placeholder: e.config.placeholder ?? "https://www.youtube.com/watch?v=…",
        onChange: (f) => r(f.target.value),
        onBlur: u,
        onKeyDown: (f) => {
          f.key === "Enter" && u(), f.key === "Escape" && (o(), f.target.blur());
        }
      }
    ),
    /* @__PURE__ */ a(U, { status: e.status })
  ] });
}, mn = {
  type: "youtube",
  empty: (e) => !e || typeof e == "object" && !e.url,
  Control: hn,
  View: ({ value: e }) => {
    const t = typeof e == "object" && e !== null ? e : { url: String(e ?? "") }, n = nn(t);
    return t.url ? /* @__PURE__ */ a("a", { className: "bd-youtube", href: ue(t.url), target: "_blank", rel: "noopener noreferrer", children: n ? /* @__PURE__ */ a("img", { src: n, alt: "video" }) : String(t.url) }) : null;
  }
}, bn = {
  type: "json",
  Control: fe(
    // same bytes as the vanilla control: parse or null, with the invalid flag raised
    (e, t) => {
      var n, l, i;
      if (!e)
        return (n = t.invalid) == null || n.call(t, null), null;
      try {
        return (l = t.invalid) == null || l.call(t, null), JSON.parse(e) ?? null;
      } catch {
        return (i = t.invalid) == null || i.call(t, "Invalid JSON"), null;
      }
    },
    (e) => e == null ? "" : JSON.stringify(e, null, 2)
  ),
  View: ({ value: e }) => /* @__PURE__ */ a("div", { className: "bd-json", children: /* @__PURE__ */ a("pre", { children: JSON.stringify(e, null, 2) }) })
}, ve = ["plain", "javascript", "typescript", "python", "php", "ruby", "go", "rust", "java", "c", "cpp", "csharp", "html", "css", "sql", "shell", "json", "yaml", "markdown"], yn = (e) => {
  const [t, n] = V(e), l = (t == null ? void 0 : t.language) ?? null, [i] = A(!1), { draft: s, setDraft: r, flush: u, cancel: o } = ee({
    value: (t == null ? void 0 : t.content) ?? "",
    commit: (d) => n(d ? { content: d, language: l } : null)
  }), f = l && !ve.includes(l) ? [...ve, l] : ve;
  return /* @__PURE__ */ w("div", { className: "bd-input bd-input-code", children: [
    /* @__PURE__ */ a(
      "select",
      {
        value: l ?? "plain",
        onChange: (d) => {
          const c = d.target.value === "plain" ? null : d.target.value;
          s && n({ content: s, language: c });
        },
        children: f.map((d) => /* @__PURE__ */ a("option", { value: d, children: d }, d))
      }
    ),
    /* @__PURE__ */ a(
      "textarea",
      {
        rows: e.config.rows ?? 10,
        spellCheck: !1,
        value: s,
        onChange: (d) => r(d.target.value),
        onBlur: u,
        onKeyDown: (d) => {
          d.key === "Escape" && (o(), d.target.blur());
        }
      }
    ),
    /* @__PURE__ */ a(U, { status: e.status }),
    i ? /* @__PURE__ */ a("span", { className: "bd-input-error", children: "Invalid" }) : null
  ] });
}, vn = {
  type: "code",
  empty: (e) => !(e != null && e.content),
  Control: yn,
  View: ({ value: e, config: t }) => e != null && e.content ? /* @__PURE__ */ w("div", { className: `bd-code${e.language ? ` bd-code-${e.language}` : ""}`, children: [
    t != null && t.showLanguage && e.language ? /* @__PURE__ */ a("span", { className: "bd-code-language", children: e.language }) : null,
    /* @__PURE__ */ a("pre", { children: /* @__PURE__ */ a("code", { children: e.content }) })
  ] }) : null
};
function ct(e) {
  const t = (i) => i ? e ? i.replace(" ", "T").slice(0, 16) : i.slice(0, 10) : "", n = (i) => {
    if (!i)
      return null;
    if (!e)
      return i;
    const s = i.replace("T", " ");
    return s.length === 16 ? `${s}:00` : s;
  };
  return (i) => {
    const [s, r] = V(i);
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-date", children: [
      /* @__PURE__ */ a(
        "input",
        {
          type: e ? "datetime-local" : "date",
          value: t(s),
          onChange: (u) => r(n(u.target.value))
        }
      ),
      /* @__PURE__ */ a(U, { status: i.status })
    ] });
  };
}
const pn = {
  type: "date",
  empty: (e) => !e,
  Control: ct(!1),
  View: ({ value: e }) => /* @__PURE__ */ a("div", { className: "bd-date", children: String(e) })
}, Cn = {
  type: "datetime",
  empty: (e) => !e,
  defaultConfig: { time: !0 },
  Control: ct(!0),
  View: ({ value: e }) => /* @__PURE__ */ a("div", { className: "bd-datetime", children: String(e) })
}, ce = ({ items: e, search: t, multiple: n, value: l, onChange: i, placeholder: s, selectedLabels: r, required: u, status: o }) => {
  const [f, d] = A(!1), [c, h] = A(""), [m, b] = A(e ?? []), [v, N] = A(!1), O = _(null), [S, $] = A({ ...r });
  F(() => {
    e && b(e);
  }, [e]), F(() => {
    r && $((C) => ({ ...C, ...r }));
  }, [r]), F(() => {
    if (!t || !f)
      return;
    let C = !1;
    N(!0);
    const y = setTimeout(() => {
      t(c).then((E) => {
        C || b(E);
      }).catch((E) => console.error("[BlitzUIManagerReact] picker search failed:", (E == null ? void 0 : E.message) ?? E)).finally(() => {
        C || N(!1);
      });
    }, c ? 500 : 0);
    return () => {
      C = !0, clearTimeout(y);
    };
  }, [t, c, f]), F(() => {
    if (!f)
      return;
    const C = (y) => {
      var E;
      (E = O.current) != null && E.contains(y.target) || d(!1);
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [f]), F(() => {
    m.length && $((C) => ({ ...C, ...Object.fromEntries(m.map((y) => [y.value, y.label])) }));
  }, [m]);
  const T = (C) => C.map((y) => m.find((E) => E.value === y) ?? { value: y, label: S[y] ?? y }), M = (C) => {
    if (n) {
      const y = l.includes(C.value) ? l.filter((E) => E !== C.value) : [...l, C.value];
      i(T(y));
    } else
      i([C]), d(!1);
  }, I = () => {
    i([]), d(!1);
  }, j = l.length ? l.map((C) => S[C] ?? C).join(", ") : s ?? "Select…", L = t ? m : m.filter((C) => !c || C.label.toLowerCase().includes(c.toLowerCase()));
  return /* @__PURE__ */ w("div", { className: "bd-picker", ref: O, children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: `bd-picker-display${l.length ? "" : " bd-picker-placeholder"}`,
        onClick: () => d((C) => !C),
        onKeyDown: (C) => {
          C.key === "Escape" && d(!1);
        },
        children: j
      }
    ),
    /* @__PURE__ */ a(U, { status: o }),
    f ? /* @__PURE__ */ w("div", { className: "bd-picker-menu", children: [
      t || m.length > 7 ? /* @__PURE__ */ a(
        "input",
        {
          className: "bd-picker-search",
          autoFocus: !0,
          value: c,
          placeholder: "Search…",
          onChange: (C) => h(C.target.value),
          onKeyDown: (C) => {
            C.key === "Escape" && d(!1);
          }
        }
      ) : null,
      /* @__PURE__ */ w("ul", { className: "bd-picker-options", role: "listbox", children: [
        !u && !n && l.length ? /* @__PURE__ */ a("li", { className: "bd-picker-clear", onClick: I, children: "Clear" }) : null,
        v ? /* @__PURE__ */ a("li", { className: "bd-picker-loading", children: "Loading…" }) : null,
        !v && L.length === 0 ? /* @__PURE__ */ a("li", { className: "bd-picker-loading", children: "No results" }) : null,
        L.map((C) => /* @__PURE__ */ w(
          "li",
          {
            role: "option",
            "aria-selected": l.includes(C.value),
            className: l.includes(C.value) ? "selected" : "",
            onClick: () => M(C),
            children: [
              n ? /* @__PURE__ */ a("input", { type: "checkbox", readOnly: !0, checked: l.includes(C.value) }) : null,
              C.label
            ]
          },
          C.value
        ))
      ] })
    ] }) : null
  ] });
}, Nn = (e) => e.charAt(0).toUpperCase() + e.slice(1), ot = (e) => {
  const t = e.attributeDetails.options ?? e.config.options ?? [], n = e.config.excludeOptions ?? [];
  return t.filter((l) => !n.includes(l)).map((l) => ({ value: l, label: Nn(l) }));
}, wn = (e) => {
  const [t, n] = V(e), l = !!e.config.multiple, i = Ae(t);
  return /* @__PURE__ */ a(
    ce,
    {
      items: ot(e),
      multiple: l,
      value: i,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (s) => {
        const r = s.map((u) => u.value);
        l ? nt(e, i, r) : n(r[0] ?? null);
      }
    }
  );
}, An = (e) => {
  const t = e.value, [n, l] = A((t == null ? void 0 : t.values) ?? []);
  return /* @__PURE__ */ a(
    ce,
    {
      items: ot(e),
      multiple: !0,
      value: n,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (i) => {
        const s = i.map((r) => r.value);
        l(s), e.onChange(s.length ? { op: "in", values: s } : null);
      }
    }
  );
}, Sn = {
  type: ["enum", "enum[]"],
  Control: wn,
  Filter: An,
  View: ({ value: e }) => /* @__PURE__ */ a("div", { className: "bd-enum", children: /* @__PURE__ */ a("p", { children: tt(e) }) })
}, $n = [
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
function kn(e, t, n = !1) {
  const l = e.replace(/[^\d+]/g, ""), i = [];
  if (l.length === 10)
    i.push(l.slice(0, 3)), i.push(l.slice(3, 6)), i.push(l.slice(6, 8)), i.push(l.slice(8, 10));
  else if (l.length === 9)
    i.push(l.slice(0, 3)), i.push(l.slice(3, 6)), i.push(l.slice(6, 9));
  else if (l.length === 11)
    i.push(l.slice(0, 3)), i.push(l.slice(3, 7)), i.push(l.slice(7, 11));
  else
    for (let r = 0; r < l.length; r += 3)
      i.push(l.slice(r, r + 3));
  const s = i.filter(Boolean).join(" ");
  return t && n ? `${t} ${s}` : s;
}
const On = /^[0-9]{7,14}$/, dt = (e, t) => {
  if (!e)
    return { dial: t, digits: "" };
  const n = e.indexOf("-");
  return n === -1 ? { dial: t, digits: e } : { dial: e.slice(0, n), digits: e.slice(n + 1) };
}, Mn = (e) => {
  const [t, n] = V(e), l = e.config.defaultDialCode ?? "+1", { dial: i, digits: s } = dt(t, l), r = P(() => {
    const c = /* @__PURE__ */ new Set();
    return $n.filter((h) => c.has(h.dial) ? !1 : (c.add(h.dial), !0));
  }, []), { draft: u, setDraft: o, flush: f, cancel: d } = ee({
    value: s,
    commit: (c) => n(c ? `${i}-${c}` : null),
    validate: (c) => c === "" || On.test(c)
  });
  return /* @__PURE__ */ w("span", { className: "bd-input bd-input-phone", children: [
    /* @__PURE__ */ a(
      "select",
      {
        value: i,
        onChange: (c) => {
          s && n(`${c.target.value}-${s}`);
        },
        children: r.map((c) => /* @__PURE__ */ w("option", { value: c.dial, children: [
          c.code,
          " ",
          c.dial
        ] }, c.dial))
      }
    ),
    /* @__PURE__ */ a(
      "input",
      {
        type: "tel",
        value: u,
        placeholder: e.config.placeholder ?? "phone number",
        onChange: (c) => o(c.target.value.replace(/[^0-9]/g, "")),
        onBlur: f,
        onKeyDown: (c) => {
          c.key === "Enter" && f(), c.key === "Escape" && (d(), c.target.blur());
        }
      }
    ),
    /* @__PURE__ */ a(U, { status: e.status })
  ] });
}, En = {
  type: "phone",
  empty: (e) => !e,
  Control: Mn,
  View: ({ value: e }) => {
    const { dial: t, digits: n } = dt(String(e ?? ""), "");
    return /* @__PURE__ */ w("p", { className: "bd-phone", children: [
      t ? `${t} ` : "",
      kn(n)
    ] });
  }
}, ut = wt(et), rl = ut.Provider;
function J() {
  return At(ut);
}
const oe = (e) => {
  var n;
  const t = ((n = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : n.call(e)) ?? {};
  for (const [l, i] of Object.entries(t)) {
    if (l.startsWith("_") || l.startsWith("@"))
      continue;
    const s = Array.isArray(i == null ? void 0 : i.type) ? i.type[0] : i == null ? void 0 : i.type;
    if (s === "varchar" || s === "text")
      return l;
  }
  return null;
}, Je = (e, t) => {
  var i, s;
  const n = ((i = e == null ? void 0 : e._blitzID) == null ? void 0 : i.value) ?? "", l = (t ? (s = e == null ? void 0 : e[t]) == null ? void 0 : s.value : null) ?? n;
  return { value: String(n), label: String(l), obj: e };
};
function $e(e, t) {
  const n = Array.isArray(e.attributeDetails.type) ? e.attributeDetails.type[0] : e.attributeDetails.type, [l, i] = A(null), [s, r] = A({});
  F(() => {
    let f = !1;
    if (n)
      return e.resolveModel(String(n)).then((d) => {
        f || i(d);
      }).catch((d) => console.error("[BlitzUIManagerReact] fk model resolve failed:", (d == null ? void 0 : d.message) ?? d)), () => {
        f = !0;
      };
  }, [n]);
  const u = t.join(",");
  return F(() => {
    if (!l || !t.length)
      return;
    let f = !1;
    const d = oe(l);
    return Promise.all(t.map((c) => l.get(c).catch(() => null))).then((c) => {
      if (f)
        return;
      const h = {};
      for (const m of c) {
        if (!m)
          continue;
        const b = Je(m, d);
        h[b.value] = b.label;
      }
      r(h);
    }), () => {
      f = !0;
    };
  }, [l, u]), { search: P(() => {
    if (l)
      return async (f) => {
        const d = oe(l), c = f && d ? [[d, "LIKE", `%${f}%`]] : void 0;
        return (await l.list({ conditions: c, limit: e.config.limit ?? 100 })).map((m) => Je(m, d));
      };
  }, [l, e.config.limit]), labels: s, ready: !!l };
}
const Tn = (e) => {
  var r;
  const [t, n] = V(e), l = t == null || t === "" ? [] : [String(((r = t == null ? void 0 : t._blitzID) == null ? void 0 : r.value) ?? t)], { search: i, labels: s } = $e(e, l);
  return /* @__PURE__ */ a(
    ce,
    {
      search: i,
      value: l,
      selectedLabels: s,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (u) => {
        var o;
        return n(((o = u[0]) == null ? void 0 : o.value) ?? null);
      }
    }
  );
}, Ln = (e) => {
  const [t] = V(e), n = Ae(t), { search: l, labels: i } = $e(e, n);
  return /* @__PURE__ */ a(
    ce,
    {
      search: l,
      multiple: !0,
      value: n,
      selectedLabels: i,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (s) => nt(e, n, s.map((r) => r.value))
    }
  );
}, ft = (e) => {
  const t = e.value, [n, l] = A((t == null ? void 0 : t.values) ?? []), { search: i, labels: s } = $e(e, n);
  return /* @__PURE__ */ a(
    ce,
    {
      search: i,
      multiple: !0,
      value: n,
      selectedLabels: s,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (r) => {
        const u = r.map((o) => o.value);
        l(u), e.onChange(u.length ? { op: "in", values: u } : null);
      }
    }
  );
}, gt = ({ value: e, attributeDetails: t }) => {
  const n = J(), l = Ae(e), [i, s] = A({}), r = Array.isArray(t == null ? void 0 : t.type) ? t == null ? void 0 : t.type[0] : t == null ? void 0 : t.type, u = l.join(",");
  return F(() => {
    if (!r || !l.length)
      return;
    let o = !1;
    return (async () => {
      var f;
      try {
        const d = await n.resolveModel(String(r)), c = oe(d);
        if (!c)
          return;
        const h = {};
        for (const m of l) {
          const b = await d.get(m).catch(() => null), v = (f = b == null ? void 0 : b[c]) == null ? void 0 : f.value;
          v != null && (h[m] = String(v));
        }
        !o && Object.keys(h).length && s(h);
      } catch {
      }
    })(), () => {
      o = !0;
    };
  }, [u, r]), /* @__PURE__ */ a("p", { className: "bd-fk", children: l.map((o) => i[o] ?? o).join(", ") });
}, Fn = {
  type: "fk",
  Control: Tn,
  Filter: ft,
  View: gt
}, Dn = {
  type: "mtm",
  default: () => null,
  Control: Ln,
  Filter: ft,
  View: gt
};
function ke(e) {
  const { accept: t, multiple: n, service: l, commit: i, preview: s } = e;
  return (u) => {
    const [o, f] = V(u), [d, c] = A(!1), [h, m] = A(null), b = _(null), v = u.services[l], N = async (O) => {
      if (O != null && O.length) {
        if (!v) {
          m(`No '${l}' service configured`);
          return;
        }
        c(!0), m(null);
        try {
          const S = [];
          for (const $ of Array.from(O))
            S.push(await v($));
          f(i(S));
        } catch (S) {
          m((S == null ? void 0 : S.message) ?? "Upload failed");
        } finally {
          c(!1), b.current && (b.current.value = "");
        }
      }
    };
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-upload", children: [
      s && o != null ? /* @__PURE__ */ a(s, { value: o }) : null,
      /* @__PURE__ */ a(
        "input",
        {
          ref: b,
          type: "file",
          accept: t,
          multiple: n,
          disabled: d,
          onChange: (O) => void N(O.target.files)
        }
      ),
      d ? /* @__PURE__ */ a("span", { className: "bd-uploading", children: "Uploading…" }) : null,
      h ? /* @__PURE__ */ a("span", { className: "bd-input-error", children: h }) : null,
      /* @__PURE__ */ a(U, { status: u.status })
    ] });
  };
}
const In = (e) => e != null && e.base && typeof e.sd == "string" ? `${e.base}${e.sd.substring(1)}` : null, qe = ({ value: e }) => {
  const t = Ne(Array.isArray(e) ? e : [e]);
  return /* @__PURE__ */ a("span", { className: "bd-image-previews", children: t.map((n, l) => {
    const i = In(n);
    return i ? /* @__PURE__ */ a("img", { src: i, alt: "" }, l) : null;
  }) });
}, jn = {
  type: ["image", "image[]"],
  default: () => [],
  // the service returns ImageRawType; a single image is still stored as an array
  Control: ke({ accept: "image/*", multiple: !0, service: "upload", commit: (e) => e, preview: qe }),
  View: ({ value: e }) => /* @__PURE__ */ a("div", { className: "bd-image", children: /* @__PURE__ */ a(qe, { value: e }) })
}, xn = {
  type: "file",
  Control: ke({ service: "uploadFile", commit: (e) => e[0] }),
  View: ({ value: e }) => {
    const t = typeof e == "string" ? e : e == null ? void 0 : e.url;
    return t ? /* @__PURE__ */ a("p", { children: /* @__PURE__ */ a("a", { className: "bd-file", href: ue(t), target: "_blank", rel: "noopener noreferrer", children: "Link" }) }) : null;
  }
}, _n = {
  type: "video",
  Control: ke({ accept: ".mp4,.m4v,.mov", service: "uploadVideo", commit: (e) => e[0] }),
  View: ({ value: e }) => {
    const t = e == null ? void 0 : e.url;
    return t ? /* @__PURE__ */ a("video", { className: "bd-video", controls: !0, children: /* @__PURE__ */ a("source", { src: ue(t) }) }) : null;
  }
}, Vn = [
  { key: "address", label: "Address" },
  { key: "street", label: "Street" },
  { key: "street_number", label: "Nr." },
  { key: "postal_code", label: "ZIP" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "lat", label: "Lat" },
  { key: "lng", label: "Lng" }
], Bn = (e) => {
  const [t, n] = V(e), l = t !== null && typeof t == "object" ? t : {}, i = (s, r) => {
    const u = { ...l, [s]: r }, o = Object.values(u).some((f) => f !== "" && f != null);
    n(o ? u : null);
  };
  return /* @__PURE__ */ w("div", { className: "bd-input bd-input-location", children: [
    Vn.map(({ key: s, label: r }) => /* @__PURE__ */ w("label", { className: "bd-location-field", children: [
      /* @__PURE__ */ a("span", { children: r }),
      /* @__PURE__ */ a("input", { value: String(l[s] ?? ""), onChange: (u) => i(s, u.target.value) })
    ] }, s)),
    /* @__PURE__ */ a(U, { status: e.status })
  ] });
}, Rn = re({ serialize: z }), Pn = ({ value: e, config: t }) => {
  const n = _(null), l = e == null ? void 0 : e.lat, i = e == null ? void 0 : e.lng, s = (t == null ? void 0 : t.apiKey) ?? (t == null ? void 0 : t.googleMapsApiKey);
  return F(() => {
    if (!s || !l || !i || !n.current)
      return;
    let r = !1;
    const u = n.current;
    return Dt(String(l), String(i), s).then((o) => {
      !r && o && u.replaceChildren(o);
    }), () => {
      r = !0, u.replaceChildren();
    };
  }, [l, i, s]), typeof e == "string" ? /* @__PURE__ */ a("p", { className: "bd-location", children: e }) : /* @__PURE__ */ w("div", { className: "bd-location", "data-lat": l, "data-lng": i, children: [
    e != null && e.address ? /* @__PURE__ */ a("p", { className: "bd-location-address", children: e.address }) : null,
    /* @__PURE__ */ a("div", { ref: n, className: "bd-location-map" })
  ] });
}, Un = {
  type: "location",
  empty: (e) => !e,
  Control: (e) => e.config.apiKey || e.value === null || typeof e.value == "object" ? /* @__PURE__ */ a(Bn, { ...e }) : /* @__PURE__ */ a(Rn, { ...e }),
  View: ({ value: e, config: t }) => /* @__PURE__ */ a(Pn, { value: e, config: t })
}, Kn = /^<p id="[^"]*"><br><\/p>$/, zn = {
  type: "htmlText",
  empty: (e) => !e,
  Control: fe((e) => z(Kn.test(e) ? "" : e)),
  // stored HTML is trusted app content, same rule as the vanilla read path
  View: ({ value: e }) => /* @__PURE__ */ a("div", { className: "bd-html", dangerouslySetInnerHTML: { __html: String(e ?? "") } })
}, Gn = [
  Bt,
  Rt,
  Pt,
  Jt,
  qt,
  Ht,
  sn,
  an,
  rn,
  cn,
  on,
  dn,
  fn,
  gn,
  mn,
  bn,
  vn,
  pn,
  Cn,
  Sn,
  En,
  Fn,
  Dn,
  jn,
  xn,
  _n,
  Un,
  zn
];
const Wn = ({ value: e }) => /* @__PURE__ */ a("span", { className: "bd-fallback", children: typeof e == "object" ? JSON.stringify(e) : String(e) });
class Zn extends St {
  constructor() {
    super(...arguments);
    B(this, "state", { failed: !1 });
  }
  static getDerivedStateFromError() {
    return { failed: !0 };
  }
  componentDidCatch(n) {
    console.error("[BlitzUIManagerReact] surface error:", (n == null ? void 0 : n.stack) ?? (n == null ? void 0 : n.message) ?? n), this.props.onError(n);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
const Jn = (e) => (n) => {
  const l = n.value;
  return /* @__PURE__ */ a(
    e,
    {
      ...n,
      value: (l == null ? void 0 : l.value) ?? null,
      onChange: (i) => n.onChange(i == null || i === "" ? null : { op: "contains", value: i })
    }
  );
}, qn = (e) => e.value !== null && e.value !== void 0 && typeof e.value == "object" ? "json" : e.kind === "draft" ? "varchar" : "text";
function Hn(e, t, n, l) {
  const i = t.config.resolve(e.type, e.model, e.name, n.defaultConfig, e.mountConfig);
  return i.multiple === void 0 && e.many && (i.multiple = !0), {
    value: e.value,
    onChange: (s) => e.set(s),
    add: e.add,
    remove: e.remove,
    subscribe: i.live === !1 ? void 0 : e.subscribe,
    status: e.status,
    invalid: l,
    resolveModel: t.resolveModel,
    attributeDetails: e.attributeDetails ?? {},
    config: i,
    settings: t.settings,
    services: e.services ?? t.services
  };
}
const Yn = ({ View: e, props: t, empty: n }) => {
  var i;
  const [l] = V(t);
  return n(l) ? (i = t.config) != null && i.emptyMsg ? /* @__PURE__ */ a("span", { className: "bd-empty", children: t.config.emptyMsg }) : null : /* @__PURE__ */ a(e, { value: l, attributeDetails: t.attributeDetails, config: t.config, settings: t.settings });
}, Q = ({ attribute: e, port: t, mode: n = "write", use: l, config: i, label: s, className: r }) => {
  const u = J(), [o, f] = A(null), [d, c] = A(8), h = i ? JSON.stringify(i) : "", m = P(() => t ? i ? { ...t, mountConfig: { ...t.mountConfig, ...i } } : t : Et(e, i), [e, t, h]), b = P(() => l && typeof l == "object" ? se(l) : l, [l]), v = P(() => u.registry.resolve(
    { type: m.type, many: m.many, model: m.model, name: m.name, hint: m.hint, use: b, maxLayer: d },
    u.debug ? (T) => console.info(`[BlitzUIManagerReact] ${T}`) : void 0
  ), [u, m, b, d]), N = P(() => Hn(m, u, v, f), [m, u, v]), O = () => {
    var I;
    const T = n === "read" ? "view" : n === "filter" ? "filter" : "control", M = ((I = v.sources[T]) == null ? void 0 : I.layer) ?? 0;
    c(M - 1);
  };
  let S = null;
  if (n === "read") {
    const T = v.view ?? Wn, M = v.empty ?? $t;
    S = /* @__PURE__ */ a(Yn, { View: T, props: N, empty: M });
  } else if (n === "filter") {
    let T = v.filter;
    if (!T && v.control && Xe.has(m.type) && (T = Jn(v.control)), !T)
      return null;
    S = /* @__PURE__ */ a(T, { ...N });
  } else {
    let T = v.control;
    if (!T) {
      const M = qn(m);
      M !== m.type && (u.warn(`No usable UI for type '${m.type}' — falling back to '${M}'`), T = u.registry.resolve({ type: M, model: m.model, name: m.name, maxLayer: 0 }).control);
    }
    if (!T)
      return u.warn(`Editor for type '${m.type}' not supported`), null;
    S = /* @__PURE__ */ a(T, { ...N });
  }
  const $ = s === !0 ? X(N.attributeDetails["label-int"], N.attributeDetails.label, u.settings.language ?? "en", m.name) : s;
  return /* @__PURE__ */ w("div", { className: `bd-field bd-field-${m.type}${r ? ` ${r}` : ""}`, children: [
    $ ? /* @__PURE__ */ a("label", { className: "bd-field-label", children: $ }) : null,
    /* @__PURE__ */ a(Zn, { onError: O, children: S }, `${n}-${d}`),
    o ? /* @__PURE__ */ a("p", { className: "bd-invalid-msg", children: o }) : null
  ] });
};
function ge(e) {
  const t = J(), n = typeof e == "string", [l, i] = A(n ? null : e);
  return F(() => {
    if (!n) {
      i(e);
      return;
    }
    let s = !1;
    return t.resolveModel(e).then((r) => {
      s || i(r);
    }).catch((r) => t.warn(`model '${e}' failed to resolve: ${(r == null ? void 0 : r.message) ?? r}`)), () => {
      s = !0;
    };
  }, [e, n, t]), l;
}
function Qn(e, t) {
  var l;
  if (t)
    return t;
  const n = ((l = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : l.call(e)) ?? {};
  return Object.keys(n).filter((i) => !i.startsWith("_") && !i.startsWith("@"));
}
const cl = (e) => {
  var N, O, S;
  const t = J(), n = ge(e.model), l = _({}), [i, s] = A(null), [r, u] = A(!1), [o, f] = A(!1), d = P(() => Qn(n, e.attributes), [n, e.attributes]), c = P(() => {
    var T;
    if (!n)
      return [];
    const $ = ((T = n.getAttributesDetails) == null ? void 0 : T.call(n)) ?? {};
    return d.map((M) => {
      var y, E;
      const I = $[M] ?? {}, j = Tt(l.current, M, I, n, e.config), L = t.registry.resolve({ type: j.type, many: j.many, model: j.model, name: M, hint: j.hint }), C = ((y = e.presetValues) == null ? void 0 : y[M]) ?? I.default ?? ((E = L.default) == null ? void 0 : E.call(L));
      return C !== void 0 && l.current[M] === void 0 && (l.current[M] = C), { ...j, value: l.current[M] };
    });
  }, [n, d]);
  if (F(() => () => {
    l.current = {};
  }, [n]), !n)
    return /* @__PURE__ */ a("div", { className: "bd-addform bd-loading", children: "Loading…" });
  const h = ((N = n.getAttributesDetails) == null ? void 0 : N.call(n)) ?? {}, m = t.settings.language ?? "en", b = ($) => {
    var T, M;
    return X((T = h[$]) == null ? void 0 : T["label-int"], (M = h[$]) == null ? void 0 : M.label, m, $);
  }, v = async () => {
    var M, I, j;
    s(null);
    const T = (e.requireAll ? d : e.requiredAttributes ?? []).filter((L) => l.current[L] == null);
    if (T.length) {
      s(`Missing required fields: ${T.map(b).join(", ")}`);
      return;
    }
    u(!0);
    try {
      const L = await ((M = e.beforeSubmit) == null ? void 0 : M.call(e, { ...l.current }));
      if (L) {
        s(L);
        return;
      }
      const C = await n.add({ ...l.current });
      if (!C) {
        s("An unexpected error occurred!");
        return;
      }
      (I = e.onSuccess) == null || I.call(e, C), e.onServerSuccess && ((j = C.addEventListener) == null || j.call(C, "syncStatusChange", (y) => {
        var E, x;
        (y == null ? void 0 : y.status) === "completed" ? (E = e.onServerSuccess) == null || E.call(e, C) : (y == null ? void 0 : y.status) === "failed" && s(((x = y == null ? void 0 : y.job) == null ? void 0 : x.message) ?? "Saving failed");
      })), f(!0);
    } catch (L) {
      s((L == null ? void 0 : L.message) ?? "An unexpected error occurred!");
    } finally {
      u(!1);
    }
  };
  return o ? /* @__PURE__ */ a("div", { className: `bd-addform ${((O = n.getName) == null ? void 0 : O.call(n)) ?? ""}`, children: /* @__PURE__ */ a("p", { className: "success-msg", children: e.successMessage ?? "Added successfully." }) }) : /* @__PURE__ */ w("div", { className: `bd-addform ${((S = n.getName) == null ? void 0 : S.call(n)) ?? ""}`, children: [
    c.map(($) => /* @__PURE__ */ a(
      Q,
      {
        port: $,
        mode: "write",
        label: e.withLabels ? b($.name) : void 0
      },
      $.name
    )),
    i ? /* @__PURE__ */ a("p", { className: "bd-invalid-msg", children: i }) : null,
    /* @__PURE__ */ a("button", { type: "button", className: "add-btn", disabled: r, onClick: () => void v(), children: r ? "…" : e.addButtonLabel ?? "Add" })
  ] });
}, He = (e) => e != null && typeof e == "object" && "_attributes" in e, ol = ({ src: e, attributes: t, withLabels: n, use: l, config: i }) => {
  var o;
  const s = J(), r = P(() => Array.isArray(e) ? e : He(e) ? (t ?? Object.keys(e._attributes ?? {}).filter((d) => !d.startsWith("_") && !d.startsWith("@")).filter((d) => {
    var c;
    return ((c = e[d]) == null ? void 0 : c.value) !== void 0;
  })).map((d) => e[d]).filter(Boolean) : e == null ? [] : [e], [e, t]), u = s.settings.language ?? "en";
  return /* @__PURE__ */ a("div", { className: `bd-object-editor${He(e) ? ` ${((o = e._blitzID) == null ? void 0 : o.value) ?? ""}` : ""}`, children: r.map((f) => {
    var c, h, m, b;
    const d = ((b = (m = (h = (c = f._object) == null ? void 0 : c.model) == null ? void 0 : h.getAttributesDetails) == null ? void 0 : m.call(h)) == null ? void 0 : b[f._name]) ?? {};
    return /* @__PURE__ */ a(
      Q,
      {
        attribute: f,
        mode: "write",
        use: l,
        config: i,
        label: n ? X(d["label-int"], d.label, u, f._name) : void 0
      },
      f._name
    );
  }) });
}, Xn = ({ object: e, attributes: t, withLabels: n, config: l }) => {
  var o, f, d, c, h, m;
  const i = J(), s = P(() => (t ?? Object.keys((e == null ? void 0 : e._attributes) ?? {})).filter((v) => !v.startsWith("_") && !v.startsWith("@")).filter((v) => {
    var N;
    return ((N = e == null ? void 0 : e[v]) == null ? void 0 : N.value) !== void 0;
  }), [e, t]);
  if (!e)
    return null;
  const r = ((d = (f = (o = e._object) == null ? void 0 : o.model) == null ? void 0 : f.getAttributesDetails) == null ? void 0 : d.call(f)) ?? ((h = (c = e.model) == null ? void 0 : c.getAttributesDetails) == null ? void 0 : h.call(c)) ?? {}, u = i.settings.language ?? "en";
  return /* @__PURE__ */ a("div", { className: `bd-objectview ${((m = e._blitzID) == null ? void 0 : m.value) ?? ""}`, children: s.map((b) => {
    var v, N;
    return /* @__PURE__ */ a(
      Q,
      {
        attribute: e[b],
        mode: "read",
        config: l,
        label: n ? X((v = r[b]) == null ? void 0 : v["label-int"], (N = r[b]) == null ? void 0 : N.label, u, b) : void 0
      },
      b
    );
  }) });
};
function el(e, t) {
  const [n, l] = A([]), [i, s] = A(!1), r = t ? JSON.stringify(t) : "";
  return F(() => {
    if (!e)
      return;
    s(!1);
    const u = e.subscribeToList(t, (o) => {
      l([...o.items ?? []]), o.nextSource || s(!0);
    }, !0);
    return () => {
      u == null || u();
    };
  }, [e, r]), { items: n, settled: i };
}
const dl = (e) => {
  var d;
  const t = ge(e.model), { items: n, settled: l } = el(t, e.options), [i, s] = A(1), r = e.objectsPerPage ?? 10, u = P(() => {
    let c = e.filter ? n.filter(e.filter) : [...n];
    return e.sort && c.sort(e.sort), c;
  }, [n, e.filter, e.sort]);
  F(() => {
    s(1);
  }, [e.filter]);
  const o = e.pagination ? Math.max(1, Math.ceil(u.length / r)) : 1, f = e.pagination ? u.slice((i - 1) * r, i * r) : u;
  return !l && n.length === 0 ? /* @__PURE__ */ a("div", { className: "bd-list bd-loading", children: e.loading ?? /* @__PURE__ */ a("span", { className: "spinner", children: "Loading…" }) }) : /* @__PURE__ */ w("div", { className: `bd-list ${((d = t == null ? void 0 : t.getName) == null ? void 0 : d.call(t)) ?? ""}`, children: [
    u.length === 0 && l ? /* @__PURE__ */ a("p", { className: "bd-list-empty", children: e.noResultsMessage ?? "No results." }) : f.map((c) => {
      var h, m;
      return /* @__PURE__ */ a(
        "div",
        {
          className: `card ${((h = c._blitzID) == null ? void 0 : h.value) ?? ""}`,
          onClick: e.onObjectClick ? () => e.onObjectClick(c) : void 0,
          children: e.renderRow ? e.renderRow(c) : /* @__PURE__ */ a(Xn, { object: c, attributes: e.attributes, withLabels: e.withLabels })
        },
        (m = c._blitzID) == null ? void 0 : m.value
      );
    }),
    e.pagination && o > 1 ? /* @__PURE__ */ a("div", { className: "bd-list-pagination", children: Array.from({ length: o }, (c, h) => h + 1).map((c) => /* @__PURE__ */ a(
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
}, tl = [
  { attribute: "_blitzstamp", label: "Newest", order: "desc" },
  { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
], nl = (e, t) => {
  const n = t === "desc" ? -1 : 1;
  return (l, i) => {
    var o, f;
    const s = (o = l[e]) == null ? void 0 : o.value, r = (f = i[e]) == null ? void 0 : f.value;
    return s == null || r == null ? s == null && r == null ? 0 : s == null ? n : -n : (typeof s == "number" && typeof r == "number" ? s - r : String(s).localeCompare(String(r))) * n;
  };
}, ul = (e) => {
  var j, L, C;
  const t = J(), n = ge(e.model), [l, i] = A(""), [s, r] = A(!1), u = _({}), o = _(""), { onFilterChange: f } = e, d = Z(() => {
    const y = Qe(u.current), E = o.current.trim(), x = e.searchAttributes ?? [], K = E && x.length ? (q) => {
      const te = new RegExp(we(E), "i");
      return x.some((H) => {
        var ne;
        return typeof ((ne = q[H]) == null ? void 0 : ne.value) == "string" && te.test(q[H].value);
      });
    } : null;
    f(!y && !K ? null : (q) => (!K || K(q)) && (!y || y(q)));
  }, [f, (j = e.searchAttributes) == null ? void 0 : j.join(",")]);
  F(() => {
    o.current = l;
    const y = setTimeout(d, l ? 300 : 0);
    return () => clearTimeout(y);
  }, [l, d]);
  const c = e.sortAttributes ?? tl, [h, m] = A(0), { onSortChange: b } = e;
  F(() => {
    if (!b)
      return;
    const y = c[h];
    b(h === 0 ? null : nl(y.attribute, y.order));
  }, [h, b]);
  const v = Z((y) => {
    var x;
    if (!n)
      return [];
    const E = ((x = n.getAttributesDetails) == null ? void 0 : x.call(n)) ?? {};
    return y.map((K) => Ye(u.current, K, E[K] ?? {}, n, d));
  }, [n, d]), N = P(() => v(e.filterAttributes ?? []), [v, e.filterAttributes]), O = P(() => v(e.dialogFilterAttributes ?? []), [v, e.dialogFilterAttributes]), S = () => {
    for (const y of Object.keys(u.current))
      delete u.current[y];
    i(""), r(!1), d();
  }, $ = ((L = n == null ? void 0 : n.getAttributesDetails) == null ? void 0 : L.call(n)) ?? {}, T = t.settings.language ?? "en", M = (y) => {
    var E, x;
    return X((E = $[y]) == null ? void 0 : E["label-int"], (x = $[y]) == null ? void 0 : x.label, T, y);
  }, I = l.trim() !== "" || Object.keys(u.current).length > 0;
  return /* @__PURE__ */ w("div", { className: "bd-searchbox", children: [
    (C = e.searchAttributes) != null && C.length ? /* @__PURE__ */ a(
      "input",
      {
        className: "bd-searchbox-input",
        type: "search",
        value: l,
        placeholder: e.searchPlaceholder ?? "Search…",
        onChange: (y) => i(y.target.value)
      }
    ) : null,
    N.length ? /* @__PURE__ */ a("div", { className: "bd-searchbox-filters", children: N.map((y) => /* @__PURE__ */ a(Q, { port: y, mode: "filter", label: e.withLabels ? M(y.name) : void 0 }, y.name)) }) : null,
    /* @__PURE__ */ w("div", { className: "bd-searchbox-actions", children: [
      e.onSortChange && c.length ? /* @__PURE__ */ a(
        "select",
        {
          className: "bd-searchbox-sort",
          value: h,
          onChange: (y) => m(Number(y.target.value)),
          children: c.map((y, E) => /* @__PURE__ */ a("option", { value: E, children: y.label }, E))
        }
      ) : null,
      O.length ? /* @__PURE__ */ a("button", { type: "button", className: "bd-searchbox-filters-btn", onClick: () => r(!0), children: e.filtersButtonLabel ?? "Filters" }) : null,
      I ? /* @__PURE__ */ a("button", { type: "button", className: "bd-searchbox-clear", onClick: S, children: e.clearFiltersLabel ?? "Clear" }) : null
    ] }),
    s ? /* @__PURE__ */ a("div", { className: "bd-filters-dialog", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ w("div", { className: "bd-filters-dialog-box", children: [
      /* @__PURE__ */ w("header", { children: [
        /* @__PURE__ */ a("h3", { children: e.dialogTitle ?? "Filters" }),
        /* @__PURE__ */ a("button", { type: "button", className: "close-btn", onClick: () => r(!1), children: "×" })
      ] }),
      O.map((y) => /* @__PURE__ */ a(Q, { port: y, mode: "filter", label: e.withLabels ? M(y.name) : void 0 }, y.name)),
      /* @__PURE__ */ a("footer", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => r(!1), children: "Done" }) })
    ] }) }) : null
  ] });
}, fl = (e) => {
  var Oe, Me, Ee, Te, Le, Fe, De, Ie, je, xe;
  const t = J(), n = ge(e.model), l = _({}), [i, s] = A(""), r = _(""), [u, o] = A(null), f = ((Me = (Oe = e.sort) == null ? void 0 : Oe.options[0]) == null ? void 0 : Me.value) ?? null, [d, c] = A(((Ee = e.sort) == null ? void 0 : Ee.value) ?? f), [h, m] = A(0), [b, v] = A({}), N = _(!1);
  if (!N.current) {
    N.current = !0;
    for (const [g, p] of Object.entries(e.defaults ?? {}))
      l.current[g] = JSON.parse(JSON.stringify(p));
  }
  const O = ((Te = n == null ? void 0 : n.getAttributesDetails) == null ? void 0 : Te.call(n)) ?? {}, S = ((Le = n == null ? void 0 : n.getSystemAttributesDetails) == null ? void 0 : Le.call(n)) ?? {}, $ = (g) => {
    var p;
    return O[g] ?? ((p = e.filterAttributes) != null && p.includes(g) ? S[g] : void 0);
  }, T = t.settings.language ?? "en", M = (g) => {
    var p, k, D;
    return ((p = e.labels) == null ? void 0 : p[g]) ?? X((k = $(g)) == null ? void 0 : k["label-int"], (D = $(g)) == null ? void 0 : D.label, T, g);
  }, { onFilterChange: I, onActiveChange: j } = e, L = Z(() => {
    const g = Qe(l.current), p = r.current.trim(), k = e.searchAttributes ?? [], D = p && k.length ? (R) => {
      const G = new RegExp(we(p), "i");
      return k.some((W) => {
        var ie;
        return typeof ((ie = R[W]) == null ? void 0 : ie.value) == "string" && G.test(R[W].value);
      });
    } : null;
    I(!g && !D ? null : (R) => (!D || D(R)) && (!g || g(R))), m((R) => R + 1);
  }, [I, (Fe = e.searchAttributes) == null ? void 0 : Fe.join(",")]);
  F(() => {
    r.current = i;
    const g = setTimeout(L, i ? 300 : 0);
    return () => clearTimeout(g);
  }, [i, L]);
  const C = (g, p) => {
    if (!g || !p)
      return !g && !p;
    if (g.op !== p.op)
      return !1;
    const k = (G) => Array.isArray(G.values) ? G.values.map(String).sort() : null, D = k(g), R = k(p);
    return D || R ? !!D && !!R && D.length === R.length && D.every((G, W) => G === R[W]) : g.value === p.value && g.min === p.min && g.max === p.max;
  }, y = e.defaults ?? {}, E = i.trim() !== "" || [.../* @__PURE__ */ new Set([...Object.keys(l.current), ...Object.keys(y)])].some((g) => !C(l.current[g], y[g])) || d !== f;
  F(() => {
    j == null || j(E);
  }, [E, j]);
  const x = (e.searchAttributes ?? []).filter((g) => {
    var p;
    return typeof ((p = $(g)) == null ? void 0 : p.type) == "string" && ["varchar", "text"].includes($(g).type);
  }), K = (g) => Ye(l.current, g, $(g) ?? {}, n, L, { placeholder: `${M(g)}...` }), q = (g) => {
    const p = t.registry.resolve({ type: g.type, many: g.many, model: g.model, name: g.name, hint: g.hint });
    return !!(p.filter || p.control && Xe.has(g.type));
  }, te = (e.filterAttributes ?? []).filter((g) => $(g) && !x.includes(g) && q(K(g))), H = te.map((g) => {
    const p = l.current[g], k = (p == null ? void 0 : p.values) ?? [];
    return k.length === 1 ? `${g}:${k[0]}` : null;
  }).filter(Boolean).join(",");
  F(() => {
    var k;
    let g = !1;
    const p = H ? H.split(",") : [];
    for (const D of p) {
      if (b[D] !== void 0)
        continue;
      const [R, G] = D.split(":"), W = (k = $(R)) == null ? void 0 : k.type, ie = Array.isArray(W) ? W[0] : W;
      typeof ie == "string" && (async () => {
        var _e;
        try {
          const Ve = await t.resolveModel(ie), Be = oe(Ve), ye = Be ? await Ve.get(G) : null, Re = (_e = ye == null ? void 0 : ye[Be]) == null ? void 0 : _e.value;
          !g && Re != null && v((vt) => ({ ...vt, [D]: String(Re) }));
        } catch {
        }
      })();
    }
    return () => {
      g = !0;
    };
  }, [H]);
  const ne = (g) => {
    const p = l.current[g];
    if (!p)
      return "All";
    if (p.op === "contains")
      return `"${p.value}"`;
    const k = p.values ?? (p.value != null ? [p.value] : []);
    return k.length === 0 ? "Set" : k.length === 1 ? b[`${g}:${k[0]}`] ?? "1 selected" : `${k.length} selected`;
  }, ht = (g) => o((p) => p === g ? null : g), mt = () => {
    var g, p;
    o(null);
    for (const k of Object.keys(l.current))
      delete l.current[k];
    s(""), I(null), e.sort && d !== f && (c(f), (p = (g = e.sort).onChange) == null || p.call(g, f)), m((k) => k + 1);
  }, he = (g, p) => {
    o(null), p ? l.current[g] = JSON.parse(JSON.stringify(p)) : delete l.current[g], L();
  }, bt = () => {
    var g, p;
    o(null);
    for (const k of Object.keys(l.current))
      delete l.current[k];
    for (const [k, D] of Object.entries(y))
      l.current[k] = JSON.parse(JSON.stringify(D));
    s(""), L(), e.sort && d !== f && (c(f), (p = (g = e.sort).onChange) == null || p.call(g, f));
  }, le = [], yt = [...Object.keys(y), ...te.filter((g) => !y[g])];
  for (const g of yt) {
    const p = l.current[g], k = y[g];
    k && C(p, k) ? le.push({ key: g, label: ((De = e.defaultLabels) == null ? void 0 : De[g]) ?? M(g), active: !0, toggle: () => he(g, null) }) : k && !p ? le.push({ key: g, label: ((Ie = e.defaultLabels) == null ? void 0 : Ie[g]) ?? M(g), active: !1, toggle: () => he(g, k) }) : p && le.push({ key: g, label: `${M(g)}: ${ne(g)}`, active: !0, toggle: () => he(g, null) });
  }
  i.trim() && x.length && le.push({
    key: "~search",
    label: `${x.map(M).join(", ")}: "${i.trim()}"`,
    active: !0,
    toggle: () => s("")
  });
  const { onPillsChange: me } = e;
  if (F(() => {
    !me || !n || me({ pills: le, differs: E, reset: bt });
  }, [me, n, h, b, i, d, E]), !n)
    return null;
  const be = (g, p, k, D) => /* @__PURE__ */ w("div", { className: `bd-fmenu-row${u === g ? " open" : ""}`, children: [
    /* @__PURE__ */ w("button", { type: "button", className: "bd-fmenu-head", "aria-expanded": u === g, onClick: () => ht(g), children: [
      /* @__PURE__ */ a("span", { className: "bd-fmenu-label", children: p }),
      /* @__PURE__ */ a("span", { className: "bd-fmenu-value", children: k }),
      /* @__PURE__ */ a("span", { className: "bd-fmenu-chevron", children: "›" })
    ] }),
    u === g ? /* @__PURE__ */ a("div", { className: "bd-fmenu-panel", children: D() }) : null
  ] }, g);
  return /* @__PURE__ */ w("div", { className: "bd-fmenu", children: [
    x.length > 0 ? be(
      "search",
      x.map(M).join(", "),
      i.trim() ? `"${i.trim()}"` : "All",
      () => /* @__PURE__ */ a(
        "input",
        {
          className: "bd-fmenu-search",
          type: "text",
          autoFocus: !0,
          value: i,
          placeholder: e.searchPlaceholder ?? `Search ${x.map(M).join(", ")}...`,
          onChange: (g) => s(g.target.value)
        }
      )
    ) : null,
    te.map((g) => be(
      g,
      M(g),
      ne(g),
      () => /* @__PURE__ */ a(Q, { port: K(g), mode: "filter" })
    )),
    (je = e.sort) != null && je.options.length ? /* @__PURE__ */ w(Pe, { children: [
      /* @__PURE__ */ a("div", { className: "bd-fmenu-divider" }),
      be(
        "sort",
        e.sort.label ?? "Sort",
        ((xe = e.sort.options.find((g) => g.value === d)) == null ? void 0 : xe.label) ?? String(d),
        () => /* @__PURE__ */ a(Pe, { children: e.sort.options.map((g) => /* @__PURE__ */ w(
          "button",
          {
            type: "button",
            className: `bd-fmenu-option${g.value === d ? " checked" : ""}`,
            onClick: () => {
              var p, k;
              c(g.value), (k = (p = e.sort).onChange) == null || k.call(p, g.value), o(null);
            },
            children: [
              /* @__PURE__ */ a("span", { children: g.label }),
              /* @__PURE__ */ a("span", { className: "bd-fmenu-check", children: "✓" })
            ]
          },
          g.value
        )) })
      )
    ] }) : null,
    /* @__PURE__ */ a("div", { className: "bd-fmenu-divider" }),
    /* @__PURE__ */ a("button", { type: "button", className: "bd-fmenu-head", onClick: mt, children: /* @__PURE__ */ a("span", { className: "bd-fmenu-label", children: e.clearLabel ?? "Clear filters" }) })
  ] });
};
for (const e of Gn)
  et.register(e);
const gl = "0.1.0";
export {
  cl as BDAddForm,
  ol as BDEditor,
  Q as BDField,
  fl as BDFiltersMenu,
  dl as BDList,
  Xn as BDObjectView,
  ul as BDSearchBox,
  Gn as BUILTIN_TYPES,
  rl as BlitzUIProvider,
  Zt as ChipsControl,
  ce as Picker,
  jt as ReactUIManager,
  U as SaveState,
  gl as VERSION,
  Bt as boolean,
  vn as code,
  Qe as compileConditions,
  on as currency,
  pn as date,
  Cn as datetime,
  Tt as draftPort,
  dn as duration,
  fn as email,
  Sn as enumType,
  xn as file,
  Fn as fk,
  rn as float,
  Pt as hex,
  zn as htmlText,
  jn as image,
  an as integer,
  $t as isEmptyValue,
  bn as json,
  Et as livePort,
  Un as location,
  ct as makeDateControl,
  st as makeNumberControl,
  fe as makeTextAreaControl,
  re as makeTextControl,
  ke as makeUploadControl,
  qt as markdown,
  Dn as mtm,
  cn as percentage,
  En as phone,
  Ye as queryPort,
  Jt as text,
  sn as texti18n,
  et as ui,
  gn as url,
  xt as useBDStatus,
  V as useBDValue,
  ee as useDraftCommit,
  el as useSettledList,
  J as useUIManager,
  Rt as varchar,
  Ht as varcharMany,
  _n as video,
  mn as youtube
};
