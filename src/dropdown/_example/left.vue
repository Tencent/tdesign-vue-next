<template>
  <t-space>
    <t-dropdown :options="options" :max-column-width="120" direction="left" @click="clickHandler">
      <t-button variant="text">
        下拉菜单
        <template #suffix>
          <chevron-down-icon size="16" />
        </template>
      </t-button>
    </t-dropdown>
  </t-space>
</template>
<script setup lang="ts">
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

type DropdownOption = {
  content: string;
  value: number;
  children: {
    content: string;
    value: number;
    children?: {
      content: string;
      value: number;
    }[];
  }[];
};

const options: DropdownOption[] = [
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
        children: [
          {
            content: '选项七',
            value: 7,
          },
          {
            content: '选项八',
            value: 8,
          },
        ],
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
];

const clickHandler = (dropdownItem: DropdownOption) => {
  console.log(dropdownItem);
  MessagePlugin.success(`选中【${dropdownItem.content}】`);
};
</script>
