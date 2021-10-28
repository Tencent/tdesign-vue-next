import { defineComponent, PropType } from 'vue';
import { prefix } from '../../config';

// utils
import { renderTNodeJSX } from '../../utils/render-tnode';
import getLocalRecevierMixins from '../../locale/local-receiver';
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
  ...mixins(getLocalRecevierMixins('cascader')),

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
      cascaderContext: {
        filterActive,
        treeNodes,
      },
      cascaderContext,
      panels,
      $slots,
    } = this;
    const useLocale = !this.empty && !$slots.empty;
    const empty = useLocale ? this.t(this.locale.empty) : renderTNodeJSX(this, 'empty');
    const handleExpand = (ctx: ContextType, trigger: 'hover' | 'click') => {
      const { node } = ctx;
      const {
        trigger: propsTrigger,
        cascaderContext,
        onChange,
      } = this;

      expendClickEffect(propsTrigger, trigger, node, cascaderContext, onChange, ctx);
    };

    const handleChange = (ctx: ContextType) => {
      const { node } = ctx;
      const {
        cascaderContext,
        onChange,
      } = this;

      valueChangeEffect(node, cascaderContext, onChange, ctx);
    };

    // innerComponents
    const renderEmpty = (
      <ul class={[`${name}-menu`, {
        [`${name}-menu__filter`]: filterActive,
      }]}>
        {!$slots.empty ? <li class={[`${name}-item`, `${name}-item__is-empty`]}>{empty}</li> : empty}
      </ul>
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
      <ul class={
        [`${name}-menu`,
          { [`${name}-menu__seperator`]: index !== panels.length - 1 }]
      } key={index}>
        {panel.map((node: TreeNode) => renderItem(node))}
      </ul>
    ));

    const filterPanelsContainer = (
      <ul class={
        [`${name}-menu`, `${name}-menu__seperator`, `${name}-menu__filter`]
      }>
        {treeNodes.map((node: TreeNode) => renderItem(node))}
      </ul>
    );

    const renderPanels = filterActive ? filterPanelsContainer : panelsContainer;

    return (<div class={[`${name}-panel`, `${name}--normal`]}>
      {panels && panels.length ? renderPanels : renderEmpty}
    </div>);
  },
});
