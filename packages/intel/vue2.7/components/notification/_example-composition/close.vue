<template>
  <div>
    <t-notification title="自定义关闭按钮(false)" content="这是一条消息通知" :closeBtn="false" />
    <t-notification title="自定义关闭按钮(文字)" content="这是一条消息通知" closeBtn="关闭" />
    <t-notification title="自定义关闭按钮(函数)" content="这是一条消息通知" :closeBtn="closeBtn" />
    <t-notification title="自定义关闭按钮(插槽)" content="这是一条消息通知">
      <template slot="closeBtn">x</template>
    </t-notification>
    <t-button variant="outline" @click="visible = !visible">处理开关事件</t-button>
    <t-button variant="outline" @click="visible2 = !visible2">处理定时关闭事件（3s）</t-button>
    <t-notification v-if="visible" @close-btn-click="visible = false" title="处理开关事件" content="这是一条消息通知" />
    <t-notification
      v-if="visible2"
      :duration="3000"
      @duration-end="visible2 = false"
      @close-btn-click="visible2 = false"
      title="处理定时关闭事件（3s）"
      content="这是一条消息通知"
    />
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue';

const visible = ref(false);
const visible2 = ref(false);
const closeBtn = () => <span>close</span>;
</script>

<style scoped>
.t-notification + .t-notification {
  margin-top: 20px;
}
.t-button {
  margin: 20px 20px 20px 0;
}
</style>
