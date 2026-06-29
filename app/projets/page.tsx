import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets",
  description: "Index des projets de Jonas Suhard, classés par maturité (livrés, techniques, archives)."
};

export default function ProjectsPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Projets</p>
        <h1>Mes projets les plus solides.</h1>
        <p className="lead">
          Je distingue les projets livrés, les démos techniques et les archives.
          L'idée : voir vite ce qui est vérifiable, ce qui est privé et ce qui reste
          en laboratoire.
        </p>
      </section>

      <section className="section desktop-only">
        <div className="table-scroll">
          <table className="project-table">
            <thead>
              <tr>
                <th scope="col">Projet</th>
                <th scope="col">Type</th>
                <th scope="col">Tier</th>
                <th scope="col">Accès</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.slug}>
                  <td>
                    <Link href={`/projets/${project.slug}`}>
                      <strong>{project.shortTitle}</strong>
                    </Link>
                    <p className="table-note">{project.status}</p>
                  </td>
                  <td>{project.type}</td>
                  <td>Tier {project.tier}</td>
                  <td>
                    <div className="access-cell">
                      <div className="tag-row">
                        {project.liveLabel ? <span className="tag">{project.liveLabel}</span> : null}
                        {project.repoStatus ? <span className="tag">{project.repoStatus}</span> : null}
                      </div>
                      <div className="access-links">
                        <Link className="lk" href={`/projets/${project.slug}`}>Case study</Link>
                        <a className="lk" href={`/projects/${project.slug}.md`}>Markdown</a>
                        {project.links
                          .filter((link) => link.external)
                          .map((link) => (
                            <a className="lk" key={link.href} href={link.href} target="_blank" rel="noreferrer">
                              {link.label}
                            </a>
                          ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section mobile-only">
        <div className="section-head">
          <div>
            <p className="section-kicker">Détail</p>
            <h2>Chaque projet, en clair.</h2>
          </div>
        </div>
        <div className="case-grid">
          {projects.map((project) => (
            <article className="case-card" key={project.slug}>
              <img src={project.image} alt={`Aperçu du projet ${project.shortTitle}`} />
              <div className="case-body">
                <p className="case-meta">Tier {project.tier} / {project.period}</p>
                <h3>{project.shortTitle}</h3>
                <p>{project.summary}</p>
                <Link className="button" href={`/projets/${project.slug}`}>
                  Lire la case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

