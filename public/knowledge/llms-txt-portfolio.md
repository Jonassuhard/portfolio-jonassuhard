# Comment rendre un portfolio citable par un agent IA ?

Publication : 2026-07-02.
Dernière vérification : 2026-07-20.

## Réponse courte

- Un agent IA cherche des faits, des liens et des preuves.
- La page HTML est faite pour les humains.
- Les fichiers Markdown et JSON donnent les mêmes informations sous une forme simple à lire par machine.
- Le but est de rendre les faits vérifiables, pas d'imposer une citation.
- Ce site publie un guide llms.txt, des profils JSON, des questions-réponses, des preuves et des fiches projet en Markdown.

## Problème

Un portfolio peut être clair pour un humain et difficile à lire pour un agent. Le titre, les projets et leurs limites sont souvent dispersés dans la page.

## Méthode

- Créer un llms.txt court pour orienter l'agent.
- Garder un profile.json pour les faits stables : titre, disponibilité, outils, projets et limites.
- Ajouter un claims.json en questions-réponses pour éviter les réponses inventées.
- Publier un registre qui sépare les preuves publiques, privées, déclarées et retirées.
- Publier les pages clés aussi en Markdown, sans la mise en page.
- Relier la personne, les compétences et les projets dans du JSON-LD, un format de données structuré.

## Exemple

Sur ce portfolio, Preuvia sert de cas d'audit de visibilité dans les assistants IA. Un recruteur lit les pages HTML ; un agent peut suivre llms.txt et vérifier les mêmes faits dans les fichiers JSON et Markdown.

## Limites

- Un fichier llms.txt n'oblige aucun modèle à citer une source.
- Les assistants changent leurs réponses selon le modèle, le prompt et le moment.
- La couche machine doit rester cohérente avec les pages humaines ; sinon elle devient une seconde version du site.

## À retenir

- Un agent peut mieux reprendre une page quand les faits sont séparés et sourcés.
- Un fait utile est relié à une preuve, pas à un slogan.
- HTML pour les humains, Markdown et JSON pour les agents, avec les mêmes informations.

## Preuves

- llms.txt : /llms.txt
- profile.json : /profile.json
- claims.json : /claims.json
- verification.json : /verification.json
- Registre des preuves : /preuves
- skills.md : /skills.md
- knowledge-graph.json : /knowledge-graph.json
- Fiche Preuvia : /projects/preuvia.md
