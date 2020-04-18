import React from 'react';
import axios from 'axios';
import Card from './../../components/card/card.component';
import './pokemons.styles.scss';

class PokemonsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      error: null,
      pokemons: [],
    };
  }
  componentDidMount() {
    this.request();
  }

  async request() {
    try {
      const pokemonAllRequest = await this.getPokemonList(0, 12);
      const pokemonDetailArray = await pokemonAllRequest.data.results.map(
        async ({ name }) => (await this.getPokemonDetail(name)).data
      );
      await Promise.all(pokemonDetailArray).then(
        (pokemonsResult) => {
          this.setState({
            pokemons: pokemonsResult,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            error,
            isLoaded: false,
          });
        }
      );
    } catch (error) {
      this.setState({
        error,
        isLoaded: false,
      });
    }
  }

  async getPokemonList(offset, limit) {
    return axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
  }

  async getPokemonDetail(name) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  render() {
    let { pokemons, isLoaded, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='pokemon-wrapper'>
          <div className='pokemon-wrapper__list'>
            {pokemons.map((pokemon) => (
              <Card key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default PokemonsPage;
