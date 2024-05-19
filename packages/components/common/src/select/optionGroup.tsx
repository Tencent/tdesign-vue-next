import { defineComponent, inject, computed } from 'vue';
import { useTNodeJSX } from '../hooks/tnode';
import props from '@td/intel/select/option-group-props';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { selectInjectKey } from './helper';

export default defineComponent({
  name: 'TOptionGroup',
  props: { ...props },
  setup(props) {
    const selectProvider = inject(selectInjectKey);
    const COMPONENT_NAME = usePrefixClass('select-option-group');
    const { SIZE } = useCommonClassName();
    const renderTNodeJSX = useTNodeJSX();

    const classes = computed(() => [
      COMPONENT_NAME.value,
      SIZE.value[selectProvider.value.size],
      {
        [`${COMPONENT_NAME.value}__divider`]: props.divider,
      },
    ]);

    return () => (
      <li class={classes.value}>
        <div class={`${COMPONENT_NAME.value}__header`}>{props.label}</div>
        {renderTNodeJSX('default')}
      </li>
    );
  },
});
