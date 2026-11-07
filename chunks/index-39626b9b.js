import { a as I, c as J } from "./index-c8fd9c5d.js";
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
async function U(d, p, u) {
  if (!d)
    throw new Error("JSON type missing properties!");
  const m = typeof p == "string" ? document.getElementById(p) : p;
  if (!(m instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  let c = d.value === void 0 ? null : JSON.parse(JSON.stringify(d.value ?? null)), E = JSON.stringify(c);
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
  const O = m.querySelector(".container"), v = m.querySelector(".tree"), i = m.querySelector(".text"), N = m.querySelector(".error"), h = m.querySelector(".mode-tree"), k = m.querySelector(".mode-text"), C = m.querySelector(".format"), y = async () => {
    const e = JSON.stringify(c);
    e !== E && (E = e, await d.edit(JSON.parse(e)));
  }, j = (e, t) => {
    const n = $(e);
    if (n === "boolean") {
      const o = document.createElement("select");
      return o.className = "value", o.innerHTML = '<option value="true">true</option><option value="false">false</option>', o.value = String(e), o.onchange = () => {
        t(o.value === "true"), y();
      }, o;
    }
    if (n === "null") {
      const o = document.createElement("span");
      return o.className = "value null", o.textContent = "null", o;
    }
    const a = document.createElement("input");
    return a.className = "value", a.type = n === "number" ? "number" : "text", n === "number" && (a.step = "any"), a.value = String(e), a.onchange = () => {
      const o = n === "number" ? Number.isFinite(Number(a.value)) ? Number(a.value) : 0 : a.value;
      t(o), y();
    }, a;
  }, T = (e, t) => {
    const n = document.createElement("select");
    return n.className = "type", n.innerHTML = D.map((a) => `<option value="${a}">${a}</option>`).join(""), n.value = $(e), n.onchange = () => {
      t(z(n.value, e)), y(), b();
    }, n;
  }, L = (e, t, n, a, o) => {
    const r = document.createElement("div");
    if (r.className = "row", a) {
      const s = document.createElement("input");
      s.className = "key", s.value = e, s.onchange = () => {
        a(s.value), y(), b();
      }, r.append(s);
    } else {
      const s = document.createElement("span");
      s.className = "key index", s.textContent = e, r.append(s);
    }
    t !== null && typeof t == "object" ? r.append(M(t)) : r.append(j(t, n)), r.append(T(t, n));
    const l = document.createElement("button");
    return l.type = "button", l.className = "remove", l.textContent = "×", l.onclick = () => {
      o(), y(), b();
    }, r.append(l), r;
  }, M = (e) => {
    const t = Array.isArray(e), n = document.createElement("details");
    n.open = !0, n.className = "node";
    const a = document.createElement("summary");
    a.textContent = t ? `[ ${e.length} ]` : `{ ${Object.keys(e).length} }`;
    const o = document.createElement("button");
    if (o.type = "button", o.className = "add", o.textContent = "+", o.onclick = (r) => {
      if (r.preventDefault(), t)
        e.push("");
      else {
        const l = e;
        let s = "new", g = 1;
        for (; Object.hasOwn(l, s); )
          s = `new${g++}`;
        l[s] = "";
      }
      y(), b();
    }, a.append(o), n.append(a), t)
      e.forEach((r, l) => {
        n.append(L(
          String(l),
          r,
          (s) => {
            e[l] = s;
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
          (s) => {
            r[l] = s;
          },
          (s) => {
            if (s === l || s === "")
              return;
            const g = Object.entries(r).map(([f, w]) => [f === l ? s : f, w]);
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
  }, S = () => {
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
  i.addEventListener("input", S), i.addEventListener("change", () => {
    const e = S();
    e !== void 0 && (c = e, y());
  }), i.addEventListener("keydown", (e) => {
    e.key === "Escape" && (i.value = JSON.stringify(c, null, 2) ?? "", N.textContent = "", i.blur());
  }), v.addEventListener("keydown", (e) => {
    e.key === "Escape" && b();
  }), C.onclick = () => {
    const e = S();
    e !== void 0 && (i.value = JSON.stringify(e, null, 2));
  };
  const x = (e) => {
    const t = e === "tree";
    v.style.display = t ? "" : "none", i.style.display = t ? "none" : "", C.style.display = t ? "none" : "", h.classList.toggle("active", t), k.classList.toggle("active", !t), N.textContent = "", t ? b() : i.value = JSON.stringify(c, null, 2) ?? "";
  };
  h.onclick = () => x("tree"), k.onclick = () => x("text"), (u == null ? void 0 : u.draft) !== void 0 ? (x("text"), i.value = u.draft, S()) : x("tree");
  const q = () => i.style.display !== "none", H = () => q() ? i.value : JSON.stringify(c, null, 2) ?? "", B = () => {
    try {
      return JSON.stringify(i.value.trim() === "" ? null : JSON.parse(i.value)) !== JSON.stringify(c);
    } catch {
      return !0;
    }
  }, F = () => JSON.stringify(c) !== E || q() && B(), P = d.syncStatus((e) => {
    O.classList.toggle("sync-pending", (e == null ? void 0 : e.status) === J.JobStatus.Pending), O.classList.toggle("sync-failed", (e == null ? void 0 : e.status) === J.JobStatus.Failed || (e == null ? void 0 : e.status) === J.JobStatus.Conflict);
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
  U as default
};
