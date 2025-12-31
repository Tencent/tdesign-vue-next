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
import { useRipple, useContent, useTNodeJSX, usePrefixClass, useCollapseAnimation } from '@tdesign/shared-hooks';

import props from './submenu-props';
import { TdMenuInterface, TdSubMenuInterface, TdMenuItem } from './types';
import FakeArrow from '../common-components/fake-arrow';

import { Popup, PopupPlacement } from '../popup';

import { TdSubmenuProps } from './type';

export default defineComponent({
  name: 'TSubmenu',
  props,
  setup(props: TdSubmenuProps, { attrs, slots }) {
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const instance = getCurrentInstance();
    const menu = inject<TdMenuInterface>('TdMenu');
    const { value } = toRefs(props);
    const { theme, activeValues, expandValues, isHead, open } = menu;

    const submenu = inject<TdSubMenuInterface>('TdSubmenu', {});
    const { setSubPopup, closeParentPopup, cancelHideTimer } = submenu;

    const mode = computed(() => attrs.expandType || menu.mode.value);

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
          // 不再检查 relatedTarget，直接触发父级的延迟隐藏
          // 如果鼠标真的停留在父级，父级的 handleEnterPopup 会取消定时器
          // 如果鼠标继续离开，定时器会触发隐藏

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
    const handleMouseEnter = () => {
      if (props.disabled) return;

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

    const handleMouseLeave = (e: MouseEvent) => {
      clearTimers();

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

      const isSubmenu = (el: Element) => el === submenuRef.value;
      while (target !== null && target !== document && !isSubmenu(target)) {
        target = target.parentNode;
      }

      isCursorInPopup.value = false;

      if (!isSubmenu(target)) {
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
            `${classPrefix.value}-menu__spacer--${!isNested.value && isHead ? 'top' : 'left'}`,
          ]}
          onMouseenter={handleEnterPopup}
          onMouseleave={handleMouseLeavePopup}
        >
          <ul class={`${classPrefix.value}-menu__popup-wrapper`}>{renderContent('default', 'content')}</ul>
        </div>
      );

      const slots = {
        content: () => popupWrapper,
      };

      const realPopup = (
        <Popup
          {...(props.popupProps ?? {})}
          overlayInnerClassName={[...overlayInnerClassName.value]}
          overlayClassName={[...overlayClassName.value]}
          visible={popupVisible.value}
          placement={placement}
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
          overlayClassName={/menu/i.test(instance?.parent.proxy.$options.name) ? arrowClass.value : null}
          overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)` }}
        />,
      ];

      return mode.value === 'normal' ? normalSubmenu : renderPopup(triggerElement);
    };

    const renderSubmenu = () => {
      const hasContent = slots.content || slots.default;
      const icon = renderTNodeJSX('icon');
      const child = renderContent('default', 'content');
      let parent = instance.parent;
      let paddingLeft = 44;

      while (parent && parent.type.name !== 'TMenu') {
        if (parent.type.name === 'TSubmenu') {
          paddingLeft += 16;
        }
        parent = parent.parent;
      }

      const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } = useCollapseAnimation();

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
          onBeforeEnter={beforeEnter}
          onEnter={enter}
          onAfterEnter={afterEnter}
          onBeforeLeave={beforeLeave}
          onLeave={leave}
          onAfterLeave={afterLeave}
        >
          <ul v-show={isOpen.value} class={subClass.value} style={{ '--padding-left': `${paddingLeft}px` }}>
            {child}
          </ul>
        </Transition>,
      ];

      const triggerElement = [
        icon,
        <span class={[`${classPrefix.value}-menu__content`]}>{renderTNodeJSX('title', { silent: true })}</span>,
        <FakeArrow
          overlayClassName={/menu/i.test(parent.proxy.$options.name) ? arrowClass.value : null}
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
      clearTimers();
    });

    return () => {
      let child = null;
      let events = {};
      let virtualChild;

      if (mode.value === 'popup') {
        events = {
          onMouseenter: handleMouseEnter,
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
