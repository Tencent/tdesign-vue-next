import type { Ref } from 'vue';
import { getSafeTriangle, isPointerFollowingSafePath } from './safe-triangle';
import type { SafeTriangleDirection, SafeTriangleGeometry } from './safe-triangle';
import { createPointerLifecycle } from './pointer-lifecycle';

type ReturnProtectionOptions = {
  trigger: Ref<HTMLElement | undefined>;
  classPrefix: Ref<string>;
  onHold: () => void;
  onRelease: (event: MouseEvent) => void;
};

/** Tracks a pointer returning from a popup toward its parent trigger. */
export function createReturnProtection({ trigger, classPrefix, onHold, onRelease }: ReturnProtectionOptions) {
  let returnTriangle: SafeTriangleGeometry | undefined;
  let returnPreviousPoint: { x: number; y: number } | undefined;
  let returnProgress = 0;
  let returnLastEvent: MouseEvent | undefined;
  let lastPopupPoint: { x: number; y: number } | undefined;

  const stopReturnProtection = () => {
    lifecycle.stop();
    returnTriangle = undefined;
    returnPreviousPoint = undefined;
    returnProgress = 0;
    returnLastEvent = undefined;
  };

  const closeAfterReturn = (event: MouseEvent) => {
    stopReturnProtection();
    onRelease(event);
  };

  const handleReturnPointerDown = (event: PointerEvent) => closeAfterReturn(event);

  const handleReturnMouseMove = (event: MouseEvent) => {
    if (!returnTriangle || !returnPreviousPoint) return;
    if (event.target instanceof Node && trigger.value?.contains(event.target)) {
      stopReturnProtection();
      onHold();
      return;
    }
    const interactive = (event.target as Element | null)?.closest?.(
      `.${classPrefix.value}-menu__item, button, a, input, select, textarea, [role="button"], [role="menuitem"]`,
    );
    const point = { x: event.clientX, y: event.clientY };
    // Permit small mouse jitter on return while still bounding cumulative reversal.
    const result = isPointerFollowingSafePath(
      point,
      returnTriangle,
      returnProgress,
      returnPreviousPoint,
      returnPreviousPoint,
      4,
    );
    if (interactive || !result.active) {
      closeAfterReturn(event);
      return;
    }
    returnProgress = result.progress;
    returnPreviousPoint = point;
    returnLastEvent = event;
    lifecycle.clearTimer();
    lifecycle.setTimer(() => closeAfterReturn(event), 300);
  };

  const getReturnTriangle = (point: { x: number; y: number }, rect: DOMRect) => {
    const { x, y } = point;
    const dx = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0;
    const dy = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0;
    if (!dx && !dy) return undefined;
    const direction: SafeTriangleDirection =
      dx > dy ? (x < rect.left ? 'right' : 'left') : y < rect.top ? 'bottom' : 'top';
    return getSafeTriangle(point, rect, direction);
  };

  const updateReturnTriangle = () => {
    if (!returnTriangle || !returnPreviousPoint || !returnLastEvent) return;
    const rect = trigger.value?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) {
      closeAfterReturn(returnLastEvent);
      return;
    }
    const triangle = getReturnTriangle(returnPreviousPoint, rect);
    if (!triangle) {
      stopReturnProtection();
      onHold();
      return;
    }
    returnTriangle = triangle;
    returnProgress = 0;
  };

  const beginReturnProtection = (event: MouseEvent) => {
    const rect = trigger.value?.getBoundingClientRect();
    if (!rect || !lastPopupPoint || !rect.width || !rect.height) return false;
    const { clientX: x, clientY: y } = event;
    const triangle = getReturnTriangle({ x, y }, rect);
    if (!triangle) return false;
    const direction = triangle.toward;
    const toward = (x - lastPopupPoint.x) * direction.x + (y - lastPopupPoint.y) * direction.y;
    if (toward <= 0) return false;
    const target = event.relatedTarget as Element | null;
    if (target?.closest?.(`.${classPrefix.value}-menu__item, button, a, input, select, textarea`)) return false;
    stopReturnProtection();
    returnTriangle = triangle;
    returnPreviousPoint = { x, y };
    returnLastEvent = event;
    onHold();
    lifecycle.start();
    lifecycle.setTimer(() => closeAfterReturn(event), 300);
    return true;
  };

  const lifecycle = createPointerLifecycle({
    onMove: handleReturnMouseMove,
    onPointerDown: handleReturnPointerDown,
    onReposition: updateReturnTriangle,
  });

  return {
    begin: beginReturnProtection,
    stop: stopReturnProtection,
    recordPoint: (event: MouseEvent) => {
      lastPopupPoint = { x: event.clientX, y: event.clientY };
    },
  };
}
