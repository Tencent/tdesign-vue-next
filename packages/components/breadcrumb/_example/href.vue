<template>
  <t-space direction="vertical">
    <t-breadcrumb>
      <t-breadcrumb-item :to="{ path: '/' }">首页</t-breadcrumb-item>
      <t-breadcrumb-item to="/vue/components/menu" :replace="true">页面1(覆盖路由)</t-breadcrumb-item>
      <t-breadcrumb-item href="http://tdesign.tencent.com/" :target="'_blank'">页面2</t-breadcrumb-item>
      <t-breadcrumb-item href="http://tdesign.tencent.com/vue/components/button" :disabled="true"
        >页面3(disabled)</t-breadcrumb-item
      >
      <t-breadcrumb-item @click="onClickItem">页面4自定义点击</t-breadcrumb-item>
    </t-breadcrumb>
    <div style="margin-top: 20px">点击计数器：{{ count }}</div>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';

const count = ref(0);

const onClickItem = () => {
  count.value += 1;
};
</script>
