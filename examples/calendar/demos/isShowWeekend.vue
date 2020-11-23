<template>
  <div>
    <div style="margin: 12px 0">
      <label>是否显示周末：</label>
      <t-switch v-model="isShowWeekendDefault"></t-switch>
    </div>
    <t-calendar :isShowWeekendDefault="isShowWeekendDefault"></t-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowWeekendDefault: false,
    };
  },
};
</script>
