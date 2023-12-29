import { defineComponent, computed, provide, VNode, Slots } from 'vue';

import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';

import props from './props';
import { TdDescriptionsProps, TdDescriptionItemProps } from './type';
import DescriptionsRow from './descriptions-row';
import { descriptionsKey } from './interface';
import { LayoutEnum, TNode } from '../common';

import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

/**
 * 实现思路
 * 1. 基于 table tbody tr td 来实现布局
 * 2. 通过 span 计算总共有几行以及每一行的 item 个数，特别注意最后一行，要填充满
 * 3. 整体布局：左右布局（column 和 span 生效）/上下布局（column 和 span 失效，一行一个 item）
 * 4. item 布局：左右布局/上下布局
 */

/**
 * TDescriptions：承载 header（title） 和 body（table, tbody）
 * TDescriptionsRow：承载每一行（tr）
 * TDescriptionsItem：获取 item 数据（span, label, content）
 */

// ! 临时方法，处理 vnode 中的 slot prop，待讨论
function renderVNodeTNode(node: VNode, name1: string, name2?: string): string | TNode {
  const slot = (node.children as Slots)?.[name1] || (node.children as Slots)?.[name2]; // slots 优先级更高
  const prop = node.props?.[name1];
  if (slot) {
    return (slot?.() || '') as string | TNode;
  } else if (prop) {
    return prop;
  } else {
    return '';
  }
}

// ! 临时方法，处理 node string / <div> / () => <div>
function renderStringOrTNode(node: string | Function | VNode): string | TNode {
  if (isFunction(node)) {
    return node();
  } else if (isString(node)) {
    return node;
  } else {
    return (<node />) as unknown as TNode;
  }
}

export default defineComponent({
  name: 'TDescriptions',
  props,
  setup(props: TdDescriptionsProps) {
    const COMPONENT_NAME = usePrefixClass('descriptions');
    const { SIZE } = useCommonClassName();
    const getChildByName = useChildComponentSlots();
    const renderTNodeJSX = useTNodeJSX();
    // 计算渲染的行内容
    const rows = computed(() => {
      // 1. 两种方式：a. slots t-descriptions-item; b. props 传 items  a 优先级更高
      const { column, layout } = props;

      let items: TdDescriptionItemProps[] = [];
      const slots = getChildByName('TDescriptionsItem');

      if (slots.length !== 0) {
        // 2.1 a 方式 获取 TDescriptionsItem

        items = slots.map((item) => {
          const { span = 1 } = item.props || {};
          return {
            label: renderVNodeTNode(item, 'label'),
            content: renderVNodeTNode(item, 'content', 'default'),
            span,
          };
        });
      } else if (isArray(props.items)) {
        // 2.2 b 方式 获取 items
        // ! 这里也要支持 label: string / <div></div> / () =>  <div></div> 所以感觉需要这样一个全局的方法

        // ! 先在这里写两个临时方法，待讨论
        items = props.items.map((item) => {
          const { span = 1 } = item;
          return {
            label: renderStringOrTNode(item.label),
            content: renderStringOrTNode(item.content),
            span,
          };
        });
      }

      // 2. 判断布局，如果整体布局为 LayoutEnum.VERTICAL，那么直接返回即可。
      if (layout === LayoutEnum.VERTICAL) {
        return [items];
      }
      // 3. 布局为 LayoutEnum.HORIZONTAL 时，需要计算每一行的 item 个数
      let temp: TdDescriptionItemProps[] = [];
      let reset = column;
      // 4. 记录结果
      const res: TdDescriptionItemProps[][] = [];
      items.forEach((item, index) => {
        const { span } = item;
        if (reset >= span) {
          // 当前行还剩余空间
          temp.push(item);
          reset -= span;
        } else {
          // 当前行放不下了，放下一行
          res.push(temp);
          temp = [item];
          reset = column - span;
        }

        if (index === items.length - 1) {
          // 最后一个
          item.span += reset;
          res.push(temp);
        }
      });
      return res;
    });

    provide(descriptionsKey, props);

    const renderBody = () => {
      const tableClass = [
        `${COMPONENT_NAME.value}__body`,
        SIZE.value[props.size],
        { [`${COMPONENT_NAME.value}__body--border`]: props.bordered },
      ];
      return (
        <table class={tableClass}>
          <tbody>
            {rows.value.map((row) => (
              <DescriptionsRow row={row} />
            ))}
          </tbody>
        </table>
      );
    };

    const renderHeader = () => {
      const title = renderTNodeJSX('title');
      return title ? <div class={`${COMPONENT_NAME.value}__header`}>{title}</div> : '';
    };

    return () => (
      <div class={COMPONENT_NAME.value}>
        {renderHeader()}
        {renderBody()}
      </div>
    );
  },
});
