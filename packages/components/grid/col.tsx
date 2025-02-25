import { computed, defineComponent, inject } from 'vue';
import props from './col-props';

import { RowProviderType, useRowSize, parseFlex, calcColPadding, getColClasses } from './common';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TCol',

  inject: ['rowContext'],

  props,

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('col');
    const renderTNodeJSX = useTNodeJSX();
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

    return () => {
      const { tag: TAG } = props;
      return (
        <TAG class={colClasses.value} style={colStyle.value}>
          {renderTNodeJSX('default')}
        </TAG>
      );
    };
  },
});
