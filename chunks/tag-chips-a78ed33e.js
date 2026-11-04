const u = (e) => String(e).replace(/[&<>"']/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[n]), g = () => {
  if (document.getElementById("bd-tagchips-style"))
    return;
  const e = document.createElement("style");
  e.id = "bd-tagchips-style", e.textContent = `
        .bd-tagchip { display:inline-block; border:1px solid var(--tag-color, #8884); border-radius:999px;
            padding:2px 11px; margin:2px 4px 2px 0; font-size:.85em; color:var(--tag-color, inherit); }
        button.bd-tagchip { cursor:pointer; background:transparent; font:inherit; }
        /* two classes outrank button.bd-tagchip — the selected chip keeps its colored background */
        .bd-tagchip.bd-tagchip-on { background:var(--tag-color, #555); color:#fff; border-color:var(--tag-color, #555); }
        .bd-tagchip-on { background:var(--tag-color, #555); color:#fff; border-color:var(--tag-color, #555); }`, document.head.append(e);
}, v = (e, n) => {
  var l, t, c, a, r;
  return (n == null ? void 0 : n.colors) ?? ((r = (a = (c = (t = (l = e._object) == null ? void 0 : l.model) == null ? void 0 : t.getAttributeDetails) == null ? void 0 : c.call(t, e._name)) == null ? void 0 : a.editorConfig) == null ? void 0 : r.colors) ?? {};
};
async function b(e, n, l) {
  var i, d, m;
  const t = typeof n == "string" ? document.getElementById(n) : n;
  g();
  const c = ((m = (d = (i = e._object) == null ? void 0 : i.model) == null ? void 0 : d.getAttributeDetails) == null ? void 0 : m.call(d, e._name)) ?? {}, a = (l == null ? void 0 : l.options) ?? c.options ?? [], r = v(e, l);
  if (!a.length) {
    const o = document.createElement("input");
    return o.value = e.value ?? "", o.onkeydown = (s) => {
      s.key === "Enter" && e.edit(o.value || null), s.key === "Escape" && (o.value = e.value ?? "");
    }, o.onblur = () => e.edit(o.value || null), t.append(o), { destroy: () => {
      t.innerHTML = "";
    } };
  }
  const p = () => {
    if (t.innerHTML = "", l != null && l.label) {
      const o = document.createElement("label");
      o.className = "bd-label", o.textContent = l.label, t.append(o);
    }
    for (const o of a) {
      const s = document.createElement("button");
      s.type = "button", s.className = "bd-tagchip" + (e.value === o ? " bd-tagchip-on" : ""), r[o] && s.style.setProperty("--tag-color", r[o]), s.textContent = o, s.onclick = async () => {
        await e.edit(e.value === o ? null : o), p();
      }, t.append(s);
    }
  };
  p();
  const y = e.syncStatus(p);
  return { destroy: () => {
    y(), t.innerHTML = "";
  } };
}
const h = (e, n) => {
  if (e.value === null || e.value === void 0 || e.value === "")
    return "";
  g();
  const l = v(e), c = (Array.isArray(e.value) ? e.value : [e.value]).map((a) => `<span class="bd-tagchip bd-tagchip-on"${l[a] ? ` style="--tag-color:${u(l[a])}"` : ""}>${u(a)}</span>`);
  return `<div class="${u(e._name)} bd-tag">${(n == null ? void 0 : n.labelHtml) ?? ""}${c.join(" ")}</div>`;
};
export {
  b as default,
  h as view
};
