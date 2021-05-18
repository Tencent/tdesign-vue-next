import { defineComponent } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import props from '@TdTypes/header/props';

const name = `${prefix}-header`;

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
      <header class="t-layout--header" style={styles}>
        {this.renderContent()}
      </header>
    );
  },
});
