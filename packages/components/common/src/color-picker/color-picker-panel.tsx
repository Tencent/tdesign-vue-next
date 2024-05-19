import { computed, defineComponent } from 'vue';
import props from '@td/intel/color-picker/props';
import ColorPanel from './panel';
import { usePrefixClass } from '@td/adapter-hooks';
import { pickBy } from 'lodash-es';

export default defineComponent({
  name: 'TColorPickerPanel',
  inheritAttrs: false,
  props: {
    ...props,
  },
  setup(props, { attrs }) {
    const newProps = computed(() => pickBy({ ...props, ...attrs }, (v) => v !== undefined));
    const prefix = usePrefixClass();
    return () => (
      <ColorPanel {...newProps.value} popupProps={null} close-btn={false} class={`${prefix.value}-is-inline`} />
    );
  },
});
