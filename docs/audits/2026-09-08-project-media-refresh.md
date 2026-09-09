# Actualisation des projets et medias

Revue commencee le 8 septembre et terminee le 9 septembre 2026.
Base Git : `9985ad0`, branche `master`. Candidat local, non publie.

## Verdict

**PASS pour le candidat local teste. UNCLEAR pour une actualisation exhaustive
des sources inaccessibles.** Les 14 fiches ont ete passees en revue. Les medias
remplaces sont identifiables, et leurs limites sont indiquees dans les legendes.
Une archive, une fixture ou un apercu de carte ne devient pas une preuve de
production parce qu'une nouvelle capture en a ete faite.

- 29 nouvelles captures ou captures d'archive differentes des precedentes.
- 5 extraits video Battle Engine et leurs 5 posters.
- 1 nouvelle vignette Job Radar, avec une URL versionnee.
- 40 fichiers ajoutes, 11 805 600 octets au total, dont 9 519 268 pour les videos.
- 36 anciennes references de medias remplacees : aucune encore utilisee dans
  les fiches controlees et leurs liens de preuve. Ce nombre inclut quelques
  anciens schemas et ne signifie pas 36 captures d'ecran.
- Les donnees et medias du projet Les Petites Griffes sont identiques a la base.
  Son Markdown gagne seulement le lien vers sa video deja existante.

Les anciens fichiers restent conserves sur disque, sans etre references dans
les nouveaux rendus. Les schemas toujours exacts des projets sans interface
accessible restent presents. Aucun ecran produit n'a ete invente.

## Plan execute

- [x] Lire la charte Archive Worldline, les instructions et l'etat Git.
- [x] Inventorier les 14 projets, puis confronter les liens et sources accessibles.
- [x] Capturer les interfaces, choisir les archives et extraire les videos.
- [x] Ouvrir et inspecter les visuels, verifier les donnees de demonstration.
- [x] Integrer les medias, les legendes et la lecture automatique.
- [x] Synchroniser les Markdown, le registre de connaissances et `llms.txt`.
- [x] Tester le code, construire le site et controler les pages sur deux largeurs.

## Projet par projet

| Projet | Medias retenus | Source et limite |
| --- | --- | --- |
| Job Radar | Detail d'offre, radar, analyses, mobile ; nouvelle carte | Interface locale actuelle, base temporaire et entreprises fictives. Les controles de CV locaux ne sont pas presentes comme deja deployes. Aucun envoi de candidature. |
| Les Petites Griffes | Medias existants conserves | Exception explicite de Jonas. Pas de renouvellement artificiel de leur date de verification. |
| Cool Bank V2 / V3 | 3 vues V2 differentes et 3 nouvelles captures de cartes V3 | V2 : preuves du 17 et du 22 aout. V3 : build du 7 septembre capture le 8, et non les modifications source ulterieures. Previsualisations de cartes, pas sessions d'eleves. Hero V2 conserve pour montrer une experience plus lisible. |
| Capselys | Adhesion, navigation et header | Archives du staging, differentes des anciennes captures. La date de copie ne prouve pas la date de capture. Staging authentifie non reverifie ; la production publique n'est pas attribuee a tort au travail de refonte. |
| ISCOM | 3 vues de l'article public sur l'IA et la communication | Captures fraiches de la publication. Elles prouvent la presence du contenu, pas son trafic ni sa conversion. |
| Preuvia | Promesse, processus et exemple de matrice | Captures du site public. L'exemple de matrice n'est pas presente comme un resultat client. |
| Cortex Bridge | Espace de travail, validation d'action, depot public | Interface locale avec scenarios de test explicites. La version locale 0.5.4 n'est pas confondue avec la version publique 0.5.3. |
| Battle Engine | 3 combats, roster, teaser | Un combat public du 31 aout ; deux extraits locaux de juillet/aout ; roster de juin et teaser d'avril identifies comme archives. Les 44 personnages du roster historique ne sont pas presentes comme l'effectif actuel. |
| HoopSphere | Landing, presentation du produit, mobile | Rendu du build d'archive du projet d'equipe. Pas de faux lancement App Store, d'utilisateurs acquis ni d'attribution du developpement a Jonas. Un ecran avec compteurs non etablis a ete ecarte. |
| Edusemantix | Partie, regles, mobile | Demo publique sur Render, compte de demonstration verifie dans le code. Jeu teste avec des mots generiques. Demarrage a froid observe, code toujours prive, aucun benefice pedagogique revendique. |
| claude-code-soul | Nouvelle capture du depot public ; 2 schemas conserves | Depot public controle ; schemas toujours coherents. Ne vaut pas audit de toutes les configurations installees. |
| RAG Starter Kit | Schemas conserves | Pas de runtime actuel accessible. L'archive privee recherchee n'a pas pu etre montee ; aucune nouvelle execution revendiquee. |
| Board IA PME | Schemas conserves | Meme limite d'acces aux sources historiques. Pas de nouvelle preuve client. |
| Pokemon Gen-4 Toolkit | Schemas conserves | Archive privee sans interface actuelle disponible. Aucune ROM ni donnee de jeu ajoutee. |

