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
  icon: string;
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
  name: string;
  imageUrl: string;
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

export interface DeleteDataPayload {
  sectionId: SectionId;
  dataId: SectionCards['id'] | SectionPokemons['id'];
}

export interface AddCardPayload {
  sectionId: SectionId;
  sectionType: SectionCards['type'];
  data: SectionCards['data'];
}

export interface AddPokemonsPayload {
  sectionId: SectionId;
  sectionType: SectionPokemons['type'];
  data: SectionPokemons['data'];
}

export type AddDataPayload = AddCardPayload | AddPokemonsPayload;

export interface UpdateTextPayload {
  sectionId: SectionId;
  sectionType: SectionText['type'];
  data: SectionTextData;
}

export interface UpdateAllCardsPayload {
  sectionId: SectionId;
  sectionType: SectionCards['type'];
  data: SectionCardsData[];
}

export interface UpdateSingleCardPayload {
  sectionId: SectionId;
  sectionType: SectionCards['type'];
  data: SectionCardsData;
}

export type UpdateCardsPayload = UpdateSingleCardPayload | UpdateAllCardsPayload;

export interface UpdatePokemonsPayload {
  sectionId: SectionId;
  sectionType: SectionPokemons['type'];
  data: SectionPokemonsData[];
}

export type UpdateDataPayload = UpdateTextPayload | UpdateCardsPayload | UpdatePokemonsPayload;

export type UpdateSingleArrayData = UpdateSingleCardPayload;

export type UpdateAllArrayData = UpdateAllCardsPayload | UpdatePokemonsPayload;

export type UpdateObjectData = UpdateTextPayload;

// DND Specific

interface AddDnDEvent<T> {
  added: {
    element: T;
    newIndex: number;
  };
}

interface RemoveDnDEvent<T> {
  removed: {
    element: T;
    oldIndex: number;
  };
}

interface MoveDnDEvent<T> {
  moved: {
    element: T;
    oldIndex: number;
    newIndex: number;
  };
}

export type ChangeDnDEvent<T> = AddDnDEvent<T> | RemoveDnDEvent<T> | MoveDnDEvent<T>;
