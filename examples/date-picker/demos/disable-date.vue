<template>
  <div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" :disable-date="disableDate" />
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" :disable-date="disableDate2" />
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" :disable-date="disableDate3" />
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" range :disable-date="disableDate4" />
    </div>
    <div class="tdesign-demo-item--datepicker">
      <t-date-picker theme="primary" mode="date" :disable-date="getDisableDate" />
    </div>
  </div>
</template>
<script setup>
import dayjs from 'dayjs';

const disableDate = [dayjs().subtract(1, 'day').format(), dayjs().subtract(2, 'day').format()];
const disableDate2 = {
  before: dayjs().subtract(2, 'day').format(),
  after: dayjs().add(3, 'day').format(),
};
const disableDate3 = {
  from: dayjs().add(1, 'day').format(),
  to: dayjs().add(3, 'day').format(),
};
const disableDate4 = {
  before: dayjs().subtract(2, 'day').format(),
  after: dayjs().add(10, 'day').format(),
};

const getDisableDate = (date) => {
  // 禁用所有周六
  return dayjs(date).day() === 6;
};
</script>
<style scoped>
.tdesign-demo-item--datepicker {
  margin-bottom: 12px;
}
</style>
