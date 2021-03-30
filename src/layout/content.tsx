import { defineComponent } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';

const name = `${prefix}-content`;

export default defineComponent({
  name,

  components: {
    RenderComponent,
  },

  props: {},

  data() {
    return {};
  },

  methods: {
    renderContent() {
      return this.$slots.default() ? this.$slots.default(null) : '';
    },
  },

  computed: {},

  watch: {},

  render() {
    return (
      <main class="t-layout--content">
        {this.renderContent()}
      </main>
    );
  },
});
