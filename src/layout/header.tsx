import Vue from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import props from '../../types/header/props';

const name = `${prefix}-header`;

export default Vue.extend({
  name,

  components: {
    RenderComponent,
  },

  props: { ...props },

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
      <header class="t-layout--header" style={styles}>
        {this.renderContent()}
      </header>
    );
  },
});
