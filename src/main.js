// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'reset-css/reset.css';
// ht------------
import 'lib/core/ht';
import 'lib/plugin/ht-cssanimation';
import 'lib/plugin/ht-palette';
import 'lib/plugin/ht-form';
import 'lib/plugin/ht-xeditinteractor';
import 'lib/plugin/ht-historymanager';
import 'lib/plugin/ht-contextmenu';
import 'lib/plugin/ht-dashflow';
import 'lib/plugin/ht-flow';
import 'lib/plugin/ht-autolayout';
import 'lib/plugin/ht-dialog';
import 'lib/plugin/ht-htmlnode';
import 'lib/plugin/ht-panel';
// ht------------
import $ from 'jquery';
import mixins from '@/mixins';
import store from './store';
import App from './App';
import router from './router';
import '../static/scss/public.scss';

Vue.use(ElementUI);
Vue.mixin(mixins);
Vue.config.productionTip = false;


Vue.prototype.$ht = window.ht;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  
  store,
  components: { App },
  template: '<App/>',
 
});
