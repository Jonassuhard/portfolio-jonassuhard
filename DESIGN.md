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
    fontWeight: 700
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
    fontWeight: 400
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

Cormorant Garamond 700 est servi depuis un WOFF2 local sous-ensemblé au corpus français et anglais du site. Courier Prime 400 reste fourni par `next/font`. Ces deux fontes critiques sont préchargées ; aucune graisse synthétique n'est autorisée.

Le fallback de Courier Prime est explicitement Courier New, puis monospace,
sans fallback Arial automatique. Le chargement reste `optional` pour éviter
une permutation tardive. Les nouvelles introductions utilisent des tailles
fixes par breakpoint, pas de taille de police proportionnelle au viewport.

- Les titres restent courts, fermes, avec une taille responsive bornée et sans espacement négatif.
- Le corps conserve une hauteur de ligne généreuse pour compenser la texture monospace.
- Les labels utilisent la casse naturelle ou des capitales courtes ; l'espacement des lettres reste à zéro.
- Les données, preuves, dates et limites utilisent Courier Prime en 11 à 13 px, jamais une nouvelle famille monospace.
- Les italiques narratives utilisent le fallback système Georgia afin d'éviter un téléchargement dédié.

## Layout

Le contenu est centré dans une largeur maximale de **1120 px**. Les pages utilisent des bandes et sections non encartées ; les cartes sont réservées aux éléments réellement répétés : projets, preuves, résultats du décodeur et blocs comparables.

La grille de fond possède des lignes mineures tous les **32 px** et majeures tous les **160 px**. Onze motifs techniques noirs sur fond transparent forment un calque bitmap fixe, sans interaction, plus pâle que la grille et allégé sur mobile. Les fichiers restent locaux, en WebP avec alpha, et les formes décoratives mobiles sont masquées avant chargement. La hiérarchie est construite par l'ordre titre, promesse, preuve, détail, action.

Les seuils de référence sont 430, 640, 760, 960 et 1080 px ; le header Signature passe au menu compact à 800 px. Tout composant fixe possède des dimensions stables. Sur mobile, le header tient autour de 80 px, le menu est immédiatement compréhensible et les cibles tactiles mesurent au moins 44 px.

## Elevation & Depth

Le système est essentiellement plat. La profondeur vient de trois couches : papier et grille, schémas techniques, contenu. Les cartes reposent sur des bordures d'encre fines. Une ombre courte et dure peut signaler un survol ou une fenêtre active ; les flous lourds et les ombres diffuses sont exclus.

Le bruit papier est une couche fixe très faible. Les filtres coûteux, les images décoratives distantes et les effets qui dégradent le LCP sont interdits. Les animations utilisent surtout `transform` et `opacity`.

## Shapes

Le langage de forme est rectiligne et documentaire. Les cartes principales utilisent des angles droits. Les boutons et champs peuvent utiliser 2 à 3 px de rayon pour préserver le focus et le confort tactile. Aucun grand arrondi de type pilule, aucune carte dans une carte, aucun blob décoratif.

Les cadres, graduations, traits pointillés et repères techniques utilisent un trait proche de 1 px. L'iconographie emploie les symboles ou icônes de la bibliothèque existante quand ils sont plus clairs qu'un libellé.

## Components

### Header et navigation

Le header Signature éditoriale (proposition 1 choisie le 9 septembre 2026, intégration locale) tient sur une seule bande crème. Nom en Cormorant Garamond 29 px, rôle en Courier Prime 11 px ; navigation à droite, sans capitales forcées. Sur mobile jusqu'à 800 px : nom 26 px, rôle 10 px, menu sans cadre avec cible de 44 px. Le bandeau supérieur, le médaillon et l'horloge ne sont plus rendus dans ce header. La flèche de retour reste présente dans les fiches projet. L'ouverture du menu dure au plus 550 ms, avec un décalage total inférieur à 180 ms ; Escape ferme le menu et rend le focus au bouton.

