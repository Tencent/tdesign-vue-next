<template>
  <t-space direction="vertical">
    <p>使用函数调用方式一:</p>
    <t-space>
      <t-button theme="primary" @click="createInstanceDialogPlugin">create-InstanceDialogPlugin</t-button>
      <t-button theme="primary" @click="showInstanceDialogPlugin">show-instanceDialogPlugin</t-button>
    </t-space>
  </t-space>
  <br />

  <t-space direction="vertical">
    <p>函数调用方式二:</p>
    <t-space>
      <t-button theme="primary" @click="confirmDialog">confirm-dialog</t-button>
    </t-space>
  </t-space>
  <br />

  <t-space direction="vertical">
    <p>函数调用方式三:</p>
    <t-space>
      <t-button theme="primary" @click="alertDialog">alert-dialog</t-button>
    </t-space>
  </t-space>
</template>
<script setup lang="ts">
import { IconFont } from 'tdesign-icons-vue-next';
import { Button, DialogInstance, DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { VNode } from 'vue';

// 函数调用方式一
let instanceDialogPluginOne: DialogInstance;

/**
 * 创建弹窗实例
 * 更新弹窗信息
 */
const createInstanceDialogPlugin = () => {
  instanceDialogPluginOne = DialogPlugin({
    header: 'Base-DialogPlugin',
    body: '使用 DialogPlugin创建实例,手动更新弹窗信息。',
    confirmBtn: '更新数据',
    onConfirm: (context: { e: MouseEvent | KeyboardEvent }) => {
      console.log(context);
      instanceDialogPluginOne.update({
        body: '数据已更新！',
        confirmBtn: {
          content: '已禁止',
          disabled: true,
        },
        cancelBtn: {
          content: '销毁实例',
          theme: 'danger',
          onClick: () => {
            instanceDialogPluginOne.destroy();
            instanceDialogPluginOne = null;
          },
        },
      });
    },
  });
};

// 手动展示已创建的弹窗实例
const showInstanceDialogPlugin = () => {
  console.log(instanceDialogPluginOne);
  if (!instanceDialogPluginOne) {
    MessagePlugin.error('还未创建弹窗实例');
    return;
  }
  instanceDialogPluginOne.show();
};

// 函数调用方式二
const confirmDialog = () => {
  const instanceDialogPluginTwo = DialogPlugin.confirm({
    header: 'Confirm-DialogPlugin',
    body: '使用 DialogPlugin.confirm打开弹窗',
    closeBtn: (h: (type: any, children: { name: string }) => VNode) => h(IconFont, { name: 'close-circle' }),
    confirmBtn: (h: (type: any, children: { content: string; theme: string; onClick: () => void }) => VNode) =>
      h(Button, { content: '关闭弹窗', theme: 'warning', onClick: () => instanceDialogPluginTwo.hide() }),
    onConfirm: (context: { e: MouseEvent | KeyboardEvent }) => {
      console.log(context);
      instanceDialogPluginTwo.hide();
    },
  });
};

// 函数调用方式三
const alertDialog = () => {
  const instanceDialogPluginThree = DialogPlugin.alert({
    header: 'Alert-DialogPlugin',
    body: '使用 DialogPlugin.alert打开弹窗',
    onConfirm: () => {
      instanceDialogPluginThree.hide();
    },
  });
};
</script>
