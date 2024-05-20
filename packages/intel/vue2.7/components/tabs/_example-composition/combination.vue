<template>
  <t-space direction="vertical" style="width: 100%" size="32px">
    <t-space>
      <t-radio-group variant="default-filled" v-model="theme">
        <t-radio-button value="normal">常规型</t-radio-button>
        <t-radio-button value="card">卡片型</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-tabs v-model="value" :theme="theme">
      <t-tab-panel v-for="(item, index) in 30" :key="index" :value="index + ''" :label="`选项卡${index + 1}`">
        <p style="padding: 25px">选项卡{{ index + 1 }}</p>
      </t-tab-panel>
    </t-tabs>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const theme = ref('normal');
const value = ref('21');
</script>
