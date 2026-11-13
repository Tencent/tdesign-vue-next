<template>
  <div class="scrollbar-demo__box">
    <t-scrollbar :container="{ height: 240 }">
      <div v-for="item in 20" :key="item" class="scrollbar-demo__item">内容项 {{ item }}</div>
    </t-scrollbar>
  </div>
</template>

<style scoped>
.scrollbar-demo__box {
  width: 420px;
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
