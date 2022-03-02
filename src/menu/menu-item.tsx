import { defineComponent, computed, inject, onMounted, ref, getCurrentInstance } from 'vue';
import { prefix } from '../config';
import props from './menu-item-props';
import { TdMenuInterface, TdSubMenuInterface } from './const';
import ripple from '../utils/ripple';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { emitEvent } from '../utils/event';
import useRipple from '../hooks/useRipple';

export default defineComponent({
  name: 'TMenuItem',
  directives: { ripple },
  props: { ...props },
  emits: ['click'],
  setup(props, ctx) {
    const menu = inject<TdMenuInterface>('TdMenu');
    const itemRef = ref<HTMLElement>();
    useRipple(itemRef);
    const submenu = inject<TdSubMenuInterface>('TdSubmenu', null);
    const active = computed(() => menu.activeValue.value === props.value);
    const classes = computed(() => [
      `${prefix}-menu__item`,
      {
        [`${prefix}-is-active`]: active.value,
        [`${prefix}-is-disabled`]: props.disabled,
        [`${prefix}-menu__item--plain`]: !ctx.slots.icon && !props.icon,
        [`${prefix}-submenu__item`]: !!submenu && !menu.isHead,
      },
    ]);

    // lifetimes
    onMounted(() => {
      menu?.vMenu?.add({ value: props.value, parent: submenu?.value, vnode: ctx.slots.default });
    });

    return {
      menu,
      active,
      classes,
      itemRef,
    };
  },
  methods: {
    handleClick() {
      if (this.disabled) return;
      this.menu.select(this.value);
      emitEvent(this, 'click');
      if (this.href) {
        window.open(this.href, this.target);
      } else if (this.to) {
        const router = this.router || this.$router;
        const methods: string = props.replace ? 'replace' : 'push';
        router[methods](this.to).catch((err: Error) => {
          // vue-router 3.1.0+ push/replace cause NavigationDuplicated error
          // https://github.com/vuejs/vue-router/issues/2872
          // 当前path和目标path相同时，会抛出NavigationDuplicated的错误
          if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
          ) {
            throw err;
          }
        });
      }
    },
  },
  render() {
    return (
      <li ref="itemRef" class={this.classes} onClick={this.handleClick}>
        {renderTNodeJSX(this, 'icon')}
        <span class={[`${prefix}-menu__content`]}>{renderContent(this, 'default', 'content')}</span>
      </li>
    );
  },
});
