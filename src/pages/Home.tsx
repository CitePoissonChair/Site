import { Link } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';
import { CoverImage } from '../components/CoverImage';

export function Home() {
  return (
    <div className="bg-[rgb(15,15,15)] min-h-screen">
      <div className="flex flex-col items-center relative z-[5]">
        <SiteHeader />
        <nav className="flex flex-row gap-[3vw] mt-[1.5vh] max-[1000px]:gap-[4vw]">
          <Link to="/prestations" className="text-[2.25vh] text-[rgb(250,250,250)] whitespace-nowrap hover:underline max-[1000px]:text-[3vh]">Prestations</Link>
          <Link to="/revues" className="text-[2.25vh] text-[rgb(250,250,250)] whitespace-nowrap hover:underline max-[1000px]:text-[3vh]">Revues</Link>
          <Link to="/ecrits" className="text-[2.25vh] text-[rgb(250,250,250)] whitespace-nowrap hover:underline max-[1000px]:text-[3vh]">Écrits</Link>
          <Link to="/a-propos" className="text-[2.25vh] text-[rgb(250,250,250)] whitespace-nowrap hover:underline max-[1000px]:text-[3vh]">À propos</Link>
        </nav>
      </div>

      <div className="flex flex-row justify-center items-start gap-[4vw] mt-[4vh] px-[4vw] max-[1000px]:flex-col max-[1000px]:items-center max-[1000px]:gap-[4vh] max-[1000px]:px-0">
        <CoverImage
          src="/images/Ecrits/Station Soleil Bleu/Couvertures/station_soleil_bleu_couv.png"
          alt="Station Soleil Bleu"
          to="/projet/station-soleil-bleu"
          className="h-[60vh] -rotate-[4deg] hover:rotate-[2deg] transition-transform duration-200 max-[1000px]:h-auto max-[1000px]:w-[90%] max-[1000px]:rotate-0 max-[1000px]:hover:rotate-0"
        />
        <CoverImage
          src="/images/Revues/Buddy System/Couvertures/Couv_1.jpg"
          alt="Buddy System"
          to="/buddy-1"
          className="h-[60vh] -rotate-[4deg] hover:rotate-[2deg] transition-transform duration-200 max-[1000px]:h-auto max-[1000px]:w-[90%] max-[1000px]:rotate-0 max-[1000px]:hover:rotate-0"
        />
      </div>
    </div>
  );
}
