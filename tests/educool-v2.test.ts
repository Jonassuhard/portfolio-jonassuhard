import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { projects, featuredProjects } from "../lib/projects";

test("Educool V2 has its own teacher case study, separate from Cool Bank", () => {
  const project = projects.find(({ slug }) => slug === "educool-v2");
  assert.ok(project);
  assert.ok(projects.find(({ slug }) => slug === "educool-la-herse"));
  assert.equal(project.evidenceLevel, "private");
  assert.equal(project.fullColorMedia, true);
  assert.ok((project.gallery?.length ?? 0) >= 3);
  assert.match(project.repoStatus ?? "", /privé/);
  assert.deepEqual(featuredProjects.map(({ slug }) => slug), ["job-radar", "cortex-bridge", "les-petites-griffes"]);
  for (const file of ["llms.txt", "profile.md", "profile.json"]) {
    assert.match(readFileSync(new URL(`../public/${file}`, import.meta.url), "utf8"), /educool-v2/);
  }
});
