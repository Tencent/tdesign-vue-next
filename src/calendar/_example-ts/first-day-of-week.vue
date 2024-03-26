<template>
  <t-space direction="vertical">
    <t-form layout="inline">
      <t-form-item label="第一列设为：">
        <t-select v-model="firstDayOfWeek" class="demo-select-base">
          <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
        </t-select>
      </t-form-item>
    </t-form>
    <t-calendar :first-day-of-week="firstDayOfWeek" />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CalendarProps } from 'tdesign-vue-next';
const options = [
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
];
const firstDayOfWeek = ref<CalendarProps['firstDayOfWeek']>(3);
</script>

<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
}
</style>
