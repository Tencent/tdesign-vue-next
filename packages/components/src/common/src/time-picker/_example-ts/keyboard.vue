<template>
  <t-space direction="vertical">
    <h3>允许输入</h3>
    <t-time-picker v-model="time1" allow-input @blur="blur" @focus="focus" />
    <h3>禁止输入</h3>
    <t-time-picker v-model="time2" :allow-input="false" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TimePickerProps } from 'tdesign-vue-next';
const time1 = ref('20:22:33');
const time2 = ref('22:22:22');
const blur: TimePickerProps['onBlur'] = (v) => {
  console.log('blur');
  console.log(v);
};
const focus: TimePickerProps['onFocus'] = (v) => {
  console.log('focus');
  console.log(v);
};
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
