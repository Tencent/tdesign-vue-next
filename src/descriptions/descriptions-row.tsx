import { defineComponent, inject, VNode, PropType, Slots } from 'vue';
import isNil from 'lodash/isNil';

import { usePrefixClass } from '../hooks/useConfig';
import { descriptionsKey } from './interface';

export default defineComponent({
  name: 'TDescriptionsRow',
  props: {
    row: Array as PropType<VNode[]>,
  },
  setup(props) {
    const descriptionsProps = inject(descriptionsKey);
    const COMPONENT_NAME = usePrefixClass('descriptions');

    const label = (node: VNode, direction: 'vertical' | 'horizontal' = 'horizontal') => {
      const labelClass = [
        `${COMPONENT_NAME.value}__label`,
        {
          [`${COMPONENT_NAME.value}__label--${descriptionsProps.labelAlign}`]: descriptionsProps.labelAlign,
          [`${descriptionsProps.labelClassName}`]: descriptionsProps.labelClassName,
        },
      ];
      // 这里的写法可以优化，找 宇杨 帮忙
      const labelStyle = isNil(descriptionsProps.labelWidth) ? '' : `width: ${descriptionsProps.labelWidth}px`;

      const { span } = node.props;
      const labelSpan = direction === 'horizontal' ? 1 : span;
      return (
        <td colspan={labelSpan} style={labelStyle} class={labelClass}>
          {node.props.label}
          {descriptionsProps.colon && ':'}
        </td>
      );
    };

    // !todo 这里 ts 最好有全局的
    const content = (node: VNode, direction: 'vertical' | 'horizontal' = 'horizontal') => {
      const contentClass = [
        `${COMPONENT_NAME.value}__content`,
        {
          [`${COMPONENT_NAME.value}__content--${descriptionsProps.contentAlign}`]: descriptionsProps.contentAlign,
          [`${descriptionsProps.contentClassName}`]: descriptionsProps.contentClassName,
        },
      ];
      const contentStyle = isNil(descriptionsProps.contentWidth) ? '' : `width: ${descriptionsProps.contentWidth}px`;
      const { span } = node.props;
      const contentSpan = span > 1 && direction === 'horizontal' ? span * 2 - 1 : span;
      return (
        <td colspan={contentSpan} style={contentStyle} class={contentClass}>
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
        <tr>{props.row.map((node) => label(node, 'vertical'))}</tr>
        <tr>{props.row.map((node) => content(node, 'vertical'))}</tr>
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
