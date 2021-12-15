import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './aside-props';

const name = `${prefix}-aside`;

export default defineComponent({
  name,

  inject: {
    layout: {
      default: undefined,
    },
  },

  props,

  data() {
    return {};
  },

  mounted() {
    this.layout.hasSider = true;
  },

  unmounted() {
    this.layout.hasSider = false;
  },

  methods: {
    renderContent() {
      return this.$slots.default() ? this.$slots.default(null) : '';
    },
  },

  render() {
    const styles = this.width ? { width: this.width } : {};
    return (
      <aside class="t-layout__sider" style={styles}>
        {this.renderContent()}
      </aside>
    );
  },
});
