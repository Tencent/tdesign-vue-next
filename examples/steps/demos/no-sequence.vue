<template>
  <t-steps theme="dot" :current="current">
    <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="进行中的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
    <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
  </t-steps>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      current: 1,
    }
  }
});
</script>
