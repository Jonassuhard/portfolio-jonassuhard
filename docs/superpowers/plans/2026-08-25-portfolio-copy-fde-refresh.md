# Portfolio Copy and FDE Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réécrire le portfolio en français simple, intégrer la trajectoire Forward Deployed Engineer sans surpromesse et réaligner les preuves humaines et machine.

**Architecture:** `lib/projects.ts` porte le profil canonique et les données projet ; les pages JSX consomment ces champs ; le générateur produit les fiches Markdown et les JSON dérivés. Les miroirs manuels sont mis à jour dans le même lot et protégés par des tests de cohérence.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS natif, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-25-portfolio-copy-fde-refresh-design.md`

## Global Constraints

- `Forward Deployed Engineer` est un objectif, jamais `jobTitle`.
- Conserver toutes les limites factuelles et tous les statuts NO-GO.
- Ajouter uniquement des liens GitHub publics vérifiés.
- Ne pas modifier les PDF, ne pas commit, ne pas pousser et ne pas déployer.
- Conserver Archive Worldline, les typographies et les animations.

---

### Task 1: Contrats éditoriaux et baseline

**Files:**
- Modify: `tests/content.test.ts`
- Modify: `tests/seo.test.ts`
- Modify: `tests/performance.test.ts`

**Interfaces:**
- Consumes: `site`, `projects`, fichiers publics.
- Produces: contrats FDE, preuve et lisibilité utilisés par toutes les tâches suivantes.

- [x] Ajouter un test qui refuse `Forward Deployed Engineer` dans `site.title`, `site.headline` et `Person.jobTitle`.
- [x] Exiger la trajectoire FDE dans la home, la page recruteurs, `profile.json`, `profile.md`, `llms.txt` et la FAQ.
- [x] Exiger la limite familiale LPG sur les surfaces humaines et machine.
- [x] Exiger que les fiches Markdown générées n'utilisent plus les fragments `Type :`, `En bref :` ou `Preuves :`.
- [x] Exécuter `npm test` et constater les échecs attendus avant l'implémentation.

### Task 2: Positionnement et pages humaines

**Files:**
- Modify: `lib/projects.ts`
- Modify: `app/page.tsx`
- Modify: `app/recruteurs/page.tsx`
- Modify: `app/a-propos/page.tsx`
- Modify: `app/methode/page.tsx`
- Modify: `app/competences/page.tsx`
- Modify: `app/projets/page.tsx`
- Modify: `app/outils/decodeur-offre-ia/page.tsx`
- Modify: `lib/knowledge.ts`
- Modify: `lib/faq.ts`

**Interfaces:**
- Produces: `site.careerGoal`, `site.careerGoalShort` et textes humains alignés.

- [x] Ajouter les champs canoniques de trajectoire FDE à `site`.
- [x] Réécrire les introductions avec des verbes concrets et une intention visible.
- [x] Remplacer les formulations pompeuses et le jargon non expliqué.
- [x] Restaurer les limites effacées par le diff Freebuff.
- [x] Vérifier que les trois projets annoncés correspondent aux trois cartes réellement rendues.
- [x] Exécuter les tests ciblés de contenu et SEO.

### Task 3: Projets et liens publics

**Files:**
- Modify: `lib/projects.ts`
- Modify: `lib/verification.ts` seulement si une preuve fraîche change réellement le registre.

**Interfaces:**
- Consumes: dépôts publics vérifiés par GitHub et preuves locales datées.
- Produces: résumés simples, liens externes et statuts cohérents.

- [x] Vérifier la visibilité de Cortex Bridge, Educool V2, Capsélys, Battle Engine et claude-code-soul.
- [x] Ajouter les liens publics pertinents ; ne pas créer de lien pour V3, LPG, ISCOM ou Preuvia sans dépôt public prouvé.
- [x] Traduire les statuts V2/V3 en français courant avant les codes techniques.
- [x] Actualiser Battle Engine et Capsélys sans les faire passer pour des projets client en production.
- [x] Conserver les dates, preuves privées et limites de chaque projet.

### Task 4: Markdown, LLM et données structurées

**Files:**
- Modify: `scripts/generate-project-md.ts`
- Modify: `public/llms.txt`
- Modify: `public/profile.md`
- Modify: `public/profile.json`
- Modify: `public/skills.md`
- Modify: `public/cv.md`
- Modify: `lib/json-ld.ts`
- Regenerate: `public/projects/*.md`, `public/knowledge/*.md`, `public/claims.json`, `public/verification.json`
- Modify: `README.md`
- Modify: `ARCHITECTURE.md`

**Interfaces:**
- Consumes: données canoniques des Tasks 2 et 3.
- Produces: surfaces agents cohérentes et fiches Markdown lisibles.

- [x] Remplacer les métadonnées fragmentées par une section `Repères` lisible.
- [x] Réécrire `llms.txt` comme carte courte : profil actuel, objectif FDE, projets, preuves et liens.
- [x] Aligner profile, skills, claims et JSON-LD sans transformer l'objectif FDE en emploi actuel.
- [x] Restaurer `cv.md` au contenu des PDF existants pour éviter un CV à deux versions.
- [x] Corriger la documentation qui décrit à tort des fichiers manuels comme générés.
- [x] Lancer `npm run generate:md`, puis vérifier qu'un second lancement ne crée aucun diff supplémentaire.

### Task 5: Corrections responsive ciblées

**Files:**
- Modify: `app/globals.css`
- Modify: `app/nixie-clock.tsx` seulement pour conserver le placeholder SSR neutre déjà validé.
- Modify: `next.config.mjs` seulement si la redirection `www` est prouvée et couverte par un test ; sinon ne pas l'inclure dans ce lot.

**Interfaces:**
- Produces: header stable entre 641 et 960 px, consentement mobile compact, titres sans coupure maladroite.

- [x] Corriger la collision logo/navigation à 768 px.
- [x] Stabiliser la titlebar à 768 px.
- [x] Réduire l'emprise du bandeau Clarity à 375 px sans descendre sous 44 px par action.
- [x] Éviter la coupure `est- / il` sur le titre du décodeur.
- [x] Conserver le glitch, la réduction de mouvement et les dimensions stables.

### Task 6: Vérification complète et rapport

**Files:**
- Create: `docs/audits/2026-08-25-portfolio-copy-fde-report.md`

**Interfaces:**
- Consumes: build final local.
- Produces: preuves techniques, visuelles et liste des changements restant locaux.

- [x] Exécuter `npm run check`.
- [x] Exécuter `npm run build` et contrôler la fin du build.
- [x] Exécuter `npm run check:links:external`, `git diff --check` et `gitleaks detect --no-banner`.
- [x] Démarrer le build local sur un port libre et contrôler les 29 routes à 375, 768 et 1440 px.
- [x] Inspecter les 87 captures et corriger tout P1/P2 créé ou restant dans le périmètre.
- [x] Rejouer les vérifications après toute correction.
- [x] Écrire le rapport avec couverture, résultats, limites et état Git exact.
