import React from 'react';
import axios from 'axios';
import Card from './../../components/card/card.component';
import './pokemons.styles.scss';
import { Link } from 'react-router-dom';
import Button from '../../components/button/button.component';
import { URL } from './../../API';
class PokemonsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      error: null,
      pokemons: [],
      quantityPage: 4,
      skip: 0,
      currentPage: 0,
    };
  }
  componentDidMount() {
    this.setState({ currentPage: 1 });
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
      Promise.all(pokemonDetailArray).then(
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
    return axios.get(`${URL}/pokemon?offset=${offset}&limit=${limit}`);
  }

  async getPokemonDetail(name) {
    return axios.get(`${URL}/pokemon/${name}`);
  }

  handlePaginationNext = () => {
    let { currentPage, quantityPage, skip } = this.state;
    skip = skip + quantityPage;
    currentPage++;
    this.setState({
      skip,
      currentPage,
    });
    this.request(this.state.quantityPage, skip);
  };

  handlePaginationBack = () => {
    let { currentPage, quantityPage, skip } = this.state;
    skip = skip - quantityPage;
    currentPage--;
    this.setState({
      skip,
      currentPage,
    });
    this.request(this.state.quantityPage, skip);
  };

  render() {
    let { pokemons, isLoaded, error } = this.state;
    if (error) {
      return <div className='container'>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className='container'>Loading...</div>;
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
          <div className='pokemon-wrapper__pagination'>
            <Button
              title='Back'
              disabled={this.state.currentPage === 1}
              onClick={this.handlePaginationBack}
            />
            <Button title='Next' onClick={this.handlePaginationNext} />
          </div>
        </div>
      );
    }
  }
}

export default PokemonsPage;
