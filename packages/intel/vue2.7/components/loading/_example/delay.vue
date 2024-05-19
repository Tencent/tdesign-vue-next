<template>
  <t-space direction="vertical">
    <t-space>
      <t-loading v-if="loading" :delay="delay" size="small"></t-loading>
      <div v-if="data">loading 作为独立元素：{{ data }}</div>
    </t-space>

    <div>
      <t-loading :loading="loading" :delay="delay" size="small" showOverlay>
        <div>{{ data ? `loading 作为包裹元素：${data}` : '' }}</div>
      </t-loading>
    </div>

    <t-space>
      <t-button @click="loadingData" size="small">快速重新加载数据（无loading）</t-button>
      <t-button @click="() => loadingData(1000)" size="small">慢速重新加载数据</t-button>
    </t-space>
  </t-space>
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
