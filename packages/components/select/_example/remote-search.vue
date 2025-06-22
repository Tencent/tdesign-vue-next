<template>
  <t-select v-model="value" multiple remote filterable @search="remoteMethod">
    <t-option v-for="{ label, value } in options" :key="value" :value="value" :label="label"> </t-option>
  </t-select>
</template>
<script setup>
import { ref, onMounted } from 'vue';

// 模拟远程全部数据
const wholeOptions = [
  {
    value: `test1`,
    label: `腾讯_test1`,
  },
  {
    value: `test2`,
    label: `腾讯_test2`,
  },
  {
    value: `test3`,
    label: `腾讯_test3`,
  },
  {
    value: `test4`,
    label: `腾讯_test4`,
  },
  {
    value: `test5`,
    label: `腾讯_test5`,
  },
];

const options = ref([]);
const value = ref(['test1', 'test3']);

// 回显初始值
const initValue = () => {
  if (value.value) {
    setTimeout(() => {
      options.value = wholeOptions;
    }, 500);
  }
};

const remoteMethod = (search) => {
  setTimeout(() => {
    options.value = wholeOptions.slice(0, 3).filter((item) => item.label.includes(search));
    console.log('options', options);
  }, 500);
};
onMounted(() => {
  initValue();
});
</script>
