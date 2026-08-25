# Audit du fond blueprint et du glitch — 25 août 2026

## Périmètre

Ce rapport documente le remplacement du blueprint SVG inline par onze images locales et le ralentissement de l'aberration chromatique des grands titres. Il couvre le build local associé au commit `7032766`.

Fichiers concernés :

- `app/blueprint-bg.tsx`
- `app/globals.css`
- `app/animated-title.tsx` vérifié sans modification
- `public/assets/blueprint/*.webp`
- `tests/performance.test.ts`
- `DESIGN.md`

## Fond technique

Le calque contient onze dessins originaux en traits noirs : engrenages, jauge, diagramme de signal, axes, cible de repérage, règle, ligne de cote, repère, cadre et cartouche. Les fichiers sont des WebP RGBA locaux, sans dépendance ni requête externe.

| Contrôle | Résultat |
| --- | --- |
| Nombre de fichiers | 11 |
| Poids total | 235 694 octets |
| Transparence | Canal alpha valide sur les 11 fichiers |
| Requêtes externes | 0 |
| Opacité desktop | 0,075 |
| Opacité mobile | 0,06 |
| Formes visibles | 11 desktop, 5 mobile |
| Interaction | Aucune, calque `aria-hidden` et `pointer-events:none` |

La règle mobile a été ramenée de 387 × 148 px à 270 × 81 px sur un viewport de 375 px. Lighthouse la sélectionnait comme LCP malgré son rôle purement décoratif. Après correction, le titre redevient le LCP.

## Titres animés

Toutes les pages HTML utilisent `AnimatedTitle` pour leur H1. Le texte réel reste unique dans le DOM ; les copies cyan et rouge sont produites par `::before` et `::after`.

| Paramètre | Valeur finale |
| --- | --- |
| Cycle | 40 s |
| Entrée chromatique | 1,2 s |
| Déchirure périodique | environ 1,4 s |
| Décalage maximal | 2 px |
| Couche cyan | `rgba(67,174,169,.82)` |
| Couche rouge | `rgba(142,31,47,.78)` |
| Mouvement réduit | Copies masquées, 0 animation |

## Vérifications

| Contrôle | Résultat |
| --- | --- |
| Tests | 77/77 réussis |
| Contenu | 13 projets, 5 knowledge, 9 Q/R, 12 preuves |
| Liens | 84 liens internes validés |
| Build Next.js 16.3.1 | 38 pages générées |
| Sitemap | 21/21 URLs en HTTP 200 |
| Audit navigateur | 20 pages × 2 viewports, 40/40 sans échec |
| Console | 0 erreur |
| Responsive | 0 débordement horizontal |
| Images | 0 image cassée |
| Menu mobile | 6 liens visibles, ouverture validée |
| Consentement Clarity | Refus persistant après rechargement |
| Gitleaks | Aucun secret détecté au commit |

## Lighthouse local

| Profil | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 97 | 100 | 100 | 100 | 2,6 s | 0 | 30 ms |
| Desktop | 100 | 100 | 100 | 100 | 0,6 s | 0 | 0 ms |

Le transfert mesuré est de 279 Kio sur mobile et 474 Kio sur desktop. Les six images décoratives masquées sur mobile ne sont pas chargées pendant le test.

## État de livraison

- Le code et les onze images sont commités dans `7032766`.
- Aucun push ou déploiement n'est inclus dans ce rapport.
- `AGENTS.md` et `CLAUDE.md` restent des fichiers de consignes locaux non suivis.
- Une vérification Lighthouse et un crawl de production restent nécessaires après déploiement.
