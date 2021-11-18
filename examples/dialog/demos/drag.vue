<template>
  <div>
    <t-button
      theme="primary"
      @click="visibleModelessDrag = true"
    >
      非模态对话框-可拖拽
    </t-button>
    <t-button
      theme="primary"
      @click="visibleModeless = true"
    >
      非模态对话框-不可拖拽
    </t-button>
    <t-button
      theme="primary"
      @click="visibleModal = true"
    >
      模态对话框-不支持拖拽
    </t-button>
    <br>

    <t-dialog
      v-model:visible="visibleModal"
      header="模态对话框"
      mode="modal"
      draggable
      :on-confirm="() => visibleModal = false"
    >
      <template #body>
        <div>默认点击蒙层或按ESC可关闭</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

    <t-dialog
      v-model:visible="visibleModelessDrag"
      header="非模态对话框-可拖拽"
      mode="modeless"
      draggable
      :on-confirm="() => visibleModelessDrag = false"
    >
      <template #body>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

    <t-dialog
      v-model:visible="visibleModeless"
      header="非模态对话框-不可拖拽"
      mode="modeless"
      :on-confirm="() => visibleModeless = false"
    >
      <template #body>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>
  </div>
</template>
<script >
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visibleModal = ref(false);
    const visibleModelessDrag = ref(false);
    const visibleModeless = ref(false);

    return {
      visibleModal,
      visibleModelessDrag,
      visibleModeless,
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
