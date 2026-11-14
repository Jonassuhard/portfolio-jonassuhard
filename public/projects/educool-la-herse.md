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

Sources relues le 14 novembre 2026 : suivi des tickets, journal des versions, bilan de la version 0.3.1, banc multijoueur du 5 novembre et mesure sur un poste d'élève. La V4 est le jeu en cours ; V1, V2 et V3 restent des archives. Le jeu et son site sont réservés à la classe. Tous les élèves visibles dans les images sont inventés. Aucun résultat pédagogique n'est revendiqué.

## Visuels

### V4, le jeu de la classe dans Godot

Captures natives du 5 novembre 2026 sur des profils de démonstration : la banque, le profil allégé pour les vieux iPad et le site privé de la classe. Elles montrent le jeu en cours, pas une version finale ni un usage en classe.

![V4 : le compte de l'élève à la banque, ses cools et le bureau de change. Habitante et soldes fictifs, capture native du 5 novembre 2026.](/assets/proof/educool/v4-banque-20261105.webp)

![V4 : même point de vue en profil PC (à gauche) et en profil « vieil iPad » (à droite). Le profil retire environ 70 % des appels de dessin ; les budgets de l'iPad Air 2 ne sont pas encore atteints.](/assets/proof/educool/v4-ipad-profil-20261105.webp)

![Le site privé du jeu, fermé par un code de classe. Page d'accueil capturée en local le 5 novembre 2026 ; le téléchargement n'est pas encore ouvert.](/assets/proof/educool/v4-site-classe-20261105.webp)

### V3, la reconstruction locale

Nouvelles vues du build local du 7 septembre 2026, capturées le 8 septembre en mode de prévisualisation de carte. Le code source a encore évolué depuis ce build. Aucun usage en classe ni test humain n'est déduit de ces images.

![V3 : vue du bourg dans le mode de prévisualisation de la carte. Build local du 7 septembre, capture du 8 septembre ; ce n'est pas une session élève.](/assets/proof/educool/v3-map-city-20260908.webp)

![V3 : vue du château dans le même build local, avec la caméra de contrôle de la carte.](/assets/proof/educool/v3-map-castle-20260908.webp)

![V3 : vue d'ensemble du terrain pour situer les zones. Prévisualisation technique, pas validation humaine du jeu.](/assets/proof/educool/v3-map-island-20260908.webp)

### V2, la boucle 3D déjà jouable

Vues différentes issues des preuves locales d'août 2026 : bourg 3D, organisation du monde et intérieur de maison. Ce sont des archives de la V2, pas une nouvelle recette complète.

![V2 : la place du village et les chemins, capture de contrôle locale du 17 août 2026.](/assets/proof/educool/v2-village-20260817.webp)

![V2 : vue d'ensemble du monde 3D et du HUD, archive locale du 17 août 2026.](/assets/proof/educool/v2-world-20260817.webp)

![V2 : intérieur de maison en 3D dans le scénario de test du 22 août 2026. Aucune donnée d'élève réelle.](/assets/proof/educool/v2-house-20260822.webp)


## Limites

- Preuve privée : code, captures complètes et données de contexte se montrent uniquement sur fixtures anonymisées.
- V2 n'est pas prête pour Internet ; V3 n'a jamais été validée auprès d'enfants ; aucune mesure d'usage en classe n'est publiée pour la V4.
- Les mesures V4 viennent de bancs techniques avec des élèves simulés, pas d'une séance réelle en classe.
- Les volumes de tests prouvent le comportement technique, pas l'utilité pédagogique ni l'adoption.
- V2 : Deux PC et une tablette physique, coupure Wi-Fi et audio multi-appareils restent à rejouer ensemble.
- V2 : Le pré-RC reste bloqué par 3 échecs i18n, 20 assets provisoires et une gate online à 87/89.
- V3 : Validation de la direction artistique, test sur appareil enfant modeste et observation de la compréhension par un enfant encore requis.
- V3 : Aucun déploiement, aucune donnée réelle d'enfant et aucun verdict d'usage terrain ne sont revendiqués.
- V4 : Trois scénarios échouent encore : les habitants et l'heure du jeu ne sont pas identiques d'un PC à l'autre (correctif en cours). Le test d'endurance de 2 heures est prévu, pas encore joué.
- V4 : Le profil iPad reste 2,7 à 2,9 fois au-dessus du budget d'appels de dessin et ne réduit pas encore la mémoire ; aucun essai sur un vrai iPad.
- V4 : Sur un poste d'élève, le jeu reste lent dehors (11 à 13 images par seconde le 14 novembre 2026) et le premier chargement prend neuf minutes.
- Compréhension, plaisir et autonomie des enfants : recette terrain non publiée.
- Gain de temps pour l'enseignante : non chiffré publiquement.

## Repères techniques

| Repère | Détail |
| --- | --- |
| Format | Jeu scolaire 3D multijoueur (Godot) + outil enseignant |
| Période | Depuis juin 2026, en cours |
| Rôle de Jonas | Conception du jeu, direction, pilotage d'agents IA, tests, mises en ligne |
| Statut | V4 dans Godot, version 0.3.1 du 13 novembre 2026, installée sur des ordinateurs de l'école |
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

## Fiche du jeu

Cool Bank est un jeu en 3D pour une classe de CM1-CM2. Les élèves y gagnent la monnaie de leur classe, la déposent à la banque et font grandir leur maison sur une île.

- Genre. Jeu de vie et de gestion en 3D, à jouer seul ou avec sa classe
- Pour qui. Une classe de CM1-CM2, des élèves de 9 à 11 ans, et leur enseignante
- Mon rôle. Conception du jeu, direction, pilotage des agents IA qui écrivent le code, tests, mises en ligne
- Équipe. Moi, avec plusieurs sessions d'agents IA qui travaillent en parallèle
- Durée. Depuis juin 2026 pour la première version. La V4 a commencé le 17 octobre 2026.
- Moteur et outils. Godot 4.6, GDScript, Blender, Python, Firebase, Vercel
- Plateformes. Windows 64 bits, Windows 32 bits pour les vieux PC, Mac
- Version. 0.3.1, publiée le 13 novembre 2026

## Les quatre piliers du jeu.

- L'argent se voit. Un élève qui économise finit par acheter une tente, puis une maison. Celui qui dépense tout reste sur son terrain vide. Personne n'a besoin de lui expliquer.
- La classe ouvre le jeu. Les ceintures passées en classe décident des quêtes et des questions du jeu. Ce qu'on apprend le matin sert l'après-midi.
- La maîtresse garde la main. Elle suit sa classe depuis son propre outil et peut ajouter des cools à un élève. Entre élèves, il n'y a pas de messages libres. Ils choisissent des phrases polies et des gestes.
- Ça doit tourner à l'école. Les ordinateurs de la classe ont plus de dix ans. Un jeu qui rame sur ces machines ne sert à rien, même s'il est beau sur la mienne.

## L'histoire en quatre versions.

J'ai refait Cool Bank trois fois. Je garde les anciennes versions sur cette page parce qu'elles expliquent la dernière.

### V1, La banque de classe en site web (Juin 2026)

La première version était un site. L'élève y voyait son solde, ses onze ceintures de la rose à la dorée, une boutique d'avatars, les métiers de la classe, les amendes et les enchères.
C'était un outil de gestion, sans monde à explorer.

Ce que j'en garde. La monnaie, les onze ceintures et leurs animations.


### V2, Le premier monde en 3D (Juillet et août 2026)

J'ai mis la banque dans un village en 3D, joué dans le navigateur. Trois rôles y existaient déjà, l'élève, le banquier (un élève qui tient le guichet) et l'enseignante.
La boucle se jouait sur un seul appareil, avec des profils de démonstration. Elle n'a jamais été prête pour Internet.

Ce que j'en garde. Les trois rôles, les maisons et le lien avec l'outil de l'enseignante.

![V2, la place du village. Capture de contrôle du 17 août 2026.](/assets/proof/educool/v2-village-20260817.webp)
![V2, le monde vu de haut avec l'interface du joueur. Archive du 17 août 2026.](/assets/proof/educool/v2-world-20260817.webp)
![V2, l'intérieur d'une maison dans le scénario de test du 22 août 2026.](/assets/proof/educool/v2-house-20260822.webp)

### V3, La reconstruction, plus grande (Août et septembre 2026)

J'ai tout reconstruit avec une carte plus large, dessinée dans Blender, et des interfaces refaites.
Le jeu restait dans le navigateur et la fluidité ne suivait pas. Sur un vieux PC, un monde de cette taille dans une page web, ça ne tient pas.

Ce que j'en garde. Une leçon surtout. Un monde de cette taille demande un vrai moteur de jeu.

![V3, le bourg vu par la caméra de contrôle. Build du 7 septembre 2026.](/assets/proof/educool/v3-map-city-20260908.webp)
![V3, le château dans le même build.](/assets/proof/educool/v3-map-castle-20260908.webp)
![V3, le terrain entier pour situer les zones.](/assets/proof/educool/v3-map-island-20260908.webp)

### V4, Le jeu de la classe, dans Godot (Depuis le 17 octobre 2026)

J'ai quitté le navigateur pour un vrai moteur de jeu, Godot. Le jeu s'installe sur l'ordinateur, se met à jour tout seul et se joue seul ou avec la classe.
C'est la version en cours. Huit versions sont sorties entre le 5 et le 13 novembre 2026.

Ce que j'en garde. Tout ce qui précède, dans un moteur fait pour ça. La suite de la page la raconte étape par étape.

![V4, la place du marché et l'interface du joueur. Profil de démonstration, capture du 5 novembre 2026.](/assets/proof/educool/v4-bourg-20261105.webp)

## La V4, étape par étape.

Pour chaque étape, je note ce qui coinçait et ce que j'ai fait. Les images viennent des essais du jeu. Tous les élèves qu'on y voit sont inventés.

### Le monde (Octobre et début novembre 2026)

Le problème. L'île existait, mais elle paraissait vide et figée. L'herbe était faite de cartes plates, le jeu se figeait pendant qu'il construisait le décor.

Ce que j'ai fait. J'ai refait l'herbe en vrais brins. Ils bougent avec le vent et se couchent quand on marche dedans, avec une herbe différente pour la prairie, la forêt, le bord de l'eau ou la plage. Une journée dure dix minutes, la nuit cinq.

La nouvelle herbe est sortie dans la version 0.2.1 du 7 novembre.

[Vidéo. L'herbe du pré fleuri, en brins séparés qui suivent le vent. Essai du 7 novembre 2026.](/assets/video/coolbank-herbe-20261107.mp4)

### Les habitants et leurs réponses (Fin octobre et novembre 2026)

Le problème. Un village sans personne, ça ne donne pas envie de rester. Et des habitants qui répètent trois phrases lassent vite.

Ce que j'ai fait. Le bourg compte 19 habitants. Chacun a son métier, son apparence et sa façon de parler. L'élève peut écrire une question, une intelligence artificielle écrit la réponse, courte et filtrée pour des enfants.

Les détails comptent aussi. Le collier du maire était droit au lieu de faire le tour de son cou. C'est un ticket comme un autre, avec sa capture avant et sa capture après.

![Avant, le collier du maire flotte en ligne droite devant lui.](/assets/proof/educool/v4-collier-avant-20261114.webp)
![Après, il fait le tour de son cou sous tous les angles. Planches du 14 novembre 2026.](/assets/proof/educool/v4-collier-apres-20261114.webp)

### L'argent et la banque de classe (Novembre 2026)

Le problème. La monnaie de la classe existe en vrai, sur papier. Le jeu ne devait ni la remplacer ni la mélanger avec ce qu'on gagne en jouant.

Ce que j'ai fait. Un cool vaut 100 centicools et les cools sont des cartes de cinq valeurs. Ceux gagnés en classe et ceux gagnés en jeu sont comptés à part. L'écran « Mon compte » réunit l'argent, l'épargne et le mois à payer.

![Le compte de l'élève à la banque, avec le bureau de change. Habitante et soldes inventés, capture du 5 novembre 2026.](/assets/proof/educool/v4-banque-20261105.webp)

### Les logements (Novembre 2026)

Le problème. J'ai filmé l'achat d'un logement à deux joueurs sur deux appareils. Les vidéos ont montré dix défauts que je n'avais pas vus en jouant seul, par exemple une maison impossible à décorer au clavier.

Ce que j'ai fait. Je les ai corrigés un par un. L'élève achète une tente pour 200 à 300 centicools, puis l'agrandit en maison simple, grande maison et maison double. Son camarade voit la maison se monter et le nom de son propriétaire au-dessus.

[Vidéo. Deux appareils côte à côte. À gauche l'élève qui agrandit sa maison, à droite ce que voit son camarade. Essai du 14 novembre 2026.](/assets/video/coolbank-maison-duo-20261114.mp4)

### Le lien avec l'outil de l'enseignante (Novembre 2026)

Le problème. Au début, l'argent et la progression vivaient dans un fichier sur chaque ordinateur. Un élève qui changeait de poste repartait de zéro.

Ce que j'ai fait. Le jeu lit la liste de la classe dans l'outil de l'enseignante, avec le prénom, l'initiale du nom, le niveau et les ceintures. Il lui renvoie un résumé de la partie. Le compte et la sauvegarde suivent maintenant l'élève.

Le jeu ne reçoit ni nom de famille, ni adresse, ni photo.


### La classe en ligne (Novembre 2026)

Le problème. Un essai à deux postes ne dit rien d'une classe de trente. Je ne voulais pas découvrir les pannes le jour de la séance.

Ce que j'ai fait. J'ai écrit un banc de 21 situations de classe, avec trente élèves simulés, une coupure de réseau de dix secondes, des messages perdus et de la triche. Le serveur garde seul le compte de l'argent.

Le 5 novembre, 18 situations sur 21 passaient et les trente élèves entraient dans la partie en 15,1 secondes. Les trois autres concernaient l'heure du jeu et la place des habitants, qui différaient d'un poste à l'autre.

[Vidéo. Une classe d'essai dans le château des maths. La salle du cristal a cinq places, le sixième attend son tour. Élèves inventés, essai du 14 novembre 2026.](/assets/video/coolbank-classe-chateau-20261114.mp4)

### Le lanceur et les mises à jour (Novembre 2026)

Le problème. La version 0.2.0 est partie sans les habitants ni les ceintures. Les modèles étaient bien dans le projet, mais l'export ne les embarquait pas.

Ce que j'ai fait. J'ai corrigé les 86 fichiers concernés et ajouté un contrôle du paquet avant chaque version. Un lanceur installe le jeu, le met à jour, vérifie les fichiers et sait le réparer sans toucher aux sauvegardes.


### Les châteaux et les cristaux (14 novembre 2026)

Le problème. Les quêtes rapportaient de l'argent, mais rien ne donnait envie de réviser ses tables. Il manquait un défi qui revienne chaque jour.

Ce que j'ai fait. Il y a trois châteaux, un par matière, et celui des maths ouvre en premier. Dans la salle du cristal, l'élève reçoit une question par ceinture, de la rose à la dorée, avec 60 secondes pour répondre. Une bonne réponse rapporte des centicools. À la première erreur, le cristal le renvoie dehors avec ses gains et le château rouvre le lendemain.

Le meilleur de la classe s'assoit sur le trône avec une couronne à la couleur de sa ceinture. Les châteaux sont prêts et testés, pas encore dans la version publiée.

[Vidéo. Les onze cristaux, un par ceinture. Les effets grossissent jusqu'au cristal doré. Essai du 14 novembre 2026.](/assets/video/coolbank-cristaux-20261114.mp4)
[Vidéo. Une mauvaise réponse. Le cristal tremble, repousse le joueur et la fenêtre donne la bonne réponse.](/assets/video/coolbank-expulsion-20261114.mp4)
[Vidéo. Les onze couronnes qui tombent sur la tête du champion, de la rose à la dorée.](/assets/video/coolbank-couronnes-20261114.mp4)
![La planche des onze cristaux qui m'a servi à comparer les effets d'un seul coup d'œil.](/assets/proof/educool/v4-cristaux-20261114.webp)

### La fiche des élèves (13 et 14 novembre 2026)

Le problème. Un enfant de neuf ans ne lit pas une notice. Il lui faut les touches et les premières étapes sous les yeux, à côté du clavier.

Ce que j'ai fait. J'ai fait un guide d'une seule page à imprimer, avec les dix étapes dans l'ordre, les touches dessinées et quoi faire si ça bloque.

![Le guide d'une page distribué aux élèves. La carte « Qui es-tu ? » montre des élèves de test.](/assets/proof/educool/v4-guide-eleves-20261114.webp)

### Les sons (Octobre et novembre 2026)

Le problème. Mon premier retour sur le jeu, le 25 octobre, a été de couper tous les bruits et de garder la musique.

Ce que j'ai fait. J'ai repris les sons un par un. 116 sons ont été fabriqués pour les cristaux, la couronne et les actions du jeu. J'ai validé le premier lot à l'oreille, les autres attendent.


## Le vrai test, sur un ordinateur de l'école.

Le 14 novembre, j'ai mesuré le jeu sur un poste d'élève, un PC de bureau avec 4 Go de mémoire et une puce graphique intégrée de 2013. Le jeu choisit seul un profil allégé sur ces machines.

| Endroit du jeu | Images par seconde | Moments les plus lents |
|---|---|---|
| La place du bourg | 11,3 | 9,0 |
| Devant le château des maths | 13,5 | 11,3 |
| La salle du trône | 22,2 | 20,0 |
| La salle du cristal, cristal rose | 25,1 | 23,3 |
| La salle du cristal, cristal doré | 24,1 | 22,4 |

Dans les salles, ça se joue. Dehors, c'est encore lent, et le tout premier chargement prend neuf minutes sur ce poste. Aucune erreur de script pendant la mesure. C'est le chantier en cours.

## Comment je travaille avec des agents IA.

- Un ticket par demande. Chaque retour devient une ligne numérotée. Le compteur en est à 732. Quand je dis « le collier du maire est droit », ça devient le ticket 730.
- Une preuve avant de dire « fait ». Une capture avant, une capture après, un journal. Un test qui passe ne veut pas dire que j'ai validé. Les deux statuts sont séparés dans le suivi et moi seul donne le second.
- Des sessions en parallèle. Plusieurs agents travaillent en même temps, chacun sur son lot. Une session cheffe tient le suivi et relit les preuves. Un seul agent écrit un fichier à la fois.
- Un regard neuf. Je fais jouer le jeu par une session qui ne l'a jamais vu. Elle note ce qu'un enfant ne comprendrait pas, sans rien savoir de ce que j'ai voulu faire.

## Les chiffres, avec leur source.

- 1 132 commits dans le dépôt du jeu, du 17 octobre au 14 novembre 2026 (source : historique git)
- 732 tickets numérotés depuis l'audit du 25 octobre 2026 (source : suivi des tickets)
- 8 versions publiées entre le 5 et le 13 novembre (source : journal des versions)
- 19 habitants dans le bourg (source : fiche publique du jeu)
- 11 ceintures, de la rose à la dorée (source : fiche publique du jeu)
- 206 modèles 3D dans le paquet Windows de la 0.3.1 (source : bilan de la version)
- 116 sons fabriqués pour le jeu (source : suivi des tickets)
- 3 paquets par version : Windows 64 bits, 32 bits et Mac (source : bilan de la version)

## Mes leçons de ce projet.

- Mesurer sur la machine de l'utilisateur. Sur mon Mac, tout allait bien. Sur le poste de l'école, la place tournait à 11 images par seconde. Je mesure maintenant là-bas avant de publier.
- Filmer plutôt que raconter. L'essai filmé des logements a montré dix défauts. Aucun compte rendu écrit ne les avait signalés.
- Refaire coûte cher. Trois reconstructions en cinq mois, c'est beaucoup. Chaque fois j'ai gardé ce qui marchait, la monnaie, les ceintures, la carte. J'aurais gagné du temps en choisissant un vrai moteur de jeu plus tôt.
- Un agent qui dit « fait » n'a rien prouvé. Tant que je n'ai pas vu la capture, le ticket reste ouvert. La version partie sans ses habitants m'a servi de rappel.

## La suite du chantier.

- Rendre le jeu fluide dehors sur les ordinateurs de l'école et raccourcir le premier chargement.
- Publier les châteaux, puis brancher tous les sons.
- Rejouer le banc de la classe en ligne au complet, puis une séance de deux heures.
- Finir la version tablette, encore en essai.
- Mesurer ce que les élèves comprennent et retiennent. Aujourd'hui, je n'ai aucun chiffre là-dessus et je n'en avance aucun.
