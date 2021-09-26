import { defineComponent } from 'vue';
import isNumber from 'lodash/isNumber';

import { prefix } from '../../config';
import Item from './Item';
import { ContextType, TreeNode } from '../interface';
import { renderTNodeJSX } from '../../utils/render-tnode';
import getLocalRecevierMixins from '../../locale/local-receiver';
import mixins from '../../utils/mixins';
import CascaderProps from '../props';

const name = `${prefix}-cascader`;

export default defineComponent({
  ...mixins(getLocalRecevierMixins('cascader')),

  name: `${name}-panel`,
  components: {
    Item,
  },
  props: {
    empty: CascaderProps.empty,
    trigger: CascaderProps.trigger,
    cascaderContext: {
      type: Object,
    },
    onChange: CascaderProps.onChange,
  },
  emits: ['change'],
  computed: {
    panels() {
      const { treeNodes } = this.cascaderContext;
      const panels: TreeNode[][] = [];
      treeNodes.forEach((node: TreeNode) => {
        if (panels[node.level]) {
          panels[node.level].push(node);
        } else {
          panels[node.level] = [node];
        }
      });
      return panels;
    },
  },
  methods: {
    getEmpty() {
      const useLocale = !this.empty && !this.$slots.empty;
      return <ul class={[`${name}-menu`]}>
        <li class={[`${name}-item`, `${name}-item__is-empty`]}>{useLocale ? this.t(this.locale.empty) : renderTNodeJSX(this, 'empty')}</li>
      </ul>;
    },
    handleExpand(ctx: ContextType, trigger: 'hover' | 'click') {
      const { node } = ctx;
      const {
        trigger: propsTrigger,
        onChange,
        cascaderContext: {
          checkStrictly, filterActive, multiple, treeStore, setTreeNodes, setFilterActive, setVisible,
        },
      } = this;
      if (propsTrigger === trigger && !node.isLeaf()) {
        const expanded = node.setExpanded(true);
        treeStore.refreshNodes();
        treeStore.replaceExpanded(expanded);
        const nodes = treeStore.getNodes().filter((node: TreeNode) => node.visible);
        setTreeNodes(nodes);
      }
      // 单选并且点击叶子节点
      if (!multiple && (node.isLeaf() || checkStrictly) && trigger === 'click') {
        treeStore.resetChecked();
        const checked = node.setChecked(!node.isChecked());
        const [value] = checked;

        this.$emit('change', value, ctx);

        treeStore.refreshNodes();
        const nodes = treeStore.getNodes().filter((node: TreeNode) => node.visible);
        setTreeNodes(nodes);

        if (filterActive) {
          setFilterActive(false);
        }
        setVisible(false);
      }
    },
    handleChange(ctx: ContextType) {
      const { node } = ctx;
      const {
        cascaderContext: {
          disabled, max, setModel, treeStore, setTreeNodes, multiple, setVisible, handleChange,
        },
      } = this;

      if (!node || disabled || node.disabled) {
        return;
      }
      const checked = node.setChecked(!node.isChecked());

      if (isNumber(max) && max <= 0) {
        console.warn('max should > 0');
      }
      if (checked.length > max && isNumber(max) && max > 0) {
        return;
      }

      if (!multiple) {
        setVisible(false);
      }
      setModel(checked);

      handleChange(checked, ctx);

      treeStore.refreshNodes();
      const nodes = treeStore.getNodes().filter((node: TreeNode) => node.visible);
      setTreeNodes(nodes);
    },
  },
  render() {
    const {
      cascaderContext: {
        filterActive,
        treeNodes,
      },
      panels,
      handleExpand,
      handleChange,
    } = this;

    const renderItem = (node: TreeNode) => <item
      key={node.value}
      node={node}
      cascaderContext={this.cascaderContext}
      onClick={(ctx: ContextType) => {
        handleExpand(ctx, 'click');
      }}
      onMouseenter={(ctx: ContextType) => {
        handleExpand(ctx, 'hover');
      }}
      onChange={handleChange}
    ></item>;

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
        [`${name}-menu`, `${name}-menu__seperator`]
      }>
        {treeNodes.map((node: TreeNode) => renderItem(node))}
      </ul>
    );

    const renderPanels = filterActive ? filterPanelsContainer : panelsContainer;

    return (<div class={[`${name}-panel`, `${name}--normal`]}>
      {panels && panels.length ? renderPanels : this.getEmpty()}
    </div>);
  },
});
