<template>
  <div class="setps-demo">
    <div class="tdesign-demo-block">
      <t-steps direction="vertical" :current="1" status="process">
        <t-step title="已完成的步骤" content="这里是提示文字"></t-step>
        <t-step title="进行中的步骤" content="这里是提示文字"></t-step>
        <t-step title="未进行的步骤" content="这里是提示文字"></t-step>
        <t-step title="未进行的步骤" content="这里是提示文字"></t-step>
      </t-steps>
      <div style="margin: 16px 0;"></div>
      <t-steps direction="vertical" sequence="reverse" :current="1" status="process">
        <t-step title="已完成的步骤" content="这里是提示文字"></t-step>
        <t-step title="进行中的步骤" content="这里是提示文字"></t-step>
        <t-step title="未进行的步骤" content="这里是提示文字"></t-step>
        <t-step title="未进行的步骤" content="这里是提示文字"></t-step>
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
