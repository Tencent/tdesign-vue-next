<template>
  <div class="t-demo-message">
    <t-message v-if="isShowMsg" :close-btn="true" @click-close-btn="isShowMsg = false">
      点击关闭按钮触发事件 click-close-btn
    </t-message>

    <t-message v-if="closableMsg" close-btn="关闭" @click-close-btn="closableMsg = false">
      自定义关闭按钮（文字）
    </t-message>

    <t-message v-if="closableMsg1" :close-btn="closeBtn"> 自定义关闭按钮（函数） </t-message>

    <t-message v-if="closableMsg2">
      自定义关闭按钮（插槽）
      <template #closeBtn>
        <div class="t-message-close" @click="closableMsg2 = false">
          <b>x</b>
        </div>
      </template>
    </t-message>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isShowMsg = ref(true);
    const closableMsg = ref(true);
    const closableMsg1 = ref(true);
    const closableMsg2 = ref(true);

    return {
      isShowMsg,
      closableMsg,
      closableMsg1,
      closableMsg2,
      closeBtn() {
        return (
          <div
            class="t-message-close"
            onClick={() => {
              closableMsg1.value = false;
            }}
          >
            <b>x</b>
          </div>
        );
      },
    };
  },
});
</script>
<style lang="less" scoped>
.t-demo-message {
  .t-message,
  .t-button {
    margin-bottom: 16px;
  }
}
</style>
