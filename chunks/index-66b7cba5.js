import a from "./index-d6002e97.js";
import "./index-a4bc9a4f.js";
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
