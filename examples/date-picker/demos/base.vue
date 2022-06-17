<template>
  <div class="tdesign-demo-block-column">
    <h3>valueType:</h3>
    <t-radio-group v-model="valueType" variant="default-filled">
      <t-radio-button value="YYYY-MM-DD">YYYY-MM-DD</t-radio-button>
      <t-radio-button value="time-stamp">time-stamp</t-radio-button>
    </t-radio-group>

    <t-date-picker v-model="date2" :value-type="valueType" />
    <t-date-picker
      v-model="date"
      placeholder="可清除、可输入的日期选择器"
      :value-type="valueType"
      clearable
      allow-input
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const date = ref('');
const date2 = ref('');
const valueType = ref('YYYY-MM-DD');
</script>
