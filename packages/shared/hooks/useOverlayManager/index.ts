import { overlayManager } from '@tdesign/common-js/utils/overlayManager';

import { onBeforeUnmount, watch } from 'vue';

import type { OverlayEntry, OverlayType } from '@tdesign/common-js/utils/overlayManager';
import type { Ref } from 'vue';

export function useOverlayManager(
  type: OverlayType,
  {
    visible,
    getElement,
  }: {
    visible: Ref<boolean>;
    getElement?: () => HTMLElement | null;
  },
) {
  let entry: OverlayEntry | null = null;

  const open = () => {
    if (entry || typeof window === 'undefined') return;
    entry = overlayManager.register({ type, getElement });
  };

  const close = () => {
    if (!entry) return;
    overlayManager.unregister(entry);
    entry = null;
  };

  const isTopOverlay = () => !!entry && overlayManager.isTop(entry);

  watch(visible, (visible) => (visible ? open() : close()), { immediate: true });

  onBeforeUnmount(close);

  return { isTopOverlay };
}
