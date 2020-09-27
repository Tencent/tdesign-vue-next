<template>
  <div>
    <t-button theme="primary" @click="()=>this.visible = true">默认位置</t-button>
    <t-button theme="primary" @click="()=>this.visibleCenter = true">垂直居中</t-button>
    <t-button theme="primary" @click="()=>this.visibleOffset = true">自定义偏移量</t-button>

    <t-dialog header="对话框标题" body="对话框内容" v-model="visible" @close="(close)=>close()"></t-dialog>
    <t-dialog
      placement="center"
      header="对话框标题"
      body="水平居中显示的对话框"
      v-model="visibleCenter"
    ></t-dialog>
    <t-dialog
      :placement="placement"
      header="对话框标题"
      body="自定义偏移量的对话框"
      :offset="offset"
      v-model="visibleOffset"
      @close="closeOffsetDialog"
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
      visibleOffset: false,
      placement: 'center',
      offset: { left: 20, right: '100%', top: '200px' },
    };
  },
  methods: {
    closeOffsetDialog(close: Function) {
      close();
      this.placement = 'top';
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
