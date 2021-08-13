import { defineComponent, computed, inject, ref, provide, onMounted } from 'vue';
import { prefix } from '../config';
import props from './submenu-props';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import TIconChevronDown from '../icon/chevron-down';
import { TdMenuInterface, TdSubMenuInterface, TdMenuItem } from './const';

const name = `${prefix}-submenu`;
export default defineComponent({
  name,
  components: {
    TIconChevronDown,
  },
  props,
  setup(props, ctx) {
    const { activeIndexValue, expandedArray, mode, isHead, selectSubMenu, open } = inject<TdMenuInterface>('TdMenu');
    const menuItems = ref([]); // 因composition-api的缺陷，不用reactive， 详见：https://github.com/vuejs/composition-api/issues/637
    const isActive = computed(() => {
      const childIsActive = menuItems.value.some(i => i.value === activeIndexValue.value);
      return activeIndexValue.value === props.value || childIsActive;
    });
    const popupVisible = ref(false);
    const isOpen = computed(() => {
      if (mode.value === 'popup') {
        return popupVisible.value;
      }
      return expandedArray ? expandedArray.value.includes(props.value) : false;
    });
    let mouseInChild = false;
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
      { [`${prefix}-is-opened`]: popupVisible.value },
    ]);
    const submenuClass = computed(() => [
      `${prefix}-menu__item`,
      {
        [`${prefix}-is-opened`]: isOpen.value,
        [`${prefix}-is-active`]: !isOpen.value && isActive.value,
      },
    ]);
    const subClass = computed(() => [
      `${prefix}-menu__sub`,
      {
        [`${prefix}-is-opened`]: isOpen.value,
      },
    ]);

    // methods
    const handleMouseEnter = () => {
      mouseInChild = true;
      if (!popupVisible.value) {
        open(props.value);
      }
      popupVisible.value = true;
    };
    let timeout: number;
    const handleMouseLeave = () => {
      mouseInChild = false;
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        if (!mouseInChild) {
          popupVisible.value = false;
        }
      }, 300);
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
      hasIcon: !!ctx.slots.icon,
      addMenuItem: (item: TdMenuItem) => {
        menuItems.value.push(item);
      },
    });

    onMounted(() => {
      if (isOpen.value) {
        if (selectSubMenu) {
          selectSubMenu(menuItems.value);
        }
      }
    });

    return {
      menuItems,
      mode,
      isHead,
      classes,
      subClass,
      popupClass,
      submenuClass,
      handleMouseEnter,
      handleMouseLeave,
      handleSubmenuItemClick,
      handleHeadmenuItemClick,
    };
  },
  methods: {
    renderHeadSubmenu() {
      const normalSubmenu = [
        <div class={this.submenuClass} onClick={this.handleHeadmenuItemClick}>
          {renderTNodeJSX(this, 'title')}
        </div>,
        <ul style="opacity: 0; width: 0; height: 0; overflow: hidden">
        {renderContent(this, 'default', 'content')}
        </ul>,
      ];
      const popupSubmenu = [
        <div class={this.submenuClass}
          onMouseenter={this.handleMouseEnter}
          onMouseleave={this.handleMouseLeave}
        >
          {renderTNodeJSX(this, 'title')}
          <t-icon-chevron-down class="t-submenu-icon"></t-icon-chevron-down>
        </div>,
        <ul
          class={this.popupClass}
          onMouseenter={this.handleMouseEnter}
          onMouseleave={this.handleMouseLeave}
          >
         {renderContent(this, 'default', 'content')}
       </ul>,
      ];
      return this.mode === 'normal' ? normalSubmenu : popupSubmenu;
    },
    renderSubmenu() {
      const hasContent = this.$slots.content || this.$slots.default;
      const normalSubmenu = [
        <div class={this.submenuClass} onClick={this.handleSubmenuItemClick}>
          {this.$slots.icon && this.$slots.icon()}
          <span class={[`${prefix}-menu__content`]}>{renderTNodeJSX(this, 'title')}</span>
          {hasContent && <t-icon-chevron-down class="t-submenu-icon"></t-icon-chevron-down>}
        </div>,
        <ul class={this.subClass} >
          {renderContent(this, 'default', 'content')}
        </ul>,
      ];
      const popupSubmenu = [
        <div class={this.submenuClass}
          onMouseenter={this.handleMouseEnter}
          onMouseleave={this.handleMouseLeave}>
          {this.$slots.icon && this.$slots.icon()}
          <span class={[`${prefix}-menu__content`]}>{renderTNodeJSX(this, 'title')}</span>
          <t-icon-chevron-down class="t-submenu-icon"></t-icon-chevron-down>
        </div>,
        <ul
          class={this.popupClass}
          onMouseenter={this.handleMouseEnter}
          onMouseleave={this.handleMouseLeave}
        >
          {renderContent(this, 'default', 'content')}
        </ul>,
      ];

      return this.mode === 'normal' ? normalSubmenu : popupSubmenu;
    },
  },
  render() {
    let child = null;

    if (Object.keys(this.$slots).length > 0) {
      child = this.isHead ? this.renderHeadSubmenu() : this.renderSubmenu();
    }
    return (
      <li class={this.classes}>
        {child}
      </li>
    );
  },
});

