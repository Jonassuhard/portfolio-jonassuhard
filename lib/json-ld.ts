import { projects, site, siteUrl } from "./projects";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Builder IA appliquée & Growth Engineer",
    email: `mailto:${site.email}`,
    url: siteUrl,
    sameAs: [site.github, site.linkedin],
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
    "@type": project.stack.some((item) => ["Next.js", "React", "Python"].includes(item))
      ? "SoftwareSourceCode"
      : "CreativeWork",
    name: project.title,
    description: project.summary,
    author: {
      "@type": "Person",
      name: site.name
    },
    programmingLanguage: project.stack,
    url: `${siteUrl}/projets/${project.slug}`
  };
}

