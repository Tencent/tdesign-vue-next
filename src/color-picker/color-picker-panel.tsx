import { defineComponent } from 'vue';
import props from './props';
import ColorPanel from './panel';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TColorPickerPanel',
  props: {
    ...props,
  },
  setup(props, { attrs }) {
    const prefix = usePrefixClass();
    return () => (
      <ColorPanel {...{ ...props, ...attrs }} popupProps={null} close-btn={false} class={`${prefix.value}-is-inline`} />
    );
  },
});
