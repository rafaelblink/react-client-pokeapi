import React from 'react';
import axios from 'axios';
import CardImage from '../../components/card-image/card-image.component';
import './pokemon-detail.styles.scss';

class PokemonDetailPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      error: null,
      pokemon: null,
      abilities: [],
    };
  }
  async getPokemonDetail(name) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  async getPokemonAbilities(url) {
    return await axios.get(url);
  }

  componentDidMount() {
    this.request();
  }

  async request() {
    try {
      const pokemonRequest = await this.getPokemonDetail(
        this.props.match.params.name
      );
      const pokemonAbilitiesArray = await pokemonRequest.data.abilities.map(
        async ({ ability }) =>
          await (await this.getPokemonAbilities(ability.url)).data
      );
      Promise.all(pokemonAbilitiesArray).then((response) => {
        this.setState({
          abilities: response,
          isLoaded: true,
        });
      });
      this.setState({ pokemon: pokemonRequest.data, isLoaded: true });
    } catch (error) {}
  }
  render() {
    let { pokemon, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const { id, sprites, name } = pokemon;
      return (
        <div className='pokemon-detail-wrapper'>
          <div className='pokemon-detail-wrapper__column'>
            <CardImage id={id} sprite={sprites.front_default} />
            <h1 className='pokemon-detail-wrapper__column__title'>{name}</h1>
          </div>
          <div className='pokemon-detail-wrapper__column details'>
            <h2>Abilities</h2>

            <ul>
              {this.state.abilities.map((ability) => {
                const { name } = ability.names.find(
                  (nameObj) => nameObj.language.name === 'en'
                );
                const effect = ability.effect_entries.map(
                  (effectObj) => effectObj.effect
                );

                return (
                  <li key={ability.id}>
                    <h2>{name}</h2>
                    <p>{effect}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default PokemonDetailPage;
