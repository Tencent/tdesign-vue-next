import { defineComponent, PropType, computed, h, shallowRef } from 'vue';

import Item from './Item';
import { TreeNode, CascaderContextType } from '../types';
import CascaderProps from '../props';
import { TreeOptionData } from '../types';
import { useConfig, usePrefixClass, useTNodeDefault, useTNodeJSX } from '@tdesign/shared-hooks';

import { getDefaultNode } from '@tdesign/shared-utils';
import { getPanels, expandClickEffect, valueChangeEffect } from '../utils';

/**
 * Constant indicating filter is inactive (no level restriction).
 * When maxLevel equals this value, all panels are shown normally.
 */
const FILTER_INACTIVE_LEVEL = -1;

interface FilterState {
  filters: Record<number, string | ((node: TreeOptionData, panelIndex: number) => boolean)>;
  cascade: boolean;
  /** Maximum visible panel level. FILTER_INACTIVE_LEVEL (-1) means no restriction. */
  maxLevel: number;
}

/**
 * Check if the filter level is active (has level restriction).
 * @param level - The maxLevel value from FilterState
 * @returns true if filter is actively restricting panel visibility
 */
function isFilterLevelActive(level: number): boolean {
  return level !== FILTER_INACTIVE_LEVEL;
}

/** Filter value type: string keyword or custom filter function */
type FilterValue = string | ((node: TreeOptionData, panelIndex: number) => boolean);

/**
 * Check if option label contains the search keyword.
 * @param option - The tree node to check
 * @param keyword - The search keyword (lowercase)
 * @returns true if the option label contains the keyword
 */
function checkOptionMatchKeyword(option: TreeNode, keyword: string): boolean {
  // Empty labels should not match any keyword (including empty keyword)
  if (!option.label) return false;
  // Empty keyword should not match (caller should handle this case)
  if (!keyword) return false;
  return option.label.toLowerCase().includes(keyword);
}
/**
 * Check if filter value is active (non-empty string or defined function).
 * @param filter - The filter value to check
 * @returns true if filter is active
 */
function isFilterActive(filter: FilterValue | undefined): boolean {
  if (filter === undefined) return false;
  if (typeof filter === 'string') return Boolean(filter.trim());
  return true;
}

/**
 * Filter options by the given filter value.
 * When filter is a string, performs case-insensitive substring matching on option labels.
 * For case-sensitive or custom matching logic, pass a custom filter function.
 * @param nodes - The tree nodes to filter
 * @param filter - Filter keyword (case-insensitive) or custom filter function
 * @param panelIndex - Current panel index (for custom filter function)
 * @returns Filtered array of tree nodes
 */
