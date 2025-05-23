import { defineComponent, computed } from 'vue';
import { usePrefixClass } from '@tdesign/hooks';
import { useTNodeJSX } from '@tdesign/hooks';
import inputGroupProps from './input-group-props';

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
