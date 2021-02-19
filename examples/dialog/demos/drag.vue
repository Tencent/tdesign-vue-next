<template>
  <div>
    <t-button theme="primary" @click="visibleModelessDrag = true">非模态对话框-可拖拽</t-button>
    <t-button theme="primary" @click="visibleModeless = true">非模态对话框-不可拖拽</t-button>
    <t-button theme="primary" @click="visibleModal = true">模态对话框-不支持拖拽</t-button>
    <br>

    <t-dialog
      header="模态对话框"
      :visible.sync="visibleModal"
      mode="modal"
      draggable
      :onClickConfirm="()=>this.visibleModal = false"
    >
      <div slot="body">
        <div>默认点击蒙层或按ESC可关闭</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </t-dialog>

    <t-dialog
      header="非模态对话框-可拖拽"
      :visible.sync="visibleModelessDrag"
      mode="modeless"
      draggable
      :onClickConfirm="()=>this.visibleModelessDrag = false"
    >
      <div slot="body">
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </t-dialog>

    <t-dialog
      header="非模态对话框-不可拖拽"
      :visible.sync="visibleModeless"
      mode="modeless"
      :onClickConfirm="()=>this.visibleModeless = false"
    >
      <div slot="body">
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </t-dialog>

  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
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
