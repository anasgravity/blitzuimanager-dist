var Rn = Object.defineProperty;
var Un = (e, t, n) => t in e ? Rn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ee = (e, t, n) => (Un(e, typeof t != "symbol" ? t + "" : t, n), n);
import { JobStatus as D, blitzstampToDate as ct, blitzstampFromDate as Wn, LocalStorageRepository as Kn, TextType as dt, BlitzData as lt } from "@blitzdata.ts/core";
const Jn = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0, mn = (e) => Array.isArray(e) ? e[0] : e, ht = (e, t) => e.endsWith("_fk") ? "fk" : e.endsWith("_mtm") ? "mtm" : mn(t), Jt = ["view", "control", "filter", "editor", "default", "empty"];
class Zn {
  constructor(t) {
    ee(this, "builtins", /* @__PURE__ */ new Map());
    ee(this, "typeOverlays", /* @__PURE__ */ new Map());
    ee(this, "attrOverlays", /* @__PURE__ */ new Map());
    ee(this, "presets", /* @__PURE__ */ new Map());
    ee(this, "bindings", /* @__PURE__ */ new Map());
    this.warn = t;
  }
  /** Register a built-in datatype module (the floor layer). */
  register(t) {
    const { type: n, ...s } = t;
    for (const r of [n].flat())
      Object.assign(this.mapEntry(this.builtins, r), s);
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
    const { type: s, many: r, model: o, name: i, hint: c, use: a, maxLayer: u = 8 } = t, f = { defaultConfig: {}, sources: {} }, l = (p, m, h) => {
      if (!(!p || m > u)) {
        for (const v of Jt) {
          const g = p[v];
          g !== void 0 && (f[v] = g, f.sources[v] = { layer: m, label: h });
        }
        p.defaultConfig && Object.assign(f.defaultConfig, p.defaultConfig);
      }
    }, d = (p, m, h) => {
      const v = this.presets.get(p);
      if (v) {
        const { extends: b, ...w } = v;
        return b && l({ ...this.builtins.get(b), ...this.typeOverlays.get(b) }, m, `${h} (extends '${b}')`), l(w, m + 1, h), !0;
      }
      const g = { ...this.builtins.get(p), ...this.typeOverlays.get(p) };
      return Object.keys(g).length ? (l(g, m + 1, h), !0) : !1;
    };
    l(this.builtins.get(s), 0, "built-in"), r && l(this.builtins.get(`${s}[]`), 0, "built-in (many)"), l(this.typeOverlays.get(s), 1, "defineUI"), r && l(this.typeOverlays.get(`${s}[]`), 1, "defineUI (many)");
    const y = r ? void 0 : this.bindings.get(s);
    if (y && !d(y.preset, 2, y.label ?? `binding '${y.preset}'`) && this.warn(`type '${s}' is bound to '${y.preset}' — not registered, using '${s}' default`), c && !d(c, 4, `preset '${c}'`) && this.warn(`${o ?? "?"}.${i ?? "?"} requests ui '${c}' — not registered, using '${s}' default`), o && i && l(this.attrOverlays.get(`${o}.${i}`), 6, "defineUIFor"), a && (typeof a == "string" ? d(a, 7, `use '${a}'`) || this.warn(`mount requests ui '${a}' — not registered, using '${s}' default`) : typeof a == "function" ? l({ control: a }, 8, "use (control)") : l(a, 8, "use (module)")), n) {
      const p = Jt.filter((m) => f.sources[m]).map((m) => `${m} from ${f.sources[m].label}`);
      n(`${o ?? "?"}.${i ?? s} → ${p.join("; ") || "nothing registered"}`);
    }
    return f;
  }
  mapEntry(t, n) {
    let s = t.get(n);
    return s || (s = {}, t.set(n, s)), s;
  }
}
class Yn {
  constructor() {
    ee(this, "typeConfig", {});
    ee(this, "attributeConfig", {});
    ee(this, "settings", {});
    ee(this, "services", {});
  }
  setConfig(t, n) {
    var s;
    Object.assign((s = this.typeConfig)[t] ?? (s[t] = {}), n);
  }
  setConfigFor(t, n, s) {
    var r, o;
    Object.assign((r = this.attributeConfig)[o = `${t}.${n}`] ?? (r[o] = {}), s);
  }
  resolve(t, n, s, r, o) {
    return {
      ...r,
      ...this.typeConfig[t],
      ...n && s ? this.attributeConfig[`${n}.${s}`] : void 0,
      ...o
    };
  }
}
function Qe(e, t) {
  var r, o, i, c, a, u, f;
  const n = ((c = (i = (o = (r = e._object) == null ? void 0 : r.model) == null ? void 0 : o.getAttributesDetails) == null ? void 0 : i.call(o)) == null ? void 0 : c[e._name]) ?? {}, s = n.type ?? e._type;
  return {
    kind: "live",
    type: ht(e._name, s),
    many: Array.isArray(n.type) && !e._name.endsWith("_mtm"),
    model: (f = (u = (a = e._object) == null ? void 0 : a.model) == null ? void 0 : u.getName) == null ? void 0 : f.call(u),
    name: e._name,
    attribute: e,
    value: e.value,
    set: (l) => e.edit(l),
    add: (l) => {
      var d;
      return (d = e.add) == null ? void 0 : d.call(e, l);
    },
    remove: (l) => {
      var d;
      return (d = e.remove) == null ? void 0 : d.call(e, l);
    },
    // VALUE stream: the object's remoteChange event — patch in place
    subscribe: (l) => {
      const d = e._object;
      if (typeof (d == null ? void 0 : d.addEventListener) != "function")
        return () => {
        };
      const y = (p) => {
        p && !Object.hasOwn(p, e._name) || l(e.value);
      };
      return d.addEventListener("remoteChange", y), () => d.removeEventListener("remoteChange", y);
    },
    // SAVE-STATE stream: pending | saved | failed — distinct from value
    status: (l) => {
      var d;
      return ((d = e.syncStatus) == null ? void 0 : d.call(e, l)) ?? (() => {
      });
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: t
  };
}
function Xn(e, t, n, s, r) {
  var o;
  return {
    kind: "draft",
    type: ht(t, n.type),
    many: Array.isArray(n.type) && !t.endsWith("_mtm"),
    model: (o = s == null ? void 0 : s.getName) == null ? void 0 : o.call(s),
    name: t,
    value: e[t],
    set: (i) => {
      e[t] = i;
    },
    add: (i) => {
      (e[t] ?? (e[t] = [])).push(i);
    },
    remove: (i) => {
      e[t] = (e[t] ?? []).filter((c) => c !== i);
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: r
  };
}
function yn(e, t, n, s, r, o) {
  var i;
  return {
    kind: "query",
    type: ht(t, n.type),
    many: Array.isArray(n.type) && !t.endsWith("_mtm"),
    model: (i = s == null ? void 0 : s.getName) == null ? void 0 : i.call(s),
    name: t,
    value: e[t],
    set: (c) => {
      c ? e[t] = c : delete e[t], r == null || r();
    },
    attributeDetails: n,
    hint: n.ui ?? n.editor,
    mountConfig: o
  };
}
function Zt(e) {
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
function Ze(e, t, n, s) {
  if (typeof (e == null ? void 0 : e[n]) == "string")
    return e[n];
  if (typeof t == "string")
    return t;
  if (t && typeof t == "object") {
    const r = t;
    if (typeof r[n] == "string")
      return r[n];
    if (typeof r.default == "string")
      return r.default;
    const o = Object.values(r).find((i) => typeof i == "string");
    if (o)
      return o;
  }
  return s;
}
function tt(e) {
  return e !== null && typeof e == "object" && Object.hasOwn(e, "_value") ? e.value : e;
}
function Ve(e) {
  return Array.isArray(e) ? e.map((t) => tt(t)) : [];
}
function Ye(e) {
  return e.replace(/(\^|\$|\\|\/|\||\*|\+|\-|\.|\?|\(|\)|\[|\]|\{|\})/g, "\\$&");
}
function hn(e) {
  return new Promise((t, n) => {
    if (window.google && window.google.maps) {
      t();
      return;
    }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${e}&libraries=places`, s.async = !0, s.defer = !0, s.onload = () => t(), s.onerror = () => n(new Error("Failed to load Google Maps API")), document.head.appendChild(s);
  });
}
async function Ht(e, t, n) {
  if (await hn(n), !window.google || !window.google.maps)
    return null;
  const s = { lat: parseFloat(e), lng: parseFloat(t) };
  if (!Number.isFinite(s.lat) || !Number.isFinite(s.lng))
    return null;
  const r = document.createElement("div");
  r.className = "map-container";
  const o = new google.maps.Map(r, { center: s, zoom: 13 });
  return new google.maps.Marker({ map: o, position: s }), r;
}
function Ce(e, ...t) {
  const n = t.flatMap((s) => (s ?? "").split(" ")).filter((s) => s !== "" && !e.classList.contains(s));
  return e.classList.add(...n), () => e.classList.remove(...n);
}
function _e(e) {
  e.dispatchEvent(new CustomEvent("bd-editor-done", { bubbles: !0 }));
}
const Qn = new Function("url", "return import(url)");
async function Gn(e, t = Qn) {
  const n = await t(e), s = n == null ? void 0 : n.default;
  if (typeof s != "function" && (typeof s != "object" || s === null))
    throw new Error("module must export a DatatypeUI (or control function) as its default export");
  return n;
}
function gn(e) {
  const t = Object.keys(e);
  return t.length === 0 ? null : (n) => t.every((s) => {
    var r;
    return es((r = n[s]) == null ? void 0 : r.value, e[s]);
  });
}
const Yt = (e) => e.map(
  (t) => t && Object.hasOwn(t, "_value") ? t.value : t && Object.hasOwn(t, "_blitzID") ? t._blitzID : t
);
function es(e, t) {
  switch (t.op) {
    case "contains":
      return typeof e == "string" && !!e.match(new RegExp(Ye(String(t.value)), "i"));
    case "eq":
      return Array.isArray(e) ? Yt(e).includes(t.value) : e == t.value;
    case "between": {
      const n = typeof e == "string" && Number.isNaN(Number(e)) ? new Date(e).getTime() : Number(e);
      if (e == null || Number.isNaN(n))
        return !1;
      const { min: s, max: r } = t;
      return (s == null || n >= s) && (r == null || n <= r);
    }
    case "in": {
      const n = t.values ?? t.value;
      if (!Array.isArray(n) || n.length === 0)
        return !0;
      if (Array.isArray(e)) {
        const s = Yt(e);
        return n.some((r) => s.includes(r));
      }
      return n.includes(e);
    }
    default:
      return !0;
  }
}
const ts = {
  pending: "Saving…",
  conflict: "Conflict — the server holds a different value. Click for details.",
  failed: "Save failed — the server rejected this change. Click for details."
};
function vn(e, t) {
  let n = null, s = !1;
  return t((r) => {
    var i;
    if (!r)
      return;
    if (r.status === "completed") {
      if (!s)
        return;
      n == null || n.remove(), n = null;
      return;
    }
    s = !0, n || (n = document.createElement("span"), e.classList.add("bd-has-status"), e.append(n)), n.className = `bd-status-badge bd-status-${r.status}`, n.title = ts[r.status] ?? r.status;
    const o = (i = r.job) == null ? void 0 : i.message;
    n.onclick = o ? (c) => {
      c.stopPropagation(), alert(o);
    } : null;
  });
}
class ut {
  constructor() {
    ee(this, "_stops", []);
    ee(this, "_children", /* @__PURE__ */ new Map());
    ee(this, "_destroyed", !1);
  }
  /** A nested scope owned by `owner` — `release(owner)` destroys just that one. */
  for(t) {
    const n = this._children.get(t);
    if (n && !n._destroyed)
      return n;
    const s = new ut();
    return this._children.set(t, s), s;
  }
  /**
   * Badge `host` with `attribute`'s save-state, holding on to the unsubscribe.
   * A destroyed scope attaches nothing — the render that asked for this badge
   * is already gone (the element is built asynchronously, the grid may have
   * repainted meanwhile), and its subscription would have no owner left.
   */
  attach(t, n) {
    this._destroyed || typeof (n == null ? void 0 : n.syncStatus) != "function" || this._stops.push(vn(t, (s) => n.syncStatus(s)));
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
const ns = (e, t) => (n) => {
  var s;
  return e({
    ...n,
    value: (s = n.value) == null ? void 0 : s.value,
    onChange: (r) => n.onChange(r == null || r === "" ? null : { op: t, value: r })
  });
}, ss = /* @__PURE__ */ new Set(["varchar", "text", "markdown", "email", "url", "tag", "hex", "formula", "youtube"]), Xt = (e, t) => t && ss.has(e) ? ns(t, "contains") : void 0, Ge = (e) => typeof e == "function" ? e : () => {
};
class rs {
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
    return !!(n.filter ?? Xt(t.type, n.control));
  }
  /**
   * Filter semantics live here, not just inside mountFiltersForm: an app
   * arranging its own filter UI builds ports and compiles the collected
   * query through the same kernel it mounts with — one reachable handle,
   * no second copy of the rules.
   */
  query(t, n, s, r, o, i) {
    return yn(t, n, s, r, o, i);
  }
  compileConditions(t) {
    return gn(t);
  }
  buildCtx(t, n, s) {
    const r = this.deps.config.resolve(t.type, t.model, t.name, s.defaultConfig, t.mountConfig);
    return r.multiple === void 0 && t.many && (r.multiple = !0), {
      host: n,
      value: t.value,
      onChange: (o) => t.set(o),
      add: t.add,
      remove: t.remove,
      // liveness is default-on; config.live === false opts a mass mount out
      subscribe: r.live === !1 ? void 0 : t.subscribe,
      status: t.status,
      invalid: t.invalid,
      resolveModel: this.deps.resolveModel,
      attributeDetails: t.attributeDetails ?? {},
      config: r,
      settings: this.deps.config.settings,
      services: t.services ?? this.deps.config.services
    };
  }
  async mount(t, n, s, r) {
    var a;
    const o = this.resolveForPort(t, r), i = this.buildCtx(t, n, o);
    if (s === "read") {
      const u = o.view;
      if (!u)
        return () => {
        };
      const f = u(t.attribute ?? Zt(t), t.mountConfig);
      if (!f)
        return () => {
        };
      const l = () => {
        var p;
        return t.status && ((p = t.mountConfig) == null ? void 0 : p.status) !== !1 ? vn(n, t.status) : void 0;
      };
      if (typeof f == "string") {
        n.innerHTML = f;
        const p = l();
        return () => {
          p == null || p(), n.innerHTML = "";
        };
      }
      n.innerHTML = f.html;
      const d = (a = f.hydrate) == null ? void 0 : a.call(f, n), y = l();
      return () => {
        y == null || y(), d == null || d(), n.innerHTML = "";
      };
    }
    if (s === "filter") {
      const u = o.filter ?? Xt(t.type, o.control);
      if (!u)
        throw new Error(`type '${t.type}' is not filterable — declare a filter`);
      return Ge(await u(i));
    }
    const c = this.writeSurface(t, i, o);
    if (!c) {
      const u = this.writeFloor(t, i);
      if (!u)
        throw new Error("Editor for this attribute type not supported!");
      return Ge(await u.run());
    }
    try {
      return Ge(await c.run());
    } catch (u) {
      if (console.error(`"${t.name}" UI Error:`, u.stack ?? u.message), c.layer > 0) {
        const l = this.deps.registry.resolve({
          type: t.type,
          many: t.many,
          model: t.model,
          name: t.name,
          maxLayer: c.layer - 1
        }), d = this.writeSurface(t, i, l);
        if (d)
          try {
            return n.innerHTML = "", Ge(await d.run());
          } catch (y) {
            console.error(`"${t.name}" UI Error:`, y.stack ?? y.message);
          }
      }
      const f = this.writeFloor(t, i);
      if (!f)
        throw u;
      return n.innerHTML = "", Ge(await f.run());
    }
  }
  /**
   * Write-mode arbitration: the object-aware `editor` runs only on a live
   * port and only when no MORE specific layer supplied a `control` — so a
   * built-in editor keeps today's edit behavior, while any defineUI /
   * defineUIFor / per-mount control wins in edit AND add alike.
   */
  writeSurface(t, n, s) {
    var a, u;
    const r = ((a = s.sources.editor) == null ? void 0 : a.layer) ?? -1, o = ((u = s.sources.control) == null ? void 0 : u.layer) ?? -1, i = s.control ? { run: () => s.control(n), layer: o } : void 0, c = s.editor ? { run: () => s.editor({ ...n, attribute: t.attribute ?? Zt(t) }), layer: r } : void 0;
    return t.kind === "live" ? c && r >= o ? c : i && o > 0 ? i : c ?? i : i && o >= r ? i : c ?? i;
  }
  writeFloor(t, n) {
    const s = t.value !== null && t.value !== void 0 && typeof t.value == "object" ? "json" : t.kind === "draft" ? "varchar" : "text";
    if (s === t.type)
      return;
    this.deps.warn(`No usable UI for type '${t.type}' — falling back to '${s}'`);
    const r = this.deps.registry.resolve({ type: s, model: t.model, name: t.name, maxLayer: 0 });
    return this.writeSurface(t, n, r);
  }
}
function je(e) {
  let t;
  const n = () => t ?? (t = e().catch((r) => {
    throw t = void 0, r;
  })), s = async (...r) => (await n()).default(...r);
  return s.preload = n, s;
}
function ft(e) {
  let t;
  const n = () => t ?? (t = e().catch((r) => {
    throw t = void 0, r;
  })), s = (r, o) => {
    let i = null, c = !1, a = null;
    return n().then((u) => {
      var f;
      c || (i = u.default(r, o), a && ((f = i == null ? void 0 : i.handleSyncStatus) == null || f.call(i, ...a), a = null));
    }).catch((u) => console.error("Input chunk failed to load:", (u == null ? void 0 : u.message) ?? u)), {
      destroy: () => {
        var u;
        c = !0, (u = i == null ? void 0 : i.destroy) == null || u.call(i);
      },
      handleSyncStatus: (...u) => {
        var f;
        i ? (f = i.handleSyncStatus) == null || f.call(i, ...u) : a = u;
      }
    };
  };
  return s.preload = n, s;
}
function It(e) {
  let t;
  return function(...n) {
    t && clearTimeout(t), t = window.setTimeout(() => e(...n), 500);
  };
}
function gt(e, t, n) {
  let s = -1, r, o = !1;
  const i = () => {
    s > -1 && (clearTimeout(s), s = -1);
    const c = e();
    n && !n(c) || o && c === r || (r = c, o = !0, t == null || t(c));
  };
  return {
    /** Debounced commit for typing feedback (OnChange mode). */
    schedule() {
      s > -1 && clearTimeout(s), s = setTimeout(i, 500);
    },
    /** Commit now, cancelling any pending debounce. Reads the live DOM value. */
    commit() {
      i();
    },
    /** Seed the last-committed value (the initial value) so it isn't re-sent. */
    prime() {
      r = e(), o = !0;
    },
    /** Drop a pending debounce without committing. */
    cancel() {
      s > -1 && (clearTimeout(s), s = -1);
    },
    /** The last committed value (the initial value after prime). Esc restores this. */
    lastValue() {
      return o ? r : void 0;
    }
  };
}
const ze = {
  SAVE: `<svg width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" />
    </svg>`,
  DONE: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path stroke="#12e33c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 12.6111L8.92308 17.5L20 6.5" />
    </svg>`
};
var he = /* @__PURE__ */ ((e) => (e.OnChange = "change", e.OnFocusOut = "focusout", e.OnSubmit = "submit", e))(he || {});
function xe(e, t) {
  const {
    trigger: n = he.OnChange,
    multiple: s,
    label: r,
    placeholder: o,
    iconSvg: i,
    type: c,
    pattern: a,
    errorMsg: u,
    initialValue: f,
    className: l,
    onChange: d
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const y = typeof e == "string" ? document.getElementById(e) : e;
  if (!(y instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const p = gt(
    () => N.value,
    d,
    (C) => !a || a.test(C)
  ), m = s ? he.OnSubmit : n;
  let h = !1, v = null, g = -1, b = s ? f instanceof Array ? f : typeof f == "string" ? [f] : [] : [];
  const w = Ce(y, "bd-text-input", l);
  y.innerHTML = `<div class="container">
        ${r ? `<p class="label">${r}</p>` : ""}
        <input class="input" type="${c || "text"}" ${f && !s ? `value="${f}"` : ""}
            ${o ? `placeholder="${o}"` : ""} />
        ${a ? `<p class="error-msg" style="display: none;">${u ?? "Wrong value!"}</p>` : ""}
        ${i ? `<div class="icon">${i}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${m === he.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
        ${s ? '<div class="multi-values"></div>' : ""}
    </div>`;
  const L = y.querySelector(".container"), N = y.querySelector(".input"), S = y.querySelector(".error-msg"), M = y.querySelector(".submit"), A = y.querySelector(".multi-values"), T = y.querySelector(".icon"), O = y.querySelector(".actions"), E = y.querySelector(".sync-status");
  if (i && (N.style.paddingLeft = "34px"), r && (T && (T.style.top = "34px"), O.style.top = "34px"), m !== he.OnSubmit) {
    p.prime();
    const C = () => {
      const $ = !a || a.test(N.value);
      return S && (S.style.display = $ ? "none" : ""), $;
    };
    N.addEventListener("input", () => {
      C() && m === he.OnChange && p.schedule();
    }), N.addEventListener("blur", () => {
      C() && p.commit();
    }), s || N.addEventListener("keydown", ($) => {
      if ($.key === "Escape") {
        p.cancel(), N.value = p.lastValue() ?? "", C(), N.blur();
        return;
      }
      $.key === "Enter" && (C() && p.commit(), _e(y));
    });
  } else
    M && (N.oninput = () => {
      h = !0, N.style.paddingRight = "34px", M.innerHTML = ze.SAVE, M.style.cursor = "pointer", M.style.display = "";
    }, N.onkeyup = (C) => {
      C.key === "Enter" && M.onclick && M.onclick({});
    }, M.onclick = () => {
      h && (!a || a.test(N.value) ? (S && (S.style.display = "none"), d && (h = !1, M.innerHTML = ze.DONE, M.style.cursor = "initial", s ? (b.push(N.value), N.value = "", q(), d(b)) : (d(N.value), _e(y)))) : S && (S.style.display = ""));
    });
  const H = (C) => {
    var $;
    C && (C.status === D.Completed && !v || (v = C.status, g > -1 && (clearTimeout(g), g = -1), E.style.display = "initial", E.style.cursor = "initial", E.onclick = null, C.status === D.Pending ? (E.innerHTML = "&#xe91e;", E.style.color = "#d5d5d5") : C.status === D.Failed ? (E.innerHTML = "&#xe91a;", E.style.color = "#a82e25", ($ = C.job) != null && $.message && (E.style.cursor = "pointer", E.onclick = (I) => {
      var U;
      I.stopPropagation(), alert((U = C.job) == null ? void 0 : U.message);
    })) : C.status === D.Conflict ? (E.innerHTML = "&#xe91d;", E.style.color = "#a82e25", E.title = "Conflict") : C.status === D.Completed && (E.innerHTML = "&#xe91c;", E.style.color = "#0ac96a", g = window.setTimeout(() => {
      E.style.display = "none", g = -1;
    }, 1e3))));
  }, q = () => {
    if (A) {
      A.innerHTML = b.map((C) => `<p class="multi-item">${C} <span value="${C}">x</span></p>`).join(`
`);
      for (const C of A.querySelectorAll("span"))
        C.onclick = ($) => {
          b = b.filter((I) => I !== $.currentTarget.getAttribute("value")), d && d(b), q();
        };
    }
  };
  return s && q(), {
    handleSyncStatus: H,
    destroy: () => {
      m !== he.OnSubmit && !s && p.commit(), L.remove(), w();
    }
  };
}
function Re(e, t) {
  const {
    trigger: n = he.OnChange,
    multiple: s,
    label: r,
    placeholder: o,
    iconSvg: i,
    rows: c = 10,
    resize: a = !0,
    initialValue: u,
    className: f,
    onChange: l
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const d = typeof e == "string" ? document.getElementById(e) : e;
  if (!(d instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let y = s ? void 0 : u, p = -1;
  const m = () => {
    p > -1 && (clearTimeout(p), p = -1);
  }, h = l ? ($) => {
    m(), p = setTimeout(() => {
      p = -1, y = $, l($);
    }, 500);
  } : void 0, v = s ? he.OnSubmit : n;
  let g = !1, b = null, w = -1, L = s ? u instanceof Array ? u : typeof u == "string" ? [u] : [] : [];
  const N = Ce(d, "bd-textarea-input", f);
  d.innerHTML = `<div class="container">
        ${r ? `<p class="label">${r}</p>` : ""}
        <textarea class="input" ${o ? `placeholder="${o}"` : ""}
            rows="${c.toString()}">${u && !s ? u : ""}</textarea>
        ${i ? `<div class="icon">${i}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${v === he.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
        ${s ? '<div class="multi-values"></div>' : ""}
    </div>`;
  const S = d.querySelector(".container"), M = d.querySelector(".input"), A = d.querySelector(".submit"), T = d.querySelector(".multi-values"), O = d.querySelector(".icon"), E = d.querySelector(".actions"), H = d.querySelector(".sync-status");
  M.style.resize = a ? "vertical" : "none", i && (M.style.paddingLeft = "34px"), r && (O && (O.style.top = "34px"), E.style.top = "34px"), v !== he.OnSubmit ? (M.addEventListener(v === he.OnFocusOut ? "blur" : "input", ($) => {
    const I = $.target.value;
    I !== y && h && h(I);
  }), M.addEventListener("keydown", ($) => {
    $.key === "Escape" && (m(), M.value = typeof y == "string" ? y : "", M.blur());
  })) : A && (M.oninput = () => {
    g = !0, M.style.paddingRight = "34px", A.innerHTML = ze.SAVE, A.style.cursor = "pointer", A.style.display = "";
  }, A.onclick = () => {
    g && l && (g = !1, A.innerHTML = ze.DONE, A.style.cursor = "initial", s ? (L.push(M.value), M.value = "", C(), l(L)) : l(M.value));
  });
  const q = ($) => {
    var I;
    $ && ($.status === D.Completed && !b || (b = $.status, w > -1 && (clearTimeout(w), w = -1), H.style.display = "initial", H.style.cursor = "initial", H.onclick = null, $.status === D.Pending ? (H.innerHTML = "&#xe91e;", H.style.color = "#d5d5d5") : $.status === D.Failed ? (H.innerHTML = "&#xe91a;", H.style.color = "#a82e25", (I = $.job) != null && I.message && (H.style.cursor = "pointer", H.onclick = (U) => {
      var F;
      U.stopPropagation(), alert((F = $.job) == null ? void 0 : F.message);
    })) : $.status === D.Conflict ? (H.innerHTML = "&#xe91d;", H.style.color = "#a82e25", H.title = "Conflict") : $.status === D.Completed && (H.innerHTML = "&#xe91c;", H.style.color = "#0ac96a", w = window.setTimeout(() => {
      H.style.display = "none", w = -1;
    }, 1e3))));
  }, C = () => {
    if (T) {
      T.innerHTML = L.map(($) => `<p class="multi-item">${$} <span value="${$}">x</span></p>`).join(`
`);
      for (const $ of T.querySelectorAll("span"))
        $.onclick = (I) => {
          L = L.filter((U) => U !== I.currentTarget.getAttribute("value")), l && l(L), C();
        };
    }
  };
  return s && C(), {
    handleSyncStatus: q,
    getValue: () => M.value,
    isPending: () => p > -1,
    cancelPending: m,
    destroy: () => {
      S.remove(), N();
    }
  };
}
function vt(e, t) {
  const { label: n, placeholder: s, initialValue: r, emptyMsg: o, className: i, onChange: c } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const a = typeof e == "string" ? document.getElementById(e) : e;
  if (!(a instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let u = null, f = -1, l = r instanceof Array ? r : typeof r == "string" ? [r] : [];
  const d = Ce(a, "bd-text-many-input", i);
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
  const y = a.querySelector(".container"), p = a.querySelector(".input"), m = a.querySelector(".submit"), h = a.querySelector(".sync-status"), v = a.querySelector(".values");
  p.onkeyup = (w) => {
    w.key === "Enter" && m.onclick && m.onclick({});
  }, m.onclick = () => {
    if (p.value) {
      if (l.includes(p.value)) {
        p.value = "";
        return;
      }
      l.push(p.value), p.value = "", b(), c && c(l);
    }
  };
  const g = (w) => {
    var L;
    w && (w.status === D.Completed && !u || (u = w.status, f > -1 && (clearTimeout(f), f = -1), h.style.display = "initial", h.style.cursor = "initial", h.onclick = null, w.status === D.Pending ? (h.innerHTML = "&#xe91e;", h.style.color = "#d5d5d5") : w.status === D.Failed ? (h.innerHTML = "&#xe91a;", h.style.color = "#a82e25", (L = w.job) != null && L.message && (h.style.cursor = "pointer", h.onclick = (N) => {
      var S;
      N.stopPropagation(), alert((S = w.job) == null ? void 0 : S.message);
    })) : w.status === D.Conflict ? (h.innerHTML = "&#xe91d;", h.style.color = "#a82e25", h.title = "Conflict") : w.status === D.Completed && (h.innerHTML = "&#xe91c;", h.style.color = "#0ac96a", f = window.setTimeout(() => {
      h.style.display = "none", f = -1;
    }, 1e3))));
  }, b = () => {
    v.innerHTML = l.length === 0 ? `
            <p class="empty">${o ?? "No items added yet!"}</p>
        ` : l.map((w) => `<div class="value-item">
                <div>${w}</div>
                <div class="remove" value="${w}"></div>
            </div>`).join(`
`);
    for (const w of v.querySelectorAll(".value-item .remove"))
      w.onclick = (L) => {
        l = l.filter((N) => N !== L.currentTarget.getAttribute("value")), c && c(l), b();
      };
  };
  return b(), {
    handleSyncStatus: g,
    destroy: () => {
      y.remove(), d();
    }
  };
}
const bt = (e, t) => {
  typeof (t == null ? void 0 : t.getDraft) == "function" && (e.getDraft = () => t.getDraft()), typeof (t == null ? void 0 : t.getValue) == "function" && (e.getDraft = () => t.getValue()), typeof (t == null ? void 0 : t.isPending) == "function" && (e.isPending = () => t.isPending()), typeof (t == null ? void 0 : t.cancelPending) == "function" && (e.cancelPending = () => t.cancelPending());
}, He = (e) => async (t) => {
  const n = await e(t.attribute, t.host, t.config), s = () => {
    var r;
    return (r = n == null ? void 0 : n.destroy) == null ? void 0 : r.call(n);
  };
  return bt(s, n), s;
}, et = (e, t) => (n, s) => {
  const r = e(n, s);
  return r ? t ? { html: r, hydrate: (o) => t(o, n) ?? void 0 } : r : "";
}, $e = (e, t) => (n) => {
  var i;
  const s = e(n.host, {
    ...n.config,
    // a per-mount draft (expand-to-modal handing an unsaved value over) wins
    initialValue: n.config.draft ?? n.value,
    onChange: (c) => n.onChange(c),
    ...t == null ? void 0 : t(n)
  }), r = s.handleSyncStatus ? (i = n.status) == null ? void 0 : i.call(n, s.handleSyncStatus) : void 0, o = () => {
    var c;
    r == null || r(), (c = s.destroy) == null || c.call(s);
  };
  return bt(o, s), o;
}, Ie = (e) => (Array.isArray(e) ? e.length > 0 : e !== "" && e != null) ? e : null, is = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
    <rect stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" x="3" y="5" width="18" height="14" rx="2" />
</svg>`, os = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" />
</svg>`, as = $e(vt, ({ onChange: e }) => ({
  onChange: (t) => e(Ie(t))
})), ls = {
  type: ["varchar", "tag", "formula"],
  empty: (e) => !e,
  control: $e(xe, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Ie(t))
  }))
}, cs = {
  type: "hex",
  empty: (e) => !e,
  // same validation contract as the hex editor — bad values stop at the door
  defaultConfig: { pattern: /^[0-9a-fA-F]*$/, errorMsg: "Hex digits only (0-9, a-f)!" },
  control: $e(xe, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Ie(t))
  }))
}, ds = {
  type: ["varchar[]", "text[]", "tag[]"],
  default: () => [],
  control: as
}, us = {
  type: ["text", "markdown"],
  empty: (e) => !e,
  // grid 'auto': a value the cell can't show inline (>= modalThreshold)
  // opens the modal directly, shorter ones edit inline with an expand icon
  defaultConfig: { presentation: { grid: "auto", form: "expandable" }, modalThreshold: 100 },
  control: $e(Re, ({ onChange: e }) => ({
    multiple: !1,
    onChange: (t) => e(Ie(t))
  }))
}, fs = {
  type: "email",
  empty: (e) => !e,
  defaultConfig: { type: "email", iconSvg: is },
  control: $e(xe, ({ onChange: e }) => ({
    onChange: (t) => e(Ie(t))
  }))
}, ps = {
  type: ["url", "youtube"],
  empty: (e) => !e,
  defaultConfig: { type: "url", iconSvg: os },
  control: $e(xe, ({ onChange: e }) => ({
    onChange: (t) => e(Ie(t))
  }))
};
function Ne(e, t) {
  const {
    trigger: n = he.OnChange,
    label: s,
    placeholder: r,
    iconSvg: o,
    min: i,
    max: c,
    float: a,
    initialValue: u,
    className: f,
    onChange: l
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const d = typeof e == "string" ? document.getElementById(e) : e;
  if (!(d instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const y = gt(() => M(b.value), l);
  let p = !1, m = null, h = -1;
  const v = Ce(d, "bd-number-input", f);
  d.innerHTML = `<div class="container">
        ${s ? `<p class="label">${s}</p>` : ""}
        <input class="input" type="number" ${r ? `placeholder="${r}"` : ""}
            ${u != null ? `value="${u.toString()}"` : ""}
            ${i != null ? `min="${i.toString()}"` : ""}
            ${c != null ? `max="${c.toString()}"` : ""}
        />
        ${o ? `<div class="icon">${o}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${n === he.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
    </div>`;
  const g = d.querySelector(".container"), b = d.querySelector(".input"), w = d.querySelector(".submit"), L = d.querySelector(".icon"), N = d.querySelector(".actions"), S = d.querySelector(".sync-status");
  N.style.right = n === he.OnSubmit ? "10px" : "32px", o && (b.style.paddingLeft = "34px"), s && (L && (L.style.top = "34px"), N.style.top = "34px");
  const M = (T) => T === "" ? null : (a ? parseFloat(T) : parseInt(T)) || 0;
  return n !== he.OnSubmit ? (y.prime(), b.addEventListener("input", () => {
    n === he.OnChange && y.schedule();
  }), b.addEventListener("blur", () => y.commit()), b.addEventListener("keydown", (T) => {
    if (T.key === "Escape") {
      y.cancel();
      const O = y.lastValue();
      b.value = O != null ? O.toString() : "", b.blur();
      return;
    }
    T.key === "Enter" && (y.commit(), _e(d));
  })) : w && (b.addEventListener("input", () => {
    p = !0, b.style.paddingRight = "34px", w.innerHTML = ze.SAVE, w.style.cursor = "pointer", w.style.display = "";
  }), w.addEventListener("click", () => {
    p && l && (p = !1, w.innerHTML = ze.DONE, w.style.cursor = "initial", l(M(b.value)), _e(d));
  })), {
    handleSyncStatus: (T) => {
      var O;
      T && (T.status === D.Completed && !m || (m = T.status, h > -1 && (clearTimeout(h), h = -1), S.style.display = "initial", S.style.cursor = "initial", S.onclick = null, T.status === D.Pending ? (S.innerHTML = "&#xe91e;", S.style.color = "#d5d5d5") : T.status === D.Failed ? (S.innerHTML = "&#xe91a;", S.style.color = "#a82e25", (O = T.job) != null && O.message && (S.style.cursor = "pointer", S.onclick = (E) => {
        var H;
        E.stopPropagation(), alert((H = T.job) == null ? void 0 : H.message);
      })) : T.status === D.Conflict ? (S.innerHTML = "&#xe91d;", S.style.color = "#a82e25", S.title = "Conflict") : T.status === D.Completed && (S.innerHTML = "&#xe91c;", S.style.color = "#0ac96a", h = window.setTimeout(() => {
        S.style.display = "none", h = -1;
      }, 1e3))));
    },
    destroy: () => {
      n !== he.OnSubmit && y.commit(), g.remove(), v();
    }
  };
}
const Ot = ({ host: e, value: t, onChange: n, config: s }) => {
  const r = {
    min: (t == null ? void 0 : t.min) ?? null,
    max: (t == null ? void 0 : t.max) ?? null
  }, o = () => n(r.min == null && r.max == null ? null : { op: "between", ...r }), i = document.createElement("div");
  i.className = `bd-filter-range ${s.className ?? ""}`, e.append(i);
  const c = ["min", "max"].map((a) => {
    const u = document.createElement("div");
    return i.append(u), Ne(u, {
      ...s,
      label: void 0,
      placeholder: `${s.label ?? s.placeholder ?? ""} ${a}`.trim(),
      initialValue: r[a] ?? void 0,
      onChange: (f) => {
        r[a] = f, o();
      }
    }).destroy;
  });
  return () => {
    c.forEach((a) => a()), i.remove();
  };
}, ms = {
  type: ["int", "tinyint"],
  empty: (e) => e == null,
  control: $e(Ne),
  filter: Ot
}, ys = {
  type: ["double", "float", "percentage", "currency"],
  empty: (e) => e == null,
  defaultConfig: { float: !0 },
  control: $e(Ne),
  filter: Ot
}, hs = {
  type: "duration",
  empty: (e) => e == null,
  control: $e(Ne, ({ config: e }) => ({
    min: e.min ?? 0,
    placeholder: "seconds"
  })),
  filter: Ot
};
function jt(e, t) {
  const { label: n, initialValue: s, className: r, onChange: o } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const i = typeof e == "string" ? document.getElementById(e) : e;
  if (!(i instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = s === "1" || s === !0, a = null, u = -1;
  const f = Ce(i, "bd-boolean-input", r);
  i.innerHTML = `<div class="container">
        <div class="sync-status blitzicon" style="display: none;"></div>
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="input"></div>
    </div>`;
  const l = i.querySelector(".container"), d = i.querySelector(".sync-status"), y = i.querySelector(".input"), p = () => {
    y.className = c ? "input icon-true" : "input icon-false";
  }, m = (h) => {
    var v;
    h && (h.status === D.Completed && !a || (a = h.status, u > -1 && (clearTimeout(u), u = -1), d.style.display = "initial", d.style.cursor = "initial", d.onclick = null, h.status === D.Pending ? (d.innerHTML = "&#xe91e;", d.style.color = "#d5d5d5") : h.status === D.Failed ? (d.innerHTML = "&#xe91a;", d.style.color = "#a82e25", (v = h.job) != null && v.message && (d.style.cursor = "pointer", d.onclick = (g) => {
      var b;
      g.stopPropagation(), alert((b = h.job) == null ? void 0 : b.message);
    })) : h.status === D.Conflict ? (d.innerHTML = "&#xe91d;", d.style.color = "#a82e25", d.title = "Conflict") : h.status === D.Completed && (d.innerHTML = "&#xe91c;", d.style.color = "#0ac96a", u = window.setTimeout(() => {
      d.style.display = "none", u = -1;
    }, 1e3))));
  };
  return y.addEventListener("click", () => {
    c = !c, o && o(c), p(), _e(i);
  }), p(), {
    handleSyncStatus: m,
    destroy: () => {
      l.remove(), f();
    }
  };
}
function st(e, t) {
  const { trigger: n = he.OnChange, label: s, time: r, initialValue: o, className: i, onChange: c } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const a = typeof e == "string" ? document.getElementById(e) : e;
  if (!(a instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let u = !1, f = null, l = -1;
  const d = Ce(a, "bd-date-input", i);
  a.innerHTML = `<div class="container">
        ${s ? `<p class="label">${s}</p>` : ""}
        <input class="input" type="${r ? "datetime-local" : "date"}" ${o ? `value="${o}"` : ""} />
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${n === he.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
    </div>`;
  const y = a.querySelector(".container"), p = a.querySelector(".input"), m = a.querySelector(".actions"), h = a.querySelector(".submit"), v = a.querySelector(".sync-status");
  m.style.right = n === he.OnSubmit ? "10px" : "38px", s && (m.style.top = "34px");
  const b = gt(() => {
    let L = p.value.replace("T", " ");
    return L && L.split(":").length === 2 && (L = L + ":00"), L || null;
  }, c);
  return n !== he.OnSubmit ? (b.prime(), p.addEventListener(n === he.OnFocusOut ? "blur" : "input", () => b.commit()), p.addEventListener("change", () => {
    b.commit(), _e(a);
  }), p.addEventListener("keydown", (L) => {
    L.key === "Enter" && (b.commit(), _e(a));
  })) : h && (p.addEventListener("input", () => {
    u = !0, p.style.paddingRight = "34px", h.innerHTML = ze.SAVE, h.style.cursor = "pointer", h.style.display = "";
  }), h.addEventListener("click", () => {
    u && (u = !1, h.innerHTML = ze.DONE, h.style.cursor = "initial", b.commit(), _e(a));
  })), {
    handleSyncStatus: (L) => {
      var N;
      L && (L.status === D.Completed && !f || (f = L.status, l > -1 && (clearTimeout(l), l = -1), v.style.display = "initial", v.style.cursor = "initial", v.onclick = null, L.status === D.Pending ? (v.innerHTML = "&#xe91e;", v.style.color = "#d5d5d5") : L.status === D.Failed ? (v.innerHTML = "&#xe91a;", v.style.color = "#a82e25", (N = L.job) != null && N.message && (v.style.cursor = "pointer", v.onclick = (S) => {
        var M;
        S.stopPropagation(), alert((M = L.job) == null ? void 0 : M.message);
      })) : L.status === D.Conflict ? (v.innerHTML = "&#xe91d;", v.style.color = "#a82e25", v.title = "Conflict") : L.status === D.Completed && (v.innerHTML = "&#xe91c;", v.style.color = "#0ac96a", l = window.setTimeout(() => {
        v.style.display = "none", l = -1;
      }, 1e3))));
    },
    destroy: () => {
      n !== he.OnSubmit && b.commit(), y.remove(), d();
    }
  };
}
function Dt(e, t) {
  const { label: n, baseLocale: s = "en", placeholder: r, initialValue: o, className: i, onChange: c } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const a = typeof e == "string" ? document.getElementById(e) : e;
  if (!(a instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let u = null, f = -1;
  const l = Ce(a, "bd-i18n-input", i);
  a.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="rows"></div>
        <div class="foot">
            <span class="add-locale">+ locale</span>
            <div class="sync-status blitzicon" style="display: none;"></div>
        </div>
    </div>`;
  const d = a.querySelector(".container"), y = a.querySelector(".rows"), p = a.querySelector(".add-locale"), m = a.querySelector(".sync-status"), h = () => {
    const S = {};
    for (const M of y.querySelectorAll(".row")) {
      const A = M.querySelector(".locale").value.trim(), T = M.querySelector(".string").value;
      A && (S[A] = T);
    }
    return S;
  }, v = gt(
    () => JSON.stringify(h()),
    c ? (S) => c(JSON.parse(S)) : void 0
  ), g = () => v.schedule(), b = () => {
    v.commit(), _e(a);
  }, w = (S, M, A = !1) => {
    const T = document.createElement("div");
    T.className = A ? "row base" : "row";
    const O = document.createElement("input");
    O.className = "locale", O.placeholder = "en", O.value = S;
    const E = document.createElement("input");
    if (E.className = "string", r && (E.placeholder = r), E.value = M, O.addEventListener("input", g), E.addEventListener("input", g), O.addEventListener("blur", b), E.addEventListener("blur", b), T.append(O, E), !A) {
      const H = document.createElement("span");
      H.className = "remove", H.textContent = "×", H.addEventListener("click", () => {
        T.remove(), b();
      }), T.append(H);
    }
    return y.append(T), E;
  }, L = o && typeof o == "object" && !Array.isArray(o) ? o : {};
  w(s, L[s] ?? "", !0);
  for (const S of Object.keys(L))
    S !== s && w(S, L[S]);
  return v.prime(), p.addEventListener("click", () => {
    w("", "").previousElementSibling.focus();
  }), {
    handleSyncStatus: (S) => {
      var M;
      S && (S.status === D.Completed && !u || (u = S.status, f > -1 && (clearTimeout(f), f = -1), m.style.display = "initial", m.style.cursor = "initial", m.onclick = null, S.status === D.Pending ? (m.innerHTML = "&#xe91e;", m.style.color = "#d5d5d5") : S.status === D.Failed ? (m.innerHTML = "&#xe91a;", m.style.color = "#a82e25", (M = S.job) != null && M.message && (m.style.cursor = "pointer", m.onclick = (A) => {
        var T;
        A.stopPropagation(), alert((T = S.job) == null ? void 0 : T.message);
      })) : S.status === D.Conflict ? (m.innerHTML = "&#xe91d;", m.style.color = "#a82e25", m.title = "Conflict") : S.status === D.Completed && (m.innerHTML = "&#xe91c;", m.style.color = "#0ac96a", f = window.setTimeout(() => {
        m.style.display = "none", f = -1;
      }, 1e3))));
    },
    getValue: h,
    destroy: () => {
      v.commit(), d.remove(), l();
    }
  };
}
const Nt = (e, t) => ({ host: n, value: s, onChange: r, config: o }) => {
  const i = {
    min: (s == null ? void 0 : s.min) ?? null,
    max: (s == null ? void 0 : s.max) ?? null
  }, c = () => r(i.min == null && i.max == null ? null : { op: "between", ...i }), a = (f) => {
    if (f == null)
      return "";
    const l = t(f);
    return `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`;
  }, u = document.createElement("div");
  u.className = `bd-filter-daterange ${o.className ?? ""}`, n.append(u);
  for (const [f, l] of [["min", "from"], ["max", "to"]]) {
    const d = document.createElement("input");
    d.type = "date", d.title = `${o.label ?? o.placeholder ?? ""} ${l}`.trim(), d.setAttribute("aria-label", d.title), d.value = a(i[f]), d.onchange = () => {
      if (!d.value)
        i[f] = null;
      else {
        const [y, p, m] = d.value.split("-").map(Number);
        i[f] = e(f === "min" ? new Date(y, p - 1, m) : new Date(y, p - 1, m, 23, 59, 59, 999));
      }
      c();
    }, u.append(d);
  }
  return () => u.remove();
}, gs = {
  type: "boolean",
  default: () => !1,
  empty: (e) => e == null,
  control: $e(jt),
  // tristate: any / true / false — a checkbox can't say "either"
  filter: ({ host: e, value: t, onChange: n, config: s }) => {
    const r = document.createElement("select");
    r.className = `bd-filter-boolean ${s.className ?? ""}`;
    const o = t == null ? void 0 : t.value;
    for (const i of ["any", "true", "false"])
      r.append(new Option(
        i === "any" ? s.label ?? s.placeholder ?? "any" : i,
        i,
        !1,
        String(o) === i
      ));
    return r.onchange = () => n(r.value === "any" ? null : { op: "eq", value: r.value === "true" }), e.append(r), () => r.remove();
  }
}, vs = {
  type: "date",
  empty: (e) => !e,
  control: $e(st),
  filter: Nt((e) => e.getTime(), (e) => new Date(e))
}, bs = {
  type: "datetime",
  empty: (e) => !e,
  defaultConfig: { time: !0 },
  control: $e(st),
  filter: Nt((e) => e.getTime(), (e) => new Date(e))
}, ws = {
  type: "blitzstamp",
  empty: (e) => e == null,
  view: ({ value: e }) => e == null ? "" : ct(Number(e)).toLocaleString(),
  filter: Nt(Wn, ct)
}, Es = {
  type: "texti18n",
  empty: (e) => !e || Object.keys(e).length === 0,
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: $e(Dt, ({ onChange: e }) => ({
    onChange: (t) => e(t && Object.keys(t).length > 0 ? t : null)
  }))
}, $s = {
  type: "json",
  // structured content has no useful inline cell editor — go straight big
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: ({ host: e, value: t, onChange: n, config: s, status: r, invalid: o }) => {
    const i = Re(e, {
      ...s,
      initialValue: s.draft ?? (t != null ? JSON.stringify(t, null, 2) : void 0),
      onChange: (u) => {
        try {
          o == null || o(null), n(u ? JSON.parse(u) ?? null : null);
        } catch {
          o == null || o("Invalid JSON"), n(null);
        }
      }
    }), c = r == null ? void 0 : r(i.handleSyncStatus), a = () => {
      c == null || c(), i.destroy();
    };
    return bt(a, i), a;
  }
}, Ss = {
  type: "code",
  empty: (e) => !(e != null && e.content),
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: ({ host: e, value: t, onChange: n, config: s, status: r }) => {
    const o = Re(e, {
      ...s,
      initialValue: s.draft ?? (t == null ? void 0 : t.content),
      onChange: (a) => n(a ? { content: a, language: (t == null ? void 0 : t.language) ?? null } : null)
    }), i = r == null ? void 0 : r(o.handleSyncStatus), c = () => {
      i == null || i(), o.destroy();
    };
    return bt(c, o), c;
  }
};
function wt(e, t) {
  const { label: n, initialPreviewImages: s, multiple: r, className: o, onChange: i } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const c = typeof e == "string" ? document.getElementById(e) : e;
  if (!(c instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let a = s ?? [], u = null, f = -1;
  const l = Ce(c, "bd-image-input", o);
  c.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="preview" style="display: none;"></div>
        <input class="input" type="file" accept="image/*" ${r ? 'multiple="true"' : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const d = c.querySelector(".container"), y = c.querySelector(".preview"), p = c.querySelector(".input"), m = c.querySelector(".sync-status");
  p.addEventListener("change", (g) => {
    const b = g.target.files;
    if (i && b) {
      const w = Array.from(b);
      a = w.map((L) => URL.createObjectURL(L)), h(), i(w);
    }
  });
  const h = () => {
    y.innerHTML = a.map((g) => `<div class="image" style="background-image: url(${g});"></div>`).join(`
`), y.style.display = a.length > 0 ? "" : "none";
  }, v = (g) => {
    var b;
    g && (g.status === D.Completed && !u || (u = g.status, f > -1 && (clearTimeout(f), f = -1), m.style.display = "initial", m.style.cursor = "initial", m.onclick = null, g.status === D.Pending ? (m.innerHTML = "&#xe91e;", m.style.color = "#d5d5d5") : g.status === D.Failed ? (m.innerHTML = "&#xe91a;", m.style.color = "#a82e25", (b = g.job) != null && b.message && (m.style.cursor = "pointer", m.onclick = (w) => {
      var L;
      w.stopPropagation(), alert((L = g.job) == null ? void 0 : L.message);
    })) : g.status === D.Conflict ? (m.innerHTML = "&#xe91d;", m.style.color = "#a82e25", m.title = "Conflict") : g.status === D.Completed && (m.innerHTML = "&#xe91c;", m.style.color = "#0ac96a", f = window.setTimeout(() => {
      m.style.display = "none", f = -1;
    }, 1e3))));
  };
  return h(), {
    handleSyncStatus: v,
    destroy: () => {
      d.remove(), l();
    }
  };
}
function qt(e, t) {
  const { label: n, multiple: s, className: r, onChange: o } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const i = typeof e == "string" ? document.getElementById(e) : e;
  if (!(i instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = null, a = -1;
  const u = Ce(i, "bd-video-input", r);
  i.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <input class="input" type="file" accept=".mp4,.m4v,.mov" ${s ? 'multiple="true"' : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const f = i.querySelector(".container"), l = i.querySelector(".input"), d = i.querySelector(".sync-status");
  return l.addEventListener("change", (p) => {
    const m = p.target.files;
    if (o && m) {
      const h = Array.from(m);
      o(h);
    }
  }), {
    handleSyncStatus: (p) => {
      var m;
      p && (p.status === D.Completed && !c || (c = p.status, a > -1 && (clearTimeout(a), a = -1), d.style.display = "initial", d.style.cursor = "initial", d.onclick = null, p.status === D.Pending ? (d.innerHTML = "&#xe91e;", d.style.color = "#d5d5d5") : p.status === D.Failed ? (d.innerHTML = "&#xe91a;", d.style.color = "#a82e25", (m = p.job) != null && m.message && (d.style.cursor = "pointer", d.onclick = (h) => {
        var v;
        h.stopPropagation(), alert((v = p.job) == null ? void 0 : v.message);
      })) : p.status === D.Conflict ? (d.innerHTML = "&#xe91d;", d.style.color = "#a82e25", d.title = "Conflict") : p.status === D.Completed && (d.innerHTML = "&#xe91c;", d.style.color = "#0ac96a", a = window.setTimeout(() => {
        d.style.display = "none", a = -1;
      }, 1e3))));
    },
    destroy: () => {
      f.remove(), u();
    }
  };
}
function Pt(e, t) {
  const { label: n, multiple: s, className: r, onChange: o } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const i = typeof e == "string" ? document.getElementById(e) : e;
  if (!(i instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = null, a = -1;
  const u = Ce(i, "bd-file-input", r);
  i.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <input class="input" type="file" accept="*" ${s ? "multiple" : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const f = i.querySelector(".container"), l = i.querySelector(".input"), d = i.querySelector(".sync-status");
  return l.addEventListener("change", (p) => {
    const m = p.target.files;
    if (o && m) {
      const h = Array.from(m);
      o(h);
    }
  }), {
    handleSyncStatus: (p) => {
      var m;
      p && (p.status === D.Completed && !c || (c = p.status, a > -1 && (clearTimeout(a), a = -1), d.style.display = "initial", d.style.cursor = "initial", d.onclick = null, p.status === D.Pending ? (d.innerHTML = "&#xe91e;", d.style.color = "#d5d5d5") : p.status === D.Failed ? (d.innerHTML = "&#xe91a;", d.style.color = "#a82e25", (m = p.job) != null && m.message && (d.style.cursor = "pointer", d.onclick = (h) => {
        var v;
        h.stopPropagation(), alert((v = p.job) == null ? void 0 : v.message);
      })) : p.status === D.Conflict ? (d.innerHTML = "&#xe91d;", d.style.color = "#a82e25", d.title = "Conflict") : p.status === D.Completed && (d.innerHTML = "&#xe91c;", d.style.color = "#0ac96a", a = window.setTimeout(() => {
        d.style.display = "none", a = -1;
      }, 1e3))));
    },
    destroy: () => {
      f.remove(), u();
    }
  };
}
const Et = (e, t, n) => ({ host: s, onChange: r, config: o, services: i, status: c }) => {
  const { handleSyncStatus: a, destroy: u } = e(s, {
    ...o,
    onChange: async (l) => {
      if (l.length !== 0) {
        a({ status: D.Pending });
        try {
          const d = [];
          for (const y of l)
            d.push(await i[t](y));
          await r(n(d)), a({ status: D.Completed });
        } catch (d) {
          console.error("Upload failed:", (d == null ? void 0 : d.message) ?? d), a({ status: D.Failed });
        }
      }
    }
  }), f = c == null ? void 0 : c(a);
  return () => {
    f == null || f(), u();
  };
}, Cs = {
  type: ["image", "image[]"],
  default: () => [],
  control: Et(wt, "upload", (e) => e)
}, Ls = {
  type: "video",
  control: Et(qt, "uploadVideo", (e) => e[0])
}, xs = {
  type: "file",
  control: Et(Pt, "uploadFile", (e) => e[0])
}, ks = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function de(e) {
  return String(e ?? "").replace(/[&<>"']/g, (t) => ks[t]);
}
class bn {
  constructor(t) {
    this.html = t;
  }
  toString() {
    return this.html;
  }
}
function te(e) {
  return new bn(e);
}
const Ms = /^\s*(javascript|data|vbscript):/i;
function ke(e) {
  const t = String(e ?? "");
  return Ms.test(t) ? "#" : de(t);
}
function Q(e, ...t) {
  return e.reduce((n, s, r) => n + s + (r < t.length ? t[r] instanceof bn ? t[r].html : de(t[r]) : ""), "");
}
function wn(e, t) {
  const { label: n, className: s, onChange: r } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const o = typeof e == "string" ? document.getElementById(e) : e;
  if (!(o instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let i = null, c = -1;
  const a = Ce(o, "bd-pdf-input", s);
  o.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <input class="input" type="file" accept="application/pdf,.pdf" />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const u = o.querySelector(".container"), f = o.querySelector(".input"), l = o.querySelector(".sync-status");
  return f.addEventListener("change", (y) => {
    const p = y.target.files;
    if (r && p) {
      const m = Array.from(p);
      r(m);
    }
  }), {
    handleSyncStatus: (y) => {
      var p;
      y && (y.status === D.Completed && !i || (i = y.status, c > -1 && (clearTimeout(c), c = -1), l.style.display = "initial", l.style.cursor = "initial", l.onclick = null, y.status === D.Pending ? (l.innerHTML = "&#xe91e;", l.style.color = "#d5d5d5") : y.status === D.Failed ? (l.innerHTML = "&#xe91a;", l.style.color = "#a82e25", (p = y.job) != null && p.message && (l.style.cursor = "pointer", l.onclick = (m) => {
        var h;
        m.stopPropagation(), alert((h = y.job) == null ? void 0 : h.message);
      })) : y.status === D.Conflict ? (l.innerHTML = "&#xe91d;", l.style.color = "#a82e25", l.title = "Conflict") : y.status === D.Completed && (l.innerHTML = "&#xe91c;", l.style.color = "#0ac96a", c = window.setTimeout(() => {
        l.style.display = "none", c = -1;
      }, 1e3))));
    },
    destroy: () => {
      u.remove(), a();
    }
  };
}
const Ts = (e) => {
  const t = e.search(/[?#]/), n = t === -1 ? e : e.slice(0, t), s = t === -1 ? "" : e.slice(t);
  return (/\.pdf$/i.test(n) ? n.replace(/\.pdf$/i, ".thumbnail.jpg") : `${n}.thumbnail.jpg`) + s;
}, _s = (e) => {
  try {
    return decodeURIComponent(new URL(e, "https://x.invalid").pathname.split("/").pop() || e);
  } catch {
    return e;
  }
}, As = {
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
    html: Q`<a class="bd-pdf-doc" href="${te(ke(e))}" target="_blank" rel="noopener noreferrer">
            <img class="bd-pdf" alt="" loading="lazy" src="${te(ke(Ts(e)))}" />
            <span class="bd-pdf-fallback" hidden>${_s(e)}</span>
        </a>`,
    hydrate: (t) => {
      const n = t.querySelector("img.bd-pdf"), s = t.querySelector(".bd-pdf-fallback");
      if (!n || !s)
        return;
      const r = () => {
        n.hidden = !0, s.hidden = !1;
      };
      return n.complete && n.naturalWidth === 0 && r(), n.addEventListener("error", r), () => n.removeEventListener("error", r);
    }
  }),
  // uploads go through the generic file service ({ url } comes back);
  // the committed value is the bare URL string, never the record
  control: Et(wn, "uploadFile", (e) => {
    const t = e[0];
    return (typeof t == "string" ? t : t == null ? void 0 : t.url) ?? null;
  })
};
function Ft(e, t) {
  const { label: n, placeholder: s, initialValue: r, initialExpand: o = !1, className: i, apiKey: c, onChange: a } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const u = typeof e == "string" ? document.getElementById(e) : e;
  if (!(u instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  if (!c)
    throw new Error("Google Maps API key is required for location input.");
  const f = a ? It(a) : void 0;
  let l = null, d = null, y = null, p = r ?? null;
  const m = Ce(u, "bd-location-input", i);
  u.innerHTML = `<div class="container">
        ${n ? `<p class="label">${n}</p>` : ""}
        <div class="address-container">
            <input type="text" class="address-input" placeholder="${s ?? "Enter address"}" />
            <button class="expand-btn ${o ? "expanded" : ""}"></button>
        </div>
        <div class="fields-container" style="${o ? "" : "display: none;"}">
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
        <div class="map-container"></div>
    </div>`;
  const h = u.querySelector(".container"), v = u.querySelector(".address-input"), g = u.querySelector(".expand-btn"), b = u.querySelector(".map-container"), w = u.querySelector(".fields-container"), L = u.querySelector(".lat-input"), N = u.querySelector(".long-input"), S = u.querySelector(".street-input"), M = u.querySelector(".street-number-input"), A = u.querySelector(".zip-input"), T = u.querySelector(".city-input"), O = u.querySelector(".country-input");
  g.onclick = () => {
    w.style.display = w.style.display === "none" ? "" : "none", g.classList.toggle("expanded");
  }, S.oninput = () => E("street", S.value), M.oninput = () => E("street_number", M.value), A.oninput = () => E("postal_code", A.value), T.oninput = () => E("city", T.value), O.oninput = () => E("country", O.value);
  const E = ($, I) => {
    !p || !p.lat || !p.lng || (p = {
      ...p,
      [$]: I
    }, f && f(p));
  }, H = async () => {
    try {
      await hn(c), r != null && r.lat && (L.value = r.lat), r != null && r.lng && (N.value = r.lng), r != null && r.address && (v.value = r.address), r != null && r.street && (S.value = r.street), r != null && r.street_number && (M.value = r.street_number), r != null && r.postal_code && (A.value = r.postal_code), r != null && r.city && (T.value = r.city), r != null && r.country && (O.value = r.country);
      const $ = r && r.lat && r.lng ? {
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lng)
      } : {
        // Else, San Francisco by default
        lat: 37.7749,
        lng: -122.4194
      };
      l = new google.maps.Map(b, {
        center: $,
        zoom: 13
      }), d = new google.maps.Marker({
        map: l,
        position: $,
        draggable: !0
      }), y = new google.maps.places.Autocomplete(v, {
        types: ["geocode"]
      }), y.addListener("place_changed", () => {
        const I = y == null ? void 0 : y.getPlace();
        if (!(I != null && I.geometry) || !l || !d)
          return;
        const U = I.geometry.location;
        q(I, U.lat(), U.lng());
      }), google.maps.event.addListener(d, "dragend", () => {
        const I = d == null ? void 0 : d.getPosition();
        I && C(I);
      });
    } catch ($) {
      console.error("Error initializing map:", $);
    }
  }, q = ($, I, U) => {
    if ($) {
      if (p = {
        lat: typeof I == "number" ? I.toString() : I,
        lng: typeof U == "number" ? U.toString() : U,
        address: $.formatted_address || "",
        street: "",
        street_number: "",
        city: "",
        postal_code: "",
        admin_locality: "",
        country: ""
      }, $.address_components)
        for (const F of $.address_components)
          switch (F.types[0]) {
            case "route":
              p.street = F.long_name;
              break;
            case "street_number":
              p.street_number = F.long_name;
              break;
            case "locality":
              p.admin_locality = F.long_name;
              break;
            case "postal_code":
              p.postal_code = F.long_name;
              break;
            case "country":
              p.country = F.long_name;
              break;
          }
      if ($.adr_address) {
        const z = new DOMParser().parseFromString($.adr_address, "text/html").querySelector(".locality");
        z && (p.city = z.textContent || "");
      }
      if (!p.city && $.formatted_address) {
        const F = $.formatted_address.split(",").find((ie) => /\b\d{4}\b/.test(ie));
        if (F) {
          const ie = F.replace(/\b\d{4}\b/, "").trim();
          ie && (p.city = ie);
        }
      }
      if (!p.city && p.admin_locality && (p.city = p.admin_locality), L.value = p.lat, N.value = p.lng, v.value = p.address, S.value = p.street, M.value = p.street_number, A.value = p.postal_code, T.value = p.city, O.value = p.country, l && d) {
        const F = new google.maps.LatLng(
          typeof I == "number" ? I : parseFloat(I),
          typeof U == "number" ? U : parseFloat(U)
        );
        l.setCenter(F), d.setPosition(F);
      }
      f && f(p);
    }
  }, C = async ($) => {
    try {
      const U = await (await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${$.lat()},${$.lng()}&key=${c}`
      )).json();
      U.status === "OK" && U.results && U.results.length > 0 && q(U.results[0], $.lat(), $.lng());
    } catch (I) {
      console.error("Reverse geocoding error:", I);
    }
  };
  return H(), {
    destroy: () => {
      l && window.google && window.google.maps && google.maps.event.clearInstanceListeners(l), d && window.google && window.google.maps && google.maps.event.clearInstanceListeners(d), y && window.google && window.google.maps && google.maps.event.clearInstanceListeners(y), h.remove(), m();
    }
  };
}
const Hs = ft(() => import("./index-e5e65037.js")), Is = ft(() => import("./index-0762bf09.js")), Os = {
  type: "phone",
  empty: (e) => !e,
  control: $e(Hs, ({ onChange: e }) => ({
    onChange: (t) => e(Ie(t))
  }))
}, js = /^<p id="[A-Za-z0-9_-]+"><br><\/p>$/, Ds = {
  type: "htmlText",
  empty: (e) => !e,
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: $e(Is, ({ onChange: e }) => ({
    onChange: (t) => e(Ie(js.test(t) ? "" : t))
  }))
}, Ns = {
  type: "location",
  empty: (e) => !e,
  // without a maps key the rich widget can't work — degrade to plain text,
  // exactly what the old add form did by falling through to its text branch
  control: (e) => e.config.apiKey ? $e(Ft, ({ onChange: t }) => ({
    onChange: (n) => t(n || null)
  }))(e) : $e(xe, ({ onChange: t }) => ({
    onChange: (n) => t(Ie(n))
  }))(e)
};
const qs = 6;
function Ps(e) {
  return `"${String(e ?? "").replace(/["\\]/g, "\\$&")}"`;
}
function Fs(e) {
  const t = e.reduce((n, s) => {
    const r = e.find((c) => {
      var a, u, f;
      return ((a = c.obj) == null ? void 0 : a._blitzID.value) === ((f = (u = s.obj) == null ? void 0 : u.parent_fk) == null ? void 0 : f.value);
    });
    if (r) {
      const c = n.find((a) => {
        var u;
        return ((u = a.parent) == null ? void 0 : u.value) === r.value;
      });
      return c ? c.children.push(s) : n.push({ expanded: !0, parent: r, children: [s] }), n;
    }
    if (e.find((c) => {
      var a, u, f;
      return ((u = (a = c.obj) == null ? void 0 : a.parent_fk) == null ? void 0 : u.value) === ((f = s.obj) == null ? void 0 : f._blitzID.value);
    }))
      return n;
    const i = n.find((c) => c.parent === void 0);
    return i ? i.children.push(s) : n.push({ expanded: !0, children: [s] }), n;
  }, []);
  return t.sort((n, s) => {
    const r = n.parent ? e.indexOf(n.parent) : 1 / 0, o = s.parent ? e.indexOf(s.parent) : 1 / 0;
    return r - o;
  }), t;
}
async function $t(e, t) {
  const {
    initialValue: n,
    initialFirst: s,
    initialCallback: r,
    title: o,
    label: i,
    placeholder: c,
    modal: a,
    required: u,
    multiple: f,
    nextButton: l,
    groupByParent: d,
    selectChildrenWithParent: y,
    docLink: p,
    techDocLink: m,
    className: h,
    onSearch: v,
    onChange: g,
    onRefresh: b
  } = t || {};
  if (!e)
    throw new Error("Container parameter missing!");
  const w = typeof e == "string" ? document.getElementById(e) : e;
  if (!(w instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let L = [], N = 0, S = [], M = null, A = -1;
  const T = Ce(w, "bd-picker", h);
  w.innerHTML = `<div class="container">
        ${i ? `<p class="picker-label">${i}</p>` : ""}
        <div class="dropdown">
            <div class="sync-status blitzicon" style="display: none;"></div>
            <p class="picker-value"></p>
            <div class="actions">
                <div class="picker-spinner"></div>
                ${l && !f ? '<div class="next-btn" style="display: none;"></div>' : ""}
                ${!u && !f ? '<div class="clear-btn" style="display: none;"></div>' : ""}
                <div class="arrow-btn"></div>
            </div>
            ${b || p || m || a ? `<div class="meta-actions">
                ${b ? '<div class="refresh-btn blitzicon">&#xe812;</div>' : ""}
                ${p ? `<a class="doc-btn blitzicon" target="_blank" href="${p}">&#xe90f;</a>` : ""}
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
  const O = w.querySelector(".dropdown"), E = w.querySelector(".sync-status"), H = w.querySelector(".picker-spinner"), q = w.querySelector(".picker-value"), C = w.querySelector(".empty"), $ = w.querySelector(".search-input"), I = w.querySelector(".menu"), U = w.querySelector(".container"), F = w.querySelector(".list"), ie = w.querySelector(".refresh-btn"), z = w.querySelectorAll(".doc-btn"), J = w.querySelector(".clear-btn"), Z = w.querySelector(".next-btn"), pe = w.querySelector(".expand-btn"), ce = () => {
    I && (I.style.display = "none");
  }, be = () => {
    if (!I)
      return;
    I.style.display = "";
    const R = I.offsetHeight + qs, ne = window.innerHeight - O.getBoundingClientRect().bottom, ae = U.getBoundingClientRect().top;
    w.classList.toggle("drop-up", ne < R && ae >= R);
  }, j = () => {
    I && (I.style.display === "none" ? be() : ce());
  }, _ = (R, ne) => {
    S = R;
    for (const ae of F.querySelectorAll(".list-item-hovered"))
      ae.classList.remove("list-item-hovered");
    for (const ae of F.querySelectorAll(".list-item-checkbox"))
      ae.checked = !1;
    if (q)
      if (S.length > 0 && L.length > 0) {
        if (q.classList.remove("picker-placeholder"), q.innerHTML = (o ? `<b>${de(o)}: </b>` : "") + (S.map((ae) => de(ae.label)).join(", ") || "/"), J && (J.style.display = ""), Z) {
          const ae = L.findIndex((le) => le.value === S[0].value);
          ae > -1 && ae < L.length - 1 ? Z.style.display = "" : Z.style.display = "none";
        }
        for (const ae of S) {
          const le = Ps(ae.value), me = F.querySelector(`.list-item button[value=${le}]`);
          me && me.parentElement && me.parentElement.classList.add("list-item-hovered");
          const ge = F.querySelector(`.group-label[value=${le}]`);
          ge && ge.parentElement && ge.parentElement.classList.add("list-item-hovered");
          const ye = F.querySelector(`.list-item-checkbox[value=${le}]`);
          ye && (ye.checked = !0);
        }
        g && !ne && g(S);
      } else
        q.removeAttribute("values"), q.classList.add("picker-placeholder"), q.innerText = c ?? "", J && (J.style.display = "none"), Z && (Z.style.display = "none"), g && !ne && g([]);
  }, B = (R) => {
    S.find((ne) => ne.value === R.value) ? (S.length > 1 || !u) && _(S.filter((ne) => ne.value !== R.value)) : f ? _([...S, R]) : (_([R]), _e(w));
  }, k = () => {
    if (H.style.display = "none", C && (C.style.display = L.length === 0 ? "" : "none"), $ && ($.style.display = N > 7 ? "" : "none"), F) {
      const R = !!($ != null && $.value);
      let ne = [];
      if (d && L.some((le) => !!le.obj)) {
        ne = Fs(L), F.innerHTML = ne.map(({ expanded: le, parent: me, children: ge }) => {
          let ye = !1;
          const Ee = ge.map((Le) => {
            const Ue = S.find((it) => it.value === Le.value);
            return !ye && Ue && (ye = !0), `<div class="list-item ${Ue ? "list-item-hovered" : ""}">
                            ${f ? `<input value="${de(Le.value)}" class="list-item-checkbox" type="checkbox" ${Ue ? "checked" : ""}>` : ""}
                            <button value="${de(Le.value)}">${de(Le.label)}</button>
                        </div>`;
          }).join(`
`);
          if (!me)
            return Ee;
          const Se = S.find((Le) => Le.value === me.value), Me = R ? le : ye;
          return `
                        <div class="group-header ${Se ? "list-item-hovered" : ""} ${Me ? "expanded" : ""}">
                            <div class="group-toggle">
                                <div class="group-toggle-icon"></div>
                            </div>
                            ${f ? `<input value="${de(me.value)}" class="list-item-checkbox" type="checkbox" ${Se ? "checked" : ""}>` : ""}
                            <p value="${de(me.value)}" class="group-label">${de(me.label)}</p>
                        </div>
                        <div class="group-items ${f ? "multiple-group" : ""}" ${Me ? "" : 'style="display: none;"'}>
                            ${Ee}
                        </div>
                    `;
        }).join(`
`);
        for (const le of F.querySelectorAll(".group-header .group-toggle"))
          le.addEventListener("click", (me) => {
            me.stopPropagation();
            const ge = le.parentElement, ye = ge == null ? void 0 : ge.querySelector(".group-label"), Ee = ye == null ? void 0 : ye.getAttribute("value");
            if (Ee && ge) {
              const Se = ne.find((Me) => {
                var Le;
                return ((Le = Me.parent) == null ? void 0 : Le.value) === Ee;
              });
              if (Se) {
                const Me = ge.classList.contains("expanded");
                Se.expanded = !Me, ge.classList.toggle("expanded");
                const Le = ge.nextElementSibling;
                Le && (Le.style.display = Se.expanded ? "" : "none");
              }
            }
          });
      } else
        F.innerHTML = L.map((le) => {
          const me = S.find((ge) => ge.value === le.value);
          return `<div class="list-item ${me ? "list-item-hovered" : ""}">
                            ${f ? `<input value="${de(le.value)}" class="list-item-checkbox" type="checkbox" ${me ? "checked" : ""}>` : ""}
                            <button value="${de(le.value)}">${de(le.label)}</button>
                        </div>`;
        }).join(`
`);
      const ae = (le) => {
        const me = L.find((ge) => ge.value === le.currentTarget.getAttribute("value"));
        if (me) {
          if (f && d && y) {
            const ge = ne.find((ye) => {
              var Ee;
              return ((Ee = ye.parent) == null ? void 0 : Ee.value) === me.value;
            });
            if (ge)
              if (S.find((Ee) => Ee.value === me.value)) {
                const Ee = ge.children.map((Se) => Se.value);
                _(S.filter((Se) => Se.value !== me.value && !Ee.includes(Se.value)));
              } else {
                const Ee = ge.children.filter((Se) => !S.find((Me) => Me.value === Se.value));
                _([...S, me, ...Ee]);
              }
            else
              B(me);
          } else
            B(me);
          f || ce();
        }
      };
      for (const le of [...F.querySelectorAll(".list-item button"), ...F.querySelectorAll(".group-label")])
        le.addEventListener("click", ae);
      for (const le of F.querySelectorAll(".list-item-checkbox"))
        le.addEventListener("change", ae);
    }
  }, V = (R) => {
    var ne;
    R && (R.status === D.Completed && !M || (M = R.status, A > -1 && (clearTimeout(A), A = -1), E.style.display = "initial", E.style.cursor = "initial", E.onclick = null, R.status === D.Pending ? (E.innerHTML = "&#xe91e;", E.style.color = "#d5d5d5") : R.status === D.Failed ? (E.innerHTML = "&#xe91a;", E.style.color = "#a82e25", (ne = R.job) != null && ne.message && (E.style.cursor = "pointer", E.onclick = (ae) => {
      var le;
      ae.stopPropagation(), alert((le = R.job) == null ? void 0 : le.message);
    })) : R.status === D.Conflict ? (E.innerHTML = "&#xe91d;", E.style.color = "#a82e25", E.title = "Conflict") : R.status === D.Completed && (E.innerHTML = "&#xe91c;", E.style.color = "#0ac96a", A = window.setTimeout(() => {
      E.style.display = "none", A = -1;
    }, 1e3))));
  };
  I.addEventListener("click", (R) => R.stopPropagation()), O && (O.addEventListener("click", j), document.addEventListener("click", (R) => {
    O.contains(R.target) || ce();
  }));
  const se = async (R) => {
    v && (L = await v(R)), R || (N = L.length);
  }, fe = It(async (R) => {
    H.style.display = "block", await se(R), k();
  });
  $ && $.addEventListener("input", (R) => {
    fe(R.target.value);
  }), J && J.addEventListener("click", (R) => {
    R.stopPropagation(), ce(), _([]);
  }), Z && Z.addEventListener("click", (R) => {
    R.stopPropagation(), ce();
    const ne = L.findIndex((ae) => {
      var le;
      return ae.value === ((le = S[0]) == null ? void 0 : le.value);
    });
    ne > -1 && ne < L.length - 1 && _([L[ne + 1]]);
  }), ie && b && ie.addEventListener("click", async (R) => {
    R.stopPropagation(), H.style.display = "block", await b(), await se(""), k();
  }), pe && pe.addEventListener("click", (R) => {
    R.stopPropagation(), ce(), Vs({
      items: L,
      selected: S,
      onChange: B
    });
  });
  for (const R of z)
    R.addEventListener("click", (ne) => ne.stopPropagation());
  return await se(""), _(
    n ? (n instanceof Array ? n : [n]).map((R) => L.find((ne) => ne.value === R)).filter((R) => !!R) : s && L[0] ? [L[0]] : [],
    !r
  ), k(), {
    handleSyncStatus: V,
    destroy: () => {
      for (const R of w.childNodes)
        R.remove();
      w.classList.remove("drop-up"), T();
    }
  };
}
function Vs(e) {
  const { items: t, selected: n, onChange: s } = e;
  if (!Array.isArray(t) || !s)
    throw new Error("Missing parameters!");
  let r = t;
  const o = document.createElement("div");
  o.className = "bd-picker-modal", o.setAttribute("data-bd-portal", "");
  const i = document.createElement("div");
  i.className = "box", o.append(i), i.innerHTML = `<div class="wrapper">
        <div class="close-btn">&times;</div>
        <input class="search-input" type="text" placeholder="Search..." />
        <p class="empty" style="display: none;">No results found!</p>
        <div class="list"></div>
    </div>`;
  const c = i.querySelector(".close-btn"), a = i.querySelector(".search-input"), u = i.querySelector(".empty"), f = i.querySelector(".list"), l = () => {
    if (u && (u.style.display = r.length === 0 ? "" : "none"), f) {
      f.innerHTML = r.map((y) => `<div value="${de(y.value)}" class="list-item ${n.find((p) => p.value === y.value) ? "list-item-hovered" : ""}">
                    ${de(y.label)}
                </div>`).join(`
`);
      for (const y of f.querySelectorAll("div"))
        y.addEventListener("click", (p) => {
          const m = t.find((h) => h.value === p.target.getAttribute("value"));
          m && (s(m), d());
        });
    }
  }, d = () => o.remove();
  o.addEventListener("click", d), c.addEventListener("click", d), i.addEventListener("click", (y) => y.stopPropagation()), a && a.addEventListener("input", (y) => {
    const p = y.target.value;
    p ? (r = t.filter((m) => m.label.match(new RegExp(Ye(p), "gi"))), r.sort((m, h) => m.label.length - h.label.length)) : r = t, l();
  }), l(), document.body.append(o);
}
async function nt(e, t) {
  var f;
  const { model: n, attribute: s, excludeOptions: r, onChange: o, ...i } = t || {};
  if (!n)
    throw new Error("Model property missing!");
  if (!s)
    throw new Error("Attribute name property missing!");
  let c = (((f = n.getAttributeDetails(s)) == null ? void 0 : f.options) || []).map((l) => ({
    value: l,
    label: l[0].toUpperCase() + l.slice(1)
  }));
  Array.isArray(r) && r.length > 0 && (c = c.filter((l) => !r.includes(l.value)));
  const { handleSyncStatus: a, destroy: u } = await $t(
    e,
    {
      ...i,
      onSearch: async (l) => {
        if (l) {
          const d = c.filter((y) => y.label.match(new RegExp(Ye(l), "gi")));
          return d.sort((y, p) => y.label.length - p.label.length), d;
        } else
          return c;
      },
      onChange: (l) => {
        o && o(l.map((d) => d.value));
      }
    }
  );
  return { handleSyncStatus: a, destroy: u };
}
async function rt(e, t) {
  const { model: n, conditions: s, limit: r, sortDirection: o, labelAttribute: i, initialLabel: c, initialValue: a, onChange: u, ...f } = t || {};
  if (!n)
    throw new Error("Model property missing!");
  var l = null;
  const d = n.getAttributesDetails();
  let y = i;
  if (!y && d) {
    for (const g in d)
      if (typeof d[g].type == "string" && ["varchar", "text"].includes(d[g].type)) {
        y = g;
        break;
      }
  }
  let p = [], m = a;
  if (a || c && y)
    try {
      const g = c instanceof Array ? c : typeof c == "string" ? [c] : void 0, b = a instanceof Array ? a : typeof a == "string" ? [a] : void 0;
      p = await n.list({
        forceLocal: !0,
        // TODO: Change to HTTP | Condition caused a server error
        conditions: [
          ...g && y ? [[y, "IN", g]] : [["_blitzID", "IN", b]],
          ...s ?? []
        ]
      }), p.length > 0 && (m = p.map((w) => w._blitzID.value).filter((w) => w != null));
    } catch (g) {
      g.stack && console.error(g.stack);
    }
  const { handleSyncStatus: h, destroy: v } = await $t(
    e,
    {
      ...f,
      initialValue: m,
      onSearch: async (g) => {
        try {
          l && l.abort(), l = new AbortController();
          const b = g && y, w = await n.list({
            signal: l.signal,
            forceHttp: !0,
            customSortDirection: o,
            limit: r ?? 100,
            conditions: b || s ? [
              ...b ? [[y, "LIKE", `%${g}%`]] : [],
              ...s ?? []
            ] : void 0
          }), L = p.every((S) => !!w.find((M) => M._blitzID.value === S._blitzID.value)), N = (b || L ? w : [...p, ...w]).map((S) => ({
            obj: S,
            value: S._blitzID.value,
            label: y ? S[y].value ?? "/" : "/"
          })).filter((S, M, A) => A.findIndex((T) => T.value === S.value) === M);
          return b && N.sort((S, M) => S.label.length - M.label.length), N;
        } catch (b) {
          return b.message.includes("AbortError") || b.message.includes("The user aborted a request") ? [] : (b.stack && console.error(b.stack), []);
        }
      },
      onChange: (g) => {
        u && u(g.map((b) => b.obj));
      }
    }
  );
  return { handleSyncStatus: h, destroy: v };
}
const Qt = (e) => ({ getAttributeDetails: () => e.attributeDetails }), zs = {
  type: ["enum", "enum[]"],
  control: async (e) => {
    const { host: t, value: n, onChange: s, config: r, status: o } = e, { handleSyncStatus: i, destroy: c } = await nt(t, {
      ...r,
      model: Qt(e),
      attribute: r.className ?? "value",
      initialValue: n,
      multiple: !!r.multiple,
      onChange: (u) => s(r.multiple ? Ie(u) : u[0] ?? null)
    }), a = o == null ? void 0 : o(i);
    return () => {
      a == null || a(), c();
    };
  },
  filter: async (e) => {
    const { host: t, value: n, onChange: s, config: r } = e, { destroy: o } = await nt(t, {
      ...r,
      model: Qt(e),
      attribute: r.className ?? "value",
      initialValue: n == null ? void 0 : n.values,
      multiple: !0,
      onChange: (i) => s(i.length > 0 ? { op: "in", values: i } : null)
    });
    return () => o();
  }
}, Vt = async (e, t) => {
  const n = await e.resolveModel(
    Array.isArray(e.attributeDetails.type) ? e.attributeDetails.type[0] : e.attributeDetails.type
  );
  return rt(e.host, { ...e.config, model: n, groupByParent: !0, ...t });
}, En = async (e) => {
  var n;
  const { destroy: t } = await Vt(e, {
    multiple: !0,
    limit: 100,
    selectChildrenWithParent: !0,
    initialValue: (n = e.value) == null ? void 0 : n.values,
    onChange: (s) => e.onChange(s.length > 0 ? { op: "in", values: s.map((r) => r._blitzID.value) } : null)
  });
  return () => t();
}, Bs = {
  type: "fk",
  control: async (e) => {
    var r;
    const { handleSyncStatus: t, destroy: n } = await Vt(e, {
      multiple: !1,
      initialValue: e.value,
      onChange: (o) => {
        var i;
        return e.onChange(((i = o[0]) == null ? void 0 : i._blitzID.value) ?? null);
      }
    }), s = (r = e.status) == null ? void 0 : r.call(e, t);
    return () => {
      s == null || s(), n();
    };
  },
  filter: En
}, Rs = {
  type: "user",
  defaultConfig: { usersModel: "0BAUsers", labelAttribute: "username" },
  filter: async (e) => {
    var s;
    const t = await e.resolveModel(e.config.usersModel), { destroy: n } = await rt(e.host, {
      ...e.config,
      model: t,
      multiple: !0,
      limit: 100,
      initialValue: (s = e.value) == null ? void 0 : s.values,
      onChange: (r) => e.onChange(r.length > 0 ? { op: "in", values: r.map((o) => o._blitzID.value) } : null)
    });
    return () => n();
  }
}, Us = {
  type: "mtm",
  default: () => null,
  control: async (e) => {
    var r;
    const { handleSyncStatus: t, destroy: n } = await Vt(e, {
      multiple: !0,
      initialValue: e.value,
      onChange: (o) => e.onChange(o.length > 0 ? o.map((i) => i._blitzID.value) : null)
    }), s = (r = e.status) == null ? void 0 : r.call(e, t);
    return () => {
      s == null || s(), n();
    };
  },
  filter: En
}, Ws = [
  ls,
  cs,
  ds,
  us,
  fs,
  ps,
  ms,
  ys,
  hs,
  gs,
  vs,
  bs,
  ws,
  Es,
  $s,
  Ss,
  Cs,
  Ls,
  xs,
  As,
  Os,
  Ds,
  Ns,
  zs,
  Bs,
  Us,
  Rs
];
function pt(e, t, n = !1) {
  const s = e.replace(/[^\d+]/g, ""), r = [];
  if (s.length === 10)
    r.push(s.slice(0, 3)), r.push(s.slice(3, 6)), r.push(s.slice(6, 8)), r.push(s.slice(8, 10));
  else if (s.length === 9)
    r.push(s.slice(0, 3)), r.push(s.slice(3, 6)), r.push(s.slice(6, 9));
  else if (s.length === 11)
    r.push(s.slice(0, 3)), r.push(s.slice(3, 7)), r.push(s.slice(7, 11));
  else
    for (let i = 0; i < s.length; i += 3)
      r.push(s.slice(i, i + 3));
  const o = r.filter(Boolean).join(" ");
  return t && n ? `${t} ${o}` : o;
}
function Gt(e, t = !0) {
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: t }).format(e).replace(/\./g, "'").replace(/,/g, ".");
}
function $n(e, t) {
  if (!t)
    return Gt(e);
  try {
    return new Intl.NumberFormat("de-DE", { currency: t, style: "currency" }).format(e).replace(/\./g, "'").replace(/,/g, ".");
  } catch {
    return `${Gt(e)} ${t}`;
  }
}
function Ks(e) {
  if (e === "" || e === null || e === void 0)
    return "";
  const t = parseFloat(e);
  return isNaN(t) ? String(e) : String(Math.round(t * 1e4) / 1e4);
}
function Js(e) {
  const t = Math.max(0, Math.floor(e));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor(t % 86400 / 3600),
    m: Math.floor(t % 3600 / 60),
    s: t % 60
  };
}
function Zs(e) {
  if (typeof e == "number" && Number.isFinite(e))
    return Math.max(0, Math.floor(e));
  if (typeof e != "string" || e.trim() === "")
    return null;
  if (/^\d+$/.test(e.trim()))
    return parseInt(e.trim(), 10);
  const t = { d: 86400, h: 3600, m: 60, s: 1 };
  let n = 0, s = !1;
  for (const [, r, o] of e.matchAll(/(\d+)\s*([dhms])/gi))
    n += parseInt(r, 10) * t[o.toLowerCase()], s = !0;
  return s ? n : null;
}
function Ys(e, t) {
  const n = [];
  let s = 0;
  for (; s < e.length; ) {
    const l = e.charAt(s);
    if (l === " " || l === "	") {
      s++;
      continue;
    }
    if ("+-*/()".includes(l)) {
      n.push({ kind: l }), s++;
      continue;
    }
    if (l >= "0" && l <= "9" || l === ".") {
      let d = s;
      for (; d < e.length && (e[d] >= "0" && e[d] <= "9" || e[d] === "."); )
        d++;
      n.push({ kind: "num", value: parseFloat(e.substring(s, d)) }), s = d;
      continue;
    }
    if (l === "_" || /[a-zA-Z]/.test(l)) {
      let d = s;
      for (; d < e.length && /[a-zA-Z0-9_]/.test(e[d]); )
        d++;
      n.push({ kind: "id", name: e.substring(s, d) }), s = d;
      continue;
    }
    throw new Error(`Unexpected character in formula: ${l}`);
  }
  let r = 0;
  const o = () => n[r], i = (l) => {
    const d = n[r];
    if (!d || d.kind !== l)
      throw new Error(`Expected ${l}`);
    return r++, d;
  };
  function c() {
    let l = a();
    for (; o() && (o().kind === "+" || o().kind === "-"); ) {
      const d = n[r++].kind, y = a();
      l = d === "+" ? l + y : l - y;
    }
    return l;
  }
  function a() {
    let l = u();
    for (; o() && (o().kind === "*" || o().kind === "/"); ) {
      const d = n[r++].kind, y = u();
      l = d === "*" ? l * y : l / y;
    }
    return l;
  }
  function u() {
    const l = o();
    if (!l)
      throw new Error("Unexpected end of formula");
    if (l.kind === "-")
      return r++, -u();
    if (l.kind === "num")
      return r++, l.value;
    if (l.kind === "(") {
      r++;
      const d = c();
      return i(")"), d;
    }
    if (l.kind === "id")
      return r++, t(l.name);
    throw new Error(`Unexpected token: ${l.kind}`);
  }
  const f = c();
  if (r !== n.length)
    throw new Error("Trailing tokens in formula");
  return f;
}
function Xs(e, t) {
  const n = Object.keys(e);
  if (n.length === 0)
    return "";
  if (t) {
    if (typeof e[t] == "string")
      return e[t];
    const r = t.split("_")[0], o = n.find((i) => i === r || i.startsWith(`${r}_`));
    if (o && typeof e[o] == "string")
      return e[o];
  }
  if (typeof e.default == "string")
    return e.default;
  const s = n.find((r) => typeof e[r] == "string");
  return s ? e[s] : "";
}
const Qs = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
function Gs(e) {
  const t = e.match(Qs);
  return t ? t[1] : null;
}
function er(e) {
  if (e.thumbnail)
    return e.thumbnail;
  if (e["tn-oq"])
    return e["tn-oq"];
  const t = e.url ? Gs(e.url) : null;
  return t ? `https://img.youtube.com/vi/${t}/hqdefault.jpg` : null;
}
const qe = (e) => e == null || e === "" || Array.isArray(e) && e.length === 0;
function Sn(e, t) {
  var s, r, o, i;
  const n = (o = (r = (s = e._object) == null ? void 0 : s.model) == null ? void 0 : r.getAttributesDetails) == null ? void 0 : o.call(r);
  return (i = n == null ? void 0 : n[e._name]) == null ? void 0 : i[t];
}
function Cn(e) {
  const t = Sn(e, "unit"), n = Array.isArray(t) ? t[0] : t;
  return typeof n == "string" && n !== "" ? n : void 0;
}
const tr = (e, t) => {
  const n = parseFloat(e.value);
  return qe(e.value) || isNaN(n) ? "" : `<p class="${e._name} bd-currency">${(t == null ? void 0 : t.labelHtml) ?? ""}${$n(n, Cn(e))}</p>`;
}, nr = (e, t) => qe(e.value) ? "" : `<p class="${e._name} bd-percentage">${(t == null ? void 0 : t.labelHtml) ?? ""}${de(Ks(e.value))} <span class="bd-percentage-sign">%</span></p>`, sr = (e, t) => {
  const n = Zs(e.value);
  if (n === null)
    return "";
  const s = Js(n), r = ["d", "h", "m", "s"].filter((i) => s[i] > 0), o = (r.length > 0 ? r : ["s"]).map(
    (i) => `<span class="bd-duration-part bd-duration-${i}"><span class="bd-duration-value">${s[i]}</span><span class="bd-duration-unit">${i}</span></span>`
  );
  return `<p class="${e._name} bd-duration">${(t == null ? void 0 : t.labelHtml) ?? ""}${o.join(" ")}</p>`;
}, rr = (e, t) => {
  if (qe(e.value))
    return "";
  const n = e.value;
  return `<div class="${e._name} bd-email">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="mailto:${ke(n)}">${de(n)}</a></p>
                </div>`;
}, ir = (e, t) => {
  var a;
  if (qe(e.value))
    return "";
  const n = e.value, s = n.split("-"), r = (a = s[0]) != null && a.startsWith("+") ? s[0] : `+${s[0]}`, o = s.length === 2 ? pt(s[1], r, !0) : pt(n), i = n.replace(/[^\d+]/g, ""), c = s.length === 2 && !i.startsWith("+") ? `+${i}` : i;
  return `<div class="${e._name} bd-phone">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="tel:${ke(c)}">${de(o)}</a></p>
                </div>`;
}, or = (e, t) => qe(e.value) ? "" : `<div class="${e._name} bd-url">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <a href="${ke(e.value)}" target="_blank" rel="noopener noreferrer">${de(e.value)}</a>
                </div>`, ar = (e, t) => {
  const n = e.value;
  return n != null && n.url ? `<p class="${e._name} bd-file">${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="${ke(n.url)}" target="_blank" rel="noopener noreferrer">${de(n.url)}</a></p>` : "";
}, lr = (e, t) => {
  const n = e.value;
  if (qe(n))
    return "";
  const s = typeof n == "object" ? Xs(n, re == null ? void 0 : re.defaultLanguage) : String(n);
  return s === "" ? "" : `<p class="${e._name} bd-texti18n bd-text">${(t == null ? void 0 : t.labelHtml) ?? ""}${de(s)}</p>`;
};
function cr(e) {
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
  return t.map((n) => tt(n)).filter((n) => n != null && n !== "").map((n) => String(n).split("|")[0]);
}
const dr = (e, t) => {
  if (qe(e.value))
    return "";
  const n = cr(e.value);
  return n.length === 0 ? "" : `<div class="${e._name} bd-tag">${(t == null ? void 0 : t.labelHtml) ?? ""}${n.map((s) => `<span class="bd-tag-chip">${de(s)}</span>`).join(" ")}</div>`;
}, ur = (e, t) => {
  const n = typeof e.value == "string" ? { url: e.value } : e.value;
  if (!(n != null && n.url))
    return "";
  const s = er(n), r = s ? `<span class="bd-youtube-poster"><span class="bd-youtube-play"></span><img alt="" src="${ke(s)}" /></span>` : '<span class="bd-youtube-label">&#9654; YOUTUBE</span>';
  return `<div class="${e._name} bd-youtube bd-video">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <a href="${ke(n.url)}" target="_blank" rel="noopener noreferrer">${r}</a>
                </div>`;
}, fr = (e, t) => {
  var f, l;
  const n = Sn(e, "formula"), s = typeof n == "string" && n !== "" ? n : e.value;
  if (qe(s) || typeof s != "string")
    return "";
  const r = s.replace(/^\s*=/, ""), o = ((f = e._object) == null ? void 0 : f._attributes) ?? {}, i = {};
  for (const d of Object.keys(o))
    i[d.toLowerCase()] = (l = o[d]) == null ? void 0 : l.value;
  let c;
  try {
    c = Ys(r, (d) => {
      const y = d.toLowerCase();
      if (!(y in i))
        throw new Error(`Unknown field in formula: ${d}`);
      const p = parseFloat(i[y]);
      return isNaN(p) ? 0 : p;
    });
  } catch {
    return `<p class="${e._name} bd-formula" title="${de(r)}"></p>`;
  }
  const a = Cn(e), u = a ? $n(c, a) : String(c);
  return `<p class="${e._name} bd-formula" title="${de(r)}">${(t == null ? void 0 : t.labelHtml) ?? ""}${u}</p>`;
}, pr = (e, t) => qe(e.value) ? "" : `<p class="${e._name} bd-hex">${(t == null ? void 0 : t.labelHtml) ?? ""}${de(e.value)}</p>`, mr = (e, t) => {
  const n = e.value;
  if (!n || !n.lat && !n.lng && !n.address && !n.city)
    return "";
  const s = n.address ?? [n.street, n.street_number, n.city, n.country].filter(Boolean).join(" "), r = n.lat && n.lng ? ` data-lat="${de(n.lat)}" data-lng="${de(n.lng)}"` : "";
  return `<div class="${e._name} bd-location"${r}>
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    ${s ? `<span class="bd-location-address">${de(s)}</span>` : ""}
                </div>`;
}, yr = {
  currency: tr,
  percentage: nr,
  duration: sr,
  email: rr,
  phone: ir,
  url: or,
  file: ar,
  texti18n: lr,
  tag: dr,
  youtube: ur,
  formula: fr,
  hex: pr,
  location: mr
}, hr = (e, t) => {
  const n = t.value, s = re == null ? void 0 : re.googleMapsApiKey;
  if (!(n != null && n.lat) || !(n != null && n.lng) || !s)
    return;
  let r = !1;
  return Ht(n.lat, n.lng, s).then((o) => {
    o && !r && e.appendChild(o);
  }).catch(() => {
  }), () => {
    r = !0;
  };
};
function Ln(e) {
  for (const [t, n] of Object.entries(yr))
    e.registry.mergeBuiltin(t, {
      view: et(n, t === "location" ? hr : void 0)
    });
  e.registry.mergeBuiltin("duration", { editor: He(je(() => import("./duration-ea0021fd.js"))) }), e.registry.mergeBuiltin("percentage", { editor: He(je(() => import("./percentage-3f3b4ee8.js"))) }), e.registry.mergeBuiltin("tag", { editor: He(je(() => import("./tag-9ea66847.js"))) }), e.registry.mergeBuiltin("youtube", { editor: He(je(() => import("./youtube-19361052.js"))) }), e.registry.mergeBuiltin("json", { editor: He(je(() => import("./json-3b757dc8.js"))) }), e.registry.mergeBuiltin("markdown", { editor: He(je(() => import("./markdown-e4b955d9.js"))) }), e.registry.mergeBuiltin("code", { editor: He(je(() => import("./code-b880a8d4.js"))) });
}
async function gr(e, t) {
  const { projectID: n, projectModel: s, onChange: r, ...o } = t || {}, i = n ? [n] : [];
  if (i.length === 0) {
    const l = await we._Model.get(s || "_Project");
    if (!l)
      throw new Error("Model name is incorrect!");
    i.push(
      ...(await l.list()).map((d) => s ? d.project_fk.value : d._blitzID.value).filter((d) => !!d)
    );
  }
  const c = async () => {
    let l = [];
    for (const d of i)
      l.push(...await we.listProjectUsers(d));
    return l.filter((d, y, p) => p.findIndex((m) => m.id === d.id) === y).map((d) => ({ value: d.id, label: d.username, user: d }));
  };
  let a = await c();
  const { handleSyncStatus: u, destroy: f } = await $t(
    e,
    {
      ...o,
      onSearch: async (l) => {
        if (l) {
          const d = a.filter((y) => y.label.match(new RegExp(Ye(l), "gi")));
          return d.sort((y, p) => y.label.length - p.label.length), d;
        } else
          return a;
      },
      onChange: (l) => {
        r && r(l.map((d) => d.user));
      },
      onRefresh: async () => {
        for (const l of i)
          Kn.setProjectUsers(l, null);
        a = await c();
      }
    }
  );
  return { handleSyncStatus: u, destroy: f };
}
async function vr(e, t) {
  const { items: n, onChange: s, ...r } = t || {};
  if (!Array.isArray(n))
    throw new Error("Items property missing!");
  const o = n.map((a) => typeof a == "string" ? { value: a, label: a } : a), { handleSyncStatus: i, destroy: c } = await $t(
    e,
    {
      ...r,
      onSearch: async (a) => {
        if (a) {
          const u = o.filter((f) => f.label.match(new RegExp(Ye(a), "gi")));
          return u.sort((f, l) => f.label.length - l.label.length), u;
        } else
          return o;
      },
      onChange: (a) => {
        s && s(a.map((u) => u.value));
      }
    }
  );
  return { handleSyncStatus: i, destroy: c };
}
async function br(e, t, n) {
  var a;
  if (!e || !e._name || !e._object || !e._object.model)
    throw new Error("Fk type missing properties!");
  const s = (a = e._object.model.getAttributeDetails(e._name)) == null ? void 0 : a.type;
  if (!s)
    throw new Error("Model attributes invalid!");
  const r = await we._Model.get(s), { handleSyncStatus: o, destroy: i } = await rt(t, {
    ...n,
    model: r,
    initialValue: e.value,
    initialLabel: void 0,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !1,
    onChange: async (u) => {
      var f;
      await e.edit(((f = u[0]) == null ? void 0 : f._blitzID.value) ?? null);
    }
  }), c = e.syncStatus(o);
  return {
    destroy: () => {
      c(), i();
    }
  };
}
async function wr(e, t, n) {
  if (!e || !e._name || !e._object || !e._object.model)
    throw new Error("Enum type missing properties!");
  const { handleSyncStatus: s, destroy: r } = await nt(t, {
    ...n,
    model: e._object.model,
    attribute: e._name,
    initialValue: e.value,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !1,
    onChange: async (i) => {
      await e.edit(i[0] ?? null);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Er(e, t, n) {
  if (!e)
    throw new Error("Varchar type missing properties!");
  const { handleSyncStatus: s, destroy: r } = xe(t, {
    ...n,
    multiple: !1,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function en(e, t, n) {
  if (!e)
    throw new Error("Text type missing properties!");
  const { handleSyncStatus: s, getValue: r, isPending: o, cancelPending: i, destroy: c } = Re(t, {
    ...n,
    multiple: !1,
    initialValue: (n == null ? void 0 : n.draft) ?? e.value,
    onChange: async (u) => {
      await e.edit(u);
    }
  }), a = e.syncStatus(s);
  return {
    getDraft: r,
    isPending: o,
    cancelPending: i,
    destroy: () => {
      a(), c();
    }
  };
}
async function $r(e, t, n) {
  if (!e)
    throw new Error("Email type missing properties!");
  const { handleSyncStatus: s, destroy: r } = xe(t, {
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
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Sr(e, t, n) {
  if (!e)
    throw new Error("Url type missing properties!");
  const { handleSyncStatus: s, destroy: r } = xe(t, {
    ...n,
    multiple: !1,
    type: "url",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" />
        </svg>`,
    pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    errorMsg: "Wrong URL!",
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function tn(e, t, n) {
  if (!e)
    throw new Error("Number type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Ne(t, {
    ...n,
    float: !1,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Ct(e, t, n) {
  if (!e)
    throw new Error("Number type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Ne(t, {
    ...n,
    float: !0,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Cr(e, t, n) {
  if (!e)
    throw new Error("Boolean type missing properties!");
  const { handleSyncStatus: s, destroy: r } = jt(t, {
    ...n,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Lr(e, t, n) {
  if (!e)
    throw new Error("JSON type missing properties!");
  const { handleSyncStatus: s, getValue: r, isPending: o, cancelPending: i, destroy: c } = Re(t, {
    ...n,
    multiple: !1,
    initialValue: (n == null ? void 0 : n.draft) ?? (e.value ? JSON.stringify(e.value, null, 2) : ""),
    onChange: async (u) => {
      let f = null;
      try {
        u && (f = JSON.parse(u) ?? null);
      } catch {
      }
      await e.edit(f);
    }
  }), a = e.syncStatus(s);
  return {
    getDraft: r,
    isPending: o,
    cancelPending: i,
    destroy: () => {
      a(), c();
    }
  };
}
async function xr(e, t, n) {
  var u;
  if (!e)
    throw new Error("Code type missing properties!");
  const { handleSyncStatus: s, getValue: r, isPending: o, cancelPending: i, destroy: c } = Re(t, {
    ...n,
    multiple: !1,
    initialValue: (n == null ? void 0 : n.draft) ?? ((u = e.value) == null ? void 0 : u.content) ?? "",
    onChange: async (f) => {
      var l;
      await e.edit({
        content: f,
        language: ((l = e.value) == null ? void 0 : l.language) ?? null
      });
    }
  }), a = e.syncStatus(s);
  return {
    getDraft: r,
    isPending: o,
    cancelPending: i,
    destroy: () => {
      a(), c();
    }
  };
}
async function kr(e, t, n) {
  if (!e)
    throw new Error("Date type missing properties!");
  const { handleSyncStatus: s, destroy: r } = st(t, {
    ...n,
    time: !1,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Mr(e, t, n) {
  if (!e)
    throw new Error("DateTime type missing properties!");
  const { handleSyncStatus: s, destroy: r } = st(t, {
    ...n,
    time: !0,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Tr(e, t, n) {
  if (!e)
    throw new Error("Image type missing properties!");
  const { handleSyncStatus: s, destroy: r } = wt(t, {
    ...n,
    multiple: !1,
    initialPreviewImages: (e.value ?? []).filter((i) => i.base && i["180x180"]).map((i) => i.base + i["180x180"].substring(1)),
    onChange: async (i) => {
      s({ status: D.Pending });
      const c = [];
      for (const a of i) {
        const u = await we.uploader(a);
        c.push(u);
      }
      await e.edit(c);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function _r(e, t, n) {
  if (!e)
    throw new Error("Video type missing properties!");
  const { handleSyncStatus: s, destroy: r } = qt(t, {
    ...n,
    multiple: !1,
    onChange: async (i) => {
      if (i.length > 0) {
        s({ status: D.Pending });
        const c = await we.uploaderVideo(i[0]);
        await e.edit(c);
      }
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Ar(e, t, n) {
  if (!e)
    throw new Error("File type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Pt(t, {
    ...n,
    multiple: !1,
    onChange: async (i) => {
      if (i.length > 0) {
        s({ status: D.Pending });
        const c = await we.uploaderFile(i[0]);
        await e.edit(c);
      }
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Hr(e, t, n) {
  if (!e)
    throw new Error("Location type missing properties!");
  const { destroy: s } = Ft(t, {
    ...n,
    initialValue: e.value,
    onChange: async (r) => {
      await e.edit(r);
    }
  });
  return {
    destroy: s
  };
}
async function Ir(e, t, n) {
  if (!e)
    throw new Error("Tag type missing properties!");
  const { handleSyncStatus: s, destroy: r } = xe(t, {
    ...n,
    multiple: !1,
    type: "text",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 8V5C3 3.89543 3.89543 3 5 3H8L20 15L15 20L3 8Z" />
            <circle fill="#a1a1a1" cx="7" cy="7" r="1.25" />
        </svg>`,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Or(e, t, n) {
  if (!e)
    throw new Error("Translated type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Dt(t, {
    ...n,
    initialValue: e.value ?? {},
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function jr(e, t, n) {
  if (!e)
    throw new Error("Duration type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Ne(t, {
    ...n,
    placeholder: (n == null ? void 0 : n.placeholder) ?? "seconds",
    float: !1,
    min: 0,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Dr(e, t, n) {
  if (!e)
    throw new Error("Formula type missing properties!");
  const { handleSyncStatus: s, destroy: r } = xe(t, {
    ...n,
    multiple: !1,
    type: "text",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4H10.5C9.11929 4 8 5.11929 8 6.5V19M5 12H13M16 20L17.5 15M20.5 15L19 20" />
        </svg>`,
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Nr(e, t, n) {
  var u, f, l, d;
  if (!e)
    throw new Error("Currency type missing properties!");
  const s = (d = (l = (f = (u = e._object) == null ? void 0 : u.model) == null ? void 0 : f.getAttributesDetails) == null ? void 0 : l.call(f)) == null ? void 0 : d[e._name], r = Array.isArray(s == null ? void 0 : s.unit) ? s == null ? void 0 : s.unit[0] : s == null ? void 0 : s.unit, o = (n == null ? void 0 : n.unit) ?? r, { handleSyncStatus: i, destroy: c } = Ne(t, {
    ...n,
    label: (n == null ? void 0 : n.label) ?? o,
    float: !0,
    initialValue: e.value,
    onChange: async (y) => {
      await e.edit(y);
    }
  }), a = e.syncStatus(i);
  return {
    destroy: () => {
      a(), c();
    }
  };
}
async function qr(e, t, n) {
  var i;
  if (!e)
    throw new Error("Youtube type missing properties!");
  const { handleSyncStatus: s, destroy: r } = xe(t, {
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
    initialValue: (typeof e.value == "object" ? (i = e.value) == null ? void 0 : i.url : e.value) ?? "",
    onChange: async (c) => {
      const a = e.value && typeof e.value == "object" ? e.value : {};
      await e.edit({ ...a, url: c });
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Pr(e, t, n) {
  if (!e)
    throw new Error("Hex type missing properties!");
  const { handleSyncStatus: s, destroy: r } = xe(t, {
    ...n,
    multiple: !1,
    type: "text",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 3L8 21M16 3L14 21M3 8H21M3 16H21" />
        </svg>`,
    pattern: /^[0-9a-fA-F]*$/,
    errorMsg: "Hex digits only (0-9, a-f)!",
    initialValue: e.value,
    onChange: async (i) => {
      await e.edit(i);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Fr(e, t, n) {
  var a;
  if (!e || !e._name || !e._object || !e._object.model)
    throw new Error("Mtm type missing properties!");
  const s = (a = e._object.model.getAttributeDetails(e._name)) == null ? void 0 : a.type[0];
  if (!s)
    throw new Error("Model attributes invalid!");
  const r = await we._Model.get(s), { handleSyncStatus: o, destroy: i } = await rt(t, {
    ...n,
    model: r,
    initialValue: (e.value ?? []).map((u) => u._blitzID),
    initialLabel: void 0,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !0,
    onChange: async (u) => {
      const f = u.map((d) => d._blitzID.value), l = (e.value ?? []).map((d) => d._blitzID);
      for (const d of f)
        l.includes(d) || await e.add(d);
      for (const d of l)
        f.includes(d) || await e.remove(d);
    }
  }), c = e.syncStatus(o);
  return {
    destroy: () => {
      c(), i();
    }
  };
}
async function Vr(e, t, n) {
  if (!e || !e._name || !e._object || !e._object.model)
    throw new Error("Enum many type missing properties!");
  const { handleSyncStatus: s, destroy: r } = await nt(t, {
    ...n,
    model: e._object.model,
    attribute: e._name,
    initialValue: Ve(e.value),
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !0,
    onChange: async (i) => {
      const c = Ve(e.value);
      for (const a of i)
        c.includes(a) || await e.add(a);
      for (const a of c)
        i.includes(a) || await e.remove(a);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function zr(e, t, n) {
  if (!e)
    throw new Error("Image many type missing properties!");
  const { handleSyncStatus: s, destroy: r } = wt(t, {
    ...n,
    multiple: !0,
    initialPreviewImages: Ve(e.value).filter((i) => i && i.base && i["180x180"]).map((i) => i.base + i["180x180"].substring(1)),
    onChange: async (i) => {
      s({ status: D.Pending });
      const c = [];
      for (const a of i) {
        const u = await we.uploader(a);
        c.push(u);
      }
      for (const a of Ve(e.value))
        await e.remove(a);
      for (const a of c)
        await e.add(a);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function nn(e, t, n) {
  if (!e)
    throw new Error("Text many type missing properties!");
  const { handleSyncStatus: s, destroy: r } = vt(t, {
    ...n,
    initialValue: Ve(e.value),
    onChange: async (i) => {
      const c = Ve(e.value);
      for (const a of i)
        c.includes(a) || await e.add(a);
      for (const a of c)
        i.includes(a) || await e.remove(a);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
async function Br(e, t, n) {
  if (!e)
    throw new Error("Tag many type missing properties!");
  const { handleSyncStatus: s, destroy: r } = vt(t, {
    ...n,
    placeholder: (n == null ? void 0 : n.placeholder) ?? "add a tag",
    initialValue: Ve(e.value),
    onChange: async (i) => {
      const c = Ve(e.value);
      for (const a of i)
        c.includes(a) || await e.add(a);
      for (const a of c)
        i.includes(a) || await e.remove(a);
    }
  }), o = e.syncStatus(s);
  return {
    destroy: () => {
      o(), r();
    }
  };
}
const Rr = /^\s*(javascript|data|vbscript):/i, Ur = /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?$/, sn = (e) => {
  let t = e.trim();
  return t.startsWith("|") && (t = t.slice(1)), t.endsWith("|") && (t = t.slice(0, -1)), t.split("|").map((n) => n.trim());
}, rn = (e) => Rr.test(e) ? "#" : e;
function We(e) {
  return e.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (t, n, s) => `<img alt="${n}" src="${rn(s)}" />`).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (t, n, s) => `<a href="${rn(s)}">${n}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
function xn(e) {
  const t = de(e.replace(/\r\n?/g, `
`)).split(`
`), n = [];
  let s = [], r = null, o = [], i = null, c = null;
  const a = () => {
    s.length && n.push(`<p>${s.map(We).join("<br />")}</p>`), s = [];
  }, u = () => {
    r && n.push(`<${r.tag}>${r.items.map((y) => `<li>${We(y)}</li>`).join("")}</${r.tag}>`), r = null;
  }, f = () => {
    o.length && n.push(`<blockquote>${o.map(We).join("<br />")}</blockquote>`), o = [];
  }, l = () => {
    if (c) {
      const y = `<tr>${c.header.map((m) => `<th>${We(m)}</th>`).join("")}</tr>`, p = c.rows.map((m) => `<tr>${m.map((h) => `<td>${We(h)}</td>`).join("")}</tr>`).join("");
      n.push(`<table><thead>${y}</thead><tbody>${p}</tbody></table>`);
    }
    c = null;
  }, d = () => {
    a(), u(), f(), l();
  };
  for (let y = 0; y < t.length; y++) {
    const p = t[y];
    if (i) {
      /^```/.test(p) ? (n.push(`<pre><code>${i.join(`
`)}</code></pre>`), i = null) : i.push(p);
      continue;
    }
    if (/^```/.test(p)) {
      d(), i = [];
      continue;
    }
    if (c) {
      if (p.trim() !== "" && p.includes("|")) {
        c.rows.push(sn(p));
        continue;
      }
      l();
    }
    const m = p.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      d(), n.push(`<h${m[1].length}>${We(m[2])}</h${m[1].length}>`);
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(p)) {
      d(), n.push("<hr />");
      continue;
    }
    const h = p.match(/^&gt;\s?(.*)$/);
    if (h) {
      a(), u(), o.push(h[1]);
      continue;
    }
    const v = p.match(/^\s*[-*]\s+(.*)$/), g = p.match(/^\s*\d+\.\s+(.*)$/);
    if (v || g) {
      a(), f();
      const b = v ? "ul" : "ol";
      (!r || r.tag !== b) && (u(), r = { tag: b, items: [] }), r.items.push((v ?? g)[1]);
      continue;
    }
    if (p.includes("|") && y + 1 < t.length && Ur.test(t[y + 1])) {
      d(), c = { header: sn(p), rows: [] }, y++;
      continue;
    }
    if (p.trim() === "") {
      d();
      continue;
    }
    u(), f(), s.push(p);
  }
  return i && n.push(`<pre><code>${i.join(`
`)}</code></pre>`), d(), n.join(`
`);
}
const ot = (e, t) => `<p class="${`${e._name} bd-number`}">${(t == null ? void 0 : t.labelHtml) ?? ""}${e.value.toString()}</p>`, Mt = (e, t) => {
  const n = (e.value instanceof Array ? e.value : [e.value]).map(tt);
  return n.length === 0 ? "" : `<p class="${`${t != null && t.isSince ? "since" : e._name} bd-text`}">${(t == null ? void 0 : t.labelHtml) ?? ""}${n.join(", ")}</p>`;
}, Wr = {
  int: ot,
  tinyint: ot,
  double: ot,
  float: ot,
  percentage: (e, t) => `<p class="${`${e._name} bd-percentage`}">${(t == null ? void 0 : t.labelHtml) ?? ""}${e.value.toString()} <span class="bd-percentage-sign">%</span></p>`,
  varchar: Mt,
  text: Mt,
  email: (e, t) => `<div class="${`${e._name} bd-email`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${e.value}</p>
                </div>`,
  phone: (e, t) => {
    const n = e.value.split("-");
    return `<div class="${`${e._name} bd-phone`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${n.length === 2 ? (
      // Handle phone number with country code
      pt(n[1])
    ) : (
      // Handle phone number without country code
      pt(e.value)
    )}</p>
                </div>`;
  },
  url: (e, t) => `<div class="${`${e._name} bd-url`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <a href="${ke(e.value)}">${e.value}</a>
                </div>`,
  htmlText: (e, t) => `<div class="${`${e._name} bd-html`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    ${e.value}
                </div>`,
  // Unlike htmlText (trusted rich text, rendered raw), markdown is authored
  // plain text: the renderer escapes the whole source before transforming,
  // so this is safe for untrusted input by construction.
  markdown: (e, t) => typeof e.value != "string" || e.value === "" ? "" : `<div class="${`${e._name} bd-markdown`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    ${xn(e.value)}
                </div>`,
  boolean: (e, t) => `<div class="${`${e._name} bd-boolean ${e.value === !0 ? "icon-true" : "icon-false"}`}">
                ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}</div>`,
  datetime: (e, t) => {
    const n = re != null && re.formatDates && typeof e.toFormatted == "function" ? e.toFormatted(re == null ? void 0 : re.defaultLanguage) : e.value;
    return `<div class="${`${e._name} bd-datetime`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${n}</p>
                </div>`;
  },
  date: (e, t) => {
    const n = re != null && re.formatDates && typeof e.toFormatted == "function" ? e.toFormatted(re == null ? void 0 : re.defaultLanguage) : e.value;
    return `<div class="${`${e._name} bd-date`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${n}</p>
                </div>`;
  },
  enum: (e, t) => {
    const n = (e.value instanceof Array ? e.value : [e.value]).map(tt);
    return n.length === 0 ? "" : `<div class="${`${e._name} bd-enum`}">
                    <p>${(t == null ? void 0 : t.labelHtml) ?? ""}${n.join(", ")}</p>
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
    const n = (e.value instanceof Array ? e.value : [e.value]).map((s) => tt(s)).filter((s) => s && s.base && s.sd);
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
  // Preserved 1.0.x divergence: the string path renders a bare anchor, the
  // element path a <p> wrapper with label — kept byte-compatible on purpose.
  file: (e, t) => {
    const n = e.value;
    return n != null && n.url ? t != null && t.serialized ? `<a class="${`${e._name} bd-file`}" href="${ke(n.url)}">Link</a>` : `<p class="${`${e._name} bd-file`}">${(t == null ? void 0 : t.labelHtml) ?? ""}<a href="${ke(n.url)}">Link</a></p>` : "";
  },
  // The shell only: the map itself is the built-in location hydrator.
  // Serialized form carries data-lat/lng for template rehydration.
  location: (e, t) => {
    const n = e.value;
    return !(n != null && n.lat) || !(n != null && n.lng) ? "" : t != null && t.serialized ? `<div class="${`${e._name} bd-location`}" data-lat="${n.lat}" data-lng="${n.lng}"></div>` : `<div class="${`${e._name} bd-location`}">${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}</div>`;
  }
}, Kr = (e, t) => {
  const n = e.value;
  return n == null || n === "" ? "" : typeof n == "object" && !Array.isArray(n) ? `<div class="${`${e._name} bd-json`}">
                    ${t != null && t.labelHtml ? `<p>${t.labelHtml}</p>` : ""}
                    <pre>${JSON.stringify(n, null, 2) ?? ""}</pre>
                </div>` : Mt(e, t);
}, Jr = Kr, Tt = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new Set();
let Je = null;
function Zr() {
  Je || typeof MutationObserver > "u" || (Je = new MutationObserver((e) => {
    for (const t of e)
      for (const n of Array.from(t.removedNodes))
        if (n instanceof Element)
          for (const s of Array.from(mt))
            (n === s || n.contains(s)) && (s.isConnected || Yr(s));
  }), Je.observe(document.documentElement, { childList: !0, subtree: !0 }));
}
function Yr(e) {
  const t = Tt.get(e);
  Tt.delete(e), mt.delete(e), t && t(), mt.size === 0 && Je && (Je.disconnect(), Je = null);
}
function kn(e, t, n) {
  const s = t(e, n);
  typeof s == "function" && (Tt.set(e, s), mt.add(e), Zr());
}
function Xr(e, t) {
  var r, o, i, c, a;
  const n = (i = (o = (r = t._object) == null ? void 0 : r.model) == null ? void 0 : o.getName) == null ? void 0 : i.call(o), s = (a = (c = t._object) == null ? void 0 : c._blitzID) == null ? void 0 : a.value;
  return !n || !s ? !1 : (e.setAttribute("data-bd-hydrate", ""), e.setAttribute("data-bd-model", n), e.setAttribute("data-bd-id", s), e.setAttribute("data-bd-attr", t._name), !0);
}
async function Qr(e, t, n) {
  const s = Array.from(e.querySelectorAll("[data-bd-hydrate]"));
  for (const r of s) {
    const { bdModel: o, bdId: i, bdAttr: c } = r.dataset;
    if (!(!o || !i || !c))
      try {
        const a = await we._Model.get(o), u = await (a == null ? void 0 : a.get(i)), f = u == null ? void 0 : u[c];
        if (!f) {
          n(`hydrate: could not resolve ${o}.${c} (id ${i}) — shell left static`);
          continue;
        }
        const l = t(f);
        l && kn(r, l, f);
      } catch (a) {
        n(`hydrate failed for ${o}.${c}: ${a.message}`);
      }
  }
}
function Mn(e) {
  const t = [];
  return e instanceof Array ? t.push(...e) : Object.hasOwn(e, "_attributes") ? t.push(
    ...Object.values(e._attributes).filter((n) => !n._name.startsWith("_") && !n._name.startsWith("@"))
  ) : t.push(e), t.filter((n) => n.value != null && n.value !== "");
}
async function _t(e) {
  const t = await we._Model.get(e).then((n) => n == null ? void 0 : n.getAttributesDetails());
  if (t) {
    for (const n in t)
      if (typeof t[n].type == "string" && ["varchar", "text"].includes(t[n].type))
        return n;
  }
  return "_blitzID";
}
function Tn(e, t, n, s) {
  var i, c;
  return typeof n == "boolean" && n === !0 || Array.isArray(n) && n.includes(t) ? t.startsWith("since:") ? `<b class="bd-label">${t.split("since:")[1]}: </b>` : `<b class="bd-label">${Ze((i = e[t]) == null ? void 0 : i["label-int"], (c = e[t]) == null ? void 0 : c.label, s, t)}: </b>` : "";
}
async function _n(e, t) {
  var a, u, f;
  if (!e)
    throw new Error("Missing attribute(s)!");
  const { labelLanguage: n, enableLabels: s } = t ?? {}, r = n ?? (re == null ? void 0 : re.defaultLanguage) ?? "en", o = Mn(e), i = o.length > 0 ? ((u = (a = o[0]._object) == null ? void 0 : a.model) == null ? void 0 : u.getAttributesDetails()) ?? {} : {}, c = [];
  for (const l of o) {
    if (l._name.startsWith("_")) {
      c.push(l.value ?? "");
      continue;
    }
    const d = l._name === "since";
    if (!d && !i[l._name])
      continue;
    const y = l._name.endsWith("_fk"), p = l._name.endsWith("_mtm"), m = Tn(i, l._name, s, r);
    if (y || p) {
      const g = await _t(l._type);
      if (y) {
        const b = await l.getObject();
        (f = b == null ? void 0 : b[g]) != null && f.value && c.push(`<div class="${`${l._name} bd-fk`}">
                        <p>${m + b[g].value}</p>
                    </div>`);
        continue;
      } else if (p) {
        if (!(l.value instanceof Array))
          continue;
        const b = (await l.getObjects()).filter((w) => {
          var L;
          return (L = w[g]) == null ? void 0 : L.value;
        });
        if (b.length === 0)
          continue;
        c.push(`<div class="${`${l._name} bd-mtm`}">
                    ${m ? `<p>${m}</p>` : ""}${b.map((w) => `<div class="fk-item">
                            <p>${w[g].value}</p>
                        </div>`).join(`
`)}
                </div>`);
        continue;
      }
    }
    const v = (this && typeof this.resolveReadonlyString == "function" ? this : De).resolveReadonlyString(l, { serialized: !0, labelHtml: m, isSince: d });
    v && c.push(v);
  }
  return c.length === 0 ? null : c.join(`
`);
}
const Gr = {
  location: async (e, t, { googleMapsApiKey: n }) => {
    const s = t.value;
    if (!(s != null && s.lat) || !(s != null && s.lng) || !n)
      return !1;
    const r = await Ht(s.lat, s.lng, n);
    return r ? (e.appendChild(r), !0) : !1;
  }
};
async function zt(e, t) {
  var h, v;
  if (!e)
    throw new Error("Missing attribute(s)!");
  const { labelLanguage: n, enableLabels: s, googleMapsApiKey: r, status: o, statusScope: i } = t ?? {}, c = (g) => {
    var w;
    const b = this && typeof this.resolveReadonlyElement == "function" ? this : De;
    (w = b == null ? void 0 : b.warn) == null || w.call(b, g);
  };
  let a = !1;
  const u = (g, b) => {
    if (o) {
      if (!i) {
        a || c("getHtmlElement: `status: true` without a `statusScope` — the badge would outlive the element it paints, so no badge was attached"), a = !0;
        return;
      }
      i.attach(g, b);
    }
  }, f = Mn(e), l = f.length > 0 ? ((v = (h = f[0]._object) == null ? void 0 : h.model) == null ? void 0 : v.getAttributesDetails()) ?? {} : {}, d = n ?? (re == null ? void 0 : re.defaultLanguage) ?? "en", y = r ?? (re == null ? void 0 : re.googleMapsApiKey) ?? null, p = (g) => Tn(l, g, s, d), m = [];
  for (const g of f) {
    const b = g._name.startsWith("since:");
    if (!b && !l[g._name])
      continue;
    const w = g._name.endsWith("_fk"), L = g._name.endsWith("_mtm"), N = p(g._name);
    if (w) {
      const A = document.createElement("div");
      A.className = `${g._name} bd-fk`, _t(g._type).then(async (T) => {
        var E;
        const O = await g.getObject();
        (E = O == null ? void 0 : O[T]) != null && E.value && (A.innerHTML = `<p>${N + O[T].value}</p>`);
      }).catch((T) => c(`${g._name}: fk label unresolved — ${(T == null ? void 0 : T.message) ?? T}`)), m.push(A), u(A, g);
      continue;
    } else if (L) {
      if (!(g.value instanceof Array))
        continue;
      const A = document.createElement("div");
      A.className = `${g._name} bd-mtm`, A.innerHTML = (N ? `<p>${N}</p>` : "") + g.value.map((T) => `<div class="fk-item">
                    <p data-id="${T._blitzID}"></p>
                </div>`).join(`
`), _t(g._type).then(async (T) => {
        var H;
        const O = await g.getObjects(), E = Array.from(A.querySelectorAll("p"));
        for (const q of O) {
          const C = E.find(($) => $.getAttribute("data-id") === q._blitzID.value);
          C && ((H = q[T]) != null && H.value) && (C.innerHTML = q[T].value);
        }
      }).catch((T) => c(`${g._name}: mtm labels unresolved — ${(T == null ? void 0 : T.message) ?? T}`)), m.push(A), u(A, g);
      continue;
    }
    const S = this && typeof this.resolveReadonlyElement == "function" ? this : De;
    let M = S.resolveReadonlyElement(g, { labelHtml: N, isSince: b });
    if (M && g._type === "location") {
      const { render: A, layer: T } = S.resolveView(g);
      T === 0 && typeof A(g, { labelHtml: N, isSince: b }) == "string" && (await Gr.location(M, g, { googleMapsApiKey: y }) || (M = null));
    }
    M && m.push(M), M && !b && u(M, g);
  }
  if (m.length === 0)
    return null;
  if (m.length === 1)
    return m[0];
  {
    const g = document.createElement("div");
    for (const b of m)
      g.append(b);
    return g;
  }
}
async function ei(e, t, n) {
  if (!e)
    throw new Error("Missing attribute(s)!");
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let r = 0;
  const o = async () => {
    const a = ++r, u = await zt(e);
    return a !== r || (s.innerHTML = "", u && s.append(u)), u;
  };
  if (!await o())
    throw new Error("Attribute not supported!");
  const c = [];
  if (n) {
    const a = Array.isArray(e) ? e : Object.hasOwn(e, "_attributes") ? Object.values(e._attributes).filter((u) => !u._name.startsWith("_") && !u._name.startsWith("@")) : [e];
    for (const u of a)
      u.value !== void 0 && typeof u.subscribe == "function" && c.push(u.subscribe(() => o(), !1));
  }
  return {
    destroy: () => {
      for (const a of c)
        a();
      r++;
    }
  };
}
const ti = ["boolean", "datetime", "date", "image", "video", "file"];
function An(e, t, n) {
  var ie;
  if (!e)
    throw new Error("Missing model!");
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    attributes: r,
    presetValues: o = {},
    requiredAttributes: i = [],
    requireAll: c,
    withLabels: a,
    validationMessages: u,
    successMessage: f,
    listEmptyMsg: l,
    addButtonLabel: d,
    labelLanguage: y,
    defaultDialCode: p,
    googleMapsApiKey: m,
    locationFieldsExpand: h,
    onSuccess: v,
    onServerSuccess: g
  } = n ?? {};
  s.innerHTML = `<div class="bd-addform ${e.getName() ?? ""}"></div>`;
  const b = s.querySelector(".bd-addform"), w = y ?? (re == null ? void 0 : re.defaultLanguage) ?? "en", L = e.getAttributesDetails() ?? {}, N = Array.isArray(r) ? r : Object.keys(L), S = (z) => Ze(L[z]["label-int"], L[z].label, w, z), M = (De ?? we.ui).kernel, A = (De ?? we.ui).services, T = { image: 0, video: 0, file: 0 }, O = (z, J) => async (Z) => {
    T[z]++;
    try {
      return await J(Z);
    } finally {
      T[z]--;
    }
  }, E = {
    ...A,
    upload: O("image", A.upload),
    uploadVideo: O("video", A.uploadVideo),
    uploadFile: O("file", A.uploadFile)
  };
  let H = !1, q = [];
  const C = (z) => {
    H ? z() : q.push(z);
  }, $ = {};
  for (const z of N) {
    if (!L[z])
      continue;
    const J = L[z], Z = Array.isArray(J.type) ? J.type[0] : J.type, pe = Array.isArray(J.type), ce = c || i.includes(z), be = a || ti.includes(Z) ? S(z) + (ce ? " *" : "") : void 0, j = Xn($, z, J, e, {
      className: z,
      label: be,
      placeholder: `${S(z)}...`,
      ...p ? { defaultDialCode: p } : {},
      ...m ? { apiKey: m } : {},
      ...h !== void 0 ? { initialExpand: h } : {},
      ...l && pe && ["varchar", "text"].includes(Z) ? { emptyMsg: l } : {}
    });
    j.services = E;
    const _ = M.resolveForPort(j);
    $[z] = o[z] ?? J.default ?? ((ie = _.default) == null ? void 0 : ie.call(_)) ?? void 0, j.value = $[z];
    const B = document.createElement("div");
    b.append(B), M.mount(j, B, "write").then(C).catch((k) => console.error(`"${z}" Add field error:`, (k == null ? void 0 : k.stack) ?? (k == null ? void 0 : k.message)));
  }
  const I = document.createElement("button");
  I.innerText = d ?? "Add", I.className = "add-btn", b.append(I);
  const U = (z) => {
    var J;
    if (I.disabled = z, I.classList.toggle("loading", z), z) {
      if (!I.querySelector(".add-btn-spinner")) {
        const Z = document.createElement("span");
        Z.className = "add-btn-spinner", I.append(Z);
      }
    } else
      (J = I.querySelector(".add-btn-spinner")) == null || J.remove();
  };
  I.onclick = async () => {
    if (T.image > 0) {
      alert((u == null ? void 0 : u.imageUploading) || "Please wait until images are uploaded!");
      return;
    }
    if (T.video > 0) {
      alert((u == null ? void 0 : u.videoUploading) || "Please wait until video is uploaded!");
      return;
    }
    if (T.file > 0) {
      alert((u == null ? void 0 : u.fileUploading) || "Please wait until file is uploaded!");
      return;
    }
    if (c || i.length > 0) {
      const ce = (c ? N : i).filter((be) => $[be] == null);
      if (ce.length > 0) {
        alert(((u == null ? void 0 : u.missingFields) || "Missing fields: ") + ce.map((be) => S(be)).join(", "));
        return;
      }
    }
    const z = await e.add($);
    if (!z) {
      alert((u == null ? void 0 : u.unexpectedError) || "Unexpected error! Please try again");
      return;
    }
    const J = f ?? "Item was added successfully!", Z = () => b.innerHTML = `<p class="success-msg">${J}</p>`;
    if (g || (F(!1), Z()), v && v(z), g) {
      const pe = z._blitzID.value;
      U(!0);
      let ce = !1;
      const be = (_) => {
        if (!(ce || _.transaction.action !== "add")) {
          if (_.status === D.Completed)
            ce = !0, z.removeEventListener("syncStatusChange", be), U(!1), F(!1), Z(), g(z);
          else if (_.status === D.Failed) {
            ce = !0, z.removeEventListener("syncStatusChange", be), U(!1);
            const B = "Error: " + (_.message ?? "Add failed! Please try again.");
            alert(B), console.error(B);
          }
        }
      };
      z.addEventListener("syncStatusChange", be);
      const j = (await we.queue.getJobsForObject(pe))[0];
      j && be(j);
    }
  };
  const F = (z = !0) => {
    H = !0;
    for (const J of q)
      J();
    q = [], z && (s.innerHTML = "");
  };
  return { destroy: F };
}
const Lt = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
let ni = 0, on = 0;
function Xe(e, t) {
  const { titleElm: n, closeElm: s, onEscape: r } = t;
  e.setAttribute("role", "dialog"), e.setAttribute("aria-modal", "true"), n && (n.id || (n.id = `bd-dialog-title-${++ni}`), e.setAttribute("aria-labelledby", n.id)), s && (s.setAttribute("role", "button"), s.setAttribute("aria-label", "Close"), s.tabIndex = 0, s.addEventListener("keydown", (f) => {
    f.key !== "Enter" && f.key !== " " || (f.preventDefault(), s.click());
  }));
  const o = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  e.tabIndex = -1, (e.querySelector(Lt) ?? e).focus(), ++on === 1 && (document.body.style.overflowY = "hidden");
  const i = () => {
    const f = document.querySelectorAll('[data-bd-portal][role="dialog"]');
    return f[f.length - 1] === e;
  }, c = (f) => {
    const l = f instanceof Element ? f.closest("[data-bd-portal]") : null;
    return !!l && l !== e;
  }, a = (f) => {
    if (!i() || c(f.target))
      return;
    if (f.key === "Escape") {
      r == null || r();
      return;
    }
    if (f.key !== "Tab")
      return;
    const l = [...e.querySelectorAll(Lt)];
    if (!l.length) {
      f.preventDefault(), e.focus();
      return;
    }
    const d = document.activeElement instanceof HTMLElement ? l.indexOf(document.activeElement) : -1;
    if (d === -1) {
      f.preventDefault(), l[0].focus();
      return;
    }
    f.shiftKey && d === 0 ? (f.preventDefault(), l[l.length - 1].focus()) : !f.shiftKey && d === l.length - 1 && (f.preventDefault(), l[0].focus());
  }, u = (f) => {
    !i() || c(f.target) || f.target instanceof Node && e.contains(f.target) || (e.querySelector(Lt) ?? e).focus();
  };
  return document.addEventListener("keydown", a), document.addEventListener("focusin", u), () => {
    document.removeEventListener("keydown", a), document.removeEventListener("focusin", u), --on === 0 && (document.body.style.overflowY = ""), o != null && o.isConnected && o.focus();
  };
}
function si(e, t) {
  if (!e)
    throw new Error("Missing model!");
  const { onSuccess: n, title: s, closeOnCompletion: r, closeTimeout: o, ...i } = t ?? {}, c = o ?? 2, a = document.createElement("div");
  a.className = "bd-addmodal", a.setAttribute("data-bd-portal", "");
  const u = document.createElement("div");
  u.className = "box", u.innerHTML = `
        <div class="heading">
            <h2 class="title">${s ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="form"></div>
        <div class="close-timer" style="display: none;">
            <div class="bar"></div>
        </div>
    `;
  const f = u.querySelector(".close-btn"), l = u.querySelector(".close-timer"), d = u.querySelector(".close-timer .bar"), y = u.querySelector(".form");
  d.style.animation = `bd-addmodal-expand ${c}s linear`;
  const { destroy: p } = An(
    e,
    y,
    {
      ...i,
      onSuccess: (g) => {
        n && n(g), r && (l.style.display = "block", setTimeout(() => {
          m || v();
        }, c * 1e3));
      }
    }
  );
  let m = !1, h = null;
  const v = () => {
    m = !0, h == null || h(), p(), a.remove();
  };
  return f.onclick = () => v(), a.onclick = (g) => {
    g && g.target !== g.currentTarget || v();
  }, a.append(u), document.body.append(a), h = Xe(a, {
    titleElm: u.querySelector(".title"),
    closeElm: f,
    onEscape: () => v()
  }), { destroy: v };
}
async function Hn(e, t, n, s) {
  const r = s ?? De, o = (l) => r ? r.getHTML(l) : _n(l);
  let i = t;
  const c = [
    // Find UI variables
    ...Array.from(i.matchAll(/\{\{([\w.]+)\}\}/g)).map((l) => ({ type: "ui", key: l[1], searchValue: `{{${l[1]}}}` })),
    // Find value variables
    ...Array.from(i.matchAll(/\[\[([\w.]+)\]\]/g)).map((l) => ({ type: "value", key: l[1], searchValue: `[[${l[1]}]]` }))
  ];
  for (const l of c)
    try {
      const { type: d, key: y, searchValue: p } = l;
      let m = e, h = y;
      const v = y.split(".");
      if (h === "since") {
        if (e._publishingdate && typeof e._publishingdate.toRelative == "function") {
          const g = e._publishingdate.toRelative(n == null ? void 0 : n.labelLanguage);
          if (g) {
            const b = new dt("since", "varchar", g);
            b.withObject(m);
            const w = await o(b);
            i = i.replaceAll(p, () => w ?? "");
            continue;
          }
        }
        i = i.replaceAll(p, "");
        continue;
      }
      if (v.length === 2) {
        if (e[v[0]] && typeof e[v[0]].value == "object" && e[v[0]].value !== null && Object.hasOwn(e[v[0]].value, v[1])) {
          if (d === "ui") {
            const b = new dt(v[0], "varchar", e[v[0]].value[v[1]]);
            b.withObject(m);
            const w = await o(b);
            i = i.replaceAll(p, () => w ?? "");
          } else
            i = i.replaceAll(p, () => e[v[0]].value[v[1]] ?? "");
          continue;
        }
        if (!e[v[0]] || typeof e[v[0]].getObject != "function") {
          i = i.replaceAll(p, "");
          continue;
        }
        const g = await e[v[0]].getObject();
        if (!g) {
          i = i.replaceAll(p, "");
          continue;
        }
        m = g, h = v[1];
      }
      if (!m._attributes.hasOwnProperty(h)) {
        i = i.replaceAll(p, "");
        continue;
      }
      if (d === "ui") {
        const g = await o(m[h]);
        i = i.replaceAll(p, () => g ?? "");
      } else
        i = i.replaceAll(p, () => m[h].value ?? "");
    } catch (d) {
      console.error("Template render error:", d.stack ?? d.message);
    }
  const a = document.createElement("div");
  a.innerHTML = i;
  const u = Array.from(a.querySelectorAll(".bd-location")), f = (n == null ? void 0 : n.googleMapsApiKey) ?? (re == null ? void 0 : re.googleMapsApiKey) ?? null;
  if (u.length > 0 && f)
    for (const l of u) {
      const d = await Ht(
        l.getAttribute("data-lat") || "0",
        l.getAttribute("data-lng") || "0",
        f
      );
      d && l.appendChild(d);
    }
  return r && await r.hydrate(a), a;
}
async function In(e, t, n, s) {
  const r = s ?? De, o = (a, u) => r ? r.getHtmlElement(a, u) : zt(a, u), i = [], c = t && t.length > 0 ? t : Object.keys(e._attributes);
  for (const a of c)
    try {
      let u = e, f = a;
      const l = a.split(".");
      if (l.length === 2) {
        if (e[l[0]] && typeof e[l[0]].value == "object" && e[l[0]].value !== null && Object.hasOwn(e[l[0]].value, l[1])) {
          const p = new dt(l[0], "varchar", e[l[0]].value[l[1]]);
          p.withObject(u);
          const m = await o(p, n);
          m && (m.classList.remove(l[0]), m.classList.add(`${l[0]}-${l[1]}`), i.push(m));
          continue;
        }
        if (!e[l[0]] || typeof e[l[0]].getObject != "function")
          continue;
        const y = await e[l[0]].getObject();
        if (!y)
          continue;
        u = y, f = l[1];
      }
      if (!u._attributes.hasOwnProperty(f) || u[f]._name.startsWith("_") || u[f]._name.startsWith("@"))
        continue;
      const d = await o(u[f], n);
      d && i.push(d);
    } catch (u) {
      console.error("Attribute render error:", u.stack ?? u.message);
    }
  if (n != null && n.sinceLabel)
    try {
      if (e._publishingdate && typeof e._publishingdate.toRelative == "function") {
        const a = e._publishingdate.toRelative(n == null ? void 0 : n.labelLanguage);
        if (a) {
          const u = new dt("since:" + n.sinceLabel, "varchar", a);
          u.withObject(e);
          const f = await o(u, n);
          f && i.push(f);
        }
      }
    } catch (a) {
      console.error("Since attribute render error:", a.stack ?? a.message);
    }
  if (i.length === 0)
    return null;
  {
    const a = document.createElement("div");
    for (const u of i)
      a.append(u);
    return a;
  }
}
function an(e) {
  const t = [];
  let n = "";
  for (const s of e.split(/(\s+)/))
    s !== "" && (/^\s+$/.test(s) ? t.length ? t[t.length - 1].sep += s : n += s : t.push({ word: s, sep: "" }));
  return { lead: n, tokens: t };
}
function Ke(e, t, n) {
  if (t === "")
    return;
  const s = e[e.length - 1];
  s && s.changed === n ? s.text += t : e.push({ text: t, changed: n });
}
function ri(e, t) {
  const n = an(e), s = an(t), r = { before: [], after: [], replaced: !0 };
  Ke(r.before, n.lead, !1), Ke(r.after, s.lead, !1);
  const o = /* @__PURE__ */ new Map(), i = (a, u, f, l, d) => {
    if (f >= l)
      return;
    Ke(a, o.get(a) ?? "", !1), o.set(a, "");
    let y = "";
    for (let p = f; p < l; p++)
      y += u[p].word, p < l - 1 ? y += u[p].sep : o.set(a, u[p].sep);
    Ke(a, y, d);
  }, c = (a, u, f, l) => {
    const d = /* @__PURE__ */ new Map();
    for (let v = a; v < u; v++) {
      const g = d.get(n.tokens[v].word);
      g ? g.push(v) : d.set(n.tokens[v].word, [v]);
    }
    let y = /* @__PURE__ */ new Map(), p = 0, m = 0, h = 0;
    for (let v = f; v < l; v++) {
      const g = /* @__PURE__ */ new Map();
      for (const b of d.get(s.tokens[v].word) ?? []) {
        const w = (y.get(b - 1) ?? 0) + 1;
        g.set(b, w), w > h && (h = w, p = b - w + 1, m = v - w + 1);
      }
      y = g;
    }
    if (h === 0) {
      i(r.before, n.tokens, a, u, !0), i(r.after, s.tokens, f, l, !0);
      return;
    }
    r.replaced = !1, c(a, p, f, m), i(r.before, n.tokens, p, p + h, !1), i(r.after, s.tokens, m, m + h, !1), c(p + h, u, m + h, l);
  };
  return c(0, n.tokens.length, 0, s.tokens.length), Ke(r.before, o.get(r.before) ?? "", !1), Ke(r.after, o.get(r.after) ?? "", !1), r;
}
const ii = "@NULL", xt = { known: !1, value: null };
function kt(e) {
  if (e == null || e === ii)
    return null;
  if (typeof e == "string")
    return e;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}
function yt(e) {
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
function oi(e) {
  if (!e)
    return null;
  for (const t of Object.keys(e))
    return t;
  return null;
}
function At(e) {
  return e != null && e.attribute ? e.attribute : oi(yt(e));
}
function On(e) {
  var s;
  const t = At(e);
  if (!t)
    return null;
  const n = (s = yt(e)) == null ? void 0 : s[t];
  return n && typeof n == "object" && n.path ? String(n.path) : null;
}
function jn(e, t) {
  var o;
  const n = e[t];
  if (!n || n.action === "add")
    return xt;
  const s = At(n);
  if (!s)
    return xt;
  const r = (o = yt(n)) == null ? void 0 : o[s];
  if (r && typeof r == "object" && "prev" in r)
    return { known: !0, value: kt(r.prev) };
  for (let i = t + 1; i < e.length; i++) {
    const c = e[i];
    if (c.action === "add") {
      const a = yt(c);
      if (a && s in a) {
        const u = a[s];
        return {
          known: !0,
          value: kt(u && typeof u == "object" && "new" in u ? u.new : u)
        };
      }
      continue;
    }
    if (At(c) === s)
      return { known: !0, value: kt(c.newValue) };
  }
  return xt;
}
function St(e, t, n = {}) {
  if (!e)
    throw new Error("mountObjectHistory: missing object");
  const s = typeof t == "string" ? document.getElementById(t) ?? document.querySelector(t) : t;
  if (!s)
    throw new Error("mountObjectHistory: container not found");
  const r = s, o = n.emptyMessage ?? "No history yet!", i = n.attributeLabel ?? ((E) => E), c = typeof e.history == "function";
  r.classList.add("bd-oh");
  let a = [], u = !0, f = null, l = !1, d = null;
  const y = (E) => {
    const H = Number(E);
    return Number.isFinite(H) ? ct(H).toLocaleString() : E;
  }, p = [
    [60, "minute"],
    [60, "hour"],
    [24, "day"],
    [7, "week"],
    [4.35, "month"],
    [12, "year"]
  ], m = (E) => {
    const H = Number(E);
    if (!Number.isFinite(H))
      return E;
    let q = (ct(H).getTime() - Date.now()) / 1e3, C = "second";
    for (const [$, I] of p) {
      if (Math.abs(q) < $)
        break;
      q /= $, C = I;
    }
    return new Intl.RelativeTimeFormat(void 0, { numeric: "auto" }).format(Math.round(q), C);
  }, h = 140, v = 24, g = (E) => {
    if (E == null)
      return null;
    if (typeof E == "string")
      return E;
    try {
      return JSON.stringify(E);
    } catch {
      return String(E);
    }
  }, b = (E) => E.map((H) => H.changed ? Q`<mark class="bd-oh-diff">${H.text}</mark>` : Q`<span>${H.text}</span>`).join("");
  function w(E, H, q) {
    const C = te(H ? b(H) : Q`${E}`);
    return E.length <= h ? Q`<span class="bd-oh-side bd-oh-${q}">${C}</span>` : Q`<details class="bd-oh-side bd-oh-${q} bd-oh-fold">
            <summary>${E.slice(0, h)}… <span class="bd-oh-fold-meta">${String(E.length)} chars</span></summary>
            <span class="bd-oh-value">${C}</span>
        </details>`;
  }
  function L(E, H) {
    if (E.action === "add")
      return N(E);
    const q = g(E.newValue), C = jn(a, H), $ = C.known ? C.value ?? "" : null;
    if (q == null && !C.known)
      return "";
    if ($ == null)
      return Q`<div class="bd-oh-change">
                <span class="bd-oh-side bd-oh-old bd-oh-unknown" title="The change was recorded without a previous value.">—</span>
                <span class="bd-oh-arrow">→</span>
                ${te(w(q ?? "", null, "new"))}
            </div>`;
    const U = Math.max($.length, (q ?? "").length) >= v ? ri($, q ?? "") : null, F = U && !U.replaced ? U : null;
    return Q`<div class="bd-oh-change">
            ${te(w($, (F == null ? void 0 : F.before) ?? null, "old"))}
            <span class="bd-oh-arrow">→</span>
            ${te(w(q ?? "", (F == null ? void 0 : F.after) ?? null, "new"))}
        </div>`;
  }
  function N(E) {
    let H = E.data;
    if (typeof H == "string")
      try {
        H = JSON.parse(H);
      } catch {
        H = null;
      }
    if (!H || typeof H != "object")
      return "";
    const q = Object.entries(H).filter(([C]) => !C.startsWith("_")).map(([C, $]) => [C, g(($ == null ? void 0 : $.new) ?? $)]).filter(([, C]) => C != null && C !== "");
    return q.length ? Q`<details class="bd-oh-created">
            <summary>${String(q.length)} value${q.length === 1 ? "" : "s"}</summary>
            <dl>${te(q.map(([C, $]) => Q`
                <dt>${i(C)}</dt><dd>${$.slice(0, h)}</dd>`).join(""))}</dl>
        </details>` : "";
  }
  function S(E, H) {
    const q = On(E), C = q ? `.${q}` : "", $ = E.attribute ? Q`<span class="bd-oh-attribute" title="${E.attribute}${C}">${i(E.attribute)}${C}</span>` : "", I = E._userID ? `user ${E._userID}` : null;
    return Q`<li class="bd-oh-entry">
            <span class="bd-oh-dot bd-oh-${E.action}"></span>
            <div class="bd-oh-entry-main">
                <div class="bd-oh-entry-top">
                    <span class="bd-oh-action">${E.action}</span>
                    ${te($)}
                    <span class="bd-oh-entry-meta">
                        ${te(I ? Q`<span class="bd-oh-who">${I}</span>` : "")}
                        <span title="${y(E.blitzstamp)}">${m(E.blitzstamp)}</span>
                    </span>
                </div>
                ${te(L(E, H))}
            </div>
        </li>`;
  }
  const M = 100;
  function A() {
    if (l)
      return;
    const E = a.length >= M ? Q`<p class="bd-oh-cap">Showing the newest ${String(M)} changes.</p>` : "", H = u ? '<div class="bd-oh-spinner"></div>' : f ? Q`<p class="bd-oh-error">${f}</p>` : a.length ? Q`<ul class="bd-oh-entries">${te(a.map(S).join(""))}</ul>${te(E)}` : Q`<p class="bd-oh-empty">${o}</p>`;
    r.innerHTML = Q`
            <div class="bd-oh-banner">
                <h2>History</h2>
                <button class="bd-oh-refresh" title="Refresh">⟳</button>
            </div>
            <div class="bd-oh-body">${te(H)}</div>`;
  }
  async function T() {
    if (!l) {
      if (u = !0, f = null, A(), !c)
        f = "Reading history requires @blitzdata.ts/core 1.11 or newer.";
      else {
        d == null || d.abort();
        const E = new AbortController();
        d = E;
        try {
          const H = await e.history(E.signal);
          if (l || E.signal.aborted)
            return;
          a = H;
        } catch (H) {
          if (l || E.signal.aborted)
            return;
          f = H.message;
        }
      }
      u = !1, A();
    }
  }
  function O(E) {
    E.target.closest(".bd-oh-refresh") && T();
  }
  return r.addEventListener("click", O), T(), {
    refresh: () => {
      T();
    },
    destroy: () => {
      l = !0, d == null || d.abort(), r.removeEventListener("click", O), r.classList.remove("bd-oh"), r.innerHTML = "";
    }
  };
}
async function Dn(e, t, n) {
  if (!e)
    throw new Error("Missing object!");
  const s = typeof t == "string" ? document.getElementById(t) : t;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const { labelLanguage: r, enableLabels: o, sinceLabel: i, googleMapsApiKey: c, objectAttributes: a, template: u, history: f } = n ?? {};
  s.innerHTML = "";
  let l = null;
  if (u) {
    const p = typeof u == "function" ? u(e) : u;
    l = await Hn(e, p, { labelLanguage: r, googleMapsApiKey: c });
  } else {
    const p = typeof a == "function" ? a(e) : a;
    l = await In(e, p, { labelLanguage: r, enableLabels: o, sinceLabel: i, googleMapsApiKey: c });
  }
  l && (l.className = "bd-objectview " + (e._blitzID.value ?? ""), s.append(l));
  let d = null;
  if (f) {
    const p = document.createElement("details");
    p.className = "bd-objectview-history", p.innerHTML = '<summary>History</summary><div class="bd-objectview-history-body"></div>', p.addEventListener("toggle", () => {
      !p.open || d || (d = St(
        e,
        p.querySelector(".bd-objectview-history-body"),
        typeof f == "object" ? f : {}
      ));
    }), s.append(p);
  }
  return { destroy: () => {
    d == null || d.destroy(), d = null, s.innerHTML = "";
  } };
}
function Nn(e, t) {
  if (!e)
    throw new Error("Missing object!");
  const { title: n, titleAttribute: s, mode: r, onOpen: o, onClose: i, ...c } = t ?? {}, a = n ?? (s ? e[s].value : void 0), u = document.createElement("div");
  u.className = "bd-objectview-modal", u.setAttribute("data-bd-portal", ""), r !== "fullscreen" && (u.style.cssText = "display: flex; justify-content: center; align-items: center; padding: 16px;");
  const f = document.createElement("div");
  f.className = r === "fullscreen" ? "box-full" : "box", f.onclick = (h) => h.stopPropagation(), f.innerHTML = `
        <div class="heading">
            <h2 class="title">${a ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="view"></div>
    `;
  const l = f.querySelector(".close-btn"), d = f.querySelector(".view");
  let y = null;
  Dn(e, d, c).then(({ destroy: h }) => y = h).catch((h) => console.error("mountObjectViewModal: view failed to render:", h));
  let p = null;
  const m = () => {
    p == null || p(), typeof y == "function" && y(), u.remove(), i && i(e);
  };
  return u.onclick = () => m(), l.onclick = () => m(), u.append(f), document.body.append(u), p = Xe(u, {
    titleElm: f.querySelector(".title"),
    closeElm: l,
    onEscape: () => m()
  }), o && o(e), { destroy: m };
}
function qn(e, t, n) {
  let s = !1;
  const r = e.subscribeToList(t, (o) => {
    o.nextSource || (s = !0), n(o.items ?? [], s);
  }, !0);
  return () => {
    typeof r == "function" && r();
  };
}
function ai(e, t, n, s) {
  if (!e)
    throw new Error("Missing model!");
  const r = typeof t == "string" ? document.getElementById(t) : t;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    objectAttributes: o,
    cardTemplate: i,
    labelLanguage: c,
    enableLabels: a,
    sinceLabel: u,
    googleMapsApiKey: f,
    allowDelete: l,
    enableObjectView: d,
    objectViewConfig: y,
    pagination: p,
    objectsPerPage: m = 10,
    noResultsMessage: h,
    onObjectClick: v,
    onPageChange: g
  } = s ?? {};
  let b = [], w = null, L = null, N = 1, S = Promise.resolve(), M = !1;
  r.innerHTML = `<div class="bd-list ${e.getName() ?? ""}">
        <div class="spinner"></div>
    </div>`;
  const A = r.querySelector(".bd-list"), T = qn(e, n, (C, $) => {
    b = C, M = $, q();
  }), O = () => {
    T(), r.innerHTML = "";
  }, E = (C) => {
    w = C, N = 1, q();
  }, H = (C) => {
    L = C, q();
  }, q = () => {
    S = S.then(async () => {
      const C = [...b], $ = typeof w == "function" ? C.filter(w) : C;
      typeof L == "function" && $.sort(L);
      const I = p ? $.slice((N - 1) * m, N * m) : $, U = Math.ceil($.length / m);
      A.innerHTML = "";
      for (const F of I) {
        const ie = document.createElement("div");
        ie.className = "card " + F._blitzID.value;
        let z = null;
        try {
          if (i) {
            const J = typeof i == "function" ? i(F) : i;
            z = await Hn(F, J, { labelLanguage: c, googleMapsApiKey: f }, this);
          } else {
            const J = typeof o == "function" ? o(F) : o;
            z = await In(F, J, { labelLanguage: c, enableLabels: a, sinceLabel: u, googleMapsApiKey: f }, this);
          }
        } catch (J) {
          console.error("Object render error:", J.stack ?? J.message);
        }
        if (z) {
          if (z.className = "attributes", ie.append(z), (typeof v == "function" || d) && (z.onclick = () => {
            v && v(F), d && Nn(F, { labelLanguage: c, enableLabels: a, googleMapsApiKey: f, ...y });
          }), l) {
            const J = document.createElement("div");
            J.className = "delete-btn", J.onclick = () => {
              confirm("Are you sure?") && F.delete();
            }, ie.append(J);
          }
          A.append(ie);
        }
      }
      if (A.innerHTML === "" && (A.innerHTML = M ? `<p class="empty">${h ?? "No results found!"}</p>` : '<div class="spinner"></div>'), p && U > 1) {
        const F = document.createElement("div");
        F.className = "pagination";
        for (let ie = 1; ie < U + 1; ie++) {
          const z = document.createElement("button");
          z.innerText = ie.toString(), N === ie && (z.className = "checked"), z.onclick = () => {
            N !== ie && (N = ie, g && g(N), q());
          }, F.append(z);
        }
        A.append(F);
      }
    });
  };
  return {
    destroy: O,
    getObjects: () => b,
    updateFilter: E,
    updateSort: H
  };
}
function Bt(e, t) {
  var y;
  if (!e)
    throw new Error("mountObjectHistoryModal: missing object");
  const { title: n, onClose: s, ...r } = t ?? {}, o = n ?? `History of ${((y = e._blitzID) == null ? void 0 : y.value) ?? ""}`, i = document.createElement("div");
  i.className = "bd-oh-modal", i.setAttribute("data-bd-portal", "");
  const c = document.createElement("div");
  c.className = "box", c.onclick = (p) => p.stopPropagation(), c.innerHTML = `
        <div class="heading">
            <h2 class="title"></h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="panel"></div>
    `, c.querySelector(".title").textContent = o;
  const a = c.querySelector(".close-btn"), u = c.querySelector(".panel"), f = St(e, u, r);
  let l = null;
  const d = () => {
    l == null || l(), f.destroy(), i.remove(), s && s(e);
  };
  return i.onclick = () => d(), a.onclick = () => d(), i.append(c), document.body.append(i), l = Xe(i, {
    titleElm: c.querySelector(".title"),
    closeElm: a,
    onEscape: () => d()
  }), { destroy: d };
}
function li(e, t, n, s) {
  var Ue, it, Kt;
  if (!e)
    throw new Error("Missing model!");
  const r = typeof t == "string" ? document.getElementById(t) : t;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const { headerLabel: o, labelLanguage: i, searchRow: c, actions: a, allowDelete: u, readonly: f, noResultsMessage: l, onRowClick: d, reorder: y, tree: p, status: m } = s ?? {}, h = e.getAttributesDetails() ?? {}, v = Object.keys(h).filter((x) => !x.startsWith("_")), g = i ?? ((Ue = this.settings) == null ? void 0 : Ue.language) ?? "en", b = (x) => {
    var P, W;
    return o ? o(x, h[x]) : Ze((P = h[x]) == null ? void 0 : P["label-int"], (W = h[x]) == null ? void 0 : W.label, g, x);
  };
  let w = [], L = !1, N = null, S = null, M = null, A = !0, T = !1, O = null;
  const E = {}, H = (x) => {
    var P, W;
    return ["1", !0].includes((W = (P = e._attributes) == null ? void 0 : P[x]) == null ? void 0 : W.value);
  }, C = H("hasprojects") && !!((it = n == null ? void 0 : n.conditions) != null && it.some((x) => (x == null ? void 0 : x[0]) === "project_fk" && (x == null ? void 0 : x[1]) === "=")) ? "_projectsort" : "_sort", $ = y !== !1 && !f && H("hassort") && (!(n != null && n.customSort) || n.customSort === C) && (n == null ? void 0 : n.customSortDirection) !== "ASC", I = (x) => {
    var P;
    return Number(((P = x[C]) == null ? void 0 : P.value) ?? 0);
  };
  let U = null;
  const F = (x, P, W) => {
    var ue, ve, G, X;
    const Y = P[W - 1] ? I(P[W - 1]) : null, K = P[W] ? I(P[W]) : null;
    let oe;
    Y === null && K === null || (Y === null ? oe = K + 10 : K === null ? oe = Y - 10 : oe = Math.floor((Y + K) / 2), Y !== null && K !== null && oe <= K && (oe = Y), oe !== I(x) && ((X = (G = (ve = (ue = x[C]) == null ? void 0 : ue.edit) == null ? void 0 : ve.call(ue, String(oe))) == null ? void 0 : G.then) == null || X.call(G, () => ye())));
  }, ie = p !== !1 && ((Kt = h.parent_fk) == null ? void 0 : Kt.type) === e.getName() ? "parent_fk" : null, z = ie !== null, J = /* @__PURE__ */ new Set(), Z = (x) => String(x._blitzID.value), pe = (x) => {
    var W;
    const P = (W = x[ie]) == null ? void 0 : W.value;
    return P == null || P === "" ? null : typeof P == "object" ? P._blitzID ?? null : String(P);
  }, ce = (x) => {
    const P = new Map(x.map((G) => [Z(G), G])), W = /* @__PURE__ */ new Map(), Y = [];
    for (const G of x) {
      const X = pe(G);
      X !== null && X !== Z(G) && P.has(X) ? W.has(X) ? W.get(X).push(G) : W.set(X, [G]) : Y.push(G);
    }
    const K = (G, X) => I(X) - I(G);
    Y.sort(K);
    for (const G of W.values())
      G.sort(K);
    const oe = [], ue = /* @__PURE__ */ new Map(), ve = (G, X) => {
      for (const Oe of G)
        oe.push(Oe), ue.set(Z(Oe), { level: X, siblings: G }), J.has(Z(Oe)) || ve(W.get(Z(Oe)) ?? [], X + 1);
    };
    return ve(Y, 0), { view: oe, meta: ue, children: W, byId: P };
  }, be = (x, P, W) => {
    let Y = x, K = 0;
    for (; Y !== null && K++ < 100; ) {
      if (Y === P)
        return !0;
      const oe = W.get(Y);
      Y = oe ? pe(oe) : null;
    }
    return !1;
  }, j = (x, P, W, Y) => {
    var K, oe, ue, ve;
    pe(x) !== P && ((ve = (ue = (oe = (K = x[ie]) == null ? void 0 : K.edit) == null ? void 0 : oe.call(K, P)) == null ? void 0 : ue.then) == null || ve.call(ue, () => ye())), F(x, W, Y);
  };
  r.innerHTML = `<table class="bd-grid ${f ? "readonly " : ""}${e.getName() ?? ""}">
        <thead><tr class="bd-grid-head"></tr></thead><tbody></tbody>
    </table>`;
  const _ = r.querySelector("thead tr"), B = r.querySelector("thead"), k = r.querySelector("tbody"), V = () => {
    if ($) {
      const x = document.createElement("th");
      x.className = "reorder", _.append(x);
    }
    if (a) {
      const x = document.createElement("th");
      x.textContent = "Actions", _.append(x);
    }
    for (const x of ["_blitzID", ...v]) {
      const P = document.createElement("th");
      P.textContent = b(x), P.dataset.col = x, P.onclick = () => {
        M !== x ? (M = x, A = !0) : A ? A = !1 : (M = null, A = !0), ye();
      }, _.append(P);
    }
    if (u && !a && _.append(document.createElement("th")), c) {
      const x = document.createElement("tr");
      x.className = "bd-grid-search", $ && x.append(document.createElement("td")), a && x.append(document.createElement("td"));
      for (const P of ["_blitzID", ...v]) {
        const W = document.createElement("td"), Y = document.createElement("input");
        Y.placeholder = `Search ${b(P)}`, Y.oninput = () => {
          E[P] = Y.value.trim().toLowerCase(), ye();
        }, W.append(Y), x.append(W);
      }
      u && !a && x.append(document.createElement("td")), B.append(x);
    }
  }, se = (x) => {
    var P;
    for (const [W, Y] of Object.entries(E))
      if (Y && !String(((P = x[W]) == null ? void 0 : P.value) ?? "").toLowerCase().includes(Y))
        return !1;
    return !0;
  };
  let fe = new ut();
  const R = (x, P) => {
    fe.release(x), x.innerHTML = "", P && this.getHtmlElement(P, { status: m !== !1, statusScope: fe.for(x) }).then((W) => W && x.append(W)).catch(() => {
    });
  }, ne = () => {
    var Y;
    if (!O)
      return;
    const { td: x, attribute: P, handle: W } = O;
    O = null, (Y = W == null ? void 0 : W.destroy) == null || Y.call(W), x.classList.remove("editing"), R(x, P), T && ye();
  }, ae = async (x, P) => {
    var K;
    if (!P || (O == null ? void 0 : O.td) === x || !x.isConnected)
      return;
    ne(), x.classList.add("editing"), x.innerHTML = "";
    const W = { td: x, attribute: P, handle: null };
    O = W;
    const Y = await this.mountEditor(P, x, { onDone: () => ne(), context: "grid" });
    O === W ? W.handle = Y : (K = Y == null ? void 0 : Y.destroy) == null || K.call(Y);
  }, le = () => k.querySelectorAll(".drop-above, .drop-below, .drop-inside").forEach((x) => x.classList.remove("drop-above", "drop-below", "drop-inside")), me = (x, P, W) => {
    const Y = P.getBoundingClientRect(), K = x.clientY - Y.top;
    return W ? K < Y.height / 3 ? "above" : K > Y.height * 2 / 3 ? "below" : "inside" : K > Y.height / 2 ? "below" : "above";
  }, ge = (x, P, W, Y, K, oe) => {
    const ue = document.createElement("td");
    if (ue.className = "reorder", !K)
      return ue;
    const ve = oe ? oe.meta.get(Z(x)).siblings : W, G = oe ? ve.indexOf(x) : Y, X = document.createElement("span");
    X.className = "grip", X.title = "Drag to reorder", X.onmousedown = () => {
      P.draggable = !0, document.addEventListener("mouseup", () => {
        P.draggable = !1;
      }, { once: !0 });
    };
    const Oe = (Te, Pe, Ae, Fe) => {
      const Be = document.createElement("button");
      return Be.textContent = Te, Be.title = Pe, Be.disabled = Ae, Be.onclick = () => F(x, ve.filter((Bn) => Bn !== x), Fe), Be;
    };
    return ue.append(
      Oe("▲", "Move up", G === 0, G - 1),
      X,
      Oe("▼", "Move down", G === ve.length - 1, G + 1)
    ), P.ondragstart = (Te) => {
      var Pe;
      U = x, P.classList.add("dragging"), (Pe = Te.dataTransfer) == null || Pe.setData("text/plain", String(x._blitzID.value)), Te.dataTransfer && (Te.dataTransfer.effectAllowed = "move");
    }, P.ondragend = () => {
      P.draggable = !1, P.classList.remove("dragging"), U = null, le();
    }, P.ondragover = (Te) => {
      !U || U === x || (Te.preventDefault(), le(), P.classList.add(`drop-${me(Te, P, oe)}`));
    }, P.ondrop = (Te) => {
      if (!U || U === x)
        return;
      Te.preventDefault();
      const Pe = me(Te, P, oe);
      if (!oe) {
        const Ae = W.filter((Fe) => Fe !== U);
        F(U, Ae, Ae.indexOf(x) + (Pe === "below" ? 1 : 0));
        return;
      }
      if (Pe === "inside") {
        if (be(Z(x), Z(U), oe.byId))
          return;
        const Ae = (oe.children.get(Z(x)) ?? []).filter((Fe) => Fe !== U);
        J.delete(Z(x)), j(U, Z(x), Ae, 0);
      } else {
        const Ae = pe(x);
        if (Ae !== null && be(Ae, Z(U), oe.byId))
          return;
        const Fe = oe.meta.get(Z(x)).siblings.filter((Be) => Be !== U);
        j(U, Ae, Fe, Fe.indexOf(x) + (Pe === "below" ? 1 : 0));
      }
    }, ue;
  }, ye = () => {
    if (O) {
      T = !0;
      return;
    }
    T = !1, _.querySelectorAll("th[data-col]").forEach((K) => {
      K.dataset.col === M ? K.dataset.sort = A ? "asc" : "desc" : delete K.dataset.sort;
    });
    let x = w.filter(se);
    const P = Object.values(E).some(Boolean) || typeof N == "function";
    typeof N == "function" && (x = x.filter(N));
    let W = null;
    M ? x.sort(
      (K, oe) => {
        var ue, ve;
        return String(((ue = K[M]) == null ? void 0 : ue.value) ?? "").localeCompare(String(((ve = oe[M]) == null ? void 0 : ve.value) ?? ""), void 0, { numeric: !0 }) * (A ? 1 : -1);
      }
    ) : typeof S == "function" ? x.sort(S) : z && !P ? (W = ce(x), x = W.view) : $ && x.sort((K, oe) => I(oe) - I(K));
    const Y = $ && !M && typeof S != "function" && (!z || !!W);
    if (fe.destroy(), fe = new ut(), k.innerHTML = "", x.forEach((K, oe) => {
      const ue = document.createElement("tr");
      if ($ && ue.append(ge(K, ue, x, oe, Y, W)), a) {
        const G = document.createElement("td");
        if (G.className = "grid-actions", u) {
          const X = document.createElement("button");
          X.textContent = "✕", X.title = "delete", X.onclick = () => confirm(`delete ${K._blitzID.value}?`) && K.delete(), G.append(X);
        }
        if (a.edit) {
          const X = document.createElement("button");
          X.textContent = "✎", X.title = "edit", X.onclick = () => a.edit(K), G.append(X);
        }
        if (a.history) {
          const X = document.createElement("button");
          X.textContent = "🕘", X.title = "history", X.onclick = () => Bt(
            K,
            typeof a.history == "object" ? a.history : {}
          ), G.append(X);
        }
        ue.append(G);
      }
      const ve = document.createElement("td");
      if (ve.className = "id", ve.textContent = K._blitzID.value, d && (ve.onclick = () => d(K)), W) {
        const G = W.meta.get(Z(K)).level;
        if (ve.style.paddingLeft = `${8 + G * 16}px`, W.children.has(Z(K))) {
          const X = document.createElement("button");
          X.className = "tree-toggle", X.textContent = J.has(Z(K)) ? "▸" : "▾", X.title = J.has(Z(K)) ? "Expand" : "Collapse", X.onclick = (Oe) => {
            Oe.stopPropagation(), J.has(Z(K)) ? J.delete(Z(K)) : J.add(Z(K)), ye();
          }, ve.prepend(X);
        }
      }
      ue.append(ve);
      for (const G of v) {
        const X = document.createElement("td");
        f || (X.onclick = () => ae(X, K[G])), R(X, K[G]), ue.append(X);
      }
      if (u && !a) {
        const G = document.createElement("td");
        G.className = "kill", G.textContent = "×", G.onclick = () => confirm(`delete ${K._blitzID.value}?`) && K.delete(), ue.append(G);
      }
      k.append(ue);
    }), !x.length) {
      const K = v.length + 1 + (u || a ? 1 : 0) + ($ ? 1 : 0);
      k.innerHTML = L ? `<tr><td class="empty" colspan="${K}">${l ?? "No results found!"}</td></tr>` : `<tr><td class="loading" colspan="${K}"><div class="spinner"></div></td></tr>`;
    }
  }, Ee = (x) => {
    var P, W;
    !O || O.td.contains(x.target) || (W = (P = x.target).closest) != null && W.call(P, "[data-bd-portal]") || ne();
  }, Se = (x) => {
    var P, W;
    x.key === "Escape" && ((W = (P = x.target) == null ? void 0 : P.closest) != null && W.call(P, "[data-bd-portal]") || document.querySelector('[data-bd-portal][role="dialog"]') || ne());
  };
  f || (document.addEventListener("mousedown", Ee), document.addEventListener("keydown", Se)), V(), ye();
  let Me = !1;
  const Le = qn(e, n, (x, P) => {
    w = x, L = P, $ && !Me && P && x.length && x.every((W) => {
      var Y;
      return ((Y = W[C]) == null ? void 0 : Y.value) === void 0;
    }) && (Me = !0, console.warn(`mountGrid: model '${e.getName()}' has hassort but its rows carry no ${C} — reorder writes will not work. Is the attribute selected by the list query?`)), ye();
  });
  return {
    destroy: () => {
      ne(), fe.destroy(), f || (document.removeEventListener("mousedown", Ee), document.removeEventListener("keydown", Se)), Le(), r.innerHTML = "";
    },
    getObjects: () => w,
    updateFilter: (x) => {
      N = x, ye();
    },
    updateSort: (x) => {
      S = x, M = null, ye();
    }
  };
}
function Rt(e, t, n, s) {
  var q;
  if (!e)
    throw new Error("Missing model!");
  if (!n)
    throw new Error("Missing change callback!");
  const r = typeof t == "string" ? document.getElementById(t) : t;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    searchAttributes: o,
    filterAttributes: i,
    labels: c,
    fkSortDirection: a,
    labelLanguage: u,
    inlineMode: f,
    withLabels: l,
    searchPlaceholder: d,
    actionLabels: y
  } = s ?? {};
  r.innerHTML = `<div class="bd-filtersform ${e.getName() ?? ""}"></div>`;
  const p = r.querySelector(".bd-filtersform"), m = e.getAttributesDetails() ?? {}, h = ((q = e.getSystemAttributesDetails) == null ? void 0 : q.call(e)) ?? {}, v = (C) => m[C] ?? (i != null && i.includes(C) ? C === "project_fk" ? { type: "_Project", label: "Project" } : h[C] : void 0), g = u ?? (re == null ? void 0 : re.defaultLanguage) ?? "en", b = (C) => {
    if (c != null && c[C])
      return c[C];
    const $ = v(C);
    return Ze($ == null ? void 0 : $["label-int"], $ == null ? void 0 : $.label, g, C);
  }, w = (o ?? Object.keys(m)).filter((C) => !!m[C] && typeof m[C].type == "string" && ["varchar", "text"].includes(m[C].type));
  let L = null;
  if (w.length > 0) {
    if (L = document.createElement("input"), L.className = "search-input", L.type = "text", L.placeholder = d ?? "Search " + w.map((C) => b(C)).join(", ") + "...", f) {
      const C = It(() => E());
      L.oninput = () => C();
    }
    p.append(L);
  }
  const N = (De ?? we.ui).kernel, S = {};
  let M = !1, A = [];
  const T = (C) => {
    M ? C() : A.push(C);
  }, O = (i ?? Object.keys(m)).filter((C) => !!v(C) && !w.includes(C));
  for (const C of O) {
    const $ = l ? b(C) : void 0, I = yn(S, C, v(C), e, f ? () => E() : void 0, {
      className: C,
      label: $,
      placeholder: $ ? `${$}...` : b(C),
      ...a ? { sortDirection: a } : {}
    });
    if (!N.isFilterable(I))
      continue;
    const U = document.createElement("div");
    p.append(U), N.mount(I, U, "filter").then(T).catch((F) => console.error(`"${C}" Filter error:`, (F == null ? void 0 : F.stack) ?? (F == null ? void 0 : F.message)));
  }
  if (!f) {
    const C = document.createElement("button");
    C.className = "reset-btn", C.innerText = (y == null ? void 0 : y.reset) ?? "Reset", C.onclick = () => {
      L && (L.value = "");
      for (const U of Object.keys(S))
        delete S[U];
      n(null);
    };
    const $ = document.createElement("button");
    $.className = "apply-btn", $.innerText = (y == null ? void 0 : y.apply) ?? "Apply", $.onclick = () => {
      E();
    };
    const I = document.createElement("div");
    I.className = "actions", I.append(C, $), p.append(I);
  }
  const E = () => {
    const C = L != null && L.value ? (I) => w.some(
      (U) => typeof I[U].value == "string" && I[U].value.match(new RegExp(Ye(L.value), "gi"))
    ) : null, $ = gn(S);
    n(
      C && $ ? (I) => C(I) && $(I) : C ?? $ ?? null
    );
  };
  return { destroy: () => {
    M = !0;
    for (const C of A)
      C();
    A = [], r.innerHTML = "";
  } };
}
function Pn(e, t, n) {
  if (!e)
    throw new Error("Missing model!");
  if (!t)
    throw new Error("Missing change callback!");
  const { title: s, ...r } = n ?? {}, o = document.createElement("div");
  o.className = "bd-filtersmodal", o.setAttribute("data-bd-portal", "");
  const i = document.createElement("div");
  i.className = "box", i.innerHTML = `
        <div class="heading">
            <h2 class="title">${s ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="form"></div>
    `;
  const c = i.querySelector(".close-btn"), a = i.querySelector(".form"), { destroy: u } = Rt(
    e,
    a,
    (d) => {
      t(d), l();
    },
    {
      ...r,
      inlineMode: !1
    }
  );
  let f = null;
  const l = () => {
    f == null || f(), u(), o.remove();
  };
  return c.onclick = () => l(), o.onclick = (d) => {
    d && d.target !== d.currentTarget || l();
  }, o.append(i), document.body.append(o), f = Xe(o, {
    titleElm: i.querySelector(".title"),
    closeElm: c,
    onEscape: () => l()
  }), { destroy: l };
}
function ci(e, t, n, s, r) {
  if (!e)
    throw new Error("Missing model!");
  if (!n)
    throw new Error("Missing change callback!");
  const o = typeof t == "string" ? document.getElementById(t) : t;
  if (!(o instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    enableFiltersModal: i,
    filtersModalConfig: c,
    filtersButtonLabel: a,
    clearFiltersLabel: u,
    sortPlaceholder: f,
    sortAttributes: l,
    searchAttributes: d,
    filterAttributes: y,
    ...p
  } = r ?? {};
  let m = null, h = null;
  const v = f ?? "Sort by", g = l ?? [
    { attribute: "_blitzstamp", label: "Newest", order: "desc" },
    { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
  ];
  o.innerHTML = `<div class="bd-searchbox">
        <div class="form"></div>
        ${s ? `
            <select class="sort-select">
                <option value="" disabled>${v}</option>
                ${g.map((O, E) => `
                    <option value="${O.attribute + "--" + O.order}" ${E === 0 ? "selected" : ""}>
                        ${O.label}
                    </option>
                `).join(`
`)}
            </select>
        ` : ""}
        ${i ? `<button class="filters-btn">
            ${a ? `<span>${a}</span>` : ""}
        </button>` : ""}
        <button class="clear-btn">${u ? `<span>${u}</span>` : ""}</button>
    </div>`;
  const b = o.querySelector(".form"), w = o.querySelector(".sort-select"), L = o.querySelector(".filters-btn"), N = o.querySelector(".clear-btn");
  let S;
  const M = () => {
    S = Rt(
      e,
      b,
      (O) => {
        m = O, A();
      },
      {
        ...p,
        searchAttributes: d,
        filterAttributes: y ?? [],
        inlineMode: !0
      }
    );
  };
  M(), L && (L.onclick = () => {
    Pn(
      e,
      (O) => {
        h = O, A();
      },
      {
        ...p,
        searchAttributes: [],
        ...c
      }
    );
  }), N.onclick = () => {
    m = null, h = null, S && S.destroy(), M(), A();
  };
  const A = () => {
    N.style.display = m || h ? "flex" : "none", n(
      m && h ? (O) => m(O) && h(O) : m ?? h ?? null
    );
  };
  if (w && s) {
    const O = e.getAttributesDetails() ?? {};
    w.onchange = () => {
      var I;
      const H = w.value.split("--"), q = H[0], C = H[1], $ = ((I = O[q]) == null ? void 0 : I.type) ?? "int";
      s(
        w.value ? (U, F) => {
          var ie, z, J, Z;
          if (!q || !C)
            return 0;
          if (["int", "tinyint", "double", "float", "percentage"].includes($)) {
            const pe = (ie = U[q]) != null && ie.value ? U[q].value : 0, ce = (z = F[q]) != null && z.value ? F[q].value : 0;
            return C === "asc" ? pe - ce : ce - pe;
          }
          if (["varchar", "text"].includes($)) {
            const pe = ((J = U[q]) == null ? void 0 : J.value) || "", ce = ((Z = F[q]) == null ? void 0 : Z.value) || "";
            return !pe && ce ? 1 : !ce && pe ? -1 : C === "asc" ? ce.localeCompare(pe, void 0, { sensitivity: "base" }) : pe.localeCompare(ce, void 0, { sensitivity: "base" });
          }
          return 0;
        } : null
      );
    };
    const E = g[0];
    E && (E.attribute !== "_blitzstamp" || E.order !== "desc") && w.onchange(null);
  }
  return { destroy: () => {
    S && S.destroy(), o.innerHTML = "";
  } };
}
function ln(e, t, n) {
  const s = e == null ? void 0 : e.presentation, r = (typeof s == "string" ? s : s == null ? void 0 : s[t]) ?? "inline";
  return r !== "auto" ? r : (typeof n == "string" ? n.length : n == null ? 0 : JSON.stringify(n).length) >= (e.modalThreshold ?? 100) ? "modal" : "expandable";
}
async function di(e, t) {
  var v, g, b, w, L, N, S, M, A;
  if (!e)
    throw new Error("Missing attribute!");
  const { title: n, use: s, live: r, onDone: o, onClose: i } = t ?? {}, c = document.createElement("div");
  c.className = "bd-editor-modal", c.setAttribute("data-bd-portal", "");
  const a = document.createElement("div");
  a.className = "box", a.onclick = (T) => T.stopPropagation(), a.innerHTML = `
        <div class="heading">
            <h2 class="title"></h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="editor"></div>
    `;
  const u = ((w = (b = (g = (v = e._object) == null ? void 0 : v.model) == null ? void 0 : g.getAttributesDetails) == null ? void 0 : b.call(g)) == null ? void 0 : w[e._name]) ?? {};
  a.querySelector(".title").textContent = n ?? Ze(u["label-int"], u.label, ((L = this.settings) == null ? void 0 : L.language) ?? "en", e._name);
  const f = a.querySelector(".editor");
  let l = null, d = null, y = !1;
  const p = () => {
    var T;
    y || (y = !0, d == null || d(), (T = l == null ? void 0 : l.destroy) == null || T.call(l), c.remove(), i == null || i());
  };
  let m;
  const h = () => {
    var q, C, $;
    const T = (q = l == null ? void 0 : l.getDraft) == null ? void 0 : q.call(l), O = e.value, E = (C = t == null ? void 0 : t.config) == null ? void 0 : C.draft, H = typeof T == "string" && (l != null && l.isPending ? l.isPending() || E !== void 0 && T === E : T !== m && T !== (typeof O == "string" ? O : O == null ? "" : void 0));
    H && !confirm("Discard unsaved changes?") || (H && (($ = l == null ? void 0 : l.cancelPending) == null || $.call(l)), p());
  };
  return c.onclick = () => h(), a.querySelector(".close-btn").onclick = () => h(), c.append(a), document.body.append(c), d = Xe(c, {
    titleElm: a.querySelector(".title"),
    closeElm: a.querySelector(".close-btn"),
    onEscape: h
  }), l = await this.mountEditor(e, f, {
    use: s,
    live: r,
    config: { ...t == null ? void 0 : t.config, presentation: "inline" },
    onDone: () => {
      p(), o == null || o();
    }
  }), ((N = t == null ? void 0 : t.config) == null ? void 0 : N.draft) === void 0 && (m = (S = l == null ? void 0 : l.getDraft) == null ? void 0 : S.call(l)), (A = (M = f.querySelector("textarea, input")) == null ? void 0 : M.focus) == null || A.call(M), { destroy: p };
}
const ui = `<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
</svg>`;
async function cn(e, t, n, s) {
  let r = await n(), o = null, i = !1;
  const c = document.createElement("div");
  c.className = "bd-editor-expand", c.title = s.expandTitle ?? "Expand", c.setAttribute("role", "button"), c.setAttribute("aria-label", s.expandTitle ?? "Expand"), c.tabIndex = 0, c.onkeydown = (f) => {
    f.key !== "Enter" && f.key !== " " || (f.preventDefault(), c.click());
  }, c.innerHTML = s.expandIcon ?? ui;
  const a = Ce(t, "bd-expandable");
  t.append(c);
  const u = () => {
    r != null && r.getDraft || c.remove();
  };
  return t.addEventListener("input", u), c.onclick = async (f) => {
    var y, p;
    f.stopPropagation();
    const l = (y = r == null ? void 0 : r.getDraft) == null ? void 0 : y.call(r);
    (p = r == null ? void 0 : r.destroy) == null || p.call(r), r = null, c.remove();
    const d = await this.mountEditorInModal(e, {
      use: s.use,
      config: { ...s.config, ...l !== void 0 ? { draft: l } : {} },
      onClose: async () => {
        var m, h;
        if (o = null, (m = s.onDone) == null || m.call(s), !i) {
          try {
            r = await n();
          } catch (v) {
            console.error(`"${e._name}" remount failed:`, (v == null ? void 0 : v.stack) ?? (v == null ? void 0 : v.message) ?? v);
            return;
          }
          if (i) {
            (h = r == null ? void 0 : r.destroy) == null || h.call(r), r = null;
            return;
          }
          t.append(c);
        }
      }
    });
    if (i) {
      d.destroy();
      return;
    }
    o = d;
  }, {
    destroy: () => {
      var f, l;
      i = !0, t.removeEventListener("input", u), c.remove(), a(), (f = o == null ? void 0 : o.destroy) == null || f.call(o), (l = r == null ? void 0 : r.destroy) == null || l.call(r);
    }
  };
}
const fi = ["htmlText", "image", "video", "file", "location", "youtube", "tag", "code"], pi = ["image", "tag"];
var we, re, De;
class Ut {
  /**
   * Constructor
   */
  constructor(t, n) {
    /**
     * The DatatypeUI kernel: one registry of type modules, one config
     * cascade, one mount. Every mount path routes through it.
     */
    ee(this, "registry", new Zn((t) => this.warn(t)));
    ee(this, "uiConfig", new Yn());
    ee(this, "kernel", new rs({
      registry: this.registry,
      config: this.uiConfig,
      resolveModel: (t) => we._Model.get(t),
      warn: (t) => this.warn(t),
      isDebug: () => this.debug
    }));
    /**
     * Enable dev-time logging: which layer supplied each surface, unresolved
     * hints, contract violations. Silent in production; a fallback is by
     * design, never an error.
     */
    ee(this, "debug", !1);
    /** Live handle to the mounted inspector tab, or null when it's off. */
    ee(this, "txiHandle", null);
    /** Desired on/off state — the constructor default, then any live toggle. */
    ee(this, "txiWanted", !1);
    /** True while the inspector chunk import is in flight (guards overlap). */
    ee(this, "txiLoading", !1);
    /** Tab options captured from the `transactionInspector` constructor value. */
    ee(this, "transactionInspectorConfig", {});
    /**
     * Inputs
     */
    ee(this, "inputs", {
      text: xe,
      textarea: Re,
      number: Ne,
      phone: ft(() => import("./index-e5e65037.js")),
      boolean: jt,
      date: st,
      html: ft(() => import("./index-0762bf09.js")),
      image: wt,
      video: qt,
      file: Pt,
      pdf: wn,
      location: Ft,
      "text-many": vt,
      i18n: Dt
    });
    /**
     * Pickers
     */
    ee(this, "pickers", {
      object: rt,
      enum: nt,
      projectUsers: gr,
      list: vr
    });
    /**
     * Attribute editors: the built-in EDIT surface per type, seeded into the
     * kernel as each module's `editor`. They shrink under a preset policy and
     * evaporate one by one as type modules take over their binding.
     */
    ee(this, "editors", {
      fk: br,
      enum: wr,
      // the two heavy editors stay behind import(): htmlText carries
      // EditorJS (+plugins, fslightbox), phone carries libphonenumber.
      // Everything else is a few hundred bytes — a chunk per editor would
      // trade one network round-trip for nothing (see docs: 38 chunks
      // deferred a combined ~7 KB gzip).
      htmlText: je(() => import("./index-cdd19fdb.js")),
      varchar: Er,
      text: en,
      markdown: en,
      tag: Ir,
      texti18n: Or,
      email: $r,
      phone: je(() => import("./index-f96d44b8.js")),
      url: Sr,
      youtube: qr,
      int: tn,
      tinyint: tn,
      double: Ct,
      float: Ct,
      percentage: Ct,
      currency: Nr,
      duration: jr,
      formula: Dr,
      hex: Pr,
      boolean: Cr,
      json: Lr,
      code: xr,
      date: kr,
      datetime: Mr,
      image: Tr,
      video: _r,
      file: Ar,
      location: Hr
    });
    /**
     * Many attribute editors
     */
    ee(this, "manyEditors", {
      mtm: Fr,
      enum: Vr,
      image: zr,
      varchar: nn,
      text: nn,
      tag: Br
    });
    /**
     * Extensions methods
     */
    ee(this, "getHTML", _n);
    ee(this, "getHtmlElement", zt);
    // Typed as any until the pinned core exposes the destroy-handle signature
    ee(this, "mountHtmlElement", ei);
    ee(this, "mountAddForm", An);
    ee(this, "mountAddFormModal", si);
    ee(this, "mountList", ai);
    ee(this, "mountGrid", li);
    ee(this, "mountFiltersForm", Rt);
    ee(this, "mountFiltersModal", Pn);
    ee(this, "mountSearchBox", ci);
    ee(this, "mountObjectView", Dn);
    ee(this, "mountObjectViewModal", Nn);
    ee(this, "mountObjectHistory", St);
    ee(this, "mountObjectHistoryModal", Bt);
    ee(this, "mountEditorInModal", di);
    var c;
    we = t;
    const s = typeof n == "string" ? { preset: n } : Array.isArray(n) ? { use: n } : n ?? {};
    re = s, De = this;
    const r = s.preset ?? "expanded";
    if (r === "readonly")
      this.editors = {}, this.manyEditors = {};
    else if (r === "basic") {
      for (const a of fi)
        delete this.editors[a];
      for (const a of pi)
        delete this.manyEditors[a];
    }
    for (const a of Ws)
      this.registry.register(this.withCanonicalView(mn(a.type), a));
    for (const [a, u] of Object.entries(this.editors))
      this.registry.mergeBuiltin(a, { editor: He(u) });
    const o = { mtm: "mtm", enum: "enum[]", image: "image[]", varchar: "varchar[]", text: "text[]", tag: "tag[]" };
    for (const [a, u] of Object.entries(this.manyEditors))
      this.registry.mergeBuiltin(o[a] ?? a, { editor: He(u) });
    for (const [a, u] of Object.entries(Wr))
      this.registry.mergeBuiltin(a, { view: et(u) });
    r === "extended" && Ln(this), this.settings = {
      language: s.defaultLanguage ?? "en",
      ...s.formatDates !== void 0 ? { formatDates: s.formatDates } : {}
    }, s.defaultDialCode && this.setConfig("phone", { defaultDialCode: s.defaultDialCode }), s.googleMapsApiKey && this.setConfig("location", { apiKey: s.googleMapsApiKey }), this.services = {
      upload: (a) => we.uploader(a),
      uploadVideo: (a) => we.uploaderVideo(a),
      uploadFile: (a) => we.uploaderFile(a)
    }, (c = s.use) != null && c.length && this.use(s.use);
    const i = s.transactionInspector;
    i && typeof i == "object" && (this.transactionInspectorConfig = i), this.transactionInspector = i !== !1;
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
      const { type: s, ...r } = n;
      for (const o of [s].flat())
        this.defineUI(o, r);
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
    const { shell: s, preload: r } = this.buildRemote(t, n, (o, i, c) => {
      c ? (typeof i.view == "function" && (o.view = et(i.view, i.hydrator)), this.registry.definePreset(t, o), this.registry.defineUI(t, o)) : (this.definePreset(t, o), o.control && this.registry.defineUI(t, { control: o.control }));
    });
    return this.registry.definePreset(t, s), this.registry.defineUI(t, s), { preload: r };
  }
  /** Remote UI for one attribute of one model. */
  setRemoteUIFor(t, n, s) {
    const r = `${t}.${n}`, { shell: o, preload: i } = this.buildRemote(r, s, (c, a, u) => {
      u ? (typeof a.view == "function" && (c.view = et(a.view, a.hydrator)), this.registry.defineUIFor(t, n, c)) : this.defineUIFor(t, n, c);
    });
    return this.registry.defineUIFor(t, n, o), { preload: i };
  }
  /**
   * The remote plumbing: memoized fetch, module-shape classification (an
   * OBJECT default export is a DatatypeUI; a FUNCTION default export is a
   * legacy attribute-bound editor with optional view/hydrator exports),
   * and the lazy shell that mounts before the module has loaded.
   */
  buildRemote(t, n, s) {
    let r = null;
    const o = () => r ?? (r = Gn(n).then((c) => {
      const a = typeof c.default == "function", u = a ? { editor: He(c.default) } : { ...c.default };
      return s(u, c, a), u;
    }).catch((c) => {
      throw r = null, this.warn(`remote UI '${t}' (${n}) failed: ${c.message} — next layer down mounts`), c;
    }));
    return { shell: {
      control: async (c) => {
        const a = await o();
        if (!a.control)
          throw new Error(`remote UI '${t}' has no control`);
        return a.control(c);
      },
      editor: async (c) => {
        const a = await o(), u = a.editor ?? a.control;
        if (!u)
          throw new Error(`remote UI '${t}' has no editor`);
        return u(c);
      }
    }, preload: () => o().then(() => {
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
    typeof document > "u" || (this.txiWanted && !this.txiHandle && !this.txiLoading ? (this.txiLoading = !0, Promise.resolve().then(() => vi).then(({ default: t }) => {
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
      var r, o, i, c;
      for (const a of n)
        (o = (r = this.editors[a]) == null ? void 0 : r.preload) == null || o.call(r), (c = (i = this.manyEditors[a]) == null ? void 0 : i.preload) == null || c.call(i);
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
    return (r, o) => {
      var d, y, p, m, h, v, g;
      if ((s.empty ?? Jn)(r.value))
        return "";
      const c = ((m = (p = (y = (d = r._object) == null ? void 0 : d.model) == null ? void 0 : y.getAttributesDetails) == null ? void 0 : p.call(y)) == null ? void 0 : m[r._name]) ?? {}, a = ht(r._name, c.type ?? r._type), u = this.uiConfig.resolve(a, (g = (v = (h = r._object) == null ? void 0 : h.model) == null ? void 0 : v.getName) == null ? void 0 : g.call(v), r._name, s.defaultConfig, void 0), f = n({ value: r.value, attributeDetails: c, config: u, settings: this.uiConfig.settings });
      if (!f)
        return "";
      const l = (b) => mi(b, `${r._name} bd-${t}`, o == null ? void 0 : o.labelHtml);
      return typeof f == "string" ? l(f) : { html: l(f.html), hydrate: (b) => {
        var w;
        return ((w = f.hydrate) == null ? void 0 : w.call(f, b)) ?? void 0;
      } };
    };
  }
  /**
   * Resolve the read view for an attribute through the kernel registry —
   * one resolution rule for all three surfaces. Total: the text/json
   * fallback is the floor for types with no view anywhere.
   */
  resolveView(t) {
    const n = this.kernel.resolveForPort(Qe(t));
    return n.view ? { render: n.view, layer: n.sources.view.layer } : { render: et(Jr), layer: 0 };
  }
  /**
   * The hydrate pass re-renders the view fresh — a hydrating view returns
   * { html, hydrate }, everything else no-ops. No side registrations.
   */
  resolveHydrator(t) {
    const { render: n } = this.resolveView(t);
    return (s, r) => {
      var i;
      const o = n(r ?? t, {});
      return typeof o == "object" && o ? ((i = o.hydrate) == null ? void 0 : i.call(o, s)) ?? void 0 : void 0;
    };
  }
  /** Hydrate serialized shells under root (see docs/extending.md). */
  hydrate(t) {
    return Qr(t, (n) => this.resolveHydrator(n), (n) => this.warn(n));
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
    const r = this.wrapMarkup(s.html);
    return Xr(r, t) || this.warn(`${t._name}: view hydrates but attribute has no resolvable object — shell stays static`), r.outerHTML;
  }
  /**
   * Read-only markup, element form: the resolved view's output, hydrated
   * immediately (element contexts are live). null = skip.
   */
  resolveReadonlyElement(t, n) {
    const s = this.resolveView(t).render(t, n);
    if (!s)
      return null;
    const r = this.wrapMarkup(typeof s == "string" ? s : s.html);
    return typeof s == "object" && s.hydrate && kn(r, (o) => s.hydrate(o) ?? void 0, t), r;
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
  withLiveRemount(t, n, s, r) {
    const o = t._object;
    if (typeof (o == null ? void 0 : o.addEventListener) != "function")
      return r;
    let i = r, c = !1, a = !1, u = !1, f = !1;
    const l = async () => {
      if (c) {
        a = !0;
        return;
      }
      c = !0;
      try {
        do
          a = !1, typeof (i == null ? void 0 : i.destroy) == "function" && i.destroy(), n.innerHTML = "", i = null, i = await s();
        while (a && !f);
      } catch (p) {
        console.error(`"${t._name}" live remount failed:`, (p == null ? void 0 : p.stack) ?? (p == null ? void 0 : p.message) ?? p);
      } finally {
        c = !1, f && typeof (i == null ? void 0 : i.destroy) == "function" && i.destroy();
      }
    }, d = (p) => {
      if (!(!p || !Object.hasOwn(p, t._name))) {
        if (n.contains(document.activeElement)) {
          u = !0;
          return;
        }
        l();
      }
    }, y = (p) => {
      u && (p.relatedTarget instanceof Node && n.contains(p.relatedTarget) || (u = !1, l()));
    };
    return o.addEventListener("remoteChange", d), n.addEventListener("focusout", y), {
      ...r,
      // capabilities must follow the remounts — the initial handle's
      // would reach a widget a remount already removed
      ...r.getDraft ? { getDraft: () => {
        var p;
        return (p = i == null ? void 0 : i.getDraft) == null ? void 0 : p.call(i);
      } } : {},
      ...r.isPending ? { isPending: () => {
        var p;
        return (p = i == null ? void 0 : i.isPending) == null ? void 0 : p.call(i);
      } } : {},
      ...r.cancelPending ? { cancelPending: () => {
        var p;
        return (p = i == null ? void 0 : i.cancelPending) == null ? void 0 : p.call(i);
      } } : {},
      destroy: () => {
        f = !0, o.removeEventListener("remoteChange", d), n.removeEventListener("focusout", y), !c && typeof (i == null ? void 0 : i.destroy) == "function" && i.destroy();
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
    const r = () => n();
    t.addEventListener("bd-editor-done", r);
    const o = s == null ? void 0 : s.destroy;
    return {
      ...s,
      destroy: () => {
        t.removeEventListener("bd-editor-done", r), typeof o == "function" && o.call(s);
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
    const r = this.inputs[t];
    if (!r)
      throw new Error("Input for this type not supported!");
    return r(n, s);
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
    const r = this.pickers[t];
    if (!r)
      throw new Error("Picker for this type not supported!");
    return await r(n, s);
  }
  /**
   * Mount editor in the DOM — kernel-routed: mount(livePort(attr), 'write').
   * Task: https://alpha.blitzdata.com/blitzpm/task/2gemtg-65t0b?proj=1s4dec-3ibnqe
   */
  async mountEditor(t, n, s) {
    var a, u;
    if (!t)
      throw new Error("Missing attribute(s)!");
    const r = typeof n == "string" ? document.getElementById(n) : n;
    if (!(r instanceof HTMLElement))
      throw new Error("Container parameter not valid!");
    let o = [], i = !1;
    t instanceof Array ? o.push(...t) : Object.hasOwn(t, "_attributes") ? (i = !0, o.push(
      ...Object.values(t._attributes).filter((f) => !f._name.startsWith("_") && !f._name.startsWith("@"))
    )) : o.push(t), i && (o = o.filter((f) => f.value !== void 0));
    const c = o.length > 0 ? ((u = (a = o[0]._object) == null ? void 0 : a.model) == null ? void 0 : u.getAttributesDetails()) ?? {} : {};
    if (o.length === 0)
      throw new Error("No attribute found!");
    if (o.length === 1) {
      const f = o[0], l = this.kernel.resolveConfig(Qe(f, { ...s, ...s == null ? void 0 : s.config }), s == null ? void 0 : s.use), d = ln(l, (s == null ? void 0 : s.context) ?? "form", f.value);
      if (d === "modal")
        return this.mountEditorInModal(f, {
          use: s == null ? void 0 : s.use,
          config: s == null ? void 0 : s.config,
          live: s == null ? void 0 : s.live,
          onClose: s == null ? void 0 : s.onDone
        });
      const y = async () => {
        const m = await this.kernel.mount(
          Qe(f, { ...s, ...s == null ? void 0 : s.config }),
          r,
          "write",
          s == null ? void 0 : s.use
        ), { getDraft: h, isPending: v, cancelPending: g } = m;
        return { destroy: m, ...h && { getDraft: h }, ...v && { isPending: v }, ...g && { cancelPending: g } };
      }, p = async () => {
        let m = await y();
        return s != null && s.live && (m = this.withLiveRemount(f, r, y, m)), this.withDoneListener(r, s == null ? void 0 : s.onDone, m);
      };
      return d === "expandable" ? cn.call(this, f, r, p, {
        use: s == null ? void 0 : s.use,
        config: s == null ? void 0 : s.config,
        onDone: s == null ? void 0 : s.onDone,
        expandIcon: l.expandIcon,
        expandTitle: l.expandTitle
      }) : p();
    } else {
      r.innerHTML = "";
      const f = ["bd-object-editor"];
      !Array.isArray(t) && Object.hasOwn(t, "_attributes") && f.push(t._blitzID.value), r.classList.add(...f);
      const l = (s == null ? void 0 : s.labelLanguage) ?? this.settings.language ?? "en", d = (p) => {
        var m, h;
        return Ze((m = c[p]) == null ? void 0 : m["label-int"], (h = c[p]) == null ? void 0 : h.label, l, p);
      };
      let y = [];
      for (const p of o) {
        if (!c[p._name])
          continue;
        const m = document.createElement("div");
        r.append(m);
        const h = s != null && s.withLabels || ["boolean", "datetime", "date", "image", "video", "file"].includes(p._type) ? d(p._name) : void 0, v = h ? `${h}...` : d(p._name), g = {
          className: p._name,
          label: h,
          placeholder: v,
          ...s != null && s.defaultDialCode ? { defaultDialCode: s.defaultDialCode } : {},
          ...s != null && s.googleMapsApiKey ? { apiKey: s.googleMapsApiKey, initialExpand: s == null ? void 0 : s.locationFieldsExpand } : {},
          ...s != null && s.listEmptyMsg ? { emptyMsg: s.listEmptyMsg } : {},
          ...s == null ? void 0 : s.config
        }, b = async () => {
          const M = await this.kernel.mount(Qe(p, g), m, "write"), { getDraft: A, isPending: T, cancelPending: O } = M;
          return { destroy: M, ...A && { getDraft: A }, ...T && { isPending: T }, ...O && { cancelPending: O } };
        }, w = async () => {
          let M = await b();
          return s != null && s.live && (M = this.withLiveRemount(p, m, b, M)), M;
        }, L = this.kernel.resolveConfig(Qe(p, g)), N = ln(L, "form", p.value);
        let S;
        try {
          S = N === "inline" ? await w() : await cn.call(this, p, m, w, {
            config: s == null ? void 0 : s.config,
            expandIcon: L.expandIcon,
            expandTitle: L.expandTitle
          });
        } catch (M) {
          console.error(`"${p._name}" Editor Error:`, M.stack ?? M.message);
        }
        S && typeof S.destroy == "function" && y.push(S.destroy);
      }
      return {
        destroy: () => {
          for (const p of y)
            p();
          y = [], r.innerHTML = "", r.classList.remove(...f);
        }
      };
    }
  }
}
/**
 * Version of the library
 */
ee(Ut, "VERSION", "2.14.10");
function mi(e, t, n) {
  const s = document.createElement("div");
  s.innerHTML = e.trim();
  const r = s.childNodes.length === 1 ? s.firstElementChild : null;
  if (r) {
    const o = r.getAttribute("class");
    return r.setAttribute("class", o ? `${t} ${o}` : t), n && r.insertAdjacentHTML("afterbegin", n), r.outerHTML;
  }
  return `<div class="${t}">${n ?? ""}${e}</div>`;
}
class yi extends Ut {
  constructor(t, n) {
    super(t, n), Ln(this);
  }
}
function dn(e) {
  return e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Wt(e, t = "") {
  const n = document.activeElement, s = document.createElement("div");
  s.className = "bd-lightbox", s.setAttribute("data-bd-portal", ""), s.setAttribute("role", "dialog"), s.setAttribute("aria-modal", "true"), t && s.setAttribute("aria-label", t), s.innerHTML = `
        <div class="bd-lightbox__inner">
            <img src="${dn(e)}" alt="${dn(t)}">
        </div>
        <button type="button" class="bd-lightbox__close" aria-label="Close"><span>✕</span></button>
    `;
  const r = () => {
    s.remove(), document.removeEventListener("keydown", o), n && typeof n.focus == "function" && n.focus();
  }, o = (c) => {
    c.key === "Escape" && r();
  };
  s.addEventListener("click", (c) => {
    const a = c.target;
    (a === s || a != null && a.closest(".bd-lightbox__close")) && r();
  }), document.addEventListener("keydown", o), document.body.appendChild(s);
  const i = s.querySelector(".bd-lightbox__close");
  return i == null || i.focus(), { close: r };
}
function Fn(e = document, t = "[data-lightbox]", n = {}) {
  const s = n.resolveSrc ?? ((i) => {
    const c = i instanceof HTMLElement ? i.dataset.lightboxSrc : null;
    if (c)
      return c;
    const a = i.querySelector("img") ?? (i.tagName === "IMG" ? i : null);
    return a && (a.currentSrc || a.src) || null;
  }), r = n.resolveAlt ?? ((i) => {
    const c = i.querySelector("img") ?? (i.tagName === "IMG" ? i : null);
    return (c == null ? void 0 : c.alt) ?? "";
  }), o = (i) => {
    const c = i.target, a = c == null ? void 0 : c.closest(t);
    if (!a || !e.contains(a))
      return;
    const u = s(a);
    u && (i.preventDefault(), Wt(u, r(a)));
  };
  return e.addEventListener("click", o), () => e.removeEventListener("click", o);
}
const hi = {
  open: Wt,
  attach: Fn
};
function Vn(e, t = {}) {
  var pe, ce, be;
  const n = typeof e == "string" ? document.querySelector(e) : e;
  if (!n)
    throw new Error("mountTransactionInspector: container not found");
  const s = n, r = t.queue ?? lt.queue, o = t.confirmDrop !== !1, i = t.emptyMessage ?? "No unresolved transactions!", c = typeof ((pe = r == null ? void 0 : r.failedHandler) == null ? void 0 : pe.drop) == "function", a = typeof ((ce = r == null ? void 0 : r.conflictHandler) == null ? void 0 : ce.resolve) == "function", u = typeof ((be = r == null ? void 0 : r.conflictHandler) == null ? void 0 : be.prompt) == "function";
  s.classList.add("bd-txi");
  let f = {}, l = null, d = null, y = !0, p = null, m = !1, h = !1;
  const v = /* @__PURE__ */ new Map(), g = [D.Conflict, D.Failed, D.Pending, D.Completed], b = (j) => {
    const _ = g.indexOf(j);
    return _ === -1 ? 99 : _;
  }, w = (j) => j[0].id, L = (j) => j.find((_) => _.message !== void 0) ?? null, N = (j) => Object.keys(j.transaction.data ?? {})[0] ?? null, S = (j) => {
    if (j === void 0)
      return "—";
    if (typeof j == "object")
      try {
        return JSON.stringify(j);
      } catch {
        return String(j);
      }
    return String(j);
  }, M = (j) => {
    try {
      return new Date(j).toLocaleString();
    } catch {
      return String(j);
    }
  };
  function A(j) {
    const _ = /* @__PURE__ */ new Map();
    for (const B of j) {
      const k = _.get(B.status) ?? [];
      k.push(B), _.set(B.status, k);
    }
    return [..._.values()];
  }
  async function T() {
    if (h)
      return;
    y = !0, p = null, z();
    let j = {};
    try {
      j = r != null && r.failedHandler ? await r.failedHandler.getAll() : {};
    } catch (k) {
      p = k.message;
    }
    f = {}, v.clear();
    for (const k of Object.keys(j)) {
      const V = [];
      for (const se of j[k])
        for (const fe of A(se))
          fe[0] && (V.push(fe), v.set(w(fe), fe));
      f[k] = V;
    }
    const _ = Object.keys(f);
    (!l || !f[l]) && (l = _[0] ?? null);
    const B = l ? f[l] : [];
    (!d || !B.some((k) => w(k) === d)) && (d = B[0] ? w(B[0]) : null), y = !1, z();
  }
  async function O(j, _) {
    var se, fe, R, ne;
    if (m)
      return;
    const B = v.get(j);
    if (!(B != null && B.length) || _ === "drop" && o && !confirm(`Drop this transaction from the queue?
The local change stays in place — client and server may diverge.`))
      return;
    m = !0, z();
    const k = r == null ? void 0 : r.failedHandler, V = r == null ? void 0 : r.conflictHandler;
    try {
      if (_ === "retry")
        await (k == null ? void 0 : k.retry(B));
      else if (_ === "revert")
        await (k == null ? void 0 : k.revert(B));
      else if (_ === "drop")
        await ((se = k == null ? void 0 : k.drop) == null ? void 0 : se.call(k, B));
      else if (_ === "execute") {
        const ae = L(B);
        ae && await ((fe = V == null ? void 0 : V.resolve) == null ? void 0 : fe.call(V, ae, !0));
      } else if (_ === "take-server") {
        const ae = L(B);
        ae && await ((R = V == null ? void 0 : V.resolve) == null ? void 0 : R.call(V, ae, !1));
      } else if (_ === "resolve-prompt") {
        const ae = L(B);
        ae && await ((ne = V == null ? void 0 : V.prompt) == null ? void 0 : ne.call(V, ae));
      }
    } catch (ae) {
      alert("Action failed: " + ae.message);
    }
    m = !1, await T();
  }
  function E() {
    const j = (l ? f[l] : []).slice().sort((_, B) => b(_[0].status) - b(B[0].status) || _[0].createdAt - B[0].createdAt);
    return j.length ? Q`<ul class="bd-txi-rows">${te(j.map((_) => {
      const B = _[0], k = N(B), V = k ? `${B.transaction.blitzID} · ${k}` : B.transaction.blitzID, se = _.length > 1 ? Q`<span class="bd-txi-chain">×${_.length}</span>` : "";
      return Q`<li>
                <button class="bd-txi-row ${te(w(_) === d ? "is-active" : "")}" data-select="${w(_)}">
                    <span class="bd-txi-dot bd-txi-${B.status}"></span>
                    <span class="bd-txi-row-main">
                        <span class="bd-txi-row-top">
                            <span class="bd-txi-action">${B.transaction.action}</span>
                            <span class="bd-txi-model">${B.transaction.model}</span>${te(se)}
                        </span>
                        <span class="bd-txi-row-sub">${V}</span>
                    </span>
                </button>
            </li>`;
    }).join(""))}</ul>` : Q`<p class="bd-txi-empty">${i}</p>`;
  }
  const H = 280;
  function q(j) {
    var R;
    const _ = N(j);
    if (j.transaction.action !== "edit" || !_)
      return "";
    const B = ((R = j.transaction.data) == null ? void 0 : R[_]) ?? {}, k = S(B.prev), V = S(B.new), se = k.length + V.length > H, fe = Q`<div class="bd-txi-diff ${te(se ? "is-large" : "")}">
                <span class="bd-txi-prev">${k}</span>
                <span class="bd-txi-arrow">→</span>
                <span class="bd-txi-new">${V}</span>
            </div>`;
    return se ? Q`<div class="bd-txi-field"><label>${_}</label>
            <details class="bd-txi-fold">
                <summary><span class="bd-txi-fold-preview">${V.slice(0, 120)}</span><span class="bd-txi-fold-meta">${String(k.length)} → ${String(V.length)} chars</span></summary>
                ${te(fe)}
            </details></div>` : Q`<div class="bd-txi-field"><label>${_}</label>${te(fe)}</div>`;
  }
  function C(j) {
    var _;
    return (_ = j.dataHistory) != null && _.length ? Q`<div class="bd-txi-field"><label>History</label><ul class="bd-txi-history">${te(j.dataHistory.map(
      (B) => Q`<li><span class="bd-txi-htype">${B.type}</span><span class="bd-txi-htime">${M(B.timestamp)}</span><code>${S(B.data)}</code></li>`
    ).join(""))}</ul></div>` : "";
  }
  function $(j) {
    const _ = j[0].status, B = [];
    if (_ === D.Conflict) {
      const k = L(j) ? "" : ' disabled title="Chained conflict — cannot be resolved directly"';
      a ? (B.push(`<button class="bd-txi-btn is-primary" data-act="execute"${k}>Execute</button>`), B.push(`<button class="bd-txi-btn" data-act="take-server"${k}>Revert to server</button>`)) : u && B.push(`<button class="bd-txi-btn is-primary" data-act="resolve-prompt"${k}>Resolve…</button>`);
    } else
      _ === D.Failed && (B.push('<button class="bd-txi-btn is-primary" data-act="retry">Retry</button>'), B.push('<button class="bd-txi-btn" data-act="revert">Revert</button>'));
    return Q`<div class="bd-txi-actions">${te(B.join(""))}</div>`;
  }
  function I() {
    if (!d)
      return '<div class="bd-txi-detail-empty">Select a transaction</div>';
    const j = v.get(d);
    if (!(j != null && j.length))
      return '<div class="bd-txi-detail-empty">Select a transaction</div>';
    const _ = j[0], B = _.status === D.Pending, k = B ? '<div class="bd-txi-pending-note">In-flight — the worker may be delivering this. Actions are disabled to avoid racing it.</div>' : $(j);
    return Q`<div class="bd-txi-card">
            ${te(c && !B ? '<button class="bd-txi-drop" data-act="drop" title="Drop from queue">×</button>' : "")}
            <div class="bd-txi-card-head">
                <span class="bd-txi-status bd-txi-${_.status}">${_.status}</span>
                <span class="bd-txi-action">${_.transaction.action}</span>
                <span class="bd-txi-model">${_.transaction.model}</span>
            </div>
            <div class="bd-txi-field"><label>Object</label><code>${_.transaction.blitzID}</code></div>
            ${te(q(_))}
            ${te(U(j))}
            <div class="bd-txi-meta">
                <span><label>Server</label>${_.url}</span>
                <span><label>Queued</label>${M(_.createdAt)}</span>
                <span><label>Attempts</label>${_.attempts} (priority ${_.priority})</span>
                <span><label>Hash</label><code>${_.transaction.hash}</code></span>
            </div>
            ${te(C(_))}
            ${te(k)}
            ${te(F(j))}
        </div>`;
  }
  function U(j) {
    const _ = j.find((k) => k.message !== void 0);
    if (_)
      return Q`<div class="bd-txi-field"><label>Server response</label><div class="bd-txi-message">${_.message}</div></div>`;
    const B = j[0].status;
    return B !== D.Failed && B !== D.Conflict ? "" : Q`<div class="bd-txi-field"><label>Server response</label><div class="bd-txi-message is-empty">No server response recorded for this transaction.</div></div>`;
  }
  function F(j) {
    const _ = j.length > 1, B = _ ? j.map(
      (k, V) => Q`<details class="bd-txi-raw-job"><summary>Job ${String(V + 1)} · ${k.status} · ${M(k.createdAt)}</summary><pre>${JSON.stringify(k, null, 2)}</pre></details>`
    ).join("") : Q`<pre>${JSON.stringify(j[0], null, 2)}</pre>`;
    return Q`<details class="bd-txi-raw">
            <summary>Raw JSON${te(_ ? Q` <span class="bd-txi-chain-note">(${String(j.length)} chained jobs on this object)</span>` : "")}</summary>
            <button class="bd-txi-copy" data-copy>Copy</button>
            ${te(B)}
        </details>`;
  }
  function ie() {
    const j = Object.keys(f);
    return j.length < 2 ? "" : Q`<select class="bd-txi-server">${te(j.map(
      (_) => Q`<option value="${_}" ${te(_ === l ? "selected" : "")}>${_}</option>`
    ).join(""))}</select>`;
  }
  function z() {
    if (h)
      return;
    s.classList.toggle("is-busy", m);
    const j = y ? '<div class="bd-txi-spinner"></div>' : p ? Q`<p class="bd-txi-error">${p}</p>` : E();
    s.innerHTML = Q`
            <div class="bd-txi-banner">
                <h2>Transactions</h2>
                <div class="bd-txi-tools">${te(ie())}<button class="bd-txi-refresh" title="Refresh">⟳</button></div>
            </div>
            <div class="bd-txi-body">
                <div class="bd-txi-list">${te(j)}</div>
                <div class="bd-txi-detail">${te(y || p ? "" : I())}</div>
            </div>`;
  }
  function J(j) {
    var V;
    const _ = j.target;
    if (_.closest(".bd-txi-refresh")) {
      T();
      return;
    }
    if (_.closest("[data-copy]")) {
      j.preventDefault(), d && ((V = navigator.clipboard) == null || V.writeText(JSON.stringify(v.get(d), null, 2)));
      return;
    }
    const B = _.closest("[data-act]");
    if (B && !B.hasAttribute("disabled")) {
      d && O(d, B.dataset.act ?? "");
      return;
    }
    const k = _.closest("[data-select]");
    k && (d = k.dataset.select ?? null, z());
  }
  function Z(j) {
    const _ = j.target.closest(".bd-txi-server");
    _ && (l = _.value, d = null, z());
  }
  return s.addEventListener("click", J), s.addEventListener("change", Z), T(), {
    refresh: () => {
      T();
    },
    destroy: () => {
      h = !0, s.removeEventListener("click", J), s.removeEventListener("change", Z), s.classList.remove("bd-txi", "is-busy"), s.innerHTML = "";
    }
  };
}
const gi = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>';
function zn(e = {}) {
  const { label: t, right: n, ...s } = e, r = document.createElement("div");
  r.className = "bd-txi-tab", n !== void 0 && (r.style.right = `${n}px`), r.innerHTML = gi, r.append(t ?? "Transactions");
  const o = document.createElement("span");
  o.className = "bd-txi-tab-badge", o.style.display = "none", r.append(o), document.body.append(r);
  async function i() {
    const m = s.queue ?? lt.queue;
    if (typeof (m == null ? void 0 : m.getJobs) == "function")
      try {
        const v = (await m.getJobs() ?? []).filter((g) => g.status === D.Conflict || g.status === D.Failed).length;
        o.textContent = String(v), o.style.display = v > 0 ? "" : "none", r.classList.toggle("has-unresolved", v > 0);
      } catch {
      }
  }
  const c = () => {
    i();
  }, a = ["queue:success", "queue:failure", "queue:conflict", "queue:conflict-resolved"];
  for (const m of a)
    lt.addEventListener(m, c);
  const u = () => {
    document.hidden || i();
  };
  document.addEventListener("visibilitychange", u), i();
  let f = null, l = null, d = null;
  function y() {
    if (f)
      return;
    f = document.createElement("div"), f.className = "bd-txi-backdrop", f.setAttribute("data-bd-portal", "");
    const m = document.createElement("div");
    m.className = "bd-txi-panel", m.onclick = (g) => g.stopPropagation();
    const h = document.createElement("button");
    h.className = "bd-txi-panel-close", h.innerHTML = "&times;";
    const v = document.createElement("div");
    v.className = "bd-txi-panel-body", m.append(h, v), f.append(m), document.body.append(f), l = Vn(v, s), f.onclick = () => p(), h.onclick = () => p(), d = Xe(f, {
      titleElm: v.querySelector(".bd-txi-banner h2"),
      closeElm: h,
      onEscape: () => p()
    }), r.style.display = "none", requestAnimationFrame(() => f == null ? void 0 : f.classList.add("is-open"));
  }
  function p() {
    if (!f)
      return;
    d == null || d(), d = null, l == null || l.destroy(), l = null;
    const m = f;
    f = null, m.classList.remove("is-open"), setTimeout(() => m.remove(), 200), r.style.display = "", i();
  }
  return r.addEventListener("click", y), {
    open: y,
    close: p,
    destroy: () => {
      p(), r.remove();
      for (const m of a)
        lt.removeEventListener(m, c);
      document.removeEventListener("visibilitychange", u);
    },
    refreshBadge: i
  };
}
const vi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zn
}, Symbol.toStringTag, { value: "Module" })), un = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  width: Math.abs(e.x - t.x),
  height: Math.abs(e.y - t.y)
}), at = (e) => Math.min(1, Math.max(0, e));
function bi(e, t) {
  if (!(t.width > 0) || !(t.height > 0))
    return { x: 0, y: 0, width: 0, height: 0 };
  const n = at(e.x / t.width), s = at(e.y / t.height);
  return {
    x: n,
    y: s,
    width: Math.min(at(e.width / t.width), 1 - n),
    height: Math.min(at(e.height / t.height), 1 - s)
  };
}
const wi = (e, t, n) => ({
  url: e,
  page: t,
  bbox: { x: n.x, y: n.y, width: n.width, height: n.height }
});
async function Ei(e, t) {
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
  } catch (r) {
    if ((r == null ? void 0 : r.name) === "AbortError")
      throw r;
    return { s: 0, error: (r == null ? void 0 : r.message) ?? "Network error" };
  }
  if (!s.ok)
    return { s: 0, error: `Extractor responded ${s.status}` };
  try {
    return await s.json();
  } catch {
    return { s: 0, error: "Extractor returned invalid JSON" };
  }
}
const $i = /* @__PURE__ */ new Set(["varchar", "text", "markdown"]);
function Si(e) {
  return Object.entries(e ?? {}).filter(([t, n]) => !t.startsWith("_") && !t.startsWith("@") && typeof (n == null ? void 0 : n.type) == "string" && $i.has(n.type)).map(([t, n]) => ({
    attribute: t,
    ...typeof n.label == "string" ? { label: n.label } : {}
  }));
}
const fn = 1.25, Ci = 0.25, Li = 8, pn = 4;
async function xi(e, t) {
  var _, B;
  if (!(e instanceof HTMLElement))
    throw new Error("mountPdfRegionEditor: host element required");
  if (!(t != null && t.url))
    throw new Error("mountPdfRegionEditor: options.url required");
  const n = t.object, s = t.targetFields ?? Si(((B = (_ = n == null ? void 0 : n.model) == null ? void 0 : _.getAttributesDetails) == null ? void 0 : B.call(_)) ?? {}), r = Ce(e, "bd-pdfregion");
  e.innerHTML = Q`
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
            <div class="bd-pdfregion-save" ${te(s.length ? "" : "hidden")}>
                <select class="bd-pdfregion-target">${te(s.map(
    (k) => Q`<option value="${k.attribute}">${k.label ?? k.attribute}</option>`
  ).join(""))}</select>
                <button type="button" class="bd-pdfregion-savebtn"${te(n ? "" : ' disabled title="No object to save into"')}>Save</button>
            </div>
        </div>`;
  const o = (k) => e.querySelector(k), i = o(".bd-pdfregion-stage"), c = o(".bd-pdfregion-canvaswrap"), a = o(".bd-pdfregion-canvas"), u = o(".bd-pdfregion-overlay"), f = o(".bd-pdfregion-selection"), l = o(".bd-pdfregion-page"), d = o(".bd-pdfregion-zoom"), y = o(".bd-pdfregion-status"), p = o(".bd-pdfregion-badge"), m = o(".bd-pdfregion-text"), h = o(".bd-pdfregion-target"), v = o(".bd-pdfregion-savebtn");
  let g = !1, b = 1, w = 0, L = 1, N = 0, S = 0, M = 0, A = null, T = null, O = null, E = null, H = null;
  const q = (k, V = "info") => {
    y.textContent = k, y.classList.toggle("is-error", V === "error");
  }, C = () => {
    E = null, f.hidden = !0;
  }, $ = (k, V) => {
    const se = un(k, V);
    f.hidden = !1, f.style.left = `${se.x}px`, f.style.top = `${se.y}px`, f.style.width = `${se.width}px`, f.style.height = `${se.height}px`;
  };
  async function I() {
    if (g || !T)
      return;
    const k = await T.getPage(b);
    if (g)
      return;
    N = k.getViewport({ scale: 1 }).width;
    const V = k.getViewport({ scale: L });
    S = V.width, M = V.height;
    const se = typeof window < "u" && window.devicePixelRatio || 1;
    a.width = Math.floor(V.width * se), a.height = Math.floor(V.height * se), a.style.width = `${Math.floor(V.width)}px`, a.style.height = `${Math.floor(V.height)}px`, c.style.width = a.style.width, c.style.height = a.style.height, l.textContent = `Page ${b} of ${w}`, d.textContent = `${Math.round(L * 100)}%`, C();
    const fe = a.getContext("2d");
    if (fe) {
      O == null || O.cancel(), O = k.render({
        canvasContext: fe,
        viewport: V,
        ...se !== 1 ? { transform: [se, 0, 0, se, 0, 0] } : {}
      });
      try {
        await O.promise;
      } catch (R) {
        (R == null ? void 0 : R.name) !== "RenderingCancelledException" && q(`Page render failed: ${(R == null ? void 0 : R.message) ?? R}`, "error");
      }
    }
  }
  const U = (k) => {
    const V = Math.min(Math.max(1, k), w || 1);
    V !== b && (b = V, I());
  }, F = (k) => {
    L = Math.min(Math.max(Ci, k), Li), I();
  };
  async function ie(k) {
    var fe;
    H == null || H.abort(), H = new AbortController(), q("Extracting text…"), p.hidden = !0;
    const V = wi(t.url, b, k);
    let se;
    try {
      se = await Ei(V, {
        extractorBaseUrl: t.extractorBaseUrl,
        authorizationHeader: t.authorizationHeader,
        signal: H.signal
      });
    } catch {
      return;
    }
    if (!g) {
      if (se.s !== 1) {
        q(se.error || "Extraction failed", "error");
        return;
      }
      m.value = se.text ?? "", p.textContent = se.source, p.dataset.source = se.source, p.hidden = !1, q(`Extracted from page ${b} — review and save`), (fe = t.onExtract) == null || fe.call(t, { text: m.value, source: se.source, page: b, bbox: k });
    }
  }
  const z = (k) => {
    const V = u.getBoundingClientRect();
    return { x: k.clientX - V.left, y: k.clientY - V.top };
  }, J = (k) => {
    k.button !== 0 || !S || !M || (k.preventDefault(), E = z(k), $(E, E));
  }, Z = (k) => {
    E && $(E, z(k));
  }, pe = (k) => {
    if (!E)
      return;
    const V = un(E, z(k));
    if (E = null, V.width < pn || V.height < pn) {
      C();
      return;
    }
    ie(bi(V, { width: S, height: M }));
  };
  u.addEventListener("mousedown", J), window.addEventListener("mousemove", Z), window.addEventListener("mouseup", pe);
  const ce = (k) => {
    const V = k.target.closest("[data-nav], [data-zoom]");
    V && (V.dataset.nav === "prev" ? U(b - 1) : V.dataset.nav === "next" ? U(b + 1) : V.dataset.zoom === "in" ? F(L * fn) : V.dataset.zoom === "out" ? F(L / fn) : V.dataset.zoom === "fit" && N && i.clientWidth && F(i.clientWidth / N));
  };
  o(".bd-pdfregion-toolbar").addEventListener("click", ce);
  const be = async () => {
    var se, fe, R;
    const k = h.value, V = ((se = n == null ? void 0 : n._attributes) == null ? void 0 : se[k]) ?? ((fe = n == null ? void 0 : n.getAttribute) == null ? void 0 : fe.call(n, k));
    if (typeof (V == null ? void 0 : V.edit) != "function") {
      q(`Attribute '${k}' is not editable on this object`, "error");
      return;
    }
    v.disabled = !0;
    try {
      await V.edit(m.value), q(`Saved to ${k}`), (R = t.onSaved) == null || R.call(t, k, m.value);
    } catch (ne) {
      q(`Save failed: ${(ne == null ? void 0 : ne.message) ?? ne}`, "error");
    } finally {
      v.disabled = !n;
    }
  };
  v.addEventListener("click", be);
  const j = () => {
    var k;
    g || (g = !0, H == null || H.abort(), O == null || O.cancel(), (k = A == null ? void 0 : A.destroy) == null || k.call(A), u.removeEventListener("mousedown", J), window.removeEventListener("mousemove", Z), window.removeEventListener("mouseup", pe), e.innerHTML = "", r());
  };
  q("Loading PDF…");
  try {
    const k = await import("./pdf-f4394f77.js");
    t.workerSrc ? k.GlobalWorkerOptions.workerSrc = t.workerSrc : !k.GlobalWorkerOptions.workerSrc && !globalThis.pdfjsWorker && await import("./pdf.worker.min-9015606c.js"), A = k.getDocument({ url: t.url }), T = await A.promise;
  } catch (k) {
    return g || q(`Failed to open PDF: ${(k == null ? void 0 : k.message) ?? k}`, "error"), { destroy: j };
  }
  return g ? { destroy: j } : (w = T.numPages, q(""), await I(), { destroy: j });
}
const ki = () => import("./BDComments-8735cc5a.js").then((e) => e.f).then((e) => e.default), Mi = "2.14.10";
typeof window < "u" && !window.BlitzUIManager && (window.BlitzUIManager = {
  default: Ut,
  BlitzUIManagerExtended: yi,
  VERSION: Mi,
  loadBDComments: ki,
  ImageLightbox: hi,
  openImageLightbox: Wt,
  attachImageLightbox: Fn,
  mountTransactionInspector: Vn,
  addInspectorLink: zn,
  mountObjectHistory: St,
  mountObjectHistoryModal: Bt,
  mountPdfRegionEditor: xi,
  previousValueOf: jn,
  branchOf: On,
  html: Q,
  raw: te,
  esc: de,
  safeUrl: ke,
  renderMarkdown: xn,
  announceEditorDone: _e
}, window.dispatchEvent(new CustomEvent("blitzuimanager:ready")));
export {
  Ut as A,
  we as B,
  he as C,
  gn as D,
  nt as E,
  re as G,
  ze as I,
  vr as L,
  Ne as N,
  Ir as T,
  Mi as V,
  qr as Y,
  Js as a,
  _e as b,
  Ce as c,
  It as d,
  Re as e,
  pt as f,
  de as g,
  Vn as h,
  zn as i,
  St as j,
  Bt as k,
  xi as l,
  Ve as m,
  jn as n,
  On as o,
  Zs as p,
  hi as q,
  xn as r,
  Wt as s,
  Fn as t,
  ki as u,
  Q as v,
  te as w,
  ke as x,
  Gs as y,
  yi as z
};
