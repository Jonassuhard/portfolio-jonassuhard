import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Courier_Prime } from "next/font/google";
import localFont from "next/font/local";
import { rootJsonLd } from "@/lib/json-ld";
import { site, siteUrl } from "@/lib/projects";
import NixieClock from "./nixie-clock";
import SiteNav from "./site-nav";
import ConsentBanner from "./consent-banner";
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
  preload: true
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd()) }}
        />
        <header className="site-header">
          <div className="titlebar">
            <span className="titlebar-name">
              JONAS SUHARD <span className="titlebar-role">— {site.title}</span>
            </span>
            <span className="ver">{site.location} · <NixieClock /></span>
          </div>
          <SiteNav />
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="foot-top">
            <div className="foot-id">
              <Image
                className="brand-mark sm"
                src="/brand/js-medallion-sm.webp"
                alt=""
                width={38}
                height={38}
                sizes="38px"
                quality={85}
              />
              <div>
                <strong>Jonas Suhard</strong>
                <span className="foot-id-sub">{site.headline}</span>
              </div>
            </div>
            <p className="foot-pitch">
              Marketing, IA générative, automatisation et développement web.
            </p>
          </div>
          <div className="foot-cols">
            <div>
              <p className="foot-col-title">Contact</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.github}>GitHub</a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              {site.malt ? (
                <a href={site.malt} target="_blank" rel="noreferrer">Malt</a>
              ) : null}
            </div>
            <div>
              <p className="foot-col-title">Ressources</p>
              <a href={site.cvClassic} download>CV — classique (PDF)</a>
              <a href={site.cvStyled} download>CV — version site (PDF)</a>
              <Link href="/knowledge">Knowledge</Link>
              <Link href="/preuves">Preuves</Link>
            </div>
            <div>
              <p className="foot-col-title">Légal</p>
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/confidentialite">Confidentialité</Link>
              <button type="button" className="foot-link-btn" data-open-consent>
                Gérer les cookies
              </button>
            </div>
          </div>
          <div className="foot-bar">
            <span>© 2026 Jonas Suhard</span>
            <span>jonassuhard.com</span>
          </div>
        </footer>
        <ConsentBanner />
        {hasVercelObservability ? <Observability /> : null}
      </body>
    </html>
  );
}
