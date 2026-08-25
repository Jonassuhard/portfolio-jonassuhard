# Rapport de remise à niveau du portfolio

> Ce rapport décrit le lot éditorial contrôlé avant le commit visuel. Pour l'état actuel du fond technique, du glitch et des performances, voir le [rapport blueprint et glitch du 25 août 2026](2026-08-25-portfolio-blueprint-glitch-report.md).

Date : 25 août 2026

Cible auditée : build local de `jonassuhard.com`

Branche : `master`

Point de départ Git : `ef9c30e`

État au moment de l'audit : modifications locales, avant commit et déploiement

## Verdict

Le portfolio est cohérent et exploitable localement après la remise à niveau. Les textes principaux sont plus directs, l'objectif de progression vers un rôle de Forward Deployed Engineer est explicite sans devenir un faux poste actuel, et les pages machine reprennent les mêmes faits que les pages humaines.

Les contrôles techniques passent. Les 29 routes ont été rendues à 375, 768 et 1440 px, soit 87 captures réelles. Aucun statut en erreur, débordement horizontal, chevauchement du header, échec d'image ou erreur JavaScript n'a été relevé.

## Plan exécuté

1. Reprendre la source canonique des projets et les modifications laissées par Freebuff.
2. Vérifier les statuts de projets sur le Mac, les volumes externes et GitHub.
3. Réécrire les pages humaines avec des phrases courtes et des intentions concrètes.
4. Ajouter la trajectoire Forward Deployed Engineer comme objectif, jamais comme poste actuel.
5. Mettre à jour `llms.txt`, le profil structuré, les compétences, les faits citables et les fiches Markdown.
6. Corriger les défauts responsive repérés à 768 px et sur mobile.
7. Régénérer les fichiers dérivés et vérifier l'idempotence.
8. Lancer les tests, le build, les liens, la recherche de secrets et Lighthouse.
9. Auditer visuellement chaque route sur trois viewports.

## Sources contrôlées

- Source projet : `lib/projects.ts`.
- Cool Bank V2 : registre du volume externe `/Volumes/COOL_BANK_V2_MASTER/COOL_BANK_V2/PRIMER.md`.
- Cool Bank V3 : registres locaux de recette et de tests, conservés comme preuves privées.
- Cortex Bridge : dépôt public et preuve de release v0.5.2 datée du 22 août 2026.
- Battle Engine : état local récent du pipeline, sans transformer le dépôt privé en preuve publique.
- GitHub : visibilité des dépôts vérifiée avant ajout des liens.

## GitHub

| Dépôt | Visibilité vérifiée | Décision |
| --- | --- | --- |
| `Jonassuhard/portfolio-jonassuhard` | Public | Ajouté dans `llms.txt` et `profile.md` |
| `Jonassuhard/cortex-bridge` | Public | Conservé comme preuve publique principale |
| `Jonassuhard/claude-code-soul` | Public | Ajouté dans la section de code public |
| `Jonassuhard/educool-v2` | Privé | Aucun faux lien public |
| Dépôts Capsélys | Privés | Aucun faux lien public |
| `Jonassuhard/battle-engine` | Privé | Aucun faux lien public |

## Changements éditoriaux

- La home explique désormais directement l'origine marketing, l'apprentissage du code et ce que Jonas construit.
- La page recruteurs décrit le travail attendu sans formules comme « signal pour une équipe » ou « sans survendre ».
- Les fiches projet répondent dans le même ordre à trois questions : à quoi ça sert, ce que Jonas a fait, ce que cela prouve.
- Les titres de sections ont été simplifiés : « Ce que j'ai livré », « Ce qui fonctionne aujourd'hui », « Ce qui n'est pas encore mesuré ».
- Les termes non expliqués comme « exécuteur borné », « re-testable », « retrieval augmenté » et « CIO déterministe » ont été retirés des résumés publics.
- Les limites factuelles de chaque projet sont conservées, notamment le caractère familial et non facturé des Petites Griffes.

## Positionnement FDE

- Poste actuel conservé : `Growth Engineer junior`.
- Objectif affiché : évoluer vers un rôle de `Forward Deployed Engineer`.
- Formulation commune : comprendre un besoin concret, construire avec l'équipe ou le client, tester la solution et la rendre facile à reprendre.
- `Forward Deployed Engineer` n'apparaît pas dans `jobTitle`, le titre SEO ou le headline actuel.

## Projets mis à jour

- Cortex Bridge : release publique v0.5.2, code MIT, limites du transport ChatGPT et résultats de tests conservés.
- Cool Bank / La Herse : V2 et V3 séparées. La V2 reste `LOCAL_SINGLE_DEVICE_READY : GO`, avec `V2_PRODUCT_COMPLETE` et `ONLINE_READY : NO-GO`. La V3 reste `READY_FOR_HUMAN_RECIPE`, sans revendiquer `GO_PILOTE_LOCAL`.
- Les Petites Griffes : site familial en production, audit privé daté, aucune vente externe revendiquée.
- Battle Engine : pipeline récent décrit sans présenter le dépôt privé comme public.
- RAG Starter Kit et Board IA PME : explications remplacées par des phrases compréhensibles sans connaître le jargon interne.
- ISCOM reste présent dans l'index, mais n'est pas remis dans les trois projets principaux.

## Surfaces machine

- `public/llms.txt` distingue le profil actuel de l'objectif FDE.
- Cortex Bridge et les statuts explicites de Cool Bank V2/V3 sont présents.
- Une section `Code public` référence seulement les trois dépôts réellement publics.
- `profile.md`, `profile.json`, `claims.json`, `skills.md` et le JSON-LD sont alignés.
- Les 13 fiches projet et les 5 pages knowledge sont régénérées depuis leurs sources.
- Deux générations successives produisent le même SHA-256 de diff : `33b9ac6f575305b3b22dc4eb53842a02157910136fd07097abd5465b24dd57e7`.

