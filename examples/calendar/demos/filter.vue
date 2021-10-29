<template>
  <div>
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
