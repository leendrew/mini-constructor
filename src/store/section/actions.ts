import type { ActionTree } from 'vuex';
import type { SectionState } from './types';
import type { RootState } from '../store';

export const actions: ActionTree<SectionState, RootState> = {
  async toggleIsEditing({ commit, state }) {
    // commit('setIsEditing', !state.isEditing);
  },
};
