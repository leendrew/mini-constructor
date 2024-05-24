import axios from 'axios';
import type { SectionPokemonsData } from '@/store';

export interface GetManyPokemonsResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface GetSinglePokemonResult {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

const URL = 'https://pokeapi.co/api/v2/pokemon';

export const pokemonsApi = {
  async fetchPokemons(limit = 5, offset = 0): Promise<SectionPokemonsData[]> {
    const manyPokemonsResult = await axios.get<GetManyPokemonsResult>(URL, {
      params: {
        limit,
        offset,
      },
    });

    const singlePokemonsPromises = manyPokemonsResult.data.results.map((pokemon) =>
      axios.get<GetSinglePokemonResult>(pokemon.url),
    );

    const allPokemons = await Promise.all(singlePokemonsPromises);

    return allPokemons.map(({ data }) => ({
      id: data.id,
      name: data.name,
      imageUrl: data.sprites.front_default,
    }));
  },
};
