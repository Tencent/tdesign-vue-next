<template>
  <div class="tdesign-tree-demo">
    <h3 class="title">Render:</h3>
    <t-tree
      :data="items"
      hover
      expand-all
      :label="getLabel"
      :operations="renderOperations"
    />
    <h3 class="title">Scope Slot:</h3>
    <div class="operations">
      <t-form labelWidth="200">
        <t-form-item label="插入节点使用高亮节点">
          <t-switch v-model="useActived"/>
        </t-form-item>
        <t-form-item label="子节点展开触发父节点展开">
          <t-switch v-model="expandParent"/>
        </t-form-item>
      </t-form>
    </div>
    <div class="operations">
      <t-addon prepend="filter:">
        <t-input v-model="filterText" @change="onInputChange"/>
      </t-addon>
    </div>
    <t-tree
      :data="items"
      hover
      expand-all
      activable
      checkable
      :expand-on-click-node="false"
      :label="getLabel"
      :expand-parent="expandParent"
      :filter="filterByText"
      @expand="onExpand"
      @change="onChange"
      @active="onActive"
      line
      ref="tree"
    >
      <template #operations="{node}">
        <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
        <t-button size="small" variant="outline" @click="insertBefore(node)">前插节点</t-button>
        <t-button size="small" variant="outline" @click="insertAfter(node)">后插节点</t-button>
        <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
      </template>
    </t-tree>
    <h3 class="title">API:</h3>
    <div class="operations">
      <t-button theme="primary" @click="getItem">获取 value 为 'node1' 的单个节点</t-button>
      <t-button theme="primary" @click="getAllItems">获取所有节点</t-button>
      <t-button theme="primary" @click="getActiveChildren">获取高亮节点的所有子节点</t-button>
      <t-button theme="primary" @click="getAllActived">获取所有高亮节点</t-button>
      <t-button theme="primary" @click="getActiveChecked">获取高亮节点下的选中节点</t-button>
      <t-button theme="primary" @click="append()">插入一个根节点</t-button>
      <t-button theme="primary" @click="getActiveParent">获取高亮节点的父节点</t-button>
      <t-button theme="primary" @click="getActiveParents">获取高亮节点的所有父节点</t-button>
      <t-button theme="primary" @click="getActiveIndex">获取高亮节点在子节点中的位置</t-button>
      <t-button theme="primary" @click="setActiveChecked">选中高亮节点</t-button>
      <t-button theme="primary" @click="setActiveExpanded">展开高亮节点</t-button>
      <t-button theme="primary" @click="getActivePlainData">获取高亮节点与其子节点的数据</t-button>
    </div>
    <p class="tips">* 相关信息通过控制台输出</p>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const items = [{
  value: 'node1',
}, {
  value: 'node2',
}]

const getLabelContent = (node) => {
  const pathNodes = node.getPath();
  let label = pathNodes
    .map((itemNode) => (itemNode.getIndex() + 1))
    .join('.');
  label = `${label} | value: ${node.value}`;
  return label;
}

