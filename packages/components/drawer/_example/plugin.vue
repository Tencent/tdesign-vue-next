<template>
  <t-space>
    <t-button theme="primary" @click="handleDrawer">handleDrawerNode</t-button>
    <t-button theme="primary" @click="onDrawerPlugin">DrawerPlugin</t-button>
  </t-space>
</template>
<script>
import { defineComponent } from 'vue';
import { DrawerPlugin } from 'tdesign-vue-next';

export default defineComponent({
  methods: {
    handleDrawer() {
      const drawerNode = this.$drawer({
        header: 'Drawer-Plugin',
        body: 'Hi, I am a drawer!',
      });
      // 更新内容
      drawerNode.update({
        header: 'Updated-Drawer-Plugin',
        cancelBtn: '',
        onConfirm: ({ e }) => {
          console.log('confirm button has been clicked!');
          console.log('e: ', e);
          // 隐藏
          drawerNode.hide();
        },
      });
    },

    onDrawerPlugin() {
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
    },
  },
});
</script>
