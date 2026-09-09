import type { Metadata } from "next";
import Link from "next/link";
import { Courier_Prime } from "next/font/google";
import localFont from "next/font/local";
import { rootJsonLd } from "@/lib/json-ld";
import { site, siteUrl } from "@/lib/projects";
import SiteNav from "./site-nav";
import ConsentBanner from "./consent-banner";
import GlitchScheduler from "./glitch-scheduler";
import BlueprintBg from "./blueprint-bg";
import Observability from "./observability";
import "./globals.css";

const hasVercelObservability = process.env.VERCEL === "1";

// La DA utilise une graisse réelle par famille : 700 pour les titres, 400 pour
// le texte. Cela évite les synthèses et limite le chemin critique à deux fontes.
const fontTitle = localFont({
  src: [{ path: "./fonts/cormorant-garamond-700.woff2", weight: "700", style: "normal" }],
  variable: "--font-title",
  display: "optional",
  preload: true,
  fallback: ["Georgia"],
  adjustFontFallback: "Times New Roman"
});
const fontBody = Courier_Prime({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
  display: "optional",
  preload: true,
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: false
});
const fontClock = localFont({
  src: [{ path: "./fonts/oslo-ii.bold.woff2", weight: "700", style: "normal" }],
  variable: "--font-clock",
  display: "optional",
  preload: false
});
export const metadata: Metadata = {
  title: {
    default: site.seoTitle,
    template: "%s | Jonas Suhard"
  },
  description: site.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    types: {
      "application/json": "/profile.json",
      "text/markdown": "/profile.md"
    }
  },
  openGraph: {
    title: site.seoTitle,
    description: site.description,
    type: "website",
    locale: "fr_FR"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fonts = `${fontTitle.variable} ${fontBody.variable} ${fontClock.variable}`;
  return (
    <html lang="fr" className={fonts} data-scroll-behavior="smooth">
      <head>
        <link rel="alternate" type="application/ld+json" href="/knowledge-graph.json" />
      </head>
      <body>
        <BlueprintBg />
        <GlitchScheduler />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd()) }}
        />
        <header className="site-header">
          <SiteNav name={site.name} role={site.title} />
        </header>
        <main>{children}</main>
        <footer className="site-footer footer-signature">
          <span className="footer-gears" aria-hidden="true" />
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <Link className="footer-name" href="/">{site.name}</Link>
                <p className="footer-role">{site.title} · Paris</p>
              </div>
              <div className="footer-contact">
                <a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a>
                <div className="footer-social">
                  <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                  <a href={site.github}>GitHub ↗</a>
                </div>
              </div>
            </div>
            <nav className="footer-links footer-quick" aria-label="Liens utiles">
              <a href={site.cvClassic} download>CV (PDF) ↗</a>
              <Link href="/preuves">Preuves</Link>
              <Link href="/methode">Méthode</Link>
            </nav>
            <details className="footer-resources">
              <summary>Autres ressources</summary>
              <nav className="footer-links" aria-label="Ressources complémentaires">
                <Link href="/competences">Compétences</Link>
                <Link href="/knowledge">Guides et définitions</Link>
                <a href={site.cvStyled} download>CV illustré (PDF)</a>
                {site.malt ? <a href={site.malt} target="_blank" rel="noreferrer">Malt ↗</a> : null}
              </nav>
            </details>
            <div className="footer-bottom">
              <span>© 2026 Jonas Suhard</span>
              <nav className="footer-legal" aria-label="Informations légales">
                <Link href="/mentions-legales">Mentions légales</Link>
                <Link href="/confidentialite">Confidentialité</Link>
                <button type="button" data-open-consent>Gérer les cookies</button>
              </nav>
            </div>
          </div>
        </footer>
        <ConsentBanner />
        {hasVercelObservability ? <Observability /> : null}
      </body>
    </html>
  );
}
