<template>
  <t-space break-line>
    <t-button theme="primary" @click="showDialog">dialog</t-button>
    <t-button theme="primary" @click="handleDN">handleDialogNode</t-button>
    <t-button theme="primary" @click="onConfirm">confirm</t-button>
    <t-button theme="primary" @click="onAlert">alert</t-button>
    <t-button theme="primary" @click="onDialogPluginConfirm">DialogPlugin.confirm</t-button>
  </t-space>
</template>
<script>
import Vue from 'vue';
import { DialogPlugin } from 'tdesign-vue';

export default Vue.extend({
  data() {
    return {
      mydialog: null,
    };
  },
  methods: {
    // 每一次执行方法，都会创建一个新的弹框，可以通过保存弹框实例，重复利用。避免多次创建重复内容
    showDialog() {
      if (this.mydialog) {
        this.mydialog.show();
        return;
      }
      this.mydialog = this.$dialog({
        header: 'Dialog-Plugin',
        body: 'Plugin 方式创建新弹窗',
        className: 't-dialog-new-class1 t-dialog-new-class2',
        style: 'color: rgba(0, 0, 0, 0.6)',
        onConfirm: ({ e }) => {
          console.log('confirm clicked', e);
          this.mydialog.hide();
        },
      });
    },
    // 可以使用组件实例方法 update 更新弹框内容，参数同创建时一样
    handleDN() {
      const dialogNode = this.$dialog({
        header: 'Dialog-Plugin',
        body: '通过 update 更新弹框内容',
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
        body: '你确定要删除该项么？',
        confirmBtn: '确定',
        cancelBtn: '取消',
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
        body: '销毁后不能撤销',
        confirmBtn: {
          content: '确定!',
          variant: 'base',
          theme: 'danger',
        },
        onConfirm: ({ e }) => {
          console.log('confirm e: ', e);
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
        body: '你确定要删除么?',
        confirmBtn: '确定',
        cancelBtn: '取消',
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
p {
  line-height: 25px;
}
</style>
