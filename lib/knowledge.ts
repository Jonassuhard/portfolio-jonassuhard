export type KnowledgePage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  updated: string;
  answer: string[];
  problem: string;
  method: string[];
  example: string;
  proofs: Array<{ label: string; href: string }>;
  limits: string[];
  takeaway: string[];
  // Optionnels : illustrations et FAQ propres à l'article (template évolutif).
  images?: Array<{ src: string; alt: string; caption?: string }>;
  faq?: Array<{ q: string; a: string }>;
};

export const knowledgePages: KnowledgePage[] = [
  {
    slug: "llms-txt-portfolio",
    title: "Comment rendre un portfolio citable par un agent IA ?",
    shortTitle: "Portfolio citable par IA",
    description:
      "Méthode concrète pour rendre un portfolio lisible par les agents : llms.txt, profile.json, claims.json, Markdown et JSON-LD.",
    updated: "2026-07-20",
    answer: [
      "Un agent IA ne lit pas un portfolio comme un recruteur : il extrait des faits, des liens et des preuves.",
      "La page HTML reste la version canonique pour les humains.",
      "Les fichiers Markdown et JSON servent de carte lisible par machine.",
      "Le but n'est pas de forcer une citation, mais de rendre les faits vérifiables.",
      "Ce site utilise llms.txt, profile.json, claims.json, verification.json, skills.md, des fiches projet Markdown et un knowledge graph JSON-LD."
    ],
    problem:
      "Un beau portfolio peut rester flou pour un agent : titre, disponibilité, compétences, projets et limites sont dispersés dans le design. Sans source structurée, le modèle résume au jugé.",
    method: [
      "Créer un llms.txt court qui joue le rôle de carte d'entrée.",
      "Maintenir un profile.json pour les faits stables : titre, disponibilité, stack, projets et limites.",
      "Ajouter un claims.json en questions-réponses pour les réponses que l'agent doit pouvoir citer sans inventer.",
      "Publier un registre de preuves qui sépare source publique, preuve privée, déclaratif et affirmation retirée.",
      "Publier une version Markdown des pages clés pour réduire le bruit de layout.",
      "Exposer un graphe JSON-LD qui relie personne, compétences et projets par des IDs stables."
    ],
    example:
      "Sur ce portfolio, Preuvia sert de cas produit GEO/AEO ; la couche agent-readable du site sert de démonstrateur vivant. Un recruteur lit les pages HTML, un agent peut suivre llms.txt puis vérifier les mêmes faits dans les JSON et Markdown.",
    proofs: [
      { label: "llms.txt", href: "/llms.txt" },
      { label: "profile.json", href: "/profile.json" },
      { label: "claims.json", href: "/claims.json" },
      { label: "verification.json", href: "/verification.json" },
      { label: "Registre des preuves", href: "/preuves" },
      { label: "skills.md", href: "/skills.md" },
      { label: "knowledge-graph.json", href: "/knowledge-graph.json" },
      { label: "Fiche Preuvia", href: "/projects/preuvia.md" }
    ],
    limits: [
      "Un fichier llms.txt n'oblige aucun modèle à citer une source.",
      "Les assistants changent leurs réponses selon le modèle, le prompt et le moment.",
      "La couche machine doit rester cohérente avec les pages humaines ; sinon elle devient une seconde version du site."
    ],
    takeaway: [
      "Un agent cite plus facilement une page quand il peut extraire des faits autonomes.",
      "La bonne unité n'est pas un slogan : c'est un fait vérifiable relié à une preuve.",
      "HTML pour les humains, Markdown/JSON pour les agents, une seule vérité éditoriale."
    ]
  },
  {
    slug: "playwright-audit-visuel",
    title: "Comment auditer visuellement une page web avec Playwright ?",
    shortTitle: "Audit visuel Playwright",
    description:
      "Méthode d'audit visuel multi-viewports : captures, console, responsive, preuves et limites avant modification.",
    updated: "2026-07-20",
    answer: [
      "Un audit visuel utile ne commence pas par une opinion : il commence par des captures reproductibles.",
      "Playwright permet de vérifier mobile, tablette et desktop avec les mêmes étapes.",
      "Le contrôle porte sur le rendu, les erreurs console, l'overflow, les éléments masqués et les preuves visuelles.",
      "L'objectif n'est pas de remplacer le jugement design, mais d'éviter les angles morts mécaniques.",
      "Chaque recommandation doit finir en patch vérifiable, pas en préférence de goût."
    ],
    problem:
      "Une page peut sembler correcte sur un écran et casser ailleurs : texte trop long, bouton compressé, image absente, header qui couvre le contenu ou animation qui masque la lecture.",
    method: [
      "Lister les parcours à vérifier avant d'ouvrir le navigateur.",
      "Capturer au moins mobile 390px et desktop 1440px pour les pages clés.",
      "Contrôler les erreurs console, les requêtes échouées et l'overflow horizontal.",
      "Comparer les captures avec les contraintes DA au lieu de chercher un style générique.",
      "Transformer chaque défaut en changement de fichier précis, puis reconstruire."
    ],
    example:
      "Sur les chantiers Capsélys et Les Petites Griffes, les captures servent à vérifier le rendu avant de parler de conversion : textes, blocs, assistant IA, preuves visuelles et contraintes client.",
    proofs: [
      { label: "Fiche Capsélys", href: "/projects/capselys.md" },
      { label: "Capture assistant Capsélys", href: "/assets/proof/capselys/capselys-assistant.webp" },
      { label: "Capture site Capsélys", href: "/assets/proof/capselys/capselys-site.webp" },
      { label: "Fiche Les Petites Griffes", href: "/projects/les-petites-griffes.md" },
      { label: "Capture home Les Petites Griffes", href: "/assets/proof/les-petites-griffes/lpg-home.webp" }
    ],
    limits: [
      "Playwright vérifie ce qu'on lui demande : un mauvais scénario peut rater un vrai défaut.",
      "Une capture ne mesure pas une conversion ; elle prouve seulement un état visuel.",
      "Le jugement DA reste humain : l'automatisation sert à ne pas rater le basique."
    ],
    takeaway: [
      "Capturer avant de corriger évite les débats flous.",
      "Un audit visuel fiable combine navigateur réel, contraintes design et preuve de build.",
      "La meilleure recommandation est celle qu'on peut vérifier au prochain screenshot."
    ]
  },
  {
    slug: "growth-engineer-ia",
    title: "C'est quoi un Growth Engineer en IA appliquée ?",
    shortTitle: "Growth Engineer IA",
    description:
      "Ce que recouvre le rôle de Growth Engineer en IA appliquée : marketing, code et workflows LLM reliés à des projets livrés, pas à un intitulé.",
    updated: "2026-07-20",
    answer: [
      "Un Growth Engineer relie l'acquisition et le code : il conçoit, il livre et prépare la mesure au lieu de sous-traiter chaque étape.",
      "Le profil vient souvent du marketing, puis apprend à coder pour ne plus dépendre d'un dev à chaque test.",
      "En IA appliquée, il cadre des workflows LLM utiles, avec garde-fous, pas des démos.",
      "Ce n'est pas un growth hacker : la dette technique et la sécurité comptent autant que le résultat court terme.",
      "Pour le marché français, ce portfolio utilise Chef de projet IA appliquée & automatisation comme titre principal et Growth Engineer comme spécialisation."
    ],
    problem:
      "L'intitulé Growth Engineer est à la mode et souvent vide. Beaucoup revendiquent marketing, IA et code sans rien qui tourne en production. Un recruteur a besoin de savoir ce que la personne livre vraiment, seule, de bout en bout.",
    method: [
      "Partir d'un besoin business, pas d'un outil : acquisition, conversion, contenu ou automatisation.",
      "Construire un premier livrable testable et définir les indicateurs qui permettraient d'en mesurer l'impact.",
      "Utiliser l'IA comme accélérateur cadré : je décide, je vérifie, l'assistant exécute la partie répétitive.",
      "Documenter les décisions pour qu'une équipe reprenne derrière."
    ],
    example:
      "Sur ce portfolio, trois terrains le montrent : Les Petites Griffes (site client live, CMS, SEO local, assistant IA), ISCOM (production SEO publiée avec fact-check) et Preuvia (audit de visibilité IA productisé). Une même chaîne à chaque fois : cadrer, construire, vérifier, transmettre.",
    proofs: [
      { label: "profile.json", href: "/profile.json" },
      { label: "profile.md", href: "/profile.md" },
      { label: "Méthode", href: "/methode" },
      { label: "Fiche Les Petites Griffes", href: "/projects/les-petites-griffes.md" },
      { label: "Fiche ISCOM", href: "/projects/iscom.md" },
      { label: "Fiche Preuvia", href: "/projects/preuvia.md" }
    ],
    limits: [
      "Growth Engineer reste un intitulé large : il faut regarder les projets, pas le mot.",
      "Le profil est junior en équipe : l'expérience vient de projets solo et d'alternance, pas encore d'une grosse équipe produit.",
      "L'impact business chiffré n'est pas toujours public, à cause des données clients ou mineurs."
    ],
    takeaway: [
      "Un Growth Engineer utile se juge sur ce qu'il livre et documente, pas sur l'intitulé.",
      "Marketing, IA et code n'ont de valeur que reliés à un livrable vérifiable.",
      "Le bon signal : des décisions écrites qu'une équipe peut reprendre."
    ]
  },
  {
    slug: "claude-code-mcp-workflow",
    title: "Comment structurer un workflow Claude Code avec MCP et agents ?",
    shortTitle: "Workflow Claude Code + MCP",
    description:
      "Structurer un assistant Claude Code en système lisible : identité, skills, agents, hooks et MCP en lazy-load, avec garde-fous sur les actions sensibles.",
    updated: "2026-07-20",
    answer: [
      "Claude Code devient utile quand on lui donne une structure : identité, règles, skills, agents, hooks, MCP.",
      "Le MCP branche des outils externes ; les agents isolent les tâches longues du contexte principal.",
      "Les hooks imposent des garde-fous déterministes : confirmation ou Touch ID sur action sensible, secrets hors des logs.",
      "Le lazy-load évite de tout charger au démarrage : moins de tokens, moins de RAM.",
      "L'intérêt n'est pas le nombre d'outils, mais un système lisible et réutilisable."
    ],
    problem:
      "Sorti de la boîte, un assistant CLI répond poliment mais oublie le contexte, recharge tout, et n'a aucun garde-fou sur les actions dangereuses. Sans structure, chaque session repart de zéro et les mauvaises habitudes reviennent.",
    method: [
      "Séparer l'identité (ton, valeurs, refus) de la config technique, dans des fichiers dédiés.",
      "Router chaque tâche vers le bon outil : skill, agent, MCP ou commande simple.",
      "Isoler les investigations lourdes dans des agents pour garder le contexte principal propre.",
      "Poser des hooks sur les actions sensibles : confirmation, Touch ID, rédaction des secrets.",
      "Charger les MCP et agents à la demande, pas au démarrage."
    ],
    example:
      "claude-code-soul est un pack open source (MIT) qui applique ça : un soul.md pour l'identité, des rules, skills, agents et hooks, avec Touch ID sur les actions sensibles, secrets via Keychain et gitleaks au moment de publier. Le repo est publié sans fuite : 0 PII, 0 secret, 0 chemin personnel.",
    proofs: [
      { label: "Repo claude-code-soul (GitHub)", href: "https://github.com/Jonassuhard/claude-code-soul" },
      { label: "Fiche claude-code-soul", href: "/projects/claude-code-soul.md" },
      { label: "skills.md", href: "/skills.md" }
    ],
    limits: [
      "Une config opinionnée : ce workflow reflète des choix personnels, à adapter avant réutilisation.",
      "Plus de structure veut dire plus de maintenance : il faut nettoyer régulièrement skills et règles.",
      "Un garde-fou ne remplace pas la vigilance : le hook réduit le risque, il ne l'annule pas."
    ],
    takeaway: [
      "Un bon workflow Claude Code se juge à sa lisibilité, pas au nombre d'outils branchés.",
      "Les hooks déterministes valent mieux qu'une consigne polie pour les actions sensibles.",
      "Séparer identité et config rend le tout réutilisable et publiable."
    ]
  },
  {
    slug: "memoire-agent-markdown",
    title: "Comment organiser la mémoire d'un agent IA en Markdown ?",
    shortTitle: "Mémoire d'agent en Markdown",
    description:
      "Une méthode concrète pour donner une mémoire durable à un agent IA : des fichiers Markdown d'identité, de règles et de contexte projet, testée contre d'autres approches.",
    updated: "2026-07-20",
    answer: [
      "Un agent sans mémoire repart de zéro à chaque session. La solution la plus simple qui tient dans le temps, c'est du Markdown en clair.",
      "Je sépare trois couches. L'identité de l'agent, sa méthode de travail, et son contexte projet du moment.",
      "Chaque projet garde son propre contexte, chargé quand on l'ouvre, pas empilé dans un fichier géant.",
      "Les corrections deviennent des règles écrites, pour ne pas refaire deux fois la même erreur.",
      "J'ai testé d'autres pistes. Le Markdown en masse reste le plus lisible quand plusieurs agents travaillent sur le même projet."
    ],
    problem:
      "Sorti de la boîte, un assistant oublie tout entre deux sessions. On lui réexplique le contexte, les préférences, les erreurs déjà commises. Sans structure, la mémoire devient soit un dump illisible, soit une base de données que l'agent ne relit jamais au bon moment.",
    method: [
      "Poser un fichier d'identité stable, avec le ton, les valeurs et ce que l'agent refuse de faire.",
      "Séparer les règles de méthode dans leurs propres fichiers, courts et actionnables.",
      "Donner à chaque projet son fichier de contexte, lu à l'ouverture et mis à jour à la fin de chaque tâche.",
      "Transformer chaque correction en une ligne de règle, datée, avec la cause et le correctif.",
      "Garder chaque fichier court. Quand il dépasse sa limite, on externalise et on pointe, on n'empile pas."
    ],
    example:
      "Sur claude-code-soul, la mémoire tient dans des fichiers Markdown versionnés. Un fichier d'âme pour l'identité, des règles séparées, un contexte par projet et un journal de leçons. Plusieurs modèles lisent les mêmes fichiers, Claude, Gemini et Codex, sans se marcher dessus. L'agent relit le fichier à jour au lieu de se fier à un résumé qui se dégrade.",
    proofs: [
      { label: "Repo claude-code-soul (GitHub)", href: "https://github.com/Jonassuhard/claude-code-soul" },
      { label: "Fiche claude-code-soul", href: "/projects/claude-code-soul.md" },
      { label: "skills.md", href: "/skills.md" }
    ],
    limits: [
      "C'est du Markdown, pas une base vectorielle. Pour retrouver un fait précis dans des milliers de notes, une recherche sémantique reste plus adaptée.",
      "La méthode demande de la discipline. Un fichier qu'on ne met pas à jour ment vite.",
      "Cette organisation reflète une façon de travailler. Elle s'adapte, elle ne se copie pas telle quelle."
    ],
    takeaway: [
      "La mémoire utile d'un agent, c'est celle qu'il relit au bon moment, pas la plus grosse.",
      "Trois couches suffisent : identité, méthode, contexte projet.",
      "Le Markdown en clair gagne quand plusieurs agents doivent lire la même mémoire."
    ],
    faq: [
      {
        q: "Pourquoi pas Obsidian ou une base de notes ?",
        a: "Obsidian est très bien pour un cerveau humain. Pour un agent, le plus fiable reste des fichiers texte simples qu'il lit et réécrit directement, sans passer par une couche d'application. Le Markdown en clair se versionne, se compare et se partage entre plusieurs modèles."
      },
      {
        q: "Ça marche avec d'autres modèles que Claude ?",
        a: "Oui. Les mêmes fichiers Markdown sont lus par Claude, Gemini et Codex. Le format neutre, c'est justement ce qui permet de changer de modèle sans réécrire la mémoire."
      }
    ]
  }
];

export function getKnowledgePage(slug: string) {
  return knowledgePages.find((page) => page.slug === slug);
}
