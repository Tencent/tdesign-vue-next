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
<script setup lang="ts">
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

type DropdownOption = { content: string; value: number };

const options: DropdownOption[] = [
  { content: '操作一', value: 1 },
  { content: '操作二', value: 2 },
  { content: '操作三', value: 3 },
  { content: '操作四', value: 4 },
];

const clickHandler = (dropdownItem: DropdownOption) => {
  console.log(dropdownItem);
  MessagePlugin.success(`选中【${dropdownItem.content}】`);
};
</script>
