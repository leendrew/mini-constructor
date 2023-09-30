import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    test: {
      state: {
        foo: 'foo',
      },
    },
  },
});
