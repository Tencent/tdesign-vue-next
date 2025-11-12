import { useCollapseAnimation, useContent, usePrefixClass, useRipple, useTNodeJSX } from '@tdesign/shared-hooks';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  Slots,
  toRefs,
  Transition,
  watch,
} from 'vue';
import FakeArrow from '../common-components/fake-arrow';
import props from './submenu-props';
import { TdMenuInterface, TdMenuItem, TdSubMenuInterface } from './types';

import { isFunction } from 'lodash-es';
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
    const { setSubPopup, closeParentPopup } = submenu;

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
    const enterTimerRef = ref<number | null>(null);
    const leaveTimerRef = ref<number | null>(null);
    useRipple(submenuRef, rippleColor);

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
          const related = e.relatedTarget as HTMLElement;
          // 如果鼠标移动到了当前层级或子级的 popup，不关闭
          if (loopInPopup(related)) return;

          // 如果鼠标移动到了当前的 popup wrapper，不关闭
          if (popupWrapperRef.value && popupWrapperRef.value.contains(related)) return;

          // 如果当前 popup 中还有鼠标（例如从子级移回），不关闭
          if (isCursorInPopup.value) return;

          // 清除所有定时器，立即关闭
          if (enterTimerRef.value) {
            clearTimeout(enterTimerRef.value);
            enterTimerRef.value = null;
          }
          if (leaveTimerRef.value) {
            clearTimeout(leaveTimerRef.value);
            leaveTimerRef.value = null;
          }

          // 当子级 popup 隐藏时，隐藏当前 popup 并继续通知父级
          popupVisible.value = false;
          closeParentPopup?.(e);
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

      // 清除之前的离开定时器
      if (leaveTimerRef.value) {
        clearTimeout(leaveTimerRef.value);
        leaveTimerRef.value = null;
      }

      // 清除之前的进入定时器
      if (enterTimerRef.value) {
        clearTimeout(enterTimerRef.value);
        enterTimerRef.value = null;
      }

      enterTimerRef.value = window.setTimeout(() => {
        if (!popupVisible.value) {
          open(props.value);

          // popupVisible设置为TRUE之后打开popup，因此需要在nextTick中确保可以拿到ref值
          nextTick().then(() => {
            passSubPopupRefToParent(popupWrapperRef.value);
          });
        }
        popupVisible.value = true;
        enterTimerRef.value = null;
      }, 200);
    };

    const targetInPopup = (el: HTMLElement) => el?.classList.contains(`${classPrefix.value}-menu__popup`);
    const loopInPopup = (el: HTMLElement): boolean => {
      if (!el) return false;
      return targetInPopup(el) || loopInPopup(el.parentElement);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // 清除之前的进入定时器
      if (enterTimerRef.value) {
        clearTimeout(enterTimerRef.value);
        enterTimerRef.value = null;
      }

      // 清除之前的离开定时器
      if (leaveTimerRef.value) {
        clearTimeout(leaveTimerRef.value);
        leaveTimerRef.value = null;
      }

      // 提前捕获 relatedTarget，避免在 setTimeout 后失效
      const relatedTarget = e.relatedTarget as HTMLElement;
      const inPopup = targetInPopup(relatedTarget);

      leaveTimerRef.value = window.setTimeout(() => {
        if (isCursorInPopup.value || inPopup) {
          leaveTimerRef.value = null;
          return;
        }
        popupVisible.value = false;
        leaveTimerRef.value = null;
      }, 200);
    };

    const handleMouseLeavePopup = (e: any) => {
      const { toElement, relatedTarget } = e;
      let target = toElement || relatedTarget;

      if (target === subPopupRef.value) return;

      const isSubmenu = (el: Element) => el === submenuRef.value;
      while (target !== null && target !== document && !isSubmenu(target)) {
        target = target.parentNode;
      }

      // 清除之前的进入定时器
      if (enterTimerRef.value) {
        clearTimeout(enterTimerRef.value);
        enterTimerRef.value = null;
      }

      // 清除之前的离开定时器
      if (leaveTimerRef.value) {
        clearTimeout(leaveTimerRef.value);
        leaveTimerRef.value = null;
      }

      isCursorInPopup.value = false;

      if (!isSubmenu(target)) {
        leaveTimerRef.value = window.setTimeout(() => {
          // 在定时器回调中再次验证状态，避免快速移动导致的误关闭
          // 如果在延迟期间鼠标又回到了 popup 内，则不关闭
          if (isCursorInPopup.value) {
            leaveTimerRef.value = null;
            return;
          }

          popupVisible.value = false;
          // 当最后一级 popup 隐藏时，递归通知所有父级隐藏
          closeParentPopup?.(e);
          leaveTimerRef.value = null;
        }, 200);
      }
    };
    const handleEnterPopup = () => {
      // 清除之前的离开定时器
      if (leaveTimerRef.value) {
        clearTimeout(leaveTimerRef.value);
        leaveTimerRef.value = null;
      }
      isCursorInPopup.value = true;
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

    onBeforeUnmount(() => {
      // 清理所有定时器，避免内存泄漏和意外的状态变化
      if (enterTimerRef.value) {
        clearTimeout(enterTimerRef.value);
        enterTimerRef.value = null;
      }
      if (leaveTimerRef.value) {
        clearTimeout(leaveTimerRef.value);
        leaveTimerRef.value = null;
      }
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
