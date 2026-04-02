<template>
  <t-space :size="32" direction="vertical">
    <t-space direction="vertical">
      <t-space>
        <t-input-adornment prepend="filter:">
          <t-input v-model="demo1Text" style="width: 300px" @change="demo1Input" />
        </t-input-adornment>
      </t-space>
      <t-tree ref="tree" :data="items" expand-on-click-node :filter="demo1Filter" hover line />
    </t-space>

    <t-space direction="vertical">
      <t-space>
        <t-input-adornment prepend="filter:">
          <t-input
            v-model="demo2Text"
            placeholder="allow expand or fold tree nodes on filter"
            style="width: 300px"
            @change="demo2Input"
          />
        </t-input-adornment>
      </t-space>
      <t-tree
        ref="tree"
        :data="items"
        expand-on-click-node
        allow-fold-node-on-filter
        :filter="demo2Filter"
        hover
        line
      />
    </t-space>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeProps, InputProps } from 'tdesign-vue-next';
const exampleItems = [
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1.1',
        label: '1.1',
        children: [
          {
            value: '1.1.1',
            label: '1.1.1',
            children: [
              {
                value: '1.1.1.1',
                label: '1.1.1.1',
              },
              {
                value: '1.1.1.2',
                label: '1.1.1.2',
              },
            ],
          },
          {
            value: '1.1.2',
            label: '1.1.2',
            children: [
              {
                value: '1.1.2.1',
                label: '1.1.2.1',
              },
              {
                value: '1.1.2.2',
                label: '1.1.2.2',
              },
            ],
          },
        ],
      },
      {
        value: '1.2',
        label: '1.2',
        children: [
          {
            value: '1.2.1',
            label: '1.2.1',
            children: [
              {
                value: '1.2.1.1',
                label: '1.2.1.1',
              },
              {
                value: '1.2.1.2',
                label: '1.2.1.2',
              },
            ],
          },
          {
            value: '1.2.2',
            label: '1.2.2',
            children: [
              {
                value: '1.2.2.1',
                label: '1.2.2.1',
              },
              {
                value: '1.2.2.2',
                label: '1.2.2.2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: '2',
    children: [
      {
        value: '2.1',
        label: '2.1',
      },
      {
        value: '2.2',
        label: '2.2',
      },
    ],
  },
];
const demo1Text = ref('');
const demo1Filter = ref<TreeProps['filter']>(null);
const demo2Text = ref('');
const demo2Filter = ref<TreeProps['filter']>(null);
const items = ref<TreeProps['data']>(exampleItems);
const demo1Input: InputProps['onChange'] = (state) => {
  console.info('demo1 input:', state);
  if (demo1Text.value) {
    // 存在过滤文案，才启用过滤
    demo1Filter.value = (node) => {
      const rs = (node.data.label as string).indexOf(demo1Text.value) >= 0;
      // 命中的节点会强制展示
      // 命中节点的路径节点会锁定展示
      // 未命中的节点会隐藏
      return rs;
    };
  } else {
    // 过滤文案为空，则还原 tree 为无过滤状态
    demo1Filter.value = null;
  }
};
const demo2Input: InputProps['onChange'] = () => {
  demo2Filter.value = demo2Text.value ? (node) => (node.data.label as string).indexOf(demo2Text.value) >= 0 : null;
};
</script>
