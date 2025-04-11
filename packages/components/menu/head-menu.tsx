import {
  defineComponent,
  computed,
  provide,
  ref,
  reactive,
  watch,
  onMounted,
  watchEffect,
  toRefs,
  h,
  VNode,
  Component,
  getCurrentInstance,
} from 'vue';
import { EllipsisIcon } from 'tdesign-icons-vue-next';
import { isFunction } from 'lodash-es';
import { isArray } from 'lodash-es';

import log from '@tdesign/common-js/log/log';
import props from './head-menu-props';
import { MenuValue } from './type';
import { TdMenuInterface, TdOpenType } from './types';
import { Tabs, TabPanel } from '../tabs';
import Submenu from './submenu';
import { VMenu } from './utils';

import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';

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

    onMounted(() => {
      activeValues.value = vMenu.select(activeValue.value);
      if (expandValues.value?.length > 0) {
        handleSubmenuExpand(expandValues.value[0]); // 顶部导航只能同时展开一个子菜单
      }
    });

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

    const getComputedCss = (el: Element, cssProperty: keyof CSSStyleDeclaration) =>
      getComputedStyle(el)[cssProperty] ?? '';

    const getComputedCssValue = (el: Element, cssProperty: keyof CSSStyleDeclaration) =>
      Number.parseInt(String(getComputedCss(el, cssProperty)), 10);

    const calcMenuWidth = () => {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formatContent = () => {
      let slot = ctx.slots.default?.() || ctx.slots.content?.() || [];

      if (menuRef.value && innerRef.value) {
        const validNodes = Array.from(menuRef.value.childNodes ?? []).filter(
          (item) => item.nodeName !== '#text' || item.nodeValue,
        ) as HTMLElement[];

        const menuWidth = calcMenuWidth();
        const menuItemMinWidth = 104;

        let remainWidth = menuWidth;
        let sliceIndex = validNodes.length;

        for (let index = 0; index < validNodes.length; index++) {
          const element = validNodes[index];
          remainWidth -= element.offsetWidth || 0;
          if (remainWidth < menuItemMinWidth) {
            sliceIndex = index;
            break;
          }
        }

        const defaultSlot = slot.slice(0, sliceIndex);
        const subMore = slot.slice(sliceIndex);

        if (subMore.length) {
          slot = defaultSlot.concat(
            <Submenu expandType="popup" title={() => <EllipsisIcon />}>
              {subMore}
            </Submenu>,
          );
        }
      }
      return slot;
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

    return () => {
      const logo = props.logo?.(h) || ctx.slots.logo?.();
      const operations = props.operations?.(h) || ctx.slots.operations?.() || ctx.slots.options?.();

      // TODO: 判断逻辑不够完善 影响封装组件的子菜单样式渲染 暂时先不执行 待调整实现方案
      // const content = formatContent();
      const content = ctx.slots.default?.() || ctx.slots.content?.() || [];

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
