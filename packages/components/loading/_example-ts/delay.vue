<template>
  <t-space direction="vertical">
    <div>
      <t-loading v-if="loading" :delay="delay" size="small"></t-loading>
      <div v-if="data">loading 作为独立元素：{{ data }}</div>
    </div>

    <t-loading :loading="loading" :delay="delay" size="small">
      <div class="wrap">{{ data ? `loading 作为包裹元素：${data}` : '' }}</div>
    </t-loading>

    <t-space>
      <t-button size="small" @click="loadingData">快速重新加载数据（无loading）</t-button>
      <t-button size="small" @click="() => loadingData(1000)">慢速重新加载数据</t-button>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const loading = ref(true);
const data = ref('');
const delay = ref(500);
const loadingData = (time: number) => {
  loading.value = true;
  data.value = '';
  const timer = setTimeout(() => {
    loading.value = false;
    data.value = '数据加载完成，短时间的数据加载并未出现 loading';
    clearTimeout(timer);
  }, time || 100);
};
onMounted(() => {
  loadingData(250);
});
</script>
