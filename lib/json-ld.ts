import { projects, site, siteUrl, skills } from "./projects";

const personId = `${siteUrl}/#person`;

function projectId(slug: string) {
  return `${siteUrl}/#${slug}`;
}

function skillId(name: string) {
  return `${siteUrl}/skills#${name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
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
    jobTitle: "Growth Engineer · IA appliquée & Automatisation",
    description:
      "Profil hybride marketing, IA générative et développement full-stack, orienté delivery.",
    email: `mailto:${site.email}`,
    url: siteUrl,
    sameAs: [site.github, site.linkedin, site.malt],
    seeks: {
      "@type": "Demand",
      name: "CDI Growth Engineer / Marketing Technologist IA",
      availabilityStarts: "2026-09-01",
      areaServed: "Paris / hybride"
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "MyDigitalSchool Paris",
        description: "MBA Expert Marketing Digital - RNCP41809 niveau 7 (en cours, 2024-2026)"
      },
      {
        "@type": "EducationalOrganization",
        name: "La Digital School Angers",
        description: "Bachelor Chef de projet digital - RNCP niveau 6 (2023-2024)"
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

  return {
    "@context": "https://schema.org",
    "@type": projectType(project),
    "@id": projectId(project.slug),
    name: project.title,
    description: project.summary,
    author: {
      "@id": personId
    },
    programmingLanguage: project.stack,
    url: `${siteUrl}/projets/${project.slug}`,
    encoding: {
      "@type": "MediaObject",
      encodingFormat: "text/markdown",
      contentUrl: `${siteUrl}/projects/${project.slug}.md`
    },
    creativeWorkStatus: project.status,
    about: [
      { "@type": "PropertyValue", name: "evidence", value: project.proofLine },
      ...project.limits.map((limit) => ({ "@type": "PropertyValue", name: "limits", value: limit }))
    ]
  };
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
