import { defineComponent, computed, VNode, provide } from 'vue';
import isNil from 'lodash/isNil';

import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';

import props from './props';
import { TdDescriptionsProps } from './type';
import DescriptionsRow from './descriptions-row';
import { descriptionsKey } from './interface';
import { LayoutEnum } from '../common';

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
    // 计算渲染的行内容
    const rows = computed(() => {
      // 两种方式：1. props 传 items 2. slots t-descriptions-item 第 2 种优先级更高
      const { column } = props;
      // 先使用第 2 种方式实现

      // 1. 获取 TDescriptionsItem
      const items = getChildByName('TDescriptionsItem');
      let temp: VNode[] = [];
      let reset = column;
      // 2. 记录结果
      const res: VNode[][] = [];
      items.forEach((item, index) => {
        if (isNil(item.props?.span)) {
          item.props.span = 1;
        }
        const span = item.props.span;
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
          item.props.span += reset;
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
            {props.direction === LayoutEnum.HORIZONTAL ? (
              rows.value.map((row) => <DescriptionsRow row={row} />)
            ) : (
              <DescriptionsRow row={getChildByName('TDescriptionsItem')} />
            )}
          </tbody>
        </table>
      );
    };

    return () => (
      <div class={COMPONENT_NAME.value}>
        <div class={`${COMPONENT_NAME.value}__header`}></div>
        {renderBody()}
      </div>
    );
  },
});
