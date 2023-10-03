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
  DeleteCardPayload,
  UpdateSectionPayload,
  UpdateTextPayload,
  UpdateCardPayload,
  UpdatePokemonsPayload,
} from './types';

export const state: SectionState = {
  sections: [
    {
      id: 0,
      type: 'text',
      data: {
        title: 'Title',
        description: 'description',
      },
    },
    {
      id: 1,
      type: 'cards',
      data: [
        {
          id: 0,
          title: 'card 1',
          description: 'description of card 1',
        },
        {
          id: 1,
          title: 'card 2',
          description: 'description of card 2',
        },
      ],
    },
    {
      id: 2,
      type: 'text',
      data: {
        title: '',
        description: '',
      },
    },
    {
      id: 3,
      type: 'cards',
      data: [],
    },
    {
      id: 4,
      type: 'pokemons',
      data: [],
    },
  ],
};

export const getters: GetterTree<SectionState, RootState> = {};

export const actions: ActionTree<SectionState, RootState> = {
  addNewSection({ commit }, sectionType: SectionTypes) {
    const sectionDataMap: Record<SectionTypes, SectionData> = {
      text: { title: '', description: '' },
      cards: [],
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
  },
  deleteSectionById({ commit }, sectionId: SectionId) {
    commit('deleteById', sectionId);
  },
  addCard({ commit }, payload: AddCardPayload) {
    commit('addCard', payload);
  },
  deleteCardById({ commit }, payload: DeleteCardPayload) {
    commit('deleteCardById', payload);
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
};

export const mutations: MutationTree<SectionState> = {
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
  deleteCardById(state, payload: DeleteCardPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        (section as SectionCards).data = (section as SectionCards).data.filter(
          (data) => data.id !== payload.cardId,
        );
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
  updatePokemons(state, payload: UpdatePokemonsPayload) {
    state.sections.forEach((section) => {
      if (section.id === payload.sectionId) {
        (section as SectionPokemons).data.concat([...payload.data]);
      }
    });
  },
};
