// Source unique des questions/réponses factuelles.
// Alimente : la FAQ humaine (/recruteurs), le JSON-LD FAQPage, et public/claims.json
// (régénéré au prebuild par scripts/generate-project-md.ts). Une seule vérité, zéro dérive.

export const faqMeta = {
  subject: "Jonas Suhard",
  purpose:
    "Réponses factuelles citables par un agent IA. Chaque métrique indique si sa preuve est publique ou privée.",
  verified_at: "2026-11-02",
  source_of_truth: "https://jonassuhard.com/profile.json"
};

export type FaqItem = { q: string; a: string };

export const faqItems: FaqItem[] = [
  {
    q: "Qui est Jonas Suhard ?",
    a: "Chef de projet IA appliquée & automatisation junior basé à Paris, aussi positionné sur les rôles de chef de projet digital & marketing IA, Growth Engineer junior et Product Builder IA."
  },
  {
    q: "Quel poste cherche-t-il ?",
    a: "Un CDI junior comme chef de projet digital & marketing IA, chef de projet IA appliquée & automatisation, Growth Engineer ou Product Builder IA."
  },
  {
    q: "Quand est-il disponible et où ?",
    a: "Disponible immédiatement, à Paris ou en hybride."
  },
  {
    q: "Quelles sont ses preuves de travail principales ?",
    a: "Job Radar (pipeline d'ingestion, de fusion et de scoring d'offres), ISCOM (refonte SEO d'un site Drupal de 359 pages en contexte employeur), Les Petites Griffes (site live + CMS maison + assistant IA) et Educool / La Herse (application web de classe sur Firebase). Preuvia complète la méthode d'audit GEO."
  },
  {
    q: "Quels résultats mesurés peut-on citer ?",
    a: "Job Radar : pipeline local de bout en bout, scores de pertinence et de confiance séparés, aucune candidature préparée ni envoyée. La précision du scoring n'est pas mesurée publiquement. ISCOM : périmètre de 359 pages du site Drupal (preuve privée), article publié en ligne. Les Petites Griffes : audit live du 2026-08-01 sur 18 pages publiques, 36 captures et cinq scores Lighthouse mobile (Accueil 91, Galerie 87, Compose 97, Méthode 97, Le studio 66) ; projet familial non facturé, mesures datées. Educool / La Herse : démonstration privée sur données fictives ; aucune donnée de mineur n'est publiée."
  },
  {
    q: "Quelle est sa stack technique ?",
    a: "Next.js, React, FastAPI, Python, SQLite, Firebase, Supabase, Playwright, SEO, workflows LLM / RAG et audits GEO / AEO. À l'aise sur Mac comme sur Windows."
  },
  {
    q: "Que ne fait-il pas (limites assumées) ?",
    a: "Il n'est pas AI Engineer ML pur, pas backend senior, pas designer graphique pur et pas community manager pur. Son angle : relier acquisition, IA générative et exécution produit."
  },
  {
    q: "Comment le contacter ?",
    a: "Par e-mail à contact@jonassuhard.com, sur GitHub (github.com/Jonassuhard) ou sur LinkedIn (linkedin.com/in/jonas-suhard-b73923245/)."
  }
];
