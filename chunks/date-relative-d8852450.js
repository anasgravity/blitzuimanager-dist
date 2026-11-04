const d = (e) => String(e).replace(/[&<>"']/g, (n) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[n]), u = (e, n) => {
  const l = new Date(String(e).replace(" ", "T"));
  if (isNaN(l.getTime()))
    return null;
  const a = new Intl.RelativeTimeFormat(n ?? void 0, { numeric: "auto" }), s = (l.getTime() - Date.now()) / 1e3, t = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"], [4.35, "week"], [12, "month"], [1 / 0, "year"]];
  let o = s, c = "second";
  for (const [r, i] of t) {
    if (c = i, Math.abs(o) < r)
      break;
    o /= r;
  }
  return a.format(Math.round(o), c);
};
async function m(e, n, l) {
  const a = typeof n == "string" ? document.getElementById(n) : n;
  if (a.innerHTML = "", l != null && l.label) {
    const c = document.createElement("label");
    c.className = "bd-label", c.textContent = l.label, a.append(c);
  }
  const s = e._type === "datetime", t = document.createElement("input");
  t.type = s ? "datetime-local" : "date";
  const o = e.value ? String(e.value) : "";
  return t.value = s ? o.replace(" ", "T").slice(0, 16) : o.slice(0, 10), t.onchange = () => {
    if (!t.value)
      return e.edit(null);
    e.edit(s ? t.value.replace("T", " ") + ":00" : t.value);
  }, a.append(t), { destroy: () => {
    a.innerHTML = "";
  } };
}
const p = (e, n) => {
  var s, t, o, c, r;
  if (!e.value)
    return "";
  const l = (r = (c = (o = (t = (s = e._object) == null ? void 0 : s.model) == null ? void 0 : t.getAttributeDetails) == null ? void 0 : o.call(t, e._name)) == null ? void 0 : c.editorConfig) == null ? void 0 : r.locale, a = u(e.value, l);
  return a ? `<p class="${d(e._name)} bd-date bd-date-relative" title="${d(e.value)}">${(n == null ? void 0 : n.labelHtml) ?? ""}${d(a)}</p>` : "";
};
export {
  m as default,
  p as view
};
