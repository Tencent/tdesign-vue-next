import { defineComponent } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import props from '../../types/footer/props';

const name = `${prefix}-footer`;

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
