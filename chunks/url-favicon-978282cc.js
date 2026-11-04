const r = (a) => String(a).replace(/[&<>"']/g, (l) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[l]), d = (a) => {
  try {
    const l = new URL(String(a));
    return ["http:", "https:"].includes(l.protocol) ? l : null;
  } catch {
    return null;
  }
};
async function u(a, l, t) {
  const s = typeof l == "string" ? document.getElementById(l) : l;
  if (s.innerHTML = "", t != null && t.label) {
    const n = document.createElement("label");
    n.className = "bd-label", n.textContent = t.label, s.append(n);
  }
  const e = document.createElement("input");
  e.type = "url", e.placeholder = (t == null ? void 0 : t.placeholder) ?? "https://…", e.value = a.value ?? "";
  const i = () => {
    if (e.value !== (a.value ?? "")) {
      if (e.value !== "" && !d(e.value))
        return e.classList.add("bd-basic-invalid");
      e.classList.remove("bd-basic-invalid"), a.edit(e.value || null);
    }
  };
  return e.onblur = i, e.onkeydown = (n) => {
    n.key === "Enter" && i(), n.key === "Escape" && (e.value = a.value ?? "", e.classList.remove("bd-basic-invalid"));
  }, s.append(e), { destroy: () => {
    s.innerHTML = "";
  } };
}
const c = (a, l) => {
  const t = d(a.value);
  return t ? `<div class="${r(a._name)} bd-url bd-url-favicon">${(l == null ? void 0 : l.labelHtml) ?? ""}
        <a href="${r(t.href)}" title="${r(t.href)}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;">
            <img src="${r(t.origin)}/favicon.ico" alt="" width="16" height="16" onerror="this.style.display='none'" style="border-radius:3px;" />
            <span>${r(t.hostname)}</span>
        </a></div>` : "";
};
export {
  u as default,
  c as view
};
