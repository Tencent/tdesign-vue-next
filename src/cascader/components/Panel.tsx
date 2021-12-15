import { defineComponent, PropType } from 'vue';
import { prefix } from '../../config';

// utils
import { renderTNodeJSXDefault } from '../../utils/render-tnode';
import getConfigReceiverMixins, { CascaderConfig } from '../../config-provider/config-receiver';
import mixins from '../../utils/mixins';

// common logic
import { getPanels, expendClickEffect, valueChangeEffect } from '../utils/panel';

// Component
import Item from './Item';

// type
import { ContextType, TreeNode, CascaderContextType } from '../interface';
import CascaderProps from '../props';

const name = `${prefix}-cascader`;

export default defineComponent({
  ...mixins(getConfigReceiverMixins<CascaderConfig>('cascader')),

  name: `${name}-panel`,
  props: {
    empty: CascaderProps.empty,
    trigger: CascaderProps.trigger,
    onChange: CascaderProps.onChange,
    cascaderContext: {
      type: Object as PropType<CascaderContextType>,
    },
  },
  emits: ['change'],

  computed: {
    panels() {
      return getPanels(this.cascaderContext.treeNodes);
    },
  },

  render() {
    const {
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
      <div class={`${name}__panel--empty`}>{this.t(this.global.empty)}</div>,
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
        class={[`${name}__menu`, 'narrow-scrollbar', { [`${name}__menu--segment`]: index !== panels.length - 1 }]}
        key={index}
      >
        {panel.map((node: TreeNode) => renderItem(node))}
      </ul>
    ));

    const filterPanelsContainer = (
      <ul class={[`${name}__menu`, 'narrow-scrollbar', `${name}__menu--segment`, `${name}__menu--filter`]}>
        {treeNodes.map((node: TreeNode) => renderItem(node))}
      </ul>
    );

    const renderPanels = filterActive ? filterPanelsContainer : panelsContainer;

    return (
      <div
        class={[
          `${name}__panel`,
          {
            [`${name}--normal`]: panels.length,
          },
        ]}
        style={{
          width: panels.length === 0 ? `${inputWidth}px` : null,
        }}
      >
        {panels && panels.length ? renderPanels : renderEmpty}
      </div>
    );
  },
});
