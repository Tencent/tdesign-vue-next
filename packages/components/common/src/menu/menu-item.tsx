import { computed, defineComponent, getCurrentInstance, inject, onMounted, ref, toRefs } from '@td/adapter-vue';
import props from '@td/intel/menu/menu-item-props';
import { usePrefixClass, useRipple } from '@td/adapter-hooks';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import { emitEvent } from '../utils/event';
import { Tooltip } from '../tooltip';
import type { TdMenuInterface, TdSubMenuInterface } from './const';

export default defineComponent({
  name: 'TMenuItem',
  props: { ...props },
  emits: ['click'],
  setup(props, ctx) {
    const { href, target } = toRefs(props);
    const classPrefix = usePrefixClass();
    const menu = inject<TdMenuInterface>('TdMenu');
    const itemRef = ref<HTMLElement>();
    useRipple(itemRef);
    const submenu = inject<TdSubMenuInterface>('TdSubmenu', null);
    const active = computed(() => menu.activeValue.value === props.value);
    const collapsed = computed(() => menu.collapsed?.value);
    const classes = computed(() => [
      `${classPrefix.value}-menu__item`,
      {
        [`${classPrefix.value}-is-active`]: active.value,
        [`${classPrefix.value}-is-disabled`]: props.disabled,
        [`${classPrefix.value}-menu__item--plain`]: !ctx.slots.icon && !props.icon,
        [`${classPrefix.value}-submenu__item`]: !!submenu && !menu.isHead,
      },
    ]);
    // lifetimes
    onMounted(() => {
      menu?.vMenu?.add({ value: props.value, parent: submenu?.value, vnode: ctx.slots.default, ...props });
    });

    return {
      classPrefix,
      menu,
      active,
      collapsed,
      classes,
      itemRef,
      href,
      target,
      submenu,
    };
  },
  methods: {
    handleClick(e: MouseEvent) {
      e.stopPropagation();
      if (this.disabled) {
        return;
      }
      this.menu.select(this.value);
      emitEvent(this, 'click', { e, value: this.value });
      if (this.to || (this.routerLink && this.href)) {
        const router = this.router || this.$router;
        const methods: string = this.replace ? 'replace' : 'push';
        router[methods](this.to || this.href).catch((err: Error) => {
          // vue-router 3.1.0+ push/replace cause NavigationDuplicated error
          // https://github.com/vuejs/vue-router/issues/2872
          // 当前path和目标path相同时，会抛出NavigationDuplicated的错误
          if (
            err.name !== 'NavigationDuplicated'
            && !err.message.includes('Avoided redundant navigation to current location')
          ) {
            throw err;
          }
        });
      }
      this.submenu?.closeParentPopup?.(e);
    },
  },
  render() {
    const router = this.router || this.$router;

    const liContent = (
      <li ref="itemRef" class={this.classes} onClick={this.handleClick}>
        {renderTNodeJSX(this, 'icon')}
        {this.routerLink
          ? (
            <a
              href={this.href ? this.href : this.to ? router?.resolve(this.to).href : ''}
              target={this.target}
              class={`${this.classPrefix}-menu__item-link`}
              onClick={e => e.preventDefault()}
            >
              <span class={`${this.classPrefix}-menu__content`}>{renderContent(this, 'default', 'content')}</span>
            </a>
            )
          : this.href
            ? (
              <a
                href={this.href}
                target={this.target}
                class={`${this.classPrefix}-menu__item-link`}
                onClick={e => this.disabled && e.preventDefault()}
              >
                <span class={`${this.classPrefix}-menu__content`}>{renderContent(this, 'default', 'content')}</span>
              </a>
              )
            : (
              <span class={`${this.classPrefix}-menu__content`}>{renderContent(this, 'default', 'content')}</span>
              )}
      </li>
    );

    const instance = getCurrentInstance();
    const node = instance.parent;
    // 菜单收起，且只有本身为一级菜单才需要显示 tooltip
    if (this.collapsed && /tmenu/i.test(node?.type.name)) {
      return (
        <Tooltip content={() => renderContent(this, 'default', 'content')} placement="right">
          {liContent}
        </Tooltip>
      );
    }
    return liContent;
  },
});
