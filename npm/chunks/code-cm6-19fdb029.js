const g = "/assets/editors/codemirror6-bundle.js";
async function m(t, e, l) {
  var d, a;
  const { EditorView: s, basicSetup: u } = await import(
    /* @vite-ignore */
    g
  ), i = typeof e == "string" ? document.getElementById(e) : e;
  if (!i)
    throw new Error("Editor container not found!");
  let n = ((d = t.value) == null ? void 0 : d.content) ?? "";
  const f = ((a = t.value) == null ? void 0 : a.language) ?? null, c = async (o) => {
    o !== n && (n = o, await t.edit({ content: o, language: f }));
  }, r = new s({
    doc: n,
    parent: i,
    extensions: [
      u,
      s.updateListener.of((o) => {
        o.focusChanged && !o.view.hasFocus && c(o.state.doc.toString());
      })
    ]
  });
  return {
    destroy: () => {
      c(r.state.doc.toString()), r.destroy();
    }
  };
}
export {
  m as default
};
