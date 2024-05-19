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
<script>
import { MessagePlugin } from 'tdesign-vue';

export default {
  data() {
    return {
      title: '标题',
      subtitle: '副标题',
      actions: '操作',
      infoMessage: '卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。',
    };
  },
  methods: {
    clickHandler() {
      MessagePlugin.success('操作');
    },
  },
};
</script>
