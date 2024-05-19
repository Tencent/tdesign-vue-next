import {
  defineComponent,
  computed,
  inject,
  ref,
  provide,
  onMounted,
  getCurrentInstance,
  watch,
  Slots,
  toRefs,
  reactive,
  nextTick,
  Transition,
} from '@td/adapter-vue';
import props from '@td/intel/menu/submenu-props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { TdMenuInterface, TdSubMenuInterface, TdMenuItem } from './const';
import FakeArrow from '../common-components/fake-arrow';
import { useRipple } from '@td/adapter-hooks';
import { usePrefixClass } from '@td/adapter-hooks';
import { Popup, PopupPlacement } from '../popup';
import { isFunction } from 'lodash-es';
import { TdSubmenuProps } from '@td/intel/menu/type';
import { useCollapseAnimation } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TSubmenu',

  props,
  setup(props, ctx) {
    const classPrefix = usePrefixClass();
    const menu = inject<TdMenuInterface>('TdMenu');
    const { theme, activeValues, expandValues, isHead, open } = menu;
    const submenu = inject<TdSubMenuInterface>('TdSubmenu', {});
    const { setSubPopup, closeParentPopup } = submenu;
    const mode = computed(() => ctx.attrs.expandType || menu.mode.value);

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

    // methods
    const handleMouseEnter = () => {
      if (props.disabled) return;
      setTimeout(() => {
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

    const handleMouseLeave = (e: MouseEvent) => {
      setTimeout(() => {
        const inPopup = targetInPopup(e.relatedTarget as HTMLElement);

        if (isCursorInPopup.value || inPopup) return;
        popupVisible.value = false;
      }, 0);
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
        popupVisible.value = false;
      }

      closeParentPopup?.(e);
    };
    const handleEnterPopup = () => {
      isCursorInPopup.value = true;
    };

    const handleSubmenuItemClick = () => {
      if (props.disabled) return;
      open(props.value);
    };

    watch(popupVisible, (visible) => {
      menu.open(props.value, visible ? 'add' : 'remove');
    });

    // provide
    const { value } = toRefs(props);
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
          if (loopInPopup(related)) return;
          handleMouseLeavePopup(e);
        },
      }),
    );

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

    return {
      classPrefix,
      menuItems,
      mode,
      theme,
      isHead,
      isNested,
      classes,
      subClass,
      isOpen,
      transitionClass,
      arrowClass,
      overlayInnerClassName,
      overlayClassName,
      submenuClass,
      submenuRef,
      popupWrapperRef,
      popupVisible,
      isCursorInPopup,
      handleEnterPopup,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseLeavePopup,
      handleSubmenuItemClick,
    };
  },
  methods: {
    renderPopup(triggerElement: Slots[]) {
      let placement = 'right-top';
      if (!this.isNested && this.isHead) {
        placement = 'bottom-left';
      }

      const popupWrapper = (
        <div
          ref="popupWrapperRef"
          class={[
            `${this.classPrefix}-menu__spacer`,
            `${this.classPrefix}-menu__spacer--${!this.isNested && this.isHead ? 'top' : 'left'}`,
          ]}
          onMouseenter={this.handleEnterPopup}
          onMouseleave={this.handleMouseLeavePopup}
        >
          <ul class={`${this.classPrefix}-menu__popup-wrapper`}>{renderContent(this, 'default', 'content')}</ul>
        </div>
      );
      const slots = {
        content: () => popupWrapper,
      };

      const realPopup = (
        <Popup
          {...((this.popupProps ?? {}) as TdSubmenuProps['popupProps'])}
          overlayInnerClassName={[...this.overlayInnerClassName]}
          overlayClassName={[...this.overlayClassName]}
          visible={this.popupVisible}
          placement={placement as PopupPlacement}
          v-slots={slots}
        >
          <div ref="submenuRef" class={this.submenuClass}>
            {triggerElement}
          </div>
        </Popup>
      );

      return realPopup;
    },
    renderHeadSubmenu() {
      const icon = renderTNodeJSX(this, 'icon');
      const normalSubmenu = [
        <div ref="submenuRef" class={this.submenuClass} onClick={this.handleSubmenuItemClick}>
          {icon}
          <span class={[`${this.classPrefix}-menu__content`]}>{renderTNodeJSX(this, 'title', { silent: true })}</span>
        </div>,
        <ul style="opacity: 0; width: 0; height: 0; overflow: hidden">{renderContent(this, 'default', 'content')}</ul>,
      ];

      const needRotate = this.mode === 'popup' && this.isNested;

      const triggerElement = [
        icon,
        <span class={[`${this.classPrefix}-menu__content`]}>{renderTNodeJSX(this, 'title', { silent: true })}</span>,
        <FakeArrow
          overlayClassName={/menu/i.test(this.$parent.$options.name) ? this.arrowClass : null}
          overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)` }}
        />,
      ];

      return this.mode === 'normal' ? normalSubmenu : this.renderPopup(triggerElement);
    },
    renderSubmenu() {
      const hasContent = this.$slots.content || this.$slots.default;
      const icon = renderTNodeJSX(this, 'icon');
      const child = renderContent(this, 'default', 'content');
      let { parent } = getCurrentInstance();
      let paddingLeft = 44;

      while (parent && parent.type.name !== 'TMenu') {
        if (parent.type.name === 'TSubmenu') {
          paddingLeft += 16;
        }
        parent = parent.parent;
      }

      const { beforeEnter, enter, afterEnter, beforeLeave, leave, afterLeave } = useCollapseAnimation();

      const needRotate = this.mode === 'popup' && this.isNested;

      const normalSubmenu = [
        <div ref="submenuRef" class={this.submenuClass} onClick={this.handleSubmenuItemClick}>
          {icon}
          <span class={[`${this.classPrefix}-menu__content`]}>{renderTNodeJSX(this, 'title', { silent: true })}</span>
          {hasContent && (
            <FakeArrow
              overlayClassName={this.arrowClass}
              overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)` }}
            />
          )}
        </div>,
        <Transition
          name={this.transitionClass}
          onBeforeEnter={beforeEnter}
          onEnter={enter}
          onAfterEnter={afterEnter}
          onBeforeLeave={beforeLeave}
          onLeave={leave}
          onAfterLeave={afterLeave}
        >
          <ul v-show={this.isOpen} class={this.subClass} style={{ '--padding-left': `${paddingLeft}px` }}>
            {child}
          </ul>
        </Transition>,
      ];

      const triggerElement = [
        icon,
        <span class={[`${this.classPrefix}-menu__content`]}>{renderTNodeJSX(this, 'title', { silent: true })}</span>,
        <FakeArrow
          overlayClassName={/menu/i.test(this.$parent.$options.name) ? this.arrowClass : null}
          overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)`, 'margin-left': 'auto' }}
        />,
      ];

      return this.mode === 'normal' ? normalSubmenu : this.renderPopup(triggerElement);
    },
  },
  render() {
    let child = null;
    let events = {};

    if (this.mode === 'popup') {
      events = {
        onMouseenter: this.handleMouseEnter,
        onMouseleave: this.handleMouseLeave,
      };
    }
    if (Object.keys(this.$slots).length > 0) {
      child = this.isHead ? this.renderHeadSubmenu() : this.renderSubmenu();
    }
    return (
      <li class={this.classes} {...events}>
        {child}
      </li>
    );
  },
});
