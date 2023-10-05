import { pokemonsApi } from '@/api';
import { generateNumberId } from '@/utils';
import type { GetterTree, ActionTree, MutationTree } from 'vuex';
import type { RootState } from '../store';
import type {
  Section,
  SectionState,
  SectionTypes,
  SectionData,
  SectionId,
  SectionText,
  SectionCards,
  SectionPokemons,
  AddCardPayload,
  DeleteDataPayload,
  UpdateSectionPayload,
  UpdateTextPayload,
  UpdateCardPayload,
  UpdateAllCardsPayload,
  UpdatePokemonsPayload,
  UpdateAllPokemonsPayload,
} from './types';

export const state: SectionState = {
  sections: [],
};

export const getters: GetterTree<SectionState, RootState> = {};

export const actions: ActionTree<SectionState, RootState> = {
  async addNewSection({ commit }, sectionType: SectionTypes) {
    const sectionDataMap: Record<SectionTypes, SectionData> = {
      text: { title: 'Sample Title', description: 'Sample Description' },
      cards: [
        {
          id: generateNumberId(),
          icon: 'mdi-bookmark-outline',
          title: 'Sample Card Title',
          description: 'Sample Card Description',
        },
      ],
      pokemons: [],
    };
    const newSectionId = generateNumberId();
    const newSectionData = sectionDataMap[sectionType];
    const newSection = {
      id: newSectionId,
      type: sectionType,
      data: newSectionData,
    };
    commit('addSection', newSection);
    if (sectionType === 'pokemons') {
      const pokemonsSectionData = await pokemonsApi.fetchPokemons();
      commit('updatePokemons', {
        sectionId: newSectionId,
        sectionType: sectionType,
        data: pokemonsSectionData,
      });
    }
  },
  deleteSectionById({ commit }, sectionId: SectionId) {
    commit('deleteById', sectionId);
  },
  addCard({ commit }, payload: AddCardPayload) {
    commit('addCard', payload);
  },
  deleteDataById({ commit }, payload: DeleteDataPayload) {
    commit('deleteDataById', payload);
  },
  updateSection({ commit }, payload: UpdateSectionPayload) {
    switch (payload.sectionType) {
      case 'text':
        commit('updateText', payload);
        break;
      case 'cards':
        commit('updateCard', payload);
        break;
      case 'pokemons':
        commit('updatePokemons', payload);
        break;
      default:
        return;
    }
  },
  updateAllSections({ commit }, payload: Section[]) {
    commit('setSections', payload);
  },
  updateAllCards({ commit }, payload: UpdateAllCardsPayload) {
    commit('setCards', payload);
  },
  updateAllPokemons({ commit }, payload: UpdateAllPokemonsPayload) {
    commit('setPokemons', payload);
  },
};

export const mutations: MutationTree<SectionState> = {
  setSections(state, payload: Section[]) {
    state.sections = [...payload];
  },
  addSection(state, newSection: Section) {
    state.sections.push({ ...newSection });
  },
  deleteById(state, sectionId: SectionId) {
    state.sections = state.sections.filter((section) => section.id !== sectionId);
  },
  addCard(state, payload: AddCardPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        (section as SectionCards).data.push({ ...payload.card });
      }
    });
  },
  deleteDataById(state, payload: DeleteDataPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        // @ts-expect-error
        section.data = section.data.filter((data) => data.id !== payload.dataId);
      }
    });
  },
  updateText(state, payload: UpdateTextPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        (section as SectionText).data = { ...payload.data };
      }
    });
  },
  updateCard(state, payload: UpdateCardPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        section.data = (section as SectionCards).data.map((card) => {
          if (card.id === payload.data.id) {
            return { ...payload.data };
          }
          return card;
        });
      }
    });
  },
  setCards(state, payload: UpdateAllCardsPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        section.data = [...payload.data];
      }
    });
  },
  updatePokemons(state, payload: UpdatePokemonsPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        (section as SectionPokemons).data.push(...payload.data);
      }
    });
  },
  setPokemons(state, payload: UpdateAllPokemonsPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        section.data = [...payload.data];
      }
    });
  },
};
