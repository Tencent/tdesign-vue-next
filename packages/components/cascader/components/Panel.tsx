import { defineComponent, PropType, computed, h, shallowRef, onUnmounted } from 'vue';

import Item from './Item';
import { TreeNode, CascaderContextType } from '../types';
import CascaderProps from '../props';
import { TreeOptionData } from '../types';
import { useConfig, usePrefixClass, useTNodeDefault, useTNodeJSX } from '@tdesign/shared-hooks';

import { getDefaultNode } from '@tdesign/shared-utils';
import { getPanels, expandClickEffect, valueChangeEffect } from '../utils';

/** 过滤未激活标记，maxLevel 为此值时显示所有面板 */
const FILTER_INACTIVE_LEVEL = -1;

interface FilterState {
  filters: Record<number, string | ((node: TreeOptionData, panelIndex: number) => boolean)>;
  cascade: boolean;
  /** 最大可见面板层级，FILTER_INACTIVE_LEVEL 表示无限制 */
  maxLevel: number;
}

function isFilterLevelActive(level: number): boolean {
  return level !== FILTER_INACTIVE_LEVEL;
}

type FilterValue = string | ((node: TreeOptionData, panelIndex: number) => boolean);

/** 检查选项是否匹配关键词（大小写不敏感） */
function checkOptionMatchKeyword(option: TreeNode, keyword: string): boolean {
  if (!option.label || !keyword) return false;
  return option.label.toLowerCase().includes(keyword);
}

/** 检查过滤值是否激活 */
function isFilterActive(filter: FilterValue | undefined): boolean {
  if (filter === undefined) return false;
  if (typeof filter === 'string') return Boolean(filter.trim());
  return true;
}

/** 过滤选项列表 */
function filterOptions(nodes: TreeNode[], filter: FilterValue, panelIndex: number): TreeNode[] {
  if (typeof filter === 'string') {
    const keyword = filter.trim().toLowerCase();
    if (!keyword) return nodes;
    return nodes.filter((node) => checkOptionMatchKeyword(node, keyword));
  }
  return nodes.filter((node) => filter(node.data, panelIndex));
}

