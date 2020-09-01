<template>
  <div>
    <p>函数式调用-传入对象：this.$message.info({ content: '用户表示普通操作信息提示', placement: 'right-top' })</p>
    <p>
      placement 默认值：top。<br>
      palcement 可选值：'top/center/left/left-top/right-top/right/right-bottom/bottom/left-bottom' 。
    </p>
    <br>
    <t-button @click="$message.info(msgList[0])">top</t-button>
    <t-button @click="$message.success(msgList[1])">center</t-button>
    <t-button @click="$message.warning(msgList[2])">left</t-button>
    <t-button @click="$message.error(msgList[3])">left-top</t-button>
    <t-button @click="$message.question(msgList[4])">right-top</t-button>
    <t-button @click="$message.loading(msgList[5])">right</t-button>
    <t-button @click="$message.warning(msgList[6])">right-bottom</t-button>
    <t-button @click="$message.warning(msgList[7])">bottom</t-button>
    <t-button @click="$message.warning(msgList[8])">left-bottom</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgList: [
        { content: '用户表示普通操作信息提示', placement: 'top' },
        { content: '用户表示操作顺利达成', placement: 'center' },
        { content: '用户表示操作引起一定后果', placement: 'left' },
        { content: '用户表示操作引起严重的后果', placement: 'left-top' },
        { content: '用于帮助用户操作的信息提示', placement: 'right-top' },
        { content: '用于表示操作正在生效的过程中', placement: 'right' },
        { content: '用于表示操作正在生效的过程中', placement: 'right-bottom' },
        { content: '用于表示操作正在生效的过程中', placement: 'bottom' },
        { content: '用于表示操作正在生效的过程中', placement: 'left-bottom' },
      ],
    };
  },
};
</script>

<style scoped>
  .t-button {
    margin-right: 16px;
    margin-bottom: 16px;
  }
</style>
