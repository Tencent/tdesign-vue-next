<template>
  <t-space direction="vertical" style="width: 100%" class="tdesign-tree-operations">
    <t-space>
      <span>插入节点使用高亮节点:</span>
      <t-switch v-model="useActived" />
    </t-space>
    <t-space>
      <span>子节点展开触发父节点展开:</span>
      <t-switch v-model="expandParent" />
    </t-space>
    <t-space>
      <t-input-adornment prepend="filter:">
        <t-input v-model="filterText" @change="onInputChange" />
      </t-input-adornment>
    </t-space>
    <t-tree
      ref="tree"
      :data="items"
      hover
      expand-all
      activable
      checkable
      :expand-on-click-node="false"
      :label="getLabel"
      :expand-parent="expandParent"
      :filter="filterByText"
      line
      @expand="onExpand"
      @change="onChange"
      @active="onActive"
    >
      <template #operations="{ node }">
        <t-space :size="10">
          <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
          <t-button size="small" variant="outline" @click="insertBefore(node)">前插节点</t-button>
          <t-button size="small" variant="outline" @click="insertAfter(node)">后插节点</t-button>
          <t-button
            size="small"
            :theme="node.disabled ? 'success' : 'warning'"
            variant="base"
            @click="toggleDisable(node)"
          >
            {{ node.disabled ? 'enable' : 'disable' }}
          </t-button>
          <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
        </t-space>
      </template>
    </t-tree>
    <h3>操作树节点</h3>
    <t-space :size="10" break-line>
      <t-button theme="primary" variant="outline" @click="getItem">获取 value 为 'node1' 的单个节点</t-button>
      <t-button theme="primary" variant="outline" @click="getAllItems">获取所有节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveChildren">获取高亮节点的所有子节点</t-button>
      <t-button theme="primary" variant="outline" @click="getAllActived">获取所有高亮节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveChecked">获取高亮节点下的选中节点</t-button>
      <t-button theme="primary" variant="outline" @click="append()">插入一个根节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveParent">获取高亮节点的父节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveParents">获取高亮节点的所有父节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActiveIndex">获取高亮节点在子节点中的位置</t-button>
      <t-button theme="primary" variant="outline" @click="setActiveChecked">选中高亮节点</t-button>
      <t-button theme="primary" variant="outline" @click="setActiveUnChecked">取消选中高亮节点</t-button>
      <t-button theme="primary" variant="outline" @click="setActiveExpanded">展开高亮节点</t-button>
      <t-button theme="primary" variant="outline" @click="getActivePlainData">获取高亮节点与其子节点的数据</t-button>
    </t-space>
    <div>* 相关信息通过控制台输出</div>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  TreeInstanceFunctions,
  TreeProps,
  ButtonProps,
  InputProps,
  TreeNodeModel,
  TreeOptionData,
  TreeNodeValue,
  TypeTreeNodeModel,
} from 'tdesign-vue-next';
const tree = ref<TreeInstanceFunctions>();
const index = ref(2);
const activeId = ref('');
const activeIds = ref([]);
const expandIds = ref([]);
const checkedIds = ref([]);
const useActived = ref(false);
const expandParent = ref(true);
const filterText = ref('');
const filterByText = ref<TreeProps['filter']>(null);
const items = ref<TreeProps['data']>([
  {
    value: 'node1',
  },
  {
    value: 'node2',
  },
]);
const getLabelContent = (node: TreeNodeModel<TreeOptionData>) => {
  const pathNodes = node.getPath();
  let label = pathNodes.map((itemNode) => itemNode.getIndex() + 1).join('.');
  label = `${label} | value: ${node.value}`;
  return label;
};
const getLabel: TreeProps['label'] = (h, node) => {
  const label = getLabelContent(node);
  const { data } = node;
  data.label = label;
  return label;
};
const setLabel = (value: TreeNodeValue) => {
  const node = tree.value.getItem(value);
  const label = getLabelContent(node);
  const { data } = node;
  data.label = label;
};
const getItem: ButtonProps['onClick'] = () => {
  const node = tree.value.getItem('node1');
  console.info('getItem:', node.value);
};
const getAllItems: ButtonProps['onClick'] = () => {
  const nodes = tree.value.getItems();
  console.info(
    'getAllItems:',
    nodes.map((node) => node.value),
  );
};
const getActivedNode = () => {
  const activeNode = tree.value.getItem(activeId.value);
  return activeNode;
};
type Nodes = TreeNodeModel<TreeOptionData>[];
const getActiveChildren: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  if (!node) return;
  let nodes: Nodes = [];
  if (node) {
    const nodeChildrens = node.getChildren(true);
    nodes = typeof nodeChildrens === 'boolean' ? [] : nodeChildrens;
  }
  console.info(
    'getActiveChildren:',
    nodes.map((node) => node.value),
  );
};
const getAllActived: ButtonProps['onClick'] = () => {
  console.info('getActived value:', activeIds.value.slice(0));
};
const getActiveChecked: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  if (!node) return;
  const nodes = tree.value.getItems(node.value);
  console.info(
    'getChecked:',
    nodes.filter((node) => node.checked).map((node) => node.value),
  );
};
const getInsertItem = () => {
  let item = null;
  if (useActived.value) {
    item = getActivedNode();
  } else {
    index.value += 1;
    const value = `t${index.value}`;
    item = {
      value,
    };
  }
  return item;
};
const append = (node?: TypeTreeNodeModel) => {
  const item = getInsertItem();
  if (item) {
    if (!node) {
      tree.value.appendTo('', item);
    } else {
      tree.value.appendTo(node.value, item);
    }
    setLabel(item.value);
  }
  if (useActived.value) {
    activeId.value = '';
  }
};
const insertBefore = (node: TypeTreeNodeModel) => {
  const item = getInsertItem();
  if (item) {
    tree.value.insertBefore(node.value, item);
    setLabel(item.value);
  }
};
const insertAfter = (node: TypeTreeNodeModel) => {
  const item = getInsertItem();
  if (item) {
    tree.value.insertAfter(node.value, item);
    setLabel(item.value);
  }
};
const getActiveParent: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  if (!node) return;
  const parent = tree.value.getParent(node.value);
  console.info('getParent', parent?.value);
};
const getActiveParents: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  if (!node) return;
  const parents = tree.value.getParents(node.value);
  console.info(
    'getParents',
    parents.map((node) => node.value),
  );
};
const setActiveChecked: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  if (!node) return;
  tree.value.setItem(node?.value, {
    checked: true,
  });
};
const setActiveUnChecked: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  if (!node) return;
  tree.value.setItem(node?.value, {
    checked: false,
  });
};
const setActiveExpanded: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  if (!node) return;
  tree.value.setItem(node?.value, {
    expanded: true,
  });
};
const getActiveIndex: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  if (!node) return;
  const index = tree.value.getIndex(node.value);
  console.info('getIndex', index);
};
const getActivePlainData: ButtonProps['onClick'] = () => {
  const node = getActivedNode();
  let treeNodes = [];
  if (!node) {
    treeNodes = tree.value.getTreeData();
  } else {
    treeNodes = tree.value.getTreeData(node.value);
  }
  console.info('树结构数据:', treeNodes);
};
const toggleDisable = (node: TypeTreeNodeModel) => {
  tree.value.setItem(node.value, {
    disabled: !node.disabled,
  });
};
const remove = (node: TypeTreeNodeModel) => {
  tree.value.remove(node.value);
};
const onChange: TreeProps['onChange'] = (vals, state) => {
  console.info('on change:', vals, state);
  checkedIds.value = vals;
};
const onExpand: TreeProps['onExpand'] = (vals, state) => {
  console.info('on expand:', vals, state);
  expandIds.value = vals;
};
const onActive: TreeProps['onActive'] = (vals, state) => {
  console.info('on active:', vals, state);
  activeIds.value = vals;
  activeId.value = String(vals[0]) || '';
};
const onInputChange: InputProps['onChange'] = (state) => {
  console.info('on input:', state);
  if (filterText.value) {
    filterByText.value = (node) => {
      const label = node?.data?.label || '';
      const rs = (label as string).indexOf(filterText.value) >= 0;
      return rs;
    };
  } else {
    filterByText.value = null;
  }
};
</script>
<style>
.tdesign-tree-operations .t-is-active .t-tree__label,
.tdesign-tree-operations .t-is-active .t-checkbox__label {
  background-color: rgba(255, 0, 0, 0.3);
}
.tdesign-tree-operations .tips p {
  line-height: 24px;
  text-indent: 1em;
}
</style>
