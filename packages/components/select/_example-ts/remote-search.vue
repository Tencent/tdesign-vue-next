<template>
  <t-space direction="vertical" :style="{ width: '350px' }">
    <t-select
      v-model="singleValue"
      filterable
      placeholder="请选择"
      :loading="singleLoading"
      :options="singleOptions"
      @search="remoteMethodSingle"
    />

    <t-select
      v-model="multipleValue"
      multiple
      remote
      filterable
      :loading="multipleLoading"
      @search="remoteMethodMultiple"
    >
      <t-option v-for="{ label, value } in multipleOptions" :key="value" :value="value" :label="label"> </t-option>
    </t-select>
  </t-space>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Option {
  value: string;
  label: string;
}

// 模拟远程全部数据
const wholeOptions: Option[] = Array.from({ length: 20 }).map((_, i) => ({
  value: `test${i + 1}`,
  label: `腾讯_test${i + 1}`,
}));

// --- 单选选择器的状态 ---
const singleLoading = ref(false);
const singleOptions = ref<Option[]>([]);
const singleValue = ref('test1');

// --- 多选选择器的状态 ---
const multipleLoading = ref(false);
const multipleOptions = ref<Option[]>([]);
const multipleValue = ref(['test1', 'test8']);

// 初始值
const initMultipleValue = () => {
  singleLoading.value = true;
  multipleLoading.value = true;

  setTimeout(() => {
    singleOptions.value = wholeOptions;
    singleLoading.value = false;

    multipleOptions.value = wholeOptions;
    multipleLoading.value = false;
  }, 500);
};

// 单选选择器的远程搜索方法
const remoteMethodSingle = (search: string) => {
  singleLoading.value = true;
  setTimeout(() => {
    singleOptions.value = wholeOptions.slice(5, 15).filter((item) => item.label.includes(search));
    singleLoading.value = false;
  }, 500);
};

// 多选选择器的远程搜索方法
const remoteMethodMultiple = (search: string) => {
  multipleLoading.value = true;
  setTimeout(() => {
    multipleOptions.value = wholeOptions.slice(5, 15).filter((item) => item.label.includes(search));
    multipleLoading.value = false;
  }, 500);
};

onMounted(() => {
  initMultipleValue();
});
</script>
