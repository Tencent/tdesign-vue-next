<template>
  <t-space direction="vertical">
    <t-input />

    <t-input v-model="input" placeholder="请输入内容（有默认值）" @enter="onEnter" @change="onChange" />

    <!-- label/suffix/suffixIcon 支持同名插槽 -->
    <t-input label="价格：" suffix="元" type="number" @change="onNumberChange" @focus="onFocus" @blur="onBlur" />

    <t-input placeholder="Search Input" clearable>
      <template #suffixIcon>
        <search-icon :style="{ cursor: 'pointer' }" />
      </template>
    </t-input>
  </t-space>
</template>
<script setup>
import { SearchIcon } from 'tdesign-icons-vue-next';
import { ref } from 'vue';

const input = ref('有默认值');
const onEnter = () => {
  console.log('trigger enter');
};
const onChange = (val) => {
  console.log(val);
};

const onFocus = (val, ctx) => {
  console.log('focus:', val, ctx);
};

const onBlur = (val, ctx) => {
  console.log('blur:', val, ctx);
};

const onNumberChange = (val, ctx) => {
  console.log(val, ctx);
};
</script>
