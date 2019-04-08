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
  [types.SAVE_PREVIEW_DATA](state, payload) {
    state.previewData = payload.previewData;
  },
  [types.SHOW_PREVIEW](state, payload) {
    state.showPreview = payload.showPreview;
  },
};
export default mutations;
