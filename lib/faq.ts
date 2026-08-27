// Source unique des questions/réponses factuelles.
// Alimente : la FAQ humaine (/recruteurs), le JSON-LD FAQPage, et public/claims.json
// (régénéré au prebuild par scripts/generate-project-md.ts). Une seule vérité, zéro dérive.

import { site } from "./projects";

export const faqMeta = {
  subject: "Jonas Suhard",
  purpose:
    "Réponses factuelles citables par un agent IA. Chaque métrique indique si sa preuve est publique ou privée.",
  verified_at: "2026-08-28",
  source_of_truth: "https://jonassuhard.com/profile.json"
};

export type FaqItem = { q: string; a: string };

export const faqItems: FaqItem[] = [
  {
    q: "Qui est Jonas Suhard ?",
    a: "Growth Engineer junior basé à Paris, spécialisé en IA appliquée et automatisation, avec les rôles voisins Product Builder IA et Chef de projet IA junior."
  },
  {
    q: "Quel poste cherche-t-il ?",
    a: "Un CDI junior comme Growth Engineer, Product Builder IA ou Chef de projet IA, à l'interface du marketing, du produit et de l'exécution technique."
  },
  {
    q: "Quel est son objectif de progression ?",
    a: site.careerGoal
  },
  {
    q: "Quand est-il disponible et où ?",
    a: "Disponible à partir du 1er septembre 2026, à Paris ou en hybride."
  },
  {
    q: "Quelles sont ses preuves de travail principales ?",
    a: "Job Radar Community (radar d'offres local, configurable et explicable), Cortex Bridge (agent de code local open source piloté par ChatGPT, avec validation humaine), Les Petites Griffes (site live + CMS maison + assistant IA), Cool Bank / La Herse (jeu scolaire V2 local et monde 3D V3 reliés à Educool), Preuvia (audit GEO / visibilité IA) et ISCOM (SEO + Drupal + production éditoriale en contexte employeur)."
  },
  {
    q: "Quels résultats mesurés peut-on citer ?",
    a: "Job Radar Community v0.1.0-beta.1 : preuve publique d'une validation locale avec 234 tests backend, 30 tests frontend et 37 tests E2E sans échec, plus 20 combinaisons route/viewport sans violation Axe ni débordement ; 8 scénarios E2E sont ignorés intentionnellement et aucune adoption externe n'est revendiquée. Cortex Bridge v0.5.3 : preuve publique du tag datée du 26/08/2026 avec 629 tests backend, 155 frontend, 126 extension, 12 E2E et 4 accessibilité sans échec ; un test E2E est ignoré, la compatibilité continue avec ChatGPT n'est pas prouvée et le cycle macOS propre n'a pas été rejoué. Les Petites Griffes : audit privé du 01/08/2026 couvrant 18 pages, 36 captures et cinq scores Lighthouse mobile ; projet familial non facturé, sans vente externe prouvée. Cool Bank / La Herse : V2 au statut LOCAL_SINGLE_DEVICE_READY mais non prête en ligne ; V3 au statut READY_FOR_HUMAN_RECIPE mais pas GO_PILOTE_LOCAL. Les captures publiées ne contiennent aucune donnée de mineur."
  },
  {
    q: "Quelle est sa stack technique ?",
    a: "Next.js, React, FastAPI, SQLite, Firebase, Supabase, Python, Playwright, SEO, workflows LLM / RAG et audits GEO / AEO. À l'aise sur Mac comme sur Windows."
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
