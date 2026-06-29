import type { Metadata } from "next";
import { skills } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Compétences",
  description: "Compétences de Jonas Suhard reliées aux preuves de travail."
};

export default function SkillsPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Compétences</p>
        <h1>Une compétence sans preuve reste une etiquette.</h1>
        <p className="lead">
          Cette page relie chaque bloc de compétence aux projets qui la rendent crédible.
        </p>
      </section>

      <section className="section matrix">
        {skills.map((skill) => (
          <article className="matrix-item" key={skill.name}>
            <strong>{skill.name}</strong>
            <p>{skill.note}</p>
            <p className="case-meta">{skill.proof}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

