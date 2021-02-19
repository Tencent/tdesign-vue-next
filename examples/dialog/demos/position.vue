<template>
  <div>
    <t-button theme="primary" @click="visible = true" >默认位置</t-button>
    <t-button theme="primary" @click="visibleCenter = true" >垂直居中</t-button>
    <t-button theme="primary" @click="visibleTop = true" >自定义top</t-button>
    <t-dialog header="对话框标题" body="对话框内容" :visible="visible" :onClose="close1" :onClickConfirm="close1"></t-dialog>
    <t-dialog
      placement="center"
      header="对话框标题"
      body="水平居中显示的对话框"
      :visible="visibleCenter"
      :onClickConfirm="close2"
      :onClose="close2"
    ></t-dialog>
    <t-dialog
      :placement="placement"
      header="对话框标题"
      body="自定义对话框距离窗口顶部位置，top: 50px"
      :top="top"
      :visible="visibleTop"
      :onClickConfirm="close3"
      :onClose="close3"
    ></t-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      visible: false,
      visibleCenter: false,
      visibleTop: false,
      placement: 'top',
      top: '50px',
    };
  },
  methods: {
    close1() {
      this.visible = false;
    },
    close2() {
      this.visibleCenter = false;
    },
    close3() {
      this.visibleTop = false;
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
