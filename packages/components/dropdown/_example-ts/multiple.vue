<template>
  <t-space class="tdesign-demo-dropdown">
    <t-dropdown :options="options" :max-column-width="120" :max-height="200" @click="clickHandler">
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
    children: [
      {
        content: '选项十',
        value: 10,
      },
    ],
  },
  {
    content: '选项四',
    value: 4,
    children: [
      {
        content: '选项十一',
        value: 11,
      },
    ],
  },
  {
    content: '选项五',
    value: 5,
    children: [
      {
        content: '选项十二',
        value: 12,
      },
    ],
  },
  {
    content: '选项六',
    value: 6,
    children: [
      {
        content: '选项十三',
        value: 13,
      },
    ],
  },
  {
    content: '选项七',
    value: 7,
  },
  {
    content: '选项八',
    value: 8,
  },
  {
    content: '选项十八',
    value: 18,
    children: [
      {
        content: '选项十四',
        value: 14,
      },
      {
        content: '选项十五',
        value: 15,
      },
      {
        content: '选项十六',
        value: 16,
        children: [
          {
            content: '三级选项一',
            value: 20,
          },
          {
            content: '三级选项二',
            value: 21,
          },
        ],
      },
      {
        content: '选项十七',
        value: 17,
      },
    ],
  },
];
const clickHandler: DropdownProps['onClick'] = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
</script>
