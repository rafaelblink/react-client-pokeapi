import { Switch, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/home/home.component';
import PokemonDetailPage from './pages/pokemon-detail/pokemon-detail.component';
import PokemonsPage from './pages/pokemons/pokemons.component';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route path='/pokemons' component={PokemonsPage} />
    <Route path='/pokemon-detail/:name' component={PokemonDetailPage} />
    <Route path='/pokemons' component={PokemonDetailPage} />
    <Route path='/item-detail/:name' component={PokemonDetailPage} />
    <Route path='/about-me' component={PokemonDetailPage} />
  </Switch>
);

export default Routes;
