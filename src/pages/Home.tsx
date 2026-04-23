import { Sidebar } from '../components/Sidebar';
import { CoverImage } from '../components/CoverImage';
import '../styles/Home.css';

export function Home() {
  return (
    <div className="home-page">
      <Sidebar />

      <div id="description">
        <p>
          Cité Poisson-Chair est un collectif basé à Paris.
        </p>
      </div>

      <CoverImage
        id="image1"
        src="/images/station_soleil_bleu_couv.png"
        alt="Station Soleil Bleu"
        to="/projet/station-soleil-bleu"
      />

      <CoverImage
        id="image2"
        src="/images/Couv 1.jpg"
        alt="Buddy System"
        to="/buddy-1"
      />
    </div>
  );
}
