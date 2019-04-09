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
      dataModel:'',
      graphView:''
    };
  },
  computed: {
    ...mapState(["previewData"])
  },
  methods: {
    previewGraph() {    
      this.dataModel = Object.assign(window.dataModel,{});
      this.graphView = new ht.graph.GraphView(this.dataModel);  
      this.viewPreview = this.graphView.getView();
      this.viewPreview.className = "viewPreview"; 
      this.data = this.dataModel.getDatas();   
      console.log('this.data',this.data,this.dataModel,this.graphView);
   
 
  },
  },
  created() {   
    this.previewGraph();
  
  },
  mounted() {
    console.log("routes query", this.$route.query);
    this.$refs.preview.appendChild(this.viewPreview);
    this.graphView.setZoomable(false);
    this.graphView.enableFlow();
    this.graphView.enableDashFlow();
    this.graphView.setDisabled(true);
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