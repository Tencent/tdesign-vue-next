<template>
  <t-space size="large" align="start">
    <div>
      <div class="scrollbar-demo__label">height: 200</div>
      <div class="scrollbar-demo__box">
        <t-scrollbar :container="{ height: 300 }">
          <div v-for="item in 10" :key="item" class="scrollbar-demo__item">内容项 {{ item }}</div>
        </t-scrollbar>
      </div>
    </div>
    <div>
      <div class="scrollbar-demo__label">maxHeight: 200</div>
      <div class="scrollbar-demo__box">
        <t-scrollbar :container="{ maxHeight: 200 }">
          <div v-for="item in 10" :key="item" class="scrollbar-demo__item">内容项 {{ item }}</div>
        </t-scrollbar>
      </div>
    </div>
  </t-space>
</template>

<style scoped>
.scrollbar-demo__label {
  margin-bottom: 8px;
  color: var(--td-text-color-primary);
  font-size: 12px;
}

.scrollbar-demo__box {
  width: 240px;
  border: 1px solid var(--td-component-stroke);
  border-radius: var(--td-radius-medium);
  overflow: hidden;
}

.scrollbar-demo__item {
  padding: 12px 24px 12px 16px;
  border-bottom: 1px solid var(--td-component-stroke);
  color: var(--td-text-color-primary);
}

.scrollbar-demo__item:last-child {
  border-bottom: none;
}
</style>
