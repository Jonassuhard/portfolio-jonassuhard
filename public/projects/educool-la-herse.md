# Cool Bank - donner vie à une banque de classe

## À quoi ça sert

Une banque de classe transformée en jeu 3D multijoueur : les élèves gagnent des cools, les placent à la banque et font grandir leur maison, pendant que l'enseignante garde la main sur la partie.

## Rendre l'argent et la responsabilité plus concrets.

La banque existait déjà dans la classe. Le projet lui donne des lieux, des personnages et des conséquences visibles, sans transformer l'outil de l'enseignante en jeu.

- Les élèves gagnent des cools et des centicools avec des quêtes, les placent à la banque, achètent un terrain et font grandir leur maison : tente, cabane, maison, puis manoir.
- Onze ceintures de progression, des habitants qui parlent, un marché, une mine, la pêche et le vol donnent au bourg une vie quotidienne, dans l'esprit de la classe coopérative de Freinet et Oury.
- Un serveur de classe réunit jusqu'à 30 élèves dans la même partie. L'enseignante peut geler le monde, rappeler tout le monde ou couper le chat, et l'économie reste reliée à Educool.

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

### V4 — Le jeu de la classe dans Godot

État public : Version en cours, testée au banc, non finalisée.

La V4 est le jeu en cours, refait dans Godot 4.6.2 : quêtes, banque, terrains, maisons, ceintures, habitants, marché, mine, pêche et vol. Un serveur de classe réunit jusqu'à 30 élèves, avec les commandes de l'enseignante et le lien avec Educool. Le jeu est construit à la main avec plusieurs agents Claude coordonnés, un ticket et une preuve par correctif.

## Ce que Jonas a fait

- V4 : jeu Godot avec quêtes, banque, terrains, maisons, 11 ceintures, habitants, marché, mine, pêche et vol ; serveur de classe jusqu'à 30 élèves ; commandes de l'enseignante ; lien avec Educool.
- V4 : banc multijoueur de 21 scénarios, profil « vieil iPad », lanceur avec mises à jour et réparation, site privé de la classe.
- V2 : prototype local à architecture multijoueur, validé sur un appareil avec trois rôles, quêtes, maisons, mini-jeux et pont Educool/Firebase.
- V3 : monde 3D, économie fictive, marchands et maisons présents dans les versions précédentes ; intégration actuelle encore en validation.
- Interface Educool : authentification, rôles, règles Firestore, Cloud Functions et suivi scolaire.
- Harnais de tests, preuves responsive, manifestes de candidate et scripts de démarrage/arrêt locaux.

## Ce que ça prouve

La V4 réunit une classe entière dans un jeu Godot, avec un multijoueur testé au banc comme dans un studio (mauvais réseau, charge, triche). V2 et V3 restent des archives. Aucune efficacité pédagogique ni utilisation en classe n'est revendiquée.

- Partir d'un besoin réel de classe, construire une expérience testable, puis séparer clairement ce qui fonctionne de ce qui reste à valider.
- Coordonner plusieurs agents Claude sur un même jeu : une session cheffe, un seul écrivain par fichier, un ticket et une preuve courte par correctif.
- Tester un multijoueur à la manière des studios : mauvais réseau, arrivée en rafale, triche, puis corriger à la cause.
- Dire clairement ce qui fonctionne et ce qui reste bloqué avant un pilote.

Sources relues le 5 novembre 2026 : journaux de tickets, banc multijoueur, mesures du profil iPad et du lanceur. La V4 est le jeu en cours ; V2 et V3 restent des archives avec leurs propres preuves. Le site du jeu est privé et fermé par un code de classe ; le téléchargement n'y est pas encore ouvert. Aucun pilote en classe ni résultat pédagogique ne sont revendiqués.

## Visuels

### V4 — le jeu de la classe dans Godot

Captures natives du 5 novembre 2026 sur des profils de démonstration : la banque, le profil allégé pour les vieux iPad et le site privé de la classe. Elles montrent le jeu en cours, pas une version finale ni un usage en classe.

![V4 : le compte de l'élève à la banque, ses cools et le bureau de change. Habitante et soldes fictifs, capture native du 5 novembre 2026.](/assets/proof/educool/v4-banque-20261105.webp)

![V4 : même point de vue en profil PC (à gauche) et en profil « vieil iPad » (à droite). Le profil retire environ 70 % des appels de dessin ; les budgets de l'iPad Air 2 ne sont pas encore atteints.](/assets/proof/educool/v4-ipad-profil-20261105.webp)

![Le site privé du jeu, fermé par un code de classe. Page d'accueil capturée en local le 5 novembre 2026 ; le téléchargement n'est pas encore ouvert.](/assets/proof/educool/v4-site-classe-20261105.webp)

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
- Les mesures V4 viennent de bancs techniques avec des élèves simulés, pas d'une séance réelle en classe.
- Les volumes de tests prouvent le comportement technique, pas l'utilité pédagogique ni l'adoption.
- V2 : Deux PC et une tablette physique, coupure Wi-Fi et audio multi-appareils restent à rejouer ensemble.
- V2 : Le pré-RC reste bloqué par 3 échecs i18n, 20 assets provisoires et une gate online à 87/89.
- V3 : Validation de la direction artistique, test sur appareil enfant modeste et observation de la compréhension par un enfant encore requis.
- V3 : Aucun déploiement, aucune donnée réelle d'enfant et aucun verdict d'usage terrain ne sont revendiqués.
- V4 : Trois scénarios échouent encore : les habitants et l'heure du jeu ne sont pas identiques d'un PC à l'autre (correctif en cours). Le test d'endurance de 2 heures est prévu, pas encore joué.
- V4 : Le profil iPad reste 2,7 à 2,9 fois au-dessus du budget d'appels de dessin et ne réduit pas encore la mémoire ; aucun essai sur un vrai iPad.
- V4 : Lanceur non essayé sur les PC de la classe ; téléchargement pas encore ouvert sur le site.
- Compréhension, plaisir et autonomie des enfants : recette terrain non publiée.
- Gain de temps pour l'enseignante : non chiffré publiquement.

## Repères techniques

| Repère | Détail |
| --- | --- |
| Format | Jeu scolaire 3D multijoueur (Godot) + outil enseignant |
| Période | Juillet 2026 - en cours |
| Rôle de Jonas | Conception produit, UX, développement Godot et serveur, systèmes de jeu, orchestration d'agents IA, QA |
| Statut | V4 Godot en cours · multijoueur de classe testé au banc · site privé de la classe |
| Niveau de preuve | Preuves privées |
| Stack | Godot 4.6, GDScript, Blender, Python, Educool, Firebase, Vercel, TypeScript, Three.js, Next.js, Playwright |

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

Statut interne : Version actuelle ; aucun verdict global de jeu terminé ni pilote en classe.

- Banc multijoueur du 5 novembre 2026 : 18 scénarios sur 21 passent (30 élèves connectés en 15,1 s, coupure réseau de 10 s, 10 % de pertes, doublons, triche, ordres de l'enseignante reçus en moins de 400 ms par 23 élèves).
- Profil « vieil iPad » mesuré sur Mac aux 6 points les plus chargés : environ 70 % d'appels de dessin et 55 % de triangles en moins.
- Lanceur avec mises à jour et réparation : 15 contrôles sur 15 passent sur Mac.

## Liens

- [Étude de cas](/projets/educool-la-herse)
- [Site du jeu (privé, code de classe)](https://cool-bank-v4.vercel.app)
