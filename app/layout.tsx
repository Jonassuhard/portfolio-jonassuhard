import type { Metadata } from "next";
import Link from "next/link";
import {
  Cormorant_Garamond,
  Courier_Prime,
  Special_Elite,
  Newsreader,
  IBM_Plex_Mono
} from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { personJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { site, siteUrl } from "@/lib/projects";
import GlitchController from "./glitch-controller";
import NixieClock from "./nixie-clock";
import SiteNav from "./site-nav";
import "./globals.css";

// Seuls le titre (h1) et le corps (lead/paragraphes) sont préchargés : ce sont
// les fonts du hero qui pilotent le LCP. Les autres (titlebar, eyebrow, clock)
// sont petites et chargées en swap -> on libère la bande passante mobile 4G.
// display:optional sur les fonts du hero -> pas de swap tardif qui décale le LCP.
// Le fallback métrique-ajusté (Georgia / Courier New) rend le premier paint, la
// font custom prend la main dès qu'elle est en cache. Zéro CLS, LCP ≈ FCP.
const fontTitle = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-title",
  display: "optional",
  preload: true
});
const fontBody = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "optional",
  preload: true
});
const fontType = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-type",
  display: "swap",
  preload: false
});
const fontItalic = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-italic",
  display: "swap",
  preload: false
});
const fontData = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-data",
  display: "swap",
  preload: false
});
const fontClock = localFont({
  src: [
    { path: "./fonts/oslo-ii.regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/oslo-ii.bold.ttf", weight: "700", style: "normal" }
  ],
  variable: "--font-clock",
  display: "swap",
  preload: false
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
  const fonts = `${fontTitle.variable} ${fontBody.variable} ${fontType.variable} ${fontItalic.variable} ${fontData.variable} ${fontClock.variable}`;
  return (
    <html lang="fr" className={fonts}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <header className="site-header">
          <div className="titlebar">
            <span>JONAS SUHARD — Evidence Archive</span>
            <span className="ver">{site.location} · <NixieClock /></span>
          </div>
          <SiteNav />
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="foot-top">
            <div className="foot-id">
              <img className="brand-mark sm" src="/brand/js-medallion-sm.webp" alt="" width={46} height={46} />
              <div>
                <strong>Jonas Suhard</strong>
                <span className="foot-id-sub">Builder IA appliquée &amp; Growth Engineer</span>
              </div>
            </div>
            <p className="foot-pitch">
              Marketing, IA générative et développement full-stack. Disponible à partir du {site.availability} · {site.location} ou hybride.
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
              <p className="foot-col-title">Documents</p>
              <a href={site.cvClassic}>CV — classique (PDF)</a>
              <a href={site.cvStyled}>CV — version site (PDF)</a>
              <a href="/profile.md">profile.md</a>
              <a href="/skills.md">skills.md</a>
            </div>
            <div>
              <p className="foot-col-title">Agent-readable</p>
              <a href="/profile.json">profile.json</a>
              <a href="/llms.txt">llms.txt</a>
              <a href="/sitemap.xml">sitemap.xml</a>
            </div>
            <div>
              <p className="foot-col-title">Légal</p>
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/confidentialite">Confidentialité</Link>
            </div>
          </div>
          <div className="foot-bar">
            <span>© 2026 Jonas Suhard</span>
            <span>jonassuhard.com</span>
          </div>
        </footer>
        <GlitchController />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
