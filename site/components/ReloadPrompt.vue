<template>
  <div class="ReloadPrompt-container">
    <div class="ReloadPrompt-toast" v-if="offlineReady || needRefresh">
      <div class="ReloadPrompt-toast-message">
        <span v-if="offlineReady">App ready to work offline</span>
        <span v-else>New content available, click on reload button to update.</span>
      </div>
      <t-button v-if="needRefresh" size="small" @click="updateServiceWorker(true)">Reload</t-button>
      <t-button :style="{'margin-left': 12}" theme="default" size="small" @click="close">Close</t-button>
    </div>
    <div class="ReloadPrompt-date">{buildDate}</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default defineComponent({
  setup() {
    const {
      offlineReady: offlineReady,
      needRefresh: needRefresh,
      updateServiceWorker,
    } = useRegisterSW()

    const close = () => {
      offlineReady.value = false
      needRefresh.value = false
    }

    return {
      offlineReady,
      needRefresh,
      updateServiceWorker,
      close
    }
  }
})
</script>
<style lang="less" scoped>
.ReloadPrompt-container {
  position: fixed;
}
.ReloadPrompt-date {
  visibility: hidden;
}
.ReloadPrompt-toast {
  position: fixed;
  right: 24px;
  bottom: 100px;
  width: 270px;
  padding: 12px;
  border-radius: 3px;
  z-index: 1;
  box-shadow: var(--popup-box-shadow);
  background-color: var(--bg-color-container);
  color: var(--text-primary);
}
.ReloadPrompt-toast-message {
  margin-bottom: 12px;
}

</style>