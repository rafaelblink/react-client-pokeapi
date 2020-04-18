import React from 'react';
import './card.styles.scss';
const Card = ({ pokemon, ...otherProps }) => {
  return (
    <div className='card'>
      <div className='card__image-container'>
        <img src={pokemon.sprites.front_default} alt='' />
      </div>
      <h2 className='card__title'>{pokemon.name}</h2>
    </div>
  );
};

export default Card;
