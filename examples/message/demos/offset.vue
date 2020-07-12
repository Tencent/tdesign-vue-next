<template>
  <div>
    <p>
      偏移量 offset 是相对于 placement 的偏移量，默认值：空，参数示例：{left, top, bottom, right}。
    </p>
    <br>
    <t-button @click="this.showOffsetMsg">带 offset 信息位置</t-button>
    <br><br>

  </div>
</template>

<script>
export default {
  methods: {
    showOffsetMsg() {
      this.$message.info({
        default: '用户表示普通操作信息提示',
        placement: 'top',
        offset: {
          top: '50px',
          left: '-300px',
        },
      });
    },
  },
};
</script>

<style scoped>
  .t-button {
    margin-right: 16px;
    margin-bottom: 16px;
  }
</style>
