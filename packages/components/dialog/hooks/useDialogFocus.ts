import { onBeforeUnmount, watch } from 'vue';

import { DialogFocusController } from '@tdesign/common-js/dialog/focus';

import type { ComputedRef, Ref } from 'vue';
import type { DialogFocusable } from '../type';

interface UseDialogFocusParams {
  visible: Ref<boolean>;
  classPrefix: string;
  dialogRef: Ref<HTMLElement | undefined>;
  focusable: ComputedRef<DialogFocusable | undefined>;
  getDialogCardEl: () => HTMLElement | null;
  isTop: () => boolean;
}

export function useDialogFocus({
  visible,
  classPrefix,
  dialogRef,
  getDialogCardEl,
  focusable,
  isTop,
}: UseDialogFocusParams) {
  const controller = new DialogFocusController({
    classPrefix,
    isTop,
    getDialogEl: () => dialogRef.value ?? null,
    getDialogCardEl,
    getFocusable: () => focusable.value,
  });

  watch(visible, (value) => controller.onVisibleChange(value), { immediate: true });

  watch(
    () => visible.value && !!focusable.value?.focusTrap,
    (enabled, _, onCleanup) => {
      if (!enabled) return;
      onCleanup(controller.bindTrap());
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    controller.restore();
  });

  return {
    focusDialog: () => controller.focus(),
    restoreTriggerFocus: () => controller.restore(),
  };
}
