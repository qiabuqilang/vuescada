<template>
    <div class='titlemy'>
     <el-row>
         <el-col :span="4">
             <i class="el-icon-arrow-left"></i>
             <span>返回设备</span>
         </el-col>
         <el-col :span="12">
             <h2 class="title">组态设计</h2>                 
         </el-col>
        <el-col :span="8">
            <div class="right" v-for="item of rightArr" :key="item.icon">
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

</style>