import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKnowledgePage, knowledgePages } from "@/lib/knowledge";
import { pageAlternates } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return knowledgePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getKnowledgePage(slug);

  if (!page) return { title: "Knowledge introuvable" };

  return {
    title: page.shortTitle,
    description: page.description,
    alternates: pageAlternates(`/knowledge/${page.slug}`)
  };
}

export default async function KnowledgePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getKnowledgePage(slug);

  if (!page) notFound();

  return (
    <div className="page">
      <section className="case-hero">
        <div>
          <p className="eyebrow">Knowledge · dernière vérif {page.updated}</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.description}</p>
        </div>
      </section>

      <section className="section content-grid">
        <div className="prose">
          <section>
            <p className="section-kicker">Réponse courte</p>
            <h2>En clair.</h2>
            <ul>
              {page.answer.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="section-kicker">Problème</p>
            <h2>Ce qui bloque.</h2>
            <p>{page.problem}</p>
          </section>

          <section>
            <p className="section-kicker">Méthode</p>
            <h2>Comment je le traite.</h2>
            <ul>
              {page.method.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <p className="section-kicker">Exemple</p>
            <h2>Sur ce portfolio.</h2>
            <p>{page.example}</p>
          </section>

          <section>
            <p className="section-kicker">Limites</p>
            <h2>Ce que ça ne prouve pas.</h2>
            <ul>
              {page.limits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="panel">
          <h2>Preuves</h2>
          <ul>
            {page.proofs.map((proof) => (
              <li key={proof.href}>
                <a className="lk" href={proof.href}>
                  {proof.label}
                </a>
              </li>
            ))}
          </ul>

          <h3>À retenir</h3>
          <ul>
            {page.takeaway.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
