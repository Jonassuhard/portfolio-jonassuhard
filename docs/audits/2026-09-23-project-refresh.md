# Revue des 15 projets - 23 septembre 2026

Publication preparee dans un worktree isole, depuis `34f3c2f`.
Les modifications carriere du depot principal ne font pas partie de ce lot.

## Perimetre et limites

Comparaison editoriale avec les sources accessibles, notes de reprise, tags
publics et interfaces en ligne. Ce controle du portfolio ne constitue pas
une nouvelle recette fonctionnelle de chacun des quinze produits.
Les dates des tests historiques ne sont pas renouvelees.

| Projet | Constat | Action |
| --- | --- | --- |
| Job Radar | Community reste au tag v0.1.0-beta.1. Travaux personnels plus recents sur fraicheur et classement, distincts du cloud. | Note de preuve actualisee ; captures fictives conservees, aucune candidature privee publiee. |
| Les Petites Griffes | Accueil public disponible ; parcours compose, galerie et reservation visibles. | Medias preserves comme demande precedemment ; audit Lighthouse d'aout non redaté. |
| Educool V2 | Application publique a acces reserve, sources Educool accessibles. Pas de nouvelle recette enseignant. | Captures fictives existantes conservees ; deux candidats livret/assistant rejetes car ils montraient uniquement la connexion. |
| Cool Bank / La Herse | V3 web encore en chantier ; nouvelle migration native Godot V4, non finalisee. | Versions distinguees, trois captures V4, limites techniques et humaines explicites. |
| Capselys | Site public HTTP 200 ; il ne prouve pas la livraison du staging MBA. | Archives de staging et attribution existante conservees. |
| ISCOM | Article public de reference HTTP 200 avec titre attendu. | Captures et contexte employeur conserves ; aucun acces CMS utilise. |
| Preuvia | Offre publique toujours accessible ; exemple de benchmark fictif. | Nouvelle capture live du premier ecran, utilisee en ouverture de fiche. |
| Cortex Bridge | Tag v0.6.5-preview.1 public ; note explicite de non-finalisation. | Fiche, profil, preuves et llms actualises ; nouvel ecran de contexte synthétique v0.6.2 du package preview. |
| Battle Engine | Nouvel episode BL05 et correctif de controle du bandeau documentes le 23 septembre. | Extrait muet de 18 s et poster ; lien YouTube kDvb_gy8W18 ; anciens montages dates conserves. |
| HoopSphere | Dossier MBA et archives disponibles ; pas de preuve de nouvelle application distribuee. | Role marketing de Jonas et captures archivees conserves ; aucune attribution du code de l'equipe. |
| RAG Starter Kit | Source d'origine non accessible dans les volumes actuellement montes. | Historique et schemas conserves ; aucune execution actuelle revendiquee. |
| Board IA PME | Meme limite d'acces aux archives privees. | Prototype historique conserve ; aucune nouvelle validation inventee. |
| Edusemantix | Demo Render reveillee puis essai reel : livre, score 10,8. | Nouvelle capture live ; notes de deploiement local relues, aucun compteur d'audience deduit. |
| Pokemon Gen-4 Toolkit | Archive privee non montee ; pas de nouvelle preuve executable. | Schemas conserves ; aucun asset de jeu ni ROM publie. |
| claude-code-soul | Dernier commit public 9761f49 du 29 juin 2026, inchange. | Fiche et captures conservees, aucune nouvelle release revendiquee. |

## Nouveaux medias

- Cortex : `context-request-v062.webp`, interface de test fournie dans le package v0.6.5. Ce n'est pas une execution reelle.
- Cool Bank : `v4-world-20260921.webp`, `v4-mobile-20260921.webp`, `v4-garden-20260923.webp`.
- Jardin V4 : maison/inventaire injectes dans un test natif, pas un parcours naturel joueur. Source P01, capture finale `j3_r2_ui_451531_desktop_1440_1440x1024.png`.
- Battle : `battle-bl05-20260923.mp4`, extrait du rendu local seed 17167, H264 540x960, 18 secondes, 1 914 890 octets, sans audio ; poster dedie.
- Preuvia et Edusemantix : `live-20260923.webp`, captures reelles de leurs sites publics.
- Conversion WebP uniquement : aucune modification generative des interfaces, aucun resultat ou chiffre retouche.
- Les illustrations de couverture des quinze projets sont inchangees.

## Sources principales

- Cortex : tag public `v0.6.5-preview.1`, `PREVIEW_V065.md`, SHA du fichier `80bcfbccc2a382920fdbca35ec28ab9176cabf96`.
- Cool Bank : README V4, primer V4, rapport P01 et preuve de restauration Mac du 21 septembre ; sources V3 et notes de carte separees.
- Battle : rapport BL05 du 23 septembre et fichiers de preparation/publication locaux. Le test de bandeau masque reste refuse ; seuil non abaisse.
- Job Radar : notes de reprise privees du 23 septembre. Details de candidatures exclus du site et de ce rapport.

## Verification

- Controle final : 129 tests, types, contenu et 135 liens internes passes. Un nouveau test separe la preview Cortex actuelle de sa validation historique.
- Build Next 16.3.4 : 41 pages generees avec succes.
- 15 fiches a 1440 px et 390 px : aucun debordement global ni image deja chargee en erreur ; captures du premier ecran inspectees en planches-contact.
- Agrandissement du jardin V4 ouvert sur mobile : image, legende et fermeture visibles.
- Battle mobile : video active, muette, sans controles ; les videos hors ecran ne sont pas chargees immediatement.
- Preuves navigateur locales : `tmp/project-refresh-qa.json`, `tmp/qa-{1440,390}-*.png`. Ces fichiers temporaires ne sont pas publies.
- Pas de nouvelle mesure Lighthouse, pas de recette appareil physique et pas de test utilisateur enfant.
- Routes, Markdown et medias locaux : 111 reponses HTTP controlees, aucun echec.
- Publication a consigner apres execution ; ne pas interpreter ce rapport comme une preuve de deploiement.
