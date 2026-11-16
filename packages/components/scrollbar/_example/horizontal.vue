<template>
  <div class="scrollbar-demo__box">
    <t-scrollbar :container="{ height: 148 }">
      <div class="scrollbar-demo__row">
        <div v-for="item in 12" :key="item" class="scrollbar-demo__card">{{ item }}</div>
      </div>
    </t-scrollbar>
  </div>
</template>

<style scoped>
.scrollbar-demo__box {
  width: 80%;
  border: 1px solid var(--td-component-stroke);
  border-radius: var(--td-radius-medium);
  overflow: hidden;
}

.scrollbar-demo__row {
  display: flex;
  gap: 12px;
  width: max-content;
  padding: 16px 16px 24px;
}

.scrollbar-demo__card {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 100px;
  border-radius: var(--td-radius-medium);
  background-color: var(--td-bg-color-secondarycontainer);
  color: var(--td-text-color-primary);
}
</style>
