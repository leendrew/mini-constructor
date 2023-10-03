import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { global } from './global';
import { section } from './section';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export type RootState = {};

export const store = new Vuex.Store({
  modules: {
    global,
    section,
  },
  plugins: [vuexLocalStorage.plugin],
});
