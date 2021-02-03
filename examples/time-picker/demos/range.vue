<template>
  <div class="tdesign-demo-block">
    <t-time-picker :value="time" />
  </div>
</template>

<script>
export default {
  name: 'timeRange',
  data() {
    return {
      time: undefined,
    };
  },
};
</script>

<style scoped>
.demos {
  margin-top: 20px;
}
</style>
