<template>
  <t-breadcrumb :separator="() => '/'">
    <t-breadcrumbItem>页面1</t-breadcrumbItem>
    <t-breadcrumbItem>页面2 <icon name="chevron-down" /></t-breadcrumbItem>
    <t-breadcrumbItem>页面3</t-breadcrumbItem>
  </t-breadcrumb>
</template>
<script>
import { Icon } from 'tdesign-icons-vue';

export default {
  components: {
    Icon,
  },
};
</script>
