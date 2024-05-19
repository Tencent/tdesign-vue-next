import { computed, defineComponent, getCurrentInstance, inject, onMounted, ref, toRefs, watch } from '@td/adapter-vue';
import props from '@td/intel/components/menu/menu-item-props';
import { useContent, useEmitEvent, usePrefixClass, useRipple, useTNodeJSX } from '@td/adapter-hooks';
import { Tooltip } from '@td/component';
import type { TdMenuInterface, TdSubMenuInterface } from './const';

export default defineComponent({
  name: 'TMenuItem',
  props: { ...props },
  emits: ['click'],
  setup(props, ctx) {
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

    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();
    const emitEvent = useEmitEvent();
    // vue23:!!! $router 要怎么写
    const router = computed(() => props.router || getCurrentInstance()?.$router);

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (props.disabled) {
        return;
      }
      menu?.select(props.value);
      emitEvent('click', { e, value: props.value });
      if (props.to || (props.routerLink && props.href)) {
        const methods: string = props.replace ? 'replace' : 'push';
        router.value[methods](props.to || props.href).catch((err: Error) => {
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
      submenu?.closeParentPopup?.(e);
    };

    // lifetimes
    onMounted(() => {
      menu?.vMenu?.add({ value: props.value, parent: submenu?.value, vnode: ctx.slots.default, ...props });
    });

    const liContent = (
      <li ref="itemRef" class={classes.value} onClick={handleClick}>
        {renderTNodeJSX('icon')}
        {props.routerLink
          ? (
            <a
              href={props.href ? props.href : props.to ? router.value?.resolve(props.to).href : ''}
              target={props.target}
              class={`${classPrefix.value}-menu__item-link`}
              onClick={e => e.preventDefault()}
            >
              <span class={`${classPrefix.value}-menu__content`}>{renderContent('default', 'content')}</span>
            </a>
            )
          : props.href
            ? (
              <a
                href={props.href}
                target={props.target}
                class={`${classPrefix.value}-menu__item-link`}
                onClick={e => props.disabled && e.preventDefault()}
              >
                <span class={`${classPrefix.value}-menu__content`}>{renderContent('default', 'content')}</span>
              </a>
              )
            : (
              <span class={`${classPrefix.value}-menu__content`}>{renderContent('default', 'content')}</span>
              )}
      </li>
    );

    return () => {
      const instance = getCurrentInstance();
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
