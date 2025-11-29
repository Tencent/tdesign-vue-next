<template>
  <t-space direction="vertical">
    <h3>仅指定范围上限</h3>
    <t-form layout="inline">
      <t-form-item label="日历最大可选：">
        <t-date-picker v-model="maxDate" mode="month" :disable-date="{ before: '1970-01' }" allow-input />
      </t-form-item>
    </t-form>
    <t-calendar :range="range1" />
    <br />
    <h3>仅指定范围下限</h3>
    <t-form layout="inline">
      <t-form-item label="日历最小可选：">
        <t-date-picker v-model="minDate" mode="month" :disable-date="{ before: '1970-01' }" allow-input />
      </t-form-item>
    </t-form>
    <t-calendar :range="range2" />
    <br />
    <h3>指定范围上限和下限</h3>
    <t-form layout="inline">
      <t-form-item label="日历可选范围：">
        <t-date-range-picker v-model="range3" mode="month" :disable-date="{ before: '1970-01' }" allow-input />
      </t-form-item>
    </t-form>
    <t-calendar :range="range3" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const maxDate = ref('2028-04');
const minDate = ref('2018-08');

const range1 = ref(['', maxDate.value]);
const range2 = ref([minDate.value, '']);
const range3 = ref(['2018-08', '2028-04']);
</script>
