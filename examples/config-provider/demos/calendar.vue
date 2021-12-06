<template>
  <t-config-provider :global-config="globalConfig" style="padding: 16px">
    <t-calendar></t-calendar>
  </t-config-provider>
</template>

<script>
import { defineComponent } from 'vue';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const GLOBAL_CONFIG = {
  calendar: {
    yearSelection: '{year}',
    // 1 表示周一；7 表示周日
    firstDayOfWeek: 7,
    // monthSelection: '{month} month',
    monthSelection: ({ month }) => MONTHS[month - 1],
    yearRadio: 'Year',
    monthRadio: 'Month',
    hideWeekend: 'Hide Weekend',
    showWeekend: 'Show Weekend',
    today: 'Today',
    thisMonth: 'This Month',
    week: ['Monday', 'Tuesday', 'Wedsday', 'Thuresday', 'Friday', 'Staturday', 'Sunday'].join(),
    cellMonth: MONTHS.join(),
  },
};

export default defineComponent({
  setup() {
    return {
      globalConfig: GLOBAL_CONFIG,
    };
  },
});
</script>

<style scoped>
.tdesign-demo-item--locale-provider-base {
  margin: 24px -120px 0 0;
}
</style>
