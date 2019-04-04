<template>
    <div class='App'>
      <titlemy class="titlemy"/>
      <toolbar :node="node"/>
     
      <div class="main_box">
        <div class="left_box">
          <palette/>
        </div>
        <div class="middle_box">
          <htbox/>
        </div>
        <div class="right_box">
          <position ref="position" :node="node"/>
          <tab :node="node"/>
        </div>
      </div>
    </div>
</template>
<script>
import mixin from '@/mixins';
import titlemy from '@/components/titlemy';
import toolbar from '@/components/toolbar';
import palette from '@/components/palette';
import position from '@/components/position';
import tab from '@/components/tab';
import htbox from '@/views/htbox';
export default {
     name: 'App', 
     mixins: [mixin],
     components:{
       titlemy,toolbar,palette,htbox,position,tab
     },
    data() {
      return{}
    },
    methods:{}
}
</script>
<style scoped lang='scss'>
.App{
  .main_box{
    border: 1px solid #000;
    width: 100%;
    height: px2rem(780);
    .left_box{
      border: 1px solid #000;
      width:19%;
      float: left;
      
    }
    .middle_box{
      // border: 10px solid #0f0;
      width: 61%;
      float: left;
    }
    .right_box{
      // border: 10px solid #00f;
      width:20%;
      float:right;
    }
  }
 
}
</style>