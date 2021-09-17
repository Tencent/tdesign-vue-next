<template>
  <div>
    <t-button theme="primary" @click="visibleModal = true">模态对话框</t-button>
    <t-button theme="primary" @click="visibleModelessDrag = true">非模态对话框</t-button>

    <t-dialog
      header="模态对话框"
      v-model:visible="visibleModal"
      mode="modal"
      draggable
      :onConfirm="()=>this.visibleModal = false"
    >
      <template #body>
        <div>默认点击蒙层或按ESC可关闭</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

    <t-dialog
      header="非模态对话框"
      v-model:visible="visibleModelessDrag"
      mode="modeless"
      draggable
      :onConfirm="()=>this.visibleModelessDrag = false"
    >
      <template #body>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visibleModal: false,
      visibleModelessDrag: false,
    };
  },
  methods: {

  },
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
