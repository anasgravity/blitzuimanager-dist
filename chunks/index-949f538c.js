import a from "./index-5923a31f.js";
import "./index-d15f1339.js";
async function u(n, o, e) {
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
  u as default
};
