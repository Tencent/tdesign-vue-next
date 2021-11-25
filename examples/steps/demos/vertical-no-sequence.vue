<template>
  <div class="setps-demo">
    <div class="tdesign-demo-block">
      <t-steps direction="vertical" theme="dot" :current="1">
        <t-step-item title="已完成的步骤" content="这里是提示文字" />
        <t-step-item title="进行中的步骤" content="这里是提示文字" />
        <t-step-item title="未进行的步骤" content="这里是提示文字" />
        <t-step-item title="未进行的步骤" content="这里是提示文字" />
      </t-steps>
      <t-steps direction="vertical" sequence="reverse" theme="dot" :current="1">
        <t-step-item title="已完成的步骤" content="这里是提示文字" />
        <t-step-item title="进行中的步骤" content="这里是提示文字" />
        <t-step-item title="未进行的步骤" content="这里是提示文字" />
        <t-step-item title="未进行的步骤" content="这里是提示文字" />
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
