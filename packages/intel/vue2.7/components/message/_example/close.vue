<template>
  <t-space direction="vertical">
    <t-message v-if="isShowMsg" :closeBtn="true" @close-btn-click="isShowMsg = false"
    >点击关闭按钮触发事件 close-btn-click
    </t-message>

    <t-message v-if="closableMsg" closeBtn="关闭" @close-btn-click="closableMsg = false"
    >自定义关闭按钮（文字）</t-message
    >

    <t-message :closeBtn="closeBtn" v-if="closableMsg1">自定义关闭按钮（函数）</t-message>

    <t-message v-if="closableMsg2">
      自定义关闭按钮（插槽）
      <template #closeBtn>
        <div class="t-message__close" @click="closableMsg2 = false">
          <b>x</b>
        </div>
      </template>
    </t-message>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      isShowMsg: true,
      closableMsg: true,
      closableMsg1: true,
      closableMsg2: true,
    };
  },
  methods: {
    closeBtn() {
      return (
        <div
          class="t-message__close"
          onClick={() => {
            this.closableMsg1 = false;
          }}
        >
          <b>x</b>
        </div>
      );
    },
  },
};
</script>

<style lang="less" scoped>
.t-demo-message {
  .t-message,
  .t-button {
    margin-bottom: 16px;
  }
}
</style>
