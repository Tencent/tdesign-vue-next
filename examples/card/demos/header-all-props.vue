<template>
  <t-card
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :actions="actions"
    hover-shadow
    :style="{ width: '400px' }"
    @actions="clickHandler"
  >
    {{ infoMessage }}
  </t-card>
</template>
<script setup lang="jsx">
import { MessagePlugin } from 'tdesign-vue-next';

const clickHandler = () => {
  MessagePlugin.success('操作');
};

const title = '标题';
const subtitle = '副标题';
const description = '描述';
const actions = '操作';
const infoMessage = `这是一段很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长的内容示例。`;
</script>
