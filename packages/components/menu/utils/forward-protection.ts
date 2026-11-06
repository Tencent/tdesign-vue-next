import { getSafeTriangle, isPointerFollowingSafePath } from './safe-triangle';
import type { SafeTriangleDirection, SafeTriangleGeometry } from './safe-triangle';
import { createPointerLifecycle } from './pointer-lifecycle';

type MenuProtection = {
  owner: HTMLElement;
  shouldDefer: (event: MouseEvent) => boolean;
  pending?: () => void;
  pendingTarget?: HTMLElement;
};
const menuProtections = new WeakMap<Element, MenuProtection>();

type ForwardProtectionOptions = {
  isVisible: () => boolean;
  getMode: () => string;
  getPrefix: () => string;
  getTrigger: () => HTMLElement | undefined;
  getSafePopupElement: () => HTMLElement | undefined;
  getActualDirection: () => SafeTriangleDirection;
  onHold: () => void;
  onRelease: (event: MouseEvent) => void;
  onEnterPopup: () => void;
};

/** Coordinates the pointer path from a trigger toward its open popup. */
export function createForwardProtection({
  isVisible,
  getMode,
  getPrefix,
  getTrigger,
  getSafePopupElement,
  getActualDirection,
  onHold,
  onRelease,
  onEnterPopup,
}: ForwardProtectionOptions) {
  let isCursorInSafeTriangle = false;
  let safeTriangle: SafeTriangleGeometry | undefined;
  let safeTriangleAnchor: { x: number; y: number } | undefined;
  let safePopupRect: DOMRect | undefined;
  let triggerPointerPoint: { x: number; y: number } | undefined;
  let previousSafePointerPoint: { x: number; y: number } | undefined;
  let lastAdvancingPointerPoint: { x: number; y: number } | undefined;
  let furthestPointerProgress = 0;
  let enteredWithForwardIntent = false;
  let safeTriangleLastMove = 0;
  let lastPointerJitter = 0;
  let safeTriangleLastEvent: MouseEvent | undefined;
  let safeTriangleExtended = false;
  let protectedMenu: Element | undefined;
  let protection: MenuProtection | undefined;

  const updateSafeTriangle = () => {
    if (!isVisible() || !safeTriangleAnchor) return;
    const popup = getSafePopupElement();
    if (!popup) return;
    safePopupRect = popup.getBoundingClientRect();
    safeTriangle = getSafeTriangle(safeTriangleAnchor, safePopupRect, getActualDirection());
  };

  const clearSafeTriangle = () => {
    const pending = protection?.pending;
    if (protectedMenu && menuProtections.get(protectedMenu) === protection) menuProtections.delete(protectedMenu);
    protectedMenu = undefined;
    protection = undefined;
    safeTriangleLastEvent = undefined;
    lastPointerJitter = 0;
    safeTriangleExtended = false;
    safeTriangle = undefined;
    safeTriangleAnchor = undefined;
    safePopupRect = undefined;
    previousSafePointerPoint = undefined;
    lastAdvancingPointerPoint = undefined;
    furthestPointerProgress = 0;
    enteredWithForwardIntent = false;
    isCursorInSafeTriangle = false;
    forwardLifecycle.stop();
    pending?.();
  };

  const scheduleSafeTriangleTimeout = (event: MouseEvent) => {
    safeTriangleLastMove = performance.now();
    safeTriangleLastEvent = event;
    if (forwardLifecycle.hasTimer() && !safeTriangleExtended) return;
    forwardLifecycle.clearTimer();
    safeTriangleExtended = false;
    const release = () => {
      if (isCursorInSafeTriangle && safeTriangleLastEvent) handleLeaveSafeTriangle(safeTriangleLastEvent);
      clearSafeTriangle();
    };
    const check = () => {
      const remaining = 300 - (performance.now() - safeTriangleLastMove);
      if (remaining > 0) {
        forwardLifecycle.setTimer(check, remaining);
        return;
      }
      const lastEvent = safeTriangleLastEvent;
      if (!lastEvent) return;
      // Quantized slow movement can have an unusually long inter-event gap.
      // Give that specific pattern one short retry before activating a sibling.
      if (
        protection?.pending &&
        furthestPointerProgress > 0 &&
        lastPointerJitter > 0 &&
        performance.now() - lastPointerJitter < 600
      ) {
        safeTriangleExtended = true;
        forwardLifecycle.setTimer(release, 200);
        return;
      }
      // A pointer that has advanced toward the popup may pause over a
      // non-interactive surface or a leaf item. Leaf clicks reach it directly;
      // sibling submenus and other interactive targets are released normally.
      const below = document.elementFromPoint?.(lastEvent.clientX, lastEvent.clientY);
      const interactive = below?.closest(
        `.${getPrefix()}-menu__item, button, a, input, select, textarea, [role="button"], [role="menuitem"]`,
      );
      const leaf = below?.closest(`.${getPrefix()}-menu__item--plain`);
      const overSiblingLeaf = leaf && interactive === leaf && protectedMenu?.contains(leaf);
      if ((furthestPointerProgress > 0 || enteredWithForwardIntent) && ((below && !interactive) || overSiblingLeaf)) {
        safeTriangleExtended = true;
        forwardLifecycle.setTimer(release, 700);
      } else {
        release();
      }
    };
    forwardLifecycle.setTimer(check, 300);
  };

  const beginSafeTriangle = (event: MouseEvent) => {
    if (getMode() !== 'popup' || !isVisible()) return;
    const direction = getActualDirection();
    const sibling = (event.relatedTarget as Element | null)?.closest?.(`.${getPrefix()}-submenu`);
    const dx = triggerPointerPoint ? event.clientX - triggerPointerPoint.x : 0;
    const dy = triggerPointerPoint ? event.clientY - triggerPointerPoint.y : 0;
    const forward = direction === 'right' ? dx : direction === 'left' ? -dx : direction === 'bottom' ? dy : -dy;
    const lateral = direction === 'right' || direction === 'left' ? dy : dx;
    // A pointer moving away from the popup is not entering it. In
    // particular, a large leave event should not create a wide grace area.
    if (triggerPointerPoint && forward < 0) return;
    if (sibling && sibling !== event.currentTarget && lateral !== 0 && forward <= 0) return;
    const popup = getSafePopupElement();
    const triggerRect = getTrigger()?.getBoundingClientRect();
    const popupRect = popup?.getBoundingClientRect();
    if (sibling && sibling !== event.currentTarget && triggerPointerPoint && popupRect) {
      const approach = getSafeTriangle(triggerPointerPoint, popupRect, direction);
      if (approach && !isPointerFollowingSafePath({ x: event.clientX, y: event.clientY }, approach, 0).active) return;
    }
    if (triggerRect && popupRect && triggerRect.width > 0 && triggerRect.height > 0) {
      const horizontal = direction === 'right' || direction === 'left';
      const position = horizontal ? event.clientY : event.clientX;
      const min = horizontal ? Math.min(triggerRect.top, popupRect.top) : Math.min(triggerRect.left, popupRect.left);
      const max = horizontal
        ? Math.max(triggerRect.bottom, popupRect.bottom)
        : Math.max(triggerRect.right, popupRect.right);
      if (position < min - 3 || position > max + 3) return;
    }
    safeTriangleAnchor = { x: event.clientX, y: event.clientY };
    previousSafePointerPoint = safeTriangleAnchor;
    lastAdvancingPointerPoint = safeTriangleAnchor;
    furthestPointerProgress = 0;
    enteredWithForwardIntent = forward > 0.25;
    updateSafeTriangle();
    if (!safeTriangle) return;
    const owner = getTrigger();
    protectedMenu = owner?.closest(`.${getPrefix()}-submenu`)?.parentElement || undefined;
    if (owner && protectedMenu) {
      protection = {
        owner,
        shouldDefer: (move) =>
          !!safeTriangle &&
          ((enteredWithForwardIntent &&
            move.clientX === previousSafePointerPoint?.x &&
            move.clientY === previousSafePointerPoint?.y) ||
            isPointerFollowingSafePath(
              { x: move.clientX, y: move.clientY },
              safeTriangle,
              furthestPointerProgress,
              previousSafePointerPoint,
              lastAdvancingPointerPoint,
            ).active),
      };
      menuProtections.set(protectedMenu, protection);
    }
    handleEnterSafeTriangle();
    forwardLifecycle.start();
    scheduleSafeTriangleTimeout(event);
  };

  const handleEnterSafeTriangle = () => {
    isCursorInSafeTriangle = true;
    onHold();
  };

  const handleLeaveSafeTriangle = (event: MouseEvent) => {
    if (!isCursorInSafeTriangle) return;
    isCursorInSafeTriangle = false;
    onRelease(event);
  };

  const isPointInPopup = (x: number, y: number) => {
    const rect = safePopupRect;
    return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const handleDocumentMouseMove = (event: MouseEvent) => {
    if (!safeTriangle) return;

    // The mousemove that caused mouseleave can reach this listener after it is
    // installed. It is the anchor itself, not a reversal or lateral movement.
    if (event.clientX === previousSafePointerPoint?.x && event.clientY === previousSafePointerPoint?.y) return;

    if (isPointInPopup(event.clientX, event.clientY)) {
      if (protection) protection.pending = undefined;
      onEnterPopup();
      return;
    }

    const result = isPointerFollowingSafePath(
      { x: event.clientX, y: event.clientY },
      safeTriangle,
      furthestPointerProgress,
      previousSafePointerPoint,
      lastAdvancingPointerPoint,
    );
    if (!result.active) {
      handleLeaveSafeTriangle(event);
      clearSafeTriangle();
      return;
    }
    if (result.progress > furthestPointerProgress + 0.25) {
      lastAdvancingPointerPoint = { x: event.clientX, y: event.clientY };
    } else {
      lastPointerJitter = performance.now();
    }
    furthestPointerProgress = result.progress;
    previousSafePointerPoint = { x: event.clientX, y: event.clientY };
    scheduleSafeTriangleTimeout(event);

    handleEnterSafeTriangle();
  };

  const handleDocumentPointerDown = (event: PointerEvent) => {
    if (protection && !(event.target instanceof Node && protection.pendingTarget?.contains(event.target))) {
      protection.pending = undefined;
    }
    handleLeaveSafeTriangle(event);
    clearSafeTriangle();
  };

  const forwardLifecycle = createPointerLifecycle({
    onMove: handleDocumentMouseMove,
    onPointerDown: handleDocumentPointerDown,
    onReposition: updateSafeTriangle,
  });

  return {
    begin: beginSafeTriangle,
    clear: clearSafeTriangle,
    update: updateSafeTriangle,
    isActive: () => isCursorInSafeTriangle,
    cancelPending: () => {
      if (protection) protection.pending = undefined;
    },
    recordTrigger: (event: MouseEvent) => {
      triggerPointerPoint = { x: event.clientX, y: event.clientY };
    },
  };
}

/** Delays another submenu only while its sibling owns an active safe path. */
export function deferProtectedSibling(element: HTMLElement, event: MouseEvent, prefix: string, resume: () => void) {
  const parentMenu = element.closest(`.${prefix}-submenu`)?.parentElement;
  const active = parentMenu && menuProtections.get(parentMenu);
  if (!active || active.owner === element || !active.shouldDefer(event)) return false;
  active.pendingTarget = element;
  active.pending = () => {
    if (element.matches(':hover')) resume();
  };
  return true;
}
