<template>
  <t-steps theme="dot" :current="current">
    <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="进行中的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
  </t-steps>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
    };
  },
};
</script>
