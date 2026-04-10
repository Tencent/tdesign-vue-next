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
  cloneVNode,
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

    // 记录从第几个 DOM 子元素开始折叠（-1 表示不折叠）
    const foldStartIndex = ref(-1);
    // 缓存每个菜单项的完整宽度（包含 margin），即使被 display:none 也能使用缓存值
    const cachedItemWidths: number[] = [];

    /**
     * 获取 menuRef 下所有菜单项 DOM 元素（<li> 级别）。
     *
     * 关键：用户可能通过封装组件（如 MenuContent）来渲染菜单项，
     * 此时 DOM 结构为 <ul> → <div>(封装组件根元素) → <li>...</li>
     * 所以不能只取 menuRef 的直接子元素，需要收集所有 <li> 菜单项。
     *
     * 策略：遍历 menuRef 的直接子元素：
     * - 如果是菜单项（有 t-menu__item 或 t-submenu 类名），直接收集
     * - 如果是封装容器（如 <div>），递归收集其内部的菜单项子元素
     * - 过滤掉"更多"按钮自身
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

    /**
     * 获取 menuRef 直接子元素中 "非菜单项" 的容器元素（封装组件的根 DOM）。
     * 例如 MenuContent 组件渲染出的 <div>，这些容器包裹着实际的菜单项 <li>。
     * 需要给这些容器设置 display:contents，使其不产生自身盒子，
     * 让内部的菜单项 <li> 直接参与父级 <ul> 的 flex 布局。
     */
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

    /**
     * 核心：基于 DOM 的溢出计算。
     *
     * 只做计算，不直接修改 DOM style（避免和 Vue re-render 冲突）。
     * 计算结果更新 foldStartIndex ref，由 applyFoldState 统一应用。
     */
    const handleResize = () => {
      if (props.expandType !== 'popup') return;
      if (!menuRef.value) return;

      // 先处理封装容器：临时设 display:contents 使其不产生盒子，测量完后恢复
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
        // 没有菜单项时，不需要折叠，确保"更多"按钮被隐藏
        foldStartIndex.value = -1;
        applyFoldState();
        return;
      }

      // ========== Phase 1: 恢复所有项可见，测量真实自然宽度 ==========
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

      // 恢复测量前的状态（不改变实际样式，后续由 applyFoldState 统一设置）
      itemNodes.forEach((el, index) => {
        el.style.flexShrink = savedFlexShrinks[index];
        el.style.display = savedDisplays[index];
      });
      if (moreEl) moreEl.style.display = savedDisplays.length > 0 ? '' : 'none';

      // 恢复封装容器的 display 为 contents（保持透明）
      wrappers.forEach((el) => {
        el.style.display = 'contents';
      });

      // ========== Phase 2: 计算截断点 ==========
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

      // ========== Phase 3: 更新 ref，触发 applyFoldState ==========
      foldStartIndex.value = newFoldIndex;
      // 立即应用（因为 handleResize 在 DOM 更新后调用，不需要等 nextTick）
      applyFoldState();
    };

    /**
     * 根据 foldStartIndex 将折叠状态应用到 DOM 上。
     * 和 Vue render 分离——render 负责 VNode 结构，这里负责动态 display 控制。
     */
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
    };

    useResizeObserver(innerRef, handleResize);

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
          // 其他包装节点（如原生 HTML 元素 <div>），children 是 VNode 数组
          result.push(...flattenSlotNodes(node.children as VNode[]));
        } else if (isFunction((node.children as any)?.default)) {
          // 组件有 default slot（如 <Wrapper><t-menu-item/></Wrapper>）
          result.push(...flattenSlotNodes((node.children as any).default()));
        } else {
          // 未知节点（包括封装组件如 MenuContent），直接保留
          // 注意：不穿透 subTree，因为从 subTree 取出的 VNode 引用不稳定，
          // 会在 re-render 时导致弹窗内容消失
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

    // 使用 MutationObserver 监听 menuRef 子节点变化后重新计算
    // 需要防循环：handleResize 修改 foldStartIndex → re-render → DOM 变化 → MutationObserver → handleResize
    let mutationObserver: MutationObserver | null = null;
    let isResizing = false;
    let resizeRAF: number | null = null;

    const safeHandleResize = () => {
      if (isResizing) return;
      // 先同步恢复 fold DOM 状态，防止 Vue re-render 覆盖导致闪烁
      applyFoldState();
      // 再异步重新计算是否需要调整 foldIndex
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(() => {
        isResizing = true;
        handleResize();
        // 延迟重置标记，确保本轮 DOM 更新引起的 mutation 不会再触发
        requestAnimationFrame(() => {
          isResizing = false;
        });
      });
    };

    watch(menuRef, (el, _oldEl) => {
      if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }
      if (el) {
        mutationObserver = new MutationObserver(() => {
          safeHandleResize();
        });
        mutationObserver.observe(el, { childList: true, subtree: true });
        // 初始计算一次
        nextTick(() => handleResize());
      }
    });

    onBeforeUnmount(() => {
      if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }
      if (resizeRAF) {
        cancelAnimationFrame(resizeRAF);
        resizeRAF = null;
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

      vMenu.data.children = [];
      vMenu.cache.clear();
      initVMenu(flatItems);

      // 构建"更多"弹窗的 slot 内容
      const buildPopupSlot = () => {
        if (!isFolded) return [];
        if (canSliceVNodes) {
          // 直接菜单项场景：按索引截取并克隆
          return flatItems.slice(foldStartIndex.value).map((vnode) => cloneVNode(vnode));
        }
        // 封装组件场景：渲染完整内容的克隆，通过 PopupOverflowContent 在 DOM 层面隐藏前 N 项
        return (
          <PopupOverflowContent foldIndex={foldStartIndex.value}>
            {originalContent.map((vnode) => cloneVNode(vnode))}
          </PopupOverflowContent>
        );
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
