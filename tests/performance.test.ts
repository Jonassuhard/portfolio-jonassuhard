import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

test("les cartes utilisent une image responsive sans JavaScript client", () => {
  const component = read("app/project-card-image.tsx");
  const cardPages = [
    read("app/page.tsx"),
    read("app/recruteurs/page.tsx"),
    read("app/projets/page.tsx")
  ].join("\n");

  assert.match(component, /from "next\/image"/);
  assert.match(component, /sizes=/);
  assert.match(component, /preload=\{preload\}/);
  assert.match(read("app/projets/page.tsx"), /preload=\{groupIndex === 0 && projectIndex === 0\}/);
  assert.doesNotMatch(cardPages, /<img[^>]+src=\{project\.image\}/);
});

test("les optimisations de performance ne retirent aucune animation", () => {
  const controller = read("app/glitch-controller.tsx");
  const css = read("app/globals.css");

  assert.match(controller, /setInterval\(fireAll, 30000\)/);
  assert.match(controller, /querySelector<HTMLElement>\("\.title-text"\)/);
  assert.match(css, /@keyframes glitch-cyan/);
  assert.match(css, /@keyframes glitch-red/);
  assert.match(css, /@keyframes chroma-cyan/);
  assert.match(css, /will-change:transform,opacity/);
  assert.match(css, /@keyframes holo-diag/);
  assert.match(css, /@keyframes hero-bounce/);
});

test("les assets publics ont un cache long sans être figés", () => {
  const config = read("next.config.mjs");
  assert.match(config, /max-age=2592000, stale-while-revalidate=31536000/);
  assert.doesNotMatch(config, /assetCache[\s\S]*immutable/);
});
