import { computed, defineComponent } from '@td/adapter-vue';
import props from '@td/components/color-picker/props';
import { usePrefixClass } from '@td/adapter-hooks';
import { pickBy } from 'lodash-es';
import ColorPanel from './panel';

export default defineComponent({
  name: 'TColorPickerPanel',
  inheritAttrs: false,
  props: {
    ...props,
  },
  setup(props, { attrs }) {
    const newProps = computed(() => pickBy({ ...props, ...attrs }, v => v !== undefined));
    const prefix = usePrefixClass();
    return () => (
      <ColorPanel {...newProps.value} popupProps={null} close-btn={false} class={`${prefix.value}-is-inline`} />
    );
  },
});
