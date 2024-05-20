<template>
  <t-space direction="vertical" size="large">
    <t-steps :current="1" readonly>
      <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="进行中的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
    </t-steps>
    <t-steps :current="2" readonly>
      <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
      <t-step-item title="错误的步骤" status="error" content="这里是错误提示文字"></t-step-item>
      <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
    </t-steps>
  </t-space>
</template>
