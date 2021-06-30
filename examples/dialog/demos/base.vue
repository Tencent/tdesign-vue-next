<template>
  <div>
    <t-button theme="primary" @click="visible = true">基础确认对话框</t-button>
    <t-dialog
      header="对话框标题"
      body="对话框内容"
      :closeBtn="true"
      v-model:visible="visible"
      @click-confirm="onConfirm"
      :onClickConfirm="onConfirmAnother"
      :onClickCancel="onCancel"
      :onKeydownEsc="onKeydownEsc"
      :onClickCloseBtn="onClickCloseBtn"
      :onClickOverlay="onClickOverlay"
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
    onConfirm() {
      console.log('@click-confirm与onClickConfirm任选一种方式即可，其他几个事件类似');
      this.visible = false;
    },
    onConfirmAnother() {
      console.log('点击了确认按钮');
    },
    close() {
      console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发');
    },
    onCancel() {
      console.log('点击了取消按钮');
    },
    onKeydownEsc() {
      console.log('按下了ESC');
    },
    onClickCloseBtn() {
      console.log('点击了关闭按钮');
    },
    onClickOverlay() {
      console.log('点击了蒙层');
    },
  },
};
</script>
