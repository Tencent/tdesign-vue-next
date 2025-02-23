import { defineComponent, computed, inject, onMounted, ref, toRefs, getCurrentInstance } from 'vue';
import props from './menu-item-props';
import { TdMenuInterface, TdSubMenuInterface } from './consts';
import { useTNodeJSX, useContent } from '../hooks/tnode';
import useRipple from '../hooks/useRipple';
import { usePrefixClass } from '../hooks/useConfig';
import Tooltip from '../tooltip';

export default defineComponent({
  name: 'TMenuItem',
  props,
  emits: ['click'],
  setup(props, ctx) {
    const { href, target, to, disabled, value, onClick, routerLink, replace } = toRefs(props);
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();

    const menu = inject<TdMenuInterface>('TdMenu');
    const itemRef = ref<HTMLElement>();
    const instance = getCurrentInstance();

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
    const router = computed(() => props.router || instance?.proxy.$router);

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (disabled.value) return;
      menu.select(value.value);
      ctx.emit('click', { e, value: value.value });
      onClick.value?.({ e, value: value.value });
      if (to.value || (routerLink.value && href.value)) {
        const methods: string = replace.value ? 'replace' : 'push';
        router.value[methods](to.value || href.value).catch((err: Error) => {
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
      submenu?.closeParentPopup?.(e);
    };

    // lifetimes
    onMounted(() => {
      menu?.vMenu?.add({ value: props.value, parent: submenu?.value, vnode: ctx.slots.default, ...props });
    });

    return () => {
      const liContent = (
        <li ref={itemRef} class={classes.value} onClick={handleClick}>
          {renderTNodeJSX('icon')}
          {routerLink.value ? (
            <a
              href={href.value ? href.value : to.value ? router.value?.resolve(to.value).href : ''}
              target={target.value}
              class={`${classPrefix.value}-menu__item-link`}
              onClick={(e) => e.preventDefault()}
            >
              <span class={`${classPrefix.value}-menu__content`}>{renderContent('default', 'content')}</span>
            </a>
          ) : href.value ? (
            <a
              href={href.value}
              target={target.value}
              class={`${classPrefix.value}-menu__item-link`}
              onClick={(e) => disabled.value && e.preventDefault()}
            >
              <span class={`${classPrefix.value}-menu__content`}>{renderContent('default', 'content')}</span>
            </a>
          ) : (
            <span class={`${classPrefix.value}-menu__content`}>{renderContent('default', 'content')}</span>
          )}
        </li>
      );

      const node = instance?.parent;
      // 菜单收起，且只有本身为一级菜单才需要显示 tooltip
      if (collapsed.value && /tmenu/i.test(node?.type.name)) {
        return (
          <Tooltip content={() => renderContent('default', 'content')} placement="right">
            {liContent}
          </Tooltip>
        );
      }
      return liContent;
    };
  },
});
