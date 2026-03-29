<template>
  <t-space>
    <t-button theme="primary" @click="handleDrawer">handleDrawerNode</t-button>
    <t-button theme="primary" @click="onDrawerPlugin">DrawerPlugin</t-button>
  </t-space>
</template>
<script setup>
import { DrawerPlugin } from 'tdesign-vue-next';

const handleDrawer = () => {
  const drawerNode = DrawerPlugin({
    header: 'Drawer-Plugin',
    body: 'Hi, I am a drawer!',
  });
  // 更新内容
  drawerNode.update({
    header: 'Updated-Drawer-Plugin',
    cancelBtn: '',
    className: 't-drawer-update-class',
    onConfirm: ({ e }) => {
      console.log('confirm button has been clicked!');
      console.log('e: ', e);
      // 隐藏
      drawerNode.hide();
    },
  });
};

const onDrawerPlugin = () => {
  const confirmDia = DrawerPlugin({
    header: 'Drawer-Confirm-Plugin',
    body: 'Are you sure to delete it?',
    confirmBtn: 'ok',
    cancelBtn: 'cancel',
    onConfirm: ({ e }) => {
      console.log('confirm button has been clicked!');
      console.log('e: ', e);
      confirmDia.hide();
    },
    onClose: ({ e, trigger }) => {
      console.log('e: ', e);
      console.log('trigger: ', trigger);
      confirmDia.hide();
    },
  });
};
</script>
