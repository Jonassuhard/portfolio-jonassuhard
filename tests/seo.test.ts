import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeGraphJsonLd, personJsonLd, rootJsonLd } from "../lib/json-ld";
import { site } from "../lib/projects";

const read = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

test("le layout injecte seulement Person et WebSite", () => {
  const root = rootJsonLd();
  const types = root["@graph"].map((node) => node["@type"]);

  assert.deepEqual(types, ["Person", "WebSite"]);

  const layout = read("app/layout.tsx");
  assert.match(layout, /import \{ rootJsonLd \} from "@\/lib\/json-ld"/);
  assert.match(layout, /JSON\.stringify\(rootJsonLd\(\)\)/);
  assert.match(
    layout,
    /<link rel="alternate" type="application\/ld\+json" href="\/knowledge-graph\.json" \/>/
  );
  assert.doesNotMatch(layout, /knowledgeGraphJsonLd/);
});

test("le graphe public conserve les projets et compétences", () => {
  const full = knowledgeGraphJsonLd();
  const types = full["@graph"].map((node) => node?.["@type"]);

  assert.ok(types.includes("Person"));
  assert.ok(types.includes("WebSite"));
  assert.ok(types.includes("DefinedTerm"));
  assert.ok(types.includes("SoftwareSourceCode") || types.includes("CreativeWork"));
  assert.ok(full["@graph"].length > rootJsonLd()["@graph"].length);
});

test("le positionnement Growth Engineer reste cohérent sur les surfaces humaines et machine", () => {
  const identity = site as typeof site & {
    seoTitle?: string;
    headline?: string;
    roleAliases?: readonly string[];
  };
  const expectedSeoTitle = "Growth Engineer IA & automatisation à Paris | Jonas Suhard";
  const expectedHeadline = "Growth Engineer junior · IA appliquée & automatisation";
  const expectedAliases = ["Product Builder IA", "Chef de projet IA junior"];
  const profile = JSON.parse(read("public/profile.json"));
  const llms = read("public/llms.txt");
  const profileMarkdown = read("public/profile.md");
  const cv = read("public/cv.md");
  const growthKnowledge = read("public/knowledge/growth-engineer-ia.md");
  const home = read("app/page.tsx");
  const recruiters = read("app/recruteurs/page.tsx");
  const layout = read("app/layout.tsx");

  assert.equal(identity.title, "Growth Engineer junior");
  assert.equal(identity.seoTitle, expectedSeoTitle);
  assert.ok(expectedSeoTitle.length >= 50 && expectedSeoTitle.length <= 60);
  assert.ok(site.description.length >= 145 && site.description.length <= 160);
  assert.equal(identity.headline, expectedHeadline);
  assert.deepEqual(identity.roleAliases, expectedAliases);
  assert.equal(personJsonLd().jobTitle, "Growth Engineer junior");

  assert.equal(profile.title, "Growth Engineer junior");
  assert.deepEqual(profile.role_aliases, expectedAliases);
  assert.match(llms, /^> Growth Engineer junior, basé à Paris\./m);
  assert.match(profileMarkdown, /^Growth Engineer junior — IA appliquée & automatisation\./m);
  assert.match(cv, /^\*\*Growth Engineer junior · IA appliquée & automatisation\*\*$/m);
  assert.match(growthKnowledge, /^Dernière vérification : 2026-08-23\.$/m);

  assert.match(home, /\{site\.headline\}/);
  assert.match(home, /\{site\.roleAliases\.join\(" · "\)\}/);
  assert.match(recruiters, /\{site\.headline\}/);
  assert.match(recruiters, /\{site\.roleAliases\.join\(" · "\)\}/);
  assert.match(layout, /default: site\.seoTitle/);
  assert.match(layout, /title: site\.seoTitle/);
});
