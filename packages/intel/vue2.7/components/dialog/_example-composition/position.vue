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
<script setup>
import { ref } from 'vue';

const visible = ref(false);
const visibleCenter = ref(false);
const visibleTop = ref(false);
const visibleOverflow = ref(false);
const placement = ref('top');
const close1 = () => {
  visible.value = false;
};
const close2 = () => {
  visibleCenter.value = false;
};
const close3 = () => {
  visibleTop.value = false;
};
const close4 = () => {
  visibleOverflow.value = false;
};
</script>
