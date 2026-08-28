var ga = Object.defineProperty;
var va = (n, e, t) => e in n ? ga(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var ne = (n, e, t) => (va(n, typeof e != "symbol" ? e + "" : e, t), t);
const ba = (n) => n == null || n === "" || Array.isArray(n) && n.length === 0, cr = (n) => Array.isArray(n) ? n[0] : n, bn = (n, e) => n.endsWith("_fk") ? "fk" : n.endsWith("_mtm") ? "mtm" : cr(e), vs = ["view", "control", "filter", "editor", "default", "empty"];
class wa {
  constructor(e) {
    ne(this, "builtins", /* @__PURE__ */ new Map());
    ne(this, "typeOverlays", /* @__PURE__ */ new Map());
    ne(this, "attrOverlays", /* @__PURE__ */ new Map());
    ne(this, "presets", /* @__PURE__ */ new Map());
    ne(this, "bindings", /* @__PURE__ */ new Map());
    this.warn = e;
  }
  /** Register a built-in datatype module (the floor layer). */
  register(e) {
    const { type: t, ...s } = e;
    for (const r of [t].flat())
      Object.assign(this.mapEntry(this.builtins, r), s);
  }
  /** Merge extra surfaces into a built-in (used to seed edit-mode editors). */
  mergeBuiltin(e, t) {
    Object.assign(this.mapEntry(this.builtins, e), t);
  }
  hasBuiltin(e) {
    return this.builtins.has(e);
  }
  removeBuiltinSurface(e, t) {
    var s;
    (s = this.builtins.get(e)) == null || delete s[t];
  }
  defineUI(e, t) {
    Object.assign(this.mapEntry(this.typeOverlays, e), t);
  }
  defineUIFor(e, t, s) {
    Object.assign(this.mapEntry(this.attrOverlays, `${e}.${t}`), s);
  }
  definePreset(e, t) {
    this.presets.set(e, t);
  }
  getPreset(e) {
    return this.presets.get(e);
  }
  /** Bind a preset to a type — one replaceable slot. null clears it. */
  bindType(e, t, s) {
    t === null ? this.bindings.delete(e) : this.bindings.set(e, { preset: t, label: s });
  }
  getBinding(e) {
    return this.bindings.get(e);
  }
  /** Drop write-surface overlays (control/editor/filter). Built-ins stay intact. */
  resetWrite() {
    for (const e of [this.typeOverlays, this.attrOverlays])
      for (const t of e.values())
        delete t.control, delete t.editor, delete t.filter;
  }
  /** Drop read-surface overlays (view). Built-ins stay intact. */
  resetRead() {
    for (const e of [this.typeOverlays, this.attrOverlays])
      for (const t of e.values())
        delete t.view;
  }
  resolve(e, t) {
    const { type: s, many: r, model: a, name: i, hint: o, use: l, maxLayer: c = 8 } = e, d = { defaultConfig: {}, sources: {} }, u = (h, p, y) => {
      if (!(!h || p > c)) {
        for (const v of vs) {
          const g = h[v];
          g !== void 0 && (d[v] = g, d.sources[v] = { layer: p, label: y });
        }
        h.defaultConfig && Object.assign(d.defaultConfig, h.defaultConfig);
      }
    }, f = (h, p, y) => {
      const v = this.presets.get(h);
      if (v) {
        const { extends: w, ...S } = v;
        return w && u({ ...this.builtins.get(w), ...this.typeOverlays.get(w) }, p, `${y} (extends '${w}')`), u(S, p + 1, y), !0;
      }
      const g = { ...this.builtins.get(h), ...this.typeOverlays.get(h) };
      return Object.keys(g).length ? (u(g, p + 1, y), !0) : !1;
    };
    u(this.builtins.get(s), 0, "built-in"), r && u(this.builtins.get(`${s}[]`), 0, "built-in (many)"), u(this.typeOverlays.get(s), 1, "defineUI"), r && u(this.typeOverlays.get(`${s}[]`), 1, "defineUI (many)");
    const m = r ? void 0 : this.bindings.get(s);
    if (m && !f(m.preset, 2, m.label ?? `binding '${m.preset}'`) && this.warn(`type '${s}' is bound to '${m.preset}' — not registered, using '${s}' default`), o && !f(o, 4, `preset '${o}'`) && this.warn(`${a ?? "?"}.${i ?? "?"} requests ui '${o}' — not registered, using '${s}' default`), a && i && u(this.attrOverlays.get(`${a}.${i}`), 6, "defineUIFor"), l && (typeof l == "string" ? f(l, 7, `use '${l}'`) || this.warn(`mount requests ui '${l}' — not registered, using '${s}' default`) : typeof l == "function" ? u({ control: l }, 8, "use (control)") : u(l, 8, "use (module)")), t) {
      const h = vs.filter((p) => d.sources[p]).map((p) => `${p} from ${d.sources[p].label}`);
      t(`${a ?? "?"}.${i ?? s} → ${h.join("; ") || "nothing registered"}`);
    }
    return d;
  }
  mapEntry(e, t) {
    let s = e.get(t);
    return s || (s = {}, e.set(t, s)), s;
  }
}
class _a {
  constructor() {
    ne(this, "typeConfig", {});
    ne(this, "attributeConfig", {});
    ne(this, "settings", {});
    ne(this, "services", {});
  }
  setConfig(e, t) {
    var s;
    Object.assign((s = this.typeConfig)[e] ?? (s[e] = {}), t);
  }
  setConfigFor(e, t, s) {
    var r, a;
    Object.assign((r = this.attributeConfig)[a = `${e}.${t}`] ?? (r[a] = {}), s);
  }
  resolve(e, t, s, r, a) {
    return {
      ...r,
      ...this.typeConfig[e],
      ...t && s ? this.attributeConfig[`${t}.${s}`] : void 0,
      ...a
    };
  }
}
function Pt(n, e) {
  var r, a, i, o, l, c, d;
  const t = ((o = (i = (a = (r = n._object) == null ? void 0 : r.model) == null ? void 0 : a.getAttributesDetails) == null ? void 0 : i.call(a)) == null ? void 0 : o[n._name]) ?? {}, s = t.type ?? n._type;
  return {
    kind: "live",
    type: bn(n._name, s),
    many: Array.isArray(t.type) && !n._name.endsWith("_mtm"),
    model: (d = (c = (l = n._object) == null ? void 0 : l.model) == null ? void 0 : c.getName) == null ? void 0 : d.call(c),
    name: n._name,
    attribute: n,
    value: n.value,
    set: (u) => n.edit(u),
    add: (u) => {
      var f;
      return (f = n.add) == null ? void 0 : f.call(n, u);
    },
    remove: (u) => {
      var f;
      return (f = n.remove) == null ? void 0 : f.call(n, u);
    },
    // VALUE stream: the object's remoteChange event — patch in place
    subscribe: (u) => {
      const f = n._object;
      if (typeof (f == null ? void 0 : f.addEventListener) != "function")
        return () => {
        };
      const m = (h) => {
        h && !Object.hasOwn(h, n._name) || u(n.value);
      };
      return f.addEventListener("remoteChange", m), () => f.removeEventListener("remoteChange", m);
    },
    // SAVE-STATE stream: pending | saved | failed — distinct from value
    status: (u) => {
      var f;
      return ((f = n.syncStatus) == null ? void 0 : f.call(n, u)) ?? (() => {
      });
    },
    attributeDetails: t,
    hint: t.ui ?? t.editor,
    mountConfig: e
  };
}
function Ea(n, e, t, s, r) {
  var a;
  return {
    kind: "draft",
    type: bn(e, t.type),
    many: Array.isArray(t.type) && !e.endsWith("_mtm"),
    model: (a = s == null ? void 0 : s.getName) == null ? void 0 : a.call(s),
    name: e,
    value: n[e],
    set: (i) => {
      n[e] = i;
    },
    add: (i) => {
      (n[e] ?? (n[e] = [])).push(i);
    },
    remove: (i) => {
      n[e] = (n[e] ?? []).filter((o) => o !== i);
    },
    attributeDetails: t,
    hint: t.ui ?? t.editor,
    mountConfig: r
  };
}
function ur(n, e, t, s, r, a) {
  var i;
  return {
    kind: "query",
    type: bn(e, t.type),
    many: Array.isArray(t.type) && !e.endsWith("_mtm"),
    model: (i = s == null ? void 0 : s.getName) == null ? void 0 : i.call(s),
    name: e,
    value: n[e],
    set: (o) => {
      o ? n[e] = o : delete n[e], r == null || r();
    },
    attributeDetails: t,
    hint: t.ui ?? t.editor,
    mountConfig: a
  };
}
function bs(n) {
  const e = {
    _name: n.name,
    _type: n.type,
    get value() {
      return n.value;
    },
    edit: async (t) => {
      await n.set(t), e._committed = t;
    },
    add: (t) => {
      var s;
      return (s = n.add) == null ? void 0 : s.call(n, t);
    },
    remove: (t) => {
      var s;
      return (s = n.remove) == null ? void 0 : s.call(n, t);
    },
    getObject: async () => null,
    getObjects: async () => [],
    syncStatus: () => () => {
    },
    _object: {
      model: {
        getName: () => n.model,
        getAttributesDetails: () => ({ [n.name]: n.attributeDetails }),
        getAttributeDetails: () => n.attributeDetails
      }
    }
  };
  return e;
}
function Ot(n, e, t, s) {
  if (typeof (n == null ? void 0 : n[t]) == "string")
    return n[t];
  if (typeof e == "string")
    return e;
  if (e && typeof e == "object") {
    const r = e;
    if (typeof r[t] == "string")
      return r[t];
    if (typeof r.default == "string")
      return r.default;
    const a = Object.values(r).find((i) => typeof i == "string");
    if (a)
      return a;
  }
  return s;
}
function Wt(n) {
  return n !== null && typeof n == "object" && Object.hasOwn(n, "_value") ? n.value : n;
}
function vt(n) {
  return Array.isArray(n) ? n.map((e) => Wt(e)) : [];
}
function zt(n) {
  return n.replace(/(\^|\$|\\|\/|\||\*|\+|\-|\.|\?|\(|\)|\[|\]|\{|\})/g, "\\$&");
}
function dr(n) {
  return new Promise((e, t) => {
    if (window.google && window.google.maps) {
      e();
      return;
    }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${n}&libraries=places`, s.async = !0, s.defer = !0, s.onload = () => e(), s.onerror = () => t(new Error("Failed to load Google Maps API")), document.head.appendChild(s);
  });
}
async function Xn(n, e, t) {
  if (await dr(t), !window.google || !window.google.maps)
    return null;
  const s = { lat: parseFloat(n), lng: parseFloat(e) };
  if (!Number.isFinite(s.lat) || !Number.isFinite(s.lng))
    return null;
  const r = document.createElement("div");
  r.className = "map-container";
  const a = new google.maps.Map(r, { center: s, zoom: 13 });
  return new google.maps.Marker({ map: a, position: s }), r;
}
function qe(n, ...e) {
  const t = e.flatMap((s) => (s ?? "").split(" ")).filter((s) => s !== "" && !n.classList.contains(s));
  return n.classList.add(...t), () => n.classList.remove(...t);
}
function Xe(n) {
  n.dispatchEvent(new CustomEvent("bd-editor-done", { bubbles: !0 }));
}
const Sa = new Function("url", "return import(url)");
async function Ma(n, e = Sa) {
  const t = await e(n), s = t == null ? void 0 : t.default;
  if (typeof s != "function" && (typeof s != "object" || s === null))
    throw new Error("module must export a DatatypeUI (or control function) as its default export");
  return t;
}
function fr(n) {
  const e = Object.keys(n);
  return e.length === 0 ? null : (t) => e.every((s) => {
    var r;
    return Ca((r = t[s]) == null ? void 0 : r.value, n[s]);
  });
}
const ws = (n) => n.map(
  (e) => e && Object.hasOwn(e, "_value") ? e.value : e && Object.hasOwn(e, "_blitzID") ? e._blitzID : e
);
function Ca(n, e) {
  switch (e.op) {
    case "contains":
      return typeof n == "string" && !!n.match(new RegExp(zt(String(e.value)), "i"));
    case "eq":
      return Array.isArray(n) ? ws(n).includes(e.value) : n == e.value;
    case "between": {
      const t = typeof n == "string" && Number.isNaN(Number(n)) ? new Date(n).getTime() : Number(n);
      if (n == null || Number.isNaN(t))
        return !1;
      const { min: s, max: r } = e;
      return (s == null || t >= s) && (r == null || t <= r);
    }
    case "in": {
      const t = e.values ?? e.value;
      if (!Array.isArray(t) || t.length === 0)
        return !0;
      if (Array.isArray(n)) {
        const s = ws(n);
        return t.some((r) => s.includes(r));
      }
      return t.includes(n);
    }
    default:
      return !0;
  }
}
const xa = {
  pending: "Saving…",
  conflict: "Conflict — the server holds a different value. Click for details.",
  failed: "Save failed — the server rejected this change. Click for details."
};
function hr(n, e) {
  let t = null, s = !1;
  return e((r) => {
    var i;
    if (!r)
      return;
    if (r.status === "completed") {
      if (!s)
        return;
      t == null || t.remove(), t = null;
      return;
    }
    s = !0, t || (t = document.createElement("span"), n.classList.add("bd-has-status"), n.append(t)), t.className = `bd-status-badge bd-status-${r.status}`, t.title = xa[r.status] ?? r.status;
    const a = (i = r.job) == null ? void 0 : i.message;
    t.onclick = a ? (o) => {
      o.stopPropagation(), alert(a);
    } : null;
  });
}
class on {
  constructor() {
    ne(this, "_stops", []);
    ne(this, "_children", /* @__PURE__ */ new Map());
    ne(this, "_destroyed", !1);
  }
  /** A nested scope owned by `owner` — `release(owner)` destroys just that one. */
  for(e) {
    const t = this._children.get(e);
    if (t && !t._destroyed)
      return t;
    const s = new on();
    return this._children.set(e, s), s;
  }
  /**
   * Badge `host` with `attribute`'s save-state, holding on to the unsubscribe.
   * A destroyed scope attaches nothing — the render that asked for this badge
   * is already gone (the element is built asynchronously, the grid may have
   * repainted meanwhile), and its subscription would have no owner left.
   */
  attach(e, t) {
    this._destroyed || typeof (t == null ? void 0 : t.syncStatus) != "function" || this._stops.push(hr(e, (s) => t.syncStatus(s)));
  }
  /** The owner's DOM is being replaced: drop its subscriptions. */
  release(e) {
    var t;
    (t = this._children.get(e)) == null || t.destroy(), this._children.delete(e);
  }
  /** Drop every subscription in this scope, nested ones included. Single-use. */
  destroy() {
    this._destroyed = !0;
    for (const e of this._stops)
      e();
    this._stops = [];
    for (const e of this._children.values())
      e.destroy();
    this._children.clear();
  }
}
const $a = (n, e) => (t) => {
  var s;
  return n({
    ...t,
    value: (s = t.value) == null ? void 0 : s.value,
    onChange: (r) => t.onChange(r == null || r === "" ? null : { op: e, value: r })
  });
}, ka = /* @__PURE__ */ new Set(["varchar", "text", "markdown", "email", "url", "tag", "hex", "formula", "youtube"]), _s = (n, e) => e && ka.has(n) ? $a(e, "contains") : void 0, Nt = (n) => typeof n == "function" ? n : () => {
};
class La {
  constructor(e) {
    this.deps = e;
  }
  resolveForPort(e, t) {
    return this.deps.registry.resolve(
      { type: e.type, many: e.many, model: e.model, name: e.name, hint: e.hint, use: t },
      this.deps.isDebug() ? (s) => console.info(`[BlitzUIManager] ${s}`) : void 0
    );
  }
  /** The cascaded config for a port, resolved exactly as mount would. */
  resolveConfig(e, t) {
    return this.deps.config.resolve(
      e.type,
      e.model,
      e.name,
      this.resolveForPort(e, t).defaultConfig,
      e.mountConfig
    );
  }
  isFilterable(e) {
    const t = this.resolveForPort(e);
    return !!(t.filter ?? _s(e.type, t.control));
  }
  /**
   * Filter semantics live here, not just inside mountFiltersForm: an app
   * arranging its own filter UI builds ports and compiles the collected
   * query through the same kernel it mounts with — one reachable handle,
   * no second copy of the rules.
   */
  query(e, t, s, r, a, i) {
    return ur(e, t, s, r, a, i);
  }
  compileConditions(e) {
    return fr(e);
  }
  buildCtx(e, t, s) {
    const r = this.deps.config.resolve(e.type, e.model, e.name, s.defaultConfig, e.mountConfig);
    return r.multiple === void 0 && e.many && (r.multiple = !0), {
      host: t,
      value: e.value,
      onChange: (a) => e.set(a),
      add: e.add,
      remove: e.remove,
      // liveness is default-on; config.live === false opts a mass mount out
      subscribe: r.live === !1 ? void 0 : e.subscribe,
      status: e.status,
      invalid: e.invalid,
      resolveModel: this.deps.resolveModel,
      attributeDetails: e.attributeDetails ?? {},
      config: r,
      settings: this.deps.config.settings,
      services: e.services ?? this.deps.config.services
    };
  }
  async mount(e, t, s, r) {
    var l;
    const a = this.resolveForPort(e, r), i = this.buildCtx(e, t, a);
    if (s === "read") {
      const c = a.view;
      if (!c)
        return () => {
        };
      const d = c(e.attribute ?? bs(e), e.mountConfig);
      if (!d)
        return () => {
        };
      const u = () => {
        var h;
        return e.status && ((h = e.mountConfig) == null ? void 0 : h.status) !== !1 ? hr(t, e.status) : void 0;
      };
      if (typeof d == "string") {
        t.innerHTML = d;
        const h = u();
        return () => {
          h == null || h(), t.innerHTML = "";
        };
      }
      t.innerHTML = d.html;
      const f = (l = d.hydrate) == null ? void 0 : l.call(d, t), m = u();
      return () => {
        m == null || m(), f == null || f(), t.innerHTML = "";
      };
    }
    if (s === "filter") {
      const c = a.filter ?? _s(e.type, a.control);
      if (!c)
        throw new Error(`type '${e.type}' is not filterable — declare a filter`);
      return Nt(await c(i));
    }
    const o = this.writeSurface(e, i, a);
    if (!o) {
      const c = this.writeFloor(e, i);
      if (!c)
        throw new Error("Editor for this attribute type not supported!");
      return Nt(await c.run());
    }
    try {
      return Nt(await o.run());
    } catch (c) {
      if (console.error(`"${e.name}" UI Error:`, c.stack ?? c.message), o.layer > 0) {
        const u = this.deps.registry.resolve({
          type: e.type,
          many: e.many,
          model: e.model,
          name: e.name,
          maxLayer: o.layer - 1
        }), f = this.writeSurface(e, i, u);
        if (f)
          try {
            return t.innerHTML = "", Nt(await f.run());
          } catch (m) {
            console.error(`"${e.name}" UI Error:`, m.stack ?? m.message);
          }
      }
      const d = this.writeFloor(e, i);
      if (!d)
        throw c;
      return t.innerHTML = "", Nt(await d.run());
    }
  }
  /**
   * Write-mode arbitration: the object-aware `editor` runs only on a live
   * port and only when no MORE specific layer supplied a `control` — so a
   * built-in editor keeps today's edit behavior, while any defineUI /
   * defineUIFor / per-mount control wins in edit AND add alike.
   */
  writeSurface(e, t, s) {
    var l, c;
    const r = ((l = s.sources.editor) == null ? void 0 : l.layer) ?? -1, a = ((c = s.sources.control) == null ? void 0 : c.layer) ?? -1, i = s.control ? { run: () => s.control(t), layer: a } : void 0, o = s.editor ? { run: () => s.editor({ ...t, attribute: e.attribute ?? bs(e) }), layer: r } : void 0;
    return e.kind === "live" ? o && r >= a ? o : i && a > 0 ? i : o ?? i : i && a >= r ? i : o ?? i;
  }
  writeFloor(e, t) {
    const s = e.value !== null && e.value !== void 0 && typeof e.value == "object" ? "json" : e.kind === "draft" ? "varchar" : "text";
    if (s === e.type)
      return;
    this.deps.warn(`No usable UI for type '${e.type}' — falling back to '${s}'`);
    const r = this.deps.registry.resolve({ type: s, model: e.model, name: e.name, maxLayer: 0 });
    return this.writeSurface(e, t, r);
  }
}
function nt(n) {
  let e;
  const t = () => e ?? (e = n().catch((r) => {
    throw e = void 0, r;
  })), s = async (...r) => (await t()).default(...r);
  return s.preload = t, s;
}
function ln(n) {
  let e;
  const t = () => e ?? (e = n().catch((r) => {
    throw e = void 0, r;
  })), s = (r, a) => {
    let i = null, o = !1, l = null;
    return t().then((c) => {
      var d;
      o || (i = c.default(r, a), l && ((d = i == null ? void 0 : i.handleSyncStatus) == null || d.call(i, ...l), l = null));
    }).catch((c) => console.error("Input chunk failed to load:", (c == null ? void 0 : c.message) ?? c)), {
      destroy: () => {
        var c;
        o = !0, (c = i == null ? void 0 : i.destroy) == null || c.call(i);
      },
      handleSyncStatus: (...c) => {
        var d;
        i ? (d = i.handleSyncStatus) == null || d.call(i, ...c) : l = c;
      }
    };
  };
  return s.preload = t, s;
}
function Qn(n) {
  let e;
  return function(...t) {
    e && clearTimeout(e), e = window.setTimeout(() => n(...t), 500);
  };
}
function wn(n, e, t) {
  let s = -1, r, a = !1;
  const i = () => {
    s > -1 && (clearTimeout(s), s = -1);
    const o = n();
    t && !t(o) || a && o === r || (r = o, a = !0, e == null || e(o));
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
      r = n(), a = !0;
    },
    /** Drop a pending debounce without committing. */
    cancel() {
      s > -1 && (clearTimeout(s), s = -1);
    },
    /** The last committed value (the initial value after prime). Esc restores this. */
    lastValue() {
      return a ? r : void 0;
    }
  };
}
const bt = {
  SAVE: `<svg width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" />
    </svg>`,
  DONE: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path stroke="#12e33c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 12.6111L8.92308 17.5L20 6.5" />
    </svg>`
};
var Ee = /* @__PURE__ */ ((n) => (n.OnChange = "change", n.OnFocusOut = "focusout", n.OnSubmit = "submit", n))(Ee || {}), Da = Object.defineProperty, Aa = (n, e, t) => e in n ? Da(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, O = (n, e, t) => (Aa(n, typeof e != "symbol" ? e + "" : e, t), t);
const Ut = class xe {
  constructor() {
    O(this, "_method"), O(this, "_url"), O(this, "_headers", {}), O(this, "_retriedAfterUnauthorized", !1), O(this, "_body"), O(this, "_signal");
  }
  /**
   * Create a new request.
   */
  static create() {
    const e = new xe();
    return xe._globalHeaders && e.headers(xe._globalHeaders), e;
  }
  /**
   * Set the global request headers.
   *
   * @param headers Global request headers.
   */
  static globalHeaders(e) {
    xe._globalHeaders = e, xe._notifyGlobalHeadersChange();
  }
  /**
   * Merge headers into the global request headers.
   * A null value removes the header.
   *
   * @param headers Headers to merge.
   */
  static updateGlobalHeaders(e) {
    for (const t in e) {
      const s = e[t];
      s === null ? delete xe._globalHeaders[t] : xe._globalHeaders[t] = s;
    }
    xe._notifyGlobalHeadersChange();
  }
  /**
   * Set the headers applied only to requests targeting the given origin.
   * Passing empty headers removes the scope (e.g. on logout).
   *
   * @param origin Exact request origin, e.g. 'https://alpha.blitzdata.com'.
   * @param headers Headers to attach for that origin.
   */
  static setScopedHeaders(e, t) {
    xe._scopedHeaders = xe._scopedHeaders.filter((s) => s.origin !== e), Object.keys(t).length > 0 && xe._scopedHeaders.push({ origin: e, headers: t }), xe._notifyGlobalHeadersChange();
  }
  /**
   * Register a handler to recover from a 401 (typically an OAuth refresh).
   * The request is retried once if the handler resolves true.
   */
  static onUnauthorized(e) {
    xe._unauthorizedHandler = e;
  }
  /**
   * Register a listener called whenever the global or scoped headers change.
   *
   * @param listener Change listener.
   */
  static onGlobalHeadersChange(e) {
    xe._globalHeadersListeners.push(e);
  }
  static _notifyGlobalHeadersChange() {
    for (const e of xe._globalHeadersListeners)
      e(xe._globalHeaders);
  }
  /**
   * Resolve the scoped headers that apply to a request URL.
   */
  static _scopedHeadersFor(e) {
    if (!e)
      return {};
    let t;
    try {
      t = new URL(e).origin;
    } catch {
      return {};
    }
    return xe._scopedHeaders.filter((s) => s.origin === t).reduce((s, r) => Object.assign(s, r.headers), {});
  }
  /**
   * Set the request method.
   *
   * @param method Request method.
   */
  method(e) {
    return this._method = e, this;
  }
  /**
   * Set the request URL.
   *
   * @param url Request URL.
   */
  url(e) {
    return this._url = e, this;
  }
  /**
   * Set a single request header.
   *
   * @param name Header name.
   * @param value Header value.
   */
  header(e, t) {
    return this._headers[e] = t, this;
  }
  /**
   * Set multiple request headers.
   *
   * @param headers Request headers.
   */
  headers(e) {
    for (const t in e)
      this.header(t, e[t]);
    return this;
  }
  /**
   * Set the request body.
   *
   * @param body Request body.
   */
  body(e) {
    return this._body = e, this;
  }
  /**
   * Sets the abort signal.
   * @param signal
   */
  signal(e) {
    return this._signal = e, this;
  }
  /**
   * Send the request.
   */
  async send(e = !1) {
    const t = await fetch(this._url, {
      method: this._method,
      headers: { ...this._headers, ...xe._scopedHeadersFor(this._url) },
      body: this._body ? this._body instanceof FormData ? this._body : JSON.stringify(this._body) : void 0,
      signal: this._signal ? this._signal : void 0
    });
    return t.status === 401 && !this._retriedAfterUnauthorized && xe._unauthorizedHandler && this._url && (this._retriedAfterUnauthorized = !0, await xe._unauthorizedHandler(this._url)) ? await this.send(e) : e ? t : await t.json();
  }
  /**
   * Send request with GET method.
   */
  async get() {
    return await this.method("GET").send();
  }
  /**
   * Send request with POST method.
   */
  async post() {
    return await this.method("POST").send();
  }
};
O(Ut, "_globalHeaders", {}), /**
* Headers applied only to requests whose URL matches a given origin.
* Used to keep a Bearer token scoped to the host that issued it,
* so it never leaks to a second cluster on another host.
*/
O(Ut, "_scopedHeaders", []), /**
* Handler invoked once on a 401 to try to recover (e.g. refresh the token).
* Returning true retries the request with refreshed headers.
*/
O(Ut, "_unauthorizedHandler", null), /**
* Listeners notified whenever the global headers change,
* used to propagate them to the queue's shared worker.
*/
O(Ut, "_globalHeadersListeners", []);
let je = Ut;
class Ia {
  /**
   * Create a new cluster.
   *
   * @param name Name of the cluster.
   * @param options Options for the cluster.
   */
  constructor(e, t) {
    O(this, "name"), O(this, "options"), O(this, "cursors", {
      readURL: 0
    }), this.name = e, this.options = t;
  }
  /**
   * Get the next read URL.
   *
   * @returns Next read URL.
   */
  getNextReadURL() {
    this.cursors.readURL >= this.options.readURL.length && (this.cursors.readURL = 0);
    const e = this.options.readURL[this.cursors.readURL];
    return this.cursors.readURL++, e;
  }
}
class mr {
  constructor() {
    O(this, "clusters", {});
  }
  /**
   * Register a new cluster.
   *
   * @param name Name of the cluster.
   * @param options Options for the cluster.
   */
  register(e, t) {
    this.clusters[e] = new Ia(e, t);
  }
  /**
   * Get clusters by name(s).
   *
   * @param name Name(s) of the cluster(s) to get.
   */
  get(e) {
    if (!Array.isArray(e)) {
      if (this.clusters[e] === void 0)
        throw new Error(`cluster "${e}" not found.`);
      return this.clusters[e];
    }
    const t = {};
    for (const s of e)
      t[s] = this.get(s);
    return t;
  }
  /**
   * Get names of all registered clusters.
   */
  names() {
    return Object.keys(this.clusters);
  }
  /**
   * Get all registered clusters.
   */
  all() {
    return this.clusters;
  }
  /**
   * Get all registered clusters as an array of cluster instances.
   */
  toArray() {
    return Object.values(this.clusters);
  }
  /**
   * Get random cluster.
   */
  random() {
    const e = this.names(), t = e[Math.floor(Math.random() * e.length)];
    return this.get(t);
  }
}
const ja = (n, e) => e.some((t) => n instanceof t);
let Es, Ss;
function Ta() {
  return Es || (Es = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Oa() {
  return Ss || (Ss = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const pr = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), yr = /* @__PURE__ */ new WeakMap(), Ln = /* @__PURE__ */ new WeakMap(), Zn = /* @__PURE__ */ new WeakMap();
function za(n) {
  const e = new Promise((t, s) => {
    const r = () => {
      n.removeEventListener("success", a), n.removeEventListener("error", i);
    }, a = () => {
      t(st(n.result)), r();
    }, i = () => {
      s(n.error), r();
    };
    n.addEventListener("success", a), n.addEventListener("error", i);
  });
  return e.then((t) => {
    t instanceof IDBCursor && pr.set(t, n);
  }).catch(() => {
  }), Zn.set(e, n), e;
}
function Ha(n) {
  if (zn.has(n))
    return;
  const e = new Promise((t, s) => {
    const r = () => {
      n.removeEventListener("complete", a), n.removeEventListener("error", i), n.removeEventListener("abort", i);
    }, a = () => {
      t(), r();
    }, i = () => {
      s(n.error || new DOMException("AbortError", "AbortError")), r();
    };
    n.addEventListener("complete", a), n.addEventListener("error", i), n.addEventListener("abort", i);
  });
  zn.set(n, e);
}
let Hn = {
  get(n, e, t) {
    if (n instanceof IDBTransaction) {
      if (e === "done")
        return zn.get(n);
      if (e === "objectStoreNames")
        return n.objectStoreNames || yr.get(n);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return st(n[e]);
  },
  set(n, e, t) {
    return n[e] = t, !0;
  },
  has(n, e) {
    return n instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in n;
  }
};
function Pa(n) {
  Hn = n(Hn);
}
function Na(n) {
  return n === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...t) {
    const s = n.call(Dn(this), e, ...t);
    return yr.set(s, e.sort ? e.sort() : [e]), st(s);
  } : Oa().includes(n) ? function(...e) {
    return n.apply(Dn(this), e), st(pr.get(this));
  } : function(...e) {
    return st(n.apply(Dn(this), e));
  };
}
function qa(n) {
  return typeof n == "function" ? Na(n) : (n instanceof IDBTransaction && Ha(n), ja(n, Ta()) ? new Proxy(n, Hn) : n);
}
function st(n) {
  if (n instanceof IDBRequest)
    return za(n);
  if (Ln.has(n))
    return Ln.get(n);
  const e = qa(n);
  return e !== n && (Ln.set(n, e), Zn.set(e, n)), e;
}
const Dn = (n) => Zn.get(n);
function Dt(n, e, { blocked: t, upgrade: s, blocking: r, terminated: a } = {}) {
  const i = indexedDB.open(n, e), o = st(i);
  return s && i.addEventListener("upgradeneeded", (l) => {
    s(st(i.result), l.oldVersion, l.newVersion, st(i.transaction), l);
  }), t && i.addEventListener("blocked", (l) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    l.oldVersion,
    l.newVersion,
    l
  )), o.then((l) => {
    a && l.addEventListener("close", () => a()), r && l.addEventListener("versionchange", (c) => r(c.oldVersion, c.newVersion, c));
  }).catch(() => {
  }), o;
}
function Gn(n, { blocked: e } = {}) {
  const t = indexedDB.deleteDatabase(n);
  return e && t.addEventListener("blocked", (s) => e(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    s.oldVersion,
    s
  )), st(t).then(() => {
  });
}
const Ua = ["get", "getKey", "getAll", "getAllKeys", "count"], Fa = ["put", "add", "delete", "clear"], An = /* @__PURE__ */ new Map();
function Ms(n, e) {
  if (!(n instanceof IDBDatabase && !(e in n) && typeof e == "string"))
    return;
  if (An.get(e))
    return An.get(e);
  const t = e.replace(/FromIndex$/, ""), s = e !== t, r = Fa.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (s ? IDBIndex : IDBObjectStore).prototype) || !(r || Ua.includes(t))
  )
    return;
  const a = async function(i, ...o) {
    const l = this.transaction(i, r ? "readwrite" : "readonly");
    let c = l.store;
    return s && (c = c.index(o.shift())), (await Promise.all([
      c[t](...o),
      r && l.done
    ]))[0];
  };
  return An.set(e, a), a;
}
Pa((n) => ({
  ...n,
  get: (e, t, s) => Ms(e, t) || n.get(e, t, s),
  has: (e, t) => !!Ms(e, t) || n.has(e, t)
}));
const ce = {
  name: "bd-queue",
  store: "jobs",
  timeIndex: "time",
  objectIndex: "object"
};
var k = /* @__PURE__ */ ((n) => (n.Pending = "pending", n.Completed = "completed", n.Failed = "failed", n.Conflict = "conflict", n))(k || {}), De = /* @__PURE__ */ ((n) => (n.Success = "success", n.Exception = "exception", n.Failed = "failed", n.Conflict = "conflict", n))(De || {}), he = /* @__PURE__ */ ((n) => (n.Add = "add", n.Edit = "edit", n.Delete = "delete", n))(he || {}), Ke = "SharedWorker" in globalThis, Ra = class {
  constructor(n) {
    O(this, "ActualWorker"), this.ActualWorker = n;
  }
  /**
   * An EventListener called when MessageEvent of type message is fired on the port—that is, when the port receives a message.
   */
  get onmessage() {
    var n;
    return Ke ? (n = this.ActualWorker) == null ? void 0 : n.port.onmessage : this.ActualWorker.onmessage;
  }
  set onmessage(n) {
    Ke ? this.ActualWorker.port.onmessage = n : this.ActualWorker.onmessage = n;
  }
  /**
   * An EventListener called when a MessageEvent of type MessageError is fired—that is, when it receives a message that cannot be deserialized.
   */
  get onmessageerror() {
    var n;
    return Ke ? (n = this.ActualWorker) == null ? void 0 : n.port.onmessageerror : this.ActualWorker.onmessageerror;
  }
  set onmessageerror(n) {
    Ke ? this.ActualWorker.port.onmessageerror = n : this.ActualWorker.onmessageerror = n;
  }
  /**
   * Starts the sending of messages queued on the port (only needed when using EventTarget.addEventListener; it is implied when using MessagePort.onmessage.)
   */
  start() {
    var n;
    if (Ke)
      return (n = this.ActualWorker) == null ? void 0 : n.port.start();
  }
  /**
   * Clones message and transmits it to worker's global environment. transfer can be passed as a list of objects that are to be transferred rather than cloned.
   */
  postMessage(n, e) {
    var t;
    return Ke ? (t = this.ActualWorker) == null ? void 0 : t.port.postMessage(n, e) : this.ActualWorker.postMessage(n, e);
  }
  /**
   * Immediately terminates the worker. This does not let worker finish its operations; it is halted at once. ServiceWorker instances do not support this method.
   */
  terminate() {
    var n;
    return Ke ? (n = this.ActualWorker) == null ? void 0 : n.port.close() : this.ActualWorker.terminate();
  }
  /**
   * Disconnects the port, so it is no longer active.
   */
  close() {
    return this.terminate();
  }
  /**
   * Returns a MessagePort object used to communicate with and control the shared worker.
   */
  get port() {
    return Ke ? this.ActualWorker.port : this.ActualWorker;
  }
  /**
   * Is an EventListener that is called whenever an ErrorEvent of type error event occurs.
   */
  get onerror() {
    return this.ActualWorker.onerror;
  }
  set onerror(n) {
    this.ActualWorker.onerror = n;
  }
  addEventListener(n, e, t) {
    var s;
    return Ke && n !== "error" ? (s = this.ActualWorker) == null ? void 0 : s.port.addEventListener(n, e, t) : this.ActualWorker.addEventListener(n, e, t);
  }
  removeEventListener(n, e, t) {
    var s;
    return Ke && n !== "error" ? (s = this.ActualWorker) == null ? void 0 : s.port.removeEventListener(n, e, t) : this.ActualWorker.removeEventListener(n, e, t);
  }
  /**
   * Dispatches an event to this EventTarget.
   */
  dispatchEvent(n) {
    return this.ActualWorker.dispatchEvent(n);
  }
}, Wa = class extends Ra {
  constructor(n, e) {
    let t;
    Ke ? t = new SharedWorker(n, e) : t = new Worker(n, e), super(t);
  }
};
function Ba(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var gr = {};
/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
(function(n) {
  (function(e) {
    e(typeof DO_NOT_EXPORT_CRC > "u" ? n : {});
  })(function(e) {
    e.version = "1.2.2";
    function t() {
      for (var b = 0, j = new Array(256), E = 0; E != 256; ++E)
        b = E, b = b & 1 ? -306674912 ^ b >>> 1 : b >>> 1, b = b & 1 ? -306674912 ^ b >>> 1 : b >>> 1, b = b & 1 ? -306674912 ^ b >>> 1 : b >>> 1, b = b & 1 ? -306674912 ^ b >>> 1 : b >>> 1, b = b & 1 ? -306674912 ^ b >>> 1 : b >>> 1, b = b & 1 ? -306674912 ^ b >>> 1 : b >>> 1, b = b & 1 ? -306674912 ^ b >>> 1 : b >>> 1, b = b & 1 ? -306674912 ^ b >>> 1 : b >>> 1, j[E] = b;
      return typeof Int32Array < "u" ? new Int32Array(j) : j;
    }
    var s = t();
    function r(b) {
      var j = 0, E = 0, L = 0, _ = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
      for (L = 0; L != 256; ++L)
        _[L] = b[L];
      for (L = 0; L != 256; ++L)
        for (E = b[L], j = 256 + L; j < 4096; j += 256)
          E = _[j] = E >>> 8 ^ b[E & 255];
      var A = [];
      for (L = 1; L != 16; ++L)
        A[L - 1] = typeof Int32Array < "u" ? _.subarray(L * 256, L * 256 + 256) : _.slice(L * 256, L * 256 + 256);
      return A;
    }
    var a = r(s), i = a[0], o = a[1], l = a[2], c = a[3], d = a[4], u = a[5], f = a[6], m = a[7], h = a[8], p = a[9], y = a[10], v = a[11], g = a[12], w = a[13], S = a[14];
    function $(b, j) {
      for (var E = j ^ -1, L = 0, _ = b.length; L < _; )
        E = E >>> 8 ^ s[(E ^ b.charCodeAt(L++)) & 255];
      return ~E;
    }
    function P(b, j) {
      for (var E = j ^ -1, L = b.length - 15, _ = 0; _ < L; )
        E = S[b[_++] ^ E & 255] ^ w[b[_++] ^ E >> 8 & 255] ^ g[b[_++] ^ E >> 16 & 255] ^ v[b[_++] ^ E >>> 24] ^ y[b[_++]] ^ p[b[_++]] ^ h[b[_++]] ^ m[b[_++]] ^ f[b[_++]] ^ u[b[_++]] ^ d[b[_++]] ^ c[b[_++]] ^ l[b[_++]] ^ o[b[_++]] ^ i[b[_++]] ^ s[b[_++]];
      for (L += 15; _ < L; )
        E = E >>> 8 ^ s[(E ^ b[_++]) & 255];
      return ~E;
    }
    function M(b, j) {
      for (var E = j ^ -1, L = 0, _ = b.length, A = 0, H = 0; L < _; )
        A = b.charCodeAt(L++), A < 128 ? E = E >>> 8 ^ s[(E ^ A) & 255] : A < 2048 ? (E = E >>> 8 ^ s[(E ^ (192 | A >> 6 & 31)) & 255], E = E >>> 8 ^ s[(E ^ (128 | A & 63)) & 255]) : A >= 55296 && A < 57344 ? (A = (A & 1023) + 64, H = b.charCodeAt(L++) & 1023, E = E >>> 8 ^ s[(E ^ (240 | A >> 8 & 7)) & 255], E = E >>> 8 ^ s[(E ^ (128 | A >> 2 & 63)) & 255], E = E >>> 8 ^ s[(E ^ (128 | H >> 6 & 15 | (A & 3) << 4)) & 255], E = E >>> 8 ^ s[(E ^ (128 | H & 63)) & 255]) : (E = E >>> 8 ^ s[(E ^ (224 | A >> 12 & 15)) & 255], E = E >>> 8 ^ s[(E ^ (128 | A >> 6 & 63)) & 255], E = E >>> 8 ^ s[(E ^ (128 | A & 63)) & 255]);
      return ~E;
    }
    e.table = s, e.bstr = $, e.buf = P, e.str = M;
  });
})(gr);
function St() {
  return vr(/* @__PURE__ */ new Date());
}
function vr(n) {
  return Math.floor((n.getTime() - (/* @__PURE__ */ new Date("2021-01-01T00:00:00Z")).getTime()) / 1e3);
}
function cn(n) {
  return new Date(n * 1e3 + (/* @__PURE__ */ new Date("2021-01-01T00:00:00Z")).getTime());
}
function At(n) {
  return St().toString(36) + "-" + gr.str(JSON.stringify(n)).toString(36);
}
function Ja(n) {
  return new Promise((e) => {
    setTimeout(e, n);
  });
}
class Pn {
  //Send the job's transaction to its designated server
  static async send(e, t) {
    try {
      const s = new URL(e.url).origin !== self.location.origin ? "?enableCors=1" : "", r = await globalThis.fetch(
        e.url + "/api/post.json" + s,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", ...t ?? {} },
          body: JSON.stringify([e.transaction])
        }
      );
      if (!r.ok)
        throw new Error(`HTTP request failed with status ${r.status}` + (r.statusText ? `: ${r.statusText}` : ""));
      const a = await r.json();
      if (!a || !a.results)
        throw new Error("No response returned!");
      const i = a.results[e.transaction.hash];
      if (!i)
        throw new Error("No result returned for this job!");
      if (i.s || i.s0 || i.s1 || i.n)
        return {
          status: De.Success
        };
      if (i.conflict) {
        const o = Object.keys(e.transaction.data)[0], l = i.conflict[o];
        if (l === void 0)
          throw new Error("No previous value found in conflict result!");
        return {
          status: De.Conflict,
          message: l
        };
      } else if (i.e)
        return {
          status: De.Failed,
          message: i.e
        };
      return {
        status: De.Exception,
        message: a.error ?? (Array.isArray(a.errors) ? a.errors.map((o) => (o == null ? void 0 : o.message) ?? o).join(" | ") : "Unknown error!")
      };
    } catch (s) {
      return {
        status: De.Exception,
        message: s.message
      };
    }
  }
}
class rt {
  /**
   * Pings the database, ensuring it's correctly set up.
   */
  async ping() {
    const e = await this.openConnection(), t = ["sync_transactions", "evaluated_transactions"];
    for (const s of t)
      if (!e.objectStoreNames.contains(s))
        return e.close(), console.log(`There's missing stores, recreating the database. Available stores: ${e.objectStoreNames}`), await Gn("db_master"), await this.ping();
    e.close();
  }
  /**
   * Records a rewritten transaction in the evaluated ledger, replacing the
   * transactions it was merged from. Sync skips evaluated hashes, so the
   * hash on record must be the one actually sent to the server — the echo
   * of an unrecorded rewritten hash would be applied as a foreign change
   * and rewind the local value.
   *
   * @param transaction Rewritten transaction as it will be sent.
   * @param replacedHashes Hashes of the transactions it replaces.
   */
  async recordRewrittenTransaction(e, t) {
    const s = await this.openConnection(), r = s.transaction("evaluated_transactions", "readwrite");
    for (const a of t)
      r.store.delete(a);
    r.store.put(e), await r.done, s.close();
  }
  /**
   * Opens a connection to the database.
   *
   * @returns instance of the database connection
   */
  async openConnection() {
    return await Dt("db_master", 1, {
      upgrade: (e, t, s, r, a) => {
        s === 1 && (e.createObjectStore("sync_transactions", {
          autoIncrement: !1,
          keyPath: "hash"
        }), e.createObjectStore("evaluated_transactions", {
          autoIncrement: !1,
          keyPath: "hash"
        }));
      }
    });
  }
}
function Nn(n, e) {
  if (typeof n != "string" || e === null || typeof e != "object")
    return n;
  try {
    return JSON.parse(n);
  } catch {
    return n;
  }
}
function un(n, e) {
  if (n === e)
    return !0;
  if (n === null || e === null || typeof n != "object" || typeof e != "object" || Array.isArray(n) !== Array.isArray(e))
    return !1;
  const t = Object.keys(n);
  return t.length !== Object.keys(e).length ? !1 : t.every((s) => Object.hasOwn(e, s) && un(n[s], e[s]));
}
function Cs(n, e) {
  return un(Nn(n, e), e);
}
var sn = [], br, es = [];
function xs(n, e) {
  const t = { ...e ?? br ?? {} };
  let s;
  try {
    s = new URL(n).origin;
  } catch {
    return t;
  }
  for (const r of es)
    r.origin === s && Object.assign(t, r.headers);
  return t;
}
class wr {
  constructor(e, t, s) {
    O(this, "_db", null), O(this, "_currentTimestamp", null), O(this, "_localHeaders"), O(this, "_postMessage"), this._postMessage = e, this._localHeaders = t, s && (es = s);
  }
  //Update job
  async _updateJob(e) {
    var t;
    return await ((t = this._db) == null ? void 0 : t.put(ce.store, e)), e;
  }
  //Delete job
  async _deleteJob(e) {
    var t;
    await ((t = this._db) == null ? void 0 : t.delete(ce.store, e.id));
  }
  //Send job to clients
  _sendJobEvent(e) {
    if (typeof this._postMessage == "function")
      this._postMessage({ data: { job: e } });
    else
      for (const t of sn)
        t == null || t.postMessage({ job: e });
  }
  //Get next job
  async _getNextJob() {
    var e;
    let t = null;
    const s = (e = this._db) == null ? void 0 : e.transaction(ce.store, "readonly").store, r = this._currentTimestamp ? IDBKeyRange.lowerBound(this._currentTimestamp, !0) : null;
    let a = await (s == null ? void 0 : s.index(ce.timeIndex).openCursor(r, "next"));
    for (; a; ) {
      if (a.value.status === k.Pending) {
        t = a.value;
        break;
      }
      a = await a.continue();
    }
    return this._currentTimestamp = (t == null ? void 0 : t.createdAt) ?? null, t;
  }
  //Handle priority check
  async _checkPriority(e) {
    let t = !1;
    return e.attempts && e.priority && e.priority > 1 && (t = e.attempts % e.priority !== 0, t && await this._updateJob({
      ...e,
      attempts: e.attempts + 1
    })), t;
  }
  //Get preceding unresolved jobs
  async _getPrecedingUnresolvedJobs(e) {
    var t;
    const s = [], r = e.transaction.action === he.Edit ? Object.keys(e.transaction.data)[0] : null, a = (t = this._db) == null ? void 0 : t.transaction(ce.store, "readonly").store, i = IDBKeyRange.upperBound(e.createdAt, !0);
    let o = await (a == null ? void 0 : a.index(ce.timeIndex).openCursor(i, "next"));
    for (; o; )
      o.value.status !== k.Completed && //Same destination
      o.value.url === e.url && //Only same object jobs
      o.value.transaction.blitzID === e.transaction.blitzID && //Only same attribute jobs if both passed job and current job have an edit action
      (o.value.transaction.action !== he.Edit || e.transaction.action !== he.Edit || Object.keys(o.value.transaction.data)[0] === r) && s.push(o.value), o = await o.continue();
    return s;
  }
  //Handle preceding unresolved add job check
  async _checkPrecedingUnresolvedAddJob(e, t) {
    let s = !1;
    if (t.length > 0 && t[0].transaction.action === he.Add && (s = !0, e.transaction.action === he.Delete))
      for (const r of [e, ...t])
        await this._deleteJob(r);
    return s;
  }
  //Handle preceding conflict edit jobs check
  async _checkPrecedingConflictEditJobs(e, t) {
    let s = !1;
    if (t.find((r) => r.transaction.action === he.Edit && r.status === k.Conflict)) {
      s = !0;
      const r = await this._updateJob({
        ...e,
        status: k.Conflict
      });
      this._sendJobEvent(r);
    }
    return s;
  }
  //Handle preceding failed edit jobs check
  async _checkPrecedingFailedEditJobs(e, t) {
    var s, r;
    let a = !1;
    const i = t.filter((c) => c.transaction.action === he.Edit && (c.status === k.Pending || c.status === k.Failed)), o = Object.keys(e.transaction.data)[0], l = ((s = e.transaction.data) == null ? void 0 : s[o].new) !== void 0 && ((r = e.transaction.data) == null ? void 0 : r[o].prev) !== void 0;
    return i.length > 0 && l && (a = !0, e.attempts || await this._editAttemptHandler(e, i)), a;
  }
  //Handle merging with future edit jobs
  async _mergeWithFutureEditJobs(e) {
    var t, s, r;
    const a = [], i = Object.keys(e.transaction.data)[0], o = (t = this._db) == null ? void 0 : t.transaction(ce.store, "readonly").store, l = IDBKeyRange.lowerBound(e.createdAt, !0);
    let c = await (o == null ? void 0 : o.index(ce.timeIndex).openCursor(l, "next"));
    for (; c; )
      (c.value.status === k.Pending || c.value.status === k.Failed) && //Same destination
      c.value.url === e.url && //Only edit jobs
      c.value.transaction.action === he.Edit && //Only same object jobs
      c.value.transaction.blitzID === e.transaction.blitzID && //Only same attribute jobs
      Object.keys(c.value.transaction.data)[0] === i && a.push(c.value), c = await c.continue();
    var d = e;
    if (a.length > 0) {
      const u = a[a.length - 1];
      if (u && ((s = u.transaction.data) == null ? void 0 : s[i].new) !== void 0 && ((r = e.transaction.data) == null ? void 0 : r[i].prev) !== void 0) {
        const f = {
          [i]: {
            prev: e.transaction.data[i].prev,
            new: u.transaction.data[i].new
          }
        }, m = (/* @__PURE__ */ new Date()).getTime();
        d = await this._updateJob({
          ...e,
          transaction: {
            ...e.transaction,
            data: f,
            blitzstamp: St(),
            hash: At({ ...f, blitzID: e.transaction.blitzID, timestamp: m })
          },
          dataHistory: [...e.dataHistory ?? [], { timestamp: m, type: "worker-succeeding", data: e.transaction.data }]
        }), await new rt().recordRewrittenTransaction(
          d.transaction,
          [e.transaction.hash, ...a.map((h) => h.transaction.hash)]
        );
        for (const h of a)
          await this._deleteJob(h);
      }
    }
    return d;
  }
  //Handle job's status response
  async _statusHandler(e, t) {
    var s, r, a;
    if (t.status === De.Success) {
      const i = await this._updateJob({
        ...e,
        status: k.Completed
      });
      this._sendJobEvent(i);
    } else if (t.status === De.Exception)
      await this._updateJob({
        ...e,
        status: k.Pending,
        attempts: e.attempts + 1,
        priority: e.priority < 5 ? e.priority + 1 : e.priority,
        message: t.message
      });
    else if (t.status === De.Failed)
      if (e.attempts > 0) {
        const i = await this._updateJob({
          ...e,
          status: k.Failed,
          message: t.message
        });
        this._sendJobEvent(i);
      } else
        await this._updateJob({
          ...e,
          status: k.Pending,
          attempts: e.attempts + 1,
          message: t.message
        });
    else if (t.status === De.Conflict) {
      const i = Object.keys(e.transaction.data)[0];
      if (un((s = e.transaction.data) == null ? void 0 : s[i].prev, (r = e.transaction.data) == null ? void 0 : r[i].new) || Cs(t.message, (a = e.transaction.data) == null ? void 0 : a[i].new)) {
        const o = await this._updateJob({
          ...e,
          status: k.Completed
        });
        this._sendJobEvent(o);
      } else {
        const o = await this._updateJob({
          ...e,
          status: k.Conflict,
          message: t.message
        });
        this._sendJobEvent(o);
      }
    }
  }
  //Handle edit job attempt
  async _editAttemptHandler(e, t) {
    var s, r, a, i, o;
    const l = Object.keys(e.transaction.data)[0], c = t[0];
    if (((s = c.transaction.data) == null ? void 0 : s[l].prev) === void 0)
      return;
    const d = {
      [l]: {
        prev: c.transaction.data[l].prev,
        new: (r = e.transaction.data) == null ? void 0 : r[l].new
      }
    }, u = (/* @__PURE__ */ new Date()).getTime();
    var f = {
      ...e,
      transaction: {
        ...e.transaction,
        data: d,
        blitzstamp: St(),
        hash: At({ ...d, blitzID: e.transaction.blitzID, timestamp: u })
      },
      dataHistory: [...e.dataHistory ?? [], { timestamp: u, type: "worker-attempt", data: e.transaction.data }]
    };
    await new rt().recordRewrittenTransaction(f.transaction, []);
    let m;
    if (d[l].prev === d[l].new ? m = { status: De.Success } : m = await Pn.send(f, xs(f.url, this._localHeaders)), m.status === De.Success) {
      f = await this._updateJob({
        ...f,
        status: k.Completed
      });
      for (const h of t)
        await this._updateJob({
          ...h,
          status: k.Completed
        });
      this._sendJobEvent(f);
    } else if (m.status === De.Exception || m.status === De.Failed)
      await this._updateJob({
        ...e,
        status: c.status,
        attempts: e.attempts + 1,
        message: m.message
      });
    else if (m.status === De.Conflict)
      if (un((a = f.transaction.data) == null ? void 0 : a[l].prev, (i = f.transaction.data) == null ? void 0 : i[l].new) || Cs(m.message, (o = f.transaction.data) == null ? void 0 : o[l].new)) {
        f = await this._updateJob({
          ...f,
          status: k.Completed
        });
        for (const h of t)
          await this._updateJob({
            ...h,
            status: k.Completed
          });
        this._sendJobEvent(f);
      } else {
        f = await this._updateJob({
          ...f,
          status: k.Conflict,
          message: m.message
        });
        for (const h of t)
          await this._deleteJob(h);
        this._sendJobEvent(f);
      }
    (m.status === De.Success || m.status === De.Conflict) && await new rt().recordRewrittenTransaction(
      f.transaction,
      [e.transaction.hash, ...t.map((h) => h.transaction.hash)]
    );
  }
  //Start processing queue
  async start() {
    var e, t;
    for (this._db = await Dt(ce.name, 1); ; ) {
      try {
        var s = await this._getNextJob();
        if (!s)
          throw new Error("SKIP");
        if (await this._checkPriority(s))
          throw new Error("SKIP");
        var r = [];
        if ((s.transaction.action === he.Edit || s.transaction.action === he.Delete) && (r = await this._getPrecedingUnresolvedJobs(s), await this._checkPrecedingUnresolvedAddJob(s, r)))
          throw new Error("SKIP");
        if (s.transaction.action === he.Edit) {
          if (await this._checkPrecedingConflictEditJobs(s, r))
            throw new Error("SKIP");
          if (await this._checkPrecedingFailedEditJobs(s, r))
            throw new Error("SKIP");
          s = await this._mergeWithFutureEditJobs(s);
          const i = Object.keys(s.transaction.data)[0];
          if (((e = s.transaction.data) == null ? void 0 : e[i].prev) !== void 0 && ((t = s.transaction.data) == null ? void 0 : t[i].new) !== void 0 && s.transaction.data[i].prev === s.transaction.data[i].new) {
            const o = { status: De.Success };
            throw await this._statusHandler(s, o), new Error("SKIP");
          }
        }
        const a = await Pn.send(s, xs(s.url, this._localHeaders));
        await this._statusHandler(s, a);
      } catch (a) {
        if (a.message !== "SKIP") {
          console.error(a.stack);
          break;
        }
      }
      await new Promise((a) => setTimeout(a, 1e3));
    }
    this._db && this._db.close(), this.start();
  }
}
function $s(n) {
  sn.push(n), n.onmessage = function(e) {
    e.data.type === "close" ? sn = sn.filter((t) => t !== n) : e.data.type === "headers" ? e.data.data && (br = e.data.data) : e.data.type === "scopedHeaders" && e.data.data && (es = e.data.data);
  };
}
("SharedWorkerGlobalScope" in self || "WorkerGlobalScope" in self) && ("SharedWorkerGlobalScope" in self ? self.onconnect = (n) => $s(n.ports[0]) : $s(self), new wr().start());
class Fe {
  /**
   * Constructor.
   *
   * @param options Options to construct a transaction.
   */
  constructor(e) {
    O(this, "action"), O(this, "blitzstamp"), O(this, "hash"), O(this, "hashAlgo"), O(this, "blitzID"), O(this, "userhash"), O(this, "model"), O(this, "data");
    var t;
    this.action = e.action, this.blitzstamp = e.blitzstamp ?? St(), this.hash = e.hash ?? At(e.data === void 0 ? { blitzID: e.blitzID, milliseconds: (/* @__PURE__ */ new Date()).getTime(), rand: Math.random() } : { ...e.data, blitzID: e.blitzID, milliseconds: (/* @__PURE__ */ new Date()).getTime(), rand: Math.random() }), this.hashAlgo = e.hashAlgo ?? "b-crc32", this.blitzID = e.blitzID ?? ((t = e.data) == null ? void 0 : t._blitzID) ?? this.hash, this.model = e.model, this.data = e.data ?? {}, this.userhash = e.userhash;
  }
  /**
   * Converts the transaction to an object.
   */
  toObject() {
    return {
      action: this.action,
      blitzstamp: this.blitzstamp,
      hash: this.hash,
      hashAlgo: this.hashAlgo,
      blitzID: this.blitzID,
      model: this.model,
      data: this.data,
      userhash: this.userhash
    };
  }
  /**
   * Creates new transaction object same data as this object.
   */
  clone() {
    return new Fe({
      action: this.action,
      model: this.model,
      blitzID: this.blitzID,
      blitzstamp: this.blitzstamp,
      data: this.data,
      hash: this.hash,
      hashAlgo: this.hashAlgo,
      userhash: this.userhash
    });
  }
  /**
   * Converts an object to a transaction.
   *
   * @param object Object to convert.
   */
  static fromObject(e) {
    var t;
    return new Fe({
      action: e.action,
      blitzstamp: e.blitzstamp,
      hash: e.hash,
      hashAlgo: e.hashAlgo,
      blitzID: e.blitzID ?? ((t = e.data) == null ? void 0 : t._blitzID) ?? e.blitzID,
      model: e.model,
      data: e.data,
      userhash: e.userhash
    });
  }
}
var Le = /* @__PURE__ */ ((n) => (n.Success = "success", n.Notice = "notice", n.Error = "error", n.Exception = "exception", n))(Le || {});
class Be {
  /**
   * Constructor.
   *
   * @param hash Hash of the transaction.
   * @param status Status of the transaction result.
   * @param message Message of the transaction.
   * @param conflict Whether it is a conflicting transaction or not.
   */
  constructor(e, t, s, r = null, a) {
    O(this, "blitzID"), O(this, "hash"), O(this, "message"), O(this, "conflict"), O(this, "replicaUrl", null), O(this, "status"), this.blitzID = e, this.hash = t, this.status = s, this.message = r, this.conflict = a;
  }
  /**
   * Sets the replica url.
   *
   * @param url Replica url.
   */
  setReplicaUrl(e) {
    this.replicaUrl = e;
  }
  /**
   * Whether the transaction was conflicting or not.
   *
   * @return True if it was a conflicting transaction, false otherwise.
   */
  isConflict() {
    return typeof this.conflict < "u" && this.conflict !== null;
  }
}
class dn extends Array {
  /**
   * Returns the transaction result with given hash.
   *
   * @param hash Hash of the transaction.
   */
  get(e) {
    return this.find((t) => t.hash === e);
  }
  /**
   * Checks whether given hash is in the collection.
   *
   * @param hash Hash of the transaction.
   */
  has(e) {
    return this.some((t) => t.hash === e);
  }
  /**
   * Checks whether all transaction results are successful, or given hash is successful.
   *
   * @param hash [Optional] Hash ID of the transaction to be checked.
   */
  isSuccessful(e) {
    var t;
    if (e) {
      const s = (t = this.get(e)) == null ? void 0 : t.status;
      return s ? s === "success" || s === "notice" : !1;
    }
    return this.every((s) => s.status);
  }
  /**
   * Checks whether all transaction results are failed, or given hash is failed.
   *
   * @param hash [Optional] Hash ID of the transaction to be checked.
   */
  isFailed(e) {
    var t;
    if (e) {
      const s = (t = this.get(e)) == null ? void 0 : t.status;
      return s ? s === "error" : !0;
    }
    return this.every((s) => !s.status);
  }
  /**
   * Returns new transaction result collection that only contains successful transaction results.
   */
  successful() {
    return new dn(...this.filter((e) => e.status));
  }
  /**
   * Returns new transaction result collection that only contains failed transaction results.
   */
  failed() {
    return new dn(...this.filter((e) => !e.status));
  }
}
let _r;
function Va(n) {
  _r = n;
}
function at() {
  return _r;
}
class _n {
  constructor() {
    O(this, "client", new rt());
  }
  /**
   * Creates a new instance of the SyncTransactionRepository class.
   */
  static create() {
    return new _n();
  }
  /**
   * Returns all waited transactions from the indexed db.
   */
  async all() {
    const e = await this.client.openConnection(), t = await e.getAll("sync_transactions");
    return e.close(), t;
  }
  /**
   * Adds a new transaction to the indexed db.
   */
  async put(e) {
    const t = await this.client.openConnection();
    await t.put("sync_transactions", e), t.close();
  }
  /**
   * Adds multiple transactions to the indexeddb.
   */
  async putMultiple(e) {
    if (e.length === 0)
      return;
    const t = await this.client.openConnection(), s = t.transaction("sync_transactions", "readwrite");
    for (const r of e)
      s.store.put(r);
    await s.done, t.close();
  }
  /**
   * Deletes the transaction from indexed db by its hash.
   */
  async delete(e) {
    const t = await this.client.openConnection();
    await t.delete("sync_transactions", e), t.close();
  }
}
class Qe {
  /**
   * Creates new transaction evaluator.
   */
  static create() {
    return new Qe();
  }
  /**
   * Runs the transaction evaluator with supplied transactions.
   *
   * @param transactions Transactions to be processed.
   */
  async run(e) {
    const t = new dn(), s = _n.create(), r = { add: 1, edit: 2, delete: 3 }, a = await new rt().openConnection();
    e = e.sort((i, o) => r[i.action] - r[o.action]);
    for (const i of e) {
      let o;
      i.model === "@Model" ? i.model = "_Model" : i.model === "@Project" && (i.model = "_Project");
      try {
        if (i.action === "add")
          o = await this.processAddTransaction(i);
        else if (i.action === "edit")
          o = await this.processEditTransaction(i, a);
        else if (i.action === "delete")
          o = await this.processDeleteTransaction(i);
        else
          throw new Error(`Unknown action "${i.action}" on transaction ${i.hash}`);
        await a.put("evaluated_transactions", i.toObject());
      } catch (l) {
        o = new Be(
          i.blitzID,
          i.hash,
          Le.Error,
          l.message
        );
      }
      t.push(o), await s.delete(i.hash);
    }
    return a.close(), t;
  }
  /**
   * Processes the `add` transaction.
   *
   * @param transaction Transaction to be processed.
   */
  async processAddTransaction(e) {
    var t;
    const s = await at().get(e.model), r = s.idbClient();
    if (await r.find(e.hash))
      return new Be(
        e.hash,
        e.hash,
        Le.Error,
        `Object with ${e.hash} already exists on ${e.model} model.`
      );
    const a = s.getClusterManager(), i = {
      _blitzID: e.hash,
      _blitzstamp: e.blitzstamp.toString(),
      _sort: e.blitzstamp.toString(),
      _clusters: a.names(),
      _editURLs: a.toArray().map((o) => o.options.addURL).flat(),
      ...(() => {
        const o = {};
        for (const [l, c] of Object.entries(e.data)) {
          const d = s.getAttributeDetails(l);
          if (d && Array.isArray(d.type) && c !== void 0) {
            const u = typeof c == "string" ? JSON.parse(c) : c;
            l.endsWith("_mtm") ? o[l] = u.map((f, m) => ({
              _blitzID: typeof f == "string" ? f : f._blitzID,
              _mtmSort: typeof f == "string" ? (u.length - m) * 15 : f._mtmSort
            })) : o[l] = u;
          } else
            o[l] = c;
        }
        return o;
      })()
    };
    if (["1", !0].includes((t = s.haspublishingdate) == null ? void 0 : t.value) && typeof e.data._publishingdate > "u" && typeof e.blitzstamp == "number") {
      const o = /* @__PURE__ */ new Date();
      o.setTime(e.blitzstamp * 1e3 + (/* @__PURE__ */ new Date("2021-01-01T00:00:00Z")).getTime()), o.setMinutes(o.getMinutes() - o.getTimezoneOffset()), i._publishingdate = o.toISOString().slice(0, 19).replace("T", " ");
    }
    return !i._userID && e.userhash && (i._userID = e.userhash), e.data = i, await r.create(i), new Be(e.hash, e.hash, Le.Success);
  }
  /**
   * Processes the `edit` transaction.
   *
   * @param transaction Transaction to be processed.
   */
  async processEditTransaction(e, t) {
    var s;
    const r = await at().get(e.model), a = r.idbClient(), i = Object.keys(e.data);
    if (i.length !== 1)
      return new Be(
        e.blitzID,
        e.hash,
        Le.Error,
        i.length > 1 ? "Can not edit more than one attribute at once." : "Attribute not provided to perform edit."
      );
    if (await t.get("evaluated_transactions", e.hash))
      return new Be(
        e.blitzID,
        e.hash,
        Le.Notice,
        `Transaction ${e.hash} already processed.`
      );
    const o = await a.find(e.blitzID);
    if (!o)
      return new Be(e.blitzID, e.hash, Le.Notice, `Object with ${e.blitzID} does not exists.`);
    if (o._savetimestamp && o._savetimestamp > e.blitzstamp)
      return new Be(e.blitzID, e.hash, Le.Notice, "Old transaction.");
    const l = i.shift(), c = (s = r.getAttributeDetails(l)) == null ? void 0 : s.type;
    if (Array.isArray(c))
      if (Object.hasOwn(e.data[l], "add")) {
        o[l] = Array.isArray(o[l]) ? o[l] : [];
        const d = e.data[l].add;
        l.endsWith("_mtm") ? o[l].push({
          _blitzID: typeof d == "string" ? d : d._blitzID,
          _mtmSort: typeof d == "string" ? o[l].length ? Math.max(...o[l].map((u) => u._mtmSort)) + 15 : 15 : d._mtmSort
        }) : o[l].push(d);
      } else if (Object.hasOwn(e.data[l], "remove") && Array.isArray(o[l])) {
        const d = e.data[l].remove;
        l.endsWith("_mtm") ? o[l].splice(o[l].findIndex((u) => u._blitzID === d), 1) : o[l].splice(o[l].findIndex((u) => u === d), 1);
      } else
        return new Be(e.blitzID, e.hash, Le.Error, `Invalid operation for array attribute ${l}.`);
    else {
      const d = e.data[l];
      if (o[l] === d.new)
        return new Be(e.blitzID, e.hash, Le.Notice, "Conflict");
      o[l] = d.new;
    }
    return await a.update(o), new Be(e.blitzID, e.hash, Le.Success);
  }
  /**
   * Processes the `delete` transaction.
   *
   * @param transaction Transaction to be processed.
   */
  async processDeleteTransaction(e) {
    const t = (await at().get(e.model)).idbClient();
    return await t.find(e.blitzID) ? (await t.delete(e.blitzID), new Be(e.blitzID, e.hash, Le.Success)) : new Be(e.blitzID, e.hash, Le.Error, `Object with ${e.blitzID} does not exists.`);
  }
}
class Ya {
  //Constructor
  constructor(e) {
    O(this, "_db"), this._db = e;
  }
  //Update job
  async _updateJob(e) {
    var t;
    return await ((t = this._db) == null ? void 0 : t.put(ce.store, e)), e;
  }
  //Delete job
  async _deleteJob(e) {
    var t;
    await ((t = this._db) == null ? void 0 : t.delete(ce.store, e.id));
  }
  //Get completed replicated jobs
  async _getCompletedReplicatedJobs(e) {
    var t;
    const s = [], r = (t = this._db) == null ? void 0 : t.transaction(ce.store, "readonly").store;
    let a = await (r == null ? void 0 : r.openCursor(null, "next"));
    for (; a; )
      a.value.status === k.Completed && //Not the same destination
      a.value.url !== e.url && //Only edit jobs
      a.value.transaction.action === he.Edit && //Only same object jobs
      a.value.transaction.blitzID === e.transaction.blitzID && //Only same hash
      a.value.transaction.hash === e.transaction.hash && s.push(a.value), a = await a.continue();
    return s;
  }
  //Get future jobs
  async _getFutureJobs(e, t) {
    var s;
    const r = [], a = (s = this._db) == null ? void 0 : s.transaction(ce.store, "readonly").store, i = IDBKeyRange.lowerBound(e.createdAt, !0);
    let o = await (a == null ? void 0 : a.index(ce.timeIndex).openCursor(i, "next"));
    for (; o; )
      o.value.status === k.Conflict && //Same destination
      o.value.url === e.url && //Only edit jobs
      o.value.transaction.action === he.Edit && //Only same object jobs
      o.value.transaction.blitzID === e.transaction.blitzID && //Only same attribute jobs
      Object.keys(o.value.transaction.data)[0] === t && r.push(o.value), o = await o.continue();
    return r;
  }
  //Merge with future jobs
  async _mergeWithFutureEditJobs(e, t) {
    var s, r;
    const a = await this._getFutureJobs(e, t);
    let i = e;
    if (a.length > 0) {
      const o = a[a.length - 1];
      if (o && ((s = o.transaction.data) == null ? void 0 : s[t].new) !== void 0 && ((r = e.transaction.data) == null ? void 0 : r[t].prev) !== void 0) {
        const l = {
          [t]: {
            prev: e.transaction.data[t].prev,
            new: o.transaction.data[t].new
          }
        }, c = (/* @__PURE__ */ new Date()).getTime();
        i = await this._updateJob({
          ...e,
          transaction: {
            ...e.transaction,
            data: l,
            blitzstamp: St(),
            hash: At({ ...l, blitzID: e.transaction.blitzID, timestamp: c })
          },
          dataHistory: [...e.dataHistory ?? [], { timestamp: c, type: "conflict-succeeding", data: e.transaction.data }]
        }), await new rt().recordRewrittenTransaction(
          i.transaction,
          [e.transaction.hash, ...a.map((d) => d.transaction.hash)]
        );
        for (const d of a)
          await this._deleteJob(d);
      }
    }
    return i;
  }
  //Validate a conflict job and merge it with its future edits (shared by prompt/resolve)
  async _prepare(e) {
    if (e.message === void 0)
      return null;
    const t = Object.keys(e.transaction.data)[0];
    return { newJob: await this._mergeWithFutureEditJobs(e, t), attribute: t };
  }
  //Prompt the user to force or revert the job
  async prompt(e) {
    var t;
    const s = await this._prepare(e);
    if (!s)
      return;
    const { newJob: r, attribute: a } = s, i = `There was a conflict.
The data got changed to "${r.message}".
Do you still want to perform your change to "${(t = r.transaction.data) == null ? void 0 : t[a].new}"?`;
    await this._apply(r, confirm(i));
  }
  //Resolve a conflict without prompting: execute the local change (force) or take the server value (revert)
  async resolve(e, t) {
    const s = await this._prepare(e);
    s && await this._apply(s.newJob, t);
  }
  //Apply a resolution to an already-merged conflict job
  async _apply(e, t) {
    let s = e;
    t ? (s = await this.force(s), await Z.queue.updateSyncStatus(s, k.Pending)) : (await this.revert(s), await Z.queue.updateSyncStatus(s, k.Completed)), Z.dispatchEvent("queue:conflict-resolved", s), Z.queue.notifier.resolved(s.id);
  }
  //Force the job
  async force(e) {
    var t, s;
    const r = Object.keys(e.transaction.data)[0], a = await this._getFutureJobs(e, r), i = {
      [r]: {
        prev: Nn(e.message, (t = e.transaction.data) == null ? void 0 : t[r].new),
        new: (s = e.transaction.data) == null ? void 0 : s[r].new
      }
    }, o = (/* @__PURE__ */ new Date()).getTime(), l = await this._updateJob({
      ...e,
      status: k.Pending,
      transaction: {
        ...e.transaction,
        data: i,
        blitzstamp: St(),
        hash: At({ ...i, blitzID: e.transaction.blitzID, timestamp: o })
      },
      dataHistory: [...e.dataHistory ?? [], { timestamp: o, type: "conflict-force", data: e.transaction.data }]
    });
    await Qe.create().run([
      new Fe({
        action: "edit",
        model: l.transaction.model,
        blitzID: l.transaction.blitzID,
        blitzstamp: l.transaction.blitzstamp,
        hash: l.transaction.hash,
        data: l.transaction.data
      })
    ]), await new rt().recordRewrittenTransaction(l.transaction, [e.transaction.hash]);
    for (const c of a)
      await this._updateJob({
        ...c,
        status: k.Pending
      });
    return l;
  }
  //Revert the job
  async revert(e) {
    var t, s;
    const r = Object.keys(e.transaction.data)[0], a = new Fe({
      action: "edit",
      model: e.transaction.model,
      blitzID: e.transaction.blitzID,
      data: {
        [r]: {
          prev: (t = e.transaction.data) == null ? void 0 : t[r].new,
          new: Nn(e.message, (s = e.transaction.data) == null ? void 0 : s[r].new)
        }
      }
    });
    await Qe.create().run([a]);
    const i = await this._getFutureJobs(e, r), o = await this._getCompletedReplicatedJobs(e);
    for (const l of [e, ...i])
      await this._deleteJob(l);
    if (o.length > 0) {
      const l = o.map((c) => c.url).filter((c, d, u) => u.findIndex((f) => f === c) === d);
      for (const c of l)
        await Z.queue.addJob(c, a.toObject());
    }
  }
}
const qt = {
  a: ["à", "á", "â", "ä"],
  c: ["ç"],
  e: ["è", "é", "ê"],
  o: ["ö", "ó", "ò", "ô", "õ"],
  oe: ["œ"],
  ss: ["ß"],
  u: ["ü"]
};
class Zt {
  constructor() {
    O(this, "children"), O(this, "isEndOfWord"), O(this, "items"), this.children = {}, this.isEndOfWord = !1, this.items = [];
  }
}
class Ka {
  /**
   * Constructor for the Trie.
   *
   * @param model The model to build the Trie for.
   * @param data The data to build the Trie from.
   */
  constructor(e, t) {
    if (O(this, "root"), this.root = new Zt(), !t)
      return;
    const s = this.getWordFrequency(e, t);
    for (const r in s)
      this.insert(r, s[r].items);
  }
  /**
   * Loads the Trie data structure from a JSON object.
   *
   * @param json The JSON object containing the data to load.
   * @param nod The TrieNode to load the data into.
   */
  _loadFromJson(e, t) {
    Object.keys(e).forEach((s) => {
      typeof e[s] == "string" || typeof e[s] == "boolean" || (t.children[s] || (t.children[s] = new Zt()), e[s].hasOwnProperty("isEndOfWord") && e[s].isEndOfWord && (t.children[s].isEndOfWord = !0, t.children[s].items = e[s].items), this._loadFromJson(e[s], t.children[s]));
    });
  }
  /**
   * Loads the Trie data structure from a JSON object.
   *
   * @param json - The JSON object representing the Trie data structure.
   *
   * @returns The Trie instance.
   */
  loadFromJson(e) {
    return this.root = new Zt(), this._loadFromJson(e, this.root), this;
  }
  toJson() {
    const e = (t) => {
      let s = {};
      for (const r in t.children)
        s[r] = e(t.children[r]);
      return t.isEndOfWord && (s.isEndOfWord = !0, s.items = t.items), s;
    };
    return e(this.root);
  }
  getWordFrequency(e, t) {
    const s = {}, r = e.getAttributes();
    return t.forEach((a) => {
      r == null || r.forEach((i) => {
        a[i] && a[i].toString().toLowerCase().split(" ").forEach((o) => {
          o !== "" && (s[o] ? s[o].items.push(a._blitzID) : s[o] = {
            items: [a._blitzID]
          });
        });
      });
    }), s;
  }
  getVariants(e) {
    const t = qt[e], s = [e];
    return t && s.push(...t), s;
  }
  generateAllPermutations(e, t, s, r, a) {
    if (t === s.length) {
      a.push(e);
      return;
    }
    const i = s[t], o = t !== s.length - 1 ? i + s[t + 1] : void 0;
    if (!qt[i] && !(o && qt[o])) {
      this.generateAllPermutations(
        e + i,
        t + 1,
        s,
        r,
        a
      );
      return;
    }
    if (qt[i]) {
      const l = r[i];
      for (const c of l)
        this.generateAllPermutations(
          e + c,
          t + 1,
          s,
          r,
          a
        );
    }
    if (o && qt[o]) {
      const l = r[o];
      for (const c of l)
        this.generateAllPermutations(
          e + c,
          t + 2,
          s,
          r,
          a
        );
    }
  }
  normalizeQuery(e) {
    const t = /u|e|a|o|c|ss|oe/g, s = e.toLowerCase().match(t);
    if (!s)
      return [e.toLowerCase()];
    const r = {};
    s.forEach((i) => {
      r[i] = this.getVariants(i);
    });
    const a = [];
    return this.generateAllPermutations("", 0, e, r, a), a;
  }
  insert(e, t) {
    let s = this.root;
    for (const r of e)
      s.children[r] || (s.children[r] = new Zt()), s = s.children[r];
    s.isEndOfWord = !0, s.items = t;
  }
  addToSet(e, t) {
    const s = this.normalizeQuery(e);
    for (const r of s)
      this._search(r).forEach((a) => {
        t.add(a);
      });
  }
  search(e) {
    const t = e == null ? void 0 : e.toLowerCase().split(" ");
    let s = /* @__PURE__ */ new Set();
    return this.addToSet(t[0], s), t.slice(1).forEach((r) => {
      const a = /* @__PURE__ */ new Set();
      this.addToSet(r, a);
      for (const i of s)
        a.has(i) || s.delete(i);
    }), Array.from(s);
  }
  _search(e) {
    let t = this.root;
    for (const r of e) {
      if (!t.children[r])
        return [];
      t = t.children[r];
    }
    const s = [];
    return e === "" ? this.collectWords(t, "", s) : this.collectWords(t, e, s), s;
  }
  collectWords(e, t, s) {
    e.isEndOfWord && s.push(...e.items);
    for (const r in e.children) {
      const a = e.children[r], i = t + r;
      this.collectWords(a, i, s);
    }
  }
}
class le {
  /**
   * Generates a new local storage key by provided key.
   *
   * @param key
   */
  static getKey(e) {
    return `BlitzData.${e}`;
  }
  /**
   * Returns a value from local storage for BlitzData.
   * @param key
   */
  static get(e) {
    return localStorage.getItem(this.getKey(e));
  }
  /**
   * Sets a new value in local storage for BlitzData.
   *
   * @param key
   * @param value
   */
  static set(e, t) {
    localStorage.setItem(this.getKey(e), t);
  }
  /**
   * Checks whether a key exists or not for BlitzData.
   *
   * @param key
   */
  static has(e) {
    return Object.hasOwn(localStorage, this.getKey(e));
  }
  /**
   * Removes an item from local storage for BlitzData.
   *
   * @param key
   */
  static remove(e) {
    localStorage.removeItem(this.getKey(e));
  }
  /**
   * Clears all the local storage items for BlitzData.
   */
  static clear() {
    const e = Object.keys(localStorage);
    for (const t of e)
      t.startsWith("BlitzData.") && localStorage.removeItem(t);
  }
  /**
   * Returns a stream's sync cursor: the composite (timestamp, logID)
   * position of the last applied change-log row for one
   * (model, cluster, stream) feed. logID is null when the server predates
   * the composite protocol.
   */
  static getSyncCursor(e, t, s) {
    const r = this.get(`sync.${e}.${t}.${s}.cursor`);
    if (!r)
      return null;
    try {
      const a = JSON.parse(r);
      if (typeof a == "number")
        return { timestamp: a, logID: null };
      if (a && typeof a.timestamp == "number")
        return { timestamp: a.timestamp, logID: typeof a.logID == "number" ? a.logID : null };
    } catch {
    }
    return null;
  }
  /**
   * Sets a stream's sync cursor.
   */
  static setSyncCursor(e, t, s, r) {
    this.set(`sync.${e}.${t}.${s}.cursor`, JSON.stringify(r));
  }
  /**
   * Whether the model has any sync cursor — i.e. it has been bootstrapped
   * and its local database is the source of truth.
   */
  static hasSyncCursors(e) {
    const t = this.getKey(`sync.${e}.`);
    return Object.keys(localStorage).some((s) => s.startsWith(t));
  }
  /**
   * Returns the wall-clock time (unix seconds) a model was last synced.
   */
  static getLastSyncRunAt(e) {
    const t = this.get(`sync.${e}.lastRunAt`);
    return t ? parseInt(t) : null;
  }
  /**
   * Sets the wall-clock time (unix seconds) a model was last synced.
   */
  static setLastSyncRunAt(e, t) {
    this.set(`sync.${t}.lastRunAt`, e.toString());
  }
  /**
   * Gets the current user.
   */
  static getCurrentUser() {
    const e = this.get("currentUser");
    return e ? JSON.parse(e) : null;
  }
  /**
   * Sets the current user.
   */
  static setCurrentUser(e) {
    e ? this.set("currentUser", JSON.stringify(e)) : this.remove("currentUser");
  }
  /**
   * Gets a project's users.
   */
  static getProjectUsers(e) {
    const t = this.get("projectUsers." + e);
    return t ? JSON.parse(t) : null;
  }
  /**
   * Sets a project's users.
   */
  static setProjectUsers(e, t) {
    const s = "projectUsers." + e;
    t ? this.set(s, JSON.stringify(t)) : this.remove(s);
  }
  /**
   * Returns the saved databases.
   */
  static getDatabases() {
    return JSON.parse(this.get("databases") ?? "[]");
  }
  /**
   * Sets the databases.
   *
   * @param databases
   */
  static setDatabases(e) {
    this.set("databases", JSON.stringify(e));
  }
  /**
   * @param hash
   */
  static getListCallLastTimeStamp(e) {
    const t = this.get(`cache.listCall.${e}.lastTimeStamp`);
    return t ? Number(t) : null;
  }
  /**
   * @param hash
   * @param timestamp
   */
  static setListCallLastTimeStamp(e, t) {
    this.set(`cache.listCall.${e}.lastTimeStamp`, String(t));
  }
}
const Er = {
  _blitzID: { type: "anonymous", label: "ID" },
  _userID: { type: "user", label: "User" },
  // a BlitzData epoch (seconds since 2021-01-01 UTC, see helpers.blitzstamp)
  // — its own type so UIs can present it as the creation date it is,
  // not the bare integer it is stored as
  _blitzstamp: { type: "blitzstamp", label: "Created" },
  _modified: { type: "datetime", label: "Modified" },
  _publishingdate: { type: "datetime", label: "Publishing date" },
  _expiration: { type: "datetime", label: "Expiration" }
}, Xa = "@me", ks = (n) => {
  var e;
  return n === Xa ? ((e = le.getCurrentUser()) == null ? void 0 : e.id) ?? n : n;
};
function Sr(n, e, t) {
  var s;
  let r = !0;
  for (const a of e) {
    if (!r)
      return !1;
    const [i, o, l] = a, c = (s = t == null ? void 0 : t[i]) == null ? void 0 : s.type;
    let d = n[i], u = l;
    switch (i === "_userID" && (u = Array.isArray(u) ? u.map(ks) : ks(u)), typeof d == "string" && (c === "datetime" || c === "date" || i === "_publishingdate") && (d = new Date(d).getTime()), typeof u == "string" && (c === "datetime" || c === "date" || i === "_publishingdate") && (u = new Date(u).getTime()), o) {
      case "LIKE":
        const f = `${u}`.startsWith("%"), m = `${u}`.endsWith("%"), h = `${u}`.replaceAll("%", "");
        f === m ? r = `${d}`.includes(h) : f ? r = `${d}`.endsWith(h) : m && (r = `${d}`.startsWith(h));
        break;
      case "IN":
        r = (Array.isArray(u) ? u : [u]).includes(d);
        break;
      case "=":
        r = d === u;
        break;
      case "!=":
        r = d !== u;
        break;
      case ">":
        r = d > u;
        break;
      case "<":
        r = d < u;
        break;
      case ">=":
        r = d >= u;
        break;
      case "<=":
        r = d <= u;
        break;
      default:
        r = !0;
        break;
    }
  }
  return r;
}
class Qa {
  /**
   * Constructor for the BDModelClient.
   */
  constructor(e) {
    O(this, "model"), this.model = e, this.ping();
  }
  /**
   * Initializes the database structure if not already created.
   */
  async ping() {
    (await this.connect()).close();
  }
  /**
   * This method fetches items based on the given model and conditions.
   *
   * @param query an array of conditions to filter the items
   * @param blitzIds Array of blitz id's to scope results to.
   *
   * @return a promise that resolves to an array of filtered items
   */
  async query(e, t) {
    const s = await this.connect(), r = s.transaction("objects", "readonly").store, a = Array.from(r.indexNames), i = e.customSort && a.includes(e.customSort) ? e.customSort : a.includes("_projectsort") && (e.conditions ?? []).find((f) => f[0] === "project_fk" && f[1] === "=") ? "_projectsort" : a.includes("_sort") ? "_sort" : "_blitzstamp", o = e.customSortDirection === "ASC" ? "next" : "prev", l = e.pagination !== void 0 ? o === "next" ? IDBKeyRange.lowerBound(e.pagination.toString(), !0) : IDBKeyRange.upperBound(e.pagination.toString(), !0) : null;
    let c = await r.index(i).openCursor(l, o);
    const d = this.model.getAttributesDetails() ?? void 0;
    let u = [];
    for (; c; ) {
      if (t && !t.includes(c.value.blitzID)) {
        c = await c.continue();
        continue;
      }
      if (Sr(c.value, e.conditions ?? [], d) && (u.push(c.value), e.limit && u.length >= e.limit))
        break;
      c = await c.continue();
    }
    if (s.close(), e.var && e.var.length > 0) {
      const f = ["_blitzID", "_localID", "@permissions", "_sort", "_clusters", "_editURLs", "_savetimestamp", ...e.var];
      for (const m of u)
        for (const h in m)
          f.includes(h) || delete m[h];
    }
    return u;
  }
  /**
   * A function that searches for a given query in a specified model.
   *
   * @param query the query string to search for
   * @param conditions filter conditions to be applied
   *
   * @return an array of blitzIDs that match the query
   */
  async search(e, t) {
    const s = await this.connect(), r = new Ka(this.model).loadFromJson(s.get("tree", this.model.getName()));
    s.close();
    const a = r.search(e);
    return e !== "" && a.length === 0 ? [] : this.query({ conditions: t }, a);
  }
  /**
   * Generates a tree by supplied data, then saves each item in the data to the database.
   *
   * @param objects list of native data in order to create the tree
   */
  async save(e, t = !1) {
    const s = await this.connect();
    for (const r of e) {
      let a = { ...r };
      const i = await s.get("objects", a._blitzID);
      if (i)
        a = { ...i, ...a };
      else if (t)
        continue;
      a._savetimestamp = St(), await s.put("objects", a);
    }
    s.close();
  }
  /**
   * Connects to the database
   *
   * @returns instance of the database connection
   */
  async connect() {
    var e, t;
    const s = this.model.getAttributesDetails(), r = ["1", !0].includes((e = this.model._attributes.hassort) == null ? void 0 : e.value), a = r && ["1", !0].includes((t = this.model._attributes.hasprojects) == null ? void 0 : t.value);
    return await Dt(this.model.getName(), 1, {
      upgrade: (i, o, l, c, d) => {
        const u = le.getDatabases();
        if (u.includes(i.name) || (u.push(i.name), le.setDatabases(u)), l !== 1)
          return;
        i.createObjectStore("tree", { keyPath: "name" });
        const f = i.createObjectStore("objects", { keyPath: "_blitzID" });
        if (s)
          for (const m in s)
            (s[m].type === "date" || m.includes("_fk")) && f.createIndex(m, m, { unique: !1 });
        f.createIndex("_blitzstamp", "_blitzstamp"), r && f.createIndex("_sort", "_sort"), a && f.createIndex("_projectsort", "_projectsort");
      }
    });
  }
  /**
   * Returns a single item from the database by supplied blitzID.
   */
  async find(e) {
    const t = await this.connect(), s = t.get("objects", e);
    return t.close(), s;
  }
  /**
   * Create new object in the database.
   *
   * @param object Object to be created.
   */
  async create(e) {
    const t = await this.connect();
    await t.put("objects", e), t.close();
  }
  /**
   * Update object in the database.
   *
   * @param attributes Object attributes to be updated.
   */
  async update(e) {
    const t = await this.connect();
    await t.put("objects", e), t.close();
  }
  /**
   * Removes every object of the model from the local database.
   */
  async clear() {
    const e = await this.connect();
    await e.clear("objects"), e.close();
  }
  /**
   * Delete object from the database.
   *
   * @param blitzID Blitz ID of the object to be deleted.
   */
  async delete(e) {
    const t = await this.connect();
    await t.delete("objects", e), t.close();
  }
  /**
   * Update Trie tree, this is needed when there is a change
   * that happened to the indexed db objects. Trie tree should
   * always be up to date with the indexed db items.
   */
  /*private async updateTree(): Promise<void> {
          // Connect to the database
          const database = await this.connect();
  
          // Get all items
          const items: Array<BDObjectRaw> = await database.getAll('objects');
  
          // Save tree to the database
          await database.put('tree', {
              name: this.model.getName(),
              tree: (new Trie(this.model, items)).toJson()
          });
  
          // Close connection
          database.close();
      }*/
}
class ts {
  /**
   * Set up the subject.
   */
  constructor() {
    O(this, "_subscribers"), O(this, "_cleanUp", () => {
    }), this._subscribers = /* @__PURE__ */ new Set();
  }
  /**
   * Emit a value to all subscribers.
   */
  emit(e) {
    for (const t of this._subscribers)
      t(e);
  }
  /**
   * Subscribe to value emissions.
   */
  subscribe(e) {
    if (typeof e != "function")
      throw new Error("Subscriber must be a function");
    return this._subscribers.add(e), () => {
      this._subscribers.delete(e), this._cleanUp();
    };
  }
  /**
   * Pipe with a filter function.
   * @returns New Subject that only emits values passing the filter.
   */
  filterPipe(e) {
    const t = new ts();
    return t._cleanUp = this.subscribe((s) => {
      e(s) && t.emit(s);
    }), t;
  }
}
const Mr = class Cr {
  /**
   * Constructor.
   */
  constructor(e) {
    O(this, "model"), this.model = e, Z.objects.has(this.model.getName()) || Z.objects.set(this.model.getName(), /* @__PURE__ */ new Map());
  }
  /**
   * Get model objects.
   */
  getAll() {
    return Z.objects.get(this.model.getName());
  }
  /**
   * Get object by blitzID.
   */
  get(e) {
    return this.getAll().get(e);
  }
  /**
   * Update object in memory.
   *
   * @param object Object to update.
   * @returns Final object in memory
   */
  update(e) {
    var t;
    const s = this.getAll();
    if (!s.has(e._blitzID.value))
      return s.set(e._blitzID.value, e), e;
    const r = s.get(e._blitzID.value), a = Object.keys(this.model.getAttributesDetails() ?? {}), i = Z.options.sync.live === !0;
    for (const o of a) {
      const l = (t = e[o]) == null ? void 0 : t._value;
      if (l !== void 0) {
        const c = r[o];
        c && (c._value = l, c._valueSignal.set(l, i));
      }
    }
    return r;
  }
  /**
   * Delete object from memory.
   *
   * @param blitzID blitzID of object to be deleted.
   */
  delete(e) {
    const t = this.getAll();
    t.has(e) && t.delete(e);
  }
  /**
   * Emit transaction to channel.
   *
   * @param transaction Transaction to be emitted.
   */
  emit(e) {
    Cr.channel.emit(e);
  }
  /**
   * Apply a sync-evaluated transaction to memory and notify live subscribers.
   *
   * The local database already holds the evaluated result, so edited values
   * are read back from it — one canonical write path, no duplicated
   * evaluation logic. Objects not in memory only emit to the channel.
   *
   * @param transaction Transaction already applied to the local database.
   * @param emitToChannel Emit to the list channel | The caller dedupes per object.
   */
  async applyTransaction(e, t = !0) {
    if (e.action === "delete") {
      const s = this.get(e.blitzID);
      this.delete(e.blitzID), s == null || s.dispatchEvent("delete", null);
    } else if (e.action === "edit") {
      const s = this.get(e.blitzID);
      if (s) {
        const r = await this.model.idbClient().find(e.blitzID);
        for (const a of Object.keys(e.data))
          r && s[a] && (s[a].value = r[a]);
        s.dispatchEvent("remoteChange", e.data);
      }
    }
    t && this.emit(e);
  }
  /**
   * Returns raw objects for the current model filtered by the given conditions and parameters.
   *
   * @param query Query parameters including array of conditions to filter the objects.
   * @return Promise with array of filtered raw objects.
   */
  async query(e = {}) {
    var t, s;
    const r = [], a = Array.from(this.getAll().values()).map((f) => f.toObject()), i = this.model.getAttributesDetails() ?? void 0, o = Object.keys(i ?? {}), l = ["1", !0].includes((t = this.model._attributes.hassort) == null ? void 0 : t.value), c = l && ["1", !0].includes((s = this.model._attributes.hasprojects) == null ? void 0 : s.value), d = e.customSort && o.includes(e.customSort) ? e.customSort : c && (e.conditions ?? []).find((f) => f[0] === "project_fk" && f[1] === "=") ? "_projectsort" : l ? "_sort" : "_blitzstamp", u = e.customSortDirection ?? "DESC";
    a.sort((f, m) => {
      try {
        const h = parseInt(f[d]), p = parseInt(m[d]);
        if (h < p)
          return u === "ASC" ? -1 : 1;
        if (h > p)
          return u === "ASC" ? 1 : -1;
      } catch {
      }
      return 0;
    });
    for (const f of a) {
      if (e.pagination !== void 0)
        try {
          const m = parseInt(f[d]);
          if (typeof m != "number" || (u === "ASC" ? e.pagination >= m : e.pagination <= m))
            continue;
        } catch {
        }
      if (Sr(f, e.conditions ?? [], i) && (r.push(f), e.limit && r.length >= e.limit))
        break;
    }
    if (e.var && e.var.length > 0) {
      const f = ["_blitzID", "_localID", "@permissions", "_sort", "_clusters", "_editURLs", "_savetimestamp", ...e.var];
      for (const m of r)
        for (const h in m)
          f.includes(h) || delete m[h];
    }
    return r;
  }
};
O(Mr, "channel", new ts());
let Ls = Mr, xr;
function Za(n) {
  xr = n;
}
function pt() {
  return xr;
}
function Bt(n, e) {
  const t = n.filter((o) => {
    var l;
    return o.transaction.action === he.Edit && (e === void 0 || ((l = o.transaction.data) == null ? void 0 : l[e]) !== void 0);
  });
  let s = k.Pending, r;
  const a = t.find((o) => o.status === k.Failed), i = t.find((o) => o.status === k.Conflict && o.message !== void 0) ?? t.find((o) => o.status === k.Conflict);
  return a ? (s = k.Failed, r = a) : i ? (s = k.Conflict, r = i) : t.every((o) => o.status === k.Completed) && (s = k.Completed), { status: s, job: r };
}
class It {
  /**
   * Set up the signal.
   */
  constructor(e) {
    O(this, "_value"), O(this, "_subscribers"), this._value = e, this._subscribers = /* @__PURE__ */ new Set();
  }
  /**
   * Get value.
   */
  get() {
    return this._value;
  }
  /**
   * Set new value.
   */
  set(e, t = !0) {
    this._value !== e && (this._value = e, t && this.emit());
  }
  /**
   * Emit the value to all subscribers.
   */
  emit() {
    for (const e of this._subscribers)
      e(this._value);
  }
  /**
   * Subscribe to value changes.
   */
  subscribe(e, t = !0) {
    if (typeof e != "function")
      throw new Error("Subscriber must be a function");
    return this._subscribers.add(e), t && e(this._value), () => this._subscribers.delete(e);
  }
}
class $e {
  /**
   * Constructs type with provided value.
   *
   * @param name Attribute name.
   * @param type Attribute type.
   * @param value Value to be used.
   */
  constructor(e, t, s) {
    O(this, "_object"), O(this, "_name"), O(this, "_type"), O(this, "_value"), O(this, "_valueSignal"), O(this, "_syncSignal"), this._name = e, this._type = t, this._value = this.unserialize(s), this._valueSignal = new It(this._value), this._syncSignal = new It(null);
  }
  /**
   * Returns value of the type.
   */
  get value() {
    return this._value;
  }
  /**
   * Sets value of the type.
   *
   * @param value Value to be set.
   */
  set value(e) {
    this._value = this.unserialize(e), this._valueSignal.set(this._value);
  }
  /**
   * Sets the value of the data type.
   */
  withValue(e) {
    return this.value = e, this;
  }
  /**
   * Sets the object of the data type.
   */
  withObject(e) {
    return this._object = e, this;
  }
  /**
   * Edits the attribute.
   */
  async edit(e, t) {
    if (!this._object)
      throw new Error("Can not edit attribute, object is not set.");
    return this._object.edit(this._name, e, t);
  }
  /**
   * Subscribe to changes in the value.
   *
   * @param fn Subscribe callback.
   * @returns Unsubscribe function.
   */
  subscribe(e, t = !0) {
    var s, r;
    const a = this._valueSignal.subscribe(e, t);
    return this._value === void 0 && ((r = (s = this._object) == null ? void 0 : s.model) == null || r.get({ blitzID: this._object._blitzID.value, forceHttp: !0 }).then((i) => {
      (i == null ? void 0 : i[this._name]._value) !== void 0 && this._valueSignal.emit();
    })), a;
  }
  /**
   * Subscribe to changes in the sync status.
   *
   * @param fn Subscribe callback.
   * @returns Unsubscribe function.
   */
  syncStatus(e) {
    var t;
    const s = this._syncSignal.get() !== null, r = this._syncSignal.subscribe(e, s);
    return s || pt().getJobsForObject((t = this._object) == null ? void 0 : t._blitzID.value).then((a) => {
      this._syncSignal.set(Bt(a, this._name), !1), e(this._syncSignal.get());
    }), r;
  }
  /**
   * Get attribute details from model.
   */
  getDetails() {
    var e, t;
    return ((t = (e = this._object) == null ? void 0 : e.model) == null ? void 0 : t.getAttributeDetails(this._name)) || null;
  }
}
class Ft extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    return e;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
}
class $r extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (typeof e == "boolean")
      return e;
    if (typeof e == "string" && ["0", "1"].includes(e))
      return e === "1";
    if (typeof e == "number" && [0, 1].includes(e))
      return e === 1;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return typeof this._value == "boolean" ? this._value ? "1" : "0" : this._value;
  }
}
const kr = 6048e5, Ga = 864e5, Gt = 43200, Ds = 1440, As = Symbol.for("constructDateFrom");
function ot(n, e) {
  return typeof n == "function" ? n(e) : n && typeof n == "object" && As in n ? n[As](e) : n instanceof Date ? new n.constructor(e) : new Date(e);
}
function Te(n, e) {
  return ot(e || n, n);
}
let ei = {};
function Yt() {
  return ei;
}
function Jt(n, e) {
  var t, s, r, a;
  const i = Yt(), o = (e == null ? void 0 : e.weekStartsOn) ?? ((s = (t = e == null ? void 0 : e.locale) == null ? void 0 : t.options) == null ? void 0 : s.weekStartsOn) ?? i.weekStartsOn ?? ((a = (r = i.locale) == null ? void 0 : r.options) == null ? void 0 : a.weekStartsOn) ?? 0, l = Te(n, e == null ? void 0 : e.in), c = l.getDay(), d = (c < o ? 7 : 0) + c - o;
  return l.setDate(l.getDate() - d), l.setHours(0, 0, 0, 0), l;
}
function fn(n, e) {
  return Jt(n, { ...e, weekStartsOn: 1 });
}
function Lr(n, e) {
  const t = Te(n, e == null ? void 0 : e.in), s = t.getFullYear(), r = ot(t, 0);
  r.setFullYear(s + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const a = fn(r), i = ot(t, 0);
  i.setFullYear(s, 0, 4), i.setHours(0, 0, 0, 0);
  const o = fn(i);
  return t.getTime() >= a.getTime() ? s + 1 : t.getTime() >= o.getTime() ? s : s - 1;
}
function hn(n) {
  const e = Te(n), t = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return t.setUTCFullYear(e.getFullYear()), +n - +t;
}
function En(n, ...e) {
  const t = ot.bind(
    null,
    n || e.find((s) => typeof s == "object")
  );
  return e.map(t);
}
function Is(n, e) {
  const t = Te(n, e == null ? void 0 : e.in);
  return t.setHours(0, 0, 0, 0), t;
}
function ti(n, e, t) {
  const [s, r] = En(
    t == null ? void 0 : t.in,
    n,
    e
  ), a = Is(s), i = Is(r), o = +a - hn(a), l = +i - hn(i);
  return Math.round((o - l) / Ga);
}
function ni(n, e) {
  const t = Lr(n, e), s = ot((e == null ? void 0 : e.in) || n, 0);
  return s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0), fn(s);
}
function rn(n, e) {
  const t = +Te(n) - +Te(e);
  return t < 0 ? -1 : t > 0 ? 1 : t;
}
function si(n) {
  return ot(n, Date.now());
}
function ri(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function ai(n) {
  return !(!ri(n) && typeof n != "number" || isNaN(+Te(n)));
}
function ii(n, e, t) {
  const [s, r] = En(
    t == null ? void 0 : t.in,
    n,
    e
  ), a = s.getFullYear() - r.getFullYear(), i = s.getMonth() - r.getMonth();
  return a * 12 + i;
}
function oi(n) {
  return (e) => {
    const t = (n ? Math[n] : Math.trunc)(e);
    return t === 0 ? 0 : t;
  };
}
function li(n, e) {
  return +Te(n) - +Te(e);
}
function ci(n, e) {
  const t = Te(n, e == null ? void 0 : e.in);
  return t.setHours(23, 59, 59, 999), t;
}
function ui(n, e) {
  const t = Te(n, e == null ? void 0 : e.in), s = t.getMonth();
  return t.setFullYear(t.getFullYear(), s + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function di(n, e) {
  const t = Te(n, e == null ? void 0 : e.in);
  return +ci(t, e) == +ui(t, e);
}
function fi(n, e, t) {
  const [s, r, a] = En(
    t == null ? void 0 : t.in,
    n,
    n,
    e
  ), i = rn(r, a), o = Math.abs(
    ii(r, a)
  );
  if (o < 1)
    return 0;
  r.getMonth() === 1 && r.getDate() > 27 && r.setDate(30), r.setMonth(r.getMonth() - i * o);
  let l = rn(r, a) === -i;
  di(s) && o === 1 && rn(s, a) === 1 && (l = !1);
  const c = i * (o - +l);
  return c === 0 ? 0 : c;
}
function hi(n, e, t) {
  const s = li(n, e) / 1e3;
  return oi(t == null ? void 0 : t.roundingMethod)(s);
}
function mi(n, e) {
  const t = Te(n, e == null ? void 0 : e.in);
  return t.setFullYear(t.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
const pi = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, yi = (n, e, t) => {
  let s;
  const r = pi[n];
  return typeof r == "string" ? s = r : e === 1 ? s = r.one : s = r.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + s : s + " ago" : s;
};
function it(n) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : n.defaultWidth;
    return n.formats[t] || n.formats[n.defaultWidth];
  };
}
const gi = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, vi = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, bi = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, wi = {
  date: it({
    formats: gi,
    defaultWidth: "full"
  }),
  time: it({
    formats: vi,
    defaultWidth: "full"
  }),
  dateTime: it({
    formats: bi,
    defaultWidth: "full"
  })
}, _i = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Ei = (n, e, t, s) => _i[n];
function Pe(n) {
  return (e, t) => {
    const s = t != null && t.context ? String(t.context) : "standalone";
    let r;
    if (s === "formatting" && n.formattingValues) {
      const i = n.defaultFormattingWidth || n.defaultWidth, o = t != null && t.width ? String(t.width) : i;
      r = n.formattingValues[o] || n.formattingValues[i];
    } else {
      const i = n.defaultWidth, o = t != null && t.width ? String(t.width) : n.defaultWidth;
      r = n.values[o] || n.values[i];
    }
    const a = n.argumentCallback ? n.argumentCallback(e) : e;
    return r[a];
  };
}
const Si = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Mi = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Ci = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, xi = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, $i = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, ki = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Li = (n, e) => {
  const t = Number(n), s = t % 100;
  if (s > 20 || s < 10)
    switch (s % 10) {
      case 1:
        return t + "st";
      case 2:
        return t + "nd";
      case 3:
        return t + "rd";
    }
  return t + "th";
}, Di = {
  ordinalNumber: Li,
  era: Pe({
    values: Si,
    defaultWidth: "wide"
  }),
  quarter: Pe({
    values: Mi,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: Pe({
    values: Ci,
    defaultWidth: "wide"
  }),
  day: Pe({
    values: xi,
    defaultWidth: "wide"
  }),
  dayPeriod: Pe({
    values: $i,
    defaultWidth: "wide",
    formattingValues: ki,
    defaultFormattingWidth: "wide"
  })
};
function Ne(n) {
  return (e, t = {}) => {
    const s = t.width, r = s && n.matchPatterns[s] || n.matchPatterns[n.defaultMatchWidth], a = e.match(r);
    if (!a)
      return null;
    const i = a[0], o = s && n.parsePatterns[s] || n.parsePatterns[n.defaultParseWidth], l = Array.isArray(o) ? Ii(o, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Ai(o, (u) => u.test(i))
    );
    let c;
    c = n.valueCallback ? n.valueCallback(l) : l, c = t.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      t.valueCallback(c)
    ) : c;
    const d = e.slice(i.length);
    return { value: c, rest: d };
  };
}
function Ai(n, e) {
  for (const t in n)
    if (Object.prototype.hasOwnProperty.call(n, t) && e(n[t]))
      return t;
}
function Ii(n, e) {
  for (let t = 0; t < n.length; t++)
    if (e(n[t]))
      return t;
}
function ns(n) {
  return (e, t = {}) => {
    const s = e.match(n.matchPattern);
    if (!s)
      return null;
    const r = s[0], a = e.match(n.parsePattern);
    if (!a)
      return null;
    let i = n.valueCallback ? n.valueCallback(a[0]) : a[0];
    i = t.valueCallback ? t.valueCallback(i) : i;
    const o = e.slice(r.length);
    return { value: i, rest: o };
  };
}
const ji = /^(\d+)(th|st|nd|rd)?/i, Ti = /\d+/i, Oi = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, zi = {
  any: [/^b/i, /^(a|c)/i]
}, Hi = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Pi = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ni = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, qi = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Ui = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Fi = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ri = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Wi = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Bi = {
  ordinalNumber: ns({
    matchPattern: ji,
    parsePattern: Ti,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: Ne({
    matchPatterns: Oi,
    defaultMatchWidth: "wide",
    parsePatterns: zi,
    defaultParseWidth: "any"
  }),
  quarter: Ne({
    matchPatterns: Hi,
    defaultMatchWidth: "wide",
    parsePatterns: Pi,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: Ne({
    matchPatterns: Ni,
    defaultMatchWidth: "wide",
    parsePatterns: qi,
    defaultParseWidth: "any"
  }),
  day: Ne({
    matchPatterns: Ui,
    defaultMatchWidth: "wide",
    parsePatterns: Fi,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ne({
    matchPatterns: Ri,
    defaultMatchWidth: "any",
    parsePatterns: Wi,
    defaultParseWidth: "any"
  })
}, jt = {
  code: "en-US",
  formatDistance: yi,
  formatLong: wi,
  formatRelative: Ei,
  localize: Di,
  match: Bi,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ji(n, e) {
  const t = Te(n, e == null ? void 0 : e.in);
  return ti(t, mi(t)) + 1;
}
function Vi(n, e) {
  const t = Te(n, e == null ? void 0 : e.in), s = +fn(t) - +ni(t);
  return Math.round(s / kr) + 1;
}
function Dr(n, e) {
  var t, s, r, a;
  const i = Te(n, e == null ? void 0 : e.in), o = i.getFullYear(), l = Yt(), c = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((s = (t = e == null ? void 0 : e.locale) == null ? void 0 : t.options) == null ? void 0 : s.firstWeekContainsDate) ?? l.firstWeekContainsDate ?? ((a = (r = l.locale) == null ? void 0 : r.options) == null ? void 0 : a.firstWeekContainsDate) ?? 1, d = ot((e == null ? void 0 : e.in) || n, 0);
  d.setFullYear(o + 1, 0, c), d.setHours(0, 0, 0, 0);
  const u = Jt(d, e), f = ot((e == null ? void 0 : e.in) || n, 0);
  f.setFullYear(o, 0, c), f.setHours(0, 0, 0, 0);
  const m = Jt(f, e);
  return +i >= +u ? o + 1 : +i >= +m ? o : o - 1;
}
function Yi(n, e) {
  var t, s, r, a;
  const i = Yt(), o = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((s = (t = e == null ? void 0 : e.locale) == null ? void 0 : t.options) == null ? void 0 : s.firstWeekContainsDate) ?? i.firstWeekContainsDate ?? ((a = (r = i.locale) == null ? void 0 : r.options) == null ? void 0 : a.firstWeekContainsDate) ?? 1, l = Dr(n, e), c = ot((e == null ? void 0 : e.in) || n, 0);
  return c.setFullYear(l, 0, o), c.setHours(0, 0, 0, 0), Jt(c, e);
}
function Ki(n, e) {
  const t = Te(n, e == null ? void 0 : e.in), s = +Jt(t, e) - +Yi(t, e);
  return Math.round(s / kr) + 1;
}
function ye(n, e) {
  const t = n < 0 ? "-" : "", s = Math.abs(n).toString().padStart(e, "0");
  return t + s;
}
const ht = {
  // Year
  y(n, e) {
    const t = n.getFullYear(), s = t > 0 ? t : 1 - t;
    return ye(e === "yy" ? s % 100 : s, e.length);
  },
  // Month
  M(n, e) {
    const t = n.getMonth();
    return e === "M" ? String(t + 1) : ye(t + 1, 2);
  },
  // Day of the month
  d(n, e) {
    return ye(n.getDate(), e.length);
  },
  // AM or PM
  a(n, e) {
    const t = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.toUpperCase();
      case "aaa":
        return t;
      case "aaaaa":
        return t[0];
      case "aaaa":
      default:
        return t === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(n, e) {
    return ye(n.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(n, e) {
    return ye(n.getHours(), e.length);
  },
  // Minute
  m(n, e) {
    return ye(n.getMinutes(), e.length);
  },
  // Second
  s(n, e) {
    return ye(n.getSeconds(), e.length);
  },
  // Fraction of second
  S(n, e) {
    const t = e.length, s = n.getMilliseconds(), r = Math.trunc(
      s * Math.pow(10, t - 3)
    );
    return ye(r, e.length);
  }
}, xt = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, js = {
  // Era
  G: function(n, e, t) {
    const s = n.getFullYear() > 0 ? 1 : 0;
    switch (e) {
      case "G":
      case "GG":
      case "GGG":
        return t.era(s, { width: "abbreviated" });
      case "GGGGG":
        return t.era(s, { width: "narrow" });
      case "GGGG":
      default:
        return t.era(s, { width: "wide" });
    }
  },
  // Year
  y: function(n, e, t) {
    if (e === "yo") {
      const s = n.getFullYear(), r = s > 0 ? s : 1 - s;
      return t.ordinalNumber(r, { unit: "year" });
    }
    return ht.y(n, e);
  },
  // Local week-numbering year
  Y: function(n, e, t, s) {
    const r = Dr(n, s), a = r > 0 ? r : 1 - r;
    if (e === "YY") {
      const i = a % 100;
      return ye(i, 2);
    }
    return e === "Yo" ? t.ordinalNumber(a, { unit: "year" }) : ye(a, e.length);
  },
  // ISO week-numbering year
  R: function(n, e) {
    const t = Lr(n);
    return ye(t, e.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(n, e) {
    const t = n.getFullYear();
    return ye(t, e.length);
  },
  // Quarter
  Q: function(n, e, t) {
    const s = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(s);
      case "QQ":
        return ye(s, 2);
      case "Qo":
        return t.ordinalNumber(s, { unit: "quarter" });
      case "QQQ":
        return t.quarter(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return t.quarter(s, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return t.quarter(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(n, e, t) {
    const s = Math.ceil((n.getMonth() + 1) / 3);
    switch (e) {
      case "q":
        return String(s);
      case "qq":
        return ye(s, 2);
      case "qo":
        return t.ordinalNumber(s, { unit: "quarter" });
      case "qqq":
        return t.quarter(s, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return t.quarter(s, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return t.quarter(s, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(n, e, t) {
    const s = n.getMonth();
    switch (e) {
      case "M":
      case "MM":
        return ht.M(n, e);
      case "Mo":
        return t.ordinalNumber(s + 1, { unit: "month" });
      case "MMM":
        return t.month(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return t.month(s, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return t.month(s, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(n, e, t) {
    const s = n.getMonth();
    switch (e) {
      case "L":
        return String(s + 1);
      case "LL":
        return ye(s + 1, 2);
      case "Lo":
        return t.ordinalNumber(s + 1, { unit: "month" });
      case "LLL":
        return t.month(s, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return t.month(s, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return t.month(s, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(n, e, t, s) {
    const r = Ki(n, s);
    return e === "wo" ? t.ordinalNumber(r, { unit: "week" }) : ye(r, e.length);
  },
  // ISO week of year
  I: function(n, e, t) {
    const s = Vi(n);
    return e === "Io" ? t.ordinalNumber(s, { unit: "week" }) : ye(s, e.length);
  },
  // Day of the month
  d: function(n, e, t) {
    return e === "do" ? t.ordinalNumber(n.getDate(), { unit: "date" }) : ht.d(n, e);
  },
  // Day of year
  D: function(n, e, t) {
    const s = Ji(n);
    return e === "Do" ? t.ordinalNumber(s, { unit: "dayOfYear" }) : ye(s, e.length);
  },
  // Day of week
  E: function(n, e, t) {
    const s = n.getDay();
    switch (e) {
      case "E":
      case "EE":
      case "EEE":
        return t.day(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return t.day(s, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return t.day(s, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return t.day(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(n, e, t, s) {
    const r = n.getDay(), a = (r - s.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "e":
        return String(a);
      case "ee":
        return ye(a, 2);
      case "eo":
        return t.ordinalNumber(a, { unit: "day" });
      case "eee":
        return t.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return t.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return t.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return t.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(n, e, t, s) {
    const r = n.getDay(), a = (r - s.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "c":
        return String(a);
      case "cc":
        return ye(a, e.length);
      case "co":
        return t.ordinalNumber(a, { unit: "day" });
      case "ccc":
        return t.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return t.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return t.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return t.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(n, e, t) {
    const s = n.getDay(), r = s === 0 ? 7 : s;
    switch (e) {
      case "i":
        return String(r);
      case "ii":
        return ye(r, e.length);
      case "io":
        return t.ordinalNumber(r, { unit: "day" });
      case "iii":
        return t.day(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return t.day(s, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return t.day(s, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return t.day(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(n, e, t) {
    const s = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return t.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return t.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return t.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(n, e, t) {
    const s = n.getHours();
    let r;
    switch (s === 12 ? r = xt.noon : s === 0 ? r = xt.midnight : r = s / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(n, e, t) {
    const s = n.getHours();
    let r;
    switch (s >= 17 ? r = xt.evening : s >= 12 ? r = xt.afternoon : s >= 4 ? r = xt.morning : r = xt.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(n, e, t) {
    if (e === "ho") {
      let s = n.getHours() % 12;
      return s === 0 && (s = 12), t.ordinalNumber(s, { unit: "hour" });
    }
    return ht.h(n, e);
  },
  // Hour [0-23]
  H: function(n, e, t) {
    return e === "Ho" ? t.ordinalNumber(n.getHours(), { unit: "hour" }) : ht.H(n, e);
  },
  // Hour [0-11]
  K: function(n, e, t) {
    const s = n.getHours() % 12;
    return e === "Ko" ? t.ordinalNumber(s, { unit: "hour" }) : ye(s, e.length);
  },
  // Hour [1-24]
  k: function(n, e, t) {
    let s = n.getHours();
    return s === 0 && (s = 24), e === "ko" ? t.ordinalNumber(s, { unit: "hour" }) : ye(s, e.length);
  },
  // Minute
  m: function(n, e, t) {
    return e === "mo" ? t.ordinalNumber(n.getMinutes(), { unit: "minute" }) : ht.m(n, e);
  },
  // Second
  s: function(n, e, t) {
    return e === "so" ? t.ordinalNumber(n.getSeconds(), { unit: "second" }) : ht.s(n, e);
  },
  // Fraction of second
  S: function(n, e) {
    return ht.S(n, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, e, t) {
    const s = n.getTimezoneOffset();
    if (s === 0)
      return "Z";
    switch (e) {
      case "X":
        return Os(s);
      case "XXXX":
      case "XX":
        return _t(s);
      case "XXXXX":
      case "XXX":
      default:
        return _t(s, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(n, e, t) {
    const s = n.getTimezoneOffset();
    switch (e) {
      case "x":
        return Os(s);
      case "xxxx":
      case "xx":
        return _t(s);
      case "xxxxx":
      case "xxx":
      default:
        return _t(s, ":");
    }
  },
  // Timezone (GMT)
  O: function(n, e, t) {
    const s = n.getTimezoneOffset();
    switch (e) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Ts(s, ":");
      case "OOOO":
      default:
        return "GMT" + _t(s, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(n, e, t) {
    const s = n.getTimezoneOffset();
    switch (e) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Ts(s, ":");
      case "zzzz":
      default:
        return "GMT" + _t(s, ":");
    }
  },
  // Seconds timestamp
  t: function(n, e, t) {
    const s = Math.trunc(+n / 1e3);
    return ye(s, e.length);
  },
  // Milliseconds timestamp
  T: function(n, e, t) {
    return ye(+n, e.length);
  }
};
function Ts(n, e = "") {
  const t = n > 0 ? "-" : "+", s = Math.abs(n), r = Math.trunc(s / 60), a = s % 60;
  return a === 0 ? t + String(r) : t + String(r) + e + ye(a, 2);
}
function Os(n, e) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + ye(Math.abs(n) / 60, 2) : _t(n, e);
}
function _t(n, e = "") {
  const t = n > 0 ? "-" : "+", s = Math.abs(n), r = ye(Math.trunc(s / 60), 2), a = ye(s % 60, 2);
  return t + r + e + a;
}
const zs = (n, e) => {
  switch (n) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, Ar = (n, e) => {
  switch (n) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, Xi = (n, e) => {
  const t = n.match(/(P+)(p+)?/) || [], s = t[1], r = t[2];
  if (!r)
    return zs(n, e);
  let a;
  switch (s) {
    case "P":
      a = e.dateTime({ width: "short" });
      break;
    case "PP":
      a = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      a = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      a = e.dateTime({ width: "full" });
      break;
  }
  return a.replace("{{date}}", zs(s, e)).replace("{{time}}", Ar(r, e));
}, Qi = {
  p: Ar,
  P: Xi
}, Zi = /^D+$/, Gi = /^Y+$/, eo = ["D", "DD", "YY", "YYYY"];
function to(n) {
  return Zi.test(n);
}
function no(n) {
  return Gi.test(n);
}
function so(n, e, t) {
  const s = ro(n, e, t);
  if (console.warn(s), eo.includes(n))
    throw new RangeError(s);
}
function ro(n, e, t) {
  const s = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${e}\`) for formatting ${s} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const ao = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, io = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, oo = /^'([^]*?)'?$/, lo = /''/g, co = /[a-zA-Z]/;
function Ir(n, e, t) {
  var s, r, a, i, o, l, c, d;
  const u = Yt(), f = (t == null ? void 0 : t.locale) ?? u.locale ?? jt, m = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((r = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : r.firstWeekContainsDate) ?? u.firstWeekContainsDate ?? ((i = (a = u.locale) == null ? void 0 : a.options) == null ? void 0 : i.firstWeekContainsDate) ?? 1, h = (t == null ? void 0 : t.weekStartsOn) ?? ((l = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : l.weekStartsOn) ?? u.weekStartsOn ?? ((d = (c = u.locale) == null ? void 0 : c.options) == null ? void 0 : d.weekStartsOn) ?? 0, p = Te(n, t == null ? void 0 : t.in);
  if (!ai(p))
    throw new RangeError("Invalid time value");
  let y = e.match(io).map((g) => {
    const w = g[0];
    if (w === "p" || w === "P") {
      const S = Qi[w];
      return S(g, f.formatLong);
    }
    return g;
  }).join("").match(ao).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const w = g[0];
    if (w === "'")
      return { isToken: !1, value: uo(g) };
    if (js[w])
      return { isToken: !0, value: g };
    if (w.match(co))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + w + "`"
      );
    return { isToken: !1, value: g };
  });
  f.localize.preprocessor && (y = f.localize.preprocessor(p, y));
  const v = {
    firstWeekContainsDate: m,
    weekStartsOn: h,
    locale: f
  };
  return y.map((g) => {
    if (!g.isToken)
      return g.value;
    const w = g.value;
    (!(t != null && t.useAdditionalWeekYearTokens) && no(w) || !(t != null && t.useAdditionalDayOfYearTokens) && to(w)) && so(w, e, String(n));
    const S = js[w[0]];
    return S(p, w, f.localize, v);
  }).join("");
}
function uo(n) {
  const e = n.match(oo);
  return e ? e[1].replace(lo, "'") : n;
}
function fo(n, e, t) {
  const s = Yt(), r = (t == null ? void 0 : t.locale) ?? s.locale ?? jt, a = 2520, i = rn(n, e);
  if (isNaN(i))
    throw new RangeError("Invalid time value");
  const o = Object.assign({}, t, {
    addSuffix: t == null ? void 0 : t.addSuffix,
    comparison: i
  }), [l, c] = En(
    t == null ? void 0 : t.in,
    ...i > 0 ? [e, n] : [n, e]
  ), d = hi(c, l), u = (hn(c) - hn(l)) / 1e3, f = Math.round((d - u) / 60);
  let m;
  if (f < 2)
    return t != null && t.includeSeconds ? d < 5 ? r.formatDistance("lessThanXSeconds", 5, o) : d < 10 ? r.formatDistance("lessThanXSeconds", 10, o) : d < 20 ? r.formatDistance("lessThanXSeconds", 20, o) : d < 40 ? r.formatDistance("halfAMinute", 0, o) : d < 60 ? r.formatDistance("lessThanXMinutes", 1, o) : r.formatDistance("xMinutes", 1, o) : f === 0 ? r.formatDistance("lessThanXMinutes", 1, o) : r.formatDistance("xMinutes", f, o);
  if (f < 45)
    return r.formatDistance("xMinutes", f, o);
  if (f < 90)
    return r.formatDistance("aboutXHours", 1, o);
  if (f < Ds) {
    const h = Math.round(f / 60);
    return r.formatDistance("aboutXHours", h, o);
  } else {
    if (f < a)
      return r.formatDistance("xDays", 1, o);
    if (f < Gt) {
      const h = Math.round(f / Ds);
      return r.formatDistance("xDays", h, o);
    } else if (f < Gt * 2)
      return m = Math.round(f / Gt), r.formatDistance("aboutXMonths", m, o);
  }
  if (m = fi(c, l), m < 12) {
    const h = Math.round(f / Gt);
    return r.formatDistance("xMonths", h, o);
  } else {
    const h = m % 12, p = Math.trunc(m / 12);
    return h < 3 ? r.formatDistance("aboutXYears", p, o) : h < 9 ? r.formatDistance("overXYears", p, o) : r.formatDistance("almostXYears", p + 1, o);
  }
}
function jr(n, e) {
  return fo(n, si(n), e);
}
const Hs = {
  lessThanXSeconds: {
    standalone: {
      one: "weniger als 1 Sekunde",
      other: "weniger als {{count}} Sekunden"
    },
    withPreposition: {
      one: "weniger als 1 Sekunde",
      other: "weniger als {{count}} Sekunden"
    }
  },
  xSeconds: {
    standalone: {
      one: "1 Sekunde",
      other: "{{count}} Sekunden"
    },
    withPreposition: {
      one: "1 Sekunde",
      other: "{{count}} Sekunden"
    }
  },
  halfAMinute: {
    standalone: "eine halbe Minute",
    withPreposition: "einer halben Minute"
  },
  lessThanXMinutes: {
    standalone: {
      one: "weniger als 1 Minute",
      other: "weniger als {{count}} Minuten"
    },
    withPreposition: {
      one: "weniger als 1 Minute",
      other: "weniger als {{count}} Minuten"
    }
  },
  xMinutes: {
    standalone: {
      one: "1 Minute",
      other: "{{count}} Minuten"
    },
    withPreposition: {
      one: "1 Minute",
      other: "{{count}} Minuten"
    }
  },
  aboutXHours: {
    standalone: {
      one: "etwa 1 Stunde",
      other: "etwa {{count}} Stunden"
    },
    withPreposition: {
      one: "etwa 1 Stunde",
      other: "etwa {{count}} Stunden"
    }
  },
  xHours: {
    standalone: {
      one: "1 Stunde",
      other: "{{count}} Stunden"
    },
    withPreposition: {
      one: "1 Stunde",
      other: "{{count}} Stunden"
    }
  },
  xDays: {
    standalone: {
      one: "1 Tag",
      other: "{{count}} Tage"
    },
    withPreposition: {
      one: "1 Tag",
      other: "{{count}} Tagen"
    }
  },
  aboutXWeeks: {
    standalone: {
      one: "etwa 1 Woche",
      other: "etwa {{count}} Wochen"
    },
    withPreposition: {
      one: "etwa 1 Woche",
      other: "etwa {{count}} Wochen"
    }
  },
  xWeeks: {
    standalone: {
      one: "1 Woche",
      other: "{{count}} Wochen"
    },
    withPreposition: {
      one: "1 Woche",
      other: "{{count}} Wochen"
    }
  },
  aboutXMonths: {
    standalone: {
      one: "etwa 1 Monat",
      other: "etwa {{count}} Monate"
    },
    withPreposition: {
      one: "etwa 1 Monat",
      other: "etwa {{count}} Monaten"
    }
  },
  xMonths: {
    standalone: {
      one: "1 Monat",
      other: "{{count}} Monate"
    },
    withPreposition: {
      one: "1 Monat",
      other: "{{count}} Monaten"
    }
  },
  aboutXYears: {
    standalone: {
      one: "etwa 1 Jahr",
      other: "etwa {{count}} Jahre"
    },
    withPreposition: {
      one: "etwa 1 Jahr",
      other: "etwa {{count}} Jahren"
    }
  },
  xYears: {
    standalone: {
      one: "1 Jahr",
      other: "{{count}} Jahre"
    },
    withPreposition: {
      one: "1 Jahr",
      other: "{{count}} Jahren"
    }
  },
  overXYears: {
    standalone: {
      one: "mehr als 1 Jahr",
      other: "mehr als {{count}} Jahre"
    },
    withPreposition: {
      one: "mehr als 1 Jahr",
      other: "mehr als {{count}} Jahren"
    }
  },
  almostXYears: {
    standalone: {
      one: "fast 1 Jahr",
      other: "fast {{count}} Jahre"
    },
    withPreposition: {
      one: "fast 1 Jahr",
      other: "fast {{count}} Jahren"
    }
  }
}, ho = (n, e, t) => {
  let s;
  const r = t != null && t.addSuffix ? Hs[n].withPreposition : Hs[n].standalone;
  return typeof r == "string" ? s = r : e === 1 ? s = r.one : s = r.other.replace("{{count}}", String(e)), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + s : "vor " + s : s;
}, mo = {
  full: "EEEE, do MMMM y",
  // Montag, 7. Januar 2018
  long: "do MMMM y",
  // 7. Januar 2018
  medium: "do MMM y",
  // 7. Jan. 2018
  short: "dd.MM.y"
  // 07.01.2018
}, po = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, yo = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
}, go = {
  date: it({
    formats: mo,
    defaultWidth: "full"
  }),
  time: it({
    formats: po,
    defaultWidth: "full"
  }),
  dateTime: it({
    formats: yo,
    defaultWidth: "full"
  })
}, vo = {
  lastWeek: "'letzten' eeee 'um' p",
  yesterday: "'gestern um' p",
  today: "'heute um' p",
  tomorrow: "'morgen um' p",
  nextWeek: "eeee 'um' p",
  other: "P"
}, bo = (n, e, t, s) => vo[n], wo = {
  narrow: ["v.Chr.", "n.Chr."],
  abbreviated: ["v.Chr.", "n.Chr."],
  wide: ["vor Christus", "nach Christus"]
}, _o = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1. Quartal", "2. Quartal", "3. Quartal", "4. Quartal"]
}, qn = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez"
  ],
  wide: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ]
}, Eo = {
  narrow: qn.narrow,
  abbreviated: [
    "Jan.",
    "Feb.",
    "März",
    "Apr.",
    "Mai",
    "Juni",
    "Juli",
    "Aug.",
    "Sep.",
    "Okt.",
    "Nov.",
    "Dez."
  ],
  wide: qn.wide
}, So = {
  narrow: ["S", "M", "D", "M", "D", "F", "S"],
  short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  abbreviated: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
  wide: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
  ]
}, Mo = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachm.",
    evening: "Abend",
    night: "Nacht"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "Morgen",
    afternoon: "Nachmittag",
    evening: "Abend",
    night: "Nacht"
  }
}, Co = {
  narrow: {
    am: "vm.",
    pm: "nm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachm.",
    evening: "abends",
    night: "nachts"
  },
  abbreviated: {
    am: "vorm.",
    pm: "nachm.",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  },
  wide: {
    am: "vormittags",
    pm: "nachmittags",
    midnight: "Mitternacht",
    noon: "Mittag",
    morning: "morgens",
    afternoon: "nachmittags",
    evening: "abends",
    night: "nachts"
  }
}, xo = (n) => Number(n) + ".", $o = {
  ordinalNumber: xo,
  era: Pe({
    values: wo,
    defaultWidth: "wide"
  }),
  quarter: Pe({
    values: _o,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: Pe({
    values: qn,
    formattingValues: Eo,
    defaultWidth: "wide"
  }),
  day: Pe({
    values: So,
    defaultWidth: "wide"
  }),
  dayPeriod: Pe({
    values: Mo,
    defaultWidth: "wide",
    formattingValues: Co,
    defaultFormattingWidth: "wide"
  })
}, ko = /^(\d+)(\.)?/i, Lo = /\d+/i, Do = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
}, Ao = {
  any: [/^v/i, /^n/i]
}, Io = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
}, jo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, To = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
  wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
}, Oo = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^j[aä]/i,
    /^f/i,
    /^mär/i,
    /^ap/i,
    /^mai/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, zo = {
  narrow: /^[smdmf]/i,
  short: /^(so|mo|di|mi|do|fr|sa)/i,
  abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
  wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
}, Ho = {
  any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
}, Po = {
  narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
}, No = {
  any: {
    am: /^v/i,
    pm: /^n/i,
    midnight: /^Mitte/i,
    noon: /^Mitta/i,
    morning: /morgens/i,
    afternoon: /nachmittags/i,
    // will never be matched. Afternoon is matched by `pm`
    evening: /abends/i,
    night: /nachts/i
    // will never be matched. Night is matched by `pm`
  }
}, qo = {
  ordinalNumber: ns({
    matchPattern: ko,
    parsePattern: Lo,
    valueCallback: (n) => parseInt(n)
  }),
  era: Ne({
    matchPatterns: Do,
    defaultMatchWidth: "wide",
    parsePatterns: Ao,
    defaultParseWidth: "any"
  }),
  quarter: Ne({
    matchPatterns: Io,
    defaultMatchWidth: "wide",
    parsePatterns: jo,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: Ne({
    matchPatterns: To,
    defaultMatchWidth: "wide",
    parsePatterns: Oo,
    defaultParseWidth: "any"
  }),
  day: Ne({
    matchPatterns: zo,
    defaultMatchWidth: "wide",
    parsePatterns: Ho,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ne({
    matchPatterns: Po,
    defaultMatchWidth: "wide",
    parsePatterns: No,
    defaultParseWidth: "any"
  })
}, mn = {
  code: "de",
  formatDistance: ho,
  formatLong: go,
  formatRelative: bo,
  localize: $o,
  match: qo,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
}, Uo = {
  lessThanXSeconds: {
    one: "moins d’une seconde",
    other: "moins de {{count}} secondes"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} secondes"
  },
  halfAMinute: "30 secondes",
  lessThanXMinutes: {
    one: "moins d’une minute",
    other: "moins de {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "environ 1 heure",
    other: "environ {{count}} heures"
  },
  xHours: {
    one: "1 heure",
    other: "{{count}} heures"
  },
  xDays: {
    one: "1 jour",
    other: "{{count}} jours"
  },
  aboutXWeeks: {
    one: "environ 1 semaine",
    other: "environ {{count}} semaines"
  },
  xWeeks: {
    one: "1 semaine",
    other: "{{count}} semaines"
  },
  aboutXMonths: {
    one: "environ 1 mois",
    other: "environ {{count}} mois"
  },
  xMonths: {
    one: "1 mois",
    other: "{{count}} mois"
  },
  aboutXYears: {
    one: "environ 1 an",
    other: "environ {{count}} ans"
  },
  xYears: {
    one: "1 an",
    other: "{{count}} ans"
  },
  overXYears: {
    one: "plus d’un an",
    other: "plus de {{count}} ans"
  },
  almostXYears: {
    one: "presqu’un an",
    other: "presque {{count}} ans"
  }
}, Fo = (n, e, t) => {
  let s;
  const r = Uo[n];
  return typeof r == "string" ? s = r : e === 1 ? s = r.one : s = r.other.replace("{{count}}", String(e)), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "dans " + s : "il y a " + s : s;
}, Ro = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, Wo = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Bo = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Jo = {
  date: it({
    formats: Ro,
    defaultWidth: "full"
  }),
  time: it({
    formats: Wo,
    defaultWidth: "full"
  }),
  dateTime: it({
    formats: Bo,
    defaultWidth: "full"
  })
}, Vo = {
  lastWeek: "eeee 'dernier à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p'",
  nextWeek: "eeee 'prochain à' p",
  other: "P"
}, Yo = (n, e, t, s) => Vo[n], Ko = {
  narrow: ["av. J.-C", "ap. J.-C"],
  abbreviated: ["av. J.-C", "ap. J.-C"],
  wide: ["avant Jésus-Christ", "après Jésus-Christ"]
}, Xo = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1er trim.", "2ème trim.", "3ème trim.", "4ème trim."],
  wide: ["1er trimestre", "2ème trimestre", "3ème trimestre", "4ème trimestre"]
}, Qo = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc."
  ],
  wide: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre"
  ]
}, Zo = {
  narrow: ["D", "L", "M", "M", "J", "V", "S"],
  short: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  abbreviated: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  wide: [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi"
  ]
}, Go = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "mat.",
    afternoon: "ap.m.",
    evening: "soir",
    night: "mat."
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "matin",
    afternoon: "après-midi",
    evening: "soir",
    night: "matin"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "du matin",
    afternoon: "de l’après-midi",
    evening: "du soir",
    night: "du matin"
  }
}, el = (n, e) => {
  const t = Number(n), s = e == null ? void 0 : e.unit;
  if (t === 0)
    return "0";
  const r = ["year", "week", "hour", "minute", "second"];
  let a;
  return t === 1 ? a = s && r.includes(s) ? "ère" : "er" : a = "ème", t + a;
}, tl = ["MMM", "MMMM"], nl = {
  preprocessor: (n, e) => n.getDate() === 1 || !e.some(
    (t) => t.isToken && tl.includes(t.value)
  ) ? e : e.map(
    (t) => t.isToken && t.value === "do" ? { isToken: !0, value: "d" } : t
  ),
  ordinalNumber: el,
  era: Pe({
    values: Ko,
    defaultWidth: "wide"
  }),
  quarter: Pe({
    values: Xo,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: Pe({
    values: Qo,
    defaultWidth: "wide"
  }),
  day: Pe({
    values: Zo,
    defaultWidth: "wide"
  }),
  dayPeriod: Pe({
    values: Go,
    defaultWidth: "wide"
  })
}, sl = /^(\d+)(ième|ère|ème|er|e)?/i, rl = /\d+/i, al = {
  narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
  abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(avant Jésus-Christ|après Jésus-Christ)/i
}, il = {
  any: [/^av/i, /^ap/i]
}, ol = {
  narrow: /^T?[1234]/i,
  abbreviated: /^[1234](er|ème|e)? trim\.?/i,
  wide: /^[1234](er|ème|e)? trimestre/i
}, ll = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, cl = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
  wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i
}, ul = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^av/i,
    /^ma/i,
    /^juin/i,
    /^juil/i,
    /^ao/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, dl = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|lu|ma|me|je|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
  wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
}, fl = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i]
}, hl = {
  narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
  any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i
}, ml = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^min/i,
    noon: /^mid/i,
    morning: /mat/i,
    afternoon: /ap/i,
    evening: /soir/i,
    night: /nuit/i
  }
}, pl = {
  ordinalNumber: ns({
    matchPattern: sl,
    parsePattern: rl,
    valueCallback: (n) => parseInt(n)
  }),
  era: Ne({
    matchPatterns: al,
    defaultMatchWidth: "wide",
    parsePatterns: il,
    defaultParseWidth: "any"
  }),
  quarter: Ne({
    matchPatterns: ol,
    defaultMatchWidth: "wide",
    parsePatterns: ll,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: Ne({
    matchPatterns: cl,
    defaultMatchWidth: "wide",
    parsePatterns: ul,
    defaultParseWidth: "any"
  }),
  day: Ne({
    matchPatterns: dl,
    defaultMatchWidth: "wide",
    parsePatterns: fl,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ne({
    matchPatterns: hl,
    defaultMatchWidth: "any",
    parsePatterns: ml,
    defaultParseWidth: "any"
  })
}, pn = {
  code: "fr",
  formatDistance: Fo,
  formatLong: Jo,
  formatRelative: Yo,
  localize: nl,
  match: pl,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
}, yl = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
class gl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e === "0000-00-00")
      return null;
    const t = e instanceof Date ? this.toDateString(e) : e;
    if (t != null && yl.test(t))
      return t;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value === null ? "0000-00-00" : this._value;
  }
  /**
   * Convert date object to blitzdata date.
   */
  toDateString(e) {
    return !e || !(e instanceof Date) ? null : e.toISOString().substring(0, 10);
  }
  /**
   * Convert value to native date object.
   */
  toDateObject() {
    return this._value ? new Date(this._value) : null;
  }
  /**
   * Convert value to formatted time.
   */
  toFormatted(e = "en", t = !1) {
    if (!this._value)
      return null;
    const s = e === "fr" ? pn : e === "de" ? mn : jt;
    let r = e === "de" ? "dd. MMMM yyyy" : "dd MMMM yyyy";
    return t && (r = "EEEE, " + r), Ir(
      new Date(this._value),
      r,
      { locale: s }
    );
  }
  /**
   * Convert value to relative time.
   */
  toRelative(e = "en") {
    if (!this._value)
      return null;
    const t = e === "fr" ? pn : e === "de" ? mn : jt;
    return jr(
      new Date(this._value),
      {
        addSuffix: !0,
        locale: t
      }
    );
  }
}
class Tt extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    return e;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
}
class vl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    return e;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
}
class Un extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (typeof e == "number")
      return e;
    if (typeof e == "string")
      return parseInt(e, 10);
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return typeof this._value == "number" ? this._value.toString() : this._value;
  }
}
class bl extends Tt {
  // ...
}
const wl = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}\s[0-9]{2}\:[0-9]{2}\:[0-9]{2}$/;
class _l extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e === "0000-00-00 00:00:00")
      return null;
    const t = e instanceof Date ? this.toDateString(e) : e;
    if (t != null && wl.test(t))
      return t;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value === null ? "0000-00-00 00:00:00" : this._value;
  }
  /**
   * Convert date object to blitzdata date.
   */
  toDateString(e) {
    if (!e || !(e instanceof Date))
      return null;
    const t = new Date(e);
    t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    const s = t.toISOString();
    return s.substring(0, 10) + " " + s.substring(11, 19);
  }
  /**
   * Convert value to native date object.
   */
  toDateObject() {
    return this._value ? new Date(this._value) : null;
  }
  /**
   * Convert value to formatted time.
   */
  toFormatted(e = "en", t = !1) {
    if (!this._value)
      return null;
    const s = e === "fr" ? pn : e === "de" ? mn : jt;
    let r = e === "de" ? "dd. MMMM yyyy" : "dd MMMM yyyy";
    return t && (r = "EEEE, " + r), Ir(
      new Date(this._value),
      r,
      { locale: s }
    );
  }
  /**
   * Convert value to relative time.
   */
  toRelative(e = "en") {
    if (!this._value)
      return null;
    const t = e === "fr" ? pn : e === "de" ? mn : jt;
    return jr(
      new Date(this._value),
      {
        addSuffix: !0,
        locale: t
      }
    );
  }
  /**
   * Get the unix timestamp.
   */
  getTimeStamp() {
    return this._value ? new Date(this._value).getTime() : null;
  }
  /**
   * Get the blitzdata timestamp.
   */
  getBlitzStamp() {
    return this._value ? Math.floor((new Date(this._value).getTime() - (/* @__PURE__ */ new Date("2021-01-01T00:00:00Z")).getTime()) / 1e3) : null;
  }
}
class El extends $e {
  /**
   * Retrieves the linked object.
   * Task: https://alpha.blitzdata.com/blitzpm/log/blitzsifeddine/2025-08-25/Fk%2FMtm%20getObject()/2fbxs4--bt1lfz?proj=1s4dec-3ibnqe
   * 
   * @param options
   */
  async getObject(e) {
    const t = this.serialize();
    if (!t)
      return null;
    const s = await at().get(this._type);
    return (s == null ? void 0 : s.memoryClient().get(t)) || (await (s == null ? void 0 : s.get({ skipCacheUpdateIfFound: !0, ...e, raw: !1, blitzID: t })) ?? null);
  }
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    return e != null && typeof e != "string" ? null : e;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
}
class Sl extends $e {
  /**
   * Retrieves the linked user.
   * Task: https://alpha.blitzdata.com/blitzpm/log/blitzsifeddine/2025-09-03/User%20type/2fra4l--t1g94e?proj=1s4dec-3ibnqe
   * 
   */
  async toUser() {
    const e = this.serialize();
    if (!e)
      return null;
    const t = await at().get("0BAUsers"), s = await (t == null ? void 0 : t.get({ blitzID: e, skipCacheUpdateIfFound: !0 }));
    return s ? {
      id: e,
      username: s.username.value
    } : null;
  }
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    return e;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
}
class Tr {
  /**
   * Constructs a new many instance with given value.
   *
   * @param name Name of the attribute.
   * @param type Type of the attribute.
   * @param value The value to be stored in many instance.
   */
  constructor(e, t, s) {
    O(this, "_object"), O(this, "_name"), O(this, "_type"), O(this, "_value"), O(this, "_valueSignal"), O(this, "_syncSignal"), this._name = e, this._type = t, this._value = this.unserialize(s), this._valueSignal = new It(this._value), this._syncSignal = new It(null);
  }
  /**
   * The value of the many type.
   */
  get value() {
    return this._value;
  }
  /**
   * Sets value of the many type.
   *
   * @param value Value to be set.
   */
  set value(e) {
    this._value = this.unserialize(e), this._valueSignal.set(this._value);
  }
  /**
   * Returns the unserialized value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    let t;
    try {
      t = typeof e == "string" ? JSON.parse(e) : e instanceof Array ? e : e === void 0 ? void 0 : [], t !== void 0 && !Array.isArray(t) && (t = []);
    } catch {
      t = [];
    }
    return t && (t = t.map((s) => Re.createType(this._name, this._type, s)).filter((s) => s.value != null), t.forEach((s) => s.withObject(this._object))), t;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    if (this._value !== void 0)
      return this._value.map((e) => e.serialize());
  }
  /**
   * Performs and array operation.
   */
  async performAction(e) {
    var t, s, r, a, i, o, l, c, d, u, f, m;
    const h = new Fe({
      action: "edit",
      data: {
        [this._name]: {
          [e.action]: e.value
        }
      },
      model: (s = (t = this._object) == null ? void 0 : t.model) == null ? void 0 : s.getName(),
      blitzID: (r = this._object) == null ? void 0 : r._blitzID.value
    }), p = await Qe.create().run([h]);
    if (p[0].status !== Le.Success && p[0].status !== Le.Notice)
      throw new Error(p[0].message ?? "Unknown Error! Please try again.");
    for (const v of ((i = (a = this._object) == null ? void 0 : a._editURLs) == null ? void 0 : i.value) ?? [])
      await pt().addJob(v, h.toObject());
    const y = await ((l = (o = this._object) == null ? void 0 : o.model) == null ? void 0 : l.get({ blitzID: this._object._blitzID.value, forceLocal: !0, raw: !0 }));
    y && Array.isArray(y[this._name]) && (this.value = y[this._name]), (d = (c = this._object) == null ? void 0 : c.model) == null || d.memoryClient().emit(h), (u = this._object) == null || u.dispatchEvent("edit", h.data), (m = (f = this._object) == null ? void 0 : f.model) == null || m.setLastTransactionHash(h.hash);
  }
  /**
   * Adds new item.
   *
   * @param value The value to be added in many instance.
   */
  async add(e) {
    await this.performAction({
      action: "add",
      value: Re.createType(this._name, this._type, e).serialize()
    });
  }
  /**
   * Removes item at the given index.
   *
   * @param index The index to be removed from many instance.
   */
  async remove(e) {
    await this.performAction({
      action: "remove",
      value: Re.createType(this._name, this._type, e).serialize()
    });
  }
  /**
   * Sets the object of the data type.
   *
   * @param object The object to set.
   */
  withObject(e) {
    this._object = e, this._value !== void 0 && this._value.forEach((t) => t.withObject(e));
  }
  /**
   * Subscribe to changes in the value.
   *
   * @param fn Subscribe callback.
   * @returns Unsubscribe function.
   */
  subscribe(e, t = !0) {
    var s, r;
    const a = this._valueSignal.subscribe(e, t);
    return this._value === void 0 && ((r = (s = this._object) == null ? void 0 : s.model) == null || r.get({ blitzID: this._object._blitzID.value, forceHttp: !0, query: { manyToMany: "object" } }).then((i) => {
      (i == null ? void 0 : i[this._name]._value) !== void 0 && this._valueSignal.emit();
    })), a;
  }
  /**
   * Subscribe to changes in the sync status.
   *
   * @param fn Subscribe callback.
   * @returns Unsubscribe function.
   */
  syncStatus(e) {
    var t;
    const s = this._syncSignal.get() !== null, r = this._syncSignal.subscribe(e, s);
    return s || pt().getJobsForObject((t = this._object) == null ? void 0 : t._blitzID.value).then((a) => {
      this._syncSignal.set(Bt(a, this._name), !1), e(this._syncSignal.get());
    }), r;
  }
  /**
   * Get attribute details from model.
   */
  getDetails() {
    var e, t;
    return ((t = (e = this._object) == null ? void 0 : e.model) == null ? void 0 : t.getAttributeDetails(this._name)) || null;
  }
}
class Ml extends Tr {
  /**
   * Returns the unserialized value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    let t;
    try {
      t = typeof e == "string" ? JSON.parse(e) : e instanceof Array ? e : e === null ? [] : void 0, t !== void 0 && !Array.isArray(t) && (t = []);
    } catch {
    }
    return t;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Adds new item.
   *
   * @param value The value to be added in mtm attribute.
   */
  async add(e) {
    await this.performAction({
      action: "add",
      value: e
    });
  }
  /**
   * Removes item.
   *
   * @param value The value to be removed in mtm attribute.
   */
  async remove(e) {
    await this.performAction({
      action: "remove",
      value: e
    });
  }
  /**
   * Sets the object of the data type.
   *
   * @param object The object to set.
   */
  withObject(e) {
    this._object = e;
  }
  /**
   * Retrieves the linked objects.
   * Task: https://alpha.blitzdata.com/blitzpm/log/blitzsifeddine/2025-08-25/Fk%2FMtm%20getObject()/2fbxs4--bt1lfz?proj=1s4dec-3ibnqe
   * 
   * @param options
   */
  async getObjects(e) {
    const t = this.serialize();
    if (!Array.isArray(t))
      return [];
    const s = await at().get(this._type), r = s == null ? void 0 : s.memoryClient(), a = [];
    for (const i of t) {
      if (!i._blitzID)
        continue;
      const o = r == null ? void 0 : r.get(i._blitzID);
      if (o) {
        a.push(o);
        continue;
      }
      const l = await (s == null ? void 0 : s.get({ skipCacheUpdateIfFound: !0, ...e, raw: !1, blitzID: i._blitzID }));
      l && a.push(l);
    }
    return a;
  }
}
function Cl(n) {
  return n && n.constructor && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
}
function xl(n) {
  return n;
}
function $l(n, e) {
  e = e || {};
  const t = e.delimiter || ".", s = e.maxDepth, r = e.transformKey || xl, a = {};
  function i(o, l, c) {
    c = c || 1, Object.keys(o).forEach(function(d) {
      const u = o[d], f = e.safe && Array.isArray(u), m = Object.prototype.toString.call(u), h = Cl(u), p = m === "[object Object]" || m === "[object Array]", y = l ? l + t + r(d) : r(d);
      if (!f && !h && p && Object.keys(u).length && (!e.maxDepth || c < s))
        return i(u, y, c + 1);
      a[y] = u;
    });
  }
  return i(n), a;
}
class kl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e !== null && typeof e == "object")
      return e;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Validates a JSON string.
   */
  validate(e) {
    let t = !0;
    try {
      JSON.parse(e);
    } catch {
      t = !1;
    }
    return t;
  }
  /**
   * Returns the object keys.
   */
  keys() {
    return Object.keys(this._value ?? {});
  }
  /**
   * Flattens the object.
   */
  flat() {
    return $l(this._value ?? {});
  }
  /**
   * Groups the object by the result of the given function.
   */
  groupBy(e) {
    if (typeof e != "function")
      throw new Error("Callback function is not a function!");
    return Object.groupBy(this._value ?? {}, e);
  }
}
class Ll extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (typeof e == "string")
      return {
        content: e,
        language: null
      };
    if (e !== null && typeof e == "object" && e.content)
      return {
        content: e.content,
        language: e.language ?? null
      };
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Return the language of the code.
   */
  getLanguage() {
    var e;
    return ((e = this._value) == null ? void 0 : e.language) || null;
  }
  /**
   * Return the content of the code.
   */
  getContent() {
    var e;
    return ((e = this._value) == null ? void 0 : e.content) || null;
  }
}
class Dl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    return e;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Get the enum options.
   */
  getOptions() {
    var e, t, s;
    return ((s = (t = (e = this._object) == null ? void 0 : e.model) == null ? void 0 : t.getAttributeDetails(this._name)) == null ? void 0 : s.options) ?? [];
  }
  /**
   * Validate an enum value.
   */
  validate(e) {
    return this.getOptions().includes(e);
  }
}
class ss extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (typeof e == "number")
      return e;
    if (typeof e == "string")
      return parseFloat(e);
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return typeof this._value == "number" ? this._value.toString() : this._value;
  }
}
class Al extends Un {
  // ...
}
class Il extends ss {
  // ...
}
class jl extends ss {
  /**
   * Returns the precentage value.
   */
  toPercentage() {
    return this._value != null ? (this._value * 100).toString() + "%" : null;
  }
}
const Ps = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
class Tl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e != null && Ps.test(e))
      return e;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Validate an email value.
   */
  validate(e) {
    return Ps.test(e);
  }
}
const Ns = /^\+[1-9]{1,3}\-[0-9]{7,14}$/;
class Ol extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e != null && Ns.test(e))
      return e;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Validate a URL value.
   */
  validate(e) {
    return Ns.test(e);
  }
  /**
   * Get the calling code.
   */
  getCallingCode() {
    if (!this._value)
      return null;
    const e = this._value.split("-");
    return e.length < 2 ? null : e[0].substring(1);
  }
  /**
   * Get the phone number.
   */
  getPhoneNumber() {
    if (!this._value)
      return null;
    const e = this._value.split("-");
    return e.length < 2 ? null : e[1];
  }
}
const qs = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
class zl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e != null && qs.test(e))
      return e;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Validate a URL value.
   */
  validate(e) {
    return qs.test(e);
  }
  /**
   * Get the native URL object.
   */
  getUrlObject() {
    return this._value ? new URL(this._value) : null;
  }
  /**
   * Get the origin.
   */
  getOrigin() {
    return this._value ? new URL(this._value).origin : null;
  }
  /**
   * Get the protocol.
   */
  getProtocol() {
    return this._value ? new URL(this._value).protocol : null;
  }
  /**
   * Get the path name.
   */
  getPathname() {
    return this._value ? new URL(this._value).pathname : null;
  }
  /**
   * Get the host name.
   */
  getHostname() {
    return this._value ? new URL(this._value).hostname : null;
  }
  /**
   * Get the search string.
   */
  getSearch() {
    return this._value ? new URL(this._value).search : null;
  }
}
class Hl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    const t = e instanceof Array ? e[0] : e;
    if (t !== null && typeof t == "object" && t.base != null && t.version != null)
      return e;
    if (t !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Get the image URL.
   * @param resolution Resolution of the image to be returned.
   */
  getUrl(e) {
    const t = this._value instanceof Array ? this._value[0] : this._value;
    return t !== null && typeof t == "object" && t.base != null && t[e] != null ? t.base + t[e].substring(1) : null;
  }
}
class Pl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e !== null && typeof e == "object" && e.url != null)
      return e;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Get the video URL.
   */
  getUrl() {
    var e;
    return ((e = this._value) == null ? void 0 : e.url) ?? null;
  }
}
class Nl extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e !== null && typeof e == "object" && e.url != null)
      return e;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Get the file URL.
   */
  getUrl() {
    var e;
    return ((e = this._value) == null ? void 0 : e.url) ?? null;
  }
}
const Us = /^https?:\/\/[^\s]+$/i;
class ql extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (typeof e == "string" && Us.test(e))
      return e;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Get the PDF URL.
   */
  getUrl() {
    return this._value ?? null;
  }
  /**
   * Validate a PDF URL value.
   */
  validate(e) {
    return Us.test(e);
  }
  /**
   * Get the conventional first-page thumbnail URL
   * (`/f/12/report.pdf` -> `/f/12/report.thumbnail.jpg`).
   *
   * The `.pdf` suffix is matched on the path only, so signed or cache-busted
   * URLs (`report.pdf?token=…`, `…#page=2`) still resolve correctly.
   */
  getThumbnailUrl() {
    const e = this.getUrl();
    if (!e)
      return null;
    const t = e.search(/[?#]/), s = t === -1 ? e : e.slice(0, t), r = t === -1 ? "" : e.slice(t);
    return /\.pdf$/i.test(s) ? s.replace(/\.pdf$/i, ".thumbnail.jpg") + r : null;
  }
}
class Ul extends $e {
  /**
   * Returns the unserialized value of given value.
   *
   * @param value Value to be casted.
   */
  unserialize(e) {
    if (e !== null && typeof e == "object")
      return e;
    if (e !== void 0)
      return null;
  }
  /**
   * Serializes the value to be stored.
   */
  serialize() {
    return this._value;
  }
  /**
   * Validates if the provided value is a valid location
   */
  validate(e) {
    if (typeof e != "object" || e === null)
      return !1;
    const t = e;
    if (!t.lat || !t.lng)
      return !1;
    const s = parseFloat(t.lat);
    if (isNaN(s) || s < -90 || s > 90)
      return !1;
    const r = parseFloat(t.lng);
    return !(isNaN(r) || r < -180 || r > 180);
  }
  /**
   * Gets a formatted address string from the location data
   */
  getFormattedAddress() {
    if (!this._value)
      return "";
    const e = [];
    this._value.street && e.push(this._value.street), this._value.street_number && e.push(this._value.street_number);
    const t = [];
    return this._value.postal_code && t.push(this._value.postal_code), this._value.city && t.push(this._value.city), t.length > 0 && e.push(t.join(" ")), this._value.country && e.push(this._value.country), e.join(", ");
  }
  /**
   * Geocode an address to get coordinates
   * @param address The address to geocode
   * @param apiKey Google Maps API key
   * @returns Promise with lat/long coordinates or null if geocoding failed
   */
  async geocodeAddress(e, t) {
    if (!e)
      throw new Error("Address is required for geocoding.");
    if (!t)
      throw new Error("Google Maps API key is required for geocoding.");
    try {
      const s = await (await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(e)}&key=${t}`)).json();
      if (s.status === "OK" && s.results && s.results.length > 0) {
        const r = s.results[0].geometry.location;
        return {
          lat: r.lat.toString(),
          lng: r.lng.toString()
        };
      }
      return null;
    } catch (s) {
      return console.error("Geocoding error:", s.message), null;
    }
  }
}
class Re {
  /**
   * Creates appropriate type from given attribute type string and value.
   *
   * @param name
   * @param type
   * @param value
   */
  static createType(e, t, s) {
    var r;
    if (e.endsWith("_fk"))
      return new El(e, t, s);
    const a = (r = Er[e]) == null ? void 0 : r.type;
    return typeof a == "string" && (t = a), t === "user" ? new Sl(e, t, s) : t === "int" ? new Un(e, "int", s) : t === "blitzstamp" ? new Un(e, t, s) : t === "tinyint" ? new Al(e, t, s) : t === "double" ? new Il(e, t, s) : t === "float" ? new ss(e, t, s) : t === "percentage" ? new jl(e, t, s) : t === "varchar" ? new bl(e, t, s) : t === "text" ? new Tt(e, t, s) : t === "htmlText" ? new vl(e, t, s) : t === "enum" ? new Dl(e, t, s) : t === "json" ? new kl(e, t, s) : t === "boolean" ? new $r(e, t, s) : t === "datetime" ? new _l(e, "datetime", s) : t === "date" ? new gl(e, t, s) : t === "code" ? new Ll(e, t, s) : t === "email" ? new Tl(e, t, s) : t === "phone" ? new Ol(e, t, s) : t === "url" ? new zl(e, t, s) : t === "image" ? new Hl(e, t, s) : t === "video" ? new Pl(e, t, s) : t === "file" ? new Nl(e, t, s) : t === "pdf" ? new ql(e, t, s) : t === "location" ? new Ul(e, t, s) : new Ft(e, t, s);
  }
  /**
   * Initializes a new instance of DataType or ManyType with the specified name and type.
   *
   * @param name
   * @param type
   * @param value
   * @returns
   */
  static createFrom(e, t, s) {
    return Array.isArray(t) ? this.createMany(e, t[0], s) : this.createType(e, t, s);
  }
  /**
   * Unserializes array attribute.
   *
   * @param name
   * @param type
   * @param values
   */
  static createMany(e, t, s) {
    return e.endsWith("_mtm") ? new Ml(e, t, s) : new Tr(e, t, s);
  }
  /**
   * Unserializes given data to be used within library.
   *
   * @param attributes
   * @param data
   */
  static unserialize(e, t) {
    var s, r, a;
    const i = {}, o = [...Object.keys(e), ...Object.keys(t)].filter((l, c, d) => d.indexOf(l) === c);
    for (const l of o)
      Array.isArray((s = e[l]) == null ? void 0 : s.type) ? i[l] = Re.createMany(l, ((r = e[l]) == null ? void 0 : r.type[0]) ?? "anonymous", t[l]) : i[l] = Re.createType(
        l,
        ((a = e[l]) == null ? void 0 : a.type) ?? "anonymous",
        t[l]
      );
    return i;
  }
  /**
   * Serializes data for transport.
   *
   * @param data
   */
  static serialize(e) {
    const t = {};
    for (const s in e)
      t[s] = e[s].serialize();
    return t;
  }
}
class Me {
  /**
   * Create a list endpoint.
   *
   * @param baseUrl Base URL.
   * @param modelName Model name.
   * @param query Query parameters to be appended to the endpoint.
   */
  static createListEndpoint(e, t, s) {
    var r;
    const a = `${Me.sanitizeBaseUrl(e)}api/list/${t}.json`, i = new URLSearchParams();
    return new URL(e).origin !== window.location.origin && i.append("enableCors", "1"), i.append("fkOptions", JSON.stringify({ _userID: "blitzID" })), (r = s.conditions) != null && r.length && i.append("conditions", JSON.stringify(s.conditions)), s.limit && i.append("limit", s.limit.toString()), s.customSort && i.append("customSort", s.customSort), s.customSortDirection && i.append("customSortDirection", s.customSortDirection), s.pagination && i.append("pagination", s.pagination.toString()), s.var && s.var.length > 0 && i.append("var", JSON.stringify(s.var)), s.manyToMany && i.append("manyToMany", s.manyToMany), `${a}?${i.toString()}`;
  }
  /**
   * Create a get endpoint.
   *
   * @param baseUrl Base URL.
   * @param modelName Model name.
   * @param blitzID Id of the object.
   * @param query Query parameters to be appended to endpoint.
   */
  static createGetEndpoint(e, t, s, r) {
    const a = `${Me.sanitizeBaseUrl(e)}api/list/${t}/_blitzID/${s}.json`, i = new URLSearchParams();
    return new URL(e).origin !== window.location.origin && i.append("enableCors", "1"), i.append("fkOptions", JSON.stringify({ _userID: "blitzID" })), r.var && r.var.length > 0 && i.append("var", JSON.stringify(r.var)), r.manyToMany && i.append("manyToMany", r.manyToMany), `${a}?${i.toString()}`;
  }
  /**
   * Create a get history endpoint.
   *
   * @param baseUrl Base URL.
   * @param modelName Model name.
   * @param blitzID Id of the object.
   */
  static createGetHistoryEndpoint(e, t, s) {
    const r = `${Me.sanitizeBaseUrl(e)}api/getHistory/${t}/${s}.json`;
    return new URL(e).origin !== window.location.origin ? `${r}?enableCors=1` : r;
  }
  /**
   * Create a post endpoint.
   *
   * @param baseUrl Base URL.
   */
  static createPostEndpoint(e) {
    return `${Me.sanitizeBaseUrl(e)}api/post.json`;
  }
  /**
   * Create a ping endpoint.
   *
   * @param baseUrl Base URL.
   */
  static createPingEndpoint(e) {
    return `${Me.sanitizeBaseUrl(e)}api/ping.json`;
  }
  /**
   * Create a list logs endpoint.
   *
   * @param baseUrl Base URL.
   * @param model
   * @param query
   */
  static createListLogsEndpoint(e) {
    var t, s, r, a;
    const i = e.type === "delete" ? "listDeletedLogs" : "listLogs", o = e.model ? `${Me.sanitizeBaseUrl(e.baseUrl)}api/${i}/${e.model}.json` : `${Me.sanitizeBaseUrl(e.baseUrl)}api/${i}.json`, l = new URLSearchParams();
    return ((t = e.query) == null ? void 0 : t.from) !== void 0 && l.append("from", e.query.from.toString()), ((s = e.query) == null ? void 0 : s.afterLog) !== void 0 && e.model && l.append("afterLog", e.query.afterLog.toString()), ((r = e.query) == null ? void 0 : r.peek) === !0 && e.model && l.append("peek", "1"), (a = e.query) != null && a.models && !e.model && l.append("models", JSON.stringify(e.query.models)), `${o}?${l.toString()}`;
  }
  /**
   * Create an uploader endpoint.
   *
   * @param baseUrl Base URL.
   */
  static createUploaderEndpoint(e) {
    const t = new URL(e).origin !== window.location.origin ? "?enableCors=1" : "";
    return `${Me.sanitizeBaseUrl(e)}uploader/index` + t;
  }
  /**
   * Create a video uploader endpoint.
   *
   * @param baseUrl Base URL.
   */
  static createVideoUploaderEndpoint(e, t) {
    const s = new URL(e).origin !== window.location.origin ? "?enableCors=1" : "", r = (s ? s + "&" : "?") + `filename=${t}`;
    return `${Me.sanitizeBaseUrl(e)}uploadervideo/index` + r;
  }
  /**
   * Create a file uploader endpoint.
   *
   * @param baseUrl Base URL.
   */
  static createFileUploaderEndpoint(e) {
    const t = new URL(e).origin !== window.location.origin ? "?enableCors=1" : "";
    return `${Me.sanitizeBaseUrl(e)}uploaderfile/index` + t;
  }
  /**
   * Sanitize the base URL.
   *
   * @param baseUrl Base URL.
   */
  static sanitizeBaseUrl(e) {
    const t = new URL(e);
    if (!t.origin || !t.pathname || !t.protocol.match(/^https?:$/))
      throw new Error(`Supplied base URL is invalid: ${e}`);
    return t.pathname.endsWith("/") && (t.pathname = t.pathname.slice(0, -1)), t.toString();
  }
}
class Or extends Error {
  constructor(e) {
    super(e), this.name = "DefinitiveHistoryError";
  }
}
class yt {
  /**
   * Performs a list call to the server by given base URL, model name and query parameters.
   */
  static async list(e, t) {
    if (!e.endpoint && !e.fullUrl)
      throw new Error("Either baseUrl or fullUrl must be provided.");
    const s = await je.create().url(
      // We got 2 urls, because it is possible to have a full url.
      // See `BlitzData.list()` and `BlitzData.listRaw()` methods.
      e.fullUrl ? e.fullUrl : Me.createListEndpoint(e.endpoint.baseUrl, e.endpoint.modelName, e.endpoint.query)
    ).signal(t).get();
    if (!Array.isArray(s.items) && Array.isArray(s.errors))
      throw new Error(s.errors.map((r) => (r == null ? void 0 : r.message) ?? r).join(" | "));
    return s;
  }
  /**
   * Performs a get call to the server by provided options.
   */
  static async get(e, t) {
    const s = await je.create().url(
      Me.createGetEndpoint(e.baseUrl, e.modelName, e.blitzID, e.query)
    ).signal(t).get();
    if (!Array.isArray(s.items) && Array.isArray(s.errors))
      throw new Error(s.errors.map((r) => (r == null ? void 0 : r.message) ?? r).join(" | "));
    return s.items ?? [];
  }
  /**
   * Performs a post call to the server by given base URL and transactions.
   *
   * @param options Post options.
   */
  static async post(e) {
    const t = await je.create().url(Me.createPostEndpoint(e.baseUrl)).body(e.transactions).post();
    if ((typeof t.error == "string" || t.errors instanceof Array) && !(t.results instanceof Object))
      throw new Error(t.error ?? t.errors.join(" | "));
    return t;
  }
  /**
   * Performs a list logs call to the server by given base URL and transactions.
   *
   * @param options List logs option.
   */
  static async listLogs(e) {
    const t = await je.create().url(Me.createListLogsEndpoint(e)).get();
    if (!(t.transactions instanceof Array) && (typeof t.error == "string" || t.errors instanceof Array))
      throw new Error(t.error ?? t.errors.map((s) => (s == null ? void 0 : s.message) ?? s).join(" | "));
    return {
      transactions: t.transactions,
      userID: t.userID,
      userhash: t.userhash,
      lastTimestamp: t.lastTimestamp,
      lastLogID: t.lastLogID
    };
  }
  /**
   * Performs a get history call to the server for one record.
   *
   * @param options Get history options.
   */
  static async getHistory(e, t) {
    var s;
    const r = await je.create().url(Me.createGetHistoryEndpoint(e.baseUrl, e.modelName, e.blitzID)).signal(t).get();
    if (!Array.isArray(r.data)) {
      if ((s = r.errors) != null && s.length)
        throw new Error(r.errors.map((i) => (i == null ? void 0 : i.message) ?? i).join(" | "));
      const a = `History of "${e.modelName}/${e.blitzID}" is not readable: the record may not exist or you may lack permission.`;
      throw !r.error && r.userID !== void 0 ? new Or(a) : new Error(r.error ?? a);
    }
    return r.data.map((a) => ({
      ...a,
      data: typeof a.data == "object" && a.data !== null ? JSON.stringify(a.data) : a.data,
      newValue: typeof a.newValue == "object" && a.newValue !== null ? JSON.stringify(a.newValue) : a.newValue
    }));
  }
  /**
   * Performs an image upload call to the server by given base URL and image file.
   *
   * @param options Upload options.
   */
  static async upload(e) {
    const t = new FormData();
    t.append("image", e.image);
    const s = await je.create().url(Me.createUploaderEndpoint(e.baseUrl)).body(t).header("Accept", "application/json").post(), r = {};
    for (const [a, i] of Object.entries(s ?? {}))
      [
        "base",
        "version",
        "hd",
        "hd_wp",
        "oq",
        "oq_wp",
        "md",
        "md_wp",
        "sd",
        "sd_wp",
        "w320",
        "w320_wp",
        "180x180",
        "180x180_wp",
        "370x370",
        "370x370_wp"
      ].includes(a) && (r[a] = i);
    return r;
  }
  /**
   * Performs a video upload call to the server by given base URL and video file.
   *
   * @param options Upload options.
   */
  static async uploadVideo(e) {
    const t = new FormData();
    t.append("fileToUpload", e.video);
    const s = e.video.name.split("."), r = s.length > 1 ? "." + s.pop() : "", a = crypto.randomUUID() + r, i = await je.create().url(Me.createVideoUploaderEndpoint(e.baseUrl, a)).body(t).header("Accept", "application/json").post();
    if (!i || !i.s)
      throw new Error("Video upload failed: " + ((i == null ? void 0 : i.error) ?? "Unknown error!"));
    return {
      url: i.url.video,
      thumbnail: i.url.thumb,
      "tn-oq": i.url.tnoq
    };
  }
  /**
   * Performs a file upload call to the server by given base URL and file.
   *
   * @param options Upload options.
   */
  static async uploadFile(e) {
    const t = new FormData();
    t.append("files[]", e.file);
    const s = await je.create().url(Me.createFileUploaderEndpoint(e.baseUrl)).body(t).header("Accept", "application/json").post();
    if (!s || !s.s)
      throw new Error("File upload failed: " + ((s == null ? void 0 : s.error) ?? "Unknown error!"));
    return {
      url: s.files.url
    };
  }
  /**
   * Performs a ping call to the server by provided base URL.
   */
  static async ping({ baseUrl: e }) {
    return await je.create().url(Me.createPingEndpoint(e)).get();
  }
}
class kt {
  /**
   * Constructor.
   */
  constructor({ model: e, attributes: t }) {
    O(this, "_model"), O(this, "_attributes"), O(this, "listeners", /* @__PURE__ */ new Map()), O(this, "_syncSignal", new It(null)), O(this, "editQueue", Promise.resolve()), this._model = e, this._attributes = t;
  }
  /**
   * Model instance that object belongs to.
   */
  get model() {
    return this._model;
  }
  /**
   * Returns attribute value by given attribute name.
   *
   * @param name Attribute name.
   */
  getAttribute(e) {
    return this._attributes[e];
  }
  /**
   * Returns whether the object has given attribute or not.
   *
   * @param name Attribute name.
   */
  hasAttribute(e) {
    return this._attributes.hasOwnProperty(e);
  }
  /**
   * Edits given attribute name with value.
   *
   * @param attributeName Name of the attribute.
   * @param value New value of the attribute.
   */
  edit(e, t, s) {
    return this.enqueueEditOperation(async () => {
      var r, a, i, o;
      const l = (a = (r = this.model) == null ? void 0 : r.getAttributeDetails(e)) == null ? void 0 : a.type, c = Re.createType(e, l, t).serialize(), d = s ? Re.createType(e, l, s).serialize() : this.getAttribute(e).serialize(), u = new Fe({
        action: "edit",
        data: {
          [e]: {
            prev: d,
            new: c
          }
        },
        model: this.model.getName(),
        blitzID: this.getAttribute("_blitzID").value
      }), f = await Qe.create().run([u]);
      if (f[0].status !== Le.Success && f[0].status !== Le.Notice)
        throw new Error(f[0].message ?? "Unknown Error! Please try again.");
      this._attributes[e].value = c;
      for (const m of this.getAttribute("_editURLs").value)
        await pt().addJob(m, u.toObject());
      (i = this.model) == null || i.memoryClient().emit(u), this.dispatchEvent("edit", u.data), (o = this.model) == null || o.setLastTransactionHash(u.hash);
    });
  }
  /**
   * Deletes of object.
   */
  async delete() {
    var e, t;
    const s = new Fe({
      action: "delete",
      model: this.model.getName(),
      blitzID: this.getAttribute("_blitzID").value
    }), r = await Qe.create().run([s]);
    if (r[0].status !== Le.Success)
      throw new Error(r[0].message ?? "Unknown Error! Please try again.");
    const a = (e = this.model) == null ? void 0 : e.memoryClient();
    a == null || a.delete(this.getAttribute("_blitzID").value);
    for (const i of this.getAttribute("_editURLs").value)
      await pt().addJob(i, s.toObject());
    a == null || a.emit(s), this.dispatchEvent("delete", null), (t = this.model) == null || t.setLastTransactionHash(s.hash);
  }
  syncStatus(e) {
    if (!e)
      return pt().getJobsForObject(this.getAttribute("_blitzID").value).then((r) => r.every((a) => a.status === k.Completed));
    const t = this._syncSignal.get() !== null, s = this._syncSignal.subscribe(e, t);
    return t || pt().getJobsForObject(this.getAttribute("_blitzID").value).then((r) => {
      this._syncSignal.set(Bt(r), !1), e(this._syncSignal.get());
    }), s;
  }
  /**
   * Add permission for users for this object.
   *
   * @param id User hash/_blitzID.
   * @param permission Permission level
   */
  async addUserPermission(e) {
    if (!e || e.length === 0)
      throw new Error("Users missing!");
    const t = this.getAttribute("_blitzID").value, s = {
      blitzIDs: [t],
      users: e.reduce((o, l) => ({ ...o, [`#${l.id}`]: l.permission }), {})
    }, r = new Fe({
      action: "addObjectUserPermission",
      model: this.model.getName(),
      blitzID: t,
      data: s,
      hash: At(s)
    }), a = [];
    for (const o of this.getAttribute("_editURLs").value)
      a.push(
        await Pn.send(
          { url: o, transaction: r.toObject() },
          je._globalHeaders
        )
      );
    const i = a.find((o) => o.status !== De.Success);
    if (i)
      throw new Error(i.message);
  }
  /**
   * Reads the change history of the object from the server: who changed
   * which attribute to what, and when. Newest first, capped at the newest
   * 100 entries by the server. Server-only — history is provenance, it is
   * never cached locally.
   */
  async history(e) {
    var t;
    if (!this.model)
      throw new Error("Object has no model to read history for.");
    const s = ((t = this.getAttribute("_editURLs")) == null ? void 0 : t.value) ?? [];
    if (!s.length)
      throw new Error("Object has no server URLs to read history from.");
    let r;
    for (const a of s)
      try {
        return await yt.getHistory({
          baseUrl: a,
          modelName: this.model.getName(),
          blitzID: this.getAttribute("_blitzID").value
        }, e);
      } catch (i) {
        if (i instanceof Or || (i == null ? void 0 : i.name) === "AbortError")
          throw i;
        r = (i == null ? void 0 : i.message) ?? String(i);
      }
    throw new Error(`Could not read history: no server answered. Last error: ${r}`);
  }
  /**
   * Serializes object into primitive object with serialized attributes.
   */
  toObject() {
    const e = {};
    for (const t in this._attributes)
      e[t] = this._attributes[t].serialize();
    return e;
  }
  /**
   * Adds event listener to the object.
   *
   * @param type Event type.
   * @param callback Callback function.
   */
  addEventListener(e, t) {
    var s;
    this.listeners.has(e) || this.listeners.set(e, []), (s = this.listeners.get(e)) == null || s.push(t);
  }
  /**
   * Removes an event listener from the object.
   *
   * @param type Event type.
   * @param callback Callback function.
   */
  removeEventListener(e, t) {
    this.listeners.has(e) && this.listeners.set(
      e,
      this.listeners.get(e).filter((s) => t !== s)
    );
  }
  /**
   * Dispatches event to the object.
   *
   * @param type Event type.
   * @param data Data to be dispatched.
   */
  dispatchEvent(e, t) {
    var s;
    this.listeners.has(e) && ((s = this.listeners.get(e)) == null || s.forEach((r) => r(t)));
  }
  /**
   * Adds an edit operation to edit queue.
   *
   * @param operation
   */
  enqueueEditOperation(e) {
    return new Promise((t, s) => {
      this.editQueue = this.editQueue.then(async () => {
        try {
          const r = await e();
          t(r);
        } catch (r) {
          s(r);
        }
      });
    });
  }
}
class Fn {
  /**
   * Transforms BlitzData options.
   */
  static transformBlitzDataOptions(e) {
    if (typeof e > "u")
      throw new Error("Configuration is required.");
    if (typeof e == "string")
      e = {
        clusters: this.transformClusterOptions(e)
      };
    else if (Array.isArray(e))
      e = {
        clusters: this.transformClusterOptions(e)
      };
    else if (typeof e == "object" && !Array.isArray(e))
      e.clusters = this.transformClusterOptions(e.clusters);
    else
      throw new Error("Unknown configuration type.");
    if (!e.queue || typeof e.queue != "object" ? e.queue = {
      workerPath: "/queue-worker.js"
    } : e.queue.workerPath || (e.queue.workerPath = "/queue-worker.js"), e.sync ? typeof e.sync == "string" && (e.sync = {
      level: e.sync
    }) : e.sync = {
      level: "none"
    }, e.sync.level === "partial")
      throw new Error("Partial sync type not supported yet!");
    return typeof e.sync.live != "boolean" && (e.sync.live = !1), e.sync.level === "cache" && (e.sync.ttl || (e.sync.ttl = 30 * 1e3)), e.sync.level === "full" && (e.sync.interval || (e.sync.interval = 30 * 1e3), typeof e.sync.background != "boolean" && (e.sync.background = !1)), e.flush || (e.flush = {
      type: ["version", "model"]
    }), e.flush.type.includes("interval") && (e.flush.interval || (e.flush.interval = 30)), e.flush.type.includes("size") && (e.flush.size || (e.flush.size = 128)), e.flush.type.includes("model") && (e.flush.modelCacheTTL || (e.flush.modelCacheTTL = 60 * 5)), e;
  }
  /**
   * Transforms cluster options.
   */
  static transformClusterOptions(e) {
    if (typeof e > "u")
      throw new Error("Clusters are required.");
    if (typeof e == "string")
      e = {
        default: {
          readURL: [e],
          addURL: [e]
        }
      };
    else if (Array.isArray(e))
      e = {
        default: {
          readURL: e,
          addURL: e
        }
      };
    else if (typeof e == "object")
      for (const t of Object.keys(e)) {
        if (typeof e[t] == "string" || Array.isArray(e[t])) {
          const s = Array.isArray(e[t]) ? e[t] : [e[t]];
          e[t] = {
            readURL: s,
            addURL: s
          };
          continue;
        }
        typeof e[t] == "object" && (typeof e[t].readURL == "string" && (e[t].readURL = [e[t].readURL]), typeof e[t].addURL == "string" && (e[t].addURL = [e[t].addURL]));
      }
    else
      throw new Error("Unknown cluster configuration type.");
    return e;
  }
}
class Rn {
  /**
   * Extract model name from the given `list` URL.
   *
   * @param url The URL to extract the model name from.
   *
   * @returns The model name.
   */
  static extractModelName(e) {
    const t = new URL(e).pathname.split("/").filter((s) => s !== "").pop();
    if (!t && !(t != null && t.endsWith(".json")))
      throw new Error("Model name not found in the URL.");
    return t.slice(0, t.indexOf(".json"));
  }
  /**
   * Extracts conditions from the given `list` URL.
   *
   * @param url The URL to extract the conditions from.
   *
   * @returns The conditions.
   */
  static extractConditions(e) {
    const t = new URL(e);
    return JSON.parse(t.searchParams.get("conditions") || "[]");
  }
}
const Fl = {
  /**
   * Get handler for the object.
   *
   * @param target BDObject that's being proxied.
   * @param key wanted key.
   */
  get(n, e) {
    if (Reflect.has(n, e)) {
      const t = Reflect.get(n, e);
      return t instanceof Function ? t.bind(n) : t;
    }
    return n._attributes[e];
  },
  /**
   * Set handler for the object.
   */
  set(n, e, t) {
    throw new Error("Setting values directly not supported. Please use `edit` method to change a value for an attribute.");
  }
};
class zr {
  /**
   * Creates new BDObject with supplied type, model and attributes.
   *
   * @param type
   * @param model
   * @param data
   * @param updateMemory
   */
  static create(e, t, s) {
    const r = t.getAttributesDetails() ?? {}, a = Re.unserialize(r, s), i = new Proxy(new e({
      model: t,
      attributes: a
    }), Fl);
    for (const o in a)
      a[o].withObject(i);
    return t.memoryClient().update(i);
  }
}
var Hr = { exports: {} }, Pr = { exports: {} };
(function() {
  var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = {
    // Bit-wise rotation left
    rotl: function(t, s) {
      return t << s | t >>> 32 - s;
    },
    // Bit-wise rotation right
    rotr: function(t, s) {
      return t << 32 - s | t >>> s;
    },
    // Swap big-endian to little-endian and vice versa
    endian: function(t) {
      if (t.constructor == Number)
        return e.rotl(t, 8) & 16711935 | e.rotl(t, 24) & 4278255360;
      for (var s = 0; s < t.length; s++)
        t[s] = e.endian(t[s]);
      return t;
    },
    // Generate an array of any length of random bytes
    randomBytes: function(t) {
      for (var s = []; t > 0; t--)
        s.push(Math.floor(Math.random() * 256));
      return s;
    },
    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(t) {
      for (var s = [], r = 0, a = 0; r < t.length; r++, a += 8)
        s[a >>> 5] |= t[r] << 24 - a % 32;
      return s;
    },
    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(t) {
      for (var s = [], r = 0; r < t.length * 32; r += 8)
        s.push(t[r >>> 5] >>> 24 - r % 32 & 255);
      return s;
    },
    // Convert a byte array to a hex string
    bytesToHex: function(t) {
      for (var s = [], r = 0; r < t.length; r++)
        s.push((t[r] >>> 4).toString(16)), s.push((t[r] & 15).toString(16));
      return s.join("");
    },
    // Convert a hex string to a byte array
    hexToBytes: function(t) {
      for (var s = [], r = 0; r < t.length; r += 2)
        s.push(parseInt(t.substr(r, 2), 16));
      return s;
    },
    // Convert a byte array to a base-64 string
    bytesToBase64: function(t) {
      for (var s = [], r = 0; r < t.length; r += 3)
        for (var a = t[r] << 16 | t[r + 1] << 8 | t[r + 2], i = 0; i < 4; i++)
          r * 8 + i * 6 <= t.length * 8 ? s.push(n.charAt(a >>> 6 * (3 - i) & 63)) : s.push("=");
      return s.join("");
    },
    // Convert a base-64 string to a byte array
    base64ToBytes: function(t) {
      t = t.replace(/[^A-Z0-9+\/]/ig, "");
      for (var s = [], r = 0, a = 0; r < t.length; a = ++r % 4)
        a != 0 && s.push((n.indexOf(t.charAt(r - 1)) & Math.pow(2, -2 * a + 8) - 1) << a * 2 | n.indexOf(t.charAt(r)) >>> 6 - a * 2);
      return s;
    }
  };
  Pr.exports = e;
})();
var Rl = Pr.exports, Wn = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(n) {
      return Wn.bin.stringToBytes(unescape(encodeURIComponent(n)));
    },
    // Convert a byte array to a string
    bytesToString: function(n) {
      return decodeURIComponent(escape(Wn.bin.bytesToString(n)));
    }
  },
  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(n) {
      for (var e = [], t = 0; t < n.length; t++)
        e.push(n.charCodeAt(t) & 255);
      return e;
    },
    // Convert a byte array to a string
    bytesToString: function(n) {
      for (var e = [], t = 0; t < n.length; t++)
        e.push(String.fromCharCode(n[t]));
      return e.join("");
    }
  }
}, Fs = Wn;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var Wl = function(n) {
  return n != null && (Nr(n) || Bl(n) || !!n._isBuffer);
};
function Nr(n) {
  return !!n.constructor && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
}
function Bl(n) {
  return typeof n.readFloatLE == "function" && typeof n.slice == "function" && Nr(n.slice(0, 0));
}
(function() {
  var n = Rl, e = Fs.utf8, t = Wl, s = Fs.bin, r = function(a, i) {
    a.constructor == String ? i && i.encoding === "binary" ? a = s.stringToBytes(a) : a = e.stringToBytes(a) : t(a) ? a = Array.prototype.slice.call(a, 0) : !Array.isArray(a) && a.constructor !== Uint8Array && (a = a.toString());
    for (var o = n.bytesToWords(a), l = a.length * 8, c = 1732584193, d = -271733879, u = -1732584194, f = 271733878, m = 0; m < o.length; m++)
      o[m] = (o[m] << 8 | o[m] >>> 24) & 16711935 | (o[m] << 24 | o[m] >>> 8) & 4278255360;
    o[l >>> 5] |= 128 << l % 32, o[(l + 64 >>> 9 << 4) + 14] = l;
    for (var h = r._ff, p = r._gg, y = r._hh, v = r._ii, m = 0; m < o.length; m += 16) {
      var g = c, w = d, S = u, $ = f;
      c = h(c, d, u, f, o[m + 0], 7, -680876936), f = h(f, c, d, u, o[m + 1], 12, -389564586), u = h(u, f, c, d, o[m + 2], 17, 606105819), d = h(d, u, f, c, o[m + 3], 22, -1044525330), c = h(c, d, u, f, o[m + 4], 7, -176418897), f = h(f, c, d, u, o[m + 5], 12, 1200080426), u = h(u, f, c, d, o[m + 6], 17, -1473231341), d = h(d, u, f, c, o[m + 7], 22, -45705983), c = h(c, d, u, f, o[m + 8], 7, 1770035416), f = h(f, c, d, u, o[m + 9], 12, -1958414417), u = h(u, f, c, d, o[m + 10], 17, -42063), d = h(d, u, f, c, o[m + 11], 22, -1990404162), c = h(c, d, u, f, o[m + 12], 7, 1804603682), f = h(f, c, d, u, o[m + 13], 12, -40341101), u = h(u, f, c, d, o[m + 14], 17, -1502002290), d = h(d, u, f, c, o[m + 15], 22, 1236535329), c = p(c, d, u, f, o[m + 1], 5, -165796510), f = p(f, c, d, u, o[m + 6], 9, -1069501632), u = p(u, f, c, d, o[m + 11], 14, 643717713), d = p(d, u, f, c, o[m + 0], 20, -373897302), c = p(c, d, u, f, o[m + 5], 5, -701558691), f = p(f, c, d, u, o[m + 10], 9, 38016083), u = p(u, f, c, d, o[m + 15], 14, -660478335), d = p(d, u, f, c, o[m + 4], 20, -405537848), c = p(c, d, u, f, o[m + 9], 5, 568446438), f = p(f, c, d, u, o[m + 14], 9, -1019803690), u = p(u, f, c, d, o[m + 3], 14, -187363961), d = p(d, u, f, c, o[m + 8], 20, 1163531501), c = p(c, d, u, f, o[m + 13], 5, -1444681467), f = p(f, c, d, u, o[m + 2], 9, -51403784), u = p(u, f, c, d, o[m + 7], 14, 1735328473), d = p(d, u, f, c, o[m + 12], 20, -1926607734), c = y(c, d, u, f, o[m + 5], 4, -378558), f = y(f, c, d, u, o[m + 8], 11, -2022574463), u = y(u, f, c, d, o[m + 11], 16, 1839030562), d = y(d, u, f, c, o[m + 14], 23, -35309556), c = y(c, d, u, f, o[m + 1], 4, -1530992060), f = y(f, c, d, u, o[m + 4], 11, 1272893353), u = y(u, f, c, d, o[m + 7], 16, -155497632), d = y(d, u, f, c, o[m + 10], 23, -1094730640), c = y(c, d, u, f, o[m + 13], 4, 681279174), f = y(f, c, d, u, o[m + 0], 11, -358537222), u = y(u, f, c, d, o[m + 3], 16, -722521979), d = y(d, u, f, c, o[m + 6], 23, 76029189), c = y(c, d, u, f, o[m + 9], 4, -640364487), f = y(f, c, d, u, o[m + 12], 11, -421815835), u = y(u, f, c, d, o[m + 15], 16, 530742520), d = y(d, u, f, c, o[m + 2], 23, -995338651), c = v(c, d, u, f, o[m + 0], 6, -198630844), f = v(f, c, d, u, o[m + 7], 10, 1126891415), u = v(u, f, c, d, o[m + 14], 15, -1416354905), d = v(d, u, f, c, o[m + 5], 21, -57434055), c = v(c, d, u, f, o[m + 12], 6, 1700485571), f = v(f, c, d, u, o[m + 3], 10, -1894986606), u = v(u, f, c, d, o[m + 10], 15, -1051523), d = v(d, u, f, c, o[m + 1], 21, -2054922799), c = v(c, d, u, f, o[m + 8], 6, 1873313359), f = v(f, c, d, u, o[m + 15], 10, -30611744), u = v(u, f, c, d, o[m + 6], 15, -1560198380), d = v(d, u, f, c, o[m + 13], 21, 1309151649), c = v(c, d, u, f, o[m + 4], 6, -145523070), f = v(f, c, d, u, o[m + 11], 10, -1120210379), u = v(u, f, c, d, o[m + 2], 15, 718787259), d = v(d, u, f, c, o[m + 9], 21, -343485551), c = c + g >>> 0, d = d + w >>> 0, u = u + S >>> 0, f = f + $ >>> 0;
    }
    return n.endian([c, d, u, f]);
  };
  r._ff = function(a, i, o, l, c, d, u) {
    var f = a + (i & o | ~i & l) + (c >>> 0) + u;
    return (f << d | f >>> 32 - d) + i;
  }, r._gg = function(a, i, o, l, c, d, u) {
    var f = a + (i & l | o & ~l) + (c >>> 0) + u;
    return (f << d | f >>> 32 - d) + i;
  }, r._hh = function(a, i, o, l, c, d, u) {
    var f = a + (i ^ o ^ l) + (c >>> 0) + u;
    return (f << d | f >>> 32 - d) + i;
  }, r._ii = function(a, i, o, l, c, d, u) {
    var f = a + (o ^ (i | ~l)) + (c >>> 0) + u;
    return (f << d | f >>> 32 - d) + i;
  }, r._blocksize = 16, r._digestsize = 16, Hr.exports = function(a, i) {
    if (a == null)
      throw new Error("Illegal argument " + a);
    var o = n.wordsToBytes(r(a, i));
    return i && i.asBytes ? o : i && i.asString ? s.bytesToString(o) : n.bytesToHex(o);
  };
})();
var Jl = Hr.exports;
const Vl = /* @__PURE__ */ Ba(Jl), Yl = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i, Rs = (n) => {
  if (typeof n != "string")
    throw new TypeError("Invalid argument expected string");
  const e = n.match(Yl);
  if (!e)
    throw new Error(`Invalid argument not valid semver ('${n}' received)`);
  return e.shift(), e;
}, Ws = (n) => n === "*" || n === "x" || n === "X", Bs = (n) => {
  const e = parseInt(n, 10);
  return isNaN(e) ? n : e;
}, Kl = (n, e) => typeof n != typeof e ? [String(n), String(e)] : [n, e], Xl = (n, e) => {
  if (Ws(n) || Ws(e))
    return 0;
  const [t, s] = Kl(Bs(n), Bs(e));
  return t > s ? 1 : t < s ? -1 : 0;
}, Js = (n, e) => {
  for (let t = 0; t < Math.max(n.length, e.length); t++) {
    const s = Xl(n[t] || "0", e[t] || "0");
    if (s !== 0)
      return s;
  }
  return 0;
}, Ql = (n, e) => {
  const t = Rs(n), s = Rs(e), r = t.pop(), a = s.pop(), i = Js(t, s);
  return i !== 0 ? i : r && a ? Js(r.split("."), a.split(".")) : r || a ? r ? -1 : 1 : 0;
}, Vs = (n, e, t) => {
  Zl(t);
  const s = Ql(n, e);
  return qr[t].includes(s);
}, qr = {
  ">": [1],
  ">=": [0, 1],
  "=": [0],
  "<=": [-1, 0],
  "<": [-1],
  "!=": [-1, 1]
}, Ys = Object.keys(qr), Zl = (n) => {
  if (typeof n != "string")
    throw new TypeError(`Invalid operator type, expected string but got ${typeof n}`);
  if (Ys.indexOf(n) === -1)
    throw new Error(`Invalid operator, expected one of ${Ys.join("|")}`);
};
class Ur {
  /**
   * Constructor
   * @param options Flush options
   */
  constructor(e) {
    O(this, "options"), this.options = e;
  }
  /**
   * Perform the flush check
   */
  async perform() {
    if (this.options.type.includes("version")) {
      const e = le.get("version");
      if (!e || Vs(Z.VERSION, e, ">")) {
        const t = Z.VERSION.split(".")[1], s = e == null ? void 0 : e.split(".")[1];
        if (s && Vs(t, s, ">")) {
          await this.flush(), le.set("version", Z.VERSION);
          return;
        } else
          le.set("version", Z.VERSION);
      }
    }
    if (this.options.type.includes("interval") && this.options.interval) {
      const e = le.get("lastFlush");
      if (!e)
        le.set("lastFlush", Date.now().toString());
      else if (Math.floor((Date.now() - parseInt(e)) / 864e5) >= this.options.interval) {
        await this.flush(), le.set("lastFlush", Date.now().toString()), le.set("version", Z.VERSION);
        return;
      }
    }
    if (this.options.type.includes("size") && this.options.size && navigator.storage && navigator.storage.estimate)
      try {
        const e = await navigator.storage.estimate();
        if (e.usage && Math.floor(e.usage / 1e6) >= this.options.size) {
          await this.flush(), le.set("version", Z.VERSION);
          return;
        }
      } catch (e) {
        console.error("Error getting storage estimate:", e.message);
      }
    if (this.options.type.includes("model")) {
      const e = await indexedDB.databases(), t = [
        ...e.filter((a) => {
          var i;
          return (i = a.name) == null ? void 0 : i.startsWith("bdt");
        }).map((a) => a.name),
        ...le.getDatabases()
      ].filter((a, i, o) => !["_Model", "_Project", "0BAUsers"].includes(a) && o.findIndex((l) => l === a) === i), s = [
        "_sort",
        "_objectpermission",
        "_modified",
        "hasuserpermissions",
        "haslogs",
        "hasprojects",
        "allowedit",
        "allowdelete",
        "defaultobjectpermission",
        "hassort",
        "hasexpiration",
        "haspublishingdate",
        "modelpermission"
      ], r = e.find((a) => a.name === "_Model") ? await Dt("_Model", 1) : null;
      if (r) {
        for (const a of t)
          try {
            const i = (JSON.parse(le.get("model." + a) || "null") ?? {}).object;
            if (i) {
              const o = await r.get("objects", a);
              o && (!s.every((l) => i[l] === o[l]) || !Object.keys(i.attributes ?? []).every((l) => {
                var c, d, u, f, m, h, p, y;
                return (
                  // Check single enum and many enum attributes
                  i.attributes[l].type === "enum" || Array.isArray(i.attributes[l].type) && i.attributes[l].type[0] === "enum" ? (Array.isArray(i.attributes[l].type) ? (d = (c = o.attributes) == null ? void 0 : c[l]) == null ? void 0 : d.type[0] : (f = (u = o.attributes) == null ? void 0 : u[l]) == null ? void 0 : f.type) === "enum" && (i.attributes[l].options ?? []).every((v, g) => {
                    var w, S;
                    return v === ((S = (w = o.attributes) == null ? void 0 : w[l]) == null ? void 0 : S.options[g]);
                  }) : Array.isArray(i.attributes[l].type) ? i.attributes[l].type[0] === ((h = (m = o.attributes) == null ? void 0 : m[l]) == null ? void 0 : h.type[0]) : i.attributes[l].type === ((y = (p = o.attributes) == null ? void 0 : p[l]) == null ? void 0 : y.type)
                );
              })) && await r.delete("objects", a);
            }
          } catch (i) {
            console.error(`Error flushing "${a}" model:`, i.message);
          }
        r.close();
      }
    }
  }
  /**
   * Deletes local databases and any other footprints generated by library.
   */
  async flush() {
    const e = await indexedDB.databases(), t = [
      ...e.filter((r) => {
        var a;
        return (a = r.name) == null ? void 0 : a.startsWith("bdt");
      }).map((r) => r.name),
      ...le.getDatabases(),
      "_Model",
      "_Project",
      "0BAUsers",
      "db_master"
    ].filter((r, a, i) => i.findIndex((o) => o === r) === a);
    for (const r of t)
      await Gn(r);
    const s = e.find((r) => r.name === ce.name) ? await Dt(ce.name, 1) : null;
    s && (await s.clear(ce.store), s.close()), le.clear();
  }
  /**
   * Updates model cache in local storage
   */
  static modelCacheUpdate(e, t) {
    if (Z.options.flush.type.includes("model") && Z.options.flush.modelCacheTTL && e && t !== null && typeof t == "object" && Object.hasOwn(t, "_blitzID"))
      try {
        const s = Date.now(), r = "model." + e.getName(), a = JSON.parse(le.get(r) || "null");
        (!a || s - a.lastFetchedAt >= Z.options.flush.modelCacheTTL * 1e3) && le.set(
          r,
          JSON.stringify({
            lastFetchedAt: s,
            object: t
          })
        );
      } catch (s) {
        console.error("Error updating model cache:", s.message);
      }
  }
}
class Et {
  constructor() {
    O(this, "_clusters"), O(this, "_urls"), O(this, "_model"), O(this, "_query"), O(this, "_raw", !1), O(this, "_forceHttp", !1), O(this, "_forceLocal", !1), O(this, "_skipCacheUpdateIfFound", !1), O(this, "_get"), O(this, "_getQuery"), O(this, "_signal");
  }
  /**
   * Creates a new list call.
   */
  static create() {
    return new Et();
  }
  /**
   * Sets the model to be listed.
   *
   * @param model Model to be listed.
   */
  model(e) {
    return this._model = e, this;
  }
  /**
   * Sets the clusters to make list call.
   *
   * @param clusters clusters to make list call.
   */
  clusters(e) {
    return this._clusters = e, this;
  }
  /**
   * Sets the abort signal.
   * @param signal
   */
  signal(e) {
    return this._signal = e, this;
  }
  /**
   * Sets the URLs to make list call.
   *
   * @param urls URLs to make list call.
   */
  urls(e) {
    return this._urls = e, this;
  }
  /**
   * Sets the query parameters.
   *
   * @param query Query parameters.
   */
  query(e) {
    var t, s;
    this._query = e;
    const r = (t = this._model) == null ? void 0 : t.getAttributesDetails();
    if ((s = this._query) != null && s.conditions && r)
      for (const a of this._query.conditions) {
        const i = a[0];
        a.length === 3 && r[i] !== void 0 && typeof r[i].type == "string" && (a[1] === "IN" && Array.isArray(a[2]) ? a[2] = a[2].map((o) => Re.createType(
          i,
          r[i].type,
          o
        ).serialize()) : a[2] = Re.createType(
          i,
          r[i].type,
          a[2]
        ).serialize());
      }
    return this;
  }
  /**
   * Sets whether to return raw data or not.
   *
   * @param raw Whether to return raw data or not.
   */
  raw(e) {
    return this._raw = e, this;
  }
  /**
   * Whether to force http request
   *
   * @param forceHttp
   */
  forceHttp(e) {
    return this._forceHttp = e, this;
  }
  /**
   * Whether to force local results
   *
   * @param forceLocal
   */
  forceLocal(e) {
    return this._forceLocal = e, this;
  }
  /**
   * Whether to force local results if found on the cache type.
   *
   * @param skipCacheUpdateIfFound
   */
  skipCacheUpdateIfFound(e) {
    return this._skipCacheUpdateIfFound = e, this;
  }
  /**
   * Object to be fetched.
   *
   * @param blitzID Id of the object.
   */
  get(e) {
    return this._get = e, this;
  }
  /**
   * Sets the get call query parameters.
   *
   * @param query Query parameters.
   */
  getQuery(e) {
    return this._getQuery = e, this;
  }
  /**
   * Converts the passed raw objects to BDObject instances.
   * 
   * @param objects Raw objects to be converted.
   * @returns List of BDObject instances.
   */
  convertObjects(e) {
    var t;
    const s = [];
    for (const r of e)
      s.push(zr.create(((t = this._query) == null ? void 0 : t.returnType) ?? kt, this._model, r));
    return s;
  }
  /**
   * Performs the list call.
   */
  async perform() {
    var e;
    let t = !this.hasLocalDatabase() || this._forceHttp && !this._forceLocal ? [] : await this.performIndexedDb();
    if (!this._forceLocal) {
      if (!this.hasLocalDatabase())
        t = await this.filterQueuedObjects(this.mergeObjects(await this.performHttp())), t = await this.filterExpiredObjects(t);
      else if (Z.options.sync.level === "full" && t.length === 0 && (this._forceHttp || !le.hasSyncCursors(this._model.getName())))
        t = await this.filterQueuedObjects(this.mergeObjects(await this.performHttp())), t = await this.filterExpiredObjects(t), t.length > 0 && await this._model.idbClient().save(t);
      else if (Z.options.sync.level === "cache") {
        const s = this._skipCacheUpdateIfFound && t.length > 0 ? !1 : this.shouldSendHttpRequest();
        if (s || t.length === 0) {
          const r = await this.filterQueuedObjects(this.mergeObjects(await this.performHttp()));
          (r.length > 0 || this._forceHttp) && (t = await this.filterExpiredObjects(r), t.length > 0 && await this._model.idbClient().save(t)), s && ((e = this._model) == null ? void 0 : e.getName()) !== "_Model" && le.setListCallLastTimeStamp(this.hash(), (/* @__PURE__ */ new Date()).getTime());
        }
      }
    }
    return this._raw ? t : this.convertObjects(t);
  }
  /**
   * Performs the list call using a signal.
   * 
   * @returns Signal that will emit the results.
   */
  performSignal(e = !1) {
    const t = new It(null);
    return (async () => {
      var s;
      let r = [];
      const a = (i, o) => {
        r = i, t.set(o ? { items: i, nextSource: o } : { items: i });
      };
      try {
        if (!e) {
          a(await this.perform());
          return;
        }
        const i = await this.performMemory();
        if (a(
          this._raw ? i : this.convertObjects(i),
          this.hasLocalDatabase() ? "local database" : "server"
        ), this.hasLocalDatabase()) {
          const l = await this.performIndexedDb();
          a(
            this._raw ? l : this.convertObjects(l),
            "server"
          );
        }
        let o = await this.filterQueuedObjects(this.mergeObjects(await this.performHttp()));
        o = await this.filterExpiredObjects(o), o.length > 0 && this.hasLocalDatabase() && await ((s = this._model) == null ? void 0 : s.idbClient().save(o)), a(this._raw ? o : this.convertObjects(o));
      } catch (i) {
        console.error("List call failed:", (i == null ? void 0 : i.stack) ?? (i == null ? void 0 : i.message) ?? i), t.set({ items: r });
      }
    })(), t;
  }
  /**
   * Fetches, filters and saves one snapshot page. The pagination signal is
   * the UNFILTERED server page: a page the queue/expiry filters shrank
   * must not read as "server ran dry", or the snapshot silently truncates.
   */
  async performSnapshotPage() {
    const e = this.mergeObjects(await this.performHttp());
    let t = await this.filterQueuedObjects(e);
    t = await this.filterExpiredObjects(t), t.length > 0 && await this._model.idbClient().save(t);
    const s = e.map((r) => Number(r._localID)).filter(Number.isFinite);
    return {
      fetched: e.length,
      lastLocalID: s.length > 0 ? Math.max(...s) : null
    };
  }
  /**
   * Performs the HTTP list call.
   */
  async performHttp() {
    return (await Promise.all(
      this._urls ? this._urls.map((e) => this.performSingleUrlHttp(e)) : this._clusters.map((e) => this.performSingleClusterHttp(e))
    )).flat();
  }
  /**
   * Performs the single HTTP list call for the given cluster.
   *
   * @param cluster cluster to make list call.
   */
  async performSingleClusterHttp(e) {
    var t, s;
    const r = {};
    for (let a = 0; a < e.options.readURL.length; a++) {
      const i = e.getNextReadURL();
      try {
        let o = [];
        if (this._get)
          o = await yt.get({
            baseUrl: i,
            modelName: this._model.getName(),
            blitzID: this._get,
            query: this._getQuery
          }, this._signal);
        else {
          const l = await yt.list({
            endpoint: {
              baseUrl: i,
              modelName: this._model.getName(),
              query: this._query
            }
          }, this._signal);
          o = l.items || [], Ur.modelCacheUpdate(this._model, l.model);
        }
        for (const l of o) {
          l._clusters = [e.name], l._editURLs = JSON.parse(JSON.stringify(e.options.readURL));
          for (const c in l)
            if (c.endsWith("_fk") && l[c] !== null && typeof l[c] == "object" && l[c]._blitzID) {
              const d = (s = (t = this._model) == null ? void 0 : t.getAttributeDetails(c)) == null ? void 0 : s.type;
              if (d && d !== "_Model" && this.hasLocalDatabase()) {
                const u = await gt.get(d);
                u && await u.idbClient().save([l[c]], !0);
              }
              l[c] = l[c]._blitzID;
            } else
              c.endsWith("_mtm") && Array.isArray(l[c]) && (l[c] = l[c].map((d, u) => ({
                _blitzID: typeof d == "string" ? d : d._blitzID,
                _mtmSort: typeof d == "string" ? (l[c].length - u) * 15 : d._mtmSort
              })));
        }
        return o;
      } catch (o) {
        r[i] = (o == null ? void 0 : o.stack) ?? (o == null ? void 0 : o.message) ?? o;
      }
    }
    throw new Error(`All read URLs failed for cluster "${e.name}". Errors: ${JSON.stringify(r)}`);
  }
  /**
   * Performs the single HTTP list call for the given URL.
   *
   * @param url URL to make list call.
   */
  async performSingleUrlHttp(e) {
    return ((await yt.list({ fullUrl: e }, this._signal)).items || []).map((t) => (t.cluster = [], t._editURLs = [e], t));
  }
  /**
   * Performs IndexedDB list call.
   */
  async performIndexedDb() {
    var e, t;
    const s = this._model.idbClient();
    if (this._get)
      return await s.query({
        conditions: [["_blitzID", "=", this._get]],
        limit: 1,
        var: (e = this._getQuery) == null ? void 0 : e.var,
        manyToMany: (t = this._getQuery) == null ? void 0 : t.manyToMany
      });
    const r = this._urls ? this._urls.map((a) => Rn.extractConditions(a)).flat() : this._query.conditions;
    return await s.query({ ...this._query, conditions: r });
  }
  /**
   * Performs memory list call.
   */
  async performMemory() {
    var e, t;
    const s = this._model.memoryClient();
    if (this._get)
      return await s.query({
        conditions: [["_blitzID", "=", this._get]],
        limit: 1,
        var: (e = this._getQuery) == null ? void 0 : e.var,
        manyToMany: (t = this._getQuery) == null ? void 0 : t.manyToMany
      });
    const r = this._urls ? this._urls.map((a) => Rn.extractConditions(a)).flat() : this._query.conditions;
    return await s.query({ ...this._query, conditions: r });
  }
  /**
   * Merges objects that has the same blitzID.
   *
   * @param objects Objects to be merged.
   *
   * @returns Merged objects.
   */
  mergeObjects(e) {
    const t = [];
    for (const s of e) {
      const r = t.find((a) => a._blitzID === s._blitzID);
      r ? (r._clusters = [...r._clusters, ...s._clusters].filter((a, i, o) => o.indexOf(a) === i), r._editURLs = [...r._editURLs, ...s._editURLs].filter((a, i, o) => o.indexOf(a) === i)) : t.push(s);
    }
    return t;
  }
  /**
   * Filters the objects that are in the queue to be deleted or with uncompleted edits.
   *
   * @param objects Objects to be filtered.
   * @returns Filtered objects.
   */
  async filterQueuedObjects(e) {
    var t;
    const s = await Z.queue.getJobs(), r = [];
    for (const a of e)
      if (!s.find((i) => i.transaction.action === he.Delete && i.transaction.blitzID === a._blitzID))
        if (!s.find((i) => i.transaction.action === he.Edit && i.transaction.blitzID === a._blitzID && i.status === k.Pending))
          r.push(a);
        else {
          const i = await ((t = this._model) == null ? void 0 : t.get({ blitzID: a._blitzID, raw: !0, forceLocal: !0 }));
          i ? r.push(i) : r.push(a);
        }
    return r;
  }
  /**
   * Filters out and deletes the objects that have expired.
   *
   * @param objects Objects to be filtered.
   * @returns Filtered objects.
   */
  async filterExpiredObjects(e) {
    var t;
    const s = le.getCurrentUser();
    if (!s || !s.id)
      return e;
    const r = [];
    try {
      for (const a of e) {
        if (
          // Check if expiration date is present and valid
          typeof a._expiration == "string" && a._expiration !== "" && a._expiration !== "0000-00-00 00:00:00" && // Check if user is not the owner
          s.id !== a._userID
        ) {
          const i = Date.now(), o = new Date(a._expiration).getTime();
          if (i > o) {
            this.hasLocalDatabase() && await ((t = this._model) == null ? void 0 : t.idbClient().delete(a._blitzID));
            continue;
          }
        }
        r.push(a);
      }
    } catch (a) {
      return console.error("Error handling expired objects:", a.stack), e;
    }
    return r;
  }
  /**
   * Whether the current sync level keeps a local database.
   *
   * In the none level list calls must never read from or write to IndexedDB.
   */
  hasLocalDatabase() {
    return Z.options.sync.level !== "none";
  }
  /**
   * Decides whether to send http request or not.
   */
  shouldSendHttpRequest() {
    var e;
    if (Z.options.sync.level !== "cache" || ((e = this._model) == null ? void 0 : e.getName()) === "_Model")
      return !1;
    const t = le.getListCallLastTimeStamp(this.hash());
    return t ? (/* @__PURE__ */ new Date()).getTime() - t > Z.options.sync.ttl : !0;
  }
  /**
   * Calculates hash of the call.
   */
  hash() {
    var e, t;
    return Vl(JSON.stringify({
      clusters: ((e = this._clusters) == null ? void 0 : e.map((s) => s.name)) ?? [],
      blitzId: this._get,
      urls: this._urls,
      modelName: (t = this._model) == null ? void 0 : t.getName(),
      listQuery: this._query,
      getQuery: this._getQuery
    }));
  }
}
class Fr extends kt {
  /**
   * Returns the model of the custom object.
   */
  static async model() {
    if (typeof this.modelName != "string")
      throw new Error(`${this.name}.modelName is not a string, please provide a valid model name.`);
    const e = this.modelName === "_Model" ? at() : await at().get(this.modelName);
    return e.setReturnType(this), e;
  }
  /**
   * Finds an object by given blitz ID.
   *
   * @param blitzID - Blitz ID of the object.
   */
  static async get(e) {
    return (await this.model()).get(e);
  }
  /**
   * Checks whether the object exists in or not.
   *
   * @param blitzID - Blitz ID of the object.
   */
  static async exists(e) {
    return (await this.model()).exists(e);
  }
  /**
   * Performs an `add` transaction.
   *
   * @param data Data to be added.
   * @param clusterNames [Optional] Clusters to add the object.
   */
  static async add(e, t = []) {
    return (await this.model()).add(e, t);
  }
  /**
   * Performs a `list` call with given parameters.
   *
   * @param options Parameters for the list call.
   *
   * @see {@link https://enunt.notion.site/List-Get-c8fd7cebc60f4c75a8039dca4dc639fe}
   */
  static async list(e = {}) {
    return (await this.model()).list(e);
  }
}
O(Fr, "modelName");
const Rr = class an {
  /**
   * Creates a new syncer.
   */
  static create() {
    return new an();
  }
  /**
   * Runs the synchronization process.
   *
   * Every synced model advances independently: one cursor per
   * (model, cluster, stream), so a truncated page in one model can never
   * move another model's cursor past unfetched transactions, and one
   * failing model never blocks the rest.
   */
  async run(e, t) {
    if (navigator.onLine) {
      if (e)
        return this.syncModel(e, t);
      for (const s of await this.syncableModels())
        try {
          await this.syncModel(s, t);
        } catch (r) {
          console.error(`Sync failed for model "${s}":`, (r == null ? void 0 : r.stack) ?? (r == null ? void 0 : r.message) ?? r);
        }
    }
  }
  /**
   * Runs the synchronization at the given interval, forever.
   *
   * When the Web Locks API is available only one tab holds the sync lock;
   * the others wait and take over if the leader closes.
   */
  async runAtInterval(e) {
    var t;
    return typeof navigator < "u" && (t = navigator.locks) != null && t.request && await navigator.locks.request("BlitzData.sync", () => this.loop(e)), this.loop(e);
  }
  /**
   * The interval loop. Fire-and-forget: one failed run (network, storage,
   * a throwing subscriber) must not end syncing for good.
   */
  async loop(e) {
    for (; ; ) {
      await Ja(e);
      try {
        await this.run();
      } catch (t) {
        console.error("Sync run failed:", (t == null ? void 0 : t.stack) ?? (t == null ? void 0 : t.message) ?? t);
      }
    }
  }
  /**
   * Models the sync keeps local: the configured list, or every model whose
   * schema enables logging — the server can only serve change-logs for
   * models with `haslogs` and `hasuserpermissions`.
   */
  async syncableModels() {
    return Z.options.sync.models ? Z.options.sync.models : [
      "_Project",
      ...(await gt.list()).filter((e) => {
        var t, s;
        return this.isTruthyFlag((t = e.haslogs) == null ? void 0 : t.value) && this.isTruthyFlag((s = e.hasuserpermissions) == null ? void 0 : s.value);
      }).map((e) => e.getName()).filter((e) => e.startsWith("bdt") && !["bdt24prszej_appfiles", "bdt24prszej_apps"].includes(e))
    ];
  }
  /**
   * Syncs a single model: bootstrap it if it has no cursors yet, then
   * tail every (cluster, stream) change-log from its own cursor.
   */
  async syncModel(e, t) {
    const s = Z.clusterManager.toArray(), r = t === "delete" ? ["delete"] : ["all", "delete"];
    await this.bootstrap(e, s, r);
    for (const a of s)
      for (const i of r)
        await this.syncStream(a, e, i);
    le.setLastSyncRunAt(Math.floor(Date.now() / 1e3), e);
  }
  /**
   * First contact with a model. Cursors are peeked BEFORE the snapshot
   * downloads, so any change landing during the snapshot stays ahead of
   * the cursor and is replayed by the tail — never skipped. They are
   * persisted only AFTER the snapshot succeeds: a failed snapshot must
   * leave the model un-bootstrapped (retried next run), never
   * trusted-but-empty.
   */
  async bootstrap(e, t, s) {
    const r = [];
    for (const i of t)
      for (const o of s)
        le.getSyncCursor(e, i.name, o) === null && r.push({ cluster: i, stream: o });
    if (r.length === 0)
      return;
    const a = [];
    for (const { cluster: i, stream: o } of r)
      a.push({ cluster: i, stream: o, cursor: await this.peek(i, e, o) });
    Z.options.sync.level === "full" && await this.snapshot(e);
    for (const { cluster: i, stream: o, cursor: l } of a)
      le.setSyncCursor(e, i.name, o, l);
  }
  /**
   * Asks the server for the latest change-log position (`peek=1`) without
   * fetching any transactions. Servers predating the parameter ignore it
   * and answer with their oldest page instead — the tail then replays
   * history, which converges to the same state, just slower.
   */
  async peek(e, t, s) {
    const { lastTimestamp: r, lastLogID: a } = await this.fetchLogs(e, t, s, null, !0);
    return { timestamp: r ?? 0, logID: a };
  }
  /**
   * Downloads the model's complete current state into the local database.
   *
   * The store is cleared first — it is about to become the source of
   * truth, and rows the server deleted long ago must not survive as
   * ghosts. Objects with queued offline adds reappear once the queue
   * posts them and the tail pulls them back.
   *
   * Pages by keyset on `_localID` (unique, in every response, one
   * sequence per cluster). The loop ends only when the server returns a
   * short page — that short page is the completeness proof.
   */
  async snapshot(e) {
    const t = await gt.get(e);
    if (t) {
      await t.idbClient().clear();
      for (const s of Z.clusterManager.toArray()) {
        let r = null;
        for (; ; ) {
          const { fetched: a, lastLocalID: i } = await Et.create().model(t).clusters([s]).raw(!0).query({
            limit: an.SNAPSHOT_PAGE_SIZE,
            customSort: "_localID",
            customSortDirection: "ASC",
            ...r !== null ? { pagination: r } : {}
          }).performSnapshotPage();
          if (a < an.SNAPSHOT_PAGE_SIZE)
            break;
          if (i === null || i === r) {
            console.error(`Snapshot of "${e}" cannot page further (no advancing _localID); it may be incomplete.`);
            break;
          }
          r = i;
        }
      }
    }
  }
  /**
   * Tails one change-log stream: fetch a page, apply it, advance the
   * cursor, repeat until the server echoes the cursor back. With the
   * composite cursor pages resume exactly after (timestamp, logID); on
   * servers without it, rows sharing the boundary timestamp wait for the
   * next transaction to move the clock — degraded, never wedged.
   */
  async syncStream(e, t, s) {
    let r = le.getSyncCursor(t, e.name, s) ?? { timestamp: 0, logID: null };
    for (; ; ) {
      const { transactions: a, lastTimestamp: i, lastLogID: o } = await this.fetchLogs(e, t, s, r);
      if (await this.apply(a), typeof i != "number")
        break;
      const l = { timestamp: i, logID: o }, c = l.timestamp !== r.timestamp || l.logID !== r.logID;
      if (le.setSyncCursor(t, e.name, s, l), r = l, !c || a.length === 0)
        break;
    }
  }
  /**
   * Fetches one page of a model's change-log from one cluster.
   */
  async fetchLogs(e, t, s, r, a = !1) {
    const i = await yt.listLogs({
      baseUrl: e.getNextReadURL(),
      model: t,
      type: s === "delete" ? "delete" : void 0,
      query: a ? { peek: !0 } : {
        from: (r == null ? void 0 : r.timestamp) ?? 0,
        ...(r == null ? void 0 : r.logID) != null ? { afterLog: r.logID } : {}
      }
    });
    return {
      transactions: (i.transactions ?? []).filter((o) => typeof o == "object" && !Array.isArray(o) && o !== null && typeof o.hash == "string").filter((o, l, c) => c.findIndex((d) => d.hash === o.hash) === l),
      lastTimestamp: i.lastTimestamp ?? null,
      lastLogID: typeof i.lastLogID == "number" ? i.lastLogID : null
    };
  }
  /**
   * Applies fetched transactions to the local database and, with
   * `sync.live`, surfaces them to running subscribers.
   */
  async apply(e) {
    var t;
    const s = await this.withoutEvaluated(e);
    if (s.length === 0)
      return;
    const r = _n.create();
    await r.putMultiple(s);
    const a = (await r.all()).map((o) => Fe.fromObject(o)), i = await Qe.create().run(a);
    if (Z.options.sync.live === !0) {
      const o = /* @__PURE__ */ new Set();
      for (const l of a)
        if (((t = i.get(l.hash)) == null ? void 0 : t.status) === Le.Success)
          try {
            const c = await gt.get(l.model), d = `${l.model}:${l.blitzID}:${l.action}`;
            await (c == null ? void 0 : c.memoryClient().applyTransaction(l, !o.has(d))), o.add(d);
          } catch (c) {
            console.error(`Live emission failed for transaction ${l.hash}:`, (c == null ? void 0 : c.stack) ?? (c == null ? void 0 : c.message) ?? c);
          }
    }
  }
  /**
   * Drops transactions already in the evaluated ledger: own writes echoed
   * back by the server, rows another cluster already delivered, and
   * boundary rows re-served by servers without the composite cursor.
   */
  async withoutEvaluated(e) {
    if (e.length === 0)
      return e;
    const t = await new rt().openConnection(), s = [];
    for (const r of e)
      await t.get("evaluated_transactions", r.hash) === void 0 && s.push(r);
    return t.close(), s;
  }
  /**
   * Model schema flags arrive as '1'/1/true depending on server version.
   */
  isTruthyFlag(e) {
    return e === !0 || e === 1 || e === "1";
  }
};
O(Rr, "SNAPSHOT_PAGE_SIZE", 1e3);
let Bn = Rr;
const Wr = class Br extends Fr {
  /**
   * Constructor.
   *
   * @param options Model options.
   */
  constructor({ model: e, attributes: t }) {
    super({ model: e, attributes: t }), O(this, "clusterManager"), O(this, "lastTransactionHash", null), O(this, "returnType", kt), this.clusterManager = Z.clusterManager;
  }
  /**
   * Returns the model indexed db connection.
   */
  idbClient() {
    return new Qa(this);
  }
  /**
   * Returns the model memory connection.
   */
  memoryClient() {
    return new Ls(this);
  }
  /**
   * Returns the model name.
   */
  getName() {
    return this._attributes._blitzID.value;
  }
  /**
   * Returns the last transaction hash.
   */
  getLastTransactionHash() {
    return this.lastTransactionHash;
  }
  /**
   * Sets the last transaction hash.
   */
  setLastTransactionHash(e) {
    this.lastTransactionHash = e;
  }
  /**
   * Sets the return type of the model.
   */
  setReturnType(e) {
    this.returnType = e;
  }
  /**
   * Checks whether the object exists in or not.
   *
   * @param blitzID - Blitz ID of the object.
   */
  async exists(e) {
    return !!await this.get(e);
  }
  /**
   * Performs an `add` transaction.
   *
   * @param data Data to be added.
   * @param clusterNames [Optional] Clusters to add the object.
   */
  async add(e, t = []) {
    const s = this.resolveClusters(t), r = this.getAttributesDetails() ?? {}, a = new Fe({
      action: "add",
      data: Re.serialize(Re.unserialize(r, e)),
      model: this.getName()
    }), i = await Z.getCurrentUser(), o = a.clone();
    o.data = { ...o.data, _userID: i.id };
    const l = await Qe.create().run([o]);
    if (l[0].status !== Le.Success)
      throw new Error(l[0].message ?? "Unknown Error! Please try again.");
    for (const c of s)
      for (const d of c.options.addURL)
        await Z.queue.addJob(d, a.toObject());
    return this.memoryClient().emit(a), this.setLastTransactionHash(a.hash), zr.create(this.returnType, this, o.data);
  }
  /**
   * Finds an object by given blitz ID.
   *
   * @param blitzID - Blitz ID of the object.
   */
  async get(e) {
    const t = typeof e == "string" ? { blitzID: e } : e, s = (await Et.create().model(this).clusters(this.resolveClusters(t.clusters ?? [])).raw(t.raw ?? !1).get(t.blitzID).query({
      returnType: this.returnType ?? kt
    }).forceHttp(t.forceHttp ?? !1).forceLocal(t.forceLocal ?? !1).skipCacheUpdateIfFound(t.skipCacheUpdateIfFound ?? !1).signal(t.signal).getQuery(t.query ?? {}).perform())[0] ?? null;
    if (!s && this.returnType === Br)
      throw new Error(`Model with blitzID "${e}" does not exists or you don't have enough permission to view it.`);
    return s || null;
  }
  /**
   * Performs a `list` call with given parameters.
   *
   * @param options Parameters for the list call.
   *
   * @see {@link https://enunt.notion.site/List-Get-c8fd7cebc60f4c75a8039dca4dc639fe}
   */
  async list(e = {}) {
    return await Et.create().model(this).clusters(this.resolveClusters(e.clusters ?? [])).raw(e.raw ?? !1).query({
      conditions: e.conditions,
      limit: e.limit,
      returnType: e.returnType ?? this.returnType ?? kt,
      customSort: e.customSort,
      customSortDirection: e.customSortDirection,
      pagination: e.pagination,
      var: e.var,
      manyToMany: e.manyToMany
    }).forceHttp(e.forceHttp ?? !1).forceLocal(e.forceLocal ?? !1).skipCacheUpdateIfFound(e.skipCacheUpdateIfFound ?? !1).signal(e.signal).perform();
  }
  /**
   * Subscribe to a list call.
   *
   * @param options Parameters for the list call.
   * @param callback Callback to receive result updates.
   * @param sequence Enable sequence mode | Defaults to false.
   * @returns Unsubscribe function
   */
  subscribeToList(e = {}, t, s = !1) {
    const r = Et.create().model(this).clusters(this.resolveClusters(e.clusters ?? [])).raw(e.raw ?? !1).query({
      conditions: e.conditions,
      limit: e.limit,
      returnType: e.returnType ?? this.returnType ?? kt,
      customSort: e.customSort,
      customSortDirection: e.customSortDirection,
      var: e.var,
      manyToMany: e.manyToMany
    }).forceHttp(e.forceHttp ?? !1).forceLocal(e.forceLocal ?? !1).skipCacheUpdateIfFound(e.skipCacheUpdateIfFound ?? !1).performSignal(s), a = r.subscribe(t, r.get() !== null), i = Ls.channel.filterPipe((o) => o.model === this.getName()).subscribe((o) => {
      if (o.action === he.Add)
        this.list({ ...e, forceLocal: !0 }).then((l) => {
          const c = e.raw ? l.findIndex((d) => d._blitzID === o.blitzID) : l.findIndex((d) => d.getAttribute("_blitzID").value === o.blitzID);
          c > -1 && r.set({
            items: l,
            update: {
              action: he.Add,
              object: l[c],
              index: c
            }
          });
        });
      else if (o.action === he.Edit) {
        const l = r.get();
        if (!l)
          return;
        const c = e.raw ? l.items.findIndex((d) => d._blitzID === o.blitzID) : l.items.findIndex((d) => d.getAttribute("_blitzID").value === o.blitzID);
        c > -1 && this.list({ ...e, forceLocal: !0 }).then((d) => {
          const u = e.raw ? d.findIndex((f) => f._blitzID === o.blitzID) : d.findIndex((f) => f.getAttribute("_blitzID").value === o.blitzID);
          r.set({
            items: d,
            update: {
              action: he.Edit,
              object: u > -1 ? d[u] : l.items[c],
              index: u > -1 ? u : c
            }
          });
        });
      } else if (o.action === he.Delete) {
        const l = r.get();
        if (!l)
          return;
        if (e.raw) {
          const c = l.items.findIndex((d) => d._blitzID === o.blitzID);
          c > -1 && r.set({
            items: l.items.filter((d) => d._blitzID !== o.blitzID),
            update: {
              action: he.Delete,
              object: l.items[c],
              index: c
            }
          });
        } else {
          const c = l.items.findIndex((d) => d.getAttribute("_blitzID").value === o.blitzID);
          c > -1 && r.set({
            items: l.items.filter((d) => d.getAttribute("_blitzID").value !== o.blitzID),
            update: {
              action: he.Delete,
              object: l.items[c],
              index: c
            }
          });
        }
      }
    });
    return () => {
      a(), i();
    };
  }
  /**
   * Syncs the model
   */
  //24-10-24 ANAS: https://app.clickup.com/9015135156/v/dc/8cng2xm-30175/8cng2xm-33435
  async sync() {
    const e = this.getName();
    if (e) {
      const t = Date.now() / 1e3, s = le.getLastSyncRunAt(e) ?? 0, r = 30;
      t - s > r && await Bn.create().run(e);
    }
  }
  /**
   * Returns attribute information for all attributes.
   */
  getAttributesDetails() {
    var e;
    return ((e = this._attributes.attributes) == null ? void 0 : e.value) ?? null;
  }
  /**
   * Returns attribute information by given attribute name.
   *
   * @param name Name of the attribute to get information about.
   */
  getAttributeDetails(e) {
    var t, s;
    return ((s = (t = this._attributes.attributes) == null ? void 0 : t.value) == null ? void 0 : s[e]) ?? null;
  }
  /**
   * Returns attribute information for the system attributes every object
   * carries regardless of schema (`_userID`, `_blitzID`, `_modified`, …).
   *
   * Deliberately separate from getAttributesDetails(): schema iterators
   * (add forms, grids) must not suddenly see system fields. Consumers that
   * want them (e.g. a filter form) opt in through this accessor.
   */
  getSystemAttributesDetails() {
    return Object.fromEntries(
      Object.entries(Er).map(([e, t]) => [e, { ...t }])
    );
  }
  /**
   * Resolves clusters by given names.
   *
   * @param clusterNames Names to resolve.
   */
  resolveClusters(e) {
    return Object.values(
      e.length === 0 ? this.clusterManager.all() : this.clusterManager.get(e)
    );
  }
  /**
   * Sets custom clusters for the model.
   *
   * @param clusters Clusters to set.
   */
  setClusters(e) {
    this.clusterManager = new mr();
    const t = Fn.transformClusterOptions(e);
    for (const s of Object.keys(t))
      this.clusterManager.register(s, t[s]);
  }
  /**
   * Returns the cluster manager of the model.
   */
  getClusterManager() {
    return this.clusterManager;
  }
  static async get(e) {
    return super.get(e);
  }
  static async list(e = {}) {
    return super.list(e);
  }
};
O(Wr, "modelName", "_Model");
let gt = Wr;
class Gl {
  //Constructor
  constructor(e) {
    O(this, "_db"), this._db = e;
  }
  //Update job
  async _updateJob(e) {
    var t;
    return await ((t = this._db) == null ? void 0 : t.put(ce.store, e)), e;
  }
  //Delete job
  async _deleteJob(e) {
    var t;
    await ((t = this._db) == null ? void 0 : t.delete(ce.store, e.id));
  }
  //Get future jobs
  async _getFutureJobs(e) {
    var t;
    const s = [], r = (t = this._db) == null ? void 0 : t.transaction(ce.store, "readonly").store, a = IDBKeyRange.lowerBound(e.createdAt, !0);
    let i = await (r == null ? void 0 : r.index(ce.timeIndex).openCursor(a, "next"));
    for (; i; )
      i.value.url === e.url && //Only same object jobs
      i.value.transaction.blitzID === e.transaction.blitzID && s.push(i.value), i = await i.continue();
    return s;
  }
  //Retry jobs
  async retry(e) {
    for (const t of e)
      await this._updateJob({
        ...t,
        status: k.Pending
      });
  }
  //Revert jobs
  async revert(e) {
    var t, s;
    e.sort((a, i) => a.createdAt - i.createdAt);
    const r = e[0];
    if (r) {
      if (r.transaction.action === he.Add) {
        await Qe.create().run([
          new Fe({
            action: "delete",
            model: r.transaction.model,
            blitzID: r.transaction.blitzID
          })
        ]);
        const a = await this._getFutureJobs(r);
        for (const i of [r, ...a])
          await this._deleteJob(i);
      } else if (r.transaction.action === he.Delete)
        await this._deleteJob(r), await gt.get(r.transaction.model).then((a) => a == null ? void 0 : a.get(r.transaction.blitzID));
      else if (r.transaction.action === he.Edit) {
        const a = Object.keys(r.transaction.data ?? {})[0];
        if (!a || ((t = r.transaction.data) == null ? void 0 : t[a].new) === void 0 || ((s = r.transaction.data) == null ? void 0 : s[a].prev) === void 0)
          return;
        const i = new Fe({
          action: "edit",
          model: r.transaction.model,
          blitzID: r.transaction.blitzID,
          data: {
            [a]: {
              prev: r.transaction.data[a].new,
              new: r.transaction.data[a].prev
            }
          }
        });
        await Qe.create().run([i]);
        for (const o of e)
          await this._deleteJob(o);
      }
    }
  }
  //Drop jobs from the queue without touching local state (developer escape hatch)
  async drop(e) {
    for (const t of e)
      await this._deleteJob(t);
  }
  //Get all failed/conflict jobs grouped by server URL
  async getAll() {
    var e;
    const t = {}, s = (e = this._db) == null ? void 0 : e.transaction(ce.store, "readonly").store;
    let r = await (s == null ? void 0 : s.index(ce.timeIndex).openCursor(null, "next"));
    for (; r; ) {
      if (
        //Only unresolved jobs
        r.value.status !== k.Completed
      ) {
        if (t[r.value.url] || (t[r.value.url] = []), r.value.transaction.action === he.Add || r.value.transaction.action === he.Delete)
          t[r.value.url].push([r.value]);
        else if (r.value.transaction.action === he.Edit) {
          const a = Object.keys(r.value.transaction.data ?? {})[0], i = r.value.transaction.blitzID, o = t[r.value.url].findIndex((l) => l[0].transaction.action === he.Edit && l[0].transaction.blitzID === i && Object.keys(l[0].transaction.data ?? {})[0] === a);
          o === -1 ? t[r.value.url].push([r.value]) : t[r.value.url][o].push(r.value);
        }
      }
      r = await r.continue();
    }
    return t;
  }
}
class ec {
  constructor(e) {
    O(this, "_alerted", /* @__PURE__ */ new Set()), O(this, "_listener", null), this._effects = e;
  }
  /**
   * Register the app's conflict handler; it replaces the built-in prompt.
   * Returns an unregister function. Register before (or in the same tick as)
   * the first sweep — right after `BlitzData.initialize()` is in time.
   */
  onConflict(e) {
    return this._listener = e, () => {
      this._listener === e && (this._listener = null);
    };
  }
  /** A worker verdict just arrived: dispatch the event, then alert. */
  notifyConflict(e) {
    e.message !== void 0 && (this._effects.dispatch("queue:conflict", e), this._alert(e));
  }
  /** Re-surface unresolved jobs that were never alerted (missed prompts, reloads). */
  sweep(e) {
    for (const t of e)
      this._alerted.has(t.id) || (t.status === k.Failed ? (this._alerted.add(t.id), this._effects.dispatch("queue:failure", t)) : t.status === k.Conflict && t.message !== void 0 && (this._effects.dispatch("queue:conflict", t), this._alert(t)));
  }
  /** A conflict got resolved — a later re-conflict of the same job must alert again. */
  resolved(e) {
    this._alerted.delete(e);
  }
  _alert(e) {
    this._alerted.has(e.id) || (this._listener ? (this._alerted.add(e.id), this._listener(e, {
      force: () => this._effects.resolve(e, !0),
      revert: () => this._effects.resolve(e, !1)
    })) : this._effects.isHidden() || (this._alerted.add(e.id), this._effects.prompt(e)));
  }
}
class tc {
  constructor() {
    O(this, "_db", null), O(this, "conflictHandler", null), O(this, "failedHandler", null), O(this, "notifier", new ec({
      dispatch: (e, t) => Z.dispatchEvent(e, t),
      prompt: (e) => {
        var t;
        return ((t = this.conflictHandler) == null ? void 0 : t.prompt(e)) ?? Promise.resolve();
      },
      resolve: (e, t) => {
        var s;
        return ((s = this.conflictHandler) == null ? void 0 : s.resolve(e, t)) ?? Promise.resolve();
      },
      isHidden: () => document.hidden
    }));
  }
  /**
   * Replace the built-in conflict prompt with the app's own handler. The handler
   * receives the job and `{force, revert}` resolvers. Register right after
   * `BlitzData.initialize()` — the init sweep is deferred one task so a listener
   * registered in the same tick wins over the default prompt. Returns unregister.
   */
  onConflict(e) {
    return this.notifier.onConflict(e);
  }
  /**
   * Surface unresolved Conflict/Failed jobs that were never alerted this session.
   * Runs after init and whenever the tab becomes visible, so a conflict detected
   * while hidden (or before a reload) is deferred, never lost.
   */
  async sweepUnresolved() {
    this.notifier.sweep(await this.getJobs() ?? []);
  }
  // Handle worker message
  _handleWorkerMessage(e) {
    const t = e.data.job;
    t.status === k.Completed ? Z.dispatchEvent("queue:success", t) : t.status === k.Failed ? Z.dispatchEvent("queue:failure", t) : t.status === k.Conflict && Z.queue.notifier.notifyConflict(t), Z._Model.get(t.transaction.model).then((s) => {
      var r;
      return (r = s == null ? void 0 : s.memoryClient().get(t.transaction.blitzID)) == null ? void 0 : r.dispatchEvent("syncStatusChange", t);
    }), Z.queue.updateSyncStatus(t);
  }
  /**
   * Recompute an edited attribute's save-state from its jobs and emit it on the
   * attribute's `_syncSignal`: Failed if any job failed, else Conflict (preferring
   * the resolvable one carrying the server message), else Completed when all jobs
   * completed, else Pending. Pass `status` to short-circuit with a known value.
   * Save-state is derived from the queue — there is no separate dirty flag.
   */
  async updateSyncStatus(e, t) {
    var s, r, a, i;
    if (e.transaction.action !== he.Edit)
      return;
    const o = await Z._Model.get(e.transaction.model), l = o == null ? void 0 : o.memoryClient().get(e.transaction.blitzID);
    if (!l)
      return;
    const c = Object.keys(e.transaction.data ?? {})[0];
    if (!c)
      return;
    const d = l[c];
    if (t)
      (s = d == null ? void 0 : d._syncSignal) == null || s.set({ status: t }), (r = l._syncSignal) == null || r.set({ status: t });
    else {
      const u = await Z.queue.getJobsForObject(e.transaction.blitzID);
      (a = d == null ? void 0 : d._syncSignal) == null || a.set(Bt(u, c)), (i = l._syncSignal) == null || i.set(Bt(u));
    }
  }
  /**
   * Open the queue database and start the processor. In dev the worker is Vite's
   * `?sharedworker` module; in production it is the consumer-hosted file at
   * `options.queue.workerPath` — every deployment must host it (the default
   * `/queue-worker.js` rarely exists). A worker load failure degrades to a
   * same-thread processor with a console warning: delivery still works, but tabs
   * no longer share one processor. Auth headers (global + origin-scoped) are pushed
   * into the worker now and on every change so queued posts stay authenticated.
   */
  async init() {
    if (this._db = await Dt(ce.name, 1, {
      upgrade: (s) => {
        const r = s.createObjectStore(ce.store, { keyPath: "id" });
        r.createIndex(ce.timeIndex, "createdAt"), r.createIndex(ce.objectIndex, "transaction.blitzID");
      }
    }), !this._db.objectStoreNames.contains(ce.store))
      return await Gn(ce.name), await this.init();
    this.conflictHandler = new Ya(this._db), this.failedHandler = new Gl(this._db);
    const e = new Wa(
      Z.options.queue.workerPath,
      { name: "bd-queue-worker" }
    );
    e.onerror = () => {
      console.warn("⚠️ Failed to run the queue's shared worker, please check that the worker path is correct, falling back to running on the same thread!"), new wr(
        (s) => this._handleWorkerMessage(s),
        je._globalHeaders,
        je._scopedHeaders
      ).start();
    }, e.port.onmessage = this._handleWorkerMessage, window.addEventListener("beforeunload", () => e.port.postMessage({ type: "close" }));
    const t = () => {
      e.port.postMessage({ type: "headers", data: je._globalHeaders }), e.port.postMessage({ type: "scopedHeaders", data: je._scopedHeaders });
    };
    return t(), je.onGlobalHeadersChange(t), setTimeout(() => void this.sweepUnresolved(), 0), document.addEventListener("visibilitychange", () => {
      document.hidden || this.sweepUnresolved();
    }), this;
  }
  // Add job to queue worker
  async addJob(e, t) {
    var s;
    const r = {
      id: crypto.randomUUID(),
      url: e,
      transaction: t,
      status: k.Pending,
      createdAt: Date.now(),
      attempts: 0,
      priority: 1
    };
    await ((s = this._db) == null ? void 0 : s.add(ce.store, r)), await this.updateSyncStatus(r, r.status);
  }
  // Delete job from queue worker
  async deleteJob(e) {
    var t;
    await ((t = this._db) == null ? void 0 : t.delete(ce.store, e.id));
  }
  // Get all jobs
  async getJobs() {
    var e;
    return await ((e = this._db) == null ? void 0 : e.getAll(ce.store));
  }
  // Get all jobs for an object
  async getJobsForObject(e) {
    var t;
    const s = await ((t = this._db) == null ? void 0 : t.getAllFromIndex(ce.store, ce.objectIndex, e));
    return s.sort((r, a) => r.createdAt - a.createdAt), s;
  }
}
const mt = class Ie {
  /**
   * _Model instance. Stored in ModelRegistry so low-level modules can
   * reach it without importing this module.
   */
  static get _Model() {
    return at();
  }
  static set _Model(e) {
    Va(e);
  }
  /**
  * Queue instance. Stored in QueueRegistry so low-level modules can
  * reach it without importing this module.
  */
  static get queue() {
    return pt();
  }
  static set queue(e) {
    Za(e);
  }
  /**
   * Version of the library.
   *
   * Please update on every version.
   * Follows Semantic Versioning (semver) convention:
   * MAJOR.MINOR.PATCH where:
   * - MAJOR version for incompatible API changes
   * - MINOR version for backwards-compatible functionality
   * - PATCH version for backwards-compatible bug fixes
   *
   * {@link https://semver.org/}
   */
  static get VERSION() {
    return "1.8.0";
  }
  /**
   * Initializes BlitzData with given options.
   */
  static async initialize(e) {
    if (this.initialized) {
      console.log("%c⚠️ Warning: Library has already been initialized! Skipping the initialization steps.", "background: #FFF3CD; color: #856404; font-weight: bold;"), console.groupCollapsed("%cStack Trace", "background: #FFF3CD; color: #856404; font-weight: bold; font-style: italic;"), console.log("Options", e), console.trace(), console.groupEnd();
      return;
    }
    this.initialized = !0;
    const t = Fn.transformBlitzDataOptions(e);
    this.options = t, t.clusters && Ie.setClusters(t.clusters), await new Ur(this.options.flush).perform(), await new rt().ping(), this.queue = await new tc().init(), Ie._Model = new gt({
      model: void 0,
      attributes: {
        _blitzID: new Ft("_blitzID", "string", "_Model"),
        searchable: new Ft("searchable", "json", void 0),
        attributes: new Ft("attributes", "json", {
          name: {
            label: "Name",
            type: "varchar"
          },
          label: {
            label: "Label",
            type: "texti18n"
          },
          modelpermission: {
            label: "Model Permission",
            type: "tinyint"
          },
          hasuserpermissions: {
            label: "Has User Permissions",
            type: "boolean"
          },
          subscriberemails: {
            label: "Subscriber Emails",
            type: "text"
          },
          haslogs: {
            label: "Has Logs",
            type: "boolean"
          },
          cache: {
            label: "Cache",
            name: "cache",
            type: "boolean"
          },
          hasprojects: {
            label: "Has Projects",
            type: "boolean"
          },
          attributes: {
            label: "Attributes",
            type: "json"
          },
          objectpermissionoptions: {
            label: "Object Permission Options",
            type: "int"
          },
          haspublishingdate: {
            label: "Has Publishing Date",
            type: "boolean"
          }
        }),
        _editURLs: new Ft("_editURLs", "json", []),
        haspublishingdate: new $r("haspublishingdate", "boolean", !1)
      }
    }), Ie._Model.setReturnType(gt), e && typeof e != "string" && !Array.isArray(e) && e.uiManager && (this.ui = new e.uiManager(this, e.uiManagerSettings));
    try {
      await Ie.getCurrentUser();
    } catch (s) {
      console.error("Error fetching current user:", s.stack);
    }
    if (t.sync.level === "full") {
      const s = Bn.create();
      Ie.syncReady = s.run().catch((r) => {
        console.error("Initial sync failed:", (r == null ? void 0 : r.stack) ?? (r == null ? void 0 : r.message) ?? r);
      }), t.sync.background !== !0 && await Ie.syncReady, s.runAtInterval(t.sync.interval);
    } else if (t.sync.level === "cache") {
      const s = Bn.create();
      Ie.syncReady = s.run(void 0, "delete").catch((r) => {
        console.error("Initial sync failed:", (r == null ? void 0 : r.stack) ?? (r == null ? void 0 : r.message) ?? r);
      }), await Ie.syncReady;
    }
  }
  /**
   * Registers clusters.
   */
  static setClusters(e) {
    e = Fn.transformClusterOptions(e);
    for (const t of Object.keys(e))
      Ie.clusterManager.register(t, e[t]);
  }
  /**
   * Performs a list call to the server by given URL.
   *
   * @param url
   */
  static async list(e) {
    const t = Rn.extractModelName(e);
    if (!await Ie._Model.exists(t))
      throw new Error(`Model "${t}" does not exist.`);
    return Et.create().model(await Ie._Model.get(t)).urls([e]).query({}).perform();
  }
  /**
   * Performs an image upload
   *
   * @param file File to be uploaded.
   */
  static async uploader(e) {
    return await yt.upload({
      baseUrl: Ie.clusterManager.toArray()[0].getNextReadURL(),
      image: e
    });
  }
  /**
   * Performs a video upload
   *
   * @param file File to be uploaded.
   */
  static async uploaderVideo(e) {
    return await yt.uploadVideo({
      baseUrl: Ie.clusterManager.toArray()[0].getNextReadURL(),
      video: e
    });
  }
  /**
   * Performs a file upload
   *
   * @param file File to be uploaded.
   */
  static async uploaderFile(e) {
    return await yt.uploadFile({
      baseUrl: Ie.clusterManager.toArray()[0].getNextReadURL(),
      file: e
    });
  }
  /**
   * Runs a server controller by path.
   *
   * @param path Controller path (e.g. `/blitzpm/somescript` or `blitzpm/somescript.json`).
   * @param options Optional request parameters.
   */
  static async runController(e, t) {
    let s = e.startsWith("/") ? e.slice(1) : e;
    s.includes(".json") || (s += ".json");
    const r = Me.sanitizeBaseUrl(Ie.clusterManager.toArray()[0].getNextReadURL()), a = new URL(r).origin !== window.location.origin ? s.includes("?") ? "&enableCors=1" : "?enableCors=1" : "", i = je.create().url(r + s + a).method((t == null ? void 0 : t.method) ?? "GET").header("Accept", "application/json");
    t != null && t.headers && i.headers(t.headers), (t == null ? void 0 : t.body) !== void 0 && i.body(t.body), t != null && t.signal && i.signal(t.signal);
    const o = await i.send(t == null ? void 0 : t.rawResponse);
    if (!(t != null && t.rawResponse) && o.error)
      throw new Error(o.error);
    return o;
  }
  /**
   * List users for a given project.
   *
   * @param _blitzID
   */
  static async listProjectUsers(e) {
    if (!e)
      throw new Error("Project ID required!");
    const t = le.getProjectUsers(e);
    if (t !== null && typeof t == "object") {
      const o = Date.now(), l = 864e5;
      if (o < t.lastSaved + l)
        return t.users;
    }
    const s = Me.sanitizeBaseUrl(Ie.clusterManager.toArray()[0].getNextReadURL()), r = new URL(s).origin !== window.location.origin ? "?enableCors=1" : "", a = await je.create().url(s + `api/listProjectUsers/${e}.json${r}`).get();
    if (a.error)
      throw new Error(a.error);
    if (a.errors instanceof Array && a.errors.length > 0)
      throw new Error(a.errors.map((o) => o.message || o).join(" | "));
    const i = {
      lastSaved: Date.now(),
      users: (a.users || []).map((o) => ({ id: o._blitzID, username: o.username }))
    };
    return le.setProjectUsers(e, i), i.users;
  }
  /**
   * Get current user.
   */
  static async getCurrentUser() {
    var e;
    const t = le.getCurrentUser();
    if (t)
      return t;
    const s = Me.sanitizeBaseUrl(Ie.clusterManager.toArray()[0].getNextReadURL()), r = new URL(s).origin !== window.location.origin ? "?enableCors=1" : "", a = await je.create().url(s + "api/ping.json" + r).get();
    if (a.error)
      throw new Error(a.error);
    if (!a.userhash) {
      const c = { id: "public", username: "Public" };
      return le.setCurrentUser(c), c;
    }
    const i = await gt.get("0BAUsers"), o = await (i == null ? void 0 : i.get(a.userhash));
    if (!o || !((e = o.username) != null && e.value))
      throw new Error("Could not get user object!");
    const l = { id: a.userhash, username: o.username.value };
    return le.setCurrentUser(l), l;
  }
  /**
   * Clean up current user.
   */
  static refreshCurrentUser() {
    le.setCurrentUser(null);
  }
  /**
   * Adds event listener to the BlitzData.
   *
   * @param type Event type.
   * @param callback Callback function.
   */
  static addEventListener(e, t) {
    this.listeners.has(e) || this.listeners.set(e, []), this.listeners.get(e).push(t);
  }
  /**
   * Checks whether an event has at least one listener or not.
   *
   * @param type
   */
  static hasEventListener(e) {
    return this.listeners.has(e) ? this.listeners.get(e).length > 0 : !1;
  }
  /**
   * Removes an event listener from the BlitzData.
   *
   * @param type Event type.
   * @param callback Callback function.
   */
  static removeEventListener(e, t) {
    this.listeners.has(e) && this.listeners.set(e, this.listeners.get(e).filter((s) => t !== s));
  }
  /**
   * Dispatches events to callbacks.
   *
   * @param type Event name.
   * @param job Job to be dispatched.
   */
  static dispatchEvent(e, t) {
    this.listeners.has(e) && this.listeners.get(e).forEach((s) => s(t));
  }
};
O(mt, "clusterManager", new mr()), /**
* Cache of loaded objects (model => (blitzID => object)).
*/
O(mt, "objects", /* @__PURE__ */ new Map()), /**
* Options of the BlitzData.
*/
O(mt, "options"), /**
* UI manager instance.
*/
O(mt, "ui"), /**
* Event listeners.
*/
O(mt, "listeners", /* @__PURE__ */ new Map()), /**
* Whether library initialized or not.
*/
O(mt, "initialized", !1), /**
* Settles when the first sync pass completes. With `sync.background`
* initialization returns immediately and apps await this instead.
*/
O(mt, "syncReady", Promise.resolve());
let Z = mt;
function We(n, e) {
  const {
    trigger: t = Ee.OnChange,
    multiple: s,
    label: r,
    placeholder: a,
    iconSvg: i,
    type: o,
    pattern: l,
    errorMsg: c,
    initialValue: d,
    className: u,
    onChange: f
  } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const m = typeof n == "string" ? document.getElementById(n) : n;
  if (!(m instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const h = wn(
    () => P.value,
    f,
    (x) => !l || l.test(x)
  ), p = s ? Ee.OnSubmit : t;
  let y = !1, v = null, g = -1, w = s ? d instanceof Array ? d : typeof d == "string" ? [d] : [] : [];
  const S = qe(m, "bd-text-input", u);
  m.innerHTML = `<div class="container">
        ${r ? `<p class="label">${r}</p>` : ""}
        <input class="input" type="${o || "text"}" ${d && !s ? `value="${d}"` : ""}
            ${a ? `placeholder="${a}"` : ""} />
        ${l ? `<p class="error-msg" style="display: none;">${c ?? "Wrong value!"}</p>` : ""}
        ${i ? `<div class="icon">${i}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${p === Ee.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
        ${s ? '<div class="multi-values"></div>' : ""}
    </div>`;
  const $ = m.querySelector(".container"), P = m.querySelector(".input"), M = m.querySelector(".error-msg"), b = m.querySelector(".submit"), j = m.querySelector(".multi-values"), E = m.querySelector(".icon"), L = m.querySelector(".actions"), _ = m.querySelector(".sync-status");
  if (i && (P.style.paddingLeft = "34px"), r && (E && (E.style.top = "34px"), L.style.top = "34px"), p !== Ee.OnSubmit) {
    h.prime();
    const x = () => {
      const C = !l || l.test(P.value);
      return M && (M.style.display = C ? "none" : ""), C;
    };
    P.addEventListener("input", () => {
      x() && p === Ee.OnChange && h.schedule();
    }), P.addEventListener("blur", () => {
      x() && h.commit();
    }), s || P.addEventListener("keydown", (C) => {
      if (C.key === "Escape") {
        h.cancel(), P.value = h.lastValue() ?? "", x(), P.blur();
        return;
      }
      C.key === "Enter" && (x() && h.commit(), Xe(m));
    });
  } else
    b && (P.oninput = () => {
      y = !0, P.style.paddingRight = "34px", b.innerHTML = bt.SAVE, b.style.cursor = "pointer", b.style.display = "";
    }, P.onkeyup = (x) => {
      x.key === "Enter" && b.onclick && b.onclick({});
    }, b.onclick = () => {
      y && (!l || l.test(P.value) ? (M && (M.style.display = "none"), f && (y = !1, b.innerHTML = bt.DONE, b.style.cursor = "initial", s ? (w.push(P.value), P.value = "", H(), f(w)) : (f(P.value), Xe(m)))) : M && (M.style.display = ""));
    });
  const A = (x) => {
    var C;
    x && (x.status === k.Completed && !v || (v = x.status, g > -1 && (clearTimeout(g), g = -1), _.style.display = "initial", _.style.cursor = "initial", _.onclick = null, x.status === k.Pending ? (_.innerHTML = "&#xe91e;", _.style.color = "#d5d5d5") : x.status === k.Failed ? (_.innerHTML = "&#xe91a;", _.style.color = "#a82e25", (C = x.job) != null && C.message && (_.style.cursor = "pointer", _.onclick = (z) => {
      var J;
      z.stopPropagation(), alert((J = x.job) == null ? void 0 : J.message);
    })) : x.status === k.Conflict ? (_.innerHTML = "&#xe91d;", _.style.color = "#a82e25", _.title = "Conflict") : x.status === k.Completed && (_.innerHTML = "&#xe91c;", _.style.color = "#0ac96a", g = window.setTimeout(() => {
      _.style.display = "none", g = -1;
    }, 1e3))));
  }, H = () => {
    if (j) {
      j.innerHTML = w.map((x) => `<p class="multi-item">${x} <span value="${x}">x</span></p>`).join(`
`);
      for (const x of j.querySelectorAll("span"))
        x.onclick = (C) => {
          w = w.filter((z) => z !== C.currentTarget.getAttribute("value")), f && f(w), H();
        };
    }
  };
  return s && H(), {
    handleSyncStatus: A,
    destroy: () => {
      p !== Ee.OnSubmit && !s && h.commit(), $.remove(), S();
    }
  };
}
function Mt(n, e) {
  const {
    trigger: t = Ee.OnChange,
    multiple: s,
    label: r,
    placeholder: a,
    iconSvg: i,
    rows: o = 10,
    resize: l = !0,
    initialValue: c,
    className: d,
    onChange: u
  } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const f = typeof n == "string" ? document.getElementById(n) : n;
  if (!(f instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let m = s ? void 0 : c, h = -1;
  const p = () => {
    h > -1 && (clearTimeout(h), h = -1);
  }, y = u ? (C) => {
    p(), h = setTimeout(() => {
      h = -1, m = C, u(C);
    }, 500);
  } : void 0, v = s ? Ee.OnSubmit : t;
  let g = !1, w = null, S = -1, $ = s ? c instanceof Array ? c : typeof c == "string" ? [c] : [] : [];
  const P = qe(f, "bd-textarea-input", d);
  f.innerHTML = `<div class="container">
        ${r ? `<p class="label">${r}</p>` : ""}
        <textarea class="input" ${a ? `placeholder="${a}"` : ""}
            rows="${o.toString()}">${c && !s ? c : ""}</textarea>
        ${i ? `<div class="icon">${i}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${v === Ee.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
        ${s ? '<div class="multi-values"></div>' : ""}
    </div>`;
  const M = f.querySelector(".container"), b = f.querySelector(".input"), j = f.querySelector(".submit"), E = f.querySelector(".multi-values"), L = f.querySelector(".icon"), _ = f.querySelector(".actions"), A = f.querySelector(".sync-status");
  b.style.resize = l ? "vertical" : "none", i && (b.style.paddingLeft = "34px"), r && (L && (L.style.top = "34px"), _.style.top = "34px"), v !== Ee.OnSubmit ? (b.addEventListener(v === Ee.OnFocusOut ? "blur" : "input", (C) => {
    const z = C.target.value;
    z !== m && y && y(z);
  }), b.addEventListener("keydown", (C) => {
    C.key === "Escape" && (p(), b.value = typeof m == "string" ? m : "", b.blur());
  })) : j && (b.oninput = () => {
    g = !0, b.style.paddingRight = "34px", j.innerHTML = bt.SAVE, j.style.cursor = "pointer", j.style.display = "";
  }, j.onclick = () => {
    g && u && (g = !1, j.innerHTML = bt.DONE, j.style.cursor = "initial", s ? ($.push(b.value), b.value = "", x(), u($)) : u(b.value));
  });
  const H = (C) => {
    var z;
    C && (C.status === k.Completed && !w || (w = C.status, S > -1 && (clearTimeout(S), S = -1), A.style.display = "initial", A.style.cursor = "initial", A.onclick = null, C.status === k.Pending ? (A.innerHTML = "&#xe91e;", A.style.color = "#d5d5d5") : C.status === k.Failed ? (A.innerHTML = "&#xe91a;", A.style.color = "#a82e25", (z = C.job) != null && z.message && (A.style.cursor = "pointer", A.onclick = (J) => {
      var U;
      J.stopPropagation(), alert((U = C.job) == null ? void 0 : U.message);
    })) : C.status === k.Conflict ? (A.innerHTML = "&#xe91d;", A.style.color = "#a82e25", A.title = "Conflict") : C.status === k.Completed && (A.innerHTML = "&#xe91c;", A.style.color = "#0ac96a", S = window.setTimeout(() => {
      A.style.display = "none", S = -1;
    }, 1e3))));
  }, x = () => {
    if (E) {
      E.innerHTML = $.map((C) => `<p class="multi-item">${C} <span value="${C}">x</span></p>`).join(`
`);
      for (const C of E.querySelectorAll("span"))
        C.onclick = (z) => {
          $ = $.filter((J) => J !== z.currentTarget.getAttribute("value")), u && u($), x();
        };
    }
  };
  return s && x(), {
    handleSyncStatus: H,
    getValue: () => b.value,
    isPending: () => h > -1,
    cancelPending: p,
    destroy: () => {
      M.remove(), P();
    }
  };
}
function Sn(n, e) {
  const { label: t, placeholder: s, initialValue: r, emptyMsg: a, className: i, onChange: o } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const l = typeof n == "string" ? document.getElementById(n) : n;
  if (!(l instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = null, d = -1, u = r instanceof Array ? r : typeof r == "string" ? [r] : [];
  const f = qe(l, "bd-text-many-input", i);
  l.innerHTML = `<div class="container">
        ${t ? `<p class="label">${t}</p>` : ""}
        <div class="values"></div>
        <div class="input-container">
            <input class="input" type="text" ${s ? `placeholder="${s}"` : ""} />
            <div class="actions">
                <div class="sync-status blitzicon" style="display: none;"></div>
                <div class="submit"></div>
            </div>
        </div>
    </div>`;
  const m = l.querySelector(".container"), h = l.querySelector(".input"), p = l.querySelector(".submit"), y = l.querySelector(".sync-status"), v = l.querySelector(".values");
  h.onkeyup = (S) => {
    S.key === "Enter" && p.onclick && p.onclick({});
  }, p.onclick = () => {
    if (h.value) {
      if (u.includes(h.value)) {
        h.value = "";
        return;
      }
      u.push(h.value), h.value = "", w(), o && o(u);
    }
  };
  const g = (S) => {
    var $;
    S && (S.status === k.Completed && !c || (c = S.status, d > -1 && (clearTimeout(d), d = -1), y.style.display = "initial", y.style.cursor = "initial", y.onclick = null, S.status === k.Pending ? (y.innerHTML = "&#xe91e;", y.style.color = "#d5d5d5") : S.status === k.Failed ? (y.innerHTML = "&#xe91a;", y.style.color = "#a82e25", ($ = S.job) != null && $.message && (y.style.cursor = "pointer", y.onclick = (P) => {
      var M;
      P.stopPropagation(), alert((M = S.job) == null ? void 0 : M.message);
    })) : S.status === k.Conflict ? (y.innerHTML = "&#xe91d;", y.style.color = "#a82e25", y.title = "Conflict") : S.status === k.Completed && (y.innerHTML = "&#xe91c;", y.style.color = "#0ac96a", d = window.setTimeout(() => {
      y.style.display = "none", d = -1;
    }, 1e3))));
  }, w = () => {
    v.innerHTML = u.length === 0 ? `
            <p class="empty">${a ?? "No items added yet!"}</p>
        ` : u.map((S) => `<div class="value-item">
                <div>${S}</div>
                <div class="remove" value="${S}"></div>
            </div>`).join(`
`);
    for (const S of v.querySelectorAll(".value-item .remove"))
      S.onclick = ($) => {
        u = u.filter((P) => P !== $.currentTarget.getAttribute("value")), o && o(u), w();
      };
  };
  return w(), {
    handleSyncStatus: g,
    destroy: () => {
      m.remove(), f();
    }
  };
}
const Mn = (n, e) => {
  typeof (e == null ? void 0 : e.getDraft) == "function" && (n.getDraft = () => e.getDraft()), typeof (e == null ? void 0 : e.getValue) == "function" && (n.getDraft = () => e.getValue()), typeof (e == null ? void 0 : e.isPending) == "function" && (n.isPending = () => e.isPending()), typeof (e == null ? void 0 : e.cancelPending) == "function" && (n.cancelPending = () => e.cancelPending());
}, Ge = (n) => async (e) => {
  const t = await n(e.attribute, e.host, e.config), s = () => {
    var r;
    return (r = t == null ? void 0 : t.destroy) == null ? void 0 : r.call(t);
  };
  return Mn(s, t), s;
}, Rt = (n, e) => (t, s) => {
  const r = n(t, s);
  return r ? e ? { html: r, hydrate: (a) => e(a, t) ?? void 0 } : r : "";
}, ze = (n, e) => (t) => {
  var i;
  const s = n(t.host, {
    ...t.config,
    // a per-mount draft (expand-to-modal handing an unsaved value over) wins
    initialValue: t.config.draft ?? t.value,
    onChange: (o) => t.onChange(o),
    ...e == null ? void 0 : e(t)
  }), r = s.handleSyncStatus ? (i = t.status) == null ? void 0 : i.call(t, s.handleSyncStatus) : void 0, a = () => {
    var o;
    r == null || r(), (o = s.destroy) == null || o.call(s);
  };
  return Mn(a, s), a;
}, et = (n) => (Array.isArray(n) ? n.length > 0 : n !== "" && n != null) ? n : null, nc = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
    <rect stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" x="3" y="5" width="18" height="14" rx="2" />
</svg>`, sc = `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" />
</svg>`, rc = ze(Sn, ({ onChange: n }) => ({
  onChange: (e) => n(et(e))
})), ac = {
  type: ["varchar", "tag", "formula"],
  empty: (n) => !n,
  control: ze(We, ({ onChange: n }) => ({
    multiple: !1,
    onChange: (e) => n(et(e))
  }))
}, ic = {
  type: "hex",
  empty: (n) => !n,
  // same validation contract as the hex editor — bad values stop at the door
  defaultConfig: { pattern: /^[0-9a-fA-F]*$/, errorMsg: "Hex digits only (0-9, a-f)!" },
  control: ze(We, ({ onChange: n }) => ({
    multiple: !1,
    onChange: (e) => n(et(e))
  }))
}, oc = {
  type: ["varchar[]", "text[]", "tag[]"],
  default: () => [],
  control: rc
}, lc = {
  type: ["text", "markdown"],
  empty: (n) => !n,
  // grid 'auto': a value the cell can't show inline (>= modalThreshold)
  // opens the modal directly, shorter ones edit inline with an expand icon
  defaultConfig: { presentation: { grid: "auto", form: "expandable" }, modalThreshold: 100 },
  control: ze(Mt, ({ onChange: n }) => ({
    multiple: !1,
    onChange: (e) => n(et(e))
  }))
}, cc = {
  type: "email",
  empty: (n) => !n,
  defaultConfig: { type: "email", iconSvg: nc },
  control: ze(We, ({ onChange: n }) => ({
    onChange: (e) => n(et(e))
  }))
}, uc = {
  type: ["url", "youtube"],
  empty: (n) => !n,
  defaultConfig: { type: "url", iconSvg: sc },
  control: ze(We, ({ onChange: n }) => ({
    onChange: (e) => n(et(e))
  }))
};
function ct(n, e) {
  const {
    trigger: t = Ee.OnChange,
    label: s,
    placeholder: r,
    iconSvg: a,
    min: i,
    max: o,
    float: l,
    initialValue: c,
    className: d,
    onChange: u
  } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const f = typeof n == "string" ? document.getElementById(n) : n;
  if (!(f instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const m = wn(() => b(w.value), u);
  let h = !1, p = null, y = -1;
  const v = qe(f, "bd-number-input", d);
  f.innerHTML = `<div class="container">
        ${s ? `<p class="label">${s}</p>` : ""}
        <input class="input" type="number" ${r ? `placeholder="${r}"` : ""}
            ${c != null ? `value="${c.toString()}"` : ""}
            ${i != null ? `min="${i.toString()}"` : ""}
            ${o != null ? `max="${o.toString()}"` : ""}
        />
        ${a ? `<div class="icon">${a}</div>` : ""}
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${t === Ee.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
    </div>`;
  const g = f.querySelector(".container"), w = f.querySelector(".input"), S = f.querySelector(".submit"), $ = f.querySelector(".icon"), P = f.querySelector(".actions"), M = f.querySelector(".sync-status");
  P.style.right = t === Ee.OnSubmit ? "10px" : "32px", a && (w.style.paddingLeft = "34px"), s && ($ && ($.style.top = "34px"), P.style.top = "34px");
  const b = (E) => E === "" ? null : (l ? parseFloat(E) : parseInt(E)) || 0;
  return t !== Ee.OnSubmit ? (m.prime(), w.addEventListener("input", () => {
    t === Ee.OnChange && m.schedule();
  }), w.addEventListener("blur", () => m.commit()), w.addEventListener("keydown", (E) => {
    if (E.key === "Escape") {
      m.cancel();
      const L = m.lastValue();
      w.value = L != null ? L.toString() : "", w.blur();
      return;
    }
    E.key === "Enter" && (m.commit(), Xe(f));
  })) : S && (w.addEventListener("input", () => {
    h = !0, w.style.paddingRight = "34px", S.innerHTML = bt.SAVE, S.style.cursor = "pointer", S.style.display = "";
  }), S.addEventListener("click", () => {
    h && u && (h = !1, S.innerHTML = bt.DONE, S.style.cursor = "initial", u(b(w.value)), Xe(f));
  })), {
    handleSyncStatus: (E) => {
      var L;
      E && (E.status === k.Completed && !p || (p = E.status, y > -1 && (clearTimeout(y), y = -1), M.style.display = "initial", M.style.cursor = "initial", M.onclick = null, E.status === k.Pending ? (M.innerHTML = "&#xe91e;", M.style.color = "#d5d5d5") : E.status === k.Failed ? (M.innerHTML = "&#xe91a;", M.style.color = "#a82e25", (L = E.job) != null && L.message && (M.style.cursor = "pointer", M.onclick = (_) => {
        var A;
        _.stopPropagation(), alert((A = E.job) == null ? void 0 : A.message);
      })) : E.status === k.Conflict ? (M.innerHTML = "&#xe91d;", M.style.color = "#a82e25", M.title = "Conflict") : E.status === k.Completed && (M.innerHTML = "&#xe91c;", M.style.color = "#0ac96a", y = window.setTimeout(() => {
        M.style.display = "none", y = -1;
      }, 1e3))));
    },
    destroy: () => {
      t !== Ee.OnSubmit && m.commit(), g.remove(), v();
    }
  };
}
const rs = ({ host: n, value: e, onChange: t, config: s }) => {
  const r = {
    min: (e == null ? void 0 : e.min) ?? null,
    max: (e == null ? void 0 : e.max) ?? null
  }, a = () => t(r.min == null && r.max == null ? null : { op: "between", ...r }), i = document.createElement("div");
  i.className = `bd-filter-range ${s.className ?? ""}`, n.append(i);
  const o = ["min", "max"].map((l) => {
    const c = document.createElement("div");
    return i.append(c), ct(c, {
      ...s,
      label: void 0,
      placeholder: `${s.label ?? s.placeholder ?? ""} ${l}`.trim(),
      initialValue: r[l] ?? void 0,
      onChange: (d) => {
        r[l] = d, a();
      }
    }).destroy;
  });
  return () => {
    o.forEach((l) => l()), i.remove();
  };
}, dc = {
  type: ["int", "tinyint"],
  empty: (n) => n == null,
  control: ze(ct),
  filter: rs
}, fc = {
  type: ["double", "float", "percentage", "currency"],
  empty: (n) => n == null,
  defaultConfig: { float: !0 },
  control: ze(ct),
  filter: rs
}, hc = {
  type: "duration",
  empty: (n) => n == null,
  control: ze(ct, ({ config: n }) => ({
    min: n.min ?? 0,
    placeholder: "seconds"
  })),
  filter: rs
};
function as(n, e) {
  const { label: t, initialValue: s, className: r, onChange: a } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const i = typeof n == "string" ? document.getElementById(n) : n;
  if (!(i instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let o = s === "1" || s === !0, l = null, c = -1;
  const d = qe(i, "bd-boolean-input", r);
  i.innerHTML = `<div class="container">
        <div class="sync-status blitzicon" style="display: none;"></div>
        ${t ? `<p class="label">${t}</p>` : ""}
        <div class="input"></div>
    </div>`;
  const u = i.querySelector(".container"), f = i.querySelector(".sync-status"), m = i.querySelector(".input"), h = () => {
    m.className = o ? "input icon-true" : "input icon-false";
  }, p = (y) => {
    var v;
    y && (y.status === k.Completed && !l || (l = y.status, c > -1 && (clearTimeout(c), c = -1), f.style.display = "initial", f.style.cursor = "initial", f.onclick = null, y.status === k.Pending ? (f.innerHTML = "&#xe91e;", f.style.color = "#d5d5d5") : y.status === k.Failed ? (f.innerHTML = "&#xe91a;", f.style.color = "#a82e25", (v = y.job) != null && v.message && (f.style.cursor = "pointer", f.onclick = (g) => {
      var w;
      g.stopPropagation(), alert((w = y.job) == null ? void 0 : w.message);
    })) : y.status === k.Conflict ? (f.innerHTML = "&#xe91d;", f.style.color = "#a82e25", f.title = "Conflict") : y.status === k.Completed && (f.innerHTML = "&#xe91c;", f.style.color = "#0ac96a", c = window.setTimeout(() => {
      f.style.display = "none", c = -1;
    }, 1e3))));
  };
  return m.addEventListener("click", () => {
    o = !o, a && a(o), h(), Xe(i);
  }), h(), {
    handleSyncStatus: p,
    destroy: () => {
      u.remove(), d();
    }
  };
}
function Kt(n, e) {
  const { trigger: t = Ee.OnChange, label: s, time: r, initialValue: a, className: i, onChange: o } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const l = typeof n == "string" ? document.getElementById(n) : n;
  if (!(l instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = !1, d = null, u = -1;
  const f = qe(l, "bd-date-input", i);
  l.innerHTML = `<div class="container">
        ${s ? `<p class="label">${s}</p>` : ""}
        <input class="input" type="${r ? "datetime-local" : "date"}" ${a ? `value="${a}"` : ""} />
        <div class="actions">
            <div class="sync-status blitzicon" style="display: none;"></div>
            ${t === Ee.OnSubmit ? '<div class="submit" style="display: none;"></div>' : ""}
        </div>
    </div>`;
  const m = l.querySelector(".container"), h = l.querySelector(".input"), p = l.querySelector(".actions"), y = l.querySelector(".submit"), v = l.querySelector(".sync-status");
  p.style.right = t === Ee.OnSubmit ? "10px" : "38px", s && (p.style.top = "34px");
  const w = wn(() => {
    let $ = h.value.replace("T", " ");
    return $ && $.split(":").length === 2 && ($ = $ + ":00"), $ || null;
  }, o);
  return t !== Ee.OnSubmit ? (w.prime(), h.addEventListener(t === Ee.OnFocusOut ? "blur" : "input", () => w.commit()), h.addEventListener("change", () => {
    w.commit(), Xe(l);
  }), h.addEventListener("keydown", ($) => {
    $.key === "Enter" && (w.commit(), Xe(l));
  })) : y && (h.addEventListener("input", () => {
    c = !0, h.style.paddingRight = "34px", y.innerHTML = bt.SAVE, y.style.cursor = "pointer", y.style.display = "";
  }), y.addEventListener("click", () => {
    c && (c = !1, y.innerHTML = bt.DONE, y.style.cursor = "initial", w.commit(), Xe(l));
  })), {
    handleSyncStatus: ($) => {
      var P;
      $ && ($.status === k.Completed && !d || (d = $.status, u > -1 && (clearTimeout(u), u = -1), v.style.display = "initial", v.style.cursor = "initial", v.onclick = null, $.status === k.Pending ? (v.innerHTML = "&#xe91e;", v.style.color = "#d5d5d5") : $.status === k.Failed ? (v.innerHTML = "&#xe91a;", v.style.color = "#a82e25", (P = $.job) != null && P.message && (v.style.cursor = "pointer", v.onclick = (M) => {
        var b;
        M.stopPropagation(), alert((b = $.job) == null ? void 0 : b.message);
      })) : $.status === k.Conflict ? (v.innerHTML = "&#xe91d;", v.style.color = "#a82e25", v.title = "Conflict") : $.status === k.Completed && (v.innerHTML = "&#xe91c;", v.style.color = "#0ac96a", u = window.setTimeout(() => {
        v.style.display = "none", u = -1;
      }, 1e3))));
    },
    destroy: () => {
      t !== Ee.OnSubmit && w.commit(), m.remove(), f();
    }
  };
}
function is(n, e) {
  const { label: t, baseLocale: s = "en", placeholder: r, initialValue: a, className: i, onChange: o } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const l = typeof n == "string" ? document.getElementById(n) : n;
  if (!(l instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = null, d = -1;
  const u = qe(l, "bd-i18n-input", i);
  l.innerHTML = `<div class="container">
        ${t ? `<p class="label">${t}</p>` : ""}
        <div class="rows"></div>
        <div class="foot">
            <span class="add-locale">+ locale</span>
            <div class="sync-status blitzicon" style="display: none;"></div>
        </div>
    </div>`;
  const f = l.querySelector(".container"), m = l.querySelector(".rows"), h = l.querySelector(".add-locale"), p = l.querySelector(".sync-status"), y = () => {
    const M = {};
    for (const b of m.querySelectorAll(".row")) {
      const j = b.querySelector(".locale").value.trim(), E = b.querySelector(".string").value;
      j && (M[j] = E);
    }
    return M;
  }, v = wn(
    () => JSON.stringify(y()),
    o ? (M) => o(JSON.parse(M)) : void 0
  ), g = () => v.schedule(), w = () => {
    v.commit(), Xe(l);
  }, S = (M, b, j = !1) => {
    const E = document.createElement("div");
    E.className = j ? "row base" : "row";
    const L = document.createElement("input");
    L.className = "locale", L.placeholder = "en", L.value = M;
    const _ = document.createElement("input");
    if (_.className = "string", r && (_.placeholder = r), _.value = b, L.addEventListener("input", g), _.addEventListener("input", g), L.addEventListener("blur", w), _.addEventListener("blur", w), E.append(L, _), !j) {
      const A = document.createElement("span");
      A.className = "remove", A.textContent = "×", A.addEventListener("click", () => {
        E.remove(), w();
      }), E.append(A);
    }
    return m.append(E), _;
  }, $ = a && typeof a == "object" && !Array.isArray(a) ? a : {};
  S(s, $[s] ?? "", !0);
  for (const M of Object.keys($))
    M !== s && S(M, $[M]);
  return v.prime(), h.addEventListener("click", () => {
    S("", "").previousElementSibling.focus();
  }), {
    handleSyncStatus: (M) => {
      var b;
      M && (M.status === k.Completed && !c || (c = M.status, d > -1 && (clearTimeout(d), d = -1), p.style.display = "initial", p.style.cursor = "initial", p.onclick = null, M.status === k.Pending ? (p.innerHTML = "&#xe91e;", p.style.color = "#d5d5d5") : M.status === k.Failed ? (p.innerHTML = "&#xe91a;", p.style.color = "#a82e25", (b = M.job) != null && b.message && (p.style.cursor = "pointer", p.onclick = (j) => {
        var E;
        j.stopPropagation(), alert((E = M.job) == null ? void 0 : E.message);
      })) : M.status === k.Conflict ? (p.innerHTML = "&#xe91d;", p.style.color = "#a82e25", p.title = "Conflict") : M.status === k.Completed && (p.innerHTML = "&#xe91c;", p.style.color = "#0ac96a", d = window.setTimeout(() => {
        p.style.display = "none", d = -1;
      }, 1e3))));
    },
    getValue: y,
    destroy: () => {
      v.commit(), f.remove(), u();
    }
  };
}
const os = (n, e) => ({ host: t, value: s, onChange: r, config: a }) => {
  const i = {
    min: (s == null ? void 0 : s.min) ?? null,
    max: (s == null ? void 0 : s.max) ?? null
  }, o = () => r(i.min == null && i.max == null ? null : { op: "between", ...i }), l = (d) => {
    if (d == null)
      return "";
    const u = e(d);
    return `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
  }, c = document.createElement("div");
  c.className = `bd-filter-daterange ${a.className ?? ""}`, t.append(c);
  for (const [d, u] of [["min", "from"], ["max", "to"]]) {
    const f = document.createElement("input");
    f.type = "date", f.title = `${a.label ?? a.placeholder ?? ""} ${u}`.trim(), f.setAttribute("aria-label", f.title), f.value = l(i[d]), f.onchange = () => {
      if (!f.value)
        i[d] = null;
      else {
        const [m, h, p] = f.value.split("-").map(Number);
        i[d] = n(d === "min" ? new Date(m, h - 1, p) : new Date(m, h - 1, p, 23, 59, 59, 999));
      }
      o();
    }, c.append(f);
  }
  return () => c.remove();
}, mc = {
  type: "boolean",
  default: () => !1,
  empty: (n) => n == null,
  control: ze(as),
  // tristate: any / true / false — a checkbox can't say "either"
  filter: ({ host: n, value: e, onChange: t, config: s }) => {
    const r = document.createElement("select");
    r.className = `bd-filter-boolean ${s.className ?? ""}`;
    const a = e == null ? void 0 : e.value;
    for (const i of ["any", "true", "false"])
      r.append(new Option(
        i === "any" ? s.label ?? s.placeholder ?? "any" : i,
        i,
        !1,
        String(a) === i
      ));
    return r.onchange = () => t(r.value === "any" ? null : { op: "eq", value: r.value === "true" }), n.append(r), () => r.remove();
  }
}, pc = {
  type: "date",
  empty: (n) => !n,
  control: ze(Kt),
  filter: os((n) => n.getTime(), (n) => new Date(n))
}, yc = {
  type: "datetime",
  empty: (n) => !n,
  defaultConfig: { time: !0 },
  control: ze(Kt),
  filter: os((n) => n.getTime(), (n) => new Date(n))
}, gc = {
  type: "blitzstamp",
  empty: (n) => n == null,
  view: ({ value: n }) => n == null ? "" : cn(Number(n)).toLocaleString(),
  filter: os(vr, cn)
}, vc = {
  type: "texti18n",
  empty: (n) => !n || Object.keys(n).length === 0,
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: ze(is, ({ onChange: n }) => ({
    onChange: (e) => n(e && Object.keys(e).length > 0 ? e : null)
  }))
}, bc = {
  type: "json",
  // structured content has no useful inline cell editor — go straight big
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: ({ host: n, value: e, onChange: t, config: s, status: r, invalid: a }) => {
    const i = Mt(n, {
      ...s,
      initialValue: s.draft ?? (e != null ? JSON.stringify(e, null, 2) : void 0),
      onChange: (c) => {
        try {
          a == null || a(null), t(c ? JSON.parse(c) ?? null : null);
        } catch {
          a == null || a("Invalid JSON"), t(null);
        }
      }
    }), o = r == null ? void 0 : r(i.handleSyncStatus), l = () => {
      o == null || o(), i.destroy();
    };
    return Mn(l, i), l;
  }
}, wc = {
  type: "code",
  empty: (n) => !(n != null && n.content),
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: ({ host: n, value: e, onChange: t, config: s, status: r }) => {
    const a = Mt(n, {
      ...s,
      initialValue: s.draft ?? (e == null ? void 0 : e.content),
      onChange: (l) => t(l ? { content: l, language: (e == null ? void 0 : e.language) ?? null } : null)
    }), i = r == null ? void 0 : r(a.handleSyncStatus), o = () => {
      i == null || i(), a.destroy();
    };
    return Mn(o, a), o;
  }
};
function Cn(n, e) {
  const { label: t, initialPreviewImages: s, multiple: r, className: a, onChange: i } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const o = typeof n == "string" ? document.getElementById(n) : n;
  if (!(o instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let l = s ?? [], c = null, d = -1;
  const u = qe(o, "bd-image-input", a);
  o.innerHTML = `<div class="container">
        ${t ? `<p class="label">${t}</p>` : ""}
        <div class="preview" style="display: none;"></div>
        <input class="input" type="file" accept="image/*" ${r ? 'multiple="true"' : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const f = o.querySelector(".container"), m = o.querySelector(".preview"), h = o.querySelector(".input"), p = o.querySelector(".sync-status");
  h.addEventListener("change", (g) => {
    const w = g.target.files;
    if (i && w) {
      const S = Array.from(w);
      l = S.map(($) => URL.createObjectURL($)), y(), i(S);
    }
  });
  const y = () => {
    m.innerHTML = l.map((g) => `<div class="image" style="background-image: url(${g});"></div>`).join(`
`), m.style.display = l.length > 0 ? "" : "none";
  }, v = (g) => {
    var w;
    g && (g.status === k.Completed && !c || (c = g.status, d > -1 && (clearTimeout(d), d = -1), p.style.display = "initial", p.style.cursor = "initial", p.onclick = null, g.status === k.Pending ? (p.innerHTML = "&#xe91e;", p.style.color = "#d5d5d5") : g.status === k.Failed ? (p.innerHTML = "&#xe91a;", p.style.color = "#a82e25", (w = g.job) != null && w.message && (p.style.cursor = "pointer", p.onclick = (S) => {
      var $;
      S.stopPropagation(), alert(($ = g.job) == null ? void 0 : $.message);
    })) : g.status === k.Conflict ? (p.innerHTML = "&#xe91d;", p.style.color = "#a82e25", p.title = "Conflict") : g.status === k.Completed && (p.innerHTML = "&#xe91c;", p.style.color = "#0ac96a", d = window.setTimeout(() => {
      p.style.display = "none", d = -1;
    }, 1e3))));
  };
  return y(), {
    handleSyncStatus: v,
    destroy: () => {
      f.remove(), u();
    }
  };
}
function ls(n, e) {
  const { label: t, multiple: s, className: r, onChange: a } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const i = typeof n == "string" ? document.getElementById(n) : n;
  if (!(i instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let o = null, l = -1;
  const c = qe(i, "bd-video-input", r);
  i.innerHTML = `<div class="container">
        ${t ? `<p class="label">${t}</p>` : ""}
        <input class="input" type="file" accept=".mp4,.m4v,.mov" ${s ? 'multiple="true"' : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const d = i.querySelector(".container"), u = i.querySelector(".input"), f = i.querySelector(".sync-status");
  return u.addEventListener("change", (h) => {
    const p = h.target.files;
    if (a && p) {
      const y = Array.from(p);
      a(y);
    }
  }), {
    handleSyncStatus: (h) => {
      var p;
      h && (h.status === k.Completed && !o || (o = h.status, l > -1 && (clearTimeout(l), l = -1), f.style.display = "initial", f.style.cursor = "initial", f.onclick = null, h.status === k.Pending ? (f.innerHTML = "&#xe91e;", f.style.color = "#d5d5d5") : h.status === k.Failed ? (f.innerHTML = "&#xe91a;", f.style.color = "#a82e25", (p = h.job) != null && p.message && (f.style.cursor = "pointer", f.onclick = (y) => {
        var v;
        y.stopPropagation(), alert((v = h.job) == null ? void 0 : v.message);
      })) : h.status === k.Conflict ? (f.innerHTML = "&#xe91d;", f.style.color = "#a82e25", f.title = "Conflict") : h.status === k.Completed && (f.innerHTML = "&#xe91c;", f.style.color = "#0ac96a", l = window.setTimeout(() => {
        f.style.display = "none", l = -1;
      }, 1e3))));
    },
    destroy: () => {
      d.remove(), c();
    }
  };
}
function cs(n, e) {
  const { label: t, multiple: s, className: r, onChange: a } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const i = typeof n == "string" ? document.getElementById(n) : n;
  if (!(i instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let o = null, l = -1;
  const c = qe(i, "bd-file-input", r);
  i.innerHTML = `<div class="container">
        ${t ? `<p class="label">${t}</p>` : ""}
        <input class="input" type="file" accept="*" ${s ? "multiple" : ""} />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const d = i.querySelector(".container"), u = i.querySelector(".input"), f = i.querySelector(".sync-status");
  return u.addEventListener("change", (h) => {
    const p = h.target.files;
    if (a && p) {
      const y = Array.from(p);
      a(y);
    }
  }), {
    handleSyncStatus: (h) => {
      var p;
      h && (h.status === k.Completed && !o || (o = h.status, l > -1 && (clearTimeout(l), l = -1), f.style.display = "initial", f.style.cursor = "initial", f.onclick = null, h.status === k.Pending ? (f.innerHTML = "&#xe91e;", f.style.color = "#d5d5d5") : h.status === k.Failed ? (f.innerHTML = "&#xe91a;", f.style.color = "#a82e25", (p = h.job) != null && p.message && (f.style.cursor = "pointer", f.onclick = (y) => {
        var v;
        y.stopPropagation(), alert((v = h.job) == null ? void 0 : v.message);
      })) : h.status === k.Conflict ? (f.innerHTML = "&#xe91d;", f.style.color = "#a82e25", f.title = "Conflict") : h.status === k.Completed && (f.innerHTML = "&#xe91c;", f.style.color = "#0ac96a", l = window.setTimeout(() => {
        f.style.display = "none", l = -1;
      }, 1e3))));
    },
    destroy: () => {
      d.remove(), c();
    }
  };
}
const xn = (n, e, t) => ({ host: s, onChange: r, config: a, services: i, status: o }) => {
  const { handleSyncStatus: l, destroy: c } = n(s, {
    ...a,
    onChange: async (u) => {
      if (u.length !== 0) {
        l({ status: k.Pending });
        try {
          const f = [];
          for (const m of u)
            f.push(await i[e](m));
          await r(t(f)), l({ status: k.Completed });
        } catch (f) {
          console.error("Upload failed:", (f == null ? void 0 : f.message) ?? f), l({ status: k.Failed });
        }
      }
    }
  }), d = o == null ? void 0 : o(l);
  return () => {
    d == null || d(), c();
  };
}, _c = {
  type: ["image", "image[]"],
  default: () => [],
  control: xn(Cn, "upload", (n) => n)
}, Ec = {
  type: "video",
  control: xn(ls, "uploadVideo", (n) => n[0])
}, Sc = {
  type: "file",
  control: xn(cs, "uploadFile", (n) => n[0])
}, Mc = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function pe(n) {
  return String(n ?? "").replace(/[&<>"']/g, (e) => Mc[e]);
}
class Jr {
  constructor(e) {
    this.html = e;
  }
  toString() {
    return this.html;
  }
}
function se(n) {
  return new Jr(n);
}
const Cc = /^\s*(javascript|data|vbscript):/i;
function Je(n) {
  const e = String(n ?? "");
  return Cc.test(e) ? "#" : pe(e);
}
function ee(n, ...e) {
  return n.reduce((t, s, r) => t + s + (r < e.length ? e[r] instanceof Jr ? e[r].html : pe(e[r]) : ""), "");
}
function Vr(n, e) {
  const { label: t, className: s, onChange: r } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const a = typeof n == "string" ? document.getElementById(n) : n;
  if (!(a instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let i = null, o = -1;
  const l = qe(a, "bd-pdf-input", s);
  a.innerHTML = `<div class="container">
        ${t ? `<p class="label">${t}</p>` : ""}
        <input class="input" type="file" accept="application/pdf,.pdf" />
        <div class="sync-status blitzicon" style="display: none;"></div>
    </div>`;
  const c = a.querySelector(".container"), d = a.querySelector(".input"), u = a.querySelector(".sync-status");
  return d.addEventListener("change", (m) => {
    const h = m.target.files;
    if (r && h) {
      const p = Array.from(h);
      r(p);
    }
  }), {
    handleSyncStatus: (m) => {
      var h;
      m && (m.status === k.Completed && !i || (i = m.status, o > -1 && (clearTimeout(o), o = -1), u.style.display = "initial", u.style.cursor = "initial", u.onclick = null, m.status === k.Pending ? (u.innerHTML = "&#xe91e;", u.style.color = "#d5d5d5") : m.status === k.Failed ? (u.innerHTML = "&#xe91a;", u.style.color = "#a82e25", (h = m.job) != null && h.message && (u.style.cursor = "pointer", u.onclick = (p) => {
        var y;
        p.stopPropagation(), alert((y = m.job) == null ? void 0 : y.message);
      })) : m.status === k.Conflict ? (u.innerHTML = "&#xe91d;", u.style.color = "#a82e25", u.title = "Conflict") : m.status === k.Completed && (u.innerHTML = "&#xe91c;", u.style.color = "#0ac96a", o = window.setTimeout(() => {
        u.style.display = "none", o = -1;
      }, 1e3))));
    },
    destroy: () => {
      c.remove(), l();
    }
  };
}
const xc = (n) => {
  const e = n.search(/[?#]/), t = e === -1 ? n : n.slice(0, e), s = e === -1 ? "" : n.slice(e);
  return (/\.pdf$/i.test(t) ? t.replace(/\.pdf$/i, ".thumbnail.jpg") : `${t}.thumbnail.jpg`) + s;
}, $c = (n) => {
  try {
    return decodeURIComponent(new URL(n, "https://x.invalid").pathname.split("/").pop() || n);
  } catch {
    return n;
  }
}, kc = {
  type: "pdf",
  empty: (n) => !n,
  /**
   * Read surface: the thumbnail, linked to the ORIGINAL document. The basic
   * viewer is deliberately the browser's native PDF viewer — page navigation
   * and zoom come free and never depend on pre-rendered page images. A
   * thumbnail that fails to load (record pending/processing/failed) hides
   * itself and the plain document link keeps the PDF reachable.
   */
  view: ({ value: n }) => ({
    html: ee`<a class="bd-pdf-doc" href="${se(Je(n))}" target="_blank" rel="noopener noreferrer">
            <img class="bd-pdf" alt="" loading="lazy" src="${se(Je(xc(n)))}" />
            <span class="bd-pdf-fallback" hidden>${$c(n)}</span>
        </a>`,
    hydrate: (e) => {
      const t = e.querySelector("img.bd-pdf"), s = e.querySelector(".bd-pdf-fallback");
      if (!t || !s)
        return;
      const r = () => {
        t.hidden = !0, s.hidden = !1;
      };
      return t.complete && t.naturalWidth === 0 && r(), t.addEventListener("error", r), () => t.removeEventListener("error", r);
    }
  }),
  // uploads go through the generic file service ({ url } comes back);
  // the committed value is the bare URL string, never the record
  control: xn(Vr, "uploadFile", (n) => {
    const e = n[0];
    return (typeof e == "string" ? e : e == null ? void 0 : e.url) ?? null;
  })
};
function us(n, e) {
  const { label: t, placeholder: s, initialValue: r, initialExpand: a = !1, className: i, apiKey: o, onChange: l } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const c = typeof n == "string" ? document.getElementById(n) : n;
  if (!(c instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  if (!o)
    throw new Error("Google Maps API key is required for location input.");
  const d = l ? Qn(l) : void 0;
  let u = null, f = null, m = null, h = r ?? null;
  const p = qe(c, "bd-location-input", i);
  c.innerHTML = `<div class="container">
        ${t ? `<p class="label">${t}</p>` : ""}
        <div class="address-container">
            <input type="text" class="address-input" placeholder="${s ?? "Enter address"}" />
            <button class="expand-btn ${a ? "expanded" : ""}"></button>
        </div>
        <div class="fields-container" style="${a ? "" : "display: none;"}">
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
  const y = c.querySelector(".container"), v = c.querySelector(".address-input"), g = c.querySelector(".expand-btn"), w = c.querySelector(".map-container"), S = c.querySelector(".fields-container"), $ = c.querySelector(".lat-input"), P = c.querySelector(".long-input"), M = c.querySelector(".street-input"), b = c.querySelector(".street-number-input"), j = c.querySelector(".zip-input"), E = c.querySelector(".city-input"), L = c.querySelector(".country-input");
  g.onclick = () => {
    S.style.display = S.style.display === "none" ? "" : "none", g.classList.toggle("expanded");
  }, M.oninput = () => _("street", M.value), b.oninput = () => _("street_number", b.value), j.oninput = () => _("postal_code", j.value), E.oninput = () => _("city", E.value), L.oninput = () => _("country", L.value);
  const _ = (C, z) => {
    !h || !h.lat || !h.lng || (h = {
      ...h,
      [C]: z
    }, d && d(h));
  }, A = async () => {
    try {
      await dr(o), r != null && r.lat && ($.value = r.lat), r != null && r.lng && (P.value = r.lng), r != null && r.address && (v.value = r.address), r != null && r.street && (M.value = r.street), r != null && r.street_number && (b.value = r.street_number), r != null && r.postal_code && (j.value = r.postal_code), r != null && r.city && (E.value = r.city), r != null && r.country && (L.value = r.country);
      const C = r && r.lat && r.lng ? {
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lng)
      } : {
        // Else, San Francisco by default
        lat: 37.7749,
        lng: -122.4194
      };
      u = new google.maps.Map(w, {
        center: C,
        zoom: 13
      }), f = new google.maps.Marker({
        map: u,
        position: C,
        draggable: !0
      }), m = new google.maps.places.Autocomplete(v, {
        types: ["geocode"]
      }), m.addListener("place_changed", () => {
        const z = m == null ? void 0 : m.getPlace();
        if (!(z != null && z.geometry) || !u || !f)
          return;
        const J = z.geometry.location;
        H(z, J.lat(), J.lng());
      }), google.maps.event.addListener(f, "dragend", () => {
        const z = f == null ? void 0 : f.getPosition();
        z && x(z);
      });
    } catch (C) {
      console.error("Error initializing map:", C);
    }
  }, H = (C, z, J) => {
    if (C) {
      if (h = {
        lat: typeof z == "number" ? z.toString() : z,
        lng: typeof J == "number" ? J.toString() : J,
        address: C.formatted_address || "",
        street: "",
        street_number: "",
        city: "",
        postal_code: "",
        admin_locality: "",
        country: ""
      }, C.address_components)
        for (const U of C.address_components)
          switch (U.types[0]) {
            case "route":
              h.street = U.long_name;
              break;
            case "street_number":
              h.street_number = U.long_name;
              break;
            case "locality":
              h.admin_locality = U.long_name;
              break;
            case "postal_code":
              h.postal_code = U.long_name;
              break;
            case "country":
              h.country = U.long_name;
              break;
          }
      if (C.adr_address) {
        const R = new DOMParser().parseFromString(C.adr_address, "text/html").querySelector(".locality");
        R && (h.city = R.textContent || "");
      }
      if (!h.city && C.formatted_address) {
        const U = C.formatted_address.split(",").find((oe) => /\b\d{4}\b/.test(oe));
        if (U) {
          const oe = U.replace(/\b\d{4}\b/, "").trim();
          oe && (h.city = oe);
        }
      }
      if (!h.city && h.admin_locality && (h.city = h.admin_locality), $.value = h.lat, P.value = h.lng, v.value = h.address, M.value = h.street, b.value = h.street_number, j.value = h.postal_code, E.value = h.city, L.value = h.country, u && f) {
        const U = new google.maps.LatLng(
          typeof z == "number" ? z : parseFloat(z),
          typeof J == "number" ? J : parseFloat(J)
        );
        u.setCenter(U), f.setPosition(U);
      }
      d && d(h);
    }
  }, x = async (C) => {
    try {
      const J = await (await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${C.lat()},${C.lng()}&key=${o}`
      )).json();
      J.status === "OK" && J.results && J.results.length > 0 && H(J.results[0], C.lat(), C.lng());
    } catch (z) {
      console.error("Reverse geocoding error:", z);
    }
  };
  return A(), {
    destroy: () => {
      u && window.google && window.google.maps && google.maps.event.clearInstanceListeners(u), f && window.google && window.google.maps && google.maps.event.clearInstanceListeners(f), m && window.google && window.google.maps && google.maps.event.clearInstanceListeners(m), y.remove(), p();
    }
  };
}
const Lc = ln(() => import("./index-d6002e97.js")), Dc = ln(() => import("./index-2491b580.js")), Ac = {
  type: "phone",
  empty: (n) => !n,
  control: ze(Lc, ({ onChange: n }) => ({
    onChange: (e) => n(et(e))
  }))
}, Ic = /^<p id="[A-Za-z0-9_-]+"><br><\/p>$/, jc = {
  type: "htmlText",
  empty: (n) => !n,
  defaultConfig: { presentation: { grid: "modal", form: "expandable" } },
  control: ze(Dc, ({ onChange: n }) => ({
    onChange: (e) => n(et(Ic.test(e) ? "" : e))
  }))
}, Tc = {
  type: "location",
  empty: (n) => !n,
  // without a maps key the rich widget can't work — degrade to plain text,
  // exactly what the old add form did by falling through to its text branch
  control: (n) => n.config.apiKey ? ze(us, ({ onChange: e }) => ({
    onChange: (t) => e(t || null)
  }))(n) : ze(We, ({ onChange: e }) => ({
    onChange: (t) => e(et(t))
  }))(n)
};
const Oc = 6;
function zc(n) {
  return `"${String(n ?? "").replace(/["\\]/g, "\\$&")}"`;
}
function Hc(n) {
  const e = n.reduce((t, s) => {
    const r = n.find((o) => {
      var l, c, d;
      return ((l = o.obj) == null ? void 0 : l._blitzID.value) === ((d = (c = s.obj) == null ? void 0 : c.parent_fk) == null ? void 0 : d.value);
    });
    if (r) {
      const o = t.find((l) => {
        var c;
        return ((c = l.parent) == null ? void 0 : c.value) === r.value;
      });
      return o ? o.children.push(s) : t.push({ expanded: !0, parent: r, children: [s] }), t;
    }
    if (n.find((o) => {
      var l, c, d;
      return ((c = (l = o.obj) == null ? void 0 : l.parent_fk) == null ? void 0 : c.value) === ((d = s.obj) == null ? void 0 : d._blitzID.value);
    }))
      return t;
    const i = t.find((o) => o.parent === void 0);
    return i ? i.children.push(s) : t.push({ expanded: !0, children: [s] }), t;
  }, []);
  return e.sort((t, s) => {
    const r = t.parent ? n.indexOf(t.parent) : 1 / 0, a = s.parent ? n.indexOf(s.parent) : 1 / 0;
    return r - a;
  }), e;
}
async function $n(n, e) {
  const {
    initialValue: t,
    initialFirst: s,
    initialCallback: r,
    title: a,
    label: i,
    placeholder: o,
    modal: l,
    required: c,
    multiple: d,
    nextButton: u,
    groupByParent: f,
    selectChildrenWithParent: m,
    docLink: h,
    techDocLink: p,
    className: y,
    onSearch: v,
    onChange: g,
    onRefresh: w
  } = e || {};
  if (!n)
    throw new Error("Container parameter missing!");
  const S = typeof n == "string" ? document.getElementById(n) : n;
  if (!(S instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let $ = [], P = 0, M = [], b = null, j = -1;
  const E = qe(S, "bd-picker", y);
  S.innerHTML = `<div class="container">
        ${i ? `<p class="picker-label">${i}</p>` : ""}
        <div class="dropdown">
            <div class="sync-status blitzicon" style="display: none;"></div>
            <p class="picker-value"></p>
            <div class="actions">
                <div class="picker-spinner"></div>
                ${u && !d ? '<div class="next-btn" style="display: none;"></div>' : ""}
                ${!c && !d ? '<div class="clear-btn" style="display: none;"></div>' : ""}
                <div class="arrow-btn"></div>
            </div>
            ${w || h || p || l ? `<div class="meta-actions">
                ${w ? '<div class="refresh-btn blitzicon">&#xe812;</div>' : ""}
                ${h ? `<a class="doc-btn blitzicon" target="_blank" href="${h}">&#xe90f;</a>` : ""}
                ${p ? `<a class="doc-btn blitzicon" target="_blank" href="${p}">&#xe910;</a>` : ""}
                ${l ? '<div class="expand-btn"></div>' : ""}
            </div>` : ""}
        </div>
        <div class="menu" style="display: none;">
            <input class="search-input" type="text" placeholder="Search..." />
            <p class="empty" style="display: none;">No results found!</p>
            <div class="list"></div>
        </div>
    </div>`;
  const L = S.querySelector(".dropdown"), _ = S.querySelector(".sync-status"), A = S.querySelector(".picker-spinner"), H = S.querySelector(".picker-value"), x = S.querySelector(".empty"), C = S.querySelector(".search-input"), z = S.querySelector(".menu"), J = S.querySelector(".container"), U = S.querySelector(".list"), oe = S.querySelector(".refresh-btn"), R = S.querySelectorAll(".doc-btn"), K = S.querySelector(".clear-btn"), X = S.querySelector(".next-btn"), be = S.querySelector(".expand-btn"), me = () => {
    z && (z.style.display = "none");
  }, ke = () => {
    if (!z)
      return;
    z.style.display = "";
    const B = z.offsetHeight + Oc, re = window.innerHeight - L.getBoundingClientRect().bottom, de = J.getBoundingClientRect().top;
    S.classList.toggle("drop-up", re < B && de >= B);
  }, N = () => {
    z && (z.style.display === "none" ? ke() : me());
  }, T = (B, re) => {
    M = B;
    for (const de of U.querySelectorAll(".list-item-hovered"))
      de.classList.remove("list-item-hovered");
    for (const de of U.querySelectorAll(".list-item-checkbox"))
      de.checked = !1;
    if (H)
      if (M.length > 0 && $.length > 0) {
        if (H.classList.remove("picker-placeholder"), H.innerHTML = (a ? `<b>${pe(a)}: </b>` : "") + (M.map((de) => pe(de.label)).join(", ") || "/"), K && (K.style.display = ""), X) {
          const de = $.findIndex((fe) => fe.value === M[0].value);
          de > -1 && de < $.length - 1 ? X.style.display = "" : X.style.display = "none";
        }
        for (const de of M) {
          const fe = zc(de.value), we = U.querySelector(`.list-item button[value=${fe}]`);
          we && we.parentElement && we.parentElement.classList.add("list-item-hovered");
          const Se = U.querySelector(`.group-label[value=${fe}]`);
          Se && Se.parentElement && Se.parentElement.classList.add("list-item-hovered");
          const _e = U.querySelector(`.list-item-checkbox[value=${fe}]`);
          _e && (_e.checked = !0);
        }
        g && !re && g(M);
      } else
        H.removeAttribute("values"), H.classList.add("picker-placeholder"), H.innerText = o ?? "", K && (K.style.display = "none"), X && (X.style.display = "none"), g && !re && g([]);
  }, W = (B) => {
    M.find((re) => re.value === B.value) ? (M.length > 1 || !c) && T(M.filter((re) => re.value !== B.value)) : d ? T([...M, B]) : (T([B]), Xe(S));
  }, I = () => {
    if (A.style.display = "none", x && (x.style.display = $.length === 0 ? "" : "none"), C && (C.style.display = P > 7 ? "" : "none"), U) {
      const B = !!(C != null && C.value);
      let re = [];
      if (f && $.some((fe) => !!fe.obj)) {
        re = Hc($), U.innerHTML = re.map(({ expanded: fe, parent: we, children: Se }) => {
          let _e = !1;
          const Oe = Se.map((Ue) => {
            const Ct = M.find((Qt) => Qt.value === Ue.value);
            return !_e && Ct && (_e = !0), `<div class="list-item ${Ct ? "list-item-hovered" : ""}">
                            ${d ? `<input value="${pe(Ue.value)}" class="list-item-checkbox" type="checkbox" ${Ct ? "checked" : ""}>` : ""}
                            <button value="${pe(Ue.value)}">${pe(Ue.label)}</button>
                        </div>`;
          }).join(`
`);
          if (!we)
            return Oe;
          const He = M.find((Ue) => Ue.value === we.value), Ve = B ? fe : _e;
          return `
                        <div class="group-header ${He ? "list-item-hovered" : ""} ${Ve ? "expanded" : ""}">
                            <div class="group-toggle">
                                <div class="group-toggle-icon"></div>
                            </div>
                            ${d ? `<input value="${pe(we.value)}" class="list-item-checkbox" type="checkbox" ${He ? "checked" : ""}>` : ""}
                            <p value="${pe(we.value)}" class="group-label">${pe(we.label)}</p>
                        </div>
                        <div class="group-items ${d ? "multiple-group" : ""}" ${Ve ? "" : 'style="display: none;"'}>
                            ${Oe}
                        </div>
                    `;
        }).join(`
`);
        for (const fe of U.querySelectorAll(".group-header .group-toggle"))
          fe.addEventListener("click", (we) => {
            we.stopPropagation();
            const Se = fe.parentElement, _e = Se == null ? void 0 : Se.querySelector(".group-label"), Oe = _e == null ? void 0 : _e.getAttribute("value");
            if (Oe && Se) {
              const He = re.find((Ve) => {
                var Ue;
                return ((Ue = Ve.parent) == null ? void 0 : Ue.value) === Oe;
              });
              if (He) {
                const Ve = Se.classList.contains("expanded");
                He.expanded = !Ve, Se.classList.toggle("expanded");
                const Ue = Se.nextElementSibling;
                Ue && (Ue.style.display = He.expanded ? "" : "none");
              }
            }
          });
      } else
        U.innerHTML = $.map((fe) => {
          const we = M.find((Se) => Se.value === fe.value);
          return `<div class="list-item ${we ? "list-item-hovered" : ""}">
                            ${d ? `<input value="${pe(fe.value)}" class="list-item-checkbox" type="checkbox" ${we ? "checked" : ""}>` : ""}
                            <button value="${pe(fe.value)}">${pe(fe.label)}</button>
                        </div>`;
        }).join(`
`);
      const de = (fe) => {
        const we = $.find((Se) => Se.value === fe.currentTarget.getAttribute("value"));
        if (we) {
          if (d && f && m) {
            const Se = re.find((_e) => {
              var Oe;
              return ((Oe = _e.parent) == null ? void 0 : Oe.value) === we.value;
            });
            if (Se)
              if (M.find((Oe) => Oe.value === we.value)) {
                const Oe = Se.children.map((He) => He.value);
                T(M.filter((He) => He.value !== we.value && !Oe.includes(He.value)));
              } else {
                const Oe = Se.children.filter((He) => !M.find((Ve) => Ve.value === He.value));
                T([...M, we, ...Oe]);
              }
            else
              W(we);
          } else
            W(we);
          d || me();
        }
      };
      for (const fe of [...U.querySelectorAll(".list-item button"), ...U.querySelectorAll(".group-label")])
        fe.addEventListener("click", de);
      for (const fe of U.querySelectorAll(".list-item-checkbox"))
        fe.addEventListener("change", de);
    }
  }, F = (B) => {
    var re;
    B && (B.status === k.Completed && !b || (b = B.status, j > -1 && (clearTimeout(j), j = -1), _.style.display = "initial", _.style.cursor = "initial", _.onclick = null, B.status === k.Pending ? (_.innerHTML = "&#xe91e;", _.style.color = "#d5d5d5") : B.status === k.Failed ? (_.innerHTML = "&#xe91a;", _.style.color = "#a82e25", (re = B.job) != null && re.message && (_.style.cursor = "pointer", _.onclick = (de) => {
      var fe;
      de.stopPropagation(), alert((fe = B.job) == null ? void 0 : fe.message);
    })) : B.status === k.Conflict ? (_.innerHTML = "&#xe91d;", _.style.color = "#a82e25", _.title = "Conflict") : B.status === k.Completed && (_.innerHTML = "&#xe91c;", _.style.color = "#0ac96a", j = window.setTimeout(() => {
      _.style.display = "none", j = -1;
    }, 1e3))));
  };
  z.addEventListener("click", (B) => B.stopPropagation()), L && (L.addEventListener("click", N), document.addEventListener("click", (B) => {
    L.contains(B.target) || me();
  }));
  const ae = async (B) => {
    v && ($ = await v(B)), B || (P = $.length);
  }, ve = Qn(async (B) => {
    A.style.display = "block", await ae(B), I();
  });
  C && C.addEventListener("input", (B) => {
    ve(B.target.value);
  }), K && K.addEventListener("click", (B) => {
    B.stopPropagation(), me(), T([]);
  }), X && X.addEventListener("click", (B) => {
    B.stopPropagation(), me();
    const re = $.findIndex((de) => {
      var fe;
      return de.value === ((fe = M[0]) == null ? void 0 : fe.value);
    });
    re > -1 && re < $.length - 1 && T([$[re + 1]]);
  }), oe && w && oe.addEventListener("click", async (B) => {
    B.stopPropagation(), A.style.display = "block", await w(), await ae(""), I();
  }), be && be.addEventListener("click", (B) => {
    B.stopPropagation(), me(), Pc({
      items: $,
      selected: M,
      onChange: W
    });
  });
  for (const B of R)
    B.addEventListener("click", (re) => re.stopPropagation());
  return await ae(""), T(
    t ? (t instanceof Array ? t : [t]).map((B) => $.find((re) => re.value === B)).filter((B) => !!B) : s && $[0] ? [$[0]] : [],
    !r
  ), I(), {
    handleSyncStatus: F,
    destroy: () => {
      for (const B of S.childNodes)
        B.remove();
      S.classList.remove("drop-up"), E();
    }
  };
}
function Pc(n) {
  const { items: e, selected: t, onChange: s } = n;
  if (!Array.isArray(e) || !s)
    throw new Error("Missing parameters!");
  let r = e;
  const a = document.createElement("div");
  a.className = "bd-picker-modal", a.setAttribute("data-bd-portal", "");
  const i = document.createElement("div");
  i.className = "box", a.append(i), i.innerHTML = `<div class="wrapper">
        <div class="close-btn">&times;</div>
        <input class="search-input" type="text" placeholder="Search..." />
        <p class="empty" style="display: none;">No results found!</p>
        <div class="list"></div>
    </div>`;
  const o = i.querySelector(".close-btn"), l = i.querySelector(".search-input"), c = i.querySelector(".empty"), d = i.querySelector(".list"), u = () => {
    if (c && (c.style.display = r.length === 0 ? "" : "none"), d) {
      d.innerHTML = r.map((m) => `<div value="${pe(m.value)}" class="list-item ${t.find((h) => h.value === m.value) ? "list-item-hovered" : ""}">
                    ${pe(m.label)}
                </div>`).join(`
`);
      for (const m of d.querySelectorAll("div"))
        m.addEventListener("click", (h) => {
          const p = e.find((y) => y.value === h.target.getAttribute("value"));
          p && (s(p), f());
        });
    }
  }, f = () => a.remove();
  a.addEventListener("click", f), o.addEventListener("click", f), i.addEventListener("click", (m) => m.stopPropagation()), l && l.addEventListener("input", (m) => {
    const h = m.target.value;
    h ? (r = e.filter((p) => p.label.match(new RegExp(zt(h), "gi"))), r.sort((p, y) => p.label.length - y.label.length)) : r = e, u();
  }), u(), document.body.append(a);
}
async function Vt(n, e) {
  var d;
  const { model: t, attribute: s, excludeOptions: r, onChange: a, ...i } = e || {};
  if (!t)
    throw new Error("Model property missing!");
  if (!s)
    throw new Error("Attribute name property missing!");
  let o = (((d = t.getAttributeDetails(s)) == null ? void 0 : d.options) || []).map((u) => ({
    value: u,
    label: u[0].toUpperCase() + u.slice(1)
  }));
  Array.isArray(r) && r.length > 0 && (o = o.filter((u) => !r.includes(u.value)));
  const { handleSyncStatus: l, destroy: c } = await $n(
    n,
    {
      ...i,
      onSearch: async (u) => {
        if (u) {
          const f = o.filter((m) => m.label.match(new RegExp(zt(u), "gi")));
          return f.sort((m, h) => m.label.length - h.label.length), f;
        } else
          return o;
      },
      onChange: (u) => {
        a && a(u.map((f) => f.value));
      }
    }
  );
  return { handleSyncStatus: l, destroy: c };
}
async function Xt(n, e) {
  const { model: t, conditions: s, limit: r, sortDirection: a, labelAttribute: i, initialLabel: o, initialValue: l, onChange: c, ...d } = e || {};
  if (!t)
    throw new Error("Model property missing!");
  var u = null;
  const f = t.getAttributesDetails();
  let m = i;
  if (!m && f) {
    for (const g in f)
      if (typeof f[g].type == "string" && ["varchar", "text"].includes(f[g].type)) {
        m = g;
        break;
      }
  }
  let h = [], p = l;
  if (l || o && m)
    try {
      const g = o instanceof Array ? o : typeof o == "string" ? [o] : void 0, w = l instanceof Array ? l : typeof l == "string" ? [l] : void 0;
      h = await t.list({
        forceLocal: !0,
        // TODO: Change to HTTP | Condition caused a server error
        conditions: [
          ...g && m ? [[m, "IN", g]] : [["_blitzID", "IN", w]],
          ...s ?? []
        ]
      }), h.length > 0 && (p = h.map((S) => S._blitzID.value).filter((S) => S != null));
    } catch (g) {
      g.stack && console.error(g.stack);
    }
  const { handleSyncStatus: y, destroy: v } = await $n(
    n,
    {
      ...d,
      initialValue: p,
      onSearch: async (g) => {
        try {
          u && u.abort(), u = new AbortController();
          const w = g && m, S = await t.list({
            signal: u.signal,
            forceHttp: !0,
            customSortDirection: a,
            limit: r ?? 100,
            conditions: w || s ? [
              ...w ? [[m, "LIKE", `%${g}%`]] : [],
              ...s ?? []
            ] : void 0
          }), $ = h.every((M) => !!S.find((b) => b._blitzID.value === M._blitzID.value)), P = (w || $ ? S : [...h, ...S]).map((M) => ({
            obj: M,
            value: M._blitzID.value,
            label: m ? M[m].value ?? "/" : "/"
          })).filter((M, b, j) => j.findIndex((E) => E.value === M.value) === b);
          return w && P.sort((M, b) => M.label.length - b.label.length), P;
        } catch (w) {
          return w.message.includes("AbortError") || w.message.includes("The user aborted a request") ? [] : (w.stack && console.error(w.stack), []);
        }
      },
      onChange: (g) => {
        c && c(g.map((w) => w.obj));
      }
    }
  );
  return { handleSyncStatus: y, destroy: v };
}
const Ks = (n) => ({ getAttributeDetails: () => n.attributeDetails }), Nc = {
  type: ["enum", "enum[]"],
  control: async (n) => {
    const { host: e, value: t, onChange: s, config: r, status: a } = n, { handleSyncStatus: i, destroy: o } = await Vt(e, {
      ...r,
      model: Ks(n),
      attribute: r.className ?? "value",
      initialValue: t,
      multiple: !!r.multiple,
      onChange: (c) => s(r.multiple ? et(c) : c[0] ?? null)
    }), l = a == null ? void 0 : a(i);
    return () => {
      l == null || l(), o();
    };
  },
  filter: async (n) => {
    const { host: e, value: t, onChange: s, config: r } = n, { destroy: a } = await Vt(e, {
      ...r,
      model: Ks(n),
      attribute: r.className ?? "value",
      initialValue: t == null ? void 0 : t.values,
      multiple: !0,
      onChange: (i) => s(i.length > 0 ? { op: "in", values: i } : null)
    });
    return () => a();
  }
}, ds = async (n, e) => {
  const t = await n.resolveModel(
    Array.isArray(n.attributeDetails.type) ? n.attributeDetails.type[0] : n.attributeDetails.type
  );
  return Xt(n.host, { ...n.config, model: t, groupByParent: !0, ...e });
}, Yr = async (n) => {
  var t;
  const { destroy: e } = await ds(n, {
    multiple: !0,
    limit: 100,
    selectChildrenWithParent: !0,
    initialValue: (t = n.value) == null ? void 0 : t.values,
    onChange: (s) => n.onChange(s.length > 0 ? { op: "in", values: s.map((r) => r._blitzID.value) } : null)
  });
  return () => e();
}, qc = {
  type: "fk",
  control: async (n) => {
    var r;
    const { handleSyncStatus: e, destroy: t } = await ds(n, {
      multiple: !1,
      initialValue: n.value,
      onChange: (a) => {
        var i;
        return n.onChange(((i = a[0]) == null ? void 0 : i._blitzID.value) ?? null);
      }
    }), s = (r = n.status) == null ? void 0 : r.call(n, e);
    return () => {
      s == null || s(), t();
    };
  },
  filter: Yr
}, Uc = {
  type: "user",
  defaultConfig: { usersModel: "0BAUsers", labelAttribute: "username" },
  filter: async (n) => {
    var s;
    const e = await n.resolveModel(n.config.usersModel), { destroy: t } = await Xt(n.host, {
      ...n.config,
      model: e,
      multiple: !0,
      limit: 100,
      initialValue: (s = n.value) == null ? void 0 : s.values,
      onChange: (r) => n.onChange(r.length > 0 ? { op: "in", values: r.map((a) => a._blitzID.value) } : null)
    });
    return () => t();
  }
}, Fc = {
  type: "mtm",
  default: () => null,
  control: async (n) => {
    var r;
    const { handleSyncStatus: e, destroy: t } = await ds(n, {
      multiple: !0,
      initialValue: n.value,
      onChange: (a) => n.onChange(a.length > 0 ? a.map((i) => i._blitzID.value) : null)
    }), s = (r = n.status) == null ? void 0 : r.call(n, e);
    return () => {
      s == null || s(), t();
    };
  },
  filter: Yr
}, Rc = [
  ac,
  ic,
  oc,
  lc,
  cc,
  uc,
  dc,
  fc,
  hc,
  mc,
  pc,
  yc,
  gc,
  vc,
  bc,
  wc,
  _c,
  Ec,
  Sc,
  kc,
  Ac,
  jc,
  Tc,
  Nc,
  qc,
  Fc,
  Uc
];
function yn(n, e, t = !1) {
  const s = n.replace(/[^\d+]/g, ""), r = [];
  if (s.length === 10)
    r.push(s.slice(0, 3)), r.push(s.slice(3, 6)), r.push(s.slice(6, 8)), r.push(s.slice(8, 10));
  else if (s.length === 9)
    r.push(s.slice(0, 3)), r.push(s.slice(3, 6)), r.push(s.slice(6, 9));
  else if (s.length === 11)
    r.push(s.slice(0, 3)), r.push(s.slice(3, 7)), r.push(s.slice(7, 11));
  else
    for (let i = 0; i < s.length; i += 3)
      r.push(s.slice(i, i + 3));
  const a = r.filter(Boolean).join(" ");
  return e && t ? `${e} ${a}` : a;
}
function Xs(n, e = !0) {
  return new Intl.NumberFormat("de-DE", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: e }).format(n).replace(/\./g, "'").replace(/,/g, ".");
}
function Kr(n, e) {
  if (!e)
    return Xs(n);
  try {
    return new Intl.NumberFormat("de-DE", { currency: e, style: "currency" }).format(n).replace(/\./g, "'").replace(/,/g, ".");
  } catch {
    return `${Xs(n)} ${e}`;
  }
}
function Wc(n) {
  if (n === "" || n === null || n === void 0)
    return "";
  const e = parseFloat(n);
  return isNaN(e) ? String(n) : String(Math.round(e * 1e4) / 1e4);
}
function Bc(n) {
  const e = Math.max(0, Math.floor(n));
  return {
    d: Math.floor(e / 86400),
    h: Math.floor(e % 86400 / 3600),
    m: Math.floor(e % 3600 / 60),
    s: e % 60
  };
}
function Jc(n) {
  if (typeof n == "number" && Number.isFinite(n))
    return Math.max(0, Math.floor(n));
  if (typeof n != "string" || n.trim() === "")
    return null;
  if (/^\d+$/.test(n.trim()))
    return parseInt(n.trim(), 10);
  const e = { d: 86400, h: 3600, m: 60, s: 1 };
  let t = 0, s = !1;
  for (const [, r, a] of n.matchAll(/(\d+)\s*([dhms])/gi))
    t += parseInt(r, 10) * e[a.toLowerCase()], s = !0;
  return s ? t : null;
}
function Vc(n, e) {
  const t = [];
  let s = 0;
  for (; s < n.length; ) {
    const u = n.charAt(s);
    if (u === " " || u === "	") {
      s++;
      continue;
    }
    if ("+-*/()".includes(u)) {
      t.push({ kind: u }), s++;
      continue;
    }
    if (u >= "0" && u <= "9" || u === ".") {
      let f = s;
      for (; f < n.length && (n[f] >= "0" && n[f] <= "9" || n[f] === "."); )
        f++;
      t.push({ kind: "num", value: parseFloat(n.substring(s, f)) }), s = f;
      continue;
    }
    if (u === "_" || /[a-zA-Z]/.test(u)) {
      let f = s;
      for (; f < n.length && /[a-zA-Z0-9_]/.test(n[f]); )
        f++;
      t.push({ kind: "id", name: n.substring(s, f) }), s = f;
      continue;
    }
    throw new Error(`Unexpected character in formula: ${u}`);
  }
  let r = 0;
  const a = () => t[r], i = (u) => {
    const f = t[r];
    if (!f || f.kind !== u)
      throw new Error(`Expected ${u}`);
    return r++, f;
  };
  function o() {
    let u = l();
    for (; a() && (a().kind === "+" || a().kind === "-"); ) {
      const f = t[r++].kind, m = l();
      u = f === "+" ? u + m : u - m;
    }
    return u;
  }
  function l() {
    let u = c();
    for (; a() && (a().kind === "*" || a().kind === "/"); ) {
      const f = t[r++].kind, m = c();
      u = f === "*" ? u * m : u / m;
    }
    return u;
  }
  function c() {
    const u = a();
    if (!u)
      throw new Error("Unexpected end of formula");
    if (u.kind === "-")
      return r++, -c();
    if (u.kind === "num")
      return r++, u.value;
    if (u.kind === "(") {
      r++;
      const f = o();
      return i(")"), f;
    }
    if (u.kind === "id")
      return r++, e(u.name);
    throw new Error(`Unexpected token: ${u.kind}`);
  }
  const d = o();
  if (r !== t.length)
    throw new Error("Trailing tokens in formula");
  return d;
}
function Yc(n, e) {
  const t = Object.keys(n);
  if (t.length === 0)
    return "";
  if (e) {
    if (typeof n[e] == "string")
      return n[e];
    const r = e.split("_")[0], a = t.find((i) => i === r || i.startsWith(`${r}_`));
    if (a && typeof n[a] == "string")
      return n[a];
  }
  if (typeof n.default == "string")
    return n.default;
  const s = t.find((r) => typeof n[r] == "string");
  return s ? n[s] : "";
}
const Kc = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
function Xc(n) {
  const e = n.match(Kc);
  return e ? e[1] : null;
}
function Qc(n) {
  if (n.thumbnail)
    return n.thumbnail;
  if (n["tn-oq"])
    return n["tn-oq"];
  const e = n.url ? Xc(n.url) : null;
  return e ? `https://img.youtube.com/vi/${e}/hqdefault.jpg` : null;
}
const ut = (n) => n == null || n === "" || Array.isArray(n) && n.length === 0;
function Xr(n, e) {
  var s, r, a, i;
  const t = (a = (r = (s = n._object) == null ? void 0 : s.model) == null ? void 0 : r.getAttributesDetails) == null ? void 0 : a.call(r);
  return (i = t == null ? void 0 : t[n._name]) == null ? void 0 : i[e];
}
function Qr(n) {
  const e = Xr(n, "unit"), t = Array.isArray(e) ? e[0] : e;
  return typeof t == "string" && t !== "" ? t : void 0;
}
const Zc = (n, e) => {
  const t = parseFloat(n.value);
  return ut(n.value) || isNaN(t) ? "" : `<p class="${n._name} bd-currency">${(e == null ? void 0 : e.labelHtml) ?? ""}${Kr(t, Qr(n))}</p>`;
}, Gc = (n, e) => ut(n.value) ? "" : `<p class="${n._name} bd-percentage">${(e == null ? void 0 : e.labelHtml) ?? ""}${pe(Wc(n.value))} <span class="bd-percentage-sign">%</span></p>`, eu = (n, e) => {
  const t = Jc(n.value);
  if (t === null)
    return "";
  const s = Bc(t), r = ["d", "h", "m", "s"].filter((i) => s[i] > 0), a = (r.length > 0 ? r : ["s"]).map(
    (i) => `<span class="bd-duration-part bd-duration-${i}"><span class="bd-duration-value">${s[i]}</span><span class="bd-duration-unit">${i}</span></span>`
  );
  return `<p class="${n._name} bd-duration">${(e == null ? void 0 : e.labelHtml) ?? ""}${a.join(" ")}</p>`;
}, tu = (n, e) => {
  if (ut(n.value))
    return "";
  const t = n.value;
  return `<div class="${n._name} bd-email">
                    <p>${(e == null ? void 0 : e.labelHtml) ?? ""}<a href="mailto:${Je(t)}">${pe(t)}</a></p>
                </div>`;
}, nu = (n, e) => {
  var l;
  if (ut(n.value))
    return "";
  const t = n.value, s = t.split("-"), r = (l = s[0]) != null && l.startsWith("+") ? s[0] : `+${s[0]}`, a = s.length === 2 ? yn(s[1], r, !0) : yn(t), i = t.replace(/[^\d+]/g, ""), o = s.length === 2 && !i.startsWith("+") ? `+${i}` : i;
  return `<div class="${n._name} bd-phone">
                    <p>${(e == null ? void 0 : e.labelHtml) ?? ""}<a href="tel:${Je(o)}">${pe(a)}</a></p>
                </div>`;
}, su = (n, e) => ut(n.value) ? "" : `<div class="${n._name} bd-url">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    <a href="${Je(n.value)}" target="_blank" rel="noopener noreferrer">${pe(n.value)}</a>
                </div>`, ru = (n, e) => {
  const t = n.value;
  return t != null && t.url ? `<p class="${n._name} bd-file">${(e == null ? void 0 : e.labelHtml) ?? ""}<a href="${Je(t.url)}" target="_blank" rel="noopener noreferrer">${pe(t.url)}</a></p>` : "";
}, au = (n, e) => {
  const t = n.value;
  if (ut(t))
    return "";
  const s = typeof t == "object" ? Yc(t, ie == null ? void 0 : ie.defaultLanguage) : String(t);
  return s === "" ? "" : `<p class="${n._name} bd-texti18n bd-text">${(e == null ? void 0 : e.labelHtml) ?? ""}${pe(s)}</p>`;
};
function iu(n) {
  let e;
  if (Array.isArray(n))
    e = n;
  else if (typeof n == "string")
    try {
      const t = JSON.parse(n);
      e = Array.isArray(t) ? t : [n];
    } catch {
      e = [n];
    }
  else
    e = [n];
  return e.map((t) => Wt(t)).filter((t) => t != null && t !== "").map((t) => String(t).split("|")[0]);
}
const ou = (n, e) => {
  if (ut(n.value))
    return "";
  const t = iu(n.value);
  return t.length === 0 ? "" : `<div class="${n._name} bd-tag">${(e == null ? void 0 : e.labelHtml) ?? ""}${t.map((s) => `<span class="bd-tag-chip">${pe(s)}</span>`).join(" ")}</div>`;
}, lu = (n, e) => {
  const t = typeof n.value == "string" ? { url: n.value } : n.value;
  if (!(t != null && t.url))
    return "";
  const s = Qc(t), r = s ? `<span class="bd-youtube-poster"><span class="bd-youtube-play"></span><img alt="" src="${Je(s)}" /></span>` : '<span class="bd-youtube-label">&#9654; YOUTUBE</span>';
  return `<div class="${n._name} bd-youtube bd-video">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    <a href="${Je(t.url)}" target="_blank" rel="noopener noreferrer">${r}</a>
                </div>`;
}, cu = (n, e) => {
  var d, u;
  const t = Xr(n, "formula"), s = typeof t == "string" && t !== "" ? t : n.value;
  if (ut(s) || typeof s != "string")
    return "";
  const r = s.replace(/^\s*=/, ""), a = ((d = n._object) == null ? void 0 : d._attributes) ?? {}, i = {};
  for (const f of Object.keys(a))
    i[f.toLowerCase()] = (u = a[f]) == null ? void 0 : u.value;
  let o;
  try {
    o = Vc(r, (f) => {
      const m = f.toLowerCase();
      if (!(m in i))
        throw new Error(`Unknown field in formula: ${f}`);
      const h = parseFloat(i[m]);
      return isNaN(h) ? 0 : h;
    });
  } catch {
    return `<p class="${n._name} bd-formula" title="${pe(r)}"></p>`;
  }
  const l = Qr(n), c = l ? Kr(o, l) : String(o);
  return `<p class="${n._name} bd-formula" title="${pe(r)}">${(e == null ? void 0 : e.labelHtml) ?? ""}${c}</p>`;
}, uu = (n, e) => ut(n.value) ? "" : `<p class="${n._name} bd-hex">${(e == null ? void 0 : e.labelHtml) ?? ""}${pe(n.value)}</p>`, du = (n, e) => {
  const t = n.value;
  if (!t || !t.lat && !t.lng && !t.address && !t.city)
    return "";
  const s = t.address ?? [t.street, t.street_number, t.city, t.country].filter(Boolean).join(" "), r = t.lat && t.lng ? ` data-lat="${pe(t.lat)}" data-lng="${pe(t.lng)}"` : "";
  return `<div class="${n._name} bd-location"${r}>
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    ${s ? `<span class="bd-location-address">${pe(s)}</span>` : ""}
                </div>`;
}, fu = {
  currency: Zc,
  percentage: Gc,
  duration: eu,
  email: tu,
  phone: nu,
  url: su,
  file: ru,
  texti18n: au,
  tag: ou,
  youtube: lu,
  formula: cu,
  hex: uu,
  location: du
}, hu = (n, e) => {
  const t = e.value, s = ie == null ? void 0 : ie.googleMapsApiKey;
  if (!(t != null && t.lat) || !(t != null && t.lng) || !s)
    return;
  let r = !1;
  return Xn(t.lat, t.lng, s).then((a) => {
    a && !r && n.appendChild(a);
  }).catch(() => {
  }), () => {
    r = !0;
  };
};
function Zr(n) {
  for (const [e, t] of Object.entries(fu))
    n.registry.mergeBuiltin(e, {
      view: Rt(t, e === "location" ? hu : void 0)
    });
  n.registry.mergeBuiltin("duration", { editor: Ge(nt(() => import("./duration-4462395a.js"))) }), n.registry.mergeBuiltin("percentage", { editor: Ge(nt(() => import("./percentage-bee78ee7.js"))) }), n.registry.mergeBuiltin("tag", { editor: Ge(nt(() => import("./tag-c50b52eb.js"))) }), n.registry.mergeBuiltin("youtube", { editor: Ge(nt(() => import("./youtube-91cec5a0.js"))) }), n.registry.mergeBuiltin("json", { editor: Ge(nt(() => import("./json-bb42c3a2.js"))) }), n.registry.mergeBuiltin("markdown", { editor: Ge(nt(() => import("./markdown-6891e477.js"))) }), n.registry.mergeBuiltin("code", { editor: Ge(nt(() => import("./code-ffad5208.js"))) });
}
async function mu(n, e) {
  const { projectID: t, projectModel: s, onChange: r, ...a } = e || {}, i = t ? [t] : [];
  if (i.length === 0) {
    const u = await Ae._Model.get(s || "_Project");
    if (!u)
      throw new Error("Model name is incorrect!");
    i.push(
      ...(await u.list()).map((f) => s ? f.project_fk.value : f._blitzID.value).filter((f) => !!f)
    );
  }
  const o = async () => {
    let u = [];
    for (const f of i)
      u.push(...await Ae.listProjectUsers(f));
    return u.filter((f, m, h) => h.findIndex((p) => p.id === f.id) === m).map((f) => ({ value: f.id, label: f.username, user: f }));
  };
  let l = await o();
  const { handleSyncStatus: c, destroy: d } = await $n(
    n,
    {
      ...a,
      onSearch: async (u) => {
        if (u) {
          const f = l.filter((m) => m.label.match(new RegExp(zt(u), "gi")));
          return f.sort((m, h) => m.label.length - h.label.length), f;
        } else
          return l;
      },
      onChange: (u) => {
        r && r(u.map((f) => f.user));
      },
      onRefresh: async () => {
        for (const u of i)
          le.setProjectUsers(u, null);
        l = await o();
      }
    }
  );
  return { handleSyncStatus: c, destroy: d };
}
async function pu(n, e) {
  const { items: t, onChange: s, ...r } = e || {};
  if (!Array.isArray(t))
    throw new Error("Items property missing!");
  const a = t.map((l) => typeof l == "string" ? { value: l, label: l } : l), { handleSyncStatus: i, destroy: o } = await $n(
    n,
    {
      ...r,
      onSearch: async (l) => {
        if (l) {
          const c = a.filter((d) => d.label.match(new RegExp(zt(l), "gi")));
          return c.sort((d, u) => d.label.length - u.label.length), c;
        } else
          return a;
      },
      onChange: (l) => {
        s && s(l.map((c) => c.value));
      }
    }
  );
  return { handleSyncStatus: i, destroy: o };
}
async function yu(n, e, t) {
  var l;
  if (!n || !n._name || !n._object || !n._object.model)
    throw new Error("Fk type missing properties!");
  const s = (l = n._object.model.getAttributeDetails(n._name)) == null ? void 0 : l.type;
  if (!s)
    throw new Error("Model attributes invalid!");
  const r = await Ae._Model.get(s), { handleSyncStatus: a, destroy: i } = await Xt(e, {
    ...t,
    model: r,
    initialValue: n.value,
    initialLabel: void 0,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !1,
    onChange: async (c) => {
      var d;
      await n.edit(((d = c[0]) == null ? void 0 : d._blitzID.value) ?? null);
    }
  }), o = n.syncStatus(a);
  return {
    destroy: () => {
      o(), i();
    }
  };
}
async function gu(n, e, t) {
  if (!n || !n._name || !n._object || !n._object.model)
    throw new Error("Enum type missing properties!");
  const { handleSyncStatus: s, destroy: r } = await Vt(e, {
    ...t,
    model: n._object.model,
    attribute: n._name,
    initialValue: n.value,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !1,
    onChange: async (i) => {
      await n.edit(i[0] ?? null);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function vu(n, e, t) {
  if (!n)
    throw new Error("Varchar type missing properties!");
  const { handleSyncStatus: s, destroy: r } = We(e, {
    ...t,
    multiple: !1,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Qs(n, e, t) {
  if (!n)
    throw new Error("Text type missing properties!");
  const { handleSyncStatus: s, getValue: r, isPending: a, cancelPending: i, destroy: o } = Mt(e, {
    ...t,
    multiple: !1,
    initialValue: (t == null ? void 0 : t.draft) ?? n.value,
    onChange: async (c) => {
      await n.edit(c);
    }
  }), l = n.syncStatus(s);
  return {
    getDraft: r,
    isPending: a,
    cancelPending: i,
    destroy: () => {
      l(), o();
    }
  };
}
async function bu(n, e, t) {
  if (!n)
    throw new Error("Email type missing properties!");
  const { handleSyncStatus: s, destroy: r } = We(e, {
    ...t,
    multiple: !1,
    type: "email",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
            <rect stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" x="3" y="5" width="18" height="14" rx="2" />
        </svg>`,
    pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    errorMsg: "Wrong email address!",
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function wu(n, e, t) {
  if (!n)
    throw new Error("Url type missing properties!");
  const { handleSyncStatus: s, destroy: r } = We(e, {
    ...t,
    multiple: !1,
    type: "url",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" />
        </svg>`,
    pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    errorMsg: "Wrong URL!",
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Zs(n, e, t) {
  if (!n)
    throw new Error("Number type missing properties!");
  const { handleSyncStatus: s, destroy: r } = ct(e, {
    ...t,
    float: !1,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function In(n, e, t) {
  if (!n)
    throw new Error("Number type missing properties!");
  const { handleSyncStatus: s, destroy: r } = ct(e, {
    ...t,
    float: !0,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function _u(n, e, t) {
  if (!n)
    throw new Error("Boolean type missing properties!");
  const { handleSyncStatus: s, destroy: r } = as(e, {
    ...t,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Eu(n, e, t) {
  if (!n)
    throw new Error("JSON type missing properties!");
  const { handleSyncStatus: s, getValue: r, isPending: a, cancelPending: i, destroy: o } = Mt(e, {
    ...t,
    multiple: !1,
    initialValue: (t == null ? void 0 : t.draft) ?? (n.value ? JSON.stringify(n.value, null, 2) : ""),
    onChange: async (c) => {
      let d = null;
      try {
        c && (d = JSON.parse(c) ?? null);
      } catch {
      }
      await n.edit(d);
    }
  }), l = n.syncStatus(s);
  return {
    getDraft: r,
    isPending: a,
    cancelPending: i,
    destroy: () => {
      l(), o();
    }
  };
}
async function Su(n, e, t) {
  var c;
  if (!n)
    throw new Error("Code type missing properties!");
  const { handleSyncStatus: s, getValue: r, isPending: a, cancelPending: i, destroy: o } = Mt(e, {
    ...t,
    multiple: !1,
    initialValue: (t == null ? void 0 : t.draft) ?? ((c = n.value) == null ? void 0 : c.content) ?? "",
    onChange: async (d) => {
      var u;
      await n.edit({
        content: d,
        language: ((u = n.value) == null ? void 0 : u.language) ?? null
      });
    }
  }), l = n.syncStatus(s);
  return {
    getDraft: r,
    isPending: a,
    cancelPending: i,
    destroy: () => {
      l(), o();
    }
  };
}
async function Mu(n, e, t) {
  if (!n)
    throw new Error("Date type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Kt(e, {
    ...t,
    time: !1,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Cu(n, e, t) {
  if (!n)
    throw new Error("DateTime type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Kt(e, {
    ...t,
    time: !0,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function xu(n, e, t) {
  if (!n)
    throw new Error("Image type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Cn(e, {
    ...t,
    multiple: !1,
    initialPreviewImages: (n.value ?? []).filter((i) => i.base && i["180x180"]).map((i) => i.base + i["180x180"].substring(1)),
    onChange: async (i) => {
      s({ status: k.Pending });
      const o = [];
      for (const l of i) {
        const c = await Ae.uploader(l);
        o.push(c);
      }
      await n.edit(o);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function $u(n, e, t) {
  if (!n)
    throw new Error("Video type missing properties!");
  const { handleSyncStatus: s, destroy: r } = ls(e, {
    ...t,
    multiple: !1,
    onChange: async (i) => {
      if (i.length > 0) {
        s({ status: k.Pending });
        const o = await Ae.uploaderVideo(i[0]);
        await n.edit(o);
      }
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function ku(n, e, t) {
  if (!n)
    throw new Error("File type missing properties!");
  const { handleSyncStatus: s, destroy: r } = cs(e, {
    ...t,
    multiple: !1,
    onChange: async (i) => {
      if (i.length > 0) {
        s({ status: k.Pending });
        const o = await Ae.uploaderFile(i[0]);
        await n.edit(o);
      }
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Lu(n, e, t) {
  if (!n)
    throw new Error("Location type missing properties!");
  const { destroy: s } = us(e, {
    ...t,
    initialValue: n.value,
    onChange: async (r) => {
      await n.edit(r);
    }
  });
  return {
    destroy: s
  };
}
async function Du(n, e, t) {
  if (!n)
    throw new Error("Tag type missing properties!");
  const { handleSyncStatus: s, destroy: r } = We(e, {
    ...t,
    multiple: !1,
    type: "text",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 8V5C3 3.89543 3.89543 3 5 3H8L20 15L15 20L3 8Z" />
            <circle fill="#a1a1a1" cx="7" cy="7" r="1.25" />
        </svg>`,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Au(n, e, t) {
  if (!n)
    throw new Error("Translated type missing properties!");
  const { handleSyncStatus: s, destroy: r } = is(e, {
    ...t,
    initialValue: n.value ?? {},
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Iu(n, e, t) {
  if (!n)
    throw new Error("Duration type missing properties!");
  const { handleSyncStatus: s, destroy: r } = ct(e, {
    ...t,
    placeholder: (t == null ? void 0 : t.placeholder) ?? "seconds",
    float: !1,
    min: 0,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function ju(n, e, t) {
  if (!n)
    throw new Error("Formula type missing properties!");
  const { handleSyncStatus: s, destroy: r } = We(e, {
    ...t,
    multiple: !1,
    type: "text",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4H10.5C9.11929 4 8 5.11929 8 6.5V19M5 12H13M16 20L17.5 15M20.5 15L19 20" />
        </svg>`,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Tu(n, e, t) {
  var c, d, u, f;
  if (!n)
    throw new Error("Currency type missing properties!");
  const s = (f = (u = (d = (c = n._object) == null ? void 0 : c.model) == null ? void 0 : d.getAttributesDetails) == null ? void 0 : u.call(d)) == null ? void 0 : f[n._name], r = Array.isArray(s == null ? void 0 : s.unit) ? s == null ? void 0 : s.unit[0] : s == null ? void 0 : s.unit, a = (t == null ? void 0 : t.unit) ?? r, { handleSyncStatus: i, destroy: o } = ct(e, {
    ...t,
    label: (t == null ? void 0 : t.label) ?? a,
    float: !0,
    initialValue: n.value,
    onChange: async (m) => {
      await n.edit(m);
    }
  }), l = n.syncStatus(i);
  return {
    destroy: () => {
      l(), o();
    }
  };
}
async function Ou(n, e, t) {
  var i;
  if (!n)
    throw new Error("Youtube type missing properties!");
  const { handleSyncStatus: s, destroy: r } = We(e, {
    ...t,
    multiple: !1,
    type: "url",
    placeholder: (t == null ? void 0 : t.placeholder) ?? "https://youtube.com/watch?v=…",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect stroke="#a1a1a1" stroke-width="2" x="2" y="5" width="20" height="14" rx="4" />
            <path fill="#a1a1a1" d="M10 9L15 12L10 15V9Z" />
        </svg>`,
    pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    errorMsg: "Wrong video URL!",
    initialValue: (typeof n.value == "object" ? (i = n.value) == null ? void 0 : i.url : n.value) ?? "",
    onChange: async (o) => {
      const l = n.value && typeof n.value == "object" ? n.value : {};
      await n.edit({ ...l, url: o });
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function zu(n, e, t) {
  if (!n)
    throw new Error("Hex type missing properties!");
  const { handleSyncStatus: s, destroy: r } = We(e, {
    ...t,
    multiple: !1,
    type: "text",
    iconSvg: `<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#a1a1a1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 3L8 21M16 3L14 21M3 8H21M3 16H21" />
        </svg>`,
    pattern: /^[0-9a-fA-F]*$/,
    errorMsg: "Hex digits only (0-9, a-f)!",
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Hu(n, e, t) {
  var l;
  if (!n || !n._name || !n._object || !n._object.model)
    throw new Error("Mtm type missing properties!");
  const s = (l = n._object.model.getAttributeDetails(n._name)) == null ? void 0 : l.type[0];
  if (!s)
    throw new Error("Model attributes invalid!");
  const r = await Ae._Model.get(s), { handleSyncStatus: a, destroy: i } = await Xt(e, {
    ...t,
    model: r,
    initialValue: (n.value ?? []).map((c) => c._blitzID),
    initialLabel: void 0,
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !0,
    onChange: async (c) => {
      const d = c.map((f) => f._blitzID.value), u = (n.value ?? []).map((f) => f._blitzID);
      for (const f of d)
        u.includes(f) || await n.add(f);
      for (const f of u)
        d.includes(f) || await n.remove(f);
    }
  }), o = n.syncStatus(a);
  return {
    destroy: () => {
      o(), i();
    }
  };
}
async function Pu(n, e, t) {
  if (!n || !n._name || !n._object || !n._object.model)
    throw new Error("Enum many type missing properties!");
  const { handleSyncStatus: s, destroy: r } = await Vt(e, {
    ...t,
    model: n._object.model,
    attribute: n._name,
    initialValue: vt(n.value),
    initialFirst: void 0,
    initialCallback: void 0,
    multiple: !0,
    onChange: async (i) => {
      const o = vt(n.value);
      for (const l of i)
        o.includes(l) || await n.add(l);
      for (const l of o)
        i.includes(l) || await n.remove(l);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Nu(n, e, t) {
  if (!n)
    throw new Error("Image many type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Cn(e, {
    ...t,
    multiple: !0,
    initialPreviewImages: vt(n.value).filter((i) => i && i.base && i["180x180"]).map((i) => i.base + i["180x180"].substring(1)),
    onChange: async (i) => {
      s({ status: k.Pending });
      const o = [];
      for (const l of i) {
        const c = await Ae.uploader(l);
        o.push(c);
      }
      for (const l of vt(n.value))
        await n.remove(l);
      for (const l of o)
        await n.add(l);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function Gs(n, e, t) {
  if (!n)
    throw new Error("Text many type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Sn(e, {
    ...t,
    initialValue: vt(n.value),
    onChange: async (i) => {
      const o = vt(n.value);
      for (const l of i)
        o.includes(l) || await n.add(l);
      for (const l of o)
        i.includes(l) || await n.remove(l);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
async function qu(n, e, t) {
  if (!n)
    throw new Error("Tag many type missing properties!");
  const { handleSyncStatus: s, destroy: r } = Sn(e, {
    ...t,
    placeholder: (t == null ? void 0 : t.placeholder) ?? "add a tag",
    initialValue: vt(n.value),
    onChange: async (i) => {
      const o = vt(n.value);
      for (const l of i)
        o.includes(l) || await n.add(l);
      for (const l of o)
        i.includes(l) || await n.remove(l);
    }
  }), a = n.syncStatus(s);
  return {
    destroy: () => {
      a(), r();
    }
  };
}
const Uu = /^\s*(javascript|data|vbscript):/i, er = (n) => Uu.test(n) ? "#" : n;
function en(n) {
  return n.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (e, t, s) => `<img alt="${t}" src="${er(s)}" />`).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (e, t, s) => `<a href="${er(s)}">${t}</a>`).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
function Gr(n) {
  const e = pe(n.replace(/\r\n?/g, `
`)).split(`
`), t = [];
  let s = [], r = null, a = [], i = null;
  const o = () => {
    s.length && t.push(`<p>${s.map(en).join("<br />")}</p>`), s = [];
  }, l = () => {
    r && t.push(`<${r.tag}>${r.items.map((u) => `<li>${en(u)}</li>`).join("")}</${r.tag}>`), r = null;
  }, c = () => {
    a.length && t.push(`<blockquote>${a.map(en).join("<br />")}</blockquote>`), a = [];
  }, d = () => {
    o(), l(), c();
  };
  for (const u of e) {
    if (i) {
      /^```/.test(u) ? (t.push(`<pre><code>${i.join(`
`)}</code></pre>`), i = null) : i.push(u);
      continue;
    }
    if (/^```/.test(u)) {
      d(), i = [];
      continue;
    }
    const f = u.match(/^(#{1,6})\s+(.*)$/);
    if (f) {
      d(), t.push(`<h${f[1].length}>${en(f[2])}</h${f[1].length}>`);
      continue;
    }
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(u)) {
      d(), t.push("<hr />");
      continue;
    }
    const m = u.match(/^&gt;\s?(.*)$/);
    if (m) {
      o(), l(), a.push(m[1]);
      continue;
    }
    const h = u.match(/^\s*[-*]\s+(.*)$/), p = u.match(/^\s*\d+\.\s+(.*)$/);
    if (h || p) {
      o(), c();
      const y = h ? "ul" : "ol";
      (!r || r.tag !== y) && (l(), r = { tag: y, items: [] }), r.items.push((h ?? p)[1]);
      continue;
    }
    if (u.trim() === "") {
      d();
      continue;
    }
    l(), c(), s.push(u);
  }
  return i && t.push(`<pre><code>${i.join(`
`)}</code></pre>`), d(), t.join(`
`);
}
const tn = (n, e) => `<p class="${`${n._name} bd-number`}">${(e == null ? void 0 : e.labelHtml) ?? ""}${n.value.toString()}</p>`, Jn = (n, e) => {
  const t = (n.value instanceof Array ? n.value : [n.value]).map(Wt);
  return t.length === 0 ? "" : `<p class="${`${e != null && e.isSince ? "since" : n._name} bd-text`}">${(e == null ? void 0 : e.labelHtml) ?? ""}${t.join(", ")}</p>`;
}, Fu = {
  int: tn,
  tinyint: tn,
  double: tn,
  float: tn,
  percentage: (n, e) => `<p class="${`${n._name} bd-percentage`}">${(e == null ? void 0 : e.labelHtml) ?? ""}${n.value.toString()} <span class="bd-percentage-sign">%</span></p>`,
  varchar: Jn,
  text: Jn,
  email: (n, e) => `<div class="${`${n._name} bd-email`}">
                    <p>${(e == null ? void 0 : e.labelHtml) ?? ""}${n.value}</p>
                </div>`,
  phone: (n, e) => {
    const t = n.value.split("-");
    return `<div class="${`${n._name} bd-phone`}">
                    <p>${(e == null ? void 0 : e.labelHtml) ?? ""}${t.length === 2 ? (
      // Handle phone number with country code
      yn(t[1])
    ) : (
      // Handle phone number without country code
      yn(n.value)
    )}</p>
                </div>`;
  },
  url: (n, e) => `<div class="${`${n._name} bd-url`}">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    <a href="${Je(n.value)}">${n.value}</a>
                </div>`,
  htmlText: (n, e) => `<div class="${`${n._name} bd-html`}">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    ${n.value}
                </div>`,
  // Unlike htmlText (trusted rich text, rendered raw), markdown is authored
  // plain text: the renderer escapes the whole source before transforming,
  // so this is safe for untrusted input by construction.
  markdown: (n, e) => typeof n.value != "string" || n.value === "" ? "" : `<div class="${`${n._name} bd-markdown`}">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    ${Gr(n.value)}
                </div>`,
  boolean: (n, e) => `<div class="${`${n._name} bd-boolean ${n.value === !0 ? "icon-true" : "icon-false"}`}">
                ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}</div>`,
  datetime: (n, e) => {
    const t = ie != null && ie.formatDates && typeof n.toFormatted == "function" ? n.toFormatted(ie == null ? void 0 : ie.defaultLanguage) : n.value;
    return `<div class="${`${n._name} bd-datetime`}">
                    <p>${(e == null ? void 0 : e.labelHtml) ?? ""}${t}</p>
                </div>`;
  },
  date: (n, e) => {
    const t = ie != null && ie.formatDates && typeof n.toFormatted == "function" ? n.toFormatted(ie == null ? void 0 : ie.defaultLanguage) : n.value;
    return `<div class="${`${n._name} bd-date`}">
                    <p>${(e == null ? void 0 : e.labelHtml) ?? ""}${t}</p>
                </div>`;
  },
  enum: (n, e) => {
    const t = (n.value instanceof Array ? n.value : [n.value]).map(Wt);
    return t.length === 0 ? "" : `<div class="${`${n._name} bd-enum`}">
                    <p>${(e == null ? void 0 : e.labelHtml) ?? ""}${t.join(", ")}</p>
                </div>`;
  },
  json: (n, e) => {
    const t = JSON.stringify(n.value, null, 2) ?? "";
    return `<div class="${`${n._name} bd-json`}">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    <pre>${t}</pre>
                </div>`;
  },
  code: (n, e) => {
    var s;
    const t = ((s = n.value) == null ? void 0 : s.content) ?? "";
    return `<div class="${`${n._name} bd-code`}">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    <pre>${t}</pre>
                </div>`;
  },
  image: (n, e) => {
    const t = (n.value instanceof Array ? n.value : [n.value]).map((s) => Wt(s)).filter((s) => s && s.base && s.sd);
    return t.length === 0 ? "" : `<div class="${`${n._name} bd-image`}">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    ${t.map((s) => `<img alt="" width="100%" src="${s.base + s.sd.substring(1)}" />`).join(`
`)}
                </div>`;
  },
  video: (n, e) => {
    const t = n.value;
    return t != null && t.url ? `<div class="${`${n._name} bd-video`}">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    <video controls>
                        <source src="${t.url}">
                        Your browser does not support the video tag.
                    </video>
                </div>` : "";
  },
  // Preserved 1.0.x divergence: the string path renders a bare anchor, the
  // element path a <p> wrapper with label — kept byte-compatible on purpose.
  file: (n, e) => {
    const t = n.value;
    return t != null && t.url ? e != null && e.serialized ? `<a class="${`${n._name} bd-file`}" href="${Je(t.url)}">Link</a>` : `<p class="${`${n._name} bd-file`}">${(e == null ? void 0 : e.labelHtml) ?? ""}<a href="${Je(t.url)}">Link</a></p>` : "";
  },
  // The shell only: the map itself is the built-in location hydrator.
  // Serialized form carries data-lat/lng for template rehydration.
  location: (n, e) => {
    const t = n.value;
    return !(t != null && t.lat) || !(t != null && t.lng) ? "" : e != null && e.serialized ? `<div class="${`${n._name} bd-location`}" data-lat="${t.lat}" data-lng="${t.lng}"></div>` : `<div class="${`${n._name} bd-location`}">${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}</div>`;
  }
}, Ru = (n, e) => {
  const t = n.value;
  return t == null || t === "" ? "" : typeof t == "object" && !Array.isArray(t) ? `<div class="${`${n._name} bd-json`}">
                    ${e != null && e.labelHtml ? `<p>${e.labelHtml}</p>` : ""}
                    <pre>${JSON.stringify(t, null, 2) ?? ""}</pre>
                </div>` : Jn(n, e);
}, Wu = Ru, Vn = /* @__PURE__ */ new WeakMap(), gn = /* @__PURE__ */ new Set();
let Lt = null;
function Bu() {
  Lt || typeof MutationObserver > "u" || (Lt = new MutationObserver((n) => {
    for (const e of n)
      for (const t of Array.from(e.removedNodes))
        if (t instanceof Element)
          for (const s of Array.from(gn))
            (t === s || t.contains(s)) && (s.isConnected || Ju(s));
  }), Lt.observe(document.documentElement, { childList: !0, subtree: !0 }));
}
function Ju(n) {
  const e = Vn.get(n);
  Vn.delete(n), gn.delete(n), e && e(), gn.size === 0 && Lt && (Lt.disconnect(), Lt = null);
}
function ea(n, e, t) {
  const s = e(n, t);
  typeof s == "function" && (Vn.set(n, s), gn.add(n), Bu());
}
function Vu(n, e) {
  var r, a, i, o, l;
  const t = (i = (a = (r = e._object) == null ? void 0 : r.model) == null ? void 0 : a.getName) == null ? void 0 : i.call(a), s = (l = (o = e._object) == null ? void 0 : o._blitzID) == null ? void 0 : l.value;
  return !t || !s ? !1 : (n.setAttribute("data-bd-hydrate", ""), n.setAttribute("data-bd-model", t), n.setAttribute("data-bd-id", s), n.setAttribute("data-bd-attr", e._name), !0);
}
async function Yu(n, e, t) {
  const s = Array.from(n.querySelectorAll("[data-bd-hydrate]"));
  for (const r of s) {
    const { bdModel: a, bdId: i, bdAttr: o } = r.dataset;
    if (!(!a || !i || !o))
      try {
        const l = await Ae._Model.get(a), c = await (l == null ? void 0 : l.get(i)), d = c == null ? void 0 : c[o];
        if (!d) {
          t(`hydrate: could not resolve ${a}.${o} (id ${i}) — shell left static`);
          continue;
        }
        const u = e(d);
        u && ea(r, u, d);
      } catch (l) {
        t(`hydrate failed for ${a}.${o}: ${l.message}`);
      }
  }
}
function ta(n) {
  const e = [];
  return n instanceof Array ? e.push(...n) : Object.hasOwn(n, "_attributes") ? e.push(
    ...Object.values(n._attributes).filter((t) => !t._name.startsWith("_") && !t._name.startsWith("@"))
  ) : e.push(n), e.filter((t) => t.value != null && t.value !== "");
}
async function Yn(n) {
  const e = await Ae._Model.get(n).then((t) => t == null ? void 0 : t.getAttributesDetails());
  if (e) {
    for (const t in e)
      if (typeof e[t].type == "string" && ["varchar", "text"].includes(e[t].type))
        return t;
  }
  return "_blitzID";
}
function na(n, e, t, s) {
  var i, o;
  return typeof t == "boolean" && t === !0 || Array.isArray(t) && t.includes(e) ? e.startsWith("since:") ? `<b class="bd-label">${e.split("since:")[1]}: </b>` : `<b class="bd-label">${Ot((i = n[e]) == null ? void 0 : i["label-int"], (o = n[e]) == null ? void 0 : o.label, s, e)}: </b>` : "";
}
async function sa(n, e) {
  var l, c, d;
  if (!n)
    throw new Error("Missing attribute(s)!");
  const { labelLanguage: t, enableLabels: s } = e ?? {}, r = t ?? (ie == null ? void 0 : ie.defaultLanguage) ?? "en", a = ta(n), i = a.length > 0 ? ((c = (l = a[0]._object) == null ? void 0 : l.model) == null ? void 0 : c.getAttributesDetails()) ?? {} : {}, o = [];
  for (const u of a) {
    if (u._name.startsWith("_")) {
      o.push(u.value ?? "");
      continue;
    }
    const f = u._name === "since";
    if (!f && !i[u._name])
      continue;
    const m = u._name.endsWith("_fk"), h = u._name.endsWith("_mtm"), p = na(i, u._name, s, r);
    if (m || h) {
      const g = await Yn(u._type);
      if (m) {
        const w = await u.getObject();
        (d = w == null ? void 0 : w[g]) != null && d.value && o.push(`<div class="${`${u._name} bd-fk`}">
                        <p>${p + w[g].value}</p>
                    </div>`);
        continue;
      } else if (h) {
        if (!(u.value instanceof Array))
          continue;
        const w = (await u.getObjects()).filter((S) => {
          var $;
          return ($ = S[g]) == null ? void 0 : $.value;
        });
        if (w.length === 0)
          continue;
        o.push(`<div class="${`${u._name} bd-mtm`}">
                    ${p ? `<p>${p}</p>` : ""}${w.map((S) => `<div class="fk-item">
                            <p>${S[g].value}</p>
                        </div>`).join(`
`)}
                </div>`);
        continue;
      }
    }
    const v = (this && typeof this.resolveReadonlyString == "function" ? this : lt).resolveReadonlyString(u, { serialized: !0, labelHtml: p, isSince: f });
    v && o.push(v);
  }
  return o.length === 0 ? null : o.join(`
`);
}
const Ku = {
  location: async (n, e, { googleMapsApiKey: t }) => {
    const s = e.value;
    if (!(s != null && s.lat) || !(s != null && s.lng) || !t)
      return !1;
    const r = await Xn(s.lat, s.lng, t);
    return r ? (n.appendChild(r), !0) : !1;
  }
};
async function fs(n, e) {
  var y, v;
  if (!n)
    throw new Error("Missing attribute(s)!");
  const { labelLanguage: t, enableLabels: s, googleMapsApiKey: r, status: a, statusScope: i } = e ?? {}, o = (g) => {
    var S;
    const w = this && typeof this.resolveReadonlyElement == "function" ? this : lt;
    (S = w == null ? void 0 : w.warn) == null || S.call(w, g);
  };
  let l = !1;
  const c = (g, w) => {
    if (a) {
      if (!i) {
        l || o("getHtmlElement: `status: true` without a `statusScope` — the badge would outlive the element it paints, so no badge was attached"), l = !0;
        return;
      }
      i.attach(g, w);
    }
  }, d = ta(n), u = d.length > 0 ? ((v = (y = d[0]._object) == null ? void 0 : y.model) == null ? void 0 : v.getAttributesDetails()) ?? {} : {}, f = t ?? (ie == null ? void 0 : ie.defaultLanguage) ?? "en", m = r ?? (ie == null ? void 0 : ie.googleMapsApiKey) ?? null, h = (g) => na(u, g, s, f), p = [];
  for (const g of d) {
    const w = g._name.startsWith("since:");
    if (!w && !u[g._name])
      continue;
    const S = g._name.endsWith("_fk"), $ = g._name.endsWith("_mtm"), P = h(g._name);
    if (S) {
      const j = document.createElement("div");
      j.className = `${g._name} bd-fk`, Yn(g._type).then(async (E) => {
        var _;
        const L = await g.getObject();
        (_ = L == null ? void 0 : L[E]) != null && _.value && (j.innerHTML = `<p>${P + L[E].value}</p>`);
      }).catch((E) => o(`${g._name}: fk label unresolved — ${(E == null ? void 0 : E.message) ?? E}`)), p.push(j), c(j, g);
      continue;
    } else if ($) {
      if (!(g.value instanceof Array))
        continue;
      const j = document.createElement("div");
      j.className = `${g._name} bd-mtm`, j.innerHTML = (P ? `<p>${P}</p>` : "") + g.value.map((E) => `<div class="fk-item">
                    <p data-id="${E._blitzID}"></p>
                </div>`).join(`
`), Yn(g._type).then(async (E) => {
        var A;
        const L = await g.getObjects(), _ = Array.from(j.querySelectorAll("p"));
        for (const H of L) {
          const x = _.find((C) => C.getAttribute("data-id") === H._blitzID.value);
          x && ((A = H[E]) != null && A.value) && (x.innerHTML = H[E].value);
        }
      }).catch((E) => o(`${g._name}: mtm labels unresolved — ${(E == null ? void 0 : E.message) ?? E}`)), p.push(j), c(j, g);
      continue;
    }
    const M = this && typeof this.resolveReadonlyElement == "function" ? this : lt;
    let b = M.resolveReadonlyElement(g, { labelHtml: P, isSince: w });
    if (b && g._type === "location") {
      const { render: j, layer: E } = M.resolveView(g);
      E === 0 && typeof j(g, { labelHtml: P, isSince: w }) == "string" && (await Ku.location(b, g, { googleMapsApiKey: m }) || (b = null));
    }
    b && p.push(b), b && !w && c(b, g);
  }
  if (p.length === 0)
    return null;
  if (p.length === 1)
    return p[0];
  {
    const g = document.createElement("div");
    for (const w of p)
      g.append(w);
    return g;
  }
}
async function Xu(n, e, t) {
  if (!n)
    throw new Error("Missing attribute(s)!");
  const s = typeof e == "string" ? document.getElementById(e) : e;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let r = 0;
  const a = async () => {
    const l = ++r, c = await fs(n);
    return l !== r || (s.innerHTML = "", c && s.append(c)), c;
  };
  if (!await a())
    throw new Error("Attribute not supported!");
  const o = [];
  if (t) {
    const l = Array.isArray(n) ? n : Object.hasOwn(n, "_attributes") ? Object.values(n._attributes).filter((c) => !c._name.startsWith("_") && !c._name.startsWith("@")) : [n];
    for (const c of l)
      c.value !== void 0 && typeof c.subscribe == "function" && o.push(c.subscribe(() => a(), !1));
  }
  return {
    destroy: () => {
      for (const l of o)
        l();
      r++;
    }
  };
}
const Qu = ["boolean", "datetime", "date", "image", "video", "file"];
function ra(n, e, t) {
  var oe;
  if (!n)
    throw new Error("Missing model!");
  const s = typeof e == "string" ? document.getElementById(e) : e;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    attributes: r,
    presetValues: a = {},
    requiredAttributes: i = [],
    requireAll: o,
    withLabels: l,
    validationMessages: c,
    successMessage: d,
    listEmptyMsg: u,
    addButtonLabel: f,
    labelLanguage: m,
    defaultDialCode: h,
    googleMapsApiKey: p,
    locationFieldsExpand: y,
    onSuccess: v,
    onServerSuccess: g
  } = t ?? {};
  s.innerHTML = `<div class="bd-addform ${n.getName() ?? ""}"></div>`;
  const w = s.querySelector(".bd-addform"), S = m ?? (ie == null ? void 0 : ie.defaultLanguage) ?? "en", $ = n.getAttributesDetails() ?? {}, P = Array.isArray(r) ? r : Object.keys($), M = (R) => Ot($[R]["label-int"], $[R].label, S, R), b = (lt ?? Ae.ui).kernel, j = (lt ?? Ae.ui).services, E = { image: 0, video: 0, file: 0 }, L = (R, K) => async (X) => {
    E[R]++;
    try {
      return await K(X);
    } finally {
      E[R]--;
    }
  }, _ = {
    ...j,
    upload: L("image", j.upload),
    uploadVideo: L("video", j.uploadVideo),
    uploadFile: L("file", j.uploadFile)
  };
  let A = !1, H = [];
  const x = (R) => {
    A ? R() : H.push(R);
  }, C = {};
  for (const R of P) {
    if (!$[R])
      continue;
    const K = $[R], X = Array.isArray(K.type) ? K.type[0] : K.type, be = Array.isArray(K.type), me = o || i.includes(R), ke = l || Qu.includes(X) ? M(R) + (me ? " *" : "") : void 0, N = Ea(C, R, K, n, {
      className: R,
      label: ke,
      placeholder: `${M(R)}...`,
      ...h ? { defaultDialCode: h } : {},
      ...p ? { apiKey: p } : {},
      ...y !== void 0 ? { initialExpand: y } : {},
      ...u && be && ["varchar", "text"].includes(X) ? { emptyMsg: u } : {}
    });
    N.services = _;
    const T = b.resolveForPort(N);
    C[R] = a[R] ?? K.default ?? ((oe = T.default) == null ? void 0 : oe.call(T)) ?? void 0, N.value = C[R];
    const W = document.createElement("div");
    w.append(W), b.mount(N, W, "write").then(x).catch((I) => console.error(`"${R}" Add field error:`, (I == null ? void 0 : I.stack) ?? (I == null ? void 0 : I.message)));
  }
  const z = document.createElement("button");
  z.innerText = f ?? "Add", z.className = "add-btn", w.append(z);
  const J = (R) => {
    var K;
    if (z.disabled = R, z.classList.toggle("loading", R), R) {
      if (!z.querySelector(".add-btn-spinner")) {
        const X = document.createElement("span");
        X.className = "add-btn-spinner", z.append(X);
      }
    } else
      (K = z.querySelector(".add-btn-spinner")) == null || K.remove();
  };
  z.onclick = async () => {
    if (E.image > 0) {
      alert((c == null ? void 0 : c.imageUploading) || "Please wait until images are uploaded!");
      return;
    }
    if (E.video > 0) {
      alert((c == null ? void 0 : c.videoUploading) || "Please wait until video is uploaded!");
      return;
    }
    if (E.file > 0) {
      alert((c == null ? void 0 : c.fileUploading) || "Please wait until file is uploaded!");
      return;
    }
    if (o || i.length > 0) {
      const me = (o ? P : i).filter((ke) => C[ke] == null);
      if (me.length > 0) {
        alert(((c == null ? void 0 : c.missingFields) || "Missing fields: ") + me.map((ke) => M(ke)).join(", "));
        return;
      }
    }
    const R = await n.add(C);
    if (!R) {
      alert((c == null ? void 0 : c.unexpectedError) || "Unexpected error! Please try again");
      return;
    }
    const K = d ?? "Item was added successfully!", X = () => w.innerHTML = `<p class="success-msg">${K}</p>`;
    if (g || (U(!1), X()), v && v(R), g) {
      const be = R._blitzID.value;
      J(!0);
      let me = !1;
      const ke = (T) => {
        if (!(me || T.transaction.action !== "add")) {
          if (T.status === k.Completed)
            me = !0, R.removeEventListener("syncStatusChange", ke), J(!1), U(!1), X(), g(R);
          else if (T.status === k.Failed) {
            me = !0, R.removeEventListener("syncStatusChange", ke), J(!1);
            const W = "Error: " + (T.message ?? "Add failed! Please try again.");
            alert(W), console.error(W);
          }
        }
      };
      R.addEventListener("syncStatusChange", ke);
      const N = (await Ae.queue.getJobsForObject(be))[0];
      N && ke(N);
    }
  };
  const U = (R = !0) => {
    A = !0;
    for (const K of H)
      K();
    H = [], R && (s.innerHTML = "");
  };
  return { destroy: U };
}
const jn = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
let Zu = 0, tr = 0;
function Ht(n, e) {
  const { titleElm: t, closeElm: s, onEscape: r } = e;
  n.setAttribute("role", "dialog"), n.setAttribute("aria-modal", "true"), t && (t.id || (t.id = `bd-dialog-title-${++Zu}`), n.setAttribute("aria-labelledby", t.id)), s && (s.setAttribute("role", "button"), s.setAttribute("aria-label", "Close"), s.tabIndex = 0, s.addEventListener("keydown", (d) => {
    d.key !== "Enter" && d.key !== " " || (d.preventDefault(), s.click());
  }));
  const a = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  n.tabIndex = -1, (n.querySelector(jn) ?? n).focus(), ++tr === 1 && (document.body.style.overflowY = "hidden");
  const i = () => {
    const d = document.querySelectorAll('[data-bd-portal][role="dialog"]');
    return d[d.length - 1] === n;
  }, o = (d) => {
    const u = d instanceof Element ? d.closest("[data-bd-portal]") : null;
    return !!u && u !== n;
  }, l = (d) => {
    if (!i() || o(d.target))
      return;
    if (d.key === "Escape") {
      r == null || r();
      return;
    }
    if (d.key !== "Tab")
      return;
    const u = [...n.querySelectorAll(jn)];
    if (!u.length) {
      d.preventDefault(), n.focus();
      return;
    }
    const f = document.activeElement instanceof HTMLElement ? u.indexOf(document.activeElement) : -1;
    if (f === -1) {
      d.preventDefault(), u[0].focus();
      return;
    }
    d.shiftKey && f === 0 ? (d.preventDefault(), u[u.length - 1].focus()) : !d.shiftKey && f === u.length - 1 && (d.preventDefault(), u[0].focus());
  }, c = (d) => {
    !i() || o(d.target) || d.target instanceof Node && n.contains(d.target) || (n.querySelector(jn) ?? n).focus();
  };
  return document.addEventListener("keydown", l), document.addEventListener("focusin", c), () => {
    document.removeEventListener("keydown", l), document.removeEventListener("focusin", c), --tr === 0 && (document.body.style.overflowY = ""), a != null && a.isConnected && a.focus();
  };
}
function Gu(n, e) {
  if (!n)
    throw new Error("Missing model!");
  const { onSuccess: t, title: s, closeOnCompletion: r, closeTimeout: a, ...i } = e ?? {}, o = a ?? 2, l = document.createElement("div");
  l.className = "bd-addmodal", l.setAttribute("data-bd-portal", "");
  const c = document.createElement("div");
  c.className = "box", c.innerHTML = `
        <div class="heading">
            <h2 class="title">${s ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="form"></div>
        <div class="close-timer" style="display: none;">
            <div class="bar"></div>
        </div>
    `;
  const d = c.querySelector(".close-btn"), u = c.querySelector(".close-timer"), f = c.querySelector(".close-timer .bar"), m = c.querySelector(".form");
  f.style.animation = `bd-addmodal-expand ${o}s linear`;
  const { destroy: h } = ra(
    n,
    m,
    {
      ...i,
      onSuccess: (g) => {
        t && t(g), r && (u.style.display = "block", setTimeout(() => {
          p || v();
        }, o * 1e3));
      }
    }
  );
  let p = !1, y = null;
  const v = () => {
    p = !0, y == null || y(), h(), l.remove();
  };
  return d.onclick = () => v(), l.onclick = (g) => {
    g && g.target !== g.currentTarget || v();
  }, l.append(c), document.body.append(l), y = Ht(l, {
    titleElm: c.querySelector(".title"),
    closeElm: d,
    onEscape: () => v()
  }), { destroy: v };
}
async function aa(n, e, t, s) {
  const r = s ?? lt, a = (u) => r ? r.getHTML(u) : sa(u);
  let i = e;
  const o = [
    // Find UI variables
    ...Array.from(i.matchAll(/\{\{([\w.]+)\}\}/g)).map((u) => ({ type: "ui", key: u[1], searchValue: `{{${u[1]}}}` })),
    // Find value variables
    ...Array.from(i.matchAll(/\[\[([\w.]+)\]\]/g)).map((u) => ({ type: "value", key: u[1], searchValue: `[[${u[1]}]]` }))
  ];
  for (const u of o)
    try {
      const { type: f, key: m, searchValue: h } = u;
      let p = n, y = m;
      const v = m.split(".");
      if (y === "since") {
        if (n._publishingdate && typeof n._publishingdate.toRelative == "function") {
          const g = n._publishingdate.toRelative(t == null ? void 0 : t.labelLanguage);
          if (g) {
            const w = new Tt("since", "varchar", g);
            w.withObject(p);
            const S = await a(w);
            i = i.replaceAll(h, () => S ?? "");
            continue;
          }
        }
        i = i.replaceAll(h, "");
        continue;
      }
      if (v.length === 2) {
        if (n[v[0]] && typeof n[v[0]].value == "object" && n[v[0]].value !== null && Object.hasOwn(n[v[0]].value, v[1])) {
          if (f === "ui") {
            const w = new Tt(v[0], "varchar", n[v[0]].value[v[1]]);
            w.withObject(p);
            const S = await a(w);
            i = i.replaceAll(h, () => S ?? "");
          } else
            i = i.replaceAll(h, () => n[v[0]].value[v[1]] ?? "");
          continue;
        }
        if (!n[v[0]] || typeof n[v[0]].getObject != "function") {
          i = i.replaceAll(h, "");
          continue;
        }
        const g = await n[v[0]].getObject();
        if (!g) {
          i = i.replaceAll(h, "");
          continue;
        }
        p = g, y = v[1];
      }
      if (!p._attributes.hasOwnProperty(y)) {
        i = i.replaceAll(h, "");
        continue;
      }
      if (f === "ui") {
        const g = await a(p[y]);
        i = i.replaceAll(h, () => g ?? "");
      } else
        i = i.replaceAll(h, () => p[y].value ?? "");
    } catch (f) {
      console.error("Template render error:", f.stack ?? f.message);
    }
  const l = document.createElement("div");
  l.innerHTML = i;
  const c = Array.from(l.querySelectorAll(".bd-location")), d = (t == null ? void 0 : t.googleMapsApiKey) ?? (ie == null ? void 0 : ie.googleMapsApiKey) ?? null;
  if (c.length > 0 && d)
    for (const u of c) {
      const f = await Xn(
        u.getAttribute("data-lat") || "0",
        u.getAttribute("data-lng") || "0",
        d
      );
      f && u.appendChild(f);
    }
  return r && await r.hydrate(l), l;
}
async function ia(n, e, t, s) {
  const r = s ?? lt, a = (l, c) => r ? r.getHtmlElement(l, c) : fs(l, c), i = [], o = e && e.length > 0 ? e : Object.keys(n._attributes);
  for (const l of o)
    try {
      let c = n, d = l;
      const u = l.split(".");
      if (u.length === 2) {
        if (n[u[0]] && typeof n[u[0]].value == "object" && n[u[0]].value !== null && Object.hasOwn(n[u[0]].value, u[1])) {
          const h = new Tt(u[0], "varchar", n[u[0]].value[u[1]]);
          h.withObject(c);
          const p = await a(h, t);
          p && (p.classList.remove(u[0]), p.classList.add(`${u[0]}-${u[1]}`), i.push(p));
          continue;
        }
        if (!n[u[0]] || typeof n[u[0]].getObject != "function")
          continue;
        const m = await n[u[0]].getObject();
        if (!m)
          continue;
        c = m, d = u[1];
      }
      if (!c._attributes.hasOwnProperty(d) || c[d]._name.startsWith("_") || c[d]._name.startsWith("@"))
        continue;
      const f = await a(c[d], t);
      f && i.push(f);
    } catch (c) {
      console.error("Attribute render error:", c.stack ?? c.message);
    }
  if (t != null && t.sinceLabel)
    try {
      if (n._publishingdate && typeof n._publishingdate.toRelative == "function") {
        const l = n._publishingdate.toRelative(t == null ? void 0 : t.labelLanguage);
        if (l) {
          const c = new Tt("since:" + t.sinceLabel, "varchar", l);
          c.withObject(n);
          const d = await a(c, t);
          d && i.push(d);
        }
      }
    } catch (l) {
      console.error("Since attribute render error:", l.stack ?? l.message);
    }
  if (i.length === 0)
    return null;
  {
    const l = document.createElement("div");
    for (const c of i)
      l.append(c);
    return l;
  }
}
function nr(n) {
  const e = [];
  let t = "";
  for (const s of n.split(/(\s+)/))
    s !== "" && (/^\s+$/.test(s) ? e.length ? e[e.length - 1].sep += s : t += s : e.push({ word: s, sep: "" }));
  return { lead: t, tokens: e };
}
function $t(n, e, t) {
  if (e === "")
    return;
  const s = n[n.length - 1];
  s && s.changed === t ? s.text += e : n.push({ text: e, changed: t });
}
function ed(n, e) {
  const t = nr(n), s = nr(e), r = { before: [], after: [], replaced: !0 };
  $t(r.before, t.lead, !1), $t(r.after, s.lead, !1);
  const a = /* @__PURE__ */ new Map(), i = (l, c, d, u, f) => {
    if (d >= u)
      return;
    $t(l, a.get(l) ?? "", !1), a.set(l, "");
    let m = "";
    for (let h = d; h < u; h++)
      m += c[h].word, h < u - 1 ? m += c[h].sep : a.set(l, c[h].sep);
    $t(l, m, f);
  }, o = (l, c, d, u) => {
    const f = /* @__PURE__ */ new Map();
    for (let v = l; v < c; v++) {
      const g = f.get(t.tokens[v].word);
      g ? g.push(v) : f.set(t.tokens[v].word, [v]);
    }
    let m = /* @__PURE__ */ new Map(), h = 0, p = 0, y = 0;
    for (let v = d; v < u; v++) {
      const g = /* @__PURE__ */ new Map();
      for (const w of f.get(s.tokens[v].word) ?? []) {
        const S = (m.get(w - 1) ?? 0) + 1;
        g.set(w, S), S > y && (y = S, h = w - S + 1, p = v - S + 1);
      }
      m = g;
    }
    if (y === 0) {
      i(r.before, t.tokens, l, c, !0), i(r.after, s.tokens, d, u, !0);
      return;
    }
    r.replaced = !1, o(l, h, d, p), i(r.before, t.tokens, h, h + y, !1), i(r.after, s.tokens, p, p + y, !1), o(h + y, c, p + y, u);
  };
  return o(0, t.tokens.length, 0, s.tokens.length), $t(r.before, a.get(r.before) ?? "", !1), $t(r.after, a.get(r.after) ?? "", !1), r;
}
const td = "@NULL", Tn = { known: !1, value: null };
function On(n) {
  if (n == null || n === td)
    return null;
  if (typeof n == "string")
    return n;
  try {
    return JSON.stringify(n);
  } catch {
    return String(n);
  }
}
function vn(n) {
  const e = n == null ? void 0 : n.data;
  if (e && typeof e == "object")
    return e;
  if (typeof e != "string" || e === "")
    return null;
  try {
    const t = JSON.parse(e);
    return t && typeof t == "object" ? t : null;
  } catch {
    return null;
  }
}
function nd(n) {
  if (!n)
    return null;
  for (const e of Object.keys(n))
    return e;
  return null;
}
function Kn(n) {
  return n != null && n.attribute ? n.attribute : nd(vn(n));
}
function oa(n) {
  var s;
  const e = Kn(n);
  if (!e)
    return null;
  const t = (s = vn(n)) == null ? void 0 : s[e];
  return t && typeof t == "object" && t.path ? String(t.path) : null;
}
function la(n, e) {
  var a;
  const t = n[e];
  if (!t || t.action === "add")
    return Tn;
  const s = Kn(t);
  if (!s)
    return Tn;
  const r = (a = vn(t)) == null ? void 0 : a[s];
  if (r && typeof r == "object" && "prev" in r)
    return { known: !0, value: On(r.prev) };
  for (let i = e + 1; i < n.length; i++) {
    const o = n[i];
    if (o.action === "add") {
      const l = vn(o);
      if (l && s in l) {
        const c = l[s];
        return {
          known: !0,
          value: On(c && typeof c == "object" && "new" in c ? c.new : c)
        };
      }
      continue;
    }
    if (Kn(o) === s)
      return { known: !0, value: On(o.newValue) };
  }
  return Tn;
}
function kn(n, e, t = {}) {
  if (!n)
    throw new Error("mountObjectHistory: missing object");
  const s = typeof e == "string" ? document.getElementById(e) ?? document.querySelector(e) : e;
  if (!s)
    throw new Error("mountObjectHistory: container not found");
  const r = s, a = t.emptyMessage ?? "No history yet!", i = t.attributeLabel ?? ((_) => _), o = typeof n.history == "function";
  r.classList.add("bd-oh");
  let l = [], c = !0, d = null, u = !1, f = null;
  const m = (_) => {
    const A = Number(_);
    return Number.isFinite(A) ? cn(A).toLocaleString() : _;
  }, h = [
    [60, "minute"],
    [60, "hour"],
    [24, "day"],
    [7, "week"],
    [4.35, "month"],
    [12, "year"]
  ], p = (_) => {
    const A = Number(_);
    if (!Number.isFinite(A))
      return _;
    let H = (cn(A).getTime() - Date.now()) / 1e3, x = "second";
    for (const [C, z] of h) {
      if (Math.abs(H) < C)
        break;
      H /= C, x = z;
    }
    return new Intl.RelativeTimeFormat(void 0, { numeric: "auto" }).format(Math.round(H), x);
  }, y = 140, v = 24, g = (_) => {
    if (_ == null)
      return null;
    if (typeof _ == "string")
      return _;
    try {
      return JSON.stringify(_);
    } catch {
      return String(_);
    }
  }, w = (_) => _.map((A) => A.changed ? ee`<mark class="bd-oh-diff">${A.text}</mark>` : ee`<span>${A.text}</span>`).join("");
  function S(_, A, H) {
    const x = se(A ? w(A) : ee`${_}`);
    return _.length <= y ? ee`<span class="bd-oh-side bd-oh-${H}">${x}</span>` : ee`<details class="bd-oh-side bd-oh-${H} bd-oh-fold">
            <summary>${_.slice(0, y)}… <span class="bd-oh-fold-meta">${String(_.length)} chars</span></summary>
            <span class="bd-oh-value">${x}</span>
        </details>`;
  }
  function $(_, A) {
    if (_.action === "add")
      return P(_);
    const H = g(_.newValue), x = la(l, A), C = x.known ? x.value ?? "" : null;
    if (H == null && !x.known)
      return "";
    if (C == null)
      return ee`<div class="bd-oh-change">
                <span class="bd-oh-side bd-oh-old bd-oh-unknown" title="The change was recorded without a previous value.">—</span>
                <span class="bd-oh-arrow">→</span>
                ${se(S(H ?? "", null, "new"))}
            </div>`;
    const J = Math.max(C.length, (H ?? "").length) >= v ? ed(C, H ?? "") : null, U = J && !J.replaced ? J : null;
    return ee`<div class="bd-oh-change">
            ${se(S(C, (U == null ? void 0 : U.before) ?? null, "old"))}
            <span class="bd-oh-arrow">→</span>
            ${se(S(H ?? "", (U == null ? void 0 : U.after) ?? null, "new"))}
        </div>`;
  }
  function P(_) {
    let A = _.data;
    if (typeof A == "string")
      try {
        A = JSON.parse(A);
      } catch {
        A = null;
      }
    if (!A || typeof A != "object")
      return "";
    const H = Object.entries(A).filter(([x]) => !x.startsWith("_")).map(([x, C]) => [x, g((C == null ? void 0 : C.new) ?? C)]).filter(([, x]) => x != null && x !== "");
    return H.length ? ee`<details class="bd-oh-created">
            <summary>${String(H.length)} value${H.length === 1 ? "" : "s"}</summary>
            <dl>${se(H.map(([x, C]) => ee`
                <dt>${i(x)}</dt><dd>${C.slice(0, y)}</dd>`).join(""))}</dl>
        </details>` : "";
  }
  function M(_, A) {
    const H = oa(_), x = H ? `.${H}` : "", C = _.attribute ? ee`<span class="bd-oh-attribute" title="${_.attribute}${x}">${i(_.attribute)}${x}</span>` : "", z = _._userID ? `user ${_._userID}` : null;
    return ee`<li class="bd-oh-entry">
            <span class="bd-oh-dot bd-oh-${_.action}"></span>
            <div class="bd-oh-entry-main">
                <div class="bd-oh-entry-top">
                    <span class="bd-oh-action">${_.action}</span>
                    ${se(C)}
                    <span class="bd-oh-entry-meta">
                        ${se(z ? ee`<span class="bd-oh-who">${z}</span>` : "")}
                        <span title="${m(_.blitzstamp)}">${p(_.blitzstamp)}</span>
                    </span>
                </div>
                ${se($(_, A))}
            </div>
        </li>`;
  }
  const b = 100;
  function j() {
    if (u)
      return;
    const _ = l.length >= b ? ee`<p class="bd-oh-cap">Showing the newest ${String(b)} changes.</p>` : "", A = c ? '<div class="bd-oh-spinner"></div>' : d ? ee`<p class="bd-oh-error">${d}</p>` : l.length ? ee`<ul class="bd-oh-entries">${se(l.map(M).join(""))}</ul>${se(_)}` : ee`<p class="bd-oh-empty">${a}</p>`;
    r.innerHTML = ee`
            <div class="bd-oh-banner">
                <h2>History</h2>
                <button class="bd-oh-refresh" title="Refresh">⟳</button>
            </div>
            <div class="bd-oh-body">${se(A)}</div>`;
  }
  async function E() {
    if (!u) {
      if (c = !0, d = null, j(), !o)
        d = "Reading history requires @blitzdata.ts/core 1.11 or newer.";
      else {
        f == null || f.abort();
        const _ = new AbortController();
        f = _;
        try {
          const A = await n.history(_.signal);
          if (u || _.signal.aborted)
            return;
          l = A;
        } catch (A) {
          if (u || _.signal.aborted)
            return;
          d = A.message;
        }
      }
      c = !1, j();
    }
  }
  function L(_) {
    _.target.closest(".bd-oh-refresh") && E();
  }
  return r.addEventListener("click", L), E(), {
    refresh: () => {
      E();
    },
    destroy: () => {
      u = !0, f == null || f.abort(), r.removeEventListener("click", L), r.classList.remove("bd-oh"), r.innerHTML = "";
    }
  };
}
async function ca(n, e, t) {
  if (!n)
    throw new Error("Missing object!");
  const s = typeof e == "string" ? document.getElementById(e) : e;
  if (!(s instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const { labelLanguage: r, enableLabels: a, sinceLabel: i, googleMapsApiKey: o, objectAttributes: l, template: c, history: d } = t ?? {};
  s.innerHTML = "";
  let u = null;
  if (c) {
    const h = typeof c == "function" ? c(n) : c;
    u = await aa(n, h, { labelLanguage: r, googleMapsApiKey: o });
  } else {
    const h = typeof l == "function" ? l(n) : l;
    u = await ia(n, h, { labelLanguage: r, enableLabels: a, sinceLabel: i, googleMapsApiKey: o });
  }
  u && (u.className = "bd-objectview " + (n._blitzID.value ?? ""), s.append(u));
  let f = null;
  if (d) {
    const h = document.createElement("details");
    h.className = "bd-objectview-history", h.innerHTML = '<summary>History</summary><div class="bd-objectview-history-body"></div>', h.addEventListener("toggle", () => {
      !h.open || f || (f = kn(
        n,
        h.querySelector(".bd-objectview-history-body"),
        typeof d == "object" ? d : {}
      ));
    }), s.append(h);
  }
  return { destroy: () => {
    f == null || f.destroy(), f = null, s.innerHTML = "";
  } };
}
function ua(n, e) {
  if (!n)
    throw new Error("Missing object!");
  const { title: t, titleAttribute: s, mode: r, onOpen: a, onClose: i, ...o } = e ?? {}, l = t ?? (s ? n[s].value : void 0), c = document.createElement("div");
  c.className = "bd-objectview-modal", c.setAttribute("data-bd-portal", ""), r !== "fullscreen" && (c.style.cssText = "display: flex; justify-content: center; align-items: center; padding: 16px;");
  const d = document.createElement("div");
  d.className = r === "fullscreen" ? "box-full" : "box", d.onclick = (y) => y.stopPropagation(), d.innerHTML = `
        <div class="heading">
            <h2 class="title">${l ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="view"></div>
    `;
  const u = d.querySelector(".close-btn"), f = d.querySelector(".view");
  let m = null;
  ca(n, f, o).then(({ destroy: y }) => m = y).catch((y) => console.error("mountObjectViewModal: view failed to render:", y));
  let h = null;
  const p = () => {
    h == null || h(), typeof m == "function" && m(), c.remove(), i && i(n);
  };
  return c.onclick = () => p(), u.onclick = () => p(), c.append(d), document.body.append(c), h = Ht(c, {
    titleElm: d.querySelector(".title"),
    closeElm: u,
    onEscape: () => p()
  }), a && a(n), { destroy: p };
}
function da(n, e, t) {
  let s = !1;
  const r = n.subscribeToList(e, (a) => {
    a.nextSource || (s = !0), t(a.items ?? [], s);
  }, !0);
  return () => {
    typeof r == "function" && r();
  };
}
function sd(n, e, t, s) {
  if (!n)
    throw new Error("Missing model!");
  const r = typeof e == "string" ? document.getElementById(e) : e;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    objectAttributes: a,
    cardTemplate: i,
    labelLanguage: o,
    enableLabels: l,
    sinceLabel: c,
    googleMapsApiKey: d,
    allowDelete: u,
    enableObjectView: f,
    objectViewConfig: m,
    pagination: h,
    objectsPerPage: p = 10,
    noResultsMessage: y,
    onObjectClick: v,
    onPageChange: g
  } = s ?? {};
  let w = [], S = null, $ = null, P = 1, M = Promise.resolve(), b = !1;
  r.innerHTML = `<div class="bd-list ${n.getName() ?? ""}">
        <div class="spinner"></div>
    </div>`;
  const j = r.querySelector(".bd-list"), E = da(n, t, (x, C) => {
    w = x, b = C, H();
  }), L = () => {
    E(), r.innerHTML = "";
  }, _ = (x) => {
    S = x, P = 1, H();
  }, A = (x) => {
    $ = x, H();
  }, H = () => {
    M = M.then(async () => {
      const x = [...w], C = typeof S == "function" ? x.filter(S) : x;
      typeof $ == "function" && C.sort($);
      const z = h ? C.slice((P - 1) * p, P * p) : C, J = Math.ceil(C.length / p);
      j.innerHTML = "";
      for (const U of z) {
        const oe = document.createElement("div");
        oe.className = "card " + U._blitzID.value;
        let R = null;
        try {
          if (i) {
            const K = typeof i == "function" ? i(U) : i;
            R = await aa(U, K, { labelLanguage: o, googleMapsApiKey: d }, this);
          } else {
            const K = typeof a == "function" ? a(U) : a;
            R = await ia(U, K, { labelLanguage: o, enableLabels: l, sinceLabel: c, googleMapsApiKey: d }, this);
          }
        } catch (K) {
          console.error("Object render error:", K.stack ?? K.message);
        }
        if (R) {
          if (R.className = "attributes", oe.append(R), (typeof v == "function" || f) && (R.onclick = () => {
            v && v(U), f && ua(U, { labelLanguage: o, enableLabels: l, googleMapsApiKey: d, ...m });
          }), u) {
            const K = document.createElement("div");
            K.className = "delete-btn", K.onclick = () => {
              confirm("Are you sure?") && U.delete();
            }, oe.append(K);
          }
          j.append(oe);
        }
      }
      if (j.innerHTML === "" && (j.innerHTML = b ? `<p class="empty">${y ?? "No results found!"}</p>` : '<div class="spinner"></div>'), h && J > 1) {
        const U = document.createElement("div");
        U.className = "pagination";
        for (let oe = 1; oe < J + 1; oe++) {
          const R = document.createElement("button");
          R.innerText = oe.toString(), P === oe && (R.className = "checked"), R.onclick = () => {
            P !== oe && (P = oe, g && g(P), H());
          }, U.append(R);
        }
        j.append(U);
      }
    });
  };
  return {
    destroy: L,
    getObjects: () => w,
    updateFilter: _,
    updateSort: A
  };
}
function hs(n, e) {
  var m;
  if (!n)
    throw new Error("mountObjectHistoryModal: missing object");
  const { title: t, onClose: s, ...r } = e ?? {}, a = t ?? `History of ${((m = n._blitzID) == null ? void 0 : m.value) ?? ""}`, i = document.createElement("div");
  i.className = "bd-oh-modal", i.setAttribute("data-bd-portal", "");
  const o = document.createElement("div");
  o.className = "box", o.onclick = (h) => h.stopPropagation(), o.innerHTML = `
        <div class="heading">
            <h2 class="title"></h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="panel"></div>
    `, o.querySelector(".title").textContent = a;
  const l = o.querySelector(".close-btn"), c = o.querySelector(".panel"), d = kn(n, c, r);
  let u = null;
  const f = () => {
    u == null || u(), d.destroy(), i.remove(), s && s(n);
  };
  return i.onclick = () => f(), l.onclick = () => f(), i.append(o), document.body.append(i), u = Ht(i, {
    titleElm: o.querySelector(".title"),
    closeElm: l,
    onEscape: () => f()
  }), { destroy: f };
}
function rd(n, e, t, s) {
  var Ct, Qt, gs;
  if (!n)
    throw new Error("Missing model!");
  const r = typeof e == "string" ? document.getElementById(e) : e;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const { headerLabel: a, labelLanguage: i, searchRow: o, actions: l, allowDelete: c, readonly: d, noResultsMessage: u, onRowClick: f, reorder: m, tree: h, status: p } = s ?? {}, y = n.getAttributesDetails() ?? {}, v = Object.keys(y).filter((D) => !D.startsWith("_")), g = i ?? ((Ct = this.settings) == null ? void 0 : Ct.language) ?? "en", w = (D) => {
    var q, V;
    return a ? a(D, y[D]) : Ot((q = y[D]) == null ? void 0 : q["label-int"], (V = y[D]) == null ? void 0 : V.label, g, D);
  };
  let S = [], $ = !1, P = null, M = null, b = null, j = !0, E = !1, L = null;
  const _ = {}, A = (D) => {
    var q, V;
    return ["1", !0].includes((V = (q = n._attributes) == null ? void 0 : q[D]) == null ? void 0 : V.value);
  }, x = A("hasprojects") && !!((Qt = t == null ? void 0 : t.conditions) != null && Qt.some((D) => (D == null ? void 0 : D[0]) === "project_fk" && (D == null ? void 0 : D[1]) === "=")) ? "_projectsort" : "_sort", C = m !== !1 && !d && A("hassort") && (!(t != null && t.customSort) || t.customSort === x) && (t == null ? void 0 : t.customSortDirection) !== "ASC", z = (D) => {
    var q;
    return Number(((q = D[x]) == null ? void 0 : q.value) ?? 0);
  };
  let J = null;
  const U = (D, q, V) => {
    var ge, Ce, te, G;
    const Q = q[V - 1] ? z(q[V - 1]) : null, Y = q[V] ? z(q[V]) : null;
    let ue;
    Q === null && Y === null || (Q === null ? ue = Y + 10 : Y === null ? ue = Q - 10 : ue = Math.floor((Q + Y) / 2), Q !== null && Y !== null && ue <= Y && (ue = Q), ue !== z(D) && ((G = (te = (Ce = (ge = D[x]) == null ? void 0 : ge.edit) == null ? void 0 : Ce.call(ge, String(ue))) == null ? void 0 : te.then) == null || G.call(te, () => _e())));
  }, oe = h !== !1 && ((gs = y.parent_fk) == null ? void 0 : gs.type) === n.getName() ? "parent_fk" : null, R = oe !== null, K = /* @__PURE__ */ new Set(), X = (D) => String(D._blitzID.value), be = (D) => {
    var V;
    const q = (V = D[oe]) == null ? void 0 : V.value;
    return q == null || q === "" ? null : typeof q == "object" ? q._blitzID ?? null : String(q);
  }, me = (D) => {
    const q = new Map(D.map((te) => [X(te), te])), V = /* @__PURE__ */ new Map(), Q = [];
    for (const te of D) {
      const G = be(te);
      G !== null && G !== X(te) && q.has(G) ? V.has(G) ? V.get(G).push(te) : V.set(G, [te]) : Q.push(te);
    }
    const Y = (te, G) => z(G) - z(te);
    Q.sort(Y);
    for (const te of V.values())
      te.sort(Y);
    const ue = [], ge = /* @__PURE__ */ new Map(), Ce = (te, G) => {
      for (const tt of te)
        ue.push(tt), ge.set(X(tt), { level: G, siblings: te }), K.has(X(tt)) || Ce(V.get(X(tt)) ?? [], G + 1);
    };
    return Ce(Q, 0), { view: ue, meta: ge, children: V, byId: q };
  }, ke = (D, q, V) => {
    let Q = D, Y = 0;
    for (; Q !== null && Y++ < 100; ) {
      if (Q === q)
        return !0;
      const ue = V.get(Q);
      Q = ue ? be(ue) : null;
    }
    return !1;
  }, N = (D, q, V, Q) => {
    var Y, ue, ge, Ce;
    be(D) !== q && ((Ce = (ge = (ue = (Y = D[oe]) == null ? void 0 : Y.edit) == null ? void 0 : ue.call(Y, q)) == null ? void 0 : ge.then) == null || Ce.call(ge, () => _e())), U(D, V, Q);
  };
  r.innerHTML = `<table class="bd-grid ${d ? "readonly " : ""}${n.getName() ?? ""}">
        <thead><tr class="bd-grid-head"></tr></thead><tbody></tbody>
    </table>`;
  const T = r.querySelector("thead tr"), W = r.querySelector("thead"), I = r.querySelector("tbody"), F = () => {
    if (C) {
      const D = document.createElement("th");
      D.className = "reorder", T.append(D);
    }
    if (l) {
      const D = document.createElement("th");
      D.textContent = "Actions", T.append(D);
    }
    for (const D of ["_blitzID", ...v]) {
      const q = document.createElement("th");
      q.textContent = w(D), q.dataset.col = D, q.onclick = () => {
        b !== D ? (b = D, j = !0) : j ? j = !1 : (b = null, j = !0), _e();
      }, T.append(q);
    }
    if (c && !l && T.append(document.createElement("th")), o) {
      const D = document.createElement("tr");
      D.className = "bd-grid-search", C && D.append(document.createElement("td")), l && D.append(document.createElement("td"));
      for (const q of ["_blitzID", ...v]) {
        const V = document.createElement("td"), Q = document.createElement("input");
        Q.placeholder = `Search ${w(q)}`, Q.oninput = () => {
          _[q] = Q.value.trim().toLowerCase(), _e();
        }, V.append(Q), D.append(V);
      }
      c && !l && D.append(document.createElement("td")), W.append(D);
    }
  }, ae = (D) => {
    var q;
    for (const [V, Q] of Object.entries(_))
      if (Q && !String(((q = D[V]) == null ? void 0 : q.value) ?? "").toLowerCase().includes(Q))
        return !1;
    return !0;
  };
  let ve = new on();
  const B = (D, q) => {
    ve.release(D), D.innerHTML = "", q && this.getHtmlElement(q, { status: p !== !1, statusScope: ve.for(D) }).then((V) => V && D.append(V)).catch(() => {
    });
  }, re = () => {
    var Q;
    if (!L)
      return;
    const { td: D, attribute: q, handle: V } = L;
    L = null, (Q = V == null ? void 0 : V.destroy) == null || Q.call(V), D.classList.remove("editing"), B(D, q), E && _e();
  }, de = async (D, q) => {
    var Y;
    if (!q || (L == null ? void 0 : L.td) === D || !D.isConnected)
      return;
    re(), D.classList.add("editing"), D.innerHTML = "";
    const V = { td: D, attribute: q, handle: null };
    L = V;
    const Q = await this.mountEditor(q, D, { onDone: () => re(), context: "grid" });
    L === V ? V.handle = Q : (Y = Q == null ? void 0 : Q.destroy) == null || Y.call(Q);
  }, fe = () => I.querySelectorAll(".drop-above, .drop-below, .drop-inside").forEach((D) => D.classList.remove("drop-above", "drop-below", "drop-inside")), we = (D, q, V) => {
    const Q = q.getBoundingClientRect(), Y = D.clientY - Q.top;
    return V ? Y < Q.height / 3 ? "above" : Y > Q.height * 2 / 3 ? "below" : "inside" : Y > Q.height / 2 ? "below" : "above";
  }, Se = (D, q, V, Q, Y, ue) => {
    const ge = document.createElement("td");
    if (ge.className = "reorder", !Y)
      return ge;
    const Ce = ue ? ue.meta.get(X(D)).siblings : V, te = ue ? Ce.indexOf(D) : Q, G = document.createElement("span");
    G.className = "grip", G.title = "Drag to reorder", G.onmousedown = () => {
      q.draggable = !0, document.addEventListener("mouseup", () => {
        q.draggable = !1;
      }, { once: !0 });
    };
    const tt = (Ye, dt, Ze, ft) => {
      const wt = document.createElement("button");
      return wt.textContent = Ye, wt.title = dt, wt.disabled = Ze, wt.onclick = () => U(D, Ce.filter((ya) => ya !== D), ft), wt;
    };
    return ge.append(
      tt("▲", "Move up", te === 0, te - 1),
      G,
      tt("▼", "Move down", te === Ce.length - 1, te + 1)
    ), q.ondragstart = (Ye) => {
      var dt;
      J = D, q.classList.add("dragging"), (dt = Ye.dataTransfer) == null || dt.setData("text/plain", String(D._blitzID.value)), Ye.dataTransfer && (Ye.dataTransfer.effectAllowed = "move");
    }, q.ondragend = () => {
      q.draggable = !1, q.classList.remove("dragging"), J = null, fe();
    }, q.ondragover = (Ye) => {
      !J || J === D || (Ye.preventDefault(), fe(), q.classList.add(`drop-${we(Ye, q, ue)}`));
    }, q.ondrop = (Ye) => {
      if (!J || J === D)
        return;
      Ye.preventDefault();
      const dt = we(Ye, q, ue);
      if (!ue) {
        const Ze = V.filter((ft) => ft !== J);
        U(J, Ze, Ze.indexOf(D) + (dt === "below" ? 1 : 0));
        return;
      }
      if (dt === "inside") {
        if (ke(X(D), X(J), ue.byId))
          return;
        const Ze = (ue.children.get(X(D)) ?? []).filter((ft) => ft !== J);
        K.delete(X(D)), N(J, X(D), Ze, 0);
      } else {
        const Ze = be(D);
        if (Ze !== null && ke(Ze, X(J), ue.byId))
          return;
        const ft = ue.meta.get(X(D)).siblings.filter((wt) => wt !== J);
        N(J, Ze, ft, ft.indexOf(D) + (dt === "below" ? 1 : 0));
      }
    }, ge;
  }, _e = () => {
    if (L) {
      E = !0;
      return;
    }
    E = !1, T.querySelectorAll("th[data-col]").forEach((Y) => {
      Y.dataset.col === b ? Y.dataset.sort = j ? "asc" : "desc" : delete Y.dataset.sort;
    });
    let D = S.filter(ae);
    const q = Object.values(_).some(Boolean) || typeof P == "function";
    typeof P == "function" && (D = D.filter(P));
    let V = null;
    b ? D.sort(
      (Y, ue) => {
        var ge, Ce;
        return String(((ge = Y[b]) == null ? void 0 : ge.value) ?? "").localeCompare(String(((Ce = ue[b]) == null ? void 0 : Ce.value) ?? ""), void 0, { numeric: !0 }) * (j ? 1 : -1);
      }
    ) : typeof M == "function" ? D.sort(M) : R && !q ? (V = me(D), D = V.view) : C && D.sort((Y, ue) => z(ue) - z(Y));
    const Q = C && !b && typeof M != "function" && (!R || !!V);
    if (ve.destroy(), ve = new on(), I.innerHTML = "", D.forEach((Y, ue) => {
      const ge = document.createElement("tr");
      if (C && ge.append(Se(Y, ge, D, ue, Q, V)), l) {
        const te = document.createElement("td");
        if (te.className = "grid-actions", c) {
          const G = document.createElement("button");
          G.textContent = "✕", G.title = "delete", G.onclick = () => confirm(`delete ${Y._blitzID.value}?`) && Y.delete(), te.append(G);
        }
        if (l.edit) {
          const G = document.createElement("button");
          G.textContent = "✎", G.title = "edit", G.onclick = () => l.edit(Y), te.append(G);
        }
        if (l.history) {
          const G = document.createElement("button");
          G.textContent = "🕘", G.title = "history", G.onclick = () => hs(
            Y,
            typeof l.history == "object" ? l.history : {}
          ), te.append(G);
        }
        ge.append(te);
      }
      const Ce = document.createElement("td");
      if (Ce.className = "id", Ce.textContent = Y._blitzID.value, f && (Ce.onclick = () => f(Y)), V) {
        const te = V.meta.get(X(Y)).level;
        if (Ce.style.paddingLeft = `${8 + te * 16}px`, V.children.has(X(Y))) {
          const G = document.createElement("button");
          G.className = "tree-toggle", G.textContent = K.has(X(Y)) ? "▸" : "▾", G.title = K.has(X(Y)) ? "Expand" : "Collapse", G.onclick = (tt) => {
            tt.stopPropagation(), K.has(X(Y)) ? K.delete(X(Y)) : K.add(X(Y)), _e();
          }, Ce.prepend(G);
        }
      }
      ge.append(Ce);
      for (const te of v) {
        const G = document.createElement("td");
        d || (G.onclick = () => de(G, Y[te])), B(G, Y[te]), ge.append(G);
      }
      if (c && !l) {
        const te = document.createElement("td");
        te.className = "kill", te.textContent = "×", te.onclick = () => confirm(`delete ${Y._blitzID.value}?`) && Y.delete(), ge.append(te);
      }
      I.append(ge);
    }), !D.length) {
      const Y = v.length + 1 + (c || l ? 1 : 0) + (C ? 1 : 0);
      I.innerHTML = $ ? `<tr><td class="empty" colspan="${Y}">${u ?? "No results found!"}</td></tr>` : `<tr><td class="loading" colspan="${Y}"><div class="spinner"></div></td></tr>`;
    }
  }, Oe = (D) => {
    var q, V;
    !L || L.td.contains(D.target) || (V = (q = D.target).closest) != null && V.call(q, "[data-bd-portal]") || re();
  }, He = (D) => {
    var q, V;
    D.key === "Escape" && ((V = (q = D.target) == null ? void 0 : q.closest) != null && V.call(q, "[data-bd-portal]") || document.querySelector('[data-bd-portal][role="dialog"]') || re());
  };
  d || (document.addEventListener("mousedown", Oe), document.addEventListener("keydown", He)), F(), _e();
  let Ve = !1;
  const Ue = da(n, t, (D, q) => {
    S = D, $ = q, C && !Ve && q && D.length && D.every((V) => {
      var Q;
      return ((Q = V[x]) == null ? void 0 : Q.value) === void 0;
    }) && (Ve = !0, console.warn(`mountGrid: model '${n.getName()}' has hassort but its rows carry no ${x} — reorder writes will not work. Is the attribute selected by the list query?`)), _e();
  });
  return {
    destroy: () => {
      re(), ve.destroy(), d || (document.removeEventListener("mousedown", Oe), document.removeEventListener("keydown", He)), Ue(), r.innerHTML = "";
    },
    getObjects: () => S,
    updateFilter: (D) => {
      P = D, _e();
    },
    updateSort: (D) => {
      M = D, b = null, _e();
    }
  };
}
function ms(n, e, t, s) {
  var H;
  if (!n)
    throw new Error("Missing model!");
  if (!t)
    throw new Error("Missing change callback!");
  const r = typeof e == "string" ? document.getElementById(e) : e;
  if (!(r instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    searchAttributes: a,
    filterAttributes: i,
    labels: o,
    fkSortDirection: l,
    labelLanguage: c,
    inlineMode: d,
    withLabels: u,
    searchPlaceholder: f,
    actionLabels: m
  } = s ?? {};
  r.innerHTML = `<div class="bd-filtersform ${n.getName() ?? ""}"></div>`;
  const h = r.querySelector(".bd-filtersform"), p = n.getAttributesDetails() ?? {}, y = ((H = n.getSystemAttributesDetails) == null ? void 0 : H.call(n)) ?? {}, v = (x) => p[x] ?? (i != null && i.includes(x) ? x === "project_fk" ? { type: "_Project", label: "Project" } : y[x] : void 0), g = c ?? (ie == null ? void 0 : ie.defaultLanguage) ?? "en", w = (x) => {
    if (o != null && o[x])
      return o[x];
    const C = v(x);
    return Ot(C == null ? void 0 : C["label-int"], C == null ? void 0 : C.label, g, x);
  }, S = (a ?? Object.keys(p)).filter((x) => !!p[x] && typeof p[x].type == "string" && ["varchar", "text"].includes(p[x].type));
  let $ = null;
  if (S.length > 0) {
    if ($ = document.createElement("input"), $.className = "search-input", $.type = "text", $.placeholder = f ?? "Search " + S.map((x) => w(x)).join(", ") + "...", d) {
      const x = Qn(() => _());
      $.oninput = () => x();
    }
    h.append($);
  }
  const P = (lt ?? Ae.ui).kernel, M = {};
  let b = !1, j = [];
  const E = (x) => {
    b ? x() : j.push(x);
  }, L = (i ?? Object.keys(p)).filter((x) => !!v(x) && !S.includes(x));
  for (const x of L) {
    const C = u ? w(x) : void 0, z = ur(M, x, v(x), n, d ? () => _() : void 0, {
      className: x,
      label: C,
      placeholder: C ? `${C}...` : w(x),
      ...l ? { sortDirection: l } : {}
    });
    if (!P.isFilterable(z))
      continue;
    const J = document.createElement("div");
    h.append(J), P.mount(z, J, "filter").then(E).catch((U) => console.error(`"${x}" Filter error:`, (U == null ? void 0 : U.stack) ?? (U == null ? void 0 : U.message)));
  }
  if (!d) {
    const x = document.createElement("button");
    x.className = "reset-btn", x.innerText = (m == null ? void 0 : m.reset) ?? "Reset", x.onclick = () => {
      $ && ($.value = "");
      for (const J of Object.keys(M))
        delete M[J];
      t(null);
    };
    const C = document.createElement("button");
    C.className = "apply-btn", C.innerText = (m == null ? void 0 : m.apply) ?? "Apply", C.onclick = () => {
      _();
    };
    const z = document.createElement("div");
    z.className = "actions", z.append(x, C), h.append(z);
  }
  const _ = () => {
    const x = $ != null && $.value ? (z) => S.some(
      (J) => typeof z[J].value == "string" && z[J].value.match(new RegExp(zt($.value), "gi"))
    ) : null, C = fr(M);
    t(
      x && C ? (z) => x(z) && C(z) : x ?? C ?? null
    );
  };
  return { destroy: () => {
    b = !0;
    for (const x of j)
      x();
    j = [], r.innerHTML = "";
  } };
}
function fa(n, e, t) {
  if (!n)
    throw new Error("Missing model!");
  if (!e)
    throw new Error("Missing change callback!");
  const { title: s, ...r } = t ?? {}, a = document.createElement("div");
  a.className = "bd-filtersmodal", a.setAttribute("data-bd-portal", "");
  const i = document.createElement("div");
  i.className = "box", i.innerHTML = `
        <div class="heading">
            <h2 class="title">${s ?? ""}</h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="form"></div>
    `;
  const o = i.querySelector(".close-btn"), l = i.querySelector(".form"), { destroy: c } = ms(
    n,
    l,
    (f) => {
      e(f), u();
    },
    {
      ...r,
      inlineMode: !1
    }
  );
  let d = null;
  const u = () => {
    d == null || d(), c(), a.remove();
  };
  return o.onclick = () => u(), a.onclick = (f) => {
    f && f.target !== f.currentTarget || u();
  }, a.append(i), document.body.append(a), d = Ht(a, {
    titleElm: i.querySelector(".title"),
    closeElm: o,
    onEscape: () => u()
  }), { destroy: u };
}
function ad(n, e, t, s, r) {
  if (!n)
    throw new Error("Missing model!");
  if (!t)
    throw new Error("Missing change callback!");
  const a = typeof e == "string" ? document.getElementById(e) : e;
  if (!(a instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const {
    enableFiltersModal: i,
    filtersModalConfig: o,
    filtersButtonLabel: l,
    clearFiltersLabel: c,
    sortPlaceholder: d,
    sortAttributes: u,
    searchAttributes: f,
    filterAttributes: m,
    ...h
  } = r ?? {};
  let p = null, y = null;
  const v = d ?? "Sort by", g = u ?? [
    { attribute: "_blitzstamp", label: "Newest", order: "desc" },
    { attribute: "_blitzstamp", label: "Oldest", order: "asc" }
  ];
  a.innerHTML = `<div class="bd-searchbox">
        <div class="form"></div>
        ${s ? `
            <select class="sort-select">
                <option value="" disabled>${v}</option>
                ${g.map((L, _) => `
                    <option value="${L.attribute + "--" + L.order}" ${_ === 0 ? "selected" : ""}>
                        ${L.label}
                    </option>
                `).join(`
`)}
            </select>
        ` : ""}
        ${i ? `<button class="filters-btn">
            ${l ? `<span>${l}</span>` : ""}
        </button>` : ""}
        <button class="clear-btn">${c ? `<span>${c}</span>` : ""}</button>
    </div>`;
  const w = a.querySelector(".form"), S = a.querySelector(".sort-select"), $ = a.querySelector(".filters-btn"), P = a.querySelector(".clear-btn");
  let M;
  const b = () => {
    M = ms(
      n,
      w,
      (L) => {
        p = L, j();
      },
      {
        ...h,
        searchAttributes: f,
        filterAttributes: m ?? [],
        inlineMode: !0
      }
    );
  };
  b(), $ && ($.onclick = () => {
    fa(
      n,
      (L) => {
        y = L, j();
      },
      {
        ...h,
        searchAttributes: [],
        ...o
      }
    );
  }), P.onclick = () => {
    p = null, y = null, M && M.destroy(), b(), j();
  };
  const j = () => {
    P.style.display = p || y ? "flex" : "none", t(
      p && y ? (L) => p(L) && y(L) : p ?? y ?? null
    );
  };
  if (S && s) {
    const L = n.getAttributesDetails() ?? {};
    S.onchange = () => {
      var z;
      const A = S.value.split("--"), H = A[0], x = A[1], C = ((z = L[H]) == null ? void 0 : z.type) ?? "int";
      s(
        S.value ? (J, U) => {
          var oe, R, K, X;
          if (!H || !x)
            return 0;
          if (["int", "tinyint", "double", "float", "percentage"].includes(C)) {
            const be = (oe = J[H]) != null && oe.value ? J[H].value : 0, me = (R = U[H]) != null && R.value ? U[H].value : 0;
            return x === "asc" ? be - me : me - be;
          }
          if (["varchar", "text"].includes(C)) {
            const be = ((K = J[H]) == null ? void 0 : K.value) || "", me = ((X = U[H]) == null ? void 0 : X.value) || "";
            return !be && me ? 1 : !me && be ? -1 : x === "asc" ? me.localeCompare(be, void 0, { sensitivity: "base" }) : be.localeCompare(me, void 0, { sensitivity: "base" });
          }
          return 0;
        } : null
      );
    };
    const _ = g[0];
    _ && (_.attribute !== "_blitzstamp" || _.order !== "desc") && S.onchange(null);
  }
  return { destroy: () => {
    M && M.destroy(), a.innerHTML = "";
  } };
}
function sr(n, e, t) {
  const s = n == null ? void 0 : n.presentation, r = (typeof s == "string" ? s : s == null ? void 0 : s[e]) ?? "inline";
  return r !== "auto" ? r : (typeof t == "string" ? t.length : t == null ? 0 : JSON.stringify(t).length) >= (n.modalThreshold ?? 100) ? "modal" : "expandable";
}
async function id(n, e) {
  var v, g, w, S, $, P, M, b, j;
  if (!n)
    throw new Error("Missing attribute!");
  const { title: t, use: s, live: r, onDone: a, onClose: i } = e ?? {}, o = document.createElement("div");
  o.className = "bd-editor-modal", o.setAttribute("data-bd-portal", "");
  const l = document.createElement("div");
  l.className = "box", l.onclick = (E) => E.stopPropagation(), l.innerHTML = `
        <div class="heading">
            <h2 class="title"></h2>
            <div class="close-btn">&times;</div>
        </div>
        <div class="editor"></div>
    `;
  const c = ((S = (w = (g = (v = n._object) == null ? void 0 : v.model) == null ? void 0 : g.getAttributesDetails) == null ? void 0 : w.call(g)) == null ? void 0 : S[n._name]) ?? {};
  l.querySelector(".title").textContent = t ?? Ot(c["label-int"], c.label, (($ = this.settings) == null ? void 0 : $.language) ?? "en", n._name);
  const d = l.querySelector(".editor");
  let u = null, f = null, m = !1;
  const h = () => {
    var E;
    m || (m = !0, f == null || f(), (E = u == null ? void 0 : u.destroy) == null || E.call(u), o.remove(), i == null || i());
  };
  let p;
  const y = () => {
    var H, x, C;
    const E = (H = u == null ? void 0 : u.getDraft) == null ? void 0 : H.call(u), L = n.value, _ = (x = e == null ? void 0 : e.config) == null ? void 0 : x.draft, A = typeof E == "string" && (u != null && u.isPending ? u.isPending() || _ !== void 0 && E === _ : E !== p && E !== (typeof L == "string" ? L : L == null ? "" : void 0));
    A && !confirm("Discard unsaved changes?") || (A && ((C = u == null ? void 0 : u.cancelPending) == null || C.call(u)), h());
  };
  return o.onclick = () => y(), l.querySelector(".close-btn").onclick = () => y(), o.append(l), document.body.append(o), f = Ht(o, {
    titleElm: l.querySelector(".title"),
    closeElm: l.querySelector(".close-btn"),
    onEscape: y
  }), u = await this.mountEditor(n, d, {
    use: s,
    live: r,
    config: { ...e == null ? void 0 : e.config, presentation: "inline" },
    onDone: () => {
      h(), a == null || a();
    }
  }), ((P = e == null ? void 0 : e.config) == null ? void 0 : P.draft) === void 0 && (p = (M = u == null ? void 0 : u.getDraft) == null ? void 0 : M.call(u)), (j = (b = d.querySelector("textarea, input")) == null ? void 0 : b.focus) == null || j.call(b), { destroy: h };
}
const od = `<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
</svg>`;
async function rr(n, e, t, s) {
  let r = await t(), a = null, i = !1;
  const o = document.createElement("div");
  o.className = "bd-editor-expand", o.title = s.expandTitle ?? "Expand", o.setAttribute("role", "button"), o.setAttribute("aria-label", s.expandTitle ?? "Expand"), o.tabIndex = 0, o.onkeydown = (d) => {
    d.key !== "Enter" && d.key !== " " || (d.preventDefault(), o.click());
  }, o.innerHTML = s.expandIcon ?? od;
  const l = qe(e, "bd-expandable");
  e.append(o);
  const c = () => {
    r != null && r.getDraft || o.remove();
  };
  return e.addEventListener("input", c), o.onclick = async (d) => {
    var m, h;
    d.stopPropagation();
    const u = (m = r == null ? void 0 : r.getDraft) == null ? void 0 : m.call(r);
    (h = r == null ? void 0 : r.destroy) == null || h.call(r), r = null, o.remove();
    const f = await this.mountEditorInModal(n, {
      use: s.use,
      config: { ...s.config, ...u !== void 0 ? { draft: u } : {} },
      onClose: async () => {
        var p, y;
        if (a = null, (p = s.onDone) == null || p.call(s), !i) {
          try {
            r = await t();
          } catch (v) {
            console.error(`"${n._name}" remount failed:`, (v == null ? void 0 : v.stack) ?? (v == null ? void 0 : v.message) ?? v);
            return;
          }
          if (i) {
            (y = r == null ? void 0 : r.destroy) == null || y.call(r), r = null;
            return;
          }
          e.append(o);
        }
      }
    });
    if (i) {
      f.destroy();
      return;
    }
    a = f;
  }, {
    destroy: () => {
      var d, u;
      i = !0, e.removeEventListener("input", c), o.remove(), l(), (d = a == null ? void 0 : a.destroy) == null || d.call(a), (u = r == null ? void 0 : r.destroy) == null || u.call(r);
    }
  };
}
const ld = ["htmlText", "image", "video", "file", "location", "youtube", "tag", "code"], cd = ["image", "tag"];
var Ae, ie, lt;
class ps {
  /**
   * Constructor
   */
  constructor(e, t) {
    /**
     * The DatatypeUI kernel: one registry of type modules, one config
     * cascade, one mount. Every mount path routes through it.
     */
    ne(this, "registry", new wa((e) => this.warn(e)));
    ne(this, "uiConfig", new _a());
    ne(this, "kernel", new La({
      registry: this.registry,
      config: this.uiConfig,
      resolveModel: (e) => Ae._Model.get(e),
      warn: (e) => this.warn(e),
      isDebug: () => this.debug
    }));
    /**
     * Enable dev-time logging: which layer supplied each surface, unresolved
     * hints, contract violations. Silent in production; a fallback is by
     * design, never an error.
     */
    ne(this, "debug", !1);
    /** Live handle to the mounted inspector tab, or null when it's off. */
    ne(this, "txiHandle", null);
    /** Desired on/off state — the constructor default, then any live toggle. */
    ne(this, "txiWanted", !1);
    /** True while the inspector chunk import is in flight (guards overlap). */
    ne(this, "txiLoading", !1);
    /** Tab options captured from the `transactionInspector` constructor value. */
    ne(this, "transactionInspectorConfig", {});
    /**
     * Inputs
     */
    ne(this, "inputs", {
      text: We,
      textarea: Mt,
      number: ct,
      phone: ln(() => import("./index-d6002e97.js")),
      boolean: as,
      date: Kt,
      html: ln(() => import("./index-2491b580.js")),
      image: Cn,
      video: ls,
      file: cs,
      pdf: Vr,
      location: us,
      "text-many": Sn,
      i18n: is
    });
    /**
     * Pickers
     */
    ne(this, "pickers", {
      object: Xt,
      enum: Vt,
      projectUsers: mu,
      list: pu
    });
    /**
     * Attribute editors: the built-in EDIT surface per type, seeded into the
     * kernel as each module's `editor`. They shrink under a preset policy and
     * evaporate one by one as type modules take over their binding.
     */
    ne(this, "editors", {
      fk: yu,
      enum: gu,
      // the two heavy editors stay behind import(): htmlText carries
      // EditorJS (+plugins, fslightbox), phone carries libphonenumber.
      // Everything else is a few hundred bytes — a chunk per editor would
      // trade one network round-trip for nothing (see docs: 38 chunks
      // deferred a combined ~7 KB gzip).
      htmlText: nt(() => import("./index-51ba5cc0.js")),
      varchar: vu,
      text: Qs,
      markdown: Qs,
      tag: Du,
      texti18n: Au,
      email: bu,
      phone: nt(() => import("./index-66b7cba5.js")),
      url: wu,
      youtube: Ou,
      int: Zs,
      tinyint: Zs,
      double: In,
      float: In,
      percentage: In,
      currency: Tu,
      duration: Iu,
      formula: ju,
      hex: zu,
      boolean: _u,
      json: Eu,
      code: Su,
      date: Mu,
      datetime: Cu,
      image: xu,
      video: $u,
      file: ku,
      location: Lu
    });
    /**
     * Many attribute editors
     */
    ne(this, "manyEditors", {
      mtm: Hu,
      enum: Pu,
      image: Nu,
      varchar: Gs,
      text: Gs,
      tag: qu
    });
    /**
     * Extensions methods
     */
    ne(this, "getHTML", sa);
    ne(this, "getHtmlElement", fs);
    // Typed as any until the pinned core exposes the destroy-handle signature
    ne(this, "mountHtmlElement", Xu);
    ne(this, "mountAddForm", ra);
    ne(this, "mountAddFormModal", Gu);
    ne(this, "mountList", sd);
    ne(this, "mountGrid", rd);
    ne(this, "mountFiltersForm", ms);
    ne(this, "mountFiltersModal", fa);
    ne(this, "mountSearchBox", ad);
    ne(this, "mountObjectView", ca);
    ne(this, "mountObjectViewModal", ua);
    ne(this, "mountObjectHistory", kn);
    ne(this, "mountObjectHistoryModal", hs);
    ne(this, "mountEditorInModal", id);
    var o;
    Ae = e;
    const s = typeof t == "string" ? { preset: t } : Array.isArray(t) ? { use: t } : t ?? {};
    ie = s, lt = this;
    const r = s.preset ?? "expanded";
    if (r === "readonly")
      this.editors = {}, this.manyEditors = {};
    else if (r === "basic") {
      for (const l of ld)
        delete this.editors[l];
      for (const l of cd)
        delete this.manyEditors[l];
    }
    for (const l of Rc)
      this.registry.register(this.withCanonicalView(cr(l.type), l));
    for (const [l, c] of Object.entries(this.editors))
      this.registry.mergeBuiltin(l, { editor: Ge(c) });
    const a = { mtm: "mtm", enum: "enum[]", image: "image[]", varchar: "varchar[]", text: "text[]", tag: "tag[]" };
    for (const [l, c] of Object.entries(this.manyEditors))
      this.registry.mergeBuiltin(a[l] ?? l, { editor: Ge(c) });
    for (const [l, c] of Object.entries(Fu))
      this.registry.mergeBuiltin(l, { view: Rt(c) });
    r === "extended" && Zr(this), this.settings = {
      language: s.defaultLanguage ?? "en",
      ...s.formatDates !== void 0 ? { formatDates: s.formatDates } : {}
    }, s.defaultDialCode && this.setConfig("phone", { defaultDialCode: s.defaultDialCode }), s.googleMapsApiKey && this.setConfig("location", { apiKey: s.googleMapsApiKey }), this.services = {
      upload: (l) => Ae.uploader(l),
      uploadVideo: (l) => Ae.uploaderVideo(l),
      uploadFile: (l) => Ae.uploaderFile(l)
    }, (o = s.use) != null && o.length && this.use(s.use);
    const i = s.transactionInspector;
    i && typeof i == "object" && (this.transactionInspectorConfig = i), this.transactionInspector = i !== !1;
  }
  /** App-global preferences read by many types (language, locale, theme). */
  get settings() {
    return this.uiConfig.settings;
  }
  set settings(e) {
    this.uiConfig.settings = e ?? {};
  }
  /** Capabilities controls can call (upload, geocode, …). */
  get services() {
    return this.uiConfig.services;
  }
  set services(e) {
    this.uiConfig.services = e ?? {};
  }
  /** Project-wide UI options for a datatype — cascades into every mount. */
  setConfig(e, t) {
    this.uiConfig.setConfig(e, t);
  }
  /** UI options for one attribute of one model. */
  setConfigFor(e, t, s) {
    this.uiConfig.setConfigFor(e, t, s);
  }
  /** Overlay DatatypeUI modules (a preset pack): each claimed type gets the module's surfaces. */
  use(e) {
    for (const t of e) {
      const { type: s, ...r } = t;
      for (const a of [s].flat())
        this.defineUI(a, r);
    }
  }
  /**
   * THE authoring surface: merge a (partial) DatatypeUI onto a type.
   * Override one surface with { control } / { view } — the rest stays.
   */
  defineUI(e, t) {
    this.registry.defineUI(e, this.withCanonicalView(e, t));
  }
  /** defineUI scoped to one attribute of one model. */
  defineUIFor(e, t, s) {
    this.registry.defineUIFor(e, t, this.withCanonicalView(t, s));
  }
  /**
   * Register a named VARIANT of a base type (selected via schema `ui:` hint
   * or per-mount { use }). Inherits the base; overrides what it declares.
   */
  definePreset(e, t) {
    this.registry.definePreset(e, this.withCanonicalView(e, t));
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
  bindUIType(e, t, s) {
    this.registry.bindType(e, t, s);
  }
  /** Views enter the registry canonicalized — key names the standard class. */
  withCanonicalView(e, t) {
    return t.view ? { ...t, view: this.canonicalView(e, t.view, t) } : t;
  }
  /**
   * Register a remote UI by name: an ES module whose default export is a
   * DatatypeUI (or a bare control), fetched lazily on the first edit and
   * cached. On failure the text/json floor mounts — never a broken field.
   * You are executing that module's code: point moduleUrl at an asset you
   * host and version yourself, not at a third party.
   */
  setRemoteUI(e, t) {
    const { shell: s, preload: r } = this.buildRemote(e, t, (a, i, o) => {
      o ? (typeof i.view == "function" && (a.view = Rt(i.view, i.hydrator)), this.registry.definePreset(e, a), this.registry.defineUI(e, a)) : (this.definePreset(e, a), a.control && this.registry.defineUI(e, { control: a.control }));
    });
    return this.registry.definePreset(e, s), this.registry.defineUI(e, s), { preload: r };
  }
  /** Remote UI for one attribute of one model. */
  setRemoteUIFor(e, t, s) {
    const r = `${e}.${t}`, { shell: a, preload: i } = this.buildRemote(r, s, (o, l, c) => {
      c ? (typeof l.view == "function" && (o.view = Rt(l.view, l.hydrator)), this.registry.defineUIFor(e, t, o)) : this.defineUIFor(e, t, o);
    });
    return this.registry.defineUIFor(e, t, a), { preload: i };
  }
  /**
   * The remote plumbing: memoized fetch, module-shape classification (an
   * OBJECT default export is a DatatypeUI; a FUNCTION default export is a
   * legacy attribute-bound editor with optional view/hydrator exports),
   * and the lazy shell that mounts before the module has loaded.
   */
  buildRemote(e, t, s) {
    let r = null;
    const a = () => r ?? (r = Ma(t).then((o) => {
      const l = typeof o.default == "function", c = l ? { editor: Ge(o.default) } : { ...o.default };
      return s(c, o, l), c;
    }).catch((o) => {
      throw r = null, this.warn(`remote UI '${e}' (${t}) failed: ${o.message} — next layer down mounts`), o;
    }));
    return { shell: {
      control: async (o) => {
        const l = await a();
        if (!l.control)
          throw new Error(`remote UI '${e}' has no control`);
        return l.control(o);
      },
      editor: async (o) => {
        const l = await a(), c = l.editor ?? l.control;
        if (!c)
          throw new Error(`remote UI '${e}' has no editor`);
        return c(o);
      }
    }, preload: () => a().then(() => {
    }) };
  }
  warn(e) {
    this.debug && console.warn(`[BlitzUIManager] ${e}`);
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
  set transactionInspector(e) {
    this.txiWanted = !!e, this.syncTransactionInspector();
  }
  /**
   * Reconcile the mounted tab with `txiWanted`. Mounting lazy-imports the
   * inspector (the codebase's chunking idiom) and never runs without a DOM,
   * so SSR and a never-enabled session touch nothing. The import is guarded
   * against overlap and against the state flipping back off mid-flight.
   */
  syncTransactionInspector() {
    typeof document > "u" || (this.txiWanted && !this.txiHandle && !this.txiLoading ? (this.txiLoading = !0, Promise.resolve().then(() => md).then(({ default: e }) => {
      this.txiLoading = !1, this.txiWanted && !this.txiHandle && (this.txiHandle = e(this.transactionInspectorConfig));
    }).catch((e) => {
      this.txiLoading = !1, this.warn(`transaction inspector failed to load: ${e.message}`);
    })) : !this.txiWanted && this.txiHandle && (this.txiHandle.destroy(), this.txiHandle = null));
  }
  /**
   * Warm editor chunks during idle time so the first edit feels instant.
   * No argument preloads every registered editor; pass types to narrow.
   */
  preloadEditors(e) {
    const t = e ?? [...Object.keys(this.editors), ...Object.keys(this.manyEditors)], s = () => {
      var r, a, i, o;
      for (const l of t)
        (a = (r = this.editors[l]) == null ? void 0 : r.preload) == null || a.call(r), (o = (i = this.manyEditors[l]) == null ? void 0 : i.preload) == null || o.call(i);
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
  canonicalView(e, t, s) {
    return (r, a) => {
      var f, m, h, p, y, v, g;
      if ((s.empty ?? ba)(r.value))
        return "";
      const o = ((p = (h = (m = (f = r._object) == null ? void 0 : f.model) == null ? void 0 : m.getAttributesDetails) == null ? void 0 : h.call(m)) == null ? void 0 : p[r._name]) ?? {}, l = bn(r._name, o.type ?? r._type), c = this.uiConfig.resolve(l, (g = (v = (y = r._object) == null ? void 0 : y.model) == null ? void 0 : v.getName) == null ? void 0 : g.call(v), r._name, s.defaultConfig, void 0), d = t({ value: r.value, attributeDetails: o, config: c, settings: this.uiConfig.settings });
      if (!d)
        return "";
      const u = (w) => ud(w, `${r._name} bd-${e}`, a == null ? void 0 : a.labelHtml);
      return typeof d == "string" ? u(d) : { html: u(d.html), hydrate: (w) => {
        var S;
        return ((S = d.hydrate) == null ? void 0 : S.call(d, w)) ?? void 0;
      } };
    };
  }
  /**
   * Resolve the read view for an attribute through the kernel registry —
   * one resolution rule for all three surfaces. Total: the text/json
   * fallback is the floor for types with no view anywhere.
   */
  resolveView(e) {
    const t = this.kernel.resolveForPort(Pt(e));
    return t.view ? { render: t.view, layer: t.sources.view.layer } : { render: Rt(Wu), layer: 0 };
  }
  /**
   * The hydrate pass re-renders the view fresh — a hydrating view returns
   * { html, hydrate }, everything else no-ops. No side registrations.
   */
  resolveHydrator(e) {
    const { render: t } = this.resolveView(e);
    return (s, r) => {
      var i;
      const a = t(r ?? e, {});
      return typeof a == "object" && a ? ((i = a.hydrate) == null ? void 0 : i.call(a, s)) ?? void 0 : void 0;
    };
  }
  /** Hydrate serialized shells under root (see docs/extending.md). */
  hydrate(e) {
    return Yu(e, (t) => this.resolveHydrator(t), (t) => this.warn(t));
  }
  wrapMarkup(e) {
    const t = document.createElement("div");
    return t.innerHTML = e, t.children.length === 1 ? t.children[0] : t;
  }
  /**
   * Read-only markup, string form: the resolved view's output, stamped
   * with a hydration reference when the view hydrates. '' = skip.
   */
  resolveReadonlyString(e, t) {
    const s = this.resolveView(e).render(e, { ...t, serialized: !0 });
    if (!s)
      return "";
    if (typeof s == "string")
      return s;
    const r = this.wrapMarkup(s.html);
    return Vu(r, e) || this.warn(`${e._name}: view hydrates but attribute has no resolvable object — shell stays static`), r.outerHTML;
  }
  /**
   * Read-only markup, element form: the resolved view's output, hydrated
   * immediately (element contexts are live). null = skip.
   */
  resolveReadonlyElement(e, t) {
    const s = this.resolveView(e).render(e, t);
    if (!s)
      return null;
    const r = this.wrapMarkup(typeof s == "string" ? s : s.html);
    return typeof s == "object" && s.hydrate && ea(r, (a) => s.hydrate(a) ?? void 0, e), r;
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
  withLiveRemount(e, t, s, r) {
    const a = e._object;
    if (typeof (a == null ? void 0 : a.addEventListener) != "function")
      return r;
    let i = r, o = !1, l = !1, c = !1, d = !1;
    const u = async () => {
      if (o) {
        l = !0;
        return;
      }
      o = !0;
      try {
        do
          l = !1, typeof (i == null ? void 0 : i.destroy) == "function" && i.destroy(), t.innerHTML = "", i = null, i = await s();
        while (l && !d);
      } catch (h) {
        console.error(`"${e._name}" live remount failed:`, (h == null ? void 0 : h.stack) ?? (h == null ? void 0 : h.message) ?? h);
      } finally {
        o = !1, d && typeof (i == null ? void 0 : i.destroy) == "function" && i.destroy();
      }
    }, f = (h) => {
      if (!(!h || !Object.hasOwn(h, e._name))) {
        if (t.contains(document.activeElement)) {
          c = !0;
          return;
        }
        u();
      }
    }, m = (h) => {
      c && (h.relatedTarget instanceof Node && t.contains(h.relatedTarget) || (c = !1, u()));
    };
    return a.addEventListener("remoteChange", f), t.addEventListener("focusout", m), {
      ...r,
      // capabilities must follow the remounts — the initial handle's
      // would reach a widget a remount already removed
      ...r.getDraft ? { getDraft: () => {
        var h;
        return (h = i == null ? void 0 : i.getDraft) == null ? void 0 : h.call(i);
      } } : {},
      ...r.isPending ? { isPending: () => {
        var h;
        return (h = i == null ? void 0 : i.isPending) == null ? void 0 : h.call(i);
      } } : {},
      ...r.cancelPending ? { cancelPending: () => {
        var h;
        return (h = i == null ? void 0 : i.cancelPending) == null ? void 0 : h.call(i);
      } } : {},
      destroy: () => {
        d = !0, a.removeEventListener("remoteChange", f), t.removeEventListener("focusout", m), !o && typeof (i == null ? void 0 : i.destroy) == "function" && i.destroy();
      }
    };
  }
  /**
   * Wire an onDone callback to the editor's bd-editor-done event and fold the
   * listener teardown into the editor's own destroy. If onDone is absent the
   * handle is returned untouched.
   */
  withDoneListener(e, t, s) {
    if (!t)
      return s;
    const r = () => t();
    e.addEventListener("bd-editor-done", r);
    const a = s == null ? void 0 : s.destroy;
    return {
      ...s,
      destroy: () => {
        e.removeEventListener("bd-editor-done", r), typeof a == "function" && a.call(s);
      }
    };
  }
  /**
   * Mount input in the DOM
   * Task: https://alpha.blitzdata.com/blitzpm/task/2661yc--bhg6dv?proj=1s4dec-3ibnqe
   */
  mountInput(e, t, s) {
    if (!e)
      throw new Error("Missing type!");
    if (!t)
      throw new Error("Missing container!");
    const r = this.inputs[e];
    if (!r)
      throw new Error("Input for this type not supported!");
    return r(t, s);
  }
  /**
   * Mount picker in the DOM
   * Task: https://alpha.blitzdata.com/blitzpm/task/2661yc--bhg6dv?proj=1s4dec-3ibnqe
   */
  async mountPicker(e, t, s) {
    if (!e)
      throw new Error("Missing type!");
    if (!t)
      throw new Error("Missing container!");
    const r = this.pickers[e];
    if (!r)
      throw new Error("Picker for this type not supported!");
    return await r(t, s);
  }
  /**
   * Mount editor in the DOM — kernel-routed: mount(livePort(attr), 'write').
   * Task: https://alpha.blitzdata.com/blitzpm/task/2gemtg-65t0b?proj=1s4dec-3ibnqe
   */
  async mountEditor(e, t, s) {
    var l, c;
    if (!e)
      throw new Error("Missing attribute(s)!");
    const r = typeof t == "string" ? document.getElementById(t) : t;
    if (!(r instanceof HTMLElement))
      throw new Error("Container parameter not valid!");
    let a = [], i = !1;
    e instanceof Array ? a.push(...e) : Object.hasOwn(e, "_attributes") ? (i = !0, a.push(
      ...Object.values(e._attributes).filter((d) => !d._name.startsWith("_") && !d._name.startsWith("@"))
    )) : a.push(e), i && (a = a.filter((d) => d.value !== void 0));
    const o = a.length > 0 ? ((c = (l = a[0]._object) == null ? void 0 : l.model) == null ? void 0 : c.getAttributesDetails()) ?? {} : {};
    if (a.length === 0)
      throw new Error("No attribute found!");
    if (a.length === 1) {
      const d = a[0], u = this.kernel.resolveConfig(Pt(d, { ...s, ...s == null ? void 0 : s.config }), s == null ? void 0 : s.use), f = sr(u, (s == null ? void 0 : s.context) ?? "form", d.value);
      if (f === "modal")
        return this.mountEditorInModal(d, {
          use: s == null ? void 0 : s.use,
          config: s == null ? void 0 : s.config,
          live: s == null ? void 0 : s.live,
          onClose: s == null ? void 0 : s.onDone
        });
      const m = async () => {
        const p = await this.kernel.mount(
          Pt(d, { ...s, ...s == null ? void 0 : s.config }),
          r,
          "write",
          s == null ? void 0 : s.use
        ), { getDraft: y, isPending: v, cancelPending: g } = p;
        return { destroy: p, ...y && { getDraft: y }, ...v && { isPending: v }, ...g && { cancelPending: g } };
      }, h = async () => {
        let p = await m();
        return s != null && s.live && (p = this.withLiveRemount(d, r, m, p)), this.withDoneListener(r, s == null ? void 0 : s.onDone, p);
      };
      return f === "expandable" ? rr.call(this, d, r, h, {
        use: s == null ? void 0 : s.use,
        config: s == null ? void 0 : s.config,
        onDone: s == null ? void 0 : s.onDone,
        expandIcon: u.expandIcon,
        expandTitle: u.expandTitle
      }) : h();
    } else {
      r.innerHTML = "";
      const d = ["bd-object-editor"];
      !Array.isArray(e) && Object.hasOwn(e, "_attributes") && d.push(e._blitzID.value), r.classList.add(...d);
      const u = (s == null ? void 0 : s.labelLanguage) ?? this.settings.language ?? "en", f = (h) => {
        var p, y;
        return Ot((p = o[h]) == null ? void 0 : p["label-int"], (y = o[h]) == null ? void 0 : y.label, u, h);
      };
      let m = [];
      for (const h of a) {
        if (!o[h._name])
          continue;
        const p = document.createElement("div");
        r.append(p);
        const y = s != null && s.withLabels || ["boolean", "datetime", "date", "image", "video", "file"].includes(h._type) ? f(h._name) : void 0, v = y ? `${y}...` : f(h._name), g = {
          className: h._name,
          label: y,
          placeholder: v,
          ...s != null && s.defaultDialCode ? { defaultDialCode: s.defaultDialCode } : {},
          ...s != null && s.googleMapsApiKey ? { apiKey: s.googleMapsApiKey, initialExpand: s == null ? void 0 : s.locationFieldsExpand } : {},
          ...s != null && s.listEmptyMsg ? { emptyMsg: s.listEmptyMsg } : {},
          ...s == null ? void 0 : s.config
        }, w = async () => {
          const b = await this.kernel.mount(Pt(h, g), p, "write"), { getDraft: j, isPending: E, cancelPending: L } = b;
          return { destroy: b, ...j && { getDraft: j }, ...E && { isPending: E }, ...L && { cancelPending: L } };
        }, S = async () => {
          let b = await w();
          return s != null && s.live && (b = this.withLiveRemount(h, p, w, b)), b;
        }, $ = this.kernel.resolveConfig(Pt(h, g)), P = sr($, "form", h.value);
        let M;
        try {
          M = P === "inline" ? await S() : await rr.call(this, h, p, S, {
            config: s == null ? void 0 : s.config,
            expandIcon: $.expandIcon,
            expandTitle: $.expandTitle
          });
        } catch (b) {
          console.error(`"${h._name}" Editor Error:`, b.stack ?? b.message);
        }
        M && typeof M.destroy == "function" && m.push(M.destroy);
      }
      return {
        destroy: () => {
          for (const h of m)
            h();
          m = [], r.innerHTML = "", r.classList.remove(...d);
        }
      };
    }
  }
}
/**
 * Version of the library
 */
ne(ps, "VERSION", "2.14.6");
function ud(n, e, t) {
  const s = document.createElement("div");
  s.innerHTML = n.trim();
  const r = s.childNodes.length === 1 ? s.firstElementChild : null;
  if (r) {
    const a = r.getAttribute("class");
    return r.setAttribute("class", a ? `${e} ${a}` : e), t && r.insertAdjacentHTML("afterbegin", t), r.outerHTML;
  }
  return `<div class="${e}">${t ?? ""}${n}</div>`;
}
class dd extends ps {
  constructor(e, t) {
    super(e, t), Zr(this);
  }
}
function ar(n) {
  return n.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function ys(n, e = "") {
  const t = document.activeElement, s = document.createElement("div");
  s.className = "bd-lightbox", s.setAttribute("data-bd-portal", ""), s.setAttribute("role", "dialog"), s.setAttribute("aria-modal", "true"), e && s.setAttribute("aria-label", e), s.innerHTML = `
        <div class="bd-lightbox__inner">
            <img src="${ar(n)}" alt="${ar(e)}">
        </div>
        <button type="button" class="bd-lightbox__close" aria-label="Close"><span>✕</span></button>
    `;
  const r = () => {
    s.remove(), document.removeEventListener("keydown", a), t && typeof t.focus == "function" && t.focus();
  }, a = (o) => {
    o.key === "Escape" && r();
  };
  s.addEventListener("click", (o) => {
    const l = o.target;
    (l === s || l != null && l.closest(".bd-lightbox__close")) && r();
  }), document.addEventListener("keydown", a), document.body.appendChild(s);
  const i = s.querySelector(".bd-lightbox__close");
  return i == null || i.focus(), { close: r };
}
function ha(n = document, e = "[data-lightbox]", t = {}) {
  const s = t.resolveSrc ?? ((i) => {
    const o = i instanceof HTMLElement ? i.dataset.lightboxSrc : null;
    if (o)
      return o;
    const l = i.querySelector("img") ?? (i.tagName === "IMG" ? i : null);
    return l && (l.currentSrc || l.src) || null;
  }), r = t.resolveAlt ?? ((i) => {
    const o = i.querySelector("img") ?? (i.tagName === "IMG" ? i : null);
    return (o == null ? void 0 : o.alt) ?? "";
  }), a = (i) => {
    const o = i.target, l = o == null ? void 0 : o.closest(e);
    if (!l || !n.contains(l))
      return;
    const c = s(l);
    c && (i.preventDefault(), ys(c, r(l)));
  };
  return n.addEventListener("click", a), () => n.removeEventListener("click", a);
}
const fd = {
  open: ys,
  attach: ha
};
function ma(n, e = {}) {
  var be, me, ke;
  const t = typeof n == "string" ? document.querySelector(n) : n;
  if (!t)
    throw new Error("mountTransactionInspector: container not found");
  const s = t, r = e.queue ?? Z.queue, a = e.confirmDrop !== !1, i = e.emptyMessage ?? "No unresolved transactions!", o = typeof ((be = r == null ? void 0 : r.failedHandler) == null ? void 0 : be.drop) == "function", l = typeof ((me = r == null ? void 0 : r.conflictHandler) == null ? void 0 : me.resolve) == "function", c = typeof ((ke = r == null ? void 0 : r.conflictHandler) == null ? void 0 : ke.prompt) == "function";
  s.classList.add("bd-txi");
  let d = {}, u = null, f = null, m = !0, h = null, p = !1, y = !1;
  const v = /* @__PURE__ */ new Map(), g = [k.Conflict, k.Failed, k.Pending, k.Completed], w = (N) => {
    const T = g.indexOf(N);
    return T === -1 ? 99 : T;
  }, S = (N) => N[0].id, $ = (N) => N.find((T) => T.message !== void 0) ?? null, P = (N) => Object.keys(N.transaction.data ?? {})[0] ?? null, M = (N) => {
    if (N === void 0)
      return "—";
    if (typeof N == "object")
      try {
        return JSON.stringify(N);
      } catch {
        return String(N);
      }
    return String(N);
  }, b = (N) => {
    try {
      return new Date(N).toLocaleString();
    } catch {
      return String(N);
    }
  };
  function j(N) {
    const T = /* @__PURE__ */ new Map();
    for (const W of N) {
      const I = T.get(W.status) ?? [];
      I.push(W), T.set(W.status, I);
    }
    return [...T.values()];
  }
  async function E() {
    if (y)
      return;
    m = !0, h = null, R();
    let N = {};
    try {
      N = r != null && r.failedHandler ? await r.failedHandler.getAll() : {};
    } catch (I) {
      h = I.message;
    }
    d = {}, v.clear();
    for (const I of Object.keys(N)) {
      const F = [];
      for (const ae of N[I])
        for (const ve of j(ae))
          ve[0] && (F.push(ve), v.set(S(ve), ve));
      d[I] = F;
    }
    const T = Object.keys(d);
    (!u || !d[u]) && (u = T[0] ?? null);
    const W = u ? d[u] : [];
    (!f || !W.some((I) => S(I) === f)) && (f = W[0] ? S(W[0]) : null), m = !1, R();
  }
  async function L(N, T) {
    var ae, ve, B, re;
    if (p)
      return;
    const W = v.get(N);
    if (!(W != null && W.length) || T === "drop" && a && !confirm(`Drop this transaction from the queue?
The local change stays in place — client and server may diverge.`))
      return;
    p = !0, R();
    const I = r == null ? void 0 : r.failedHandler, F = r == null ? void 0 : r.conflictHandler;
    try {
      if (T === "retry")
        await (I == null ? void 0 : I.retry(W));
      else if (T === "revert")
        await (I == null ? void 0 : I.revert(W));
      else if (T === "drop")
        await ((ae = I == null ? void 0 : I.drop) == null ? void 0 : ae.call(I, W));
      else if (T === "execute") {
        const de = $(W);
        de && await ((ve = F == null ? void 0 : F.resolve) == null ? void 0 : ve.call(F, de, !0));
      } else if (T === "take-server") {
        const de = $(W);
        de && await ((B = F == null ? void 0 : F.resolve) == null ? void 0 : B.call(F, de, !1));
      } else if (T === "resolve-prompt") {
        const de = $(W);
        de && await ((re = F == null ? void 0 : F.prompt) == null ? void 0 : re.call(F, de));
      }
    } catch (de) {
      alert("Action failed: " + de.message);
    }
    p = !1, await E();
  }
  function _() {
    const N = (u ? d[u] : []).slice().sort((T, W) => w(T[0].status) - w(W[0].status) || T[0].createdAt - W[0].createdAt);
    return N.length ? ee`<ul class="bd-txi-rows">${se(N.map((T) => {
      const W = T[0], I = P(W), F = I ? `${W.transaction.blitzID} · ${I}` : W.transaction.blitzID, ae = T.length > 1 ? ee`<span class="bd-txi-chain">×${T.length}</span>` : "";
      return ee`<li>
                <button class="bd-txi-row ${se(S(T) === f ? "is-active" : "")}" data-select="${S(T)}">
                    <span class="bd-txi-dot bd-txi-${W.status}"></span>
                    <span class="bd-txi-row-main">
                        <span class="bd-txi-row-top">
                            <span class="bd-txi-action">${W.transaction.action}</span>
                            <span class="bd-txi-model">${W.transaction.model}</span>${se(ae)}
                        </span>
                        <span class="bd-txi-row-sub">${F}</span>
                    </span>
                </button>
            </li>`;
    }).join(""))}</ul>` : ee`<p class="bd-txi-empty">${i}</p>`;
  }
  const A = 280;
  function H(N) {
    var B;
    const T = P(N);
    if (N.transaction.action !== "edit" || !T)
      return "";
    const W = ((B = N.transaction.data) == null ? void 0 : B[T]) ?? {}, I = M(W.prev), F = M(W.new), ae = I.length + F.length > A, ve = ee`<div class="bd-txi-diff ${se(ae ? "is-large" : "")}">
                <span class="bd-txi-prev">${I}</span>
                <span class="bd-txi-arrow">→</span>
                <span class="bd-txi-new">${F}</span>
            </div>`;
    return ae ? ee`<div class="bd-txi-field"><label>${T}</label>
            <details class="bd-txi-fold">
                <summary><span class="bd-txi-fold-preview">${F.slice(0, 120)}</span><span class="bd-txi-fold-meta">${String(I.length)} → ${String(F.length)} chars</span></summary>
                ${se(ve)}
            </details></div>` : ee`<div class="bd-txi-field"><label>${T}</label>${se(ve)}</div>`;
  }
  function x(N) {
    var T;
    return (T = N.dataHistory) != null && T.length ? ee`<div class="bd-txi-field"><label>History</label><ul class="bd-txi-history">${se(N.dataHistory.map(
      (W) => ee`<li><span class="bd-txi-htype">${W.type}</span><span class="bd-txi-htime">${b(W.timestamp)}</span><code>${M(W.data)}</code></li>`
    ).join(""))}</ul></div>` : "";
  }
  function C(N) {
    const T = N[0].status, W = [];
    if (T === k.Conflict) {
      const I = $(N) ? "" : ' disabled title="Chained conflict — cannot be resolved directly"';
      l ? (W.push(`<button class="bd-txi-btn is-primary" data-act="execute"${I}>Execute</button>`), W.push(`<button class="bd-txi-btn" data-act="take-server"${I}>Revert to server</button>`)) : c && W.push(`<button class="bd-txi-btn is-primary" data-act="resolve-prompt"${I}>Resolve…</button>`);
    } else
      T === k.Failed && (W.push('<button class="bd-txi-btn is-primary" data-act="retry">Retry</button>'), W.push('<button class="bd-txi-btn" data-act="revert">Revert</button>'));
    return ee`<div class="bd-txi-actions">${se(W.join(""))}</div>`;
  }
  function z() {
    if (!f)
      return '<div class="bd-txi-detail-empty">Select a transaction</div>';
    const N = v.get(f);
    if (!(N != null && N.length))
      return '<div class="bd-txi-detail-empty">Select a transaction</div>';
    const T = N[0], W = T.status === k.Pending, I = W ? '<div class="bd-txi-pending-note">In-flight — the worker may be delivering this. Actions are disabled to avoid racing it.</div>' : C(N);
    return ee`<div class="bd-txi-card">
            ${se(o && !W ? '<button class="bd-txi-drop" data-act="drop" title="Drop from queue">×</button>' : "")}
            <div class="bd-txi-card-head">
                <span class="bd-txi-status bd-txi-${T.status}">${T.status}</span>
                <span class="bd-txi-action">${T.transaction.action}</span>
                <span class="bd-txi-model">${T.transaction.model}</span>
            </div>
            <div class="bd-txi-field"><label>Object</label><code>${T.transaction.blitzID}</code></div>
            ${se(H(T))}
            ${se(J(N))}
            <div class="bd-txi-meta">
                <span><label>Server</label>${T.url}</span>
                <span><label>Queued</label>${b(T.createdAt)}</span>
                <span><label>Attempts</label>${T.attempts} (priority ${T.priority})</span>
                <span><label>Hash</label><code>${T.transaction.hash}</code></span>
            </div>
            ${se(x(T))}
            ${se(I)}
            ${se(U(N))}
        </div>`;
  }
  function J(N) {
    const T = N.find((I) => I.message !== void 0);
    if (T)
      return ee`<div class="bd-txi-field"><label>Server response</label><div class="bd-txi-message">${T.message}</div></div>`;
    const W = N[0].status;
    return W !== k.Failed && W !== k.Conflict ? "" : ee`<div class="bd-txi-field"><label>Server response</label><div class="bd-txi-message is-empty">No server response recorded for this transaction.</div></div>`;
  }
  function U(N) {
    const T = N.length > 1, W = T ? N.map(
      (I, F) => ee`<details class="bd-txi-raw-job"><summary>Job ${String(F + 1)} · ${I.status} · ${b(I.createdAt)}</summary><pre>${JSON.stringify(I, null, 2)}</pre></details>`
    ).join("") : ee`<pre>${JSON.stringify(N[0], null, 2)}</pre>`;
    return ee`<details class="bd-txi-raw">
            <summary>Raw JSON${se(T ? ee` <span class="bd-txi-chain-note">(${String(N.length)} chained jobs on this object)</span>` : "")}</summary>
            <button class="bd-txi-copy" data-copy>Copy</button>
            ${se(W)}
        </details>`;
  }
  function oe() {
    const N = Object.keys(d);
    return N.length < 2 ? "" : ee`<select class="bd-txi-server">${se(N.map(
      (T) => ee`<option value="${T}" ${se(T === u ? "selected" : "")}>${T}</option>`
    ).join(""))}</select>`;
  }
  function R() {
    if (y)
      return;
    s.classList.toggle("is-busy", p);
    const N = m ? '<div class="bd-txi-spinner"></div>' : h ? ee`<p class="bd-txi-error">${h}</p>` : _();
    s.innerHTML = ee`
            <div class="bd-txi-banner">
                <h2>Transactions</h2>
                <div class="bd-txi-tools">${se(oe())}<button class="bd-txi-refresh" title="Refresh">⟳</button></div>
            </div>
            <div class="bd-txi-body">
                <div class="bd-txi-list">${se(N)}</div>
                <div class="bd-txi-detail">${se(m || h ? "" : z())}</div>
            </div>`;
  }
  function K(N) {
    var F;
    const T = N.target;
    if (T.closest(".bd-txi-refresh")) {
      E();
      return;
    }
    if (T.closest("[data-copy]")) {
      N.preventDefault(), f && ((F = navigator.clipboard) == null || F.writeText(JSON.stringify(v.get(f), null, 2)));
      return;
    }
    const W = T.closest("[data-act]");
    if (W && !W.hasAttribute("disabled")) {
      f && L(f, W.dataset.act ?? "");
      return;
    }
    const I = T.closest("[data-select]");
    I && (f = I.dataset.select ?? null, R());
  }
  function X(N) {
    const T = N.target.closest(".bd-txi-server");
    T && (u = T.value, f = null, R());
  }
  return s.addEventListener("click", K), s.addEventListener("change", X), E(), {
    refresh: () => {
      E();
    },
    destroy: () => {
      y = !0, s.removeEventListener("click", K), s.removeEventListener("change", X), s.classList.remove("bd-txi", "is-busy"), s.innerHTML = "";
    }
  };
}
const hd = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>';
function pa(n = {}) {
  const { label: e, right: t, ...s } = n, r = document.createElement("div");
  r.className = "bd-txi-tab", t !== void 0 && (r.style.right = `${t}px`), r.innerHTML = hd, r.append(e ?? "Transactions");
  const a = document.createElement("span");
  a.className = "bd-txi-tab-badge", a.style.display = "none", r.append(a), document.body.append(r);
  async function i() {
    const p = s.queue ?? Z.queue;
    if (typeof (p == null ? void 0 : p.getJobs) == "function")
      try {
        const v = (await p.getJobs() ?? []).filter((g) => g.status === k.Conflict || g.status === k.Failed).length;
        a.textContent = String(v), a.style.display = v > 0 ? "" : "none", r.classList.toggle("has-unresolved", v > 0);
      } catch {
      }
  }
  const o = () => {
    i();
  }, l = ["queue:success", "queue:failure", "queue:conflict", "queue:conflict-resolved"];
  for (const p of l)
    Z.addEventListener(p, o);
  const c = () => {
    document.hidden || i();
  };
  document.addEventListener("visibilitychange", c), i();
  let d = null, u = null, f = null;
  function m() {
    if (d)
      return;
    d = document.createElement("div"), d.className = "bd-txi-backdrop", d.setAttribute("data-bd-portal", "");
    const p = document.createElement("div");
    p.className = "bd-txi-panel", p.onclick = (g) => g.stopPropagation();
    const y = document.createElement("button");
    y.className = "bd-txi-panel-close", y.innerHTML = "&times;";
    const v = document.createElement("div");
    v.className = "bd-txi-panel-body", p.append(y, v), d.append(p), document.body.append(d), u = ma(v, s), d.onclick = () => h(), y.onclick = () => h(), f = Ht(d, {
      titleElm: v.querySelector(".bd-txi-banner h2"),
      closeElm: y,
      onEscape: () => h()
    }), r.style.display = "none", requestAnimationFrame(() => d == null ? void 0 : d.classList.add("is-open"));
  }
  function h() {
    if (!d)
      return;
    f == null || f(), f = null, u == null || u.destroy(), u = null;
    const p = d;
    d = null, p.classList.remove("is-open"), setTimeout(() => p.remove(), 200), r.style.display = "", i();
  }
  return r.addEventListener("click", m), {
    open: m,
    close: h,
    destroy: () => {
      h(), r.remove();
      for (const p of l)
        Z.removeEventListener(p, o);
      document.removeEventListener("visibilitychange", c);
    },
    refreshBadge: i
  };
}
const md = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pa
}, Symbol.toStringTag, { value: "Module" })), ir = (n, e) => ({
  x: Math.min(n.x, e.x),
  y: Math.min(n.y, e.y),
  width: Math.abs(n.x - e.x),
  height: Math.abs(n.y - e.y)
}), nn = (n) => Math.min(1, Math.max(0, n));
function pd(n, e) {
  if (!(e.width > 0) || !(e.height > 0))
    return { x: 0, y: 0, width: 0, height: 0 };
  const t = nn(n.x / e.width), s = nn(n.y / e.height);
  return {
    x: t,
    y: s,
    width: Math.min(nn(n.width / e.width), 1 - t),
    height: Math.min(nn(n.height / e.height), 1 - s)
  };
}
const yd = (n, e, t) => ({
  url: n,
  page: e,
  bbox: { x: t.x, y: t.y, width: t.width, height: t.height }
});
async function gd(n, e) {
  const t = ((e == null ? void 0 : e.extractorBaseUrl) ?? "").replace(/\/+$/, "");
  let s;
  try {
    s = await fetch(`${t}/pdfextractor/region-text`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...e != null && e.authorizationHeader ? { Authorization: e.authorizationHeader } : {}
      },
      body: JSON.stringify(n),
      signal: e == null ? void 0 : e.signal
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
const vd = /* @__PURE__ */ new Set(["varchar", "text", "markdown"]);
function bd(n) {
  return Object.entries(n ?? {}).filter(([e, t]) => !e.startsWith("_") && !e.startsWith("@") && typeof (t == null ? void 0 : t.type) == "string" && vd.has(t.type)).map(([e, t]) => ({
    attribute: e,
    ...typeof t.label == "string" ? { label: t.label } : {}
  }));
}
const or = 1.25, wd = 0.25, _d = 8, lr = 4;
async function Ed(n, e) {
  var T, W;
  if (!(n instanceof HTMLElement))
    throw new Error("mountPdfRegionEditor: host element required");
  if (!(e != null && e.url))
    throw new Error("mountPdfRegionEditor: options.url required");
  const t = e.object, s = e.targetFields ?? bd(((W = (T = t == null ? void 0 : t.model) == null ? void 0 : T.getAttributesDetails) == null ? void 0 : W.call(T)) ?? {}), r = qe(n, "bd-pdfregion");
  n.innerHTML = ee`
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
            <div class="bd-pdfregion-save" ${se(s.length ? "" : "hidden")}>
                <select class="bd-pdfregion-target">${se(s.map(
    (I) => ee`<option value="${I.attribute}">${I.label ?? I.attribute}</option>`
  ).join(""))}</select>
                <button type="button" class="bd-pdfregion-savebtn"${se(t ? "" : ' disabled title="No object to save into"')}>Save</button>
            </div>
        </div>`;
  const a = (I) => n.querySelector(I), i = a(".bd-pdfregion-stage"), o = a(".bd-pdfregion-canvaswrap"), l = a(".bd-pdfregion-canvas"), c = a(".bd-pdfregion-overlay"), d = a(".bd-pdfregion-selection"), u = a(".bd-pdfregion-page"), f = a(".bd-pdfregion-zoom"), m = a(".bd-pdfregion-status"), h = a(".bd-pdfregion-badge"), p = a(".bd-pdfregion-text"), y = a(".bd-pdfregion-target"), v = a(".bd-pdfregion-savebtn");
  let g = !1, w = 1, S = 0, $ = 1, P = 0, M = 0, b = 0, j = null, E = null, L = null, _ = null, A = null;
  const H = (I, F = "info") => {
    m.textContent = I, m.classList.toggle("is-error", F === "error");
  }, x = () => {
    _ = null, d.hidden = !0;
  }, C = (I, F) => {
    const ae = ir(I, F);
    d.hidden = !1, d.style.left = `${ae.x}px`, d.style.top = `${ae.y}px`, d.style.width = `${ae.width}px`, d.style.height = `${ae.height}px`;
  };
  async function z() {
    if (g || !E)
      return;
    const I = await E.getPage(w);
    if (g)
      return;
    P = I.getViewport({ scale: 1 }).width;
    const F = I.getViewport({ scale: $ });
    M = F.width, b = F.height;
    const ae = typeof window < "u" && window.devicePixelRatio || 1;
    l.width = Math.floor(F.width * ae), l.height = Math.floor(F.height * ae), l.style.width = `${Math.floor(F.width)}px`, l.style.height = `${Math.floor(F.height)}px`, o.style.width = l.style.width, o.style.height = l.style.height, u.textContent = `Page ${w} of ${S}`, f.textContent = `${Math.round($ * 100)}%`, x();
    const ve = l.getContext("2d");
    if (ve) {
      L == null || L.cancel(), L = I.render({
        canvasContext: ve,
        viewport: F,
        ...ae !== 1 ? { transform: [ae, 0, 0, ae, 0, 0] } : {}
      });
      try {
        await L.promise;
      } catch (B) {
        (B == null ? void 0 : B.name) !== "RenderingCancelledException" && H(`Page render failed: ${(B == null ? void 0 : B.message) ?? B}`, "error");
      }
    }
  }
  const J = (I) => {
    const F = Math.min(Math.max(1, I), S || 1);
    F !== w && (w = F, z());
  }, U = (I) => {
    $ = Math.min(Math.max(wd, I), _d), z();
  };
  async function oe(I) {
    var ve;
    A == null || A.abort(), A = new AbortController(), H("Extracting text…"), h.hidden = !0;
    const F = yd(e.url, w, I);
    let ae;
    try {
      ae = await gd(F, {
        extractorBaseUrl: e.extractorBaseUrl,
        authorizationHeader: e.authorizationHeader,
        signal: A.signal
      });
    } catch {
      return;
    }
    if (!g) {
      if (ae.s !== 1) {
        H(ae.error || "Extraction failed", "error");
        return;
      }
      p.value = ae.text ?? "", h.textContent = ae.source, h.dataset.source = ae.source, h.hidden = !1, H(`Extracted from page ${w} — review and save`), (ve = e.onExtract) == null || ve.call(e, { text: p.value, source: ae.source, page: w, bbox: I });
    }
  }
  const R = (I) => {
    const F = c.getBoundingClientRect();
    return { x: I.clientX - F.left, y: I.clientY - F.top };
  }, K = (I) => {
    I.button !== 0 || !M || !b || (I.preventDefault(), _ = R(I), C(_, _));
  }, X = (I) => {
    _ && C(_, R(I));
  }, be = (I) => {
    if (!_)
      return;
    const F = ir(_, R(I));
    if (_ = null, F.width < lr || F.height < lr) {
      x();
      return;
    }
    oe(pd(F, { width: M, height: b }));
  };
  c.addEventListener("mousedown", K), window.addEventListener("mousemove", X), window.addEventListener("mouseup", be);
  const me = (I) => {
    const F = I.target.closest("[data-nav], [data-zoom]");
    F && (F.dataset.nav === "prev" ? J(w - 1) : F.dataset.nav === "next" ? J(w + 1) : F.dataset.zoom === "in" ? U($ * or) : F.dataset.zoom === "out" ? U($ / or) : F.dataset.zoom === "fit" && P && i.clientWidth && U(i.clientWidth / P));
  };
  a(".bd-pdfregion-toolbar").addEventListener("click", me);
  const ke = async () => {
    var ae, ve, B;
    const I = y.value, F = ((ae = t == null ? void 0 : t._attributes) == null ? void 0 : ae[I]) ?? ((ve = t == null ? void 0 : t.getAttribute) == null ? void 0 : ve.call(t, I));
    if (typeof (F == null ? void 0 : F.edit) != "function") {
      H(`Attribute '${I}' is not editable on this object`, "error");
      return;
    }
    v.disabled = !0;
    try {
      await F.edit(p.value), H(`Saved to ${I}`), (B = e.onSaved) == null || B.call(e, I, p.value);
    } catch (re) {
      H(`Save failed: ${(re == null ? void 0 : re.message) ?? re}`, "error");
    } finally {
      v.disabled = !t;
    }
  };
  v.addEventListener("click", ke);
  const N = () => {
    var I;
    g || (g = !0, A == null || A.abort(), L == null || L.cancel(), (I = j == null ? void 0 : j.destroy) == null || I.call(j), c.removeEventListener("mousedown", K), window.removeEventListener("mousemove", X), window.removeEventListener("mouseup", be), n.innerHTML = "", r());
  };
  H("Loading PDF…");
  try {
    const I = await import("./pdf-2e5798fb.js");
    e.workerSrc ? I.GlobalWorkerOptions.workerSrc = e.workerSrc : !I.GlobalWorkerOptions.workerSrc && !globalThis.pdfjsWorker && await import("./pdf.worker.min-cef2c5db.js"), j = I.getDocument({ url: e.url }), E = await j.promise;
  } catch (I) {
    return g || H(`Failed to open PDF: ${(I == null ? void 0 : I.message) ?? I}`, "error"), { destroy: N };
  }
  return g ? { destroy: N } : (S = E.numPages, H(""), await z(), { destroy: N });
}
const Sd = () => import("./BDComments-1acfa38d.js").then((n) => n.f).then((n) => n.default), Md = "2.14.6";
typeof window < "u" && !window.BlitzUIManager && (window.BlitzUIManager = {
  default: ps,
  BlitzUIManagerExtended: dd,
  VERSION: Md,
  loadBDComments: Sd,
  ImageLightbox: fd,
  openImageLightbox: ys,
  attachImageLightbox: ha,
  mountTransactionInspector: ma,
  addInspectorLink: pa,
  mountObjectHistory: kn,
  mountObjectHistoryModal: hs,
  mountPdfRegionEditor: Ed,
  previousValueOf: la,
  branchOf: oa,
  html: ee,
  raw: se,
  esc: pe,
  safeUrl: Je,
  renderMarkdown: Gr,
  announceEditorDone: Xe
}, window.dispatchEvent(new CustomEvent("blitzuimanager:ready")));
export {
  dd as A,
  Ae as B,
  Ee as C,
  ps as D,
  Vt as E,
  fr as F,
  ie as G,
  bt as I,
  pu as L,
  ct as N,
  Du as T,
  Md as V,
  Ou as Y,
  Bc as a,
  k as b,
  qe as c,
  Qn as d,
  Xe as e,
  yn as f,
  Mt as g,
  pe as h,
  ma as i,
  pa as j,
  kn as k,
  hs as l,
  vt as m,
  Ed as n,
  la as o,
  Jc as p,
  oa as q,
  Gr as r,
  fd as s,
  ys as t,
  ha as u,
  Sd as v,
  ee as w,
  se as x,
  Xc as y,
  Je as z
};
