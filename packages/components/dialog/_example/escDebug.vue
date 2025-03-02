<template>
  <t-dialog v-model:visible="dialogVisible" header="对话框标题" width="40%">
    <t-space direction="vertical" style="width: 100%">
      <div>
        <p>这是弹框内容</p>
        <p>This is Dialog Content</p>
      </div>
    </t-space>
  </t-dialog>
  <div>
    <t-drawer v-model:visible="visible" header="header" :on-confirm="onClickConfirm" :close-btn="true">
      <p>This is a controlled drawer</p>
      <t-button theme="primary" @click="onClick">基础确认对话框</t-button>
    </t-drawer>
    <t-button variant="outline" @click="handleClick">打开抽屉</t-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const visible = ref(false);
const dialogVisible = ref(false);

const onClick = () => {
  dialogVisible.value = true;
};

const handleClick = () => {
  visible.value = true;
};

const onClickConfirm = () => {
  MessagePlugin.info('数据保存中...', 1000);
  const timer = setTimeout(() => {
    clearTimeout(timer);
    visible.value = false;
    MessagePlugin.info('数据保存成功!');
  }, 1000);
};
</script>
