import { defineComponent, inject, PropType } from 'vue';

import { LayoutEnum } from '../common';
import { usePrefixClass } from '../hooks/useConfig';

import { descriptionsKey } from './const';
import { ItemsType, TdDescriptionItem } from './interface';
import { renderVNodeTNode, itemTypeIsProps } from './utils';

export default defineComponent({
  name: 'TDescriptionsRow',
  props: {
    row: Array as PropType<TdDescriptionItem[]>,
    itemType: String as PropType<ItemsType>,
  },
  setup(props) {
    const descriptionsProps = inject(descriptionsKey);
    const COMPONENT_NAME = usePrefixClass('descriptions');

    const label = (node: TdDescriptionItem, layout: LayoutEnum = 'horizontal') => {
      const labelClass = [`${COMPONENT_NAME.value}__label`];

      let label = null;
      let span = null;
      if (itemTypeIsProps(props.itemType, node)) {
        label = node.label;
        span = node.span;
      } else {
        label = renderVNodeTNode(node, 'label');
        span = node.props.span;
      }
      const labelSpan = layout === 'horizontal' ? 1 : span;

      return (
        <td colspan={labelSpan} class={labelClass} {...{ style: descriptionsProps.labelStyle }}>
          {label}
          {descriptionsProps.colon && ':'}
        </td>
      );
    };

    const content = (node: TdDescriptionItem, layout: LayoutEnum = 'horizontal') => {
      const contentClass = [`${COMPONENT_NAME.value}__content`];

      let content = null;
      let span = null;
      if (itemTypeIsProps(props.itemType, node)) {
        content = node.content;
        span = node.span;
      } else {
        content = renderVNodeTNode(node, 'content', 'default');
        span = node.props.span;
      }
      const contentSpan = span > 1 && layout === 'horizontal' ? span * 2 - 1 : span;

      return (
        <td colspan={contentSpan} class={contentClass} {...{ style: descriptionsProps.contentStyle }}>
          {content}
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
        {descriptionsProps.layout === 'horizontal'
          ? descriptionsProps.itemLayout === 'horizontal'
            ? hh()
            : hv()
          : descriptionsProps.itemLayout === 'horizontal'
          ? vh()
          : vv()}
      </>
    );
  },
});
