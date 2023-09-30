import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});
