import {
  defineComponent, computed, inject, ref, provide, onMounted, getCurrentInstance,
} from 'vue';
import { prefix } from '../config';
import props from './submenu-props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import TIconChevronDown from '../icon/chevron-down';
import { TdMenuInterface, TdSubMenuInterface, TdMenuItem } from './const';
import FakeArrow from '../common-components/fake-arrow';
import Ripple from '../utils/ripple';
import { ClassName } from '../common';

const name = `${prefix}-submenu`;
export default defineComponent({
  name,
  components: {
    TIconChevronDown,
  },
  directives: {
    ripple: Ripple,
  },
  props,
  setup(props, ctx) {
    const menu = inject<TdMenuInterface>('TdMenu');
    const {
      theme, activeValues, expandValues, mode, isHead, selectSubMenu, open,
    } = menu;
    const submenu = inject<TdSubMenuInterface>('TdSubmenu', null);

    const menuItems = ref([]); // 因composition-api的缺陷，不用reactive， 详见：https://github.com/vuejs/composition-api/issues/637
    const isActive = computed(() => activeValues.value.indexOf(props.value) > -1);
    const popupVisible = ref(false);
    const rippleColor = computed(() => theme.value === 'light' ? '#E7E7E7' : '#383838');
    const isOpen = computed(() => {
      if (mode.value === 'popup') {
        return popupVisible.value;
      }
      return expandValues ? expandValues.value.includes(props.value) : false;
    });
    const isNested = ref(false); // 是否嵌套
    const classes = computed(() => [
      `${prefix}-submenu`,
      {
        [`${prefix}-is-disabled`]: props.disabled,
        // [`${prefix}-is-active`]: isOpen.value,
        [`${prefix}-is-opened`]: isOpen.value,
      },
    ]);
    const popupClass = computed(() => [
      `${prefix}-menu__popup`,
      {
        [`${prefix}-is-opened`]: popupVisible.value,
        [`${prefix}-is-vertical`]: !isHead,
      },
    ]);
    const submenuClass = computed(() => [
      `${prefix}-menu__item`,
      {
        [`${prefix}-is-opened`]: isOpen.value,
        [`${prefix}-is-active`]: isActive.value,
      },
    ]);
    const subClass = computed(() => [
      `${prefix}-menu__sub`,
      {
        [`${prefix}-is-opened`]: isOpen.value,
      },
    ]);
    const arrowClass: ClassName = computed(() => [
      {
        [`${prefix}-fake-arrow--active`]: isOpen.value,
      },
    ]);

    // methods
    const handleMouseEnter = () => {
      if (!popupVisible.value) {
        open(props.value);
      }
      popupVisible.value = true;
    };
    const handleMouseLeave = () => {
      popupVisible.value = false;
    };
    const handleHeadmenuItemClick = () => {
      const isOpen = open(props.value);
      selectSubMenu(isOpen ? menuItems.value : []);
    };
    const handleSubmenuItemClick = () => {
      open(props.value);
    };

    // provide
    provide<TdSubMenuInterface>('TdSubmenu', {
      value: props.value,
      hasIcon: !!ctx.slots.icon,
      addMenuItem: (item: TdMenuItem) => {
        menuItems.value.push(item);
        if (submenu) {
          submenu.addMenuItem(item);
        }
      },
    });

    onMounted(() => {
      if (isOpen.value) {
        if (selectSubMenu) {
          selectSubMenu(menuItems.value);
        }
      }

      menu?.vMenu?.add({ value: props.value, parent: submenu?.value });
      const instance = getCurrentInstance();

      isNested.value = instance.parent.type.name === name;

      // adjust popup height
      const { refs } = instance;
      if (refs) {
        const rect = (refs.popupInner as HTMLElement)?.getBoundingClientRect();
        const $popup = refs.popup;

        ($popup as HTMLElement)?.style?.setProperty('--popup-max-height', `${rect?.height}px`);
        ($popup as HTMLElement)?.style?.setProperty('--popup-width', `${rect?.width}px`);
      }
    });

    return {
      menuItems,
      mode,
      isHead,
      isNested,
      classes,
      subClass,
      arrowClass,
      popupClass,
      submenuClass,
      rippleColor,
      handleMouseEnter,
      handleMouseLeave,
      handleSubmenuItemClick,
      handleHeadmenuItemClick,
    };
  },
  methods: {
    renderHeadSubmenu() {
      const normalSubmenu = [
        <div v-ripple={this.rippleColor} class={this.submenuClass} onClick={this.handleHeadmenuItemClick}>
          {renderTNodeJSX(this, 'title')}
        </div>,
        <ul style="opacity: 0; width: 0; height: 0; overflow: hidden">
        {renderContent(this, 'default', 'content')}
        </ul>,
      ];

      const popupSubmenu = [
        <div class={this.submenuClass}>
          {renderTNodeJSX(this, 'title')}
          <FakeArrow overlayClassName={this.arrowClass} overlayStyle={{ transform: `rotate(${this.isNested ? -90 : 0}deg)` }} />
        </div>,
        <div ref="popup" class={this.popupClass}>
          <ul ref="popupInner" class={`${prefix}-menu__popup-wrapper`}>
            {renderContent(this, 'default', 'content')}
          </ul>
        </div>,
      ];
      return this.mode === 'normal' ? normalSubmenu : popupSubmenu;
    },
    renderSubmenu() {
      const hasContent = this.$slots.content || this.$slots.default;
      const icon = renderTNodeJSX(this, 'icon');
      const child = renderContent(this, 'default', 'content');
      let paddingLeft = 44;
      if (this.$parent.$vnode?.tag.indexOf('submenu') > -1) {
        paddingLeft += 16;
      }

      const needRotate = this.mode === 'popup' && this.isNested;

      const normalSubmenu = [
        <div v-ripple={this.rippleColor} class={this.submenuClass} onClick={this.handleSubmenuItemClick}>
          {icon}
          <span class={[`${prefix}-menu__content`]}>{renderTNodeJSX(this, 'title')}</span>
          {hasContent && <FakeArrow overlayClassName={this.arrowClass} overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)` }} />}
        </div>,
        <ul class={this.subClass} style={{ '--padding-left': `${paddingLeft}px` }}>
          {child}
        </ul>,
      ];

      const popupSubmenu = [
        <div class={this.submenuClass}>
          {icon}
          <span class={[`${prefix}-menu__content`]}>{renderTNodeJSX(this, 'title')}</span>
          <FakeArrow overlayClassName={this.arrowClass} overlayStyle={{ transform: `rotate(${needRotate ? -90 : 0}deg)` }} />
        </div>,
        <div ref="popup" class={this.popupClass}>
          <ul ref="popupInner" class={`${prefix}-menu__popup-wrapper`}>
            {child}
          </ul>
        </div>,
      ];

      return this.mode === 'normal' ? normalSubmenu : popupSubmenu;
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
      <li class={this.classes} { ...events }>
        {child}
      </li>
    );
  },
});
