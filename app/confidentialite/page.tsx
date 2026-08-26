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
        <p className="updated">Dernière mise à jour : 26 août 2026</p>
      </section>

      <div className="legal">
        <section>
          <h2>En résumé</h2>
          <p>
            Ce site est une bibliothèque de preuves de travail. Il n'y a ni formulaire, ni compte,
            ni newsletter, ni publicité ciblée. Vercel fournit des statistiques d'audience et de
            performance sans cookie. Microsoft Clarity ne se charge qu'après votre accord explicite.
          </p>
        </section>

        <section>
          <h2>Responsable du traitement</h2>
          <p>
            Jonas Suhard, entrepreneur individuel sous l'enseigne JONAS SUHARD DIGITAL, est
            responsable des traitements décrits ici. Le point de contact est{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Aucun délégué à la protection des
            données n'a été désigné. Les informations d'identification complètes figurent dans les{" "}
            <a href="/mentions-legales">mentions légales</a>.
          </p>
        </section>

        <section>
          <h2>Audience et performance sans cookie</h2>
          <p>
            Vercel Web Analytics mesure les pages vues, la provenance, le pays, l'appareil et le
            navigateur. Vercel indique ne pas déposer de cookie, ne pas associer les mesures à une
            adresse IP et renouveler sous 24 heures le hash utilisé pour compter un visiteur. Speed
            Insights reçoit séparément la route consultée, le pays, le type d'appareil et les Core Web
            Vitals. Ces mesures servent uniquement à comprendre l'audience et corriger les problèmes
            de performance, sans profil individuel ni recoupement entre sites.
          </p>
          <p>
            La base légale retenue est l'intérêt légitime à mesurer et améliorer ce site. Ces outils
            sont configurés sans cookie et limités à des statistiques agrégées. Vous pouvez néanmoins
            vous y opposer en écrivant à <a href={`mailto:${site.email}`}>{site.email}</a>. Le compte
            Vercel actuel est au forfait Hobby : Jonas peut consulter Web Analytics pendant un mois et
            Speed Insights pendant sept jours. Jonas n'exporte pas ces données. Vercel peut appliquer
            ses propres durées pour ses obligations techniques, contractuelles ou légales. Voir la{" "}
            <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">
              documentation Web Analytics
            </a>{" "}
            et la{" "}
            <a
              href="https://vercel.com/docs/speed-insights/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              documentation Speed Insights
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Microsoft Clarity, après accord</h2>
          <p>
            Si vous acceptez, Microsoft Clarity reçoit les pages consultées et des données
            d'interaction comme les clics, défilements et mouvements de pointeur. Il produit des
            cartes de chaleur et des relectures de navigation afin d'améliorer l'ergonomie du site.
            Les zones de saisie sont masquées. Clarity peut déposer des cookies propriétaires et
            tiers, notamment <code>_clck</code> et <code>_clsk</code>. Le stockage publicitaire reste
            refusé par le site et ces données ne sont pas utilisées par Jonas pour de la publicité.
            La liste des cookies et leurs fonctions est tenue à jour dans la{" "}
            <a
              href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies"
              target="_blank"
              rel="noreferrer"
            >
              documentation Microsoft
            </a>
            .
          </p>
          <p>
            La base légale est votre consentement. Rien ne se déclenche avant « Accepter ». Le refus
            n'empêche aucune fonction du site. Vous pouvez modifier votre choix via « Gérer les
            cookies » dans le pied de page. Le retrait transmet le refus à Clarity, efface ses cookies
            et recharge la page sans son script. Le site conserve votre choix dans le stockage local
            pendant 180 jours, puis le redemande.
          </p>
          <p>
            Microsoft conserve normalement les données de relecture pendant 30 jours. Les données
            agrégées, cartes de chaleur et certaines sessions échantillonnées ou marquées peuvent être
            conservées jusqu'à neuf mois. Voir la{" "}
            <a
              href="https://learn.microsoft.com/en-gb/clarity/setup-and-installation/data-retention"
              target="_blank"
              rel="noreferrer"
            >
              politique de conservation Clarity
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Hébergement et journaux techniques</h2>
          <p>
            Vercel héberge le site et traite les données nécessaires à l'acheminement et à la sécurité
            des requêtes, notamment l'adresse IP, l'horodatage, le navigateur et l'URL demandée. La
            finalité est le fonctionnement, la prévention des abus et la sécurité ; la base légale est
            l'intérêt légitime. Jonas n'utilise pas ces journaux pour du profilage ou de la prospection
            et, sur le forfait Hobby actuel, ne peut consulter les journaux d'exécution que pendant une
            heure. Vercel applique ensuite les durées prévues par ses obligations et sa{" "}
            <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">
              politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Si vous écrivez à l'adresse de contact, votre adresse, le contenu du message et les pièces
            jointes éventuelles servent uniquement à traiter votre demande. La base légale est
            l'intérêt légitime à répondre ou, si votre demande précède une collaboration, l'exécution
            de mesures précontractuelles. Jonas et son prestataire de messagerie Infomaniak sont les
            destinataires. Les échanges sont conservés le temps de répondre, puis au maximum trois ans
            après le dernier contact utile, sauf obligation légale ou nécessité de défendre un droit.
          </p>
        </section>

        <section>
          <h2>Destinataires et transferts</h2>
          <p>
            Les destinataires sont Jonas Suhard et, selon le traitement, Vercel, Microsoft Clarity et
            Infomaniak en qualité de prestataires. Vercel et Microsoft sont des sociétés américaines :
            des traitements hors de l'Espace économique européen peuvent intervenir. Ils annoncent les
            encadrer par les mécanismes applicables, notamment les décisions d'adéquation et les clauses
            contractuelles types. Vous pouvez consulter le{" "}
            <a href="https://vercel.com/legal/dpa" target="_blank" rel="noreferrer">
              DPA de Vercel
            </a>{" "}
            et la{" "}
            <a href="https://privacy.microsoft.com/fr-fr/privacystatement" target="_blank" rel="noreferrer">
              déclaration de confidentialité Microsoft
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Vos droits</h2>
          <p>
            Selon le traitement, vous pouvez demander l'accès, la rectification, l'effacement, la
            limitation, la portabilité ou vous opposer à l'utilisation de vos données. Vous pouvez
            retirer votre consentement à Clarity à tout moment via « Gérer les cookies », sans effet
            rétroactif sur la licéité du traitement déjà réalisé. Écrivez à{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> ; une réponse sera apportée dans le délai
            légal, sous réserve d'une vérification raisonnable de votre identité si nécessaire. Vous
            pouvez aussi introduire une réclamation auprès de la{" "}
            <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">
              CNIL
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Décision automatisée et mise à jour</h2>
          <p>
            Aucune décision produisant un effet juridique, aucun profil de recrutement et aucune
            prospection automatisée ne sont réalisés à partir de ces données. Cette politique est
            revue lorsque les outils, leurs réglages ou leurs conditions de traitement changent.
          </p>
        </section>
      </div>
    </div>
  );
}
