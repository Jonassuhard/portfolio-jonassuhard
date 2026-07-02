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
};

export const knowledgePages: KnowledgePage[] = [
  {
    slug: "llms-txt-portfolio",
    title: "Comment rendre un portfolio citable par un agent IA ?",
    shortTitle: "Portfolio citable par IA",
    description:
      "Méthode concrète pour rendre un portfolio lisible par les agents : llms.txt, profile.json, claims.json, Markdown et JSON-LD.",
    updated: "2026-07-02",
    answer: [
      "Un agent IA ne lit pas un portfolio comme un recruteur : il extrait des faits, des liens et des preuves.",
      "La page HTML reste la version canonique pour les humains.",
      "Les fichiers Markdown et JSON servent de carte lisible par machine.",
      "Le but n'est pas de forcer une citation, mais de rendre les faits vérifiables.",
      "Ce site utilise llms.txt, profile.json, claims.json, skills.md, des fiches projet Markdown et un knowledge graph JSON-LD."
    ],
    problem:
      "Un beau portfolio peut rester flou pour un agent : titre, disponibilité, compétences, projets et limites sont dispersés dans le design. Sans source structurée, le modèle résume au jugé.",
    method: [
      "Créer un llms.txt court qui joue le rôle de carte d'entrée.",
      "Maintenir un profile.json pour les faits stables : titre, disponibilité, stack, projets et limites.",
      "Ajouter un claims.json en questions-réponses pour les réponses que l'agent doit pouvoir citer sans inventer.",
      "Publier une version Markdown des pages clés pour réduire le bruit de layout.",
      "Exposer un graphe JSON-LD qui relie personne, compétences et projets par des IDs stables."
    ],
    example:
      "Sur ce portfolio, Preuvia sert de cas produit GEO/AEO ; la couche agent-readable du site sert de démonstrateur vivant. Un recruteur lit les pages HTML, un agent peut suivre llms.txt puis vérifier les mêmes faits dans les JSON et Markdown.",
    proofs: [
      { label: "llms.txt", href: "/llms.txt" },
      { label: "profile.json", href: "/profile.json" },
      { label: "claims.json", href: "/claims.json" },
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
    updated: "2026-07-02",
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
  }
];

export function getKnowledgePage(slug: string) {
  return knowledgePages.find((page) => page.slug === slug);
}
