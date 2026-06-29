import type { Metadata } from "next";
import Link from "next/link";
import {
  Cormorant_Garamond,
  Courier_Prime,
  Special_Elite,
  Newsreader,
  IBM_Plex_Mono
} from "next/font/google";
import { personJsonLd } from "@/lib/json-ld";
import { site, siteUrl } from "@/lib/projects";
import "./globals.css";

const fontTitle = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-title",
  display: "swap"
});
const fontBody = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap"
});
const fontType = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-type",
  display: "swap"
});
const fontItalic = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-italic",
  display: "swap"
});
const fontData = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-data",
  display: "swap"
});
export const metadata: Metadata = {
  title: {
    default: site.title,
    template: "%s | Jonas Suhard"
  },
  description: site.description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    types: {
      "application/json": "/profile.json",
      "text/markdown": "/profile.md"
    }
  },
  openGraph: {
    title: site.title,
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
  const fonts = `${fontTitle.variable} ${fontBody.variable} ${fontType.variable} ${fontItalic.variable} ${fontData.variable}`;
  return (
    <html lang="fr" className={fonts}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <header className="site-header">
          <div className="titlebar">
            <span>JONAS SUHARD — Bibliothèque de preuves</span>
            <span className="ver">v1.0 · {site.location}</span>
          </div>
          <div className="menubar">
            <Link className="brand" href="/" aria-label="Accueil Jonas Suhard">
              <span className="brand-mark">JS</span>
            </Link>
            <nav className="main-nav" aria-label="Navigation principale">
              <Link href="/recruteurs">Recruteurs</Link>
              <Link href="/projets">Preuves</Link>
              <Link href="/competences">Compétences</Link>
              <Link href="/a-propos">À propos</Link>
              <a href="/cv.pdf">CV</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="foot-top">
            <div className="foot-id">
              <span className="brand-mark sm">JS</span>
              <div>
                <strong>Jonas Suhard</strong>
                <span className="foot-id-sub">Builder IA appliquée &amp; Growth Engineer</span>
              </div>
            </div>
            <p className="foot-pitch">
              Marketing, IA générative et développement full-stack. Disponible {site.availability} · {site.location} ou hybride.
            </p>
          </div>
          <div className="foot-cols">
            <div>
              <h5>Contact</h5>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.github}>GitHub</a>
              <a href={site.linkedin}>LinkedIn</a>
            </div>
            <div>
              <h5>Documents</h5>
              <a href="/cv.pdf">CV (PDF)</a>
              <a href="/profile.md">profile.md</a>
              <a href="/skills.md">skills.md</a>
            </div>
            <div>
              <h5>Agent-readable</h5>
              <a href="/profile.json">profile.json</a>
              <a href="/llms.txt">llms.txt</a>
              <a href="/sitemap.xml">sitemap.xml</a>
            </div>
            <div>
              <h5>Légal</h5>
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/confidentialite">Confidentialité</Link>
            </div>
          </div>
          <div className="foot-bar">
            <span>© 2026 Jonas Suhard</span>
            <span>jonassuhard.com</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
