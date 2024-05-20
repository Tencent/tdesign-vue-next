<template>
  <div>
    <t-space break-line>
      <t-button theme="primary" @click="visibleModal = true">模态对话框</t-button>
      <t-button theme="primary" @click="visibleModelessDrag = true">非模态对话框</t-button>
      <t-button theme="primary" @click="visibleModeless = true">非模态对话框-不可拖拽</t-button>
      <t-button theme="primary" @click="visibleNormal = true">普通对话框-不可拖拽</t-button>
    </t-space>

    <t-dialog
      header="模态对话框"
      :visible.sync="visibleModal"
      mode="modal"
      draggable
      :onConfirm="() => (this.visibleModal = false)"
    >
      <div slot="body">
        <div>默认点击蒙层或按ESC可关闭</div>
        <div>对话框内容</div>
      </div>
    </t-dialog>

    <t-dialog
      header="非模态对话框"
      :visible.sync="visibleModelessDrag"
      mode="modeless"
      draggable
      :onConfirm="() => (this.visibleModelessDrag = false)"
    >
      <div slot="body">
        <div>对话框内容</div>
      </div>
    </t-dialog>

    <t-dialog
      header="非模态对话框-不可拖拽"
      :visible.sync="visibleModeless"
      mode="modeless"
      :onConfirm="() => (this.visibleModeless = false)"
    >
      <div slot="body">
        <div>对话框内容</div>
      </div>
    </t-dialog>

    <t-dialog
      header="普通对话框-不可拖拽"
      :visible.sync="visibleNormal"
      mode="normal"
      :onConfirm="() => (this.visibleNormal = false)"
    >
      <div slot="body">
        <div>对话框内容</div>
      </div>
    </t-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const visibleModal = ref(false);
const visibleModelessDrag = ref(false);
const visibleModeless = ref(false);
const visibleNormal = ref(false);
</script>
