import Vue from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import props from '../../types/aside/props';

const name = `${prefix}-aside`;

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
    const styles = this.width ? {
      height: this.width,
    } : {};
    return (
      <aside class="t-layout--sider" style={styles}>
        {this.renderContent()}
      </aside>
    );
  },
});
