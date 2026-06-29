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
  architecture?: string[];
  v2?: string[];
  notMeasured?: string[];
  repoStatus?: string;
  liveLabel?: string;
  evidenceNote?: string;
  noindex?: boolean;
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
  linkedin: "https://www.linkedin.com/in/jonas-suhard-b73923245/",
  instagram: "",
  location: "Paris, France",
  availability: "1er octobre 2026",
  cvClassic: "/cv.pdf",
  cvStyled: "/cv-portfolio.pdf"
};

export const projects: Project[] = [
  {
    slug: "les-petites-griffes",
    title: "Les Petites Griffes - site live, CMS et assistant IA",
    shortTitle: "Les Petites Griffes",
    type: "Site live + CMS + assistant IA",
    period: "Avril 2026 - Juin 2026",
    role: "Stratégie, design, développement, SEO, déploiement, QA",
    status: "Prod live",
    tier: 1,
    image: "/assets/cards/les-petites-griffes.webp",
    repoStatus: "Privé — code et données client",
    liveLabel: "Live · URL communiquée en entretien",
    evidenceNote:
      "Captures anonymisées (home, CMS, assistant IA) et démo courte sur demande ou en entretien ; rapport Lighthouse daté disponible.",
    architecture: [
      "Front Next.js (React) rendu et déployé sur Vercel.",
      "Contenus dynamiques (galerie, prestations, tarifs, FAQ) servis depuis Supabase, éditables via un CMS maison protégé.",
      "Authentification du back-office via Clerk.",
      "Assistant IA cadré par une base de connaissance avec garde-fous (prix, disponibilités, adresse).",
      "SEO local : JSON-LD, sitemap et contenus structurants."
    ],
    v2: [
      "Instrumenter les demandes entrantes pour mesurer la conversion.",
      "Itérer l'assistant à partir des vraies questions clientes."
    ],
    notMeasured: [
      "Impact business (CA, demandes générées) : non mesuré à ce stade.",
      "Taux d'usage de l'assistant côté visiteurs : non instrumenté."
    ],
    proofLine:
      "Site client live en production (URL communiquée en entretien · captures anonymisées sur demande), CMS maison, SEO local, assistant IA cadré, Lighthouse mobile 88 / SEO 100 / a11y 93 (audit revérifié le 29/06).",
    summary:
      "Transformer une activité Instagram en présence web crédible, éditable et utile pour les demandes clientes.",
    stack: ["Next.js", "React", "Supabase", "Clerk", "Vercel", "LLM"],
    recruiterProof: [
      "Livraison d'un site public réel avec domaine et contraintes de production.",
      "Connexion entre SEO local, UX de conversion, CMS et assistant IA.",
      "Gestion d'incidents: domaine .fr, données DB, prix, galerie, cohérentisation contenu."
    ],
    constraints: [
      "Budget quasi nul et besoin d'autonomie côté cliente.",
      "Données privées a ne pas exposer.",
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
        decision: "Assistant IA cadré",
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
      "Site client live en production, URL masquée publiquement pour confidentialité (captures anonymisées sur demande).",
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
    role: "Développement, UX, sécurité, PDF, Firebase, maintenance",
    status: "Prod / maintenance",
    tier: 1,
    image: "/assets/cards/educool.webp",
    repoStatus: "Privé — RGPD (données mineurs)",
    liveLabel: "Usage classe (non public)",
    evidenceNote:
      "Captures anonymisées sur données fictives et démo sur demande ; aucune donnée élève réelle n'est publiée.",
    architecture: [
      "Application web / PWA Next.js utilisable sur tablette par une non-dev.",
      "Données et authentification sur Firebase / Firestore.",
      "Opérations sensibles déportées en Cloud Functions (l'autorité métier n'est pas seulement côté client).",
      "Génération de livrets PDF et export ZIP.",
      "Rules Firebase et tests (Vitest) sur les lots livrés."
    ],
    v2: [
      "Durcissement continu des rules et des audits de sécurité.",
      "Industrialisation des exports PDF."
    ],
    notMeasured: [
      "Aucune métrique élève n'est publiable (données de mineurs).",
      "Gain de temps enseignant : observé en retours terrain, non chiffré publiquement."
    ],
    proofLine:
      "Application utilisée par une classe, Firebase, données sensibles, PDF et audits de sécurité.",
    summary:
      "Construire un produit terrain pour une enseignante: suivi de compétences, livrets, PDF, PWA et logique métier scolaire.",
    stack: ["Next.js", "Firebase", "Firestore", "Cloud Functions", "Vitest", "PDF"],
    recruiterProof: [
      "Produit utilise par une vraie utilisatrice avec retours terrain.",
      "Conscience sécurité sur données enfants et rules Firebase.",
      "Capacité a investiguer des bugs PDF, déploiement, auth et données."
    ],
    constraints: [
      "Données enfants strictement anonymisées.",
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
        why: "Éviter de mettre l'autorité métier uniquement côté client.",
        rejected: "Tout faire dans le front."
      },
      {
        decision: "Audits sécurité documentés",
        why: "Données mineurs = pas de validation au doigt mouillé.",
        rejected: "Se contenter d'un 'ca marche'."
      }
    ],
    delivered: [
      "Application web/PWA.",
      "Suivi élèves et compétences.",
      "Génération PDF et ZIP.",
      "Rules Firebase, Cloud Functions et tests.",
      "Refontes UX successives après retours."
    ],
    results: [
      "Une classe entière en contexte réel, données élèves anonymisées.",
      "Tests documentés sur les lots livrés (génération PDF, rules, parcours).",
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
    title: "Capsélys - refonte conversion et expérimentation IA",
    shortTitle: "Capsélys",
    type: "Conversion + expérimentation IA",
    period: "Juin 2026 - Juillet 2026",
    role: "Stratégie, audit, UX, contenus, expérimentation IA, deck client",
    status: "Staging / workshop MBA",
    tier: 1,
    image: "/assets/cards/capselys.webp",
    repoStatus: "Privé — projet client",
    liveLabel: "Staging (non public)",
    evidenceNote:
      "Captures du staging et deck client (14 slides) sur demande ; mesures lab, pas une prod.",
    architecture: [
      "WordPress + Divi imposés ; refonte sur un environnement de staging sécurisé.",
      "Audits de rendu multi-viewports via Playwright (le DOM Divi ne suffit pas à prouver le visuel).",
      "Déploiement séquentiel sur staging pour ne pas casser la prod client.",
      "Prototype d'assistant IA qualifiant orientant vers le bon service."
    ],
    v2: [
      "Passage en production après validation client.",
      "Mesure des retombées conversion une fois en ligne."
    ],
    notMeasured: [
      "Retombées business (conversion, adhésions) : non mesurées — staging, pas une prod utilisée.",
      "Les gains attendus restent des hypothèses à valider après déploiement."
    ],
    proofLine:
      "Refonte orientée conversion, staging WordPress sécurisé, deck oral client et audits multi-viewports.",
    summary:
      "Clarifier une offre complexe, reduire la friction d'adhesion et présenter une démarche d'expérimentation marketing.",
    stack: ["WordPress", "Divi", "Playwright", "PHP", "PDF", "LLM workflows"],
    recruiterProof: [
      "Cadrage client et conversion, pas seulement exécution front.",
      "Capacité a travailler avec une stack contrainte et vieillissante.",
      "Présentation honnête: staging, mesures lab, limites et plan d'action."
    ],
    constraints: [
      "Staging, pas prod finale.",
      "Client présent a l'oral MBA.",
      "WordPress/Divi impose et risques de régression visuelle."
    ],
    decisions: [
      {
        decision: "Déploiement séquentiel sur staging",
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
      "Staging visuel retravaillé.",
      "Pages service et adhesion mieux structurées.",
      "Deck oral client 14 slides.",
      "Audits visuels et rapports.",
      "Prototype d'assistant / tunnel."
    ],
    results: [
      "Support oral MBA prêt avec garde-fous client.",
      "Refonte staging auditee sur plusieurs tailles.",
      "Mesures business réelles a qualifier après déploiement."
    ],
    limits: [
      "Ne pas dire que le staging est une prod utilisée.",
      "Retombees business non disponibles a court terme.",
      "Certaines décisions dépendent de validation client."
    ],
    links: [
      { label: "Version Markdown", href: "/projects/capselys.md" }
    ]
  },
  {
    slug: "iscom",
    title: "ISCOM - SEO, Drupal et production éditoriale",
    shortTitle: "ISCOM",
    type: "SEO + Drupal + production éditoriale",
    period: "2026",
    role: "SEO, fact-check, contenu, audits, CMS, process qualité",
    status: "Alternance / client interne",
    tier: 1,
    image: "/assets/cards/iscom.webp",
    repoStatus: "CMS employeur — non publiable",
    liveLabel: "Actu publiée (lien)",
    architecture: [
      "Production éditoriale SEO saisie dans Drupal (CMS sensible).",
      "Audits de cannibalisation et inter-marques via Semrush.",
      "Automatisations Playwright pour la saisie et les contrôles.",
      "Checklist de pré-publication et fact-check claim par claim avant mise en ligne."
    ],
    v2: [
      "Étendre les garde-fous qualité à d'autres types de contenus."
    ],
    notMeasured: [
      "Impact trafic SEO des contenus : suivi côté employeur, non publiable ici."
    ],
    proofLine:
      "Production SEO a volume, audits cannibalisation, saisie Drupal et garde-fous de publication.",
    summary:
      "Produire et corriger du contenu SEO dans un CMS sensible, avec exigences marque, vérification et validation humaine.",
    stack: ["Drupal", "Playwright", "Semrush", "SEO", "LLM-assisted QA"],
    recruiterProof: [
      "Production a volume avec contrôle qualité.",
      "Capacité à transformer un audit SEO en décisions nommées.",
      "Discipline sur actions sensibles: ne pas publier sans validation."
    ],
    constraints: [
      "Publication CMS sensible.",
      "Faits, chiffres et sources a verifier.",
      "Validation éditoriale interne avant publication."
    ],
    decisions: [
      {
        decision: "Checklist avant publication",
        why: "Éviter erreurs live et publication irréversible.",
        rejected: "Automatiser le bouton enregistrer."
      },
      {
        decision: "Fact-check claim par claim",
        why: "Les contenus IA inventent vite des chiffres plausibles.",
        rejected: "Rédaction IA brute."
      }
    ],
    delivered: [
      "Actus SEO montées dans Drupal.",
      "Audits cannibalisation et inter-marques.",
      "Payloads éditoriaux prêts a coller.",
      "Images et champs media contrôles.",
      "Lessons qualité et garde-fous."
    ],
    results: [
      "Actu IA agentique publiée live le 16/06.",
      "Audit cannibalisation livre en PDF.",
      "Process de pre-publication durci après erreurs."
    ],
    limits: [
      "Ne pas publier accès CMS ni données internes.",
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
    repoStatus: "Public à venir (copie anonymisée prête)",
    liveLabel: "Lab",
    noindex: true,
    architecture: [
      "Pipeline Python orchestrant : rendu Godot → FFmpeg → interpolation RIFE → publication via l'API YouTube."
    ],
    v2: [
      "Cadrer le contenu pour ne pas brouiller le positionnement CDI."
    ],
    notMeasured: [
      "Audience YouTube : à vérifier, non avancée comme preuve recruteur."
    ],
    proofLine:
      "Pipeline Godot -> FFmpeg -> interpolation -> YouTube API pour videos 1VS1.",
    summary:
      "Automatiser une chaine de production video, utile comme preuve Python/pipeline, pas comme argument principal recruteur.",
    stack: ["Godot", "Python", "FFmpeg", "RIFE", "YouTube API"],
    recruiterProof: [
      "Automatisation de pipeline creatif.",
      "Orchestration fichiers, rendu et publication.",
      "Capacité a industrialiser une idee personnelle."
    ],
    constraints: ["Contenu lab a cadrer pour ne pas brouiller le positionnement CDI."],
    decisions: [
      {
        decision: "Le garder en Tier 2",
        why: "Bonne preuve technique, mais moins directement recruteur marketing IA.",
        rejected: "Le mettre en premiere ligne."
      }
    ],
    delivered: ["Pipeline de rendu", "Videos publiées", "Scripts d'automatisation"],
    results: ["Audience YouTube a verifier avant publication finale."],
    limits: ["Ne pas laisser le côté meme-content dominer le portfolio."],
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
    repoStatus: "Public à venir (copie anonymisée prête)",
    liveLabel: "Lab / archive",
    noindex: true,
    architecture: [
      "Prototype mobile React Native, backend Firebase, OCR via un service FastAPI."
    ],
    v2: [
      "Aucune suite prévue — gardé comme autopsie produit honnête."
    ],
    notMeasured: [
      "Aucune traction marché ni revenu : projet scolaire."
    ],
    proofLine:
      "Prototype mobile basket amateur, utile pour montrer raisonnement produit et limites.",
    summary:
      "Projet MBA a garder comme autopsie honnête: idee, personas, prototype, limites.",
    stack: ["React Native", "Firebase", "FastAPI", "OCR"],
    recruiterProof: [
      "Raisonnement produit.",
      "Capacité a documenter aussi ce qui n'a pas marche.",
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
    proofSlugs: ["iscom", "capselys", "les-petites-griffes"],
    proofExtra: "",
    proof: "ISCOM, Capsélys, Les Petites Griffes",
    note: "Recherche, structure, maillage, Drupal, vérification et publication encadrée."
  },
  {
    name: "Next.js / React",
    proofSlugs: ["les-petites-griffes", "educool-la-herse"],
    proofExtra: "ce portfolio",
    proof: "Les Petites Griffes, Educool, ce portfolio",
    note: "Interfaces utiles, pages publiques, routes, rendu statique et production."
  },
  {
    name: "IA générative",
    proofSlugs: ["capselys", "les-petites-griffes"],
    proofExtra: "RAG / workflows LLM",
    proof: "Capsélys, Les Petites Griffes, RAG / workflows LLM",
    note: "Assistant cadre, workflows LLM, fact-check, pas de promesse magique."
  },
  {
    name: "Automatisation",
    proofSlugs: ["battle-engine"],
    proofExtra: "audits Playwright, scripts Python",
    proof: "Battle Engine, audits Playwright, scripts Python",
    note: "Pipelines Python, Playwright, génération, contrôles et vérification."
  },
  {
    name: "Produit / arbitrage",
    proofSlugs: ["educool-la-herse", "capselys", "hoopsphere"],
    proofExtra: "",
    proof: "Educool, Capsélys, HoopSphere",
    note: "Contraintes terrain, limites explicites, décisions et alternatives rejetées."
  },
  {
    name: "Sécurité / données",
    proofSlugs: ["educool-la-herse", "les-petites-griffes"],
    proofExtra: "",
    proof: "Educool, Les Petites Griffes",
    note: "Données sensibles, auth, rules, anonymisation et prudence de publication."
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

