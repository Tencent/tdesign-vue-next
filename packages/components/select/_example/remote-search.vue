<template>
  <t-space direction="vertical">
    <t-select
      v-model="value"
      filterable
      placeholder="请选择"
      :loading="loading"
      :options="options"
      style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
      @search="remoteMethod"
    />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const options = ref([]);
const value = ref('');
const loading = ref(false);

const remoteMethod = (search) => {
  console.log('search', search);
  if (search) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = [
        {
          value: `腾讯_test1`,
          label: `腾讯_test1`,
        },
        {
          value: `腾讯_test2`,
          label: `腾讯_test2`,
        },
        {
          value: `腾讯_test3`,
          label: `腾讯_test3`,
        },
      ].filter((item) => item.label.includes(search));
    }, 500);
  }
};
</script>
