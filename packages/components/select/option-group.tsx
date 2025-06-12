import { defineComponent, inject, computed } from 'vue';
import { useTNodeJSX, usePrefixClass, useCommonClassName } from '@tdesign/hooks';
import props from './option-group-props';

import { selectInjectKey } from './consts';

export default defineComponent({
  name: 'TOptionGroup',
  props,
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
        {(props.label ?? false) && <div class={`${COMPONENT_NAME.value}__header`}>{props.label}</div>}
        {renderTNodeJSX('default')}
      </li>
    );
  },
});
