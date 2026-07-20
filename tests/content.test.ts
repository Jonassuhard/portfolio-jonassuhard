import assert from "node:assert/strict";
import test from "node:test";
import { featuredProjects, projects, recruiterFeatured } from "../lib/projects";

test("les slugs et liens de projet sont uniques", () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    const hrefs = project.links.map((link) => link.href);
    assert.equal(new Set(hrefs).size, hrefs.length, `Liens dupliqués pour ${project.slug}`);
  }
});

test("un projet publiquement vérifiable expose une source externe", () => {
  for (const project of projects.filter((item) => item.evidenceLevel === "public")) {
    assert.ok(
      project.links.some((link) => link.external && link.href.startsWith("https://")),
      `${project.slug} n'a pas de source publique`
    );
  }
});

test("les sélections recruteur ne contiennent que des projets principaux", () => {
  for (const project of [...featuredProjects, ...recruiterFeatured]) {
    assert.equal(project.tier, 1, `${project.slug} n'est pas un projet principal`);
  }
});

test("aucun projet privé ne se présente comme copie publique", () => {
  for (const project of projects.filter((item) => item.evidenceLevel !== "public")) {
    assert.doesNotMatch(project.status, /copie publique/i);
  }
});
