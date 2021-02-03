<template>
  <div class="tdesign-demo-block">
    <t-time-picker class="demos" v-model="time1" >

    </t-time-picker>
    <t-time-picker class="demos" v-model="time2">

    </t-time-picker>
  </div>
</template>

<script>
export default {
  name: 'timePickerBase',
  data() {
    return {
      time1: '20:22',
      time2: '21:22',
    };
  },
};
</script>

<style scoped>
  .demos{
    margin-top: 20px;
  }
</style>
