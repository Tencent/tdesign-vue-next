import { defineComponent } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import props from '../../types/aside/props';

const name = `${prefix}-aside`;

export default defineComponent({
  name,

  components: {
    RenderComponent,
  },

  props,

  data() {
    return {};
  },

  methods: {
    renderContent() {
      return this.$slots.default() ? this.$slots.default(null) : '';
    },
  },

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
