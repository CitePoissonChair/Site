import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface SiteHeaderProps {
  title?: string;
  showBack?: boolean;
}

export function SiteHeader({ title, showBack = false }: SiteHeaderProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center pt-[4vh] pb-[2vh]">
      <Link to="/">
        <img
          src={hovered ? "/images/cpc_logo_hover.png" : "/images/cpc_logo.png"}
          alt="Logo Cité Poisson-Chair"
          className="h-[12vh] mb-[1.5vh] max-[1000px]:h-[10vh] transition-all duration-200 ease-in-out hover:scale-105 hover:brightness-110 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </Link>

      <h1 className="font-normal text-[3vh] text-[rgb(250,250,250)] whitespace-nowrap text-center max-[1000px]:text-[4vh]">
        {title ?? 'Cité Poisson-Chair'}
      </h1>

      {showBack && (
        <button
          onClick={handleBack}
          className="mt-[0.4vh] text-[2vh] text-[rgb(200,200,200)] hover:text-white hover:underline transition-colors duration-150"
        >
          ← Retour
        </button>
      )}
    </div>
  );
}
