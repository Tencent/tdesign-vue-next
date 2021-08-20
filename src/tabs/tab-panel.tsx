import { defineComponent, h, VNodeChild, getCurrentInstance } from 'vue';
import { prefix } from '../config';
import props from './tab-panel-props';

const name = `${prefix}-tab-panel`;

export default defineComponent({
  name,

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
    const instance = getCurrentInstance();
    const { destroyOnHide, active } = (instance as any).ctx;
    if (!destroyOnHide && !active) return null;
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
