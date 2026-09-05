import { Y as u, y as m } from "./index-12f4dad8.js";
import "@blitzdata.ts/core";
async function y(n, o, d) {
  const r = n.edit.bind(n), e = async (t) => {
    const i = t != null && t.url ? m(t.url) : null;
    return r(i && !t.thumbnail ? { ...t, thumbnail: `https://img.youtube.com/vi/${i}/hqdefault.jpg` } : t);
  }, s = new Proxy(n, {
    get: (t, i, c) => i === "edit" ? e : Reflect.get(t, i, c)
  });
  return u(s, o, d);
}
export {
  y as default
};
