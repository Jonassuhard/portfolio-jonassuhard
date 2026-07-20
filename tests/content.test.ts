import assert from "node:assert/strict";
import test from "node:test";
import { knowledgePages } from "../lib/knowledge";
import { featuredProjects, projects, recruiterFeatured, site } from "../lib/projects";
import { verificationItems } from "../lib/verification";

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

test("les liens externes incohérents restent masqués jusqu'à leur mise à jour", () => {
  assert.equal(site.malt, null);
});

test("les dates de publication et de modification des articles restent distinctes", () => {
  for (const page of knowledgePages) {
    assert.ok(page.published <= page.updated, `${page.slug} a une date incohérente`);
  }
});

test("les galeries réservent leurs dimensions intrinsèques", () => {
  for (const image of projects.flatMap((project) => project.gallery ?? [])) {
    assert.ok(image.width > 0 && image.height > 0, `${image.src} n'a pas de dimensions`);
  }
});

test("le registre ne revendique pas de dépôt GitHub privé invérifiable", () => {
  const item = verificationItems.find((claim) => claim.id === "non-public-projects");
  assert.ok(item);
  assert.doesNotMatch(item.claim, /dépôts? GitHub|repositories/i);
});
