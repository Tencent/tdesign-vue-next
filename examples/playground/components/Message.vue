<template>
  <div class="playground-demo-container">
    <h2 class="title">
      Alert
      <div class="todo">TODO</div>
    </h2>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">
      Dialog
      <t-button @click="conDialogPluginConfirm"></t-button>
    </h2>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">
      Drawer
      <div class="todo">TODO</div>
    </h2>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">
      Loading
      <div class="todo">TODO</div>
    </h2>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">
      Message
      <div class="todo">TODO</div>
    </h2>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">
      Notification
      <div class="todo">TODO</div>
    </h2>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">
      Popconfirm
      <div class="todo">TODO</div>
    </h2>
  </div>
  <div class="playground-demo-container">
    <h2 class="title">
      Popup
      <div class="todo">TODO</div>
    </h2>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { DialogPlugin } from 'tdesign-vue-next';

export default defineComponent({
  setup() {
    const conDialogPluginConfirm = () => {
      const d = DialogPlugin({
        body: 'CMDB接口异常，无法使用，请联系 微信资源管理平台助手',
        onConfirm() {
          console.log('onConfirm...', d);
        },
      });
    };
    return {
      conDialogPluginConfirm,
    };
  },
});
</script>
