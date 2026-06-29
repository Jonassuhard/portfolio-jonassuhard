# Pokémon Gen-4 Toolkit - outils de ROM hacking NDS

Type : Lab / projet perso.
Période : 2026.
Rôle : Conception et développement.
Stack : Python 3, ndspy, Format NARC, Moteur de texte Gen 4 maison, EmulatorJS (viewer web).
Statut : Copie publique anonymisée (ROM non incluse).

En bref : Boîte à outils Python (ndspy) pour explorer et modifier un ROM Pokémon de 4e génération : décodage/encodage des textes chiffrés, édition des events et scripts, stats des espèces, cartographie, viewer web.

## Problème

Lire et réécrire le contenu propriétaire d'un ROM NDS (textes chiffrés, events, scripts) sans outil tout fait, en reverse-engineering du format Gen 4.

## Ce que ça montre

- Reverse-engineering d'un format binaire propriétaire : décodage/encodage du texte chiffré Gen 4 (charmap + chiffrement seed/XOR) écrit à la main.
- Outillage complet : édition des events (PNJ, warps, triggers), du bytecode des scripts, des stats/espèces, et cartographie des zones.

## Limites

- Sans ROM légale fournie, le toolkit ne fait rien : aucun contenu jouable distribué.
- Lab ciblé sur la 4e génération NDS, non généralisé.
