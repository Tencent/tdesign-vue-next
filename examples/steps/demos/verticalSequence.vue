<template>
  <div class="setps-demo">
    <div class="tdesign-demo-block">
      <t-steps direction="vertical" :current="1" status="process">
        <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
        <t-step-item title="进行中的步骤" content="这里是提示文字"></t-step-item>
        <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
        <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
      </t-steps>
      <div style="margin: 16px 0;"></div>
      <t-steps direction="vertical" sequence="reverse" :current="1" status="process">
        <t-step-item title="已完成的步骤" content="这里是提示文字"></t-step-item>
        <t-step-item title="进行中的步骤" content="这里是提示文字"></t-step-item>
        <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
        <t-step-item title="未进行的步骤" content="这里是提示文字"></t-step-item>
      </t-steps>
    </div>

  </div>
</template>

<style scoped>
.setps-demo .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
