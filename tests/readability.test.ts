import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import * as data from "../lib/projects";

const source = (path: string) => readFileSync(path, "utf8");

test("the project index starts with the featured trio without losing or duplicating projects", () => {
  const ordered = (data as typeof data & { orderedProjects?: typeof data.projects }).orderedProjects;
  assert.ok(ordered, "export a deterministic orderedProjects collection");
  assert.deepEqual(ordered.slice(0, 3).map((project) => project.slug), data.featuredProjects.map((project) => project.slug));
  assert.deepEqual(ordered.map((project) => project.slug).sort(), data.projects.map((project) => project.slug).sort());
  assert.match(source("app/projets/page.tsx"), /orderedProjects\.filter/);
});

test("product availability is not confused with access to private evidence", () => {
  assert.equal(data.evidenceLevelMeta.private.label, "Preuves privées");
  for (const path of ["app/page.tsx", "app/recruteurs/page.tsx", "app/projets/page.tsx"]) {
    assert.match(source(path), /project\.cardStatus \?\? project\.status/, path);
  }
});

test("home and recruiter intros provide a prominent CV before the projects", () => {
  for (const path of ["app/page.tsx", "app/recruteurs/page.tsx"]) {
    const page = source(path);
    assert.match(page, /className="button primary" href=\{site\.cvClassic\}/);
    assert.ok(page.indexOf("site.cvClassic") < page.indexOf('className="proof-grid"'));
  }
  assert.doesNotMatch(source("app/page.tsx"), /stats-panel/);
  const recruiter = source("app/recruteurs/page.tsx");
  assert.ok(recruiter.indexOf('id="projets-principaux"') < recruiter.indexOf('id="contribution"'));
});

test("project intent precedes galleries and technical details stay available on demand", () => {
  const page = source("app/projets/[slug]/page.tsx");
  assert.ok(page.indexOf('id="besoin"') < page.indexOf('id="galerie"'));
  assert.match(page, /<details className="technical-details"/);
  assert.match(page, /version\.limits/);
  assert.match(page, /project\.decisions/);
});

test("gallery enlargement has a native link fallback and accessible modal semantics", () => {
  assert.ok(existsSync("app/project-image.tsx"));
  const image = source("app/project-image.tsx");
  assert.match(image, /href=\{src\}/);
  assert.match(image, /<dialog/);
  assert.match(image, /aria-label=/);
  assert.match(image, /showModal\(/);
  assert.match(image, /onClose=/);
  assert.match(image, /event\.key !== "Tab"/);
  assert.match(image, /event\.shiftKey/);
  assert.match(image, /closeButton\.current\?\.focus\(/);
  assert.match(image, /originalLink\.current\?\.focus\(/);
  assert.match(source("app/projets/[slug]/project-story.tsx"), /ProjectImage/);
});

test("project cards keep a concise purpose and preserve the original maturity data", () => {
  for (const project of data.projects) {
    assert.ok((project.cardLine ?? project.summary).length <= 200, project.slug);
    assert.ok(project.roleSummary && project.roleSummary.length <= 180, project.slug);
    assert.ok(project.status && project.evidenceLevel && project.limits.length, project.slug);
  }
});

test("contact facts have a stacked mobile layout instead of narrow table labels", () => {
  assert.match(source("app/contact/page.tsx"), /<dl className="contact-facts"/);
  assert.match(source("app/globals.css"), /\.contact-facts/);
});
