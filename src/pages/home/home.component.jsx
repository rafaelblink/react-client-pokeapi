import React from 'react';
import './home.component.scss';

class HomePage extends React.Component {
  render() {
    return (
      <div className='home container'>
        <h1>Be welcome!</h1>
        <p>This is a little application that consume a Pokemon`s API</p>
        <p>You can go to pokemons page through the navbar on top page.</p>
        <br />
        <p>For more details about the pokemon, just click it on card.</p>
      </div>
    );
  }
}

export default HomePage;
