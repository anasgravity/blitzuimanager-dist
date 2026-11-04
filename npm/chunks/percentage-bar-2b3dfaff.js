const p = () => {
  if (document.getElementById("bd-pctbar-style"))
    return;
  const e = document.createElement("style");
  e.id = "bd-pctbar-style", e.textContent = `
        .bd-pctbar { display:flex; align-items:center; gap:8px; min-width:120px; }
        .bd-pctbar-track { flex:1; height:8px; border-radius:999px; background:#8883; overflow:hidden; }
        .bd-pctbar-fill { height:100%; border-radius:999px; background:var(--pct-color, #4f7df3); }
        .bd-pctbar-num { font-size:.85em; white-space:nowrap; }
        .bd-pctbar input[type=range] { flex:1; accent-color: var(--pct-color, #4f7df3); }`, document.head.append(e);
}, b = (e) => Math.max(0, Math.min(100, Number(e) || 0));
async function m(e, n, t) {
  const l = typeof n == "string" ? document.getElementById(n) : n;
  if (p(), l.innerHTML = "", t != null && t.label) {
    const c = document.createElement("label");
    c.className = "bd-label", c.textContent = t.label, l.append(c);
  }
  const d = document.createElement("div");
  d.className = "bd-pctbar";
  const a = document.createElement("input");
  a.type = "range", a.min = "0", a.max = "100", a.step = String((t == null ? void 0 : t.step) ?? 1), a.value = String(b(e.value));
  const r = document.createElement("span");
  r.className = "bd-pctbar-num";
  const s = () => {
    r.textContent = `${a.value} %`;
  };
  return s(), a.oninput = s, a.onchange = () => e.edit(Number(a.value)), d.append(a, r), l.append(d), { destroy: () => {
    l.innerHTML = "";
  } };
}
const u = (e, n) => {
  if (e.value === null || e.value === void 0 || e.value === "")
    return "";
  p();
  const t = b(e.value);
  return `<div class="${e._name} bd-percentage bd-pctbar">${(n == null ? void 0 : n.labelHtml) ?? ""}
        <span class="bd-pctbar-track"><span class="bd-pctbar-fill" style="width:${t}%; display:block"></span></span>
        <span class="bd-pctbar-num">${t} %</span></div>`;
};
export {
  m as default,
  u as view
};
