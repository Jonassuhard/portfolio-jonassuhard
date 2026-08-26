# Cool Bank / La Herse - du jeu local V2 au monde 3D V3

## Repères

| Repère | Détail |
| --- | --- |
| Format | Jeu scolaire multijoueur + interface métier |
| Période | Juillet - août 2026 |
| Rôle de Jonas | Conception produit, UX, développement full-stack, systèmes de jeu, sécurité, QA |
| Statut | V2 jouable localement · V3 prête pour recette humaine |
| Niveau de preuve | Démo privée |
| Stack | Next.js, Firebase, Firestore, Cloud Functions, TypeScript, Vite, Node.js, Playwright |

## À quoi ça sert

Cool Bank transforme une banque scolaire en jeu multijoueur relié à Educool. La V2 est jouable localement. La V3 ajoute un monde 3D, mais attend encore une recette humaine.

## Ce que Jonas a fait

- V2 : jeu local multijoueur, trois rôles, quêtes, maisons, mini-jeux et pont Educool/Firebase.
- V3 : monde 3D, économie centicool serveur, 22 zones, marchands, PNJ et maisons complètes.
- Interface Educool : authentification, rôles, règles Firestore, Cloud Functions et suivi scolaire.
- Harnais de tests, preuves responsive, manifestes de candidate et scripts de démarrage/arrêt locaux.

## Ce que ça prouve

La V2 se joue déjà sur un appareil. La V3 fonctionne techniquement, mais doit encore être testée par des humains avant tout pilote.

- Faire évoluer un produit complexe sans mélanger les preuves de la V2 et de la V3.
- Relier le jeu, les trois rôles, Firebase, la sécurité et les tests.
- Dire clairement ce qui fonctionne et ce qui reste bloqué avant un pilote.

Preuves privées et datées : état V2 vérifié le 22/08/2026, candidate V3 vérifiée le 06/08/2026. Démonstrations et captures uniquement sur données fictives ; aucune donnée de mineur n'est publiée.

### Versions

#### V2 — Jeu local multijoueur relié à Educool

| Repère | Détail |
| --- | --- |
| État actuel | Jouable localement · LOCAL_SINGLE_DEVICE_READY : GO · V2_PRODUCT_COMPLETE et ONLINE_READY : NO-GO |

Version web locale avec parcours élève, professeure et banquier, maisons, quêtes, économie et interface Educool reliée à Firebase.

##### Éléments vérifiés

- État du 22/08/2026 : 12 123 tests réussis sur 12 148, 11 échecs et 14 ignorés ; les 3 échecs stables restants concernent l'i18n.
- Educool : 645/645 tests, TypeScript vert et build Next de 42 pages réussi.
- Parcours navigateur élève, professeure et banquier rejoués ; HUD, clavier et premier choix : 18/18.

#### V3 — Monde 3D et économie centicool serveur

| Repère | Détail |
| --- | --- |
| État actuel | Prête pour recette humaine · READY_FOR_HUMAN_RECIPE · GO_PILOTE_LOCAL : en attente |

Version 3D plus ambitieuse avec 22 zones, trois rôles, économie serveur, maisons, marchands, lecture écrite et interface Educool locale.

##### Éléments vérifiés

- Game : gate 9/9, 12 064 tests réussis et 14 ignorés ; Control : 383/383 ; Product/UI Kit : 333/333.
- Educool : 735 tests unitaires, 162 tests de règles Auth/Firestore et 174 tests Functions, avec builds Next et Node 20 réussis.
- Candidate restaurable 20260806_FINAL_RECIPE : 9 ZIP et 97 259 entrées extraites et vérifiées.


## Visuels

![Interface Educool liée au système : tableau de bord sur données fictives, sans identité d'enfant publiée.](/assets/proof/educool/educool-dashboard.webp)

![Saisie des progressions : matrice de classe anonymisée, commune au contexte métier de Cool Bank.](/assets/proof/educool/educool-saisie-ceintures.webp)

![Exports pédagogiques : aperçu et génération PDF/ZIP depuis l'interface scolaire associée.](/assets/proof/educool/educool-livrets.webp)

![Marché de Cool Bank V2 lancé localement sur des données de démonstration fictives.](/assets/proof/educool/cool-bank-v2-market.webp)

![Schéma des deux versions : V2 relie le jeu web à Educool ; V3 sépare le monde 3D, les contrôles et l'interface scolaire.](/assets/proof/educool/cool-bank-v2-v3-worldline.webp)


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

## Liens

- [Étude de cas](/projets/educool-la-herse)
