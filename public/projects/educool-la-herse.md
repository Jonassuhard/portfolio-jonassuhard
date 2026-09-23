# Cool Bank - donner vie à une banque de classe

## À quoi ça sert

Une banque de classe transformée en petit monde vivant : les élèves explorent, économisent et tiennent des rôles, pendant que l'enseignante garde un outil de pilotage séparé.

## Rendre l'argent et la responsabilité plus concrets.

La banque existait déjà dans la classe. Le projet lui donne des lieux, des personnages et des conséquences visibles, sans transformer l'outil de l'enseignante en jeu.

- Les élèves explorent le bourg, accomplissent des missions, économisent et font évoluer progressivement leur maison.
- Un élève peut tenir le guichet pendant une période donnée, avec des plafonds clairs et un registre vérifiable.
- L'enseignante conserve les commandes essentielles et peut interrompre le monde ou les échanges sans perdre son espace de travail calme.

## Trois rôles

- L'élève — Il explore le bourg, parle aux habitants, accomplit des missions, économise et choisit comment utiliser ses centicools.
- Le banquier — C'est un élève responsabilisé. Il tient un guichet guidé, applique des plafonds et laisse une trace de chaque opération.
- L'enseignante — Elle suit la classe, garde le contrôle du monde et valide les progressions depuis une interface séparée du jeu.

## Versions

### V2 — Boucle 3D locale déjà jouable

État public : Jouable localement sur un appareil.

La V2 relie déjà un monde 3D à architecture multijoueur, les trois rôles et Educool. La boucle a été validée localement sur un appareil avec des profils de démonstration.

### V3 — Reconstruction séparée plus large

État public : Reconstruction en cours de validation technique.

La V3 est une reconstruction séparée, avec une carte et un périmètre plus larges. Le travail actuel porte sur le monde, les déplacements et les interfaces. La validation technique complète, puis les essais avec les utilisateurs, restent à faire.

### V4 — Migration native vers Godot

État public : Migration partiellement jouable, non finalisée.

La V4 reprend le monde dans Godot. L'exploration, les missions, les boutiques et les premières étapes de maison sont partiellement jouables. Le but est de travailler sur un client natif ; les performances sur les PC scolaires restent à mesurer.

## Ce que Jonas a fait

- V2 : prototype local à architecture multijoueur, validé sur un appareil avec trois rôles, quêtes, maisons, mini-jeux et pont Educool/Firebase.
- V3 : monde 3D, économie fictive, marchands et maisons présents dans les versions précédentes ; intégration actuelle encore en validation.
- Interface Educool : authentification, rôles, règles Firestore, Cloud Functions et suivi scolaire.
- Harnais de tests, preuves responsive, manifestes de candidate et scripts de démarrage/arrêt locaux.

## Ce que ça prouve

La V2 permet déjà de vivre la boucle 3D sur un appareil. La V3 reconstruit le jeu web ; la V4 est une migration native distincte vers Godot. Aucune efficacité pédagogique ni utilisation en classe n'est revendiquée.

- Partir d'un besoin réel de classe, construire une expérience testable, puis séparer clairement ce qui fonctionne de ce qui reste à valider.
- Relier le jeu, les trois rôles, Firebase, la sécurité et les tests.
- Dire clairement ce qui fonctionne et ce qui reste bloqué avant un pilote.

Sources relues le 23 septembre 2026. V2 : essais locaux historiques d'août. V3 : reconstruction web, carte et interfaces encore en travail. V4 : migration distincte vers Godot, partiellement jouable ; captures natives du 21 septembre. Aucun pilote en classe ni validation complète du jeu ne sont revendiqués.

## Visuels

### V4 — le chantier natif

La V4 reprend le monde dans Godot. Ces captures des 21 et 23 septembre montrent l'exploration, les commandes et l'éditeur de jardin, pas un jeu terminé. La progression complète et les essais sur un PC scolaire restent à valider.

![V4 : entrée dans le bourg et commandes du joueur. Capture native de contrôle du 21 septembre 2026, sans données scolaires.](/assets/proof/educool/v4-world-20260921.webp)

