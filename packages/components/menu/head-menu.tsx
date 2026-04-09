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

import { useVModel, usePrefixClass, useDefaultValue, useResizeObserver } from '@tdesign/shared-hooks';

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
      // @ts-ignore: TODO
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
    const moreSubMenuRef = ref<HTMLElement>();

    // 记录每个 DOM 子元素的完整宽度（包含 margin），key 为 DOM 元素
    const nodeWidthMap = new WeakMap<HTMLElement, number>();
    // 记录从第几个 DOM 子元素开始折叠（-1 表示不折叠）
    const foldStartIndex = ref(-1);

    /**
     * 获取 menuRef 下所有直接子级 HTMLElement（即实际渲染出的菜单项 DOM），
     * 无论用户怎么封装组件、slot 结构如何变化，这里拿到的始终是真实 DOM。
     * 过滤掉"更多"按钮自身。
     */
    const getMenuItemElements = (): HTMLElement[] => {
      if (!menuRef.value) return [];
      return Array.from(menuRef.value.children).filter(
        (el): el is HTMLElement =>
          el instanceof HTMLElement && !el.classList.contains(`${classPrefix.value}-head-menu__submenu--more`),
      );
    };

    const getElementWidth = (el: HTMLElement): number => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return rect.width + Number.parseFloat(style.marginLeft) + Number.parseFloat(style.marginRight);
    };

    /**
     * 核心：基于 DOM 的溢出计算。
     * 不再依赖 ctx.slots.default() 做 VNode 切片，而是直接操作已渲染的 DOM 元素。
     * 这样在封装组件场景下（如 Fragment、wrapper 组件等），
     * 只要最终渲染出的是 <li> 菜单项，就能正确计算。
     */
    const handleResize = () => {
      if (props.expandType !== 'popup') return;

      const itemNodes = getMenuItemElements();
      if (itemNodes.length === 0) return;

      const menuWidth = calcMenuWidth();
      const subMoreWidth = 64 + 8;

      // 先让所有项都可见来测量真实宽度（使用 visibility:hidden 避免闪烁）
      // 如果当前已经处于折叠状态，被隐藏的项宽度为 0，需要临时恢复
      const hiddenItems: { el: HTMLElement; display: string }[] = [];
      itemNodes.forEach((el) => {
        if (el.style.display === 'none') {
          hiddenItems.push({ el, display: el.style.display });
          el.style.display = '';
          el.style.visibility = 'hidden';
          el.style.position = 'absolute';
        }
      });

      // 测量所有项宽度
      itemNodes.forEach((el) => {
        nodeWidthMap.set(el, getElementWidth(el));
      });

      // 恢复临时显示的元素
      hiddenItems.forEach(({ el, display }) => {
        el.style.display = display;
        el.style.visibility = '';
        el.style.position = '';
      });

      // 计算所有项总宽度
      let totalItemsWidth = 0;
      itemNodes.forEach((el) => {
        totalItemsWidth += nodeWidthMap.get(el) || 0;
      });

      if (totalItemsWidth <= menuWidth) {
        // 全部放得下，无需折叠
        foldStartIndex.value = -1;
      } else {
        // 从前往后累加，找到截断点
        let currentWidth = 0;
        let cutIndex = itemNodes.length; // 默认全部溢出
        for (let i = 0; i < itemNodes.length; i++) {
          const w = nodeWidthMap.get(itemNodes[i]) || 0;
          if (currentWidth + w + subMoreWidth > menuWidth) {
            cutIndex = i;
            break;
          }
          currentWidth += w;
        }
        foldStartIndex.value = cutIndex;
      }

      // 应用折叠状态到 DOM
      applyFoldState(itemNodes);
    };

    /**
     * 根据 foldStartIndex 控制 DOM 元素的显示/隐藏，
     * 并将溢出的 DOM 元素克隆到"更多"子菜单中。
     */
    const applyFoldState = (itemNodes: HTMLElement[]) => {
      const isFolded = foldStartIndex.value >= 0;

      itemNodes.forEach((el, index) => {
        if (isFolded && index >= foldStartIndex.value) {
          el.style.display = 'none';
        } else {
          el.style.display = '';
        }
      });

      // 更新"更多"子菜单的可见性
      if (moreSubMenuRef.value) {
        moreSubMenuRef.value.style.display = isFolded ? '' : 'none';
      }
    };

    useResizeObserver(innerRef, handleResize);

    // 监听 slot 内容变化后重新计算
    const scheduleResize = () => {
      nextTick(() => handleResize());
    };

    // 监听 logo 内部图片的加载
    // Q: why?
    // A: logo 中图片加载完成后可能会导致 menu 的宽度发生变化（初始化时图片未加载完成，初始化获取的宽度不准确），从而影响菜单项的展示，因此需要监听图片的加载事件来重新计算菜单的布局。
    watch(logoRef, (el) => {
      if (el) {
        const imgs = el.querySelectorAll('img');
        imgs.forEach((img) => {
          if (!img.complete) {
            img.onload = () => handleResize();
          }
        });
      }
    });

    const getComputedCss = (el: Element, cssProperty: keyof CSSStyleDeclaration) =>
      getComputedStyle(el)[cssProperty] ?? '';

    const getComputedCssValue = (el: Element, cssProperty: keyof CSSStyleDeclaration) =>
      Number.parseInt(String(getComputedCss(el, cssProperty)), 10);

    const calcMenuWidth = () => {
      if (!innerRef.value || !menuRef.value) return 0;
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

    /**
     * 从 DOM 中收集溢出的菜单项，用于渲染到"更多"弹出子菜单中。
     * 通过 Teleport 的思路：溢出项在原位 display:none，在"更多"子菜单中渲染对应的 slot VNode。
     *
     * 这里的关键改进：通过递归扁平化 slot VNode 树来获取所有叶子菜单项节点，
     * 这样无论用户怎么封装组件（Fragment、wrapper 等），都能正确按索引截取。
     */
    const flattenSlotNodes = (nodes: VNode[]): VNode[] => {
      const result: VNode[] = [];
      for (const node of nodes) {
        // Fragment 节点：Vue 将 template 中多个根节点包装为 Fragment
        if (node.type === Symbol.for('v-fgm') || node.type === Symbol.for('')) {
          if (isArray(node.children)) {
            result.push(...flattenSlotNodes(node.children as VNode[]));
          }
        } else if ((node.type as Component)?.name === 'TSubmenu' || (node.type as Component)?.name === 'TMenuItem') {
          result.push(node);
        } else if (isArray(node.children)) {
          // 其他包装节点，尝试递归
          result.push(...flattenSlotNodes(node.children as VNode[]));
        } else if (isFunction((node.children as any)?.default)) {
          // 组件的 default slot
          result.push(...flattenSlotNodes((node.children as any).default()));
        } else {
          // 未知节点，直接保留
          result.push(node);
        }
      }
      return result;
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

    return () => {
      const logo = props.logo?.(h) || ctx.slots.logo?.();
      const operations = props.operations?.(h) || ctx.slots.operations?.() || ctx.slots.options?.();
      const originalContent = ctx.slots.default?.() || ctx.slots.content?.() || [];

      // 扁平化 slot VNode，获取所有菜单项（解决封装组件场景）
      const flatItems = flattenSlotNodes(originalContent);

      // 根据折叠索引分割 VNode
      const isFolded = foldStartIndex.value >= 0 && foldStartIndex.value < flatItems.length;
      const overflowItems = isFolded ? flatItems.slice(foldStartIndex.value) : [];

      // 内容始终完整渲染（通过 DOM display:none 控制可见性），
      // 保证 DOM 子元素数量稳定，handleResize 的索引对应关系始终正确
      const content = originalContent;

      vMenu.data.children = [];
      vMenu.cache.clear();
      initVMenu(flatItems);

      // 每次 render 后重新计算折叠
      nextTick(scheduleResize);

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
              {props.expandType === 'popup' && (
                <Submenu
                  ref={moreSubMenuRef}
                  class={`${classPrefix.value}-head-menu__submenu--more`}
                  expandType="popup"
                  title={() => <EllipsisIcon />}
                  style={{ display: isFolded ? '' : 'none' }}
                >
                  {overflowItems}
                </Submenu>
              )}
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
