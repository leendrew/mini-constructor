export interface SectionTextData {
  title: string;
  description: string;
}

export interface SectionText {
  id: number;
  type: 'text';
  data: SectionTextData;
}

export interface SectionCardsData {
  id: number;
  title: string;
  description: string;
}

export interface SectionCards {
  id: number;
  type: 'cards';
  data: SectionCardsData[];
}

export interface SectionPokemonsData {
  id: number;
  title: string;
  description: string;
}

export interface SectionPokemons {
  id: number;
  type: 'pokemons';
  data: SectionPokemonsData[];
}

export type Section = SectionText | SectionCards | SectionPokemons;

export interface SectionState {
  sections: Section[];
}
