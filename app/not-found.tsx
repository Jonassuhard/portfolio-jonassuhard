import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <p className="eyebrow">404</p>
      <h1>Cette preuve n'existe pas.</h1>
      <p className="lead">Le lien est probablement ancien ou mal recopie.</p>
      <Link className="button primary" href="/projets">Retour aux projets</Link>
    </div>
  );
}

