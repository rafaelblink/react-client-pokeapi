import React from 'react';
import './card.styles.scss';
import { ReactComponent as FireIcon } from './../../assets/img/fire-solid.svg';

import CardImage from './../card-image/card-image.component';

const Card = ({ pokemon }) => {
  const { id, name, weight, height, sprites } = pokemon;
  // GETTING POKEMON'S HP
  const { base_stat } = pokemon.stats.find(
    async (stat) => stat.stat.name === 'hp'
  );

  return (
    <div className='card'>
      <div className='card__hp'>
        <FireIcon className='card__hp__icon' />
        <span className='card__hp__amount'>{base_stat}</span>
        <span className='card__hp__name'>HP</span>
      </div>
      <CardImage id={id} sprite={sprites.front_default} />
      <h2 className='card__title'>{name}</h2>
      <span className='card__separator'></span>
      <div className='card__data'>
        <div className='card__data__column'>
          <h2 className='card__data__column__title'>{height / 10}</h2>
          <p className='card__data__column__name'>Metres</p>
        </div>
        <div className='card__data__column'>
          <h2 className='card__data__column__title'>{weight / 10}</h2>
          <p className='card__data__column__name'>KG</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
