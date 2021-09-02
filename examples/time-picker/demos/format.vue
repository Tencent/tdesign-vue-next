<template>
  <div class="tdesign-demo-block">
    <t-time-picker class="demos" v-model="time" format="h:m:s a" />
  </div>
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
