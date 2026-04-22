import { Link } from 'react-router-dom';
import '../styles/ProjectPage.css';

export function Photos() {
  return (
    <div className="project-page">
      <div className="project-header">
        <Link to="/">
          <img src="/images/cpc_logo.png" alt="CPC Logo" />
        </Link>
      </div>

      <div className="project-content">
        <div id="description">
          <h1>
            <b>Photos</b>
          </h1>
          <p>Galerie de photos - À venir</p>
        </div>

        <div className="images-gallery">
          <p>Contenu à venir...</p>
        </div>
      </div>
    </div>
  );
}
