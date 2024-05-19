<template>
  <t-space direction="vertical">
    <t-radio-group v-model="size" :options="sizeOptions"></t-radio-group>
    <t-descriptions bordered :size="size" :column="3">
      <t-descriptions-item label="Name">TDesign</t-descriptions-item>
      <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>
      <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>
      <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>
    </t-descriptions>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RadioGroupProps, DescriptionsProps } from 'tdesign-vue-next';
const sizeOptions: RadioGroupProps['options'] = ['large', 'medium', 'small'];
const size = ref<DescriptionsProps['size']>('medium');
</script>
