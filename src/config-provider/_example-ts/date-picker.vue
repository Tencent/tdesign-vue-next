<template>
  <t-config-provider :global-config="globalConfig">
    <t-date-picker mode="date" :first-day-of-week="7" />
    <br /><br />
    <t-date-picker mode="date" range />
    <br /><br />
    <t-date-picker mode="month" />
    <br /><br />
    <t-date-picker mode="month" range />
    <br /><br />
    <t-date-picker mode="year" />
    <br /><br />
    <t-date-picker mode="year" range />
    <br /><br />
  </t-config-provider>
</template>

<script lang="ts" setup>
import { GlobalConfigProvider } from 'tdesign-vue-next';
const DATE_PICK_CONFIGS = {
  placeholder: {
    date: 'select date',
    month: 'select month',
    year: 'select year',
  },
  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rangeSeparator: ' ~ ',
  format: 'YYYYMMDD',
  yearAriaLabel: '',
  now: 'Now',
  selectTime: 'Select Time',
  selectDate: 'Select Date',
};
const globalConfig: GlobalConfigProvider = {
  datePicker: DATE_PICK_CONFIGS,
};
</script>
