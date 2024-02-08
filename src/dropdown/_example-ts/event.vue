<template>
  <t-space>
    <t-dropdown :options="options" :min-column-width="88">
      <t-button variant="text">下拉菜单</t-button>
    </t-dropdown>
  </t-space>
</template>
<script lang="ts" setup>
import { MessagePlugin, DropdownProps } from 'tdesign-vue-next';
const options: DropdownProps['options'] = [
  {
    content: '选项一',
    value: 1,
    onClick: () => MessagePlugin.success('选项一'),
  },
  {
    content: '选项二',
    value: 2,
    onClick: () => MessagePlugin.success('选项二'),
  },
  {
    content: '选项三',
    value: 3,
    onClick: () => MessagePlugin.success('选项三'),
  },
  {
    content: '选项四',
    value: 4,
    onClick: () => MessagePlugin.success('选项四'),
  },
];
</script>
