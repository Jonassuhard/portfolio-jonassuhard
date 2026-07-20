import type { Metadata } from "next";
import { site, pageAlternates } from "@/lib/projects";
import AnimatedTitle from "../animated-title";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité du site de Jonas Suhard.",
  robots: { index: false, follow: true },
  alternates: pageAlternates("/confidentialite")
};

export default function ConfidentialitePage() {
  return (
    <div className="page">
      <section>
        <p className="eyebrow">Protection des données</p>
        <AnimatedTitle>Confidentialité.</AnimatedTitle>
        <p className="updated">Dernière mise à jour : 20 juillet 2026</p>
      </section>

      <div className="legal">
        <section>
          <h2>En résumé</h2>
          <p>
            Ce site est une bibliothèque de preuves de travail. Il n'y a ni formulaire, ni compte,
            ni newsletter, et aucun traceur publicitaire. La mesure d'audience se fait en deux
            temps. Une couche sans cookie, active pour tout le monde. Une couche avec cookies
            (Microsoft Clarity) qui ne se charge qu'après votre accord explicite.
          </p>
        </section>

        <section>
          <h2>Mesure d'audience sans cookie</h2>
          <p>
            Vercel Web Analytics et Speed Insights mesurent l'audience de façon agrégée (pages vues,
            provenance, performance) sans cookie et sans identifiant qui vous suit. Ces données ne
            permettent pas de vous identifier et ne servent pas à du profilage. Cette couche ne
            nécessite pas de consentement.
          </p>
        </section>

        <section>
          <h2>Microsoft Clarity (soumis à votre consentement)</h2>
          <p>
            Avec votre accord, ce site utilise Microsoft Clarity pour comprendre comment les pages
            sont réellement consultées. Clarity dépose des cookies de mesure (<code>_clck</code>,{" "}
            <code>_clsk</code>) et enregistre de façon anonyme la navigation (clics, défilement,
            mouvements de souris) ainsi que des cartes de chaleur. Les champs sensibles et le texte
            saisi sont masqués par défaut. Les données sont traitées par Microsoft en tant que
            sous-traitant (voir la{" "}
            <a href="https://privacy.microsoft.com/fr-fr/privacystatement" target="_blank" rel="noreferrer">
              déclaration de confidentialité Microsoft
            </a>
            ).
          </p>
          <p>
            Rien de tout cela ne se déclenche tant que vous n'avez pas cliqué sur « Accepter ». Si
            vous refusez, aucun cookie Clarity n'est posé et aucune session n'est enregistrée. Vous
            pouvez changer d'avis à tout moment avec le lien « Gérer les cookies » en bas de page.
            Le retrait transmet un refus à Clarity, efface ses cookies puis recharge la page sans
            le script de mesure.
          </p>
        </section>

        <section>
          <h2>Données techniques</h2>
          <p>
            L'hébergeur Vercel conserve des journaux serveurs techniques (adresse IP, type de
            navigateur, pages consultées) pour le fonctionnement et la sécurité du site. Ces
            journaux sont gérés par Vercel et ne sont pas exploités par Jonas Suhard à des fins de
            profilage ou de prospection.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Si vous me contactez par e-mail, votre adresse et le contenu de votre message ne servent
            qu'à vous répondre. Ils ne sont ni revendus, ni transmis à un tiers.
          </p>
        </section>

        <section>
          <h2>Vos droits</h2>
          <p>
            Vous pouvez retirer votre consentement à Clarity quand vous voulez avec le lien « Gérer
            les cookies » en bas de page. Conformément au RGPD, vous pouvez aussi demander l'accès,
            la rectification ou la suppression des données vous concernant en écrivant à{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
