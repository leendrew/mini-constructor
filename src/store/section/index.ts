import type { Module } from 'vuex';
import type { RootState } from '../store';
import type { SectionState } from './types';
import { state } from './state';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const section: Module<SectionState, RootState> = {
  state,
  getters,
  actions,
  mutations,
};
