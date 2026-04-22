import { Link } from 'react-router-dom';
import '../styles/Home.css';

export function Home() {
  return (
    <div className="home-page">
      {/* Logo */}
      <Link to="/">
        <img id="logo" src="/images/cpc_logo.png" alt="CPC Logo" />
      </Link>

      {/* Sidebar Navigation */}
      <Link to="/">
        <div id="cpc"><b>Cité Poisson-Chair TEST</b></div>
      </Link>

      <Link to="/prestations">
        <div id="prestations">Prestations</div>
      </Link>

      <Link to="/buddy-1">
        <div id="buddy"></div>
      </Link>

      <Link to="/">
        <div id="illustrations"></div>
      </Link>

      <Link to="/">
        <div id="sculptures"></div>
      </Link>

      {/* Description */}
      <div id="description">
        <p><p1></p1></p>
      </div>

      {/* Cover Images */}
      <Link to="/projet/station-soleil-bleu">
        <img id="image1" src="/images/station_soleil_bleu_couv.png" alt="Station Soleil Bleu" />
      </Link>

      <Link to="/buddy-1">
        <img id="image2" src="/images/Couv 1.jpg" alt="Buddy System" />
      </Link>
    </div>
  );
}
