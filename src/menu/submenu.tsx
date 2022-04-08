import { defineComponent, computed, inject, ref, provide, onMounted, getCurrentInstance, watch, Slots } from 'vue';
import props from './submenu-props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { TdMenuInterface, TdSubMenuInterface, TdMenuItem } from './const';
import FakeArrow from '../common-components/fake-arrow';
import useRipple from '../hooks/useRipple';
import { ClassName } from '../common';
import { usePrefixClass } from '../hooks/useConfig';
import { Popup } from '../popup';

export default defineComponent({
  name: 'TSubmenu',

  props,
  setup(props, ctx) {
    const classPrefix = usePrefixClass();
    const menu = inject<TdMenuInterface>('TdMenu');
    const { theme, activeValues, expandValues, mode, isHead, open } = menu;
    const submenu = inject<TdSubMenuInterface>('TdSubmenu', null);

    const menuItems = ref([]); // 因composition-api的缺陷，不用reactive， 详见：https://github.com/vuejs/composition-api/issues/637
    const isActive = computed(() => activeValues.value.indexOf(props.value) > -1);
    const popupVisible = ref(false);
    const isCursorInPopup = ref(false);
    const rippleColor = computed(() => (theme.value === 'light' ? '#E7E7E7' : '#383838'));
    const isOpen = computed(() => {
      if (mode.value === 'popup') {
        return popupVisible.value;
      }
      return expandValues ? expandValues.value.includes(props.value) : false;
    });
    const isNested = ref(false); // 是否嵌套

    const submenuRef = ref<HTMLElement>();
    useRipple(submenuRef, rippleColor);

    const classes = computed(() => [
      `${classPrefix.value}-submenu`,
      {
        [`${classPrefix.value}-is-disabled`]: props.disabled,
        [`${classPrefix.value}-is-opened`]: isOpen.value,
      },
    ]);
    const popupClass = computed(() => [
      `${classPrefix.value}-menu__popup`,
      `${classPrefix.value}-is-${isHead ? 'horizontal' : 'vertical'}`,
      {
        [`${classPrefix.value}-is-opened`]: popupVisible.value,
      },
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
    const arrowClass: ClassName = computed(() => [
      {
        [`${classPrefix.value}-fake-arrow--active`]: isOpen.value,
      },
    ]);

    // methods
    const handleMouseEnter = () => {
      if (props.disabled) return;
      setTimeout(() => {
        if (!popupVisible.value) {
          open(props.value);
        }
        popupVisible.value = true;
      }, 0);
    };
    const handleMouseLeave = () => {
      setTimeout(() => {
        if (isCursorInPopup.value) return;
        popupVisible.value = false;
      }, 0);
    };
    const handleMouseLeavePopup = (e: any) => {
      const { toElement } = e;
      let target = toElement;
      const isSubmenu = (el: Element) => el === submenuRef.value;

      while (target !== document && !isSubmenu(target)) {
        target = target.parentNode;
      }

      isCursorInPopup.value = false;

      if (!isSubmenu(target)) {
        popupVisible.value = false;
      }
    };

    const handleSubmenuItemClick = () => {
      if (props.disabled) return;
      open(props.value);
    };

    watch(popupVisible, (visible) => {
      menu.open(props.value, visible ? 'add' : 'remove');
    });

    // provide
    provide<TdSubMenuInterface>('TdSubmenu', {
      value: props.value,
      addMenuItem: (item: TdMenuItem) => {
        menuItems.value.push(item);
        if (submenu) {
          submenu.addMenuItem(item);
        }
      },
    });

    onMounted(() => {
      menu?.vMenu?.add({ value: props.value, parent: submenu?.value, vnode: ctx.slots.default });
      const instance = getCurrentInstance();

      isNested.value = !/^t(head)?menu/i.test(instance.parent?.type.name);
    });

    return {
      classPrefix,
      menuItems,
      mode,
      isHead,
      isNested,
      classes,
      subClass,
      arrowClass,
      popupClass,
      submenuClass,
      submenuRef,
      popupVisible,
      isCursorInPopup,
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
      const overlayStyle = { [`margin-${this.isHead ? 'top' : 'left'}`]: '20px' };
      const popupWrapper = (
        <ul class={`${this.classPrefix}-menu__popup-wrapper`}>{renderContent(this, 'default', 'content')}</ul>
      );
      const popupInside = (
        <div ref="submenuRef" class={this.submenuClass}>
          {triggerElement}
          <div class={this.popupClass}>{popupWrapper}</div>
        </div>
      );
      const slots = {
        content: () => popupWrapper,
      };
      const realPopup = (
        <Popup
          overlayClassName={[
            ...this.popupClass,
            `${this.classPrefix}-menu__spacer`,
            `${this.classPrefix}-menu__spacer--${this.isHead ? 'top' : 'left'}`,
          ]}
          onEnter={() => (this.isCursorInPopup = true)}
          onLeave={this.handleMouseLeavePopup}
          visible={this.popupVisible}
          placement={placement}
          overlayStyle={overlayStyle}
          v-slots={slots}
        >
          <div ref="submenuRef" class={this.submenuClass}>
            {triggerElement}
          </div>
        </Popup>
      );

      return this.isNested ? popupInside : realPopup;
    },
    renderHeadSubmenu() {
      const normalSubmenu = [
        <div ref="submenuRef" class={this.submenuClass} onClick={this.handleSubmenuItemClick}>
          {renderTNodeJSX(this, 'title')}
        </div>,
        <ul style="opacity: 0; width: 0; height: 0; overflow: hidden">{renderContent(this, 'default', 'content')}</ul>,
      ];
      const triggerElement = [
        renderTNodeJSX(this, 'title'),
        <FakeArrow
          overlayClassName={this.arrowClass}
          overlayStyle={{ transform: `rotate(${this.isNested ? -90 : 0}deg)` }}
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
        <ul class={this.subClass} style={{ '--padding-left': `${paddingLeft}px` }}>
          {child}
        </ul>,
      ];

      const triggerElement = [
        icon,
        <span class={[`${this.classPrefix}-menu__content`]}>{renderTNodeJSX(this, 'title', { silent: true })}</span>,
        <FakeArrow
          overlayClassName={this.arrowClass}
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
        onmouseenter: this.handleMouseEnter,
        onmouseleave: this.handleMouseLeave,
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
