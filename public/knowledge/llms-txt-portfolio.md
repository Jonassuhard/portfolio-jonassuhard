# Comment rendre un portfolio citable par un agent IA ?

Publication : 2026-07-02.
Dernière vérification : 2026-07-20.

## Réponse courte

- Un agent IA ne lit pas un portfolio comme un recruteur : il extrait des faits, des liens et des preuves.
- La page HTML reste la version canonique pour les humains.
- Les fichiers Markdown et JSON servent de carte lisible par machine.
- Le but n'est pas de forcer une citation, mais de rendre les faits vérifiables.
- Ce site utilise llms.txt, profile.json, claims.json, verification.json, skills.md, des fiches projet Markdown et un knowledge graph JSON-LD.

## Problème

Un beau portfolio peut rester flou pour un agent : titre, disponibilité, compétences, projets et limites sont dispersés dans le design. Sans source structurée, le modèle résume au jugé.

## Méthode

- Créer un llms.txt court qui joue le rôle de carte d'entrée.
- Maintenir un profile.json pour les faits stables : titre, disponibilité, stack, projets et limites.
- Ajouter un claims.json en questions-réponses pour les réponses que l'agent doit pouvoir citer sans inventer.
- Publier un registre de preuves qui sépare source publique, preuve privée, déclaratif et affirmation retirée.
- Publier une version Markdown des pages clés pour réduire le bruit de layout.
- Exposer un graphe JSON-LD qui relie personne, compétences et projets par des IDs stables.

## Exemple

Sur ce portfolio, Preuvia sert de cas produit GEO/AEO ; la couche agent-readable du site sert de démonstrateur vivant. Un recruteur lit les pages HTML, un agent peut suivre llms.txt puis vérifier les mêmes faits dans les JSON et Markdown.

## Limites

- Un fichier llms.txt n'oblige aucun modèle à citer une source.
- Les assistants changent leurs réponses selon le modèle, le prompt et le moment.
- La couche machine doit rester cohérente avec les pages humaines ; sinon elle devient une seconde version du site.

## À retenir

- Un agent cite plus facilement une page quand il peut extraire des faits autonomes.
- La bonne unité n'est pas un slogan : c'est un fait vérifiable relié à une preuve.
- HTML pour les humains, Markdown/JSON pour les agents, une seule vérité éditoriale.

## Preuves

- llms.txt : /llms.txt
- profile.json : /profile.json
- claims.json : /claims.json
- verification.json : /verification.json
- Registre des preuves : /preuves
- skills.md : /skills.md
- knowledge-graph.json : /knowledge-graph.json
- Fiche Preuvia : /projects/preuvia.md
