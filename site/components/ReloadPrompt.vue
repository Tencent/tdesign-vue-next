<template>
  <div class="ReloadPrompt-container">
    <div v-if="offlineReady || needRefresh" class="ReloadPrompt-toast">
      <div class="ReloadPrompt-toast-message">
        <span v-if="offlineReady">App ready to work offline</span>
        <span v-else>New content available, click on reload button to update.</span>
      </div>
      <t-button v-if="needRefresh" size="small" :style="{ 'margin-right': '8px' }" @click="updateServiceWorker(true)">
        Reload
      </t-button>
      <t-button theme="default" size="small" @click="close"> Close </t-button>
    </div>
    <div class="ReloadPrompt-date">{buildDate}</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useRegisterSW } from 'virtual:pwa-register/vue';

export default defineComponent({
  setup() {
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

    const close = () => {
      offlineReady.value = false;
      needRefresh.value = false;
    };

    return {
      offlineReady,
      needRefresh,
      updateServiceWorker,
      close,
    };
  },
});
</script>
<style lang="less" scoped>
.ReloadPrompt-container {
  position: fixed;
  right: 24px;
  bottom: 40px;
  z-index: 400;
}
.ReloadPrompt-date {
  visibility: hidden;
}
.ReloadPrompt-toast {
  width: 240px;
  padding: 12px;
  border-radius: 3px;
  box-shadow: var(--popup-box-shadow);
  background-color: var(--bg-color-container);
  color: var(--text-primary);
}
.ReloadPrompt-toast-message {
  margin-bottom: 12px;
}
</style>