## Audit page par page

| Route | 375 px | 768 px | 1440 px | Contrôle principal |
| --- | --- | --- | --- | --- |
| `/` | OK | OK | OK | Hero, projets principaux, CTA, consentement |
| `/recruteurs` | OK | OK | OK | Positionnement, cartes, FAQ, reprise par l'équipe |
| `/projets` | OK | OK | OK | Hiérarchie des trois niveaux de projets |
| `/competences` | OK | OK | OK | Groupes de compétences et preuves associées |
| `/methode` | OK | OK | OK | Étapes de travail et lisibilité des listes |
| `/preuves` | OK | OK | OK | Registre, badges et limites |
| `/a-propos` | OK | OK | OK | Portrait, parcours et CTA |
| `/knowledge` | OK | OK | OK | Grille des contenus citables |
| `/outils/decodeur-offre-ia` | OK | OK | OK | Titre sans coupure, formulaire et résultat |
| `/mentions-legales` | OK | OK | OK | Lisibilité du texte légal |
| `/confidentialite` | OK | OK | OK | Lisibilité, sections et consentement |
| `/projets/les-petites-griffes` | OK | OK | OK | Preuves visuelles et limite familiale |
| `/projets/educool-la-herse` | OK | OK | OK | Séparation V2/V3 et tableaux |
| `/projets/capselys` | OK | OK | OK | Galerie et limites du staging |
| `/projets/iscom` | OK | OK | OK | Projet visible sans être remis en avant |
| `/projets/preuvia` | OK | OK | OK | Promesse, méthode et absence de garantie |
| `/projets/cortex-bridge` | OK | OK | OK | Preuves publiques, liens et limites |
| `/projets/battle-engine` | OK | OK | OK | Vidéo, galerie et statut secondaire |
| `/projets/hoopsphere` | OK | OK | OK | Part de Jonas et limites du projet MBA |
| `/projets/rag-starter-kit` | OK | OK | OK | Explication simple et statut privé |
| `/projets/board-ia-pme` | OK | OK | OK | Explication des agents et statut POC |
| `/projets/edusemantix` | OK | OK | OK | Mécanique de jeu et limites |
| `/projets/pokemon-gen4-toolkit` | OK | OK | OK | Outil d'exploration et statut archive |
| `/projets/claude-code-soul` | OK | OK | OK | Dépôt public et livrables |
| `/knowledge/llms-txt-portfolio` | OK | OK | OK | Article, encadré et sources |
| `/knowledge/playwright-audit-visuel` | OK | OK | OK | Article et preuves de méthode |
| `/knowledge/growth-engineer-ia` | OK | OK | OK | Définition du rôle actuel |
| `/knowledge/claude-code-mcp-workflow` | OK | OK | OK | Structure longue et encadré latéral |
| `/knowledge/memoire-agent-markdown` | OK | OK | OK | Structure longue et lisibilité mobile |

Captures et résultats : `/tmp/portfolio-visual-audit-final-2026-08-25/` (59 Mo). Le script a réellement fait défiler les pages, puis a forcé le rendu des sections `content-visibility:auto` uniquement dans le contexte de capture afin d'éviter les faux espaces vides des outils headless.

## Résultats techniques

| Contrôle | Résultat |
| --- | --- |
| Génération Markdown | 13 projets, 5 knowledge, 9 Q/R, 12 preuves |
| Tests | 77/77 réussis |
| TypeScript | OK |
| Contenu | 13 projets, revue 2026-08-15 |
| Liens | 84 liens internes et externes OK |
| LinkedIn | Avertissement 999 : accès automatisé limité, pas un lien déclaré cassé |
| Build Next.js 16.3.1 | 38 pages générées, compilation réussie |
| `git diff --check` | OK |
| Gitleaks | 113 commits scannés, aucun secret trouvé |
| Audit visuel | 87/87 captures en HTTP 200 |
| Console et JavaScript | 0 erreur |
| Responsive | 0 débordement horizontal, 0 collision de header |
| Images | 0 image cassée |
| Animation de titre | Cycle cyan/rouge détecté à 10 s, opacité 0,85 |
| Mouvement réduit | Pseudo-éléments du glitch masqués |
| Lighthouse mobile home | Performance 98, accessibilité 100, bonnes pratiques 100, SEO 100 |
| Lighthouse desktop home | 100 sur les quatre catégories |

Mesure Lighthouse mobile : LCP 2 426 ms, CLS 0,00023, TBT 19 ms.

Mesure Lighthouse desktop : LCP 554 ms, CLS 0,00015, TBT 0 ms.

## État Git et limites

- 43 fichiers suivis sont modifiés dans le lot repris depuis Freebuff et Codex, avant ajout de ce rapport.
- `AGENTS.md` et `CLAUDE.md` sont des fichiers non suivis générés par l'environnement Next local ; ils n'ont pas été supprimés ni intégrés arbitrairement.
- Le plan et la spécification sont locaux dans `docs/superpowers/`.
- Au moment de la clôture de cet audit, aucun commit, push, déploiement Vercel ou demande d'indexation n'avait encore été effectué.
- Les PDF de CV n'ont pas été régénérés dans ce lot ; le Markdown a été gardé aligné sur les PDF existants.
- Les preuves des dépôts privés restent privées. Le site ne les transforme pas en preuves GitHub publiques.

## Conclusion

Le lot a passé les contrôles locaux avant publication. Tout commit ou déploiement réalisé ensuite doit être confirmé par l'historique Git et par un contrôle de production séparé.
