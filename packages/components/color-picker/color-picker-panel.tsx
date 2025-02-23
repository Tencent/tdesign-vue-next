import { computed, defineComponent } from 'vue';
import props from './props';
import ColorPanel from './panel';
import { usePrefixClass } from '../hooks/useConfig';
import { pickBy } from 'lodash-es';

export default defineComponent({
  name: 'TColorPickerPanel',
  inheritAttrs: false,
  props,
  setup(props, { attrs }) {
    const newProps = computed(() => pickBy({ ...props, ...attrs }, (v) => v !== undefined));
    const prefix = usePrefixClass();
    return () => (
      <ColorPanel {...newProps.value} popupProps={null} close-btn={false} class={`${prefix.value}-is-inline`} />
    );
  },
});
