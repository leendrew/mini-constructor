import { generateNumberId } from '@/utils';
import type { GetterTree, ActionTree, MutationTree } from 'vuex';
import type { RootState } from '../store';
import type { Section, SectionState } from './types';

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
  async addNewSection({ commit }, sectionType: 'text' | 'cards' | 'pokemons') {
    const sectionDataMap = {
      text: { title: '', description: '' },
      cards: [],
      pokemons: [],
    };
    const sectionId = generateNumberId();
    const sectionData = sectionDataMap[sectionType];
    const newSection = {
      id: sectionId,
      type: sectionType,
      data: sectionData,
    };
    commit('addSection', newSection);
  },
};

export const mutations: MutationTree<SectionState> = {
  addSection(state, newSection: Section) {
    state.sections.push(newSection);
  },
};
