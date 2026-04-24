import { Link } from 'react-router-dom';
import '../styles/ProjectPage.css';

export function BuddySystem1() {
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
            <b>Buddy System n°1</b>
            <br />
            <i></i>
          </h1>
          <br />
          <p>
            Des corps et des cadavres
            <br />
            <br />
            <i>
              Avec des contributions de :
              <br />
              Amaury Hardré
              Virgile Mollat
              Margaux Tailame
              Alexandre Lécroart
              Raoul Deloffre
            </i>
          </p>
          <p>
           
          </p>
        </div>

        <div className="images-gallery">
          <img
            className="gallery-image"
            src="/images/buddy_1_p1.jpg"
            alt="Buddy System 1 - Image 1"
          />
          <img
            className="gallery-image"
            src="/images/buddy_1_p2.jpg"
            alt="Buddy System 1 - Image 2"
          />
          <img
            className="gallery-image"
            src="/images/buddy_1_p3.jpg"
            alt="Buddy System 1 - Image 3"
          />
          <img
            className="gallery-image"
            src="/images/buddy_couv.jpg"
            alt="Buddy System 1 - Couverture"
          />
        </div>
      </div>
    </div>
  );
}
