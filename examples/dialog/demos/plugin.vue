<template>
  <div>
    <p>插件调用方式一：this.$dialog(options)</p>
    <p>插件调用方式二：this.$dialog.confirm(options)</p>
    <p>插件调用方式三：this.$dialog.alert(options)</p><br>
    <p>函数调用方式一：DialogPlugin(options)</p>
    <p>函数调用方式二：DialogPlugin.confirm(options)</p>
    <p>函数调用方式三：DialogPlugin.alert(options)</p><br>
    <p>组件实例：DialogInstance = this.$dialog(options) 或者 组件实例：DialogInstance = DialogPlugin(options)</p>
    <p>组件实例方法-销毁弹框：DialogInstance.destroy()</p>
    <p>组件实例方法-隐藏弹框：DialogInstance.hide()</p>
    <p>组件实例方法-显示弹窗：DialogInstance.show()</p>
    <p>组件实例方法-更新弹框：DialogInstance.update()</p><br>
    <t-button theme="primary" @click="showDialog">dialog</t-button>
    <t-button theme="primary" @click="handleDN">handleDialogNode</t-button>
    <t-button theme="primary" @click="onConfirm">confirm</t-button>
    <t-button theme="primary" @click="onAlert">alert</t-button>
    <t-button theme="primary" @click="onDialogPluginConfirm">DialogPlugin.confirm</t-button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { DialogPlugin } from '@/src/dialog';

export default defineComponent({
  data() {
    return {
      mydialog: '',
    };
  },
  methods: {
    showDialog() {
      if (this.mydialog) {
        this.mydialog.show();
        return;
      }
      this.mydialog = this.$dialog({
        header: 'Dialog-Plugin',
        body: 'Hi, darling! Do you want to be my lover?',
        className: 't-dialog-new-class1 t-dialog-new-class2',
        style: 'color: rgba(0, 0, 0, 0.6)',
        onConfirm: ({ e }) => {
          console.log('confirm clicked', e);
          this.mydialog.hide();
        },
      });
    },
    handleDN() {
      const dialogNode = this.$dialog({
        header: 'Dialog-Plugin',
        body: 'Hi, darling! Do you want to be my lover?',

      });
      // 更新弹框内容
      dialogNode.update({
        header: 'Updated-Dialog-Plugin',
        cancelBtn: '',
        onConfirm: ({ e }) => {
          console.log('confirm button has been clicked!');
          console.log('e: ', e);
          // 隐藏弹框
          dialogNode.hide();
        },
      });
    },
    onConfirm() {
      const confirmDia = this.$dialog.confirm({
        header: 'Dialog-Confirm-Plugin',
        body: 'Are you sure to delete it?',
        confirmBtn: 'ok',
        cancelBtn: 'cancel',
        onConfirm: ({ e }) => {
          console.log('confirm button has been clicked!');
          console.log('e: ', e);
          // 请求成功后，销毁弹框
          confirmDia.destroy();
        },
        onClose: ({ e, trigger }) => {
          console.log('e: ', e);
          console.log('trigger: ', trigger);
          confirmDia.hide();
        },
      });
    },
    onAlert() {
      const alertDia = this.$dialog.alert({
        header: 'Dialog-Alert-Plugin',
        body: 'Notice: Your balance is going to be empty.',
        confirmBtn: {
          content: 'Got it!',
          variant: 'base',
          theme: 'danger',
        },
        onConfirm: ({ e }) => {
          console.log('confrim e: ', e);
          alertDia.hide();
        },
        onClose: ({ e, trigger }) => {
          console.log('close e: ', e);
          console.log('trigger: ', trigger);
          alertDia.hide();
        },
      });
    },

    onDialogPluginConfirm() {
      const confirmDia = DialogPlugin.confirm({
        header: 'Dialog-Confirm-Plugin',
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
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
