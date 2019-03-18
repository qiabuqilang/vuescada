import Vue from 'vue';
import Vuex from 'vuex';
import ht from './modules/ht';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    ht,
  },
  strict: debug,

});
