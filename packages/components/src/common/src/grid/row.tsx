import { defineComponent, provide, computed, toRefs, reactive } from 'vue';
import props from './row-props';
import { useRowSize, calcRowStyle, getRowClasses, RowProviderType } from './common';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

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
