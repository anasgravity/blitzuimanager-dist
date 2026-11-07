import { a as I, T, r as N } from "./index-c8fd9c5d.js";
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
function O(i, n) {
  return C(i, (t) => t.map((e) => {
    const o = e.replace(/^#{1,6}\s+/, "");
    return n > 0 ? `${"#".repeat(n)} ${o}` : o;
  }));
}
const z = /^(?:[-*]|\d+\.)\s+/;
function k(i, n) {
  const t = n ? /^\d+\.\s+/ : /^[-*]\s+/;
  return C(i, (e) => {
    if (e.every((l) => l === "" || t.test(l)))
      return e.map((l) => l.replace(t, ""));
    let o = 0;
    return e.map((l) => l === "" ? l : (n ? `${++o}. ` : "- ") + l.replace(z, ""));
  });
}
function M(i) {
  const { value: n, start: t, end: e } = i, o = n.slice(t, e), l = o || "link text", s = "https://example.com", c = n.slice(0, t) + `[${l}](${s})` + n.slice(e);
  return o ? { value: c, start: t + l.length + 3, end: t + l.length + 3 + s.length } : { value: c, start: t + 1, end: t + 1 + l.length };
}
function D(i) {
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
}, P = [
  ["# Heading", "heading (## and ### too)"],
  ["**bold**", "bold"],
  ["*italic*", "italic"],
  ["- item", "bullet list"],
  ["1. item", "numbered list"],
  ["[title](https://…)", "link"],
  ["![alt](url)", "image"],
  ["`code`", "code"],
  ["&gt; quote", "quote"]
], j = () => `<div class="md-toolbar" role="toolbar" aria-label="Formatting">
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
            ${P.map(([i, n]) => `<tr><td><code>${i}</code></td><td>${n}</td></tr>`).join("")}
        </table>
    </details>
</div>`;
async function K(i, n, t) {
  if (!i)
    throw new Error("Markdown type missing properties!");
  const e = typeof n == "string" ? document.getElementById(n) : n;
  if (!(e instanceof HTMLElement))
    throw new Error("Container parameter not valid!");
  const o = I(e, "bd-markdown-input", t == null ? void 0 : t.className);
  e.innerHTML = `<div class="md-container">
        <div class="md-head">
            ${(t == null ? void 0 : t.toolbar) === !1 ? "" : j()}
            <div class="md-tabs">
                <button type="button" class="md-write active">Write</button>
                <button type="button" class="md-preview-btn">Preview</button>
            </div>
        </div>
        <div class="md-editor"></div>
        <div class="md-preview bd-markdown" style="display: none;"></div>
    </div>`;
  const l = e.querySelector(".md-container"), s = e.querySelector(".md-editor"), c = e.querySelector(".md-preview"), u = e.querySelector(".md-write"), v = e.querySelector(".md-preview-btn"), b = e.querySelector(".md-toolbar"), { handleSyncStatus: E, getValue: $, isPending: L, cancelPending: S, destroy: H } = T(s, {
    ...t,
    multiple: !1,
    initialValue: (t == null ? void 0 : t.draft) ?? i.value ?? "",
    onChange: async (a) => {
      await i.edit(a);
    }
  }), d = s.querySelector(".input"), g = (a) => {
    const m = a({ value: d.value, start: d.selectionStart, end: d.selectionEnd });
    d.value = m.value, d.focus(), d.setSelectionRange(m.start, m.end), d.dispatchEvent(new Event("input", { bubbles: !0 }));
  };
  if (b) {
    const a = (r, y) => {
      const p = b.querySelector(r);
      p.onmousedown = (B) => B.preventDefault(), p.onclick = () => g(y);
    };
    a(".md-bold", (r) => w(r, "**", "bold text")), a(".md-italic", (r) => w(r, "*", "italic text")), a(".md-ul", (r) => k(r, !1)), a(".md-ol", (r) => k(r, !0)), a(".md-link", M), a(".md-image", D);
    const m = b.querySelector(".md-heading");
    m.onchange = () => {
      m.value !== "" && g((r) => O(r, Number(m.value))), m.value = "";
    }, d.addEventListener("keydown", (r) => {
      if (!(r.ctrlKey || r.metaKey) || r.altKey)
        return;
      const y = r.key.toLowerCase();
      y === "b" ? (r.preventDefault(), g((p) => w(p, "**", "bold text"))) : y === "i" ? (r.preventDefault(), g((p) => w(p, "*", "italic text"))) : y === "k" && (r.preventDefault(), g(M));
    });
  }
  const f = (a) => {
    a && (c.innerHTML = N(d.value)), s.style.display = a ? "none" : "", c.style.display = a ? "" : "none", u.classList.toggle("active", !a), v.classList.toggle("active", a), b && (b.style.visibility = a ? "hidden" : ""), a || d.focus();
  };
  u.onclick = () => f(!1), v.onclick = () => f(!0);
  const q = i.syncStatus(E);
  return {
    getDraft: $,
    isPending: L,
    cancelPending: S,
    destroy: () => {
      q(), H(), l.remove(), o();
    }
  };
}
export {
  K as default,
  D as insertImage,
  M as insertLink,
  O as setHeading,
  w as toggleInline,
  k as toggleList
};
