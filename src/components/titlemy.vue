<template>
    <div class='titlemy'>
     <el-row>
         <el-col :span="4" class="left">
             <i class="el-icon-arrow-left"></i>
             <span>返回设备</span>
         </el-col>
         <el-col :span="15" class="middle">
             <h2 class="title">组态设计</h2>                 
         </el-col>
        <el-col :span="5" class="right">
            <div v-for="item of rightArr" :key="item.icon">
                <img :src="item.icon" alt="" class="icon">
                <span>{{item.title}}</span>
            </div>
        </el-col>
     </el-row>
    </div>
</template>
<script>
export default {
     name: 'titlemy', 
    data() {
      return{
          rightArr:[
              {
                  icon: require('@/assets/ic_yulan.svg'),
                  title: '预览'
              },
              {
                  icon: require('@/assets/ic_fabu.svg'),
                  title: '发布'
              }
          ]
      }
    },
    methods:{}
}
</script>
<style scoped lang='scss'>
.titlemy{
    width: 100%;
    height: px2rem(60);
    border: 1px solid #000;
    font-size: px2rem(16);
    line-height: px2rem(60);
    background: #2E2E2E;
    color: #fff;
    .left{
        text-align: left;
        text-indent: px2rem(26);
    }
    .middle{
        font-size: px2rem(20);
        text-align: center;
    }
    .right{
        div{
            border: 1px solid #91A5FF;
            color: #91A5FF;           
            width: px2rem(78);
            height: px2rem(30);
            line-height: px2rem(30);
            float:left;           
            margin: px2rem(10) px2rem(16);
            padding: px2rem(2) px2rem(5);
            img{
                width: px2rem(20);
                height: px2rem(20);
                float:left;
                margin-top:px2rem(4);
            }
          
        }
        div:hover{
            background: #617EFE;
            color: #fff;
            i{
                color: #fff;
            }
        }
    }
}
</style>