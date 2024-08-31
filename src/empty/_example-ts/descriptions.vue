<template>
  <t-empty :description="description" :title="title">
    <template #action>
      <t-button @click="goToIndex">返回首页</t-button>
    </template>
  </t-empty>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const title = ref('空状态 Empty');
const description = ref('暂无数据 Description');

const goToIndex = () => {
  console.log('go to index');
  location.href = '/';
};
</script>
