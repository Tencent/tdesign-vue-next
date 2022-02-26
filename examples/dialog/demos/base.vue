<template>
  <div>
    <t-button theme="primary" @click="visible = true"> 基础确认对话框 </t-button>
    <t-dialog
      v-model:visible="visible"
      header="对话框标题"
      body="对话框内容"
      :on-cancel="onCancel"
      :on-esc-keydown="onEscKeydown"
      :on-close-btn-click="onCloseBtnClick"
      :on-overlay-click="onOverlayClick"
      :on-close="close"
      :on-confirm="onConfirmAnother"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const visible = ref(false);
const onConfirmAnother = (context) => {
  console.log('点击了确认按钮', context);
  visible.value = false;
};
const close = (context) => {
  console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
};
const onCancel = (context) => {
  console.log('点击了取消按钮', context);
};
const onEscKeydown = (context) => {
  console.log('按下了ESC', context);
};
const onCloseBtnClick = (context) => {
  console.log('点击了关闭按钮', context);
};
const onOverlayClick = (context) => {
  console.log('点击了蒙层', context);
};
</script>
