import type { PopupVisibleChangeContext } from '../../popup/type';
import type { PopupProps } from '../../popup';
import { ref } from 'vue';

type KebabPopupProps = PopupProps & {
  'on-visible-change'?: PopupProps['onVisibleChange'];
};

/**
 * 统一管理弹窗可见性变更的 Hook
 * 解决受控关闭面板时未触发 popupProps.onVisibleChange 的问题
 */
export function usePopupVisibleChange(popupProps?: PopupProps) {
  const popupVisible = ref(false);

  // 通知 popupProps 中的 visible 变化回调
  // 兼容 kebab-case 写法
  const notifyPopupVisibleChange = (visible: boolean, context?: PopupVisibleChangeContext) => {
    const kebabHandler = (popupProps as KebabPopupProps | undefined)?.['on-visible-change'];
    const handler = popupProps?.onVisibleChange ?? kebabHandler;
    handler?.(visible, context);
  };

  // 受控关闭面板，并主动触发 onVisibleChange
  // 程序化关闭统一标记 trigger: 'trigger-element-close'
  const closePopup = (context?: PopupVisibleChangeContext) => {
    if (!popupVisible.value) return;
    notifyPopupVisibleChange(false, { trigger: 'trigger-element-close', ...context });
    popupVisible.value = false;
  };

  return {
    popupVisible,
    notifyPopupVisibleChange,
    closePopup,
  };
}
