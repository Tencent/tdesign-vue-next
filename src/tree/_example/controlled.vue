<template>
  <t-space direction="vertical">
    <t-space direction="vertical">
      <t-input-adornment prepend="checked:">
        <t-input :value="allChecked" />
      </t-input-adornment>
      <t-input-adornment prepend="expanded:">
        <t-input :value="allExpanded" />
      </t-input-adornment>
      <t-input-adornment prepend="activated:">
        <t-input :value="allActived" />
      </t-input-adornment>
    </t-space>
  </t-space>

  <t-tree
    :data="items"
    checkable
    activable
    :expand-on-click-node="false"
    :active-multiple="false"
    :expanded="expanded"
    :actived="actived"
    :value="checked"
    :value-mode="valueMode"
    @expand="handleExpand"
    @change="handleChange"
    @active="handleActive"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import { TreeNodeModel } from 'tdesign-vue-next';
import { ref, computed } from 'vue';

type Item = {
  value: string;
  label: string;
  checkable?: boolean;
  children: {
    value: string;
    label: string;
    checkable?: boolean;
    children?: {
      value: string;
      label: string;
      children: {
        value: string;
        label: string;
      }[];
    }[];
  }[];
};

const items: Item[] = [
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
    label: '2 这个节点不允许展开, 不允许激活',
    checkable: false,
    children: [
      {
        value: '2.1',
        label: '2.1 这个节点不允许选中',
        checkable: false,
      },
      {
        value: '2.2',
        label: '2.2',
        checkable: false,
      },
    ],
  },
];

const checked = ref(['1.1.1.1', '1.1.1.2']);
const expanded = ref(['1', '1.1', '1.1.1', '2']);
const actived = ref(['2']);

const allChecked = computed(() => {
  let arr: string[] = [];
  if (Array.isArray(checked.value)) {
    arr = checked.value;
  }
  return arr.join(', ');
});

const allExpanded = computed(() => {
  let arr: string[] = [];
  if (Array.isArray(expanded.value)) {
    arr = expanded.value;
  }
  return arr.join(', ');
});

const allActived = computed(() => {
  let arr: string[] = [];
  if (Array.isArray(actived.value)) {
    arr = actived.value;
  }
  return arr.join(', ');
});

const handleClick = (context: { node: TreeNodeModel<Item>; e: MouseEvent }) => {
  console.info('onClick:', context);
};

const handleChange = (values: Item[], context: { node: TreeNodeModel<Item> }) => {
  console.info('onChange:', values, context);
  const checkedArr = values.filter((val) => {
    console.log(val);
    val.value !== '2.1';
  });
  console.info('节点 2.1 不允许选中');
  checked.value = checkedArr;
};

const handleExpand = (
  vals: Item[],
  context: { node: TreeNodeModel<Item>; e?: MouseEvent; trigger: 'node-click' | 'icon-click' | 'setItem' },
) => {
  console.info('onExpand:', vals, context);
  const expandedArr = vals.filter((val) => val.value !== '2');
  console.info('节点 2 不允许展开');
  expanded.value = expandedArr;
};

const handleActive = (
  vals: Item[],
  context: { node: TreeNodeModel<Item[]>; e?: MouseEvent; trigger: 'node-click' | 'setItem' },
) => {
  console.info('onActive:', vals, context);
  const activedArr = vals.filter((val) => val.value !== '2');
  console.info('节点 2 不允许激活');
  actived.value = activedArr;
};

const valueMode = 'onlyLeaf';
</script>
