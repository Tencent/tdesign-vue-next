import { defineComponent, inject, PropType } from 'vue';

import { LayoutEnum } from '../common';
import { usePrefixClass } from '../hooks/useConfig';

import { descriptionsKey } from './interface';
import { TdDescriptionItemProps } from './type';

export default defineComponent({
  name: 'TDescriptionsRow',
  props: {
    row: Array as PropType<TdDescriptionItemProps[]>,
  },
  setup(props) {
    const descriptionsProps = inject(descriptionsKey);
    const COMPONENT_NAME = usePrefixClass('descriptions');

    const label = (node: TdDescriptionItemProps, layout: LayoutEnum = LayoutEnum.HORIZONTAL) => {
      const labelClass = [`${COMPONENT_NAME.value}__label`];
      const { span } = node;
      const labelSpan = layout === LayoutEnum.HORIZONTAL ? 1 : span;

      return (
        <td colspan={labelSpan} class={labelClass} {...{ style: descriptionsProps.labelStyle }}>
          {node.label}
          {descriptionsProps.colon && ':'}
        </td>
      );
    };

    const content = (node: TdDescriptionItemProps, layout: LayoutEnum = LayoutEnum.HORIZONTAL) => {
      const contentClass = [`${COMPONENT_NAME.value}__content`];
      const { span } = node;
      const contentSpan = span > 1 && layout === LayoutEnum.HORIZONTAL ? span * 2 - 1 : span;

      return (
        <td colspan={contentSpan} class={contentClass} {...{ style: descriptionsProps.contentStyle }}>
          {node.content}
        </td>
      );
    };

    // 总共有四种布局
    // Layout horizontal vertical
    // itemLayout horizontal vertical

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
