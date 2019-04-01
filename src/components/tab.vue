<template>
  <div class="tab">
    <el-radio-group v-model="radio">
      <el-radio-button label="属性"></el-radio-button>
      <el-radio-button label="事件"></el-radio-button>
    </el-radio-group>
    <div class="pane proper" v-if="radio==='属性'">
      <div v-if="nodeType==='line'">
              <el-row>
               <el-col :span="12">
                   颜色：
               </el-col>
               <el-col :span="12">
                   <el-color-picker></el-color-picker>
               </el-col>
                </el-row>
                <el-row>
                        <el-col :span="12">
                        粗细：
                    </el-col>
                    <el-col :span="12">
                        <input type="number">
                    </el-col>
                </el-row>
      </div>

      <div v-if="nodeType==='standrad'">
          <el-row>
          <el-col :span="12">填充：</el-col>
          <el-col :span="12">
            <el-color-picker></el-color-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">描边：</el-col>
          <el-col :span="12">
            <el-color-picker></el-color-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">粗细：</el-col>
          <el-col :span="12">
            <input type="number">
          </el-col>
        </el-row>
      </div>

       <div v-if="nodeType==='pipe'">
        <el-row>
          <el-col :span="12">管径：</el-col>
          <el-col :span="12">
            <input type="number">
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="12">颜色：</el-col>
          <el-col :span="12">
            <el-color-picker></el-color-picker>
          </el-col>
        </el-row>
        <div class="line"></div>
        <h3 class="title">流块</h3>
         <el-row>
          <el-col :span="12">块宽（px）：</el-col>
          <el-col :span="12">
            <input type="number">
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">块长(px)：</el-col>
          <el-col :span="12">
            <input type="number">
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">块间距(px)：</el-col>
          <el-col :span="12">
            <input type="number">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">颜色：</el-col>
          <el-col :span="12">
            <el-color-picker></el-color-picker>
          </el-col>          
        </el-row>
        <h3 class="title">流向</h3>
        <select name="" id="">
            <option value="">正向</option>
            <option value="">逆向</option>
        </select>
      </div>

     
    </div>
    <div class="pane event" v-else>
        <div v-if="nodeType==='pipe'">
            <select name="" id="">
            <option value="">请选择变量</option>
            <option value="">逆向</option>
            </select>
             <el-row>
          <el-col :span="12">动态：</el-col>
          <el-col :span="12">
            <input type="number">
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">静态：</el-col>
          <el-col :span="12">
            <input type="number">
          </el-col>
        </el-row>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tab",
  data() {
    return {
      radio: "属性",
      nodeType: 'pipe'
    };
  },
  methods: {}
};
</script>
<style scoped lang='scss'>
.tab {
  text-align: center;
  position: relative;
  overflow: hidden;
  font-size: px2rem(14);
  color: #333333;
  height: px2rem(607);
  background: #DADADA;
  .el-radio-group {
    margin-top: px2rem(30);
  }
  .pane {
    border: 1px solid red;
    padding-top: px2rem(20);
    position: absolute;
    top: px2rem(80);
    left: 0%;
    width: 100%;
    height: auto;
    .title{
        font-size: px2rem(14);
        color: #999999;
        text-align: left;
        text-indent: px2rem(30);
    }
    select{
        width: 80%;
        height: px2rem(30);
        line-height: px2rem(30);
        text-align: center;
        margin-top: px2rem(10);
        option{
            text-align: center;
        }
    }
  }
  .el-row {
    height: px2rem(40);
    line-height: px2rem(40);
    input {
      width: px2rem(80) !important;
      height: px2rem(30) !important;
      line-height: px2rem(30);
    }
    .el-col:nth-child(1) {
      text-align: right;
    }
    .el-col:nth-child(2) {
      text-align: left;
    }
  }
}
</style>
<style lang="scss">
.el-color-picker__trigger {
  width: px2rem(80) !important;
  height: px2rem(30) !important;
}
</style>