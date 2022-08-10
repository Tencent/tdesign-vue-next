import { ref, toRefs, computed, CSSProperties } from 'vue';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import { TdSelectInputProps } from './type';
import { TdPopupProps, PopupVisibleChangeContext } from '../popup';

export type overlayInnerStyleProps = Pick<
  TdSelectInputProps,
  'popupProps' | 'autoWidth' | 'readonly' | 'onPopupVisibleChange' | 'disabled'
>;

// 单位：px
const MAX_POPUP_WIDTH = 1000;

export default function useOverlayInnerStyle(props: overlayInnerStyleProps) {
  const { popupProps, autoWidth } = toRefs(props);
  const innerPopupVisible = ref(false);

  const matchWidthFunc = (triggerElement: HTMLElement, popupElement: HTMLElement) => {
    // 避免因滚动条出现文本省略，预留宽度 8
    const SCROLLBAR_WIDTH = popupElement.scrollHeight > popupElement.offsetHeight ? 8 : 0;
    const width =
      popupElement.offsetWidth + SCROLLBAR_WIDTH >= triggerElement.offsetWidth
        ? popupElement.offsetWidth
        : triggerElement.offsetWidth;
    let otherOverlayInnerStyle: CSSProperties = {};
    if (
      popupProps.value &&
      typeof popupProps.value.overlayInnerStyle === 'object' &&
      !popupProps.value.overlayInnerStyle.width
    ) {
      otherOverlayInnerStyle = popupProps.value.overlayInnerStyle;
    }
    return {
      width: `${Math.min(width, MAX_POPUP_WIDTH)}px`,
      ...otherOverlayInnerStyle,
    };
  };

  const onInnerPopupVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
    if (props.disabled || props.readonly) return;
    innerPopupVisible.value = visible;
    props.onPopupVisibleChange?.(visible, context);
  };

  const tOverlayInnerStyle = computed(() => {
    let result: TdPopupProps['overlayInnerStyle'] = {};
    const overlayInnerStyle = popupProps.value?.overlayInnerStyle || {};
    if (isFunction(overlayInnerStyle) || (isObject(overlayInnerStyle) && overlayInnerStyle.width)) {
      result = overlayInnerStyle;
    } else if (!autoWidth.value) {
      result = matchWidthFunc;
    }
    return result;
  });

  return {
    tOverlayInnerStyle,
    innerPopupVisible,
    onInnerPopupVisibleChange,
  };
}
