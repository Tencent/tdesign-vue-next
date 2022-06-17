<template>
  <div class="tdesign-tree-base">
    <t-input-adornment prepend="filter:">
      <t-input v-model="filterText" @change="onInput" />
    </t-input-adornment>
    <t-tree :data="items" expand-on-click-node :default-expanded="expanded" :filter="handleFilterByText" hover line />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = [
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

const filterText = ref('');
const handleFilterByText = ref(null);
const expanded = ref(['1.1.1']);

const onInput = (state) => {
  handleFilterByText.value = (node) => node.data.label.indexOf(filterText.value) >= 0;
};
</script>
<style scoped>
.demo-tree-base {
  display: block;
}
</style>
