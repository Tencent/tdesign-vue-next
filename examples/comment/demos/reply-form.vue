<template>
  <t-comment avatar="https://tdesign.gtimg.com/list-icon.png">
    <template #content>
      <div class="form-container">
        <t-textarea v-model="replyData" placeholder="请输入内容" />
        <t-button @click="submitReply"> 回复 </t-button>
      </div>
    </template>
  </t-comment>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { NotifyPlugin } from '@tencent/tdesign-vue-next';

export default defineComponent({
  setup() {
    const replyData = ref('');

    const submitReply = () => {
      NotifyPlugin.info({
        title: '回复内容',
        content: this.replyData,
        duration: 3000,
      });
    };

    return {
      replyData,
      submitReply,
    };
  },
});
</script>

<style lang="less" scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
