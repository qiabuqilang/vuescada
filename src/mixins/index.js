export default {
  name: 'mixins', 
  data() {
    return {
      
    };
  },
  methods: {
    viewStyle(view) {
      console.log('view is', view);
      
      const style = view.style;
      style.width = '100%';
      style.height = '100%';
      style.border = '3px solid #f00';
    },
  },
};
