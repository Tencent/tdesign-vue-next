<template>
  <t-space direction="vertical" style="width: 100%">
    <h3>虚拟滚动 - virtual 模式</h3>
    <t-space>
      <span>动画:</span>
      <t-switch v-model="transition" />
    </t-space>
    <t-space>
      <span>显示连线:</span>
      <t-switch v-model="showLine" />
    </t-space>
    <t-space>
      <span>显示图标:</span>
      <t-switch v-model="showIcon" />
    </t-space>
    <t-space>
      <span>可选:</span>
      <t-switch v-model="isCheckable" />
    </t-space>
    <t-space>
      <span>可操作:</span>
      <t-switch v-model="isOperateAble" />
    </t-space>
    <t-space>
      <t-button theme="primary" @click="clearTree">清空 tree</t-button>
    </t-space>
    <t-space>
      <t-input-adornment prepend="level1 节点数量:">
        <t-input v-model="textLevel1Count" />
      </t-input-adornment>
      <t-input-adornment prepend="level2 节点数量:">
        <t-input v-model="textLevel2Count" />
      </t-input-adornment>
      <t-input-adornment prepend="level3 节点数量:">
        <t-input v-model="textLevel3Count" />
      </t-input-adornment>
      <t-button theme="primary" @click="createTree">构造 tree</t-button>
    </t-space>
    <t-space>
      <t-input-adornment prepend="插入节点数量:">
        <t-input v-model="textInsertCount" />
      </t-input-adornment>
    </t-space>
    <t-space>
      <t-button @click="append()">插入根节点</t-button>
    </t-space>
    <t-space>
      <t-input-adornment prepend="filter:">
        <t-input v-model="filterText" @change="onInput" />
      </t-input-adornment>
    </t-space>
    <t-tree
      ref="tree"
      :data="items"
      hover
      activable
      :checkable="isCheckable"
      expand-all
      :height="300"
      :transition="transition"
      :expand-on-click-node="false"
      :line="showLine"
      :icon="showIcon"
      :label="label"
      :filter="filterByText"
      :scroll="{
        rowHeight: 34,
        bufferSize: 10,
        threshold: 10,
        type: 'virtual',
      }"
    >
      <template #operations="{ node }">
        <div v-if="isOperateAble" class="tdesign-demo-block-row">
          <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
          <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
        </div>
      </template>
    </t-tree>
    <div style="height: 100px"></div>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      transition: true,
      textInsertCount: '1',
      showLine: true,
      showIcon: true,
      isCheckable: true,
      isOperateAble: true,
      items: [],
      filterText: '',
      filterByText: null,
      textLevel1Count: '10',
      textLevel2Count: '10',
      textLevel3Count: '10',
    };
  },
  computed: {
    level1Count() {
      return parseInt(this.textLevel1Count, 10) || 1;
    },
    level2Count() {
      return parseInt(this.textLevel2Count, 10) || 1;
    },
    level3Count() {
      return parseInt(this.textLevel3Count, 10) || 1;
    },
    insertCount() {
      return parseInt(this.textInsertCount, 10) || 1;
    },
  },
  methods: {
    label(h, node) {
      return `${node.value}`;
    },
    getInsertItem() {
      const value = this.getValue();
      return {
        value,
      };
    },
    append(node) {
      const { tree } = this.$refs;
      if (!node) {
        for (let index = 0; index < this.insertCount; index += 1) {
          const item = this.getInsertItem();
          tree.appendTo('', item);
        }
      } else {
        for (let index = 0; index < this.insertCount; index += 1) {
          const item = this.getInsertItem();
          tree.appendTo(node.value, item);
        }
      }
    },
    remove(node) {
      node.remove();
    },
    onInput(state) {
      console.info('onInput:', state);
      if (this.filterText) {
        // 存在过滤文案，才启用过滤
        this.filterByText = (node) => {
          const rs = node.value.indexOf(this.filterText) >= 0;
          // 命中的节点会强制展示
          // 命中节点的路径节点会锁定展示
          // 未命中的节点会隐藏
          return rs;
        };
      } else {
        // 过滤文案为空，则还原 tree 为无过滤状态
        this.filterByText = null;
      }
    },
    getValue() {
      this.index += 1;
      return `t${this.index}`;
    },
    createTreeData() {
      const allLevels = [this.level1Count, this.level2Count, this.level3Count];
      const createNodes = (items, level) => {
        const count = allLevels[level];
        if (count) {
          let index = 0;
          for (index = 0; index < count; index += 1) {
            const value = this.getValue();
            const item = { value };
            items.push(item);
            if (allLevels[level + 1]) {
              item.children = [];
              createNodes(item.children, level + 1);
            }
          }
        }
      };
      const items = [];
      createNodes(items, 0);
      return items;
    },
    createTree() {
      this.items = this.createTreeData();
    },
    clearTree() {
      this.items = [];
    },
  },
};
</script>
