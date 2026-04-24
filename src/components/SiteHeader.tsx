import { Link } from 'react-router-dom';

interface SiteHeaderProps {
  title?: string;
  showBack?: boolean;
  backTo?: string;
}

export function SiteHeader({ title, showBack = false, backTo = '/' }: SiteHeaderProps) {
  return (
    <div className="flex flex-col items-center pt-[4vh] pb-[2vh]">
      <Link to="/">
        <img
          src="/images/cpc_logo.png"
          alt="Logo Cité Poisson-Chair"
          className="h-[12vh] mb-[1.5vh] max-[1000px]:h-[10vh]"
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
