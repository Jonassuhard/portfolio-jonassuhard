import type { Metadata } from "next";
import Link from "next/link";
import { evidenceLevelMeta, featuredProjects, skillGroups, skills, site, pageAlternates } from "@/lib/projects";
import AnimatedTitle from "./animated-title";
import ProjectCardImage from "./project-card-image";

export const metadata: Metadata = {
  alternates: pageAlternates("/")
};

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div>
            <p className="eyebrow">CDI · Paris ou hybride · disponible le 1er septembre 2026</p>
            <AnimatedTitle glitch>
              {site.headline}
            </AnimatedTitle>
            <p className="lead">
              Je viens du marketing et j'ai appris à coder. Je construis
              moi-même les sites, les automatisations et les outils IA que je
              recommande.
            </p>
            <p>{site.careerGoalShort}</p>
          </div>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>
              Me contacter
            </a>
            <Link className="button" href="/projets" prefetch={false}>
              Voir les projets
            </Link>
          </div>
          <p className="cta-sub">
            CV : <a href={site.cvStyled}>version site</a> · <a href={site.cvClassic}>classique</a>
          </p>
        </div>

        <aside className="panel stats-panel" aria-label="Repères sur les projets">
          <p className="ledger-title">Trois preuves à lire</p>
          <div className="stats-list">
            <div className="stat-item">
              <strong>Cortex Bridge</strong>
              <span>Un agent de code local open source qui utilise ChatGPT comme cerveau.</span>
            </div>
            <div className="stat-item">
              <strong>Les Petites Griffes</strong>
              <span>Un site familial en production, avec CMS et assistant IA cadré.</span>
            </div>
            <div className="stat-item">
              <strong>Cool Bank / La Herse</strong>
              <span>Une banque de classe transformée en monde 3D avec trois rôles.</span>
            </div>
          </div>
        </aside>

        <a className="hero-scroll" href="#preuves">
          <span>Preuves</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="section" id="preuves">
        <div className="section-head">
          <div>
            <p className="section-kicker">Projets phares</p>
            <h2>Mes trois projets les plus solides.</h2>
          </div>
          <p>
            Cortex Bridge, Les Petites Griffes et Cool Bank / La Herse : un
            agent de code local piloté par ChatGPT, un site familial en
            production et un jeu scolaire dont les deux versions sont séparées.
          </p>
        </div>

        <div className="proof-grid">
          {featuredProjects.map((project) => {
            const externalLink = project.links.find((link) => link.external);
            return (
              <article className="proof-card" key={project.slug}>
                <ProjectCardImage
                  src={project.image}
                  alt={`Aperçu du projet ${project.shortTitle}`}
                  fullColor={project.fullColorMedia}
                />
                <div className="proof-body">
                  <span className={`evidence-badge evidence-${project.evidenceLevel}`}>
                    {evidenceLevelMeta[project.evidenceLevel].label}
                  </span>
                  <p className="case-meta">{project.type}</p>
                  <h3 className="card-title-accessible">{project.shortTitle}</h3>
                  <p>{project.cardLine ?? project.proofLine}</p>
                  <div className="tag-row">
                    {project.stack.slice(0, 4).map((item) => (
                      <span className="tag" key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="card-actions">
                    <Link
                      className="button"
                      href={`/projets/${project.slug}`}
                      aria-label={`Voir le projet ${project.shortTitle}`}
                    >
                      Voir le projet
                    </Link>
                    {externalLink ? (
                      <a
                        className="button secondary-link"
                        href={externalLink.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {externalLink.label}
                      </a>
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
            <p className="section-kicker">Compétences reliées</p>
            <h2>Ce que je construis.</h2>
          </div>
          <p>Chaque compétence est prouvée par un projet livré.</p>
        </div>

        <div className="skills-groups">
          {skillGroups.map((group) => (
            <div className="skills-group" key={group}>
              <h3>{group}</h3>
              <div className="matrix">
                {skills
                  .filter((skill) => skill.group === group)
                  .map((skill) => (
                    <div className="matrix-item" key={skill.name}>
                      <strong>{skill.name}</strong>
                      <p>{skill.note}</p>
                      <p className="case-meta">{skill.proof}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Méthode</p>
            <h2>Cadrer, construire, vérifier, transmettre.</h2>
          </div>
          <p>
            Quatre temps sur chaque projet, du cadrage à la transmission.{" "}
            <Link href="/methode">Voir la méthode en détail.</Link>
          </p>
        </div>
        <div className="matrix matrix-2">
          <div className="matrix-item">
            <strong>Cadrer</strong>
            <p>Comprendre le besoin, poser les contraintes et les hypothèses avant d'écrire une ligne.</p>
          </div>
          <div className="matrix-item">
            <strong>Construire</strong>
            <p>Livrer une première version qui peut être testée.</p>
          </div>
          <div className="matrix-item">
            <strong>Vérifier</strong>
            <p>Tester, mesurer, vérifier : jamais « c'est fait » sans preuve.</p>
          </div>
          <div className="matrix-item">
            <strong>Transmettre</strong>
            <p>Documenter pour qu'une équipe reprenne le travail sans moi.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Où je suis utile.</strong>
          <p>
            Une équipe qui doit produire vite, tester proprement et mettre l'IA
            au service d'un travail réel. CDI à Paris ou hybride.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/recruteurs">
              Page recruteurs
            </Link>
            <Link className="button" href="/preuves">
              Registre des preuves
            </Link>
            <a className="button" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
