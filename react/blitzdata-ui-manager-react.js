var Ct = Object.defineProperty;
var Nt = (e, t, l) => t in e ? Ct(e, t, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[t] = l;
var V = (e, t, l) => (Nt(e, typeof t != "symbol" ? t + "" : t, l), l);
import { BDModel as At } from "@blitzdata.ts/core";
import { jsx as r, jsxs as w, Fragment as Ue } from "react/jsx-runtime";
import { useState as A, useRef as j, useEffect as L, useCallback as Z, useMemo as U, createContext as wt, useContext as St, Component as $t } from "react";
const kt = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0, Ot = (e) => Array.isArray(e) ? e[0] : e, Ce = (e, t) => e.endsWith("_fk") ? "fk" : e.endsWith("_mtm") ? "mtm" : Ot(t), Pe = ["view", "control", "filter", "editor", "default", "empty"];
class Mt {
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
    const { type: n, many: i, model: s, name: c, hint: d, use: u, maxLayer: f = 8 } = t, o = { defaultConfig: {}, sources: {} }, a = (b, v, N) => {
      if (!(!b || v > f)) {
        for (const O of Pe) {
          const S = b[O];
          S !== void 0 && (o[O] = S, o.sources[O] = { layer: v, label: N });
        }
        b.defaultConfig && Object.assign(o.defaultConfig, b.defaultConfig);
      }
    }, h = (b, v, N) => {
      const O = this.presets.get(b);
      if (O) {
        const { extends: $, ...T } = O;
        return $ && a({ ...this.builtins.get($), ...this.typeOverlays.get($) }, v, `${N} (extends '${$}')`), a(T, v + 1, N), !0;
      }
      const S = { ...this.builtins.get(b), ...this.typeOverlays.get(b) };
      return Object.keys(S).length ? (a(S, v + 1, N), !0) : !1;
    };
    a(this.builtins.get(n), 0, "built-in"), i && a(this.builtins.get(`${n}[]`), 0, "built-in (many)"), a(this.typeOverlays.get(n), 1, "defineUI"), i && a(this.typeOverlays.get(`${n}[]`), 1, "defineUI (many)");
    const m = i ? void 0 : this.bindings.get(n);
    if (m && !h(m.preset, 2, m.label ?? `binding '${m.preset}'`) && this.warn(`type '${n}' is bound to '${m.preset}' — not registered, using '${n}' default`), d && !h(d, 4, `preset '${d}'`) && this.warn(`${s ?? "?"}.${c ?? "?"} requests ui '${d}' — not registered, using '${n}' default`), s && c && a(this.attrOverlays.get(`${s}.${c}`), 6, "defineUIFor"), u && (typeof u == "string" ? h(u, 7, `use '${u}'`) || this.warn(`mount requests ui '${u}' — not registered, using '${n}' default`) : typeof u == "function" ? a({ control: u }, 8, "use (control)") : a(u, 8, "use (module)")), l) {
      const b = Pe.filter((v) => o.sources[v]).map((v) => `${v} from ${o.sources[v].label}`);
      l(`${s ?? "?"}.${c ?? n} → ${b.join("; ") || "nothing registered"}`);
    }
    return o;
  }
  mapEntry(t, l) {
    let n = t.get(l);
    return n || (n = {}, t.set(l, n)), n;
  }
}
class Et {
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
function Tt(e, t) {
  var i, s, c, d, u, f, o;
  const l = ((d = (c = (s = (i = e._object) == null ? void 0 : i.model) == null ? void 0 : s.getAttributesDetails) == null ? void 0 : c.call(s)) == null ? void 0 : d[e._name]) ?? {}, n = l.type ?? e._type;
  return {
    kind: "live",
    type: Ce(e._name, n),
    many: Array.isArray(l.type) && !e._name.endsWith("_mtm"),
    model: (o = (f = (u = e._object) == null ? void 0 : u.model) == null ? void 0 : f.getName) == null ? void 0 : o.call(f),
    name: e._name,
    attribute: e,
    value: e.value,
    set: (a) => e.edit(a),
    add: (a) => {
      var h;
      return (h = e.add) == null ? void 0 : h.call(e, a);
    },
    remove: (a) => {
      var h;
      return (h = e.remove) == null ? void 0 : h.call(e, a);
    },
    // VALUE stream: the object's remoteChange event — patch in place
    subscribe: (a) => {
      const h = e._object;
      if (typeof (h == null ? void 0 : h.addEventListener) != "function")
        return () => {
        };
      const m = (b) => {
        b && !Object.hasOwn(b, e._name) || a(e.value);
      };
      return h.addEventListener("remoteChange", m), () => h.removeEventListener("remoteChange", m);
    },
    // SAVE-STATE stream: pending | saved | failed — distinct from value
    status: (a) => {
      var h;
      return ((h = e.syncStatus) == null ? void 0 : h.call(e, a)) ?? (() => {
      });
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: t
  };
}
function Lt(e, t, l, n, i) {
  var s;
  return {
    kind: "draft",
    type: Ce(t, l.type),
    many: Array.isArray(l.type) && !t.endsWith("_mtm"),
    model: (s = n == null ? void 0 : n.getName) == null ? void 0 : s.call(n),
    name: t,
    value: e[t],
    set: (c) => {
      e[t] = c;
    },
    add: (c) => {
      (e[t] ?? (e[t] = [])).push(c);
    },
    remove: (c) => {
      e[t] = (e[t] ?? []).filter((d) => d !== c);
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: i
  };
}
function Qe(e, t, l, n, i, s) {
  var c;
  return {
    kind: "query",
    type: Ce(t, l.type),
    many: Array.isArray(l.type) && !t.endsWith("_mtm"),
    model: (c = n == null ? void 0 : n.getName) == null ? void 0 : c.call(n),
    name: t,
    value: e[t],
    set: (d) => {
      d ? e[t] = d : delete e[t], i == null || i();
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: s
  };
}
function X(e, t, l, n) {
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
    const s = Object.values(i).find((c) => typeof c == "string");
    if (s)
      return s;
  }
  return n;
}
function Ft(e) {
  return e !== null && typeof e == "object" && Object.hasOwn(e, "_value") ? e.value : e;
}
function Ne(e) {
  return Array.isArray(e) ? e.map((t) => Ft(t)) : [];
}
function Ae(e) {
  return e.replace(/(\^|\$|\\|\/|\||\*|\+|\-|\.|\?|\(|\)|\[|\]|\{|\})/g, "\\$&");
}
function It(e) {
  return new Promise((t, l) => {
    if (window.google && window.google.maps) {
      t();
      return;
    }
    const n = document.createElement("script");
    n.src = `https://maps.googleapis.com/maps/api/js?key=${e}&libraries=places`, n.async = !0, n.defer = !0, n.onload = () => t(), n.onerror = () => l(new Error("Failed to load Google Maps API")), document.head.appendChild(n);
  });
}
async function Dt(e, t, l) {
  if (await It(l), !window.google || !window.google.maps)
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
function Xe(e) {
  const t = Object.keys(e);
  return t.length === 0 ? null : (l) => t.every((n) => {
    var i;
    return xt((i = l[n]) == null ? void 0 : i.value, e[n]);
  });
}
const Ke = (e) => e.map(
  (t) => t && Object.hasOwn(t, "_value") ? t.value : t && Object.hasOwn(t, "_blitzID") ? t._blitzID : t
);
function xt(e, t) {
  switch (t.op) {
    case "contains":
      return typeof e == "string" && !!e.match(new RegExp(Ae(String(t.value)), "i"));
    case "eq":
      return Array.isArray(e) ? Ke(e).includes(t.value) : e == t.value;
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
        const n = Ke(e);
        return l.some((i) => n.includes(i));
      }
      return l.includes(e);
    }
    default:
      return !0;
  }
}
const et = /* @__PURE__ */ new Set(["varchar", "text", "markdown", "email", "url", "tag", "hex", "formula", "youtube"]), ae = (e) => {
  const t = {};
  return e.View !== void 0 && (t.view = e.View), e.Control !== void 0 && (t.control = e.Control), e.Filter !== void 0 && (t.filter = e.Filter), e.default !== void 0 && (t.default = e.default), e.empty !== void 0 && (t.empty = e.empty), e.defaultConfig !== void 0 && (t.defaultConfig = e.defaultConfig), t;
};
class _t {
  constructor() {
    V(this, "registry", new Mt((t) => this.warn(t)));
    V(this, "config", new Et());
    V(this, "debug", !1);
    V(this, "resolveModel", (t) => At.get(t));
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
const tt = new _t();
function B(e) {
  const [t, l] = A(e.value), n = j(e.value);
  e.value !== n.current && (n.current = e.value, l(e.value)), L(() => {
    var s;
    return (s = e.subscribe) == null ? void 0 : s.call(e, (c) => {
      n.current = c, l(c);
    });
  }, [e.subscribe]);
  const i = Z((s) => {
    l(s), e.onChange(s);
  }, [e.onChange]);
  return [t, i];
}
function jt(e) {
  const [t, l] = A(null);
  return L(() => {
    var n;
    return (n = e.status) == null ? void 0 : n.call(e, l);
  }, [e.status]), t;
}
function ee(e) {
  const { value: t, commit: l, validate: n, delay: i = 500, flushOnUnmount: s = !0 } = e, [c, d] = A(t), u = j(t), f = j(null), o = j(c);
  o.current = c;
  const a = j(t);
  t !== a.current && (a.current = t, u.current = t, f.current === null && d(t));
  const h = () => {
    f.current !== null && (clearTimeout(f.current), f.current = null);
  }, m = Z((S) => {
    h(), !(n && !n(S)) && S !== u.current && (u.current = S, l(S));
  }, [l, n]), b = Z((S) => {
    d(S), o.current = S, h(), f.current = setTimeout(() => {
      f.current = null, m(S);
    }, i);
  }, [m, i]), v = Z(() => m(o.current), [m]), N = Z(() => {
    h(), d(u.current), o.current = u.current;
  }, []), O = j(v);
  return O.current = s ? v : () => {
  }, L(() => () => O.current(), []), { draft: c, setDraft: b, flush: v, cancel: N };
}
const P = ({ status: e }) => {
  var d;
  const t = jt({ status: e }), l = j(!1), [n, i] = A(!1), s = t == null ? void 0 : t.status;
  if (L(() => {
    if (s && !(s === "completed" && !l.current) && (l.current = !0, i(!0), s === "completed")) {
      const u = setTimeout(() => i(!1), 1e3);
      return () => clearTimeout(u);
    }
  }, [t]), !n || !s || s === "completed" && !l.current)
    return null;
  const c = (d = t == null ? void 0 : t.job) == null ? void 0 : d.message;
  return /* @__PURE__ */ r(
    "span",
    {
      className: `bd-savestate bd-savestate-${s}`,
      title: s === "conflict" ? "Conflict" : s,
      onClick: c ? (u) => {
        u.stopPropagation(), alert(c);
      } : void 0,
      children: s === "pending" ? "…" : s === "completed" ? "✓" : "✗"
    }
  );
}, Bt = (e) => {
  const t = e.value, [l, n] = A(t == null ? "" : String(t.value));
  return /* @__PURE__ */ w(
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
  const t = e.value, [l, n] = A((t == null ? void 0 : t.min) == null ? "" : String(t.min)), [i, s] = A((t == null ? void 0 : t.max) == null ? "" : String(t.max)), c = j(null), d = (u, f) => {
    c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      if (u === "" && f === "") {
        e.onChange(null);
        return;
      }
      e.onChange({
        op: "between",
        min: u === "" ? null : Number(u),
        max: f === "" ? null : Number(f)
      });
    }, 500);
  };
  return /* @__PURE__ */ w("span", { className: "bd-filter bd-filter-range", children: [
    /* @__PURE__ */ r(
      "input",
      {
        type: "number",
        placeholder: "min",
        value: l,
        onChange: (u) => {
          n(u.target.value), d(u.target.value, i);
        }
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        type: "number",
        placeholder: "max",
        value: i,
        onChange: (u) => {
          s(u.target.value), d(l, u.target.value);
        }
      }
    )
  ] });
}, pe = (e) => e === !0 || e === 1 || e === "1", Vt = (e) => {
  const [t, l] = B(e), n = pe(t);
  return /* @__PURE__ */ w("span", { className: "bd-input bd-input-boolean", children: [
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
}, Rt = {
  type: "boolean",
  default: () => !1,
  empty: (e) => e == null,
  Control: Vt,
  Filter: Bt,
  View: ({ value: e }) => /* @__PURE__ */ r("span", { className: `bd-boolean ${pe(e) ? "icon-true" : "icon-false"}`, children: pe(e) ? "✓" : "✗" })
};
function oe(e = {}) {
  const { type: t = "text", pattern: l, serialize: n = (s) => s } = e;
  return (s) => {
    const [c, d] = B(s), [u, f] = A(!1), o = s.config.errorMsg ?? e.errorMsg, a = s.config.pattern ?? l, { draft: h, setDraft: m, flush: b, cancel: v } = ee({
      value: c == null ? "" : String(c),
      commit: (N) => d(n(N)),
      validate: (N) => {
        const O = N === "" || !a || a.test(N);
        return f(!O), O;
      }
    });
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-text", children: [
      /* @__PURE__ */ r(
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
      /* @__PURE__ */ r(P, { status: s.status }),
      u && o ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: o }) : null
    ] });
  };
}
const z = (e) => (Array.isArray(e) ? e.length > 0 : e !== "" && e != null) ? e : null, nt = (e) => Array.isArray(e) ? Ne(e).map(String).join(", ") : String(e ?? ""), de = ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-text", children: nt(e) });
function lt(e, t, l) {
  if (e.add && e.remove) {
    for (const n of l.filter((i) => !t.includes(i)))
      e.add(n);
    for (const n of t.filter((i) => !l.includes(i)))
      e.remove(n);
  } else
    e.onChange(z(l));
}
function we(e) {
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
}, Ut = {
  type: ["varchar", "tag", "formula"],
  empty: (e) => !e,
  Control: oe({ serialize: z }),
  View: de
}, Pt = {
  type: "hex",
  empty: (e) => !e,
  defaultConfig: { pattern: /^[0-9a-fA-F]*$/, errorMsg: "Hex digits only (0-9, a-f)!" },
  Control: oe({ serialize: z }),
  View: de
}, Kt = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function it(e) {
  return String(e ?? "").replace(/[&<>"']/g, (t) => Kt[t]);
}
const zt = /^\s*(javascript|data|vbscript):/i;
function ue(e) {
  const t = String(e ?? "");
  return zt.test(t) ? "#" : it(t);
}
const Gt = /^\s*(javascript|data|vbscript):/i, Wt = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?$/, Ge = (e) => {
  let t = e.trim();
  return t.startsWith("|") && (t = t.slice(1)), t.endsWith("|") && (t = t.slice(0, -1)), t.split("|").map((l) => l.trim());
}, We = (e) => Gt.test(e) ? "#" : e;
function Y(e) {
  return e.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (t, l, n) => `<img alt="${l}" src="${We(n)}" />`).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (t, l, n) => `<a href="${We(n)}">${l}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
function Zt(e) {
  const t = it(e.replace(/\r\n?/g, `
`)).split(`
`), l = [];
  let n = [], i = null, s = [], c = null, d = null;
  const u = () => {
    n.length && l.push(`<p>${n.map(Y).join("<br />")}</p>`), n = [];
  }, f = () => {
    i && l.push(`<${i.tag}>${i.items.map((m) => `<li>${Y(m)}</li>`).join("")}</${i.tag}>`), i = null;
  }, o = () => {
    s.length && l.push(`<blockquote>${s.map(Y).join("<br />")}</blockquote>`), s = [];
  }, a = () => {
    if (d) {
      const m = `<tr>${d.header.map((v) => `<th>${Y(v)}</th>`).join("")}</tr>`, b = d.rows.map((v) => `<tr>${v.map((N) => `<td>${Y(N)}</td>`).join("")}</tr>`).join("");
      l.push(`<table><thead>${m}</thead><tbody>${b}</tbody></table>`);
    }
    d = null;
  }, h = () => {
    u(), f(), o(), a();
  };
  for (let m = 0; m < t.length; m++) {
    const b = t[m];
    if (c) {
      /^```/.test(b) ? (l.push(`<pre><code>${c.join(`
`)}</code></pre>`), c = null) : c.push(b);
      continue;
    }
    if (/^```/.test(b)) {
      h(), c = [];
      continue;
    }
    if (d) {
      if (b.trim() !== "" && b.includes("|")) {
        d.rows.push(Ge(b));
        continue;
      }
      a();
    }
    const v = b.match(/^(#{1,6})\s+(.*)$/);
    if (v) {
      h(), l.push(`<h${v[1].length}>${Y(v[2])}</h${v[1].length}>`);
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(b)) {
      h(), l.push("<hr />");
      continue;
    }
    const N = b.match(/^&gt;\s?(.*)$/);
    if (N) {
      u(), f(), s.push(N[1]);
      continue;
    }
    const O = b.match(/^\s*[-*]\s+(.*)$/), S = b.match(/^\s*\d+\.\s+(.*)$/);
    if (O || S) {
      u(), o();
      const $ = O ? "ul" : "ol";
      (!i || i.tag !== $) && (f(), i = { tag: $, items: [] }), i.items.push((O ?? S)[1]);
      continue;
    }
    if (b.includes("|") && m + 1 < t.length && Wt.test(t[m + 1])) {
      h(), d = { header: Ge(b), rows: [] }, m++;
      continue;
    }
    if (b.trim() === "") {
      h();
      continue;
    }
    f(), o(), n.push(b);
  }
  return c && l.push(`<pre><code>${c.join(`
`)}</code></pre>`), h(), l.join(`
`);
}
function fe(e, t) {
  return (n) => {
    const [i, s] = B(n), { draft: c, setDraft: d, flush: u, cancel: f } = ee({
      value: t ? t(i) : i == null ? "" : String(i),
      commit: (o) => s(e(o, n))
    });
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-textarea", children: [
      /* @__PURE__ */ r(
        "textarea",
        {
          rows: n.config.rows ?? 10,
          value: c,
          placeholder: n.config.placeholder,
          onChange: (o) => d(o.target.value),
          onBlur: u,
          onKeyDown: (o) => {
            o.key === "Escape" && (f(), o.target.blur());
          }
        }
      ),
      /* @__PURE__ */ r(P, { status: n.status })
    ] });
  };
}
const Jt = (e) => {
  const [t, l] = B(e), [n, i] = A(""), s = Ne(t).map(String), c = (u, f, o) => {
    if (e.add && e.remove)
      f !== void 0 && e.add(f), o !== void 0 && e.remove(o);
    else {
      l(u.length ? u : null);
      return;
    }
    l(u);
  }, d = () => {
    const u = n.trim();
    if (!u || s.includes(u)) {
      i("");
      return;
    }
    c([...s, u], u), i("");
  };
  return /* @__PURE__ */ w("span", { className: "bd-input bd-input-chips", children: [
    /* @__PURE__ */ r("span", { className: "bd-chips", children: s.map((u) => /* @__PURE__ */ w("span", { className: "bd-chip", children: [
      u,
      /* @__PURE__ */ r("button", { type: "button", className: "bd-chip-remove", onClick: () => c(s.filter((f) => f !== u), void 0, u), children: "×" })
    ] }, u)) }),
    /* @__PURE__ */ r(
      "input",
      {
        value: n,
        placeholder: e.config.placeholder ?? "add a value",
        onChange: (u) => i(u.target.value),
        onKeyDown: (u) => {
          u.key === "Enter" && (u.preventDefault(), d()), u.key === "Escape" && i("");
        },
        onBlur: d
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, qt = {
  type: "text",
  empty: (e) => !e,
  Control: fe((e) => z(e)),
  View: de
}, Ht = {
  type: "markdown",
  empty: (e) => !e,
  Control: fe((e) => z(e)),
  // renderMarkdown escapes first — the markup below is library-built, never raw input
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-markdown", dangerouslySetInnerHTML: { __html: Zt(String(e ?? "")) } })
}, Yt = {
  type: ["varchar[]", "text[]", "tag[]"],
  default: () => [],
  Control: Jt,
  View: de
};
function Ze(e, t = !0) {
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: t }).format(e).replace(/\./g, "'").replace(/,/g, ".");
}
function Qt(e, t) {
  if (!t)
    return Ze(e);
  try {
    return new Intl.NumberFormat("de-DE", { currency: t, style: "currency" }).format(e).replace(/\./g, "'").replace(/,/g, ".");
  } catch {
    return `${Ze(e)} ${t}`;
  }
}
function Xt(e) {
  if (e === "" || e === null || e === void 0)
    return "";
  const t = parseFloat(e);
  return isNaN(t) ? String(e) : String(Math.round(t * 1e4) / 1e4);
}
function en(e) {
  const t = Math.max(0, Math.floor(e));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor(t % 86400 / 3600),
    m: Math.floor(t % 3600 / 60),
    s: t % 60
  };
}
function tn(e, t) {
  const l = Object.keys(e);
  if (l.length === 0)
    return "";
  if (t) {
    if (typeof e[t] == "string")
      return e[t];
    const i = t.split("_")[0], s = l.find((c) => c === i || c.startsWith(`${i}_`));
    if (s && typeof e[s] == "string")
      return e[s];
  }
  if (typeof e.default == "string")
    return e.default;
  const n = l.find((i) => typeof e[i] == "string");
  return n ? e[n] : "";
}
const nn = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
function st(e) {
  const t = e.match(nn);
  return t ? t[1] : null;
}
function ln(e) {
  if (e.thumbnail)
    return e.thumbnail;
  if (e["tn-oq"])
    return e["tn-oq"];
  const t = e.url ? st(e.url) : null;
  return t ? `https://img.youtube.com/vi/${t}/hqdefault.jpg` : null;
}
const sn = (e) => {
  const [t, l] = B(e), n = e.config.baseLocale ?? e.settings.language ?? "en", i = t && typeof t == "object" ? t : {}, s = Object.keys(i).filter((a) => a !== n), [c, d] = A(""), u = (a) => {
    const h = Object.fromEntries(Object.entries(a).filter(([m]) => m.trim() !== ""));
    l(Object.keys(h).length > 0 ? h : null);
  }, f = (a, h) => u({ ...i, [a]: h }), o = (a) => {
    const h = { ...i };
    delete h[a], u(h);
  };
  return /* @__PURE__ */ w("div", { className: "bd-input bd-input-i18n", children: [
    /* @__PURE__ */ w("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ r("span", { className: "bd-i18n-locale", children: n }),
      /* @__PURE__ */ r("input", { value: i[n] ?? "", onChange: (a) => f(n, a.target.value) }),
      /* @__PURE__ */ r(P, { status: e.status })
    ] }),
    s.map((a) => /* @__PURE__ */ w("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ r("span", { className: "bd-i18n-locale", children: a }),
      /* @__PURE__ */ r("input", { value: i[a] ?? "", onChange: (h) => f(a, h.target.value) }),
      /* @__PURE__ */ r("button", { type: "button", onClick: () => o(a), children: "×" })
    ] }, a)),
    /* @__PURE__ */ w("div", { className: "bd-i18n-row bd-i18n-add", children: [
      /* @__PURE__ */ r(
        "input",
        {
          placeholder: "locale (fr, de…)",
          value: c,
          onChange: (a) => d(a.target.value),
          onKeyDown: (a) => {
            a.key === "Enter" && c.trim() && (f(c.trim(), ""), d(""));
          }
        }
      ),
      /* @__PURE__ */ r("button", { type: "button", onClick: () => {
        c.trim() && (f(c.trim(), ""), d(""));
      }, children: "+ locale" })
    ] })
  ] });
}, an = {
  type: "texti18n",
  empty: (e) => !e || Object.keys(e).length === 0,
  Control: sn,
  View: ({ value: e, settings: t }) => /* @__PURE__ */ r("p", { className: "bd-texti18n bd-text", children: tn(e ?? {}, t == null ? void 0 : t.language) })
};
function at(e) {
  const t = (n) => n === "" ? null : e ? parseFloat(n) || 0 : parseInt(n) || 0;
  return (n) => {
    const [i, s] = B(n), { draft: c, setDraft: d, flush: u, cancel: f } = ee({
      value: i == null ? "" : String(i),
      commit: (a) => s(t(a))
    }), o = n.config.unit ?? (Array.isArray(n.attributeDetails.unit) ? n.attributeDetails.unit[0] : n.attributeDetails.unit);
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-number", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "number",
          value: c,
          min: n.config.min,
          max: n.config.max,
          step: e ? "any" : 1,
          placeholder: n.config.placeholder,
          onChange: (a) => d(a.target.value),
          onBlur: u,
          onKeyDown: (a) => {
            a.key === "Enter" && u(), a.key === "Escape" && (f(), a.target.blur());
          }
        }
      ),
      o ? /* @__PURE__ */ r("span", { className: "bd-input-unit", children: o }) : null,
      /* @__PURE__ */ r(P, { status: n.status })
    ] });
  };
}
const rt = at(!1), Se = at(!0), rn = {
  type: ["int", "tinyint"],
  empty: (e) => e == null,
  Control: rt,
  Filter: ce,
  View: ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-number", children: String(e) })
}, cn = {
  type: ["double", "float"],
  empty: (e) => e == null,
  Control: Se,
  Filter: ce,
  View: ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-number", children: String(e) })
}, on = {
  type: "percentage",
  empty: (e) => e == null,
  Control: Se,
  Filter: ce,
  View: ({ value: e }) => /* @__PURE__ */ w("p", { className: "bd-number bd-percentage", children: [
    Xt(e),
    " ",
    /* @__PURE__ */ r("span", { className: "bd-percentage-sign", children: "%" })
  ] })
}, dn = {
  type: "currency",
  empty: (e) => e == null,
  Control: Se,
  Filter: ce,
  View: ({ value: e, attributeDetails: t, config: l }) => {
    const n = (l == null ? void 0 : l.unit) ?? (Array.isArray(t == null ? void 0 : t.unit) ? t == null ? void 0 : t.unit[0] : t == null ? void 0 : t.unit);
    return /* @__PURE__ */ r("p", { className: "bd-number bd-currency", children: Qt(Number(e), n) });
  }
}, un = {
  type: "duration",
  empty: (e) => e == null,
  defaultConfig: { min: 0, placeholder: "seconds" },
  Control: rt,
  Filter: ce,
  View: ({ value: e }) => {
    const t = en(Number(e) || 0), l = ["d", "h", "m", "s"].filter((n) => t[n] > 0);
    return /* @__PURE__ */ r("p", { className: "bd-duration", children: l.length === 0 ? "0s" : l.map((n) => `${t[n]}${n}`).join(" ") });
  }
}, fn = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, ct = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, gn = {
  type: "email",
  empty: (e) => !e,
  Control: oe({ type: "email", pattern: fn, errorMsg: "Wrong email address!", serialize: z }),
  View: ({ value: e }) => /* @__PURE__ */ r("a", { className: "bd-email", href: `mailto:${e}`, children: String(e) })
}, hn = {
  type: "url",
  empty: (e) => !e,
  Control: oe({ type: "url", pattern: ct, errorMsg: "Wrong URL!", serialize: z }),
  View: ({ value: e }) => /* @__PURE__ */ r("a", { className: "bd-url", href: ue(e), target: "_blank", rel: "noopener noreferrer", children: String(e) })
}, mn = (e) => {
  const [t, l] = B(e), n = typeof t == "object" && t !== null ? t : {}, i = typeof t == "object" ? (t == null ? void 0 : t.url) ?? "" : t ?? "", { draft: s, setDraft: c, flush: d, cancel: u } = ee({
    value: String(i),
    commit: (f) => {
      if (!f) {
        l(null);
        return;
      }
      if (!ct.test(f))
        return;
      const o = st(f), a = n.thumbnail ?? (o ? `https://img.youtube.com/vi/${o}/hqdefault.jpg` : void 0);
      l({ ...n, url: f, ...a ? { thumbnail: a } : {} });
    }
  });
  return /* @__PURE__ */ w("span", { className: "bd-input bd-input-text bd-input-youtube", children: [
    /* @__PURE__ */ r(
      "input",
      {
        type: "url",
        value: s,
        placeholder: e.config.placeholder ?? "https://www.youtube.com/watch?v=…",
        onChange: (f) => c(f.target.value),
        onBlur: d,
        onKeyDown: (f) => {
          f.key === "Enter" && d(), f.key === "Escape" && (u(), f.target.blur());
        }
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, bn = {
  type: "youtube",
  empty: (e) => !e || typeof e == "object" && !e.url,
  Control: mn,
  View: ({ value: e }) => {
    const t = typeof e == "object" && e !== null ? e : { url: String(e ?? "") }, l = ln(t);
    return t.url ? /* @__PURE__ */ r("a", { className: "bd-youtube", href: ue(t.url), target: "_blank", rel: "noopener noreferrer", children: l ? /* @__PURE__ */ r("img", { src: l, alt: "video" }) : String(t.url) }) : null;
  }
}, yn = {
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
}, ve = ["plain", "javascript", "typescript", "python", "php", "ruby", "go", "rust", "java", "c", "cpp", "csharp", "html", "css", "sql", "shell", "json", "yaml", "markdown"], vn = (e) => {
  const [t, l] = B(e), n = (t == null ? void 0 : t.language) ?? null, [i] = A(!1), { draft: s, setDraft: c, flush: d, cancel: u } = ee({
    value: (t == null ? void 0 : t.content) ?? "",
    commit: (o) => l(o ? { content: o, language: n } : null)
  }), f = n && !ve.includes(n) ? [...ve, n] : ve;
  return /* @__PURE__ */ w("div", { className: "bd-input bd-input-code", children: [
    /* @__PURE__ */ r(
      "select",
      {
        value: n ?? "plain",
        onChange: (o) => {
          const a = o.target.value === "plain" ? null : o.target.value;
          s && l({ content: s, language: a });
        },
        children: f.map((o) => /* @__PURE__ */ r("option", { value: o, children: o }, o))
      }
    ),
    /* @__PURE__ */ r(
      "textarea",
      {
        rows: e.config.rows ?? 10,
        spellCheck: !1,
        value: s,
        onChange: (o) => c(o.target.value),
        onBlur: d,
        onKeyDown: (o) => {
          o.key === "Escape" && (u(), o.target.blur());
        }
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status }),
    i ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: "Invalid" }) : null
  ] });
}, pn = {
  type: "code",
  empty: (e) => !(e != null && e.content),
  Control: vn,
  View: ({ value: e, config: t }) => e != null && e.content ? /* @__PURE__ */ w("div", { className: `bd-code${e.language ? ` bd-code-${e.language}` : ""}`, children: [
    t != null && t.showLanguage && e.language ? /* @__PURE__ */ r("span", { className: "bd-code-language", children: e.language }) : null,
    /* @__PURE__ */ r("pre", { children: /* @__PURE__ */ r("code", { children: e.content }) })
  ] }) : null
};
function ot(e) {
  const t = (i) => i ? e ? i.replace(" ", "T").slice(0, 16) : i.slice(0, 10) : "", l = (i) => {
    if (!i)
      return null;
    if (!e)
      return i;
    const s = i.replace("T", " ");
    return s.length === 16 ? `${s}:00` : s;
  };
  return (i) => {
    const [s, c] = B(i);
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-date", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: e ? "datetime-local" : "date",
          value: t(s),
          onChange: (d) => c(l(d.target.value))
        }
      ),
      /* @__PURE__ */ r(P, { status: i.status })
    ] });
  };
}
const Cn = {
  type: "date",
  empty: (e) => !e,
  Control: ot(!1),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-date", children: String(e) })
}, Nn = {
  type: "datetime",
  empty: (e) => !e,
  defaultConfig: { time: !0 },
  Control: ot(!0),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-datetime", children: String(e) })
}, te = ({ items: e, search: t, multiple: l, value: n, onChange: i, placeholder: s, selectedLabels: c, required: d, status: u }) => {
  const [f, o] = A(!1), [a, h] = A(""), [m, b] = A(e ?? []), [v, N] = A(!1), O = j(null), [S, $] = A({ ...c });
  L(() => {
    e && b(e);
  }, [e]), L(() => {
    c && $((C) => ({ ...C, ...c }));
  }, [c]), L(() => {
    if (!t || !f)
      return;
    let C = !1;
    N(!0);
    const y = setTimeout(() => {
      t(a).then((E) => {
        C || b(E);
      }).catch((E) => console.error("[BlitzUIManagerReact] picker search failed:", (E == null ? void 0 : E.message) ?? E)).finally(() => {
        C || N(!1);
      });
    }, a ? 500 : 0);
    return () => {
      C = !0, clearTimeout(y);
    };
  }, [t, a, f]), L(() => {
    if (!f)
      return;
    const C = (y) => {
      var E;
      (E = O.current) != null && E.contains(y.target) || o(!1);
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [f]), L(() => {
    m.length && $((C) => ({ ...C, ...Object.fromEntries(m.map((y) => [y.value, y.label])) }));
  }, [m]);
  const T = (C) => C.map((y) => m.find((E) => E.value === y) ?? { value: y, label: S[y] ?? y }), M = (C) => {
    if (l) {
      const y = n.includes(C.value) ? n.filter((E) => E !== C.value) : [...n, C.value];
      i(T(y));
    } else
      i([C]), o(!1);
  }, D = () => {
    i([]), o(!1);
  }, x = n.length ? n.map((C) => S[C] ?? C).join(", ") : s ?? "Select…", F = t ? m : m.filter((C) => !a || C.label.toLowerCase().includes(a.toLowerCase()));
  return /* @__PURE__ */ w("div", { className: "bd-picker", ref: O, children: [
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        className: `bd-picker-display${n.length ? "" : " bd-picker-placeholder"}`,
        onClick: () => o((C) => !C),
        onKeyDown: (C) => {
          C.key === "Escape" && o(!1);
        },
        children: x
      }
    ),
    /* @__PURE__ */ r(P, { status: u }),
    f ? /* @__PURE__ */ w("div", { className: "bd-picker-menu", children: [
      t || m.length > 7 ? /* @__PURE__ */ r(
        "input",
        {
          className: "bd-picker-search",
          autoFocus: !0,
          value: a,
          placeholder: "Search…",
          onChange: (C) => h(C.target.value),
          onKeyDown: (C) => {
            C.key === "Escape" && o(!1);
          }
        }
      ) : null,
      /* @__PURE__ */ w("ul", { className: "bd-picker-options", role: "listbox", children: [
        !d && !l && n.length ? /* @__PURE__ */ r("li", { className: "bd-picker-clear", onClick: D, children: "Clear" }) : null,
        v ? /* @__PURE__ */ r("li", { className: "bd-picker-loading", children: "Loading…" }) : null,
        !v && F.length === 0 ? /* @__PURE__ */ r("li", { className: "bd-picker-loading", children: "No results" }) : null,
        F.map((C) => /* @__PURE__ */ w(
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
}, An = (e) => e.charAt(0).toUpperCase() + e.slice(1), dt = (e) => {
  const t = e.attributeDetails.options ?? e.config.options ?? [], l = e.config.excludeOptions ?? [];
  return t.filter((n) => !l.includes(n)).map((n) => ({ value: n, label: An(n) }));
}, wn = (e) => {
  const [t, l] = B(e), n = !!e.config.multiple, i = we(t);
  return /* @__PURE__ */ r(
    te,
    {
      items: dt(e),
      multiple: n,
      value: i,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (s) => {
        const c = s.map((d) => d.value);
        n ? lt(e, i, c) : l(c[0] ?? null);
      }
    }
  );
}, Sn = (e) => {
  const t = e.value, [l, n] = A((t == null ? void 0 : t.values) ?? []);
  return /* @__PURE__ */ r(
    te,
    {
      items: dt(e),
      multiple: !0,
      value: l,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (i) => {
        const s = i.map((c) => c.value);
        n(s), e.onChange(s.length ? { op: "in", values: s } : null);
      }
    }
  );
}, $n = {
  type: ["enum", "enum[]"],
  Control: wn,
  Filter: Sn,
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-enum", children: /* @__PURE__ */ r("p", { children: nt(e) }) })
}, kn = [
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
function On(e, t, l = !1) {
  const n = e.replace(/[^\d+]/g, ""), i = [];
  if (n.length === 10)
    i.push(n.slice(0, 3)), i.push(n.slice(3, 6)), i.push(n.slice(6, 8)), i.push(n.slice(8, 10));
  else if (n.length === 9)
    i.push(n.slice(0, 3)), i.push(n.slice(3, 6)), i.push(n.slice(6, 9));
  else if (n.length === 11)
    i.push(n.slice(0, 3)), i.push(n.slice(3, 7)), i.push(n.slice(7, 11));
  else
    for (let c = 0; c < n.length; c += 3)
      i.push(n.slice(c, c + 3));
  const s = i.filter(Boolean).join(" ");
  return t && l ? `${t} ${s}` : s;
}
const Mn = /^[0-9]{7,14}$/, ut = (e, t) => {
  if (!e)
    return { dial: t, digits: "" };
  const l = e.indexOf("-");
  return l === -1 ? { dial: t, digits: e } : { dial: e.slice(0, l), digits: e.slice(l + 1) };
}, En = (e) => {
  const [t, l] = B(e), n = e.config.defaultDialCode ?? "+1", { dial: i, digits: s } = ut(t, n), c = U(() => {
    const a = /* @__PURE__ */ new Set();
    return kn.filter((h) => a.has(h.dial) ? !1 : (a.add(h.dial), !0));
  }, []), { draft: d, setDraft: u, flush: f, cancel: o } = ee({
    value: s,
    commit: (a) => l(a ? `${i}-${a}` : null),
    validate: (a) => a === "" || Mn.test(a)
  });
  return /* @__PURE__ */ w("span", { className: "bd-input bd-input-phone", children: [
    /* @__PURE__ */ r(
      "select",
      {
        value: i,
        onChange: (a) => {
          s && l(`${a.target.value}-${s}`);
        },
        children: c.map((a) => /* @__PURE__ */ w("option", { value: a.dial, children: [
          a.code,
          " ",
          a.dial
        ] }, a.dial))
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        type: "tel",
        value: d,
        placeholder: e.config.placeholder ?? "phone number",
        onChange: (a) => u(a.target.value.replace(/[^0-9]/g, "")),
        onBlur: f,
        onKeyDown: (a) => {
          a.key === "Enter" && f(), a.key === "Escape" && (o(), a.target.blur());
        }
      }
    ),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, Tn = {
  type: "phone",
  empty: (e) => !e,
  Control: En,
  View: ({ value: e }) => {
    const { dial: t, digits: l } = ut(String(e ?? ""), "");
    return /* @__PURE__ */ w("p", { className: "bd-phone", children: [
      t ? `${t} ` : "",
      On(l)
    ] });
  }
}, ft = wt(tt), fl = ft.Provider;
function J() {
  return St(ft);
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
}, Je = (e, t) => {
  var i, s;
  const l = ((i = e == null ? void 0 : e._blitzID) == null ? void 0 : i.value) ?? "", n = (t ? (s = e == null ? void 0 : e[t]) == null ? void 0 : s.value : null) ?? l;
  return { value: String(l), label: String(n), obj: e };
};
function $e(e, t) {
  const l = Array.isArray(e.attributeDetails.type) ? e.attributeDetails.type[0] : e.attributeDetails.type, [n, i] = A(null), [s, c] = A({});
  L(() => {
    let f = !1;
    if (l)
      return e.resolveModel(String(l)).then((o) => {
        f || i(o);
      }).catch((o) => console.error("[BlitzUIManagerReact] fk model resolve failed:", (o == null ? void 0 : o.message) ?? o)), () => {
        f = !0;
      };
  }, [l]);
  const d = t.join(",");
  return L(() => {
    if (!n || !t.length)
      return;
    let f = !1;
    const o = re(n);
    return Promise.all(t.map((a) => n.get(a).catch(() => null))).then((a) => {
      if (f)
        return;
      const h = {};
      for (const m of a) {
        if (!m)
          continue;
        const b = Je(m, o);
        h[b.value] = b.label;
      }
      c(h);
    }), () => {
      f = !0;
    };
  }, [n, d]), { search: U(() => {
    if (n)
      return async (f) => {
        const o = re(n), a = f && o ? [[o, "LIKE", `%${f}%`]] : void 0;
        return (await n.list({ conditions: a, limit: e.config.limit ?? 100 })).map((m) => Je(m, o));
      };
  }, [n, e.config.limit]), labels: s, ready: !!n };
}
const Ln = (e) => {
  var c;
  const [t, l] = B(e), n = t == null || t === "" ? [] : [String(((c = t == null ? void 0 : t._blitzID) == null ? void 0 : c.value) ?? t)], { search: i, labels: s } = $e(e, n);
  return /* @__PURE__ */ r(
    te,
    {
      search: i,
      value: n,
      selectedLabels: s,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (d) => {
        var u;
        return l(((u = d[0]) == null ? void 0 : u.value) ?? null);
      }
    }
  );
}, Fn = (e) => {
  const [t] = B(e), l = we(t), { search: n, labels: i } = $e(e, l);
  return /* @__PURE__ */ r(
    te,
    {
      search: n,
      multiple: !0,
      value: l,
      selectedLabels: i,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (s) => lt(e, l, s.map((c) => c.value))
    }
  );
}, gt = (e) => {
  const t = e.value, [l, n] = A((t == null ? void 0 : t.values) ?? []), { search: i, labels: s } = $e(e, l);
  return /* @__PURE__ */ r(
    te,
    {
      search: i,
      multiple: !0,
      value: l,
      selectedLabels: s,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (c) => {
        const d = c.map((u) => u.value);
        n(d), e.onChange(d.length ? { op: "in", values: d } : null);
      }
    }
  );
}, ht = ({ value: e, attributeDetails: t }) => {
  const l = J(), n = we(e), [i, s] = A({}), c = Array.isArray(t == null ? void 0 : t.type) ? t == null ? void 0 : t.type[0] : t == null ? void 0 : t.type, d = n.join(",");
  return L(() => {
    if (!c || !n.length)
      return;
    let u = !1;
    return (async () => {
      var f;
      try {
        const o = await l.resolveModel(String(c)), a = re(o);
        if (!a)
          return;
        const h = {};
        for (const m of n) {
          const b = await o.get(m).catch(() => null), v = (f = b == null ? void 0 : b[a]) == null ? void 0 : f.value;
          v != null && (h[m] = String(v));
        }
        !u && Object.keys(h).length && s(h);
      } catch {
      }
    })(), () => {
      u = !0;
    };
  }, [d, c]), /* @__PURE__ */ r("p", { className: "bd-fk", children: n.map((u) => i[u] ?? u).join(", ") });
}, In = {
  type: "fk",
  Control: Ln,
  Filter: gt,
  View: ht
}, Dn = {
  type: "mtm",
  default: () => null,
  Control: Fn,
  Filter: gt,
  View: ht
}, qe = (e, t) => {
  var i, s;
  const l = ((i = e == null ? void 0 : e._blitzID) == null ? void 0 : i.value) ?? "", n = (t ? (s = e == null ? void 0 : e[t]) == null ? void 0 : s.value : null) ?? l;
  return { value: String(l), label: String(n), obj: e };
}, xn = (e) => e.filter((t, l, n) => n.findIndex((i) => i.value === t.value) === l);
function _n(e, t) {
  const l = e.config.usersModel, [n, i] = A(null), [s, c] = A({});
  L(() => {
    let o = !1;
    if (l)
      return e.resolveModel(String(l)).then((a) => {
        o || i(a);
      }).catch((a) => console.error("[BlitzUIManagerReact] user model resolve failed:", (a == null ? void 0 : a.message) ?? a)), () => {
        o = !0;
      };
  }, [l]);
  const d = n ? e.config.labelAttribute ?? re(n) : null, u = t.join(",");
  return L(() => {
    if (!n || !t.length)
      return;
    let o = !1;
    return Promise.all(t.map((a) => n.get(a).catch(() => null))).then((a) => {
      if (o)
        return;
      const h = {};
      for (const m of a) {
        if (!m)
          continue;
        const b = qe(m, d);
        h[b.value] = b.label;
      }
      c(h);
    }), () => {
      o = !0;
    };
  }, [n, u, d]), { search: U(() => {
    if (n)
      return async (o) => {
        const a = o && d ? [[d, "LIKE", `%${o}%`]] : void 0, h = await n.list({ conditions: a, limit: e.config.limit ?? 100 });
        return xn(h.map((m) => qe(m, d)));
      };
  }, [n, d, e.config.limit]), labels: s };
}
const jn = (e) => {
  const t = e.value, [l, n] = A((t == null ? void 0 : t.values) ?? []), { search: i, labels: s } = _n(e, l);
  return /* @__PURE__ */ r(
    te,
    {
      search: i,
      multiple: !0,
      value: l,
      selectedLabels: s,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (c) => {
        const d = c.map((u) => u.value);
        n(d), e.onChange(d.length ? { op: "in", values: d } : null);
      }
    }
  );
}, Bn = {
  type: "user",
  defaultConfig: { usersModel: "0BAUsers", labelAttribute: "username" },
  Filter: jn
};
function ke(e) {
  const { accept: t, multiple: l, service: n, commit: i, preview: s } = e;
  return (d) => {
    const [u, f] = B(d), [o, a] = A(!1), [h, m] = A(null), b = j(null), v = d.services[n], N = async (O) => {
      if (O != null && O.length) {
        if (!v) {
          m(`No '${n}' service configured`);
          return;
        }
        a(!0), m(null);
        try {
          const S = [];
          for (const $ of Array.from(O))
            S.push(await v($));
          f(i(S));
        } catch (S) {
          m((S == null ? void 0 : S.message) ?? "Upload failed");
        } finally {
          a(!1), b.current && (b.current.value = "");
        }
      }
    };
    return /* @__PURE__ */ w("span", { className: "bd-input bd-input-upload", children: [
      s && u != null ? /* @__PURE__ */ r(s, { value: u }) : null,
      /* @__PURE__ */ r(
        "input",
        {
          ref: b,
          type: "file",
          accept: t,
          multiple: l,
          disabled: o,
          onChange: (O) => void N(O.target.files)
        }
      ),
      o ? /* @__PURE__ */ r("span", { className: "bd-uploading", children: "Uploading…" }) : null,
      h ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: h }) : null,
      /* @__PURE__ */ r(P, { status: d.status })
    ] });
  };
}
const Vn = (e) => e != null && e.base && typeof e.sd == "string" ? `${e.base}${e.sd.substring(1)}` : null, He = ({ value: e }) => {
  const t = Ne(Array.isArray(e) ? e : [e]);
  return /* @__PURE__ */ r("span", { className: "bd-image-previews", children: t.map((l, n) => {
    const i = Vn(l);
    return i ? /* @__PURE__ */ r("img", { src: i, alt: "" }, n) : null;
  }) });
}, Rn = {
  type: ["image", "image[]"],
  default: () => [],
  // the service returns ImageRawType; a single image is still stored as an array
  Control: ke({ accept: "image/*", multiple: !0, service: "upload", commit: (e) => e, preview: He }),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-image", children: /* @__PURE__ */ r(He, { value: e }) })
}, Un = {
  type: "file",
  Control: ke({ service: "uploadFile", commit: (e) => e[0] }),
  View: ({ value: e }) => {
    const t = typeof e == "string" ? e : e == null ? void 0 : e.url;
    return t ? /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("a", { className: "bd-file", href: ue(t), target: "_blank", rel: "noopener noreferrer", children: "Link" }) }) : null;
  }
}, Pn = {
  type: "video",
  Control: ke({ accept: ".mp4,.m4v,.mov", service: "uploadVideo", commit: (e) => e[0] }),
  View: ({ value: e }) => {
    const t = e == null ? void 0 : e.url;
    return t ? /* @__PURE__ */ r("video", { className: "bd-video", controls: !0, children: /* @__PURE__ */ r("source", { src: ue(t) }) }) : null;
  }
}, Kn = [
  { key: "address", label: "Address" },
  { key: "street", label: "Street" },
  { key: "street_number", label: "Nr." },
  { key: "postal_code", label: "ZIP" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "lat", label: "Lat" },
  { key: "lng", label: "Lng" }
], zn = (e) => {
  const [t, l] = B(e), n = t !== null && typeof t == "object" ? t : {}, i = (s, c) => {
    const d = { ...n, [s]: c }, u = Object.values(d).some((f) => f !== "" && f != null);
    l(u ? d : null);
  };
  return /* @__PURE__ */ w("div", { className: "bd-input bd-input-location", children: [
    Kn.map(({ key: s, label: c }) => /* @__PURE__ */ w("label", { className: "bd-location-field", children: [
      /* @__PURE__ */ r("span", { children: c }),
      /* @__PURE__ */ r("input", { value: String(n[s] ?? ""), onChange: (d) => i(s, d.target.value) })
    ] }, s)),
    /* @__PURE__ */ r(P, { status: e.status })
  ] });
}, Gn = oe({ serialize: z }), Wn = ({ value: e, config: t }) => {
  const l = j(null), n = e == null ? void 0 : e.lat, i = e == null ? void 0 : e.lng, s = (t == null ? void 0 : t.apiKey) ?? (t == null ? void 0 : t.googleMapsApiKey);
  return L(() => {
    if (!s || !n || !i || !l.current)
      return;
    let c = !1;
    const d = l.current;
    return Dt(String(n), String(i), s).then((u) => {
      !c && u && d.replaceChildren(u);
    }), () => {
      c = !0, d.replaceChildren();
    };
  }, [n, i, s]), typeof e == "string" ? /* @__PURE__ */ r("p", { className: "bd-location", children: e }) : /* @__PURE__ */ w("div", { className: "bd-location", "data-lat": n, "data-lng": i, children: [
    e != null && e.address ? /* @__PURE__ */ r("p", { className: "bd-location-address", children: e.address }) : null,
    /* @__PURE__ */ r("div", { ref: l, className: "bd-location-map" })
  ] });
}, Zn = {
  type: "location",
  empty: (e) => !e,
  Control: (e) => e.config.apiKey || e.value === null || typeof e.value == "object" ? /* @__PURE__ */ r(zn, { ...e }) : /* @__PURE__ */ r(Gn, { ...e }),
  View: ({ value: e, config: t }) => /* @__PURE__ */ r(Wn, { value: e, config: t })
}, Jn = /^<p id="[^"]*"><br><\/p>$/, qn = {
  type: "htmlText",
  empty: (e) => !e,
  Control: fe((e) => z(Jn.test(e) ? "" : e)),
  // stored HTML is trusted app content, same rule as the vanilla read path
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-html", dangerouslySetInnerHTML: { __html: String(e ?? "") } })
}, Hn = [
  Rt,
  Ut,
  Pt,
  qt,
  Ht,
  Yt,
  an,
  rn,
  cn,
  on,
  dn,
  un,
  gn,
  hn,
  bn,
  yn,
  pn,
  Cn,
  Nn,
  $n,
  Tn,
  In,
  Dn,
  Bn,
  Rn,
  Un,
  Pn,
  Zn,
  qn
];
const Yn = ({ value: e }) => /* @__PURE__ */ r("span", { className: "bd-fallback", children: typeof e == "object" ? JSON.stringify(e) : String(e) });
class Qn extends $t {
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
const Xn = (e) => (l) => {
  const n = l.value;
  return /* @__PURE__ */ r(
    e,
    {
      ...l,
      value: (n == null ? void 0 : n.value) ?? null,
      onChange: (i) => l.onChange(i == null || i === "" ? null : { op: "contains", value: i })
    }
  );
}, el = (e) => e.value !== null && e.value !== void 0 && typeof e.value == "object" ? "json" : e.kind === "draft" ? "varchar" : "text";
function tl(e, t, l, n) {
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
const nl = ({ View: e, props: t, empty: l }) => {
  var i;
  const [n] = B(t);
  return l(n) ? (i = t.config) != null && i.emptyMsg ? /* @__PURE__ */ r("span", { className: "bd-empty", children: t.config.emptyMsg }) : null : /* @__PURE__ */ r(e, { value: n, attributeDetails: t.attributeDetails, config: t.config, settings: t.settings });
}, Q = ({ attribute: e, port: t, mode: l = "write", use: n, config: i, label: s, className: c }) => {
  const d = J(), [u, f] = A(null), [o, a] = A(8), h = i ? JSON.stringify(i) : "", m = U(() => t ? i ? { ...t, mountConfig: { ...t.mountConfig, ...i } } : t : Tt(e, i), [e, t, h]), b = U(() => n && typeof n == "object" ? ae(n) : n, [n]), v = U(() => d.registry.resolve(
    { type: m.type, many: m.many, model: m.model, name: m.name, hint: m.hint, use: b, maxLayer: o },
    d.debug ? (T) => console.info(`[BlitzUIManagerReact] ${T}`) : void 0
  ), [d, m, b, o]), N = U(() => tl(m, d, v, f), [m, d, v]), O = () => {
    var D;
    const T = l === "read" ? "view" : l === "filter" ? "filter" : "control", M = ((D = v.sources[T]) == null ? void 0 : D.layer) ?? 0;
    a(M - 1);
  };
  let S = null;
  if (l === "read") {
    const T = v.view ?? Yn, M = v.empty ?? kt;
    S = /* @__PURE__ */ r(nl, { View: T, props: N, empty: M });
  } else if (l === "filter") {
    let T = v.filter;
    if (!T && v.control && et.has(m.type) && (T = Xn(v.control)), !T)
      return null;
    S = /* @__PURE__ */ r(T, { ...N });
  } else {
    let T = v.control;
    if (!T) {
      const M = el(m);
      M !== m.type && (d.warn(`No usable UI for type '${m.type}' — falling back to '${M}'`), T = d.registry.resolve({ type: M, model: m.model, name: m.name, maxLayer: 0 }).control);
    }
    if (!T)
      return d.warn(`Editor for type '${m.type}' not supported`), null;
    S = /* @__PURE__ */ r(T, { ...N });
  }
  const $ = s === !0 ? X(N.attributeDetails["label-int"], N.attributeDetails.label, d.settings.language ?? "en", m.name) : s;
  return /* @__PURE__ */ w("div", { className: `bd-field bd-field-${m.type}${c ? ` ${c}` : ""}`, children: [
    $ ? /* @__PURE__ */ r("label", { className: "bd-field-label", children: $ }) : null,
    /* @__PURE__ */ r(Qn, { onError: O, children: S }, `${l}-${o}`),
    u ? /* @__PURE__ */ r("p", { className: "bd-invalid-msg", children: u }) : null
  ] });
};
function ge(e) {
  const t = J(), l = typeof e == "string", [n, i] = A(l ? null : e);
  return L(() => {
    if (!l) {
      i(e);
      return;
    }
    let s = !1;
    return t.resolveModel(e).then((c) => {
      s || i(c);
    }).catch((c) => t.warn(`model '${e}' failed to resolve: ${(c == null ? void 0 : c.message) ?? c}`)), () => {
      s = !0;
    };
  }, [e, l, t]), n;
}
function ll(e, t) {
  var n;
  if (t)
    return t;
  const l = ((n = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : n.call(e)) ?? {};
  return Object.keys(l).filter((i) => !i.startsWith("_") && !i.startsWith("@"));
}
const gl = (e) => {
  var N, O, S;
  const t = J(), l = ge(e.model), n = j({}), [i, s] = A(null), [c, d] = A(!1), [u, f] = A(!1), o = U(() => ll(l, e.attributes), [l, e.attributes]), a = U(() => {
    var T;
    if (!l)
      return [];
    const $ = ((T = l.getAttributesDetails) == null ? void 0 : T.call(l)) ?? {};
    return o.map((M) => {
      var y, E;
      const D = $[M] ?? {}, x = Lt(n.current, M, D, l, e.config), F = t.registry.resolve({ type: x.type, many: x.many, model: x.model, name: M, hint: x.hint }), C = ((y = e.presetValues) == null ? void 0 : y[M]) ?? D.default ?? ((E = F.default) == null ? void 0 : E.call(F));
      return C !== void 0 && n.current[M] === void 0 && (n.current[M] = C), { ...x, value: n.current[M] };
    });
  }, [l, o]);
  if (L(() => () => {
    n.current = {};
  }, [l]), !l)
    return /* @__PURE__ */ r("div", { className: "bd-addform bd-loading", children: "Loading…" });
  const h = ((N = l.getAttributesDetails) == null ? void 0 : N.call(l)) ?? {}, m = t.settings.language ?? "en", b = ($) => {
    var T, M;
    return X((T = h[$]) == null ? void 0 : T["label-int"], (M = h[$]) == null ? void 0 : M.label, m, $);
  }, v = async () => {
    var M, D, x;
    s(null);
    const T = (e.requireAll ? o : e.requiredAttributes ?? []).filter((F) => n.current[F] == null);
    if (T.length) {
      s(`Missing required fields: ${T.map(b).join(", ")}`);
      return;
    }
    d(!0);
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
        var E, _;
        (y == null ? void 0 : y.status) === "completed" ? (E = e.onServerSuccess) == null || E.call(e, C) : (y == null ? void 0 : y.status) === "failed" && s(((_ = y == null ? void 0 : y.job) == null ? void 0 : _.message) ?? "Saving failed");
      })), f(!0);
    } catch (F) {
      s((F == null ? void 0 : F.message) ?? "An unexpected error occurred!");
    } finally {
      d(!1);
    }
  };
  return u ? /* @__PURE__ */ r("div", { className: `bd-addform ${((O = l.getName) == null ? void 0 : O.call(l)) ?? ""}`, children: /* @__PURE__ */ r("p", { className: "success-msg", children: e.successMessage ?? "Added successfully." }) }) : /* @__PURE__ */ w("div", { className: `bd-addform ${((S = l.getName) == null ? void 0 : S.call(l)) ?? ""}`, children: [
    a.map(($) => /* @__PURE__ */ r(
      Q,
      {
        port: $,
        mode: "write",
        label: e.withLabels ? b($.name) : void 0
      },
      $.name
    )),
    i ? /* @__PURE__ */ r("p", { className: "bd-invalid-msg", children: i }) : null,
    /* @__PURE__ */ r("button", { type: "button", className: "add-btn", disabled: c, onClick: () => void v(), children: c ? "…" : e.addButtonLabel ?? "Add" })
  ] });
}, Ye = (e) => e != null && typeof e == "object" && "_attributes" in e, hl = ({ src: e, attributes: t, withLabels: l, use: n, config: i }) => {
  var u;
  const s = J(), c = U(() => Array.isArray(e) ? e : Ye(e) ? (t ?? Object.keys(e._attributes ?? {}).filter((o) => !o.startsWith("_") && !o.startsWith("@")).filter((o) => {
    var a;
    return ((a = e[o]) == null ? void 0 : a.value) !== void 0;
  })).map((o) => e[o]).filter(Boolean) : e == null ? [] : [e], [e, t]), d = s.settings.language ?? "en";
  return /* @__PURE__ */ r("div", { className: `bd-object-editor${Ye(e) ? ` ${((u = e._blitzID) == null ? void 0 : u.value) ?? ""}` : ""}`, children: c.map((f) => {
    var a, h, m, b;
    const o = ((b = (m = (h = (a = f._object) == null ? void 0 : a.model) == null ? void 0 : h.getAttributesDetails) == null ? void 0 : m.call(h)) == null ? void 0 : b[f._name]) ?? {};
    return /* @__PURE__ */ r(
      Q,
      {
        attribute: f,
        mode: "write",
        use: n,
        config: i,
        label: l ? X(o["label-int"], o.label, d, f._name) : void 0
      },
      f._name
    );
  }) });
}, il = ({ object: e, attributes: t, withLabels: l, config: n }) => {
  var u, f, o, a, h, m;
  const i = J(), s = U(() => (t ?? Object.keys((e == null ? void 0 : e._attributes) ?? {})).filter((v) => !v.startsWith("_") && !v.startsWith("@")).filter((v) => {
    var N;
    return ((N = e == null ? void 0 : e[v]) == null ? void 0 : N.value) !== void 0;
  }), [e, t]);
  if (!e)
    return null;
  const c = ((o = (f = (u = e._object) == null ? void 0 : u.model) == null ? void 0 : f.getAttributesDetails) == null ? void 0 : o.call(f)) ?? ((h = (a = e.model) == null ? void 0 : a.getAttributesDetails) == null ? void 0 : h.call(a)) ?? {}, d = i.settings.language ?? "en";
  return /* @__PURE__ */ r("div", { className: `bd-objectview ${((m = e._blitzID) == null ? void 0 : m.value) ?? ""}`, children: s.map((b) => {
    var v, N;
    return /* @__PURE__ */ r(
      Q,
      {
        attribute: e[b],
        mode: "read",
        config: n,
        label: l ? X((v = c[b]) == null ? void 0 : v["label-int"], (N = c[b]) == null ? void 0 : N.label, d, b) : void 0
      },
      b
    );
  }) });
};
function sl(e, t) {
  const [l, n] = A([]), [i, s] = A(!1), c = t ? JSON.stringify(t) : "";
  return L(() => {
    if (!e)
      return;
    s(!1);
    const d = e.subscribeToList(t, (u) => {
      n([...u.items ?? []]), u.nextSource || s(!0);
    }, !0);
    return () => {
      d == null || d();
    };
  }, [e, c]), { items: l, settled: i };
}
const ml = (e) => {
  var o;
  const t = ge(e.model), { items: l, settled: n } = sl(t, e.options), [i, s] = A(1), c = e.objectsPerPage ?? 10, d = U(() => {
    let a = e.filter ? l.filter(e.filter) : [...l];
    return e.sort && a.sort(e.sort), a;
  }, [l, e.filter, e.sort]);
  L(() => {
    s(1);
  }, [e.filter]);
  const u = e.pagination ? Math.max(1, Math.ceil(d.length / c)) : 1, f = e.pagination ? d.slice((i - 1) * c, i * c) : d;
  return !n && l.length === 0 ? /* @__PURE__ */ r("div", { className: "bd-list bd-loading", children: e.loading ?? /* @__PURE__ */ r("span", { className: "spinner", children: "Loading…" }) }) : /* @__PURE__ */ w("div", { className: `bd-list ${((o = t == null ? void 0 : t.getName) == null ? void 0 : o.call(t)) ?? ""}`, children: [
    d.length === 0 && n ? /* @__PURE__ */ r("p", { className: "bd-list-empty", children: e.noResultsMessage ?? "No results." }) : f.map((a) => {
      var h, m;
      return /* @__PURE__ */ r(
        "div",
        {
          className: `card ${((h = a._blitzID) == null ? void 0 : h.value) ?? ""}`,
          onClick: e.onObjectClick ? () => e.onObjectClick(a) : void 0,
          children: e.renderRow ? e.renderRow(a) : /* @__PURE__ */ r(il, { object: a, attributes: e.attributes, withLabels: e.withLabels })
        },
        (m = a._blitzID) == null ? void 0 : m.value
      );
    }),
    e.pagination && u > 1 ? /* @__PURE__ */ r("div", { className: "bd-list-pagination", children: Array.from({ length: u }, (a, h) => h + 1).map((a) => /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        className: a === i ? "active" : "",
        onClick: () => s(a),
        children: a
      },
      a
    )) }) : null
  ] });
}, al = [
  { attribute: "_blitzstamp", label: "Newest", order: "desc" },
  { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
], rl = (e, t) => {
  const l = t === "desc" ? -1 : 1;
  return (n, i) => {
    var u, f;
    const s = (u = n[e]) == null ? void 0 : u.value, c = (f = i[e]) == null ? void 0 : f.value;
    return s == null || c == null ? s == null && c == null ? 0 : s == null ? l : -l : (typeof s == "number" && typeof c == "number" ? s - c : String(s).localeCompare(String(c))) * l;
  };
}, bl = (e) => {
  var x, F, C;
  const t = J(), l = ge(e.model), [n, i] = A(""), [s, c] = A(!1), d = j({}), u = j(""), { onFilterChange: f } = e, o = Z(() => {
    const y = Xe(d.current), E = u.current.trim(), _ = e.searchAttributes ?? [], K = E && _.length ? (q) => {
      const ne = new RegExp(Ae(E), "i");
      return _.some((H) => {
        var le;
        return typeof ((le = q[H]) == null ? void 0 : le.value) == "string" && ne.test(q[H].value);
      });
    } : null;
    f(!y && !K ? null : (q) => (!K || K(q)) && (!y || y(q)));
  }, [f, (x = e.searchAttributes) == null ? void 0 : x.join(",")]);
  L(() => {
    u.current = n;
    const y = setTimeout(o, n ? 300 : 0);
    return () => clearTimeout(y);
  }, [n, o]);
  const a = e.sortAttributes ?? al, [h, m] = A(0), { onSortChange: b } = e;
  L(() => {
    if (!b)
      return;
    const y = a[h];
    b(h === 0 ? null : rl(y.attribute, y.order));
  }, [h, b]);
  const v = Z((y) => {
    var _;
    if (!l)
      return [];
    const E = ((_ = l.getAttributesDetails) == null ? void 0 : _.call(l)) ?? {};
    return y.map((K) => Qe(d.current, K, E[K] ?? {}, l, o));
  }, [l, o]), N = U(() => v(e.filterAttributes ?? []), [v, e.filterAttributes]), O = U(() => v(e.dialogFilterAttributes ?? []), [v, e.dialogFilterAttributes]), S = () => {
    for (const y of Object.keys(d.current))
      delete d.current[y];
    i(""), c(!1), o();
  }, $ = ((F = l == null ? void 0 : l.getAttributesDetails) == null ? void 0 : F.call(l)) ?? {}, T = t.settings.language ?? "en", M = (y) => {
    var E, _;
    return X((E = $[y]) == null ? void 0 : E["label-int"], (_ = $[y]) == null ? void 0 : _.label, T, y);
  }, D = n.trim() !== "" || Object.keys(d.current).length > 0;
  return /* @__PURE__ */ w("div", { className: "bd-searchbox", children: [
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
    /* @__PURE__ */ w("div", { className: "bd-searchbox-actions", children: [
      e.onSortChange && a.length ? /* @__PURE__ */ r(
        "select",
        {
          className: "bd-searchbox-sort",
          value: h,
          onChange: (y) => m(Number(y.target.value)),
          children: a.map((y, E) => /* @__PURE__ */ r("option", { value: E, children: y.label }, E))
        }
      ) : null,
      O.length ? /* @__PURE__ */ r("button", { type: "button", className: "bd-searchbox-filters-btn", onClick: () => c(!0), children: e.filtersButtonLabel ?? "Filters" }) : null,
      D ? /* @__PURE__ */ r("button", { type: "button", className: "bd-searchbox-clear", onClick: S, children: e.clearFiltersLabel ?? "Clear" }) : null
    ] }),
    s ? /* @__PURE__ */ r("div", { className: "bd-filters-dialog", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ w("div", { className: "bd-filters-dialog-box", children: [
      /* @__PURE__ */ w("header", { children: [
        /* @__PURE__ */ r("h3", { children: e.dialogTitle ?? "Filters" }),
        /* @__PURE__ */ r("button", { type: "button", className: "close-btn", onClick: () => c(!1), children: "×" })
      ] }),
      O.map((y) => /* @__PURE__ */ r(Q, { port: y, mode: "filter", label: e.withLabels ? M(y.name) : void 0 }, y.name)),
      /* @__PURE__ */ r("footer", { children: /* @__PURE__ */ r("button", { type: "button", onClick: () => c(!1), children: "Done" }) })
    ] }) }) : null
  ] });
}, yl = (e) => {
  var Oe, Me, Ee, Te, Le, Fe, Ie, De, xe, _e;
  const t = J(), l = ge(e.model), n = j({}), [i, s] = A(""), c = j(""), [d, u] = A(null), f = ((Me = (Oe = e.sort) == null ? void 0 : Oe.options[0]) == null ? void 0 : Me.value) ?? null, [o, a] = A(((Ee = e.sort) == null ? void 0 : Ee.value) ?? f), [h, m] = A(0), [b, v] = A({}), N = j(!1);
  if (!N.current) {
    N.current = !0;
    for (const [g, p] of Object.entries(e.defaults ?? {}))
      n.current[g] = JSON.parse(JSON.stringify(p));
  }
  const O = ((Te = l == null ? void 0 : l.getAttributesDetails) == null ? void 0 : Te.call(l)) ?? {}, S = ((Le = l == null ? void 0 : l.getSystemAttributesDetails) == null ? void 0 : Le.call(l)) ?? {}, $ = (g) => {
    var p;
    return O[g] ?? ((p = e.filterAttributes) != null && p.includes(g) ? S[g] : void 0);
  }, T = t.settings.language ?? "en", M = (g) => {
    var p, k, I;
    return ((p = e.labels) == null ? void 0 : p[g]) ?? X((k = $(g)) == null ? void 0 : k["label-int"], (I = $(g)) == null ? void 0 : I.label, T, g);
  }, { onFilterChange: D, onActiveChange: x } = e, F = Z(() => {
    const g = Xe(n.current), p = c.current.trim(), k = e.searchAttributes ?? [], I = p && k.length ? (R) => {
      const G = new RegExp(Ae(p), "i");
      return k.some((W) => {
        var se;
        return typeof ((se = R[W]) == null ? void 0 : se.value) == "string" && G.test(R[W].value);
      });
    } : null;
    D(!g && !I ? null : (R) => (!I || I(R)) && (!g || g(R))), m((R) => R + 1);
  }, [D, (Fe = e.searchAttributes) == null ? void 0 : Fe.join(",")]);
  L(() => {
    c.current = i;
    const g = setTimeout(F, i ? 300 : 0);
    return () => clearTimeout(g);
  }, [i, F]);
  const C = (g, p) => {
    if (!g || !p)
      return !g && !p;
    if (g.op !== p.op)
      return !1;
    const k = (G) => Array.isArray(G.values) ? G.values.map(String).sort() : null, I = k(g), R = k(p);
    return I || R ? !!I && !!R && I.length === R.length && I.every((G, W) => G === R[W]) : g.value === p.value && g.min === p.min && g.max === p.max;
  }, y = e.defaults ?? {}, E = i.trim() !== "" || [.../* @__PURE__ */ new Set([...Object.keys(n.current), ...Object.keys(y)])].some((g) => !C(n.current[g], y[g])) || o !== f;
  L(() => {
    x == null || x(E);
  }, [E, x]);
  const _ = (e.searchAttributes ?? []).filter((g) => {
    var p;
    return typeof ((p = $(g)) == null ? void 0 : p.type) == "string" && ["varchar", "text"].includes($(g).type);
  }), K = (g) => Qe(n.current, g, $(g) ?? {}, l, F, { placeholder: `${M(g)}...` }), q = (g) => {
    const p = t.registry.resolve({ type: g.type, many: g.many, model: g.model, name: g.name, hint: g.hint });
    return !!(p.filter || p.control && et.has(g.type));
  }, ne = (e.filterAttributes ?? []).filter((g) => $(g) && !_.includes(g) && q(K(g))), H = ne.map((g) => {
    const p = n.current[g], k = (p == null ? void 0 : p.values) ?? [];
    return k.length === 1 ? `${g}:${k[0]}` : null;
  }).filter(Boolean).join(",");
  L(() => {
    var k;
    let g = !1;
    const p = H ? H.split(",") : [];
    for (const I of p) {
      if (b[I] !== void 0)
        continue;
      const [R, G] = I.split(":"), W = (k = $(R)) == null ? void 0 : k.type, se = Array.isArray(W) ? W[0] : W;
      typeof se == "string" && (async () => {
        var je;
        try {
          const Be = await t.resolveModel(se), Ve = re(Be), ye = Ve ? await Be.get(G) : null, Re = (je = ye == null ? void 0 : ye[Ve]) == null ? void 0 : je.value;
          !g && Re != null && v((pt) => ({ ...pt, [I]: String(Re) }));
        } catch {
        }
      })();
    }
    return () => {
      g = !0;
    };
  }, [H]);
  const le = (g) => {
    const p = n.current[g];
    if (!p)
      return "All";
    if (p.op === "contains")
      return `"${p.value}"`;
    const k = p.values ?? (p.value != null ? [p.value] : []);
    return k.length === 0 ? "Set" : k.length === 1 ? b[`${g}:${k[0]}`] ?? "1 selected" : `${k.length} selected`;
  }, mt = (g) => u((p) => p === g ? null : g), bt = () => {
    var g, p;
    u(null);
    for (const k of Object.keys(n.current))
      delete n.current[k];
    s(""), D(null), e.sort && o !== f && (a(f), (p = (g = e.sort).onChange) == null || p.call(g, f)), m((k) => k + 1);
  }, he = (g, p) => {
    u(null), p ? n.current[g] = JSON.parse(JSON.stringify(p)) : delete n.current[g], F();
  }, yt = () => {
    var g, p;
    u(null);
    for (const k of Object.keys(n.current))
      delete n.current[k];
    for (const [k, I] of Object.entries(y))
      n.current[k] = JSON.parse(JSON.stringify(I));
    s(""), F(), e.sort && o !== f && (a(f), (p = (g = e.sort).onChange) == null || p.call(g, f));
  }, ie = [], vt = [...Object.keys(y), ...ne.filter((g) => !y[g])];
  for (const g of vt) {
    const p = n.current[g], k = y[g];
    k && C(p, k) ? ie.push({ key: g, label: ((Ie = e.defaultLabels) == null ? void 0 : Ie[g]) ?? M(g), active: !0, toggle: () => he(g, null) }) : k && !p ? ie.push({ key: g, label: ((De = e.defaultLabels) == null ? void 0 : De[g]) ?? M(g), active: !1, toggle: () => he(g, k) }) : p && ie.push({ key: g, label: `${M(g)}: ${le(g)}`, active: !0, toggle: () => he(g, null) });
  }
  i.trim() && _.length && ie.push({
    key: "~search",
    label: `${_.map(M).join(", ")}: "${i.trim()}"`,
    active: !0,
    toggle: () => s("")
  });
  const { onPillsChange: me } = e;
  if (L(() => {
    !me || !l || me({ pills: ie, differs: E, reset: yt });
  }, [me, l, h, b, i, o, E]), !l)
    return null;
  const be = (g, p, k, I) => /* @__PURE__ */ w("div", { className: `bd-fmenu-row${d === g ? " open" : ""}`, children: [
    /* @__PURE__ */ w("button", { type: "button", className: "bd-fmenu-head", "aria-expanded": d === g, onClick: () => mt(g), children: [
      /* @__PURE__ */ r("span", { className: "bd-fmenu-label", children: p }),
      /* @__PURE__ */ r("span", { className: "bd-fmenu-value", children: k }),
      /* @__PURE__ */ r("span", { className: "bd-fmenu-chevron", children: "›" })
    ] }),
    d === g ? /* @__PURE__ */ r("div", { className: "bd-fmenu-panel", children: I() }) : null
  ] }, g);
  return /* @__PURE__ */ w("div", { className: "bd-fmenu", children: [
    _.length > 0 ? be(
      "search",
      _.map(M).join(", "),
      i.trim() ? `"${i.trim()}"` : "All",
      () => /* @__PURE__ */ r(
        "input",
        {
          className: "bd-fmenu-search",
          type: "text",
          autoFocus: !0,
          value: i,
          placeholder: e.searchPlaceholder ?? `Search ${_.map(M).join(", ")}...`,
          onChange: (g) => s(g.target.value)
        }
      )
    ) : null,
    ne.map((g) => be(
      g,
      M(g),
      le(g),
      () => /* @__PURE__ */ r(Q, { port: K(g), mode: "filter" })
    )),
    (xe = e.sort) != null && xe.options.length ? /* @__PURE__ */ w(Ue, { children: [
      /* @__PURE__ */ r("div", { className: "bd-fmenu-divider" }),
      be(
        "sort",
        e.sort.label ?? "Sort",
        ((_e = e.sort.options.find((g) => g.value === o)) == null ? void 0 : _e.label) ?? String(o),
        () => /* @__PURE__ */ r(Ue, { children: e.sort.options.map((g) => /* @__PURE__ */ w(
          "button",
          {
            type: "button",
            className: `bd-fmenu-option${g.value === o ? " checked" : ""}`,
            onClick: () => {
              var p, k;
              a(g.value), (k = (p = e.sort).onChange) == null || k.call(p, g.value), u(null);
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
    /* @__PURE__ */ r("button", { type: "button", className: "bd-fmenu-head", onClick: bt, children: /* @__PURE__ */ r("span", { className: "bd-fmenu-label", children: e.clearLabel ?? "Clear filters" }) })
  ] });
};
for (const e of Hn)
  tt.register(e);
const vl = "0.1.0";
export {
  gl as BDAddForm,
  hl as BDEditor,
  Q as BDField,
  yl as BDFiltersMenu,
  ml as BDList,
  il as BDObjectView,
  bl as BDSearchBox,
  Hn as BUILTIN_TYPES,
  fl as BlitzUIProvider,
  Jt as ChipsControl,
  te as Picker,
  _t as ReactUIManager,
  P as SaveState,
  vl as VERSION,
  Rt as boolean,
  pn as code,
  Xe as compileConditions,
  dn as currency,
  Cn as date,
  Nn as datetime,
  Lt as draftPort,
  un as duration,
  gn as email,
  $n as enumType,
  Un as file,
  In as fk,
  cn as float,
  Pt as hex,
  qn as htmlText,
  Rn as image,
  rn as integer,
  kt as isEmptyValue,
  yn as json,
  Tt as livePort,
  Zn as location,
  ot as makeDateControl,
  at as makeNumberControl,
  fe as makeTextAreaControl,
  oe as makeTextControl,
  ke as makeUploadControl,
  Ht as markdown,
  Dn as mtm,
  on as percentage,
  Tn as phone,
  Qe as queryPort,
  qt as text,
  an as texti18n,
  tt as ui,
  hn as url,
  jt as useBDStatus,
  B as useBDValue,
  ee as useDraftCommit,
  sl as useSettledList,
  J as useUIManager,
  Bn as user,
  Ut as varchar,
  Yt as varcharMany,
  Pn as video,
  bn as youtube
};
