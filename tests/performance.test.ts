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
  const layout = read("app/layout.tsx");
  const title = read("app/animated-title.tsx");
  const css = read("app/globals.css");

  assert.doesNotMatch(layout, /Newsreader|IBM_Plex_Mono|GlitchController/);
  assert.match(title, /data-text=\{children\}/);
  assert.equal((title.match(/className="title-text"/g) ?? []).length, 1);
  assert.doesNotMatch(title, /chroma-layer/);
  assert.match(css, /\.chroma-title::before/);
  assert.match(css, /\.chroma-title::after/);
  assert.match(css, /@keyframes glitch-cyan-cycle/);
  assert.match(css, /@keyframes glitch-red-cycle/);
  assert.match(css, /@keyframes chroma-cyan/);
  assert.match(css, /prefers-reduced-motion:reduce[\s\S]*\.chroma-title::before/);
  assert.match(css, /@keyframes holo-diag/);
  assert.match(css, /@keyframes hero-bounce/);
});

test("les assets publics ont un cache long sans être figés", () => {
  const config = read("next.config.mjs");
  assert.match(config, /max-age=2592000, stale-while-revalidate=31536000/);
  assert.doesNotMatch(config, /assetCache[\s\S]*immutable/);
});

test("les médias projet réservent leur espace et respectent le mouvement réduit", () => {
  const detailPage = read("app/projets/[slug]/page.tsx");
  const video = read("app/project-video.tsx");

  assert.match(detailPage, /width=\{shot\.width\}/);
  assert.match(detailPage, /height=\{shot\.height\}/);
  assert.match(video, /prefers-reduced-motion: reduce/);
  assert.match(video, /controls/);
  assert.doesNotMatch(detailPage, /<img src=\{shot\.src\}/);
});
