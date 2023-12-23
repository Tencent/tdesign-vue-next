import { defineComponent, inject, VNode, PropType, Slots } from 'vue';
import isFunction from 'lodash/isFunction';
import setStyle from '../_common/js/utils/set-style';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass, useConfig } from '../hooks/useConfig';

import { TdDescriptionsProps } from './type';
import { getDefaultNode } from '../utils/render-tnode';
import { descriptionsKey } from './interface';

export default defineComponent({
  name: 'TDescriptionsRow',
  props: {
    row: Array as PropType<VNode[]>,
  },
  setup(props, context) {
    const COMPONENT_NAME = usePrefixClass('descriptions');
    const getChildByName = useChildComponentSlots();
    const renderTNodeJSX = useTNodeJSX();

    const descriptionsProps = inject(descriptionsKey);

    return () => (
      <>
        {descriptionsProps.direction === 'horizontal' ? (
          descriptionsProps.itemDirection === 'horizontal' ? (
            <tr>
              {props.row.map((node) => (
                <>
                  <td>{node.props.label}</td>
                  <td>{(node.children as Slots)?.default?.()}</td>
                </>
              ))}
            </tr>
          ) : (
            <>
              <tr>
                {props.row.map((node) => (
                  <>
                    <td>{node.props.label}</td>
                  </>
                ))}
              </tr>
              <tr>
                {props.row.map((node) => (
                  <>
                    <td>{(node.children as Slots)?.default?.()}</td>
                  </>
                ))}
              </tr>
            </>
          )
        ) : (
          <tr>
            {props.row.map((node) => (
              <>
                <td>{node.props.label}</td>
                <td>{(node.children as Slots)?.default?.()}</td>
              </>
            ))}
          </tr>
        )}
      </>
    );
  },
});
