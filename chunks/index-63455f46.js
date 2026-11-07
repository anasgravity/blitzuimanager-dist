import { t as u, b as d, E as g } from "./index-dc13c930.js";
async function f(s, a, e) {
  var r, t, i;
  if (!s)
    throw new Error("Tag type missing properties!");
  const n = (r = s._object) == null ? void 0 : r.model, o = (i = (t = n == null ? void 0 : n.getAttributeDetails) == null ? void 0 : t.call(n, s._name)) == null ? void 0 : i.options;
  if (!n || !Array.isArray(o) || o.length === 0 || u(s))
    return d(s, a, e);
  const { handleSyncStatus: c, destroy: l } = await g(a, {
    ...e,
    model: n,
    attribute: s._name,
    initialValue: s.value,
    multiple: !1,
    onChange: async (p) => {
      await s.edit(p[0] ?? null);
    }
  }), y = s.syncStatus(c);
  return {
    destroy: () => {
      y(), l();
    }
  };
}
export {
  f as default
};
