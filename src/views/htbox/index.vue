<template>
    <div class='htbox' ref="htbox">
     <el-dialog
      title="预览"
      :visible.sync="showPreview"
     fullscreen append-to-body center
      >
      <div class="showPreview" ref="showPreview"></div>      
    </el-dialog>
   <!-- <textarea name="" id="testText" cols="30" rows="10">sadfasdfasfasdf</textarea> -->
   <!-- <h2>{{testString}}</h2> -->

    <img-house class="imgHouse" v-if="showImageHouse"/>
    </div>
</template>
<script>

import { mapMutations, mapState } from "vuex";
import types from '@/store/mutation-types';
import {Message, MessageBox} from 'element-ui';
import device from '@/api/device';

import { setTimeout } from 'timers';
import imgHouse from '@/components/imgHouse';
export default {
  name: "htbox",
  components:{
    imgHouse
  },
  data() {
    return {
      testArr: [1,2,3,4,5],
      testString: '撒打裂缝sldfjaskfa',
      showPreview: false,     
      testHtmlNode: new ht.HtmlNode(),   
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
        tabViewProperty: '',
        clickNode: '',
        htForm: {
          positionX: new this.$ht.widget.TextField(),
          positionY: new this.$ht.widget.TextField(),
          sizeW: new this.$ht.widget.TextField(),
          sizeH: new this.$ht.widget.TextField(),
          pipeMin: new this.$ht.widget.TextField(),
          pipeMax: new this.$ht.widget.TextField(),
          maxYezhu: new this.$ht.widget.TextField(),
          minYezhu: new this.$ht.widget.TextField()
        },
        typeNodeProperView:'',
        typePipeProperView:'',
        typePilotProperView:'',
        typeShapeProperView:'',
        typeTextProperView: '',
        typeLineProperView:'',
        typeYezhuProperView:'',
        typeStateProperView:'',
        typeStateEventPane:'',
        typeYezhuEventPane:'',
        typeTextEventPane:'',
        typePipeEventPane:'',
        typeFlowEventPane:'',
        typePilotEventPane:'',
        typeShapeEventPane:''
      },
      splitView: {
        left: "",
        right: "",
        up: "",
        down: ""
      },
      view: '',
      supportedMeasurements: ['id','name'],
      supportedMeasurementsArr:[],
      node: {
        position: {
          x:'',
          y:''
        },
        eventInfo:{
          varsName: '',
          min: '',
          max: ''
        }
      },
      deviceType:'c8y_MQTTDevice'
    };
  },
  computed: {
    ...mapState([{ htstate: "ht" },'showImageHouse','graphView'])
  },
  methods: {
    ...mapMutations([
      'm_showImageHouse',
      'm_graphView'
    ]),
    /**
     * 初始化基本属性位置&大小
     */
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
                    element: this.htVars.htForm.positionX
                    },                   
                    {
                        id: 'positionY',
                        element: this.htVars.htForm.positionY
                    }
                ],
                [50, 80, 80]);     
          this.htVars.formPane.addRow([
                    '大小',
                    {
                        id: 'sizeW',
                        element: this.htVars.htForm.sizeW
                    },                   
                    {
                        id: 'sizeY',
                        element: this.htVars.htForm.sizeH
                    }
                ],
                [50, 80, 80]);     
    },
    /**
     * 初始化事件面板
     * 
     */
    initEventFormPane(){
      setTimeout(() => {
      let div = document.createElement('div');
      div.className = 'eventFormPane';
      let select = document.createElement('select');
     let option = document.createElement('option');
     option.innerHTML = '请选择变量';
     select.appendChild(option);   
     let supportedMeasurements = this.supportedMeasurements;
     Array.prototype.forEach.call(Object.values(supportedMeasurements),function(item){
       option = document.createElement('option');
       option.innerHTML = item;
       select.appendChild(option);
       option = '';
       
     });
      div.appendChild(select);
      console.log('div is',div);
      //管道事件
      this.htVars.typePipeEventPane.addRow([div],[100,100]);
      this.htVars.typePipeEventPane.addRow(['动态',{
        id:'dongtai',
        element: this.htVars.htForm.pipeMax
      }],[100,100]);
      this.htVars.typePipeEventPane.addRow([
        '静态',
        {
          id: 'jingtai',
          element: this.htVars.htForm.pipeMin
        }
      ],[100,100])
      console.log('div加入之后',div);
      //文本事件
     div = document.createElement('div');
      div.className = 'eventFormPane';
      select = document.createElement('select');
     option = document.createElement('option');
     option.innerHTML = '请选择变量';
     select.appendChild(option);   
    supportedMeasurements = this.supportedMeasurements;
     Array.prototype.forEach.call(Object.values(supportedMeasurements),function(item){
       option = document.createElement('option');
       option.innerHTML = item;
       select.appendChild(option);
       option = '';
       
     });
      div.appendChild(select);
      this.htVars.typeTextEventPane.addRow([div],[100,100]);
      //液柱事件
      div = document.createElement('div');
      div.className = 'eventFormPane';
      select = document.createElement('select');
      option = document.createElement('option');
      option.innerHTML = '请选择变量';
      select.appendChild(option);
      this.htVars.typeYezhuEventPane.addRow([div],[100,100]);
      this.htVars.typeYezhuEventPane.addRow([
        '最大值',
        {
          id:'maxYezhu',
          element: this.htVars.htForm.maxYezhu
        }
        ],[100,100]);
      this.htVars.typeYezhuEventPane.addRow([
        '最小值',
        {
          id:'minYezhu',
          element: this.htVars.htForm.minYezhu
        }
        ],[100,100])
      }, 500);

    },
    
   /**
    * 初始化Tab切换页
    * 
    */
  initTab(nodeType){    
        console.log('initTab',nodeType);
         // create view
        let div = document.createElement('div');
        // create tab
        let properTab = new ht.Tab();
        properTab.setName('属性');
      
        let eventTab = new ht.Tab();
        eventTab.setName('事件');
        switch(nodeType){
          case 'node':
          console.log('node is clicked');
          properTab.setView(this.htVars.typeNodeProperView);
          eventTab.setView(div);
          break;
          case 'pipe':
          properTab.setView(this.htVars.typePipeProperView);
          eventTab.setView(this.htVars.typePipeEventPane);
          break;
          case 'text':
          properTab.setView(this.htVars.typeTextProperView);
          eventTab.setView(this.htVars.typeTextEventPane);
          break;
          case 'line':
          properTab.setView(this.htVars.typeLineProperView);
          eventTab.setView(div);
          break;
          case 'yezhu':
          properTab.setView(this.htVars.typeYezhuProperView);
          eventTab.setView(this.htVars.typeYezhuEventPane);
          break;
          case 'state':
          properTab.setView(this.htVars.typeStateProperView);
          eventTab.setView(div);
          break;
        }
        // add to model
        let tabModel = window.tabModel = this.htVars.tabView.getTabModel();
        tabModel.clear();
        tabModel.add(properTab);
        tabModel.add(eventTab);
        tabModel.getSelectionModel().setSelection(properTab);
        
     }, 
     /**
      * 添加tab页面内容
      * @param nodeType 图元节点类型
      */
     addTabView(nodeType){
      
       properTab.setView('');
        eventTab.setView('');
      
     },
     /**
      * 初始化图元节点属性列表
      * 
      */
   initProperView(){
        //初始化普通节点属性
        this.htVars.typeNodeProperView.addProperties([         
          {
            name: 'shape.background',
            displayName:'填充颜色',
            accessType: 'style',
            editable: true,
            valueType: 'color'
          },
          {
            name: 'shape.border.color',
            displayName: '描边',
            accessType: 'style',
            editable: true,
            valueType: 'color'
          },
          {
            name: 'shape.border.width',
            displayName:'粗细',
            accessType: 'style',
            editable: true,
            valueType: 'number',
           
          },
          {
            name: 'shape.dash',
            displayName:'线性选择',
            accessType: 'style',
            editable: true,
            enum: {
              values:[true,false],
              labels: ['-----------','————————————']
            }
          }
         ]);
         
        //  初始化管道节点属性
        this.htVars.typePipeProperView.addProperties([
          {
            name: 'shape.border.width',
            displayName:'管径（px）',
            accessType: 'style',
            editable: true,
            valueType: 'number'

          },
          {
            name: 'shape.border.color',
            displayName:'颜色',
            accessType: 'style',
            editable: true,
            valueType: 'color'
          },          
          {
            name: 'shape.dash.width',
            displayName:'块宽',
            accessType: 'style',
            editable: true,
            valueType: 'number',
              getPropertyName(property){
              console.log('属性为',property)
            }

          },
          {            
            editable: true,
            displayName:'块长',            
            valueType: 'number',
            value: '',
            getValue: function(data, property, value,view){
              console.log('getValue is',data, property, value,view);
              return data.getStyle('shape.dash.pattern')[0];
            },
            setValue: function(data, property, value, view){
              console.log('setValue is',data, property, value, view);
              return data.setStyle('shape.dash.pattern',[value,data.getStyle('shape.dash.pattern')[1]])
                      
            },
          },
          {
            displayName: '块间距',
            valueType: 'number',
            value:'',
            editable: true,
          getValue: function(data, property, value,view){
              console.log('getValue is',data, property, value,view);
              return data.getStyle('shape.dash.pattern')[1];
            },
            setValue: function(data, property, value, view){
              console.log('setValue is',data, property, value, view);
              return data.setStyle('shape.dash.pattern',[data.getStyle('shape.dash.pattern')[0],value])
                      
            },
          },
          {
            name: 'shape.dash.color',
            displayName:'颜色',
            accessType: 'style',
            editable: true,
            valueType: 'color'
          },
          {
            name: 'shape.dash.flow.reverse',
            displayName: '流向',
            editable: true,
            accessType: 'style',        
            value: false,
            enum:{values:[false,true], labels:['正向','反向']}
          }

        
        ]);
        let fontSizeArr = [];
        for(let i = 12;i<=72;i++){
          fontSizeArr.push(i);
        }
         //初始化文本属性
         this.htVars.typeTextProperView.addProperties([
          {
            name: 'fontSize',
            editable: true,
            displayName:'文本字号',
            value:14,
            accessType: 'style',
            enum:{values:fontSizeArr},
            getValue: function(data, property, value,view){
              let dom = $(data.getHtml())[0];             
              console.log('getValue is',data, property, value,view,data.getHtml(),dom.style.fontSize,$('#text').val());              
              return dom.style.fontSize;
             
            },
             setValue: function(data,property,value,view){            
                 let dom = document.getElementById('text');                          
              console.log(dom,dom.style.fontSize);
              dom.style.fontSize = `${value}px`;
              data.setHtml();
              return data.setHtml(dom); 
             }
            },
            {
              displayName: '字体颜色',
              valueType: 'color',
              editable: true,
               getValue: function(data, property, value,view){
              let dom = $(data.getHtml())[0]; 
              return dom.style.color;
            }.bind(this),
               setValue: function(data,property,value,view){  
                 console.log('color is',value);
                 let dom = document.getElementById('text');
                 dom.style.color = value;
              data.setHtml();
              return data.setHtml(dom); 
             }
            },
            {
              displayName:'是否加粗',
              valueType: 'boolean',
              editable: true,
               getValue: function(data, property, value,view){
              let dom = $(data.getHtml())[0];             
              console.log('getValue is',data, property, value,view,data.getHtml(),dom.style.fontSize,$('#text').val());              
              return dom.style.fontWeight==='bold'?true: false;
            }.bind(this),
               setValue: function(data,property,value,view){            
                 let dom = document.getElementById('text');
                 if(value){
                   dom.style.fontWeight = 'bold';
                 }else{
                   dom.style.fontWeight = 'normal';
                 }
              data.setHtml();
              return data.setHtml(dom); 
             }
            },
            {
              displayName:'是否倾斜',
              valueType: 'boolean',
              editable: true,               
               getValue: function(data, property, value,view){
              let dom = $(data.getHtml())[0]; 
              return dom.style.fontStyle==='italic'?true: false;
            },
              setValue: function(data,property,value,view){            
                 let dom = document.getElementById('text');
                 if(value){
                   dom.style.fontStyle = 'italic';
                 }else{
                   dom.style.fontStyle = 'normal';
                 }
              data.setHtml();
              return data.setHtml(dom); 
             }
            },
             {
              displayName:'是否下划线',
              valueType: 'boolean',
              editable: true,               
               getValue: function(data, property, value,view){
              let dom = $(data.getHtml())[0]; 
              return dom.style.textDecoration==='underline'?true: false;
            },
              setValue: function(data,property,value,view){            
                 let dom = document.getElementById('text');
                 if(value){
                   dom.style.textDecoration = 'underline';
                 }else{
                   dom.style.textDecoration = 'none';
                 }
              data.setHtml();
              return data.setHtml(dom); 
             }
            },

           
         ])

         //初始化线性属性
         this.htVars.typeLineProperView.addProperties([
           {
             name:'shape.border.color',
             displayName:"颜色",
             valueType:'color',
             accessType:'style',
             editable: true
           },
           {
            name: 'shape.border.width',
            displayName:'粗细',
            accessType: 'style',
            editable: true,
            valueType: 'number',
           
          },
         ])

         //初始化液柱属性
         this.htVars.typeYezhuProperView.addProperties([
          
          {
            name: 'shape.background',
            displayName:'填充颜色',
            accessType: 'style',
            editable: true,
            valueType: 'color',
            getValue: function(data, property, value,view){              
              console.log('getValue is',data, property, value,view,ht.Default.getImage('yezhu'));   
              data.setImage(ht.Default.getImage(data.getImage()));
              return data.getImage().comps[1].background;             
            },
            setValue: function(data,property,value,view){
              console.log('set is',data.getImage(),value);
              let img = data.getImage();
              img.comps[1].background = value;
              return data.setImage(img);
            }
          },           
         ])

         //初始化状态显示属性      
      
       /*  this.htVars.typeStateProperView.setConfig({
          content: node
        }) */
        let button = document.createElement('button');
        button.innerHTML = '选择图片';
        button.onclick = this.chooseImg;
         this.htVars.typeStateProperView = new ht.widget.Panel({
                    title:'',
                    titleHeight:'0',
                    titleBackground:'transparent',
                    width: 200,                 
                    contentHeight: 60,
                    content: button
                    // content: button
                });
        
   },
   chooseImg(){
    this.m_showImageHouse({show: true});
    console.log(this.showImageHouse);
    
   },
   /**
    * 初始化htVars
    */
   initHtvars(){
      this.htVars.palette = new this.$ht.widget.Palette();
      this.htVars.graphView = window.graphView = new this.$ht.graph.GraphView();     
      this.htVars.dataModel = window.dataModel = this.htVars.graphView.getDataModel();
      this.htVars.properView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
      this.htVars.toolbar = new this.$ht.widget.Toolbar(this.toolbarItems);
      this.htVars.accordionView = new this.$ht.widget.AccordionView();
      this.htVars.formPane = new this.$ht.widget.FormPane();
      this.htVars.tabView = new this.$ht.widget.TabView();
      this.htVars.formPaneEvent =new this.$ht.widget.FormPane();     

      this.htVars.typeNodeProperView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
      this.htVars.typePipeProperView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
      this.htVars.typeTextProperView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
      this.htVars.typeLineProperView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
      this.htVars.typeShapeProperView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
      this.htVars.typePilotProperView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
      this.htVars.typeYezhuProperView = new this.$ht.widget.PropertyView(this.htVars.dataModel);
       

        this.htVars.typeYezhuEventPane = new this.$ht.widget.FormPane();
        this.htVars.typePipeEventPane = new this.$ht.widget.FormPane();
        this.htVars.typeTextEventPane = new this.$ht.widget.FormPane();
       
   },
   /**
    * 初始化创建画布
    */
    makeGraph() {
        this.initHtvars();       
        this.htVars.historyManager= window.historyManager = new this.$ht.HistoryManager(this.htVars.dataModel);
        this.htVars.graphView.adjustHtmlNodeIndex = true;
           
          
        this.initformPane();
        this.initEventFormPane();
        this.initProperView();      
      
        
      //  this.htVars.accordionView.add('属性列表',this.htVars.properView,true);
        this.htVars.accordionView.add('',this.htVars.formPane,true);
        // this.view = upSplitView.getView();
        this.view = this.htVars.graphView.getView();
        this.view.className = 'graph' ;
        // this.view.style.border="10px solid #000";
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
        // this.handleGraphViewEventListener()     ;
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
    /**
     * 
     * 获取设备列表
     */
    getDeviceList(){
        device.getDeviceList({'type':'c8y_MQTTDevice'}).then(res=>{
            if(res.data.managedObjects.length>0){
                console.log(res.data.managedObjects);
                device. getSupportedMeasurements(166143,'').then(res=>{
                   if(res.data.c8y_SupportedSeries.length>0){
                    //    this.supportedMeasurements = res.data.c8y_SupportedSeries;
                     res.data.c8y_SupportedSeries.map(item=>{
                      
                       this.supportedMeasurements.push(item);
                     })
                   }
                })
            }
        })
    }
  },

  created() {    
    console.log(this.showImageHouse);
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