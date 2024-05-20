<template>
  <t-space direction="vertical" size="32px">
    <t-space>
      <t-radio-group variant="default-filled" v-model="theme">
        <t-radio-button value="normal">常规型</t-radio-button>
        <t-radio-button value="card">卡片型</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-tabs :value="value" :theme="theme" @change="(newValue) => (value = newValue)">
      <t-tab-panel value="first">
        <template #label> <home-icon style="margin-right: 4px" /> 首页 </template>
        <p style="padding: 25px">首页的内容</p>
      </t-tab-panel>
      <t-tab-panel value="second">
        <template #label> <calendar-icon style="margin-right: 4px" /> 日程 </template>
        <p style="padding: 25px">日程的内容</p>
      </t-tab-panel>
      <t-tab-panel value="third">
        <template #label> <layers-icon style="margin-right: 4px" /> 事项 </template>
        <p style="padding: 25px">事项的内容</p>
      </t-tab-panel>
    </t-tabs>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
import { HomeIcon, CalendarIcon, LayersIcon } from 'tdesign-icons-vue';

const theme = ref('normal');
const value = ref('first');
</script>
