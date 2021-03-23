import Vue, { VNode } from 'vue';
import { CreateElement } from 'vue/types/umd';
import { prefix } from '../config';
import props from '@TdTypes/tab-panel/props';

export default Vue.extend({
  name: `${prefix}-tab-panel`,

  props: { ...props },

  computed: {
    active(): boolean {
      const { value } = this.$parent as any;
      return this.value === value;
    },
  },

  methods: {
    getContent(h: CreateElement): VNode | VNode[] {
      if (typeof this.default === 'function') {
        return this.default(h);
      }
      if (typeof this.$scopedSlots.default === 'function') {
        return this.$scopedSlots.default(null);
      }
      if (typeof this.panel === 'function') {
        return this.panel(h);
      }
      if (typeof this.$scopedSlots.panel === 'function') {
        return this.$scopedSlots.panel(null);
      }
      return null;
    },
  },

  render(h) {
    const { renderOnHide, active } = this;
    if (!renderOnHide && !active) return null;
    return (
      <div
        class="t-tab-panel"
        v-show={active}
      >
        {this.getContent(h)}
      </div>
    );
  },
});
