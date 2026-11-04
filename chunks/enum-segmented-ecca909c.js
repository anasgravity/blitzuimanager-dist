const i = () => {
  if (document.getElementById("bd-segmented-style"))
    return;
  const e = document.createElement("style");
  e.id = "bd-segmented-style", e.textContent = `
        .bd-segmented { display:inline-flex; border:1px solid #8886; border-radius:8px; overflow:hidden; }
        .bd-segment { border:none; background:transparent; padding:6px 14px; cursor:pointer; font:inherit;
            border-right:1px solid #8886; color:inherit; }
        .bd-segment:last-child { border-right:none; }
        .bd-segment-on { background:#4b5563; color:#fff; }`, document.head.append(e);
};
async function y(e, l, t) {
  var m, o, c;
  const s = typeof l == "string" ? document.getElementById(l) : l;
  i();
  const b = ((c = (o = (m = e._object) == null ? void 0 : m.model) == null ? void 0 : o.getAttributeDetails) == null ? void 0 : c.call(o, e._name)) ?? {}, p = (t == null ? void 0 : t.options) ?? b.options ?? [], r = () => {
    if (s.innerHTML = "", t != null && t.label) {
      const n = document.createElement("label");
      n.className = "bd-label", n.textContent = t.label, s.append(n);
    }
    const a = document.createElement("div");
    a.className = "bd-segmented";
    for (const n of p) {
      const d = document.createElement("button");
      d.type = "button", d.className = "bd-segment" + (e.value === n ? " bd-segment-on" : ""), d.textContent = n, d.onclick = async () => {
        await e.edit(n), r();
      }, a.append(d);
    }
    s.append(a);
  };
  r();
  const u = e.syncStatus(r);
  return { destroy: () => {
    u(), s.innerHTML = "";
  } };
}
export {
  y as default
};
