<template>
  <t-space direction="vertical" :size="24" style="max-width: 500px">
    <!-- 内置 -->
    <t-input
      v-model="input1"
      :maxlength="5"
      show-limit-number
      placeholder="内置字数限制，最大文本长度，一个中文字等于一个长度"
    />

    <t-input
      v-model="input2"
      :maxcharacter="10"
      show-limit-number
      placeholder="内置字数限制，最大字符数量限制，一个中文字等于两个字符"
    />

    <t-input
      v-model="input3"
      :maxlength="5"
      show-limit-number
      allow-input-over-max
      placeholder="内置字数限制，字数超出时允许继续输入"
      :tips="errorTips"
      :status="errorTips ? 'error' : ''"
      @validate="onValidate"
    />

    <!-- 自定义 -->
    <t-input v-model="input4" :maxlength="5" :suffix="suffix" placeholder="自定义字数限制文本" />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      errorTips: '',
    };
  },

  computed: {
    suffix() {
      return `${[...this.input4].length}/5`;
    },
  },

  methods: {
    onValidate({ error }) {
      this.errorTips = error ? '输入内容长度不允许超过 5 个字' : '';
    },
  },
};
</script>
