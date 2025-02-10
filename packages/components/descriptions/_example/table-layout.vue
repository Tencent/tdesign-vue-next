<template>
  <t-space direction="vertical">
    <t-row>
      <span>tableLayout: &nbsp;</span>
      <t-radio-group v-model="tableLayout" :options="tableLayoutOptions"></t-radio-group>
    </t-row>
    <t-descriptions title="Shipping address" bordered :table-layout="tableLayout">
      <t-descriptions-item label="Name">TDesign</t-descriptions-item>
      <t-descriptions-item label="Telephone Number">139****0609</t-descriptions-item>
      <t-descriptions-item label="Area">China Tencent Headquarters</t-descriptions-item>
      <t-descriptions-item label="Address">Shenzhen Penguin Island D1 4A Mail Center</t-descriptions-item>
    </t-descriptions>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const tableLayout = ref('fixed');

const tableLayoutOptions = ['fixed', 'auto'];
</script>
