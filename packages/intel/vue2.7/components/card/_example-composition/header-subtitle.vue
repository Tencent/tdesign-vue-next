<template>
  <t-card
    :title="title"
    :subtitle="subtitle"
    :actions="actions"
    hover-shadow
    @actions="clickHandler"
    :style="{ width: '400px' }"
  >
    {{ infoMessage }}
  </t-card>
</template>
<script setup>
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue';

const title = ref('标题');
const subtitle = ref('副标题');
const actions = ref('操作');
const infoMessage = ref('卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。');
const clickHandler = () => {
  MessagePlugin.success('操作');
};
</script>
