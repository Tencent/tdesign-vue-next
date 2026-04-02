<template>
  <t-space>
    <t-dropdown :options="options" trigger="click" @click="clickHandler">
      <t-space>
        <t-button variant="text">
          更多
          <template #suffix> <t-icon name="chevron-down" size="16" /></template>
        </t-button>
      </t-space>
    </t-dropdown>
  </t-space>
</template>
<script lang="ts" setup>
import { MessagePlugin, DropdownProps } from 'tdesign-vue-next';
const options: DropdownProps['options'] = [
  {
    content: '操作一',
    value: 1,
  },
  {
    content: '操作二',
    value: 2,
  },
  {
    content: '操作三',
    value: 3,
  },
  {
    content: '操作四',
    value: 4,
  },
];
const clickHandler: DropdownProps['onClick'] = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
</script>
