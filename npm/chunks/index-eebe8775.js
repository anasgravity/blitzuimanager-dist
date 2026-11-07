var bs = Object.defineProperty;
var ws = (e, t, n) => t in e ? bs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var le = (e, t, n) => (ws(e, typeof t != "symbol" ? t + "" : t, n), n);
import { JobStatus as z, blitzstampToDate as ft, blitzstampFromDate as Es, LocalStorageRepository as $s, TextType as mt, BlitzData as pt } from "@blitzdata.ts/core";
const Ss = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0, _n = (e) => Array.isArray(e) ? e[0] : e, vt = (e, t) => e.endsWith("_fk") ? "fk" : e.endsWith("_mtm") ? "mtm" : _n(t), nn = ["view", "control", "filter", "editor", "default", "empty"];
class Cs {
  constructor(t) {
    le(this, "builtins", /* @__PURE__ */ new Map());
    le(this, "typeOverlays", /* @__PURE__ */ new Map());
    le(this, "attrOverlays", /* @__PURE__ */ new Map());
    le(this, "presets", /* @__PURE__ */ new Map());
    le(this, "bindings", /* @__PURE__ */ new Map());
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
        for (const E of nn) {
          const g = f[E];
          g !== void 0 && (d[E] = g, d.sources[E] = { layer: m, label: h });
        }
        f.defaultConfig && Object.assign(d.defaultConfig, f.defaultConfig);
      }
    }, p = (f, m, h) => {
      const E = this.presets.get(f);
      if (E) {
        const { extends: v, ...b } = E;
        return v && u({ ...this.builtins.get(v), ...this.typeOverlays.get(v) }, m, `${h} (extends '${v}')`), u(b, m + 1, h), !0;
      }
      const g = { ...this.builtins.get(f), ...this.typeOverlays.get(f) };
      return Object.keys(g).length ? (u(g, m + 1, h), !0) : !1;
    };
    u(this.builtins.get(s), 0, "built-in"), o && u(this.builtins.get(`${s}[]`), 0, "built-in (many)"), u(this.typeOverlays.get(s), 1, "defineUI"), o && u(this.typeOverlays.get(`${s}[]`), 1, "defineUI (many)");
    const y = o ? void 0 : this.bindings.get(s);
    if (y && !p(y.preset, 2, y.label ?? `binding '${y.preset}'`) && this.warn(`type '${s}' is bound to '${y.preset}' — not registered, using '${s}' default`), c && !p(c, 4, `preset '${c}'`) && this.warn(`${i ?? "?"}.${r ?? "?"} requests ui '${c}' — not registered, using '${s}' default`), i && r && u(this.attrOverlays.get(`${i}.${r}`), 6, "defineUIFor"), a && (typeof a == "string" ? p(a, 7, `use '${a}'`) || this.warn(`mount requests ui '${a}' — not registered, using '${s}' default`) : typeof a == "function" ? u({ control: a }, 8, "use (control)") : u(a, 8, "use (module)")), n) {
      const f = nn.filter((m) => d.sources[m]).map((m) => `${m} from ${d.sources[m].label}`);
      n(`${i ?? "?"}.${r ?? s} → ${f.join("; ") || "nothing registered"}`);
    }
    return d;
  }
  mapEntry(t, n) {
    let s = t.get(n);
    return s || (s = {}, t.set(n, s)), s;
  }
}
class xs {
  constructor() {
    le(this, "typeConfig", {});
    le(this, "attributeConfig", {});
    le(this, "settings", {});
    le(this, "services", {});
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
function Hn(e, t, n, s) {
  const o = e, i = o && typeof o == "object" ? o[t] : void 0;
  return i == null ? s : Je(void 0, i, n, s);
}
function In(e, t) {
  var n, s, o;
  return ((s = (n = e == null ? void 0 : e.getAttributesDetails) == null ? void 0 : n.call(e)) == null ? void 0 : s[t]) ?? ((o = e == null ? void 0 : e.getUserAttributeDetails) == null ? void 0 : o.call(e, t)) ?? {};
}
function st(e) {
  return e !== null && typeof e == "object" && Object.hasOwn(e, "_value") ? e.value : e;
}
function ks(e) {
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
function On(e) {
  return new Promise((t, n) => {
    if (window.google && window.google.maps) {
      t();
      return;
    }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${e}&libraries=places`, s.async = !0, s.defer = !0, s.onload = () => t(), s.onerror = () => n(new Error("Failed to load Google Maps API")), document.head.appendChild(s);
  });
}
async function Ms(e, t, n) {
  if (await On(n), !window.google || !window.google.maps)
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
const Ts = new Function("url", "return import(url)");
async function sn(e, t = Ts) {
  const n = await t(e), s = n == null ? void 0 : n.default;
  if (typeof s != "function" && (typeof s != "object" || s === null))
    throw new Error("module must export a DatatypeUI (or control function) as its default export");
  return n;
}
function tt(e, t) {
  var o, i, r, c;
  const n = In((o = e._object) == null ? void 0 : o.model, e._name), s = n.type ?? e._type;
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
function As(e, t, n, s, o) {
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
function jn(e, t, n, s, o, i) {
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
function on(e) {
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
function Nn(e) {
  const t = Object.keys(e);
  return t.length === 0 ? null : (n) => t.every((s) => {
    var o;
    return _s((o = n[s]) == null ? void 0 : o.value, e[s]);
  });
}
const rn = (e) => e.map(
  (t) => t && Object.hasOwn(t, "_value") ? t.value : t && Object.hasOwn(t, "_blitzID") ? t._blitzID : t
);
function _s(e, t) {
  switch (t.op) {
    case "contains":
      return typeof e == "string" && !!e.match(new RegExp(qt(String(t.value)), "i"));
    case "eq":
      return Array.isArray(e) ? rn(e).includes(t.value) : e == t.value;
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
        const s = rn(e);
        return n.some((o) => s.includes(o));
      }
      return n.includes(e);
    }
    default:
      return !0;
  }
}
const Hs = {
  pending: "Saving…",
  conflict: "Conflict — the server holds a different value. Click for details.",
  failed: "Save failed — the server rejected this change. Click for details."
};
function Dn(e, t) {
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
    s = !0, n || (n = document.createElement("span"), e.classList.add("bd-has-status"), e.append(n)), n.className = `bd-status-badge bd-status-${o.status}`, n.title = Hs[o.status] ?? o.status;
    const i = (r = o.job) == null ? void 0 : r.message;
    n.onclick = i ? (c) => {
      c.stopPropagation(), alert(i);
    } : null;
  });
}
class yt {
  constructor() {
    le(this, "_stops", []);
    le(this, "_children", /* @__PURE__ */ new Map());
    le(this, "_destroyed", !1);
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
    this._destroyed || typeof (n == null ? void 0 : n.syncStatus) != "function" || this._stops.push(Dn(t, (s) => n.syncStatus(s)));
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
const Is = (e, t) => (n) => {
  var s;
  return e({
    ...n,
    value: (s = n.value) == null ? void 0 : s.value,
    onChange: (o) => n.onChange(o == null || o === "" ? null : { op: t, value: o })
  });
}, Os = /* @__PURE__ */ new Set(["varchar", "text", "markdown", "email", "url", "tag", "hex", "formula", "youtube"]), an = (e, t) => t && Os.has(e) ? Is(t, "contains") : void 0, nt = (e) => typeof e == "function" ? e : () => {
};
class js {
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
    return !!(n.filter ?? an(t.type, n.control));
  }
  /**
   * Filter semantics live here, not just inside mountFiltersForm: an app
   * arranging its own filter UI builds ports and compiles the collected
   * query through the same kernel it mounts with — one reachable handle,
   * no second copy of the rules.
   */
  query(t, n, s, o, i, r) {
    return jn(t, n, s, o, i, r);
  }
  compileConditions(t) {
    return Nn(t);
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
      const u = d(t.attribute ?? on(t), t.mountConfig);
      if (!u)
        return () => {
        };
      const p = () => {
        var m;
        return t.status && ((m = t.mountConfig) == null ? void 0 : m.status) !== !1 ? Dn(n, t.status) : void 0;
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
      const d = i.filter ?? an(t.type, i.control);
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
    const o = ((a = s.sources.editor) == null ? void 0 : a.layer) ?? -1, i = ((l = s.sources.control) == null ? void 0 : l.layer) ?? -1, r = s.control ? { run: () => s.control(n), layer: i } : void 0, c = s.editor ? { run: () => s.editor({ ...n, attribute: t.attribute ?? on(t) }), layer: o } : void 0;
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
function Ft(e) {
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
function Et(e, t, n, s = ["outline", "floating", "inset"]) {
  if (e && s.includes(e)) {
    if (e === "inset" && t)
      return { type: "inset", text: t };
    if (e === "floating" && (t || n))
      return { type: "floating", text: t || n };
  }
  return { type: "outline", text: t };
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
    labelType: i,
    placeholder: r,
    iconSvg: c,
    type: a,
    pattern: l,
    errorMsg: d,
    initialValue: u,
    className: p,
    onChange: y
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const f = typeof e == "string" ? document.getElementById(e) : e;
  if (!(f instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const m = wt(
    () => _.value,
    y,
    (j) => !l || l.test(j)
  ), h = s ? $e.OnSubmit : n;
  let E = !1, g = null, v = -1, b = s ? u instanceof Array ? u : typeof u == "string" ? [u] : [] : [];
  const S = Et(i, o, r), q = S.type !== "floating" || o && r ? r : " ", $ = Te(f, "bd-text-input", p);
  f.innerHTML = `<div class="container${S.type !== "outline" ? ` label-${S.type}${c ? " has-icon" : ""}` : ""}">
        ${S.type === "outline" && o ? `<p class="label">${o}</p>` : ""}
        <input class="input" type="${a || "text"}" ${u && !s ? `value="${u}"` : ""}
            ${q ? `placeholder="${q}"` : ""} />${S.type !== "outline" ? `<p class="label">${S.text}</p>` : ""}
        ${l ? `<p class="error-msg" style="display: none;">${d ?? "Wrong value!"}</p>` : ""}
        ${c ? `<div class="icon">${c}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${h === $e.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
        ${s ? '<div class="multi-values"></div>' : ""}
    </div>`;
  const D = f.querySelector(".container"), _ = f.querySelector(".input"), H = f.querySelector(".error-msg"), I = f.querySelector(".submit"), w = f.querySelector(".multi-values"), k = f.querySelector(".icon"), F = f.querySelector(".actions"), M = f.querySelector(".sync-status"), O = (j) => {
    S.type !== "outline" && D.classList.toggle("invalid", j);
  };
  if (c && (_.style.paddingLeft = "34px"), S.type === "outline" && o && (k && (k.style.top = "34px"), F.style.top = "34px"), h !== $e.OnSubmit) {
    m.prime();
    const j = () => {
      const G = !l || l.test(_.value);
      return H && (H.style.display = G ? "none" : ""), O(!G), G;
    };
    _.addEventListener("input", () => {
      j() && h === $e.OnChange && m.schedule();
    }), _.addEventListener("blur", () => {
      j() && m.commit();
    }), s || _.addEventListener("keydown", (G) => {
      if (G.key === "Escape") {
        m.cancel(), _.value = m.lastValue() ?? "", j(), _.blur();
        return;
      }
      G.key === "Enter" && (j() && m.commit(), _e(f));
    });
  } else
    I && (_.oninput = () => {
      E = !0, _.style.paddingRight = "34px", I.innerHTML = Re.SAVE, I.style.cursor = "pointer", I.style.display = "";
    }, _.onkeyup = (j) => {
      j.key === "Enter" && I.onclick && I.onclick({});
    }, I.onclick = () => {
      E && (!l || l.test(_.value) ? (H && (H.style.display = "none"), O(!1), y && (E = !1, I.innerHTML = Re.DONE, I.style.cursor = "initial", s ? (b.push(_.value), _.value = "", K(), y(b)) : (y(_.value), _e(f)))) : (H && (H.style.display = ""), O(!0)));
    });
  const J = (j) => {
    var G;
    j && (j.status === z.Completed && !g || (g = j.status, v > -1 && (clearTimeout(v), v = -1), M.style.display = "initial", M.style.cursor = "initial", M.onclick = null, j.status === z.Pending ? (M.innerHTML = "&#xe91e;", M.style.color = "#d5d5d5") : j.status === z.Failed ? (M.innerHTML = "&#xe91a;", M.style.color = "#a82e25", (G = j.job) != null && G.message && (M.style.cursor = "pointer", M.onclick = (B) => {
      var Y;
      B.stopPropagation(), alert((Y = j.job) == null ? void 0 : Y.message);
    })) : j.status === z.Conflict ? (M.innerHTML = "&#xe91d;", M.style.color = "#a82e25", M.title = "Conflict") : j.status === z.Completed && (M.innerHTML = "&#xe91c;", M.style.color = "#0ac96a", v = window.setTimeout(() => {
      M.style.display = "none", v = -1;
    }, 1e3))));
  }, K = () => {
    if (w) {
      w.innerHTML = b.map((j) => `<p class="multi-item">${j} <span value="${j}">x</span></p>`).join(`
`);
      for (const j of w.querySelectorAll("span"))
        j.onclick = (G) => {
          b = b.filter((B) => B !== G.currentTarget.getAttribute("value")), y && y(b), K();
        };
    }
  };
  return s && K(), {
    handleSyncStatus: J,
    destroy: () => {
      h !== $e.OnSubmit && !s && m.commit(), D.remove(), $();
    }
  };
}
function Ke(e, t) {
  const {
    trigger: n = $e.OnChange,
    multiple: s,
    label: o,
    labelType: i,
    placeholder: r,
    iconSvg: c,
    rows: a = 10,
    resize: l = !0,
    initialValue: d,
    className: u,
    onChange: p
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const y = typeof e == "string" ? document.getElementById(e) : e;
  if (!(y instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let f = s ? void 0 : d, m = -1;
  const h = () => {
    m > -1 && (clearTimeout(m), m = -1);
  }, E = p ? (j) => {
    h(), m = setTimeout(() => {
      m = -1, f = j, p(j);
    }, 500);
  } : void 0, g = s ? $e.OnSubmit : n;
  let v = !1, b = null, S = -1, q = s ? d instanceof Array ? d : typeof d == "string" ? [d] : [] : [];
  const $ = Et(i, o, r), D = $.type !== "floating" || o && r ? r : " ", _ = Te(y, "bd-textarea-input", u);
  y.innerHTML = `<div class="container${$.type !== "outline" ? ` label-${$.type}${c ? " has-icon" : ""}` : ""}">
        ${$.type === "outline" && o ? `<p class="label">${o}</p>` : ""}
        <textarea class="input" ${D ? `placeholder="${D}"` : ""}
            rows="${a.toString()}">${d && !s ? d : ""}</textarea>${$.type !== "outline" ? `<p class="label">${$.text}</p>` : ""}
        ${c ? `<div class="icon">${c}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${g === $e.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
        ${s ? '<div class="multi-values"></div>' : ""}
    </div>`;
  const H = y.querySelector(".container"), I = y.querySelector(".input"), w = y.querySelector(".submit"), k = y.querySelector(".multi-values"), F = y.querySelector(".icon"), M = y.querySelector(".actions"), O = y.querySelector(".sync-status");
  I.style.resize = l ? "vertical" : "none", c && (I.style.paddingLeft = "34px"), $.type === "outline" && o && (F && (F.style.top = "34px"), M.style.top = "34px"), g !== $e.OnSubmit ? (I.addEventListener(g === $e.OnFocusOut ? "blur" : "input", (j) => {
    const G = j.target.value;
    G !== f && E && E(G);
  }), I.addEventListener("keydown", (j) => {
    j.key === "Escape" && (h(), I.value = typeof f == "string" ? f : "", I.blur());
  })) : w && (I.oninput = () => {
    v = !0, I.style.paddingRight = "34px", w.innerHTML = Re.SAVE, w.style.cursor = "pointer", w.style.display = "";
  }, w.onclick = () => {
    v && p && (v = !1, w.innerHTML = Re.DONE, w.style.cursor = "initial", s ? (q.push(I.value), I.value = "", K(), p(q)) : p(I.value));
  });
  const J = (j) => {
    var G;
    j && (j.status === z.Completed && !b || (b = j.status, S > -1 && (clearTimeout(S), S = -1), O.style.display = "initial", O.style.cursor = "initial", O.onclick = null, j.status === z.Pending ? (O.innerHTML = "&#xe91e;", O.style.color = "#d5d5d5") : j.status === z.Failed ? (O.innerHTML = "&#xe91a;", O.style.color = "#a82e25", (G = j.job) != null && G.message && (O.style.cursor = "pointer", O.onclick = (B) => {
      var Y;
      B.stopPropagation(), alert((Y = j.job) == null ? void 0 : Y.message);
    })) : j.status === z.Conflict ? (O.innerHTML = "&#xe91d;", O.style.color = "#a82e25", O.title = "Conflict") : j.status === z.Completed && (O.innerHTML = "&#xe91c;", O.style.color = "#0ac96a", S = window.setTimeout(() => {
      O.style.display = "none", S = -1;
    }, 1e3))));
  }, K = () => {
    if (k) {
      k.innerHTML = q.map((j) => `<p class="multi-item">${j} <span value="${j}">x</span></p>`).join(`
`);
      for (const j of k.querySelectorAll("span"))
        j.onclick = (G) => {
          q = q.filter((B) => B !== G.currentTarget.getAttribute("value")), p && p(q), K();
        };
    }
  };
  return s && K(), {
    handleSyncStatus: J,
    getValue: () => I.value,
    isPending: () => m > -1,
    cancelPending: h,
    destroy: () => {
      H.remove(), _();
    }
  };
}
function Vt(e, t) {
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
  f.onkeyup = (b) => {
    b.key === "Enter" && m.onclick && m.onclick({});
  }, m.onclick = () => {
    if (f.value) {
      if (u.includes(f.value)) {
        f.value = "";
        return;
      }
      u.push(f.value), f.value = "", v(), c && c(u);
    }
  };
  const g = (b) => {
    var S;
    b && (b.status === z.Completed && !l || (l = b.status, d > -1 && (clearTimeout(d), d = -1), h.style.display = "initial", h.style.cursor = "initial", h.onclick = null, b.status === z.Pending ? (h.innerHTML = "&#xe91e;", h.style.color = "#d5d5d5") : b.status === z.Failed ? (h.innerHTML = "&#xe91a;", h.style.color = "#a82e25", (S = b.job) != null && S.message && (h.style.cursor = "pointer", h.onclick = (q) => {
      var $;
      q.stopPropagation(), alert(($ = b.job) == null ? void 0 : $.message);
    })) : b.status === z.Conflict ? (h.innerHTML = "&#xe91d;", h.style.color = "#a82e25", h.title = "Conflict") : b.status === z.Completed && (h.innerHTML = "&#xe91c;", h.style.color = "#0ac96a", d = window.setTimeout(() => {
      h.style.display = "none", d = -1;
    }, 1e3))));
  }, v = () => {
    E.innerHTML = u.length === 0 ? `
            <p class="empty">${i ?? "No items added yet!"}</p>
        ` : u.map((b) => `<div class="value-item">
                <div>${b}</div>
                <div class="remove" value="${b}"></div>
            </div>`).join(`
`);
    for (const b of E.querySelectorAll(".value-item .remove"))
      b.onclick = (S) => {
        u = u.filter((q) => q !== S.currentTarget.getAttribute("value")), c && c(u), v();
      };
  };
  return v(), {
    handleSyncStatus: g,
    destroy: () => {
      y.remove(), p();
    }
  };
}
const $t = (e, t) => {
  typeof (t == null ? void 0 : t.getDraft) == "function" && (e.getDraft = () => t.getDraft()), typeof (t == null ? void 0 : t.getValue) == "function" && (e.getDraft = () => t.getValue()), typeof (t == null ? void 0 : t.isPending) == "function" && (e.isPending = () => t.isPending()), typeof (t == null ? void 0 : t.cancelPending) == "function" && (e.cancelPending = () => t.cancelPending());
}, lt = (e) => async (t) => {
  const n = await e(t.attribute, t.host, t.config), s = () => {
    var o;
    return (o = n == null ? void 0 : n.destroy) == null ? void 0 : o.call(n);
  };
  return $t(s, n), s;
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
  return $t(i, s), i;
}, Oe = (e) => (Array.isArray(e) ? e.length > 0 : e !== "" && e != null) ? e : null, Ns = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
    <rect stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" x="3" y="5" width="18" height="14" rx="2" />
</svg>`, Ds = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" />
</svg>`, Ps = Me(Vt, ({ onChange: e }) => ({
  onChange: (t) => e(Oe(t))
})), qs = {
  type: ["varchar", "tag", "formula"],
  empty: (e) => !e,
  control: Me(Ae, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Oe(t))
  }))
}, Fs = {
  type: "hex",
  empty: (e) => !e,
  // same validation contract as the hex editor — bad values stop at the door
  defaultConfig: { pattern: /^[0-9a-fA-F]*$/, errorMsg: "Hex digits only (0-9, a-f)!" },
  control: Me(Ae, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Oe(t))
  }))
}, Vs = {
  type: ["varchar[]", "text[]", "tag[]"],
  default: () => [],
  control: Ps
}, zs = {
  type: ["text", "markdown"],
  empty: (e) => !e,
  // grid 'auto': a value the cell can't show inline (>= modalThreshold)
  // opens the modal directly, shorter ones edit inline with an expand icon
  defaultConfig: { presentation: { grid: "auto", form: "expandable" }, modalThreshold: 100 },
  control: Me(Ke, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Oe(t))
  }))
}, Rs = {
  type: "email",
  empty: (e) => !e,
  defaultConfig: { type: "email", iconSvg: Ns },
  control: Me(Ae, ({ onChange: e }) => ({
    onChange: (t) => e(Oe(t))
  }))
}, Bs = {
  type: ["url", "youtube"],
  empty: (e) => !e,
  defaultConfig: { type: "url", iconSvg: Ds },
  control: Me(Ae, ({ onChange: e }) => ({
    onChange: (t) => e(Oe(t))
  }))
};
function Fe(e, t) {
  const {
    trigger: n = $e.OnChange,
    label: s,
    labelType: o,
    placeholder: i,
    iconSvg: r,
    min: c,
    max: a,
    float: l,
    initialValue: d,
    className: u,
    onChange: p
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const y = typeof e == "string" ? document.getElementById(e) : e;
  if (!(y instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const f = wt(() => I(q.value), p);
  let m = !1, h = null, E = -1;
  const g = Et(o, s, i), v = g.type !== "floating" || s && i ? i : " ", b = Te(y, "bd-number-input", u);
  y.innerHTML = `<div class="container${g.type !== "outline" ? ` label-${g.type}${r ? " has-icon" : ""}` : ""}">
        ${g.type === "outline" && s ? `<p class="label">${s}</p>` : ""}
        <input class="input" type="number" ${v ? `placeholder="${v}"` : ""}
            ${d != null ? `value="${d.toString()}"` : ""}
            ${c != null ? `min="${c.toString()}"` : ""}
            ${a != null ? `max="${a.toString()}"` : ""}
        />${g.type !== "outline" ? `<p class="label">${g.text}</p>` : ""}
        ${r ? `<div class="icon">${r}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${n === $e.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
    </div>`;
  const S = y.querySelector(".container"), q = y.querySelector(".input"), $ = y.querySelector(".submit"), D = y.querySelector(".icon"), _ = y.querySelector(".actions"), H = y.querySelector(".sync-status");
  _.style.right = n === $e.OnSubmit ? "10px" : "32px", r && (q.style.paddingLeft = "34px"), g.type === "outline" && s && (D && (D.style.top = "34px"), _.style.top = "34px");
  const I = (k) => k === "" ? null : (l ? parseFloat(k) : parseInt(k)) || 0;
  return n !== $e.OnSubmit ? (f.prime(), q.addEventListener("input", () => {
    n === $e.OnChange && f.schedule();
  }), q.addEventListener("blur", () => f.commit()), q.addEventListener("keydown", (k) => {
    if (k.key === "Escape") {
      f.cancel();
      const F = f.lastValue();
      q.value = F != null ? F.toString() : "", q.blur();
      return;
    }
    k.key === "Enter" && (f.commit(), _e(y));
  })) : $ && (q.addEventListener("input", () => {
    m = !0, q.style.paddingRight = "34px", $.innerHTML = Re.SAVE, $.style.cursor = "pointer", $.style.display = "";
  }), $.addEventListener("click", () => {
    m && p && (m = !1, $.innerHTML = Re.DONE, $.style.cursor = "initial", p(I(q.value)), _e(y));
  })), {
    handleSyncStatus: (k) => {
      var F;
      k && (k.status === z.Completed && !h || (h = k.status, E > -1 && (clearTimeout(E), E = -1), H.style.display = "initial", H.style.cursor = "initial", H.onclick = null, k.status === z.Pending ? (H.innerHTML = "&#xe91e;", H.style.color = "#d5d5d5") : k.status === z.Failed ? (H.innerHTML = "&#xe91a;", H.style.color = "#a82e25", (F = k.job) != null && F.message && (H.style.cursor = "pointer", H.onclick = (M) => {
        var O;
        M.stopPropagation(), alert((O = k.job) == null ? void 0 : O.message);
      })) : k.status === z.Conflict ? (H.innerHTML = "&#xe91d;", H.style.color = "#a82e25", H.title = "Conflict") : k.status === z.Completed && (H.innerHTML = "&#xe91c;", H.style.color = "#0ac96a", E = window.setTimeout(() => {
        H.style.display = "none", E = -1;
      }, 1e3))));
    },
    destroy: () => {
      n !== $e.OnSubmit && f.commit(), S.remove(), b();
    }
  };
}
const zt = ({ host: e, value: t, onChange: n, config: s }) => {
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
}, Us = {
  type: ["int", "tinyint"],
  empty: (e) => e == null,
  control: Me(Fe),
  filter: zt
}, Ws = {
  type: ["double", "float", "percentage", "currency"],
  empty: (e) => e == null,
  defaultConfig: { float: !0 },
  control: Me(Fe),
  filter: zt
}, Js = {
  type: "duration",
  empty: (e) => e == null,
  control: Me(Fe, ({ config: e }) => ({
    min: e.min ?? 0,
    placeholder: "seconds"
  })),
  filter: zt
};
function Rt(e, t) {
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
    h && (h.status === z.Completed && !a || (a = h.status, l > -1 && (clearTimeout(l), l = -1), p.style.display = "initial", p.style.cursor = "initial", p.onclick = null, h.status === z.Pending ? (p.innerHTML = "&#xe91e;", p.style.color = "#d5d5d5") : h.status === z.Failed ? (p.innerHTML = "&#xe91a;", p.style.color = "#a82e25", (E = h.job) != null && E.message && (p.style.cursor = "pointer", p.onclick = (g) => {
      var v;
      g.stopPropagation(), alert((v = h.job) == null ? void 0 : v.message);
    })) : h.status === z.Conflict ? (p.innerHTML = "&#xe91d;", p.style.color = "#a82e25", p.title = "Conflict") : h.status === z.Completed && (p.innerHTML = "&#xe91c;", p.style.color = "#0ac96a", l = window.setTimeout(() => {
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
  const { trigger: n = $e.OnChange, label: s, labelType: o, time: i, initialValue: r, className: c, onChange: a } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const l = typeof e == "string" ? document.getElementById(e) : e;
  if (!(l instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let d = !1, u = null, p = -1;
  const y = Et(o, s, void 0, ["outline", "inset"]), f = Te(l, "bd-date-input", c);
  l.innerHTML = `<div class="container${y.type !== "outline" ? ` label-${y.type}` : ""}">
        ${y.type === "outline" && s ? `<p class="label">${s}</p>` : ""}
        <input class="input" type="${i ? "datetime-local" : "date"}" ${r ? `value="${r}"` : ""} />${y.type !== "outline" ? `<p class="label">${y.text}</p>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${n === $e.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
    </div>`;
  const m = l.querySelector(".container"), h = l.querySelector(".input"), E = l.querySelector(".actions"), g = l.querySelector(".submit"), v = l.querySelector(".sync-status");
  E.style.right = n === $e.OnSubmit ? "10px" : "38px", y.type === "outline" && s && (E.style.top = "34px");
  const S = wt(() => {
    let $ = h.value.replace("T", " ");
    return $ && $.split(":").length === 2 && ($ = $ + ":00"), $ || null;
  }, a);
  return n !== $e.OnSubmit ? (S.prime(), h.addEventListener(n === $e.OnFocusOut ? "blur" : "input", () => S.commit()), h.addEventListener("change", () => {
    S.commit(), _e(l);
  }), h.addEventListener("keydown", ($) => {
    $.key === "Enter" && (S.commit(), _e(l));
  })) : g && (h.addEventListener("input", () => {
    d = !0, h.style.paddingRight = "34px", g.innerHTML = Re.SAVE, g.style.cursor = "pointer", g.style.display = "";
  }), g.addEventListener("click", () => {
    d && (d = !1, g.innerHTML = Re.DONE, g.style.cursor = "initial", S.commit(), _e(l));
  })), {
    handleSyncStatus: ($) => {
      var D;
      $ && ($.status === z.Completed && !u || (u = $.status, p > -1 && (clearTimeout(p), p = -1), v.style.display = "initial", v.style.cursor = "initial", v.onclick = null, $.status === z.Pending ? (v.innerHTML = "&#xe91e;", v.style.color = "#d5d5d5") : $.status === z.Failed ? (v.innerHTML = "&#xe91a;", v.style.color = "#a82e25", (D = $.job) != null && D.message && (v.style.cursor = "pointer", v.onclick = (_) => {
        var H;
        _.stopPropagation(), alert((H = $.job) == null ? void 0 : H.message);
      })) : $.status === z.Conflict ? (v.innerHTML = "&#xe91d;", v.style.color = "#a82e25", v.title = "Conflict") : $.status === z.Completed && (v.innerHTML = "&#xe91c;", v.style.color = "#0ac96a", p = window.setTimeout(() => {
        v.style.display = "none", p = -1;
      }, 1e3))));
    },
    destroy: () => {
      n !== $e.OnSubmit && S.commit(), m.remove(), f();
    }
  };
}
function Bt(e, t) {
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
    const $ = {};
    for (const D of y.querySelectorAll(".row")) {
      const _ = D.querySelector(".locale").value.trim(), H = D.querySelector(".string").value;
      _ && ($[_] = H);
    }
    return $;
  }, E = wt(
    () => JSON.stringify(h()),
    c ? ($) => c(JSON.parse($)) : void 0
  ), g = () => E.schedule(), v = () => {
    E.commit(), _e(a);
  }, b = ($, D, _ = !1) => {
    const H = document.createElement("div");
    H.className = _ ? "row base" : "row";
    const I = document.createElement("input");
    I.className = "locale", I.placeholder = "en", I.value = $;
    const w = document.createElement("input");
    if (w.className = "string", o && (w.placeholder = o), w.value = D, I.addEventListener("input", g), w.addEventListener("input", g), I.addEventListener("blur", v), w.addEventListener("blur", v), H.append(I, w), !_) {
      const k = document.createElement("span");
      k.className = "remove", k.textContent = "×", k.addEventListener("click", () => {
        H.remove(), v();
      }), H.append(k);
    }
    return y.append(H), w;
  }, S = i && typeof i == "object" && !Array.isArray(i) ? i : {};
  b(s, S[s] ?? "", !0);
  for (const $ of Object.keys(S))
    $ !== s && b($, S[$]);
  return E.prime(), f.addEventListener("click", () => {
    b("", "").previousElementSibling.focus();
  }), {
    handleSyncStatus: ($) => {
      var D;
      $ && ($.status === z.Completed && !l || (l = $.status, d > -1 && (clearTimeout(d), d = -1), m.style.display = "initial", m.style.cursor = "initial", m.onclick = null, $.status === z.Pending ? (m.innerHTML = "&#xe91e;", m.style.color = "#d5d5d5") : $.status === z.Failed ? (m.innerHTML = "&#xe91a;", m.style.color = "#a82e25", (D = $.job) != null && D.message && (m.style.cursor = "pointer", m.onclick = (_) => {
        var H;
        _.stopPropagation(), alert((H = $.job) == null ? void 0 : H.message);
      })) : $.status === z.Conflict ? (m.innerHTML = "&#xe91d;", m.style.color = "#a82e25", m.title = "Conflict") : $.status === z.Completed && (m.innerHTML = "&#xe91c;", m.style.color = "#0ac96a", d = window.setTimeout(() => {
        m.style.display = "none", d = -1;
      }, 1e3))));
    },
    getValue: h,
    destroy: () => {
      E.commit(), p.remove(), u();
    }
  };
}
const Ut = (e, t) => ({ host: n, value: s, onChange: o, config: i }) => {
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
}, Ks = {
  type: "boolean",
  default: () => !1,
  empty: (e) => e == null,
  control: Me(Rt),
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
}, Zs = {
  type: "date",
  empty: (e) => !e,
  control: Me(it),
  filter: Ut((e) => e.getTime(), (e) => new Date(e))
}, Ys = {
  type: "datetime",
  empty: (e) => !e,
  defaultConfig: { time: !0 },
  control: Me(it),
  filter: Ut((e) => e.getTime(), (e) => new Date(e))
}, Xs = {
  type: "blitzstamp",
  empty: (e) => e == null,
  view: ({ value: e }) => e == null ? "" : ft(Number(e)).toLocaleString(),
  filter: Ut(Es, ft)
}, Qs = {
  type: "texti18n",
  empty: (e) => !e || Object.keys(e).length === 0,
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: Me(Bt, ({ onChange: e }) => ({
    onChange: (t) => e(t && Object.keys(t).length > 0 ? t : null)
  }))
}, Gs = {
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
    return $t(a, r), a;
  }
}, eo = {
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
    return $t(c, i), c;
  }
};
function St(e, t) {
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
  f.addEventListener("change", (g) => {
    const v = g.target.files;
    if (r && v) {
      const b = Array.from(v);
      a = b.map((S) => URL.createObjectURL(S)), h(), r(b);
    }
  });
  const h = () => {
    y.innerHTML = a.map((g) => `<div class="image" style="background-image: url(${g});"></div>`).join(`
`), y.style.display = a.length > 0 ? "" : "none";
  }, E = (g) => {
    var v;
    g && (g.status === z.Completed && !l || (l = g.status, d > -1 && (clearTimeout(d), d = -1), m.style.display = "initial", m.style.cursor = "initial", m.onclick = null, g.status === z.Pending ? (m.innerHTML = "&#xe91e;", m.style.color = "#d5d5d5") : g.status === z.Failed ? (m.innerHTML = "&#xe91a;", m.style.color = "#a82e25", (v = g.job) != null && v.message && (m.style.cursor = "pointer", m.onclick = (b) => {
      var S;
      b.stopPropagation(), alert((S = g.job) == null ? void 0 : S.message);
    })) : g.status === z.Conflict ? (m.innerHTML = "&#xe91d;", m.style.color = "#a82e25", m.title = "Conflict") : g.status === z.Completed && (m.innerHTML = "&#xe91c;", m.style.color = "#0ac96a", d = window.setTimeout(() => {
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
function Wt(e, t) {
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
      f && (f.status === z.Completed && !c || (c = f.status, a > -1 && (clearTimeout(a), a = -1), p.style.display = "initial", p.style.cursor = "initial", p.onclick = null, f.status === z.Pending ? (p.innerHTML = "&#xe91e;", p.style.color = "#d5d5d5") : f.status === z.Failed ? (p.innerHTML = "&#xe91a;", p.style.color = "#a82e25", (m = f.job) != null && m.message && (p.style.cursor = "pointer", p.onclick = (h) => {
        var E;
        h.stopPropagation(), alert((E = f.job) == null ? void 0 : E.message);
      })) : f.status === z.Conflict ? (p.innerHTML = "&#xe91d;", p.style.color = "#a82e25", p.title = "Conflict") : f.status === z.Completed && (p.innerHTML = "&#xe91c;", p.style.color = "#0ac96a", a = window.setTimeout(() => {
        p.style.display = "none", a = -1;
      }, 1e3))));
    },
    destroy: () => {
      d.remove(), l();
    }
  };
}
function Jt(e, t) {
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
      f && (f.status === z.Completed && !c || (c = f.status, a > -1 && (clearTimeout(a), a = -1), p.style.display = "initial", p.style.cursor = "initial", p.onclick = null, f.status === z.Pending ? (p.innerHTML = "&#xe91e;", p.style.color = "#d5d5d5") : f.status === z.Failed ? (p.innerHTML = "&#xe91a;", p.style.color = "#a82e25", (m = f.job) != null && m.message && (p.style.cursor = "pointer", p.onclick = (h) => {
        var E;
        h.stopPropagation(), alert((E = f.job) == null ? void 0 : E.message);
      })) : f.status === z.Conflict ? (p.innerHTML = "&#xe91d;", p.style.color = "#a82e25", p.title = "Conflict") : f.status === z.Completed && (p.innerHTML = "&#xe91c;", p.style.color = "#0ac96a", a = window.setTimeout(() => {
        p.style.display = "none", a = -1;
      }, 1e3))));
    },
    destroy: () => {
      d.remove(), l();
    }
  };
}
const Ct = (e, t, n) => ({ host: s, onChange: o, config: i, services: r, status: c, model: a, name: l }) => {
  const d = a && l ? { modelName: a, attributeName: l } : void 0, { handleSyncStatus: u, destroy: p } = e(s, {
    ...i,
    onChange: async (f) => {
      if (f.length !== 0) {
        u({ status: z.Pending });
        try {
          const m = [];
          for (const h of f)
            m.push(await r[t](h, d));
          await o(n(m)), u({ status: z.Completed });
        } catch (m) {
          console.error("Upload failed:", (m == null ? void 0 : m.message) ?? m), u({ status: z.Failed });
        }
      }
    }
  }), y = c == null ? void 0 : c(u);
  return () => {
    y == null || y(), p();
  };
}, to = {
  type: ["image", "image[]"],
  default: () => [],
  control: Ct(St, "upload", (e) => e)
}, no = {
  type: "video",
  control: Ct(Wt, "uploadVideo", (e) => e[0])
}, so = {
  type: "file",
  control: Ct(Jt, "uploadFile", (e) => e[0])
}, oo = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function be(e) {
  return String(e ?? "").replace(/[&<>"']/g, (t) => oo[t]);
}
class Pn {
  constructor(t) {
    this.html = t;
  }
  toString() {
    return this.html;
  }
}
function me(e) {
  return new Pn(e);
}
const ro = /^\s*(javascript|data|vbscript):/i;
function Pe(e) {
  const t = String(e ?? "");
  return ro.test(t) ? "#" : be(t);
}
function ce(e, ...t) {
  return e.reduce((n, s, o) => n + s + (o < t.length ? t[o] instanceof Pn ? t[o].html : be(t[o]) : ""), "");
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
      y && (y.status === z.Completed && !r || (r = y.status, c > -1 && (clearTimeout(c), c = -1), u.style.display = "initial", u.style.cursor = "initial", u.onclick = null, y.status === z.Pending ? (u.innerHTML = "&#xe91e;", u.style.color = "#d5d5d5") : y.status === z.Failed ? (u.innerHTML = "&#xe91a;", u.style.color = "#a82e25", (f = y.job) != null && f.message && (u.style.cursor = "pointer", u.onclick = (m) => {
        var h;
        m.stopPropagation(), alert((h = y.job) == null ? void 0 : h.message);
      })) : y.status === z.Conflict ? (u.innerHTML = "&#xe91d;", u.style.color = "#a82e25", u.title = "Conflict") : y.status === z.Completed && (u.innerHTML = "&#xe91c;", u.style.color = "#0ac96a", c = window.setTimeout(() => {
        u.style.display = "none", c = -1;
      }, 1e3))));
    },
    destroy: () => {
      l.remove(), a();
    }
  };
}
const io = (e) => {
  const t = e.search(/[?#]/), n = t === -1 ? e : e.slice(0, t), s = t === -1 ? "" : e.slice(t);
  return (/\.pdf$/i.test(n) ? n.replace(/\.pdf$/i, ".thumbnail.jpg") : `${n}.thumbnail.jpg`) + s;
}, ao = (e) => {
  try {
    return decodeURIComponent(new URL(e, "https://x.invalid").pathname.split("/").pop() || e);
  } catch {
    return e;
  }
}, lo = {
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
    html: ce`<a class="bd-pdf-doc" href="${me(Pe(e))}" target="_blank" rel="noopener noreferrer">
            <img class="bd-pdf" alt="" loading="lazy" src="${me(Pe(io(e)))}" />
            <span class="bd-pdf-fallback" hidden>${ao(e)}</span>
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
  control: Ct(qn, "uploadFile", (e) => {
    const t = e[0];
    return (typeof t == "string" ? t : t == null ? void 0 : t.url) ?? null;
  })
}, ln = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/", Ot = {
  geocoderUrl: "https://nominatim.openstreetmap.org",
  tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  leafletUrl: `${ln}leaflet.js`,
  leafletCssUrl: `${ln}leaflet.css`
}, cn = {
  [Ot.leafletUrl]: "sha384-cxOPjt7s7Iz04uaHJceBmS+qpjv2JkIHNVcuOrM+YHwZOmJGBXI00mdUXEq65HTH",
  [Ot.leafletCssUrl]: "sha384-sHL9NAb7lN7rfvG5lfHpm643Xkcjzp4jFvuavGOndn6pjVqS6ny56CAt3nsEVT4H"
};
let Fn = null, Vn = !1;
function co(e) {
  Vn = e === !1, Fn = e ? typeof e == "object" ? e : {} : null;
}
function Kt() {
  return !Vn;
}
function Ge(e) {
  return { ...Ot, ...Fn ?? {}, ...e && typeof e == "object" ? e : {} };
}
let Mt = null;
const dn = (e, t) => new Promise((n, s) => {
  const o = document.createElement(e);
  e === "script" ? o.src = t : (o.rel = "stylesheet", o.href = t), cn[t] && (o.integrity = cn[t], o.crossOrigin = "anonymous"), o.onload = () => n(), o.onerror = () => s(new Error(`Failed to load ${t}`)), document.head.appendChild(o);
});
function uo(e = Ge()) {
  var t;
  return (t = window.L) != null && t.map ? Promise.resolve(window.L) : (Mt ?? (Mt = Promise.all([dn("link", e.leafletCssUrl), dn("script", e.leafletUrl)]).then(() => window.L).catch((n) => {
    throw Mt = null, n;
  })), Mt);
}
const po = (e) => e.divIcon({ className: "bd-osm-pin", html: "<span></span>", iconSize: [22, 30], iconAnchor: [11, 30] });
async function zn(e, t, n, { draggable: s = !1, interactive: o = !0, config: i = Ge() } = {}) {
  const r = await uo(i), c = r.map(e, { trackResize: !1, scrollWheelZoom: !1, dragging: o, zoomControl: o, touchZoom: o, doubleClickZoom: o, boxZoom: o, keyboard: o }).setView([t, n], 13);
  r.tileLayer(i.tileUrl, { attribution: i.attribution, maxZoom: 19 }).addTo(c);
  const a = r.marker([t, n], { icon: po(r), draggable: s }).addTo(c), l = typeof ResizeObserver == "function" ? new ResizeObserver(() => {
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
async function fo(e, t, n = Ge()) {
  const s = { lat: parseFloat(e), lng: parseFloat(t) };
  if (!Number.isFinite(s.lat) || !Number.isFinite(s.lng))
    return null;
  const o = document.createElement("div");
  return o.className = "map-container bd-osm-map", await zn(o, s.lat, s.lng, { interactive: !1, config: n }), o;
}
function Rn(e) {
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
const mo = 1100;
let un = 0, pn = Promise.resolve();
const Tt = /* @__PURE__ */ new Map(), Bn = (e, t, n) => {
  if (Tt.has(e))
    return Promise.resolve(Tt.get(e));
  const s = pn.then(async () => {
    const o = un + mo - Date.now();
    o > 0 && await new Promise((c) => setTimeout(c, o)), un = Date.now();
    const i = await fetch(t, { headers: { accept: "application/json" } });
    if (!i.ok)
      throw new Error(`OpenStreetMap answered HTTP ${i.status}`);
    const r = n(await i.json());
    return Tt.set(e, r), r;
  });
  return pn = s.catch(() => {
  }), s;
}, Un = () => typeof document < "u" && document.documentElement.lang || (typeof navigator < "u" ? navigator.language : "") || "en";
function yo(e, { limit: t = 5, config: n = Ge() } = {}) {
  const s = e.trim();
  if (!s)
    return Promise.resolve([]);
  const o = `${n.geocoderUrl}/search?format=jsonv2&addressdetails=1&limit=${t}&accept-language=${encodeURIComponent(Un())}&q=${encodeURIComponent(s)}`;
  return Bn(`s|${n.geocoderUrl}|${t}|${s.toLowerCase()}`, o, (i) => (Array.isArray(i) ? i : []).map(Rn).filter(Boolean));
}
function ho(e, t, { config: n = Ge() } = {}) {
  const s = `${n.geocoderUrl}/reverse?format=jsonv2&addressdetails=1&accept-language=${encodeURIComponent(Un())}&lat=${e}&lon=${t}`;
  return Bn(`r|${n.geocoderUrl}|${e.toFixed(5)}|${t.toFixed(5)}`, s, (o) => o != null && o.error ? null : Rn(o));
}
function Zt(e, t) {
  const { label: n, placeholder: s, initialValue: o, initialExpand: i = !1, className: r, apiKey: c, openStreetMap: a, onChange: l } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const d = typeof e == "string" ? document.getElementById(e) : e;
  if (!(d instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const u = !c, p = typeof o == "string" ? o : "", y = typeof o == "object" ? o : null, f = !!(y != null && y.lat && (y != null && y.lng)), m = l ? Ft(l) : void 0;
  let h = null, E = null, g = null, v = y;
  const b = Te(d, "bd-location-input", r);
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
  const S = d.querySelector(".container"), q = d.querySelector(".address-input"), $ = d.querySelector(".expand-btn"), D = d.querySelector(".map-container"), _ = d.querySelector(".fields-container"), H = d.querySelector(".lat-input"), I = d.querySelector(".long-input"), w = d.querySelector(".street-input"), k = d.querySelector(".street-number-input"), F = d.querySelector(".zip-input"), M = d.querySelector(".city-input"), O = d.querySelector(".country-input");
  $.onclick = () => {
    _.style.display = _.style.display === "none" ? "" : "none", $.classList.toggle("expanded");
  }, w.oninput = () => J("street", w.value), k.oninput = () => J("street_number", k.value), F.oninput = () => J("postal_code", F.value), M.oninput = () => J("city", M.value), O.oninput = () => J("country", O.value);
  const J = (x, U) => {
    !v || !v.lat || !v.lng || (v = {
      ...v,
      [x]: U
    }, m && m(v));
  };
  let K = null;
  const j = Ge(a), G = d.querySelector(".osm-results"), B = d.querySelector(".osm-status"), Y = (x) => {
    B && (B.textContent = x, B.hidden = !x);
  }, Z = (x) => {
    H.value = x.lat ?? "", I.value = x.lng ?? "", q.value = x.address ?? "", w.value = x.street ?? "", k.value = x.street_number ?? "", F.value = x.postal_code ?? "", M.value = x.city ?? "", O.value = x.country ?? "";
  };
  let pe = null, fe = !1;
  const ge = async (x, U) => {
    if (D.hidden = !1, pe && await pe.catch(() => {
    }), K) {
      K.moveTo(x, U);
      return;
    }
    pe = R(x, U), await pe;
  }, R = async (x, U) => {
    const X = await zn(D, x, U, { draggable: !0, config: j });
    if (fe) {
      X.destroy();
      return;
    }
    K = X, K.marker.on("dragend", async () => {
      const ee = K.marker.getLatLng(), oe = ee.lat.toFixed(6), he = ee.lng.toFixed(6);
      v = { ...v ?? {}, lat: oe, lng: he }, H.value = oe, I.value = he;
      try {
        const we = await ho(ee.lat, ee.lng, { config: j });
        v = we ? { ...we, lat: oe, lng: he } : { lat: oe, lng: he }, Z(v), Y(we ? "" : "No address here; the point is kept on its own.");
      } catch {
        v = { lat: oe, lng: he }, Z(v), Y("OpenStreetMap did not answer; the point is kept without an address.");
      }
      m == null || m(v);
    });
  }, T = async (x) => {
    v = x, Z(x), G && (G.hidden = !0, G.innerHTML = ""), Y(""), m == null || m(x);
    try {
      await ge(parseFloat(x.lat), parseFloat(x.lng));
    } catch (U) {
      console.error("Error initializing map:", U);
    }
  }, V = async () => {
    const x = q.value.trim();
    if (!(!x || !G)) {
      Y("Searching…");
      try {
        const U = await yo(x, { config: j });
        if (!U.length) {
          Y(`No place found for "${x}".`), G.hidden = !0;
          return;
        }
        Y(""), G.innerHTML = "";
        for (const X of U) {
          const ee = document.createElement("li"), oe = document.createElement("button");
          oe.type = "button", oe.textContent = X.address ?? `${X.lat}, ${X.lng}`, oe.onclick = () => T(X), ee.append(oe), G.append(ee);
        }
        G.hidden = !1;
      } catch {
        Y("OpenStreetMap did not answer. Try again in a moment.");
      }
    }
  }, C = async () => {
    if (y ? Z(y) : p && (q.value = p), q.addEventListener("keydown", (x) => {
      x.key === "Enter" && (x.preventDefault(), V());
    }), d.querySelector(".search-btn").onclick = () => V(), f)
      try {
        await ge(parseFloat(y.lat), parseFloat(y.lng));
      } catch (x) {
        console.error("Error initializing map:", x);
      }
  }, N = async () => {
    if (u)
      return C();
    try {
      await On(c), o != null && o.lat && (H.value = o.lat), o != null && o.lng && (I.value = o.lng), o != null && o.address && (q.value = o.address), o != null && o.street && (w.value = o.street), o != null && o.street_number && (k.value = o.street_number), o != null && o.postal_code && (F.value = o.postal_code), o != null && o.city && (M.value = o.city), o != null && o.country && (O.value = o.country);
      const x = o && o.lat && o.lng ? {
        lat: parseFloat(o.lat),
        lng: parseFloat(o.lng)
      } : {
        // Else, San Francisco by default
        lat: 37.7749,
        lng: -122.4194
      };
      h = new google.maps.Map(D, {
        center: x,
        zoom: 13
      }), E = new google.maps.Marker({
        map: h,
        position: x,
        draggable: !0
      }), g = new google.maps.places.Autocomplete(q, {
        types: ["geocode"]
      }), g.addListener("place_changed", () => {
        const U = g == null ? void 0 : g.getPlace();
        if (!(U != null && U.geometry) || !h || !E)
          return;
        const X = U.geometry.location;
        ie(U, X.lat(), X.lng());
      }), google.maps.event.addListener(E, "dragend", () => {
        const U = E == null ? void 0 : E.getPosition();
        U && ye(U);
      });
    } catch (x) {
      console.error("Error initializing map:", x);
    }
  }, ie = (x, U, X) => {
    if (x) {
      if (v = {
        lat: typeof U == "number" ? U.toString() : U,
        lng: typeof X == "number" ? X.toString() : X,
        address: x.formatted_address || "",
        street: "",
        street_number: "",
        city: "",
        postal_code: "",
        admin_locality: "",
        country: ""
      }, x.address_components)
        for (const ee of x.address_components)
          switch (ee.types[0]) {
            case "route":
              v.street = ee.long_name;
              break;
            case "street_number":
              v.street_number = ee.long_name;
              break;
            case "locality":
              v.admin_locality = ee.long_name;
              break;
            case "postal_code":
              v.postal_code = ee.long_name;
              break;
            case "country":
              v.country = ee.long_name;
              break;
          }
      if (x.adr_address) {
        const he = new DOMParser().parseFromString(x.adr_address, "text/html").querySelector(".locality");
        he && (v.city = he.textContent || "");
      }
      if (!v.city && x.formatted_address) {
        const ee = x.formatted_address.split(",").find((oe) => /\b\d{4}\b/.test(oe));
        if (ee) {
          const oe = ee.replace(/\b\d{4}\b/, "").trim();
          oe && (v.city = oe);
        }
      }
      if (!v.city && v.admin_locality && (v.city = v.admin_locality), H.value = v.lat, I.value = v.lng, q.value = v.address, w.value = v.street, k.value = v.street_number, F.value = v.postal_code, M.value = v.city, O.value = v.country, h && E) {
        const ee = new google.maps.LatLng(
          typeof U == "number" ? U : parseFloat(U),
          typeof X == "number" ? X : parseFloat(X)
        );
        h.setCenter(ee), E.setPosition(ee);
      }
      m && m(v);
    }
  }, ye = async (x) => {
    try {
      const X = await (await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${x.lat()},${x.lng()}&key=${c}`
      )).json();
      X.status === "OK" && X.results && X.results.length > 0 && ie(X.results[0], x.lat(), x.lng());
    } catch (U) {
      console.error("Reverse geocoding error:", U);
    }
  };
  return N(), {
    destroy: () => {
      fe = !0, K == null || K.destroy(), h && window.google && window.google.maps && google.maps.event.clearInstanceListeners(h), E && window.google && window.google.maps && google.maps.event.clearInstanceListeners(E), g && window.google && window.google.maps && google.maps.event.clearInstanceListeners(g), S.remove(), b();
    }
  };
}
const go = ht(() => import("./index-1e0810e3.js")), vo = ht(() => import("./index-0f2cca87.js")), bo = {
  type: "phone",
  empty: (e) => !e,
  control: Me(go, ({ onChange: e }) => ({
    onChange: (t) => e(Oe(t))
  }))
}, wo = /^<p id="[A-Za-z0-9_-]+"><br><\/p>$/, Eo = {
  type: "htmlText",
  empty: (e) => !e,
  // a form edits in place: the host app (BlitzPM) owns when it is writable,
  // an expand icon would open a second editor beside it
  defaultConfig: { presentation: { grid: "modal" } },
  control: Me(vo, ({ onChange: e }) => ({
    onChange: (t) => e(Oe(wo.test(t) ? "" : t))
  }))
}, $o = {
  type: "location",
  empty: (e) => !e,
  // Google with a key, OpenStreetMap without one — the same widget the edit
  // form mounts. Plain text only when the app turned OpenStreetMap off.
  control: (e) => e.config.apiKey || Kt() ? Me(Zt, ({ onChange: t }) => ({
    onChange: (n) => t(n || null)
  }))(e) : Me(Ae, ({ onChange: t }) => ({
    onChange: (n) => t(Oe(n))
  }))(e)
};
const So = 6;
function Co(e) {
  return `"${String(e ?? "").replace(/["\\]/g, "\\$&")}"`;
}
function xo(e) {
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
async function xt(e, t) {
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
    onChange: g,
    onRefresh: v
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const b = typeof e == "string" ? document.getElementById(e) : e;
  if (!(b instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let S = [], q = 0, $ = [], D = null, _ = -1;
  const H = Te(b, "bd-picker", h);
  b.innerHTML = `<div class="container">
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
            ${v || f || m || a ? `<div class="meta-actions">
                ${v ? '<div class="refresh-btn blitzicon">&#xe812;</div>' : ""}
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
  const I = b.querySelector(".dropdown"), w = b.querySelector(".sync-status"), k = b.querySelector(".picker-spinner"), F = b.querySelector(".picker-value"), M = b.querySelector(".empty"), O = b.querySelector(".search-input"), J = b.querySelector(".menu"), K = b.querySelector(".container"), j = b.querySelector(".list"), G = b.querySelector(".refresh-btn"), B = b.querySelectorAll(".doc-btn"), Y = b.querySelector(".clear-btn"), Z = b.querySelector(".next-btn"), pe = b.querySelector(".expand-btn"), fe = () => {
    J && (J.style.display = "none");
  }, ge = () => {
    if (!J)
      return;
    J.style.display = "";
    const x = J.offsetHeight + So, U = window.innerHeight - I.getBoundingClientRect().bottom, X = K.getBoundingClientRect().top;
    b.classList.toggle("drop-up", U < x && X >= x);
  }, R = () => {
    J && (J.style.display === "none" ? ge() : fe());
  }, T = (x, U) => {
    $ = x;
    for (const X of j.querySelectorAll(".list-item-hovered"))
      X.classList.remove("list-item-hovered");
    for (const X of j.querySelectorAll(".list-item-checkbox"))
      X.checked = !1;
    if (F)
      if ($.length > 0 && S.length > 0) {
        if (F.classList.remove("picker-placeholder"), F.innerHTML = (i ? `<b>${be(i)}: </b>` : "") + ($.map((X) => be(X.label)).join(", ") || "/"), Y && (Y.style.display = ""), Z) {
          const X = S.findIndex((ee) => ee.value === $[0].value);
          X > -1 && X < S.length - 1 ? Z.style.display = "" : Z.style.display = "none";
        }
        for (const X of $) {
          const ee = Co(X.value), oe = j.querySelector(`.list-item button[value=${ee}]`);
          oe && oe.parentElement && oe.parentElement.classList.add("list-item-hovered");
          const he = j.querySelector(`.group-label[value=${ee}]`);
          he && he.parentElement && he.parentElement.classList.add("list-item-hovered");
          const we = j.querySelector(`.list-item-checkbox[value=${ee}]`);
          we && (we.checked = !0);
        }
        g && !U && g($);
      } else
        F.removeAttribute("values"), F.classList.add("picker-placeholder"), F.innerText = c ?? "", Y && (Y.style.display = "none"), Z && (Z.style.display = "none"), g && !U && g([]);
  }, V = (x) => {
    $.find((U) => U.value === x.value) ? ($.length > 1 || !l) && T($.filter((U) => U.value !== x.value)) : d ? T([...$, x]) : (T([x]), _e(b));
  }, C = () => {
    if (k.style.display = "none", M && (M.style.display = S.length === 0 ? "" : "none"), O && (O.style.display = q > 7 ? "" : "none"), j) {
      const x = !!(O != null && O.value);
      let U = [];
      if (p && S.some((ee) => !!ee.obj)) {
        U = xo(S), j.innerHTML = U.map(({ expanded: ee, parent: oe, children: he }) => {
          let we = !1;
          const A = he.map((ae) => {
            const Le = $.find((Ce) => Ce.value === ae.value);
            return !we && Le && (we = !0), `<div class="list-item ${Le ? "list-item-hovered" : ""}">
                            ${d ? `<input value="${be(ae.value)}" class="list-item-checkbox" type="checkbox" ${Le ? "checked" : ""}>` : ""}
                            <button value="${be(ae.value)}">${be(ae.label)}</button>
                        </div>`;
          }).join(`
`);
          if (!oe)
            return A;
          const Q = $.find((ae) => ae.value === oe.value), se = x ? ee : we;
          return `
                        <div class="group-header ${Q ? "list-item-hovered" : ""} ${se ? "expanded" : ""}">
                            <div class="group-toggle">
                                <div class="group-toggle-icon"></div>
                            </div>
                            ${d ? `<input value="${be(oe.value)}" class="list-item-checkbox" type="checkbox" ${Q ? "checked" : ""}>` : ""}
                            <p value="${be(oe.value)}" class="group-label">${be(oe.label)}</p>
                        </div>
                        <div class="group-items ${d ? "multiple-group" : ""}" ${se ? "" : 'style="display: none;"'}>
                            ${A}
                        </div>
                    `;
        }).join(`
`);
        for (const ee of j.querySelectorAll(".group-header .group-toggle"))
          ee.addEventListener("click", (oe) => {
            oe.stopPropagation();
            const he = ee.parentElement, we = he == null ? void 0 : he.querySelector(".group-label"), A = we == null ? void 0 : we.getAttribute("value");
            if (A && he) {
              const Q = U.find((se) => {
                var ae;
                return ((ae = se.parent) == null ? void 0 : ae.value) === A;
              });
              if (Q) {
                const se = he.classList.contains("expanded");
                Q.expanded = !se, he.classList.toggle("expanded");
                const ae = he.nextElementSibling;
                ae && (ae.style.display = Q.expanded ? "" : "none");
              }
            }
          });
      } else
        j.innerHTML = S.map((ee) => {
          const oe = $.find((he) => he.value === ee.value);
          return `<div class="list-item ${oe ? "list-item-hovered" : ""}">
                            ${d ? `<input value="${be(ee.value)}" class="list-item-checkbox" type="checkbox" ${oe ? "checked" : ""}>` : ""}
                            <button value="${be(ee.value)}">${be(ee.label)}</button>
                        </div>`;
        }).join(`
`);
      const X = (ee) => {
        const oe = S.find((he) => he.value === ee.currentTarget.getAttribute("value"));
        if (oe) {
          if (d && p && y) {
            const he = U.find((we) => {
              var A;
              return ((A = we.parent) == null ? void 0 : A.value) === oe.value;
            });
            if (he)
              if ($.find((A) => A.value === oe.value)) {
                const A = he.children.map((Q) => Q.value);
                T($.filter((Q) => Q.value !== oe.value && !A.includes(Q.value)));
              } else {
                const A = he.children.filter((Q) => !$.find((se) => se.value === Q.value));
                T([...$, oe, ...A]);
              }
            else
              V(oe);
          } else
            V(oe);
          d || fe();
        }
      };
      for (const ee of [...j.querySelectorAll(".list-item button"), ...j.querySelectorAll(".group-label")])
        ee.addEventListener("click", X);
      for (const ee of j.querySelectorAll(".list-item-checkbox"))
        ee.addEventListener("change", X);
    }
  }, N = (x) => {
    var U;
    x && (x.status === z.Completed && !D || (D = x.status, _ > -1 && (clearTimeout(_), _ = -1), w.style.display = "initial", w.style.cursor = "initial", w.onclick = null, x.status === z.Pending ? (w.innerHTML = "&#xe91e;", w.style.color = "#d5d5d5") : x.status === z.Failed ? (w.innerHTML = "&#xe91a;", w.style.color = "#a82e25", (U = x.job) != null && U.message && (w.style.cursor = "pointer", w.onclick = (X) => {
      var ee;
      X.stopPropagation(), alert((ee = x.job) == null ? void 0 : ee.message);
    })) : x.status === z.Conflict ? (w.innerHTML = "&#xe91d;", w.style.color = "#a82e25", w.title = "Conflict") : x.status === z.Completed && (w.innerHTML = "&#xe91c;", w.style.color = "#0ac96a", _ = window.setTimeout(() => {
      w.style.display = "none", _ = -1;
    }, 1e3))));
  };
  J.addEventListener("click", (x) => x.stopPropagation()), I && (I.addEventListener("click", R), document.addEventListener("click", (x) => {
    I.contains(x.target) || fe();
  }));
  const ie = async (x) => {
    E && (S = await E(x)), x || (q = S.length);
  }, ye = Ft(async (x) => {
    k.style.display = "block", await ie(x), C();
  });
  O && O.addEventListener("input", (x) => {
    ye(x.target.value);
  }), Y && Y.addEventListener("click", (x) => {
    x.stopPropagation(), fe(), T([]);
  }), Z && Z.addEventListener("click", (x) => {
    x.stopPropagation(), fe();
    const U = S.findIndex((X) => {
      var ee;
      return X.value === ((ee = $[0]) == null ? void 0 : ee.value);
    });
    U > -1 && U < S.length - 1 && T([S[U + 1]]);
  }), G && v && G.addEventListener("click", async (x) => {
    x.stopPropagation(), k.style.display = "block", await v(), await ie(""), C();
  }), pe && pe.addEventListener("click", (x) => {
    x.stopPropagation(), fe(), Lo({
      items: S,
      selected: $,
      onChange: V
    });
  });
  for (const x of B)
    x.addEventListener("click", (U) => U.stopPropagation());
  return await ie(""), T(
    n ? (n instanceof Array ? n : [n]).map((x) => S.find((U) => U.value === x)).filter((x) => !!x) : s && S[0] ? [S[0]] : [],
    !o
  ), C(), {
    handleSyncStatus: N,
    destroy: () => {
      for (const x of b.childNodes)
        x.remove();
      b.classList.remove("drop-up"), H();
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
  const c = n.getAttributeDetails(s), a = (ue == null ? void 0 : ue.defaultLanguage) ?? "en";
  let l = ((c == null ? void 0 : c.options) || []).map((p) => ({
    value: p,
    label: Hn(c == null ? void 0 : c.options_labels, p, a, p[0].toUpperCase() + p.slice(1))
  }));
  Array.isArray(o) && o.length > 0 && (l = l.filter((p) => !o.includes(p.value)));
  const { handleSyncStatus: d, destroy: u } = await xt(
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
    for (const g in p)
      if (typeof p[g].type == "string" && ["varchar", "text"].includes(p[g].type)) {
        y = g;
        break;
      }
  }
  let f = [], m = a;
  if (a || c && y)
    try {
      const g = c instanceof Array ? c : typeof c == "string" ? [c] : void 0, v = a instanceof Array ? a : typeof a == "string" ? [a] : void 0;
      f = await n.list({
        forceLocal: !0,
        // TODO: Change to HTTP | Condition caused a server error
        conditions: [
          ...g && y ? [[y, "IN", g]] : [["_blitzID", "IN", v]],
          ...s ?? []
        ]
      }), f.length > 0 && (m = f.map((b) => b._blitzID.value).filter((b) => b != null));
    } catch (g) {
      g.stack && console.error(g.stack);
    }
  const { handleSyncStatus: h, destroy: E } = await xt(
    e,
    {
      ...d,
      initialValue: m,
      onSearch: async (g) => {
        try {
          u && u.abort(), u = new AbortController();
          const v = g && y, b = await n.list({
            signal: u.signal,
            forceHttp: !0,
            customSortDirection: i,
            limit: o ?? 100,
            conditions: v || s ? [
              ...v ? [[y, "LIKE", `%${g}%`]] : [],
              ...s ?? []
            ] : void 0
          }), S = f.every(($) => !!b.find((D) => D._blitzID.value === $._blitzID.value)), q = (v || S ? b : [...f, ...b]).map(($) => ({
            obj: $,
            value: $._blitzID.value,
            label: y ? $[y].value ?? "/" : "/"
          })).filter(($, D, _) => _.findIndex((H) => H.value === $.value) === D);
          return v && q.sort(($, D) => $.label.length - D.label.length), q;
        } catch (v) {
          return v.message.includes("AbortError") || v.message.includes("The user aborted a request") ? [] : (v.stack && console.error(v.stack), []);
        }
      },
      onChange: (g) => {
        l && l(g.map((v) => v.obj));
      }
    }
  );
  return { handleSyncStatus: h, destroy: E };
}
const fn = (e) => ({ getAttributeDetails: () => e.attributeDetails }), ko = {
  type: ["enum", "enum[]"],
  control: async (e) => {
    const { host: t, value: n, onChange: s, config: o, status: i } = e, { handleSyncStatus: r, destroy: c } = await ot(t, {
      ...o,
      model: fn(e),
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
      model: fn(e),
      attribute: o.className ?? "value",
      initialValue: n == null ? void 0 : n.values,
      multiple: !0,
      onChange: (r) => s(r.length > 0 ? { op: "in", values: r } : null)
    });
    return () => i();
  }
}, Yt = async (e, t) => {
  const n = await e.resolveModel(
    Array.isArray(e.attributeDetails.type) ? e.attributeDetails.type[0] : e.attributeDetails.type
  );
  return at(e.host, { ...e.config, model: n, groupByParent: !0, ...t });
}, Wn = async (e) => {
  var n;
  const { destroy: t } = await Yt(e, {
    multiple: !0,
    limit: 100,
    selectChildrenWithParent: !0,
    initialValue: (n = e.value) == null ? void 0 : n.values,
    onChange: (s) => e.onChange(s.length > 0 ? { op: "in", values: s.map((o) => o._blitzID.value) } : null)
  });
  return () => t();
}, Mo = {
  type: "fk",
  control: async (e) => {
    var o;
    const { handleSyncStatus: t, destroy: n } = await Yt(e, {
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
  filter: Wn
}, To = {
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
}, Ao = {
  type: "mtm",
  default: () => null,
  control: async (e) => {
    var o;
    const { handleSyncStatus: t, destroy: n } = await Yt(e, {
      multiple: !0,
      initialValue: e.value,
      onChange: (i) => e.onChange(i.length > 0 ? i.map((r) => r._blitzID.value) : null)
    }), s = (o = e.status) == null ? void 0 : o.call(e, t);
    return () => {
      s == null || s(), n();
    };
  },
  filter: Wn
}, _o = [
  qs,
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
  so,
  lo,
  bo,
  Eo,
  $o,
  ko,
  Mo,
  Ao,
  To
];
const Xe = (e) => e.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase(), We = (e, t) => e.trim().toLocaleLowerCase() === t.trim().toLocaleLowerCase();
function Ho(e, t) {
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
function Io(e, t, n) {
  const s = e.filter((c) => !t.some((a) => We(a, c))), o = Xe(n.trim());
  if (!o)
    return s;
  const i = s.filter((c) => Xe(c).includes(o)), r = (c) => Xe(c).split(/[\s\-_/]+/).some((a) => a.startsWith(o));
  return [...i.filter(r), ...i.filter((c) => !r(c))];
}
const At = 100, mn = /[,，、]/;
let Oo = 0;
function Lt(e, t) {
  const { label: n, placeholder: s, initialValue: o, single: i, suggestions: r, create: c, href: a, onChange: l, commitOnBlur: d = !0, className: u } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const p = typeof e == "string" ? document.getElementById(e) : e;
  if (!(p instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const y = `bd-tag-${++Oo}`;
  let f = (Array.isArray(o) ? o : []).filter((A) => typeof A == "string" && A.trim() !== "");
  const m = /* @__PURE__ */ new Set();
  let h = null, E = null, g = [], v = -1, b = -1, S = !1, q = null, $ = Promise.resolve();
  const D = Te(p, "bd-tag-input", i ? "is-single" : null, u), _ = document.createElement("div");
  _.className = "bd-tag-root", _.innerHTML = `${n ? `<label class="label" for="${y}-input"></label>` : ""}
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
        <span class="live" aria-live="polite"></span>`, p.append(_);
  const H = _.querySelector(".field"), I = _.querySelector(".chips"), w = _.querySelector(".entry"), k = _.querySelector(".panel"), F = _.querySelector(".options"), M = _.querySelector(".hint"), O = _.querySelector(".error"), J = _.querySelector(".live"), K = _.querySelector(".sync");
  n ? _.querySelector(".label").textContent = n : w.setAttribute("aria-label", i ? "Tag" : "Add a tag");
  const j = typeof k.showPopover == "function";
  j && k.setAttribute("popover", "manual");
  const G = (A, Q) => {
    const se = window.setTimeout(() => {
      m.delete(se), A();
    }, Q);
    m.add(se);
  }, B = (A) => {
    J.textContent = "", G(() => {
      J.textContent = A;
    }, 30);
  }, Y = (A) => A instanceof Error ? A.message : String(A ?? "Not saved"), Z = () => {
    var se;
    const A = I.contains(document.activeElement) ? document.activeElement : null, Q = (se = A == null ? void 0 : A.closest(".chip")) == null ? void 0 : se.dataset.value;
    if (I.replaceChildren(...f.map((ae, Le) => {
      const Ce = document.createElement("li");
      Ce.className = "chip", Ce.dataset.value = ae, Le === b && Ce.classList.add("is-selected");
      const Se = a == null ? void 0 : a(ae), L = document.createElement(Se ? "a" : "span");
      L.className = "chip-text", L.textContent = ae, Se && (L.href = Se);
      const P = Object.assign(document.createElement("button"), { type: "button", className: "chip-remove", textContent: "×" });
      return P.setAttribute("aria-label", `Remove ${ae}`), P.onclick = () => {
        T(ae), w.focus();
      }, Ce.append(L, P), Ce;
    })), H.classList.toggle("has-chips", f.length > 0), w.placeholder = i && f.length ? "" : s ?? (f.length ? "" : "Add a tag"), A) {
      const ae = [...I.children].find((Le) => Le.dataset.value === Q);
      ((ae == null ? void 0 : ae.querySelector(".chip-remove")) ?? w).focus();
    }
  }, pe = (A) => {
    O.textContent = Y(A), O.hidden = !1;
  }, fe = () => ($ = $.then(async () => {
    try {
      await (l == null ? void 0 : l([...f]));
    } catch (A) {
      pe(A);
    }
  }), $), ge = (A) => (f = i ? [A] : [...f, A], b = -1, O.hidden = !0, Z(), B(`Added ${A}`), fe()), R = async (A) => {
    const Q = w.value;
    Q || (w.value = A), S = !0, w.readOnly = !0, _.setAttribute("aria-busy", "true");
    try {
      const se = await c(A) || A;
      return h && !h.some((ae) => We(ae, se)) && (h = [...h, se]), Q || (w.value = ""), se;
    } catch (se) {
      return pe(se), B(`${A} was not created`), null;
    } finally {
      S = !1, w.readOnly = !1, _.removeAttribute("aria-busy");
    }
  }, T = (A) => {
    f = f.filter((Q) => Q !== A), b = -1, Z(), B(`Removed ${A}`), N() && X(), fe();
  }, V = async (A, Q) => {
    const se = A.trim();
    if (S)
      return;
    if (!se)
      return X();
    const ae = f.find((Ce) => We(Ce, se));
    if (ae !== void 0) {
      B(`${ae} is already added`), X();
      return;
    }
    let Le = (Q == null ? void 0 : Q.kind) === "tag" ? Q.value : (h ?? []).find((Ce) => We(Ce, se));
    if (Le === void 0 && (Le = c ? await R(se) ?? void 0 : se), Le !== void 0) {
      if (f.some((Ce) => We(Ce, Le)))
        return X();
      i && (U(), _e(p)), await ge(Le), N() && X();
    }
  }, C = () => r ? (E ?? (E = r().then((A) => {
    h = (A ?? []).filter((Q) => typeof Q == "string" && Q.trim() !== "");
  }).catch(() => {
    h = h ?? [];
  }).finally(() => {
    N() && X();
  })), E) : Promise.resolve(), N = () => !k.hidden, ie = () => {
    if (!j || !N())
      return;
    const A = H.getBoundingClientRect(), Q = window.innerHeight - A.bottom - 12, se = A.top - 12;
    k.style.left = `${A.left}px`, k.style.width = `${A.width}px`, k.style.maxHeight = "";
    const ae = Math.min(k.scrollHeight, 280), Le = Q < Math.min(ae, 160) && se > Q, Ce = Math.max(96, Math.min(280, Le ? se : Q));
    k.style.maxHeight = `${Ce}px`, k.style.top = `${Le ? A.top - 6 - Math.min(ae, Ce) : A.bottom + 6}px`;
  }, ye = () => _.isConnected ? ie() : U(), x = () => {
    !r && !w.value.trim() || (C(), N() || (k.hidden = !1, j && (k.showPopover(), window.addEventListener("scroll", ye, { capture: !0, passive: !0 }), window.addEventListener("resize", ye))), w.setAttribute("aria-expanded", "true"), X());
  }, U = () => {
    j && N() && (k.hidePopover(), window.removeEventListener("scroll", ye, { capture: !0 }), window.removeEventListener("resize", ye)), k.hidden = !0, w.setAttribute("aria-expanded", "false"), w.removeAttribute("aria-activedescendant"), v = -1;
  }, X = () => {
    if (!N())
      return;
    const A = w.value.trim(), Q = Io(h ?? [], f, A), se = [...h ?? [], ...f].some((Se) => We(Se, A)), ae = A && !se ? [{ kind: "create", value: A }] : [], Le = Q.slice(0, At).map((Se) => ({ kind: "tag", value: Se }));
    g = Q.length ? [...Le, ...ae] : ae, v = Math.min(A ? Math.max(v, 0) : v, g.length - 1), F.replaceChildren(...g.map((Se, L) => {
      const P = document.createElement("li");
      if (P.id = `${y}-opt-${L}`, P.className = `option is-${Se.kind}`, P.setAttribute("role", "option"), P.setAttribute("aria-selected", L === v ? "true" : "false"), L === v && P.classList.add("is-active"), Se.kind === "create") {
        const W = Object.assign(document.createElement("strong"), { textContent: Se.value }), ne = Object.assign(document.createElement("span"), { className: "plus" });
        ne.setAttribute("aria-hidden", "true"), P.append(ne, `${c ? "Create" : "Add"} “`, W, "”");
      } else {
        const W = Ho(Se.value, A);
        W ? P.append(
          Se.value.slice(0, W[0]),
          Object.assign(document.createElement("mark"), { textContent: Se.value.slice(W[0], W[1]) }),
          Se.value.slice(W[1])
        ) : P.textContent = Se.value;
      }
      return P.onmousedown = (W) => W.preventDefault(), P.onclick = () => {
        S || (w.value = "", V(Se.value, Se), w.focus());
      }, P;
    }));
    const Ce = A && f.find((Se) => We(Se, A));
    M.textContent = h === null && r ? "Loading tags…" : Ce ? `“${Ce}” is already added` : Q.length > At ? `Showing ${At} of ${Q.length}. Keep typing to narrow.` : g.length ? "" : f.length && (h ?? []).length ? "All tags are added" : "Type to add a tag", M.hidden = !M.textContent, F.hidden = g.length === 0, ee(), ie();
  }, ee = () => {
    var Q;
    F.querySelectorAll(".option").forEach((se, ae) => {
      se.classList.toggle("is-active", ae === v), se.setAttribute("aria-selected", ae === v ? "true" : "false");
    });
    const A = v >= 0 ? F.children[v] : void 0;
    A ? (w.setAttribute("aria-activedescendant", A.id), (Q = A.scrollIntoView) == null || Q.call(A, { block: "nearest" })) : w.removeAttribute("aria-activedescendant");
  }, oe = (A) => {
    N() || x(), g.length && (v = v < 0 ? A > 0 ? 0 : g.length - 1 : (v + A + g.length) % g.length, ee());
  };
  H.onmousedown = (A) => {
    (A.target === H || A.target === I) && (A.preventDefault(), w.focus());
  }, k.onmousedown = (A) => A.preventDefault(), w.onfocus = () => x(), w.onclick = () => {
    N() || x();
  }, _.addEventListener("focusout", (A) => {
    if (!_.contains(A.relatedTarget)) {
      U(), b >= 0 && (b = -1, Z());
      const Q = w.value;
      d && Q.trim() && !S && (w.value = "", V(Q));
    }
  }), w.oninput = (A) => {
    if (!A.isComposing) {
      if (b >= 0 && (b = -1, Z()), !i && mn.test(w.value)) {
        const Q = w.value.split(mn);
        w.value = Q.pop() ?? "", Q.reduce((se, ae) => se.then(() => V(ae)), Promise.resolve());
        return;
      }
      N() ? (v = -1, X()) : x();
    }
  }, w.onkeydown = (A) => {
    if (A.isComposing || S)
      return;
    const Q = w.value.trim();
    if (A.key === "ArrowDown")
      A.preventDefault(), oe(1);
    else if (A.key === "ArrowUp")
      A.preventDefault(), oe(-1);
    else if (A.key === "Enter" || A.key === "Tab" && Q) {
      const se = N() && v >= 0 ? g[v] : void 0;
      if (!se && !Q)
        return;
      A.preventDefault(), w.value = "", V(se ? se.value : Q, se);
    } else
      A.key === "Escape" ? N() ? (A.preventDefault(), A.stopPropagation(), U()) : b >= 0 && (b = -1, Z()) : A.key === "Backspace" && w.value === "" && f.length && (b === f.length - 1 ? T(f[b]) : (b = f.length - 1, Z(), B(`${f[b]} selected, Backspace again to remove`)));
  };
  const he = (A) => {
    var Q;
    A && (A.status === z.Completed && !q || (q = A.status, K.hidden = !1, K.dataset.status = A.status, A.status === z.Pending ? K.innerHTML = "&#xe91e;" : A.status === z.Completed ? (K.innerHTML = "&#xe91c;", O.hidden = !0, G(() => {
      q === z.Completed && (K.hidden = !0);
    }, 1e3)) : (A.status === z.Failed || A.status === z.Conflict) && (K.innerHTML = A.status === z.Failed ? "&#xe91a;" : "&#xe91d;", pe(((Q = A.job) == null ? void 0 : Q.message) ?? (A.status === z.Conflict ? "This change conflicts with another edit." : "Not saved.")))));
  }, we = (A) => {
    const Q = (A ?? []).filter((se) => typeof se == "string" && se.trim() !== "");
    Q.length === f.length && Q.every((se, ae) => se === f[ae]) || (f = Q, b = -1, Z(), X());
  };
  return Z(), {
    handleSyncStatus: he,
    setValue: we,
    focus: () => w.focus(),
    destroy: () => {
      for (const A of m)
        clearTimeout(A);
      U(), _.remove(), D();
    }
  };
}
async function jo(e, t) {
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
  const { handleSyncStatus: l, destroy: d } = await xt(
    e,
    {
      ...i,
      onSearch: async (u) => u ? bt(a, u) : a,
      onChange: (u) => {
        o && o(u.map((p) => p.user));
      },
      onRefresh: async () => {
        for (const u of r)
          $s.setProjectUsers(u, null);
        a = await c();
      }
    }
  );
  return { handleSyncStatus: l, destroy: d };
}
async function No(e, t) {
  const { items: n, onChange: s, ...o } = t || {};
  if (!Array.isArray(n))
    throw new Error("Items property missing!");
  const i = n.map((a) => typeof a == "string" ? { value: a, label: a } : a), { handleSyncStatus: r, destroy: c } = await xt(
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
async function Do(e, t, n) {
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
async function Po(e, t, n) {
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
async function yn(e, t, n) {
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
async function Fo(e, t, n) {
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
async function Vo(e, t, n) {
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
async function zo(e, t, n) {
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
async function hn(e, t, n) {
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
async function Ro(e, t, n) {
  if (!e)
    throw new Error("Boolean type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Rt(t, {
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
async function Bo(e, t, n) {
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
async function Uo(e, t, n) {
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
async function Wo(e, t, n) {
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
async function Jo(e, t, n) {
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
async function Ko(e, t, n) {
  if (!e)
    throw new Error("Image type missing properties!");
  const { handleSyncStatus: s, destroy: o } = St(t, {
    ...n,
    multiple: !1,
    initialPreviewImages: (e.value ?? []).filter((r) => r.base && r["180x180"]).map((r) => r.base + r["180x180"].substring(1)),
    onChange: async (r) => {
      var l, d;
      s({ status: z.Pending });
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
async function Zo(e, t, n) {
  if (!e)
    throw new Error("Video type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Wt(t, {
    ...n,
    multiple: !1,
    onChange: async (r) => {
      var c, a;
      if (r.length > 0) {
        s({ status: z.Pending });
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
async function Yo(e, t, n) {
  if (!e)
    throw new Error("File type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Jt(t, {
    ...n,
    multiple: !1,
    onChange: async (r) => {
      var c, a;
      if (r.length > 0) {
        s({ status: z.Pending });
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
async function Xo(e, t, n) {
  if (!e)
    throw new Error("Location type missing properties!");
  if (!(n != null && n.apiKey) && !Kt()) {
    const o = e.value, i = Ae(t, {
      ...n != null && n.placeholder ? { placeholder: n.placeholder } : {},
      initialValue: typeof o == "string" ? o : (o == null ? void 0 : o.address) ?? "",
      onChange: async (r) => {
        await e.edit(String(r).trim() || null);
      }
    });
    return { destroy: () => i.destroy() };
  }
  const { destroy: s } = Zt(t, {
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
function Qo(e) {
  var n, s;
  const t = (n = e._object) == null ? void 0 : n.model;
  return ((s = t == null ? void 0 : t.tagSource) == null ? void 0 : s.call(t, e._name)) ?? null;
}
function Jn(e) {
  var o, i, r, c;
  const t = Qo(e);
  if (t)
    return { suggestions: () => t.values(), create: (a) => t.ensure(a) };
  const n = (c = (r = (i = (o = e._object) == null ? void 0 : o.model) == null ? void 0 : i.getAttributeDetails) == null ? void 0 : r.call(i, e._name)) == null ? void 0 : c.options, s = Array.isArray(n) ? n.filter((a) => typeof a == "string" && a !== "") : [];
  return s.length ? { suggestions: async () => s } : {};
}
async function Go(e, t, n) {
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
    ...Jn(e)
  }), c = e.syncStatus(o), a = e.subscribe((l) => i(s(l)), !1);
  return {
    destroy: () => {
      c(), a(), r();
    }
  };
}
async function er(e, t, n) {
  if (!e)
    throw new Error("Translated type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Bt(t, {
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
async function tr(e, t, n) {
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
async function nr(e, t, n) {
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
async function sr(e, t, n) {
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
async function or(e, t, n) {
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
async function rr(e, t, n) {
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
async function ir(e, t, n) {
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
async function ar(e, t, n) {
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
async function lr(e, t, n) {
  if (!e)
    throw new Error("Image many type missing properties!");
  const { handleSyncStatus: s, destroy: o } = St(t, {
    ...n,
    multiple: !0,
    initialPreviewImages: De(e.value).filter((r) => r && r.base && r["180x180"]).map((r) => r.base + r["180x180"].substring(1)),
    onChange: async (r) => {
      var l, d;
      s({ status: z.Pending });
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
async function cr(e, t, n) {
  if (!e)
    throw new Error("Text many type missing properties!");
  const { handleSyncStatus: s, destroy: o } = Vt(t, {
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
async function dr(e, t, n) {
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
    ...Jn(e)
  }), r = e.syncStatus(s), c = e.subscribe((a) => o(De(a)), !1);
  return {
    destroy: () => {
      r(), c(), i();
    }
  };
}
const ur = [
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
], gn = ["int", "tinyint", "double", "float", "percentage", "currency", "duration"], pr = ["text", "markdown", "json", "code"];
async function Kn(e, t, n) {
  var h, E, g, v;
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const o = e._type, i = e.value, r = ((g = (E = (h = e._object) == null ? void 0 : h.model) == null ? void 0 : E.getAttributeDetails) == null ? void 0 : g.call(E, e._name)) ?? {};
  if (s.innerHTML = "", n != null && n.label) {
    const b = document.createElement("label");
    b.className = "bd-label", b.textContent = n.label, s.append(b);
  }
  let c = () => {
  };
  const a = (v = e.subscribe) == null ? void 0 : v.call(e, (b) => c(b), !1), l = () => {
    a == null || a(), s.innerHTML = "";
  };
  if (o === "boolean") {
    const b = (q) => q === !0 || q === 1 || q === "1", S = Object.assign(document.createElement("input"), { type: "checkbox", checked: b(i) });
    return S.onchange = () => e.edit(S.checked), c = (q) => {
      S.checked = b(q);
    }, s.append(S), { destroy: l };
  }
  const d = Array.isArray(r.options) ? r.options : [];
  if ((o === "enum" || o === "tag") && d.length) {
    const b = document.createElement("select");
    for (const S of ["", ...d])
      b.append(Object.assign(document.createElement("option"), {
        value: S,
        textContent: S || "—",
        selected: S === (i ?? "")
      }));
    return b.onchange = () => e.edit(b.value || null), c = (S) => {
      b.value = typeof S == "string" ? S : "";
    }, s.append(b), { destroy: l };
  }
  const u = (b) => b == null ? "" : o === "json" ? JSON.stringify(b, null, 2) : o === "code" ? (b == null ? void 0 : b.content) ?? "" : o === "datetime" ? String(b).replace(" ", "T").slice(0, 16) : String(b), p = (b) => {
    if (b === "")
      return null;
    if (gn.includes(o)) {
      const S = Number(b);
      if (!Number.isFinite(S))
        throw new Error("Not a number");
      return S;
    }
    return o === "json" ? JSON.parse(b) : o === "code" ? { content: b, language: (i == null ? void 0 : i.language) ?? null } : o === "datetime" ? b.replace("T", " ") + (b.length === 16 ? ":00" : "") : b;
  };
  let y;
  pr.includes(o) ? y = Object.assign(document.createElement("textarea"), { rows: 4 }) : (y = document.createElement("input"), y.type = gn.includes(o) ? "number" : o === "date" ? "date" : o === "datetime" ? "datetime-local" : o === "email" ? "email" : o === "url" ? "url" : o === "phone" ? "tel" : "text", y.type === "number" && (y.step = o === "int" || o === "tinyint" ? "1" : "any")), y.className = "bd-native-field";
  let f = u(i);
  y.value = f, c = (b) => {
    const S = u(b);
    (document.activeElement !== y || y.value === f) && (y.value = S), f = S;
  };
  const m = async () => {
    if (y.value === f)
      return;
    let b;
    try {
      b = p(y.value);
    } catch {
      y.classList.add("bd-native-invalid");
      return;
    }
    y.classList.remove("bd-native-invalid"), f = y.value, await e.edit(b);
  };
  return y.onblur = () => {
    m();
  }, y.onkeydown = (b) => {
    b.key === "Enter" && y.tagName !== "TEXTAREA" && (b.preventDefault(), m()), b.key === "Escape" && (y.value = f, y.classList.remove("bd-native-invalid"));
  }, s.append(y), { destroy: l };
}
const Zn = {
  "fk-picker": { type: "fk", editor: Do },
  "enum-select": { type: "enum", editor: Po },
  // the heavy editors stay behind import(): htmlText carries EditorJS,
  // phone carries libphonenumber
  "html-blocks": { type: "htmlText", editor: Ne(() => import("./index-7c37c07e.js")) },
  "varchar-inline": { type: "varchar", editor: qo },
  "text-area": { type: "text", editor: yn },
  "markdown-text": { type: "markdown", editor: yn },
  "markdown-preview": { type: "markdown", editor: Ne(() => import("./index-22bad639.js")) },
  "tag-input": { type: "tag", editor: Go },
  "tag-options": { type: "tag", editor: Ne(() => import("./index-1c59226c.js")) },
  "texti18n-locales": { type: "texti18n", editor: er },
  "email-inline": { type: "email", editor: Fo },
  "phone-intl": { type: "phone", editor: Ne(() => import("./index-751ad20d.js")) },
  "url-inline": { type: "url", editor: Vo },
  "youtube-url": { type: "youtube", editor: or },
  "youtube-thumb": { type: "youtube", editor: Ne(() => import("./index-71d7a5e0.js")) },
  "int-inline": { type: "int", editor: zo },
  "float-inline": { type: "float", editor: hn },
  "percentage-number": { type: "percentage", editor: hn },
  "percentage-4dp": { type: "percentage", editor: Ne(() => import("./index-c917ac63.js")) },
  "currency-house": { type: "currency", editor: sr },
  "duration-seconds": { type: "duration", editor: tr },
  "duration-dhms": { type: "duration", editor: Ne(() => import("./index-1080ba4e.js")) },
  "formula-inline": { type: "formula", editor: nr },
  "hex-inline": { type: "hex", editor: rr },
  "boolean-toggle": { type: "boolean", editor: Ro },
  "json-text": { type: "json", editor: Bo },
  "json-tree": { type: "json", editor: Ne(() => import("./index-14f1b7ef.js")) },
  "code-text": { type: "code", editor: Uo },
  "code-language": { type: "code", editor: Ne(() => import("./index-60bef57d.js")) },
  "date-picker": { type: "date", editor: Wo },
  "datetime-picker": { type: "datetime", editor: Jo },
  "image-upload": { type: "image", editor: Ko },
  "video-upload": { type: "video", editor: Zo },
  "file-upload": { type: "file", editor: Yo },
  "location-map": { type: "location", editor: Xo },
  // one plain HTML field for the column's own type: the basic preset's editor
  native: { type: "", editor: Kn },
  // for many-valued attributes
  "mtm-picker": { type: "mtm", editor: ir },
  "enum-many": { type: "enum", editor: ar },
  "image-many": { type: "image", editor: lr },
  "text-many": { type: "text", editor: cr },
  "tag-many": { type: "tag", editor: dr },
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
}, fr = {
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
}, mr = {
  mtm: "mtm-picker",
  enum: "enum-many",
  image: "image-many",
  varchar: "text-many",
  text: "text-many",
  tag: "tag-many"
}, vn = (e) => Object.fromEntries(Object.entries(e).map(([t, n]) => [t, Zn[n].editor])), yr = /^\s*(javascript|data|vbscript):/i, hr = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?$/, bn = (e) => {
  let t = e.trim();
  return t.startsWith("|") && (t = t.slice(1)), t.endsWith("|") && (t = t.slice(0, -1)), t.split("|").map((n) => n.trim());
}, wn = (e) => yr.test(e) ? "#" : e;
function Ze(e) {
  return e.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (t, n, s) => `<img alt="${n}" src="${wn(s)}" />`).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (t, n, s) => `<a href="${wn(s)}">${n}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
function Yn(e) {
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
        c.rows.push(bn(f));
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
    const E = f.match(/^\s*[-*]\s+(.*)$/), g = f.match(/^\s*\d+\.\s+(.*)$/);
    if (E || g) {
      a(), d();
      const v = E ? "ul" : "ol";
      (!o || o.tag !== v) && (l(), o = { tag: v, items: [] }), o.items.push((E ?? g)[1]);
      continue;
    }
    if (f.includes("|") && y + 1 < t.length && hr.test(t[y + 1])) {
      p(), c = { header: bn(f), rows: [] }, y++;
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
function En(e, t, n = !1) {
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
function $n(e, t = !0) {
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: t }).format(e).replace(/\./g, "'").replace(/,/g, ".");
}
function Xn(e, t) {
  if (!t)
    return $n(e);
  try {
    return new Intl.NumberFormat("de-DE", { currency: t, style: "currency" }).format(e).replace(/\./g, "'").replace(/,/g, ".");
  } catch {
    return `${$n(e)} ${t}`;
  }
}
function gr(e) {
  if (e === "" || e === null || e === void 0)
    return "";
  const t = parseFloat(e);
  return isNaN(t) ? String(e) : String(Math.round(t * 1e4) / 1e4);
}
function vr(e) {
  const t = Math.max(0, Math.floor(e));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor(t % 86400 / 3600),
    m: Math.floor(t % 3600 / 60),
    s: t % 60
  };
}
function br(e) {
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
function wr(e, t) {
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
function Er(e, t) {
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
const $r = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
function Sr(e) {
  const t = e.match($r);
  return t ? t[1] : null;
}
function Cr(e) {
  if (e.thumbnail)
    return e.thumbnail;
  if (e["tn-oq"])
    return e["tn-oq"];
  const t = e.url ? Sr(e.url) : null;
  return t ? `https://img.youtube.com/vi/${t}/hqdefault.jpg` : null;
}
const Be = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0;
function Qn(e, t) {
  var s, o, i, r;
  const n = (i = (o = (s = e._object) == null ? void 0 : s.model) == null ? void 0 : o.getAttributesDetails) == null ? void 0 : i.call(o);
  return (r = n == null ? void 0 : n[e._name]) == null ? void 0 : r[t];
}
function Gn(e) {
  const t = Qn(e, "unit"), n = Array.isArray(t) ? t[0] : t;
  return typeof n == "string" && n !== "" ? n : void 0;
}
const xr = (e, t) => {
  const n = parseFloat(e.value);
  return Be(e.value) || isNaN(n) ? "" : `<p class="${e._name} bd-currency">${(t == null ? void 0 : t.labelHtml) ?? ""}${Xn(n, Gn(e))}</p>`;
}, Lr = (e, t) => Be(e.value) ? "" : `<p class="${e._name} bd-percentage">${(t == null ? void 0 : t.labelHtml) ?? ""}${be(gr(e.value))} <span class="bd-percentage-sign">%</span></p>`, kr = (e, t) => {
  const n = br(e.value);
  if (n === null)
    return "";
  const s = vr(n), o = ["d", "h", "m", "s"].filter((r) => s[r] > 0), i = (o.length > 0 ? o : ["s"]).map(
    (r) => `<span class="bd-duration-part bd-duration-${r}"><span class="bd-duration-value">${s[r]}</span><span class="bd-duration-unit">${r}</span></span>`
  );
  return `<p class="${e._name} bd-duration">${(t == null ? void 0 : t.labelHtml) ?? ""}${i.join(" ")}</p>`;
}, Mr = (e, t) => {
  if (Be(e.value))
    return "";
  const n = e.value;
  return `<div class="${e._name} bd-email">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="mailto:${Pe(n)}">${be(n)}</a></p>
                </div>`;
}, Tr = (e, t) => {
  var a;
  if (Be(e.value))
    return "";
  const n = e.value, s = n.split("-"), o = (a = s[0]) != null && a.startsWith("+") ? s[0] : `+${s[0]}`, i = s.length === 2 ? En(s[1], o, !0) : En(n), r = n.replace(/[^\d+]/g, ""), c = s.length === 2 && !r.startsWith("+") ? `+${r}` : r;
  return `<div class="${e._name} bd-phone">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="tel:${Pe(c)}">${be(i)}</a></p>
                </div>`;
}, Ar = (e, t) => Be(e.value) ? "" : `<div class="${e._name} bd-url">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <a href="${Pe(e.value)}" target="_blank" rel="noopener noreferrer">${be(e.value)}</a>
                </div>`, _r = (e, t) => {
  const n = e.value;
  return n != null && n.url ? `<p class="${e._name} bd-file">${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="${Pe(n.url)}" target="_blank" rel="noopener noreferrer">${be(n.url)}</a></p>` : "";
}, Hr = (e, t) => {
  const n = e.value;
  if (Be(n))
    return "";
  const s = typeof n == "object" ? Er(n, ue == null ? void 0 : ue.defaultLanguage) : String(n);
  return s === "" ? "" : `<p class="${e._name} bd-texti18n bd-text">${(t == null ? void 0 : t.labelHtml) ?? ""}${be(s)}</p>`;
}, Ir = (e, t) => {
  const n = typeof e.value == "string" ? { url: e.value } : e.value;
  if (!(n != null && n.url))
    return "";
  const s = Cr(n), o = s ? `<span class="bd-youtube-poster"><span class="bd-youtube-play"></span><img alt="" src="${Pe(s)}" /></span>` : '<span class="bd-youtube-label">&#9654; YOUTUBE</span>';
  return `<div class="${e._name} bd-youtube bd-video">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <a href="${Pe(n.url)}" target="_blank" rel="noopener noreferrer">${o}</a>
                </div>`;
}, Or = (e, t) => {
  var d, u;
  const n = Qn(e, "formula"), s = typeof n == "string" && n !== "" ? n : e.value;
  if (Be(s) || typeof s != "string")
    return "";
  const o = s.replace(/^\s*=/, ""), i = ((d = e._object) == null ? void 0 : d._attributes) ?? {}, r = {};
  for (const p of Object.keys(i))
    r[p.toLowerCase()] = (u = i[p]) == null ? void 0 : u.value;
  let c;
  try {
    c = wr(o, (p) => {
      const y = p.toLowerCase();
      if (!(y in r))
        throw new Error(`Unknown field in formula: ${p}`);
      const f = parseFloat(r[y]);
      return isNaN(f) ? 0 : f;
    });
  } catch {
    return `<p class="${e._name} bd-formula" title="${be(o)}"></p>`;
  }
  const a = Gn(e), l = a ? Xn(c, a) : String(c);
  return `<p class="${e._name} bd-formula" title="${be(o)}">${(t == null ? void 0 : t.labelHtml) ?? ""}${l}</p>`;
}, jr = (e, t) => Be(e.value) ? "" : `<p class="${e._name} bd-hex">${(t == null ? void 0 : t.labelHtml) ?? ""}${be(e.value)}</p>`, Nr = {
  currency: xr,
  percentage: Lr,
  duration: kr,
  email: Mr,
  phone: Tr,
  url: Ar,
  file: _r,
  texti18n: Hr,
  youtube: Ir,
  formula: Or,
  hex: jr
}, dt = (e, t) => `<p class="${`${e._name} bd-number`}">${(t == null ? void 0 : t.labelHtml) ?? ""}${e.value.toString()}</p>`, jt = (e, t) => {
  const n = (e.value instanceof Array ? e.value : [e.value]).map(st);
  return n.length === 0 ? "" : `<p class="${`${t != null && t.isSince ? "since" : e._name} bd-text`}">${(t == null ? void 0 : t.labelHtml) ?? ""}${n.join(", ")}</p>`;
}, Dr = {
  int: dt,
  tinyint: dt,
  double: dt,
  float: dt,
  varchar: jt,
  text: jt,
  // The same chips as the tag input, read-only
  tag: (e, t) => {
    const n = ks(e.value);
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
                    ${Yn(e.value)}
                </div>`,
  boolean: (e, t) => `<div class="${`${e._name} bd-boolean ${e.value === !0 ? "icon-true" : "icon-false"}`}">
                ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}</div>`,
  datetime: (e, t) => {
    const n = ue != null && ue.formatDates && typeof e.toFormatted == "function" ? e.toFormatted(ue == null ? void 0 : ue.defaultLanguage) : e.value;
    return `<div class="${`${e._name} bd-datetime`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${n}</p>
                </div>`;
  },
  date: (e, t) => {
    const n = ue != null && ue.formatDates && typeof e.toFormatted == "function" ? e.toFormatted(ue == null ? void 0 : ue.defaultLanguage) : e.value;
    return `<div class="${`${e._name} bd-date`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${n}</p>
                </div>`;
  },
  enum: (e, t) => {
    const n = Ls(e), s = (ue == null ? void 0 : ue.defaultLanguage) ?? "en", o = (e.value instanceof Array ? e.value : [e.value]).map(st), i = o.map((a) => typeof a == "string" && a ? Hn(n == null ? void 0 : n.options_labels, a, s, a) : a);
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
  ...Nr
}, Pr = (e, t) => {
  const n = e.value;
  return n == null || n === "" ? "" : typeof n == "object" && !Array.isArray(n) ? `<div class="${`${e._name} bd-json`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <pre>${JSON.stringify(n, null, 2) ?? ""}</pre>
                </div>` : jt(e, t);
}, qr = Pr, Nt = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new Set();
let Qe = null;
function Fr() {
  Qe || typeof MutationObserver > "u" || (Qe = new MutationObserver((e) => {
    for (const t of e)
      for (const n of Array.from(t.removedNodes))
        if (n instanceof Element)
          for (const s of Array.from(rt))
            (n === s || n.contains(s)) && (s.isConnected || es(s));
  }), Qe.observe(document.documentElement, { childList: !0, subtree: !0 }));
}
function es(e) {
  const t = Nt.get(e);
  Nt.delete(e), rt.delete(e);
  try {
    t && t();
  } catch (n) {
    console.error("Hydrator teardown error:", (n == null ? void 0 : n.stack) ?? (n == null ? void 0 : n.message) ?? n);
  }
  rt.size === 0 && Qe && (Qe.disconnect(), Qe = null);
}
function Vr(e) {
  for (const t of Array.from(rt))
    (e === t || e.contains(t)) && es(t);
}
function ts(e, t, n) {
  const s = t(e, n);
  typeof s == "function" && (Nt.set(e, s), rt.add(e), Fr());
}
function zr(e, t) {
  var o, i, r, c, a;
  const n = (r = (i = (o = t._object) == null ? void 0 : o.model) == null ? void 0 : i.getName) == null ? void 0 : r.call(i), s = (a = (c = t._object) == null ? void 0 : c._blitzID) == null ? void 0 : a.value;
  return !n || !s ? !1 : (e.setAttribute("data-bd-hydrate", ""), e.setAttribute("data-bd-model", n), e.setAttribute("data-bd-id", s), e.setAttribute("data-bd-attr", t._name), !0);
}
async function Rr(e, t, n) {
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
        u && ts(o, u, d);
      } catch (a) {
        n(`hydrate failed for ${i}.${c}: ${a.message}`);
      }
  }
}
function ns(e) {
  const t = [];
  return e instanceof Array ? t.push(...e) : Object.hasOwn(e, "_attributes") ? t.push(
    ...Object.values(e._attributes).filter((n) => !n._name.startsWith("_") && !n._name.startsWith("@"))
  ) : t.push(e), t.filter((n) => n.value != null && n.value !== "");
}
async function Dt(e) {
  const t = await ke._Model.get(e).then((n) => n == null ? void 0 : n.getAttributesDetails());
  if (t) {
    for (const n in t)
      if (typeof t[n].type == "string" && ["varchar", "text"].includes(t[n].type))
        return n;
  }
  return "_blitzID";
}
function ss(e, t, n, s) {
  var r, c;
  return typeof n == "boolean" && n === !0 || Array.isArray(n) && n.includes(t) ? t.startsWith("since:") ? `<b class="bd-label">${t.split("since:")[1]}: </b>` : `<b class="bd-label">${Je((r = e[t]) == null ? void 0 : r["label-int"], (c = e[t]) == null ? void 0 : c.label, s, t)}: </b>` : "";
}
async function os(e, t) {
  var a, l, d;
  if (!e)
    throw new Error("Missing attribute(s)!");
  const { labelLanguage: n, enableLabels: s } = t ?? {}, o = n ?? (ue == null ? void 0 : ue.defaultLanguage) ?? "en", i = ns(e), r = i.length > 0 ? ((l = (a = i[0]._object) == null ? void 0 : a.model) == null ? void 0 : l.getAttributesDetails()) ?? {} : {}, c = [];
  for (const u of i) {
    if (u._name.startsWith("_")) {
      c.push(u.value ?? "");
      continue;
    }
    const p = u._name === "since";
    if (!p && !r[u._name])
      continue;
    const y = u._name.endsWith("_fk"), f = u._name.endsWith("_mtm"), m = ss(r, u._name, s, o);
    if (y || f) {
      const g = await Dt(u._type);
      if (y) {
        const v = await u.getObject();
        (d = v == null ? void 0 : v[g]) != null && d.value && c.push(`<div class="${`${u._name} bd-fk`}">
                        <p>${m + v[g].value}</p>
                    </div>`);
        continue;
      } else if (f) {
        if (!(u.value instanceof Array))
          continue;
        const v = (await u.getObjects()).filter((b) => {
          var S;
          return (S = b[g]) == null ? void 0 : S.value;
        });
        if (v.length === 0)
          continue;
        c.push(`<div class="${`${u._name} bd-mtm`}">
                    ${m ? `<p>${m}</p>` : ""}${v.map((b) => `<div class="fk-item">
                            <p>${b[g].value}</p>
                        </div>`).join(`
`)}
                </div>`);
        continue;
      }
    }
    const E = (this && typeof this.resolveReadonlyString == "function" ? this : qe).resolveReadonlyString(u, { serialized: !0, labelHtml: m, isSince: p });
    E && c.push(E);
  }
  return c.length === 0 ? null : c.join(`
`);
}
async function rs(e, t, n, s) {
  const o = ue == null ? void 0 : ue.locationMap, i = o === "none" ? "none" : s ? "showMap" : o ?? "mapOnClick", r = s ?? (ue == null ? void 0 : ue.googleMapsApiKey) ?? null;
  if (i === "none" || !r && !Kt())
    return !1;
  const c = async () => {
    const p = await (r ? Ms(t, n, r) : fo(t, n)).catch(() => null);
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
const Br = {
  location: async (e, t, { googleMapsApiKey: n }) => {
    const s = t.value;
    return !(s != null && s.lat) || !(s != null && s.lng) ? !1 : rs(e, s.lat, s.lng, n);
  }
};
async function Xt(e, t) {
  var h, E;
  if (!e)
    throw new Error("Missing attribute(s)!");
  const { labelLanguage: n, enableLabels: s, googleMapsApiKey: o, status: i, statusScope: r } = t ?? {}, c = (g) => {
    var b;
    const v = this && typeof this.resolveReadonlyElement == "function" ? this : qe;
    (b = v == null ? void 0 : v.warn) == null || b.call(v, g);
  };
  let a = !1;
  const l = (g, v) => {
    if (i) {
      if (!r) {
        a || c("getHtmlElement: `status: true` without a `statusScope` — the badge would outlive the element it paints, so no badge was attached"), a = !0;
        return;
      }
      r.attach(g, v);
    }
  }, d = ns(e), u = d.length > 0 ? ((E = (h = d[0]._object) == null ? void 0 : h.model) == null ? void 0 : E.getAttributesDetails()) ?? {} : {}, p = n ?? (ue == null ? void 0 : ue.defaultLanguage) ?? "en", y = o ?? null, f = (g) => ss(u, g, s, p), m = [];
  for (const g of d) {
    const v = g._name.startsWith("since:");
    if (!v && !u[g._name])
      continue;
    const b = g._name.endsWith("_fk"), S = g._name.endsWith("_mtm"), q = f(g._name);
    if (b) {
      const _ = document.createElement("div");
      _.className = `${g._name} bd-fk`, Dt(g._type).then(async (H) => {
        var w;
        const I = await g.getObject();
        (w = I == null ? void 0 : I[H]) != null && w.value && (_.innerHTML = `<p>${q + I[H].value}</p>`);
      }).catch((H) => c(`${g._name}: fk label unresolved — ${(H == null ? void 0 : H.message) ?? H}`)), m.push(_), l(_, g);
      continue;
    } else if (S) {
      if (!(g.value instanceof Array))
        continue;
      const _ = document.createElement("div");
      _.className = `${g._name} bd-mtm`, _.innerHTML = (q ? `<p>${q}</p>` : "") + g.value.map((H) => `<div class="fk-item">
                    <p data-id="${H._blitzID}"></p>
                </div>`).join(`
`), Dt(g._type).then(async (H) => {
        var k;
        const I = await g.getObjects(), w = Array.from(_.querySelectorAll("p"));
        for (const F of I) {
          const M = w.find((O) => O.getAttribute("data-id") === F._blitzID.value);
          M && ((k = F[H]) != null && k.value) && (M.innerHTML = F[H].value);
        }
      }).catch((H) => c(`${g._name}: mtm labels unresolved — ${(H == null ? void 0 : H.message) ?? H}`)), m.push(_), l(_, g);
      continue;
    }
    const $ = this && typeof this.resolveReadonlyElement == "function" ? this : qe;
    let D = $.resolveReadonlyElement(g, { labelHtml: q, isSince: v });
    if (D && g._type === "location") {
      const { render: _, layer: H } = $.resolveView(g);
      H === 0 && typeof _(g, { labelHtml: q, isSince: v }) == "string" && !await Br.location(D, g, { googleMapsApiKey: y }) && !D.querySelector(".bd-location-address") && (D = null);
    }
    D && m.push(D), D && !v && l(D, g);
  }
  if (m.length === 0)
    return null;
  if (m.length === 1)
    return m[0];
  {
    const g = document.createElement("div");
    for (const v of m)
      g.append(v);
    return g;
  }
}
async function Ur(e, t, n) {
  if (!e)
    throw new Error("Missing attribute(s)!");
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let o = 0;
  const i = async () => {
    const a = ++o, l = await Xt(e);
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
const Wr = ["boolean", "datetime", "date", "image", "video", "file"];
function is(e, t, n) {
  var G;
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
    onServerSuccess: g
  } = n ?? {};
  s.innerHTML = `<div class="bd-addform ${e.getName() ?? ""}"></div>`;
  const v = s.querySelector(".bd-addform"), b = y ?? (ue == null ? void 0 : ue.defaultLanguage) ?? "en", S = e.getAttributesDetails() ?? {}, q = Array.isArray(o) ? o : Object.keys(S), $ = (B) => Je(S[B]["label-int"], S[B].label, b, B), D = (qe ?? ke.ui).kernel, _ = (qe ?? ke.ui).services, H = { image: 0, video: 0, file: 0 }, I = (B, Y) => async (Z, pe) => {
    H[B]++;
    try {
      return await Y(Z, pe);
    } finally {
      H[B]--;
    }
  }, w = {
    ..._,
    upload: I("image", _.upload),
    uploadVideo: I("video", _.uploadVideo),
    uploadFile: I("file", _.uploadFile)
  };
  let k = !1, F = [];
  const M = (B) => {
    k ? B() : F.push(B);
  }, O = {};
  for (const B of q) {
    if (!S[B])
      continue;
    const Y = S[B], Z = Array.isArray(Y.type) ? Y.type[0] : Y.type, pe = Array.isArray(Y.type), fe = c || r.includes(B), ge = a || Wr.includes(Z) ? $(B) + (fe ? " *" : "") : void 0, R = As(O, B, Y, e, {
      className: B,
      label: ge,
      placeholder: `${$(B)}...`,
      ...f ? { defaultDialCode: f } : {},
      ...m ? { apiKey: m } : {},
      ...h !== void 0 ? { initialExpand: h } : {},
      ...u && pe && ["varchar", "text"].includes(Z) ? { emptyMsg: u } : {}
    });
    R.services = w;
    const T = D.resolveForPort(R);
    O[B] = i[B] ?? Y.default ?? ((G = T.default) == null ? void 0 : G.call(T)) ?? void 0, R.value = O[B];
    const V = document.createElement("div");
    v.append(V), D.mount(R, V, "write").then(M).catch((C) => console.error(`"${B}" Add field error:`, (C == null ? void 0 : C.stack) ?? (C == null ? void 0 : C.message)));
  }
  const J = document.createElement("button");
  J.innerText = p ?? "Add", J.className = "add-btn", v.append(J);
  const K = (B) => {
    var Y;
    if (J.disabled = B, J.classList.toggle("loading", B), B) {
      if (!J.querySelector(".add-btn-spinner")) {
        const Z = document.createElement("span");
        Z.className = "add-btn-spinner", J.append(Z);
      }
    } else
      (Y = J.querySelector(".add-btn-spinner")) == null || Y.remove();
  };
  J.onclick = async () => {
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
      const fe = (c ? q : r).filter((ge) => O[ge] == null);
      if (fe.length > 0) {
        alert(((l == null ? void 0 : l.missingFields) || "Missing fields: ") + fe.map((ge) => $(ge)).join(", "));
        return;
      }
    }
    const B = await e.add(O);
    if (!B) {
      alert((l == null ? void 0 : l.unexpectedError) || "Unexpected error! Please try again");
      return;
    }
    const Y = d ?? "Item was added successfully!", Z = () => v.innerHTML = `<p class="success-msg">${Y}</p>`;
    if (g || (j(!1), Z()), E && E(B), g) {
      const pe = B._blitzID.value;
      K(!0);
      let fe = !1;
      const ge = (T) => {
        if (!(fe || T.transaction.action !== "add")) {
          if (T.status === z.Completed)
            fe = !0, B.removeEventListener("syncStatusChange", ge), K(!1), j(!1), Z(), g(B);
          else if (T.status === z.Failed) {
            fe = !0, B.removeEventListener("syncStatusChange", ge), K(!1);
            const V = "Error: " + (T.message ?? "Add failed! Please try again.");
            alert(V), console.error(V);
          }
        }
      };
      B.addEventListener("syncStatusChange", ge);
      const R = (await ke.queue.getJobsForObject(pe))[0];
      R && ge(R);
    }
  };
  const j = (B = !0) => {
    k = !0;
    for (const Y of F)
      Y();
    F = [], B && (s.innerHTML = "");
  };
  return { destroy: j };
}
const _t = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
let Jr = 0, Sn = 0;
function et(e, t) {
  const { titleElm: n, closeElm: s, onEscape: o } = t;
  e.setAttribute("role", "dialog"), e.setAttribute("aria-modal", "true"), n && (n.id || (n.id = `bd-dialog-title-${++Jr}`), e.setAttribute("aria-labelledby", n.id)), s && (s.setAttribute("role", "button"), s.setAttribute("aria-label", "Close"), s.tabIndex = 0, s.addEventListener("keydown", (d) => {
    d.key !== "Enter" && d.key !== " " || (d.preventDefault(), s.click());
  }));
  const i = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  e.tabIndex = -1, (e.querySelector(_t) ?? e).focus(), ++Sn === 1 && (document.body.style.overflowY = "hidden");
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
    const u = [...e.querySelectorAll(_t)];
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
    !r() || c(d.target) || d.target instanceof Node && e.contains(d.target) || (e.querySelector(_t) ?? e).focus();
  };
  return document.addEventListener("keydown", a), document.addEventListener("focusin", l), () => {
    document.removeEventListener("keydown", a), document.removeEventListener("focusin", l), --Sn === 0 && (document.body.style.overflowY = ""), i != null && i.isConnected && i.focus();
  };
}
function Kr(e, t) {
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
  const { destroy: f } = is(
    e,
    y,
    {
      ...r,
      onSuccess: (g) => {
        n && n(g), o && (u.style.display = "block", setTimeout(() => {
          m || E();
        }, c * 1e3));
      }
    }
  );
  let m = !1, h = null;
  const E = () => {
    m = !0, h == null || h(), f(), a.remove();
  };
  return d.onclick = () => E(), a.onclick = (g) => {
    g && g.target !== g.currentTarget || E();
  }, a.append(l), document.body.append(a), h = et(a, {
    titleElm: l.querySelector(".title"),
    closeElm: d,
    onEscape: () => E()
  }), { destroy: E };
}
async function as(e, t, n, s) {
  const o = s ?? qe, i = (l) => o ? o.getHTML(l) : os(l);
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
            const g = await i(E);
            r = r.replaceAll(p, () => g ?? "");
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
            const g = await i(E);
            r = r.replaceAll(p, () => g ?? "");
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
    await rs(l, l.dataset.lat, l.dataset.lng, n == null ? void 0 : n.googleMapsApiKey);
  return o && await o.hydrate(a), a;
}
async function ls(e, t, n, s) {
  const o = s ?? qe, i = (a, l) => o ? o.getHtmlElement(a, l) : Xt(a, l), r = [], c = t && t.length > 0 ? t : Object.keys(e._attributes);
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
function Cn(e) {
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
function Zr(e, t) {
  const n = Cn(e), s = Cn(t), o = { before: [], after: [], replaced: !0 };
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
      const g = p.get(n.tokens[E].word);
      g ? g.push(E) : p.set(n.tokens[E].word, [E]);
    }
    let y = /* @__PURE__ */ new Map(), f = 0, m = 0, h = 0;
    for (let E = d; E < u; E++) {
      const g = /* @__PURE__ */ new Map();
      for (const v of p.get(s.tokens[E].word) ?? []) {
        const b = (y.get(v - 1) ?? 0) + 1;
        g.set(v, b), b > h && (h = b, f = v - b + 1, m = E - b + 1);
      }
      y = g;
    }
    if (h === 0) {
      r(o.before, n.tokens, a, l, !0), r(o.after, s.tokens, d, u, !0);
      return;
    }
    o.replaced = !1, c(a, f, d, m), r(o.before, n.tokens, f, f + h, !1), r(o.after, s.tokens, m, m + h, !1), c(f + h, l, m + h, u);
  };
  return c(0, n.tokens.length, 0, s.tokens.length), Ye(o.before, i.get(o.before) ?? "", !1), Ye(o.after, i.get(o.after) ?? "", !1), o;
}
const Yr = "@NULL", Ht = { known: !1, value: null };
function It(e) {
  if (e == null || e === Yr)
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
function Xr(e) {
  if (!e)
    return null;
  for (const t of Object.keys(e))
    return t;
  return null;
}
function Pt(e) {
  return e != null && e.attribute ? e.attribute : Xr(gt(e));
}
function cs(e) {
  var s;
  const t = Pt(e);
  if (!t)
    return null;
  const n = (s = gt(e)) == null ? void 0 : s[t];
  return n && typeof n == "object" && n.path ? String(n.path) : null;
}
function ds(e, t) {
  var i;
  const n = e[t];
  if (!n || n.action === "add")
    return Ht;
  const s = Pt(n);
  if (!s)
    return Ht;
  const o = (i = gt(n)) == null ? void 0 : i[s];
  if (o && typeof o == "object" && "prev" in o)
    return { known: !0, value: It(o.prev) };
  for (let r = t + 1; r < e.length; r++) {
    const c = e[r];
    if (c.action === "add") {
      const a = gt(c);
      if (a && s in a) {
        const l = a[s];
        return {
          known: !0,
          value: It(l && typeof l == "object" && "new" in l ? l.new : l)
        };
      }
      continue;
    }
    if (Pt(c) === s)
      return { known: !0, value: It(c.newValue) };
  }
  return Ht;
}
function kt(e, t, n = {}) {
  if (!e)
    throw new Error("mountObjectHistory: missing object");
  const s = typeof t == "string" ? document.getElementById(t) ?? document.querySelector(t) : t;
  if (!s)
    throw new Error("mountObjectHistory: container not found");
  const o = s, i = n.emptyMessage ?? "No history yet!", r = n.attributeLabel ?? ((w) => w), c = typeof e.history == "function";
  o.classList.add("bd-oh");
  let a = [], l = !0, d = null, u = !1, p = null;
  const y = (w) => {
    const k = Number(w);
    return Number.isFinite(k) ? ft(k).toLocaleString() : w;
  }, f = [
    [60, "minute"],
    [60, "hour"],
    [24, "day"],
    [7, "week"],
    [4.35, "month"],
    [12, "year"]
  ], m = (w) => {
    const k = Number(w);
    if (!Number.isFinite(k))
      return w;
    let F = (ft(k).getTime() - Date.now()) / 1e3, M = "second";
    for (const [O, J] of f) {
      if (Math.abs(F) < O)
        break;
      F /= O, M = J;
    }
    return new Intl.RelativeTimeFormat(void 0, { numeric: "auto" }).format(Math.round(F), M);
  }, h = 140, E = 24, g = (w) => {
    if (w == null)
      return null;
    if (typeof w == "string")
      return w;
    try {
      return JSON.stringify(w);
    } catch {
      return String(w);
    }
  }, v = (w) => w.map((k) => k.changed ? ce`<mark class="bd-oh-diff">${k.text}</mark>` : ce`<span>${k.text}</span>`).join("");
  function b(w, k, F) {
    const M = me(k ? v(k) : ce`${w}`);
    return w.length <= h ? ce`<span class="bd-oh-side bd-oh-${F}">${M}</span>` : ce`<details class="bd-oh-side bd-oh-${F} bd-oh-fold">
            <summary>${w.slice(0, h)}… <span class="bd-oh-fold-meta">${String(w.length)} chars</span></summary>
            <span class="bd-oh-value">${M}</span>
        </details>`;
  }
  function S(w, k) {
    if (w.action === "add")
      return q(w);
    const F = g(w.newValue), M = ds(a, k), O = M.known ? M.value ?? "" : null;
    if (F == null && !M.known)
      return "";
    if (O == null)
      return ce`<div class="bd-oh-change">
                <span class="bd-oh-side bd-oh-old bd-oh-unknown" title="The change was recorded without a previous value.">—</span>
                <span class="bd-oh-arrow">→</span>
                ${me(b(F ?? "", null, "new"))}
            </div>`;
    const K = Math.max(O.length, (F ?? "").length) >= E ? Zr(O, F ?? "") : null, j = K && !K.replaced ? K : null;
    return ce`<div class="bd-oh-change">
            ${me(b(O, (j == null ? void 0 : j.before) ?? null, "old"))}
            <span class="bd-oh-arrow">→</span>
            ${me(b(F ?? "", (j == null ? void 0 : j.after) ?? null, "new"))}
        </div>`;
  }
  function q(w) {
    let k = w.data;
    if (typeof k == "string")
      try {
        k = JSON.parse(k);
      } catch {
        k = null;
      }
    if (!k || typeof k != "object")
      return "";
    const F = Object.entries(k).filter(([M]) => !M.startsWith("_")).map(([M, O]) => [M, g((O == null ? void 0 : O.new) ?? O)]).filter(([, M]) => M != null && M !== "");
    return F.length ? ce`<details class="bd-oh-created">
            <summary>${String(F.length)} value${F.length === 1 ? "" : "s"}</summary>
            <dl>${me(F.map(([M, O]) => ce`
                <dt>${r(M)}</dt><dd>${O.slice(0, h)}</dd>`).join(""))}</dl>
        </details>` : "";
  }
  function $(w, k) {
    const F = cs(w), M = F ? `.${F}` : "", O = w.attribute ? ce`<span class="bd-oh-attribute" title="${w.attribute}${M}">${r(w.attribute)}${M}</span>` : "", J = w._userID ? `user ${w._userID}` : null;
    return ce`<li class="bd-oh-entry">
            <span class="bd-oh-dot bd-oh-${w.action}"></span>
            <div class="bd-oh-entry-main">
                <div class="bd-oh-entry-top">
                    <span class="bd-oh-action">${w.action}</span>
                    ${me(O)}
                    <span class="bd-oh-entry-meta">
                        ${me(J ? ce`<span class="bd-oh-who">${J}</span>` : "")}
                        <span title="${y(w.blitzstamp)}">${m(w.blitzstamp)}</span>
                    </span>
                </div>
                ${me(S(w, k))}
            </div>
        </li>`;
  }
  const D = 100;
  function _() {
    if (u)
      return;
    const w = a.length >= D ? ce`<p class="bd-oh-cap">Showing the newest ${String(D)} changes.</p>` : "", k = l ? '<div class="bd-oh-spinner"></div>' : d ? ce`<p class="bd-oh-error">${d}</p>` : a.length ? ce`<ul class="bd-oh-entries">${me(a.map($).join(""))}</ul>${me(w)}` : ce`<p class="bd-oh-empty">${i}</p>`;
    o.innerHTML = ce`
            <div class="bd-oh-banner">
                <h2>History</h2>
                <button class="bd-oh-refresh" title="Refresh">⟳</button>
            </div>
            <div class="bd-oh-body">${me(k)}</div>`;
  }
  async function H() {
    if (!u) {
      if (l = !0, d = null, _(), !c)
        d = "Reading history requires @blitzdata.ts/core 1.11 or newer.";
      else {
        p == null || p.abort();
        const w = new AbortController();
        p = w;
        try {
          const k = await e.history(w.signal);
          if (u || w.signal.aborted)
            return;
          a = k;
        } catch (k) {
          if (u || w.signal.aborted)
            return;
          d = k.message;
        }
      }
      l = !1, _();
    }
  }
  function I(w) {
    w.target.closest(".bd-oh-refresh") && H();
  }
  return o.addEventListener("click", I), H(), {
    refresh: () => {
      H();
    },
    destroy: () => {
      u = !0, p == null || p.abort(), o.removeEventListener("click", I), o.classList.remove("bd-oh"), o.innerHTML = "";
    }
  };
}
async function us(e, t, n) {
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
    u = await as(e, f, { labelLanguage: o, googleMapsApiKey: c });
  } else {
    const f = typeof a == "function" ? a(e) : a;
    u = await ls(e, f, { labelLanguage: o, enableLabels: i, sinceLabel: r, googleMapsApiKey: c });
  }
  u && (u.className = "bd-objectview " + (e._blitzID.value ?? ""), s.append(u));
  let p = null;
  if (d) {
    const f = document.createElement("details");
    f.className = "bd-objectview-history", f.innerHTML = '<summary>History</summary><div class="bd-objectview-history-body"></div>', f.addEventListener("toggle", () => {
      !f.open || p || (p = kt(
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
function ps(e, t) {
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
  us(e, p, c).then(({ destroy: h }) => y = h).catch((h) => console.error("mountObjectViewModal: view failed to render:", h));
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
function fs(e, t, n) {
  let s = !1;
  const o = e.subscribeToList(t, (i) => {
    i.nextSource || (s = !0), n(i.items ?? [], s);
  }, !0);
  return () => {
    typeof o == "function" && o();
  };
}
function Qr(e, t, n, s) {
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
    onObjectClick: g,
    onPageChange: v
  } = s ?? {};
  let b = [], S = null, q = null, $ = 1, D = Promise.resolve(), _ = 0, H = !1, I = !1, w = !!E;
  o.innerHTML = `<div class="bd-list ${e.getName() ?? ""}">
        <div class="spinner"></div>
    </div>`;
  const k = o.querySelector(".bd-list"), F = () => {
    k.classList.remove("bd-list-slide-in"), k.offsetWidth, k.classList.add("bd-list-slide-in");
  };
  k.addEventListener("animationend", (G) => {
    G.target === k && k.classList.remove("bd-list-slide-in");
  });
  const M = fs(e, n, (G, B) => {
    b = G, I = B, j();
  }), O = () => {
    H = !0, M(), o.innerHTML = "";
  }, J = (G) => {
    S = G, $ = 1, j();
  }, K = (G) => {
    q = G, j();
  }, j = () => {
    const G = ++_, B = () => H || G !== _;
    D = D.then(async () => {
      if (B())
        return;
      const Y = [...b], Z = typeof S == "function" ? Y.filter(S) : Y;
      typeof q == "function" && Z.sort(q);
      const pe = f ? Z.slice(($ - 1) * m, $ * m) : Z, fe = Math.ceil(Z.length / m), ge = document.createDocumentFragment();
      for (const T of pe) {
        const V = document.createElement("div");
        V.className = "card " + T._blitzID.value;
        let C = null;
        try {
          if (r) {
            const N = typeof r == "function" ? r(T) : r;
            C = await as(T, N, { labelLanguage: c, googleMapsApiKey: d }, this);
          } else {
            const N = typeof i == "function" ? i(T) : i;
            C = await ls(T, N, { labelLanguage: c, enableLabels: a, sinceLabel: l, googleMapsApiKey: d }, this);
          }
        } catch (N) {
          console.error("Object render error:", N.stack ?? N.message);
        }
        if (C) {
          if (C.className = "attributes", V.append(C), (typeof g == "function" || p) && (C.onclick = () => {
            g && g(T), p && ps(T, { labelLanguage: c, enableLabels: a, googleMapsApiKey: d, ...y });
          }), u) {
            const N = document.createElement("div");
            N.className = "delete-btn", N.onclick = () => {
              confirm("Are you sure?") && T.delete();
            }, V.append(N);
          }
          ge.append(V);
        }
      }
      if (B()) {
        Vr(ge);
        return;
      }
      const R = ge.childElementCount > 0 || I;
      if (ge.childElementCount === 0) {
        const T = document.createElement("template");
        T.innerHTML = I ? `<p class="empty">${h ?? "No results found!"}</p>` : '<div class="spinner"></div>', ge.append(T.content);
      }
      if (f && fe > 1) {
        const T = document.createElement("div");
        T.className = "pagination";
        for (let V = 1; V < fe + 1; V++) {
          const C = document.createElement("button");
          C.innerText = V.toString(), $ === V && (C.className = "checked"), C.onclick = () => {
            $ !== V && ($ = V, E && (w = !0, k.classList.add("bd-list-switching")), v && v($), j());
          }, T.append(C);
        }
        ge.append(T);
      }
      k.replaceChildren(ge), k.classList.remove("bd-list-switching"), w && R && (w = !1, F());
    }).catch((Y) => {
      console.error("List render error:", (Y == null ? void 0 : Y.stack) ?? (Y == null ? void 0 : Y.message) ?? Y);
    });
  };
  return {
    destroy: O,
    getObjects: () => b,
    updateFilter: J,
    updateSort: K
  };
}
function Qt(e, t) {
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
  const a = c.querySelector(".close-btn"), l = c.querySelector(".panel"), d = kt(e, l, o);
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
function Gr(e, t, n, s) {
  var Le, Ce, Se;
  if (!e)
    throw new Error("Missing model!");
  const o = typeof t == "string" ? document.getElementById(t) : t;
  if (!(o instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const { headerLabel: i, labelLanguage: r, searchRow: c, actions: a, allowDelete: l, readonly: d, noResultsMessage: u, onRowClick: p, reorder: y, tree: f, status: m } = s ?? {}, h = e.getAttributesDetails() ?? {}, E = Object.keys(h).filter((L) => !L.startsWith("_")), g = r ?? ((Le = this.settings) == null ? void 0 : Le.language) ?? "en", v = (L) => {
    var P, W;
    return i ? i(L, h[L]) : Je((P = h[L]) == null ? void 0 : P["label-int"], (W = h[L]) == null ? void 0 : W.label, g, L);
  };
  let b = [], S = !1, q = null, $ = null, D = null, _ = !0, H = !1, I = null;
  const w = {}, k = (L) => {
    var P, W;
    return ["1", !0].includes((W = (P = e._attributes) == null ? void 0 : P[L]) == null ? void 0 : W.value);
  }, M = k("hasprojects") && !!((Ce = n == null ? void 0 : n.conditions) != null && Ce.some((L) => (L == null ? void 0 : L[0]) === "project_fk" && (L == null ? void 0 : L[1]) === "=")) ? "_projectsort" : "_sort", O = y !== !1 && !d && k("hassort") && (!(n != null && n.customSort) || n.customSort === M) && (n == null ? void 0 : n.customSortDirection) !== "ASC", J = (L) => {
    var P;
    return Number(((P = L[M]) == null ? void 0 : P.value) ?? 0);
  };
  let K = null;
  const j = (L, P, W) => {
    var Ee, xe, de, re;
    const ne = P[W - 1] ? J(P[W - 1]) : null, te = P[W] ? J(P[W]) : null;
    let ve;
    ne === null && te === null || (ne === null ? ve = te + 10 : te === null ? ve = ne - 10 : ve = Math.floor((ne + te) / 2), ne !== null && te !== null && ve <= te && (ve = ne), ve !== J(L) && ((re = (de = (xe = (Ee = L[M]) == null ? void 0 : Ee.edit) == null ? void 0 : xe.call(Ee, String(ve))) == null ? void 0 : de.then) == null || re.call(de, () => we())));
  }, G = f !== !1 && ((Se = h.parent_fk) == null ? void 0 : Se.type) === e.getName() ? "parent_fk" : null, B = G !== null, Y = /* @__PURE__ */ new Set(), Z = (L) => String(L._blitzID.value), pe = (L) => {
    var W;
    const P = (W = L[G]) == null ? void 0 : W.value;
    return P == null || P === "" ? null : typeof P == "object" ? P._blitzID ?? null : String(P);
  }, fe = (L) => {
    const P = new Map(L.map((de) => [Z(de), de])), W = /* @__PURE__ */ new Map(), ne = [];
    for (const de of L) {
      const re = pe(de);
      re !== null && re !== Z(de) && P.has(re) ? W.has(re) ? W.get(re).push(de) : W.set(re, [de]) : ne.push(de);
    }
    const te = (de, re) => J(re) - J(de);
    ne.sort(te);
    for (const de of W.values())
      de.sort(te);
    const ve = [], Ee = /* @__PURE__ */ new Map(), xe = (de, re) => {
      for (const je of de)
        ve.push(je), Ee.set(Z(je), { level: re, siblings: de }), Y.has(Z(je)) || xe(W.get(Z(je)) ?? [], re + 1);
    };
    return xe(ne, 0), { view: ve, meta: Ee, children: W, byId: P };
  }, ge = (L, P, W) => {
    let ne = L, te = 0;
    for (; ne !== null && te++ < 100; ) {
      if (ne === P)
        return !0;
      const ve = W.get(ne);
      ne = ve ? pe(ve) : null;
    }
    return !1;
  }, R = (L, P, W, ne) => {
    var te, ve, Ee, xe;
    pe(L) !== P && ((xe = (Ee = (ve = (te = L[G]) == null ? void 0 : te.edit) == null ? void 0 : ve.call(te, P)) == null ? void 0 : Ee.then) == null || xe.call(Ee, () => we())), j(L, W, ne);
  };
  o.innerHTML = `<table class="bd-grid ${d ? "readonly " : ""}${e.getName() ?? ""}">
        <thead><tr class="bd-grid-head"></tr></thead><tbody></tbody>
    </table>`;
  const T = o.querySelector("thead tr"), V = o.querySelector("thead"), C = o.querySelector("tbody"), N = () => {
    if (O) {
      const L = document.createElement("th");
      L.className = "reorder", T.append(L);
    }
    if (a) {
      const L = document.createElement("th");
      L.textContent = "Actions", T.append(L);
    }
    for (const L of ["_blitzID", ...E]) {
      const P = document.createElement("th");
      P.textContent = v(L), P.dataset.col = L, P.onclick = () => {
        D !== L ? (D = L, _ = !0) : _ ? _ = !1 : (D = null, _ = !0), we();
      }, T.append(P);
    }
    if (l && !a && T.append(document.createElement("th")), c) {
      const L = document.createElement("tr");
      L.className = "bd-grid-search", O && L.append(document.createElement("td")), a && L.append(document.createElement("td"));
      for (const P of ["_blitzID", ...E]) {
        const W = document.createElement("td"), ne = document.createElement("input");
        ne.placeholder = `Search ${v(P)}`, ne.oninput = () => {
          w[P] = ne.value.trim().toLowerCase(), we();
        }, W.append(ne), L.append(W);
      }
      l && !a && L.append(document.createElement("td")), V.append(L);
    }
  }, ie = (L) => {
    var P;
    for (const [W, ne] of Object.entries(w))
      if (ne && !String(((P = L[W]) == null ? void 0 : P.value) ?? "").toLowerCase().includes(ne))
        return !1;
    return !0;
  };
  let ye = new yt();
  const x = (L, P) => {
    ye.release(L), L.innerHTML = "", P && this.getHtmlElement(P, { status: m !== !1, statusScope: ye.for(L) }).then((W) => W && L.append(W)).catch(() => {
    });
  }, U = () => {
    var ne;
    if (!I)
      return;
    const { td: L, attribute: P, handle: W } = I;
    I = null, (ne = W == null ? void 0 : W.destroy) == null || ne.call(W), L.classList.remove("editing"), x(L, P), H && we();
  }, X = async (L, P) => {
    var te;
    if (!P || (I == null ? void 0 : I.td) === L || !L.isConnected)
      return;
    U(), L.classList.add("editing"), L.innerHTML = "";
    const W = { td: L, attribute: P, handle: null };
    I = W;
    const ne = await this.mountEditor(P, L, { onDone: () => U(), context: "grid" });
    I === W ? W.handle = ne : (te = ne == null ? void 0 : ne.destroy) == null || te.call(ne);
  }, ee = () => C.querySelectorAll(".drop-above, .drop-below, .drop-inside").forEach((L) => L.classList.remove("drop-above", "drop-below", "drop-inside")), oe = (L, P, W) => {
    const ne = P.getBoundingClientRect(), te = L.clientY - ne.top;
    return W ? te < ne.height / 3 ? "above" : te > ne.height * 2 / 3 ? "below" : "inside" : te > ne.height / 2 ? "below" : "above";
  }, he = (L, P, W, ne, te, ve) => {
    const Ee = document.createElement("td");
    if (Ee.className = "reorder", !te)
      return Ee;
    const xe = ve ? ve.meta.get(Z(L)).siblings : W, de = ve ? xe.indexOf(L) : ne, re = document.createElement("span");
    re.className = "grip", re.title = "Drag to reorder", re.onmousedown = () => {
      P.draggable = !0, document.addEventListener("mouseup", () => {
        P.draggable = !1;
      }, { once: !0 });
    };
    const je = (He, Ve, Ie, ze) => {
      const Ue = document.createElement("button");
      return Ue.textContent = He, Ue.title = Ve, Ue.disabled = Ie, Ue.onclick = () => j(L, xe.filter((vs) => vs !== L), ze), Ue;
    };
    return Ee.append(
      je("▲", "Move up", de === 0, de - 1),
      re,
      je("▼", "Move down", de === xe.length - 1, de + 1)
    ), P.ondragstart = (He) => {
      var Ve;
      K = L, P.classList.add("dragging"), (Ve = He.dataTransfer) == null || Ve.setData("text/plain", String(L._blitzID.value)), He.dataTransfer && (He.dataTransfer.effectAllowed = "move");
    }, P.ondragend = () => {
      P.draggable = !1, P.classList.remove("dragging"), K = null, ee();
    }, P.ondragover = (He) => {
      !K || K === L || (He.preventDefault(), ee(), P.classList.add(`drop-${oe(He, P, ve)}`));
    }, P.ondrop = (He) => {
      if (!K || K === L)
        return;
      He.preventDefault();
      const Ve = oe(He, P, ve);
      if (!ve) {
        const Ie = W.filter((ze) => ze !== K);
        j(K, Ie, Ie.indexOf(L) + (Ve === "below" ? 1 : 0));
        return;
      }
      if (Ve === "inside") {
        if (ge(Z(L), Z(K), ve.byId))
          return;
        const Ie = (ve.children.get(Z(L)) ?? []).filter((ze) => ze !== K);
        Y.delete(Z(L)), R(K, Z(L), Ie, 0);
      } else {
        const Ie = pe(L);
        if (Ie !== null && ge(Ie, Z(K), ve.byId))
          return;
        const ze = ve.meta.get(Z(L)).siblings.filter((Ue) => Ue !== K);
        R(K, Ie, ze, ze.indexOf(L) + (Ve === "below" ? 1 : 0));
      }
    }, Ee;
  }, we = () => {
    if (I) {
      H = !0;
      return;
    }
    H = !1, T.querySelectorAll("th[data-col]").forEach((te) => {
      te.dataset.col === D ? te.dataset.sort = _ ? "asc" : "desc" : delete te.dataset.sort;
    });
    let L = b.filter(ie);
    const P = Object.values(w).some(Boolean) || typeof q == "function";
    typeof q == "function" && (L = L.filter(q));
    let W = null;
    D ? L.sort(
      (te, ve) => {
        var Ee, xe;
        return String(((Ee = te[D]) == null ? void 0 : Ee.value) ?? "").localeCompare(String(((xe = ve[D]) == null ? void 0 : xe.value) ?? ""), void 0, { numeric: !0 }) * (_ ? 1 : -1);
      }
    ) : typeof $ == "function" ? L.sort($) : B && !P ? (W = fe(L), L = W.view) : O && L.sort((te, ve) => J(ve) - J(te));
    const ne = O && !D && typeof $ != "function" && (!B || !!W);
    if (ye.destroy(), ye = new yt(), C.innerHTML = "", L.forEach((te, ve) => {
      const Ee = document.createElement("tr");
      if (O && Ee.append(he(te, Ee, L, ve, ne, W)), a) {
        const de = document.createElement("td");
        if (de.className = "grid-actions", l) {
          const re = document.createElement("button");
          re.textContent = "✕", re.title = "delete", re.onclick = () => confirm(`delete ${te._blitzID.value}?`) && te.delete(), de.append(re);
        }
        if (a.edit) {
          const re = document.createElement("button");
          re.textContent = "✎", re.title = "edit", re.onclick = () => a.edit(te), de.append(re);
        }
        if (a.history) {
          const re = document.createElement("button");
          re.textContent = "🕘", re.title = "history", re.onclick = () => Qt(
            te,
            typeof a.history == "object" ? a.history : {}
          ), de.append(re);
        }
        Ee.append(de);
      }
      const xe = document.createElement("td");
      if (xe.className = "id", xe.textContent = te._blitzID.value, p && (xe.onclick = () => p(te)), W) {
        const de = W.meta.get(Z(te)).level;
        if (xe.style.paddingLeft = `${8 + de * 16}px`, W.children.has(Z(te))) {
          const re = document.createElement("button");
          re.className = "tree-toggle", re.textContent = Y.has(Z(te)) ? "▸" : "▾", re.title = Y.has(Z(te)) ? "Expand" : "Collapse", re.onclick = (je) => {
            je.stopPropagation(), Y.has(Z(te)) ? Y.delete(Z(te)) : Y.add(Z(te)), we();
          }, xe.prepend(re);
        }
      }
      Ee.append(xe);
      for (const de of E) {
        const re = document.createElement("td");
        d || (re.onclick = () => X(re, te[de])), x(re, te[de]), Ee.append(re);
      }
      if (l && !a) {
        const de = document.createElement("td");
        de.className = "kill", de.textContent = "×", de.onclick = () => confirm(`delete ${te._blitzID.value}?`) && te.delete(), Ee.append(de);
      }
      C.append(Ee);
    }), !L.length) {
      const te = E.length + 1 + (l || a ? 1 : 0) + (O ? 1 : 0);
      C.innerHTML = S ? `<tr><td class="empty" colspan="${te}">${u ?? "No results found!"}</td></tr>` : `<tr><td class="loading" colspan="${te}"><div class="spinner"></div></td></tr>`;
    }
  }, A = (L) => {
    var P, W;
    !I || I.td.contains(L.target) || (W = (P = L.target).closest) != null && W.call(P, "[data-bd-portal]") || U();
  }, Q = (L) => {
    var P, W;
    L.key === "Escape" && ((W = (P = L.target) == null ? void 0 : P.closest) != null && W.call(P, "[data-bd-portal]") || document.querySelector('[data-bd-portal][role="dialog"]') || U());
  };
  d || (document.addEventListener("mousedown", A), document.addEventListener("keydown", Q)), N(), we();
  let se = !1;
  const ae = fs(e, n, (L, P) => {
    b = L, S = P, O && !se && P && L.length && L.every((W) => {
      var ne;
      return ((ne = W[M]) == null ? void 0 : ne.value) === void 0;
    }) && (se = !0, console.warn(`mountGrid: model '${e.getName()}' has hassort but its rows carry no ${M} — reorder writes will not work. Is the attribute selected by the list query?`)), we();
  });
  return {
    destroy: () => {
      U(), ye.destroy(), d || (document.removeEventListener("mousedown", A), document.removeEventListener("keydown", Q)), ae(), o.innerHTML = "";
    },
    getObjects: () => b,
    updateFilter: (L) => {
      q = L, we();
    },
    updateSort: (L) => {
      $ = L, D = null, we();
    }
  };
}
function Gt(e, t, n, s) {
  var F;
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
  const f = o.querySelector(".bd-filtersform"), m = e.getAttributesDetails() ?? {}, h = ((F = e.getSystemAttributesDetails) == null ? void 0 : F.call(e)) ?? {}, E = (M) => m[M] ?? (r != null && r.includes(M) ? M === "project_fk" ? { type: "_Project", label: "Project" } : h[M] : void 0), g = l ?? (ue == null ? void 0 : ue.defaultLanguage) ?? "en", v = (M) => {
    if (c != null && c[M])
      return c[M];
    const O = E(M);
    return Je(O == null ? void 0 : O["label-int"], O == null ? void 0 : O.label, g, M);
  }, b = (i ?? Object.keys(m)).filter((M) => !!m[M] && typeof m[M].type == "string" && ["varchar", "text"].includes(m[M].type));
  let S = null;
  if (b.length > 0) {
    if (S = document.createElement("input"), S.className = "search-input", S.type = "text", S.placeholder = p ?? "Search " + b.map((M) => v(M)).join(", ") + "...", d) {
      const M = Ft(() => w());
      S.oninput = () => M();
    }
    f.append(S);
  }
  const q = (qe ?? ke.ui).kernel, $ = {};
  let D = !1, _ = [];
  const H = (M) => {
    D ? M() : _.push(M);
  }, I = (r ?? Object.keys(m)).filter((M) => !!E(M) && !b.includes(M));
  for (const M of I) {
    const O = u ? v(M) : void 0, J = jn($, M, E(M), e, d ? () => w() : void 0, {
      className: M,
      label: O,
      placeholder: O ? `${O}...` : v(M),
      ...a ? { sortDirection: a } : {}
    });
    if (!q.isFilterable(J))
      continue;
    const K = document.createElement("div");
    f.append(K), q.mount(J, K, "filter").then(H).catch((j) => console.error(`"${M}" Filter error:`, (j == null ? void 0 : j.stack) ?? (j == null ? void 0 : j.message)));
  }
  if (!d) {
    const M = document.createElement("button");
    M.className = "reset-btn", M.innerText = (y == null ? void 0 : y.reset) ?? "Reset", M.onclick = () => {
      S && (S.value = "");
      for (const K of Object.keys($))
        delete $[K];
      n(null);
    };
    const O = document.createElement("button");
    O.className = "apply-btn", O.innerText = (y == null ? void 0 : y.apply) ?? "Apply", O.onclick = () => {
      w();
    };
    const J = document.createElement("div");
    J.className = "actions", J.append(M, O), f.append(J);
  }
  const w = () => {
    const M = S != null && S.value ? (J) => b.some(
      (K) => typeof J[K].value == "string" && J[K].value.match(new RegExp(qt(S.value), "gi"))
    ) : null, O = Nn($);
    n(
      M && O ? (J) => M(J) && O(J) : M ?? O ?? null
    );
  };
  return { destroy: () => {
    D = !0;
    for (const M of _)
      M();
    _ = [], o.innerHTML = "";
  } };
}
function ms(e, t, n) {
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
  const c = r.querySelector(".close-btn"), a = r.querySelector(".form"), { destroy: l } = Gt(
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
function ei(e, t, n, s, o) {
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
  const E = d ?? "Sort by", g = u ?? [
    { attribute: "_blitzstamp", label: "Newest", order: "desc" },
    { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
  ];
  i.innerHTML = `<div class="bd-searchbox">
        <div class="form"></div>
        ${s ? `
            <select class="sort-select">
                <option value="" disabled>${E}</option>
                ${g.map((I, w) => `
                    <option value="${I.attribute + "--" + I.order}" ${w === 0 ? "selected" : ""}>
                        ${I.label}
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
  const v = i.querySelector(".form"), b = i.querySelector(".sort-select"), S = i.querySelector(".filters-btn"), q = i.querySelector(".clear-btn");
  let $;
  const D = () => {
    $ = Gt(
      e,
      v,
      (I) => {
        m = I, _();
      },
      {
        ...f,
        searchAttributes: p,
        filterAttributes: y ?? [],
        inlineMode: !0
      }
    );
  };
  D(), S && (S.onclick = () => {
    ms(
      e,
      (I) => {
        h = I, _();
      },
      {
        ...f,
        searchAttributes: [],
        ...c
      }
    );
  }), q.onclick = () => {
    m = null, h = null, $ && $.destroy(), D(), _();
  };
  const _ = () => {
    q.style.display = m || h ? "flex" : "none", n(
      m && h ? (I) => m(I) && h(I) : m ?? h ?? null
    );
  };
  if (b && s) {
    const I = e.getAttributesDetails() ?? {};
    b.onchange = () => {
      var J;
      const k = b.value.split("--"), F = k[0], M = k[1], O = ((J = I[F]) == null ? void 0 : J.type) ?? "int";
      s(
        b.value ? (K, j) => {
          var G, B, Y, Z;
          if (!F || !M)
            return 0;
          if (["int", "tinyint", "double", "float", "percentage"].includes(O)) {
            const pe = (G = K[F]) != null && G.value ? K[F].value : 0, fe = (B = j[F]) != null && B.value ? j[F].value : 0;
            return M === "asc" ? pe - fe : fe - pe;
          }
          if (["varchar", "text"].includes(O)) {
            const pe = ((Y = K[F]) == null ? void 0 : Y.value) || "", fe = ((Z = j[F]) == null ? void 0 : Z.value) || "";
            return !pe && fe ? 1 : !fe && pe ? -1 : M === "asc" ? fe.localeCompare(pe, void 0, { sensitivity: "base" }) : pe.localeCompare(fe, void 0, { sensitivity: "base" });
          }
          return 0;
        } : null
      );
    };
    const w = g[0];
    w && (w.attribute !== "_blitzstamp" || w.order !== "desc") && b.onchange(null);
  }
  return { destroy: () => {
    $ && $.destroy(), i.innerHTML = "";
  } };
}
function xn(e, t, n) {
  if (e != null && e.readOnly)
    return "inline";
  const s = e == null ? void 0 : e.presentation, o = (typeof s == "string" ? s : s == null ? void 0 : s[t]) ?? "inline";
  return o !== "auto" ? o : (typeof n == "string" ? n.length : n == null ? 0 : JSON.stringify(n).length) >= (e.modalThreshold ?? 100) ? "modal" : "expandable";
}
async function ti(e, t) {
  var E, g, v, b, S, q, $, D, _;
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
  const l = ((b = (v = (g = (E = e._object) == null ? void 0 : E.model) == null ? void 0 : g.getAttributesDetails) == null ? void 0 : v.call(g)) == null ? void 0 : b[e._name]) ?? {};
  a.querySelector(".title").textContent = n ?? Je(l["label-int"], l.label, ((S = this.settings) == null ? void 0 : S.language) ?? "en", e._name);
  const d = a.querySelector(".editor");
  let u = null, p = null, y = !1;
  const f = () => {
    var H;
    y || (y = !0, p == null || p(), (H = u == null ? void 0 : u.destroy) == null || H.call(u), c.remove(), r == null || r());
  };
  let m;
  const h = () => {
    var F, M, O;
    const H = (F = u == null ? void 0 : u.getDraft) == null ? void 0 : F.call(u), I = e.value, w = (M = t == null ? void 0 : t.config) == null ? void 0 : M.draft, k = typeof H == "string" && (u != null && u.isPending ? u.isPending() || w !== void 0 && H === w : H !== m && H !== (typeof I == "string" ? I : I == null ? "" : void 0));
    k && !confirm("Discard unsaved changes?") || (k && ((O = u == null ? void 0 : u.cancelPending) == null || O.call(u)), f());
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
  }), ((q = t == null ? void 0 : t.config) == null ? void 0 : q.draft) === void 0 && (m = ($ = u == null ? void 0 : u.getDraft) == null ? void 0 : $.call(u)), (_ = (D = d.querySelector("textarea, input")) == null ? void 0 : D.focus) == null || _.call(D), { destroy: f };
}
const ni = `<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
</svg>`;
async function Ln(e, t, n, s) {
  let o = await n(), i = null, r = !1;
  const c = document.createElement("div");
  c.className = "bd-editor-expand", c.title = s.expandTitle ?? "Expand", c.setAttribute("role", "button"), c.setAttribute("aria-label", s.expandTitle ?? "Expand"), c.tabIndex = 0, c.onkeydown = (d) => {
    d.key !== "Enter" && d.key !== " " || (d.preventDefault(), c.click());
  }, c.innerHTML = s.expandIcon ?? ni;
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
var ke, ue, qe;
class en {
  /**
   * Constructor
   */
  constructor(t, n) {
    /**
     * The DatatypeUI kernel: one registry of type modules, one config
     * cascade, one mount. Every mount path routes through it.
     */
    le(this, "registry", new Cs((t) => this.warn(t)));
    le(this, "uiConfig", new xs());
    le(this, "kernel", new js({
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
    le(this, "debug", !1);
    /** Live handle to the mounted inspector tab, or null when it's off. */
    le(this, "txiHandle", null);
    /** Desired on/off state — the constructor default, then any live toggle. */
    le(this, "txiWanted", !1);
    /** True while the inspector chunk import is in flight (guards overlap). */
    le(this, "txiLoading", !1);
    /** Tab options captured from the `transactionInspector` constructor value. */
    le(this, "transactionInspectorConfig", {});
    /**
     * Inputs
     */
    le(this, "inputs", {
      text: Ae,
      textarea: Ke,
      number: Fe,
      phone: ht(() => import("./index-1e0810e3.js")),
      boolean: Rt,
      date: it,
      html: ht(() => import("./index-0f2cca87.js")),
      image: St,
      video: Wt,
      file: Jt,
      pdf: qn,
      location: Zt,
      "text-many": Vt,
      tag: Lt,
      i18n: Bt
    });
    /**
     * The on-demand editors by name, each with `preload()`: a page showing a
     * column's view before any edit (stars in a list) loads its chunk first.
     */
    le(this, "onDemand", {});
    /**
     * Pickers
     */
    le(this, "pickers", {
      object: at,
      enum: ot,
      projectUsers: jo,
      list: No
    });
    /**
     * Attribute editors: the built-in EDIT surface per type, seeded into the
     * kernel as each module's `editor`. They shrink under a preset policy and
     * evaporate one by one as type modules take over their binding.
     */
    le(this, "editors", vn(fr));
    /**
     * Many attribute editors
     */
    le(this, "manyEditors", vn(mr));
    /**
     * Extensions methods
     */
    le(this, "getHTML", os);
    le(this, "getHtmlElement", Xt);
    // Typed as any until the pinned core exposes the destroy-handle signature
    le(this, "mountHtmlElement", Ur);
    le(this, "mountAddForm", is);
    le(this, "mountAddFormModal", Kr);
    le(this, "mountList", Qr);
    le(this, "mountGrid", Gr);
    le(this, "mountFiltersForm", Gt);
    le(this, "mountFiltersModal", ms);
    le(this, "mountSearchBox", ei);
    le(this, "mountObjectView", us);
    le(this, "mountObjectViewModal", ps);
    le(this, "mountObjectHistory", kt);
    le(this, "mountObjectHistoryModal", Qt);
    le(this, "mountEditorInModal", ti);
    var c;
    ke = t;
    const s = typeof n == "string" ? { preset: n } : Array.isArray(n) ? { use: n } : n ?? {};
    ue = s, qe = this, co(s.openStreetMap);
    const o = s.preset ?? "default";
    if (o === "readonly")
      this.editors = {}, this.manyEditors = {};
    else if (o === "basic")
      for (const a of ur)
        this.editors[a] = Kn;
    for (const a of _o)
      this.registry.register(this.withCanonicalView(_n(a.type), a));
    for (const [a, l] of Object.entries(this.editors))
      this.registry.mergeBuiltin(a, { editor: lt(l) });
    const i = { mtm: "mtm", enum: "enum[]", image: "image[]", varchar: "varchar[]", text: "text[]", tag: "tag[]" };
    for (const [a, l] of Object.entries(this.manyEditors))
      this.registry.mergeBuiltin(i[a] ?? a, { editor: lt(l) });
    for (const [a, l] of Object.entries(Dr))
      this.registry.mergeBuiltin(a, { view: ct(l) });
    if (o !== "readonly")
      for (const [a, l] of Object.entries(Zn))
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
    return this.defineModuleUI(t, n, () => sn(n), !0);
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
    const o = `${t}.${n}`, { shell: i, preload: r } = this.buildRemote(o, s, () => sn(s), (c, a, l) => {
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
    typeof document > "u" || (this.txiWanted && !this.txiHandle && !this.txiLoading ? (this.txiLoading = !0, Promise.resolve().then(() => ai).then(({ default: t }) => {
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
      if ((s.empty ?? Ss)(o.value))
        return "";
      const c = In((p = o._object) == null ? void 0 : p.model, o._name), a = vt(o._name, c.type ?? o._type), l = this.uiConfig.resolve(a, (m = (f = (y = o._object) == null ? void 0 : y.model) == null ? void 0 : f.getName) == null ? void 0 : m.call(f), o._name, s.defaultConfig, void 0), d = n({ value: o.value, attributeDetails: c, config: l, settings: this.uiConfig.settings });
      if (!d)
        return "";
      const u = (h) => si(h, `${o._name} bd-${t}`, i == null ? void 0 : i.labelHtml);
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
    return Rr(t, (n) => this.resolveHydrator(n), (n) => this.warn(n));
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
    return zr(o, t) || this.warn(`${t._name}: view hydrates but attribute has no resolvable object — shell stays static`), o.outerHTML;
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
    return typeof s == "object" && s.hydrate && ts(o, (i) => s.hydrate(i) ?? void 0, t), o;
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
      const d = i[0], u = this.kernel.resolveConfig(tt(d, { ...s, ...s == null ? void 0 : s.config }), s == null ? void 0 : s.use), p = xn(u, (s == null ? void 0 : s.context) ?? "form", d.value);
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
        ), { getDraft: h, isPending: E, cancelPending: g } = m;
        return { destroy: m, ...h && { getDraft: h }, ...E && { isPending: E }, ...g && { cancelPending: g } };
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
        const h = s != null && s.withLabels || ["boolean", "datetime", "date", "image", "video", "file"].includes(f._type) ? p(f._name) : void 0, E = h ? `${h}...` : p(f._name), g = {
          className: f._name,
          label: h,
          placeholder: E,
          ...s != null && s.defaultDialCode ? { defaultDialCode: s.defaultDialCode } : {},
          ...s != null && s.googleMapsApiKey ? { apiKey: s.googleMapsApiKey, initialExpand: s == null ? void 0 : s.locationFieldsExpand } : {},
          ...s != null && s.listEmptyMsg ? { emptyMsg: s.listEmptyMsg } : {},
          ...s == null ? void 0 : s.config
        }, v = async () => {
          const D = await this.kernel.mount(tt(f, g), m, "write"), { getDraft: _, isPending: H, cancelPending: I } = D;
          return { destroy: D, ..._ && { getDraft: _ }, ...H && { isPending: H }, ...I && { cancelPending: I } };
        }, b = async () => {
          let D = await v();
          return s != null && s.live && (D = this.withLiveRemount(f, m, v, D)), D;
        }, S = this.kernel.resolveConfig(tt(f, g)), q = xn(S, "form", f.value);
        let $;
        try {
          $ = q === "inline" ? await b() : await Ln.call(this, f, m, b, {
            config: s == null ? void 0 : s.config,
            expandIcon: S.expandIcon,
            expandTitle: S.expandTitle
          });
        } catch (D) {
          console.error(`"${f._name}" Editor Error:`, D.stack ?? D.message);
        }
        $ && typeof $.destroy == "function" && y.push($.destroy);
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
le(en, "VERSION", "2.21.7");
function si(e, t, n) {
  const s = document.createElement("div");
  s.innerHTML = e.trim();
  const o = s.childNodes.length === 1 ? s.firstElementChild : null;
  if (o) {
    const i = o.getAttribute("class");
    return o.setAttribute("class", i ? `${t} ${i}` : t), n && o.insertAdjacentHTML("afterbegin", n), o.outerHTML;
  }
  return `<div class="${t}">${n ?? ""}${e}</div>`;
}
class oi extends en {
}
function kn(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function tn(e, t = "") {
  const n = document.activeElement, s = document.createElement("div");
  s.className = "bd-lightbox", s.setAttribute("data-bd-portal", ""), s.setAttribute("role", "dialog"), s.setAttribute("aria-modal", "true"), t && s.setAttribute("aria-label", t), s.innerHTML = `
        <div class="bd-lightbox__inner">
            <img src="${kn(e)}" alt="${kn(t)}">
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
function ys(e = document, t = "[data-lightbox]", n = {}) {
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
    l && (r.preventDefault(), tn(l, o(a)));
  };
  return e.addEventListener("click", i), () => e.removeEventListener("click", i);
}
const ri = {
  open: tn,
  attach: ys
};
function hs(e, t = {}) {
  var pe, fe, ge;
  const n = typeof e == "string" ? document.querySelector(e) : e;
  if (!n)
    throw new Error("mountTransactionInspector: container not found");
  const s = n, o = t.queue ?? pt.queue, i = t.confirmDrop !== !1, r = t.emptyMessage ?? "No unresolved transactions!", c = typeof ((pe = o == null ? void 0 : o.failedHandler) == null ? void 0 : pe.drop) == "function", a = typeof ((fe = o == null ? void 0 : o.conflictHandler) == null ? void 0 : fe.resolve) == "function", l = typeof ((ge = o == null ? void 0 : o.conflictHandler) == null ? void 0 : ge.prompt) == "function";
  s.classList.add("bd-txi");
  let d = {}, u = null, p = null, y = !0, f = null, m = !1, h = !1;
  const E = /* @__PURE__ */ new Map(), g = [z.Conflict, z.Failed, z.Pending, z.Completed], v = (R) => {
    const T = g.indexOf(R);
    return T === -1 ? 99 : T;
  }, b = (R) => R[0].id, S = (R) => R.find((T) => T.message !== void 0) ?? null, q = (R) => Object.keys(R.transaction.data ?? {})[0] ?? null, $ = (R) => {
    if (R === void 0)
      return "—";
    if (typeof R == "object")
      try {
        return JSON.stringify(R);
      } catch {
        return String(R);
      }
    return String(R);
  }, D = (R) => {
    try {
      return new Date(R).toLocaleString();
    } catch {
      return String(R);
    }
  };
  function _(R) {
    const T = /* @__PURE__ */ new Map();
    for (const V of R) {
      const C = T.get(V.status) ?? [];
      C.push(V), T.set(V.status, C);
    }
    return [...T.values()];
  }
  async function H() {
    if (h)
      return;
    y = !0, f = null, B();
    let R = {};
    try {
      R = o != null && o.failedHandler ? await o.failedHandler.getAll() : {};
    } catch (C) {
      f = C.message;
    }
    d = {}, E.clear();
    for (const C of Object.keys(R)) {
      const N = [];
      for (const ie of R[C])
        for (const ye of _(ie))
          ye[0] && (N.push(ye), E.set(b(ye), ye));
      d[C] = N;
    }
    const T = Object.keys(d);
    (!u || !d[u]) && (u = T[0] ?? null);
    const V = u ? d[u] : [];
    (!p || !V.some((C) => b(C) === p)) && (p = V[0] ? b(V[0]) : null), y = !1, B();
  }
  async function I(R, T) {
    var ie, ye, x, U;
    if (m)
      return;
    const V = E.get(R);
    if (!(V != null && V.length) || T === "drop" && i && !confirm(`Drop this transaction from the queue?
The local change stays in place — client and server may diverge.`))
      return;
    m = !0, B();
    const C = o == null ? void 0 : o.failedHandler, N = o == null ? void 0 : o.conflictHandler;
    try {
      if (T === "retry")
        await (C == null ? void 0 : C.retry(V));
      else if (T === "revert")
        await (C == null ? void 0 : C.revert(V));
      else if (T === "drop")
        await ((ie = C == null ? void 0 : C.drop) == null ? void 0 : ie.call(C, V));
      else if (T === "execute") {
        const X = S(V);
        X && await ((ye = N == null ? void 0 : N.resolve) == null ? void 0 : ye.call(N, X, !0));
      } else if (T === "take-server") {
        const X = S(V);
        X && await ((x = N == null ? void 0 : N.resolve) == null ? void 0 : x.call(N, X, !1));
      } else if (T === "resolve-prompt") {
        const X = S(V);
        X && await ((U = N == null ? void 0 : N.prompt) == null ? void 0 : U.call(N, X));
      }
    } catch (X) {
      alert("Action failed: " + X.message);
    }
    m = !1, await H();
  }
  function w() {
    const R = (u ? d[u] : []).slice().sort((T, V) => v(T[0].status) - v(V[0].status) || T[0].createdAt - V[0].createdAt);
    return R.length ? ce`<ul class="bd-txi-rows">${me(R.map((T) => {
      const V = T[0], C = q(V), N = C ? `${V.transaction.blitzID} · ${C}` : V.transaction.blitzID, ie = T.length > 1 ? ce`<span class="bd-txi-chain">×${T.length}</span>` : "";
      return ce`<li>
                <button class="bd-txi-row ${me(b(T) === p ? "is-active" : "")}" data-select="${b(T)}">
                    <span class="bd-txi-dot bd-txi-${V.status}"></span>
                    <span class="bd-txi-row-main">
                        <span class="bd-txi-row-top">
                            <span class="bd-txi-action">${V.transaction.action}</span>
                            <span class="bd-txi-model">${V.transaction.model}</span>${me(ie)}
                        </span>
                        <span class="bd-txi-row-sub">${N}</span>
                    </span>
                </button>
            </li>`;
    }).join(""))}</ul>` : ce`<p class="bd-txi-empty">${r}</p>`;
  }
  const k = 280;
  function F(R) {
    var x;
    const T = q(R);
    if (R.transaction.action !== "edit" || !T)
      return "";
    const V = ((x = R.transaction.data) == null ? void 0 : x[T]) ?? {}, C = $(V.prev), N = $(V.new), ie = C.length + N.length > k, ye = ce`<div class="bd-txi-diff ${me(ie ? "is-large" : "")}">
                <span class="bd-txi-prev">${C}</span>
                <span class="bd-txi-arrow">→</span>
                <span class="bd-txi-new">${N}</span>
            </div>`;
    return ie ? ce`<div class="bd-txi-field"><label>${T}</label>
            <details class="bd-txi-fold">
                <summary><span class="bd-txi-fold-preview">${N.slice(0, 120)}</span><span class="bd-txi-fold-meta">${String(C.length)} → ${String(N.length)} chars</span></summary>
                ${me(ye)}
            </details></div>` : ce`<div class="bd-txi-field"><label>${T}</label>${me(ye)}</div>`;
  }
  function M(R) {
    var T;
    return (T = R.dataHistory) != null && T.length ? ce`<div class="bd-txi-field"><label>History</label><ul class="bd-txi-history">${me(R.dataHistory.map(
      (V) => ce`<li><span class="bd-txi-htype">${V.type}</span><span class="bd-txi-htime">${D(V.timestamp)}</span><code>${$(V.data)}</code></li>`
    ).join(""))}</ul></div>` : "";
  }
  function O(R) {
    const T = R[0].status, V = [];
    if (T === z.Conflict) {
      const C = S(R) ? "" : ' disabled title="Chained conflict — cannot be resolved directly"';
      a ? (V.push(`<button class="bd-txi-btn is-primary" data-act="execute"${C}>Execute</button>`), V.push(`<button class="bd-txi-btn" data-act="take-server"${C}>Revert to server</button>`)) : l && V.push(`<button class="bd-txi-btn is-primary" data-act="resolve-prompt"${C}>Resolve…</button>`);
    } else
      T === z.Failed && (V.push('<button class="bd-txi-btn is-primary" data-act="retry">Retry</button>'), V.push('<button class="bd-txi-btn" data-act="revert">Revert</button>'));
    return ce`<div class="bd-txi-actions">${me(V.join(""))}</div>`;
  }
  function J() {
    if (!p)
      return '<div class="bd-txi-detail-empty">Select a transaction</div>';
    const R = E.get(p);
    if (!(R != null && R.length))
      return '<div class="bd-txi-detail-empty">Select a transaction</div>';
    const T = R[0], V = T.status === z.Pending, C = V ? '<div class="bd-txi-pending-note">In-flight — the worker may be delivering this. Actions are disabled to avoid racing it.</div>' : O(R);
    return ce`<div class="bd-txi-card">
            ${me(c && !V ? '<button class="bd-txi-drop" data-act="drop" title="Drop from queue">×</button>' : "")}
            <div class="bd-txi-card-head">
                <span class="bd-txi-status bd-txi-${T.status}">${T.status}</span>
                <span class="bd-txi-action">${T.transaction.action}</span>
                <span class="bd-txi-model">${T.transaction.model}</span>
            </div>
            <div class="bd-txi-field"><label>Object</label><code>${T.transaction.blitzID}</code></div>
            ${me(F(T))}
            ${me(K(R))}
            <div class="bd-txi-meta">
                <span><label>Server</label>${T.url}</span>
                <span><label>Queued</label>${D(T.createdAt)}</span>
                <span><label>Attempts</label>${T.attempts} (priority ${T.priority})</span>
                <span><label>Hash</label><code>${T.transaction.hash}</code></span>
            </div>
            ${me(M(T))}
            ${me(C)}
            ${me(j(R))}
        </div>`;
  }
  function K(R) {
    const T = R.find((C) => C.message !== void 0);
    if (T)
      return ce`<div class="bd-txi-field"><label>Server response</label><div class="bd-txi-message">${T.message}</div></div>`;
    const V = R[0].status;
    return V !== z.Failed && V !== z.Conflict ? "" : ce`<div class="bd-txi-field"><label>Server response</label><div class="bd-txi-message is-empty">No server response recorded for this transaction.</div></div>`;
  }
  function j(R) {
    const T = R.length > 1, V = T ? R.map(
      (C, N) => ce`<details class="bd-txi-raw-job"><summary>Job ${String(N + 1)} · ${C.status} · ${D(C.createdAt)}</summary><pre>${JSON.stringify(C, null, 2)}</pre></details>`
    ).join("") : ce`<pre>${JSON.stringify(R[0], null, 2)}</pre>`;
    return ce`<details class="bd-txi-raw">
            <summary>Raw JSON${me(T ? ce` <span class="bd-txi-chain-note">(${String(R.length)} chained jobs on this object)</span>` : "")}</summary>
            <button class="bd-txi-copy" data-copy>Copy</button>
            ${me(V)}
        </details>`;
  }
  function G() {
    const R = Object.keys(d);
    return R.length < 2 ? "" : ce`<select class="bd-txi-server">${me(R.map(
      (T) => ce`<option value="${T}" ${me(T === u ? "selected" : "")}>${T}</option>`
    ).join(""))}</select>`;
  }
  function B() {
    if (h)
      return;
    s.classList.toggle("is-busy", m);
    const R = y ? '<div class="bd-txi-spinner"></div>' : f ? ce`<p class="bd-txi-error">${f}</p>` : w();
    s.innerHTML = ce`
            <div class="bd-txi-banner">
                <h2>Transactions</h2>
                <div class="bd-txi-tools">${me(G())}<button class="bd-txi-refresh" title="Refresh">⟳</button></div>
            </div>
            <div class="bd-txi-body">
                <div class="bd-txi-list">${me(R)}</div>
                <div class="bd-txi-detail">${me(y || f ? "" : J())}</div>
            </div>`;
  }
  function Y(R) {
    var N;
    const T = R.target;
    if (T.closest(".bd-txi-refresh")) {
      H();
      return;
    }
    if (T.closest("[data-copy]")) {
      R.preventDefault(), p && ((N = navigator.clipboard) == null || N.writeText(JSON.stringify(E.get(p), null, 2)));
      return;
    }
    const V = T.closest("[data-act]");
    if (V && !V.hasAttribute("disabled")) {
      p && I(p, V.dataset.act ?? "");
      return;
    }
    const C = T.closest("[data-select]");
    C && (p = C.dataset.select ?? null, B());
  }
  function Z(R) {
    const T = R.target.closest(".bd-txi-server");
    T && (u = T.value, p = null, B());
  }
  return s.addEventListener("click", Y), s.addEventListener("change", Z), H(), {
    refresh: () => {
      H();
    },
    destroy: () => {
      h = !0, s.removeEventListener("click", Y), s.removeEventListener("change", Z), s.classList.remove("bd-txi", "is-busy"), s.innerHTML = "";
    }
  };
}
const ii = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>';
function gs(e = {}) {
  const { label: t, right: n, ...s } = e, o = document.createElement("div");
  o.className = "bd-txi-tab", n !== void 0 && (o.style.right = `${n}px`), o.innerHTML = ii, o.append(t ?? "Transactions");
  const i = document.createElement("span");
  i.className = "bd-txi-tab-badge", i.style.display = "none", o.append(i), document.body.append(o);
  async function r() {
    const m = s.queue ?? pt.queue;
    if (typeof (m == null ? void 0 : m.getJobs) == "function")
      try {
        const E = (await m.getJobs() ?? []).filter((g) => g.status === z.Conflict || g.status === z.Failed).length;
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
    m.className = "bd-txi-panel", m.onclick = (g) => g.stopPropagation();
    const h = document.createElement("button");
    h.className = "bd-txi-panel-close", h.innerHTML = "&times;";
    const E = document.createElement("div");
    E.className = "bd-txi-panel-body", m.append(h, E), d.append(m), document.body.append(d), u = hs(E, s), d.onclick = () => f(), h.onclick = () => f(), p = et(d, {
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
const ai = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gs
}, Symbol.toStringTag, { value: "Module" })), Mn = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  width: Math.abs(e.x - t.x),
  height: Math.abs(e.y - t.y)
}), ut = (e) => Math.min(1, Math.max(0, e));
function li(e, t) {
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
const ci = (e, t, n) => ({
  url: e,
  page: t,
  bbox: { x: n.x, y: n.y, width: n.width, height: n.height }
});
async function di(e, t) {
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
const ui = /* @__PURE__ */ new Set(["varchar", "text", "markdown"]);
function pi(e) {
  return Object.entries(e ?? {}).filter(([t, n]) => !t.startsWith("_") && !t.startsWith("@") && typeof (n == null ? void 0 : n.type) == "string" && ui.has(n.type)).map(([t, n]) => ({
    attribute: t,
    ...typeof n.label == "string" ? { label: n.label } : {}
  }));
}
const Tn = 1.25, fi = 0.25, mi = 8, An = 4;
async function yi(e, t) {
  var T, V;
  if (!(e instanceof HTMLElement))
    throw new Error("mountPdfRegionEditor: host element required");
  if (!(t != null && t.url))
    throw new Error("mountPdfRegionEditor: options.url required");
  const n = t.object, s = t.targetFields ?? pi(((V = (T = n == null ? void 0 : n.model) == null ? void 0 : T.getAttributesDetails) == null ? void 0 : V.call(T)) ?? {}), o = Te(e, "bd-pdfregion");
  e.innerHTML = ce`
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
            <div class="bd-pdfregion-save" ${me(s.length ? "" : "hidden")}>
                <select class="bd-pdfregion-target">${me(s.map(
    (C) => ce`<option value="${C.attribute}">${C.label ?? C.attribute}</option>`
  ).join(""))}</select>
                <button type="button" class="bd-pdfregion-savebtn"${me(n ? "" : ' disabled title="No object to save into"')}>Save</button>
            </div>
        </div>`;
  const i = (C) => e.querySelector(C), r = i(".bd-pdfregion-stage"), c = i(".bd-pdfregion-canvaswrap"), a = i(".bd-pdfregion-canvas"), l = i(".bd-pdfregion-overlay"), d = i(".bd-pdfregion-selection"), u = i(".bd-pdfregion-page"), p = i(".bd-pdfregion-zoom"), y = i(".bd-pdfregion-status"), f = i(".bd-pdfregion-badge"), m = i(".bd-pdfregion-text"), h = i(".bd-pdfregion-target"), E = i(".bd-pdfregion-savebtn");
  let g = !1, v = 1, b = 0, S = 1, q = 0, $ = 0, D = 0, _ = null, H = null, I = null, w = null, k = null;
  const F = (C, N = "info") => {
    y.textContent = C, y.classList.toggle("is-error", N === "error");
  }, M = () => {
    w = null, d.hidden = !0;
  }, O = (C, N) => {
    const ie = Mn(C, N);
    d.hidden = !1, d.style.left = `${ie.x}px`, d.style.top = `${ie.y}px`, d.style.width = `${ie.width}px`, d.style.height = `${ie.height}px`;
  };
  async function J() {
    if (g || !H)
      return;
    const C = await H.getPage(v);
    if (g)
      return;
    q = C.getViewport({ scale: 1 }).width;
    const N = C.getViewport({ scale: S });
    $ = N.width, D = N.height;
    const ie = typeof window < "u" && window.devicePixelRatio || 1;
    a.width = Math.floor(N.width * ie), a.height = Math.floor(N.height * ie), a.style.width = `${Math.floor(N.width)}px`, a.style.height = `${Math.floor(N.height)}px`, c.style.width = a.style.width, c.style.height = a.style.height, u.textContent = `Page ${v} of ${b}`, p.textContent = `${Math.round(S * 100)}%`, M();
    const ye = a.getContext("2d");
    if (ye) {
      I == null || I.cancel(), I = C.render({
        canvasContext: ye,
        viewport: N,
        ...ie !== 1 ? { transform: [ie, 0, 0, ie, 0, 0] } : {}
      });
      try {
        await I.promise;
      } catch (x) {
        (x == null ? void 0 : x.name) !== "RenderingCancelledException" && F(`Page render failed: ${(x == null ? void 0 : x.message) ?? x}`, "error");
      }
    }
  }
  const K = (C) => {
    const N = Math.min(Math.max(1, C), b || 1);
    N !== v && (v = N, J());
  }, j = (C) => {
    S = Math.min(Math.max(fi, C), mi), J();
  };
  async function G(C) {
    var ye;
    k == null || k.abort(), k = new AbortController(), F("Extracting text…"), f.hidden = !0;
    const N = ci(t.url, v, C);
    let ie;
    try {
      ie = await di(N, {
        extractorBaseUrl: t.extractorBaseUrl,
        authorizationHeader: t.authorizationHeader,
        signal: k.signal
      });
    } catch {
      return;
    }
    if (!g) {
      if (ie.s !== 1) {
        F(ie.error || "Extraction failed", "error");
        return;
      }
      m.value = ie.text ?? "", f.textContent = ie.source, f.dataset.source = ie.source, f.hidden = !1, F(`Extracted from page ${v} — review and save`), (ye = t.onExtract) == null || ye.call(t, { text: m.value, source: ie.source, page: v, bbox: C });
    }
  }
  const B = (C) => {
    const N = l.getBoundingClientRect();
    return { x: C.clientX - N.left, y: C.clientY - N.top };
  }, Y = (C) => {
    C.button !== 0 || !$ || !D || (C.preventDefault(), w = B(C), O(w, w));
  }, Z = (C) => {
    w && O(w, B(C));
  }, pe = (C) => {
    if (!w)
      return;
    const N = Mn(w, B(C));
    if (w = null, N.width < An || N.height < An) {
      M();
      return;
    }
    G(li(N, { width: $, height: D }));
  };
  l.addEventListener("mousedown", Y), window.addEventListener("mousemove", Z), window.addEventListener("mouseup", pe);
  const fe = (C) => {
    const N = C.target.closest("[data-nav], [data-zoom]");
    N && (N.dataset.nav === "prev" ? K(v - 1) : N.dataset.nav === "next" ? K(v + 1) : N.dataset.zoom === "in" ? j(S * Tn) : N.dataset.zoom === "out" ? j(S / Tn) : N.dataset.zoom === "fit" && q && r.clientWidth && j(r.clientWidth / q));
  };
  i(".bd-pdfregion-toolbar").addEventListener("click", fe);
  const ge = async () => {
    var ie, ye, x;
    const C = h.value, N = ((ie = n == null ? void 0 : n._attributes) == null ? void 0 : ie[C]) ?? ((ye = n == null ? void 0 : n.getAttribute) == null ? void 0 : ye.call(n, C));
    if (typeof (N == null ? void 0 : N.edit) != "function") {
      F(`Attribute '${C}' is not editable on this object`, "error");
      return;
    }
    E.disabled = !0;
    try {
      await N.edit(m.value), F(`Saved to ${C}`), (x = t.onSaved) == null || x.call(t, C, m.value);
    } catch (U) {
      F(`Save failed: ${(U == null ? void 0 : U.message) ?? U}`, "error");
    } finally {
      E.disabled = !n;
    }
  };
  E.addEventListener("click", ge);
  const R = () => {
    var C;
    g || (g = !0, k == null || k.abort(), I == null || I.cancel(), (C = _ == null ? void 0 : _.destroy) == null || C.call(_), l.removeEventListener("mousedown", Y), window.removeEventListener("mousemove", Z), window.removeEventListener("mouseup", pe), e.innerHTML = "", o());
  };
  F("Loading PDF…");
  try {
    const C = await import("./pdf-f4394f77.js");
    t.workerSrc ? C.GlobalWorkerOptions.workerSrc = t.workerSrc : !C.GlobalWorkerOptions.workerSrc && !globalThis.pdfjsWorker && await import("./pdf.worker.min-9015606c.js"), _ = C.getDocument({ url: t.url }), H = await _.promise;
  } catch (C) {
    return g || F(`Failed to open PDF: ${(C == null ? void 0 : C.message) ?? C}`, "error"), { destroy: R };
  }
  return g ? { destroy: R } : (b = H.numPages, F(""), await J(), { destroy: R });
}
const hi = () => import("./BDComments-1999f7d8.js").then((e) => e.f).then((e) => e.default), gi = "2.21.7";
typeof window < "u" && !window.BlitzUIManager && (window.BlitzUIManager = {
  default: en,
  BlitzUIManagerExtended: oi,
  VERSION: gi,
  loadBDComments: hi,
  ImageLightbox: ri,
  openImageLightbox: tn,
  attachImageLightbox: ys,
  TagInput: Lt,
  mountTransactionInspector: hs,
  addInspectorLink: gs,
  mountObjectHistory: kt,
  mountObjectHistoryModal: Qt,
  mountPdfRegionEditor: yi,
  previousValueOf: ds,
  branchOf: cs,
  html: ce,
  raw: me,
  esc: be,
  safeUrl: Pe,
  renderMarkdown: Yn,
  announceEditorDone: _e
}, window.dispatchEvent(new CustomEvent("blitzuimanager:ready")));
export {
  Pe as A,
  ke as B,
  $e as C,
  oi as D,
  ot as E,
  en as F,
  ue as G,
  Nn as H,
  Re as I,
  No as L,
  Fe as N,
  Ke as T,
  gi as V,
  or as Y,
  Go as a,
  vr as b,
  Te as c,
  Ft as d,
  _e as e,
  En as f,
  be as g,
  Lt as h,
  hs as i,
  gs as j,
  kt as k,
  Qt as l,
  De as m,
  yi as n,
  ds as o,
  br as p,
  cs as q,
  Yn as r,
  ri as s,
  Qo as t,
  tn as u,
  ys as v,
  hi as w,
  ce as x,
  Sr as y,
  me as z
};
