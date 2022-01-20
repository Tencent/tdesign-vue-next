import { computed, defineComponent, inject } from 'vue';
import { prefix } from '../config';
import props from './col-props';
import { renderTNodeJSX } from '../utils/render-tnode';

import { RowProviderType, useRowSize, parseFlex, calcColPadding, getColClasses } from './common';

const name = `${prefix}-col`;

export default defineComponent({
  name: 'TCol',

  inject: ['rowContext'],

  props: { ...props },

  setup(props) {
    const rowContext = inject<RowProviderType>('rowContext', Object.create(null));

    const size = useRowSize();

    const colClasses = computed(() => getColClasses(name, props));

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
