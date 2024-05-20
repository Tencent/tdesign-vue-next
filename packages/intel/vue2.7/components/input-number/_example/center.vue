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

<script>
export default {
  data() {
    return {
      // 如果希望默认显示为空，请使用 undefined
      value1: undefined,
      value2: 100,
      decimalValue: 3.41,
      error: undefined,
    };
  },
  computed: {
    tips() {
      if (this.error === 'exceed-maximum') return 'number can not be exceed maximum';
      if (this.error === 'below-minimum') return 'number can not be below minimum';
      return undefined;
    },
  },
  methods: {
    onNumberChange(v) {
      console.log(v);
    },
    handleChange(v, ctx) {
      console.info('change', v, ctx);
    },
    onValidate({ error }) {
      this.error = error;
    },
    handleFocus(v, ctx) {
      console.info('focus', v, ctx);
    },
    handleBlur(v, ctx) {
      console.info('blur', v, ctx);
    },
    handleKeydown(v, ctx) {
      console.info('keydown', v, ctx);
    },
    handleKeyup(v, ctx) {
      console.info('keyup', v, ctx);
    },
    handleKeypress(v, ctx) {
      console.info('keypress', v, ctx);
    },
    handleEnter(v, ctx) {
      console.info('enter', v, ctx);
    },
  },
};
</script>

<style>
/** 数字输入框过短换行时，则通过 CSS 调整宽度 */
.tdesign-demo__input-number-center .t-input__tips {
  width: 300px;
}
</style>
