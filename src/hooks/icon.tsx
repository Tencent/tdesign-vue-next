import { h, Slots } from 'vue';

/**
 * 渲染icon，用于icon、close等渲染图标的场景
 * 使用场景：useIcon(props, slots, 'icon', Component);  useIcon(props, slots, 'close');
 * @param props
 * @param slots
 * @param iconType 要渲染的icon元素
 * @param defaultIcons 默认icon集合
 * @returns
 */
export function useIcon<P extends Record<string, any>>(
  props: P,
  slots: Slots,
  iconType: string,
  defaultIcons?: Record<string, any>,
) {
  let iconContent;
  // 传入的是渲染函数
  if (typeof props[iconType] === 'function') {
    iconContent = props[iconType](h);
  } else if (slots[iconType]) {
    // 插槽slot
    iconContent = slots[iconType] && slots[iconType](null)[0];
  } else {
    const Component = defaultIcons && defaultIcons[props.theme as string];
    iconContent = <Component></Component>;
  }
  return iconContent;
}
