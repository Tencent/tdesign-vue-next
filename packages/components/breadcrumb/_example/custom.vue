<template>
  <t-breadcrumb>
    <template #default>
      <t-breadcrumb-item>页面1</t-breadcrumb-item>
      <t-breadcrumb-item>页面2</t-breadcrumb-item>
      <t-breadcrumb-item>页面3</t-breadcrumb-item>
    </template>
    <template #separator>
      <ArrowRightIcon />
    </template>
  </t-breadcrumb>
</template>

<script setup>
import { ArrowRightIcon } from 'tdesign-icons-vue-next';
</script>
