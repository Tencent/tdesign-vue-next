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
    <t-date-picker mode="week" />
    <br /><br />
    <t-date-picker mode="week" range />
    <br /><br />
  </t-config-provider>
</template>

<script setup>
const DATE_PICK_CONFIGS = {
  dayjsLocale: 'en',
  placeholder: {
    date: 'select date',
    month: 'select month',
    year: 'select year',
    week: 'select week',
  },
  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rangeSeparator: ' ~ ',
  format: 'YYYYMMDD',
  yearAriaLabel: '',
  now: 'Now',
  selectTime: 'Select Time',
  selectDate: 'Select Date',
  weekAbbreviation: 'W',
};

const globalConfig = {
  datePicker: DATE_PICK_CONFIGS,
};
</script>
