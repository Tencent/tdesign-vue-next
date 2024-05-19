<template>
  <t-space direction="vertical">
    <h3>禁用整个选择器</h3>
    <t-time-picker v-model="time1" :disabled="true" />
    <h3>禁用指定时间</h3>
    <t-time-picker :disable-time="disableTime" />
    <h3>禁用指定时间 同时展示禁用的时间选项</h3>
    <t-time-picker :disable-time="disableTime" :hideDisabledTime="false" />
  </t-space>
</template>

<script>
export default {
  name: 'Disabled',
  data() {
    return {
      time1: '11:12:10',
    };
  },
  methods: {
    disableTime(h) {
      const disableHour = [1, 2, 3];
      if (h > 4) {
        return {
          hour: disableHour,
          minute: [30, 31, 32, 33, 34],
        };
      }
      return {
        hour: disableHour,
      };
    },
  },
};
</script>
