import {
  defineComponent,
  computed,
  provide,
  ref,
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  watchEffect,
  toRefs,
  h,
  VNode,
  Fragment,
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
import PopupOverflowContent from './components/popup-overflow-content';
import { VMenu } from './utils';

import { useVModel, usePrefixClass, useDefaultValue, useResizeObserver } from '@tdesign/shared-hooks';

// 用于"更多"Submenu 的特殊 value，不会与任何实际菜单项冲突
const MORE_SUBMENU_VALUE = '__t_head_menu_more__';

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
    let cachedFlatItemValues: MenuValue[] = [];

    const updateActiveValues = (value: MenuValue) => {
      const pureVals = vMenu.select(value).filter((v) => v !== MORE_SUBMENU_VALUE);
      activeValues.value = pureVals;
      syncMoreActiveState();
    };

    const syncMoreActiveState = () => {
      const vals = activeValues.value.filter((v) => v !== MORE_SUBMENU_VALUE);
      const isFolded = foldStartIndex.value >= 0;

      let needActive = false;
      if (isFolded && vals.length > 0 && cachedFlatItemValues.length > 0) {
        const foldedTopValues = new Set(cachedFlatItemValues.slice(foldStartIndex.value));

        const topLevelAncestor = vals.find((v) => v != null);
        needActive = topLevelAncestor != null && foldedTopValues.has(topLevelAncestor);
      }

      if (needActive) {
        activeValues.value = [...vals, MORE_SUBMENU_VALUE];
      } else {
        activeValues.value = vals;
      }
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

    // 记录从第几个 DOM 子元素开始折叠（-1 表示不折叠）
    const foldStartIndex = ref(-1);
    // 缓存每个菜单项的完整宽度（包含 margin），即使被 display:none 也能使用缓存值
    const cachedItemWidths: number[] = [];

    /**
     * 获取 menuRef 下所有菜单项 DOM 元素（<li> 级别）, 兼容通过封装组件实现的子菜单
     */
    const getMenuItemElements = (): HTMLElement[] => {
      if (!menuRef.value) return [];
      const moreClass = `${classPrefix.value}-head-menu__submenu--more`;
      const menuItemClass = `${classPrefix.value}-menu__item`;
      const submenuClass = `${classPrefix.value}-submenu`;

      const result: HTMLElement[] = [];

      const collectItems = (parent: HTMLElement, depth: number) => {
        // 限制递归深度，避免无限递归
        if (depth > 3) return;
        Array.from(parent.children).forEach((el) => {
          if (!(el instanceof HTMLElement)) return;
          // 跳过"更多"按钮
          if (el.classList.contains(moreClass)) return;
          // 如果是菜单项或子菜单，收集它
          if (el.classList.contains(menuItemClass) || el.classList.contains(submenuClass)) {
            result.push(el);
          } else {
            // 否则认为是封装容器，继续向下查找
            collectItems(el, depth + 1);
          }
        });
      };

      collectItems(menuRef.value, 0);
      return result;
    };

    /**
     * 获取"更多"按钮的实际 DOM 宽度（而非硬编码）
     */
    const getMoreButtonWidth = (): number => {
      if (!menuRef.value) return 0;
      const moreEl = menuRef.value.querySelector(`.${classPrefix.value}-head-menu__submenu--more`) as HTMLElement;
      if (!moreEl) return 0;
      // 如果"更多"按钮被隐藏，临时显示来测量
      const wasHidden = moreEl.style.display === 'none';
      if (wasHidden) {
        moreEl.style.visibility = 'hidden';
        moreEl.style.display = '';
      }
      const style = window.getComputedStyle(moreEl);
      const rect = moreEl.getBoundingClientRect();
      const w = rect.width + Number.parseFloat(style.marginLeft) + Number.parseFloat(style.marginRight);
      if (wasHidden) {
        moreEl.style.display = 'none';
        moreEl.style.visibility = '';
      }
      return w;
    };

    const getElementWidth = (el: HTMLElement): number => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return rect.width + Number.parseFloat(style.marginLeft) + Number.parseFloat(style.marginRight);
    };

    const getWrapperElements = (): HTMLElement[] => {
      if (!menuRef.value) return [];
      const moreClass = `${classPrefix.value}-head-menu__submenu--more`;
      const menuItemClass = `${classPrefix.value}-menu__item`;
      const submenuClass = `${classPrefix.value}-submenu`;
      const wrappers: HTMLElement[] = [];

      Array.from(menuRef.value.children).forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        if (el.classList.contains(moreClass)) return;
        if (el.classList.contains(menuItemClass) || el.classList.contains(submenuClass)) return;
        // 既不是菜单项也不是"更多"按钮，就是封装容器
        wrappers.push(el);
      });
      return wrappers;
    };

    const handleResize = () => {
      if (props.expandType !== 'popup') return;
      if (!menuRef.value) return;

      // 先处理封装容器：临时设 display:contents 使其不产生盒子
      const wrappers = getWrapperElements();
      const savedWrapperDisplays: string[] = [];
      wrappers.forEach((el) => {
        savedWrapperDisplays.push(el.style.display);
        el.style.display = 'contents';
      });

      const itemNodes = getMenuItemElements();
      if (itemNodes.length === 0) {
        wrappers.forEach((el, i) => {
          el.style.display = savedWrapperDisplays[i];
        });
        foldStartIndex.value = -1;
        applyFoldState();
        return;
      }

      // 恢复所有项可见，测量真实自然宽度
      const moreEl = menuRef.value.querySelector(`.${classPrefix.value}-head-menu__submenu--more`) as HTMLElement;
      if (moreEl) moreEl.style.display = 'none';

      const savedFlexShrinks: string[] = [];
      const savedDisplays: string[] = [];
      itemNodes.forEach((el) => {
        savedDisplays.push(el.style.display);
        el.style.display = '';
        savedFlexShrinks.push(el.style.flexShrink);
        el.style.flexShrink = '0';
      });

      cachedItemWidths.length = 0;
      itemNodes.forEach((el) => {
        cachedItemWidths.push(getElementWidth(el));
      });

      // 恢复测量前的状态
      itemNodes.forEach((el, index) => {
        el.style.flexShrink = savedFlexShrinks[index];
        el.style.display = savedDisplays[index];
      });
      if (moreEl) moreEl.style.display = savedDisplays.length > 0 ? '' : 'none';

      // 恢复封装容器
      wrappers.forEach((el) => {
        el.style.display = 'contents';
      });

      // 计算截断点
      const menuWidth = calcMenuWidth();
      const totalItemsWidth = cachedItemWidths.reduce((sum, w) => sum + w, 0);

      let newFoldIndex = -1;

      if (totalItemsWidth > menuWidth) {
        const subMoreWidth = getMoreButtonWidth();
        let currentWidth = 0;
        for (let i = 0; i < itemNodes.length; i++) {
          if (currentWidth + cachedItemWidths[i] + subMoreWidth > menuWidth) {
            newFoldIndex = i;
            break;
          }
          currentWidth += cachedItemWidths[i];
        }
        if (newFoldIndex === -1 && currentWidth + subMoreWidth > menuWidth) {
          newFoldIndex = itemNodes.length - 1;
        }
      }

      foldStartIndex.value = newFoldIndex;
      applyFoldState();
    };

    const applyFoldState = () => {
      if (!menuRef.value) return;

      // 确保封装容器始终 display:contents
      const wrappers = getWrapperElements();
      wrappers.forEach((el) => {
        el.style.display = 'contents';
      });

      const itemNodes = getMenuItemElements();
      const moreEl = menuRef.value.querySelector(`.${classPrefix.value}-head-menu__submenu--more`) as HTMLElement;
      const isFolded = foldStartIndex.value >= 0;

      itemNodes.forEach((el, index) => {
        el.style.display = isFolded && index >= foldStartIndex.value ? 'none' : '';
      });

      if (moreEl) {
        moreEl.style.display = isFolded ? '' : 'none';
      }

      // 折叠状态变化后，更新"更多"按钮的高亮状态
      syncMoreActiveState();
    };

    // 使用 ResizeObserver 监听容器尺寸变化（安全，不会因 DOM 样式修改而循环触发）
    useResizeObserver(innerRef, handleResize);

    // 监听 logo 内部图片的加载
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
      const menuMarginLeft = getComputedCssValue(menuRef.value, 'marginLeft');
      const menuMarginRight = getComputedCssValue(menuRef.value, 'marginRight');
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

      return totalWidth - menuPaddingLeft - menuPaddingRight - menuMarginLeft - menuMarginRight;
    };

    /**
     * 通过递归扁平化 slot VNode 树来获取所有叶子菜单项节点
     */
    const flattenSlotNodes = (nodes: VNode[]): VNode[] => {
      const result: VNode[] = [];
      for (const node of nodes) {
        // Fragment 节点：Vue 将 v-for 列表、多根节点等包装为 Fragment
        if (node.type === Fragment) {
          if (isArray(node.children)) {
            result.push(...flattenSlotNodes(node.children as VNode[]));
          }
        } else if ((node.type as Component)?.name === 'TSubmenu' || (node.type as Component)?.name === 'TMenuItem') {
          result.push(node);
        } else if (isArray(node.children)) {
          result.push(...flattenSlotNodes(node.children as VNode[]));
        } else if (isFunction((node.children as any)?.default)) {
          result.push(...flattenSlotNodes((node.children as any).default()));
        } else {
          result.push(node);
        }
      }
      return result;
    };

    const initVMenu = (slots: VNode[], parentValue?: string) => {
      slots.forEach((node) => {
        // Fragment 节点（v-for 等）：展开后递归处理
        if (node.type === Fragment) {
          if (isArray(node.children)) {
            initVMenu(node.children as VNode[], parentValue);
          }
          return;
        }
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

    let pendingResizeRAF: number | null = null;
    let prevSlotKey = '';

    onUpdated(() => {
      applyFoldState();
    });

    const scheduleResize = () => {
      if (pendingResizeRAF != null) return;
      pendingResizeRAF = requestAnimationFrame(() => {
        pendingResizeRAF = null;
        handleResize();
      });
    };

    onMounted(() => {
      nextTick(() => handleResize());
    });

    onBeforeUnmount(() => {
      if (pendingResizeRAF != null) {
        cancelAnimationFrame(pendingResizeRAF);
        pendingResizeRAF = null;
      }
    });

    return () => {
      const logo = props.logo?.(h) || ctx.slots.logo?.();
      const operations = props.operations?.(h) || ctx.slots.operations?.() || ctx.slots.options?.();
      const originalContent = ctx.slots.default?.() || ctx.slots.content?.() || [];

      // 扁平化 slot VNode，获取所有菜单项（解决封装组件场景）
      const flatItems = flattenSlotNodes(originalContent);

      // 判断是否需要折叠（只看 DOM 层面的折叠索引）
      const isFolded = foldStartIndex.value >= 0;

      // 判断是否可以在 VNode 层面按索引截取
      // 如果 flatItems 中都是实际的 TMenuItem/TSubmenu VNode，可以直接 slice
      // 如果是封装组件（如 MenuContent），flatItems.length 可能小于 foldStartIndex，
      // 此时需要渲染完整内容并在 DOM 层面隐藏前 N 项
      const canSliceVNodes = isFolded && foldStartIndex.value < flatItems.length;

      // 内容始终完整渲染（通过 DOM display:none 控制可见性），
      // 保证 DOM 子元素数量稳定，handleResize 的索引对应关系始终正确
      const content = originalContent;

      const slotKey = flatItems.map((n) => n.props?.value).join(',');
      if (slotKey !== prevSlotKey) {
        prevSlotKey = slotKey;
        cachedFlatItemValues = flatItems.map((n) => n.props?.value);
        vMenu.data.children = [];
        vMenu.cache.clear();
        initVMenu(flatItems);
        scheduleResize();
      }

      // 构建"更多"弹窗的 slot 内容
      const buildPopupSlot = () => {
        if (!isFolded) return [];
        // 重新调用 slot 函数生成全新的 VNode 实例，避免与 ul 中 mount 的同一 VNode
        // 共享 component instance，导致 Vue patch DOM 错乱
        const freshContent = ctx.slots.default?.() || ctx.slots.content?.() || [];
        const freshFlatItems = flattenSlotNodes(freshContent);
        if (canSliceVNodes && foldStartIndex.value < freshFlatItems.length) {
          // 直接菜单项场景：按索引截取
          return freshFlatItems.slice(foldStartIndex.value);
        }
        // 封装组件场景：渲染完整内容，通过 PopupOverflowContent 在 DOM 层面隐藏前 N 项
        return <PopupOverflowContent foldIndex={foldStartIndex.value}>{freshContent}</PopupOverflowContent>;
      };

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
                  class={`${classPrefix.value}-head-menu__submenu--more`}
                  value={MORE_SUBMENU_VALUE}
                  expandType="popup"
                  title={() => <EllipsisIcon />}
                  style={{ display: isFolded ? '' : 'none' }}
                  v-slots={{
                    default: buildPopupSlot,
                  }}
                />
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