La preview lisibilité du 9 septembre conserve quatre entrées : Recruteurs,
Projets, À propos et Contact. Compétences, Méthode et Preuves restent accessibles
dans le footer et depuis les pages pertinentes. La page active est soulignée ;
le menu fermé n'expose pas ses liens au clavier, Échap rend le focus au bouton.

### Footer Signature compacte

La proposition 1 choisie le 9 septembre 2026 utilise une bande crème sans carte : nom en Cormorant Garamond 32 px et rôle à gauche, email et réseaux à droite. Le CV principal, Preuves et Méthode restent visibles ; Compétences, Knowledge, le CV illustré et Malt sont regroupés dans « Autres ressources ». Les mentions légales, la confidentialité et la gestion réelle des cookies restent toujours accessibles. Sous 700 px, les blocs s'empilent ; les cibles interactives conservent au moins 44 px de hauteur.

### Titres animés

Le texte réel est présent dès la première frame. L'aberration cyan et rouge est produite en CSS par pseudo-éléments non exposés à l'arbre d'accessibilité. Le cycle dure 40 secondes : l'entrée chromatique reste visible 1,2 seconde, la déchirure périodique environ 1,4 seconde, et le décalage ne dépasse pas 2 px. Le glitch ne doit pas nécessiter de contrôleur JavaScript. `prefers-reduced-motion` désactive les copies et transitions.

### Cartes de projet

Chaque carte indique l'utilité du projet et son état actuel. La confidentialité
des preuves est expliquée dans la fiche, sans laisser entendre qu'un site public
est une démo privée. Les descriptions détaillées restent dans les fiches.
Job Radar, Cortex Bridge et Les Petites Griffes ouvrent les trois index.
Toutes les cartes gardent leur ratio, y compris dans les labs et archives.
Toute la carte de l'index peut être cliquable ; les liens secondaires restent
utilisables au clavier.

Chaque vignette utilise un bitmap WebP de 760 × 460 avec transparence réelle. Elle est rendue sans recadrage dans son ratio source 38/23. Elle mélange la couleur et le symbole propres au projet avec la composition Archive Worldline : titre court à gauche, un seul emblème lisible à droite, repères techniques très rares. Le contenu placé sous l'image ne répète pas visuellement ce titre ; il reste présent hors écran pour conserver la structure accessible. Les scènes détaillées, schémas génériques et générateurs SVG de cartes sont exclus ; les couleurs des projets restent affichées sans filtre sépia.

### Boutons et liens

Le bouton primaire est encre sur papier inversé ; le secondaire reste papier avec bordure d'encre. Le focus clavier utilise un contour rouille de 2 px. Les libellés sont des commandes concrètes : consulter, télécharger, contacter, analyser.

Le CV classique est une action principale sur Accueil et Recruteurs.
Le CV illustré reste disponible au second niveau. Le rôle principal est
Growth Engineer junior ; Forward Deployed Engineer est un objectif, pas un
poste déjà occupé.

### Fiches et galeries

L'introduction donne le nom du projet, son utilité, son état et le rôle de Jonas.
Elle montre une vraie interface ou vidéo lorsqu'elle existe ; l'illustration
reste réservée à la carte. Les galeries ne recadrent pas les captures.
Un clic ouvre l'image originale dans un dialogue natif accessible ; Échap,
la fermeture et le clic sur le fond rendent le focus au déclencheur.
Sans JavaScript, le lien ouvre directement le fichier. Aucun média tiers ajouté.

Les contraintes importantes restent visibles avant le dossier technique.
Les décisions, tableaux, comptes de tests, versions et architecture sont
disponibles dans des volets natifs, sans retirer les faits des Markdown.
Les vidéos gardent leur lecture muette à l'apparition, la pause hors écran
et le respect du mouvement réduit. Les médias des Petites Griffes sont conservés.

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
