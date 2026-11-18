import type { Metadata } from "next";
import Link from "next/link";
import { getProject, site, pageMeta } from "@/lib/projects";
import AnimatedTitle from "../animated-title";

// Page envoyée par lien à un dirigeant. Elle reste hors du menu et du sitemap,
// et non indexée : /recruteurs porte déjà le résumé public.
export const metadata: Metadata = {
  ...pageMeta({
    path: "/dirigeants",
    title: "Outils en service",
    description:
      "Trois outils construits par Jonas Suhard, leur état réel, leurs limites et la méthode proposée pour un premier mois."
  }),
  robots: { index: false, follow: true }
};

const tools = [
  {
    slug: "educool-v2",
    line: "Une application de classe pour suivre les acquis des élèves et préparer les livrets.",
    limit: "Une seule classe. Le temps gagné n'est pas chiffré."
  },
  {
    slug: "les-petites-griffes",
    line: "Le site d'un studio, avec un espace de gestion maison et un assistant IA cadré.",
    limit: "Projet familial, non facturé."
  },
  {
    slug: "job-radar",
    line: "Un robot qui lit les offres d'emploi chaque matin, les classe selon des règles écrites et prépare les dossiers.",
    limit: "Outil personnel, pas un produit vendu."
  }
] as const;

const firstMonth = [
  { when: "Semaine 1", title: "Écouter", text: "Rencontrer deux ou trois équipes et noter ce qui leur prend du temps." },
  { when: "Semaine 2", title: "Choisir", text: "Retenir la tâche la plus répétitive, celle qu'un outil peut vraiment prendre." },
  { when: "Semaine 3", title: "Livrer", text: "Mettre un premier outil entre les mains de l'équipe, testé et documenté." },
  { when: "Semaine 4", title: "Mesurer", text: "Regarder qui s'en sert, corriger, puis décider de la suite avec vous." }
] as const;

export default function LeadersPage() {
  return (
    <div className="page recruiter-page">
      <section className="recruiter-intro">
        <p className="eyebrow">CDI ou première mission · Paris et Île-de-France · disponible {site.availability}</p>
        <AnimatedTitle>Je construis des outils internes avec l'IA.</AnimatedTitle>
        <p className="lead">
          Je viens du marketing digital. Je pars d'un besoin métier, je construis
          l'outil, je le teste et j'écris noir sur blanc ce qu'il ne sait pas faire.
        </p>
        <div className="button-row">
          <a className="button primary" href={`mailto:${site.email}`}>Me décrire une tâche</a>
          <a className="lk" href={site.linkedin}>LinkedIn</a>
        </div>
      </section>

      <section className="section" id="outils-en-service">
        <div className="section-head">
          <div>
            <p className="section-kicker">État réel et limite</p>
            <h2>Trois outils en service.</h2>
          </div>
          <Link className="lk" href="/projets">Tous les projets</Link>
        </div>
        <div className="matrix matrix-3">
          {tools.map((tool) => {
            const project = getProject(tool.slug);
            if (!project) return null;
            return (
              <div className="matrix-item" key={tool.slug}>
                <h3>{project.shortTitle}</h3>
                <p>{tool.line}</p>
                <p className="case-meta product-status">{project.cardStatus ?? project.status}</p>
                <p className="skill-limit">Limite. {tool.limit}</p>
                <p className="section-links">
                  <Link className="lk" href={`/projets/${project.slug}`}>Voir le projet</Link>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section" id="premier-mois">
        <div className="section-head">
          <div>
            <p className="section-kicker">Une méthode à ajuster avec vous</p>
            <h2>Ce que je ferais chez vous le premier mois.</h2>
          </div>
        </div>
        <ol className="flow-chart">
          {firstMonth.map((step) => (
            <li key={step.title}>
              <span className="flow-index">{step.when}</span>
              <strong>{step.title}</strong>
              <span className="flow-text">{step.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section progression-section">
        <div>
          <p className="section-kicker">Autant le dire tout de suite</p>
          <h2>Ce qu'il faut savoir avant de m'écrire.</h2>
        </div>
        <div className="prose">
          <p>J'ai deux alternances et des projets derrière moi. Je n'ai pas dix ans de poste.</p>
          <p>Je travaille avec des agents IA. Je relis, je teste et je garde la main sur ce qui part.</p>
          <p>
            Le détail de chaque affirmation est sur la page{" "}
            <Link className="lk" href="/preuves">Preuves</Link>.
          </p>
        </div>
      </section>

      <section className="section closing-section">
        <div>
          <h2>Vingt minutes suffisent.</h2>
          <p>
            Décrivez-moi une tâche qui revient chaque semaine dans vos équipes.
            Je vous dis si un outil peut la prendre, et en combien de temps.
          </p>
        </div>
        <div className="button-row">
          <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
          <a className="button" href={site.cvClassic}>Voir mon CV (PDF)</a>
        </div>
      </section>
    </div>
  );
}
