<template>
  <t-space size="large" direction="vertical">
    <t-space>
      <t-loading size="small" :loading="loading" showOverlay>
        <div>this is loading component</div>
        <div>this is loading component</div>
        <div>this is loading component</div>
        <div>this is loading component</div>
        <div>this is loading component</div>
      </t-loading>
    </t-space>
    <t-space :size="24">
      <t-button @click="loading = true" size="small">加载中</t-button>
      <t-button @click="loading = false" size="small">加载完成</t-button>
    </t-space>
  </t-space>
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
<style scoped></style>
