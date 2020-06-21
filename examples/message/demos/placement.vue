<template>
  <div>
    <p>函数式调用-传入对象：this.$message.info({ default: '用户表示普通操作信息提示', placement: 'right-top' })</p>
    <p>
      placement 默认值：top。<br>
      palcement 可选值：'top/center/left/left-top/right-top/right/right-bottom/bottom/left-bottom' 。
    </p>
    <br>
    <t-button @click="$message.info(msgList[0])">info</t-button>
    <t-button @click="$message.success(msgList[1])">success</t-button>
    <t-button @click="$message.warning(msgList[2])">warning</t-button>
    <t-button @click="$message.error(msgList[3])">error</t-button>
    <t-button @click="$message.question(msgList[4])">question</t-button>
    <t-button @click="$message.loading(msgList[5])">loading</t-button>
    <br><br>

  </div>
</template>

<script>
export default {
  data() {
    return {
      placement: 'right-top',
    };
  },
  computed: {
    msgList() {
      const _p = this.placement;
      return [
        { default: '用户表示普通操作信息提示', placement: _p },
        { default: '用户表示操作顺利达成', placement: _p },
        { default: '用户表示操作引起一定后果', placement: _p },
        { default: '用户表示操作引起严重的后果', placement: _p },
        { default: '用于帮助用户操作的信息提示', placement: _p },
        { default: '用于表示操作正在生效的过程中', placement: _p },
      ];
    },
  },
};
</script>

<style scoped>
  .t-button + .t-button {
    margin-left: 16px;
  }
</style>
