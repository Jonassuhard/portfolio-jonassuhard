import type { Metadata } from "next";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité du site de Jonas Suhard.",
  robots: { index: false, follow: true }
};

export default function ConfidentialitePage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Protection des données</p>
        <h1>Confidentialité.</h1>
        <p className="updated">Dernière mise à jour : 29 juin 2026</p>
      </section>

      <div className="legal">
        <section>
          <h2>En résumé</h2>
          <p>
            Ce site est une bibliothèque de preuves de travail. Il ne collecte aucune
            donnée personnelle, n'utilise aucun cookie de suivi et n'intègre aucun
            traceur publicitaire. Il n'y a ni formulaire, ni compte, ni newsletter.
          </p>
        </section>

        <section>
          <h2>Données techniques</h2>
          <p>
            L'hébergeur Vercel conserve des journaux serveurs techniques (adresse IP,
            type de navigateur, pages consultées) pour le fonctionnement et la sécurité
            du site. Ces journaux sont gérés par Vercel et ne sont pas exploités par
            Jonas Suhard à des fins de profilage ou de prospection.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Si vous me contactez par e-mail, votre adresse et le contenu de votre message
            ne servent qu'à vous répondre. Ils ne sont ni revendus, ni transmis à un tiers.
          </p>
        </section>

        <section>
          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous pouvez demander l'accès, la rectification ou la
            suppression des données vous concernant en écrivant à{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
