<template>
    <div class='htbox' ref="htbox">
     <el-dialog
      title="预览"
      :visible.sync="showPreview"
     fullscreen append-to-body center
      >
      <div class="showPreview" ref="showPreview"></div>
    </el-dialog>
    </div>
</template>
<script>

import { mapMutations, mapState } from "vuex";
import {Message, MessageBox} from 'element-ui';
import device from '@/api/device';
import scada from '@/api/scada';
import { setTimeout } from 'timers';
export default {
  name: "htbox",
 
  data() {
    return {
      showPreview: false,
      toolbarItems: [
        {
          icon: "zoomIn",
          label: "放大",
          action: function() {
              console.log(this);
            this.htVars.graphView.zoomIn(true);
          }.bind(this)
        },
        {
          icon: "zoomOut",
          label: "缩小",
          action: function() {
            this.htVars.graphView.zoomOut(true);
          }.bind(this)
        },
        {
          icon: "fitContent",
          label: "适应",
          action: function() {
            this.htVars.graphView.fitContent(true);
          }.bind(this)
        },
        
        "separator",
        {
          label: "预览",
          action: function() {          
             this.showPreview = true;
              setTimeout(()=>{
                let dataModel = new ht.DataModel(),
                graphView = new ht.graph.GraphView(dataModel),
                view = graphView.getView();
                this.viewStyle(view);
                this.$refs.showPreview.appendChild(view);
             
                dataModel.deserialize(this.htVars.dataModel.serialize());
                graphView.enableFlow();
                graphView.enableDashFlow();
                graphView.setDisabled(true);
           
              },1000)
          
          }.bind(this)
        },
        {
          label: "保存",
          action: function() {
            console.log(scada);
            let data = { 
              type:'saveScada',
              scadaString: JSON.stringify(this.htVars.dataModel.serialize()),
              deviceType: this.deviceType
              }
            scada.saveScada('/inventory/managedObjects','',data).then(res=>{
              console.log(res);
              if(res.data.id>0){
                Message({
                  message: '保存成功',
                  type: 'success'
                })
              }else{
                Message({
                  message: '保存失败',
                  type: 'error'
                })
              }
            })
          }.bind(this)
        },
        {
          label: "真实使用",
          action: function() {
            this.$router.push({
              path: '/preview'
            })
          }.bind(this)
        }
      ],
      shapes : ['rect', 'circle', 'oval', 'roundRect', 'star', 'triangle', 'hexagon', 'pentagon', 'diamond', 'rightTriangle', 'parallelogram', 'trapezoid'],
      htVars: {
        palette: "",
        graphView: "",
        dataModel: "",
        list: "",
        tree: "",
        properView: "",
        toolbar: "",
        historyManager: "",
        tabViewEvent:'',
        tabViewProperty: ''
      },
      splitView: {
        left: "",
        right: "",
        up: "",
        down: ""
      },
      view: '',
      supportedMeasurements: {
          id: '',
          name:''
      },
      node: {
        position: {
          x:'',
          y:''
        }
      },
      deviceType:'c8y_MQTTDevice'
    };
  },
  computed: {
    ...mapState({ htstate: "ht" })
  },
  methods: {
    ...mapMutations([
      "paletteMutation",
      "graphViewMutation",
      "dataModelMutation",
      "listMutation",
      "treeMutation",
      "properViewMutation",
      "toolbarMutation"
    ]),
   
    initformPane(){
      let div = document.createElement('div');
      div.innerHTML = '名称';
      div.style.paddingBottom = "5px";
      div.style.borderBottom = "1px solid solid";
      this.htVars.formPane.addRow([div], [0.1]); 
      const that = this;     
       this.htVars.formPane.addRow([
                    '位置',
                    {
                        id: 'positionX',
                        textField: {                           
                            type: 'number',
                            value: `${that.node.position.x}`
                        }
                    },                   
                    {
                        id: 'positionY',
                        textField: {                          
                            type: 'number'
                        }
                    }
                ],
                [50, 80, 80]);     
          this.htVars.formPane.addRow([
                    '大小',
                    {
                        id: 'sizeW',
                        textField: {
                           
                            type: 'number'
                        }
                    },                   
                    {
                        id: 'sizeY',
                        textField: {
                            text: 'ht for web',
                            type: 'number'
                        }
                    }
                ],
                [50, 80, 80]);     
    },
    /**
     * 方法说明
     * @method 方法名
     * @for 所属类名
     * @param {参数类型} 参数名 参数说明
     * @return {返回值类型} 返回值说明
     */
    initformPaneEvent(){

    },
   
  initTab(){
    
// create view
        var div = document.createElement('div');
        // create tab
        let properTab = new ht.Tab();
        properTab.setName('属性');
        properTab.setView(this.htVars.properView);

        let eventTab = new ht.Tab();
        eventTab.setName('事件');
        eventTab.setView(this.htVars.properView);
        
        // add to model
        let tabModel = this.htVars.tabView.getTabModel();
        tabModel.add(properTab);
        tabModel.add(eventTab);
        /* if(selected){
            this.htVars.tabModel.getSelectionModel().setSelection(tab);
        } */
     }, 
   initProperView(){
         this.htVars.properView.addProperties([{
                    name: 'name',
                    editable: true
                }, {
                    name: 'label.background',
                    accessType: 'style',
                    editable: true,
                    valueType: 'color'
                }]);

   },
    makeGraph() {
        this.htVars.palette = new this.$ht.widget.Palette();
        this.htVars.graphView = window.graph = new this.$ht.graph.GraphView();
        this.htVars.dataModel = this.htVars.graphView.dm();
        this.htVars.properView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
        this.htVars.toolbar = new this.$ht.widget.Toolbar(this.toolbarItems);
        this.htVars.accordionView = new this.$ht.widget.AccordionView();
        this.htVars.formPane = new this.$ht.widget.FormPane();
        this.htVars.tabView = new this.$ht.widget.TabView();
        this.htVars.formPaneEvent =new this.$ht.widget.FormPane();
        
        let leftSplitView = new this.$ht.widget.SplitView(this.htVars.formPane,this.htVars.tabView,'v',.3);
        let splitView = new this.$ht.widget.SplitView(this.htVars.palette, this.htVars.graphView, "h", .2),
        mainSplitView = new this.$ht.widget.SplitView(splitView, leftSplitView, 'h', -300),
        upSplitView = new this.$ht.widget.SplitView(this.htVars.toolbar, mainSplitView,'v',.1);
        this.htVars.historyManager= new this.$ht.HistoryManager(this.htVars.dataModel);
           
          
            this.initformPane();
            // this.initformPaneEvent();
            this.initTab();
            this.initProperView();
          //  this.htVars.accordionView.add('属性列表',this.htVars.properView,true);
            this.htVars.accordionView.add('',this.htVars.formPane,true);
            this.view = upSplitView.getView();
            let style = this.view.style;
     this.initPaletteModel(this.htVars.palette.dm());
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
                  
          
            this.htVars.palette.handleDragAndDrop = this.handleDragAndDrop;
           /*  style.position = "absolute";
            style.top = "0";
            style.right = "0";
            style.bottom = "0";
            style.left = "0"; */
            style.border = "1px solid red";
            style.width = "100%";
            style.height = '100%'
           
          this.handleGraphViewEventListener()     ;
    },
    handleGraphViewEventListener(){
      this.htVars.graphView.addInteractorListener(function (e) {
          if(e.kind === 'clickData'){
              console.log(e.data + '被单击',e);
              this.node.position.x = e.data._position.x;
              this.node.position.y = e.data._position.y;
              console.log(this.node);
          }
          else if(e.kind === 'doubleClickData'){
              console.log(e.data + '被双击');
          }            
          else if(e.kind === 'clickBackground'){
              console.log('单击背景');
          }  
          else if(e.kind === 'doubleClickBackground'){
              console.log('双击背景');
          }     
          else if(e.kind === 'beginRectSelect'){
              console.log('开始框选图元');
          }              
          else if(e.kind === 'betweenRectSelect'){
              console.log('正在框选图元');
          }             
          else if(e.kind === 'endRectSelect'){
              console.log('结束框选图元');
          }           
          else if(e.kind === 'beginMove'){
              console.log('开始移动图元');
          }              
          else if(e.kind === 'betweenMove'){
              console.log('正在移动图元');
          }             
          else if(e.kind === 'endMove'){
              console.log('结束移动图元');
          } 
          else if(e.kind === 'beginPan'){
              console.log('开始手抓图平移');
          }              
          else if(e.kind === 'betweenPan'){
              console.log('正在手抓图平移');
          }             
          else if(e.kind === 'endPan'){
              console.log('结束手抓图平移');
          }     
          else if(e.kind === 'beginEditRect'){
              console.log('开始编辑图元大小和位置');
          }              
          else if(e.kind === 'betweenEditRect'){
              console.log('正在编辑图元大小和位置');
          }             
          else if(e.kind === 'endEditRect'){
              console.log('结束编辑图元大小和位置');
          } 
          else if(e.kind === 'beginEditPoint'){
              console.log('开始编辑多边形Shape或多点Edge的具体点');
          }              
          else if(e.kind === 'betweenEditPoint'){
              console.log('正在编辑多边形Shape或多点Edge的具体点');
          }             
          else if(e.kind === 'endEditPoint'){
              console.log('结束编辑多边形Shape或多点Edge的具体点');
          } 
          else if(e.kind === 'beginEditRotation'){
              console.log('开始旋转图元');
          }              
          else if(e.kind === 'betweenEditRotation'){
              console.log('正在旋转图元');
          }             
          else if(e.kind === 'endEditRotation'){
              console.log('结束旋转图元');
          }               
          else if(e.kind === 'moveLeft'){
              console.log('左方向键左移图元一个像素');
          }       
          else if(e.kind === 'moveRight'){
              console.log('右方向键右移图元一个像素');
          } 
          else if(e.kind === 'moveUp'){
              console.log('上方向键上移图元一个像素');
          } 
          else if(e.kind === 'moveDown'){
              console.log('下方向键下移图元一个像素');
          } 
          else if(e.kind === 'toggleNote'){
              console.log('切换note标注的展开合并');
          }             
          else if(e.kind === 'toggleNote2'){
              console.log('切换note2标注的展开合并');
          }
          else if(e.kind === 'beginEditPoints'){
              console.log('开始进入曲线的点编辑状态');
          }
          else if(e.kind === 'endEditPoints'){
              console.log('结束曲线的点编辑状态');
          } 
          else if(e.kind === 'hover'){
              console.log('鼠标停留');
          } 
      }.bind(this));
    },
    handleDragAndDrop(e, state) {
        if (state === 'end') {
            let bound = this.htVars.graphView.getView().getBoundingClientRect(),
                point = this.$ht.Default.getClientPoint(e);

            if (ht.Default.containsPoint({
                x: bound.left,
                y: bound.top,
                width: bound.width,
                height: bound.height
            }, point)) {
                this.htVars.historyManager.beginTransaction();
                var paletteNode = this.htVars.palette.sm().ld(),                   
                    lp = this.htVars.graphView.lp(e),
                    node;
                console.log('paletteNode',paletteNode,paletteNode.s('nodeType'));
                switch(paletteNode.s('nodeType')){
                  case 'node':
                    node = new this.$ht.Node();
                    this.dropNodebyType(node,paletteNode,lp);
                  break;
                  case 'pipe':
                  break;
                  case 'state':
                  break;
                  case 'pilot':
                  break;
                }
              this.htVars.historyManager.endTransaction();
            }
        }
    },
    dropNodebyType(node,paletteNode,lp){
      
               this.htVars.graphView.dm().add(node);              
               console.log('this.node',this.node);
              node.setPosition(lp.x, lp.y);
              node.setImage(paletteNode.getImage());
              node.setStyle('shape',paletteNode.getStyle('shape'));
               
    },
    createStandardNode(group,model){
        
          for (var i = 0; i < this.shapes.length; i++) {
                var node = new ht.Node();
                node.setName(this.shapes[i]);
                node.setStyle('shape', this.shapes[i]); 
                node.setStyle('draggable',true);
                node.setStyle('nodeType','node');
                group.addChild(node);
                model.add(node);
            } 
            console.log('group is ',group);
    },
    initPaletteModel(model) {
      let group = new this.$ht.Group();
     
      group.setName("节点列表");
      group.setExpanded(true);
     
      
      this.createStandardNode(group,model);
      model.add(group);
      // model.add(node);
     
    },
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
    getDeviceList(){
        device.getDeviceList({'type':'c8y_MQTTDevice'}).then(res=>{
            if(res.data.managedObjects.length>0){
                console.log(res.data.managedObjects);
                device. getSupportedMeasurements(166143,'').then(res=>{
                   if(res.data.c8y_SupportedSeries.length>0){
                    //    this.supportedMeasurements = res.data.c8y_SupportedSeries;
                       this.supportedMeasurements = {...res.data.c8y_SupportedSeries,...this.supportedMeasurements}
                       console.log(this.supportedMeasurements);
                   }
                })
            }
        })
    }
  },

  created() {    
    this.getDeviceList();
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
  }
};
</script>
<style scoped lang='scss'>

</style>