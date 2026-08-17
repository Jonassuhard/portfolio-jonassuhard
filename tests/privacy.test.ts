import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const banner = readFileSync(
  new URL("../app/consent-banner.tsx", import.meta.url),
  "utf8"
);
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

test("Clarity reçoit un consentement V2 explicite et révocable", () => {
  assert.match(banner, /analytics_Storage: "granted"/);
  assert.match(banner, /analytics_Storage: "denied"/);
  assert.match(banner, /w\.clarity\("consentv2", clarityConsent\.granted\)/);
  assert.match(banner, /w\.clarity\("consentv2", clarityConsent\.denied\)/);
  assert.match(banner, /w\.clarity\("consent", false\)/);
  assert.match(banner, /window\.location\.reload\(\)/);
});

test("la bannière mobile reste compacte avec deux actions tactiles", () => {
  assert.equal((banner.match(/onClick=\{\(\) => decide\("(?:denied|granted)"\)\}/g) ?? []).length, 2);
  assert.match(css, /@media \(max-width:640px\)[\s\S]*?\.consent-inner \{ padding:10px; grid-template-columns:1fr; gap:8px; \}/);
  assert.match(css, /\.consent-actions \.button \{[^}]*min-height:44px/);
  assert.match(css, /\.foot-link-btn \{[^}]*min-height:44px/);
  assert.match(css, /\.consent-toggle \{[^}]*min-height:44px/);
});
