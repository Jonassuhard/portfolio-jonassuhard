import Link from "next/link";
import { featuredProjects, skills, site } from "@/lib/projects";

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div>
            <p className="eyebrow">Paris / hybride · CDI · marketing · IA appliquée · full-stack</p>
            <h1>Builder IA appliquée &amp; Growth Engineer</h1>
            <p className="lead">
              Marketing, IA générative et développement full-stack pour construire
              des systèmes d'acquisition mesurables.
            </p>
            <p className="hero-human">
              Je viens du marketing digital, mais j'ai appris à construire moi-même :
              sites, workflows IA, automatisations, contenus SEO et prototypes web.
            </p>
          </div>
          <div className="button-row">
            <a className="button primary" href={`mailto:${site.email}`}>
              Me contacter
            </a>
            <Link className="button" href="/projets">
              Voir les projets
            </Link>
          </div>
          <p className="cta-sub">
            CV : <a href={site.cvStyled}>version site</a> · <a href={site.cvClassic}>classique</a>
          </p>
        </div>

        <aside className="ledger" aria-label="Journal de projets">
          <div>
            <p className="ledger-title">Journal de build</p>
            <h2>Ce que j'ai vraiment construit.</h2>
          </div>
          <div className="ledger-list">
            <div className="ledger-item">
              <time>2026-06</time>
              <strong>Site live + CMS + assistant IA</strong>
              <span>Les Petites Griffes, prod live et contenus éditables.</span>
            </div>
            <div className="ledger-item">
              <time>2026-06</time>
              <strong>App classe + données sensibles</strong>
              <span>Educool, Firebase, PDF, sécurité et retours terrain.</span>
            </div>
            <div className="ledger-item">
              <time>2026-07</time>
              <strong>Refonte conversion + workshop client</strong>
              <span>Capsélys, staging, audits et présentation MBA.</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section" id="preuves">
        <div className="section-head">
          <div>
            <p className="section-kicker">Projets phares</p>
            <h2>Trois projets pour comprendre mon profil.</h2>
          </div>
          <p>
            Ces trois projets montrent trois choses : livrer un site en production,
            construire une app métier sensible, et cadrer une expérimentation
            marketing avec IA.
          </p>
        </div>

        <div className="proof-grid">
          {featuredProjects.map((project) => (
            <article className="proof-card" key={project.slug}>
              <img src={project.image} alt={`Aperçu du projet ${project.shortTitle}`} />
              <div className="proof-body">
                <p className="case-meta">{project.type}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.cardLine ?? project.proofLine}</p>
                <div className="tag-row">
                  {project.stack.slice(0, 4).map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
                <Link
                  className="button"
                  href={`/projets/${project.slug}`}
                  aria-label={`Voir le projet ${project.shortTitle}`}
                >
                  Voir le projet
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Compétences reliées</p>
            <h2>Ce que je sais faire, projets à l'appui.</h2>
          </div>
          <p>Chaque compétence s'appuie sur des projets livrés et documentés.</p>
        </div>

        <div className="matrix">
          {skills.map((skill) => (
            <div className="matrix-item" key={skill.name}>
              <strong>{skill.name}</strong>
              <p>{skill.note}</p>
              <p className="case-meta">{skill.proof}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="notice">
          <strong>Ce que je cherche.</strong>
          <p>
            Un CDI à Paris ou hybride, dans une équipe qui relie acquisition,
            IA appliquée et exécution produit.
          </p>
          <div className="button-row">
            <Link className="button primary" href="/recruteurs">
              Page recruteurs
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

