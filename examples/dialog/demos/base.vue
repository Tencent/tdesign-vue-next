<template>
  <div>
    <t-button variant="base" theme="primary" @click="()=>this.visible = true">基础确认对话框</t-button>
    <t-dialog
      header="对话框标题"
      body="对话框内容"
      v-model="visible"
      @click-confirm="onClickConfirm"
    ></t-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onClickConfirm(close: Function, e: Event): void {
      // todo something else here
      this.sendingRequest();
      // close dialog
      close();
      // stop propagation
      e.stopPropagation();
    },
    sendingRequest() {
      console.log('sending request');
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>
