import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects, site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Recruteurs",
  description:
    "Résumé recruteur de Jonas Suhard: rôle cible, preuves, stack, limites honnêtes et contact."
};

export default function RecruitersPage() {
  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">Résumé 30 secondes</p>
          <h1>Où me ranger : Growth Engineer junior.</h1>
          <p className="lead">
            Profil hybride marketing, IA générative et développement full-stack.
            Je transforme des problèmes d'acquisition, de contenu ou d'operation
            en outils utilisables.
          </p>
          <div className="button-row">
            <a className="button primary" href="/cv.pdf">CV PDF</a>
            <a className="button" href={`mailto:${site.email}`}>Email</a>
            <a className="button" href={site.github}>GitHub</a>
          </div>
        </div>
        <div className="panel">
          <h2>Signal utile</h2>
          <table className="summary-table">
            <tbody>
              <tr>
                <th>Contrat</th>
                <td>CDI junior / junior+</td>
              </tr>
              <tr>
                <th>Zone</th>
                <td>Paris ou hybride</td>
              </tr>
              <tr>
                <th>Rôles</th>
                <td>Growth Engineer, Marketing Technologist IA, Chef de projet IA orienté produit</td>
              </tr>
              <tr>
                <th>Stack</th>
                <td>Next.js, React, Firebase, Supabase, Python, Playwright, SEO, workflows LLM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Ce que je peux prendre en charge</p>
            <h2>Build marketing, pas théâtre IA.</h2>
          </div>
          <p>
            Sites de conversion, workflows LLM, automatisation, SEO, dashboards,
            prototypes internes et documentation propre.
          </p>
        </div>
        <div className="matrix">
          <div className="matrix-item">
            <strong>Acquisition</strong>
            <p>SEO, pages de conversion, contenus, audits, tracking et priorisation.</p>
          </div>
          <div className="matrix-item">
            <strong>IA générative</strong>
            <p>Workflows LLM, RAG simple, assistants cadres, fact-check et QA.</p>
          </div>
          <div className="matrix-item">
            <strong>Produit web</strong>
            <p>Next.js, React, Firebase, Supabase, CMS léger, déploiement et maintenance.</p>
          </div>
          <div className="matrix-item">
            <strong>Operations</strong>
            <p>Scripts Python, Playwright, rapports, automatisation de taches répétitives.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Preuves rapides</p>
            <h2>Trois raisons d'appeler.</h2>
          </div>
        </div>
        <div className="proof-grid">
          {featuredProjects.map((project) => (
            <article className="proof-card" key={project.slug}>
              <img src={project.image} alt={`Aperçu ${project.shortTitle}`} />
              <div className="proof-body">
                <p className="case-meta">{project.status}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.recruiterProof[0]}</p>
                <Link className="button" href={`/projets/${project.slug}`}>Ouvrir</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Limites honnêtes.</strong>
          <p>
            Je ne suis pas AI Engineer ML, pas backend senior, pas designer graphique
            pur et pas community manager pur. Mon angle : relier acquisition, IA
            générative et exécution produit.
          </p>
        </div>
      </section>
    </div>
  );
}

