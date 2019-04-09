<template>
    <div class='alert'>
      <el-dialog>
          <div class="box">
              <img :src="error" alt="">
              <p class="info">发布后，将更新本设备模板下的所有设备，操作不可逆，请慎重选择</p>
              <div class="button">
                  <el-button>取消</el-button>
                  <el-button>确定</el-button>
              </div>
          </div>
      </el-dialog>
    </div>
</template>
<script>
export default {
     name: 'alert', 
    data() {
      return{
          error: require('@/assets/ic_jinggao.svg');
      }
    },
    methods:{}
}
</script>
<style scoped lang='scss'>

</style>