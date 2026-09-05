import { c as H, g as q, r as B } from "./index-080ced3f.js";
function w(i, n, t) {
  const { value: e, start: o, end: l } = i, s = n.length, c = e.slice(o, l);
  if (e.slice(o - s, o) === n && e.slice(l, l + s) === n && o >= s)
    return { value: e.slice(0, o - s) + c + e.slice(l + s), start: o - s, end: l - s };
  if (c.length >= 2 * s && c.startsWith(n) && c.endsWith(n)) {
    const v = c.slice(s, c.length - s);
    return { value: e.slice(0, o) + v + e.slice(l), start: o, end: o + v.length };
  }
  const u = c || t;
  return {
    value: e.slice(0, o) + n + u + n + e.slice(l),
    start: o + s,
    end: o + s + u.length
  };
}
function C(i, n) {
  const { value: t, start: e, end: o } = i, l = t.lastIndexOf(`
`, e - 1) + 1, s = t.indexOf(`
`, o), c = s === -1 ? t.length : s, u = n(t.slice(l, c).split(`
`)).join(`
`);
  return { value: t.slice(0, l) + u + t.slice(c), start: l, end: l + u.length };
}
function I(i, n) {
  return C(i, (t) => t.map((e) => {
    const o = e.replace(/^#{1,6}\s+/, "");
    return n > 0 ? `${"#".repeat(n)} ${o}` : o;
  }));
}
const T = /^(?:[-*]|\d+\.)\s+/;
function k(i, n) {
  const t = n ? /^\d+\.\s+/ : /^[-*]\s+/;
  return C(i, (e) => {
    if (e.every((l) => l === "" || t.test(l)))
      return e.map((l) => l.replace(t, ""));
    let o = 0;
    return e.map((l) => l === "" ? l : (n ? `${++o}. ` : "- ") + l.replace(T, ""));
  });
}
function M(i) {
  const { value: n, start: t, end: e } = i, o = n.slice(t, e), l = o || "link text", s = "https://example.com", c = n.slice(0, t) + `[${l}](${s})` + n.slice(e);
  return o ? { value: c, start: t + l.length + 3, end: t + l.length + 3 + s.length } : { value: c, start: t + 1, end: t + 1 + l.length };
}
function N(i) {
  const { value: n, start: t, end: e } = i, o = n.slice(t, e) || "alt text", l = "image-url";
  return {
    value: n.slice(0, t) + `![${o}](${l})` + n.slice(e),
    start: t + o.length + 4,
    end: t + o.length + 4 + l.length
  };
}
const x = (i) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${i}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`, h = {
  bold: x("M5 2.5h4a2.75 2.75 0 0 1 0 5.5H5zM5 8h4.75a2.75 2.75 0 0 1 0 5.5H5z"),
  italic: x("M6.5 2.5h6M3.5 13.5h6M9.5 2.5l-3 11"),
  ul: '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.5h7.5M6 8h7.5M6 12.5h7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="2.75" cy="3.5" r="1.1" fill="currentColor"/><circle cx="2.75" cy="8" r="1.1" fill="currentColor"/><circle cx="2.75" cy="12.5" r="1.1" fill="currentColor"/></svg>',
  ol: '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 3.5h7M6.5 8h7M6.5 12.5h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><text x="1" y="5.5" font-size="5.5" fill="currentColor">1</text><text x="1" y="10" font-size="5.5" fill="currentColor">2</text><text x="1" y="14.5" font-size="5.5" fill="currentColor">3</text></svg>',
  link: x("M6.75 9.25l2.5-2.5M5.75 7L4 8.75a2.47 2.47 0 0 0 3.5 3.5L9.25 10.5M10.25 9l1.75-1.75a2.47 2.47 0 0 0-3.5-3.5L6.75 5.5"),
  image: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="5.5" cy="6.5" r="1" fill="currentColor"/><path d="M4 11.5l3-3 2 2 2-2 1.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
}, O = [
  ["# Heading", "heading (## and ### too)"],
  ["**bold**", "bold"],
  ["*italic*", "italic"],
  ["- item", "bullet list"],
  ["1. item", "numbered list"],
  ["[title](https://…)", "link"],
  ["![alt](url)", "image"],
  ["`code`", "code"],
  ["&gt; quote", "quote"]
], z = () => `<div class="md-toolbar" role="toolbar" aria-label="Formatting">
    <select class="md-heading" title="Text style" aria-label="Text style">
        <option value="" selected hidden>Aa</option>
        <option value="0">Normal text</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
    </select>
    <button type="button" class="md-bold" title="Bold (Ctrl+B)">${h.bold}</button>
    <button type="button" class="md-italic" title="Italic (Ctrl+I)">${h.italic}</button>
    <span class="md-sep"></span>
    <button type="button" class="md-ul" title="Bullet list">${h.ul}</button>
    <button type="button" class="md-ol" title="Numbered list">${h.ol}</button>
    <span class="md-sep"></span>
    <button type="button" class="md-link" title="Link (Ctrl+K)">${h.link}</button>
    <button type="button" class="md-image" title="Image">${h.image}</button>
    <details class="md-help">
        <summary title="Formatting help">?</summary>
        <table class="md-help-pop">
            ${O.map(([i, n]) => `<tr><td><code>${i}</code></td><td>${n}</td></tr>`).join("")}
        </table>
    </details>
</div>`;
async function A(i, n, t) {
  if (!i)
    throw new Error("Markdown type missing properties!");
  const e = typeof n == "string" ? document.getElementById(n) : n;
  if (!(e instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const o = H(e, "bd-markdown-input", t == null ? void 0 : t.className);
  e.innerHTML = `<div class="md-container">
        <div class="md-head">
            ${(t == null ? void 0 : t.toolbar) === !1 ? "" : z()}
            <div class="md-tabs">
                <button type="button" class="md-write active">Write</button>
                <button type="button" class="md-preview-btn">Preview</button>
            </div>
        </div>
        <div class="md-editor"></div>
        <div class="md-preview bd-markdown" style="display: none;"></div>
    </div>`;
  const l = e.querySelector(".md-container"), s = e.querySelector(".md-editor"), c = e.querySelector(".md-preview"), u = e.querySelector(".md-write"), v = e.querySelector(".md-preview-btn"), g = e.querySelector(".md-toolbar"), { handleSyncStatus: E, destroy: $ } = q(s, {
    ...t,
    multiple: !1,
    initialValue: i.value ?? "",
    onChange: async (a) => {
      await i.edit(a);
    }
  }), d = s.querySelector(".input"), b = (a) => {
    const m = a({ value: d.value, start: d.selectionStart, end: d.selectionEnd });
    d.value = m.value, d.focus(), d.setSelectionRange(m.start, m.end), d.dispatchEvent(new Event("input", { bubbles: !0 }));
  };
  if (g) {
    const a = (r, y) => {
      const p = g.querySelector(r);
      p.onmousedown = (S) => S.preventDefault(), p.onclick = () => b(y);
    };
    a(".md-bold", (r) => w(r, "**", "bold text")), a(".md-italic", (r) => w(r, "*", "italic text")), a(".md-ul", (r) => k(r, !1)), a(".md-ol", (r) => k(r, !0)), a(".md-link", M), a(".md-image", N);
    const m = g.querySelector(".md-heading");
    m.onchange = () => {
      m.value !== "" && b((r) => I(r, Number(m.value))), m.value = "";
    }, d.addEventListener("keydown", (r) => {
      if (!(r.ctrlKey || r.metaKey) || r.altKey)
        return;
      const y = r.key.toLowerCase();
      y === "b" ? (r.preventDefault(), b((p) => w(p, "**", "bold text"))) : y === "i" ? (r.preventDefault(), b((p) => w(p, "*", "italic text"))) : y === "k" && (r.preventDefault(), b(M));
    });
  }
  const f = (a) => {
    a && (c.innerHTML = B(d.value)), s.style.display = a ? "none" : "", c.style.display = a ? "" : "none", u.classList.toggle("active", !a), v.classList.toggle("active", a), g && (g.style.visibility = a ? "hidden" : ""), a || d.focus();
  };
  u.onclick = () => f(!1), v.onclick = () => f(!0);
  const L = i.syncStatus(E);
  return {
    destroy: () => {
      L(), $(), l.remove(), o();
    }
  };
}
export {
  A as default,
  N as insertImage,
  M as insertLink,
  I as setHeading,
  w as toggleInline,
  k as toggleList
};
