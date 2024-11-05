<template>
  <t-space direction="vertical">
    <t-cascader v-model="value1" :options="options" check-strictly />
    <t-cascader v-model="value2" :options="options" check-strictly multiple />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CascaderProps } from 'tdesign-vue-next';
const options: CascaderProps['options'] = [
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
const value1 = ref('1.2.2');
const value2 = ref(['1.1.2.1', '2']);
</script>
