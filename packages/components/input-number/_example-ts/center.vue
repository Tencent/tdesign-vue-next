<template>
  <t-space direction="vertical">
    <t-input-number v-model="value1" :step="0.1" :max="5" auto-width />

    <!-- 失去焦点时，规范超出范围的数字 -->
    <t-input-number v-model="decimalValue" :step="0.18" :max="5" :allow-input-over-limit="false" style="width: 200px" />

    <!-- 数字超出范围仅提醒，不代用户做任何事情 -->
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
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown-enter="handleKeydownEnter"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
    ></t-input-number>
  </t-space>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { InputNumberProps } from 'tdesign-vue-next';
const value1 = ref('');
const value2 = ref(100);
const decimalValue = ref(3.41);
const error = ref(undefined);
const tips = computed<InputNumberProps['tips']>(() => {
  if (error.value === 'exceed-maximum') return 'number can not be exceed maximum';
  if (error.value === 'below-minimum') return 'number can not be below minimum';
  return undefined;
});
const onValidate: InputNumberProps['onValidate'] = (p) => {
  error.value = p.error;
};
const handleChange: InputNumberProps['onChange'] = (v, ctx) => {
  console.info('change', v, ctx);
};
const handleFocus: InputNumberProps['onFocus'] = (v, ctx) => {
  console.info('focus', v, ctx);
};
const handleBlur: InputNumberProps['onBlur'] = (v, ctx) => {
  console.info('blur', v, ctx);
};
const handleKeydownEnter: InputNumberProps['onKeydownEnter'] = (v, ctx) => {
  console.info('keydown-enter', v, ctx);
};
const handleKeydown: InputNumberProps['onKeydown'] = (v, ctx) => {
  console.info('keydown', v, ctx);
};
const handleKeyup: InputNumberProps['onKeyup'] = (v, ctx) => {
  console.info('keyup', v, ctx);
};
const handleKeypress: InputNumberProps['onKeypress'] = (v, ctx) => {
  console.info('keypress', v, ctx);
};
</script>
