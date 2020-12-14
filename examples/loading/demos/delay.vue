<template>
  <div>
    <t-loading :loading="loading" :delay="delay"></t-loading>
    <div class="switch-demo">
      Loading state:
      <t-switch v-model="loading"></t-switch>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loadingBase',
  data() {
    return {
      loading: false,
      delay: 1000,
    };
  },
};
</script>
<style scoped>
.switch-demo {
  margin-top: 20px;
}
</style>
