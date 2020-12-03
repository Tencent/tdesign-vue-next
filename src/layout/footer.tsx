import Vue from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';

const name = `${prefix}-footer`;

export default Vue.extend({
  name,

  components: {
    RenderComponent,
  },

  props: {
    height: {
      type: String,
    },
  },

  data() {
    return {};
  },

  methods: {
    renderContent() {
      return this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
    },
  },

  computed: {},

  watch: {},

  render() {
    const styles = this.height ? {
      height: this.height,
    } : {};
    return (
      <footer class="t-layout--footer" style={styles}>
        {this.renderContent()}
      </footer>
    );
  },
});
