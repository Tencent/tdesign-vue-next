<template>
  <t-chat ref="chatRef" layout="both" style="height: 150px" :clear-history="false" :reverse="false">
    <t-chat-reasoning v-model:collapsed="collapsed" expand-icon-placement="right" @expandChange="handleChange">
      <template #header>
        <t-chat-loading text="思考中..." />
      </template>
      <t-chat-content :content="reasoning" />
    </t-chat-reasoning>
  </t-chat>
</template>
<script setup lang="jsx">
import { ref } from 'vue';
const collapsed = ref(false);

setTimeout(() => {
  collapsed.value = true;
}, 3000);

// 流式数据加载中
const chatRef = ref(null);

const reasoning = `嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。
`;
const handleChange = (value) => {
  console.log(value);
};
</script>
<style lang="less" scoped></style>
