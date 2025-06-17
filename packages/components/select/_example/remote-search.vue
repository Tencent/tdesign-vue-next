<template>
  <t-space direction="vertical" :style="{ width: '350px' }">
    <t-select
      v-model="value"
      filterable
      placeholder="请选择"
      :loading="loading"
      :options="options"
      @search="remoteMethod"
    />
    <t-select
      v-model="multipleValue"
      filterable
      placeholder="请选择"
      :loading="multipleLoading"
      :options="multipleOptions"
      multiple
      value-type="object"
      reserve-keyword
      @search="remoteMultipleMethod"
      @change="onChange"
    />
  </t-space>
</template>

<script setup>
import { ref, toRaw } from 'vue';

const options = ref([]);
const value = ref('');
const loading = ref(false);

const multipleOptions = ref([]);
const multipleValue = ref([]);
const multipleLoading = ref(false);

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

const remoteMultipleMethod = (search) => {
  console.log('search', search);
  if (search) {
    multipleLoading.value = true;
    setTimeout(() => {
      multipleLoading.value = false;
      const remoteOptions = [
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
        {
          value: `腾讯_test1_1`,
          label: `腾讯_test1_1`,
        },
        {
          value: `腾讯_test2_2`,
          label: `腾讯_test2_2`,
        },
        {
          value: `腾讯_test3_3`,
          label: `腾讯_test3_3`,
        },
      ].filter((item) => item.label.includes(search));

      const rawMultipleValue = multipleValue.value.map((item) => toRaw(item));
      const mergedOptions = [...remoteOptions, ...rawMultipleValue];
      multipleOptions.value = Array.from(new Map(mergedOptions.map((item) => [item.value, item])).values());
    }, 500);
  } else {
    multipleOptions.value = multipleValue.value;
  }
};
const onChange = (value) => {
  console.log('mergedOptions', value);
};
</script>
