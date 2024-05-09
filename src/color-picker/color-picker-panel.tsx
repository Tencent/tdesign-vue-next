import { computed, defineComponent } from 'vue';

import pickBy from 'lodash/pickBy';

import { usePrefixClass } from '../hooks/useConfig';

import ColorPanel from './panel';
import props from './props';

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
