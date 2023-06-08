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
      @enter="handleKeydownEnter"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
    ></t-input-number>
  </t-space>
</template>

<script setup lang="ts">
import { InputValue } from 'tdesign-vue-next';
import { ref, computed } from 'vue';

const value1 = ref('');
const value2 = ref(100);
const decimalValue = ref(3.41);
const error = ref(undefined);

const tips = computed(() => {
  if (error.value === 'exceed-maximum') return 'number can not be exceed maximum';
  if (error.value === 'below-minimum') return 'number can not be below minimum';
  return undefined;
});

const onValidate = (p: { error?: 'exceed-maximum' | 'below-minimum' }) => {
  error.value = p.error;
};

const handleChange = (
  value: InputValue,
  context?: { e?: InputEvent | MouseEvent | CompositionEvent; trigger: 'input' | 'initial' | 'clear' },
) => {
  console.info('change', value, context);
};
const handleFocus = (value: InputValue, context: { e: FocusEvent }) => {
  console.info('focus', value, context);
};
const handleBlur = (value: InputValue, context: { e: FocusEvent }) => {
  console.info('blur', value, context);
};
const handleKeydownEnter = (value: InputValue, context: { e: KeyboardEvent }) => {
  console.info('keydown-enter', value, context);
};
const handleKeydown = (value: InputValue, context: { e: KeyboardEvent }) => {
  console.info('keydown', value, context);
};
const handleKeyup = (value: InputValue, context: { e: KeyboardEvent }) => {
  console.info('keyup', value, context);
};
const handleKeypress = (value: InputValue, context: { e: KeyboardEvent }) => {
  console.info('keypress', value, context);
};
</script>
