import { Link } from 'react-router-dom';
import { SiteHeader } from '../components/SiteHeader';

const revues = [
  {
    src: '/images/Revues/Buddy System/Couvertures/Couv_1.jpg',
    alt: 'Buddy System',
    to: '/buddy-1',
  },
  {
    src: '/images/Revues/Buddy System/Couvertures/Couv_2.jpg',
    alt: 'Buddy System',
    to: '/buddy-2',
  },
];

export function Revues() {
  return (
    <div className="min-h-screen bg-[rgb(15,15,15)] flex flex-col items-center px-[4vw] py-[4vh]">
      <SiteHeader title="Revues" showBack />
      <div className="flex flex-wrap justify-center gap-[3vw] mt-[2vh]">
        {revues.map((revue) => (
          <Link key={revue.src} to={revue.to}>
            <img
              src={revue.src}
              alt={revue.alt}
              className="h-[30vh] block transition-transform duration-200 ease-in-out hover:rotate-2 hover:scale-[1.03] max-[1000px]:h-auto max-[1000px]:w-[80vw]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
