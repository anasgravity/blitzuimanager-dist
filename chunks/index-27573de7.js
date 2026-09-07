import a from "./index-cd5b787a.js";
import "./index-faaf9c7e.js";
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
