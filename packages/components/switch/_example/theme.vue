<template>
  <t-space direction="vertical" size="large">
    <div class="switch-theme-demo">
      <p>关闭状态</p>
      <t-space size="large">
        <t-switch />
        <t-switch theme="rectangle" />
        <t-switch theme="line" />
      </t-space>
    </div>

    <div class="switch-theme-demo">
      <p>启用状态</p>
      <t-space size="large">
        <t-switch :value="true" />
        <t-switch theme="rectangle" :value="true" />
        <t-switch theme="line" :value="true" />
      </t-space>
    </div>
  </t-space>
</template>

<style scoped>
.switch-theme-demo p {
  margin: 0 0 16px;
  color: var(--td-text-color-primary);
  font: var(--td-font-body-medium);
}
</style>
