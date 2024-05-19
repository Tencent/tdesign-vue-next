<template>
  <t-space>
    <t-button variant="outline" @click="closeFunc"> 自由控制关闭时机（{{ msg ? '关闭' : '打开' }}） </t-button>
  </t-space>
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
          // 层级控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
          zIndex: 1001,
          // 挂载元素控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
          attach: document.body,
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
