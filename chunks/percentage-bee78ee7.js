import { N as u } from "./index-a4bc9a4f.js";
async function i(e, s, n) {
  if (!e)
    throw new Error("Percentage type missing properties!");
  const a = e.value != null ? parseFloat(e.value) : NaN, { handleSyncStatus: t, destroy: l } = u(s, {
    ...n,
    label: (n == null ? void 0 : n.label) ?? "%",
    float: !0,
    initialValue: Number.isFinite(a) ? Math.round(a * 1e4) / 1e4 : void 0,
    onChange: async (r) => {
      await e.edit(r === null ? null : Math.round(r * 1e4) / 1e4);
    }
  }), o = e.syncStatus(t);
  return {
    destroy: () => {
      o(), l();
    }
  };
}
export {
  i as default
};
