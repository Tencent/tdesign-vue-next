<template>
  <div>
    <t-space>
      <t-button theme="primary" @click="visibleNormalDrag = true">普通对话框</t-button>
      <t-button theme="primary" @click="visibleModelessDrag = true">非模态对话框</t-button>
      <t-button theme="primary" @click="visibleModeless = true">非模态对话框-不可拖拽</t-button>
      <t-button theme="primary" @click="visibleModal = true">模态对话框-不可拖拽</t-button>
    </t-space>

    <t-dialog
      v-model:visible="visibleNormalDrag"
      header="普通对话框"
      mode="normal"
      draggable
      :on-confirm="() => (visibleNormalDrag = false)"
    >
      <template #body>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>
    <t-dialog
      v-model:visible="visibleModelessDrag"
      header="非模态对话框"
      mode="modeless"
      draggable
      :on-confirm="() => (visibleModelessDrag = false)"
    >
      <template #body>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>
    <t-dialog
      v-model:visible="visibleModeless"
      header="非模态对话框-不可拖拽"
      mode="modeless"
      :on-confirm="() => (visibleModeless = false)"
    >
      <template #body>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>
    <t-dialog
      v-model:visible="visibleModal"
      header="模态对话框"
      mode="modal"
      draggable
      :on-confirm="() => (visibleModal = false)"
    >
      <template #body>
        <div>默认点击蒙层或按ESC可关闭</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const visibleNormalDrag = ref(false);
const visibleModal = ref(false);
const visibleModelessDrag = ref(false);
const visibleModeless = ref(false);
</script>
