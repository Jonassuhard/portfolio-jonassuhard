---
version: alpha
name: Archive Worldline
description: Portfolio de preuves recruteur-first sur papier technique creme, encre chaude et accent rouille.
colors:
  background: "#EEE8D8"
  background-aged: "#D8CFB7"
  surface: "#F6F1E2"
  ink: "#15120E"
  ink-soft: "#3A332B"
  muted: "#5F5746"
  rust: "#9A4D2E"
  red: "#8E1F2F"
  gold: "#B18B45"
  nixie: "#FF7A18"
  cyan: "#77B7B8"
  blue: "#536E91"
  success: "#3D6628"
  dark-surface: "#0C0D10"
  dark-text: "#E7E1D5"
typography:
  display-lg:
    fontFamily: Cormorant Garamond
    fontSize: 66px
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: 0em
  display-md:
    fontFamily: Cormorant Garamond
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0em
  headline-lg:
    fontFamily: Cormorant Garamond
    fontSize: 38px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: 0em
  headline-md:
    fontFamily: Cormorant Garamond
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: 0em
  headline-sm:
    fontFamily: Cormorant Garamond
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: 0em
  body-lg:
    fontFamily: Courier Prime
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0em
  body-md:
    fontFamily: Courier Prime
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.72
    letterSpacing: 0em
  body-sm:
    fontFamily: Courier Prime
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  label-lg:
    fontFamily: Courier Prime
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  label-md:
    fontFamily: Courier Prime
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0em
  data-md:
    fontFamily: Courier Prime
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: 0em
  caption:
    fontFamily: Courier Prime
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
rounded:
  none: 0px
  xs: 2px
  sm: 3px
  md: 6px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  grid-minor: 32px
  grid-major: 160px
  content-max: 1120px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    minHeight: 44px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xs}"
    minHeight: 44px
  archive-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    borderColor: "{colors.ink}"
  evidence-badge:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    minHeight: 44px
---

# Archive Worldline

## Overview

Archive Worldline est la source de vérité visuelle de `jonassuhard.com`. Le portfolio doit donner l'impression d'un dossier de travail consultable : précis, humain et déjà éprouvé, pas d'une démonstration de style qui demande un mode d'emploi. La cible prioritaire est un recruteur ou un manager qui scanne vite, puis vérifie les preuves.

La composition suit le garde-fou **70 % lisibilité / 20 % archive / 10 % décoration**. Le papier crème, la grille millimétrée et les schémas techniques construisent l'univers. L'encre, la hiérarchie typographique et les limites explicites portent la crédibilité. Les accents chromatiques restent rares et fonctionnels.

La référence culturelle est une ambiance d'archive scientifique et de bifurcation temporelle, jamais la copie d'une œuvre, d'un logo, d'un personnage ou d'une interface protégée. Le système doit rester calme, rapide et accessible sur mobile.

## Colors

- **Papier (`#EEE8D8`, `#F6F1E2`) :** fond général et surfaces de lecture. Aucun blanc pur dans l'interface principale.
- **Encre (`#15120E`, `#3A332B`) :** texte, cadres et actions. Le contraste avec la surface est prioritaire.
- **Rouille (`#9A4D2E`) :** accent principal pour liens, focus, emphases et CTA. Il ne remplace jamais un libellé d'état.
- **Archive (`#D8CFB7`, `#5F5746`, `#B18B45`) :** métadonnées, repères secondaires et vieillissement contrôlé.
- **Signal (`#8E1F2F`, `#77B7B8`, `#536E91`, `#3D6628`) :** états ponctuels, niveaux de preuve et aberration chromatique. Jamais en grande nappe.
- **Nixie (`#FF7A18` sur `#0C0D10`) :** réservé à l'horloge et aux indicateurs de temps.

Le corps `ink` sur `surface` doit rester supérieur à WCAG AA. Le texte `muted` reste réservé aux corps de 13 px minimum ou aux libellés courts. Une information critique n'est jamais communiquée par la couleur seule.

## Typography

Deux voix suffisent : **Cormorant Garamond** pour les titres éditoriaux et **Courier Prime** pour le corps, les données et les marques d'archive. Oslo II reste une exception locale pour l'horloge nixie. Cette discipline évite qu'une fonte décorative de 53 Ko ralentisse chaque première visite.

- Les titres restent courts, fermes, avec une taille responsive bornée et sans espacement négatif.
- Le corps conserve une hauteur de ligne généreuse pour compenser la texture monospace.
- Les labels utilisent la casse naturelle ou des capitales courtes ; l'espacement des lettres reste à zéro.
- Les données, preuves, dates et limites utilisent Courier Prime en 11 à 13 px, jamais une nouvelle famille monospace.
- Les italiques narratives utilisent le fallback système Georgia afin d'éviter un téléchargement dédié.

