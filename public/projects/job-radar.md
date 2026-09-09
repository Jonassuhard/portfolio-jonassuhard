# Job Radar - savoir quelles offres méritent mon temps

## Repères

| Repère | Détail |
| --- | --- |
| Format | Radar d'offres déployé + édition open source |
| Période | Juillet - septembre 2026 |
| Rôle de Jonas | Conception produit, architecture, développement full-stack, déploiement cloud, sécurité et QA |
| Statut | Version personnelle déployée · Community v0.1.0-beta.1 publique |
| Niveau de preuve | Preuve publique |
| Stack | Python, FastAPI, React, Turso, Cloud Run, Vercel, Playwright |

## À quoi ça sert

La version personnelle de Job Radar rassemble les offres, retire les doublons et explique lesquelles méritent une action. Une édition Community plus petite publie le noyau avec des données fictives.

## Besoin

### Chercher des offres prenait trop de temps.

Les annonces arrivent par plusieurs sources, avec des doublons, des dates différentes et des intitulés parfois trompeurs. Il fallait les comparer sans relire chaque page depuis le début.

- Réunir les offres autorisées dans un même endroit sans perdre leur source.
- Voir rapidement le métier réel, le niveau attendu et les compétences demandées.
- Savoir pourquoi une offre remonte, ce qui manque et quelle action faire ensuite.

## Intention

### Classer les offres et expliquer chaque décision.

Job Radar transforme le texte des annonces en faits comparables. La note reste déterministe et chaque résultat montre ses preuves, ses limites et sa fraîcheur.

- Séparer pertinence, confiance dans les données et fraîcheur de l'offre.
- Montrer les extraits qui justifient la note et le niveau réel du poste.
- Faire remonter une courte file d'actions plutôt qu'un tableau infini.
- Garder une validation humaine avant la préparation et l'envoi d'une candidature.

## Architecture

![Architecture actuelle : la version personnelle relie Vercel, les jobs et l'API Cloud Run, Turso et Google Drive ; l'édition Community reste locale.](/assets/proof/job-radar/architecture-v2-20260831.webp)

- L'interface React personnelle est servie par Vercel et appelle une API FastAPI sur Cloud Run.
- Des jobs Cloud Run collectent uniquement les sources autorisées, normalisent les annonces et retirent les doublons.
- Turso conserve les offres et leurs états ; Google Drive conserve les documents et sauvegardes prévus par le parcours privé.
- Le scoring reste déterministe : métier, compétences, preuves, séniorité et contraintes sont expliqués séparément.
- L'édition Community utilise le même principe avec un corpus fictif, FastAPI, React et SQLite sur la machine.

## Ce que Jonas a fait

- Une interface de travail avec Aujourd'hui, Radar, Candidatures, Entreprises, Insights et Système.
- Un pipeline multi-source autorisé, avec normalisation, déduplication, fraîcheur et provenance.
- Un scoring V3 qui explique le métier réel, le niveau attendu, les compétences et les preuves manquantes.
- Depuis septembre 2026, des contrôles locaux du CV et des preuves manquantes dans la fiche offre et les documents, sans modifier le score ni déclencher un envoi.
- Une infrastructure privée Vercel, Cloud Run, Turso et Google Drive avec tâches planifiées.
- Une édition Community MIT, installable localement avec corpus fictif et preuve de release.

## Ce que ça prouve

La version personnelle est déployée et vérifiée en privé ; l'édition Community apporte une preuve publique avec 409 tests réussis et 20 contrôles route/viewport.

- Transformer un besoin personnel en produit complet, déployé et utilisé dans un vrai workflow.
- Relier collecte, données, scoring explicable, interface et opérations cloud.
- Extraire une édition open source sans publier le profil, les candidatures ni l'historique privé.

La version personnelle déployée a été contrôlée en privé le 25 août 2026. L'édition Community v0.1.0-beta.1 apporte une preuve publique séparée : 336 tests backend, 36 frontend et 37 E2E sans échec ; 8 E2E sont ignorés intentionnellement.

