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
      standardNode : [{name:'矩形',style:'rect',icon: 'ic_rectangle.svg'}, {name:'圆形',style:'circle',icon:'ic_circle.svg'}, {name:'三角形',style:'triangle',icon:'ic_triangle.svg'}, {name:'多边形',style:'hexagon',icon: 'ic_polygon.svg'}],
      lineNode:[{name:'直线',icon:'ic_line.svg',lineType:'straight'},{name:'曲线',icon:'ic_curve.svg',lineType:'curve'}],
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

      //水管事件
      this.htVars.typeTextEventPane.addRow([div],[100,100]);

      //液柱事件
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
        let tabModel = this.htVars.tabView.getTabModel();
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
      this.htVars.graphView = window.graph = new this.$ht.graph.GraphView();     
      this.htVars.dataModel = this.htVars.graphView.getDataModel();
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
        let leftSplitView = new this.$ht.widget.SplitView(this.htVars.formPane,this.htVars.tabView,'v',.3);
        let splitView = new this.$ht.widget.SplitView(this.htVars.palette, this.htVars.graphView, "h", .2),
        mainSplitView = new this.$ht.widget.SplitView(splitView, leftSplitView, 'h', -300),
        upSplitView = new this.$ht.widget.SplitView(this.htVars.toolbar, mainSplitView,'v',.1);
        this.htVars.historyManager= new this.$ht.HistoryManager(this.htVars.dataModel);
        this.htVars.graphView.adjustHtmlNodeIndex = true;
           
          
        this.initformPane();
        this.initEventFormPane();
        this.initProperView();       
        this.initPaletteModel(this.htVars.palette.dm());
        
      //  this.htVars.accordionView.add('属性列表',this.htVars.properView,true);
        this.htVars.accordionView.add('',this.htVars.formPane,true);
        this.view = upSplitView.getView();
        let style = this.view.style;        
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
    

    /**
     * 图元拖拽和安放
     * @param e 事件
     * @param state 状态
     */
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
                    nodeSize = paletteNode.getSize(),
                    node;
                console.log('paletteNode',paletteNode,paletteNode.s('nodeType'),'lp is ',lp,'size is',paletteNode.getSize());
                this.htVars.htForm.positionX.setValue(lp.x);
                this.htVars.htForm.positionY.setValue(lp.y);
                this.htVars.htForm.sizeW.setValue(nodeSize.width);
                this.htVars.htForm.sizeH.setValue(nodeSize.height);
                switch(paletteNode.s('nodeType')){
                  case 'node':
                   node = this.createStandardNode(lp,paletteNode);
                  break;
                  case 'pipe':
                    node = this.createPipeNode(lp);                  
                  break;
                  case 'text':
                    node = this.createTextNode(lp);
                  break;
                  case 'line':
                    node = this.createLineNode(paletteNode.s('lineType'),lp);
                  break;
                  case 'yezhu':
                    node = this.createYezhuNode(lp);
                  break;
                  case 'state':
                    node = this.createStateNode(lp);
                  break;
                }
                this.dropNodebyType(node,paletteNode,lp);
              this.htVars.historyManager.endTransaction();
            }
        }
    },   
    createStateNode(lp){
      let node = new this.$ht.Node();
      node.setImage(require('@/assets/pilotlamp/ic_lamp_state1.svg'));
      return node;
    },
    createStandardNode(lp,paletteNode){
      let node = new this.$ht.Node();
      node.setStyle('shape.background',null);
      node.setStyle('shape.border.color','#000');
      node.setStyle('shape.border.width','2');
      node.setImage(paletteNode.getImage());
      node.setStyle('shape',paletteNode.getStyle('shape'));
      return node;
    },
    createYezhuNode(lp){    
      ht.Default.setImage('yezhu',{
        width: 100,
        height: 200,
        comps:[
          {
            type: 'shape',
            points:[0,0,0,200,100,200,100,0],
            segments:[1,2,2,2,5],
            background: null,
            borderWidth: '3',
            borderColor: '#7E83A4'
          },
          {
            type: 'shape',
            points:[0,200,0,100,100,100,100,200],
            segments:[1,2,2,2,5],
            background: '#617EFE'
          }
        ]
      })
      let yezhu = new this.$ht.Node();
      yezhu.setImage('yezhu');
      return yezhu;
    },
    createLineNode(type,lp){
      let line = new ht.Shape();
      line.s("shape.border.width", 3);
      line.s("shape.background", null); 
      line.s("shape.border.color", "#000");     
      switch(type){
        case 'straight':
        line.setPoints(new ht.List([
          {x:0,y:0},
          {x:200,y:0}
        ]));
        line.setSegments(new ht.List([
            1, // moveTo
            2
        ])); 
        break;
        default:
        line.setPoints(new ht.List([
          {x:0,y:0},
          {x:50,y:50},
          {x:100,y:0},
          {x:150,y:-50},
          {x:200,y:0},

        ]));
        line.setSegments(new ht.List([
          1,3,3
        ]))
        break;
      }
      line.translate(lp.x,lp.y);
      return line;
    },
    createTextNode(lp){
      let node = new this.$ht.HtmlNode();      
      node.setPosition(lp.x,lp.y);
      node.setHtml(`<textarea name="" id="text" cols="30" rows="10" style="border: 1px solid #000;font-size:14px;" }></textarea>`);
      return node;
    },
    createPipeNode(lp){
        let pipe = new ht.Shape();      
        pipe.s("shape.border.width", 30);        
        pipe.s("shape.background", null);
        pipe.s("shape.dash", true);
        pipe.s("shape.dash.flow", true);
        pipe.s('shape.dash.width',10);
        pipe.s("shape.dash.color", "yellow");
        pipe.s("shape.dash.flow.reverse",false);
        pipe.setStyle("shape.border.color", "#000");         
        pipe.setPoints(new ht.List([
                    {
                        x: 0,
                        y: 0
                    }, {
                        x: 0,
                        y: 150
                    }, {
                        x: 150,
                        y: 150
                    }
                ]
                )
                );
       pipe.setSegments(new ht.List([
            1, // moveTo
            2, // quadraticCurveTo
            2,
        ])); 
        pipe.translate(lp.x, lp.y);
        return pipe;
    },
    /**
     * 按类型将图元放入画布之中
     */
    dropNodebyType(node,paletteNode,lp){
     
    /*   for(let i in node){
         console.log('弄得is',i,':',node[i]);
      } */
      console.log(node.getStyleMap());
              this.htVars.graphView.dm().add(node);
              node.setPosition(lp.x, lp.y);             
              node.setStyle('nodeType',paletteNode.getStyle('nodeType'));
               
    },
    /**
     * 创建标准图元节点
     * @param group 图元节点所属分组
     * @param model 画布数据模型
     * 
     */
    createPaletteStandardNode(group,model){
        //  console.log(require(''+this.testNodeImg));
          for (let i = 0; i < this.standardNode.length; i++) {
                let node = new ht.Node();
                let icon = this.standardNode[i].icon;               
                node.setName(this.standardNode[i].name);             
                node.setStyle('shape', this.standardNode[i].style); 
                // node.setImage(require('@/assets/ic_polygon.svg'));
                node.setStyle('background',null);
                node.setImage(require(`@/assets/${icon}`)); 
                node.setStyle('draggable',true);
                node.setStyle('nodeType','node');
                group.addChild(node);
                model.add(node);
            }            
    },
    /**
     * 创建管道图元节点
     * @param group 图元节点所属分组
     * @param model 画布数据模型
     */
    createPalettePipeNode(group,model){
       let node = new this.$ht.Node();
        node.setName('管道');
        node.setImage(require('@/assets/ic_guandao.svg'));
        node.setStyle('draggable',true);
        node.setStyle('nodeType','pipe');
        group.addChild(node);
        model.add(node);
    },
    /**
     * 创建形状图元节点
     * @param group 图元节点所属分组
     * @param model 画布数据模型
     */
    createPaletteShapeNode(group,model){

    },
    /**
     * 
     * 创建文本图元节点
     */
    createPaletteTextNode(group,model){     
        let node = new this.$ht.Node();      
        node.setName('文本');
        node.setImage(require('@/assets/ic_text.svg'));
        node.setStyle('draggable',true);
        node.setStyle('nodeType','text');
        group.addChild(node);
        model.add(node);

    },
    /**
     * 
     * 创建线&曲线图元节点
     */
    createPaletteLineNode(group,model){
      
      this.lineNode.map(item=>{
        console.log(item);
        let node = new ht.Node();
        node.setName(item.name);
        node.setImage(require(`@/assets/${item.icon}`));
        node.setStyle('draggable',true);
        node.setStyle('nodeType','line');
        node.setStyle('lineType',item.lineType);
        group.addChild(node);
        model.add(node);
      })
     
    },
    /**
     * 创建液柱图元节点
     */
    createPaletteYezhuNode(group,model){
      let node = new ht.Node();
      node.setName('液柱');
      node.setImage(require(`@/assets/ic_yezhu.svg`));
      node.s({
        'draggable':true,
        'nodeType': 'yezhu',
      })
      group.addChild(node);
      model.add(node);
    },
    /**
     * 创建状态显示图元节点
     */
    createPaletteStateNode(group,model){
      let node = new ht.Node();
      node.setName('状态显示');
      node.setImage(require('@/assets/ic_state.svg'));
      node.s({
        'draggable': true,
        'nodeType': 'state'
      });
      group.addChild(node);
      model.add(node);
    },
    /**
     * 初始化图元节点面板模型
     * @param model 画布数据模型
     * 
     */
    initPaletteModel(model) {
      let group = new this.$ht.Group();
      group.setName("标准控件");
      group.setExpanded(true);
      console.log('group',group,model);
      this.createPaletteLineNode(group,model);
      this.createPaletteTextNode(group,model);
      this.createPaletteStandardNode(group,model);
      this.createPalettePipeNode(group,model);
      this.createPaletteYezhuNode(group,model);
      this.createPaletteShapeNode(group,model);  
      this.createPaletteStateNode(group,model);
      model.add(group);
     
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
  
}
</style>