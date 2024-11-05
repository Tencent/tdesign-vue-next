<template>
  <t-space direction="vertical">
    <div v-loading="loading1" class="loading-container">Loading...</div>
    <t-button size="small" :disabled="loading1" @click="handleLoading">v-loading</t-button>

    <div v-loading.fullscreen="loading2" class="loading-container">Loading...</div>
    <t-button size="small" :disabled="loading2" @click="handleLoadingFullscreen">v-loading.fullscreen</t-button>

    <div v-loading="customLoading" class="loading-container"></div>
    <t-button size="small" :disabled="customLoading.loading" @click="handleCustomLoading"
      >custom configuration for v-loading</t-button
    >
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ButtonProps } from 'tdesign-vue-next';
const loading1 = ref(false);
const loading2 = ref(false);
const customLoading = ref({
  loading: false,
  showOverlay: true,
  text: 'loading...',
});
const handleLoading: ButtonProps['onClick'] = () => {
  loading1.value = true;
  const timer = setTimeout(() => {
    loading1.value = false;
    clearTimeout(timer);
  }, 1000);
};
const handleLoadingFullscreen: ButtonProps['onClick'] = () => {
  loading2.value = true;
  const timer = setTimeout(() => {
    loading2.value = false;
    clearTimeout(timer);
  }, 1000);
};
const handleCustomLoading: ButtonProps['onClick'] = () => {
  customLoading.value = {
    ...customLoading.value,
    loading: true,
  };
  const timer = setTimeout(() => {
    customLoading.value = {
      ...customLoading.value,
      loading: false,
    };
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
</style>
