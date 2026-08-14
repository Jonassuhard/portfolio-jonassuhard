import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeGraphJsonLd, rootJsonLd } from "../lib/json-ld";

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
