export type ProjectTier = 1 | 2 | 3;

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  type: string;
  period: string;
  role: string;
  status: string;
  tier: ProjectTier;
  image: string;
  proofLine: string;
  summary: string;
  stack: string[];
  recruiterProof: string[];
  constraints: string[];
  decisions: Array<{
    decision: string;
    why: string;
    rejected: string;
  }>;
  delivered: string[];
  results: string[];
  limits: string[];
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
};

// Origine canonique unique : env en prod (jonassuhard.com dès SSL), sinon URL Vercel live.
// Pilote metadataBase, sitemap, robots et JSON-LD pour qu'ils pointent tous la même origine crawlable.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-jonassuhard.vercel.app"
).replace(/\/$/, "");

export const site = {
  name: "Jonas Suhard",
  title: "Builder IA appliquée & Growth Engineer",
  description:
    "Portfolio de preuves de Jonas Suhard : projets réels, décisions, contraintes, stacks et résultats — profil hybride marketing, IA appliquée et développement full-stack.",
  email: "contact@jonassuhard.com",
  github: "https://github.com/Jonassuhard",
  linkedin: "https://www.linkedin.com/in/jonassuhard/",
  location: "Paris, France",
  availability: "Octobre 2026"
};

export const projects: Project[] = [
  {
    slug: "les-petites-griffes",
    title: "Les Petites Griffes - site live, CMS et assistant IA",
    shortTitle: "Les Petites Griffes",
    type: "Site live + CMS + assistant IA",
    period: "Avril 2026 - Juin 2026",
    role: "Strategie, design, développement, SEO, déploiement, QA",
    status: "Prod live",
    tier: 1,
    image: "/assets/cards/les-petites-griffes.webp",
    proofLine:
      "Site public live, CMS maison, SEO local, assistant IA cadré et Lighthouse mobile 88 / SEO 100 / a11y 93 (audit revérifié le 29/06).",
    summary:
      "Transformer une activité Instagram en présence web crédible, éditable et utile pour les demandes clientes.",
    stack: ["Next.js", "React", "Supabase", "Clerk", "Vercel", "LLM"],
    recruiterProof: [
      "Livraison d'un site public réel avec domaine et contraintes de production.",
      "Connexion entre SEO local, UX de conversion, CMS et assistant IA.",
      "Gestion d'incidents: domaine .fr, données DB, prix, galerie, cohérentisation contenu."
    ],
    constraints: [
      "Budget quasi nul et besoin d'autonomie cote cliente.",
      "Donnees privées a ne pas exposer.",
      "Contenus variables servis par base de données, pas seulement par le code."
    ],
    decisions: [
      {
        decision: "Next.js + Vercel",
        why: "Performance, contrôle du rendu, déploiement rapide.",
        rejected: "WordPress trop lourd pour ce besoin précis."
      },
      {
        decision: "CMS maison",
        why: "La cliente peut modifier galerie, tarifs, FAQ et contenus sans toucher au code.",
        rejected: "CMS externe plus lent a cadrer et plus cher a maintenir."
      },
      {
        decision: "Assistant IA cadre",
        why: "Aider les clientes a formuler leur demande sans promettre une automation magique.",
        rejected: "Chatbot libre, trop risque pour prix, disponibilites et adresse."
      }
    ],
    delivered: [
      "Site public responsive.",
      "CMS admin protégé.",
      "Galerie, prestations, tarifs, FAQ et parcours Compose ta pose.",
      "Assistant IA avec base de connaissance et garde-fous.",
      "SEO local, JSON-LD, sitemap et contenus structurants."
    ],
    results: [
      "Lighthouse mobile 88, SEO 100, accessibilite 93 (audit revérifié le 29/06).",
      "Site client live en production (URL communiquée sur demande).",
      "Back-office utilisable par la cliente."
    ],
    limits: [
      "Projet client réel (TPE) : vrai contexte utilisateur en production, pas un client enterprise.",
      "Mesure business encore à consolider.",
      "Captures dashboards et adresse précise non publiables (confidentialité cliente)."
    ],
    links: [
      { label: "Version Markdown", href: "/projects/les-petites-griffes.md" }
    ]
  },
  {
    slug: "educool-la-herse",
    title: "Educool / La Herse - app web pour une classe",
    shortTitle: "Educool / La Herse",
    type: "Application web education",
    period: "2026",
    role: "Developpement, UX, sécurité, PDF, Firebase, maintenance",
    status: "Prod / maintenance",
    tier: 1,
    image: "/assets/cards/educool.webp",
    proofLine:
      "Application utilisée par une classe, Firebase, données sensibles, PDF et audits de sécurité.",
    summary:
      "Construire un produit terrain pour une enseignante: suivi de compétences, livrets, PDF, PWA et logique métier scolaire.",
    stack: ["Next.js", "Firebase", "Firestore", "Cloud Functions", "Vitest", "PDF"],
    recruiterProof: [
      "Produit utilise par une vraie utilisatrice avec retours terrain.",
      "Conscience sécurité sur données enfants et rules Firebase.",
      "Capacite a investiguer des bugs PDF, déploiement, auth et données."
    ],
    constraints: [
      "Donnees enfants strictement anonymisées.",
      "Usage tablette/PWA par une non-dev.",
      "PDF imprimables et logique métier dense."
    ],
    decisions: [
      {
        decision: "Firebase / Firestore",
        why: "Rapide pour auth, données, functions et déploiement.",
        rejected: "Backend custom trop coûteux pour le contexte."
      },
      {
        decision: "Cloud Functions pour opérations sensibles",
        why: "Eviter de mettre l'autorité métier uniquement cote client.",
        rejected: "Tout faire dans le front."
      },
      {
        decision: "Audits sécurité documentés",
        why: "Donnees mineurs = pas de validation au doigt mouillé.",
        rejected: "Se contenter d'un 'ca marche'."
      }
    ],
    delivered: [
      "Application web/PWA.",
      "Suivi élèves et compétences.",
      "Generation PDF et ZIP.",
      "Rules Firebase, Cloud Functions et tests.",
      "Refontes UX successives apres retours."
    ],
    results: [
      "23 élèves dans le contexte réel de classe.",
      "Centaines de tests sur les lots documentés.",
      "Incidents identifiés, documentés et corrigés progressivement."
    ],
    limits: [
      "Aucune donnée élève ne doit apparaitre publiquement.",
      "Certaines phases sécurité sont a contextualiser finement.",
      "Projet tres dense: la case study doit rester lisible."
    ],
    links: [
      { label: "Version Markdown", href: "/projects/educool-la-herse.md" }
    ]
  },
  {
    slug: "capselys",
    title: "Capselys - refonte conversion et expérimentation IA",
    shortTitle: "Capselys",
    type: "Conversion + expérimentation IA",
    period: "Juin 2026 - Juillet 2026",
    role: "Strategie, audit, UX, contenus, expérimentation IA, deck client",
    status: "Staging / workshop MBA",
    tier: 1,
    image: "/assets/cards/capselys.webp",
    proofLine:
      "Refonte orientee conversion, staging Prometheus, deck oral client et audits multi-viewports.",
    summary:
      "Clarifier une offre complexe, reduire la friction d'adhesion et présenter une démarche d'expérimentation marketing.",
    stack: ["WordPress", "Divi", "Playwright", "PHP", "PDF", "LLM workflows"],
    recruiterProof: [
      "Cadrage client et conversion, pas seulement exécution front.",
      "Capacite a travailler avec une stack contrainte et vieillissante.",
      "Presentation honnête: staging, mesures lab, limites et plan d'action."
    ],
    constraints: [
      "Staging, pas prod finale.",
      "Client present a l'oral MBA.",
      "WordPress/Divi impose et risques de régression visuelle."
    ],
    decisions: [
      {
        decision: "Deploiement sequentiel sur staging",
        why: "Valider sans casser la prod client.",
        rejected: "Push prod direct."
      },
      {
        decision: "Audits Playwright multi-viewport",
        why: "Le DOM Divi ne suffit pas a prouver le rendu.",
        rejected: "Validation visuelle ponctuelle."
      },
      {
        decision: "Assistant IA qualifiant",
        why: "Orienter vers le bon service et contact humain.",
        rejected: "Chatbot gadget sans cadre métier."
      }
    ],
    delivered: [
      "Staging visuel retravaille.",
      "Pages service et adhesion mieux structurees.",
      "Deck oral client 14 slides.",
      "Audits visuels et rapports.",
      "Prototype d'assistant / tunnel."
    ],
    results: [
      "Support oral MBA pret avec garde-fous client.",
      "Refonte staging auditee sur plusieurs tailles.",
      "Mesures business reelles a qualifier apres déploiement."
    ],
    limits: [
      "Ne pas dire que le staging est une prod utilisée.",
      "Retombees business non disponibles a court terme.",
      "Certaines decisions dependent de validation client."
    ],
    links: [
      { label: "Version Markdown", href: "/projects/capselys.md" }
    ]
  },
  {
    slug: "iscom",
    title: "ISCOM - SEO, Drupal et production editoriale",
    shortTitle: "ISCOM",
    type: "SEO + Drupal + production editoriale",
    period: "2026",
    role: "SEO, fact-check, contenu, audits, CMS, process qualite",
    status: "Alternance / client interne",
    tier: 1,
    image: "/assets/cards/iscom.webp",
    proofLine:
      "Production SEO a volume, audits cannibalisation, saisie Drupal et garde-fous de publication.",
    summary:
      "Produire et corriger du contenu SEO dans un CMS sensible, avec exigences marque, verification et validation humaine.",
    stack: ["Drupal", "Playwright", "Semrush", "SEO", "LLM-assisted QA"],
    recruiterProof: [
      "Production a volume avec contrôle qualite.",
      "Capacite a transformer un audit SEO en decisions nommees.",
      "Discipline sur actions sensibles: ne pas publier sans validation."
    ],
    constraints: [
      "Publication CMS sensible.",
      "Faits, chiffres et sources a verifier.",
      "Validation Sarah/Michel."
    ],
    decisions: [
      {
        decision: "Checklist avant publication",
        why: "Eviter erreurs live et publication irreversible.",
        rejected: "Automatiser le bouton enregistrer."
      },
      {
        decision: "Fact-check claim par claim",
        why: "Les contenus IA inventent vite des chiffres plausibles.",
        rejected: "Rédaction IA brute."
      }
    ],
    delivered: [
      "Actus SEO montees dans Drupal.",
      "Audits cannibalisation et inter-marques.",
      "Payloads editoriaux prets a coller.",
      "Images et champs media controles.",
      "Lessons qualite et garde-fous."
    ],
    results: [
      "Actu IA agentique publiee live le 16/06.",
      "Audit cannibalisation livre en PDF.",
      "Process de pre-publication durci apres erreurs."
    ],
    limits: [
      "Ne pas publier acces CMS ni données internes.",
      "Ne pas sur-vendre l'automatisation: validation humaine obligatoire.",
      "Certaines preuves restent confidentielles."
    ],
    links: [
      {
        label: "Actu live",
        href: "https://www.iscom.fr/actualites/lia-change-de-role-les-communicants-aussi",
        external: true
      },
      { label: "Version Markdown", href: "/projects/iscom.md" }
    ]
  },
  {
    slug: "battle-engine",
    title: "Battle Engine - pipeline video automatise",
    shortTitle: "Battle Engine",
    type: "Pipeline video / automation",
    period: "2026",
    role: "Pipeline Python, Godot, rendu, FFmpeg, publication",
    status: "Actif / lab",
    tier: 2,
    image: "/assets/cards/battle-engine.webp",
    proofLine:
      "Pipeline Godot -> FFmpeg -> interpolation -> YouTube API pour videos 1VS1.",
    summary:
      "Automatiser une chaine de production video, utile comme preuve Python/pipeline, pas comme argument principal recruteur.",
    stack: ["Godot", "Python", "FFmpeg", "RIFE", "YouTube API"],
    recruiterProof: [
      "Automatisation de pipeline creatif.",
      "Orchestration fichiers, rendu et publication.",
      "Capacite a industrialiser une idee personnelle."
    ],
    constraints: ["Contenu lab a cadrer pour ne pas brouiller le positionnement CDI."],
    decisions: [
      {
        decision: "Le garder en Tier 2",
        why: "Bonne preuve technique, mais moins directement recruteur marketing IA.",
        rejected: "Le mettre en premiere ligne."
      }
    ],
    delivered: ["Pipeline de rendu", "Videos publiees", "Scripts d'automatisation"],
    results: ["Audience YouTube a verifier avant publication finale."],
    limits: ["Ne pas laisser le cote meme-content dominer le portfolio."],
    links: [{ label: "Version Markdown", href: "/projects/battle-engine.md" }]
  },
  {
    slug: "hoopsphere",
    title: "HoopSphere - prototype produit MBA",
    shortTitle: "HoopSphere",
    type: "Prototype produit",
    period: "2025 - 2026",
    role: "Produit, personas, prototype, OCR",
    status: "Archive / MBA",
    tier: 3,
    image: "/assets/cards/hoopsphere.webp",
    proofLine:
      "Prototype mobile basket amateur, utile pour montrer raisonnement produit et limites.",
    summary:
      "Projet MBA a garder comme autopsie honnête: idee, personas, prototype, limites.",
    stack: ["React Native", "Firebase", "FastAPI", "OCR"],
    recruiterProof: [
      "Raisonnement produit.",
      "Capacite a documenter aussi ce qui n'a pas marche.",
      "Lien business/tech."
    ],
    constraints: ["Projet scolaire, pas traction marche."],
    decisions: [
      {
        decision: "Le présenter comme archive honnête",
        why: "La lucidite vaut mieux que le pitch startup vide.",
        rejected: "Le vendre comme SaaS abouti."
      }
    ],
    delivered: ["Prototype", "Personas", "Analyse marche"],
    results: ["Support MBA, pas preuve commerciale."],
    limits: ["Pas de traction payante."],
    links: [{ label: "Version Markdown", href: "/projects/hoopsphere.md" }]
  }
];

