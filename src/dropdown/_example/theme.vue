<template>
  <t-space class="tdesign-demo-dropdown">
    <t-dropdown :options="options" @click="clickHandler">
      <t-button variant="text">
        <t-space :size="0" class="tdesign-demo-dropdown__text">
          下拉菜单
          <chevron-down-icon size="16" />
        </t-space>
      </t-button>
    </t-dropdown>
  </t-space>
</template>
<script setup>
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const options = [
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
const clickHandler = (data) => {
  MessagePlugin.success(`选中【${data.value}】`);
};
</script>
<style lang="less" scoped>
.tdesign-demo-dropdown {
  &__text {
    display: inline-flex;
  }
}
</style>
