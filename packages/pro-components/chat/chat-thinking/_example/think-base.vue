<template>
  <t-chat-thinking :content="content" status="pending" layout="border"> </t-chat-thinking>
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
const content = {
  title: '思考中',
  text: '嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。',
};
</script>
<style lang="less" scoped></style>
