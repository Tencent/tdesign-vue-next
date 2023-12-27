import { defineComponent, inject, VNode, PropType, Slots } from 'vue';
import isNil from 'lodash/isNil';
import setStyle from '../_common/js/utils/set-style';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass, useConfig, useCommonClassName } from '../hooks/useConfig';

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
    const COMPONENT_NAME = usePrefixClass('descriptions');
    const { SIZE } = useCommonClassName();

    const label = (node: VNode) => {
      const labelClass = [
        `${COMPONENT_NAME.value}__label`,
        {
          [`${COMPONENT_NAME.value}__label--${descriptionsProps.labelAlign}`]: descriptionsProps.labelAlign,
          [`${descriptionsProps.labelClassName}`]: descriptionsProps.labelClassName,
        },
      ];
      // 这里的写法可以优化，找 宇杨 帮忙
      const labelStyle = isNil(descriptionsProps.labelWidth) ? '' : `width: ${descriptionsProps.labelWidth}px`;
      return (
        <td style={labelStyle} class={labelClass}>
          {node.props.label}
          {descriptionsProps.colon && ':'}
        </td>
      );
    };

    const content = (node: VNode) => {
      const contentClass = [
        `${COMPONENT_NAME.value}__content`,
        {
          [`${COMPONENT_NAME.value}__content--${descriptionsProps.contentAlign}`]: descriptionsProps.contentAlign,
          [`${descriptionsProps.contentClassName}`]: descriptionsProps.contentClassName,
        },
      ];
      const contentStyle = isNil(descriptionsProps.contentWidth) ? '' : `width: ${descriptionsProps.contentWidth}px`;
      return (
        <td style={contentStyle} class={contentClass}>
          {(node.children as Slots)?.default?.()}
        </td>
      );
    };

    // 总共有四种布局
    // direction horizontal vertical
    // itemDirection horizontal vertical

    const hh = () => (
      <tr>
        {props.row.map((node) => (
          <>
            {label(node)}
            {content(node)}
          </>
        ))}
      </tr>
    );

    const hv = () => (
      <>
        <tr>{props.row.map((node) => label(node))}</tr>
        <tr>{props.row.map((node) => content(node))}</tr>
      </>
    );
    const vh = () => (
      <>
        {props.row.map((node) => (
          <tr>
            {label(node)}
            {content(node)}
          </tr>
        ))}
      </>
    );

    const vv = () => (
      <>
        {props.row.map((node) => (
          <>
            <tr>{label(node)}</tr>
            <tr>{content(node)}</tr>
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
