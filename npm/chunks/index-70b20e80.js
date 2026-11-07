var vs = Object.defineProperty;
var bs = (e, t, n) => t in e ? vs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ae = (e, t, n) => (bs(e, typeof t != "symbol" ? t + "" : t, n), n);
import { JobStatus as F, blitzstampToDate as ft, blitzstampFromDate as ws, LocalStorageRepository as Es, TextType as mt, BlitzData as pt } from "@blitzdata.ts/core";
const $s = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0, An = (e) => Array.isArray(e) ? e[0] : e, vt = (e, t) => e.endsWith("_fk") ? "fk" : e.endsWith("_mtm") ? "mtm" : An(t), tn = ["view", "control", "filter", "editor", "default", "empty"];
class Ss {
  constructor(t) {
    ae(this, "builtins", /* @__PURE__ */ new Map());
    ae(this, "typeOverlays", /* @__PURE__ */ new Map());
    ae(this, "attrOverlays", /* @__PURE__ */ new Map());
    ae(this, "presets", /* @__PURE__ */ new Map());
    ae(this, "bindings", /* @__PURE__ */ new Map());
    this.warn = t;
  }
  /** Register a built-in datatype module (the floor layer). */
  register(t) {
    const { type: n, ...s } = t;
    for (const o of [n].flat())
      Object.assign(this.mapEntry(this.builtins, o), s);
  }
  /** Merge extra surfaces into a built-in (used to seed edit-mode editors). */
  mergeBuiltin(t, n) {
    Object.assign(this.mapEntry(this.builtins, t), n);
  }
  hasBuiltin(t) {
    return this.builtins.has(t);
  }
  removeBuiltinSurface(t, n) {
    var s;
    (s = this.builtins.get(t)) == null || delete s[n];
  }
  defineUI(t, n) {
    Object.assign(this.mapEntry(this.typeOverlays, t), n);
  }
  defineUIFor(t, n, s) {
    Object.assign(this.mapEntry(this.attrOverlays, `${t}.${n}`), s);
  }
  definePreset(t, n) {
    this.presets.set(t, n);
  }
  getPreset(t) {
    return this.presets.get(t);
  }
  /** Bind a preset to a type — one replaceable slot. null clears it. */
  bindType(t, n, s) {
    n === null ? this.bindings.delete(t) : this.bindings.set(t, { preset: n, label: s });
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
    const { type: s, many: o, model: i, name: r, hint: c, use: a, maxLayer: l = 8 } = t, d = { defaultConfig: {}, sources: {} }, u = (f, m, h) => {
      if (!(!f || m > l)) {
        for (const E of tn) {
          const b = f[E];
          b !== void 0 && (d[E] = b, d.sources[E] = { layer: m, label: h });
        }
        f.defaultConfig && Object.assign(d.defaultConfig, f.defaultConfig);
      }
    }, p = (f, m, h) => {
      const E = this.presets.get(f);
      if (E) {
        const { extends: g, ...v } = E;
        return g && u({ ...this.builtins.get(g), ...this.typeOverlays.get(g) }, m, `${h} (extends '${g}')`), u(v, m + 1, h), !0;
      }
      const b = { ...this.builtins.get(f), ...this.typeOverlays.get(f) };
      return Object.keys(b).length ? (u(b, m + 1, h), !0) : !1;
    };
    u(this.builtins.get(s), 0, "built-in"), o && u(this.builtins.get(`${s}[]`), 0, "built-in (many)"), u(this.typeOverlays.get(s), 1, "defineUI"), o && u(this.typeOverlays.get(`${s}[]`), 1, "defineUI (many)");
    const y = o ? void 0 : this.bindings.get(s);
    if (y && !p(y.preset, 2, y.label ?? `binding '${y.preset}'`) && this.warn(`type '${s}' is bound to '${y.preset}' — not registered, using '${s}' default`), c && !p(c, 4, `preset '${c}'`) && this.warn(`${i ?? "?"}.${r ?? "?"} requests ui '${c}' — not registered, using '${s}' default`), i && r && u(this.attrOverlays.get(`${i}.${r}`), 6, "defineUIFor"), a && (typeof a == "string" ? p(a, 7, `use '${a}'`) || this.warn(`mount requests ui '${a}' — not registered, using '${s}' default`) : typeof a == "function" ? u({ control: a }, 8, "use (control)") : u(a, 8, "use (module)")), n) {
      const f = tn.filter((m) => d.sources[m]).map((m) => `${m} from ${d.sources[m].label}`);
      n(`${i ?? "?"}.${r ?? s} → ${f.join("; ") || "nothing registered"}`);
    }
    return d;
  }
  mapEntry(t, n) {
    let s = t.get(n);
    return s || (s = {}, t.set(n, s)), s;
  }
}
class Cs {
  constructor() {
    ae(this, "typeConfig", {});
    ae(this, "attributeConfig", {});
    ae(this, "settings", {});
    ae(this, "services", {});
  }
  setConfig(t, n) {
    var s;
    Object.assign((s = this.typeConfig)[t] ?? (s[t] = {}), n);
  }
  setConfigFor(t, n, s) {
    var o, i;
    Object.assign((o = this.attributeConfig)[i = `${t}.${n}`] ?? (o[i] = {}), s);
  }
  resolve(t, n, s, o, i) {
    return {
      ...o,
      ...this.typeConfig[t],
      ...n && s ? this.attributeConfig[`${n}.${s}`] : void 0,
      ...i
    };
  }
}
function Je(e, t, n, s) {
  if (typeof (e == null ? void 0 : e[n]) == "string")
    return e[n];
  if (typeof t == "string")
    return t;
  if (t && typeof t == "object") {
    const o = t;
    if (typeof o[n] == "string")
      return o[n];
    if (typeof o.default == "string")
      return o.default;
    const i = Object.values(o).find((r) => typeof r == "string");
    if (i)
      return i;
  }
  return s;
}
function Ls(e) {
  try {
    const t = e == null ? void 0 : e.getDetails;
    return typeof t == "function" ? t.call(e) ?? null : null;
  } catch {
    return null;
  }
}
function _n(e, t, n, s) {
  const o = e, i = o && typeof o == "object" ? o[t] : void 0;
  return i == null ? s : Je(void 0, i, n, s);
}
function Hn(e, t) {
  var n, s, o;
  return ((s = (n = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : n.call(e)) == null ? void 0 : s[t]) ?? ((o = e == null ? void 0 : e.getUserAttributeDetails) == null ? void 0 : o.call(e, t)) ?? {};
}
function st(e) {
  return e !== null && typeof e == "object" && Object.hasOwn(e, "_value") ? e.value : e;
}
function xs(e) {
  let t;
  if (Array.isArray(e))
    t = e;
  else if (typeof e == "string")
    try {
      const n = JSON.parse(e);
      t = Array.isArray(n) ? n : [e];
    } catch {
      t = [e];
    }
  else
    t = [e];
  return t.map((n) => st(n)).filter((n) => n != null && n !== "").map((n) => String(n).split("|")[0]);
}
function De(e) {
  return Array.isArray(e) ? e.map((t) => st(t)) : [];
}
function qt(e) {
  return e.replace(/(\^|\$|\\|\/|\||\*|\+|\-|\.|\?|\(|\)|\[|\]|\{|\})/g, "\\$&");
}
function bt(e, t) {
  const n = new RegExp(qt(t), "i");
  return e.filter((s) => typeof s.label == "string" && n.test(s.label)).sort((s, o) => s.label.length - o.label.length);
}
function In(e) {
  return new Promise((t, n) => {
    if (window.google && window.google.maps) {
      t();
      return;
    }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${e}&libraries=places`, s.async = !0, s.defer = !0, s.onload = () => t(), s.onerror = () => n(new Error("Failed to load Google Maps API")), document.head.appendChild(s);
  });
}
async function ks(e, t, n) {
  if (await In(n), !window.google || !window.google.maps)
    return null;
  const s = { lat: parseFloat(e), lng: parseFloat(t) };
  if (!Number.isFinite(s.lat) || !Number.isFinite(s.lng))
    return null;
  const o = document.createElement("div");
  o.className = "map-container";
  const i = new google.maps.Map(o, { center: s, zoom: 13 });
  return new google.maps.Marker({ map: i, position: s }), o;
}
function Te(e, ...t) {
  const n = t.flatMap((s) => (s ?? "").split(" ")).filter((s) => s !== "" && !e.classList.contains(s));
  return e.classList.add(...n), () => e.classList.remove(...n);
}
function _e(e) {
  e.dispatchEvent(new CustomEvent("bd-editor-done", { bubbles: !0 }));
}
const Ms = new Function("url", "return import(url)");
async function nn(e, t = Ms) {
  const n = await t(e), s = n == null ? void 0 : n.default;
  if (typeof s != "function" && (typeof s != "object" || s === null))
    throw new Error("module must export a DatatypeUI (or control function) as its default export");
  return n;
}
function tt(e, t) {
  var o, i, r, c;
  const n = Hn((o = e._object) == null ? void 0 : o.model, e._name), s = n.type ?? e._type;
  return {
    kind: "live",
    type: vt(e._name, s),
    many: Array.isArray(n.type) && !e._name.endsWith("_mtm"),
    model: (c = (r = (i = e._object) == null ? void 0 : i.model) == null ? void 0 : r.getName) == null ? void 0 : c.call(r),
    name: e._name,
    attribute: e,
    value: e.value,
    set: (a) => e.edit(a),
    add: (a) => {
      var l;
      return (l = e.add) == null ? void 0 : l.call(e, a);
    },
    remove: (a) => {
      var l;
      return (l = e.remove) == null ? void 0 : l.call(e, a);
    },
    // VALUE stream: the object's remoteChange event — patch in place
    subscribe: (a) => {
      const l = e._object;
      if (typeof (l == null ? void 0 : l.addEventListener) != "function")
        return () => {
        };
      const d = (u) => {
        u && !Object.hasOwn(u, e._name) || a(e.value);
      };
      return l.addEventListener("remoteChange", d), () => l.removeEventListener("remoteChange", d);
    },
    // SAVE-STATE stream: pending | saved | failed — distinct from value
    status: (a) => {
      var l;
      return ((l = e.syncStatus) == null ? void 0 : l.call(e, a)) ?? (() => {
      });
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: t
  };
}
function Ts(e, t, n, s, o) {
  var i;
  return {
    kind: "draft",
    type: vt(t, n.type),
    many: Array.isArray(n.type) && !t.endsWith("_mtm"),
    model: (i = s == null ? void 0 : s.getName) == null ? void 0 : i.call(s),
    name: t,
    value: e[t],
    set: (r) => {
      e[t] = r;
    },
    add: (r) => {
      (e[t] ?? (e[t] = [])).push(r);
    },
    remove: (r) => {
      e[t] = (e[t] ?? []).filter((c) => c !== r);
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: o
  };
}
function On(e, t, n, s, o, i) {
  var r;
  return {
    kind: "query",
    type: vt(t, n.type),
    many: Array.isArray(n.type) && !t.endsWith("_mtm"),
    model: (r = s == null ? void 0 : s.getName) == null ? void 0 : r.call(s),
    name: t,
    value: e[t],
    set: (c) => {
      c ? e[t] = c : delete e[t], o == null || o();
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: i
  };
}
function sn(e) {
  const t = {
    _name: e.name,
    _type: e.type,
    get value() {
      return e.value;
    },
    edit: async (n) => {
      await e.set(n), t._committed = n;
    },
    add: (n) => {
      var s;
      return (s = e.add) == null ? void 0 : s.call(e, n);
    },
    remove: (n) => {
      var s;
      return (s = e.remove) == null ? void 0 : s.call(e, n);
    },
    getObject: async () => null,
    getObjects: async () => [],
    syncStatus: () => () => {
    },
    _object: {
      model: {
        getName: () => e.model,
        getAttributesDetails: () => ({ [e.name]: e.attributeDetails }),
        getAttributeDetails: () => e.attributeDetails
      }
    }
  };
  return t;
}
function jn(e) {
  const t = Object.keys(e);
  return t.length === 0 ? null : (n) => t.every((s) => {
    var o;
    return As((o = n[s]) == null ? void 0 : o.value, e[s]);
  });
}
const on = (e) => e.map(
  (t) => t && Object.hasOwn(t, "_value") ? t.value : t && Object.hasOwn(t, "_blitzID") ? t._blitzID : t
);
function As(e, t) {
  switch (t.op) {
    case "contains":
      return typeof e == "string" && !!e.match(new RegExp(qt(String(t.value)), "i"));
    case "eq":
      return Array.isArray(e) ? on(e).includes(t.value) : e == t.value;
    case "between": {
      const n = typeof e == "string" && Number.isNaN(Number(e)) ? new Date(e).getTime() : Number(e);
      if (e == null || Number.isNaN(n))
        return !1;
      const { min: s, max: o } = t;
      return (s == null || n >= s) && (o == null || n <= o);
    }
    case "in": {
      const n = t.values ?? t.value;
      if (!Array.isArray(n) || n.length === 0)
        return !0;
      if (Array.isArray(e)) {
        const s = on(e);
        return n.some((o) => s.includes(o));
      }
      return n.includes(e);
    }
    default:
      return !0;
  }
}
const _s = {
  pending: "Saving…",
  conflict: "Conflict — the server holds a different value. Click for details.",
  failed: "Save failed — the server rejected this change. Click for details."
};
function Nn(e, t) {
  let n = null, s = !1;
  return t((o) => {
    var r;
    if (!o)
      return;
    if (o.status === "completed") {
      if (!s)
        return;
      n == null || n.remove(), n = null;
      return;
    }
    s = !0, n || (n = document.createElement("span"), e.classList.add("bd-has-status"), e.append(n)), n.className = `bd-status-badge bd-status-${o.status}`, n.title = _s[o.status] ?? o.status;
    const i = (r = o.job) == null ? void 0 : r.message;
    n.onclick = i ? (c) => {
      c.stopPropagation(), alert(i);
    } : null;
  });
}
class yt {
  constructor() {
    ae(this, "_stops", []);
    ae(this, "_children", /* @__PURE__ */ new Map());
    ae(this, "_destroyed", !1);
  }
  /** A nested scope owned by `owner` — `release(owner)` destroys just that one. */
  for(t) {
    const n = this._children.get(t);
    if (n && !n._destroyed)
      return n;
    const s = new yt();
    return this._children.set(t, s), s;
  }
  /**
   * Badge `host` with `attribute`'s save-state, holding on to the unsubscribe.
   * A destroyed scope attaches nothing — the render that asked for this badge
   * is already gone (the element is built asynchronously, the grid may have
   * repainted meanwhile), and its subscription would have no owner left.
   */
  attach(t, n) {
    this._destroyed || typeof (n == null ? void 0 : n.syncStatus) != "function" || this._stops.push(Nn(t, (s) => n.syncStatus(s)));
  }
  /** The owner's DOM is being replaced: drop its subscriptions. */
  release(t) {
    var n;
    (n = this._children.get(t)) == null || n.destroy(), this._children.delete(t);
  }
  /** Drop every subscription in this scope, nested ones included. Single-use. */
  destroy() {
    this._destroyed = !0;
    for (const t of this._stops)
      t();
    this._stops = [];
    for (const t of this._children.values())
      t.destroy();
    this._children.clear();
  }
}
const Hs = (e, t) => (n) => {
  var s;
  return e({
    ...n,
    value: (s = n.value) == null ? void 0 : s.value,
    onChange: (o) => n.onChange(o == null || o === "" ? null : { op: t, value: o })
  });
}, Is = /* @__PURE__ */ new Set(["varchar", "text", "markdown", "email", "url", "tag", "hex", "formula", "youtube"]), rn = (e, t) => t && Is.has(e) ? Hs(t, "contains") : void 0, nt = (e) => typeof e == "function" ? e : () => {
};
class Os {
  constructor(t) {
    this.deps = t;
  }
  resolveForPort(t, n) {
    return this.deps.registry.resolve(
      { type: t.type, many: t.many, model: t.model, name: t.name, hint: t.hint, use: n },
      this.deps.isDebug() ? (s) => console.info(`[BlitzUIManager] ${s}`) : void 0
    );
  }
  /** The cascaded config for a port, resolved exactly as mount would. */
  resolveConfig(t, n) {
    return this.deps.config.resolve(
      t.type,
      t.model,
      t.name,
      this.resolveForPort(t, n).defaultConfig,
      t.mountConfig
    );
  }
  isFilterable(t) {
    const n = this.resolveForPort(t);
    return !!(n.filter ?? rn(t.type, n.control));
  }
  /**
   * Filter semantics live here, not just inside mountFiltersForm: an app
   * arranging its own filter UI builds ports and compiles the collected
   * query through the same kernel it mounts with — one reachable handle,
   * no second copy of the rules.
   */
  query(t, n, s, o, i, r) {
    return On(t, n, s, o, i, r);
  }
  compileConditions(t) {
    return jn(t);
  }
  buildCtx(t, n, s) {
    const o = this.deps.config.resolve(t.type, t.model, t.name, s.defaultConfig, t.mountConfig);
    return o.multiple === void 0 && t.many && (o.multiple = !0), {
      host: n,
      value: t.value,
      onChange: (i) => t.set(i),
      add: t.add,
      remove: t.remove,
      // liveness is default-on; config.live === false opts a mass mount out
      subscribe: o.live === !1 ? void 0 : t.subscribe,
      status: t.status,
      invalid: t.invalid,
      resolveModel: this.deps.resolveModel,
      attributeDetails: t.attributeDetails ?? {},
      config: o,
      settings: this.deps.config.settings,
      services: t.services ?? this.deps.config.services,
      model: t.model,
      name: t.name
    };
  }
  async mount(t, n, s, o) {
    var l;
    const i = this.resolveForPort(t, o), r = this.buildCtx(t, n, i);
    if (s === "read") {
      const d = i.view;
      if (!d)
        return () => {
        };
      const u = d(t.attribute ?? sn(t), t.mountConfig);
      if (!u)
        return () => {
        };
      const p = () => {
        var m;
        return t.status && ((m = t.mountConfig) == null ? void 0 : m.status) !== !1 ? Nn(n, t.status) : void 0;
      };
      if (typeof u == "string") {
        n.innerHTML = u;
        const m = p();
        return () => {
          m == null || m(), n.innerHTML = "";
        };
      }
      n.innerHTML = u.html;
      const y = (l = u.hydrate) == null ? void 0 : l.call(u, n), f = p();
      return () => {
        f == null || f(), y == null || y(), n.innerHTML = "";
      };
    }
    if (s === "filter") {
      const d = i.filter ?? rn(t.type, i.control);
      if (!d)
        throw new Error(`type '${t.type}' is not filterable — declare a filter`);
      return nt(await d(r));
    }
    const c = this.writeSurface(t, r, i), a = r.config.readOnly ? async () => (n.innerHTML = "", this.mount(t, n, "read", o)) : void 0;
    if (!c) {
      if (a)
        return a();
      const d = this.writeFloor(t, r);
      if (!d)
        throw new Error("Editor for this attribute type not supported!");
      return nt(await d.run());
    }
    try {
      return nt(await c.run());
    } catch (d) {
      if (console.error(`"${t.name}" UI Error:`, d.stack ?? d.message), c.layer > 0) {
        const p = this.deps.registry.resolve({
          type: t.type,
          many: t.many,
          model: t.model,
          name: t.name,
          maxLayer: c.layer - 1
        }), y = this.writeSurface(t, r, p);
        if (y)
          try {
            return n.innerHTML = "", nt(await y.run());
          } catch (f) {
            console.error(`"${t.name}" UI Error:`, f.stack ?? f.message);
          }
      }
      if (a)
        return a();
      const u = this.writeFloor(t, r);
      if (!u)
        throw d;
      return n.innerHTML = "", nt(await u.run());
    }
  }
  /**
   * Write-mode arbitration: the object-aware `editor` runs only on a live
   * port and only when no MORE specific layer supplied a `control` — so a
   * built-in editor keeps today's edit behavior, while any defineUI /
   * defineUIFor / per-mount control wins in edit AND add alike.
   */
  writeSurface(t, n, s) {
    var a, l;
    const o = ((a = s.sources.editor) == null ? void 0 : a.layer) ?? -1, i = ((l = s.sources.control) == null ? void 0 : l.layer) ?? -1, r = s.control ? { run: () => s.control(n), layer: i } : void 0, c = s.editor ? { run: () => s.editor({ ...n, attribute: t.attribute ?? sn(t) }), layer: o } : void 0;
    return t.kind === "live" ? c && o >= i ? c : r && i > 0 ? r : c ?? r : r && i >= o ? r : c ?? r;
  }
  writeFloor(t, n) {
    const s = t.value !== null && t.value !== void 0 && typeof t.value == "object" ? "json" : t.kind === "draft" ? "varchar" : "text";
    if (s === t.type)
      return;
    this.deps.warn(`No usable UI for type '${t.type}' — falling back to '${s}'`);
    const o = this.deps.registry.resolve({ type: s, model: t.model, name: t.name, maxLayer: 0 });
    return this.writeSurface(t, n, o);
  }
}
function Ne(e) {
  let t;
  const n = () => t ?? (t = e().catch((o) => {
    throw t = void 0, o;
  })), s = async (...o) => (await n()).default(...o);
  return s.preload = n, s;
}
function ht(e) {
  let t;
  const n = () => t ?? (t = e().catch((o) => {
    throw t = void 0, o;
  })), s = (o, i) => {
    let r = null, c = !1, a = null;
    return n().then((l) => {
      var d;
      c || (r = l.default(o, i), a && ((d = r == null ? void 0 : r.handleSyncStatus) == null || d.call(r, ...a), a = null));
    }).catch((l) => console.error("Input chunk failed to load:", (l == null ? void 0 : l.message) ?? l)), {
      destroy: () => {
        var l;
        c = !0, (l = r == null ? void 0 : r.destroy) == null || l.call(r);
      },
      handleSyncStatus: (...l) => {
        var d;
        r ? (d = r.handleSyncStatus) == null || d.call(r, ...l) : a = l;
      }
    };
  };
  return s.preload = n, s;
}
function Pt(e) {
  let t;
  return function(...n) {
    t && clearTimeout(t), t = window.setTimeout(() => e(...n), 500);
  };
}
function wt(e, t, n) {
  let s = -1, o, i = !1;
  const r = () => {
    s > -1 && (clearTimeout(s), s = -1);
    const c = e();
    n && !n(c) || i && c === o || (o = c, i = !0, t == null || t(c));
  };
  return {
    /** Debounced commit for typing feedback (OnChange mode). */
    schedule() {
      s > -1 && clearTimeout(s), s = setTimeout(r, 500);
    },
    /** Commit now, cancelling any pending debounce. Reads the live DOM value. */
    commit() {
      r();
    },
    /** Seed the last-committed value (the initial value) so it isn't re-sent. */
    prime() {
      o = e(), i = !0;
    },
    /** Drop a pending debounce without committing. */
    cancel() {
      s > -1 && (clearTimeout(s), s = -1);
    },
    /** The last committed value (the initial value after prime). Esc restores this. */
    lastValue() {
      return i ? o : void 0;
    }
  };
}
const Re = {
  SAVE: `<svg width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" />
    </svg>`,
  DONE: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path stroke="#12e33c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 12.6111L8.92308 17.5L20 6.5" />
    </svg>`
};
var $e = /* @__PURE__ */ ((e) => (e.OnChange = "change", e.OnFocusOut = "focusout", e.OnSubmit = "submit", e))($e || {});
function Ae(e, t) {
  const {
    trigger: n = $e.OnChange,
    multiple: s,
    label: o,
    placeholder: i,
    iconSvg: r,
    type: c,
    pattern: a,
    errorMsg: l,
    initialValue: d,
    className: u,
    onChange: p
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const y = typeof e == "string" ? document.getElementById(e) : e;
  if (!(y instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const f = wt(
    () => q.value,
    p,
    (C) => !a || a.test(C)
  ), m = s ? $e.OnSubmit : n;
  let h = !1, E = null, b = -1, g = s ? d instanceof Array ? d : typeof d == "string" ? [d] : [] : [];
  const v = Te(y, "bd-text-input", u);
  y.innerHTML = `<div class="container">
        ${o ? `<p class="label">${o}</p>` : ""}
        <input class="input" type="${c || "text"}" ${d && !s ? `value="${d}"` : ""}
            ${i ? `placeholder="${i}"` : ""} />
        ${a ? `<p class="error-msg" style="display: none;">${l ?? "Wrong value!"}</p>` : ""}
        ${r ? `<div class="icon">${r}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${m === $e.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
        ${s ? '<div class="multi-values"></div>' : ""}
    </div>`;
  const $ = y.querySelector(".container"), q = y.querySelector(".input"), S = y.querySelector(".error-msg"), I = y.querySelector(".submit"), O = y.querySelector(".multi-values"), H = y.querySelector(".icon"), j = y.querySelector(".actions"), w = y.querySelector(".sync-status");
  if (r && (q.style.paddingLeft = "34px"), o && (H && (H.style.top = "34px"), j.style.top = "34px"), m !== $e.OnSubmit) {
    f.prime();
    const C = () => {
      const A = !a || a.test(q.value);
      return S && (S.style.display = A ? "none" : ""), A;
    };
    q.addEventListener("input", () => {
      C() && m === $e.OnChange && f.schedule();
    }), q.addEventListener("blur", () => {
      C() && f.commit();
    }), s || q.addEventListener("keydown", (A) => {
      if (A.key === "Escape") {
        f.cancel(), q.value = f.lastValue() ?? "", C(), q.blur();
        return;
      }
      A.key === "Enter" && (C() && f.commit(), _e(y));
    });
  } else
    I && (q.oninput = () => {
      h = !0, q.style.paddingRight = "34px", I.innerHTML = Re.SAVE, I.style.cursor = "pointer", I.style.display = "";
    }, q.onkeyup = (C) => {
      C.key === "Enter" && I.onclick && I.onclick({});
    }, I.onclick = () => {
      h && (!a || a.test(q.value) ? (S && (S.style.display = "none"), p && (h = !1, I.innerHTML = Re.DONE, I.style.cursor = "initial", s ? (g.push(q.value), q.value = "", z(), p(g)) : (p(q.value), _e(y)))) : S && (S.style.display = ""));
    });
  const T = (C) => {
    var A;
    C && (C.status === F.Completed && !E || (E = C.status, b > -1 && (clearTimeout(b), b = -1), w.style.display = "initial", w.style.cursor = "initial", w.onclick = null, C.status === F.Pending ? (w.innerHTML = "&#xe91e;", w.style.color = "#d5d5d5") : C.status === F.Failed ? (w.innerHTML = "&#xe91a;", w.style.color = "#a82e25", (A = C.job) != null && A.message && (w.style.cursor = "pointer", w.onclick = (R) => {
      var K;
      R.stopPropagation(), alert((K = C.job) == null ? void 0 : K.message);
    })) : C.status === F.Conflict ? (w.innerHTML = "&#xe91d;", w.style.color = "#a82e25", w.title = "Conflict") : C.status === F.Completed && (w.innerHTML = "&#xe91c;", w.style.color = "#0ac96a", b = window.setTimeout(() => {
      w.style.display = "none", b = -1;
    }, 1e3))));
  }, z = () => {
    if (O) {
      O.innerHTML = g.map((C) => `<p class="multi-item">${C} <span value="${C}">x</span></p>`).join(`
`);
      for (const C of O.querySelectorAll("span"))
        C.onclick = (A) => {
          g = g.filter((R) => R !== A.currentTarget.getAttribute("value")), p && p(g), z();
        };
    }
  };
  return s && z(), {
    handleSyncStatus: T,
    destroy: () => {
      m !== $e.OnSubmit && !s && f.commit(), $.remove(), v();
    }
  };
}
function Ke(e, t) {
  const {
    trigger: n = $e.OnChange,
    multiple: s,
    label: o,
    placeholder: i,
    iconSvg: r,
    rows: c = 10,
    resize: a = !0,
    initialValue: l,
    className: d,
    onChange: u
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const p = typeof e == "string" ? document.getElementById(e) : e;
  if (!(p instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let y = s ? void 0 : l, f = -1;
  const m = () => {
    f > -1 && (clearTimeout(f), f = -1);
  }, h = u ? (A) => {
    m(), f = setTimeout(() => {
      f = -1, y = A, u(A);
    }, 500);
  } : void 0, E = s ? $e.OnSubmit : n;
  let b = !1, g = null, v = -1, $ = s ? l instanceof Array ? l : typeof l == "string" ? [l] : [] : [];
  const q = Te(p, "bd-textarea-input", d);
  p.innerHTML = `<div class="container">
        ${o ? `<p class="label">${o}</p>` : ""}
        <textarea class="input" ${i ? `placeholder="${i}"` : ""}
            rows="${c.toString()}">${l && !s ? l : ""}</textarea>
        ${r ? `<div class="icon">${r}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${E === $e.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
        ${s ? '<div class="multi-values"></div>' : ""}
    </div>`;
  const S = p.querySelector(".container"), I = p.querySelector(".input"), O = p.querySelector(".submit"), H = p.querySelector(".multi-values"), j = p.querySelector(".icon"), w = p.querySelector(".actions"), T = p.querySelector(".sync-status");
  I.style.resize = a ? "vertical" : "none", r && (I.style.paddingLeft = "34px"), o && (j && (j.style.top = "34px"), w.style.top = "34px"), E !== $e.OnSubmit ? (I.addEventListener(E === $e.OnFocusOut ? "blur" : "input", (A) => {
    const R = A.target.value;
    R !== y && h && h(R);
  }), I.addEventListener("keydown", (A) => {
    A.key === "Escape" && (m(), I.value = typeof y == "string" ? y : "", I.blur());
  })) : O && (I.oninput = () => {
    b = !0, I.style.paddingRight = "34px", O.innerHTML = Re.SAVE, O.style.cursor = "pointer", O.style.display = "";
  }, O.onclick = () => {
    b && u && (b = !1, O.innerHTML = Re.DONE, O.style.cursor = "initial", s ? ($.push(I.value), I.value = "", C(), u($)) : u(I.value));
  });
  const z = (A) => {
    var R;
    A && (A.status === F.Completed && !g || (g = A.status, v > -1 && (clearTimeout(v), v = -1), T.style.display = "initial", T.style.cursor = "initial", T.onclick = null, A.status === F.Pending ? (T.innerHTML = "&#xe91e;", T.style.color = "#d5d5d5") : A.status === F.Failed ? (T.innerHTML = "&#xe91a;", T.style.color = "#a82e25", (R = A.job) != null && R.message && (T.style.cursor = "pointer", T.onclick = (K) => {
      var X;
      K.stopPropagation(), alert((X = A.job) == null ? void 0 : X.message);
    })) : A.status === F.Conflict ? (T.innerHTML = "&#xe91d;", T.style.color = "#a82e25", T.title = "Conflict") : A.status === F.Completed && (T.innerHTML = "&#xe91c;", T.style.color = "#0ac96a", v = window.setTimeout(() => {
      T.style.display = "none", v = -1;
    }, 1e3))));
  }, C = () => {
    if (H) {
      H.innerHTML = $.map((A) => `<p class="multi-item">${A} <span value="${A}">x</span></p>`).join(`
`);
      for (const A of H.querySelectorAll("span"))
        A.onclick = (R) => {
          $ = $.filter((K) => K !== R.currentTarget.getAttribute("value")), u && u($), C();
        };
    }
  };
  return s && C(), {
    handleSyncStatus: z,
    getValue: () => I.value,
    isPending: () => f > -1,
    cancelPending: m,
    destroy: () => {
      S.remove(), q();
    }
  };
}
function Ft(e, t) {
  const { label: n, placeholder: s, initialValue: o, emptyMsg: i, className: r, onChange: c } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const a = typeof e == "string" ? document.getElementById(e) : e;
  if (!(a instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let l = null, d = -1, u = o instanceof Array ? o : typeof o == "string" ? [o] : [];
  const p = Te(a, "bd-text-many-input", r);
  a.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="values"></div>
        <div class="input-container">
            <input class="input" type="text" ${s ? `placeholder="${s}"` : ""} />
            <div class="actions">
                <div class="sync-status blitzicon" style="display: none;"></div>
                <div class="submit"></div>
            </div>
        </div>
    </div>`;
  const y = a.querySelector(".container"), f = a.querySelector(".input"), m = a.querySelector(".submit"), h = a.querySelector(".sync-status"), E = a.querySelector(".values");
  f.onkeyup = (v) => {
    v.key === "Enter" && m.onclick && m.onclick({});
  }, m.onclick = () => {
    if (f.value) {
      if (u.includes(f.value)) {
        f.value = "";
        return;
      }
      u.push(f.value), f.value = "", g(), c && c(u);
    }
  };
  const b = (v) => {
    var $;
    v && (v.status === F.Completed && !l || (l = v.status, d > -1 && (clearTimeout(d), d = -1), h.style.display = "initial", h.style.cursor = "initial", h.onclick = null, v.status === F.Pending ? (h.innerHTML = "&#xe91e;", h.style.color = "#d5d5d5") : v.status === F.Failed ? (h.innerHTML = "&#xe91a;", h.style.color = "#a82e25", ($ = v.job) != null && $.message && (h.style.cursor = "pointer", h.onclick = (q) => {
      var S;
      q.stopPropagation(), alert((S = v.job) == null ? void 0 : S.message);
    })) : v.status === F.Conflict ? (h.innerHTML = "&#xe91d;", h.style.color = "#a82e25", h.title = "Conflict") : v.status === F.Completed && (h.innerHTML = "&#xe91c;", h.style.color = "#0ac96a", d = window.setTimeout(() => {
      h.style.display = "none", d = -1;
    }, 1e3))));
  }, g = () => {
    E.innerHTML = u.length === 0 ? `
            <p class="empty">${i ?? "No items added yet!"}</p>
        ` : u.map((v) => `<div class="value-item">
                <div>${v}</div>
                <div class="remove" value="${v}"></div>
            </div>`).join(`
`);
    for (const v of E.querySelectorAll(".value-item .remove"))
      v.onclick = ($) => {
        u = u.filter((q) => q !== $.currentTarget.getAttribute("value")), c && c(u), g();
      };
  };
  return g(), {
    handleSyncStatus: b,
    destroy: () => {
      y.remove(), p();
    }
  };
}
const Et = (e, t) => {
  typeof (t == null ? void 0 : t.getDraft) == "function" && (e.getDraft = () => t.getDraft()), typeof (t == null ? void 0 : t.getValue) == "function" && (e.getDraft = () => t.getValue()), typeof (t == null ? void 0 : t.isPending) == "function" && (e.isPending = () => t.isPending()), typeof (t == null ? void 0 : t.cancelPending) == "function" && (e.cancelPending = () => t.cancelPending());
}, lt = (e) => async (t) => {
  const n = await e(t.attribute, t.host, t.config), s = () => {
    var o;
    return (o = n == null ? void 0 : n.destroy) == null ? void 0 : o.call(n);
  };
  return Et(s, n), s;
}, ct = (e, t) => (n, s) => {
  const o = e(n, s);
  return o ? t ? { html: o, hydrate: (i) => t(i, n) ?? void 0 } : o : "";
}, Me = (e, t) => (n) => {
  var r;
  const s = e(n.host, {
    ...n.config,
    // a per-mount draft (expand-to-modal handing an unsaved value over) wins
    initialValue: n.config.draft ?? n.value,
    onChange: (c) => n.onChange(c),
    ...t == null ? void 0 : t(n)
  }), o = s.handleSyncStatus ? (r = n.status) == null ? void 0 : r.call(n, s.handleSyncStatus) : void 0, i = () => {
    var c;
    o == null || o(), (c = s.destroy) == null || c.call(s);
  };
  return Et(i, s), i;
}, Oe = (e) => (Array.isArray(e) ? e.length > 0 : e !== "" && e != null) ? e : null, js = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
    <rect stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" x="3" y="5" width="18" height="14" rx="2" />
</svg>`, Ns = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" />
</svg>`, Ds = Me(Ft, ({ onChange: e }) => ({
  onChange: (t) => e(Oe(t))
})), qs = {
  type: ["varchar", "tag", "formula"],
  empty: (e) => !e,
  control: Me(Ae, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Oe(t))
  }))
}, Ps = {
  type: "hex",
  empty: (e) => !e,
  // same validation contract as the hex editor — bad values stop at the door
  defaultConfig: { pattern: /^[0-9a-fA-F]*$/, errorMsg: "Hex digits only (0-9, a-f)!" },
  control: Me(Ae, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Oe(t))
  }))
}, Fs = {
  type: ["varchar[]", "text[]", "tag[]"],
  default: () => [],
  control: Ds
}, Vs = {
  type: ["text", "markdown"],
  empty: (e) => !e,
  // grid 'auto': a value the cell can't show inline (>= modalThreshold)
  // opens the modal directly, shorter ones edit inline with an expand icon
  defaultConfig: { presentation: { grid: "auto", form: "expandable" }, modalThreshold: 100 },
  control: Me(Ke, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Oe(t))
  }))
}, zs = {
  type: "email",
  empty: (e) => !e,
  defaultConfig: { type: "email", iconSvg: js },
  control: Me(Ae, ({ onChange: e }) => ({
    onChange: (t) => e(Oe(t))
  }))
}, Rs = {
  type: ["url", "youtube"],
  empty: (e) => !e,
  defaultConfig: { type: "url", iconSvg: Ns },
  control: Me(Ae, ({ onChange: e }) => ({
    onChange: (t) => e(Oe(t))
  }))
};
function Fe(e, t) {
  const {
    trigger: n = $e.OnChange,
    label: s,
    placeholder: o,
    iconSvg: i,
    min: r,
    max: c,
    float: a,
    initialValue: l,
    className: d,
    onChange: u
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const p = typeof e == "string" ? document.getElementById(e) : e;
  if (!(p instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const y = wt(() => I(g.value), u);
  let f = !1, m = null, h = -1;
  const E = Te(p, "bd-number-input", d);
  p.innerHTML = `<div class="container">
        ${s ? `<p class="label">${s}</p>` : ""}
        <input class="input" type="number" ${o ? `placeholder="${o}"` : ""}
            ${l != null ? `value="${l.toString()}"` : ""}
            ${r != null ? `min="${r.toString()}"` : ""}
            ${c != null ? `max="${c.toString()}"` : ""}
        />
        ${i ? `<div class="icon">${i}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${n === $e.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
    </div>`;
  const b = p.querySelector(".container"), g = p.querySelector(".input"), v = p.querySelector(".submit"), $ = p.querySelector(".icon"), q = p.querySelector(".actions"), S = p.querySelector(".sync-status");
  q.style.right = n === $e.OnSubmit ? "10px" : "32px", i && (g.style.paddingLeft = "34px"), s && ($ && ($.style.top = "34px"), q.style.top = "34px");
  const I = (H) => H === "" ? null : (a ? parseFloat(H) : parseInt(H)) || 0;
  return n !== $e.OnSubmit ? (y.prime(), g.addEventListener("input", () => {
    n === $e.OnChange && y.schedule();
  }), g.addEventListener("blur", () => y.commit()), g.addEventListener("keydown", (H) => {
    if (H.key === "Escape") {
      y.cancel();
      const j = y.lastValue();
      g.value = j != null ? j.toString() : "", g.blur();
      return;
    }
    H.key === "Enter" && (y.commit(), _e(p));
  })) : v && (g.addEventListener("input", () => {
    f = !0, g.style.paddingRight = "34px", v.innerHTML = Re.SAVE, v.style.cursor = "pointer", v.style.display = "";
  }), v.addEventListener("click", () => {
    f && u && (f = !1, v.innerHTML = Re.DONE, v.style.cursor = "initial", u(I(g.value)), _e(p));
  })), {
    handleSyncStatus: (H) => {
      var j;
      H && (H.status === F.Completed && !m || (m = H.status, h > -1 && (clearTimeout(h), h = -1), S.style.display = "initial", S.style.cursor = "initial", S.onclick = null, H.status === F.Pending ? (S.innerHTML = "&#xe91e;", S.style.color = "#d5d5d5") : H.status === F.Failed ? (S.innerHTML = "&#xe91a;", S.style.color = "#a82e25", (j = H.job) != null && j.message && (S.style.cursor = "pointer", S.onclick = (w) => {
        var T;
        w.stopPropagation(), alert((T = H.job) == null ? void 0 : T.message);
      })) : H.status === F.Conflict ? (S.innerHTML = "&#xe91d;", S.style.color = "#a82e25", S.title = "Conflict") : H.status === F.Completed && (S.innerHTML = "&#xe91c;", S.style.color = "#0ac96a", h = window.setTimeout(() => {
        S.style.display = "none", h = -1;
      }, 1e3))));
    },
    destroy: () => {
      n !== $e.OnSubmit && y.commit(), b.remove(), E();
    }
  };
}
const Vt = ({ host: e, value: t, onChange: n, config: s }) => {
  const o = {
    min: (t == null ? void 0 : t.min) ?? null,
    max: (t == null ? void 0 : t.max) ?? null
  }, i = () => n(o.min == null && o.max == null ? null : { op: "between", ...o }), r = document.createElement("div");
  r.className = `bd-filter-range ${s.className ?? ""}`, e.append(r);
  const c = ["min", "max"].map((a) => {
    const l = document.createElement("div");
    return r.append(l), Fe(l, {
      ...s,
      label: void 0,
      placeholder: `${s.label ?? s.placeholder ?? ""} ${a}`.trim(),
      initialValue: o[a] ?? void 0,
      onChange: (d) => {
        o[a] = d, i();
      }
    }).destroy;
  });
  return () => {
    c.forEach((a) => a()), r.remove();
  };
}, Bs = {
  type: ["int", "tinyint"],
  empty: (e) => e == null,
  control: Me(Fe),
  filter: Vt
}, Us = {
  type: ["double", "float", "percentage", "currency"],
  empty: (e) => e == null,
  defaultConfig: { float: !0 },
  control: Me(Fe),
  filter: Vt
}, Ws = {
  type: "duration",
  empty: (e) => e == null,
  control: Me(Fe, ({ config: e }) => ({
    min: e.min ?? 0,
    placeholder: "seconds"
  })),
  filter: Vt
};
function zt(e, t) {
  const { label: n, initialValue: s, className: o, onChange: i } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const r = typeof e == "string" ? document.getElementById(e) : e;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = s === "1" || s === !0, a = null, l = -1;
  const d = Te(r, "bd-boolean-input", o);
  r.innerHTML = `<div class="container">
        <div class="sync-status blitzicon" style="display: none;"></div>
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="input"></div>
    </div>`;
  const u = r.querySelector(".container"), p = r.querySelector(".sync-status"), y = r.querySelector(".input"), f = () => {
    y.className = c ? "input icon-true" : "input icon-false";
  }, m = (h) => {
    var E;
    h && (h.status === F.Completed && !a || (a = h.status, l > -1 && (clearTimeout(l), l = -1), p.style.display = "initial", p.style.cursor = "initial", p.onclick = null, h.status === F.Pending ? (p.innerHTML = "&#xe91e;", p.style.color = "#d5d5d5") : h.status === F.Failed ? (p.innerHTML = "&#xe91a;", p.style.color = "#a82e25", (E = h.job) != null && E.message && (p.style.cursor = "pointer", p.onclick = (b) => {
      var g;
      b.stopPropagation(), alert((g = h.job) == null ? void 0 : g.message);
    })) : h.status === F.Conflict ? (p.innerHTML = "&#xe91d;", p.style.color = "#a82e25", p.title = "Conflict") : h.status === F.Completed && (p.innerHTML = "&#xe91c;", p.style.color = "#0ac96a", l = window.setTimeout(() => {
      p.style.display = "none", l = -1;
    }, 1e3))));
  };
  return y.addEventListener("click", () => {
    c = !c, i && i(c), f(), _e(r);
  }), f(), {
    handleSyncStatus: m,
    destroy: () => {
      u.remove(), d();
    }
  };
}
function it(e, t) {
  const { trigger: n = $e.OnChange, label: s, time: o, initialValue: i, className: r, onChange: c } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const a = typeof e == "string" ? document.getElementById(e) : e;
  if (!(a instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let l = !1, d = null, u = -1;
  const p = Te(a, "bd-date-input", r);
  a.innerHTML = `<div class="container">
        ${s ? `<p class="label">${s}</p>` : ""}
        <input class="input" type="${o ? "datetime-local" : "date"}" ${i ? `value="${i}"` : ""} />
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${n === $e.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
    </div>`;
  const y = a.querySelector(".container"), f = a.querySelector(".input"), m = a.querySelector(".actions"), h = a.querySelector(".submit"), E = a.querySelector(".sync-status");
  m.style.right = n === $e.OnSubmit ? "10px" : "38px", s && (m.style.top = "34px");
  const g = wt(() => {
    let $ = f.value.replace("T", " ");
    return $ && $.split(":").length === 2 && ($ = $ + ":00"), $ || null;
  }, c);
  return n !== $e.OnSubmit ? (g.prime(), f.addEventListener(n === $e.OnFocusOut ? "blur" : "input", () => g.commit()), f.addEventListener("change", () => {
    g.commit(), _e(a);
  }), f.addEventListener("keydown", ($) => {
    $.key === "Enter" && (g.commit(), _e(a));
  })) : h && (f.addEventListener("input", () => {
    l = !0, f.style.paddingRight = "34px", h.innerHTML = Re.SAVE, h.style.cursor = "pointer", h.style.display = "";
  }), h.addEventListener("click", () => {
    l && (l = !1, h.innerHTML = Re.DONE, h.style.cursor = "initial", g.commit(), _e(a));
  })), {
    handleSyncStatus: ($) => {
      var q;
      $ && ($.status === F.Completed && !d || (d = $.status, u > -1 && (clearTimeout(u), u = -1), E.style.display = "initial", E.style.cursor = "initial", E.onclick = null, $.status === F.Pending ? (E.innerHTML = "&#xe91e;", E.style.color = "#d5d5d5") : $.status === F.Failed ? (E.innerHTML = "&#xe91a;", E.style.color = "#a82e25", (q = $.job) != null && q.message && (E.style.cursor = "pointer", E.onclick = (S) => {
        var I;
        S.stopPropagation(), alert((I = $.job) == null ? void 0 : I.message);
      })) : $.status === F.Conflict ? (E.innerHTML = "&#xe91d;", E.style.color = "#a82e25", E.title = "Conflict") : $.status === F.Completed && (E.innerHTML = "&#xe91c;", E.style.color = "#0ac96a", u = window.setTimeout(() => {
        E.style.display = "none", u = -1;
      }, 1e3))));
    },
    destroy: () => {
      n !== $e.OnSubmit && g.commit(), y.remove(), p();
    }
  };
}
function Rt(e, t) {
  const { label: n, baseLocale: s = "en", placeholder: o, initialValue: i, className: r, onChange: c } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const a = typeof e == "string" ? document.getElementById(e) : e;
  if (!(a instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let l = null, d = -1;
  const u = Te(a, "bd-i18n-input", r);
  a.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="rows"></div>
        <div class="foot">
            <span class="add-locale">+ locale</span>
            <div class="sync-status blitzicon" style="display: none;"></div>
        </div>
    </div>`;
  const p = a.querySelector(".container"), y = a.querySelector(".rows"), f = a.querySelector(".add-locale"), m = a.querySelector(".sync-status"), h = () => {
    const S = {};
    for (const I of y.querySelectorAll(".row")) {
      const O = I.querySelector(".locale").value.trim(), H = I.querySelector(".string").value;
      O && (S[O] = H);
    }
    return S;
  }, E = wt(
    () => JSON.stringify(h()),
    c ? (S) => c(JSON.parse(S)) : void 0
  ), b = () => E.schedule(), g = () => {
    E.commit(), _e(a);
  }, v = (S, I, O = !1) => {
    const H = document.createElement("div");
    H.className = O ? "row base" : "row";
    const j = document.createElement("input");
    j.className = "locale", j.placeholder = "en", j.value = S;
    const w = document.createElement("input");
    if (w.className = "string", o && (w.placeholder = o), w.value = I, j.addEventListener("input", b), w.addEventListener("input", b), j.addEventListener("blur", g), w.addEventListener("blur", g), H.append(j, w), !O) {
      const T = document.createElement("span");
      T.className = "remove", T.textContent = "×", T.addEventListener("click", () => {
        H.remove(), g();
      }), H.append(T);
    }
    return y.append(H), w;
  }, $ = i && typeof i == "object" && !Array.isArray(i) ? i : {};
  v(s, $[s] ?? "", !0);
  for (const S of Object.keys($))
    S !== s && v(S, $[S]);
  return E.prime(), f.addEventListener("click", () => {
    v("", "").previousElementSibling.focus();
  }), {
    handleSyncStatus: (S) => {
      var I;
      S && (S.status === F.Completed && !l || (l = S.status, d > -1 && (clearTimeout(d), d = -1), m.style.display = "initial", m.style.cursor = "initial", m.onclick = null, S.status === F.Pending ? (m.innerHTML = "&#xe91e;", m.style.color = "#d5d5d5") : S.status === F.Failed ? (m.innerHTML = "&#xe91a;", m.style.color = "#a82e25", (I = S.job) != null && I.message && (m.style.cursor = "pointer", m.onclick = (O) => {
        var H;
        O.stopPropagation(), alert((H = S.job) == null ? void 0 : H.message);
      })) : S.status === F.Conflict ? (m.innerHTML = "&#xe91d;", m.style.color = "#a82e25", m.title = "Conflict") : S.status === F.Completed && (m.innerHTML = "&#xe91c;", m.style.color = "#0ac96a", d = window.setTimeout(() => {
        m.style.display = "none", d = -1;
      }, 1e3))));
    },
    getValue: h,
    destroy: () => {
      E.commit(), p.remove(), u();
    }
  };
}
const Bt = (e, t) => ({ host: n, value: s, onChange: o, config: i }) => {
  const r = {
    min: (s == null ? void 0 : s.min) ?? null,
    max: (s == null ? void 0 : s.max) ?? null
  }, c = () => o(r.min == null && r.max == null ? null : { op: "between", ...r }), a = (d) => {
    if (d == null)
      return "";
    const u = t(d);
    return `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
  }, l = document.createElement("div");
  l.className = `bd-filter-daterange ${i.className ?? ""}`, n.append(l);
  for (const [d, u] of [["min", "from"], ["max", "to"]]) {
    const p = document.createElement("input");
    p.type = "date", p.title = `${i.label ?? i.placeholder ?? ""} ${u}`.trim(), p.setAttribute("aria-label", p.title), p.value = a(r[d]), p.onchange = () => {
      if (!p.value)
        r[d] = null;
      else {
        const [y, f, m] = p.value.split("-").map(Number);
        r[d] = e(d === "min" ? new Date(y, f - 1, m) : new Date(y, f - 1, m, 23, 59, 59, 999));
      }
      c();
    }, l.append(p);
  }
  return () => l.remove();
}, Js = {
  type: "boolean",
  default: () => !1,
  empty: (e) => e == null,
  control: Me(zt),
  // tristate: any / true / false — a checkbox can't say "either"
  filter: ({ host: e, value: t, onChange: n, config: s }) => {
    const o = document.createElement("select");
    o.className = `bd-filter-boolean ${s.className ?? ""}`;
    const i = t == null ? void 0 : t.value;
    for (const r of ["any", "true", "false"])
      o.append(new Option(
        r === "any" ? s.label ?? s.placeholder ?? "any" : r,
        r,
        !1,
        String(i) === r
      ));
    return o.onchange = () => n(o.value === "any" ? null : { op: "eq", value: o.value === "true" }), e.append(o), () => o.remove();
  }
}, Ks = {
  type: "date",
  empty: (e) => !e,
  control: Me(it),
  filter: Bt((e) => e.getTime(), (e) => new Date(e))
}, Zs = {
  type: "datetime",
  empty: (e) => !e,
  defaultConfig: { time: !0 },
  control: Me(it),
  filter: Bt((e) => e.getTime(), (e) => new Date(e))
}, Ys = {
  type: "blitzstamp",
  empty: (e) => e == null,
  view: ({ value: e }) => e == null ? "" : ft(Number(e)).toLocaleString(),
  filter: Bt(ws, ft)
}, Xs = {
  type: "texti18n",
  empty: (e) => !e || Object.keys(e).length === 0,
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: Me(Rt, ({ onChange: e }) => ({
    onChange: (t) => e(t && Object.keys(t).length > 0 ? t : null)
  }))
}, Qs = {
  type: "json",
  // structured content has no useful inline cell editor — go straight big
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: ({ host: e, value: t, onChange: n, config: s, status: o, invalid: i }) => {
    const r = Ke(e, {
      ...s,
      initialValue: s.draft ?? (t != null ? JSON.stringify(t, null, 2) : void 0),
      onChange: (l) => {
        try {
          i == null || i(null), n(l ? JSON.parse(l) ?? null : null);
        } catch {
          i == null || i("Invalid JSON"), n(null);
        }
      }
    }), c = o == null ? void 0 : o(r.handleSyncStatus), a = () => {
      c == null || c(), r.destroy();
    };
    return Et(a, r), a;
  }
}, Gs = {
  type: "code",
  empty: (e) => !(e != null && e.content),
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: ({ host: e, value: t, onChange: n, config: s, status: o }) => {
    const i = Ke(e, {
      ...s,
      initialValue: s.draft ?? (t == null ? void 0 : t.content),
      onChange: (a) => n(a ? { content: a, language: (t == null ? void 0 : t.language) ?? null } : null)
    }), r = o == null ? void 0 : o(i.handleSyncStatus), c = () => {
      r == null || r(), i.destroy();
    };
    return Et(c, i), c;
  }
};
function $t(e, t) {
  const { label: n, initialPreviewImages: s, multiple: o, className: i, onChange: r } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const c = typeof e == "string" ? document.getElementById(e) : e;
  if (!(c instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let a = s ?? [], l = null, d = -1;
  const u = Te(c, "bd-image-input", i);
  c.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="preview" style="display: none;"></div>
        <input class="input" type="file" accept="image/*" ${o ? 'multiple="true"' : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const p = c.querySelector(".container"), y = c.querySelector(".preview"), f = c.querySelector(".input"), m = c.querySelector(".sync-status");
  f.addEventListener("change", (b) => {
    const g = b.target.files;
    if (r && g) {
      const v = Array.from(g);
      a = v.map(($) => URL.createObjectURL($)), h(), r(v);
    }
  });
  const h = () => {
    y.innerHTML = a.map((b) => `<div class="image" style="background-image: url(${b});"></div>`).join(`
`), y.style.display = a.length > 0 ? "" : "none";
  }, E = (b) => {
    var g;
    b && (b.status === F.Completed && !l || (l = b.status, d > -1 && (clearTimeout(d), d = -1), m.style.display = "initial", m.style.cursor = "initial", m.onclick = null, b.status === F.Pending ? (m.innerHTML = "&#xe91e;", m.style.color = "#d5d5d5") : b.status === F.Failed ? (m.innerHTML = "&#xe91a;", m.style.color = "#a82e25", (g = b.job) != null && g.message && (m.style.cursor = "pointer", m.onclick = (v) => {
      var $;
      v.stopPropagation(), alert(($ = b.job) == null ? void 0 : $.message);
    })) : b.status === F.Conflict ? (m.innerHTML = "&#xe91d;", m.style.color = "#a82e25", m.title = "Conflict") : b.status === F.Completed && (m.innerHTML = "&#xe91c;", m.style.color = "#0ac96a", d = window.setTimeout(() => {
      m.style.display = "none", d = -1;
    }, 1e3))));
  };
  return h(), {
    handleSyncStatus: E,
    destroy: () => {
      p.remove(), u();
    }
  };
}
function Ut(e, t) {
  const { label: n, multiple: s, className: o, onChange: i } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const r = typeof e == "string" ? document.getElementById(e) : e;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = null, a = -1;
  const l = Te(r, "bd-video-input", o);
  r.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <input class="input" type="file" accept=".mp4,.m4v,.mov" ${s ? 'multiple="true"' : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const d = r.querySelector(".container"), u = r.querySelector(".input"), p = r.querySelector(".sync-status");
  return u.addEventListener("change", (f) => {
    const m = f.target.files;
    if (i && m) {
      const h = Array.from(m);
      i(h);
    }
  }), {
    handleSyncStatus: (f) => {
      var m;
      f && (f.status === F.Completed && !c || (c = f.status, a > -1 && (clearTimeout(a), a = -1), p.style.display = "initial", p.style.cursor = "initial", p.onclick = null, f.status === F.Pending ? (p.innerHTML = "&#xe91e;", p.style.color = "#d5d5d5") : f.status === F.Failed ? (p.innerHTML = "&#xe91a;", p.style.color = "#a82e25", (m = f.job) != null && m.message && (p.style.cursor = "pointer", p.onclick = (h) => {
        var E;
        h.stopPropagation(), alert((E = f.job) == null ? void 0 : E.message);
      })) : f.status === F.Conflict ? (p.innerHTML = "&#xe91d;", p.style.color = "#a82e25", p.title = "Conflict") : f.status === F.Completed && (p.innerHTML = "&#xe91c;", p.style.color = "#0ac96a", a = window.setTimeout(() => {
        p.style.display = "none", a = -1;
      }, 1e3))));
    },
    destroy: () => {
      d.remove(), l();
    }
  };
}
function Wt(e, t) {
  const { label: n, multiple: s, className: o, onChange: i } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const r = typeof e == "string" ? document.getElementById(e) : e;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = null, a = -1;
  const l = Te(r, "bd-file-input", o);
  r.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <input class="input" type="file" accept="*" ${s ? "multiple" : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const d = r.querySelector(".container"), u = r.querySelector(".input"), p = r.querySelector(".sync-status");
  return u.addEventListener("change", (f) => {
    const m = f.target.files;
    if (i && m) {
      const h = Array.from(m);
      i(h);
    }
  }), {
    handleSyncStatus: (f) => {
      var m;
      f && (f.status === F.Completed && !c || (c = f.status, a > -1 && (clearTimeout(a), a = -1), p.style.display = "initial", p.style.cursor = "initial", p.onclick = null, f.status === F.Pending ? (p.innerHTML = "&#xe91e;", p.style.color = "#d5d5d5") : f.status === F.Failed ? (p.innerHTML = "&#xe91a;", p.style.color = "#a82e25", (m = f.job) != null && m.message && (p.style.cursor = "pointer", p.onclick = (h) => {
        var E;
        h.stopPropagation(), alert((E = f.job) == null ? void 0 : E.message);
      })) : f.status === F.Conflict ? (p.innerHTML = "&#xe91d;", p.style.color = "#a82e25", p.title = "Conflict") : f.status === F.Completed && (p.innerHTML = "&#xe91c;", p.style.color = "#0ac96a", a = window.setTimeout(() => {
        p.style.display = "none", a = -1;
      }, 1e3))));
    },
    destroy: () => {
      d.remove(), l();
    }
  };
}
const St = (e, t, n) => ({ host: s, onChange: o, config: i, services: r, status: c, model: a, name: l }) => {
  const d = a && l ? { modelName: a, attributeName: l } : void 0, { handleSyncStatus: u, destroy: p } = e(s, {
    ...i,
    onChange: async (f) => {
      if (f.length !== 0) {
        u({ status: F.Pending });
        try {
          const m = [];
          for (const h of f)
            m.push(await r[t](h, d));
          await o(n(m)), u({ status: F.Completed });
        } catch (m) {
          console.error("Upload failed:", (m == null ? void 0 : m.message) ?? m), u({ status: F.Failed });
        }
      }
    }
  }), y = c == null ? void 0 : c(u);
  return () => {
    y == null || y(), p();
  };
}, eo = {
  type: ["image", "image[]"],
  default: () => [],
  control: St($t, "upload", (e) => e)
}, to = {
  type: "video",
  control: St(Ut, "uploadVideo", (e) => e[0])
}, no = {
  type: "file",
  control: St(Wt, "uploadFile", (e) => e[0])
}, so = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function be(e) {
  return String(e ?? "").replace(/[&<>"']/g, (t) => so[t]);
}
class Dn {
  constructor(t) {
    this.html = t;
  }
  toString() {
    return this.html;
  }
}
function fe(e) {
  return new Dn(e);
}
const oo = /^\s*(javascript|data|vbscript):/i;
function qe(e) {
  const t = String(e ?? "");
  return oo.test(t) ? "#" : be(t);
}
function le(e, ...t) {
  return e.reduce((n, s, o) => n + s + (o < t.length ? t[o] instanceof Dn ? t[o].html : be(t[o]) : ""), "");
}
function qn(e, t) {
  const { label: n, className: s, onChange: o } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const i = typeof e == "string" ? document.getElementById(e) : e;
  if (!(i instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let r = null, c = -1;
  const a = Te(i, "bd-pdf-input", s);
  i.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <input class="input" type="file" accept="application/pdf,.pdf" />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const l = i.querySelector(".container"), d = i.querySelector(".input"), u = i.querySelector(".sync-status");
  return d.addEventListener("change", (y) => {
    const f = y.target.files;
    if (o && f) {
      const m = Array.from(f);
      o(m);
    }
  }), {
    handleSyncStatus: (y) => {
      var f;
      y && (y.status === F.Completed && !r || (r = y.status, c > -1 && (clearTimeout(c), c = -1), u.style.display = "initial", u.style.cursor = "initial", u.onclick = null, y.status === F.Pending ? (u.innerHTML = "&#xe91e;", u.style.color = "#d5d5d5") : y.status === F.Failed ? (u.innerHTML = "&#xe91a;", u.style.color = "#a82e25", (f = y.job) != null && f.message && (u.style.cursor = "pointer", u.onclick = (m) => {
        var h;
        m.stopPropagation(), alert((h = y.job) == null ? void 0 : h.message);
      })) : y.status === F.Conflict ? (u.innerHTML = "&#xe91d;", u.style.color = "#a82e25", u.title = "Conflict") : y.status === F.Completed && (u.innerHTML = "&#xe91c;", u.style.color = "#0ac96a", c = window.setTimeout(() => {
        u.style.display = "none", c = -1;
      }, 1e3))));
    },
    destroy: () => {
      l.remove(), a();
    }
  };
}
const ro = (e) => {
  const t = e.search(/[?#]/), n = t === -1 ? e : e.slice(0, t), s = t === -1 ? "" : e.slice(t);
  return (/\.pdf$/i.test(n) ? n.replace(/\.pdf$/i, ".thumbnail.jpg") : `${n}.thumbnail.jpg`) + s;
}, io = (e) => {
  try {
    return decodeURIComponent(new URL(e, "https://x.invalid").pathname.split("/").pop() || e);
  } catch {
    return e;
  }
}, ao = {
  type: "pdf",
  empty: (e) => !e,
  /**
   * Read surface: the thumbnail, linked to the ORIGINAL document. The basic
   * viewer is deliberately the browser's native PDF viewer — page navigation
   * and zoom come free and never depend on pre-rendered page images. A
   * thumbnail that fails to load (record pending/processing/failed) hides
   * itself and the plain document link keeps the PDF reachable.
   */
  view: ({ value: e }) => ({
    html: le`<a class="bd-pdf-doc" href="${fe(qe(e))}" target="_blank" rel="noopener noreferrer">
            <img class="bd-pdf" alt="" loading="lazy" src="${fe(qe(ro(e)))}" />
            <span class="bd-pdf-fallback" hidden>${io(e)}</span>
        </a>`,
    hydrate: (t) => {
      const n = t.querySelector("img.bd-pdf"), s = t.querySelector(".bd-pdf-fallback");
      if (!n || !s)
        return;
      const o = () => {
        n.hidden = !0, s.hidden = !1;
      };
      return n.complete && n.naturalWidth === 0 && o(), n.addEventListener("error", o), () => n.removeEventListener("error", o);
    }
  }),
  // uploads go through the generic file service ({ url } comes back);
  // the committed value is the bare URL string, never the record
  control: St(qn, "uploadFile", (e) => {
    const t = e[0];
    return (typeof t == "string" ? t : t == null ? void 0 : t.url) ?? null;
  })
}, an = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/", It = {
  geocoderUrl: "https://nominatim.openstreetmap.org",
  tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  leafletUrl: `${an}leaflet.js`,
  leafletCssUrl: `${an}leaflet.css`
}, ln = {
  [It.leafletUrl]: "sha384-cxOPjt7s7Iz04uaHJceBmS+qpjv2JkIHNVcuOrM+YHwZOmJGBXI00mdUXEq65HTH",
  [It.leafletCssUrl]: "sha384-sHL9NAb7lN7rfvG5lfHpm643Xkcjzp4jFvuavGOndn6pjVqS6ny56CAt3nsEVT4H"
};
let Pn = null, Fn = !1;
function lo(e) {
  Fn = e === !1, Pn = e ? typeof e == "object" ? e : {} : null;
}
function Jt() {
  return !Fn;
}
function Ge(e) {
  return { ...It, ...Pn ?? {}, ...e && typeof e == "object" ? e : {} };
}
let kt = null;
const cn = (e, t) => new Promise((n, s) => {
  const o = document.createElement(e);
  e === "script" ? o.src = t : (o.rel = "stylesheet", o.href = t), ln[t] && (o.integrity = ln[t], o.crossOrigin = "anonymous"), o.onload = () => n(), o.onerror = () => s(new Error(`Failed to load ${t}`)), document.head.appendChild(o);
});
function co(e = Ge()) {
  var t;
  return (t = window.L) != null && t.map ? Promise.resolve(window.L) : (kt ?? (kt = Promise.all([cn("link", e.leafletCssUrl), cn("script", e.leafletUrl)]).then(() => window.L).catch((n) => {
    throw kt = null, n;
  })), kt);
}
const uo = (e) => e.divIcon({ className: "bd-osm-pin", html: "<span></span>", iconSize: [22, 30], iconAnchor: [11, 30] });
async function Vn(e, t, n, { draggable: s = !1, interactive: o = !0, config: i = Ge() } = {}) {
  const r = await co(i), c = r.map(e, { trackResize: !1, scrollWheelZoom: !1, dragging: o, zoomControl: o, touchZoom: o, doubleClickZoom: o, boxZoom: o, keyboard: o }).setView([t, n], 13);
  r.tileLayer(i.tileUrl, { attribution: i.attribution, maxZoom: 19 }).addTo(c);
  const a = r.marker([t, n], { icon: uo(r), draggable: s }).addTo(c), l = typeof ResizeObserver == "function" ? new ResizeObserver(() => {
    c.invalidateSize(), !o && e.clientWidth && (l == null || l.disconnect());
  }) : null;
  return l == null || l.observe(e), setTimeout(() => c.invalidateSize(), 0), {
    map: c,
    marker: a,
    moveTo: (d, u) => {
      a.setLatLng([d, u]), c.setView([d, u], Math.max(c.getZoom(), 13));
    },
    destroy: () => {
      l == null || l.disconnect(), c.remove();
    }
  };
}
async function po(e, t, n = Ge()) {
  const s = { lat: parseFloat(e), lng: parseFloat(t) };
  if (!Number.isFinite(s.lat) || !Number.isFinite(s.lng))
    return null;
  const o = document.createElement("div");
  return o.className = "map-container bd-osm-map", await Vn(o, s.lat, s.lng, { interactive: !1, config: n }), o;
}
function zn(e) {
  if (!e || e.lat == null || e.lon == null)
    return null;
  const t = e.address ?? {}, n = t.city ?? t.town ?? t.village ?? t.municipality ?? t.hamlet ?? t.suburb ?? "";
  return {
    lat: String(e.lat),
    lng: String(e.lon),
    address: e.display_name ?? "",
    street: t.road ?? t.pedestrian ?? t.footway ?? "",
    street_number: t.house_number ?? "",
    postal_code: t.postcode ?? "",
    city: n,
    admin_locality: n,
    country: t.country ?? ""
  };
}
const fo = 1100;
let dn = 0, un = Promise.resolve();
const Mt = /* @__PURE__ */ new Map(), Rn = (e, t, n) => {
  if (Mt.has(e))
    return Promise.resolve(Mt.get(e));
  const s = un.then(async () => {
    const o = dn + fo - Date.now();
    o > 0 && await new Promise((c) => setTimeout(c, o)), dn = Date.now();
    const i = await fetch(t, { headers: { accept: "application/json" } });
    if (!i.ok)
      throw new Error(`OpenStreetMap answered HTTP ${i.status}`);
    const r = n(await i.json());
    return Mt.set(e, r), r;
  });
  return un = s.catch(() => {
  }), s;
}, Bn = () => typeof document < "u" && document.documentElement.lang || (typeof navigator < "u" ? navigator.language : "") || "en";
function mo(e, { limit: t = 5, config: n = Ge() } = {}) {
  const s = e.trim();
  if (!s)
    return Promise.resolve([]);
  const o = `${n.geocoderUrl}/search?format=jsonv2&addressdetails=1&limit=${t}&accept-language=${encodeURIComponent(Bn())}&q=${encodeURIComponent(s)}`;
  return Rn(`s|${n.geocoderUrl}|${t}|${s.toLowerCase()}`, o, (i) => (Array.isArray(i) ? i : []).map(zn).filter(Boolean));
}
function yo(e, t, { config: n = Ge() } = {}) {
  const s = `${n.geocoderUrl}/reverse?format=jsonv2&addressdetails=1&accept-language=${encodeURIComponent(Bn())}&lat=${e}&lon=${t}`;
  return Rn(`r|${n.geocoderUrl}|${e.toFixed(5)}|${t.toFixed(5)}`, s, (o) => o != null && o.error ? null : zn(o));
}
function Kt(e, t) {
  const { label: n, placeholder: s, initialValue: o, initialExpand: i = !1, className: r, apiKey: c, openStreetMap: a, onChange: l } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const d = typeof e == "string" ? document.getElementById(e) : e;
  if (!(d instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const u = !c, p = typeof o == "string" ? o : "", y = typeof o == "object" ? o : null, f = !!(y != null && y.lat && (y != null && y.lng)), m = l ? Pt(l) : void 0;
  let h = null, E = null, b = null, g = y;
  const v = Te(d, "bd-location-input", r);
  d.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="address-container">
            <input type="text" class="address-input" placeholder="${s ?? (u ? "Search for a place" : "Enter address")}" />
            ${u ? '<button type="button" class="search-btn">Search</button>' : ""}
            <button class="expand-btn ${i ? "expanded" : ""}"></button>
        </div>
        ${u ? '<ul class="osm-results" hidden></ul><p class="osm-status" hidden></p>' : ""}
        <div class="fields-container" style="${i ? "" : "display: none;"}">
            <div class="fields-group">
                <input type="text" class="lat-input" placeholder="Latitude" readonly />
                <input type="text" class="long-input" placeholder="Longitude" readonly />
            </div>
            <div class="fields-group">
                <input type="text" class="street-input" placeholder="Street" />
                <input type="text" class="street-number-input" placeholder="Street Number" />
            </div>
            <div class="fields-group">
                <input type="number" class="zip-input" placeholder="Zip" />
                <input type="text" class="city-input" placeholder="City" />
            </div>
            <div class="fields-group">
                <input type="text" class="country-input" placeholder="Country" />
            </div>
        </div>
        <div class="map-container"${u && !f ? " hidden" : ""}></div>
    </div>`;
  const $ = d.querySelector(".container"), q = d.querySelector(".address-input"), S = d.querySelector(".expand-btn"), I = d.querySelector(".map-container"), O = d.querySelector(".fields-container"), H = d.querySelector(".lat-input"), j = d.querySelector(".long-input"), w = d.querySelector(".street-input"), T = d.querySelector(".street-number-input"), z = d.querySelector(".zip-input"), C = d.querySelector(".city-input"), A = d.querySelector(".country-input");
  S.onclick = () => {
    O.style.display = O.style.display === "none" ? "" : "none", S.classList.toggle("expanded");
  }, w.oninput = () => R("street", w.value), T.oninput = () => R("street_number", T.value), z.oninput = () => R("postal_code", z.value), C.oninput = () => R("city", C.value), A.oninput = () => R("country", A.value);
  const R = (x, B) => {
    !g || !g.lat || !g.lng || (g = {
      ...g,
      [x]: B
    }, m && m(g));
  };
  let K = null;
  const X = Ge(a), me = d.querySelector(".osm-results"), W = d.querySelector(".osm-status"), Q = (x) => {
    W && (W.textContent = x, W.hidden = !x);
  }, J = (x) => {
    H.value = x.lat ?? "", j.value = x.lng ?? "", q.value = x.address ?? "", w.value = x.street ?? "", T.value = x.street_number ?? "", z.value = x.postal_code ?? "", C.value = x.city ?? "", A.value = x.country ?? "";
  };
  let ue = null, pe = !1;
  const ge = async (x, B) => {
    if (I.hidden = !1, ue && await ue.catch(() => {
    }), K) {
      K.moveTo(x, B);
      return;
    }
    ue = V(x, B), await ue;
  }, V = async (x, B) => {
    const Z = await Vn(I, x, B, { draggable: !0, config: X });
    if (pe) {
      Z.destroy();
      return;
    }
    K = Z, K.marker.on("dragend", async () => {
      const G = K.marker.getLatLng(), se = G.lat.toFixed(6), he = G.lng.toFixed(6);
      g = { ...g ?? {}, lat: se, lng: he }, H.value = se, j.value = he;
      try {
        const we = await yo(G.lat, G.lng, { config: X });
        g = we ? { ...we, lat: se, lng: he } : { lat: se, lng: he }, J(g), Q(we ? "" : "No address here; the point is kept on its own.");
      } catch {
        g = { lat: se, lng: he }, J(g), Q("OpenStreetMap did not answer; the point is kept without an address.");
      }
      m == null || m(g);
    });
  }, M = async (x) => {
    g = x, J(x), me && (me.hidden = !0, me.innerHTML = ""), Q(""), m == null || m(x);
    try {
      await ge(parseFloat(x.lat), parseFloat(x.lng));
    } catch (B) {
      console.error("Error initializing map:", B);
    }
  }, P = async () => {
    const x = q.value.trim();
    if (!(!x || !me)) {
      Q("Searching…");
      try {
        const B = await mo(x, { config: X });
        if (!B.length) {
          Q(`No place found for "${x}".`), me.hidden = !0;
          return;
        }
        Q(""), me.innerHTML = "";
        for (const Z of B) {
          const G = document.createElement("li"), se = document.createElement("button");
          se.type = "button", se.textContent = Z.address ?? `${Z.lat}, ${Z.lng}`, se.onclick = () => M(Z), G.append(se), me.append(G);
        }
        me.hidden = !1;
      } catch {
        Q("OpenStreetMap did not answer. Try again in a moment.");
      }
    }
  }, L = async () => {
    if (y ? J(y) : p && (q.value = p), q.addEventListener("keydown", (x) => {
      x.key === "Enter" && (x.preventDefault(), P());
    }), d.querySelector(".search-btn").onclick = () => P(), f)
      try {
        await ge(parseFloat(y.lat), parseFloat(y.lng));
      } catch (x) {
        console.error("Error initializing map:", x);
      }
  }, N = async () => {
    if (u)
      return L();
    try {
      await In(c), o != null && o.lat && (H.value = o.lat), o != null && o.lng && (j.value = o.lng), o != null && o.address && (q.value = o.address), o != null && o.street && (w.value = o.street), o != null && o.street_number && (T.value = o.street_number), o != null && o.postal_code && (z.value = o.postal_code), o != null && o.city && (C.value = o.city), o != null && o.country && (A.value = o.country);
      const x = o && o.lat && o.lng ? {
        lat: parseFloat(o.lat),
        lng: parseFloat(o.lng)
      } : {
        // Else, San Francisco by default
        lat: 37.7749,
        lng: -122.4194
      };
      h = new google.maps.Map(I, {
        center: x,
        zoom: 13
      }), E = new google.maps.Marker({
        map: h,
        position: x,
        draggable: !0
      }), b = new google.maps.places.Autocomplete(q, {
        types: ["geocode"]
      }), b.addListener("place_changed", () => {
        const B = b == null ? void 0 : b.getPlace();
        if (!(B != null && B.geometry) || !h || !E)
          return;
        const Z = B.geometry.location;
        re(B, Z.lat(), Z.lng());
      }), google.maps.event.addListener(E, "dragend", () => {
        const B = E == null ? void 0 : E.getPosition();
        B && ye(B);
      });
    } catch (x) {
      console.error("Error initializing map:", x);
    }
  }, re = (x, B, Z) => {
    if (x) {
      if (g = {
        lat: typeof B == "number" ? B.toString() : B,
        lng: typeof Z == "number" ? Z.toString() : Z,
        address: x.formatted_address || "",
        street: "",
        street_number: "",
        city: "",
        postal_code: "",
        admin_locality: "",
        country: ""
      }, x.address_components)
        for (const G of x.address_components)
          switch (G.types[0]) {
            case "route":
              g.street = G.long_name;
              break;
            case "street_number":
              g.street_number = G.long_name;
              break;
            case "locality":
              g.admin_locality = G.long_name;
              break;
            case "postal_code":
              g.postal_code = G.long_name;
              break;
            case "country":
              g.country = G.long_name;
              break;
          }
      if (x.adr_address) {
        const he = new DOMParser().parseFromString(x.adr_address, "text/html").querySelector(".locality");
        he && (g.city = he.textContent || "");
      }
      if (!g.city && x.formatted_address) {
        const G = x.formatted_address.split(",").find((se) => /\b\d{4}\b/.test(se));
        if (G) {
          const se = G.replace(/\b\d{4}\b/, "").trim();
          se && (g.city = se);
        }
      }
      if (!g.city && g.admin_locality && (g.city = g.admin_locality), H.value = g.lat, j.value = g.lng, q.value = g.address, w.value = g.street, T.value = g.street_number, z.value = g.postal_code, C.value = g.city, A.value = g.country, h && E) {
        const G = new google.maps.LatLng(
          typeof B == "number" ? B : parseFloat(B),
          typeof Z == "number" ? Z : parseFloat(Z)
        );
        h.setCenter(G), E.setPosition(G);
      }
      m && m(g);
    }
  }, ye = async (x) => {
    try {
      const Z = await (await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${x.lat()},${x.lng()}&key=${c}`
      )).json();
      Z.status === "OK" && Z.results && Z.results.length > 0 && re(Z.results[0], x.lat(), x.lng());
    } catch (B) {
      console.error("Reverse geocoding error:", B);
    }
  };
  return N(), {
    destroy: () => {
      pe = !0, K == null || K.destroy(), h && window.google && window.google.maps && google.maps.event.clearInstanceListeners(h), E && window.google && window.google.maps && google.maps.event.clearInstanceListeners(E), b && window.google && window.google.maps && google.maps.event.clearInstanceListeners(b), $.remove(), v();
    }
  };
}
const ho = ht(() => import("./index-2717e69b.js")), go = ht(() => import("./index-c3cfa516.js")), vo = {
  type: "phone",
  empty: (e) => !e,
  control: Me(ho, ({ onChange: e }) => ({
    onChange: (t) => e(Oe(t))
  }))
}, bo = /^<p id="[A-Za-z0-9_-]+"><br><\/p>$/, wo = {
  type: "htmlText",
  empty: (e) => !e,
  // a form edits in place: the host app (BlitzPM) owns when it is writable,
  // an expand icon would open a second editor beside it
  defaultConfig: { presentation: { grid: "modal" } },
  control: Me(go, ({ onChange: e }) => ({
    onChange: (t) => e(Oe(bo.test(t) ? "" : t))
  }))
}, Eo = {
  type: "location",
  empty: (e) => !e,
  // Google with a key, OpenStreetMap without one — the same widget the edit
  // form mounts. Plain text only when the app turned OpenStreetMap off.
  control: (e) => e.config.apiKey || Jt() ? Me(Kt, ({ onChange: t }) => ({
    onChange: (n) => t(n || null)
  }))(e) : Me(Ae, ({ onChange: t }) => ({
    onChange: (n) => t(Oe(n))
  }))(e)
};
const $o = 6;
function So(e) {
  return `"${String(e ?? "").replace(/["\\]/g, "\\$&")}"`;
}
function Co(e) {
  const t = e.reduce((n, s) => {
    const o = e.find((c) => {
      var a, l, d;
      return ((a = c.obj) == null ? void 0 : a._blitzID.value) === ((d = (l = s.obj) == null ? void 0 : l.parent_fk) == null ? void 0 : d.value);
    });
    if (o) {
      const c = n.find((a) => {
        var l;
        return ((l = a.parent) == null ? void 0 : l.value) === o.value;
      });
      return c ? c.children.push(s) : n.push({ expanded: !0, parent: o, children: [s] }), n;
    }
    if (e.find((c) => {
      var a, l, d;
      return ((l = (a = c.obj) == null ? void 0 : a.parent_fk) == null ? void 0 : l.value) === ((d = s.obj) == null ? void 0 : d._blitzID.value);
    }))
      return n;
    const r = n.find((c) => c.parent === void 0);
    return r ? r.children.push(s) : n.push({ expanded: !0, children: [s] }), n;
  }, []);
  return t.sort((n, s) => {
    const o = n.parent ? e.indexOf(n.parent) : 1 / 0, i = s.parent ? e.indexOf(s.parent) : 1 / 0;
    return o - i;
  }), t;
}
async function Ct(e, t) {
  const {
    initialValue: n,
    initialFirst: s,
    initialCallback: o,
    title: i,
    label: r,
    placeholder: c,
    modal: a,
    required: l,
    multiple: d,
    nextButton: u,
    groupByParent: p,
    selectChildrenWithParent: y,
    docLink: f,
    techDocLink: m,
    className: h,
    onSearch: E,
    onChange: b,
    onRefresh: g
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const v = typeof e == "string" ? document.getElementById(e) : e;
  if (!(v instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let $ = [], q = 0, S = [], I = null, O = -1;
  const H = Te(v, "bd-picker", h);
  v.innerHTML = `<div class="container">
        ${r ? `<p class="picker-label">${r}</p>` : ""}
        <div class="dropdown">
            <div class="sync-status blitzicon" style="display: none;"></div>
            <p class="picker-value"></p>
            <div class="actions">
                <div class="picker-spinner"></div>
                ${u && !d ? '<div class="next-btn" style="display: none;"></div>' : ""}
                ${!l && !d ? '<div class="clear-btn" style="display: none;"></div>' : ""}
                <div class="arrow-btn"></div>
            </div>
            ${g || f || m || a ? `<div class="meta-actions">
                ${g ? '<div class="refresh-btn blitzicon">&#xe812;</div>' : ""}
                ${f ? `<a class="doc-btn blitzicon" target="_blank" href="${f}">&#xe90f;</a>` : ""}
                ${m ? `<a class="doc-btn blitzicon" target="_blank" href="${m}">&#xe910;</a>` : ""}
                ${a ? '<div class="expand-btn"></div>' : ""}
            </div>` : ""}
        </div>
        <div class="menu" style="display: none;">
            <input class="search-input" type="text" placeholder="Search..." />
            <p class="empty" style="display: none;">No results found!</p>
            <div class="list"></div>
        </div>
    </div>`;
  const j = v.querySelector(".dropdown"), w = v.querySelector(".sync-status"), T = v.querySelector(".picker-spinner"), z = v.querySelector(".picker-value"), C = v.querySelector(".empty"), A = v.querySelector(".search-input"), R = v.querySelector(".menu"), K = v.querySelector(".container"), X = v.querySelector(".list"), me = v.querySelector(".refresh-btn"), W = v.querySelectorAll(".doc-btn"), Q = v.querySelector(".clear-btn"), J = v.querySelector(".next-btn"), ue = v.querySelector(".expand-btn"), pe = () => {
    R && (R.style.display = "none");
  }, ge = () => {
    if (!R)
      return;
    R.style.display = "";
    const x = R.offsetHeight + $o, B = window.innerHeight - j.getBoundingClientRect().bottom, Z = K.getBoundingClientRect().top;
    v.classList.toggle("drop-up", B < x && Z >= x);
  }, V = () => {
    R && (R.style.display === "none" ? ge() : pe());
  }, M = (x, B) => {
    S = x;
    for (const Z of X.querySelectorAll(".list-item-hovered"))
      Z.classList.remove("list-item-hovered");
    for (const Z of X.querySelectorAll(".list-item-checkbox"))
      Z.checked = !1;
    if (z)
      if (S.length > 0 && $.length > 0) {
        if (z.classList.remove("picker-placeholder"), z.innerHTML = (i ? `<b>${be(i)}: </b>` : "") + (S.map((Z) => be(Z.label)).join(", ") || "/"), Q && (Q.style.display = ""), J) {
          const Z = $.findIndex((G) => G.value === S[0].value);
          Z > -1 && Z < $.length - 1 ? J.style.display = "" : J.style.display = "none";
        }
        for (const Z of S) {
          const G = So(Z.value), se = X.querySelector(`.list-item button[value=${G}]`);
          se && se.parentElement && se.parentElement.classList.add("list-item-hovered");
          const he = X.querySelector(`.group-label[value=${G}]`);
          he && he.parentElement && he.parentElement.classList.add("list-item-hovered");
          const we = X.querySelector(`.list-item-checkbox[value=${G}]`);
          we && (we.checked = !0);
        }
        b && !B && b(S);
      } else
        z.removeAttribute("values"), z.classList.add("picker-placeholder"), z.innerText = c ?? "", Q && (Q.style.display = "none"), J && (J.style.display = "none"), b && !B && b([]);
  }, P = (x) => {
    S.find((B) => B.value === x.value) ? (S.length > 1 || !l) && M(S.filter((B) => B.value !== x.value)) : d ? M([...S, x]) : (M([x]), _e(v));
  }, L = () => {
    if (T.style.display = "none", C && (C.style.display = $.length === 0 ? "" : "none"), A && (A.style.display = q > 7 ? "" : "none"), X) {
      const x = !!(A != null && A.value);
      let B = [];
      if (p && $.some((G) => !!G.obj)) {
        B = Co($), X.innerHTML = B.map(({ expanded: G, parent: se, children: he }) => {
          let we = !1;
          const _ = he.map((ie) => {
            const xe = S.find((Ce) => Ce.value === ie.value);
            return !we && xe && (we = !0), `<div class="list-item ${xe ? "list-item-hovered" : ""}">
                            ${d ? `<input value="${be(ie.value)}" class="list-item-checkbox" type="checkbox" ${xe ? "checked" : ""}>` : ""}
                            <button value="${be(ie.value)}">${be(ie.label)}</button>
                        </div>`;
          }).join(`
`);
          if (!se)
            return _;
          const Y = S.find((ie) => ie.value === se.value), ne = x ? G : we;
          return `
                        <div class="group-header ${Y ? "list-item-hovered" : ""} ${ne ? "expanded" : ""}">
                            <div class="group-toggle">
                                <div class="group-toggle-icon"></div>
                            </div>
                            ${d ? `<input value="${be(se.value)}" class="list-item-checkbox" type="checkbox" ${Y ? "checked" : ""}>` : ""}
                            <p value="${be(se.value)}" class="group-label">${be(se.label)}</p>
                        </div>
                        <div class="group-items ${d ? "multiple-group" : ""}" ${ne ? "" : 'style="display: none;"'}>
                            ${_}
                        </div>
                    `;
        }).join(`
`);
        for (const G of X.querySelectorAll(".group-header .group-toggle"))
          G.addEventListener("click", (se) => {
            se.stopPropagation();
            const he = G.parentElement, we = he == null ? void 0 : he.querySelector(".group-label"), _ = we == null ? void 0 : we.getAttribute("value");
            if (_ && he) {
              const Y = B.find((ne) => {
                var ie;
                return ((ie = ne.parent) == null ? void 0 : ie.value) === _;
              });
              if (Y) {
                const ne = he.classList.contains("expanded");
                Y.expanded = !ne, he.classList.toggle("expanded");
                const ie = he.nextElementSibling;
                ie && (ie.style.display = Y.expanded ? "" : "none");
              }
            }
          });
      } else
        X.innerHTML = $.map((G) => {
          const se = S.find((he) => he.value === G.value);
          return `<div class="list-item ${se ? "list-item-hovered" : ""}">
                            ${d ? `<input value="${be(G.value)}" class="list-item-checkbox" type="checkbox" ${se ? "checked" : ""}>` : ""}
                            <button value="${be(G.value)}">${be(G.label)}</button>
                        </div>`;
        }).join(`
`);
      const Z = (G) => {
        const se = $.find((he) => he.value === G.currentTarget.getAttribute("value"));
        if (se) {
          if (d && p && y) {
            const he = B.find((we) => {
              var _;
              return ((_ = we.parent) == null ? void 0 : _.value) === se.value;
            });
            if (he)
              if (S.find((_) => _.value === se.value)) {
                const _ = he.children.map((Y) => Y.value);
                M(S.filter((Y) => Y.value !== se.value && !_.includes(Y.value)));
              } else {
                const _ = he.children.filter((Y) => !S.find((ne) => ne.value === Y.value));
                M([...S, se, ..._]);
              }
            else
              P(se);
          } else
            P(se);
          d || pe();
        }
      };
      for (const G of [...X.querySelectorAll(".list-item button"), ...X.querySelectorAll(".group-label")])
        G.addEventListener("click", Z);
      for (const G of X.querySelectorAll(".list-item-checkbox"))
        G.addEventListener("change", Z);
    }
  }, N = (x) => {
    var B;
    x && (x.status === F.Completed && !I || (I = x.status, O > -1 && (clearTimeout(O), O = -1), w.style.display = "initial", w.style.cursor = "initial", w.onclick = null, x.status === F.Pending ? (w.innerHTML = "&#xe91e;", w.style.color = "#d5d5d5") : x.status === F.Failed ? (w.innerHTML = "&#xe91a;", w.style.color = "#a82e25", (B = x.job) != null && B.message && (w.style.cursor = "pointer", w.onclick = (Z) => {
      var G;
      Z.stopPropagation(), alert((G = x.job) == null ? void 0 : G.message);
    })) : x.status === F.Conflict ? (w.innerHTML = "&#xe91d;", w.style.color = "#a82e25", w.title = "Conflict") : x.status === F.Completed && (w.innerHTML = "&#xe91c;", w.style.color = "#0ac96a", O = window.setTimeout(() => {
      w.style.display = "none", O = -1;
    }, 1e3))));
  };
  R.addEventListener("click", (x) => x.stopPropagation()), j && (j.addEventListener("click", V), document.addEventListener("click", (x) => {
    j.contains(x.target) || pe();
  }));
  const re = async (x) => {
    E && ($ = await E(x)), x || (q = $.length);
  }, ye = Pt(async (x) => {
    T.style.display = "block", await re(x), L();
  });
  A && A.addEventListener("input", (x) => {
    ye(x.target.value);
  }), Q && Q.addEventListener("click", (x) => {
    x.stopPropagation(), pe(), M([]);
  }), J && J.addEventListener("click", (x) => {
    x.stopPropagation(), pe();
    const B = $.findIndex((Z) => {
      var G;
      return Z.value === ((G = S[0]) == null ? void 0 : G.value);
    });
    B > -1 && B < $.length - 1 && M([$[B + 1]]);
  }), me && g && me.addEventListener("click", async (x) => {
    x.stopPropagation(), T.style.display = "block", await g(), await re(""), L();
  }), ue && ue.addEventListener("click", (x) => {
    x.stopPropagation(), pe(), Lo({
      items: $,
      selected: S,
      onChange: P
    });
  });
  for (const x of W)
    x.addEventListener("click", (B) => B.stopPropagation());
  return await re(""), M(
    n ? (n instanceof Array ? n : [n]).map((x) => $.find((B) => B.value === x)).filter((x) => !!x) : s && $[0] ? [$[0]] : [],
    !o
  ), L(), {
    handleSyncStatus: N,
    destroy: () => {
      for (const x of v.childNodes)
        x.remove();
      v.classList.remove("drop-up"), H();
    }
  };
}
function Lo(e) {
  const { items: t, selected: n, onChange: s } = e;
  if (!Array.isArray(t) || !s)
    throw new Error("Missing parameters!");
  let o = t;
  const i = document.createElement("div");
  i.className = "bd-picker-modal", i.setAttribute("data-bd-portal", "");
  const r = document.createElement("div");
  r.className = "box", i.append(r), r.innerHTML = `<div class="wrapper">
        <div class="close-btn">&times;</div>
        <input class="search-input" type="text" placeholder="Search..." />
        <p class="empty" style="display: none;">No results found!</p>
        <div class="list"></div>
    </div>`;
  const c = r.querySelector(".close-btn"), a = r.querySelector(".search-input"), l = r.querySelector(".empty"), d = r.querySelector(".list"), u = () => {
    if (l && (l.style.display = o.length === 0 ? "" : "none"), d) {
      d.innerHTML = o.map((y) => `<div value="${be(y.value)}" class="list-item ${n.find((f) => f.value === y.value) ? "list-item-hovered" : ""}">
                    ${be(y.label)}
                </div>`).join(`
`);
      for (const y of d.querySelectorAll("div"))
        y.addEventListener("click", (f) => {
          const m = t.find((h) => h.value === f.target.getAttribute("value"));
          m && (s(m), p());
        });
    }
  }, p = () => i.remove();
  i.addEventListener("click", p), c.addEventListener("click", p), r.addEventListener("click", (y) => y.stopPropagation()), a && a.addEventListener("input", (y) => {
    const f = y.target.value;
    f ? o = bt(t, f) : o = t, u();
  }), u(), document.body.append(i);
}
async function ot(e, t) {
  const { model: n, attribute: s, excludeOptions: o, onChange: i, ...r } = t || {};
  if (!n)
    throw new Error("Model property missing!");
  if (!s)
    throw new Error("Attribute name property missing!");
  const c = n.getAttributeDetails(s), a = (de == null ? void 0 : de.defaultLanguage) ?? "en";
  let l = ((c == null ? void 0 : c.options) || []).map((p) => ({
    value: p,
    label: _n(c == null ? void 0 : c.options_labels, p, a, p[0].toUpperCase() + p.slice(1))
  }));
  Array.isArray(o) && o.length > 0 && (l = l.filter((p) => !o.includes(p.value)));
  const { handleSyncStatus: d, destroy: u } = await Ct(
    e,
    {
      ...r,
      onSearch: async (p) => p ? bt(l, p) : l,
      onChange: (p) => {
        i && i(p.map((y) => y.value));
      }
    }
  );
  return { handleSyncStatus: d, destroy: u };
}
async function at(e, t) {
  const { model: n, conditions: s, limit: o, sortDirection: i, labelAttribute: r, initialLabel: c, initialValue: a, onChange: l, ...d } = t || {};
  if (!n)
    throw new Error("Model property missing!");
  var u = null;
  const p = n.getAttributesDetails();
  let y = r;
  if (!y && p) {
    for (const b in p)
      if (typeof p[b].type == "string" && ["varchar", "text"].includes(p[b].type)) {
        y = b;
        break;
      }
  }
  let f = [], m = a;
  if (a || c && y)
    try {
      const b = c instanceof Array ? c : typeof c == "string" ? [c] : void 0, g = a instanceof Array ? a : typeof a == "string" ? [a] : void 0;
      f = await n.list({
        forceLocal: !0,
        // TODO: Change to HTTP | Condition caused a server error
        conditions: [
          ...b && y ? [[y, "IN", b]] : [["_blitzID", "IN", g]],
          ...s ?? []
        ]
      }), f.length > 0 && (m = f.map((v) => v._blitzID.value).filter((v) => v != null));
    } catch (b) {
      b.stack && console.error(b.stack);
    }
  const { handleSyncStatus: h, destroy: E } = await Ct(
    e,
    {
      ...d,
      initialValue: m,
      onSearch: async (b) => {
        try {
          u && u.abort(), u = new AbortController();
          const g = b && y, v = await n.list({
            signal: u.signal,
            forceHttp: !0,
            customSortDirection: i,
            limit: o ?? 100,
            conditions: g || s ? [
              ...g ? [[y, "LIKE", `%${b}%`]] : [],
              ...s ?? []
            ] : void 0
          }), $ = f.every((S) => !!v.find((I) => I._blitzID.value === S._blitzID.value)), q = (g || $ ? v : [...f, ...v]).map((S) => ({
            obj: S,
            value: S._blitzID.value,
            label: y ? S[y].value ?? "/" : "/"
          })).filter((S, I, O) => O.findIndex((H) => H.value === S.value) === I);
          return g && q.sort((S, I) => S.label.length - I.label.length), q;
        } catch (g) {
          return g.message.includes("AbortError") || g.message.includes("The user aborted a request") ? [] : (g.stack && console.error(g.stack), []);
        }
      },
      onChange: (b) => {
        l && l(b.map((g) => g.obj));
      }
    }
  );
  return { handleSyncStatus: h, destroy: E };
}
const pn = (e) => ({ getAttributeDetails: () => e.attributeDetails }), xo = {
  type: ["enum", "enum[]"],
  control: async (e) => {
    const { host: t, value: n, onChange: s, config: o, status: i } = e, { handleSyncStatus: r, destroy: c } = await ot(t, {
      ...o,
      model: pn(e),
      attribute: o.className ?? "value",
      initialValue: n,
      multiple: !!o.multiple,
      onChange: (l) => s(o.multiple ? Oe(l) : l[0] ?? null)
    }), a = i == null ? void 0 : i(r);
    return () => {
      a == null || a(), c();
    };
  },
  filter: async (e) => {
    const { host: t, value: n, onChange: s, config: o } = e, { destroy: i } = await ot(t, {
      ...o,
      model: pn(e),
      attribute: o.className ?? "value",
      initialValue: n == null ? void 0 : n.values,
      multiple: !0,
      onChange: (r) => s(r.length > 0 ? { op: "in", values: r } : null)
    });
    return () => i();
  }
}, Zt = async (e, t) => {
  const n = await e.resolveModel(
    Array.isArray(e.attributeDetails.type) ? e.attributeDetails.type[0] : e.attributeDetails.type
  );
  return at(e.host, { ...e.config, model: n, groupByParent: !0, ...t });
}, Un = async (e) => {
  var n;
  const { destroy: t } = await Zt(e, {
    multiple: !0,
    limit: 100,
    selectChildrenWithParent: !0,
    initialValue: (n = e.value) == null ? void 0 : n.values,
    onChange: (s) => e.onChange(s.length > 0 ? { op: "in", values: s.map((o) => o._blitzID.value) } : null)
  });
  return () => t();
}, ko = {
  type: "fk",
  control: async (e) => {
    var o;
    const { handleSyncStatus: t, destroy: n } = await Zt(e, {
      multiple: !1,
      initialValue: e.value,
      onChange: (i) => {
        var r;
        return e.onChange(((r = i[0]) == null ? void 0 : r._blitzID.value) ?? null);
      }
    }), s = (o = e.status) == null ? void 0 : o.call(e, t);
    return () => {
      s == null || s(), n();
    };
  },
  filter: Un
}, Mo = {
  type: "user",
  defaultConfig: { usersModel: "0BAUsers", labelAttribute: "username" },
  filter: async (e) => {
    var s;
    const t = await e.resolveModel(e.config.usersModel), { destroy: n } = await at(e.host, {
      ...e.config,
      model: t,
      multiple: !0,
      limit: 100,
      initialValue: (s = e.value) == null ? void 0 : s.values,
      onChange: (o) => e.onChange(o.length > 0 ? { op: "in", values: o.map((i) => i._blitzID.value) } : null)
    });
    return () => n();
  }
}, To = {
  type: "mtm",
  default: () => null,
  control: async (e) => {
    var o;
    const { handleSyncStatus: t, destroy: n } = await Zt(e, {
      multiple: !0,
      initialValue: e.value,
      onChange: (i) => e.onChange(i.length > 0 ? i.map((r) => r._blitzID.value) : null)
    }), s = (o = e.status) == null ? void 0 : o.call(e, t);
    return () => {
      s == null || s(), n();
    };
  },
  filter: Un
}, Ao = [
  qs,
  Ps,
  Fs,
  Vs,
  zs,
  Rs,
  Bs,
  Us,
  Ws,
  Js,
  Ks,
  Zs,
  Ys,
  Xs,
  Qs,
  Gs,
  eo,
  to,
  no,
  ao,
  vo,
  wo,
  Eo,
  xo,
  ko,
  To,
  Mo
];
const Xe = (e) => e.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase(), We = (e, t) => e.trim().toLocaleLowerCase() === t.trim().toLocaleLowerCase();
function _o(e, t) {
  const n = Xe(t.trim());
  if (!n)
    return null;
  let s = "";
  const o = [];
  for (let c = 0; c < e.length; ) {
    const a = String.fromCodePoint(e.codePointAt(c));
    for (const l of Xe(a))
      o.push(c);
    s += Xe(a), c += a.length;
  }
  const i = s.indexOf(n);
  if (i < 0)
    return null;
  const r = i + n.length < o.length ? o[i + n.length] : e.length;
  return [o[i], r];
}
function Ho(e, t, n) {
  const s = e.filter((c) => !t.some((a) => We(a, c))), o = Xe(n.trim());
  if (!o)
    return s;
  const i = s.filter((c) => Xe(c).includes(o)), r = (c) => Xe(c).split(/[\s\-_/]+/).some((a) => a.startsWith(o));
  return [...i.filter(r), ...i.filter((c) => !r(c))];
}
const Tt = 100, fn = /[,，、]/;
let Io = 0;
function Lt(e, t) {
  const { label: n, placeholder: s, initialValue: o, single: i, suggestions: r, create: c, href: a, onChange: l, commitOnBlur: d = !0, className: u } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const p = typeof e == "string" ? document.getElementById(e) : e;
  if (!(p instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const y = `bd-tag-${++Io}`;
  let f = (Array.isArray(o) ? o : []).filter((_) => typeof _ == "string" && _.trim() !== "");
  const m = /* @__PURE__ */ new Set();
  let h = null, E = null, b = [], g = -1, v = -1, $ = !1, q = null, S = Promise.resolve();
  const I = Te(p, "bd-tag-input", i ? "is-single" : null, u), O = document.createElement("div");
  O.className = "bd-tag-root", O.innerHTML = `${n ? `<label class="label" for="${y}-input"></label>` : ""}
        <div class="field">
            <ul class="chips" role="list" aria-label="Tags"></ul>
            <input class="entry" id="${y}-input" type="text" role="combobox" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done"
                aria-autocomplete="list" aria-expanded="false" aria-controls="${y}-list" />
            <span class="sync blitzicon" hidden></span>
        </div>
        <div class="panel" hidden>
            <ul class="options" role="listbox" id="${y}-list" aria-label="Tag suggestions"></ul>
            <p class="hint"></p>
        </div>
        <p class="error" hidden></p>
        <span class="live" aria-live="polite"></span>`, p.append(O);
  const H = O.querySelector(".field"), j = O.querySelector(".chips"), w = O.querySelector(".entry"), T = O.querySelector(".panel"), z = O.querySelector(".options"), C = O.querySelector(".hint"), A = O.querySelector(".error"), R = O.querySelector(".live"), K = O.querySelector(".sync");
  n ? O.querySelector(".label").textContent = n : w.setAttribute("aria-label", i ? "Tag" : "Add a tag");
  const X = typeof T.showPopover == "function";
  X && T.setAttribute("popover", "manual");
  const me = (_, Y) => {
    const ne = window.setTimeout(() => {
      m.delete(ne), _();
    }, Y);
    m.add(ne);
  }, W = (_) => {
    R.textContent = "", me(() => {
      R.textContent = _;
    }, 30);
  }, Q = (_) => _ instanceof Error ? _.message : String(_ ?? "Not saved"), J = () => {
    var ne;
    const _ = j.contains(document.activeElement) ? document.activeElement : null, Y = (ne = _ == null ? void 0 : _.closest(".chip")) == null ? void 0 : ne.dataset.value;
    if (j.replaceChildren(...f.map((ie, xe) => {
      const Ce = document.createElement("li");
      Ce.className = "chip", Ce.dataset.value = ie, xe === v && Ce.classList.add("is-selected");
      const Se = a == null ? void 0 : a(ie), k = document.createElement(Se ? "a" : "span");
      k.className = "chip-text", k.textContent = ie, Se && (k.href = Se);
      const D = Object.assign(document.createElement("button"), { type: "button", className: "chip-remove", textContent: "×" });
      return D.setAttribute("aria-label", `Remove ${ie}`), D.onclick = () => {
        M(ie), w.focus();
      }, Ce.append(k, D), Ce;
    })), H.classList.toggle("has-chips", f.length > 0), w.placeholder = i && f.length ? "" : s ?? (f.length ? "" : "Add a tag"), _) {
      const ie = [...j.children].find((xe) => xe.dataset.value === Y);
      ((ie == null ? void 0 : ie.querySelector(".chip-remove")) ?? w).focus();
    }
  }, ue = (_) => {
    A.textContent = Q(_), A.hidden = !1;
  }, pe = () => (S = S.then(async () => {
    try {
      await (l == null ? void 0 : l([...f]));
    } catch (_) {
      ue(_);
    }
  }), S), ge = (_) => (f = i ? [_] : [...f, _], v = -1, A.hidden = !0, J(), W(`Added ${_}`), pe()), V = async (_) => {
    const Y = w.value;
    Y || (w.value = _), $ = !0, w.readOnly = !0, O.setAttribute("aria-busy", "true");
    try {
      const ne = await c(_) || _;
      return h && !h.some((ie) => We(ie, ne)) && (h = [...h, ne]), Y || (w.value = ""), ne;
    } catch (ne) {
      return ue(ne), W(`${_} was not created`), null;
    } finally {
      $ = !1, w.readOnly = !1, O.removeAttribute("aria-busy");
    }
  }, M = (_) => {
    f = f.filter((Y) => Y !== _), v = -1, J(), W(`Removed ${_}`), N() && Z(), pe();
  }, P = async (_, Y) => {
    const ne = _.trim();
    if ($)
      return;
    if (!ne)
      return Z();
    const ie = f.find((Ce) => We(Ce, ne));
    if (ie !== void 0) {
      W(`${ie} is already added`), Z();
      return;
    }
    let xe = (Y == null ? void 0 : Y.kind) === "tag" ? Y.value : (h ?? []).find((Ce) => We(Ce, ne));
    if (xe === void 0 && (xe = c ? await V(ne) ?? void 0 : ne), xe !== void 0) {
      if (f.some((Ce) => We(Ce, xe)))
        return Z();
      i && (B(), _e(p)), await ge(xe), N() && Z();
    }
  }, L = () => r ? (E ?? (E = r().then((_) => {
    h = (_ ?? []).filter((Y) => typeof Y == "string" && Y.trim() !== "");
  }).catch(() => {
    h = h ?? [];
  }).finally(() => {
    N() && Z();
  })), E) : Promise.resolve(), N = () => !T.hidden, re = () => {
    if (!X || !N())
      return;
    const _ = H.getBoundingClientRect(), Y = window.innerHeight - _.bottom - 12, ne = _.top - 12;
    T.style.left = `${_.left}px`, T.style.width = `${_.width}px`, T.style.maxHeight = "";
    const ie = Math.min(T.scrollHeight, 280), xe = Y < Math.min(ie, 160) && ne > Y, Ce = Math.max(96, Math.min(280, xe ? ne : Y));
    T.style.maxHeight = `${Ce}px`, T.style.top = `${xe ? _.top - 6 - Math.min(ie, Ce) : _.bottom + 6}px`;
  }, ye = () => O.isConnected ? re() : B(), x = () => {
    !r && !w.value.trim() || (L(), N() || (T.hidden = !1, X && (T.showPopover(), window.addEventListener("scroll", ye, { capture: !0, passive: !0 }), window.addEventListener("resize", ye))), w.setAttribute("aria-expanded", "true"), Z());
  }, B = () => {
    X && N() && (T.hidePopover(), window.removeEventListener("scroll", ye, { capture: !0 }), window.removeEventListener("resize", ye)), T.hidden = !0, w.setAttribute("aria-expanded", "false"), w.removeAttribute("aria-activedescendant"), g = -1;
  }, Z = () => {
    if (!N())
      return;
    const _ = w.value.trim(), Y = Ho(h ?? [], f, _), ne = [...h ?? [], ...f].some((Se) => We(Se, _)), ie = _ && !ne ? [{ kind: "create", value: _ }] : [], xe = Y.slice(0, Tt).map((Se) => ({ kind: "tag", value: Se }));
    b = Y.length ? [...xe, ...ie] : ie, g = Math.min(_ ? Math.max(g, 0) : g, b.length - 1), z.replaceChildren(...b.map((Se, k) => {
      const D = document.createElement("li");
      if (D.id = `${y}-opt-${k}`, D.className = `option is-${Se.kind}`, D.setAttribute("role", "option"), D.setAttribute("aria-selected", k === g ? "true" : "false"), k === g && D.classList.add("is-active"), Se.kind === "create") {
        const U = Object.assign(document.createElement("strong"), { textContent: Se.value }), te = Object.assign(document.createElement("span"), { className: "plus" });
        te.setAttribute("aria-hidden", "true"), D.append(te, `${c ? "Create" : "Add"} “`, U, "”");
      } else {
        const U = _o(Se.value, _);
        U ? D.append(
          Se.value.slice(0, U[0]),
          Object.assign(document.createElement("mark"), { textContent: Se.value.slice(U[0], U[1]) }),
          Se.value.slice(U[1])
        ) : D.textContent = Se.value;
      }
      return D.onmousedown = (U) => U.preventDefault(), D.onclick = () => {
        $ || (w.value = "", P(Se.value, Se), w.focus());
      }, D;
    }));
    const Ce = _ && f.find((Se) => We(Se, _));
    C.textContent = h === null && r ? "Loading tags…" : Ce ? `“${Ce}” is already added` : Y.length > Tt ? `Showing ${Tt} of ${Y.length}. Keep typing to narrow.` : b.length ? "" : f.length && (h ?? []).length ? "All tags are added" : "Type to add a tag", C.hidden = !C.textContent, z.hidden = b.length === 0, G(), re();
  }, G = () => {
    var Y;
    z.querySelectorAll(".option").forEach((ne, ie) => {
      ne.classList.toggle("is-active", ie === g), ne.setAttribute("aria-selected", ie === g ? "true" : "false");
    });
    const _ = g >= 0 ? z.children[g] : void 0;
    _ ? (w.setAttribute("aria-activedescendant", _.id), (Y = _.scrollIntoView) == null || Y.call(_, { block: "nearest" })) : w.removeAttribute("aria-activedescendant");
  }, se = (_) => {
    N() || x(), b.length && (g = g < 0 ? _ > 0 ? 0 : b.length - 1 : (g + _ + b.length) % b.length, G());
  };
  H.onmousedown = (_) => {
    (_.target === H || _.target === j) && (_.preventDefault(), w.focus());
  }, T.onmousedown = (_) => _.preventDefault(), w.onfocus = () => x(), w.onclick = () => {
    N() || x();
  }, O.addEventListener("focusout", (_) => {
    if (!O.contains(_.relatedTarget)) {
      B(), v >= 0 && (v = -1, J());
      const Y = w.value;
      d && Y.trim() && !$ && (w.value = "", P(Y));
    }
  }), w.oninput = (_) => {
    if (!_.isComposing) {
      if (v >= 0 && (v = -1, J()), !i && fn.test(w.value)) {
        const Y = w.value.split(fn);
        w.value = Y.pop() ?? "", Y.reduce((ne, ie) => ne.then(() => P(ie)), Promise.resolve());
        return;
      }
      N() ? (g = -1, Z()) : x();
    }
  }, w.onkeydown = (_) => {
    if (_.isComposing || $)
      return;
    const Y = w.value.trim();
    if (_.key === "ArrowDown")
      _.preventDefault(), se(1);
    else if (_.key === "ArrowUp")
      _.preventDefault(), se(-1);
    else if (_.key === "Enter" || _.key === "Tab" && Y) {
      const ne = N() && g >= 0 ? b[g] : void 0;
      if (!ne && !Y)
        return;
      _.preventDefault(), w.value = "", P(ne ? ne.value : Y, ne);
    } else
      _.key === "Escape" ? N() ? (_.preventDefault(), _.stopPropagation(), B()) : v >= 0 && (v = -1, J()) : _.key === "Backspace" && w.value === "" && f.length && (v === f.length - 1 ? M(f[v]) : (v = f.length - 1, J(), W(`${f[v]} selected, Backspace again to remove`)));
  };
  const he = (_) => {
    var Y;
    _ && (_.status === F.Completed && !q || (q = _.status, K.hidden = !1, K.dataset.status = _.status, _.status === F.Pending ? K.innerHTML = "&#xe91e;" : _.status === F.Completed ? (K.innerHTML = "&#xe91c;", A.hidden = !0, me(() => {
      q === F.Completed && (K.hidden = !0);
    }, 1e3)) : (_.status === F.Failed || _.status === F.Conflict) && (K.innerHTML = _.status === F.Failed ? "&#xe91a;" : "&#xe91d;", ue(((Y = _.job) == null ? void 0 : Y.message) ?? (_.status === F.Conflict ? "This change conflicts with another edit." : "Not saved.")))));
  }, we = (_) => {
    const Y = (_ ?? []).filter((ne) => typeof ne == "string" && ne.trim() !== "");
    Y.length === f.length && Y.every((ne, ie) => ne === f[ie]) || (f = Y, v = -1, J(), Z());
  };
  return J(), {
    handleSyncStatus: he,
    setValue: we,
    focus: () => w.focus(),
    destroy: () => {
      for (const _ of m)
        clearTimeout(_);
      B(), O.remove(), I();
    }
  };
}
async function Oo(e, t) {
  const { projectID: n, projectModel: s, onChange: o, ...i } = t || {}, r = n ? [n] : [];
  if (r.length === 0) {
    const u = await ke._Model.get(s || "_Project");
    if (!u)
      throw new Error("Model name is incorrect!");
    r.push(
      ...(await u.list()).map((p) => s ? p.project_fk.value : p._blitzID.value).filter((p) => !!p)
    );
  }
  const c = async () => {
    let u = [];
    for (const p of r)
      u.push(...await ke.listProjectUsers(p));
    return u.filter((p, y, f) => f.findIndex((m) => m.id === p.id) === y).map((p) => ({ value: p.id, label: p.username || p.id, user: p }));
  };
  let a = await c();
  const { handleSyncStatus: l, destroy: d } = await Ct(
    e,
    {
      ...i,
      onSearch: async (u) => u ? bt(a, u) : a,
      onChange: (u) => {
        o && o(u.map((p) => p.user));
      },
      onRefresh: async () => {
        for (const u of r)
          Es.setProjectUsers(u, null);
        a = await c();
      }
    }
  );
  return { handleSyncStatus: l, destroy: d };
}
async function jo(e, t) {
  const { items: n, onChange: s, ...o } = t || {};
  if (!Array.isArray(n))
    throw new Error("Items property missing!");
  const i = n.map((a) => typeof a == "string" ? { value: a, label: a } : a), { handleSyncStatus: r, destroy: c } = await Ct(
    e,
    {
      ...o,
      onSearch: async (a) => a ? bt(i, a) : i,
      onChange: (a) => {
        s && s(a.map((l) => l.value));
      }
    }
  );
  return { handleSyncStatus: r, destroy: c };
}
async function No(e, t, n) {
  var a;
  if (!e || !e._name || !e._object || !e._object.model)
    throw new Error("Fk type missing properties!");
  const s = (a = e._object.model.getAttributeDetails(e._name)) == null ? void 0 : a.type;
  if (!s)
    throw new Error("Model attributes invalid!");
  const o = await ke._Model.get(s), { handleSyncStatus: i, destroy: r } = await at(t, {
    ...n,
    model: o,
    initialValue: e.value,
    initialLabel: void 0,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !1,
    onChange: async (l) => {
      var d;
      await e.edit(((d = l[0]) == null ? void 0 : d._blitzID.value) ?? null);
    }
  }), c = e.syncStatus(i);
  return {
    destroy: () => {
      c(), r();
    }
  };
}
async function Do(e, t, n) {
  if (!e || !e._name || !e._object || !e._object.model)
    throw new Error("Enum type missing properties!");
  const { handleSyncStatus: s, destroy: o } = await ot(t, {
    ...n,
    model: e._object.model,
    attribute: e._name,
    initialValue: e.value,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !1,
    onChange: async (r) => {
      await e.edit(r[0] ?? null);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function qo(e, t, n) {
  if (!e)
    throw new Error("Varchar type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Ae(t, {
    ...n,
    multiple: !1,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function mn(e, t, n) {
  if (!e)
    throw new Error("Text type missing properties!");
  const { handleSyncStatus: s, getValue: o, isPending: i, cancelPending: r, destroy: c } = Ke(t, {
    ...n,
    multiple: !1,
    initialValue: (n == null ? void 0 : n.draft) ?? e.value,
    onChange: async (l) => {
      await e.edit(l);
    }
  }), a = e.syncStatus(s);
  return {
    getDraft: o,
    isPending: i,
    cancelPending: r,
    destroy: () => {
      a(), c();
    }
  };
}
async function Po(e, t, n) {
  if (!e)
    throw new Error("Email type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Ae(t, {
    ...n,
    multiple: !1,
    type: "email",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
            <rect stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" x="3" y="5" width="18" height="14" rx="2" />
        </svg>`,
    pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    errorMsg: "Wrong email address!",
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function Fo(e, t, n) {
  if (!e)
    throw new Error("Url type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Ae(t, {
    ...n,
    multiple: !1,
    type: "url",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" />
        </svg>`,
    pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    errorMsg: "Wrong URL!",
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function Vo(e, t, n) {
  if (!e)
    throw new Error("Number type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Fe(t, {
    ...n,
    float: !1,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function yn(e, t, n) {
  if (!e)
    throw new Error("Number type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Fe(t, {
    ...n,
    float: !0,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function zo(e, t, n) {
  if (!e)
    throw new Error("Boolean type missing properties!");
  const { handleSyncStatus: s, destroy: o } = zt(t, {
    ...n,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function Ro(e, t, n) {
  if (!e)
    throw new Error("JSON type missing properties!");
  const { handleSyncStatus: s, getValue: o, isPending: i, cancelPending: r, destroy: c } = Ke(t, {
    ...n,
    multiple: !1,
    initialValue: (n == null ? void 0 : n.draft) ?? (e.value ? JSON.stringify(e.value, null, 2) : ""),
    onChange: async (l) => {
      let d = null;
      try {
        l && (d = JSON.parse(l) ?? null);
      } catch {
      }
      await e.edit(d);
    }
  }), a = e.syncStatus(s);
  return {
    getDraft: o,
    isPending: i,
    cancelPending: r,
    destroy: () => {
      a(), c();
    }
  };
}
async function Bo(e, t, n) {
  var l;
  if (!e)
    throw new Error("Code type missing properties!");
  const { handleSyncStatus: s, getValue: o, isPending: i, cancelPending: r, destroy: c } = Ke(t, {
    ...n,
    multiple: !1,
    initialValue: (n == null ? void 0 : n.draft) ?? ((l = e.value) == null ? void 0 : l.content) ?? "",
    onChange: async (d) => {
      var u;
      await e.edit({
        content: d,
        language: ((u = e.value) == null ? void 0 : u.language) ?? null
      });
    }
  }), a = e.syncStatus(s);
  return {
    getDraft: o,
    isPending: i,
    cancelPending: r,
    destroy: () => {
      a(), c();
    }
  };
}
async function Uo(e, t, n) {
  if (!e)
    throw new Error("Date type missing properties!");
  const { handleSyncStatus: s, destroy: o } = it(t, {
    ...n,
    time: !1,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function Wo(e, t, n) {
  if (!e)
    throw new Error("DateTime type missing properties!");
  const { handleSyncStatus: s, destroy: o } = it(t, {
    ...n,
    time: !0,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function Jo(e, t, n) {
  if (!e)
    throw new Error("Image type missing properties!");
  const { handleSyncStatus: s, destroy: o } = $t(t, {
    ...n,
    multiple: !1,
    initialPreviewImages: (e.value ?? []).filter((r) => r.base && r["180x180"]).map((r) => r.base + r["180x180"].substring(1)),
    onChange: async (r) => {
      var l, d;
      s({ status: F.Pending });
      const c = [], a = (d = (l = e._object) == null ? void 0 : l.model) == null ? void 0 : d.getName();
      for (const u of r) {
        const p = await ke.uploader(u, a ? { modelName: a, attributeName: e._name } : void 0);
        c.push(p);
      }
      await e.edit(c);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function Ko(e, t, n) {
  if (!e)
    throw new Error("Video type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Ut(t, {
    ...n,
    multiple: !1,
    onChange: async (r) => {
      var c, a;
      if (r.length > 0) {
        s({ status: F.Pending });
        const l = (a = (c = e._object) == null ? void 0 : c.model) == null ? void 0 : a.getName(), d = await ke.uploaderVideo(r[0], l ? { modelName: l, attributeName: e._name } : void 0);
        await e.edit(d);
      }
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function Zo(e, t, n) {
  if (!e)
    throw new Error("File type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Wt(t, {
    ...n,
    multiple: !1,
    onChange: async (r) => {
      var c, a;
      if (r.length > 0) {
        s({ status: F.Pending });
        const l = (a = (c = e._object) == null ? void 0 : c.model) == null ? void 0 : a.getName(), d = await ke.uploaderFile(r[0], l ? { modelName: l, attributeName: e._name } : void 0);
        await e.edit(d);
      }
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function Yo(e, t, n) {
  if (!e)
    throw new Error("Location type missing properties!");
  if (!(n != null && n.apiKey) && !Jt()) {
    const o = e.value, i = Ae(t, {
      ...n != null && n.placeholder ? { placeholder: n.placeholder } : {},
      initialValue: typeof o == "string" ? o : (o == null ? void 0 : o.address) ?? "",
      onChange: async (r) => {
        await e.edit(String(r).trim() || null);
      }
    });
    return { destroy: () => i.destroy() };
  }
  const { destroy: s } = Kt(t, {
    ...n,
    initialValue: e.value,
    onChange: async (o) => {
      await e.edit(o);
    }
  });
  return {
    destroy: s
  };
}
function Xo(e) {
  var n, s;
  const t = (n = e._object) == null ? void 0 : n.model;
  return ((s = t == null ? void 0 : t.tagSource) == null ? void 0 : s.call(t, e._name)) ?? null;
}
function Wn(e) {
  var o, i, r, c;
  const t = Xo(e);
  if (t)
    return { suggestions: () => t.values(), create: (a) => t.ensure(a) };
  const n = (c = (r = (i = (o = e._object) == null ? void 0 : o.model) == null ? void 0 : i.getAttributeDetails) == null ? void 0 : r.call(i, e._name)) == null ? void 0 : c.options, s = Array.isArray(n) ? n.filter((a) => typeof a == "string" && a !== "") : [];
  return s.length ? { suggestions: async () => s } : {};
}
async function Qo(e, t, n) {
  if (!e)
    throw new Error("Tag type missing properties!");
  const s = (l) => typeof l == "string" && l ? [l] : [], { handleSyncStatus: o, setValue: i, destroy: r } = Lt(t, {
    label: n == null ? void 0 : n.label,
    placeholder: n == null ? void 0 : n.placeholder,
    className: n == null ? void 0 : n.className,
    single: !0,
    initialValue: s(e.value),
    onChange: async (l) => {
      await e.edit(l[0] ?? null);
    },
    ...Wn(e)
  }), c = e.syncStatus(o), a = e.subscribe((l) => i(s(l)), !1);
  return {
    destroy: () => {
      c(), a(), r();
    }
  };
}
async function Go(e, t, n) {
  if (!e)
    throw new Error("Translated type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Rt(t, {
    ...n,
    initialValue: e.value ?? {},
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function er(e, t, n) {
  if (!e)
    throw new Error("Duration type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Fe(t, {
    ...n,
    placeholder: (n == null ? void 0 : n.placeholder) ?? "seconds",
    float: !1,
    min: 0,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function tr(e, t, n) {
  if (!e)
    throw new Error("Formula type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Ae(t, {
    ...n,
    multiple: !1,
    type: "text",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4H10.5C9.11929 4 8 5.11929 8 6.5V19M5 12H13M16 20L17.5 15M20.5 15L19 20" />
        </svg>`,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function nr(e, t, n) {
  var l, d, u, p;
  if (!e)
    throw new Error("Currency type missing properties!");
  const s = (p = (u = (d = (l = e._object) == null ? void 0 : l.model) == null ? void 0 : d.getAttributesDetails) == null ? void 0 : u.call(d)) == null ? void 0 : p[e._name], o = Array.isArray(s == null ? void 0 : s.unit) ? s == null ? void 0 : s.unit[0] : s == null ? void 0 : s.unit, i = (n == null ? void 0 : n.unit) ?? o, { handleSyncStatus: r, destroy: c } = Fe(t, {
    ...n,
    label: (n == null ? void 0 : n.label) ?? i,
    float: !0,
    initialValue: e.value,
    onChange: async (y) => {
      await e.edit(y);
    }
  }), a = e.syncStatus(r);
  return {
    destroy: () => {
      a(), c();
    }
  };
}
async function sr(e, t, n) {
  var r;
  if (!e)
    throw new Error("Youtube type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Ae(t, {
    ...n,
    multiple: !1,
    type: "url",
    placeholder: (n == null ? void 0 : n.placeholder) ?? "https://youtube.com/watch?v=…",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect stroke="#a1a1a1" stroke-width="2" x="2" y="5" width="20" height="14" rx="4" />
            <path fill="#a1a1a1" d="M10 9L15 12L10 15V9Z" />
        </svg>`,
    pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    errorMsg: "Wrong video URL!",
    initialValue: (typeof e.value == "object" ? (r = e.value) == null ? void 0 : r.url : e.value) ?? "",
    onChange: async (c) => {
      const a = e.value && typeof e.value == "object" ? e.value : {};
      await e.edit({ ...a, url: c });
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function or(e, t, n) {
  if (!e)
    throw new Error("Hex type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Ae(t, {
    ...n,
    multiple: !1,
    type: "text",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 3L8 21M16 3L14 21M3 8H21M3 16H21" />
        </svg>`,
    pattern: /^[0-9a-fA-F]*$/,
    errorMsg: "Hex digits only (0-9, a-f)!",
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function rr(e, t, n) {
  var a;
  if (!e || !e._name || !e._object || !e._object.model)
    throw new Error("Mtm type missing properties!");
  const s = (a = e._object.model.getAttributeDetails(e._name)) == null ? void 0 : a.type[0];
  if (!s)
    throw new Error("Model attributes invalid!");
  const o = await ke._Model.get(s), { handleSyncStatus: i, destroy: r } = await at(t, {
    ...n,
    model: o,
    initialValue: (e.value ?? []).map((l) => l._blitzID),
    initialLabel: void 0,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !0,
    onChange: async (l) => {
      const d = l.map((p) => p._blitzID.value), u = (e.value ?? []).map((p) => p._blitzID);
      for (const p of d)
        u.includes(p) || await e.add(p);
      for (const p of u)
        d.includes(p) || await e.remove(p);
    }
  }), c = e.syncStatus(i);
  return {
    destroy: () => {
      c(), r();
    }
  };
}
async function ir(e, t, n) {
  if (!e || !e._name || !e._object || !e._object.model)
    throw new Error("Enum many type missing properties!");
  const { handleSyncStatus: s, destroy: o } = await ot(t, {
    ...n,
    model: e._object.model,
    attribute: e._name,
    initialValue: De(e.value),
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !0,
    onChange: async (r) => {
      const c = De(e.value);
      for (const a of r)
        c.includes(a) || await e.add(a);
      for (const a of c)
        r.includes(a) || await e.remove(a);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function ar(e, t, n) {
  if (!e)
    throw new Error("Image many type missing properties!");
  const { handleSyncStatus: s, destroy: o } = $t(t, {
    ...n,
    multiple: !0,
    initialPreviewImages: De(e.value).filter((r) => r && r.base && r["180x180"]).map((r) => r.base + r["180x180"].substring(1)),
    onChange: async (r) => {
      var l, d;
      s({ status: F.Pending });
      const c = [], a = (d = (l = e._object) == null ? void 0 : l.model) == null ? void 0 : d.getName();
      for (const u of r) {
        const p = await ke.uploader(u, a ? { modelName: a, attributeName: e._name } : void 0);
        c.push(p);
      }
      for (const u of De(e.value))
        await e.remove(u);
      for (const u of c)
        await e.add(u);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function lr(e, t, n) {
  if (!e)
    throw new Error("Text many type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Ft(t, {
    ...n,
    initialValue: De(e.value),
    onChange: async (r) => {
      const c = De(e.value);
      for (const a of r)
        c.includes(a) || await e.add(a);
      for (const a of c)
        r.includes(a) || await e.remove(a);
    }
  }), i = e.syncStatus(s);
  return {
    destroy: () => {
      i(), o();
    }
  };
}
async function cr(e, t, n) {
  if (!e)
    throw new Error("Tag many type missing properties!");
  const { handleSyncStatus: s, setValue: o, destroy: i } = Lt(t, {
    label: n == null ? void 0 : n.label,
    placeholder: n == null ? void 0 : n.placeholder,
    className: n == null ? void 0 : n.className,
    href: n == null ? void 0 : n.href,
    initialValue: De(e.value),
    onChange: async (a) => {
      const l = De(e.value);
      for (const d of a)
        l.includes(d) || await e.add(d);
      for (const d of l)
        a.includes(d) || await e.remove(d);
    },
    ...Wn(e)
  }), r = e.syncStatus(s), c = e.subscribe((a) => o(De(a)), !1);
  return {
    destroy: () => {
      r(), c(), i();
    }
  };
}
const dr = [
  "varchar",
  "text",
  "email",
  "url",
  "phone",
  "hex",
  "formula",
  "tag",
  "enum",
  "boolean",
  "int",
  "tinyint",
  "double",
  "float",
  "percentage",
  "currency",
  "duration",
  "date",
  "datetime",
  "json",
  "code",
  "markdown"
], hn = ["int", "tinyint", "double", "float", "percentage", "currency", "duration"], ur = ["text", "markdown", "json", "code"];
async function Jn(e, t, n) {
  var h, E, b, g;
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const o = e._type, i = e.value, r = ((b = (E = (h = e._object) == null ? void 0 : h.model) == null ? void 0 : E.getAttributeDetails) == null ? void 0 : b.call(E, e._name)) ?? {};
  if (s.innerHTML = "", n != null && n.label) {
    const v = document.createElement("label");
    v.className = "bd-label", v.textContent = n.label, s.append(v);
  }
  let c = () => {
  };
  const a = (g = e.subscribe) == null ? void 0 : g.call(e, (v) => c(v), !1), l = () => {
    a == null || a(), s.innerHTML = "";
  };
  if (o === "boolean") {
    const v = (q) => q === !0 || q === 1 || q === "1", $ = Object.assign(document.createElement("input"), { type: "checkbox", checked: v(i) });
    return $.onchange = () => e.edit($.checked), c = (q) => {
      $.checked = v(q);
    }, s.append($), { destroy: l };
  }
  const d = Array.isArray(r.options) ? r.options : [];
  if ((o === "enum" || o === "tag") && d.length) {
    const v = document.createElement("select");
    for (const $ of ["", ...d])
      v.append(Object.assign(document.createElement("option"), {
        value: $,
        textContent: $ || "—",
        selected: $ === (i ?? "")
      }));
    return v.onchange = () => e.edit(v.value || null), c = ($) => {
      v.value = typeof $ == "string" ? $ : "";
    }, s.append(v), { destroy: l };
  }
  const u = (v) => v == null ? "" : o === "json" ? JSON.stringify(v, null, 2) : o === "code" ? (v == null ? void 0 : v.content) ?? "" : o === "datetime" ? String(v).replace(" ", "T").slice(0, 16) : String(v), p = (v) => {
    if (v === "")
      return null;
    if (hn.includes(o)) {
      const $ = Number(v);
      if (!Number.isFinite($))
        throw new Error("Not a number");
      return $;
    }
    return o === "json" ? JSON.parse(v) : o === "code" ? { content: v, language: (i == null ? void 0 : i.language) ?? null } : o === "datetime" ? v.replace("T", " ") + (v.length === 16 ? ":00" : "") : v;
  };
  let y;
  ur.includes(o) ? y = Object.assign(document.createElement("textarea"), { rows: 4 }) : (y = document.createElement("input"), y.type = hn.includes(o) ? "number" : o === "date" ? "date" : o === "datetime" ? "datetime-local" : o === "email" ? "email" : o === "url" ? "url" : o === "phone" ? "tel" : "text", y.type === "number" && (y.step = o === "int" || o === "tinyint" ? "1" : "any")), y.className = "bd-native-field";
  let f = u(i);
  y.value = f, c = (v) => {
    const $ = u(v);
    (document.activeElement !== y || y.value === f) && (y.value = $), f = $;
  };
  const m = async () => {
    if (y.value === f)
      return;
    let v;
    try {
      v = p(y.value);
    } catch {
      y.classList.add("bd-native-invalid");
      return;
    }
    y.classList.remove("bd-native-invalid"), f = y.value, await e.edit(v);
  };
  return y.onblur = () => {
    m();
  }, y.onkeydown = (v) => {
    v.key === "Enter" && y.tagName !== "TEXTAREA" && (v.preventDefault(), m()), v.key === "Escape" && (y.value = f, y.classList.remove("bd-native-invalid"));
  }, s.append(y), { destroy: l };
}
const Kn = {
  "fk-picker": { type: "fk", editor: No },
  "enum-select": { type: "enum", editor: Do },
  // the heavy editors stay behind import(): htmlText carries EditorJS,
  // phone carries libphonenumber
  "html-blocks": { type: "htmlText", editor: Ne(() => import("./index-9e7e520d.js")) },
  "varchar-inline": { type: "varchar", editor: qo },
  "text-area": { type: "text", editor: mn },
  "markdown-text": { type: "markdown", editor: mn },
  "markdown-preview": { type: "markdown", editor: Ne(() => import("./index-11be1b71.js")) },
  "tag-input": { type: "tag", editor: Qo },
  "tag-options": { type: "tag", editor: Ne(() => import("./index-94619e3e.js")) },
  "texti18n-locales": { type: "texti18n", editor: Go },
  "email-inline": { type: "email", editor: Po },
  "phone-intl": { type: "phone", editor: Ne(() => import("./index-d965b511.js")) },
  "url-inline": { type: "url", editor: Fo },
  "youtube-url": { type: "youtube", editor: sr },
  "youtube-thumb": { type: "youtube", editor: Ne(() => import("./index-c99cf7c7.js")) },
  "int-inline": { type: "int", editor: Vo },
  "float-inline": { type: "float", editor: yn },
  "percentage-number": { type: "percentage", editor: yn },
  "percentage-4dp": { type: "percentage", editor: Ne(() => import("./index-d94ca150.js")) },
  "currency-house": { type: "currency", editor: nr },
  "duration-seconds": { type: "duration", editor: er },
  "duration-dhms": { type: "duration", editor: Ne(() => import("./index-19abd237.js")) },
  "formula-inline": { type: "formula", editor: tr },
  "hex-inline": { type: "hex", editor: or },
  "boolean-toggle": { type: "boolean", editor: zo },
  "json-text": { type: "json", editor: Ro },
  "json-tree": { type: "json", editor: Ne(() => import("./index-fe6455ec.js")) },
  "code-text": { type: "code", editor: Bo },
  "code-language": { type: "code", editor: Ne(() => import("./index-d3fb2230.js")) },
  "date-picker": { type: "date", editor: Uo },
  "datetime-picker": { type: "datetime", editor: Wo },
  "image-upload": { type: "image", editor: Jo },
  "video-upload": { type: "video", editor: Ko },
  "file-upload": { type: "file", editor: Zo },
  "location-map": { type: "location", editor: Yo },
  // one plain HTML field for the column's own type: the basic preset's editor
  native: { type: "", editor: Jn },
  // for many-valued attributes
  "mtm-picker": { type: "mtm", editor: rr },
  "enum-many": { type: "enum", editor: ir },
  "image-many": { type: "image", editor: ar },
  "text-many": { type: "text", editor: lr },
  "tag-many": { type: "tag", editor: cr },
  // The UI Store's former remote editors (owner's decision, 2026-10-23): no
  // type's default, each a chunk loaded on first use. json-vanilla and
  // code-cm6 load their engines from the instance's /assets/, as before.
  stars: { load: () => import("./stars-93623783.js") },
  "percentage-bar": { load: () => import("./percentage-bar-2b3dfaff.js") },
  "boolean-icons": { load: () => import("./boolean-icons-91d4360f.js") },
  "boolean-segmented": { load: () => import("./boolean-segmented-f4cecaa4.js") },
  "date-relative": { load: () => import("./date-relative-d8852450.js") },
  "enum-segmented": { load: () => import("./enum-segmented-ecca909c.js") },
  "tag-chips": { load: () => import("./tag-chips-a78ed33e.js") },
  "url-favicon": { load: () => import("./url-favicon-978282cc.js") },
  "json-vanilla": { load: () => import("./json-vanilla-bc795f36.js") },
  "code-cm6": { load: () => import("./code-cm6-19fdb029.js") }
}, pr = {
  fk: "fk-picker",
  enum: "enum-select",
  htmlText: "html-blocks",
  varchar: "varchar-inline",
  text: "text-area",
  markdown: "markdown-preview",
  tag: "tag-input",
  texti18n: "texti18n-locales",
  email: "email-inline",
  phone: "phone-intl",
  url: "url-inline",
  youtube: "youtube-thumb",
  int: "int-inline",
  tinyint: "int-inline",
  double: "float-inline",
  float: "float-inline",
  percentage: "percentage-4dp",
  currency: "currency-house",
  duration: "duration-dhms",
  formula: "formula-inline",
  hex: "hex-inline",
  boolean: "boolean-toggle",
  json: "json-tree",
  code: "code-language",
  date: "date-picker",
  datetime: "datetime-picker",
  image: "image-upload",
  video: "video-upload",
  file: "file-upload",
  location: "location-map"
}, fr = {
  mtm: "mtm-picker",
  enum: "enum-many",
  image: "image-many",
  varchar: "text-many",
  text: "text-many",
  tag: "tag-many"
}, gn = (e) => Object.fromEntries(Object.entries(e).map(([t, n]) => [t, Kn[n].editor])), mr = /^\s*(javascript|data|vbscript):/i, yr = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?$/, vn = (e) => {
  let t = e.trim();
  return t.startsWith("|") && (t = t.slice(1)), t.endsWith("|") && (t = t.slice(0, -1)), t.split("|").map((n) => n.trim());
}, bn = (e) => mr.test(e) ? "#" : e;
function Ze(e) {
  return e.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (t, n, s) => `<img alt="${n}" src="${bn(s)}" />`).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (t, n, s) => `<a href="${bn(s)}">${n}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
function Zn(e) {
  const t = be(e.replace(/\r\n?/g, `
`)).split(`
`), n = [];
  let s = [], o = null, i = [], r = null, c = null;
  const a = () => {
    s.length && n.push(`<p>${s.map(Ze).join("<br />")}</p>`), s = [];
  }, l = () => {
    o && n.push(`<${o.tag}>${o.items.map((y) => `<li>${Ze(y)}</li>`).join("")}</${o.tag}>`), o = null;
  }, d = () => {
    i.length && n.push(`<blockquote>${i.map(Ze).join("<br />")}</blockquote>`), i = [];
  }, u = () => {
    if (c) {
      const y = `<tr>${c.header.map((m) => `<th>${Ze(m)}</th>`).join("")}</tr>`, f = c.rows.map((m) => `<tr>${m.map((h) => `<td>${Ze(h)}</td>`).join("")}</tr>`).join("");
      n.push(`<table><thead>${y}</thead><tbody>${f}</tbody></table>`);
    }
    c = null;
  }, p = () => {
    a(), l(), d(), u();
  };
  for (let y = 0; y < t.length; y++) {
    const f = t[y];
    if (r) {
      /^```/.test(f) ? (n.push(`<pre><code>${r.join(`
`)}</code></pre>`), r = null) : r.push(f);
      continue;
    }
    if (/^```/.test(f)) {
      p(), r = [];
      continue;
    }
    if (c) {
      if (f.trim() !== "" && f.includes("|")) {
        c.rows.push(vn(f));
        continue;
      }
      u();
    }
    const m = f.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      p(), n.push(`<h${m[1].length}>${Ze(m[2])}</h${m[1].length}>`);
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(f)) {
      p(), n.push("<hr />");
      continue;
    }
    const h = f.match(/^&gt;\s?(.*)$/);
    if (h) {
      a(), l(), i.push(h[1]);
      continue;
    }
    const E = f.match(/^\s*[-*]\s+(.*)$/), b = f.match(/^\s*\d+\.\s+(.*)$/);
    if (E || b) {
      a(), d();
      const g = E ? "ul" : "ol";
      (!o || o.tag !== g) && (l(), o = { tag: g, items: [] }), o.items.push((E ?? b)[1]);
      continue;
    }
    if (f.includes("|") && y + 1 < t.length && yr.test(t[y + 1])) {
      p(), c = { header: vn(f), rows: [] }, y++;
      continue;
    }
    if (f.trim() === "") {
      p();
      continue;
    }
    l(), d(), s.push(f);
  }
  return r && n.push(`<pre><code>${r.join(`
`)}</code></pre>`), p(), n.join(`
`);
}
function wn(e, t, n = !1) {
  const s = e.replace(/[^\d+]/g, ""), o = [];
  if (s.length === 10)
    o.push(s.slice(0, 3)), o.push(s.slice(3, 6)), o.push(s.slice(6, 8)), o.push(s.slice(8, 10));
  else if (s.length === 9)
    o.push(s.slice(0, 3)), o.push(s.slice(3, 6)), o.push(s.slice(6, 9));
  else if (s.length === 11)
    o.push(s.slice(0, 3)), o.push(s.slice(3, 7)), o.push(s.slice(7, 11));
  else
    for (let r = 0; r < s.length; r += 3)
      o.push(s.slice(r, r + 3));
  const i = o.filter(Boolean).join(" ");
  return t && n ? `${t} ${i}` : i;
}
function En(e, t = !0) {
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: t }).format(e).replace(/\./g, "'").replace(/,/g, ".");
}
function Yn(e, t) {
  if (!t)
    return En(e);
  try {
    return new Intl.NumberFormat("de-DE", { currency: t, style: "currency" }).format(e).replace(/\./g, "'").replace(/,/g, ".");
  } catch {
    return `${En(e)} ${t}`;
  }
}
function hr(e) {
  if (e === "" || e === null || e === void 0)
    return "";
  const t = parseFloat(e);
  return isNaN(t) ? String(e) : String(Math.round(t * 1e4) / 1e4);
}
function gr(e) {
  const t = Math.max(0, Math.floor(e));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor(t % 86400 / 3600),
    m: Math.floor(t % 3600 / 60),
    s: t % 60
  };
}
function vr(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return Math.max(0, Math.floor(e));
  if (typeof e != "string" || e.trim() === "")
    return null;
  if (/^\d+$/.test(e.trim()))
    return parseInt(e.trim(), 10);
  const t = { d: 86400, h: 3600, m: 60, s: 1 };
  let n = 0, s = !1;
  for (const [, o, i] of e.matchAll(/(\d+)\s*([dhms])/gi))
    n += parseInt(o, 10) * t[i.toLowerCase()], s = !0;
  return s ? n : null;
}
function br(e, t) {
  const n = [];
  let s = 0;
  for (; s < e.length; ) {
    const u = e.charAt(s);
    if (u === " " || u === "	") {
      s++;
      continue;
    }
    if ("+-*/()".includes(u)) {
      n.push({ kind: u }), s++;
      continue;
    }
    if (u >= "0" && u <= "9" || u === ".") {
      let p = s;
      for (; p < e.length && (e[p] >= "0" && e[p] <= "9" || e[p] === "."); )
        p++;
      n.push({ kind: "num", value: parseFloat(e.substring(s, p)) }), s = p;
      continue;
    }
    if (u === "_" || /[a-zA-Z]/.test(u)) {
      let p = s;
      for (; p < e.length && /[a-zA-Z0-9_]/.test(e[p]); )
        p++;
      n.push({ kind: "id", name: e.substring(s, p) }), s = p;
      continue;
    }
    throw new Error(`Unexpected character in formula: ${u}`);
  }
  let o = 0;
  const i = () => n[o], r = (u) => {
    const p = n[o];
    if (!p || p.kind !== u)
      throw new Error(`Expected ${u}`);
    return o++, p;
  };
  function c() {
    let u = a();
    for (; i() && (i().kind === "+" || i().kind === "-"); ) {
      const p = n[o++].kind, y = a();
      u = p === "+" ? u + y : u - y;
    }
    return u;
  }
  function a() {
    let u = l();
    for (; i() && (i().kind === "*" || i().kind === "/"); ) {
      const p = n[o++].kind, y = l();
      u = p === "*" ? u * y : u / y;
    }
    return u;
  }
  function l() {
    const u = i();
    if (!u)
      throw new Error("Unexpected end of formula");
    if (u.kind === "-")
      return o++, -l();
    if (u.kind === "num")
      return o++, u.value;
    if (u.kind === "(") {
      o++;
      const p = c();
      return r(")"), p;
    }
    if (u.kind === "id")
      return o++, t(u.name);
    throw new Error(`Unexpected token: ${u.kind}`);
  }
  const d = c();
  if (o !== n.length)
    throw new Error("Trailing tokens in formula");
  return d;
}
function wr(e, t) {
  const n = Object.keys(e);
  if (n.length === 0)
    return "";
  if (t) {
    if (typeof e[t] == "string")
      return e[t];
    const o = t.split("_")[0], i = n.find((r) => r === o || r.startsWith(`${o}_`));
    if (i && typeof e[i] == "string")
      return e[i];
  }
  if (typeof e.default == "string")
    return e.default;
  const s = n.find((o) => typeof e[o] == "string");
  return s ? e[s] : "";
}
const Er = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
function $r(e) {
  const t = e.match(Er);
  return t ? t[1] : null;
}
function Sr(e) {
  if (e.thumbnail)
    return e.thumbnail;
  if (e["tn-oq"])
    return e["tn-oq"];
  const t = e.url ? $r(e.url) : null;
  return t ? `https://img.youtube.com/vi/${t}/hqdefault.jpg` : null;
}
const Be = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0;
function Xn(e, t) {
  var s, o, i, r;
  const n = (i = (o = (s = e._object) == null ? void 0 : s.model) == null ? void 0 : o.getAttributesDetails) == null ? void 0 : i.call(o);
  return (r = n == null ? void 0 : n[e._name]) == null ? void 0 : r[t];
}
function Qn(e) {
  const t = Xn(e, "unit"), n = Array.isArray(t) ? t[0] : t;
  return typeof n == "string" && n !== "" ? n : void 0;
}
const Cr = (e, t) => {
  const n = parseFloat(e.value);
  return Be(e.value) || isNaN(n) ? "" : `<p class="${e._name} bd-currency">${(t == null ? void 0 : t.labelHtml) ?? ""}${Yn(n, Qn(e))}</p>`;
}, Lr = (e, t) => Be(e.value) ? "" : `<p class="${e._name} bd-percentage">${(t == null ? void 0 : t.labelHtml) ?? ""}${be(hr(e.value))} <span class="bd-percentage-sign">%</span></p>`, xr = (e, t) => {
  const n = vr(e.value);
  if (n === null)
    return "";
  const s = gr(n), o = ["d", "h", "m", "s"].filter((r) => s[r] > 0), i = (o.length > 0 ? o : ["s"]).map(
    (r) => `<span class="bd-duration-part bd-duration-${r}"><span class="bd-duration-value">${s[r]}</span><span class="bd-duration-unit">${r}</span></span>`
  );
  return `<p class="${e._name} bd-duration">${(t == null ? void 0 : t.labelHtml) ?? ""}${i.join(" ")}</p>`;
}, kr = (e, t) => {
  if (Be(e.value))
    return "";
  const n = e.value;
  return `<div class="${e._name} bd-email">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="mailto:${qe(n)}">${be(n)}</a></p>
                </div>`;
}, Mr = (e, t) => {
  var a;
  if (Be(e.value))
    return "";
  const n = e.value, s = n.split("-"), o = (a = s[0]) != null && a.startsWith("+") ? s[0] : `+${s[0]}`, i = s.length === 2 ? wn(s[1], o, !0) : wn(n), r = n.replace(/[^\d+]/g, ""), c = s.length === 2 && !r.startsWith("+") ? `+${r}` : r;
  return `<div class="${e._name} bd-phone">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="tel:${qe(c)}">${be(i)}</a></p>
                </div>`;
}, Tr = (e, t) => Be(e.value) ? "" : `<div class="${e._name} bd-url">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <a href="${qe(e.value)}" target="_blank" rel="noopener noreferrer">${be(e.value)}</a>
                </div>`, Ar = (e, t) => {
  const n = e.value;
  return n != null && n.url ? `<p class="${e._name} bd-file">${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="${qe(n.url)}" target="_blank" rel="noopener noreferrer">${be(n.url)}</a></p>` : "";
}, _r = (e, t) => {
  const n = e.value;
  if (Be(n))
    return "";
  const s = typeof n == "object" ? wr(n, de == null ? void 0 : de.defaultLanguage) : String(n);
  return s === "" ? "" : `<p class="${e._name} bd-texti18n bd-text">${(t == null ? void 0 : t.labelHtml) ?? ""}${be(s)}</p>`;
}, Hr = (e, t) => {
  const n = typeof e.value == "string" ? { url: e.value } : e.value;
  if (!(n != null && n.url))
    return "";
  const s = Sr(n), o = s ? `<span class="bd-youtube-poster"><span class="bd-youtube-play"></span><img alt="" src="${qe(s)}" /></span>` : '<span class="bd-youtube-label">&#9654; YOUTUBE</span>';
  return `<div class="${e._name} bd-youtube bd-video">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <a href="${qe(n.url)}" target="_blank" rel="noopener noreferrer">${o}</a>
                </div>`;
}, Ir = (e, t) => {
  var d, u;
  const n = Xn(e, "formula"), s = typeof n == "string" && n !== "" ? n : e.value;
  if (Be(s) || typeof s != "string")
    return "";
  const o = s.replace(/^\s*=/, ""), i = ((d = e._object) == null ? void 0 : d._attributes) ?? {}, r = {};
  for (const p of Object.keys(i))
    r[p.toLowerCase()] = (u = i[p]) == null ? void 0 : u.value;
  let c;
  try {
    c = br(o, (p) => {
      const y = p.toLowerCase();
      if (!(y in r))
        throw new Error(`Unknown field in formula: ${p}`);
      const f = parseFloat(r[y]);
      return isNaN(f) ? 0 : f;
    });
  } catch {
    return `<p class="${e._name} bd-formula" title="${be(o)}"></p>`;
  }
  const a = Qn(e), l = a ? Yn(c, a) : String(c);
  return `<p class="${e._name} bd-formula" title="${be(o)}">${(t == null ? void 0 : t.labelHtml) ?? ""}${l}</p>`;
}, Or = (e, t) => Be(e.value) ? "" : `<p class="${e._name} bd-hex">${(t == null ? void 0 : t.labelHtml) ?? ""}${be(e.value)}</p>`, jr = {
  currency: Cr,
  percentage: Lr,
  duration: xr,
  email: kr,
  phone: Mr,
  url: Tr,
  file: Ar,
  texti18n: _r,
  youtube: Hr,
  formula: Ir,
  hex: Or
}, dt = (e, t) => `<p class="${`${e._name} bd-number`}">${(t == null ? void 0 : t.labelHtml) ?? ""}${e.value.toString()}</p>`, Ot = (e, t) => {
  const n = (e.value instanceof Array ? e.value : [e.value]).map(st);
  return n.length === 0 ? "" : `<p class="${`${t != null && t.isSince ? "since" : e._name} bd-text`}">${(t == null ? void 0 : t.labelHtml) ?? ""}${n.join(", ")}</p>`;
}, Nr = {
  int: dt,
  tinyint: dt,
  double: dt,
  float: dt,
  varchar: Ot,
  text: Ot,
  // The same chips as the tag input, read-only
  tag: (e, t) => {
    const n = xs(e.value);
    return n.length === 0 ? "" : `<div class="${e._name} bd-tag-view">${(t == null ? void 0 : t.labelHtml) ?? ""}${n.map((s) => `<span class="bd-tag-view-chip">${be(s)}</span>`).join(" ")}</div>`;
  },
  htmlText: (e, t) => `<div class="${`${e._name} bd-html`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    ${e.value}
                </div>`,
  // Unlike htmlText (trusted rich text, rendered raw), markdown is authored
  // plain text: the renderer escapes the whole source before transforming,
  // so this is safe for untrusted input by construction.
  markdown: (e, t) => typeof e.value != "string" || e.value === "" ? "" : `<div class="${`${e._name} bd-markdown`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    ${Zn(e.value)}
                </div>`,
  boolean: (e, t) => `<div class="${`${e._name} bd-boolean ${e.value === !0 ? "icon-true" : "icon-false"}`}">
                ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}</div>`,
  datetime: (e, t) => {
    const n = de != null && de.formatDates && typeof e.toFormatted == "function" ? e.toFormatted(de == null ? void 0 : de.defaultLanguage) : e.value;
    return `<div class="${`${e._name} bd-datetime`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${n}</p>
                </div>`;
  },
  date: (e, t) => {
    const n = de != null && de.formatDates && typeof e.toFormatted == "function" ? e.toFormatted(de == null ? void 0 : de.defaultLanguage) : e.value;
    return `<div class="${`${e._name} bd-date`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${n}</p>
                </div>`;
  },
  enum: (e, t) => {
    const n = Ls(e), s = (de == null ? void 0 : de.defaultLanguage) ?? "en", o = (e.value instanceof Array ? e.value : [e.value]).map(st), i = o.map((a) => typeof a == "string" && a ? _n(n == null ? void 0 : n.options_labels, a, s, a) : a);
    if (i.length === 0)
      return "";
    const r = o.filter((a) => a != null && a !== ""), c = r.length > 0 ? ` data-value="${be(r.join(","))}"` : "";
    return `<div class="${`${e._name} bd-enum`}"${c}>
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${i.map((a) => be(a)).join(", ")}</p>
                </div>`;
  },
  json: (e, t) => {
    const n = JSON.stringify(e.value, null, 2) ?? "";
    return `<div class="${`${e._name} bd-json`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <pre>${n}</pre>
                </div>`;
  },
  code: (e, t) => {
    var s;
    const n = ((s = e.value) == null ? void 0 : s.content) ?? "";
    return `<div class="${`${e._name} bd-code`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <pre>${n}</pre>
                </div>`;
  },
  image: (e, t) => {
    const n = (e.value instanceof Array ? e.value : [e.value]).map((s) => st(s)).filter((s) => s && s.base && s.sd);
    return n.length === 0 ? "" : `<div class="${`${e._name} bd-image`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    ${n.map((s) => `<img alt="" width="100%" src="${s.base + s.sd.substring(1)}" />`).join(`
`)}
                </div>`;
  },
  video: (e, t) => {
    const n = e.value;
    return n != null && n.url ? `<div class="${`${e._name} bd-video`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <video controls>
                        <source src="${n.url}">
                        Your browser does not support the video tag.
                    </video>
                </div>` : "";
  },
  // The address text; the location hydrator adds the map (see addLocationMap)
  location: (e, t) => {
    const n = e.value;
    if (!n)
      return "";
    const s = n.address ?? [n.street, n.street_number, n.city, n.country].filter(Boolean).join(" "), o = !!(n.lat && n.lng);
    if (!s && !o)
      return "";
    const i = o ? ` data-lat="${be(n.lat)}" data-lng="${be(n.lng)}"` : "";
    return `<div class="${`${e._name} bd-location`}"${i}>${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}${s ? `<span class="bd-location-address">${be(s)}</span>` : ""}</div>`;
  },
  // currency, percentage, duration, email, phone, url, file, translations,
  // YouTube, formula and hex: the renderings adopted from blitzdata-web
  ...jr
}, Dr = (e, t) => {
  const n = e.value;
  return n == null || n === "" ? "" : typeof n == "object" && !Array.isArray(n) ? `<div class="${`${e._name} bd-json`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <pre>${JSON.stringify(n, null, 2) ?? ""}</pre>
                </div>` : Ot(e, t);
}, qr = Dr, jt = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new Set();
let Qe = null;
function Pr() {
  Qe || typeof MutationObserver > "u" || (Qe = new MutationObserver((e) => {
    for (const t of e)
      for (const n of Array.from(t.removedNodes))
        if (n instanceof Element)
          for (const s of Array.from(rt))
            (n === s || n.contains(s)) && (s.isConnected || Gn(s));
  }), Qe.observe(document.documentElement, { childList: !0, subtree: !0 }));
}
function Gn(e) {
  const t = jt.get(e);
  jt.delete(e), rt.delete(e);
  try {
    t && t();
  } catch (n) {
    console.error("Hydrator teardown error:", (n == null ? void 0 : n.stack) ?? (n == null ? void 0 : n.message) ?? n);
  }
  rt.size === 0 && Qe && (Qe.disconnect(), Qe = null);
}
function Fr(e) {
  for (const t of Array.from(rt))
    (e === t || e.contains(t)) && Gn(t);
}
function es(e, t, n) {
  const s = t(e, n);
  typeof s == "function" && (jt.set(e, s), rt.add(e), Pr());
}
function Vr(e, t) {
  var o, i, r, c, a;
  const n = (r = (i = (o = t._object) == null ? void 0 : o.model) == null ? void 0 : i.getName) == null ? void 0 : r.call(i), s = (a = (c = t._object) == null ? void 0 : c._blitzID) == null ? void 0 : a.value;
  return !n || !s ? !1 : (e.setAttribute("data-bd-hydrate", ""), e.setAttribute("data-bd-model", n), e.setAttribute("data-bd-id", s), e.setAttribute("data-bd-attr", t._name), !0);
}
async function zr(e, t, n) {
  const s = Array.from(e.querySelectorAll("[data-bd-hydrate]"));
  for (const o of s) {
    const { bdModel: i, bdId: r, bdAttr: c } = o.dataset;
    if (!(!i || !r || !c))
      try {
        const a = await ke._Model.get(i), l = await (a == null ? void 0 : a.get(r)), d = l == null ? void 0 : l[c];
        if (!d) {
          n(`hydrate: could not resolve ${i}.${c} (id ${r}) — shell left static`);
          continue;
        }
        const u = t(d);
        u && es(o, u, d);
      } catch (a) {
        n(`hydrate failed for ${i}.${c}: ${a.message}`);
      }
  }
}
function ts(e) {
  const t = [];
  return e instanceof Array ? t.push(...e) : Object.hasOwn(e, "_attributes") ? t.push(
    ...Object.values(e._attributes).filter((n) => !n._name.startsWith("_") && !n._name.startsWith("@"))
  ) : t.push(e), t.filter((n) => n.value != null && n.value !== "");
}
async function Nt(e) {
  const t = await ke._Model.get(e).then((n) => n == null ? void 0 : n.getAttributesDetails());
  if (t) {
    for (const n in t)
      if (typeof t[n].type == "string" && ["varchar", "text"].includes(t[n].type))
        return n;
  }
  return "_blitzID";
}
function ns(e, t, n, s) {
  var r, c;
  return typeof n == "boolean" && n === !0 || Array.isArray(n) && n.includes(t) ? t.startsWith("since:") ? `<b class="bd-label">${t.split("since:")[1]}: </b>` : `<b class="bd-label">${Je((r = e[t]) == null ? void 0 : r["label-int"], (c = e[t]) == null ? void 0 : c.label, s, t)}: </b>` : "";
}
async function ss(e, t) {
  var a, l, d;
  if (!e)
    throw new Error("Missing attribute(s)!");
  const { labelLanguage: n, enableLabels: s } = t ?? {}, o = n ?? (de == null ? void 0 : de.defaultLanguage) ?? "en", i = ts(e), r = i.length > 0 ? ((l = (a = i[0]._object) == null ? void 0 : a.model) == null ? void 0 : l.getAttributesDetails()) ?? {} : {}, c = [];
  for (const u of i) {
    if (u._name.startsWith("_")) {
      c.push(u.value ?? "");
      continue;
    }
    const p = u._name === "since";
    if (!p && !r[u._name])
      continue;
    const y = u._name.endsWith("_fk"), f = u._name.endsWith("_mtm"), m = ns(r, u._name, s, o);
    if (y || f) {
      const b = await Nt(u._type);
      if (y) {
        const g = await u.getObject();
        (d = g == null ? void 0 : g[b]) != null && d.value && c.push(`<div class="${`${u._name} bd-fk`}">
                        <p>${m + g[b].value}</p>
                    </div>`);
        continue;
      } else if (f) {
        if (!(u.value instanceof Array))
          continue;
        const g = (await u.getObjects()).filter((v) => {
          var $;
          return ($ = v[b]) == null ? void 0 : $.value;
        });
        if (g.length === 0)
          continue;
        c.push(`<div class="${`${u._name} bd-mtm`}">
                    ${m ? `<p>${m}</p>` : ""}${g.map((v) => `<div class="fk-item">
                            <p>${v[b].value}</p>
                        </div>`).join(`
`)}
                </div>`);
        continue;
      }
    }
    const E = (this && typeof this.resolveReadonlyString == "function" ? this : Pe).resolveReadonlyString(u, { serialized: !0, labelHtml: m, isSince: p });
    E && c.push(E);
  }
  return c.length === 0 ? null : c.join(`
`);
}
async function os(e, t, n, s) {
  const o = de == null ? void 0 : de.locationMap, i = o === "none" ? "none" : s ? "showMap" : o ?? "mapOnClick", r = s ?? (de == null ? void 0 : de.googleMapsApiKey) ?? null;
  if (i === "none" || !r && !Jt())
    return !1;
  const c = async () => {
    const p = await (r ? ks(t, n, r) : po(t, n)).catch(() => null);
    return p && e.appendChild(p), p;
  };
  if (i === "showMap")
    return !!await c();
  let a = e.querySelector(".bd-location-address");
  a || (a = Object.assign(document.createElement("span"), { className: "bd-location-address", textContent: "Show map" }), e.appendChild(a)), a.classList.add("bd-location-toggle"), a.setAttribute("role", "button"), a.setAttribute("tabindex", "0"), a.setAttribute("aria-expanded", "false"), a.title = "Show map";
  let l = null, d = !1;
  const u = async (p) => {
    p.stopPropagation(), p.preventDefault(), l ? l.hidden = !l.hidden : d || (d = !0, l = await c(), d = !1);
    const y = !!(l && !l.hidden);
    a.setAttribute("aria-expanded", String(y)), a.title = y ? "Hide map" : "Show map";
  };
  return a.addEventListener("click", u), a.addEventListener("keydown", (p) => {
    (p.key === "Enter" || p.key === " ") && u(p);
  }), !0;
}
const Rr = {
  location: async (e, t, { googleMapsApiKey: n }) => {
    const s = t.value;
    return !(s != null && s.lat) || !(s != null && s.lng) ? !1 : os(e, s.lat, s.lng, n);
  }
};
async function Yt(e, t) {
  var h, E;
  if (!e)
    throw new Error("Missing attribute(s)!");
  const { labelLanguage: n, enableLabels: s, googleMapsApiKey: o, status: i, statusScope: r } = t ?? {}, c = (b) => {
    var v;
    const g = this && typeof this.resolveReadonlyElement == "function" ? this : Pe;
    (v = g == null ? void 0 : g.warn) == null || v.call(g, b);
  };
  let a = !1;
  const l = (b, g) => {
    if (i) {
      if (!r) {
        a || c("getHtmlElement: `status: true` without a `statusScope` — the badge would outlive the element it paints, so no badge was attached"), a = !0;
        return;
      }
      r.attach(b, g);
    }
  }, d = ts(e), u = d.length > 0 ? ((E = (h = d[0]._object) == null ? void 0 : h.model) == null ? void 0 : E.getAttributesDetails()) ?? {} : {}, p = n ?? (de == null ? void 0 : de.defaultLanguage) ?? "en", y = o ?? null, f = (b) => ns(u, b, s, p), m = [];
  for (const b of d) {
    const g = b._name.startsWith("since:");
    if (!g && !u[b._name])
      continue;
    const v = b._name.endsWith("_fk"), $ = b._name.endsWith("_mtm"), q = f(b._name);
    if (v) {
      const O = document.createElement("div");
      O.className = `${b._name} bd-fk`, Nt(b._type).then(async (H) => {
        var w;
        const j = await b.getObject();
        (w = j == null ? void 0 : j[H]) != null && w.value && (O.innerHTML = `<p>${q + j[H].value}</p>`);
      }).catch((H) => c(`${b._name}: fk label unresolved — ${(H == null ? void 0 : H.message) ?? H}`)), m.push(O), l(O, b);
      continue;
    } else if ($) {
      if (!(b.value instanceof Array))
        continue;
      const O = document.createElement("div");
      O.className = `${b._name} bd-mtm`, O.innerHTML = (q ? `<p>${q}</p>` : "") + b.value.map((H) => `<div class="fk-item">
                    <p data-id="${H._blitzID}"></p>
                </div>`).join(`
`), Nt(b._type).then(async (H) => {
        var T;
        const j = await b.getObjects(), w = Array.from(O.querySelectorAll("p"));
        for (const z of j) {
          const C = w.find((A) => A.getAttribute("data-id") === z._blitzID.value);
          C && ((T = z[H]) != null && T.value) && (C.innerHTML = z[H].value);
        }
      }).catch((H) => c(`${b._name}: mtm labels unresolved — ${(H == null ? void 0 : H.message) ?? H}`)), m.push(O), l(O, b);
      continue;
    }
    const S = this && typeof this.resolveReadonlyElement == "function" ? this : Pe;
    let I = S.resolveReadonlyElement(b, { labelHtml: q, isSince: g });
    if (I && b._type === "location") {
      const { render: O, layer: H } = S.resolveView(b);
      H === 0 && typeof O(b, { labelHtml: q, isSince: g }) == "string" && !await Rr.location(I, b, { googleMapsApiKey: y }) && !I.querySelector(".bd-location-address") && (I = null);
    }
    I && m.push(I), I && !g && l(I, b);
  }
  if (m.length === 0)
    return null;
  if (m.length === 1)
    return m[0];
  {
    const b = document.createElement("div");
    for (const g of m)
      b.append(g);
    return b;
  }
}
async function Br(e, t, n) {
  if (!e)
    throw new Error("Missing attribute(s)!");
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let o = 0;
  const i = async () => {
    const a = ++o, l = await Yt(e);
    return a !== o || (s.innerHTML = "", l && s.append(l)), l;
  };
  if (!await i())
    throw new Error("Attribute not supported!");
  const c = [];
  if (n) {
    const a = Array.isArray(e) ? e : Object.hasOwn(e, "_attributes") ? Object.values(e._attributes).filter((l) => !l._name.startsWith("_") && !l._name.startsWith("@")) : [e];
    for (const l of a)
      l.value !== void 0 && typeof l.subscribe == "function" && c.push(l.subscribe(() => i(), !1));
  }
  return {
    destroy: () => {
      for (const a of c)
        a();
      o++;
    }
  };
}
const Ur = ["boolean", "datetime", "date", "image", "video", "file"];
function rs(e, t, n) {
  var me;
  if (!e)
    throw new Error("Missing model!");
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    attributes: o,
    presetValues: i = {},
    requiredAttributes: r = [],
    requireAll: c,
    withLabels: a,
    validationMessages: l,
    successMessage: d,
    listEmptyMsg: u,
    addButtonLabel: p,
    labelLanguage: y,
    defaultDialCode: f,
    googleMapsApiKey: m,
    locationFieldsExpand: h,
    onSuccess: E,
    onServerSuccess: b
  } = n ?? {};
  s.innerHTML = `<div class="bd-addform ${e.getName() ?? ""}"></div>`;
  const g = s.querySelector(".bd-addform"), v = y ?? (de == null ? void 0 : de.defaultLanguage) ?? "en", $ = e.getAttributesDetails() ?? {}, q = Array.isArray(o) ? o : Object.keys($), S = (W) => Je($[W]["label-int"], $[W].label, v, W), I = (Pe ?? ke.ui).kernel, O = (Pe ?? ke.ui).services, H = { image: 0, video: 0, file: 0 }, j = (W, Q) => async (J, ue) => {
    H[W]++;
    try {
      return await Q(J, ue);
    } finally {
      H[W]--;
    }
  }, w = {
    ...O,
    upload: j("image", O.upload),
    uploadVideo: j("video", O.uploadVideo),
    uploadFile: j("file", O.uploadFile)
  };
  let T = !1, z = [];
  const C = (W) => {
    T ? W() : z.push(W);
  }, A = {};
  for (const W of q) {
    if (!$[W])
      continue;
    const Q = $[W], J = Array.isArray(Q.type) ? Q.type[0] : Q.type, ue = Array.isArray(Q.type), pe = c || r.includes(W), ge = a || Ur.includes(J) ? S(W) + (pe ? " *" : "") : void 0, V = Ts(A, W, Q, e, {
      className: W,
      label: ge,
      placeholder: `${S(W)}...`,
      ...f ? { defaultDialCode: f } : {},
      ...m ? { apiKey: m } : {},
      ...h !== void 0 ? { initialExpand: h } : {},
      ...u && ue && ["varchar", "text"].includes(J) ? { emptyMsg: u } : {}
    });
    V.services = w;
    const M = I.resolveForPort(V);
    A[W] = i[W] ?? Q.default ?? ((me = M.default) == null ? void 0 : me.call(M)) ?? void 0, V.value = A[W];
    const P = document.createElement("div");
    g.append(P), I.mount(V, P, "write").then(C).catch((L) => console.error(`"${W}" Add field error:`, (L == null ? void 0 : L.stack) ?? (L == null ? void 0 : L.message)));
  }
  const R = document.createElement("button");
  R.innerText = p ?? "Add", R.className = "add-btn", g.append(R);
  const K = (W) => {
    var Q;
    if (R.disabled = W, R.classList.toggle("loading", W), W) {
      if (!R.querySelector(".add-btn-spinner")) {
        const J = document.createElement("span");
        J.className = "add-btn-spinner", R.append(J);
      }
    } else
      (Q = R.querySelector(".add-btn-spinner")) == null || Q.remove();
  };
  R.onclick = async () => {
    if (H.image > 0) {
      alert((l == null ? void 0 : l.imageUploading) || "Please wait until images are uploaded!");
      return;
    }
    if (H.video > 0) {
      alert((l == null ? void 0 : l.videoUploading) || "Please wait until video is uploaded!");
      return;
    }
    if (H.file > 0) {
      alert((l == null ? void 0 : l.fileUploading) || "Please wait until file is uploaded!");
      return;
    }
    if (c || r.length > 0) {
      const pe = (c ? q : r).filter((ge) => A[ge] == null);
      if (pe.length > 0) {
        alert(((l == null ? void 0 : l.missingFields) || "Missing fields: ") + pe.map((ge) => S(ge)).join(", "));
        return;
      }
    }
    const W = await e.add(A);
    if (!W) {
      alert((l == null ? void 0 : l.unexpectedError) || "Unexpected error! Please try again");
      return;
    }
    const Q = d ?? "Item was added successfully!", J = () => g.innerHTML = `<p class="success-msg">${Q}</p>`;
    if (b || (X(!1), J()), E && E(W), b) {
      const ue = W._blitzID.value;
      K(!0);
      let pe = !1;
      const ge = (M) => {
        if (!(pe || M.transaction.action !== "add")) {
          if (M.status === F.Completed)
            pe = !0, W.removeEventListener("syncStatusChange", ge), K(!1), X(!1), J(), b(W);
          else if (M.status === F.Failed) {
            pe = !0, W.removeEventListener("syncStatusChange", ge), K(!1);
            const P = "Error: " + (M.message ?? "Add failed! Please try again.");
            alert(P), console.error(P);
          }
        }
      };
      W.addEventListener("syncStatusChange", ge);
      const V = (await ke.queue.getJobsForObject(ue))[0];
      V && ge(V);
    }
  };
  const X = (W = !0) => {
    T = !0;
    for (const Q of z)
      Q();
    z = [], W && (s.innerHTML = "");
  };
  return { destroy: X };
}
const At = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
let Wr = 0, $n = 0;
function et(e, t) {
  const { titleElm: n, closeElm: s, onEscape: o } = t;
  e.setAttribute("role", "dialog"), e.setAttribute("aria-modal", "true"), n && (n.id || (n.id = `bd-dialog-title-${++Wr}`), e.setAttribute("aria-labelledby", n.id)), s && (s.setAttribute("role", "button"), s.setAttribute("aria-label", "Close"), s.tabIndex = 0, s.addEventListener("keydown", (d) => {
    d.key !== "Enter" && d.key !== " " || (d.preventDefault(), s.click());
  }));
  const i = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  e.tabIndex = -1, (e.querySelector(At) ?? e).focus(), ++$n === 1 && (document.body.style.overflowY = "hidden");
  const r = () => {
    const d = document.querySelectorAll('[data-bd-portal][role="dialog"]');
    return d[d.length - 1] === e;
  }, c = (d) => {
    const u = d instanceof Element ? d.closest("[data-bd-portal]") : null;
    return !!u && u !== e;
  }, a = (d) => {
    if (!r() || c(d.target))
      return;
    if (d.key === "Escape") {
      o == null || o();
      return;
    }
    if (d.key !== "Tab")
      return;
    const u = [...e.querySelectorAll(At)];
    if (!u.length) {
      d.preventDefault(), e.focus();
      return;
    }
    const p = document.activeElement instanceof HTMLElement ? u.indexOf(document.activeElement) : -1;
    if (p === -1) {
      d.preventDefault(), u[0].focus();
      return;
    }
    d.shiftKey && p === 0 ? (d.preventDefault(), u[u.length - 1].focus()) : !d.shiftKey && p === u.length - 1 && (d.preventDefault(), u[0].focus());
  }, l = (d) => {
    !r() || c(d.target) || d.target instanceof Node && e.contains(d.target) || (e.querySelector(At) ?? e).focus();
  };
  return document.addEventListener("keydown", a), document.addEventListener("focusin", l), () => {
    document.removeEventListener("keydown", a), document.removeEventListener("focusin", l), --$n === 0 && (document.body.style.overflowY = ""), i != null && i.isConnected && i.focus();
  };
}
function Jr(e, t) {
  if (!e)
    throw new Error("Missing model!");
  const { onSuccess: n, title: s, closeOnCompletion: o, closeTimeout: i, ...r } = t ?? {}, c = i ?? 2, a = document.createElement("div");
  a.className = "bd-addmodal", a.setAttribute("data-bd-portal", "");
  const l = document.createElement("div");
  l.className = "box", l.innerHTML = `
        <div class="heading">
            <h2 class="title">${s ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="form"></div>
        <div class="close-timer" style="display: none;">
            <div class="bar"></div>
        </div>
    `;
  const d = l.querySelector(".close-btn"), u = l.querySelector(".close-timer"), p = l.querySelector(".close-timer .bar"), y = l.querySelector(".form");
  p.style.animation = `bd-addmodal-expand ${c}s linear`;
  const { destroy: f } = rs(
    e,
    y,
    {
      ...r,
      onSuccess: (b) => {
        n && n(b), o && (u.style.display = "block", setTimeout(() => {
          m || E();
        }, c * 1e3));
      }
    }
  );
  let m = !1, h = null;
  const E = () => {
    m = !0, h == null || h(), f(), a.remove();
  };
  return d.onclick = () => E(), a.onclick = (b) => {
    b && b.target !== b.currentTarget || E();
  }, a.append(l), document.body.append(a), h = et(a, {
    titleElm: l.querySelector(".title"),
    closeElm: d,
    onEscape: () => E()
  }), { destroy: E };
}
async function is(e, t, n, s) {
  const o = s ?? Pe, i = (l) => o ? o.getHTML(l) : ss(l);
  let r = t;
  const c = [
    // Find UI variables
    ...Array.from(r.matchAll(/\{\{([\w.]+)\}\}/g)).map((l) => ({ type: "ui", key: l[1], searchValue: `{{${l[1]}}}` })),
    // Find value variables
    ...Array.from(r.matchAll(/\[\[([\w.]+)\]\]/g)).map((l) => ({ type: "value", key: l[1], searchValue: `[[${l[1]}]]` }))
  ];
  for (const l of c)
    try {
      const { type: d, key: u, searchValue: p } = l;
      let y = e, f = u;
      const m = u.split(".");
      if (f === "since") {
        if (e._publishingdate && typeof e._publishingdate.toRelative == "function") {
          const h = e._publishingdate.toRelative(n == null ? void 0 : n.labelLanguage);
          if (h) {
            const E = new mt("since", "varchar", h);
            E.withObject(y);
            const b = await i(E);
            r = r.replaceAll(p, () => b ?? "");
            continue;
          }
        }
        r = r.replaceAll(p, "");
        continue;
      }
      if (m.length === 2) {
        if (e[m[0]] && typeof e[m[0]].value == "object" && e[m[0]].value !== null && Object.hasOwn(e[m[0]].value, m[1])) {
          if (d === "ui") {
            const E = new mt(m[0], "varchar", e[m[0]].value[m[1]]);
            E.withObject(y);
            const b = await i(E);
            r = r.replaceAll(p, () => b ?? "");
          } else
            r = r.replaceAll(p, () => e[m[0]].value[m[1]] ?? "");
          continue;
        }
        if (!e[m[0]] || typeof e[m[0]].getObject != "function") {
          r = r.replaceAll(p, "");
          continue;
        }
        const h = await e[m[0]].getObject();
        if (!h) {
          r = r.replaceAll(p, "");
          continue;
        }
        y = h, f = m[1];
      }
      if (!y._attributes.hasOwnProperty(f)) {
        r = r.replaceAll(p, "");
        continue;
      }
      if (d === "ui") {
        const h = await i(y[f]);
        r = r.replaceAll(p, () => h ?? "");
      } else
        r = r.replaceAll(p, () => y[f].value ?? "");
    } catch (d) {
      console.error("Template render error:", d.stack ?? d.message);
    }
  const a = document.createElement("div");
  a.innerHTML = r;
  for (const l of Array.from(a.querySelectorAll(".bd-location[data-lat][data-lng]")))
    await os(l, l.dataset.lat, l.dataset.lng, n == null ? void 0 : n.googleMapsApiKey);
  return o && await o.hydrate(a), a;
}
async function as(e, t, n, s) {
  const o = s ?? Pe, i = (a, l) => o ? o.getHtmlElement(a, l) : Yt(a, l), r = [], c = t && t.length > 0 ? t : Object.keys(e._attributes);
  for (const a of c)
    try {
      let l = e, d = a;
      const u = a.split(".");
      if (u.length === 2) {
        if (e[u[0]] && typeof e[u[0]].value == "object" && e[u[0]].value !== null && Object.hasOwn(e[u[0]].value, u[1])) {
          const f = new mt(u[0], "varchar", e[u[0]].value[u[1]]);
          f.withObject(l);
          const m = await i(f, n);
          m && (m.classList.remove(u[0]), m.classList.add(`${u[0]}-${u[1]}`), r.push(m));
          continue;
        }
        if (!e[u[0]] || typeof e[u[0]].getObject != "function")
          continue;
        const y = await e[u[0]].getObject();
        if (!y)
          continue;
        l = y, d = u[1];
      }
      if (!l._attributes.hasOwnProperty(d) || l[d]._name.startsWith("_") || l[d]._name.startsWith("@"))
        continue;
      const p = await i(l[d], n);
      p && r.push(p);
    } catch (l) {
      console.error("Attribute render error:", l.stack ?? l.message);
    }
  if (n != null && n.sinceLabel)
    try {
      if (e._publishingdate && typeof e._publishingdate.toRelative == "function") {
        const a = e._publishingdate.toRelative(n == null ? void 0 : n.labelLanguage);
        if (a) {
          const l = new mt("since:" + n.sinceLabel, "varchar", a);
          l.withObject(e);
          const d = await i(l, n);
          d && r.push(d);
        }
      }
    } catch (a) {
      console.error("Since attribute render error:", a.stack ?? a.message);
    }
  if (r.length === 0)
    return null;
  {
    const a = document.createElement("div");
    for (const l of r)
      a.append(l);
    return a;
  }
}
function Sn(e) {
  const t = [];
  let n = "";
  for (const s of e.split(/(\s+)/))
    s !== "" && (/^\s+$/.test(s) ? t.length ? t[t.length - 1].sep += s : n += s : t.push({ word: s, sep: "" }));
  return { lead: n, tokens: t };
}
function Ye(e, t, n) {
  if (t === "")
    return;
  const s = e[e.length - 1];
  s && s.changed === n ? s.text += t : e.push({ text: t, changed: n });
}
function Kr(e, t) {
  const n = Sn(e), s = Sn(t), o = { before: [], after: [], replaced: !0 };
  Ye(o.before, n.lead, !1), Ye(o.after, s.lead, !1);
  const i = /* @__PURE__ */ new Map(), r = (a, l, d, u, p) => {
    if (d >= u)
      return;
    Ye(a, i.get(a) ?? "", !1), i.set(a, "");
    let y = "";
    for (let f = d; f < u; f++)
      y += l[f].word, f < u - 1 ? y += l[f].sep : i.set(a, l[f].sep);
    Ye(a, y, p);
  }, c = (a, l, d, u) => {
    const p = /* @__PURE__ */ new Map();
    for (let E = a; E < l; E++) {
      const b = p.get(n.tokens[E].word);
      b ? b.push(E) : p.set(n.tokens[E].word, [E]);
    }
    let y = /* @__PURE__ */ new Map(), f = 0, m = 0, h = 0;
    for (let E = d; E < u; E++) {
      const b = /* @__PURE__ */ new Map();
      for (const g of p.get(s.tokens[E].word) ?? []) {
        const v = (y.get(g - 1) ?? 0) + 1;
        b.set(g, v), v > h && (h = v, f = g - v + 1, m = E - v + 1);
      }
      y = b;
    }
    if (h === 0) {
      r(o.before, n.tokens, a, l, !0), r(o.after, s.tokens, d, u, !0);
      return;
    }
    o.replaced = !1, c(a, f, d, m), r(o.before, n.tokens, f, f + h, !1), r(o.after, s.tokens, m, m + h, !1), c(f + h, l, m + h, u);
  };
  return c(0, n.tokens.length, 0, s.tokens.length), Ye(o.before, i.get(o.before) ?? "", !1), Ye(o.after, i.get(o.after) ?? "", !1), o;
}
const Zr = "@NULL", _t = { known: !1, value: null };
function Ht(e) {
  if (e == null || e === Zr)
    return null;
  if (typeof e == "string")
    return e;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}
function gt(e) {
  const t = e == null ? void 0 : e.data;
  if (t && typeof t == "object")
    return t;
  if (typeof t != "string" || t === "")
    return null;
  try {
    const n = JSON.parse(t);
    return n && typeof n == "object" ? n : null;
  } catch {
    return null;
  }
}
function Yr(e) {
  if (!e)
    return null;
  for (const t of Object.keys(e))
    return t;
  return null;
}
function Dt(e) {
  return e != null && e.attribute ? e.attribute : Yr(gt(e));
}
function ls(e) {
  var s;
  const t = Dt(e);
  if (!t)
    return null;
  const n = (s = gt(e)) == null ? void 0 : s[t];
  return n && typeof n == "object" && n.path ? String(n.path) : null;
}
function cs(e, t) {
  var i;
  const n = e[t];
  if (!n || n.action === "add")
    return _t;
  const s = Dt(n);
  if (!s)
    return _t;
  const o = (i = gt(n)) == null ? void 0 : i[s];
  if (o && typeof o == "object" && "prev" in o)
    return { known: !0, value: Ht(o.prev) };
  for (let r = t + 1; r < e.length; r++) {
    const c = e[r];
    if (c.action === "add") {
      const a = gt(c);
      if (a && s in a) {
        const l = a[s];
        return {
          known: !0,
          value: Ht(l && typeof l == "object" && "new" in l ? l.new : l)
        };
      }
      continue;
    }
    if (Dt(c) === s)
      return { known: !0, value: Ht(c.newValue) };
  }
  return _t;
}
function xt(e, t, n = {}) {
  if (!e)
    throw new Error("mountObjectHistory: missing object");
  const s = typeof t == "string" ? document.getElementById(t) ?? document.querySelector(t) : t;
  if (!s)
    throw new Error("mountObjectHistory: container not found");
  const o = s, i = n.emptyMessage ?? "No history yet!", r = n.attributeLabel ?? ((w) => w), c = typeof e.history == "function";
  o.classList.add("bd-oh");
  let a = [], l = !0, d = null, u = !1, p = null;
  const y = (w) => {
    const T = Number(w);
    return Number.isFinite(T) ? ft(T).toLocaleString() : w;
  }, f = [
    [60, "minute"],
    [60, "hour"],
    [24, "day"],
    [7, "week"],
    [4.35, "month"],
    [12, "year"]
  ], m = (w) => {
    const T = Number(w);
    if (!Number.isFinite(T))
      return w;
    let z = (ft(T).getTime() - Date.now()) / 1e3, C = "second";
    for (const [A, R] of f) {
      if (Math.abs(z) < A)
        break;
      z /= A, C = R;
    }
    return new Intl.RelativeTimeFormat(void 0, { numeric: "auto" }).format(Math.round(z), C);
  }, h = 140, E = 24, b = (w) => {
    if (w == null)
      return null;
    if (typeof w == "string")
      return w;
    try {
      return JSON.stringify(w);
    } catch {
      return String(w);
    }
  }, g = (w) => w.map((T) => T.changed ? le`<mark class="bd-oh-diff">${T.text}</mark>` : le`<span>${T.text}</span>`).join("");
  function v(w, T, z) {
    const C = fe(T ? g(T) : le`${w}`);
    return w.length <= h ? le`<span class="bd-oh-side bd-oh-${z}">${C}</span>` : le`<details class="bd-oh-side bd-oh-${z} bd-oh-fold">
            <summary>${w.slice(0, h)}… <span class="bd-oh-fold-meta">${String(w.length)} chars</span></summary>
            <span class="bd-oh-value">${C}</span>
        </details>`;
  }
  function $(w, T) {
    if (w.action === "add")
      return q(w);
    const z = b(w.newValue), C = cs(a, T), A = C.known ? C.value ?? "" : null;
    if (z == null && !C.known)
      return "";
    if (A == null)
      return le`<div class="bd-oh-change">
                <span class="bd-oh-side bd-oh-old bd-oh-unknown" title="The change was recorded without a previous value.">—</span>
                <span class="bd-oh-arrow">→</span>
                ${fe(v(z ?? "", null, "new"))}
            </div>`;
    const K = Math.max(A.length, (z ?? "").length) >= E ? Kr(A, z ?? "") : null, X = K && !K.replaced ? K : null;
    return le`<div class="bd-oh-change">
            ${fe(v(A, (X == null ? void 0 : X.before) ?? null, "old"))}
            <span class="bd-oh-arrow">→</span>
            ${fe(v(z ?? "", (X == null ? void 0 : X.after) ?? null, "new"))}
        </div>`;
  }
  function q(w) {
    let T = w.data;
    if (typeof T == "string")
      try {
        T = JSON.parse(T);
      } catch {
        T = null;
      }
    if (!T || typeof T != "object")
      return "";
    const z = Object.entries(T).filter(([C]) => !C.startsWith("_")).map(([C, A]) => [C, b((A == null ? void 0 : A.new) ?? A)]).filter(([, C]) => C != null && C !== "");
    return z.length ? le`<details class="bd-oh-created">
            <summary>${String(z.length)} value${z.length === 1 ? "" : "s"}</summary>
            <dl>${fe(z.map(([C, A]) => le`
                <dt>${r(C)}</dt><dd>${A.slice(0, h)}</dd>`).join(""))}</dl>
        </details>` : "";
  }
  function S(w, T) {
    const z = ls(w), C = z ? `.${z}` : "", A = w.attribute ? le`<span class="bd-oh-attribute" title="${w.attribute}${C}">${r(w.attribute)}${C}</span>` : "", R = w._userID ? `user ${w._userID}` : null;
    return le`<li class="bd-oh-entry">
            <span class="bd-oh-dot bd-oh-${w.action}"></span>
            <div class="bd-oh-entry-main">
                <div class="bd-oh-entry-top">
                    <span class="bd-oh-action">${w.action}</span>
                    ${fe(A)}
                    <span class="bd-oh-entry-meta">
                        ${fe(R ? le`<span class="bd-oh-who">${R}</span>` : "")}
                        <span title="${y(w.blitzstamp)}">${m(w.blitzstamp)}</span>
                    </span>
                </div>
                ${fe($(w, T))}
            </div>
        </li>`;
  }
  const I = 100;
  function O() {
    if (u)
      return;
    const w = a.length >= I ? le`<p class="bd-oh-cap">Showing the newest ${String(I)} changes.</p>` : "", T = l ? '<div class="bd-oh-spinner"></div>' : d ? le`<p class="bd-oh-error">${d}</p>` : a.length ? le`<ul class="bd-oh-entries">${fe(a.map(S).join(""))}</ul>${fe(w)}` : le`<p class="bd-oh-empty">${i}</p>`;
    o.innerHTML = le`
            <div class="bd-oh-banner">
                <h2>History</h2>
                <button class="bd-oh-refresh" title="Refresh">⟳</button>
            </div>
            <div class="bd-oh-body">${fe(T)}</div>`;
  }
  async function H() {
    if (!u) {
      if (l = !0, d = null, O(), !c)
        d = "Reading history requires @blitzdata.ts/core 1.11 or newer.";
      else {
        p == null || p.abort();
        const w = new AbortController();
        p = w;
        try {
          const T = await e.history(w.signal);
          if (u || w.signal.aborted)
            return;
          a = T;
        } catch (T) {
          if (u || w.signal.aborted)
            return;
          d = T.message;
        }
      }
      l = !1, O();
    }
  }
  function j(w) {
    w.target.closest(".bd-oh-refresh") && H();
  }
  return o.addEventListener("click", j), H(), {
    refresh: () => {
      H();
    },
    destroy: () => {
      u = !0, p == null || p.abort(), o.removeEventListener("click", j), o.classList.remove("bd-oh"), o.innerHTML = "";
    }
  };
}
async function ds(e, t, n) {
  if (!e)
    throw new Error("Missing object!");
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const { labelLanguage: o, enableLabels: i, sinceLabel: r, googleMapsApiKey: c, objectAttributes: a, template: l, history: d } = n ?? {};
  s.innerHTML = "";
  let u = null;
  if (l) {
    const f = typeof l == "function" ? l(e) : l;
    u = await is(e, f, { labelLanguage: o, googleMapsApiKey: c });
  } else {
    const f = typeof a == "function" ? a(e) : a;
    u = await as(e, f, { labelLanguage: o, enableLabels: i, sinceLabel: r, googleMapsApiKey: c });
  }
  u && (u.className = "bd-objectview " + (e._blitzID.value ?? ""), s.append(u));
  let p = null;
  if (d) {
    const f = document.createElement("details");
    f.className = "bd-objectview-history", f.innerHTML = '<summary>History</summary><div class="bd-objectview-history-body"></div>', f.addEventListener("toggle", () => {
      !f.open || p || (p = xt(
        e,
        f.querySelector(".bd-objectview-history-body"),
        typeof d == "object" ? d : {}
      ));
    }), s.append(f);
  }
  return { destroy: () => {
    p == null || p.destroy(), p = null, s.innerHTML = "";
  } };
}
function us(e, t) {
  if (!e)
    throw new Error("Missing object!");
  const { title: n, titleAttribute: s, mode: o, onOpen: i, onClose: r, ...c } = t ?? {}, a = n ?? (s ? e[s].value : void 0), l = document.createElement("div");
  l.className = "bd-objectview-modal", l.setAttribute("data-bd-portal", ""), o !== "fullscreen" && (l.style.cssText = "display: flex; justify-content: center; align-items: center; padding: 16px;");
  const d = document.createElement("div");
  d.className = o === "fullscreen" ? "box-full" : "box", d.onclick = (h) => h.stopPropagation(), d.innerHTML = `
        <div class="heading">
            <h2 class="title">${a ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="view"></div>
    `;
  const u = d.querySelector(".close-btn"), p = d.querySelector(".view");
  let y = null;
  ds(e, p, c).then(({ destroy: h }) => y = h).catch((h) => console.error("mountObjectViewModal: view failed to render:", h));
  let f = null;
  const m = () => {
    f == null || f(), typeof y == "function" && y(), l.remove(), r && r(e);
  };
  return l.onclick = () => m(), u.onclick = () => m(), l.append(d), document.body.append(l), f = et(l, {
    titleElm: d.querySelector(".title"),
    closeElm: u,
    onEscape: () => m()
  }), i && i(e), { destroy: m };
}
function ps(e, t, n) {
  let s = !1;
  const o = e.subscribeToList(t, (i) => {
    i.nextSource || (s = !0), n(i.items ?? [], s);
  }, !0);
  return () => {
    typeof o == "function" && o();
  };
}
function Xr(e, t, n, s) {
  if (!e)
    throw new Error("Missing model!");
  const o = typeof t == "string" ? document.getElementById(t) : t;
  if (!(o instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    objectAttributes: i,
    cardTemplate: r,
    labelLanguage: c,
    enableLabels: a,
    sinceLabel: l,
    googleMapsApiKey: d,
    allowDelete: u,
    enableObjectView: p,
    objectViewConfig: y,
    pagination: f,
    objectsPerPage: m = 10,
    noResultsMessage: h,
    slideIn: E,
    onObjectClick: b,
    onPageChange: g
  } = s ?? {};
  let v = [], $ = null, q = null, S = 1, I = Promise.resolve(), O = 0, H = !1, j = !1, w = !!E;
  o.innerHTML = `<div class="bd-list ${e.getName() ?? ""}">
        <div class="spinner"></div>
    </div>`;
  const T = o.querySelector(".bd-list"), z = () => {
    T.classList.remove("bd-list-slide-in"), T.offsetWidth, T.classList.add("bd-list-slide-in");
  };
  T.addEventListener("animationend", (me) => {
    me.target === T && T.classList.remove("bd-list-slide-in");
  });
  const C = ps(e, n, (me, W) => {
    v = me, j = W, X();
  }), A = () => {
    H = !0, C(), o.innerHTML = "";
  }, R = (me) => {
    $ = me, S = 1, X();
  }, K = (me) => {
    q = me, X();
  }, X = () => {
    const me = ++O, W = () => H || me !== O;
    I = I.then(async () => {
      if (W())
        return;
      const Q = [...v], J = typeof $ == "function" ? Q.filter($) : Q;
      typeof q == "function" && J.sort(q);
      const ue = f ? J.slice((S - 1) * m, S * m) : J, pe = Math.ceil(J.length / m), ge = document.createDocumentFragment();
      for (const M of ue) {
        const P = document.createElement("div");
        P.className = "card " + M._blitzID.value;
        let L = null;
        try {
          if (r) {
            const N = typeof r == "function" ? r(M) : r;
            L = await is(M, N, { labelLanguage: c, googleMapsApiKey: d }, this);
          } else {
            const N = typeof i == "function" ? i(M) : i;
            L = await as(M, N, { labelLanguage: c, enableLabels: a, sinceLabel: l, googleMapsApiKey: d }, this);
          }
        } catch (N) {
          console.error("Object render error:", N.stack ?? N.message);
        }
        if (L) {
          if (L.className = "attributes", P.append(L), (typeof b == "function" || p) && (L.onclick = () => {
            b && b(M), p && us(M, { labelLanguage: c, enableLabels: a, googleMapsApiKey: d, ...y });
          }), u) {
            const N = document.createElement("div");
            N.className = "delete-btn", N.onclick = () => {
              confirm("Are you sure?") && M.delete();
            }, P.append(N);
          }
          ge.append(P);
        }
      }
      if (W()) {
        Fr(ge);
        return;
      }
      const V = ge.childElementCount > 0 || j;
      if (ge.childElementCount === 0) {
        const M = document.createElement("template");
        M.innerHTML = j ? `<p class="empty">${h ?? "No results found!"}</p>` : '<div class="spinner"></div>', ge.append(M.content);
      }
      if (f && pe > 1) {
        const M = document.createElement("div");
        M.className = "pagination";
        for (let P = 1; P < pe + 1; P++) {
          const L = document.createElement("button");
          L.innerText = P.toString(), S === P && (L.className = "checked"), L.onclick = () => {
            S !== P && (S = P, E && (w = !0, T.classList.add("bd-list-switching")), g && g(S), X());
          }, M.append(L);
        }
        ge.append(M);
      }
      T.replaceChildren(ge), T.classList.remove("bd-list-switching"), w && V && (w = !1, z());
    }).catch((Q) => {
      console.error("List render error:", (Q == null ? void 0 : Q.stack) ?? (Q == null ? void 0 : Q.message) ?? Q);
    });
  };
  return {
    destroy: A,
    getObjects: () => v,
    updateFilter: R,
    updateSort: K
  };
}
function Xt(e, t) {
  var y;
  if (!e)
    throw new Error("mountObjectHistoryModal: missing object");
  const { title: n, onClose: s, ...o } = t ?? {}, i = n ?? `History of ${((y = e._blitzID) == null ? void 0 : y.value) ?? ""}`, r = document.createElement("div");
  r.className = "bd-oh-modal", r.setAttribute("data-bd-portal", "");
  const c = document.createElement("div");
  c.className = "box", c.onclick = (f) => f.stopPropagation(), c.innerHTML = `
        <div class="heading">
            <h2 class="title"></h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="panel"></div>
    `, c.querySelector(".title").textContent = i;
  const a = c.querySelector(".close-btn"), l = c.querySelector(".panel"), d = xt(e, l, o);
  let u = null;
  const p = () => {
    u == null || u(), d.destroy(), r.remove(), s && s(e);
  };
  return r.onclick = () => p(), a.onclick = () => p(), r.append(c), document.body.append(r), u = et(r, {
    titleElm: c.querySelector(".title"),
    closeElm: a,
    onEscape: () => p()
  }), { destroy: p };
}
function Qr(e, t, n, s) {
  var xe, Ce, Se;
  if (!e)
    throw new Error("Missing model!");
  const o = typeof t == "string" ? document.getElementById(t) : t;
  if (!(o instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const { headerLabel: i, labelLanguage: r, searchRow: c, actions: a, allowDelete: l, readonly: d, noResultsMessage: u, onRowClick: p, reorder: y, tree: f, status: m } = s ?? {}, h = e.getAttributesDetails() ?? {}, E = Object.keys(h).filter((k) => !k.startsWith("_")), b = r ?? ((xe = this.settings) == null ? void 0 : xe.language) ?? "en", g = (k) => {
    var D, U;
    return i ? i(k, h[k]) : Je((D = h[k]) == null ? void 0 : D["label-int"], (U = h[k]) == null ? void 0 : U.label, b, k);
  };
  let v = [], $ = !1, q = null, S = null, I = null, O = !0, H = !1, j = null;
  const w = {}, T = (k) => {
    var D, U;
    return ["1", !0].includes((U = (D = e._attributes) == null ? void 0 : D[k]) == null ? void 0 : U.value);
  }, C = T("hasprojects") && !!((Ce = n == null ? void 0 : n.conditions) != null && Ce.some((k) => (k == null ? void 0 : k[0]) === "project_fk" && (k == null ? void 0 : k[1]) === "=")) ? "_projectsort" : "_sort", A = y !== !1 && !d && T("hassort") && (!(n != null && n.customSort) || n.customSort === C) && (n == null ? void 0 : n.customSortDirection) !== "ASC", R = (k) => {
    var D;
    return Number(((D = k[C]) == null ? void 0 : D.value) ?? 0);
  };
  let K = null;
  const X = (k, D, U) => {
    var Ee, Le, ce, oe;
    const te = D[U - 1] ? R(D[U - 1]) : null, ee = D[U] ? R(D[U]) : null;
    let ve;
    te === null && ee === null || (te === null ? ve = ee + 10 : ee === null ? ve = te - 10 : ve = Math.floor((te + ee) / 2), te !== null && ee !== null && ve <= ee && (ve = te), ve !== R(k) && ((oe = (ce = (Le = (Ee = k[C]) == null ? void 0 : Ee.edit) == null ? void 0 : Le.call(Ee, String(ve))) == null ? void 0 : ce.then) == null || oe.call(ce, () => we())));
  }, me = f !== !1 && ((Se = h.parent_fk) == null ? void 0 : Se.type) === e.getName() ? "parent_fk" : null, W = me !== null, Q = /* @__PURE__ */ new Set(), J = (k) => String(k._blitzID.value), ue = (k) => {
    var U;
    const D = (U = k[me]) == null ? void 0 : U.value;
    return D == null || D === "" ? null : typeof D == "object" ? D._blitzID ?? null : String(D);
  }, pe = (k) => {
    const D = new Map(k.map((ce) => [J(ce), ce])), U = /* @__PURE__ */ new Map(), te = [];
    for (const ce of k) {
      const oe = ue(ce);
      oe !== null && oe !== J(ce) && D.has(oe) ? U.has(oe) ? U.get(oe).push(ce) : U.set(oe, [ce]) : te.push(ce);
    }
    const ee = (ce, oe) => R(oe) - R(ce);
    te.sort(ee);
    for (const ce of U.values())
      ce.sort(ee);
    const ve = [], Ee = /* @__PURE__ */ new Map(), Le = (ce, oe) => {
      for (const je of ce)
        ve.push(je), Ee.set(J(je), { level: oe, siblings: ce }), Q.has(J(je)) || Le(U.get(J(je)) ?? [], oe + 1);
    };
    return Le(te, 0), { view: ve, meta: Ee, children: U, byId: D };
  }, ge = (k, D, U) => {
    let te = k, ee = 0;
    for (; te !== null && ee++ < 100; ) {
      if (te === D)
        return !0;
      const ve = U.get(te);
      te = ve ? ue(ve) : null;
    }
    return !1;
  }, V = (k, D, U, te) => {
    var ee, ve, Ee, Le;
    ue(k) !== D && ((Le = (Ee = (ve = (ee = k[me]) == null ? void 0 : ee.edit) == null ? void 0 : ve.call(ee, D)) == null ? void 0 : Ee.then) == null || Le.call(Ee, () => we())), X(k, U, te);
  };
  o.innerHTML = `<table class="bd-grid ${d ? "readonly " : ""}${e.getName() ?? ""}">
        <thead><tr class="bd-grid-head"></tr></thead><tbody></tbody>
    </table>`;
  const M = o.querySelector("thead tr"), P = o.querySelector("thead"), L = o.querySelector("tbody"), N = () => {
    if (A) {
      const k = document.createElement("th");
      k.className = "reorder", M.append(k);
    }
    if (a) {
      const k = document.createElement("th");
      k.textContent = "Actions", M.append(k);
    }
    for (const k of ["_blitzID", ...E]) {
      const D = document.createElement("th");
      D.textContent = g(k), D.dataset.col = k, D.onclick = () => {
        I !== k ? (I = k, O = !0) : O ? O = !1 : (I = null, O = !0), we();
      }, M.append(D);
    }
    if (l && !a && M.append(document.createElement("th")), c) {
      const k = document.createElement("tr");
      k.className = "bd-grid-search", A && k.append(document.createElement("td")), a && k.append(document.createElement("td"));
      for (const D of ["_blitzID", ...E]) {
        const U = document.createElement("td"), te = document.createElement("input");
        te.placeholder = `Search ${g(D)}`, te.oninput = () => {
          w[D] = te.value.trim().toLowerCase(), we();
        }, U.append(te), k.append(U);
      }
      l && !a && k.append(document.createElement("td")), P.append(k);
    }
  }, re = (k) => {
    var D;
    for (const [U, te] of Object.entries(w))
      if (te && !String(((D = k[U]) == null ? void 0 : D.value) ?? "").toLowerCase().includes(te))
        return !1;
    return !0;
  };
  let ye = new yt();
  const x = (k, D) => {
    ye.release(k), k.innerHTML = "", D && this.getHtmlElement(D, { status: m !== !1, statusScope: ye.for(k) }).then((U) => U && k.append(U)).catch(() => {
    });
  }, B = () => {
    var te;
    if (!j)
      return;
    const { td: k, attribute: D, handle: U } = j;
    j = null, (te = U == null ? void 0 : U.destroy) == null || te.call(U), k.classList.remove("editing"), x(k, D), H && we();
  }, Z = async (k, D) => {
    var ee;
    if (!D || (j == null ? void 0 : j.td) === k || !k.isConnected)
      return;
    B(), k.classList.add("editing"), k.innerHTML = "";
    const U = { td: k, attribute: D, handle: null };
    j = U;
    const te = await this.mountEditor(D, k, { onDone: () => B(), context: "grid" });
    j === U ? U.handle = te : (ee = te == null ? void 0 : te.destroy) == null || ee.call(te);
  }, G = () => L.querySelectorAll(".drop-above, .drop-below, .drop-inside").forEach((k) => k.classList.remove("drop-above", "drop-below", "drop-inside")), se = (k, D, U) => {
    const te = D.getBoundingClientRect(), ee = k.clientY - te.top;
    return U ? ee < te.height / 3 ? "above" : ee > te.height * 2 / 3 ? "below" : "inside" : ee > te.height / 2 ? "below" : "above";
  }, he = (k, D, U, te, ee, ve) => {
    const Ee = document.createElement("td");
    if (Ee.className = "reorder", !ee)
      return Ee;
    const Le = ve ? ve.meta.get(J(k)).siblings : U, ce = ve ? Le.indexOf(k) : te, oe = document.createElement("span");
    oe.className = "grip", oe.title = "Drag to reorder", oe.onmousedown = () => {
      D.draggable = !0, document.addEventListener("mouseup", () => {
        D.draggable = !1;
      }, { once: !0 });
    };
    const je = (He, Ve, Ie, ze) => {
      const Ue = document.createElement("button");
      return Ue.textContent = He, Ue.title = Ve, Ue.disabled = Ie, Ue.onclick = () => X(k, Le.filter((gs) => gs !== k), ze), Ue;
    };
    return Ee.append(
      je("▲", "Move up", ce === 0, ce - 1),
      oe,
      je("▼", "Move down", ce === Le.length - 1, ce + 1)
    ), D.ondragstart = (He) => {
      var Ve;
      K = k, D.classList.add("dragging"), (Ve = He.dataTransfer) == null || Ve.setData("text/plain", String(k._blitzID.value)), He.dataTransfer && (He.dataTransfer.effectAllowed = "move");
    }, D.ondragend = () => {
      D.draggable = !1, D.classList.remove("dragging"), K = null, G();
    }, D.ondragover = (He) => {
      !K || K === k || (He.preventDefault(), G(), D.classList.add(`drop-${se(He, D, ve)}`));
    }, D.ondrop = (He) => {
      if (!K || K === k)
        return;
      He.preventDefault();
      const Ve = se(He, D, ve);
      if (!ve) {
        const Ie = U.filter((ze) => ze !== K);
        X(K, Ie, Ie.indexOf(k) + (Ve === "below" ? 1 : 0));
        return;
      }
      if (Ve === "inside") {
        if (ge(J(k), J(K), ve.byId))
          return;
        const Ie = (ve.children.get(J(k)) ?? []).filter((ze) => ze !== K);
        Q.delete(J(k)), V(K, J(k), Ie, 0);
      } else {
        const Ie = ue(k);
        if (Ie !== null && ge(Ie, J(K), ve.byId))
          return;
        const ze = ve.meta.get(J(k)).siblings.filter((Ue) => Ue !== K);
        V(K, Ie, ze, ze.indexOf(k) + (Ve === "below" ? 1 : 0));
      }
    }, Ee;
  }, we = () => {
    if (j) {
      H = !0;
      return;
    }
    H = !1, M.querySelectorAll("th[data-col]").forEach((ee) => {
      ee.dataset.col === I ? ee.dataset.sort = O ? "asc" : "desc" : delete ee.dataset.sort;
    });
    let k = v.filter(re);
    const D = Object.values(w).some(Boolean) || typeof q == "function";
    typeof q == "function" && (k = k.filter(q));
    let U = null;
    I ? k.sort(
      (ee, ve) => {
        var Ee, Le;
        return String(((Ee = ee[I]) == null ? void 0 : Ee.value) ?? "").localeCompare(String(((Le = ve[I]) == null ? void 0 : Le.value) ?? ""), void 0, { numeric: !0 }) * (O ? 1 : -1);
      }
    ) : typeof S == "function" ? k.sort(S) : W && !D ? (U = pe(k), k = U.view) : A && k.sort((ee, ve) => R(ve) - R(ee));
    const te = A && !I && typeof S != "function" && (!W || !!U);
    if (ye.destroy(), ye = new yt(), L.innerHTML = "", k.forEach((ee, ve) => {
      const Ee = document.createElement("tr");
      if (A && Ee.append(he(ee, Ee, k, ve, te, U)), a) {
        const ce = document.createElement("td");
        if (ce.className = "grid-actions", l) {
          const oe = document.createElement("button");
          oe.textContent = "✕", oe.title = "delete", oe.onclick = () => confirm(`delete ${ee._blitzID.value}?`) && ee.delete(), ce.append(oe);
        }
        if (a.edit) {
          const oe = document.createElement("button");
          oe.textContent = "✎", oe.title = "edit", oe.onclick = () => a.edit(ee), ce.append(oe);
        }
        if (a.history) {
          const oe = document.createElement("button");
          oe.textContent = "🕘", oe.title = "history", oe.onclick = () => Xt(
            ee,
            typeof a.history == "object" ? a.history : {}
          ), ce.append(oe);
        }
        Ee.append(ce);
      }
      const Le = document.createElement("td");
      if (Le.className = "id", Le.textContent = ee._blitzID.value, p && (Le.onclick = () => p(ee)), U) {
        const ce = U.meta.get(J(ee)).level;
        if (Le.style.paddingLeft = `${8 + ce * 16}px`, U.children.has(J(ee))) {
          const oe = document.createElement("button");
          oe.className = "tree-toggle", oe.textContent = Q.has(J(ee)) ? "▸" : "▾", oe.title = Q.has(J(ee)) ? "Expand" : "Collapse", oe.onclick = (je) => {
            je.stopPropagation(), Q.has(J(ee)) ? Q.delete(J(ee)) : Q.add(J(ee)), we();
          }, Le.prepend(oe);
        }
      }
      Ee.append(Le);
      for (const ce of E) {
        const oe = document.createElement("td");
        d || (oe.onclick = () => Z(oe, ee[ce])), x(oe, ee[ce]), Ee.append(oe);
      }
      if (l && !a) {
        const ce = document.createElement("td");
        ce.className = "kill", ce.textContent = "×", ce.onclick = () => confirm(`delete ${ee._blitzID.value}?`) && ee.delete(), Ee.append(ce);
      }
      L.append(Ee);
    }), !k.length) {
      const ee = E.length + 1 + (l || a ? 1 : 0) + (A ? 1 : 0);
      L.innerHTML = $ ? `<tr><td class="empty" colspan="${ee}">${u ?? "No results found!"}</td></tr>` : `<tr><td class="loading" colspan="${ee}"><div class="spinner"></div></td></tr>`;
    }
  }, _ = (k) => {
    var D, U;
    !j || j.td.contains(k.target) || (U = (D = k.target).closest) != null && U.call(D, "[data-bd-portal]") || B();
  }, Y = (k) => {
    var D, U;
    k.key === "Escape" && ((U = (D = k.target) == null ? void 0 : D.closest) != null && U.call(D, "[data-bd-portal]") || document.querySelector('[data-bd-portal][role="dialog"]') || B());
  };
  d || (document.addEventListener("mousedown", _), document.addEventListener("keydown", Y)), N(), we();
  let ne = !1;
  const ie = ps(e, n, (k, D) => {
    v = k, $ = D, A && !ne && D && k.length && k.every((U) => {
      var te;
      return ((te = U[C]) == null ? void 0 : te.value) === void 0;
    }) && (ne = !0, console.warn(`mountGrid: model '${e.getName()}' has hassort but its rows carry no ${C} — reorder writes will not work. Is the attribute selected by the list query?`)), we();
  });
  return {
    destroy: () => {
      B(), ye.destroy(), d || (document.removeEventListener("mousedown", _), document.removeEventListener("keydown", Y)), ie(), o.innerHTML = "";
    },
    getObjects: () => v,
    updateFilter: (k) => {
      q = k, we();
    },
    updateSort: (k) => {
      S = k, I = null, we();
    }
  };
}
function Qt(e, t, n, s) {
  var z;
  if (!e)
    throw new Error("Missing model!");
  if (!n)
    throw new Error("Missing change callback!");
  const o = typeof t == "string" ? document.getElementById(t) : t;
  if (!(o instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    searchAttributes: i,
    filterAttributes: r,
    labels: c,
    fkSortDirection: a,
    labelLanguage: l,
    inlineMode: d,
    withLabels: u,
    searchPlaceholder: p,
    actionLabels: y
  } = s ?? {};
  o.innerHTML = `<div class="bd-filtersform ${e.getName() ?? ""}"></div>`;
  const f = o.querySelector(".bd-filtersform"), m = e.getAttributesDetails() ?? {}, h = ((z = e.getSystemAttributesDetails) == null ? void 0 : z.call(e)) ?? {}, E = (C) => m[C] ?? (r != null && r.includes(C) ? C === "project_fk" ? { type: "_Project", label: "Project" } : h[C] : void 0), b = l ?? (de == null ? void 0 : de.defaultLanguage) ?? "en", g = (C) => {
    if (c != null && c[C])
      return c[C];
    const A = E(C);
    return Je(A == null ? void 0 : A["label-int"], A == null ? void 0 : A.label, b, C);
  }, v = (i ?? Object.keys(m)).filter((C) => !!m[C] && typeof m[C].type == "string" && ["varchar", "text"].includes(m[C].type));
  let $ = null;
  if (v.length > 0) {
    if ($ = document.createElement("input"), $.className = "search-input", $.type = "text", $.placeholder = p ?? "Search " + v.map((C) => g(C)).join(", ") + "...", d) {
      const C = Pt(() => w());
      $.oninput = () => C();
    }
    f.append($);
  }
  const q = (Pe ?? ke.ui).kernel, S = {};
  let I = !1, O = [];
  const H = (C) => {
    I ? C() : O.push(C);
  }, j = (r ?? Object.keys(m)).filter((C) => !!E(C) && !v.includes(C));
  for (const C of j) {
    const A = u ? g(C) : void 0, R = On(S, C, E(C), e, d ? () => w() : void 0, {
      className: C,
      label: A,
      placeholder: A ? `${A}...` : g(C),
      ...a ? { sortDirection: a } : {}
    });
    if (!q.isFilterable(R))
      continue;
    const K = document.createElement("div");
    f.append(K), q.mount(R, K, "filter").then(H).catch((X) => console.error(`"${C}" Filter error:`, (X == null ? void 0 : X.stack) ?? (X == null ? void 0 : X.message)));
  }
  if (!d) {
    const C = document.createElement("button");
    C.className = "reset-btn", C.innerText = (y == null ? void 0 : y.reset) ?? "Reset", C.onclick = () => {
      $ && ($.value = "");
      for (const K of Object.keys(S))
        delete S[K];
      n(null);
    };
    const A = document.createElement("button");
    A.className = "apply-btn", A.innerText = (y == null ? void 0 : y.apply) ?? "Apply", A.onclick = () => {
      w();
    };
    const R = document.createElement("div");
    R.className = "actions", R.append(C, A), f.append(R);
  }
  const w = () => {
    const C = $ != null && $.value ? (R) => v.some(
      (K) => typeof R[K].value == "string" && R[K].value.match(new RegExp(qt($.value), "gi"))
    ) : null, A = jn(S);
    n(
      C && A ? (R) => C(R) && A(R) : C ?? A ?? null
    );
  };
  return { destroy: () => {
    I = !0;
    for (const C of O)
      C();
    O = [], o.innerHTML = "";
  } };
}
function fs(e, t, n) {
  if (!e)
    throw new Error("Missing model!");
  if (!t)
    throw new Error("Missing change callback!");
  const { title: s, ...o } = n ?? {}, i = document.createElement("div");
  i.className = "bd-filtersmodal", i.setAttribute("data-bd-portal", "");
  const r = document.createElement("div");
  r.className = "box", r.innerHTML = `
        <div class="heading">
            <h2 class="title">${s ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="form"></div>
    `;
  const c = r.querySelector(".close-btn"), a = r.querySelector(".form"), { destroy: l } = Qt(
    e,
    a,
    (p) => {
      t(p), u();
    },
    {
      ...o,
      inlineMode: !1
    }
  );
  let d = null;
  const u = () => {
    d == null || d(), l(), i.remove();
  };
  return c.onclick = () => u(), i.onclick = (p) => {
    p && p.target !== p.currentTarget || u();
  }, i.append(r), document.body.append(i), d = et(i, {
    titleElm: r.querySelector(".title"),
    closeElm: c,
    onEscape: () => u()
  }), { destroy: u };
}
function Gr(e, t, n, s, o) {
  if (!e)
    throw new Error("Missing model!");
  if (!n)
    throw new Error("Missing change callback!");
  const i = typeof t == "string" ? document.getElementById(t) : t;
  if (!(i instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    enableFiltersModal: r,
    filtersModalConfig: c,
    filtersButtonLabel: a,
    clearFiltersLabel: l,
    sortPlaceholder: d,
    sortAttributes: u,
    searchAttributes: p,
    filterAttributes: y,
    ...f
  } = o ?? {};
  let m = null, h = null;
  const E = d ?? "Sort by", b = u ?? [
    { attribute: "_blitzstamp", label: "Newest", order: "desc" },
    { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
  ];
  i.innerHTML = `<div class="bd-searchbox">
        <div class="form"></div>
        ${s ? `
            <select class="sort-select">
                <option value="" disabled>${E}</option>
                ${b.map((j, w) => `
                    <option value="${j.attribute + "--" + j.order}" ${w === 0 ? "selected" : ""}>
                        ${j.label}
                    </option>
                `).join(`
`)}
            </select>
        ` : ""}
        ${r ? `<button class="filters-btn">
            ${a ? `<span>${a}</span>` : ""}
        </button>` : ""}
        <button class="clear-btn">${l ? `<span>${l}</span>` : ""}</button>
    </div>`;
  const g = i.querySelector(".form"), v = i.querySelector(".sort-select"), $ = i.querySelector(".filters-btn"), q = i.querySelector(".clear-btn");
  let S;
  const I = () => {
    S = Qt(
      e,
      g,
      (j) => {
        m = j, O();
      },
      {
        ...f,
        searchAttributes: p,
        filterAttributes: y ?? [],
        inlineMode: !0
      }
    );
  };
  I(), $ && ($.onclick = () => {
    fs(
      e,
      (j) => {
        h = j, O();
      },
      {
        ...f,
        searchAttributes: [],
        ...c
      }
    );
  }), q.onclick = () => {
    m = null, h = null, S && S.destroy(), I(), O();
  };
  const O = () => {
    q.style.display = m || h ? "flex" : "none", n(
      m && h ? (j) => m(j) && h(j) : m ?? h ?? null
    );
  };
  if (v && s) {
    const j = e.getAttributesDetails() ?? {};
    v.onchange = () => {
      var R;
      const T = v.value.split("--"), z = T[0], C = T[1], A = ((R = j[z]) == null ? void 0 : R.type) ?? "int";
      s(
        v.value ? (K, X) => {
          var me, W, Q, J;
          if (!z || !C)
            return 0;
          if (["int", "tinyint", "double", "float", "percentage"].includes(A)) {
            const ue = (me = K[z]) != null && me.value ? K[z].value : 0, pe = (W = X[z]) != null && W.value ? X[z].value : 0;
            return C === "asc" ? ue - pe : pe - ue;
          }
          if (["varchar", "text"].includes(A)) {
            const ue = ((Q = K[z]) == null ? void 0 : Q.value) || "", pe = ((J = X[z]) == null ? void 0 : J.value) || "";
            return !ue && pe ? 1 : !pe && ue ? -1 : C === "asc" ? pe.localeCompare(ue, void 0, { sensitivity: "base" }) : ue.localeCompare(pe, void 0, { sensitivity: "base" });
          }
          return 0;
        } : null
      );
    };
    const w = b[0];
    w && (w.attribute !== "_blitzstamp" || w.order !== "desc") && v.onchange(null);
  }
  return { destroy: () => {
    S && S.destroy(), i.innerHTML = "";
  } };
}
function Cn(e, t, n) {
  if (e != null && e.readOnly)
    return "inline";
  const s = e == null ? void 0 : e.presentation, o = (typeof s == "string" ? s : s == null ? void 0 : s[t]) ?? "inline";
  return o !== "auto" ? o : (typeof n == "string" ? n.length : n == null ? 0 : JSON.stringify(n).length) >= (e.modalThreshold ?? 100) ? "modal" : "expandable";
}
async function ei(e, t) {
  var E, b, g, v, $, q, S, I, O;
  if (!e)
    throw new Error("Missing attribute!");
  const { title: n, use: s, live: o, onDone: i, onClose: r } = t ?? {}, c = document.createElement("div");
  c.className = "bd-editor-modal", c.setAttribute("data-bd-portal", "");
  const a = document.createElement("div");
  a.className = "box", a.onclick = (H) => H.stopPropagation(), a.innerHTML = `
        <div class="heading">
            <h2 class="title"></h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="editor"></div>
    `;
  const l = ((v = (g = (b = (E = e._object) == null ? void 0 : E.model) == null ? void 0 : b.getAttributesDetails) == null ? void 0 : g.call(b)) == null ? void 0 : v[e._name]) ?? {};
  a.querySelector(".title").textContent = n ?? Je(l["label-int"], l.label, (($ = this.settings) == null ? void 0 : $.language) ?? "en", e._name);
  const d = a.querySelector(".editor");
  let u = null, p = null, y = !1;
  const f = () => {
    var H;
    y || (y = !0, p == null || p(), (H = u == null ? void 0 : u.destroy) == null || H.call(u), c.remove(), r == null || r());
  };
  let m;
  const h = () => {
    var z, C, A;
    const H = (z = u == null ? void 0 : u.getDraft) == null ? void 0 : z.call(u), j = e.value, w = (C = t == null ? void 0 : t.config) == null ? void 0 : C.draft, T = typeof H == "string" && (u != null && u.isPending ? u.isPending() || w !== void 0 && H === w : H !== m && H !== (typeof j == "string" ? j : j == null ? "" : void 0));
    T && !confirm("Discard unsaved changes?") || (T && ((A = u == null ? void 0 : u.cancelPending) == null || A.call(u)), f());
  };
  return c.onclick = () => h(), a.querySelector(".close-btn").onclick = () => h(), c.append(a), document.body.append(c), p = et(c, {
    titleElm: a.querySelector(".title"),
    closeElm: a.querySelector(".close-btn"),
    onEscape: h
  }), u = await this.mountEditor(e, d, {
    use: s,
    live: o,
    config: { ...t == null ? void 0 : t.config, presentation: "inline" },
    onDone: () => {
      f(), i == null || i();
    }
  }), ((q = t == null ? void 0 : t.config) == null ? void 0 : q.draft) === void 0 && (m = (S = u == null ? void 0 : u.getDraft) == null ? void 0 : S.call(u)), (O = (I = d.querySelector("textarea, input")) == null ? void 0 : I.focus) == null || O.call(I), { destroy: f };
}
const ti = `<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
</svg>`;
async function Ln(e, t, n, s) {
  let o = await n(), i = null, r = !1;
  const c = document.createElement("div");
  c.className = "bd-editor-expand", c.title = s.expandTitle ?? "Expand", c.setAttribute("role", "button"), c.setAttribute("aria-label", s.expandTitle ?? "Expand"), c.tabIndex = 0, c.onkeydown = (d) => {
    d.key !== "Enter" && d.key !== " " || (d.preventDefault(), c.click());
  }, c.innerHTML = s.expandIcon ?? ti;
  const a = Te(t, "bd-expandable");
  t.append(c);
  const l = () => {
    o != null && o.getDraft || c.remove();
  };
  return t.addEventListener("input", l), c.onclick = async (d) => {
    var y, f;
    d.stopPropagation();
    const u = (y = o == null ? void 0 : o.getDraft) == null ? void 0 : y.call(o);
    (f = o == null ? void 0 : o.destroy) == null || f.call(o), o = null, c.remove();
    const p = await this.mountEditorInModal(e, {
      use: s.use,
      config: { ...s.config, ...u !== void 0 ? { draft: u } : {} },
      onClose: async () => {
        var m, h;
        if (i = null, (m = s.onDone) == null || m.call(s), !r) {
          try {
            o = await n();
          } catch (E) {
            console.error(`"${e._name}" remount failed:`, (E == null ? void 0 : E.stack) ?? (E == null ? void 0 : E.message) ?? E);
            return;
          }
          if (r) {
            (h = o == null ? void 0 : o.destroy) == null || h.call(o), o = null;
            return;
          }
          t.append(c);
        }
      }
    });
    if (r) {
      p.destroy();
      return;
    }
    i = p;
  }, {
    destroy: () => {
      var d, u;
      r = !0, t.removeEventListener("input", l), c.remove(), a(), (d = i == null ? void 0 : i.destroy) == null || d.call(i), (u = o == null ? void 0 : o.destroy) == null || u.call(o);
    }
  };
}
var ke, de, Pe;
class Gt {
  /**
   * Constructor
   */
  constructor(t, n) {
    /**
     * The DatatypeUI kernel: one registry of type modules, one config
     * cascade, one mount. Every mount path routes through it.
     */
    ae(this, "registry", new Ss((t) => this.warn(t)));
    ae(this, "uiConfig", new Cs());
    ae(this, "kernel", new Os({
      registry: this.registry,
      config: this.uiConfig,
      resolveModel: (t) => ke._Model.get(t),
      warn: (t) => this.warn(t),
      isDebug: () => this.debug
    }));
    /**
     * Enable dev-time logging: which layer supplied each surface, unresolved
     * hints, contract violations. Silent in production; a fallback is by
     * design, never an error.
     */
    ae(this, "debug", !1);
    /** Live handle to the mounted inspector tab, or null when it's off. */
    ae(this, "txiHandle", null);
    /** Desired on/off state — the constructor default, then any live toggle. */
    ae(this, "txiWanted", !1);
    /** True while the inspector chunk import is in flight (guards overlap). */
    ae(this, "txiLoading", !1);
    /** Tab options captured from the `transactionInspector` constructor value. */
    ae(this, "transactionInspectorConfig", {});
    /**
     * Inputs
     */
    ae(this, "inputs", {
      text: Ae,
      textarea: Ke,
      number: Fe,
      phone: ht(() => import("./index-2717e69b.js")),
      boolean: zt,
      date: it,
      html: ht(() => import("./index-c3cfa516.js")),
      image: $t,
      video: Ut,
      file: Wt,
      pdf: qn,
      location: Kt,
      "text-many": Ft,
      tag: Lt,
      i18n: Rt
    });
    /**
     * The on-demand editors by name, each with `preload()`: a page showing a
     * column's view before any edit (stars in a list) loads its chunk first.
     */
    ae(this, "onDemand", {});
    /**
     * Pickers
     */
    ae(this, "pickers", {
      object: at,
      enum: ot,
      projectUsers: Oo,
      list: jo
    });
    /**
     * Attribute editors: the built-in EDIT surface per type, seeded into the
     * kernel as each module's `editor`. They shrink under a preset policy and
     * evaporate one by one as type modules take over their binding.
     */
    ae(this, "editors", gn(pr));
    /**
     * Many attribute editors
     */
    ae(this, "manyEditors", gn(fr));
    /**
     * Extensions methods
     */
    ae(this, "getHTML", ss);
    ae(this, "getHtmlElement", Yt);
    // Typed as any until the pinned core exposes the destroy-handle signature
    ae(this, "mountHtmlElement", Br);
    ae(this, "mountAddForm", rs);
    ae(this, "mountAddFormModal", Jr);
    ae(this, "mountList", Xr);
    ae(this, "mountGrid", Qr);
    ae(this, "mountFiltersForm", Qt);
    ae(this, "mountFiltersModal", fs);
    ae(this, "mountSearchBox", Gr);
    ae(this, "mountObjectView", ds);
    ae(this, "mountObjectViewModal", us);
    ae(this, "mountObjectHistory", xt);
    ae(this, "mountObjectHistoryModal", Xt);
    ae(this, "mountEditorInModal", ei);
    var c;
    ke = t;
    const s = typeof n == "string" ? { preset: n } : Array.isArray(n) ? { use: n } : n ?? {};
    de = s, Pe = this, lo(s.openStreetMap);
    const o = s.preset ?? "default";
    if (o === "readonly")
      this.editors = {}, this.manyEditors = {};
    else if (o === "basic")
      for (const a of dr)
        this.editors[a] = Jn;
    for (const a of Ao)
      this.registry.register(this.withCanonicalView(An(a.type), a));
    for (const [a, l] of Object.entries(this.editors))
      this.registry.mergeBuiltin(a, { editor: lt(l) });
    const i = { mtm: "mtm", enum: "enum[]", image: "image[]", varchar: "varchar[]", text: "text[]", tag: "tag[]" };
    for (const [a, l] of Object.entries(this.manyEditors))
      this.registry.mergeBuiltin(i[a] ?? a, { editor: lt(l) });
    for (const [a, l] of Object.entries(Nr))
      this.registry.mergeBuiltin(a, { view: ct(l) });
    if (o !== "readonly")
      for (const [a, l] of Object.entries(Kn))
        "load" in l ? this.onDemand[a] = this.defineModuleUI(a, `built-in ${a}`, l.load, !1) : this.registry.definePreset(a, { extends: l.type, editor: lt(l.editor) });
    this.settings = {
      language: s.defaultLanguage ?? "en",
      ...s.formatDates !== void 0 ? { formatDates: s.formatDates } : {}
    }, s.defaultDialCode && this.setConfig("phone", { defaultDialCode: s.defaultDialCode }), s.googleMapsApiKey && this.setConfig("location", { apiKey: s.googleMapsApiKey }), this.services = {
      upload: (a, l) => ke.uploader(a, l),
      uploadVideo: (a, l) => ke.uploaderVideo(a, l),
      uploadFile: (a, l) => ke.uploaderFile(a, l)
    }, (c = s.use) != null && c.length && this.use(s.use);
    const r = s.transactionInspector;
    r && typeof r == "object" && (this.transactionInspectorConfig = r), this.transactionInspector = r !== !1;
  }
  /** App-global preferences read by many types (language, locale, theme). */
  get settings() {
    return this.uiConfig.settings;
  }
  set settings(t) {
    this.uiConfig.settings = t ?? {};
  }
  /** Capabilities controls can call (upload, geocode, …). */
  get services() {
    return this.uiConfig.services;
  }
  set services(t) {
    this.uiConfig.services = t ?? {};
  }
  /** Project-wide UI options for a datatype — cascades into every mount. */
  setConfig(t, n) {
    this.uiConfig.setConfig(t, n);
  }
  /** UI options for one attribute of one model. */
  setConfigFor(t, n, s) {
    this.uiConfig.setConfigFor(t, n, s);
  }
  /** Overlay DatatypeUI modules (a preset pack): each claimed type gets the module's surfaces. */
  use(t) {
    for (const n of t) {
      const { type: s, ...o } = n;
      for (const i of [s].flat())
        this.defineUI(i, o);
    }
  }
  /**
   * THE authoring surface: merge a (partial) DatatypeUI onto a type.
   * Override one surface with { control } / { view } — the rest stays.
   */
  defineUI(t, n) {
    this.registry.defineUI(t, this.withCanonicalView(t, n));
  }
  /** defineUI scoped to one attribute of one model. */
  defineUIFor(t, n, s) {
    this.registry.defineUIFor(t, n, this.withCanonicalView(n, s));
  }
  /**
   * Register a named VARIANT of a base type (selected via schema `ui:` hint
   * or per-mount { use }). Inherits the base; overrides what it declares.
   */
  definePreset(t, n) {
    this.registry.definePreset(t, this.withCanonicalView(t, n));
  }
  /**
   * Bind a registered UI (a preset name) to a datatype — the app-default
   * slot: above defineUI packs, below a schema hint, so a column-specific
   * choice still wins over an app or user default. One replaceable pointer
   * per type: binding again swaps every surface the named UI brings, null
   * clears back to the layers below. Scalar attributes only — many-valued
   * columns keep their many-refined UI. The label names the binding in
   * `sources` and ui.debug output (e.g. "your JSON preference").
   */
  bindUIType(t, n, s) {
    this.registry.bindType(t, n, s);
  }
  /** Views enter the registry canonicalized — key names the standard class. */
  withCanonicalView(t, n) {
    return n.view ? { ...n, view: this.canonicalView(t, n.view, n) } : n;
  }
  /**
   * Register a remote UI by name: an ES module whose default export is a
   * DatatypeUI (or a bare control), fetched lazily on the first edit and
   * cached. On failure the text/json floor mounts — never a broken field.
   * You are executing that module's code: point moduleUrl at an asset you
   * host and version yourself, not at a third party.
   */
  setRemoteUI(t, n) {
    return this.defineModuleUI(t, n, () => nn(n), !0);
  }
  /**
   * A named UI whose module loads on first use: a remote URL or a built-in
   * chunk. `asType` also registers it as the UI of a type of that name.
   */
  defineModuleUI(t, n, s, o) {
    const { shell: i, preload: r } = this.buildRemote(t, n, s, (c, a, l) => {
      l ? (typeof a.view == "function" && (c.view = ct(a.view, a.hydrator)), this.registry.definePreset(t, c), o && this.registry.defineUI(t, c)) : (this.definePreset(t, c), o && c.control && this.registry.defineUI(t, { control: c.control }));
    });
    return this.registry.definePreset(t, i), o && this.registry.defineUI(t, i), { preload: r };
  }
  /** Remote UI for one attribute of one model. */
  setRemoteUIFor(t, n, s) {
    const o = `${t}.${n}`, { shell: i, preload: r } = this.buildRemote(o, s, () => nn(s), (c, a, l) => {
      l ? (typeof a.view == "function" && (c.view = ct(a.view, a.hydrator)), this.registry.defineUIFor(t, n, c)) : this.defineUIFor(t, n, c);
    });
    return this.registry.defineUIFor(t, n, i), { preload: r };
  }
  /**
   * The remote plumbing: memoized fetch, module-shape classification (an
   * OBJECT default export is a DatatypeUI; a FUNCTION default export is a
   * legacy attribute-bound editor with optional view/hydrator exports),
   * and the lazy shell that mounts before the module has loaded.
   */
  buildRemote(t, n, s, o) {
    let i = null;
    const r = () => i ?? (i = s().then((a) => {
      const l = typeof a.default == "function", d = l ? { editor: lt(a.default) } : { ...a.default };
      return o(d, a, l), d;
    }).catch((a) => {
      throw i = null, this.warn(`remote UI '${t}' (${n}) failed: ${a.message} — next layer down mounts`), a;
    }));
    return { shell: {
      control: async (a) => {
        const l = await r();
        if (!l.control)
          throw new Error(`remote UI '${t}' has no control`);
        return l.control(a);
      },
      editor: async (a) => {
        const l = await r(), d = l.editor ?? l.control;
        if (!d)
          throw new Error(`remote UI '${t}' has no editor`);
        return d(a);
      }
    }, preload: () => r().then(() => {
    }) };
  }
  warn(t) {
    this.debug && console.warn(`[BlitzUIManager] ${t}`);
  }
  /**
   * The floating Transaction Inspector tab. Read the current state, or assign
   * to toggle it live: `ui.transactionInspector = true` brings the tab up
   * mid-session — handy for inspecting a stuck queue on a real user's page
   * from the console — and `= false` tears it down. The initial value comes
   * from the constructor's `transactionInspector` option (on unless `false`).
   */
  get transactionInspector() {
    return this.txiWanted;
  }
  set transactionInspector(t) {
    this.txiWanted = !!t, this.syncTransactionInspector();
  }
  /**
   * Reconcile the mounted tab with `txiWanted`. Mounting lazy-imports the
   * inspector (the codebase's chunking idiom) and never runs without a DOM,
   * so SSR and a never-enabled session touch nothing. The import is guarded
   * against overlap and against the state flipping back off mid-flight.
   */
  syncTransactionInspector() {
    typeof document > "u" || (this.txiWanted && !this.txiHandle && !this.txiLoading ? (this.txiLoading = !0, Promise.resolve().then(() => ii).then(({ default: t }) => {
      this.txiLoading = !1, this.txiWanted && !this.txiHandle && (this.txiHandle = t(this.transactionInspectorConfig));
    }).catch((t) => {
      this.txiLoading = !1, this.warn(`transaction inspector failed to load: ${t.message}`);
    })) : !this.txiWanted && this.txiHandle && (this.txiHandle.destroy(), this.txiHandle = null));
  }
  /**
   * Warm editor chunks during idle time so the first edit feels instant.
   * No argument preloads every registered editor; pass types to narrow.
   */
  preloadEditors(t) {
    const n = t ?? [...Object.keys(this.editors), ...Object.keys(this.manyEditors)], s = () => {
      var o, i, r, c;
      for (const a of n)
        (i = (o = this.editors[a]) == null ? void 0 : o.preload) == null || i.call(o), (c = (r = this.manyEditors[a]) == null ? void 0 : r.preload) == null || c.call(r);
    };
    typeof requestIdleCallback == "function" ? requestIdleCallback(s) : setTimeout(s, 0);
  }
  /** Drop all write-surface overlays (built-ins are untouched underneath). */
  resetEditors() {
    this.registry.resetWrite();
  }
  /** Drop all read-surface overlays (built-ins — extended included — stay). */
  resetReadonly() {
    this.registry.resetRead();
  }
  /**
   * Canonicalize a View for the registry: empty skipping, config cascade,
   * the standard classes on the root, label injection. A view returning
   * { html, hydrate } hydrates immediately in element contexts; string
   * contexts get a stamped shell and hydrate during the hydrate pass.
   */
  canonicalView(t, n, s) {
    return (o, i) => {
      var p, y, f, m;
      if ((s.empty ?? $s)(o.value))
        return "";
      const c = Hn((p = o._object) == null ? void 0 : p.model, o._name), a = vt(o._name, c.type ?? o._type), l = this.uiConfig.resolve(a, (m = (f = (y = o._object) == null ? void 0 : y.model) == null ? void 0 : f.getName) == null ? void 0 : m.call(f), o._name, s.defaultConfig, void 0), d = n({ value: o.value, attributeDetails: c, config: l, settings: this.uiConfig.settings });
      if (!d)
        return "";
      const u = (h) => ni(h, `${o._name} bd-${t}`, i == null ? void 0 : i.labelHtml);
      return typeof d == "string" ? u(d) : { html: u(d.html), hydrate: (h) => {
        var E;
        return ((E = d.hydrate) == null ? void 0 : E.call(d, h)) ?? void 0;
      } };
    };
  }
  /**
   * Resolve the read view for an attribute through the kernel registry —
   * one resolution rule for all three surfaces. Total: the text/json
   * fallback is the floor for types with no view anywhere.
   */
  resolveView(t) {
    const n = this.kernel.resolveForPort(tt(t));
    return n.view ? { render: n.view, layer: n.sources.view.layer } : { render: ct(qr), layer: 0 };
  }
  /**
   * The hydrate pass re-renders the view fresh — a hydrating view returns
   * { html, hydrate }, everything else no-ops. No side registrations.
   */
  resolveHydrator(t) {
    const { render: n } = this.resolveView(t);
    return (s, o) => {
      var r;
      const i = n(o ?? t, {});
      return typeof i == "object" && i ? ((r = i.hydrate) == null ? void 0 : r.call(i, s)) ?? void 0 : void 0;
    };
  }
  /** Hydrate serialized shells under root (see docs/extending.md). */
  hydrate(t) {
    return zr(t, (n) => this.resolveHydrator(n), (n) => this.warn(n));
  }
  wrapMarkup(t) {
    const n = document.createElement("div");
    return n.innerHTML = t, n.children.length === 1 ? n.children[0] : n;
  }
  /**
   * Read-only markup, string form: the resolved view's output, stamped
   * with a hydration reference when the view hydrates. '' = skip.
   */
  resolveReadonlyString(t, n) {
    const s = this.resolveView(t).render(t, { ...n, serialized: !0 });
    if (!s)
      return "";
    if (typeof s == "string")
      return s;
    const o = this.wrapMarkup(s.html);
    return Vr(o, t) || this.warn(`${t._name}: view hydrates but attribute has no resolvable object — shell stays static`), o.outerHTML;
  }
  /**
   * Read-only markup, element form: the resolved view's output, hydrated
   * immediately (element contexts are live). null = skip.
   */
  resolveReadonlyElement(t, n) {
    const s = this.resolveView(t).render(t, n);
    if (!s)
      return null;
    const o = this.wrapMarkup(typeof s == "string" ? s : s.html);
    return typeof s == "object" && s.hydrate && es(o, (i) => s.hydrate(i) ?? void 0, t), o;
  }
  /**
   * Remount an editor when the sync applies another client's change to its
   * attribute (the core `remoteChange` object event, emitted with
   * `sync.live` enabled). A focused editor is a draft in progress and is
   * never clobbered mid-edit — the remount is deferred until focus leaves
   * the container. The container is cleared before each remount so an
   * editor whose destroy leaves DOM behind can not duplicate itself, and
   * remounts never overlap — a change landing mid-remount queues one
   * trailing remount, which reads the newest value anyway.
   */
  withLiveRemount(t, n, s, o) {
    const i = t._object;
    if (typeof (i == null ? void 0 : i.addEventListener) != "function")
      return o;
    let r = o, c = !1, a = !1, l = !1, d = !1;
    const u = async () => {
      if (c) {
        a = !0;
        return;
      }
      c = !0;
      try {
        do
          a = !1, typeof (r == null ? void 0 : r.destroy) == "function" && r.destroy(), n.innerHTML = "", r = null, r = await s();
        while (a && !d);
      } catch (f) {
        console.error(`"${t._name}" live remount failed:`, (f == null ? void 0 : f.stack) ?? (f == null ? void 0 : f.message) ?? f);
      } finally {
        c = !1, d && typeof (r == null ? void 0 : r.destroy) == "function" && r.destroy();
      }
    }, p = (f) => {
      if (!(!f || !Object.hasOwn(f, t._name))) {
        if (n.contains(document.activeElement)) {
          l = !0;
          return;
        }
        u();
      }
    }, y = (f) => {
      l && (f.relatedTarget instanceof Node && n.contains(f.relatedTarget) || (l = !1, u()));
    };
    return i.addEventListener("remoteChange", p), n.addEventListener("focusout", y), {
      ...o,
      // capabilities must follow the remounts — the initial handle's
      // would reach a widget a remount already removed
      ...o.getDraft ? { getDraft: () => {
        var f;
        return (f = r == null ? void 0 : r.getDraft) == null ? void 0 : f.call(r);
      } } : {},
      ...o.isPending ? { isPending: () => {
        var f;
        return (f = r == null ? void 0 : r.isPending) == null ? void 0 : f.call(r);
      } } : {},
      ...o.cancelPending ? { cancelPending: () => {
        var f;
        return (f = r == null ? void 0 : r.cancelPending) == null ? void 0 : f.call(r);
      } } : {},
      destroy: () => {
        d = !0, i.removeEventListener("remoteChange", p), n.removeEventListener("focusout", y), !c && typeof (r == null ? void 0 : r.destroy) == "function" && r.destroy();
      }
    };
  }
  /**
   * Wire an onDone callback to the editor's bd-editor-done event and fold the
   * listener teardown into the editor's own destroy. If onDone is absent the
   * handle is returned untouched.
   */
  withDoneListener(t, n, s) {
    if (!n)
      return s;
    const o = () => n();
    t.addEventListener("bd-editor-done", o);
    const i = s == null ? void 0 : s.destroy;
    return {
      ...s,
      destroy: () => {
        t.removeEventListener("bd-editor-done", o), typeof i == "function" && i.call(s);
      }
    };
  }
  /**
   * Mount input in the DOM
   * Task: https://alpha.blitzdata.com/blitzpm/task/2661yc--bhg6dv?proj=1s4dec-3ibnqe
   */
  mountInput(t, n, s) {
    if (!t)
      throw new Error("Missing type!");
    if (!n)
      throw new Error("Missing container!");
    const o = this.inputs[t];
    if (!o)
      throw new Error("Input for this type not supported!");
    return o(n, s);
  }
  /**
   * Mount picker in the DOM
   * Task: https://alpha.blitzdata.com/blitzpm/task/2661yc--bhg6dv?proj=1s4dec-3ibnqe
   */
  async mountPicker(t, n, s) {
    if (!t)
      throw new Error("Missing type!");
    if (!n)
      throw new Error("Missing container!");
    const o = this.pickers[t];
    if (!o)
      throw new Error("Picker for this type not supported!");
    return await o(n, s);
  }
  /**
   * Mount editor in the DOM — kernel-routed: mount(livePort(attr), 'write').
   * Task: https://alpha.blitzdata.com/blitzpm/task/2gemtg-65t0b?proj=1s4dec-3ibnqe
   */
  async mountEditor(t, n, s) {
    var a, l;
    if (!t)
      throw new Error("Missing attribute(s)!");
    const o = typeof n == "string" ? document.getElementById(n) : n;
    if (!(o instanceof HTMLElement))
      throw new Error("Container parameter not valid!");
    let i = [], r = !1;
    t instanceof Array ? i.push(...t) : Object.hasOwn(t, "_attributes") ? (r = !0, i.push(
      ...Object.values(t._attributes).filter((d) => !d._name.startsWith("_") && !d._name.startsWith("@"))
    )) : i.push(t), r && (i = i.filter((d) => d.value !== void 0));
    const c = i.length > 0 ? ((l = (a = i[0]._object) == null ? void 0 : a.model) == null ? void 0 : l.getAttributesDetails()) ?? {} : {};
    if (i.length === 0)
      throw new Error("No attribute found!");
    if (i.length === 1) {
      const d = i[0], u = this.kernel.resolveConfig(tt(d, { ...s, ...s == null ? void 0 : s.config }), s == null ? void 0 : s.use), p = Cn(u, (s == null ? void 0 : s.context) ?? "form", d.value);
      if (p === "modal")
        return this.mountEditorInModal(d, {
          use: s == null ? void 0 : s.use,
          config: s == null ? void 0 : s.config,
          live: s == null ? void 0 : s.live,
          onClose: s == null ? void 0 : s.onDone
        });
      const y = async () => {
        const m = await this.kernel.mount(
          tt(d, { ...s, ...s == null ? void 0 : s.config }),
          o,
          "write",
          s == null ? void 0 : s.use
        ), { getDraft: h, isPending: E, cancelPending: b } = m;
        return { destroy: m, ...h && { getDraft: h }, ...E && { isPending: E }, ...b && { cancelPending: b } };
      }, f = async () => {
        let m = await y();
        return s != null && s.live && (m = this.withLiveRemount(d, o, y, m)), this.withDoneListener(o, s == null ? void 0 : s.onDone, m);
      };
      return p === "expandable" ? Ln.call(this, d, o, f, {
        use: s == null ? void 0 : s.use,
        config: s == null ? void 0 : s.config,
        onDone: s == null ? void 0 : s.onDone,
        expandIcon: u.expandIcon,
        expandTitle: u.expandTitle
      }) : f();
    } else {
      o.innerHTML = "";
      const d = ["bd-object-editor"];
      !Array.isArray(t) && Object.hasOwn(t, "_attributes") && d.push(t._blitzID.value), o.classList.add(...d);
      const u = (s == null ? void 0 : s.labelLanguage) ?? this.settings.language ?? "en", p = (f) => {
        var m, h;
        return Je((m = c[f]) == null ? void 0 : m["label-int"], (h = c[f]) == null ? void 0 : h.label, u, f);
      };
      let y = [];
      for (const f of i) {
        if (!c[f._name])
          continue;
        const m = document.createElement("div");
        o.append(m);
        const h = s != null && s.withLabels || ["boolean", "datetime", "date", "image", "video", "file"].includes(f._type) ? p(f._name) : void 0, E = h ? `${h}...` : p(f._name), b = {
          className: f._name,
          label: h,
          placeholder: E,
          ...s != null && s.defaultDialCode ? { defaultDialCode: s.defaultDialCode } : {},
          ...s != null && s.googleMapsApiKey ? { apiKey: s.googleMapsApiKey, initialExpand: s == null ? void 0 : s.locationFieldsExpand } : {},
          ...s != null && s.listEmptyMsg ? { emptyMsg: s.listEmptyMsg } : {},
          ...s == null ? void 0 : s.config
        }, g = async () => {
          const I = await this.kernel.mount(tt(f, b), m, "write"), { getDraft: O, isPending: H, cancelPending: j } = I;
          return { destroy: I, ...O && { getDraft: O }, ...H && { isPending: H }, ...j && { cancelPending: j } };
        }, v = async () => {
          let I = await g();
          return s != null && s.live && (I = this.withLiveRemount(f, m, g, I)), I;
        }, $ = this.kernel.resolveConfig(tt(f, b)), q = Cn($, "form", f.value);
        let S;
        try {
          S = q === "inline" ? await v() : await Ln.call(this, f, m, v, {
            config: s == null ? void 0 : s.config,
            expandIcon: $.expandIcon,
            expandTitle: $.expandTitle
          });
        } catch (I) {
          console.error(`"${f._name}" Editor Error:`, I.stack ?? I.message);
        }
        S && typeof S.destroy == "function" && y.push(S.destroy);
      }
      return {
        destroy: () => {
          for (const f of y)
            f();
          y = [], o.innerHTML = "", o.classList.remove(...d);
        }
      };
    }
  }
}
/**
 * Version of the library
 */
ae(Gt, "VERSION", "2.21.6");
function ni(e, t, n) {
  const s = document.createElement("div");
  s.innerHTML = e.trim();
  const o = s.childNodes.length === 1 ? s.firstElementChild : null;
  if (o) {
    const i = o.getAttribute("class");
    return o.setAttribute("class", i ? `${t} ${i}` : t), n && o.insertAdjacentHTML("afterbegin", n), o.outerHTML;
  }
  return `<div class="${t}">${n ?? ""}${e}</div>`;
}
class si extends Gt {
}
function xn(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function en(e, t = "") {
  const n = document.activeElement, s = document.createElement("div");
  s.className = "bd-lightbox", s.setAttribute("data-bd-portal", ""), s.setAttribute("role", "dialog"), s.setAttribute("aria-modal", "true"), t && s.setAttribute("aria-label", t), s.innerHTML = `
        <div class="bd-lightbox__inner">
            <img src="${xn(e)}" alt="${xn(t)}">
        </div>
        <button type="button" class="bd-lightbox__close" aria-label="Close"><span>✕</span></button>
    `;
  const o = () => {
    s.remove(), document.removeEventListener("keydown", i), n && typeof n.focus == "function" && n.focus();
  }, i = (c) => {
    c.key === "Escape" && o();
  };
  s.addEventListener("click", (c) => {
    const a = c.target;
    (a === s || a != null && a.closest(".bd-lightbox__close")) && o();
  }), document.addEventListener("keydown", i), document.body.appendChild(s);
  const r = s.querySelector(".bd-lightbox__close");
  return r == null || r.focus(), { close: o };
}
function ms(e = document, t = "[data-lightbox]", n = {}) {
  const s = n.resolveSrc ?? ((r) => {
    const c = r instanceof HTMLElement ? r.dataset.lightboxSrc : null;
    if (c)
      return c;
    const a = r.querySelector("img") ?? (r.tagName === "IMG" ? r : null);
    return a && (a.currentSrc || a.src) || null;
  }), o = n.resolveAlt ?? ((r) => {
    const c = r.querySelector("img") ?? (r.tagName === "IMG" ? r : null);
    return (c == null ? void 0 : c.alt) ?? "";
  }), i = (r) => {
    const c = r.target, a = c == null ? void 0 : c.closest(t);
    if (!a || !e.contains(a))
      return;
    const l = s(a);
    l && (r.preventDefault(), en(l, o(a)));
  };
  return e.addEventListener("click", i), () => e.removeEventListener("click", i);
}
const oi = {
  open: en,
  attach: ms
};
function ys(e, t = {}) {
  var ue, pe, ge;
  const n = typeof e == "string" ? document.querySelector(e) : e;
  if (!n)
    throw new Error("mountTransactionInspector: container not found");
  const s = n, o = t.queue ?? pt.queue, i = t.confirmDrop !== !1, r = t.emptyMessage ?? "No unresolved transactions!", c = typeof ((ue = o == null ? void 0 : o.failedHandler) == null ? void 0 : ue.drop) == "function", a = typeof ((pe = o == null ? void 0 : o.conflictHandler) == null ? void 0 : pe.resolve) == "function", l = typeof ((ge = o == null ? void 0 : o.conflictHandler) == null ? void 0 : ge.prompt) == "function";
  s.classList.add("bd-txi");
  let d = {}, u = null, p = null, y = !0, f = null, m = !1, h = !1;
  const E = /* @__PURE__ */ new Map(), b = [F.Conflict, F.Failed, F.Pending, F.Completed], g = (V) => {
    const M = b.indexOf(V);
    return M === -1 ? 99 : M;
  }, v = (V) => V[0].id, $ = (V) => V.find((M) => M.message !== void 0) ?? null, q = (V) => Object.keys(V.transaction.data ?? {})[0] ?? null, S = (V) => {
    if (V === void 0)
      return "—";
    if (typeof V == "object")
      try {
        return JSON.stringify(V);
      } catch {
        return String(V);
      }
    return String(V);
  }, I = (V) => {
    try {
      return new Date(V).toLocaleString();
    } catch {
      return String(V);
    }
  };
  function O(V) {
    const M = /* @__PURE__ */ new Map();
    for (const P of V) {
      const L = M.get(P.status) ?? [];
      L.push(P), M.set(P.status, L);
    }
    return [...M.values()];
  }
  async function H() {
    if (h)
      return;
    y = !0, f = null, W();
    let V = {};
    try {
      V = o != null && o.failedHandler ? await o.failedHandler.getAll() : {};
    } catch (L) {
      f = L.message;
    }
    d = {}, E.clear();
    for (const L of Object.keys(V)) {
      const N = [];
      for (const re of V[L])
        for (const ye of O(re))
          ye[0] && (N.push(ye), E.set(v(ye), ye));
      d[L] = N;
    }
    const M = Object.keys(d);
    (!u || !d[u]) && (u = M[0] ?? null);
    const P = u ? d[u] : [];
    (!p || !P.some((L) => v(L) === p)) && (p = P[0] ? v(P[0]) : null), y = !1, W();
  }
  async function j(V, M) {
    var re, ye, x, B;
    if (m)
      return;
    const P = E.get(V);
    if (!(P != null && P.length) || M === "drop" && i && !confirm(`Drop this transaction from the queue?
The local change stays in place — client and server may diverge.`))
      return;
    m = !0, W();
    const L = o == null ? void 0 : o.failedHandler, N = o == null ? void 0 : o.conflictHandler;
    try {
      if (M === "retry")
        await (L == null ? void 0 : L.retry(P));
      else if (M === "revert")
        await (L == null ? void 0 : L.revert(P));
      else if (M === "drop")
        await ((re = L == null ? void 0 : L.drop) == null ? void 0 : re.call(L, P));
      else if (M === "execute") {
        const Z = $(P);
        Z && await ((ye = N == null ? void 0 : N.resolve) == null ? void 0 : ye.call(N, Z, !0));
      } else if (M === "take-server") {
        const Z = $(P);
        Z && await ((x = N == null ? void 0 : N.resolve) == null ? void 0 : x.call(N, Z, !1));
      } else if (M === "resolve-prompt") {
        const Z = $(P);
        Z && await ((B = N == null ? void 0 : N.prompt) == null ? void 0 : B.call(N, Z));
      }
    } catch (Z) {
      alert("Action failed: " + Z.message);
    }
    m = !1, await H();
  }
  function w() {
    const V = (u ? d[u] : []).slice().sort((M, P) => g(M[0].status) - g(P[0].status) || M[0].createdAt - P[0].createdAt);
    return V.length ? le`<ul class="bd-txi-rows">${fe(V.map((M) => {
      const P = M[0], L = q(P), N = L ? `${P.transaction.blitzID} · ${L}` : P.transaction.blitzID, re = M.length > 1 ? le`<span class="bd-txi-chain">×${M.length}</span>` : "";
      return le`<li>
                <button class="bd-txi-row ${fe(v(M) === p ? "is-active" : "")}" data-select="${v(M)}">
                    <span class="bd-txi-dot bd-txi-${P.status}"></span>
                    <span class="bd-txi-row-main">
                        <span class="bd-txi-row-top">
                            <span class="bd-txi-action">${P.transaction.action}</span>
                            <span class="bd-txi-model">${P.transaction.model}</span>${fe(re)}
                        </span>
                        <span class="bd-txi-row-sub">${N}</span>
                    </span>
                </button>
            </li>`;
    }).join(""))}</ul>` : le`<p class="bd-txi-empty">${r}</p>`;
  }
  const T = 280;
  function z(V) {
    var x;
    const M = q(V);
    if (V.transaction.action !== "edit" || !M)
      return "";
    const P = ((x = V.transaction.data) == null ? void 0 : x[M]) ?? {}, L = S(P.prev), N = S(P.new), re = L.length + N.length > T, ye = le`<div class="bd-txi-diff ${fe(re ? "is-large" : "")}">
                <span class="bd-txi-prev">${L}</span>
                <span class="bd-txi-arrow">→</span>
                <span class="bd-txi-new">${N}</span>
            </div>`;
    return re ? le`<div class="bd-txi-field"><label>${M}</label>
            <details class="bd-txi-fold">
                <summary><span class="bd-txi-fold-preview">${N.slice(0, 120)}</span><span class="bd-txi-fold-meta">${String(L.length)} → ${String(N.length)} chars</span></summary>
                ${fe(ye)}
            </details></div>` : le`<div class="bd-txi-field"><label>${M}</label>${fe(ye)}</div>`;
  }
  function C(V) {
    var M;
    return (M = V.dataHistory) != null && M.length ? le`<div class="bd-txi-field"><label>History</label><ul class="bd-txi-history">${fe(V.dataHistory.map(
      (P) => le`<li><span class="bd-txi-htype">${P.type}</span><span class="bd-txi-htime">${I(P.timestamp)}</span><code>${S(P.data)}</code></li>`
    ).join(""))}</ul></div>` : "";
  }
  function A(V) {
    const M = V[0].status, P = [];
    if (M === F.Conflict) {
      const L = $(V) ? "" : ' disabled title="Chained conflict — cannot be resolved directly"';
      a ? (P.push(`<button class="bd-txi-btn is-primary" data-act="execute"${L}>Execute</button>`), P.push(`<button class="bd-txi-btn" data-act="take-server"${L}>Revert to server</button>`)) : l && P.push(`<button class="bd-txi-btn is-primary" data-act="resolve-prompt"${L}>Resolve…</button>`);
    } else
      M === F.Failed && (P.push('<button class="bd-txi-btn is-primary" data-act="retry">Retry</button>'), P.push('<button class="bd-txi-btn" data-act="revert">Revert</button>'));
    return le`<div class="bd-txi-actions">${fe(P.join(""))}</div>`;
  }
  function R() {
    if (!p)
      return '<div class="bd-txi-detail-empty">Select a transaction</div>';
    const V = E.get(p);
    if (!(V != null && V.length))
      return '<div class="bd-txi-detail-empty">Select a transaction</div>';
    const M = V[0], P = M.status === F.Pending, L = P ? '<div class="bd-txi-pending-note">In-flight — the worker may be delivering this. Actions are disabled to avoid racing it.</div>' : A(V);
    return le`<div class="bd-txi-card">
            ${fe(c && !P ? '<button class="bd-txi-drop" data-act="drop" title="Drop from queue">×</button>' : "")}
            <div class="bd-txi-card-head">
                <span class="bd-txi-status bd-txi-${M.status}">${M.status}</span>
                <span class="bd-txi-action">${M.transaction.action}</span>
                <span class="bd-txi-model">${M.transaction.model}</span>
            </div>
            <div class="bd-txi-field"><label>Object</label><code>${M.transaction.blitzID}</code></div>
            ${fe(z(M))}
            ${fe(K(V))}
            <div class="bd-txi-meta">
                <span><label>Server</label>${M.url}</span>
                <span><label>Queued</label>${I(M.createdAt)}</span>
                <span><label>Attempts</label>${M.attempts} (priority ${M.priority})</span>
                <span><label>Hash</label><code>${M.transaction.hash}</code></span>
            </div>
            ${fe(C(M))}
            ${fe(L)}
            ${fe(X(V))}
        </div>`;
  }
  function K(V) {
    const M = V.find((L) => L.message !== void 0);
    if (M)
      return le`<div class="bd-txi-field"><label>Server response</label><div class="bd-txi-message">${M.message}</div></div>`;
    const P = V[0].status;
    return P !== F.Failed && P !== F.Conflict ? "" : le`<div class="bd-txi-field"><label>Server response</label><div class="bd-txi-message is-empty">No server response recorded for this transaction.</div></div>`;
  }
  function X(V) {
    const M = V.length > 1, P = M ? V.map(
      (L, N) => le`<details class="bd-txi-raw-job"><summary>Job ${String(N + 1)} · ${L.status} · ${I(L.createdAt)}</summary><pre>${JSON.stringify(L, null, 2)}</pre></details>`
    ).join("") : le`<pre>${JSON.stringify(V[0], null, 2)}</pre>`;
    return le`<details class="bd-txi-raw">
            <summary>Raw JSON${fe(M ? le` <span class="bd-txi-chain-note">(${String(V.length)} chained jobs on this object)</span>` : "")}</summary>
            <button class="bd-txi-copy" data-copy>Copy</button>
            ${fe(P)}
        </details>`;
  }
  function me() {
    const V = Object.keys(d);
    return V.length < 2 ? "" : le`<select class="bd-txi-server">${fe(V.map(
      (M) => le`<option value="${M}" ${fe(M === u ? "selected" : "")}>${M}</option>`
    ).join(""))}</select>`;
  }
  function W() {
    if (h)
      return;
    s.classList.toggle("is-busy", m);
    const V = y ? '<div class="bd-txi-spinner"></div>' : f ? le`<p class="bd-txi-error">${f}</p>` : w();
    s.innerHTML = le`
            <div class="bd-txi-banner">
                <h2>Transactions</h2>
                <div class="bd-txi-tools">${fe(me())}<button class="bd-txi-refresh" title="Refresh">⟳</button></div>
            </div>
            <div class="bd-txi-body">
                <div class="bd-txi-list">${fe(V)}</div>
                <div class="bd-txi-detail">${fe(y || f ? "" : R())}</div>
            </div>`;
  }
  function Q(V) {
    var N;
    const M = V.target;
    if (M.closest(".bd-txi-refresh")) {
      H();
      return;
    }
    if (M.closest("[data-copy]")) {
      V.preventDefault(), p && ((N = navigator.clipboard) == null || N.writeText(JSON.stringify(E.get(p), null, 2)));
      return;
    }
    const P = M.closest("[data-act]");
    if (P && !P.hasAttribute("disabled")) {
      p && j(p, P.dataset.act ?? "");
      return;
    }
    const L = M.closest("[data-select]");
    L && (p = L.dataset.select ?? null, W());
  }
  function J(V) {
    const M = V.target.closest(".bd-txi-server");
    M && (u = M.value, p = null, W());
  }
  return s.addEventListener("click", Q), s.addEventListener("change", J), H(), {
    refresh: () => {
      H();
    },
    destroy: () => {
      h = !0, s.removeEventListener("click", Q), s.removeEventListener("change", J), s.classList.remove("bd-txi", "is-busy"), s.innerHTML = "";
    }
  };
}
const ri = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>';
function hs(e = {}) {
  const { label: t, right: n, ...s } = e, o = document.createElement("div");
  o.className = "bd-txi-tab", n !== void 0 && (o.style.right = `${n}px`), o.innerHTML = ri, o.append(t ?? "Transactions");
  const i = document.createElement("span");
  i.className = "bd-txi-tab-badge", i.style.display = "none", o.append(i), document.body.append(o);
  async function r() {
    const m = s.queue ?? pt.queue;
    if (typeof (m == null ? void 0 : m.getJobs) == "function")
      try {
        const E = (await m.getJobs() ?? []).filter((b) => b.status === F.Conflict || b.status === F.Failed).length;
        i.textContent = String(E), i.style.display = E > 0 ? "" : "none", o.classList.toggle("has-unresolved", E > 0);
      } catch {
      }
  }
  const c = () => {
    r();
  }, a = ["queue:success", "queue:failure", "queue:conflict", "queue:conflict-resolved"];
  for (const m of a)
    pt.addEventListener(m, c);
  const l = () => {
    document.hidden || r();
  };
  document.addEventListener("visibilitychange", l), r();
  let d = null, u = null, p = null;
  function y() {
    if (d)
      return;
    d = document.createElement("div"), d.className = "bd-txi-backdrop", d.setAttribute("data-bd-portal", "");
    const m = document.createElement("div");
    m.className = "bd-txi-panel", m.onclick = (b) => b.stopPropagation();
    const h = document.createElement("button");
    h.className = "bd-txi-panel-close", h.innerHTML = "&times;";
    const E = document.createElement("div");
    E.className = "bd-txi-panel-body", m.append(h, E), d.append(m), document.body.append(d), u = ys(E, s), d.onclick = () => f(), h.onclick = () => f(), p = et(d, {
      titleElm: E.querySelector(".bd-txi-banner h2"),
      closeElm: h,
      onEscape: () => f()
    }), o.style.display = "none", requestAnimationFrame(() => d == null ? void 0 : d.classList.add("is-open"));
  }
  function f() {
    if (!d)
      return;
    p == null || p(), p = null, u == null || u.destroy(), u = null;
    const m = d;
    d = null, m.classList.remove("is-open"), setTimeout(() => m.remove(), 200), o.style.display = "", r();
  }
  return o.addEventListener("click", y), {
    open: y,
    close: f,
    destroy: () => {
      f(), o.remove();
      for (const m of a)
        pt.removeEventListener(m, c);
      document.removeEventListener("visibilitychange", l);
    },
    refreshBadge: r
  };
}
const ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hs
}, Symbol.toStringTag, { value: "Module" })), kn = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  width: Math.abs(e.x - t.x),
  height: Math.abs(e.y - t.y)
}), ut = (e) => Math.min(1, Math.max(0, e));
function ai(e, t) {
  if (!(t.width > 0) || !(t.height > 0))
    return { x: 0, y: 0, width: 0, height: 0 };
  const n = ut(e.x / t.width), s = ut(e.y / t.height);
  return {
    x: n,
    y: s,
    width: Math.min(ut(e.width / t.width), 1 - n),
    height: Math.min(ut(e.height / t.height), 1 - s)
  };
}
const li = (e, t, n) => ({
  url: e,
  page: t,
  bbox: { x: n.x, y: n.y, width: n.width, height: n.height }
});
async function ci(e, t) {
  const n = ((t == null ? void 0 : t.extractorBaseUrl) ?? "").replace(/\/+$/, "");
  let s;
  try {
    s = await fetch(`${n}/pdfextractor/region-text`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...t != null && t.authorizationHeader ? { Authorization: t.authorizationHeader } : {}
      },
      body: JSON.stringify(e),
      signal: t == null ? void 0 : t.signal
    });
  } catch (o) {
    if ((o == null ? void 0 : o.name) === "AbortError")
      throw o;
    return { s: 0, error: (o == null ? void 0 : o.message) ?? "Network error" };
  }
  if (!s.ok)
    return { s: 0, error: `Extractor responded ${s.status}` };
  try {
    return await s.json();
  } catch {
    return { s: 0, error: "Extractor returned invalid JSON" };
  }
}
const di = /* @__PURE__ */ new Set(["varchar", "text", "markdown"]);
function ui(e) {
  return Object.entries(e ?? {}).filter(([t, n]) => !t.startsWith("_") && !t.startsWith("@") && typeof (n == null ? void 0 : n.type) == "string" && di.has(n.type)).map(([t, n]) => ({
    attribute: t,
    ...typeof n.label == "string" ? { label: n.label } : {}
  }));
}
const Mn = 1.25, pi = 0.25, fi = 8, Tn = 4;
async function mi(e, t) {
  var M, P;
  if (!(e instanceof HTMLElement))
    throw new Error("mountPdfRegionEditor: host element required");
  if (!(t != null && t.url))
    throw new Error("mountPdfRegionEditor: options.url required");
  const n = t.object, s = t.targetFields ?? ui(((P = (M = n == null ? void 0 : n.model) == null ? void 0 : M.getAttributesDetails) == null ? void 0 : P.call(M)) ?? {}), o = Te(e, "bd-pdfregion");
  e.innerHTML = le`
        <div class="bd-pdfregion-toolbar">
            <button type="button" class="bd-pdfregion-btn" data-nav="prev" title="Previous page">&#8249;</button>
            <span class="bd-pdfregion-page"></span>
            <button type="button" class="bd-pdfregion-btn" data-nav="next" title="Next page">&#8250;</button>
            <span class="bd-pdfregion-sep"></span>
            <button type="button" class="bd-pdfregion-btn" data-zoom="out" title="Zoom out">&#8722;</button>
            <span class="bd-pdfregion-zoom"></span>
            <button type="button" class="bd-pdfregion-btn" data-zoom="in" title="Zoom in">+</button>
            <button type="button" class="bd-pdfregion-btn" data-zoom="fit" title="Fit width">Fit width</button>
        </div>
        <div class="bd-pdfregion-stage">
            <div class="bd-pdfregion-canvaswrap">
                <canvas class="bd-pdfregion-canvas"></canvas>
                <div class="bd-pdfregion-overlay">
                    <div class="bd-pdfregion-selection" hidden></div>
                </div>
            </div>
        </div>
        <p class="bd-pdfregion-status" role="status"></p>
        <div class="bd-pdfregion-result">
            <div class="bd-pdfregion-result-head">
                <label class="bd-pdfregion-result-label">Extracted text</label>
                <span class="bd-pdfregion-badge" hidden></span>
            </div>
            <textarea class="bd-pdfregion-text" rows="6" placeholder="Draw a rectangle on the page to extract its text"></textarea>
            <div class="bd-pdfregion-save" ${fe(s.length ? "" : "hidden")}>
                <select class="bd-pdfregion-target">${fe(s.map(
    (L) => le`<option value="${L.attribute}">${L.label ?? L.attribute}</option>`
  ).join(""))}</select>
                <button type="button" class="bd-pdfregion-savebtn"${fe(n ? "" : ' disabled title="No object to save into"')}>Save</button>
            </div>
        </div>`;
  const i = (L) => e.querySelector(L), r = i(".bd-pdfregion-stage"), c = i(".bd-pdfregion-canvaswrap"), a = i(".bd-pdfregion-canvas"), l = i(".bd-pdfregion-overlay"), d = i(".bd-pdfregion-selection"), u = i(".bd-pdfregion-page"), p = i(".bd-pdfregion-zoom"), y = i(".bd-pdfregion-status"), f = i(".bd-pdfregion-badge"), m = i(".bd-pdfregion-text"), h = i(".bd-pdfregion-target"), E = i(".bd-pdfregion-savebtn");
  let b = !1, g = 1, v = 0, $ = 1, q = 0, S = 0, I = 0, O = null, H = null, j = null, w = null, T = null;
  const z = (L, N = "info") => {
    y.textContent = L, y.classList.toggle("is-error", N === "error");
  }, C = () => {
    w = null, d.hidden = !0;
  }, A = (L, N) => {
    const re = kn(L, N);
    d.hidden = !1, d.style.left = `${re.x}px`, d.style.top = `${re.y}px`, d.style.width = `${re.width}px`, d.style.height = `${re.height}px`;
  };
  async function R() {
    if (b || !H)
      return;
    const L = await H.getPage(g);
    if (b)
      return;
    q = L.getViewport({ scale: 1 }).width;
    const N = L.getViewport({ scale: $ });
    S = N.width, I = N.height;
    const re = typeof window < "u" && window.devicePixelRatio || 1;
    a.width = Math.floor(N.width * re), a.height = Math.floor(N.height * re), a.style.width = `${Math.floor(N.width)}px`, a.style.height = `${Math.floor(N.height)}px`, c.style.width = a.style.width, c.style.height = a.style.height, u.textContent = `Page ${g} of ${v}`, p.textContent = `${Math.round($ * 100)}%`, C();
    const ye = a.getContext("2d");
    if (ye) {
      j == null || j.cancel(), j = L.render({
        canvasContext: ye,
        viewport: N,
        ...re !== 1 ? { transform: [re, 0, 0, re, 0, 0] } : {}
      });
      try {
        await j.promise;
      } catch (x) {
        (x == null ? void 0 : x.name) !== "RenderingCancelledException" && z(`Page render failed: ${(x == null ? void 0 : x.message) ?? x}`, "error");
      }
    }
  }
  const K = (L) => {
    const N = Math.min(Math.max(1, L), v || 1);
    N !== g && (g = N, R());
  }, X = (L) => {
    $ = Math.min(Math.max(pi, L), fi), R();
  };
  async function me(L) {
    var ye;
    T == null || T.abort(), T = new AbortController(), z("Extracting text…"), f.hidden = !0;
    const N = li(t.url, g, L);
    let re;
    try {
      re = await ci(N, {
        extractorBaseUrl: t.extractorBaseUrl,
        authorizationHeader: t.authorizationHeader,
        signal: T.signal
      });
    } catch {
      return;
    }
    if (!b) {
      if (re.s !== 1) {
        z(re.error || "Extraction failed", "error");
        return;
      }
      m.value = re.text ?? "", f.textContent = re.source, f.dataset.source = re.source, f.hidden = !1, z(`Extracted from page ${g} — review and save`), (ye = t.onExtract) == null || ye.call(t, { text: m.value, source: re.source, page: g, bbox: L });
    }
  }
  const W = (L) => {
    const N = l.getBoundingClientRect();
    return { x: L.clientX - N.left, y: L.clientY - N.top };
  }, Q = (L) => {
    L.button !== 0 || !S || !I || (L.preventDefault(), w = W(L), A(w, w));
  }, J = (L) => {
    w && A(w, W(L));
  }, ue = (L) => {
    if (!w)
      return;
    const N = kn(w, W(L));
    if (w = null, N.width < Tn || N.height < Tn) {
      C();
      return;
    }
    me(ai(N, { width: S, height: I }));
  };
  l.addEventListener("mousedown", Q), window.addEventListener("mousemove", J), window.addEventListener("mouseup", ue);
  const pe = (L) => {
    const N = L.target.closest("[data-nav], [data-zoom]");
    N && (N.dataset.nav === "prev" ? K(g - 1) : N.dataset.nav === "next" ? K(g + 1) : N.dataset.zoom === "in" ? X($ * Mn) : N.dataset.zoom === "out" ? X($ / Mn) : N.dataset.zoom === "fit" && q && r.clientWidth && X(r.clientWidth / q));
  };
  i(".bd-pdfregion-toolbar").addEventListener("click", pe);
  const ge = async () => {
    var re, ye, x;
    const L = h.value, N = ((re = n == null ? void 0 : n._attributes) == null ? void 0 : re[L]) ?? ((ye = n == null ? void 0 : n.getAttribute) == null ? void 0 : ye.call(n, L));
    if (typeof (N == null ? void 0 : N.edit) != "function") {
      z(`Attribute '${L}' is not editable on this object`, "error");
      return;
    }
    E.disabled = !0;
    try {
      await N.edit(m.value), z(`Saved to ${L}`), (x = t.onSaved) == null || x.call(t, L, m.value);
    } catch (B) {
      z(`Save failed: ${(B == null ? void 0 : B.message) ?? B}`, "error");
    } finally {
      E.disabled = !n;
    }
  };
  E.addEventListener("click", ge);
  const V = () => {
    var L;
    b || (b = !0, T == null || T.abort(), j == null || j.cancel(), (L = O == null ? void 0 : O.destroy) == null || L.call(O), l.removeEventListener("mousedown", Q), window.removeEventListener("mousemove", J), window.removeEventListener("mouseup", ue), e.innerHTML = "", o());
  };
  z("Loading PDF…");
  try {
    const L = await import("./pdf-f4394f77.js");
    t.workerSrc ? L.GlobalWorkerOptions.workerSrc = t.workerSrc : !L.GlobalWorkerOptions.workerSrc && !globalThis.pdfjsWorker && await import("./pdf.worker.min-9015606c.js"), O = L.getDocument({ url: t.url }), H = await O.promise;
  } catch (L) {
    return b || z(`Failed to open PDF: ${(L == null ? void 0 : L.message) ?? L}`, "error"), { destroy: V };
  }
  return b ? { destroy: V } : (v = H.numPages, z(""), await R(), { destroy: V });
}
const yi = () => import("./BDComments-f65ff7b1.js").then((e) => e.f).then((e) => e.default), hi = "2.21.6";
typeof window < "u" && !window.BlitzUIManager && (window.BlitzUIManager = {
  default: Gt,
  BlitzUIManagerExtended: si,
  VERSION: hi,
  loadBDComments: yi,
  ImageLightbox: oi,
  openImageLightbox: en,
  attachImageLightbox: ms,
  TagInput: Lt,
  mountTransactionInspector: ys,
  addInspectorLink: hs,
  mountObjectHistory: xt,
  mountObjectHistoryModal: Xt,
  mountPdfRegionEditor: mi,
  previousValueOf: cs,
  branchOf: ls,
  html: le,
  raw: fe,
  esc: be,
  safeUrl: qe,
  renderMarkdown: Zn,
  announceEditorDone: _e
}, window.dispatchEvent(new CustomEvent("blitzuimanager:ready")));
export {
  qe as A,
  ke as B,
  $e as C,
  si as D,
  ot as E,
  Gt as F,
  de as G,
  jn as H,
  Re as I,
  jo as L,
  Fe as N,
  Ke as T,
  hi as V,
  sr as Y,
  Qo as a,
  gr as b,
  Te as c,
  Pt as d,
  _e as e,
  wn as f,
  be as g,
  Lt as h,
  ys as i,
  hs as j,
  xt as k,
  Xt as l,
  De as m,
  mi as n,
  cs as o,
  vr as p,
  ls as q,
  Zn as r,
  oi as s,
  Xo as t,
  en as u,
  ms as v,
  yi as w,
  le as x,
  $r as y,
  fe as z
};
