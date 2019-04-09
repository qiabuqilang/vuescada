<template>
  <div class="preview" ref="preview"></div>
</template>
<script>
import scada from "@/api/scada";
import { mapState, mapMutations } from "vuex";
import scadaConfig from '@/config/scada';
export default {
  name: "preview",
  data() {
    return {
      deviceType: "c8y_MQTTDevice",
      deviceId: '166143',
      data: "",
      viewPreview: "",
      
    };
  },
  computed: {
    ...mapState(["previewData"])
  },
  methods: {
    previewGraph() {
      console.log("previewData is ", this.previewData);
      let dataModel = new ht.DataModel(),
        graphView = new ht.graph.GraphView(dataModel);
      this.viewPreview = graphView.getView();
      this.viewPreview.className = "viewPreview";
      dataModel.deserialize(this.data);
      graphView.setZoomable(false);
      graphView.enableFlow();
      graphView.enableDashFlow();
      graphView.setDisabled(true);
    },
    
   
  },
  created() {   
    this.previewGraph();
  
  },
  mounted() {
    console.log("routes query", this.$route.query);
    this.$refs.preview.appendChild(this.viewPreview);
  },
  destroyed() {
    this.ws.close();
  }
};
</script>
<style scoped lang='scss'>
.preview {
  width: 100%;
  height: px2rem(500);
 
}
</style>
<style lang="scss">
.viewPreview {
  width: 90%;
  height: 80%;
  div {
    background: none !important;
  }
}
</style>