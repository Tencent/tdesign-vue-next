<template>
  <t-comment
    avatar="https://tdesign.gtimg.com/list-icon.png"
  >
    <template #content>
      <div class="form-container">
        <t-textarea
          placeholder="请输入内容"
          v-model="replyData"
        />
        <t-button @click="submitReply">回复</t-button>
      </div>
    </template>
  </t-comment>
</template>

<script>
import { NotifyPlugin } from '@tencent/tdesign-vue-next';

export default {
  name: 'replyForm',
  data() {
    return {
      replyData: '',
      NotifyPlugin,
    };
  },
  methods: {
    submitReply() {
      NotifyPlugin.info({
        title: '回复内容',
        content: this.replyData,
        duration: 3000,
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
</style>
