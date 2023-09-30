import type { MutationTree } from 'vuex';
import type { GlobalState } from './state';

export const mutations: MutationTree<GlobalState> = {
  setIsEditing(state) {
    state.isEditing = !state.isEditing;
  },
};
