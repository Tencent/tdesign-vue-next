<template>
  <t-space direction="vertical" :size="16">
    <t-space>
      <t-button @click="scrollbar?.scrollTo(0, 120)">scrollTo(0, 120)</t-button>
      <t-button @click="scrollbar?.scrollToEdge('bottom')">scrollToEdge('bottom')</t-button>
      <t-button @click="onGetValues">getValues()</t-button>
    </t-space>
    <div class="scrollbar-demo__box">
      <t-scrollbar ref="scrollbar" :container="{ height: 200 }">
        <div v-for="item in 20" :key="item" class="scrollbar-demo__item">内容项 {{ item }}</div>
      </t-scrollbar>
    </div>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ScrollbarInstanceFunctions } from 'tdesign-vue-next';

const scrollbar = ref<ScrollbarInstanceFunctions>();

const onGetValues = () => {
  console.log('getValues', scrollbar.value?.getValues());
};
</script>

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
