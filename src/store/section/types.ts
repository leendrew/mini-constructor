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

export type SectionTypes = Section['type'];

export type SectionId = Section['id'];

export type SectionData = Section['data'];

export type AddCardPayload = {
  sectionId: SectionId;
  card: SectionCardsData;
};

export type DeleteCardPayload = {
  sectionId: SectionId;
  cardId: SectionCards['id'];
};
