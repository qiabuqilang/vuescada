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
  [types.SHOW_ALERTMY](state, payload) {
    state.showAlertmy = payload.showAlertmy;
  },
  [types.SAVE_PUBLISH_DATA](state, payload) {
    state.publishData = payload.publishData;
  },
  [types.EDITING_DEVICE_TYPE](state, payload) {
    state.deviceType = payload.deviceType;
  },
  [types.EDITING_DEVICE_ID](state, payload) {
    state.deviceId = payload.deviceId;
  },
};
export default mutations;
