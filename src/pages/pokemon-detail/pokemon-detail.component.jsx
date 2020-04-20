import React from 'react';
import axios from 'axios';
import CardImage from '../../components/card-image/card-image.component';
import './pokemon-detail.styles.scss';
import { URL } from './../../API';

class PokemonDetailPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      error: null,
      pokemon: null,
      abilities: [],
      forms: [],
    };
  }
  async getPokemonDetail(name) {
    return axios.get(`${URL}/pokemon/${name}`);
  }

  setError(error) {
    this.setState({
      isLoaded: true,
      error,
    });
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
        async ({ ability }) => (await axios.get(ability.url)).data
      );

      const pokemonFormsArray = await pokemonRequest.data.forms.map(
        async ({ url }) => (await axios.get(url)).data
      );

      const promisesAbilities = Promise.all(pokemonAbilitiesArray);
      const promisesForms = Promise.all(pokemonFormsArray);

      Promise.all([promisesAbilities, promisesForms]).then(
        (result) => {
          this.setState({
            abilities: result[0],
            forms: result[1],
          });
        },
        (error) => {
          this.setError(error);
        }
      );
      this.setState({ pokemon: pokemonRequest.data, isLoaded: true });
    } catch (error) {
      this.setError(error);
    }
  }
  render() {
    let { pokemon, forms, abilities, isLoaded, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const { id, sprites, name } = pokemon;
      return (
        <div className='pokemon-detail'>
          <div className='pokemon-detail-wrapper'>
            <div className='pokemon-detail-wrapper__column'>
              <CardImage id={id} sprite={sprites.front_default} />
              <h1 className='pokemon-detail-wrapper__column__title'>{name}</h1>
            </div>
            <div className='pokemon-detail-wrapper__column details'>
              <h2>Abilities</h2>
              <ul className='pokemon-detail-wrapper__column__abilities'>
                {abilities.map((ability) => {
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
          <div className='pokemon-detail-describe container'>
            <h2 className='pokemon-detail-describe__title'>Forms</h2>
            {forms.map((form) => (
              <p key='form.id'>{form.version_group.name}</p>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default PokemonDetailPage;
