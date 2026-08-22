# Cool Bank / La Herse - du jeu local V2 au monde 3D V3

Type : Jeu scolaire multijoueur + interface métier.
Période : Juillet - août 2026.
Rôle : Conception produit, UX, développement full-stack, systèmes de jeu, sécurité, QA.
Stack : Next.js, Firebase, Firestore, Cloud Functions, TypeScript, Vite, Node.js, Playwright.
Statut : V2 : LOCAL_SINGLE_DEVICE_READY · V3 : READY_FOR_HUMAN_RECIPE.
Niveau de preuve : Démo privée.

En bref : Deux versions d'un même système scolaire : V2 jouable localement et V3 techniquement prête pour recette humaine, avec preuves et limites séparées.

Preuves : Preuves privées et datées : état V2 vérifié le 22/08/2026, candidate V3 vérifiée le 06/08/2026. Démonstrations et captures uniquement sur données fictives ; aucune donnée de mineur n'est publiée.

## Versions

### V2 — Jeu local multijoueur relié à Educool

Statut : LOCAL_SINGLE_DEVICE_READY : GO · V2_PRODUCT_COMPLETE et ONLINE_READY : NO-GO.

Version web locale avec parcours élève, professeure et banquier, maisons, quêtes, économie et interface Educool reliée à Firebase.

Preuves :

- État du 22/08/2026 : 12 123 tests réussis sur 12 148, 11 échecs et 14 ignorés ; les 3 échecs stables restants concernent l'i18n.
- Educool : 645/645 tests, TypeScript vert et build Next de 42 pages réussi.
- Parcours navigateur élève, professeure et banquier rejoués ; HUD, clavier et premier choix : 18/18.

Limites :

- Deux PC et une tablette physique, coupure Wi-Fi et audio multi-appareils restent à rejouer ensemble.
- Le pré-RC reste bloqué par 3 échecs i18n, 20 assets provisoires et une gate online à 87/89.

### V3 — Monde 3D et économie centicool serveur

Statut : READY_FOR_HUMAN_RECIPE · GO_PILOTE_LOCAL : en attente.

Version 3D plus ambitieuse avec 22 zones, trois rôles, économie serveur, maisons, marchands, lecture écrite et interface Educool locale.

Preuves :

- Game : gate 9/9, 12 064 tests réussis et 14 ignorés ; Control : 383/383 ; Product/UI Kit : 333/333.
- Educool : 735 tests unitaires, 162 tests de règles Auth/Firestore et 174 tests Functions, avec builds Next et Node 20 réussis.
- Candidate restaurable 20260806_FINAL_RECIPE : 9 ZIP et 97 259 entrées extraites et vérifiées.

Limites :

- Validation de la direction artistique, test sur appareil enfant modeste et observation de la compréhension par un enfant encore requis.
- Aucun déploiement, aucune donnée réelle d'enfant et aucun verdict d'usage terrain ne sont revendiqués.


## Problème

Cool Bank transforme une logique de banque scolaire en jeu multijoueur relié à l'interface métier Educool. La fiche distingue la V2 locale, déjà jouable sur un appareil, de la V3 en monde 3D, techniquement validée mais encore soumise à une recette humaine.

## Ce que ça montre

- Piloter deux générations d'un produit complexe sans confondre leurs preuves ni leurs niveaux de maturité.
- Concevoir ensemble jeu, économie serveur, interfaces par rôle, Firebase, sécurité et QA multi-surface.
- Documenter les verdicts NO-GO et les données non publiables avec la même précision que les réussites techniques.

## Limites

- Preuve privée : code, captures complètes et données de contexte se montrent uniquement sur fixtures anonymisées.
- V2 n'est pas prête pour Internet ; V3 n'est pas validée comme pilote local auprès d'enfants.
- Les volumes de tests prouvent le comportement technique, pas l'utilité pédagogique ni l'adoption.
