import { DefineComponent } from 'vue';
import { prefix } from '../config';

const name = prefix + '-<%= component %>';

export default DefineComponent({
  name,
  props: {
    
  },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  mounted() {},

  render() {
    return <div></div>
  }

});
