# Pokémon Gen-4 Toolkit - outils d'exploration de données de jeu

## Repères

| Repère | Détail |
| --- | --- |
| Format | Lab / projet perso |
| Période | 2026 |
| Rôle de Jonas | Conception et développement |
| Statut | Lab privé - aucune ROM distribuée |
| Niveau de preuve | Démo privée |
| Stack | Python 3, ndspy, Format NARC, Moteur de texte Gen 4 maison, EmulatorJS (viewer web) |

## À quoi ça sert

Explorer des formats de données de jeu et écrire mes propres outils d'édition Python, sans publier d'assets ni de ROM.

## Ce que Jonas a fait

- Scripts d'édition (textes, events, scripts, espèces) et d'analyse de zones.
- Viewer web EmulatorJS avec serveur de dev configuré et notes techniques.

## Ce que ça prouve

Boîte à outils Python (ndspy) pour explorer des formats de données de jeu (textes, events, scripts, stats) et écrire ses propres outils d'édition. Aucune ROM ni asset distribué.

- Reverse-engineering d'un format binaire propriétaire, avec décodage et encodage du texte chiffré Gen 4 (charmap + chiffrement seed/XOR) écrits à la main.
- Outillage complet : édition des events (PNJ, warps, triggers), du bytecode des scripts, des stats/espèces, et cartographie des zones.

## Limites

- Sans ROM légale fournie, le toolkit ne fait rien : aucun contenu jouable distribué.
- Lab ciblé sur la 4e génération NDS, non généralisé.

## Liens

- [Étude de cas](/projets/pokemon-gen4-toolkit)
