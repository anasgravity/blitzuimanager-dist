import { a as $, h as p, T as q } from "./index-fd23d760.js";
const m = [
  "plain",
  "javascript",
  "typescript",
  "json",
  "html",
  "css",
  "php",
  "python",
  "sql",
  "shell",
  "markdown",
  "yaml",
  "xml",
  "java",
  "c",
  "cpp",
  "csharp",
  "go",
  "rust",
  "ruby",
  "swift",
  "kotlin"
];
async function j(t, s, e) {
  var d, u;
  if (!t)
    throw new Error("Code type missing properties!");
  const n = typeof s == "string" ? document.getElementById(s) : s;
  if (!(n instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const a = ((d = t.value) == null ? void 0 : d.language) ?? null;
  let r = a;
  const y = $(n, "bd-code-input", e == null ? void 0 : e.className);
  n.innerHTML = `<div class="code-container">
        <select class="code-language">
            ${a && !m.includes(a) ? `<option value="${p(a)}">${p(a)}</option>` : ""}
            ${m.map((l) => `<option value="${l}">${l}</option>`).join("")}
        </select>
        <div class="code-editor"></div>
    </div>`;
  const v = n.querySelector(".code-container"), o = n.querySelector(".code-language"), c = n.querySelector(".code-editor");
  o.value = a ?? "plain";
  const { handleSyncStatus: h, getValue: g, isPending: E, cancelPending: w, destroy: S } = q(c, {
    ...e,
    multiple: !1,
    initialValue: (e == null ? void 0 : e.draft) ?? ((u = t.value) == null ? void 0 : u.content) ?? "",
    onChange: async (l) => {
      await t.edit({ content: l, language: r });
    }
  }), i = c.querySelector(".input");
  i.style.fontFamily = "monospace", o.onchange = async () => {
    r = o.value === "plain" ? null : o.value, await t.edit({ content: i.value, language: r });
  };
  const C = t.syncStatus(h);
  return {
    getDraft: g,
    isPending: E,
    cancelPending: w,
    destroy: () => {
      C(), S(), v.remove(), y();
    }
  };
}
export {
  j as default
};
