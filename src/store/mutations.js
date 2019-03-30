import types from './mutation-types';

const mutations = {
  [types.SHOW_IMG_HOUSE](state, payload) {
    state.showImageHouse = payload.show;
  },
  [types.EDITING_NODE_ID](state, payload) {
    state.editingNodeId = payload.id;
  },
  [types.GRAPH_VIEW](state, payload) {
    state.graphView = payload.graphView;
  },
};
export default mutations;
