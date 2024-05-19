<template>
  <div>
    <t-space break-line>
      <t-button theme="primary" @click="visible = true">默认位置</t-button>
      <t-button theme="primary" @click="visibleCenter = true">垂直居中</t-button>
      <t-button theme="primary" @click="visibleTop = true">自定义top</t-button>
      <t-button theme="primary" @click="visibleOverflow = true">文本溢出</t-button>
    </t-space>
    <t-dialog header="对话框标题" body="对话框内容" :visible="visible" :onClose="close1" :onConfirm="close1" />

    <t-dialog placement="center" header="对话框标题" :visible="visibleCenter" :onConfirm="close2" :onClose="close2">
      <p>水平居中显示的对话框</p>
    </t-dialog>
    <t-dialog
      :placement="placement"
      header="对话框标题"
      body="自定义对话框距离窗口顶部位置，top: 50px"
      :top="'30%'"
      :visible="visibleTop"
      :onConfirm="close3"
      :onClose="close3"
    />
    <t-dialog
      placement="center"
      header="文本溢出对话框标题"
      :visible="visibleOverflow"
      :onConfirm="close4"
      :onClose="close4"
    >
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
      <p>水平居中显示的文本溢出对话框</p>
    </t-dialog>
  </div>
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      visible: false,
      visibleCenter: false,
      visibleTop: false,
      visibleOverflow: false,
      placement: 'top',
      top: '50px',
    };
  },
  methods: {
    close1() {
      this.visible = false;
    },
    close2() {
      this.visibleCenter = false;
    },
    close3() {
      this.visibleTop = false;
    },
    close4() {
      this.visibleOverflow = false;
    },
  },
});
</script>
