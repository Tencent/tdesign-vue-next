<template>
  <t-time-picker v-model="value" format="hh:mm:ss a" :hideDisabledTime="false" />
</template>

<script>
export default {
  name: 'twelveHours',
  data() {
    return {
      value: '10:20:30 am',
    };
  },
};
</script>
