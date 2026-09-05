import { JobStatus as c } from "@blitzdata.ts/core";
import { c as L, a as h, p as f, b as w } from "./index-12f4dad8.js";
async function D(s, l, e) {
  if (!s)
    throw new Error("Duration type missing properties!");
  const n = typeof l == "string" ? document.getElementById(l) : l;
  if (!(n instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const y = L(n, "bd-duration-input", e == null ? void 0 : e.className), E = h(f(s.value) ?? 0), o = (t, a) => `<label class="part bd-duration-${t}">
        <input class="input" type="number" data-unit="${t}" min="0" ${a != null ? `max="${a}"` : ""} value="${E[t]}" />
        <span class="bd-duration-unit">${t}</span>
    </label>`;
  n.innerHTML = `<div class="container">
        ${e != null && e.label ? `<p class="label">${e.label}</p>` : ""}
        <div class="fields">${o("d")}${o("h", 23)}${o("m", 59)}${o("s", 59)}</div>
    </div>`;
  const i = n.querySelector(".container"), d = Array.from(n.querySelectorAll(".input"));
  let p = f(s.value) ?? 0;
  const r = (t) => {
    const a = d.find((b) => b.dataset.unit === t), u = parseInt((a == null ? void 0 : a.value) ?? "0", 10);
    return Number.isFinite(u) && u > 0 ? u : 0;
  }, m = async () => {
    const t = r("d") * 86400 + r("h") * 3600 + r("m") * 60 + r("s");
    t !== p && (p = t, await s.edit(t));
  };
  for (const t of d)
    t.addEventListener("change", m);
  const v = (t) => {
    t.relatedTarget instanceof Node && n.contains(t.relatedTarget) || w(n);
  };
  n.addEventListener("focusout", v);
  const $ = s.syncStatus((t) => {
    i.classList.toggle("sync-pending", (t == null ? void 0 : t.status) === c.Pending), i.classList.toggle("sync-failed", (t == null ? void 0 : t.status) === c.Failed || (t == null ? void 0 : t.status) === c.Conflict);
  });
  return {
    destroy: () => {
      $();
      for (const t of d)
        t.removeEventListener("change", m);
      n.removeEventListener("focusout", v), i.remove(), y();
    }
  };
}
export {
  D as default
};
