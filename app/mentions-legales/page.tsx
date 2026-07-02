import type { Metadata } from "next";
import { site, pageAlternates } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de Jonas Suhard.",
  robots: { index: false, follow: true },
  alternates: pageAlternates("/mentions-legales")
};

export default function MentionsLegalesPage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Informations légales</p>
        <h1>Mentions légales.</h1>
        <p className="updated">Dernière mise à jour : 29 juin 2026</p>
      </section>

      <div className="legal">
        <section>
          <h2>Éditeur du site</h2>
          <p>
            Ce site est édité par Jonas Suhard, entrepreneur individuel sous l'enseigne
            JONAS SUHARD DIGITAL (micro-entreprise).
          </p>
          <p>
            SIRET : 102 763 364 00019 · Paris, France ·
            Contact : <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </section>

        <section>
          <h2>Directeur de la publication</h2>
          <p>Jonas Suhard.</p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>
            Site hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
            États-Unis — <a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a>.
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, la charte graphique et le code de ce site sont la propriété de
            Jonas Suhard, sauf mention contraire. Les marques et projets clients cités
            (ISCOM, Capsélys, etc.) restent la propriété de leurs détenteurs respectifs
            et sont présentés à titre de preuves de travail.
          </p>
        </section>

        <section>
          <h2>Données personnelles</h2>
          <p>
            Le détail du traitement des données figure sur la page{" "}
            <a href="/confidentialite">Confidentialité</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
