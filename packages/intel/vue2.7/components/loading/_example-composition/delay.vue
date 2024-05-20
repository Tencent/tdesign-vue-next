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
<script setup>
import { onBeforeMount, ref } from 'vue';

const loading = ref(false);
const delay = ref(500);
const data = ref('');
const loadingData = (time) => {
  loading.value = true;
  data.value = '';
  const timer = setTimeout(() => {
    loading.value = false;
    data.value = '数据加载完成，短时间的数据加载并未出现 loading';
    clearTimeout(timer);
  }, time || 100);
};
onBeforeMount(() => {
  loadingData();
});
</script>
