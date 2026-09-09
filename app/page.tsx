import type { Metadata } from "next";
import Link from "next/link";
import { featuredProjects, site, pageAlternates } from "@/lib/projects";
import AnimatedTitle from "./animated-title";
import ProjectCardImage from "./project-card-image";

export const metadata: Metadata = {
  alternates: pageAlternates("/")
};

export default function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero hero-readable hero-sys">
        <div className="hero-copy">
          <div>
            <p className="eyebrow">CDI · Paris ou hybride · disponible le {site.availability}</p>
            <p className="hero-name">{site.name}</p>
            <AnimatedTitle glitch>{site.title}</AnimatedTitle>
            <p className="lead">
              Je viens du marketing et j'ai appris à coder. Je construis
              moi-même les sites, les automatisations et les outils IA que je
              recommande.
            </p>
          </div>
          <div className="button-row">
            <a className="button primary" href={site.cvClassic}>Voir mon CV (PDF)</a>
            <a className="button" href={`mailto:${site.email}`}>Me contacter</a>
            <Link className="button" href="/projets" prefetch={false}>Voir les projets</Link>
          </div>
        </div>
      </section>

      <section className="section" id="preuves">
        <div className="section-head">
          <div>
            <p className="section-kicker">Trois projets</p>
            <h2>Ce que je construis.</h2>
          </div>
        </div>
        <div className="proof-grid">
          {featuredProjects.map((project, index) => {
            const externalLink = project.links.find((link) => link.external);
            return (
              <article className="proof-card" key={project.slug}>
                <ProjectCardImage
                  src={project.image}
                  alt={`Aperçu du projet ${project.shortTitle}`}
                  fullColor={project.fullColorMedia}
                  preload={index === 0}
                />
                <div className="proof-body">
                  <p className="case-meta product-status">{project.cardStatus ?? project.status}</p>
                  <h3 className="card-title-accessible">{project.shortTitle}</h3>
                  <p className="card-description">{project.cardLine ?? project.summary}</p>
                  <div className="card-actions">
                    <Link className="button" href={`/projets/${project.slug}`}
                      aria-label={`Voir le projet ${project.shortTitle}`}>
                      Voir le projet
                    </Link>
                    {externalLink ? (
                      <a className="button secondary-link" href={externalLink.href}
                        target="_blank" rel="noreferrer">{externalLink.label}</a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">En équipe</p>
            <h2>Du besoin à une première version.</h2>
          </div>
          <p>Je peux concevoir, développer et vérifier un outil, puis expliquer comment le reprendre.</p>
        </div>
        <div className="matrix matrix-3">
          <div className="matrix-item">
            <h3>Sites et interfaces</h3>
            <p>Un site clair, des pages utiles et un espace pour modifier les contenus sans toucher au code.</p>
          </div>
          <div className="matrix-item">
            <h3>Outils IA et automatisations</h3>
            <p>Trier des informations, préparer un travail répétitif et garder une validation humaine sur les actions importantes.</p>
          </div>
          <div className="matrix-item">
            <h3>SEO et contenus</h3>
            <p>Organiser les pages, corriger les problèmes de référencement et vérifier ce qui est publié.</p>
          </div>
        </div>
        <p className="section-links">
          <Link className="lk" href="/competences">Mes compétences</Link>
          <Link className="lk" href="/methode">Ma méthode de travail</Link>
        </p>
      </section>

      <section className="section closing-section">
        <div>
          <h2>Je cherche une équipe où progresser.</h2>
          <p>{site.careerGoalShort} Construire au contact des utilisateurs, tester avec eux et améliorer ce qui leur sert vraiment.</p>
        </div>
        <div className="button-row">
          <Link className="button primary" href="/recruteurs">Mon profil pour un CDI</Link>
          <a className="button" href={`mailto:${site.email}`}>Me contacter</a>
        </div>
      </section>
    </div>
  );
}
