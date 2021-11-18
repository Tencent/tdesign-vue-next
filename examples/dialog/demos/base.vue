<template>
  <div>
    <t-button
      theme="primary"
      @click="visible = true"
    >
      基础确认对话框
    </t-button>
    <t-dialog
      v-model:visible="visible"
      header="对话框标题"
      body="对话框内容"
      :on-confirm="onConfirmAnother"
      :on-cancel="onCancel"
      :on-esc-keydown="onEscKeydown"
      :on-close-btn-click="onCloseBtnClick"
      :on-overlay-click="onOverlayClick"
      :on-close="close"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    return {
      visible,
      onConfirmAnother(context) {
        console.log('点击了确认按钮', context);
        visible.value = false;
      },
      close(context) {
        console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
      },
      onCancel(context) {
        console.log('点击了取消按钮', context);
      },
      onEscKeydown(context) {
        console.log('按下了ESC', context);
      },
      onCloseBtnClick(context) {
        console.log('点击了关闭按钮', context);
      },
      onOverlayClick(context) {
        console.log('点击了蒙层', context);
      },
    };
  },
});
</script>
