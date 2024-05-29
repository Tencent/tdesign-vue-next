import { computed, defineComponent, provide, reactive, toRefs } from '@td/adapter-vue';
import props from '@td/components/grid/row-props';
import { usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';
import type { RowProviderType } from './common';
import { calcRowStyle, getRowClasses, useRowSize } from './common';

export default defineComponent({
  name: 'TRow',

  props: { ...props },

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
      return (
        <TAG class={rowClasses.value} style={rowStyle.value}>
          {renderTNodeJSX('default')}
        </TAG>
      );
    };
  },
});
