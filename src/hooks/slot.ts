import { Slots, VNode, Component, getCurrentInstance } from 'vue';

/**
 * 渲染default slot，获取子组件VNode。处理多种子组件创建场景
 * 使用场景：<t-steps> <t-steps-item /> </t-steps>, <t-steps> <t-steps-item v-for="(item, index)" :key="index" /> </t-steps>
 * @param childComponentName
 * @param slot
 * @returns
 */
export function useChildComponentSlots(childComponentName: string, slots?: Slots) {
  if (!slots) {
    slots = getCurrentInstance().slots;
  }

  const content = slots?.default();
  return content
    .map((item: VNode) => {
      if (item.children && Array.isArray(item.children)) return item.children;
      return item;
    })
    .flat()
    .filter((item: VNode) => (item.type as Component).name === childComponentName);
}
