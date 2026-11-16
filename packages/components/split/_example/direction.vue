<template>
  <t-space direction="vertical" size="large" style="width: 100%">
    <div class="split-demo split-demo--horizontal">
      <t-split :gap="8">
        <t-split-panel><div class="split-demo__panel">Left</div></t-split-panel>
        <t-split-panel><div class="split-demo__panel split-demo__panel--secondary">Right</div></t-split-panel>
      </t-split>
    </div>

    <div class="split-demo split-demo--vertical">
      <t-split direction="vertical" :gap="8">
        <t-split-panel default-size="40%"><div class="split-demo__panel">Top</div></t-split-panel>
        <t-split-panel><div class="split-demo__panel split-demo__panel--secondary">Bottom</div></t-split-panel>
      </t-split>
    </div>
  </t-space>
</template>

<style scoped>
.split-demo {
  width: 100%;
  border: 1px solid var(--td-component-border);
}

.split-demo--horizontal {
  height: 220px;
}

.split-demo--vertical {
  height: 320px;
}

.split-demo__panel {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--td-text-color-primary);
  background: var(--td-bg-color-container);
}

.split-demo__panel--secondary {
  background: var(--td-bg-color-secondarycontainer);
}
</style>
