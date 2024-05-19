import isNil from 'lodash/isNil';
import isArray from 'lodash/isArray';
import { defineComponent, provide, ref } from 'vue';

import { useTNodeJSX } from '../hooks/tnode';
import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';

import props from '@td/intel/descriptions/props';
import { descriptionsKey } from './const';
import { TdDescriptionsProps } from '@td/intel/descriptions/type';
import DescriptionsRow from './descriptions-row';
import { renderCustomNode, itemTypeIsProps } from './utils';
import { ItemsType, TdDescriptionItem } from './interface';

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

export default defineComponent({
  name: 'TDescriptions',
  props,
  setup(props: TdDescriptionsProps) {
    const COMPONENT_NAME = usePrefixClass('descriptions');
    const { SIZE } = useCommonClassName();
    const getChildByName = useChildComponentSlots();
    const renderTNodeJSX = useTNodeJSX();
    const itemsType = ref<ItemsType>(ItemsType.props);

    // 计算渲染的行内容
    const getRows = () => {
      /**
       * 1. 两种方式获取要渲染的 items
       *  a. props 传 items
       *  b. slots t-descriptions-item
       * a 优先级更高
       */
      const { column, layout } = props;

      let items: TdDescriptionItem[] = [];

      if (isArray(props.items)) {
        /**
         * 2.1 a 方式获取 items
         * ! 这里要支持 label: string / <div></div> / () =>  <div></div>
         * ! 暂时没有这样一个全局的方法，所以先在组件内部写一个临时方法，无论之后是有了更好的处理方式要删除掉，还是其它组件也需要时再放到公共方法里面，都是可行的
         */
        items = props.items.map((item) => ({
          label: renderCustomNode(item.label),
          content: renderCustomNode(item.content),
          span: item.span || 1,
        }));
        itemsType.value = ItemsType.props;
      } else {
        const slots = getChildByName('TDescriptionsItem');
        if (slots.length !== 0) {
          // 2.2 b 方式 获取 TDescriptionsItem
          items = slots;
          itemsType.value = ItemsType.slots;
        }
      }

      // 2. 判断布局，如果整体布局为 VERTICAL，那么直接返回即可。
      if (layout === 'vertical') {
        return [items];
      }

      // 3. 布局为 HORIZONTAL 时，需要计算每一行的 item 个数
      let temp: TdDescriptionItem[] = [];
      let reset = column;

      // 4. 记录结果
      const res: TdDescriptionItem[][] = [];
      items.forEach((item, index) => {
        let span = 1;
        if (itemTypeIsProps(itemsType.value, item)) {
          span = isNil(item.span) ? span : item.span;
        } else {
          item.props = item.props || {};
          span = isNil(item.props?.span) ? span : item.props.span;
          item.props.span = span;
        }

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
          if (itemTypeIsProps(itemsType.value, item)) {
            item.span += reset;
          } else {
            item.props.span += reset;
          }
          res.push(temp);
        }
      });
      return res;
    };

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
            {getRows().map((row) => (
              <DescriptionsRow item-type={itemsType.value} row={row} />
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
