# Lisibilite et actualisation des preuves

## Verdict

PASS pour le lot local. Aucun commit, push ou deploiement.
Base conservee dans Git : 2c0c354.

## Plan execute

| Lot | Realisation | Etat |
| --- | --- | --- |
| Recruteurs | Introduction courte, trois projets conserves, contribution concrete, precisions repliees | PASS |
| Methode | Quatre etapes et exemples lies aux projets ; promesses absolues retirees | PASS |
| Preuves | Quinze entrees depliables ; sources, affirmations, dates et limites conservees | PASS |
| Cool Bank V3 | Etat actuel distingue des essais historiques d'aout, donnees humaines et machine synchronisees | PASS |
| Capselys | Sources locales relues ; statut staging et images d'archive conserves faute de nouvelle validation | PASS pour la qualification, pas de nouvelle recette |
| Navigation et rendu | Chrome et WebKit, cinq pages sur trois largeurs, puis production HTTPS locale | PASS |

## Effet sur la lecture

Comptage des mots de main.innerText, details fermes, avant sur le site public
et apres en local. Ce n'est ni une mesure de comprehension ni un test utilisateur.

| Page | Avant | Apres | Variation |
| --- | ---: | ---: | ---: |
| Recruteurs | 426 | 286 | -33 % |
| Methode | 309 | 269 | -13 % |
| Preuves | 864 | 189 | -78 % |

Les sources ne sont pas supprimees : les quinze affirmations et leurs limites
restent accessibles au clavier dans des elements details natifs.
La FAQ et son JSON-LD partagent toujours la meme source.
Le trio de projets, les illustrations, les CV, le header et les animations
ne sont pas remplaces.

## Sources et corrections factuelles

- Cool Bank V3 : README_V3.md et control/plan/PRIMER_V3.md du volume prive
  relus le 9 septembre. Le plan R2 est actif, sans validation technique
  globale. READY_FOR_HUMAN_RECIPE est un objectif actuel ; les candidates
  d'aout et leurs tests ne valident pas les modifications de septembre.
- Aucune execution du jeu, nouvelle capture produit ou recette humaine
  revendiquee. Les captures du portfolio restent identifiees par leur date.
- Capselys : depots locaux capselys-core, capselys-child et
  capselys-ai-assistant consultes. Derniers commits consultes de mai et
  avril 2026 ; aucune nouvelle validation de livraison retrouvee dans ce
  perimetre. Pas d'acces ni de modification au staging client.
- Formation : la note du registre ne dit plus que le MBA est en preparation.
  Le MBA declare obtenu ne vaut pas preuve d'une attribution RNCP distincte.
- Les dates des autres preuves et de la revue generale ne sont pas rajeunies.

## Verifications executees

- npm run check : 122 tests, TypeScript, contenu et 133 liens internes PASS.
- npm run build : PASS, 41 pages generees.
- git diff --check : PASS.
- Gitleaks sur le diff suivi : aucune detection.
- 30 vues : Chrome/WebKit, 390/768/1440, Recruteurs/Methode/Preuves et
  fiches Cool Bank/Capselys. HTTP 200, aucun debordement, aucune erreur JS
  et aucune violation Axe WCAG A/AA detectee dans main.
- Ouverture clavier des details, quinze preuves presentes, liens sources
  conserves et fermeture du menu par Escape verifies.
- Captures WebKit par section supplementaires pour ne pas confondre
  content-visibility:auto avec des sections absentes des captures pleine page.
- Build de production servi localement en HTTPS : glitch declenche
  naturellement et mouvement reduit verifies en WebKit a 390/1440.
  Le header CSP de production conserve upgrade-insecure-requests.
- Scripts et preuves : tmp/readability-qa.mjs, tmp/readability-qa.json,
  tmp/readability-production-qa.mjs, tmp/readability-production-qa.json.
  Les captures restent dans tmp/readability-*.png.

## Problemes corriges pendant la recette

- WebKit essayait de charger les ressources du serveur HTTP local en HTTPS :
  la directive upgrade-insecure-requests est maintenant limitee a la
  production. Les autres directives restent identiques.
- Le signe des FAQ imbriquees suivait l'ouverture du parent ; le selecteur
  CSS cible desormais uniquement le summary direct.
- Une premiere assertion conservait l'ancien statut V3. Elle a ete
  remplacee par des controles explicites sur le nouvel etat, sans supprimer
  les garde-fous de separation V2/V3.
- Annulations de scripts constatees dans le runtime de developpement WebKit :
  la verification des animations a ete rejouee sur le build de production
  local HTTPS, sans changer leur ordonnanceur.

## Limites

- WebKit automatise ne remplace pas un vrai iPhone/Safari.
- Aucun nouveau score Lighthouse n'est revendique pour ce lot local.
- Capselys et Cool Bank restent soumis aux validations de leurs projets ;
  aucune nouvelle preuve d'usage client ou pedagogique n'est inventee.
- Pas de nouvelle verification externe exhaustive des liens.

## Prochaine action

Jonas relit http://127.0.0.1:3199/recruteurs, puis autorise le commit et
la publication du lot. Le serveur de preview reste actif ; le serveur
de production et le proxy HTTPS temporaires ont ete arretes.
