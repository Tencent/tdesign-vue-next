<template>
  <div class="t-demo-message">

    <t-message
      v-if="isShowDurationMsg"
      :duration="10000"
      @duration-end="isShowDurationMsg = false"
    >计时结束触发事件 duration-end（10s）</t-message>

    <t-button v-if="!isShowDurationMsg" @click="isShowDurationMsg = true">再次弹出计时信息</t-button>

    <t-message
      close
      v-if="isShowMsg"
      @click-close-btn="isShowMsg = false"
    >点击关闭按钮触发事件 click-close-btn </t-message>

    <t-message
      close="关闭"
      v-if="closableMsg"
      @click-close-btn="closableMsg = false"
    >自定义关闭按钮（文字）</t-message>

    <t-message :close="close" v-if="closableMsg1">自定义关闭按钮（函数）</t-message>

    <t-message v-if="closableMsg2">
      自定义关闭按钮（插槽）
      <template #close>
        <div class='t-message-close' @click="closableMsg2 = false">
          <b>x</b>
        </div>
      </template>
    </t-message>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMsg: true,
      isShowDurationMsg: true,
      closableMsg: true,
      closableMsg1: true,
      closableMsg2: true,
    };
  },
  methods: {
    close() {
      return (
        <div
          class='t-message-close'
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
