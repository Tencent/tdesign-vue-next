<template>
  <t-space direction="vertical" style="width: 100%">
    <t-radio-group v-model="theme" variant="default-filled">
      <t-radio-button value="normal">常规型</t-radio-button>
      <t-radio-button value="card">卡片型</t-radio-button>
    </t-radio-group>
    <t-radio-group v-model="scrollPosition" variant="default-filled">
      <t-radio-button value="auto">Auto</t-radio-button>
      <t-radio-button value="start">Start</t-radio-button>
      <t-radio-button value="center">Center</t-radio-button>
      <t-radio-button value="end">End</t-radio-button>
    </t-radio-group>
    <t-tabs v-model="value" :theme="theme" :scroll-position="scrollPosition">
      <t-tab-panel v-for="index in 30" :key="index" :value="index + ''" :label="`选项卡${index}`">
        <p style="padding: 25px">选项卡{{ index }}</p>
      </t-tab-panel>
    </t-tabs>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TabsProps } from 'tdesign-vue-next';
const value = ref('22');
const theme = ref<TabsProps['theme']>('normal');
const scrollPosition = ref<TabsProps['scrollPosition']>('auto');
</script>
