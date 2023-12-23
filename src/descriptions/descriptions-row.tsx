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
    const descriptionsProps = inject(descriptionsKey);

    const label = (node: VNode) => <td>{node.props.label}</td>;
    const children = (node: VNode) => <td>{(node.children as Slots)?.default?.()}</td>;

    // 总共有四种布局
    // direction horizontal vertical
    // itemDirection horizontal vertical

    const hh = () => (
      <tr>
        {props.row.map((node) => (
          <>
            {label(node)}
            {children(node)}
          </>
        ))}
      </tr>
    );

    const hv = () => (
      <>
        <tr>{props.row.map((node) => label(node))}</tr>
        <tr>{props.row.map((node) => children(node))}</tr>
      </>
    );
    const vh = () => (
      <>
        {props.row.map((node) => (
          <tr>
            {label(node)}
            {children(node)}
          </tr>
        ))}
      </>
    );

    const vv = () => (
      <>
        {props.row.map((node) => (
          <>
            <tr>{label(node)}</tr>
            <tr>{children(node)}</tr>
          </>
        ))}
      </>
    );

    return () => (
      <>
        {descriptionsProps.direction === 'horizontal'
          ? descriptionsProps.itemDirection === 'horizontal'
            ? hh()
            : hv()
          : descriptionsProps.itemDirection === 'horizontal'
          ? vh()
          : vv()}
      </>
    );
  },
});
