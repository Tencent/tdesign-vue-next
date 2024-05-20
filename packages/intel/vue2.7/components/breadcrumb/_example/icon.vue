<template>
  <t-breadcrumb>
    <t-breadcrumbItem><icon name="bookmark" slot="icon" />页面1</t-breadcrumbItem>
    <t-breadcrumbItem><icon name="bookmark" slot="icon" />页面2</t-breadcrumbItem>
    <t-breadcrumbItem><icon name="bookmark" slot="icon" />页面3</t-breadcrumbItem>
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
