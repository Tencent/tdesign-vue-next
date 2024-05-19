import type { PropType } from '@td/adapter-vue';
import { defineComponent, inject } from '@td/adapter-vue';

import { LayoutEnum } from '@td/shared/interface';

import { usePrefixClass, useCommonClassName } from '@td/adapter-hooks';

import descriptionsKey from './const';
import { ItemsType } from './interface';
import type { TdDescriptionItem } from './interface';
import { renderVNodeTNode, itemTypeIsProps } from './utils';
import type { TdDescriptionsProps } from '@td/intel/components/descriptions/type';


export default defineComponent({
  name: 'TDescriptionsBody',
  props: {
    rows: Array as PropType<TdDescriptionItem[][]>,
    itemType: String as PropType<ItemsType>,
  },
  setup(props) {
    const descriptionsProps = inject<TdDescriptionsProps>(descriptionsKey);
    const COMPONENT_NAME = usePrefixClass('descriptions');
    const { SIZE } = useCommonClassName();

    const label = (node: TdDescriptionItem, layout: LayoutEnum = LayoutEnum.HORIZONTAL) => {
      const labelClass = [`${COMPONENT_NAME.value}__label`];

      let label = null;
      let span = null;
      if (itemTypeIsProps(props.itemType, node)) {
        label = node.label;
        span = node.span;
      } else {
        label = renderVNodeTNode(node, 'label');
        span = node.props?.span;
      }
      const labelSpan = layout === LayoutEnum.HORIZONTAL ? 1 : span;

      return (
        <td colspan={labelSpan} class={labelClass} {...{ style: descriptionsProps.labelStyle }}>
          {label}
          {descriptionsProps.colon && ':'}
        </td>
      );
    };

    const content = (node: TdDescriptionItem, layout: LayoutEnum = LayoutEnum.HORIZONTAL) => {
      const contentClass = [`${COMPONENT_NAME.value}__content`];

      let content = null;
      let span = null;
      if (itemTypeIsProps(props.itemType, node)) {
        content = node.content;
        span = node.span;
      } else {
        content = renderVNodeTNode(node, 'content', 'default');
        span = node.props?.span;
      }
      const contentSpan = span > 1 && layout === LayoutEnum.HORIZONTAL ? span * 2 - 1 : span;

      return (
        <td colspan={contentSpan} class={contentClass} {...{ style: descriptionsProps.contentStyle }}>
          {content}
        </td>
      );
    };

    // 总共有四种布局
    // Layout horizontal vertical
    // itemLayout horizontal vertical

    const hh = (row: TdDescriptionItem[]) => <tr>{row.map((node) => [label(node), content(node)])}</tr>;

    const hv = (row: TdDescriptionItem[]) => [
      <tr>{row.map((node) => label(node, LayoutEnum.VERTICAL))}</tr>,
      <tr>{row.map((node) => content(node, LayoutEnum.VERTICAL))}</tr>,
    ];

    const vh = (row: TdDescriptionItem[]) => row.map((node) => (
        <tr>
          {label(node)}
          {content(node)}
        </tr>
    ));

    const vv = (row: TdDescriptionItem[]) => row.map((node) => [<tr>{label(node)}</tr>, <tr>{content(node)}</tr>]);

    const renderRow = (row: TdDescriptionItem[]) => {
      if (descriptionsProps.layout === LayoutEnum.HORIZONTAL) {
        if (descriptionsProps.itemLayout === LayoutEnum.HORIZONTAL) {
          return hh(row);
        }
        return hv(row);
      }
      if (descriptionsProps.itemLayout === LayoutEnum.HORIZONTAL) {
        return vh(row);
      }
      return vv(row);
    };

    return () => {
      const tableClass = [
        `${COMPONENT_NAME.value}__body`,
        SIZE.value[descriptionsProps.size],
        { [`${COMPONENT_NAME.value}__body--border`]: descriptionsProps.bordered },
      ];

      return <table class={tableClass}>
          <tbody>{props.rows.map((row) => renderRow(row))}</tbody>
        </table>
    }
  },
});
