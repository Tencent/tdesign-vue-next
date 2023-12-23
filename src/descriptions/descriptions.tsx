import { defineComponent, computed, nextTick, onMounted, ref, toRefs, watch, h, Teleport, VNode } from 'vue';
import isFunction from 'lodash/isFunction';
import setStyle from '../_common/js/utils/set-style';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass, useConfig } from '../hooks/useConfig';

import props from './props';
import { TdDescriptionsProps } from './type';
// import DescriptionsItem from './descriptions-item';
import DescriptionsRow from './descriptions-row';

/**
 * 实现思路
 * 直接利用 table tbody tr td 来实现即可
 * 先要计算总共有几行，然后再渲染
 */

export default defineComponent({
  name: 'TDescriptions',
  props,
  setup(props: TdDescriptionsProps, context) {
    const COMPONENT_NAME = usePrefixClass('guide');
    const getChildByName = useChildComponentSlots();
    // 计算渲染的行内容
    const rows = computed(() => {
      // 两种方式：1. props 传 items 2. slots t-descriptions-item 第 2 种优先级更高
      const { column = 3 } = props;
      // 先使用第 2 种方式实现

      // 1. 获取 TDescriptionsItem
      const items = getChildByName('TDescriptionsItem');
      // 2. 记录总的 span
      const totalSpan = 0;
      let temp: VNode[] = [];
      let reset = column;
      // 3. 记录结果
      const res: VNode[][] = [];
      items.forEach((item, index) => {
        const span = item.props?.span || 1;

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
          res.push(temp);
        }
      });
      return res;
    });

    return () => (
      <div class={COMPONENT_NAME.value}>
        <div class={`${COMPONENT_NAME.value}__header`}></div>
        <div class={`${COMPONENT_NAME.value}__body`}>
          <table>
            <tbody>
              {rows.value.map((row) => (
                <DescriptionsRow row={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});
