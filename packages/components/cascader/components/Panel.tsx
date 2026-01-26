import { defineComponent, PropType, computed, h, shallowRef } from 'vue';

import Item from './Item';
import { TreeNode, CascaderContextType } from '../types';
import CascaderProps from '../props';
import { useConfig, usePrefixClass, useTNodeDefault, useTNodeJSX } from '@tdesign/shared-hooks';

import { getDefaultNode } from '@tdesign/shared-utils';
import { getPanels, expandClickEffect, valueChangeEffect } from '../utils';

interface FilterState {
  filters: Record<number, string>;
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

    // 处理过滤
    const handleFilter = (index: number, keyword: string, options?: { cascade?: boolean }) => {
      const prev = filterState.value;
      const cascade = options?.cascade ?? prev?.cascade ?? false;
      const filters = { ...prev?.filters, [index]: keyword };

      let maxLevel = prev?.maxLevel ?? -1;
      if (cascade) {
        // 有新搜索词时重置 maxLevel；全部清空时重置为 -1
        if (keyword?.trim()) {
          maxLevel = index;
        } else if (!Object.values(filters).some((f) => f?.trim())) {
          maxLevel = -1;
        }
      }

      filterState.value = { filters, cascade, maxLevel };
    };

    // 获取过滤后的节点 - 直接应用搜索词，确保父级变化后子级搜索仍生效
    const getFilteredNodes = (nodes: TreeNode[], index: number): TreeNode[] => {
      const state = filterState.value;
      if (!state) return nodes;

      // 直接应用当前层级的搜索词（无论级联模式还是基础模式）
      const keyword = state.filters[index]?.trim().toLowerCase();
      if (!keyword) return nodes;

      return nodes.filter((n) => n.label?.toLowerCase().includes(keyword));
    };

    // 判断面板是否应该显示
    const shouldShowPanel = (index: number): boolean => {
      const state = filterState.value;
      if (!state?.cascade || state.maxLevel < 0) return true;
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
          filterState.value = { ...state, maxLevel: childLevel };
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
      const displayNodes = filterState.value ? getFilteredNodes(treeNodes, index) : treeNodes;

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
          {renderTNodeJSX('panelHeader', {
            params: {
              panelIndex: index,
              options: treeNodes,
              onFilter: (filter: string, opts?: { cascade?: boolean }) => handleFilter(index, filter, opts),
            },
          })}
          {displayNodes.map((node: TreeNode) => renderItem(node, index))}
          {renderTNodeJSX('panelFooter', { params: { panelIndex: index } })}
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
