import { ref, toRefs, computed, CSSProperties } from 'vue';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import { TdSelectInputProps } from './type';
import { TdPopupProps, PopupVisibleChangeContext } from '../popup';

export type overlayStyleProps = Pick<
  TdSelectInputProps,
  'popupProps' | 'autoWidth' | 'readonly' | 'onPopupVisibleChange' | 'disabled'
>;

// 单位：px
const MAX_POPUP_WIDTH = 1000;

export default function useOverlayStyle(props: overlayStyleProps) {
  const { popupProps, autoWidth } = toRefs(props);
  const innerPopupVisible = ref(false);

  const macthWidthFunc = (triggerElement: HTMLElement, popupElement: HTMLElement) => {
    // 避免因滚动条出现文本省略，预留宽度 8
    const SCROLLBAR_WIDTH = popupElement.scrollHeight > popupElement.offsetHeight ? 8 : 0;
    const width =
      popupElement.offsetWidth + SCROLLBAR_WIDTH >= triggerElement.offsetWidth
        ? popupElement.offsetWidth
        : triggerElement.offsetWidth;
    let otherOverlayStyle: CSSProperties = {};
    if (popupProps.value && typeof popupProps.value.overlayStyle === 'object' && !popupProps.value.overlayStyle.width) {
      otherOverlayStyle = popupProps.value.overlayStyle;
    }
    return {
      width: `${Math.min(width, MAX_POPUP_WIDTH)}px`,
      ...otherOverlayStyle,
    };
  };

  const onInnerPopupVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
    if (props.disabled || props.readonly) return;
    // 如果点击触发元素（输入框），则永久显示下拉框
    const newVisible = context.trigger === 'trigger-element-click' ? true : visible;
    innerPopupVisible.value = newVisible;
    props.onPopupVisibleChange?.(newVisible, context);
  };

  const tOverlayStyle = computed(() => {
    let result: TdPopupProps['overlayStyle'] = {};
    const overlayStyle = popupProps.value?.overlayStyle || {};
    if (isFunction(overlayStyle) || (isObject(overlayStyle) && overlayStyle.width)) {
      result = overlayStyle;
    } else if (!autoWidth.value) {
      result = macthWidthFunc;
    }
    return result;
  });

  return {
    tOverlayStyle,
    innerPopupVisible,
    onInnerPopupVisibleChange,
  };
}
