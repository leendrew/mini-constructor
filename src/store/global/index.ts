import type { Module } from 'vuex';
import type { RootState } from '../store';
import { state, type GlobalState } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const global: Module<GlobalState, RootState> = {
  state,
  getters,
  actions,
  mutations,
};
