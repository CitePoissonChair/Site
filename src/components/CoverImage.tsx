import { Link } from 'react-router-dom';

interface CoverImageProps {
  src: string;
  alt: string;
  to: string;
  className?: string;
}

export function CoverImage({ src, alt, to, className }: CoverImageProps) {
  return (
    <Link to={to}>
      <img src={src} alt={alt} className={className} />
    </Link>
  );
}
