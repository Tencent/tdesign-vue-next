<template>
  <div>
    <t-space break-line>
      <t-button theme="primary" @click="visible1 = true">提示反馈</t-button>
      <t-button theme="primary" @click="visible2 = true">成功反馈</t-button>
      <t-button theme="primary" @click="visible3 = true">警示反馈</t-button>
      <t-button theme="primary" @click="visible4 = true">错误反馈</t-button>
      <t-button theme="primary" @click="visible5 = true">自定义图标</t-button>
    </t-space>
    <t-dialog
      theme="info"
      header="提示"
      body="对话框内容"
      :visible.sync="visible1"
      @confirm="onConfirm"
      :onClose="close1"
      :cancelBtn="null"
    />
    <t-dialog
      theme="success"
      header="成功"
      body="对话框内容"
      :visible.sync="visible2"
      @confirm="onConfirm"
      :onClose="close2"
      :cancelBtn="null"
    />
    <t-dialog
      theme="warning"
      header="警示"
      body="对话框内容"
      :visible.sync="visible3"
      @confirm="onConfirm"
      :onClose="close3"
      :cancelBtn="null"
    />
    <t-dialog
      theme="danger"
      header="错误"
      body="对话框内容"
      :visible.sync="visible4"
      @confirm="onConfirm"
      :onClose="close4"
      :cancelBtn="null"
    />
    <t-dialog
      body="对话框内容"
      :closeBtn="false"
      :visible.sync="visible5"
      @confirm="onConfirm"
      :onClose="close5"
      :cancelBtn="null"
    >
      <div slot="header">
        <check-circle-filled-icon color="orange" />
        <span style="vertical-align: middle">对话框标题</span>
      </div>
    </t-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { CheckCircleFilledIcon } from 'tdesign-icons-vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const onConfirm = (context) => {
  const { e } = context;
  // todo something else here
  sendingRequest();
  visible1.value = false;
  visible2.value = false;
  visible3.value = false;
  visible4.value = false;
  visible5.value = false;
  e.stopPropagation();
};
const sendingRequest = () => {
  console.log('sending request');
};
const close1 = () => {
  visible1.value = false;
};
const close2 = () => {
  visible2.value = false;
};
const close3 = () => {
  visible3.value = false;
};
const close4 = () => {
  visible4.value = false;
};
const close5 = () => {
  visible5.value = false;
};
</script>