export default defineComponent({
  name: 'TCascaderSubPanel',
  props: {
    option: CascaderProps.option,
    options: CascaderProps.options,
    empty: CascaderProps.empty,
    trigger: CascaderProps.trigger,
    onChange: CascaderProps.onChange,
    loading: CascaderProps.loading,
    loadingText: CascaderProps.loadingText,
    cascaderContext: {
      type: Object as PropType<CascaderContextType>,
    },
  },
  setup(props) {
    const renderTNodeJSXDefault = useTNodeDefault();
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('cascader');
    const { globalConfig } = useConfig('cascader');

    const panels = computed(() => getPanels(props.cascaderContext.treeNodes));

    // 过滤状态，惰性初始化
    const filterState = shallowRef<FilterState | null>(null);

    const hasActiveFilter = computed(() => {
      const state = filterState.value;
      return state && (Object.keys(state.filters).length > 0 || state.cascade);
    });

    const getFilteredNodes = (nodes: TreeNode[], index: number): TreeNode[] => {
      const state = filterState.value;
      if (!state) return nodes;
      const filter = state.filters[index];
      if (!filter) return nodes;
      return filterOptions(nodes, filter, index);
    };

    const hasAnyActiveFilter = (filters: Record<number, FilterValue>): boolean => {
      return Object.values(filters).some((f) => isFilterActive(f));
    };

    /** 清理超出 maxLevel 的过期过滤器 */
    const clearExpiredFilters = (
      filters: Record<number, FilterValue>,
      maxLevel: number,
    ): Record<number, FilterValue> => {
      return Object.fromEntries(Object.entries(filters).filter(([panelIndex]) => Number(panelIndex) <= maxLevel));
    };

    /** 计算级联模式下的 maxLevel */
    const calculateCascadeMaxLevel = (
      panelIndex: number,
      filteredNodes: TreeNode[],
      currentMaxLevel: number,
    ): number => {
      if (filteredNodes.length === 0) {
        return panelIndex;
      }
      return Math.max(panelIndex, currentMaxLevel);
    };

    /** 处理面板过滤变化 */
    const handleFilter = (index: number, filter: FilterValue, options?: { cascade?: boolean }) => {
      const prev = filterState.value;
      const cascade = options?.cascade ?? prev?.cascade ?? false;

      // 构建新的过滤器对象，移除未激活的过滤器
      let filters: Record<number, FilterValue> = { ...prev?.filters };
      if (isFilterActive(filter)) {
        filters[index] = filter;
      } else {
        delete filters[index];
      }

      let maxLevel = prev?.maxLevel ?? FILTER_INACTIVE_LEVEL;

      if (cascade) {
        if (isFilterActive(filter)) {
          const currentNodes = panels.value[index] || [];
          const filteredNodes = filterOptions(currentNodes, filter, index);
          maxLevel = calculateCascadeMaxLevel(index, filteredNodes, maxLevel);
        } else if (!hasAnyActiveFilter(filters)) {
          maxLevel = FILTER_INACTIVE_LEVEL;
        }
      }

      // maxLevel 减小时清理过期过滤器
      if (maxLevel < (prev?.maxLevel ?? FILTER_INACTIVE_LEVEL)) {
        filters = clearExpiredFilters(filters, maxLevel);
      }

      filterState.value = { filters, cascade, maxLevel };
    };

    const shouldShowPanel = (index: number): boolean => {
      const state = filterState.value;
      if (!hasActiveFilter.value || !state?.cascade || !isFilterLevelActive(state.maxLevel)) {
        return true;
      }
      return index <= state.maxLevel;
    };

    /** 处理节点展开事件 */
    const handleExpand = (node: TreeNode, trigger: 'hover' | 'click', level: number) => {
      const state = filterState.value;

      // 级联模式下更新 maxLevel 以显示子面板
      const { children } = node;
      if (
        state?.cascade &&
        isFilterLevelActive(state.maxLevel) &&
        props.trigger === trigger &&
        Array.isArray(children) &&
        children.length
      ) {
        const childLevel = level + 1;
        if (childLevel > state.maxLevel) {
          const cleanedFilters = clearExpiredFilters(state.filters, childLevel);
          filterState.value = { ...state, filters: cleanedFilters, maxLevel: childLevel };
        }
      }

      expandClickEffect(props.trigger, trigger, node, props.cascaderContext);
    };

    // 稳定的回调缓存，避免每次渲染创建新函数引用
    const onFilterCallbacks = new Map<number, (filter: FilterValue, opts?: { cascade?: boolean }) => void>();
    const getOnFilterCallback = (index: number) => {
      let callback = onFilterCallbacks.get(index);
      if (!callback) {
        callback = (filter: FilterValue, opts?: { cascade?: boolean }) => handleFilter(index, filter, opts);
        onFilterCallbacks.set(index, callback);
      }
      return callback;
    };

    onUnmounted(() => {
      onFilterCallbacks.clear();
    });

    const renderItem = (node: TreeNode, index: number) => {
      const optionChild = node.data.content
        ? getDefaultNode(node.data.content(h))
        : renderTNodeJSXDefault('option', {
            params: {
              item: node.data,
              index,
              onExpand: () => handleExpand(node, 'click', index),
              onChange: () => valueChangeEffect(node, props.cascaderContext),
            },
          });
      return (
        <Item
          key={node.value}
          node={node}
          optionChild={optionChild}
          cascaderContext={props.cascaderContext}
          onClick={() => handleExpand(node, 'click', index)}
          onMouseenter={() => handleExpand(node, 'hover', index)}
          onChange={() => valueChangeEffect(node, props.cascaderContext)}
        />
      );
    };

    const renderList = (treeNodes: TreeNode[], isFilter = false, segment = true, index = 0) => {
      const displayNodes = hasActiveFilter.value ? getFilteredNodes(treeNodes, index) : treeNodes;
      const filteredOptionsData = displayNodes.map((node) => node.data);
      const originalOptionsData = treeNodes.map((node) => node.data);

      return (
        <ul
          class={[
            `${COMPONENT_NAME.value}__menu`,
            'narrow-scrollbar',
            {
              [`${COMPONENT_NAME.value}__menu--segment`]: segment,
              [`${COMPONENT_NAME.value}__menu--filter`]: isFilter,
            },
          ]}
          key={`${COMPONENT_NAME}__menu${index}`}
        >
          {renderTNodeJSX('popupHeader', {
            params: {
              panelIndex: index,
              options: originalOptionsData,
              filteredOptions: filteredOptionsData,
              onFilter: getOnFilterCallback(index),
            },
          })}
          {displayNodes.map((node: TreeNode) => renderItem(node, index))}
          {renderTNodeJSX('popupFooter', {
            params: {
              panelIndex: index,
              options: originalOptionsData,
              filteredOptions: filteredOptionsData,
              onFilter: getOnFilterCallback(index),
            },
          })}
        </ul>
      );
    };

    /** 渲染内置过滤模式下的扁平列表（不含 popupHeader/popupFooter） */
    const renderFilteredList = (treeNodes: TreeNode[]) => {
      return (
        <ul
          class={[`${COMPONENT_NAME.value}__menu`, 'narrow-scrollbar', `${COMPONENT_NAME.value}__menu--filter`]}
          key={`${COMPONENT_NAME}__menu--filtered`}
        >
          {treeNodes.map((node: TreeNode) => renderItem(node, 0))}
        </ul>
      );
    };

    const renderPanels = () => {
      const { inputVal, treeNodes } = props.cascaderContext;
      // 内置过滤激活时渲染扁平列表，不含 popupHeader/popupFooter 以避免冲突
      if (inputVal) return renderFilteredList(treeNodes);

      const result = [];
      const len = panels.value.length;
      for (let i = 0; i < len; i++) {
        if (shouldShowPanel(i)) {
          result.push(renderList(panels.value[i], false, i !== len - 1, i));
        }
      }
      return result;
    };

    return () => {
      let content;
      if (props.loading) {
        content = renderTNodeJSXDefault(
          'loadingText',
          <div class={`${COMPONENT_NAME.value}__panel--empty`}>{globalConfig.value.loadingText}</div>,
        );
      } else {
        content = panels.value.length
          ? renderPanels()
          : renderTNodeJSXDefault(
              'empty',
              <div class={`${COMPONENT_NAME.value}__panel--empty`}>{globalConfig.value.empty}</div>,
            );
      }
      return (
        <div
          class={[
            `${COMPONENT_NAME.value}__panel`,
            { [`${COMPONENT_NAME.value}--normal`]: panels.value.length && !props.loading },
          ]}
        >
          {content}
        </div>
      );
    };
  },
});
