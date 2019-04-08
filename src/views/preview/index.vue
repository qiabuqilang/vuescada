<template>
  <div class="preview" ref="preview"></div>
</template>
<script>
import scada from "@/api/scada";
import { mapState, mapMutations } from "vuex";
export default {
  name: "preview",
  data() {
    return {
      deviceType: "c8y_MQTTDevice",
      deviceId: '166143',
      data: "",
      viewPreview: "",
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
      wsdata: ""
    };
  },
  computed: {
    ...mapState(["previewData"])
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
            let dataModel = new ht.DataModel(),
              graphView = new ht.graph.GraphView(dataModel);
            this.viewPreview = graphView.getView();
            dataModel.deserialize(this.data);
            graphView.enableFlow();
            graphView.enableDashFlow();
            graphView.setDisabled(true);
          }
        });
    },
    previewGraph() {
      console.log("previewData is ", this.previewData);
      let dataModel = new ht.DataModel(),
        graphView = new ht.graph.GraphView(dataModel);
      this.viewPreview = graphView.getView();
      this.viewPreview.className = "viewPreview";
      dataModel.deserialize(this.data);
      graphView.setZoomable(false);
      graphView.enableFlow();
      graphView.enableDashFlow();
      graphView.setDisabled(true);
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
          this.ws.send(JSON.stringify(this.subscribe(`/measurements/${this.deviceId}`, "3")));
        }
      if(typeof(this.wsdata.data) === 'object' && this.wsdata.id > 3){
            this.handleReDraw(this.wsdata);
        }
      };
    },
    handleReDraw(wsdata){
        console.log('handleReDraw',wsdata);
        this.data.d.map(item=>{
            if(item.s.binding_var === wsdata.type){
                switch(item.s.nodeType){
                    case 'yezhu':
                    
                    break;
                    case 'text':
                    break;
                    case 'pipe':
                    break;
                    case 'state':
                    break;
                }
            }
        })
    }
  },
  created() {
    this.data = Object.assign(this.previewData,{});
    this.previewGraph();
    // this.handleWs();
  },
  mounted() {
    // data: "[{"data":{"realtimeAction":"CREATE","data":{"time":"2019-04-08T15:00:03.491+08:00","id":"10323400","self":"http://xiayuanchun.quarkioe.cn/measurement/measurements/10323400","source":{"id":"166143","self":"http://xiayuanchun.quarkioe.cn/inventory/managedObjects/166143"},"type":"yali","yali":{"d":{"unit":"mp","value":1}}}},"channel":"/measurements/166143","id":"1704226"}]"

    console.log("routes query", this.$route.query);
    this.$refs.preview.appendChild(this.viewPreview);
  },
  destroyed(){
      this.ws.close();
  }
};
</script>
<style scoped lang='scss'>
.preview {
  width: 100%;
  height: px2rem(500);
  border: 1px solid red;
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