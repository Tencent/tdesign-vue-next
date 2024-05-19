<template>
  <t-space direction="vertical">
    <h3>未评分状态</h3>
    <t-rate />
    <h3>满分状态</h3>
    <t-rate v-model="value1" />
    <h3>半星状态</h3>
    <t-rate v-model="value2" allow-half />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      value1: 5,
      value2: 4.5,
    };
  },
};
</script>
