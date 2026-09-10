import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createHash } from "node:crypto";

const read = (path: string) => readFileSync(path, "utf8");

test("CV previews match the current PDFs and preserve security headers", () => {
  const manifest = JSON.parse(read("public/cv-previews.json"));
  for (const name of ["cv", "cv-portfolio"]) {
    assert.equal(manifest[name], createHash("sha256").update(readFileSync(`public/${name}.pdf`)).digest("hex"));
    assert.equal(readFileSync(`public/${name}-preview.jpg`).subarray(0, 2).toString("hex"), "ffd8");
  }
  assert.match(read("app/layout.tsx"), /<CvPreview \/>/);
  const preview = read("app/cv-preview.tsx");
  assert.match(preview, /showModal\(\)/);
  assert.match(preview, /download>Télécharger/);
  assert.match(preview, /link\.closest\("\.cv-preview-dialog"\)/);
  assert.match(preview, /trigger\.current\?\.focus/);
  assert.doesNotMatch(preview, /<iframe|<object|<embed/);
  assert.match(read("next.config.mjs"), /frame-src 'none'/);
});

test("les CV publics gardent leurs URLs et un contenu general actualise", () => {
  const cv = read("public/cv.md");
  assert.match(cv, /MBA Expert Marketing Digital, bac\+5/);
  assert.match(cv, /Titre RNCP de niveau 7 : Manager de la stratégie marketing digital/);
  assert.doesNotMatch(cv, /obtenu|RNCP37280|RNCP41809/);
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
  assert.equal(mba?.level, "bac+5");
  assert.equal(mba?.status, undefined);
  assert.match(mba?.certification, /Manager de la stratégie marketing digital, titre RNCP de niveau 7/);
  for (const path of ["app/a-propos/page.tsx", "lib/json-ld.ts", "public/profile.md", "public/llms.txt"]) {
    assert.match(read(path), /MBA Expert Marketing Digital/);
    assert.match(read(path), /bac\+5/);
    assert.match(read(path), /Manager de la stratégie marketing digital/);
    assert.doesNotMatch(read(path), /MBA Expert Marketing Digital obtenu|MBA obtenu|RNCP37280|RNCP41809/);
  }
});
