<template>
  <div class="t-demo-message">
    <t-message theme="loading"> 用于表示操作正在生效的过程中 </t-message>
    <t-message :theme="status1"> 用于表示操作顺利达成(10s) </t-message>
    <t-message :theme="status2"> 用于表示普通操作失败中断(10s) </t-message>
    <t-button :disabled="isDisabled" @click="reset"> 重置 </t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status1: 'loading',
      status2: 'loading',
    };
  },
  computed: {
    isDisabled() {
      return this.status1 === 'loading' && this.status2 === 'loading';
    },
  },
  mounted() {
    this.fn1();
    this.fn2();
  },
  methods: {
    fn1() {
      setTimeout(() => {
        this.status1 = 'success';
      }, 10000);
    },
    fn2() {
      setTimeout(() => {
        this.status2 = 'warning';
      }, 10000);
    },
    reset() {
      this.status1 = 'loading';
      this.status2 = 'loading';
      this.fn1();
      this.fn2();
    },
  },
};
</script>

<style lang="less" scoped>
.t-demo-message {
  .t-message,
  .t-button {
    margin-bottom: 16px;
  }
}
</style>
