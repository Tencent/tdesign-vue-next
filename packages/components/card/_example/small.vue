<template>
  <t-card :title="title" :actions="actions" size="small" hover-shadow :style="{ width: '400px' }">
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
const infoMessage = `这是一段很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长的内容示例。`;
</script>
