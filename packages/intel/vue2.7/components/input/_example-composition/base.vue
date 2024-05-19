<template>
  <t-space direction="vertical" style="max-width: 500px">
    <t-input @focus="onFocus" />
    <t-input v-model="input" placeholder="请输入内容（有默认值）" @enter="onEnter" @change="onChange" />
    <t-input v-model="count" label="价格：" type="number" suffix="元" @change="onNumberChange" @focus="onNumberFocus" />

    <t-input placeholder="Search Input">
      <template #suffixIcon>
        <search-icon :style="{ cursor: 'pointer' }" />
      </template>
    </t-input>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
import { SearchIcon } from 'tdesign-icons-vue';

const input = ref('有默认值');
const count = ref(undefined);
const onFocus = (val) => {
  console.log(val, typeof val);
};
const onEnter = () => {
  console.log('trigger enter');
};
const onChange = (val) => {
  console.log('onChange', input.value, val);
};
const onNumberChange = (val) => {
  console.log('onNumberChange', count.value, val);
};
const onNumberFocus = (val) => {
  console.log(val);
};
</script>
