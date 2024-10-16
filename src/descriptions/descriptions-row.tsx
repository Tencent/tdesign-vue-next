import { computed, defineComponent, inject, PropType } from 'vue';

import { LayoutEnum } from '../common';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

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
    const { globalConfig } = useConfig('descriptions');
    const layoutIsHorizontal = computed(() => descriptionsProps.layout === 'horizontal');
    const itemLayoutIsHorizontal = computed(() => descriptionsProps.itemLayout === 'horizontal');

    const label = (node: TdDescriptionItem) => {
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
      // 当 layout 为 horizontal 时，span 设置将失效
      const labelSpan = layoutIsHorizontal.value ? (itemLayoutIsHorizontal.value ? 1 : span) : 1;
      return (
        <td colspan={labelSpan} class={labelClass} {...{ style: descriptionsProps.labelStyle }}>
          {label}
          {descriptionsProps.colon && globalConfig.value.colonText}
        </td>
      );
    };

    const content = (node: TdDescriptionItem) => {
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
      const contentSpan = layoutIsHorizontal.value
        ? span > 1 && itemLayoutIsHorizontal.value
          ? span * 2 - 1
          : span
        : 1;

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
        {layoutIsHorizontal.value
          ? itemLayoutIsHorizontal.value
            ? hh()
            : hv()
          : itemLayoutIsHorizontal.value
          ? vh()
          : vv()}
      </>
    );
  },
});
