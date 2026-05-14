import { defineComponent, PropType, computed, h, shallowRef, onUnmounted, watch } from 'vue';

import Item from './Item';
import { TreeNode, CascaderContextType, CascaderOption } from '../types';
import CascaderProps from '../props';
import { useConfig, usePrefixClass, useTNodeDefault, useTNodeJSX } from '@tdesign/shared-hooks';

import { getDefaultNode } from '@tdesign/shared-utils';
import { getPanels, expandClickEffect, valueChangeEffect } from '../utils';

const FILTER_INACTIVE_LEVEL = -1;

interface FilterState {
  filters: Record<number, string | ((node: CascaderOption, panelIndex: number) => boolean)>;
  maxLevel: number;
}

function isFilterLevelActive(level: number): boolean {
  return level !== FILTER_INACTIVE_LEVEL;
}

type FilterValue = string | ((node: CascaderOption, panelIndex: number) => boolean);

function checkOptionMatchKeyword(option: TreeNode, keyword: string): boolean {
  if (!option.label || !keyword) return false;
  return option.label.toLowerCase().includes(keyword);
}

function isFilterActive(filter: FilterValue | undefined): boolean {
  if (filter === undefined) return false;
  if (typeof filter === 'string') return Boolean(filter.trim());
  return true;
}

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

    // shallowRef：状态更新通过整体替换触发响应式
    const filterState = shallowRef<FilterState | null>(null);

    const hasActiveFilter = computed(() => {
      const state = filterState.value;
      return state && hasAnyActiveFilter(state.filters);
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

    const clearExpiredFilters = (
      filters: Record<number, FilterValue>,
      maxLevel: number,
    ): Record<number, FilterValue> => {
      return Object.fromEntries(Object.entries(filters).filter(([panelIndex]) => Number(panelIndex) <= maxLevel));
    };

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

    const handleFilter = (index: number, filter: FilterValue) => {
      const prev = filterState.value;

      let filters: Record<number, FilterValue> = { ...prev?.filters };
      if (isFilterActive(filter)) {
        filters[index] = filter;
      } else {
        delete filters[index];
      }

      let maxLevel = prev?.maxLevel ?? FILTER_INACTIVE_LEVEL;

      if (isFilterActive(filter)) {
        const currentNodes = panels.value[index] || [];
        const filteredNodes = filterOptions(currentNodes, filter, index);
        maxLevel = calculateCascadeMaxLevel(index, filteredNodes, maxLevel);
      } else if (!hasAnyActiveFilter(filters)) {
        maxLevel = FILTER_INACTIVE_LEVEL;
      }

      if (maxLevel < (prev?.maxLevel ?? FILTER_INACTIVE_LEVEL)) {
        filters = clearExpiredFilters(filters, maxLevel);
      }

      filterState.value = { filters, maxLevel };
    };

    const shouldShowPanel = (index: number): boolean => {
      const state = filterState.value;
      if (!hasActiveFilter.value || !state || !isFilterLevelActive(state.maxLevel)) {
        return true;
      }
      return index <= state.maxLevel;
    };

    const handleExpand = (node: TreeNode, trigger: 'hover' | 'click', level: number) => {
      const state = filterState.value;

      const { children } = node;
      if (
        state &&
        isFilterLevelActive(state.maxLevel) &&
        props.trigger === trigger &&
        Array.isArray(children) &&
        children.length
      ) {
        const childLevel = level + 1;
        if (childLevel > state.maxLevel) {
          const cleanedFilters = clearExpiredFilters(state.filters, childLevel);
          filterState.value = { filters: cleanedFilters, maxLevel: childLevel };
        }
      }

      expandClickEffect(props.trigger, trigger, node, props.cascaderContext);
    };

    const onFilterCallbacks = new Map<number, (filter: FilterValue) => void>();
    const getOnFilterCallback = (index: number) => {
      let callback = onFilterCallbacks.get(index);
      if (!callback) {
        callback = (filter: FilterValue) => handleFilter(index, filter);
        onFilterCallbacks.set(index, callback);
      }
      return callback;
    };

    watch(
      panels,
      (newPanels) => {
        const maxIndex = newPanels.length - 1;
        for (const [index] of onFilterCallbacks) {
          if (index > maxIndex) {
            onFilterCallbacks.delete(index);
          }
        }
      },
      { flush: 'post' },
    );

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

    const renderList = (treeNodes: TreeNode[], segment = true, index = 0) => {
      const displayNodes = hasActiveFilter.value ? getFilteredNodes(treeNodes, index) : treeNodes;

      const columnParams = {
        panelIndex: index,
        options: treeNodes.map((node) => node.data),
        filteredOptions: displayNodes.map((node) => node.data),
      };

      return (
        <ul
          class={[
            `${COMPONENT_NAME.value}__menu`,
            'narrow-scrollbar',
            {
              [`${COMPONENT_NAME.value}__menu--segment`]: segment,
            },
          ]}
          key={`${COMPONENT_NAME}__menu${index}`}
        >
          {renderTNodeJSX('columnHeader', { params: { ...columnParams, onFilter: getOnFilterCallback(index) } })}
          {displayNodes.map((node: TreeNode) => renderItem(node, index))}
          {renderTNodeJSX('columnFooter', { params: { ...columnParams, onFilter: getOnFilterCallback(index) } })}
        </ul>
      );
    };

    const noop: (filter: FilterValue) => void = () => {};

    const renderFilteredList = (treeNodes: TreeNode[]) => {
      const columnParams = {
        panelIndex: 0,
        options: treeNodes.map((node) => node.data),
        filteredOptions: treeNodes.map((node) => node.data),
        onFilter: noop,
      };

      return (
        <ul
          class={[`${COMPONENT_NAME.value}__menu`, 'narrow-scrollbar', `${COMPONENT_NAME.value}__menu--filter`]}
          key={`${COMPONENT_NAME}__menu--filtered`}
        >
          {renderTNodeJSX('columnHeader', { params: columnParams })}
          {treeNodes.map((node: TreeNode) => renderItem(node, 0))}
          {renderTNodeJSX('columnFooter', { params: columnParams })}
        </ul>
      );
    };

    const renderPanels = () => {
      const { inputVal, treeNodes } = props.cascaderContext;
      if (inputVal) return renderFilteredList(treeNodes);

      const result = [];
      const len = panels.value.length;
      for (let i = 0; i < len; i++) {
        if (shouldShowPanel(i)) {
          result.push(renderList(panels.value[i], i !== len - 1, i));
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
