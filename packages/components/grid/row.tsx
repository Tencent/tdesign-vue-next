import { defineComponent, provide, computed, toRefs, reactive, h } from 'vue';
import props from './row-props';
import { useRowSize } from './hooks';
import { getRowClasses, RowProviderType, calcRowStyle } from './utils';
import { useTNodeJSX, usePrefixClass } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TRow',
  props,
  setup(props) {
    const { gutter } = toRefs(props);
    const renderTNodeJSX = useTNodeJSX();

    provide<RowProviderType>(
      'rowContext',
      reactive({
        gutter,
      }),
    );

    const size = useRowSize();

    const COMPONENT_NAME = usePrefixClass('row');
    const rowClasses = computed(() => getRowClasses(COMPONENT_NAME.value, props));

    const rowStyle = computed(() => calcRowStyle(props.gutter, size.value));

    return () => {
      const { tag: TAG } = props;
      return h(
        TAG,
        {
          class: rowClasses.value,
          style: rowStyle.value,
        },
        [renderTNodeJSX('default')],
      );
    };
  },
});
