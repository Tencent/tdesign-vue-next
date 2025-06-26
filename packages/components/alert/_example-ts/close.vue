<template>
  <t-space style="width: 100%" direction="vertical">
    <t-alert theme="success" message="这是一条成功的消息提示" :close-btn="true" />
    <t-alert theme="info" message="这是一条普通的消息提示" close-btn="知道了" @close="beforeClose" />
    <t-alert
      theme="warning"
      message="这是一条警示信息"
      :close-btn="warningClose"
      @close="beforeClose"
      @closed="handleClosed"
    />
    <t-alert theme="error" message="高危操作/出错信息提示">
      <template #close-btn>
        <t-tag variant="outline" theme="danger">关闭</t-tag>
      </template>
    </t-alert>
  </t-space>
</template>
<script lang="tsx" setup>
import { AlertProps } from 'tdesign-vue-next';
const beforeClose: AlertProps['onClose'] = () => window.confirm('确认关闭吗？');
const handleClosed: AlertProps['onClosed'] = () => {
  console.log('关闭');
};
const warningClose: AlertProps['close'] = () => 'FunctionPropClose';
</script>
