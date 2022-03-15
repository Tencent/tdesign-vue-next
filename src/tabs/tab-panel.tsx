import { defineComponent, getCurrentInstance } from 'vue';
import props from './tab-panel-props';
import { renderContent } from '../utils/render-tnode';
import { usePrefixClass } from '../config-provider';

export default defineComponent({
  name: 'TTabPanel',

  props: { ...props },
  setup() {
    const COMPONENT_NAME = usePrefixClass('tab-panel');
    return {
      COMPONENT_NAME,
    };
  },
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
      <div class={this.COMPONENT_NAME} v-show={active}>
        {renderContent(this, 'default', 'panel')}
      </div>
    );
  },
});
