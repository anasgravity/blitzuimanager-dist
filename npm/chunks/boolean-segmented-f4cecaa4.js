const c = (e) => String(e).replace(/[&<>"']/g, (o) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[o]), u = () => {
  if (document.getElementById("bd-boolseg-style"))
    return;
  const e = document.createElement("style");
  e.id = "bd-boolseg-style", e.textContent = `
        .bd-boolseg { display:inline-flex; border:1px solid #8886; border-radius:8px; overflow:hidden; }
        .bd-boolseg button { border:none; background:transparent; padding:6px 16px; cursor:pointer; font:inherit; color:inherit;
            display:inline-flex; align-items:center; gap:6px; }
        .bd-boolseg img, .bd-bool-word img { height:18px; width:auto; display:inline-block; vertical-align:middle; }
        .bd-boolseg .bd-bool-yes-on { background:#16a34a; color:#fff; }
        .bd-boolseg .bd-bool-no-on { background:#6b7280; color:#fff; }
        .bd-bool-word.bd-bool-yes { color:#16a34a; } .bd-bool-word.bd-bool-no { color:#6b7280; }`, document.head.append(e);
}, p = (e, o) => {
  var d, s, a, i;
  const n = ((i = (a = (s = (d = e._object) == null ? void 0 : d.model) == null ? void 0 : s.getAttributeDetails) == null ? void 0 : a.call(s, e._name)) == null ? void 0 : i.editorConfig) ?? {}, l = (b, t) => (o == null ? void 0 : o[b]) ?? n[b] ?? t;
  return {
    yes: { word: l("trueLabel", "Yes"), image: l("trueImage", null) },
    no: { word: l("falseLabel", "No"), image: l("falseImage", null) }
  };
}, g = (e) => e.image ? `<img src="${c(e.image)}" alt="${c(e.word)}" />` : c(e.word);
async function y(e, o, n) {
  const l = typeof o == "string" ? document.getElementById(o) : o;
  u();
  const { yes: d, no: s } = p(e, n), a = () => {
    if (l.innerHTML = "", n != null && n.label) {
      const t = document.createElement("label");
      t.className = "bd-label", t.textContent = n.label, l.append(t);
    }
    const b = document.createElement("div");
    b.className = "bd-boolseg";
    for (const [t, m] of [[d, !0], [s, !1]]) {
      const r = document.createElement("button");
      r.type = "button", r.innerHTML = g(t), r.title = t.word, e.value === m && (r.className = m ? "bd-bool-yes-on" : "bd-bool-no-on"), r.onclick = async () => {
        await e.edit(m), a();
      }, b.append(r);
    }
    l.append(b);
  };
  a();
  const i = e.syncStatus(a);
  return { destroy: () => {
    i(), l.innerHTML = "";
  } };
}
const f = (e, o) => {
  if (e.value !== !0 && e.value !== !1)
    return "";
  u();
  const { yes: n, no: l } = p(e), d = e.value ? n : l;
  return `<p class="${c(e._name)} bd-boolean bd-bool-word ${e.value ? "bd-bool-yes" : "bd-bool-no"}" title="${c(d.word)}">${(o == null ? void 0 : o.labelHtml) ?? ""}${g(d)}</p>`;
};
export {
  y as default,
  f as view
};
