import { defineComponent, inject, PropType } from 'vue';

import { usePrefixClass } from '../hooks/useConfig';
import { descriptionsKey } from './interface';
import { LayoutEnum } from '../common';

import { TdDescriptionItemProps } from './type';

export default defineComponent({
  name: 'TDescriptionsRow',
  props: {
    row: Array as PropType<TdDescriptionItemProps[]>,
  },
  setup(props) {
    const descriptionsProps = inject(descriptionsKey);
    const COMPONENT_NAME = usePrefixClass('descriptions');

    const label = (node: TdDescriptionItemProps, direction: LayoutEnum = LayoutEnum.HORIZONTAL) => {
      const labelClass = [
        `${COMPONENT_NAME.value}__label`,
        {
          [`${descriptionsProps.labelStyle}`]: descriptionsProps.labelStyle,
        },
      ];
      const { span } = node;
      const labelSpan = direction === LayoutEnum.HORIZONTAL ? 1 : span;
      return (
        <td colspan={labelSpan} class={labelClass}>
          {node.label}
          {descriptionsProps.colon && ':'}
        </td>
      );
    };

    const content = (node: TdDescriptionItemProps, direction: LayoutEnum = LayoutEnum.HORIZONTAL) => {
      const contentClass = [
        `${COMPONENT_NAME.value}__content`,
        {
          [`${descriptionsProps.contentStyle}`]: descriptionsProps.contentStyle,
        },
      ];
      const { span } = node;
      const contentSpan = span > 1 && direction === LayoutEnum.HORIZONTAL ? span * 2 - 1 : span;
      return (
        <td colspan={contentSpan} class={contentClass}>
          {node.content}
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
        <tr>{props.row.map((node) => label(node, LayoutEnum.VERTICAL))}</tr>
        <tr>{props.row.map((node) => content(node, LayoutEnum.VERTICAL))}</tr>
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
        {descriptionsProps.layout === LayoutEnum.HORIZONTAL
          ? descriptionsProps.itemLayout === LayoutEnum.HORIZONTAL
            ? hh()
            : hv()
          : descriptionsProps.itemLayout === LayoutEnum.HORIZONTAL
          ? vh()
          : vv()}
      </>
    );
  },
});
