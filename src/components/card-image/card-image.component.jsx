import React from 'react';
import './card-image.styles.scss';
import axios from 'axios';
import { URL } from './../../API';

class CardImage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      color: '',
    };
  }
  componentDidMount() {
    const { id } = this.props;
    if (id) this.getPokemonColor(id);
  }

  async getPokemonColor(id) {
    try {
      const response = await axios.get(`${URL}/pokemon-species/${id}`);
      const { color } = response.data;
      this.setState({ color: color.name });
    } catch (error) {
      console.log('cor não encontrada');
    }
  }
  render() {
    const { sprite } = this.props;
    const { color } = this.state;

    return (
      <div className='card__image-container'>
        <img
          className={`card__image-container__image  ${color}`}
          src={sprite}
          alt=''
        />
      </div>
    );
  }
}

export default CardImage;
