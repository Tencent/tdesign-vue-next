import Vue from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';

const name = `${prefix}-content`;

export default Vue.extend({
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
      return this.$scopedSlots.default ? this.$scopedSlots.default(null) : '';
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
