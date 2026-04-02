<template>
  <t-space direction="vertical">
    <t-space>
      <t-button @click="start = true">Start</t-button>
      <t-button @click="value = 98.12">Update value</t-button>
      <t-button @click="startAnimation">refs</t-button>
    </t-space>
    <t-statistic
      ref="refUp"
      title="Total Assets"
      suffix="%"
      :value="value"
      :animation="{
        valueFrom: 0,
        duration: 2000,
      }"
      :decimal-places="2"
      :animation-start="start"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { StatisticInstanceFunctions } from 'tdesign-vue-next';
const start = ref(false);
const value = ref(56.32);
const refUp = ref<StatisticInstanceFunctions>();
const startAnimation = () => {
  refUp.value.start();
};
</script>
