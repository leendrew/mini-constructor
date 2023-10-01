import type { GetterTree, ActionTree, MutationTree } from 'vuex';
import type { RootState } from '../store';
import type { SectionState } from './types';

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
  ],
};

export const getters: GetterTree<SectionState, RootState> = {};

export const actions: ActionTree<SectionState, RootState> = {};

export const mutations: MutationTree<SectionState> = {};
