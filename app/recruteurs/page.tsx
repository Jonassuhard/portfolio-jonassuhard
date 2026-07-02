import type { Metadata } from "next";
import Link from "next/link";
import { recruiterFeatured, site, pageMeta } from "@/lib/projects";

export const metadata: Metadata = pageMeta({
  path: "/recruteurs",
  title: "Recruteurs",
  description:
    "Résumé recruteur de Jonas Suhard : rôle cible, projets, stack, limites et contact."
});

export default function RecruitersPage() {
  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">Candidature</p>
          <h1>
            Growth Engineer
            <Link className="def-ref" href="/a-propos#growth-engineer" aria-label="Définition de Growth Engineer">*</Link>
            , IA appliquée et automatisation.
          </h1>
          <p className="lead">
            Profil marketing et développement : je cadre un besoin, je livre un
            premier outil qui marche, je vérifie les résultats et je documente
            pour que l'équipe reprenne derrière.
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
          <h2>L'essentiel</h2>
          <table className="summary-table">
            <tbody>
              <tr>
                <th scope="row">Contrat</th>
                <td>CDI junior</td>
              </tr>
              <tr>
                <th scope="row">Disponibilité</th>
                <td><strong>À partir du 1er septembre 2026</strong></td>
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
                <th scope="row">Environnements</th>
                <td>Mac et Windows (deux postes de travail)</td>
              </tr>
              <tr>
                <th scope="row">Code</th>
                <td>Visible sur GitHub : ce portfolio et claude-code-soul. Le code client reste privé.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Ce que je peux prendre en charge</p>
            <h2>Ce que je peux livrer.</h2>
          </div>
          <p>
            Un besoin marketing devient un livrable concret : page de conversion,
            workflow IA, automatisation, audit SEO ou prototype web.
          </p>
        </div>
        <div className="matrix matrix-2">
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
            <p className="section-kicker">En équipe</p>
            <h2>Où je suis utile dans une équipe.</h2>
          </div>
          <p>
            Je ne travaille pas en vase clos. Je pose mes questions tôt, je livre
            par petits lots relisables, et je documente pour que le travail se
            reprenne sans moi.
          </p>
        </div>
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Cadrage partagé</strong>
            <p>Les hypothèses posées avant de coder, les décisions écrites, pas gardées dans ma tête.</p>
          </div>
          <div className="matrix-item">
            <strong>Revue et intégration</strong>
            <p>Des PR courtes et relisables plutôt qu'un gros lot en fin de sprint.</p>
          </div>
          <div className="matrix-item">
            <strong>Transmission</strong>
            <p>Un livrable qu'un autre fait tourner sans moi : sur Les Petites Griffes, la gérante édite son site seule.</p>
          </div>
          <div className="matrix-item">
            <strong>Pédagogie</strong>
            <p>Trois ans à expliquer et transmettre (animation) : l'habitude de rendre un travail compréhensible.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Preuves principales</p>
            <h2>Trois projets qui montrent comment je travaille.</h2>
          </div>
          <p>
            Une production SEO en entreprise avec preuve en ligne, un site client
            livré de bout en bout, et une méthode d'audit IA sur le sujet exact
            du poste.
          </p>
        </div>
        <div className="proof-grid">
          {recruiterFeatured.map((project) => (
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
        <div className="matrix matrix-2">
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
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
            <Link className="button" href="/methode">Ma méthode de travail</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

