<template>
  <div>
    <p>主函数：this.$message({ content: '用户表示普通操作信息提示'})</p>
    <br>
    <div class='t-demo-message-main'>
      <t-button @click="$message({ content: '用户表示普通操作信息提示' })">普通信息</t-button>
      <t-button @click="$message({ content: '用户表示普通操作信息提示', closeBtn: true })">显示关闭按钮</t-button>
      <t-button @click="$message({ content: '用户表示普通操作信息提示', duration: 5000 })">设置显示时间</t-button>
      <t-button @click="$message({ content })">自定义内容</t-button>
      <t-button @click="$message({ content: '用户表示普通操作信息提示', closeBtn })">自定义关闭按钮</t-button>
    </div>
    <br>
    <p>主题调用：this.$message.info({content: '用户表示普通操作信息提示'})</p>
    <br>
    <div class='t-demo-message-theme'>
      <t-button @click="$message.info({content: '用户表示普通操作信息提示'})">info</t-button>
      <t-button @click="$message.success({content: '用户表示操作顺利达成'})">success</t-button>
      <t-button @click="$message.warning({content: '用户表示操作引起一定后果'})">warning</t-button>
      <t-button @click="$message.error({content: '用户表示操作引起严重的后果'})">error</t-button>
      <t-button @click="$message.question({content: '用于帮助用户操作的信息提示'})">question</t-button>
      <t-button @click="$message.loading({content: '用于表示操作正在生效的过程中'})">loading</t-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeBtn(close) {
      return <b class='t-message-close' onClick={close}>x</b>;
    },
    content() {
      return <div>操作有误，<a href='#'>前往查看</a></div>;
    },
  },
};
</script>

<style scoped>
  .t-button + .t-button {
    margin-left: 16px;
  }
</style>
