<template>
  <div class="loading-wrap-demo">
    <t-loading size="small" :loading="loading" showOverlay>
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
    </t-loading>
    <br />
    <div>
      <t-button @click="loading = true" size="small">加载中</t-button>
      <t-button @click="loading = false" size="small">加载完成</t-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
};
</script>
<style scoped>
.loading-wrap-demo {
  width: 170px;
}
.loading-wrap-demo .t-button + .t-button {
  margin-left: 24px;
}
</style>
