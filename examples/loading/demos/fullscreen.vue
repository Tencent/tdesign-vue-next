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
export default {
  name: 'FullScrennLoading',
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    loading(v) {
      if (v) {
        const timer = setTimeout(() => {
          this.loading = false;
          clearTimeout(timer);
        }, 1000);
      }
    },
  },
};
</script>
<style scoped>
.switch-demo {
  margin-top: 20px;
}
</style>
