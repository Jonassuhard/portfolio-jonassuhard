import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { verificationItems } from "../lib/verification";
import { projects } from "../lib/projects";

const read = (path: string) => readFileSync(path, "utf8");

test("la methode reste courte et sans promesse de securite absolue", () => {
  const page = read("app/methode/page.tsx");
  assert.equal((page.match(/kicker: "/g) ?? []).length, 4);
  assert.doesNotMatch(page, /avant chaque envoi|rien de réel|confirmation forte/);
  assert.match(page, /données fictives/);
});

test("les preuves conservent sources, dates et limites dans des details natifs", () => {
  const page = read("app/preuves/page.tsx");
  assert.match(page, /<details className="verification-item"/);
  for (const field of ["item.claim", "item.note", "item.checkedAt", "item.sourceHref"]) {
    assert.ok(page.includes(field), field);
  }
  for (const item of verificationItems) assert.ok(page.includes('"' + item.id + '"'), item.id);
  assert.ok(read("app/globals.css").includes(".faq-item[open] > summary::after"));
});

test("Cool Bank distingue la lecture recente des essais historiques", () => {
  const item = verificationItems.find((item) => item.id === "cool-bank-la-herse-versions");
  assert.equal(item?.checkedAt, "2026-09-09");
  assert.match(item?.note ?? "", /Aucune nouvelle exécution/);
  const v3 = projects.find((project) => project.slug === "educool-la-herse")?.versions?.[1];
  assert.match(v3?.publicStatus ?? "", /validation technique/);
  assert.match(v3?.status ?? "", /objectif, pas un statut actuel/);
  const profile = JSON.parse(read("public/profile.json"));
  assert.equal(profile.citable_facts.cool_bank_la_herse_versions.checked_at, "2026-09-09");
});
