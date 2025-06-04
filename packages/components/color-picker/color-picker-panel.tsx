import { computed, defineComponent } from 'vue';
import props from './color-picker-panel-props';
import ColorPanel from './components/panel';
import { usePrefixClass } from '@tdesign/hooks';
import { pickBy } from 'lodash-es';

export default defineComponent({
  name: 'TColorPickerPanel',
  inheritAttrs: false,
  props,
  setup(props, { attrs }) {
    const newProps = computed(() => pickBy({ ...props, ...attrs }, (v) => v !== undefined));
    const prefix = usePrefixClass();
    return () => <ColorPanel {...newProps.value} popupProps={null} class={`${prefix.value}-is-inline`} />;
  },
});
