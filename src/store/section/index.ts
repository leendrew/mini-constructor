import type { Module } from 'vuex';
import type { RootState } from '../store';
import type { SectionState } from './types';
import { state, getters, actions, mutations } from './module';

export const section: Module<SectionState, RootState> = {
  state,
  getters,
  actions,
  mutations,
};
