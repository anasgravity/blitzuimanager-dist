import { Y as u, y as m } from "./index-080ced3f.js";
async function h(i, o, d) {
  const r = i.edit.bind(i), e = async (t) => {
    const n = t != null && t.url ? m(t.url) : null;
    return r(n && !t.thumbnail ? { ...t, thumbnail: `https://img.youtube.com/vi/${n}/hqdefault.jpg` } : t);
  }, s = new Proxy(i, {
    get: (t, n, c) => n === "edit" ? e : Reflect.get(t, n, c)
  });
  return u(s, o, d);
}
export {
  h as default
};
