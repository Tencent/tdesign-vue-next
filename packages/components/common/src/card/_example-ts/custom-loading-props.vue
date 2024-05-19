<template>
  <t-card
    bordered
    title="自定义loadingProps"
    :loading="isLoading"
    :style="{ width: '400px' }"
    :loading-props="customProps"
  >
    {{ infoMessage }}
  </t-card>
</template>

<script lang="tsx" setup>
import { CardProps } from 'tdesign-vue-next';
const customProps: CardProps['loadingProps'] = {
  text: 'TDesign努力加载中...',
};
const isLoading: CardProps['loading'] = true;
const infoMessage = `卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。`;
</script>