## Videos

- MP4 H.264, 30 images/s, sans piste audio, `faststart` verifie.
- Lecture muette automatique et en boucle, sans commandes natives ni PiP.
- La video hero peut commencer au chargement. Les videos de galerie commencent
  lorsqu'elles deviennent visibles, pour ne pas telecharger cinq films d'avance.
- Mise en pause hors ecran, dans un onglet masque et avec la preference de
  mouvement reduit. Pause/reprise au clavier par Espace ou Entree.
- Poster conserve si la lecture est bloquee ; proportions originales conservees.

Les tests confirment un demarrage sans clic dans Chromium. Ils ne garantissent
pas un depart instantane sur tout reseau ou sur Safari/iOS. Aucune commande de
pause tactile visible n'est fournie, conformement a la demande ; c'est une
limite d'ergonomie que le seul score Axe ne permet pas d'ecarter.

## Corrections visuelles et textuelles

- Galeries remontees juste apres le hero, avant le tableau de synthese.
- Captures en couleur ; ecrans mobiles limites en hauteur et non etires.
- Carte Job Radar alignee sur les autres cartes, ratio 38/23 conserve.
- Tableaux de decisions accessibles au clavier sur mobile.
- Titre de l'index corrige : « Des projets livres, d'autres en cours. »
- Mention de disponibilite corrigee : depuis le 1er septembre 2026.
- Battle Engine ne se resume plus a son introduction ; son recit explique les
  choix du pipeline au lieu de commenter son classement dans le portfolio.
- Edusemantix n'est plus decrit comme uniquement prive : la demo est liee.
- Retrait d'une phrase devalorisante repetee sur les projets secondaires.
- Les formats Markdown lient les MP4 par leur poster au lieu de tenter de les
  afficher comme des images. Les anciens liens de captures Capselys dans la
  fiche de connaissances ont egalement ete remplaces.

La grille, les polices, les animations de titres et les illustrations de fond
Archive Worldline ne sont pas refaites dans ce lot.

## Avis pour les recruteurs

**Le positionnement est plus credible quand l'interface et ton role arrivent
avant les listes de technologies et les rapports de validation.** Le trio
Job Radar / Cortex Bridge / Les Petites Griffes reste pertinent. L'aspiration
Forward Deployed Engineer est distincte du titre junior actuel.

Points restant a traiter, sans gonfler ce lot :

1. Raccourcir les repetitions entre les pages Recruteurs, Methode et Preuves.
   Garder besoin, contribution personnelle et resultat observable au premier
   niveau ; details techniques ensuite. Les longs registres doivent soutenir
   le recit, pas prendre sa place.
2. Cool Bank V3 montre encore un chantier visuel. Conserver le statut technique
   explicite jusqu'a une nouvelle version suffisamment stable et testee par
   des humains. Les nouvelles captures ne valident pas le produit.
3. Retrouver un acces verifiable au staging Capselys et aux trois projets
   historiques avant de promettre des preuves recentes.
