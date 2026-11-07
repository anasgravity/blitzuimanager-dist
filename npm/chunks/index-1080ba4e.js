import { JobStatus as c } from "@blitzdata.ts/core";
import { c as L, b as h, p as f, e as w } from "./index-eebe8775.js";
async function D(s, l, n) {
  if (!s)
    throw new Error("Duration type missing properties!");
  const e = typeof l == "string" ? document.getElementById(l) : l;
  if (!(e instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const y = L(e, "bd-duration-input", n == null ? void 0 : n.className), E = h(f(s.value) ?? 0), o = (t, a) => `<label class="part bd-duration-${t}">
        <input class="input" type="number" data-unit="${t}" min="0" ${a != null ? `max="${a}"` : ""} value="${E[t]}" />
        <span class="bd-duration-unit">${t}</span>
    </label>`;
  e.innerHTML = `<div class="container">
        ${n != null && n.label ? `<p class="label">${n.label}</p>` : ""}
        <div class="fields">${o("d")}${o("h", 23)}${o("m", 59)}${o("s", 59)}</div>
    </div>`;
  const i = e.querySelector(".container"), d = Array.from(e.querySelectorAll(".input"));
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
    t.relatedTarget instanceof Node && e.contains(t.relatedTarget) || w(e);
  };
  e.addEventListener("focusout", v);
  const $ = s.syncStatus((t) => {
    i.classList.toggle("sync-pending", (t == null ? void 0 : t.status) === c.Pending), i.classList.toggle("sync-failed", (t == null ? void 0 : t.status) === c.Failed || (t == null ? void 0 : t.status) === c.Conflict);
  });
  return {
    destroy: () => {
      $();
      for (const t of d)
        t.removeEventListener("change", m);
      e.removeEventListener("focusout", v), i.remove(), y();
    }
  };
}
export {
  D as default
};
