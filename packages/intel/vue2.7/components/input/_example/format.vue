<template>
  <t-input
    v-model="input"
    :status="inputStatus"
    :format="format"
    placeholder="请输入数字"
    :tips="tips"
    style="max-width: 500px"
  />
</template>
<script>
export default {
  data() {
    return {
      input: '',
    };
  },
  computed: {
    inputStatus() {
      if (isNaN(+this.input)) {
        return 'error';
      }
      return '';
    },
    tips() {
      if (!this.inputStatus) {
        return '';
      }
      return '请输入数字';
    },
  },
  methods: {
    format(val) {
      const reg = /(\d)(?=(?:\d{3})+$)/g;
      const str = val.replace(reg, '$1,');
      return str;
    },
  },
};
</script>
