import type { ActionTree } from 'vuex';
import type { GlobalState } from './types';
import type { RootState } from '../store';

export const actions: ActionTree<GlobalState, RootState> = {
  async toggleIsEditing({ commit, state }) {
    commit('setIsEditing', !state.isEditing);
  },
};
