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
    <t-select
      v-model="value2"
      multiple
      filterable
      placeholder="请输入搜索"
      :options="options2"
      :loading="loading2"
      reserve-keyword
      style="width: 400px; display: inline-block"
      @search="remoteMethod2"
    />
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]);
const options2 = ref([]);
const value = ref('');
const value2 = ref([]);
const loading = ref(false);
const loading2 = ref(false);

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
      ];
    }, 500);
  }
};

const remoteMethod2 = (search) => {
  console.log(search);
  if (search) {
    loading2.value = true;
    setTimeout(() => {
      loading2.value = false;
      options2.value = [
        {
          value: `${search}_test1`,
          label: `${search}_test1`,
        },
        {
          value: `${search}_test2`,
          label: `${search}_test2`,
        },
        {
          value: `${search}_test3`,
          label: `${search}_test3`,
        },
      ];
    }, 500);
  }
};
</script>
