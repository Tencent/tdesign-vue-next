import { useCollapseAnimation, useContent, usePrefixClass, useRipple, useTNodeJSX } from '@tdesign/shared-hooks';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  provide,
  ref,
  Slots,
  toRef,
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
    const { setSubPopup, closeParentPopup, popupVisible: parentPopupVisible } = submenu;

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

    const submenuInterface = {
      value: value.value,
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
        if (loopInPopup(related)) return;
        handleMouseLeavePopup(e);
      },
      popupVisible: toRef(popupVisible),
    };

    provide<TdSubMenuInterface>('TdSubmenu', submenuInterface);

    const passSubPopupRefToParent = (val: HTMLElement) => {
      if (isFunction(setSubPopup)) {
        setSubPopup(val);
      }
    };

    // methods
    const handleMouseEnter = () => {
      if (props.disabled) return;
      setTimeout(() => {
        if (parentPopupVisible?.value === false) return;
        if (!popupVisible.value) {
          open(props.value);

          // popupVisible设置为TRUE之后打开popup，因此需要在nextTick中确保可以拿到ref值
          nextTick().then(() => {
            passSubPopupRefToParent(popupWrapperRef.value);
          });
        }
        popupVisible.value = true;
      }, 0);
    };

    const targetInPopup = (el: HTMLElement) => el?.classList.contains(`${classPrefix.value}-menu__popup`);
    const loopInPopup = (el: HTMLElement): boolean => {
      if (!el) return false;
      return targetInPopup(el) || loopInPopup(el.parentElement);
    };

    // 检查元素是否在当前 submenu 的 popup 中（不包括子孙 popup）
    const isInCurrentPopup = (el: HTMLElement): boolean => {
      if (!el || !popupWrapperRef.value) return false;
      let current = el;
      while (current && current !== document.body) {
        if (current === popupWrapperRef.value) return true;
        // 如果遇到其他 popup wrapper，说明不是当前的 popup
        if (current !== popupWrapperRef.value && current.classList?.contains(`${classPrefix.value}-menu__spacer`)) {
          return false;
        }
        current = current.parentElement;
      }
      return false;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      setTimeout(() => {
        const target = e.relatedTarget as HTMLElement;
        const inCurrentPopup = isInCurrentPopup(target);

        if (isCursorInPopup.value || inCurrentPopup) return;
        popupVisible.value = false;
      }, 0);
    };

    const handleMouseLeavePopup = (e: any) => {
      const { toElement, relatedTarget } = e;
      let target = toElement || relatedTarget;

      // 检查鼠标是否移动到自己的子 popup 中
      if (target === subPopupRef.value) return;
      if (subPopupRef.value && subPopupRef.value.contains(target)) return;

      // 检查鼠标是否回到 submenu 触发器
      const isSubmenu = (el: Element) => el === submenuRef.value;
      while (target !== null && target !== document && !isSubmenu(target)) {
        target = target.parentNode;
      }

      isCursorInPopup.value = false;

      if (!isSubmenu(target)) {
        // 鼠标离开了 popup 且没有回到触发器
        popupVisible.value = false;
        // 只有真正离开（不在任何 popup 中）时才通知父级
        if (!loopInPopup(relatedTarget as HTMLElement)) {
          closeParentPopup?.(e);
        }
      }
    };
    const handleEnterPopup = () => {
      // 如果父 popup 存在且不可见，不触发保持可见功能
      if (parentPopupVisible?.value === false) return;

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
          class={[`${classPrefix.value}-menu__spacer`]}
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
