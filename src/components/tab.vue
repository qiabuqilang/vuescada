<template>
  <div class="tab"> 
    <el-radio-group v-model="radio">
      <el-radio-button label="属性"></el-radio-button>
      <el-radio-button label="事件"></el-radio-button>
    </el-radio-group>
    <div class="pane proper" v-if="radio==='属性'">
      <div v-if="node.type==='line'">
              <el-row>
               <el-col :span="12">
                   颜色：
               </el-col>
               <el-col :span="12">
                   <el-color-picker class="row_color_picker" v-model="line.color" @change="handleChange('line','color',line.color)"></el-color-picker>
               </el-col>
                </el-row>
                <el-row>
                        <el-col :span="12">
                        粗细：
                    </el-col>
                    <el-col :span="12">
                        <input type="number" v-model="line.width" @change="handleChange('line','width',line.width)">
                    </el-col>
                </el-row>
      </div>

      <div v-if="node.type==='standard'">
          <el-row>
          <el-col :span="12">填充：</el-col>
          <el-col :span="12">
            <el-color-picker class="row_color_picker" v-model="standard.background" @change="handleChange('standard','background',standard.background)"></el-color-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">描边：</el-col>
          <el-col :span="12">
            <el-color-picker class="row_color_picker" v-model="standard.borderColor" @change="handleChange('standard','borderColor',standard.borderColor)"></el-color-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">粗细：</el-col>
          <el-col :span="12">
            <input type="number" v-model="standard.borderWidth" @change="handleChange('standard','borderWidth',standard.borderWidth)">
          </el-col>
        </el-row>
      </div>

       <div v-if="node.type==='pipe'">
        <el-row>
          <el-col :span="12">管径：</el-col>
          <el-col :span="12">
            <input type="number" v-model="pipe.borderWidth" @change="handleChange('pipe','borderWidth',pipe.borderWidth)">
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="12">颜色：</el-col>
          <el-col :span="12">
            <el-color-picker class="row_color_picker" v-model="pipe.borderColor" @change="handleChange('pipe','borderColor',pipe.borderColor)"></el-color-picker>
          </el-col>
        </el-row>
        <div class="line"></div>
        <h3 class="title">流块</h3>
         <el-row>
          <el-col :span="12">块宽（px）：</el-col>
          <el-col :span="12">
            <input type="number" v-model="pipe.dashWidth" @change="handleChange('pipe','dashWidth',pipe.dashWidth)">
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">块长(px)：</el-col>
          <el-col :span="12">
            <input type="number" v-model="pipe.blockLength" @change="handleChange('pipe','blockLength',pipe.blockLength)">
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">块间距(px)：</el-col>
          <el-col :span="12">
            <input type="number" v-model="pipe.blockSpacing" @change="handleChange('pipe','blockSpacing',pipe.blockSpacing)">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">颜色：</el-col>
          <el-col :span="12">
            <el-color-picker class="row_color_picker" v-model="pipe.dashColor" @change="handleChange('pipe','dashColor',pipe.dashColor)"></el-color-picker>
          </el-col>          
        </el-row>
        <h3 class="title">流向</h3>
        <select v-model="pipe.flowDirection" @change="handleChange('pipe','flowDirection',pipe.flowDirection)">
            <option value="true">正向</option>
            <option value="false">逆向</option>
        </select>
      </div>

      <div v-if="node.type==='yezhu'">
         <el-row>
          <el-col :span="12">填充颜色：</el-col>
          <el-col :span="12">
            <el-color-picker class="row_color_picker" v-model="yezhu.background" @change="handleChange('yezhu','background',yezhu.background)"></el-color-picker>
          </el-col>
        </el-row>
      </div>

      <div v-if="node.type==='text'" class="text">
        <el-row>
          <el-col :span="8">文本字号</el-col>
          <el-col :span='16'>
            <select name="" id="" class="size" v-model="text.fontSize" @change="handleChange('text','fontSize',text.fontSize)">
              <option :value="item" v-for="item of arrFontSize" :key="item">{{item}}</option>
            </select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='8'>文本样式</el-col>
          <el-col :span='4'>
            <el-color-picker class="text_color_picker" v-model="text.color" @change="handleChange('text','color',text.color)"></el-color-picker>
          </el-col>
          <el-col :span='4' v-for="item of arrFontStyle" :key="item.img">
            <img :src="item.img" alt="" @click="changeFontStyle(item)" :class="[item.clicked?'clicked':'']">
          </el-col>
        </el-row>
      </div>

      <div v-if="node.type==='state'" class="state">
         <el-button class="chooseImg" @click="chooseImg()">选择样式</el-button>
      </div>
    </div>


    <div class="pane event" v-else>
        <div v-if="node.type==='pipe'">
            <select name="" id="" v-model="pipe.event.var" @change="handleEvent('pipe','var',pipe.event.var)">
            <option value="">请选择变量</option>
            <option v-for="item of supportedMeasurements" :key="item" :value="item">{{item}}</option>
            </select>
             <el-row>
          <el-col :span="12">动态：</el-col>
          <el-col :span="12">
            <input type="number" v-model="pipe.event.max" @change="handleEvent('pipe','max',pipe.event.max)">
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">静态：</el-col>
          <el-col :span="12">
            <input type="number" v-model="pipe.event.min" @change="handleEvent('pipe','min',pipe.event.min)">
          </el-col>
        </el-row>
        </div>

        <div v-if="node.type==='yezhu'">
            <select name="" id="" v-model="yezhu.event.var" @change="handleEvent('yezhu','var',yezhu.event.var)">
            <option value="">请选择变量</option>
            <option :value="item" v-for="item of supportedMeasurements" :key="item">{{item}}</option>
            </select>
             <el-row>
          <el-col :span="12">最大值：</el-col>
          <el-col :span="12">
            <input type="number" v-model="yezhu.event.max" @change="handleEvent('yezhu','max',yezhu.event.max)">
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">最小值：</el-col>
          <el-col :span="12">
            <input type="number" v-model="yezhu.event.min" @change="handleEvent('yezhu','min',yezhu.event.min)">
          </el-col>
        </el-row>
        </div>

        <div v-if="node.type==='text'">
           <select name="" id="" v-model="text.event.var" @change="handleEvent('text','var',text.event.var)">
            <option value="">请选择变量</option>
            <option :value="item" v-for="item of supportedMeasurements" :key="item">{{item}}</option>
            </select>
        </div>

        <div v-if="node.type==='state'" class="state">
           <select name="" id="" v-model="state.event.var" @change="handleEvent('state','var',state.event.var)">
            <option value="">请选择变量</option>
            <option :value="item" v-for="item of supportedMeasurements" :key="item">{{item}}</option>
            </select>
            <el-row v-for="(item,index) of stateEvent" :key="item.img" style="margin:15px">
              <el-col :span="8">
                <img :src="item.img" alt="" class="img_event">
              </el-col>
              <el-col :span="16">
                <input type="number" v-model="state.event.imgVar[index]" @change="handleEvent('state',`imgVar_${item.id}`,state.event.imgVar[index])">
              </el-col>
            </el-row>
        </div>
    </div>
    <imgHouse v-if="showImageHouse"/>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import imgHouse from '@/components/imgHouse';
