# Prompts images cartes projets — DA « Archive Worldline »

> But : remplacer les plaques typographiques par 6 visuels cohérents, style archive scientifique vieillie + terminal vintage (Steins;Gate / nixie). **Format : 1600 × 900 px (16:9), WebP qualité ~82.** Destination : `public/assets/cards/<slug>.webp` (mêmes noms → zéro changement de code).
> Chaque visuel = un **artefact d'archive / schéma technique** évoquant le domaine du projet, PAS un screenshot ni une illustration décorative. Aucun texte lisible, aucun visage, aucun logo, aucune couleur vive.

## STYLE COMMUN (à préfixer à chaque prompt)

```
Aged scientific archive plate meets 1980s vintage computer terminal aesthetic.
Strict duotone palette: deep ink black (#15120e) and aged cream paper (#eee8d8),
with ONE single restrained accent of warm nixie-tube orange (#ff7a18) glowing softly
on a single element only. Heavy fine film grain, subtle halftone dithering, faint
technical blueprint grid lines, light paper foxing and vignette, slight CRT scanline
texture. Hand-drafted technical-diagram / engraving / oscilloscope feel. Muted,
desaturated, archival, retro-futurist, quiet and serious. Flat composition, generous
negative space, centered focal motif with margins. 16:9, 1600x900.
NEGATIVE: no text, no letters, no numbers, no logos, no watermark, no human face,
no people, no kawaii/anime, no bright saturated colors, no rainbow, no 3D render
glossiness, no stock-photo look, no UI screenshot.
```

## PROMPTS PAR PROJET

### les-petites-griffes.webp — site client + CMS + assistant IA (prothésie ongulaire)
```
[STYLE COMMUN] + Subject: an antique anatomical/botanical engraving plate of an
elegant manicured hand and a few nail-care instruments (file, brush, lacquer vial)
arranged like specimens in a vintage scientific catalogue, fine cross-hatching,
labelled-specimen layout (labels blank/illegible). One lacquer vial glows faint
nixie orange. Evokes a small artisan studio turned into a structured digital system.
```

### educool.webp — application scolaire (classe, Firebase, PDF, sécurité données)
```
[STYLE COMMUN] + Subject: a vintage technical diagram of a school progress ledger /
abacus / pupil-tracking chart, combined with a small engraved padlock-and-key motif
representing data protection of minors. Old classroom-register engraving energy,
neat ruled columns (content blank), a single key glowing faint nixie orange.
Evokes a real classroom tool built with care for sensitive data.
```

### capselys.webp — conversion + expérimentation IA (staging, workshop)
```
[STYLE COMMUN] + Subject: a vintage laboratory schematic of a conversion funnel
crossed with an oscilloscope curve and an A/B experiment apparatus (two flasks,
a measuring dial). Scientific-instrument engraving, plotted curve rising, one dial
needle glowing faint nixie orange. Evokes measured marketing experimentation,
not magic — rigor over hype.
```

### iscom.webp — SEO + Drupal + production éditoriale
```
[STYLE COMMUN] + Subject: a vintage engraving of an old printing press and a
typographic galley / metal type case, connected to a faint network-of-nodes diagram
representing internal linking and indexed pages. Editorial-archive feel, interlinked
nodes drawn as a constellation, one central node glowing faint nixie orange.
Evokes structured editorial production at scale with human validation.
```

### battle-engine.webp — pipeline vidéo automatisé (Godot, Python, FFmpeg)
```
[STYLE COMMUN] + Subject: a vintage technical schematic of a film-reel and audio
waveform feeding a render/automation pipeline drawn as connected mechanical blocks
and gears, like an old cinema-projection engineering blueprint. Flow arrows between
modules, one waveform segment glowing faint nixie orange. Evokes an automated
creative production pipeline.
```

### hoopsphere.webp — app mobile basket + moteur OCR (Firebase)
```
[STYLE COMMUN] + Subject: a vintage blueprint of a basketball half-court with
overlaid shot-trajectory arcs and a faint scanned scoresheet grid (OCR motif:
a magnifier reading a ruled stat table, cells blank). Sports-engineering drafting
feel, one trajectory arc glowing faint nixie orange. Evokes a scouting app with a
homemade OCR engine.
```

## Après génération
- Vérifier 1600×900, recadrage propre (motif centré, marges).
- Convertir en WebP q~82, écraser `public/assets/cards/<slug>.webp`.
- Aucun changement de code requis (chemins identiques).
