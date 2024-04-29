import { defineComponent, PropType, computed, h } from 'vue';

import { useTNodeDefault } from '../../hooks/tnode';
import { usePrefixClass, useConfig } from '../../hooks/useConfig';
import { getDefaultNode } from '../../utils/render-tnode';
import { expendClickEffect, valueChangeEffect } from '../core/effect';
import { getPanels } from '../core/helper';
import { TreeNode, CascaderContextType } from '../interface';
import CascaderProps from '../props';

import Item from './Item';

export default defineComponent({
  name: 'TCascaderSubPanel',
  props: {
    option: CascaderProps.option,
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
    const COMPONENT_NAME = usePrefixClass('cascader');
    const { globalConfig } = useConfig('cascader');

    const panels = computed(() => getPanels(props.cascaderContext.treeNodes));

    const handleExpand = (node: TreeNode, trigger: 'hover' | 'click') => {
      const { trigger: propsTrigger, cascaderContext } = props;
      expendClickEffect(propsTrigger, trigger, node, cascaderContext);
    };

    const renderItem = (node: TreeNode, index: number) => {
      const optionChild = node.data.content
        ? getDefaultNode(node.data.content(h))
        : renderTNodeJSXDefault('option', {
            params: { item: node.data, index },
          });
      return (
        <Item
          key={node.value}
          node={node}
          optionChild={optionChild}
          cascaderContext={props.cascaderContext}
          onClick={() => {
            handleExpand(node, 'click');
          }}
          onMouseenter={() => {
            handleExpand(node, 'hover');
          }}
          onChange={() => {
            valueChangeEffect(node, props.cascaderContext);
          }}
        />
      );
    };

    const renderList = (treeNodes: TreeNode[], isFilter = false, segment = true, index = 1) => (
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
        {treeNodes.map((node: TreeNode) => renderItem(node, index))}
      </ul>
    );

    const renderPanels = () => {
      const { inputVal, treeNodes } = props.cascaderContext;
      return inputVal
        ? renderList(treeNodes, true)
        : panels.value.map((treeNodes, index: number) =>
            renderList(treeNodes, false, index !== panels.value.length - 1, index),
          );
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
