<template>
  <div>
    <p>【调用关闭函数】如果不希望通过计时关闭，或者用户点击按钮关闭，也可以使用关闭函数。</p>
    <br>
    <t-button @click="closeFunc">
      自由控制关闭时机（{{ msg ? '关闭' : '打开' }}）
    </t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: null,
    };
  },
  methods: {
    // 自由控制关闭时机
    closeFunc() {
      if (!this.msg) {
        this.msg = this.$message.info({
          content: '调用关闭函数关闭信息提示框',
          duration: 0,
        });
      } else {
        // 关键代码
        // 另一种关闭方法：this.msg.then(ins => ins.close());
        this.$message.close(this.msg);
        this.msg = null;
      }
    },
  },
};
</script>
