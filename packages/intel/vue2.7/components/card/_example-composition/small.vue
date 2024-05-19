<template>
  <t-card
    :title="title"
    :actions="actions"
    size="small"
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
const actions = ref('操作');
const infoMessage = ref(`这是一段很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长的内容示例。`);
const clickHandler = () => {
  MessagePlugin.success('操作');
};
</script>
