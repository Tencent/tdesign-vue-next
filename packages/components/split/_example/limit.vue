<template>
  <div class="split-demo">
    <t-split :gap="8" :panel-size="{ min: 100 }">
      <t-split-panel default-size="30%" :min="160" max="50%">
        <div class="split-demo__panel">
          <strong>Resizable</strong>
          <span>min: 160px, max: 50%</span>
        </div>
      </t-split-panel>
      <t-split-panel>
        <div class="split-demo__panel split-demo__panel--secondary">Resizable</div>
      </t-split-panel>
      <t-split-panel :resizable="false" default-size="25%">
        <div class="split-demo__panel">
          <strong>Fixed</strong>
          <span>resizable: false</span>
        </div>
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
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
  color: var(--td-text-color-primary);
  text-align: center;
  background: var(--td-bg-color-container);
}

.split-demo__panel span {
  color: var(--td-text-color-secondary);
}

.split-demo__panel--secondary {
  background: var(--td-bg-color-secondarycontainer);
}
</style>
