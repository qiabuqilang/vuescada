<template>   
    <div class='imgHouse'>            
     <el-dialog     
      :visible="showImageHouse"  
      width="85%"   
      ref="dialog"     
      class="el_dialog_my">    
      <div slot="title" class="title">
          样式库
      </div>  
      <div class="box">
          <div class="left">
              <el-row>
                <el-col :span="4" v-for="item of imgArr" :key="item.img">
                    <div :class="['img',item.selected?'selected':'']"  @click="clickStyle(item.id)">
                        <img :src="item.img" alt="">
                        <h3>{{item.name}}</h3>
                    </div>
                </el-col>
            </el-row>
          </div>
          <div class="right">
            <el-row  v-if="children.length>0">
                <el-col :span="8" v-for="item of children" :key="item.img">
                    <div class="img"> 
                        <img :src="item.img" alt="">
                    </div>
                </el-col>
            </el-row>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleColse()">取 消</el-button>
        <el-button type="primary" @click="handleSave()">保存</el-button>
      </span>
    </el-dialog>   
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
     name: 'imgHouse', 
   
    data() {
      return{
          imgArr:[
              {
                  id: 1,
                  name:"风机",
                  img: require('@/assets/pilotlamp/ic_lamp_state1.svg'),
                  selected: true,
                  children: [
                      {
                          id:2,
                          img: require('@/assets/pilotlamp/ic_lamp_state1.svg')
                      },
                      {
                          id: 3,
                          img: require('@/assets/pilotlamp/ic_lamp_state2.svg')
                      },
                      {
                          id: 4,
                          img: require('@/assets/pilotlamp/ic_lamp_state3.svg')
                      },
                      {
                          id:5,
                          img: require('@/assets/pilotlamp/ic_lamp_state4.svg')
                      },
                      {
                          id: 6,
                          img: require('@/assets/pilotlamp/ic_lamp_state5.svg')
                      },
                      {
                          id: 7,
                          img: require('@/assets/pilotlamp/ic_lamp_state6.svg')
                      }
                  ]
              },
               {
                  id: 8,
                  name:"风机",
                  img: require('@/assets/fan/ic_fengshan_bianpin.svg'),
                  selected: false,
                  children: [                      
                      {
                          id:9,
                          img: require('@/assets/fan/ic_fengshan_bianpin.svg')
                      },
                      {
                          id: 10,
                          img: require('@/assets/fan/ic_fengshan_gongpin.svg')
                      },
                      {
                          id: 11,
                          img: require('@/assets/fan/ic_fengshan_guzhang.svg')
                      },
                      {
                          id:12,
                          img: require('@/assets/fan/ic_fengshan_weitouru.svg')
                      },
                      {
                          id: 13,
                          img: require('@/assets/fan/ic_fengshan_yuanting.svg')
                      },
                      {
                          id: 14,
                           img: require('@/assets/fan/ic_fengshan_daiji.svg')
                      }
                      
                  ]
              }
          ],
          children: [],
          show: true
      }
    },  
    computed:{
        ...mapState(['showImageHouse','editingNodeId','graphView']),
    },
    updated(){
        
    },
    created(){      
        
        this.handleOpen();
       
    },
    mounted(){       
       this.$refs.dialog.open(this.handleOpen);
       this.$refs.dialog.close(this.handleColse);
    },
    methods:{
        ...mapMutations(['m_showImageHouse',]),
        handleColse(){
             this.m_showImageHouse({show: false});
        },
        handleOpen(){              
            this.imgArr.map((item)=>{
               if(item.selected){
                this.clickStyle(item.id);
               }
            });         
        },
        handleSave(){
            console.log(this.editingNodeId,graphView,dataModel.getDataById(this.editingNodeId));
            dataModel.getDataById(this.editingNodeId)
            let node = dataModel.getDataById(this.editingNodeId);
            this.imgArr.map(item=>{
                if(item.selected){
                    node.setImage(item.img);
                }
            })
            this.handleColse();
        },
        clickStyle(id){           
            this.children = []
            this.imgArr.map((item)=>{
               if(item.id === id){
                 console.log(item);
                 item.selected = true;
                 this.children = item.children;
               }else{
                   item.selected = false;
               }
            });           
            console.log(this.children);
        }
    }
}
</script>
<style scoped lang='scss'>
.imgHouse{
    .box{
        border: 1px solid red;
        overflow: hidden;   
          background: #FFFFFF;
          .el-row{             
              padding:23px 0px;
            .el-col{             
              text-align: center;  
              .img{
                 
                  margin: 0 auto;                 
                  .tit{
                      font-size: 16px;
                      color: #333333;
                  }
              }
          }
          }          
        .left{
            float: left;
            width: 724px;
            
            border: 1px solid #0f0;
            .selected{
                width: 100px;
                height: 100px;
                border: 1px solid #617EFE;                
                background:rgba(97, 127, 247, 0.2);
            }
        }
        .right{
            float: left;
            width: 336px;
           
            .img{
                width: 80px;
                height: 80px;            
                border: 1px dashed rgba(207, 207, 207, 1);
                margin-bottom: 48px !important;
            }
        }
    }
    
}
</style>
<style lang="scss">
.el_dialog_my{   
     .el-dialog__header{
       padding: 0px;
        .title{
         padding: 10px 0px;
        background: #DCDCDC;
        font-size: 16px;
        line-height: 22px;
        text-indent: 21px;
        }
        .el-dialog__headerbtn{
            display: none;
            position: absolute;
            top:2%;
            right: 2%;
        }
    }
    .el-dialog__body{
        background: #F0f0f0;
    }
    .el-dialog__footer{
        background: #F0f0f0;
        text-align: center;
    }
}
</style>