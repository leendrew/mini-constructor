import axios from 'axios';
import type { FetchManyPokemonsResult, FetchSinglePokemonResult } from '@/store';

const URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemons = async (limit = 5, offset = 0) => {
  const manyPokemonsRes = await axios.get<FetchManyPokemonsResult>(URL, {
    params: {
      limit,
      offset,
    },
  });
  console.log('fetch res', manyPokemonsRes);

  const singlePokemonPromise = manyPokemonsRes.data.result.map((pokemon) =>
    axios.get<FetchSinglePokemonResult>(pokemon.url),
  );

  const allPokemons = await Promise.all(singlePokemonPromise);

  return allPokemons.map(({ data }) => ({
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.front_default,
  }));
};
