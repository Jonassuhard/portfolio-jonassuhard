# Educool V2 - suivre les acquis de la classe

## Repères

| Repère | Détail |
| --- | --- |
| Format | Application pour l'enseignante |
| Période | 2026 - en cours |
| Rôle de Jonas | Conception produit, interface, développement full-stack et vérification avec des données fictives |
| Statut | Application à accès réservé · améliorations locales en cours |
| Niveau de preuve | Preuves privées |
| Stack | Next.js, React, TypeScript, Zustand, Firebase, Firestore, Cloud Functions, IndexedDB |

## À quoi ça sert

Un outil pour l'enseignante : retrouver un élève, saisir ses ceintures de compétences et préparer ses livrets, sans multiplier les tableaux.

## Besoin

### Saisir une fois, retrouver l'information

L'enseignante suit les acquis de chaque élève avec des ceintures de compétences. Le besoin : relier cette saisie aux livrets, sans recopier les mêmes informations partout.

- Retrouver rapidement un élève et sa progression.
- Regrouper les matières, les validations et les appréciations.
- Préparer les livrets de progression et d'évaluation.

## Intention

### Un outil de travail, pas un jeu

Educool V2 est réservé à l'enseignante. Cool Bank est un projet distinct, centré sur la banque de classe et les parcours des élèves.

- Garder les tâches courantes accessibles sur tablette.
- Montrer si les données sont locales ou synchronisées.
- Prévisualiser les imports avant de confirmer les changements.

## Ce que Jonas a fait

- Gestion des élèves et des matières, saisie des ceintures, appréciations et livrets.
- Filtres de classe et formulaire d'ajout repliable.
- Outils locaux de sauvegarde et assistant d'import avec prévisualisation et confirmation.

## Ce que ça prouve

Interface réelle, captures de démonstration et code privé. Les écrans montrés viennent de la version locale.

- Partir d'une façon de travailler réelle pour construire les écrans.
- Relier les données de classe aux documents de suivi.
- Prévoir les erreurs de saisie, la sauvegarde et les retours en arrière.

Sources locales relues le 9 septembre 2026. Captures issues des contrôles locaux des 8 et 9 septembre ; élèves fictifs. Ce contrôle du portfolio ne remplace pas la validation d'Educool.

## Visuels

![Retrouver un élève et filtrer la classe. Capture locale du 9 septembre 2026, données fictives ; cadrage sur le haut de la liste.](/assets/proof/educool-v2/classe-20260909.webp)

![La classe et ses filtres. Version locale du 9 septembre 2026, élèves fictifs, liste cadrée.](/assets/proof/educool-v2/classe-20260909.webp)

![Ajouter un élève sans quitter la liste. Capture locale du 8 septembre 2026, formulaire vide et données de démonstration.](/assets/proof/educool-v2/formulaire-20260909.webp)

![Retrouver la classe sur mobile. Capture locale du 9 septembre 2026, élèves fictifs ; cadrage sur le haut de l'écran.](/assets/proof/educool-v2/mobile-20260909.webp)


## Résultats vérifiés

- Une interface de travail qui réunit le suivi des élèves et la préparation des livrets.
- Des captures locales de démonstration disponibles sans publier de données scolaires.

## Limites

- Les captures des 8 et 9 septembre 2026 montrent une version locale, pas une recette de production.
- L'accès, la protection des données cloud et les parcours sur appareils réels restent à valider avant de qualifier la version de finalisée.
- Aucun gain de temps ni bénéfice pédagogique chiffré n'est revendiqué.
- La liaison avec Cool Bank V3 est un chantier séparé, pas une fonction livrée ici.

## Liens

- [Étude de cas](/projets/educool-v2)
- [Application · accès réservé](https://educool-v2.vercel.app)
- [Projet distinct : Cool Bank](/projets/educool-la-herse)
