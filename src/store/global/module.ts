import type { GetterTree, ActionTree, MutationTree } from 'vuex';
import type { RootState } from '../store';
import type { GlobalState } from './types';

export const state: GlobalState = {
  isOnEditMod: false,
};

export const getters: GetterTree<GlobalState, RootState> = {};

export const actions: ActionTree<GlobalState, RootState> = {
  async toggleIsOnEditMod({ commit, state }) {
    commit('setIsOnEditMod', !state.isOnEditMod);
  },
};

export const mutations: MutationTree<GlobalState> = {
  setIsOnEditMod(state, newValue: boolean) {
    state.isOnEditMod = newValue;
  },
};
