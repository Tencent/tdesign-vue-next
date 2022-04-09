import { computed, defineComponent, inject } from 'vue';
import props from './col-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { RowProviderType, useRowSize, parseFlex, calcColPadding, getColClasses } from './common';

export default defineComponent({
  name: 'TCol',

  inject: ['rowContext'],

  props: { ...props },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('col');
    const rowContext = inject<RowProviderType>('rowContext', Object.create(null));

    const size = useRowSize();

    const colClasses = computed(() => getColClasses(COMPONENT_NAME.value, props));

    const colStyle = computed(() => {
      const colStyle: Record<string, string> = {};
      const { flex } = props;
      flex && (colStyle.flex = parseFlex(flex));

      if (rowContext) {
        const { gutter: rowGutter } = rowContext;
        Object.assign(colStyle, calcColPadding(rowGutter, size.value));
      }
      return colStyle;
    });

    return {
      size,
      colClasses,
      colStyle,
    };
  },

  render() {
    const { colStyle, tag: TAG, colClasses } = this;

    return (
      <TAG class={colClasses} style={colStyle}>
        {renderTNodeJSX(this, 'default')}
      </TAG>
    );
  },
});
