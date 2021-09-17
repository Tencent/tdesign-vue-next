<template>
  <div>
    <t-button theme="primary" @click="visible = true">基础确认对话框</t-button>
    <t-dialog
      header="对话框标题"
      body="对话框内容"
      v-model:visible="visible"
      :onConfirm="onConfirmAnother"
      :onCancel="onCancel"
      :onEscKeydown="onEscKeydown"
      :onCloseBtnClick="onCloseBtnClick"
      :onOverlayClick="onOverlayClick"
      :onClose="close"
    >
    </t-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onConfirm(context) {
      console.log('@confirm与onConfirm任选一种方式即可，其他几个事件类似', context);
      this.visible = false;
    },
    onConfirmAnother(context) {
      console.log('点击了确认按钮', context);
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
  },
};
</script>