export const featuredProjects = projects.filter((project) =>
  ["les-petites-griffes", "educool-la-herse", "capselys"].includes(project.slug)
);

export const primaryProjects = projects.filter((project) => project.tier === 1);

export const skills = [
  {
    name: "SEO / contenu",
    proof: "ISCOM, Capselys, Les Petites Griffes",
    note: "Recherche, structure, maillage, Drupal, verification et publication encadree."
  },
  {
    name: "Next.js / React",
    proof: "Les Petites Griffes, Educool, portfolio",
    note: "Interfaces utiles, pages publiques, routes, rendu statique et production."
  },
  {
    name: "IA générative",
    proof: "Capselys, Les Petites Griffes, RAG / workflows",
    note: "Assistant cadre, workflows LLM, fact-check, pas de promesse magique."
  },
  {
    name: "Automatisation",
    proof: "Battle Engine, audits, scripts",
    note: "Pipelines Python, Playwright, génération, controles et verification."
  },
  {
    name: "Produit / arbitrage",
    proof: "Educool, Capselys, HoopSphere",
    note: "Contraintes terrain, limites explicites, decisions et alternatives rejetees."
  },
  {
    name: "Securite / données",
    proof: "Educool, Les Petites Griffes",
    note: "Donnees sensibles, auth, rules, anonymisation et prudence de publication."
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

