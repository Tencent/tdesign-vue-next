<template>
  <t-space>
    <t-dropdown :options="options" @click="clickHandler">
      <t-space>
        <t-button variant="text">
          更多
          <template #suffix> <t-icon name="chevron-down" size="16" /></template>
        </t-button>
      </t-space>
    </t-dropdown>
  </t-space>
</template>
<script lang="tsx" setup>
import { MessagePlugin, DropdownProps } from 'tdesign-vue-next';
import { DiscountIcon } from 'tdesign-icons-vue-next';
const options: DropdownProps['options'] = [
  {
    content: '选项一',
    value: 1,
    prefixIcon: () => <DiscountIcon />,
  },
  {
    content: '选项二',
    value: 2,
    prefixIcon: () => <DiscountIcon />,
  },
  {
    content: '选项三',
    value: 3,
    prefixIcon: () => <DiscountIcon />,
  },
  {
    content: '选项四',
    value: 4,
    prefixIcon: () => <DiscountIcon />,
    children: [
      {
        content: '选项五',
        value: 5,
        prefixIcon: () => <DiscountIcon />,
      },
      {
        content: '选项六',
        value: 6,
        prefixIcon: () => <DiscountIcon />,
      },
    ],
  },
];
const clickHandler: DropdownProps['onClick'] = (data) => {
  MessagePlugin.success(`选中【${data.content}】`);
};
</script>
