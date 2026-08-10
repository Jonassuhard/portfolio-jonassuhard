import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import fixtures from "../lib/job-decoder-contract/job-decoder-cases.json";
import { decodeJobOffer, normalizeOfferText } from "../lib/job-decoder";


test("le contrat partagé contient un corpus d'évaluation substantiel", () => {
  assert.ok(fixtures.length >= 20);
});

for (const fixture of fixtures) {
  test(`décode ${fixture.id}`, () => {
    const result = decodeJobOffer(fixture.title, fixture.description);
    for (const [key, expected] of Object.entries(fixture.expected)) {
      if (key === "seniority") assert.equal(result.seniority, expected);
      else assert.equal(result.axes[key as keyof typeof result.axes].value, expected);
    }
  });
}

test("le moteur est déterministe et borne ses extraits", () => {
  const description = "Déployer des workflows RAG chez les clients. ".repeat(12);
  const first = decodeJobOffer("Consultant IA", description);
  const second = decodeJobOffer("Consultant IA", description);

  assert.deepEqual(first, second);
  assert.ok(first.axes.relation.citations.length <= 3);
  assert.ok(first.axes.relation.citations.every((citation) => citation.length <= 220));
});

test("un terme IA générique ne produit pas un verdict fort", () => {
  const result = decodeJobOffer("Marketing Manager AI", "AI is part of our culture.");

  assert.equal(result.axes.relation.value, "unknown");
  assert.equal(result.axes.relation.confidence, "insufficient");
});

test("la normalisation retire le balisage et les caractères invisibles", () => {
  assert.equal(normalizeOfferText("<p>RAG\u200b   client</p>"), "RAG client");
});

test("le composant client ne transmet ni ne conserve le texte de l'offre", () => {
  const source = readFileSync("app/outils/decodeur-offre-ia/job-decoder-client.tsx", "utf8");

  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|dangerouslySetInnerHTML/);
  assert.match(source, /data-clarity-mask="true"/);
});
