<template>
  <div class="loading-wrap-demo">
    <t-loading size="small" :loading="loading" show-overlay>
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
      <div>this is loading component</div>
    </t-loading>
    <br />
    <div>
      <t-button size="small" @click="loading = true"> 加载中 </t-button>
      <t-button size="small" @click="loading = false"> 加载完成 </t-button>
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
