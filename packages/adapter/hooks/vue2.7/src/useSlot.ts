import { H, getCurrentInstance, getVNode } from '@td/adapter-vue';
import { isArray } from 'lodash-es';
import type { VNode } from '@td/adapter-vue';
import type { ScopedSlot } from 'vue/types/vnode';

/**
 * 渲染default slot，获取子组件VNode。处理多种子组件创建场景
 * 使用场景：<t-steps> <t-steps-item /> </t-steps>, <t-steps> <t-steps-item v-for="(item, index)" :key="index" /> </t-steps>
 * @returns {function(childComponentName: string, slots: Slots): VNode[]}
 * @param childComponentName
 * @param slots
 * @example const getChildByName = useChildComponentSlots()
 * @example getChildComponentByName('TStepItem')
 */
export function useChildComponentSlots() {
  const instance = getCurrentInstance();
  return (childComponentName: string, slots?: ScopedSlot) => {
    if (!slots) {
      // @ts-expect-error

      slots = instance.$scopedSlots;
    }
    // @ts-expect-error
    const content = slots?.default?.() || [];

    // 满足基于基础组件封装场景，递归找到子组件
    const childList: VNode[] = [];
    const getChildren = (content: VNode[]) => {
      if (!isArray(content)) {
        return;
      }
      content.forEach((item: VNode) => {
        if (item.children && isArray(item.children)) {
          // if (item.type !== Fragment) return;
          getChildren(item.children as VNode[]);
        } else {
          childList.push(item);
        }
      });
      return childList;
    };

    return getChildren(content)
      ?.filter((item: VNode) => item.tag?.endsWith(childComponentName))
      ?.map(item => getVNode(item));
  };
}

// ! 这个是我临时搬运的，需要后面细细看
// vue23:todo 临时搬运的，应该是有问题的
/**
 * 渲染default slot，获取slot child
 * @param childComponentName
 * @param slots
 * @example const getChildSlots = useChildSlots()
 * @example getChildSlots()
 */
export function useChildSlots() {
  return () => {
    const instance = getCurrentInstance();
    const content = instance?.slots?.default?.(H) || [];
    return content
      // .map(item => getVNode(item))
      // .filter((item) => {
      //   if (!item.children) {
      //     return false;
      //   }
      //   return true;
      // })
      .map((item) => {
        // if (item.children && isArray(item.children)) return item.children;
        return item;
      })
      .flat();
  };
}
