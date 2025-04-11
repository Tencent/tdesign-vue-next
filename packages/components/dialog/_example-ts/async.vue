<template>
  <t-space>
    <t-space>
      <t-button @click="visible = true">异步加载类按钮</t-button>
      <t-button @click="openAnotherDialog">插件函数异步加载</t-button>
    </t-space>
    <!-- :confirmLoading="true" -->
    <t-dialog
      v-model:visible="visible"
      header="保存订单"
      body="订单保存中，请稍后"
      :confirm-btn="{
        content: '保存中',
        theme: 'primary',
        loading,
      }"
      :on-confirm="onConfirm"
      :on-close="close"
    />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { DialogPlugin, DialogProps, ButtonProps } from 'tdesign-vue-next';
const visible = ref(false);
const loading = ref(false);
const close: DialogProps['onClose'] = () => {
  console.error('===close');
  visible.value = false;
};
const onConfirm: DialogProps['onConfirm'] = () => {
  loading.value = true;
  const timer = setTimeout(() => {
    loading.value = false;
    visible.value = false;
    clearTimeout(timer);
  }, 500);
};
const openAnotherDialog: ButtonProps['onClick'] = () => {
  const confirmDialog = DialogPlugin.confirm({
    header: '提交后不可再编辑会进入审批流程',
    body: '是否确认提交？',
    confirmBtn: {
      content: '提交',
      theme: 'primary',
      loading: false,
    },
    theme: 'warning',
    onConfirm: () => {
      confirmDialog.update({
        confirmBtn: {
          content: '提交中',
          loading: true,
        },
      });
      // confirmDialog.update({ confirmLoading: true });
      // confirmDialog.setConfirmLoading(true);
      const timer = setTimeout(() => {
        confirmDialog.update({
          confirmBtn: {
            content: '提交',
            loading: false,
          },
        });
        // confirmDialog.update({ confirmLoading: false });
        // confirmDialog.setConfirmLoading(false);
        confirmDialog.hide();
        clearTimeout(timer);
      }, 500);
    },
  });
};
</script>
