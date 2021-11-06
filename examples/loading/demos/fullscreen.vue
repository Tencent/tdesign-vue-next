<template>
  <div>
    <t-loading :loading="loading" fullscreen> </t-loading>
    <div class="switch-demo">
      全局加载开关（开启加载1秒后自动归位）：
      <t-switch v-model="loading"></t-switch>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const loading = ref(false);
    
    watch(
      () => loading.value,
      (v) => {
        if (!v) return;
        const timer = setTimeout(() => {
          loading.value = false;
          clearTimeout(timer);
        }, 1000);
      }
    )

    return {
      loading
    }
  },
});
</script>
<style scoped>
.switch-demo {
  margin-top: 20px;
}
</style>
