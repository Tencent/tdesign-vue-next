<template>
  <div class="tdesign-demo-block">
    <t-time-picker v-model="time1" :steps="[1,2,3]" />
  </div>
</template>

<script>
export default {
  name: 'step',
  data() {
    return {
      time1: '09:18:17',
    };
  },
};
</script>
