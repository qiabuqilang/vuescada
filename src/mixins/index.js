import { mapState, mapMutations } from 'vuex';


export default {
  name: 'mixins', 
  data() {
    return {
      node: {
        id: '',
        name: '',
        type: '',
        position: {
          tit: '位置',
          x: 0,
          y: 0,
        },
        size: {
          tit: '大小',
          width: 0,
          height: 0,
        },
      },
      clickNode: '',    
    };
  },
  computed: {
    ...mapState(['editingNodeId']),
  },
  watch: {  
    editingNodeId() {
      if (this.editingNodeId > 0) {
        this.node.id = this.editingNodeId;
        this.node.name = window.dataModel.getDataById(this.editingNodeId).getStyle('showName');
        this.node.type = window.dataModel.getDataById(this.editingNodeId).getStyle('nodeType');
      } else {
        this.initNodeInfo();
      }
      console.log('正在编辑节点信息', this.node);
    },
  },
  created() {
    
  },
  mounted() { 
    this.handleGraphViewEventListener();
  },
  methods: {
    ...mapMutations(['m_editingNodeId']),
    initNodeInfo() {
      this.node.id = 0;
      this.node.name = '';
      this.node.type = '';
      this.node.position.x = 0;
      this.node.position.y = 0;
      this.node.size.width = 0;
      this.node.size.height = 0;
    },
    /**
     * 
     * 处理图元节点移动位置和大小
     * @params node 图元节点
     * @params e 事件
     */
    listenNodeSizePosition(node, e) {     
      const nodeSize = node.getSize();     
      const nodePosition = window.graphView.lp(e);      
      console.log('Node position is ', nodePosition, 'nodeType is', node.getStyle('nodeType'), nodeSize);
      this.node.position.x = nodePosition.x;
      this.node.position.y = nodePosition.y;
      this.node.size.width = nodeSize.width;
      this.node.size.height = nodeSize.height;
      console.log(this.node);
    },
    /**
     * 
     * 监听画布图元事件信息
     */
    handleGraphViewEventListener() {
      window.graphView.addInteractorListener((e) => {
        if (e.kind === 'clickData') {
          console.log(`${e.data}被单击`, e, 'e.size', e.data.getSize(), 'id', e.data.getId(), this);         
          this.clickNode = e.data;
          this.m_editingNodeId({ id: e.data.getId() });          
          this.listenNodeSizePosition(e.data, e.event);         
        } else if (e.kind === 'doubleClickData') {
          console.log(`${e.data}被双击`);
        } else if (e.kind === 'clickBackground') {
          console.log('单击背景');
          this.m_editingNodeId({ id: 0 });
        } else if (e.kind === 'doubleClickBackground') {
          console.log('双击背景');
        } else if (e.kind === 'beginRectSelect') {
          console.log('开始框选图元');
        } else if (e.kind === 'betweenRectSelect') {
          console.log('正在框选图元');
        } else if (e.kind === 'endRectSelect') {
          console.log('结束框选图元');
        } else if (e.kind === 'beginMove') {
          console.log('开始移动图元');
        } else if (e.kind === 'betweenMove') {          
          console.log('正在移动图元');
          this.listenNodeSizePosition(this.clickNode, e.event);
        } else if (e.kind === 'endMove') {
          console.log('结束移动图元');
          this.listenNodeSizePosition(this.clickNode, e.event);
        } else if (e.kind === 'beginPan') {
          console.log('开始手抓图平移');
        } else if (e.kind === 'betweenPan') {
          this.listenNodeSizePosition(this.clickNode, e.event);
          console.log('正在手抓图平移');
        } else if (e.kind === 'endPan') {
          console.log('结束手抓图平移');
          this.initNodeInfo();
        } else if (e.kind === 'beginEditRect') {
          console.log('开始编辑图元大小和位置');
          this.listenNodeSizePosition(this.clickNode, e.event);
        } else if (e.kind === 'betweenEditRect') {
          console.log('正在编辑图元大小和位置');
          this.listenNodeSizePosition(this.clickNode, e.event);
        } else if (e.kind === 'endEditRect') {
          console.log('结束编辑图元大小和位置');
        } else if (e.kind === 'beginEditPoint') {
          console.log('开始编辑多边形Shape或多点Edge的具体点');
        } else if (e.kind === 'betweenEditPoint') {
          console.log('正在编辑多边形Shape或多点Edge的具体点');
        } else if (e.kind === 'endEditPoint') {
          console.log('结束编辑多边形Shape或多点Edge的具体点');
        } else if (e.kind === 'beginEditRotation') {
          console.log('开始旋转图元');
        } else if (e.kind === 'betweenEditRotation') {
          console.log('正在旋转图元');
        } else if (e.kind === 'endEditRotation') {
          console.log('结束旋转图元');
        } else if (e.kind === 'moveLeft') {
          console.log('左方向键左移图元一个像素');
        } else if (e.kind === 'moveRight') {
          console.log('右方向键右移图元一个像素');
        } else if (e.kind === 'moveUp') {
          console.log('上方向键上移图元一个像素');
        } else if (e.kind === 'moveDown') {
          console.log('下方向键下移图元一个像素');
        } else if (e.kind === 'toggleNote') {
          console.log('切换note标注的展开合并');
        } else if (e.kind === 'toggleNote2') {
          console.log('切换note2标注的展开合并');
        } else if (e.kind === 'beginEditPoints') {
          console.log('开始进入曲线的点编辑状态');
        } else if (e.kind === 'endEditPoints') {
          console.log('结束曲线的点编辑状态');
        } else if (e.kind === 'hover') {
          console.log('鼠标停留');
        } 
      });
    },   
  },
};
