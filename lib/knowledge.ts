export type KnowledgePage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  published: string;
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
      "Méthode pour rendre un portfolio lisible par les agents IA avec des fichiers Markdown et JSON.",
    published: "2026-07-02",
    updated: "2026-07-20",
    answer: [
      "Un agent IA cherche des faits, des liens et des preuves.",
      "La page HTML est faite pour les humains.",
      "Les fichiers Markdown et JSON donnent les mêmes informations sous une forme simple à lire par machine.",
      "Le but est de rendre les faits vérifiables, pas d'imposer une citation.",
      "Ce site publie un guide llms.txt, des profils JSON, des questions-réponses, des preuves et des fiches projet en Markdown."
    ],
    problem:
      "Un portfolio peut être clair pour un humain et difficile à lire pour un agent. Le titre, les projets et leurs limites sont souvent dispersés dans la page.",
    method: [
      "Créer un llms.txt court pour orienter l'agent.",
      "Garder un profile.json pour les faits stables : titre, disponibilité, outils, projets et limites.",
      "Ajouter un claims.json en questions-réponses pour éviter les réponses inventées.",
      "Publier un registre qui sépare les preuves publiques, privées, déclarées et retirées.",
      "Publier les pages clés aussi en Markdown, sans la mise en page.",
      "Relier la personne, les compétences et les projets dans du JSON-LD, un format de données structuré."
    ],
    example:
      "Sur ce portfolio, Preuvia sert de cas d'audit de visibilité dans les assistants IA. Un recruteur lit les pages HTML ; un agent peut suivre llms.txt et vérifier les mêmes faits dans les fichiers JSON et Markdown.",
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
      "Un agent peut mieux reprendre une page quand les faits sont séparés et sourcés.",
      "Un fait utile est relié à une preuve, pas à un slogan.",
      "HTML pour les humains, Markdown et JSON pour les agents, avec les mêmes informations."
    ]
  },
  {
    slug: "playwright-audit-visuel",
    title: "Comment auditer visuellement une page web avec Playwright ?",
    shortTitle: "Audit visuel Playwright",
    description:
      "Méthode pour vérifier une page sur plusieurs écrans avant de la modifier.",
    published: "2026-07-02",
    updated: "2026-07-20",
    answer: [
      "Un audit visuel commence par des captures qu'on peut refaire.",
      "Playwright vérifie mobile, tablette et ordinateur avec les mêmes étapes.",
      "Le contrôle regarde le rendu, les erreurs, le débordement et les éléments masqués.",
      "Il complète le regard humain ; il ne le remplace pas.",
      "Chaque constat doit mener à une correction vérifiable."
    ],
    problem:
      "Une page peut sembler correcte sur un écran et casser ailleurs : texte trop long, bouton compressé, image absente, header qui couvre le contenu ou animation qui masque la lecture.",
    method: [
      "Lister les parcours à vérifier avant d'ouvrir le navigateur.",
      "Capturer au moins mobile 390px et desktop 1440px pour les pages clés.",
      "Contrôler les erreurs, les requêtes échouées et le débordement horizontal.",
      "Comparer les captures avec la direction visuelle prévue.",
      "Transformer chaque défaut en changement de fichier précis, puis reconstruire."
    ],
    example:
      "Sur Capsélys et Les Petites Griffes, les captures servent à vérifier les textes, les blocs, l'assistant IA et les contraintes client avant de parler de conversion.",
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
      "Un audit visuel fiable combine navigateur, règles visuelles et build réussi.",
      "Une recommandation utile peut être vérifiée à la capture suivante."
    ]
  },
  {
    slug: "growth-engineer-ia",
    title: "C'est quoi un Growth Engineer en IA appliquée ?",
    shortTitle: "Growth Engineer IA",
    description:
      "Le rôle de Growth Engineer en IA appliquée : marketing, code et assistants IA reliés à des projets réels.",
    published: "2026-07-02",
    updated: "2026-08-23",
    answer: [
      "Un Growth Engineer relie l'acquisition et le code : il conçoit, livre et prépare la mesure.",
      "Le profil peut venir du marketing puis apprendre à coder pour tester plus vite.",
      "En IA appliquée, il construit des assistants avec des règles et des contrôles humains.",
      "La sécurité et la dette technique comptent autant que le résultat à court terme.",
      "Pour le marché français, ce portfolio utilise Growth Engineer comme titre principal, avec Product Builder IA et Chef de projet IA comme rôles voisins."
    ],
    problem:
      "Le titre Growth Engineer est large. Un recruteur doit regarder ce que la personne a livré, ce qui le prouve et ce qui reste limité.",
    method: [
      "Partir d'un besoin : acquisition, conversion, contenu ou automatisation.",
      "Construire une première version testable et définir comment mesurer son effet.",
      "Utiliser l'IA pour accélérer les tâches répétitives ; une personne décide et vérifie.",
      "Documenter les décisions pour qu'une équipe puisse reprendre."
    ],
    example:
      "Trois projets le montrent : Les Petites Griffes, un site familial en production ; ISCOM, des contenus SEO vérifiés avant publication ; et Preuvia, un audit de visibilité dans les assistants IA. À chaque fois : cadrer, construire, vérifier et transmettre.",
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
      "Un Growth Engineer se juge sur ce qu'il livre et documente, pas sur son intitulé.",
      "Marketing, IA et code n'ont de valeur que reliés à un livrable vérifiable.",
      "Le bon signal : des décisions écrites qu'une équipe peut reprendre."
    ]
  },
  {
    slug: "claude-code-mcp-workflow",
    title: "Comment structurer un workflow Claude Code avec MCP et agents ?",
    shortTitle: "Workflow Claude Code + MCP",
    description:
      "Organiser Claude Code avec des règles, des outils et des contrôles pour les actions sensibles.",
    published: "2026-07-02",
    updated: "2026-07-20",
    answer: [
      "Claude Code gagne à avoir une identité, des règles et des outils séparés.",
      "Le protocole MCP relie des outils externes ; les agents prennent les tâches longues à part.",
      "Les hooks, des contrôles automatiques, demandent une confirmation ou Touch ID avant une action sensible et évitent les secrets dans les journaux.",
      "Le chargement à la demande évite de tout ouvrir au démarrage.",
      "Le but est un système lisible et réutilisable, pas une collection d'outils."
    ],
    problem:
      "Sans règles ni contexte écrit, un assistant peut oublier les décisions et agir sans les contrôles attendus. Chaque session repart alors de zéro.",
    method: [
      "Séparer l'identité de l'assistant et sa configuration technique dans des fichiers dédiés.",
      "Choisir le bon outil pour chaque tâche : règle, agent, MCP ou commande simple.",
      "Mettre les recherches lourdes dans des agents pour garder le contexte principal lisible.",
      "Ajouter des contrôles sur les actions sensibles : confirmation, Touch ID et masquage des secrets.",
      "Charger les MCP et les agents seulement quand ils servent."
    ],
    example:
      "claude-code-soul est un projet open source sous licence MIT. Il rassemble un fichier d'identité, des règles, des outils et des contrôles : Touch ID pour les actions sensibles, secrets dans Keychain et contrôle avant publication. Le dépôt publié ne contient ni donnée personnelle, ni secret, ni chemin local.",
    proofs: [
      { label: "Repo claude-code-soul (GitHub)", href: "https://github.com/Jonassuhard/claude-code-soul" },
      { label: "Fiche claude-code-soul", href: "/projects/claude-code-soul.md" },
      { label: "skills.md", href: "/skills.md" }
    ],
    limits: [
      "Cette configuration reflète des choix personnels et doit être adaptée avant réutilisation.",
      "Plus de structure demande plus d'entretien : il faut nettoyer les outils et les règles.",
      "Un contrôle automatique réduit un risque, il ne le supprime pas."
    ],
    takeaway: [
      "Un bon workflow Claude Code est lisible, pas seulement riche en outils.",
      "Un contrôle automatique est plus fiable qu'une simple consigne pour une action sensible.",
      "Séparer l'identité et la configuration aide à réutiliser et publier le système."
    ]
  },
  {
    slug: "memoire-agent-markdown",
    title: "Comment organiser la mémoire d'un agent IA en Markdown ?",
    shortTitle: "Mémoire d'agent en Markdown",
    description:
      "Une méthode pour donner une mémoire durable à un agent IA avec des fichiers Markdown d'identité, de règles et de contexte projet.",
    published: "2026-07-02",
    updated: "2026-07-20",
    answer: [
      "Sans mémoire, un agent repart de zéro à chaque session. Des fichiers Markdown simples peuvent garder le contexte.",
      "Je sépare l'identité de l'agent, sa méthode de travail et le contexte du projet.",
      "Chaque projet garde son contexte, chargé quand on l'ouvre, au lieu d'un fichier unique très long.",
      "Les corrections deviennent des règles écrites pour éviter la même erreur.",
      "Le Markdown reste simple à lire quand plusieurs agents travaillent sur un même projet."
    ],
    problem:
      "Entre deux sessions, un assistant peut perdre le contexte, les préférences et les erreurs déjà connues. Sans structure, les notes deviennent trop longues ou ne sont pas relues au bon moment.",
    method: [
      "Créer un fichier d'identité stable avec le ton, les valeurs et les refus de l'agent.",
      "Garder les règles de méthode dans des fichiers courts et utilisables.",
      "Donner à chaque projet un fichier de contexte, lu au début et mis à jour à la fin de la tâche.",
      "Transformer une correction en règle datée, avec sa cause et son correctif.",
      "Garder les fichiers courts. Quand ils deviennent trop longs, créer un fichier séparé et faire un lien."
    ],
    example:
      "Sur claude-code-soul, la mémoire tient dans des fichiers Markdown versionnés : identité, règles, contexte par projet et leçons. Claude, Gemini et Codex lisent les mêmes fichiers. L'agent relit le fichier à jour au lieu de se fier à un ancien résumé.",
    proofs: [
      { label: "Repo claude-code-soul (GitHub)", href: "https://github.com/Jonassuhard/claude-code-soul" },
      { label: "Fiche claude-code-soul", href: "/projects/claude-code-soul.md" },
      { label: "skills.md", href: "/skills.md" }
    ],
    limits: [
      "C'est du Markdown, pas une base de recherche sémantique. Pour retrouver un fait parmi des milliers de notes, une recherche dédiée est plus adaptée.",
      "La méthode demande de la discipline. Un fichier non mis à jour devient vite faux.",
      "Cette organisation reflète une façon de travailler. Il faut l'adapter, pas la copier telle quelle."
    ],
    takeaway: [
      "La mémoire utile est celle que l'agent relit au bon moment, pas la plus longue.",
      "Trois couches suffisent : identité, méthode, contexte projet.",
      "Le Markdown en clair gagne quand plusieurs agents doivent lire la même mémoire."
    ],
    faq: [
      {
        q: "Pourquoi pas Obsidian ou une base de notes ?",
        a: "Obsidian convient bien à des notes humaines. Pour un agent, des fichiers texte simples sont plus faciles à lire et modifier directement. Le Markdown se versionne, se compare et se partage entre plusieurs modèles."
      },
      {
        q: "Ça marche avec d'autres modèles que Claude ?",
        a: "Oui. Claude, Gemini et Codex peuvent lire les mêmes fichiers Markdown. Ce format permet de changer de modèle sans réécrire la mémoire."
      }
    ]
  }
];

export function getKnowledgePage(slug: string) {
  return knowledgePages.find((page) => page.slug === slug);
}
