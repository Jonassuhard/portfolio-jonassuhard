// Source unique des questions/réponses factuelles.
// Alimente : la FAQ humaine (/recruteurs), le JSON-LD FAQPage, et public/claims.json
// (régénéré au prebuild par scripts/generate-project-md.ts). Une seule vérité, zéro dérive.

export const faqMeta = {
  subject: "Jonas Suhard",
  purpose:
    "Réponses factuelles citables par un agent IA. Chaque métrique indique si sa preuve est publique ou privée.",
  verified_at: "2026-07-20",
  source_of_truth: "https://jonassuhard.com/profile.json"
};

export type FaqItem = { q: string; a: string };

export const faqItems: FaqItem[] = [
  {
    q: "Qui est Jonas Suhard ?",
    a: "Chef de projet IA appliquée & automatisation junior basé à Paris, avec une spécialisation Growth Engineer et Product Builder IA."
  },
  {
    q: "Quel poste cherche-t-il ?",
    a: "Un CDI junior comme Chef de projet IA appliquée & automatisation, Growth Engineer ou Product Builder IA."
  },
  {
    q: "Quand est-il disponible et où ?",
    a: "Disponible à partir du 1er septembre 2026, à Paris ou en hybride."
  },
  {
    q: "Quelles sont ses preuves de travail principales ?",
    a: "ISCOM (SEO + Drupal + production éditoriale en contexte employeur), Les Petites Griffes (site live + CMS maison + assistant IA), Educool / La Herse (application web de classe sur Firebase) et Preuvia (audit GEO / visibilité IA)."
  },
  {
    q: "Quels résultats mesurés peut-on citer ?",
    a: "Les Petites Griffes : rapport Lighthouse interne du 29/06/2026, mobile 88, SEO 100, accessibilité 93. Educool / La Herse : démonstration privée sur données fictives ; aucune donnée de mineur n'est publiée."
  },
  {
    q: "Quelle est sa stack technique ?",
    a: "Next.js, React, Firebase, Supabase, Python, Playwright, SEO, workflows LLM / RAG et audits GEO / AEO. À l'aise sur Mac comme sur Windows."
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
