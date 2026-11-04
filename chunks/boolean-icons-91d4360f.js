const b = (e) => String(e).replace(/[&<>"']/g, (o) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[o]), m = {
  check: { yes: "✓", no: "✗" },
  circle: { yes: "●", no: "○" },
  thumbs: { yes: "👍", no: "👎" }
}, y = () => {
  if (document.getElementById("bd-boolicons-style"))
    return;
  const e = document.createElement("style");
  e.id = "bd-boolicons-style", e.textContent = `
        .bd-boolicons { display:inline-flex; gap:4px; }
        .bd-boolicons button { border:1px solid transparent; background:transparent; cursor:pointer;
            font:inherit; font-size:1.15em; padding:4px 8px; border-radius:8px; opacity:.35; }
        .bd-boolicons button.on { opacity:1; border-color:#8886; }
        .bd-boolicons img, .bd-boolicon-view img { height:18px; width:auto; vertical-align:middle; }
        .bd-boolicons svg, .bd-boolicon-view svg { height:18px; width:auto; vertical-align:middle; }
        .bd-boolicon-view.bd-bool-yes { color:#16a34a; } .bd-boolicon-view.bd-bool-no { color:#9ca3af; }`, document.head.append(e);
}, v = (e, o) => {
  var r, s, i, a;
  const n = ((a = (i = (s = (r = e._object) == null ? void 0 : r.model) == null ? void 0 : s.getAttributeDetails) == null ? void 0 : i.call(s, e._name)) == null ? void 0 : a.editorConfig) ?? {}, t = (l) => (o == null ? void 0 : o[l]) ?? n[l], c = m[t("preset")] ?? m.check;
  return { yes: t("trueIcon") ?? c.yes, no: t("falseIcon") ?? c.no };
}, h = (e, o) => {
  const n = String(e).trim();
  return n.startsWith("<svg") ? n : /^(https?:)?\//.test(n) ? `<img src="${b(n)}" alt="${b(o)}" />` : b(n);
};
async function f(e, o, n) {
  const t = typeof o == "string" ? document.getElementById(o) : o;
  y();
  const { yes: c, no: r } = v(e, n), s = () => {
    if (t.innerHTML = "", n != null && n.label) {
      const l = document.createElement("label");
      l.className = "bd-label", l.textContent = n.label, t.append(l);
    }
    const a = document.createElement("div");
    a.className = "bd-boolicons";
    for (const [l, u, p] of [[c, "yes", !0], [r, "no", !1]]) {
      const d = document.createElement("button");
      d.type = "button", d.innerHTML = h(l, u), d.title = u, e.value === p && d.classList.add("on"), d.onclick = async () => {
        await e.edit(p), s();
      }, a.append(d);
    }
    t.append(a);
  };
  s();
  const i = e.syncStatus(s);
  return { destroy: () => {
    i(), t.innerHTML = "";
  } };
}
const g = (e, o) => {
  if (e.value !== !0 && e.value !== !1)
    return "";
  y();
  const { yes: n, no: t } = v(e), c = e.value ? "yes" : "no";
  return `<p class="${b(e._name)} bd-boolean bd-boolicon-view ${e.value ? "bd-bool-yes" : "bd-bool-no"}" title="${c}">${(o == null ? void 0 : o.labelHtml) ?? ""}${h(e.value ? n : t, c)}</p>`;
};
export {
  f as default,
  g as view
};
