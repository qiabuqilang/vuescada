

export default {
 
  paletteMutation(state, htobj) {
    console.log('palette mutations is running', htobj);
    state.palette = htobj;
  },
  
  graphViewMutation(state, htobj) {
    state.graphView = htobj;
  },

  dataModelMutation(state, htobj) {
    state.dataModel = htobj;
  },

  listMutation(state, htobj) {
    state.list = htobj;
  },

  treeMutation(state, htobj) {
    state.tree = htobj;
  },

  properViewMutation(state, htobj) {
    state.properView = htobj;
  },

  toolbarMutation(state, htobj) {
    state.toolbar = htobj;
  },
}
;