import configScada from '@/config/scada';
import device from '@/api/device';
export default {
  name: "tab",
  components:{
    imgHouse
  },
  computed:{
    ...mapState(['showImageHouse']),
    nodeId(){
      return this.node.id;
    },
    nodeInfo(){
     return window.dataModel.getDataById(this.node.id);
    }
  },
  watch:{
    nodeId(){
      console.log('watch nodeid');
      if(this.node.id>0){
      switch(this.node.type){
        case 'line':
          this.line.color = this.nodeInfo.getStyle(configScada.attr.line.color);
          this.line.width = this.nodeInfo.getStyle(configScada.attr.line.width);
        break;
        case 'standard':
          this.standard.background = this.nodeInfo.getStyle(configScada.attr.standard.background);
          this.standard.borderColor = this.nodeInfo.getStyle(configScada.attr.standard.borderColor);
          this.standard.borderWidth = this.nodeInfo.getStyle(configScada.attr.standard.borderWidth);
        break;
        case 'pipe':
          this.pipe.borderWidth = this.nodeInfo.getStyle(configScada.attr.pipe.borderWidth);
          this.pipe.borderColor = this.nodeInfo.getStyle(configScada.attr.pipe.borderColor);
          this.pipe.dashWidth = this.nodeInfo.getStyle(configScada.attr.pipe.dashWidth);
          this.pipe.blockLength = this.nodeInfo.getStyle(configScada.attr.pipe.blockLength)[0];
          this.pipe.blockSpacing = this.nodeInfo.getStyle(configScada.attr.pipe.blockSpacing)[1];
          this.pipe.dashColor = this.nodeInfo.getStyle(configScada.attr.pipe.dashColor);
          this.pipe.flowDirection = this.nodeInfo.getStyle(configScada.attr.pipe.flowDirection);
        break;
        case 'yezhu':        
        this.yezhu.background = this.nodeInfo.getImage().comps[1].background;
        break;
        case 'text':
        this.dom = $(this.nodeInfo.getHtml())[0];      
        this.text.fontSize = parseInt(this.dom.style.fontSize);
        this.text.color = this.dom.style.color;
        this.dom.style.fontSize = this.text.fontSize+'px';
        this.dom.style.color = this.text.color;
        this.nodeInfo.setHtml(this.dom);
        break;
      }
    }
    }
  },
  props:{
    node: {
      type: Object,
      default: ''
    }
  },
  data() {
    const arrFontSize = ()=>{
      let arr = [];
      for(let i = 12;i<=72;i++){
        arr.push(i);
      }
      return arr;
    }
    return {
      radio: "属性",   
      dom: ''  ,
      arrFontSize: arrFontSize(),
      supportedMeasurements:[],
      line:{
        color: '',
        width: ''
      },
      standard:{
        background: '',
        borderColor:'',
        borderWidth:''
      },
      pipe:{
        borderWidth: '',
        borderColor: '',
        dashWidth: '',
        blockLength:'',
        blockSpacing: '',
        dashColor: '',
        flowDirection:'',
        event:{
          var:'',
          max:'',
          min:''
        }
      },
      yezhu:{
        background: '',
        event:{
          var: '',
          max:'',
          min:''
        }
      },
      text:{
        fontSize: '',
        color: '',
        fontWeight: '',
        fontStyle:'',
        textDecoration: '',
        event:{
          var:''
        }
      },
      state:{
        event:{
          var:'',
          imgVar:[]
        }
      },
      arrFontStyle: [
        {
          img: require('@/assets/ic_bold.svg'),
          type: 'bold',
          clicked: false,
        },
        {
          img: require('@/assets/ic_italic.svg'),
          type: 'italic',
          clicked: false,
        },
        {
          img: require('@/assets/ic_underline.svg'),
          type: 'underline',
          clicked: false
        }
      ],
      stateEvent: configScada.arrImgHouse[0].children
    };
  }, 
  created(){
    this.getDeviceList();
  },
  methods: {
    ...mapMutations(['m_showImageHouse']),
    /**
     * 
     * 获取设备列表
     */
    getDeviceList(){
        device.getDeviceList({'type':'c8y_MQTTDevice'}).then(res=>{
            if(res.data.managedObjects.length>0){
                console.log(res.data.managedObjects);
                device. getSupportedMeasurements(166143,'').then(res=>{
                   if(res.data.c8y_SupportedSeries.length>0){                   
                     res.data.c8y_SupportedSeries.map(item=>{
                      
                       this.supportedMeasurements.push(item);
                     })
                     console.log('supportedMeasurements',this.supportedMeasurements);
                   }
                })
            }
        })
    },     
    handleChange(type,attr,value) {
      switch(type){
        case 'pipe':
          switch(attr){
            case 'blockLength':
            this.nodeInfo.setStyle(configScada.attr[type][attr],[value,this.nodeInfo.getStyle(configScada.attr[type][attr])[1]])
            break;
            case 'blockSpacing':
            this.nodeInfo.setStyle(configScada.attr[type][attr],[this.nodeInfo.getStyle(configScada.attr[type][attr])[0],value])
            break;
            default:
            this.nodeInfo.setStyle(configScada.attr[type][attr],value)
            break;
          }
        break;
        case 'yezhu':
          let img =this.nodeInfo.getImage();
          img.comps[1].background = value;
          this.nodeInfo.setImage(img);
          console.log('img is ',img);
        break;
        case 'text':
            this.handleText();          
        break;
        default:
          this.nodeInfo.setStyle(configScada.attr[type][attr],value)
        break;
      }
      
    },
    handleEvent(type,key,value){
      if(!this.nodeInfo){
        return '';
      }
      console.log(type,key,value);
      this.nodeInfo.setStyle(`binding_${key}`,value)
      console.log('after binding is',this.nodeInfo);
    },

    changeFontStyle(item){
      console.log(item);
      item.clicked = !item.clicked;      
      switch(item.type){
        case "bold":
        if(item.clicked){
          this.text.fontWeight = 'bold';         
        }else{
          this.text.fontWeight = 'normal';
        }
        break;
        case 'italic':
        if(item.clicked){
          this.text.fontStyle = 'italic'
        }else{
          this.text.fontStyle = 'normal'
        }
        break;
        case 'underline':
        if(item.clicked){
          this.text.textDecoration = 'underline';
        }else{
          this.text.textDecoration = 'none';
        }
        break;
      } 
      console.log('asdfasfa',this.text);
      this.handleText();
    },
    handleText(){
      this.dom = $(this.nodeInfo.getHtml())[0];
      this.dom.style.fontWeight = this.text.fontWeight;      
      this.dom.style.fontStyle = this.text.fontStyle;
      this.dom.style.textDecoration = this.text.textDecoration;
      console.log('this.dom is',this.dom,this.dom.style.fontWeight);
      this.nodeInfo.setHtml(this.dom);
    },
    chooseImg(){
      console.log(this.showImageHouse);
      this.m_showImageHouse({show: !this.showImageHouse});
    }
  }
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
  background: $mainBgColor;
  .el-radio-group {
    margin-top: px2rem(30);
  }
  .pane {    
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
    .row_color_picker {     
      .el-color-picker__trigger{
        width: px2rem(80) !important;
        height: px2rem(30) !important;
      }
    }
    .text{    
      img{
        border: 1px dashed solid;        
        background: #fff;
        width: px2rem(30);
        height: px2rem(30);
        margin-top: px2rem(4);
        &:hover{
          cursor: pointer;
        }
        &.clicked{
          background: #617EFE;
        }
      }
    }
    .state{
      .chooseImg{
        width: 80%;
      }
      .img_event{
        width: px2rem(30);
        height: auto;
        padding-top: px2rem(5);        
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

</style>