import type { Module } from 'vuex';
import type { RootState } from '../store';
import type { GlobalState } from './types';
import { state, getters, actions, mutations } from './module';

export const global: Module<GlobalState, RootState> = {
  state,
  getters,
  actions,
  mutations,
};
