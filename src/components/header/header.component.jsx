import React from 'react';

import './header.styles.scss';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className='header'>
    <div className='header__divider'>
      <Link to='/' className='header__link header__link--home'>
        Home Page
      </Link>
    </div>
    <div className='header__divider'>
      <Link to='/pokemons' className='header__link'>
        Pokemons
      </Link>
      <Link to='/items' className='header__link'>
        Items
      </Link>
      <Link to='/about-me' className='header__link'>
        About Me
      </Link>
    </div>
  </header>
);

export default Header;
