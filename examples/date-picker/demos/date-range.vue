<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker mode="date" range :placeholder="['开始时间', '结束时间']" />
    <br />
    <br />
    <t-date-picker
      mode="date"
      range
      format="YYYY-MM-DD HH:mm:ss"
      enable-time-picker
      style="width: 350px"
      @pick="onPick"
      @change="onChange"
    />
  </div>
</template>

<script setup>
const onPick = (value, context) => console.log('onPick:', value, context);
const onChange = (value) => console.log('onChange:', value);
</script>
