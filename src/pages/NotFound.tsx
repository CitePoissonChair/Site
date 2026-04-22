import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

export function NotFound() {
  return (
    <div className="notfound-page">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-message">Gustave tu pètes les couilles !!!</p>
      <Link to="/" className="notfound-link">Retour à l'accueil</Link>
    </div>
  );
}
