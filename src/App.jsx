// COMPONENTS
import React from 'react';
import Header from './components/header/header.component';
// IMPORTS
import './App.scss';
import Routes from './Routes';

const App = () => (
  <div className='app'>
    <Header className='app__header' />
    <div className='app__wrapper'>
      <Routes />
    </div>
  </div>
);

export default App;
