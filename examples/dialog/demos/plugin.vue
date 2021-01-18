<template>
  <div>
    <p>插件调用方式一：this.$dialog(options)</p>
    <p>插件调用方式二：this.$dialog.confirm(options)</p>
    <p>插件调用方式三：this.$dialog.alert(options)</p><br>
    <t-button variant="base" theme="primary" @click="showDialog">dialog</t-button>
    <t-button variant="base" theme="primary" @click="handleDN">handleDialogNode</t-button>
    <t-button variant="base" theme="primary" @click="onConfirm">confirm</t-button>
    <t-button variant="base" theme="primary" @click="onAlert">alert</t-button>
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
        onConfirm: ({ e, trigger }) => {
          console.log('Yes, I do!');
          console.log('e: ', e);
          console.log('trigger: ', trigger);
        },
        onClose: ({ e, trigger }) => {
          console.log('No, I don\'t!');
          console.log('e: ', e);
          console.log('trigger: ', trigger);
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
        confirmBtn: 'ok',
        cancelBtn: 'cancel',
        onConfirm: ({ e, trigger, close }) => {
          console.log('confirm button has been clicked!');
          console.log('e: ', e);
          console.log('trigger: ', trigger);
          close();
        },
        onClose: ({ e, trigger, close }) => {
          console.log('e: ', e);
          console.log('trigger: ', trigger);
          close();
        },
      });
    },
    onAlert() {
      this.$dialog.alert({
        header: 'Dialog-Alert-Plugin',
        body: 'Notice: Your balance is going to be empty.',
        confirmBtn: {
          content: 'Got it!',
          variant: 'base',
          theme: 'danger',
        },
        onConfirm: ({ e, trigger }) => {
          console.log('e: ', e);
          console.log('trigger: ', trigger);
        },
        onClose: ({ e, trigger }) => {
          console.log('e: ', e);
          console.log('trigger: ', trigger);
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
