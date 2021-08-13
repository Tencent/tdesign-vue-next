import { defineComponent } from 'vue';
import { prefix } from '../config';

const name = `${prefix}-content`;

export default defineComponent({
  name,

  props: {},

  data() {
    return {};
  },

  methods: {
    renderContent() {
      return this.$slots.default() ? this.$slots.default(null) : '';
    },
  },

  render() {
    return (
      <main class="t-layout--content">
        {this.renderContent()}
      </main>
    );
  },
});
