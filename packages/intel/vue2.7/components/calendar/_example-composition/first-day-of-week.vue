<template>
  <t-space direction="vertical">
    <t-space size="small" align="center">
      <label>日历的第一列为：</label>
      <t-select v-model="firstDayOfWeek" class="demo-select-base">
        <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </t-select>
    </t-space>
    <t-calendar :firstDayOfWeek="firstDayOfWeek"></t-calendar>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const firstDayOfWeek = ref(3);
const options = ref([
  {
    value: 1,
    label: '周一',
  },
  {
    value: 2,
    label: '周二',
  },
  {
    value: 3,
    label: '周三',
  },
  {
    value: 4,
    label: '周四',
  },
  {
    value: 5,
    label: '周五',
  },
  {
    value: 6,
    label: '周六',
  },
  {
    value: 7,
    label: '周日',
  },
]);
</script>

<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
  margin: 0 10px 0 0;
}
</style>
