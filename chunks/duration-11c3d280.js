import { c as L, a as h, p as y, b as u, e as w } from "./index-a6de6967.js";
async function D(s, l, n) {
  if (!s)
    throw new Error("Duration type missing properties!");
  const e = typeof l == "string" ? document.getElementById(l) : l;
  if (!(e instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const E = L(e, "bd-duration-input", n == null ? void 0 : n.className), f = h(y(s.value) ?? 0), o = (t, a) => `<label class="part bd-duration-${t}">
        <input class="input" type="number" data-unit="${t}" min="0" ${a != null ? `max="${a}"` : ""} value="${f[t]}" />
        <span class="bd-duration-unit">${t}</span>
    </label>`;
  e.innerHTML = `<div class="container">
        ${n != null && n.label ? `<p class="label">${n.label}</p>` : ""}
        <div class="fields">${o("d")}${o("h", 23)}${o("m", 59)}${o("s", 59)}</div>
    </div>`;
  const i = e.querySelector(".container"), d = Array.from(e.querySelectorAll(".input"));
  let p = y(s.value) ?? 0;
  const r = (t) => {
    const a = d.find((b) => b.dataset.unit === t), c = parseInt((a == null ? void 0 : a.value) ?? "0", 10);
    return Number.isFinite(c) && c > 0 ? c : 0;
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
    i.classList.toggle("sync-pending", (t == null ? void 0 : t.status) === u.Pending), i.classList.toggle("sync-failed", (t == null ? void 0 : t.status) === u.Failed || (t == null ? void 0 : t.status) === u.Conflict);
  });
  return {
    destroy: () => {
      $();
      for (const t of d)
        t.removeEventListener("change", m);
      e.removeEventListener("focusout", v), i.remove(), E();
    }
  };
}
export {
  D as default
};
