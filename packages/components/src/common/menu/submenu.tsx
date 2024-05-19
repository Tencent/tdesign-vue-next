import type { Slots } from '@td/adapter-vue';
import {
  Transition,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import { isFunction } from 'lodash-es';

import type { TdSubmenuProps } from '@td/intel/components/menu/type';
import { useCollapseAnimation, useContent, usePrefixClass, useRipple, useTNodeJSX } from '@td/adapter-hooks';
import props from '@td/intel/components/menu/submenu-props';
import type { PopupPlacement } from '@td/intel/components//popup/type';
import { Popup } from '@td/component';
import FakeArrow from '../common-components/fake-arrow';
import type { TdMenuInterface, TdMenuItem, TdSubMenuInterface } from './const';

export default defineComponent({
  name: 'TSubmenu',
  props,
  setup(props, ctx) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const classPrefix = usePrefixClass();
    const menu = inject<TdMenuInterface>('TdMenu');
    const { theme, activeValues, expandValues, isHead, open } = menu || {};
    const submenu = inject<TdSubMenuInterface>('TdSubmenu', {});
    const { setSubPopup, closeParentPopup } = submenu;
    const mode = computed(() => ctx.attrs.expandType || menu?.mode.value);

    const menuItems = ref([]); // 因composition-api的缺陷，不用reactive， 详见：https://github.com/vuejs/composition-api/issues/637
    const isActive = computed(() => activeValues?.value.includes(props.value));
    const popupVisible = ref(false);
    const isCursorInPopup = ref(false);
    const rippleColor = computed(() => (theme?.value === 'light' ? '#E7E7E7' : '#383838'));
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

    const targetInPopup = (el: HTMLElement) => el?.classList.contains(`${classPrefix.value}-menu__popup`);

    const loopInPopup = (el: HTMLElement): boolean => {
      if (!el) {
        return false;
      }
      return targetInPopup(el) || loopInPopup(el.parentElement);
    };

    const handleMouseLeavePopup = (e: any) => {
      const { toElement, relatedTarget } = e;
      let target = toElement || relatedTarget;

      if (target === subPopupRef.value) {
        return;
      }

      const isSubmenu = (el: Element) => el === submenuRef.value;
      while (target !== null && target !== document && !isSubmenu(target)) {
        target = target.parentNode;
      }

      isCursorInPopup.value = false;

      if (!isSubmenu(target)) {
        popupVisible.value = false;
      }

      closeParentPopup?.(e);
    };

    const { value } = toRefs(props);
    provide<TdSubMenuInterface>(
      'TdSubmenu',
      reactive({
        value,
        addMenuItem: (item: TdMenuItem) => {
          menuItems.value.push(item);
          if (submenu) {
            submenu.addMenuItem?.(item);
          }
        },
        setSubPopup: (ref: HTMLElement) => {
          subPopupRef.value = ref;
        },
        closeParentPopup: (e: MouseEvent) => {
          const related = e.relatedTarget as HTMLElement;
          if (loopInPopup(related)) {
            return;
          }
          handleMouseLeavePopup(e);
        },
      }),
    );

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
      (props.popupProps as TdSubmenuProps['popupProps'])?.overlayInnerClassName,
    ]);
    const overlayClassName = computed(() => [
      `${classPrefix.value}-menu--${theme.value}`,
      isHead && `${classPrefix.value}-is-head-menu`,
      { [`${classPrefix.value}-menu-is-nested`]: isNested.value },
      (props.popupProps as TdSubmenuProps['popupProps'])?.overlayClassName,
    ]);
    const submenuClass = computed(() => [
      `${classPrefix.value}-menu__item`,
      `${classPrefix.value}-menu__item-spacer`,
      `${classPrefix.value}-menu__item-spacer--${isHead && !isNested.value ? 'bottom' : 'right'}`,
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

    const passSubPopupRefToParent = (val: HTMLElement) => {
      if (isFunction(setSubPopup)) {
        setSubPopup(val);
      }
    };

    const handleMouseEnter = () => {
      if (props.disabled) {
        return;
      }
      setTimeout(() => {
        if (!popupVisible.value) {
          open?.(props.value);

          // popupVisible设置为TRUE之后打开popup，因此需要在nextTick中确保可以拿到ref值
          nextTick().then(() => {
            passSubPopupRefToParent(popupWrapperRef.value);
          });
        }
        popupVisible.value = true;
      }, 0);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      setTimeout(() => {
        const inPopup = targetInPopup(e.relatedTarget as HTMLElement);

        if (isCursorInPopup.value || inPopup) {
          return;
        }
        popupVisible.value = false;
      }, 0);
    };

    const handleEnterPopup = () => {
      isCursorInPopup.value = true;
    };

    const handleSubmenuItemClick = () => {
      if (props.disabled) {
        return;
      }
      open?.(props.value);
    };

    const renderPopup = (triggerElement: Slots[]) => {
      let placement = 'right-top';
      if (!isNested.value && isHead) {
        placement = 'bottom-left';
      }

      const popupWrapper = (
        <div
          ref="popupWrapperRef"
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
          {...((props.popupProps ?? {}) as TdSubmenuProps['popupProps'])}
          overlayInnerClassName={[...overlayInnerClassName.value]}
          overlayClassName={[...overlayClassName.value]}
          visible={popupVisible.value}
          placement={placement as PopupPlacement}
          v-slots={slots}
        >
          <div ref="submenuRef" class={submenuClass.value}>
            {triggerElement}
          </div>
        </Popup>
      );

      return realPopup;
    };

    const renderHeadSubmenu = () => {
      const icon = renderTNodeJSX('icon');
      const normalSubmenu = [
        <div ref="submenuRef" class={submenuClass.value} onClick={handleSubmenuItemClick}>
          {icon}
          <span class={[`${classPrefix.value}-menu__content`]}>{renderTNodeJSX('title', { silent: true })}</span>
        </div>,
        <ul style="opacity: 0; width: 0; height: 0; overflow: hidden">{renderContent('default', 'content')}</ul>,
      ];

      const needRotate = mode.value === 'popup' && isNested.value;

      // vue23:!!!
      const instance = getCurrentInstance();
      const parent = instance?.parent;

      const triggerElement = [
        icon,
        <span class={[`${classPrefix.value}-menu__content`]}>{renderTNodeJSX('title', { silent: true })}</span>,
        // vue23:!!!
        <FakeArrow
          overlayClassName={/menu/i.test(parent?.$options?.name) ? arrowClass.value : null}
          overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)` }}
        />,
      ];

      return mode.value === 'normal' ? normalSubmenu : renderPopup(triggerElement);
    };

    const renderSubmenu = () => {
      const hasContent = ctx.slots.content || ctx.slots.default;
      const icon = renderTNodeJSX('icon');
      const child = renderContent('default', 'content');
      const instance = getCurrentInstance();
      let parent = instance?.parent;
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
        <div ref="submenuRef" class={submenuClass.value} onClick={handleSubmenuItemClick}>
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
        // vue23:!!!!!
        <FakeArrow
          overlayClassName={/menu/i.test(parent?.$options?.name) ? arrowClass.value : null}
          overlayStyle={{ 'transform': `rotate(${needRotate ? -90 : 0}deg)`, 'margin-left': 'auto' }}
        />,
      ];

      return mode.value === 'normal' ? normalSubmenu : renderPopup(triggerElement);
    };

    watch(popupVisible, (visible) => {
      menu?.open?.(props.value, visible ? 'add' : 'remove');
    });

    watch(popupWrapperRef, () => {
      // 第一次触发nextTick会取空值，导致subPopupRef拿不到对应的DOM
      passSubPopupRefToParent(popupWrapperRef.value);
    });

    onMounted(() => {
      menu?.vMenu?.add({ value: props.value, parent: submenu?.value, vnode: ctx.slots.default });
      const instance = getCurrentInstance();
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

      if (mode.value === 'popup') {
        events = {
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
        };
      }
      if (Object.keys(ctx.slots).length > 0) {
        child = isHead ? renderHeadSubmenu() : renderSubmenu();
      }
      return (
        <li class={classes.value} {...events}>
          {child}
        </li>
      );
    };
  },
});
