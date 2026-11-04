import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { site } from "../lib/projects";

test("the public contact uses Jonas's Gmail address", () => {
  assert.equal(site.email, "jonas.suhard@gmail.com");
  for (const file of ["public/llms.txt", "public/profile.md", "public/profile.json", "public/cv.md", "public/claims.json", "scripts/generate-cv-pdf.py"]) {
    const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.ok(!text.includes("contact@jonassuhard.com"), file);
    assert.ok(text.includes(site.email), file);
  }
});
