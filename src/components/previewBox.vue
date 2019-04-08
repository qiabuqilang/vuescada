<template>
    <div class='previewBox'>
      <el-dialog :visible="showPreview" width="85%" ref="preview" class="preview_box_my">
           <div slot="title" class="title">
              画面预览
          </div>
          <div class="box">
              <preview/>
          </div>
          <div class="button">
              <el-button @click="handleClose()">关闭</el-button>
              <el-button @click="handleSubmit()">发布</el-button>
          </div>
      </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex';
import preview from '@/views/preview';
export default {
    name: 'previewBox', 
    components:{
        preview
    },
    data() {
      return{}
    },
    computed:{
        ...mapState(['showPreview'])
    },
    methods:{
        ...mapMutations(['m_showPreview']),
        handleClose(){
            this.m_showPreview({showPreview: false});
        },
        handleSubmit(){

        }
    }
}
</script>
<style scoped lang='scss'>
.previewBox{
   
}
</style>
<style lang="scss">
.preview_box_my{   
     .el-dialog__header{
       padding: 0px;
        .title{
        padding: 20px 0px;
        background: #DCDCDC;
        font-size: 16px;
        line-height: 22px;
        text-indent: 21px;
        color: #333333;
        }
        .el-dialog__headerbtn{
            display: none;
            position: absolute;
            top:2%;
            right: 2%;
        }
    }
    .el-dialog__body{
        border: 1px solid red;
        background: #F0f0f0;
        .button{           
            position: absolute;
            top: 0%;
            right: 3%;
        }
        .box{
            width: 95%;
            margin: 0 auto;
            background: #fff;

        }
    }
    .el-dialog__footer{
        background: #F0f0f0;
        text-align: center;
    }
}
</style>