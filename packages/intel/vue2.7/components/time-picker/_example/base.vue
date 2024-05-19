<template>
  <t-space direction="vertical">
    <t-time-picker v-model="time1"> </t-time-picker>
    <t-time-picker v-model="time2"> </t-time-picker>
  </t-space>
</template>

<script>
export default {
  name: 'timePickerBase',
  data() {
    return {
      time1: '20:22',
      time2: '21:22',
    };
  },
};
</script>
