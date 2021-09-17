<template>
  <div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" :disableDate="disableDate"></t-date-picker>
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" :disableDate="disableDate2"></t-date-picker>
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" :disableDate="disableDate3"></t-date-picker>
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" range :disableDate="disableDate4"></t-date-picker>
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" :disableDate="getDisableDate" ></t-date-picker>
    </div>
  </div>

</template>
<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      // 禁用昨天、前天
      disableDate: [dayjs().subtract(1, 'day').format(), dayjs().subtract(2, 'day').format()],
      // 只可选择最近6天内的日期
      disableDate2: {
        before: dayjs().subtract(2, 'day').format(),
        after: dayjs().add(3, 'day').format(),
      },
      // 明后三天禁用
      disableDate3: {
        from: dayjs().add(1, 'day').format(),
        to: dayjs().add(3, 'day').format(),
      },
      disableDate4: {
        before: dayjs().subtract(2, 'day').format(),
        after: dayjs().add(10, 'day').format(),
      },
    };
  },
  methods: {
    getDisableDate(date) {
      // 禁用所有周六
      return dayjs(date).day() === 6;
    },
    onChange(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped>
.tdesign-demo-item--datepicker {
  margin-bottom: 12px;
}
</style>
