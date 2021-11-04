<template>
  <div>
    <t-button theme="primary" @click="visible = true" >默认位置</t-button>
    <t-button theme="primary" @click="visibleCenter = true" >垂直居中</t-button>
    <t-button theme="primary" @click="visibleTop = true" >自定义top</t-button>
    <t-dialog header="对话框标题" body="对话框内容" :visible="visible" :onClose="close1" :onConfirm="close1"></t-dialog>
    <t-dialog
      placement="center"
      header="对话框标题"
      body="水平居中显示的对话框"
      :visible="visibleCenter"
      :onConfirm="close2"
      :onClose="close2"
    ></t-dialog>
    <t-dialog
      :placement="placement"
      header="对话框标题"
      body="自定义对话框距离窗口顶部位置，top: 50px"
      :top="top"
      :visible="visibleTop"
      :onConfirm="close3"
      :onClose="close3"
    ></t-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const visibleCenter = ref(false);
    const visibleTop = ref(false);

    return {
      visible,
      visibleCenter,
      visibleTop,
      placement: 'top',
      top: '50px',
      close1() {
        visible.value = false;
      },
      close2() {
        visibleCenter.value = false;
      },
      close3() {
        visibleTop.value = false;
      },
    }
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
