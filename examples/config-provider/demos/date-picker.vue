<template>
  <t-config-provider :global-config="globalConfig" class="tdesign-demo-item__locale-provider-date-picker">
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

<script>
import { defineComponent } from 'vue';

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

export default defineComponent({
  setup() {
    return {
      globalConfig: {
        datePicker: DATE_PICK_CONFIGS,
      },
    };
  },
});
</script>

<style scoped>
.tdesign-demo-item__locale-provider-date-picker {
  padding: 16px;
}
.tdesign-demo-item__locale-provider-date-picker .t-date-picker {
  width: 400px;
}
</style>
