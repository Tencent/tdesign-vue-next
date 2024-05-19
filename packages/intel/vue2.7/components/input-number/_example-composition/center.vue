<template>
  <t-space direction="vertical">
    <t-input-number v-model="value1" :step="0.1" :max="5" autoWidth />

    <t-input-number
      v-model="decimalValue"
      :step="0.18"
      :max="5"
      :allow-input-over-limit="false"
      @change="onNumberChange"
      style="width: 200px"
    />

    <t-input-number
      v-model="value2"
      theme="row"
      :max="15"
      :min="-2"
      :disabled="false"
      :tips="tips"
      suffix="个"
      style="width: 250px"
      @change="handleChange"
      @validate="onValidate"
      @blur="handleBlur"
      @focus="handleFocus"
      @enter="handleEnter"
    ></t-input-number>
  </t-space>
</template>

<script setup>
import { ref, computed } from 'vue';
// 如果希望默认显示为空，请使用 undefined
const value1 = ref(undefined);
const value2 = ref(100);
const decimalValue = ref(3.41);
const error = ref(undefined);
const tips = computed(() => {
  if (error.value === 'exceed-maximum') return 'number can not be exceed maximum';
  if (error.value === 'below-minimum') return 'number can not be below minimum';
  return undefined;
});
const onNumberChange = (v) => {
  console.log(v);
};
const handleChange = (v, ctx) => {
  console.info('change', v, ctx);
};
const onValidate = (r) => {
  error.value = r.error;
};
const handleFocus = (v, ctx) => {
  console.info('focus', v, ctx);
};
const handleBlur = (v, ctx) => {
  console.info('blur', v, ctx);
};
const handleEnter = (v, ctx) => {
  console.info('enter', v, ctx);
};
</script>

<style>
/** 数字输入框过短换行时，则通过 CSS 调整宽度 */
.tdesign-demo__input-number-center .t-input__tips {
  width: 300px;
}
</style>
