import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const banner = readFileSync(
  new URL("../app/consent-banner.tsx", import.meta.url),
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
