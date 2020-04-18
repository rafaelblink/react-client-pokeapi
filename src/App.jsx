// COMPONENTS
import React from 'react';
// IMPORTS
import './App.scss';
import Routes from './Routes';
import Navbar from './components/navbar/navbar.component';

const App = () => (
  <main className='app'>
    <header>
      <Navbar className='app__navbar' />
    </header>
    <div className='app__wrapper'>
      <Routes />
    </div>
  </main>
);

export default App;
