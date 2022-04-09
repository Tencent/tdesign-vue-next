import { defineComponent, provide, computed } from 'vue';
import props from './row-props';
import { useRowSize, calcRowStyle, getRowClasses, RowProviderType } from './common';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TRow',

  props: { ...props },

  setup(props) {
    provide<RowProviderType>('rowContext', {
      gutter: props.gutter,
    });

    const size = useRowSize();

    const COMPONENT_NAME = usePrefixClass('row');
    const rowClasses = computed(() => getRowClasses(COMPONENT_NAME.value, props));

    const rowStyle = computed(() => calcRowStyle(props.gutter, size.value));

    return {
      rowStyle,
      size,
      rowClasses,
    };
  },

  render() {
    const { tag: TAG, rowClasses, rowStyle } = this;

    return (
      <TAG class={rowClasses} style={rowStyle}>
        {renderTNodeJSX(this, 'default')}
      </TAG>
    );
  },
});
