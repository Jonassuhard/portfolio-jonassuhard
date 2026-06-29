import type { Metadata } from "next";
import Link from "next/link";
import { skills, getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Compétences",
  description: "Compétences de Jonas Suhard reliées à des projets livrés et documentés."
};

export default function SkillsPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Compétences</p>
        <h1>Ce que je peux apporter à une équipe.</h1>
        <p className="lead">
          Je ne liste pas des outils pour remplir une page. Chaque compétence
          ci-dessous correspond à un projet livré, testé ou documenté.
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
