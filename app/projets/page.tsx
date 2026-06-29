import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projets",
  description: "Index des preuves de travail de Jonas Suhard, classees par maturite."
};

export default function ProjectsPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Index secondaire</p>
        <h1>Les projets, classes par force de preuve.</h1>
        <p className="lead">
          Tout n'est pas mis au meme niveau. Les projets Tier 1 servent la candidature.
          Les labs restent accessibles, mais ils ne pilotent pas le positionnement.
        </p>
      </section>

      <section className="section">
        <div className="table-scroll">
          <table className="project-table">
            <thead>
              <tr>
                <th scope="col">Projet</th>
                <th scope="col">Type</th>
                <th scope="col">Stack</th>
                <th scope="col">Ce que ça prouve</th>
                <th scope="col">Tier</th>
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
                  <td>{project.stack.slice(0, 4).join(", ")}</td>
                  <td>{project.recruiterProof[0]}</td>
                  <td>Tier {project.tier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
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

