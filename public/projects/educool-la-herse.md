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

État public : Prototype local prêt pour des tests humains.

La V3 est une reconstruction séparée, avec une carte, une architecture et un périmètre plus larges. Ses parcours locaux fonctionnent, mais elle doit encore être comprise, éprouvée et jugée par des humains.

## Ce que Jonas a fait

- V2 : prototype local à architecture multijoueur, validé sur un appareil avec trois rôles, quêtes, maisons, mini-jeux et pont Educool/Firebase.
- V3 : monde 3D, économie centicool serveur, 22 zones, marchands, PNJ et maisons complètes.
- Interface Educool : authentification, rôles, règles Firestore, Cloud Functions et suivi scolaire.
- Harnais de tests, preuves responsive, manifestes de candidate et scripts de démarrage/arrêt locaux.

## Ce que ça prouve

La V2 permet déjà de vivre la boucle 3D sur un appareil. La V3 élargit le projet, mais aucune efficacité pédagogique ni utilisation en classe n'est encore revendiquée.

- Partir d'un besoin réel de classe, construire une expérience testable, puis séparer clairement ce qui fonctionne de ce qui reste à valider.
- Relier le jeu, les trois rôles, Firebase, la sécurité et les tests.
- Dire clairement ce qui fonctionne et ce qui reste bloqué avant un pilote.

Preuves privées et datées : état V2 vérifié le 22/08/2026 ; parcours visuels V3 rejoués le 26/08/2026. Les captures publiées sont des écrans de démonstration sans donnée de mineur.

## Visuels

### V3 — la reconstruction locale

Captures réelles du 26 août 2026 avec des profils de démonstration. Elles montrent les trois rôles et des interactions rejouées localement, pas une validation en classe.

![V3 : l'élève entre dans le bourg, découvre sa première quête et apprend à déplacer la caméra.](/assets/proof/educool/cool-bank-v3-world-20260826.webp)

![V3 : élève, banquier et professeure entrent avec des responsabilités différentes.](/assets/proof/educool/cool-bank-v3-roles.webp)

![V3 : l'élève peut choisir une question ou écrire la sienne à un personnage du bourg.](/assets/proof/educool/cool-bank-v3-dialogue.webp)

![V3 : le guichet du banquier guide l'opération et affiche une limite de transaction.](/assets/proof/educool/cool-bank-v3-banker.webp)

![V3 : la professeure peut bloquer le monde, couper les échanges et rouvrir l'expérience.](/assets/proof/educool/cool-bank-v3-teacher.webp)

### V2 — la boucle 3D déjà jouable

La V2 est déjà un monde 3D multijoueur. Ces écrans prouvent la boucle locale sur un appareil ; ils ne doivent jamais être présentés comme une ancienne version 2D.

![V2 : monde 3D, personnages, HUD et économie visibles dans la boucle locale jouable.](/assets/proof/educool/cool-bank-v2-world.webp)

![V2 : le maire donne une mission qui relie le déplacement dans le bourg à l'économie de classe.](/assets/proof/educool/cool-bank-v2-dialogue.webp)

![V2 : le guichet banquier encadre le camarade, le motif, le montant et le registre du jour.](/assets/proof/educool/cool-bank-v2-banker.webp)

![V2 : la télécommande donne à l'enseignante les commandes de classe sans afficher de donnée d'élève.](/assets/proof/educool/cool-bank-v2-teacher.webp)


## Limites

- Preuve privée : code, captures complètes et données de contexte se montrent uniquement sur fixtures anonymisées.
- V2 n'est pas prête pour Internet ; V3 n'est pas validée comme pilote local auprès d'enfants.
- Les volumes de tests prouvent le comportement technique, pas l'utilité pédagogique ni l'adoption.
- V2 : Deux PC et une tablette physique, coupure Wi-Fi et audio multi-appareils restent à rejouer ensemble.
- V2 : Le pré-RC reste bloqué par 3 échecs i18n, 20 assets provisoires et une gate online à 87/89.
- V3 : Validation de la direction artistique, test sur appareil enfant modeste et observation de la compréhension par un enfant encore requis.
- V3 : Aucun déploiement, aucune donnée réelle d'enfant et aucun verdict d'usage terrain ne sont revendiqués.
- Compréhension, plaisir et autonomie des enfants : recette terrain non publiée.
- Gain de temps pour l'enseignante : non chiffré publiquement.

## Repères techniques

| Repère | Détail |
| --- | --- |
| Format | Jeu scolaire 3D + outil enseignant |
| Période | Juillet - août 2026 |
| Rôle de Jonas | Conception produit, UX, développement full-stack, systèmes de jeu, sécurité, QA |
| Statut | V2 jouable localement sur un appareil · V3 en recette humaine |
| Niveau de preuve | Démo privée |
| Stack | Three.js, Next.js, Firebase, Firestore, Cloud Functions, TypeScript, Vite, Node.js, Playwright |

## Preuves techniques

### V2

Statut interne : Jouable localement · LOCAL_SINGLE_DEVICE_READY : GO · V2_PRODUCT_COMPLETE et ONLINE_READY : NO-GO.

- État daté du 22/08/2026 avec parcours élève, professeure et banquier rejoués localement.
- HUD, clavier, première mission, guichet et pont Educool contrôlés sur des profils fictifs.
- Le monde 3D vient déjà du fork World of ClaudeCraft ; la V3 n'est pas le passage de la 2D à la 3D.

### V3

Statut interne : READY_FOR_HUMAN_RECIPE (dernier verdict documenté) · gate complète actuelle à rejouer · aucun pilote revendiqué.

- Recette visuelle du 26/08/2026 : trois rôles entrés dans le monde, mouvements réels et 396 placements chargés.
- Dialogues, guichet banquier et télécommande professeure rejoués localement sans requête externe.
- Les compteurs de tests exacts et les anciennes candidates restent hors de l'accroche tant que la gate complète actuelle n'est pas rejouée.

## Liens

- [Étude de cas](/projets/educool-la-herse)
