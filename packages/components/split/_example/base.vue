<template>
  <div class="split-demo">
    <t-split :gap="8">
      <t-split-panel default-size="35%">
        <div class="split-demo__panel">Panel 1</div>
      </t-split-panel>
      <t-split-panel>
        <div class="split-demo__panel split-demo__panel--secondary">Panel 2</div>
      </t-split-panel>
    </t-split>
  </div>
</template>

<style scoped>
.split-demo {
  width: 100%;
  height: 280px;
  border: 1px solid var(--td-component-border);
}

.split-demo__panel {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px;
  color: var(--td-text-color-primary);
  background: var(--td-bg-color-container);
}

.split-demo__panel--secondary {
  background: var(--td-bg-color-secondarycontainer);
}
</style>
