import type { MutationTree } from 'vuex';
import type { GlobalState } from './types';

export const mutations: MutationTree<GlobalState> = {
  setIsOnEditMod(state, newValue: boolean) {
    state.isOnEditMod = newValue;
  },
};
