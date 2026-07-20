import { evidenceLevelMeta, projects, site, siteUrl, skills, toAnchorId } from "./projects";
import { faqItems } from "./faq";

const personId = `${siteUrl}/#person`;

function projectId(slug: string) {
  return `${siteUrl}/#${slug}`;
}

function skillId(name: string) {
  return `${siteUrl}/competences#${toAnchorId(name)}`;
}

function projectType(project: (typeof projects)[number]) {
  return project.stack.some((item) => ["Next.js", "React", "Python"].includes(item))
    ? "SoftwareSourceCode"
    : "CreativeWork";
}

function withoutContext<T extends { "@context"?: string }>(node: T) {
  const { "@context": _context, ...rest } = node;
  return rest;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name,
    jobTitle: site.title,
    description:
      "Profil junior à l'interface des besoins métier, de l'IA appliquée, de l'automatisation et du développement web.",
    email: `mailto:${site.email}`,
    url: siteUrl,
    sameAs: [site.github, site.linkedin, site.malt],
    seeks: {
      "@type": "Demand",
      name: "CDI junior Chef de projet IA appliquée et automatisation / Growth Engineer",
      availabilityStarts: "2026-09-01",
      areaServed: "Paris / hybride"
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "MyDigitalSchool Paris",
        description: "MBA Expert Marketing Digital - préparation du titre RNCP41809 niveau 7 (en cours, 2024-2026)"
      },
      {
        "@type": "EducationalOrganization",
        name: "La Digital School Angers",
        description: "Bachelor Chef de projet digital - titre RNCP34340 niveau 6 (2023-2024, preuve privée)"
      }
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR"
    },
    knowsAbout: [
      "SEO",
      "Growth Engineering",
      "Generative AI workflows",
      "Next.js",
      "React",
      "Firebase",
      "Supabase",
      "Python automation"
    ]
  };
}

export function projectJsonLd(slug: string) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) return null;

  // Type CreativeWork forcé quand le code n'est pas de Jonas : on ne déclare pas
  // une authorship de logiciel qu'il ne revendique pas (cohérence machine = argument Preuvia).
  const type = project.codeByOthers ? "CreativeWork" : projectType(project);
  const isCode = type === "SoftwareSourceCode";

  const node: Record<string, unknown> & { "@context": string } = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": projectId(project.slug),
    name: project.title,
    description: project.summary,
    // author pour ce qu'il a construit, contributor quand le dev vient de l'équipe.
    ...(project.codeByOthers
      ? { contributor: { "@id": personId } }
      : { author: { "@id": personId } }),
    url: `${siteUrl}/projets/${project.slug}`,
    encoding: {
      "@type": "MediaObject",
      encodingFormat: "text/markdown",
      contentUrl: `${siteUrl}/projects/${project.slug}.md`
    },
    creativeWorkStatus: project.status,
    about: [
      { "@type": "PropertyValue", name: "evidence", value: project.proofLine },
      {
        "@type": "PropertyValue",
        name: "evidenceLevel",
        value: evidenceLevelMeta[project.evidenceLevel].label
      },
      ...project.limits.map((limit) => ({ "@type": "PropertyValue", name: "limits", value: limit }))
    ]
  };
  // programmingLanguage n'a de sens que sur du code réellement écrit par Jonas.
  if (isCode) node.programmingLanguage = project.stack;

  return node;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jonas Suhard — Portfolio",
    url: siteUrl,
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: site.name }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`
    }))
  };
}

export function knowledgeGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      withoutContext(personJsonLd()),
      withoutContext(websiteJsonLd()),
      ...skills.map((skill) => ({
        "@type": "DefinedTerm",
        "@id": skillId(skill.name),
        name: skill.name,
        description: skill.note,
        subjectOf: skill.proofSlugs.map((slug) => ({ "@id": projectId(slug) }))
      })),
      ...projects.map((project) => {
        const node = projectJsonLd(project.slug);
        return node ? withoutContext(node) : null;
      }).filter(Boolean)
    ]
  };
}

// Article : rend une page knowledge citable (auteur, dates, langue) pour Google et les LLM.
export function knowledgeJsonLd(page: {
  slug: string;
  title: string;
  description: string;
  updated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    datePublished: page.updated,
    dateModified: page.updated,
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: site.name, "@id": personId },
    url: `${siteUrl}/knowledge/${page.slug}`
  };
}

// FAQPage : rend les Q/R factuelles éligibles aux rich results et citables par les LLM.
export function faqPageJsonLd(items: Array<{ q: string; a: string }> = faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };
}
