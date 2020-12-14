<template>
  <div>
    <t-loading :loading="loading" :fullscreen="true" :preventScrollThrough="true">
      <div>this is loading component</div>
    </t-loading>
    <div class="switch-demo">
      Loading state:
      <t-switch v-model="loading" @change="onChange"></t-switch>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loadingBase',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onChange(value) {
      if (value) {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
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

