import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <>
      <img id="cpc-logo" src="/images/cpc_logo.png" alt="Logo Cité Poisson-Chair" />

      <Link to="/">
        <div id="cpc"><b>Cité Poisson-Chair</b></div>
      </Link>

      <Link to="/prestations">
        <div id="prestations">Prestations</div>
      </Link>

      <Link to="/buddy-1">
        <div id="buddy"></div>
      </Link>

      <Link to="/">
        <div id="illustrations"></div>
      </Link>

      <Link to="/">
        <div id="sculptures"></div>
      </Link>
    </>
  );
}
