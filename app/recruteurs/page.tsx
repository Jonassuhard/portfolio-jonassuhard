import type { Metadata } from "next";
import Link from "next/link";
import { recruiterFeatured, site, pageMeta } from "@/lib/projects";
import { faqItems } from "@/lib/faq";
import { faqPageJsonLd } from "@/lib/json-ld";
import AnimatedTitle from "../animated-title";
import ProjectCardImage from "../project-card-image";

export const metadata: Metadata = pageMeta({
  path: "/recruteurs",
  title: "Recruteurs",
  description:
    "Résumé recruteur de Jonas Suhard : rôle cible, projets, stack, limites et contact."
});

export default function RecruitersPage() {
  return (
    <div className="page recruiter-page">
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }} />
      <section className="recruiter-intro">
        <p className="eyebrow">CDI junior · Paris ou hybride · disponible le {site.availability}</p>
        <AnimatedTitle>{site.title}</AnimatedTitle>
        <p className="lead">
          Je viens du marketing et je développe des sites, des automatisations
          et des outils IA. Je cherche une équipe où construire et progresser.
        </p>
        <div className="button-row">
          <a className="button primary" href={site.cvClassic}>Voir mon CV (PDF)</a>
          <a className="button" href={`mailto:${site.email}`}>Parlons du poste</a>
          <a className="lk" href={site.linkedin}>LinkedIn</a>
        </div>
      </section>

      <section className="section" id="projets-principaux">
        <div className="section-head">
          <div>
            <p className="section-kicker">Travail concret</p>
            <h2>Trois exemples de mon travail.</h2>
          </div>
          <Link className="lk" href="/projets">Tous les projets</Link>
        </div>
        <div className="proof-grid">
          {recruiterFeatured.map((project, index) => (
            <article className="proof-card" key={project.slug}>
              <ProjectCardImage src={project.image} alt={`Aperçu ${project.shortTitle}`}
                preload={index === 0}
                fullColor={project.fullColorMedia} />
              <div className="proof-body">
                <p className="case-meta product-status">{project.cardStatus ?? project.status}</p>
                <h3 className="card-title-accessible">{project.shortTitle}</h3>
                <p className="card-description">{project.cardLine ?? project.summary}</p>
                <Link className="button" href={`/projets/${project.slug}`}>Voir le projet</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="contribution">
        <div className="section-head">
          <div>
            <p className="section-kicker">Mon apport</p>
            <h2>Ce que je peux apporter.</h2>
          </div>
        </div>
        <div className="matrix matrix-3">
          <div className="matrix-item">
            <h3>Un site ou un outil web</h3>
            <p>Construire une première version, de l'interface à la mise en ligne, avec les revues de l'équipe.</p>
          </div>
          <div className="matrix-item">
            <h3>Une automatisation avec de l'IA</h3>
            <p>Collecter et classer des informations, puis faire vérifier le résultat avant de l'utiliser.</p>
          </div>
          <div className="matrix-item">
            <h3>Un chantier SEO</h3>
            <p>Auditer un site, organiser ses pages et corriger ses contenus.</p>
          </div>
        </div>
        <p className="section-links">
          <Link className="lk" href="/competences">Compétences et outils</Link>
          <Link className="lk" href="/a-propos">Expérience et formation</Link>
          <Link className="lk" href="/methode">Méthode de travail</Link>
        </p>
      </section>

      <section className="section progression-section">
        <div>
          <p className="section-kicker">Progression</p>
          <h2>Ce que je veux apprendre.</h2>
        </div>
        <div className="prose">
          <p>Je veux progresser en SQL, en mesure produit et dans le travail avec une équipe de développeurs.</p>
          <p>{site.careerGoalShort} Construire avec les utilisateurs, à partir de leurs problèmes concrets.</p>
        </div>
      </section>

      <section className="section">
        <h2>Pour aller plus loin.</h2>
        <details className="faq-item">
          <summary>Postes visés, outils et limites</summary>
        <div className="faq">
          <details className="faq-item">
            <summary>Autres intitulés et accès au code</summary>
            <p>Selon le périmètre du poste : {site.roleAliases.join(", ")}. Mon point de départ reste le rôle de {site.title}.</p>
            <p>Je travaille sur Mac et Windows. Le code de Job Radar Community, Cortex Bridge, ce portfolio et claude-code-soul est public. Le code client et ma version personnelle de Job Radar restent privés.</p>
            <p className="section-links">
              <a className="lk" href={site.github}>GitHub</a>
              <a className="lk" href={site.cvStyled}>CV illustré (PDF)</a>
              <Link className="lk" href="/outils/decodeur-offre-ia">Décoder une offre IA</Link>
            </p>
          </details>
          {faqItems.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        </details>
      </section>

      <section className="section closing-section">
        <div>
          <h2>Un poste à me proposer ?</h2>
          <p>Envoyez-moi le contexte et ce que vous souhaitez construire.</p>
        </div>
        <div className="button-row">
          <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
          <Link className="button" href="/preuves">Vérifier les affirmations</Link>
        </div>
      </section>
    </div>
  );
}
