import type { Metadata } from "next";
import Link from "next/link";
import { skills, getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Compétences",
  description: "Compétences de Jonas Suhard reliées aux preuves de travail."
};

export default function SkillsPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Compétences</p>
        <h1>Compétences prouvées, pas déclarées.</h1>
        <p className="lead">
          Chaque bloc pointe vers les projets qui le rendent crédible. Une compétence
          sans preuve reste une étiquette.
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
          </article>
        ))}
      </section>
    </div>
  );
}
