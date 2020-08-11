<template>
  <div>
    <p>插件调用方式一：this.$dialog(options)</p>
    <p>插件调用方式二：this.$dialog.confirm(options)</p>
    <p>插件调用方式三：this.$dialog.alert(options)</p><br>
    <t-button theme="primary" @click="showDialog">dialog</t-button>
    <t-button theme="primary" @click="onConfirm">confirm</t-button>
    <t-button theme="primary" @click="onAlert">alert</t-button>
  </div>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showDialog() {
      this.$dialog({
        header: 'Dialog-Plugin',
        body: 'Hi, darling! Do you want to be my lover?',
      }).then(({ confirm, eventName, close, vnode }) => {
        // confirm: boolean 是否点击确认按钮。eventName: stirng 具体触发的点击事件名称。close 关闭弹窗函数。vnode 弹窗虚拟 DOM。
        console.log(confirm, eventName, close, vnode);
        if (confirm) {
          console.log('Yes, I do!');
        } else {
          console.log('No, I don\'t!');
        }
      });
    },
    onConfirm() {
      this.$dialog.confirm({
        header: 'Dialog-Confirm-Plugin',
        body: 'Are you sure to delete it?',
        confirmContent: 'ok',
        cancelContent: 'cancel',
        asyncClose: true,
      }).then(({ confirm, close }) => {
        if (confirm) {
          console.log('confirm button has been clicked!');
          // asyncClose 为 true 时，可以单独调用关闭弹框，以控制关闭时机
          close();
        } else {
          console.log('cancel button has been clicked!');
          // asyncClose 为 true 时，可以单独调用关闭弹框，以控制关闭时机
          close();
        }
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
      }).then(() => {
        console.log('Users have given feedback!');
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
