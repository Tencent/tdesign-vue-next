<template>
  <div>
    <p>插件调用方式一：this.$dialog(options)</p>
    <p>插件调用方式二：this.$dialog.confirm(options)</p>
    <p>插件调用方式三：this.$dialog.alert(options)</p><br>
    <t-button theme="primary" @click="showDialog">dialog</t-button>
    <t-button theme="primary" @click="handleDN">handleDialogNode</t-button>
    <t-button theme="primary" @click="onConfirm">confirm</t-button>
    <t-button theme="primary" @click="onAlert">alert</t-button>
  </div>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
  methods: {
    showDialog() {
      this.$dialog({
        header: 'Dialog-Plugin',
        body: 'Hi, darling! Do you want to be my lover?',
        onConfirm: (event, type) => {
          console.log('Yes, I do!');
          console.log('event: ', event);
          console.log('type: ', type);
        },
        onClose: (event, type) => {
          console.log('No, I don\'t!');
          console.log('event: ', event);
          console.log('type: ', type);
        },
      });
    },
    handleDN() {
      const dialogNode = this.$dialog({
        header: 'Dialog-Plugin',
        body: 'Hi, darling! Do you want to be my lover?',
      });
      dialogNode.hide();
      dialogNode.update({
        header: 'Updated-Dialog-Plugin',
      });
      dialogNode.show();
      setTimeout(() => {
        dialogNode.destroy();
      }, 2000);
    },
    onConfirm() {
      this.$dialog.confirm({
        header: 'Dialog-Confirm-Plugin',
        body: 'Are you sure to delete it?',
        confirmContent: 'ok',
        cancelContent: 'cancel',
        onConfirm: (event, type, close) => {
          console.log('event: ', event);
          console.log('confirm button has been clicked!');
          close();
        },
        onClose: (event, type, close) => {
          console.log('event: ', event);
          console.log('type: ', type);
          close();
        },
      });
    },
    onAlert() {
      this.$dialog.alert({
        header: 'Dialog-Alert-Plugin',
        body: 'Notice: Your balance is going to be empty.',
        confirmContent: {
          content: 'Got it!',
          theme: 'warning',
        },
        onConfirm: (event, type) => {
          console.log('event: ', event);
          console.log('type: ', type);
        },
        onClose: (event, type) => {
          console.log('event: ', event);
          console.log('type: ', type);
        },
      });
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
