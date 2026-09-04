import { c as w, h as p, g as S } from "./index-11343ee8.js";
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
async function $(e, s, o) {
  var d, u;
  if (!e)
    throw new Error("Code type missing properties!");
  const n = typeof s == "string" ? document.getElementById(s) : s;
  if (!(n instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const t = ((d = e.value) == null ? void 0 : d.language) ?? null;
  let c = t;
  const y = w(n, "bd-code-input", o == null ? void 0 : o.className);
  n.innerHTML = `<div class="code-container">
        <select class="code-language">
            ${t && !m.includes(t) ? `<option value="${p(t)}">${p(t)}</option>` : ""}
            ${m.map((l) => `<option value="${l}">${l}</option>`).join("")}
        </select>
        <div class="code-editor"></div>
    </div>`;
  const v = n.querySelector(".code-container"), a = n.querySelector(".code-language"), r = n.querySelector(".code-editor");
  a.value = t ?? "plain";
  const { handleSyncStatus: g, destroy: h } = S(r, {
    ...o,
    multiple: !1,
    initialValue: ((u = e.value) == null ? void 0 : u.content) ?? "",
    onChange: async (l) => {
      await e.edit({ content: l, language: c });
    }
  }), i = r.querySelector(".input");
  i.style.fontFamily = "monospace", a.onchange = async () => {
    c = a.value === "plain" ? null : a.value, await e.edit({ content: i.value, language: c });
  };
  const E = e.syncStatus(g);
  return {
    destroy: () => {
      E(), h(), v.remove(), y();
    }
  };
}
export {
  $ as default
};
