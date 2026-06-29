# PORTFOLIO_PREUVES

MVP local du portfolio "site de preuves" de Jonas Suhard.

## Objectif

Portfolio recruteur-first et agent-readable de Jonas Suhard — **Builder IA appliquée & Growth Engineer** (marketing, web, automatisations LLM). Projets réels, décisions, contraintes, limites, markdown publics et données structurées.

## Lancer

```bash
npm install
npm run build
./node_modules/.bin/next start -p 3027
```

URL locale : `http://localhost:3027`

## Routes clés

- `/` : home proof-led.
- `/recruteurs` : lecture rapide pour recruteurs.
- `/projets` : index des preuves.
- `/projets/les-petites-griffes`
- `/projets/educool-la-herse`
- `/projets/capselys`
- `/projets/iscom`
- `/competences`
- `/a-propos`
- `/llms.txt`
- `/profile.md`
- `/profile.json`
- `/projects/*.md`

## Validation faite le 2026-06-27

- `npm run build` : OK, 13 pages générées.
- `npm audit --audit-level=moderate` : 0 vulnérabilité.
- Routes principales et fichiers publics : HTTP 200.
- Mobile CDP 390px : `scrollWidth=390`, `overflowCount=0`.
- Captures : `qa/screenshots/home-desktop.png`, `qa/screenshots/home-mobile-cdp.png`, `qa/screenshots/case-mobile-cdp.png`.

## Sources

- Préparation complète : `/Users/asterion/Desktop/SITE_PREUVES_PORTFOLIO_2026`.
- Journal de build (handoff, revue, plan, journaux) : `../05_SUIVI_BUILD/`.
- Assets repris : anciens visuels portfolio Paris Nuit.
- CV public : `public/cv.pdf`.

## Attention

Ce MVP ne remplace pas PF Nixie. Il sert de site pragmatique de preuves, publiable vite, que Claude pourra relire lundi sans repartir dans une cathédrale 3D. Ce serait dommage, même si très tentant.
