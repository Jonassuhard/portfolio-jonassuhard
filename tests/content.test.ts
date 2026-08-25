import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
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

test("Cortex Bridge remplace ISCOM dans les sélections de trois projets", () => {
  assert.deepEqual(
    featuredProjects.map((project) => project.slug),
    ["cortex-bridge", "les-petites-griffes", "educool-la-herse"]
  );
  assert.deepEqual(
    recruiterFeatured.map((project) => project.slug),
    ["cortex-bridge", "les-petites-griffes", "preuvia"]
  );
  assert.equal(featuredProjects.some((project) => project.slug === "iscom"), false);
  assert.equal(recruiterFeatured.some((project) => project.slug === "iscom"), false);
  assert.ok(projects.some((project) => project.slug === "iscom"));
});

test("Cortex Bridge reste une preuve logicielle publique et qualifiée", () => {
  const cortex = projects.find((project) => project.slug === "cortex-bridge");
  const release = verificationItems.find(
    (claim) => claim.id === "cortex-bridge-release-0-5-2"
  );

  assert.ok(cortex);
  assert.equal(cortex.evidenceLevel, "public");
  assert.ok(cortex.stack.includes("Next.js"));
  assert.match(cortex.evidenceNote ?? "", /434 tests backend/);
  assert.ok(release);
  assert.equal(release.status, "publicly-verified");
  assert.equal(release.checkedAt, "2026-08-22");
  assert.equal(
    release.sourceHref,
    "https://github.com/Jonassuhard/cortex-bridge/blob/64af9ce1e88dea8404acb11893eb96d75dd1baaa/docs/verification/v0.5.2.json"
  );
  assert.match(release.note, /ne prouve pas une compatibilité continue/i);
});

test("Cool Bank / La Herse expose séparément les versions V2 et V3", () => {
  const project = projects.find((item) => item.slug === "educool-la-herse") as
    | ((typeof projects)[number] & {
        versions?: Array<{ label: string; status: string }>;
      })
    | undefined;
  const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
  const markdown = readFileSync(
    new URL("../public/projects/educool-la-herse.md", import.meta.url),
    "utf8"
  );
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const machineProject = profile.projects.find(
    (item: { project: string }) => item.project === "Cool Bank / La Herse"
  );

  assert.ok(project);
  assert.equal(project.shortTitle, "Cool Bank / La Herse");
  assert.deepEqual(project.versions?.map((version) => version.label), ["V2", "V3"]);
  assert.match(project.versions?.[0].status ?? "", /LOCAL_SINGLE_DEVICE_READY/);
  assert.match(project.versions?.[1].status ?? "", /READY_FOR_HUMAN_RECIPE/);
  assert.match(llms, /Cortex Bridge/);
  assert.match(llms, /Cool Bank \/ La Herse/);
  assert.match(llms, /V2[^\n]*LOCAL_SINGLE_DEVICE_READY/);
  assert.match(llms, /V3[^\n]*READY_FOR_HUMAN_RECIPE/);
  assert.match(markdown, /## Versions[\s\S]*### V2[\s\S]*### V3/);
  assert.equal(machineProject.versions.length, 2);
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

test("les projets secondaires utilisent une preuve courte sans perdre leur détail", () => {
  const page = readFileSync(new URL("../app/projets/page.tsx", import.meta.url), "utf8");

  assert.match(
    page,
    /group\.tier === 1\s*\? project\.summary\s*:\s*project\.cardLine \?\? project\.proofLine \?\? project\.summary/
  );
  assert.match(page, /group\.tier === 1 \? "case-grid" : "case-grid case-grid-compact"/);
});

test("la source machine qualifie l'audit LPG comme preuve privée", () => {
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const fact = profile.citable_facts.les_petites_griffes_live_audit_2026_08_01;
  const project = profile.projects.find(
    (item: { project: string }) => item.project === "Les Petites Griffes"
  );

  assert.equal(fact.status, "private-evidence");
  assert.equal(fact.verification_id, "lpg-live-audit-2026-08-01");
  assert.equal(project.evidence_status, "private-evidence");
  assert.equal(project.verification_id, "lpg-live-audit-2026-08-01");
});

test("la limite LPG reste explicite sur les surfaces humaine et machine", () => {
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const project = projects.find((item) => item.slug === "les-petites-griffes");
  const machineProject = profile.projects.find(
    (item: { project: string }) => item.project === "Les Petites Griffes"
  );
  const surfaces = [
    project?.limits.join("\n") ?? "",
    profile.citable_facts.les_petites_griffes_limit,
    machineProject?.limits ?? "",
    readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8"),
    readFileSync(new URL("../public/profile.md", import.meta.url), "utf8"),
    readFileSync(new URL("../public/projects/les-petites-griffes.md", import.meta.url), "utf8")
  ];

  for (const surface of surfaces) {
    assert.match(surface, /projet familial non factur[ée]/i);
  }
});

test("les fiches Markdown générées évitent les libellés décoratifs", () => {
  const projectDir = new URL("../public/projects/", import.meta.url);
  const markdownFiles = readdirSync(projectDir).filter((file) => file.endsWith(".md"));

  assert.ok(markdownFiles.length > 0);
  for (const file of markdownFiles) {
    const markdown = readFileSync(new URL(`../public/projects/${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(markdown, /^(?:Type|En bref|Preuves)\s*:/m, file);
  }
});

test("la source machine rattache Cortex Bridge à ses preuves publiques", () => {
  const profile = JSON.parse(
    readFileSync(new URL("../public/profile.json", import.meta.url), "utf8")
  );
  const fact = profile.citable_facts.cortex_bridge_release_0_5_2;
  const project = profile.projects.find(
    (item: { project: string }) => item.project === "Cortex Bridge"
  );

  assert.equal(fact.status, "publicly-verified");
  assert.equal(fact.verification_id, "cortex-bridge-release-0-5-2");
  assert.deepEqual(project.verification_ids, [
    "cortex-bridge-repo",
    "cortex-bridge-release-0-5-2"
  ]);
});
