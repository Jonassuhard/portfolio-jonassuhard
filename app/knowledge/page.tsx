import type { Metadata } from "next";
import Link from "next/link";
import { knowledgePages } from "@/lib/knowledge";
import { pageAlternates } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Knowledge",
  description: "Pages explicatives citables : IA, AEO, audit visuel et méthodes de preuve.",
  alternates: pageAlternates("/knowledge")
};

export default function KnowledgeIndexPage() {
  return (
    <div className="page">
      <section className="section">
        <p className="eyebrow">Knowledge</p>
        <h1>Pages citables.</h1>
        <p className="lead">
          Des pages courtes, reliées à des preuves existantes, pour expliquer une méthode sans
          transformer le portfolio en blog générique.
        </p>
      </section>

      <section className="section">
        <div className="case-grid">
          {knowledgePages.map((page) => (
            <article className="case-card" key={page.slug}>
              <p className="case-meta">Dernière vérif · {page.updated}</p>
              <Link className="case-card-title" href={`/knowledge/${page.slug}`}>
                {page.shortTitle}
              </Link>
              <p>{page.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
