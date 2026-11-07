import { JobStatus as h } from "@blitzdata.ts/core";
import { c as I } from "./index-70b20e80.js";
const D = ["text", "number", "boolean", "null", "object", "array"], $ = (d) => {
  if (d === null)
    return "null";
  if (Array.isArray(d))
    return "array";
  switch (typeof d) {
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return "object";
    default:
      return "text";
  }
}, z = (d, p) => {
  switch (d) {
    case "text":
      return p === null || typeof p == "object" ? "" : String(p);
    case "number": {
      const u = Number(p);
      return Number.isFinite(u) ? u : 0;
    }
    case "boolean":
      return p === !0 || p === "true" || p === 1;
    case "null":
      return null;
    case "object":
      return {};
    case "array":
      return [];
  }
};
async function Y(d, p, u) {
  if (!d)
    throw new Error("JSON type missing properties!");
  const m = typeof p == "string" ? document.getElementById(p) : p;
  if (!(m instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = d.value === void 0 ? null : JSON.parse(JSON.stringify(d.value ?? null)), S = JSON.stringify(c);
  const A = I(m, "bd-json-input", u == null ? void 0 : u.className);
  m.innerHTML = `<div class="container">
        ${u != null && u.label ? `<p class="label">${u.label}</p>` : ""}
        <div class="toolbar">
            <button type="button" class="mode-tree">Tree</button>
            <button type="button" class="mode-text">Text</button>
            <button type="button" class="format" style="display: none;">Format</button>
            <span class="error"></span>
        </div>
        <div class="tree"></div>
        <textarea class="text" spellcheck="false" style="display: none;"></textarea>
    </div>`;
  const O = m.querySelector(".container"), v = m.querySelector(".tree"), i = m.querySelector(".text"), N = m.querySelector(".error"), k = m.querySelector(".mode-tree"), C = m.querySelector(".mode-text"), J = m.querySelector(".format"), y = async () => {
    const e = JSON.stringify(c);
    e !== S && (S = e, await d.edit(JSON.parse(e)));
  }, j = (e, t) => {
    const n = $(e);
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
  }, T = (e, t) => {
    const n = document.createElement("select");
    return n.className = "type", n.innerHTML = D.map((a) => `<option value="${a}">${a}</option>`).join(""), n.value = $(e), n.onchange = () => {
      t(z(n.value, e)), y(), b();
    }, n;
  }, L = (e, t, n, a, s) => {
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
    t !== null && typeof t == "object" ? r.append(M(t)) : r.append(j(t, n)), r.append(T(t, n));
    const l = document.createElement("button");
    return l.type = "button", l.className = "remove", l.textContent = "×", l.onclick = () => {
      s(), y(), b();
    }, r.append(l), r;
  }, M = (e) => {
    const t = Array.isArray(e), n = document.createElement("details");
    n.open = !0, n.className = "node";
    const a = document.createElement("summary");
    a.textContent = t ? `[ ${e.length} ]` : `{ ${Object.keys(e).length} }`;
    const s = document.createElement("button");
    if (s.type = "button", s.className = "add", s.textContent = "+", s.onclick = (r) => {
      if (r.preventDefault(), t)
        e.push("");
      else {
        const l = e;
        let o = "new", g = 1;
        for (; Object.hasOwn(l, o); )
          o = `new${g++}`;
        l[o] = "";
      }
      y(), b();
    }, a.append(s), n.append(a), t)
      e.forEach((r, l) => {
        n.append(L(
          String(l),
          r,
          (o) => {
            e[l] = o;
          },
          null,
          () => {
            e.splice(l, 1);
          }
        ));
      });
    else {
      const r = e;
      for (const l of Object.keys(r))
        n.append(L(
          l,
          r[l],
          (o) => {
            r[l] = o;
          },
          (o) => {
            if (o === l || o === "")
              return;
            const g = Object.entries(r).map(([f, w]) => [f === l ? o : f, w]);
            for (const f of Object.keys(r))
              delete r[f];
            for (const [f, w] of g)
              r[f] = w;
          },
          () => {
            delete r[l];
          }
        ));
    }
    return n;
  }, b = () => {
    if (v.innerHTML = "", c !== null && typeof c == "object")
      v.append(M(c));
    else {
      const e = document.createElement("div");
      e.className = "row root", e.append(j(c, (t) => {
        c = t;
      })), e.append(T(c, (t) => {
        c = t;
      })), v.append(e);
    }
  }, x = () => {
    if (i.value.trim() === "")
      return N.textContent = "", null;
    try {
      const e = JSON.parse(i.value);
      return N.textContent = "", e;
    } catch (e) {
      N.textContent = e.message;
      return;
    }
  };
  i.addEventListener("input", x), i.addEventListener("change", () => {
    const e = x();
    e !== void 0 && (c = e, y());
  }), i.addEventListener("keydown", (e) => {
    e.key === "Escape" && (i.value = JSON.stringify(c, null, 2) ?? "", N.textContent = "", i.blur());
  }), v.addEventListener("keydown", (e) => {
    e.key === "Escape" && b();
  }), J.onclick = () => {
    const e = x();
    e !== void 0 && (i.value = JSON.stringify(e, null, 2));
  };
  const E = (e) => {
    const t = e === "tree";
    v.style.display = t ? "" : "none", i.style.display = t ? "none" : "", J.style.display = t ? "none" : "", k.classList.toggle("active", t), C.classList.toggle("active", !t), N.textContent = "", t ? b() : i.value = JSON.stringify(c, null, 2) ?? "";
  };
  k.onclick = () => E("tree"), C.onclick = () => E("text"), (u == null ? void 0 : u.draft) !== void 0 ? (E("text"), i.value = u.draft, x()) : E("tree");
  const q = () => i.style.display !== "none", H = () => q() ? i.value : JSON.stringify(c, null, 2) ?? "", B = () => {
    try {
      return JSON.stringify(i.value.trim() === "" ? null : JSON.parse(i.value)) !== JSON.stringify(c);
    } catch {
      return !0;
    }
  }, F = () => JSON.stringify(c) !== S || q() && B(), P = d.syncStatus((e) => {
    O.classList.toggle("sync-pending", (e == null ? void 0 : e.status) === h.Pending), O.classList.toggle("sync-failed", (e == null ? void 0 : e.status) === h.Failed || (e == null ? void 0 : e.status) === h.Conflict);
  });
  return {
    getDraft: H,
    isPending: F,
    destroy: () => {
      P(), O.remove(), A();
    }
  };
}
export {
  Y as default
};
