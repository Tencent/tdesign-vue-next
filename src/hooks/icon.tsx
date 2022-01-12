import { h, Slots } from 'vue';
import {
  CheckCircleFilledIcon,
  ErrorCircleFilledIcon,
  HelpCircleFilledIcon,
  InfoCircleFilledIcon,
} from 'tdesign-icons-vue-next';
import TLoading from '../loading';

/**
 * 渲染自定义icon
 * 使用场景：<t-message theme="info">用于表示普通操作信息提示</t-message>
 * @param props
 * @param slots
 * @returns
 */
export function useIcon<P extends Record<string, any>>(props: P, slots: Slots) {
  let iconContent;
  // 传入的是渲染函数
  if (typeof props.icon === 'function') {
    iconContent = props.icon(h);
  } else if (slots.icon) {
    // 插槽slot
    iconContent = slots.icon && slots.icon(null)[0];
  } else {
    const Component = {
      info: InfoCircleFilledIcon,
      success: CheckCircleFilledIcon,
      warning: ErrorCircleFilledIcon,
      error: ErrorCircleFilledIcon,
      question: HelpCircleFilledIcon,
      loading: TLoading,
    }[props.theme as string];
    iconContent = <Component></Component>;
  }
  return iconContent;
}
