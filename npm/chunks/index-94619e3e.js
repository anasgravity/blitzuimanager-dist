import { t as u, a as d, E as g } from "./index-70b20e80.js";
import "@blitzdata.ts/core";
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
    onChange: async (y) => {
      await s.edit(y[0] ?? null);
    }
  }), p = s.syncStatus(c);
  return {
    destroy: () => {
      p(), l();
    }
  };
}
export {
  f as default
};
