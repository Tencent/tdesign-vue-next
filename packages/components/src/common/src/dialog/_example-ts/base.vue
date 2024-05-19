<template>
  <t-space>
    <t-button theme="primary" @click="onClick">基础确认对话框</t-button>
    <t-dialog
      v-model:visible="visible"
      header="对话框标题"
      width="40%"
      :confirm-on-enter="true"
      :on-cancel="onCancel"
      :on-esc-keydown="onEscKeydown"
      :on-close-btn-click="onCloseBtnClick"
      :on-overlay-click="onOverlayClick"
      :on-close="close"
      :on-confirm="onConfirmAnother"
    >
      <t-space direction="vertical" style="width: 100%">
        <div>
          <p>这是弹框内容</p>
          <p>This is Dialog Content</p>
        </div>
        <t-pagination v-model="current" v-model:pageSize="pageSize" :total="30" />
      </t-space>
    </t-dialog>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DialogProps, ButtonProps } from 'tdesign-vue-next';
const visible = ref(false);
const current = ref(1);
const pageSize = ref(10);
const onClick: ButtonProps['onClick'] = (context) => {
  console.log('点击了确认按钮，弹出弹窗', context);
  visible.value = true;
};
const onConfirmAnother: DialogProps['onConfirm'] = (context) => {
  console.log('点击了确认按钮', context);
  visible.value = false;
};
const close: DialogProps['onClose'] = (context) => {
  console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
};
const onCancel: DialogProps['onCancel'] = (context) => {
  console.log('点击了取消按钮', context);
};
const onEscKeydown: DialogProps['onEscKeydown'] = (context) => {
  console.log('按下了ESC', context);
};
const onCloseBtnClick: DialogProps['onCloseBtnClick'] = (context) => {
  console.log('点击了关闭按钮', context);
};
const onOverlayClick: DialogProps['onOverlayClick'] = (context) => {
  console.log('点击了蒙层', context);
};
</script>
