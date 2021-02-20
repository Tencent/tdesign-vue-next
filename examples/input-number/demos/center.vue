<template>
  <div>
    <t-input-number
      v-model="value"
      mode="row"
      size="medium"
      :max="15"
      :min="-2"
      :disabled="false"
      :on-change="onChange"
      :on-focus="onFocus"
      :on-blur="onBlur"
      :on-keydown-enter="onKeydownEnter"
      :on-keydown="onKeydown"
      :on-keyup="onKeyup"
      :on-keypress="onKeypress"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown-enter="handleKeydownEnter"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @keypress="handleKeypress"
    ></t-input-number>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3,
      onChange: (v, ctx) => {
        console.info('onChange', v, ctx);
      },
      onFocus: (v, ctx) => {
        console.info('onFocus', v, ctx);
      },
      onBlur: (v, ctx) => {
        console.info('onBlur', v, ctx);
      },
      onKeydownEnter: (v, ctx) => {
        console.info('onKeydownEnter', v, ctx);
      },
      onKeydown: (v, ctx) => {
        console.info('onKeydown', v, ctx);
      },
      onKeyup: (v, ctx) => {
        console.info('onKeyup', v, ctx);
      },
      onKeypress: (v, ctx) => {
        console.info('onKeypress', v, ctx);
      },
    };
  },
  methods: {
    handleChange(v, ctx) {
      console.info('change', v, ctx);
    },
    handleFocus(v, ctx) {
      console.info('focus', v, ctx);
    },
    handleBlur(v, ctx) {
      console.info('blur', v, ctx);
    },
    handleKeydownEnter(v, ctx) {
      console.info('keydown-enter', v, ctx);
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
  },
};
</script>
