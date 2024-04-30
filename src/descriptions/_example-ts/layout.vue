<template>
  <t-space direction="vertical">
    <t-row>
      <span>layout：</span>
      <t-radio-group v-model="layout" :options="layoutOptions"></t-radio-group>
    </t-row>

    <t-row>
      <span>itemLayout：</span>
      <t-radio-group v-model="itemLayout" :options="itemLayoutOptions"></t-radio-group>
    </t-row>

    <t-descriptions title="Shipping address" bordered :layout="layout" :item-layout="itemLayout" :column="3">
      <t-descriptions-item label="Name">TDesign</t-descriptions-item>
      <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>
      <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>
      <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>
    </t-descriptions>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { DescriptionsProps, RadioGroupProps } from 'tdesign-vue-next';
const layout = ref<DescriptionsProps['layout']>('horizontal');
const itemLayout = ref<DescriptionsProps['itemLayout']>('horizontal');
const layoutOptions: RadioGroupProps['options'] = ['horizontal', 'vertical'];
const itemLayoutOptions: RadioGroupProps['options'] = ['horizontal', 'vertical'];
</script>
