<template>
  <t-config-provider :globalConfig="globalConfig" class="tdesign-demo-item__locale-provider-date-picker">
    <t-date-picker mode="date" :firstDayOfWeek="7" />
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
import { merge } from 'lodash-es'
import enConfig from 'tdesign-vue/es/locale/en_US';
// import dayjs from 'dayjs';

// 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
const DATE_PICK_CONFIGS = merge(enConfig, {
  placeholder: {
    date: 'select date',
    month: 'select month',
    year: 'select year',
  },
  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  rangeSeparator: ' ~ ',
  format: 'DD/MM/YYYY',
  yearAriaLabel: '',
  now: 'Now',
  selectTime: 'Select Time',
  selectDate: 'Select Date',
  // 暂不支持，讨论确认中
  // presets: {
  //   Today: 'Today',
  //   'Last 2 days': [dayjs().subtract(2, 'day'), dayjs()],
  //   'Last 7 days': [dayjs().subtract(7, 'day'), dayjs()],
  //   'Last 14 days': [dayjs().subtract(14, 'day'), dayjs()],
  //   'Last 30 days': [dayjs().subtract(30, 'day'), dayjs()],
  //   'Next 30 Days': [dayjs().subtract(30, 'day'), dayjs()],
  //   'Month to date': [dayjs().subtract(1, 'month'), dayjs()],
  // },
});

export default {
  data() {
    return {
      globalConfig: {
        datePicker: DATE_PICK_CONFIGS,
      },
    };
  },
};
</script>

<style scoped>
.tdesign-demo-item__locale-provider-date-picker {
  padding: 16px;
}
.tdesign-demo-item__locale-provider-date-picker .t-date-picker {
  width: 400px;
}
</style>
