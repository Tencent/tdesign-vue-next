<template>
  <div>
    <t-space>
      <t-button theme="primary" @click="visible = true">默认位置</t-button>
      <t-button theme="primary" @click="visibleCenter = true">垂直居中</t-button>
      <t-button theme="primary" @click="visibleTop = true">自定义top</t-button>
      <t-button theme="primary" @click="visibleOverflow = true">垂直居中元素溢出场景</t-button>
    </t-space>

    <t-dialog header="对话框标题" body="对话框内容" :visible="visible" :on-close="close1" :on-confirm="close1" />
    <t-dialog
      placement="center"
      header="对话框标题"
      body="水平居中显示的对话框"
      :visible="visibleCenter"
      :on-confirm="close2"
      :on-close="close2"
    />
    <t-dialog
      :placement="placement"
      header="对话框标题"
      body="自定义对话框距离窗口顶部位置，top: 50px"
      :top="top"
      :visible="visibleTop"
      :on-confirm="close3"
      :on-close="close3"
    />
    <t-dialog placement="center" header="对话框标题" :visible="visibleOverflow" :on-confirm="close4" :on-close="close4">
      <p v-for="index in 45" :key="index">水平居中显示的对话框</p>
    </t-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const visibleCenter = ref(false);
const visibleTop = ref(false);
const visibleOverflow = ref(false);
const placement = 'top';
const top = '50px';

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
