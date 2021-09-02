<template>
  <div class="tdesign-demo-block">
    <t-time-range-picker class="demos" clearable v-model="time" format="HH:mm:ss" allowInput />
  </div>
</template>

<script>
export default {
  name: 'timeRange',
  data() {
    return {
      time: ['00:00:00', '23:59:59'],
    };
  },
};
</script>
