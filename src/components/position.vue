<template>
    <div class='position'>
        <h3 class="title">
            名称&nbsp;&nbsp;<span v-if="node">{{node.name}}</span>
        </h3>
        <div class="box">         
            <div class="content" v-for="item of node" :key="item.tit">
                
                <div v-if="item.tit==='位置'">
                    <span class="tit">{{item.tit}}</span>
                     <input type="number" v-model="item.x" readonly>
                    <input type="number" v-model="item.y" readonly>
                </div>
                <div v-if="item.tit==='大小'">
                    <span class="tit">{{item.tit}}</span>
                    <input type="number" v-model="item.width" readonly>
                    <input type="number" v-model="item.height" readonly>
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
        clickNode: '',
        testX: 0,
        arrPS: [
            {
            tit: '位置',
            x: 0,
            y: 0,
            },
            {
            tit: '大小',
            width: 0,
            height: 0,
            },
        ],
      }
    },
    props:{
        node: {
            type: Object,
            default: '',
        }
    },
    watch:{
        node(){
            console.log("监听node si",node);
        }
    },
    mounted(){
        /* setInterval(() => {
            this.testX++;
        }, 500); */
    },
    methods:{
       handleTest(){
          this.testY = 2134324;
       }
    }
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
        background: #F7F7F7;
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