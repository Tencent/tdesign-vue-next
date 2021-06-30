<template>
  <div>
    <t-button theme="primary" @click="visibleModelessDrag = true">非模态对话框-可拖拽</t-button>
    <t-button theme="primary" @click="visibleModeless = true">非模态对话框-不可拖拽</t-button>
    <t-button theme="primary" @click="visibleModal = true">模态对话框-不支持拖拽</t-button>
    <br>

    <t-dialog
      header="模态对话框"
      v-model:visible="visibleModal"
      mode="modal"
      draggable
      :onClickConfirm="()=>this.visibleModal = false"
    >
      <template #body>
        <div>默认点击蒙层或按ESC可关闭</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

    <t-dialog
      header="非模态对话框-可拖拽"
      v-model:visible="visibleModelessDrag"
      mode="modeless"
      draggable
      :onClickConfirm="()=>this.visibleModelessDrag = false"
    >
      <template #body>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

    <t-dialog
      header="非模态对话框-不可拖拽"
      v-model:visible="visibleModeless"
      mode="modeless"
      :onClickConfirm="()=>this.visibleModeless = false"
    >
      <template #body>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      visibleModal: false,
      visibleModelessDrag: false,
      visibleModeless: false,
    };
  },
  methods: {
    getAttach() {
      return this.$root.$el;
    },

  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
