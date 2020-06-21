<template>
  <div>
    <p>函数式调用-信息设置：this.$message.info('用户表示普通操作信息提示')</p>
    <br>
    <t-button @click="$message.info('用户表示普通操作信息提示')">info</t-button>
    <t-button @click="$message.success('用户表示操作顺利达成')">success</t-button>
    <t-button @click="$message.warning('用户表示操作引起一定后果')">warning</t-button>
    <t-button @click="$message.error('用户表示操作引起严重的后果')">error</t-button>
    <t-button @click="$message.question('用于帮助用户操作的信息提示')">question</t-button>
    <t-button @click="$message.loading('用于表示操作正在生效的过程中')">loading</t-button>
    <br><br>

    <p>函数式调用-时间设置：this.$message.info('用户表示普通操作信息提示', 10000)</p>
    <br>
    <t-button @click="$message.info('用户表示普通操作信息提示', 10000)">info</t-button>
    <t-button @click="$message.success('用户表示操作顺利达成', 10000)">success</t-button>
    <t-button @click="$message.warning('用户表示操作引起一定后果', 10000)">warning</t-button>
    <t-button @click="$message.error('用户表示操作引起严重的后果', 10000)">error</t-button>
    <t-button @click="$message.question('用于帮助用户操作的信息提示', 10000)">question</t-button>
    <t-button @click="$message.loading('用于表示操作正在生效的过程中', 10000)">loading</t-button>
    <br><br>


    <p>函数式调用-传入对象：this.$message.info({ default: '用户表示普通操作信息提示', duration: 1000 })</p>
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
      msgList: [
        { default: '用户表示普通操作信息提示', duration: 1000 },
        { default: '用户表示操作顺利达成', duration: 1000 },
        { default: '用户表示操作引起一定后果', duration: 1000 },
        { default: '用户表示操作引起严重的后果', duration: 1000 },
        { default: '用于帮助用户操作的信息提示', duration: 1000 },
        { default: '用于表示操作正在生效的过程中', duration: 1000 },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
  .t-button + .t-button {
    margin-left: 16px;
  }
</style>
