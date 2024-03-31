import Navigation from "../Navigation/Navigation";
import logo from '../../images/logo.png';
import './Header.css';

function Header() {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo do site 'My DandD Campaign'"
        className="header__logo"
      />
      <div className="header-auth">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;