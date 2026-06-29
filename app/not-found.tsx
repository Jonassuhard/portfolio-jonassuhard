import Link from "next/link";

export const metadata = {
  title: "404 — Ligne temporelle introuvable"
};

export default function NotFound() {
  return (
    <div className="page">
      <section className="notfound">
        <p className="eyebrow">Erreur de divergence · 404</p>
        <h1>Cette ligne temporelle n'existe pas.</h1>
        <p className="lead">
          La page que tu cherches appartient à une autre worldline. Le Reading Steiner
          n'a rien détecté à cette adresse — lien périmé, mal recopié, ou jamais advenu.
        </p>
        <p className="worldline-num">DIVERGENCE 1.048596 — SIGNAL PERDU</p>
        <div className="button-row">
          <Link className="button primary" href="/">Revenir à la ligne stable</Link>
          <Link className="button" href="/projets">Voir les projets</Link>
        </div>
        <p className="elpsy">El Psy Kongroo.</p>
      </section>
    </div>
  );
}
