import {
  defineComponent,
  computed,
  inject,
  ref,
  provide,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  watch,
  Slots,
  toRefs,
  reactive,
  nextTick,
  Transition,
  Teleport,
} from 'vue';
import { isFunction } from 'lodash-es';
import {
  useRipple,
  useContent,
  useTNodeJSX,
  usePrefixClass,
  useCollapseAnimation,
  useKeepAnimation,
} from '@tdesign/shared-hooks';

import props from './submenu-props';
import { TdMenuInterface, TdSubMenuInterface, TdMenuItem } from './types';
import FakeArrow from '../common-components/fake-arrow';

import { Popup, PopupPlacement } from '../popup';

import { TdSubmenuProps } from './type';
import { getSafeTriangle, isPointerFollowingSafePath } from './utils/safe-triangle';
import type { SafeTriangleDirection, SafeTriangleGeometry } from './utils/safe-triangle';

type MenuProtection = {
  owner: HTMLElement;
  shouldDefer: (event: MouseEvent) => boolean;
  pending?: () => void;
  pendingTarget?: HTMLElement;
};
const menuProtections = new WeakMap<Element, MenuProtection>();

export default defineComponent({
  name: 'TSubmenu',
  props: {
    ...props,
    expandType: String,
  },
  setup(
    props: TdSubmenuProps & {
      expandType?: string;
    },
    { slots },
  ) {
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const instance = getCurrentInstance();
    const menu = inject<TdMenuInterface>('TdMenu');
    const { value } = toRefs(props);
    const { theme, activeValues, expandValues, isHead, open } = menu;

    const submenu = inject<TdSubMenuInterface>('TdSubmenu', {});
    const { setSubPopup, closeParentPopup, cancelHideTimer } = submenu;

    const mode = computed(() => props.expandType || menu.mode.value);

    const menuItems = ref([]); // 因composition-api的缺陷，不用reactive， 详见：https://github.com/vuejs/composition-api/issues/637
    const isActive = computed(() => activeValues.value.indexOf(props.value) > -1);
    const popupVisible = ref(false);
    const isCursorInPopup = ref(false);
    const isCursorInSafeTriangle = ref(false);
    const rippleColor = computed(() => (theme.value === 'light' ? '#E7E7E7' : '#383838'));
    const isOpen = computed(() => {
      if (mode.value === 'popup') {
        return popupVisible.value;
      }
      return expandValues ? expandValues.value?.includes(props.value) : false;
    });
    const isNested = ref(false); // 是否嵌套

    const popupWrapperRef = ref<HTMLElement>();
    const subPopupRef = ref<HTMLElement>();
    const submenuRef = ref<HTMLElement>();
    const safeTriangle = ref<SafeTriangleGeometry>();
    const safeTriangleZIndex = ref('');
    const transitionClass = usePrefixClass('slide-down');
    const { keepExpand } = useKeepAnimation();
    const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } = useCollapseAnimation();
    useRipple(submenuRef, rippleColor);

    let safeTriangleAnchor: { x: number; y: number } | undefined;
    let safePopupRect: DOMRect | undefined;
    let triggerPointerPoint: { x: number; y: number } | undefined;
    let previousSafePointerPoint: { x: number; y: number } | undefined;
    let lastAdvancingPointerPoint: { x: number; y: number } | undefined;
    let furthestPointerProgress = 0;
    let enteredWithForwardIntent = false;
    let safeTriangleTimer: ReturnType<typeof setTimeout> | undefined;
    let safeTriangleLastMove = 0;
    let lastPointerJitter = 0;
    let safeTriangleLastEvent: MouseEvent | undefined;
    let safeTriangleExtended = false;
    let listeningMouseMove = false;
    let protectedMenu: Element | undefined;
    let protection: MenuProtection | undefined;
    let returnTriangle: SafeTriangleGeometry | undefined;
    let returnPreviousPoint: { x: number; y: number } | undefined;
    let returnProgress = 0;
    let returnTimer: ReturnType<typeof setTimeout> | undefined;
    let returnLastEvent: MouseEvent | undefined;
    let lastPopupPoint: { x: number; y: number } | undefined;

    // 存储 setTimeout 的 timer ID，用于清除定时器
    const showTimer = ref<ReturnType<typeof setTimeout> | null>(null);
    const hideTimer = ref<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = () => {
      if (showTimer.value !== null) {
        clearTimeout(showTimer.value);
        showTimer.value = null;
      }
      if (hideTimer.value !== null) {
        clearTimeout(hideTimer.value);
        hideTimer.value = null;
      }
    };

    // 记录 Popper 的实际方位（包含翻转），用于计算安全三角形。
    const actualPlacement = ref<SafeTriangleDirection | ''>('');

    const getActualDirection = (): SafeTriangleDirection => {
      if (actualPlacement.value) return actualPlacement.value as SafeTriangleDirection;
      return isNested.value || !isHead ? 'right' : 'bottom';
    };

    const getPopupElement = () =>
      popupWrapperRef.value?.closest<HTMLElement>(`.${classPrefix.value}-popup`) ?? popupWrapperRef.value;

    const updateSafeTriangle = () => {
      if (!popupVisible.value || !safeTriangleAnchor) return;
      const popup = getPopupElement();
      if (!popup) return;
      safePopupRect = popup.getBoundingClientRect();
      safeTriangle.value = getSafeTriangle(safeTriangleAnchor, safePopupRect, getActualDirection());
      safeTriangleZIndex.value = window.getComputedStyle(popup).zIndex;
    };

    const clearSafeTriangle = () => {
      const pending = protection?.pending;
      if (protectedMenu && menuProtections.get(protectedMenu) === protection) menuProtections.delete(protectedMenu);
      protectedMenu = undefined;
      protection = undefined;
      if (safeTriangleTimer) clearTimeout(safeTriangleTimer);
      safeTriangleTimer = undefined;
      safeTriangleLastEvent = undefined;
      lastPointerJitter = 0;
      safeTriangleExtended = false;
      safeTriangle.value = undefined;
      safeTriangleAnchor = undefined;
      safePopupRect = undefined;
      previousSafePointerPoint = undefined;
      lastAdvancingPointerPoint = undefined;
      furthestPointerProgress = 0;
      enteredWithForwardIntent = false;
      isCursorInSafeTriangle.value = false;
      stopMouseMoveListener();
      pending?.();
    };

    const scheduleSafeTriangleTimeout = (event: MouseEvent) => {
      safeTriangleLastMove = performance.now();
      safeTriangleLastEvent = event;
      if (safeTriangleTimer && !safeTriangleExtended) return;
      if (safeTriangleTimer) clearTimeout(safeTriangleTimer);
      safeTriangleExtended = false;
      const release = () => {
        if (isCursorInSafeTriangle.value && safeTriangleLastEvent) handleLeaveSafeTriangle(safeTriangleLastEvent);
        clearSafeTriangle();
      };
      const check = () => {
        const remaining = 300 - (performance.now() - safeTriangleLastMove);
        if (remaining > 0) {
          safeTriangleTimer = setTimeout(check, remaining);
          return;
        }
        const lastEvent = safeTriangleLastEvent;
        if (!lastEvent) return;
        // A pointer that has advanced toward the popup may pause over a
        // non-interactive surface or a leaf item. Leaf clicks reach it directly;
        // sibling submenus and other interactive targets are released normally.
        const below = document.elementFromPoint?.(lastEvent.clientX, lastEvent.clientY);
        const interactive = below?.closest(
          `.${classPrefix.value}-menu__item, button, a, input, select, textarea, [role="button"], [role="menuitem"]`,
        );
        const leaf = below?.closest(`.${classPrefix.value}-menu__item--plain`);
        const overSiblingLeaf = leaf && interactive === leaf && protectedMenu?.contains(leaf);
        // Quantized slow movement can have an unusually long inter-event gap.
        // Give that specific pattern one short retry before activating a sibling.
        if (
          protection?.pending &&
          furthestPointerProgress > 0 &&
          lastPointerJitter > 0 &&
          performance.now() - lastPointerJitter < 600
        ) {
          safeTriangleExtended = true;
          safeTriangleTimer = setTimeout(release, 200);
          return;
        }
        if ((furthestPointerProgress > 0 || enteredWithForwardIntent) && ((below && !interactive) || overSiblingLeaf)) {
          safeTriangleExtended = true;
          safeTriangleTimer = setTimeout(release, 700);
        } else {
          release();
        }
      };
      safeTriangleTimer = setTimeout(check, 300);
    };

    const beginSafeTriangle = (event: MouseEvent) => {
      if (mode.value !== 'popup' || !popupVisible.value) return;
      const direction = getActualDirection();
      const sibling = (event.relatedTarget as Element | null)?.closest?.(`.${classPrefix.value}-submenu`);
      const dx = triggerPointerPoint ? event.clientX - triggerPointerPoint.x : 0;
      const dy = triggerPointerPoint ? event.clientY - triggerPointerPoint.y : 0;
      const forward = direction === 'right' ? dx : direction === 'left' ? -dx : direction === 'bottom' ? dy : -dy;
      const lateral = direction === 'right' || direction === 'left' ? dy : dx;
      // A pointer moving away from the popup is not entering it. In
      // particular, a large leave event should not create a wide grace area.
      if (triggerPointerPoint && forward < 0) return;
      if (sibling && sibling !== event.currentTarget && lateral !== 0 && forward <= 0) return;
      const popup = getPopupElement();
      const triggerRect = submenuRef.value?.getBoundingClientRect();
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
      if (!safeTriangle.value) return;
      const owner = submenuRef.value;
      protectedMenu = owner?.closest(`.${classPrefix.value}-submenu`)?.parentElement || undefined;
      if (owner && protectedMenu) {
        protection = {
          owner,
          shouldDefer: (move) =>
            !!safeTriangle.value &&
            ((enteredWithForwardIntent &&
              move.clientX === previousSafePointerPoint?.x &&
              move.clientY === previousSafePointerPoint?.y) ||
              isPointerFollowingSafePath(
                { x: move.clientX, y: move.clientY },
                safeTriangle.value,
                furthestPointerProgress,
                previousSafePointerPoint,
                4,
                lastAdvancingPointerPoint,
              ).active),
        };
        menuProtections.set(protectedMenu, protection);
      }
      handleEnterSafeTriangle();
      startMouseMoveListener();
      scheduleSafeTriangleTimeout(event);
    };

    const handlePlacementChange = ({ placement }: { placement: string }) => {
      const spacerEl = popupWrapperRef.value;
      if (!spacerEl) return;

      const prefixClassName = `${classPrefix.value}-menu__spacer`;
      const isBottom = placement.startsWith('bottom');
      const isTop = placement.startsWith('top');

      spacerEl.classList.toggle(`${prefixClassName}--bottom`, isBottom);
      spacerEl.classList.toggle(`${prefixClassName}--top`, isTop);

      let dir: SafeTriangleDirection = 'right';
      if (placement.startsWith('left')) dir = 'left';
      else if (placement.startsWith('top')) dir = 'top';
      else if (placement.startsWith('bottom')) dir = 'bottom';
      if (actualPlacement.value !== dir) {
        actualPlacement.value = dir;
      }
      updateSafeTriangle();
    };

    const classes = computed(() => [
      `${classPrefix.value}-submenu`,
      {
        [`${classPrefix.value}-is-disabled`]: props.disabled,
        [`${classPrefix.value}-is-opened`]: isOpen.value,
      },
    ]);
    const overlayInnerClassName = computed(() => [
      `${classPrefix.value}-menu__popup`,
      `${classPrefix.value}-is-${isHead ? 'horizontal' : 'vertical'}`,
      {
        [`${classPrefix.value}-is-opened`]: popupVisible.value,
      },
      props.popupProps?.overlayInnerClassName,
    ]);
    const overlayClassName = computed(() => [
      `${classPrefix.value}-menu--${theme.value}`,
      isHead && `${classPrefix.value}-is-head-menu`,
      { [`${classPrefix.value}-menu-is-nested`]: isNested.value },
      props.popupProps?.overlayClassName,
    ]);
    const popupOverlayStyle = computed(() => {
      const style = props.popupProps?.overlayStyle;
      if (popupVisible.value) return style;
      if (isFunction(style)) {
        return (trigger: HTMLElement, popup: HTMLElement) => ({ ...style(trigger, popup), pointerEvents: 'none' });
      }
      return { ...style, pointerEvents: 'none' };
    });
    const submenuClass = computed(() => [
      `${classPrefix.value}-menu__item`,
      {
        [`${classPrefix.value}-is-disabled`]: props.disabled,
        [`${classPrefix.value}-is-opened`]: isOpen.value,
        [`${classPrefix.value}-is-active`]: isActive.value,
      },
    ]);
    const subClass = computed(() => [
      `${classPrefix.value}-menu__sub`,
      {
        [`${classPrefix.value}-is-opened`]: isOpen.value,
      },
    ]);
    const arrowClass = computed(() => [
      {
        [`${classPrefix.value}-fake-arrow--active`]: isOpen.value,
      },
    ]);

    const hasMenuParent = () => {
      let parent = instance?.parent;

      while (parent) {
        if (/^T(?:HeadMenu|Menu|Submenu)$/i.test(parent.type?.name ?? '')) {
          return true;
        }
        parent = parent.parent;
      }

      return false;
    };

    provide<TdSubMenuInterface>(
      'TdSubmenu',
      reactive({
        value,
        addMenuItem: (item: TdMenuItem) => {
          menuItems.value.push(item);
          if (submenu) {
            submenu.addMenuItem(item);
          }
        },
        setSubPopup: (ref: HTMLElement) => {
          subPopupRef.value = ref;
        },
        closeParentPopup: (e: MouseEvent) => {
          const rect = getPopupElement()?.getBoundingClientRect();
          if (
            rect &&
            rect.width > 0 &&
            rect.height > 0 &&
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            return;
          }
          clearTimers();

          // 设置父级的延迟隐藏
          hideTimer.value = setTimeout(() => {
            popupVisible.value = false;
            hideTimer.value = null;
          }, 100);

          // 继续通知上级父级
          if (isFunction(closeParentPopup)) {
            closeParentPopup(e);
          }
        },
        cancelHideTimer: () => {
          // 取消当前级别的隐藏定时器
          if (hideTimer.value !== null) {
            clearTimeout(hideTimer.value);
            hideTimer.value = null;
          }
          // 递归取消所有父级的隐藏定时器
          if (isFunction(cancelHideTimer)) {
            cancelHideTimer();
          }
        },
      }),
    );

    const passSubPopupRefToParent = (val: HTMLElement) => {
      if (isFunction(setSubPopup)) {
        setSubPopup(val);
      }
    };

    // methods
    const handleMouseEnter = (event?: MouseEvent) => {
      if (props.disabled) return;
      const element = submenuRef.value;
      const parentMenu = element?.closest(`.${classPrefix.value}-submenu`)?.parentElement;
      const active = parentMenu && menuProtections.get(parentMenu);
      if (event && element && active && active.owner !== element && active.shouldDefer(event)) {
        active.pendingTarget = element;
        active.pending = () => {
          if (element.matches(':hover')) handleMouseEnter();
        };
        return;
      }
      clearTimers();
      clearSafeTriangle();

      // 通知父级取消隐藏定时器
      if (isFunction(cancelHideTimer)) {
        cancelHideTimer();
      }

      showTimer.value = setTimeout(() => {
        if (!popupVisible.value) {
          open(props.value);

          // popupVisible设置为TRUE之后打开popup，因此需要在nextTick中确保可以拿到ref值
          nextTick().then(() => {
            passSubPopupRefToParent(popupWrapperRef.value);
          });
        }
        popupVisible.value = true;
        showTimer.value = null;
      }, 0);
    };

    const targetInPopup = (el: HTMLElement) => el?.classList.contains(`${classPrefix.value}-menu__popup`);

    const handleMouseLeave = (e: MouseEvent) => {
      beginSafeTriangle(e);
      clearTimers();

      const current = e.currentTarget as Element;
      const sibling = (e.relatedTarget as Element | null)?.closest?.(`.${classPrefix.value}-submenu`);
      if (
        sibling &&
        sibling !== current &&
        sibling.parentElement === current?.parentElement &&
        !isCursorInSafeTriangle.value
      ) {
        popupVisible.value = false;
        return;
      }

      hideTimer.value = setTimeout(() => {
        const inPopup = targetInPopup(e.relatedTarget as HTMLElement);

        if (isCursorInPopup.value || inPopup) {
          hideTimer.value = null;
          return;
        }
        if (isCursorInSafeTriangle.value) {
          hideTimer.value = null;
          return;
        }
        popupVisible.value = false;
        hideTimer.value = null;
      }, 100);
    };

    const stopReturnProtection = () => {
      if (returnTimer) clearTimeout(returnTimer);
      returnTimer = undefined;
      returnTriangle = undefined;
      returnPreviousPoint = undefined;
      returnProgress = 0;
      returnLastEvent = undefined;
      document.removeEventListener('mousemove', handleReturnMouseMove);
      document.removeEventListener('pointerdown', handleReturnPointerDown, true);
      window.removeEventListener('scroll', updateReturnTriangle, true);
      window.removeEventListener('resize', updateReturnTriangle);
    };

    const closeAfterReturn = (event: MouseEvent) => {
      stopReturnProtection();
      clearTimers();
      hideTimer.value = setTimeout(() => {
        if (!isCursorInPopup.value) popupVisible.value = false;
        hideTimer.value = null;
      }, 100);
      closeParentPopup?.(event);
    };

    const handleReturnPointerDown = (event: PointerEvent) => closeAfterReturn(event);

    const handleReturnMouseMove = (event: MouseEvent) => {
      if (!returnTriangle || !returnPreviousPoint) return;
      if (event.target instanceof Node && submenuRef.value?.contains(event.target)) {
        stopReturnProtection();
        clearTimers();
        cancelHideTimer?.();
        return;
      }
      const interactive = (event.target as Element | null)?.closest?.(
        `.${classPrefix.value}-menu__item, button, a, input, select, textarea, [role="button"], [role="menuitem"]`,
      );
      const point = { x: event.clientX, y: event.clientY };
      const result = isPointerFollowingSafePath(point, returnTriangle, returnProgress, returnPreviousPoint);
      if (interactive || !result.active) {
        closeAfterReturn(event);
        return;
      }
      returnProgress = result.progress;
      returnPreviousPoint = point;
      returnLastEvent = event;
      if (returnTimer) clearTimeout(returnTimer);
      returnTimer = setTimeout(() => closeAfterReturn(event), 300);
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
      const rect = submenuRef.value?.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) {
        closeAfterReturn(returnLastEvent);
        return;
      }
      const triangle = getReturnTriangle(returnPreviousPoint, rect);
      if (!triangle) {
        stopReturnProtection();
        clearTimers();
        cancelHideTimer?.();
        return;
      }
      returnTriangle = triangle;
      returnProgress = 0;
    };

    const beginReturnProtection = (event: MouseEvent) => {
      const rect = submenuRef.value?.getBoundingClientRect();
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
      clearTimers();
      cancelHideTimer?.();
      document.addEventListener('mousemove', handleReturnMouseMove, { passive: true });
      document.addEventListener('pointerdown', handleReturnPointerDown, true);
      window.addEventListener('scroll', updateReturnTriangle, true);
      window.addEventListener('resize', updateReturnTriangle);
      returnTimer = setTimeout(() => closeAfterReturn(event), 300);
      return true;
    };

    const handleMouseLeavePopup = (e: any) => {
      const { toElement, relatedTarget } = e;
      let target = toElement || relatedTarget;

      if (target === subPopupRef.value) return;

      const isSubmenu = (el: Element) => el === submenuRef.value;
      while (target !== null && target !== document && !isSubmenu(target)) {
        target = target.parentNode;
      }

      isCursorInPopup.value = false;

      if (!isSubmenu(target)) {
        if (beginReturnProtection(e)) return;
        clearTimers();

        // 使用延迟隐藏，避免在子项之间移动时闪烁
        hideTimer.value = setTimeout(() => {
          if (isCursorInPopup.value) return;
          popupVisible.value = false;
          hideTimer.value = null;
        }, 100);

        // 立即通知父级也开始延迟隐藏
        closeParentPopup?.(e);
      }
    };

    const handleEnterSafeTriangle = () => {
      isCursorInSafeTriangle.value = true;
      clearTimers();
      if (isFunction(cancelHideTimer)) cancelHideTimer();
    };

    const handleLeaveSafeTriangle = (event: MouseEvent) => {
      if (!isCursorInSafeTriangle.value) return;
      isCursorInSafeTriangle.value = false;
      clearTimers();
      hideTimer.value = setTimeout(() => {
        if (isCursorInPopup.value) return;
        popupVisible.value = false;
        hideTimer.value = null;
      }, 100);
      closeParentPopup?.(event);
    };

    const isPointInPopup = (x: number, y: number) => {
      const rect = safePopupRect;
      return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!safeTriangle.value) return;

      // The mousemove that caused mouseleave can reach this listener after it is
      // installed. It is the anchor itself, not a reversal or lateral movement.
      if (event.clientX === previousSafePointerPoint?.x && event.clientY === previousSafePointerPoint?.y) return;

      if (isPointInPopup(event.clientX, event.clientY)) {
        if (protection) protection.pending = undefined;
        handleEnterPopup();
        return;
      }

      const result = isPointerFollowingSafePath(
        { x: event.clientX, y: event.clientY },
        safeTriangle.value,
        furthestPointerProgress,
        previousSafePointerPoint,
        4,
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

    const startMouseMoveListener = () => {
      if (listeningMouseMove) return;
      document.addEventListener('mousemove', handleDocumentMouseMove, { passive: true });
      document.addEventListener('pointerdown', handleDocumentPointerDown, true);
      window.addEventListener('scroll', updateSafeTriangle, true);
      window.addEventListener('resize', updateSafeTriangle);
      listeningMouseMove = true;
    };

    const stopMouseMoveListener = () => {
      if (!listeningMouseMove) return;
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('pointerdown', handleDocumentPointerDown, true);
      window.removeEventListener('scroll', updateSafeTriangle, true);
      window.removeEventListener('resize', updateSafeTriangle);
      listeningMouseMove = false;
    };

    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (protection && !(event.target instanceof Node && protection.pendingTarget?.contains(event.target))) {
        protection.pending = undefined;
      }
      handleLeaveSafeTriangle(event);
      clearSafeTriangle();
    };

    const handleEnterPopup = () => {
      stopReturnProtection();
      clearSafeTriangle();
      isCursorInSafeTriangle.value = false;
      isCursorInPopup.value = true;

      // 进入 popup 时清除隐藏定时器
      if (hideTimer.value !== null) {
        clearTimeout(hideTimer.value);
        hideTimer.value = null;
      }

      // 通知父级取消隐藏定时器
      if (isFunction(cancelHideTimer)) {
        cancelHideTimer();
      }
    };

    const handleSubmenuItemClick = () => {
      if (props.disabled) return;
      open(props.value);
    };

    const renderPopup = (triggerElement: Slots[]) => {
      let placement: PopupPlacement = 'right-top';
      if (!isNested.value && isHead) {
        placement = 'bottom-left';
      }

      const popupWrapper = (
        <div
          ref={popupWrapperRef}
          class={[
            `${classPrefix.value}-menu__spacer`,
            {
              [`${classPrefix.value}-menu__spacer--left`]: isNested.value || !isHead,
            },
          ]}
          onMouseenter={handleEnterPopup}
          onMouseleave={handleMouseLeavePopup}
          onMousemove={(event: MouseEvent) => {
            lastPopupPoint = { x: event.clientX, y: event.clientY };
          }}
        >
          <ul
            class={[
              `${classPrefix.value}-menu__popup-wrapper`,
              {
                [`${classPrefix.value}-menu__popup-overflow`]: isHead,
              },
            ]}
          >
            {renderContent('default', 'content')}
          </ul>
        </div>
      );

      const slots = {
        content: () => popupWrapper,
      };

      // 合并 popperOptions，保留原有的 modifiers
      const existingModifiers = (props.popupProps?.popperOptions as any)?.modifiers || [];
      const popperOptions = {
        ...props.popupProps?.popperOptions,
        modifiers: [
          {
            name: 'onPlacementChange',
            enabled: true,
            phase: 'main',
            fn: ({ state }: any) => {
              handlePlacementChange({ placement: state.placement });
            },
          },
          ...existingModifiers,
        ],
      };

      const realPopup = (
        <Popup
          {...(props.popupProps ?? {})}
          overlayInnerClassName={[...overlayInnerClassName.value]}
          overlayClassName={[...overlayClassName.value]}
          overlayStyle={popupOverlayStyle.value}
          visible={popupVisible.value}
          placement={placement}
          popperOptions={popperOptions}
          v-slots={slots}
        >
          <div ref={submenuRef} class={submenuClass.value}>
            {triggerElement}
          </div>
        </Popup>
      );

      return realPopup;
    };

    const renderHeadSubmenu = () => {
      const icon = renderTNodeJSX('icon');
      const normalSubmenu = [
        <div ref={submenuRef} class={submenuClass.value} onClick={handleSubmenuItemClick}>
          {icon}
          <span class={[`${classPrefix.value}-menu__content`]}>{renderTNodeJSX('title', { silent: true })}</span>
        </div>,
        <ul style="opacity: 0; width: 0; height: 0; overflow: hidden">{renderContent('default', 'content')}</ul>,
      ];

      const needRotate = mode.value === 'popup' && isNested.value;

      const triggerElement = [
        icon,
        <span class={[`${classPrefix.value}-menu__content`]}>{renderTNodeJSX('title', { silent: true })}</span>,
        <FakeArrow
          overlayClassName={hasMenuParent() ? arrowClass.value : null}
          overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)` }}
        />,
      ];

      return mode.value === 'normal' ? normalSubmenu : renderPopup(triggerElement);
    };

    const renderSubmenu = () => {
      const hasContent = slots.content || slots.default;
      const icon = renderTNodeJSX('icon');
      const child = renderContent('default', 'content');

      const needRotate = mode.value === 'popup' && isNested.value;

      const normalSubmenu = [
        <div ref={submenuRef} class={submenuClass.value} onClick={handleSubmenuItemClick}>
          {icon}
          <span class={[`${classPrefix.value}-menu__content`]}>{renderTNodeJSX('title', { silent: true })}</span>
          {hasContent && (
            <FakeArrow
              overlayClassName={arrowClass.value}
              overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)` }}
            />
          )}
        </div>,
        <Transition
          name={transitionClass.value}
          css={keepExpand.value}
          onBeforeEnter={keepExpand.value ? beforeEnter : undefined}
          onEnter={keepExpand.value ? enter : undefined}
          onAfterEnter={keepExpand.value ? afterEnter : undefined}
          onBeforeLeave={keepExpand.value ? beforeLeave : undefined}
          onLeave={keepExpand.value ? leave : undefined}
          onAfterLeave={keepExpand.value ? afterLeave : undefined}
        >
          <ul v-show={isOpen.value} class={subClass.value}>
            {child}
          </ul>
        </Transition>,
      ];

      const triggerElement = [
        icon,
        <span class={[`${classPrefix.value}-menu__content`]}>{renderTNodeJSX('title', { silent: true })}</span>,
        <FakeArrow
          overlayClassName={hasMenuParent() ? arrowClass.value : null}
          overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)`, 'margin-left': 'auto' }}
        />,
      ];

      return mode.value === 'normal' ? normalSubmenu : renderPopup(triggerElement);
    };

    watch(popupVisible, (visible) => {
      menu.open(props.value, visible ? 'add' : 'remove');
      if (visible) {
        nextTick(updateSafeTriangle);
      } else {
        clearSafeTriangle();
        isCursorInSafeTriangle.value = false;
      }
    });

    watch(popupWrapperRef, () => {
      // 第一次触发nextTick会取空值，导致subPopupRef拿不到对应的DOM
      passSubPopupRefToParent(popupWrapperRef.value);
    });

    onMounted(() => {
      menu?.vMenu?.add({ value: props.value, parent: submenu?.value, vnode: slots.default });
      let node = instance.parent;

      while (node && !/^t(head)?menu/i.test(node?.type.name)) {
        if (/submenu/i.test(node?.type.name)) {
          isNested.value = true;
          break;
        }
        node = node?.parent;
      }
    });

    // Cleanup timers on unmount to prevent memory leaks
    onBeforeUnmount(() => {
      stopReturnProtection();
      if (protection) protection.pending = undefined;
      clearTimers();
      stopMouseMoveListener();
      clearSafeTriangle();
      menu?.vMenu?.remove(props.value);
    });

    return () => {
      let child = null;
      let events = {};
      let virtualChild;

      if (mode.value === 'popup') {
        events = {
          onMouseenter: handleMouseEnter,
          onMousemove: (event: MouseEvent) => {
            triggerPointerPoint = { x: event.clientX, y: event.clientY };
          },
          onMouseleave: handleMouseLeave,
        };
        // popup模式下且存在多层的特殊封装场景中，需要将子节点挂载进行计算高亮
        if (activeValues.value.length < 2)
          virtualChild = <div style="display:none">{renderContent('default', 'content')}</div>;
      }
      if (Object.keys(slots).length > 0) {
        child = isHead ? renderHeadSubmenu() : renderSubmenu();
      }

      const triangle = safeTriangle.value;
      const triangleNode =
        mode.value === 'popup' && popupVisible.value && triangle ? (
          <Teleport to="body">
            <svg
              aria-hidden="true"
              class={`${classPrefix.value}-menu__safe-triangle`}
              width={triangle.width}
              height={triangle.height}
              viewBox={`0 0 ${triangle.width} ${triangle.height}`}
              style={{
                position: 'fixed',
                pointerEvents: 'none',
                top: `${triangle.top}px`,
                left: `${triangle.left}px`,
                zIndex: safeTriangleZIndex.value,
              }}
            >
              <path d={triangle.path} fill="transparent" style={{ pointerEvents: 'none' }} />
            </svg>
          </Teleport>
        ) : null;

      return (
        <li class={classes.value} {...events}>
          {child}
          {virtualChild}
          {triangleNode}
        </li>
      );
    };
  },
});
