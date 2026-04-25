import { Link } from 'react-router-dom';
import { useState } from 'react';

interface SiteHeaderProps {
  title?: string;
  showBack?: boolean;
  backTo?: string;
}

export function SiteHeader({ title, showBack = false, backTo = '/' }: SiteHeaderProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center pt-[4vh] pb-[2vh]">
      <Link to="/">
        <img
          src={hovered ? "/images/cpc_logo_hover.png" : "/images/cpc_logo.png"}
          alt="Logo Cité Poisson-Chair"
          className="h-[12vh] mb-[1.5vh] max-[1000px]:h-[10vh] transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </Link>

      <h1 className="font-normal text-[3vh] text-[rgb(250,250,250)] whitespace-nowrap text-center max-[1000px]:text-[4vh]">
        {title ?? 'Cité Poisson-Chair'}
      </h1>

      {showBack && (
        <Link
          to={backTo}
          className="mt-[0.4vh] text-[2vh] text-[rgb(200,200,200)] no-underline hover:underline"
        >
          ← Retour
        </Link>
      )}
    </div>
  );
}
