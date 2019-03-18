import htstate from './htstate';
import htgetters from './htgetters';
import htactions from './htactions';
import htmutations from './htmutations';

const ht = {
  state: htstate,
  getters: htgetters,
  actions: htactions,
  mutations: htmutations,
};

export default ht;
