<template>
  <div class="tdesign-demo-block-column">
    <div>
      <t-loading v-if="loading" :delay="delay" size="small" />
      <div class="switch-demo">
        <div v-if="data">独立元素：{{ data }}</div>
      </div>
    </div>

    <div class="wrap">
      <t-loading :loading="loading" :delay="delay" size="small">
        <div class="wrap">
          {{ data ? `包裹元素：${data}` : '' }}
        </div>
      </t-loading>
    </div>

    <div class="tdesign-demo-block-row">
      <t-button size="small" @click="loadingData"> 快速重新加载数据（无loading） </t-button>
      <t-button size="small" @click="() => loadingData(1000)"> 慢速重新加载数据 </t-button>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const loading = ref(true);
    const data = ref('');
    const delay = ref(500);
    const loadingData = (time) => {
      loading.value = true;
      data.value = '';
      const timer = setTimeout(() => {
        loading.value = false;
        data.value = '数据加载完成，短时间的数据加载并未出现 loading';
        clearTimeout(timer);
      }, time || 100);
    };

    onMounted(() => {
      loadingData();
    });

    return {
      loading,
      data,
      delay,
      loadingData,
    };
  },
});
</script>
