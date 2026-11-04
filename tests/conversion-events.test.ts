import test from "node:test";
import assert from "node:assert/strict";
import { CONSENT_VERSION, CONSENT_MAX_AGE_MS, conversionEvents, trackConversion } from "../lib/conversion-events";

test("conversion events require fresh consent and an initialized Clarity", () => {
  const calls: string[][] = [];
  const now = 100000000000;
  let raw = "";
  const target = { __clarityLoaded: true, clarity: (...args: string[]) => { calls.push(args); }, localStorage: { getItem: () => raw } };
  for (const value of [null, {}, { choice: "denied" }, { choice: "granted", version: "old", decidedAt: now },
    { choice: "granted", version: CONSENT_VERSION, decidedAt: now + 1 },
    { choice: "granted", version: CONSENT_VERSION, decidedAt: now - CONSENT_MAX_AGE_MS }]) {
    raw = JSON.stringify(value);
    trackConversion("contact_email_click", target, now);
  }
  raw = "invalid json";
  trackConversion("contact_email_click", target, now);
  assert.equal(calls.length, 0);
  raw = JSON.stringify({ choice: "granted", version: CONSENT_VERSION, decidedAt: now });
  target.__clarityLoaded = false;
  trackConversion("contact_email_click", target, now);
  assert.equal(calls.length, 0);
  target.__clarityLoaded = true;
  for (const event of conversionEvents) trackConversion(event, target, now);
  assert.deepEqual(calls, conversionEvents.map(event => ["event", event]));
  raw = JSON.stringify({ choice: "denied", version: CONSENT_VERSION, decidedAt: now });
  trackConversion("contact_email_click", target, now);
  assert.equal(calls.length, conversionEvents.length);
});

test("analytics errors never interrupt the action", () => {
  assert.doesNotThrow(() => trackConversion("contact_email_click", { __clarityLoaded: true, localStorage: { getItem() { throw Error("blocked"); } } }));
  const target = { __clarityLoaded: true, localStorage: { getItem: () => JSON.stringify({ choice: "granted", version: CONSENT_VERSION, decidedAt: Date.now() }) }, clarity() { throw Error("blocked"); } };
  assert.doesNotThrow(() => trackConversion("cv_classic_preview", target));
});
