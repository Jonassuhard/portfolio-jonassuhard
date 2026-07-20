import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKnowledgePage, knowledgePages } from "@/lib/knowledge";
import { pageAlternates, ogImage } from "@/lib/projects";
import { knowledgeJsonLd, faqPageJsonLd } from "@/lib/json-ld";
import AnimatedTitle from "../../animated-title";

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

  const ogTitle = `${page.shortTitle} | Jonas Suhard`;
  return {
    title: page.shortTitle,
    description: page.description,
    alternates: pageAlternates(`/knowledge/${page.slug}`),
    openGraph: {
      title: ogTitle,
      description: page.description,
      url: `/knowledge/${page.slug}`,
      type: "article",
      locale: "fr_FR",
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: page.description,
      images: [ogImage]
    }
  };
}

export default async function KnowledgePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getKnowledgePage(slug);

  if (!page) notFound();

  return (
    <div className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgeJsonLd(page)) }}
      />
      {page.faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(page.faq)) }}
        />
      ) : null}
      <section className="case-hero">
        <div>
          <p className="eyebrow">Knowledge · dernière vérif {page.updated}</p>
          <AnimatedTitle>{page.title}</AnimatedTitle>
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

          {page.images ? (
            <section>
              <p className="section-kicker">Aperçu</p>
              <h2>Illustrations.</h2>
              {page.images.map((img) => (
                <figure className="article-figure" key={img.src}>
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                  {img.caption ? <figcaption>{img.caption}</figcaption> : null}
                </figure>
              ))}
            </section>
          ) : null}

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

      {page.faq ? (
        <section className="section">
          <div className="section-head">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2>Questions fréquentes.</h2>
            </div>
          </div>
          <div className="faq">
            {page.faq.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
