# Educool / La Herse - app web pour une classe

Type : Application web éducation.
Période : 2026.
Rôle : Développement, UX, sécurité, PDF, Firebase, maintenance.
Stack : Next.js, Firebase, Firestore, Cloud Functions, Vitest, PDF.
Statut : Prod / maintenance.
Niveau de preuve : Démo privée.

En bref : Application utilisée par une classe, Firebase, données sensibles, PDF et audits de sécurité.

Preuves : Captures sur données fictives et démonstration privée. L'usage en classe ne peut pas être vérifié publiquement en raison des données de mineurs.

## Problème

Application web utilisée par une enseignante en classe : suivi des compétences des élèves et génération de livrets PDF, sur Firebase, avec les opérations sensibles déportées en Cloud Functions.

## Ce que ça montre

- Produit utilisé par une vraie utilisatrice avec retours terrain.
- Conscience sécurité sur données enfants et rules Firebase.
- Capacité à investiguer des bugs PDF, déploiement, auth et données.

## Limites

- Données de mineurs : rien n'est publiable, la preuve se montre sur données fictives ou en entretien.
- Le durcissement des règles d'accès Firebase est un chantier continu, pas un état figé.
