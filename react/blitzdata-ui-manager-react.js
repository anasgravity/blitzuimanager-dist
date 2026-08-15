var vt = Object.defineProperty;
var pt = (e, t, l) => t in e ? vt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[t] = l;
var B = (e, t, l) => (pt(e, typeof t != "symbol" ? t + "" : t, l), l);
import { BDModel as Ct } from "@blitzdata.ts/core";
import { jsx as r, jsxs as A, Fragment as Pe } from "react/jsx-runtime";
import { useState as w, useRef as _, useEffect as F, useCallback as Z, useMemo as P, createContext as Nt, useContext as At, Component as wt } from "react";
const St = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0, $t = (e) => Array.isArray(e) ? e[0] : e, Ce = (e, t) => e.endsWith("_fk") ? "fk" : e.endsWith("_mtm") ? "mtm" : $t(t), Ue = ["view", "control", "filter", "editor", "default", "empty"];
class kt {
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
    const { type: n, many: i, model: s, name: c, hint: u, use: o, maxLayer: f = 8 } = t, d = { defaultConfig: {}, sources: {} }, a = (y, C, N) => {
      if (!(!y || C > f)) {
        for (const M of Ue) {
          const S = y[M];
          S !== void 0 && (d[M] = S, d.sources[M] = { layer: C, label: N });
        }
        y.defaultConfig && Object.assign(d.defaultConfig, y.defaultConfig);
      }
    }, m = (y, C, N) => {
      const M = this.presets.get(y);
      if (M) {
        const { extends: O, ...E } = M;
        return O && a({ ...this.builtins.get(O), ...this.typeOverlays.get(O) }, C, `${N} (extends '${O}')`), a(E, C + 1, N), !0;
      }
      const S = { ...this.builtins.get(y), ...this.typeOverlays.get(y) };
      return Object.keys(S).length ? (a(S, C + 1, N), !0) : !1;
    };
    a(this.builtins.get(n), 0, "built-in"), i && a(this.builtins.get(`${n}[]`), 0, "built-in (many)"), a(this.typeOverlays.get(n), 1, "defineUI"), i && a(this.typeOverlays.get(`${n}[]`), 1, "defineUI (many)");
    const h = i ? void 0 : this.bindings.get(n);
    if (h && !m(h.preset, 2, h.label ?? `binding '${h.preset}'`) && this.warn(`type '${n}' is bound to '${h.preset}' — not registered, using '${n}' default`), u && !m(u, 4, `preset '${u}'`) && this.warn(`${s ?? "?"}.${c ?? "?"} requests ui '${u}' — not registered, using '${n}' default`), s && c && a(this.attrOverlays.get(`${s}.${c}`), 6, "defineUIFor"), o && (typeof o == "string" ? m(o, 7, `use '${o}'`) || this.warn(`mount requests ui '${o}' — not registered, using '${n}' default`) : typeof o == "function" ? a({ control: o }, 8, "use (control)") : a(o, 8, "use (module)")), l) {
      const y = Ue.filter((C) => d.sources[C]).map((C) => `${C} from ${d.sources[C].label}`);
      l(`${s ?? "?"}.${c ?? n} → ${y.join("; ") || "nothing registered"}`);
    }
    return d;
  }
  mapEntry(t, l) {
    let n = t.get(l);
    return n || (n = {}, t.set(l, n)), n;
  }
}
class Ot {
  constructor() {
    B(this, "typeConfig", {});
    B(this, "attributeConfig", {});
    B(this, "settings", {});
    B(this, "services", {});
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
function Mt(e, t) {
  var i, s, c, u, o, f, d;
  const l = ((u = (c = (s = (i = e._object) == null ? void 0 : i.model) == null ? void 0 : s.getAttributesDetails) == null ? void 0 : c.call(s)) == null ? void 0 : u[e._name]) ?? {}, n = l.type ?? e._type;
  return {
    kind: "live",
    type: Ce(e._name, n),
    many: Array.isArray(l.type) && !e._name.endsWith("_mtm"),
    model: (d = (f = (o = e._object) == null ? void 0 : o.model) == null ? void 0 : f.getName) == null ? void 0 : d.call(f),
    name: e._name,
    attribute: e,
    value: e.value,
    set: (a) => e.edit(a),
    add: (a) => {
      var m;
      return (m = e.add) == null ? void 0 : m.call(e, a);
    },
    remove: (a) => {
      var m;
      return (m = e.remove) == null ? void 0 : m.call(e, a);
    },
    // VALUE stream: the object's remoteChange event — patch in place
    subscribe: (a) => {
      const m = e._object;
      if (typeof (m == null ? void 0 : m.addEventListener) != "function")
        return () => {
        };
      const h = (y) => {
        y && !Object.hasOwn(y, e._name) || a(e.value);
      };
      return m.addEventListener("remoteChange", h), () => m.removeEventListener("remoteChange", h);
    },
    // SAVE-STATE stream: pending | saved | failed — distinct from value
    status: (a) => {
      var m;
      return ((m = e.syncStatus) == null ? void 0 : m.call(e, a)) ?? (() => {
      });
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: t
  };
}
function Et(e, t, l, n, i) {
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
      e[t] = (e[t] ?? []).filter((u) => u !== c);
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: i
  };
}
function He(e, t, l, n, i, s) {
  var c;
  return {
    kind: "query",
    type: Ce(t, l.type),
    many: Array.isArray(l.type) && !t.endsWith("_mtm"),
    model: (c = n == null ? void 0 : n.getName) == null ? void 0 : c.call(n),
    name: t,
    value: e[t],
    set: (u) => {
      u ? e[t] = u : delete e[t], i == null || i();
    },
    attributeDetails: l,
    hint: l.ui ?? l.editor,
    mountConfig: s
  };
}
function Q(e, t, l, n) {
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
function Tt(e) {
  return e !== null && typeof e == "object" && Object.hasOwn(e, "_value") ? e.value : e;
}
function Ne(e) {
  return Array.isArray(e) ? e.map((t) => Tt(t)) : [];
}
function Ae(e) {
  return e.replace(/(\^|\$|\\|\/|\||\*|\+|\-|\.|\?|\(|\)|\[|\]|\{|\})/g, "\\$&");
}
function Ft(e) {
  return new Promise((t, l) => {
    if (window.google && window.google.maps) {
      t();
      return;
    }
    const n = document.createElement("script");
    n.src = `https://maps.googleapis.com/maps/api/js?key=${e}&libraries=places`, n.async = !0, n.defer = !0, n.onload = () => t(), n.onerror = () => l(new Error("Failed to load Google Maps API")), document.head.appendChild(n);
  });
}
async function Lt(e, t, l) {
  if (await Ft(l), !window.google || !window.google.maps)
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
function Ye(e) {
  const t = Object.keys(e);
  return t.length === 0 ? null : (l) => t.every((n) => {
    var i;
    return Dt((i = l[n]) == null ? void 0 : i.value, e[n]);
  });
}
const Ke = (e) => e.map(
  (t) => t && Object.hasOwn(t, "_value") ? t.value : t && Object.hasOwn(t, "_blitzID") ? t._blitzID : t
);
function Dt(e, t) {
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
const Qe = /* @__PURE__ */ new Set(["varchar", "text", "markdown", "email", "url", "tag", "hex", "formula", "youtube"]), ie = (e) => {
  const t = {};
  return e.View !== void 0 && (t.view = e.View), e.Control !== void 0 && (t.control = e.Control), e.Filter !== void 0 && (t.filter = e.Filter), e.default !== void 0 && (t.default = e.default), e.empty !== void 0 && (t.empty = e.empty), e.defaultConfig !== void 0 && (t.defaultConfig = e.defaultConfig), t;
};
class It {
  constructor() {
    B(this, "registry", new kt((t) => this.warn(t)));
    B(this, "config", new Ot());
    B(this, "debug", !1);
    B(this, "resolveModel", (t) => Ct.get(t));
  }
  /** Register a built-in datatype module (the floor layer). */
  register(t) {
    const { type: l, ...n } = t;
    this.registry.register({ type: l, ...ie(n) });
  }
  defineUI(t, l) {
    this.registry.defineUI(t, ie(l));
  }
  defineUIFor(t, l, n) {
    this.registry.defineUIFor(t, l, ie(n));
  }
  definePreset(t, l) {
    const { extends: n, ...i } = l;
    this.registry.definePreset(t, { extends: n, ...ie(i) });
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
const Xe = new It();
function V(e) {
  const [t, l] = w(e.value), n = _(e.value);
  e.value !== n.current && (n.current = e.value, l(e.value)), F(() => {
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
function xt(e) {
  const [t, l] = w(null);
  return F(() => {
    var n;
    return (n = e.status) == null ? void 0 : n.call(e, l);
  }, [e.status]), t;
}
function X(e) {
  const { value: t, commit: l, validate: n, delay: i = 500, flushOnUnmount: s = !0 } = e, [c, u] = w(t), o = _(t), f = _(null), d = _(c);
  d.current = c;
  const a = _(t);
  t !== a.current && (a.current = t, o.current = t, f.current === null && u(t));
  const m = () => {
    f.current !== null && (clearTimeout(f.current), f.current = null);
  }, h = Z((S) => {
    m(), !(n && !n(S)) && S !== o.current && (o.current = S, l(S));
  }, [l, n]), y = Z((S) => {
    u(S), d.current = S, m(), f.current = setTimeout(() => {
      f.current = null, h(S);
    }, i);
  }, [h, i]), C = Z(() => h(d.current), [h]), N = Z(() => {
    m(), u(o.current), d.current = o.current;
  }, []), M = _(C);
  return M.current = s ? C : () => {
  }, F(() => () => M.current(), []), { draft: c, setDraft: y, flush: C, cancel: N };
}
const U = ({ status: e }) => {
  var u;
  const t = xt({ status: e }), l = _(!1), [n, i] = w(!1), s = t == null ? void 0 : t.status;
  if (F(() => {
    if (s && !(s === "completed" && !l.current) && (l.current = !0, i(!0), s === "completed")) {
      const o = setTimeout(() => i(!1), 1e3);
      return () => clearTimeout(o);
    }
  }, [t]), !n || !s || s === "completed" && !l.current)
    return null;
  const c = (u = t == null ? void 0 : t.job) == null ? void 0 : u.message;
  return /* @__PURE__ */ r(
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
}, jt = (e) => {
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
}, se = (e) => {
  const t = e.value, [l, n] = w((t == null ? void 0 : t.min) == null ? "" : String(t.min)), [i, s] = w((t == null ? void 0 : t.max) == null ? "" : String(t.max)), c = _(null), u = (o, f) => {
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
    /* @__PURE__ */ r(
      "input",
      {
        type: "number",
        placeholder: "min",
        value: l,
        onChange: (o) => {
          n(o.target.value), u(o.target.value, i);
        }
      }
    ),
    /* @__PURE__ */ r(
      "input",
      {
        type: "number",
        placeholder: "max",
        value: i,
        onChange: (o) => {
          s(o.target.value), u(l, o.target.value);
        }
      }
    )
  ] });
}, pe = (e) => e === !0 || e === 1 || e === "1", _t = (e) => {
  const [t, l] = V(e), n = pe(t);
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
    /* @__PURE__ */ r(U, { status: e.status })
  ] });
}, Vt = {
  type: "boolean",
  default: () => !1,
  empty: (e) => e == null,
  Control: _t,
  Filter: jt,
  View: ({ value: e }) => /* @__PURE__ */ r("span", { className: `bd-boolean ${pe(e) ? "icon-true" : "icon-false"}`, children: pe(e) ? "✓" : "✗" })
};
function ae(e = {}) {
  const { type: t = "text", pattern: l, serialize: n = (s) => s } = e;
  return (s) => {
    const [c, u] = V(s), [o, f] = w(!1), d = s.config.errorMsg ?? e.errorMsg, a = s.config.pattern ?? l, { draft: m, setDraft: h, flush: y, cancel: C } = X({
      value: c == null ? "" : String(c),
      commit: (N) => u(n(N)),
      validate: (N) => {
        const M = N === "" || !a || a.test(N);
        return f(!M), M;
      }
    });
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-text", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: t,
          value: m,
          placeholder: s.config.placeholder,
          onChange: (N) => h(N.target.value),
          onBlur: y,
          onKeyDown: (N) => {
            N.key === "Enter" && y(), N.key === "Escape" && (C(), N.target.blur());
          }
        }
      ),
      /* @__PURE__ */ r(U, { status: s.status }),
      o && d ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: d }) : null
    ] });
  };
}
const z = (e) => (Array.isArray(e) ? e.length > 0 : e !== "" && e != null) ? e : null, et = (e) => Array.isArray(e) ? Ne(e).map(String).join(", ") : String(e ?? ""), de = ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-text", children: et(e) });
function tt(e, t, l) {
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
}, Bt = {
  type: ["varchar", "tag", "formula"],
  empty: (e) => !e,
  Control: ae({ serialize: z }),
  View: de
}, Rt = {
  type: "hex",
  empty: (e) => !e,
  defaultConfig: { pattern: /^[0-9a-fA-F]*$/, errorMsg: "Hex digits only (0-9, a-f)!" },
  Control: ae({ serialize: z }),
  View: de
}, Pt = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function nt(e) {
  return String(e ?? "").replace(/[&<>"']/g, (t) => Pt[t]);
}
const Ut = /^\s*(javascript|data|vbscript):/i;
function ue(e) {
  const t = String(e ?? "");
  return Ut.test(t) ? "#" : nt(t);
}
const Kt = /^\s*(javascript|data|vbscript):/i, Ge = (e) => Kt.test(e) ? "#" : e;
function ce(e) {
  return e.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (t, l, n) => `<img alt="${l}" src="${Ge(n)}" />`).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (t, l, n) => `<a href="${Ge(n)}">${l}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
function zt(e) {
  const t = nt(e.replace(/\r\n?/g, `
`)).split(`
`), l = [];
  let n = [], i = null, s = [], c = null;
  const u = () => {
    n.length && l.push(`<p>${n.map(ce).join("<br />")}</p>`), n = [];
  }, o = () => {
    i && l.push(`<${i.tag}>${i.items.map((a) => `<li>${ce(a)}</li>`).join("")}</${i.tag}>`), i = null;
  }, f = () => {
    s.length && l.push(`<blockquote>${s.map(ce).join("<br />")}</blockquote>`), s = [];
  }, d = () => {
    u(), o(), f();
  };
  for (const a of t) {
    if (c) {
      /^```/.test(a) ? (l.push(`<pre><code>${c.join(`
`)}</code></pre>`), c = null) : c.push(a);
      continue;
    }
    if (/^```/.test(a)) {
      d(), c = [];
      continue;
    }
    const m = a.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      d(), l.push(`<h${m[1].length}>${ce(m[2])}</h${m[1].length}>`);
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(a)) {
      d(), l.push("<hr />");
      continue;
    }
    const h = a.match(/^&gt;\s?(.*)$/);
    if (h) {
      u(), o(), s.push(h[1]);
      continue;
    }
    const y = a.match(/^\s*[-*]\s+(.*)$/), C = a.match(/^\s*\d+\.\s+(.*)$/);
    if (y || C) {
      u(), f();
      const N = y ? "ul" : "ol";
      (!i || i.tag !== N) && (o(), i = { tag: N, items: [] }), i.items.push((y ?? C)[1]);
      continue;
    }
    if (a.trim() === "") {
      d();
      continue;
    }
    o(), f(), n.push(a);
  }
  return c && l.push(`<pre><code>${c.join(`
`)}</code></pre>`), d(), l.join(`
`);
}
function fe(e, t) {
  return (n) => {
    const [i, s] = V(n), { draft: c, setDraft: u, flush: o, cancel: f } = X({
      value: t ? t(i) : i == null ? "" : String(i),
      commit: (d) => s(e(d, n))
    });
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-textarea", children: [
      /* @__PURE__ */ r(
        "textarea",
        {
          rows: n.config.rows ?? 10,
          value: c,
          placeholder: n.config.placeholder,
          onChange: (d) => u(d.target.value),
          onBlur: o,
          onKeyDown: (d) => {
            d.key === "Escape" && (f(), d.target.blur());
          }
        }
      ),
      /* @__PURE__ */ r(U, { status: n.status })
    ] });
  };
}
const Gt = (e) => {
  const [t, l] = V(e), [n, i] = w(""), s = Ne(t).map(String), c = (o, f, d) => {
    if (e.add && e.remove)
      f !== void 0 && e.add(f), d !== void 0 && e.remove(d);
    else {
      l(o.length ? o : null);
      return;
    }
    l(o);
  }, u = () => {
    const o = n.trim();
    if (!o || s.includes(o)) {
      i("");
      return;
    }
    c([...s, o], o), i("");
  };
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-chips", children: [
    /* @__PURE__ */ r("span", { className: "bd-chips", children: s.map((o) => /* @__PURE__ */ A("span", { className: "bd-chip", children: [
      o,
      /* @__PURE__ */ r("button", { type: "button", className: "bd-chip-remove", onClick: () => c(s.filter((f) => f !== o), void 0, o), children: "×" })
    ] }, o)) }),
    /* @__PURE__ */ r(
      "input",
      {
        value: n,
        placeholder: e.config.placeholder ?? "add a value",
        onChange: (o) => i(o.target.value),
        onKeyDown: (o) => {
          o.key === "Enter" && (o.preventDefault(), u()), o.key === "Escape" && i("");
        },
        onBlur: u
      }
    ),
    /* @__PURE__ */ r(U, { status: e.status })
  ] });
}, Wt = {
  type: "text",
  empty: (e) => !e,
  Control: fe((e) => z(e)),
  View: de
}, Zt = {
  type: "markdown",
  empty: (e) => !e,
  Control: fe((e) => z(e)),
  // renderMarkdown escapes first — the markup below is library-built, never raw input
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-markdown", dangerouslySetInnerHTML: { __html: zt(String(e ?? "")) } })
}, Jt = {
  type: ["varchar[]", "text[]", "tag[]"],
  default: () => [],
  Control: Gt,
  View: de
};
function We(e, t = !0) {
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: t }).format(e).replace(/\./g, "'").replace(/,/g, ".");
}
function qt(e, t) {
  if (!t)
    return We(e);
  try {
    return new Intl.NumberFormat("de-DE", { currency: t, style: "currency" }).format(e).replace(/\./g, "'").replace(/,/g, ".");
  } catch {
    return `${We(e)} ${t}`;
  }
}
function Ht(e) {
  if (e === "" || e === null || e === void 0)
    return "";
  const t = parseFloat(e);
  return isNaN(t) ? String(e) : String(Math.round(t * 1e4) / 1e4);
}
function Yt(e) {
  const t = Math.max(0, Math.floor(e));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor(t % 86400 / 3600),
    m: Math.floor(t % 3600 / 60),
    s: t % 60
  };
}
function Qt(e, t) {
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
const Xt = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
function lt(e) {
  const t = e.match(Xt);
  return t ? t[1] : null;
}
function en(e) {
  if (e.thumbnail)
    return e.thumbnail;
  if (e["tn-oq"])
    return e["tn-oq"];
  const t = e.url ? lt(e.url) : null;
  return t ? `https://img.youtube.com/vi/${t}/hqdefault.jpg` : null;
}
const tn = (e) => {
  const [t, l] = V(e), n = e.config.baseLocale ?? e.settings.language ?? "en", i = t && typeof t == "object" ? t : {}, s = Object.keys(i).filter((a) => a !== n), [c, u] = w(""), o = (a) => {
    const m = Object.fromEntries(Object.entries(a).filter(([h]) => h.trim() !== ""));
    l(Object.keys(m).length > 0 ? m : null);
  }, f = (a, m) => o({ ...i, [a]: m }), d = (a) => {
    const m = { ...i };
    delete m[a], o(m);
  };
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-i18n", children: [
    /* @__PURE__ */ A("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ r("span", { className: "bd-i18n-locale", children: n }),
      /* @__PURE__ */ r("input", { value: i[n] ?? "", onChange: (a) => f(n, a.target.value) }),
      /* @__PURE__ */ r(U, { status: e.status })
    ] }),
    s.map((a) => /* @__PURE__ */ A("div", { className: "bd-i18n-row", children: [
      /* @__PURE__ */ r("span", { className: "bd-i18n-locale", children: a }),
      /* @__PURE__ */ r("input", { value: i[a] ?? "", onChange: (m) => f(a, m.target.value) }),
      /* @__PURE__ */ r("button", { type: "button", onClick: () => d(a), children: "×" })
    ] }, a)),
    /* @__PURE__ */ A("div", { className: "bd-i18n-row bd-i18n-add", children: [
      /* @__PURE__ */ r(
        "input",
        {
          placeholder: "locale (fr, de…)",
          value: c,
          onChange: (a) => u(a.target.value),
          onKeyDown: (a) => {
            a.key === "Enter" && c.trim() && (f(c.trim(), ""), u(""));
          }
        }
      ),
      /* @__PURE__ */ r("button", { type: "button", onClick: () => {
        c.trim() && (f(c.trim(), ""), u(""));
      }, children: "+ locale" })
    ] })
  ] });
}, nn = {
  type: "texti18n",
  empty: (e) => !e || Object.keys(e).length === 0,
  Control: tn,
  View: ({ value: e, settings: t }) => /* @__PURE__ */ r("p", { className: "bd-texti18n bd-text", children: Qt(e ?? {}, t == null ? void 0 : t.language) })
};
function it(e) {
  const t = (n) => n === "" ? null : e ? parseFloat(n) || 0 : parseInt(n) || 0;
  return (n) => {
    const [i, s] = V(n), { draft: c, setDraft: u, flush: o, cancel: f } = X({
      value: i == null ? "" : String(i),
      commit: (a) => s(t(a))
    }), d = n.config.unit ?? (Array.isArray(n.attributeDetails.unit) ? n.attributeDetails.unit[0] : n.attributeDetails.unit);
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-number", children: [
      /* @__PURE__ */ r(
        "input",
        {
          type: "number",
          value: c,
          min: n.config.min,
          max: n.config.max,
          step: e ? "any" : 1,
          placeholder: n.config.placeholder,
          onChange: (a) => u(a.target.value),
          onBlur: o,
          onKeyDown: (a) => {
            a.key === "Enter" && o(), a.key === "Escape" && (f(), a.target.blur());
          }
        }
      ),
      d ? /* @__PURE__ */ r("span", { className: "bd-input-unit", children: d }) : null,
      /* @__PURE__ */ r(U, { status: n.status })
    ] });
  };
}
const st = it(!1), Se = it(!0), ln = {
  type: ["int", "tinyint"],
  empty: (e) => e == null,
  Control: st,
  Filter: se,
  View: ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-number", children: String(e) })
}, sn = {
  type: ["double", "float"],
  empty: (e) => e == null,
  Control: Se,
  Filter: se,
  View: ({ value: e }) => /* @__PURE__ */ r("p", { className: "bd-number", children: String(e) })
}, an = {
  type: "percentage",
  empty: (e) => e == null,
  Control: Se,
  Filter: se,
  View: ({ value: e }) => /* @__PURE__ */ A("p", { className: "bd-number bd-percentage", children: [
    Ht(e),
    " ",
    /* @__PURE__ */ r("span", { className: "bd-percentage-sign", children: "%" })
  ] })
}, rn = {
  type: "currency",
  empty: (e) => e == null,
  Control: Se,
  Filter: se,
  View: ({ value: e, attributeDetails: t, config: l }) => {
    const n = (l == null ? void 0 : l.unit) ?? (Array.isArray(t == null ? void 0 : t.unit) ? t == null ? void 0 : t.unit[0] : t == null ? void 0 : t.unit);
    return /* @__PURE__ */ r("p", { className: "bd-number bd-currency", children: qt(Number(e), n) });
  }
}, cn = {
  type: "duration",
  empty: (e) => e == null,
  defaultConfig: { min: 0, placeholder: "seconds" },
  Control: st,
  Filter: se,
  View: ({ value: e }) => {
    const t = Yt(Number(e) || 0), l = ["d", "h", "m", "s"].filter((n) => t[n] > 0);
    return /* @__PURE__ */ r("p", { className: "bd-duration", children: l.length === 0 ? "0s" : l.map((n) => `${t[n]}${n}`).join(" ") });
  }
}, on = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, at = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, dn = {
  type: "email",
  empty: (e) => !e,
  Control: ae({ type: "email", pattern: on, errorMsg: "Wrong email address!", serialize: z }),
  View: ({ value: e }) => /* @__PURE__ */ r("a", { className: "bd-email", href: `mailto:${e}`, children: String(e) })
}, un = {
  type: "url",
  empty: (e) => !e,
  Control: ae({ type: "url", pattern: at, errorMsg: "Wrong URL!", serialize: z }),
  View: ({ value: e }) => /* @__PURE__ */ r("a", { className: "bd-url", href: ue(e), target: "_blank", rel: "noopener noreferrer", children: String(e) })
}, fn = (e) => {
  const [t, l] = V(e), n = typeof t == "object" && t !== null ? t : {}, i = typeof t == "object" ? (t == null ? void 0 : t.url) ?? "" : t ?? "", { draft: s, setDraft: c, flush: u, cancel: o } = X({
    value: String(i),
    commit: (f) => {
      if (!f) {
        l(null);
        return;
      }
      if (!at.test(f))
        return;
      const d = lt(f), a = n.thumbnail ?? (d ? `https://img.youtube.com/vi/${d}/hqdefault.jpg` : void 0);
      l({ ...n, url: f, ...a ? { thumbnail: a } : {} });
    }
  });
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-text bd-input-youtube", children: [
    /* @__PURE__ */ r(
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
    /* @__PURE__ */ r(U, { status: e.status })
  ] });
}, gn = {
  type: "youtube",
  empty: (e) => !e || typeof e == "object" && !e.url,
  Control: fn,
  View: ({ value: e }) => {
    const t = typeof e == "object" && e !== null ? e : { url: String(e ?? "") }, l = en(t);
    return t.url ? /* @__PURE__ */ r("a", { className: "bd-youtube", href: ue(t.url), target: "_blank", rel: "noopener noreferrer", children: l ? /* @__PURE__ */ r("img", { src: l, alt: "video" }) : String(t.url) }) : null;
  }
}, mn = {
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
}, ve = ["plain", "javascript", "typescript", "python", "php", "ruby", "go", "rust", "java", "c", "cpp", "csharp", "html", "css", "sql", "shell", "json", "yaml", "markdown"], hn = (e) => {
  const [t, l] = V(e), n = (t == null ? void 0 : t.language) ?? null, [i] = w(!1), { draft: s, setDraft: c, flush: u, cancel: o } = X({
    value: (t == null ? void 0 : t.content) ?? "",
    commit: (d) => l(d ? { content: d, language: n } : null)
  }), f = n && !ve.includes(n) ? [...ve, n] : ve;
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-code", children: [
    /* @__PURE__ */ r(
      "select",
      {
        value: n ?? "plain",
        onChange: (d) => {
          const a = d.target.value === "plain" ? null : d.target.value;
          s && l({ content: s, language: a });
        },
        children: f.map((d) => /* @__PURE__ */ r("option", { value: d, children: d }, d))
      }
    ),
    /* @__PURE__ */ r(
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
    /* @__PURE__ */ r(U, { status: e.status }),
    i ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: "Invalid" }) : null
  ] });
}, bn = {
  type: "code",
  empty: (e) => !(e != null && e.content),
  Control: hn,
  View: ({ value: e, config: t }) => e != null && e.content ? /* @__PURE__ */ A("div", { className: `bd-code${e.language ? ` bd-code-${e.language}` : ""}`, children: [
    t != null && t.showLanguage && e.language ? /* @__PURE__ */ r("span", { className: "bd-code-language", children: e.language }) : null,
    /* @__PURE__ */ r("pre", { children: /* @__PURE__ */ r("code", { children: e.content }) })
  ] }) : null
};
function rt(e) {
  const t = (i) => i ? e ? i.replace(" ", "T").slice(0, 16) : i.slice(0, 10) : "", l = (i) => {
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
      /* @__PURE__ */ r(
        "input",
        {
          type: e ? "datetime-local" : "date",
          value: t(s),
          onChange: (u) => c(l(u.target.value))
        }
      ),
      /* @__PURE__ */ r(U, { status: i.status })
    ] });
  };
}
const yn = {
  type: "date",
  empty: (e) => !e,
  Control: rt(!1),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-date", children: String(e) })
}, vn = {
  type: "datetime",
  empty: (e) => !e,
  defaultConfig: { time: !0 },
  Control: rt(!0),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-datetime", children: String(e) })
}, re = ({ items: e, search: t, multiple: l, value: n, onChange: i, placeholder: s, selectedLabels: c, required: u, status: o }) => {
  const [f, d] = w(!1), [a, m] = w(""), [h, y] = w(e ?? []), [C, N] = w(!1), M = _(null), S = _({ ...c });
  F(() => {
    e && y(e);
  }, [e]), F(() => {
    Object.assign(S.current, c);
  }, [c]), F(() => {
    if (!t || !f)
      return;
    let v = !1;
    N(!0);
    const T = setTimeout(() => {
      t(a).then((b) => {
        v || y(b);
      }).catch((b) => console.error("[BlitzUIManagerReact] picker search failed:", (b == null ? void 0 : b.message) ?? b)).finally(() => {
        v || N(!1);
      });
    }, a ? 500 : 0);
    return () => {
      v = !0, clearTimeout(T);
    };
  }, [t, a, f]), F(() => {
    if (!f)
      return;
    const v = (T) => {
      var b;
      (b = M.current) != null && b.contains(T.target) || d(!1);
    };
    return document.addEventListener("mousedown", v), () => document.removeEventListener("mousedown", v);
  }, [f]);
  for (const v of h)
    S.current[v.value] = v.label;
  const O = (v) => v.map((T) => h.find((b) => b.value === T) ?? { value: T, label: S.current[T] ?? T }), E = (v) => {
    if (l) {
      const T = n.includes(v.value) ? n.filter((b) => b !== v.value) : [...n, v.value];
      i(O(T));
    } else
      i([v]), d(!1);
  }, k = () => {
    i([]), d(!1);
  }, x = n.length ? n.map((v) => S.current[v] ?? v).join(", ") : s ?? "Select…", D = t ? h : h.filter((v) => !a || v.label.toLowerCase().includes(a.toLowerCase()));
  return /* @__PURE__ */ A("div", { className: "bd-picker", ref: M, children: [
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        className: `bd-picker-display${n.length ? "" : " bd-picker-placeholder"}`,
        onClick: () => d((v) => !v),
        onKeyDown: (v) => {
          v.key === "Escape" && d(!1);
        },
        children: x
      }
    ),
    /* @__PURE__ */ r(U, { status: o }),
    f ? /* @__PURE__ */ A("div", { className: "bd-picker-menu", children: [
      t || h.length > 7 ? /* @__PURE__ */ r(
        "input",
        {
          className: "bd-picker-search",
          autoFocus: !0,
          value: a,
          placeholder: "Search…",
          onChange: (v) => m(v.target.value),
          onKeyDown: (v) => {
            v.key === "Escape" && d(!1);
          }
        }
      ) : null,
      /* @__PURE__ */ A("ul", { className: "bd-picker-options", role: "listbox", children: [
        !u && !l && n.length ? /* @__PURE__ */ r("li", { className: "bd-picker-clear", onClick: k, children: "Clear" }) : null,
        C ? /* @__PURE__ */ r("li", { className: "bd-picker-loading", children: "Loading…" }) : null,
        !C && D.length === 0 ? /* @__PURE__ */ r("li", { className: "bd-picker-loading", children: "No results" }) : null,
        D.map((v) => /* @__PURE__ */ A(
          "li",
          {
            role: "option",
            "aria-selected": n.includes(v.value),
            className: n.includes(v.value) ? "selected" : "",
            onClick: () => E(v),
            children: [
              l ? /* @__PURE__ */ r("input", { type: "checkbox", readOnly: !0, checked: n.includes(v.value) }) : null,
              v.label
            ]
          },
          v.value
        ))
      ] })
    ] }) : null
  ] });
}, pn = (e) => e.charAt(0).toUpperCase() + e.slice(1), ct = (e) => {
  const t = e.attributeDetails.options ?? e.config.options ?? [], l = e.config.excludeOptions ?? [];
  return t.filter((n) => !l.includes(n)).map((n) => ({ value: n, label: pn(n) }));
}, Cn = (e) => {
  const [t, l] = V(e), n = !!e.config.multiple, i = we(t);
  return /* @__PURE__ */ r(
    re,
    {
      items: ct(e),
      multiple: n,
      value: i,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (s) => {
        const c = s.map((u) => u.value);
        n ? tt(e, i, c) : l(c[0] ?? null);
      }
    }
  );
}, Nn = (e) => {
  const t = e.value, [l, n] = w((t == null ? void 0 : t.values) ?? []);
  return /* @__PURE__ */ r(
    re,
    {
      items: ct(e),
      multiple: !0,
      value: l,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (i) => {
        const s = i.map((c) => c.value);
        n(s), e.onChange(s.length ? { op: "in", values: s } : null);
      }
    }
  );
}, An = {
  type: ["enum", "enum[]"],
  Control: Cn,
  Filter: Nn,
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-enum", children: /* @__PURE__ */ r("p", { children: et(e) }) })
}, wn = [
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
function Sn(e, t, l = !1) {
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
const $n = /^[0-9]{7,14}$/, ot = (e, t) => {
  if (!e)
    return { dial: t, digits: "" };
  const l = e.indexOf("-");
  return l === -1 ? { dial: t, digits: e } : { dial: e.slice(0, l), digits: e.slice(l + 1) };
}, kn = (e) => {
  const [t, l] = V(e), n = e.config.defaultDialCode ?? "+1", { dial: i, digits: s } = ot(t, n), c = P(() => {
    const a = /* @__PURE__ */ new Set();
    return wn.filter((m) => a.has(m.dial) ? !1 : (a.add(m.dial), !0));
  }, []), { draft: u, setDraft: o, flush: f, cancel: d } = X({
    value: s,
    commit: (a) => l(a ? `${i}-${a}` : null),
    validate: (a) => a === "" || $n.test(a)
  });
  return /* @__PURE__ */ A("span", { className: "bd-input bd-input-phone", children: [
    /* @__PURE__ */ r(
      "select",
      {
        value: i,
        onChange: (a) => {
          s && l(`${a.target.value}-${s}`);
        },
        children: c.map((a) => /* @__PURE__ */ A("option", { value: a.dial, children: [
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
        value: u,
        placeholder: e.config.placeholder ?? "phone number",
        onChange: (a) => o(a.target.value.replace(/[^0-9]/g, "")),
        onBlur: f,
        onKeyDown: (a) => {
          a.key === "Enter" && f(), a.key === "Escape" && (d(), a.target.blur());
        }
      }
    ),
    /* @__PURE__ */ r(U, { status: e.status })
  ] });
}, On = {
  type: "phone",
  empty: (e) => !e,
  Control: kn,
  View: ({ value: e }) => {
    const { dial: t, digits: l } = ot(String(e ?? ""), "");
    return /* @__PURE__ */ A("p", { className: "bd-phone", children: [
      t ? `${t} ` : "",
      Sn(l)
    ] });
  }
}, dt = Nt(Xe), sl = dt.Provider;
function J() {
  return At(dt);
}
const oe = (e) => {
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
}, Ze = (e, t) => {
  var i, s;
  const l = ((i = e == null ? void 0 : e._blitzID) == null ? void 0 : i.value) ?? "", n = (t ? (s = e == null ? void 0 : e[t]) == null ? void 0 : s.value : null) ?? l;
  return { value: String(l), label: String(n), obj: e };
};
function $e(e, t) {
  const l = Array.isArray(e.attributeDetails.type) ? e.attributeDetails.type[0] : e.attributeDetails.type, [n, i] = w(null), [s, c] = w({});
  F(() => {
    let f = !1;
    if (l)
      return e.resolveModel(String(l)).then((d) => {
        f || i(d);
      }).catch((d) => console.error("[BlitzUIManagerReact] fk model resolve failed:", (d == null ? void 0 : d.message) ?? d)), () => {
        f = !0;
      };
  }, [l]);
  const u = t.join(",");
  return F(() => {
    if (!n || !t.length)
      return;
    let f = !1;
    const d = oe(n);
    return Promise.all(t.map((a) => n.get(a).catch(() => null))).then((a) => {
      if (f)
        return;
      const m = {};
      for (const h of a) {
        if (!h)
          continue;
        const y = Ze(h, d);
        m[y.value] = y.label;
      }
      c(m);
    }), () => {
      f = !0;
    };
  }, [n, u]), { search: P(() => {
    if (n)
      return async (f) => {
        const d = oe(n), a = f && d ? [[d, "LIKE", `%${f}%`]] : void 0;
        return (await n.list({ conditions: a, limit: e.config.limit ?? 100 })).map((h) => Ze(h, d));
      };
  }, [n, e.config.limit]), labels: s, ready: !!n };
}
const Mn = (e) => {
  var c;
  const [t, l] = V(e), n = t == null || t === "" ? [] : [String(((c = t == null ? void 0 : t._blitzID) == null ? void 0 : c.value) ?? t)], { search: i, labels: s } = $e(e, n);
  return /* @__PURE__ */ r(
    re,
    {
      search: i,
      value: n,
      selectedLabels: s,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (u) => {
        var o;
        return l(((o = u[0]) == null ? void 0 : o.value) ?? null);
      }
    }
  );
}, En = (e) => {
  const [t] = V(e), l = we(t), { search: n, labels: i } = $e(e, l);
  return /* @__PURE__ */ r(
    re,
    {
      search: n,
      multiple: !0,
      value: l,
      selectedLabels: i,
      placeholder: e.config.placeholder,
      status: e.status,
      onChange: (s) => tt(e, l, s.map((c) => c.value))
    }
  );
}, ut = (e) => {
  const t = e.value, [l, n] = w((t == null ? void 0 : t.values) ?? []), { search: i, labels: s } = $e(e, l);
  return /* @__PURE__ */ r(
    re,
    {
      search: i,
      multiple: !0,
      value: l,
      selectedLabels: s,
      placeholder: e.config.placeholder ?? "Any",
      onChange: (c) => {
        const u = c.map((o) => o.value);
        n(u), e.onChange(u.length ? { op: "in", values: u } : null);
      }
    }
  );
}, ft = ({ value: e, attributeDetails: t }) => {
  const l = J(), n = we(e), [i, s] = w({}), c = Array.isArray(t == null ? void 0 : t.type) ? t == null ? void 0 : t.type[0] : t == null ? void 0 : t.type, u = n.join(",");
  return F(() => {
    if (!c || !n.length)
      return;
    let o = !1;
    return (async () => {
      var f;
      try {
        const d = await l.resolveModel(String(c)), a = oe(d);
        if (!a)
          return;
        const m = {};
        for (const h of n) {
          const y = await d.get(h).catch(() => null), C = (f = y == null ? void 0 : y[a]) == null ? void 0 : f.value;
          C != null && (m[h] = String(C));
        }
        !o && Object.keys(m).length && s(m);
      } catch {
      }
    })(), () => {
      o = !0;
    };
  }, [u, c]), /* @__PURE__ */ r("p", { className: "bd-fk", children: n.map((o) => i[o] ?? o).join(", ") });
}, Tn = {
  type: "fk",
  Control: Mn,
  Filter: ut,
  View: ft
}, Fn = {
  type: "mtm",
  default: () => null,
  Control: En,
  Filter: ut,
  View: ft
};
function ke(e) {
  const { accept: t, multiple: l, service: n, commit: i, preview: s } = e;
  return (u) => {
    const [o, f] = V(u), [d, a] = w(!1), [m, h] = w(null), y = _(null), C = u.services[n], N = async (M) => {
      if (M != null && M.length) {
        if (!C) {
          h(`No '${n}' service configured`);
          return;
        }
        a(!0), h(null);
        try {
          const S = [];
          for (const O of Array.from(M))
            S.push(await C(O));
          f(i(S));
        } catch (S) {
          h((S == null ? void 0 : S.message) ?? "Upload failed");
        } finally {
          a(!1), y.current && (y.current.value = "");
        }
      }
    };
    return /* @__PURE__ */ A("span", { className: "bd-input bd-input-upload", children: [
      s && o != null ? /* @__PURE__ */ r(s, { value: o }) : null,
      /* @__PURE__ */ r(
        "input",
        {
          ref: y,
          type: "file",
          accept: t,
          multiple: l,
          disabled: d,
          onChange: (M) => void N(M.target.files)
        }
      ),
      d ? /* @__PURE__ */ r("span", { className: "bd-uploading", children: "Uploading…" }) : null,
      m ? /* @__PURE__ */ r("span", { className: "bd-input-error", children: m }) : null,
      /* @__PURE__ */ r(U, { status: u.status })
    ] });
  };
}
const Ln = (e) => e != null && e.base && typeof e.sd == "string" ? `${e.base}${e.sd.substring(1)}` : null, Je = ({ value: e }) => {
  const t = Ne(Array.isArray(e) ? e : [e]);
  return /* @__PURE__ */ r("span", { className: "bd-image-previews", children: t.map((l, n) => {
    const i = Ln(l);
    return i ? /* @__PURE__ */ r("img", { src: i, alt: "" }, n) : null;
  }) });
}, Dn = {
  type: ["image", "image[]"],
  default: () => [],
  // the service returns ImageRawType; a single image is still stored as an array
  Control: ke({ accept: "image/*", multiple: !0, service: "upload", commit: (e) => e, preview: Je }),
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-image", children: /* @__PURE__ */ r(Je, { value: e }) })
}, In = {
  type: "file",
  Control: ke({ service: "uploadFile", commit: (e) => e[0] }),
  View: ({ value: e }) => {
    const t = typeof e == "string" ? e : e == null ? void 0 : e.url;
    return t ? /* @__PURE__ */ r("p", { children: /* @__PURE__ */ r("a", { className: "bd-file", href: ue(t), target: "_blank", rel: "noopener noreferrer", children: "Link" }) }) : null;
  }
}, xn = {
  type: "video",
  Control: ke({ accept: ".mp4,.m4v,.mov", service: "uploadVideo", commit: (e) => e[0] }),
  View: ({ value: e }) => {
    const t = e == null ? void 0 : e.url;
    return t ? /* @__PURE__ */ r("video", { className: "bd-video", controls: !0, children: /* @__PURE__ */ r("source", { src: ue(t) }) }) : null;
  }
}, jn = [
  { key: "address", label: "Address" },
  { key: "street", label: "Street" },
  { key: "street_number", label: "Nr." },
  { key: "postal_code", label: "ZIP" },
  { key: "city", label: "City" },
  { key: "country", label: "Country" },
  { key: "lat", label: "Lat" },
  { key: "lng", label: "Lng" }
], _n = (e) => {
  const [t, l] = V(e), n = t !== null && typeof t == "object" ? t : {}, i = (s, c) => {
    const u = { ...n, [s]: c }, o = Object.values(u).some((f) => f !== "" && f != null);
    l(o ? u : null);
  };
  return /* @__PURE__ */ A("div", { className: "bd-input bd-input-location", children: [
    jn.map(({ key: s, label: c }) => /* @__PURE__ */ A("label", { className: "bd-location-field", children: [
      /* @__PURE__ */ r("span", { children: c }),
      /* @__PURE__ */ r("input", { value: String(n[s] ?? ""), onChange: (u) => i(s, u.target.value) })
    ] }, s)),
    /* @__PURE__ */ r(U, { status: e.status })
  ] });
}, Vn = ae({ serialize: z }), Bn = ({ value: e, config: t }) => {
  const l = _(null), n = e == null ? void 0 : e.lat, i = e == null ? void 0 : e.lng, s = (t == null ? void 0 : t.apiKey) ?? (t == null ? void 0 : t.googleMapsApiKey);
  return F(() => {
    if (!s || !n || !i || !l.current)
      return;
    let c = !1;
    const u = l.current;
    return Lt(String(n), String(i), s).then((o) => {
      !c && o && u.replaceChildren(o);
    }), () => {
      c = !0, u.replaceChildren();
    };
  }, [n, i, s]), typeof e == "string" ? /* @__PURE__ */ r("p", { className: "bd-location", children: e }) : /* @__PURE__ */ A("div", { className: "bd-location", "data-lat": n, "data-lng": i, children: [
    e != null && e.address ? /* @__PURE__ */ r("p", { className: "bd-location-address", children: e.address }) : null,
    /* @__PURE__ */ r("div", { ref: l, className: "bd-location-map" })
  ] });
}, Rn = {
  type: "location",
  empty: (e) => !e,
  Control: (e) => e.config.apiKey || e.value === null || typeof e.value == "object" ? /* @__PURE__ */ r(_n, { ...e }) : /* @__PURE__ */ r(Vn, { ...e }),
  View: ({ value: e, config: t }) => /* @__PURE__ */ r(Bn, { value: e, config: t })
}, Pn = /^<p id="[^"]*"><br><\/p>$/, Un = {
  type: "htmlText",
  empty: (e) => !e,
  Control: fe((e) => z(Pn.test(e) ? "" : e)),
  // stored HTML is trusted app content, same rule as the vanilla read path
  View: ({ value: e }) => /* @__PURE__ */ r("div", { className: "bd-html", dangerouslySetInnerHTML: { __html: String(e ?? "") } })
}, Kn = [
  Vt,
  Bt,
  Rt,
  Wt,
  Zt,
  Jt,
  nn,
  ln,
  sn,
  an,
  rn,
  cn,
  dn,
  un,
  gn,
  mn,
  bn,
  yn,
  vn,
  An,
  On,
  Tn,
  Fn,
  Dn,
  In,
  xn,
  Rn,
  Un
];
const zn = ({ value: e }) => /* @__PURE__ */ r("span", { className: "bd-fallback", children: typeof e == "object" ? JSON.stringify(e) : String(e) });
class Gn extends wt {
  constructor() {
    super(...arguments);
    B(this, "state", { failed: !1 });
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
const Wn = (e) => (l) => {
  const n = l.value;
  return /* @__PURE__ */ r(
    e,
    {
      ...l,
      value: (n == null ? void 0 : n.value) ?? null,
      onChange: (i) => l.onChange(i == null || i === "" ? null : { op: "contains", value: i })
    }
  );
}, Zn = (e) => e.value !== null && e.value !== void 0 && typeof e.value == "object" ? "json" : e.kind === "draft" ? "varchar" : "text";
function Jn(e, t, l, n) {
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
const qn = ({ View: e, props: t, empty: l }) => {
  var i;
  const [n] = V(t);
  return l(n) ? (i = t.config) != null && i.emptyMsg ? /* @__PURE__ */ r("span", { className: "bd-empty", children: t.config.emptyMsg }) : null : /* @__PURE__ */ r(e, { value: n, attributeDetails: t.attributeDetails, config: t.config, settings: t.settings });
}, Y = ({ attribute: e, port: t, mode: l = "write", use: n, config: i, label: s, className: c }) => {
  const u = J(), [o, f] = w(null), [d, a] = w(8), m = i ? JSON.stringify(i) : "", h = P(() => t ? i ? { ...t, mountConfig: { ...t.mountConfig, ...i } } : t : Mt(e, i), [e, t, m]), y = P(() => n && typeof n == "object" ? ie(n) : n, [n]), C = P(() => u.registry.resolve(
    { type: h.type, many: h.many, model: h.model, name: h.name, hint: h.hint, use: y, maxLayer: d },
    u.debug ? (E) => console.info(`[BlitzUIManagerReact] ${E}`) : void 0
  ), [u, h, y, d]), N = P(() => Jn(h, u, C, f), [h, u, C]), M = () => {
    var x;
    const E = l === "read" ? "view" : l === "filter" ? "filter" : "control", k = ((x = C.sources[E]) == null ? void 0 : x.layer) ?? 0;
    a(k - 1);
  };
  let S = null;
  if (l === "read") {
    const E = C.view ?? zn, k = C.empty ?? St;
    S = /* @__PURE__ */ r(qn, { View: E, props: N, empty: k });
  } else if (l === "filter") {
    let E = C.filter;
    if (!E && C.control && Qe.has(h.type) && (E = Wn(C.control)), !E)
      return null;
    S = /* @__PURE__ */ r(E, { ...N });
  } else {
    let E = C.control;
    if (!E) {
      const k = Zn(h);
      k !== h.type && (u.warn(`No usable UI for type '${h.type}' — falling back to '${k}'`), E = u.registry.resolve({ type: k, model: h.model, name: h.name, maxLayer: 0 }).control);
    }
    if (!E)
      return u.warn(`Editor for type '${h.type}' not supported`), null;
    S = /* @__PURE__ */ r(E, { ...N });
  }
  const O = s === !0 ? Q(N.attributeDetails["label-int"], N.attributeDetails.label, u.settings.language ?? "en", h.name) : s;
  return /* @__PURE__ */ A("div", { className: `bd-field bd-field-${h.type}${c ? ` ${c}` : ""}`, children: [
    O ? /* @__PURE__ */ r("label", { className: "bd-field-label", children: O }) : null,
    /* @__PURE__ */ r(Gn, { onError: M, children: S }, `${l}-${d}`),
    o ? /* @__PURE__ */ r("p", { className: "bd-invalid-msg", children: o }) : null
  ] });
};
function ge(e) {
  const t = J(), l = typeof e == "string", [n, i] = w(l ? null : e);
  return F(() => {
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
function Hn(e, t) {
  var n;
  if (t)
    return t;
  const l = ((n = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : n.call(e)) ?? {};
  return Object.keys(l).filter((i) => !i.startsWith("_") && !i.startsWith("@"));
}
const al = (e) => {
  var N, M, S;
  const t = J(), l = ge(e.model), n = _({}), [i, s] = w(null), [c, u] = w(!1), [o, f] = w(!1), d = P(() => Hn(l, e.attributes), [l, e.attributes]), a = P(() => {
    var E;
    if (!l)
      return [];
    const O = ((E = l.getAttributesDetails) == null ? void 0 : E.call(l)) ?? {};
    return d.map((k) => {
      var b, L;
      const x = O[k] ?? {}, D = Et(n.current, k, x, l, e.config), v = t.registry.resolve({ type: D.type, many: D.many, model: D.model, name: k, hint: D.hint }), T = ((b = e.presetValues) == null ? void 0 : b[k]) ?? x.default ?? ((L = v.default) == null ? void 0 : L.call(v));
      return T !== void 0 && n.current[k] === void 0 && (n.current[k] = T), { ...D, value: n.current[k] };
    });
  }, [l, d]);
  if (F(() => () => {
    n.current = {};
  }, [l]), !l)
    return /* @__PURE__ */ r("div", { className: "bd-addform bd-loading", children: "Loading…" });
  const m = ((N = l.getAttributesDetails) == null ? void 0 : N.call(l)) ?? {}, h = t.settings.language ?? "en", y = (O) => {
    var E, k;
    return Q((E = m[O]) == null ? void 0 : E["label-int"], (k = m[O]) == null ? void 0 : k.label, h, O);
  }, C = async () => {
    var k, x, D;
    s(null);
    const E = (e.requireAll ? d : e.requiredAttributes ?? []).filter((v) => n.current[v] == null);
    if (E.length) {
      s(`Missing required fields: ${E.map(y).join(", ")}`);
      return;
    }
    u(!0);
    try {
      const v = await ((k = e.beforeSubmit) == null ? void 0 : k.call(e, { ...n.current }));
      if (v) {
        s(v);
        return;
      }
      const T = await l.add({ ...n.current });
      if (!T) {
        s("An unexpected error occurred!");
        return;
      }
      (x = e.onSuccess) == null || x.call(e, T), e.onServerSuccess && ((D = T.addEventListener) == null || D.call(T, "syncStatusChange", (b) => {
        var L, j;
        (b == null ? void 0 : b.status) === "completed" ? (L = e.onServerSuccess) == null || L.call(e, T) : (b == null ? void 0 : b.status) === "failed" && s(((j = b == null ? void 0 : b.job) == null ? void 0 : j.message) ?? "Saving failed");
      })), f(!0);
    } catch (v) {
      s((v == null ? void 0 : v.message) ?? "An unexpected error occurred!");
    } finally {
      u(!1);
    }
  };
  return o ? /* @__PURE__ */ r("div", { className: `bd-addform ${((M = l.getName) == null ? void 0 : M.call(l)) ?? ""}`, children: /* @__PURE__ */ r("p", { className: "success-msg", children: e.successMessage ?? "Added successfully." }) }) : /* @__PURE__ */ A("div", { className: `bd-addform ${((S = l.getName) == null ? void 0 : S.call(l)) ?? ""}`, children: [
    a.map((O) => /* @__PURE__ */ r(
      Y,
      {
        port: O,
        mode: "write",
        label: e.withLabels ? y(O.name) : void 0
      },
      O.name
    )),
    i ? /* @__PURE__ */ r("p", { className: "bd-invalid-msg", children: i }) : null,
    /* @__PURE__ */ r("button", { type: "button", className: "add-btn", disabled: c, onClick: () => void C(), children: c ? "…" : e.addButtonLabel ?? "Add" })
  ] });
}, qe = (e) => e != null && typeof e == "object" && "_attributes" in e, rl = ({ src: e, attributes: t, withLabels: l, use: n, config: i }) => {
  var o;
  const s = J(), c = P(() => Array.isArray(e) ? e : qe(e) ? (t ?? Object.keys(e._attributes ?? {}).filter((d) => !d.startsWith("_") && !d.startsWith("@")).filter((d) => {
    var a;
    return ((a = e[d]) == null ? void 0 : a.value) !== void 0;
  })).map((d) => e[d]).filter(Boolean) : e == null ? [] : [e], [e, t]), u = s.settings.language ?? "en";
  return /* @__PURE__ */ r("div", { className: `bd-object-editor${qe(e) ? ` ${((o = e._blitzID) == null ? void 0 : o.value) ?? ""}` : ""}`, children: c.map((f) => {
    var a, m, h, y;
    const d = ((y = (h = (m = (a = f._object) == null ? void 0 : a.model) == null ? void 0 : m.getAttributesDetails) == null ? void 0 : h.call(m)) == null ? void 0 : y[f._name]) ?? {};
    return /* @__PURE__ */ r(
      Y,
      {
        attribute: f,
        mode: "write",
        use: n,
        config: i,
        label: l ? Q(d["label-int"], d.label, u, f._name) : void 0
      },
      f._name
    );
  }) });
}, Yn = ({ object: e, attributes: t, withLabels: l, config: n }) => {
  var o, f, d, a, m, h;
  const i = J(), s = P(() => (t ?? Object.keys((e == null ? void 0 : e._attributes) ?? {})).filter((C) => !C.startsWith("_") && !C.startsWith("@")).filter((C) => {
    var N;
    return ((N = e == null ? void 0 : e[C]) == null ? void 0 : N.value) !== void 0;
  }), [e, t]);
  if (!e)
    return null;
  const c = ((d = (f = (o = e._object) == null ? void 0 : o.model) == null ? void 0 : f.getAttributesDetails) == null ? void 0 : d.call(f)) ?? ((m = (a = e.model) == null ? void 0 : a.getAttributesDetails) == null ? void 0 : m.call(a)) ?? {}, u = i.settings.language ?? "en";
  return /* @__PURE__ */ r("div", { className: `bd-objectview ${((h = e._blitzID) == null ? void 0 : h.value) ?? ""}`, children: s.map((y) => {
    var C, N;
    return /* @__PURE__ */ r(
      Y,
      {
        attribute: e[y],
        mode: "read",
        config: n,
        label: l ? Q((C = c[y]) == null ? void 0 : C["label-int"], (N = c[y]) == null ? void 0 : N.label, u, y) : void 0
      },
      y
    );
  }) });
};
function Qn(e, t) {
  const [l, n] = w([]), [i, s] = w(!1), c = t ? JSON.stringify(t) : "";
  return F(() => {
    if (!e)
      return;
    s(!1);
    const u = e.subscribeToList(t, (o) => {
      n([...o.items ?? []]), o.nextSource || s(!0);
    }, !0);
    return () => {
      u == null || u();
    };
  }, [e, c]), { items: l, settled: i };
}
const cl = (e) => {
  var d;
  const t = ge(e.model), { items: l, settled: n } = Qn(t, e.options), [i, s] = w(1), c = e.objectsPerPage ?? 10, u = P(() => {
    let a = e.filter ? l.filter(e.filter) : [...l];
    return e.sort && a.sort(e.sort), a;
  }, [l, e.filter, e.sort]);
  F(() => {
    s(1);
  }, [e.filter]);
  const o = e.pagination ? Math.max(1, Math.ceil(u.length / c)) : 1, f = e.pagination ? u.slice((i - 1) * c, i * c) : u;
  return !n && l.length === 0 ? /* @__PURE__ */ r("div", { className: "bd-list bd-loading", children: e.loading ?? /* @__PURE__ */ r("span", { className: "spinner", children: "Loading…" }) }) : /* @__PURE__ */ A("div", { className: `bd-list ${((d = t == null ? void 0 : t.getName) == null ? void 0 : d.call(t)) ?? ""}`, children: [
    u.length === 0 && n ? /* @__PURE__ */ r("p", { className: "bd-list-empty", children: e.noResultsMessage ?? "No results." }) : f.map((a) => {
      var m, h;
      return /* @__PURE__ */ r(
        "div",
        {
          className: `card ${((m = a._blitzID) == null ? void 0 : m.value) ?? ""}`,
          onClick: e.onObjectClick ? () => e.onObjectClick(a) : void 0,
          children: e.renderRow ? e.renderRow(a) : /* @__PURE__ */ r(Yn, { object: a, attributes: e.attributes, withLabels: e.withLabels })
        },
        (h = a._blitzID) == null ? void 0 : h.value
      );
    }),
    e.pagination && o > 1 ? /* @__PURE__ */ r("div", { className: "bd-list-pagination", children: Array.from({ length: o }, (a, m) => m + 1).map((a) => /* @__PURE__ */ r(
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
}, Xn = [
  { attribute: "_blitzstamp", label: "Newest", order: "desc" },
  { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
], el = (e, t) => {
  const l = t === "desc" ? -1 : 1;
  return (n, i) => {
    var o, f;
    const s = (o = n[e]) == null ? void 0 : o.value, c = (f = i[e]) == null ? void 0 : f.value;
    return s == null || c == null ? s == null && c == null ? 0 : s == null ? l : -l : (typeof s == "number" && typeof c == "number" ? s - c : String(s).localeCompare(String(c))) * l;
  };
}, ol = (e) => {
  var D, v, T;
  const t = J(), l = ge(e.model), [n, i] = w(""), [s, c] = w(!1), u = _({}), o = _(""), { onFilterChange: f } = e, d = Z(() => {
    const b = Ye(u.current), L = o.current.trim(), j = e.searchAttributes ?? [], K = L && j.length ? (q) => {
      const ee = new RegExp(Ae(L), "i");
      return j.some((H) => {
        var te;
        return typeof ((te = q[H]) == null ? void 0 : te.value) == "string" && ee.test(q[H].value);
      });
    } : null;
    f(!b && !K ? null : (q) => (!K || K(q)) && (!b || b(q)));
  }, [f, (D = e.searchAttributes) == null ? void 0 : D.join(",")]);
  F(() => {
    o.current = n;
    const b = setTimeout(d, n ? 300 : 0);
    return () => clearTimeout(b);
  }, [n, d]);
  const a = e.sortAttributes ?? Xn, [m, h] = w(0), { onSortChange: y } = e;
  F(() => {
    if (!y)
      return;
    const b = a[m];
    y(m === 0 ? null : el(b.attribute, b.order));
  }, [m, y]);
  const C = Z((b) => {
    var j;
    if (!l)
      return [];
    const L = ((j = l.getAttributesDetails) == null ? void 0 : j.call(l)) ?? {};
    return b.map((K) => He(u.current, K, L[K] ?? {}, l, d));
  }, [l, d]), N = P(() => C(e.filterAttributes ?? []), [C, e.filterAttributes]), M = P(() => C(e.dialogFilterAttributes ?? []), [C, e.dialogFilterAttributes]), S = () => {
    for (const b of Object.keys(u.current))
      delete u.current[b];
    i(""), c(!1), d();
  }, O = ((v = l == null ? void 0 : l.getAttributesDetails) == null ? void 0 : v.call(l)) ?? {}, E = t.settings.language ?? "en", k = (b) => {
    var L, j;
    return Q((L = O[b]) == null ? void 0 : L["label-int"], (j = O[b]) == null ? void 0 : j.label, E, b);
  }, x = n.trim() !== "" || Object.keys(u.current).length > 0;
  return /* @__PURE__ */ A("div", { className: "bd-searchbox", children: [
    (T = e.searchAttributes) != null && T.length ? /* @__PURE__ */ r(
      "input",
      {
        className: "bd-searchbox-input",
        type: "search",
        value: n,
        placeholder: e.searchPlaceholder ?? "Search…",
        onChange: (b) => i(b.target.value)
      }
    ) : null,
    N.length ? /* @__PURE__ */ r("div", { className: "bd-searchbox-filters", children: N.map((b) => /* @__PURE__ */ r(Y, { port: b, mode: "filter", label: e.withLabels ? k(b.name) : void 0 }, b.name)) }) : null,
    /* @__PURE__ */ A("div", { className: "bd-searchbox-actions", children: [
      e.onSortChange && a.length ? /* @__PURE__ */ r(
        "select",
        {
          className: "bd-searchbox-sort",
          value: m,
          onChange: (b) => h(Number(b.target.value)),
          children: a.map((b, L) => /* @__PURE__ */ r("option", { value: L, children: b.label }, L))
        }
      ) : null,
      M.length ? /* @__PURE__ */ r("button", { type: "button", className: "bd-searchbox-filters-btn", onClick: () => c(!0), children: e.filtersButtonLabel ?? "Filters" }) : null,
      x ? /* @__PURE__ */ r("button", { type: "button", className: "bd-searchbox-clear", onClick: S, children: e.clearFiltersLabel ?? "Clear" }) : null
    ] }),
    s ? /* @__PURE__ */ r("div", { className: "bd-filters-dialog", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ A("div", { className: "bd-filters-dialog-box", children: [
      /* @__PURE__ */ A("header", { children: [
        /* @__PURE__ */ r("h3", { children: e.dialogTitle ?? "Filters" }),
        /* @__PURE__ */ r("button", { type: "button", className: "close-btn", onClick: () => c(!1), children: "×" })
      ] }),
      M.map((b) => /* @__PURE__ */ r(Y, { port: b, mode: "filter", label: e.withLabels ? k(b.name) : void 0 }, b.name)),
      /* @__PURE__ */ r("footer", { children: /* @__PURE__ */ r("button", { type: "button", onClick: () => c(!1), children: "Done" }) })
    ] }) }) : null
  ] });
}, dl = (e) => {
  var Oe, Me, Ee, Te, Fe, Le, De, Ie, xe, je;
  const t = J(), l = ge(e.model), n = _({}), [i, s] = w(""), c = _(""), [u, o] = w(null), f = ((Me = (Oe = e.sort) == null ? void 0 : Oe.options[0]) == null ? void 0 : Me.value) ?? null, [d, a] = w(((Ee = e.sort) == null ? void 0 : Ee.value) ?? f), [m, h] = w(0), [y, C] = w({}), N = _(!1);
  if (!N.current) {
    N.current = !0;
    for (const [g, p] of Object.entries(e.defaults ?? {}))
      n.current[g] = JSON.parse(JSON.stringify(p));
  }
  const M = ((Te = l == null ? void 0 : l.getAttributesDetails) == null ? void 0 : Te.call(l)) ?? {}, S = ((Fe = l == null ? void 0 : l.getSystemAttributesDetails) == null ? void 0 : Fe.call(l)) ?? {}, O = (g) => {
    var p;
    return M[g] ?? ((p = e.filterAttributes) != null && p.includes(g) ? S[g] : void 0);
  }, E = t.settings.language ?? "en", k = (g) => {
    var p, $, I;
    return ((p = e.labels) == null ? void 0 : p[g]) ?? Q(($ = O(g)) == null ? void 0 : $["label-int"], (I = O(g)) == null ? void 0 : I.label, E, g);
  }, { onFilterChange: x, onActiveChange: D } = e, v = Z(() => {
    const g = Ye(n.current), p = c.current.trim(), $ = e.searchAttributes ?? [], I = p && $.length ? (R) => {
      const G = new RegExp(Ae(p), "i");
      return $.some((W) => {
        var le;
        return typeof ((le = R[W]) == null ? void 0 : le.value) == "string" && G.test(R[W].value);
      });
    } : null;
    x(!g && !I ? null : (R) => (!I || I(R)) && (!g || g(R))), h((R) => R + 1);
  }, [x, (Le = e.searchAttributes) == null ? void 0 : Le.join(",")]);
  F(() => {
    c.current = i;
    const g = setTimeout(v, i ? 300 : 0);
    return () => clearTimeout(g);
  }, [i, v]);
  const T = (g, p) => {
    if (!g || !p)
      return !g && !p;
    if (g.op !== p.op)
      return !1;
    const $ = (G) => Array.isArray(G.values) ? G.values.map(String).sort() : null, I = $(g), R = $(p);
    return I || R ? !!I && !!R && I.length === R.length && I.every((G, W) => G === R[W]) : g.value === p.value && g.min === p.min && g.max === p.max;
  }, b = e.defaults ?? {}, L = i.trim() !== "" || [.../* @__PURE__ */ new Set([...Object.keys(n.current), ...Object.keys(b)])].some((g) => !T(n.current[g], b[g])) || d !== f;
  F(() => {
    D == null || D(L);
  }, [L, D]);
  const j = (e.searchAttributes ?? []).filter((g) => {
    var p;
    return typeof ((p = O(g)) == null ? void 0 : p.type) == "string" && ["varchar", "text"].includes(O(g).type);
  }), K = (g) => He(n.current, g, O(g) ?? {}, l, v, { placeholder: `${k(g)}...` }), q = (g) => {
    const p = t.registry.resolve({ type: g.type, many: g.many, model: g.model, name: g.name, hint: g.hint });
    return !!(p.filter || p.control && Qe.has(g.type));
  }, ee = (e.filterAttributes ?? []).filter((g) => O(g) && !j.includes(g) && q(K(g))), H = ee.map((g) => {
    const p = n.current[g], $ = (p == null ? void 0 : p.values) ?? [];
    return $.length === 1 ? `${g}:${$[0]}` : null;
  }).filter(Boolean).join(",");
  F(() => {
    var $;
    let g = !1;
    const p = H ? H.split(",") : [];
    for (const I of p) {
      if (y[I] !== void 0)
        continue;
      const [R, G] = I.split(":"), W = ($ = O(R)) == null ? void 0 : $.type, le = Array.isArray(W) ? W[0] : W;
      typeof le == "string" && (async () => {
        var _e;
        try {
          const Ve = await t.resolveModel(le), Be = oe(Ve), ye = Be ? await Ve.get(G) : null, Re = (_e = ye == null ? void 0 : ye[Be]) == null ? void 0 : _e.value;
          !g && Re != null && C((yt) => ({ ...yt, [I]: String(Re) }));
        } catch {
        }
      })();
    }
    return () => {
      g = !0;
    };
  }, [H]);
  const te = (g) => {
    const p = n.current[g];
    if (!p)
      return "All";
    if (p.op === "contains")
      return `"${p.value}"`;
    const $ = p.values ?? (p.value != null ? [p.value] : []);
    return $.length === 0 ? "Set" : $.length === 1 ? y[`${g}:${$[0]}`] ?? "1 selected" : `${$.length} selected`;
  }, gt = (g) => o((p) => p === g ? null : g), mt = () => {
    var g, p;
    o(null);
    for (const $ of Object.keys(n.current))
      delete n.current[$];
    s(""), x(null), e.sort && d !== f && (a(f), (p = (g = e.sort).onChange) == null || p.call(g, f)), h(($) => $ + 1);
  }, me = (g, p) => {
    o(null), p ? n.current[g] = JSON.parse(JSON.stringify(p)) : delete n.current[g], v();
  }, ht = () => {
    var g, p;
    o(null);
    for (const $ of Object.keys(n.current))
      delete n.current[$];
    for (const [$, I] of Object.entries(b))
      n.current[$] = JSON.parse(JSON.stringify(I));
    s(""), v(), e.sort && d !== f && (a(f), (p = (g = e.sort).onChange) == null || p.call(g, f));
  }, ne = [], bt = [...Object.keys(b), ...ee.filter((g) => !b[g])];
  for (const g of bt) {
    const p = n.current[g], $ = b[g];
    $ && T(p, $) ? ne.push({ key: g, label: ((De = e.defaultLabels) == null ? void 0 : De[g]) ?? k(g), active: !0, toggle: () => me(g, null) }) : $ && !p ? ne.push({ key: g, label: ((Ie = e.defaultLabels) == null ? void 0 : Ie[g]) ?? k(g), active: !1, toggle: () => me(g, $) }) : p && ne.push({ key: g, label: `${k(g)}: ${te(g)}`, active: !0, toggle: () => me(g, null) });
  }
  i.trim() && j.length && ne.push({
    key: "~search",
    label: `${j.map(k).join(", ")}: "${i.trim()}"`,
    active: !0,
    toggle: () => s("")
  });
  const { onPillsChange: he } = e;
  if (F(() => {
    !he || !l || he({ pills: ne, differs: L, reset: ht });
  }, [he, l, m, y, i, d, L]), !l)
    return null;
  const be = (g, p, $, I) => /* @__PURE__ */ A("div", { className: `bd-fmenu-row${u === g ? " open" : ""}`, children: [
    /* @__PURE__ */ A("button", { type: "button", className: "bd-fmenu-head", "aria-expanded": u === g, onClick: () => gt(g), children: [
      /* @__PURE__ */ r("span", { className: "bd-fmenu-label", children: p }),
      /* @__PURE__ */ r("span", { className: "bd-fmenu-value", children: $ }),
      /* @__PURE__ */ r("span", { className: "bd-fmenu-chevron", children: "›" })
    ] }),
    u === g ? /* @__PURE__ */ r("div", { className: "bd-fmenu-panel", children: I() }) : null
  ] }, g);
  return /* @__PURE__ */ A("div", { className: "bd-fmenu", children: [
    j.length > 0 ? be(
      "search",
      j.map(k).join(", "),
      i.trim() ? `"${i.trim()}"` : "All",
      () => /* @__PURE__ */ r(
        "input",
        {
          className: "bd-fmenu-search",
          type: "text",
          autoFocus: !0,
          value: i,
          placeholder: e.searchPlaceholder ?? `Search ${j.map(k).join(", ")}...`,
          onChange: (g) => s(g.target.value)
        }
      )
    ) : null,
    ee.map((g) => be(
      g,
      k(g),
      te(g),
      () => /* @__PURE__ */ r(Y, { port: K(g), mode: "filter" })
    )),
    (xe = e.sort) != null && xe.options.length ? /* @__PURE__ */ A(Pe, { children: [
      /* @__PURE__ */ r("div", { className: "bd-fmenu-divider" }),
      be(
        "sort",
        e.sort.label ?? "Sort",
        ((je = e.sort.options.find((g) => g.value === d)) == null ? void 0 : je.label) ?? String(d),
        () => /* @__PURE__ */ r(Pe, { children: e.sort.options.map((g) => /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            className: `bd-fmenu-option${g.value === d ? " checked" : ""}`,
            onClick: () => {
              var p, $;
              a(g.value), ($ = (p = e.sort).onChange) == null || $.call(p, g.value), o(null);
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
    /* @__PURE__ */ r("button", { type: "button", className: "bd-fmenu-head", onClick: mt, children: /* @__PURE__ */ r("span", { className: "bd-fmenu-label", children: e.clearLabel ?? "Clear filters" }) })
  ] });
};
for (const e of Kn)
  Xe.register(e);
const ul = "0.1.0";
export {
  al as BDAddForm,
  rl as BDEditor,
  Y as BDField,
  dl as BDFiltersMenu,
  cl as BDList,
  Yn as BDObjectView,
  ol as BDSearchBox,
  Kn as BUILTIN_TYPES,
  sl as BlitzUIProvider,
  Gt as ChipsControl,
  re as Picker,
  It as ReactUIManager,
  U as SaveState,
  ul as VERSION,
  Vt as boolean,
  bn as code,
  Ye as compileConditions,
  rn as currency,
  yn as date,
  vn as datetime,
  Et as draftPort,
  cn as duration,
  dn as email,
  An as enumType,
  In as file,
  Tn as fk,
  sn as float,
  Rt as hex,
  Un as htmlText,
  Dn as image,
  ln as integer,
  St as isEmptyValue,
  mn as json,
  Mt as livePort,
  Rn as location,
  rt as makeDateControl,
  it as makeNumberControl,
  fe as makeTextAreaControl,
  ae as makeTextControl,
  ke as makeUploadControl,
  Zt as markdown,
  Fn as mtm,
  an as percentage,
  On as phone,
  He as queryPort,
  Wt as text,
  nn as texti18n,
  Xe as ui,
  un as url,
  xt as useBDStatus,
  V as useBDValue,
  X as useDraftCommit,
  Qn as useSettledList,
  J as useUIManager,
  Bt as varchar,
  Jt as varcharMany,
  xn as video,
  gn as youtube
};
