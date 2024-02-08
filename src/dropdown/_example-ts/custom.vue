<template>
  <t-space>
    <t-dropdown :options="options" trigger="click" :hide-after-item-click="false" :min-column-width="100">
      <t-button variant="text">下拉菜单</t-button>
    </t-dropdown>
  </t-space>
</template>
<script lang="ts" setup>
import { DropdownProps } from 'tdesign-vue-next';
const options: DropdownProps['options'] = [
  {
    content: '选项一',
    value: 1,
  },
  {
    content: '选项二',
    value: 2,
    children: [
      {
        content: '选项五',
        value: 5,
      },
      {
        content: '选项六',
        value: 6,
      },
    ],
  },
  {
    content: '选项三',
    value: 3,
  },
  {
    content: '选项四',
    value: 4,
  },
];
</script>
