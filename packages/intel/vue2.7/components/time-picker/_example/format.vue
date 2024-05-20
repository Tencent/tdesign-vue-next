<template>
  <t-time-picker v-model="time" format="h:m:s a" />
</template>

<script>
export default {
  name: 'format',
  data() {
    return {
      time: '00:00:00 am',
    };
  },
};
</script>
