import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/">
      <img id="logo" src="/images/cpc_logo.png" alt="CPC Logo" />
    </Link>
  );
}
