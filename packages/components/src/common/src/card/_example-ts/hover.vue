<template>
  <t-card :title="title" :actions="actions" hover-shadow :style="{ width: '400px' }">
    {{ infoMessage }}
    <template #actions>
      <a href="javascript:void(0)" @click="clickHandler">操作</a>
    </template>
  </t-card>
</template>
<script lang="tsx" setup>
import { MessagePlugin, CardProps } from 'tdesign-vue-next';
const clickHandler = () => {
  MessagePlugin.success('操作');
};
const title: CardProps['title'] = '标题';
const actions: CardProps['actions'] = '操作';
const infoMessage = `卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。`;
</script>