### Versions

#### Version personnelle — Signal Desk déployé

| Repère | Détail |
| --- | --- |
| État actuel | Déployée en privé |

Elle collecte les sources autorisées, classe les offres, explique le métier réel et organise les prochaines actions. Le frontend, l'API et les tâches planifiées sont déployés.

##### Éléments vérifiés

- Frontend Vercel et huit routes contrôlés en HTTP 200 le 25 août 2026.
- Dernière exécution de production vérifiée avec huit sources en état OK et intégrité de la base confirmée.
- QA privée sur cinq largeurs, navigation clavier et contrôles Axe.

#### Édition Community — v0.1.0-beta.1

| Repère | Détail |
| --- | --- |
| État actuel | Publique sur GitHub sous licence MIT |

Cette édition partage le noyau du Radar sans profil, CV, candidatures ni données privées. Elle fonctionne localement avec 42 offres fictives et un import JSON contrôlé.

##### Éléments vérifiés

- 336 tests backend, 36 tests frontend et 37 tests E2E sans échec.
- 20 combinaisons route et viewport sans violation Axe ni débordement.
- Dépôt, historique nettoyé, archive et distributions audités dans la preuve publique.


## Visuels

![Radar local : liste et détail d'une offre, raisons de la note et préparation du dossier. Données fictives.](/assets/proof/job-radar/offer-detail-20260908.webp)

![Radar : quatre offres retenues à partir d'une base de démonstration. Entreprises et données fictives.](/assets/proof/job-radar/radar-20260908.webp)

![Insights : volumes, décisions et compétences. L'interface signale que l'échantillon est insuffisant pour une tendance. Données fictives.](/assets/proof/job-radar/insights-20260908.webp)

![Détail d'une offre sur mobile, avec les mêmes raisons de classement. Données fictives.](/assets/proof/job-radar/radar-mobile-20260908.webp)


## Résultats vérifiés

- Version personnelle contrôlée en production le 25 août 2026 : huit sources en état OK, base intègre et huit routes frontend en HTTP 200.
- Interface personnelle vérifiée en privé sur cinq largeurs, au clavier et avec Axe.
- Édition Community v0.1.0-beta.1 : 336 tests backend, 36 frontend et 37 E2E sans échec ; 8 E2E ignorés intentionnellement.
- Édition Community : 20 combinaisons route/viewport sans violation Axe ni débordement.

## Limites

- Aucun envoi autonome : la préparation et l'envoi final restent sous validation humaine.
- Application Assist est testé localement mais n'est pas activé en production.
- LinkedIn, Indeed et Welcome to the Jungle restent des imports manuels ; Job Radar ne les scrape pas automatiquement.
- La version personnelle et sa base ne sont pas publiques ; les captures du portfolio utilisent uniquement des données fictives.
- La preuve Community est datée et ne prouve ni adoption externe ni résultat de recherche d'emploi.
- Version personnelle : L'application et ses données restent privées ; aucune démo publique connectée à la base réelle n'est proposée.
- Version personnelle : Application Assist est validé localement mais pas activé en production.
- Édition Community : La beta Community est plus petite que la version personnelle et ne contient pas son infrastructure cloud.
- Édition Community : Elle ne prouve ni adoption externe ni résultat de recherche d'emploi.
- Gain de temps moyen et effet sur les réponses obtenues : pas encore mesurés sur un échantillon suffisant.
- Adoption externe de l'édition Community : pas encore mesurée.

## Liens

- [Étude de cas](/projets/job-radar)
- [Repo GitHub](https://github.com/Jonassuhard/job-radar-community)
- [Configurer son radar](https://github.com/Jonassuhard/job-radar-community/blob/main/docs/CONFIGURATION.md)
- [Architecture publique](https://github.com/Jonassuhard/job-radar-community/blob/main/docs/ARCHITECTURE.md)
- [Preuve v0.1.0-beta.1](https://github.com/Jonassuhard/job-radar-community/blob/main/docs/verification/v0.1.0-beta.1.json)
