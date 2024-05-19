import { isFunction } from 'lodash-es';
import { getCurrentInstance, H } from '@td/adapter-vue';

// !本来在 hooks，但只有这里用到了

/**
 * 渲染icon，用于icon、close等渲染图标的场景
 * @example const renderIconTNode = useIcon();
 * @returns renderIconTNode
 * @param iconType 要渲染的icon元素
 * @param defaultIcons 默认icon集合
 */
export default function useIcon() {
  const instance = getCurrentInstance();
  
  return function renderIconTNode(iconType: string, defaultIcons?: Record<string, any>) {
    let iconContent;
    // 传入的是渲染函数
    const fn = instance?.props[iconType];
    if (isFunction(fn)) {
      iconContent = fn(H);
    } else if (instance?.slots[iconType]) {
      // 插槽slot
      iconContent = instance.slots[iconType] && instance?.slots[iconType]?.(null)[0];
    } else if (defaultIcons) {
      const Component = defaultIcons[instance?.props.theme as string];
      iconContent = <Component></Component>;
    }
    return iconContent;
  };
}
