<template>
  <div>
    <t-breadcrumb>
      <t-breadcrumbItem :to="{ path: '/' }"> 首页 </t-breadcrumbItem>
      <t-breadcrumbItem to="/vue/components/menu" :replace="true"> 页面1(覆盖路由) </t-breadcrumbItem>
      <t-breadcrumbItem href="https://www.tencent.com" :target="'_blank'"> 页面2 </t-breadcrumbItem>
      <t-breadcrumbItem href="/components/button" :disabled="true"> 页面3(disabled) </t-breadcrumbItem>
      <t-breadcrumbItem @click="onClickItem"> 页面4自定义点击 </t-breadcrumbItem>
    </t-breadcrumb>
    <div style="margin-top: 20px">点击计数器：{{ count }}</div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const count = ref(0);

    const onClickItem = () => {
      count.value += 1;
    };

    return {
      count,
      onClickItem,
    };
  },
});
</script>
