import type { PopupVisibleChangeContext } from '../../popup/type';
import type { PopupProps } from '../../popup';
import { ref } from 'vue';

/**
 * 统一管理弹窗可见性变更的 Hook
 * 解决受控关闭面板时未触发 popupProps.onVisibleChange 的问题
 */
export function usePopupVisibleChange(popupProps?: PopupProps) {
  const popupVisible = ref(false);

  // 通知 popupProps 中的 visible 变化回调
  // 兼容 kebab-case 写法
  const notifyPopupVisibleChange = (visible: boolean, context?: PopupVisibleChangeContext) => {
    popupProps?.onVisibleChange?.(visible, context);
    // @ts-ignore types only declare onVisibleChange，but not declare on-visible-change
    popupProps?.['on-visible-change']?.(visible, context);
  };

  // 受控关闭面板，并主动触发 onVisibleChange
  // 程序化关闭统一标记 trigger: 'trigger-element-close'
  const closePopup = (context?: PopupVisibleChangeContext) => {
    if (!popupVisible.value) return;
    notifyPopupVisibleChange(false, context ?? { trigger: 'trigger-element-close' });
    popupVisible.value = false;
  };

  return {
    popupVisible,
    notifyPopupVisibleChange,
    closePopup,
  };
}
