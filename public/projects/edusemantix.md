# Edusemantix - jeu de devinette sémantique multijoueur

Type : jeu sémantique · temps réel.

Période : 2026.

Rôle : Conception et développement.

Stack : React 19 / Vite 6, Node.js / Express / Socket.io, ConceptNet Numberbatch, Python.

Statut : Copie publique anonymisée.

En bref : Jeu multijoueur en temps réel : trouver un mot secret, chaque proposition recevant un score de proximité sémantique (similarité cosinus), scores en direct via WebSocket.

## Problème

Faire jouer plusieurs personnes en simultané sur une mécanique de proximité sémantique, avec scoring temps réel.

## Ce que ça montre

- Scoring sémantique sur vecteurs de mots, pré-calcul Python et stockage binaire pour la performance.
- Temps réel multijoueur via Socket.io.

## Limites

- Lab personnel, pas de démo publique maintenue.
- Persistance des stats dépend de Firebase.
