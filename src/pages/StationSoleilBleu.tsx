import { Link } from 'react-router-dom';
import '../styles/ProjectPage.css';

export function StationSoleilBleu() {
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
            <b>Station Soleil Bleu</b>
            <br />
            <i></i>
          </h1>
          <br />
          <p>
           
            <br />
            <br />
            <i>
             
              <br />
              
            </i>
          </p>
          <p>
            
          </p>
        </div>

        <div className="images-gallery">
          <img
            className="gallery-image"
            src="/images/station_soleil_bleu_couv.png"
            alt="Station Soleil Bleu - Couverture"
          />
          <img
            className="gallery-image"
            src="/images/CPC_station_soleil_bleu_1.jpg"
            alt="Station Soleil Bleu - Image 1"
          />
          <img
            className="gallery-image"
            src="/images/CPC_station_soleil_bleu_2.jpg"
            alt="Station Soleil Bleu - Image 2"
          />
        </div>
      </div>
    </div>
  );
}
