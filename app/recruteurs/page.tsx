import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects, site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Recruteurs",
  description:
    "Résumé recruteur de Jonas Suhard : rôle cible, projets, stack, limites et contact."
};

export default function RecruitersPage() {
  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">Résumé 30 secondes</p>
          <h1>Mon poste cible, c'est Growth Engineer · IA appliquée &amp; Automatisation.</h1>
          <p className="lead">
            Profil hybride marketing, IA générative et développement full-stack.
            Je transforme des problèmes d'acquisition, de contenu ou d'opération
            en outils web/IA utilisables.
          </p>
          <p>
            <strong>En clair —</strong> Je prends un problème
            d'acquisition ou de contenu, je le transforme en prototype web/IA,
            je le documente, puis je le livre sans attendre une équipe produit
            complète.
          </p>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
            <a className="button" href={site.github}>GitHub</a>
          </div>
          <p className="cta-sub">
            CV : <a href={site.cvStyled}>version site</a> · <a href={site.cvClassic}>classique</a>
          </p>
        </div>
        <div className="panel">
          <h2>Signal utile</h2>
          <table className="summary-table">
            <tbody>
              <tr>
                <th scope="row">Contrat</th>
                <td>CDI junior</td>
              </tr>
              <tr>
                <th scope="row">Disponibilité</th>
                <td>À partir du 1er septembre 2026</td>
              </tr>
              <tr>
                <th scope="row">Zone</th>
                <td>Paris ou hybride</td>
              </tr>
              <tr>
                <th scope="row">Rôles</th>
                <td>Growth Engineer, Marketing Technologist IA, Chef de projet IA orienté produit</td>
              </tr>
              <tr>
                <th scope="row">Stack</th>
                <td>Next.js, React, Firebase, Supabase, Python, Playwright, SEO, workflows LLM</td>
              </tr>
              <tr>
                <th scope="row">Code</th>
                <td>Open source sur GitHub (github.com/Jonassuhard).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Ce que je peux prendre en charge</p>
            <h2>Construire plutôt que promettre.</h2>
          </div>
          <p>
            Je transforme un besoin marketing en livrable concret, une page de
            conversion, workflow IA, automatisation, audit SEO ou prototype web.
          </p>
        </div>
        <div className="matrix">
          <div className="matrix-item">
            <strong>Acquisition</strong>
            <p>SEO, pages de conversion, contenus, audits, tracking et priorisation.</p>
          </div>
          <div className="matrix-item">
            <strong>IA générative</strong>
            <p>Workflows LLM, RAG simple, assistants cadrés, fact-check et QA.</p>
          </div>
          <div className="matrix-item">
            <strong>Produit web</strong>
            <p>Next.js, React, Firebase, Supabase, CMS léger, déploiement et maintenance.</p>
          </div>
          <div className="matrix-item">
            <strong>Opérations</strong>
            <p>Scripts Python, Playwright, rapports, automatisation de tâches répétitives.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Projets clés</p>
            <h2>Ce que j'apporte à une équipe.</h2>
          </div>
          <p>
            Mes projets montrent trois choses. Je sais livrer en production, gérer
            des données sensibles et cadrer une expérimentation marketing.
          </p>
        </div>
        <div className="proof-grid">
          {featuredProjects.map((project) => (
            <article className="proof-card" key={project.slug}>
              <img src={project.image} alt={`Aperçu ${project.shortTitle}`} loading="lazy" decoding="async" />
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
        <div className="section-head">
          <div>
            <p className="section-kicker">Prise en charge</p>
            <h2>Mes 30 premiers jours dans une équipe.</h2>
          </div>
        </div>
        <div className="matrix">
          <div className="matrix-item">
            <strong>Acquisition</strong>
            <p>Audit et correctifs d'un tunnel, plus une landing ou une section de conversion livrée.</p>
          </div>
          <div className="matrix-item">
            <strong>IA appliquée</strong>
            <p>Une automatisation ou un assistant LLM cadré, avec garde-fous et QA.</p>
          </div>
          <div className="matrix-item">
            <strong>SEO / contenu</strong>
            <p>Un lot de contenus SEO structurés et un audit (cannibalisation, maillage).</p>
          </div>
          <div className="matrix-item">
            <strong>Produit web</strong>
            <p>Un prototype ou une page Next.js déployée, propre et documentée.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Mon périmètre.</strong>
          <p>
            Mon cœur, c'est de relier acquisition, IA appliquée et exécution
            produit. Pour du ML research pur ou du backend lourd, je m'appuie sur
            l'équipe.
          </p>
        </div>
      </section>
    </div>
  );
}

