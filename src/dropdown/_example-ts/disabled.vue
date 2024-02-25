<template>
  <t-space>
    <t-dropdown :options="options" :min-column-width="112" @click="clickHandler">
      <t-button variant="text">
        下拉菜单
        <template #suffix> <chevron-down-icon size="16" /></template>
      </t-button>
    </t-dropdown>
  </t-space>
</template>
<script lang="ts" setup>
import { MessagePlugin, DropdownProps } from 'tdesign-vue-next';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
const clickHandler: DropdownProps['onClick'] = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
const options: DropdownProps['options'] = [
  {
    content: '选项一',
    value: 1,
  },
  {
    content: '选项二',
    value: 2,
  },
  {
    content: '选项三',
    value: 3,
    disabled: true,
  },
  {
    content: '选项四',
    value: 4,
    disabled: true,
  },
];
</script>
