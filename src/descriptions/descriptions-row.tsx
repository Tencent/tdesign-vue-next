import { defineComponent, computed, nextTick, onMounted, ref, toRefs, watch, h, Teleport, VNode, PropType } from 'vue';
import isFunction from 'lodash/isFunction';
import setStyle from '../_common/js/utils/set-style';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass, useConfig } from '../hooks/useConfig';

import { TdDescriptionsProps } from './type';
import { getDefaultNode } from '../utils/render-tnode';

export default defineComponent({
  name: 'TDescriptionsRow',
  props: {
    row: Array as PropType<VNode[]>,
  },
  setup(props, context) {
    const COMPONENT_NAME = usePrefixClass('descriptions');
    const getChildByName = useChildComponentSlots();
    const renderTNodeJSX = useTNodeJSX();

    return () => (
      <tr>
        {props.row.map((node) => (
          <>
            <td>{node.props.label}</td>
            <td>{node.children?.default?.()}</td>
          </>
        ))}
      </tr>
    );
  },
});
