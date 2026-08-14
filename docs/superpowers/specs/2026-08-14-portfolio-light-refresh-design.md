# Refonte légère Archive Worldline

## Objectif

Rendre le portfolio plus rapide à comprendre et à charger sans changer son identité, sa promesse, ses preuves ni le décodeur d'offres ajouté sur `feat/ai-job-decoder`.

## Problèmes confirmés

1. Le graphe JSON-LD complet de vingt nœuds est injecté dans chaque page, alors qu'un endpoint dédié existe déjà.
2. Six familles de polices sont configurées ; deux téléchargements ne justifient pas leur coût.
3. Le titre animé duplique son texte dans trois éléments DOM et requiert un contrôleur client uniquement pour le glitch périodique.
4. Le header mobile approche 130 px et affiche un rôle long ainsi que les secondes de l'horloge.
5. Le menu mobile met jusqu'à 1,4 s à s'ouvrir et décale son dernier lien jusqu'à 1 s.
6. La liste des projets applique la même densité aux preuves principales et aux travaux secondaires.
7. La bannière de consentement mobile est correcte mais occupe plus de hauteur que nécessaire.
8. La charte existante tient en onze lignes et ne permet pas une reprise fiable du chantier.

## Décisions

- Conserver Archive Worldline, la grille, le blueprint et les animations de page, texte et fond.
- Garder Cormorant Garamond, Courier Prime, Special Elite et Oslo II.
- Remplacer Newsreader italic par Georgia et IBM Plex Mono par Courier Prime.
- Injecter `Person` et `WebSite` dans le layout ; conserver le graphe complet sur `/knowledge-graph.json`.
- Remplacer les copies DOM et `GlitchController` par un titre réel et deux pseudo-éléments CSS.
- Masquer le rôle long et les secondes sous 640 px ; conserver le nom, Paris et l'heure.
- Limiter l'ouverture du menu à 500 ms et les décalages de liens à 180 ms.
- Utiliser `cardLine ?? proofLine ?? summary` sur les niveaux 2 et 3 ; ne supprimer aucun contenu des pages projet.
- Compacter la bannière de consentement sans toucher à sa logique ni aux cibles tactiles de 44 px.
- Ne modifier ni la promesse, ni les CTA, ni les données de projet hors format court déjà disponible.

## Budgets et critères

- Lighthouse mobile local : performance au moins 95 ; accessibilité, bonnes pratiques et SEO à 100.
- LCP inférieur ou égal à 2,5 s ; CLS inférieur à 0,05 ; TBT inférieur à 100 ms.
- `npm run check` et `npm run build` verts.
- Zéro erreur console et zéro débordement horizontal à 375, 768 et 1440 px.
- Zéro chargement de Clarity avant consentement.
- Zéro secret détecté et zéro vulnérabilité de production connue.
- Aucune nouvelle dépendance ou requête décorative.

## Hors périmètre

- Réécriture marketing globale.
- Modification des études de cas détaillées.
- Refonte du décodeur d'offres.
- Changement d'identité ou création d'images.
- Push Git, PR ou déploiement en production sans autorisation explicite.
