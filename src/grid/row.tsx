import { defineComponent, provide, computed } from 'vue';
import { prefix } from '../config';
import props from './row-props';
import { useRowSize, calcRowStyle, getRowClasses, RowProviderType } from './common';
import { renderTNodeJSX } from '../utils/render-tnode';

const name = `${prefix}-row`;

export default defineComponent({
  name: 'TRow',

  props: { ...props },

  setup(props) {
    provide<RowProviderType>('rowContext', {
      gutter: props.gutter,
    });

    const size = useRowSize();

    const rowClasses = computed(() => getRowClasses(name, props));

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
