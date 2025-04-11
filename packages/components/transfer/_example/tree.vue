<template>
  <t-transfer
    v-model="targetValue"
    v-model:checked="checkedRef"
    :data="items"
    :keys="keys"
    @change="onChange"
    @checked-change="handleCheckedChange"
  >
    <template #tree="slotProps">
      <t-tree v-bind="slotProps" checkable hover expand-all transition />
    </template>
  </t-transfer>
</template>
<script setup>
import { ref } from 'vue';

// support using keys to rename data attributes, keys should be defined in transfer
const keys = { value: 'id', label: 'name' };
const items = [
  {
    id: '12',
    name: '1',
    children: [
      {
        id: '1.12',
        name: '1.1',
      },
      {
        id: '1.22',
        name: '1.2',
        children: [
          {
            id: '1.2.12',
            name: '1.2.1',
            children: [
              {
                id: '1.2.1.1',
                name: '1.2.1.1',
              },
              {
                id: '1.2.1.2',
                name: '1.2.1.2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: '2',
    children: [
      {
        id: '2.1',
        name: '2.1',
      },
      {
        id: '2.2',
        name: '2.2',
      },
    ],
  },
  {
    id: '3',
    name: '3',
    children: [],
  },
];

const targetValue = ref([]);
const checkedRef = ref([]);

const handleCheckedChange = ({ checked, sourceChecked, targetChecked, type }) => {
  checkedRef.value = checked;
  console.log('handleCheckedChange', {
    checked,
    sourceChecked,
    targetChecked,
    type,
  });
};

const onChange = (newTargetValue) => {
  console.log('onChange', newTargetValue);
};
</script>