export default defineComponent({
  setup() {
    const index = ref(2);
    const activeId = ref('');
    const activeIds = ref([]);
    const expandIds = ref([]);
    const checkedIds = ref([]);
    const useActived = ref(false);
    const expandParent = ref(true);
    const filterText = ref('');
    const filterByText = ref(null);

    const renderOperations = (createElement, node) => {
      return `value: ${node.value}`;
    }
    
    const getLabel = (createElement, node) => {
      const label = getLabelContent(node);
      const { data } = node;
      data.label = label;
      return label;
    }

    const getActivedNode = () => {
      const activeNode = tree.value.getItem(activeId.value);
      return activeNode;
    }

    const tree = ref(null)
    const setLabel = () => {
      const node = tree.value.getItem(value);
      const label = getLabelContent(node);
      const { data } = node;
      data.label = label;
    }

    const getItem = () => {
      const node = tree.value.getItem('node1');
      console.info('getItem:', node.label);
    }

    const getAllItems = () => {
      const nodes = tree.value.getItems();
      console.info('getAllItems:', nodes.map((node) => node.value));
    }

    const getAllActived = () => {
      console.info('getActived value:', activeIds.value.slice(0));
    }

    const getActiveChildren = () => {
      const node = getActivedNode();
      if (!node) return;
      let nodes = [];
      if (node) {
        nodes = node.getChildren(true) || [];
      }
      console.info('getActiveChildren:', nodes.map((node) => node.value));
    }

    const getActiveChecked = () => {
      const node = getActivedNode();
      if (!node) return;
      const nodes = tree.value.getItems(node.value);
      console.info(
        'getChecked:',
        nodes
          .filter((node) => node.checked)
          .map((node) => node.value),
      );
    }

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
    }

    const getPlainData = (item) => {
      const root = item;
      if (!root) return null;
      const children = item.getChildren(true) || [];
      const list = [root].concat(children);
      const nodeMap = {};
      const nodeList = list.map((item) => {
        const node = {
          walkData() {
            const data = {
              ...this.data,
            };
            const itemChildren = this.getChildren();
            if (Array.isArray(itemChildren)) {
              data.children = [];
              itemChildren.forEach((childItem) => {
                const childNode = nodeMap[childItem.value];
                const childData = childNode.walkData();
                data.children.push(childData);
              });
            }
            return data;
          },
          ...item,
        };
        nodeMap[item.value] = node;
        return node;
      });
      const [rootNode] = nodeList;
      const data = rootNode.walkData();
      return data;
    }

    const append = (node) => {
      const item = getInsertItem();
      if (item) {
        if (!node) {
          tree.value.appendTo('', item);
        } else {
          tree.value.appendTo(node.value, item);
        }
        setLabel(item.value);
      }
    }

    const insertBefore = (node) => {
      const item = getInsertItem();
      if (item) {
        tree.value.insertBefore(node.value, item);
        setLabel(item.value);
      }
    }

    const insertAfter = (node) => {
      const item = getInsertItem();
      if (item) {
        tree.value.insertAfter(node.value, item);
        setLabel(item.value);
      }
    }

    const getActiveParent = () => {
      const node = getActivedNode();
      if (!node) return;
      const parent = tree.value.getParent(node.value);
      console.info('getParent', parent?.value);
    }

    const getActiveParents = () => {
      const node = getActivedNode();
      if (!node) return;
      const parents = tree.value.getParents(node.value);
      console.info('getParents', parents.map((node) => node.value));
    }

    const setActiveChecked = () => {
      const node = getActivedNode();
      if (!node) return;
      tree.valuesetItem(node?.value, {
        checked: true,
      });
    }

    const setActiveExpanded = () => {
      const node = getActivedNode();
      if (!node) return;
      tree.value.setItem(node?.value, {
        expanded: true,
      });
    }

    const getActiveIndex = () => {
      const node = getActivedNode();
      if (!node) return;
      const index = tree.value.getIndex(node.value);
      console.info('getIndex', index);
    }
    
    const getActivePlainData = () => {
      const node = getActivedNode();
      if (!node) return;
      const data = getPlainData(node);
      return data;
    }

    const remove = (node) => {
      tree.value.remove(node.value);
    }

    const onChange = (vals, state) => {
      console.info('on change:', vals, state);
      checkedIds.value = vals;
    }

    const onExpand = (vals, state) => {
      console.info('on expand:', vals, state);
      expandIds.value = vals;
    }

    const onActive = (vals, state) => {
      console.info('on active:', vals, state);
      activeIds.value = vals;
      activeId.value = vals[0] || '';
    }

    const onInputChange = (state) => {
      console.info('on input:', state);
      filterByText.value = (node) => {
        const label = node?.data?.label || '';
        const rs = label.indexOf(filterText.value) >= 0;
        return rs;
      };
    }

    return {
      useActived,
      items,
      filterText,
      filterByText,
      getItem,
      getAllItems,
      expandParent,
      renderOperations,
      tree,
      getLabel,
      getAllActived,
      getActiveChecked,
      getActiveChildren,
      setActiveChecked,
      getActiveParent,
      getActiveParents,
      getActiveIndex,
      setActiveExpanded,
      getActivePlainData,
      append,
      insertBefore,
      insertAfter,
      remove,
      onChange,
      onExpand,
      onActive,
      onInputChange
    }
  },
});
</script>
<style scoped>
@import url('./common/demo.css');

.tips {
  font-size: 10px;
  color: gray;
}
</style>