## Layout

Le contenu est centré dans une largeur maximale de **1120 px**. Les pages utilisent des bandes et sections non encartées ; les cartes sont réservées aux éléments réellement répétés : projets, preuves, résultats du décodeur et blocs comparables.

La grille de fond possède des lignes mineures tous les **32 px** et majeures tous les **160 px**. Les schémas SVG sont fixes, sans interaction, plus pâles que la grille et dégagent la zone centrale. La hiérarchie est construite par l'ordre titre, promesse, preuve, détail, action.

Les seuils de référence sont 430, 640, 760, 960 et 1080 px. Tout composant fixe possède des dimensions stables. Sur mobile, le header tient autour de 96 à 104 px, le menu est immédiatement compréhensible et les cibles tactiles mesurent au moins 44 px.

## Elevation & Depth

Le système est essentiellement plat. La profondeur vient de trois couches : papier et grille, schémas techniques, contenu. Les cartes reposent sur des bordures d'encre fines. Une ombre courte et dure peut signaler un survol ou une fenêtre active ; les flous lourds et les ombres diffuses sont exclus.

Le bruit papier est une couche fixe très faible. Les filtres coûteux, les images décoratives distantes et les effets qui dégradent le LCP sont interdits. Les animations utilisent surtout `transform` et `opacity`.

## Shapes

Le langage de forme est rectiligne et documentaire. Les cartes principales utilisent des angles droits. Les boutons et champs peuvent utiliser 2 à 3 px de rayon pour préserver le focus et le confort tactile. Aucun grand arrondi de type pilule, aucune carte dans une carte, aucun blob décoratif.

Les cadres, graduations, traits pointillés et repères techniques utilisent un trait proche de 1 px. L'iconographie emploie les symboles ou icônes de la bibliothèque existante quand ils sont plus clairs qu'un libellé.

## Components

### Header et navigation

Le header sticky regroupe une titlebar compacte et la navigation. Sur mobile, le rôle long et les secondes de l'horloge disparaissent ; le nom, la localisation, l'heure et l'accès au menu restent visibles. L'ouverture du menu dure au plus 550 ms, avec un décalage total inférieur à 180 ms.

### Titres animés

Le texte réel est présent dès la première frame. L'aberration cyan et rouge est produite en CSS par pseudo-éléments non exposés à l'arbre d'accessibilité. Le glitch périodique ne doit pas nécessiter de contrôleur JavaScript. `prefers-reduced-motion` désactive les copies et transitions.

### Cartes de projet

Le premier niveau conserve image, résumé et preuves complètes. Les niveaux secondaires affichent une image plus basse et une ligne de preuve courte, sans supprimer les informations des pages détaillées. Toute la carte peut être cliquable, mais les liens secondaires restent utilisables au clavier.

### Boutons et liens

Le bouton primaire est encre sur papier inversé ; le secondaire reste papier avec bordure d'encre. Le focus clavier utilise un contour rouille de 2 px. Les libellés sont des commandes concrètes : consulter, télécharger, contacter, analyser.

### Consentement

La bannière reste explicite, révocable et sans chargement de Clarity avant accord. Sur mobile, elle occupe le minimum utile, conserve deux actions de 44 px et place le détail derrière un contrôle `aria-expanded`.

### Décodeur d'offres

Le décodeur réutilise uniquement ces tokens. Il reste un outil de travail dense, non une landing page. Les entrées, résultats, explications et limites doivent être visibles sans mise en scène décorative supplémentaire.

## Do's and Don'ts

- Faire passer la promesse et les preuves avant le décor.
- Garder les animations de page, de texte et de fond, avec une version statique en mouvement réduit.
- Utiliser les données structurées compactes dans le HTML et publier le graphe complet à son endpoint dédié.
- Préserver les limites et niveaux de preuve, y compris quand une formulation courte est utilisée dans une liste.
- Vérifier le rendu à 375, 768 et 1440 px avant livraison.
- Ne pas copier de composant ou de palette du Portfolio Paris Nuit.
- Ne pas ajouter de gradient spectaculaire, faux terminal, jauge marketing, orbite ou carte imbriquée.
- Ne pas charger une police, une image ou un script tiers pour une décoration.
- Ne pas masquer une faiblesse produit derrière une animation.
- Ne pas publier, pousser ou déployer sans autorisation explicite.
