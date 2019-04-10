<template>
    <div class='palette' ref="palette">
     
    </div>
</template>
<script>
export default {
     name: 'palette', 
    data() {
      return{
        palette:new this.$ht.widget.Palette,
        view: '',
        lineNode:[{name:'直线',icon:'ic_line.svg',lineType:'straight'},{name:'曲线',icon:'ic_curve.svg',lineType:'curve'}],
        standardNode : [{name:'矩形',style:'rect',icon: 'ic_rectangle.svg'}, {name:'圆形',style:'circle',icon:'ic_circle.svg'}, {name:'三角形',style:'triangle',icon:'ic_triangle.svg'}, {name:'多边形',style:'hexagon',icon: 'ic_polygon.svg'}],
        imgNode:[
          {
            name:'容器',
            icon: 'ic_rongqi_big.png'
          },
          {
            name: '电磁流量计',
            icon: 'ic_dianci_big.png'
          },
          {
            name: '提升泵',
            icon: 'ic_beng_big.png'
          },
          {
            name :'风机',
            icon: 'ic_fengji_big.png'
          },
          {
            name: '底座',
            icon: 'dizuo.svg'
          },
          {
            name: '控制柜',
            icon: 'ic_kongzhigui1_big.svg'
          },
          {
            name: '水泵1',
            icon: 'ic_shuibeng1_big.svg'
          },
          {
            name:'水管1',
            icon: 'shuiguan1.svg'
          },
          {
            name:'水管2',
            icon: 'shuiguan2.svg'
          },
          {
            name:'水箱',
            icon: 'ic_shuixiang_big.svg'
          },
          {
            name: '稳压泵',
            icon: 'ic_wenyabeng_big.svg'
          },
          {
            name: '压力罐',
            icon: 'ic_yaliguan_big.svg'
          }
        ]
      }
    },
    created(){
     this.initPaletteModel(this.palette.dm());
     this.palette.handleDragAndDrop = this.handleDragAndDrop;
    },
    mounted(){  
        this.view = this.palette.getView();       
        console.log(this.view,this.$refs.palette);
        this.$refs.palette.appendChild(this.view);
    },
    methods:{    
     /**
     * 初始化图元节点面板模型
     * @param model 画布数据模型
     * 
     */
    initPaletteModel(model) {
     
     this.createStandardGroup(model);
     this.createWaterGroup(model);
        },
      createElecGroup(model){
        let group = new this.$ht.Group();
        group.setName('电力系统');
       
        model.add(group);
      },
      createFoodGroup(model){
        let group = new this.$ht.Group();
        group.setName('食品加工');       
        model.add(group);
      },
      createWaterGroup(model){
        let group = new this.$ht.Group();
        group.setName('水务处理');
        this.createPaletteImgNode(group,model);
        model.add(group);
      },
      createStandardGroup(model){
      let group = new this.$ht.Group();
      group.setName("标准控件");
      group.setExpanded(true);
      console.log('group',group,model);
      this.createPaletteLineNode(group,model);
      this.createPaletteTextNode(group,model);
      this.createPaletteStandardNode(group,model);
      this.createPalettePipeNode(group,model);
      this.createPaletteYezhuNode(group,model);    
      this.createPaletteStateNode(group,model);
      model.add(group);
      },
      createPaletteImgNode(group,model){
         for (let i = 0; i < this.imgNode.length; i++) {
                let node = new ht.Node();
                let icon = this.imgNode[i].icon;               
                node.setName(this.imgNode[i].name);
                node.setImage(require(`@/assets/${icon}`)); 
                node.setStyle('draggable',true);
                node.setStyle('nodeType','img');
                group.addChild(node);
                model.add(node);
            }            
      },
        /**
     * 创建标准图元节点
     * @param group 图元节点所属分组
     * @param model 画布数据模型
     * 
     */
    createPaletteStandardNode(group,model){
        
          for (let i = 0; i < this.standardNode.length; i++) {
                let node = new ht.Node();
                let icon = this.standardNode[i].icon;               
                node.setName(this.standardNode[i].name);             
                node.setStyle('shape', this.standardNode[i].style); 
                node.setStyle('background',null);
                node.setImage(require(`@/assets/${icon}`)); 
                node.setStyle('draggable',true);
                node.setStyle('nodeType','standard');
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
    createStateNode(lp){
      let node = new this.$ht.Node();
      node.setImage(require('@/assets/pilotlamp/ic_lamp_state1.svg'));
      node.setStyle('showName','状态显示');
      return node;
    },
    createStandardNode(lp,paletteNode){    
      let node = new this.$ht.Node();
      node.setStyle('shape.background',null);
      node.setStyle('shape.border.color','#000');
      node.setStyle('shape.border.width','2');
      node.setImage(paletteNode.getImage());
      node.setStyle('showName',paletteNode.getName());
      node.setStyle('shape',paletteNode.getStyle('shape'));
      return node;
    },

    createYezhuNode(lp){    
      let yezhuImage = {
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
            // points:[0,200,0,100,100,100,100,200],
            points: {
              value: [0,200,0,100,100,100,100,200],
              func: 'style@drawPoints'
            },
            segments:[1,2,2,2,5],
            background: '#617EFE'
          }
        ]
      }
      let yezhu = new this.$ht.Node();
      yezhu.setImage(yezhuImage);
      yezhu.setStyle('drawPoints',[0,200,0,150,100,150,100,200])
      yezhu.setStyle('showName','液柱');
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
        line.setStyle('showName','直线');
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
        line.setStyle('showName','曲线');
        break;
      }
      line.translate(lp.x,lp.y);
      return line;
    },
    createTextNode(lp){
      let node = new this.$ht.HtmlNode();      
      node.setPosition(lp.x,lp.y);
      node.setStyle('showName','文本');
      node.setHtml(`<textarea name="" id="text" cols="30" rows="10" style="font-size:14px;color:#000;background: rgba(0,0,0,0);" }></textarea>`);  
      return node;
    },
    createPipeNode(lp){
        let pipe = new ht.Shape();      
        pipe.s("shape.border.width", 30);        
        pipe.s("shape.background", null);
        pipe.s("shape.dash", true);
        pipe.s("shape.dash.flow", true);
        pipe.s('shape.dash.width',10);
        pipe.s("shape.dash.color", "#f00");
        pipe.s("shape.dash.flow.reverse",false);
        pipe.setStyle("shape.border.color", "#000"); 
        pipe.setStyle('showName','管道');
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
     createImgNode(lp,paletteNode){    
      let node = new this.$ht.Node();
      node.setImage(paletteNode.getImage());
      node.setStyle('showName',paletteNode.getName());    
      return node;
    },
       /**
     * 按类型将图元放入画布之中
     */
    dropNodebyType(node,paletteNode,lp){     
    /*   for(let i in node){
         console.log('弄得is',i,':',node[i]);
      } */
      console.log(node.getStyleMap());
      window.graphView.dm().add(node);   
      node.setPosition(lp.x, lp.y);             
      node.setStyle('nodeType',paletteNode.getStyle('nodeType'));
               
    },
      /**
     * 图元拖拽和安放
     * @param e 事件
     * @param state 状态
     */
    handleDragAndDrop(e, state) {
        console.log(state);
        if (state === 'end') {
            let bound = graphView.getView().getBoundingClientRect(),          
                point = this.$ht.Default.getClientPoint(e);  
                console.log(bound,point)   ;
                console.log(ht.Default.containsPoint({
                x: bound.left,
                y: bound.top,
                width: bound.width,
                height: bound.height
            }, point));
            if (ht.Default.containsPoint({
                x: bound.left,
                y: bound.top,
                width: bound.width,
                height: bound.height
            }, point)) {
               historyManager.beginTransaction();
                var paletteNode = this.palette.sm().ld(),                   
                    lp = graphView.lp(e),
                    nodeSize = paletteNode.getSize(),
                    node;
                console.log('paletteNode',paletteNode,paletteNode.s('nodeType'),'lp is ',lp,'size is',paletteNode.getSize());
               
                switch(paletteNode.s('nodeType')){
                  case 'standard':
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
                  case 'img':
                    node = this.createImgNode(lp,paletteNode);
                  break;
                }
                this.dropNodebyType(node,paletteNode,lp);
             historyManager.endTransaction();
            }
        }
        }, 
    },
    

}
</script>
<style scoped lang='scss'>
.palette{
    width:px2rem(248);
    height:px2rem(780);
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
}
</style>
<style lang="scss">
.ht-widget-palette{
    .palette-header{
        height: px2rem(50);
        padding-top: px2rem(10) !important;
        background: #fff !important;
        color: #000;
        span{            
            color: #000;
            font-size:px2rem(16) !important;
           
        }
        canvas{
            width: px2rem(24) !important;
            height:px2rem(24) !important;
        }
    }
    .palette-content{       
        width: px2rem(248);
        height: px2rem(780);
        background: $mainBgColor;
        .palette-item{           
            width: px2rem(56);
            padding: 0px;
            margin-right: px2rem(15);
             .image-box{
            width: px2rem(40) !important;
            height: px2rem(40) !important;
            }
            .label-box{
                font-size:px2rem(10);
            }
        }
       
    }
}
     
</style>