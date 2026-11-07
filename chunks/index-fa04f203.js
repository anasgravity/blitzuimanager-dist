import a from "./index-a3d6fab3.js";
import "./index-dc13c930.js";
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
