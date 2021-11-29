import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './footer-props';

const name = `${prefix}-footer`;

export default defineComponent({
  name,

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
    const styles = this.height ? { height: this.height } : {};
    return (
      <footer class="t-layout--footer" style={styles}>
        {this.renderContent()}
      </footer>
    );
  },
});
