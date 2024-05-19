<template>
  <div>
    <t-button theme="primary" @click="visible = true">基础确认对话框</t-button>
    <!-- :onClose="onClose" 和 @close="onClose" 等效 -->
    <!-- :onConfirm="onConfirm" 和 @confirm="onConfirm" 等效 -->
    <!-- :onCancel="onCancel" 和 @cancel="onCancel" 等效 -->
    <!-- :onEscKeydown="onEscKeydown" 和 @escKeydown="onEscKeydown" 等效 -->
    <t-dialog
      header="对话框标题"
      body="对话框内容"
      :visible.sync="visible"
      @confirm="onConfirm"
      width="40%"
      :confirmOnEnter="true"
      :onConfirm="onConfirmAnother"
      :onCancel="onCancel"
      :onEscKeydown="onKeydownEsc"
      :onCloseBtnClick="onClickCloseBtn"
      :onOverlayClick="onClickOverlay"
      :onClose="close"
    >
      <t-space direction="vertical" style="width: 100%">
        <t-button theme="primary" @click="visible1 = true">弹窗二</t-button>
        <t-pagination v-model="current" :total="30" />
      </t-space>
    </t-dialog>
    <t-dialog header="对话框标题二" body="对话框内容二" :visible.sync="visible1" />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const visible = ref(false);
const visible1 = ref(false);
const current = ref(1);
const onConfirm = (context) => {
  console.log('@confirm与onConfirm任选一种方式即可，其他几个事件类似', context);
  visible.value = false;
};
const onConfirmAnother = (context) => {
  console.log('点击了确认按钮', context);
};
const close = (context) => {
  console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
};
const onCancel = (context) => {
  console.log('点击了取消按钮', context);
};
const onKeydownEsc = (context) => {
  console.log('按下了ESC', context);
};
const onClickCloseBtn = (context) => {
  console.log('点击了关闭按钮', context);
};
const onClickOverlay = (context) => {
  console.log('点击了蒙层', context);
};
</script>
