// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import { dialog, Button, Message, Row, Col, Tabs, TabPane, Radio, RadioButton, RadioGroup, ColorPicker } from 'element-ui';
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
import 'lib/plugin/ht-live';

import 'lib/js/GridPainter';
// ht------------
import 'hotcss';
import store from './store';
import App from './App';
import router from './router';
import '../static/scss/public.scss';


Vue.config.productionTip = false;
Vue.component(dialog.name, dialog);
Vue.component(Button.name, Button);
Vue.component(Message.name, Message);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Radio.name, Radio);
Vue.component(RadioButton.name, RadioButton);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(ColorPicker.name, ColorPicker);

Vue.prototype.$ht = window.ht;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  
  store,
  components: { App },
  template: '<App/>',
 
});
