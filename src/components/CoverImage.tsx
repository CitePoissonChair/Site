import { Link } from 'react-router-dom';

interface CoverImageProps {
  src: string;
  alt: string;
  to: string;
  id?: string;
}

export function CoverImage({ src, alt, to, id }: CoverImageProps) {
  return (
    <Link to={to}>
      <img id={id} src={src} alt={alt} />
    </Link>
  );
}