![V4 : déplacer et tourner les objets du jardin. Test natif du 23 septembre avec maison et inventaire de démonstration injectés ; ce n'est pas une progression joueur complète.](/assets/proof/educool/v4-garden-20260923.webp)

![V4 : contrôle de l'interface à 390 pixels dans Godot. Ce cadrage ne prouve pas une version mobile distribuée ni un test sur téléphone physique.](/assets/proof/educool/v4-mobile-20260921.webp)

### V3 — la reconstruction locale

Nouvelles vues du build local du 7 septembre 2026, capturées le 8 septembre en mode de prévisualisation de carte. Le code source a encore évolué depuis ce build. Aucun usage en classe ni test humain n'est déduit de ces images.

![V3 : vue du bourg dans le mode de prévisualisation de la carte. Build local du 7 septembre, capture du 8 septembre ; ce n'est pas une session élève.](/assets/proof/educool/v3-map-city-20260908.webp)

![V3 : vue du château dans le même build local, avec la caméra de contrôle de la carte.](/assets/proof/educool/v3-map-castle-20260908.webp)

![V3 : vue d'ensemble du terrain pour situer les zones. Prévisualisation technique, pas validation humaine du jeu.](/assets/proof/educool/v3-map-island-20260908.webp)

### V2 — la boucle 3D déjà jouable

Vues différentes issues des preuves locales d'août 2026 : bourg 3D, organisation du monde et intérieur de maison. Ce sont des archives de la V2, pas une nouvelle recette complète.

![V2 : la place du village et les chemins, capture de contrôle locale du 17 août 2026.](/assets/proof/educool/v2-village-20260817.webp)

![V2 : vue d'ensemble du monde 3D et du HUD, archive locale du 17 août 2026.](/assets/proof/educool/v2-world-20260817.webp)

![V2 : intérieur de maison en 3D dans le scénario de test du 22 août 2026. Aucune donnée d'élève réelle.](/assets/proof/educool/v2-house-20260822.webp)


## Limites

- Preuve privée : code, captures complètes et données de contexte se montrent uniquement sur fixtures anonymisées.
- V2 n'est pas prête pour Internet ; V3 et V4 ne sont pas validées comme pilotes auprès d'enfants.
- Les volumes de tests prouvent le comportement technique, pas l'utilité pédagogique ni l'adoption.
- V2 : Deux PC et une tablette physique, coupure Wi-Fi et audio multi-appareils restent à rejouer ensemble.
- V2 : Le pré-RC reste bloqué par 3 échecs i18n, 20 assets provisoires et une gate online à 87/89.
- V3 : Validation de la direction artistique, test sur appareil enfant modeste et observation de la compréhension par un enfant encore requis.
- V3 : Aucun déploiement, aucune donnée réelle d'enfant et aucun verdict d'usage terrain ne sont revendiqués.
- V4 : La progression complète, les accès aux maisons et plusieurs parcours de sauvegarde restent en chantier.
- V4 : Aucune validation Windows, PC i5/4 Go, enfant ou utilisation en classe n'est déduite de ces captures.
- Compréhension, plaisir et autonomie des enfants : recette terrain non publiée.
- Gain de temps pour l'enseignante : non chiffré publiquement.

## Repères techniques

| Repère | Détail |
| --- | --- |
| Format | Jeu scolaire 3D + outil enseignant |
| Période | Juillet 2026 - en cours |
| Rôle de Jonas | Conception produit, UX, développement full-stack, systèmes de jeu, sécurité, QA |
| Statut | V2 locale · V3 web · V4 en migration vers Godot |
| Niveau de preuve | Preuves privées |
| Stack | Godot, Blender, Three.js, Next.js, Firebase, Firestore, Cloud Functions, TypeScript, Vite, Node.js, Playwright |

## Preuves techniques

### V2

Statut interne : Jouable localement · LOCAL_SINGLE_DEVICE_READY : GO · V2_PRODUCT_COMPLETE et ONLINE_READY : NO-GO.

- État daté du 22/08/2026 avec parcours élève, professeure et banquier rejoués localement.
- HUD, clavier, première mission, guichet et pont Educool contrôlés sur des profils fictifs.
- Le monde 3D vient déjà du fork World of ClaudeCraft ; la V3 n'est pas le passage de la 2D à la 3D.

### V3

Statut interne : Chantier de septembre non validé intégralement ; READY_FOR_HUMAN_RECIPE reste un objectif, pas un statut actuel.

- Sources relues le 23 septembre : le travail de septembre porte notamment sur la carte Blender, le terrain et les commandes à l'écran. La fluidité reste insuffisante dans le contrôle documenté ; aucun verdict global actuel n'est acquis.
- Recette visuelle du 26/08/2026 : trois rôles entrés dans le monde, mouvements réels et 396 placements chargés.
- Dialogues, guichet banquier et télécommande professeure rejoués localement sans requête externe.
- Les compteurs de tests exacts et les anciennes candidates restent hors de l'accroche tant que la gate complète actuelle n'est pas rejouée.

### V4

Statut interne : Chantier Godot séparé ; aucun verdict global de jeu terminé.

- Sources et journaux privés relus le 23 septembre 2026.
- Une candidate Mac restaurée et son entrée dans le monde ont été contrôlées le 21 septembre.
- Captures natives d'interface avec des données de jeu fictives.

## Liens

- [Étude de cas](/projets/educool-la-herse)
