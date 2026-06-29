# Pokémon Gen-4 Toolkit - outils de ROM hacking NDS

Type : rom hacking · nds.

Période : 2026.

Rôle : Conception et développement.

Stack : Python 3, ndspy, format NARC, moteur de texte Gen 4 maison, EmulatorJS.

Statut : Copie publique anonymisée (ROM non incluse).

En bref : Boîte à outils Python (ndspy) pour explorer et modifier un ROM Pokémon Gen 4 : textes chiffrés, events, scripts, stats des espèces, cartographie et viewer web.

## Problème

Lire et réécrire le contenu propriétaire d'un ROM NDS sans outil tout fait, en reverse-engineering du format Gen 4.

## Ce que ça montre

- Reverse-engineering d'un format binaire : décodage/encodage du texte chiffré Gen 4 (charmap + seed/XOR) écrit à la main.
- Outillage complet : events, bytecode des scripts, espèces, cartographie.

## Limites

- Sans ROM légale fournie, aucun contenu jouable distribué.
- Ciblé sur la 4e génération NDS, non généralisé.
