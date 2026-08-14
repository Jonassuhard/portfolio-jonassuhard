# Récupération des audits et plans du portfolio

Date : 14 août 2026

## Verdict

Le code du portfolio et son historique Git sont récupérés. Les anciens documents annoncés le 2 juillet 2026 ne sont plus présents comme fichiers complets. Seuls leurs résumés, extraits de conversation et preuves d'existence sont récupérables. Leur contenu détaillé ne doit pas être reconstitué par supposition.

## Sources retrouvées

- `/Users/asterion/.codex/attachments/4a3c2364-ee03-43e4-b5f8-8e9b252b5e7d/pasted-text.txt` annonce `PLAN_EXECUTION_SITE_2026-07-02.md` : 322 lignes, 20 sections, 24 réécritures, 12 projets, `llms.txt` v2, knowledge graph, 8 commits et roadmap 7/30/90. Il annonce aussi sept audits dans `_AUDITS_FABLE_2026-07-02/`.
- `/Users/asterion/.codex/attachments/389d3a0d-ab8c-45ea-9c66-3bda1a135774/pasted-text.txt` annonce `AUDIT_CLAUDE_SITE_PLAN.md` : 434 lignes, 81 constats, 26 P0/P1 et trois P0 silencieux.
- `/Users/asterion/.codex/attachments/43a5167c-c375-4e61-83ac-b630b0b9f3e6/pasted-text.txt` contient la demande d'audit originale et le résumé du premier passage.
- `/Volumes/Projet DJO/Archive_Mac_2026/claude-projects-backup/-Users-asterion-Desktop-SITE-PREUVES-PORTFOLIO-2026-PORTFOLIO-PREUVES/e6ccd365-a59b-4534-960f-18c97b01a2e6.jsonl` conserve les traces de session, mais pas les corps complets des huit fichiers annoncés.

## Éléments non récupérables

- Corps intégral de `PLAN_EXECUTION_SITE_2026-07-02.md`.
- Corps intégral de `AUDIT_CLAUDE_SITE_PLAN.md`.
- Corps intégraux des sept fichiers de `_AUDITS_FABLE_2026-07-02/`.
- Correspondance exacte entre les 81 constats et les modifications ensuite commitées.

Statut : **perte documentaire confirmée, pas perte de code**.

## État canonique rétabli

- Dépôt récupéré : `/Users/asterion/Documents/Codex/2026-08-07/je-veux-que-tu-transcrive-toute/portfolio-jonassuhard`.
- Worktree canonique restauré : `/Users/asterion/Desktop/SITE_PREUVES_PORTFOLIO_2026/PORTFOLIO_PREUVES`.
- Branche d'exécution : `refactor/archive-worldline-light`.
- Base conservée : `feat/ai-job-decoder` à `7c2c812`, afin de ne pas perdre le décodeur d'offres.
- Source UI actuelle : `app/globals.css`, `app/layout.tsx`, composants sous `app/` et données sous `lib/`.
- Source visuelle canonique : `DESIGN.md` remis au format Design.md.
- Nouveau plan : `docs/superpowers/plans/2026-08-14-portfolio-light-refresh.md`.

## Baseline fraîche

- `npm run check` : 57 tests, zéro échec, contenu et liens internes valides.
- `npm run build` : Next.js 16.2.9, 37 pages générées, zéro erreur.
- Production : aucun débordement horizontal constaté à 375, 768 et 1440 px.
- Lighthouse mobile production : performance 91, accessibilité 100, bonnes pratiques 100, SEO 100 ; LCP 2,3 s, TBT 20 ms, CLS 0,018.
- Ressources dominantes : JavaScript 170 Ko et polices 155 Ko environ.

## Règle de reprise

Toute future affirmation issue des anciens audits doit être reliée à une source encore lisible, à un commit, à un test ou à une mesure fraîche. Les nombres annoncés sans corps récupérable restent des indices historiques, pas des exigences normatives.
