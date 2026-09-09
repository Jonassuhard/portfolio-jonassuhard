import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
test("signature header presents the identity once and preserves accessible navigation", () => {
  const layout = read("app/layout.tsx");
  const nav = read("app/site-nav.tsx");
  assert.match(layout, /<SiteNav name=\{site.name\} role=\{site.title\} \/>/);
  assert.doesNotMatch(layout, /<NixieClock|className="titlebar"/);
  assert.match(nav, /className="brand-name"/);
  assert.match(nav, /className="brand-role"/);
  assert.doesNotMatch(nav, /brand-mark|<Image/);
  assert.match(nav, /aria-expanded=\{open\}/);
  assert.match(nav, /event.key === "Escape"/);
  assert.match(nav, /className="nav-back"/);
});
