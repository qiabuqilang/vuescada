import Vue from 'vue';
import Router from 'vue-router';

import fof from '@/components/fof';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'htbox',
      component: () => import('@/views/htbox/index'),
     
    },
    {
      path: '/show',
      name: 'show',
      component: () => import('@/views/show/show'),
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('@/views/preview/index'),
    },
    {
      path: '/img',
      name: 'imgHouse',
      component: () => import('@/components/imgHouse'),
    },
    {
      path: '*',
      name: 'f0f',
      component: fof,
     
    },
  ],
});
