<template>
    <div class='position'>
        <h3 class="title">
            名称&nbsp;&nbsp;<span v-if="node">{{node.name}}</span>
        </h3>
        <div class="box">         
            <div class="content" v-for="item of arrPS" :key="item.tit">
                
                <div v-if="item.tit==='位置'">
                    <span class="tit">{{item.tit}}</span>
                     <input type="number" v-model="item.x">
                    <input type="number" v-model="item.y">
                </div>
                <div v-else>
                    <span class="tit">{{item.tit}}</span>
                    <input type="number" v-model="item.width">
                    <input type="number" v-model="item.height">
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
export default {
     name: 'position', 
    data() {
      return{
         
      }
    },
    mounted(){
        /* setInterval(() => {
            this.testX++;
        }, 500); */
    },
    methods:{}
}
</script>
<style scoped lang='scss'>
.position{
    .title{
        height: px2rem(50);
        line-height: px2rem(50);
        font-size: px2rem(16);
        font-weight: normal;
        background: #fff;
    }
    .box{
        background: #979797;
        padding: px2rem(20) px2rem(10);
        .content{
           span{              
               font-size:px2rem(14);
           }
           div{             
            input{            
               width: px2rem(80);
               height: px2rem(30);
               text-align: center;
               border: 1px solid #DADADA;
            }
           }
         
        }
    }
}
</style>