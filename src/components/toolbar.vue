<template>

    <div class='toolbar'>
      <el-row class="toolbar_row">
        <el-col :span="1"></el-col>
          <el-col :span="item.func==='reduce'?2:1" v-for="item of imgArr" :key="item.img" :class="item.func==='reduce'?'reduce':''">
              <img :src="item.img" alt="" @click="handleClick(item)" :class="[item.clicked?'clicked':'']">
              <select name="" id="" v-if="item.func === 'reduce'" class="select" v-model="zoomValue" @change="handleSelect()">
                  <option :value="item" v-for="item of zoomArr" :key="item">{{item}}%</option>
              </select>
          </el-col>         
      </el-row>
    </div>
</template>
<script>
import { Message } from 'element-ui';
import scada from '@/api/scada';
export default {
     name: 'toolbar',     
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
          zoomArr:zoomArr(),
          zoomValue: 100,
          center:{x:0,y:0}
      }
    },
    props:{
      node: {
        type: Object,
        default: {}
      }
    },
    computed:{
       nodeId(){
        return this.node.id;
      },
      nodeInfo(){
      return window.dataModel.getDataById(this.node.id);
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
                  window.historyManager.undo();
                break;
                case 'historyForward':
                  window.historyManager.redo();
                break;
                case 'showGrid': 
                if(item.clicked){
                  window.graphView.addBottomPainter(window.GridPainter);
                }else{
                 window.graphView.removeBottomPainter(window.GridPainter);
                }               
                break;
                case 'reduce':              
                 window.graphView.zoomOut(true);
                break;
                case 'amplify':
                 window.graphView.zoomIn(true);
                break;
                case 'lock':
                  window.graphView.setDisabled(true);
                break;
                case 'unlock':
                  window.graphView.setDisabled(false);                  
                break;
                case 'save':
                    let data = { 
                    type:'saveScada',                    
                    scadaString: JSON.stringify(window.dataModel),
                    deviceType: this.deviceType,
                    deviceId: this.deviceId
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
                break;
            }
        }, 
        handleSelect(){
            window.graphView.setZoom(parseInt(this.zoomValue/100),true,this.center);
        }
    }
}
</script>
<style scoped lang='scss'>
.toolbar{
    width: 100%;
    height: px2rem(60);    
    background: $mainBgColor;   
    text-align: center;
    // padding-left:px2rem(50);
    .toolbar_row{
        height: px2rem(60);
        border: 1px solid transparent;      
       .el-col{
         height: px2rem(60);
        
         padding: 0px;
         
       }
    }
    img{
        width: px2rem(30);
        height: px2rem(30);       
        background: #fff;
        border: 1px dashed #000;  
        display: block;
        margin: 0 auto;
        margin-top: px2rem(15);
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
        height: px2rem(30);
        margin-top: px2rem(15);
        }
    }
  
}
</style>
