import type { Metadata } from "next";
import Link from "next/link";
import { skills, getProject, pageMeta } from "@/lib/projects";

export const metadata: Metadata = pageMeta({
  path: "/competences",
  title: "Compétences",
  description: "Compétences de Jonas Suhard reliées à des projets livrés et documentés."
});

export default function SkillsPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Compétences</p>
        <h1>Ce que je peux apporter à une équipe.</h1>
        <p className="lead">
          Six domaines. Pour chacun : un projet où je l'ai utilisé, ce que je
          sais faire aujourd'hui, et ce que je ne maîtrise pas encore.
        </p>
      </section>

      <section className="section matrix">
        {skills.map((skill) => (
          <article className="matrix-item" key={skill.name}>
            <strong>{skill.name}</strong>
            <p>{skill.note}</p>
            <p className="case-meta">
              {skill.proofSlugs.map((slug, i) => {
                const project = getProject(slug);
                if (!project) return null;
                return (
                  <span key={slug}>
                    {i > 0 ? " · " : ""}
                    <Link className="lk" href={`/projets/${project.slug}`}>
                      {project.shortTitle}
                    </Link>
                  </span>
                );
              })}
              {skill.proofExtra ? ` · ${skill.proofExtra}` : ""}
            </p>
            <p className="skill-limit">Limite : {skill.limit}</p>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="notice">
          <strong>Chaque compétence tient sur un projet réel.</strong>
          <p>Le détail est dans les projets : décisions prises, limites comprises.</p>
          <div className="button-row">
            <Link className="button primary" href="/projets">
              Voir les projets
            </Link>
            <Link className="button" href="/recruteurs">
              Page recruteurs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
