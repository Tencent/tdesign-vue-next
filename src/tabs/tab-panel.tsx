import { defineComponent, h, VNodeChild, getCurrentInstance } from 'vue';
import { prefix } from '../config';
import props from './tab-panel-props';
import { renderContent } from '../utils/render-tnode';

const name = `${prefix}-tab-panel`;

export default defineComponent({
  name,

  props: { ...props },

  computed: {
    active(): boolean {
      const { value } = this.$parent as any;
      return this.value === value;
    },
  },

  render() {
    const instance = getCurrentInstance();
    const { destroyOnHide, active } = (instance as any).ctx;
    if (destroyOnHide && !active) return null;
    return (
      <div
        class="t-tab-panel"
        // TODO: use v-show to replace display:none. , in the production env, v-show is performance for v-if.
        v-show={active}
      >
        {renderContent(this, 'default', 'panel')}
      </div>
    );
  },
});
