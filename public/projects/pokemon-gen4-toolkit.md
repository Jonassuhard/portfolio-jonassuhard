# Pokémon Gen-4 Toolkit - outils d'exploration de données de jeu

Type : Lab / projet perso.
Période : 2026.
Rôle : Conception et développement.
Stack : Python 3, ndspy, Format NARC, Moteur de texte Gen 4 maison, EmulatorJS (viewer web).
Statut : Lab privé - aucune ROM distribuée.
Niveau de preuve : Démo privée.

En bref : Boîte à outils Python (ndspy) pour explorer des formats de données de jeu (textes, events, scripts, stats) et écrire ses propres outils d'édition. Aucune ROM ni asset distribué.

## Problème

Explorer des formats de données de jeu et écrire mes propres outils d'édition Python, sans publier d'assets ni de ROM.

## Ce que ça montre

- Reverse-engineering d'un format binaire propriétaire, avec décodage et encodage du texte chiffré Gen 4 (charmap + chiffrement seed/XOR) écrits à la main.
- Outillage complet : édition des events (PNJ, warps, triggers), du bytecode des scripts, des stats/espèces, et cartographie des zones.

## Limites

- Sans ROM légale fournie, le toolkit ne fait rien : aucun contenu jouable distribué.
- Lab ciblé sur la 4e génération NDS, non généralisé.
