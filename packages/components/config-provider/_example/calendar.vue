<template>
  <t-config-provider :global-config="globalConfig">
    <t-calendar />
  </t-config-provider>
</template>

<script setup>
import { merge } from 'lodash-es';
import enConfig from 'tdesign-vue-next/es/locale/en_US';

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

// 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
const globalConfig = merge({}, enConfig, {
  calendar: {
    yearSelection: '{year}',
    // 1 表示周一；7 表示周日
    firstDayOfWeek: 7,
    monthSelection: ({ month }) => MONTHS[month - 1],
    yearRadio: 'Year',
    monthRadio: 'Month',
    hideWeekend: 'Hide Weekend',
    showWeekend: 'Show Weekend',
    today: 'Today',
    thisMonth: 'This Month',
    week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].join(),
    cellMonth: MONTHS.join(),
    fillWithZero: false,
    controllerConfig: {
      year: {
        visible: true,
        selectProps: {
          size: 'small',
        },
      },
      month: {
        visible: true,
        selectProps: {
          size: 'small',
        },
      },
      mode: {
        visible: true,
        radioGroupProps: {
          size: 'small',
        },
      },
      weekend: {
        visible: true,
        showWeekendButtonProps: {
          size: 'small',
        },
        hideWeekendButtonProps: {
          size: 'small',
        },
      },
      current: {
        visible: true,
        currentDayButtonProps: {
          theme: 'warning',
          size: 'small',
        },
        currentMonthButtonProps: {
          theme: 'success',
          size: 'small',
        },
      },
    },
  },
});
</script>
