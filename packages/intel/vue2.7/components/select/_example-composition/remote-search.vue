<template>
  <!-- 远程搜索场景会改变 options 数组，导致无法检索历史选项，可通过将 valueType 改为 `object` 以从 value 中读取 `label`，解决无法回显的问题 -->

  <t-space>
    <t-select
      v-model="value"
      value-type="object"
      filterable
      placeholder="请选择"
      :onSearch="remoteMethod"
      :loading="loading"
      :options="options"
      style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
    />
    <t-select
      v-model="value2"
      value-type="object"
      multiple
      filterable
      placeholder="请输入搜索"
      :options="options2"
      @search="remoteMethod2"
      :loading="loading2"
      reserveKeyword
      style="width: 400px; display: inline-block"
    />
  </t-space>
</template>

<script setup>
import { ref, reactive } from 'vue';

const options = ref([
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
]);
const options2 = ref([]);
const value = reactive({});
const value2 = ref([]);
const loading = ref(false);
const loading2 = ref(false);
const remoteMethod = (search) => {
  console.log('search', search);
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    options.value = [
      {
        value: `${search}1`,
        label: `${search}test1`,
      },
      {
        value: `${search}2`,
        label: `${search}test2`,
      },
      {
        value: `${search}3`,
        label: `${search}test3`,
      },
    ];
  }, 500);
};
const remoteMethod2 = (search) => {
  console.log('search2', search);
  loading2.value = true;
  setTimeout(() => {
    loading2.value = false;
    options2.value = [
      {
        value: `${search}1`,
        label: `${search}test1`,
      },
      {
        value: `${search}2`,
        label: `${search}test2`,
      },
      {
        value: `${search}3`,
        label: `${search}test3`,
      },
    ];
  }, 500);
};
</script>
