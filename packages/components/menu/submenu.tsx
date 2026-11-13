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
import { createAdjacentPath, deferAdjacentSibling, protectsDescendant } from './utils/adjacent-path';

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
    const transitionClass = usePrefixClass('slide-down');
    const { keepExpand } = useKeepAnimation();
    const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } = useCollapseAnimation();
    useRipple(submenuRef, rippleColor);

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

    let placementDirection = '';
    const handlePlacementChange = ({ placement }: { placement: string }) => {
      placementDirection = placement;
      // The top-level head-menu spacer must not cover adjacent menu triggers.
      if (isHead && !isNested.value) return;
      const spacer = popupWrapperRef.value;
      if (!spacer) return;
      const prefix = `${classPrefix.value}-menu__spacer`;
      spacer.classList.toggle(`${prefix}--bottom`, placement.startsWith('bottom'));
      spacer.classList.toggle(`${prefix}--top`, placement.startsWith('top'));
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
      if (isFunction(style))
        return (trigger: HTMLElement, popup: HTMLElement) => ({ ...style(trigger, popup), pointerEvents: 'none' });
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
          const rect = popupWrapperRef.value?.getBoundingClientRect();
          if (
            rect?.width &&
            rect.height &&
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          )
            return;
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
      if (
        event &&
        submenuRef.value &&
        deferAdjacentSibling(menu, submenuRef.value, event, handleMouseEnter, classPrefix.value)
      )
        return;

      clearTimers();

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

    const path = createAdjacentPath(menu);
    let triggerPoint: { x: number; y: number } | undefined;
    let popupPoint: { x: number; y: number } | undefined;
    const releasePath = (event: MouseEvent) => {
      clearTimers();
      hideTimer.value = setTimeout(() => {
        if (!isCursorInPopup.value) popupVisible.value = false;
        hideTimer.value = null;
      }, 100);
      closeParentPopup?.(event);
    };
    const holdPath = () => {
      clearTimers();
      cancelHideTimer?.();
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Vertical placements use the spacer; horizontal placements need the
      // popup wrapper to cover the gap between trigger and popup.
      const popup =
        placementDirection.startsWith('top') || placementDirection.startsWith('bottom')
          ? popupWrapperRef.value
          : popupWrapperRef.value?.closest<HTMLElement>(`.${classPrefix.value}-popup`);
      if (
        popupVisible.value &&
        path.begin({
          owner: submenuRef.value,
          target: popup ?? undefined,
          previous: triggerPoint,
          event: e,
          release: releasePath,
          prefix: classPrefix.value,
          forward: true,
        })
      ) {
        holdPath();
        return;
      }
      clearTimers();

      const current = e.currentTarget as Element;
      const sibling = (e.relatedTarget as Element | null)?.closest?.(`.${classPrefix.value}-submenu`);
      if (sibling && sibling !== current && sibling.parentElement === current?.parentElement) {
        popupVisible.value = false;
        return;
      }

      hideTimer.value = setTimeout(() => {
        const inPopup = targetInPopup(e.relatedTarget as HTMLElement);

        if (isCursorInPopup.value || inPopup) return;
        popupVisible.value = false;
        hideTimer.value = null;
      }, 100);
    };

    const handleMouseLeavePopup = (e: any) => {
      const { toElement, relatedTarget } = e;
      let target = toElement || relatedTarget;

      if (target === subPopupRef.value) return;
      if (target instanceof Node && e.currentTarget?.contains(target)) return;

      const isSubmenu = (el: Element) => el === submenuRef.value;
      while (target !== null && target !== document && !isSubmenu(target)) {
        target = target.parentNode;
      }

      isCursorInPopup.value = false;

      if (!isSubmenu(target)) {
        if (protectsDescendant(menu, popupWrapperRef.value, e)) {
          holdPath();
          return;
        }
        if (
          path.begin({
            owner: submenuRef.value,
            target: submenuRef.value,
            previous: popupPoint,
            event: e,
            release: releasePath,
            prefix: classPrefix.value,
            forward: false,
          })
        ) {
          holdPath();
          return;
        }
        clearTimers();

        // 使用延迟隐藏，避免在子项之间移动时闪烁
        hideTimer.value = setTimeout(() => {
          popupVisible.value = false;
          hideTimer.value = null;
        }, 100);

        // 立即通知父级也开始延迟隐藏
        closeParentPopup?.(e);
      }
    };
    const handleEnterPopup = () => {
      path.stop();
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
            popupPoint = { x: event.clientX, y: event.clientY };
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
      path.stop();
      clearTimers();
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
            triggerPoint = { x: event.clientX, y: event.clientY };
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

      return (
        <li class={classes.value} {...events}>
          {child}
          {virtualChild}
        </li>
      );
    };
  },
});
