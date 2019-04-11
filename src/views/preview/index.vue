<template>
  <div class="preview" ref="preview"></div>
</template>
<script>
import scada from "@/api/scada";
import { mapState, mapMutations } from "vuex";
import scadaConfig from '@/config/scada';
export default {
  name: "preview",
  data() {
    return {    
      data: "",  
      graphView:'',
      dataModel:'',
      viewPreview:'',
      ws: new WebSocket("wss://xiayuanchun.quarkioe.cn/cep/realtime"),
      handshake: {
        advice: {
          timeout: 60000,
          interval: 0
        },
        channel: "/meta/handshake",
        ext: {
          "com.cumulocity.authn": {
            token: window.btoa("xiayuanchun/xiayuanchun:hello@123")
          }
        },
        id: "1",
        minimumVersion: "1.0",
        supportedConnectionTypes: ["ws", "long-polling"],
        version: "1.0"
      },
      wsdata: "",
      dom:''
    };
  },
  computed: {
    ...mapState(["previewData",'deviceId','deviceType'])
  },
  methods: {
    getAsyncGraph() {
      scada
        .getScada("/inventory/managedObjects", {
          query: `$filter=(type eq 'saveScada' and deviceType eq '${
            this.deviceType
          }')$orderby=creationTime desc`
        })
        .then(res => {
          console.log(res);
          if (res.data.managedObjects.length > 0) {
            console.log(JSON);
            this.data = JSON.parse(res.data.managedObjects[0].scadaString);
            console.log(this.data);
            this.dataModel = new ht.DataModel();
            this.graphView = new ht.graph.GraphView(dataModel);
            this.viewPreview = graphView.getView();
          }
        });
    },
    previewGraph() {    
      this.dataModel = Object.assign(window.dataModel,{});
      this.graphView = new ht.graph.GraphView(this.dataModel);
    //   this.dataModel = this.graphView.getDataModel();
      this.viewPreview = this.graphView.getView();
      this.viewPreview.className = "viewPreview"; 
      this.data = this.dataModel.getDatas();   
      console.log('this.data',this.data,this.dataModel,this.graphView);
    //   this.dataModel.deserialize(this.previewData);
    },
    subscribe(sub, id) {
      return {
        channel: "/meta/subscribe",
        clientId: this.wsdata.clientId,
        id: id,
        subscription: sub
      };
    },
    handleWs() {
      this.ws.onopen = () => {
        this.ws.send(JSON.stringify(this.handshake));
      };
      this.ws.onmessage = evt => {
        console.log("收到信息为", evt);
        this.wsdata = JSON.parse(evt.data)[0];
        console.log(this.wsdata);
        if (this.wsdata.successful && this.wsdata.id === "1") {
          let connect = {
            advice: {
              timeout: 0
            },
            channel: "/meta/connect",
            clientId: this.wsdata.clientId,
            connectionType: "websocket",
            id: "2"
          };
          this.ws.send(JSON.stringify(connect));
          this.ws.send(
            JSON.stringify(
              this.subscribe(`/measurements/${this.deviceId}`, "3")
            )
          );
        }
        if (typeof this.wsdata.data === "object" && this.wsdata.id > 3) {
          this.handleReDraw(this.wsdata.data.data);
        }
      };
    },
    handleReDraw(wsdata) {
      console.log("handleReDraw", wsdata, "this.data", this.data);
      this.data.each(item=>{      
        let n = 10;      
        //  item.s('drawPoints',[0, 200, 0, 50, 100, 50, 100, 200]);
       /*  setInterval(()=>{
            console.log('item is',item,item.s('drawPoints'));
            item.s('drawPoints',[0, 200, 0, n, 100, n, 100, 200]);
            n ++;
        },500) */
        let value = parseInt(wsdata[wsdata.type].d.value);
        console.log('item.s.binding_var',item.s('binding_var'),'wsdata.type',wsdata.type,item);
         if (item.s('binding_var') === wsdata.type) {
          switch (item.s('nodeType')) {
            case "yezhu":
                console.log('获取数值',value,'计算百分比',parseInt((200*value)/item.s('binding_max')));
                item.s('drawPoints',[0, 200, 0, parseInt((200*value)/item.s('binding_max')), 100, parseInt((200*value)/item.s('binding_max')), 100, 200])
              break;
            case "text":
                this.dom = $(item.getHtml())[0];                 
                console.log('this.dom is',this.dom,this.dom.style.fontWeight);
                this.dom.value = `${wsdata.type}:${value}`;
                item.setHtml(this.dom);
              break;
            case "pipe":
                if(parseInt(wsdata[wsdata.type].d.value)===parseInt(item.s('binding_max'))){
                    item.s("shape.dash.flow", true);
                }else{
                    item.s("shape.dash.flow", false);
                }

              break;
            case "state":
                    console.log('state map is',item.getStyleMap());
                    let preg = /^binding_imgVar_\d+$/;
                    for(let i in item.getStyleMap()){
                        console.log('state every is',i,item.getStyle(i));
                        console.log('match is',preg.test(i));
                        if(preg.test(i) && parseInt(item.getStyle(i)) === value){   
                            let tempArr = i.split('_');
                            console.log('tempArr',tempArr);
                            let img = (scadaConfig.arrImgHouse.map(imgArr=>{
                                if(imgArr.children.length>0){
                                    return imgArr.children.find(img=>{
                                      
                                       return parseInt(img.id) === parseInt(tempArr[2])
                                        });
                                }
                            }));                        
                            item.setImage(img[0].img);
                        }
                    }
              break;
            }
         }
        })
     
    }
  },
  created() {   
    this.previewGraph();
    this.handleWs();
  },
  mounted() {
    // data: "[{"data":{"realtimeAction":"CREATE","data":{"time":"2019-04-08T15:00:03.491+08:00","id":"10323400","self":"http://xiayuanchun.quarkioe.cn/measurement/measurements/10323400","source":{"id":"166143","self":"http://xiayuanchun.quarkioe.cn/inventory/managedObjects/166143"},"type":"yali","yali":{"d":{"unit":"mp","value":1}}}},"channel":"/measurements/166143","id":"1704226"}]"
    this.$refs.preview.appendChild(this.viewPreview); 
    this.graphView.setZoomable(false);
    this.graphView.enableFlow();
    this.graphView.enableDashFlow();
    this.graphView.setDisabled(true);
    // this.graphView.fitContent(true)
  },
  destroyed() {
    this.ws.close();
  }
};
</script>
<style scoped lang='scss'>
.preview {
  width: 100%;
  height: px2rem(500);
 
}
</style>
<style lang="scss">
.viewPreview {
  width: 90%;
  height: 80%;
  div {
    background: none !important;
  }
}
</style>