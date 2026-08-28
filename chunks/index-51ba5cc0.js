import { m as y } from "./index-a4bc9a4f.js";
import c from "./index-2491b580.js";
import "./BDComments-1acfa38d.js";
async function A(r, p, e) {
  var m;
  if (!r)
    throw new Error("Html type missing properties!");
  var n = void 0;
  r._name && r._object && r._object.model && (n = {
    docmodel: r._object.model.getName(),
    docid: r._object._blitzID.value,
    docattribute: r._name,
    project: (m = r._object.project_fk) == null ? void 0 : m.value,
    defaultRecipient: e == null ? void 0 : e.defaultRecipient,
    onOpen: e == null ? void 0 : e.onOpenComments
  });
  const { handleSyncStatus: u, destroy: i } = c(p, {
    ...e,
    commentQuery: n,
    initialValue: r.value,
    onChange: async (o) => {
      try {
        if (/^<p id="[A-Za-z0-9_-]+"><br><\/p>$/.test(o) && (o = ""), o === r.value)
          return;
        if (o === "" && !confirm("Are you sure you want to empty the content?")) {
          window.location.reload();
          return;
        }
        await r.edit(o);
      } catch (t) {
        e != null && e.onChangeError ? e.onChangeError(t) : console.error(t.stack ?? t.message);
      }
    },
    ...e != null && e.imagesAttribute ? {
      // Update images attribute when uplading an image
      onImageUpload: (o) => {
        var s;
        const t = (s = r._object) == null ? void 0 : s[e.imagesAttribute];
        return t ? t.add(o) : Promise.resolve();
      },
      // Update images attribute when deleting an image
      onImageDelete: (o) => {
        var l;
        const t = (l = r._object) == null ? void 0 : l[e.imagesAttribute];
        if (!t || t.value === void 0)
          return Promise.resolve();
        const s = "/sd_" + o.split("sd_")[1], d = y(t.value).find((a) => (a == null ? void 0 : a.sd) === s);
        return d == null ? Promise.resolve() : t.remove(d);
      }
    } : {}
  }), _ = r.syncStatus(u);
  return {
    destroy: () => {
      _(), i();
    }
  };
}
export {
  A as default
};
