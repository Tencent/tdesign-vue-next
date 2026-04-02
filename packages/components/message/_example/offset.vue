<template>
  <t-space direction="vertical">
    <p>偏移量 offset 是相对于 placement 的偏移量，默认值：空，参数示例：{left, top, bottom, right}。</p>
    <t-button @click="showOffsetMsg">带 offset 信息位置</t-button>
  </t-space>
</template>

<script lang="ts" setup>
import { MessagePlugin, ButtonProps } from 'tdesign-vue-next';
const showOffsetMsg: ButtonProps['onClick'] = () => {
  MessagePlugin.info({
    content: '用户表示普通操作信息提示',
    placement: 'top',
    offset: ['50px', '-300px'],
  });
};
</script>
