<template>
  <t-space direction="vertical">
    <t-space>
      <span>可选:</span>
      <t-switch v-model="checkable" />
    </t-space>
    <t-space>
      <span>严格模式:</span>
      <t-switch v-model="checkStrictly" />
    </t-space>
    <t-space>
      <t-radio-group v-model="valueMode" name="value-mode" variant="default-filled">
        <t-radio-button v-for="item in valueOptions" :key="item.value" :value="item.value">{{
          item.label
        }}</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-space>
      <t-button theme="primary" @click="selectInvert">反选</t-button>
    </t-space>
    <t-tree
      ref="tree"
      v-model="allChecked"
      :data="items"
      :checkable="checkable"
      :check-strictly="checkStrictly"
      :value-mode="valueMode"
      hover
      expand-all
      @change="onChange"
      @click="onClick"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
const treeItems = [
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
const tree = ref();
const valueMode = ref('onlyLeaf');
const checkable = ref(true);
const checkStrictly = ref(false);
const allChecked = ref([]);
const valueOptions = ref([
  {
    value: 'onlyLeaf',
    label: 'onlyLeaf',
  },
  {
    value: 'parentFirst',
    label: 'parentFirst',
  },
  {
    value: 'all',
    label: 'all',
  },
]);
const items = ref(treeItems);
const onClick = (context) => {
  console.info('onClick context:', context);
  const { node } = context;
  console.info(node.value, 'onClick context.node.checked:', node.checked);
};
const onChange = (checked, context) => {
  console.info('onChange checked:', checked, 'context:', context);
  const { node } = context;
  console.info(node.value, 'onChange context.node.checked:', node.checked);
};
const selectInvert = () => {
  // 取得所有节点
  const items = tree.value.getItems();
  const revertSelection = [];
  items.forEach((item) => {
    if (!item.checked && !item.indeterminate) {
      // checked 为 true, 为直接选中状态
      // indeterminate 为 true, 为半选状态
      revertSelection.push(item.value);
    }
  });
  allChecked.value = revertSelection;
};
</script>
