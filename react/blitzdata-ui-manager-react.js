var pt = Object.defineProperty;
var Ct = (e, t, n) => t in e ? pt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var B = (e, t, n) => (Ct(e, typeof t != "symbol" ? t + "" : t, n), n);
import { BDModel as Nt } from "@blitzdata.ts/core";
import { jsx as a, jsxs as A, Fragment as Pe } from "react/jsx-runtime";
import { useState as S, useRef as _, useEffect as L, useCallback as Z, useMemo as P, createContext as wt, useContext as At, Component as St } from "react";
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
    const { type: l, many: i, model: s, name: c, hint: u, use: o, maxLayer: f = 8 } = t, d = { defaultConfig: {}, sources: {} }, r = (b, v, N) => {
      if (!(!b || v > f)) {
        for (const k of Ue) {
          const w = b[k];
          w !== void 0 && (d[k] = w, d.sources[k] = { layer: v, label: N });
        }
        b.defaultConfig && Object.assign(d.defaultConfig, b.defaultConfig);
      }
    }, h = (b, v, N) => {
      const k = this.presets.get(b);
      if (k) {
        const { extends: O, ...E } = k;
        return O && r({ ...this.builtins.get(O), ...this.typeOverlays.get(O) }, v, `${N} (extends '${O}')`), r(E, v + 1, N), !0;
      }
      const w = { ...this.builtins.get(b), ...this.typeOverlays.get(b) };
      return Object.keys(w).length ? (r(w, v + 1, N), !0) : !1;
    };
    r(this.builtins.get(l), 0, "built-in"), i && r(this.builtins.get(`${l}[]`), 0, "built-in (many)"), r(this.typeOverlays.get(l), 1, "defineUI"), i && r(this.typeOverlays.get(`${l}[]`), 1, "defineUI (many)");
    const m = i ? void 0 : this.bindings.get(l);
    if (m && !h(m.preset, 2, m.label ?? `binding '${m.preset}'`) && this.warn(`type '${l}' is bound to '${m.preset}' — not registered, using '${l}' default`), u && !h(u, 4, `preset '${u}'`) && this.warn(`${s ?? "?"}.${c ?? "?"} requests ui '${u}' — not registered, using '${l}' default`), s && c && r(this.attrOverlays.get(`${s}.${c}`), 6, "defineUIFor"), o && (typeof o == "string" ? h(o, 7, `use '${o}'`) || this.warn(`mount requests ui '${o}' — not registered, using '${l}' default`) : typeof o == "function" ? r({ control: o }, 8, "use (control)") : r(o, 8, "use (module)")), n) {
      const b = Ue.filter((v) => d.sources[v]).map((v) => `${v} from ${d.sources[v].label}`);
      n(`${s ?? "?"}.${c ?? l} → ${b.join("; ") || "nothing registered"}`);
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
  var i, s, c, u, o, f, d;
  const n = ((u = (c = (s = (i = e._object) == null ? void 0 : i.model) == null ? void 0 : s.getAttributesDetails) == null ? void 0 : c.call(s)) == null ? void 0 : u[e._name]) ?? {}, l = n.type ?? e._type;
  return {
    kind: "live",
    type: Ce(e._name, l),
    many: Array.isArray(n.type) && !e._name.endsWith("_mtm"),
    model: (d = (f = (o = e._object) == null ? void 0 : o.model) == null ? void 0 : f.getName) == null ? void 0 : d.call(f),
    name: e._name,
    attribute: e,
    value: e.value,
    set: (r) => e.edit(r),
    add: (r) => {
      var h;
      return (h = e.add) == null ? void 0 : h.call(e, r);
    },
    remove: (r) => {
      var h;
      return (h = e.remove) == null ? void 0 : h.call(e, r);
    },
    // VALUE stream: the object's remoteChange event — patch in place
    subscribe: (r) => {
      const h = e._object;
      if (typeof (h == null ? void 0 : h.addEventListener) != "function")
        return () => {
        };
      const m = (b) => {
        b && !Object.hasOwn(b, e._name) || r(e.value);
      };
      return h.addEventListener("remoteChange", m), () => h.removeEventListener("remoteChange", m);
    },
    // SAVE-STATE stream: pending | saved | failed — distinct from value
    status: (r) => {
      var h;
      return ((h = e.syncStatus) == null ? void 0 : h.call(e, r)) ?? (() => {
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
    set: (c) => {
      e[t] = c;
    },
    add: (c) => {
      (e[t] ?? (e[t] = [])).push(c);
    },
    remove: (c) => {
      e[t] = (e[t] ?? []).filter((u) => u !== c);
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: i
  };
}
function Ye(e, t, n, l, i, s) {
  var c;
  return {
    kind: "query",
    type: Ce(t, n.type),
    many: Array.isArray(n.type) && !t.endsWith("_mtm"),
    model: (c = l == null ? void 0 : l.getName) == null ? void 0 : c.call(l),
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
    const s = Object.values(i).find((c) => typeof c == "string");
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
  const [t, n] = S(e.value), l = _(e.value);
  e.value !== l.current && (l.current = e.value, n(e.value)), L(() => {
    var s;
    return (s = e.subscribe) == null ? void 0 : s.call(e, (c) => {
      l.current = c, n(c);
    });
  }, [e.subscribe]);
  const i = Z((s) => {
    n(s), e.onChange(s);
  }, [e.onChange]);
  return [t, i];
}
function xt(e) {
  const [t, n] = S(null);
  return L(() => {
    var l;
    return (l = e.status) == null ? void 0 : l.call(e, n);
  }, [e.status]), t;
}
function ee(e) {
  const { value: t, commit: n, validate: l, delay: i = 500, flushOnUnmount: s = !0 } = e, [c, u] = S(t), o = _(t), f = _(null), d = _(c);
  d.current = c;
  const r = _(t);
  t !== r.current && (r.current = t, o.current = t, f.current === null && u(t));
  const h = () => {
    f.current !== null && (clearTimeout(f.current), f.current = null);
  }, m = Z((w) => {
    h(), !(l && !l(w)) && w !== o.current && (o.current = w, n(w));
  }, [n, l]), b = Z((w) => {
    u(w), d.current = w, h(), f.current = setTimeout(() => {
      f.current = null, m(w);
    }, i);
  }, [m, i]), v = Z(() => m(d.current), [m]), N = Z(() => {
    h(), u(o.current), d.current = o.current;
  }, []), k = _(v);
  return k.current = s ? v : () => {
  }, L(() => () => k.current(), []), { draft: c, setDraft: b, flush: v, cancel: N };
}
const U = ({ status: e }) => {
  var u;
  const t = xt({ status: e }), n = _(!1), [l, i] = S(!1), s = t == null ? void 0 : t.status;
  if (L(() => {
    if (s && !(s === "completed" && !n.current) && (n.current = !0, i(!0), s === "completed")) {
      const o = setTimeout(() => i(!1), 1e3);
      return () => clearTimeout(o);
    }
  }, [t]), !l || !s || s === "completed" && !n.current)
    return null;
  const c = (u = t == null ? void 0 : t.job) == null ? void 0 : u.message;
  return /* @__PURE__ */ a(
    "span",
    {
      className: `bd-savestate bd-savestate-${s}`,
      title: s === "conflict" ? "Conflict" : s,
      onClick: c ? (o) => {
        o.stopPropagation(), alert(c);
      } : void 0,
      children: s === "pending" ? "…" : s === "completed" ? "✓" : "✗"
    }
  );
}, _t = (e) => {
  const t = e.value, [n, l] = S(t == null ? "" : String(t.value));
  return /* @__PURE__ */ A(
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
  const t = e.value, [n, l] = S((t == null ? void 0 : t.min) == null ? "" : String(t.min)), [i, s] = S((t == null ? void 0 : t.max) == null ? "" : String(t.max)), c = _(null), u = (o, f) => {
    c.current && clearTimeout(c.current), c.current = setTimeout(() => {
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
  return /* @__PURE__ */ A("span", { className: "bd-filter bd-filter-range", children: [
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
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-boolean", children: [
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
    const [c, u] = V(s), [o, f] = S(!1), d = s.config.errorMsg ?? e.errorMsg, r = s.config.pattern ?? n, { draft: h, setDraft: m, flush: b, cancel: v } = ee({
      value: c == null ? "" : String(c),
      commit: (N) => u(l(N)),
      validate: (N) => {
        const k = N === "" || !r || r.test(N);
        return f(!k), k;
      }
    });
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-text", children: [
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
  let l = [], i = null, s = [], c = null, u = null;
  const o = () => {
    l.length && n.push(`<p>${l.map(Y).join("<br />")}</p>`), l = [];
  }, f = () => {
    i && n.push(`<${i.tag}>${i.items.map((m) => `<li>${Y(m)}</li>`).join("")}</${i.tag}>`), i = null;
  }, d = () => {
    s.length && n.push(`<blockquote>${s.map(Y).join("<br />")}</blockquote>`), s = [];
  }, r = () => {
    if (u) {
      const m = `<tr>${u.header.map((v) => `<th>${Y(v)}</th>`).join("")}</tr>`, b = u.rows.map((v) => `<tr>${v.map((N) => `<td>${Y(N)}</td>`).join("")}</tr>`).join("");
      n.push(`<table><thead>${m}</thead><tbody>${b}</tbody></table>`);
    }
    u = null;
  }, h = () => {
    o(), f(), d(), r();
  };
  for (let m = 0; m < t.length; m++) {
    const b = t[m];
    if (c) {
      /^```/.test(b) ? (n.push(`<pre><code>${c.join(`
`)}</code></pre>`), c = null) : c.push(b);
      continue;
    }
    if (/^```/.test(b)) {
      h(), c = [];
      continue;
    }
    if (u) {
      if (b.trim() !== "" && b.includes("|")) {
        u.rows.push(Ge(b));
        continue;
      }
      r();
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
    const k = b.match(/^\s*[-*]\s+(.*)$/), w = b.match(/^\s*\d+\.\s+(.*)$/);
    if (k || w) {
      o(), d();
      const O = k ? "ul" : "ol";
      (!i || i.tag !== O) && (f(), i = { tag: O, items: [] }), i.items.push((k ?? w)[1]);
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
  return c && n.push(`<pre><code>${c.join(`
`)}</code></pre>`), h(), n.join(`
`);
}
function fe(e, t) {
  return (l) => {
    const [i, s] = V(l), { draft: c, setDraft: u, flush: o, cancel: f } = ee({
      value: t ? t(i) : i == null ? "" : String(i),
      commit: (d) => s(e(d, l))
    });
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-textarea", children: [
      /* @__PURE__ */ a(
        "textarea",
        {
          rows: l.config.rows ?? 10,
          value: c,
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
  const [t, n] = V(e), [l, i] = S(""), s = Ne(t).map(String), c = (o, f, d) => {
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
    c([...s, o], o), i("");
  };
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-chips", children: [
    /* @__PURE__ */ a("span", { className: "bd-chips", children: s.map((o) => /* @__PURE__ */ A("span", { className: "bd-chip", children: [
      o,
      /* @__PURE__ */ a("button", { type: "button", className: "bd-chip-remove", onClick: () => c(s.filter((f) => f !== o), void 0, o), children: "×" })
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
    const i = t.split("_")[0], s = n.find((c) => c === i || c.startsWith(`${i}_`));
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
  const [t, n] = V(e), l = e.config.baseLocale ?? e.settings.language ?? "en", i = t && typeof t == "object" ? t : {}, s = Object.keys(i).filter((r) => r !== l), [c, u] = S(""), o = (r) => {
    const h = Object.fromEntries(Object.entries(r).filter(([m]) => m.trim() !== ""));
    n(Object.keys(h).length > 0 ? h : null);
  }, f = (r, h) => o({ ...i, [r]: h }), d = (r) => {
    const h = { ...i };
    delete h[r], o(h);
  };
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-i18n", children: [
    /* @__PURE__ */ A("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ a("span", { className: "bd-i18n-locale", children: l }),
      /* @__PURE__ */ a("input", { value: i[l] ?? "", onChange: (r) => f(l, r.target.value) }),
      /* @__PURE__ */ a(U, { status: e.status })
    ] }),
    s.map((r) => /* @__PURE__ */ A("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ a("span", { className: "bd-i18n-locale", children: r }),
      /* @__PURE__ */ a("input", { value: i[r] ?? "", onChange: (h) => f(r, h.target.value) }),
      /* @__PURE__ */ a("button", { type: "button", onClick: () => d(r), children: "×" })
    ] }, r)),
    /* @__PURE__ */ A("div", { className: "bd-i18n-row bd-i18n-add", children: [
      /* @__PURE__ */ a(
        "input",
        {
          placeholder: "locale (fr, de…)",
          value: c,
          onChange: (r) => u(r.target.value),
          onKeyDown: (r) => {
            r.key === "Enter" && c.trim() && (f(c.trim(), ""), u(""));
          }
        }
      ),
      /* @__PURE__ */ a("button", { type: "button", onClick: () => {
        c.trim() && (f(c.trim(), ""), u(""));
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
    const [i, s] = V(l), { draft: c, setDraft: u, flush: o, cancel: f } = ee({
      value: i == null ? "" : String(i),
      commit: (r) => s(t(r))
    }), d = l.config.unit ?? (Array.isArray(l.attributeDetails.unit) ? l.attributeDetails.unit[0] : l.attributeDetails.unit);
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-number", children: [
      /* @__PURE__ */ a(
        "input",
        {
          type: "number",
          value: c,
          min: l.config.min,
          max: l.config.max,
          step: e ? "any" : 1,
          placeholder: l.config.placeholder,
          onChange: (r) => u(r.target.value),
          onBlur: o,
          onKeyDown: (r) => {
            r.key === "Enter" && o(), r.key === "Escape" && (f(), r.target.blur());
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
  View: ({ value: e }) => /* @__PURE__ */ A("p", { className: "bd-number bd-percentage", children: [
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
  const [t, n] = V(e), l = typeof t == "object" && t !== null ? t : {}, i = typeof t == "object" ? (t == null ? void 0 : t.url) ?? "" : t ?? "", { draft: s, setDraft: c, flush: u, cancel: o } = ee({
    value: String(i),
    commit: (f) => {
      if (!f) {
        n(null);
        return;
      }
      if (!rt.test(f))
        return;
      const d = it(f), r = l.thumbnail ?? (d ? `https://img.youtube.com/vi/${d}/hqdefault.jpg` : void 0);
      n({ ...l, url: f, ...r ? { thumbnail: r } : {} });
    }
  });
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-text bd-input-youtube", children: [
    /* @__PURE__ */ a(
      "input",
      {
        type: "url",
        value: s,
        placeholder: e.config.placeholder ?? "https://www.youtube.com/watch?v=…",
        onChange: (f) => c(f.target.value),
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
  const [t, n] = V(e), l = (t == null ? void 0 : t.language) ?? null, [i] = S(!1), { draft: s, setDraft: c, flush: u, cancel: o } = ee({
    value: (t == null ? void 0 : t.content) ?? "",
    commit: (d) => n(d ? { content: d, language: l } : null)
  }), f = l && !ve.includes(l) ? [...ve, l] : ve;
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-code", children: [
    /* @__PURE__ */ a(
      "select",
      {
        value: l ?? "plain",
        onChange: (d) => {
          const r = d.target.value === "plain" ? null : d.target.value;
          s && n({ content: s, language: r });
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
        onChange: (d) => c(d.target.value),
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
  View: ({ value: e, config: t }) => e != null && e.content ? /* @__PURE__ */ A("div", { className: `bd-code${e.language ? ` bd-code-${e.language}` : ""}`, children: [
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
    const [s, c] = V(i);
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-date", children: [
      /* @__PURE__ */ a(
        "input",
        {
          type: e ? "datetime-local" : "date",
          value: t(s),
          onChange: (u) => c(n(u.target.value))
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
}, ce = ({ items: e, search: t, multiple: n, value: l, onChange: i, placeholder: s, selectedLabels: c, required: u, status: o }) => {
  const [f, d] = S(!1), [r, h] = S(""), [m, b] = S(e ?? []), [v, N] = S(!1), k = _(null), w = _({ ...c });
  L(() => {
    e && b(e);
  }, [e]), L(() => {
    Object.assign(w.current, c);
  }, [c]), L(() => {
    if (!t || !f)
      return;
    let p = !1;
    N(!0);
    const T = setTimeout(() => {
      t(r).then((y) => {
        p || b(y);
      }).catch((y) => console.error("[BlitzUIManagerReact] picker search failed:", (y == null ? void 0 : y.message) ?? y)).finally(() => {
        p || N(!1);
      });
    }, r ? 500 : 0);
    return () => {
      p = !0, clearTimeout(T);
    };
  }, [t, r, f]), L(() => {
    if (!f)
      return;
    const p = (T) => {
      var y;
      (y = k.current) != null && y.contains(T.target) || d(!1);
    };
    return document.addEventListener("mousedown", p), () => document.removeEventListener("mousedown", p);
  }, [f]);
  for (const p of m)
    w.current[p.value] = p.label;
  const O = (p) => p.map((T) => m.find((y) => y.value === T) ?? { value: T, label: w.current[T] ?? T }), E = (p) => {
    if (n) {
      const T = l.includes(p.value) ? l.filter((y) => y !== p.value) : [...l, p.value];
      i(O(T));
    } else
      i([p]), d(!1);
  }, M = () => {
    i([]), d(!1);
  }, j = l.length ? l.map((p) => w.current[p] ?? p).join(", ") : s ?? "Select…", D = t ? m : m.filter((p) => !r || p.label.toLowerCase().includes(r.toLowerCase()));
  return /* @__PURE__ */ A("div", { className: "bd-picker", ref: k, children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: `bd-picker-display${l.length ? "" : " bd-picker-placeholder"}`,
        onClick: () => d((p) => !p),
        onKeyDown: (p) => {
          p.key === "Escape" && d(!1);
        },
        children: j
      }
    ),
    /* @__PURE__ */ a(U, { status: o }),
    f ? /* @__PURE__ */ A("div", { className: "bd-picker-menu", children: [
      t || m.length > 7 ? /* @__PURE__ */ a(
        "input",
        {
          className: "bd-picker-search",
          autoFocus: !0,
          value: r,
          placeholder: "Search…",
          onChange: (p) => h(p.target.value),
          onKeyDown: (p) => {
            p.key === "Escape" && d(!1);
          }
        }
      ) : null,
      /* @__PURE__ */ A("ul", { className: "bd-picker-options", role: "listbox", children: [
        !u && !n && l.length ? /* @__PURE__ */ a("li", { className: "bd-picker-clear", onClick: M, children: "Clear" }) : null,
        v ? /* @__PURE__ */ a("li", { className: "bd-picker-loading", children: "Loading…" }) : null,
        !v && D.length === 0 ? /* @__PURE__ */ a("li", { className: "bd-picker-loading", children: "No results" }) : null,
        D.map((p) => /* @__PURE__ */ A(
          "li",
          {
            role: "option",
            "aria-selected": l.includes(p.value),
            className: l.includes(p.value) ? "selected" : "",
            onClick: () => E(p),
            children: [
              n ? /* @__PURE__ */ a("input", { type: "checkbox", readOnly: !0, checked: l.includes(p.value) }) : null,
              p.label
            ]
          },
          p.value
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
        const c = s.map((u) => u.value);
        l ? nt(e, i, c) : n(c[0] ?? null);
      }
    }
  );
}, An = (e) => {
  const t = e.value, [n, l] = S((t == null ? void 0 : t.values) ?? []);
  return /* @__PURE__ */ a(
    ce,
    {
      items: ot(e),
      multiple: !0,
      value: n,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (i) => {
        const s = i.map((c) => c.value);
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
    for (let c = 0; c < l.length; c += 3)
      i.push(l.slice(c, c + 3));
  const s = i.filter(Boolean).join(" ");
  return t && n ? `${t} ${s}` : s;
}
const On = /^[0-9]{7,14}$/, dt = (e, t) => {
  if (!e)
    return { dial: t, digits: "" };
  const n = e.indexOf("-");
  return n === -1 ? { dial: t, digits: e } : { dial: e.slice(0, n), digits: e.slice(n + 1) };
}, Mn = (e) => {
  const [t, n] = V(e), l = e.config.defaultDialCode ?? "+1", { dial: i, digits: s } = dt(t, l), c = P(() => {
    const r = /* @__PURE__ */ new Set();
    return $n.filter((h) => r.has(h.dial) ? !1 : (r.add(h.dial), !0));
  }, []), { draft: u, setDraft: o, flush: f, cancel: d } = ee({
    value: s,
    commit: (r) => n(r ? `${i}-${r}` : null),
    validate: (r) => r === "" || On.test(r)
  });
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-phone", children: [
    /* @__PURE__ */ a(
      "select",
      {
        value: i,
        onChange: (r) => {
          s && n(`${r.target.value}-${s}`);
        },
        children: c.map((r) => /* @__PURE__ */ A("option", { value: r.dial, children: [
          r.code,
          " ",
          r.dial
        ] }, r.dial))
      }
    ),
    /* @__PURE__ */ a(
      "input",
      {
        type: "tel",
        value: u,
        placeholder: e.config.placeholder ?? "phone number",
        onChange: (r) => o(r.target.value.replace(/[^0-9]/g, "")),
        onBlur: f,
        onKeyDown: (r) => {
          r.key === "Enter" && f(), r.key === "Escape" && (d(), r.target.blur());
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
    return /* @__PURE__ */ A("p", { className: "bd-phone", children: [
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
  const n = Array.isArray(e.attributeDetails.type) ? e.attributeDetails.type[0] : e.attributeDetails.type, [l, i] = S(null), [s, c] = S({});
  L(() => {
    let f = !1;
    if (n)
      return e.resolveModel(String(n)).then((d) => {
        f || i(d);
      }).catch((d) => console.error("[BlitzUIManagerReact] fk model resolve failed:", (d == null ? void 0 : d.message) ?? d)), () => {
        f = !0;
      };
  }, [n]);
  const u = t.join(",");
  return L(() => {
    if (!l || !t.length)
      return;
    let f = !1;
    const d = oe(l);
    return Promise.all(t.map((r) => l.get(r).catch(() => null))).then((r) => {
      if (f)
        return;
      const h = {};
      for (const m of r) {
        if (!m)
          continue;
        const b = Je(m, d);
        h[b.value] = b.label;
      }
      c(h);
    }), () => {
      f = !0;
    };
  }, [l, u]), { search: P(() => {
    if (l)
      return async (f) => {
        const d = oe(l), r = f && d ? [[d, "LIKE", `%${f}%`]] : void 0;
        return (await l.list({ conditions: r, limit: e.config.limit ?? 100 })).map((m) => Je(m, d));
      };
  }, [l, e.config.limit]), labels: s, ready: !!l };
}
const Tn = (e) => {
  var c;
  const [t, n] = V(e), l = t == null || t === "" ? [] : [String(((c = t == null ? void 0 : t._blitzID) == null ? void 0 : c.value) ?? t)], { search: i, labels: s } = $e(e, l);
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
      onChange: (s) => nt(e, n, s.map((c) => c.value))
    }
  );
}, ft = (e) => {
  const t = e.value, [n, l] = S((t == null ? void 0 : t.values) ?? []), { search: i, labels: s } = $e(e, n);
  return /* @__PURE__ */ a(
    ce,
    {
      search: i,
      multiple: !0,
      value: n,
      selectedLabels: s,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (c) => {
        const u = c.map((o) => o.value);
        l(u), e.onChange(u.length ? { op: "in", values: u } : null);
      }
    }
  );
}, gt = ({ value: e, attributeDetails: t }) => {
  const n = J(), l = Ae(e), [i, s] = S({}), c = Array.isArray(t == null ? void 0 : t.type) ? t == null ? void 0 : t.type[0] : t == null ? void 0 : t.type, u = l.join(",");
  return L(() => {
    if (!c || !l.length)
      return;
    let o = !1;
    return (async () => {
      var f;
      try {
        const d = await n.resolveModel(String(c)), r = oe(d);
        if (!r)
          return;
        const h = {};
        for (const m of l) {
          const b = await d.get(m).catch(() => null), v = (f = b == null ? void 0 : b[r]) == null ? void 0 : f.value;
          v != null && (h[m] = String(v));
        }
        !o && Object.keys(h).length && s(h);
      } catch {
      }
    })(), () => {
      o = !0;
    };
  }, [u, c]), /* @__PURE__ */ a("p", { className: "bd-fk", children: l.map((o) => i[o] ?? o).join(", ") });
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
    const [o, f] = V(u), [d, r] = S(!1), [h, m] = S(null), b = _(null), v = u.services[l], N = async (k) => {
      if (k != null && k.length) {
        if (!v) {
          m(`No '${l}' service configured`);
          return;
        }
        r(!0), m(null);
        try {
          const w = [];
          for (const O of Array.from(k))
            w.push(await v(O));
          f(i(w));
        } catch (w) {
          m((w == null ? void 0 : w.message) ?? "Upload failed");
        } finally {
          r(!1), b.current && (b.current.value = "");
        }
      }
    };
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-upload", children: [
      s && o != null ? /* @__PURE__ */ a(s, { value: o }) : null,
      /* @__PURE__ */ a(
        "input",
        {
          ref: b,
          type: "file",
          accept: t,
          multiple: n,
          disabled: d,
          onChange: (k) => void N(k.target.files)
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
  const [t, n] = V(e), l = t !== null && typeof t == "object" ? t : {}, i = (s, c) => {
    const u = { ...l, [s]: c }, o = Object.values(u).some((f) => f !== "" && f != null);
    n(o ? u : null);
  };
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-location", children: [
    Vn.map(({ key: s, label: c }) => /* @__PURE__ */ A("label", { className: "bd-location-field", children: [
      /* @__PURE__ */ a("span", { children: c }),
      /* @__PURE__ */ a("input", { value: String(l[s] ?? ""), onChange: (u) => i(s, u.target.value) })
    ] }, s)),
    /* @__PURE__ */ a(U, { status: e.status })
  ] });
}, Rn = re({ serialize: z }), Pn = ({ value: e, config: t }) => {
  const n = _(null), l = e == null ? void 0 : e.lat, i = e == null ? void 0 : e.lng, s = (t == null ? void 0 : t.apiKey) ?? (t == null ? void 0 : t.googleMapsApiKey);
  return L(() => {
    if (!s || !l || !i || !n.current)
      return;
    let c = !1;
    const u = n.current;
    return Dt(String(l), String(i), s).then((o) => {
      !c && o && u.replaceChildren(o);
    }), () => {
      c = !0, u.replaceChildren();
    };
  }, [l, i, s]), typeof e == "string" ? /* @__PURE__ */ a("p", { className: "bd-location", children: e }) : /* @__PURE__ */ A("div", { className: "bd-location", "data-lat": l, "data-lng": i, children: [
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
}, Q = ({ attribute: e, port: t, mode: n = "write", use: l, config: i, label: s, className: c }) => {
  const u = J(), [o, f] = S(null), [d, r] = S(8), h = i ? JSON.stringify(i) : "", m = P(() => t ? i ? { ...t, mountConfig: { ...t.mountConfig, ...i } } : t : Et(e, i), [e, t, h]), b = P(() => l && typeof l == "object" ? se(l) : l, [l]), v = P(() => u.registry.resolve(
    { type: m.type, many: m.many, model: m.model, name: m.name, hint: m.hint, use: b, maxLayer: d },
    u.debug ? (E) => console.info(`[BlitzUIManagerReact] ${E}`) : void 0
  ), [u, m, b, d]), N = P(() => Hn(m, u, v, f), [m, u, v]), k = () => {
    var j;
    const E = n === "read" ? "view" : n === "filter" ? "filter" : "control", M = ((j = v.sources[E]) == null ? void 0 : j.layer) ?? 0;
    r(M - 1);
  };
  let w = null;
  if (n === "read") {
    const E = v.view ?? Wn, M = v.empty ?? $t;
    w = /* @__PURE__ */ a(Yn, { View: E, props: N, empty: M });
  } else if (n === "filter") {
    let E = v.filter;
    if (!E && v.control && Xe.has(m.type) && (E = Jn(v.control)), !E)
      return null;
    w = /* @__PURE__ */ a(E, { ...N });
  } else {
    let E = v.control;
    if (!E) {
      const M = qn(m);
      M !== m.type && (u.warn(`No usable UI for type '${m.type}' — falling back to '${M}'`), E = u.registry.resolve({ type: M, model: m.model, name: m.name, maxLayer: 0 }).control);
    }
    if (!E)
      return u.warn(`Editor for type '${m.type}' not supported`), null;
    w = /* @__PURE__ */ a(E, { ...N });
  }
  const O = s === !0 ? X(N.attributeDetails["label-int"], N.attributeDetails.label, u.settings.language ?? "en", m.name) : s;
  return /* @__PURE__ */ A("div", { className: `bd-field bd-field-${m.type}${c ? ` ${c}` : ""}`, children: [
    O ? /* @__PURE__ */ a("label", { className: "bd-field-label", children: O }) : null,
    /* @__PURE__ */ a(Zn, { onError: k, children: w }, `${n}-${d}`),
    o ? /* @__PURE__ */ a("p", { className: "bd-invalid-msg", children: o }) : null
  ] });
};
function ge(e) {
  const t = J(), n = typeof e == "string", [l, i] = S(n ? null : e);
  return L(() => {
    if (!n) {
      i(e);
      return;
    }
    let s = !1;
    return t.resolveModel(e).then((c) => {
      s || i(c);
    }).catch((c) => t.warn(`model '${e}' failed to resolve: ${(c == null ? void 0 : c.message) ?? c}`)), () => {
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
  var N, k, w;
  const t = J(), n = ge(e.model), l = _({}), [i, s] = S(null), [c, u] = S(!1), [o, f] = S(!1), d = P(() => Qn(n, e.attributes), [n, e.attributes]), r = P(() => {
    var E;
    if (!n)
      return [];
    const O = ((E = n.getAttributesDetails) == null ? void 0 : E.call(n)) ?? {};
    return d.map((M) => {
      var y, F;
      const j = O[M] ?? {}, D = Tt(l.current, M, j, n, e.config), p = t.registry.resolve({ type: D.type, many: D.many, model: D.model, name: M, hint: D.hint }), T = ((y = e.presetValues) == null ? void 0 : y[M]) ?? j.default ?? ((F = p.default) == null ? void 0 : F.call(p));
      return T !== void 0 && l.current[M] === void 0 && (l.current[M] = T), { ...D, value: l.current[M] };
    });
  }, [n, d]);
  if (L(() => () => {
    l.current = {};
  }, [n]), !n)
    return /* @__PURE__ */ a("div", { className: "bd-addform bd-loading", children: "Loading…" });
  const h = ((N = n.getAttributesDetails) == null ? void 0 : N.call(n)) ?? {}, m = t.settings.language ?? "en", b = (O) => {
    var E, M;
    return X((E = h[O]) == null ? void 0 : E["label-int"], (M = h[O]) == null ? void 0 : M.label, m, O);
  }, v = async () => {
    var M, j, D;
    s(null);
    const E = (e.requireAll ? d : e.requiredAttributes ?? []).filter((p) => l.current[p] == null);
    if (E.length) {
      s(`Missing required fields: ${E.map(b).join(", ")}`);
      return;
    }
    u(!0);
    try {
      const p = await ((M = e.beforeSubmit) == null ? void 0 : M.call(e, { ...l.current }));
      if (p) {
        s(p);
        return;
      }
      const T = await n.add({ ...l.current });
      if (!T) {
        s("An unexpected error occurred!");
        return;
      }
      (j = e.onSuccess) == null || j.call(e, T), e.onServerSuccess && ((D = T.addEventListener) == null || D.call(T, "syncStatusChange", (y) => {
        var F, x;
        (y == null ? void 0 : y.status) === "completed" ? (F = e.onServerSuccess) == null || F.call(e, T) : (y == null ? void 0 : y.status) === "failed" && s(((x = y == null ? void 0 : y.job) == null ? void 0 : x.message) ?? "Saving failed");
      })), f(!0);
    } catch (p) {
      s((p == null ? void 0 : p.message) ?? "An unexpected error occurred!");
    } finally {
      u(!1);
    }
  };
  return o ? /* @__PURE__ */ a("div", { className: `bd-addform ${((k = n.getName) == null ? void 0 : k.call(n)) ?? ""}`, children: /* @__PURE__ */ a("p", { className: "success-msg", children: e.successMessage ?? "Added successfully." }) }) : /* @__PURE__ */ A("div", { className: `bd-addform ${((w = n.getName) == null ? void 0 : w.call(n)) ?? ""}`, children: [
    r.map((O) => /* @__PURE__ */ a(
      Q,
      {
        port: O,
        mode: "write",
        label: e.withLabels ? b(O.name) : void 0
      },
      O.name
    )),
    i ? /* @__PURE__ */ a("p", { className: "bd-invalid-msg", children: i }) : null,
    /* @__PURE__ */ a("button", { type: "button", className: "add-btn", disabled: c, onClick: () => void v(), children: c ? "…" : e.addButtonLabel ?? "Add" })
  ] });
}, He = (e) => e != null && typeof e == "object" && "_attributes" in e, ol = ({ src: e, attributes: t, withLabels: n, use: l, config: i }) => {
  var o;
  const s = J(), c = P(() => Array.isArray(e) ? e : He(e) ? (t ?? Object.keys(e._attributes ?? {}).filter((d) => !d.startsWith("_") && !d.startsWith("@")).filter((d) => {
    var r;
    return ((r = e[d]) == null ? void 0 : r.value) !== void 0;
  })).map((d) => e[d]).filter(Boolean) : e == null ? [] : [e], [e, t]), u = s.settings.language ?? "en";
  return /* @__PURE__ */ a("div", { className: `bd-object-editor${He(e) ? ` ${((o = e._blitzID) == null ? void 0 : o.value) ?? ""}` : ""}`, children: c.map((f) => {
    var r, h, m, b;
    const d = ((b = (m = (h = (r = f._object) == null ? void 0 : r.model) == null ? void 0 : h.getAttributesDetails) == null ? void 0 : m.call(h)) == null ? void 0 : b[f._name]) ?? {};
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
  var o, f, d, r, h, m;
  const i = J(), s = P(() => (t ?? Object.keys((e == null ? void 0 : e._attributes) ?? {})).filter((v) => !v.startsWith("_") && !v.startsWith("@")).filter((v) => {
    var N;
    return ((N = e == null ? void 0 : e[v]) == null ? void 0 : N.value) !== void 0;
  }), [e, t]);
  if (!e)
    return null;
  const c = ((d = (f = (o = e._object) == null ? void 0 : o.model) == null ? void 0 : f.getAttributesDetails) == null ? void 0 : d.call(f)) ?? ((h = (r = e.model) == null ? void 0 : r.getAttributesDetails) == null ? void 0 : h.call(r)) ?? {}, u = i.settings.language ?? "en";
  return /* @__PURE__ */ a("div", { className: `bd-objectview ${((m = e._blitzID) == null ? void 0 : m.value) ?? ""}`, children: s.map((b) => {
    var v, N;
    return /* @__PURE__ */ a(
      Q,
      {
        attribute: e[b],
        mode: "read",
        config: l,
        label: n ? X((v = c[b]) == null ? void 0 : v["label-int"], (N = c[b]) == null ? void 0 : N.label, u, b) : void 0
      },
      b
    );
  }) });
};
function el(e, t) {
  const [n, l] = S([]), [i, s] = S(!1), c = t ? JSON.stringify(t) : "";
  return L(() => {
    if (!e)
      return;
    s(!1);
    const u = e.subscribeToList(t, (o) => {
      l([...o.items ?? []]), o.nextSource || s(!0);
    }, !0);
    return () => {
      u == null || u();
    };
  }, [e, c]), { items: n, settled: i };
}
const dl = (e) => {
  var d;
  const t = ge(e.model), { items: n, settled: l } = el(t, e.options), [i, s] = S(1), c = e.objectsPerPage ?? 10, u = P(() => {
    let r = e.filter ? n.filter(e.filter) : [...n];
    return e.sort && r.sort(e.sort), r;
  }, [n, e.filter, e.sort]);
  L(() => {
    s(1);
  }, [e.filter]);
  const o = e.pagination ? Math.max(1, Math.ceil(u.length / c)) : 1, f = e.pagination ? u.slice((i - 1) * c, i * c) : u;
  return !l && n.length === 0 ? /* @__PURE__ */ a("div", { className: "bd-list bd-loading", children: e.loading ?? /* @__PURE__ */ a("span", { className: "spinner", children: "Loading…" }) }) : /* @__PURE__ */ A("div", { className: `bd-list ${((d = t == null ? void 0 : t.getName) == null ? void 0 : d.call(t)) ?? ""}`, children: [
    u.length === 0 && l ? /* @__PURE__ */ a("p", { className: "bd-list-empty", children: e.noResultsMessage ?? "No results." }) : f.map((r) => {
      var h, m;
      return /* @__PURE__ */ a(
        "div",
        {
          className: `card ${((h = r._blitzID) == null ? void 0 : h.value) ?? ""}`,
          onClick: e.onObjectClick ? () => e.onObjectClick(r) : void 0,
          children: e.renderRow ? e.renderRow(r) : /* @__PURE__ */ a(Xn, { object: r, attributes: e.attributes, withLabels: e.withLabels })
        },
        (m = r._blitzID) == null ? void 0 : m.value
      );
    }),
    e.pagination && o > 1 ? /* @__PURE__ */ a("div", { className: "bd-list-pagination", children: Array.from({ length: o }, (r, h) => h + 1).map((r) => /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: r === i ? "active" : "",
        onClick: () => s(r),
        children: r
      },
      r
    )) }) : null
  ] });
}, tl = [
  { attribute: "_blitzstamp", label: "Newest", order: "desc" },
  { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
], nl = (e, t) => {
  const n = t === "desc" ? -1 : 1;
  return (l, i) => {
    var o, f;
    const s = (o = l[e]) == null ? void 0 : o.value, c = (f = i[e]) == null ? void 0 : f.value;
    return s == null || c == null ? s == null && c == null ? 0 : s == null ? n : -n : (typeof s == "number" && typeof c == "number" ? s - c : String(s).localeCompare(String(c))) * n;
  };
}, ul = (e) => {
  var D, p, T;
  const t = J(), n = ge(e.model), [l, i] = S(""), [s, c] = S(!1), u = _({}), o = _(""), { onFilterChange: f } = e, d = Z(() => {
    const y = Qe(u.current), F = o.current.trim(), x = e.searchAttributes ?? [], K = F && x.length ? (q) => {
      const te = new RegExp(we(F), "i");
      return x.some((H) => {
        var ne;
        return typeof ((ne = q[H]) == null ? void 0 : ne.value) == "string" && te.test(q[H].value);
      });
    } : null;
    f(!y && !K ? null : (q) => (!K || K(q)) && (!y || y(q)));
  }, [f, (D = e.searchAttributes) == null ? void 0 : D.join(",")]);
  L(() => {
    o.current = l;
    const y = setTimeout(d, l ? 300 : 0);
    return () => clearTimeout(y);
  }, [l, d]);
  const r = e.sortAttributes ?? tl, [h, m] = S(0), { onSortChange: b } = e;
  L(() => {
    if (!b)
      return;
    const y = r[h];
    b(h === 0 ? null : nl(y.attribute, y.order));
  }, [h, b]);
  const v = Z((y) => {
    var x;
    if (!n)
      return [];
    const F = ((x = n.getAttributesDetails) == null ? void 0 : x.call(n)) ?? {};
    return y.map((K) => Ye(u.current, K, F[K] ?? {}, n, d));
  }, [n, d]), N = P(() => v(e.filterAttributes ?? []), [v, e.filterAttributes]), k = P(() => v(e.dialogFilterAttributes ?? []), [v, e.dialogFilterAttributes]), w = () => {
    for (const y of Object.keys(u.current))
      delete u.current[y];
    i(""), c(!1), d();
  }, O = ((p = n == null ? void 0 : n.getAttributesDetails) == null ? void 0 : p.call(n)) ?? {}, E = t.settings.language ?? "en", M = (y) => {
    var F, x;
    return X((F = O[y]) == null ? void 0 : F["label-int"], (x = O[y]) == null ? void 0 : x.label, E, y);
  }, j = l.trim() !== "" || Object.keys(u.current).length > 0;
  return /* @__PURE__ */ A("div", { className: "bd-searchbox", children: [
    (T = e.searchAttributes) != null && T.length ? /* @__PURE__ */ a(
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
    /* @__PURE__ */ A("div", { className: "bd-searchbox-actions", children: [
      e.onSortChange && r.length ? /* @__PURE__ */ a(
        "select",
        {
          className: "bd-searchbox-sort",
          value: h,
          onChange: (y) => m(Number(y.target.value)),
          children: r.map((y, F) => /* @__PURE__ */ a("option", { value: F, children: y.label }, F))
        }
      ) : null,
      k.length ? /* @__PURE__ */ a("button", { type: "button", className: "bd-searchbox-filters-btn", onClick: () => c(!0), children: e.filtersButtonLabel ?? "Filters" }) : null,
      j ? /* @__PURE__ */ a("button", { type: "button", className: "bd-searchbox-clear", onClick: w, children: e.clearFiltersLabel ?? "Clear" }) : null
    ] }),
    s ? /* @__PURE__ */ a("div", { className: "bd-filters-dialog", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ A("div", { className: "bd-filters-dialog-box", children: [
      /* @__PURE__ */ A("header", { children: [
        /* @__PURE__ */ a("h3", { children: e.dialogTitle ?? "Filters" }),
        /* @__PURE__ */ a("button", { type: "button", className: "close-btn", onClick: () => c(!1), children: "×" })
      ] }),
      k.map((y) => /* @__PURE__ */ a(Q, { port: y, mode: "filter", label: e.withLabels ? M(y.name) : void 0 }, y.name)),
      /* @__PURE__ */ a("footer", { children: /* @__PURE__ */ a("button", { type: "button", onClick: () => c(!1), children: "Done" }) })
    ] }) }) : null
  ] });
}, fl = (e) => {
  var Oe, Me, Ee, Te, Le, Fe, De, Ie, je, xe;
  const t = J(), n = ge(e.model), l = _({}), [i, s] = S(""), c = _(""), [u, o] = S(null), f = ((Me = (Oe = e.sort) == null ? void 0 : Oe.options[0]) == null ? void 0 : Me.value) ?? null, [d, r] = S(((Ee = e.sort) == null ? void 0 : Ee.value) ?? f), [h, m] = S(0), [b, v] = S({}), N = _(!1);
  if (!N.current) {
    N.current = !0;
    for (const [g, C] of Object.entries(e.defaults ?? {}))
      l.current[g] = JSON.parse(JSON.stringify(C));
  }
  const k = ((Te = n == null ? void 0 : n.getAttributesDetails) == null ? void 0 : Te.call(n)) ?? {}, w = ((Le = n == null ? void 0 : n.getSystemAttributesDetails) == null ? void 0 : Le.call(n)) ?? {}, O = (g) => {
    var C;
    return k[g] ?? ((C = e.filterAttributes) != null && C.includes(g) ? w[g] : void 0);
  }, E = t.settings.language ?? "en", M = (g) => {
    var C, $, I;
    return ((C = e.labels) == null ? void 0 : C[g]) ?? X(($ = O(g)) == null ? void 0 : $["label-int"], (I = O(g)) == null ? void 0 : I.label, E, g);
  }, { onFilterChange: j, onActiveChange: D } = e, p = Z(() => {
    const g = Qe(l.current), C = c.current.trim(), $ = e.searchAttributes ?? [], I = C && $.length ? (R) => {
      const G = new RegExp(we(C), "i");
      return $.some((W) => {
        var ie;
        return typeof ((ie = R[W]) == null ? void 0 : ie.value) == "string" && G.test(R[W].value);
      });
    } : null;
    j(!g && !I ? null : (R) => (!I || I(R)) && (!g || g(R))), m((R) => R + 1);
  }, [j, (Fe = e.searchAttributes) == null ? void 0 : Fe.join(",")]);
  L(() => {
    c.current = i;
    const g = setTimeout(p, i ? 300 : 0);
    return () => clearTimeout(g);
  }, [i, p]);
  const T = (g, C) => {
    if (!g || !C)
      return !g && !C;
    if (g.op !== C.op)
      return !1;
    const $ = (G) => Array.isArray(G.values) ? G.values.map(String).sort() : null, I = $(g), R = $(C);
    return I || R ? !!I && !!R && I.length === R.length && I.every((G, W) => G === R[W]) : g.value === C.value && g.min === C.min && g.max === C.max;
  }, y = e.defaults ?? {}, F = i.trim() !== "" || [.../* @__PURE__ */ new Set([...Object.keys(l.current), ...Object.keys(y)])].some((g) => !T(l.current[g], y[g])) || d !== f;
  L(() => {
    D == null || D(F);
  }, [F, D]);
  const x = (e.searchAttributes ?? []).filter((g) => {
    var C;
    return typeof ((C = O(g)) == null ? void 0 : C.type) == "string" && ["varchar", "text"].includes(O(g).type);
  }), K = (g) => Ye(l.current, g, O(g) ?? {}, n, p, { placeholder: `${M(g)}...` }), q = (g) => {
    const C = t.registry.resolve({ type: g.type, many: g.many, model: g.model, name: g.name, hint: g.hint });
    return !!(C.filter || C.control && Xe.has(g.type));
  }, te = (e.filterAttributes ?? []).filter((g) => O(g) && !x.includes(g) && q(K(g))), H = te.map((g) => {
    const C = l.current[g], $ = (C == null ? void 0 : C.values) ?? [];
    return $.length === 1 ? `${g}:${$[0]}` : null;
  }).filter(Boolean).join(",");
  L(() => {
    var $;
    let g = !1;
    const C = H ? H.split(",") : [];
    for (const I of C) {
      if (b[I] !== void 0)
        continue;
      const [R, G] = I.split(":"), W = ($ = O(R)) == null ? void 0 : $.type, ie = Array.isArray(W) ? W[0] : W;
      typeof ie == "string" && (async () => {
        var _e;
        try {
          const Ve = await t.resolveModel(ie), Be = oe(Ve), ye = Be ? await Ve.get(G) : null, Re = (_e = ye == null ? void 0 : ye[Be]) == null ? void 0 : _e.value;
          !g && Re != null && v((vt) => ({ ...vt, [I]: String(Re) }));
        } catch {
        }
      })();
    }
    return () => {
      g = !0;
    };
  }, [H]);
  const ne = (g) => {
    const C = l.current[g];
    if (!C)
      return "All";
    if (C.op === "contains")
      return `"${C.value}"`;
    const $ = C.values ?? (C.value != null ? [C.value] : []);
    return $.length === 0 ? "Set" : $.length === 1 ? b[`${g}:${$[0]}`] ?? "1 selected" : `${$.length} selected`;
  }, ht = (g) => o((C) => C === g ? null : g), mt = () => {
    var g, C;
    o(null);
    for (const $ of Object.keys(l.current))
      delete l.current[$];
    s(""), j(null), e.sort && d !== f && (r(f), (C = (g = e.sort).onChange) == null || C.call(g, f)), m(($) => $ + 1);
  }, he = (g, C) => {
    o(null), C ? l.current[g] = JSON.parse(JSON.stringify(C)) : delete l.current[g], p();
  }, bt = () => {
    var g, C;
    o(null);
    for (const $ of Object.keys(l.current))
      delete l.current[$];
    for (const [$, I] of Object.entries(y))
      l.current[$] = JSON.parse(JSON.stringify(I));
    s(""), p(), e.sort && d !== f && (r(f), (C = (g = e.sort).onChange) == null || C.call(g, f));
  }, le = [], yt = [...Object.keys(y), ...te.filter((g) => !y[g])];
  for (const g of yt) {
    const C = l.current[g], $ = y[g];
    $ && T(C, $) ? le.push({ key: g, label: ((De = e.defaultLabels) == null ? void 0 : De[g]) ?? M(g), active: !0, toggle: () => he(g, null) }) : $ && !C ? le.push({ key: g, label: ((Ie = e.defaultLabels) == null ? void 0 : Ie[g]) ?? M(g), active: !1, toggle: () => he(g, $) }) : C && le.push({ key: g, label: `${M(g)}: ${ne(g)}`, active: !0, toggle: () => he(g, null) });
  }
  i.trim() && x.length && le.push({
    key: "~search",
    label: `${x.map(M).join(", ")}: "${i.trim()}"`,
    active: !0,
    toggle: () => s("")
  });
  const { onPillsChange: me } = e;
  if (L(() => {
    !me || !n || me({ pills: le, differs: F, reset: bt });
  }, [me, n, h, b, i, d, F]), !n)
    return null;
  const be = (g, C, $, I) => /* @__PURE__ */ A("div", { className: `bd-fmenu-row${u === g ? " open" : ""}`, children: [
    /* @__PURE__ */ A("button", { type: "button", className: "bd-fmenu-head", "aria-expanded": u === g, onClick: () => ht(g), children: [
      /* @__PURE__ */ a("span", { className: "bd-fmenu-label", children: C }),
      /* @__PURE__ */ a("span", { className: "bd-fmenu-value", children: $ }),
      /* @__PURE__ */ a("span", { className: "bd-fmenu-chevron", children: "›" })
    ] }),
    u === g ? /* @__PURE__ */ a("div", { className: "bd-fmenu-panel", children: I() }) : null
  ] }, g);
  return /* @__PURE__ */ A("div", { className: "bd-fmenu", children: [
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
    (je = e.sort) != null && je.options.length ? /* @__PURE__ */ A(Pe, { children: [
      /* @__PURE__ */ a("div", { className: "bd-fmenu-divider" }),
      be(
        "sort",
        e.sort.label ?? "Sort",
        ((xe = e.sort.options.find((g) => g.value === d)) == null ? void 0 : xe.label) ?? String(d),
        () => /* @__PURE__ */ a(Pe, { children: e.sort.options.map((g) => /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            className: `bd-fmenu-option${g.value === d ? " checked" : ""}`,
            onClick: () => {
              var C, $;
              r(g.value), ($ = (C = e.sort).onChange) == null || $.call(C, g.value), o(null);
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
