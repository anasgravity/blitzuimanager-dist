import a from "./index-ab8e77db.js";
import "./index-7519cff4.js";
import "@blitzdata.ts/core";
async function y(n, o, e) {
  if (!n)
    throw new Error("Phone type missing properties!");
  const { handleSyncStatus: s, destroy: r } = a(o, {
    ...e,
    initialValue: n.value,
    onChange: async (i) => {
      await n.edit(i);
    }
  }), t = n.syncStatus(s);
  return {
    destroy: () => {
      t(), r();
    }
  };
}
export {
  y as default
};
