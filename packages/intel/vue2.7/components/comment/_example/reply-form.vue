<template>
  <t-comment avatar="https://tdesign.gtimg.com/site/avatar.jpg">
    <template #content>
      <div class="form-container">
        <t-textarea placeholder="请输入内容" v-model="replyData" />
        <t-button class="form-submit" @click="submitReply">回复</t-button>
      </div>
    </template>
  </t-comment>
</template>

<script>
import { NotifyPlugin } from 'tdesign-vue';

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

  .form-submit {
    margin-top: 8px;
  }
}
</style>
