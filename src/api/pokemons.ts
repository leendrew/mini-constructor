import axios from 'axios';
import type { SectionPokemonsData } from '@/store';

export interface FetchManyPokemonsResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface FetchSinglePokemonResult {
  id: number;
  name: string;
  sprites: { front_default: string };
}

const URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemons = async (limit = 5, offset = 0): Promise<SectionPokemonsData[]> => {
  const manyPokemonsRes = await axios.get<FetchManyPokemonsResult>(URL, {
    params: {
      limit,
      offset,
    },
  });

  const singlePokemonsPromises = manyPokemonsRes.data.results.map((pokemon) =>
    axios.get<FetchSinglePokemonResult>(pokemon.url),
  );

  const allPokemons = await Promise.all(singlePokemonsPromises);

  return allPokemons.map(({ data }) => ({
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.front_default,
  }));
};
