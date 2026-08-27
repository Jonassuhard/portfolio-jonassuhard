# Battle Engine - pipeline vidéo automatisé

## Repères

| Repère | Détail |
| --- | --- |
| Format | Pipeline vidéo / automation |
| Période | 2026 |
| Rôle de Jonas | Pipeline Python, Godot, rendu, FFmpeg, publication |
| Statut | Actif / lab · sources vérifiées jusqu'au 25 août 2026 |
| Niveau de preuve | Démo privée |
| Stack | Godot, Python, FFmpeg, RIFE, YouTube API |

## À quoi ça sert

Battle Engine automatise la fabrication de vidéos de combats 1 contre 1. Python pilote le rendu Godot, le montage FFmpeg, l'interpolation d'images et la publication YouTube.

## Ce que Jonas a fait

- Pipeline de rendu
- Vidéos de test générées
- Scripts d'automatisation

## Ce que ça prouve

Un pipeline Python lance le combat dans Godot, prépare la vidéo avec FFmpeg et reprend la publication si une étape est interrompue.

- Automatiser un travail qui traverse plusieurs outils.
- Reprendre une publication après une interruption sans recommencer tout le rendu.
- Documenter les droits audio, les contrôles qualité et les étapes d'exploitation.

Preuves locales privées vérifiées jusqu'au 25/08/2026 : reprise du pipeline après interruption et ajout d'analyses d'exploitation en lecture seule.

## Visuels

![Schéma du pipeline reprenable : Godot rend le combat, FFmpeg et RIFE préparent la vidéo, puis l'API YouTube publie.](/assets/proof/battle-engine/pipeline-resumable.webp)

![Séquence d'intro : les plateformes des deux combattants et le champ de particules, rendus par un shader custom sous Godot.](/assets/proof/battle-engine/intro-platforms.webp)

![Montée du champ de particules avant le face-à-face, générée en temps réel côté moteur.](/assets/proof/battle-engine/intro-buildup.webp)


## Limites

- Projet lab : automatisation créative, éloignée du poste visé, gardée comme preuve technique.
- La vidéo publique montre uniquement l'introduction rendue en haute définition, pas un combat complet.
- Audience YouTube : à vérifier, non avancée comme preuve recruteur.

## Liens

- [Étude de cas](/projets/battle-engine)
- [Chaîne YouTube](https://www.youtube.com/channel/UCBdIZLI1Z_EmaZgalR8GsHw)
