<template>
  <div class="loading-directive-demo">
    <div v-loading="loading1" class="loading-container">Loading...</div>
    <t-button size="small" :disabled="loading1" @click="handelLoading">支持指令</t-button>

    <div v-loading.fullscreen="loading2" class="loading-container">Loading...</div>
    <t-button size="small" :disabled="loading2" @click="handelLoadingFullscreen">支持 fullscreen 修饰符</t-button>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const loading1 = ref(false);
const loading2 = ref(false);

const handelLoading = () => {
  loading1.value = true;
  const timer = setTimeout(() => {
    loading1.value = false;
    clearTimeout(timer);
  }, 1000);
};

const handelLoadingFullscreen = () => {
  loading2.value = true;
  const timer = setTimeout(() => {
    loading2.value = false;
    clearTimeout(timer);
  }, 1000);
};
</script>

<style>
.loading-container {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px var(--component-border, #eee) solid;
}

.loading-directive-demo .t-button {
  margin: 20px auto;
}
</style>
