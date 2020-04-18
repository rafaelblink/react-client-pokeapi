import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetailPage = (props) => {
  let { id } = useParams();
  console.log(props);
  return <div>Pokemon {id}</div>;
};

export default PokemonDetailPage;
