import { defineComponent } from 'vue';
import props from './props';
import ColorPanel from './panel';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TColorPickerPanel',
  components: {
    ColorPanel,
  },
  inheritAttrs: false,
  props: {
    ...props,
  },

  setup() {
    const prefix = usePrefixClass();
    return {
      prefix,
    };
  },
  render() {
    const { prefix } = this;
    return <color-panel {...this.$props} popupProps={null} close-btn={false} class={`${prefix}-is-inline`} />;
  },
});
