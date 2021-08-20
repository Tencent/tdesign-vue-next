<template>
  <div class="loading-delay-demo">
    <div>
      <!-- loading 作为独立元素 -->
      <t-loading v-if="loading" :delay="delay" size="small"></t-loading>
      <div class="switch-demo">
        <div v-if="data">独立元素：{{ data }}</div>
      </div>
    </div>
    <br />
    <div class="wrap">
      <!-- loading 作为包裹元素 -->
      <t-loading :loading="loading" :delay="delay" size="small">
        <div class="wrap">{{ data ? `包裹元素：${data}` : '' }}</div>
      </t-loading>
    </div>
    <t-button @click="loadingData" size="small">快速重新加载数据（无loading）</t-button>
    <t-button @click="() => loadingData(1000)" size="small">慢速重新加载数据</t-button>
  </div>
</template>
<script>
export default {
  name: 'loadingBase',
  data() {
    return {
      loading: false,
      delay: 500,
      data: '',
    };
  },
  created() {
    this.loadingData();
  },
  methods: {
    loadingData(time) {
      this.loading = true;
      this.data = '';
      const timer = setTimeout(() => {
        this.loading = false;
        this.data = '数据加载完成，短时间的数据加载并未出现 loading';
        clearTimeout(timer);
      }, time || 100);
    },
  },
};
</script>
<style scoped>
.loading-delay-demo .t-button + .t-button {
  margin-left: 24px;
}

.switch-demo {
  margin-top: 20px;
}

.wrap {
  width: 200px;
  height: 80px;
}
</style>
