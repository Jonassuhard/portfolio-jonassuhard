# Edusemantix - jeu de devinette sémantique multijoueur

Type : Lab / projet perso.
Période : 2026.
Rôle : Conception et développement.
Stack : React 19 / Vite 6, Node.js / Express / Socket.io, ConceptNet Numberbatch, Python (pré-calcul), Firebase Firestore.
Statut : Lab privé.
Niveau de preuve : Démo privée.

En bref : Jeu multijoueur en temps réel où l'on cherche un mot secret : chaque proposition reçoit un score de proximité sémantique (similarité cosinus sur vecteurs de mots), scores en direct via WebSocket.

## Problème

Faire jouer plusieurs personnes en simultané sur une mécanique de proximité sémantique, avec scoring temps réel.

## Ce que ça montre

- Scoring sémantique sur vecteurs de mots (similarité cosinus) avec pré-calcul Python et stockage binaire pour la performance.
- Temps réel multijoueur via Socket.io (parties simultanées, scores en direct).

## Limites

- Projet lab plus ancien, avec une base de mots à rafraîchir et quelques correctifs à reprendre.
- Lab personnel, pas de démo publique maintenue.
- Persistance des stats dépend de Firebase (mode mémoire sans credentials).
