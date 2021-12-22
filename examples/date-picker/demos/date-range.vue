<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker mode="date" range :placeholder="['开始时间', '结束时间']" />
    <br />
    <br />
    <t-date-picker
      theme="primary"
      mode="date"
      range
      format="YYYY-MM-DD HH:mm:ss"
      enable-time-picker
      style="width: 350px"
    />
  </div>
</template>
