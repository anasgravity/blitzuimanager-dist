import { T as u, E as d } from "./index-11343ee8.js";
async function E(n, a, e) {
  var r, t, i;
  if (!n)
    throw new Error("Tag type missing properties!");
  const s = (r = n._object) == null ? void 0 : r.model, o = (i = (t = s == null ? void 0 : s.getAttributeDetails) == null ? void 0 : t.call(s, n._name)) == null ? void 0 : i.options;
  if (!s || !Array.isArray(o) || o.length === 0)
    return u(n, a, e);
  const { handleSyncStatus: c, destroy: l } = await d(a, {
    ...e,
    model: s,
    attribute: n._name,
    initialValue: n.value,
    multiple: !1,
    onChange: async (p) => {
      await n.edit(p[0] ?? null);
    }
  }), y = n.syncStatus(c);
  return {
    destroy: () => {
      y(), l();
    }
  };
}
export {
  E as default
};
