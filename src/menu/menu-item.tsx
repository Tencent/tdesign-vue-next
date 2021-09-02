import {
  defineComponent, computed, inject, onMounted,
} from 'vue';
import { prefix } from '../config';
import props from './menu-item-props';
import { TdMenuInterface, TdSubMenuInterface } from './const';

const name = `${prefix}-menu-item`;

export default defineComponent({
  name,
  props: { ...props },
  setup(props, ctx) {
    const menu = inject<TdMenuInterface>('TdMenu');
    const submenu = inject<TdSubMenuInterface>('TdSubmenu', null);
    const active = computed(() => menu.activeIndexValue.value === props.value);
    const classes = computed(() => [
      `${prefix}-menu__item`,
      {
        [`${prefix}-is-active`]: active.value,
        [`${prefix}-is-disabled`]: props.disabled,
        [`${prefix}-menu__item--plain`]: !ctx.slots.icon,
        [`${prefix}-submenu__item`]: !!submenu && !menu.isHead,
        [`${prefix}-submenu__item--icon`]: submenu && submenu.hasIcon,
      },
    ]);

    // lifetimes
    onMounted(() => {
      if (submenu) {
        const label = ctx.slots.default && ctx.slots.default()[0].children;
        submenu.addMenuItem({
          value: props.value,
          label,
        });
      }
    });

    return {
      menu,
      active,
      classes,
    };
  },
  methods: {
    handleClick() {
      if (this.disabled) return;
      this.menu.select(this.value);

      if (this.href) {
        window.open(this.href, this.target);
      } else if (this.to) {
        const router = this.router || this.$router;
        const methods: string = props.replace ? 'replace' : 'push';
        router[methods](this.to).catch((err: Error) => {
          // vue-router 3.1.0+ push/replace cause NavigationDuplicated error
          // https://github.com/vuejs/vue-router/issues/2872
          // 当前path和目标path相同时，会抛出NavigationDuplicated的错误
          if (err.name !== 'NavigationDuplicated'
          && !err.message.includes('Avoided redundant navigation to current location')
          ) {
            throw (err);
          }
        });
      }
    },
  },
  render() {
    const { default: defaultSlot, icon: iconSlot } = this.$slots;
    return (
      <li class={this.classes} onClick={this.handleClick}>
        {iconSlot && iconSlot()}
        <span class={[`${prefix}-menu__content`]}>{defaultSlot && defaultSlot()}</span>
      </li>
    );
  },
});
