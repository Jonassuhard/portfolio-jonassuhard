import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(path, "utf8");

test("les CV publics gardent leurs URLs et un contenu general actualise", () => {
  const cv = read("public/cv.md");
  assert.match(cv, /MBA Expert Marketing Digital \(obtenu\)/);
  assert.match(cv, /1er octobre 2026/);
  assert.ok(cv.indexOf("## Projets") < cv.indexOf("## Expériences"));
  for (const project of ["Job Radar", "Cortex Bridge", "Les Petites Griffes"]) {
    assert.ok(cv.includes(project));
  }
  assert.match(cv, /Projet familial non facturé/);
  assert.doesNotMatch(cv, /MBA en cours|Polynom|datashake|GACD/i);
  assert.doesNotMatch(cv, /\b0[67](?:[\s.-]?\d){8}\b/);
  for (const file of ["cv.pdf", "cv-portfolio.pdf"]) {
    assert.equal(readFileSync("public/" + file).subarray(0, 5).toString(), "%PDF-");
    assert.ok(read("public/llms.txt").includes("https://jonassuhard.com/" + file));
  }
});

test("la formation MBA est coherente entre profil public et page", () => {
  const profile = JSON.parse(read("public/profile.json"));
  const values = Object.values(profile).filter(Array.isArray).flat();
  const mba = values.find((value) => value?.degree === "MBA Expert Marketing Digital");
  assert.equal(mba?.status, "obtenu");
  assert.match(read("app/a-propos/page.tsx"), /MBA Expert Marketing Digital \(obtenu\)/);
  assert.match(read("lib/json-ld.ts"), /MBA Expert Marketing Digital obtenu/);
});
