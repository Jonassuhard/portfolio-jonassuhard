# Edusemantix - jeu de devinette sémantique multijoueur

## Repères

| Repère | Détail |
| --- | --- |
| Format | Lab / projet perso |
| Période | 2026 |
| Rôle de Jonas | Conception et développement |
| Statut | Démo publique en ligne · projet personnel |
| Niveau de preuve | Preuve publique |
| Stack | React 19 / Vite 6, Node.js / Express / Socket.io, ConceptNet Numberbatch, Python (pré-calcul), Firebase Firestore |

## À quoi ça sert

Deviner un mot à partir de sa proximité avec d'autres mots. Chaque proposition reçoit un score, et les joueurs voient la progression de la partie en direct.

## Ce que Jonas a fait

- Application React + serveur Node/Socket.io avec moteur de jeu et scoring sémantique.
- Scripts Python de génération/pré-calcul des vecteurs.

## Ce que ça prouve

Jeu multijoueur en temps réel où l'on cherche un mot secret : chaque proposition reçoit un score de proximité sémantique (similarité cosinus sur vecteurs de mots), scores en direct via WebSocket.

- Scoring sémantique sur vecteurs de mots (similarité cosinus) avec pré-calcul Python et stockage binaire pour la performance.
- Temps réel multijoueur via Socket.io (parties simultanées, scores en direct).

Trois captures de la démo publique du 8 septembre 2026, dans une session anonyme Joueur Preview. Les scores proviennent des propositions réellement jouées pour la capture.

## Visuels

![Démo publique : trois propositions jouées dans une session anonyme, avec leur score sémantique.](/assets/proof/edusemantix/game-20260908.webp)

![Règles accessibles depuis la partie : proximité, température et progression.](/assets/proof/edusemantix/rules-20260908.webp)

![La même partie sur un écran de 390 px : proposition, score et historique.](/assets/proof/edusemantix/mobile-20260908.webp)


## Limites

- L'hébergement peut demander un temps de réveil à la première visite.
- Cette démonstration ne prouve pas un bénéfice pédagogique ni une utilisation en classe.
- La persistance des statistiques dépend de la configuration du serveur.

## Liens

- [Étude de cas](/projets/edusemantix)
- [Jouer à la démo](https://edusemantix.onrender.com)
