import {
  defineComponent,
  computed,
  provide,
  ref,
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  watchEffect,
  toRefs,
  h,
  VNode,
  Component,
  getCurrentInstance,
  nextTick,
} from 'vue';
import { EllipsisIcon } from 'tdesign-icons-vue-next';
import { isArray, isFunction } from 'lodash-es';

import log from '@tdesign/common-js/log/log';
import props from './head-menu-props';
import { MenuValue } from './type';
import { TdMenuInterface, TdOpenType } from './types';
import { Tabs, TabPanel } from '../tabs';
import Submenu from './submenu';
import { VMenu } from './utils';

import { useVModel, usePrefixClass, useDefaultValue } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'THeadMenu',
  props,
  setup(props, ctx) {
    const classPrefix = usePrefixClass();
    const { proxy } = getCurrentInstance();
    watchEffect(() => {
      if (ctx.slots.options) {
        log.warnOnce('TMenu', '`options` slot is going to be deprecated, please use `operations` for slot instead.');
      }
    });
    const { value, modelValue, expanded } = toRefs(props);
    const [activeValue, setActiveValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const [expandValues, setExpanded] = useDefaultValue(expanded, props.defaultExpanded, props.onExpand, 'expanded');
    const activeValues = ref([]);
    const theme = computed(() => props.theme);
    const menuClass = computed(() => [
      `${classPrefix.value}-menu`,
      `${classPrefix.value}-head-menu`,
      `${classPrefix.value}-menu--${props.theme}`,
    ]);
    const mode = ref(props.expandType);
    const submenu = reactive([]);
    const vMenu = new VMenu({ isMutex: true, expandValues: expandValues.value });

    provide<TdMenuInterface>('TdMenu', {
      mode,
      theme,
      vMenu,
      isHead: true,
      expandValues,
      activeValue,
      activeValues,
      select: (value: MenuValue) => {
        setActiveValue(value);
      },
      open: (value: MenuValue, type: TdOpenType) => {
        const expanded = [...expandValues.value];
        const index = expanded.indexOf(value);

        if (mode.value === 'popup') {
          if (type === 'add') {
            if (index === -1) {
              // 可能初始expanded里包含了该value
              expanded.push(value);
            }
          } else if (type === 'remove') {
            expanded.splice(index, 1);
          }
        } else if (mode.value === 'normal' && value !== undefined) {
          expanded.splice(0, 1);
          if (index === -1) {
            expanded.push(value);
          }
        }
        setExpanded(expanded);
      },
    });

    // methods
    const handleTabChange = (value: MenuValue) => {
      setActiveValue(value);
      handleClickSubMenuItem(value);
    };

    const handleSubmenuExpand = (value: MenuValue) => {
      const ans = vMenu.getChild(value);
      submenu.length = 0;
      submenu.push(...ans);
    };

    // watch
    watch(expandValues, (value) => {
      if (mode.value === 'normal') {
        handleSubmenuExpand(value[0]);
      }
    });
    const updateActiveValues = (value: MenuValue) => {
      activeValues.value = vMenu.select(value);
    };
    watch(activeValue, updateActiveValues);
    watch(
      () => props.expandType,
      (value) => {
        mode.value = value;
      },
    );

    const handleClickSubMenuItem = (value: MenuValue) => {
      const activeMenuItem = submenu.find((v) => v.value === value);
      activeMenuItem.onClick?.({ value });
      const { to, href, replace } = activeMenuItem;
      if (href) {
        window.location.href = activeMenuItem.href;
      }
      const router = activeMenuItem.router || proxy.$router;
      if (to && router) {
        replace ? router.replace(to) : router.push(to);
      }
    };
    // setup返回的render函数中无法访问methods属性中的类容，移动此方法到setup中
    const renderNormalSubmenu = () => {
      if (submenu.length === 0) return null;
      return (
        <ul class={[`${classPrefix.value}-head-menu__submenu`, `${classPrefix.value}-submenu`]}>
          {
            <Tabs value={activeValue.value} onChange={handleTabChange}>
              {submenu.map((item) => (
                <TabPanel value={item.value} label={item.vnode()[0]?.children} />
              ))}
            </Tabs>
          }
        </ul>
      );
    };

    const menuRef = ref<HTMLUListElement>();
    const innerRef = ref<HTMLDivElement>();
    const logoRef = ref<HTMLDivElement>();
    const operationRef = ref<HTMLDivElement>();

    // Store the index at which menu items should be sliced for ellipsis
    const sliceIndex = ref(-1);
    // ResizeObserver instance
    let resizeObserver: ResizeObserver | null = null;
    // Width reserved for the ellipsis menu item
    const ELLIPSIS_WIDTH = 56;

    const getComputedCss = (el: Element, cssProperty: keyof CSSStyleDeclaration) =>
      getComputedStyle(el)[cssProperty] ?? '';

    const getComputedCssValue = (el: Element, cssProperty: keyof CSSStyleDeclaration) =>
      Number.parseInt(String(getComputedCss(el, cssProperty)), 10);

    const calcMenuWidth = () => {
      if (!menuRef.value || !innerRef.value) return 0;

      const menuPaddingLeft = getComputedCssValue(menuRef.value, 'paddingLeft');
      const menuPaddingRight = getComputedCssValue(menuRef.value, 'paddingRight');
      let totalWidth = innerRef.value.clientWidth;
      if (logoRef.value) {
        const logoMarginLeft = getComputedCssValue(logoRef.value, 'marginLeft');
        const logoMarginRight = getComputedCssValue(logoRef.value, 'marginRight');
        totalWidth = totalWidth - logoRef.value.offsetWidth - logoMarginLeft - logoMarginRight;
      }

      if (operationRef.value) {
        const operationMarginLeft = getComputedCssValue(operationRef.value, 'marginLeft');
        const operationMarginRight = getComputedCssValue(operationRef.value, 'marginRight');
        totalWidth = totalWidth - operationRef.value.offsetWidth - operationMarginLeft - operationMarginRight;
      }

      return totalWidth - menuPaddingLeft - menuPaddingRight;
    };

    // Calculate the slice index based on available width
    const calcEllipsisSliceIndex = () => {
      if (!props.ellipsis || !menuRef.value || !innerRef.value) {
        sliceIndex.value = -1;
        return;
      }

      const menuItems = Array.from(menuRef.value.children ?? []).filter(
        (item) => !item.classList.contains(`${classPrefix.value}-menu__ellipsis`),
      ) as HTMLElement[];

      if (menuItems.length === 0) {
        sliceIndex.value = -1;
        return;
      }

      // Store widths for calculations
      const widths = menuItems.map((item) => item.offsetWidth);

      const availableWidth = calcMenuWidth();

      let usedWidth = 0;
      let newSliceIndex = menuItems.length;

      for (let i = 0; i < menuItems.length; i++) {
        usedWidth += widths[i];
        // Check if adding the next item would overflow
        // We need to reserve space for ellipsis if there are more items after
        const needsEllipsis = i < menuItems.length - 1;
        const reservedWidth = needsEllipsis ? ELLIPSIS_WIDTH : 0;

        if (usedWidth + reservedWidth > availableWidth) {
          // This item doesn't fit, slice here
          newSliceIndex = i;
          break;
        }
      }

      // If all items fit, no ellipsis needed
      sliceIndex.value = newSliceIndex < menuItems.length ? newSliceIndex : -1;
    };

    // Setup ResizeObserver to detect size changes
    const setupResizeObserver = () => {
      if (!props.ellipsis || typeof ResizeObserver === 'undefined') return;

      resizeObserver = new ResizeObserver(() => {
        nextTick(() => {
          calcEllipsisSliceIndex();
        });
      });

      if (innerRef.value) {
        resizeObserver.observe(innerRef.value);
      }
    };

    // Get content with ellipsis handling
    const getContent = () => {
      const slot = ctx.slots.default?.() || ctx.slots.content?.() || [];

      if (!props.ellipsis || sliceIndex.value === -1 || sliceIndex.value >= slot.length) {
        return slot;
      }

      const visibleItems = slot.slice(0, sliceIndex.value);
      const hiddenItems = slot.slice(sliceIndex.value);

      if (hiddenItems.length === 0) {
        return slot;
      }

      return [
        ...visibleItems,
        <Submenu expandType="popup" title={() => <EllipsisIcon />} class={`${classPrefix.value}-menu__ellipsis`}>
          {hiddenItems}
        </Submenu>,
      ];
    };

    const initVMenu = (slots: VNode[], parentValue?: string) => {
      slots.forEach((node) => {
        const nodeValue = node.props?.value;
        if ((node.type as Component)?.name === 'TSubmenu' || (node.type as Component)?.name === 'TMenuItem') {
          vMenu.add({ value: nodeValue, parent: parentValue, vnode: (node.children as any).default, ...node.props });
        }
        if (isFunction((node.children as any)?.default)) {
          initVMenu((node.children as any).default(), nodeValue);
          return;
        }
        if (isArray(node.children)) {
          initVMenu(node.children as VNode[], nodeValue);
        }
      });
    };
    initVMenu(ctx.slots.default?.() || ctx.slots.content?.() || []);

    onMounted(() => {
      activeValues.value = vMenu.select(activeValue.value);
      if (expandValues.value?.length > 0) {
        handleSubmenuExpand(expandValues.value[0]); // 顶部导航只能同时展开一个子菜单
      }

      // Initial calculation after mount
      if (props.ellipsis) {
        nextTick(() => {
          calcEllipsisSliceIndex();
          setupResizeObserver();
        });
      }
    });

    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    });

    // Watch for ellipsis prop changes
    watch(
      () => props.ellipsis,
      (newVal) => {
        if (newVal) {
          nextTick(() => {
            calcEllipsisSliceIndex();
            setupResizeObserver();
          });
        } else {
          sliceIndex.value = -1;
          if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
          }
        }
      },
    );

    return () => {
      const logo = props.logo?.(h) || ctx.slots.logo?.();
      const operations = props.operations?.(h) || ctx.slots.operations?.() || ctx.slots.options?.();
      const content = getContent();

      return (
        <div class={menuClass.value}>
          <div class={`${classPrefix.value}-head-menu__inner`} ref={innerRef}>
            {logo && (
              <div class={`${classPrefix.value}-menu__logo`} ref={logoRef}>
                {logo}
              </div>
            )}
            <ul class={`${classPrefix.value}-menu`} ref={menuRef}>
              {content}
            </ul>
            {operations && (
              <div class={`${classPrefix.value}-menu__operations`} ref={operationRef}>
                {operations}
              </div>
            )}
          </div>
          {mode.value === 'normal' && renderNormalSubmenu()}
        </div>
      );
    };
  },
});
