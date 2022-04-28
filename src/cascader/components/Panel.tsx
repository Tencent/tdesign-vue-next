import { defineComponent, PropType, ref, computed, watch, nextTick } from 'vue';

import Item from './Item';
import { TreeNode, CascaderContextType } from '../interface';
import CascaderProps from '../props';
import { usePrefixClass, useConfig } from '../../hooks/useConfig';
import { useTNodeDefault } from '../../hooks/tnode';

import { getPanels } from '../core/helper';
import { expendClickEffect, valueChangeEffect } from '../core/effect';

export default defineComponent({
  name: 'TCascaderSubPanel',
  props: {
    empty: CascaderProps.empty,
    trigger: CascaderProps.trigger,
    onChange: CascaderProps.onChange,
    visible: {
      type: Boolean,
      default: true,
    },
    cascaderContext: {
      type: Object as PropType<CascaderContextType>,
    },
  },

  setup(props) {
    const renderTNodeJSXDefault = useTNodeDefault();
    const COMPONENT_NAME = usePrefixClass('cascader');
    const { global, t } = useConfig('cascader');
    const itemShow = ref(props.visible);

    const panels = computed(() => getPanels(props.cascaderContext.treeNodes));

    const handleExpand = (node: TreeNode, trigger: 'hover' | 'click') => {
      const { trigger: propsTrigger, cascaderContext } = props;
      expendClickEffect(propsTrigger, trigger, node, cascaderContext);
    };

    watch(
      () => props.visible,
      () => {
        nextTick(() => {
          itemShow.value = props.visible;
        });
      },
    );

    const renderItem = (node: TreeNode) => (
      <Item
        key={node.value}
        node={node}
        cascaderContext={props.cascaderContext}
        onClick={(node: TreeNode) => {
          handleExpand(node, 'click');
        }}
        onMouseenter={(node: TreeNode) => {
          handleExpand(node, 'hover');
        }}
        onChange={(node) => {
          valueChangeEffect(node, props.cascaderContext);
        }}
      />
    );

    const renderList = (treeNodes: TreeNode[], isFilter = false, segment = true, key = '1') => (
      <ul
        class={[
          `${COMPONENT_NAME.value}__menu`,
          'narrow-scrollbar',
          {
            [`${COMPONENT_NAME.value}__menu--segment`]: segment,
            [`${COMPONENT_NAME.value}__menu--filter`]: isFilter,
          },
        ]}
        key={key}
      >
        {treeNodes.map((node: TreeNode) => renderItem(node))}
      </ul>
    );

    const renderPanels = () => {
      const { inputVal, treeNodes } = props.cascaderContext;
      return inputVal
        ? renderList(treeNodes, true)
        : panels.value.map((treeNodes, index: number) =>
            renderList(treeNodes, false, index !== panels.value.length - 1, `${COMPONENT_NAME.value}__menu${index}`),
          );
    };

    return () => (
      <div class={[`${COMPONENT_NAME.value}__panel`, { [`${COMPONENT_NAME.value}--normal`]: panels.value.length }]}>
        {panels.value.length
          ? renderPanels()
          : renderTNodeJSXDefault(
              'empty',
              <div class={`${COMPONENT_NAME.value}__panel--empty`}>{t(global.value.empty)}</div>,
            )}
      </div>
    );
  },
});
