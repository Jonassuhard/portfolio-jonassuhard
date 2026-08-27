# Edusemantix - jeu de devinette sémantique multijoueur

## Repères

| Repère | Détail |
| --- | --- |
| Format | Lab / projet perso |
| Période | 2026 |
| Rôle de Jonas | Conception et développement |
| Statut | Lab privé actif · refonte V2 en cours |
| Niveau de preuve | Démo privée |
| Stack | React 19 / Vite 6, Node.js / Express / Socket.io, ConceptNet Numberbatch, Python (pré-calcul), Firebase Firestore |

## À quoi ça sert

Faire jouer plusieurs personnes en simultané sur une mécanique de proximité sémantique, avec scoring temps réel.

## Ce que Jonas a fait

- Application React + serveur Node/Socket.io avec moteur de jeu et scoring sémantique.
- Scripts Python de génération/pré-calcul des vecteurs.

## Ce que ça prouve

Jeu multijoueur en temps réel où l'on cherche un mot secret : chaque proposition reçoit un score de proximité sémantique (similarité cosinus sur vecteurs de mots), scores en direct via WebSocket.

- Scoring sémantique sur vecteurs de mots (similarité cosinus) avec pré-calcul Python et stockage binaire pour la performance.
- Temps réel multijoueur via Socket.io (parties simultanées, scores en direct).

## Visuels

![Écran de connexion de la démo locale, lancé avec un profil fictif créé uniquement pour cette capture.](/assets/proof/edusemantix/edusemantix-login.webp)

![Partie locale : une proposition reçoit immédiatement un score de proximité avec le mot secret.](/assets/proof/edusemantix/edusemantix-game.webp)

![Retour après une proposition fictive : score sémantique, progression et historique affichés par l'interface réelle.](/assets/proof/edusemantix/edusemantix-score.webp)


## Limites

- Projet lab en refonte V2 ; les captures publiées restent celles de la version de démonstration auditée.
- Une prévisualisation existe, mais n'est pas présentée comme une démo publique stable.
- Persistance des stats dépend de Firebase (mode mémoire sans credentials).

## Liens

- [Étude de cas](/projets/edusemantix)
