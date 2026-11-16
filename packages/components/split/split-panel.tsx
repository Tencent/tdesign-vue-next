import { defineComponent } from 'vue';
import { usePrefixClass } from '@tdesign/shared-hooks';
import props from './split-panel-props';

export default defineComponent({
  name: 'TSplitPanel',
  props,
  setup(_, { slots }) {
    const componentName = usePrefixClass('split__panel');

    return () => <div class={componentName.value}>{slots.default?.()}</div>;
  },
});
