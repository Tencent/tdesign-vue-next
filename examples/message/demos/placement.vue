<template>
  <div>
    <div class="t-message-offset">
      <t-input placeholder='请输入横向偏移量' v-model="offsetX"></t-input>
      <t-input placeholder='请输入纵向偏移量' v-model="offsetY"></t-input>
    </div>
    <t-button @click="$message.success(msgList[0])">center</t-button>
    <t-button @click="$message.info(msgList[1])">top</t-button>
    <t-button @click="$message.warning(msgList[2])">left</t-button>
    <t-button @click="$message.loading(msgList[3])">right</t-button>
    <t-button @click="$message.warning(msgList[4])">bottom</t-button>
    <t-button @click="$message.error(msgList[5])">top-left</t-button>
    <t-button @click="$message.question(msgList[6])">top-right</t-button>
    <t-button @click="$message.warning(msgList[7])">bottom-left</t-button>
    <t-button @click="$message.warning(msgList[8])">bottom-right</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offsetX: '',
      offsetY: '',
    };
  },
  computed: {
    msgList() {
      return [
        { content: '用户表示操作顺利达成', placement: 'center' },
        { content: '用户表示普通操作信息提示', placement: 'top' },
        { content: '用户表示操作引起一定后果', placement: 'left' },
        { content: '用于表示操作正在生效的过程中', placement: 'right' },
        { content: '用于表示操作正在生效的过程中', placement: 'bottom' },
        { content: '用户表示操作引起严重的后果', placement: 'top-left' },
        { content: '用于帮助用户操作的信息提示', placement: 'top-right' },
        { content: '用于表示操作正在生效的过程中', placement: 'bottom-left' },
        { content: '用于表示操作正在生效的过程中', placement: 'bottom-right' },
      ].map(item => ({
        ...item,
        offset: [this.offsetX, this.offsetY],
      }));
    },
  },
};
</script>

<style scoped>
  .t-button {
    margin-right: 16px;
    margin-bottom: 16px;
  }
  .t-message-offset .t-input {
    width: 130px;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 36px;
  }
</style>
