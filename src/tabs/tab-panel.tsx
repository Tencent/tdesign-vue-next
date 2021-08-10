import { defineComponent, h, VNodeChild } from 'vue';
import { prefix } from '../config';
import props from './tab-panel-props';

export default defineComponent({
  name: `${prefix}-tab-panel`,

  props: { ...props },
  emits: ['remove'],

  computed: {
    active(): boolean {
      const { value } = this.$parent as any;
      return this.value === value;
    },
  },

  methods: {
    getContent(): VNodeChild {
      if (typeof this.default === 'function') {
        return this.default(h);
      }
      if (typeof this.$slots.default === 'function') {
        return this.$slots.default(null);
      }
      if (typeof this.panel === 'function') {
        return this.panel(h);
      }
      if (typeof this.$slots.panel === 'function') {
        return this.$slots.panel(null);
      }
      return null;
    },
  },

  render() {
    const { renderOnHide, active } = this;
    if (!renderOnHide && !active) return null;
    return (
      <div
        class="t-tab-panel"
        v-show={active}
      >
        {this.getContent()}
      </div>
    );
  },
});
