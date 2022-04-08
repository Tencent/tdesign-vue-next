import { defineComponent, PropType } from 'vue';

// utils
import { renderTNodeJSXDefault } from '../../utils/render-tnode';

// common logic
import { getPanels, expendClickEffect, valueChangeEffect } from '../utils/panel';

// Component
import Item from './Item';

// type
import { ContextType, TreeNode, CascaderContextType } from '../interface';
import CascaderProps from '../props';
import { useConfig, usePrefixClass } from '../../hooks/useConfig';

export default defineComponent({
  name: 'TCascaderPanel',
  props: {
    empty: CascaderProps.empty,
    trigger: CascaderProps.trigger,
    onChange: CascaderProps.onChange,
    cascaderContext: {
      type: Object as PropType<CascaderContextType>,
    },
  },
  emits: ['change'],

  setup() {
    const ComponentClassName = usePrefixClass('cascader');
    const classPrefix = usePrefixClass();
    const { global } = useConfig('cascader');

    return { global, ComponentClassName, classPrefix };
  },

  computed: {
    panels() {
      return getPanels(this.cascaderContext.treeNodes);
    },
  },
  render() {
    const {
      ComponentClassName,
      cascaderContext: { filterActive, treeNodes, inputWidth },
      cascaderContext,
      panels,
    } = this;
    const handleExpand = (ctx: ContextType, trigger: 'hover' | 'click') => {
      const { node } = ctx;
      const { trigger: propsTrigger, cascaderContext } = this;

      expendClickEffect(propsTrigger, trigger, node, cascaderContext);
    };

    const handleChange = (ctx: ContextType) => {
      const { node } = ctx;
      const { cascaderContext } = this;

      valueChangeEffect(node, cascaderContext);
    };

    // innerComponents

    const renderEmpty = renderTNodeJSXDefault(
      this,
      'empty',
      <div class={`${ComponentClassName}__panel--empty`}>{this.global.empty}</div>,
    );

    const renderItem = (node: TreeNode) => (
      <Item
        key={node.value}
        node={node}
        cascaderContext={cascaderContext}
        onClick={(ctx: ContextType) => {
          handleExpand(ctx, 'click');
        }}
        onMouseenter={(ctx: ContextType) => {
          handleExpand(ctx, 'hover');
        }}
        onChange={handleChange}
      />
    );

    const panelsContainer = panels.map((panel: TreeNode[], index: number) => (
      <ul
        class={[
          `${ComponentClassName}__menu`,
          'narrow-scrollbar',
          { [`${ComponentClassName}__menu--segment`]: index !== panels.length - 1 },
        ]}
        key={index}
      >
        {panel.map((node: TreeNode) => renderItem(node))}
      </ul>
    ));

    const filterPanelsContainer = (
      <ul
        class={[
          `${ComponentClassName}__menu`,
          'narrow-scrollbar',
          `${ComponentClassName}__menu--segment`,
          `${ComponentClassName}__menu--filter`,
        ]}
      >
        {treeNodes.map((node: TreeNode) => renderItem(node))}
      </ul>
    );

    const renderPanels = filterActive ? filterPanelsContainer : panelsContainer;

    return (
      <div
        class={[`${ComponentClassName}__panel`, { [`${ComponentClassName}--normal`]: panels.length }]}
        style={{
          width: panels.length === 0 ? `${inputWidth}px` : null,
        }}
      >
        {panels && panels.length ? renderPanels : renderEmpty}
      </div>
    );
  },
});
