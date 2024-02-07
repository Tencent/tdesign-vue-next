<template>
  <t-space direction="vertical">
    <h3>具备清空按钮</h3>
    <t-time-picker v-model="time1" />
    <h3>禁止清空按钮</h3>
    <t-time-picker v-model="time2" :clearable="false" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const time1 = ref('11:12:10');
const time2 = ref('11:12:10');
</script>
<style lang="less" scoped>
.tdesign-demo-block {
  h3 {
    margin-bottom: 20px;
    font-weight: bold;
  }
  h3:nth-child(3) {
    margin-top: 30px;
  }
}
</style>
