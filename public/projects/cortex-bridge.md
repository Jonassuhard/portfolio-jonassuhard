# Cortex Bridge - orchestration ChatGPT et exécution locale contrôlée

Type : Agent local open source : extension Chrome, console et exécuteur.
Période : Juillet - août 2026 · v0.5.2.
Rôle : Conception produit, architecture, extension MV3, backend FastAPI, sécurité, QA.
Stack : Chrome MV3, FastAPI, Next.js, React, SQLite, Python, Ollama.
Statut : Preview technique open source v0.5.2.
Niveau de preuve : Preuve publique.

En bref : Relier une conversation ChatGPT à un exécuteur local borné : le modèle planifie, l'utilisateur valide, Cortex agit dans le workspace et renvoie un rapport auditable.

Preuves : Code public sous licence MIT. Preuve de release v0.5.2 publiée le 22/08/2026 : 431 tests backend, 127 frontend, 56 extension, 12 E2E et 4 accessibilité sans échec ; 1 test E2E ignoré.

Lien : https://github.com/Jonassuhard/cortex-bridge

## Problème

Cortex Bridge relie une conversation ChatGPT ouverte dans Chrome à un exécuteur déterministe sur Mac. Chaque action locale reste confinée au workspace, présentée avant exécution et traçable. Le projet réunit extension navigateur, backend, interface, orchestration, sécurité et protocole de preuve dans un dépôt public.

## Ce que ça montre

- Piloter un produit technique complet : extension navigateur, backend local, interface, orchestration, documentation et QA.
- Transformer une boucle IA en système inspectable : validations humaines, permissions minimales, workspace borné et comportements fail-closed testés.
- Publier les preuves et les limites : dépôt MIT, matrice de release, risque fournisseur et frontières de validation documentés.

## Limites

- Les suites automatisées utilisent aussi des fixtures : elles ne prouvent pas une compatibilité continue avec un compte ChatGPT réel.
- Le transport automatique par l'interface ChatGPT entre en conflit avec les conditions du fournisseur : activation opt-in et risque de restriction du compte.
- Preview technique macOS/Chrome : extension installée manuellement et dépendance à un DOM externe susceptible de changer.
