<template>
    <div class='imgHouse'>            
     <el-dialog     
      :visible.sync="show"  
      width="85%"   
      class="el_dialog_my">    
      <div slot="title" class="title">
          样式库
      </div>  
      <div class="box">
          <div class="left">
              <el-row>
                <el-col :span="4" v-for="item of imgArr" :key="item.img" @click="clickStyle(item.id)">
                    <div class="img">
                        <img :src="item.img" alt="">
                        <h3>{{item.name}}</h3>
                    </div>
                </el-col>
            </el-row>
          </div>
          <div class="right">
            <el-row>
                <el-col :span="8" v-for="item of children" :key="item.img">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                </el-col>
            </el-row>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="show = false">保存</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>

export default {
     name: 'imgHouse', 
    data() {
      return{
          imgArr:[
              {
                  id: 1,
                  name:"风机",
                  img: require('@/assets/pilotlamp/ic_lamp_state1.svg'),
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
              }
          ],
          children: [],
          show: false
      }
    },
    props:{
        showImageHouse:{
            type: Boolean,
            default: false
        }
    },
    created(){
        // this.show = this.showImageHouse;
        this.show = true;
        console.log('this.showImageHouse is',this.showImageHouse);
    },
    methods:{
        clickStyle(id){
            alert(id);
            this.children = this.imgArr.map((item)=>{
                return item.id===id?item.children:'';
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
              border:1px solid red;
              .img{
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
            height: 482px;
            border: 1px solid #0f0;
        }
        .right{
            float: left;
            width: 336px;
            height: 482px;
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
            position: absolute;
            top:5%;
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