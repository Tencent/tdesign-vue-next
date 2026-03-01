import { defineComponent, inject, computed } from 'vue';
import { useTNodeJSX, usePrefixClass, useCommonClassName } from '@tdesign/shared-hooks';
import props from './option-group-props';

import { selectInjectKey } from './constants';

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

    return () => {
      const label = renderTNodeJSX('label');
      return (
        <li class={classes.value}>
          {![null, undefined].includes(label) && <div class={`${COMPONENT_NAME.value}__header`}>{label}</div>}
          {renderTNodeJSX('default')}
        </li>
      );
    };
  },
});