4. Edusemantix peut attendre le reveil de Render. La demo n'est donc pas une
   preuve de disponibilite instantanee permanente.
5. La situation du MBA merite une confirmation documentaire : un contexte local
   Job Radar annonce son obtention, tandis que le portfolio parle encore de
   preparation. Aucun diplome n'a ete ajoute sur la seule foi de ce contexte.

## Verification executee

| Controle | Resultat | Portee |
| --- | --- | --- |
| `npm run check` | PASS, 101 tests, 14 projets, 126 liens internes | Generation des formats machine, TypeScript, tests, contenu et liens |
| `npm run build` | PASS, 40 pages generees | Build Next.js de production local |
| `npm run check:links:external` | PASS au dernier passage | Malt 403 et LinkedIn 999 restent des limites de verification automatisee ; Render a necessite un reveil avant reussite |
| Pages Chromium | 31 routes x 2 largeurs : 375 et 1440 px | HTTP, debordements, medias casses et erreurs JavaScript |
| Axe | 0 violation detectee sur les 62 rendus controles | WCAG 2 A/AA et 2.1 AA ; ne remplace pas une evaluation humaine complete |
| Videos navigateur | PASS, 12 resultats | 5 lectures par largeur, progression du temps, ratio, silence, absence de commandes, pause clavier/hors ecran/mouvement reduit |
| Videos fichiers | PASS | Decodage jusqu'a la fin, taille inferieure a 4 Mo chacune, index MP4 avant les donnees video |
| Confidentialite medias | 35 images passees en OCR, aucun signal email/cle/chemin | Inspection des captures et provenance synthetique en complement ; OCR seul non suffisant |
| Secrets du lot | PASS, Gitleaks : aucun secret detecte | Diff et nouveaux scripts, tests et rapports ; pas un audit exhaustif du depot |
| Hygiene du diff | PASS, `git diff --check` | Aucun probleme d'espacement detecte |
| Preservation LPG | PASS | Comparaison exacte de l'objet projet avec `9985ad0` |
| Anciennes references | PASS, 0 reference restante dans les surfaces controlees | Inventaire comparatif et liens du registre de connaissances |

Les captures plein ecran et les planches de lecture desktop/mobile ont ete
ouvertes, pas seulement generees. Pour eviter des zones vides artificielles
dues a `content-visibility:auto`, les mesures ont ete prises sur la page normale,
puis cette optimisation a ete desactivee uniquement pour la capture complete
et le passage Axe. Les tests video utilisent le mouvement normal ; le controle
general des pages utilise le mouvement reduit pour une lecture stable.

Aucun score Lighthouse 100 n'est revendique pour ce lot. Pas de test sur un vrai
iPhone, pas d'audit exhaustif RGPD/securite et pas de verification de production
apres publication, puisque le candidat n'a pas ete publie.

## Preuves et reprise

- [Manifeste des 40 medias, dimensions et SHA-256](2026-09-08-project-media-manifest.json).
- [Synthese des mesures navigateur](2026-09-08-project-media-qa.json).
- Test reproductible des videos : `node scripts/check-project-media-browser.mjs http://127.0.0.1:3199`.
- Mesures completes locales : `tmp/audit-release-20260908.json` et
  `tmp/project-media-browser.json` ; captures dans `qa/screenshots/`.
- Les scripts et sources des autres projets n'ont pas ete modifies. Le volume
  V2 monte en lecture seule pour la recherche a ete demonte ensuite.
- Tracabilite Storage : session racine `ea118c94dfe64843922be0051481b62b` et
  sessions des dossiers modifies ; structure finale centrale a consulter apres
  cloture via le chemin indique dans `PRIMER.md`.

## Publication

Le lot n'est ni commit, ni push, ni deploye. La publication anterieure reste
distincte de ce candidat. Les quatre fichiers de contexte deja non suivis ne
font pas partie du lot de code a publier.

Prochaine action : validation de Jonas pour commit/push, puis controle du
deploiement et des nouveaux medias sur `jonassuhard.com`.
