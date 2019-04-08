<template>
    <div class='htbox' ref="htbox">
     <el-dialog
      title="预览"
      :visible.sync="showPreview"
     fullscreen append-to-body center
      >
      <div class="showPreview" ref="showPreview"></div>      
    </el-dialog>

    <img-house class="imgHouse" v-if="showImageHouse"/>
    </div>
</template>
<script>

import { mapMutations, mapState } from "vuex";
import types from '@/store/mutation-types';
import {Message, MessageBox} from 'element-ui';


import { setTimeout } from 'timers';
import imgHouse from '@/components/imgHouse';
export default {
  name: "htbox",
  components:{
    imgHouse
  },
  data() {
    return {    
      showPreview: false,     
      testHtmlNode: new ht.HtmlNode(),   
      htVars: {       
        graphView: "",
        dataModel: "",       
        historyManager: "",
      },     
      view: '',
      deviceType:'c8y_MQTTDevice'
    };
  },
  computed: {
    ...mapState(['showImageHouse'])
  },
  methods: {
    ...mapMutations([
      'm_showImageHouse'
    ]),   

   /**
    * 初始化创建画布
    */
    makeGraph() {
        this.htVars.graphView = window.graphView = new this.$ht.graph.GraphView();     
        this.htVars.dataModel = window.dataModel = this.htVars.graphView.getDataModel();
        this.htVars.historyManager= window.historyManager = new this.$ht.HistoryManager(window.dataModel);
        this.htVars.graphView.adjustHtmlNodeIndex = true;   
        this.view = this.htVars.graphView.getView();
        this.view.className = 'graph' ;
        
        this.htVars.historyManager.clear();
        // this.htVars.graphView.setEditable(true);
        var editInteractor = new ht.graph.XEditInteractor(this.htVars.graphView);
        this.htVars.graphView.setInteractors(new this.$ht.List([
            new ht.graph.ScrollBarInteractor(this.htVars.graphView),
            new ht.graph.SelectInteractor(this.htVars.graphView),
            editInteractor,
            new ht.graph.MoveInteractor(this.htVars.graphView),
            new ht.graph.DefaultInteractor(this.htVars.graphView),
            new ht.graph.TouchInteractor(this.htVars.graphView , {editable: false})//禁用Touch上默认的编辑功能
        ]));
      
        this.htVars.graphView.setEditableFunc(function(data) {  
            if(data.__proto__ === this.testHtmlNode.__proto__){
                return false
            }else{
                return true;
            }
            
        }.bind(this)); 
        let node = new this.$ht.Node();       
       
    },
    

    
    
 
    
 
    /**
     * 绑定window窗口下快捷键
     * 
     */
    bindingWindowKey(){
        window.addEventListener("resize", function(e) {
                mainSplitView.iv();
            });
        window.addEventListener('keydown', function(e) {
            // ctrl + shift + z
            if (ht.Default.isCtrlDown(e) && ht.Default.isShiftDown(e) && e.keyCode === 90) {
                historyManager.redo();
            }
            // ctrl + z
            else if (ht.Default.isCtrlDown(e) && e.keyCode === 90) {
                historyManager.undo();
            }
        });
    },
    
  },

  created() {       
    this.makeGraph();
  },
  mounted() {
      this.$refs.htbox.appendChild(this.view);     
      const that = this;
        window.onresize = function(){
            console.log(document.body.clientWidth,document.body.clientHeight);
            console.log(document.body.scrollHeight,document.body.scrollWidth);
            this.location.reload();
        };       
      this.htVars.graphView.enableFlow();
      this.htVars.graphView.enableDashFlow();
  }
};
</script>
<style scoped lang='scss'>
.htbox{
 
  height: px2rem(780);
  
}
</style>
<style lang="scss">
    .graph{    
      width: 60% !important;
      height: px2rem(780) !important;     
      div{
        z-index: 999 !important;
      }
  }
</style>