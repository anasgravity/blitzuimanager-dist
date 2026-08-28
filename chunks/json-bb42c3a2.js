import { c as H, b as w } from "./index-a4bc9a4f.js";
const B = ["text", "number", "boolean", "null", "object", "array"], M = (i) => {
  if (i === null)
    return "null";
  if (Array.isArray(i))
    return "array";
  switch (typeof i) {
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return "object";
    default:
      return "text";
  }
}, F = (i, u) => {
  switch (i) {
    case "text":
      return u === null || typeof u == "object" ? "" : String(u);
    case "number": {
      const d = Number(u);
      return Number.isFinite(d) ? d : 0;
    }
    case "boolean":
      return u === !0 || u === "true" || u === 1;
    case "null":
      return null;
    case "object":
      return {};
    case "array":
      return [];
  }
};
async function P(i, u, d) {
  if (!i)
    throw new Error("JSON type missing properties!");
  const p = typeof u == "string" ? document.getElementById(u) : u;
  if (!(p instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let l = i.value === void 0 ? null : JSON.parse(JSON.stringify(i.value ?? null)), k = JSON.stringify(l);
  const $ = H(p, "bd-json-input", d == null ? void 0 : d.className);
  p.innerHTML = `<div class="container">
        ${d != null && d.label ? `<p class="label">${d.label}</p>` : ""}
        <div class="toolbar">
            <button type="button" class="mode-tree">Tree</button>
            <button type="button" class="mode-text">Text</button>
            <button type="button" class="format" style="display: none;">Format</button>
            <span class="error"></span>
        </div>
        <div class="tree"></div>
        <textarea class="text" spellcheck="false" style="display: none;"></textarea>
    </div>`;
  const N = p.querySelector(".container"), v = p.querySelector(".tree"), m = p.querySelector(".text"), E = p.querySelector(".error"), h = p.querySelector(".mode-tree"), C = p.querySelector(".mode-text"), j = p.querySelector(".format"), y = async () => {
    const e = JSON.stringify(l);
    e !== k && (k = e, await i.edit(JSON.parse(e)));
  }, T = (e, t) => {
    const n = M(e);
    if (n === "boolean") {
      const s = document.createElement("select");
      return s.className = "value", s.innerHTML = '<option value="true">true</option><option value="false">false</option>', s.value = String(e), s.onchange = () => {
        t(s.value === "true"), y();
      }, s;
    }
    if (n === "null") {
      const s = document.createElement("span");
      return s.className = "value null", s.textContent = "null", s;
    }
    const a = document.createElement("input");
    return a.className = "value", a.type = n === "number" ? "number" : "text", n === "number" && (a.step = "any"), a.value = String(e), a.onchange = () => {
      const s = n === "number" ? Number.isFinite(Number(a.value)) ? Number(a.value) : 0 : a.value;
      t(s), y();
    }, a;
  }, L = (e, t) => {
    const n = document.createElement("select");
    return n.className = "type", n.innerHTML = B.map((a) => `<option value="${a}">${a}</option>`).join(""), n.value = M(e), n.onchange = () => {
      t(F(n.value, e)), y(), b();
    }, n;
  }, J = (e, t, n, a, s) => {
    const r = document.createElement("div");
    if (r.className = "row", a) {
      const o = document.createElement("input");
      o.className = "key", o.value = e, o.onchange = () => {
        a(o.value), y(), b();
      }, r.append(o);
    } else {
      const o = document.createElement("span");
      o.className = "key index", o.textContent = e, r.append(o);
    }
    t !== null && typeof t == "object" ? r.append(q(t)) : r.append(T(t, n)), r.append(L(t, n));
    const c = document.createElement("button");
    return c.type = "button", c.className = "remove", c.textContent = "×", c.onclick = () => {
      s(), y(), b();
    }, r.append(c), r;
  }, q = (e) => {
    const t = Array.isArray(e), n = document.createElement("details");
    n.open = !0, n.className = "node";
    const a = document.createElement("summary");
    a.textContent = t ? `[ ${e.length} ]` : `{ ${Object.keys(e).length} }`;
    const s = document.createElement("button");
    if (s.type = "button", s.className = "add", s.textContent = "+", s.onclick = (r) => {
      if (r.preventDefault(), t)
        e.push("");
      else {
        const c = e;
        let o = "new", g = 1;
        for (; Object.hasOwn(c, o); )
          o = `new${g++}`;
        c[o] = "";
      }
      y(), b();
    }, a.append(s), n.append(a), t)
      e.forEach((r, c) => {
        n.append(J(
          String(c),
          r,
          (o) => {
            e[c] = o;
          },
          null,
          () => {
            e.splice(c, 1);
          }
        ));
      });
    else {
      const r = e;
      for (const c of Object.keys(r))
        n.append(J(
          c,
          r[c],
          (o) => {
            r[c] = o;
          },
          (o) => {
            if (o === c || o === "")
              return;
            const g = Object.entries(r).map(([f, O]) => [f === c ? o : f, O]);
            for (const f of Object.keys(r))
              delete r[f];
            for (const [f, O] of g)
              r[f] = O;
          },
          () => {
            delete r[c];
          }
        ));
    }
    return n;
  }, b = () => {
    if (v.innerHTML = "", l !== null && typeof l == "object")
      v.append(q(l));
    else {
      const e = document.createElement("div");
      e.className = "row root", e.append(T(l, (t) => {
        l = t;
      })), e.append(L(l, (t) => {
        l = t;
      })), v.append(e);
    }
  }, x = () => {
    if (m.value.trim() === "")
      return E.textContent = "", null;
    try {
      const e = JSON.parse(m.value);
      return E.textContent = "", e;
    } catch (e) {
      E.textContent = e.message;
      return;
    }
  };
  m.addEventListener("input", x), m.addEventListener("change", () => {
    const e = x();
    e !== void 0 && (l = e, y());
  }), m.addEventListener("keydown", (e) => {
    e.key === "Escape" && (m.value = JSON.stringify(l, null, 2) ?? "", E.textContent = "", m.blur());
  }), v.addEventListener("keydown", (e) => {
    e.key === "Escape" && b();
  }), j.onclick = () => {
    const e = x();
    e !== void 0 && (m.value = JSON.stringify(e, null, 2));
  };
  const S = (e) => {
    const t = e === "tree";
    v.style.display = t ? "" : "none", m.style.display = t ? "none" : "", j.style.display = t ? "none" : "", h.classList.toggle("active", t), C.classList.toggle("active", !t), E.textContent = "", t ? b() : m.value = JSON.stringify(l, null, 2) ?? "";
  };
  h.onclick = () => S("tree"), C.onclick = () => S("text"), S("tree");
  const A = i.syncStatus((e) => {
    N.classList.toggle("sync-pending", (e == null ? void 0 : e.status) === w.Pending), N.classList.toggle("sync-failed", (e == null ? void 0 : e.status) === w.Failed || (e == null ? void 0 : e.status) === w.Conflict);
  });
  return {
    destroy: () => {
      A(), N.remove(), $();
    }
  };
}
export {
  P as default
};
