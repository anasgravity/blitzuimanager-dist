const p = (e, t) => {
  var r;
  return (e == null ? void 0 : e.maxStars) ?? ((r = t == null ? void 0 : t.editorConfig) == null ? void 0 : r.maxStars) ?? 5;
}, w = {
  extends: "int",
  view: ({ value: e, config: t, attributeDetails: r }) => {
    if (e == null)
      return "";
    const l = p(t, r), a = Math.max(0, Math.min(l, Number(e) || 0));
    return `<p class="bd-stars-view">${"★".repeat(a)}${"☆".repeat(l - a)}</p>`;
  },
  control: ({ host: e, value: t, onChange: r, subscribe: l, config: a, attributeDetails: c }) => {
    const o = p(a, c), d = (x) => {
      if (e.innerHTML = "", a != null && a.label) {
        const n = document.createElement("label");
        n.className = "bd-label", n.textContent = a.label, e.append(n);
      }
      for (let n = 1; n <= o; n++) {
        const m = document.createElement("span");
        m.className = "bd-star", m.textContent = n <= x ? "★" : "☆", m.onclick = async () => {
          await r(n), d(n);
        }, e.append(m);
      }
    };
    d(t ?? 0);
    const s = l == null ? void 0 : l((x) => d(x ?? 0));
    return () => {
      s == null || s(), e.innerHTML = "";
    };
  }
};
export {
  w as default
};
