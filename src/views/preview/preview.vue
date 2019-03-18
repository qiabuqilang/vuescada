<template>
    <div class='preview' ref="preview">
      
    </div>
</template>
<script>
import scada from '@/api/scada';
import { setTimeout } from 'timers';
export default {
     name: 'preview', 
    data() {
      return{
          deviceType: 'c8y_MQTTDevice',
          data: '',
          view: ''
      }
    },
    methods:{
        initGraph(){
            scada.getScada('/inventory/managedObjects',{query:`$filter=(type eq 'saveScada' and deviceType eq '${this.deviceType}')$orderby=creationTime desc`}).then(res=>{
                console.log(res);
                if(res.data.managedObjects.length > 0){
                    console.log(JSON);
                    this.data = JSON.parse(res.data.managedObjects[0].scadaString);
                    console.log(this.data);
                    let dataModel = new ht.DataModel(),
                graphView = new ht.graph.GraphView(dataModel);
                this.view = graphView.getView(),     
                this.viewStyle(this.view);        
                dataModel.deserialize(this.data);
                graphView.enableFlow();
                graphView.enableDashFlow();
                graphView.setDisabled(true);
                    
                }
            })
        }
    },
    created(){
        this.initGraph();
    },
    mounted(){
        console.log(this.$refs);
         console.log('routes query',this.$route.query);
        setTimeout(()=>{
            this.$refs.preview.appendChild(this.view);
        },500)
        
    }
}
</script>
<style scoped lang='scss'>
.preview{
    width: 100vw;
    height: 100vh;
}
</style>