<template>
  <div>
    <t-notification title="自定义关闭按钮(false)" content="这是一条消息通知" :closeBtn="false" />
    <t-notification title="自定义关闭按钮(文字)" content="这是一条消息通知" closeBtn="关闭" />
    <t-notification title="自定义关闭按钮(函数)" content="这是一条消息通知" :closeBtn="closeBtn" />
    <t-notification title="自定义关闭按钮(插槽)" content="这是一条消息通知">
      <template slot="closeBtn">x</template>
    </t-notification>
    <t-button @click="visible = !visible">处理开关事件</t-button>
    <t-button @click="visible2 = !visible2">处理定时关闭事件（3s）</t-button>
    <t-notification
      v-if="visible"
      @click-close-btn="visible = false"
      title="处理开关事件"
      content="这是一条消息通知" />
    <t-notification
      v-if="visible2"
      :duration="3000"
      @duration-end="visible2 = false"
      @click-close-btn="visible2 = false"
      title="处理定时关闭事件（3s）"
      content="这是一条消息通知" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      visible2: false,
    };
  },
  methods: {
    closeBtn() {
      return (
        <span>close</span>
      );
    },
  },
};
</script>

<style scoped>
.t-notification + .t-notification{
  margin-top: 20px;
}
.t-button{
  margin: 20px 20px 20px 0;
}
</style>
