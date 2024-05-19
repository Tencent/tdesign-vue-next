<template>
  <t-space class="tdesign-demo-dropdown">
    <t-dropdown :options="options" @click="clickHandler">
      <t-button variant="text">
        下拉菜单
        <template #suffix><chevron-down-icon size="16" /></template>
      </t-button>
    </t-dropdown>
  </t-space>
</template>
<script lang="ts" setup>
import { MessagePlugin, DropdownProps } from 'tdesign-vue-next';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
const options: DropdownProps['options'] = [
  {
    content: '选项一',
    value: 1,
    children: [
      {
        content: '选项九',
        value: 9,
      },
    ],
  },
  {
    content: '选项二',
    value: 3,
    children: [
      {
        content: '选项十',
        value: 10,
      },
    ],
  },
  {
    content: '危险操作',
    value: 4,
    theme: 'error',
    children: [
      {
        content: '危险操作一',
        value: 11,
        theme: 'error',
        children: [
          {
            content: '危险操作项',
            value: 13,
            theme: 'error',
          },
          {
            content: '操作项',
            value: 12,
          },
        ],
      },
    ],
  },
];
const clickHandler: DropdownProps['onClick'] = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
</script>
