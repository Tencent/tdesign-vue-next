<template>
  <t-space direction="vertical">
    <t-input />
    <t-input v-model="input" placeholder="请输入内容（有默认值）" @enter="onEnter" @change="onChange" />
    <!-- label/suffix/suffixIcon 支持同名插槽 -->
    <t-input label="价格：" suffix="元" />
    <t-input label="姓名：" placeholder="按后置图标进行搜索">
      <template #suffixIcon>
        <search-icon :style="{ cursor: 'pointer' }" />
      </template>
    </t-input>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';
import { SearchIcon } from 'tdesign-icons-vue-next';

const input = ref('有默认值');
const onEnter = () => {
  console.log('trigger enter');
};
const onChange = (val) => {
  console.log(val);
};
</script>
