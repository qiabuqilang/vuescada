<template>
    <div class='alertmy'>
      <el-dialog :visible="showAlertmy" class="showAlertmy" width="30%" center>
          <div class="box">
              <img :src="error" alt="" class="img">
              <p class="info">发布后，将更新本设备模板下的所有设备，操作不可逆，请慎重选择</p>
              <div class="button">
                  <el-button @click="handleClose()">取消</el-button>
                  <el-button @click="handlePublish()" type="primary">确定</el-button>
              </div>
          </div>
           <el-dialog
            width="30%"
            :visible.sync="innerVisible"
           class="innerDialog" append-to-body>
                <div class="box" style="text-align:center;">
                    <img :src="success" alt="" class="img">
                      <div class="button" style="margin-top: 10px;">
                        <el-button @click="handleConfirm()" type="primary">Ok</el-button>
                      </div>
                </div>
            </el-dialog>
      </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex';
export default {
    name: 'alertmy', 
    computed:{
        ...mapState(['showAlertmy'])
    },
    data() {
      return{
          error: require('@/assets/ic_jinggao.svg'),
          success: require('@/assets/ic_succeed.svg'),
          innerVisible: false
      }
    },
    methods:{
        ...mapMutations(['m_showAlertmy','m_savePublishData']),
        handleClose(){
            this.m_showAlertmy({showAlertmy: false});
        },
        handlePublish(){
            
            this.innerVisible = true;
        },
        handleConfirm(){
            this.innerVisible = !this.innerVisible;
            this.m_showAlertmy({showAlertmy: false});
        }
    }
}
</script>
<style scoped lang='scss'>
.alertmy{
    .box{
        text-align: center;
        .img{
            margin: 0 auto;           
        }
        .info{
            line-height: px2rem(20);
            text-align: left;
        }
    }
    .innerDialog{
        border: 1px solid red !important;
        .box{
            text-align: center;
        }
    }
}
</style>
<style lang="scss">
.showAlertmy{   
     .el-dialog__header{
       padding: 0px;       
        .el-dialog__headerbtn{
            display: none;
            position: absolute;
            top:2%;
            right: 2%;
        }
    }
}
</style>