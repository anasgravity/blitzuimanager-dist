const i = "/assets/js/vanilla-jsoneditor-standalone.js";
async function p(a, s, t) {
  const { createJSONEditor: o } = await import(
    /* @vite-ignore */
    i
  ), n = typeof s == "string" ? document.getElementById(s) : s;
  if (!n)
    throw new Error("Editor container not found!");
  if (t != null && t.label) {
    const e = document.createElement("p");
    e.className = "label", e.textContent = t.label, n.append(e);
  }
  const r = o({
    target: n,
    props: {
      content: { json: a.value ?? null },
      onChange: async (e, u, { contentErrors: l }) => {
        if (l)
          return;
        const d = e.json !== void 0 ? e.json : JSON.parse(e.text);
        await a.edit(d);
      }
    }
  });
  return {
    destroy: () => {
      r.destroy(), n.innerHTML = "";
    }
  };
}
export {
  p as default
};
