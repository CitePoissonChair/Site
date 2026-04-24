import { Link } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';

const ecrits = [
  {
    src: '/images/Ecrits/Station Soleil Bleu/Couvertures/station_soleil_bleu_couv.png',
    alt: 'Station Soleil Bleu',
    to: '/projet/station-soleil-bleu',
  },
];

export function Ecrits() {
  return (
    <div className="min-h-screen bg-[rgb(15,15,15)] flex flex-col items-center px-[4vw] py-[4vh]">
      <SiteHeader title="Écrits" showBack />
      <div className="flex flex-wrap justify-center gap-[3vw] mt-[2vh]">
        {ecrits.map((ecrit) => (
          <Link key={ecrit.src} to={ecrit.to}>
            <img
              src={ecrit.src}
              alt={ecrit.alt}
              className="h-[30vh] block transition-transform duration-200 ease-in-out hover:rotate-2 hover:scale-[1.03] max-[1000px]:h-auto max-[1000px]:w-[80vw]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
