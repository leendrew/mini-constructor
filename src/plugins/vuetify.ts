import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
