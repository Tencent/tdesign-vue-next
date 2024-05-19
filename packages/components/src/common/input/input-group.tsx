import { defineComponent, computed } from '@td/adapter-vue';
import { usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';

import inputGroupProps from '@td/intel/components/input/input-group-props';

export default defineComponent({
  name: 'TInputGroup',

  props: inputGroupProps,

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('input-group');
    const renderTNodeJSX = useTNodeJSX();
    const CLASS = computed(() => [
      COMPONENT_NAME.value,
      {
        [`${COMPONENT_NAME.value}--separate`]: props.separate,
      },
    ]);
    return () => <div class={CLASS.value}>{renderTNodeJSX('default')}</div>;
  },
});
