import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const banner = readFileSync(
  new URL("../app/consent-banner.tsx", import.meta.url),
  "utf8"
);
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const privacy = readFileSync(
  new URL("../app/confidentialite/page.tsx", import.meta.url),
  "utf8"
);

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

test("accepter et refuser ont le même niveau visuel", () => {
  assert.equal((banner.match(/className="button" onClick=\{\(\) => decide/g) ?? []).length, 2);
  assert.doesNotMatch(banner, /className="button primary"/);
  assert.match(css, /\.consent-actions \.button \{ min-width:94px; \}/);
});

test("le choix Clarity expire après six mois et change avec la politique", () => {
  assert.match(banner, /CONSENT_VERSION = "2026-08-26"/);
  assert.match(banner, /CONSENT_MAX_AGE_MS = 180 \* 24 \* 60 \* 60 \* 1000/);
  assert.match(banner, /now - record\.decidedAt < CONSENT_MAX_AGE_MS/);
  assert.match(banner, /localStorage\.setItem\(KEY, JSON\.stringify\(record\)\)/);
});

test("la politique décrit les traitements, durées, transferts et droits", () => {
  assert.match(privacy, /Dernière mise à jour : 26 août 2026/);
  for (const expected of [
    /Responsable du traitement/,
    /intérêt légitime/,
    /forfait Hobby/,
    /pendant 180 jours/,
    /jusqu'à neuf mois/,
    /Infomaniak/,
    /transferts/,
    /clauses\s+contractuelles types/,
    /limitation, la portabilité/,
    /réclamation auprès de la/,
    /Aucune décision produisant un effet juridique/
  ]) {
    assert.match(privacy, expected);
  }
});
