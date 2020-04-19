import React from 'react';
import axios from 'axios';
import Card from './../../components/card/card.component';
import './pokemons.styles.scss';
import { Link } from 'react-router-dom';

class PokemonsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      error: null,
      pokemons: [],
      quantityPage: 8,
      skip: 0,
    };
  }
  componentDidMount() {
    this.request(this.state.quantityPage, this.state.skip);
  }

  async request(quantityPage, skip) {
    try {
      this.setState({
        isLoaded: false,
      });
      const pokemonAllRequest = await this.getPokemonList(skip, quantityPage);
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
        <div className='pokemon-wrapper container'>
          <div className='pokemon-wrapper__list'>
            {pokemons.map((pokemon) => (
              <Link key={pokemon.name} to={`/pokemons/${pokemon.name}`}>
                <Card pokemon={pokemon} />
              </Link>
            ))}
          </div>
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </div>
      );
    }
  }
}

export default PokemonsPage;
