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
          Je viens du marketing. Je développe des sites et des outils IA pour
          répondre à un besoin concret, puis je les teste et je documente leur fonctionnement.
        </p>
        <p>Je peux prendre en charge une première version, du cadrage à la mise en ligne, avec les revues de l'équipe.</p>
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
            <h2>Trois projets pour me situer.</h2>
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
            <h2>Ce que je peux prendre en charge.</h2>
          </div>
          <p>Je pose mes questions tôt, je livre par petits lots et je documente ce qui doit être repris.</p>
        </div>
        <div className="matrix matrix-3">
          <div className="matrix-item">
            <h3>Un site ou un outil web</h3>
            <p>Interface, gestion des contenus, déploiement et contrôles. Principalement avec Next.js, React et Python.</p>
          </div>
          <div className="matrix-item">
            <h3>Une automatisation avec de l'IA</h3>
            <p>Collecter, classer ou préparer des informations, avec des règles claires et une vérification humaine.</p>
          </div>
          <div className="matrix-item">
            <h3>Un chantier SEO</h3>
            <p>Audit, organisation des pages, contenus et correction des problèmes avant publication.</p>
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
          <h2>Ce que je veux approfondir en équipe.</h2>
        </div>
        <div className="prose">
          <p>Je suis à l'aise sur le web, le SEO et les automatisations. Je veux consolider le SQL avancé, la mesure produit, les A/B tests à volume significatif et le travail dans une équipe de développeurs.</p>
          <p>{site.careerGoalShort} Pour moi, cela veut dire construire au contact des personnes qui utiliseront l'outil.</p>
          <p>La recherche en IA et le backend à grande échelle ne font pas partie de mon périmètre actuel.</p>
        </div>
      </section>

      <section className="section">
        <h2>Quelques repères supplémentaires.</h2>
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
      </section>

      <section className="section closing-section">
        <div>
          <h2>Parlons de votre besoin.</h2>
          <p>Un poste junior où je peux construire, recevoir des retours et progresser en équipe.</p>
        </div>
        <div className="button-row">
          <a className="button primary" href={`mailto:${site.email}`}>Me contacter</a>
          <Link className="button" href="/preuves">Vérifier les affirmations</Link>
        </div>
      </section>
    </div>
  );
}
