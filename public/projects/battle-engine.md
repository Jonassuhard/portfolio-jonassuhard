# Battle Engine - pipeline vidéo automatisé

## Repères

| Repère | Détail |
| --- | --- |
| Format | Pipeline vidéo / automation |
| Période | 2026 |
| Rôle de Jonas | Pipeline Python, Godot, rendu, FFmpeg, publication |
| Statut | Actif / lab · pipeline repris le 23 août 2026 |
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

Preuve locale privée : le commit du 23/08/2026 rend la publication nightly reprenable après une interruption.

## Limites

- Projet lab : automatisation créative, éloignée du poste visé, gardée comme preuve technique.
- Audience YouTube : à vérifier, non avancée comme preuve recruteur.

## Liens

- [Étude de cas](/projets/battle-engine)