function filterOptions(nodes: TreeNode[], filter: FilterValue, panelIndex: number): TreeNode[] {
  if (typeof filter === 'string') {
    // Case-insensitive matching: convert both keyword and label to lowercase
    const keyword = filter.trim().toLowerCase();
    if (!keyword) return nodes;
    return nodes.filter((node) => checkOptionMatchKeyword(node, keyword));
  }
  // Custom filter function for case-sensitive or custom matching logic
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

    // 过滤状态 - 惰性初始化，不使用时为 null，无性能开销
    const filterState = shallowRef<FilterState | null>(null);

    // 计算属性：是否有激活的过滤状态
    const hasActiveFilter = computed(() => {
      const state = filterState.value;
      return state && (Object.keys(state.filters).length > 0 || state.cascade);
    });

    // Get filtered nodes - apply search keyword or filter function
    const getFilteredNodes = (nodes: TreeNode[], index: number): TreeNode[] => {
      const state = filterState.value;
      if (!state) return nodes;

      const filter = state.filters[index];
      if (!filter) return nodes;

      return filterOptions(nodes, filter, index);
    };

    /**
     * Check if any filter in the filters record is active.
     */
    const hasAnyActiveFilter = (filters: Record<number, FilterValue>): boolean => {
      return Object.values(filters).some((f) => isFilterActive(f));
    };

    /**
     * Clear expired filters beyond the specified maxLevel.
     * @param filters - Current filters record
     * @param maxLevel - Maximum level to keep
     * @returns New filters record with expired entries removed
     */
    const clearExpiredFilters = (
      filters: Record<number, FilterValue>,
      maxLevel: number,
    ): Record<number, FilterValue> => {
      return Object.fromEntries(Object.entries(filters).filter(([panelIndex]) => Number(panelIndex) <= maxLevel));
    };

    /**
     * Calculate maxLevel for cascade mode based on filter matches.
     * @param panelIndex - Current panel index being filtered
     * @param filteredNodes - Nodes after filter applied
     * @param currentMaxLevel - Current maxLevel value
     * @returns Updated maxLevel value
     *
     * Behavior:
     * - If no matches: restrict to current panel only (hide child panels)
     * - If has matches: restrict to current panel initially, but user can expand
     *   child panels by clicking/hovering on nodes (handled by handleExpand)
     */
    const calculateCascadeMaxLevel = (
      panelIndex: number,
      filteredNodes: TreeNode[],
      currentMaxLevel: number,
    ): number => {
      const hasMatches = filteredNodes.length > 0;

      if (!hasMatches) {
        // No matches: close child panels
        return panelIndex;
      }

      // Has matches: show current panel, user can expand child panels via click/hover.
      // We return panelIndex to initially restrict to current level,
      // allowing handleExpand to expand maxLevel when user interacts with nodes.
      // If currentMaxLevel is already higher (user has expanded), keep it.
      return Math.max(panelIndex, currentMaxLevel);
    };

    /**
     * Handle filter change for a panel.
     * Triggers: User input in popupHeader search, or custom filter function call.
     * Side effects: Updates filterState which affects panel visibility and displayed options.
     */
    const handleFilter = (index: number, filter: FilterValue, options?: { cascade?: boolean }) => {
      const prev = filterState.value;
      const cascade = options?.cascade ?? prev?.cascade ?? false;

      // Build new filters object, removing inactive filters to prevent memory accumulation.
      // When users filter and clear many panels over time, we don't want to keep
      // inactive filter entries (empty strings, whitespace-only strings) in memory.
      let filters: Record<number, FilterValue> = { ...prev?.filters };
      if (isFilterActive(filter)) {
        filters[index] = filter;
      } else {
        delete filters[index];
      }

      let maxLevel = prev?.maxLevel ?? FILTER_INACTIVE_LEVEL;

      if (cascade) {
        if (isFilterActive(filter)) {
          // Active filter: calculate maxLevel based on matches
          // Note: Use filterOptions directly with the new filter value, not getFilteredNodes,
          // because filterState hasn't been updated yet at this point.
          const currentNodes = panels.value[index] || [];
          const filteredNodes = filterOptions(currentNodes, filter, index);
          maxLevel = calculateCascadeMaxLevel(index, filteredNodes, maxLevel);
        } else if (!hasAnyActiveFilter(filters)) {
          // All filters cleared: restore to show all panels
          maxLevel = FILTER_INACTIVE_LEVEL;
        }
        // Note: No else branch needed. When filter is inactive but other filters remain active,
        // we keep maxLevel unchanged. The remaining filters will control panel visibility.
      }

      // Clean up expired filters when maxLevel decreases.
      // When prev is null (first filter application), prev?.maxLevel defaults to FILTER_INACTIVE_LEVEL (-1).
      // Since any valid active maxLevel (>=0) is greater than -1, the condition is false,
      // which is correct because there are no expired filters to clean on first activation.
      // This cleanup only triggers when transitioning from a higher maxLevel to a lower one.
      if (maxLevel < (prev?.maxLevel ?? FILTER_INACTIVE_LEVEL)) {
        filters = clearExpiredFilters(filters, maxLevel);
      }

      filterState.value = { filters, cascade, maxLevel };
    };

    // Check if panel should be displayed
    const shouldShowPanel = (index: number): boolean => {
      const state = filterState.value;
      if (!hasActiveFilter.value || !state?.cascade || !isFilterLevelActive(state.maxLevel)) {
        return true;
      }
      // Only show panels within maxLevel range
      return index <= state.maxLevel;
    };

    /**
     * Handle node expand event.
     * Triggers: User clicks or hovers on a node.
     * Side effects: In cascade mode, may update maxLevel and clean expired filters.
     */
    const handleExpand = (node: TreeNode, trigger: 'hover' | 'click', level: number) => {
      const state = filterState.value;

      // In cascade mode, update maxLevel to show child panels
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
          // Clean expired filter data beyond new maxLevel
          const cleanedFilters = clearExpiredFilters(state.filters, childLevel);
          filterState.value = { ...state, filters: cleanedFilters, maxLevel: childLevel };
        }
      }

      expandClickEffect(props.trigger, trigger, node, props.cascaderContext);
    };

    /**
     * Stable callback factory for slot's onFilter prop.
     * Returns a memoized function that accepts (filter, opts) and delegates to handleFilter.
     * This avoids creating new function references on every render, preventing unnecessary
     * re-renders of slot content (which may be complex user components).
     */
    const onFilterCallbacks = new Map<number, (filter: FilterValue, opts?: { cascade?: boolean }) => void>();
    const getOnFilterCallback = (index: number) => {
      let callback = onFilterCallbacks.get(index);
      if (!callback) {
        callback = (filter: FilterValue, opts?: { cascade?: boolean }) => handleFilter(index, filter, opts);
        onFilterCallbacks.set(index, callback);
      }
      return callback;
    };

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
      // Convert TreeNode[] to CascaderOption[] (TreeOptionData[]) for slot params
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

    /**
     * Render filtered list for built-in filterable mode (inputVal present).
     * When the built-in filterable prop is active, the component renders a flattened
     * list of all matching nodes. In this mode, popupHeader/popupFooter slots are NOT
     * rendered because:
     * 1. panelIndex has no meaning in a flattened list
     * 2. The onFilter callback would conflict with the built-in filter
     * 3. Having two filtering mechanisms active simultaneously causes confusing behavior
     */
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
      // When built-in filterable is active, render a flattened filtered list
      // without popupHeader/popupFooter slots to avoid conflicting filter mechanisms
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
