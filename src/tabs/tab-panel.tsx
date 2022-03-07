import { defineComponent, h, VNodeChild, getCurrentInstance } from 'vue';
import { prefix } from '../config';
import props from './tab-panel-props';
import { renderContent } from '../utils/render-tnode';

export default defineComponent({
  name: 'TTabPanel',

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
      <div class={`${prefix}-tab-panel`} v-show={active}>
        {renderContent(this, 'default', 'panel')}
      </div>
    );
  },
});
