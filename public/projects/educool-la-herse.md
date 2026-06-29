# Educool / La Herse - app web pour une classe

Type: application web education.

Periode: 2026.

Role: developpement, UX, securite, PDF, Firebase, maintenance.

Stack: Next.js, Firebase, Firestore, Cloud Functions, Vitest, PDF.

Statut: prod / maintenance.

Preuve principale: application utilisee dans un contexte de classe, avec Firebase, donnees sensibles, PDF et audits de securite.

## Probleme

Construire un produit terrain pour une enseignante: suivi de competences, livrets, PDF, PWA et logique metier scolaire.

## Contraintes

- Donnees enfants strictement anonymisees.
- Usage tablette/PWA par une non-dev.
- PDF imprimables et logique metier dense.

## Decisions

- Firebase / Firestore pour auth, donnees et functions.
- Cloud Functions pour operations sensibles.
- Audits securite documentes pour eviter la validation au doigt mouille.

## Ce que ca prouve

- Produit utilise par une vraie utilisatrice.
- Conscience securite sur donnees enfants.
- Capacite a investiguer des bugs PDF, deploy, auth et donnees.

## Limites

- Aucune donnee eleve ne doit apparaitre publiquement.
- Certaines phases securite sont a contextualiser finement.

