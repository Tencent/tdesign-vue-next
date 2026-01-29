import { defineComponent, PropType, computed, h, shallowRef } from 'vue';

import Item from './Item';
import { TreeNode, CascaderContextType } from '../types';
import CascaderProps from '../props';
import { TreeOptionData } from '../types';
import { useConfig, usePrefixClass, useTNodeDefault, useTNodeJSX } from '@tdesign/shared-hooks';

import { getDefaultNode } from '@tdesign/shared-utils';
import { getPanels, expandClickEffect, valueChangeEffect } from '../utils';

interface FilterState {
  filters: Record<number, string | ((node: TreeOptionData, panelIndex: number) => boolean)>;
  cascade: boolean;
  maxLevel: number;
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

    // 获取过滤后的节点 - 直接应用搜索词或过滤函数，确保父级变化后子级搜索仍生效
    const getFilteredNodes = (nodes: TreeNode[], index: number): TreeNode[] => {
      const state = filterState.value;
      if (!state) return nodes;

      // 应用当前层级的搜索词或过滤函数
      const filter = state.filters[index];
      if (!filter) return nodes;

      if (typeof filter === 'string') {
        const keyword = filter.trim().toLowerCase();
        if (!keyword) return nodes;
        return nodes.filter((n) => n.label?.toLowerCase().includes(keyword));
      } else {
        // 函数类型的过滤
        return nodes.filter((n) => filter(n.data, index));
      }
    };

    // 处理过滤
    const handleFilter = (
      index: number,
      filter: string | ((node: TreeOptionData, panelIndex: number) => boolean),
      options?: { cascade?: boolean },
    ) => {
      const prev = filterState.value;
      const cascade = options?.cascade ?? prev?.cascade ?? false;
      let filters = { ...prev?.filters, [index]: filter };

      let maxLevel = prev?.maxLevel ?? -1;
      if (cascade) {
        // 有搜索词时检查是否有匹配项，无匹配时才关闭子面板
        if (typeof filter === 'string' ? filter?.trim() : filter !== undefined) {
          // 检查当前面板是否有匹配项
          const currentNodes = panels.value[index] || [];
          const hasMatches = getFilteredNodes(currentNodes, index).length > 0;

          if (hasMatches) {
            // 有匹配项时，检查第一个面板是否有选中的项
            if (index === 0) {
              const filteredNodes = getFilteredNodes(currentNodes, index);
              const hasSelectedInFiltered = filteredNodes.some((node) => node.checked);

              // 如果第一个面板的搜索结果中没有选中的项，则隐藏子级面板
              if (!hasSelectedInFiltered) {
                maxLevel = index;
              }
            }
            // 有匹配时保持当前maxLevel，允许展开子面板
          } else {
            // 无匹配时关闭子面板
            maxLevel = index;
          }
        } else if (!Object.values(filters).some((f) => (typeof f === 'string' ? f?.trim() : f !== undefined))) {
          // 所有搜索词都清空时，恢复显示所有面板
          maxLevel = -1;
        } else {
          // 部分搜索词清空时，重新检查剩余搜索词是否有匹配
          const hasActiveFilters = Object.values(filters).some((f) =>
            typeof f === 'string' ? f?.trim() : f !== undefined,
          );
          if (hasActiveFilters) {
            // 检查当前面板是否有匹配项
            const currentNodes = panels.value[index] || [];
            const hasMatches = getFilteredNodes(currentNodes, index).length > 0;

            if (hasMatches) {
              // 有匹配项时，检查第一个面板是否有选中的项
              if (index === 0) {
                const filteredNodes = getFilteredNodes(currentNodes, index);
                const hasSelectedInFiltered = filteredNodes.some((node) => node.checked);

                // 如果第一个面板的搜索结果中没有选中的项，则隐藏子级面板
                if (!hasSelectedInFiltered) {
                  maxLevel = index;
                }
              }
            } else {
              // 无匹配时关闭子面板
              maxLevel = index;
            }
          }
        }
      }

      // 当maxLevel减少时，清理超出范围的过滤器数据
      if (maxLevel < (prev?.maxLevel ?? -1)) {
        filters = Object.fromEntries(Object.entries(filters).filter(([panelIndex]) => Number(panelIndex) <= maxLevel));
      }

      filterState.value = { filters, cascade, maxLevel };
    };

    // 判断面板是否应该显示
    const shouldShowPanel = (index: number): boolean => {
      const state = filterState.value;
      if (!hasActiveFilter.value || !state?.cascade || state.maxLevel < 0) return true;
      // 只显示 maxLevel 范围内的面板
      return index <= state.maxLevel;
    };

    // 处理节点展开
    const handleExpand = (node: TreeNode, trigger: 'hover' | 'click', level: number) => {
      const state = filterState.value;

      // 级联模式下更新 maxLevel 以显示子级面板
      const { children } = node;
      if (
        state?.cascade &&
        state.maxLevel >= 0 &&
        props.trigger === trigger &&
        Array.isArray(children) &&
        children.length
      ) {
        const childLevel = level + 1;
        if (childLevel > state.maxLevel) {
          // 清理超出新maxLevel的面板的过滤器数据，避免过时数据残留
          const cleanedFilters = Object.fromEntries(
            Object.entries(state.filters).filter(([panelIndex]) => Number(panelIndex) <= childLevel),
          );
          filterState.value = { ...state, filters: cleanedFilters, maxLevel: childLevel };
        }
      }

      expandClickEffect(props.trigger, trigger, node, props.cascaderContext);
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
              options: treeNodes,
              onFilter: (
                filter: string | ((node: TreeOptionData, panelIndex: number) => boolean),
                opts?: { cascade?: boolean },
              ) => handleFilter(index, filter, opts),
            },
          })}
          {displayNodes.map((node: TreeNode) => renderItem(node, index))}
          {renderTNodeJSX('popupFooter', {
            params: {
              panelIndex: index,
              options: treeNodes,
              onFilter: (
                filter: string | ((node: TreeOptionData, panelIndex: number) => boolean),
                opts?: { cascade?: boolean },
              ) => handleFilter(index, filter, opts),
            },
          })}
        </ul>
      );
    };

    const renderPanels = () => {
      const { inputVal, treeNodes } = props.cascaderContext;
      if (inputVal) return renderList(treeNodes, true);

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
