import React from 'react';

import './navbar.styles.scss';

import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className='navbar'>
    <div className='navbar__divider'>
      <Link to='/' className='navbar__link navbar__link--home'>
        Home Page
      </Link>
    </div>
    <div className='navbar__divider'>
      <Link to='/pokemons' className='navbar__link'>
        Pokemons
      </Link>
      <Link to='/about' className='navbar__link'>
        About Me
      </Link>
    </div>
  </nav>
);

export default Navbar;
