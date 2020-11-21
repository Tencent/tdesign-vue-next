<template>
  <t-calendar theme="card"
              :firstDayOfWeek="firstDayOfWeek"></t-calendar>
</template>

<script>
export default {
  data() {
    return {
      firstDayOfWeek: 3,
    };
  },
};
</script>
