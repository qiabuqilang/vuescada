<template>
    <div class='toolbar'>
      <el-row class="toolbar_row">
          <el-col :span="item.func==='reduce'?2:1" v-for="item of imgArr" :key="item.img" :class="item.func==='reduce'?'reduce':''">
              <img :src="item.img" alt="" @click="handleClick(item)" :class="[item.clicked?'clicked':'']">
              <select name="" id="" v-if="item.func === 'reduce'" class="select">
                  <option :value="item" v-for="item of zoomArr" :key="item" :selected="item===100">{{item}}%</option>
              </select>
          </el-col>         
      </el-row>
    </div>
</template>
<script>
export default {
     name: 'toolbar', 
    /* 
     toolbarItems: [
        {
          icon: 'zoomIn',
          label: '放大',
          action: function () {
            console.log(this);
            this.htVars.graphView.zoomIn(true);
          }.bind(this),
        },
        {
          icon: 'zoomOut',
          label: '缩小',
          action: function () {
            this.htVars.graphView.zoomOut(true);
          }.bind(this),
        },
        {
          icon: 'fitContent',
          label: '适应',
          action: function () {
            this.htVars.graphView.fitContent(true);
          }.bind(this),
        },
        
        'separator',
        {
          label: '预览',
          action: function () {          
            this.showPreview = true;
            setTimeout(() => {
              const dataModel = new this.$ht.DataModel(),
                graphView = new this.$ht.ht.graph.GraphView(dataModel),
                view = graphView.getView();
              this.viewStyle(view);
              this.$refs.showPreview.appendChild(view);             
              dataModel.deserialize(this.htVars.dataModel.serialize());
              graphView.enableFlow();
              graphView.enableDashFlow();
              graphView.setDisabled(true);
            }, 1000);
          }.bind(this),
        },
        {
          label: '保存',
          action: function () {
            console.log(scada);
            const data = { 
              type: 'saveScada',
              scadaString: JSON.stringify(this.htVars.dataModel.serialize()),
              deviceType: this.deviceType,
            };
            scada.saveScada('/inventory/managedObjects', '', data).then((res) => {
              console.log(res);
              if (res.data.id > 0) {
                Message({
                  message: '保存成功',
                  type: 'success',
                });
              } else {
                Message({
                  message: '保存失败',
                  type: 'error',
                });
              }
            });
          }.bind(this),
        },
        {
          label: '真实使用',
          action: function () {
            this.$router.push({
              path: '/preview',
            });
          }.bind(this),
        },
      ],
    */
    data() {
      const zoomArr = function(){
          let arr = ['10','50'];
          for(let i = 100; i<=500; i+=100){
              arr.push(i);
          }
         
          return arr;
      }
      return{
          imgArr:[
              {
                  img: require('@/assets/ic_chexiao.svg'),
                  func: 'historyBack',
                  clicked: false
              },
              {
                  img: require('@/assets/ic_qianjin.svg'),
                  func: 'historyForward',
                  clicked: false
              },
              {
                  img: require('@/assets/ic_save.svg'),
                  func: 'save',
                  clicked: false
              },
              {
                  img: require('@/assets/ic_suoxiao.svg'),
                  func: 'reduce',
                  clicked: false
              },
              {
                  img: require('@/assets/ic_fangda.svg'),
                  func: 'amplify',
                  clicked: false
              },
              {
                  img: require('@/assets/ic_grid.svg'),
                  func: 'showGrid',
                  clicked: false
              },
              {
                  img: require('@/assets/ic_lock.svg'),
                  func: 'lock',
                  clicked: false
              },
              {
                  img: require('@/assets/ic_unlock.svg'),
                  func: 'unlock',
                  clicked: false
              }
          ],
          zoomArr:zoomArr()
      }
    },
    created(){       
      
    },
    mounted(){
       window.GridPainter = new ht.graph.GridPainter(window.graphView);
    },
    methods:{
        handleClick(item){
          item.clicked = !item.clicked;
            switch(item.func){
                case 'historyBack':
                this.historyBack();
                break;
                case 'showGrid': 
                if(item.clicked){
                  window.graphView.addBottomPainter(window.GridPainter);
                }else{
                 window.graphView.removeBottomPainter(window.GridPainter);
                }
                this.showGrid();
                break;
            }
        },
        showGrid(){
         
          
        },
        historyBack(){
          
        }
    }
}
</script>
<style scoped lang='scss'>
.toolbar{
    width: 100%;
    height: px2rem(60);
    line-height: px2rem(60);
    background: $mainBgColor;   
    text-align: center;
    padding-left:px2rem(50);
    .toolbar_row{
        height: px2rem(60);
        border: 1px solid transparent;      
    }
    img{
        width: px2rem(30);
        height: px2rem(30);       
        background: #fff;
        border: 1px dashed #000;       
        &:hover{
            border: 1px solid #617EFE;
        }
        &.clicked{
          background: $mainBgColor;
        }
    }
    .reduce{
       overflow: hidden;
        padding-top:px2rem(10);
        img{
            float: left;
            margin-right: px2rem(0);
        }
        select{
        float: right;
        border: 1px solid #000;
        margin-top: px2rem(12);
        }
    }
  
}
</style>
