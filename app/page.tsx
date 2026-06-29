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
          </div>
          <div className="button-row">
            <a className="button primary" href={site.cvStyled}>
              CV — version site
            </a>
            <a className="button" href={site.cvClassic}>
              CV — classique
            </a>
            <Link className="button" href="/projets">
              Voir les preuves
            </Link>
            <a className="button" href={`mailto:${site.email}`}>
              Me contacter
            </a>
          </div>
        </div>

        <aside className="ledger" aria-label="Journal de preuves">
          <div>
            <p className="ledger-title">Journal de build</p>
            <h2>Pas une galerie. Un dossier de preuves.</h2>
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
            <p className="section-kicker">Preuves principales</p>
            <h2>Trois preuves à lire en priorité.</h2>
          </div>
          <p>
            Chaque page expose le problème, les contraintes, les choix rejetés,
            la livraison, les limites et ce que le projet prouve pour recruter.
          </p>
        </div>

        <div className="proof-grid">
          {featuredProjects.map((project) => (
            <article className="proof-card" key={project.slug}>
              <img src={project.image} alt={`Aperçu du projet ${project.shortTitle}`} />
              <div className="proof-body">
                <p className="case-meta">Tier {project.tier} / {project.type}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.proofLine}</p>
                <div className="tag-row">
                  {project.stack.slice(0, 4).map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
                <Link className="button" href={`/projets/${project.slug}`}>
                  Lire la preuve
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
            <h2>Des compétences reliées à des preuves.</h2>
          </div>
          <p>Chaque compétence pointe vers des projets réels, pas vers une liste flottante.</p>
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

