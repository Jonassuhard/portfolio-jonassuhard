import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { site } from "../lib/projects";
const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
test("availability is October 1 across the public profile", () => {
  assert.equal(site.availability, "1er octobre 2026");
  assert.equal(site.availabilityDate, "2026-10-01");
  for (const path of ["public/profile.json", "public/profile.md", "public/cv.md", "public/llms.txt", "public/claims.json", "public/verification.json"]) {
    assert.match(read(path), /1er octobre 2026/);
    assert.doesNotMatch(read(path), /1er septembre 2026|disponible maintenant/i);
  }
  assert.match(read("lib/json-ld.ts"), /availabilityStarts: site.availabilityDate/);
});
test("compact footer keeps resources and the existing consent entry point", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /footer-signature/);
  assert.match(layout, /<details className="footer-resources">/);
  assert.match(layout, /data-open-consent/);
  for (const path of ["/preuves", "/methode", "/knowledge", "/competences", "/mentions-legales", "/confidentialite"]) assert.ok(layout.includes(path));
  assert.doesNotMatch(layout, /className="foot-cols"/);
});
