import type { GetterTree } from 'vuex';
import type { GlobalState } from './state';
import type { RootState } from '../store';

export const getters: GetterTree<GlobalState, RootState> = {
  isEditing: (state) => state.isEditing,
};
