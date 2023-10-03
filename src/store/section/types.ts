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

export interface AddCardPayload {
  sectionId: SectionId;
  card: SectionCardsData;
}

export interface DeleteCardPayload {
  sectionId: SectionId;
  cardId: SectionCards['id'];
}

export interface UpdateTextPayload {
  sectionId: SectionId;
  sectionType: SectionText['type'];
  data: SectionTextData;
}

export interface UpdateCardPayload {
  sectionId: SectionId;
  sectionType: SectionCards['type'];
  data: SectionCardsData;
}

export interface UpdatePokemonsPayload {
  sectionId: SectionId;
  sectionType: SectionPokemons['type'];
  data: SectionPokemonsData[];
}

export type UpdateSectionPayload = UpdateTextPayload | UpdateCardPayload | UpdatePokemonsPayload;

export interface FetchManyPokemonsResult {
  count: number;
  next: string | null;
  previous: string | null;
  result: { name: string; url: string }[];
}

export interface FetchSinglePokemonResult {
  id: number;
  name: string;
  sprites: { front_default: string };
}
