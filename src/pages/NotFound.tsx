import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
      <h1 className="font-[family-name:var(--font-yatra)] text-[8rem] text-[rgb(250,250,250)] leading-none">404</h1>
      <p className="font-[family-name:var(--font-harmattan)] text-[1.5rem] text-[rgb(200,200,200)]">Gustave tu pètes les couilles !!!</p>
      <Link
        to="/"
        className="font-[family-name:var(--font-harmattan)] text-[1.2rem] text-[rgb(250,250,250)] border-b border-[rgb(250,250,250)] pb-[2px] transition-opacity duration-200 hover:opacity-60"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
