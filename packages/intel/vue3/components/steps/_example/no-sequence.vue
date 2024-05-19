<template>
  <t-steps theme="dot" :current="current" readonly>
    <t-step-item title="已完成的步骤" content="这里是提示文字" />
    <t-step-item title="进行中的步骤" content="这里是提示文字" />
    <t-step-item title="未进行的步骤" content="这里是提示文字" />
    <t-step-item title="未进行的步骤" content="这里是提示文字" />
  </t-steps>
</template>

<script setup>
const current = 1;
</script>
