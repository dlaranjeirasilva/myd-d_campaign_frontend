import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return(
    <nav className="navigation">
      <Link className='navigation__item' to='/'>Home</Link>
      <Link className='navigation__item' to='/character'>My Character</Link>
      <Link className='navigation__item' to='/bestiary'>Bestiary</Link>
      <Link className='navigation__item' to='/about'>About</Link>
    </nav>
  )
}

export default Navigation;