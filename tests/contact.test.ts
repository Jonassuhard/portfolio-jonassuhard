import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import sitemap from "../app/sitemap";

const read = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

test("la page contact sépare recrutement et projet sans collecter de données", () => {
  const contact = read("app/contact/page.tsx");

  assert.match(contact, /path: "\/contact"/);
  assert.match(contact, /Recrutement CDI/);
  assert.match(contact, /Projet ponctuel/);
  assert.match(contact, /site\.cvClassic/);
  assert.match(contact, /site\.linkedin/);
  assert.match(contact, /site\.malt/);
  assert.match(contact, /mailto:\$\{site\.email\}/);
  assert.doesNotMatch(contact, /<form\b/);
});

test("la route contact est découvrable depuis le site et le sitemap", () => {
  const nav = read("app/site-nav.tsx");
  const layout = read("app/layout.tsx");
  const linkChecker = read("scripts/check-links.ts");
  const contactEntry = sitemap().find(
    (entry) => entry.url === "https://jonassuhard.com/contact"
  );

  assert.match(nav, /href="\/contact"/);
  assert.match(layout, /<Link href="\/contact">/);
  assert.match(linkChecker, /"\/contact"/);
  assert.ok(contactEntry, "La route /contact est absente du sitemap");
  assert.equal(
    new Date(contactEntry.lastModified ?? 0).toISOString(),
    "2026-08-31T00:00:00.000Z"
  );
});
