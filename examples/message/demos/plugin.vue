<template>
  <div>
    <p>【方式一】函数式调用-信息设置：this.$message.info('用户表示普通操作信息提示')</p>
    <br>
    <div class='t-demo-message-theme'>
      <t-button @click="$message.info('用户表示普通操作信息提示')">info</t-button>
      <t-button @click="$message.success('用户表示操作顺利达成')">success</t-button>
      <t-button @click="$message.warning('用户表示操作引起一定后果')">warning</t-button>
      <t-button @click="$message.error('用户表示操作引起严重的后果')">error</t-button>
      <t-button @click="$message.question('用于帮助用户操作的信息提示')">question</t-button>
      <t-button @click="$message.loading('用于表示操作正在生效的过程中')">loading</t-button>
    </div>
    <br><br>

    <p>【方式一】函数式调用-时间设置：this.$message.info('用户表示普通操作信息提示', 1000)</p>
    <br>
    <div class='t-demo-message-duration'>
      <t-button @click="$message.info('用户表示普通操作信息提示', 1000)">info</t-button>
      <t-button @click="$message.success('用户表示操作顺利达成', 2000)">success</t-button>
      <t-button @click="$message.warning('用户表示操作引起一定后果')">warning</t-button>
      <t-button @click="$message.error('用户表示操作引起严重的后果', 4000)">error</t-button>
      <t-button @click="$message.question('用于帮助用户操作的信息提示', 5000)">question</t-button>
      <!-- 0 表示永远不自动消失 -->
      <t-button @click="$message.loading('用于表示操作正在生效的过程中', 0)">loading</t-button>
    </div>
    <br><br>


    <p>【方式二】函数式调用-传入对象：this.$message.info({ content: '用户表示普通操作信息提示', duration: 1000 })</p>
    <br>
    <div class='t-demo-message-obj'>
      <t-button @click="$message.info({ content: '用户表示普通操作信息提示' })">普通信息</t-button>
      <t-button @click="$message.success({ content: '用户表示操作顺利达成', closeBtn: true })">显示关闭按钮</t-button>
      <t-button @click="$message.warning({ content: '用户表示操作引起一定后果', duration: 0 })">设置显示时间</t-button>
      <t-button @click="$message.error({ content: '用户表示操作引起严重的后果', content })">自定义内容</t-button>
      <t-button @click="$message.question({ content: '用于帮助用户操作的信息提示', closeBtn })">自定义关闭按钮</t-button>
      <t-button @click="$message.loading({ content: '用于表示操作正在生效的过程中', duration: 0 })">loading</t-button>
    </div>
    <br><br>

    <p>【方式三】函数式调用-主函数：this.$message({ content: '用户表示普通操作信息提示', duration: 1000 })</p>
    <br>
    <div class='t-demo-message-main'>
      <t-button @click="$message({ content: '用户表示普通操作信息提示' })">普通信息</t-button>
      <t-button @click="$message({ theme: 'success', content: '用户表示操作顺利达成', closeBtn: true })">显示关闭按钮</t-button>
      <t-button @click="$message({ theme: 'warning', content: '用户表示操作引起一定后果', duration: 5000 })">设置显示时间</t-button>
      <t-button @click="$message({ theme: 'error', content: '用户表示操作引起严重的后果', content })">自定义内容</t-button>
      <t-button @click="$message({ theme: 'question', content: '用于帮助用户操作的信息提示', closeBtn })">自定义关闭按钮</t-button>
      <t-button @click="$message({ theme: 'loading', content: '用于表示操作正在生效的过程中', duration: 1000 })">loading</t-button>
    </div>
    <br><br>
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
