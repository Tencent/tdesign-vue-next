<template>
  <div>
    <t-notification title="自定义关闭按钮(false)" content="这是一条消息通知" :close-btn="false" />
    <t-notification title="自定义关闭按钮(文字)" content="这是一条消息通知" close-btn="关闭" />
    <t-notification title="自定义关闭按钮(函数)" content="这是一条消息通知" :close-btn="closeBtn" />
    <t-notification title="自定义关闭按钮(插槽)" content="这是一条消息通知">
      <template #closeBtn> x </template>
    </t-notification>
    <t-button variant="outline" @click="visible = !visible"> 处理开关事件 </t-button>
    <t-button variant="outline" @click="visible2 = !visible2"> 处理定时关闭事件（3s） </t-button>
    <t-notification v-if="visible" title="处理开关事件" content="这是一条消息通知" @click-close-btn="visible = false" />
    <t-notification
      v-if="visible2"
      :duration="3000"
      title="处理定时关闭事件（3s）"
      content="这是一条消息通知"
      @duration-end="visible2 = false"
      @click-close-btn="visible2 = false"
    />
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const visible2 = ref(false);
    return {
      visible,
      visible2,
      closeBtn() {
        return <span>close</span>;
      },
    };
  },
});
</script>

<style scoped>
.t-notification + .t-notification {
  margin-top: 20px;
}
.t-button {
  margin: 20px 20px 20px 0;
}
</style>
